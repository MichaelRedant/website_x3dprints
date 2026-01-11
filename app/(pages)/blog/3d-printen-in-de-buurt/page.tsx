import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"

const canonical = "https://www.x3dprints.be/blog/3d-printen-in-de-buurt"

export const metadata: Metadata = {
  title: "3D printen in de buurt (Gent, Aalst, Dendermonde) | X3DPrints",
  description:
    "Zoek je een 3D printservice in de buurt van Gent, Aalst of Dendermonde? Ontdek hoe X3DPrints projecten lokaal oppikt met afhaling, levering en voorbeelden.",
  alternates: { canonical },
  openGraph: {
    title: "3D printen in de buurt (Gent, Aalst, Dendermonde)",
    description:
      "X3DPrints produceert in Herzele en levert in Gent, Aalst en Dendermonde. Bekijk voorbeelden, logistiek en hoe je snel een offerte krijgt.",
    url: canonical,
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "3D printen in de buurt" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D printen in de buurt",
    description: "Lokale 3D printservice voor Gent, Aalst en Dendermonde: voorbeelden, logistiek en persoonlijke aanpak.",
    images: ["/images/og-home.jpg"],
  },
}

const cityCards = [
  {
    city: "Gent",
    info: "Afhalen kan op 20 minuten rijden. Ideaal voor agencies, makers en scholen. Persoonlijke levering voor grotere projecten bespreekbaar.",
    examples: "Retail displays voor Gentse concept stores, onderdelen voor studentenprojecten UGent.",
  },
  {
    city: "Aalst",
    info: "Herzele ligt pal naast Aalst. Combineer meerdere onderdelen en haal ze in één rit op.",
    examples: "Industrieel maatwerk, montagehulpmiddelen voor KMO’s in Aalst en Ninove.",
  },
  {
    city: "Dendermonde",
    info: "Regelmatige ritten richting Dendermonde voor agencies en events. Alternatief: Bpost met track & trace binnen 24-48u.",
    examples: "Branding props, beursmateriaal en prototypes voor creatieve bureaus.",
  },
]

const process = [
  "Upload STL/STEP + korte context via de viewer of mail.",
  "Ontvang binnen één werkdag feedback over materiaal, timing en prijs.",
  "Kies logistiek: afhalen in Herzele, Bpost, of persoonlijke levering (Gent/Aalst/Dendermonde).",
  "Betaal via factuur of overschrijving; herhaalbestellingen verlopen nog sneller.",
]

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "3D printen in de buurt (Gent, Aalst, Dendermonde)",
  description:
    "Lokale gids voor 3D printen in Gent, Aalst en Dendermonde met logistieke opties en voorbeelden van gerealiseerde projecten.",
  author: {
    "@type": "Organization",
    name: "X3DPrints",
    url: "https://www.x3dprints.be",
  },
  publisher: {
    "@type": "Organization",
    name: "X3DPrints",
    url: "https://www.x3dprints.be",
    logo: {
      "@type": "ImageObject",
      url: "https://www.x3dprints.be/Logo.webp",
    },
  },
  mainEntityOfPage: canonical,
  url: canonical,
}

export default function LocalArticlePage() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(150%_85%_at_50%_-15%,rgba(99,102,241,0.16),transparent_70%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.07]" />

      <section className="px-6 pb-12 pt-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal className="stacked-content">
            <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
              <ol className="flex flex-wrap gap-2">
                <li>
                  <Link
                    href="/blog"
                    className="font-medium text-indigo-600 transition hover:text-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Blog
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="font-medium text-slate-700">3D printen in de buurt</li>
              </ol>
            </nav>
            <h1 className="mt-6 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              3D printen in de buurt: Gent, Aalst en Dendermonde
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              X3DPrints print in Herzele (tussen Gent en Aalst) en levert ook in Dendermonde. Geen grote fabrieksvloer, wel één aanspreekpunt dat je project persoonlijk opvolgt.
            </p>
            <div className="stacked-actions mt-6 flex flex-wrap gap-3 justify-center sm:justify-start">
              <ShimmerButton href="/contact">Plan afhaling of levering</ShimmerButton>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Bekijk voorbeelden
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {cityCards.map((city) => (
            <Reveal key={city.city}>
              <GlassCard className="h-full border border-white/40 bg-white/80 p-6 text-center shadow-lg backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{city.city}</p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900">3D printen in {city.city}</h2>
                <p className="mt-3 text-sm text-slate-600">{city.info}</p>
                <p className="mt-3 text-xs text-slate-500">Voorbeelden: {city.examples}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Voorbeelden van lokale projecten</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>Retail displays voor Gentse boetieks met PLA Matte en snel wisselende kleuren.</li>
                <li>Functionele hulpstukken voor Aalsterse KMO’s in PETG, geleverd tijdens een persoonlijke rit.</li>
                <li>Eventprops en giveaways voor Antwerpse agencies, inclusief strak geverfde afwerking.</li>
              </ul>
              <p className="mt-4 text-xs text-slate-500">
                Meer zien? Bekijk de{" "}
                <Link href="/portfolio" className="font-semibold text-slate-900 underline decoration-slate-300 hover:decoration-slate-600">
                  portfolio
                </Link>{" "}
                of vraag specifieke referenties.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Hoe werkt het?</h2>
              <ol className="mt-4 space-y-3 text-sm text-slate-600">
                {process.map((step, index) => (
                  <li key={step} className="flex gap-3">
                    <span className="font-semibold text-slate-900">{index + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <GlassCard className="flex flex-col gap-6 border border-white/40 bg-white/85 p-6 text-center shadow-xl backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:text-left">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Volgende stap</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Project in Gent, Aalst of Dendermonde?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Deel je STL/STEP en timing. We stemmen planning en levering samen af zodat alles vlot loopt.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/contact">Plan een gesprek</ShimmerButton>
                <Link href="/pricing" className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                  Bekijk tarieven
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <BlogReadMore />

    </main>
  )
}

