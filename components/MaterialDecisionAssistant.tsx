"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import ShimmerButton from "@/components/ShimmerButton"
import { type Locale } from "@/lib/i18n/locales"
import { localizeHref } from "@/lib/i18n/paths"

type UseCase = "visual" | "functional" | "flexible"
type Environment = "indoor" | "outdoor"
type Priority = "budget" | "balanced" | "premium"

type MaterialInfo = {
  slug: string
  nameNl: string
  nameEn: string
  reasonNl: string
  reasonEn: string
}

const MATERIALS: Record<string, MaterialInfo> = {
  "pla-matte": {
    slug: "pla-matte",
    nameNl: "PLA Matte",
    nameEn: "PLA Matte",
    reasonNl: "Sterke allround keuze voor prototypes en nette visuele afwerking.",
    reasonEn: "Strong all-round option for prototypes and clean visual finish.",
  },
  "pla-tough": {
    slug: "pla-tough",
    nameNl: "PLA Tough+",
    nameEn: "PLA Tough+",
    reasonNl: "Meer impactweerstand voor functionele onderdelen binnenshuis.",
    reasonEn: "More impact resistance for indoor functional parts.",
  },
  petg: {
    slug: "petg",
    nameNl: "PETG",
    nameEn: "PETG",
    reasonNl: "Betere keuze voor buitengebruik, warmte en dagelijks gebruik.",
    reasonEn: "Better choice for outdoor use, heat and daily handling.",
  },
  tpu: {
    slug: "tpu",
    nameNl: "TPU",
    nameEn: "TPU",
    reasonNl: "Flexibel en schokdempend voor grips, bumpers en bescherming.",
    reasonEn: "Flexible and shock absorbing for grips, bumpers and protection.",
  },
  "pla-silk": {
    slug: "pla-silk",
    nameNl: "PLA Silk+",
    nameEn: "PLA Silk+",
    reasonNl: "Premium look met hoge glans voor zichtwerk en displaystukken.",
    reasonEn: "Premium high-gloss look for display parts and visual props.",
  },
  "pla-marble": {
    slug: "pla-marble",
    nameNl: "PLA Marble",
    nameEn: "PLA Marble",
    reasonNl: "Subtiele textuur voor een premium en rustige visuele uitstraling.",
    reasonEn: "Subtle texture for a premium and calm visual appearance.",
  },
  "pla-basic": {
    slug: "pla-basic",
    nameNl: "PLA Basic",
    nameEn: "PLA Basic",
    reasonNl: "Budgetvriendelijke instap voor eenvoudige onderdelen en mockups.",
    reasonEn: "Budget-friendly start for simple parts and mockups.",
  },
  pc: {
    slug: "pc",
    nameNl: "PC",
    nameEn: "PC",
    reasonNl: "Technische optie voor hogere hitte en veeleisendere toepassingen.",
    reasonEn: "Technical option for higher heat and more demanding applications.",
  },
}

function chooseMaterials(useCase: UseCase, environment: Environment, priority: Priority) {
  if (useCase === "flexible") {
    return environment === "outdoor"
      ? ["tpu", "petg", "pc"]
      : ["tpu", "petg", "pla-tough"]
  }

  if (environment === "outdoor") {
    if (priority === "premium") return ["pc", "petg", "tpu"]
    if (priority === "budget") return ["petg", "pla-tough", "pc"]
    return ["petg", "pc", "pla-tough"]
  }

  if (useCase === "visual") {
    if (priority === "premium") return ["pla-silk", "pla-marble", "pla-matte"]
    if (priority === "budget") return ["pla-basic", "pla-matte", "pla-tough"]
    return ["pla-matte", "pla-silk", "pla-marble"]
  }

  if (priority === "budget") return ["pla-tough", "pla-matte", "petg"]
  if (priority === "premium") return ["petg", "pc", "pla-tough"]
  return ["petg", "pla-tough", "pla-matte"]
}

function optionClass(active: boolean) {
  return active
    ? "border-indigo-400 bg-indigo-50 text-indigo-700 dark:border-indigo-300/40 dark:bg-indigo-400/10 dark:text-indigo-200"
    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800"
}

