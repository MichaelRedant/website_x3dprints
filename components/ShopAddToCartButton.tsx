"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import type { ShopProduct } from "@/content/shop-products"
import { useShopCart } from "@/components/ShopCartState"

type ShopLocale = "nl" | "en"

type ShopAddToCartButtonProps = {
  product: ShopProduct
  locale: ShopLocale
  className?: string
  quantity?: number
}

const COPY = {
  nl: {
    add: "Voeg toe aan winkelmandje",
    added: "Toegevoegd",
    adding: "Toevoegen...",
    unavailable: "Niet beschikbaar",
  },
  en: {
    add: "Add to cart",
    added: "Added",
    adding: "Adding...",
    unavailable: "Out of stock",
  },
}

export default function ShopAddToCartButton({
  product,
  locale,
  className,
  quantity,
}: ShopAddToCartButtonProps) {
  const { addItem } = useShopCart()
  const [added, setAdded] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const timeoutRef = useRef<number | null>(null)
  const isUnavailable = product.availability === "OutOfStock"
  const resolvedQuantity = Math.max(1, Number(quantity ?? 1))

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    }
  }, [])

  const handleClick = async () => {
    if (isAdding) return
    setIsAdding(true)
    try {
      await Promise.resolve(
        addItem({
          slug: product.slug,
          name: product.name,
          priceEur: product.priceEur,
          imageUrl: product.image.url,
          imageAlt: product.image.alt,
          quantity: resolvedQuantity,
        }),
      )
      setAdded(true)
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
      timeoutRef.current = window.setTimeout(() => setAdded(false), 1600)
    } finally {
      setIsAdding(false)
    }
  }

  const copy = locale === "en" ? COPY.en : COPY.nl
  const label = isUnavailable ? copy.unavailable : isAdding ? copy.adding : added ? copy.added : copy.add

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isAdding || isUnavailable}
      className={cn(
        "inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white",
        "bg-[linear-gradient(90deg,#6366f1,45%,#22d3ee)] shadow-[0_10px_30px_rgba(99,102,241,.35)]",
        "transition-[box-shadow,filter] hover:shadow-[0_12px_40px_rgba(99,102,241,.55)] hover:brightness-110",
        isAdding || isUnavailable ? "opacity-70" : "",
        className,
      )}
      aria-live="polite"
      aria-busy={isAdding}
    >
      {label}
      <span className="i-lucide-shopping-cart" aria-hidden />
    </button>
  )
}
