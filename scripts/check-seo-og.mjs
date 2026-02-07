import { promises as fs } from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const OUT_DIR = path.join(ROOT, "out")
const SITE_HOST = "www.x3dprints.be"
const REQUIRED_OG_PATH = "/Logo.webp"
const REQUIRED_OG_URL = `https://${SITE_HOST}${REQUIRED_OG_PATH}`
const META_TAG_RE = /<meta\b[^>]*>/gi

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

function isTargetMetaTag(tag) {
  const property = extractMetaValue(tag, "property")?.toLowerCase()
  const name = extractMetaValue(tag, "name")?.toLowerCase()
  return property === "og:image" || name === "twitter:image"
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
  const requiredAssetExists = hasAssetPath(REQUIRED_OG_PATH, existingPaths)
  if (!requiredAssetExists) {
    console.error(`[seo:og] FAILED - required timeless OG asset missing in out/: ${REQUIRED_OG_PATH}`)
    process.exit(1)
  }

  let checked = 0
  const failures = []

  for (const htmlFile of htmlFiles) {
    const html = await fs.readFile(htmlFile, "utf8")
    const currentRoute = routeFromHtmlFile(htmlFile)
    const tags = html.match(META_TAG_RE) ?? []

    for (const tag of tags) {
      if (!isTargetMetaTag(tag)) continue
      const content = extractMetaValue(tag, "content")
      if (!content) continue

      const pathname = normalizeInternalPath(content, currentRoute)
      const sourceRef = relative(htmlFile)

      if (!pathname) {
        failures.push(`invalid or non-site OG URL "${content}" (referenced from ${sourceRef})`)
        continue
      }

      checked += 1

      if (!hasAssetPath(pathname, existingPaths)) {
        failures.push(`${pathname} (referenced from ${sourceRef})`)
        continue
      }

      if (pathname !== REQUIRED_OG_PATH) {
        failures.push(`${pathname} (expected ${REQUIRED_OG_PATH}) in ${sourceRef}`)
      }
    }
  }

  if (failures.length > 0) {
    console.error("[seo:og] FAILED - OG/Twitter images must use the timeless logo on all pages:")
    console.error(`  - required image: ${REQUIRED_OG_URL}`)
    for (const failure of failures) {
      console.error(`  - ${failure}`)
    }
    process.exit(1)
  }

  console.log(`[seo:og] OK - checked ${checked} OG/Twitter image references, all pinned to ${REQUIRED_OG_PATH}`)
}

main().catch((error) => {
  console.error("[seo:og] FAILED with unexpected error")
  console.error(error)
  process.exit(1)
})
