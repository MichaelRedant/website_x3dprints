"use client"

import type { DragEvent } from "react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useThree } from "@react-three/fiber"
import { Center, ContactShadows, Environment, Html, OrbitControls } from "@react-three/drei"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import {
  AlertCircle,
  CheckCircle2,
  Gauge,
  Loader2,
  RotateCw,
  ShieldCheck,
  Upload,
  XCircle,
} from "lucide-react"
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js"
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js"
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib"

import { cn } from "@/lib/utils"

const ACCEPTED_EXTENSIONS = ["stl", "obj", "glb", "gltf"] as const
const MAX_FILE_SIZE = 15 * 1024 * 1024 // 15 MB
const MAX_FILE_SIZE_MB = Math.round(MAX_FILE_SIZE / (1024 * 1024))

export type ModelViewerProps = {
  className?: string
}

const material = new THREE.MeshStandardMaterial({
  color: new THREE.Color("#60a5fa"),
  metalness: 0.25,
  roughness: 0.35,
})

function disposeMaterial(mat: THREE.Material | THREE.Material[]) {
  if (Array.isArray(mat)) {
    mat.forEach((m) => disposeMaterial(m))
    return
  }
  if ("dispose" in mat) {
    mat.dispose()
  }
}

function disposeModel(object: THREE.Object3D | null) {
  if (!object) return
  object.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh
      mesh.geometry.dispose()
      if (mesh.material) {
        disposeMaterial(mesh.material)
      }
    }
  })
}

function setWireframe(material: THREE.Material | THREE.Material[], enabled: boolean) {
  if (Array.isArray(material)) {
    material.forEach((entry) => setWireframe(entry, enabled))
    return
  }
  if ("wireframe" in material) {
    ;(material as THREE.MeshStandardMaterial).wireframe = enabled
    material.needsUpdate = true
  }
}

function applyWireframe(object: THREE.Object3D | null, enabled: boolean) {
  if (!object) return
  object.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh
      if (mesh.material) {
        setWireframe(mesh.material, enabled)
      }
    }
  })
}

type ModelStats = {
  vertices: number
  faces: number
  ext: string
  fileName: string
}

type ViewerState = "idle" | "loading" | "ready" | "error"

async function loadModel(file: File, ext: typeof ACCEPTED_EXTENSIONS[number]) {
  if (ext === "stl") {
    const loader = new STLLoader()
    const buffer = await file.arrayBuffer()
    const geometry = loader.parse(buffer)
    geometry.computeVertexNormals()
    const mesh = new THREE.Mesh(geometry, material.clone())
    mesh.castShadow = true
    mesh.receiveShadow = true
    const group = new THREE.Group()
    group.add(mesh)
    return group
  }

  if (ext === "obj") {
    const loader = new OBJLoader()
    const text = await file.text()
    const group = loader.parse(text)
    group.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        mesh.material = material.clone()
        mesh.castShadow = true
        mesh.receiveShadow = true
      }
    })
    return group
  }

  const loader = new GLTFLoader()
  const arrayBuffer = await file.arrayBuffer()

  const gltf = await loader.parseAsync(arrayBuffer, "")
  const scene = gltf.scene ?? gltf.scenes?.[0]
  if (!scene) {
    throw new Error("Kon geen mesh vinden in dit bestand.")
  }
  scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh
      if (!Array.isArray(mesh.material)) {
        mesh.material = material.clone()
      }
      mesh.castShadow = true
      mesh.receiveShadow = true
    }
  })
  return scene
}

function extractStats(object: THREE.Object3D, ext: string, fileName: string): ModelStats {
  let vertices = 0
  let faces = 0
  object.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh
      const geometry = mesh.geometry
      const position = geometry.getAttribute("position")
      const index = geometry.getIndex()
      if (position) {
        vertices += position.count
        const faceCount = index ? index.count / 3 : position.count / 3
        faces += Math.round(faceCount)
      }
    }
  })
  return {
    vertices,
    faces,
    ext,
    fileName,
  }
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("nl-BE").format(value)
}

