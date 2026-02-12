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
    title: "Winkelmand",
    checkoutTitle: "Checkout",
    cartSubtitle: "Je bekijkt demo-modus. Controleer je items en volg dezelfde flow als live.",
    cartSubtitleLive: "Controleer je items, pas aantallen aan en ga verder naar checkout.",
    checkoutSubtitle: "Demo-modus: kies verzending en test je bestelstap.",
    checkoutSubtitleLive: "Kies verzending, vul je e-mail in en ga veilig naar Mollie.",
    emptyTitle: "Je winkelmand is nog leeg",
    emptyBody: "Voeg een product toe om je bestelling te starten.",
    continueShopping: "Naar shop",
    subtotal: "Subtotaal",
    shipping: "Verzending (BE)",
    shippingEstimate: "Verzending (BE, indicatief)",
    total: "Totaal",
    totalEstimate: "Totaal (indicatief)",
    quantity: "Aantal",
    remove: "Verwijderen",
    clear: "Mandje leegmaken",
    checkout: "Ga naar checkout",
    request: "Vraag hulp",
    items: "Items",
    placeOrder: "Plaats demo-bestelling",
    payment: "Betaal via Mollie",
    paymentLoading: "Betaalpagina openen...",
    successTitle: "Demo-bestelling opgeslagen",
    successBody: "Je bestelling is in demo-modus opgeslagen. In live modus start hier de betaling.",
    successNote: "Gebruik de ordercode voor testdoeleinden of ga terug naar de shop.",
    backToShop: "Terug naar shop",
    steps: ["Mandje", "Checkout", "Bevestiging"],
    orderCodeLabel: "Ordercode",
    copyCode: "Kopieer code",
    copied: "Gekopieerd",
    summaryLabel: "Besteloverzicht",
    itemCount: "Items",
    totalLabel: "Totaal",
    shippingMethod: "Verzendmethode",
    shippingChoiceTitle: "Kies verzendmethode",
    shippingChoiceNote: "Afhalen op afspraak is gratis.",
    emailLabel: "E-mail voor bestelbevestiging",
    emailPlaceholder: "jij@bedrijf.be",
    emailRequired: "Vul een geldig e-mailadres in om verder te gaan.",
    shippingRequired: "Kies eerst een verzendmethode.",
    checkoutError: "We konden de checkout niet starten. Probeer opnieuw.",
    backendDown: "Shopbackend is momenteel niet bereikbaar.",
    liveNote: "Na klikken ga je naar Mollie in een beveiligde betaalflow.",
    demoNote: "Je werkt in demo-modus; totalen zijn indicatief.",
    modeLive: "Live modus actief",
    modeDemo: "Demo modus actief",
    modeBodyLive: "Producten, prijzen en checkout lopen via je CRM/BFF.",
    modeBodyDemo: "Backend niet bereikbaar: checkout draait lokaal in demo-modus.",
    crossSellTitle: "Aanbevolen bij je bestelling",
    crossSellBody: "Geselecteerd op basis van je huidige items.",
    crossSellCta: "Bekijk product",
    perUnit: "per stuk",
    decrease: "Aantal verlagen",
    increase: "Aantal verhogen",
    helpTitle: "Hulp nodig?",
    helpBody: "Deel je model of toepassing en we adviseren materiaal, afwerking en aantallen.",
  },
  en: {
    title: "Cart",
    checkoutTitle: "Checkout",
    cartSubtitle: "You are viewing demo mode. Review items and follow the same flow as live.",
    cartSubtitleLive: "Review your items, adjust quantities, and continue to checkout.",
    checkoutSubtitle: "Demo mode: choose shipping and test the order step.",
    checkoutSubtitleLive: "Choose shipping, enter your email, and proceed securely to Mollie.",
    emptyTitle: "Your cart is still empty",
    emptyBody: "Add a product to start your order.",
    continueShopping: "Back to shop",
    subtotal: "Subtotal",
    shipping: "Shipping (BE)",
    shippingEstimate: "Shipping (BE, estimate)",
    total: "Total",
    totalEstimate: "Total (estimate)",
    quantity: "Qty",
    remove: "Remove",
    clear: "Clear cart",
    checkout: "Go to checkout",
    request: "Get help",
    items: "Items",
    placeOrder: "Place demo order",
    payment: "Pay with Mollie",
    paymentLoading: "Opening Mollie...",
    successTitle: "Demo order saved",
    successBody: "Your order was saved in demo mode. Live mode will start payment here.",
    successNote: "Use the order code for testing or return to the shop.",
    backToShop: "Back to shop",
    steps: ["Cart", "Checkout", "Confirmation"],
    orderCodeLabel: "Order code",
    copyCode: "Copy code",
    copied: "Copied",
    summaryLabel: "Order summary",
    itemCount: "Items",
    totalLabel: "Total",
    shippingMethod: "Shipping method",
    shippingChoiceTitle: "Choose shipping method",
    shippingChoiceNote: "Pickup by appointment is free.",
    emailLabel: "Email for confirmation",
    emailPlaceholder: "you@company.be",
    emailRequired: "Enter a valid email address to continue.",
    shippingRequired: "Select a shipping method first.",
    checkoutError: "We could not start checkout. Please try again.",
    backendDown: "Shop backend is currently unavailable.",
    liveNote: "After clicking, you continue to Mollie in a secure payment flow.",
    demoNote: "You are in demo mode; totals are indicative.",
    modeLive: "Live mode enabled",
    modeDemo: "Demo mode enabled",
    modeBodyLive: "Products, pricing and checkout run through your CRM/BFF.",
    modeBodyDemo: "Backend unavailable: checkout is running in local demo mode.",
    crossSellTitle: "Recommended for your order",
    crossSellBody: "Selected based on your current items.",
    crossSellCta: "View product",
    perUnit: "per item",
    decrease: "Decrease quantity",
    increase: "Increase quantity",
    helpTitle: "Need help?",
    helpBody: "Share your model or use case and we will advise material, finish, and quantity.",
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
  const sectionTitle = isCheckout ? copy.checkoutTitle : copy.title

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
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <GlassCard className="relative overflow-hidden border-slate-200/80 bg-white/80">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-emerald-200/50 blur-3xl"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-24 left-10 h-56 w-56 rounded-full bg-indigo-200/40 blur-3xl"
              />
              <div className="relative">
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
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[linear-gradient(90deg,#6366f1,45%,#22d3ee)] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
              >
                {copy.backToShop}
                <span className="i-lucide-arrow-right" aria-hidden />
              </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>
    )
  }

  if (items.length === 0) {
    return (
      <section className="px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <GlassCard className="relative overflow-hidden border-slate-200/80 bg-white/80">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-indigo-200/45 blur-3xl"
              />
              <div className="relative">
              <h2 className="text-2xl font-semibold text-slate-900">{copy.emptyTitle}</h2>
              <p className="mt-2 text-sm text-slate-600">{copy.emptyBody}</p>
              <Link
                href={shopHref}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[linear-gradient(90deg,#6366f1,45%,#22d3ee)] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
              >
                {copy.continueShopping}
                <span className="i-lucide-arrow-right" aria-hidden />
              </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>
    )
  }

  return (
    <section className="px-6 pb-16 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl space-y-6">
        <Reveal>
          <GlassCard className="relative overflow-hidden border-slate-200/80 bg-white/80">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-indigo-200/45 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-24 left-10 h-56 w-56 rounded-full bg-cyan-200/40 blur-3xl"
            />

            <div className="relative">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">{sectionTitle}</h2>
                  <p className="mt-2 text-sm text-slate-600">
                    {isCheckout
                      ? isLiveCheckout
                        ? copy.checkoutSubtitleLive
                        : copy.checkoutSubtitle
                      : isLiveCheckout
                        ? copy.cartSubtitleLive
                        : copy.cartSubtitle}
                  </p>
                  <div
                    className={cn(
                      "mt-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold",
                      isLiveCheckout
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border-amber-200 bg-amber-50 text-amber-700",
                    )}
                  >
                    <span className={isLiveCheckout ? "i-lucide-server-cog" : "i-lucide-flask-conical"} aria-hidden />
                    {isLiveCheckout ? copy.modeLive : copy.modeDemo}
                  </div>
                  <p className="mt-2 text-xs text-slate-500">{isLiveCheckout ? copy.modeBodyLive : copy.modeBodyDemo}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    href={shopHref}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50"
                  >
                    {copy.continueShopping}
                  </Link>
                  <button
                    type="button"
                    onClick={() => void clearCart()}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
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
                      "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold shadow-sm",
                      index <= stepIndex
                        ? "bg-indigo-600 text-white"
                        : "border border-slate-200 bg-white text-slate-500",
                    )}
                  >
                    <span
                      className={cn(
                        "inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-semibold",
                        index <= stepIndex ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500",
                      )}
                    >
                      {index + 1}
                    </span>
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </GlassCard>
        </Reveal>

        <Reveal>
          <div className="grid gap-6 xl:gap-8 xl:grid-cols-[1.35fr_0.65fr] 2xl:grid-cols-[1.4fr_0.6fr]">
            <GlassCard className="overflow-hidden border-slate-200/80 bg-white/80 p-0">
              <div className="border-b border-slate-100 bg-white/60 px-6 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{copy.items}</p>
              </div>
              <div className="divide-y divide-slate-100">
                {items.map((item) => {
                  const name = localize(item.name, locale)
                  const alt = localize(item.imageAlt, locale)
                  const itemTotal = item.lineTotalEur ?? item.priceEur * item.quantity
                  const itemHref = locale === "en" ? `/en/shop/${item.slug}` : `/shop/${item.slug}`
                  return (
                    <div
                      key={item.slug}
                      className="flex flex-col gap-4 bg-white/70 px-6 py-5 transition sm:flex-row sm:items-center xl:px-7"
                    >
                      <Link
                        href={itemHref}
                        className="w-full max-w-[144px] overflow-hidden rounded-xl border border-slate-100 bg-white transition hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
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
                        <p className="text-sm text-slate-600">
                          {formatEur(item.priceEur)} {copy.perUnit}
                        </p>
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                            {copy.quantity}
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => void updateQuantity(item.slug, Math.max(1, item.quantity - 1))}
                              className="h-8 w-8 rounded-full border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
                              aria-label={copy.decrease}
                              disabled={isSyncing}
                            >
                              -
                            </button>
                            <span className="min-w-[2ch] text-sm font-semibold text-slate-900">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => void updateQuantity(item.slug, item.quantity + 1)}
                              className="h-8 w-8 rounded-full border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
                              aria-label={copy.increase}
                              disabled={isSyncing}
                            >
                              +
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => void removeItem(item.slug)}
                            className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 transition hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
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

            <div className="space-y-6 xl:sticky xl:top-24 xl:self-start">
              <GlassCard className="border-slate-200/80 bg-white/80">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{copy.summaryLabel}</p>
                <div className="mt-3 space-y-2 text-sm text-slate-600">
                  <div className="flex items-center justify-between">
                    <span>{copy.subtotal}</span>
                    <span className="font-semibold text-slate-900">{formatEur(totals.subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>{shippingLabel}</span>
                    <span className="font-semibold text-slate-900">{formatEur(totals.shipping)}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-200 pt-2 text-base font-semibold text-slate-900">
                    <span>{totalLabel}</span>
                    <span>{formatEur(totals.total)}</span>
                  </div>
                </div>

                {resolvedShippingMethods.length > 0 ? (
                  <div className="mt-4 space-y-4 border-t border-slate-200 pt-4">
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
                                "flex cursor-pointer items-center justify-between rounded-xl border px-3 py-2 text-sm transition",
                                isSelected
                                  ? "border-indigo-500 bg-indigo-50 text-slate-900"
                                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300",
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
                          "bg-[linear-gradient(90deg,#6366f1,45%,#22d3ee)] transition hover:brightness-110",
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
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[linear-gradient(90deg,#6366f1,45%,#22d3ee)] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
                      >
                        {copy.placeOrder}
                        <span className="i-lucide-check" aria-hidden />
                      </button>
                    )
                  ) : (
                    <Link
                      href={checkoutHref}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[linear-gradient(90deg,#6366f1,45%,#22d3ee)] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
                    >
                      {copy.checkout}
                      <span className="i-lucide-arrow-right" aria-hidden />
                    </Link>
                  )}

                  {isCheckout ? (
                    <Link
                      href={contactHref}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50"
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
                    <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700">
                      {checkoutError ?? copy.backendDown}
                    </p>
                  )}
                </div>
              </GlassCard>

              {crossSellProducts.length ? (
                <GlassCard className="border-slate-200/80 bg-white/80">
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
                        <div
                          key={product.slug}
                          className="rounded-2xl border border-slate-200/80 bg-white/90 p-3 transition hover:-translate-y-0.5 hover:shadow-md"
                        >
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

              <GlassCard className="border-slate-200/80 bg-white/80">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                  {copy.helpTitle}
                </p>
                <p className="mt-2 text-sm text-slate-600">{copy.helpBody}</p>
                <Link
                  href={contactHref}
                  className="mt-3 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50"
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
