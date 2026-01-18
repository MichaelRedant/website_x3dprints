import type { Metadata } from "next"
import Link from "next/link"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import Faq from "@/components/Faq"
import { SITE, buildLocalBusinessSchema, buildServiceSchema, SchemaOfferInput } from "@/lib/seo"

export const metadata: Metadata = {
  title: "3D printing voor scholen | X3DPrints",
  description:
    "Ondersteuning voor scholen en STEM-projecten: 3D prints voor leerlingen, workshops en materiaaladvies vanuit Herzele.",
  alternates: { canonical: "https://www.x3dprints.be/segments/3d-printing-scholen" },
  openGraph: {
    title: "3D printing voor scholen",
    description: "Laat leerlingen STL/STEP opsturen en ontvang prints met feedback. Educatieve pakketten en coaching op maat.",
    url: "https://www.x3dprints.be/segments/3d-printing-scholen",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630 }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: { card: "summary_large_image" },
}

const offerings = [
  { title: "Bulk prints", copy: "Print meerdere ontwerpen in één batch. Handig voor klasprojecten of wedstrijden." },
  { title: "Workshop/feedback", copy: "Korte uitleg over materiaalkeuze, tolerantie en viewer-tooling." },
  { title: "Materiaaladvies", copy: "PLA Matte voor maquettes, PETG voor functionele onderdelen, Translucent voor lichtobjecten." },
]

const faqItems = [
  {
    q: "Welke bestanden leveren leerlingen best aan?",
    a: "STL of STEP volstaat. Laat leerlingen kort vermelden welke functie het onderdeel heeft en welke maat belangrijk is.",
  },
  {
    q: "Kunnen we meerdere ontwerpen tegelijk laten printen?",
    a: "Ja. Verzamel de STL/STEP-bestanden in één map, dan plannen we batches per kleur of materiaal om tijd te winnen.",
  },
  {
    q: "Helpen jullie met feedback of workshops?",
    a: "We kunnen een korte online of on-site sessie geven over materiaalkeuze, oriëntatie en veiligheid. Vermeld de gewenste datum in je aanvraag.",
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
  metadata.alternates?.canonical ?? `${SITE.url}/segments/3d-printing-scholen`,
)
const pageDescription = metadata.description ?? SITE.description

const serviceOffers: SchemaOfferInput[] = [
  {
    serviceName: "Scholen 3D printing",
    price: "EUR 5",
    description: "Educatieve pakketten, workshops en bulkprints voor leerlingen.",
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

const serviceJsonLd = buildServiceSchema("3D printing voor scholen", serviceOffers, pageUrl)

export default function SchoolsSegmentPage() {
  return (
    <main className="relative overflow-hidden px-4 pb-24 pt-12 sm:px-6 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-blue-50" />
        <div className="absolute left-5 top-[-20%] h-[20rem] w-[20rem] rounded-full bg-emerald-200/30 blur-[120px]" />
      </div>

      <header className="mx-auto max-w-4xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Segment</p>
        <h1 className="mt-3 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          3D printing voor scholen
        </h1>
        <p className="mt-4 text-base text-slate-600">
          Stimuleer STEM-projecten met betrouwbare prints. We helpen leerlingen STL/STEP op te leveren en geven feedback die ze kunnen toepassen.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
          <ShimmerButton href="/contact?material=pla-matte">Vraag educatieve offerte</ShimmerButton>
          <Link href="/blog/3d-printen-voor-beginners" className="rounded-full border border-slate-300/70 bg-white/80 px-4 py-2 font-semibold text-slate-900 shadow-sm">
            Lees: beginnersgids
          </Link>
        </div>
      </header>

      <section className="mx-auto mt-10 max-w-5xl grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Wat je krijgt</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">Ondersteuning voor klassen en makerlabs</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            {offerings.map((item) => (
              <li key={item.title} className="rounded-3xl border border-slate-200/70 bg-white/70 p-4">
                <p className="font-semibold text-slate-900">{item.title}</p>
                <p className="mt-1 text-xs text-slate-600">{item.copy}</p>
              </li>
            ))}
          </ul>
        </GlassCard>

        <GlassCard className="p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Workflows</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">Zo werkt het</h2>
          <ol className="mt-4 space-y-3 text-sm text-slate-600">
            <li>1. Verzamel STL/STEP in de viewer of Dropbox-map en geef deadlines door.</li>
            <li>2. Wij printen in batches (PLA Matte, Tough+, PETG of specials) en bezorgen feedback.</li>
            <li>3. Ophalen in Herzele of verzenden met duidelijke labels per leerling/groep.</li>
          </ol>
        </GlassCard>
      </section>

      <section className="mx-auto mt-10 max-w-5xl">
        <GlassCard className="p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Handige tools</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-slate-200/70 bg-white/70 p-4 text-sm text-slate-600">
              <p className="font-semibold text-slate-900">Viewer</p>
              <p className="mt-1 text-xs">Leerlingen checken STL/OBJ/GLB zelf en zien vertex-count.</p>
              <Link href="/viewer" className="mt-2 inline-flex items-center gap-2 text-xs font-semibold text-emerald-600">
                Naar viewer <span aria-hidden>-&gt;</span>
              </Link>
            </div>
            <div className="rounded-3xl border border-slate-200/70 bg-white/70 p-4 text-sm text-slate-600">
              <p className="font-semibold text-slate-900">Material Suggestion Tool</p>
              <p className="mt-1 text-xs">Kies materiaal per opdracht en leer meteen het verschil tussen PLA, PETG, TPU.</p>
              <Link href="/materials#material-suggestion-tool" className="mt-2 inline-flex items-center gap-2 text-xs font-semibold text-emerald-600">
                Gebruik de tool <span aria-hidden>-&gt;</span>
              </Link>
            </div>
            <div className="rounded-3xl border border-slate-200/70 bg-white/70 p-4 text-sm text-slate-600">
              <p className="font-semibold text-slate-900">Beginnersblog</p>
              <p className="mt-1 text-xs">Intro voor leerlingen en docenten over 3D print basics en fouten die je vermijdt.</p>
              <Link href="/blog/3d-printen-voor-beginners" className="mt-2 inline-flex items-center gap-2 text-xs font-semibold text-emerald-600">
                Lees artikel <span aria-hidden>-&gt;</span>
              </Link>
            </div>
          </div>
        </GlassCard>
      </section>

      <section className="mx-auto mt-12 max-w-4xl">
        <Faq title="FAQ voor scholen" items={faqItems} />
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
