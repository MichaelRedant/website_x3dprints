import { type Locale } from "./locales"

const EN_PREFIX = "/en"

const EN_PATHS = new Set<string>([
  "/",
  "/about",
  "/blog",
  "/materials",
  "/portfolio",
  "/pricing",
  "/segments",
  "/services",
  "/contact",
])

const EN_BLOG_SLUGS = new Set<string>([
  "octopus-accountancy-3d-print-goodies",
])

const EXTERNAL_PREFIXES = ["http://", "https://", "mailto:", "tel:"]

function isExternalHref(href: string) {
  return EXTERNAL_PREFIXES.some((prefix) => href.startsWith(prefix))
}

function stripEnPrefix(path: string) {
  if (!path.startsWith(EN_PREFIX)) return path
  if (path === EN_PREFIX) return "/"
  return path.replace(/^\/en(?=\/|$)/, "")
}

function normalizePath(path: string) {
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1)
  return path
}

function hasEnglishRoute(path: string) {
  const normalized = normalizePath(path)
  if (EN_PATHS.has(normalized)) return true
  if (normalized.startsWith("/blog/")) {
    const slug = normalized.slice("/blog/".length).split("/")[0]
    return EN_BLOG_SLUGS.has(slug)
  }
  if (normalized.startsWith("/materials/")) {
    return true
  }
  return false
}

function buildHref(path: string, params: URLSearchParams, hash?: string) {
  const query = params.toString()
  const withQuery = query ? `${path}?${query}` : path
  return hash ? `${withQuery}#${hash}` : withQuery
}

export function localizeHref(href: string, locale: Locale) {
  if (!href) return href
  if (href.startsWith("#") || isExternalHref(href)) return href
  if (!href.startsWith("/")) return href

  const [pathAndQuery, hash] = href.split("#")
  const [rawPath, rawQuery] = pathAndQuery.split("?")
  const path = rawPath || "/"
  const params = new URLSearchParams(rawQuery || "")

  if (locale === "en") {
    params.delete("lang")
    if (path.startsWith(EN_PREFIX)) {
      return buildHref(path, params, hash)
    }
    if (hasEnglishRoute(path)) {
      const localized = path === "/" ? EN_PREFIX : `${EN_PREFIX}${path}`
      return buildHref(localized, params, hash)
    }
    params.set("lang", "en")
    return buildHref(path, params, hash)
  }

  params.delete("lang")
  const normalized = stripEnPrefix(path)
  return buildHref(normalized, params, hash)
}
