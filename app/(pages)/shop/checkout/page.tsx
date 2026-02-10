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
    "Rond je bestelling af. Kies verzendmethode en ga veilig naar betaling. Levering in Belgie: EUR 7.50 tot 3 kg of afhalen op afspraak.",
  alternates: {
    canonical: `${SITE.url}/shop/checkout/`,
    languages: {
      "nl-BE": `${SITE.url}/shop/checkout/`,
      "en-BE": `${SITE.url}/en/shop/checkout/`,
      "x-default": `${SITE.url}/shop/checkout/`,
    },
  },
  openGraph: {
    title: "Checkout",
    description: "Rond je bestelling af en ga veilig naar betaling.",
    url: `${SITE.url}/shop/checkout/`,
    images: [{ url: SITE.ogImage, width: 1200, height: 630 }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Checkout | X3DPrints",
    description: "Rond je bestelling af en ga veilig naar betaling.",
    images: [SITE.ogImage],
  },
}

export default function ShopCheckoutPage() {
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
              Kies je verzendmethode, vul je e-mail in en ga door naar betaling. Je ordercode
              verschijnt na afronding.
            </p>
          </Reveal>
          <div className="mt-8 flex flex-wrap gap-3">
            <ShimmerButton href="/shop">Terug naar shop</ShimmerButton>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50"
            >
              Offerte aanvragen
            </Link>
          </div>
        </div>
      </section>

      <ShopOrderSuccessNotice locale="nl" />
      <ShopCartView locale="nl" variant="checkout" />

      <ReadMoreLinks pageType="shop" />
    </main>
  )
}
