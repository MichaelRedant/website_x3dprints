import { promises as fs } from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const CRM_AUTH_FILE = path.join(ROOT, "public", "crm-auth.php")

async function main() {
  let source = ""
  try {
    source = await fs.readFile(CRM_AUTH_FILE, "utf8")
  } catch {
    console.error("[security:crm-auth] FAILED - public/crm-auth.php not found")
    process.exit(1)
  }

  const failures = []
  if (!source.includes("CRM_PASSWORD_HASH")) {
    failures.push("CRM_PASSWORD_HASH lookup missing in crm-auth.php")
  }

  if (/getenv\(\s*['"]CRM_PASSWORD['"]\s*\)/.test(source)) {
    failures.push("plain CRM_PASSWORD fallback detected; keep hash-only auth")
  }

  if (failures.length > 0) {
    console.error("[security:crm-auth] FAILED:")
    for (const failure of failures) {
      console.error(`  - ${failure}`)
    }
    process.exit(1)
  }

  console.log("[security:crm-auth] OK - CRM auth is hash-only")
}

main().catch((error) => {
  console.error("[security:crm-auth] FAILED with unexpected error")
  console.error(error)
  process.exit(1)
})
