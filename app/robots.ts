// app/robots.ts
import type { MetadataRoute } from "next"
import { SITE } from "@/lib/seo"

const BASE_URL = SITE.url.replace(/\/+$/, "") // https://www.x3dprints.be

export const dynamic = "force-static"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/en/"],
        disallow: ["/api", "/crm"],
      },
      {
        userAgent: "GPTBot",
        allow: ["/", "/en/"],
        disallow: ["/api", "/crm"],
      },
      {
        userAgent: "Google-Extended",
        allow: ["/", "/en/"],
        disallow: ["/api", "/crm"],
      },
    ],
    sitemap: [`${BASE_URL}/sitemap.xml`],
    host: BASE_URL,
  }
}
