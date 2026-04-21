"use client"

import ShopAddToCartButton from "@/components/ShopAddToCartButton"
import ShopInquiryModal from "@/components/ShopInquiryModal"
import type { ShopProduct } from "@/content/shop-products"
import { isInquiryProduct, type ShopLocale } from "@/lib/shop-purchase"
import { cn } from "@/lib/utils"

type ShopProductActionButtonProps = {
  product: ShopProduct
  locale: ShopLocale
  className?: string
  quantity?: number
  variant?: "solid" | "text"
  labelOverride?: string
}

const COPY = {
  nl: {
    inquiry: "Vraag offerte aan",
    availability: "Vraag beschikbaarheid",
  },
  en: {
    inquiry: "Request a quote",
    availability: "Request availability",
  },
}

export default function ShopProductActionButton({
  product,
  locale,
  className,
  quantity,
  variant = "solid",
  labelOverride,
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
  const label = labelOverride || (product.availability === "OutOfStock" ? copy.availability : copy.inquiry)

  return (
    <ShopInquiryModal
      product={product}
      locale={locale}
      quantity={quantity}
      variant={variant}
      label={label}
      className={cn(className)}
    />
  )
}
