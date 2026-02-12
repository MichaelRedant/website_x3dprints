import { SHOP_BFF_URL } from "@/lib/shop-config"

export type ShopLocale = "nl" | "en"

export type BffPrice = {
  amount: number
  currency: "EUR"
  vatApplicable: boolean
}

export type BffImage = {
  url: string
  alt: string
  altNl?: string
  altEn?: string
}

export type BffProduct = {
  slug: string
  name: string
  nameNl?: string
  nameEn?: string
  summary: string
  summaryNl?: string
  summaryEn?: string
  price: BffPrice
  availability?: string
  image: BffImage
  tags?: string[]
  leadTimeDays?: { min: number; max: number } | null
  isLive?: boolean
}

export type BffCartLine = {
  lineId: string
  productSlug: string
  quantity: number
  price: BffPrice
  total: BffPrice
}

export type BffTotals = {
  subtotal: BffPrice
  shipping: BffPrice
  total: BffPrice
}

export type BffShippingMethod = {
  id: string
  label: string
  price: BffPrice
}

export type BffCart = {
  cartId: string
  currency: "EUR"
  lines: BffCartLine[]
  totals: BffTotals
  shippingMethods: BffShippingMethod[]
}

export type BffCheckout = {
  checkoutUrl: string
  orderCode: string
}

const BFF_BASE_URL = SHOP_BFF_URL.replace(/\/+$/, "")

function normalizePath(path: string): { pathname: string; search: string } {
  if (!path) return { pathname: "/", search: "" }
  const normalized = path.startsWith("/") ? path : `/${path}`
  const queryIndex = normalized.indexOf("?")
  if (queryIndex === -1) {
    return { pathname: normalized, search: "" }
  }
  return {
    pathname: normalized.slice(0, queryIndex) || "/",
    search: normalized.slice(queryIndex + 1),
  }
}

function buildBffUrls(path: string): string[] {
  if (!BFF_BASE_URL) {
    throw new Error("NEXT_PUBLIC_SHOP_BFF_URL is not set.")
  }
  const { pathname, search } = normalizePath(path)
  const queryParams = new URLSearchParams(search)
  queryParams.set("path", pathname)
  const queryString = queryParams.toString()

  const directUrl = `${BFF_BASE_URL}${pathname}${search ? `?${search}` : ""}`
  const indexBase = BFF_BASE_URL.endsWith("/index.php") ? BFF_BASE_URL : `${BFF_BASE_URL}/index.php`
  const pathUrl = `${indexBase}?${queryString}`

  return Array.from(new Set([pathUrl, directUrl]))
}

async function bffFetch<T>(path: string, options: RequestInit & { json?: unknown } = {}) {
  const urls = buildBffUrls(path)
  const headers = new Headers(options.headers)
  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json")
  }
  let body = options.body
  if (options.json !== undefined) {
    headers.set("Content-Type", "application/json")
    body = JSON.stringify(options.json)
  }

  const errors: string[] = []

  for (const url of urls) {
    try {
      const response = await fetch(url, {
        ...options,
        body,
        headers,
        cache: "no-store",
      })

      if (!response.ok) {
        const text = await response.text().catch(() => "")
        errors.push(`[shop-bff] ${response.status} ${response.statusText} @ ${url} ${text}`.trim())
        continue
      }

      const json = (await response.json()) as T
      return json
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      errors.push(`[shop-bff] network @ ${url} ${message}`)
    }
  }

  throw new Error(errors[0] || "[shop-bff] Request failed.")
}

export async function fetchShopProducts(locale: ShopLocale) {
  return bffFetch<{ products: BffProduct[] }>(`/shop/products?locale=${locale}`)
}

export async function fetchShopProduct(slug: string, locale: ShopLocale) {
  return bffFetch<{ product: BffProduct }>(`/shop/products/${slug}?locale=${locale}`)
}

export async function createCart() {
  return bffFetch<BffCart>("/shop/cart", { method: "POST" })
}

export async function addCartLine(cartId: string, productSlug: string, quantity = 1) {
  return bffFetch<BffCart>(`/shop/cart/${cartId}/lines`, {
    method: "POST",
    json: { productSlug, quantity },
  })
}

export async function updateCartLine(cartId: string, lineId: string, quantity: number) {
  return bffFetch<BffCart>(`/shop/cart/${cartId}/lines/${lineId}`, {
    method: "PATCH",
    json: { quantity },
  })
}

export async function removeCartLine(cartId: string, lineId: string) {
  return bffFetch<BffCart>(`/shop/cart/${cartId}/lines/${lineId}`, {
    method: "DELETE",
  })
}

export async function startCheckout(cartId: string, payload: { email: string; shippingMethodId: string }) {
  return bffFetch<BffCheckout>("/shop/checkout", {
    method: "POST",
    json: { cartId, ...payload },
  })
}
