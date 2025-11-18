"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import { cn } from "@/lib/utils"

type Option = { value: string; label: string; helper?: string }

const steps: Array<{
  id: keyof Answers
  title: string
  description: string
  options: Option[]
}> = [
  {
    id: "usage",
    title: "Wat ga je printen?",
    description: "Kies het type project zodat we meteen de juiste filamentfamilie kunnen selecteren.",
    options: [
      { value: "prototype", label: "Prototype / concept", helper: "Testvormen, proof-of-concept" },
      { value: "functional", label: "Functioneel onderdeel", helper: "Jigs, klemmen, behuizingen" },
      { value: "decor", label: "Decor / merchandising", helper: "Awards, gifts, interieur" },
      { value: "flex", label: "Flexibel / schokdemping", helper: "Grips, bumpers, sleeves" },
      { value: "light", label: "Lichtdoorlatend", helper: "Lampenkappen, signage" },
      { value: "special", label: "Bijzondere afwerking", helper: "Hout, silk, sparkle" },
    ],
  },
  {
    id: "environment",
    title: "Welke omgeving / belasting?",
    description: "Omgeving en temperatuur bepalen of we PLA, PETG of een andere blend aanraden.",
    options: [
      { value: "indoor", label: "Binnen", helper: "Kamer-temperatuur" },
      { value: "outdoor", label: "Buiten / UV / vocht" },
      { value: "heat", label: "Warm (>60 °C)" },
      { value: "hightemp", label: "Economisch / chemisch belast" },
    ],
  },
  {
    id: "finish",
    title: "Welke afwerking of look?",
    description: "Bepaal of het vooral premium moet ogen, ruig mag blijven of licht moet doorlaten.",
    options: [
      { value: "raw", label: "Ruw / functioneel" },
      { value: "premium", label: "Premium mat / glans" },
      { value: "textured", label: "Specifieke textuur (wood, marble, silk)" },
      { value: "paint", label: "Ik lak / verf achteraf" },
    ],
  },
  {
    id: "priority",
    title: "Wat is het belangrijkste?",
    description: "Zo sturen we je naar de meest efficiënte optie.",
    options: [
      { value: "speed", label: "Snel & budgetvriendelijk" },
      { value: "strength", label: "Sterkte / duurzaamheid" },
      { value: "visual", label: "Look & feel" },
      { value: "unique", label: "Bijzondere effecten" },
    ],
  },
]

type Answers = {
  usage: string
  environment: string
  finish: string
  priority: string
}

type Recommendation = {
  material: string
  slug: string
  description: string
  reasons: string[]
}

function getRecommendation({ usage, environment, finish, priority }: Answers): Recommendation | null {
  if (!usage || !environment || !finish || !priority) return null

  if (usage === "flex") {
    return {
      material: "TPU",
      slug: "tpu",
      description: "TPU (shore 95A) is flexibel en schokabsorberend: perfect voor grips, bumpers en dempers.",
      reasons: [
        "Veert terug na impact en scheurt niet snel.",
        "Handig voor sleeves, afdichtingen en soft-touch onderdelen.",
        "Beschikbaar in meerdere kleuren; matte look die niet snel beschadigt.",
      ],
    }
  }

  if (usage === "light") {
    return {
      material: "PLA Translucent",
      slug: "pla-translucent",
      description: "PLA Translucent filtert licht zacht en werkt uitstekend voor lampen, signage of display-stukken.",
      reasons: [
        "Semi-transparante basis voor gelijkmatige gloed.",
        "Veel kleuren (warm/koel) om licht te sturen.",
        "Dunne wanden blijven stevig door sterke layer bonding.",
      ],
    }
  }

  if (usage === "special" && finish === "textured" && priority === "unique") {
    return {
      material: "PLA Wood",
      slug: "pla-wood",
      description: "PLA Wood bevat houtdeeltjes voor een warme, natuurlijke look. Ideaal voor maquettes, interieur en branding.",
      reasons: [
        "Schuren, beitsen en lakken kan alsof het echt hout is.",
        "Elke print krijgt subtiele kleurvariaties voor realisme.",
        "Beschikbaar in Walnut, Mahogany, Teak, Oak en Desert.",
      ],
    }
  }

  if (finish === "textured") {
    return {
      material: "PLA Silk+",
      slug: "pla-silk-plus",
      description: "PLA Silk+ geeft een spiegelende glans en is perfect voor merchandising, awards of showpieces.",
      reasons: [
        "Zelfnivellerende glans voor fotogenieke prints.",
        "Beschikbaar in metallic en multi-color varianten.",
        "Combineert mooi met lichte nabewerking voor premium look.",
      ],
    }
  }

  if (environment === "outdoor" || environment === "heat" || environment === "hightemp" || priority === "strength") {
    return {
      material: "PETG",
      slug: "petg",
      description: "PETG blijft maatvast bij warmte en vocht. Ideaal voor buitengebruik, klemmen of onderdelen in voertuigen.",
      reasons: [
        "Tot circa 80 °C hittebestendig en chemisch resistenter dan PLA.",
        "Glad en stevig, dus geschikt voor behuizingen en brackets.",
        "Beschikbaar in translucent varianten voor lichtdoorlatende projecten.",
      ],
    }
  }

  if (usage === "functional" || priority === "strength") {
    return {
      material: "PLA Tough+",
      slug: "pla-tough-plus",
      description: "PLA Tough+ combineert de printgemak van PLA met extra taaiheid. Handig voor jigs, klemmen en prototypes die getest worden.",
      reasons: [
        "Betere impactbestendigheid dan standaard PLA.",
        "Strakke details en weinig krimp, dus onderdelen passen direct.",
        "Goed te boren, tappen en na te bewerken.",
      ],
    }
  }

  if (finish === "premium" || usage === "decor" || priority === "visual") {
    return {
      material: "PLA Matte",
      slug: "pla-matte",
      description: "PLA Matte oogt alsof het geïnjecteerd is: perfecte keuze voor merchandising, mock-ups en interieurstukken.",
      reasons: [
        "Diffuus oppervlak verbergt laaglijnen.",
        "Grote kleurenrange (wit, zwart, aardtinten, pastels).",
        "Gemakkelijk te schuren of schilderen voor extra effect.",
      ],
    }
  }

  return {
    material: "PLA Basic",
    slug: "pla-basic",
    description: "PLA Basic is de allrounder voor snelle prototypes en educatieve modellen. Betaalbaar en leverbaar in veel kleuren.",
    reasons: [
      "Snel te printen en eenvoudig na te bewerken.",
      "Perfect om vorm, maat of ergonomie te testen.",
      "Combineerbaar met primer/lak voor premium look.",
    ],
  }
}

