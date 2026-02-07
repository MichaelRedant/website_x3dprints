import { promises as fs } from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const OUT_DIR = path.join(ROOT, "out")
const JSONLD_RE = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
const TARGET_TYPES = new Set(["Article", "BlogPosting", "FAQPage", "HowTo", "Service", "ContactPage", "ItemList", "WebPage"])

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

function routeFromHtmlFile(htmlFile) {
  const rel = path.relative(OUT_DIR, htmlFile).replaceAll("\\", "/")
  if (rel === "index.html") return "/"
  if (rel.endsWith("/index.html")) return `/${rel.slice(0, -"/index.html".length)}/`
  if (rel.endsWith(".html")) return `/${rel.slice(0, -".html".length)}`
  return `/${rel}`
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

function hasTargetType(typeField) {
  if (typeof typeField === "string") return TARGET_TYPES.has(typeField)
  if (Array.isArray(typeField)) return typeField.some((type) => TARGET_TYPES.has(type))
  return false
}

function expectedLanguageForRoute(route) {
  return route === "/en/" || route.startsWith("/en/") ? "en-BE" : "nl-BE"
}

function normalizeLanguage(input) {
  if (typeof input === "string") return [input]
  if (Array.isArray(input)) return input
  return []
}

async function main() {
  try {
    await fs.access(OUT_DIR)
  } catch {
    console.error("[seo:schema:locale] FAILED - out directory not found. Run `npm run build` first.")
    process.exit(1)
  }

  const htmlFiles = (await walk(OUT_DIR)).filter((file) => file.endsWith(".html"))
  const failures = []
  let checkedNodes = 0

  for (const file of htmlFiles) {
    const html = await fs.readFile(file, "utf8")
    const route = routeFromHtmlFile(file)
    const expectedLanguage = expectedLanguageForRoute(route)

    let match
    while ((match = JSONLD_RE.exec(html)) !== null) {
      const jsonText = match[1].trim()
      if (!jsonText) continue

      let parsed
      try {
        parsed = JSON.parse(jsonText)
      } catch {
        continue
      }

      visitSchema(parsed, (node) => {
        if (!hasTargetType(node?.["@type"])) return
        if (!Object.prototype.hasOwnProperty.call(node, "inLanguage")) return

        checkedNodes += 1
        const languages = normalizeLanguage(node.inLanguage)
        if (languages.length !== 1) {
          failures.push(
            `${relative(file)} - ${JSON.stringify(node["@type"])} has non-single inLanguage ${JSON.stringify(languages)}`,
          )
          return
        }

        if (languages[0] !== expectedLanguage) {
          failures.push(
            `${relative(file)} - ${JSON.stringify(node["@type"])} has inLanguage "${languages[0]}" (expected "${expectedLanguage}")`,
          )
        }
      })
    }
  }

  if (failures.length > 0) {
    console.error("[seo:schema:locale] FAILED:")
    for (const failure of failures) {
      console.error(`  - ${failure}`)
    }
    process.exit(1)
  }

  console.log(`[seo:schema:locale] OK - checked ${checkedNodes} typed schema nodes with inLanguage`)
}

main().catch((error) => {
  console.error("[seo:schema:locale] FAILED with unexpected error")
  console.error(error)
  process.exit(1)
})
