import fs from "node:fs"
import path from "node:path"
import ts from "typescript"
import { createRequire } from "node:module"
import { fileURLToPath } from "node:url"

const require = createRequire(import.meta.url)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.join(__dirname, "..")

const LOCATIONS_PATH = path.join(ROOT, "lib", "locations.ts")
const NL_DIR = path.join(ROOT, "content", "locations")
const EN_DIR = path.join(ROOT, "content", "en", "locations")
const LIB_DIR = path.join(ROOT, "lib")
const KEYWORD_FILE_PATTERN = /^Keyword Stats .*\.csv$/i

const SECONDARY_PREFIXES = {
  nl: [
    "3d print service ",
    "rapid prototyping ",
    "3d printing bedrijf ",
    "3d model laten printen ",
    "3d printen nabij ",
  ],
  en: [
    "3d printing service in ",
    "rapid prototyping in ",
    "custom 3d printing in ",
    "3d model printing in ",
  ],
}

const CSV_CITY_KEYWORD_PATTERN =
  /^(3d printen|3d printing|3d print service|3d printing service|rapid prototyping)\s+(.+)$/i
const IGNORED_CITY_TAILS = new Set(["belgie", "belgium", "nederland", "netherlands", "nl", "be"])

function normalizeText(value) {
  return `${value ?? ""}`
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function slugToName(slug) {
  return slug
    .replace(/^3d-printen-in-/, "")
    .split("-")
    .filter(Boolean)
    .join(" ")
}

function readDirFiles(dir) {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => path.join(dir, file))
}

function decodeUtf16Be(buffer) {
  const source = buffer.slice(2)
  const swapped = Buffer.allocUnsafe(source.length)
  for (let idx = 0; idx < source.length; idx += 2) {
    swapped[idx] = source[idx + 1] ?? 0
    swapped[idx + 1] = source[idx] ?? 0
  }
  return swapped.toString("utf16le")
}

function readTextAuto(filePath) {
  const buffer = fs.readFileSync(filePath)
  if (buffer.length >= 2) {
    if (buffer[0] === 0xff && buffer[1] === 0xfe) {
      return buffer.slice(2).toString("utf16le")
    }
    if (buffer[0] === 0xfe && buffer[1] === 0xff) {
      return decodeUtf16Be(buffer)
    }
  }
  return buffer.toString("utf8")
}

function findLatestKeywordFile() {
  const entries = fs.readdirSync(LIB_DIR, { withFileTypes: true })
  const candidates = entries
    .filter((entry) => entry.isFile() && KEYWORD_FILE_PATTERN.test(entry.name))
    .map((entry) => path.join(LIB_DIR, entry.name))

  if (candidates.length === 0) {
    return null
  }

  candidates.sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs)
  return candidates[0]
}

function parseKeywordCsv(filePath) {
  if (!filePath) return []
  const lines = readTextAuto(filePath)
    .split(/\r?\n/)
    .map((line) => line.replace(/\u0000/g, ""))
    .filter((line) => line.trim().length > 0)

  if (lines.length < 4) return []

  const header = lines[2].split("\t").map((cell) => cell.replace(/^\ufeff/, "").trim())
  const keywordIndex = header.findIndex((cell) => normalizeText(cell) === "keyword")
  const avgSearchIndex = header.findIndex((cell) => normalizeText(cell) === "avg monthly searches")

  if (keywordIndex === -1) return []

  const rows = []
  for (const line of lines.slice(3)) {
    const cols = line.split("\t")
    const keyword = (cols[keywordIndex] ?? "").replace(/^\ufeff/, "").trim()
    if (!keyword) continue
    const searchVolume = avgSearchIndex === -1 ? 0 : Number.parseInt((cols[avgSearchIndex] ?? "").replace(/[^0-9]/g, ""), 10) || 0
    rows.push({ keyword, normalized: normalizeText(keyword), searchVolume })
  }
  return rows
}

