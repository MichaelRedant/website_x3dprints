// Builds globals.css with @tailwindcss/postcss for the design-sync bundle
import { readFileSync, writeFileSync } from "fs"
import { resolve, dirname } from "path"
import { fileURLToPath } from "url"
import postcss from "../node_modules/postcss/lib/postcss.js"
import tailwindcss from "../node_modules/@tailwindcss/postcss/dist/index.mjs"

const __dir = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dir, "..")
const inputFile = resolve(root, "app/globals.css")
const outputFile = resolve(__dir, "styles-built.css")

const css = readFileSync(inputFile, "utf8")

const result = await postcss([tailwindcss]).process(css, {
  from: inputFile,
  to: outputFile,
})

writeFileSync(outputFile, result.css)
if (result.map) writeFileSync(outputFile + ".map", result.map.toString())
console.log("CSS built to .design-sync/styles-built.css (" + result.css.length + " bytes)")
