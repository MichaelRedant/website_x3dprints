import { describe, expect, it } from "vitest";

import { X3D_FILAMENT_PRICE_EUR_PER_KG } from "./material-prices";
import { buildPublicRates, estimateProductionTime } from "./pricing";
import {
  calculateDeliveryCost,
  calculateDryingCost,
  calculatePublicPrintJob,
  floorPublicEur,
  publicUnitPrice,
} from "./pricing-public";

const rates = buildPublicRates();

describe("pricing", () => {
  it("turns purchase prices into sell rates: material x1.2, x3 margin, x1.1 public buffer", () => {
    const perGram = (X3D_FILAMENT_PRICE_EUR_PER_KG.PLA_BASIC / 1000) * 1.2 * 3 * 1.1;
    expect(rates.materialEurPerGram.PLA_BASIC).toBeCloseTo(perGram, 10);
    // 2 kW x EUR 0.23/kWh x 3 x 1.1
    expect(rates.printHourEur).toBeCloseTo(2 * 0.23 * 3 * 1.1, 10);
  });

  it("charges shipping per weight band and nothing for pickup", () => {
    expect(calculateDeliveryCost("afhaling", 3000)).toBe(0);
    expect(calculateDeliveryCost("verzending", 500)).toBe(7.5);
    expect(calculateDeliveryCost("verzending", 2000)).toBe(7.5);
    expect(calculateDeliveryCost("verzending", 2001)).toBe(8);
    expect(calculateDeliveryCost("verzending", 10000)).toBe(9);
    expect(calculateDeliveryCost("verzending", 10001)).toBeNull();
  });

  it("adds drying on top of the print price, outside margin and buffer", () => {
    const result = calculatePublicPrintJob({ grams: 100, hours: 1, material: "PC", quantity: 10 }, rates);
    const printOnly = (100 * rates.materialEurPerGram.PC + rates.printHourEur) * 10;

    expect(calculateDryingCost("PC", 10, rates)).toBeCloseTo(5.5, 2);
    expect(result.printsSubtotalEur).toBeCloseTo(printOnly + 5.5, 6);
  });

  it("dries ASA and not PLA", () => {
    expect(calculateDryingCost("ASA", 1, rates)).toBeGreaterThan(0);
    expect(calculateDryingCost("PLA_MATTE", 1, rates)).toBe(0);
  });

  it("never goes below the minimum per print job", () => {
    const result = calculatePublicPrintJob({ grams: 5, hours: 0.5, material: "PLA_BASIC", quantity: 1 }, rates);
    expect(result.printsSubtotalEur).toBe(5);
    expect(result.totalEur).toBe(5);
  });

  it("uses EUR 45 per hour for design and CAD", () => {
    const result = calculatePublicPrintJob({ grams: 100, hours: 1, material: "PLA_BASIC", quantity: 1, designHours: 2 }, rates);
    expect(result.designCostEur).toBe(90);
  });

  it("rounds public totals down to whole euros", () => {
    expect(floorPublicEur(8.99)).toBe(8);
    expect(floorPublicEur(0.87)).toBe(0.8);
    expect(publicUnitPrice("Small", "PLA_MATTE", rates)).toBe(6);
    expect(publicUnitPrice("Medium", "PLA_MATTE", rates)).toBe(25);
    expect(publicUnitPrice("Large", "PLA_MATTE", rates)).toBe(62);
  });
});

describe("estimateProductionTime", () => {
  it("computes batches and buffered total time", () => {
    const estimate = estimateProductionTime({
      quantity: 100,
      itemsPerJob: 19,
      printHoursPerJob: 3.2,
    });

    expect(estimate.jobsCount).toBe(6);
    expect(estimate.totalHours).toBeCloseTo(22.77, 2);
    expect(estimate.hours).toBe(22);
    expect(estimate.minutes).toBe(46);
  });
});
