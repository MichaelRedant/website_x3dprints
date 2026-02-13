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
  title: "3D print shop in kleine oplage | X3DPrints",
  description:
    "Bestel kleinschalige 3D prints uit live CRM-voorraad. Persoonlijke kwaliteitscheck, veilige betaling via Mollie en levering in Belgie of gratis afhalen op afspraak.",
  alternates: {
    canonical: `${SITE.url}/shop/`,
    languages: {
      "nl-BE": `${SITE.url}/shop/`,
      "en-BE": `${SITE.url}/en/shop/`,
      "x-default": `${SITE.url}/shop/`,
    },
  },
  openGraph: {
    title: "3D print shop in kleine oplage",
    description:
      "Actuele collectie met persoonlijke afwerking, live voorraad en directe ondersteuning.",
    url: `${SITE.url}/shop/`,
    images: [{ url: SITE.ogImage, width: 1200, height: 630 }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D print shop in kleine oplage | X3DPrints",
    description: "Actuele 3D print collectie met live voorraad, Mollie-betaling en persoonlijke service.",
    images: [SITE.ogImage],
  },
}

const HIGHLIGHTS = [
  {
    title: "In-house geprint en gecontroleerd",
    description: "Elke order krijgt een manuele kwaliteitscontrole voor verzending.",
  },
  {
    title: "Heldere levering",
    description: "Vaste verzending in Belgie of gratis afhalen op afspraak.",
  },
  {
    title: "Direct contact met de maker",
    description: "Je krijgt snel advies over materiaal, afwerking en toepassing.",
  },
]

const HERO_POINTS = [
  "Actuele voorraad uit CRM",
  "Veilig betalen via Mollie",
  "Snelle levering of afhalen op afspraak",
]

type ShopStep = { title: string; description: string; href?: string; label?: string }

const ORDER_STEPS: ShopStep[] = [
  {
    title: "Kies je product",
    description: "Filter op categorie, vergelijk details en stel je aantal in.",
  },
  {
    title: "Kies levering en e-mail",
    description: "Selecteer verzending of gratis afhalen en vul je e-mail in.",
  },
  {
    title: "Rond veilig af",
    description: "Je betaalt via Mollie en ontvangt direct je orderbevestiging.",
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
                  3D prints in kleine oplage, direct bestelbaar
                </h1>
                <p className="mt-4 max-w-3xl text-lg text-slate-600 md:mx-auto lg:mx-0">
                  Bestel functionele en decoratieve prints die in-house worden geproduceerd en gecontroleerd.
                  Je ziet live voorraad, kiest zelf levering of afhalen, en rekent veilig af via Mollie.
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
                    href="/shop#shop-collection"
                    wrapperClassName="w-full sm:w-auto"
                    className="w-full justify-center sm:w-auto"
                  >
                    Shop nu
                  </ShimmerButton>
                  <Link
                    href="/contact"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 sm:w-auto"
                  >
                    Krijg advies op maat
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

