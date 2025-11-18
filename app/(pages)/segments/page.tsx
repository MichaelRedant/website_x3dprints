// app/(pages)/segments/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import GlassCard from "@/components/GlassCard"

type SegmentCard = {
  slug: string
  title: string
  description: string
  highlights: string[]
}

const segments: SegmentCard[] = [
  {
    slug: "segments/3d-printing-prototypes",
    title: "3D printing voor prototypes",
    description:
      "Snelle iteraties met PLA Matte of PLA Tough+ voor functionele tests. Perfect voor designteams en agencies.",
    highlights: [
      "Snelle turnaround en iteraties",
      "Feedback op DFM en materialen",
      "Offerte + planning afgestemd op jouw sprint",
    ],
  },
  {
    slug: "segments/3d-printing-scholen",
    title: "3D printing voor scholen",
    description:
      "Ondersteuning voor STEM- en ontwerptrajecten. Leerlingen sturen STL/STEP in en wij printen met begeleidende tips.",
    highlights: [
      "Educatieve pakketten en bulkprijzen",
      "Material Suggestion Tool voor studenten",
      "Plaats voor coaching en workshops",
    ],
  },
  {
    slug: "segments/3d-printing-modelbouwers",
    title: "3D printing voor modelbouwers",
    description:
      "PLA Wood, Marble en Translucent voor maquettes en scenery. We denken mee over detailniveau en nabewerking.",
    highlights: [
      "Speciale PLA blends (wood, silk, marble)",
      "Tips voor lijm, verf en assemblage",
      "Lokale afhaling voor fragiele stukken",
    ],
  },
  {
    slug: "segments/3d-printing-engineers",
    title: "3D printing voor engineers",
    description:
      "Precisieprints in PLA Tough+ of PETG voor jigs, fixtures en pre-production prototypes. Inclusief meetrapporten.",
    highlights: [
      "Typische tolerantie ±0,2 mm",
      "Functionaliteit gericht op sterkte en hittebestendigheid",
      "Makkelijk combineren met metaal/elektronica",
    ],
  },
  {
    slug: "segments/3d-printing-marketing",
    title: "3D printing voor marketing & events",
    description:
      "Eye-catching props, awards en merchandising in PLA Silk+, Marble en Translucent voor campagnes en activaties.",
    highlights: [
      "Showpieces klaar voor fotoshoots",
      "Snelle runs voor events en pop-ups",
      "Afstemming met agencies over look & feel",
    ],
  },
  {
    slug: "segments/3d-printing-makers",
    title: "3D printing voor makers & hobbyisten",
    description:
      "Lokale ondersteuning voor hobbyprojecten, custom onderdelen en repair-jobs. Flexibele planning en materiaaladvies.",
    highlights: [
      "Combineer prints met elektronica of hout",
      "Kies tussen snelle PLA of duurzame PETG",
      "Afhalen in Herzele of verzending in België",
    ],
  },
]

export const metadata: Metadata = {
  title: "3D printing per segment | X3DPrints",
  description: "Landingpagina’s voor veelgevraagde 3D print segmenten: prototypes, scholen, modelbouwers en engineers.",
  alternates: { canonical: "https://www.x3dprints.be/segments" },
  openGraph: {
    title: "3D printing per segment",
    description: "Vind de juiste 3D print informatie voor prototypes, onderwijs, modelbouwers en engineers.",
    url: "https://www.x3dprints.be/segments",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630 }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: { card: "summary_large_image" },
}

export default function SegmentsPage() {
  const itemList = segments.map((segment, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `https://www.x3dprints.be/${segment.slug}`,
    name: segment.title,
  }))

  return (
    <main className="relative overflow-clip px-4 pb-24 pt-12 sm:px-6 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-slate-50" />
        <div className="absolute -top-32 left-16 h-[24rem] w-[24rem] rounded-full bg-indigo-200/30 blur-[120px]" />
        <div className="absolute -bottom-32 right-10 h-[26rem] w-[26rem] rounded-full bg-sky-200/30 blur-[140px]" />
      </div>

      <header className="mx-auto max-w-4xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Segmenten</p>
        <h1 className="mt-3 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          3D printing per doelgroep
        </h1>
        <p className="mt-4 text-base text-slate-600">
          Van prototypes en onderwijs tot modelbouwers, marketingteams en engineers: kies je segment en ontdek hoe X3DPrints het verschil maakt.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm text-slate-700">
          <Link
            href="/materials#material-suggestion-tool"
            className="rounded-full border border-slate-300/70 bg-white/80 px-4 py-2 font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
          >
            Material Suggestion Tool
          </Link>
          <Link
            href="/blog"
            className="rounded-full border border-slate-300/70 bg-white/80 px-4 py-2 font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
          >
            Lees de blog
          </Link>
        </div>
      </header>

      <section className="mx-auto mt-12 max-w-5xl space-y-6">
        {segments.map((segment) => (
          <GlassCard key={segment.slug} className="p-6 sm:p-8">
            <div className="sm:flex sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Segment</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">{segment.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{segment.description}</p>
              </div>
              <Link
                href={`/${segment.slug}`}
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white sm:mt-0"
              >
                Naar segment <span aria-hidden>-&gt;</span>
              </Link>
            </div>
            <ul className="mt-4 grid gap-2 text-sm text-slate-600 md:grid-cols-2">
              {segment.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" aria-hidden />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        ))}
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({ "@context": "https://schema.org", "@type": "ItemList", itemListElement: itemList }),
        }}
      />
    </main>
  )
}
