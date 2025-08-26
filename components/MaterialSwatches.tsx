// components/MaterialSwatches.tsx
import type { CSSProperties } from "react"

export type Swatch = {
  label: string
  /** Kan een hex (#000), rgb(), of gradient zijn (linear-/conic-/radial-gradient(...)) */
  fill: string
  inStock?: boolean
}

export default function MaterialSwatches({ colors }: { colors: Swatch[] }) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {colors.map((s) => (
        <div key={s.label} className="group relative">
          <span
            title={`${s.label}${s.inStock ? " — op voorraad" : " — op bestelling"}`}
            className={[
              "block h-5 w-5 rounded-full border border-slate-300 shadow-sm",
              s.inStock ? "" : "opacity-70",
            ].join(" ")}
            style={{ background: s.fill } as CSSProperties}
          />
          {!s.inStock && (
            <span
              className="pointer-events-none absolute inset-0 rounded-full"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(135deg, rgba(0,0,0,.08) 0 4px, rgba(0,0,0,0) 4px 8px)",
              }}
            />
          )}
        </div>
      ))}
    </div>
  )
}
