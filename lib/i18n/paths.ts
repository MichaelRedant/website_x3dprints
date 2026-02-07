import { type Locale } from "./locales"
import { EN_LOCATION_SLUGS } from "@/lib/locations"

const EN_PREFIX = "/en"

const EN_PATHS = new Set<string>([
  "/",
  "/about",
  "/organizers",
  "/organizers/modugrid",
  "/organizers/packout",
  "/organizers/tstak",
  "/organizers/custom",
  "/blog",
  "/contact",
  "/3d-printen",
  "/3d-modelleren",
  "/sustainability",
  "/lokaal-belgisch",
  "/valentijn-3d-printen",
  "/viewer",
  "/3d-modellen-vinden",
  "/materials",
  "/portfolio",
  "/pricing",
  "/segments",
  "/services",
  "/privacy",
  "/cookies",
  "/faq",
  "/algemene-voorwaarden",
  "/locaties",
])

const EN_BLOG_SLUGS = new Set<string>([
  "octopus-accountancy-3d-print-goodies",
  "hoeveel-kost-3d-printen",
  "hoe-lang-duurt-3d-printen",
  "pla-vs-petg",
  "3d-printen-in-de-buurt",
  "3d-printen-voor-beginners",
  "bestanden-voor-3d-printen",
  "hoe-3d-print-je-onderdelen-voor-buitengebruik",
  "juiste-3d-print-materiaal",
  "3d-printen-op-bestelling",
  "ontwerp-3d-printbaar-model",
  "use-cases-tpu",
  "filament-vrijdag-tpu",
  "filament-vrijdag-pla",
  "filament-vrijdag-petg",
  "filament-vrijdag-pla-wood",
  "filament-vrijdag-pla-marble",
  "filament-vrijdag-pla-glow",
  "filament-vrijdag-pla-metal",
  "filament-vrijdag-pla-silk-plus",
  "filament-vrijdag-pc",
  "finishing-friday-schuren-primen-lakken",
  "maker-monday-fdm-scharnieren",
  "maker-monday-wanddiktes-ribs",
  "maker-monday-toleranties-3d-printen",
  "maker-monday-snapfits",
  "maker-monday-snapfit-parts",
  "maker-monday-schroefdraad-inserts",
  "maker-monday-schroefdraad-bevestigingen",
  "maker-monday-warping-layer-cracks",
  "beste-instellingen-bambu-printer",
  "filament-vrijdag-pc-fr",
  "3d-printen-valentijn",
  "3d-printen-back-to-school",
  "3d-printen-zomer",
  "3d-printing-marketing-events",
  "3d-printen-herfst-halloween",
  "3d-printen-lente-pasen",
  "3d-printen-mini-figuren",
  "3d-printen-vaderdag-moederdag",
  "3d-printen-winter-kerst-nieuwjaar",
  "relatiegeschenken-3d-printen",
  "3d-geprinte-platen-nasiam",
  "use-case-dinsdag-auto-fiets",
  "use-case-dinsdag-events",
  "use-case-dinsdag-interieur",
  "use-case-dinsdag-productontwikkeling",
  "use-case-dinsdag-retail-displays",
  "use-case-dinsdag-scholen",
  "use-case-dinsdag-stem",
  "use-case-dinsdag-tabletop",
  "tool-organizers-3d-printing",
  "gridfinity-modular-storage-system",
])

// Map NL blog slugs naar hun ENG-equivalent zodat de taalswitch naar de juiste slug gaat
const BLOG_SLUG_MAP_TO_EN: Record<string, string> = {
  "tool-organizers-3d-printen": "tool-organizers-3d-printing",
  "gridfinity-modulair-opslagsysteem": "gridfinity-modular-storage-system",
}

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
  if (normalized === "/cases" || normalized.startsWith("/cases/")) return true
  if (normalized === "/segments" || normalized.startsWith("/segments/")) return true
  if (normalized.startsWith("/blog/")) {
    const slug = normalized.slice("/blog/".length).split("/")[0]
    return EN_BLOG_SLUGS.has(slug)
  }
  if (normalized.startsWith("/materials/")) {
    return true
  }
  if (normalized.startsWith("/")) {
    const slug = normalized.slice(1).split("/")[0]
    if (EN_LOCATION_SLUGS.has(slug)) return true
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
  const normalizedPath = normalizePath(path)
  const slugCandidate =
    normalizedPath.startsWith("/") && normalizedPath.length > 1
      ? normalizedPath.slice(1).split("/")[0]
      : null
  const hasEnglishLocation = slugCandidate ? EN_LOCATION_SLUGS.has(slugCandidate) : false

  if (locale === "en") {
    params.delete("lang")
    // Blog slug mapping NL -> EN
    if (normalizedPath.startsWith("/blog/")) {
      const rest = normalizedPath.slice("/blog/".length)
      const slug = rest.split("/")[0]
      const mapped = BLOG_SLUG_MAP_TO_EN[slug]
      if (mapped) {
        const remainder = rest.slice(slug.length)
        const localized = `/en/blog/${mapped}${remainder}`
        return buildHref(localized, params, hash)
      }
    }
    if (path.startsWith(EN_PREFIX)) {
      return buildHref(path, params, hash)
    }
    if (hasEnglishLocation) {
      const prefixed = normalizedPath === "/" ? EN_PREFIX : `${EN_PREFIX}${normalizedPath}`
      return buildHref(prefixed, params, hash)
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
