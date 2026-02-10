"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import type { LocalizedText } from "@/content/shop-products"
import {
  addCartLine,
  createCart,
  removeCartLine,
  startCheckout,
  updateCartLine,
  type BffCart,
  type BffShippingMethod,
} from "@/lib/shop-bff"

export type ShopCartItem = {
  slug: string
  name: LocalizedText
  priceEur: number
  imageUrl: string
  imageAlt: LocalizedText
  quantity: number
  lineId?: string
  lineTotalEur?: number
}

export type ShopCartAddInput = Omit<ShopCartItem, "quantity" | "lineId" | "lineTotalEur"> & {
  quantity?: number
}

export type ShopCartTotals = {
  subtotal: number
  shipping: number
  total: number
  currency: "EUR"
}

export type ShopShippingMethod = {
  id: string
  label?: string
  priceEur: number
}

type ProductInfo = {
  name: LocalizedText
  imageUrl: string
  imageAlt: LocalizedText
}

type StoredBffCart = {
  cartId: string
  lines: BffCart["lines"]
  totals: BffCart["totals"]
  shippingMethods: BffCart["shippingMethods"]
  selectedShippingMethodId?: string | null
}

const CART_KEY = "x3dprints:shop-cart:v1"
const CART_BFF_KEY = "x3dprints:shop-cart:bff:v1"
const CART_INFO_KEY = "x3dprints:shop-cart:info:v1"
const CART_SHIPPING_KEY = "x3dprints:shop-cart:shipping:v1"
const CART_EVENT = "x3dprints:shop-cart"

const LOCAL_SHIPPING_METHODS: ShopShippingMethod[] = [
  { id: "be_flat", priceEur: 7.5 },
  { id: "pickup", priceEur: 0 },
]

const BFF_ENABLED =
  process.env.NEXT_PUBLIC_SHOP_BFF_ENABLED === "true" &&
  Boolean(process.env.NEXT_PUBLIC_SHOP_BFF_URL)

function emitCartEvent() {
  if (typeof window === "undefined") return
  window.dispatchEvent(new Event(CART_EVENT))
}

function safeParseJson<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback
  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function safeParseCart(raw: string | null): ShopCartItem[] {
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
      .filter((item) => item && typeof item.slug === "string")
      .map((item) => ({
        slug: item.slug,
        name: item.name ?? { nl: "", en: "" },
        priceEur: Number(item.priceEur) || 0,
        imageUrl: item.imageUrl || "",
        imageAlt: item.imageAlt || { nl: "", en: "" },
        quantity: Math.max(1, Number(item.quantity) || 1),
        lineId: typeof item.lineId === "string" ? item.lineId : undefined,
        lineTotalEur: Number(item.lineTotalEur) || undefined,
      }))
  } catch {
    return []
  }
}

function readLocalCart(): ShopCartItem[] {
  if (typeof window === "undefined") return []
  return safeParseCart(window.localStorage.getItem(CART_KEY))
}

function writeLocalCart(items: ShopCartItem[]) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(CART_KEY, JSON.stringify(items))
  emitCartEvent()
}

function readSelectedShippingId() {
  if (typeof window === "undefined") return null
  return window.localStorage.getItem(CART_SHIPPING_KEY)
}

function writeSelectedShippingId(value: string | null) {
  if (typeof window === "undefined") return
  if (!value) {
    window.localStorage.removeItem(CART_SHIPPING_KEY)
  } else {
    window.localStorage.setItem(CART_SHIPPING_KEY, value)
  }
  emitCartEvent()
}

function readProductInfoMap(): Record<string, ProductInfo> {
  if (typeof window === "undefined") return {}
  return safeParseJson(window.localStorage.getItem(CART_INFO_KEY), {})
}

function writeProductInfoMap(map: Record<string, ProductInfo>) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(CART_INFO_KEY, JSON.stringify(map))
}

function upsertProductInfo(input: ShopCartAddInput) {
  const current = readProductInfoMap()
  current[input.slug] = {
    name: input.name,
    imageUrl: input.imageUrl,
    imageAlt: input.imageAlt,
  }
  writeProductInfoMap(current)
}

function readBffSnapshot(): StoredBffCart | null {
  if (typeof window === "undefined") return null
  const snapshot = safeParseJson<StoredBffCart | null>(
    window.localStorage.getItem(CART_BFF_KEY),
    null,
  )
  if (!snapshot?.cartId) return null
  return snapshot
}

