import type { MaterialKey } from "./materials";

export type Tier = "Small" | "Medium" | "Large";

// Ruwe gewichtsinschatting bij 25% infill
export const GRAMS_PER_TIER: Record<Tier, number> = {
  Small: 50,
  Medium: 200,
  Large: 500,
};

// Gemiddelde printtijd per formaat (ruwe default, overschrijfbaar in de UI)
export const PRINT_TIME_HOURS_PER_TIER: Record<Tier, number> = {
  Small: 2,
  Medium: 6.5,
  Large: 15,
};

export type Quality = "Standaard" | "Fijn" | "Ultra";
export const QUALITY_TIME_MULTIPLIER: Record<Quality, number> = {
  Standaard: 1,
  Fijn: 1.15,
  Ultra: 1.25,
};

// Backwards compat: oude naam blijft beschikbaar
export const QUALITY_MULTIPLIER = QUALITY_TIME_MULTIPLIER;

export type DeliveryType = "afhaling" | "post" | "24h" | "48h";

// Filamentprijzen (EUR/kg) op basis van aangeleverde tabel
const BASE_FILAMENT_PRICE_EUR_PER_KG: Record<MaterialKey, number> = {
  PLA_BASIC: 23.38,
  PLA_BASIC_GRADIENT: 33.54,
  PLA_MATTE: 23.38,
  PLA_GLOW: 33.54,
  PLA_MARBLE: 33.54,
  PLA_SPARKLE: 33.54,
  PLA_METAL: 33.54,
  PLA_GALAXY: 32.52,
  PLA_AERO: 23.38,
  PLA_SILK_PLUS: 33.54,
  PLA_SILK_MULTI_COLOR: 33.54,
  PLA_CF: 39.64,
  PLA_WOOD: 28.46,
  PLA_TRANSLUCENT: 23.38,
  PLA_TOUGH_PLUS: 23.38,
  PETG: 23.38,
  PC: 42.99,
  PC_FR: 56.99,
  TPU: 25.5,
};

const BASE_PRICE_FALLBACK_EUR_PER_KG = 23.38; // valt terug op PLA Basic

export const DRYING_FILAMENTS = new Set<MaterialKey>(["TPU", "PLA_WOOD", "PETG", "PC", "PC_FR"]);
export const DRYING_FIXED_SURCHARGE_EUR = 5;
export const DRYING_COST_PER_PRINT_EUR = 0.05;

export const DEFAULT_ELECTRICITY_COST_EUR_PER_KWH = 0.23;
export const DEFAULT_PRINTER_POWER_KW = 1;
export const DEFAULT_MATERIAL_MARKUP = 0.2; // +20%
export const DEFAULT_PROFIT_FACTOR = 3; // 200% marge => basiskost * 3
export const DEFAULT_DESIGN_RATE_EUR_PER_HOUR = 40;

export type PriceInput = {
  printingTimeHours: number;
  filamentWeightGrams: number;
  material: MaterialKey;
  quality?: Quality;
  quantity: number;
  designHours?: number;
  deliveryType?: DeliveryType;
  extraAllowancesEur?: number;
  discountPercent?: number;
  electricityCostPerKwh?: number;
  printerPowerKw?: number;
  materialMarkup?: number;
  profitFactor?: number;
  designRateEurPerHour?: number;
};

export type PriceBreakdown = {
  input: PriceInput;
  unitFilamentCostEur: number;
  filamentRawEur: number;
  unitFilamentWithMarkupEur: number;
  filamentWithMarkupEur: number;
  unitElectricityEur: number;
  electricityEur: number;
  dryingCostEur: number;
  unitBaseCostEur: number;
  baseCostPerPrintEur: number;
  unitSellPriceEur: number;
  costWithMarginPerPrintEur: number;
  printsSubtotalEur: number;
  designCostEur: number;
  deliveryCostEur: number;
  extraAllowancesEur: number;
  subtotalBeforeDeliveryEur: number;
  subtotalBeforeDiscountEur: number;
  discountValueEur: number;
  totalEur: number;
  pricePerPrintEur: number;
};

