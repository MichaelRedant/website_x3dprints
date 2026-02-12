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
    "Rond je bestelling veilig af. Kies verzendmethode, bevestig je e-mail en ga door naar Mollie betaling.",
  robots: { index: false, follow: false },
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
    description: "Kies verzending, bevestig je e-mail en betaal veilig via Mollie.",
    url: `${SITE.url}/shop/checkout/`,
    images: [{ url: SITE.ogImage, width: 1200, height: 630 }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Checkout | X3DPrints",
    description: "Kies verzending, bevestig je e-mail en betaal veilig via Mollie.",
    images: [SITE.ogImage],
  },
}

export default function ShopCheckoutPage() {
  return (
    <main className="flex-1">
      <section className="px-6 pb-14 pt-20 sm:px-8 lg:px-12 xl:pb-16">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 p-6 sm:p-8 xl:p-10">
              <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-indigo-200/45 blur-3xl" />
              <div aria-hidden className="pointer-events-none absolute -bottom-24 left-10 h-56 w-56 rounded-full bg-cyan-200/40 blur-3xl" />
              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Shop</p>
                <h1 className="mt-4 text-balance text-4xl font-extrabold text-slate-900 sm:text-5xl">
                  Checkout
                </h1>
                <p className="mt-4 max-w-3xl text-lg text-slate-600">
                  Kies je verzendmethode, controleer je gegevens en rond veilig af via Mollie.
                  Na betaling zie je meteen je ordercode.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <ShimmerButton href="/shop">Terug naar shop</ShimmerButton>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50"
                  >
                    Hulp bij bestelling
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <ShopOrderSuccessNotice locale="nl" />
      <ShopCartView locale="nl" variant="checkout" />

      <ReadMoreLinks pageType="shop" />
    </main>
  )
}
