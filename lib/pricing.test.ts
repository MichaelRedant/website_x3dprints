import { describe, expect, it } from "vitest";

import {
  calculateDeliveryCost,
  calculateDryingCost,
  calculatePrintJob,
  estimateProductionTime,
} from "./pricing";

describe("pricing", () => {
  it("applies profit factor to unit sell price", () => {
    const breakdown = calculatePrintJob({
      filamentWeightGrams: 100,
      printingTimeHours: 1,
      material: "PLA_BASIC",
      quantity: 1,
      profitFactor: 3,
    });

    expect(breakdown.unitSellPriceEur / breakdown.unitBaseCostEur).toBeCloseTo(3, 2);
  });

  it("applies correct delivery thresholds for post", () => {
    expect(calculateDeliveryCost("post", 49)).toBe(7);
    expect(calculateDeliveryCost("post", 50)).toBe(5);
  });

  it("applies drying cost for PC without margin multiplication", () => {
    expect(calculateDryingCost("PC", 10)).toBeCloseTo(5.5, 2);
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
