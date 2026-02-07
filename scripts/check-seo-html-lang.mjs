import { promises as fs } from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const OUT_DIR = path.join(ROOT, "out")

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

function routeFromHtmlFile(htmlFile) {
  const rel = path.relative(OUT_DIR, htmlFile).replaceAll("\\", "/")
  if (rel === "index.html") return "/"
  if (rel.endsWith("/index.html")) return `/${rel.slice(0, -"/index.html".length)}`
  if (rel.endsWith(".html")) return `/${rel.slice(0, -".html".length)}`
  return `/${rel}`
}

function isEnglishRoute(route) {
  return route === "/en" || route.startsWith("/en/")
}

function extractAttr(tag, attrName) {
  const regex = new RegExp(`\\s${attrName}\\s*=\\s*(['"])(.*?)\\1`, "i")
  const match = regex.exec(tag)
  return match ? match[2] : null
}

async function main() {
  try {
    await fs.access(OUT_DIR)
  } catch {
    console.error("[seo:html-lang] FAILED - out directory not found. Run `npm run build` first.")
    process.exit(1)
  }

  const outFiles = await walk(OUT_DIR)
  const htmlFiles = outFiles.filter((file) => file.endsWith(".html"))
  const failures = []

  for (const file of htmlFiles) {
    const route = routeFromHtmlFile(file)
    const isEn = isEnglishRoute(route)
    const expectedLang = isEn ? "en-BE" : "nl-BE"
    const expectedLocale = isEn ? "en" : "nl"

    const source = await fs.readFile(file, "utf8")
    const tagMatch = source.match(/<html\b[^>]*>/i)
    if (!tagMatch) {
      failures.push(`${path.relative(ROOT, file).replaceAll("\\", "/")}: missing <html> tag`)
      continue
    }

    const htmlTag = tagMatch[0]
    const lang = extractAttr(htmlTag, "lang")
    const locale = extractAttr(htmlTag, "data-locale")

    if (lang !== expectedLang) {
      failures.push(
        `${path.relative(ROOT, file).replaceAll("\\", "/")}: expected lang="${expectedLang}", got ${lang ? `"${lang}"` : "missing"}`,
      )
    }
    if (locale !== expectedLocale) {
      failures.push(
        `${path.relative(ROOT, file).replaceAll("\\", "/")}: expected data-locale="${expectedLocale}", got ${locale ? `"${locale}"` : "missing"}`,
      )
    }
  }

  if (failures.length > 0) {
    console.error("[seo:html-lang] FAILED:")
    for (const failure of failures) {
      console.error(`  - ${failure}`)
    }
    process.exit(1)
  }

  console.log(`[seo:html-lang] OK - validated ${htmlFiles.length} exported HTML files`)
}

main().catch((error) => {
  console.error("[seo:html-lang] FAILED with unexpected error")
  console.error(error)
  process.exit(1)
})
