// app/sitemap.ts
import type { MetadataRoute } from "next"
import { getAllLocationSlugs } from "@/lib/locations"

// Optioneel: centraal beheer van je site-URL
const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") || "https://www.x3dprints.be"

  export const dynamic = "force-static"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Statische routes
  const staticRoutes: MetadataRoute.Sitemap = [
    "", "/services", "/materials", "/pricing", "/portfolio", "/about", "/contact",
  ].map((path) => ({
    url: `${BASE_URL}${path || "/"}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }))

  // Dynamische location-slugs
  const locationRoutes: MetadataRoute.Sitemap = getAllLocationSlugs().map((slug) => ({
    url: `${BASE_URL}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }))

  return [...staticRoutes, ...locationRoutes]
}