function FitCamera({ object, trigger }: { object: THREE.Object3D | null; trigger: number }) {
  const { camera, controls } = useThree()
  const cameraRef = useRef(camera)
  const controlsRef = useRef(controls)

  useEffect(() => {
    cameraRef.current = camera
    controlsRef.current = controls
  }, [camera, controls])

  useEffect(() => {
    if (!object) return
    const activeCamera = cameraRef.current
    if (!(activeCamera instanceof THREE.PerspectiveCamera)) return

    const box = new THREE.Box3().setFromObject(object)
    if (box.isEmpty()) return

    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z, 0.001)
    const fov = (activeCamera.fov * Math.PI) / 180
    const distance = (maxDim / (2 * Math.tan(fov / 2))) * 1.6
    const direction = activeCamera.position.clone().sub(center)

    if (direction.lengthSq() === 0) {
      direction.set(1, 0.8, 1)
    }

    direction.normalize()
    activeCamera.position.copy(center.clone().add(direction.multiplyScalar(distance)))
    activeCamera.near = Math.max(distance / 100, 0.01)
    activeCamera.far = Math.max(distance * 100, 100)
    activeCamera.updateProjectionMatrix()

    const orbitControls = controlsRef.current as OrbitControlsImpl | undefined
    if (orbitControls) {
      orbitControls.target.copy(center)
      orbitControls.minDistance = Math.max(distance / 6, 0.1)
      orbitControls.maxDistance = distance * 6
      orbitControls.update()
    }
  }, [object, trigger])

  return null
}

