"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ArrowLeft, ArrowRight, Check, Minus, Plus } from "lucide-react"
import { trackEvent } from "@/lib/analytics"
import { localizeHref } from "@/lib/i18n/paths"
import {
  DEFAULT_MODEL_HOURS,
  computeGuide,
  type GuideLevel,
  type GuideStart,
  type GuideUse,
} from "@/lib/price-guide"
import type { Quality, Tier } from "@/lib/pricing"
import { SCAN_PRICES } from "@/lib/scanning-prices"
import { cn } from "@/lib/utils"

type Locale = "nl" | "en"
type StepId = "start" | "scan" | "use" | "size" | "result"
type SizeChoice = Tier | "custom"

const COPY = {
  nl: {
    steps: { start: "Vertrekpunt", scan: "Scan", use: "Gebruik", size: "Formaat", result: "Prijzen" },
    stepOf: (n: number, total: number) => `Stap ${n} van ${total}`,
    back: "Terug",
    start: {
      title: "Waar vertrek je van?",
      options: {
        file: { label: "Ik heb een 3D-bestand", hint: "STL, STEP of 3MF. Ik print het zoals het is." },
        broken: { label: "Een kapot of onvindbaar onderdeel", hint: "Ik meet het op en teken het na. Het vooronderzoek is gratis." },
        idea: { label: "Een idee of schets", hint: "Ik ontwerp het samen met jou, op basis van foto's en maten." },
        scan: { label: "Iets laten 3D-scannen", hint: "Een object, onderdeel of persoon digitaal vastleggen." },
      } satisfies Record<GuideStart, { label: string; hint: string }>,
    },
    scan: {
      title: "Wat wil je laten scannen?",
      alsoPrint: "Ik wil het daarna ook laten printen",
      next: "Verder",
      fileIncluded: "Het afgesproken scanbestand zit in de prijs.",
    },
    use: {
      title: "Waarvoor ga je het gebruiken?",
      lead: "Hieruit volgt het materiaal. Twijfel je, kies dan wat het dichtst in de buurt komt.",
      options: {
        decor: { label: "Decoratief of als cadeau", hint: "Beeldje, aandenken, decoratie binnen" },
        functional: { label: "Functioneel, binnen", hint: "Houder, clip, behuizing, vervangstuk" },
        outdoor: { label: "Buiten", hint: "Zon, regen en vorst" },
        heat: { label: "Bij warmte", hint: "In de auto, bij een toestel of lamp" },
        flexible: { label: "Het moet buigen", hint: "Buffer, dichting, grip, hoesje" },
        strong: { label: "Het moet veel kracht aankunnen", hint: "Mechanisch onderdeel, beugel, tandwiel" },
      } satisfies Record<GuideUse, { label: string; hint: string }>,
    },
    size: {
      title: "Hoe groot is het, en hoeveel stuks?",
      options: {
        Small: { label: "Klein", hint: "Tot ongeveer 5 cm, zoals een sleutelhanger of clip" },
        Medium: { label: "Middelgroot", hint: "Tot ongeveer 10 cm, zoals een gsm-houder of beeldje" },
        Large: { label: "Groot", hint: "Tot ongeveer 20 cm, zoals een bloempot of behuizing" },
        custom: { label: "Ik ken gewicht en printtijd", hint: "Uit je slicer, voor de exactste richtprijs" },
      } satisfies Record<SizeChoice, { label: string; hint: string }>,
      grams: "Gewicht (gram)",
      hours: "Printtijd (uren)",
      quantity: "Aantal stuks",
      decrease: "Eén stuk minder",
      increase: "Eén stuk meer",
      submit: "Toon mijn prijzen",
    },
    result: {
      title: "Je richtprijzen",
      scanTitle: "Je richtprijs",
      levels: { basis: "Basis", advice: "Mijn advies", premium: "Premium" } satisfies Record<GuideLevel, string>,
      quality: { Standaard: "standaard laag", Fijn: "fijne laag", Ultra: "ultrafijne laag" } satisfies Record<Quality, string>,
      perPiece: (amount: string, qty: number) => `${amount} per stuk bij ${qty} stuks`,
      includesModel: (hours: string, amount: string) => `Inclusief ${hours} ontwerptijd (${amount}, schatting)`,
      includesScan: (label: string, amount: string) => `Inclusief 3D-scan: ${label} (${amount})`,
      cta: "Vraag deze prijs aan",
      ctaScan: "Vraag deze scan aan",
      modelHours: "Ontwerptijd (schatting)",
      modelHoursHint: "Na het bekijken van je foto's en maten weet ik dit precies.",
      lessHours: "Een half uur minder",
      moreHours: "Een half uur meer",
      hoursUnit: (h: number) => `${String(h).replace(".", ",")} u`,
      note:
        "Richtprijs zonder verzending. Btw niet toegepast (kleineondernemersregeling). Ik reken hier bewust ruim: na het bekijken van je bestand valt de offerte meestal lager uit.",
      restart: "Opnieuw beginnen",
      quoteIntro: "Richtprijs via de prijswijzer",
      seriesNote: "Bij grotere aantallen kan ik de prijs verder optimaliseren.",
    },
  },
  en: {
    steps: { start: "Starting point", scan: "Scan", use: "Use", size: "Size", result: "Prices" },
    stepOf: (n: number, total: number) => `Step ${n} of ${total}`,
    back: "Back",
    start: {
      title: "What are you starting from?",
      options: {
        file: { label: "I have a 3D file", hint: "STL, STEP or 3MF. I print it as it is." },
        broken: { label: "A broken or hard-to-find part", hint: "I measure it and redraw it. The feasibility check is free." },
        idea: { label: "An idea or sketch", hint: "I design it with you, based on photos and dimensions." },
        scan: { label: "Something to 3D scan", hint: "Capture an object, part or person digitally." },
      } satisfies Record<GuideStart, { label: string; hint: string }>,
    },
    scan: {
      title: "What would you like scanned?",
      alsoPrint: "I also want it printed afterwards",
      next: "Continue",
      fileIncluded: "The agreed scan file is included in the price.",
    },
    use: {
      title: "What will you use it for?",
      lead: "This decides the material. Not sure? Pick the closest match.",
      options: {
        decor: { label: "Decorative or as a gift", hint: "Figurine, keepsake, indoor decoration" },
        functional: { label: "Functional, indoors", hint: "Holder, clip, enclosure, replacement part" },
        outdoor: { label: "Outdoors", hint: "Sun, rain and frost" },
        heat: { label: "Near heat", hint: "In a car, near an appliance or lamp" },
        flexible: { label: "It needs to flex", hint: "Bumper, seal, grip, cover" },
        strong: { label: "It has to take real force", hint: "Mechanical part, bracket, gear" },
      } satisfies Record<GuideUse, { label: string; hint: string }>,
    },
    size: {
      title: "How big is it, and how many?",
      options: {
        Small: { label: "Small", hint: "Up to about 5 cm, like a key ring or clip" },
        Medium: { label: "Medium", hint: "Up to about 10 cm, like a phone stand or figurine" },
        Large: { label: "Large", hint: "Up to about 20 cm, like a plant pot or enclosure" },
        custom: { label: "I know weight and print time", hint: "From your slicer, for the most accurate guide price" },
      } satisfies Record<SizeChoice, { label: string; hint: string }>,
      grams: "Weight (grams)",
      hours: "Print time (hours)",
      quantity: "Quantity",
      decrease: "One piece less",
      increase: "One piece more",
      submit: "Show my prices",
    },
    result: {
      title: "Your guide prices",
      scanTitle: "Your guide price",
      levels: { basis: "Basic", advice: "My advice", premium: "Premium" } satisfies Record<GuideLevel, string>,
      quality: { Standaard: "standard layer", Fijn: "fine layer", Ultra: "ultra fine layer" } satisfies Record<Quality, string>,
      perPiece: (amount: string, qty: number) => `${amount} per piece for ${qty} pieces`,
      includesModel: (hours: string, amount: string) => `Includes ${hours} of design time (${amount}, estimate)`,
      includesScan: (label: string, amount: string) => `Includes 3D scan: ${label} (${amount})`,
      cta: "Request this price",
      ctaScan: "Request this scan",
      modelHours: "Design time (estimate)",
      modelHoursHint: "Once I have seen your photos and dimensions, I know this exactly.",
      lessHours: "Half an hour less",
      moreHours: "Half an hour more",
      hoursUnit: (h: number) => `${h} h`,
      note:
        "Guide price excluding shipping. No VAT charged (Belgian small business scheme). I estimate on the generous side here: once I have seen your file, the quote usually comes out lower.",
      restart: "Start over",
      quoteIntro: "Guide price from the price guide",
      seriesNote: "For larger quantities I can optimise the price further.",
    },
  },
} as const