function writeBffSnapshot(snapshot: StoredBffCart | null) {
  if (typeof window === "undefined") return
  if (!snapshot) {
    window.localStorage.removeItem(CART_BFF_KEY)
  } else {
    window.localStorage.setItem(CART_BFF_KEY, JSON.stringify(snapshot))
  }
  emitCartEvent()
}

function mapBffShippingMethods(methods: BffShippingMethod[]): ShopShippingMethod[] {
  return methods.map((method) => ({
    id: method.id,
    label: method.label,
    priceEur: Number(method.price?.amount ?? 0),
  }))
}

function computeTotals(subtotal: number, shipping: number): ShopCartTotals {
  return {
    subtotal,
    shipping,
    total: subtotal + shipping,
    currency: "EUR",
  }
}

function computeLocalTotals(items: ShopCartItem[], selectedShippingMethodId: string | null) {
  const subtotal = items.reduce((sum, item) => sum + item.priceEur * item.quantity, 0)
  const selected = LOCAL_SHIPPING_METHODS.find((method) => method.id === selectedShippingMethodId)
  const shipping = items.length > 0 ? selected?.priceEur ?? 0 : 0
  return computeTotals(subtotal, shipping)
}

function computeBffTotals(
  totals: BffCart["totals"] | undefined,
  selectedShippingMethodId: string | null,
  shippingMethods: ShopShippingMethod[],
) {
  const subtotal = Number(totals?.subtotal?.amount ?? 0)
  const fallbackShipping = Number(totals?.shipping?.amount ?? 0)
  const selected = shippingMethods.find((method) => method.id === selectedShippingMethodId)
  const shipping = selected ? selected.priceEur : fallbackShipping
  return computeTotals(subtotal, shipping)
}

function mapBffCart(
  cart: BffCart,
  productInfo: Record<string, ProductInfo>,
  selectedShippingMethodId: string | null,
) {
  const shippingMethods = mapBffShippingMethods(cart.shippingMethods ?? [])
  const resolvedShippingMethodId =
    selectedShippingMethodId &&
    shippingMethods.some((method) => method.id === selectedShippingMethodId)
      ? selectedShippingMethodId
      : shippingMethods[0]?.id ?? null

  const items = (cart.lines ?? []).map((line) => {
    const info = productInfo[line.productSlug]
    const quantity = Math.max(1, Number(line.quantity) || 1)
    const priceEur = Number(line.price?.amount ?? 0)
    const lineTotalEur = Number(line.total?.amount ?? priceEur * quantity)
    return {
      slug: line.productSlug,
      name: info?.name ?? { nl: line.productSlug, en: line.productSlug },
      priceEur,
      imageUrl: info?.imageUrl ?? "/images/og-home.jpg",
      imageAlt: info?.imageAlt ?? { nl: line.productSlug, en: line.productSlug },
      quantity,
      lineId: line.lineId,
      lineTotalEur,
    }
  })

  const totals = computeBffTotals(cart.totals, resolvedShippingMethodId, shippingMethods)

  return {
    items,
    totals,
    shippingMethods,
    selectedShippingMethodId: resolvedShippingMethodId,
  }
}

