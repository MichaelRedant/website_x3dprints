import type { Metadata } from "next"
import Link from "next/link"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import Faq from "@/components/Faq"
import { SITE, buildLocalBusinessSchema, buildServiceSchema, SchemaOfferInput } from "@/lib/seo"

export const metadata: Metadata = {
  title: "3D printing voor tabletop minis | X3DPrints",
  description:
    "D&D en Warhammer minis, dice towers en scenery met haarscherp detail. PLA Matte, PETG, TPU. Ontwerp van het 3D model niet inbegrepen; STL/STEP aanleveren of ontwerpservice aan €45/uur.",
  alternates: { canonical: "https://www.x3dprints.be/segments/3d-printing-tabletop/", languages: { "nl-BE": "https://www.x3dprints.be/segments/3d-printing-tabletop/", en: "https://www.x3dprints.be/en/segments/3d-printing-tabletop/", "x-default": "https://www.x3dprints.be/segments/3d-printing-tabletop/", }, },
  openGraph: {
    title: "3D printing voor tabletop minis",
    description:
      "Detailprints voor Dungeons & Dragons en Warhammer: minis, bases, dice towers. Levering via EV-zones, ontwerpmodel niet inbegrepen.",
    url: "https://www.x3dprints.be/segments/3d-printing-tabletop/",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630 }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: { card: "summary_large_image" },
}

const materials = [
  { title: "PLA Matte", copy: "Mat en strak voor minis die je gaat primen en schilderen. Kleine features blijven scherp." },
  { title: "PLA Tough / PETG", copy: "Taaiere minis en scenery die tegen vallen kunnen of in warme tassen zitten." },
  { title: "TPU", copy: "Rubber feet of dempers onder dice towers en trays zodat verf en tafel beschermd blijven." },
]

const delivery = [
  "EV-levering: Zone 1 (tot 25 km) €15, Zone 2 €30, Zone 3 €45. Verder dan 75 km = maatwerk of pakketdienst.",
  "Breekbare minis worden gescheiden verpakt; dice towers kunnen in modules geleverd worden voor een gladde binnenhelling.",
  "Afhalen in Herzele op afspraak is gratis.",
]

const workflow = [
  "Aanleveren: stuur STL/STEP. Het ontwerp van het 3D model is niet inbegrepen in de printprijs; ontwerpservice kan aan €45/uur.",
  "Orientatie: we plaatsen gezicht/ornamenten naar boven voor minder supportscars; dunne zwaarden versterken we indien nodig.",
  "Layerhoogte: 0,12-0,16 mm voor minis, 0,2 mm voor terrain of dice towers om kosten en tijd te balanceren.",
  "Bases: we integreren 25/32/40 mm bases of voorzien pin-holes (2x1 of 3x2 mm) voor magneten in trays.",
  "Finishing: optioneel licht schuren + primer (grijs) zodat je direct kan schilderen.",
]

const faqItems = [
  {
    q: "Kan ik minis laten ontwerpen?",
    a: "Ja, maar ontwerp zit niet in de printprijs. Lever STL/STEP of vraag onze ontwerpservice aan €45/uur.",
  },
  {
    q: "Welke materialen gebruik je voor minis?",
    a: "PLA Matte voor strak detail, PETG of PLA Tough voor robuust gebruik, TPU voor rubber feet of dempers.",
  },
  {
    q: "Hoe lever je minis veilig?",
    a: "EV-levering in zones rond Herzele/Gent/Antwerpen of stevig verpakt via pakketdienst. Breekbare delen gaan in aparte compartimenten met schuim.",
  },
  {
    q: "Kan ik primer of schuren laten doen?",
    a: "Ja, we kunnen licht schuren en primeren (grijs). Vermeld het bij je aanvraag.",
  },
]

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",

  inLanguage: ["nl-BE", "en-BE"],
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
}

const pageUrl = String(
  metadata.alternates?.canonical ?? `${SITE.url}/segments/3d-printing-tabletop`,
)
const pageDescription = metadata.description ?? SITE.description

const serviceOffers: SchemaOfferInput[] = [
  {
    serviceName: "Tabletop & hobby 3D printing",
    price: "EUR 5",
    description: "Miniatures, terrain en accessoires in PLA Matte, PETG of TPU.",
    url: pageUrl,
  },
]

const localBusinessJsonLd = buildLocalBusinessSchema({
  pageUrl,
  description: pageDescription,
  image: "/images/og-home.jpg",
  areaServed: "Gent & Vlaanderen",
  priceRange: "EUR 5 - EUR 49",
})

const serviceJsonLd = buildServiceSchema("3D printing voor tabletop minis", serviceOffers, pageUrl)

