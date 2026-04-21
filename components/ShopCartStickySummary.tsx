"use client"

import Link from "next/link"
import { useMemo } from "react"
import { useShopCart } from "@/components/ShopCartState"
import { cn } from "@/lib/utils"

type ShopLocale = "nl" | "en"

type ShopCartStickySummaryProps = {
  locale: ShopLocale
  className?: string
}

const COPY = {
  nl: {
    title: "Snelle samenvatting",
    items: "Items",
    subtotal: "Subtotaal",
    total: "Totaal",
    toCart: "Bekijk mandje",
    toCheckout: "Ga naar checkout",
  },
  en: {
    title: "Quick summary",
    items: "Items",
    subtotal: "Subtotal",
    total: "Total",
    toCart: "View cart",
    toCheckout: "Go to checkout",
  },
}

const formatEur = (value: number) => `EUR ${value.toFixed(2)}`

export default function ShopCartStickySummary({ locale, className }: ShopCartStickySummaryProps) {
  const copy = locale === "en" ? COPY.en : COPY.nl
  const { itemCount, totals } = useShopCart()
  const cartHref = locale === "en" ? "/en/shop/cart" : "/shop/cart"
  const checkoutHref = locale === "en" ? "/en/shop/checkout" : "/shop/checkout"

  const totalLabel = useMemo(() => formatEur(totals.total), [totals.total])

  if (itemCount <= 0) return null

  return (
    <>
      <div className={cn("hidden lg:block", className)}>
        <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{copy.title}</p>
          <div className="mt-3 space-y-1 text-sm text-slate-600">
            <p>
              <span className="font-semibold text-slate-900">{copy.items}:</span> {itemCount}
            </p>
            <p>
              <span className="font-semibold text-slate-900">{copy.subtotal}:</span> {formatEur(totals.subtotal)}
            </p>
            <p>
              <span className="font-semibold text-slate-900">{copy.total}:</span> {totalLabel}
            </p>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <Link
              href={cartHref}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50"
            >
              {copy.toCart}
              <span className="i-lucide-arrow-right" aria-hidden />
            </Link>
            <Link
              href={checkoutHref}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[linear-gradient(90deg,#6366f1,45%,#22d3ee)] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
            >
              {copy.toCheckout}
              <span className="i-lucide-credit-card" aria-hidden />
            </Link>
          </div>
        </div>
      </div>

      <div className="fixed bottom-3 left-3 right-3 z-40 rounded-2xl border border-slate-200 bg-white/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-xl backdrop-blur sm:bottom-4 sm:left-4 sm:right-4 sm:p-4 sm:pb-[max(1rem,env(safe-area-inset-bottom))] lg:hidden">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 sm:tracking-[0.3em]">{copy.title}</p>
            <p className="mt-1 break-words text-sm text-slate-700">
              {itemCount} {copy.items.toLowerCase()} | <span className="font-semibold text-slate-900">{totalLabel}</span>
            </p>
          </div>
          <div className="grid w-full grid-cols-2 gap-2 sm:w-auto sm:grid-cols-none sm:auto-cols-max sm:grid-flow-col">
            <Link
              href={cartHref}
              className="inline-flex min-h-10 min-w-0 items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-center text-xs font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
            >
              {copy.toCart}
            </Link>
            <Link
              href={checkoutHref}
              className="inline-flex min-h-10 min-w-0 items-center justify-center rounded-xl bg-[linear-gradient(90deg,#6366f1,45%,#22d3ee)] px-3 py-2 text-center text-xs font-semibold text-white shadow-sm transition hover:brightness-110"
            >
              {copy.toCheckout}
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
