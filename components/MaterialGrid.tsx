// components/MaterialGrid.tsx
"use client"

import { useEffect, useState } from "react"
import Reveal from "@/components/Reveal"
import MaterialCard from "@/components/MaterialCard"
import type { MaterialKey } from "@/lib/materials"
import { useLocale } from "./LocaleProvider"
import { localizeHref } from "@/lib/i18n/paths"

type Swatch = { label: string; fill: string; inStock: boolean }
type MaterialItem = {
  key: MaterialKey
  anchorId: string
  slug: string
  title: string
  description?: string
  features: string[]
  swatches: Swatch[]
  faq: { question: string; answer: string }[]
}

type Overrides = Record<string, Record<string, boolean>>

type MaterialGridProps = {
  materials: MaterialItem[]
}

export default function MaterialGrid({ materials }: MaterialGridProps) {
  const { locale } = useLocale()
  const localize = (href: string) => localizeHref(href, locale)
  const [overrides, setOverrides] = useState<Overrides>({})

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const res = await fetch("/material-stock.php", { cache: "no-store" })
        if (!res.ok) return
        const data = (await res.json()) as Overrides
        if (!cancelled && data && typeof data === "object") {
          setOverrides(data)
        }
      } catch {
        // stil: fallback op defaults
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  const withOverrides = materials.map((m) => {
    const map = overrides[m.key] || {}
    return {
      ...m,
      swatches: m.swatches.map((s) => ({
        ...s,
        inStock: typeof map[s.label] === "boolean" ? map[s.label] : s.inStock,
      })),
    }
  })

  return (
    <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2">
      {withOverrides.map((m, i) => (
        <Reveal key={m.title} delay={i * 0.04}>
          <MaterialCard
            anchorId={m.anchorId}
            title={m.title}
            description={m.description}
            features={m.features}
            swatches={m.swatches}
            href={localize(`/materials/${m.slug}`)}
            faq={m.faq}
          />
        </Reveal>
      ))}
    </div>
  )
}
