import { promises as fs } from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const TARGET_DIRS = ["app", "components", "content", "lib"]
const FILE_EXTENSIONS = new Set([".ts", ".tsx", ".md", ".mdx"])

const BLOCKED_PATTERNS = [
  /\bkleine batches?\b/gi,
  /\bsmall batches?\b/gi,
  /\bkleine series\b/gi,
  /\bsmall series\b/gi,
  /\bkleine oplages?\b/gi,
  /\bsmall orders?\b/gi,
]

function isScannableFile(fileName) {
  const extension = path.extname(fileName).toLowerCase()
  return FILE_EXTENSIONS.has(extension)
}

async function collectFiles(currentPath, out) {
  const entries = await fs.readdir(currentPath, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(currentPath, entry.name)
    if (entry.isDirectory()) {
      await collectFiles(fullPath, out)
      continue
    }
    if (entry.isFile() && isScannableFile(entry.name)) {
      out.push(fullPath)
    }
  }
}

function getLineNumber(content, index) {
  let line = 1
  for (let i = 0; i < index; i += 1) {
    if (content[i] === "\n") line += 1
  }
  return line
}

function truncate(value, max = 120) {
  const singleLine = value.replace(/\s+/g, " ").trim()
  if (singleLine.length <= max) return singleLine
  return `${singleLine.slice(0, max - 3)}...`
}

async function main() {
  const files = []
  for (const directory of TARGET_DIRS) {
    const directoryPath = path.join(ROOT, directory)
    await fs.access(directoryPath)
    await collectFiles(directoryPath, files)
  }

  const violations = []

  for (const filePath of files) {
    const content = await fs.readFile(filePath, "utf8")
    for (const pattern of BLOCKED_PATTERNS) {
      pattern.lastIndex = 0
      let match = pattern.exec(content)
      while (match) {
        const line = getLineNumber(content, match.index)
        const lineText = content.split(/\r?\n/)[line - 1] ?? ""
        violations.push({
          filePath: path.relative(ROOT, filePath).replace(/\\/g, "/"),
          line,
          term: match[0],
          context: truncate(lineText),
        })
        match = pattern.exec(content)
      }
    }
  }

  if (violations.length > 0) {
    console.error("[seo:capacity-copy] FAILED - outdated batch-size messaging found:")
    for (const violation of violations.slice(0, 200)) {
      console.error(
        `  - ${violation.filePath}:${violation.line} uses "${violation.term}" | ${violation.context}`,
      )
    }
    if (violations.length > 200) {
      console.error(`  ... and ${violations.length - 200} more`)
    }
    process.exit(1)
  }

  console.log(
    `[seo:capacity-copy] OK - scanned ${files.length} files, no outdated small-batch-only messaging found`,
  )
}

main().catch((error) => {
  console.error("[seo:capacity-copy] FAILED with unexpected error")
  console.error(error)
  process.exit(1)
})
