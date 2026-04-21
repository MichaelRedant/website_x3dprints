import {
  SHOP_PRODUCTS,
  SHOP_PRODUCT_SLUGS,
  type LocalizedText,
  type ShopCategoryKey,
  type ShopPurchaseMode,
  type ShopProduct,
} from "@/content/shop-products"
import {
  fetchShopProduct,
  fetchShopProducts,
  type BffProduct,
} from "@/lib/shop-bff"
import { SHOP_BFF_ENABLED } from "@/lib/shop-config"

export type ShopLocale = "nl" | "en"
type ShopDataOptions = {
  cacheMode?: RequestCache
}

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

function toPurchaseMode(value?: string | null): ShopPurchaseMode | undefined {
  if (value === "cart" || value === "inquiry") return value
  return undefined
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
    if (tag.includes("spool") || tag.includes("refill") || tag.includes("bambu")) categories.add("spools")
    if (tag.includes("outdoor") || tag.includes("hornet") || tag.includes("hoornaar") || tag.includes("trap")) {
      categories.add("outdoor")
    }
  }
  return categories.size > 0 ? Array.from(categories) : undefined
}

function getLocalLiveProducts() {
  return SHOP_PRODUCTS.filter((product) => product.isLive)
}

function pickLocalizedText(primary: LocalizedText | undefined, fallback: LocalizedText | undefined) {
  if (!primary) return fallback
  if (!fallback) return primary
  return {
    nl: primary.nl || fallback.nl,
    en: primary.en || fallback.en,
  }
}

function mergeShopProduct(localProduct: ShopProduct, remoteProduct: ShopProduct): ShopProduct {
  return {
    ...localProduct,
    ...remoteProduct,
    name: pickLocalizedText(localProduct.name, remoteProduct.name) ?? localProduct.name,
    summary: pickLocalizedText(localProduct.summary, remoteProduct.summary) ?? localProduct.summary,
    description: pickLocalizedText(localProduct.description, remoteProduct.description),
    image: {
      url: localProduct.image.url || remoteProduct.image?.url,
      alt: pickLocalizedText(localProduct.image.alt, remoteProduct.image?.alt) ?? localProduct.image.alt,
    },
    gallery: localProduct.gallery ?? remoteProduct.gallery,
    ogImage: localProduct.ogImage ?? remoteProduct.ogImage,
    tags: remoteProduct.tags?.length ? remoteProduct.tags : localProduct.tags,
    categories: remoteProduct.categories?.length ? remoteProduct.categories : localProduct.categories,
    priceEur: remoteProduct.priceEur,
    availability: remoteProduct.availability ?? localProduct.availability,
    stockCount: remoteProduct.stockCount ?? localProduct.stockCount,
    leadTimeDays: remoteProduct.leadTimeDays ?? localProduct.leadTimeDays,
    highlights: localProduct.highlights ?? remoteProduct.highlights,
    specs: localProduct.specs ?? remoteProduct.specs,
    purchaseMode: remoteProduct.purchaseMode ?? localProduct.purchaseMode,
    isLive: remoteProduct.isLive,
  }
}

function mergeWithLocalProducts(remoteProducts: ShopProduct[]) {
  const merged = new Map<string, ShopProduct>()

  for (const localProduct of getLocalLiveProducts()) {
    merged.set(localProduct.slug, localProduct)
  }

  for (const remoteProduct of remoteProducts) {
    if (!remoteProduct.isLive) continue
    const localProduct = merged.get(remoteProduct.slug)
    merged.set(
      remoteProduct.slug,
      localProduct ? mergeShopProduct(localProduct, remoteProduct) : remoteProduct,
    )
  }

  return Array.from(merged.values())
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
      url: product.image?.url ?? "/images/og-home.svg",
      alt: toLocalizedText(imageAltNl, imageAltEn),
    },
    availability: toAvailability(product.availability),
    stockCount: Number.isFinite(product.stockCount) ? Math.max(0, Math.round(product.stockCount ?? 0)) : undefined,
    leadTimeDays,
    purchaseMode: toPurchaseMode(product.purchaseMode),
    isLive: product.isLive ?? true,
  }
}

export async function getShopProducts(
  locale: ShopLocale,
  options: ShopDataOptions = {},
): Promise<ShopProduct[]> {
  if (!SHOP_BFF_ENABLED) return getLocalLiveProducts()
  try {
    const { products } = await fetchShopProducts(locale, { cacheMode: options.cacheMode })
    if (!Array.isArray(products)) return getLocalLiveProducts()
    return mergeWithLocalProducts(products.map((product) => mapBffProduct(product)))
  } catch (error) {
    console.error("[shop-data] Could not load shop products from BFF.", error)
    return getLocalLiveProducts()
  }
}

export async function getShopProductBySlug(
  slug: string,
  locale: ShopLocale,
  options: ShopDataOptions = {},
): Promise<ShopProduct | undefined> {
  const localProduct = getLocalLiveProducts().find((product) => product.slug === slug)
  if (!SHOP_BFF_ENABLED) return localProduct
  try {
    const { product } = await fetchShopProduct(slug, locale, { cacheMode: options.cacheMode })
    const mapped = product ? mapBffProduct(product) : undefined
    if (!mapped?.isLive) return localProduct
    return localProduct ? mergeShopProduct(localProduct, mapped) : mapped
  } catch (error) {
    if (localProduct && error instanceof Error && error.message.includes("404")) {
      return localProduct
    }
    console.error(`[shop-data] Could not load product '${slug}' from BFF.`, error)
    return localProduct
  }
}

export async function getShopProductSlugs(
  locale: ShopLocale,
  options: ShopDataOptions = {},
): Promise<string[]> {
  if (!SHOP_BFF_ENABLED) return SHOP_PRODUCT_SLUGS
  try {
    const { products } = await fetchShopProducts(locale, { cacheMode: options.cacheMode })
    if (!Array.isArray(products)) return SHOP_PRODUCT_SLUGS
    const remoteSlugs = products
      .filter((product) => product.isLive !== false)
      .map((product) => String(product.slug || "").trim())
      .filter(Boolean)
    return Array.from(new Set([...SHOP_PRODUCT_SLUGS, ...remoteSlugs]))
  } catch (error) {
    console.error("[shop-data] Could not load shop slugs from BFF.", error)
    return SHOP_PRODUCT_SLUGS
  }
}
