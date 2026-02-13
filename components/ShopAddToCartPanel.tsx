"use client"

import { useMemo, useState } from "react"
import ShopAddToCartButton from "@/components/ShopAddToCartButton"
import { cn } from "@/lib/utils"
import type { ShopProduct } from "@/content/shop-products"

type ShopLocale = "nl" | "en"

type ShopAddToCartPanelProps = {
  product: ShopProduct
  locale: ShopLocale
  className?: string
}

const COPY = {
  nl: {
    quantity: "Aantal",
    decrease: "Aantal verlagen",
    increase: "Aantal verhogen",
  },
  en: {
    quantity: "Quantity",
    decrease: "Decrease quantity",
    increase: "Increase quantity",
  },
}

function clampQuantity(value: number) {
  if (!Number.isFinite(value) || value <= 0) return 1
  return Math.min(Math.max(Math.round(value), 1), 99)
}

export default function ShopAddToCartPanel({ product, locale, className }: ShopAddToCartPanelProps) {
  const copy = locale === "en" ? COPY.en : COPY.nl
  const productName = locale === "en" ? product.name.en : product.name.nl
  const [quantity, setQuantity] = useState(1)
  const isUnavailable = product.availability === "OutOfStock"

  const displayQuantity = useMemo(() => clampQuantity(quantity), [quantity])

  const handleInput = (value: string) => {
    const parsed = Number(value)
    setQuantity(clampQuantity(parsed))
  }

  return (
    <div className={cn("flex flex-col items-stretch gap-3 sm:flex-row sm:items-center md:justify-center lg:justify-start", className)}>
      <div className="flex w-full items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white/90 px-3 py-2 text-sm text-slate-700 shadow-sm sm:w-auto sm:justify-start">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{copy.quantity}</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setQuantity((prev) => clampQuantity(prev - 1))}
            disabled={isUnavailable}
            className="h-8 w-8 rounded-full border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label={`${copy.decrease}: ${productName}`}
          >
            -
          </button>
          <input
            type="number"
            min={1}
            max={99}
            value={displayQuantity}
            onChange={(event) => handleInput(event.target.value)}
            disabled={isUnavailable}
            inputMode="numeric"
            className="w-14 rounded-lg border border-slate-200 bg-white px-2 py-1 text-center text-sm font-semibold text-slate-900 focus:border-indigo-500 focus:outline-none"
            aria-label={`${copy.quantity}: ${productName}`}
          />
          <button
            type="button"
            onClick={() => setQuantity((prev) => clampQuantity(prev + 1))}
            disabled={isUnavailable}
            className="h-8 w-8 rounded-full border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label={`${copy.increase}: ${productName}`}
          >
            +
          </button>
        </div>
      </div>
      <ShopAddToCartButton
        product={product}
        locale={locale}
        quantity={displayQuantity}
        className="w-full justify-center sm:w-auto"
      />
    </div>
  )
}

