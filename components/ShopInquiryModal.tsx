"use client"

import { useEffect, useId, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { SITE } from "@/lib/seo"
import { cn } from "@/lib/utils"
import type { ShopProduct } from "@/content/shop-products"

type ShopLocale = "nl" | "en"
type TriggerVariant = "solid" | "text"
type FulfilmentOption = "shipping" | "pickup" | "undecided"

type ShopInquiryModalProps = {
  product: ShopProduct
  locale: ShopLocale
  quantity?: number
  className?: string
  variant?: TriggerVariant
  label: string
}

type FormShape = {
  name: string
  email: string
  quantity: string
  fulfilment: FulfilmentOption
  note: string
  hp: string
}

const LEAD_FIRST_NAME_KEY = "x3dprints_lead_first_name"
const LEAD_MATERIAL_NAME_KEY = "x3dprints_lead_material_name"
const LEAD_CONTEXT_NAME_KEY = "x3dprints_lead_context_name"

const COPY = {
  nl: {
    title: "Shopofferte aanvragen",
    intro: "Vul kort je gegevens in. Deze aanvraag wordt via dezelfde offerteflow verwerkt als je gewone contactformulier.",
    summaryTitle: "Je vraagt dit product aan",
    priceLabel: "Prijs",
    stockLabel: "Voorraad",
    quantityLabel: "Aantal",
    nameLabel: "Naam*",
    namePlaceholder: "Voornaam Naam",
    emailLabel: "E-mail*",
    emailPlaceholder: "jij@voorbeeld.be",
    fulfilmentLabel: "Levering of afhalen",
    fulfilmentOptions: {
      shipping: "Verzending in Belgie",
      pickup: "Afhalen in Herzele",
      undecided: "Nog te bepalen",
    },
    noteLabel: "Extra info",
    notePlaceholder: "Bijvoorbeeld gewenste timing, facturatie-info of extra vraag.",
    shippingTitle: "Levering en afhalen",
    shippingBody:
      "Levering in Belgie: EUR 7.50 tot 3 kg. Afhalen op afspraak in Herzele blijft mogelijk. We bevestigen eerst aantal en praktische details per mail.",
    stockHint: (count: number) => `Huidige voorraad volgens de shop: ${count} stuks.`,
    close: "Sluiten",
    submit: "Verstuur shopaanvraag",
    submitting: "Versturen...",
    success: "Verzonden. Bedankt!",
    errorGeneric: "Er ging iets mis. Probeer opnieuw.",
    errorUnexpected: "Onverwacht serverantwoord.",
    errorUnknown: "Onbekende fout.",
    errorNetwork: "Netwerkfout",
    quantitySummary: "Gewenst aantal",
    fulfilmentSummary: "Voorkeur levering",
    noteSummary: "Extra info",
    noteFallback: "Geen extra info meegegeven.",
    productPageSummary: "Productpagina",
    quotePrefix: "Shop offerteaanvraag",
    stockUnavailable: "Niet beschikbaar",
  },
  en: {
    title: "Request a shop quote",
    intro: "Add your details and we process this through the same quote flow as the standard contact form.",
    summaryTitle: "You are requesting this product",
    priceLabel: "Price",
    stockLabel: "Stock",
    quantityLabel: "Quantity",
    nameLabel: "Name*",
    namePlaceholder: "First name Last name",
    emailLabel: "Email*",
    emailPlaceholder: "you@example.com",
    fulfilmentLabel: "Delivery or pickup",
    fulfilmentOptions: {
      shipping: "Shipping in Belgium",
      pickup: "Pickup in Herzele",
      undecided: "Still deciding",
    },
    noteLabel: "Extra info",
    notePlaceholder: "For example preferred timing, invoicing info, or an extra question.",
    shippingTitle: "Delivery and pickup",
    shippingBody:
      "Delivery in Belgium: EUR 7.50 up to 3 kg. Pickup by appointment in Herzele remains possible. We first confirm quantity and practical details by email.",
    stockHint: (count: number) => `Current stock shown in the shop: ${count} units.`,
    close: "Close",
    submit: "Send shop request",
    submitting: "Sending...",
    success: "Sent. Thank you!",
    errorGeneric: "Something went wrong. Please try again.",
    errorUnexpected: "Unexpected server response.",
    errorUnknown: "Unknown error.",
    errorNetwork: "Network error",
    quantitySummary: "Requested quantity",
    fulfilmentSummary: "Preferred fulfilment",
    noteSummary: "Extra info",
    noteFallback: "No extra info provided.",
    productPageSummary: "Product page",
    quotePrefix: "Shop quote request",
    stockUnavailable: "Unavailable",
  },
} as const

function formatEur(value: number) {
  return `EUR ${value.toFixed(2)}`
}

function clampQuantity(value: number | string | undefined, maxQuantity: number) {
  const parsed = typeof value === "number" ? value : Number(value)
  if (!Number.isFinite(parsed) || parsed <= 0) return 1
  return Math.min(Math.max(Math.round(parsed), 1), maxQuantity)
}

function isValidEmail(value: string) {
  return /\S+@\S+\.\S+/.test(value)
}

export default function ShopInquiryModal({
  product,
  locale,
  quantity,
  className,
  variant = "solid",
  label,
}: ShopInquiryModalProps) {
  const router = useRouter()
  const reduceMotion = useReducedMotion()
  const titleId = useId()
  const firstInputRef = useRef<HTMLInputElement | null>(null)
  const isEn = locale === "en"
  const copy = isEn ? COPY.en : COPY.nl
  const productName = isEn ? product.name.en : product.name.nl
  const basePath = isEn ? "/en" : ""
  const productUrl = `${SITE.url}${basePath}/shop/${product.slug}/`
  const maxQuantity = Number.isFinite(product.stockCount) && (product.stockCount ?? 0) > 0
    ? Math.min(Math.max(Math.round(product.stockCount ?? 1), 1), 99)
    : 99
  const initialQuantity = clampQuantity(quantity, maxQuantity)
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle")
  const [serverError, setServerError] = useState("")
  const [data, setData] = useState<FormShape>({
    name: "",
    email: "",
    quantity: String(initialQuantity),
    fulfilment: "shipping",
    note: "",
    hp: "",
  })

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  const emailValid = useMemo(() => isValidEmail(data.email), [data.email])
  const resolvedQuantity = useMemo(
    () => clampQuantity(data.quantity, maxQuantity),
    [data.quantity, maxQuantity],
  )
  const fulfilmentLabel = copy.fulfilmentOptions[data.fulfilment]
  const quoteSummary = isEn
    ? `${copy.quotePrefix}: ${productName} (${resolvedQuantity}x, ${formatEur(product.priceEur)} per item excl. shipping)`
    : `${copy.quotePrefix}: ${productName} (${resolvedQuantity}x, ${formatEur(product.priceEur)} per stuk excl. verzending)`

  function update<K extends keyof FormShape>(key: K, value: FormShape[K]) {
    setData((prev) => ({ ...prev, [key]: value }))
  }

  function openModal() {
    setStatus("idle")
    setServerError("")
    setData({
      name: "",
      email: "",
      quantity: String(clampQuantity(quantity, maxQuantity)),
      fulfilment: "shipping",
      note: "",
      hp: "",
    })
    setIsOpen(true)
  }

  function closeModal() {
    if (status === "loading") return
    setIsOpen(false)
  }

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    const previousPaddingRight = document.body.style.paddingRight
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = "hidden"
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        if (status !== "loading") {
          setIsOpen(false)
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    window.setTimeout(() => firstInputRef.current?.focus(), 40)

    return () => {
      document.body.style.overflow = previousOverflow
      document.body.style.paddingRight = previousPaddingRight
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, status])

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (data.hp) return
    if (!data.name.trim() || !emailValid) return

    const messageLines = [
      `${copy.quantitySummary}: ${resolvedQuantity}`,
      `${copy.fulfilmentSummary}: ${fulfilmentLabel}`,
      `${copy.productPageSummary}: ${productUrl}`,
      `${copy.noteSummary}: ${data.note.trim() || copy.noteFallback}`,
    ]

    try {
      setStatus("loading")
      setServerError("")

      const form = new FormData()
      form.append("name", data.name.trim())
      form.append("email", data.email.trim())
      form.append("message", messageLines.join("\n"))
      form.append("quantity", String(resolvedQuantity))
      form.append("material", "")
      form.append("quote", quoteSummary)
      form.append("requestContext", productName)
      form.append("source", "shop")
      form.append("hp", data.hp || "")
      form.append("website", data.hp || "")

      const endpoints = ["/api/contact", "/contact.php"]
      let lastError = ""

      for (const endpoint of endpoints) {
        try {
          const response = await fetch(endpoint, { method: "POST", body: form })
          const raw = await response.text()
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
            try {
              if (firstName) {
                sessionStorage.setItem(LEAD_FIRST_NAME_KEY, firstName)
              } else {
                sessionStorage.removeItem(LEAD_FIRST_NAME_KEY)
              }
              sessionStorage.removeItem(LEAD_MATERIAL_NAME_KEY)
              sessionStorage.setItem(LEAD_CONTEXT_NAME_KEY, productName)
            } catch {
              // Ignore storage errors in strict/privacy browser modes.
            }

            setStatus("ok")
            setIsOpen(false)
            router.push(isEn ? "/en/contact/bedankt?source=shop" : "/contact/bedankt?source=shop")
            return
          }

          const endpointError =
            result?.error || (!response.ok ? `HTTP ${response.status}` : copy.errorUnexpected)
          lastError = endpointError
        } catch (error) {
          lastError = error instanceof Error ? error.message : copy.errorNetwork
        }
      }

      setServerError(lastError || copy.errorGeneric)
      setStatus("error")
    } catch {
      setStatus("error")
      setServerError(copy.errorGeneric)
    }
  }

  const triggerClasses =
    variant === "text"
      ? cn(
          "inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-500",
          className,
        )
      : cn(
          "inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-[box-shadow,filter]",
          "bg-[linear-gradient(90deg,#0f766e,45%,#22c55e)] shadow-[0_10px_30px_rgba(15,118,110,.24)] hover:shadow-[0_12px_40px_rgba(15,118,110,.36)] hover:brightness-105",
          className,
        )

  return (
    <>
      <button type="button" onClick={openModal} className={cn(triggerClasses, "min-w-0 text-center")}>
        {label}
        <span className="i-lucide-arrow-right" aria-hidden />
      </button>

      {isMounted
        ? createPortal(
            <AnimatePresence>
              {isOpen ? (
                <motion.div
                  className="fixed inset-0 z-[220] overflow-y-auto px-4 py-6 sm:px-6 md:px-8"
                  initial={reduceMotion ? undefined : { opacity: 0 }}
                  animate={reduceMotion ? undefined : { opacity: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0 }}
                >
                  <button
                    type="button"
                    aria-label={copy.close}
                    className="absolute inset-0 bg-slate-950/55 backdrop-blur-sm"
                    onClick={closeModal}
                  />
                  <motion.div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={titleId}
                    initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
                    animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="relative z-10 mx-auto w-full max-w-5xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white/95 p-5 shadow-[0_32px_120px_rgba(15,23,42,0.35)] sm:p-7 xl:p-8"
                  >
                    <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-indigo-200/40 blur-3xl" />
                    <div aria-hidden className="pointer-events-none absolute -bottom-20 left-8 h-48 w-48 rounded-full bg-cyan-200/35 blur-3xl" />

                    <div className="relative">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">Shop</p>
                          <h2 id={titleId} className="mt-2 break-words text-balance text-2xl font-extrabold text-slate-900 sm:text-3xl xl:text-[2rem]">
                            {copy.title}
                          </h2>
                          <p className="mt-3 max-w-3xl break-words text-sm text-slate-600">{copy.intro}</p>
                        </div>
                        <button
                          type="button"
                          onClick={closeModal}
                          className="inline-flex h-10 w-10 shrink-0 items-center justify-center self-end rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:text-slate-900 sm:self-auto"
                          aria-label={copy.close}
                        >
                          <span className="i-lucide-x text-lg" aria-hidden />
                        </button>
                      </div>

                      <div className="mt-6 grid gap-6 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] xl:gap-8">
                        <div className="min-w-0 rounded-2xl border border-slate-200 bg-white/80 p-5 sm:p-6">
                          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">{copy.summaryTitle}</p>
                          <h3 className="mt-3 break-words text-xl font-semibold text-slate-900">{productName}</h3>
                          <div className="mt-4 flex min-w-0 flex-wrap gap-2 text-xs font-semibold">
                            <span className="inline-flex max-w-full items-center rounded-2xl border border-slate-200 bg-slate-50 px-3 py-1 text-left leading-4 text-slate-700 break-words sm:rounded-full">
                              {copy.priceLabel}: {formatEur(product.priceEur)}
                            </span>
                            <span className="inline-flex max-w-full items-center rounded-2xl border border-teal-200 bg-teal-50 px-3 py-1 text-left leading-4 text-teal-700 break-words sm:rounded-full">
                              {copy.stockLabel}: {Number.isFinite(product.stockCount) ? product.stockCount : copy.stockUnavailable}
                            </span>
                          </div>
                          <p className="mt-4 break-words text-sm text-slate-600">{copy.shippingBody}</p>
                          {Number.isFinite(product.stockCount) ? (
                            <p className="mt-3 break-words text-xs font-medium text-slate-500">{copy.stockHint(product.stockCount ?? 0)}</p>
                          ) : null}
                        </div>

                        <form onSubmit={onSubmit} className="grid min-w-0 gap-4 rounded-2xl border border-slate-200 bg-white/80 p-5 sm:p-6">
                          <div className="grid gap-2">
                            <label className="text-xs font-semibold text-slate-700" htmlFor={`${titleId}-name`}>
                              {copy.nameLabel}
                            </label>
                            <input
                              ref={firstInputRef}
                              id={`${titleId}-name`}
                              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
                              placeholder={copy.namePlaceholder}
                              value={data.name}
                              onChange={(event) => update("name", event.target.value)}
                              required
                            />
                          </div>

                          <div className="grid gap-2 sm:grid-cols-2 sm:items-start">
                            <div className="grid gap-2">
                              <label className="text-xs font-semibold text-slate-700" htmlFor={`${titleId}-email`}>
                                {copy.emailLabel}
                              </label>
                              <input
                                id={`${titleId}-email`}
                                type="email"
                                className={cn(
                                  "w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10",
                                  data.email && !emailValid ? "border-red-400 ring-4 ring-red-400/10" : "",
                                )}
                                placeholder={copy.emailPlaceholder}
                                value={data.email}
                                onChange={(event) => update("email", event.target.value)}
                                required
                                aria-invalid={Boolean(data.email && !emailValid)}
                              />
                            </div>

                            <div className="grid gap-2">
                              <label className="text-xs font-semibold text-slate-700" htmlFor={`${titleId}-quantity`}>
                                {copy.quantityLabel}
                              </label>
                              <input
                                id={`${titleId}-quantity`}
                                type="number"
                                min={1}
                                max={maxQuantity}
                                inputMode="numeric"
                                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm font-semibold text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
                                value={resolvedQuantity}
                                onChange={(event) => update("quantity", String(clampQuantity(event.target.value, maxQuantity)))}
                              />
                            </div>
                          </div>

                          <div className="grid gap-2">
                            <label className="text-xs font-semibold text-slate-700" htmlFor={`${titleId}-fulfilment`}>
                              {copy.fulfilmentLabel}
                            </label>
                            <select
                              id={`${titleId}-fulfilment`}
                              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
                              value={data.fulfilment}
                              onChange={(event) => update("fulfilment", event.target.value as FulfilmentOption)}
                            >
                              <option value="shipping">{copy.fulfilmentOptions.shipping}</option>
                              <option value="pickup">{copy.fulfilmentOptions.pickup}</option>
                              <option value="undecided">{copy.fulfilmentOptions.undecided}</option>
                            </select>
                          </div>

                          <div className="grid gap-2">
                            <label className="text-xs font-semibold text-slate-700" htmlFor={`${titleId}-note`}>
                              {copy.noteLabel}
                            </label>
                            <textarea
                              id={`${titleId}-note`}
                              className="min-h-[148px] w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
                              placeholder={copy.notePlaceholder}
                              value={data.note}
                              onChange={(event) => update("note", event.target.value)}
                            />
                          </div>

                          <input
                            tabIndex={-1}
                            autoComplete="off"
                            aria-hidden="true"
                            className="hidden"
                            name="website"
                            value={data.hp}
                            onChange={(event) => update("hp", event.target.value)}
                          />

                          <div className="flex flex-col gap-2 pt-1 sm:flex-row sm:flex-wrap sm:items-center">
                            <button
                              type="submit"
                              disabled={status === "loading" || !emailValid}
                              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[linear-gradient(90deg,#0f766e,45%,#22c55e)] px-5 py-3 text-center text-sm font-semibold text-white shadow-[0_10px_30px_rgba(15,118,110,.24)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                            >
                              {status === "loading" ? copy.submitting : copy.submit}
                              <span className="i-lucide-arrow-right" aria-hidden />
                            </button>
                            <button
                              type="button"
                              onClick={closeModal}
                              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 sm:w-auto"
                            >
                              {copy.close}
                            </button>
                          </div>

                          {status === "error" ? (
                            <p className="text-sm font-medium text-red-600">{serverError || copy.errorGeneric}</p>
                          ) : null}
                        </form>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </>
  )
}
