"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import { cn } from "@/lib/utils"
import { MATERIAL_SUGGESTION_DATA, type MaterialSuggestionRecord } from "@/content/material-suggestions"
import { MATERIAL_SLUGS, type MaterialKey } from "@/lib/materials"
import { useLocale } from "./LocaleProvider"
import type { Locale } from "@/lib/i18n/locales"
import { localizeHref } from "@/lib/i18n/paths"

type LocationAnswer = "indoor" | "outdoorSeasonal" | "outdoorPermanent"
type FunctionalityAnswer = "decor" | "lightFunctional" | "strongFunctional" | "flex"
type LookAnswer =
  | "matte"
  | "silk"
  | "natural"
  | "stone"
  | "metallic"
  | "sparkle"
  | "translucent"
  | "glow"
  | "gradient"
  | "noPreference"
type BudgetAnswer = "budget" | "standard" | "premium"
type SizeAnswer = "small" | "medium" | "large"

type Answers = {
  location: LocationAnswer | ""
  functionality: FunctionalityAnswer | ""
  look: LookAnswer | ""
  budget: BudgetAnswer | ""
  size: SizeAnswer | ""
}

type SolidAnswers = {
  location: LocationAnswer
  functionality: FunctionalityAnswer
  look: LookAnswer
  budget: BudgetAnswer
  size: SizeAnswer
}

type Option = { value: string; label: string; helper?: string }

type StepConfig = {
  id: keyof Answers
  title: string
  description: string
  options: Option[]
}


type RecommendationCard = {
  label: string
  record: MaterialSuggestionRecord
  slug: string
  priceNote: string
  reasons: string[]
}

const LOOK_PRIORITY: Partial<Record<LookAnswer, MaterialKey[]>> = {
  natural: ["PLA_WOOD"],
  metallic: ["PLA_METAL"],
  glow: ["PLA_GLOW"],
  gradient: ["PLA_BASIC_GRADIENT", "PLA_SILK_MULTI_COLOR"],
  silk: ["PLA_SILK_PLUS"],
}

const PERMANENT_OUTDOOR_KEYS = new Set<MaterialKey>(["PETG", "PLA_CF", "PC", "TPU"])

type LocalizedCopy = {
  steps: StepConfig[]
  locationCopy: Record<LocationAnswer, string>
  functionalityCopy: Record<Exclude<FunctionalityAnswer, "flex">, string>
  budgetCopy: Record<BudgetAnswer, string>
  priceBase: Record<MaterialSuggestionRecord["economics"]["priceLevel"], string>
  envSuitability: {
    excellent: (loc: string) => string
    good: (loc: string) => string
    caution: (loc: string) => string
  }
  flexReason: string
  strengthLabels: { high: string; medium: string; low: string }
  impactLabels: { high: string; medium: string; low: string }
  functionTemplate: (strength: string, impact: string, descriptor: string) => string
  matchLook: (label: string) => string
  bestForPrefix: string
  petgReasons: string[]
  labels: {
    recommended: string
    budgetAlternative: string
    premiumAlternative: string
    alternative: string
    priceImpact: string
    colors: string
    quoteCta: string
    viewMaterial: string
    stepOf: (current: number, total: number) => string
    reset: string
    flowTag: string
    prev: string
    adjustHint: string
    emptyState: string
  }
  howTo: { name: string; description: string }
}

function isComplete(answers: Answers): answers is SolidAnswers {
  return Object.values(answers).every(Boolean)
}

function matchesLook(record: MaterialSuggestionRecord, look: LookAnswer): boolean {
  if (look === "noPreference") return true
  const special = record.flags.specialLook
  switch (look) {
    case "matte":
      return special === "mat" || special === "mat_technical" || record.name.toLowerCase().includes("matte")
    case "silk":
      return special === "silk" || special === "silk_gradient"
    case "natural":
      return special === "wood"
    case "stone":
      return special === "marble"
    case "metallic":
      return special === "metallic"
    case "sparkle":
      return special === "sparkle" || special === "galaxy"
    case "translucent":
      return special === "translucent"
    case "glow":
      return special === "glow"
    case "gradient":
      return special === "gradient" || special === "silk_gradient"
    default:
      return true
  }
}

