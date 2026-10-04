"use client"

// Uitgebreide calculator: alle knoppen zelf instellen (materiaal, kwaliteit, gewicht, printtijd, aantal,
// verzending, scan en ontwerp). Rekent enkel met PublicRates, nooit met aankoopprijzen.
import { useMemo, useState } from "react"
import { ArrowRight, Minus, Plus } from "lucide-react"
import { MATERIALS, MATERIAL_ORDER, MATERIAL_SLUGS, type MaterialKey } from "@/lib/materials"
import {
  DEFAULT_DESIGN_RATE_EUR_PER_HOUR,
  GRAMS_PER_TIER,
  PRINT_TIME_HOURS_PER_TIER,
  calculateDeliveryCost,
  calculatePublicPrintJob,
  floorPublicEur,
  type DeliveryType,
  type PublicRates,
  type Quality,
  type Tier,
} from "@/lib/pricing-public"
import { trackEvent } from "@/lib/analytics"
import type { Locale } from "@/lib/i18n/locales"
import { localizeHref } from "@/lib/i18n/paths"
import { SCAN_PRICES } from "@/lib/scanning-prices"
import { cn } from "@/lib/utils"

type Props = {
  locale?: Locale
  rates: PublicRates
}

type EstimatorMaterial = { id: string; label: string; page?: MaterialKey; group: "pla" | "petg" | "technical" | "flex" }

// Leesbare namen: afkortingen uitgeschreven zoals klanten ze kennen.
const LABEL_OVERRIDES: Partial<Record<string, { nl: string; en: string }>> = {
  PC: { nl: "Polycarbonaat", en: "Polycarbonate" },
  PC_FR: { nl: "Polycarbonaat FR (brandvertragend)", en: "Polycarbonate FR (flame retardant)" },
  PLA_CF: { nl: "PLA Carbon Fibre", en: "PLA Carbon Fibre" },
  TPU: { nl: "TPU (flexibel)", en: "TPU (flexible)" },
}

const GUIDE_ONLY: Array<{ id: string; label: { nl: string; en: string }; group: EstimatorMaterial["group"] }> = [
  { id: "ASA", label: { nl: "ASA", en: "ASA" }, group: "technical" },
  { id: "ASA_CF", label: { nl: "ASA Carbon Fibre", en: "ASA Carbon Fibre" }, group: "technical" },
  { id: "PAHT_CF", label: { nl: "Nylon Carbon Fibre (PAHT-CF)", en: "Nylon Carbon Fibre (PAHT-CF)" }, group: "technical" },
]

function groupOf(key: MaterialKey): EstimatorMaterial["group"] {
  if (key === "TPU") return "flex"
  if (key === "PETG") return "petg"
  if (key === "PC" || key === "PC_FR") return "technical"
  return "pla"
}

const SIZE_CM: Record<Tier, number> = { Small: 5, Medium: 10, Large: 20 }

// Printtijd afleiden uit gewicht en grootte, op basis van de drie referentieformaten.
function estimatePrintHours(weightGrams: number, sizeCm: number): number {
  const points = (["Small", "Medium", "Large"] as Tier[]).map((t) => ({
    w: GRAMS_PER_TIER[t],
    s: SIZE_CM[t],
    h: PRINT_TIME_HOURS_PER_TIER[t],
  }))
  const interpolate = (x: number, xs: number[], ys: number[]) => {
    if (x <= xs[0]) return ys[0] * (x / xs[0])
    for (let i = 0; i < xs.length - 1; i++) {
      if (x <= xs[i + 1]) return ys[i] + ((ys[i + 1] - ys[i]) * (x - xs[i])) / (xs[i + 1] - xs[i])
    }
    const n = xs.length - 1
    return ys[n] + ((ys[n] - ys[n - 1]) / (xs[n] - xs[n - 1])) * (x - xs[n])
  }
  const hs = points.map((p) => p.h)
  const fromWeight = interpolate(weightGrams, points.map((p) => p.w), hs)
  const fromSize = interpolate(sizeCm, points.map((p) => p.s), hs)
  return Math.max(0.5, Math.round(((fromWeight + fromSize) / 2) * 2) / 2)
}

