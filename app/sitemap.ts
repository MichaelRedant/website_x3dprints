// app/sitemap.ts
import type { MetadataRoute } from "next"
import { SITE } from "@/lib/seo"
import { getAllLocationSlugs } from "@/lib/locations"

const BASE_URL = SITE.url.replace(/\/+$/, "") // https://www.x3dprints.be

export const dynamic = "force-static"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Statische routes – met passende changeFrequency
  const staticRoutes = [
    { path: "/",                changeFrequency: "weekly"  as const, priority: 0.8 },
    { path: "/services",        changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/materials",       changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/pricing",         changeFrequency: "weekly"  as const, priority: 0.8 },
    { path: "/portfolio",       changeFrequency: "weekly"  as const, priority: 0.8 },
    { path: "/viewer",          changeFrequency: "weekly"  as const, priority: 0.7 },
    { path: "/about",           changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/contact",         changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/faq",             changeFrequency: "monthly" as const, priority: 0.6 },
  ].map(({ path, changeFrequency, priority }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }))

  // Dynamische location-slugs
  const locationRoutes = getAllLocationSlugs().map((slug) => ({
    url: `${BASE_URL}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...locationRoutes]
}