export function calculateDeliveryCost(
  deliveryType: DeliveryType,
  subtotalBeforeDelivery: number,
): number {
  if (deliveryType === "24h") return 20;
  if (deliveryType === "48h") return 15;
  if (deliveryType === "post") return subtotalBeforeDelivery < 50 ? 7 : 5;
  return 0;
}

export function calculateDryingCost(material: MaterialKey, quantity: number): number {
  if (!DRYING_FILAMENTS.has(material)) return 0;
  return DRYING_FIXED_SURCHARGE_EUR + DRYING_COST_PER_PRINT_EUR * quantity;
}

export function calculatePrintJob(job: PriceInput): PriceBreakdown {
  if (job.quantity < 1) throw new Error("Aantal moet minstens 1 zijn.");
  if (job.printingTimeHours <= 0) throw new Error("Printtijd moet > 0 zijn.");
  if (job.filamentWeightGrams <= 0) throw new Error("Gewicht moet > 0 g zijn.");

  const materialMarkup = job.materialMarkup ?? DEFAULT_MATERIAL_MARKUP;
  const profitFactor = job.profitFactor ?? DEFAULT_PROFIT_FACTOR;
  const designRate = job.designRateEurPerHour ?? DEFAULT_DESIGN_RATE_EUR_PER_HOUR;
  const electricityCost = job.electricityCostPerKwh ?? DEFAULT_ELECTRICITY_COST_EUR_PER_KWH;
  const printerPower = job.printerPowerKw ?? DEFAULT_PRINTER_POWER_KW;
  const quality = job.quality ?? "Standaard";
  const qualityMultiplier = QUALITY_TIME_MULTIPLIER[quality] ?? 1;

  const materialPricePerKg =
    BASE_FILAMENT_PRICE_EUR_PER_KG[job.material] ?? BASE_PRICE_FALLBACK_EUR_PER_KG;
  const unitFilamentCostEur = (job.filamentWeightGrams / 1000) * materialPricePerKg;
  const unitFilamentWithMarkupEur = unitFilamentCostEur * (1 + materialMarkup);

  const effectivePrintHours = job.printingTimeHours * qualityMultiplier;
  const unitElectricityEur = effectivePrintHours * printerPower * electricityCost;

  const unitBaseCostEur = unitFilamentWithMarkupEur + unitElectricityEur;
  const unitSellPriceEur = unitBaseCostEur * profitFactor;

  const printsSubtotalEur = unitSellPriceEur * job.quantity;
  const designCostEur = (job.designHours ?? 0) * designRate;
  const dryingCostEur = calculateDryingCost(job.material, job.quantity);
  const extraAllowancesEur = job.extraAllowancesEur ?? 0;

  const subtotalBeforeDeliveryEur =
    printsSubtotalEur + designCostEur + dryingCostEur + extraAllowancesEur;
  const deliveryType = job.deliveryType ?? "afhaling";
  const deliveryCostEur = calculateDeliveryCost(deliveryType, subtotalBeforeDeliveryEur);

  const subtotalBeforeDiscountEur = subtotalBeforeDeliveryEur + deliveryCostEur;
  const discountPercent = Math.min(Math.max(job.discountPercent ?? 0, 0), 100);
  const discountValueEur = subtotalBeforeDiscountEur * (discountPercent / 100);

  const totalEur = subtotalBeforeDiscountEur - discountValueEur;
  const pricePerPrintEur = totalEur / job.quantity;

  return {
    input: job,
    unitFilamentCostEur: roundTo2(unitFilamentCostEur),
    filamentRawEur: roundTo2(unitFilamentCostEur),
    unitFilamentWithMarkupEur: roundTo2(unitFilamentWithMarkupEur),
    filamentWithMarkupEur: roundTo2(unitFilamentWithMarkupEur),
    unitElectricityEur: roundTo2(unitElectricityEur),
    electricityEur: roundTo2(unitElectricityEur),
    dryingCostEur: roundTo2(dryingCostEur),
    unitBaseCostEur: roundTo2(unitBaseCostEur),
    baseCostPerPrintEur: roundTo2(unitBaseCostEur),
    unitSellPriceEur: roundTo2(unitSellPriceEur),
    costWithMarginPerPrintEur: roundTo2(unitSellPriceEur),
    printsSubtotalEur: roundTo2(printsSubtotalEur),
    designCostEur: roundTo2(designCostEur),
    deliveryCostEur: roundTo2(deliveryCostEur),
    extraAllowancesEur: roundTo2(extraAllowancesEur),
    subtotalBeforeDeliveryEur: roundTo2(subtotalBeforeDeliveryEur),
    subtotalBeforeDiscountEur: roundTo2(subtotalBeforeDiscountEur),
    discountValueEur: roundTo2(discountValueEur),
    totalEur: roundTo2(totalEur),
    pricePerPrintEur: roundTo2(pricePerPrintEur),
  };
}

