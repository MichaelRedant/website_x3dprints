import { promises as fs } from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const LIB_DIR = path.join(ROOT, "lib")
const CONFIG_PATH = path.join(LIB_DIR, "seo-keyword-governance.json")
const KEYWORD_FILE_PATTERN = /^Keyword Stats .*\.csv$/i

function normalizeText(value) {
  return `${value ?? ""}`
    .replace(/\u0000/g, "")
    .replace(/^\ufeff/, "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function parseNumber(value) {
  const digits = `${value ?? ""}`.replace(/[^0-9]/g, "")
  return Number.parseInt(digits, 10) || 0
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

async function readTextAuto(filePath) {
  const buffer = await fs.readFile(filePath)
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

async function readGovernanceConfig() {
  const raw = await fs.readFile(CONFIG_PATH, "utf8")
  const parsed = JSON.parse(raw)

  if (!Array.isArray(parsed.targets) || parsed.targets.length === 0) {
    throw new Error("seo-keyword-governance.json must define a non-empty targets array")
  }

  return parsed
}

async function findLatestKeywordFile() {
  const entries = await fs.readdir(LIB_DIR, { withFileTypes: true })
  const candidates = entries
    .filter((entry) => entry.isFile() && KEYWORD_FILE_PATTERN.test(entry.name))
    .map((entry) => path.join(LIB_DIR, entry.name))

  if (candidates.length === 0) {
    throw new Error("No keyword CSV found in lib/ matching 'Keyword Stats *.csv'")
  }

  const withStats = await Promise.all(
    candidates.map(async (filePath) => ({
      filePath,
      stat: await fs.stat(filePath),
    })),
  )
  withStats.sort((a, b) => b.stat.mtimeMs - a.stat.mtimeMs)
  return withStats[0].filePath
}

function parseKeywordCsv(text) {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.replace(/\u0000/g, ""))
    .filter((line) => line.trim().length > 0)

  if (lines.length < 4) {
    throw new Error("Keyword CSV has too few lines")
  }

  const header = lines[2].split("\t").map((cell) => cell.replace(/^\ufeff/, "").trim())
  const keywordIndex = header.findIndex((cell) => normalizeText(cell) === "keyword")
  const avgSearchIndex = header.findIndex((cell) => normalizeText(cell) === "avg monthly searches")

  if (keywordIndex === -1) {
    throw new Error("Keyword CSV is missing expected 'Keyword' column")
  }

  const keywords = new Map()

  for (const line of lines.slice(3)) {
    const columns = line.split("\t")
    const rawKeyword = (columns[keywordIndex] ?? "").replace(/^\ufeff/, "").trim()
    if (!rawKeyword) continue

    const normalizedKeyword = normalizeText(rawKeyword)
    if (!normalizedKeyword) continue

    const searchVolume = parseNumber(columns[avgSearchIndex] ?? "")
    const previous = keywords.get(normalizedKeyword)
    if (!previous || searchVolume > previous.searchVolume) {
      keywords.set(normalizedKeyword, { keyword: rawKeyword, searchVolume })
    }
  }

  if (keywords.size === 0) {
    throw new Error("Keyword CSV did not produce any keyword rows")
  }

  return keywords
}

function decodeJsString(value) {
  return value
    .replace(/\\n/g, " ")
    .replace(/\\r/g, " ")
    .replace(/\\t/g, " ")
    .replace(/\\"/g, "\"")
    .replace(/\\'/g, "'")
    .replace(/\\`/g, "`")
}

function stripMarkup(value) {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/\{[^}]+\}/g, " ")
    .replace(/&[a-z0-9#]+;/gi, " ")
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function extractStringValuesForKeys(rawSource, keys) {
  if (keys.length === 0) return []

  const keyPattern = keys.map(escapeRegex).join("|")
  const matches = []
  const regex = new RegExp(`\\b(?:${keyPattern})\\s*:\\s*(['"\`])([\\s\\S]*?)\\1`, "g")
  let match = regex.exec(rawSource)
  while (match) {
    matches.push(decodeJsString(match[2]))
    match = regex.exec(rawSource)
  }
  return matches
}

function extractTagValues(rawSource, tagName) {
  const matches = []
  const regex = new RegExp(`<${tagName}\\b[^>]*>([\\s\\S]*?)<\\/${tagName}>`, "gi")
  let match = regex.exec(rawSource)
  while (match) {
    matches.push(match[1])
    match = regex.exec(rawSource)
  }
  return matches
}

function buildSectionTexts(rawSource) {
  const titleCandidates = extractStringValuesForKeys(rawSource, ["title"])
  const headingCandidates = [
    ...extractTagValues(rawSource, "h1"),
    ...extractStringValuesForKeys(rawSource, ["title"]),
    ...extractStringValuesForKeys(rawSource, ["heading", "headline"]),
  ]
  const introCandidates = [
    ...extractStringValuesForKeys(rawSource, ["intro", "summary", "subtitle", "description", "body"]),
    ...extractTagValues(rawSource, "p").slice(0, 8),
  ]

  const normalizeList = (values) =>
    values
      .map((value) => normalizeText(stripMarkup(value)))
      .filter(Boolean)

  return {
    title: normalizeList(titleCandidates).join(" "),
    h1: normalizeList(headingCandidates).join(" "),
    intro: normalizeList(introCandidates).join(" "),
    full: normalizeText(rawSource),
  }
}

async function readRouteSources(files) {
  const routeSections = {
    title: "",
    h1: "",
    intro: "",
    full: "",
  }

  for (const relativePath of files) {
    const absolutePath = path.join(ROOT, relativePath)
    await fs.access(absolutePath)
    const source = await fs.readFile(absolutePath, "utf8")
    const sections = buildSectionTexts(source)
    routeSections.title += ` ${sections.title}`
    routeSections.h1 += ` ${sections.h1}`
    routeSections.intro += ` ${sections.intro}`
    routeSections.full += ` ${sections.full}`
  }

  routeSections.title = normalizeText(routeSections.title)
  routeSections.h1 = normalizeText(routeSections.h1)
  routeSections.intro = normalizeText(routeSections.intro)
  routeSections.full = normalizeText(routeSections.full)
  return routeSections
}

function matchKeywords(content, keywords) {
  const normalizedKeywords = keywords.map((keyword) => normalizeText(keyword)).filter(Boolean)
  const unique = [...new Set(normalizedKeywords)]
  const matched = unique.filter((keyword) => content.includes(keyword))
  const missing = unique.filter((keyword) => !content.includes(keyword))
  return { matched, missing }
}

function formatCsvKeyword(keywordMap, normalizedKeyword) {
  const hit = keywordMap.get(normalizedKeyword)
  if (!hit) return `${normalizedKeyword} (csv:n/a)`
  return `${hit.keyword} (${hit.searchVolume}/mo)`
}

function normalizeSectionRule(rule) {
  if (Array.isArray(rule)) {
    return { keywords: rule, minMatches: 1 }
  }
  return {
    keywords: Array.isArray(rule?.keywords) ? rule.keywords : [],
    minMatches: Number.isInteger(rule?.minMatches) ? rule.minMatches : 1,
  }
}

async function main() {
  const governance = await readGovernanceConfig()
  const keywordFile = await findLatestKeywordFile()
  const csvText = await readTextAuto(keywordFile)
  const keywordMap = parseKeywordCsv(csvText)

  const failures = []
  const warnings = []
  let matchedKeywordsCount = 0
  let sectionChecks = 0

  for (const target of governance.targets) {
    if (!target.route || !Array.isArray(target.files) || target.files.length === 0) {
      failures.push(`${target.route ?? "<missing route>"} - invalid target configuration (files required)`)
      continue
    }

    if (!Array.isArray(target.keywords) || target.keywords.length === 0) {
      failures.push(`${target.route} - invalid target configuration (keywords required)`)
      continue
    }

    const sections = await readRouteSources(target.files)

    const fullMatch = matchKeywords(sections.full, target.keywords)
    matchedKeywordsCount += fullMatch.matched.length
    const minMatches = Number.isInteger(target.minMatches) ? target.minMatches : 1
    const requiredMatches = Math.min(minMatches, target.keywords.length)

    if (fullMatch.matched.length < requiredMatches) {
      failures.push(
        `${target.route} - full-content match ${fullMatch.matched.length}/${requiredMatches}; missing: ${fullMatch.missing.join(", ")}`,
      )
    }

    const csvAligned = [...new Set(target.keywords.map((keyword) => normalizeText(keyword)).filter((keyword) => keywordMap.has(keyword)))]
    if (csvAligned.length === 0) {
      warnings.push(`${target.route} - none of configured keywords are present in latest CSV`)
    }

    if (target.sections && typeof target.sections === "object") {
      for (const [sectionName, rawRule] of Object.entries(target.sections)) {
        const rule = normalizeSectionRule(rawRule)
        if (rule.keywords.length === 0) continue

        sectionChecks += 1
        const sectionContent = sections[sectionName] ?? ""
        if (!sectionContent) {
          failures.push(`${target.route} - missing section content for "${sectionName}"`)
          continue
        }

        const sectionMatch = matchKeywords(sectionContent, rule.keywords)
        const sectionRequired = Math.min(rule.minMatches, rule.keywords.length)
        if (sectionMatch.matched.length < sectionRequired) {
          const missing = sectionMatch.missing.map((keyword) => formatCsvKeyword(keywordMap, keyword))
          failures.push(
            `${target.route} - section "${sectionName}" match ${sectionMatch.matched.length}/${sectionRequired}; missing: ${missing.join(", ")}`,
          )
        }
      }
    }
  }

  if (warnings.length > 0) {
    console.log(`[seo:keywords] WARN - ${warnings.length} warning(s):`)
    for (const warning of warnings) {
      console.log(`  - ${warning}`)
    }
  }

  if (failures.length > 0) {
    console.error("[seo:keywords] FAILED - keyword governance violations detected:")
    for (const failure of failures) {
      console.error(`  - ${failure}`)
    }
    process.exit(1)
  }

  console.log(
    `[seo:keywords] OK - checked ${governance.targets.length} targets, ${sectionChecks} section rules, ${matchedKeywordsCount} content keyword matches, CSV size ${keywordMap.size} (${path.basename(keywordFile)})`,
  )
}

main().catch((error) => {
  console.error("[seo:keywords] FAILED with unexpected error")
  console.error(error)
  process.exit(1)
})
