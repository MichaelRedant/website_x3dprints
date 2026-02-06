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

async function main() {
  const files = (await walk(APP_DIR)).filter((file) => file.endsWith(".tsx"))
  const failures = []
  const languagesRegex = /languages\s*:\s*\{/g

  for (const file of files) {
    const content = await fs.readFile(file, "utf8")
    let match
    let blockIndex = 0
    while ((match = languagesRegex.exec(content)) !== null) {
      blockIndex += 1
      const start = match.index
      const snippet = content.slice(start, start + 1000)
      if (!/["']x-default["']\s*:/.test(snippet)) {
        failures.push(`${relative(file)} (languages block ${blockIndex})`)
      }
    }
  }

  if (failures.length > 0) {
    console.error("[seo:metadata] FAILED - missing x-default in languages block:")
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
