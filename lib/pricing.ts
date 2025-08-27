import { MATERIAL_COST_EUR_PER_KG, type MaterialKey } from "./materials";

export type Tier = "Small" | "Medium" | "Large";

// Ruwe gewichtsinschatting bij 25% infill
// Zwaardere modellen vergen meer materiaal en dus een hogere prijs
export const GRAMS_PER_TIER: Record<Tier, number> = {
  Small: 50,
  Medium: 200,
  Large: 500,
};

export type Quality = "Standaard" | "Fijn";
export const QUALITY_MULTIPLIER: Record<Quality, number> = {
  Standaard: 1,
  Fijn: 1.2,
};

/**
 * Berekent verkoopprijs per stuk op basis van filamentkost.
 * - filamentprijs uit Bambu shop
 * - 50% marge op aankoopprijs
 * - schatting gewicht per formaat
 */
export function calcUnitPrice(
  tier: Tier,
  material: MaterialKey,
  quality: Quality = "Standaard",
): number {
  const grams = GRAMS_PER_TIER[tier] ?? 0;
  const costPerKg = (MATERIAL_COST_EUR_PER_KG[material] ?? 0) * 1.5;
  const base = (grams / 1000) * costPerKg;
  return Math.round(base * QUALITY_MULTIPLIER[quality]);
}
