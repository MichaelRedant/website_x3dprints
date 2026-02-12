import Image from "next/image"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ReadMoreLinks from "@/components/ReadMoreLinks"
import ShopAddToCartButton from "@/components/ShopAddToCartButton"
import ShopAddToCartPanel from "@/components/ShopAddToCartPanel"
import ShopCartStickySummary from "@/components/ShopCartStickySummary"
import {
  SITE,
  buildBreadcrumbSchema,
  buildProductSchema,
  normalizeMetaDescription,
} from "@/lib/seo"
import type { LocalizedText, ShopProduct } from "@/content/shop-products"

export type ShopLocale = "nl" | "en"

type ShopCopy = {
  shopLabel: string
  titleSuffix: string
  descriptionFallback: string
  backToShop: string
  priceLabel: string
  shippingTitle: string
  shippingBody: string
  pickupTitle: string
  pickupBody: string
  highlightsTitle: string
  specsTitle: string
  specsFallback: string
  crossSellTitle: string
  crossSellBody: string
  crossSellCta: string
  ctaPrimary: string
  ctaSecondary: string
  ctaMaterials: string
  availabilityLabel: string
  leadTimeLabel: string
}

const COPY: Record<ShopLocale, ShopCopy> = {
  nl: {
    shopLabel: "Shop",
    titleSuffix: "3D print shop",
    descriptionFallback:
      "Kleinschalig geproduceerd in Belgie. Levering: EUR 7.50 tot 3 kg of gratis afhalen op afspraak.",
    backToShop: "Terug naar collectie",
    priceLabel: "Prijs",
    shippingTitle: "Levering en planning",
    shippingBody: "Levering in Belgie: EUR 7.50 tot 3 kg. Productie- en verzendtijd hangen af van materiaal en volume.",
    pickupTitle: "Gratis afhalen op afspraak",
    pickupBody: "Afhalen kan na bevestiging van je order en tijdslot.",
    highlightsTitle: "Waarom klanten dit kiezen",
    specsTitle: "Specificaties",
    specsFallback: "Specificaties volgen. Vraag intussen gerust advies op maat.",
    crossSellTitle: "Past hier goed bij",
    crossSellBody: "Handig om samen te bestellen en opvolging te vereenvoudigen.",
    crossSellCta: "Bekijk product",
    ctaPrimary: "Vraag offerte voor dit product",
    ctaSecondary: "Hulp bij materiaalkeuze",
    ctaMaterials: "Vergelijk materialen",
    availabilityLabel: "Status",
    leadTimeLabel: "Productietijd",
  },
  en: {
    shopLabel: "Shop",
    titleSuffix: "3D print shop",
    descriptionFallback:
      "Small-batch made in Belgium. Delivery: EUR 7.50 up to 3 kg or free pickup by appointment.",
    backToShop: "Back to collection",
    priceLabel: "Price",
    shippingTitle: "Delivery and planning",
    shippingBody: "Delivery in Belgium: EUR 7.50 up to 3 kg. Production and shipping time depend on material and volume.",
    pickupTitle: "Free pickup by appointment",
    pickupBody: "Pickup is available after order confirmation and time-slot agreement.",
    highlightsTitle: "Why customers choose this",
    specsTitle: "Specifications",
    specsFallback: "Specifications will follow. Ask us for tailored guidance in the meantime.",
    crossSellTitle: "Works well with",
    crossSellBody: "Useful add-ons to order together and simplify follow-up.",
    crossSellCta: "View product",
    ctaPrimary: "Request quote for this product",
    ctaSecondary: "Get material guidance",
    ctaMaterials: "Compare materials",
    availabilityLabel: "Status",
    leadTimeLabel: "Production time",
  },
}

