import type { Locale } from "@/lib/i18n/locales"
import { SHOP_INDEXABLE } from "@/content/shop-products"

export type RelatedLink = {
  label: string
  href: string
}

export type RelatedLinksPageType =
  | "default"
  | "blog"
  | "shop"
  | "services"
  | "materials"
  | "pricing"
  | "contact"
  | "portfolio"
  | "segments"
  | "cases"
  | "material-detail"

type LocaleLinks = Record<Locale, RelatedLink[]>

type RelatedLinksConfig = {
  primary: LocaleLinks
  secondary: LocaleLinks
}

const RELATED_LINKS_BY_PAGE_TYPE: Record<RelatedLinksPageType, RelatedLinksConfig> = {
  default: {
    primary: {
      nl: [
        { label: "3D print service", href: "/services" },
        { label: "Materialen & richtlijnen", href: "/materials" },
        { label: "Prijzen & calculator", href: "/pricing" },
      ],
      en: [
        { label: "3D print service", href: "/services" },
        { label: "Materials and guidelines", href: "/materials" },
        { label: "Pricing and calculator", href: "/pricing" },
      ],
    },
    secondary: {
      nl: [
        { label: "Segmenten & cases", href: "/segments" },
        { label: "Portfolio", href: "/portfolio" },
        ...(SHOP_INDEXABLE ? [{ label: "Shop & voorraaditems", href: "/shop" }] : []),
        { label: "Offerte aanvragen", href: "/contact" },
      ],
      en: [
        { label: "Segments & cases", href: "/segments" },
        { label: "Portfolio", href: "/portfolio" },
        ...(SHOP_INDEXABLE ? [{ label: "Shop & stocked items", href: "/shop" }] : []),
        { label: "Request a quote", href: "/contact" },
      ],
    },
  },
  blog: {
    primary: {
      nl: [
        { label: "Materialen & richtlijnen", href: "/materials" },
        { label: "Prijzen & calculator", href: "/pricing" },
        ...(SHOP_INDEXABLE ? [{ label: "Shop & voorraaditems", href: "/shop" }] : []),
        { label: "Offerte aanvragen", href: "/contact" },
      ],
      en: [
        { label: "Materials and guidelines", href: "/materials" },
        { label: "Pricing and calculator", href: "/pricing" },
        ...(SHOP_INDEXABLE ? [{ label: "Shop & stocked items", href: "/shop" }] : []),
        { label: "Request a quote", href: "/contact" },
      ],
    },
    secondary: {
      nl: [
        { label: "3D print service", href: "/services" },
        { label: "Segmenten & cases", href: "/segments" },
        { label: "3D modellen vinden", href: "/3d-modellen-vinden" },
      ],
      en: [
        { label: "3D print service", href: "/services" },
        { label: "Segments & cases", href: "/segments" },
        { label: "Find 3D models", href: "/3d-modellen-vinden" },
      ],
    },
  },
  shop: {
    primary: {
      nl: [
        { label: "Materialen & richtlijnen", href: "/materials" },
        { label: "Prijzen & calculator", href: "/pricing" },
        { label: "Offerte aanvragen", href: "/contact" },
      ],
      en: [
        { label: "Materials and guidelines", href: "/materials" },
        { label: "Pricing and calculator", href: "/pricing" },
        { label: "Request a quote", href: "/contact" },
      ],
    },
    secondary: {
      nl: [
        { label: "3D print service", href: "/services" },
        { label: "Portfolio", href: "/portfolio" },
        { label: "Segmenten & cases", href: "/segments" },
      ],
      en: [
        { label: "3D print service", href: "/services" },
        { label: "Portfolio", href: "/portfolio" },
        { label: "Segments & cases", href: "/segments" },
      ],
    },
  },
  services: {
    primary: {
      nl: [
        { label: "Materialen & richtlijnen", href: "/materials" },
        { label: "Prijzen & calculator", href: "/pricing" },
        { label: "Offerte aanvragen", href: "/contact" },
      ],
      en: [
        { label: "Materials and guidelines", href: "/materials" },
        { label: "Pricing and calculator", href: "/pricing" },
        { label: "Request a quote", href: "/contact" },
      ],
    },
    secondary: {
      nl: [
        { label: "Portfolio", href: "/portfolio" },
        { label: "Segmenten & cases", href: "/segments" },
        ...(SHOP_INDEXABLE ? [{ label: "Shop & voorraaditems", href: "/shop" }] : []),
        { label: "Material Suggestion Tool", href: "/materials#material-suggestion-tool" },
      ],
      en: [
        { label: "Portfolio", href: "/portfolio" },
        { label: "Segments & cases", href: "/segments" },
        ...(SHOP_INDEXABLE ? [{ label: "Shop & stocked items", href: "/shop" }] : []),
        { label: "Material Suggestion Tool", href: "/materials#material-suggestion-tool" },
      ],
    },
  },
  materials: {
    primary: {
      nl: [
        { label: "3D print service", href: "/services" },
        { label: "Prijzen & calculator", href: "/pricing" },
        { label: "Offerte aanvragen", href: "/contact" },
      ],
      en: [
        { label: "3D print service", href: "/services" },
        { label: "Pricing and calculator", href: "/pricing" },
        { label: "Request a quote", href: "/contact" },
      ],
    },
    secondary: {
      nl: [
        { label: "Portfolio", href: "/portfolio" },
        { label: "Segmenten & cases", href: "/segments" },
        ...(SHOP_INDEXABLE ? [{ label: "Shop & voorraaditems", href: "/shop" }] : []),
        { label: "3D modellen vinden", href: "/3d-modellen-vinden" },
      ],
      en: [
        { label: "Portfolio", href: "/portfolio" },
        { label: "Segments & cases", href: "/segments" },
        ...(SHOP_INDEXABLE ? [{ label: "Shop & stocked items", href: "/shop" }] : []),
        { label: "Find 3D models", href: "/3d-modellen-vinden" },
      ],
    },
  },
  "material-detail": {
    primary: {
      nl: [
        { label: "Alle materialen", href: "/materials" },
        { label: "Prijzen & calculator", href: "/pricing" },
        { label: "Offerte aanvragen", href: "/contact" },
      ],
      en: [
        { label: "All materials", href: "/materials" },
        { label: "Pricing and calculator", href: "/pricing" },
        { label: "Request a quote", href: "/contact" },
      ],
    },
    secondary: {
      nl: [
        { label: "3D print service", href: "/services" },
        { label: "Portfolio", href: "/portfolio" },
        { label: "Material Suggestion Tool", href: "/materials#material-suggestion-tool" },
      ],
      en: [
        { label: "3D print service", href: "/services" },
        { label: "Portfolio", href: "/portfolio" },
        { label: "Material Suggestion Tool", href: "/materials#material-suggestion-tool" },
      ],
    },
  },
  pricing: {
    primary: {
      nl: [
        { label: "Materialen & richtlijnen", href: "/materials" },
        { label: "3D print service", href: "/services" },
        { label: "Offerte aanvragen", href: "/contact" },
      ],
      en: [
        { label: "Materials and guidelines", href: "/materials" },
        { label: "3D print service", href: "/services" },
        { label: "Request a quote", href: "/contact" },
      ],
    },
    secondary: {
      nl: [
        { label: "Portfolio", href: "/portfolio" },
        { label: "Segmenten & cases", href: "/segments" },
        ...(SHOP_INDEXABLE ? [{ label: "Shop & voorraaditems", href: "/shop" }] : []),
        { label: "Material Suggestion Tool", href: "/materials#material-suggestion-tool" },
      ],
      en: [
        { label: "Portfolio", href: "/portfolio" },
        { label: "Segments & cases", href: "/segments" },
        ...(SHOP_INDEXABLE ? [{ label: "Shop & stocked items", href: "/shop" }] : []),
        { label: "Material Suggestion Tool", href: "/materials#material-suggestion-tool" },
      ],
    },
  },
  contact: {
    primary: {
      nl: [
        { label: "3D print service", href: "/services" },
        { label: "Materialen & richtlijnen", href: "/materials" },
        { label: "Prijzen & calculator", href: "/pricing" },
      ],
      en: [
        { label: "3D print service", href: "/services" },
        { label: "Materials and guidelines", href: "/materials" },
        { label: "Pricing and calculator", href: "/pricing" },
      ],
    },
    secondary: {
      nl: [
        { label: "Portfolio", href: "/portfolio" },
        { label: "Segmenten & cases", href: "/segments" },
        ...(SHOP_INDEXABLE ? [{ label: "Shop & voorraaditems", href: "/shop" }] : []),
        { label: "Blog & kennisbank", href: "/blog" },
      ],
      en: [
        { label: "Portfolio", href: "/portfolio" },
        { label: "Segments & cases", href: "/segments" },
        ...(SHOP_INDEXABLE ? [{ label: "Shop & stocked items", href: "/shop" }] : []),
        { label: "Blog & knowledge base", href: "/blog" },
      ],
    },
  },
  portfolio: {
    primary: {
      nl: [
        { label: "Materialen & richtlijnen", href: "/materials" },
        { label: "Prijzen & calculator", href: "/pricing" },
        { label: "3D print service", href: "/services" },
      ],
      en: [
        { label: "Materials and guidelines", href: "/materials" },
        { label: "Pricing and calculator", href: "/pricing" },
        { label: "3D print service", href: "/services" },
      ],
    },
    secondary: {
      nl: [
        { label: "Segmenten & cases", href: "/segments" },
        ...(SHOP_INDEXABLE ? [{ label: "Shop & voorraaditems", href: "/shop" }] : []),
        { label: "3D viewer", href: "/viewer" },
        { label: "Offerte aanvragen", href: "/contact" },
      ],
      en: [
        { label: "Segments & cases", href: "/segments" },
        ...(SHOP_INDEXABLE ? [{ label: "Shop & stocked items", href: "/shop" }] : []),
        { label: "3D viewer", href: "/viewer" },
        { label: "Request a quote", href: "/contact" },
      ],
    },
  },
  segments: {
    primary: {
      nl: [
        { label: "3D print service", href: "/services" },
        { label: "Materialen & richtlijnen", href: "/materials" },
        { label: "Offerte aanvragen", href: "/contact" },
      ],
      en: [
        { label: "3D print service", href: "/services" },
        { label: "Materials and guidelines", href: "/materials" },
        { label: "Request a quote", href: "/contact" },
      ],
    },
    secondary: {
      nl: [
        { label: "Portfolio", href: "/portfolio" },
        { label: "Prijs per stuk gids", href: "/blog/3d-print-prijs-per-stuk" },
        { label: "Ontwerp checklist", href: "/blog/3d-print-ontwerp-checklist" },
        { label: "Prijzen & calculator", href: "/pricing" },
      ],
      en: [
        { label: "Portfolio", href: "/portfolio" },
        { label: "3D printing cost guide", href: "/blog/hoeveel-kost-3d-printen" },
        { label: "Design for 3D printing", href: "/blog/ontwerp-3d-printbaar-model" },
        { label: "Pricing and calculator", href: "/pricing" },
      ],
    },
  },
  cases: {
    primary: {
      nl: [
        { label: "Offerte aanvragen", href: "/contact" },
        { label: "Prijzen & calculator", href: "/pricing" },
        { label: "Materialen & richtlijnen", href: "/materials" },
      ],
      en: [
        { label: "Request a quote", href: "/contact" },
        { label: "Pricing and calculator", href: "/pricing" },
        { label: "Materials and guidelines", href: "/materials" },
      ],
    },
    secondary: {
      nl: [
        { label: "3D print service", href: "/services" },
        { label: "Segmenten", href: "/segments" },
        { label: "Blog & kennisbank", href: "/blog" },
      ],
      en: [
        { label: "3D print service", href: "/services" },
        { label: "Segments", href: "/segments" },
        { label: "Blog and knowledge base", href: "/blog" },
      ],
    },
  },
}

export function getRelatedLinks(
  pageType: RelatedLinksPageType,
  locale: Locale,
) {
  const config = RELATED_LINKS_BY_PAGE_TYPE[pageType] ?? RELATED_LINKS_BY_PAGE_TYPE.default
  return {
    primary: config.primary[locale],
    secondary: config.secondary[locale],
  }
}
