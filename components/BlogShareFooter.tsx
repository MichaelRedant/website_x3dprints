"use client"

import { useEffect, useMemo, useState } from "react"
import { usePathname } from "next/navigation"
import ShareActions from "@/components/ShareActions"
import { SITE } from "@/lib/seo"

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

  return (
    <section className="mx-auto mt-12 max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-white/60 bg-white/85 p-6 shadow-lg backdrop-blur">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">Deel deze pagina</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Stuur door via je favoriete kanaal</h2>
            <p className="mt-1 text-sm text-slate-600">
              Kopieer de link of deel meteen op LinkedIn, X, Threads, Facebook of via e-mail.
            </p>
          </div>
          <ShareActions url={shareUrl} title={title} summary={title} layout="row" />
        </div>
      </div>
    </section>
  )
}