function priceNote(
  level: MaterialSuggestionRecord["economics"]["priceLevel"],
  budget: BudgetAnswer,
  copy: LocalizedCopy,
): string {
  const base = copy.priceBase[level]
  const intent = copy.budgetCopy[budget]
  return `${base} ${intent}`
}

function strengthLabel(score: number, copy: LocalizedCopy): string {
  if (score >= 4) return copy.strengthLabels.high
  if (score >= 3) return copy.strengthLabels.medium
  return copy.strengthLabels.low
}

function impactLabel(score: number, copy: LocalizedCopy): string {
  if (score >= 4) return copy.impactLabels.high
  if (score >= 3) return copy.impactLabels.medium
  return copy.impactLabels.low
}

function buildReasons(record: MaterialSuggestionRecord, answers: SolidAnswers, copy: LocalizedCopy): string[] {
  const suitabilityKey =
    answers.location === "indoor"
      ? "indoor"
      : answers.location === "outdoorSeasonal"
        ? "outdoorSeasonal"
        : "outdoorPermanent"
  const envScore = record.environment.suitability[suitabilityKey]
  const location = copy.locationCopy[answers.location]
  const envReason =
    envScore >= 4
      ? copy.envSuitability.excellent(location)
      : envScore >= 3
        ? copy.envSuitability.good(location)
        : copy.envSuitability.caution(location)

  let functionReason: string
  if (answers.functionality === "flex") {
    functionReason = copy.flexReason
  } else {
    const descriptor = copy.functionalityCopy[answers.functionality]
    const strength = strengthLabel(record.mechanical.strength, copy)
    const impact = impactLabel(record.mechanical.impactResistance, copy)
    functionReason = copy.functionTemplate(strength, impact, descriptor)
  }

  const lookReason =
    answers.look === "noPreference"
      ? null
      : matchesLook(record, answers.look)
        ? copy.matchLook(copy.steps[2].options.find((o) => o.value === answers.look)?.label ?? "")
        : null

  const bestFor = `${copy.bestForPrefix} ${record.bestFor.slice(0, 3).join(", ")}.`
  return [envReason, functionReason, lookReason, bestFor].filter(Boolean) as string[]
}

function calculateScore(record: MaterialSuggestionRecord, answers: SolidAnswers): number {
  let score = 0

  // Location weighting
  const locationKey =
    answers.location === "indoor" ? "indoor" : answers.location === "outdoorSeasonal" ? "outdoorSeasonal" : "outdoorPermanent"
  score += record.environment.suitability[locationKey] * 4
  if (answers.location !== "indoor") {
    score += record.environment.uvResistance * 2
    score += record.environment.tempResistance * 2
  }

  // Functionality weighting
  switch (answers.functionality) {
    case "decor":
      score += (record.flags.specialLook ? 6 : 2) + (record.category.includes("Specialty") ? 3 : 0)
      break
    case "lightFunctional":
      score += record.mechanical.strength * 2 + record.mechanical.impactResistance * 1.5
      break
    case "strongFunctional":
      score += record.mechanical.strength * 3 + record.mechanical.impactResistance * 2 + record.environment.tempResistance * 1.5
      if (
        record.materialKey === "PETG" ||
        record.materialKey === "PC" ||
        record.materialKey === "PLA_CF" ||
        record.materialKey === "PLA_TOUGH_PLUS"
      ) {
        score += 4
      }
      break
    case "flex":
      if (record.materialKey === "TPU") score += 100
      break
  }

  // Look matching
  if (answers.look !== "noPreference") {
    score += matchesLook(record, answers.look) ? 6 : 0
  }

  // Budget preference
  if (answers.budget === "budget") {
    score += record.economics.priceLevel === "budget" ? 6 : record.economics.priceLevel === "premium" ? -2 : 0
  } else if (answers.budget === "premium") {
    score += record.economics.priceLevel === "premium" ? 6 : -1
  } else {
    score += record.economics.priceLevel === "medium" ? 3 : 0
  }

  // Size influence
  if (answers.size === "large") {
    const fragileLooks = new Set(["wood", "marble", "sparkle", "silk", "metallic", "galaxy", "glow", "gradient", "silk_gradient"])
    if (record.flags.specialLook && fragileLooks.has(record.flags.specialLook)) {
      score -= 3
    }
    if (
      record.materialKey === "PETG" ||
      record.materialKey === "PC" ||
      record.materialKey === "PLA_TOUGH_PLUS" ||
      record.materialKey === "PLA_CF"
    ) {
      score += 4
    }
  } else if (answers.size === "small") {
    if (record.flags.specialLook) score += 2
  }

  return score
}

