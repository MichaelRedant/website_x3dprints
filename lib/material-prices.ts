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

// X3DPrints price reference supplied on 2026-08-30. Prices are before the 20% material margin.
export const X3D_FILAMENT_PRICE_EUR_PER_KG: Record<MaterialKey, number> = {
  PLA_BASIC: 25.99,
  PLA_BASIC_GRADIENT: 27.99,
  PLA_MATTE: 25.99,
  PLA_GLOW: 27.99,
  PLA_MARBLE: 27.99,
  PLA_SPARKLE: 27.99,
  PLA_METAL: 27.99,
  PLA_GALAXY: 27.99,
  PLA_AERO: 49.99,
  PLA_SILK_PLUS: 25.99,
  PLA_SILK_MULTI_COLOR: 27.99,
  PLA_CF: 26.99,
  PLA_WOOD: 27.99,
  PLA_TRANSLUCENT: 25.99,
  PLA_TOUGH_PLUS: 26.99,
  PETG: 25.99,
  PC: 42.99,
  PC_FR: 56.99,
  TPU: 43.99,
}
