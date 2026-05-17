// components/ContactForm.tsx
"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { MATERIALS, MATERIAL_KEY_BY_SLUG, materialSlug, type MaterialKey } from "@/lib/materials"
import { useLocale } from "./LocaleProvider"
import { trackEvent } from "@/lib/analytics"

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
  "w-full rounded-lg border border-slate-300 bg-white/90 px-3 py-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-900/80 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-sky-400 dark:focus:ring-sky-400/20"

const labelCls = "text-xs font-semibold text-slate-700 dark:text-slate-200"
const row = "grid gap-2"
const groupCls =
  "rounded-2xl border border-slate-200 bg-white/70 p-4 sm:p-5 dark:border-slate-700/70 dark:bg-slate-950/60"
const headingCls = "text-sm font-semibold text-slate-900 dark:text-slate-100"
const LEAD_FIRST_NAME_KEY = "x3dprints_lead_first_name"
const LEAD_MATERIAL_NAME_KEY = "x3dprints_lead_material_name"
const LEAD_CONTEXT_NAME_KEY = "x3dprints_lead_context_name"

type ContactFormProps = {
  defaultMaterial?: string
}

const COPY = {
  nl: {
    contactHeading: "Contactgegevens",
    nameLabel: "Naam*",
    namePlaceholder: "Voornaam Naam",
    emailLabel: "E-mail*",
    emailPlaceholder: "jij@voorbeeld.be",
    projectHeading: "Projectdetails",
    quantityLabel: "Aantal",
    materialLabel: "Materiaal",
    materialPlaceholder: "PLA Matte, PETG, TPU...",
    unknownMaterial: "Onzeker, graag advies",
    estimateHeading: "Indicatieve schatting uit calculator (excl. btw en levering)",
    estimateHelp: "Deze berekening kan printen, scannen en/of modelleren bevatten. Scan- en modelleerkosten zijn eenmalige offerteposten, niet per geprint stuk.",
    descriptionHeading: "Beschrijving",
    descriptionPlaceholder: "Downloadlink(s) naar STL/STEP, afmetingen, gewenste afwerking, deadline...",
    submit: "Verstuur aanvraag",
    submitting: "Versturen...",
    success: "Verzonden. Bedankt!",
    errorGeneric: "Er ging iets mis. Probeer opnieuw.",
    errorUnexpected: "Onverwacht serverantwoord.",
    errorUnknown: "Onbekende fout.",
    errorNetwork: "Netwerkfout",
  },
  en: {
    contactHeading: "Contact details",
    nameLabel: "Name*",
    namePlaceholder: "First name Last name",
    emailLabel: "Email*",
    emailPlaceholder: "you@example.com",
    projectHeading: "Project details",
    quantityLabel: "Quantity",
    materialLabel: "Material",
    materialPlaceholder: "PLA Matte, PETG, TPU...",
    unknownMaterial: "Not sure, need advice",
    estimateHeading: "Indicative calculator estimate (excl. VAT and delivery)",
    estimateHelp: "This calculation may include printing, scanning and/or modelling. Scan and modelling costs are one-time quote items, not per printed piece.",
    descriptionHeading: "Description",
    descriptionPlaceholder: "Download link(s) to STL/STEP, dimensions, desired finish, deadline...",
    submit: "Send request",
    submitting: "Sending...",
    success: "Sent. Thank you!",
    errorGeneric: "Something went wrong. Please try again.",
    errorUnexpected: "Unexpected server response.",
    errorUnknown: "Unknown error.",
    errorNetwork: "Network error",
  },
}

function resolveMaterialName(raw: string) {
  const value = raw.trim()
  if (!value) return ""

  const directMatch = Object.values(MATERIALS).find((m) => m.name.toLowerCase() === value.toLowerCase())
  if (directMatch) return directMatch.name

  const normalizedSlug = materialSlug(value)
  const slugKey = MATERIAL_KEY_BY_SLUG[normalizedSlug]
  if (slugKey) return MATERIALS[slugKey].name

  if ((value as MaterialKey) in MATERIALS) {
    const maybeKey = value as MaterialKey
    return MATERIALS[maybeKey].name
  }

  return value
}

function resolveQuantityValue(raw: string) {
  const cleaned = raw.replace(/[^\d]/g, "").slice(0, 3)
  if (!cleaned) return ""
  const parsed = Number(cleaned)
  if (!Number.isFinite(parsed) || parsed <= 0) return ""
  return String(Math.min(Math.round(parsed), 999))
}

