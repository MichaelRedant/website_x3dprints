import { promises as fs } from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const ROBOTS_PATH = path.join(ROOT, "out", "robots.txt")
const REQUIRED_AGENTS = ["GPTBot", "Google-Extended"]

function parseRules(content) {
  const lines = content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)

  const blocks = []
  let current = null

  for (const line of lines) {
    const [rawKey, ...rawValue] = line.split(":")
    if (!rawKey || rawValue.length === 0) continue

    const key = rawKey.trim().toLowerCase()
    const value = rawValue.join(":").trim()

    if (key === "user-agent") {
      current = { userAgent: value, allow: [], disallow: [] }
      blocks.push(current)
      continue
    }

    if (!current) continue
    if (key === "allow") current.allow.push(value)
    if (key === "disallow") current.disallow.push(value)
  }

  return blocks
}

async function main() {
  let robots
  try {
    robots = await fs.readFile(ROBOTS_PATH, "utf8")
  } catch {
    console.error("[seo:robots] FAILED - out/robots.txt not found. Run `npm run build` first.")
    process.exit(1)
  }

  const failures = []
  const blocks = parseRules(robots)

  for (const agent of REQUIRED_AGENTS) {
    const block = blocks.find((entry) => entry.userAgent.toLowerCase() === agent.toLowerCase())
    if (!block) {
      failures.push(`missing User-Agent block for ${agent}`)
      continue
    }

    if (!block.allow.includes("/")) {
      failures.push(`${agent} must explicitly allow "/"`)
    }

    if (block.disallow.includes("/")) {
      failures.push(`${agent} is blocked by "Disallow: /"`)
    }
  }

  if (!/Sitemap:\s*https:\/\/www\.x3dprints\.be\/sitemap\.xml/i.test(robots)) {
    failures.push("missing absolute sitemap reference to https://www.x3dprints.be/sitemap.xml")
  }

  if (failures.length > 0) {
    console.error("[seo:robots] FAILED - crawler access issues:")
    for (const failure of failures) {
      console.error(`  - ${failure}`)
    }
    process.exit(1)
  }

  console.log(
    `[seo:robots] OK - validated ${blocks.length} user-agent blocks and AI crawler access`,
  )
}

main().catch((error) => {
  console.error("[seo:robots] FAILED with unexpected error")
  console.error(error)
  process.exit(1)
})