function buildCsvLocationKeywordMap(csvRows) {
  const byCity = new Map()
  for (const row of csvRows) {
    const match = row.normalized.match(CSV_CITY_KEYWORD_PATTERN)
    if (!match) continue
    const tail = normalizeText(match[2])
    if (!tail || IGNORED_CITY_TAILS.has(tail)) continue
    if (!byCity.has(tail)) byCity.set(tail, [])
    byCity.get(tail).push(row)
  }
  for (const list of byCity.values()) {
    list.sort((a, b) => b.searchVolume - a.searchVolume)
  }
  return byCity
}

function loadLocations() {
  const source = fs.readFileSync(LOCATIONS_PATH, "utf8")
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

function buildCityTokens(city, slug) {
  const tokens = new Set()
  const baseCity = `${city || ""}`.trim()
  const fallback = slugToName(slug)
  const start = baseCity || fallback

  const noParen = start.replace(/\s*\([^)]*\)/g, "").trim()
  const primary = noParen || start
  if (primary) tokens.add(primary)

  for (const part of primary.split(",")) {
    const value = part.trim()
    if (value) tokens.add(value)
  }
  for (const part of primary.split(/\sen\s/i)) {
    const value = part.trim()
    if (value) tokens.add(value)
  }

  if ((primary.match(/-/g) ?? []).length >= 2) {
    for (const part of primary.split("-")) {
      const value = part.trim()
      if (value && value.length > 2) tokens.add(value)
    }
  }

  return Array.from(tokens)
    .map((value) => normalizeText(value))
    .filter(Boolean)
}

function pickDisplayCity(city, slug) {
  const baseCity = `${city || ""}`.trim()
  const fallback = slugToName(slug)
  const start = baseCity || fallback
  const noParen = start.replace(/\s*\([^)]*\)/g, "").trim()
  return noParen || start
}

function contentHasKeyword(content, keyword) {
  if (content.includes(keyword)) return true

  if (keyword.startsWith("3d printen ")) {
    const tail = keyword.slice("3d printen ".length)
    return content.includes(`3d printen in ${tail}`)
  }
  if (keyword.startsWith("3d printing ")) {
    const tail = keyword.slice("3d printing ".length)
    return content.includes(`3d printing in ${tail}`)
  }
  if (keyword.startsWith("3d print service ")) {
    const tail = keyword.slice("3d print service ".length)
    return content.includes(`3d print service in ${tail}`)
  }
  if (keyword.startsWith("3d printing service ")) {
    const tail = keyword.slice("3d printing service ".length)
    return content.includes(`3d printing service in ${tail}`)
  }

  return false
}

function getMissingCsvKeywords(content, locale, cityTokens, csvKeywordsByCity) {
  const csvKeywords = cityTokens.flatMap((token) => csvKeywordsByCity.get(token) ?? [])
  const missing = csvKeywords
    .filter((item) => {
      if (locale === "nl" && item.normalized.startsWith("3d printing")) return false
      if (locale === "en" && item.normalized.startsWith("3d printen")) return false
      if (locale === "en" && item.normalized.startsWith("3d print service")) return false
      return !contentHasKeyword(content, item.normalized)
    })
    .sort((a, b) => b.searchVolume - a.searchVolume)
  return missing
}

function injectHints(rawContent, locale, hints) {
  if (hints.length === 0) return { changed: false, content: rawContent }

  const lines = rawContent.split(/\r?\n/)
  const start = lines.findIndex((line) => line.includes("LOCAL_ENRICH_START"))
  const end = start === -1 ? -1 : lines.findIndex((line, idx) => idx > start && line.includes("LOCAL_ENRICH_END"))

  const block = []
  block.push(locale === "en" ? "## Local SEO signals" : "## Lokale SEO-signalen")
  for (const hint of hints) block.push(`- ${hint}`)

  if (start !== -1 && end !== -1) {
    const insertAt = end
    const before = lines[insertAt - 1]?.trim()
    const insertion = before === "" ? block : ["", ...block]
    lines.splice(insertAt, 0, ...insertion)
  } else {
    if (lines.length > 0 && lines[lines.length - 1].trim() !== "") {
      lines.push("")
    }
    lines.push(...block)
  }

  const content = `${lines.join("\n").replace(/\s+$/u, "")}\n`
  return { changed: true, content }
}

