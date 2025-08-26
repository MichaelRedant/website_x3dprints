// components/MaterialCard.tsx
import MaterialSwatches, { Swatch } from "./MaterialSwatches"

export default function MaterialCard({
  title,
  description,
  features,
  swatches,
}: {
  title: string
  description: string
  features?: string[]
  swatches: Swatch[]
}) {
  const inStock = swatches.filter((s) => s.inStock).length
  const total = swatches.length
  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <div className="text-xs text-slate-500">
          {inStock > 0 ? `${inStock} op voorraad · ${total - inStock} op bestelling` : "Op bestelling"}
        </div>
      </div>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
      {features && features.length > 0 && (
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-600">
          {features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      )}
      <MaterialSwatches colors={swatches} />
    </div>
  )
}