const SIZE_ORDER: SizeChoice[] = ["Small", "Medium", "Large", "custom"]
const USE_ORDER: GuideUse[] = ["decor", "functional", "outdoor", "heat", "flexible", "strong"]
const START_ORDER: GuideStart[] = ["file", "broken", "idea", "scan"]

function track(label: string, action = "price_guide_step") {
  trackEvent({ action, category: "pricing_guide", label })
}

export default function PriceGuide({ locale }: { locale: Locale }) {
  const t = COPY[locale]
  const reduceMotion = useReducedMotion()
  const euro = useMemo(
    () =>
      new Intl.NumberFormat(locale === "en" ? "en-BE" : "nl-BE", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }),
    [locale],
  )

  const [stepId, setStepId] = useState<StepId>("start")
  const [start, setStart] = useState<GuideStart | null>(null)
  const [scanKey, setScanKey] = useState<string>(SCAN_PRICES[0]?.key ?? "small-object")
  const [scanAlsoPrint, setScanAlsoPrint] = useState(false)
  const [use, setUse] = useState<GuideUse | null>(null)
  const [size, setSize] = useState<SizeChoice>("Medium")
  const [quantity, setQuantity] = useState(1)
  const [customGrams, setCustomGrams] = useState(150)
  const [customHours, setCustomHours] = useState(5)
  const [modelHours, setModelHours] = useState(1)

  const includePrint = start !== "scan" || scanAlsoPrint
  const steps: StepId[] = useMemo(() => {
    const list: StepId[] = ["start"]
    if (start === "scan") list.push("scan")
    if (includePrint) list.push("use", "size")
    list.push("result")
    return list
  }, [start, includePrint])
  const stepIndex = Math.max(0, steps.indexOf(stepId))

  const headingRef = useRef<HTMLHeadingElement>(null)
  const hasInteracted = useRef(false)
  useEffect(() => {
    if (hasInteracted.current) headingRef.current?.focus({ preventScroll: true })
  }, [stepId])

  const goTo = (next: StepId) => {
    hasInteracted.current = true
    setStepId(next)
  }
  const goNext = (from: StepId, list: StepId[] = steps) => {
    const i = list.indexOf(from)
    goTo(list[Math.min(i + 1, list.length - 1)])
  }

  const chooseStart = (value: GuideStart) => {
    setStart(value)
    setModelHours(Math.max(1, DEFAULT_MODEL_HOURS[value]))
    track(`start:${value}`)
    goTo(value === "scan" ? "scan" : "use")
  }
  const chooseUse = (value: GuideUse) => {
    setUse(value)
    track(`use:${value}`)
    goTo("size")
  }

  const result = useMemo(() => {
    if (!start) return null
    return computeGuide(
      {
        start,
        use: use ?? "functional",
        size,
        quantity,
        customGrams,
        customHours,
        modelHours,
        scanKey,
        includePrint: includePrint && use !== null,
      },
      locale,
    )
  }, [start, use, size, quantity, customGrams, customHours, modelHours, scanKey, includePrint, locale])

  const resultTracked = useRef(false)
  useEffect(() => {
    if (stepId === "result" && result && !resultTracked.current) {
      resultTracked.current = true
      track(`${start}:${use ?? "scan-only"}:${size}`, "price_guide_result")
    }
    if (stepId !== "result") resultTracked.current = false
  }, [stepId, result, start, use, size])

  const restart = () => {
    setStart(null)
    setUse(null)
    setScanAlsoPrint(false)
    setQuantity(1)
    setSize("Medium")
    track("restart")
    goTo("start")
  }

  const buildQuoteHref = (materialLabel: string, lines: string[]) => {
    const quote = [t.result.quoteIntro, ...lines].join(" | ")
    const params = new URLSearchParams({ material: materialLabel, quote, quantity: String(quantity) })
    return localizeHref(`/contact?${params.toString()}`, locale)
  }

  const answerLines = (): string[] => {
    const lines: string[] = []
    if (start) lines.push(`${t.steps.start}: ${t.start.options[start].label}`)
    if (start === "scan" && result) lines.push(`${t.steps.scan}: ${result.scanLabel}`)
    if (includePrint && use) {
      lines.push(`${t.steps.use}: ${t.use.options[use].label}`)
      const sizeLabel =
        size === "custom"
          ? `${customGrams} g, ${customHours} h`
          : `${t.size.options[size].label} (${t.size.options[size].hint})`
      lines.push(`${t.steps.size}: ${sizeLabel}`, `${t.size.quantity}: ${quantity}`)
    }
    return lines
  }

  const panelMotion = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 12, filter: "blur(4px)" },
        animate: { opacity: 1, y: 0, filter: "blur(0px)" },
        exit: { opacity: 0, y: -8, filter: "blur(4px)" },
        transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] as const },
      }

  const tileClass = (selected: boolean) =>
    cn(
      "group relative flex h-full w-full flex-col items-start rounded-2xl border p-4 text-left transition",
      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300",
      selected
        ? "border-emerald-300/80 bg-emerald-400/10 shadow-[0_12px_30px_rgba(16,185,129,0.18)]"
        : "border-slate-700/80 bg-slate-900/60 hover:-translate-y-0.5 hover:border-emerald-300/50 hover:bg-slate-900",
    )

  const stepCount = steps.length - 1

  return (
    <div className="rounded-[2rem] border border-slate-700/70 bg-slate-950/70 p-5 text-slate-100 shadow-[0_30px_80px_rgba(2,6,23,0.45)] backdrop-blur sm:p-8">
      {/* Progress */}
      <ol className="flex flex-wrap items-center gap-2 text-xs font-semibold" aria-label={t.stepOf(stepIndex + 1, steps.length)}>
        {steps.map((id, i) => {
          const done = i < stepIndex
          const current = i === stepIndex
          return (
            <li key={id} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => done && goTo(id)}
                disabled={!done}
                aria-current={current ? "step" : undefined}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 transition",
                  current && "bg-emerald-300 text-slate-950",
                  done && "bg-slate-800 text-emerald-200 hover:bg-slate-700",
                  !done && !current && "bg-slate-900 text-slate-400",
                  "disabled:cursor-default",
                )}
              >
                {done ? <Check aria-hidden className="h-3.5 w-3.5" /> : null}
                {t.steps[id]}
              </button>
              {i < steps.length - 1 ? <span aria-hidden className="h-px w-4 bg-slate-700 sm:w-6" /> : null}
            </li>
          )
        })}
      </ol>

      <div className="mt-6 min-h-[22rem]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={stepId} {...panelMotion}>
            {stepId !== "result" ? (
              <p className="text-xs font-medium text-slate-400">{t.stepOf(Math.min(stepIndex + 1, stepCount), stepCount)}</p>
            ) : null}

            {stepId === "start" ? (
              <fieldset>
                <legend className="contents">
                  <h3 ref={headingRef} tabIndex={-1} className="mt-1 text-2xl font-bold tracking-tight text-white focus:outline-none sm:text-3xl">
                    {t.start.title}
                  </h3>
                </legend>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {START_ORDER.map((key) => (
                    <button key={key} type="button" aria-pressed={start === key} onClick={() => chooseStart(key)} className={tileClass(start === key)}>
                      <span className="text-base font-semibold text-white">{t.start.options[key].label}</span>
                      <span className="mt-1 text-sm text-slate-300">{t.start.options[key].hint}</span>
                      <ArrowRight aria-hidden className="absolute right-4 top-4 h-4 w-4 text-slate-500 transition group-hover:translate-x-0.5 group-hover:text-emerald-300" />
                    </button>
                  ))}
                </div>
              </fieldset>
            ) : null}

            {stepId === "scan" ? (
              <fieldset>
                <legend className="contents">
                  <h3 ref={headingRef} tabIndex={-1} className="mt-1 text-2xl font-bold tracking-tight text-white focus:outline-none sm:text-3xl">
                    {t.scan.title}
                  </h3>
                </legend>
                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {SCAN_PRICES.map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      aria-pressed={scanKey === item.key}
                      onClick={() => setScanKey(item.key)}
                      className={tileClass(scanKey === item.key)}
                    >
                      <span className="text-base font-semibold text-white">{locale === "en" ? item.labelEn : item.labelNl}</span>
                      <span className="mt-1 text-sm text-slate-300">{euro.format(item.price)}</span>
                    </button>
                  ))}
                </div>
                <p className="mt-3 text-sm text-slate-400">{t.scan.fileIncluded}</p>
                <label className="mt-5 flex cursor-pointer items-center gap-3 text-sm font-medium text-slate-200">
                  <input
                    type="checkbox"
                    checked={scanAlsoPrint}
                    onChange={(e) => setScanAlsoPrint(e.target.checked)}
                    className="h-5 w-5 rounded border-slate-600 bg-slate-900 accent-emerald-400"
                  />
                  {t.scan.alsoPrint}
                </label>
                <StepNav
                  backLabel={t.back}
                  onBack={() => goTo("start")}
                  nextLabel={t.scan.next}
                  onNext={() => {
                    track(`scan:${scanKey}:${scanAlsoPrint ? "print" : "only"}`)
                    goTo(scanAlsoPrint ? "use" : "result")
                  }}
                />
              </fieldset>
            ) : null}

            {stepId === "use" ? (
              <fieldset>
                <legend className="contents">
                  <h3 ref={headingRef} tabIndex={-1} className="mt-1 text-2xl font-bold tracking-tight text-white focus:outline-none sm:text-3xl">
                    {t.use.title}
                  </h3>
                </legend>
                <p className="mt-2 max-w-2xl text-sm text-slate-300">{t.use.lead}</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {USE_ORDER.map((key) => (
                    <button key={key} type="button" aria-pressed={use === key} onClick={() => chooseUse(key)} className={tileClass(use === key)}>
                      <span className="text-base font-semibold text-white">{t.use.options[key].label}</span>
                      <span className="mt-1 text-sm text-slate-300">{t.use.options[key].hint}</span>
                    </button>
                  ))}
                </div>
                <StepNav backLabel={t.back} onBack={() => goTo(start === "scan" ? "scan" : "start")} />
              </fieldset>
            ) : null}

            {stepId === "size" ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  track(`size:${size}:qty-${quantity}`)
                  goNext("size")
                }}
              >
                <fieldset>
                  <legend className="contents">
                    <h3 ref={headingRef} tabIndex={-1} className="mt-1 text-2xl font-bold tracking-tight text-white focus:outline-none sm:text-3xl">
                      {t.size.title}
                    </h3>
                  </legend>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {SIZE_ORDER.map((key) => (
                      <button key={key} type="button" aria-pressed={size === key} onClick={() => setSize(key)} className={tileClass(size === key)}>
                        <span className="text-base font-semibold text-white">{t.size.options[key].label}</span>
                        <span className="mt-1 text-sm text-slate-300">{t.size.options[key].hint}</span>
                      </button>
                    ))}
                  </div>
                </fieldset>

                <div className="mt-5 flex flex-wrap items-end gap-4">
                  {size === "custom" ? (
                    <>
                      <NumberField label={t.size.grams} value={customGrams} min={1} max={5000} step={1} onChange={setCustomGrams} />
                      <NumberField label={t.size.hours} value={customHours} min={0.1} max={200} step={0.1} onChange={setCustomHours} />
                    </>
                  ) : null}
                  <Stepper
                    label={t.size.quantity}
                    value={quantity}
                    onChange={(v) => setQuantity(Math.min(999, Math.max(1, v)))}
                    decreaseLabel={t.size.decrease}
                    increaseLabel={t.size.increase}
                  />
                </div>

                <StepNav backLabel={t.back} onBack={() => goTo("use")} nextLabel={t.size.submit} nextIsSubmit />
              </form>
            ) : null}

            {stepId === "result" && result ? (
              <div>
                <h3 ref={headingRef} tabIndex={-1} className="text-2xl font-bold tracking-tight text-white focus:outline-none sm:text-3xl">
                  {result.options.length ? t.result.title : t.result.scanTitle}
                </h3>

                {result.options.length ? (
                  <ul
                    className={cn(
                      "mt-6 grid gap-4",
                      result.options.length === 3 && "lg:grid-cols-3",
                      result.options.length === 2 && "md:grid-cols-2",
                    )}
                  >
                    {result.options.map((option) => {
                      const advice = option.level === "advice"
                      const lines = [
                        ...answerLines(),
                        `${t.result.levels[option.level]}: ${option.materialLabel}, ${t.result.quality[option.quality]}`,
                        `${euro.format(option.total)}`,
                      ]
                      return (
                        <li
                          key={option.level}
                          className={cn(
                            "relative flex flex-col rounded-3xl border p-6",
                            advice
                              ? "border-emerald-300/70 bg-[linear-gradient(160deg,rgba(16,185,129,0.16),rgba(15,23,42,0.85)_55%)] shadow-[0_24px_60px_rgba(16,185,129,0.16)] lg:-my-2 lg:py-8"
                              : "border-slate-700/80 bg-slate-900/60",
                          )}
                        >
                          <p className={cn("text-sm font-semibold", advice ? "text-emerald-300" : "text-slate-400")}>
                            {t.result.levels[option.level]}
                          </p>
                          <p className="mt-1 text-lg font-semibold text-white">
                            {option.materialLabel}
                            <span className="font-normal text-slate-400">, {t.result.quality[option.quality]}</span>
                          </p>
                          <p className="mt-4 text-4xl font-bold tracking-tight text-white tabular-nums">
                            {euro.format(option.total)}
                          </p>
                          {quantity > 1 ? (
                            <p className="mt-1 text-sm text-slate-300">{t.result.perPiece(euro.format(option.perPiece), quantity)}</p>
                          ) : null}
                          <p className="mt-4 text-sm leading-6 text-slate-300">{option.why}</p>
                          {result.modelingCost > 0 || result.scanCost > 0 ? (
                            <ul className="mt-4 space-y-1 text-xs text-slate-400">
                              {result.modelingCost > 0 ? (
                                <li>{t.result.includesModel(t.result.hoursUnit(result.modelHours), euro.format(result.modelingCost))}</li>
                              ) : null}
                              {result.scanCost > 0 ? (
                                <li>{t.result.includesScan(result.scanLabel, euro.format(result.scanCost))}</li>
                              ) : null}
                            </ul>
                          ) : null}
                          <div className="mt-auto pt-6">
                          <a
                            href={buildQuoteHref(option.materialLabel, lines)}
                            onClick={() => track(`${option.level}:${option.materialLabel}`, "price_guide_quote_click")}
                            className={cn(
                              "inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition",
                              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300",
                              advice
                                ? "bg-emerald-300 text-slate-950 hover:bg-emerald-200"
                                : "border border-slate-600 text-slate-100 hover:border-slate-400 hover:bg-slate-800",
                            )}
                          >
                            {t.result.cta}
                            <ArrowRight aria-hidden className="h-4 w-4" />
                          </a>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                ) : (
                  <div className="mt-6 max-w-md rounded-3xl border border-emerald-300/70 bg-[linear-gradient(160deg,rgba(16,185,129,0.16),rgba(15,23,42,0.85)_55%)] p-6">
                    <p className="text-lg font-semibold text-white">{result.scanLabel}</p>
                    <p className="mt-4 text-4xl font-bold tracking-tight text-white tabular-nums">{euro.format(result.scanCost)}</p>
                    <p className="mt-3 text-sm text-slate-300">{t.scan.fileIncluded}</p>
                    <a
                      href={buildQuoteHref(locale === "en" ? "3D scanning" : "3D scannen", [...answerLines(), euro.format(result.scanCost)])}
                      onClick={() => track("scan-only", "price_guide_quote_click")}
                      className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-300 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
                    >
                      {t.result.ctaScan}
                      <ArrowRight aria-hidden className="h-4 w-4" />
                    </a>
                  </div>
                )}

                {start === "broken" || start === "idea" ? (
                  <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-2xl border border-slate-700/80 bg-slate-900/60 p-4">
                    <Stepper
                      label={t.result.modelHours}
                      value={modelHours}
                      display={t.result.hoursUnit(modelHours)}
                      onChange={(v) => setModelHours(Math.min(20, Math.max(0.5, v)))}
                      step={0.5}
                      decreaseLabel={t.result.lessHours}
                      increaseLabel={t.result.moreHours}
                    />
                    <p className="max-w-sm text-sm text-slate-300">{t.result.modelHoursHint}</p>
                  </div>
                ) : null}

                <div className="mt-6 space-y-2 text-sm text-slate-300">
                  {quantity >= 10 ? <p>{t.result.seriesNote}</p> : null}
                  <p className="max-w-3xl">{t.result.note}</p>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => goTo(steps[Math.max(0, stepIndex - 1)])}
                    className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white"
                  >
                    <ArrowLeft aria-hidden className="h-4 w-4" />
                    {t.back}
                  </button>
                  <button
                    type="button"
                    onClick={restart}
                    className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-300 underline-offset-4 transition hover:text-white hover:underline"
                  >
                    {t.result.restart}
                  </button>
                </div>
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

function StepNav({
  backLabel,
  onBack,
  nextLabel,
  onNext,
  nextIsSubmit = false,
}: {
  backLabel: string
  onBack: () => void
  nextLabel?: string
  onNext?: () => void
  nextIsSubmit?: boolean
}) {
  return (
    <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white"
      >
        <ArrowLeft aria-hidden className="h-4 w-4" />
        {backLabel}
      </button>
      {nextLabel ? (
        <button
          type={nextIsSubmit ? "submit" : "button"}
          onClick={nextIsSubmit ? undefined : onNext}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-300 px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_12px_30px_rgba(16,185,129,0.25)] transition hover:bg-emerald-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
        >
          {nextLabel}
          <ArrowRight aria-hidden className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  )
}

function Stepper({
  label,
  value,
  display,
  onChange,
  step = 1,
  decreaseLabel,
  increaseLabel,
}: {
  label: string
  value: number
  display?: string
  onChange: (value: number) => void
  step?: number
  decreaseLabel: string
  increaseLabel: string
}) {
  return (
    <div>
      <p className="text-sm font-medium text-slate-300">{label}</p>
      <div className="mt-2 inline-flex items-center rounded-xl border border-slate-700 bg-slate-900">
        <button
          type="button"
          onClick={() => onChange(value - step)}
          aria-label={decreaseLabel}
          className="grid h-11 w-11 place-items-center rounded-l-xl text-slate-200 transition hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300"
        >
          <Minus aria-hidden className="h-4 w-4" />
        </button>
        {display ? (
          <output aria-live="polite" className="min-w-[4.5rem] px-2 text-center font-mono text-base font-semibold tabular-nums text-white">
            {display}
          </output>
        ) : (
          <input
            type="number"
            inputMode="numeric"
            min={1}
            max={999}
            value={value}
            aria-label={label}
            onChange={(e) => onChange(Number(e.target.value) || 1)}
            className="h-11 w-16 border-x border-slate-700 bg-transparent text-center font-mono text-base font-semibold tabular-nums text-white focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
        )}
        <button
          type="button"
          onClick={() => onChange(value + step)}
          aria-label={increaseLabel}
          className="grid h-11 w-11 place-items-center rounded-r-xl text-slate-200 transition hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300"
        >
          <Plus aria-hidden className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

function NumberField({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (value: number) => void
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-300">{label}</span>
      <input
        type="number"
        inputMode="decimal"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => {
          const next = Number(e.target.value)
          if (Number.isFinite(next)) onChange(Math.min(max, Math.max(min, next)))
        }}
        className="mt-2 block h-11 w-36 rounded-xl border border-slate-700 bg-slate-900 px-3 font-mono text-base font-semibold tabular-nums text-white focus:border-emerald-300 focus:outline-none"
      />
    </label>
  )
}
