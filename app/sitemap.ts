// app/sitemap.ts
import type { MetadataRoute } from "next"
import { promises as fs } from "fs"
import type { Stats } from "fs"
import path from "path"
import { SITE } from "@/lib/seo"
import { EN_LOCATION_SLUGS, getAllLocationSlugs } from "@/lib/locations"
import { MATERIAL_DETAIL_SLUGS } from "@/content/material-details"
import { SHOP_INDEXABLE, SHOP_PRODUCT_SLUGS } from "@/content/shop-products"
import { getLiveCaseDetailRoutes } from "@/content/case-studies"

const BASE_URL = SITE.url.replace(/\/+$/, "") // https://www.x3dprints.be
const ROOT = process.cwd()

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>

type StaticRouteConfig = {
  nl: string
  en?: string
  changeFrequency: ChangeFrequency
  priority: number
  sources?: string[]
}

async function statIfExists(target: string) {
  try {
    const fullPath = path.isAbsolute(target) ? target : path.join(ROOT, target)
    return await fs.stat(fullPath)
  } catch {
    return null
  }
}

async function readDateModified(target: string): Promise<Date | null> {
  try {
    const fullPath = path.isAbsolute(target) ? target : path.join(ROOT, target)
    const content = await fs.readFile(fullPath, "utf8")
    const match = content.match(/const\s+(?:DATE_MODIFIED|dateModified)\s*=\s*["']([^"']+)["']/)
    if (!match) return null
    const parsed = new Date(match[1])
    if (Number.isNaN(parsed.getTime())) return null
    return parsed
  } catch {
    return null
  }
}

async function latestDateModified(paths: string[]): Promise<Date | null> {
  const dates = await Promise.all(paths.map(readDateModified))
  const times = dates.filter(Boolean).map((d) => (d as Date).getTime())
  if (!times.length) return null
  return new Date(Math.max(...times))
}

async function latestMtime(paths: string[]): Promise<Date | null> {
  const stats = await Promise.all(paths.map(statIfExists))
  const mtimes = stats.filter(Boolean).map((s) => (s as Stats).mtime.getTime())
  if (!mtimes.length) return null
  return new Date(Math.max(...mtimes))
}

function withTrailingSlash(target: string) {
  if (target === "/") return target
  return target.endsWith("/") ? target : `${target}/`
}

function buildAlternates(nlPath?: string, enPath?: string) {
  if (!nlPath || !enPath) return undefined
  const nl = withTrailingSlash(nlPath)
  const en = withTrailingSlash(enPath)
  return {
    languages: {
      "nl-BE": `${BASE_URL}${nl}`,
      "en-BE": `${BASE_URL}${en}`,
      "x-default": `${BASE_URL}${nl}`,
    },
  }
}

