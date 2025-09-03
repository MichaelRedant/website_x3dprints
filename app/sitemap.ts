// app/sitemap.ts
import type { MetadataRoute } from "next"
import { stat } from "fs/promises"
import { join } from "path"
import { getAllLocationSlugs } from "@/lib/locations"

export const revalidate = 60 * 60 // 1u cache

const BASE_URL = "https://www.x3dprints.be"

async function mtimeForSlug(slug: string): Promise<Date> {
  try {
    const f = await stat(
      join(process.cwd(), "content", "locations", `${slug}.md`)
    )
    return f.mtime
  } catch {
    // Geen file gevonden? Zet naar nu.
    return new Date()
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = [
    "/", "/services", "/materials", "/pricing",
    "/portfolio", "/about", "/contact", "/privacy"
  ]

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    url: `${BASE_URL}${p}`,
    changeFrequency: "weekly",
    priority: p === "/" ? 1 : 0.6,
    lastModified: new Date(),
  }))

  const slugs = getAllLocationSlugs()
  const dynamicEntries: MetadataRoute.Sitemap = await Promise.all(
    slugs.map(async (slug) => ({
      url: `${BASE_URL}/${slug}`,
      changeFrequency: "weekly",
      priority: 0.8,
      lastModified: await mtimeForSlug(slug),
    }))
  )

  return [...staticEntries, ...dynamicEntries]
}
