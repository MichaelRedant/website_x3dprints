import type { ShopProduct } from "@/content/shop-products"

export type ShopLocale = "nl" | "en"

function formatEur(value: number) {
  return `EUR ${value.toFixed(2)}`
}

function clampQuantity(value?: number) {
  if (!Number.isFinite(value)) return 1
  return Math.min(Math.max(Math.round(value ?? 1), 1), 99)
}

function localizeName(product: ShopProduct, locale: ShopLocale) {
  return locale === "en" ? product.name.en : product.name.nl
}

export function getShopPurchaseMode(product: ShopProduct) {
  return product.purchaseMode ?? "cart"
}

export function isInquiryProduct(product: ShopProduct) {
  return getShopPurchaseMode(product) === "inquiry"
}

export function buildShopInquiryHref({
  product,
  locale,
  quantity,
}: {
  product: ShopProduct
  locale: ShopLocale
  quantity?: number
}) {
  const name = localizeName(product, locale)
  const resolvedQuantity = clampQuantity(quantity)
  const basePath = locale === "en" ? "/en/contact" : "/contact"
  const params = new URLSearchParams()
  const quote =
    locale === "en"
      ? `Quote request: ${name} (${resolvedQuantity}x, ${formatEur(product.priceEur)} per item excl. shipping)`
      : `Offerteaanvraag: ${name} (${resolvedQuantity}x, ${formatEur(product.priceEur)} per stuk excl. verzending)`

  params.set("quote", quote)
  params.set("quantity", String(resolvedQuantity))

  return `${basePath}?${params.toString()}`
}
