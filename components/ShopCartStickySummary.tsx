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
    title: "Je winkelmand",
    items: "Items",
    total: "Totaal",
    toCart: "Naar winkelmand",
    toCheckout: "Afrekenen",
  },
  en: {
    title: "Your cart",
    items: "Items",
    total: "Total",
    toCart: "Go to cart",
    toCheckout: "Checkout",
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
        <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{copy.title}</p>
          <div className="mt-3 space-y-1 text-sm text-slate-600">
            <p>
              <span className="font-semibold text-slate-900">{copy.items}:</span> {itemCount}
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
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
            >
              {copy.toCheckout}
              <span className="i-lucide-credit-card" aria-hidden />
            </Link>
          </div>
        </div>
      </div>

      <div className="fixed bottom-4 left-4 right-4 z-40 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-xl backdrop-blur lg:hidden">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{copy.title}</p>
            <p className="mt-1 text-sm text-slate-700">
              {itemCount} {copy.items.toLowerCase()} · <span className="font-semibold text-slate-900">{totalLabel}</span>
            </p>
          </div>
          <Link
            href={cartHref}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
          >
            {copy.toCart}
            <span className="i-lucide-arrow-right" aria-hidden />
          </Link>
        </div>
      </div>
    </>
  )
}
