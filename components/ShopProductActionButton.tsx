"use client"

import Link from "next/link"
import ShopAddToCartButton from "@/components/ShopAddToCartButton"
import type { ShopProduct } from "@/content/shop-products"
import { buildShopInquiryHref, isInquiryProduct, type ShopLocale } from "@/lib/shop-purchase"
import { cn } from "@/lib/utils"

type ShopProductActionButtonProps = {
  product: ShopProduct
  locale: ShopLocale
  className?: string
  quantity?: number
}

const COPY = {
  nl: {
    inquiry: "Bestel via aanvraag",
    availability: "Vraag beschikbaarheid",
  },
  en: {
    inquiry: "Order via request",
    availability: "Request availability",
  },
}

export default function ShopProductActionButton({
  product,
  locale,
  className,
  quantity,
}: ShopProductActionButtonProps) {
  if (!isInquiryProduct(product)) {
    return (
      <ShopAddToCartButton
        product={product}
        locale={locale}
        className={className}
        quantity={quantity}
      />
    )
  }

  const copy = locale === "en" ? COPY.en : COPY.nl
  const href = buildShopInquiryHref({ product, locale, quantity })
  const label = product.availability === "OutOfStock" ? copy.availability : copy.inquiry

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-[box-shadow,filter]",
        "bg-[linear-gradient(90deg,#0f766e,45%,#22c55e)] shadow-[0_10px_30px_rgba(15,118,110,.24)] hover:shadow-[0_12px_40px_rgba(15,118,110,.36)] hover:brightness-105",
        className,
      )}
    >
      {label}
      <span className="i-lucide-arrow-right" aria-hidden />
    </Link>
  )
}
