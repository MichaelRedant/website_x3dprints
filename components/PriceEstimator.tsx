"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { MATERIALS } from "@/lib/materials"
import {
  DEFAULT_DESIGN_RATE_EUR_PER_HOUR,
  GRAMS_PER_TIER,
  PRINT_TIME_HOURS_PER_TIER,
  calculatePrintJob,
  type Quality,
  type Tier,
} from "@/lib/pricing"
import type { Locale } from "@/lib/i18n/locales"
import { localizeHref } from "@/lib/i18n/paths"
import { SCAN_PRICES } from "@/lib/scanning-prices"

type MaterialKey = keyof typeof MATERIALS

type Props = {
  locale?: Locale
}

function safeMaterialKey(key: string): MaterialKey {
  return (Object.prototype.hasOwnProperty.call(MATERIALS, key)
    ? key
    : "PLA_MATTE") as MaterialKey
}

const SIZE_CM_PER_TIER: Record<Tier, number> = {
  Small: 5,
  Medium: 10,
  Large: 20,
}

const PRESET_POINTS = [
  { size: 5, weight: 50, hours: 2 },
  { size: 10, weight: 200, hours: 6.5 },
  { size: 20, weight: 500, hours: 15 },
]

const QUALITY_LABELS: Record<Quality, { nl: string; en: string }> = {
  Standaard: { nl: "Standaard", en: "Standard" },
  Fijn: { nl: "Fijn", en: "Fine" },
  Ultra: { nl: "Ultra", en: "Ultra" },
}

const inputClass =
  "h-12 rounded-2xl border border-slate-300 bg-white px-3 text-sm font-medium text-slate-900 shadow-sm outline-none ring-0 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10"

const routeCardClass = (active: boolean) =>
  [
    "flex min-h-32 cursor-pointer gap-3 rounded-3xl border p-4 transition sm:p-5",
    active
      ? "border-emerald-400 bg-emerald-50 shadow-[0_16px_36px_rgba(16,185,129,0.18)]"
      : "border-slate-200 bg-white/80 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm",
  ].join(" ")

function clampNumber(value: string, min: number, fallback: number) {
  const parsed = Number(value)
  if (!Number.isFinite(parsed)) return fallback
  return Math.max(min, parsed)
}

function interpolateHours(value: number, points: Array<{ x: number; y: number }>): number {
  const sorted = [...points].sort((a, b) => a.x - b.x)
  if (value <= sorted[0].x) return sorted[0].y * (value / Math.max(sorted[0].x, 1))
  for (let i = 0; i < sorted.length - 1; i++) {
    const a = sorted[i]
    const b = sorted[i + 1]
    if (value <= b.x) {
      const t = (value - a.x) / Math.max(b.x - a.x, 1)
      return a.y + (b.y - a.y) * t
    }
  }
  const last = sorted[sorted.length - 1]
  const prev = sorted[sorted.length - 2]
  const slope = (last.y - prev.y) / Math.max(last.x - prev.x, 1)
  return last.y + (value - last.x) * slope
}

function estimatePrintHours(weightGrams: number, sizeCm: number): number {
  const hoursFromWeight = interpolateHours(weightGrams, PRESET_POINTS.map((p) => ({ x: p.weight, y: p.hours })))
  const hoursFromSize =
    sizeCm > 0 ? interpolateHours(sizeCm, PRESET_POINTS.map((p) => ({ x: p.size, y: p.hours }))) : null
  const blended = hoursFromSize ? (hoursFromWeight + hoursFromSize) / 2 : hoursFromWeight
  return Math.max(0.5, blended)
}

