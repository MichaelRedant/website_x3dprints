// components/ContactForm.tsx
"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import { MATERIALS } from "@/lib/materials"

type FormDataShape = {
  name: string
  email: string
  message: string
  quantity: string
  material: string
  quote: string
  hp: string // honeypot value (we mappen dit naar name="website")
}

const inputBase =
  "w-full rounded-lg border border-slate-300 bg-white/90 px-3 py-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"

const labelCls = "text-xs font-semibold text-slate-700"
const row = "grid gap-2"
const groupCls = "rounded-2xl border border-slate-200 bg-white/70 p-4 sm:p-5"
const headingCls = "text-sm font-semibold text-slate-900"

type ContactFormProps = {
  defaultMaterial?: string
}

export default function ContactForm({ defaultMaterial = "" }: ContactFormProps) {
  const searchParams = useSearchParams()
  const materialFromQuery = searchParams.get("material") || ""
  const quoteFromQuery = searchParams.get("quote") || ""
  const decodedQueryMaterial = useMemo(() => {
    if (!materialFromQuery) return ""
    try {
      return decodeURIComponent(materialFromQuery)
    } catch {
      return materialFromQuery
    }
  }, [materialFromQuery])
  const decodedQuote = useMemo(() => {
    if (!quoteFromQuery) return ""
    try {
      return decodeURIComponent(quoteFromQuery)
    } catch {
      return quoteFromQuery
    }
  }, [quoteFromQuery])
  const initialMaterial = decodedQueryMaterial || defaultMaterial

  const appliedDefaultRef = useRef(initialMaterial)
  const appliedQuoteRef = useRef(decodedQuote)
  const [data, setData] = useState<FormDataShape>({
    name: "",
    email: "",
    message: "",
    quantity: "",
    material: initialMaterial,
    quote: decodedQuote ? decodedQuote : "",
    hp: "",
  })
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle")
  const [serverError, setServerError] = useState<string>("")

  function update<K extends keyof FormDataShape>(key: K, value: FormDataShape[K]) {
    setData(prev => ({ ...prev, [key]: value }))
  }

  useEffect(() => {
    const nextDefault = decodedQueryMaterial || defaultMaterial
    if (!nextDefault) return
    setData(prev => {
      if (prev.material && prev.material !== appliedDefaultRef.current) {
        return prev
      }
      return { ...prev, material: nextDefault }
    })
    appliedDefaultRef.current = nextDefault
  }, [decodedQueryMaterial, defaultMaterial])

  useEffect(() => {
    if (!decodedQuote) return
    setData(prev => {
      if (prev.quote && prev.quote !== appliedQuoteRef.current) return prev
      return {
        ...prev,
        quote: decodedQuote,
      }
    })
    appliedQuoteRef.current = decodedQuote
  }, [decodedQuote])

  const emailValid = useMemo(() => /\S+@\S+\.\S+/.test(data.email), [data.email])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (data.hp) return // honeypot gevuld => bot
    if (!emailValid) return

    try {
      setStatus("loading")
      setServerError("")
      const form = new FormData()
      ;(Object.keys(data) as (keyof FormDataShape)[]).forEach(k => {
        form.append(k, String(data[k] ?? ""))
      })
      // PHP honeypot verwacht "website"
      form.append("website", data.hp || "")
      // Optioneel: human-friendly extra velden naar PHP (zelfde handler voegt ze onderaan toe)
      if (data.quantity) form.append("quantity", data.quantity)
      if (data.material) form.append("material", data.material)
      if (data.quote) form.append("quote", data.quote)

      const res = await fetch("/contact.php", { method: "POST", body: form })
      const result = await res.json().catch(() => null)
      const ok = !!result?.success
      if (!ok && result?.error) setServerError(result.error)
      setStatus(ok ? "ok" : "error")

      if (ok) {
        setData({ name: "", email: "", message: "", quantity: "", material: "", quote: "", hp: "" })
      }
    } catch {
      setStatus("error")
    }
  }

  const materialOptions = [
    ...Object.values(MATERIALS).map((m) => m.name),
    "Onzeker, graag advies",
  ]

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      {/* Contactgegevens (basic) */}
      <section className={groupCls} aria-labelledby="contact-legend">
        <h3 id="contact-legend" className={headingCls}>Contactgegevens</h3>

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
        </div>
      </section>

      {/* Projectdetails (optioneel, maar simpel gehouden) */}
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
              {materialOptions.map(m => (<option key={m} value={m} />))}
            </datalist>
          </div>
        </div>
      </section>

      {/* Indicatieve schatting (readonly) */}
      {data.quote ? (
        <section className={groupCls} aria-labelledby="quote-legend">
          <h3 id="quote-legend" className={headingCls}>
            Indicatieve schatting (excl. btw, ontwerpkosten, premium STL)
          </h3>
          <p className="mt-2 text-xs text-slate-600">
            Deze berekening komt uit de prijscalculator. Pas desnoods aan of laat staan voor context.
          </p>
          <div className="mt-3 grid gap-2">
            <textarea
              id="quote"
              className={`${inputBase} min-h-[80px]`}
              value={data.quote}
              readOnly
            />
          </div>
        </section>
      ) : null}

      {/* Beschrijving */}
      <section className={groupCls} aria-labelledby="message-legend">
        <h3 id="message-legend" className={headingCls}>Beschrijving</h3>
        <div className="mt-3 grid gap-2">
          <label className="sr-only" htmlFor="message">Beschrijving</label>
          <textarea
            id="message"
            className={`${inputBase} min-h-[160px]`}
            placeholder="Downloadlink(s) naar STL/STEP, afmetingen, gewenste afwerking, deadline…"
            value={data.message}
            onChange={e => update("message", e.target.value)}
            rows={6}
            required
          />
        </div>
      </section>

      {/* Honeypot (zichtbaar voor bots, niet voor mensen) */}
      <input
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        name="website"              // belangrijk: zelfde naam als je werkende site
        value={data.hp}
        onChange={e => update("hp", e.target.value)}
      />

      {/* Acties */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "loading" || !emailValid}
          className="rounded-xl border border-slate-300 bg-white/90 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-white disabled:opacity-60"
        >
          {status === "loading" ? "Versturen…" : "Verstuur aanvraag"}
        </button>
        {status === "ok" && <span className="text-sm font-medium text-emerald-600">Verzonden. Bedankt!</span>}
        {status === "error" && <span className="text-sm font-medium text-red-600">{serverError || "Er ging iets mis. Probeer opnieuw."}</span>}
      </div>
    </form>
  )
}
