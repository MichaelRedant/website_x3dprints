// Prijswijzer: vertaalt "waarvoor gebruik je het" naar materiaaladvies en 2 à 3 richtprijzen.
// Prijzen komen uit lib/pricing.ts (zelfde formule, buffer, ondergrens en afronding als de calculator).
import { GUIDE_ONLY_FILAMENT_PRICE_EUR_PER_KG } from "./material-prices"
import {
  DEFAULT_DESIGN_RATE_EUR_PER_HOUR,
  GRAMS_PER_TIER,
  PRINT_TIME_HOURS_PER_TIER,
  calculatePrintJob,
  floorPublicEur,
  type Quality,
  type Tier,
} from "./pricing"
import type { MaterialKey } from "./materials"
import { SCAN_PRICES } from "./scanning-prices"

export type GuideStart = "file" | "broken" | "idea" | "scan"
export type GuideUse = "decor" | "functional" | "outdoor" | "heat" | "flexible" | "strong"
export type GuideLevel = "basis" | "advice" | "premium"
export type GuideLocale = "nl" | "en"

type Bilingual = { nl: string; en: string }

type GuideMaterial = {
  label: string
  /** Materiaal in de calculator; voor materialen zonder eigen pagina enkel als technische sleutel. */
  materialKey: MaterialKey
  pricePerKg?: number
  requiresDrying?: boolean
}

const GUIDE_MATERIALS = {
  PLA_MATTE: { label: "PLA Matte", materialKey: "PLA_MATTE" },
  PLA_SPECIAL: { label: "PLA Silk+ / Marble", materialKey: "PLA_MARBLE" },
  PLA_TOUGH_PLUS: { label: "PLA Tough+", materialKey: "PLA_TOUGH_PLUS" },
  PETG: { label: "PETG", materialKey: "PETG" },
  PC: { label: "PC", materialKey: "PC" },
  TPU: { label: "TPU", materialKey: "TPU" },
  ASA: {
    label: "ASA",
    materialKey: "PLA_BASIC",
    pricePerKg: GUIDE_ONLY_FILAMENT_PRICE_EUR_PER_KG.ASA,
    requiresDrying: true,
  },
  ASA_CF: {
    label: "ASA-CF",
    materialKey: "PLA_BASIC",
    pricePerKg: GUIDE_ONLY_FILAMENT_PRICE_EUR_PER_KG.ASA_CF,
    requiresDrying: true,
  },
  PAHT_CF: {
    label: "PAHT-CF",
    materialKey: "PLA_BASIC",
    pricePerKg: GUIDE_ONLY_FILAMENT_PRICE_EUR_PER_KG.PAHT_CF,
    requiresDrying: true,
  },
} satisfies Record<string, GuideMaterial>

type GuideMaterialId = keyof typeof GUIDE_MATERIALS

type GuideOptionDef = {
  level: GuideLevel
  material: GuideMaterialId
  quality: Quality
  why: Bilingual
}

export const GUIDE_OPTIONS: Record<GuideUse, GuideOptionDef[]> = {
  decor: [
    {
      level: "basis",
      material: "PLA_MATTE",
      quality: "Standaard",
      why: {
        nl: "Mooie matte afwerking in veel kleuren. Ideaal voor binnen.",
        en: "Clean matte finish in many colours. Ideal for indoor use.",
      },
    },
    {
      level: "advice",
      material: "PLA_MATTE",
      quality: "Fijn",
      why: {
        nl: "Fijnere lagen geven strakkere rondingen en minder zichtbare lijnen. Het verschil zie je van dichtbij.",
        en: "Finer layers give smoother curves and less visible lines. You notice it up close.",
      },
    },
    {
      level: "premium",
      material: "PLA_SPECIAL",
      quality: "Ultra",
      why: {
        nl: "Zijde- of marmerlook met de fijnste laag, voor een stuk dat in het oog moet springen.",
        en: "Silk or marble look with the finest layer, for a piece that should stand out.",
      },
    },
  ],
  functional: [
    {
      level: "basis",
      material: "PLA_TOUGH_PLUS",
      quality: "Standaard",
      why: {
        nl: "Steviger dan gewone PLA. Prima voor lichte functionele stukken binnen.",
        en: "Tougher than regular PLA. Fine for light functional parts indoors.",
      },
    },
    {
      level: "advice",
      material: "PETG",
      quality: "Standaard",
      why: {
        nl: "Kan beter tegen warmte en is steviger dan PLA. De veilige keuze voor de meeste onderdelen.",
        en: "Handles heat better and is tougher than PLA. The safe choice for most parts.",
      },
    },
    {
      level: "premium",
      material: "PC",
      quality: "Standaard",
      why: {
        nl: "Zeer sterk en slagvast. Voor onderdelen die echt moeten presteren.",
        en: "Very strong and impact resistant. For parts that really have to perform.",
      },
    },
  ],
  outdoor: [
    {
      level: "advice",
      material: "ASA",
      quality: "Standaard",
      why: {
        nl: "Bestand tegen zon, regen en temperatuurwisselingen. Blijft buiten zijn vorm en kleur houden.",
        en: "Resists sun, rain and temperature swings. Keeps its shape and colour outdoors.",
      },
    },
    {
      level: "premium",
      material: "ASA_CF",
      quality: "Standaard",
      why: {
        nl: "ASA met koolstofvezel: stijver, met een strakke matte afwerking.",
        en: "ASA with carbon fibre: stiffer, with a clean matte finish.",
      },
    },
  ],
  heat: [
    {
      level: "basis",
      material: "PETG",
      quality: "Standaard",
      why: {
        nl: "Houdt het tot ongeveer 70 °C. Volstaat in de buurt van een toestel, niet in een auto in volle zon.",
        en: "Holds up to about 70 °C. Fine near an appliance, not in a car in full sun.",
      },
    },
    {
      level: "advice",
      material: "ASA",
      quality: "Standaard",
      why: {
        nl: "Houdt het tot ongeveer 100 °C en kan tegen UV. Geschikt voor een auto-interieur.",
        en: "Holds up to about 100 °C and resists UV. Suitable for a car interior.",
      },
    },
    {
      level: "premium",
      material: "PC",
      quality: "Standaard",
      why: {
        nl: "Houdt het tot ongeveer 115 °C. Voor stukken dicht bij een warmtebron.",
        en: "Holds up to about 115 °C. For parts close to a heat source.",
      },
    },
  ],
  flexible: [
    {
      level: "advice",
      material: "TPU",
      quality: "Standaard",
      why: {
        nl: "Flexibel en schokdempend. Voor buffers, dichtingen, grips en beschermhoesjes.",
        en: "Flexible and shock absorbing. For bumpers, seals, grips and protective covers.",
      },
    },
  ],
  strong: [
    {
      level: "basis",
      material: "PETG",
      quality: "Standaard",
      why: {
        nl: "Taai en betrouwbaar bij matige belasting.",
        en: "Tough and reliable under moderate load.",
      },
    },
    {
      level: "advice",
      material: "PC",
      quality: "Standaard",
      why: {
        nl: "Hoge sterkte en slagvastheid voor zwaarder belaste onderdelen.",
        en: "High strength and impact resistance for parts under heavier load.",
      },
    },
    {
      level: "premium",
      material: "PAHT_CF",
      quality: "Standaard",
      why: {
        nl: "Nylon met koolstofvezel: zeer stijf, sterk en hittebestendig, en neemt weinig vocht op.",
        en: "Nylon with carbon fibre: very stiff, strong and heat resistant, with low moisture uptake.",
      },
    },
  ],
}

