const BUSINESS_PHONE = process.env.NEXT_PUBLIC_BUSINESS_PHONE ?? ""
const BUSINESS_PRICE_RANGE = process.env.NEXT_PUBLIC_PRICE_RANGE ?? "€€"

export const SITE = {
  name: "X3DPrints",
  url: "https://www.x3dprints.be",
  title: "X3DPrints — 3D Print Service",
  description:
    "Professionele 3D print service in Belgie. Snel, nauwkeurig en betaalbaar. Upload je model en ontvang een offerte.",
  ogImage: "/og-x3dprints.jpg",
  locale: "nl_BE",
  phone: BUSINESS_PHONE,
  priceRange: BUSINESS_PRICE_RANGE,
  address: {
    street: "Provincieweg 34a",
    locality: "Borsbeke",
    region: "Oost-Vlaanderen",
    postalCode: "9552",
    country: "BE",
  },
  sameAs: [
    "https://www.linkedin.com/company/x3dprints",
    "https://www.instagram.com/x3dprints",
  ],
} as const

type LocalBusinessSchemaInput = {
  pageUrl?: string
  description?: string
  image?: string
  priceRange?: string
  areaServed?: string
  inLanguage?: string | string[]
  alternateName?: string | string[]
  offersName?: string
  offers?: SchemaOfferInput[]
}

export type SchemaOfferInput = {
  serviceName: string
  price: string
  priceCurrency?: string
  priceValidUntil?: string
  url?: string
  description?: string
}

export const BASE_ORGANIZATION_SCHEMA = {
  "@type": "Organization",
  name: SITE.name,
  url: SITE.url,
  logo: {
    "@type": "ImageObject",
    url: `${SITE.url}${SITE.ogImage}`,
  },
  sameAs: SITE.sameAs,
  alternateName: ["X3DPrints", "X3DPrints (English)"],
  inLanguage: ["nl-BE", "en-BE"],
} as const

export function buildLocalBusinessSchema(options: LocalBusinessSchemaInput = {}) {
  const offerCatalog =
    options.offers && options.offers.length
      ? buildOfferCatalog(options.offersName ?? "3D Print Services", options.offers)
      : undefined

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE.name,
    url: options.pageUrl || SITE.url,
    description: options.description || SITE.description,
    inLanguage: options.inLanguage ?? ["nl-BE", "en-BE"],
    ...(options.alternateName
      ? { alternateName: options.alternateName }
      : { alternateName: ["X3DPrints", "X3DPrints (English)"] }),
    ...(SITE.phone ? { telephone: SITE.phone } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
    addressLocality: SITE.address.locality,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postalCode,
    addressCountry: SITE.address.country,
  },
    image: options.image ? `${SITE.url}${options.image}` : `${SITE.url}${SITE.ogImage}`,
    priceRange: options.priceRange ?? SITE.priceRange,
    areaServed: options.areaServed ?? "BE",
    ...(offerCatalog ? { hasOfferCatalog: offerCatalog } : {}),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "20:00",
      },
    ],
  }
}

export function buildOfferCatalog(name: string, offers: SchemaOfferInput[]) {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name,
    itemListElement: offers.map((offer) => ({
      "@type": "Offer",
      name: offer.serviceName,
      description: offer.description,
      price: parseFloat(offer.price.replace(/[^\d.]/g, "")) || undefined,
      priceCurrency: offer.priceCurrency ?? "EUR",
      priceValidUntil: offer.priceValidUntil,
      url: offer.url ?? SITE.url,
      provider: {
        "@type": "LocalBusiness",
        name: SITE.name,
        url: SITE.url,
      },
    })),
  }
}

export function buildServiceSchema(serviceName: string, offers: SchemaOfferInput[], pageUrl?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    description: SITE.description,
    provider: {
      "@type": "LocalBusiness",
      name: SITE.name,
      url: SITE.url,
      ...(SITE.phone ? { telephone: SITE.phone } : {}),
    },
    serviceOutput: offers.map((offer) => ({
      "@type": "Text",
      name: offer.serviceName,
    })),
    url: pageUrl ?? SITE.url,
    offers: offers.map((offer) => ({
      "@type": "Offer",
      name: offer.serviceName,
      price: parseFloat(offer.price.replace(/[^\d.]/g, "")) || undefined,
      priceCurrency: offer.priceCurrency ?? "EUR",
      description: offer.description,
      url: offer.url ?? pageUrl ?? SITE.url,
    })),
  }
}

/** Clamp to a sensible description length without mid-word cuts. */
export function clampToWords(input: string, max = 158): string {
  const s = input.replace(/\s+/g, " ").trim()
  if (s.length <= max) return s
  const cut = s.slice(0, max)
  const lastSpace = cut.lastIndexOf(" ")
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut).replace(/[.,;:?!-]+$/, "")
}

/** City fallback when there is no custom metaDescription and md isn't helpful. */
export function buildCityMetaDescription(city: string): string {
  const msg = `3D printen in ${city} door X3DPrints: prototypes en kleine series, strakke afwerking. Levertijd 2-5 werkdagen. Materialen: PLA, PETG, TPU. Vraag je offerte.`
  return clampToWords(msg, 158)
}

type ArticleSchemaInput = {
  canonical: string
  headline: string
  description: string
  datePublished: string
  dateModified: string
  image?: string | string[]
  inLanguage?: string | string[]
}

export function buildArticleJsonLd({
  canonical,
  headline,
  description,
  datePublished,
  dateModified,
  image,
  inLanguage = ["nl-BE", "en-BE"],
}: ArticleSchemaInput) {
  const images = Array.isArray(image) ? image : image ? [image] : [`${SITE.url}${SITE.ogImage}`]
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    datePublished,
    dateModified,
    mainEntityOfPage: canonical,
    url: canonical,
    inLanguage,
    image: images.map((img) => (img.startsWith("http") ? img : `${SITE.url}${img}`)),
    author: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
      logo: {
        "@type": "ImageObject",
        url: `${SITE.url}${SITE.ogImage}`,
      },
    },
  }
}

/**
 * Try to pull a good one-liner from the first markdown paragraph.
 * Falls back to city meta if too short.
 */
export function makeDescriptionFromMarkdown(md: string, city: string): string {
  const firstPara = md.split(/\n{2,}/).find((p) => p.trim().length > 0) || ""
  const txt = firstPara
    .replace(/`{1,3}[^`]*`{1,3}/g, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/[*_>#~]/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim()
  const candidate = txt.length > 60 ? txt : buildCityMetaDescription(city)
  return clampToWords(candidate, 158)
}
