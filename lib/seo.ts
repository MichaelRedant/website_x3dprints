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

type PostalAddressInput = Partial<{
  street: string
  locality: string
  region: string
  postalCode: string
  country: string
}>

type GeoCoordinatesInput = {
  latitude: number
  longitude: number
}

type OpeningHoursInput = {
  dayOfWeek: string[]
  opens: string
  closes: string
}

type LocalBusinessOfferInput = {
  serviceName: string
}

type LocalBusinessSchemaInput = {
  id?: string
  name?: string
  pageUrl?: string
  description?: string
  image?: string
  priceRange?: string
  areaServed?: string | string[]
  inLanguage?: string | string[]
  alternateName?: string | string[]
  offersName?: string
  offers?: SchemaOfferInput[]
  offerCatalog?: Record<string, unknown>
  includeContext?: boolean
  sameAs?: ReadonlyArray<string>
  telephone?: string
  address?: PostalAddressInput
  geo?: GeoCoordinatesInput
  hasMap?: string
  makesOffer?: LocalBusinessOfferInput[]
  parentOrganizationId?: string
  openingHoursSpecification?: OpeningHoursInput[]
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
  sameAs?: ReadonlyArray<string>
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

type OrganizationReferenceInput = {
  name?: string
  url?: string
  logoUrl?: string
  sameAs?: ReadonlyArray<string>
}

export function buildOrganizationReference(options: OrganizationReferenceInput = {}) {
  return {
    "@type": "Organization",
    name: options.name ?? SITE.name,
    url: options.url ?? SITE.url,
    logo: {
      "@type": "ImageObject",
      url: resolveSchemaUrl(options.logoUrl ?? SITE.ogImage),
    },
    ...(options.sameAs?.length ? { sameAs: options.sameAs } : {}),
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

function resolveSchemaUrl(input: string): string {
  if (!input) return input
  if (input.startsWith("http://") || input.startsWith("https://")) return input
  const normalized = input.startsWith("/") ? input : `/${input}`
  return `${SITE.url}${normalized}`
}

export function buildLocalBusinessSchema(options: LocalBusinessSchemaInput = {}) {
  const offerCatalog =
    options.offerCatalog ??
    (options.offers?.length
      ? buildOfferCatalog(options.offersName ?? "3D Print Services", options.offers)
      : undefined)

  const address = {
    street: options.address?.street ?? SITE.address.street,
    locality: options.address?.locality ?? SITE.address.locality,
    region: options.address?.region ?? SITE.address.region,
    postalCode: options.address?.postalCode ?? SITE.address.postalCode,
    country: options.address?.country ?? SITE.address.country,
  }

  const telephone = options.telephone ?? SITE.phone
  const openingHoursSpecification =
    options.openingHoursSpecification ?? [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "20:00",
      },
    ]

  const schema = {
    ...(options.includeContext === false ? {} : { "@context": "https://schema.org" }),
    "@type": "LocalBusiness",
    ...(options.id ? { "@id": options.id } : {}),
    name: options.name ?? SITE.name,
    url: options.pageUrl ?? SITE.url,
    description: options.description ?? SITE.description,
    inLanguage: options.inLanguage ?? inferLanguageFromUrl(options.pageUrl),
    alternateName: options.alternateName ?? ["X3DPrints", "X3DPrints (English)"],
    ...(telephone ? { telephone } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.locality,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    image: resolveSchemaUrl(options.image ?? SITE.ogImage),
    priceRange: options.priceRange ?? SITE.priceRange,
    areaServed: options.areaServed ?? "BE",
    ...(options.sameAs?.length ? { sameAs: options.sameAs } : {}),
    ...(offerCatalog ? { hasOfferCatalog: offerCatalog } : {}),
    ...(options.geo
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: options.geo.latitude,
            longitude: options.geo.longitude,
          },
        }
      : {}),
    ...(options.hasMap ? { hasMap: options.hasMap } : {}),
    ...(options.makesOffer?.length
      ? {
          makesOffer: options.makesOffer.map((offer) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: offer.serviceName,
            },
          })),
        }
      : {}),
    ...(options.parentOrganizationId ? { parentOrganization: { "@id": options.parentOrganizationId } } : {}),
    ...(openingHoursSpecification.length ? { openingHoursSpecification } : {}),
  }

  return schema
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

type ProductSchemaInput = {
  name: string
  description: string
  url: string
  image?: string | string[]
  sku?: string
  brandName?: string
  inLanguage?: string | string[]
  price: number
  priceCurrency?: string
  availability?: "InStock" | "PreOrder" | "OutOfStock" | "LimitedAvailability"
  priceValidUntil?: string
  leadTimeDays?: { min: number; max: number }
  shippingCountry?: string
}

