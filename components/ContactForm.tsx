// components/ContactForm.tsx
"use client"

import { useMemo, useState } from "react"
import { MATERIALS } from "@/lib/materials"

type FormDataShape = {
  name: string
  email: string
  message: string
  type: "private" | "business"
  company: string
  vat: string
  address: string
  quantity: string
  material: string
  hp: string // honeypot
}

const inputBase =
  "w-full rounded-lg border border-slate-300 bg-white/90 px-3 py-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"

const labelCls = "text-xs font-semibold text-slate-700"
const row = "grid gap-2"
const groupCls = "rounded-2xl border border-slate-200 bg-white/70 p-4 sm:p-5"
const headingCls = "text-sm font-semibold text-slate-900"

const ALLOWED_EXT = [".stl", ".step", ".stp", ".igs", ".iges"]
const MAX_FILES = 6
const MAX_TOTAL_MB = 30

function extOk(name: string) {
  const n = name.toLowerCase()
  return ALLOWED_EXT.some(e => n.endsWith(e))
}

export default function ContactForm() {
  const [data, setData] = useState<FormDataShape>({
    name: "",
    email: "",
    message: "",
    type: "private",
    company: "",
    vat: "",
    address: "",
    quantity: "",
    material: "",
    hp: "",
  })
  const [files, setFiles] = useState<File[]>([])
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle")
  const [fileError, setFileError] = useState<string>("")
  const [dragOver, setDragOver] = useState(false)

  function update<K extends keyof FormDataShape>(key: K, value: FormDataShape[K]) {
    setData(prev => ({ ...prev, [key]: value }))
  }

  const emailValid = useMemo(() => /\S+@\S+\.\S+/.test(data.email), [data.email])

  function onPick(list: FileList | null) {
    if (!list) return
    const picked = Array.from(list)

    const invalid = picked.find(f => !extOk(f.name))
    if (invalid) {
      setFileError(`Bestandstype niet toegestaan: ${invalid.name} (toegestaan: ${ALLOWED_EXT.join(", ")})`)
      return
    }

    const next = [...files, ...picked].slice(0, MAX_FILES)
    const totalBytes = next.reduce((s, f) => s + f.size, 0)
    const totalMB = totalBytes / (1024 * 1024)

    if (totalMB > MAX_TOTAL_MB) {
      setFileError(`Max ${MAX_FILES} bestanden / ${MAX_TOTAL_MB} MB totaal. Je zit op ${totalMB.toFixed(1)} MB.`)
      return
    }

    setFileError("")
    setFiles(next)
  }

  function removeFile(idx: number) {
    setFiles(f => f.filter((_, i) => i !== idx))
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (data.hp) return
    if (!emailValid) return

    try {
      setStatus("loading")
      const form = new FormData()
      ;(Object.keys(data) as (keyof FormDataShape)[]).forEach(k => {
        form.append(k, String(data[k] ?? ""))
      })
      files.forEach(f => form.append("files", f, f.name))

      const endpoint =
        process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ??
        (process.env.NODE_ENV === "development"
          ? "http://127.0.0.1:8000/contact.php"
          : "/contact.php")
      const res = await fetch(endpoint, {
        method: "POST",
        body: form,
      })
      setStatus(res.ok ? "ok" : "error")
      if (res.ok) {
        setData({
          name: "",
          email: "",
          message: "",
          type: "private",
          company: "",
          vat: "",
          address: "",
          quantity: "",
          material: "",
          hp: "",
        })
        setFiles([])
      }
    } catch {
      setStatus("error")
    }
  }

  const materialOptions = [
    ...Object.values(MATERIALS).map(m => m.name),
    "Onzeker – graag advies",
  ]

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      {/* GROEP 1: type + contact */}
      <section className={groupCls} aria-labelledby="contact-legend">
        <div className="flex items-center justify-between gap-3">
          <h3 id="contact-legend" className={headingCls}>Contactgegevens</h3>

          <div className="inline-flex gap-2 rounded-lg border border-slate-300 bg-white/80 p-1">
            {(["private", "business"] as const).map(t => {
              const active = data.type === t
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => update("type", t)}
                  className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                    active ? "bg-slate-900 text-white shadow-sm" : "text-slate-700 hover:bg-slate-100"
                  }`}
                  aria-pressed={active}
                >
                  {t === "private" ? "Particulier" : "Bedrijf"}
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className={row}>
            <label className={labelCls} htmlFor="name">Naam*</label>
            <input
              id="name"
              className={inputBase}
              placeholder="Voornaam Naam"
              value={data.name}
              onChange={e => update("name", e.target.value)}
              required
            />
          </div>

          <div className={row}>
            <label className={labelCls} htmlFor="email">E-mail*</label>
            <input
              id="email"
              type="email"
              className={`${inputBase} ${data.email && !emailValid ? "border-red-400 ring-4 ring-red-400/10" : ""}`}
              placeholder="jij@voorbeeld.be"
              value={data.email}
              onChange={e => update("email", e.target.value)}
              required
              aria-invalid={Boolean(data.email && !emailValid)}
            />
          </div>

          {data.type === "business" ? (
            <>
              <div className={row}>
                <label className={labelCls} htmlFor="company">Bedrijfsnaam*</label>
                <input
                  id="company"
                  className={inputBase}
                  placeholder="Bedrijf BV"
                  value={data.company}
                  onChange={e => update("company", e.target.value)}
                  required
                />
              </div>
              <div className={row}>
                <label className={labelCls} htmlFor="vat">BTW-nummer</label>
                <input
                  id="vat"
                  className={inputBase}
                  placeholder="BE0123.456.789"
                  value={data.vat}
                  onChange={e => update("vat", e.target.value)}
                />
              </div>
            </>
          ) : (
            <div className="sm:col-span-2 grid gap-2">
              <label className={labelCls} htmlFor="address">Adres (optioneel)</label>
              <input
                id="address"
                className={inputBase}
                placeholder="Straat 1, 9550 Herzele"
                value={data.address}
                onChange={e => update("address", e.target.value)}
              />
            </div>
          )}
        </div>
      </section>

      {/* GROEP 2: project details */}
      <section className={groupCls} aria-labelledby="project-legend">
        <h3 id="project-legend" className={headingCls}>Projectdetails</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className={row}>
            <label className={labelCls} htmlFor="quantity">Aantal</label>
            <input
              id="quantity"
              type="number"
              min={1}
              className={inputBase}
              placeholder="1"
              value={data.quantity}
              onChange={e => update("quantity", e.target.value)}
            />
          </div>

          <div className={row}>
            <label className={labelCls} htmlFor="material">Materiaal</label>
            <input
              id="material"
              className={inputBase}
              list="materials"
              placeholder="PLA Matte, PETG, TPU…"
              value={data.material}
              onChange={e => update("material", e.target.value)}
            />
            <datalist id="materials">
              {materialOptions.map(m => (
                <option key={m} value={m} />
              ))}
            </datalist>
          </div>
        </div>
      </section>

      {/* GROEP 3: files */}
      <section className={groupCls} aria-labelledby="files-legend">
        <h3 id="files-legend" className={headingCls}>Bestanden</h3>
        <p className="mt-1 text-xs text-slate-600">
          STL/STEP/IGES — max {MAX_FILES} bestanden en {MAX_TOTAL_MB} MB totaal. Grotere modellen: link delen in het bericht.
        </p>

        <div
          className={`mt-4 rounded-xl border-2 border-dashed p-4 transition ${
            dragOver ? "border-indigo-500 bg-indigo-50/60" : "border-slate-300 bg-white/60"
          }`}
          onDragOver={e => {
            e.preventDefault()
            setDragOver(true)
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={e => {
            e.preventDefault()
            setDragOver(false)
            onPick(e.dataTransfer.files)
          }}
        >
          <input
            id="files"
            type="file"
            multiple
            onChange={e => onPick(e.target.files)}
            accept={ALLOWED_EXT.join(",")}
            className="block w-full text-sm file:mr-3 file:rounded-md file:border file:border-slate-300 file:bg-white file:px-3 file:py-2 file:text-xs file:font-semibold file:text-slate-900 hover:file:bg-slate-50"
          />
          {fileError && <p className="mt-2 text-xs font-medium text-red-600">{fileError}</p>}

          {files.length > 0 && (
            <ul className="mt-3 divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white/80">
              {files.map((f, i) => (
                <li key={`${f.name}-${i}`} className="flex items-center justify-between gap-3 px-3 py-2 text-sm text-slate-800">
                  <span className="truncate">
                    {f.name} <span className="text-slate-500">({(f.size / (1024 * 1024)).toFixed(1)} MB)</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFile(i)}
                    className="rounded-md px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                    aria-label={`Verwijder ${f.name}`}
                  >
                    Verwijder
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* GROEP 4: bericht */}
      <section className={groupCls} aria-labelledby="message-legend">
        <h3 id="message-legend" className={headingCls}>Beschrijving</h3>
        <div className="mt-3 grid gap-2">
          <label className="sr-only" htmlFor="message">Beschrijving</label>
          <textarea
            id="message"
            className={`${inputBase} min-h-[160px]`}
            placeholder="Link(s) naar STL/STEP, afmetingen, gewenste afwerking, deadline…"
            value={data.message}
            onChange={e => update("message", e.target.value)}
            rows={6}
            required
          />
        </div>
      </section>

      {/* honeypot */}
      <input
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        value={data.hp}
        onChange={e => update("hp", e.target.value)}
      />

      {/* acties */}
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-xl border border-slate-300 bg-white/90 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-white disabled:opacity-60"
        >
          {status === "loading" ? "Versturen…" : "Verstuur aanvraag"}
        </button>
        {status === "ok" && <span className="text-sm font-medium text-emerald-600">Verzonden. Bedankt!</span>}
        {status === "error" && <span className="text-sm font-medium text-red-600">Er ging iets mis. Probeer opnieuw.</span>}
      </div>
    </form>
  )
}