const DEFAULT_HIGHLIGHTS: Record<ShopLocale, { title: string; description: string }[]> = {
  nl: [
    {
      title: "Kleinschalig en op maat",
      description: "We print op bestelling en stemmen details af op je toepassing.",
    },
    {
      title: "Materiaaladvies inbegrepen",
      description: "Je krijgt advies op basis van sterkte, look en budget.",
    },
    {
      title: "Controle voor verzending",
      description: "Elke print wordt nagekeken op maatvoering en afwerking.",
    },
  ],
  en: [
    {
      title: "Small-batch and tailored",
      description: "We print to order and align details with your use case.",
    },
    {
      title: "Material guidance included",
      description: "You get advice based on strength, look, and budget.",
    },
    {
      title: "Checked before shipping",
      description: "Every print is reviewed for dimensions and finish.",
    },
  ],
}

function formatEur(value: number) {
  return `EUR ${value.toFixed(2)}`
}

function localizeText(text: LocalizedText, locale: ShopLocale) {
  return locale === "en" ? text.en : text.nl
}

function formatLeadTime(locale: ShopLocale, min: number, max: number) {
  const range = min === max ? `${min}` : `${min}-${max}`
  return locale === "en" ? `${range} business days` : `${range} werkdagen`
}

function getAvailabilityLabel(locale: ShopLocale, availability: string) {
  if (locale === "en") {
    if (availability === "InStock") return "In stock"
    if (availability === "PreOrder") return "Made to order"
    if (availability === "LimitedAvailability") return "Limited"
    if (availability === "OutOfStock") return "Out of stock"
  }

  if (availability === "InStock") return "Op voorraad"
  if (availability === "PreOrder") return "Op bestelling"
  if (availability === "LimitedAvailability") return "Beperkt"
  if (availability === "OutOfStock") return "Niet beschikbaar"
  return availability
}

export function buildShopProductMetadata(product: ShopProduct, locale: ShopLocale) {
  const name = localizeText(product.name, locale)
  const basePath = locale === "en" ? "/en" : ""
  const canonical = `${SITE.url}${basePath}/shop/${product.slug}/`
  const summary = localizeText(product.summary, locale).trim()
  const descriptionInput = summary || (product.description ? localizeText(product.description, locale).trim() : "")
  const description = normalizeMetaDescription(descriptionInput, COPY[locale].descriptionFallback)
  const imageUrl = product.image?.url || SITE.ogImage

  return {
    title: `${name} | ${COPY[locale].titleSuffix} | X3DPrints`,
    description,
    alternates: {
      canonical,
      languages: {
        "nl-BE": `${SITE.url}/shop/${product.slug}/`,
        "en-BE": `${SITE.url}/en/shop/${product.slug}/`,
        "x-default": `${SITE.url}/shop/${product.slug}/`,
      },
    },
    openGraph: {
      title: name,
      description,
      url: canonical,
      images: [{ url: imageUrl, width: 1200, height: 630 }],
      locale: locale === "en" ? "en_BE" : "nl_BE",
      siteName: "X3DPrints",
    },
    twitter: {
      card: "summary_large_image",
      title: name,
      description,
      images: [imageUrl],
    },
  }
}

