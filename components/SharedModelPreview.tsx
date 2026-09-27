"use client"

import { useEffect, useState } from "react"
import { Canvas, useThree } from "@react-three/fiber"
import { ContactShadows, Environment, Html, OrbitControls } from "@react-three/drei"
import { useReducedMotion } from "framer-motion"
import {
  CheckCircle2,
  Clock3,
  Loader2,
  MessageSquareText,
  Move3D,
  RotateCcw,
  ShieldCheck,
} from "lucide-react"
import * as THREE from "three"
import { ThreeMFLoader } from "three/examples/jsm/loaders/3MFLoader.js"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js"
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js"
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib"

type Manifest = {
  projectId?: string
  revisionId?: string
  title: string
  client?: string
  version: string
  unit: "mm" | "cm" | "m"
  note?: string
  createdAt: string
  expiresAt?: string
  file: string
  format: "stl" | "3mf" | "obj" | "glb" | "gltf"
}

type Dimensions = {
  x: number
  y: number
  z: number
}

type ApprovalState = "idle" | "sending" | "approved" | "changes" | "error"

const SUPPORTED_FORMATS = new Set(["stl", "3mf", "obj", "glb", "gltf"])
const previewMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color("#38bdf8"),
  metalness: 0.08,
  roughness: 0.42,
})

function disposeMaterial(material: THREE.Material | THREE.Material[]) {
  if (Array.isArray(material)) {
    material.forEach(disposeMaterial)
    return
  }
  material.dispose()
}

function disposeObject(object: THREE.Object3D | null) {
  object?.traverse((child) => {
    if (!(child as THREE.Mesh).isMesh) return
    const mesh = child as THREE.Mesh
    mesh.geometry.dispose()
    disposeMaterial(mesh.material)
  })
}

function prepareMeshes(object: THREE.Object3D, replaceMaterial: boolean) {
  object.traverse((child) => {
    if (!(child as THREE.Mesh).isMesh) return
    const mesh = child as THREE.Mesh
    if (replaceMaterial) mesh.material = previewMaterial.clone()
    mesh.castShadow = true
    mesh.receiveShadow = true
  })
  return object
}

function centerObject(object: THREE.Object3D) {
  const box = new THREE.Box3().setFromObject(object)
  if (!box.isEmpty()) {
    object.position.sub(box.getCenter(new THREE.Vector3()))
  }
  return object
}

async function loadRemoteModel(url: string, format: Manifest["format"]) {
  if (format === "stl") {
    const geometry = await new STLLoader().loadAsync(url)
    geometry.computeVertexNormals()
    const group = new THREE.Group()
    group.add(new THREE.Mesh(geometry, previewMaterial.clone()))
    return prepareMeshes(group, false)
  }
  if (format === "3mf") {
    return prepareMeshes(await new ThreeMFLoader().loadAsync(url), false)
  }
  if (format === "obj") {
    return prepareMeshes(await new OBJLoader().loadAsync(url), true)
  }

  const gltf = await new GLTFLoader().loadAsync(url)
  const scene = gltf.scene ?? gltf.scenes[0]
  if (!scene) throw new Error("Dit model bevat geen zichtbare geometrie.")
  return prepareMeshes(scene, false)
}

function getDimensions(object: THREE.Object3D): Dimensions {
  const size = new THREE.Box3().setFromObject(object).getSize(new THREE.Vector3())
  return { x: size.x, y: size.y, z: size.z }
}

