import { X3D_FILAMENT_PRICE_EUR_PER_KG, type MaterialKey } from "./material-prices";

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

export type DeliveryType = "afhaling" | "verzending";

const BASE_PRICE_FALLBACK_EUR_PER_KG = X3D_FILAMENT_PRICE_EUR_PER_KG.PLA_BASIC;

// Alles wat vooraf gedroogd moet worden krijgt de droogtoeslag (ASA en vezelmaterialen: zie price-guide).
export const DRYING_FILAMENTS = new Set<MaterialKey>(["TPU", "PLA_WOOD", "PETG", "PC", "PC_FR"]);
export const DRYING_FIXED_SURCHARGE_EUR = 5;
export const DRYING_COST_PER_PRINT_EUR = 0.05;

export const DEFAULT_ELECTRICITY_COST_EUR_PER_KWH = 0.23;
export const DEFAULT_PRINTER_POWER_KW = 2; // H2S/H2C; zo valt de publieke richtprijs nooit onder de offerte.
export const DEFAULT_MATERIAL_MARKUP = 0.2; // +20%
export const DEFAULT_PROFIT_FACTOR = 3; // 200% marge => basiskost * 3
export const DEFAULT_DESIGN_RATE_EUR_PER_HOUR = 45;
export const PUBLIC_ESTIMATE_BUFFER = 1.1; // Publieke indicatie blijft bewust 10% boven de interne calculatie.
export const MINIMUM_PRINT_JOB_EUR = 5; // Ondergrens per printopdracht; niet expliciet vermelden in copy.

// Verzending per gewichtsschijf (max. gewicht in gram, prijs in EUR). Zwaarder: op aanvraag.
export const SHIPPING_RATES_EUR: ReadonlyArray<{ maxGrams: number; priceEur: number }> = [
  { maxGrams: 2000, priceEur: 7.5 },
  { maxGrams: 5000, priceEur: 8 },
  { maxGrams: 10000, priceEur: 9 },
];

export type PriceInput = {
  printingTimeHours: number;
  filamentWeightGrams: number;
  material: MaterialKey;
  /** Prijs per kg voor materialen buiten MaterialKey (prijswijzer); overschrijft de materiaalprijs. */
  materialPricePerKg?: number;
  /** Overschrijft of het materiaal gedroogd moet worden. */
  requiresDrying?: boolean;
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
  publicEstimateBuffer?: number;
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

// Geeft null terug als de zending zwaarder is dan de hoogste schijf (prijs op aanvraag).
export function calculateDeliveryCost(
  deliveryType: DeliveryType,
  shipmentWeightGrams: number,
): number | null {
  if (deliveryType === "afhaling") return 0;
  const rate = SHIPPING_RATES_EUR.find((r) => shipmentWeightGrams <= r.maxGrams);
  return rate ? rate.priceEur : null;
}

// Publieke bedragen naar beneden afronden: hele euro's, onder EUR 1 per tiental cent.
export function floorPublicEur(n: number): number {
  if (n >= 1) return Math.floor(n);
  return Math.floor(n * 10) / 10;
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
  const publicEstimateBuffer = job.publicEstimateBuffer ?? PUBLIC_ESTIMATE_BUFFER;
  const designRate = job.designRateEurPerHour ?? DEFAULT_DESIGN_RATE_EUR_PER_HOUR;
  const electricityCost = job.electricityCostPerKwh ?? DEFAULT_ELECTRICITY_COST_EUR_PER_KWH;
  const printerPower = job.printerPowerKw ?? DEFAULT_PRINTER_POWER_KW;
  const quality = job.quality ?? "Standaard";
  const qualityMultiplier = QUALITY_TIME_MULTIPLIER[quality] ?? 1;

  const materialPricePerKg =
    job.materialPricePerKg ??
    X3D_FILAMENT_PRICE_EUR_PER_KG[job.material] ??
    BASE_PRICE_FALLBACK_EUR_PER_KG;
  const unitFilamentCostEur = (job.filamentWeightGrams / 1000) * materialPricePerKg;
  const unitFilamentWithMarkupEur = unitFilamentCostEur * (1 + materialMarkup);

  const effectivePrintHours = job.printingTimeHours * qualityMultiplier;
  const unitElectricityEur = effectivePrintHours * printerPower * electricityCost;

  const unitBaseCostEur = unitFilamentWithMarkupEur + unitElectricityEur;
  const dryingCostEur =
    job.requiresDrying === undefined
      ? calculateDryingCost(job.material, job.quantity)
      : job.requiresDrying
        ? DRYING_FIXED_SURCHARGE_EUR + DRYING_COST_PER_PRINT_EUR * job.quantity
        : 0;
  // Droogtoeslag komt bovenop de printprijs en gaat niet mee in marge of buffer.
  const totalDirectPrintCostEur = unitBaseCostEur * job.quantity;
  const printsSubtotalEur =
    Math.max(totalDirectPrintCostEur * profitFactor * publicEstimateBuffer, MINIMUM_PRINT_JOB_EUR) +
    dryingCostEur;
  const unitSellPriceEur = printsSubtotalEur / job.quantity;
  const designCostEur = (job.designHours ?? 0) * designRate;
  const extraAllowancesEur = job.extraAllowancesEur ?? 0;

  const subtotalBeforeDeliveryEur =
    printsSubtotalEur + designCostEur + extraAllowancesEur;
  const deliveryType = job.deliveryType ?? "afhaling";
  const deliveryCostEur =
    calculateDeliveryCost(deliveryType, job.filamentWeightGrams * job.quantity) ?? 0;

  const subtotalBeforeDiscountEur = subtotalBeforeDeliveryEur + deliveryCostEur;
  const discountPercent = Math.min(Math.max(job.discountPercent ?? 0, 0), 100);
  const discountValueEur = subtotalBeforeDiscountEur * (discountPercent / 100);

  const totalEur = floorPublicEur(subtotalBeforeDiscountEur - discountValueEur);
  const pricePerPrintEur = floorPublicEur(totalEur / job.quantity);

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
    totalEur,
    pricePerPrintEur,
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
