// Kostprijslogica: ENKEL voor server/build (pagina's, metadata, tests).
// Hier zitten de aankoopprijzen en marges. Importeer dit nooit in een "use client"-component:
// de browser krijgt enkel PublicRates (zie lib/pricing-public.ts). scripts/check-no-cost-leak.mjs bewaakt dat.
import { GUIDE_ONLY_FILAMENT_PRICE_EUR_PER_KG, X3D_FILAMENT_PRICE_EUR_PER_KG } from "./material-prices"
import type { PublicRates } from "./pricing-public"

export const DEFAULT_ELECTRICITY_COST_EUR_PER_KWH = 0.23
export const DEFAULT_PRINTER_POWER_KW = 2 // H2S/H2C; zo valt de publieke richtprijs nooit onder de offerte.
export const DEFAULT_MATERIAL_MARKUP = 0.2 // +20%
export const DEFAULT_PROFIT_FACTOR = 3 // 200% marge => basiskost * 3
export const PUBLIC_ESTIMATE_BUFFER = 1.1 // Publieke indicatie blijft bewust 10% boven de interne calculatie.

// Alles wat vooraf gedroogd moet worden krijgt de droogtoeslag (beslist 2026-10-05).
export const DRYING_MATERIALS = ["TPU", "PLA_WOOD", "PETG", "PC", "PC_FR", "ASA", "ASA_CF", "PAHT_CF"]

/** Zet aankoopprijzen en marges om naar verkooptarieven voor de browser. */
export function buildPublicRates(): PublicRates {
  const sellFactor = (1 + DEFAULT_MATERIAL_MARKUP) * DEFAULT_PROFIT_FACTOR * PUBLIC_ESTIMATE_BUFFER
  const costPerKg: Record<string, number> = { ...X3D_FILAMENT_PRICE_EUR_PER_KG, ...GUIDE_ONLY_FILAMENT_PRICE_EUR_PER_KG }
  const materialEurPerGram = Object.fromEntries(
    Object.entries(costPerKg).map(([key, eurPerKg]) => [key, (eurPerKg / 1000) * sellFactor]),
  )
  return {
    materialEurPerGram,
    printHourEur:
      DEFAULT_PRINTER_POWER_KW * DEFAULT_ELECTRICITY_COST_EUR_PER_KWH * DEFAULT_PROFIT_FACTOR * PUBLIC_ESTIMATE_BUFFER,
    dryingMaterials: DRYING_MATERIALS,
  }
}

function roundTo2(n: number): number {
  return Math.round(n * 100) / 100
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