export default function TabletopSegmentPage() {
  return (
    <main className="relative overflow-hidden px-4 pb-28 pt-12 sm:px-6 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50" />
        <div className="absolute -top-32 left-16 h-[24rem] w-[24rem] rounded-full bg-indigo-200/30 blur-[120px]" />
        <div className="absolute -bottom-32 right-10 h-[26rem] w-[26rem] rounded-full bg-sky-200/30 blur-[140px]" />
      </div>

      <header className="mx-auto max-w-4xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Segment</p>
        <h1 className="mt-3 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          3D printing voor tabletop minis
        </h1>
        <p className="mt-4 text-base text-slate-600">
          Dungeons & Dragons en Warhammer miniaturen, bases en dice towers met haarscherpe details. Lever klaar om te primen.
          Ontwerp van het 3D model is niet inbegrepen; je levert STL/STEP of we ontwerpen aan €45/uur.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
          <ShimmerButton href="/contact?material=pla-matte" event={ { action: "cta_click", category: "segments_tabletop", label: "discuss-minis" } }> Bespreek je minis</ShimmerButton>
          <Link
            href="/blog/3d-printen-mini-figuren"
            className="rounded-full border border-slate-300/70 bg-white/80 px-4 py-2 font-semibold text-slate-900 shadow-sm"
          >
            Lees blog miniaturen
          </Link>
          <Link
            href="/portfolio"
            className="rounded-full border border-slate-300/70 bg-white/80 px-4 py-2 font-semibold text-slate-900 shadow-sm"
          >
            Bekijk voorbeelden
          </Link>
          <Link
            href="/materials#material-suggestion-tool"
            className="rounded-full border border-slate-300/70 bg-white/80 px-4 py-2 font-semibold text-slate-900 shadow-sm"
          >
            Material Suggestion Tool
          </Link>
        </div>
      </header>

      <section className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-2">
        <GlassCard className="p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Aanbevolen materialen</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            {materials.map((material) => (
              <div key={material.title} className="rounded-3xl border border-slate-200/70 bg-white/70 p-4">
                <p className="font-semibold text-slate-900">{material.title}</p>
                <p className="mt-1 text-xs text-slate-600">{material.copy}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-500">
            Tip: gebruik 0,12-0,16 mm layers voor minis; 0,2 mm voor terrain/dice towers. Geef gewenste orientatie (gezicht
            naar boven) door om support-scars te vermijden.
          </p>
        </GlassCard>

        <GlassCard className="p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Best practices</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li>Wanddikte minis: min. 0,8-1 mm bij wapens en capes; wij versterken waar nodig.</li>
            <li>Bases integreren of pin-holes voor magneten (2x1 of 3x2 mm) voor movement trays.</li>
            <li>Dice towers in modules voor gladde binnenhelling; TPU feet voor grip.</li>
            <li>Ontwerp/model niet inbegrepen: lever STL/STEP of kies ontwerpservice aan €45/uur.</li>
          </ul>
          <p className="mt-4 text-xs text-slate-500">
            Gebruik de{" "}
            <Link
              href="/materials#material-suggestion-tool"
              className="font-semibold text-slate-900 underline decoration-slate-300 hover:decoration-slate-600"
            >
              Material Suggestion Tool
            </Link>{" "}
            voor een eerste materiaalkeuze.
          </p>
        </GlassCard>
      </section>

      <section className="mx-auto mt-10 max-w-5xl">
        <GlassCard className="p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Workflow</h2>
          <ol className="mt-4 space-y-2 text-sm text-slate-600">
            {workflow.map((step) => (
              <li key={step} className="flex items-start gap-2">
                <span className="mt-1 h-5 w-5 rounded-full bg-indigo-500 text-center text-xs font-semibold text-white">
                  {workflow.indexOf(step) + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </GlassCard>
      </section>

      <section className="mx-auto mt-10 max-w-5xl">
        <GlassCard className="p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Levering & veiligheid</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            {delivery.map((d) => (
              <li key={d} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" aria-hidden />
                <span>{d}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-slate-500">
            We verpakken minis gescheiden met schuim. Dice towers kunnen verlijmd of als losse modules geleverd worden.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <Link href="/pricing" className="rounded-full border border-slate-300/70 bg-white/80 px-4 py-2 font-semibold text-slate-900 shadow-sm">
              Prijzen & leverzones
            </Link>
            <Link href="/blog/3d-printen-mini-figuren" className="rounded-full border border-slate-300/70 bg-white/80 px-4 py-2 font-semibold text-slate-900 shadow-sm">
              Lees de miniaturen blog
            </Link>
            <Link href="/contact?material=pla-matte" className="rounded-full border border-slate-300/70 bg-white/80 px-4 py-2 font-semibold text-slate-900 shadow-sm">
              Start je aanvraag
            </Link>
          </div>
        </GlassCard>
      </section>

      <section className="mx-auto mt-12 max-w-4xl">
        <Faq title="FAQ voor tabletop minis" items={faqItems} />
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </main>
  )
}
