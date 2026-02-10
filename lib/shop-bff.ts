export type ShopLocale = "nl" | "en"

export type BffPrice = {
  amount: number
  currency: "EUR"
  vatApplicable: boolean
}

export type BffImage = {
  url: string
  alt: string
}

export type BffProduct = {
  slug: string
  name: string
  summary: string
  price: BffPrice
  availability?: string
  image: BffImage
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

const RAW_BASE_URL = process.env.NEXT_PUBLIC_SHOP_BFF_URL ?? ""
const BFF_BASE_URL = RAW_BASE_URL.replace(/\/+$/, "")

function getBffUrl(path: string) {
  if (!BFF_BASE_URL) {
    throw new Error("NEXT_PUBLIC_SHOP_BFF_URL is not set.")
  }
  if (!path.startsWith("/")) return `${BFF_BASE_URL}/${path}`
  return `${BFF_BASE_URL}${path}`
}

async function bffFetch<T>(path: string, options: RequestInit & { json?: unknown } = {}) {
  const url = getBffUrl(path)
  const headers = new Headers(options.headers)
  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json")
  }
  let body = options.body
  if (options.json !== undefined) {
    headers.set("Content-Type", "application/json")
    body = JSON.stringify(options.json)
  }

  const response = await fetch(url, {
    ...options,
    body,
    headers,
    cache: "no-store",
  })

  if (!response.ok) {
    const text = await response.text().catch(() => "")
    throw new Error(`[shop-bff] ${response.status} ${response.statusText} ${text}`.trim())
  }

  return (await response.json()) as T
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
