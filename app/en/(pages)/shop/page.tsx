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
  title: "Small-batch 3D print shop | X3DPrints",
  description:
    "Small-batch 3D prints with personal quality checks. Direct maker contact, delivery in Belgium or free pickup by appointment.",
  alternates: {
    canonical: `${SITE.url}/en/shop/`,
    languages: {
      "en-BE": `${SITE.url}/en/shop/`,
      "nl-BE": `${SITE.url}/shop/`,
      "x-default": `${SITE.url}/shop/`,
    },
  },
  openGraph: {
    title: "Small-batch 3D print shop",
    description: "A small, curated collection with personal finishing and direct support.",
    url: `${SITE.url}/en/shop/`,
    images: [{ url: SITE.ogImage, width: 1200, height: 630 }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Small-batch 3D print shop | X3DPrints",
    description: "Small-batch 3D prints with personal finishing and direct support.",
    images: [SITE.ogImage],
  },
}

const HIGHLIGHTS = [
  {
    title: "Small-batch made",
    description: "Every print is produced and checked in-house.",
  },
  {
    title: "Delivery or pickup",
    description: "Delivery in Belgium or free pickup by appointment.",
  },
  {
    title: "Personal support",
    description: "Questions about material or finish? You speak with the maker.",
  },
]

type ShopStep = { title: string; description: string; href?: string; label?: string }

const ORDER_STEPS: ShopStep[] = [
  {
    title: "Pick your product",
    description: "Select your item and review material, color and lead time.",
  },
  {
    title: "Choose quantity and delivery",
    description: "Set your quantity and pick delivery or free pickup.",
  },
  {
    title: "Pay securely",
    description: "Pay via Mollie, then we print and inspect your order.",
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
      <section className="px-6 pb-12 pt-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Shop</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold text-slate-900 sm:text-5xl">
              Small-batch 3D print shop, personally made
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-600">
              Small runs, direct communication, and careful finishing. Every item is printed in-house,
              checked for fit, and shipped with care or prepared for free pickup.
            </p>
          </Reveal>
          <div className="mt-8 flex flex-wrap gap-3">
            <ShimmerButton href="/en/shop#shop-collection">View collection</ShimmerButton>
            <Link
              href="/en/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50"
            >
              Ask for personal advice
            </Link>
          </div>
        </div>
      </section>

      <ShopProductGrid products={liveProducts} locale="en" />

      <section className="px-6 pb-14 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
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

      <section className="px-6 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <GlassCard>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              How ordering works
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
