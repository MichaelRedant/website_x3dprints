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
  title: "Kleinschalige 3D print shop | X3DPrints",
  description:
    "Persoonlijk gemaakte 3D prints in kleine oplages. Direct contact met de maker, levering in Belgie of gratis afhalen op afspraak.",
  alternates: {
    canonical: `${SITE.url}/shop/`,
    languages: {
      "nl-BE": `${SITE.url}/shop/`,
      "en-BE": `${SITE.url}/en/shop/`,
      "x-default": `${SITE.url}/shop/`,
    },
  },
  openGraph: {
    title: "Kleinschalige 3D print shop",
    description:
      "Kleine, zorgvuldig geselecteerde collectie met persoonlijke afwerking en directe ondersteuning.",
    url: `${SITE.url}/shop/`,
    images: [{ url: SITE.ogImage, width: 1200, height: 630 }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kleinschalige 3D print shop | X3DPrints",
    description: "Persoonlijk gemaakte 3D prints, kleine oplages en directe ondersteuning.",
    images: [SITE.ogImage],
  },
}

const HIGHLIGHTS = [
  {
    title: "Kleinschalig gemaakt",
    description: "Elke print wordt in huis geproduceerd en gecontroleerd.",
  },
  {
    title: "Levering of afhalen",
    description: "Levering in Belgie of gratis afhalen op afspraak.",
  },
  {
    title: "Persoonlijk contact",
    description: "Vragen over materiaal of afwerking? Je spreekt direct met de maker.",
  },
]

type ShopStep = { title: string; description: string; href?: string; label?: string }

const ORDER_STEPS: ShopStep[] = [
  {
    title: "Kies je product",
    description: "Selecteer je item en bekijk materiaal, kleur en levertijd.",
  },
  {
    title: "Kies aantal en levering",
    description: "Stel je aantal in en kies levering of gratis afhalen.",
  },
  {
    title: "Betaal veilig",
    description: "Betaal via Mollie, daarna printen en controleren wij je order.",
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
      <section className="px-6 pb-12 pt-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Shop</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold text-slate-900 sm:text-5xl">
              Kleinschalige 3D print shop, persoonlijk gemaakt
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-600">
              Kleine oplages, directe communicatie en zorgvuldige afwerking. Elk item wordt in huis geprint,
              gecontroleerd en met zorg verzonden of klaargezet voor gratis afhaling.
            </p>
          </Reveal>
          <div className="mt-8 flex flex-wrap gap-3">
            <ShimmerButton href="/shop#shop-collection">Bekijk collectie</ShimmerButton>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50"
            >
              Vraag persoonlijk advies
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
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              Zo werkt bestellen
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
