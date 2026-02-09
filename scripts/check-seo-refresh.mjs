import { promises as fs } from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const DEFAULT_THRESHOLD_DAYS = Number.parseInt(process.env.SEO_REFRESH_DAYS ?? "90", 10)
const SHOULD_FAIL = process.argv.includes("--fail")

const BLOG_DIRS = [
  { dir: "app/(pages)/blog", locale: "nl", prefix: "/blog/" },
  { dir: "app/en/(pages)/blog", locale: "en", prefix: "/en/blog/" },
]

async function listSlugs(dir) {
  try {
    const entries = await fs.readdir(path.join(ROOT, dir), { withFileTypes: true })
    return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name)
  } catch {
    return []
  }
}

function parseDateModified(content) {
  const match = content.match(/const\s+(?:DATE_MODIFIED|dateModified)\s*=\s*["']([^"']+)["']/)
  if (!match) return null
  const parsed = new Date(match[1])
  if (Number.isNaN(parsed.getTime())) return null
  return parsed
}

function isWrapperFile(content) {
  return content.includes('from "@/app/(pages)/blog/')
}

function daysSince(date) {
  const diffMs = Date.now() - date.getTime()
  return Math.floor(diffMs / (1000 * 60 * 60 * 24))
}

async function main() {
  const rows = []
  const missing = []

  for (const config of BLOG_DIRS) {
    const slugs = await listSlugs(config.dir)
    for (const slug of slugs) {
      const pagePath = path.join(ROOT, config.dir, slug, "page.tsx")
      let content = ""
      try {
        content = await fs.readFile(pagePath, "utf8")
      } catch {
        continue
      }

      const dateModified = parseDateModified(content)
      if (!dateModified) {
        if (!isWrapperFile(content)) {
          missing.push(path.relative(ROOT, pagePath).replaceAll("\\", "/"))
        }
        continue
      }

      rows.push({
        route: `${config.prefix}${slug}`,
        locale: config.locale,
        dateModified,
        ageDays: daysSince(dateModified),
      })
    }
  }

  rows.sort((a, b) => b.ageDays - a.ageDays)

  const thresholdDays = Number.isNaN(DEFAULT_THRESHOLD_DAYS) ? 90 : DEFAULT_THRESHOLD_DAYS
  const stale = rows.filter((row) => row.ageDays >= thresholdDays)

  console.log("[seo:refresh] Blog freshness overview")
  console.log(`Threshold: ${thresholdDays} days (override with SEO_REFRESH_DAYS)`)
  console.log("")

  const preview = rows.slice(0, 20)
  if (preview.length) {
    console.log("Oldest 20 posts:")
    for (const row of preview) {
      console.log(`- ${row.route} | ${row.dateModified.toISOString().slice(0, 10)} | ${row.ageDays} days`)
    }
  } else {
    console.log("No blog posts found.")
  }

  if (stale.length) {
    console.log("")
    console.log(`Posts older than ${thresholdDays} days: ${stale.length}`)
    for (const row of stale) {
      console.log(`- ${row.route} (${row.ageDays} days)`)
    }
  }

  if (missing.length) {
    console.log("")
    console.log("Missing dateModified:")
    for (const file of missing) {
      console.log(`- ${file}`)
    }
  }

  if (SHOULD_FAIL && (stale.length || missing.length)) {
    process.exit(1)
  }
}

main().catch((error) => {
  console.error("[seo:refresh] FAILED", error)
  process.exit(1)
})