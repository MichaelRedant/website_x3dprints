import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import ReadMoreLinks from "@/components/ReadMoreLinks"
import ShopCartView from "@/components/ShopCartView"
import ShopOrderSuccessNotice from "@/components/ShopOrderSuccessNotice"
import { SITE } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Checkout | X3DPrints",
  description:
    "Complete your order. Choose shipping and proceed to secure payment. Delivery in Belgium: EUR 7.50 up to 3 kg or pickup by appointment.",
  alternates: {
    canonical: `${SITE.url}/en/shop/checkout/`,
    languages: {
      "en-BE": `${SITE.url}/en/shop/checkout/`,
      "nl-BE": `${SITE.url}/shop/checkout/`,
      "x-default": `${SITE.url}/shop/checkout/`,
    },
  },
  openGraph: {
    title: "Checkout",
    description: "Complete your order and proceed to secure payment.",
    url: `${SITE.url}/en/shop/checkout/`,
    images: [{ url: SITE.ogImage, width: 1200, height: 630 }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Checkout | X3DPrints",
    description: "Complete your order and proceed to secure payment.",
    images: [SITE.ogImage],
  },
}

export default function ShopCheckoutPageEn() {
  return (
    <main className="flex-1">
      <section className="px-6 pb-12 pt-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Shop</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold text-slate-900 sm:text-5xl">
              Checkout
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-600">
              Choose your shipping method, add your email and proceed to payment. Your order code
              appears after completion.
            </p>
          </Reveal>
          <div className="mt-8 flex flex-wrap gap-3">
            <ShimmerButton href="/en/shop">Back to shop</ShimmerButton>
            <Link
              href="/en/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50"
            >
              Request a quote
            </Link>
          </div>
        </div>
      </section>

      <ShopOrderSuccessNotice locale="en" />
      <ShopCartView locale="en" variant="checkout" />

      <ReadMoreLinks pageType="shop" />
    </main>
  )
}
