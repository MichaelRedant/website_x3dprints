"use client"

import type { FormEvent } from "react"
import type { ProductDraft } from "@/lib/crm/types"
import { PRODUCT_AVAILABILITY_OPTIONS } from "@/lib/crm/types"

type ProductModalProps = {
  open: boolean
  mode: "create" | "edit"
  draft: ProductDraft
  saving: boolean
  canSubmit: boolean
  onClose: () => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  onChange: (key: keyof ProductDraft, value: ProductDraft[keyof ProductDraft]) => void
}

export default function ProductModal({
  open,
  mode,
  draft,
  saving,
  canSubmit,
  onClose,
  onSubmit,
  onChange,
}: ProductModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/80 px-4 py-8 backdrop-blur-sm">
      <section className="w-full max-w-4xl rounded-2xl border border-white/10 bg-slate-950/95 p-6 shadow-2xl shadow-black/40">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-indigo-300">Product</p>
            <h3 className="text-xl font-bold text-white">
              {mode === "create" ? "Nieuw product" : `Bewerk ${draft.slug}`}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-white/20 px-2 py-1 text-xs font-semibold text-white transition hover:bg-white/10"
          >
            Sluiten
          </button>
        </div>

        <form className="mt-5 grid gap-3" onSubmit={onSubmit}>
          <div className="grid gap-3 sm:grid-cols-3">
            <label className="grid gap-1 text-sm font-semibold text-white">
              Slug
              <input
                value={draft.slug}
                onChange={(event) => onChange("slug", event.target.value)}
                required
                disabled={mode === "edit"}
                className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-slate-400 disabled:opacity-60"
                placeholder="desk-clip"
              />
            </label>
            <label className="grid gap-1 text-sm font-semibold text-white">
              Prijs (EUR)
              <input
                type="number"
                min={0}
                step="0.01"
                value={draft.priceEur}
                onChange={(event) => onChange("priceEur", event.target.value)}
                required
                className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-slate-400"
                placeholder="12.50"
              />
            </label>
            <label className="grid gap-1 text-sm font-semibold text-white">
              Sortering
              <input
                type="number"
                step="1"
                value={draft.sortOrder}
                onChange={(event) => onChange("sortOrder", event.target.value)}
                className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-slate-400"
                placeholder="10"
              />
            </label>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="grid gap-1 text-sm font-semibold text-white">
              Naam (NL)
              <input
                value={draft.nameNl}
                onChange={(event) => onChange("nameNl", event.target.value)}
                required
                className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-slate-400"
              />
            </label>
            <label className="grid gap-1 text-sm font-semibold text-white">
              Naam (EN)
              <input
                value={draft.nameEn}
                onChange={(event) => onChange("nameEn", event.target.value)}
                required
                className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-slate-400"
              />
            </label>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="grid gap-1 text-sm font-semibold text-white">
              Samenvatting (NL)
              <textarea
                value={draft.summaryNl}
                onChange={(event) => onChange("summaryNl", event.target.value)}
                rows={3}
                required
                className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-slate-400"
              />
            </label>
            <label className="grid gap-1 text-sm font-semibold text-white">
              Samenvatting (EN)
              <textarea
                value={draft.summaryEn}
                onChange={(event) => onChange("summaryEn", event.target.value)}
                rows={3}
                required
                className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-slate-400"
              />
            </label>
          </div>

          <label className="grid gap-1 text-sm font-semibold text-white">
            Tags (komma-gescheiden)
            <input
              value={draft.tags}
              onChange={(event) => onChange("tags", event.target.value)}
              className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-slate-400"
              placeholder="desk, cable, office"
            />
          </label>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="grid gap-1 text-sm font-semibold text-white">
              Beschikbaarheid
              <select
                value={draft.availability}
                onChange={(event) => onChange("availability", event.target.value)}
                className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white"
              >
                {PRODUCT_AVAILABILITY_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="mt-6 flex items-center gap-2 text-sm font-semibold text-white">
              <input
                type="checkbox"
                checked={draft.isLive}
                onChange={(event) => onChange("isLive", event.target.checked)}
                className="h-4 w-4 rounded border-white/30 bg-transparent text-indigo-400"
              />
              Publiek zichtbaar
            </label>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="grid gap-1 text-sm font-semibold text-white">
              Lead time min (dagen)
              <input
                type="number"
                min={0}
                step="1"
                value={draft.leadTimeMin}
                onChange={(event) => onChange("leadTimeMin", event.target.value)}
                className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-slate-400"
              />
            </label>
            <label className="grid gap-1 text-sm font-semibold text-white">
              Lead time max (dagen)
              <input
                type="number"
                min={0}
                step="1"
                value={draft.leadTimeMax}
                onChange={(event) => onChange("leadTimeMax", event.target.value)}
                className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-slate-400"
              />
            </label>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="grid gap-1 text-sm font-semibold text-white">
              Image URL
              <input
                value={draft.imageUrl}
                onChange={(event) => onChange("imageUrl", event.target.value)}
                required
                className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-slate-400"
                placeholder="/images/..."
              />
            </label>
            <label className="grid gap-1 text-sm font-semibold text-white">
              Alt (NL)
              <input
                value={draft.imageAltNl}
                onChange={(event) => onChange("imageAltNl", event.target.value)}
                required
                className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-slate-400"
              />
            </label>
          </div>

          <label className="grid gap-1 text-sm font-semibold text-white">
            Alt (EN)
            <input
              value={draft.imageAltEn}
              onChange={(event) => onChange("imageAltEn", event.target.value)}
              required
              className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-slate-400"
            />
          </label>

          <div className="mt-2 flex items-center gap-2">
            <button
              type="submit"
              disabled={saving || !canSubmit}
              className="inline-flex items-center justify-center rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5 hover:bg-indigo-400 disabled:opacity-60"
            >
              {saving ? "Opslaan..." : mode === "create" ? "Product toevoegen" : "Product opslaan"}
            </button>
            <p className="text-xs text-slate-400">Snelle bewerking via modal zonder paginawissel.</p>
          </div>
        </form>
      </section>
    </div>
  )
}
