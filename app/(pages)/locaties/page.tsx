// app/locaties/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import GlassOrb from "@/components/GlassOrb"
import ContentTableOfContents from "@/components/ContentTableOfContents"
import { SITE, buildLocalBusinessSchema, buildOfferCatalog, buildServiceSchema, SchemaOfferInput } from "@/lib/seo"
import { getAllLocationSlugs, getLocationBySlug } from "@/lib/locations"

export const revalidate = 21600 // 6u heropbouw

export const metadata: Metadata = {
  title: "3D printen België per stad | X3DPrints",
  description:
    "Overzicht van lokale landingspaginas voor 3D printen in België, inclusief regio's zoals Gent, Aalst en Herzele. Navigeer snel naar je stad en vraag offerte.",
  alternates: { canonical: "https://www.x3dprints.be/locaties/" },
  openGraph: {
    title: "3D printen in België per stad",
    description:
      "Lokale overzichtspagina voor 3D printen in België. Vind meteen je stad en vraag een snelle offerte aan.",
    url: "https://www.x3dprints.be/locaties",
    siteName: "X3DPrints",
    type: "website",
    locale: "nl_BE",
  },
  robots: { index: true, follow: true, "max-snippet": -1 },
}

export default function Page() {
  const tocItems = [
    { id: "locations-pillars", label: "Start met de 3D-printen pillar" },
    { id: "locations-overview", label: "Overzicht per stad" },
    { id: "locations-sources", label: "Bronnen en referenties" },
  ]
  const references = [
    { label: "Google docs: local SEO basics", url: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide" },
    { label: "Schema.org ItemList", url: "https://schema.org/ItemList" },
    { label: "Google docs: crawlable links", url: "https://developers.google.com/search/docs/crawling-indexing/links-crawlable" },
  ]
  const lastUpdatedLabel = "Laatst bijgewerkt: 6 februari 2026"

  // Lijst bouwen en sorteren
  const slugs = getAllLocationSlugs()
  const locations = slugs
    .map((slug) => ({ slug, city: getLocationBySlug(slug)?.city ?? slug }))
    .sort((a, b) => a.city.localeCompare(b.city, "nl"))

  // Groeperen op initiaal
  const grouped: Record<string, { slug: string; city: string }[]> = {}
  for (const loc of locations) {
    const k = (loc.city?.[0] ?? "#").toUpperCase()
    if (!grouped[k]) grouped[k] = []
    grouped[k].push(loc)
  }
  const letters = Object.keys(grouped).sort()

  const localOffers: SchemaOfferInput[] = [
    { serviceName: "3D printen in Herzele", price: "EUR 5", description: "Snel prototyping en zowel kleine als grotere batches." },
    { serviceName: "3D printen in Gent", price: "EUR 5", description: "PLA, PETG en TPU voor creatieve teams." },
    { serviceName: "3D printen in Aalst", price: "EUR 0", description: "Gratis intake + material suggestion call." },
  ]

  // JSON-LD ItemList (cap op 100)
  const itemList = locations.slice(0, 100).map((loc, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `https://www.x3dprints.be/${loc.slug}`,
    name: `3D printen in ${loc.city}`,
  }))

  const pageDescription = metadata.description ?? ""
  const canonicalUrl =
    typeof metadata.alternates?.canonical === "string" ? metadata.alternates.canonical : `${SITE.url}/locaties`
  const catalogJsonLd = buildOfferCatalog("Lokale 3D print services", localOffers)
  const localBusinessJsonLd = buildLocalBusinessSchema({
    description: pageDescription,
    pageUrl: canonicalUrl,
    image: "/images/og-home.jpg",
    areaServed: "Gent, Herzele, Aalst en omstreken",
    priceRange: "EUR 0 - EUR 5",
  })
  const serviceJsonLd = buildServiceSchema("Lokale 3D print service", localOffers, canonicalUrl)

  return (
    <main className="relative overflow-clip px-4 pb-20 pt-12 sm:px-6 lg:px-8">
      {/* Achtergrond: zachte gradient + stippenraster + orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-white to-teal-50" />
        <div className="absolute -top-32 -left-28 h-[26rem] w-[26rem] rounded-full bg-cyan-200/30 blur-3xl sm:h-[32rem] sm:w-[32rem]" />
        <div className="absolute -bottom-32 -right-28 h-[28rem] w-[28rem] rounded-full bg-teal-200/30 blur-3xl sm:h-[36rem] sm:w-[36rem]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(#000_1px,transparent_1px)] [background-size:12px_12px]" />
      </div>

      {/* HERO */}
      <header
        className="
          mx-auto grid max-w-5xl grid-cols-1 items-center gap-6 rounded-3xl
          border border-white/30 bg-white/50 p-6 sm:grid-cols-[1.3fr,0.7fr] sm:p-8
          backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)]
          animate-[fadeInUp_.6s_ease_out_0s_both]
        "
      >
        <div className="text-center sm:text-left">
          <p className="text-xs font-semibold tracking-wide text-teal-700">Lokale landingspaginas</p>
          <h1 className="mt-2 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            3D printen per stad
          </h1>
          <p className="mx-auto mt-3 max-w-prose text-slate-600 sm:mx-0">
            Vind je lokale pagina voor 3D printen in België, bijvoorbeeld 3D printen Gent, en vraag snel je offerte
            aan. Compact overzicht met sterke interne linking voor bezoekers en crawlers.
          </p>
          <p className="mt-2 text-xs font-medium uppercase tracking-[0.15em] text-slate-500">{lastUpdatedLabel}</p>

          {/* Snelle letter-index */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            {letters.map((l) => (
              <a
                key={l}
                href={`#letter-${l}`}
                className="rounded-full border border-white/30 bg-white/70 px-3 py-1.5 text-xs text-slate-700 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:text-slate-900"
              >
                {l}
              </a>
            ))}
          </div>
          <ContentTableOfContents title="Inhoud" items={tocItems} className="mt-6 max-w-xl" />
        </div>

        {/* Visual: GlassOrb met lichte drift-animatie */}
        <div
          className="
            relative mx-auto hidden aspect-square w-48 items-center justify-center overflow-visible rounded-2xl
            ring-1 ring-white/30 sm:flex md:w-56
          "
          aria-hidden
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-300/20 via-transparent to-cyan-300/25" />
          <div className="animate-[float_7s_ease-in-out_infinite]">
            <div className="animate-[slowSpin_22s_linear_infinite]">
              <GlassOrb className="h-40 w-40 md:h-48 md:w-48" />
            </div>
          </div>
          <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
        </div>
      </header>

      {/* CTA naar pillar */}
      <section id="locations-pillars" className="scroll-mt-28 mx-auto mt-8 max-w-5xl">
        <div className="rounded-3xl border border-white/30 bg-white/70 px-6 py-5 text-center backdrop-blur shadow-[0_8px_28px_rgba(0,0,0,0.06)] sm:text-left sm:px-8 sm:py-6">
          <h2 className="text-xl font-semibold text-slate-900">Meer weten over 3D printen?</h2>
          <p className="mt-2 text-sm text-slate-700">
            Bekijk de 3D-printen pillar met materialen, prijsvoorbeelden, workflow en FAQ. Klaar om te bestellen? Vraag meteen een offerte.
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            <Link
              href="/3d-printen"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200/70 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
            >
              Naar 3D printen
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200/70 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
            >
              Prijzen
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200/70 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
            >
              Offerte aanvragen
            </Link>
          </div>
          <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
            <Link
              href="/materials#material-suggestion-tool"
              className="rounded-full border border-slate-200/70 bg-white/70 px-3 py-1.5 transition hover:-translate-y-0.5 hover:bg-white"
            >
              Material Suggestion Tool
            </Link>
            <Link
              href="/segments/3d-printing-marketing"
              className="rounded-full border border-slate-200/70 bg-white/70 px-3 py-1.5 transition hover:-translate-y-0.5 hover:bg-white"
            >
              Retail & marketing
            </Link>
            <Link
              href="/segments/3d-printing-tabletop"
              className="rounded-full border border-slate-200/70 bg-white/70 px-3 py-1.5 transition hover:-translate-y-0.5 hover:bg-white"
            >
              Tabletop & hobby
            </Link>
            <Link
              href="/segments/3d-printing-makers"
              className="rounded-full border border-slate-200/70 bg-white/70 px-3 py-1.5 transition hover:-translate-y-0.5 hover:bg-white"
            >
              Particulieren prints
            </Link>
          </div>
        </div>
      </section>

      {/* OVERZICHT */}
      <section
        id="locations-overview"
        className="
          scroll-mt-28
          mx-auto mt-10 max-w-5xl rounded-3xl border border-white/30 bg-white/60 p-6 sm:p-8
          backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.06)]
        "
      >
        {/* Top 12 uitgelicht als glass-pills */}
        {locations.length > 0 && (
          <div className="animate-[fadeIn_.6s_ease_out_.05s_both]">
            <h2 className="text-sm font-semibold text-slate-900">Aanbevolen steden</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {locations.slice(0, 12).map((loc) => (
                <li key={loc.slug}>
                  <Link
                    href={`/${loc.slug}`}
                    className="rounded-full border border-white/30 bg-white/70 px-3 py-1.5 text-xs text-slate-700 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:text-slate-900"
                  >
                    3D printen in {loc.city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Alfabetische secties, met subtiele stagger via index delay */}
        <div className="mt-8 space-y-8">
          {letters.map((l, idx) => (
            <div
              key={l}
              id={`letter-${l}`}
              className="scroll-mt-24"
              style={{ animationDelay: `${Math.min(idx * 50, 300)}ms` }}
            >
              <div className="mb-3 text-xs font-semibold tracking-wider text-slate-500">{l}</div>
              <ul
                className="
                  grid grid-cols-1 gap-2
                  sm:grid-cols-2
                  md:grid-cols-3
                  lg:grid-cols-4
                "
              >
                {grouped[l].map((loc) => (
                  <li key={loc.slug} className="animate-[fadeIn_.6s_ease_out_.05s_both]">
                    <Link
                      href={`/${loc.slug}`}
                      className="inline-block rounded-full border border-white/30 bg-white/70 px-3 py-1.5 text-xs text-slate-700 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:text-slate-900"
                    >
                      3D printen in {loc.city}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="locations-sources" className="scroll-mt-28 mx-auto mt-10 max-w-5xl">
        <div className="rounded-3xl border border-white/30 bg-white/70 px-6 py-5 backdrop-blur shadow-[0_8px_28px_rgba(0,0,0,0.06)] sm:px-8 sm:py-6">
          <h2 className="text-xl font-semibold text-slate-900">Bronnen en referenties</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            {references.map((reference) => (
              <li key={reference.url} className="rounded-xl border border-slate-200/70 bg-white/80 px-4 py-3">
                <cite className="not-italic">
                  <Link href={reference.url} target="_blank" rel="noreferrer" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    {reference.label}
                  </Link>
                </cite>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "ItemList", itemListElement: itemList }) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      {/* Keyframes + reduced-motion respect */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes fadeInUp { from { opacity:.0; transform: translateY(8px) } to { opacity:1; transform: translateY(0) } }
          @keyframes fadeIn { from { opacity:.0 } to { opacity:1 } }
          @keyframes slowSpin { to { transform: rotate(360deg) } }
          @keyframes float { 0%,100% { transform: translateY(-4px) } 50% { transform: translateY(4px) } }

          @media (prefers-reduced-motion: reduce) {
            * { animation: none !important; transition: none !important }
          }
        `,
        }}
      />
    </main>
  )
}