/** Ingeschatte ontwerptijd per vertrekpunt (schatting, aanpasbaar in de wijzer). */
export const DEFAULT_MODEL_HOURS: Record<GuideStart, number> = {
  file: 0,
  broken: 1,
  idea: 2,
  scan: 0,
}

export type GuideInput = {
  start: GuideStart
  use: GuideUse
  size: Tier | "custom"
  quantity: number
  customGrams?: number
  customHours?: number
  modelHours?: number
  scanKey?: string
  includePrint: boolean
}

export type GuideOptionResult = {
  level: GuideLevel
  materialLabel: string
  quality: Quality
  why: string
  printTotal: number
  perPiece: number
  total: number
}

export type GuideResult = {
  options: GuideOptionResult[]
  modelingCost: number
  modelHours: number
  scanCost: number
  scanLabel: string
}

export function computeGuide(input: GuideInput, locale: GuideLocale): GuideResult {
  const quantity = Math.max(1, Math.round(input.quantity))
  const grams = input.size === "custom" ? Math.max(1, input.customGrams ?? 1) : GRAMS_PER_TIER[input.size]
  const hours =
    input.size === "custom" ? Math.max(0.1, input.customHours ?? 0.1) : PRINT_TIME_HOURS_PER_TIER[input.size]

  const modelHours = input.start === "broken" || input.start === "idea" ? Math.max(0.5, input.modelHours ?? 0) : 0
  const modelingCost = floorPublicEur(modelHours * DEFAULT_DESIGN_RATE_EUR_PER_HOUR)

  const scan = input.start === "scan" ? SCAN_PRICES.find((s) => s.key === input.scanKey) ?? SCAN_PRICES[0] : undefined
  const scanCost = scan ? scan.price : 0
  const scanLabel = scan ? (locale === "en" ? scan.labelEn : scan.labelNl) : ""

  const options = input.includePrint
    ? GUIDE_OPTIONS[input.use].map((def) => {
        const material: GuideMaterial = GUIDE_MATERIALS[def.material]
        const breakdown = calculatePrintJob({
          filamentWeightGrams: grams,
          printingTimeHours: hours,
          material: material.materialKey,
          materialPricePerKg: material.pricePerKg,
          requiresDrying: material.requiresDrying,
          quality: def.quality,
          quantity,
        })
        const total = floorPublicEur(breakdown.totalEur + modelingCost + scanCost)
        return {
          level: def.level,
          materialLabel: material.label,
          quality: def.quality,
          why: def.why[locale],
          printTotal: breakdown.totalEur,
          perPiece: breakdown.pricePerPrintEur,
          total,
        }
      })
    : []

  return { options, modelingCost, modelHours, scanCost, scanLabel }
}

/** Richtprijs per formaat voor een materiaal uit de wijzer (voor de server-gerenderde prijstabel). */
export function guideUnitPrice(materialId: GuideMaterialId, size: Tier, quality: Quality = "Standaard"): number {
  const material: GuideMaterial = GUIDE_MATERIALS[materialId]
  return calculatePrintJob({
    filamentWeightGrams: GRAMS_PER_TIER[size],
    printingTimeHours: PRINT_TIME_HOURS_PER_TIER[size],
    material: material.materialKey,
    materialPricePerKg: material.pricePerKg,
    requiresDrying: material.requiresDrying,
    quality,
    quantity: 1,
  }).pricePerPrintEur
}

export const GUIDE_TABLE_MATERIALS: GuideMaterialId[] = ["PLA_MATTE", "PETG", "ASA", "TPU", "PC"]

export function guideMaterialLabel(materialId: GuideMaterialId): string {
  return GUIDE_MATERIALS[materialId].label
}
