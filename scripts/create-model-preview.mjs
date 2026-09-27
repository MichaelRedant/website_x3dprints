import { randomBytes } from "node:crypto"
import { access, copyFile, mkdir, readFile, stat, writeFile } from "node:fs/promises"
import path from "node:path"
import { createInterface } from "node:readline/promises"
import { strFromU8, unzipSync } from "three/examples/jsm/libs/fflate.module.js"

const SUPPORTED_EXTENSIONS = new Set(["stl", "3mf", "obj", "glb"])
const ROOT = process.cwd()
const PUBLIC_ROOT = path.join(ROOT, "public", "model-previews")
const OUT_ROOT = path.join(ROOT, "out", "model-previews")
const SITE_URL = "https://www.x3dprints.be"
const MAX_MODEL_BYTES = 250 * 1024 * 1024
const DENY_HTACCESS = `Options -Indexes
<IfModule mod_authz_core.c>
  Require all denied
</IfModule>
<IfModule !mod_authz_core.c>
  Order allow,deny
  Deny from all
</IfModule>
`

function usage(message) {
  if (message) console.error(`\n${message}\n`)
  console.log(`Gebruik:
  npm run share:model

De generator vraagt daarna stap voor stap naar bestand, projectnaam, klant en versie.

Geavanceerd:
  node scripts/create-model-preview.mjs "C:\\pad\\model.3mf" --title "Projectnaam" [opties]

Opties:
  --client "Naam"       Klantnaam (optioneel)
  --version "V1"        Versie, standaard V1
  --unit "mm"           Maateenheid: mm, cm of m; standaard mm
  --days "14"           Geldigheid in dagen: 1-90; standaard 14
  --note "Tekst"        Korte toelichting voor de klant
  --project "project-id" Koppel een nieuwe, onafhankelijke revisie aan een bestaand project
`)
  process.exit(message ? 1 : 0)
}

