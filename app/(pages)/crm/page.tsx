// app/(pages)/crm/page.tsx
"use client"

import { useEffect, useState } from "react"
import { MATERIALS, MATERIAL_ORDER, type MaterialKey } from "@/lib/materials"

type LogEntry = {
  ts: string
  name: string
  email: string
  message: string
  quantity?: string
  material?: string
  quote?: string
  adminSent?: boolean
  confirmSent?: boolean
}

type ProcessedMap = Record<string, boolean>

type StockItem = {
  id: string
  material: string
  color: string
  diameter: string
  availableGrams: number
  supplier?: string
  notes?: string
  updatedAt: string
}

type ReplyEntry = {
  ts: string
  to: string
  subject: string
  text?: string
  html?: string
  sent?: boolean
}

const PASSWORD = "Heilig26102012!"
const STORAGE_KEY = "x3dprints-crm-auth"
const PROCESSED_KEY = "x3dprints-crm-processed"
const STOCK_KEY = "x3dprints-crm-filament-stock"

export default function CrmGate() {
  const [tab, setTab] = useState<"contact" | "stock">("contact")
  const [input, setInput] = useState("")
  const [isAuthed, setIsAuthed] = useState(false)
  const [error, setError] = useState("")
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [loadingLogs, setLoadingLogs] = useState(false)
  const [logError, setLogError] = useState("")
  const [search, setSearch] = useState("")
  const [onlyIssues, setOnlyIssues] = useState(false)
  const [processed, setProcessed] = useState<ProcessedMap>({})
  const [stock, setStock] = useState<StockItem[]>([])
  const [stockForm, setStockForm] = useState({
    material: "",
    color: "",
    diameter: "1.75mm",
    availableGrams: "",
    supplier: "",
    notes: "",
  })
  const [stockSearch, setStockSearch] = useState("")
  const [lowOnly, setLowOnly] = useState(false)
  const [materialOverrides, setMaterialOverrides] = useState<Record<string, Record<string, boolean>>>({})
  const [materialLoading, setMaterialLoading] = useState(false)
  const [materialError, setMaterialError] = useState("")
  const [replies, setReplies] = useState<ReplyEntry[]>([])
  const [loadingReplies, setLoadingReplies] = useState(false)
  const [repliesError, setRepliesError] = useState("")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replySubject, setReplySubject] = useState("")
  const [replyHtml, setReplyHtml] = useState("")
  const [replyToEmail, setReplyToEmail] = useState("")
  const [replyStatus, setReplyStatus] = useState<"idle" | "sending" | "ok" | "error">("idle")
  const [replyError, setReplyError] = useState("")

  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null
    if (stored === PASSWORD) setIsAuthed(true)
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    const raw = window.localStorage.getItem(PROCESSED_KEY)
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as ProcessedMap
        setProcessed(parsed || {})
      } catch {
        setProcessed({})
      }
    }
  }, [])

  useEffect(() => {
    if (!isAuthed) return
    async function load() {
      try {
        setLoadingLogs(true)
        setLogError("")
        const res = await fetch("/data/contact-log.json", { cache: "no-store" })
        if (!res.ok) throw new Error(`Status ${res.status}`)
        const json = (await res.json()) as LogEntry[]
        setLogs(Array.isArray(json) ? json : [])
      } catch {
        setLogError("Kon logbestand niet laden.")
      } finally {
        setLoadingLogs(false)
      }
    }
    load()
  }, [isAuthed])

  useEffect(() => {
    if (typeof window === "undefined") return
    window.localStorage.setItem(PROCESSED_KEY, JSON.stringify(processed))
  }, [processed])

  useEffect(() => {
    if (typeof window === "undefined") return
    const raw = window.localStorage.getItem(STOCK_KEY)
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as StockItem[]
        setStock(Array.isArray(parsed) ? parsed : [])
      } catch {
        setStock([])
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    window.localStorage.setItem(STOCK_KEY, JSON.stringify(stock))
  }, [stock])

  useEffect(() => {
    if (!isAuthed) return
    async function load() {
      try {
        setMaterialLoading(true)
        setMaterialError("")
        const res = await fetch("/material-stock.php", { cache: "no-store" })
        if (!res.ok) throw new Error(`Status ${res.status}`)
        const json = (await res.json()) as Record<string, Record<string, boolean>>
        setMaterialOverrides(json || {})
      } catch {
        setMaterialError("Kon materiaal-stock niet laden.")
      } finally {
        setMaterialLoading(false)
      }
    }
    load()
  }, [isAuthed])

  useEffect(() => {
    if (!isAuthed) return
    async function loadReplies() {
      try {
        setLoadingReplies(true)
        setRepliesError("")
        const res = await fetch("/data/contact-replies.json", { cache: "no-store" })
        if (!res.ok) throw new Error(`Status ${res.status}`)
        const json = (await res.json()) as ReplyEntry[]
        setReplies(Array.isArray(json) ? json : [])
      } catch {
        setRepliesError("Kon replies niet laden.")
      } finally {
        setLoadingReplies(false)
      }
    }
    loadReplies()
  }, [isAuthed])

  const visibleLogs = logs.filter((entry) => {
    const term = search.trim().toLowerCase()
    const hasIssue = entry.adminSent === false || entry.confirmSent === false
    if (onlyIssues && !hasIssue) return false
    if (!term) return true
    return (
      entry.name.toLowerCase().includes(term) ||
      entry.email.toLowerCase().includes(term) ||
      (entry.material || "").toLowerCase().includes(term)
    )
  })

  const totals = {
    all: logs.length,
    issues: logs.filter((l) => l.adminSent === false || l.confirmSent === false).length,
    processed: Object.values(processed).filter(Boolean).length,
  }

  function toggleProcessed(ts: string) {
    setProcessed((prev) => ({ ...prev, [ts]: !prev[ts] }))
  }

  function exportCsv() {
    if (!visibleLogs.length) return
    const headers = ["ts", "name", "email", "message", "quantity", "material", "quote", "adminSent", "confirmSent"]
    const rows = visibleLogs.map((e) =>
      headers
        .map((h) => {
          const v = (e as Record<string, unknown>)[h]
          const str =
            typeof v === "string"
              ? v
              : typeof v === "boolean"
              ? v
                ? "true"
                : "false"
              : v ?? ""
          return `"${String(str).replace(/"/g, '""')}"`
        })
        .join(","),
    )
    const csv = [headers.join(","), ...rows].join("\n")
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "contact-log.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  const filteredStock = stock.filter((item) => {
    const term = stockSearch.trim().toLowerCase()
    const isLow = item.availableGrams <= 250
    if (lowOnly && !isLow) return false
    if (!term) return true
    return (
      item.material.toLowerCase().includes(term) ||
      item.color.toLowerCase().includes(term) ||
      (item.supplier || "").toLowerCase().includes(term)
    )
  })

  const stockTotals = {
    items: stock.length,
    low: stock.filter((s) => s.availableGrams <= 250).length,
    grams: stock.reduce((acc, s) => acc + (Number.isFinite(s.availableGrams) ? s.availableGrams : 0), 0),
  }

  function handleStockInput<K extends keyof typeof stockForm>(key: K, value: (typeof stockForm)[K]) {
    setStockForm((prev) => ({ ...prev, [key]: value }))
  }

  function addStockItem(e: React.FormEvent) {
    e.preventDefault()
    const gramsNum = Number(stockForm.availableGrams)
    if (!stockForm.material.trim() || !stockForm.color.trim() || Number.isNaN(gramsNum)) return
    const entry: StockItem = {
      id: crypto.randomUUID(),
      material: stockForm.material.trim(),
      color: stockForm.color.trim(),
      diameter: stockForm.diameter || "1.75mm",
      availableGrams: gramsNum,
      supplier: stockForm.supplier.trim(),
      notes: stockForm.notes.trim(),
      updatedAt: new Date().toISOString(),
    }
    setStock((prev) => [entry, ...prev])
    setStockForm({ material: "", color: "", diameter: stockForm.diameter, availableGrams: "", supplier: "", notes: "" })
  }

  function updateStockAmount(id: string, delta: number) {
    setStock((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, availableGrams: Math.max(0, item.availableGrams + delta), updatedAt: new Date().toISOString() }
          : item,
      ),
    )
  }

  function setStockAmount(id: string, value: number) {
    setStock((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, availableGrams: Math.max(0, value), updatedAt: new Date().toISOString() } : item,
      ),
    )
  }

  function removeStock(id: string) {
    setStock((prev) => prev.filter((item) => item.id !== id))
  }

  async function toggleMaterialStock(key: MaterialKey, label: string, value: boolean) {
    try {
      setMaterialError("")
      setMaterialOverrides((prev) => ({
        ...prev,
        [key]: { ...(prev[key] || {}), [label]: value },
      }))
      const res = await fetch("/material-stock.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, label, inStock: value }),
      })
      if (!res.ok) {
        throw new Error("Write failed")
      }
    } catch {
      setMaterialOverrides((prev) => {
        const next = { ...prev }
        if (next[key]) {
          const copy = { ...next[key] }
          delete copy[label]
          if (Object.keys(copy).length === 0) delete next[key]
          else next[key] = copy
        }
        return next
      })
      setMaterialError("Kon update niet opslaan (mogelijk schrijfrechten op server controleren).")
    }
  }

  async function resetMaterialStock(key: MaterialKey, label: string) {
    try {
      setMaterialError("")
      setMaterialOverrides((prev) => {
        const next = { ...prev }
        if (next[key]) {
          const copy = { ...next[key] }
          delete copy[label]
          if (Object.keys(copy).length === 0) delete next[key]
          else next[key] = copy
        }
        return next
      })
      await fetch("/material-stock.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, label, reset: true }),
      })
    } catch {
      setMaterialError("Kon reset niet opslaan (schrijfrechten?).")
    }
  }

  function startReply(entry: LogEntry) {
    setReplyingTo(entry.ts)
    setReplyToEmail(entry.email)
    setReplySubject(`Re: jouw aanvraag via x3dprints.be`)
    setReplyHtml(
      `<p>Hey ${entry.name || ""},</p><p>Bedankt voor je bericht. Hieronder vind je mijn antwoord.</p><p><br></p><p>-- jouw reactie hier --</p><p><br></p><p>Origineel bericht:</p><blockquote style="border-left:4px solid #e2e8f0;padding-left:12px;color:#475569;">${entry.message}</blockquote>`,
    )
    setReplyStatus("idle")
    setReplyError("")
  }

  async function sendReply() {
    if (!replyingTo || !replyToEmail || !replySubject || !replyHtml) return
    try {
      setReplyStatus("sending")
      setReplyError("")
      const textOKersion = replyHtml.replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]+>/g, " ")
      const res = await fetch("/contact-reply.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: "CHANGE_ME_TOKEN",
          to: replyToEmail,
          subject: replySubject,
          html: replyHtml,
          text: textOKersion,
        }),
      })
      const json = await res.json().catch(() => null)
      if (!res.ok || !json?.ok) {
        throw new Error(json?.error || `Status ${res.status}`)
      }
      setReplyStatus("ok")
    } catch {
      setReplyStatus("error")
      setReplyError("OKersturen mislukt. Controleer token of server.")
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (input === PASSWORD) {
      setIsAuthed(true)
      setError("")
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, PASSWORD)
      }
    } else {
      setError("Wachtwoord klopt niet.")
    }
  }

  function handleLogout() {
    setIsAuthed(false)
    setInput("")
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY)
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_80%_at_50%_0%,rgba(99,102,241,0.25),rgba(15,23,42,1))]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-800/10" />

      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-16 sm:px-10 lg:px-12">
        <header className="mb-10 text-center sm:text-left">
          <h1 className="text-balance text-4xl font-extrabold text-white sm:text-5xl">CRM toegang</h1>
          <p className="mt-3 text-lg text-slate-300">
            Beveiligde zone. OKul het wachtwoord in om verder te gaan.
          </p>
        </header>

        {!isAuthed ? (
          <div className="flex flex-1 items-center justify-center">
            <section className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-indigo-900/60 p-[1px] shadow-2xl shadow-indigo-900/40">
              <div className="relative h-full rounded-2xl bg-slate-950/80 p-6 sm:p-8 backdrop-blur">
                <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-indigo-500/25 blur-3xl" aria-hidden />
                <div className="absolute -left-14 -bottom-16 h-44 w-44 rounded-full bg-cyan-400/20 blur-3xl" aria-hidden />
                <div className="absolute inset-0 flex items-center justify-center opacity-30" aria-hidden>
                  <div className="relative h-44 w-44 animate-spin-slow">
                    <div className="absolute inset-4 rounded-full border border-indigo-300/40" />
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-300/50" style={{ animation: "spin 12s linear infinite" }} />
                    <div className="absolute left-1/2 top-0 h-2 w-6 -translate-x-1/2 rounded-full bg-amber-300 shadow-lg shadow-amber-300/30" />
                  </div>
                </div>
                <div className="space-y-3 relative">
                  <p className="text-xs uppercase tracking-[0.35em] text-indigo-300">CRM</p>
                  <h2 className="text-2xl font-bold text-white sm:text-3xl">Welkom terug</h2>
                  <p className="text-sm text-slate-300">
                    Beveiligde zone voor contactlogs en filamentvoorraad. OKul het wachtwoord in om verder te gaan.
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="mt-6 space-y-5 relative">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-200" htmlFor="password">
                      Wachtwoord
                    </label>
                    <input
                      id="password"
                      type="password"
                      autoComplete="current-password"
                      className="w-full rounded-lg border border-white/15 bg-white/10 px-3 py-3 text-sm text-white placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      required
                    />
                  </div>
                  {error ? (
                    <p className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm font-medium text-rose-100">
                      {error}
                    </p>
                  ) : null}
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:-translate-y-0.5 hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-300"
                  >
                  Ontgrendel
                  <span aria-hidden className="text-indigo-100">-&gt;</span>
                  </button>
                </form>
              </div>
            </section>
          </div>
        ) : (
          <section className="w-full rounded-2xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1">
                {[{ key: "contact", label: "Contact" }, { key: "stock", label: "Filament" }].map((t) => (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => setTab(t.key as typeof tab)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      tab === t.key ? "bg-white text-slate-900 shadow" : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={exportCsv}
                  className="rounded-lg border border-white/20 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
                >
                  Exporteer CSOK
                </button>
                <a
                  href="/data/contact-log.json"
                  className="rounded-lg border border-white/20 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
                  target="_blank"
                  rel="noreferrer"
                >
                  Download log
                </a>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-lg border border-white/20 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
                >
                  Afmelden
                </button>
              </div>
            </div>

            {tab === "contact" ? (
              <>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Totaal</p>
                    <p className="mt-1 text-2xl font-bold text-white">{totals.all}</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Mail issues</p>
                    <p className="mt-1 text-2xl font-bold text-white">{totals.issues}</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Afgewerkt</p>
                    <p className="mt-1 text-2xl font-bold text-white">{totals.processed}</p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 rounded-xl border border-white/10 bg-black/20 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
                    <input
                      type="search"
                      placeholder="Zoek op naam, e-mail of materiaal..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 sm:max-w-md"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <label className="flex items-center gap-2 text-xs font-semibold text-white">
                      <input
                        type="checkbox"
                        checked={onlyIssues}
                        onChange={(e) => setOnlyIssues(e.target.checked)}
                        className="h-4 w-4 rounded border-white/30 bg-transparent text-indigo-400 focus:ring-indigo-400"
                      />
                      Enkel mail issues
                    </label>
                  </div>
                </div>

                <div className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-black/20">
                  {loadingLogs ? (
                    <div className="p-4 text-sm text-slate-300">Laden...</div>
                  ) : logError ? (
                    <div className="p-4 text-sm text-rose-300">{logError}</div>
                  ) : visibleLogs.length === 0 ? (
                    <div className="p-4 text-sm text-slate-300">Geen inzendingen gevonden.</div>
                  ) : (
                    <div className="divide-y divide-white/5">
                      {visibleLogs.map((entry, idx) => (
                        <article key={`${entry.ts}-${idx}`} className="grid gap-3 px-4 py-4 sm:grid-cols-[1fr,1fr] sm:gap-4">
                          <div className="space-y-1">
                            <p className="text-xs uppercase tracking-[0.2em] text-indigo-300">{entry.ts}</p>
                            <p className="text-sm font-semibold text-white">{entry.name || "Onbekend"}</p>
                            <p className="text-sm text-slate-300">{entry.email}</p>
                            <p className="text-xs text-slate-400">
                              Aantal: {entry.quantity || "-"} | Materiaal: {entry.material || "-"}
                            </p>
                            <p className="text-xs text-slate-400">
                              Admin mail: {entry.adminSent ? "OK" : "mislukt"} | Bevestiging: {entry.confirmSent ? "OK" : "mislukt"}
                            </p>
                            <button
                              type="button"
                              onClick={() => toggleProcessed(entry.ts)}
                              className={`rounded-md border px-2 py-1 text-[11px] font-semibold transition ${
                                processed[entry.ts]
                                  ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-200"
                                  : "border-white/20 bg-white/5 text-white hover:bg-white/10"
                              }`}
                            >
                              {processed[entry.ts] ? "Afgewerkt" : "Markeer als afgewerkt"}
                            </button>
                            <button
                              type="button"
                              onClick={() => startReply(entry)}
                              className="rounded-md border border-indigo-400/40 bg-indigo-500/15 px-2 py-1 text-[11px] font-semibold text-indigo-100 transition hover:bg-indigo-500/25"
                            >
                              Antwoord via mail
                            </button>
                          </div>
                          <div className="space-y-2">
                            {entry.quote ? (
                              <pre className="whitespace-pre-wrap rounded-lg border border-white/10 bg-white/5 p-3 text-xs text-slate-200">
                                {entry.quote}
                              </pre>
                            ) : null}
                            <p className="text-sm leading-relaxed text-slate-100">{entry.message}</p>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                </div>

                {replyingTo ? (
                  <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-indigo-300">Antwoord</p>
                        <p className="text-sm text-slate-200">Aan: {replyToEmail}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setReplyingTo(null)
                          setReplySubject("")
                          setReplyHtml("")
                          setReplyStatus("idle")
                          setReplyError("")
                        }}
                        className="rounded-md border border-white/20 px-2 py-1 text-[11px] font-semibold text-white transition hover:bg-white/10"
                      >
                        Sluiten
                      </button>
                    </div>
                    <div className="mt-4 grid gap-3">
                      <div className="grid gap-2">
                        <label className="text-xs font-semibold text-slate-200" htmlFor="reply-subject">
                          Onderwerp
                        </label>
                        <input
                          id="reply-subject"
                          className="w-full rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
                          value={replySubject}
                          onChange={(e) => setReplySubject(e.target.value)}
                        />
                      </div>
                      <div className="grid gap-2">
                        <label className="text-xs font-semibold text-slate-200">Bericht</label>
                        <div className="flex flex-wrap gap-2">
                          {["B", "I", "*", "Link", "Clear"].map((label) => (
                            <button
                              key={label}
                              type="button"
                              onClick={() => {
                                const cmdMap: Record<string, string> = {
                                  B: "bold",
                                  I: "italic",
                                  "*": "insertUnorderedList",
                                  Link: "createLink",
                                  Clear: "removeFormat",
                                }
                                const cmd = cmdMap[label] || "removeFormat"
                                let value: string | undefined
                                if (cmd === "createLink") {
                                  const url = window.prompt("URL invoegen:")
                                  if (!url) return
                                  value = url
                                }
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                document.execCommand(cmd, false, value)
                              }}
                              className="rounded-md border border-white/15 bg-white/10 px-2 py-1 text-[11px] font-semibold text-white hover:bg-white/15"
                            >
                              {label}
                            </button>
                          ))}
                        </div>
                        <div
                          className="min-h-[140px] rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none"
                          contentEditable
                          suppressContentEditableWarning
                          onInput={(e) => setReplyHtml((e.target as HTMLDivElement).innerHTML)}
                          dangerouslySetInnerHTML={{ __html: replyHtml }}
                        />
                      </div>
                      {replyError ? (
                        <p className="text-sm font-medium text-rose-300">{replyError}</p>
                      ) : replyStatus === "ok" ? (
                        <p className="text-sm font-medium text-emerald-300">Antwoord verzonden.</p>
                      ) : null}
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={sendReply}
                          disabled={replyStatus === "sending"}
                          className="inline-flex items-center justify-center rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5 hover:bg-indigo-400 disabled:opacity-60"
                        >
                          {replyStatus === "sending" ? "OKersturen..." : "OKerstuur antwoord"}
                        </button>
                        <p className="text-xs text-slate-400">
                          OKersturen via contact-reply.php (zorg dat token op server hetzelfde is).
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null}

                <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-indigo-300">Historiek antwoorden</p>
                      <p className="text-sm text-slate-200">Laatst verstuurde replies vanuit de CRM.</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href="/data/contact-replies.json"
                        className="rounded-md border border-white/20 px-2 py-1 text-[11px] font-semibold text-white transition hover:bg-white/10"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Download replies
                      </a>
                    </div>
                  </div>
                  <div className="mt-4">
                    {loadingReplies ? (
                      <p className="text-sm text-slate-300">Laden...</p>
                    ) : repliesError ? (
                      <p className="text-sm text-rose-300">{repliesError}</p>
                    ) : replies.length === 0 ? (
                      <p className="text-sm text-slate-300">Nog geen antwoorden verzonden.</p>
                    ) : (
                      <div className="divide-y divide-white/10">
                        {replies.slice(0, 50).map((reply, idx) => (
                          <div key={`${reply.ts}-${idx}`} className="flex flex-col gap-1 py-3">
                            <p className="text-xs uppercase tracking-[0.2em] text-indigo-300">{reply.ts}</p>
                            <p className="text-sm font-semibold text-white">{reply.subject}</p>
                            <p className="text-sm text-slate-300">Aan: {reply.to}</p>
                            <p className="text-xs text-slate-400">Status: {reply.sent ? "Verzonden" : "Mislukt"}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Spoelen</p>
                    <p className="mt-1 text-2xl font-bold text-white">{stockTotals.items}</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Laag (&lt;250g)</p>
                    <p className="mt-1 text-2xl font-bold text-white">{stockTotals.low}</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Totaal gram</p>
                    <p className="mt-1 text-2xl font-bold text-white">{stockTotals.grams}</p>
                  </div>
                </div>

                <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Website voorraad</p>
                      <p className="text-sm text-slate-200">
                        Toggle inStock voor lib/materials.ts (bewaar in /data/material-stock.json via PHP).
                      </p>
                    </div>
                    {materialError ? <p className="text-xs font-semibold text-rose-300">{materialError}</p> : null}
                  </div>
                  {materialLoading ? (
                    <p className="mt-3 text-sm text-slate-300">Laden...</p>
                  ) : (
                    <div className="mt-4 space-y-4">
                      {MATERIAL_ORDER.map((key) => {
                        const mat = MATERIALS[key]
                        const overrides = materialOverrides[key] || {}
                        return (
                          <div key={key} className="rounded-lg border border-white/10 bg-black/20 p-3">
                            <p className="text-sm font-semibold text-white">{mat.name}</p>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {mat.swatches.map((swatch) => {
                                const active = typeof overrides[swatch.label] === "boolean" ? overrides[swatch.label] : swatch.inStock
                                return (
                                  <div key={swatch.label} className="flex items-center gap-2">
                                    <button
                                      type="button"
                                      onClick={() => toggleMaterialStock(key, swatch.label, !active)}
                                      className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                                        active
                                          ? "border-emerald-400/60 bg-emerald-400/10 text-emerald-100"
                                          : "border-white/15 bg-white/5 text-white hover:bg-white/10"
                                      }`}
                                      title={swatch.label}
                                    >
                                      {swatch.label} {active ? "OK" : "*"}
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => resetMaterialStock(key, swatch.label)}
                                      className="rounded-full border border-white/15 bg-white/5 px-2 py-1 text-[11px] text-white transition hover:bg-white/10"
                                      title="Reset naar default"
                                    >
                                      Reset
                                    </button>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>

                <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_.9fr]">
                  <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                    <form className="grid gap-3" onSubmit={addStockItem}>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <label className="grid gap-1 text-sm font-semibold text-white">
                          Materiaal
                          <input
                            value={stockForm.material}
                            onChange={(e) => handleStockInput("material", e.target.value)}
                            required
                            className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
                            placeholder="PLA Matte, PETG..."
                          />
                        </label>
                        <label className="grid gap-1 text-sm font-semibold text-white">
                          Kleur
                          <input
                            value={stockForm.color}
                            onChange={(e) => handleStockInput("color", e.target.value)}
                            required
                            className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
                            placeholder="Zwart, Wit, Neon..."
                          />
                        </label>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-3">
                        <label className="grid gap-1 text-sm font-semibold text-white">
                          Diameter
                          <select
                            value={stockForm.diameter}
                            onChange={(e) => handleStockInput("diameter", e.target.value)}
                            className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
                          >
                            <option value="1.75mm">1.75mm</option>
                            <option value="2.85mm">2.85mm</option>
                          </select>
                        </label>
                        <label className="grid gap-1 text-sm font-semibold text-white">
                          OKoorraad (g)
                          <input
                            type="number"
                            min={0}
                            value={stockForm.availableGrams}
                            onChange={(e) => handleStockInput("availableGrams", e.target.value)}
                            required
                            className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
                            placeholder="750"
                          />
                        </label>
                        <label className="grid gap-1 text-sm font-semibold text-white">
                          Leverancier
                          <input
                            value={stockForm.supplier}
                            onChange={(e) => handleStockInput("supplier", e.target.value)}
                            className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
                            placeholder="Prusament, Colorfabb..."
                          />
                        </label>
                      </div>
                      <label className="grid gap-1 text-sm font-semibold text-white">
                        Notities
                        <textarea
                          value={stockForm.notes}
                          onChange={(e) => handleStockInput("notes", e.target.value)}
                          rows={3}
                          className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
                          placeholder="Gebruik alleen voor functionele prints, matte finish, etc."
                        />
                      </label>
                      <div className="flex items-center gap-2">
                        <button
                          type="submit"
                          className="inline-flex items-center justify-center rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5 hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-300"
                        >
                          OKoeg toe
                        </button>
                        <p className="text-xs text-slate-400">Opslag: lokaal in je browser.</p>
                      </div>
                    </form>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <input
                        type="search"
                        placeholder="Filter op materiaal/kleur/leverancier"
                        value={stockSearch}
                        onChange={(e) => setStockSearch(e.target.value)}
                        className="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 sm:max-w-sm"
                      />
                      <label className="flex items-center gap-2 text-xs font-semibold text-white">
                        <input
                          type="checkbox"
                          checked={lowOnly}
                          onChange={(e) => setLowOnly(e.target.checked)}
                          className="h-4 w-4 rounded border-white/30 bg-transparent text-indigo-400 focus:ring-indigo-400"
                        />
                        Enkel laag op voorraad
                      </label>
                    </div>
                    <div className="mt-4 space-y-3">
                      {filteredStock.length === 0 ? (
                        <p className="text-sm text-slate-300">Geen items.</p>
                      ) : (
                        filteredStock.map((item) => {
                          const isLow = item.availableGrams <= 250
                          return (
                            <div
                              key={item.id}
                              className="rounded-lg border border-white/10 bg-white/5 p-4 shadow-sm shadow-black/30"
                            >
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <div>
                                  <p className="text-sm font-semibold text-white">
                                    {item.material} | {item.color}
                                  </p>
                                  <p className="text-xs text-slate-400">
                                    {item.diameter} | {item.supplier || "Onbekende leverancier"} | Laatst:{" "}
                                    {new Date(item.updatedAt).toLocaleString()}
                                  </p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeStock(item.id)}
                                  className="rounded-md border border-white/20 px-2 py-1 text-[11px] font-semibold text-white transition hover:bg-white/10"
                                >
                                  OKerwijder
                                </button>
                              </div>
                              <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center gap-3">
                                  <input
                                    type="number"
                                    min={0}
                                    value={item.availableGrams}
                                    onChange={(e) => setStockAmount(item.id, Number(e.target.value))}
                                    className="w-24 rounded-lg border border-white/10 bg-white/10 px-2 py-1 text-sm text-white focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                  />
                                  <span className={`text-sm font-semibold ${isLow ? "text-amber-300" : "text-emerald-300"}`}>
                                    {item.availableGrams} g
                                  </span>
                                  <div className="flex items-center gap-1">
                                    <button
                                      type="button"
                                      onClick={() => updateStockAmount(item.id, 50)}
                                      className="rounded-md border border-white/15 px-2 py-1 text-[11px] text-white hover:bg-white/10"
                                    >
                                      +50
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => updateStockAmount(item.id, -50)}
                                      className="rounded-md border border-white/15 px-2 py-1 text-[11px] text-white hover:bg-white/10"
                                    >
                                      -50
                                    </button>
                                  </div>
                                </div>
                                {isLow ? <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">LAAG</span> : null}
                              </div>
                              {item.notes ? (
                                <p className="mt-2 text-sm text-slate-200">{item.notes}</p>
                              ) : null}
                            </div>
                          )
                        })
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </section>
        )}
      </div>
    </main>
  )
}
