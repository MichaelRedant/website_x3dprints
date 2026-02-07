import { promises as fs } from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const OUT_DIR = path.join(ROOT, "out")
const SITE_URL = "https://www.x3dprints.be"
const SITE_HOST = "www.x3dprints.be"
const TIMELESS_OG_IMAGE = `${SITE_URL}/Logo.webp`
const META_TAG_RE = /<meta\b[^>]*>/gi
const ANCHOR_RE = /<a\b[^>]*href=(['"])(.*?)\1[^>]*>/gi
const TITLE_RE = /<title\b[^>]*>([\s\S]*?)<\/title>/i
const TITLE_TARGET_MIN = 35
const TITLE_TARGET_MAX = 65
const DESCRIPTION_TARGET_MIN = 120
const DESCRIPTION_TARGET_MAX = 170

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

function isEnglishRoute(route) {
  return route === "/en" || route.startsWith("/en/")
}

function extractTagAttr(tag, attrName) {
  const attrRegex = new RegExp(`\\s${attrName}\\s*=\\s*(['"])(.*?)\\1`, "i")
  const match = attrRegex.exec(tag)
  return match?.[2] ?? null
}

function isOgImageMetaTag(tag) {
  const property = extractTagAttr(tag, "property")?.toLowerCase()
  const name = extractTagAttr(tag, "name")?.toLowerCase()
  return property === "og:image" || name === "twitter:image"
}

function setTagAttr(tag, attrName, value) {
  const attrRegex = new RegExp(`\\s${attrName}\\s*=\\s*(['"])(.*?)\\1`, "i")
  if (attrRegex.test(tag)) {
    return tag.replace(attrRegex, ` ${attrName}="${value}"`)
  }
  return tag.replace(/\/?>$/, (ending) => ` ${attrName}="${value}"${ending}`)
}

function decodeHtmlEntities(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&#x27;", "'")
}

function compact(value) {
  return decodeHtmlEntities(value).replace(/\s+/g, " ").trim()
}

function clampToBoundary(value, max) {
  const clean = compact(value)
  if (clean.length <= max) return clean
  const cut = clean.slice(0, max)
  const lastPunctuation = Math.max(cut.lastIndexOf("|"), cut.lastIndexOf("-"), cut.lastIndexOf(":"))
  const lastSpace = cut.lastIndexOf(" ")
  const boundary = Math.max(lastPunctuation, lastSpace)
  const raw = boundary > 24 ? cut.slice(0, boundary) : cut
  return raw.replace(/[.,;:!?|\-]+$/, "").trim()
}

function normalizeTitle(rawTitle, isEn) {
  const defaultTitle = isEn
    ? "3D printing service in Belgium | X3DPrints"
    : "3D print service in Belgie | X3DPrints"

  let title = compact(rawTitle)
  if (!title) title = defaultTitle

  title = title.replace(/(\|\s*X3DPrints\s*){2,}/gi, "| X3DPrints").replace(/\s+/g, " ").trim()

  if (!/x3dprints/i.test(title)) {
    title = `${title} | X3DPrints`
  }

  if (title.length < TITLE_TARGET_MIN) {
    const suffix = isEn ? " | 3D printing in Belgium" : " | 3D printen in Belgie"
    if (!title.toLowerCase().includes(isEn ? "3d printing" : "3d printen")) {
      title = `${title}${suffix}`
    }
  }

  if (title.length > TITLE_TARGET_MAX) {
    title = clampToBoundary(title, TITLE_TARGET_MAX)
  }

  if (title.length < TITLE_TARGET_MIN) {
    title = defaultTitle
  }

  if (title.length > TITLE_TARGET_MAX) {
    title = clampToBoundary(title, TITLE_TARGET_MAX)
  }

  return title
}

function normalizeDescription(rawDescription, isEn) {
  const fallback = isEn
    ? "X3DPrints provides prototypes and short runs in PLA, PETG and TPU with clear planning, quality control and delivery across Belgium."
    : "X3DPrints levert prototypes en kleine series in PLA, PETG en TPU met duidelijke planning, kwaliteitscontrole en levering in Belgie."

  let description = compact(rawDescription)

  if (description.length > DESCRIPTION_TARGET_MAX) {
    description = clampToBoundary(description, DESCRIPTION_TARGET_MAX)
  }

  if (description.length < DESCRIPTION_TARGET_MIN) {
    description = compact(`${description} ${fallback}`)
    description = clampToBoundary(description, DESCRIPTION_TARGET_MAX)
  }

  if (description.length < DESCRIPTION_TARGET_MIN) {
    description = clampToBoundary(fallback, DESCRIPTION_TARGET_MAX)
  }

  return description
}

function extractTitle(html) {
  const match = html.match(TITLE_RE)
  return match ? compact(match[1]) : ""
}

function extractMetaDescription(html) {
  const metaTags = html.match(META_TAG_RE) ?? []
  for (const tag of metaTags) {
    const name = extractTagAttr(tag, "name")?.toLowerCase()
    if (name === "description") {
      return compact(extractTagAttr(tag, "content") ?? "")
    }
  }
  return ""
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

function shouldSkipHref(rawHref) {
  const value = rawHref.trim().toLowerCase()
  return (
    value === "" ||
    value.startsWith("#") ||
    value.startsWith("mailto:") ||
    value.startsWith("tel:") ||
    value.startsWith("javascript:") ||
    value.startsWith("data:")
  )
}

function isAssetPath(pathname) {
  if (pathname.startsWith("/_next/")) return true
  if (pathname.startsWith("/images/")) return true
  if (pathname.startsWith("/fonts/")) return true
  if (pathname.startsWith("/assets/")) return true
  if (pathname === "/favicon.ico") return true
  if (pathname === "/robots.txt") return true
  if (pathname === "/sitemap.xml") return true
  if (pathname === "/Logo.webp") return true

  const lastSegment = pathname.split("/").filter(Boolean).at(-1) ?? ""
  return lastSegment.includes(".") && !lastSegment.endsWith(".html")
}

function normalizeInternalPath(rawHref, currentRoute) {
  if (shouldSkipHref(rawHref)) return null

  let url
  try {
    url = new URL(rawHref, `${SITE_URL}${currentRoute}`)
  } catch {
    return null
  }

  if (url.host !== SITE_HOST) return null
  if (url.pathname.startsWith("/api/")) return null

  return {
    pathname: decodeURIComponent(url.pathname),
    search: url.search,
    hash: url.hash,
  }
}

async function main() {
  try {
    await fs.access(OUT_DIR)
  } catch {
    console.error("[postbuild:html-lang] FAILED - out directory not found. Run `npm run build` first.")
    process.exit(1)
  }

  const outFiles = await walk(OUT_DIR)
  const htmlFiles = outFiles.filter((file) => file.endsWith(".html"))
  const existingPaths = buildExistingPathSet(outFiles)
  let changed = 0
  let changedLang = 0
  let changedOg = 0
  let changedLinks = 0
  let changedSnippets = 0

  for (const file of htmlFiles) {
    const route = routeFromHtmlFile(file)
    const isEn = isEnglishRoute(route)
    const expectedLang = isEn ? "en-BE" : "nl-BE"
    const expectedLocale = isEn ? "en" : "nl"

    const source = await fs.readFile(file, "utf8")
    const match = source.match(/<html\b[^>]*>/i)
    if (!match) continue

    const originalTag = match[0]
    const patchedTag = setTagAttr(setTagAttr(originalTag, "lang", expectedLang), "data-locale", expectedLocale)

    let next = source
    if (patchedTag !== originalTag) {
      next = next.replace(originalTag, patchedTag)
      changedLang += 1
    }

    const normalizedTitle = normalizeTitle(extractTitle(next), isEn)
    const normalizedDescription = normalizeDescription(extractMetaDescription(next), isEn)

    next = next.replace(TITLE_RE, (fullTag) => {
      const patched = `<title>${normalizedTitle}</title>`
      if (patched !== fullTag) changedSnippets += 1
      return patched
    })

    next = next.replace(META_TAG_RE, (tag) => {
      const property = extractTagAttr(tag, "property")?.toLowerCase()
      const name = extractTagAttr(tag, "name")?.toLowerCase()

      let patched = tag

      if (isOgImageMetaTag(tag)) {
        patched = setTagAttr(patched, "content", TIMELESS_OG_IMAGE)
      }

      if (name === "description" || property === "og:description" || name === "twitter:description") {
        patched = setTagAttr(patched, "content", normalizedDescription)
      }

      if (property === "og:title" || name === "twitter:title") {
        patched = setTagAttr(patched, "content", normalizedTitle)
      }

      if (patched !== tag) {
        changedSnippets += 1
        if (isOgImageMetaTag(tag)) changedOg += 1
      }
      return patched
    })

    if (isEn) {
      next = next.replace(ANCHOR_RE, (anchorTag, quote, hrefValue) => {
        if (/hreflang\s*=\s*['"]nl/i.test(anchorTag)) return anchorTag

        const parsed = normalizeInternalPath(hrefValue, route)
        if (!parsed) return anchorTag
        if (parsed.pathname === "/en" || parsed.pathname.startsWith("/en/")) return anchorTag
        if (isAssetPath(parsed.pathname)) return anchorTag

        const enPath = parsed.pathname === "/" ? "/en/" : `/en${parsed.pathname}`
        if (!hasLinkTarget(enPath, existingPaths)) return anchorTag

        const rewrittenHref = `${enPath}${parsed.search}${parsed.hash}`
        if (rewrittenHref === hrefValue) return anchorTag

        changedLinks += 1
        return anchorTag.replace(`${quote}${hrefValue}${quote}`, `${quote}${rewrittenHref}${quote}`)
      })
    }

    if (next === source) continue

    await fs.writeFile(file, next, "utf8")
    changed += 1
  }

  console.log(
    `[postbuild:html-lang] OK - patched ${changed} HTML files (lang: ${changedLang}, og/twitter tags: ${changedOg}, locale links: ${changedLinks}, seo snippets: ${changedSnippets})`,
  )
}

main().catch((error) => {
  console.error("[postbuild:html-lang] FAILED with unexpected error")
  console.error(error)
  process.exit(1)
})
