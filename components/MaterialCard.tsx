// components/MaterialCard.tsx
import Link from "next/link"
import React from "react"
import GlassCard from "@/components/GlassCard"
import type { FaqItem } from "@/content/material-details"

type Swatch = {
  label: string
  fill: string // hex of css-gradient
  inStock?: boolean // default: false = op bestelling
}

type Props = {
  title: string
  description?: string
  features?: string[]
  swatches: Swatch[]
  className?: string
  anchorId?: string // NIEUW: voor deeplinks / headings
  href?: string
  ctaLabel?: string
  faq?: FaqItem[]
}

export default function MaterialCard({
  title,
  description,
  features = [],
  swatches,
  className,
  anchorId,
  href,
  ctaLabel,
}: Props) {
  return (
    <section id={anchorId} aria-labelledby={`${(anchorId || "mat")}-title`}>
      <GlassCard className={["h-full p-6", className].filter(Boolean).join(" ")}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              id={`${(anchorId || "mat")}-title`}
              className="text-lg font-semibold text-slate-900"
            >
              {title}
            </h2>
            {description ? (
              <p className="mt-1 text-sm text-slate-600">{description}</p>
            ) : null}
          </div>
        </div>

        {/* Features */}
        {features.length > 0 && (
          <ul className="mt-4 grid gap-1.5 text-sm text-slate-600">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Swatches */}
        <div className="mt-5 flex flex-wrap items-center gap-2.5">
          {swatches.map((s) => {
            const stocked = s.inStock === true
            return (
              <div key={s.label} className="group">
                <div
                  className={[
                    "relative h-6 w-6 rounded-full ring-1 transition",
                    stocked ? "ring-slate-300 shadow-sm" : "ring-slate-200 opacity-80",
                  ].join(" ")}
                  title={`${s.label}${stocked ? " (op voorraad)" : " (op bestelling)"}`}
                  aria-label={`${s.label}${stocked ? " op voorraad" : " op bestelling"}`}
                  style={{ background: s.fill }}
                >
                  {!stocked && (
                    <span
                      className="pointer-events-none absolute inset-0 rounded-full"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(135deg, rgba(0,0,0,.18) 0 4px, rgba(0,0,0,0) 4px 8px)",
                      }}
                      aria-hidden
                    />
                  )}
                </div>
                <div className="mt-1 text-[11px] text-slate-500 text-center">{s.label}</div>
              </div>
            )
          })}
        </div>

        {href ? (
          <div className="mt-6">
            <Link
              href={href}
              className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 transition hover:text-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              {ctaLabel ?? "Meer lezen"}
              <span aria-hidden>&rarr;</span>
            </Link>
          </div>
        ) : null}
      </GlassCard>
    </section>
  )
}
