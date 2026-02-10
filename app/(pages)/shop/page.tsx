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
  title: "Shop voor 3D prints in voorbereiding | X3DPrints",
  description:
    "Onze shop start binnenkort met een select aanbod. Tot dan: vraag advies en plan je 3D print. Levering in Belgie: EUR 7.50 tot 3 kg of afhalen op afspraak.",
  alternates: {
    canonical: `${SITE.url}/shop/`,
    languages: {
      "nl-BE": `${SITE.url}/shop/`,
      "en-BE": `${SITE.url}/en/shop/`,
      "x-default": `${SITE.url}/shop/`,
    },
  },
  openGraph: {
    title: "Shop voor 3D prints (in voorbereiding)",
    description:
      "Select aanbod op komst. Vraag advies, kies materialen en plan je print. Levering in Belgie of afhalen op afspraak.",
    url: `${SITE.url}/shop/`,
    images: [{ url: SITE.ogImage, width: 1200, height: 630 }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop voor 3D prints | X3DPrints",
    description: "Select aanbod op komst. Vraag advies en plan je print.",
    images: [SITE.ogImage],
  },
}

const HIGHLIGHTS = [
  {
    title: "Levering in Belgie",
    description: "Vaste verzending binnen Belgie. EUR 7.50 tot 3 kg.",
  },
  {
    title: "Afhalen op afspraak",
    description: "Liever ophalen? Dat kan op afspraak in de regio.",
  },
  {
    title: "Kwaliteitscheck",
    description: "Elke print wordt gecontroleerd op passing en afwerking.",
  },
]

const NEXT_STEPS = [
  {
    title: "Vraag advies voor je project",
    description: "Stuur je toepassing of model door, dan adviseren we materiaal en planning.",
    href: "/contact",
    label: "Offerte aanvragen",
  },
  {
    title: "Material Suggestion Tool",
    description: "Snelle vragen, helder advies en een prefill naar contact.",
    href: "/materials#material-suggestion-tool",
    label: "Start tool",
  },
  {
    title: "Bekijk materialen en richtlijnen",
    description: "Vergelijk PLA, PETG en TPU en zie wanneer je welk materiaal kiest.",
    href: "/materials",
    label: "Materialen",
  },
]

export default async function ShopPage() {
  const liveProducts = (await getShopProducts("nl")).filter((product) => product.isLive)

  return (
    <main className="flex-1">
      <section className="px-6 pb-12 pt-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Shop</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold text-slate-900 sm:text-5xl">
              De shop is in voorbereiding
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-600">
              We starten binnenkort met een select aanbod. Tot dan helpen we je graag met advies,
              materiaalkeuze en een heldere planning voor je 3D print.
            </p>
          </Reveal>
          <div className="mt-8 flex flex-wrap gap-3">
            <ShimmerButton href="/contact">Offerte aanvragen</ShimmerButton>
            <Link
              href="/materials#material-suggestion-tool"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50"
            >
              Material Suggestion Tool
            </Link>
          </div>
        </div>
      </section>

      <ShopProductGrid products={liveProducts} locale="nl" />

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
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Wat kan je nu al doen</p>
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
