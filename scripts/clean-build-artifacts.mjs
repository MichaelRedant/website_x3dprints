import { existsSync, rmSync } from "node:fs"
import { resolve } from "node:path"

const targets = [".next", ".next-dev", ".next-build", "out"]

for (const target of targets) {
  const absoluteTarget = resolve(process.cwd(), target)
  if (!existsSync(absoluteTarget)) continue
  rmSync(absoluteTarget, { recursive: true, force: true })
  console.log(`[clean] removed ${target}`)
}

console.log("[clean] done")
