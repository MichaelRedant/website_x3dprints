import { promises as fs } from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const OUT_DIR = path.join(ROOT, "out")
const JSONLD_RE = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi

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

function hasType(node, expected) {
  const type = node?.["@type"]
  if (typeof type === "string") return type === expected
  if (Array.isArray(type)) return type.includes(expected)
  return false
}

function visitSchema(node, callback) {
  if (Array.isArray(node)) {
    for (const item of node) visitSchema(item, callback)
    return
  }

  if (!node || typeof node !== "object") return

  callback(node)

  for (const value of Object.values(node)) {
    visitSchema(value, callback)
  }
}

async function main() {
  try {
    await fs.access(OUT_DIR)
  } catch {
    console.error("[seo:schema] FAILED - out directory not found. Run `npm run build` first.")
    process.exit(1)
  }

  const htmlFiles = (await walk(OUT_DIR)).filter((file) => file.endsWith(".html"))
  const failures = []
  let scriptsFound = 0

  for (const file of htmlFiles) {
    const html = await fs.readFile(file, "utf8")
    let match
    while ((match = JSONLD_RE.exec(html)) !== null) {
      scriptsFound += 1
      const jsonText = match[1].trim()
      if (!jsonText) {
        failures.push(`${relative(file)} - empty JSON-LD script`)
        continue
      }

      let parsed
      try {
        parsed = JSON.parse(jsonText)
      } catch (error) {
        failures.push(`${relative(file)} - invalid JSON-LD (${error instanceof Error ? error.message : String(error)})`)
        continue
      }

      const rootObjects = Array.isArray(parsed) ? parsed : [parsed]
      for (const rootObject of rootObjects) {
        if (!rootObject || typeof rootObject !== "object") {
          failures.push(`${relative(file)} - JSON-LD root is not an object`)
          continue
        }
        const hasContext = Object.prototype.hasOwnProperty.call(rootObject, "@context")
        const hasTypeOrGraph =
          Object.prototype.hasOwnProperty.call(rootObject, "@type") ||
          Object.prototype.hasOwnProperty.call(rootObject, "@graph")
        if (!hasContext || !hasTypeOrGraph) {
          failures.push(`${relative(file)} - JSON-LD root missing @context or @type/@graph`)
        }
      }

      visitSchema(parsed, (node) => {
        if (hasType(node, "Article") || hasType(node, "BlogPosting")) {
          if (!node.datePublished || !node.dateModified) {
            failures.push(`${relative(file)} - ${node["@type"]} missing datePublished/dateModified`)
          }
        }
      })
    }
  }

  if (scriptsFound === 0) {
    console.error("[seo:schema] FAILED - no JSON-LD scripts found in out/*.html")
    process.exit(1)
  }

  if (failures.length > 0) {
    console.error("[seo:schema] FAILED:")
    for (const failure of failures) {
      console.error(`  - ${failure}`)
    }
    process.exit(1)
  }

  console.log(`[seo:schema] OK - checked ${scriptsFound} JSON-LD scripts in ${htmlFiles.length} HTML files`)
}

main().catch((error) => {
  console.error("[seo:schema] FAILED with unexpected error")
  console.error(error)
  process.exit(1)
})
