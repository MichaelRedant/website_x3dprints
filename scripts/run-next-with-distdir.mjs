import { spawn } from "node:child_process"
import { createRequire } from "node:module"

const require = createRequire(import.meta.url)

const [mode, distDir, ...restArgs] = process.argv.slice(2)
const supportedModes = new Set(["dev", "build", "start"])

if (!mode || !supportedModes.has(mode)) {
  console.error("[next-runner] Usage: node scripts/run-next-with-distdir.mjs <dev|build|start> <distDir> [extra args]")
  process.exit(1)
}

if (!distDir) {
  console.error("[next-runner] Missing distDir argument")
  process.exit(1)
}

const nextBin = require.resolve("next/dist/bin/next")

const child = spawn(process.execPath, [nextBin, mode, ...restArgs], {
  stdio: "inherit",
  env: { ...process.env, NEXT_DIST_DIR: distDir },
})

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal)
    return
  }
  process.exit(code ?? 1)
})