function FitCamera({ object, token }: { object: THREE.Object3D | null; token: number }) {
  const { camera, controls } = useThree()

  useEffect(() => {
    if (!object || !(camera instanceof THREE.PerspectiveCamera)) return
    const box = new THREE.Box3().setFromObject(object)
    if (box.isEmpty()) return

    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const maxDimension = Math.max(size.x, size.y, size.z, 0.001)
    const fov = (camera.fov * Math.PI) / 180
    const distance = (maxDimension / (2 * Math.tan(fov / 2))) * 1.7

    camera.position.copy(center.clone().add(new THREE.Vector3(1, 0.75, 1).normalize().multiplyScalar(distance)))
    camera.near = Math.max(distance / 100, 0.01)
    camera.far = Math.max(distance * 100, 100)
    camera.updateProjectionMatrix()

    const orbitControls = controls as OrbitControlsImpl | undefined
    if (orbitControls) {
      orbitControls.target.copy(center)
      orbitControls.minDistance = Math.max(distance / 7, 0.1)
      orbitControls.maxDistance = distance * 6
      orbitControls.update()
    }
  }, [camera, controls, object, token])

  return null
}

function formatDimension(value: number, unit: Manifest["unit"]) {
  const decimals = value >= 100 ? 1 : 2
  return `${new Intl.NumberFormat("nl-BE", { maximumFractionDigits: decimals }).format(value)} ${unit}`
}

function formatDate(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "Onbekende datum"
  return new Intl.DateTimeFormat("nl-BE", { day: "numeric", month: "long", year: "numeric" }).format(date)
}

function previewFileUrl(id: string, file: string) {
  return `/model-preview-file.php?id=${encodeURIComponent(id)}&file=${encodeURIComponent(file)}`
}

