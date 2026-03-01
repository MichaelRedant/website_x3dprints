// app/en/locaties/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import GlassOrb from "@/components/GlassOrb"
import ContentTableOfContents from "@/components/ContentTableOfContents"
import { buildLocalBusinessSchema, buildOfferCatalog, buildServiceSchema, SchemaOfferInput } from "@/lib/seo"
import { getLocationBySlug, getEnglishLocationSlugs } from "@/lib/locations"

export const revalidate = 21600 // 6h rebuild

const canonical = "https://www.x3dprints.be/en/locaties/"
const pageDescription =
  "Overview of local landing pages: 3D printing per city. Quickly jump to your region with strong internal linking."

export const metadata: Metadata = {
  title: "3D printing per city | X3DPrints",
  description: pageDescription,
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/locaties/",
      "en-BE": canonical,
      "x-default": "https://www.x3dprints.be/locaties/",
    },
  },
  openGraph: {
    title: "3D printing per city",
    description: pageDescription,
    url: canonical,
    siteName: "X3DPrints",
    type: "website",
    locale: "en_BE",
  },
  robots: { index: true, follow: true, "max-snippet": -1 },
}

export default function LocationsPageEn() {
  const tocItems = [
    { id: "locations-pillars", label: "Start with the 3D printing pillar" },
    { id: "locations-overview", label: "Overview by city" },
    { id: "locations-sources", label: "Sources and references" },
  ]
  const references = [
    { label: "Google docs: local SEO basics", url: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide" },
    { label: "Schema.org ItemList", url: "https://schema.org/ItemList" },
    { label: "Google docs: crawlable links", url: "https://developers.google.com/search/docs/crawling-indexing/links-crawlable" },
  ]
  const lastUpdatedLabel = "Last updated: February 6, 2026"

  const slugs = getEnglishLocationSlugs()
  const locations = slugs
    .map((slug) => ({ slug, city: getLocationBySlug(slug)?.city ?? slug }))
    .sort((a, b) => a.city.localeCompare(b.city, "en"))

  const grouped: Record<string, { slug: string; city: string }[]> = {}
  for (const loc of locations) {
    const k = (loc.city?.[0] ?? "#").toUpperCase()
    if (!grouped[k]) grouped[k] = []
    grouped[k].push(loc)
  }
  const letters = Object.keys(grouped).sort()

  const localOffers: SchemaOfferInput[] = [
    { serviceName: "3D printing in Herzele", price: "EUR 5", description: "Fast prototyping and small to large batches." },
    { serviceName: "3D printing in Ghent", price: "EUR 5", description: "PLA, PETG and TPU for creative teams." },
    { serviceName: "3D printing in Aalst", price: "EUR 0", description: "Free intake plus material suggestion call." },
  ]

  const itemList = locations.slice(0, 100).map((loc, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `https://www.x3dprints.be/en/${loc.slug}`,
    name: `3D printing in ${loc.city}`,
  }))

  const catalogJsonLd = buildOfferCatalog("Local 3D printing services", localOffers)
  const localBusinessJsonLd = buildLocalBusinessSchema({
    description: pageDescription,
    pageUrl: canonical,
    image: "/images/og-home.svg",
    areaServed: "Ghent, Herzele, Aalst and surroundings",
    priceRange: "EUR 0 - EUR 5",
  })
  const serviceJsonLd = buildServiceSchema("Local 3D printing service", localOffers, canonical)

  return (
    <main className="relative overflow-clip px-4 pb-20 pt-12 sm:px-6 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-white to-teal-50" />
        <div className="absolute -top-32 -left-28 h-[26rem] w-[26rem] rounded-full bg-cyan-200/30 blur-3xl sm:h-[32rem] sm:w-[32rem]" />
        <div className="absolute -bottom-32 -right-28 h-[28rem] w-[28rem] rounded-full bg-teal-200/30 blur-3xl sm:h-[36rem] sm:w-[36rem]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(#000_1px,transparent_1px)] [background-size:12px_12px]" />
      </div>

      <header
        className="
          mx-auto grid max-w-5xl grid-cols-1 items-center gap-6 rounded-3xl
          border border-white/30 bg-white/50 p-6 sm:grid-cols-[1.3fr,0.7fr] sm:p-8
          backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)]
          animate-[fadeInUp_.6s_ease_out_0s_both]
        "
      >
        <div className="text-center sm:text-left">
          <p className="text-xs font-semibold tracking-wide text-teal-700">Local landing pages</p>
          <h1 className="mt-2 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            3D printing per city
          </h1>
          <p className="mx-auto mt-3 max-w-prose text-slate-600 sm:mx-0">
            Find your local page and request a quote fast. Compact overview, strong internal linking, and SEO-ready structure.
          </p>
          <p className="mt-2 text-xs font-medium uppercase tracking-[0.15em] text-slate-500">{lastUpdatedLabel}</p>
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
          <ContentTableOfContents title="Contents" items={tocItems} className="mt-6 max-w-xl" />
        </div>

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

      <section id="locations-pillars" className="scroll-mt-28 mx-auto mt-8 max-w-5xl">
        <div className="rounded-3xl border border-white/30 bg-white/70 px-6 py-5 text-center backdrop-blur shadow-[0_8px_28px_rgba(0,0,0,0.06)] sm:text-left sm:px-8 sm:py-6">
          <h2 className="text-xl font-semibold text-slate-900">New to 3D printing?</h2>
          <p className="mt-2 text-sm text-slate-700">
            Explore the 3D printing pillar with materials, pricing examples, workflow and FAQ. Ready to order? Request a quote right
            away.
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            <Link
              href="/en/3d-printen"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200/70 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
            >
              Go to 3D printing
            </Link>
            <Link
              href="/en/pricing"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200/70 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
            >
              Pricing
            </Link>
            <Link
              href="/en/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200/70 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
            >
              Request a quote
            </Link>
          </div>
          <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
            <Link
              href="/en/materials#material-suggestion-tool"
              className="rounded-full border border-slate-200/70 bg-white/70 px-3 py-1.5 transition hover:-translate-y-0.5 hover:bg-white"
            >
              Material Suggestion Tool
            </Link>
            <Link
              href="/en/segments/3d-printing-marketing"
              className="rounded-full border border-slate-200/70 bg-white/70 px-3 py-1.5 transition hover:-translate-y-0.5 hover:bg-white"
            >
              Retail & marketing
            </Link>
            <Link
              href="/en/segments/3d-printing-tabletop"
              className="rounded-full border border-slate-200/70 bg-white/70 px-3 py-1.5 transition hover:-translate-y-0.5 hover:bg-white"
            >
              Tabletop & hobby
            </Link>
            <Link
              href="/en/segments/3d-printing-makers"
              className="rounded-full border border-slate-200/70 bg-white/70 px-3 py-1.5 transition hover:-translate-y-0.5 hover:bg-white"
            >
              Consumer prints
            </Link>
          </div>
        </div>
      </section>

      <section
        id="locations-overview"
        className="
          scroll-mt-28
          mx-auto mt-10 max-w-5xl rounded-3xl border border-white/30 bg-white/60 p-6 sm:p-8
          backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.06)]
        "
      >
        {locations.length > 0 && (
          <div className="animate-[fadeIn_.6s_ease_out_.05s_both]">
            <h2 className="text-sm font-semibold text-slate-900">Featured cities</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {locations.slice(0, 12).map((loc) => (
                <li key={loc.slug}>
                  <Link
                    href={`/en/${loc.slug}`}
                    className="rounded-full border border-white/30 bg-white/70 px-3 py-1.5 text-xs text-slate-700 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:text-slate-900"
                  >
                    3D printing in {loc.city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

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
                      href={`/en/${loc.slug}`}
                      className="inline-block rounded-full border border-white/30 bg-white/70 px-3 py-1.5 text-xs text-slate-700 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:text-slate-900"
                    >
                      3D printing in {loc.city}
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
          <h2 className="text-xl font-semibold text-slate-900">Sources and references</h2>
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "ItemList", itemListElement: itemList }) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />

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