export function buildProductSchema({
  name,
  description,
  url,
  image,
  sku,
  brandName,
  inLanguage,
  price,
  priceCurrency = "EUR",
  availability = "InStock",
  priceValidUntil,
  leadTimeDays,
  shippingCountry = "BE",
}: ProductSchemaInput) {
  const images = Array.isArray(image) ? image : image ? [image] : []
  const resolvedImages = images.map((img) => resolveSchemaUrl(img))
  const shippingDetails = leadTimeDays
    ? {
        "@type": "OfferShippingDetails",
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: shippingCountry,
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: leadTimeDays.min,
            maxValue: leadTimeDays.max,
            unitCode: "d",
          },
        },
      }
    : undefined

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    ...(sku ? { sku } : {}),
    ...(resolvedImages.length ? { image: resolvedImages } : {}),
    ...(inLanguage ? { inLanguage } : {}),
    brand: {
      "@type": "Brand",
      name: brandName ?? SITE.name,
    },
    offers: {
      "@type": "Offer",
      price: Number(price.toFixed(2)),
      priceCurrency,
      availability: `https://schema.org/${availability}`,
      url: resolveSchemaUrl(url),
      ...(priceValidUntil ? { priceValidUntil } : {}),
      ...(shippingDetails ? { shippingDetails } : {}),
      seller: {
        "@type": "Organization",
        name: SITE.name,
        url: SITE.url,
      },
    },
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
    `3D printen in ${city} via X3DPrints: prototypes en zowel kleine als grotere series in PLA, PETG of TPU. Snelle offerte, duidelijke planning en levering in Vlaanderen.`,
    165,
  )
}

/** City fallback when there is no custom metaDescription and md isn't helpful. */
export function buildCityMetaDescription(city: string): string {
  const msg = `3D printen in ${city} door X3DPrints: prototypes en zowel kleine als grotere series, strakke afwerking. Levertijd 2-5 werkdagen. Materialen: PLA, PETG, TPU. Vraag je offerte.`
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

type ImageObjectSchemaInput = {
  id?: string
  url: string
  caption: string
  description?: string
  inLanguage?: string | string[]
  creditText?: string
  creator?: Record<string, unknown>
  copyrightHolder?: Record<string, unknown>
  representativeOfPage?: boolean
}

export function buildImageObjectSchema(input: ImageObjectSchemaInput) {
  const absoluteUrl = resolveSchemaUrl(input.url)
  return {
    "@type": "ImageObject",
    ...(input.id ? { "@id": input.id } : {}),
    contentUrl: absoluteUrl,
    url: absoluteUrl,
    caption: input.caption,
    ...(input.description ? { description: input.description } : {}),
    ...(input.inLanguage ? { inLanguage: input.inLanguage } : {}),
    ...(input.creditText ? { creditText: input.creditText } : {}),
    ...(input.creator ? { creator: input.creator } : {}),
    ...(input.copyrightHolder ? { copyrightHolder: input.copyrightHolder } : {}),
    ...(typeof input.representativeOfPage === "boolean"
      ? { representativeOfPage: input.representativeOfPage }
      : {}),
  }
}

type ImageGallerySchemaInput = {
  name: string
  description: string
  url: string
  publisher?: Record<string, unknown>
  images: ReturnType<typeof buildImageObjectSchema>[]
  inLanguage?: string | string[]
}

export function buildImageGallerySchema({ name, description, url, publisher, images, inLanguage }: ImageGallerySchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name,
    description,
    url,
    ...(inLanguage ? { inLanguage } : {}),
    ...(publisher ? { publisher } : {}),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: images.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item,
      })),
    },
  }
}

type VideoObjectSchemaInput = {
  name: string
  description?: string
  thumbnailUrl: string
  embedUrl: string
}

export function buildVideoObjectSchema(input: VideoObjectSchemaInput) {
  return {
    "@type": "VideoObject",
    name: input.name,
    ...(input.description ? { description: input.description } : {}),
    thumbnailUrl: resolveSchemaUrl(input.thumbnailUrl),
    embedUrl: resolveSchemaUrl(input.embedUrl),
  }
}

type VideoCollectionSchemaInput = {
  name: string
  url: string
  publisher?: Record<string, unknown>
  videos: VideoObjectSchemaInput[]
  inLanguage?: string | string[]
}

export function buildVideoCollectionSchema({ name, url, publisher, videos, inLanguage }: VideoCollectionSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    url,
    ...(inLanguage ? { inLanguage } : {}),
    ...(publisher ? { publisher } : {}),
    hasPart: videos.map((video) => buildVideoObjectSchema(video)),
  }
}

type ItemListSchemaItemInput = {
  url: string
  name?: string
  description?: string
}

type ItemListSchemaInput = {
  name: string
  items: ItemListSchemaItemInput[]
  inLanguage?: string | string[]
}

export function buildItemListSchema({ name, items, inLanguage }: ItemListSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    ...(inLanguage ? { inLanguage } : {}),
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: resolveSchemaUrl(item.url),
      ...(item.name ? { name: item.name } : {}),
      ...(item.description ? { description: item.description } : {}),
    })),
  }
}

type BlogListEntryInput = {
  headline: string
  description: string
  url: string
  datePublished: string
  dateModified?: string
  inLanguage?: string | string[]
}

type BlogItemListSchemaInput = {
  name: string
  articles: BlogListEntryInput[]
  inLanguage?: string | string[]
}

export function buildBlogItemListSchema({ name, articles, inLanguage }: BlogItemListSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: articles.map((article, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Article",
        inLanguage: article.inLanguage ?? inLanguage ?? inferLanguageFromUrl(article.url),
        headline: article.headline,
        description: article.description,
        url: article.url,
        datePublished: article.datePublished,
        dateModified: article.dateModified ?? article.datePublished,
      },
    })),
  }
}

type BlogSchemaInput = {
  name: string
  url: string
  posts: BlogListEntryInput[]
  inLanguage?: string | string[]
}

export function buildBlogSchema({ name, url, posts, inLanguage }: BlogSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name,
    url,
    inLanguage: inLanguage ?? inferLanguageFromUrl(url),
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.headline,
      description: post.description,
      url: post.url,
      datePublished: post.datePublished,
      dateModified: post.dateModified ?? post.datePublished,
    })),
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
