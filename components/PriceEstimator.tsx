"use client";

import { useMemo, useState } from "react";
import { MATERIALS } from "@/lib/materials";

/* ========= Types ========= */

type Tier = "Small" | "Medium" | "Large";
type Quality = "Standaard" | "Fijn";

type MaterialKey = keyof typeof MATERIALS | "PLA Matte" | "PETG" | "TPU"; // fallback keys
type ColorKey = string;

/* ========= Pricing model (hou dit in sync met je prijzenpagina) ========= */

const TIER_BASE_PRICE: Record<Tier, number> = {
  Small: 10,
  Medium: 15,
  Large: 26,
};

const QUALITY_MULTIPLIER: Record<Quality, number> = {
  Standaard: 1,
  Fijn: 1.2,
};

const MATERIAL_MULTIPLIER: Record<MaterialKey, number> = {
  "PLA Matte": 1,
  PETG: 1.25, // droger-toeslag inbegrepen
  TPU: 1.25,  // idem
  // Als je MATERIALS gebruikt met uitgebreidere keys, defaulten we naar 1
  ...(Object.keys(MATERIALS).reduce((acc, k) => {
    acc[k as MaterialKey] = acc[k as MaterialKey] ?? 1;
    return acc;
  }, {} as Record<MaterialKey, number>)),
};

/* ========= Helpers ========= */

function safeMaterialKey(key: string): MaterialKey {
  if ((MATERIALS as any)[key]) return key as MaterialKey;
  if (key === "PLA Matte" || key === "PETG" || key === "TPU") return key;
  return "PLA Matte";
}

function getColorsForMaterial(material: MaterialKey): Array<{
  key: ColorKey;
  label: string;
  inStock?: boolean;
  hex?: string;
}> {
  const entry = (MATERIALS as any)[material];
  if (!entry?.swatches) {
    // Fallbackswatches
    if (material === "PLA Matte") {
      return [
        { key: "zwart", label: "Zwart", inStock: true, hex: "#0a0a0a" },
        { key: "wit", label: "Wit", inStock: true, hex: "#f5f5f5" },
        { key: "blauw", label: "Blauw", inStock: true, hex: "#2563eb" },
        { key: "geel", label: "Geel", inStock: true, hex: "#facc15" },
        { key: "groen", label: "Groen", inStock: true, hex: "#22c55e" },
        { key: "rood", label: "Rood", inStock: true, hex: "#dc2626" },
      ];
    }
    if (material === "PETG") {
      return [
        { key: "zwart", label: "Zwart", inStock: true, hex: "#000000" },
        { key: "wit", label: "Wit", inStock: true, hex: "#ffffff" },
        { key: "transparant", label: "Transparant", inStock: true, hex: "#d0f0ff" },
      ];
    }
    if (material === "TPU") {
      return [{ key: "zwart", label: "Zwart", inStock: true, hex: "#000000" }];
    }
    return [];
  }

  // MATERIALS.swatches kan string of object bevatten; normaliseren
  return entry.swatches.map((s: any, i: number) => {
    if (typeof s === "string") {
      return { key: s, label: s, inStock: true };
    }
    return {
      key: s.label ?? String(i),
      label: s.label ?? String(i),
      inStock: s.inStock ?? false,
      hex: typeof s.fill === "string" && s.fill.startsWith("#") ? s.fill : undefined,
    };
  });
}

function formatCurrency(n: number): string {
  return `€ ${n.toFixed(2).replace(".00", "")}`;
}

/* ========= Component ========= */

