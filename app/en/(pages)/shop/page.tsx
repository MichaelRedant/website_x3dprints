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
  title: "Small-batch 3D print shop online | X3DPrints",
  description:
    "Order small-batch 3D prints from live CRM stock. Personal quality checks, secure Mollie payment, and delivery in Belgium or free pickup by appointment.",
  alternates: {
    canonical: `${SITE.url}/en/shop/`,
    languages: {
      "en-BE": `${SITE.url}/en/shop/`,
      "nl-BE": `${SITE.url}/shop/`,
      "x-default": `${SITE.url}/shop/`,
    },
  },
  openGraph: {
    title: "Small-batch 3D print shop online",
    description: "Live stock, personal finishing, and direct support from the maker.",
    url: `${SITE.url}/en/shop/`,
    images: [{ url: SITE.ogImage, width: 1200, height: 630 }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Small-batch 3D print shop online | X3DPrints",
    description: "Live-stock 3D prints with secure Mollie checkout and direct maker support.",
    images: [SITE.ogImage],
  },
}

const HIGHLIGHTS = [
  {
    title: "In-house production and checks",
    description: "Every order gets a manual quality check before shipping.",
  },
  {
    title: "Clear delivery options",
    description: "Flat-rate delivery in Belgium or free pickup by appointment.",
  },
  {
    title: "Direct maker support",
    description: "Get quick advice on material, finish, and practical use.",
  },
]

const HERO_POINTS = [
  "Live stock from CRM",
  "Secure Mollie checkout",
  "Fast delivery or pickup by appointment",
]

type ShopStep = { title: string; description: string; href?: string; label?: string }

const ORDER_STEPS: ShopStep[] = [
  {
    title: "Pick your product",
    description: "Filter by category, compare details, and set your quantity.",
  },
  {
    title: "Choose delivery and email",
    description: "Select shipping or free pickup and add your confirmation email.",
  },
  {
    title: "Pay securely",
    description: "Pay through Mollie and receive your order confirmation right away.",
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
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 p-6 sm:p-8 xl:p-10">
              <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-indigo-200/45 blur-3xl" />
              <div aria-hidden className="pointer-events-none absolute -bottom-24 left-10 h-56 w-56 rounded-full bg-cyan-200/40 blur-3xl" />
              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Shop</p>
                <h1 className="mt-4 text-balance text-4xl font-extrabold text-slate-900 sm:text-5xl">
                  Small-batch 3D prints, ready to order
                </h1>
                <p className="mt-4 max-w-3xl text-lg text-slate-600">
                  Order functional and decorative prints produced and checked in-house.
                  See live stock, choose delivery or pickup, and pay securely via Mollie.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {HERO_POINTS.map((point) => (
                    <span
                      key={point}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600"
                    >
                      {point}
                    </span>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <ShimmerButton href="/en/shop#shop-collection">Shop now</ShimmerButton>
                  <Link
                    href="/en/contact"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50"
                  >
                    Get tailored advice
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <ShopProductGrid products={liveProducts} locale="en" />

      <section className="px-6 pb-16 sm:px-8 lg:px-12 xl:pb-20">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3 xl:gap-5">
          {HIGHLIGHTS.map((item) => (
            <Reveal key={item.title} delay={0.05}>
              <GlassCard className="h-full">
                <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{item.description}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 pb-20 sm:px-8 lg:px-12 xl:pb-24">
        <div className="mx-auto max-w-7xl">
          <GlassCard>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              How to order
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {ORDER_STEPS.map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                  <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                  {item.href && item.label ? (
                    <Link
                      href={item.href}
                      className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-500"
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
