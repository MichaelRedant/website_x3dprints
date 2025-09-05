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
  hp: string
}

const inputBase =
  "w-full rounded-lg border border-slate-300 bg-white/90 px-3 py-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"

const labelCls = "text-xs font-semibold text-slate-700"
const row = "grid gap-2"
const groupCls = "rounded-2xl border border-slate-200 bg-white/70 p-4 sm:p-5"
const headingCls = "text-sm font-semibold text-slate-900"

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
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle")
  const [serverError, setServerError] = useState<string>("")

  function update<K extends keyof FormDataShape>(key: K, value: FormDataShape[K]) {
    setData(prev => ({ ...prev, [key]: value }))
  }

  const emailValid = useMemo(() => /\S+@\S+\.\S+/.test(data.email), [data.email])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (data.hp) return
    if (!emailValid) return

    try {
      setStatus("loading")
      setServerError("")
      const form = new FormData()
      ;(Object.keys(data) as (keyof FormDataShape)[]).forEach(k => {
        form.append(k, String(data[k] ?? ""))
      })
      const res = await fetch("/api/contact", { method: "POST", body: form })
      const json = await res.json().catch(() => null)
      const ok = res.ok && json?.ok
      if (!ok && json?.error) setServerError(json.error)
      setStatus(ok ? "ok" : "error")
      if (ok) {
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
      {/* Contactgegevens */}
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
                  className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${active ? "bg-slate-900 text-white shadow-sm" : "text-slate-700 hover:bg-slate-100"}`}
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
            <input id="name" className={inputBase} placeholder="Voornaam Naam"
              value={data.name} onChange={e => update("name", e.target.value)} required />
          </div>

          <div className={row}>
            <label className={labelCls} htmlFor="email">E-mail*</label>
            <input id="email" type="email"
              className={`${inputBase} ${data.email && !emailValid ? "border-red-400 ring-4 ring-red-400/10" : ""}`}
              placeholder="jij@voorbeeld.be" value={data.email}
              onChange={e => update("email", e.target.value)} required
              aria-invalid={Boolean(data.email && !emailValid)} />
          </div>

          {data.type === "business" ? (
            <>
              <div className={row}>
                <label className={labelCls} htmlFor="company">Bedrijfsnaam*</label>
                <input id="company" className={inputBase} placeholder="Bedrijf BV"
                  value={data.company} onChange={e => update("company", e.target.value)} required />
              </div>
              <div className={row}>
                <label className={labelCls} htmlFor="vat">BTW-nummer</label>
                <input id="vat" className={inputBase} placeholder="BE0123.456.789"
                  value={data.vat} onChange={e => update("vat", e.target.value)} />
              </div>
            </>
          ) : (
            <div className="sm:col-span-2 grid gap-2">
              <label className={labelCls} htmlFor="address">Adres (optioneel)</label>
              <input id="address" className={inputBase} placeholder="Straat 1, 9550 Herzele"
                value={data.address} onChange={e => update("address", e.target.value)} />
            </div>
          )}
        </div>
      </section>

      {/* Projectdetails */}
      <section className={groupCls} aria-labelledby="project-legend">
        <h3 id="project-legend" className={headingCls}>Projectdetails</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className={row}>
            <label className={labelCls} htmlFor="quantity">Aantal</label>
            <input id="quantity" type="number" min={1} className={inputBase}
              placeholder="1" value={data.quantity} onChange={e => update("quantity", e.target.value)} />
          </div>
          <div className={row}>
            <label className={labelCls} htmlFor="material">Materiaal</label>
            <input id="material" className={inputBase} list="materials"
              placeholder="PLA Matte, PETG, TPU…" value={data.material}
              onChange={e => update("material", e.target.value)} />
            <datalist id="materials">
              {materialOptions.map(m => (<option key={m} value={m} />))}
            </datalist>
          </div>
        </div>
      </section>

      {/* Beschrijving */}
      <section className={groupCls} aria-labelledby="message-legend">
        <h3 id="message-legend" className={headingCls}>Beschrijving</h3>
        <div className="mt-3 grid gap-2">
          <label className="sr-only" htmlFor="message">Beschrijving</label>
          <textarea id="message" className={`${inputBase} min-h-[160px]`}
            placeholder="Link(s) naar STL/STEP, afmetingen, gewenste afwerking, deadline…"
            value={data.message} onChange={e => update("message", e.target.value)}
            rows={6} required />
        </div>
      </section>

      {/* honeypot */}
      <input tabIndex={-1} autoComplete="off" aria-hidden="true"
        className="hidden" value={data.hp} onChange={e => update("hp", e.target.value)} />

      {/* acties */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <button type="submit" disabled={status === "loading" || !emailValid}
          className="rounded-xl border border-slate-300 bg-white/90 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-white disabled:opacity-60">
          {status === "loading" ? "Versturen…" : "Verstuur aanvraag"}
        </button>
        {status === "ok" && <span className="text-sm font-medium text-emerald-600">Verzonden. Bedankt!</span>}
        {status === "error" && <span className="text-sm font-medium text-red-600">{serverError || "Er ging iets mis. Probeer opnieuw."}</span>}
      </div>
    </form>
  )
}
