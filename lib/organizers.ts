// lib/organizers.ts
import type { SchemaOfferInput } from "./seo"
import { buildOfferCatalog, buildServiceSchema, clampToWords } from "./seo"

export type OrganizerSlug = "modugrid" | "packout" | "tstak" | "custom"

export type OrganizerBundle = {
  slug: string
  name: string
  description: string
  idealFor: string[]
  priceFrom?: string
  perks?: string[]
}

export type OrganizerStep = { title: string; description: string }

export type OrganizerFaqItem = { q: string; a: string }

export type OrganizerPageContent = {
  slug: OrganizerSlug
  systemName: string
  heroTitle: string
  heroSubtitle: string
  intro: string
  summary: string
  pains: string[]
  steps: OrganizerStep[]
  bundles: OrganizerBundle[]
  priceCopy: string
  upsells: string[]
  proofPoints: string[]
  faq: OrganizerFaqItem[]
  seo: {
    title: string
    description: string
    canonical: string
    ogImage?: string
  }
}

export function organizerSlug(input: string): string {
  return input.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

export function buildOrganizerContactHref(
  slug: OrganizerSlug,
  bundleSlug?: string,
  locale: "nl" | "en" = "nl",
) {
  const basePath = locale === "en" ? "/en/contact" : "/contact"
  const bundlePart = bundleSlug ? `&bundle=${encodeURIComponent(bundleSlug)}` : ""
  return `${basePath}?material=${encodeURIComponent(slug)}${bundlePart}`
}

export function buildOrganizerSchemas(
  page: OrganizerPageContent,
  pageUrl: string,
): Record<"offerCatalog" | "service", unknown> {
  const offers: SchemaOfferInput[] = page.bundles.map((bundle) => ({
    serviceName: `${page.systemName} — ${bundle.name}`,
    price: bundle.priceFrom ? bundle.priceFrom.replace(/[^\d.,]/g, "").replace(",", ".") || "0" : "0",
    description: clampToWords(bundle.description, 120),
    url: pageUrl,
  }))

  return {
    offerCatalog: buildOfferCatalog(`${page.systemName} organizer sets`, offers),
    service: buildServiceSchema(`${page.systemName} organizers op maat`, offers, pageUrl),
  }
}
