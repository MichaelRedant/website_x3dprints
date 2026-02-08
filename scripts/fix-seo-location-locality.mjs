import fs from "node:fs"
import path from "node:path"
import ts from "typescript"
import { createRequire } from "node:module"
import { fileURLToPath } from "node:url"

const require = createRequire(import.meta.url)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const root = path.join(__dirname, "..")

const locationsPath = path.join(root, "lib", "locations.ts")
const nlDir = path.join(root, "content", "locations")
const enDir = path.join(root, "content", "en", "locations")
const FOCUS_TARGETS = new Set([
  "3d-printen-in-gent",
  "3d-printen-in-aalst",
  "3d-printen-in-antwerpen",
  "3d-printen-in-oudenaarde",
])

const NL_FALLBACK_LINK = "- [Overzicht lokale 3D print pagina's](/locaties)"
const EN_FALLBACK_LINK = "- [Local 3D printing overview](/en/locaties)"

function loadLocations() {
  const source = fs.readFileSync(locationsPath, "utf8")
  const transpiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText

  const mod = { exports: {} }
  const runtime = new Function("require", "module", "exports", transpiled)
  runtime(require, mod, mod.exports)

  const { locations } = mod.exports
  if (!Array.isArray(locations)) {
    throw new Error("locations array missing in lib/locations.ts")
  }
  return locations
}

function normalizeName(value) {
  return `${value}`
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function nameToSlug(name) {
  return `3d-printen-in-${normalizeName(name)}`
}

function coverageList(loc) {
  const city = `${loc.city || ""}`.trim()
  const areas = Array.isArray(loc.servicedAreas)
    ? loc.servicedAreas.map((v) => `${v}`.trim()).filter(Boolean)
    : []
  return [city, ...areas].filter(Boolean)
}

function buildAllowedTargets(loc, allLocations, slugMap) {
  const allowed = new Set([loc.slug])

  for (const name of coverageList(loc)) {
    const slug = nameToSlug(name)
    if (slugMap.has(slug)) allowed.add(slug)
  }

  const normalizedCity = normalizeName(loc.city)
  for (const other of allLocations) {
    if (other.slug === loc.slug) continue
    const otherCoverage = coverageList(other)
    if (otherCoverage.some((name) => normalizeName(name) === normalizedCity)) {
      allowed.add(other.slug)
    }
  }

  return allowed
}

function readFiles(dir) {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => path.join(dir, file))
}

function isNlLocationSectionHeading(line) {
  return /^##\s+(Interne links rond 3D printen in|Nabijgelegen pagina's|Dichtbij gelegen locaties|Gerelateerde buurtpagina's)\b/i.test(
    line.trim(),
  )
}

function isEnLocationSectionHeading(line) {
  return /^##\s+(Neighbouring pages|Nearby locations|Related nearby pages|Quick links|Related pages|Useful links near)\b/i.test(
    line.trim(),
  )
}

function shouldEnsureFallback(line, locale) {
  if (locale === "en") return isEnLocationSectionHeading(line)
  return isNlLocationSectionHeading(line)
}

function getTargetSlugFromLine(line, locale) {
  if (locale === "en") {
    const match = line.match(/\]\(\/en\/(3d-printen-in-[^)\/#\s]+)\/?\)/i)
    return match?.[1]?.toLowerCase() ?? null
  }
  const match = line.match(/\]\(\/(3d-printen-in-[^)\/#\s]+)\/?\)/i)
  return match?.[1]?.toLowerCase() ?? null
}

function isGenericFallbackLine(line) {
  return !/(Hoofdpagina|Buurpagina|Nearby:|Parent page:|Parent:|Nabij:|Dichtbij:|Gerelateerde:)/i.test(
    line,
  )
}

function fileHasFallback(lines, locale) {
  const needle = locale === "en" ? EN_FALLBACK_LINK : NL_FALLBACK_LINK
  return lines.some((line) => line.trim() === needle)
}

function fixFile(filePath, locale, allLocations, slugMap) {
  const slug = path.basename(filePath, ".md").toLowerCase()
  const loc = slugMap.get(slug)
  if (!loc) return { changed: false, removed: 0, addedFallback: false }

  const allowedTargets = buildAllowedTargets(loc, allLocations, slugMap)
  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/)
  let changed = false
  let removed = 0
  let addedFallback = false

  for (let i = 0; i < lines.length; i += 1) {
    const heading = lines[i]
    const isHeading =
      locale === "en"
        ? isEnLocationSectionHeading(heading)
        : isNlLocationSectionHeading(heading)
    if (!isHeading) continue

    let sectionEnd = i + 1
    while (sectionEnd < lines.length && !/^##\s+/i.test(lines[sectionEnd])) {
      sectionEnd += 1
    }

    const sectionLines = lines.slice(i + 1, sectionEnd)
    const kept = []
    let removedInSection = 0
    let locationLinkCount = 0

    for (const sectionLine of sectionLines) {
      const targetSlug = getTargetSlugFromLine(sectionLine, locale)
      if (!targetSlug || !slugMap.has(targetSlug) || allowedTargets.has(targetSlug)) {
        kept.push(sectionLine)
        if (targetSlug && slugMap.has(targetSlug)) locationLinkCount += 1
        continue
      }
      if (!FOCUS_TARGETS.has(targetSlug)) {
        kept.push(sectionLine)
        locationLinkCount += 1
        continue
      }
      if (!isGenericFallbackLine(sectionLine)) {
        kept.push(sectionLine)
        locationLinkCount += 1
        continue
      }
      removed += 1
      removedInSection += 1
      changed = true
    }

    const needsFallback =
      removedInSection > 0 &&
      shouldEnsureFallback(heading, locale) &&
      locationLinkCount === 0 &&
      !fileHasFallback(lines, locale)

    if (needsFallback) {
      kept.push(locale === "en" ? EN_FALLBACK_LINK : NL_FALLBACK_LINK)
      addedFallback = true
      changed = true
    }

    if (removedInSection > 0 || needsFallback) {
      lines.splice(i + 1, sectionEnd - (i + 1), ...kept)
      sectionEnd = i + 1 + kept.length
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, `${lines.join("\n").replace(/\s+$/u, "")}\n`, "utf8")
  }

  return { changed, removed, addedFallback }
}

function main() {
  const locations = loadLocations()
  const slugMap = new Map(locations.map((loc) => [loc.slug.toLowerCase(), loc]))
  const files = [
    ...readFiles(nlDir).map((filePath) => ({ filePath, locale: "nl" })),
    ...readFiles(enDir).map((filePath) => ({ filePath, locale: "en" })),
  ]

  let touchedFiles = 0
  let removedLinks = 0
  let fallbackLinks = 0

  for (const file of files) {
    const result = fixFile(file.filePath, file.locale, locations, slugMap)
    if (result.changed) touchedFiles += 1
    removedLinks += result.removed
    if (result.addedFallback) fallbackLinks += 1
  }

  console.log(
    `[seo:location-locality:fix] Updated ${touchedFiles} files, removed ${removedLinks} mismatched city links, added ${fallbackLinks} fallback overview links`,
  )
}

main()
