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
  const isEn = pathname?.startsWith("/en")
  const prefix = isEn ? "/en" : ""
  const slug = pathname?.split("/").filter(Boolean).pop() ?? "blog"
  const utm = `?utm_source=blog&utm_medium=cta&utm_campaign=${slug}`

  const contactHref = `${prefix}/contact${utm}`
  const toolHref = `${prefix}/materials${utm}#material-suggestion-tool`
  const pricingHref = `${prefix}/pricing${utm}`
  const copy = isEn
    ? {
        kicker: "Continue",
        title: "Request pricing or material advice",
        body: "Start with pricing guidance or use the wizard for a material pick. Prefill stays linked to this article.",
        contact: "Quote / contact",
        pricing: "Pricing",
        tool: "Materials wizard",
      }
    : {
        kicker: "Verder",
        title: "Vraag prijs of materiaaladvies",
        body: "Start met richtprijzen of laat de wizard je materiaal kiezen. Prefill blijft gekoppeld aan dit artikel.",
        contact: "Offerte / contact",
        pricing: "Richtprijzen",
        tool: "Materialen wizard",
      }

  const isTop = variant === "top"

  return (
    <section className={`${isTop ? "pt-6" : "pt-4"} pb-4 sm:pb-6`}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <GlassCard className="flex flex-col gap-4 border border-slate-200/70 bg-slate-50/80 p-5 shadow-sm backdrop-blur-sm sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">{copy.kicker}</p>
              <h2 className="mt-1 text-lg font-semibold text-slate-900">{copy.title}</h2>
              <p className="mt-1 text-sm text-slate-600">{copy.body}</p>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:justify-end">
              <ShimmerButton
                href={contactHref}
                onClick={() =>
                  trackEvent({ action: "cta_click", category: "blog_cta", label: "contact", value: 1 })
                }
              >
                {copy.contact}
              </ShimmerButton>
              <Link
                href={pricingHref}
                className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-500"
                onClick={() => trackEvent({ action: "cta_click", category: "blog_cta", label: "pricing", value: 1 })}
              >
                {copy.pricing}
              </Link>
              <Link
                href={toolHref}
                className="text-sm font-semibold text-slate-700 transition hover:text-slate-900"
                onClick={() => trackEvent({ action: "cta_click", category: "blog_cta", label: "material_tool", value: 1 })}
              >
                {copy.tool}
              </Link>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  )
}
