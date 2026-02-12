"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import GlassCard from "@/components/GlassCard"
import Reveal from "@/components/Reveal"
import ShopAddToCartButton from "@/components/ShopAddToCartButton"
import { useShopCart } from "@/components/ShopCartState"
import { SHOP_BFF_ENABLED } from "@/lib/shop-config"
import { getShopProducts } from "@/lib/shop-data"
import { cn } from "@/lib/utils"
import type { LocalizedText, ShopCategoryKey, ShopProduct } from "@/content/shop-products"

type ShopLocale = "nl" | "en"

type ShopProductGridProps = {
  products: ShopProduct[]
  locale: ShopLocale
}

type FilterKey = "all" | ShopCategoryKey

type SortKey = "featured" | "priceAsc" | "priceDesc" | "nameAsc"

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
    eyebrow: "Actuele collectie",
    title: "Vind het juiste product in enkele klikken",
    filters: "Categorie",
    searchLabel: "Zoek product",
    searchPlaceholder: "Zoek op productnaam, materiaal of tag",
    sortLabel: "Sorteer",
    empty: "Geen producten gevonden. Pas je filters aan of reset je selectie.",
    clear: "Reset selectie",
    cta: "Bekijk details",
    leadTimeLabel: "Productietijd",
    cartLabel: "Bekijk mandje",
    quantityLabel: "Aantal",
    decrease: "Aantal verlagen",
    increase: "Aantal verhogen",
    results: "resultaten",
    availabilityLabel: "Status",
    sortOptions: {
      featured: "Meest relevant",
      priceAsc: "Prijs: laag naar hoog",
      priceDesc: "Prijs: hoog naar laag",
      nameAsc: "Naam: A-Z",
    },
  },
  en: {
    eyebrow: "Live collection",
    title: "Find the right product in a few clicks",
    filters: "Category",
    searchLabel: "Search products",
    searchPlaceholder: "Search by product name, material, or tag",
    sortLabel: "Sort by",
    empty: "No products found. Adjust filters or reset your selection.",
    clear: "Reset filters",
    cta: "View details",
    leadTimeLabel: "Production time",
    cartLabel: "View cart",
    quantityLabel: "Quantity",
    decrease: "Decrease quantity",
    increase: "Increase quantity",
    results: "results",
    availabilityLabel: "Status",
    sortOptions: {
      featured: "Most relevant",
      priceAsc: "Price: low to high",
      priceDesc: "Price: high to low",
      nameAsc: "Name: A-Z",
    },
  },
}

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

const AVAILABILITY_CLASSES: Record<string, string> = {
  InStock: "border-emerald-200 bg-emerald-50 text-emerald-700",
  PreOrder: "border-sky-200 bg-sky-50 text-sky-700",
  LimitedAvailability: "border-amber-200 bg-amber-50 text-amber-700",
  OutOfStock: "border-rose-200 bg-rose-50 text-rose-700",
}

