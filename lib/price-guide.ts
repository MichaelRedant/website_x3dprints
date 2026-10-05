// Prijswijzer: vertaalt "waarvoor gebruik je het" naar materiaaladvies en 2 à 3 richtprijzen.
// Veilig voor de browser: rekent enkel met PublicRates (verkooptarieven), nooit met aankoopprijzen.
import {
  DEFAULT_DESIGN_RATE_EUR_PER_HOUR,
  GRAMS_PER_TIER,
  PRINT_TIME_HOURS_PER_TIER,
  calculatePublicPrintJob,
  floorPublicEur,
  type PublicRates,
  type Quality,
  type Tier,
} from "./pricing-public"
import type { MaterialKey } from "./material-prices"
import { SCAN_PRICES } from "./scanning-prices"

export type GuideStart = "file" | "broken" | "idea" | "scan"
export type GuideUse = "decor" | "functional" | "outdoor" | "heat" | "flexible" | "strong"
export type GuideLevel = "basis" | "advice" | "premium"
export type GuideLocale = "nl" | "en"

type Bilingual = { nl: string; en: string }

type GuideMaterial = {
  label: Bilingual
  /** Sleutel in PublicRates.materialEurPerGram. */
  rateKey: string
  /** Materiaal met een eigen pagina op /materials; zonder pagina linkt de wijzer naar het overzicht. */
  page?: MaterialKey
}

export const GUIDE_MATERIALS = {
  PLA_MATTE: { label: { nl: "PLA Matte", en: "PLA Matte" }, rateKey: "PLA_MATTE", page: "PLA_MATTE" },
  PLA_BASIC: { label: { nl: "PLA Basic", en: "PLA Basic" }, rateKey: "PLA_BASIC", page: "PLA_BASIC" },
  PLA_SPECIAL: { label: { nl: "PLA Marble of Silk+", en: "PLA Marble or Silk+" }, rateKey: "PLA_MARBLE", page: "PLA_MARBLE" },
  PETG: { label: { nl: "PETG", en: "PETG" }, rateKey: "PETG", page: "PETG" },
  PC: { label: { nl: "Polycarbonaat", en: "Polycarbonate" }, rateKey: "PC", page: "PC" },
  TPU: { label: { nl: "TPU (flexibel)", en: "TPU (flexible)" }, rateKey: "TPU", page: "TPU" },
  ASA: { label: { nl: "ASA", en: "ASA" }, rateKey: "ASA" },
  ASA_CF: { label: { nl: "ASA Carbon Fibre", en: "ASA Carbon Fibre" }, rateKey: "ASA_CF" },
  PAHT_CF: { label: { nl: "Nylon Carbon Fibre (PAHT-CF)", en: "Nylon Carbon Fibre (PAHT-CF)" }, rateKey: "PAHT_CF" },
} satisfies Record<string, GuideMaterial>

export type GuideMaterialId = keyof typeof GUIDE_MATERIALS

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
        nl: "Marmer- of zijdelook met de fijnste laag, voor een stuk dat in het oog moet springen.",
        en: "Marble or silk look with the finest layer, for a piece that should stand out.",
      },
    },
  ],
  functional: [
    {
      level: "basis",
      material: "PLA_BASIC",
      quality: "Standaard",
      why: {
        nl: "Voordelig en maatvast. Prima voor lichte functionele stukken binnen, niet in de buurt van warmte.",
        en: "Affordable and dimensionally accurate. Fine for light functional parts indoors, away from heat.",
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
        nl: "ASA met carbon fibre: stijver, met een strakke matte afwerking.",
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
        nl: "Nylon met carbon fibre: zeer stijf, sterk en hittebestendig, en neemt weinig vocht op.",
        en: "Nylon with carbon fibre: very stiff, strong and heat resistant, with low moisture uptake.",
      },
    },
  ],
}

/** Standaard ontwerptijd bij een kapot onderdeel of een idee: 1 uur. */
export const GUIDE_MODEL_HOURS = 1

export type GuideInput = {
  start: GuideStart
  use: GuideUse
  size: Tier | "custom"
  quantity: number
  customGrams?: number
  customHours?: number
  scanKey?: string
  includePrint: boolean
}

export type GuideOptionResult = {
  level: GuideLevel
  materialId: GuideMaterialId
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

export function guideMaterialLabel(materialId: GuideMaterialId, locale: GuideLocale = "nl"): string {
  return GUIDE_MATERIALS[materialId].label[locale]
}

export function guideMaterialPage(materialId: GuideMaterialId): MaterialKey | undefined {
  const material: GuideMaterial = GUIDE_MATERIALS[materialId]
  return material.page
}

export function computeGuide(input: GuideInput, locale: GuideLocale, rates: PublicRates): GuideResult {
  const quantity = Math.max(1, Math.round(input.quantity))
  const grams = input.size === "custom" ? Math.max(1, input.customGrams ?? 1) : GRAMS_PER_TIER[input.size]
  const hours =
    input.size === "custom" ? Math.max(0.1, input.customHours ?? 0.1) : PRINT_TIME_HOURS_PER_TIER[input.size]

  const modelHours = input.start === "broken" || input.start === "idea" ? GUIDE_MODEL_HOURS : 0
  const modelingCost = floorPublicEur(modelHours * DEFAULT_DESIGN_RATE_EUR_PER_HOUR)

  const scan = input.start === "scan" ? SCAN_PRICES.find((s) => s.key === input.scanKey) ?? SCAN_PRICES[0] : undefined
  const scanCost = scan ? scan.price : 0
  const scanLabel = scan ? (locale === "en" ? scan.labelEn : scan.labelNl) : ""

  const options = input.includePrint
    ? GUIDE_OPTIONS[input.use].map((def) => {
        const print = calculatePublicPrintJob(
          { grams, hours, material: GUIDE_MATERIALS[def.material].rateKey, quality: def.quality, quantity },
          rates,
        )
        return {
          level: def.level,
          materialId: def.material,
          materialLabel: guideMaterialLabel(def.material, locale),
          quality: def.quality,
          why: def.why[locale],
          printTotal: print.totalEur,
          perPiece: print.pricePerPrintEur,
          total: floorPublicEur(print.totalEur + modelingCost + scanCost),
        }
      })
    : []

  return { options, modelingCost, modelHours, scanCost, scanLabel }
}

/** Richtprijs per formaat voor een materiaal uit de wijzer (voor de server-gerenderde prijstabel). */
export function guideUnitPrice(
  materialId: GuideMaterialId,
  size: Tier,
  rates: PublicRates,
  quality: Quality = "Standaard",
): number {
  return calculatePublicPrintJob(
    {
      grams: GRAMS_PER_TIER[size],
      hours: PRINT_TIME_HOURS_PER_TIER[size],
      material: GUIDE_MATERIALS[materialId].rateKey,
      quality,
      quantity: 1,
    },
    rates,
  ).pricePerPrintEur
}

export const GUIDE_TABLE_MATERIALS: GuideMaterialId[] = ["PLA_MATTE", "PETG", "ASA", "TPU", "PC"]
