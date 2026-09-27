import { strFromU8, unzipSync } from "fflate"

type Matrix = [number, number, number, number, number, number, number, number, number, number, number, number]
type Point = [number, number, number]
type Mesh = { vertices: Point[]; triangles: Point[] }
type Component = { filePath: string; objectId: string; transform: Matrix }
type ModelObject = { mesh: Mesh | null; components: Component[] }
type ModelFile = { objects: Map<string, ModelObject>; build: Array<{ objectId: string; transform: Matrix }> }

const IDENTITY: Matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0]

function attributes(source: string) {
  const result: Record<string, string> = {}
  for (const match of source.matchAll(/([:\w-]+)\s*=\s*"([^"]*)"/g)) result[match[1]] = match[2]
  return result
}

function transformFrom(value?: string): Matrix {
  const parsed = String(value ?? "").trim().split(/\s+/).map(Number)
  return parsed.length === 12 && parsed.every(Number.isFinite) ? parsed as Matrix : [...IDENTITY]
}

function applyTransform([x, y, z]: Point, matrix: Matrix): Point {
  return [
    x * matrix[0] + y * matrix[3] + z * matrix[6] + matrix[9],
    x * matrix[1] + y * matrix[4] + z * matrix[7] + matrix[10],
    x * matrix[2] + y * matrix[5] + z * matrix[8] + matrix[11],
  ]
}

function normalizeArchivePath(currentFile: string, target: string) {
  const cleanTarget = target.replace(/^\/+/, "").replaceAll("\\", "/")
  if (target.startsWith("/")) return cleanTarget
  const parts = `${currentFile.slice(0, currentFile.lastIndexOf("/") + 1)}${cleanTarget}`.split("/")
  const normalized: string[] = []
  for (const part of parts) {
    if (!part || part === ".") continue
    if (part === "..") normalized.pop()
    else normalized.push(part)
  }
  return normalized.join("/")
}

function parseModelFile(filePath: string, xml: string): ModelFile {
  const objects = new Map<string, ModelObject>()
  for (const match of xml.matchAll(/<object\b([^>]*)>([\s\S]*?)<\/object>/gi)) {
    const objectAttributes = attributes(match[1])
    const body = match[2]
    const meshMatch = body.match(/<mesh\b[^>]*>([\s\S]*?)<\/mesh>/i)
    const componentsMatch = body.match(/<components\b[^>]*>([\s\S]*?)<\/components>/i)
    const object: ModelObject = { mesh: null, components: [] }

    if (meshMatch) {
      const vertices = Array.from(meshMatch[1].matchAll(/<vertex\b([^>]*)\/?\s*>/gi), (entry): Point => {
        const values = attributes(entry[1])
        return [Number(values.x), Number(values.y), Number(values.z)]
      }).filter((vertex) => vertex.every(Number.isFinite))
      const triangles = Array.from(meshMatch[1].matchAll(/<triangle\b([^>]*)\/?\s*>/gi), (entry): Point => {
        const values = attributes(entry[1])
        return [Number(values.v1), Number(values.v2), Number(values.v3)]
      }).filter((triangle) => triangle.every(Number.isInteger))
      if (vertices.length && triangles.length) object.mesh = { vertices, triangles }
    }

    if (componentsMatch) {
      object.components = Array.from(componentsMatch[1].matchAll(/<component\b([^>]*)\/?\s*>/gi), (entry) => {
        const values = attributes(entry[1])
        return {
          filePath: normalizeArchivePath(filePath, values["p:path"] || values.path || filePath),
          objectId: values.objectid,
          transform: transformFrom(values.transform),
        }
      })
    }
    if (objectAttributes.id) objects.set(objectAttributes.id, object)
  }

  const buildMatch = xml.match(/<build\b[^>]*>([\s\S]*?)<\/build>/i)
  const build = buildMatch ? Array.from(buildMatch[1].matchAll(/<item\b([^>]*)\/?\s*>/gi), (entry) => {
    const values = attributes(entry[1])
    return { objectId: values.objectid, transform: transformFrom(values.transform) }
  }) : []

  return { objects, build }
}

export async function convertThreeMfToObj(file: File) {
  const archive = unzipSync(new Uint8Array(await file.arrayBuffer()))
  const modelFiles = new Map<string, ModelFile>()
  for (const [fileName, bytes] of Object.entries(archive)) {
    if (!fileName.toLowerCase().endsWith(".model")) continue
    const normalized = fileName.replaceAll("\\", "/")
    modelFiles.set(normalized, parseModelFile(normalized, strFromU8(bytes)))
  }

  const mainPath = Array.from(modelFiles.keys()).find((entry) => entry.toLowerCase() === "3d/3dmodel.model")
    ?? Array.from(modelFiles.keys())[0]
  if (!mainPath) throw new Error("Dit 3MF-bestand bevat geen leesbaar model.")

  const meshes: Mesh[] = []
  const resolveObject = (filePath: string, objectId: string, transforms: Matrix[] = [], trail = new Set<string>()) => {
    const key = `${filePath}#${objectId}`
    if (trail.has(key)) return
    const object = modelFiles.get(filePath)?.objects.get(String(objectId))
    if (!object) return
    const nextTrail = new Set(trail).add(key)
    if (object.mesh) {
      meshes.push({
        vertices: object.mesh.vertices.map((vertex) => transforms.reduce((point, matrix) => applyTransform(point, matrix), vertex)),
        triangles: object.mesh.triangles,
      })
    }
    for (const component of object.components) {
      resolveObject(component.filePath, component.objectId, [component.transform, ...transforms], nextTrail)
    }
  }

  const main = modelFiles.get(mainPath)
  if (main?.build.length) {
    for (const item of main.build) resolveObject(mainPath, item.objectId, [item.transform])
  } else if (main) {
    for (const objectId of main.objects.keys()) resolveObject(mainPath, objectId)
  }
  if (!meshes.length) {
    for (const [filePath, modelFile] of modelFiles) {
      for (const objectId of modelFile.objects.keys()) resolveObject(filePath, objectId)
    }
  }
  if (!meshes.length) throw new Error("Er werd geen bruikbare geometrie in dit 3MF-bestand gevonden.")

  const lines = ["# X3DPrints tijdelijke klantpreview"]
  let offset = 1
  meshes.forEach((mesh, index) => {
    lines.push(`o part_${index + 1}`)
    for (const [x, y, z] of mesh.vertices) lines.push(`v ${x} ${y} ${z}`)
    for (const [a, b, c] of mesh.triangles) lines.push(`f ${a + offset} ${b + offset} ${c + offset}`)
    offset += mesh.vertices.length
  })
  return new File([`${lines.join("\n")}\n`], "model.obj", { type: "text/plain" })
}