const formatEur = (value: number) => `EUR ${value.toFixed(2)}`

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

  const [liveProducts, setLiveProducts] = useState<ShopProduct[]>(products)
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<SortKey>("featured")

  useEffect(() => {
    setLiveProducts(products)
  }, [products])

  useEffect(() => {
    if (!SHOP_BFF_ENABLED) return
    let cancelled = false

    async function loadLiveProducts() {
      try {
        const latest = await getShopProducts(locale)
        if (!cancelled) {
          setLiveProducts(latest.filter((product) => product.isLive))
        }
      } catch {
        // Keep current state if live refresh fails.
      }
    }

    void loadLiveProducts()
    const timer = window.setInterval(() => {
      void loadLiveProducts()
    }, 60000)

    return () => {
      cancelled = true
      window.clearInterval(timer)
    }
  }, [locale])

  const availableCategories = useMemo(() => {
    const set = new Set<ShopCategoryKey>()
    for (const product of liveProducts) {
      for (const category of product.categories ?? []) {
        set.add(category)
      }
    }
    return Array.from(set)
  }, [liveProducts])

  const filters: FilterKey[] = useMemo(() => ["all", ...availableCategories], [availableCategories])

  useEffect(() => {
    if (activeFilter !== "all" && !filters.includes(activeFilter)) {
      setActiveFilter("all")
    }
  }, [activeFilter, filters])

  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    const base = liveProducts.filter((product) => {
      if (activeFilter !== "all" && !product.categories?.includes(activeFilter)) return false
      if (!query) return true

      const name = localize(product.name, locale).toLowerCase()
      const summary = localize(product.summary, locale).toLowerCase()
      const tags = (product.tags ?? []).join(" ").toLowerCase()
      return name.includes(query) || summary.includes(query) || tags.includes(query)
    })

    if (sortBy === "priceAsc") {
      return [...base].sort((a, b) => a.priceEur - b.priceEur)
    }
    if (sortBy === "priceDesc") {
      return [...base].sort((a, b) => b.priceEur - a.priceEur)
    }
    if (sortBy === "nameAsc") {
      return [...base].sort((a, b) => localize(a.name, locale).localeCompare(localize(b.name, locale)))
    }
    return base
  }, [activeFilter, liveProducts, locale, searchTerm, sortBy])

  const resolveQuantity = (slug: string) => quantities[slug] ?? 1

  const updateQuantity = (slug: string, value: number) => {
    setQuantities((prev) => ({ ...prev, [slug]: clampQuantity(value) }))
  }

  const resetFilters = () => {
    setActiveFilter("all")
    setSearchTerm("")
    setSortBy("featured")
  }

  return (
    <section id="shop-collection" className="px-6 pb-14 sm:px-8 lg:px-12 xl:pb-16">
      <div className="mx-auto max-w-7xl space-y-6">
        <Reveal>
          <GlassCard className="relative overflow-hidden border-slate-200/80 bg-white/80 xl:p-8">
            <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-indigo-200/45 blur-3xl" />
            <div aria-hidden className="pointer-events-none absolute -bottom-24 left-16 h-56 w-56 rounded-full bg-cyan-200/40 blur-3xl" />

            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{copy.eyebrow}</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">{copy.title}</h2>

              <div className="mt-6 grid gap-3 lg:grid-cols-[1fr_auto_auto] lg:items-center">
                <label className="block">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">{copy.searchLabel}</span>
                  <input
                    type="search"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder={copy.searchPlaceholder}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none"
                  />
                </label>

                <label className="block min-w-[170px]">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">{copy.sortLabel}</span>
                  <select
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value as SortKey)}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="featured">{copy.sortOptions.featured}</option>
                    <option value="priceAsc">{copy.sortOptions.priceAsc}</option>
                    <option value="priceDesc">{copy.sortOptions.priceDesc}</option>
                    <option value="nameAsc">{copy.sortOptions.nameAsc}</option>
                  </select>
                </label>

                <Link
                  href={cartHref}
                  className="inline-flex items-center justify-center gap-3 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-700 shadow-sm transition hover:border-indigo-300 hover:bg-indigo-100"
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

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{copy.filters}</span>
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

                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span>
                    {filteredProducts.length} {copy.results}
                  </span>
                  {(searchTerm || activeFilter !== "all" || sortBy !== "featured") && (
                    <button
                      type="button"
                      onClick={resetFilters}
                      className="font-semibold uppercase tracking-[0.2em] text-slate-600 transition hover:text-slate-900"
                    >
                      {copy.clear}
                    </button>
                  )}
                </div>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white/70 px-4 py-8 text-center">
                  <p className="text-sm text-slate-600">{copy.empty}</p>
                </div>
              ) : (
                <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                  {filteredProducts.map((product) => {
                    const name = localize(product.name, locale)
                    const summary = localize(product.summary, locale)
                    const imageAlt = localize(product.image.alt, locale)
                    const href = locale === "en" ? `/en/shop/${product.slug}` : `/shop/${product.slug}`
                    const availabilityKey = product.availability ?? "InStock"
                    const availability = AVAILABILITY_LABELS[locale][availabilityKey] ?? availabilityKey
                    const leadTime = product.leadTimeDays
                      ? formatLeadTime(locale, product.leadTimeDays.min, product.leadTimeDays.max)
                      : null
                    const quantity = resolveQuantity(product.slug)
                    const isUnavailable = availabilityKey === "OutOfStock"

                    return (
                      <article
                        key={product.slug}
                        className="group flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white/85 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg xl:p-5"
                      >
                        <Link
                          href={href}
                          className="block overflow-hidden rounded-xl border border-slate-100 bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                        >
                          <div className="relative aspect-[4/3]">
                            <Image
                              src={product.image.url}
                              alt={imageAlt}
                              fill
                              className="object-cover transition duration-300 group-hover:scale-[1.03]"
                              sizes="(min-width: 1536px) 18vw, (min-width: 1280px) 24vw, (min-width: 640px) 46vw, 96vw"
                            />
                          </div>
                        </Link>

                        <div className="mt-4 flex flex-1 flex-col">
                          <div className="flex items-start justify-between gap-3">
                            <h3 className="text-lg font-semibold text-slate-900">
                              <Link
                                href={href}
                                className="transition hover:text-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                              >
                                {name}
                              </Link>
                            </h3>
                            <p className="text-sm font-semibold text-slate-900">{formatEur(product.priceEur)}</p>
                          </div>

                          <p className="mt-2 line-clamp-3 text-sm text-slate-600">{summary}</p>

                          <div className="mt-3 flex flex-wrap gap-2">
                            <span
                              className={cn(
                                "rounded-full border px-2 py-0.5 text-[11px] font-semibold",
                                AVAILABILITY_CLASSES[availabilityKey] ?? "border-slate-200 bg-slate-50 text-slate-700",
                              )}
                            >
                              {copy.availabilityLabel}: {availability}
                            </span>
                            {leadTime && (
                              <span className="rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                                {copy.leadTimeLabel}: {leadTime}
                              </span>
                            )}
                          </div>

                          <div className="mt-4 flex flex-wrap items-center gap-3">
                            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 shadow-sm">
                              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-500">
                                {copy.quantityLabel}
                              </span>
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(product.slug, quantity - 1)}
                                  disabled={isUnavailable}
                                  className="h-7 w-7 rounded-full border border-slate-200 bg-white text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
                                  aria-label={`${copy.decrease}: ${name}`}
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
                                  inputMode="numeric"
                                  className="w-12 rounded-lg border border-slate-200 bg-white px-2 py-1 text-center text-xs font-semibold text-slate-900 focus:border-indigo-500 focus:outline-none"
                                  aria-label={`${copy.quantityLabel}: ${name}`}
                                />
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(product.slug, quantity + 1)}
                                  disabled={isUnavailable}
                                  className="h-7 w-7 rounded-full border border-slate-200 bg-white text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
                                  aria-label={`${copy.increase}: ${name}`}
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            <ShopAddToCartButton product={product} locale={locale} quantity={quantity} className="px-4 py-2 text-xs" />
                          </div>

                          <Link
                            href={href}
                            className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-500"
                          >
                            {copy.cta}
                            <span className="i-lucide-arrow-right" aria-hidden />
                          </Link>
                        </div>
                      </article>
                    )
                  })}
                </div>
              )}
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  )
}
