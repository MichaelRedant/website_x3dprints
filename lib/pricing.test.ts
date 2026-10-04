import { describe, expect, it } from "vitest";

import {
  calcUnitPrice,
  calculateDeliveryCost,
  calculateDryingCost,
  calculatePrintJob,
  estimateProductionTime,
  floorPublicEur,
} from "./pricing";

describe("pricing", () => {
  it("keeps the public estimate above the internal production calculation", () => {
    const breakdown = calculatePrintJob({
      filamentWeightGrams: 100,
      printingTimeHours: 1,
      material: "PLA_BASIC",
      quantity: 1,
      profitFactor: 3,
    });

    expect(breakdown.unitSellPriceEur / breakdown.unitBaseCostEur).toBeCloseTo(3.3, 2);
  });

  it("charges shipping per weight band and nothing for pickup", () => {
    expect(calculateDeliveryCost("afhaling", 3000)).toBe(0);
    expect(calculateDeliveryCost("verzending", 500)).toBe(7.5);
    expect(calculateDeliveryCost("verzending", 2000)).toBe(7.5);
    expect(calculateDeliveryCost("verzending", 2001)).toBe(8);
    expect(calculateDeliveryCost("verzending", 10000)).toBe(9);
    expect(calculateDeliveryCost("verzending", 10001)).toBeNull();
  });

  it("never goes below the minimum per print job", () => {
    const breakdown = calculatePrintJob({
      filamentWeightGrams: 5,
      printingTimeHours: 0.5,
      material: "PLA_BASIC",
      quantity: 1,
    });

    expect(breakdown.printsSubtotalEur).toBe(5);
    expect(breakdown.totalEur).toBe(5);
  });

  it("rounds public totals down to whole euros", () => {
    expect(floorPublicEur(8.99)).toBe(8);
    expect(floorPublicEur(0.87)).toBe(0.8);
    expect(calcUnitPrice("Small", "PLA_MATTE")).toBe(6);
    expect(calcUnitPrice("Medium", "PLA_MATTE")).toBe(25);
    expect(calcUnitPrice("Large", "PLA_MATTE")).toBe(62);
  });

  it("adds drying on top of the print price, outside margin and buffer", () => {
    const breakdown = calculatePrintJob({
      filamentWeightGrams: 100,
      printingTimeHours: 1,
      material: "PC",
      quantity: 10,
      profitFactor: 3,
    });

    expect(calculateDryingCost("PC", 10)).toBeCloseTo(5.5, 2);
    expect(breakdown.printsSubtotalEur).toBeCloseTo(
      breakdown.unitBaseCostEur * 10 * 3 * 1.1 + breakdown.dryingCostEur,
      1,
    );
  });

  it("uses EUR 45 per hour for design and CAD by default", () => {
    const breakdown = calculatePrintJob({
      filamentWeightGrams: 100,
      printingTimeHours: 1,
      material: "PLA_BASIC",
      quantity: 1,
      designHours: 2,
    });

    expect(breakdown.designCostEur).toBe(90);
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
