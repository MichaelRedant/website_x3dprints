import { promises as fs } from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const OUT_DIR = path.join(ROOT, "out")
const SITE_HOST = "www.x3dprints.be"
const ANCHOR_RE = /<a\b[^>]*href=["']([^"']+)["'][^>]*>/gi

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

function relative(filePath) {
  return path.relative(ROOT, filePath).replaceAll("\\", "/")
}

function routeFromHtmlFile(htmlFile) {
  const rel = path.relative(OUT_DIR, htmlFile).replaceAll("\\", "/")
  if (rel === "index.html") return "/"
  if (rel.endsWith("/index.html")) return `/${rel.slice(0, -"/index.html".length)}/`
  if (rel.endsWith(".html")) return `/${rel.slice(0, -".html".length)}`
  return `/${rel}`
}

function normalizeInternalPath(rawValue, currentRoute) {
  const value = rawValue.trim()
  if (!value) return null

  const lower = value.toLowerCase()
  if (
    lower.startsWith("#") ||
    lower.startsWith("mailto:") ||
    lower.startsWith("tel:") ||
    lower.startsWith("javascript:") ||
    lower.startsWith("data:")
  ) {
    return null
  }

  let url
  try {
    url = new URL(value, `https://${SITE_HOST}${currentRoute}`)
  } catch {
    return null
  }

  if (url.host !== SITE_HOST) return null
  if (url.pathname.startsWith("/api/")) return null

  return decodeURIComponent(url.pathname)
}

function isNonPageAssetPath(pathname) {
  if (pathname.startsWith("/_next/")) return true
  if (pathname.startsWith("/images/")) return true
  if (pathname.startsWith("/fonts/")) return true
  if (pathname.startsWith("/assets/")) return true
  if (pathname === "/favicon.ico") return true
  if (pathname === "/robots.txt") return true
  if (pathname === "/sitemap.xml") return true
  if (pathname === "/Logo.webp") return true

  const segment = pathname.split("/").filter(Boolean).at(-1) ?? ""
  if (!segment.includes(".")) return false
  return !segment.endsWith(".html")
}

async function main() {
  try {
    await fs.access(OUT_DIR)
  } catch {
    console.error("[seo:locale-links] FAILED - out directory not found. Run `npm run build` first.")
    process.exit(1)
  }

  const allHtmlFiles = (await walk(OUT_DIR)).filter((file) => file.endsWith(".html"))
  const enHtmlFiles = allHtmlFiles.filter((file) => {
    const route = routeFromHtmlFile(file)
    return route === "/en/" || route.startsWith("/en/")
  })

  const failures = new Set()
  let checkedAnchors = 0

  for (const htmlFile of enHtmlFiles) {
    const html = await fs.readFile(htmlFile, "utf8")
    const currentRoute = routeFromHtmlFile(htmlFile)

    ANCHOR_RE.lastIndex = 0
    let match
    while ((match = ANCHOR_RE.exec(html)) !== null) {
      const fullAnchor = match[0]
      const rawHref = match[1]
      const pathname = normalizeInternalPath(rawHref, currentRoute)
      if (!pathname) continue

      if (isNonPageAssetPath(pathname)) continue
      checkedAnchors += 1

      if (pathname === "/en" || pathname.startsWith("/en/")) continue
      if (/hreflang\s*=\s*["']nl/i.test(fullAnchor)) continue

      failures.add(`${pathname} (referenced from ${relative(htmlFile)})`)
    }
  }

  const failureList = [...failures]
  if (failureList.length > 0) {
    console.error("[seo:locale-links] FAILED - EN pages link to NL/default routes:")
    const MAX_PRINT = 200
    for (const failure of failureList.slice(0, MAX_PRINT)) {
      console.error(`  - ${failure}`)
    }
    if (failureList.length > MAX_PRINT) {
      console.error(`  ...and ${failureList.length - MAX_PRINT} more`)
    }
    process.exit(1)
  }

  console.log(`[seo:locale-links] OK - checked ${checkedAnchors} internal EN anchor links`)
}

main().catch((error) => {
  console.error("[seo:locale-links] FAILED with unexpected error")
  console.error(error)
  process.exit(1)
})
