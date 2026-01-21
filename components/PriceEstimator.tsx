"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { MATERIALS } from "@/lib/materials"
import {
  GRAMS_PER_TIER,
  PRINT_TIME_HOURS_PER_TIER,
  calculatePrintJob,
  type Quality,
  type Tier,
} from "@/lib/pricing"
import type { Locale } from "@/lib/i18n/locales"
import { localizeHref } from "@/lib/i18n/paths"

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
        title: "Quick price estimate",
        intro:
          "Our estimator gives you clear starting prices based on size, weight and material usage. Enter the estimated weight and the longest dimension to see a realistic per-piece and batch estimate. We confirm final pricing after a short model review so you know the exact cost and quality.",
        labels: {
          preset: "Size preset",
          material: "Material",
          quality: "Quality",
          weight: "Weight per piece (g)",
          size: "Longest side (cm)",
          qty: "Quantity",
        },
        help: {
          drying: "Drying included for TPU/PLA Wood/PETG/PC/PC FR.",
        },
        cards: {
          perPiece: "Estimate per piece",
          total: "Total (excl. delivery)",
          includes: "Includes",
          basedOn: "Based on",
          pieces: "pcs",
        },
        summary: {
          perPiece: "Per piece",
          total: "Total",
          size: "Size",
          weight: "Weight",
          material: "Material",
          quality: "Quality",
          pieces: "pcs",
          longestSide: "longest side",
        },
        cta: {
          send: "Send this estimate",
          note:
            "Guideline price excl. VAT, design time and any premium STL files. Final quote after model review.",
        },
      }
    : {
        title: "Snelle prijsinschatting",
        intro:
          "Onze prijsschatting geeft je duidelijke vanafprijzen op basis van formaat, gewicht en materiaalverbruik. Vul het geschatte gewicht en de grootste afmeting in en je ziet meteen een realistische indicatie per stuk en voor de volledige oplage. De exacte prijs bevestigen we na een korte modelcontrole, zodat je altijd zeker bent van de juiste kost en kwaliteit.",
        labels: {
          preset: "Formaat preset",
          material: "Materiaal",
          quality: "Kwaliteit",
          weight: "Gewicht per stuk (g)",
          size: "Langste maat (cm)",
          qty: "Aantal stuks",
        },
        help: {
          drying: "Droogbehandeling inbegrepen voor TPU/PLA Wood/PETG/PC/PC FR.",
        },
        cards: {
          perPiece: "Indicatie per stuk",
          total: "Totaal (excl. levering)",
          includes: "Incl.",
          basedOn: "Op basis van",
          pieces: "st",
        },
        summary: {
          perPiece: "Per stuk",
          total: "Totaal",
          size: "Formaat",
          weight: "Gewicht",
          material: "Materiaal",
          quality: "Kwaliteit",
          pieces: "st",
          longestSide: "langste zijde",
        },
        cta: {
          send: "Verstuur deze inschatting",
          note: "Richtprijs excl. btw, ontwerpkosten en eventuele premium STL-bestanden. Finale voorstel na modelcontrole.",
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

  useEffect(() => {
    setWeight(GRAMS_PER_TIER[tier])
    setSizeCm(SIZE_CM_PER_TIER[tier])
    setPrintHours(PRINT_TIME_HOURS_PER_TIER[tier])
  }, [tier])

  useEffect(() => {
    setPrintHours(estimatePrintHours(Math.max(1, weight), Math.max(1, sizeCm)))
  }, [weight, sizeCm])

  const breakdown = useMemo(
    () =>
      calculatePrintJob({
        filamentWeightGrams: Math.max(1, weight),
        printingTimeHours: Math.max(0.1, printHours),
        material,
        quality,
        quantity: Math.max(1, qty),
      }),
    [weight, printHours, material, quality, qty],
  )

  const qualityLabel = QUALITY_LABELS[quality]?.[isEn ? "en" : "nl"] ?? quality

  const quoteSummary = useMemo(() => {
    const parts = [
      `${copy.summary.perPiece}: EUR ${breakdown.pricePerPrintEur.toFixed(2)}`,
      `${copy.summary.total} (${breakdown.input.quantity} ${copy.summary.pieces}): EUR ${breakdown.totalEur.toFixed(2)}`,
      `${copy.summary.size}: ~${sizeCm} cm ${copy.summary.longestSide} | ${copy.summary.weight}: ~${weight} g`,
      `${copy.summary.material}: ${materialLabel(material)} | ${copy.summary.quality}: ${qualityLabel}`,
    ]
    return parts.join(" | ")
  }, [
    copy.summary.material,
    copy.summary.perPiece,
    copy.summary.pieces,
    copy.summary.quality,
    copy.summary.size,
    copy.summary.total,
    copy.summary.weight,
    copy.summary.longestSide,
    breakdown.pricePerPrintEur,
    breakdown.totalEur,
    breakdown.input.quantity,
    sizeCm,
    weight,
    material,
    qualityLabel,
  ])

  const contactHref = useMemo(() => {
    const href = `/contact?material=${encodeURIComponent(materialLabel(material))}&quote=${encodeURIComponent(quoteSummary)}`
    return localizeHref(href, locale)
  }, [material, quoteSummary, locale])

  return (
    <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur">
      <h3 className="text-lg font-semibold text-slate-900">{copy.title}</h3>
      <p className="mt-1 text-sm text-slate-600">{copy.intro}</p>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-slate-500">{copy.labels.preset}</label>
          <select
            className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none ring-0 focus:border-slate-300"
            value={tier}
            onChange={(e) => setTier(e.target.value as Tier)}
          >
            <option value="Small">Small (~5 cm, {GRAMS_PER_TIER.Small}g)</option>
            <option value="Medium">Medium (~10 cm, {GRAMS_PER_TIER.Medium}g)</option>
            <option value="Large">Large (~20 cm, {GRAMS_PER_TIER.Large}g)</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-slate-500">{copy.labels.material}</label>
          <select
            className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none ring-0 focus:border-slate-300"
            value={material}
            onChange={(e) => setMaterial(safeMaterialKey(e.target.value))}
          >
            {Object.entries(MATERIALS).map(([k, v]) => (
              <option key={k} value={k}>
                {v.name}
              </option>
            ))}
          </select>
          <span className="text-[11px] text-slate-500">{copy.help.drying}</span>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-slate-500">{copy.labels.quality}</label>
          <select
            className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none ring-0 focus:border-slate-300"
            value={quality}
            onChange={(e) => setQuality(e.target.value as Quality)}
          >
            <option value="Standaard">{QUALITY_LABELS.Standaard[isEn ? "en" : "nl"]}</option>
            <option value="Fijn">{QUALITY_LABELS.Fijn[isEn ? "en" : "nl"]}</option>
            <option value="Ultra">{QUALITY_LABELS.Ultra[isEn ? "en" : "nl"]}</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-slate-500">{copy.labels.weight}</label>
          <input
            type="number"
            min={1}
            className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none ring-0 focus:border-slate-300"
            value={weight}
            onChange={(e) => setWeight(Math.max(1, Number(e.target.value) || 1))}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-slate-500">{copy.labels.size}</label>
          <input
            type="number"
            min={1}
            step={0.5}
            className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none ring-0 focus:border-slate-300"
            value={sizeCm}
            onChange={(e) => setSizeCm(Math.max(1, Number(e.target.value) || 1))}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-slate-500">{copy.labels.qty}</label>
          <input
            type="number"
            min={1}
            className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none ring-0 focus:border-slate-300"
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="text-xs uppercase tracking-wide text-slate-500">{copy.cards.perPiece}</div>
          <div className="mt-1 text-2xl font-semibold text-slate-900">
            {euro.format(breakdown.pricePerPrintEur)}
          </div>
          <div className="text-xs text-slate-500">
            {copy.cards.includes} {materialLabel(material)} / {qualityLabel}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="text-xs uppercase tracking-wide text-slate-500">{copy.cards.total}</div>
          <div className="mt-1 text-2xl font-semibold text-slate-900">
            {euro.format(breakdown.totalEur)}
          </div>
          <div className="text-xs text-slate-500">
            {copy.cards.basedOn} {breakdown.input.quantity} {copy.cards.pieces}.
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
        <Link
          href={contactHref}
          className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700"
        >
          {copy.cta.send}
        </Link>
        <p className="text-xs text-slate-600">{copy.cta.note}</p>
      </div>
    </div>
  )
}

function materialLabel(key: MaterialKey): string {
  return MATERIALS[key]?.name ?? key
}
