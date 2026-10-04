import { describe, expect, it } from "vitest"

import { buildPublicRates } from "./pricing"
import { GUIDE_OPTIONS, computeGuide, guideUnitPrice } from "./price-guide"

const rates = buildPublicRates()

describe("price guide", () => {
  it("offers at most one option per level for every use", () => {
    for (const options of Object.values(GUIDE_OPTIONS)) {
      const levels = options.map((o) => o.level)
      expect(new Set(levels).size).toBe(levels.length)
      expect(levels).toContain("advice")
    }
  })

  it("returns whole-euro prices and never less than EUR 5", () => {
    const result = computeGuide(
      { start: "file", use: "functional", size: "custom", customGrams: 3, customHours: 0.2, quantity: 1, includePrint: true },
      "nl",
      rates,
    )
    for (const option of result.options) {
      expect(Number.isInteger(option.total)).toBe(true)
      expect(option.total).toBeGreaterThanOrEqual(5)
    }
  })

  it("adds one hour of design for a broken part and an idea", () => {
    const broken = computeGuide({ start: "broken", use: "functional", size: "Small", quantity: 1, includePrint: true }, "nl", rates)
    expect(broken.modelingCost).toBe(45)
    expect(broken.options[1].total).toBe(Math.floor(broken.options[1].printTotal + 45))

    const file = computeGuide({ start: "file", use: "functional", size: "Small", quantity: 1, includePrint: true }, "nl", rates)
    expect(file.modelingCost).toBe(0)
  })

  it("prices a scan on its own when no print is wanted", () => {
    const result = computeGuide(
      { start: "scan", use: "decor", size: "Medium", quantity: 1, scanKey: "medium-object", includePrint: false },
      "en",
      rates,
    )
    expect(result.options).toHaveLength(0)
    expect(result.scanCost).toBe(75)
  })

  it("uses the guide-only material price for ASA", () => {
    expect(guideUnitPrice("ASA", "Medium", rates)).toBeLessThan(guideUnitPrice("PC", "Medium", rates))
  })
})
