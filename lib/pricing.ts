import { MATERIAL_COST_EUR_PER_KG, type MaterialKey } from "./materials";

export type Tier = "Small" | "Medium" | "Large";

// Ruwe gewichtsinschatting bij 25% infill
export const GRAMS_PER_TIER: Record<Tier, number> = {
  Small: 30,
  Medium: 100,
  Large: 250,
};

export type Quality = "Standaard" | "Fijn";
export const QUALITY_MULTIPLIER: Record<Quality, number> = {
  Standaard: 1,
  Fijn: 1.2,
};

/**
 * Berekent verkoopprijs per stuk op basis van filamentkost.
 * - filamentprijs uit Bambu shop
 * - 25% marge
 * - schatting gewicht per formaat
 */
export function calcUnitPrice(
  tier: Tier,
  material: MaterialKey,
  quality: Quality = "Standaard",
): number {
  const grams = GRAMS_PER_TIER[tier] ?? 0;
  const costPerKg = (MATERIAL_COST_EUR_PER_KG[material] ?? 0) * 1.25;
  const base = (grams / 1000) * costPerKg;
  return Math.round(base * QUALITY_MULTIPLIER[quality]);
}
