"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import ShimmerButton from "@/components/ShimmerButton"
import { localizeHref } from "@/lib/i18n/paths"
import type { Locale } from "@/lib/i18n/locales"
import { MATERIALS, MATERIAL_KEY_BY_SLUG, materialSlug } from "@/lib/materials"

const LEAD_FIRST_NAME_KEY = "x3dprints_lead_first_name"
const LEAD_MATERIAL_NAME_KEY = "x3dprints_lead_material_name"
const LEAD_CONTEXT_NAME_KEY = "x3dprints_lead_context_name"

type ContactThankYouPanelProps = {
  locale: Locale
}

const COPY = {
  nl: {
    title: (firstName: string) =>
      firstName ? `Bedankt, ${firstName}. Je aanvraag is goed ontvangen.` : "Bedankt. Je aanvraag is goed ontvangen.",
    lead: "Je krijgt meestal binnen 24 uur een antwoord met prijs en timing.",
    materialSelected: (materialName: string) =>
      `We nemen ${materialName} mee als startpunt voor je voorstel.`,
    materialMissing:
      "Geen materiaal gekozen? Geen probleem. We adviseren een geschikt materiaal op basis van je toepassing.",
    contextSelected: (contextName: string) =>
      `We nemen ${contextName} mee in je aanvraag en koppelen daar snel op terug.`,
    primaryCta: "Nieuwe aanvraag starten",
    pricingCta: "Bekijk prijzen",
    materialsCta: "Materialen vergelijken",
    materialDetailCta: "Bekijk dit materiaal",
  },
  en: {
    title: (firstName: string) =>
      firstName ? `Thank you, ${firstName}. Your request was received.` : "Thank you. Your request was received.",
    lead: "You will usually get a reply within 24 hours with pricing and lead time.",
    materialSelected: (materialName: string) =>
      `We will use ${materialName} as the starting point for your proposal.`,
    materialMissing:
      "No material selected? No problem. We will advise the best material based on your use case.",
    contextSelected: (contextName: string) =>
      `We will include ${contextName} in your request and follow up quickly.`,
    primaryCta: "Start a new request",
    pricingCta: "View pricing",
    materialsCta: "Compare materials",
    materialDetailCta: "Open this material",
  },
} as const

function decodeValue(raw: string) {
  try {
    return decodeURIComponent(raw)
  } catch {
    return raw
  }
}

function getMaterialFromQuery(raw: string | null) {
  if (!raw) return ""
  const decoded = decodeValue(raw).trim()
  if (!decoded) return ""
  const slug = materialSlug(decoded)
  const key = MATERIAL_KEY_BY_SLUG[slug]
  return key ? MATERIALS[key].name : ""
}

export default function ContactThankYouPanel({ locale }: ContactThankYouPanelProps) {
  const searchParams = useSearchParams()
  const copy = locale === "en" ? COPY.en : COPY.nl
  const localize = (href: string) => localizeHref(href, locale)

  const materialFromQuery = useMemo(
    () => getMaterialFromQuery(searchParams.get("material")),
    [searchParams],
  )

  const [firstName, setFirstName] = useState("")
  const [storedMaterialName, setStoredMaterialName] = useState("")
  const [storedContextName, setStoredContextName] = useState("")

  useEffect(() => {
    try {
      const nextFirstName = sessionStorage.getItem(LEAD_FIRST_NAME_KEY) || ""
      const nextStoredMaterial = sessionStorage.getItem(LEAD_MATERIAL_NAME_KEY) || ""
      const nextStoredContext = sessionStorage.getItem(LEAD_CONTEXT_NAME_KEY) || ""
      setFirstName(nextFirstName.trim().split(/\s+/)[0]?.slice(0, 40) || "")
      setStoredMaterialName(nextStoredMaterial.trim())
      setStoredContextName(nextStoredContext.trim())
    } catch {
      setFirstName("")
      setStoredMaterialName("")
      setStoredContextName("")
    }
  }, [])

  const materialName = materialFromQuery || storedMaterialName
  const materialDetailSlug = useMemo(() => {
    if (!materialName) return ""
    const slug = materialSlug(materialName)
    return MATERIAL_KEY_BY_SLUG[slug] ? slug : ""
  }, [materialName])

  return (
    <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm dark:border-slate-700/70 dark:bg-slate-950/75 sm:p-8">
      <h1 className="text-balance text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
        {copy.title(firstName)}
      </h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">{copy.lead}</p>
      <p className="mt-2 text-slate-600 dark:text-slate-300">
        {materialName
          ? copy.materialSelected(materialName)
          : storedContextName
            ? copy.contextSelected(storedContextName)
            : copy.materialMissing}
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <ShimmerButton href={localize("/contact")}>{copy.primaryCta}</ShimmerButton>
        {materialDetailSlug ? (
          <Link
            href={localize(`/materials/${materialDetailSlug}`)}
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
          >
            {copy.materialDetailCta}
          </Link>
        ) : (
          <Link
            href={localize("/materials#material-suggestion-tool")}
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
          >
            {copy.materialsCta}
          </Link>
        )}
        <Link
          href={localize("/pricing")}
          className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
        >
          {copy.pricingCta}
        </Link>
      </div>
    </div>
  )
}
