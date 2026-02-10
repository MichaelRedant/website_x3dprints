import {
  SHOP_PRODUCTS,
  SHOP_PRODUCT_SLUGS,
  type LocalizedText,
  type ShopProduct,
} from "@/content/shop-products"
import {
  fetchShopProduct,
  fetchShopProducts,
  type BffProduct,
} from "@/lib/shop-bff"

export type ShopLocale = "nl" | "en"

const BFF_ENABLED =
  process.env.NEXT_PUBLIC_SHOP_BFF_ENABLED === "true" &&
  Boolean(process.env.NEXT_PUBLIC_SHOP_BFF_URL)

const AVAILABILITY_VALUES: Array<NonNullable<ShopProduct["availability"]>> = [
  "InStock",
  "PreOrder",
  "OutOfStock",
  "LimitedAvailability",
]

function toLocalizedText(value: string): LocalizedText {
  return { nl: value, en: value }
}

function toAvailability(value?: string): ShopProduct["availability"] {
  if (!value) return undefined
  return AVAILABILITY_VALUES.includes(value as NonNullable<ShopProduct["availability"]>)
    ? (value as NonNullable<ShopProduct["availability"]>)
    : undefined
}

function mapBffProduct(product: BffProduct): ShopProduct {
  const name = product.name ?? product.slug
  const summary = product.summary ?? ""
  const imageAlt = product.image?.alt ?? name

  return {
    slug: product.slug,
    name: toLocalizedText(name),
    summary: toLocalizedText(summary),
    description: summary ? toLocalizedText(summary) : undefined,
    priceEur: product.price?.amount ?? 0,
    image: {
      url: product.image?.url ?? "/images/og-home.jpg",
      alt: toLocalizedText(imageAlt),
    },
    availability: toAvailability(product.availability),
    isLive: true,
  }
}

export async function getShopProducts(locale: ShopLocale): Promise<ShopProduct[]> {
  if (!BFF_ENABLED) return SHOP_PRODUCTS
  try {
    const { products } = await fetchShopProducts(locale)
    if (!products?.length) return SHOP_PRODUCTS
    return products.map((product) => mapBffProduct(product))
  } catch {
    return SHOP_PRODUCTS
  }
}

export async function getShopProductBySlug(
  slug: string,
  locale: ShopLocale,
): Promise<ShopProduct | undefined> {
  if (!BFF_ENABLED) return SHOP_PRODUCTS.find((product) => product.slug === slug)
  try {
    const { product } = await fetchShopProduct(slug, locale)
    return product ? mapBffProduct(product) : undefined
  } catch {
    return SHOP_PRODUCTS.find((product) => product.slug === slug)
  }
}

export async function getShopProductSlugs(locale: ShopLocale): Promise<string[]> {
  if (!BFF_ENABLED) return SHOP_PRODUCT_SLUGS
  try {
    const { products } = await fetchShopProducts(locale)
    const slugs = products.map((product) => product.slug).filter(Boolean)
    return slugs.length ? slugs : SHOP_PRODUCT_SLUGS
  } catch {
    return SHOP_PRODUCT_SLUGS
  }
}
