// app/robots.ts
import type { MetadataRoute } from "next"
import { SITE } from "@/lib/seo"

const BASE_URL = SITE.url.replace(/\/+$/, "") // https://www.x3dprints.be

const SHOP_DISALLOW = [
  "/shop/cart",
  "/shop/checkout",
  "/shop/search",
  "/shop/account",
  "/shop?*",
  "/shop/*?*",
  "/en/shop/cart",
  "/en/shop/checkout",
  "/en/shop/search",
  "/en/shop/account",
  "/en/shop?*",
  "/en/shop/*?*",
]

export const dynamic = "force-static"

export default function robots(): MetadataRoute.Robots {
  const disallow = ["/api", "/crm", ...SHOP_DISALLOW]

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/en/"],
        disallow,
      },
      {
        userAgent: "GPTBot",
        allow: ["/", "/en/"],
        disallow,
      },
      {
        userAgent: "Google-Extended",
        allow: ["/", "/en/"],
        disallow,
      },
    ],
    sitemap: [`${BASE_URL}/sitemap.xml`],
    host: BASE_URL,
  }
}
