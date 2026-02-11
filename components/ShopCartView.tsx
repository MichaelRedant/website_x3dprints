"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import GlassCard from "@/components/GlassCard"
import Reveal from "@/components/Reveal"
import { cn } from "@/lib/utils"
import { useShopCart } from "@/components/ShopCartState"
import { getShopProducts } from "@/lib/shop-data"
import { collectTagsForSlugs, pickRelatedProducts } from "@/lib/shop-related"
import { SHOP_PRODUCTS } from "@/content/shop-products"
import type { LocalizedText } from "@/content/shop-products"

type ShopLocale = "nl" | "en"
type ShopCartVariant = "cart" | "checkout"

type ShopCartViewProps = {
  locale: ShopLocale
  variant?: ShopCartVariant
}

const COPY = {
  nl: {
    title: "Winkelmandje",
    cartSubtitle: "Controleer je items en ga verder naar checkout.",
    cartSubtitleLive: "Controleer je items en ga verder naar checkout.",
    checkoutSubtitle: "Kies verzendmethode en ga veilig naar betaling.",
    checkoutSubtitleLive: "Kies verzendmethode en ga veilig naar betaling.",
    emptyTitle: "Winkelmandje is leeg",
    emptyBody: "Kies eerst een product om je bestelling te starten.",
    continueShopping: "Verder shoppen",
    subtotal: "Subtotaal",
    shipping: "Verzending (BE)",
    shippingEstimate: "Verzending (BE, indicatief)",
    total: "Totaal",
    totalEstimate: "Totaal (indicatief)",
    quantity: "Aantal",
    remove: "Verwijderen",
    clear: "Leegmaken",
    checkout: "Verder naar checkout",
    request: "Offerte aanvragen",
    items: "Items",
    placeOrder: "Plaats bestelling",
    payment: "Ga naar betaling",
    paymentLoading: "Bezig met betaling...",
    successTitle: "Bestelling geplaatst",
    successBody: "Je bestelling is opgeslagen. Bij livegang volgt hier de betaalstap.",
    successNote: "Je kan nu terug naar de shop of een offerte aanvragen.",
    backToShop: "Terug naar shop",
    steps: ["Winkelmandje", "Checkout", "Bevestiging"],
    orderCodeLabel: "Ordercode",
    copyCode: "Kopieer code",
    copied: "Gekopieerd",
    summaryLabel: "Samenvatting",
    itemCount: "Items",
    totalLabel: "Totaal",
    shippingMethod: "Verzendmethode",
    shippingChoiceTitle: "Kies levering of afhalen",
    shippingChoiceNote: "Afhalen op afspraak is gratis.",
    emailLabel: "E-mail voor bevestiging",
    emailPlaceholder: "jij@bedrijf.be",
    emailRequired: "Vul een geldig e-mailadres in.",
    shippingRequired: "Kies eerst een verzendmethode.",
    checkoutError: "We konden de checkout niet starten. Probeer opnieuw.",
    backendDown: "Shop backend is momenteel niet bereikbaar.",
    liveNote: "Je wordt doorgestuurd naar Mollie voor betaling.",
    demoNote: "Totalen zijn indicatief tot de shop live gaat.",
    crossSellTitle: "Maak het compleet",
    crossSellBody: "Past goed bij je huidige selectie.",
    crossSellCta: "Bekijk product",
  },
  en: {
    title: "Cart",
    cartSubtitle: "Review your items and continue to checkout.",
    cartSubtitleLive: "Review your items and continue to checkout.",
    checkoutSubtitle: "Choose shipping and proceed to payment.",
    checkoutSubtitleLive: "Choose shipping and proceed to payment.",
    emptyTitle: "Your cart is empty",
    emptyBody: "Pick a product to start your order.",
    continueShopping: "Continue shopping",
    subtotal: "Subtotal",
    shipping: "Shipping (BE)",
    shippingEstimate: "Shipping (BE, estimate)",
    total: "Total",
    totalEstimate: "Total (estimate)",
    quantity: "Qty",
    remove: "Remove",
    clear: "Clear",
    checkout: "Proceed to checkout",
    request: "Request a quote",
    items: "Items",
    placeOrder: "Place order",
    payment: "Proceed to payment",
    paymentLoading: "Opening payment...",
    successTitle: "Order placed",
    successBody: "Your order has been stored. Payment goes live when the shop launches.",
    successNote: "You can return to the shop or request a quote.",
    backToShop: "Back to shop",
    steps: ["Cart", "Checkout", "Confirmation"],
    orderCodeLabel: "Order code",
    copyCode: "Copy code",
    copied: "Copied",
    summaryLabel: "Summary",
    itemCount: "Items",
    totalLabel: "Total",
    shippingMethod: "Shipping method",
    shippingChoiceTitle: "Choose delivery or pickup",
    shippingChoiceNote: "Pickup by appointment is free.",
    emailLabel: "Confirmation email",
    emailPlaceholder: "you@company.be",
    emailRequired: "Enter a valid email address.",
    shippingRequired: "Select a shipping method.",
    checkoutError: "We could not start checkout. Please try again.",
    backendDown: "Shop backend is currently unavailable.",
    liveNote: "You will be redirected to Mollie for payment.",
    demoNote: "Totals are indicative until the shop goes live.",
    crossSellTitle: "Complete your order",
    crossSellBody: "Pairs well with your current selection.",
    crossSellCta: "View product",
  },
}

