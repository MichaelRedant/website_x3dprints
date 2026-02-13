import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import ReadMoreLinks from "@/components/ReadMoreLinks"
import ShopCartView from "@/components/ShopCartView"
import { SITE } from "@/lib/seo"
import { SHOP_INDEXABLE } from "@/content/shop-products"

const IS_LIVE = SHOP_INDEXABLE

export const metadata: Metadata = {
  title: IS_LIVE ? "Cart | X3DPrints" : "Cart coming soon | X3DPrints",
  description: IS_LIVE
    ? "Review your items, adjust quantities, and continue to checkout."
    : "The cart is currently in preparation. Request advice or start with material selection. Delivery in Belgium: EUR 7.50 up to 3 kg or pickup by appointment.",
  robots: { index: false, follow: false },
  alternates: {
    canonical: `${SITE.url}/en/shop/cart/`,
    languages: {
      "en-BE": `${SITE.url}/en/shop/cart/`,
      "nl-BE": `${SITE.url}/shop/cart/`,
      "x-default": `${SITE.url}/shop/cart/`,
    },
  },
  openGraph: {
    title: IS_LIVE ? "Cart" : "Cart (coming soon)",
    description: IS_LIVE
      ? "Review your items, adjust quantities, and continue to checkout."
      : "Shop features will be enabled soon.",
    url: `${SITE.url}/en/shop/cart/`,
    images: [{ url: SITE.ogImage, width: 1200, height: 630 }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: IS_LIVE ? "Cart | X3DPrints" : "Cart (coming soon) | X3DPrints",
    description: IS_LIVE
      ? "Review your items, adjust quantities, and continue to checkout."
      : "Shop features will be enabled soon.",
    images: [SITE.ogImage],
  },
}

export default function ShopCartPageEn() {
  return (
    <main className="flex-1">
      <section className="px-6 pb-14 pt-20 sm:px-8 lg:px-12 xl:pb-16">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 p-6 sm:p-8 xl:p-10">
              <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-indigo-200/45 blur-3xl" />
              <div aria-hidden className="pointer-events-none absolute -bottom-24 left-10 h-56 w-56 rounded-full bg-cyan-200/40 blur-3xl" />
              <div className="relative md:text-center lg:text-left">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Shop</p>
                <h1 className="mt-4 text-balance text-4xl font-extrabold text-slate-900 sm:text-5xl">
                  {IS_LIVE ? "Your cart" : "The cart is in preparation"}
                </h1>
                <p className="mt-4 max-w-3xl text-lg text-slate-600 md:mx-auto lg:mx-0">
                  {IS_LIVE
                    ? "Review your items, adjust quantities, and continue to checkout in a few steps."
                    : "The cart will go live once the first products are available. Until then, request advice or discuss material selection with us."}
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:justify-center lg:justify-start">
                  <ShimmerButton
                    href={IS_LIVE ? "/en/shop" : "/en/contact"}
                    wrapperClassName="w-full sm:w-auto"
                    className="w-full justify-center sm:w-auto"
                  >
                    {IS_LIVE ? "Continue shopping" : "Request advice"}
                  </ShimmerButton>
                  <Link
                    href="/en/materials#material-suggestion-tool"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 sm:w-auto"
                  >
                    Get material guidance
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <ShopCartView locale="en" variant="cart" />

      <ReadMoreLinks pageType="shop" />
    </main>
  )
}


