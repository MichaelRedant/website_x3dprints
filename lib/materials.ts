// lib/materials.ts

export function materialSlug(input: string): string {
  return input.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

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
  | "PC"
  | "TPU"

export type Swatch = {
  label: string; // wat de gebruiker ziet
  color: string; // hex of css-gradient
  inStock: boolean; // of je het liggen hebt
};

export type MaterialInfo = {
  name: string;
  description?: string;
  features?: string[];
  swatches: Swatch[];
};

export type MaterialCopy = {
  name: string;
  description?: string;
  features?: string[];
};

// Gradient helpers (zelfde als oude materials page)
const g = {
  rainbow:
    "linear-gradient(90deg,#ef4444,#f59e0b,#22c55e,#06b6d4,#6366f1,#a855f7)",
  sparkle: "linear-gradient(135deg,#0f172a 0%,#14532d 55%,#0f172a 100%)",
  galaxy:
    "radial-gradient(circle at 30% 30%,#a855f7,transparent 40%),radial-gradient(circle at 70% 60%,#22d3ee,transparent 45%),#0b1020",
  metal: "linear-gradient(90deg,#c5ccd4,#8e9aa6,#c5ccd4)",
  bronze: "linear-gradient(90deg,#c08a5a,#8a5b3e,#c08a5a)",
  gunmetal: "linear-gradient(90deg,#4b5563,#6b7280,#374151)",
  marble: "linear-gradient(135deg,#d6d3d1,#9ca3af 55%,#e7e5e4)",
  wood: "linear-gradient(90deg,#7c5e3c,#6a4f33,#7c5e3c)",
  translucent: (c: string) => `linear-gradient(180deg,${c}C0,${c}50)`,
};


export const MATERIALS: Record<MaterialKey, MaterialInfo> = {
  PLA_TOUGH_PLUS: {
    name: "PLA Tough+",
    description:
      "Taaier dan standaard PLA, behoudt vorm beter bij impact. Voor onderdelen die net iets meer mogen verdragen.",
    features: ["Tough, minder broos", "Strakke finish", "Printvriendelijk"],
    swatches: [
      { label: "Black", color: "#0b0b0b", inStock: false },
      { label: "White", color: "#ffffff", inStock: false },
      { label: "Grey", color: "#9ca3af", inStock: false },
      { label: "Red", color: "#e11d48", inStock: false },
      { label: "Yellow", color: "#f5c211", inStock: false },
      { label: "Orange", color: "#f97316", inStock: false },
      { label: "Blue", color: "#2563eb", inStock: false },
      { label: "Green", color: "#16a34a", inStock: false },
    ],
  },

  PLA_MATTE: {
    name: "PLA Matte",
    description: "Matte PLA met lage glans. Verdoezelt layer-lijnen, oogt premium.",
    features: ["Mat oppervlak", "Strakke details"],
    swatches: [
      // Whites & Grays
      { label: "Ivory White", color: "#f8f4e3", inStock: false },
      { label: "Bone White", color: "#e7e2d3", inStock: true },
      { label: "Ash Gray", color: "#b2b6bd", inStock: true },
      { label: "Nardo Gray", color: "#7e7f80", inStock: true },
      { label: "Charcoal (Black)", color: "#111827", inStock: true },
      // Browns & Tans
      { label: "Latte Brown", color: "#b58b65", inStock: false },
      { label: "Desert Tan", color: "#d2b48c", inStock: false },
      { label: "Caramel", color: "#c97b4a", inStock: false },
      { label: "Terracotta", color: "#c6613e", inStock: false },
      { label: "Dark Brown", color: "#5a3a1a", inStock: false },
      { label: "Dark Chocolate", color: "#3b2615", inStock: false },
      // Reds & Purples
      { label: "Scarlet Red", color: "#d0281f", inStock: true },
      { label: "Dark Red", color: "#8b1a1a", inStock: false },
      { label: "Plum", color: "#5b2746", inStock: false },
      { label: "Sakura Pink", color: "#f7c6d5", inStock: false },
      { label: "Lilac Purple", color: "#b18ac8", inStock: false },
      // Greens & Blues
      { label: "Apple Green", color: "#6bbf59", inStock: false },
      { label: "Grass Green", color: "#2f8f2f", inStock: false },
      { label: "Dark Green", color: "#14532d", inStock: true },
      { label: "Ice Blue", color: "#9fd6f5", inStock: false },
      { label: "Sky Blue", color: "#72b4f8", inStock: true },
      { label: "Marine Blue", color: "#1e6091", inStock: false },
      { label: "Dark Blue", color: "#0f2f5f", inStock: false },
      // Yellows & Oranges
      { label: "Lemon Yellow", color: "#f6d32d", inStock: true },
      { label: "Mandarin Orange", color: "#f97316", inStock: true },
    ],
  },

  PLA_GLOW: {
    name: "PLA Glow",
    description:
      "Gloeit in het donker. Laadt op met licht, geeft een helder 'neon' effect in low-light.",
    features: ["Glow-in-the-dark", "Decoratief en fun"],
    swatches: [
      { label: "Glow Groen", color: "#00ff7b", inStock: true },
      { label: "Glow Geel", color: "#faff00", inStock: false },
      { label: "Glow Blauw", color: "#66e0ff", inStock: false },
      { label: "Glow Aqua", color: "#66ffd9", inStock: false },
      { label: "Glow Orange", color: "#ffb84d", inStock: false },
    ],
  },

  PLA_MARBLE: {
    name: "PLA Marble",
    description: "Subtiele marmerlook met spikkels. Voor elegante, luxueuze prints.",
    features: ["Matte marmertextuur", "Stijlvolle look"],
    swatches: [
      { label: "Terracotta Marble", color: "#b9654c", inStock: false },
      { label: "Marble Grey", color: g.marble, inStock: false },
      {
        label: "Marble White",
        color: "linear-gradient(135deg,#f3f4f6,#d1d5db 55%,#f9fafb)",
        inStock: false,
      },
    ],
  },

  PLA_SPARKLE: {
    name: "PLA Sparkle",
    description:
      "PLA met glitterdeeltjes. Subtiel tot opvallend, afhankelijk van kleur en licht.",
    features: ["Glitter-effect", "Diepte in oppervlak"],

    swatches: [
      { label: "Graphite Sparkle", color: "linear-gradient(135deg,#1f2937,#0b1220)", inStock: false },
      { label: "Pine Sparkle", color: "linear-gradient(135deg,#1f3d2b,#0b1220)", inStock: false },
      { label: "Wine Sparkle", color: "linear-gradient(135deg,#3b0d18,#0b1220)", inStock: false },
      { label: "Plum Sparkle", color: "linear-gradient(135deg,#3d1a54,#0b1220)", inStock: false },
      { label: "Mustard Sparkle", color: "linear-gradient(135deg,#a47a1e,#3a2a00)", inStock: false },
    ],
  },

  PLA_METAL: {
    name: "PLA Metal",
    description:
      "Metaalachtige glans zonder conductiviteit. Ideaal voor props of industriele esthetiek.",
    features: ["Metallic glans", "Egale lijnen"],
    swatches: [
      { label: "Steel", color: g.metal, inStock: false },
      { label: "Copper", color: "#b87333", inStock: false },
      { label: "Bronze", color: g.bronze, inStock: false },
      { label: "Gunmetal", color: g.gunmetal, inStock: false },
      { label: "Graphite", color: "linear-gradient(90deg,#1f2937,#374151,#0f172a)", inStock: false },
    ],
  },

  PLA_GALAXY: {
    name: "PLA Galaxy",
    description: "Diepe basiskleuren met micro-glitter voor een 'deep space' vibe.",
    features: ["Diepe tinten", "Subtiele glitter"],
    swatches: [
      { label: "Plum Nebula", color: g.galaxy, inStock: false },
      {
        label: "Indigo Nebula",
        color:
          "radial-gradient(circle at 35% 40%,#6366f1,transparent 45%),#0b1020",
        inStock: false,
      },
      {
        label: "Teal Nebula",
        color:
          "radial-gradient(circle at 60% 50%,#22d3ee,transparent 45%),#0b1020",
        inStock: false,
      },
      {
        label: "Cosmos Brown",
        color:
          "radial-gradient(circle at 40% 50%,#8b5e34,transparent 45%),#1f2937",
        inStock: false,
      },
    ],
  },

  PLA_AERO: {
    name: "PLA Aero",
    description:
      "Lichtgewicht PLA-variant met lagere dichtheid. Voor grote, lichte modellen.",
    features: ["Lichtgewicht", "Sneller bruikbare massa"],
    swatches: [
      {
        label: "Aero White",
        color: "linear-gradient(90deg,#f8fafc,#e5e7eb,#f8fafc)",
        inStock: false,
      },
      { label: "Aero Grey", color: "#e5e7eb", inStock: false },
    ],
  },

  PLA_SILK_PLUS: {
    name: "PLA Silk+",
    description:
      "Zijdeachtige toplaag met sterke reflectie. Perfect voor showpieces en awards.",
    features: ["Zijdeglans", "Diepe kleuren"],
    swatches: [

      { label: "Black", color: "linear-gradient(90deg,#0b0b0b,#2a2a2a,#0b0b0b)", inStock: false },
      { label: "Silver", color: "linear-gradient(90deg,#a0a7af,#e5e7eb,#a0a7af)", inStock: false },
      { label: "Gold", color: "linear-gradient(90deg,#a36f00,#f3d36b,#a36f00)", inStock: false },
      { label: "Copper", color: "linear-gradient(90deg,#b66a3a,#e3a367,#b66a3a)", inStock: false },
      { label: "Champagne", color: "linear-gradient(90deg,#c5a572,#f3d79c,#c5a572)", inStock: false },
      { label: "Red", color: "linear-gradient(90deg,#7f1d1d,#ef4444,#7f1d1d)", inStock: false },
      { label: "Blue", color: "linear-gradient(90deg,#1e3a8a,#3b82f6,#1e3a8a)", inStock: false },
      { label: "Green", color: "linear-gradient(90deg,#065f46,#10b981,#065f46)", inStock: false },
      { label: "Purple", color: "linear-gradient(90deg,#5b21b6,#7c3aed,#5b21b6)", inStock: false },
    ],
  },

  PLA_BASIC_GRADIENT: {
    name: "PLA Basic Gradient",
    description: "Voorverlopen spoelen met zachte kleurovergangen. Elke print is uniek.",
    features: ["Kleurverloop", "Decoratief"],
    swatches: [

      { label: "Sunset", color: "linear-gradient(90deg,#f97316,#f43f5e,#8b5cf6)", inStock: false },
      { label: "Ocean", color: "linear-gradient(90deg,#22d3ee,#3b82f6,#0ea5e9)", inStock: false },
      { label: "Lemonade", color: "linear-gradient(90deg,#fde047,#fca5a5,#fcd34d)", inStock: false },
      { label: "Aurora", color: "linear-gradient(90deg,#34d399,#22d3ee,#60a5fa)", inStock: false },
    ],
  },

  PLA_BASIC: {
    name: "PLA Basic",
    description: "Klassieke PLA-lijn met brede kleurdekking. Voor algemene prints en maquettes.",
    features: ["Veel kleuren", "Betaalbaar"],
    swatches: [
      { label: "Black", color: "#0b0b0b", inStock: false },
      { label: "White", color: "#ffffff", inStock: false },
      { label: "Cool Gray", color: "#9ca3af", inStock: false },
      { label: "Light Gray", color: "#d1d5db", inStock: false },
      { label: "Silver", color: "#b0b8c4", inStock: false },
      { label: "Brown", color: "#8b5a3c", inStock: false },
      { label: "Beige", color: "#d6c3a1", inStock: false },
      { label: "Yellow", color: "#fde047", inStock: false },
      { label: "Orange", color: "#fb923c", inStock: false },
      { label: "Red", color: "#ef4444", inStock: false },
      { label: "Pink", color: "#f472b6", inStock: false },
      { label: "Purple", color: "#8b5cf6", inStock: false },
      { label: "Blue", color: "#2563eb", inStock: false },
      { label: "Sky Blue", color: "#38bdf8", inStock: false },
      { label: "Cyan", color: "#06b6d4", inStock: false },
      { label: "Mint Green", color: "#86efac", inStock: false },
      { label: "Green", color: "#22c55e", inStock: false },
      { label: "Olive", color: "#6b8e23", inStock: false },
      { label: "Transparent", color: g.translucent("#ffffff"), inStock: false },
      { label: "Gold", color: "#E4BD68", inStock: false },
    ],
  },



  PLA_TRANSLUCENT: {
    name: "PLA Translucent",
    description: "Halfdoorzichtig PLA voor lichtdoorlatende toepassingen.",
    features: ["Lichtdoorlatend", "Sfeervol"],
    swatches: [
      { label: "Aqua", color: g.translucent("#7ae5ff"), inStock: false },
      { label: "Cyan", color: g.translucent("#22d3ee"), inStock: false },
      { label: "Blue", color: g.translucent("#60a5fa"), inStock: false },
      { label: "Teal", color: g.translucent("#14b8a6"), inStock: false },
      { label: "Green", color: g.translucent("#22c55e"), inStock: false },
      { label: "Red", color: g.translucent("#ef4444"), inStock: false },
      { label: "Magenta", color: g.translucent("#db2777"), inStock: false },
      { label: "Violet", color: g.translucent("#8b5cf6"), inStock: false },
      { label: "Opal", color: g.translucent("#ffffff"), inStock: false },
      { label: "Smoke", color: g.translucent("#9ca3af"), inStock: false },
    ],
  },

  PLA_SILK_MULTI_COLOR: {
    name: "PLA Silk Multi-Color",
    description: "Zijdeglans met ingebouwde kleurverlopen voor spectaculaire prints.",
    features: ["Kleurverloop", "Hoge glans"],
    swatches: [{ label: "Rainbow", color: g.rainbow, inStock: false }],
  },

  PLA_CF: {
    name: "PLA-CF",
    description:
      "Met carbon gevuld PLA. Stijf en mat; geschikt voor jigs, panelen en functionele delen waar PLA te slap is.",
    features: ["Stijf & licht", "Matte look"],
    swatches: [
      { label: "Forest Green", color: "#3f6f3f", inStock: false },
      { label: "Brick Red", color: "#8b3a3a", inStock: false },
      { label: "Royal Blue", color: "#2b6cb0", inStock: false },
      { label: "Grey", color: "#4b5563", inStock: false },
      { label: "Black", color: "#0b0f12", inStock: false },
      { label: "Navy", color: "#1e3a8a", inStock: false },
      { label: "Purple", color: "#5b21b6", inStock: false },
    ],
  },

  PLA_WOOD: {
    name: "PLA Wood",
    description:
      "PLA met houtdeeltjes. Warme, natuurlijke afwerking. Goed schuurbaar en prima te schilderen.",
    features: ["Natuurlijke look", "Licht geurend bij print"],
    swatches: [
      { label: "Walnut", color: "#6b4f2a", inStock: true },
      { label: "Mahogany", color: "#5b3a24", inStock: false },
      { label: "Teak", color: "#7b5838", inStock: false },
      { label: "Oak", color: "#9b7a4e", inStock: false },
      { label: "Desert", color: "#b99a63", inStock: false },

    ],
  },

  PETG: {
    name: "PETG",
    description:
      "Tougher dan PLA, licht flexibel en beter bestand tegen warmte en chemicalien. Voor functionele onderdelen.",
    features: ["Functioneel", "Chemisch resistenter", "Vormvast"],
    swatches: [
      { label: "Black", color: "#0b0b0b", inStock: true },
      { label: "White", color: "#ffffff", inStock: true },
      { label: "Gray", color: "#9ca3af", inStock: true },
      { label: "Red", color: "#e11d48", inStock: true },
      { label: "Orange", color: "#f97316", inStock: true },
      { label: "Yellow", color: "#f5c211", inStock: true },
      { label: "Green", color: "#16a34a", inStock: true },
      { label: "Blue", color: "#2563eb", inStock: true },
      { label: "Transparent", color: g.translucent("#E6FBFF"), inStock: true },
    ],
  },

  PC: {
    name: "PC",
    description:
      "Polycarbonaat voor hittebestendige, mechanisch sterke onderdelen met een strakke, semi-transparante look.",
    features: ["Hittebestendig", "UV-bestendig", "Technische onderdelen"],
    swatches: [
      { label: "Transparant", color: g.translucent("#E6FBFF"), inStock: true },
      { label: "Helder Zwart", color: "linear-gradient(180deg,#1b1b1f,#050505)", inStock: true },
      { label: "Zwart", color: "#000000", inStock: true },
    ],
  },

  TPU: {
    name: "TPU",
    description:
      "Flexibel en slijtvast. Ideaal voor grips, bumpers en demping. Vereist trager printen.",
    features: ["Flexibel", "Schokabsorberend"],
    swatches: [
      { label: "Black", color: "#000000", inStock: true },
      { label: "White", color: "#ffffff", inStock: false },
      { label: "Gray", color: "#9ca3af", inStock: false },
      { label: "Red", color: "#ef4444", inStock: false },
      { label: "Yellow", color: "#facc15", inStock: false },
      { label: "Blue", color: "#2563eb", inStock: false },
      { label: "Green", color: "#16a34a", inStock: false },
    ],
  },
};

// Aankoopprijzen (EUR/kg) volgens Bambu-shop
// Benaderingen; worden gebruikt voor prijsinschattingen
export const MATERIAL_COST_EUR_PER_KG: Record<MaterialKey, number> = {

  PLA_TOUGH_PLUS: 26.99,
  PLA_GLOW: 27.99,
  PLA_MARBLE: 27.99,
  PLA_SPARKLE: 27.99,
  PLA_METAL: 27.99,
  PLA_GALAXY: 27.99,
  PLA_AERO: 47.99,
  PLA_SILK_PLUS: 25.99,
  PLA_BASIC_GRADIENT: 27.99,
  PLA_BASIC: 22.99,
  PLA_MATTE: 22.99,
  PLA_TRANSLUCENT: 27.99,
  PLA_SILK_MULTI_COLOR: 27.99,
  PLA_CF: 26.99,
  PLA_WOOD: 27.99,
  PETG: 22.99,
  PC: 34.39,
  TPU: 39.99,
};


export const MATERIAL_ORDER: MaterialKey[] = [
  "PLA_TOUGH_PLUS",
  "PLA_MATTE",
  "PETG",
  "PC",
  "PLA_GLOW",
  "PLA_MARBLE",
  "PLA_SPARKLE",
  "PLA_METAL",
  "PLA_GALAXY",
  "PLA_AERO",
  "PLA_SILK_PLUS",
  "PLA_BASIC_GRADIENT",
  "PLA_BASIC",
  "PLA_TRANSLUCENT",
  "PLA_SILK_MULTI_COLOR",
  "PLA_CF",
  "PLA_WOOD",

  "TPU",
];

export const MATERIAL_SLUGS: Record<MaterialKey, string> = MATERIAL_ORDER.reduce(
  (acc, key) => {
    acc[key] = materialSlug(MATERIALS[key].name)
    return acc
  },
  {} as Record<MaterialKey, string>,
)

export const MATERIAL_KEY_BY_SLUG = Object.fromEntries(
  MATERIAL_ORDER.map((key) => [MATERIAL_SLUGS[key], key]),
) as Record<string, MaterialKey>

const MATERIAL_COPY_NL: Record<MaterialKey, MaterialCopy> = MATERIAL_ORDER.reduce(
  (acc, key) => {
    const { name, description, features } = MATERIALS[key]
    acc[key] = { name, description, features }
    return acc
  },
  {} as Record<MaterialKey, MaterialCopy>,
)

const MATERIAL_COPY_EN: Record<MaterialKey, MaterialCopy> = {
  PLA_TOUGH_PLUS: {
    name: "PLA Tough+",
    description:
      "Tougher than standard PLA and keeps its shape better on impact. For parts that need to take a little more abuse.",
    features: ["Tough, less brittle", "Clean finish", "Print friendly"],
  },
  PLA_MATTE: {
    name: "PLA Matte",
    description: "Matte PLA with low gloss. Masks layer lines and looks premium.",
    features: ["Matte surface", "Sharp details"],
  },
  PLA_GLOW: {
    name: "PLA Glow",
    description: "Charges with light and glows brightly in the dark.",
    features: ["Glow in the dark", "Decorative and fun"],
  },
  PLA_MARBLE: {
    name: "PLA Marble",
    description: "Subtle marble look with speckles for an elegant, premium finish.",
    features: ["Matte marble texture", "Stylish look"],
  },
  PLA_SPARKLE: {
    name: "PLA Sparkle",
    description: "PLA with glitter particles. Subtle to eye-catching depending on light and color.",
    features: ["Glitter effect", "Depth in the surface"],
  },
  PLA_METAL: {
    name: "PLA Metal",
    description:
      "Metallic sheen without conductivity. Great for props or an industrial aesthetic.",
    features: ["Metallic sheen", "Even lines"],
  },
  PLA_GALAXY: {
    name: "PLA Galaxy",
    description: "Deep base colors with micro glitter for a deep-space vibe.",
    features: ["Deep tones", "Subtle sparkle"],
  },
  PLA_AERO: {
    name: "PLA Aero",
    description: "Lightweight PLA variant with lower density. Ideal for large, light models.",
    features: ["Lightweight", "High volume at low mass"],
  },
  PLA_SILK_PLUS: {
    name: "PLA Silk+",
    description:
      "Silky top layer with strong reflection. Perfect for showpieces and awards.",
    features: ["Silky shine", "Deep colors"],
  },
  PLA_BASIC_GRADIENT: {
    name: "PLA Basic Gradient",
    description: "Pre-blended spools with soft gradients. Every print is unique.",
    features: ["Color gradient", "Decorative"],
  },
  PLA_BASIC: {
    name: "PLA Basic",
    description: "Classic PLA line with wide color coverage. For general prints and mockups.",
    features: ["Many colors", "Affordable"],
  },
  PLA_TRANSLUCENT: {
    name: "PLA Translucent",
    description: "Semi-transparent PLA for light-transmitting applications.",
    features: ["Light transmitting", "Ambient look"],
  },
  PLA_SILK_MULTI_COLOR: {
    name: "PLA Silk Multi-Color",
    description: "Silky gloss with built-in gradients for spectacular prints.",
    features: ["Color gradient", "High gloss"],
  },
  PLA_CF: {
    name: "PLA-CF",
    description:
      "Carbon-filled PLA. Stiff and matte; for jigs, panels and functional parts where PLA alone is too soft.",
    features: ["Stiff and light", "Matte look"],
  },
  PLA_WOOD: {
    name: "PLA Wood",
    description:
      "PLA with wood particles. Warm, natural finish that sands and paints well.",
    features: ["Natural look", "Light wood scent while printing"],
  },
  PETG: {
    name: "PETG",
    description:
      "Tougher than PLA, slightly flexible and more resistant to heat and chemicals. For functional parts.",
    features: ["Functional", "More chemical resistance", "Dimensional stability"],
  },
  PC: {
    name: "PC",
    description:
      "Polycarbonate for heat-resistant, mechanically strong parts with a sleek, semi-transparent look.",
    features: ["Heat resistant", "UV resistant", "Technical parts"],
  },
  TPU: {
    name: "TPU",
    description:
      "Flexible and wear-resistant. Great for grips, bumpers and damping. Requires slower printing.",
    features: ["Flexible", "Shock absorbing"],
  },
}

const SWATCH_LABEL_OVERRIDES_EN: Record<string, string> = {
  "Glow Groen": "Glow Green",
  "Glow Geel": "Glow Yellow",
  "Glow Blauw": "Glow Blue",
  "Transparant": "Transparent",
  "Helder Zwart": "Clear Black",
  Zwart: "Black",
  Grijs: "Gray",
}

export function materialCopyByLocale(locale: Locale): Record<MaterialKey, MaterialCopy> {
  return locale === "en" ? MATERIAL_COPY_EN : MATERIAL_COPY_NL
}

export function materialsByLocale(locale: Locale): Record<MaterialKey, MaterialInfo> {
  const copy = materialCopyByLocale(locale)
  return MATERIAL_ORDER.reduce((acc, key) => {
    const base = MATERIALS[key]
    acc[key] = {
      ...base,
      name: copy[key].name,
      description: copy[key].description,
      features: copy[key].features ?? base.features,
      swatches: base.swatches.map((swatch) => ({
        ...swatch,
        label:
          locale === "en"
            ? SWATCH_LABEL_OVERRIDES_EN[swatch.label] ?? swatch.label
            : swatch.label,
      })),
    }
    return acc
  }, {} as Record<MaterialKey, MaterialInfo>)
}
import { type Locale } from "./i18n/locales"
