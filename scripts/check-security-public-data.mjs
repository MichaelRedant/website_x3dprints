import { promises as fs } from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const PUBLIC_DATA_DIR = path.join(ROOT, "public", "data")
const ALLOWED_FILES = new Set([".gitkeep"])

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

async function main() {
  try {
    await fs.access(PUBLIC_DATA_DIR)
  } catch {
    console.log("[security:public-data] OK - no public/data directory found")
    return
  }

  const files = await walk(PUBLIC_DATA_DIR)
  const disallowed = files
    .map((filePath) => path.relative(PUBLIC_DATA_DIR, filePath).replaceAll("\\", "/"))
    .filter((relPath) => !ALLOWED_FILES.has(relPath))
    .sort()

  if (disallowed.length > 0) {
    console.error("[security:public-data] FAILED:")
    console.error("  - CRM/contact data must not be stored in public/data.")
    console.error("  - Use storage outside webroot (crmDataDir/CRM_DATA_DIR).")
    for (const relPath of disallowed) {
      console.error(`    * public/data/${relPath}`)
    }
    process.exit(1)
  }

  console.log("[security:public-data] OK - no public CRM data files detected")
}

main().catch((error) => {
  console.error("[security:public-data] FAILED with unexpected error")
  console.error(error)
  process.exit(1)
})