export default function ContactForm({ defaultMaterial = "" }: ContactFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { locale } = useLocale()
  const copy = locale === "en" ? COPY.en : COPY.nl
  const materialFromQuery = searchParams.get("material") || ""
  const quoteFromQuery = searchParams.get("quote") || ""
  const quantityFromQuery = searchParams.get("quantity") || ""
  const decodedQueryMaterial = useMemo(() => {
    if (!materialFromQuery) return ""
    try {
      return resolveMaterialName(decodeURIComponent(materialFromQuery))
    } catch {
      return resolveMaterialName(materialFromQuery)
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
  const decodedQuantity = useMemo(() => resolveQuantityValue(quantityFromQuery), [quantityFromQuery])
  const initialMaterial = decodedQueryMaterial || defaultMaterial

  const appliedDefaultRef = useRef(initialMaterial)
  const appliedQuoteRef = useRef(decodedQuote)
  const appliedQuantityRef = useRef(decodedQuantity)
  const [data, setData] = useState<FormDataShape>({
    name: "",
    email: "",
    message: "",
    quantity: decodedQuantity,
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

  useEffect(() => {
    if (!decodedQuantity) return
    setData(prev => {
      if (prev.quantity && prev.quantity !== appliedQuantityRef.current) return prev
      return {
        ...prev,
        quantity: decodedQuantity,
      }
    })
    appliedQuantityRef.current = decodedQuantity
  }, [decodedQuantity])

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

      const endpoints = ["/api/contact", "/contact.php"]
      let lastError = ""

      for (const endpoint of endpoints) {
        try {
          const res = await fetch(endpoint, { method: "POST", body: form })
          const raw = await res.text()
          let result: { success?: boolean; ok?: boolean; error?: string } | null = null
          if (raw) {
            try {
              result = JSON.parse(raw) as { success?: boolean; ok?: boolean; error?: string }
            } catch {
              result = null
            }
          }
          const ok = Boolean(result?.success || result?.ok)

          if (ok) {
            const firstName = data.name.trim().split(/\s+/)[0]?.slice(0, 40) || ""
            const normalizedMaterial = materialSlug(resolveMaterialName(data.material))
            const materialKey = MATERIAL_KEY_BY_SLUG[normalizedMaterial]
            const materialParam = materialKey ? normalizedMaterial : ""
            const materialName = materialKey ? MATERIALS[materialKey].name : ""

            try {
              if (firstName) {
                sessionStorage.setItem(LEAD_FIRST_NAME_KEY, firstName)
              } else {
                sessionStorage.removeItem(LEAD_FIRST_NAME_KEY)
              }
              if (materialName) {
                sessionStorage.setItem(LEAD_MATERIAL_NAME_KEY, materialName)
              } else {
                sessionStorage.removeItem(LEAD_MATERIAL_NAME_KEY)
              }
              sessionStorage.removeItem(LEAD_CONTEXT_NAME_KEY)
            } catch {
              // Ignore storage errors in strict/privacy browser modes.
            }

            setStatus("ok")
            setData({ name: "", email: "", message: "", quantity: "", material: "", quote: "", hp: "" })
            trackEvent({
              action: "contact_submit",
              category: "lead",
              label: data.material || "unknown",
            })
            trackEvent({
              action: "form_submit",
              category: "contact_form",
              label: "success",
              value: 1,
            })
            const redirectPath = locale === "en" ? "/en/contact/bedankt" : "/contact/bedankt"
            const redirectParams = new URLSearchParams()
            if (materialParam) {
              redirectParams.set("material", materialParam)
            }
            const redirectHref = redirectParams.toString()
              ? `${redirectPath}?${redirectParams.toString()}`
              : redirectPath
            router.push(redirectHref)
            return
          }

          const endpointError =
            result?.error ||
            (!res.ok ? `HTTP ${res.status}` : copy.errorUnexpected || copy.errorUnknown)
          lastError = endpointError
        } catch (err) {
          lastError = err instanceof Error ? err.message : copy.errorNetwork
        }
      }

      setServerError(lastError || copy.errorGeneric)
      setStatus("error")
    } catch {
      setStatus("error")
    }
  }

  const materialOptions = [
    ...Object.values(MATERIALS).map((m) => m.name),
    copy.unknownMaterial,
  ]

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      {/* Contactgegevens (basic) */}
      <section className={groupCls} aria-labelledby="contact-legend">
        <h3 id="contact-legend" className={headingCls}>{copy.contactHeading}</h3>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className={row}>
            <label className={labelCls} htmlFor="name">{copy.nameLabel}</label>
            <input
              id="name"
              className={inputBase}
              placeholder={copy.namePlaceholder}
              value={data.name}
              onChange={e => update("name", e.target.value)}
              required
            />
          </div>

          <div className={row}>
            <label className={labelCls} htmlFor="email">{copy.emailLabel}</label>
            <input
              id="email"
              type="email"
              className={`${inputBase} ${data.email && !emailValid ? "border-red-400 ring-4 ring-red-400/10" : ""}`}
              placeholder={copy.emailPlaceholder}
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
        <h3 id="project-legend" className={headingCls}>{copy.projectHeading}</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className={row}>
            <label className={labelCls} htmlFor="quantity">{copy.quantityLabel}</label>
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
            <label className={labelCls} htmlFor="material">{copy.materialLabel}</label>
            <input
              id="material"
              className={inputBase}
              list="materials"
              placeholder={copy.materialPlaceholder}
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
            {copy.estimateHeading}
          </h3>
          <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
            {copy.estimateHelp}
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
        <h3 id="message-legend" className={headingCls}>{copy.descriptionHeading}</h3>
        <div className="mt-3 grid gap-2">
          <label className="sr-only" htmlFor="message">{copy.descriptionHeading}</label>
          <textarea
            id="message"
            className={`${inputBase} min-h-[160px]`}
            placeholder={copy.descriptionPlaceholder}
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
          className="rounded-xl border border-slate-300 bg-white/90 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-white disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
        >
          {status === "loading" ? copy.submitting : copy.submit}
        </button>
        {status === "ok" && (
          <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">{copy.success}</span>
        )}
        {status === "error" && (
          <span className="text-sm font-medium text-red-600 dark:text-red-400">
            {serverError || copy.errorGeneric}
          </span>
        )}
      </div>
    </form>
  )
}
