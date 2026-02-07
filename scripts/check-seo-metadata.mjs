import { promises as fs } from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const APP_DIR = path.join(ROOT, "app")

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

function extractLanguageBlocks(content) {
  const blocks = []
  const key = "languages"
  let idx = 0

  while (idx < content.length) {
    const keyPos = content.indexOf(key, idx)
    if (keyPos === -1) break

    const afterKey = keyPos + key.length
    let cursor = afterKey
    while (cursor < content.length && /\s/.test(content[cursor])) cursor += 1
    if (content[cursor] !== ":") {
      idx = afterKey
      continue
    }
    cursor += 1
    while (cursor < content.length && /\s/.test(content[cursor])) cursor += 1
    if (content[cursor] !== "{") {
      idx = cursor
      continue
    }

    const blockStart = cursor
    let i = blockStart
    let depth = 0
    let inString = false
    let stringQuote = ""
    let escaped = false

    while (i < content.length) {
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
      } else {
        if (ch === '"' || ch === "'") {
          inString = true
          stringQuote = ch
        } else if (ch === "{") {
          depth += 1
        } else if (ch === "}") {
          depth -= 1
          if (depth === 0) {
            i += 1
            break
          }
        }
      }
      i += 1
    }

    if (depth !== 0) {
      idx = afterKey
      continue
    }

    blocks.push({ block: content.slice(blockStart, i), start: keyPos })
    idx = i
  }

  return blocks
}

async function main() {
  const files = (await walk(APP_DIR)).filter((file) => file.endsWith(".tsx"))
  const failures = []

  for (const file of files) {
    const content = await fs.readFile(file, "utf8")
    const blocks = extractLanguageBlocks(content)

    blocks.forEach(({ block }, index) => {
      const blockIndex = index + 1
      const hasXDefault = /["']x-default["']\s*:/.test(block)
      const hasNlBe = /["']nl-BE["']\s*:/.test(block)
      const hasEnBe = /["']en-BE["']\s*:/.test(block)
      const hasGenericEn = /(^|[,{]\s*)en\s*:/.test(block) || /["']en["']\s*:/.test(block)

      if (!hasXDefault) {
        failures.push(`${relative(file)} (languages block ${blockIndex}) - missing x-default`)
      }

      if (!hasNlBe) {
        failures.push(`${relative(file)} (languages block ${blockIndex}) - missing nl-BE`)
      }

      if (!hasEnBe) {
        failures.push(`${relative(file)} (languages block ${blockIndex}) - missing en-BE`)
      }

      if (hasGenericEn) {
        failures.push(`${relative(file)} (languages block ${blockIndex}) - generic en key is not allowed`)
      }
    })
  }

  if (failures.length > 0) {
    console.error("[seo:metadata] FAILED - invalid languages block:")
    for (const failure of failures) {
      console.error(`  - ${failure}`)
    }
    process.exit(1)
  }

  console.log(`[seo:metadata] OK - checked ${files.length} source files`)
}

main().catch((error) => {
  console.error("[seo:metadata] FAILED with unexpected error")
  console.error(error)
  process.exit(1)
})
