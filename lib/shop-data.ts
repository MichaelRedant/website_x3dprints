import {
  SHOP_PRODUCTS,
  SHOP_PRODUCT_SLUGS,
  type LocalizedText,
  type ShopCategoryKey,
  type ShopProduct,
} from "@/content/shop-products"
import {
  fetchShopProduct,
  fetchShopProducts,
  type BffProduct,
} from "@/lib/shop-bff"
import { SHOP_BFF_ENABLED } from "@/lib/shop-config"

export type ShopLocale = "nl" | "en"

const AVAILABILITY_VALUES: Array<NonNullable<ShopProduct["availability"]>> = [
  "InStock",
  "PreOrder",
  "OutOfStock",
  "LimitedAvailability",
]

function toLocalizedText(nlValue: string, enValue: string): LocalizedText {
  return { nl: nlValue, en: enValue }
}

function toAvailability(value?: string): ShopProduct["availability"] {
  if (!value) return undefined
  return AVAILABILITY_VALUES.includes(value as NonNullable<ShopProduct["availability"]>)
    ? (value as NonNullable<ShopProduct["availability"]>)
    : undefined
}

function normalizeTags(tags: unknown): string[] {
  if (!Array.isArray(tags)) return []
  const cleaned = tags
    .map((tag) => String(tag).trim().toLowerCase())
    .filter(Boolean)
  return Array.from(new Set(cleaned))
}

function inferCategories(tags: string[]): ShopCategoryKey[] | undefined {
  const categories = new Set<ShopCategoryKey>()
  for (const tag of tags) {
    if (tag.includes("clip")) categories.add("clips")
    if (tag.includes("organizer")) categories.add("organizers")
  }
  return categories.size > 0 ? Array.from(categories) : undefined
}

function normalizeLeadTime(product: BffProduct): ShopProduct["leadTimeDays"] {
  const leadTime = product.leadTimeDays
  if (
    !leadTime ||
    !Number.isFinite(leadTime.min) ||
    !Number.isFinite(leadTime.max) ||
    leadTime.min < 0 ||
    leadTime.max < 0
  ) {
    return undefined
  }
  const min = Math.round(leadTime.min)
  const max = Math.round(leadTime.max)
  if (min > max) return undefined
  return { min, max }
}

function mapBffProduct(product: BffProduct): ShopProduct {
  const nameNl = String(product.nameNl ?? product.name ?? product.slug).trim() || product.slug
  const nameEn = String(product.nameEn ?? product.name ?? product.slug).trim() || product.slug
  const summaryNl = String(product.summaryNl ?? product.summary ?? "").trim()
  const summaryEn = String(product.summaryEn ?? product.summary ?? "").trim()
  const imageAltNl = String(product.image?.altNl ?? product.image?.alt ?? nameNl).trim() || nameNl
  const imageAltEn = String(product.image?.altEn ?? product.image?.alt ?? nameEn).trim() || nameEn
  const tags = normalizeTags(product.tags)
  const categories = inferCategories(tags)
  const leadTimeDays = normalizeLeadTime(product)
  const summary = toLocalizedText(summaryNl, summaryEn)
  const description = summaryNl || summaryEn ? summary : undefined

  return {
    slug: product.slug,
    name: toLocalizedText(nameNl, nameEn),
    summary,
    description,
    tags,
    categories,
    priceEur: product.price?.amount ?? 0,
    image: {
      url: product.image?.url ?? "/images/og-home.jpg",
      alt: toLocalizedText(imageAltNl, imageAltEn),
    },
    availability: toAvailability(product.availability),
    leadTimeDays,
    isLive: product.isLive ?? true,
  }
}

export async function getShopProducts(locale: ShopLocale): Promise<ShopProduct[]> {
  if (!SHOP_BFF_ENABLED) return SHOP_PRODUCTS
  try {
    const { products } = await fetchShopProducts(locale)
    if (!Array.isArray(products)) return []
    return products.map((product) => mapBffProduct(product)).filter((product) => product.isLive)
  } catch (error) {
    console.error("[shop-data] Could not load shop products from BFF.", error)
    return SHOP_PRODUCTS
  }
}

export async function getShopProductBySlug(
  slug: string,
  locale: ShopLocale,
): Promise<ShopProduct | undefined> {
  if (!SHOP_BFF_ENABLED) return SHOP_PRODUCTS.find((product) => product.slug === slug)
  try {
    const { product } = await fetchShopProduct(slug, locale)
    const mapped = product ? mapBffProduct(product) : undefined
    return mapped?.isLive ? mapped : undefined
  } catch (error) {
    console.error(`[shop-data] Could not load product '${slug}' from BFF.`, error)
    return SHOP_PRODUCTS.find((product) => product.slug === slug)
  }
}

export async function getShopProductSlugs(locale: ShopLocale): Promise<string[]> {
  if (!SHOP_BFF_ENABLED) return SHOP_PRODUCT_SLUGS
  try {
    const { products } = await fetchShopProducts(locale)
    if (!Array.isArray(products)) return []
    const slugs = products
      .filter((product) => product.isLive !== false)
      .map((product) => String(product.slug || "").trim())
      .filter(Boolean)
    return Array.from(new Set(slugs))
  } catch (error) {
    console.error("[shop-data] Could not load shop slugs from BFF.", error)
    return SHOP_PRODUCT_SLUGS
  }
}