const COPY = {
  nl: {
    title: "Uitgebreide calculator",
    intro: "Stel alles zelf in. Handig als je het gewicht en de printtijd uit je slicer kent, of als je print, scan en ontwerp wil combineren.",
    services: "Wat heb je nodig?",
    print: "3D printen",
    scan: "3D scannen",
    design: "Ontwerp of natekenen",
    printTitle: "Printen",
    material: "Materiaal",
    groups: { pla: "PLA", petg: "PETG", technical: "Technisch en buiten", flex: "Flexibel" },
    materialLink: (label: string) => `Meer over ${label}`,
    quality: "Laagdikte",
    qualities: {
      Standaard: { label: "Standaard", hint: "Functionele stukken" },
      Fijn: { label: "Fijn", hint: "Zichtwerk, strakkere rondingen" },
      Ultra: { label: "Ultrafijn", hint: "Fijnste detail" },
    } satisfies Record<Quality, { label: string; hint: string }>,
    size: "Formaat",
    sizes: { Small: "Klein (± 5 cm)", Medium: "Middelgroot (± 10 cm)", Large: "Groot (± 20 cm)" } satisfies Record<Tier, string>,
    weight: "Gewicht per stuk (g)",
    longest: "Langste zijde (cm)",
    hours: "Printtijd per stuk (uur)",
    hoursAuto: "Geschat uit gewicht en grootte.",
    hoursManual: "Zelf ingevuld.",
    hoursReset: "Opnieuw schatten",
    quantity: "Aantal stuks",
    delivery: "Levering",
    pickup: "Gratis afhalen (afhaalbox Herzele, 24 op 7)",
    shipping: "Verzenden",
    scanTitle: "3D scannen",
    scanType: "Wat wil je laten scannen?",
    scanQty: "Aantal scans",
    designTitle: "Ontwerp of natekenen",
    designHours: "Aantal uren",
    designHint: `EUR ${DEFAULT_DESIGN_RATE_EUR_PER_HOUR} per uur, één keer aangerekend, niet per stuk.`,
    less: "Minder",
    more: "Meer",
    summary: "Jouw richtprijs",
    lines: {
      print: (qty: number, label: string) => `Printen: ${qty} × ${label}`,
      drying: "inclusief droogtoeslag",
      perPiece: (amount: string) => `${amount} per stuk`,
      scan: (qty: number, label: string) => `${qty} × ${label}`,
      design: (hours: string) => `Ontwerp: ${hours} uur`,
      shipping: "Verzending",
      pickup: "Afhalen",
      free: "Gratis",
      onRequest: "Op aanvraag",
    },
    total: "Totaal",
    note: "Richtprijs. Btw niet toegepast (kleineondernemersregeling).",
    cta: "Vraag deze prijs aan",
    quoteIntro: "Richtprijs via de uitgebreide calculator",
    nothing: "Kies minstens één dienst.",
  },
  en: {
    title: "Detailed calculator",
    intro: "Set everything yourself. Handy if you know weight and print time from your slicer, or want to combine printing, scanning and design.",
    services: "What do you need?",
    print: "3D printing",
    scan: "3D scanning",
    design: "Design or redrawing",
    printTitle: "Printing",
    material: "Material",
    groups: { pla: "PLA", petg: "PETG", technical: "Technical and outdoor", flex: "Flexible" },
    materialLink: (label: string) => `More about ${label}`,
    quality: "Layer height",
    qualities: {
      Standaard: { label: "Standard", hint: "Functional parts" },
      Fijn: { label: "Fine", hint: "Visual work, smoother curves" },
      Ultra: { label: "Ultra fine", hint: "Finest detail" },
    } satisfies Record<Quality, { label: string; hint: string }>,
    size: "Size",
    sizes: { Small: "Small (± 5 cm)", Medium: "Medium (± 10 cm)", Large: "Large (± 20 cm)" } satisfies Record<Tier, string>,
    weight: "Weight per piece (g)",
    longest: "Longest side (cm)",
    hours: "Print time per piece (hours)",
    hoursAuto: "Estimated from weight and size.",
    hoursManual: "Entered by you.",
    hoursReset: "Estimate again",
    quantity: "Quantity",
    delivery: "Delivery",
    pickup: "Free pickup (pickup box Herzele, 24/7)",
    shipping: "Shipping",
    scanTitle: "3D scanning",
    scanType: "What would you like scanned?",
    scanQty: "Number of scans",
    designTitle: "Design or redrawing",
    designHours: "Hours",
    designHint: `EUR ${DEFAULT_DESIGN_RATE_EUR_PER_HOUR} per hour, charged once, not per piece.`,
    less: "Less",
    more: "More",
    summary: "Your guide price",
    lines: {
      print: (qty: number, label: string) => `Printing: ${qty} × ${label}`,
      drying: "including drying surcharge",
      perPiece: (amount: string) => `${amount} per piece`,
      scan: (qty: number, label: string) => `${qty} × ${label}`,
      design: (hours: string) => `Design: ${hours} hours`,
      shipping: "Shipping",
      pickup: "Pickup",
      free: "Free",
      onRequest: "On request",
    },
    total: "Total",
    note: "Guide price. No VAT charged (Belgian small business scheme).",
    cta: "Request this price",
    quoteIntro: "Guide price from the detailed calculator",
    nothing: "Pick at least one service.",
  },
} as const

