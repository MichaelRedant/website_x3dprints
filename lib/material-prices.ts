export type MaterialKey =
  | "PLA_TOUGH_PLUS"
  | "PLA_MATTE"
  | "PLA_GLOW"
  | "PLA_MARBLE"
  | "PLA_SPARKLE"
  | "PLA_METAL"
  | "PLA_GALAXY"
  | "PLA_AERO"
  | "PLA_SILK_PLUS"
  | "PLA_BASIC_GRADIENT"
  | "PLA_BASIC"
  | "PLA_TRANSLUCENT"
  | "PLA_SILK_MULTI_COLOR"
  | "PLA_CF"
  | "PLA_WOOD"
  | "PETG"
  | "PC_FR"
  | "PC"
  | "TPU"

// X3DPrints price reference supplied on 2026-08-30, PLA, PETG and PLA Silk+ updated 2026-10-05. Prices are before the 20% material margin.
export const X3D_FILAMENT_PRICE_EUR_PER_KG: Record<MaterialKey, number> = {
  PLA_BASIC: 19.99,
  PLA_BASIC_GRADIENT: 27.99,
  PLA_MATTE: 19.99,
  PLA_GLOW: 27.99,
  PLA_MARBLE: 27.99,
  PLA_SPARKLE: 27.99,
  PLA_METAL: 27.99,
  PLA_GALAXY: 27.99,
  PLA_AERO: 47.99,
  PLA_SILK_PLUS: 19.99,
  PLA_SILK_MULTI_COLOR: 27.99,
  PLA_CF: 29.99,
  PLA_WOOD: 27.99,
  PLA_TRANSLUCENT: 25.99,
  PLA_TOUGH_PLUS: 26.99,
  PETG: 18.99,
  PC: 42.99,
  PC_FR: 56.99,
  TPU: 39.99, // TPU for AMS (beslist 2026-10-05)
}

// Materialen die enkel de prijswijzer gebruikt (nog geen eigen materiaalpagina).
// Bron: prijslijst X3DPrints (vault, sectie 6). Prijzen voor de 20% materiaalmarge.
export type GuideOnlyMaterialKey = "ASA" | "ASA_CF" | "PAHT_CF"

export const GUIDE_ONLY_FILAMENT_PRICE_EUR_PER_KG: Record<GuideOnlyMaterialKey, number> = {
  ASA: 24.99,
  ASA_CF: 38.99,
  PAHT_CF: 101.99,
}