export default function PriceEstimator({ locale = "nl" }: Props) {
  const isEn = locale === "en"
  const copy = isEn
    ? {
        badge: "Pricing tool",
        title: "Project calculator for print, scan and CAD",
        intro:
          "Choose whether your project needs printing, scanning, CAD modelling or a scan-to-print route. The estimate combines the selected services into one realistic project budget.",
        labels: {
          route: "What do you need?",
          printRoute: "3D printing",
          scanRoute: "3D scanning",
          modelRoute: "3D modelling / CAD",
          scanType: "Scan type",
          scanQty: "Number of scans",
          modelHours: "Modelling hours",
          preset: "Size preset",
          material: "Material",
          quality: "Quality",
          weight: "Weight per piece (g)",
          size: "Longest side (cm)",
          qty: "Quantity",
        },
        help: {
          drying: "Drying included for TPU/PLA Wood/PETG/PC/PC FR.",
          scanFile: "The agreed digital scan file is included.",
          modelRate: `CAD and modelling are estimated at EUR ${DEFAULT_DESIGN_RATE_EUR_PER_HOUR}/hour.`,
          oneTime: "Scanning and CAD/modelling are one-time quote items, not multiplied by print quantity.",
        },
        cards: {
          projectTotal: "Project total",
          print: "3D printing",
          scan: "3D scanning",
          modeling: "CAD / modelling",
          route: "Selected route",
          perPiece: "Print estimate per piece",
          includes: "Includes",
          basedOn: "Based on",
          pieces: "pcs",
          notSelected: "Not selected",
        },
        summary: {
          route: "Route",
          perPiece: "Per piece",
          total: "Project total",
          printSubtotal: "Print subtotal",
          scan: "3D scan",
          modeling: "CAD/modelling",
          oneTime: "one-time quote item",
          size: "Size",
          weight: "Weight",
          material: "Material",
          quality: "Quality",
          pieces: "pcs",
          longestSide: "longest side",
          hours: "hours",
        },
        cta: {
          nextStep: "Ready for a precise quote?",
          send: "Send this estimate",
          note:
            "Guideline price excl. VAT and delivery. Final quote after model, object or scan review.",
        },
      }
    : {
        badge: "Prijscalculator",
        title: "Projectcalculator voor print, scan en CAD",
        intro:
          "Kies of je project printen, scannen, CAD-modelleren of een scan-to-print route nodig heeft. De calculator telt de geselecteerde diensten samen tot een realistische projectindicatie.",
        labels: {
          route: "Wat heb je nodig?",
          printRoute: "3D printen",
          scanRoute: "3D scannen",
          modelRoute: "3D modelleren / CAD",
          scanType: "Type scan",
          scanQty: "Aantal scans",
          modelHours: "Modelleeruren",
          preset: "Formaat preset",
          material: "Materiaal",
          quality: "Kwaliteit",
          weight: "Gewicht per stuk (g)",
          size: "Langste maat (cm)",
          qty: "Aantal stuks",
        },
        help: {
          drying: "Droogbehandeling inbegrepen voor TPU/PLA Wood/PETG/PC/PC FR.",
          scanFile: "Het afgesproken digitale scanbestand is inbegrepen.",
          modelRate: `CAD en modelleren worden geschat aan EUR ${DEFAULT_DESIGN_RATE_EUR_PER_HOUR}/uur.`,
          oneTime: "Scannen en CAD/modelleren zijn eenmalige offerteposten, niet per geprint stuk.",
        },
        cards: {
          projectTotal: "Projecttotaal",
          print: "3D printen",
          scan: "3D scannen",
          modeling: "CAD / modelleren",
          route: "Gekozen route",
          perPiece: "Printindicatie per stuk",
          includes: "Incl.",
          basedOn: "Op basis van",
          pieces: "st",
          notSelected: "Niet geselecteerd",
        },
        summary: {
          route: "Route",
          perPiece: "Per stuk",
          total: "Projecttotaal",
          printSubtotal: "Print subtotaal",
          scan: "3D scan",
          modeling: "CAD/modelleren",
          oneTime: "eenmalige offertepost",
          size: "Formaat",
          weight: "Gewicht",
          material: "Materiaal",
          quality: "Kwaliteit",
          pieces: "st",
          longestSide: "langste zijde",
          hours: "uur",
        },
        cta: {
          nextStep: "Klaar voor een exacte offerte?",
          send: "Verstuur deze inschatting",
          note: "Richtprijs excl. btw en levering. Finale offerte na controle van model, object of scanvraag.",
        },
      }

  const euro = useMemo(
    () =>
      new Intl.NumberFormat(isEn ? "en-BE" : "nl-BE", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
      }),
    [isEn],
  )

  const defaultMaterial: MaterialKey = "PLA_MATTE"
  const [tier, setTier] = useState<Tier>("Medium")
  const [material, setMaterial] = useState<MaterialKey>(defaultMaterial)
  const [quality, setQuality] = useState<Quality>("Standaard")
  const [qty, setQty] = useState<number>(1)
  const [weight, setWeight] = useState<number>(GRAMS_PER_TIER[tier])
  const [sizeCm, setSizeCm] = useState<number>(SIZE_CM_PER_TIER[tier])
  const [printHours, setPrintHours] = useState<number>(PRINT_TIME_HOURS_PER_TIER[tier])
  const [includePrint, setIncludePrint] = useState(true)
  const [includeScan, setIncludeScan] = useState(false)
  const [includeModeling, setIncludeModeling] = useState(false)
  const [scanKey, setScanKey] = useState(SCAN_PRICES[0]?.key ?? "small-object")
  const [scanQty, setScanQty] = useState(1)
  const [modelHours, setModelHours] = useState(1)

  useEffect(() => {
    setWeight(GRAMS_PER_TIER[tier])
    setSizeCm(SIZE_CM_PER_TIER[tier])
    setPrintHours(PRINT_TIME_HOURS_PER_TIER[tier])
  }, [tier])

  useEffect(() => {
    setPrintHours(estimatePrintHours(Math.max(1, weight), Math.max(1, sizeCm)))
  }, [weight, sizeCm])

  const printBreakdown = useMemo(
    () =>
      includePrint
        ? calculatePrintJob({
            filamentWeightGrams: Math.max(1, weight),
            printingTimeHours: Math.max(0.1, printHours),
            material,
            quality,
            quantity: Math.max(1, qty),
          })
        : null,
    [includePrint, weight, printHours, material, quality, qty],
  )

  const qualityLabel = QUALITY_LABELS[quality]?.[isEn ? "en" : "nl"] ?? quality
  const selectedScan = SCAN_PRICES.find((item) => item.key === scanKey) ?? SCAN_PRICES[0]
  const selectedScanLabel = selectedScan ? (isEn ? selectedScan.labelEn : selectedScan.labelNl) : ""
  const scanCost = includeScan && selectedScan ? selectedScan.price * Math.max(1, scanQty) : 0
  const modelingCost = includeModeling ? Math.max(0.25, modelHours) * DEFAULT_DESIGN_RATE_EUR_PER_HOUR : 0
  const printSubtotal = printBreakdown?.totalEur ?? 0
  const projectTotal = printSubtotal + scanCost + modelingCost
  const projectPerPiece = includePrint ? projectTotal / Math.max(1, qty) : projectTotal

  const setRoute = (route: "print" | "scan" | "model", active: boolean) => {
    const activeCount = Number(includePrint) + Number(includeScan) + Number(includeModeling)
    if (!active && activeCount <= 1) return
    if (route === "print") setIncludePrint(active)
    if (route === "scan") setIncludeScan(active)
    if (route === "model") setIncludeModeling(active)
  }

  const selectedRoutes = [
    includePrint ? copy.labels.printRoute : null,
    includeScan ? copy.labels.scanRoute : null,
    includeModeling ? copy.labels.modelRoute : null,
  ].filter(Boolean)
  const routeSummary = selectedRoutes.join(" + ")

  const quoteSummary = useMemo(() => {
    const parts = [
      `${copy.summary.route}: ${routeSummary}`,
      `${copy.summary.total}: EUR ${projectTotal.toFixed(2)}`,
    ]
    if (includePrint && printBreakdown) {
      parts.push(
        `${copy.summary.perPiece}: EUR ${projectPerPiece.toFixed(2)} (${printBreakdown.input.quantity} ${copy.summary.pieces})`,
        `${copy.summary.printSubtotal}: EUR ${printSubtotal.toFixed(2)}`,
        `${copy.summary.size}: ~${sizeCm} cm ${copy.summary.longestSide} | ${copy.summary.weight}: ~${weight} g`,
        `${copy.summary.material}: ${materialLabel(material)} | ${copy.summary.quality}: ${qualityLabel}`,
      )
    }
    if (includeScan && selectedScan) {
      parts.push(
        `${copy.summary.scan}: ${selectedScanLabel} x ${Math.max(1, scanQty)} = EUR ${scanCost.toFixed(2)} (${copy.summary.oneTime})`,
      )
    }
    if (includeModeling) {
      parts.push(
        `${copy.summary.modeling}: ${Math.max(0.25, modelHours)} ${copy.summary.hours} x EUR ${DEFAULT_DESIGN_RATE_EUR_PER_HOUR} = EUR ${modelingCost.toFixed(2)} (${copy.summary.oneTime})`,
      )
    }
    return parts.join(" | ")
  }, [
    copy.summary.hours,
    copy.summary.modeling,
    copy.summary.printSubtotal,
    copy.summary.route,
    copy.summary.scan,
    copy.summary.oneTime,
    copy.summary.perPiece,
    copy.summary.pieces,
    copy.summary.material,
    copy.summary.quality,
    copy.summary.size,
    copy.summary.total,
    copy.summary.weight,
    copy.summary.longestSide,
    includeModeling,
    includePrint,
    includeScan,
    modelHours,
    modelingCost,
    printBreakdown,
    printSubtotal,
    projectPerPiece,
    projectTotal,
    routeSummary,
    scanCost,
    scanQty,
    selectedScan,
    selectedScanLabel,
    sizeCm,
    weight,
    material,
    qualityLabel,
  ])

  const contactHref = useMemo(() => {
    const materialContext = includePrint
      ? materialLabel(material)
      : includeScan
        ? isEn
          ? "3D scanning"
          : "3D scannen"
        : isEn
          ? "3D modelling / CAD"
          : "3D modelleren / CAD"
    const href = `/contact?material=${encodeURIComponent(materialContext)}&quote=${encodeURIComponent(quoteSummary)}`
    return localizeHref(href, locale)
  }, [includePrint, includeScan, isEn, material, quoteSummary, locale])

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-emerald-200/70 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.22),transparent_34%),linear-gradient(135deg,#f8fafc,#ecfeff_52%,#f0fdf4)] p-1 shadow-[0_24px_70px_rgba(15,23,42,0.16)]">
      <div aria-hidden className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full bg-cyan-300/35 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-20 left-10 h-56 w-56 rounded-full bg-emerald-300/25 blur-3xl" />
      <div className="relative rounded-[1.75rem] bg-white/95 p-5 backdrop-blur sm:p-7 lg:p-8">
        <div className="grid gap-5 lg:grid-cols-[1fr_22rem] lg:items-start">
          <div>
            <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-800">
              {copy.badge}
            </span>
            <h3 className="mt-3 max-w-3xl text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
              {copy.title}
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">{copy.intro}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-slate-950 px-3 py-1.5 text-xs font-semibold text-white">
                {copy.labels.printRoute}
              </span>
              <span className="rounded-full bg-cyan-100 px-3 py-1.5 text-xs font-semibold text-cyan-900">
                {copy.help.scanFile}
              </span>
              <span className="rounded-full bg-amber-100 px-3 py-1.5 text-xs font-semibold text-amber-950">
                {copy.help.modelRate}
              </span>
              <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                {copy.help.oneTime}
              </span>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-900 bg-slate-950 p-5 text-white shadow-[0_22px_50px_rgba(15,23,42,0.28)]">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">{copy.cards.projectTotal}</div>
            <div className="mt-2 text-4xl font-black tracking-tight">{euro.format(projectTotal)}</div>
            <div className="mt-3 rounded-2xl border border-white/10 bg-white/10 p-3">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">{copy.cards.route}</div>
              <div className="mt-1 text-sm font-semibold text-white">{routeSummary}</div>
              <div className="mt-1 text-xs text-slate-300">
                {includePrint ? `${euro.format(projectPerPiece)} ${copy.summary.perPiece.toLowerCase()}` : copy.cards.basedOn}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50/90 p-4 shadow-inner">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{copy.labels.route}</p>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            <label className={routeCardClass(includePrint)}>
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                checked={includePrint}
                onChange={(event) => setRoute("print", event.target.checked)}
              />
              <span>
                <span className="block text-sm font-semibold text-slate-900">{copy.labels.printRoute}</span>
                <span className="mt-1 block text-xs text-slate-600">
                  {isEn ? "Material, quality, size and quantity." : "Materiaal, kwaliteit, formaat en aantal."}
                </span>
              </span>
            </label>
            <label className={routeCardClass(includeScan)}>
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                checked={includeScan}
                onChange={(event) => setRoute("scan", event.target.checked)}
              />
              <span>
                <span className="block text-sm font-semibold text-slate-900">{copy.labels.scanRoute}</span>
                <span className="mt-1 block text-xs text-slate-600">{copy.help.scanFile}</span>
                <span className="mt-2 inline-flex rounded-full bg-cyan-100 px-2.5 py-1 text-[11px] font-semibold text-cyan-900">
                  {copy.summary.oneTime}
                </span>
              </span>
            </label>
            <label className={routeCardClass(includeModeling)}>
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                checked={includeModeling}
                onChange={(event) => setRoute("model", event.target.checked)}
              />
              <span>
                <span className="block text-sm font-semibold text-slate-900">{copy.labels.modelRoute}</span>
                <span className="mt-1 block text-xs text-slate-600">{copy.help.modelRate}</span>
                <span className="mt-2 inline-flex rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-semibold text-amber-950">
                  {copy.summary.oneTime}
                </span>
              </span>
            </label>
          </div>
        </div>

        {includePrint ? (
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600">{copy.labels.preset}</label>
              <select className={inputClass} value={tier} onChange={(e) => setTier(e.target.value as Tier)}>
                <option value="Small">Small (~5 cm, {GRAMS_PER_TIER.Small}g)</option>
                <option value="Medium">Medium (~10 cm, {GRAMS_PER_TIER.Medium}g)</option>
                <option value="Large">Large (~20 cm, {GRAMS_PER_TIER.Large}g)</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600">{copy.labels.material}</label>
              <select className={inputClass} value={material} onChange={(e) => setMaterial(safeMaterialKey(e.target.value))}>
                {Object.entries(MATERIALS).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v.name}
                  </option>
                ))}
              </select>
              <span className="text-[11px] text-slate-500">{copy.help.drying}</span>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600">{copy.labels.quality}</label>
              <select className={inputClass} value={quality} onChange={(e) => setQuality(e.target.value as Quality)}>
                <option value="Standaard">{QUALITY_LABELS.Standaard[isEn ? "en" : "nl"]}</option>
                <option value="Fijn">{QUALITY_LABELS.Fijn[isEn ? "en" : "nl"]}</option>
                <option value="Ultra">{QUALITY_LABELS.Ultra[isEn ? "en" : "nl"]}</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600">{copy.labels.weight}</label>
              <input
                type="number"
                min={1}
                className={inputClass}
                value={weight}
                onChange={(e) => setWeight(clampNumber(e.target.value, 1, 1))}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600">{copy.labels.size}</label>
              <input
                type="number"
                min={1}
                step={0.5}
                className={inputClass}
                value={sizeCm}
                onChange={(e) => setSizeCm(clampNumber(e.target.value, 1, 1))}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600">{copy.labels.qty}</label>
              <input
                type="number"
                min={1}
                className={inputClass}
                value={qty}
                onChange={(e) => setQty(clampNumber(e.target.value, 1, 1))}
              />
            </div>
          </div>
        ) : null}

        {includeScan || includeModeling ? (
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {includeScan ? (
              <>
                <div className="flex flex-col gap-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-600">{copy.labels.scanType}</label>
                  <select className={inputClass} value={scanKey} onChange={(e) => setScanKey(e.target.value)}>
                    {SCAN_PRICES.map((item) => (
                      <option key={item.key} value={item.key}>
                        {isEn ? item.labelEn : item.labelNl} - EUR {item.price.toFixed(2)}
                      </option>
                    ))}
                  </select>
                  <span className="text-[11px] text-slate-500">{copy.help.scanFile}</span>
                  <span className="text-[11px] font-semibold text-cyan-800">{copy.help.oneTime}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-slate-600">{copy.labels.scanQty}</label>
                  <input
                    type="number"
                    min={1}
                    className={inputClass}
                    value={scanQty}
                    onChange={(e) => setScanQty(clampNumber(e.target.value, 1, 1))}
                  />
                </div>
              </>
            ) : null}

            {includeModeling ? (
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-600">{copy.labels.modelHours}</label>
                <input
                  type="number"
                  min={0.25}
                  step={0.25}
                  className={inputClass}
                  value={modelHours}
                  onChange={(e) => setModelHours(clampNumber(e.target.value, 0.25, 1))}
                />
                <span className="text-[11px] text-slate-500">{copy.help.modelRate}</span>
                <span className="text-[11px] font-semibold text-amber-800">{copy.help.oneTime}</span>
              </div>
            ) : null}
          </div>
        ) : null}

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs uppercase tracking-wide text-slate-500">{copy.cards.print}</div>
            <div className="mt-1 text-2xl font-semibold text-slate-900">{printBreakdown ? euro.format(printSubtotal) : "-"}</div>
            <div className="text-xs text-slate-500">
              {printBreakdown
                ? `${printBreakdown.input.quantity} ${copy.cards.pieces} / ${materialLabel(material)}`
                : copy.cards.notSelected}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs uppercase tracking-wide text-slate-500">{copy.cards.scan}</div>
            <div className="mt-1 text-2xl font-semibold text-slate-900">{includeScan ? euro.format(scanCost) : "-"}</div>
            <div className="text-xs text-slate-500">{includeScan ? selectedScanLabel : copy.cards.notSelected}</div>
            {includeScan ? <div className="mt-2 text-xs font-semibold text-cyan-800">{copy.summary.oneTime}</div> : null}
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs uppercase tracking-wide text-slate-500">{copy.cards.modeling}</div>
            <div className="mt-1 text-2xl font-semibold text-slate-900">{includeModeling ? euro.format(modelingCost) : "-"}</div>
            <div className="text-xs text-slate-500">
              {includeModeling
                ? `${Math.max(0.25, modelHours)} ${copy.summary.hours} x EUR ${DEFAULT_DESIGN_RATE_EUR_PER_HOUR}`
                : copy.cards.notSelected}
            </div>
            {includeModeling ? <div className="mt-2 text-xs font-semibold text-amber-800">{copy.summary.oneTime}</div> : null}
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-slate-900 bg-slate-950 p-4 text-white shadow-[0_18px_45px_rgba(15,23,42,0.22)] sm:flex sm:items-center sm:justify-between sm:gap-4">
          <div>
            <p className="text-sm font-semibold">{copy.cta.nextStep}</p>
            <p className="mt-1 text-xs text-slate-300">{copy.cta.note}</p>
          </div>
          <Link
            href={contactHref}
            className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-bold text-slate-950 shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-300 sm:mt-0 sm:w-auto"
          >
            {copy.cta.send}
          </Link>
        </div>
      </div>
    </div>
  )
}

function materialLabel(key: MaterialKey): string {
  return MATERIALS[key]?.name ?? key
}
