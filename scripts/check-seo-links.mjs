import { promises as fs } from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const OUT_DIR = path.join(ROOT, "out")
const SITE_HOST = "www.x3dprints.be"
const LINK_RE = /(?:href|src)=["']([^"']+)["']/gi

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

function hasFileExtension(pathname) {
  const lastSegment = pathname.split("/").filter(Boolean).at(-1) ?? ""
  return lastSegment.includes(".")
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
      const withoutExt = `/${rel.slice(0, -".html".length)}`
      existing.add(withoutExt)
    }
  }

  return existing
}

function hasLinkTarget(pathname, existingPaths) {
  const candidates = new Set()
  candidates.add(pathname)

  if (pathname !== "/") {
    if (pathname.endsWith("/")) {
      candidates.add(pathname.slice(0, -1))
    } else {
      candidates.add(`${pathname}/`)
    }
  }

  if (!hasFileExtension(pathname)) {
    candidates.add(`${pathname}.html`)
  } else if (pathname.endsWith(".html")) {
    candidates.add(pathname.slice(0, -".html".length))
  }

  for (const candidate of candidates) {
    if (existingPaths.has(candidate)) return true
  }
  return false
}

async function main() {
  try {
    await fs.access(OUT_DIR)
  } catch {
    console.error("[seo:links] FAILED - out directory not found. Run `npm run build` first.")
    process.exit(1)
  }

  const outFiles = await walk(OUT_DIR)
  const htmlFiles = outFiles.filter((file) => file.endsWith(".html"))
  const existingPaths = buildExistingPathSet(outFiles)
  const checkedLinks = new Set()
  const failures = []

  for (const htmlFile of htmlFiles) {
    const html = await fs.readFile(htmlFile, "utf8")
    const currentRoute = routeFromHtmlFile(htmlFile)

    LINK_RE.lastIndex = 0
    let match
    while ((match = LINK_RE.exec(html)) !== null) {
      const pathname = normalizeInternalPath(match[1], currentRoute)
      if (!pathname) continue

      const key = pathname
      if (checkedLinks.has(key)) continue
      checkedLinks.add(key)

      const exists = hasLinkTarget(pathname, existingPaths)
      if (!exists) {
        failures.push(`${pathname} (referenced from ${relative(htmlFile)})`)
      }
    }
  }

  if (failures.length > 0) {
    console.error("[seo:links] FAILED - broken internal links detected:")
    for (const failure of failures) {
      console.error(`  - ${failure}`)
    }
    process.exit(1)
  }

  console.log(`[seo:links] OK - checked ${checkedLinks.size} unique internal links`)
}

main().catch((error) => {
  console.error("[seo:links] FAILED with unexpected error")
  console.error(error)
  process.exit(1)
})