function buildRecommendationCards(answers: Answers, copy: LocalizedCopy): RecommendationCard[] | null {
  if (!isComplete(answers)) return null
  const solidAnswers = answers

  // Flex hard rule
  if (solidAnswers.functionality === "flex") {
    const tpuRecord = MATERIAL_SUGGESTION_DATA.find((item) => item.materialKey === "TPU")
    const petgRecord = MATERIAL_SUGGESTION_DATA.find((item) => item.materialKey === "PETG")
    if (!tpuRecord) return null
    const cards: RecommendationCard[] = [
      {
        label: copy.labels.recommended,
        record: tpuRecord,
        slug: MATERIAL_SLUGS[tpuRecord.materialKey] || "tpu",
        priceNote: priceNote(tpuRecord.economics.priceLevel, solidAnswers.budget, copy),
        reasons: buildReasons(tpuRecord, solidAnswers, copy),
      },
    ]
    if (petgRecord) {
      cards.push({
        label: copy.labels.alternative,
        record: petgRecord,
        slug: MATERIAL_SLUGS[petgRecord.materialKey] || "petg",
        priceNote: priceNote(petgRecord.economics.priceLevel, solidAnswers.budget, copy),
        reasons: [...copy.petgReasons, `${copy.bestForPrefix} ${petgRecord.bestFor.slice(0, 3).join(", ")}`],
      })
    }
    return cards
  }

  let candidates = MATERIAL_SUGGESTION_DATA

  if (solidAnswers.location === "outdoorPermanent") {
    candidates = candidates.filter((item) => PERMANENT_OUTDOOR_KEYS.has(item.materialKey))
  }

  if (solidAnswers.look === "glow") {
    candidates = candidates.filter((item) => item.flags.specialLook === "glow" || item.materialKey === "PETG")
  }

  const forcedKeys = LOOK_PRIORITY[solidAnswers.look] ?? []

  const scored = candidates.map((record) => {
    let score = calculateScore(record, solidAnswers)
    const forcedIndex = forcedKeys.indexOf(record.materialKey)
    if (forcedIndex > -1) {
      score += 50 - forcedIndex * 5
    }
    return { record, score }
  })

  if (scored.length === 0) return null

  const sortedRecords = scored.sort((a, b) => b.score - a.score).map((item) => item.record)

  const recommended =
    forcedKeys.map((key) => sortedRecords.find((record) => record.materialKey === key)).find((item) => item) ?? sortedRecords[0]

  const usedKeys = new Set<MaterialKey>(recommended ? [recommended.materialKey] : [])

  const budgetAlternative =
    sortedRecords.find((record) => record.economics.priceLevel === "budget" && !usedKeys.has(record.materialKey)) ??
    sortedRecords.find((record) => !usedKeys.has(record.materialKey))

  if (budgetAlternative) usedKeys.add(budgetAlternative.materialKey)

  const premiumAlternative = sortedRecords.find(
    (record) => record.economics.priceLevel === "premium" && !usedKeys.has(record.materialKey),
  )

  const selection = [recommended, budgetAlternative, premiumAlternative].filter(Boolean) as MaterialSuggestionRecord[]

  return selection.map((record, index) => {
    const label: RecommendationCard["label"] =
      index === 0 ? copy.labels.recommended : index === 1 ? copy.labels.budgetAlternative : copy.labels.premiumAlternative
    return {
      label,
      record,
      slug: MATERIAL_SLUGS[record.materialKey] || record.id,
      priceNote: priceNote(record.economics.priceLevel, solidAnswers.budget, copy),
      reasons: buildReasons(record, solidAnswers, copy),
    }
  })
}

