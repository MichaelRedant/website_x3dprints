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
  title: "Starter 3D print shop voor Bambu spools | X3DPrints",
  description:
    "Starter 3D print shop met Bambu reusable spools uit kleine oplage reststock. Momenteel 13 stuks beschikbaar aan EUR 5.00 per stuk excl. verzending.",
  alternates: {
    canonical: `${SITE.url}/shop/`,
    languages: {
      "nl-BE": `${SITE.url}/shop/`,
      "en-BE": `${SITE.url}/en/shop/`,
      "x-default": `${SITE.url}/shop/`,
    },
  },
  openGraph: {
    title: "Starter 3D print shop voor Bambu spools",
    description:
      "Originele Bambu reusable spools uit reststock, netjes gepresenteerd en eenvoudig aan te vragen.",
    url: `${SITE.url}/shop/`,
    images: [{ url: "/images/og-shop-nl.svg", width: 1200, height: 630 }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Starter 3D print shop voor Bambu spools | X3DPrints",
    description: "Originele Bambu reusable spools uit reststock, EUR 5.00 per stuk excl. verzending.",
    images: ["/images/og-shop-nl.svg"],
  },
}

const HIGHLIGHTS = [
  {
    title: "Gecontroleerde reststock",
    description: "Alleen items die nog bruikbaar en verkoopbaar zijn, komen in deze startershop terecht.",
  },
  {
    title: "Lage instap voor Bambu refills",
    description: "Een extra reusable spool is een snelle, goedkope manier om met refills te blijven werken.",
  },
  {
    title: "Snelle opvolging",
    description: "Je krijgt een bevestiging over beschikbaar aantal, verzending of afhalen op afspraak.",
  },
]

const HERO_POINTS = [
  "Originele Bambu reusable spools",
  "13 stuks momenteel op voorraad",
  "EUR 5.00 per stuk excl. verzending",
  "Afhalen of verzending na aanvraag",
]

type ShopStep = { title: string; description: string; href?: string; label?: string }

const ORDER_STEPS: ShopStep[] = [
  {
    title: "Kies je item",
    description: "Open het product, bekijk de details en geef meteen je gewenste aantal door.",
  },
  {
    title: "Verstuur je aanvraag",
    description: "Je vertrekt vanuit de productpagina met een vooringevulde aanvraag en hoeveelheid.",
  },
  {
    title: "Bevestig levering",
    description: "Je krijgt antwoord met beschikbaarheid, verzendkost of afhaalmoment.",
  },
]

export default async function ShopPage() {
  const liveProducts = (await getShopProducts("nl")).filter((product) => product.isLive)
  const itemListJsonLd =
    liveProducts.length > 0
      ? buildItemListSchema({
          name: "Shop collectie",
          inLanguage: "nl-BE",
          items: liveProducts.map((product) => ({
            name: product.name.nl,
            url: `${SITE.url}/shop/${product.slug}/`,
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
                  Startershop voor Bambu reusable spools en andere 3D prints in opbouw
                </h1>
                <p className="mt-4 max-w-3xl text-lg text-slate-600 md:mx-auto lg:mx-0">
                  We starten bewust klein: met originele Bambu reusable spools die overblijven uit eigen stock.
                  Momenteel zijn er 13 stuks beschikbaar aan EUR 5.00 per stuk excl. verzending. Deze 3D print shop voor kleine oplage items groeit stapsgewijs; voor deze eerste drop loopt bestellen nog via aanvraag en nog niet via Mollie checkout.
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
                    href="/shop/bambu-reusable-spool"
                    wrapperClassName="w-full sm:w-auto"
                    className="w-full justify-center sm:w-auto"
                  >
                    Bekijk de reusable spool
                  </ShimmerButton>
                  <Link
                    href="/contact"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 sm:w-auto"
                  >
                    Vraag meerdere stuks aan
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <ShopProductGrid products={liveProducts} locale="nl" />

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
              Zo bestel je
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

