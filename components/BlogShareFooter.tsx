"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { usePathname } from "next/navigation"
import ShareActions from "@/components/ShareActions"
import { SITE } from "@/lib/seo"
import ShimmerButton from "@/components/ShimmerButton"

export default function BlogShareFooter() {
  const pathname = usePathname()
  const [title, setTitle] = useState("Deel dit artikel")

  useEffect(() => {
    if (typeof document !== "undefined" && document.title) {
      setTitle(document.title)
    }
  }, [])

  const shareUrl = useMemo(() => {
    const base = SITE.url.replace(/\/+$/, "")
    return `${base}${pathname || ""}`
  }, [pathname])

  const isEn = pathname?.startsWith("/en")
  const ctaCopy = isEn
    ? {
        kicker: "Next step",
        title: "Turn this article into an action plan",
        body: "Share your STL/STEP and tell us the context. We pick the material together and plan production.",
        primary: { label: "Request a quote", href: "/contact" },
        secondary: { label: "Material Suggestion Tool", href: "/materials#material-suggestion-tool" },
      }
    : {
        kicker: "Volgende stap",
        title: "Zet dit artikel om in een actieplan",
        body: "Stuur je STL/STEP en context door. We kiezen samen het materiaal en plannen de productie.",
        primary: { label: "Offerte aanvragen", href: "/contact" },
        secondary: { label: "Material Suggestion Tool", href: "/materials#material-suggestion-tool" },
      }

  return (
    <section className="mx-auto mt-12 max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-white/60 bg-white/85 p-6 shadow-lg backdrop-blur">
        <div className="grid gap-6 lg:grid-cols-[2fr,1.2fr] lg:items-center">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">{ctaCopy.kicker}</p>
            <h2 className="text-2xl font-semibold text-slate-900">{ctaCopy.title}</h2>
            <p className="text-sm text-slate-600">{ctaCopy.body}</p>
            <div className="flex flex-wrap gap-3">
              <ShimmerButton href={ctaCopy.primary.href}>{ctaCopy.primary.label}</ShimmerButton>
              <Link
                href={ctaCopy.secondary.href}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm hover:border-slate-400 hover:bg-slate-50"
              >
                {ctaCopy.secondary.label}
              </Link>
            </div>
          </div>
          <div className="space-y-2 rounded-2xl border border-slate-200/70 bg-white/75 p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
              {isEn ? "Share this page" : "Deel deze pagina"}
            </p>
            <div className="flex flex-wrap gap-3">
              <ShareActions url={shareUrl} title={title} summary={title} layout="row" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