export function renderShopProductPage({
  product,
  locale,
  relatedProducts = [],
}: {
  product: ShopProduct
  locale: ShopLocale
  relatedProducts?: ShopProduct[]
}) {
  const copy = COPY[locale]
  const productName = localizeText(product.name, locale)
  const rawSummary = localizeText(product.summary, locale).trim()
  const rawDescription = product.description ? localizeText(product.description, locale).trim() : ""
  const productSummary = rawSummary || rawDescription || copy.descriptionFallback
  const productDescription = rawDescription || productSummary
  const productImageUrl = product.image?.url || SITE.ogImage
  const productImageAlt = product.image?.alt
    ? localizeText(product.image.alt, locale)
    : productName
  const productPrice = formatEur(product.priceEur)
  const availability = product.availability ?? "InStock"
  const availabilityLabel = getAvailabilityLabel(locale, availability)
  const leadTime = product.leadTimeDays
    ? formatLeadTime(locale, product.leadTimeDays.min, product.leadTimeDays.max)
    : null
  const tags = (product.tags ?? []).slice(0, 5)
  const categories = (product.categories ?? []).slice(0, 3)
  const basePath = locale === "en" ? "/en" : ""
  const productUrl = `${SITE.url}${basePath}/shop/${product.slug}/`
  const contactUrl = `${basePath}/contact`
  const materialsUrl = `${basePath}/materials`
  const suggestionUrl = `${basePath}/materials#material-suggestion-tool`
  const shopUrl = `${basePath}/shop`

  const highlightItems = product.highlights?.length
    ? product.highlights.map((item) => ({
        title: localizeText(item.title, locale),
        description: localizeText(item.description, locale),
      }))
    : DEFAULT_HIGHLIGHTS[locale]

  const specsItems = product.specs?.length
    ? product.specs.map((item) => ({
        label: localizeText(item.label, locale),
        value: localizeText(item.value, locale),
      }))
    : []

  const productSchema = buildProductSchema({
    name: productName,
    description: productDescription,
    url: productUrl,
    image: productImageUrl,
    sku: product.slug,
    price: product.priceEur,
    priceCurrency: "EUR",
    inLanguage: locale === "en" ? "en-BE" : "nl-BE",
    availability,
    leadTimeDays: product.leadTimeDays,
  })

  const breadcrumbSchema = buildBreadcrumbSchema({
    id: `${productUrl}#breadcrumb`,
    inLanguage: locale === "en" ? "en-BE" : "nl-BE",
    items: [
      { name: "Home", url: `${SITE.url}${basePath}/` },
      { name: copy.shopLabel, url: `${SITE.url}${basePath}/shop/` },
      { name: productName, url: productUrl },
    ],
  })

  return (
    <main className="flex-1">
      <section className="px-6 pb-14 pt-20 sm:px-8 lg:px-12 xl:pb-16">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 p-6 sm:p-8 xl:p-10">
              <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-indigo-200/45 blur-3xl" />
              <div aria-hidden className="pointer-events-none absolute -bottom-24 left-8 h-56 w-56 rounded-full bg-cyan-200/40 blur-3xl" />
              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">{copy.shopLabel}</p>
                <Link
                  href={shopUrl}
                  className="mt-3 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50"
                >
                  <span className="i-lucide-arrow-left" aria-hidden />
                  {copy.backToShop}
                </Link>
                <h1 className="mt-4 text-balance text-4xl font-extrabold text-slate-900 sm:text-5xl">
                  {productName}
                </h1>
                <p className="mt-4 max-w-3xl text-lg text-slate-600">{productSummary}</p>

                <div className="mt-5 flex flex-wrap items-center gap-2 text-xs font-semibold">
                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-emerald-700">
                    {copy.availabilityLabel}: {availabilityLabel}
                  </span>
                  {leadTime ? (
                    <span className="rounded-full border border-sky-200 bg-sky-50 px-2 py-1 text-sky-700">
                      {copy.leadTimeLabel}: {leadTime}
                    </span>
                  ) : null}
                  <span className="rounded-full border border-slate-200 bg-white px-2 py-1 text-slate-700">
                    {copy.priceLabel}: {productPrice}
                  </span>
                  {categories.map((category) => (
                    <span key={category} className="rounded-full border border-slate-200 bg-white px-2 py-1 text-slate-600">
                      {category}
                    </span>
                  ))}
                  {tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-slate-200 bg-white px-2 py-1 text-slate-600">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-6">
              <GlassCard className="border-slate-200/80 bg-white/80">
                <h2 className="text-lg font-semibold text-slate-900">{copy.highlightsTitle}</h2>
                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  {highlightItems.map((item) => (
                    <div key={item.title} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                      <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                      <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>

              <GlassCard className="border-slate-200/80 bg-white/80">
                <h2 className="text-lg font-semibold text-slate-900">{copy.specsTitle}</h2>
                {specsItems.length > 0 ? (
                  <div className="mt-4 overflow-hidden rounded-2xl border border-slate-100 bg-white/70">
                    <table className="w-full text-left text-sm text-slate-600">
                      <tbody>
                        {specsItems.map((spec) => (
                          <tr key={spec.label} className="border-b border-slate-100 last:border-b-0">
                            <th className="w-1/3 px-4 py-3 text-sm font-semibold text-slate-900">{spec.label}</th>
                            <td className="px-4 py-3">{spec.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="mt-3 text-sm text-slate-600">{copy.specsFallback}</p>
                )}
              </GlassCard>
            </div>

            <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <GlassCard className="border-slate-200/80 bg-white/80">
                <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white/70">
                  <Image
                    src={productImageUrl}
                    alt={productImageAlt}
                    width={1200}
                    height={900}
                    className="h-auto w-full object-cover"
                    sizes="(min-width: 1024px) 40vw, 90vw"
                    priority
                  />
                </div>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{copy.priceLabel}</p>
                <p className="mt-2 text-3xl font-semibold text-slate-900">{productPrice}</p>
                <div className="mt-3 space-y-1 text-sm text-slate-600">
                  <p>
                    <span className="font-semibold text-slate-900">{copy.availabilityLabel}:</span> {availabilityLabel}
                  </p>
                  {leadTime ? (
                    <p>
                      <span className="font-semibold text-slate-900">{copy.leadTimeLabel}:</span> {leadTime}
                    </p>
                  ) : null}
                </div>
                <div className="mt-5">
                  <ShopAddToCartPanel product={product} locale={locale} />
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Link
                      href={contactUrl}
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50"
                    >
                      {copy.ctaPrimary}
                    </Link>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-4">
                  <Link
                    href={suggestionUrl}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-500"
                  >
                    {copy.ctaSecondary}
                    <span className="i-lucide-arrow-right" aria-hidden />
                  </Link>
                  <Link
                    href={materialsUrl}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-500"
                  >
                    {copy.ctaMaterials}
                    <span className="i-lucide-arrow-right" aria-hidden />
                  </Link>
                </div>
              </GlassCard>

              <GlassCard className="border-slate-200/80 bg-white/80">
                <h2 className="text-lg font-semibold text-slate-900">{copy.shippingTitle}</h2>
                <p className="mt-2 text-sm text-slate-600">{copy.shippingBody}</p>
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-slate-900">{copy.pickupTitle}</h3>
                  <p className="mt-1 text-sm text-slate-600">{copy.pickupBody}</p>
                </div>
              </GlassCard>

              <ShopCartStickySummary locale={locale} className="lg:sticky lg:top-24" />
            </div>
          </div>
        </div>
      </section>

      {relatedProducts.length ? (
        <section className="px-6 pb-14 sm:px-8 lg:px-12 xl:pb-16">
          <div className="mx-auto max-w-7xl">
            <GlassCard className="border-slate-200/80 bg-white/80">
              <h2 className="text-lg font-semibold text-slate-900">{copy.crossSellTitle}</h2>
              <p className="mt-2 text-sm text-slate-600">{copy.crossSellBody}</p>
              <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {relatedProducts.map((item) => {
                  const name = localizeText(item.name, locale)
                  const summary = localizeText(item.summary, locale)
                  const imageAlt = item.image.alt ? localizeText(item.image.alt, locale) : name
                  const href = `${basePath}/shop/${item.slug}`
                  return (
                    <div key={item.slug} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                      <div className="overflow-hidden rounded-xl border border-slate-100 bg-white">
                        <Image
                          src={item.image.url}
                          alt={imageAlt}
                          width={1200}
                          height={900}
                          className="h-auto w-full object-cover"
                          sizes="(min-width: 768px) 30vw, 90vw"
                        />
                      </div>
                      <h3 className="mt-4 text-lg font-semibold text-slate-900">{name}</h3>
                      <p className="mt-2 text-sm text-slate-600">{summary}</p>
                      <p className="mt-3 text-sm font-semibold text-slate-900">{formatEur(item.priceEur)}</p>
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <ShopAddToCartButton product={item} locale={locale} className="px-4 py-2 text-xs" />
                        <Link
                          href={href}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-500"
                        >
                          {copy.crossSellCta}
                          <span className="i-lucide-arrow-right" aria-hidden />
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
            </GlassCard>
          </div>
        </section>
      ) : null}

      <ReadMoreLinks pageType="shop" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </main>
  )
}
