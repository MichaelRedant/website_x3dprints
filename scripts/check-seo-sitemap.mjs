import { promises as fs } from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const OUT_DIR = path.join(ROOT, "out")
const SITEMAP_FILE = path.join(OUT_DIR, "sitemap.xml")
const SITE_HOST = "www.x3dprints.be"

const URL_BLOCK_RE = /<url>([\s\S]*?)<\/url>/gi
const LOC_RE = /<loc>([^<]+)<\/loc>/i

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map((entry) => {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) return walk(fullPath)
      return [fullPath]
    }),
  )
  return files.flat()
}

function routeFromHtmlFile(htmlFile) {
  const rel = path.relative(OUT_DIR, htmlFile).replaceAll("\\", "/")
  if (rel === "index.html") return "/"
  if (rel.endsWith("/index.html")) return `/${rel.slice(0, -"/index.html".length)}/`
  if (rel.endsWith(".html")) return `/${rel.slice(0, -".html".length)}`
  return `/${rel}`
}

function normalizeRoute(route) {
  if (!route) return "/"
  let normalized = route.replaceAll("\\", "/")
  if (!normalized.startsWith("/")) normalized = `/${normalized}`
  normalized = normalized.replace(/\/{2,}/g, "/")
  if (normalized.length > 1 && normalized.endsWith("/")) normalized = normalized.slice(0, -1)
  return normalized
}

function parseSitemapRoutes(xml) {
  const routes = new Set()
  const failures = []

  let match
  while ((match = URL_BLOCK_RE.exec(xml)) !== null) {
    const block = match[1]
    const locMatch = LOC_RE.exec(block)
    if (!locMatch) continue

    try {
      const url = new URL(locMatch[1])
      if (url.host !== SITE_HOST) continue
      routes.add(normalizeRoute(url.pathname))
    } catch {
      failures.push(`invalid <loc> URL in sitemap: ${locMatch[1]}`)
    }
  }

  return { routes, failures }
}

function isNoIndex(html) {
  return /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html)
}

function isExcludedRoute(route) {
  return route === "/_not-found" || route === "/404"
}

async function main() {
  try {
    await fs.access(OUT_DIR)
  } catch {
    console.error("[seo:sitemap] FAILED - out directory not found. Run `npm run build` first.")
    process.exit(1)
  }

  try {
    await fs.access(SITEMAP_FILE)
  } catch {
    console.error("[seo:sitemap] FAILED - out/sitemap.xml not found. Run `npm run build` first.")
    process.exit(1)
  }

  const [outFiles, sitemapXml] = await Promise.all([walk(OUT_DIR), fs.readFile(SITEMAP_FILE, "utf8")])
  const htmlFiles = outFiles.filter((file) => file.endsWith(".html"))

  const indexableRoutes = new Set()
  for (const htmlFile of htmlFiles) {
    const route = normalizeRoute(routeFromHtmlFile(htmlFile))
    if (isExcludedRoute(route)) continue

    const html = await fs.readFile(htmlFile, "utf8")
    if (isNoIndex(html)) continue

    indexableRoutes.add(route)
  }

  const { routes: sitemapRoutes, failures } = parseSitemapRoutes(sitemapXml)
  if (failures.length > 0) {
    console.error("[seo:sitemap] FAILED:")
    for (const failure of failures) console.error(`  - ${failure}`)
    process.exit(1)
  }

  const missingInSitemap = [...indexableRoutes].filter((route) => !sitemapRoutes.has(route)).sort()
  const missingInOut = [...sitemapRoutes].filter((route) => !indexableRoutes.has(route)).sort()

  if (missingInSitemap.length > 0 || missingInOut.length > 0) {
    console.error("[seo:sitemap] FAILED:")
    if (missingInSitemap.length > 0) {
      console.error("  - indexable routes missing from sitemap:")
      for (const route of missingInSitemap) console.error(`    * ${route}`)
    }
    if (missingInOut.length > 0) {
      console.error("  - sitemap routes missing from exported HTML:")
      for (const route of missingInOut) console.error(`    * ${route}`)
    }
    process.exit(1)
  }

  console.log(
    `[seo:sitemap] OK - validated ${indexableRoutes.size} indexable routes against ${sitemapRoutes.size} sitemap routes`,
  )
}

main().catch((error) => {
  console.error("[seo:sitemap] FAILED with unexpected error")
  console.error(error)
  process.exit(1)
})