async function promptForMissing(options) {
  if (options.file && options.title) return options
  if (!process.stdin.isTTY) usage("Bestand en projectnaam ontbreken.")

  const prompt = createInterface({ input: process.stdin, output: process.stdout })
  try {
    console.log("\nX3DPrints modelpreview maken\n")
    options.file ||= (await prompt.question("Pad naar STL/3MF/OBJ/GLB: ")).trim().replace(/^['\"]|['\"]$/g, "")
    options.title ||= (await prompt.question("Projectnaam voor de klant: ")).trim()
    options.client ||= (await prompt.question("Klantnaam (optioneel): ")).trim()
    const version = (await prompt.question("Versie [V1]: ")).trim()
    if (version) options.version = version
    const unit = (await prompt.question("Maateenheid [mm]: ")).trim()
    if (unit) options.unit = unit
    const days = (await prompt.question("Geldigheid in dagen [14]: ")).trim()
    if (days) options.days = days
    options.note ||= (await prompt.question("Korte toelichting (optioneel): ")).trim()
    return options
  } finally {
    prompt.close()
  }
}

function parseArgs(args) {
  const result = { file: "", title: "", client: "", version: "V1", unit: "mm", days: "14", note: "", project: "" }
  for (let index = 0; index < args.length; index += 1) {
    const entry = args[index]
    if (entry === "--help" || entry === "-h") usage()
    if (!entry.startsWith("--") && !result.file) {
      result.file = entry
      continue
    }
    const key = entry.slice(2)
    if (!(key in result)) usage(`Onbekende optie: ${entry}`)
    const value = args[index + 1]
    if (!value || value.startsWith("--")) usage(`Waarde ontbreekt voor ${entry}`)
    result[key] = value.trim()
    index += 1
  }
  return result
}

function validId(value) {
  return /^[a-z0-9][a-z0-9_-]{7,63}$/.test(value)
}

async function exists(target) {
  try {
    await access(target)
    return true
  } catch {
    return false
  }
}

function attributes(source) {
  const result = {}
  for (const match of source.matchAll(/([:\w-]+)\s*=\s*"([^"]*)"/g)) {
    result[match[1]] = match[2]
  }
  return result
}

function transformFrom(value) {
  const parsed = String(value || "")
    .trim()
    .split(/\s+/)
    .map(Number)
  return parsed.length === 12 && parsed.every(Number.isFinite)
    ? parsed
    : [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0]
}

function applyTransform([x, y, z], matrix) {
  return [
    x * matrix[0] + y * matrix[3] + z * matrix[6] + matrix[9],
    x * matrix[1] + y * matrix[4] + z * matrix[7] + matrix[10],
    x * matrix[2] + y * matrix[5] + z * matrix[8] + matrix[11],
  ]
}

function normalizeArchivePath(currentFile, target) {
  const cleanTarget = target.replace(/^\/+/, "").replaceAll("\\", "/")
  if (target.startsWith("/")) return cleanTarget
  return path.posix.normalize(path.posix.join(path.posix.dirname(currentFile), cleanTarget))
}

function parseModelFile(filePath, xml) {
  const objects = new Map()
  for (const match of xml.matchAll(/<object\b([^>]*)>([\s\S]*?)<\/object>/gi)) {
    const objectAttrs = attributes(match[1])
    const body = match[2]
    const meshMatch = body.match(/<mesh\b[^>]*>([\s\S]*?)<\/mesh>/i)
    const componentsMatch = body.match(/<components\b[^>]*>([\s\S]*?)<\/components>/i)
    const object = { mesh: null, components: [] }

    if (meshMatch) {
      const vertices = Array.from(meshMatch[1].matchAll(/<vertex\b([^>]*)\/?\s*>/gi), (entry) => {
        const props = attributes(entry[1])
        return [Number(props.x), Number(props.y), Number(props.z)]
      }).filter((vertex) => vertex.every(Number.isFinite))
      const triangles = Array.from(meshMatch[1].matchAll(/<triangle\b([^>]*)\/?\s*>/gi), (entry) => {
        const props = attributes(entry[1])
        return [Number(props.v1), Number(props.v2), Number(props.v3)]
      }).filter((triangle) => triangle.every(Number.isInteger))
      if (vertices.length && triangles.length) object.mesh = { vertices, triangles }
    }

    if (componentsMatch) {
      object.components = Array.from(componentsMatch[1].matchAll(/<component\b([^>]*)\/?\s*>/gi), (entry) => {
        const props = attributes(entry[1])
        const targetPath = props["p:path"] || props.path || filePath
        return {
          filePath: normalizeArchivePath(filePath, targetPath),
          objectId: props.objectid,
          transform: transformFrom(props.transform),
        }
      })
    }
    if (objectAttrs.id) objects.set(objectAttrs.id, object)
  }

  const buildMatch = xml.match(/<build\b[^>]*>([\s\S]*?)<\/build>/i)
  const build = buildMatch
    ? Array.from(buildMatch[1].matchAll(/<item\b([^>]*)\/?\s*>/gi), (entry) => {
        const props = attributes(entry[1])
        return { objectId: props.objectid, transform: transformFrom(props.transform) }
      })
    : []

  return { objects, build }
}

async function convertThreeMfToObj(source, target) {
  const archive = unzipSync(new Uint8Array(await readFile(source)))
  const modelFiles = new Map()
  for (const [fileName, bytes] of Object.entries(archive)) {
    if (!fileName.toLowerCase().endsWith(".model")) continue
    const normalized = fileName.replaceAll("\\", "/")
    modelFiles.set(normalized, parseModelFile(normalized, strFromU8(bytes)))
  }

  const mainPath = Array.from(modelFiles.keys()).find((entry) => entry.toLowerCase() === "3d/3dmodel.model")
    ?? Array.from(modelFiles.keys())[0]
  if (!mainPath) throw new Error("Het 3MF-bestand bevat geen leesbaar model.")

  const meshes = []
  const resolveObject = (filePath, objectId, outerTransforms = [], trail = new Set()) => {
    const key = `${filePath}#${objectId}`
    if (trail.has(key)) return
    const file = modelFiles.get(filePath)
    const object = file?.objects.get(String(objectId))
    if (!object) return
    const nextTrail = new Set(trail).add(key)

    if (object.mesh) {
      const vertices = object.mesh.vertices.map((vertex) => {
        let transformed = vertex
        for (const matrix of outerTransforms) transformed = applyTransform(transformed, matrix)
        return transformed
      })
      meshes.push({ vertices, triangles: object.mesh.triangles })
    }
    for (const component of object.components) {
      resolveObject(component.filePath, component.objectId, [component.transform, ...outerTransforms], nextTrail)
    }
  }

  const main = modelFiles.get(mainPath)
  if (main.build.length) {
    for (const item of main.build) resolveObject(mainPath, item.objectId, [item.transform])
  } else {
    for (const objectId of main.objects.keys()) resolveObject(mainPath, objectId)
  }

  if (!meshes.length) {
    // Sommige eenvoudige 3MF-bestanden hebben geen build-sectie; neem dan alle losse meshes op.
    for (const [filePath, file] of modelFiles) {
      for (const objectId of file.objects.keys()) resolveObject(filePath, objectId)
    }
  }
  if (!meshes.length) throw new Error("Er werd geen driehoeksmesh gevonden in dit 3MF-bestand.")

  const lines = ["# X3DPrints customer preview generated from 3MF"]
  let vertexOffset = 1
  meshes.forEach((mesh, index) => {
    lines.push(`o part_${index + 1}`)
    for (const vertex of mesh.vertices) lines.push(`v ${vertex[0]} ${vertex[1]} ${vertex[2]}`)
    for (const triangle of mesh.triangles) {
      lines.push(`f ${triangle[0] + vertexOffset} ${triangle[1] + vertexOffset} ${triangle[2] + vertexOffset}`)
    }
    vertexOffset += mesh.vertices.length
  })
  await writeFile(target, `${lines.join("\n")}\n`, "utf8")
}

async function writePreview(root, id, source, extension, manifest, convertThreeMf) {
  const targetDir = path.join(root, id)
  await mkdir(targetDir, { recursive: true })
  await writeFile(path.join(targetDir, ".htaccess"), DENY_HTACCESS, "utf8")
  const targetModel = path.join(targetDir, `model.${extension}`)
  if (convertThreeMf) await convertThreeMfToObj(source, targetModel)
  else await copyFile(source, targetModel)
  const modelStats = await stat(targetModel)
  await writeFile(path.join(targetDir, "manifest.json"), `${JSON.stringify({ ...manifest, size: modelStats.size }, null, 2)}\n`, "utf8")
  await writeFile(path.join(targetDir, "state.json"), `${JSON.stringify({
    lastViewedAt: null,
    decision: null,
    decisionAt: null,
    decisionName: null,
    decisionEmail: null,
    decisionComment: null,
    decisionRevisionId: null,
    revokedAt: null,
  }, null, 2)}\n`, "utf8")
  return targetDir
}

async function main() {
  const options = await promptForMissing(parseArgs(process.argv.slice(2)))
  if (!options.file) usage("Geef eerst het pad naar een modelbestand op.")
  if (!options.title) usage("--title is verplicht, zodat de klant weet welk ontwerp dit is.")

  const source = path.resolve(options.file)
  if (!(await exists(source))) usage(`Bestand niet gevonden: ${source}`)
  const sourceStats = await stat(source)
  if (!sourceStats.isFile() || sourceStats.size < 1 || sourceStats.size > MAX_MODEL_BYTES) {
    usage("Het model moet een bestand van maximaal 250 MB zijn.")
  }

  const sourceExtension = path.extname(source).slice(1).toLowerCase()
  if (!SUPPORTED_EXTENSIONS.has(sourceExtension)) {
    usage("Ondersteunde formaten: STL, 3MF, OBJ en GLB.")
  }
  if (!new Set(["mm", "cm", "m"]).has(options.unit)) {
    usage("--unit moet mm, cm of m zijn.")
  }

  const days = Number(options.days)
  if (!Number.isInteger(days) || days < 1 || days > 90) usage("--days moet een geheel getal van 1 tot en met 90 zijn.")

  const id = randomBytes(16).toString("hex")
  const projectId = options.project || randomBytes(16).toString("hex")
  if (!validId(projectId)) usage("--project moet een geldige project-id bevatten.")

  const convertThreeMf = sourceExtension === "3mf"
  const extension = convertThreeMf ? "obj" : sourceExtension
  const createdAt = new Date()
  const manifest = {
    projectId,
    revisionId: id,
    title: options.title,
    client: options.client || undefined,
    version: options.version,
    unit: options.unit,
    note: options.note || undefined,
    createdAt: createdAt.toISOString(),
    expiresAt: new Date(createdAt.getTime() + days * 86400000).toISOString(),
    file: `model.${extension}`,
    format: extension,
    sourceFormat: sourceExtension,
  }

  const publicDir = await writePreview(PUBLIC_ROOT, id, source, extension, manifest, convertThreeMf)
  let outDir = null
  if (await exists(path.join(ROOT, "out"))) {
    outDir = await writePreview(OUT_ROOT, id, source, extension, manifest, convertThreeMf)
  }

  console.log("\nModelpreview aangemaakt.\n")
  console.log(`Klantlink: ${SITE_URL}/model-preview/?id=${id}`)
  console.log(`Bronmap:   ${publicDir}`)
  if (outDir) console.log(`FTP-map:    ${outDir}`)
  console.log("\nUpload bij een bestaande site alleen de FTP-map onder /model-previews/.")
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
