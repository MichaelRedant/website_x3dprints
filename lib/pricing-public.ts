// Publieke prijsberekening: veilig voor de browser.
// Bevat GEEN aankoopprijzen of marges. Die blijven in lib/pricing.ts (enkel server/build),
// dat er kant-en-klare verkooptarieven (PublicRates) van maakt.

export type Tier = "Small" | "Medium" | "Large"
export type Quality = "Standaard" | "Fijn" | "Ultra"
export type DeliveryType = "afhaling" | "verzending"

// Ruwe gewichtsinschatting bij 25% infill
export const GRAMS_PER_TIER: Record<Tier, number> = {
  Small: 50,
  Medium: 200,
  Large: 500,
}

// Gemiddelde printtijd per formaat (ruwe default, overschrijfbaar in de UI)
export const PRINT_TIME_HOURS_PER_TIER: Record<Tier, number> = {
  Small: 2,
  Medium: 6.5,
  Large: 15,
}

export const QUALITY_TIME_MULTIPLIER: Record<Quality, number> = {
  Standaard: 1,
  Fijn: 1.15,
  Ultra: 1.25,
}

export const MINIMUM_PRINT_JOB_EUR = 5 // Ondergrens per printopdracht; niet expliciet vermelden in copy.
export const DRYING_FIXED_SURCHARGE_EUR = 5 // Apart, niet mee in marge of buffer.
export const DRYING_COST_PER_PRINT_EUR = 0.05
export const DEFAULT_DESIGN_RATE_EUR_PER_HOUR = 45

// Verzending per gewichtsschijf (max. gewicht in gram, prijs in EUR). Zwaarder: op aanvraag.
export const SHIPPING_RATES_EUR: ReadonlyArray<{ maxGrams: number; priceEur: number }> = [
  { maxGrams: 2000, priceEur: 7.5 },
  { maxGrams: 5000, priceEur: 8 },
  { maxGrams: 10000, priceEur: 9 },
]

/** Verkooptarieven zoals de browser ze krijgt: marge en buffer zitten er al in. */
export type PublicRates = {
  /** Verkoopprijs per gram filament, per materiaal (MaterialKey of prijswijzer-sleutel). */
  materialEurPerGram: Record<string, number>
  /** Verkoopprijs per printuur (machine en stroom). */
  printHourEur: number
  /** Materialen die vooraf gedroogd worden en dus de droogtoeslag krijgen. */
  dryingMaterials: string[]
}

export type PublicPrintInput = {
  grams: number
  hours: number
  material: string
  quality?: Quality
  quantity: number
  designHours?: number
  deliveryType?: DeliveryType
}

export type PublicPrintResult = {
  printsSubtotalEur: number
  dryingCostEur: number
  designCostEur: number
  deliveryCostEur: number
  totalEur: number
  pricePerPrintEur: number
}

// Geeft null terug als de zending zwaarder is dan de hoogste schijf (prijs op aanvraag).
export function calculateDeliveryCost(deliveryType: DeliveryType, shipmentWeightGrams: number): number | null {
  if (deliveryType === "afhaling") return 0
  const rate = SHIPPING_RATES_EUR.find((r) => shipmentWeightGrams <= r.maxGrams)
  return rate ? rate.priceEur : null
}

// Publieke bedragen naar beneden afronden: hele euro's, onder EUR 1 per tiental cent.
export function floorPublicEur(n: number): number {
  if (n >= 1) return Math.floor(n)
  return Math.floor(n * 10) / 10
}

export function calculateDryingCost(material: string, quantity: number, rates: PublicRates): number {
  if (!rates.dryingMaterials.includes(material)) return 0
  return DRYING_FIXED_SURCHARGE_EUR + DRYING_COST_PER_PRINT_EUR * quantity
}

export function calculatePublicPrintJob(input: PublicPrintInput, rates: PublicRates): PublicPrintResult {
  const quantity = Math.max(1, Math.round(input.quantity))
  const grams = Math.max(1, input.grams)
  const hours = Math.max(0.1, input.hours)
  const qualityMultiplier = QUALITY_TIME_MULTIPLIER[input.quality ?? "Standaard"] ?? 1
  const gramRate = rates.materialEurPerGram[input.material] ?? rates.materialEurPerGram.PLA_BASIC ?? 0

  const perPiece = grams * gramRate + hours * qualityMultiplier * rates.printHourEur
  const dryingCostEur = calculateDryingCost(input.material, quantity, rates)
  const printsSubtotalEur = Math.max(perPiece * quantity, MINIMUM_PRINT_JOB_EUR) + dryingCostEur
  const designCostEur = (input.designHours ?? 0) * DEFAULT_DESIGN_RATE_EUR_PER_HOUR
  const deliveryCostEur = calculateDeliveryCost(input.deliveryType ?? "afhaling", grams * quantity) ?? 0

  const totalEur = floorPublicEur(printsSubtotalEur + designCostEur + deliveryCostEur)
  return {
    printsSubtotalEur,
    dryingCostEur,
    designCostEur,
    deliveryCostEur,
    totalEur,
    pricePerPrintEur: floorPublicEur(totalEur / quantity),
  }
}

export function publicUnitPrice(tier: Tier, material: string, rates: PublicRates, quality: Quality = "Standaard"): number {
  return calculatePublicPrintJob(
    { grams: GRAMS_PER_TIER[tier], hours: PRINT_TIME_HOURS_PER_TIER[tier], material, quality, quantity: 1 },
    rates,
  ).pricePerPrintEur
}
