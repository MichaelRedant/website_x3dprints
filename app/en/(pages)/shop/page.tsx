import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import ReadMoreLinks from "@/components/ReadMoreLinks"
import ShopProductGrid from "@/components/ShopProductGrid"
import { SITE } from "@/lib/seo"
import { getShopProducts } from "@/lib/shop-data"

export const metadata: Metadata = {
  title: "Shop for 3D prints (coming soon) | X3DPrints",
  description:
    "Our shop launches soon with a curated selection. Until then, request advice and plan your print. Delivery in Belgium: EUR 7.50 up to 3 kg or pickup by appointment.",
  alternates: {
    canonical: `${SITE.url}/en/shop/`,
    languages: {
      "en-BE": `${SITE.url}/en/shop/`,
      "nl-BE": `${SITE.url}/shop/`,
      "x-default": `${SITE.url}/shop/`,
    },
  },
  openGraph: {
    title: "Shop for 3D prints (coming soon)",
    description:
      "A curated selection is on the way. Get advice, pick materials and plan your print.",
    url: `${SITE.url}/en/shop/`,
    images: [{ url: SITE.ogImage, width: 1200, height: 630 }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop for 3D prints | X3DPrints",
    description: "A curated selection is on the way. Get advice and plan your print.",
    images: [SITE.ogImage],
  },
}

const HIGHLIGHTS = [
  {
    title: "Delivery in Belgium",
    description: "Flat-rate shipping in Belgium. EUR 7.50 up to 3 kg.",
  },
  {
    title: "Pickup by appointment",
    description: "Prefer pickup? We can schedule it on request.",
  },
  {
    title: "Quality check",
    description: "Every print is checked for fit and finish.",
  },
]

const NEXT_STEPS = [
  {
    title: "Request project advice",
    description: "Send your use-case or model and we advise material and timing.",
    href: "/contact",
    label: "Request a quote",
  },
  {
    title: "Material Suggestion Tool",
    description: "Quick questions, clear advice and a prefilled contact flow.",
    href: "/materials#material-suggestion-tool",
    label: "Start tool",
  },
  {
    title: "Review materials",
    description: "Compare PLA, PETG and TPU and pick the right trade-offs.",
    href: "/materials",
    label: "Materials",
  },
]

export default async function ShopPageEn() {
  const liveProducts = (await getShopProducts("en")).filter((product) => product.isLive)

  return (
    <main className="flex-1">
      <section className="px-6 pb-12 pt-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Shop</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold text-slate-900 sm:text-5xl">
              The shop is in preparation
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-600">
              We will launch soon with a curated selection. For now, we are happy to advise on
              materials and help plan your 3D print.
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
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">What you can do now</p>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {NEXT_STEPS.map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                  <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                  <Link
                    href={item.href}
                    className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-500"
                  >
                    {item.label}
                    <span className="i-lucide-arrow-right" aria-hidden />
                  </Link>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      <ReadMoreLinks pageType="shop" />
    </main>
  )
}
