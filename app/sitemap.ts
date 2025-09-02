import { MetadataRoute } from "next"
import { getAllLocationSlugs } from "@/lib/locations"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.x3dprints.be"
  const routes = [
    "",
    "/services",
    "/materials",
    "/portfolio",
    "/pricing",
    "/contact",
    "/privacy",
    "/algemene-voorwaarden",
    ...getAllLocationSlugs().map((s) => `/${s}`),
  ]
  const now = new Date()
  return routes.map((r) => ({
    url: `${base}${r || "/"}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: r === "" ? 1 : 0.7,
  }))
}