async function toRouteEntries(config: StaticRouteConfig): Promise<MetadataRoute.Sitemap> {
  const lastModified =
    (config.sources && config.sources.length ? await latestMtime(config.sources) : null) ??
    new Date()
  const alternates = buildAlternates(config.nl, config.en)

  const baseEntry = {
    changeFrequency: config.changeFrequency,
    priority: config.priority,
    lastModified,
    ...(alternates ? { alternates } : {}),
  }

  const entries: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}${withTrailingSlash(config.nl)}`, ...baseEntry },
  ]

  if (config.en) {
    entries.push({
      url: `${BASE_URL}${withTrailingSlash(config.en)}`,
      ...baseEntry,
    })
  }

  return entries
}

async function getBlogSlugs(locale: "nl" | "en") {
  const dir = locale === "nl" ? "app/(pages)/blog" : "app/en/(pages)/blog"
  try {
    const entries = await fs.readdir(path.join(ROOT, dir), { withFileTypes: true })
    return entries.filter((e) => e.isDirectory()).map((e) => e.name)
  } catch {
    return []
  }
}

async function getSegmentSlugs() {
  try {
    const entries = await fs.readdir(path.join(ROOT, "app/segments"), { withFileTypes: true })
    return entries.filter((e) => e.isDirectory()).map((e) => e.name)
  } catch {
    return []
  }
}

async function getLocationMtime(slug: string) {
  const candidates = [
    `content/locations/${slug}.md`,
    `content/en/locations/${slug}.md`,
    "lib/locations.ts",
    "app/(pages)/[slug]/page.tsx",
    "app/en/(pages)/[slug]/page.tsx",
  ]
  return (await latestMtime(candidates)) ?? new Date()
}

export const dynamic = "force-static"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const shopRouteConfigs: StaticRouteConfig[] = SHOP_INDEXABLE
    ? [
        {
          nl: "/shop",
          en: "/en/shop",
          changeFrequency: "weekly",
          priority: 0.7,
          sources: ["app/(pages)/shop/page.tsx", "app/en/(pages)/shop/page.tsx", "content/shop-products.ts"],
        },
      ]
    : []

  const staticRouteConfigs: StaticRouteConfig[] = [
    { nl: "/", en: "/en/", changeFrequency: "weekly", priority: 0.8, sources: ["app/(home)/page.tsx", "app/en/(home)/page.tsx"] },
    { nl: "/3d-printen", en: "/en/3d-printen", changeFrequency: "weekly", priority: 0.8, sources: ["app/(pages)/3d-printen/page.tsx", "app/en/(pages)/3d-printen/page.tsx"] },
    { nl: "/services/", en: "/en/services/", changeFrequency: "monthly", priority: 0.95, sources: ["app/(pages)/services/page.tsx", "app/en/(pages)/services/page.tsx"] },
    { nl: "/materials/", en: "/en/materials/", changeFrequency: "weekly", priority: 0.95, sources: ["app/(pages)/materials/page.tsx", "app/en/(pages)/materials/page.tsx"] },
    {
      nl: "/organizers/",
      en: "/en/organizers/",
      changeFrequency: "weekly",
      priority: 0.95,
      sources: [
        "app/(pages)/organizers/page.tsx",
        "app/en/(pages)/organizers/page.tsx",
        "content/organizer-details.ts",
        "components/OrganizerBundles.tsx",
      ],
    },
    {
      nl: "/organizers/modugrid",
      en: "/en/organizers/modugrid",
      changeFrequency: "monthly",
      priority: 0.85,
      sources: [
        "app/(pages)/organizers/modugrid/page.tsx",
        "content/organizer-details.ts",
      ],
    },
    {
      nl: "/organizers/packout",
      en: "/en/organizers/packout",
      changeFrequency: "monthly",
      priority: 0.85,
      sources: [
        "app/(pages)/organizers/packout/page.tsx",
        "content/organizer-details.ts",
      ],
    },
    {
      nl: "/organizers/tstak",
      en: "/en/organizers/tstak",
      changeFrequency: "monthly",
      priority: 0.85,
      sources: [
        "app/(pages)/organizers/tstak/page.tsx",
        "content/organizer-details.ts",
      ],
    },
    {
      nl: "/organizers/custom",
      en: "/en/organizers/custom",
      changeFrequency: "monthly",
      priority: 0.85,
      sources: [
        "app/(pages)/organizers/custom/page.tsx",
        "content/organizer-details.ts",
      ],
    },
    { nl: "/pricing/", en: "/en/pricing/", changeFrequency: "weekly", priority: 0.95, sources: ["app/(pages)/pricing/page.tsx", "app/en/(pages)/pricing/page.tsx"] },
    { nl: "/portfolio/", en: "/en/portfolio/", changeFrequency: "weekly", priority: 0.95, sources: ["app/(pages)/portfolio/page.tsx", "app/en/(pages)/portfolio/page.tsx"] },
    { nl: "/valentijn-3d-printen", en: "/en/valentijn-3d-printen", changeFrequency: "weekly", priority: 0.7, sources: ["app/(pages)/valentijn-3d-printen/page.tsx", "app/en/(pages)/valentijn-3d-printen/page.tsx"] },
    { nl: "/segments", en: "/en/segments", changeFrequency: "weekly", priority: 0.7, sources: ["app/(pages)/segments/page.tsx", "app/en/(pages)/segments/page.tsx"] },
    { nl: "/cases", en: "/en/cases", changeFrequency: "weekly", priority: 0.7, sources: ["app/(pages)/cases/page.tsx", "app/en/(pages)/cases/page.tsx"] },
    { nl: "/blog/", en: "/en/blog/", changeFrequency: "weekly", priority: 0.7, sources: ["app/(pages)/blog/page.tsx", "app/en/(pages)/blog/page.tsx"] },
    { nl: "/viewer", en: "/en/viewer", changeFrequency: "weekly", priority: 0.7, sources: ["app/(pages)/viewer/page.tsx", "app/en/(pages)/viewer/page.tsx"] },
    { nl: "/3d-modelleren", en: "/en/3d-modelleren", changeFrequency: "monthly", priority: 0.6, sources: ["app/(pages)/3d-modelleren/page.tsx", "app/en/(pages)/3d-modelleren/page.tsx"] },
    { nl: "/lokaal-belgisch", en: "/en/lokaal-belgisch", changeFrequency: "monthly", priority: 0.7, sources: ["app/(pages)/lokaal-belgisch/page.tsx", "app/en/(pages)/lokaal-belgisch/page.tsx"] },
    { nl: "/about", en: "/en/about", changeFrequency: "monthly", priority: 0.6, sources: ["app/(pages)/about/page.tsx", "app/en/(pages)/about/page.tsx"] },
    { nl: "/sustainability", en: "/en/sustainability", changeFrequency: "monthly", priority: 0.6, sources: ["app/(pages)/sustainability/page.tsx", "app/en/(pages)/sustainability/page.tsx"] },
    { nl: "/3d-modellen-vinden", en: "/en/3d-modellen-vinden", changeFrequency: "weekly", priority: 0.7, sources: ["app/(pages)/3d-modellen-vinden/page.tsx", "app/en/(pages)/3d-modellen-vinden/page.tsx"] },
    {
      nl: "/machine-readable-resources",
      en: "/en/machine-readable-resources",
      changeFrequency: "monthly",
      priority: 0.3,
      sources: ["app/(pages)/machine-readable-resources/page.tsx", "app/en/(pages)/machine-readable-resources/page.tsx", "lib/machine-readable.ts", "public/llms.txt"],
    },
    { nl: "/contact", en: "/en/contact", changeFrequency: "monthly", priority: 0.6, sources: ["app/(pages)/contact/page.tsx", "app/en/(pages)/contact/page.tsx"] },
    { nl: "/faq", en: "/en/faq", changeFrequency: "monthly", priority: 0.55, sources: ["app/(pages)/faq/page.tsx", "app/en/(pages)/faq/page.tsx"] },
    { nl: "/locaties", en: "/en/locaties", changeFrequency: "monthly", priority: 0.6, sources: ["app/(pages)/locaties/page.tsx", "app/en/(pages)/locaties/page.tsx"] },
    { nl: "/privacy", en: "/en/privacy", changeFrequency: "yearly", priority: 0.2, sources: ["app/(pages)/privacy/page.tsx", "app/en/(pages)/privacy/page.tsx"] },
    { nl: "/cookies", en: "/en/cookies", changeFrequency: "yearly", priority: 0.2, sources: ["app/(pages)/cookies/page.tsx", "app/en/(pages)/cookies/page.tsx"] },
    { nl: "/algemene-voorwaarden", en: "/en/algemene-voorwaarden", changeFrequency: "yearly", priority: 0.2, sources: ["app/(pages)/algemene-voorwaarden/page.tsx", "app/en/(pages)/algemene-voorwaarden/page.tsx"] },
    { nl: "/retour-herroepingsrecht", en: "/en/retour-herroepingsrecht", changeFrequency: "yearly", priority: 0.25, sources: ["app/(pages)/retour-herroepingsrecht/page.tsx", "app/en/(pages)/retour-herroepingsrecht/page.tsx", "components/ReturnPolicyPage.tsx"] },
    ...shopRouteConfigs,
  ]

  const staticRoutes = (await Promise.all(staticRouteConfigs.map(toRouteEntries))).flat()

  const caseDetailRoutes: MetadataRoute.Sitemap = await Promise.all(
    getLiveCaseDetailRoutes().map(async (entry) => {
      const nlDirectSource = `app/(pages)/cases/${entry.slug}/page.tsx`
      const enDirectSource = `app/en/(pages)/cases/${entry.slug}/page.tsx`
      const nlDynamicSource = "app/(pages)/cases/[slug]/page.tsx"
      const enDynamicSource = "app/en/(pages)/cases/[slug]/page.tsx"

      const [nlDirect, enDirect, nlDynamic, enDynamic] = await Promise.all([
        statIfExists(nlDirectSource),
        statIfExists(enDirectSource),
        statIfExists(nlDynamicSource),
        statIfExists(enDynamicSource),
      ])

      const nlSource = nlDirect ? nlDirectSource : nlDynamic ? nlDynamicSource : null
      const enSource = enDirect ? enDirectSource : enDynamic ? enDynamicSource : null

      if (!nlSource || !enSource) return []

      const sources = [nlSource, enSource]

      const alternates = buildAlternates(entry.href, entry.enHref)
      const publishedFallback = new Date(entry.publishedOn)
      const lastModified =
        (await latestDateModified(sources)) ??
        (await latestMtime(sources)) ??
        (Number.isNaN(publishedFallback.getTime()) ? new Date() : publishedFallback)

      const baseEntry = {
        changeFrequency: "monthly" as const,
        priority: 0.6,
        lastModified,
        ...(alternates ? { alternates } : {}),
      }

      return [
        { url: `${BASE_URL}${withTrailingSlash(entry.href)}`, ...baseEntry },
        { url: `${BASE_URL}${withTrailingSlash(entry.enHref)}`, ...baseEntry },
      ]
    }),
  ).then((entries) => entries.flat())

  const [nlBlogSlugs, enBlogSlugs, segmentSlugs] = await Promise.all([
    getBlogSlugs("nl"),
    getBlogSlugs("en"),
    getSegmentSlugs(),
  ])

  const blogRoutes: MetadataRoute.Sitemap = await Promise.all(
    nlBlogSlugs.map(async (slug) => {
      const enPath = enBlogSlugs.includes(slug) ? `/en/blog/${slug}` : undefined
      const sources = [
        `app/(pages)/blog/${slug}/page.tsx`,
        enPath ? `app/en/(pages)/blog/${slug}/page.tsx` : undefined,
      ].filter(Boolean) as string[]
      const alternates = enPath ? buildAlternates(`/blog/${slug}`, enPath) : undefined
      const lastModified =
        (await latestDateModified(sources)) ?? (await latestMtime(sources)) ?? new Date()

      const baseEntry = {
        priority: 0.6,
        changeFrequency: "monthly" as const,
        lastModified,
        ...(alternates ? { alternates } : {}),
      }

      const entries: MetadataRoute.Sitemap = [
        { url: `${BASE_URL}${withTrailingSlash(`/blog/${slug}`)}`, ...baseEntry },
      ]

      if (enPath) {
        entries.push({
          url: `${BASE_URL}${withTrailingSlash(enPath)}`,
          ...baseEntry,
          alternates,
        })
      }

      return entries
    }),
  ).then((entries) => entries.flat())

  const enOnlyBlogRoutes: MetadataRoute.Sitemap = await Promise.all(
    enBlogSlugs
      .filter((slug) => !nlBlogSlugs.includes(slug))
      .map(async (slug) => ({
        url: `${BASE_URL}${withTrailingSlash(`/en/blog/${slug}`)}`,
        priority: 0.6,
        changeFrequency: "monthly" as const,
        lastModified:
          (await latestDateModified([`app/en/(pages)/blog/${slug}/page.tsx`])) ??
          (await latestMtime([`app/en/(pages)/blog/${slug}/page.tsx`])) ??
          new Date(),
      })),
  )

  const blogRouteEntries: MetadataRoute.Sitemap = [...blogRoutes, ...enOnlyBlogRoutes]

  const segmentRoutes: MetadataRoute.Sitemap = await Promise.all(
    segmentSlugs.flatMap((slug) => {
      const sources = [
        `app/segments/${slug}/page.tsx`,
        "app/en/(pages)/segments/[slug]/page.tsx",
      ]
      const alternates = buildAlternates(`/segments/${slug}`, `/en/segments/${slug}`)
      return [
        (async () => ({
          url: `${BASE_URL}${withTrailingSlash(`/segments/${slug}`)}`,
          lastModified: (await latestMtime(sources)) ?? new Date(),
          changeFrequency: "monthly" as const,
          priority: 0.6,
          alternates,
        }))(),
        (async () => ({
          url: `${BASE_URL}${withTrailingSlash(`/en/segments/${slug}`)}`,
          lastModified: (await latestMtime(sources)) ?? new Date(),
          changeFrequency: "monthly" as const,
          priority: 0.6,
          alternates,
        }))(),
      ]
    }),
  ).then((entries) => entries.flat())

  const materialDetailRoutes: MetadataRoute.Sitemap = await Promise.all(
    MATERIAL_DETAIL_SLUGS.flatMap((slug) => {
      const sources = [
        "content/material-details.ts",
        "content/material-details-en.ts",
        "app/(pages)/materials/[slug]/page.tsx",
        "app/en/(pages)/materials/[slug]/page.tsx",
      ]

      const alternates = buildAlternates(`/materials/${slug}`, `/en/materials/${slug}`)

      return [
        (async () => ({
          url: `${BASE_URL}${withTrailingSlash(`/materials/${slug}`)}`,
          lastModified: (await latestMtime(sources)) ?? new Date(),
          changeFrequency: "monthly" as const,
          priority: 0.7,
          alternates,
        }))(),
        (async () => ({
          url: `${BASE_URL}${withTrailingSlash(`/en/materials/${slug}`)}`,
          lastModified: (await latestMtime(sources)) ?? new Date(),
          changeFrequency: "monthly" as const,
          priority: 0.7,
          alternates,
        }))(),
      ]
    }),
  ).then((entries) => entries.flat())

  const shopProductRoutes: MetadataRoute.Sitemap = SHOP_INDEXABLE
    ? await Promise.all(
        SHOP_PRODUCT_SLUGS.flatMap((slug) => {
          const sources = [
            "content/shop-products.ts",
            "app/(pages)/shop/[slug]/page.tsx",
            "app/en/(pages)/shop/[slug]/page.tsx",
          ]

          const alternates = buildAlternates(`/shop/${slug}`, `/en/shop/${slug}`)

          return [
            (async () => ({
              url: `${BASE_URL}${withTrailingSlash(`/shop/${slug}`)}`,
              lastModified: (await latestMtime(sources)) ?? new Date(),
              changeFrequency: "monthly" as const,
              priority: 0.7,
              alternates,
            }))(),
            (async () => ({
              url: `${BASE_URL}${withTrailingSlash(`/en/shop/${slug}`)}`,
              lastModified: (await latestMtime(sources)) ?? new Date(),
              changeFrequency: "monthly" as const,
              priority: 0.7,
              alternates,
            }))(),
          ]
        }),
      ).then((entries) => entries.flat())
    : []

  const locationRoutes: MetadataRoute.Sitemap = await Promise.all(
    getAllLocationSlugs().flatMap((slug) => {
      const hasEn = EN_LOCATION_SLUGS.has(slug)
      const alternates = hasEn
        ? buildAlternates(`/${slug}`, `/en/${slug}`)
        : undefined
      return [
        (async () => ({
          url: `${BASE_URL}${withTrailingSlash(`/${slug}`)}`,
          lastModified: (await getLocationMtime(slug)) ?? new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.7,
          ...(alternates ? { alternates } : {}),
        }))(),
        ...(hasEn
          ? [
              (async () => ({
                url: `${BASE_URL}${withTrailingSlash(`/en/${slug}`)}`,
                lastModified: (await getLocationMtime(slug)) ?? new Date(),
                changeFrequency: "weekly" as const,
                priority: 0.7,
                alternates,
              }))(),
            ]
          : []),
      ]
    }),
  ).then((entries) => entries.flat())

  return [
    ...staticRoutes,
    ...caseDetailRoutes,
    ...blogRouteEntries,
    ...segmentRoutes,
    ...materialDetailRoutes,
    ...shopProductRoutes,
    ...locationRoutes,
  ]
}