const SHIPPING_LABELS: Record<ShopLocale, Record<string, string>> = {
  nl: {
    be_flat: "Levering in Belgie (tot 3 kg)",
    pickup: "Afhalen op afspraak",
  },
  en: {
    be_flat: "Delivery in Belgium (up to 3 kg)",
    pickup: "Pickup by appointment",
  },
}

const formatEur = (value: number) => `EUR ${value.toFixed(2)}`

function localize(text: LocalizedText, locale: ShopLocale) {
  return locale === "en" ? text.en : text.nl
}

function isValidEmail(value: string) {
  return value.includes("@") && value.includes(".")
}

export default function ShopCartView({ locale, variant = "cart" }: ShopCartViewProps) {
  const copy = locale === "en" ? COPY.en : COPY.nl
  const [catalog, setCatalog] = useState(SHOP_PRODUCTS)
  const {
    mode,
    items,
    updateQuantity,
    removeItem,
    clearCart,
    totals,
    itemCount,
    shippingMethods,
    selectedShippingMethodId,
    setShippingMethod,
    checkout,
    isSyncing,
    error,
  } = useShopCart()
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderCode, setOrderCode] = useState<string | null>(null)
  const [orderSummary, setOrderSummary] = useState<{ total: number; itemCount: number } | null>(null)
  const [copied, setCopied] = useState(false)
  const [email, setEmail] = useState("")
  const [checkoutError, setCheckoutError] = useState<string | null>(null)
  const [redirecting, setRedirecting] = useState(false)

  const isCheckout = variant === "checkout"
  const isLiveCheckout = mode === "bff"
  const stepIndex = orderPlaced ? 2 : isCheckout ? 1 : 0
  const shopHref = locale === "en" ? "/en/shop" : "/shop"
  const checkoutHref = locale === "en" ? "/en/shop/checkout" : "/shop/checkout"
  const contactHref = locale === "en" ? "/en/contact" : "/contact"
  const shippingLabel = isLiveCheckout ? copy.shipping : copy.shippingEstimate
  const totalLabel = isLiveCheckout ? copy.total : copy.totalEstimate

  useEffect(() => {
    let active = true
    getShopProducts(locale)
      .then((products) => {
        if (active && products.length) {
          setCatalog(products)
        }
      })
      .catch(() => null)
    return () => {
      active = false
    }
  }, [locale])

  const cartSlugs = useMemo(() => items.map((item) => item.slug), [items])
  const crossSellTags = useMemo(
    () => collectTagsForSlugs(catalog, cartSlugs),
    [catalog, cartSlugs],
  )
  const crossSellProducts = useMemo(
    () =>
      pickRelatedProducts({
        products: catalog,
        tags: crossSellTags,
        excludeSlugs: cartSlugs,
        limit: 3,
      }),
    [catalog, cartSlugs, crossSellTags],
  )

  const resolvedShippingMethods = shippingMethods.length ? shippingMethods : []
  const selectedShippingId =
    selectedShippingMethodId ?? resolvedShippingMethods[0]?.id ?? null

  const buildDemoOrderCode = () => {
    const stamp = new Date()
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\..+/, "")
    const random = Math.random().toString(36).slice(2, 6).toUpperCase()
    return `DEMO-${stamp}-${random}`
  }

  const handleCopy = async () => {
    if (!orderCode) return
    try {
      await navigator.clipboard.writeText(orderCode)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      // Ignore clipboard failures for demo mode
    }
  }

  const handleDemoOrder = () => {
    const code = buildDemoOrderCode()
    setOrderCode(code)
    setOrderSummary({ total: totals.total, itemCount })
    void clearCart()
    setOrderPlaced(true)
  }

  const handleCheckout = async () => {
    setCheckoutError(null)
    if (!selectedShippingId) {
      setCheckoutError(copy.shippingRequired)
      return
    }
    if (!isValidEmail(email)) {
      setCheckoutError(copy.emailRequired)
      return
    }
    try {
      setRedirecting(true)
      const result = await checkout({ email, shippingMethodId: selectedShippingId })
      if (result?.checkoutUrl) {
        window.location.href = result.checkoutUrl
        return
      }
      setCheckoutError(copy.checkoutError)
      setRedirecting(false)
    } catch {
      setCheckoutError(copy.checkoutError)
      setRedirecting(false)
    }
  }

  if (orderPlaced) {
    return (
      <section className="px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <span className="i-lucide-check text-2xl" aria-hidden />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">{copy.successTitle}</h2>
                  <p className="mt-2 text-sm text-slate-600">{copy.successBody}</p>
                </div>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-[1.2fr_0.8fr]">
                <div className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{copy.orderCodeLabel}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-semibold text-slate-900">
                      {orderCode ?? "DEMO"}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 transition hover:text-slate-700"
                    >
                      {copied ? copy.copied : copy.copyCode}
                    </button>
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{copy.summaryLabel}</p>
                  <div className="mt-2 space-y-1 text-sm text-slate-600">
                    <p>
                      <span className="font-semibold text-slate-900">{copy.itemCount}:</span>{" "}
                      {orderSummary?.itemCount ?? 0}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-900">{copy.totalLabel}:</span>{" "}
                      {formatEur(orderSummary?.total ?? 0)}
                    </p>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-600">{copy.successNote}</p>
              <Link
                href={shopHref}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-500"
              >
                {copy.backToShop}
                <span className="i-lucide-arrow-right" aria-hidden />
              </Link>
            </GlassCard>
          </Reveal>
        </div>
      </section>
    )
  }

  if (items.length === 0) {
    return (
      <section className="px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard>
              <h2 className="text-2xl font-semibold text-slate-900">{copy.emptyTitle}</h2>
              <p className="mt-2 text-sm text-slate-600">{copy.emptyBody}</p>
              <Link
                href={shopHref}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-500"
              >
                {copy.continueShopping}
                <span className="i-lucide-arrow-right" aria-hidden />
              </Link>
            </GlassCard>
          </Reveal>
        </div>
      </section>
    )
  }

  return (
    <section className="px-6 pb-16 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl space-y-6">
        <Reveal>
          <GlassCard>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">{copy.title}</h2>
                <p className="mt-2 text-sm text-slate-600">
                  {isCheckout
                    ? isLiveCheckout
                      ? copy.checkoutSubtitleLive
                      : copy.checkoutSubtitle
                    : isLiveCheckout
                      ? copy.cartSubtitleLive
                      : copy.cartSubtitle}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={shopHref}
                  className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 transition hover:text-slate-700"
                >
                  {copy.continueShopping}
                </Link>
                <button
                  type="button"
                  onClick={() => void clearCart()}
                  className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 transition hover:text-slate-700"
                  disabled={isSyncing}
                >
                  {copy.clear}
                </button>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {copy.steps.map((label, index) => (
                <span
                  key={label}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold",
                    index <= stepIndex
                      ? "bg-indigo-600 text-white"
                      : "border border-slate-200 bg-white text-slate-500",
                  )}
                >
                  {label}
                </span>
              ))}
            </div>
          </GlassCard>
        </Reveal>

        <Reveal>
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <GlassCard>
              <div className="space-y-4">
                {items.map((item) => {
                  const name = localize(item.name, locale)
                  const alt = localize(item.imageAlt, locale)
                  const itemTotal = item.lineTotalEur ?? item.priceEur * item.quantity
                  const itemHref = locale === "en" ? `/en/shop/${item.slug}` : `/shop/${item.slug}`
                  return (
                    <div key={item.slug} className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white/70 p-4 sm:flex-row sm:items-center">
                      <Link
                        href={itemHref}
                        className="w-full max-w-[140px] overflow-hidden rounded-xl border border-slate-100 bg-white transition hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                        aria-label={name}
                      >
                        <Image
                          src={item.imageUrl}
                          alt={alt}
                          width={600}
                          height={450}
                          className="h-auto w-full object-cover"
                          sizes="(min-width: 768px) 140px, 60vw"
                        />
                      </Link>
                      <div className="flex-1 space-y-2">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3 className="text-lg font-semibold text-slate-900">
                            <Link
                              href={itemHref}
                              className="transition hover:text-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            >
                              {name}
                            </Link>
                          </h3>
                          <p className="text-sm font-semibold text-slate-900">{formatEur(itemTotal)}</p>
                        </div>
                        <p className="text-sm text-slate-600">{formatEur(item.priceEur)} / stuk</p>
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                            {copy.quantity}
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => void updateQuantity(item.slug, Math.max(1, item.quantity - 1))}
                              className="h-8 w-8 rounded-full border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:text-slate-900"
                              aria-label="Decrease quantity"
                              disabled={isSyncing}
                            >
                              -
                            </button>
                            <span className="min-w-[2ch] text-sm font-semibold text-slate-900">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => void updateQuantity(item.slug, item.quantity + 1)}
                              className="h-8 w-8 rounded-full border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:text-slate-900"
                              aria-label="Increase quantity"
                              disabled={isSyncing}
                            >
                              +
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => void removeItem(item.slug)}
                            className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 transition hover:text-slate-700"
                            disabled={isSyncing}
                          >
                            {copy.remove}
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </GlassCard>

            <div className="space-y-6">
              <GlassCard>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{copy.items}</p>
                <div className="mt-3 space-y-2 text-sm text-slate-600">
                  <div className="flex items-center justify-between">
                    <span>{copy.subtotal}</span>
                    <span className="font-semibold text-slate-900">{formatEur(totals.subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>{shippingLabel}</span>
                    <span className="font-semibold text-slate-900">{formatEur(totals.shipping)}</span>
                  </div>
                  <div className="flex items-center justify-between text-base font-semibold text-slate-900">
                    <span>{totalLabel}</span>
                    <span>{formatEur(totals.total)}</span>
                  </div>
                </div>

              {resolvedShippingMethods.length > 0 ? (
                <div className="mt-4 space-y-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                      {copy.shippingChoiceTitle}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">{copy.shippingChoiceNote}</p>
                    <div className="mt-3 space-y-2">
                      {resolvedShippingMethods.map((method) => {
                        const label =
                          SHIPPING_LABELS[locale][method.id] ?? method.label ?? method.id
                        const isSelected = selectedShippingId === method.id
                        return (
                          <label
                            key={method.id}
                            className={cn(
                              "flex cursor-pointer items-center justify-between rounded-xl border px-3 py-2 text-sm",
                              isSelected
                                ? "border-indigo-500 bg-indigo-50 text-slate-900"
                                : "border-slate-200 bg-white text-slate-600",
                            )}
                          >
                            <span className="flex items-center gap-2">
                              <input
                                type="radio"
                                name="shipping-method"
                                className="h-4 w-4"
                                checked={isSelected}
                                onChange={() => setShippingMethod(method.id)}
                              />
                              {label}
                            </span>
                            <span className="font-semibold text-slate-900">
                              {formatEur(method.priceEur)}
                            </span>
                          </label>
                        )
                      })}
                    </div>
                  </div>

                  {isCheckout && isLiveCheckout ? (
                    <label className="block">
                      <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                        {copy.emailLabel}
                      </span>
                      <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder={copy.emailPlaceholder}
                        autoComplete="email"
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none"
                      />
                    </label>
                  ) : null}
                </div>
              ) : null}

                <div className="mt-4 flex flex-col gap-3">
                  {isCheckout ? (
                    isLiveCheckout ? (
                      <button
                        type="button"
                        onClick={handleCheckout}
                        disabled={
                          isSyncing ||
                          redirecting ||
                          !isValidEmail(email) ||
                          !selectedShippingId
                        }
                        className={cn(
                          "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-sm",
                          "bg-indigo-600 transition hover:brightness-110",
                          (isSyncing || redirecting) && "opacity-70",
                        )}
                      >
                        {redirecting ? copy.paymentLoading : copy.payment}
                        <span className="i-lucide-credit-card" aria-hidden />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleDemoOrder}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
                      >
                        {copy.placeOrder}
                        <span className="i-lucide-check" aria-hidden />
                      </button>
                    )
                  ) : (
                    <Link
                      href={checkoutHref}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
                    >
                      {copy.checkout}
                      <span className="i-lucide-arrow-right" aria-hidden />
                    </Link>
                  )}

                  {isCheckout ? (
                    <Link
                      href={contactHref}
                      className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 transition hover:text-slate-700"
                    >
                      {copy.request}
                    </Link>
                  ) : (
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <p>{isLiveCheckout ? copy.liveNote : copy.demoNote}</p>
                      <Link
                        href={shopHref}
                        className="font-semibold uppercase tracking-[0.3em] text-slate-500 transition hover:text-slate-700"
                      >
                        {copy.continueShopping}
                      </Link>
                    </div>
                  )}

                  {(checkoutError || error) && (
                    <p className="text-xs font-semibold text-rose-600">
                      {checkoutError ?? copy.backendDown}
                    </p>
                  )}
                </div>
              </GlassCard>

              {crossSellProducts.length ? (
                <GlassCard>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                    {copy.crossSellTitle}
                  </p>
                  <p className="mt-2 text-sm text-slate-600">{copy.crossSellBody}</p>
                  <div className="mt-4 space-y-3">
                    {crossSellProducts.map((product) => {
                      const name = localize(product.name, locale)
                      const summary = localize(product.summary, locale)
                      const href = locale === "en" ? `/en/shop/${product.slug}` : `/shop/${product.slug}`
                      return (
                        <div key={product.slug} className="rounded-2xl border border-slate-100 bg-white/70 p-3">
                          <div className="flex items-start gap-3">
                            <div className="w-20 overflow-hidden rounded-xl border border-slate-100 bg-white">
                              <Image
                                src={product.image.url}
                                alt={localize(product.image.alt, locale)}
                                width={320}
                                height={240}
                                className="h-auto w-full object-cover"
                                sizes="80px"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-slate-900">{name}</p>
                              <p className="mt-1 text-xs text-slate-600">{summary}</p>
                              <div className="mt-2 flex items-center justify-between text-xs text-slate-600">
                                <span className="font-semibold text-slate-900">{formatEur(product.priceEur)}</span>
                                <Link
                                  href={href}
                                  className="inline-flex items-center gap-1 font-semibold text-indigo-600 transition hover:text-indigo-500"
                                >
                                  {copy.crossSellCta}
                                  <span className="i-lucide-arrow-right" aria-hidden />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </GlassCard>
              ) : null}

              <GlassCard>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                  {locale === "en" ? "Need help?" : "Hulp nodig?"}
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  {locale === "en"
                    ? "Share your model or requirements and we will advise the best material."
                    : "Deel je model of vereisten en we adviseren het beste materiaal."}
                </p>
                <Link
                  href={contactHref}
                  className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-500"
                >
                  {copy.request}
                  <span className="i-lucide-arrow-right" aria-hidden />
                </Link>
              </GlassCard>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