const fieldClass =
  "mt-2 block h-11 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 text-base font-medium tabular-nums text-white focus:border-emerald-300 focus:outline-none"
const labelClass = "block text-sm font-medium text-slate-300"

export default function PriceEstimator({ locale = "nl", rates }: Props) {
  const isEn = locale === "en"
  const t = COPY[isEn ? "en" : "nl"]
  const euro = useMemo(
    () =>
      new Intl.NumberFormat(isEn ? "en-BE" : "nl-BE", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }),
    [isEn],
  )

  const materials: EstimatorMaterial[] = useMemo(
    () => [
      ...MATERIAL_ORDER.map((key) => ({
        id: key,
        label: LABEL_OVERRIDES[key]?.[isEn ? "en" : "nl"] ?? MATERIALS[key].name,
        page: key,
        group: groupOf(key),
      })),
      ...GUIDE_ONLY.map((m) => ({ id: m.id, label: m.label[isEn ? "en" : "nl"], group: m.group })),
    ],
    [isEn],
  )

  const [includePrint, setIncludePrint] = useState(true)
  const [includeScan, setIncludeScan] = useState(false)
  const [includeDesign, setIncludeDesign] = useState(false)
  const [materialId, setMaterialId] = useState("PLA_MATTE")
  const [quality, setQuality] = useState<Quality>("Standaard")
  const [tier, setTier] = useState<Tier | null>("Medium")
  const [grams, setGrams] = useState(GRAMS_PER_TIER.Medium)
  const [sizeCm, setSizeCm] = useState(SIZE_CM.Medium)
  const [manualHours, setManualHours] = useState<number | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [delivery, setDelivery] = useState<DeliveryType>("afhaling")
  const [scanKey, setScanKey] = useState(SCAN_PRICES[0]?.key ?? "small-object")
  const [scanQty, setScanQty] = useState(1)
  const [designHours, setDesignHours] = useState(1)

  const estimatedHours = tier && manualHours === null ? PRINT_TIME_HOURS_PER_TIER[tier] : estimatePrintHours(grams, sizeCm)
  const hours = manualHours ?? estimatedHours
  const material = materials.find((m) => m.id === materialId) ?? materials[0]

  const chooseTier = (next: Tier) => {
    setTier(next)
    setGrams(GRAMS_PER_TIER[next])
    setSizeCm(SIZE_CM[next])
    setManualHours(null)
  }

  const print = includePrint
    ? calculatePublicPrintJob({ grams, hours, material: material.id, quality, quantity }, rates)
    : null
  const printLine = print ? floorPublicEur(print.printsSubtotalEur) : 0
  const scan = SCAN_PRICES.find((s) => s.key === scanKey) ?? SCAN_PRICES[0]
  const scanLine = includeScan && scan ? scan.price * scanQty : 0
  const designLine = includeDesign ? floorPublicEur(designHours * DEFAULT_DESIGN_RATE_EUR_PER_HOUR) : 0
  const shippingLine = includePrint && delivery === "verzending" ? calculateDeliveryCost("verzending", grams * quantity) : 0
  const total = floorPublicEur(printLine + scanLine + designLine + (shippingLine ?? 0))
  const nothingSelected = !includePrint && !includeScan && !includeDesign

  const formatHours = (h: number) => (isEn ? String(h) : String(h).replace(".", ","))

  const quoteHref = useMemo(() => {
    const lines: string[] = [t.quoteIntro]
    if (includePrint) {
      lines.push(
        t.lines.print(quantity, material.label),
        `${grams} g, ${sizeCm} cm, ${formatHours(hours)} h, ${t.qualities[quality].label}`,
        `${t.delivery}: ${delivery === "afhaling" ? t.lines.pickup : t.lines.shipping}`,
      )
    }
    if (includeScan && scan) lines.push(t.lines.scan(scanQty, isEn ? scan.labelEn : scan.labelNl))
    if (includeDesign) lines.push(t.lines.design(formatHours(designHours)))
    lines.push(`${t.total}: ${euro.format(total)}`)
    const params = new URLSearchParams({
      material: includePrint ? material.label : includeScan ? (isEn ? "3D scanning" : "3D scannen") : t.design,
      quote: lines.join(" | "),
      quantity: String(quantity),
    })
    return localizeHref(`/contact?${params.toString()}`, locale)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [includePrint, includeScan, includeDesign, material, quantity, grams, sizeCm, hours, quality, delivery, scanQty, scan, designHours, total, locale])

  const toggleClass = (active: boolean) =>
    cn(
      "flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-semibold transition",
      "has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-emerald-300",
      active ? "border-emerald-300/80 bg-emerald-400/10 text-white" : "border-slate-700 bg-slate-900/60 text-slate-300 hover:border-slate-500",
    )

  return (
    <div className="grid gap-6 rounded-[1.75rem] bg-slate-950/60 p-5 text-slate-100 sm:p-7 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
      <div className="min-w-0">
        <h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl">{t.title}</h3>
        <p className="mt-2 max-w-[60ch] text-sm leading-6 text-slate-300">{t.intro}</p>

        <fieldset className="mt-6">
          <legend className={labelClass}>{t.services}</legend>
          <div className="mt-2 grid gap-2 sm:grid-cols-3">
            {[
              { label: t.print, active: includePrint, set: setIncludePrint },
              { label: t.scan, active: includeScan, set: setIncludeScan },
              { label: t.design, active: includeDesign, set: setIncludeDesign },
            ].map((service) => (
              <label key={service.label} className={toggleClass(service.active)}>
                <input
                  type="checkbox"
                  checked={service.active}
                  onChange={(e) => service.set(e.target.checked)}
                  className="h-4 w-4 accent-emerald-400"
                />
                {service.label}
              </label>
            ))}
          </div>
        </fieldset>

        {includePrint ? (
          <section className="mt-8 border-t border-slate-800 pt-6" aria-label={t.printTitle}>
            <h4 className="text-base font-semibold text-white">{t.printTitle}</h4>

            <div className="mt-4 grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className={labelClass}>{t.material}</span>
                <select
                  className={fieldClass}
                  value={material.id}
                  onChange={(e) => {
                    setMaterialId(e.target.value)
                    trackEvent({ action: "estimator_material", category: "pricing_estimator", label: e.target.value })
                  }}
                >
                  {(Object.keys(t.groups) as Array<keyof typeof t.groups>).map((group) => (
                    <optgroup key={group} label={t.groups[group]}>
                      {materials
                        .filter((m) => m.group === group)
                        .map((m) => (
                          <option key={m.id} value={m.id}>
                            {m.label}
                          </option>
                        ))}
                    </optgroup>
                  ))}
                </select>
                <a
                  href={localizeHref(material.page ? `/materials/${MATERIAL_SLUGS[material.page]}` : "/materials", locale)}
                  className="mt-2 inline-flex text-sm font-semibold text-emerald-300 underline decoration-emerald-300/40 underline-offset-4 hover:decoration-emerald-300"
                >
                  {t.materialLink(material.label)}
                </a>
              </label>

              <div>
                <span className={labelClass}>{t.quantity}</span>
                <NumberStepper label={t.quantity} value={quantity} min={1} max={999} step={1} onChange={setQuantity} lessLabel={t.less} moreLabel={t.more} />
              </div>
            </div>

            <fieldset className="mt-6">
              <legend className={labelClass}>{t.quality}</legend>
              <div className="mt-2 grid gap-2 sm:grid-cols-3">
                {(Object.keys(t.qualities) as Quality[]).map((q) => (
                  <label key={q} className={cn(toggleClass(quality === q), "flex-col items-start gap-0.5")}>
                    <input type="radio" name="estimator-quality" value={q} checked={quality === q} onChange={() => setQuality(q)} className="sr-only" />
                    <span>{t.qualities[q].label}</span>
                    <span className="text-xs font-normal text-slate-400">{t.qualities[q].hint}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-6">
              <legend className={labelClass}>{t.size}</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {(Object.keys(t.sizes) as Tier[]).map((s) => (
                  <button
                    key={s}
                    type="button"
                    aria-pressed={tier === s}
                    onClick={() => chooseTier(s)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300",
                      tier === s ? "border-emerald-300 bg-emerald-300 text-slate-950" : "border-slate-700 text-slate-300 hover:border-slate-500",
                    )}
                  >
                    {t.sizes[s]}
                  </button>
                ))}
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <label className="block">
                  <span className={labelClass}>{t.weight}</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    min={1}
                    value={grams}
                    onChange={(e) => {
                      setGrams(Math.max(1, Number(e.target.value) || 1))
                      setTier(null)
                    }}
                    className={fieldClass}
                  />
                </label>
                <label className="block">
                  <span className={labelClass}>{t.longest}</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    min={1}
                    step={0.5}
                    value={sizeCm}
                    onChange={(e) => {
                      setSizeCm(Math.max(1, Number(e.target.value) || 1))
                      setTier(null)
                    }}
                    className={fieldClass}
                  />
                </label>
                <label className="block">
                  <span className={labelClass}>{t.hours}</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    min={0.1}
                    step={0.5}
                    value={hours}
                    onChange={(e) => setManualHours(Math.max(0.1, Number(e.target.value) || 0.1))}
                    className={fieldClass}
                  />
                  <span className="mt-1 block text-xs text-slate-400">
                    {manualHours === null ? (
                      t.hoursAuto
                    ) : (
                      <>
                        {t.hoursManual}{" "}
                        <button type="button" onClick={() => setManualHours(null)} className="font-semibold text-emerald-300 underline underline-offset-2">
                          {t.hoursReset}
                        </button>
                      </>
                    )}
                  </span>
                </label>
              </div>
            </fieldset>

            <fieldset className="mt-6">
              <legend className={labelClass}>{t.delivery}</legend>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {(["afhaling", "verzending"] as DeliveryType[]).map((d) => (
                  <label key={d} className={toggleClass(delivery === d)}>
                    <input type="radio" name="estimator-delivery" value={d} checked={delivery === d} onChange={() => setDelivery(d)} className="sr-only" />
                    {d === "afhaling" ? t.pickup : t.shipping}
                  </label>
                ))}
              </div>
            </fieldset>
          </section>
        ) : null}

        {includeScan ? (
          <section className="mt-8 border-t border-slate-800 pt-6" aria-label={t.scanTitle}>
            <h4 className="text-base font-semibold text-white">{t.scanTitle}</h4>
            <div className="mt-4 grid gap-5 sm:grid-cols-[minmax(0,1fr)_auto]">
              <label className="block">
                <span className={labelClass}>{t.scanType}</span>
                <select className={fieldClass} value={scanKey} onChange={(e) => setScanKey(e.target.value)}>
                  {SCAN_PRICES.map((item) => (
                    <option key={item.key} value={item.key}>
                      {isEn ? item.labelEn : item.labelNl}: {euro.format(item.price)}
                    </option>
                  ))}
                </select>
              </label>
              <div>
                <span className={labelClass}>{t.scanQty}</span>
                <NumberStepper label={t.scanQty} value={scanQty} min={1} max={50} step={1} onChange={setScanQty} lessLabel={t.less} moreLabel={t.more} />
              </div>
            </div>
          </section>
        ) : null}

        {includeDesign ? (
          <section className="mt-8 border-t border-slate-800 pt-6" aria-label={t.designTitle}>
            <h4 className="text-base font-semibold text-white">{t.designTitle}</h4>
            <div className="mt-4">
              <span className={labelClass}>{t.designHours}</span>
              <NumberStepper
                label={t.designHours}
                value={designHours}
                min={0.5}
                max={40}
                step={0.5}
                onChange={setDesignHours}
                lessLabel={t.less}
                moreLabel={t.more}
                format={formatHours}
              />
              <span className="mt-2 block text-xs text-slate-400">{t.designHint}</span>
            </div>
          </section>
        ) : null}
      </div>

      <aside className="rounded-3xl border border-emerald-300/40 bg-[linear-gradient(160deg,rgba(16,185,129,0.14),rgba(15,23,42,0.9)_55%)] p-6 lg:sticky lg:top-28">
        <h4 className="text-sm font-semibold text-emerald-300">{t.summary}</h4>
        {nothingSelected ? (
          <p className="mt-4 text-sm text-slate-300">{t.nothing}</p>
        ) : (
          <>
            <dl className="mt-4 space-y-3 text-sm">
              {includePrint && print ? (
                <div>
                  <div className="flex items-baseline justify-between gap-3">
                    <dt className="text-slate-300">{t.lines.print(quantity, material.label)}</dt>
                    <dd className="shrink-0 font-semibold tabular-nums text-white">{euro.format(printLine)}</dd>
                  </div>
                  <p className="mt-0.5 text-xs text-slate-400">
                    {quantity > 1 ? t.lines.perPiece(euro.format(floorPublicEur(printLine / quantity))) : null}
                    {quantity > 1 && print.dryingCostEur > 0 ? ", " : null}
                    {print.dryingCostEur > 0 ? t.lines.drying : null}
                  </p>
                </div>
              ) : null}
              {includeScan && scan ? (
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="text-slate-300">{t.lines.scan(scanQty, isEn ? scan.labelEn : scan.labelNl)}</dt>
                  <dd className="shrink-0 font-semibold tabular-nums text-white">{euro.format(scanLine)}</dd>
                </div>
              ) : null}
              {includeDesign ? (
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="text-slate-300">{t.lines.design(formatHours(designHours))}</dt>
                  <dd className="shrink-0 font-semibold tabular-nums text-white">{euro.format(designLine)}</dd>
                </div>
              ) : null}
              {includePrint ? (
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="text-slate-300">{delivery === "afhaling" ? t.lines.pickup : t.lines.shipping}</dt>
                  <dd className="shrink-0 font-semibold tabular-nums text-white">
                    {delivery === "afhaling" ? t.lines.free : shippingLine === null ? t.lines.onRequest : euro.format(shippingLine)}
                  </dd>
                </div>
              ) : null}
            </dl>
            <div className="mt-5 flex items-baseline justify-between gap-3 border-t border-slate-700 pt-4">
              <span className="text-sm font-semibold text-white">{t.total}</span>
              <span className="text-4xl font-bold tracking-tight tabular-nums text-white">{euro.format(total)}</span>
            </div>
            <p className="mt-2 text-xs text-slate-400">{t.note}</p>
            <a
              href={quoteHref}
              onClick={() => trackEvent({ action: "cta_click", category: "pricing_estimator", label: "quote" })}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-300 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
            >
              {t.cta}
              <ArrowRight aria-hidden className="h-4 w-4" />
            </a>
          </>
        )}
      </aside>
    </div>
  )
}

function NumberStepper({
  label,
  value,
  min,
  max,
  step,
  onChange,
  lessLabel,
  moreLabel,
  format,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (value: number) => void
  lessLabel: string
  moreLabel: string
  format?: (value: number) => string
}) {
  const clamp = (v: number) => Math.min(max, Math.max(min, v))
  return (
    <span className="mt-2 inline-flex items-center rounded-xl border border-slate-700 bg-slate-900">
      <button
        type="button"
        onClick={() => onChange(clamp(value - step))}
        aria-label={lessLabel}
        className="grid h-11 w-11 place-items-center rounded-l-xl text-slate-200 transition hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300"
      >
        <Minus aria-hidden className="h-4 w-4" />
      </button>
      {format ? (
        <output aria-live="polite" aria-label={label} className="min-w-[4rem] px-2 text-center text-base font-semibold tabular-nums text-white">
          {format(value)}
        </output>
      ) : (
        <input
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          value={value}
          aria-label={label}
          onChange={(e) => onChange(clamp(Number(e.target.value) || min))}
          className="h-11 w-16 border-x border-slate-700 bg-transparent text-center text-base font-semibold tabular-nums text-white focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
      )}
      <button
        type="button"
        onClick={() => onChange(clamp(value + step))}
        aria-label={moreLabel}
        className="grid h-11 w-11 place-items-center rounded-r-xl text-slate-200 transition hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300"
      >
        <Plus aria-hidden className="h-4 w-4" />
      </button>
    </span>
  )
}
