import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import ReadMoreLinks from "@/components/ReadMoreLinks"
import ShopProductGrid from "@/components/ShopProductGrid"
import type { ShopProduct } from "@/content/shop-products"
import { SITE, buildBreadcrumbSchema, buildFaqPageSchema, buildItemListSchema } from "@/lib/seo"
import { getShopProducts } from "@/lib/shop-data"

export const metadata: Metadata = {
  title: "3D print shop met praktische producten | X3DPrints",
  description:
    "Bekijk praktische 3D print producten, accessoires, organizers, outdoor onderdelen en reststock bij X3DPrints. Controleer beschikbaarheid en vraag snel je shopofferte aan.",
  alternates: {
    canonical: `${SITE.url}/shop/`,
    languages: {
      "nl-BE": `${SITE.url}/shop/`,
      "en-BE": `${SITE.url}/en/shop/`,
      "x-default": `${SITE.url}/shop/`,
    },
  },
  openGraph: {
    title: "3D print shop met praktische producten",
    description:
      "Praktische 3D print producten, accessoires, organizers, outdoor onderdelen en reststock met duidelijke beschikbaarheid en offerte-opvolging.",
    url: `${SITE.url}/shop/`,
    images: [{ url: "/images/og-shop-nl.svg", width: 1200, height: 630 }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D print shop met praktische producten | X3DPrints",
    description: "Praktische 3D print producten, outdoor onderdelen en accessoires met duidelijke beschikbaarheid via X3DPrints.",
    images: ["/images/og-shop-nl.svg"],
  },
}

const HIGHLIGHTS = [
  {
    title: "Actuele beschikbaarheid",
    description: "Je ziet meteen welke 3D print producten beschikbaar zijn en welke aanvragen we snel kunnen opvolgen.",
  },
  {
    title: "Praktische shopproducten",
    description: "De shop groeit met accessoires, organizers, outdoor onderdelen, reststock en functionele producten die logisch aansluiten op X3DPrints.",
  },
  {
    title: "Offerteflow als standaard",
    description: "Voor beperkte stock, verzending of afhalen starten we via een offerteaanvraag zodat aantal en levering eerst correct bevestigd worden.",
  },
]

type ShopStep = { title: string; description: string; href?: string; label?: string }
type ShopResource = { title: string; description: string; href: string; label: string }
type ShopOverviewRow = {
  item: string
  useCase: string
  availability: string
  fulfilment: string
}
type ShopFaqItem = { q: string; a: string }

const MODEL_RESOURCES: ShopResource[] = [
  {
    title: "Vind mijn 3D model",
    description:
      "Heb je nog geen bestand of model? Gebruik onze gids om een geschikt ontwerp te zoeken dat je daarna kan laten printen.",
    href: "/3d-modellen-vinden",
    label: "Zoek een model om te laten printen",
  },
  {
    title: "3D modelleren op maat",
    description:
      "Bestaat het onderdeel of idee nog niet? Dan werken we een model op maat uit op basis van schetsen, foto's of je praktische vraag.",
    href: "/3d-modelleren",
    label: "Laat een model op maat uitwerken",
  },
]

const ORDER_STEPS: ShopStep[] = [
  {
    title: "Kies je product",
    description: "Open de productpagina, bekijk de details en geef het gewenste aantal of je vraag door.",
  },
  {
    title: "Vraag je shopofferte aan",
    description: "Via de productpagina of contactpagina stuur je een aanvraag met eventuele extra vragen over levering of afhalen.",
  },
  {
    title: "Ontvang bevestiging",
    description: "Je krijgt antwoord met beschikbaarheid, prijsbevestiging, verzending of afhalen en de volgende praktische stap.",
  },
]

const SHOP_USE_CASES: Record<string, string> = {
  "bambu-reusable-spool": "Extra spool voor Bambu refills, reserve of hergebruik in je filamentworkflow",
  "selectieve-hoornaarval-deksel":
    "3D geprint deksel voor een selectieve hoornaarval tegen de Aziatische hoornaar, bedoeld voor glazen potten, monitoring en lokale acties",
}

const SHOP_FAQ: ShopFaqItem[] = [
  {
    q: "Wat vind ik in de 3D print shop van X3DPrints?",
    a: "In de shop vind je geselecteerde 3D print producten die we effectief kunnen opvolgen: accessoires, organizers, reststock, reserveonderdelen en andere praktische items die passen bij onze printservice.",
  },
  {
    q: "Kan ik in deze shop ook nicheproducten of seizoensgebonden items aanvragen?",
    a: "Ja. Naast algemene accessoires en organizers zetten we ook nicheproducten online die inhoudelijk sterk passen bij X3DPrints, zoals outdoor onderdelen, monitoringitems of kleine reeksen voor specifieke toepassingen.",
  },
  {
    q: "Waarom starten veel shopbestellingen via een offerteaanvraag?",
    a: "Voor beperkte stock, afhalen, verzending of kleine variaties kiezen we bewust voor een offerteflow. Zo kunnen we aantal, leverwijze en praktische details eerst correct bevestigen voor we je bestelling inplannen.",
  },
  {
    q: "Kan ik ook zonder eigen 3D model iets laten printen?",
    a: "Ja. Gebruik de pagina 'Vind mijn 3D model' als je een bestaand model wil zoeken, of ga naar '3D modelleren' als je een onderdeel of idee op maat wil laten uitwerken.",
  },
  {
    q: "Hoe weet ik of een product op voorraad is?",
    a: "Per product tonen we de actuele status, zoals op voorraad, beperkt beschikbaar of op bestelling. Bij een aanvraag bevestigen we ook nog eens het aantal, de verzending en eventuele afhaalopties.",
  },
]

function getAvailabilityLabel(product: ShopProduct) {
  if (product.availability === "OutOfStock") return "Momenteel niet beschikbaar"
  if (product.availability === "PreOrder") return "Op bestelling"
  if (product.availability === "LimitedAvailability") return "Beperkt beschikbaar"
  if (product.availability === "InStock") return "Op voorraad"
  return "Beschikbaarheid op aanvraag"
}

function getFulfilmentLabel(product: ShopProduct) {
  if (product.purchaseMode === "inquiry") {
    return "Via offerteformulier, met bevestiging van aantal, verzending of afhalen"
  }
  return "Rechtstreeks bestellen"
}

export default async function ShopPage() {
  const liveProducts = (await getShopProducts("nl")).filter((product) => product.isLive)
  const shopOverview: ShopOverviewRow[] = liveProducts.map((product) => ({
    item: product.name.nl,
    useCase: SHOP_USE_CASES[product.slug] ?? product.summary.nl,
    availability: getAvailabilityLabel(product),
    fulfilment: getFulfilmentLabel(product),
  }))

  const itemListJsonLd =
    liveProducts.length > 0
      ? buildItemListSchema({
          name: "3D print shop producten",
          inLanguage: "nl-BE",
          items: liveProducts.map((product) => ({
            name: product.name.nl,
            url: `${SITE.url}/shop/${product.slug}/`,
          })),
        })
      : null

  const faqJsonLd = buildFaqPageSchema({
    items: SHOP_FAQ,
    inLanguage: "nl-BE",
    mainEntityOfPage: `${SITE.url}/shop/`,
  })

  const breadcrumbJsonLd = buildBreadcrumbSchema({
    id: `${SITE.url}/shop/#breadcrumb`,
    inLanguage: "nl-BE",
    items: [
      { name: "Home", url: `${SITE.url}/` },
      { name: "Shop", url: `${SITE.url}/shop/` },
    ],
  })

  return (
    <main className="flex-1">
      <section className="px-6 pb-14 pt-20 sm:px-8 lg:px-12 xl:pb-16">
        <div className="mx-auto max-w-[96rem] 2xl:max-w-[108rem]">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 p-6 sm:p-8 xl:p-10">
              <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-indigo-200/45 blur-3xl" />
              <div aria-hidden className="pointer-events-none absolute -bottom-24 left-10 h-56 w-56 rounded-full bg-cyan-200/40 blur-3xl" />
              <div className="relative min-w-0 md:text-center lg:text-left">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Shop</p>
                <h1 className="mt-4 break-words text-balance text-4xl font-extrabold text-slate-900 sm:text-5xl">
                  3D print shop met praktische producten, accessoires en voorraaditems
                </h1>
                <p className="mt-4 max-w-3xl break-words text-lg text-slate-600 md:mx-auto lg:mx-0">
                  In deze 3D print shop bundelen we praktische 3D print producten: van accessoires en reststock tot
                  organizers, outdoor onderdelen, reserveonderdelen en andere functionele items die je via X3DPrints
                  kan aanvragen.
                </p>
                <p className="mt-3 max-w-3xl break-words text-sm text-slate-600 md:mx-auto lg:mx-0">
                  De standaardflow blijft een offerteaanvraag. Zo bevestigen we aantal, prijs, verzending of afhalen
                  eerst correct, zeker bij beperkte stock of praktische leverafspraken.
                </p>
                <p className="mt-3 max-w-3xl break-words text-sm text-slate-600 md:mx-auto lg:mx-0">
                  Voor standaard shopproducten voor consumenten geldt in principe het gewone kader voor herroeping bij
                  online verkoop. Bekijk het volledige{" "}
                  <Link href="/retour-herroepingsrecht" className="font-semibold text-indigo-600 underline-offset-2 hover:underline">
                    retour- en herroepingsrecht
                  </Link>
                  .
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:justify-center lg:justify-start">
                  <ShimmerButton
                    href="#shop-collection"
                    wrapperClassName="w-full sm:w-auto"
                    className="w-full justify-center sm:w-auto"
                  >
                    Bekijk shopcollectie
                  </ShimmerButton>
                  <Link
                    href="/contact?quote=Shop%20offerte%20aanvraag"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 sm:w-auto"
                  >
                    Vraag shopofferte aan
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-16 sm:px-8 lg:px-12 xl:pb-20">
        <div className="mx-auto max-w-[96rem] 2xl:max-w-[108rem]">
          <Reveal>
            <GlassCard className="min-w-0 md:text-center lg:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                Nog geen 3D model?
              </p>
              <h2 className="mt-3 break-words text-balance text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Zoek een bestaand model of laat ons het voor je modelleren
              </h2>
              <p className="mt-4 max-w-3xl break-words text-sm text-slate-600 md:mx-auto lg:mx-0">
                Heb je nog geen model of bestand? Geen probleem. Je kan zelf een bestaand ontwerp zoeken of ons
                vragen om een model op maat uit te werken, zodat je sneller van idee naar print vertrekt.
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {MODEL_RESOURCES.map((item) => (
                  <div
                    key={item.title}
                    className="min-w-0 rounded-2xl border border-slate-100 bg-white/70 p-5 md:text-center lg:text-left"
                  >
                    <h3 className="break-words text-lg font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-2 break-words text-sm text-slate-600">{item.description}</p>
                    <Link
                      href={item.href}
                      className="mt-4 inline-flex items-center gap-2 break-words text-sm font-semibold text-indigo-600 transition hover:text-indigo-500 md:justify-center lg:justify-start"
                    >
                      {item.label}
                      <span className="i-lucide-arrow-right" aria-hidden />
                    </Link>
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <ShopProductGrid products={liveProducts} locale="nl" />

      <section className="px-6 pb-16 sm:px-8 lg:px-12 xl:pb-20">
        <div className="mx-auto max-w-[96rem] 2xl:max-w-[108rem]">
          <Reveal>
            <GlassCard className="min-w-0 md:text-center lg:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                Shopoverzicht
              </p>
              <h2 className="mt-3 break-words text-balance text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Beschikbare producten, toepassingen en bestelwijze
              </h2>
              <p className="mt-4 max-w-3xl break-words text-sm text-slate-600 md:mx-auto lg:mx-0">
                We zetten alleen producten online die we effectief kunnen opvolgen. Zo zie je snel wat beschikbaar
                is en hoe je elk product het best aanvraagt of bestelt.
              </p>
              <div className="mt-6 space-y-3 md:hidden">
                {shopOverview.map((row) => (
                  <div key={row.item} className="min-w-0 rounded-2xl border border-slate-100 bg-white/70 p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Product</p>
                    <p className="mt-1 break-words text-base font-semibold text-slate-900">{row.item}</p>
                    <div className="mt-4 grid gap-3">
                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Toepassing</p>
                        <p className="mt-1 break-words text-sm text-slate-700">{row.useCase}</p>
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Beschikbaarheid</p>
                        <p className="mt-1 break-words text-sm text-slate-700">{row.availability}</p>
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Bestelwijze</p>
                        <p className="mt-1 break-words text-sm text-slate-700">{row.fulfilment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 hidden overflow-x-auto rounded-2xl border border-slate-100 bg-white/70 md:block">
                <table className="min-w-[720px] w-full text-left text-sm text-slate-700">
                  <thead className="border-b border-slate-200 bg-slate-50/80">
                    <tr>
                      <th className="px-4 py-3 font-semibold text-slate-900">Product</th>
                      <th className="px-4 py-3 font-semibold text-slate-900">Toepassing</th>
                      <th className="px-4 py-3 font-semibold text-slate-900">Beschikbaarheid</th>
                      <th className="px-4 py-3 font-semibold text-slate-900">Bestelwijze</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shopOverview.map((row) => (
                      <tr key={row.item} className="border-b border-slate-100 last:border-b-0">
                        <td className="px-4 py-3 font-semibold text-slate-900 break-words">{row.item}</td>
                        <td className="px-4 py-3 break-words">{row.useCase}</td>
                        <td className="px-4 py-3 break-words">{row.availability}</td>
                        <td className="px-4 py-3 break-words">{row.fulfilment}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-16 sm:px-8 lg:px-12 xl:pb-20">
        <div className="mx-auto grid max-w-[96rem] gap-4 md:grid-cols-3 xl:gap-5 2xl:max-w-[108rem]">
          {HIGHLIGHTS.map((item) => (
            <Reveal key={item.title} delay={0.05}>
              <GlassCard className="min-w-0 h-full md:text-center lg:text-left">
                <h2 className="break-words text-lg font-semibold text-slate-900">{item.title}</h2>
                <p className="mt-2 break-words text-sm text-slate-600">{item.description}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 pb-20 sm:px-8 lg:px-12 xl:pb-24">
        <div className="mx-auto max-w-[96rem] 2xl:max-w-[108rem]">
          <GlassCard className="min-w-0 md:text-center lg:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              Standaard werkwijze
            </p>
            <p className="mt-3 max-w-3xl break-words text-sm text-slate-600 md:mx-auto lg:mx-0">
              Voor de meeste shopproducten bevestigen we eerst aantal, levering en eventuele bijzonderheden via een
              korte offerteflow.
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {ORDER_STEPS.map((item) => (
                <div key={item.title} className="min-w-0 rounded-2xl border border-slate-100 bg-white/70 p-4 md:text-center lg:text-left">
                  <h3 className="break-words text-base font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 break-words text-sm text-slate-600">{item.description}</p>
                  {item.href && item.label ? (
                    <Link
                      href={item.href}
                      className="mt-3 inline-flex items-center gap-2 break-words text-sm font-semibold text-indigo-600 transition hover:text-indigo-500 md:justify-center lg:justify-start"
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

      <section className="px-6 pb-20 sm:px-8 lg:px-12 xl:pb-24">
        <div className="mx-auto max-w-[96rem] 2xl:max-w-[108rem]">
          <GlassCard className="min-w-0 md:text-center lg:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              Shop FAQ
            </p>
            <h2 className="mt-3 break-words text-balance text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Veelgestelde vragen over de 3D print shop
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {SHOP_FAQ.map((item) => (
                <div key={item.q} className="min-w-0 rounded-2xl border border-slate-100 bg-white/70 p-5 md:text-center lg:text-left">
                  <h3 className="break-words text-base font-semibold text-slate-900">{item.q}</h3>
                  <p className="mt-2 break-words text-sm text-slate-600">{item.a}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      <ReadMoreLinks pageType="shop" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {itemListJsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      ) : null}
    </main>
  )
}
