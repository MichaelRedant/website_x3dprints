 "use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import ShimmerButton from "./ShimmerButton"
import GlassCard from "./GlassCard"
import { trackEvent } from "@/lib/analytics"

type Props = {
  variant?: "top" | "bottom"
}

/**
 * Lightweight CTA band that reuses the page slug for UTM tracking.
 * Shown on every blog page via layout to boost click-through to money pages.
 */
export default function BlogInlineCta({ variant = "top" }: Props) {
  const pathname = usePathname()
  const slug = pathname?.split("/").filter(Boolean).pop() ?? "blog"
  const utm = `?utm_source=blog&utm_medium=cta&utm_campaign=${slug}`

  const contactHref = `/contact${utm}`
  const toolHref = `/materials${utm}#material-suggestion-tool`
  const pricingHref = `/pricing${utm}`

  const isTop = variant === "top"

  return (
    <section className={`${isTop ? "pt-6" : "pt-0"} pb-6 sm:pb-8`}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <GlassCard className="flex flex-col gap-3 border border-white/50 bg-white/80 p-4 shadow-md backdrop-blur sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Volgende stap</p>
              <h2 className="text-lg font-semibold text-slate-900">Vraag prijs of materiaaladvies</h2>
              <p className="text-sm text-slate-600">
                Start meteen met richtprijzen, of laat het materiaal kiezen via de wizard. Prefill blijft gekoppeld aan dit artikel.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 sm:justify-end">
              <ShimmerButton
                href={contactHref}
                onClick={() =>
                  trackEvent({ action: "cta_click", category: "blog_cta", label: "contact", value: 1 })
                }
              >
                Offerte / contact
              </ShimmerButton>
              <Link
                href={pricingHref}
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-100/70 bg-emerald-50/80 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:-translate-y-0.5 hover:bg-white"
                onClick={() => trackEvent({ action: "cta_click", category: "blog_cta", label: "pricing", value: 1 })}
              >
                Richtprijzen
              </Link>
              <Link
                href={toolHref}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200/70 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                onClick={() => trackEvent({ action: "cta_click", category: "blog_cta", label: "material_tool", value: 1 })}
              >
                Materialen wizard
              </Link>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  )
}
