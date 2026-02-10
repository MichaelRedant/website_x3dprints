"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import Reveal from "@/components/Reveal"
import { cn } from "@/lib/utils"

type ShopLocale = "nl" | "en"

type ShopOrderSuccessNoticeProps = {
  locale: ShopLocale
}

const COPY = {
  nl: {
    title: "Bedankt! Je bestelling is ontvangen",
    body: "Je order is geregistreerd. Bewaar je ordercode voor opvolging.",
    orderLabel: "Ordercode",
    copy: "Kopieer code",
    copied: "Gekopieerd",
    backToShop: "Terug naar shop",
    request: "Offerte aanvragen",
  },
  en: {
    title: "Thanks! Your order is received",
    body: "Your order is registered. Keep the order code for follow-up.",
    orderLabel: "Order code",
    copy: "Copy code",
    copied: "Copied",
    backToShop: "Back to shop",
    request: "Request a quote",
  },
}

const cardClasses = cn(
  "rounded-3xl border border-white/20 bg-white/10 p-6 shadow-lg backdrop-blur-xl text-slate-900",
  "dark:text-slate-100 dark:border-[#0F203C] dark:bg-[radial-gradient(120%_140%_at_20%_20%,rgba(0,230,255,0.06),transparent),radial-gradient(140%_120%_at_80%_0%,rgba(215,38,61,0.06),transparent),#0B0F1A]",
  "dark:shadow-[0_24px_60px_rgba(0,0,0,0.55),0_0_0_1px_rgba(0,230,255,0.18)]",
  "dark:backdrop-blur-2xl dark:[text-shadow:0_0_12px_rgba(0,230,255,0.18)]",
)

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
    <section className="px-6 pb-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className={cardClasses}>
            <div className="flex flex-wrap items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <span className="i-lucide-check text-2xl" aria-hidden />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Shop</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">{copy.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{copy.body}</p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
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

            <div className="mt-4 flex flex-wrap gap-4">
              <Link
                href={shopHref}
                className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-500"
              >
                {copy.backToShop}
                <span className="i-lucide-arrow-right" aria-hidden />
              </Link>
              <Link
                href={contactHref}
                className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-500"
              >
                {copy.request}
                <span className="i-lucide-arrow-right" aria-hidden />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
