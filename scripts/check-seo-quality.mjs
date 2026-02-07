import { promises as fs } from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const OUT_DIR = path.join(ROOT, "out")
const SITE_HOST = "www.x3dprints.be"
const WARNING_SAMPLE_LIMIT = 25

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

function decodeHtmlEntities(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&#x27;", "'")
}

function compact(value) {
  return decodeHtmlEntities(value).replace(/\s+/g, " ").trim()
}

function parseAttr(tag, attrName) {
  const match = tag.match(new RegExp(`${attrName}\\s*=\\s*(['"])(.*?)\\1`, "i"))
  return match?.[2]?.trim() ?? null
}

function extractTitle(html) {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)
  return match ? compact(match[1]) : ""
}

function extractMetaDescription(html) {
  const metaTags = html.match(/<meta\b[^>]*>/gi) ?? []
  for (const tag of metaTags) {
    const name = parseAttr(tag, "name")?.toLowerCase()
    if (name === "description") {
      const content = parseAttr(tag, "content") ?? ""
      return compact(content)
    }
  }
  return ""
}

function extractCanonical(html) {
  const linkTags = html.match(/<link\b[^>]*>/gi) ?? []
  for (const tag of linkTags) {
    const rel = parseAttr(tag, "rel")?.toLowerCase()
    if (rel === "canonical") {
      return parseAttr(tag, "href") ?? ""
    }
  }
  return ""
}

function countH1(html) {
  return (html.match(/<h1\b/gi) ?? []).length
}

function isSkippableRoute(route) {
  return route === "/_not-found/" || route === "/404"
}

async function main() {
  try {
    await fs.access(OUT_DIR)
  } catch {
    console.error("[seo:quality] FAILED - out directory not found. Run `npm run build` first.")
    process.exit(1)
  }

  const files = (await walk(OUT_DIR)).filter((file) => file.endsWith(".html"))
  const failures = []
  const warnings = []
  let checked = 0

  for (const file of files) {
    const route = routeFromHtmlFile(file)
    if (isSkippableRoute(route)) continue

    const html = await fs.readFile(file, "utf8")
    checked += 1

    const title = extractTitle(html)
    const description = extractMetaDescription(html)
    const canonical = extractCanonical(html)
    const h1Count = countH1(html)
    const fileRef = relative(file)

    if (!title) failures.push(`${fileRef}: missing <title>`)
    if (!description) failures.push(`${fileRef}: missing meta description`)
    if (!canonical) failures.push(`${fileRef}: missing canonical link`)
    if (h1Count !== 1) failures.push(`${fileRef}: expected exactly 1 <h1>, got ${h1Count}`)

    if (title && (title.length < 35 || title.length > 65)) {
      warnings.push(`${fileRef}: title length ${title.length} (target 35-65)`)
    }
    if (description && (description.length < 120 || description.length > 170)) {
      warnings.push(`${fileRef}: description length ${description.length} (target 120-170)`)
    }
    if (title && /(\|\s*X3DPrints\s*){2,}/i.test(title)) {
      warnings.push(`${fileRef}: duplicate brand suffix in title`)
    }

    if (canonical) {
      try {
        const url = new URL(canonical)
        if (url.host !== SITE_HOST) {
          warnings.push(`${fileRef}: canonical host is ${url.host}, expected ${SITE_HOST}`)
        }
      } catch {
        warnings.push(`${fileRef}: canonical is not a valid absolute URL`)
      }
    }
  }

  if (failures.length > 0) {
    console.error("[seo:quality] FAILED - missing critical SEO essentials:")
    for (const failure of failures) {
      console.error(`  - ${failure}`)
    }
    process.exit(1)
  }

  if (warnings.length > 0) {
    console.log(
      `[seo:quality] WARN - checked ${checked} HTML files, ${warnings.length} optimization warnings (showing first ${Math.min(WARNING_SAMPLE_LIMIT, warnings.length)}):`,
    )
    for (const warning of warnings.slice(0, WARNING_SAMPLE_LIMIT)) {
      console.log(`  - ${warning}`)
    }
    return
  }

  console.log(`[seo:quality] OK - checked ${checked} HTML files, no quality warnings`)
}

main().catch((error) => {
  console.error("[seo:quality] FAILED with unexpected error")
  console.error(error)
  process.exit(1)
})
