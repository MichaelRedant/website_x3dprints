const BUSINESS_PHONE = process.env.NEXT_PUBLIC_BUSINESS_PHONE ?? ""
const BUSINESS_PRICE_RANGE = process.env.NEXT_PUBLIC_PRICE_RANGE ?? "€€"
const BUSINESS_AUTHOR_NAME = process.env.NEXT_PUBLIC_AUTHOR_NAME ?? "Eigenaar X3DPrints"
const BUSINESS_AUTHOR_URL = process.env.NEXT_PUBLIC_AUTHOR_URL ?? "https://www.x3dprints.be/about/"

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
  author: {
    name: BUSINESS_AUTHOR_NAME,
    url: BUSINESS_AUTHOR_URL,
  },
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

export type SchemaFaqInput = {
  q: string
  a: string
} | {
  question: string
  answer: string
}

export type SchemaHowToStepInput = {
  name: string
  text?: string
  url?: string
  position?: number
  directions?: string[]
  tips?: string[]
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

type OrganizationSchemaInput = {
  url?: string
  inLanguage?: string | string[]
  sameAs?: string[]
  alternateName?: string | string[]
}

export function buildOrganizationSchema(options: OrganizationSchemaInput = {}) {
  return {
    "@context": "https://schema.org",
    ...BASE_ORGANIZATION_SCHEMA,
    ...(options.url ? { url: options.url } : {}),
    ...(options.inLanguage ? { inLanguage: options.inLanguage } : {}),
    ...(options.sameAs ? { sameAs: options.sameAs } : {}),
    ...(options.alternateName ? { alternateName: options.alternateName } : {}),
  }
}

type WebsiteSchemaInput = {
  url?: string
  inLanguage?: string | string[]
  name?: string
  description?: string
  searchTarget?: string
}

export function buildWebsiteSchema(options: WebsiteSchemaInput = {}) {
  const url = options.url ?? SITE.url
  const language = options.inLanguage ?? inferLanguageFromUrl(url)
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${url}#website`,
    url,
    name: options.name ?? SITE.name,
    description: options.description ?? SITE.description,
    inLanguage: language,
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: options.searchTarget ?? `${SITE.url}/blog?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  }
}

function inferLanguageFromUrl(input?: string): string | string[] {
  if (!input) return ["nl-BE", "en-BE"]

  try {
    const pathname = new URL(input, SITE.url).pathname
    if (pathname === "/en" || pathname.startsWith("/en/")) return "en-BE"
    return "nl-BE"
  } catch {
    return ["nl-BE", "en-BE"]
  }
}

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
    inLanguage: options.inLanguage ?? inferLanguageFromUrl(options.pageUrl),
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

type ServiceSchemaOptions = {
  description?: string
  inLanguage?: string | string[]
  mainEntityOfPage?: string
}

export function buildServiceSchema(
  serviceName: string,
  offers: SchemaOfferInput[],
  pageUrl?: string,
  options: ServiceSchemaOptions = {},
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    description: options.description ?? SITE.description,
    inLanguage: options.inLanguage ?? inferLanguageFromUrl(pageUrl),
    ...(options.mainEntityOfPage ? { mainEntityOfPage: options.mainEntityOfPage } : {}),
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

type FaqPageSchemaInput = {
  items: SchemaFaqInput[]
  inLanguage?: string | string[]
  mainEntityOfPage?: string
}

export function buildFaqPageSchema({
  items,
  inLanguage,
  mainEntityOfPage,
}: FaqPageSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: inLanguage ?? inferLanguageFromUrl(mainEntityOfPage),
    ...(mainEntityOfPage ? { mainEntityOfPage } : {}),
    mainEntity: items.map((item) => {
      const isQAPair = "q" in item
      const question = isQAPair ? item.q : item.question
      const answer = isQAPair ? item.a : item.answer
      return {
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answer,
        },
      }
    }),
  }
}

type HowToSchemaInput = {
  name: string
  description: string
  steps: SchemaHowToStepInput[]
  inLanguage?: string | string[]
  mainEntityOfPage?: string
  totalTime?: string
  toolNames?: string[]
  supplyNames?: string[]
  url?: string
}

export function buildHowToSchema({
  name,
  description,
  steps,
  inLanguage,
  mainEntityOfPage,
  totalTime,
  toolNames,
  supplyNames,
  url,
}: HowToSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    inLanguage: inLanguage ?? inferLanguageFromUrl(mainEntityOfPage ?? url),
    ...(mainEntityOfPage ? { mainEntityOfPage } : {}),
    ...(totalTime ? { totalTime } : {}),
    ...(url ? { url } : {}),
    step: steps.map((step, index) => {
      const itemListElement = [
        ...(step.directions ?? []).map((text) => ({ "@type": "HowToDirection", text })),
        ...(step.tips ?? []).map((text) => ({ "@type": "HowToTip", text })),
      ]
      return {
        "@type": "HowToStep",
        position: step.position ?? index + 1,
        name: step.name,
        ...(step.text ? { text: step.text } : {}),
        ...(step.url ? { url: step.url } : {}),
        ...(itemListElement.length ? { itemListElement } : {}),
      }
    }),
    ...(toolNames?.length
      ? {
          tool: toolNames.map((toolName) => ({
            "@type": "HowToTool",
            name: toolName,
          })),
        }
      : {}),
    ...(supplyNames?.length
      ? {
          supply: supplyNames.map((supplyName) => ({
            "@type": "HowToSupply",
            name: supplyName,
          })),
        }
      : {}),
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

/**
 * Keep descriptions inside practical snippet bounds while preserving intent.
 */
export function normalizeMetaDescription(input: string, fallback: string, min = 120, max = 170): string {
  const cleanInput = input.replace(/\s+/g, " ").trim()
  const cleanFallback = fallback.replace(/\s+/g, " ").trim()

  if (!cleanInput) return clampToWords(cleanFallback, max)
  if (cleanInput.length > max) return clampToWords(cleanInput, max)
  if (cleanInput.length >= min) return cleanInput

  const candidate = `${cleanInput} ${cleanFallback}`.replace(/\s+/g, " ").trim()
  return clampToWords(candidate, max)
}

export function buildLocationMetaTitle(city: string, locale: "nl" | "en" = "nl"): string {
  const nlTitle = `3D printen in ${city} | offerte en levering`
  const enTitle = `3D printing in ${city} | quote and delivery`
  const preferred = locale === "en" ? enTitle : nlTitle
  const fallback = locale === "en" ? `3D printing in ${city}` : `3D printen in ${city}`

  if (preferred.length <= 65) return preferred
  if (fallback.length <= 65) return fallback
  return preferred.slice(0, 65).trimEnd()
}

export function buildLocationMetaDescription(city: string, locale: "nl" | "en" = "nl"): string {
  if (locale === "en") {
    return clampToWords(
      `3D printing in ${city} by X3DPrints: prototypes and short runs in PLA, PETG or TPU. Fast quote, clear planning and delivery across Flanders.`,
      165,
    )
  }
  return clampToWords(
    `3D printen in ${city} via X3DPrints: prototypes en kleine series in PLA, PETG of TPU. Snelle offerte, duidelijke planning en levering in Vlaanderen.`,
    165,
  )
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
  authorType?: "Person" | "Organization"
  authorName?: string
  authorUrl?: string
  authorSameAs?: string[]
}

export function buildArticleJsonLd({
  canonical,
  headline,
  description,
  datePublished,
  dateModified,
  image,
  inLanguage,
  authorType = "Person",
  authorName = SITE.author.name,
  authorUrl = SITE.author.url,
  authorSameAs,
}: ArticleSchemaInput) {
  const images = Array.isArray(image) ? image : image ? [image] : [`${SITE.url}${SITE.ogImage}`]
  const author =
    authorType === "Organization"
      ? {
          "@type": "Organization" as const,
          name: authorName || SITE.name,
          url: authorUrl || SITE.url,
          ...(authorSameAs?.length ? { sameAs: authorSameAs } : {}),
        }
      : {
          "@type": "Person" as const,
          name: authorName,
          url: authorUrl,
          ...(authorSameAs?.length ? { sameAs: authorSameAs } : {}),
          worksFor: {
            "@type": "Organization",
            name: SITE.name,
            url: SITE.url,
          },
        }
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    datePublished,
    dateModified,
    mainEntityOfPage: canonical,
    url: canonical,
    inLanguage: inLanguage ?? inferLanguageFromUrl(canonical),
    image: images.map((img) => (img.startsWith("http") ? img : `${SITE.url}${img}`)),
    author,
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

type BreadcrumbSchemaItem = {
  name: string
  url: string
}

type BreadcrumbSchemaInput = {
  id: string
  inLanguage: string
  items: BreadcrumbSchemaItem[]
}

export function buildBreadcrumbSchema({ id, inLanguage, items }: BreadcrumbSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": id,
    inLanguage,
    itemListElement: items.map((item, index) => {
      const position = index + 1
      return {
        "@type": "ListItem",
        "@id": `${id}#item-${position}`,
        position,
        name: item.name,
        item: {
          "@type": "WebPage",
          "@id": item.url,
          url: item.url,
          name: item.name,
        },
      }
    }),
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