export default function MaterialDecisionAssistant({ locale }: { locale: Locale }) {
  const isEn = locale === "en"
  const localize = (href: string) => localizeHref(href, locale)

  const [useCase, setUseCase] = useState<UseCase | null>(null)
  const [environment, setEnvironment] = useState<Environment | null>(null)
  const [priority, setPriority] = useState<Priority | null>(null)

  const selected = useCase && environment && priority
  const recommendations = useMemo(() => {
    if (!selected) return []
    return chooseMaterials(useCase, environment, priority)
      .map((slug) => MATERIALS[slug])
      .filter(Boolean)
  }, [selected, useCase, environment, priority])

  const topMaterial = recommendations[0]
  const quoteText = isEn ? "Material advice for my 3D print project" : "Materiaaladvies voor mijn 3D-printproject"
  const quoteHref = topMaterial
    ? localize(`/contact?material=${topMaterial.slug}&quote=${encodeURIComponent(quoteText)}`)
    : localize("/contact?quote=Materiaaladvies")

  return (
    <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-lg backdrop-blur dark:border-slate-700/70 dark:bg-slate-950/75 sm:p-7">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
        {isEn ? "Quick chooser" : "Snelle keuzehulp"}
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-slate-50">
        {isEn ? "Start with 3 quick answers" : "Start met 3 snelle antwoorden"}
      </h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        {isEn
          ? "Pick use case, environment and priority. We instantly suggest the best material route."
          : "Kies use-case, omgeving en prioriteit. Je krijgt direct de beste materiaalroute."}
      </p>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            {isEn ? "Step 1 - Use case" : "Stap 1 - Use-case"}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {([
              { value: "visual", nl: "Visueel", en: "Visual" },
              { value: "functional", nl: "Functioneel", en: "Functional" },
              { value: "flexible", nl: "Flexibel", en: "Flexible" },
            ] as const).map((item) => (
              <button
                key={item.value}
                type="button"
                aria-pressed={useCase === item.value}
                onClick={() => setUseCase(item.value)}
                className={`rounded-full border px-3 py-1.5 text-sm font-semibold transition ${optionClass(useCase === item.value)}`}
              >
                {isEn ? item.en : item.nl}
              </button>
            ))}
          </div>
        </div>

        <div className={`transition ${useCase ? "opacity-100" : "opacity-45"}`}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            {isEn ? "Step 2 - Environment" : "Stap 2 - Omgeving"}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {([
              { value: "indoor", nl: "Binnen", en: "Indoor" },
              { value: "outdoor", nl: "Buiten", en: "Outdoor" },
            ] as const).map((item) => (
              <button
                key={item.value}
                type="button"
                aria-pressed={environment === item.value}
                onClick={() => setEnvironment(item.value)}
                disabled={!useCase}
                className={`rounded-full border px-3 py-1.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${optionClass(environment === item.value)}`}
              >
                {isEn ? item.en : item.nl}
              </button>
            ))}
          </div>
        </div>

        <div className={`transition ${environment ? "opacity-100" : "opacity-45"}`}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            {isEn ? "Step 3 - Priority" : "Stap 3 - Prioriteit"}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {([
              { value: "budget", nl: "Budget", en: "Budget" },
              { value: "balanced", nl: "Balans", en: "Balanced" },
              { value: "premium", nl: "Premium look", en: "Premium look" },
            ] as const).map((item) => (
              <button
                key={item.value}
                type="button"
                aria-pressed={priority === item.value}
                onClick={() => setPriority(item.value)}
                disabled={!environment}
                className={`rounded-full border px-3 py-1.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${optionClass(priority === item.value)}`}
              >
                {isEn ? item.en : item.nl}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={`mt-6 rounded-2xl border border-slate-200/70 bg-slate-50/80 p-4 transition dark:border-slate-700/70 dark:bg-slate-900/70 ${selected ? "opacity-100" : "opacity-70"}`}>
        {selected ? (
          <>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">
              {isEn ? "Recommended route" : "Aanbevolen route"}
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {recommendations.map((item, index) => (
                <div key={item.slug} className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-950/80">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                    {index === 0 ? (isEn ? "Best match" : "Beste match") : isEn ? "Alternative" : "Alternatief"}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-50">{isEn ? item.nameEn : item.nameNl}</p>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">{isEn ? item.reasonEn : item.reasonNl}</p>
                  <Link
                    href={localize(`/materials/${item.slug}`)}
                    className="mt-2 inline-flex text-xs font-semibold text-indigo-600 transition hover:text-indigo-500 dark:text-indigo-300 dark:hover:text-indigo-200"
                  >
                    {isEn ? "Open material page" : "Open materiaalfiche"}
                  </Link>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <ShimmerButton
                href={quoteHref}
                event={{ action: "cta_click", category: "materials_quick_chooser", label: topMaterial?.slug ?? "none" }}
              >
                {isEn ? "Request quote for this route" : "Vraag offerte voor deze route"}
              </ShimmerButton>
              <Link
                href="#material-suggestion-tool"
                className="inline-flex items-center rounded-xl border border-slate-200/80 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
              >
                {isEn ? "Need deeper guidance?" : "Toch meer detail nodig?"}
              </Link>
            </div>
          </>
        ) : (
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {isEn
              ? "Select all 3 steps to unlock your recommended materials and direct quote CTA."
              : "Doorloop de 3 stappen om je aanbevolen materialen en directe offerte-CTA te zien."}
          </p>
        )}
      </div>
    </div>
  )
}
