// app/sitemap.ts
import type { MetadataRoute } from "next"
import { SITE } from "@/lib/seo"
import { getAllLocationSlugs } from "@/lib/locations"
import { MATERIAL_DETAIL_SLUGS } from "@/content/material-details"

const BASE_URL = SITE.url.replace(/\/+$/, "") // https://www.x3dprints.be

export const dynamic = "force-static"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Statische routes - met passende changeFrequency
  const staticRoutes = [
    { path: "/",                  changeFrequency: "weekly"  as const, priority: 0.8 },
    { path: "/en",                changeFrequency: "weekly"  as const, priority: 0.8 },
    { path: "/3d-printen",        changeFrequency: "weekly"  as const, priority: 0.8 },
    { path: "/en/3d-printen",     changeFrequency: "weekly"  as const, priority: 0.8 },
    { path: "/services",          changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/en/services",       changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/materials",         changeFrequency: "weekly"  as const, priority: 0.8 },
    { path: "/en/materials",      changeFrequency: "weekly"  as const, priority: 0.8 },
    { path: "/pricing",           changeFrequency: "weekly"  as const, priority: 0.8 },
    { path: "/en/pricing",        changeFrequency: "weekly"  as const, priority: 0.8 },
    { path: "/portfolio",         changeFrequency: "weekly"  as const, priority: 0.8 },
    { path: "/en/portfolio",      changeFrequency: "weekly"  as const, priority: 0.8 },
    { path: "/valentijn-3d-printen", changeFrequency: "weekly" as const, priority: 0.7 },
    { path: "/en/valentijn-3d-printen", changeFrequency: "weekly" as const, priority: 0.7 },
    { path: "/segments",          changeFrequency: "weekly"  as const, priority: 0.7 },
    { path: "/en/segments",       changeFrequency: "weekly"  as const, priority: 0.7 },
    { path: "/blog",              changeFrequency: "weekly"  as const, priority: 0.7 },
    { path: "/en/blog",           changeFrequency: "weekly"  as const, priority: 0.7 },
    { path: "/viewer",            changeFrequency: "weekly"  as const, priority: 0.7 },
    { path: "/en/viewer",         changeFrequency: "weekly"  as const, priority: 0.7 },
    { path: "/3d-modelleren",     changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/en/3d-modelleren",  changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/lokaal-belgisch",   changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/en/lokaal-belgisch", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/about",             changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/en/about",          changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/sustainability",    changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/en/sustainability", changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/3d-modellen-vinden", changeFrequency: "weekly" as const, priority: 0.7 },
    { path: "/en/3d-modellen-vinden", changeFrequency: "weekly" as const, priority: 0.7 },
    { path: "/contact",           changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/en/contact",        changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/faq",               changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/en/faq",            changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/locaties",          changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/privacy",           changeFrequency: "yearly" as const, priority: 0.4 },
    { path: "/en/privacy",        changeFrequency: "yearly" as const, priority: 0.4 },
    { path: "/cookies",           changeFrequency: "yearly" as const, priority: 0.4 },
    { path: "/en/cookies",        changeFrequency: "yearly" as const, priority: 0.4 },
    { path: "/algemene-voorwaarden", changeFrequency: "yearly" as const, priority: 0.4 },
    { path: "/en/algemene-voorwaarden", changeFrequency: "yearly" as const, priority: 0.4 },
  ].map(({ path, changeFrequency, priority }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }))

  const blogPostSlugs = [
    "3d-geprinte-platen-nasiam",
    "3d-printen-herfst-halloween",
    "3d-printen-in-de-buurt",
    "3d-printen-back-to-school",
    "3d-printen-lente-pasen",
    "3d-printen-mini-figuren",
    "3d-printen-op-bestelling",
    "3d-printen-valentijn",
    "relatiegeschenken-3d-printen",
    "3d-printen-vaderdag-moederdag",
    "3d-printen-voor-beginners",
    "3d-printen-winter-kerst-nieuwjaar",
    "3d-printen-zomer",
    "3d-printing-marketing-events",
    "octopus-accountancy-3d-print-goodies",
    "bestanden-voor-3d-printen",
    "beste-instellingen-bambu-printer",
    "filament-vrijdag-pla",
    "filament-vrijdag-petg",
    "filament-vrijdag-tpu",
    "filament-vrijdag-pla-wood",
    "filament-vrijdag-pla-marble",
    "filament-vrijdag-pla-glow",
    "filament-vrijdag-pla-metal",
    "filament-vrijdag-pla-silk-plus",
    "filament-vrijdag-pc",
    "finishing-friday-schuren-primen-lakken",
    "juiste-3d-print-materiaal",
    "hoe-3d-print-je-onderdelen-voor-buitengebruik",
    "hoe-lang-duurt-3d-printen",
    "hoeveel-kost-3d-printen",
    "maker-monday-fdm-scharnieren",
    "maker-monday-wanddiktes-ribs",
    "maker-monday-toleranties-3d-printen",
    "maker-monday-snapfits",
    "maker-monday-snapfit-parts",
    "maker-monday-schroefdraad-inserts",
    "maker-monday-schroefdraad-bevestigingen",
    "maker-monday-warping-layer-cracks",
    "ontwerp-3d-printbaar-model",
    "pla-vs-petg",
    "use-cases-tpu",
    "use-case-dinsdag-auto-fiets",
    "use-case-dinsdag-events",
    "use-case-dinsdag-interieur",
    "use-case-dinsdag-productontwikkeling",
    "use-case-dinsdag-retail-displays",
    "use-case-dinsdag-scholen",
    "use-case-dinsdag-stem",
    "use-case-dinsdag-tabletop",
  ]

  const enBlogPostSlugs = [
    "octopus-accountancy-3d-print-goodies",
    "hoeveel-kost-3d-printen",
    "hoe-lang-duurt-3d-printen",
    "pla-vs-petg",
    "3d-printen-in-de-buurt",
    "3d-printen-voor-beginners",
    "bestanden-voor-3d-printen",
    "hoe-3d-print-je-onderdelen-voor-buitengebruik",
    "juiste-3d-print-materiaal",
    "3d-printen-op-bestelling",
    "ontwerp-3d-printbaar-model",
    "use-cases-tpu",
    "filament-vrijdag-tpu",
    "filament-vrijdag-pla",
    "filament-vrijdag-petg",
    "filament-vrijdag-pla-wood",
    "filament-vrijdag-pla-marble",
    "filament-vrijdag-pla-glow",
    "filament-vrijdag-pla-metal",
    "filament-vrijdag-pla-silk-plus",
    "filament-vrijdag-pc",
    "finishing-friday-schuren-primen-lakken",
    "maker-monday-fdm-scharnieren",
    "maker-monday-wanddiktes-ribs",
    "maker-monday-toleranties-3d-printen",
    "maker-monday-snapfits",
    "maker-monday-snapfit-parts",
    "maker-monday-schroefdraad-inserts",
    "maker-monday-schroefdraad-bevestigingen",
    "maker-monday-warping-layer-cracks",
    "3d-printen-valentijn",
    "3d-printen-back-to-school",
    "3d-printen-zomer",
    "3d-printing-marketing-events",
    "3d-printen-herfst-halloween",
    "3d-printen-lente-pasen",
    "3d-printen-mini-figuren",
    "3d-printen-vaderdag-moederdag",
    "3d-printen-winter-kerst-nieuwjaar",
    "3d-geprinte-platen-nasiam",
    "use-case-dinsdag-auto-fiets",
    "use-case-dinsdag-events",
    "use-case-dinsdag-interieur",
    "use-case-dinsdag-productontwikkeling",
    "use-case-dinsdag-retail-displays",
    "use-case-dinsdag-scholen",
    "use-case-dinsdag-stem",
    "use-case-dinsdag-tabletop",
  ]

  const segmentSlugs = [
    "3d-printing-prototypes",
    "3d-printing-scholen",
    "3d-printing-modelbouwers",
    "3d-printing-engineers",
    "3d-printing-marketing",
    "3d-printing-makers",
    "3d-printing-tabletop",
    "3d-printing-back-to-school",
    "3d-printing-vaderdag-moederdag",
    "3d-printing-valentijn",
    "3d-printing-seasonal",
  ]

  const blogRoutes = blogPostSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  const enBlogRoutes = enBlogPostSlugs.map((slug) => ({
    url: `${BASE_URL}/en/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  const segmentRoutes = segmentSlugs.map((slug) => ({
    url: `${BASE_URL}/segments/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  const materialDetailRoutes = MATERIAL_DETAIL_SLUGS.map((slug) => ({
    url: `${BASE_URL}/materials/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  const enMaterialDetailRoutes = MATERIAL_DETAIL_SLUGS.map((slug) => ({
    url: `${BASE_URL}/en/materials/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  // Dynamische location-slugs
  const locationRoutes = getAllLocationSlugs().map((slug) => ({
    url: `${BASE_URL}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  return [
    ...staticRoutes,
    ...blogRoutes,
    ...enBlogRoutes,
    ...segmentRoutes,
    ...materialDetailRoutes,
    ...enMaterialDetailRoutes,
    ...locationRoutes,
  ]
}
