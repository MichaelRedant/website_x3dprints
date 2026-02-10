import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import ReadMoreLinks from "@/components/ReadMoreLinks"
import ShopCartView from "@/components/ShopCartView"
import { SITE } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Cart coming soon | X3DPrints",
  description:
    "The cart is in preparation. Request advice or start with material selection. Delivery in Belgium: EUR 7.50 up to 3 kg or pickup by appointment.",
  alternates: {
    canonical: `${SITE.url}/en/shop/cart/`,
    languages: {
      "en-BE": `${SITE.url}/en/shop/cart/`,
      "nl-BE": `${SITE.url}/shop/cart/`,
      "x-default": `${SITE.url}/shop/cart/`,
    },
  },
  openGraph: {
    title: "Cart (coming soon)",
    description: "Shop features will be enabled soon.",
    url: `${SITE.url}/en/shop/cart/`,
    images: [{ url: SITE.ogImage, width: 1200, height: 630 }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cart | X3DPrints",
    description: "Shop features will be enabled soon.",
    images: [SITE.ogImage],
  },
}

export default function ShopCartPageEn() {
  return (
    <main className="flex-1">
      <section className="px-6 pb-12 pt-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Shop</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold text-slate-900 sm:text-5xl">
              The cart is in preparation
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-600">
              The cart will go live once the first products are available. Until then, request
              advice or discuss material selection with us.
            </p>
          </Reveal>
          <div className="mt-8 flex flex-wrap gap-3">
            <ShimmerButton href="/contact">Request a quote</ShimmerButton>
            <Link
              href="/materials#material-suggestion-tool"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50"
            >
              Material Suggestion Tool
            </Link>
          </div>
        </div>
      </section>

      <ShopCartView locale="en" variant="cart" />

      <ReadMoreLinks pageType="shop" />
    </main>
  )
}
