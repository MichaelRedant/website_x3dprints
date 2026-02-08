import { promises as fs } from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const LIB_DIR = path.join(ROOT, "lib")
const KEYWORD_FILE_PATTERN = /^Keyword Stats .*\.csv$/i

const TARGETS = [
  {
    route: "/",
    files: ["app/(home)/page.tsx"],
    keywords: [
      "3d print",
      "3d printen",
      "3d printen belgie",
      "3d print service belgie",
      "3d printen op maat",
    ],
    minMatches: 3,
  },
  {
    route: "/3d-printen/",
    files: ["app/(pages)/3d-printen/page.tsx"],
    keywords: [
      "3d printen",
      "3d printen op maat",
      "3d model printen",
      "3d print service belgie",
      "3d print belgie",
    ],
    minMatches: 3,
  },
  {
    route: "/pricing/",
    files: ["app/(pages)/pricing/page.tsx"],
    keywords: ["kosten 3d printen", "3d printen prijs", "prijs 3d printen"],
    minMatches: 1,
  },
  {
    route: "/materials/",
    files: ["app/(pages)/materials/page.tsx"],
    keywords: ["3d print materiaal", "3d print materialen", "pla cf"],
    minMatches: 1,
  },
  {
    route: "/3d-modellen-vinden/",
    files: ["app/(pages)/3d-modellen-vinden/page.tsx"],
    keywords: ["3d modellen om te printen", "3d stl", "thingiverse 3d"],
    minMatches: 1,
  },
  {
    route: "/3d-modelleren/",
    files: ["app/(pages)/3d-modelleren/page.tsx"],
    keywords: ["3d model printen", "3d ontwerp printen", "3d print onderdelen"],
    minMatches: 2,
  },
  {
    route: "/services/",
    files: ["app/(pages)/services/page.tsx"],
    keywords: ["3d print bedrijven", "3d printen bedrijf", "3d print onderdelen", "3d print service belgie"],
    minMatches: 2,
  },
  {
    route: "/viewer/",
    files: ["app/(pages)/viewer/page.tsx"],
    keywords: ["3d model printen", "3d print onderdelen", "3d print service belgie"],
    minMatches: 2,
  },
  {
    route: "/blog/3d-printen-in-de-buurt/",
    files: ["app/(pages)/blog/3d-printen-in-de-buurt/page.tsx"],
    keywords: ["3d print service belgie", "3d model printen", "3d print onderdelen", "3d printen gent"],
    minMatches: 2,
  },
  {
    route: "/blog/3d-printen-op-bestelling/",
    files: ["app/(pages)/blog/3d-printen-op-bestelling/page.tsx"],
    keywords: ["3d printen op bestelling", "3d model printen", "3d print service belgie"],
    minMatches: 2,
  },
  {
    route: "/blog/hoeveel-kost-3d-printen/",
    files: ["app/(pages)/blog/hoeveel-kost-3d-printen/page.tsx"],
    keywords: ["kosten 3d printen", "3d printen prijs", "prijs 3d printen"],
    minMatches: 2,
  },
  {
    route: "/blog/juiste-3d-print-materiaal/",
    files: ["app/(pages)/blog/juiste-3d-print-materiaal/page.tsx"],
    keywords: ["3d print materiaal", "3d print materialen", "materiaal 3d printen"],
    minMatches: 2,
  },
  {
    route: "/blog/pla-vs-petg/",
    files: ["app/(pages)/blog/pla-vs-petg/page.tsx"],
    keywords: ["3d print materiaal", "3d print materialen", "materiaal 3d printen"],
    minMatches: 2,
  },
  {
    route: "/blog/bestanden-voor-3d-printen/",
    files: ["app/(pages)/blog/bestanden-voor-3d-printen/page.tsx"],
    keywords: ["3d stl", "3d modellen om te printen", "3d model printen"],
    minMatches: 2,
  },
  {
    route: "/blog/ontwerp-3d-printbaar-model/",
    files: ["app/(pages)/blog/ontwerp-3d-printbaar-model/page.tsx"],
    keywords: ["3d ontwerp printen", "3d modellen printen", "3d model printen"],
    minMatches: 2,
  },
  {
    route: "/en/services/",
    files: ["app/(pages)/services/metadata.en.ts"],
    keywords: ["3d print", "3d model print", "3d printing gent"],
    minMatches: 2,
  },
  {
    route: "/en/3d-modelleren/",
    files: ["app/en/(pages)/3d-modelleren/page.tsx"],
    keywords: ["3d print", "3d model print"],
    minMatches: 2,
  },
  {
    route: "/en/viewer/",
    files: ["app/en/(pages)/viewer/page.tsx"],
    keywords: ["3d print", "3d model print", "3d printing gent"],
    minMatches: 2,
  },
  {
    route: "/en/blog/3d-printen-in-de-buurt/",
    files: ["app/en/(pages)/blog/3d-printen-in-de-buurt/page.tsx"],
    keywords: ["3d print", "3d model print", "3d printing gent"],
    minMatches: 2,
  },
  {
    route: "/en/blog/3d-printen-op-bestelling/",
    files: ["app/en/(pages)/blog/3d-printen-op-bestelling/page.tsx"],
    keywords: ["3d print", "3d model print", "3d printing gent"],
    minMatches: 2,
  },
  {
    route: "/en/blog/pla-vs-petg/",
    files: ["app/en/(pages)/blog/pla-vs-petg/page.tsx"],
    keywords: ["3d print", "3d model print", "3d printing gent"],
    minMatches: 2,
  },
  {
    route: "/en/blog/bestanden-voor-3d-printen/",
    files: ["app/en/(pages)/blog/bestanden-voor-3d-printen/page.tsx"],
    keywords: ["3d print", "3d model print", "3d printing gent"],
    minMatches: 2,
  },
  {
    route: "/en/blog/ontwerp-3d-printbaar-model/",
    files: ["app/en/(pages)/blog/ontwerp-3d-printbaar-model/page.tsx"],
    keywords: ["3d print", "3d model print", "3d printing gent"],
    minMatches: 2,
  },
  {
    route: "/en/blog/hoeveel-kost-3d-printen/",
    files: ["app/en/(pages)/blog/hoeveel-kost-3d-printen/page.tsx"],
    keywords: ["3d print", "3d model print"],
    minMatches: 2,
  },
  {
    route: "/en/blog/juiste-3d-print-materiaal/",
    files: ["app/en/(pages)/blog/juiste-3d-print-materiaal/page.tsx"],
    keywords: ["3d print", "3d model print"],
    minMatches: 2,
  },
]

