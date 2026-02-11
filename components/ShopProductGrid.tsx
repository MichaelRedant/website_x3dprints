"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import GlassCard from "@/components/GlassCard"
import Reveal from "@/components/Reveal"
import ShopAddToCartButton from "@/components/ShopAddToCartButton"
import { useShopCart } from "@/components/ShopCartState"
import { cn } from "@/lib/utils"
import type { LocalizedText, ShopCategoryKey, ShopProduct } from "@/content/shop-products"

type ShopLocale = "nl" | "en"

type ShopProductGridProps = {
  products: ShopProduct[]
  locale: ShopLocale
}

type FilterKey = "all" | ShopCategoryKey

const FILTER_LABELS: Record<ShopLocale, Record<FilterKey, string>> = {
  nl: {
    all: "Alles",
    clips: "Clips",
    organizers: "Organizers",
  },
  en: {
    all: "All",
    clips: "Clips",
    organizers: "Organizers",
  },
}

const COPY = {
  nl: {
    eyebrow: "Shop selectie",
    title: "Kies je 3D print",
    filters: "Filters",
    empty: "Nieuwe items volgen binnenkort.",
    cta: "Bekijk product",
    leadTimeLabel: "Levertijd",
    cartLabel: "Winkelmandje",
    quantityLabel: "Aantal",
  },
  en: {
    eyebrow: "Shop selection",
    title: "Pick your 3D print",
    filters: "Filters",
    empty: "New items are coming soon.",
    cta: "View product",
    leadTimeLabel: "Lead time",
    cartLabel: "Cart",
    quantityLabel: "Quantity",
  },
}

const formatEur = (value: number) => `EUR ${value.toFixed(2)}`

const AVAILABILITY_LABELS: Record<ShopLocale, Record<string, string>> = {
  nl: {
    InStock: "Op voorraad",
    PreOrder: "Op bestelling",
    LimitedAvailability: "Beperkt",
    OutOfStock: "Niet beschikbaar",
  },
  en: {
    InStock: "In stock",
    PreOrder: "Made to order",
    LimitedAvailability: "Limited",
    OutOfStock: "Out of stock",
  },
}

function localize(text: LocalizedText, locale: ShopLocale) {
  return locale === "en" ? text.en : text.nl
}

function formatLeadTime(locale: ShopLocale, min: number, max: number) {
  const range = min === max ? `${min}` : `${min}-${max}`
  return locale === "en" ? `${range} business days` : `${range} werkdagen`
}

function clampQuantity(value: number) {
  if (!Number.isFinite(value) || value <= 0) return 1
  return Math.min(Math.max(Math.round(value), 1), 99)
}