export default function PriceEstimator() {
  const [tier, setTier] = useState<Tier>("Medium");
  const [material, setMaterial] = useState<MaterialKey>("PLA Matte");
  const [quality, setQuality] = useState<Quality>("Standaard");
  const [qty, setQty] = useState<number>(1);
  const [color, setColor] = useState<ColorKey>("geel"); // default van PLA Matte hierboven

  // kleurenlijst op basis van materiaal
  const colors = useMemo(() => getColorsForMaterial(material), [material]);

  // als gekozen kleur niet bestaat voor huidig materiaal, forceer eerste kleur
  const selectedColor = useMemo(() => {
    const found = colors.find((c) => c.key === color) ?? colors[0];
    return found;
  }, [colors, color]);

  // prijs per stuk
  const unitPrice = useMemo(() => {
    const base = TIER_BASE_PRICE[tier] ?? 0;
    const q = QUALITY_MULTIPLIER[quality] ?? 1;
    const m = MATERIAL_MULTIPLIER[safeMaterialKey(material)] ?? 1;
    return Math.round(base * q * m);
  }, [tier, quality, material]);

  const total = unitPrice * Math.max(1, qty);

  return (
    <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur">
      <h3 className="text-lg font-semibold text-slate-900">Snelle prijsinschatting</h3>
      <p className="mt-1 text-sm text-slate-600">
        Ruwe indicatie. Definitieve prijs na modelcontrole en exacte materiaalspecificaties.
      </p>

      {/* controls */}
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Formaat */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-slate-500">Formaat</label>
          <select
            className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none ring-0 focus:border-slate-300"
            value={tier}
            onChange={(e) => setTier(e.target.value as Tier)}
          >
            <option value="Small">Small (≤ 5 cm)</option>
            <option value="Medium">Medium (≤ 10 cm)</option>
            <option value="Large">Large (≤ 20 cm)</option>
          </select>
        </div>

        {/* Materiaal */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-slate-500">Materiaal</label>
          <select
            className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none ring-0 focus:border-slate-300"
            value={material}
            onChange={(e) => setMaterial(safeMaterialKey(e.target.value))}
          >
            <option>PLA Matte</option>
            <option>PETG</option>
            <option>TPU</option>
            {/* Optioneel: toon ook alle MATERIALS-keys */}
            {Object.keys(MATERIALS).map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        </div>

        {/* Kleur */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-slate-500">Kleur</label>
          <div className="flex items-center gap-2">
            <select
              className="h-11 flex-1 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none ring-0 focus:border-slate-300"
              value={selectedColor?.key ?? ""}
              onChange={(e) => setColor(e.target.value)}
            >
              {colors.map((c) => (
                <option key={c.key} value={c.key}>
                  {c.label}
                </option>
              ))}
            </select>
            <span
              className="inline-block h-5 w-5 rounded-full border border-slate-200"
              title={selectedColor?.label}
              style={selectedColor?.hex ? { background: selectedColor.hex } : undefined}
            />
          </div>
          {selectedColor && (
            <span
              className={`mt-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] ${
                selectedColor.inStock ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  selectedColor.inStock ? "bg-emerald-500" : "bg-amber-500"
                }`}
              />
              {selectedColor.inStock ? "Op voorraad" : "Op bestelling"}
            </span>
          )}
        </div>

        {/* Kwaliteit */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-slate-500">Kwaliteit</label>
          <select
            className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none ring-0 focus:border-slate-300"
            value={quality}
            onChange={(e) => setQuality(e.target.value as Quality)}
          >
            <option>Standaard</option>
            <option>Fijn</option>
          </select>
        </div>

        {/* Aantal (laat op nieuwe rij op small), maar aligned dankzij auto-rows */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-slate-500">Aantal</label>
          <input
            type="number"
            min={1}
            className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none ring-0 focus:border-slate-300"
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
          />
        </div>
      </div>

      {/* totals */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="text-xs uppercase tracking-wide text-slate-500">Indicatie per stuk</div>
          <div className="mt-1 text-2xl font-semibold text-slate-900">{formatCurrency(unitPrice)}</div>
          <div className="text-xs text-slate-500">Incl. gekozen materiaal/kwaliteit</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="text-xs uppercase tracking-wide text-slate-500">Totaal (excl. verzending)</div>
          <div className="mt-1 text-2xl font-semibold text-slate-900">{formatCurrency(total)}</div>
          <div className="text-xs text-slate-500">Indicatief; exacte offerte na modelcontrole</div>
        </div>
      </div>
    </div>
  );
}