function normalizeText(value) {
  return value
    .replace(/\u0000/g, "")
    .replace(/^\ufeff/, "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
}

function parseNumber(value) {
  const digits = value.replace(/[^0-9]/g, "")
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
  const avgSearchIndex = header.findIndex((cell) => normalizeText(cell) === "avg. monthly searches")

  if (keywordIndex === -1 || avgSearchIndex === -1) {
    throw new Error("Keyword CSV is missing expected columns 'Keyword' or 'Avg. monthly searches'")
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

async function readNormalizedSource(files) {
  const chunks = await Promise.all(
    files.map(async (relativePath) => {
      const filePath = path.join(ROOT, relativePath)
      await fs.access(filePath)
      const content = await fs.readFile(filePath, "utf8")
      return normalizeText(content)
    }),
  )
  return chunks.join("\n")
}

function formatKeyword(item) {
  return `${item.keyword} (${item.searchVolume}/mo)`
}

async function main() {
  const keywordFile = await findLatestKeywordFile()
  const csvText = await readTextAuto(keywordFile)
  const keywordMap = parseKeywordCsv(csvText)

  const failures = []
  const warnings = []
  let matchedKeywordsCount = 0

  for (const target of TARGETS) {
    const normalizedContent = await readNormalizedSource(target.files)
    const targetKeywords = target.keywords.map((keyword) => normalizeText(keyword))
    const availableKeywords = targetKeywords.filter((keyword) => keywordMap.has(keyword))

    if (availableKeywords.length === 0) {
      warnings.push(`${target.route} - none of configured keywords are present in CSV`)
      continue
    }

    const requiredMatches = Math.min(target.minMatches, availableKeywords.length)
    const matched = availableKeywords.filter((keyword) => normalizedContent.includes(keyword))
    const missing = availableKeywords.filter((keyword) => !normalizedContent.includes(keyword))
    matchedKeywordsCount += matched.length

    if (matched.length < requiredMatches) {
      failures.push({
        route: target.route,
        requiredMatches,
        matched: matched.map((keyword) => formatKeyword(keywordMap.get(keyword))),
        missing: missing.map((keyword) => formatKeyword(keywordMap.get(keyword))),
      })
    }
  }

  if (warnings.length > 0) {
    console.log(`[seo:keywords] WARN - ${warnings.length} target(s) could not be fully evaluated:`)
    for (const warning of warnings) {
      console.log(`  - ${warning}`)
    }
  }

  if (failures.length > 0) {
    console.error("[seo:keywords] FAILED - keyword coverage gaps detected:")
    for (const failure of failures) {
      console.error(`  - ${failure.route}: matched ${failure.matched.length}/${failure.requiredMatches}`)
      if (failure.matched.length > 0) {
        console.error(`    matched: ${failure.matched.join(", ")}`)
      }
      if (failure.missing.length > 0) {
        console.error(`    missing: ${failure.missing.join(", ")}`)
      }
    }
    process.exit(1)
  }

  console.log(
    `[seo:keywords] OK - checked ${TARGETS.length} targets against ${keywordMap.size} CSV keywords (${matchedKeywordsCount} matches found)`,
  )
}

main().catch((error) => {
  console.error("[seo:keywords] FAILED with unexpected error")
  console.error(error)
  process.exit(1)
})