export default function ShopProductGrid({ products, locale }: ShopProductGridProps) {
  const copy = locale === "en" ? COPY.en : COPY.nl
  const { itemCount } = useShopCart()
  const cartHref = locale === "en" ? "/en/shop/cart" : "/shop/cart"
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const availableCategories = useMemo(() => {
    const set = new Set<ShopCategoryKey>()
    for (const product of products) {
      for (const category of product.categories ?? []) {
        set.add(category)
      }
    }
    return Array.from(set)
  }, [products])

  const filters: FilterKey[] = useMemo(
    () => ["all", ...availableCategories],
    [availableCategories],
  )
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all")

  const filteredProducts = useMemo(() => {
    if (activeFilter === "all") return products
    return products.filter((product) => product.categories?.includes(activeFilter))
  }, [activeFilter, products])

  const resolveQuantity = (slug: string) => quantities[slug] ?? 1
  const updateQuantity = (slug: string, value: number) => {
    setQuantities((prev) => ({ ...prev, [slug]: clampQuantity(value) }))
  }

  return (
    <section id="shop-collection" className="px-6 pb-12 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl space-y-6">
        <Reveal>
          <GlassCard>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{copy.eyebrow}</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">{copy.title}</h2>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              {filters.length > 1 ? (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                    {copy.filters}
                  </span>
                  {filters.map((filter) => {
                    const label = FILTER_LABELS[locale][filter]
                    const isActive = activeFilter === filter
                    return (
                      <button
                        key={filter}
                        type="button"
                        onClick={() => setActiveFilter(filter)}
                        className={cn(
                          "rounded-full px-3 py-1 text-xs font-semibold transition",
                          isActive
                            ? "bg-indigo-600 text-white shadow-sm"
                            : "border border-slate-200 bg-white text-slate-600 hover:text-slate-900",
                        )}
                      >
                        {label}
                      </button>
                    )
                  })}
                </div>
              ) : (
                <span />
              )}
              <Link
                href={cartHref}
                className="inline-flex items-center gap-3 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm transition hover:border-indigo-300 hover:bg-indigo-100"
              >
                <span className="i-lucide-shopping-cart text-base" aria-hidden />
                {copy.cartLabel}
                {itemCount > 0 ? (
                  <span className="inline-flex min-w-[1.5rem] items-center justify-center rounded-full bg-indigo-600 px-2 py-0.5 text-xs font-semibold text-white">
                    {itemCount}
                  </span>
                ) : null}
              </Link>
            </div>

            {filteredProducts.length === 0 ? (
              <p className="mt-6 text-sm text-slate-600">{copy.empty}</p>
            ) : (
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {filteredProducts.map((product) => {
                  const name = localize(product.name, locale)
                  const summary = localize(product.summary, locale)
                  const imageAlt = localize(product.image.alt, locale)
                  const href = locale === "en" ? `/en/shop/${product.slug}` : `/shop/${product.slug}`
                  const availability = product.availability
                    ? AVAILABILITY_LABELS[locale][product.availability] ?? product.availability
                    : null
                  const leadTime = product.leadTimeDays
                    ? formatLeadTime(locale, product.leadTimeDays.min, product.leadTimeDays.max)
                    : null
                  const quantity = resolveQuantity(product.slug)
                  const isUnavailable = product.availability === "OutOfStock"
                  return (
                    <div key={product.slug} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                      <div className="overflow-hidden rounded-xl border border-slate-100 bg-white">
                        <Image
                          src={product.image.url}
                          alt={imageAlt}
                          width={1200}
                          height={900}
                          className="h-auto w-full object-cover"
                          sizes="(min-width: 768px) 30vw, 90vw"
                        />
                      </div>
                      <h3 className="mt-4 text-lg font-semibold text-slate-900">{name}</h3>
                      <p className="mt-2 text-sm text-slate-600">{summary}</p>
                      {(product.categories?.length || availability || leadTime) && (
                        <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
                          {product.categories?.map((category) => (
                            <span key={category} className="rounded-full border border-slate-200 bg-white px-2 py-0.5">
                              {FILTER_LABELS[locale][category]}
                            </span>
                          ))}
                          {availability && (
                            <span className="rounded-full border border-slate-200 bg-white px-2 py-0.5">
                              {availability}
                            </span>
                          )}
                          {leadTime && (
                            <span className="rounded-full border border-slate-200 bg-white px-2 py-0.5">
                              {copy.leadTimeLabel}: {leadTime}
                            </span>
                          )}
                        </div>
                      )}
                      <p className="mt-3 text-sm font-semibold text-slate-900">{formatEur(product.priceEur)}</p>
                      <div className="mt-3 flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 shadow-sm">
                          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-500">
                            {copy.quantityLabel}
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => updateQuantity(product.slug, quantity - 1)}
                              disabled={isUnavailable}
                              className="h-7 w-7 rounded-full border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:text-slate-900 disabled:opacity-50"
                              aria-label={copy.quantityLabel}
                            >
                              -
                            </button>
                            <input
                              type="number"
                              min={1}
                              max={99}
                              value={quantity}
                              onChange={(event) => updateQuantity(product.slug, Number(event.target.value))}
                              disabled={isUnavailable}
                              className="w-12 rounded-lg border border-slate-200 bg-white px-2 py-1 text-center text-xs font-semibold text-slate-900"
                              aria-label={copy.quantityLabel}
                            />
                            <button
                              type="button"
                              onClick={() => updateQuantity(product.slug, quantity + 1)}
                              disabled={isUnavailable}
                              className="h-7 w-7 rounded-full border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:text-slate-900 disabled:opacity-50"
                              aria-label={copy.quantityLabel}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <ShopAddToCartButton
                          product={product}
                          locale={locale}
                          quantity={quantity}
                          className="px-4 py-2 text-xs"
                        />
                        <Link
                          href={href}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-500"
                        >
                          {copy.cta}
                          <span className="i-lucide-arrow-right" aria-hidden />
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </GlassCard>
        </Reveal>

      </div>
    </section>
  )
}