export default function MaterialSuggestionTool() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({
    usage: "",
    environment: "",
    finish: "",
    priority: "",
  })

  const recommendation = useMemo(() => getRecommendation(answers), [answers])
  const adviceHref = recommendation ? `/contact?material=${encodeURIComponent(recommendation.material)}` : "/contact"

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
    setAnswers({ usage: "", environment: "", finish: "", priority: "" })
    setStep(0)
  }

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Materialen kiezen voor 3D printen",
    description: "Interactieve tool van X3DPrints om het juiste filament te kiezen.",
    step: steps.map((item, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: item.title,
      text: item.description,
    })),
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <GlassCard className="h-full border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-500">
          <span>Stap {step + 1} / {steps.length}</span>
          <button type="button" onClick={resetTool} className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-500">
            Reset tool
          </button>
        </div>
        <div className="mt-4 rounded-full bg-slate-100 p-1">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            aria-hidden
          />
        </div>

        <div className="mt-6 space-y-2">
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
                  "rounded-2xl border px-4 py-3 text-left text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500",
                  active
                    ? "border-indigo-500 bg-indigo-50 text-indigo-900"
                    : "border-slate-200 bg-white/90 text-slate-900",
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
              const filled = !!answers[item.id]
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setStep(index)}
                  className={cn(
                    "rounded-full border px-3 py-1 font-semibold transition",
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
              className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 disabled:opacity-50"
            >
              Vorige
            </button>
            <span className="text-[11px] text-slate-400">Klik op een nummer om een antwoord te wijzigen</span>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="h-full border border-emerald-100 bg-white/90 p-6 shadow-lg backdrop-blur">
        <h3 className="text-lg font-semibold text-slate-900">Resultaat</h3>
        {recommendation ? (
          <div className="mt-4 space-y-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Aanbevolen filament</p>
              <p className="text-2xl font-semibold text-slate-900">{recommendation.material}</p>
              <p className="mt-1 text-sm text-slate-600">{recommendation.description}</p>
              <p className="mt-1 text-xs text-slate-500">
                Suggestie gebaseerd op jouw keuzes. Bij afwijkende eisen stemmen we samen het optimale filament af.
              </p>
            </div>
            <ul className="space-y-2 text-sm text-slate-600">
              {recommendation.reasons.map((reason) => (
                <li key={reason} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/materials/${recommendation.slug}`}
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-white/90 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
              >
                Bekijk {recommendation.material}
              </Link>
              <ShimmerButton href={adviceHref}>Vraag advies</ShimmerButton>
            </div>
          </div>
        ) : (
          <p className="mt-4 text-sm text-slate-600">
            Beantwoord de vragen aan de linkerkant om een voorstel te zien. We tonen meteen welk materiaal meestal werkt voor je scenario.
          </p>
        )}
      </GlassCard>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
    </div>
  )
}
