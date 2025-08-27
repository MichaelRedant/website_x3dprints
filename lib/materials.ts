// lib/materials.ts
export type MaterialKey = "PLA_MATTE" | "PLA_WOOD" | "PLA_MARBLE" | "PLA_PLUS" | "PETG" | "TPU";

export type Swatch = {
  label: string;     // wat de gebruiker ziet
  color: string;     // hex voor swatch
  inStock: boolean;  // of je het liggen hebt
};

// Jouw huidige voorraad (zoals je eerder zei):
// - PLA matte: zwart, wit, blauw, geel, groen, rood (op voorraad)
// - PLA wood brown (op voorraad)
// - PLA marble grey (op voorraad)
// - PETG: zwart, wit, transparant (op voorraad)
// - TPU: zwart (op voorraad)
// Alles buiten dit lijstje: op bestelling (inStock: false)

export const MATERIALS: Record<MaterialKey, { name: string; swatches: Swatch[] }> = {
  PLA_MATTE: {
    name: "PLA Matte",
    swatches: [
      { label: "Zwart",  color: "#111111", inStock: true },
      { label: "Wit",    color: "#ffffff", inStock: true },
      { label: "Blauw",  color: "#0f52ba", inStock: true },
      { label: "Geel",   color: "#ffd200", inStock: true },
      { label: "Groen",  color: "#16a34a", inStock: true },
      { label: "Rood",   color: "#d32f2f", inStock: true },
      { label: "Paars",  color: "#7c3aed", inStock: true },
      { label: "Oranje", color: "#fb8c00", inStock: false },
      { label: "Roze",   color: "#e91e63", inStock: true },
    ],
  },

  PLA_WOOD: {
    name: "PLA Wood",
    swatches: [
      { label: "Wood Brown", color: "#7c5e3c", inStock: true },
      // andere “houten” tinten op bestelling
      { label: "Light Oak",  color: "#b48a5a", inStock: false },
    ],
  },

  PLA_MARBLE: {
    name: "PLA Marble",
    swatches: [
      { label: "Marble Grey", color: "#b6b6b6", inStock: true },
      { label: "Marble White", color: "#e5e7eb", inStock: false },
    ],
  },

  PLA_PLUS: {
    name: "PLA+ / specials",
    // dit bevat alle fancy spul (Silk, Sparkle, Translucent, etc.) standaard op bestelling
    swatches: [
      { label: "Silk Gold",  color: "#d4af37", inStock: false },
      { label: "Silk Silver", color: "#c0c0c0", inStock: false },
      { label: "Translucent Cyan", color: "#b2ebf2", inStock: false },
      { label: "Sparkle Purple", color: "#6a1b9a", inStock: false },
    ],
  },

  PETG: {
    name: "PETG",
    swatches: [
      { label: "Zwart",        color: "#000000", inStock: true },
      { label: "Wit",          color: "#ffffff", inStock: true },
      { label: "Transparant",  color: "#c8f5f3", inStock: true },

      // extra kleuren op bestelling
      { label: "Blauw",        color: "#1976d2", inStock: false },
      { label: "Rood",         color: "#e53935", inStock: false },
    ],
  },

  TPU: {
    name: "TPU",
    swatches: [
      { label: "Zwart", color: "#000000", inStock: true },
      // TPU wit eventueel op bestelling
      { label: "Wit",   color: "#ffffff", inStock: false },
    ],
  },
};