export default function SharedModelPreview() {
  const prefersReducedMotion = useReducedMotion()
  const [previewId, setPreviewId] = useState("")
  const [manifest, setManifest] = useState<Manifest | null>(null)
  const [model, setModel] = useState<THREE.Object3D | null>(null)
  const [dimensions, setDimensions] = useState<Dimensions | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [autoRotate, setAutoRotate] = useState(!prefersReducedMotion)
  const [fitToken, setFitToken] = useState(0)
  const [approvalState, setApprovalState] = useState<ApprovalState>("idle")
  const [approvalError, setApprovalError] = useState("")

  useEffect(() => {
    if (prefersReducedMotion) setAutoRotate(false)
  }, [prefersReducedMotion])

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("id")?.trim() ?? ""
    if (!/^[a-z0-9][a-z0-9_-]{7,63}$/.test(id)) {
      setError("Deze previewlink is ongeldig of onvolledig.")
      setLoading(false)
      return
    }
    setPreviewId(id)

    let cancelled = false
    async function loadPreview() {
      try {
        const response = await fetch(previewFileUrl(id, "manifest.json"), { cache: "no-store" })
        if (!response.ok) {
          throw new Error(response.status === 410
            ? "Deze previewlink is verlopen of ingetrokken. Vraag X3DPrints om een nieuwe link."
            : "Deze modelpreview bestaat niet meer of is nog niet gepubliceerd.")
        }
        const payload = (await response.json()) as Manifest
        if (
          !payload.title ||
          !payload.file ||
          !SUPPORTED_FORMATS.has(payload.format) ||
          !/^[a-zA-Z0-9._-]+$/.test(payload.file)
        ) {
          throw new Error("De previewgegevens zijn ongeldig.")
        }
        const loadedModel = centerObject(await loadRemoteModel(previewFileUrl(id, payload.file), payload.format))
        if (cancelled) {
          disposeObject(loadedModel)
          return
        }
        setManifest(payload)
        setDimensions(getDimensions(loadedModel))
        setModel(loadedModel)
      } catch (reason) {
        setError(reason instanceof Error ? reason.message : "De modelpreview kon niet geladen worden.")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    void loadPreview()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => () => disposeObject(model), [model])

  async function submitDecision(formElement: HTMLFormElement, action: "approve" | "changes") {
    if (!manifest || !previewId || approvalState === "sending") return
    setApprovalState("sending")
    setApprovalError("")

    const form = new FormData(formElement)
    form.set("id", previewId)
    form.set("revisionId", manifest.revisionId ?? previewId)
    form.set("action", action)

    try {
      const response = await fetch("/model-approval.php", {
        method: "POST",
        body: new URLSearchParams(Array.from(form.entries()).map(([key, value]) => [key, String(value)])),
      })
      const payload = (await response.json().catch(() => null)) as { success?: boolean; error?: string } | null
      if (!response.ok || !payload?.success) throw new Error(payload?.error || "Je reactie kon niet verstuurd worden.")
      setApprovalState(action === "approve" ? "approved" : "changes")
    } catch (reason) {
      setApprovalState("error")
      setApprovalError(reason instanceof Error ? reason.message : "Je reactie kon niet verstuurd worden.")
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[540px] items-center justify-center rounded-[2rem] border border-slate-200/70 bg-slate-950 text-slate-100">
        <div className="flex items-center gap-3 text-sm font-semibold"><Loader2 className="h-5 w-5 animate-spin" /> Model laden...</div>
      </div>
    )
  }

  if (error || !manifest || !model || !dimensions) {
    return (
      <div className="mx-auto max-w-xl rounded-3xl border border-red-200 bg-red-50 p-8 text-center text-red-900 dark:border-red-400/30 dark:bg-red-500/10 dark:text-red-100">
        <h1 className="text-2xl font-bold">Preview niet beschikbaar</h1>
        <p className="mt-3 text-sm leading-6">{error || "Deze preview kon niet worden geopend."}</p>
      </div>
    )
  }

  const decisionComplete = approvalState === "approved" || approvalState === "changes"

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
      <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 shadow-2xl" aria-label="Interactieve 3D-modelweergave">
        <div className="relative h-[60vh] min-h-[460px] max-h-[760px]">
          <Canvas
            camera={{ position: [3.6, 2.4, 3.6], fov: 45, near: 0.1, far: 1000 }}
            dpr={[1, 1.75]}
            gl={{ antialias: true, preserveDrawingBuffer: true, powerPreference: "high-performance" }}
            shadows
          >
            <color attach="background" args={["#020617"]} />
            <ambientLight intensity={0.65} />
            <directionalLight position={[6, 9, 5]} intensity={1.4} castShadow />
            <spotLight position={[-5, 7, -4]} angle={0.65} intensity={0.7} />
            <primitive object={model} dispose={undefined} />
            <FitCamera object={model} token={fitToken} />
            <gridHelper args={[10, 20, "#334155", "#172033"]} />
            <ContactShadows opacity={0.4} scale={12} blur={1.8} far={6} />
            <Environment preset="studio" environmentIntensity={0.75} />
            <OrbitControls
              makeDefault
              enablePan
              enableZoom
              autoRotate={autoRotate}
              autoRotateSpeed={0.65}
              enableDamping
              dampingFactor={0.08}
              onStart={() => setAutoRotate(false)}
            />
            {!model ? <Html center><Loader2 className="h-6 w-6 animate-spin text-white" /></Html> : null}
          </Canvas>
          <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-white/10 bg-slate-950/75 px-3 py-1.5 text-xs font-semibold text-slate-200 backdrop-blur">
            Slepen om te draaien · scrollen om te zoomen
          </div>
          <button
            type="button"
            onClick={() => {
              setAutoRotate(!prefersReducedMotion)
              setFitToken((value) => value + 1)
            }}
            className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-slate-950/80 px-4 py-2 text-xs font-semibold text-white backdrop-blur transition hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <RotateCcw className="h-4 w-4" /> Reset weergave
          </button>
        </div>
      </section>

      <aside className="space-y-5">
        <section className="rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-xl dark:border-slate-700/70 dark:bg-slate-950/85">
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-200">3D ontwerp</span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{manifest.version}</span>
          </div>
          <h1 className="mt-5 text-balance text-2xl font-extrabold text-slate-950 dark:text-white">{manifest.title}</h1>
          {manifest.client ? <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Voor {manifest.client}</p> : null}
          {manifest.note ? <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">{manifest.note}</p> : null}
          <div className="mt-5 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Clock3 className="h-4 w-4" /> Versie gedeeld op {formatDate(manifest.createdAt)}
          </div>
          {manifest.expiresAt ? <p className="mt-2 text-xs font-semibold text-amber-700 dark:text-amber-300">Deze privélink blijft beschikbaar tot {formatDate(manifest.expiresAt)}.</p> : null}
        </section>

        <section className="rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-xl dark:border-slate-700/70 dark:bg-slate-950/85">
          <div className="flex items-center gap-2">
            <Move3D className="h-5 w-5 text-cyan-600 dark:text-cyan-300" />
            <h2 className="font-bold text-slate-950 dark:text-white">Buitenmaten</h2>
          </div>
          <dl className="mt-4 grid grid-cols-3 gap-2">
            {(["x", "y", "z"] as const).map((axis) => (
              <div key={axis} className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-center dark:border-slate-700 dark:bg-slate-900">
                <dt className="text-xs font-bold uppercase text-slate-500">{axis}</dt>
                <dd className="mt-1 text-sm font-extrabold text-slate-950 dark:text-white">{formatDimension(dimensions[axis], manifest.unit)}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-xs leading-5 text-slate-500 dark:text-slate-400">Maten zijn automatisch berekend uit de buitenste grenzen van het gedeelde model.</p>
        </section>

        <section className="rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-xl dark:border-slate-700/70 dark:bg-slate-950/85">
          {decisionComplete ? (
            <div className="py-4 text-center">
              <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-500" />
              <h2 className="mt-3 text-lg font-bold text-slate-950 dark:text-white">
                {approvalState === "approved" ? "Ontwerp goedgekeurd" : "Wijziging doorgestuurd"}
              </h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">X3DPrints heeft je reactie ontvangen.</p>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={(event) => {
              event.preventDefault()
              void submitDecision(event.currentTarget, "approve")
            }}>
              <div>
                <h2 className="text-lg font-bold text-slate-950 dark:text-white">Klaar om te beslissen?</h2>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Bevestig het ontwerp of stuur één duidelijke wijzigingsvraag.</p>
              </div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Je naam
                <input name="name" required maxLength={80} autoComplete="name" className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-950 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white" />
              </label>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
                E-mail <span className="font-normal text-slate-400">(optioneel)</span>
                <input name="email" type="email" maxLength={160} autoComplete="email" className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-950 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white" />
              </label>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Opmerking <span className="font-normal text-slate-400">(optioneel)</span>
                <textarea name="comment" maxLength={1500} rows={3} onInput={(event) => event.currentTarget.setCustomValidity("")} placeholder="Wat moet eventueel nog aangepast worden?" className="mt-1.5 w-full resize-y rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-950 outline-none placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white" />
              </label>
              <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              {approvalError ? <p role="alert" className="text-sm font-semibold text-red-600 dark:text-red-300">{approvalError}</p> : null}
              <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
                <button type="submit" disabled={approvalState === "sending"} className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-500 disabled:cursor-wait disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:ring-offset-slate-950">
                  {approvalState === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
                  Goedkeuren
                </button>
                <button type="button" disabled={approvalState === "sending"} onClick={(event) => {
                  const form = event.currentTarget.form
                  const comment = form?.elements.namedItem("comment")
                  if (comment instanceof HTMLTextAreaElement) {
                    comment.setCustomValidity(comment.value.trim() ? "" : "Beschrijf kort wat er aangepast moet worden.")
                  }
                  if (form?.reportValidity()) void submitDecision(form, "changes")
                }} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-800 transition hover:border-cyan-400 hover:text-cyan-700 disabled:cursor-wait disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-cyan-400 dark:hover:text-cyan-200">
                  <MessageSquareText className="h-4 w-4" /> Wijziging vragen
                </button>
              </div>
            </form>
          )}
        </section>

        <div className="flex items-start gap-3 rounded-2xl border border-slate-200/70 bg-white/70 p-4 text-xs leading-5 text-slate-600 dark:border-slate-700/70 dark:bg-slate-900/70 dark:text-slate-300">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
          Deze privélink staat niet in zoekmachines. Deel hem alleen met personen die het ontwerp mogen bekijken.
        </div>
      </aside>
    </div>
  )
}
