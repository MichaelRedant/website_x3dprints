"use client"

import type { DragEvent } from "react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Canvas } from "@react-three/fiber"
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
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader"
import { STLLoader } from "three/examples/jsm/loaders/STLLoader"

import { cn } from "@/lib/utils"

const ACCEPTED_EXTENSIONS = ["stl", "obj", "glb", "gltf"] as const
const MAX_FILE_SIZE = 15 * 1024 * 1024 // 15 MB
const MAX_FILE_SIZE_MB = Math.round(MAX_FILE_SIZE / (1024 * 1024))

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
      const position = mesh.geometry.getAttribute("position")
      if (position) {
        vertices += position.count
        faces += Math.round(position.count / 3)
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

export default function ModelViewer({ className }: { className?: string }) {
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
    (event: DragEvent<HTMLLabelElement>) => {
      event.preventDefault()
      setDragActive(false)
      if (event.dataTransfer?.files?.length) {
        void handleFiles(event.dataTransfer.files)
      }
    },
    [handleFiles]
  )

  const onDragOver = useCallback((event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
    setDragActive(true)
  }, [])

  const onDragLeave = useCallback((event: DragEvent<HTMLLabelElement>) => {
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

          <ContactShadows opacity={0.4} scale={10} blur={1.4} far={4.5} />
          <Environment preset="city" intensity={0.65} />
          <OrbitControls
            enablePan
            enableZoom
            autoRotate={autoRotate}
            autoRotateSpeed={0.75}
            enableDamping
            dampingFactor={0.08}
            makeDefault
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
        <label
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={cn(
            "relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-3xl border border-dashed p-6 text-center transition",
            dragActive ? "border-sky-400/80 bg-sky-500/5" : "border-slate-400/40 bg-white/10 hover:border-slate-300/60"
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
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-500/10">
            <Upload className="h-5 w-5 text-sky-400" aria-hidden />
          </div>
          <div className="text-sm font-semibold text-slate-900">Sleep je bestand hierheen</div>
          <p className="text-xs text-slate-600">
            Ondersteunt STL, OBJ en GLB (max. {MAX_FILE_SIZE_MB} MB). Bestand blijft lokaal.
          </p>
        </label>

        <div className="rounded-3xl border border-slate-200/70 bg-white/70 p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 h-5 w-5 text-emerald-500" aria-hidden />
            <div className="space-y-1 text-sm">
              <p className="font-semibold text-slate-900">Privacy eerst</p>
              <p className="text-slate-600">
                Het model wordt nooit naar onze servers verzonden. Alles draait binnen je browser en verdwijnt zodra je de pagina sluit.
              </p>
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
              className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
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
              className="space-y-3 rounded-3xl border border-emerald-200 bg-emerald-50/70 p-4 text-sm text-emerald-900"
            >
              <div className="flex items-center gap-2 font-semibold">
                <CheckCircle2 className="h-5 w-5" aria-hidden />
                {stats.fileName}
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-emerald-800">
                <div className="rounded-2xl border border-emerald-200/70 bg-white/60 p-3">
                  <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-emerald-700">
                    <Gauge className="h-4 w-4" aria-hidden />
                    Mesh stats
                  </div>
                  <p className="mt-2 text-sm font-semibold text-emerald-900">{formatNumber(stats.faces)} faces</p>
                  <p className="text-xs text-emerald-700">{formatNumber(stats.vertices)} vertices</p>
                </div>
                <div className="rounded-2xl border border-emerald-200/70 bg-white/60 p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-700">Bestand</p>
                  <p className="mt-2 text-sm font-semibold text-emerald-900">.{stats.ext}</p>
                  <button
                    type="button"
                    onClick={() => setAutoRotate((value) => !value)}
                    className="mt-3 inline-flex items-center gap-1 rounded-full border border-emerald-200/70 px-3 py-1 text-xs font-semibold text-emerald-800 transition hover:bg-emerald-100"
                  >
                    <RotateCw className="h-3.5 w-3.5" aria-hidden />
                    {autoRotate ? "Auto-rotate aan" : "Auto-rotate uit"}
                  </button>
                </div>
              </div>
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-emerald-800 transition hover:bg-white"
              >
                <XCircle className="h-4 w-4" aria-hidden />
                Verwijder model
              </button>
            </motion.div>
          ) : null}

          {state === "loading" ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/80 p-4 text-sm text-slate-700"
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
