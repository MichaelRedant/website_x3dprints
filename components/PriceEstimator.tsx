"use client";

import { useMemo, useState } from "react";
import { MATERIALS } from "@/lib/materials";

/* ========= Types ========= */

type Tier = "Small" | "Medium" | "Large";
type Quality = "Standaard" | "Fijn";

type MaterialKey = keyof typeof MATERIALS;
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

  PLA_TOUGH_PLUS: 1,
  PLA_GLOW: 1,
  PLA_MARBLE: 1,
  PLA_SPARKLE: 1,
  PLA_METAL: 1,
  PLA_GALAXY: 1,
  PLA_AERO: 1,
  PLA_SILK_PLUS: 1,
  PLA_BASIC_GRADIENT: 1,
  PLA_BASIC: 1,
  PLA_MATTE: 1,
  PLA_TRANSLUCENT: 1,
  PLA_SILK_MULTI_COLOR: 1,
  PLA_CF: 1,
  PLA_WOOD: 1,

  PETG: 1.25, // droger-toeslag inbegrepen
  TPU: 1.25,  // idem
};

/* ========= Helpers ========= */

function safeMaterialKey(key: string): MaterialKey {
  return (Object.prototype.hasOwnProperty.call(MATERIALS, key)
    ? key
    : "PLA_MATTE") as MaterialKey;
}

function getColorsForMaterial(material: MaterialKey): Array<{
  key: ColorKey;
  label: string;
  inStock?: boolean;
  hex?: string;
}> {
  const entry = MATERIALS[material];
  return entry.swatches.map((s, i) => ({
    key: s.label ?? String(i),
    label: s.label ?? String(i),
    inStock: s.inStock,
    hex: s.color,
  }));
}

function formatCurrency(n: number): string {
  return `€ ${n.toFixed(2).replace(".00", "")}`;
}

/* ========= Component ========= */

export default function PriceEstimator() {
  const defaultMaterial: MaterialKey = "PLA_MATTE";
  const [tier, setTier] = useState<Tier>("Medium");
  const [material, setMaterial] = useState<MaterialKey>(defaultMaterial);
  const [quality, setQuality] = useState<Quality>("Standaard");
  const [qty, setQty] = useState<number>(1);
  const [color, setColor] = useState<ColorKey>(
    MATERIALS[defaultMaterial].swatches[0].label,
  );

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
            {Object.entries(MATERIALS).map(([k, v]) => (
              <option key={k} value={k}>
                {v.name}
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