function buildHints({ locale, displayCity, missingPrimary, missingSecondary, missingCsvKeywords }) {
  const hints = []

  if (missingPrimary) {
    if (locale === "en") {
      hints.push(`Keyword focus: **3D printing in ${displayCity}** with fast delivery from Herzele.`)
    } else {
      hints.push(`Zoektermfocus: **3D printen in ${displayCity}** met snelle levering vanuit Herzele.`)
    }
  }

  if (missingSecondary) {
    if (locale === "en") {
      hints.push(`Service focus: **3D printing service in ${displayCity}** for prototypes and functional parts.`)
    } else {
      hints.push(`Servicefocus: **3D print service ${displayCity}** voor prototypes en functionele onderdelen.`)
    }
  }

  if (missingCsvKeywords.length > 0) {
    const top = missingCsvKeywords[0]
    if (locale === "en") {
      hints.push(`Search trend: **${top.keyword}**.`)
    } else {
      hints.push(`Veelgevraagde zoekterm: **${top.keyword}**.`)
    }
  }

  return hints
}

function main() {
  const locations = loadLocations()
  const locationBySlug = new Map(locations.map((loc) => [loc.slug.toLowerCase(), loc]))
  const csvFile = findLatestKeywordFile()
  const csvRows = parseKeywordCsv(csvFile)
  const csvKeywordsByCity = buildCsvLocationKeywordMap(csvRows)

  const files = [
    ...readDirFiles(NL_DIR).map((filePath) => ({ filePath, locale: "nl" })),
    ...readDirFiles(EN_DIR).map((filePath) => ({ filePath, locale: "en" })),
  ]

  let changedFiles = 0
  let addedPrimary = 0
  let addedSecondary = 0
  let addedCsvHints = 0

  for (const file of files) {
    const slug = path.basename(file.filePath, ".md").toLowerCase()
    const location = locationBySlug.get(slug)
    if (!location) continue

    const raw = fs.readFileSync(file.filePath, "utf8")
    const normalized = normalizeText(raw)
    const cityTokens = buildCityTokens(location.city, slug)
    const displayCity = pickDisplayCity(location.city, slug)

    const primaryPrefix = file.locale === "en" ? "3d printing in " : "3d printen in "
    const primaryCandidates = cityTokens.map((token) => `${primaryPrefix}${token}`)
    const hasPrimary = primaryCandidates.some((candidate) => normalized.includes(candidate))

    const secondaryCandidates = SECONDARY_PREFIXES[file.locale].flatMap((prefix) =>
      cityTokens.map((token) => `${prefix}${token}`),
    )
    const hasSecondary = secondaryCandidates.some((candidate) => normalized.includes(candidate))

    const missingCsvKeywords = getMissingCsvKeywords(normalized, file.locale, cityTokens, csvKeywordsByCity)
    const hints = buildHints({
      locale: file.locale,
      displayCity,
      missingPrimary: !hasPrimary,
      missingSecondary: !hasSecondary,
      missingCsvKeywords,
    })

    if (hints.length === 0) continue

    const result = injectHints(raw, file.locale, hints)
    if (!result.changed) continue

    fs.writeFileSync(file.filePath, result.content, "utf8")
    changedFiles += 1
    if (!hasPrimary) addedPrimary += 1
    if (!hasSecondary) addedSecondary += 1
    if (missingCsvKeywords.length > 0) addedCsvHints += 1
  }

  console.log(
    `[seo:location-keywords:fix] Updated ${changedFiles} files (primary hints: ${addedPrimary}, secondary hints: ${addedSecondary}, csv hints: ${addedCsvHints})`,
  )
}

main()
