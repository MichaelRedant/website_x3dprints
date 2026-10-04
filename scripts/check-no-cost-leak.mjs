// Controleert na de build dat geen enkele aankoopprijs (lib/material-prices.ts) in de
// gepubliceerde bestanden zit. De browser mag enkel verkooptarieven krijgen (lib/pricing-public.ts).
// Draait automatisch in postbuild, dus ook in verify, CI en deploy.
import { readFile, readdir } from "node:fs/promises"
import path from "node:path"

const root = process.cwd()
const outDir = path.join(root, "out")
const source = await readFile(path.join(root, "lib", "material-prices.ts"), "utf8")

// Alle regels "SLEUTEL: prijs," uit de prijstabellen.
const pairs = [...source.matchAll(/^\s+([A-Z][A-Z0-9_]+):\s*(\d+\.\d+),/gm)].map(([, key, price]) => ({ key, price }))
if (pairs.length === 0) {
  console.error("[cost-leak] Geen aankoopprijzen gevonden in lib/material-prices.ts; controle kan niet draaien.")
  process.exit(1)
}

const patterns = pairs.map(({ key, price }) => ({
  key,
  price,
  re: new RegExp(`["']?${key}["']?\\s*:\\s*${price.replace(".", "\\.")}(?![0-9])`),
}))

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(full)
    else if (/\.(js|html|txt|json)$/.test(entry.name)) yield full
  }
}

const hits = []
let checked = 0
for await (const file of walk(outDir)) {
  checked += 1
  const content = await readFile(file, "utf8")
  for (const { key, price, re } of patterns) {
    if (re.test(content)) hits.push(`${path.relative(root, file)}: ${key} = ${price}`)
  }
}

if (hits.length) {
  console.error("[cost-leak] FAILED - aankoopprijzen gevonden in de build:")
  for (const hit of hits.slice(0, 20)) console.error(`  - ${hit}`)
  console.error("Importeer lib/pricing.ts of lib/material-prices.ts niet in client-code; geef PublicRates mee.")
  process.exit(1)
}
console.log(`[cost-leak] OK - ${checked} bestanden in out/ bevatten geen aankoopprijzen (${pairs.length} prijzen gecontroleerd)`)
