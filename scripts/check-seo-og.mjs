import { promises as fs } from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const OUT_DIR = path.join(ROOT, "out")
const SITE_HOST = "www.x3dprints.be"
const FALLBACK_OG_PATH = "/images/og-default.svg"
const META_TAG_RE = /<meta\b[^>]*>/gi

// Top landing pages that should keep intent-specific social previews.
const TOP_LANDING_EXPECTED_OG = new Map([
  ["/", "/images/og-home-nl.svg"],
  ["/en/", "/images/og-home-en.svg"],
  ["/services/", "/images/og-services-nl.svg"],
  ["/en/services/", "/images/og-services-en.svg"],
  ["/materials/", "/images/og-materials-nl.svg"],
  ["/en/materials/", "/images/og-materials-en.svg"],
  ["/pricing/", "/images/og-pricing-nl.svg"],
  ["/en/pricing/", "/images/og-pricing-en.svg"],
  ["/contact/", "/images/og-contact-nl.svg"],
  ["/en/contact/", "/images/og-contact-en.svg"],
  ["/portfolio/", "/images/og-portfolio-nl.svg"],
  ["/en/portfolio/", "/images/og-portfolio-en.svg"],
  ["/blog/", "/images/og-blog-nl.svg"],
  ["/en/blog/", "/images/og-blog-en.svg"],
  ["/cases/", "/images/og-cases-nl.svg"],
  ["/en/cases/", "/images/og-cases-en.svg"],
  ["/segments/", "/images/og-segments-nl.svg"],
  ["/en/segments/", "/images/og-segments-en.svg"],
  ["/viewer/", "/images/og-viewer-nl.svg"],
  ["/en/viewer/", "/images/og-viewer-en.svg"],
  ["/shop/", "/images/og-shop-nl.svg"],
  ["/en/shop/", "/images/og-shop-en.svg"],
])

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

function buildExistingPathSet(files) {
  const existing = new Set()

  for (const file of files) {
    const rel = path.relative(OUT_DIR, file).replaceAll("\\", "/")
    const direct = `/${rel}`
    existing.add(direct)

    if (rel === "index.html") {
      existing.add("/")
      continue
    }

    if (rel.endsWith("/index.html")) {
      const base = `/${rel.slice(0, -"/index.html".length)}`
      existing.add(base)
      existing.add(`${base}/`)
      continue
    }

    if (rel.endsWith(".html")) {
      existing.add(`/${rel.slice(0, -".html".length)}`)
    }
  }

  return existing
}

function hasFileExtension(pathname) {
  const lastSegment = pathname.split("/").filter(Boolean).at(-1) ?? ""
  return lastSegment.includes(".")
}

function hasAssetPath(pathname, existingPaths) {
  const candidates = new Set([pathname])

  if (!hasFileExtension(pathname)) {
    candidates.add(`${pathname}.html`)
  }

  for (const candidate of candidates) {
    if (existingPaths.has(candidate)) return true
  }

  return false
}

function extractMetaValue(tag, attrName) {
  const attrRe = new RegExp(`${attrName}=["']([^"']+)["']`, "i")
  const match = attrRe.exec(tag)
  return match?.[1] ?? null
}

function isNoindexPage(tags) {
  for (const tag of tags) {
    const name = extractMetaValue(tag, "name")?.toLowerCase()
    if (name !== "robots" && name !== "googlebot") continue

    const content = (extractMetaValue(tag, "content") ?? "").toLowerCase()
    if (content.includes("noindex") || content.includes("none")) {
      return true
    }
  }
  return false
}

function getImageTagKind(tag) {
  const property = extractMetaValue(tag, "property")?.toLowerCase()
  const name = extractMetaValue(tag, "name")?.toLowerCase()
  if (property === "og:image") return "og"
  if (name === "twitter:image") return "twitter"
  return null
}

function normalizeInternalPath(rawValue, currentRoute) {
  const value = rawValue.trim()
  if (!value) return null

  let url
  try {
    url = new URL(value, `https://${SITE_HOST}${currentRoute}`)
  } catch {
    return null
  }

  if (url.host !== SITE_HOST) return null
  return decodeURIComponent(url.pathname)
}

