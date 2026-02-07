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
  const authorHref = isEn ? "/en/about#author" : "/about#author"
  const ctaCopy = isEn
    ? {
        kicker: "Wrap-up",
        title: "Turn this article into an action plan",
        body: "Share your STL/STEP and tell us the context. We pick the material together and plan production.",
        primary: { label: "Request a quote", href: "/en/contact" },
        secondary: { label: "Material Suggestion Tool", href: "/en/materials#material-suggestion-tool" },
      }
    : {
        kicker: "Afronden",
        title: "Zet dit artikel om in een actieplan",
        body: "Stuur je STL/STEP en context door. We kiezen samen het materiaal en plannen de productie.",
        primary: { label: "Offerte aanvragen", href: "/contact" },
        secondary: { label: "Material Suggestion Tool", href: "/materials#material-suggestion-tool" },
      }

  return (
    <section className="mx-auto mt-8 max-w-5xl px-4 pb-14 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-slate-200/70 bg-slate-50/85 p-6 shadow-sm backdrop-blur-sm">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">{ctaCopy.kicker}</p>
          <h2 className="text-2xl font-semibold text-slate-900">{ctaCopy.title}</h2>
          <p className="text-sm text-slate-600">{ctaCopy.body}</p>
          <p className="text-sm text-slate-600">
            {isEn ? "Author" : "Auteur"}:{" "}
            <Link href={authorHref} rel="author" className="font-medium text-slate-800 underline underline-offset-4">
              {SITE.author.name}
            </Link>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <ShimmerButton href={ctaCopy.primary.href}>{ctaCopy.primary.label}</ShimmerButton>
            <Link
              href={ctaCopy.secondary.href}
              className="inline-flex items-center text-sm font-semibold text-indigo-600 transition hover:text-indigo-500"
            >
              {ctaCopy.secondary.label}
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-6 max-w-3xl space-y-2 rounded-2xl border border-slate-200/70 bg-white/70 p-4">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            {isEn ? "Share this page" : "Deel deze pagina"}
          </p>
          <div className="flex justify-center">
            <ShareActions
              url={shareUrl}
              title={title}
              summary={title}
              layout="row"
              locale={isEn ? "en" : "nl"}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