function formatColors(colors: string[]): string {
  if (colors.length <= 3) return colors.join(", ")
  return `${colors.slice(0, 3).join(", ")} +${colors.length - 3}`
}

export default function MaterialSuggestionTool() {
  const { locale } = useLocale()
  const copy = useMemo(() => getCopy(locale), [locale])
  const steps = copy.steps
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({
    location: "",
    functionality: "",
    look: "",
    budget: "",
    size: "",
  })

  const recommendationCards = useMemo(() => buildRecommendationCards(answers, copy), [answers, copy])
  const currentStep = steps[step]
  const isLastStep = step === steps.length - 1

  function selectOption(value: string) {
    setAnswers((prev) => ({ ...prev, [currentStep.id]: value }))
    if (!isLastStep) {
      setTimeout(() => setStep((s) => Math.min(s + 1, steps.length - 1)), 120)
    }
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 0))
  }

  function resetTool() {
    setAnswers({
      location: "",
      functionality: "",
      look: "",
      budget: "",
      size: "",
    })
    setStep(0)
  }

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: copy.howTo.name,
    description: copy.howTo.description,
    step: steps.map((item, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: item.title,
      text: item.description,
    })),
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <GlassCard className="h-full border border-white/50 bg-white/90 p-6 shadow-lg backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-[0.3em] text-slate-500">
          <span>{copy.labels.stepOf(step + 1, steps.length)}</span>
          <button
            type="button"
            onClick={resetTool}
            className="text-[11px] font-semibold text-indigo-600 transition hover:text-indigo-500"
          >
            {copy.labels.reset}
          </button>
        </div>
        <div className="mt-4 rounded-full bg-slate-100 p-1" aria-hidden>
          <div
            className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>

        <div className="mt-6 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-500">{copy.labels.flowTag}</p>
          <h2 className="text-2xl font-semibold text-slate-900">{currentStep.title}</h2>
          <p className="text-sm text-slate-600">{currentStep.description}</p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {currentStep.options.map((option) => {
            const active = answers[currentStep.id] === option.value
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => selectOption(option.value)}
                className={cn(
                  "rounded-2xl border px-4 py-3 text-left text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500",
                  active ? "border-indigo-500 bg-indigo-50 text-indigo-900" : "border-slate-200 bg-white/95 text-slate-900",
                )}
              >
                {option.label}
                {option.helper ? <p className="mt-1 text-xs font-normal text-slate-500">{option.helper}</p> : null}
              </button>
            )
          })}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex flex-wrap gap-2">
            {steps.map((item, index) => {
              const filled = Boolean(answers[item.id])
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setStep(index)}
                  className={cn(
                    "rounded-full border px-3 py-1 font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500",
                    index === step
                      ? "border-indigo-500 text-indigo-600"
                      : filled
                        ? "border-emerald-400 text-emerald-600"
                        : "border-slate-200 text-slate-400",
                  )}
                >
                  {index + 1}
                </button>
              )
            })}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goBack}
              disabled={step === 0}
              className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 transition enabled:hover:text-slate-900 disabled:opacity-50"
            >
              {copy.labels.prev}
            </button>
            <span className="text-[11px] text-slate-400">{copy.labels.adjustHint}</span>
          </div>
        </div>
      </GlassCard>

      <div className="grid gap-4">
        {recommendationCards ? (
          recommendationCards.map((card) => {
            const contactHref = localizeHref(
              `/contact?material=${encodeURIComponent(card.slug)}`,
              locale,
            )
            return (
      <GlassCard key={card.record.id} className="border border-emerald-100 bg-white/95 p-5 shadow-lg backdrop-blur">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-500">{card.label}</p>
        <h3 className="mt-2 text-xl font-semibold text-slate-900">{card.record.name}</h3>
        <p className="mt-1 text-sm text-slate-600">{card.record.descriptionShort}</p>
        <div className="mt-3 rounded-2xl border border-amber-100 bg-amber-50 px-4 py-2 text-xs font-semibold text-amber-700">
          {copy.labels.priceImpact}: {card.priceNote}
        </div>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  {card.reasons.map((reason) => (
                    <li key={reason} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-slate-500">
                  {copy.labels.colors}: {formatColors(card.record.colors)}
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <ShimmerButton href={contactHref}>{copy.labels.quoteCta}</ShimmerButton>
                  <Link
                    href={localizeHref(`/materials/${card.slug}`, locale)}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    {copy.labels.viewMaterial}
                  </Link>
                </div>
              </GlassCard>
            )
          })
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-white/60 p-6 text-sm text-slate-600 shadow-inner">
            {copy.labels.emptyState}
          </div>
        )}
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
    </div>
  )
}

function getCopy(locale: Locale): LocalizedCopy {
  const isEn = locale === "en"

  const steps: StepConfig[] = isEn
    ? [
        {
          id: "location",
          title: "Where will the project be used?",
          description: "Weather and environment immediately filter which materials remain.",
          options: [
            { value: "indoor", label: "Indoor", helper: "Office, retail, events" },
            { value: "outdoorSeasonal", label: "Outdoor (seasonal)", helper: "Occasional outdoor, limited UV" },
            { value: "outdoorPermanent", label: "Outdoor (permanent)", helper: "Full-time outdoor, rain and sun" },
          ],
        },
        {
          id: "functionality",
          title: "How should the part perform?",
          description: "Pick the load so we can propose the right blend.",
          options: [
            { value: "decor", label: "Decorative / display" },
            { value: "lightFunctional", label: "Light functional", helper: "Knobs, covers, light-duty marketing props" },
            { value: "strongFunctional", label: "Strong functional", helper: "Clamps, brackets, fixtures" },
            { value: "flex", label: "Flexible / shock absorbing", helper: "Grips, bumpers, TPU" },
          ],
        },
        {
          id: "look",
          title: "Which look do you prefer?",
          description: "The finish steers us to matte, glossy or specialty materials.",
          options: [
            { value: "matte", label: "Matte & clean" },
            { value: "silk", label: "Silky / premium reflection" },
            { value: "natural", label: "Natural (wood look)" },
            { value: "stone", label: "Stone / marble look" },
            { value: "metallic", label: "Metallic" },
            { value: "sparkle", label: "Glitter / sparkle / galaxy" },
            { value: "translucent", label: "Transparent / translucent" },
            { value: "glow", label: "Glow-in-the-dark" },
            { value: "gradient", label: "Gradient" },
            { value: "noPreference", label: "No preference" },
          ],
        },
        {
          id: "budget",
          title: "What is the budget level?",
          description: "Price impact helps us choose between PLA variants, PETG or premium blends.",
          options: [
            { value: "budget", label: "As sharp as possible" },
            { value: "standard", label: "Standard" },
            { value: "premium", label: "High-end look matters" },
          ],
        },
        {
          id: "size",
          title: "What is the print size?",
          description: "We avoid fragile blends on oversized parts.",
          options: [
            { value: "small", label: "Smaller than 10 cm" },
            { value: "medium", label: "10–20 cm" },
            { value: "large", label: "Larger than 20 cm" },
          ],
        },
      ]
    : [
        {
          id: "location",
          title: "Waar wordt het project gebruikt?",
          description: "Weer en omgeving bepalen meteen welke materialen overblijven.",
          options: [
            { value: "indoor", label: "Binnen", helper: "Kantoor, retail, events" },
            { value: "outdoorSeasonal", label: "Buiten (seizoensgebonden)", helper: "Occasioneel buiten, beperkte UV" },
            { value: "outdoorPermanent", label: "Buiten (permanent)", helper: "Full-time buiten, regen en zon" },
          ],
        },
        {
          id: "functionality",
          title: "Hoe moet het onderdeel functioneren?",
          description: "Kies de belasting zodat we de juiste blend kunnen voorstellen.",
          options: [
            { value: "decor", label: "Decoratief / display" },
            { value: "lightFunctional", label: "Licht functioneel", helper: "Knoppen, covers, marketing props met lichte belasting" },
            { value: "strongFunctional", label: "Sterk functioneel", helper: "Klemmen, brackets, fixtures" },
            { value: "flex", label: "Flexibel / schokabsorberend", helper: "Grips, bumpers, TPU" },
          ],
        },
        {
          id: "look",
          title: "Welke look heeft je voorkeur?",
          description: "De finish stuurt ons naar matte, glanzende of specialty materialen.",
          options: [
            { value: "matte", label: "Mat & strak" },
            { value: "silk", label: "Zijdeglans / premium reflectie" },
            { value: "natural", label: "Natuurlijk (houtlook)" },
            { value: "stone", label: "Steen / marmerlook" },
            { value: "metallic", label: "Metallic" },
            { value: "sparkle", label: "Glitter / sparkle / galaxy" },
            { value: "translucent", label: "Transparant / lichtdoorlatend" },
            { value: "glow", label: "Glow-in-the-dark" },
            { value: "gradient", label: "Kleurverloop" },
            { value: "noPreference", label: "Geen voorkeur" },
          ],
        },
        {
          id: "budget",
          title: "Wat is het budgetniveau?",
          description: "Prijsimpact helpt ons kiezen tussen PLA varianten, PETG of premium blends.",
          options: [
            { value: "budget", label: "Zo scherp mogelijk" },
            { value: "standard", label: "Standaard" },
            { value: "premium", label: "High-end look is belangrijk" },
          ],
        },
        {
          id: "size",
          title: "Wat is de grootte van de print?",
          description: "Zo voorkomen we dat fragiele blends op te grote onderdelen worden toegepast.",
          options: [
            { value: "small", label: "Kleiner dan 10 cm" },
            { value: "medium", label: "10–20 cm" },
            { value: "large", label: "Groter dan 20 cm" },
          ],
        },
      ]

  return {
    steps,
    locationCopy: isEn
      ? {
          indoor: "indoor projects",
          outdoorSeasonal: "seasonal outdoor use",
          outdoorPermanent: "permanent outdoor use",
        }
      : {
          indoor: "projecten binnenshuis",
          outdoorSeasonal: "seizoensgebonden buitengebruik",
          outdoorPermanent: "permanent buitengebruik",
        },
    functionalityCopy: isEn
      ? {
          decor: "decorative or display use",
          lightFunctional: "light functional parts",
          strongFunctional: "strong functional parts",
        }
      : {
          decor: "decoratieve of display toepassingen",
          lightFunctional: "licht functionele onderdelen",
          strongFunctional: "sterk functionele onderdelen",
        },
    budgetCopy: isEn
      ? {
          budget: "Lowest material cost, great for test runs and larger quantities.",
          standard: "Balanced cost and finish for most projects.",
          premium: "Premium pricing with focus on appearance and feel.",
        }
      : {
          budget: "Laagste materiaalkost, ideaal voor tests en grotere aantallen.",
          standard: "Standaard prijspunt met een goede balans tussen look en kost.",
          premium: "Premium prijsniveau met focus op uitstraling en beleving.",
        },
    priceBase: isEn
      ? {
          budget: "Budget friendly: ideal for test prints and fast iterations.",
          medium: "Average cost: balances looks with manageable material cost.",
          premium: "Premium cost: higher material spend for a luxury look.",
        }
      : {
          budget: "Budgetvriendelijk: handig voor proefprints en snelle iteraties.",
          medium: "Gemiddelde kost: combineert uitstraling met beheersbare materiaalkost.",
          premium: "Premium prijs: hogere materiaalkost zorgt voor luxe uitstraling.",
        },
    envSuitability: isEn
      ? {
          excellent: (loc) => `Excellent for ${loc}.`,
          good: (loc) => `Suitable for ${loc}.`,
          caution: (loc) => `Use for ${loc} with extra precautions.`,
        }
      : {
          excellent: (loc) => `Uitstekend geschikt voor ${loc}.`,
          good: (loc) => `Geschikt voor ${loc}.`,
          caution: (loc) => `Alleen inzetten voor ${loc} met bijkomende voorzorg.`,
        },
    flexReason: isEn ? "TPU is rubber-like and springs back every time." : "TPU is rubberachtig en veert telkens terug.",
    strengthLabels: isEn
      ? { high: "Very high strength", medium: "Solid strength", low: "Basic strength" }
      : { high: "Zeer hoge sterkte", medium: "Solide sterkte", low: "Basissterkte" },
    impactLabels: isEn
      ? { high: "high impact resistance", medium: "good impact resistance", low: "limited impact resistance" }
      : { high: "hoge impactbestendigheid", medium: "goede impactbestendigheid", low: "beperkte impactbestendigheid" },
    functionTemplate: (strength, impact, descriptor) =>
      isEn
        ? `${strength} and ${impact} make it ideal for ${descriptor}.`
        : `${strength} en ${impact} maken het ideaal voor ${descriptor}.`,
    matchLook: (label: string) =>
      isEn ? `Matches your preference (${label || "specific look"}).` : `Sluit aan bij jouw voorkeur (${label || "specifieke look"}).`,
    bestForPrefix: isEn ? "Typical projects:" : "Typische projecten:",
    petgReasons: isEn
      ? [
          "PETG is semi-flexible and absorbs impact without being rubber.",
          "Works well as a hybrid: rigid body + TPU inserts.",
        ]
      : [
          "PETG is semi-flexibel en kan klappen opvangen zonder rubber te zijn.",
          "Geschikt als hybride aanpak: rigide body + TPU inserts.",
        ],
    labels: {
      recommended: isEn ? "Recommended" : "Aanbevolen",
      budgetAlternative: isEn ? "Budget alternative" : "Budget alternatief",
      premiumAlternative: isEn ? "Premium alternative" : "Premium alternatief",
      alternative: isEn ? "Alternative" : "Alternatief",
      priceImpact: isEn ? "Price impact" : "Prijsimpact",
      colors: isEn ? "Colours" : "Kleuren",
      quoteCta: isEn ? "Request a quote with this material" : "Vraag een offerte met dit materiaal",
      viewMaterial: isEn ? "View material & examples" : "Bekijk materiaal & voorbeelden",
      stepOf: (current, total) => (isEn ? `Step ${current} / ${total}` : `Stap ${current} / ${total}`),
      reset: isEn ? "Reset tool" : "Reset tool",
      flowTag: isEn ? "Material Flow" : "Material Flow",
      prev: isEn ? "Previous" : "Vorige",
      adjustHint: isEn ? "Click a number to adjust an answer" : "Klik op een nummer om een antwoord aan te passen",
      emptyState: isEn
        ? "Start with question one. As you make choices, your recommended material with budget and premium options appears here."
        : "Start met vraag één. Terwijl je keuzes invult, verschijnt hier automatisch je aanbevolen materiaal met budget- en premiumopties.",
    },
    howTo: isEn
      ? {
          name: "Which 3D print material do I need?",
          description: "Interactive X3DPrints tool that asks five questions and shows three material options.",
        }
      : {
          name: "Welk 3D print materiaal heb ik nodig?",
          description: "Interactieve tool van X3DPrints die vijf vragen stelt en drie materiaalopties toont.",
        },
  }
}
