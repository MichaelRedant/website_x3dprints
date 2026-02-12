"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"

type ShopLocale = "nl" | "en"

type ShopOrderSuccessNoticeProps = {
  locale: ShopLocale
}

const COPY = {
  nl: {
    title: "Bedankt, je bestelling is bevestigd",
    body: "Je bestelling is goed ontvangen. Bewaar je ordercode voor opvolging of vragen.",
    orderLabel: "Ordercode",
    copy: "Kopieer code",
    copied: "Gekopieerd",
    backToShop: "Verder shoppen",
    request: "Hulp bij productie",
  },
  en: {
    title: "Thanks, your order is confirmed",
    body: "Your order has been received. Keep your order code for follow-up or support.",
    orderLabel: "Order code",
    copy: "Copy code",
    copied: "Copied",
    backToShop: "Continue shopping",
    request: "Production support",
  },
}

export default function ShopOrderSuccessNotice({ locale }: ShopOrderSuccessNoticeProps) {
  const searchParams = useSearchParams()
  const orderParam = useMemo(() => searchParams.get("order"), [searchParams])
  const [copied, setCopied] = useState(false)

  if (!orderParam) return null

  const copy = locale === "en" ? COPY.en : COPY.nl
  const shopHref = locale === "en" ? "/en/shop" : "/shop"
  const contactHref = locale === "en" ? "/en/contact" : "/contact"

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(orderParam)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      // Ignore clipboard errors
    }
  }

  return (
    <section className="px-6 pb-10 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <GlassCard className="relative overflow-hidden border-slate-200/80 bg-white/80">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-200/50 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-20 left-14 h-48 w-48 rounded-full bg-indigo-200/40 blur-3xl"
            />

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                <span className="i-lucide-circle-check-big text-sm" aria-hidden />
                {locale === "en" ? "Order confirmed" : "Bestelling bevestigd"}
              </div>
              <div className="mt-4 flex flex-wrap items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <span className="i-lucide-check text-2xl" aria-hidden />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Shop</p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-900">{copy.title}</h2>
                  <p className="mt-2 text-sm text-slate-600">{copy.body}</p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/90 p-3">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                  {copy.orderLabel}
                </span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-semibold text-slate-900">
                  {orderParam}
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 transition hover:text-slate-700"
                >
                  {copied ? copy.copied : copy.copy}
                </button>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href={shopHref}
                  className="inline-flex items-center gap-2 rounded-xl bg-[linear-gradient(90deg,#6366f1,45%,#22d3ee)] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
                >
                  {copy.backToShop}
                  <span className="i-lucide-arrow-right" aria-hidden />
                </Link>
                <Link
                  href={contactHref}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50"
                >
                  {copy.request}
                  <span className="i-lucide-arrow-right" aria-hidden />
                </Link>
              </div>
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  )
}
