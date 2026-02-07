import { promises as fs } from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const APP_DIR = path.join(ROOT, "app")
const EN_APP_DIR = path.join(APP_DIR, "en")

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const nested = await Promise.all(
    entries.map((entry) => {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) return walk(fullPath)
      return [fullPath]
    }),
  )
  return nested.flat()
}

function relative(filePath) {
  return path.relative(ROOT, filePath).replaceAll("\\", "/")
}

function findObjectBlock(content, constantName) {
  const constPattern = new RegExp(`(?:export\\s+)?const\\s+${constantName}\\s*:\\s*Metadata\\s*=\\s*\\{`)
  const match = constPattern.exec(content)
  if (!match) return null

  const start = match.index + match[0].lastIndexOf("{")
  let depth = 0
  let inString = false
  let stringQuote = ""
  let escaped = false

  for (let i = start; i < content.length; i += 1) {
    const ch = content[i]

    if (inString) {
      if (escaped) {
        escaped = false
      } else if (ch === "\\") {
        escaped = true
      } else if (ch === stringQuote) {
        inString = false
        stringQuote = ""
      }
      continue
    }

    if (ch === '"' || ch === "'") {
      inString = true
      stringQuote = ch
      continue
    }

    if (ch === "{") depth += 1
    if (ch === "}") {
      depth -= 1
      if (depth === 0) return content.slice(start, i + 1)
    }
  }

  return null
}

function decodeQuotedLiteral(literal) {
  if (!literal) return null
  const quote = literal[0]
  if ((quote !== '"' && quote !== "'") || literal.at(-1) !== quote) return null
  const body = literal.slice(1, -1)
  const unescaped = body.replace(/\\(["'\\])/g, "$1")
  return unescaped.replace(/\\n/g, " ").replace(/\\r/g, " ").replace(/\\t/g, " ").trim()
}

function extractStringPropertyFromObject(objectText, propertyName) {
  const inlineMatch = new RegExp(`${propertyName}\\s*:\\s*(["'])([\\s\\S]*?)\\1`, "m").exec(objectText)
  if (inlineMatch) {
    return decodeQuotedLiteral(inlineMatch[0].split(":").slice(1).join(":").trim())
  }

  const defaultMatch = new RegExp(
    `${propertyName}\\s*:\\s*\\{[\\s\\S]*?default\\s*:\\s*(["'])([\\s\\S]*?)\\1`,
    "m",
  ).exec(objectText)
  if (defaultMatch) {
    return decodeQuotedLiteral(defaultMatch[0].split("default:").slice(1).join("default:").trim().replace(/,$/, ""))
  }

  return null
}

function normalizeForComparison(input) {
  return input
    .toLowerCase()
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
}

function tokenSet(input) {
  const normalized = normalizeForComparison(input)
  if (!normalized) return new Set()
  return new Set(normalized.split(/\s+/).filter(Boolean))
}

function jaccard(a, b) {
  if (a.size === 0 && b.size === 0) return 1
  const intersection = [...a].filter((token) => b.has(token)).length
  const union = new Set([...a, ...b]).size
  return union === 0 ? 0 : intersection / union
}

function looksTooSimilar(nl, en) {
  const nlNorm = normalizeForComparison(nl)
  const enNorm = normalizeForComparison(en)
  if (!nlNorm || !enNorm) return false
  if (nlNorm === enNorm) return true
  return jaccard(tokenSet(nlNorm), tokenSet(enNorm)) >= 0.92
}

async function checkBilingualMetadataFiles() {
  const files = (await walk(APP_DIR)).filter((file) => file.endsWith(".tsx"))
  const failures = []
  let checkedFiles = 0

  for (const file of files) {
    const content = await fs.readFile(file, "utf8")
    if (!content.includes("NL_METADATA") || !content.includes("EN_METADATA")) continue

    const nlObject = findObjectBlock(content, "NL_METADATA")
    const enObject = findObjectBlock(content, "EN_METADATA")
    if (!nlObject || !enObject) {
      failures.push(`${relative(file)} - could not parse NL/EN metadata objects`)
      continue
    }

    const nlTitle = extractStringPropertyFromObject(nlObject, "title")
    const nlDescription = extractStringPropertyFromObject(nlObject, "description")
    const enTitle = extractStringPropertyFromObject(enObject, "title")
    const enDescription = extractStringPropertyFromObject(enObject, "description")

    checkedFiles += 1

    if (!nlTitle || !enTitle) {
      failures.push(`${relative(file)} - missing title in NL_METADATA or EN_METADATA`)
    } else if (looksTooSimilar(nlTitle, enTitle)) {
      failures.push(`${relative(file)} - NL/EN titles are too similar`)
    }

    if (!nlDescription || !enDescription) {
      failures.push(`${relative(file)} - missing description in NL_METADATA or EN_METADATA`)
    } else if (looksTooSimilar(nlDescription, enDescription)) {
      failures.push(`${relative(file)} - NL/EN descriptions are too similar`)
    }
  }

  return { checkedFiles, failures }
}

async function checkEnWrappersLocaleProp() {
  const files = (await walk(EN_APP_DIR)).filter((file) => file.endsWith("page.tsx"))
  const failures = []
  let checkedFiles = 0

  for (const file of files) {
    const content = await fs.readFile(file, "utf8")
    const importsEnMetadata = /import\s+.+EN_METADATA.+from\s+["']@\/app\/\(.+?\)\/.+\/page["']/.test(content)
    if (!importsEnMetadata) continue

    checkedFiles += 1
    if (!/locale\s*=\s*["']en["']/.test(content)) {
      failures.push(`${relative(file)} - EN wrapper uses EN_METADATA but does not pass locale="en"`)
    }
  }

  return { checkedFiles, failures }
}

async function main() {
  const [metadataCheck, wrapperCheck] = await Promise.all([
    checkBilingualMetadataFiles(),
    checkEnWrappersLocaleProp(),
  ])

  const failures = [...metadataCheck.failures, ...wrapperCheck.failures]
  const totalChecked = metadataCheck.checkedFiles + wrapperCheck.checkedFiles

  if (failures.length > 0) {
    console.error("[seo:locale-diff] FAILED:")
    for (const failure of failures) {
      console.error(`  - ${failure}`)
    }
    process.exit(1)
  }

  console.log(
    `[seo:locale-diff] OK - checked ${metadataCheck.checkedFiles} bilingual metadata files and ${wrapperCheck.checkedFiles} EN wrappers`,
  )
  console.log(`[seo:locale-diff] Total checks: ${totalChecked}`)
}

main().catch((error) => {
  console.error("[seo:locale-diff] FAILED with unexpected error")
  console.error(error)
  process.exit(1)
})
