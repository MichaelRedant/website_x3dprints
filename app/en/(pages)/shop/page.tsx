import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import ReadMoreLinks from "@/components/ReadMoreLinks"
import ShopProductGrid from "@/components/ShopProductGrid"
import { SITE, buildItemListSchema } from "@/lib/seo"
import { getShopProducts } from "@/lib/shop-data"

export const metadata: Metadata = {
  title: "Starter 3D print shop for Bambu spools | X3DPrints",
  description:
    "Starter 3D print shop with Bambu reusable spools from small-batch leftover stock. Currently 13 units available at EUR 5.00 per item excl. shipping.",
  alternates: {
    canonical: `${SITE.url}/en/shop/`,
    languages: {
      "en-BE": `${SITE.url}/en/shop/`,
      "nl-BE": `${SITE.url}/shop/`,
      "x-default": `${SITE.url}/shop/`,
    },
  },
  openGraph: {
    title: "Starter 3D print shop for Bambu spools",
    description: "Original Bambu reusable spools from leftover stock, presented cleanly and easy to request.",
    url: `${SITE.url}/en/shop/`,
    images: [{ url: "/images/og-shop-en.svg", width: 1200, height: 630 }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Starter 3D print shop for Bambu spools | X3DPrints",
    description: "Starter collection with checked Bambu reusable spools from leftover stock.",
    images: ["/images/og-shop-en.svg"],
  },
}

const HIGHLIGHTS = [
  {
    title: "Checked leftover stock",
    description: "Only items that are still useful and worth selling make it into this starter shop.",
  },
  {
    title: "Low-threshold refill setup",
    description: "An extra reusable spool is an easy, low-cost way to keep using Bambu refills.",
  },
  {
    title: "Fast follow-up",
    description: "You get confirmation on available quantity, shipping, or pickup by appointment.",
  },
]

const HERO_POINTS = [
  "Original Bambu reusable spools",
  "13 units currently in stock",
  "EUR 5.00 per item excl. shipping",
  "Pickup or shipping after request",
]

type ShopStep = { title: string; description: string; href?: string; label?: string }

const ORDER_STEPS: ShopStep[] = [
  {
    title: "Pick your item",
    description: "Open the product, review the details, and set the quantity you want right away.",
  },
  {
    title: "Send your request",
    description: "Start from the product page with a prefilled request and selected quantity.",
  },
  {
    title: "Confirm delivery",
    description: "You receive a reply with availability, shipping cost, or a pickup moment.",
  },
]

export default async function ShopPageEn() {
  const liveProducts = (await getShopProducts("en")).filter((product) => product.isLive)
  const itemListJsonLd =
    liveProducts.length > 0
      ? buildItemListSchema({
          name: "Shop collection",
          inLanguage: "en-BE",
          items: liveProducts.map((product) => ({
            name: product.name.en,
            url: `${SITE.url}/en/shop/${product.slug}/`,
          })),
        })
      : null

  return (
    <main className="flex-1">
      <section className="px-6 pb-14 pt-20 sm:px-8 lg:px-12 xl:pb-16">
        <div className="mx-auto max-w-[96rem] 2xl:max-w-[108rem]">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 p-6 sm:p-8 xl:p-10">
              <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-indigo-200/45 blur-3xl" />
              <div aria-hidden className="pointer-events-none absolute -bottom-24 left-10 h-56 w-56 rounded-full bg-cyan-200/40 blur-3xl" />
              <div className="relative md:text-center lg:text-left">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Shop</p>
                <h1 className="mt-4 text-balance text-4xl font-extrabold text-slate-900 sm:text-5xl">
                  Starter shop for Bambu reusable spools and other 3D print products in progress
                </h1>
                <p className="mt-4 max-w-3xl text-lg text-slate-600 md:mx-auto lg:mx-0">
                  We are intentionally starting small with original Bambu reusable spools left over from our own stock.
                  There are currently 13 units available at EUR 5.00 per item excl. shipping. This 3D print shop for small-batch items is expanding step by step; for this first drop, ordering still runs through a request flow and not through Mollie checkout yet.
                </p>
                <div className="mt-5 flex flex-wrap gap-2 md:justify-center lg:justify-start">
                  {HERO_POINTS.map((point) => (
                    <span
                      key={point}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600"
                    >
                      {point}
                    </span>
                  ))}
                </div>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:justify-center lg:justify-start">
                  <ShimmerButton
                    href="/en/shop/bambu-reusable-spool"
                    wrapperClassName="w-full sm:w-auto"
                    className="w-full justify-center sm:w-auto"
                  >
                    View the reusable spool
                  </ShimmerButton>
                  <Link
                    href="/en/contact"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 sm:w-auto"
                  >
                    Ask for multiple units
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <ShopProductGrid products={liveProducts} locale="en" />

      <section className="px-6 pb-16 sm:px-8 lg:px-12 xl:pb-20">
        <div className="mx-auto grid max-w-[96rem] gap-4 md:grid-cols-3 xl:gap-5 2xl:max-w-[108rem]">
          {HIGHLIGHTS.map((item) => (
            <Reveal key={item.title} delay={0.05}>
              <GlassCard className="h-full md:text-center lg:text-left">
                <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{item.description}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 pb-20 sm:px-8 lg:px-12 xl:pb-24">
        <div className="mx-auto max-w-[96rem] 2xl:max-w-[108rem]">
          <GlassCard className="md:text-center lg:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              How to order
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {ORDER_STEPS.map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-100 bg-white/70 p-4 md:text-center lg:text-left">
                  <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                  {item.href && item.label ? (
                    <Link
                      href={item.href}
                      className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-500 md:justify-center lg:justify-start"
                    >
                      {item.label}
                      <span className="i-lucide-arrow-right" aria-hidden />
                    </Link>
                  ) : null}
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      <ReadMoreLinks pageType="shop" />
      {itemListJsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      ) : null}
    </main>
  )
}

