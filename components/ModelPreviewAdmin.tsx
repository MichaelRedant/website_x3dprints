"use client"

import { useEffect, useState } from "react"
import {
  Ban, CalendarPlus, Check, CheckCircle2, Clock3, Copy, Eye, FileBox, Loader2,
  LockOpen, LogOut, Mail, MessageSquareText, Plus, Trash2, UploadCloud,
} from "lucide-react"
import { convertThreeMfToObj } from "@/lib/model-preview/convert-three-mf"
import { modelPreviewCheckAuth, modelPreviewLogin, modelPreviewLogout } from "@/lib/model-preview/auth"

type Decision = "approve" | "changes" | ""

type PreviewItem = {
  id: string
  projectId: string
  revisionId: string
  title: string
  client: string
  clientEmail: string
  version: string
  unit: "mm" | "cm" | "m"
  note: string
  createdAt: string
  expiresAt: string
  size: number
  lastViewedAt: string
  decision: Decision
  decisionAt: string
  decisionName: string
  revokedAt: string
}

type ManageResponse = {
  ok?: boolean
  csrf?: string
  items?: PreviewItem[]
  uploadId?: string
  url?: string
  error?: string
}

type ProjectGroup = {
  projectId: string
  title: string
  client: string
  revisions: PreviewItem[]
}

const ENDPOINT = "/model-preview-manage.php"
const CHUNK_SIZE = 4 * 1024 * 1024
const CHUNK_RETRY_DELAYS_MS = [1000, 2000, 4000, 8000]

class ModelPreviewRequestError extends Error {
  readonly retryable: boolean

  constructor(message: string, status: number) {
    super(message)
    this.name = "ModelPreviewRequestError"
    this.retryable = status === 408 || status === 425 || status === 429 || status >= 500
  }
}

function readableSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`
  return `${new Intl.NumberFormat("nl-BE", { maximumFractionDigits: 1 }).format(bytes / 1024 / 1024)} MB`
}

function readableDate(value: string, includeTime = false) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "Onbekend"
  return new Intl.DateTimeFormat("nl-BE", {
    day: "numeric",
    month: "short",
    year: "numeric",
    ...(includeTime ? { hour: "2-digit", minute: "2-digit" } : {}),
  }).format(date)
}

function nextVersion(version: string) {
  const match = version.trim().match(/^v(\d+)$/i)
  return match ? `V${Number(match[1]) + 1}` : `${version.trim() || "Versie"} nieuw`
}

function previewUrl(id: string) {
  return `https://www.x3dprints.be/model-preview/?id=${id}`
}

function groupProjects(items: PreviewItem[]): ProjectGroup[] {
  const groups = new Map<string, ProjectGroup>()
  for (const item of items) {
    const existing = groups.get(item.projectId)
    if (existing) existing.revisions.push(item)
    else groups.set(item.projectId, {
      projectId: item.projectId,
      title: item.title,
      client: item.client,
      revisions: [item],
    })
  }
  return Array.from(groups.values())
}

async function responsePayload(response: Response) {
  const raw = await response.text()
  let payload: ManageResponse | null = null
  try {
    payload = JSON.parse(raw) as ManageResponse
  } catch {
    payload = null
  }
  if (!response.ok || !payload?.ok) {
    let fallback = `De server kon de actie niet uitvoeren (HTTP ${response.status}).`
    if (response.status === 413) fallback = "Een uploaddeel is te groot voor de server."
    else if (response.status === 429) fallback = "De server ontvangt tijdelijk te veel verzoeken. Probeer zo meteen opnieuw."
    else if (response.status >= 500) fallback = "De server is tijdelijk niet beschikbaar. Probeer zo meteen opnieuw."
    throw new ModelPreviewRequestError(payload?.error || fallback, response.status)
  }
  return payload
}

