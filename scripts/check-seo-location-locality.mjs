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

function checkFile(filePath, locale, allLocations, slugMap) {
  const slug = path.basename(filePath, ".md").toLowerCase()
  const loc = slugMap.get(slug)
  if (!loc) return []

  const allowedTargets = buildAllowedTargets(loc, allLocations, slugMap)
  const content = fs.readFileSync(filePath, "utf8")
  const lines = content.split(/\r?\n/)
  const findings = []

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i]
    const isHeading =
      locale === "en"
        ? isEnLocationSectionHeading(line)
        : isNlLocationSectionHeading(line)
    if (!isHeading) continue

    for (let j = i + 1; j < lines.length; j += 1) {
      const next = lines[j]
      if (/^##\s+/i.test(next)) break

      const targetSlug = getTargetSlugFromLine(next, locale)
      if (!targetSlug) continue
      if (!slugMap.has(targetSlug)) continue
      if (!FOCUS_TARGETS.has(targetSlug)) continue
      if (!isGenericFallbackLine(next)) continue
      if (allowedTargets.has(targetSlug)) continue

      findings.push({
        filePath,
        line: j + 1,
        sourceSlug: slug,
        sourceCity: loc.city,
        targetSlug,
        targetCity: slugMap.get(targetSlug)?.city ?? targetSlug,
      })
    }
  }

  return findings
}

function main() {
  const locations = loadLocations()
  const slugMap = new Map(locations.map((loc) => [loc.slug.toLowerCase(), loc]))

  const files = [
    ...readFiles(nlDir).map((filePath) => ({ filePath, locale: "nl" })),
    ...readFiles(enDir).map((filePath) => ({ filePath, locale: "en" })),
  ]

  const findings = []
  for (const file of files) {
    findings.push(
      ...checkFile(file.filePath, file.locale, locations, slugMap),
    )
  }

  if (findings.length > 0) {
    const preview = findings.slice(0, 80)
    for (const finding of preview) {
      const relative = path.relative(root, finding.filePath).replace(/\\/g, "/")
      console.error(
        `[seo:location-locality] ${relative}:${finding.line} links to "${finding.targetCity}" from "${finding.sourceCity}"`,
      )
    }
    if (findings.length > preview.length) {
      console.error(
        `[seo:location-locality] ... and ${findings.length - preview.length} more issues`,
      )
    }
    process.exit(1)
  }

  console.log(
    `[seo:location-locality] OK - checked ${files.length} location markdown files`,
  )
}

main()
