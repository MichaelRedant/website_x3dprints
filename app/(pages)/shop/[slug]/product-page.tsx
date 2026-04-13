import Image from "next/image"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ReadMoreLinks from "@/components/ReadMoreLinks"
import ShopAddToCartPanel from "@/components/ShopAddToCartPanel"
import ShopCartStickySummary from "@/components/ShopCartStickySummary"
import ShopProductActionButton from "@/components/ShopProductActionButton"
import {
  SITE,
  buildBreadcrumbSchema,
  buildProductSchema,
  normalizeMetaDescription,
} from "@/lib/seo"
import { buildShopInquiryHref, isInquiryProduct } from "@/lib/shop-purchase"
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
  shippingBodyInquiry: string
  pickupTitle: string
  pickupBody: string
  pickupBodyInquiry: string
  highlightsTitle: string
  specsTitle: string
  specsFallback: string
  crossSellTitle: string
  crossSellBody: string
  crossSellCta: string
  ctaPrimary: string
  ctaInquiryPrimary: string
  ctaInquirySupport: string
  ctaSecondary: string
  ctaMaterials: string
  cartCta: string
  checkoutCta: string
  availabilityLabel: string
  stockLabel: string
  leadTimeLabel: string
  inquiryBadge: string
  inquiryNoticeTitle: string
  inquiryNoticeBody: string
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
    shippingBodyInquiry:
      "Na je aanvraag bevestigen we beschikbare aantallen, verzendkost en hoe snel we kunnen verzenden.",
    pickupTitle: "Gratis afhalen op afspraak",
    pickupBody: "Afhalen kan na bevestiging van je order en tijdslot.",
    pickupBodyInquiry: "Afhalen in Herzele kan zodra je aantal en timing bevestigd zijn.",
    highlightsTitle: "Waarom klanten dit kiezen",
    specsTitle: "Specificaties",
    specsFallback: "Specificaties volgen. Vraag intussen gerust advies op maat.",
    crossSellTitle: "Past hier goed bij",
    crossSellBody: "Handig om samen te bestellen en opvolging te vereenvoudigen.",
    crossSellCta: "Bekijk product",
    ctaPrimary: "Vraag offerte voor dit product",
    ctaInquiryPrimary: "Open bestelaanvraag",
    ctaInquirySupport: "Vraag stockcheck of extra info",
    ctaSecondary: "Hulp bij materiaalkeuze",
    ctaMaterials: "Vergelijk materialen",
    cartCta: "Bekijk mandje",
    checkoutCta: "Ga naar checkout",
    availabilityLabel: "Status",
    stockLabel: "Voorraad",
    leadTimeLabel: "Productietijd",
    inquiryBadge: "Bestellen via aanvraag",
    inquiryNoticeTitle: "Voorlopig nog geen directe checkout",
    inquiryNoticeBody:
      "Deze startershop werkt voor dit item via aanvraag. Je krijgt eerst bevestiging van beschikbaar aantal, verzendkost en afhaalmogelijkheid.",
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
    shippingBodyInquiry:
      "After your request, we confirm available quantity, shipping cost, and how fast we can dispatch.",
    pickupTitle: "Free pickup by appointment",
    pickupBody: "Pickup is available after order confirmation and time-slot agreement.",
    pickupBodyInquiry: "Pickup in Herzele is possible once quantity and timing are confirmed.",
    highlightsTitle: "Why customers choose this",
    specsTitle: "Specifications",
    specsFallback: "Specifications will follow. Ask us for tailored guidance in the meantime.",
    crossSellTitle: "Works well with",
    crossSellBody: "Useful add-ons to order together and simplify follow-up.",
    crossSellCta: "View product",
    ctaPrimary: "Request quote for this product",
    ctaInquiryPrimary: "Open order request",
    ctaInquirySupport: "Ask for a stock check or extra info",
    ctaSecondary: "Get material guidance",
    ctaMaterials: "Compare materials",
    cartCta: "View cart",
    checkoutCta: "Go to checkout",
    availabilityLabel: "Status",
    stockLabel: "Stock",
    leadTimeLabel: "Production time",
    inquiryBadge: "Ordered through request",
    inquiryNoticeTitle: "Direct checkout is not live yet",
    inquiryNoticeBody:
      "This starter shop handles this item through a request flow for now. You first receive confirmation on available quantity, shipping cost, and pickup options.",
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
  const imageUrl = product.ogImage ? localizeText(product.ogImage, locale) : product.image?.url || SITE.ogImage

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
  const isInquiryMode = isInquiryProduct(product)
  const stockCount = Number.isFinite(product.stockCount) ? product.stockCount : null
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
  const cartUrl = `${basePath}/shop/cart`
  const checkoutUrl = `${basePath}/shop/checkout`
  const inquiryHref = buildShopInquiryHref({ product, locale })

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
        <div className="mx-auto max-w-[96rem] 2xl:max-w-[108rem]">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 p-6 sm:p-8 xl:p-10">
              <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-indigo-200/45 blur-3xl" />
              <div aria-hidden className="pointer-events-none absolute -bottom-24 left-8 h-56 w-56 rounded-full bg-cyan-200/40 blur-3xl" />
              <div className="relative md:text-center lg:text-left">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">{copy.shopLabel}</p>
                <Link
                  href={shopUrl}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 sm:w-fit md:mx-auto lg:mx-0"
                >
                  <span className="i-lucide-arrow-left" aria-hidden />
                  {copy.backToShop}
                </Link>
                <h1 className="mt-4 text-balance text-4xl font-extrabold text-slate-900 sm:text-5xl">
                  {productName}
                </h1>
                <p className="mt-4 max-w-3xl text-lg text-slate-600 md:mx-auto lg:mx-0">{productSummary}</p>

                <div className="mt-5 flex flex-wrap items-center gap-2 text-xs font-semibold md:justify-center lg:justify-start">
                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-emerald-700">
                    {copy.availabilityLabel}: {availabilityLabel}
                  </span>
                  {stockCount ? (
                    <span className="rounded-full border border-teal-200 bg-teal-50 px-2 py-1 text-teal-700">
                      {copy.stockLabel}: {stockCount}
                    </span>
                  ) : null}
                  {leadTime ? (
                    <span className="rounded-full border border-sky-200 bg-sky-50 px-2 py-1 text-sky-700">
                      {copy.leadTimeLabel}: {leadTime}
                    </span>
                  ) : null}
                  {isInquiryMode ? (
                    <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-1 text-amber-700">
                      {copy.inquiryBadge}
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

          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] xl:gap-8">
            <div className="space-y-6">
              <GlassCard className="border-slate-200/80 bg-white/80 md:text-center lg:text-left">
                <h2 className="text-lg font-semibold text-slate-900">{copy.highlightsTitle}</h2>
                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  {highlightItems.map((item) => (
                    <div key={item.title} className="rounded-2xl border border-slate-100 bg-white/70 p-4 md:text-center lg:text-left">
                      <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                      <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>

              <GlassCard className="border-slate-200/80 bg-white/80 md:text-center lg:text-left">
                <h2 className="text-lg font-semibold text-slate-900">{copy.specsTitle}</h2>
                {specsItems.length > 0 ? (
                  <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-100 bg-white/70">
                    <table className="min-w-[420px] w-full text-left text-sm text-slate-600 md:text-left">
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
              <GlassCard className="border-slate-200/80 bg-white/80 md:text-center lg:text-left">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-100 bg-slate-100">
                  <Image
                    src={productImageUrl}
                    alt={productImageAlt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1536px) 30vw, (min-width: 1024px) 40vw, 92vw"
                    priority
                  />
                </div>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{copy.priceLabel}</p>
                <p className="mt-2 text-3xl font-semibold text-slate-900">{productPrice}</p>
                <div className="mt-3 space-y-1 text-sm text-slate-600">
                  <p>
                    <span className="font-semibold text-slate-900">{copy.availabilityLabel}:</span> {availabilityLabel}
                  </p>
                  {stockCount ? (
                    <p>
                      <span className="font-semibold text-slate-900">{copy.stockLabel}:</span> {stockCount}
                    </p>
                  ) : null}
                  {leadTime ? (
                    <p>
                      <span className="font-semibold text-slate-900">{copy.leadTimeLabel}:</span> {leadTime}
                    </p>
                  ) : null}
                </div>
                <div className="mt-5 space-y-3">
                  <ShopAddToCartPanel product={product} locale={locale} />
                  {isInquiryMode ? (
                    <>
                      <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-4 text-sm text-amber-950">
                        <p className="font-semibold">{copy.inquiryNoticeTitle}</p>
                        <p className="mt-2 text-amber-900">{copy.inquiryNoticeBody}</p>
                      </div>
                      <div className="mt-1 flex flex-wrap gap-3 md:justify-center lg:justify-start">
                        <Link
                          href={contactUrl}
                          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 sm:w-auto"
                        >
                          {copy.ctaInquirySupport}
                        </Link>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="grid gap-2 sm:grid-cols-2">
                        <Link
                          href={cartUrl}
                          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50"
                        >
                          {copy.cartCta}
                          <span className="i-lucide-shopping-cart" aria-hidden />
                        </Link>
                        <Link
                          href={checkoutUrl}
                          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[linear-gradient(90deg,#6366f1,45%,#22d3ee)] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
                        >
                          {copy.checkoutCta}
                          <span className="i-lucide-credit-card" aria-hidden />
                        </Link>
                      </div>
                      <div className="mt-1 flex flex-wrap gap-3 md:justify-center lg:justify-start">
                        <Link
                          href={contactUrl}
                          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 sm:w-auto"
                        >
                          {copy.ctaPrimary}
                        </Link>
                      </div>
                    </>
                  )}
                </div>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:justify-center lg:justify-start">
                  {isInquiryMode ? (
                    <Link
                      href={inquiryHref}
                      className="inline-flex w-full items-center justify-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-500 sm:w-auto"
                    >
                      {copy.ctaInquiryPrimary}
                      <span className="i-lucide-arrow-right" aria-hidden />
                    </Link>
                  ) : (
                    <Link
                      href={suggestionUrl}
                      className="inline-flex w-full items-center justify-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-500 sm:w-auto"
                    >
                      {copy.ctaSecondary}
                      <span className="i-lucide-arrow-right" aria-hidden />
                    </Link>
                  )}
                  <Link
                    href={materialsUrl}
                    className="inline-flex w-full items-center justify-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-500 sm:w-auto"
                  >
                    {copy.ctaMaterials}
                    <span className="i-lucide-arrow-right" aria-hidden />
                  </Link>
                </div>
              </GlassCard>

              <GlassCard className="border-slate-200/80 bg-white/80 md:text-center lg:text-left">
                <h2 className="text-lg font-semibold text-slate-900">{copy.shippingTitle}</h2>
                <p className="mt-2 text-sm text-slate-600">
                  {isInquiryMode ? copy.shippingBodyInquiry : copy.shippingBody}
                </p>
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-slate-900">{copy.pickupTitle}</h3>
                  <p className="mt-1 text-sm text-slate-600">
                    {isInquiryMode ? copy.pickupBodyInquiry : copy.pickupBody}
                  </p>
                </div>
              </GlassCard>

              {!isInquiryMode ? (
                <ShopCartStickySummary locale={locale} className="lg:sticky lg:top-24" />
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {relatedProducts.length ? (
        <section className="px-6 pb-14 sm:px-8 lg:px-12 xl:pb-16">
          <div className="mx-auto max-w-[96rem] 2xl:max-w-[108rem]">
            <GlassCard className="border-slate-200/80 bg-white/80 md:text-center lg:text-left">
              <h2 className="text-lg font-semibold text-slate-900">{copy.crossSellTitle}</h2>
              <p className="mt-2 text-sm text-slate-600">{copy.crossSellBody}</p>
              <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                {relatedProducts.map((item) => {
                  const name = localizeText(item.name, locale)
                  const summary = localizeText(item.summary, locale)
                  const imageAlt = item.image.alt ? localizeText(item.image.alt, locale) : name
                  const href = `${basePath}/shop/${item.slug}`
                  return (
                    <div key={item.slug} className="rounded-2xl border border-slate-100 bg-white/70 p-4 md:text-center lg:text-left">
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
                      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center md:justify-center lg:justify-start">
                        <ShopProductActionButton
                          product={item}
                          locale={locale}
                          className="w-full justify-center px-4 py-2 text-xs sm:w-auto"
                        />
                        <Link
                          href={href}
                          className="inline-flex w-full items-center justify-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-500 sm:w-auto"
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