async function uploadChunkWithRetry(url: string, options: RequestInit, onRetry: (attempt: number) => void) {
  for (let attempt = 0; attempt <= CHUNK_RETRY_DELAYS_MS.length; attempt += 1) {
    try {
      return await responsePayload(await fetch(url, options))
    } catch (reason) {
      const retryable = !(reason instanceof ModelPreviewRequestError) || reason.retryable
      if (!retryable || attempt === CHUNK_RETRY_DELAYS_MS.length) {
        if (reason instanceof ModelPreviewRequestError) throw reason
        throw new Error("De verbinding met de server werd onderbroken. Probeer de upload opnieuw.")
      }
      onRetry(attempt + 2)
      await new Promise((resolve) => window.setTimeout(resolve, CHUNK_RETRY_DELAYS_MS[attempt]))
    }
  }
  throw new Error("De upload kon niet worden voltooid.")
}

export default function ModelPreviewAdmin() {
  const [authLoading, setAuthLoading] = useState(true)
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")
  const [csrf, setCsrf] = useState("")
  const [items, setItems] = useState<PreviewItem[]>([])
  const [file, setFile] = useState<File | null>(null)
  const [revisionBase, setRevisionBase] = useState<PreviewItem | null>(null)
  const [formKey, setFormKey] = useState(0)
  const [busy, setBusy] = useState(false)
  const [actionBusy, setActionBusy] = useState("")
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState("")
  const [error, setError] = useState("")
  const [notice, setNotice] = useState("")
  const [createdUrl, setCreatedUrl] = useState("")
  const [copied, setCopied] = useState("")

  const projects = groupProjects(items)

  async function loadItems() {
    const payload = await responsePayload(await fetch(ENDPOINT, { cache: "no-store" }))
    setCsrf(payload.csrf ?? "")
    setItems(payload.items ?? [])
  }

  useEffect(() => {
    let cancelled = false
    async function initialize() {
      try {
        const isAuthenticated = await modelPreviewCheckAuth()
        if (cancelled) return
        setAuthed(isAuthenticated)
        if (isAuthenticated) await loadItems()
      } catch {
        if (!cancelled) setAuthed(false)
      } finally {
        if (!cancelled) setAuthLoading(false)
      }
    }
    void initialize()
    return () => { cancelled = true }
  }, [])

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoginError("")
    setAuthLoading(true)
    try {
      await modelPreviewLogin(password)
      window.localStorage.setItem("x3dprints-model-preview-shortcut", "1")
      window.dispatchEvent(new Event("x3dprints:model-preview-auth"))
      setAuthed(true)
      setPassword("")
      await loadItems()
    } catch (reason) {
      setLoginError(reason instanceof Error ? reason.message : "Inloggen is mislukt.")
    } finally {
      setAuthLoading(false)
    }
  }

  async function handleLogout() {
    await modelPreviewLogout().catch(() => undefined)
    window.localStorage.removeItem("x3dprints-model-preview-shortcut")
    window.dispatchEvent(new Event("x3dprints:model-preview-auth"))
    setAuthed(false)
    setCsrf("")
    setItems([])
  }

  function prepareNewVersion(item: PreviewItem) {
    setRevisionBase(item)
    setFile(null)
    setCreatedUrl("")
    setError("")
    setNotice(`Nieuwe revisie voor ${item.title}. De bestaande ${item.version}-link blijft onafhankelijk.`)
    setFormKey((value) => value + 1)
    window.requestAnimationFrame(() => document.getElementById("preview-upload")?.scrollIntoView({ behavior: "smooth", block: "start" }))
  }

  function cancelNewVersion() {
    setRevisionBase(null)
    setFile(null)
    setNotice("")
    setFormKey((value) => value + 1)
  }

  async function upload(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!file || busy) return
    const form = new FormData(event.currentTarget)
    setBusy(true)
    setError("")
    setNotice("")
    setCreatedUrl("")
    setProgress(0)
    let activeUploadId = ""

    try {
      let uploadFile = file
      const sourceExtension = file.name.split(".").pop()?.toLowerCase() ?? ""
      if (sourceExtension === "3mf") {
        setStatus("3MF voorbereiden voor de webviewer...")
        uploadFile = await convertThreeMfToObj(file)
      }
      const format = uploadFile.name.split(".").pop()?.toLowerCase() ?? ""
      if (!["stl", "obj", "glb"].includes(format)) throw new Error("Kies een STL, 3MF, OBJ of GLB-bestand.")
      if (uploadFile.size > 250 * 1024 * 1024) throw new Error("De voorbereide preview is groter dan 250 MB.")

      setStatus("Upload voorbereiden...")
      const startPayload = await responsePayload(await fetch(`${ENDPOINT}?action=start`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-CSRF-Token": csrf },
        body: JSON.stringify({
          projectId: revisionBase?.projectId ?? "",
          title: String(form.get("title") ?? ""),
          client: String(form.get("client") ?? ""),
          clientEmail: String(form.get("clientEmail") ?? ""),
          version: String(form.get("version") ?? "V1"),
          note: String(form.get("note") ?? ""),
          unit: String(form.get("unit") ?? "mm"),
          days: Number(form.get("days") ?? 14),
          format,
          size: uploadFile.size,
          chunkBytes: CHUNK_SIZE,
        }),
      }))
      if (!startPayload.uploadId) throw new Error("De upload kon niet worden gestart.")
      activeUploadId = startPayload.uploadId

      const chunks = Math.ceil(uploadFile.size / CHUNK_SIZE)
      for (let index = 0; index < chunks; index += 1) {
        setStatus(`Model uploaden: deel ${index + 1} van ${chunks}`)
        const chunk = uploadFile.slice(index * CHUNK_SIZE, Math.min((index + 1) * CHUNK_SIZE, uploadFile.size))
        await uploadChunkWithRetry(`${ENDPOINT}?action=chunk&uploadId=${startPayload.uploadId}&index=${index}`, {
          method: "POST",
          headers: { "Content-Type": "application/octet-stream", "X-CSRF-Token": csrf },
          body: chunk,
        }, (attempt) => setStatus(`Verbinding herstellen voor deel ${index + 1} van ${chunks} (poging ${attempt})...`))
        setProgress(Math.round(((index + 1) / chunks) * 100))
      }

      setStatus("Privélink maken...")
      const finishPayload = await responsePayload(await fetch(`${ENDPOINT}?action=finish`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-CSRF-Token": csrf },
        body: JSON.stringify({ uploadId: startPayload.uploadId, chunks }),
      }))
      activeUploadId = ""
      setCreatedUrl(finishPayload.url ?? "")
      setStatus("Preview is klaar om te delen.")
      setFile(null)
      setRevisionBase(null)
      setFormKey((value) => value + 1)
      await loadItems()
    } catch (reason) {
      if (activeUploadId) {
        await fetch(`${ENDPOINT}?action=cancel`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "X-CSRF-Token": csrf },
          body: JSON.stringify({ uploadId: activeUploadId }),
        }).catch(() => undefined)
      }
      setError(reason instanceof Error ? reason.message : "De upload is mislukt.")
      setStatus("")
    } finally {
      setBusy(false)
    }
  }

  async function copyLink(url: string) {
    await navigator.clipboard.writeText(url)
    setCopied(url)
    window.setTimeout(() => setCopied(""), 1800)
  }

  async function runAction(action: string, item: PreviewItem, extra: Record<string, unknown> = {}) {
    const key = `${action}:${item.id}`
    setActionBusy(key)
    setError("")
    setNotice("")
    try {
      await responsePayload(await fetch(`${ENDPOINT}?action=${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-CSRF-Token": csrf },
        body: JSON.stringify({ id: item.id, ...extra }),
      }))
      const messages: Record<string, string> = {
        extend: `${item.version} is met 14 dagen verlengd.`,
        revoke: `De link voor ${item.version} is onmiddellijk ingetrokken.`,
        reactivate: `De link voor ${item.version} is opnieuw actief.`,
        resend: `De link voor ${item.version} is opnieuw verstuurd.`,
      }
      setNotice(messages[action] ?? "Actie uitgevoerd.")
      await loadItems()
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "De actie is mislukt.")
    } finally {
      setActionBusy("")
    }
  }

  async function resendLink(item: PreviewItem) {
    const email = window.prompt("Naar welk e-mailadres mag deze revisielink worden verstuurd?", item.clientEmail)
    if (email === null) return
    await runAction("resend", item, { email: email.trim() })
  }

  async function deletePreview(item: PreviewItem) {
    if (!window.confirm(`Revisie ${item.version} van “${item.title}” definitief verwijderen?`)) return
    setActionBusy(`delete:${item.id}`)
    setError("")
    try {
      await responsePayload(await fetch(`${ENDPOINT}?action=delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-CSRF-Token": csrf },
        body: JSON.stringify({ id: item.id }),
      }))
      setItems((current) => current.filter((entry) => entry.id !== item.id))
      setNotice(`${item.version} is definitief verwijderd.`)
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Verwijderen is mislukt.")
    } finally {
      setActionBusy("")
    }
  }

  if (authLoading && !authed) return <div className="flex min-h-[420px] items-center justify-center"><Loader2 className="h-7 w-7 animate-spin text-cyan-500" /></div>

  if (!authed) {
    return (
      <section className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-xl dark:border-slate-700 dark:bg-slate-900">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-600 dark:text-cyan-300">Beveiligde toegang</p>
        <h1 className="mt-3 text-3xl font-extrabold text-slate-950 dark:text-white">Modelpreviews beheren</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">Vul het persoonlijke wachtwoord voor de modelpreviewbeheerder in.</p>
        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">Wachtwoord
            <input type="password" required autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-slate-950 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
          </label>
          {loginError ? <p role="alert" className="text-sm font-semibold text-red-600 dark:text-red-300">{loginError}</p> : null}
          <button className="w-full rounded-xl bg-cyan-600 px-4 py-3 font-bold text-white transition hover:bg-cyan-500">Ontgrendelen</button>
        </form>
      </section>
    )
  }

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-600 dark:text-cyan-300">X3DPrints privétools</p>
          <h1 className="mt-2 text-balance text-4xl font-extrabold text-slate-950 sm:text-5xl dark:text-white">3D-projecten en revisies</h1>
          <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">Deel versies, volg wanneer ze bekeken zijn en bewaar iedere beslissing bij de juiste revisie.</p>
        </div>
        <button onClick={() => void handleLogout()} className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 hover:border-cyan-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"><LogOut className="h-4 w-4" /> Uitloggen</button>
      </header>

      <div aria-live="polite" className="space-y-3">
        {notice ? <p className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm font-semibold text-emerald-800 dark:border-emerald-400/30 dark:bg-emerald-500/10 dark:text-emerald-200">{notice}</p> : null}
        {error ? <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700 dark:border-red-400/30 dark:bg-red-500/10 dark:text-red-200">{error}</p> : null}
      </div>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,0.8fr)_minmax(560px,1.2fr)]">
        <form key={formKey} id="preview-upload" onSubmit={upload} className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-900 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-950 dark:text-white">{revisionBase ? `Nieuwe versie na ${revisionBase.version}` : "Nieuw 3D-project"}</h2>
              {revisionBase ? <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Project: {revisionBase.title}</p> : null}
            </div>
            {revisionBase ? <button type="button" onClick={cancelNewVersion} className="text-sm font-bold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">Annuleren</button> : null}
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <label className="sm:col-span-2 text-sm font-semibold text-slate-700 dark:text-slate-200">Modelbestand
              <input type="file" required accept=".stl,.3mf,.obj,.glb" onChange={(event) => setFile(event.target.files?.[0] ?? null)} className="mt-2 block w-full cursor-pointer rounded-xl border border-dashed border-cyan-400 bg-cyan-50 px-4 py-5 text-sm text-slate-700 file:mr-4 file:rounded-lg file:border-0 file:bg-cyan-600 file:px-4 file:py-2 file:font-bold file:text-white dark:bg-cyan-500/10 dark:text-slate-200" />
              <span className="mt-2 block text-xs font-normal text-slate-500 dark:text-slate-400">STL, 3MF, OBJ of GLB, maximaal 250 MB. 3MF wordt automatisch voorbereid.</span>
            </label>
            <label className="sm:col-span-2 text-sm font-semibold text-slate-700 dark:text-slate-200">Projectnaam
              <input name="title" required maxLength={160} defaultValue={revisionBase?.title ?? ""} placeholder="Bijv. Behuizing machineonderdeel" className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-slate-950 outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
            </label>
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Klantnaam
              <input name="client" maxLength={120} defaultValue={revisionBase?.client ?? ""} placeholder="Optioneel" className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-slate-950 outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
            </label>
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Klant-e-mail
              <input name="clientEmail" type="email" maxLength={160} defaultValue={revisionBase?.clientEmail ?? ""} placeholder="Voor opnieuw versturen" className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-slate-950 outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
            </label>
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Versie
              <input name="version" required defaultValue={revisionBase ? nextVersion(revisionBase.version) : "V1"} maxLength={40} className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-slate-950 outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
            </label>
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Eenheid in het model
              <select name="unit" defaultValue={revisionBase?.unit ?? "mm"} className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-slate-950 outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"><option value="mm">millimeter</option><option value="cm">centimeter</option><option value="m">meter</option></select>
            </label>
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Link geldig gedurende
              <select name="days" defaultValue="14" className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-slate-950 outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"><option value="3">3 dagen</option><option value="7">7 dagen</option><option value="14">14 dagen</option><option value="30">30 dagen</option><option value="60">60 dagen</option><option value="90">90 dagen</option></select>
            </label>
            <label className="sm:col-span-2 text-sm font-semibold text-slate-700 dark:text-slate-200">Bericht voor de klant
              <textarea name="note" rows={3} maxLength={1000} defaultValue={revisionBase?.note ?? ""} placeholder="Bijv. Controleer vooral de kabeldoorvoer en buitenmaten." className="mt-1.5 w-full resize-y rounded-xl border border-slate-300 bg-white px-3 py-3 text-slate-950 outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
            </label>
          </div>

          {busy ? <div className="mt-6"><div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700"><div className="h-full bg-cyan-500 transition-[width]" style={{ width: `${progress}%` }} /></div><p className="mt-2 text-sm font-semibold text-cyan-700 dark:text-cyan-300">{status}</p></div> : null}
          {createdUrl ? <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-400/30 dark:bg-emerald-500/10"><p className="font-bold text-emerald-800 dark:text-emerald-200">Revisielink klaar</p><div className="mt-2 flex gap-2"><input readOnly value={createdUrl} className="min-w-0 flex-1 rounded-lg border border-emerald-200 bg-white px-3 py-2 text-sm text-slate-900 dark:border-emerald-800 dark:bg-slate-950 dark:text-white" /><button type="button" onClick={() => void copyLink(createdUrl)} className="rounded-lg bg-emerald-600 px-3 text-white" aria-label="Link kopiëren">{copied === createdUrl ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}</button></div></div> : null}
          <button type="submit" disabled={busy || !file} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 px-5 py-3.5 font-bold text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-50">{busy ? <Loader2 className="h-5 w-5 animate-spin" /> : <UploadCloud className="h-5 w-5" />} {revisionBase ? "Nieuwe versie publiceren" : "Projectpreview maken"}</button>
        </form>

        <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-900/60 sm:p-8">
          <div className="flex items-center justify-between gap-3"><div><h2 className="text-2xl font-bold text-slate-950 dark:text-white">Projecten</h2><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{items.length} revisies in {projects.length} projecten</p></div><span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">{projects.length}</span></div>
          <div className="mt-5 space-y-5">
            {projects.length === 0 ? <div className="rounded-2xl border border-dashed border-slate-300 p-7 text-center dark:border-slate-700"><FileBox className="mx-auto h-8 w-8 text-slate-400" /><p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Nog geen actieve klantpreviews.</p></div> : projects.map((project) => (
              <article key={project.projectId} className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-950">
                <div className="flex flex-col gap-3 border-b border-slate-200 p-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
                  <div><h3 className="font-bold text-slate-950 dark:text-white">{project.title}</h3><p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{project.client || "Geen klantnaam"} · {project.revisions.length} {project.revisions.length === 1 ? "versie" : "versies"}</p></div>
                  <button type="button" onClick={() => prepareNewVersion(project.revisions[0])} className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-600 px-3 py-2 text-xs font-bold text-white hover:bg-cyan-500"><Plus className="h-3.5 w-3.5" /> Nieuwe versie</button>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {project.revisions.map((item, index) => {
                    const url = previewUrl(item.id)
                    const revoked = Boolean(item.revokedAt)
                    const waiting = actionBusy.endsWith(`:${item.id}`)
                    return (
                      <div key={item.id} className="p-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-slate-900 px-2.5 py-1 text-xs font-bold text-white dark:bg-slate-700">{item.version}</span>
                          {index === 0 ? <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-[11px] font-bold text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-200">Nieuwste</span> : null}
                          {revoked ? <span className="rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-bold text-red-700 dark:bg-red-500/10 dark:text-red-200">Ingetrokken</span> : item.decision === "approve" ? <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200"><CheckCircle2 className="h-3 w-3" /> Goedgekeurd</span> : item.decision === "changes" ? <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-700 dark:bg-amber-500/10 dark:text-amber-200"><MessageSquareText className="h-3 w-3" /> Wijziging gevraagd</span> : item.lastViewedAt ? <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-blue-700 dark:bg-blue-500/10 dark:text-blue-200"><Eye className="h-3 w-3" /> Bekeken</span> : <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-500 dark:bg-slate-800 dark:text-slate-300">Niet bekeken</span>}
                        </div>
                        <div className="mt-3 grid gap-1 text-xs text-slate-500 dark:text-slate-400 sm:grid-cols-2">
                          <p>{readableSize(item.size)} · gemaakt {readableDate(item.createdAt)}</p>
                          <p className="flex items-center gap-1"><Clock3 className="h-3.5 w-3.5" /> Vervalt {readableDate(item.expiresAt)}</p>
                          {item.lastViewedAt ? <p className="flex items-center gap-1"><Eye className="h-3.5 w-3.5" /> Laatst bekeken {readableDate(item.lastViewedAt, true)}</p> : null}
                          {item.decisionAt ? <p className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5" /> Beslist {readableDate(item.decisionAt, true)}{item.decisionName ? ` door ${item.decisionName}` : ""}</p> : null}
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          <button type="button" disabled={revoked || waiting} onClick={() => void copyLink(url)} className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-2 text-xs font-bold text-white disabled:opacity-40 dark:bg-cyan-600">{copied === url ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />} Link</button>
                          <button type="button" disabled={revoked || waiting} onClick={() => void resendLink(item)} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 hover:border-cyan-400 disabled:opacity-40 dark:border-slate-700 dark:text-slate-200"><Mail className="h-3.5 w-3.5" /> Opnieuw mailen</button>
                          <button type="button" disabled={waiting} onClick={() => void runAction("extend", item, { days: 14 })} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 hover:border-cyan-400 disabled:opacity-40 dark:border-slate-700 dark:text-slate-200"><CalendarPlus className="h-3.5 w-3.5" /> +14 dagen</button>
                          <button type="button" disabled={waiting} onClick={() => void runAction(revoked ? "reactivate" : "revoke", item)} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 hover:border-amber-400 disabled:opacity-40 dark:border-slate-700 dark:text-slate-200">{revoked ? <LockOpen className="h-3.5 w-3.5" /> : <Ban className="h-3.5 w-3.5" />} {revoked ? "Heractiveren" : "Intrekken"}</button>
                          <button type="button" disabled={waiting} onClick={() => void deletePreview(item)} className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 disabled:opacity-40 dark:border-red-500/30 dark:text-red-300 dark:hover:bg-red-500/10" aria-label={`${item.title} ${item.version} verwijderen`}><Trash2 className="h-3.5 w-3.5" /> Verwijderen</button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
