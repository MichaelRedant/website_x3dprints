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

type MaterialKey = keyof typeof MATERIALS

function safeMaterialKey(key: string): MaterialKey {
  return (Object.prototype.hasOwnProperty.call(MATERIALS, key)
    ? key
    : "PLA_MATTE") as MaterialKey
}

const euro = new Intl.NumberFormat("nl-BE", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
})

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

export default function PriceEstimator() {
  const defaultMaterial: MaterialKey = "PLA_MATTE"
  const [tier, setTier] = useState<Tier>("Medium")
  const [material, setMaterial] = useState<MaterialKey>(defaultMaterial)
  const [quality, setQuality] = useState<Quality>("Standaard")
  const [qty, setQty] = useState<number>(1)
  const [weight, setWeight] = useState<number>(GRAMS_PER_TIER[tier])
  const [sizeCm, setSizeCm] = useState<number>(SIZE_CM_PER_TIER[tier])
  const [printHours, setPrintHours] = useState<number>(
    PRINT_TIME_HOURS_PER_TIER[tier],
  )

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

  const quoteSummary = useMemo(() => {
    const parts = [
      `Per stuk: EUR ${breakdown.pricePerPrintEur.toFixed(2)}`,
      `Totaal (${breakdown.input.quantity} st): EUR ${breakdown.totalEur.toFixed(2)}`,
      `Formaat: ~${sizeCm} cm langste zijde · Gewicht: ~${weight} g`,
      `Materiaal: ${materialLabel(material)} · Kwaliteit: ${quality}`,
    ]
    return parts.join(" | ")
  }, [breakdown.pricePerPrintEur, breakdown.totalEur, breakdown.input.quantity, sizeCm, weight, material, quality])

  const contactHref = useMemo(
    () =>
      `/contact?material=${encodeURIComponent(materialLabel(material))}&quote=${encodeURIComponent(quoteSummary)}`,
    [material, quoteSummary],
  )

  return (
    <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur">
      <h3 className="text-lg font-semibold text-slate-900">Snelle prijsinschatting</h3>
      <p className="mt-1 text-sm text-slate-600">
        Onze prijsschatting geeft je duidelijke vanafprijzen op basis van formaat, gewicht en materiaalverbruik.
Vul het geschatte gewicht en de grootste afmeting in en je ziet meteen een realistische indicatie per stuk en voor de volledige oplage.
De exacte prijs bevestigen we na een korte modelcontrole, zodat je altijd zeker bent van de juiste kost en kwaliteit.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-slate-500">Formaat preset</label>
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
          <label className="text-xs font-medium text-slate-500">Materiaal</label>
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
          <span className="text-[11px] text-slate-500">
            Droogbehandeling inbegrepen voor TPU/PLA Wood/PETG.
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-slate-500">Kwaliteit</label>
          <select
            className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none ring-0 focus:border-slate-300"
            value={quality}
            onChange={(e) => setQuality(e.target.value as Quality)}
          >
            <option value="Standaard">Standaard</option>
            <option value="Fijn">Fijn</option>
            <option value="Ultra">Ultra</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-slate-500">Gewicht per stuk (g)</label>
          <input
            type="number"
            min={1}
            className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none ring-0 focus:border-slate-300"
            value={weight}
            onChange={(e) => setWeight(Math.max(1, Number(e.target.value) || 1))}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-slate-500">Langste maat (cm)</label>
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
          <label className="text-xs font-medium text-slate-500">Aantal stuks</label>
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
          <div className="text-xs uppercase tracking-wide text-slate-500">Indicatie per stuk</div>
          <div className="mt-1 text-2xl font-semibold text-slate-900">
            {euro.format(breakdown.pricePerPrintEur)}
          </div>
          <div className="text-xs text-slate-500">
            Incl. {materialLabel(material)} / {quality}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="text-xs uppercase tracking-wide text-slate-500">Totaal (excl. levering)</div>
          <div className="mt-1 text-2xl font-semibold text-slate-900">
            {euro.format(breakdown.totalEur)}
          </div>
          <div className="text-xs text-slate-500">
            Op basis van {breakdown.input.quantity} stuk(ken).
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
        <Link
          href={contactHref}
          className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700"
        >
          Verstuur deze inschatting
        </Link>
        <p className="text-xs text-slate-600">
          Richtprijs excl. btw, ontwerpkosten en eventuele premium STL-bestanden. Finale voorstel na modelcontrole.
        </p>
      </div>
    </div>
  )
}

function materialLabel(key: MaterialKey): string {
  return MATERIALS[key]?.name ?? key
}