export function useShopCart() {
  const [mode] = useState<"bff" | "local">(BFF_ENABLED ? "bff" : "local")
  const [items, setItems] = useState<ShopCartItem[]>([])
  const [totals, setTotals] = useState<ShopCartTotals>({
    subtotal: 0,
    shipping: 0,
    total: 0,
    currency: "EUR",
  })
  const [shippingMethods, setShippingMethods] = useState<ShopShippingMethod[]>(
    LOCAL_SHIPPING_METHODS,
  )
  const [selectedShippingMethodId, setSelectedShippingMethodId] = useState<string | null>(null)
  const [cartId, setCartId] = useState<string | null>(null)
  const [isSyncing, setIsSyncing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const applyLocalState = useCallback(
    (nextItems: ShopCartItem[], selectedId: string | null) => {
      const resolvedSelectedId =
        nextItems.length > 0
          ? selectedId ?? readSelectedShippingId() ?? LOCAL_SHIPPING_METHODS[0]?.id ?? null
          : null
      setItems(nextItems)
      setShippingMethods(LOCAL_SHIPPING_METHODS)
      setSelectedShippingMethodId(resolvedSelectedId)
      setTotals(computeLocalTotals(nextItems, resolvedSelectedId))
    },
    [],
  )

  const applyBffCartState = useCallback(
    (cart: BffCart, preferredShippingId: string | null) => {
      const productInfo = readProductInfoMap()
      const mapped = mapBffCart(cart, productInfo, preferredShippingId)
      setCartId(cart.cartId)
      setItems(mapped.items)
      setTotals(mapped.totals)
      setShippingMethods(mapped.shippingMethods)
      setSelectedShippingMethodId(mapped.selectedShippingMethodId)
      writeBffSnapshot({
        cartId: cart.cartId,
        lines: cart.lines,
        totals: cart.totals,
        shippingMethods: cart.shippingMethods,
        selectedShippingMethodId: mapped.selectedShippingMethodId,
      })
    },
    [],
  )

  useEffect(() => {
    const sync = () => {
      if (mode === "local") {
        const stored = readLocalCart()
        const selectedId = readSelectedShippingId()
        applyLocalState(stored, selectedId)
        return
      }

      const snapshot = readBffSnapshot()
      if (!snapshot) {
        setCartId(null)
        setItems([])
        setTotals({ subtotal: 0, shipping: 0, total: 0, currency: "EUR" })
        setShippingMethods([])
        setSelectedShippingMethodId(null)
        return
      }

      const mapped = mapBffCart(
        {
          cartId: snapshot.cartId,
          currency: "EUR",
          lines: snapshot.lines,
          totals: snapshot.totals,
          shippingMethods: snapshot.shippingMethods,
        },
        readProductInfoMap(),
        snapshot.selectedShippingMethodId ?? null,
      )
      setCartId(snapshot.cartId)
      setItems(mapped.items)
      setTotals(mapped.totals)
      setShippingMethods(mapped.shippingMethods)
      setSelectedShippingMethodId(mapped.selectedShippingMethodId)
    }

    sync()
    if (typeof window === "undefined") return
    window.addEventListener(CART_EVENT, sync)
    window.addEventListener("storage", sync)
    return () => {
      window.removeEventListener(CART_EVENT, sync)
      window.removeEventListener("storage", sync)
    }
  }, [applyLocalState, mode])

  const ensureBffCart = useCallback(async () => {
    if (cartId) return cartId
    setIsSyncing(true)
    setError(null)
    try {
      const cart = await createCart()
      applyBffCartState(cart, selectedShippingMethodId)
      return cart.cartId
    } catch {
      setError("bff")
      return null
    } finally {
      setIsSyncing(false)
    }
  }, [applyBffCartState, cartId, selectedShippingMethodId])

  const addItem = useCallback(
    async (input: ShopCartAddInput) => {
      const quantity = input.quantity ?? 1
      upsertProductInfo(input)

      if (mode === "local") {
        const current = readLocalCart()
        const existing = current.find((item) => item.slug === input.slug)
        const nextItems = existing
          ? current.map((item) =>
              item.slug === input.slug
                ? { ...item, quantity: item.quantity + quantity }
                : item,
            )
          : [...current, { ...input, quantity }]
        writeLocalCart(nextItems)
        applyLocalState(nextItems, selectedShippingMethodId)
        return
      }

      setIsSyncing(true)
      setError(null)
      try {
        const currentCartId = await ensureBffCart()
        if (!currentCartId) return
        const existing = items.find((item) => item.slug === input.slug)
        const nextQuantity = existing ? existing.quantity + quantity : quantity
        const cart = existing?.lineId
          ? await updateCartLine(currentCartId, existing.lineId, nextQuantity)
          : await addCartLine(currentCartId, input.slug, nextQuantity)
        applyBffCartState(cart, selectedShippingMethodId)
      } catch {
        setError("bff")
      } finally {
        setIsSyncing(false)
      }
    },
    [
      applyBffCartState,
      applyLocalState,
      ensureBffCart,
      items,
      mode,
      selectedShippingMethodId,
    ],
  )

  const updateQuantity = useCallback(
    async (slug: string, quantity: number) => {
      if (mode === "local") {
        const nextItems = readLocalCart()
          .map((item) => (item.slug === slug ? { ...item, quantity } : item))
          .filter((item) => item.quantity > 0)
        writeLocalCart(nextItems)
        applyLocalState(nextItems, selectedShippingMethodId)
        return
      }

      const currentCartId = await ensureBffCart()
      if (!currentCartId) return
      const existing = items.find((item) => item.slug === slug)
      if (!existing?.lineId) return

      setIsSyncing(true)
      setError(null)
      try {
        const cart = quantity > 0
          ? await updateCartLine(currentCartId, existing.lineId, quantity)
          : await removeCartLine(currentCartId, existing.lineId)
        applyBffCartState(cart, selectedShippingMethodId)
      } catch {
        setError("bff")
      } finally {
        setIsSyncing(false)
      }
    },
    [applyBffCartState, applyLocalState, ensureBffCart, items, mode, selectedShippingMethodId],
  )

  const removeItem = useCallback(
    async (slug: string) => {
      if (mode === "local") {
        const nextItems = readLocalCart().filter((item) => item.slug !== slug)
        writeLocalCart(nextItems)
        applyLocalState(nextItems, selectedShippingMethodId)
        return
      }

      const currentCartId = await ensureBffCart()
      if (!currentCartId) return
      const existing = items.find((item) => item.slug === slug)
      if (!existing?.lineId) return

      setIsSyncing(true)
      setError(null)
      try {
        const cart = await removeCartLine(currentCartId, existing.lineId)
        applyBffCartState(cart, selectedShippingMethodId)
      } catch {
        setError("bff")
      } finally {
        setIsSyncing(false)
      }
    },
    [applyBffCartState, applyLocalState, ensureBffCart, items, mode, selectedShippingMethodId],
  )

  const clearCart = useCallback(async () => {
    if (mode === "local") {
      writeLocalCart([])
      applyLocalState([], selectedShippingMethodId)
      return
    }

    const currentCartId = await ensureBffCart()
    if (!currentCartId) return

    setIsSyncing(true)
    setError(null)
    try {
      let cart: BffCart | null = null
      for (const item of items) {
        if (!item.lineId) continue
        cart = await removeCartLine(currentCartId, item.lineId)
      }
      if (cart) {
        applyBffCartState(cart, selectedShippingMethodId)
      } else {
        setItems([])
        setTotals({ subtotal: 0, shipping: 0, total: 0, currency: "EUR" })
        setShippingMethods([])
        setSelectedShippingMethodId(null)
        setCartId(null)
        writeBffSnapshot(null)
      }
    } catch {
      setError("bff")
    } finally {
      setIsSyncing(false)
    }
  }, [applyBffCartState, applyLocalState, ensureBffCart, items, mode, selectedShippingMethodId])

  const setShippingMethod = useCallback(
    (methodId: string) => {
      setSelectedShippingMethodId(methodId)
      if (mode === "local") {
        writeSelectedShippingId(methodId)
        setTotals(computeLocalTotals(items, methodId))
        return
      }

      const shipping =
        shippingMethods.find((method) => method.id === methodId)?.priceEur ?? totals.shipping
      setTotals({ ...totals, shipping, total: totals.subtotal + shipping })
      const snapshot = readBffSnapshot()
      if (snapshot) {
        snapshot.selectedShippingMethodId = methodId
        writeBffSnapshot(snapshot)
      }
    },
    [items, mode, shippingMethods, totals],
  )

  const checkout = useCallback(
    async ({
      email,
      shippingMethodId,
    }: {
      email: string
      shippingMethodId?: string | null
    }) => {
      if (mode !== "bff") return null
      const currentCartId = await ensureBffCart()
      if (!currentCartId) throw new Error("cart-unavailable")
      const resolvedShippingId =
        shippingMethodId ?? selectedShippingMethodId ?? shippingMethods[0]?.id
      if (!resolvedShippingId) throw new Error("shipping-unavailable")

      setIsSyncing(true)
      setError(null)
      try {
        return await startCheckout(currentCartId, {
          email,
          shippingMethodId: resolvedShippingId,
        })
      } catch (err) {
        setError("bff")
        throw err
      } finally {
        setIsSyncing(false)
      }
    },
    [ensureBffCart, mode, selectedShippingMethodId, shippingMethods],
  )

  const subtotal = totals.subtotal
  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  )

  return {
    mode,
    items,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    totals,
    shippingMethods,
    selectedShippingMethodId,
    setShippingMethod,
    checkout,
    subtotal,
    itemCount,
    isSyncing,
    error,
  }
}