// Handige helper voor de prijstegels: gebruikt default gewicht + tijd per tier
export function calcUnitPrice(
  tier: Tier,
  material: MaterialKey,
  quality: Quality = "Standaard",
): number {
  const grams = GRAMS_PER_TIER[tier] ?? 0;
  const hours = PRINT_TIME_HOURS_PER_TIER[tier] ?? 1.5;
  const result = calculatePrintJob({
    filamentWeightGrams: grams,
    printingTimeHours: hours,
    material,
    quality,
    quantity: 1,
  });
  return result.pricePerPrintEur;
}

function roundTo2(n: number): number {
  return Math.round(n * 100) / 100;
}

export type ProductionTimeInput = {
  quantity: number;
  itemsPerJob: number;
  printHoursPerJob: number;
  setupMinutesPerJob?: number;
  riskBufferPercent?: number;
};

export type ProductionTimeEstimate = {
  jobsCount: number;
  pureHours: number;
  setupHours: number;
  bufferHours: number;
  totalHours: number;
  days: number;
  hours: number;
  minutes: number;
};

export function estimateProductionTime(input: ProductionTimeInput): ProductionTimeEstimate {
  if (input.quantity < 1) throw new Error("Aantal moet minstens 1 zijn.");
  if (input.itemsPerJob < 1) throw new Error("Items per job moet minstens 1 zijn.");
  if (input.printHoursPerJob <= 0) throw new Error("Printtijd per job moet > 0 zijn.");

  const jobsCount = Math.ceil(input.quantity / input.itemsPerJob);
  const setupMinutesPerJob = input.setupMinutesPerJob ?? 15;
  const riskBufferPercent = input.riskBufferPercent ?? 10;

  const pureHours = input.printHoursPerJob * jobsCount;
  const setupHours = (setupMinutesPerJob / 60) * jobsCount;
  const bufferHours = (pureHours + setupHours) * Math.max(riskBufferPercent, 0) * 0.01;
  const totalHours = pureHours + setupHours + bufferHours;

  const days = Math.floor(totalHours / 24);
  const remainingHours = totalHours - days * 24;
  let hours = Math.floor(remainingHours);
  let minutes = Math.round((remainingHours - hours) * 60);

  if (minutes === 60) {
    hours += 1;
    minutes = 0;
  }

  if (hours === 24) {
    return {
      jobsCount,
      pureHours: roundTo2(pureHours),
      setupHours: roundTo2(setupHours),
      bufferHours: roundTo2(bufferHours),
      totalHours: roundTo2(totalHours),
      days: days + 1,
      hours: 0,
      minutes,
    };
  }

  return {
    jobsCount,
    pureHours: roundTo2(pureHours),
    setupHours: roundTo2(setupHours),
    bufferHours: roundTo2(bufferHours),
    totalHours: roundTo2(totalHours),
    days,
    hours,
    minutes,
  };
}