function formatPathSet(values) {
  if (values.size === 0) return "(none)"
  return Array.from(values).sort().join(", ")
}

async function main() {
  try {
    await fs.access(OUT_DIR)
  } catch {
    console.error("[seo:og] FAILED - out directory not found. Run `npm run build` first.")
    process.exit(1)
  }

  const outFiles = await walk(OUT_DIR)
  const htmlFiles = outFiles.filter((file) => file.endsWith(".html"))
  const existingPaths = buildExistingPathSet(outFiles)
  const failures = []
  const routeImages = new Map()
  const noindexRoutes = new Set()
  let checked = 0
  let skippedNoindex = 0

  for (const htmlFile of htmlFiles) {
    const html = await fs.readFile(htmlFile, "utf8")
    const currentRoute = routeFromHtmlFile(htmlFile)
    const sourceRef = relative(htmlFile)
    const tags = html.match(META_TAG_RE) ?? []
    if (isNoindexPage(tags)) {
      noindexRoutes.add(currentRoute)
      skippedNoindex += 1
      continue
    }

    const routeState = { og: new Set(), twitter: new Set(), sourceRef }
    routeImages.set(currentRoute, routeState)

    for (const tag of tags) {
      const kind = getImageTagKind(tag)
      if (!kind) continue

      const content = extractMetaValue(tag, "content")
      if (!content) {
        failures.push(`${currentRoute} has a ${kind}:image tag without content (${sourceRef})`)
        continue
      }

      const pathname = normalizeInternalPath(content, currentRoute)
      if (!pathname) {
        failures.push(`${currentRoute} has invalid or non-site ${kind}:image URL "${content}" (${sourceRef})`)
        continue
      }

      checked += 1
      if (!hasAssetPath(pathname, existingPaths)) {
        failures.push(`${currentRoute} references missing ${kind}:image asset "${pathname}" (${sourceRef})`)
        continue
      }

      routeState[kind].add(pathname)
    }
  }

  for (const [route, expectedPath] of TOP_LANDING_EXPECTED_OG.entries()) {
    if (noindexRoutes.has(route)) {
      continue
    }

    if (!hasAssetPath(expectedPath, existingPaths)) {
      failures.push(`policy asset missing from out/: ${expectedPath} (required by ${route})`)
      continue
    }

    const state = routeImages.get(route)
    if (!state) {
      failures.push(`top landing route missing in out/: ${route}`)
      continue
    }

    if (state.og.size === 0) {
      failures.push(`${route} is missing og:image (${state.sourceRef})`)
    } else if (!state.og.has(expectedPath)) {
      failures.push(`${route} expected og:image ${expectedPath} but got ${formatPathSet(state.og)}`)
    }

    if (state.twitter.size === 0) {
      failures.push(`${route} is missing twitter:image (${state.sourceRef})`)
    } else if (!state.twitter.has(expectedPath)) {
      failures.push(`${route} expected twitter:image ${expectedPath} but got ${formatPathSet(state.twitter)}`)
    }

    if (state.og.has(FALLBACK_OG_PATH) || state.twitter.has(FALLBACK_OG_PATH)) {
      failures.push(`${route} still uses fallback OG image ${FALLBACK_OG_PATH}`)
    }
  }

  if (failures.length > 0) {
    console.error("[seo:og] FAILED - OG/Twitter governance violations detected:")
    for (const failure of failures) {
      console.error(`  - ${failure}`)
    }
    process.exit(1)
  }

  const uniqueTopAssets = new Set(TOP_LANDING_EXPECTED_OG.values()).size
  console.log(
    `[seo:og] OK - checked ${checked} OG/Twitter image references on indexable pages, skipped ${skippedNoindex} noindex pages, and validated ${TOP_LANDING_EXPECTED_OG.size} top landing routes (${uniqueTopAssets} unique OG assets).`,
  )
}

main().catch((error) => {
  console.error("[seo:og] FAILED with unexpected error")
  console.error(error)
  process.exit(1)
})
