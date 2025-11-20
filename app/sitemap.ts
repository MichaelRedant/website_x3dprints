// app/sitemap.ts
import type { MetadataRoute } from "next"
import { SITE } from "@/lib/seo"
import { getAllLocationSlugs } from "@/lib/locations"
import { MATERIAL_DETAIL_SLUGS } from "@/content/material-details"

const BASE_URL = SITE.url.replace(/\/+$/, "") // https://www.x3dprints.be

export const dynamic = "force-static"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Statische routes – met passende changeFrequency
  const staticRoutes = [
    { path: "/",                  changeFrequency: "weekly"  as const, priority: 0.8 },
    { path: "/services",          changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/materials",         changeFrequency: "weekly"  as const, priority: 0.8 },
    { path: "/pricing",           changeFrequency: "weekly"  as const, priority: 0.8 },
    { path: "/portfolio",         changeFrequency: "weekly"  as const, priority: 0.8 },
    { path: "/segments",          changeFrequency: "weekly"  as const, priority: 0.7 },
    { path: "/blog",              changeFrequency: "weekly"  as const, priority: 0.7 },
    { path: "/viewer",            changeFrequency: "weekly"  as const, priority: 0.7 },
    { path: "/3d-modelleren",     changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/about",             changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/contact",           changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/faq",               changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/locaties",          changeFrequency: "monthly" as const, priority: 0.6 },
  ].map(({ path, changeFrequency, priority }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }))

  const blogPostSlugs = [
    "hoeveel-kost-3d-printen",
    "pla-vs-petg",
    "beste-instellingen-bambu-printer",
    "ontwerp-3d-printbaar-model",
    "3d-printen-voor-beginners",
    "3d-printen-in-de-buurt",
    "3d-printen-op-bestelling",
    "bestanden-voor-3d-printen",
    "hoe-lang-duurt-3d-printen",
    "3d-printing-marketing-events",
  ]

  const segmentSlugs = [
    "3d-printing-prototypes",
    "3d-printing-scholen",
    "3d-printing-modelbouwers",
    "3d-printing-engineers",
    "3d-printing-marketing",
    "3d-printing-makers",
  ]

  const blogRoutes = blogPostSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
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
    ...segmentRoutes,
    ...materialDetailRoutes,
    ...locationRoutes,
  ]
}