export default function ModelViewer({ className }: ModelViewerProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const prefersReducedMotion = useReducedMotion()

  const [state, setState] = useState<ViewerState>("idle")
  const [error, setError] = useState<string | null>(null)
  const [model, setModel] = useState<THREE.Object3D | null>(null)
  const [modelKey, setModelKey] = useState(0)
  const [stats, setStats] = useState<ModelStats | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [autoRotate, setAutoRotate] = useState(() => !prefersReducedMotion)
  const [wireframe, setWireframeEnabled] = useState(false)
  const [showGrid, setShowGrid] = useState(false)
  const [fitToken, setFitToken] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion) {
      setAutoRotate(false)
    }
  }, [prefersReducedMotion])

  useEffect(() => {
    return () => {
      disposeModel(model)
    }
  }, [model])

  useEffect(() => {
    applyWireframe(model, wireframe)
  }, [model, wireframe])

  const reset = useCallback(() => {
    setState("idle")
    setError(null)
    setStats(null)
    setAutoRotate(!prefersReducedMotion)
    setModel((previous) => {
      disposeModel(previous)
      return null
    })
    setModelKey((key) => key + 1)
    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }, [prefersReducedMotion])

  const resetView = useCallback(() => {
    setAutoRotate(!prefersReducedMotion)
    setFitToken((value) => value + 1)
  }, [prefersReducedMotion])

  const handleFiles = useCallback(
    async (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return
      const file = fileList[0]
      const ext = file.name.split(".").pop()?.toLowerCase()
      if (!ext || !ACCEPTED_EXTENSIONS.includes(ext as typeof ACCEPTED_EXTENSIONS[number])) {
        setState("error")
        setError("Bestandsformaat wordt niet ondersteund. Kies een STL, OBJ, GLB of GLTF.")
        return
      }
      if (file.size > MAX_FILE_SIZE) {
        setState("error")
        setError("Bestand is groter dan 15 MB. Vraag een geoptimaliseerde export aan.")
        return
      }

      setState("loading")
      setError(null)

      try {
        const loaded = await loadModel(file, ext as typeof ACCEPTED_EXTENSIONS[number])
        const statsPayload = extractStats(loaded, ext, file.name)
        setStats(statsPayload)
        setModel((previous) => {
          disposeModel(previous)
          return loaded
        })
        setModelKey((key) => key + 1)
        setState("ready")
      } catch (err) {
        console.error(err)
        setState("error")
        setError(
          err instanceof Error
            ? err.message
            : "We konden dit model niet openen. Probeer een ander formaat of controleer of het bestand compleet is."
        )
        setModel((previous) => {
          disposeModel(previous)
          return null
        })
        setStats(null)
      }
    },
    []
  )

  const onDrop = useCallback(
    (event: DragEvent<HTMLElement>) => {
      event.preventDefault()
      setDragActive(false)
      if (event.dataTransfer?.files?.length) {
        void handleFiles(event.dataTransfer.files)
      }
    },
    [handleFiles]
  )

  const onDragOver = useCallback((event: DragEvent<HTMLElement>) => {
    event.preventDefault()
    setDragActive(true)
  }, [])

  const onDragLeave = useCallback((event: DragEvent<HTMLElement>) => {
    event.preventDefault()
    if (!containerRef.current?.contains(event.relatedTarget as Node)) {
      setDragActive(false)
    }
  }, [])

  const viewerOverlay = useMemo(() => {
    if (state === "ready" || state === "loading") return null
    return (
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[radial-gradient(circle_at_top,#0f172a80,transparent)] px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center gap-3"
        >
          <Upload className="h-10 w-10 text-sky-300" aria-hidden />
          <div className="text-lg font-semibold text-white">Upload een STL, OBJ of GLB</div>
          <p className="max-w-md text-sm text-slate-300">
            Je bestand blijft volledig lokaal in de browser. Sleep het hierheen of gebruik de uploadknop.
          </p>
        </motion.div>
      </div>
    )
  }, [state])

  return (
    <div ref={containerRef} className={cn("grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]", className)}>
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 shadow-2xl">
        <Canvas
          key={modelKey}
          dpr={[1, 1.8]}
          camera={{ position: [3.6, 2.4, 3.6], fov: 45, near: 0.1, far: 100 }}
          gl={{ antialias: true, preserveDrawingBuffer: false, powerPreference: "high-performance" }}
          shadows
        >
          <color attach="background" args={["#030712"]} />
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 8, 5]} intensity={0.6} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
          <spotLight position={[-5, 6, -4]} angle={0.6} intensity={0.4} castShadow />

          <Center>
            {model ? <primitive object={model} dispose={undefined} /> : null}
          </Center>
          <FitCamera object={model} trigger={fitToken} />

          {showGrid ? <gridHelper args={[8, 16, "#334155", "#1f2937"]} /> : null}
          {showGrid ? <axesHelper args={[2]} /> : null}

          <ContactShadows opacity={0.4} scale={10} blur={1.4} far={4.5} />
          <Environment preset="city" environmentIntensity={0.65} />
          <OrbitControls
            enablePan
            enableZoom
            autoRotate={autoRotate}
            autoRotateSpeed={0.75}
            enableDamping
            dampingFactor={0.08}
            makeDefault
            onStart={() => setAutoRotate(false)}
          />

          {state === "loading" ? (
            <Html center>
              <div className="flex items-center gap-2 rounded-full bg-slate-900/80 px-4 py-2 text-xs font-medium text-slate-100">
                <Loader2 className="h-4 w-4 animate-spin" /> Model wordt geladen...
              </div>
            </Html>
          ) : null}
        </Canvas>
        {viewerOverlay}
      </div>

      <div className="space-y-4">
        <div className="space-y-4 rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-lg dark:border-slate-700/70 dark:bg-slate-950/75">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">1. Upload</p>
          <div
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            className={cn(
              "relative flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-slate-300/60 p-6 text-center transition dark:border-slate-700/70",
              dragActive ? "border-sky-400/80 bg-sky-500/5 dark:bg-sky-400/10" : "bg-white hover:border-slate-400 dark:bg-slate-900/80 dark:hover:border-slate-500"
            )}
          >
            <input
              ref={inputRef}
              type="file"
              name="model"
              accept=".stl,.obj,.glb,.gltf"
              className="sr-only"
              onChange={(event) => {
                void handleFiles(event.target.files)
              }}
            />
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/10 dark:bg-sky-400/10">
              <Upload className="h-5 w-5 text-sky-400" aria-hidden />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900 dark:text-slate-50">Sleep een STL, OBJ of GLB hierheen</div>
              <p className="text-xs text-slate-600 dark:text-slate-300">Max. {MAX_FILE_SIZE_MB} MB - we verwerken alles lokaal</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="rounded-full border border-slate-300/70 px-4 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:text-slate-50"
              >
                Kies bestand
              </button>
              <span>of sleep het in deze zone</span>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200/70 bg-white/70 p-4 shadow-sm dark:border-slate-700/70 dark:bg-slate-900/80">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 text-emerald-500" aria-hidden />
              <div className="space-y-1 text-sm">
                <p className="font-semibold text-slate-900 dark:text-slate-50">Privacy eerst</p>
                <p className="text-slate-600 dark:text-slate-300">
                  Het model wordt nooit naar onze servers verzonden. Alles draait binnen je browser en verdwijnt zodra je de pagina sluit.
                </p>
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {state === "error" && error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-300/30 dark:bg-red-500/10 dark:text-red-200"
            >
              <AlertCircle className="h-5 w-5" aria-hidden />
              <div>
                <p className="font-medium">Er ging iets mis</p>
                <p>{error}</p>
              </div>
            </motion.div>
          ) : null}

          {state === "ready" && stats ? (
            <motion.div
              key="ready"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="space-y-3 rounded-3xl border border-emerald-200 bg-emerald-50/70 p-4 text-sm text-emerald-900 dark:border-emerald-300/30 dark:bg-emerald-500/10 dark:text-emerald-100"
            >
              <div className="flex items-center gap-2 font-semibold">
                <CheckCircle2 className="h-5 w-5" aria-hidden />
                {stats.fileName}
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-emerald-800 dark:text-emerald-200">
                <div className="rounded-2xl border border-emerald-200/70 bg-white/60 p-3 dark:border-emerald-300/25 dark:bg-slate-950/45">
                  <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-200">
                    <Gauge className="h-4 w-4" aria-hidden />
                    Mesh stats
                  </div>
                  <p className="mt-2 text-sm font-semibold text-emerald-900 dark:text-emerald-50">{formatNumber(stats.faces)} faces</p>
                  <p className="text-xs text-emerald-700 dark:text-emerald-200">{formatNumber(stats.vertices)} vertices</p>
                </div>
                <div className="rounded-2xl border border-emerald-200/70 bg-white/60 p-3 dark:border-emerald-300/25 dark:bg-slate-950/45">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-700">Bestand</p>
                  <p className="mt-2 text-sm font-semibold text-emerald-900 dark:text-emerald-50">.{stats.ext}</p>
                  <button
                    type="button"
                    onClick={() => setAutoRotate((value) => !value)}
                    className="mt-3 inline-flex items-center gap-1 rounded-full border border-emerald-200/70 px-3 py-1 text-xs font-semibold text-emerald-800 transition hover:bg-emerald-100 dark:border-emerald-300/25 dark:text-emerald-100 dark:hover:bg-emerald-400/15"
                  >
                    <RotateCw className="h-3.5 w-3.5" aria-hidden />
                    {autoRotate ? "Auto-rotate aan" : "Auto-rotate uit"}
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={resetView}
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-emerald-800 transition hover:bg-white dark:border-emerald-300/25 dark:bg-slate-950/45 dark:text-emerald-100 dark:hover:bg-slate-900"
                >
                  <RotateCw className="h-4 w-4" aria-hidden />
                  Reset weergave
                </button>
                <button
                  type="button"
                  onClick={() => setWireframeEnabled((value) => !value)}
                  aria-pressed={wireframe}
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-emerald-800 transition hover:bg-white dark:border-emerald-300/25 dark:bg-slate-950/45 dark:text-emerald-100 dark:hover:bg-slate-900"
                >
                  {wireframe ? "Wireframe aan" : "Wireframe uit"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowGrid((value) => !value)}
                  aria-pressed={showGrid}
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-emerald-800 transition hover:bg-white dark:border-emerald-300/25 dark:bg-slate-950/45 dark:text-emerald-100 dark:hover:bg-slate-900"
                >
                  {showGrid ? "Grid aan" : "Grid uit"}
                </button>
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-emerald-800 transition hover:bg-white dark:border-emerald-300/25 dark:bg-slate-950/45 dark:text-emerald-100 dark:hover:bg-slate-900"
                >
                  <XCircle className="h-4 w-4" aria-hidden />
                  Verwijder model
                </button>
              </div>
            </motion.div>
          ) : null}

          {state === "loading" ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/80 p-4 text-sm text-slate-700 dark:border-slate-700/70 dark:bg-slate-900/80 dark:text-slate-200"
            >
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
              Model wordt voorbereid...
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  )
}
