import type { Metadata } from "next"
import Link from "next/link"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import Faq from "@/components/Faq"
import { SITE, buildLocalBusinessSchema, buildServiceSchema, SchemaOfferInput } from "@/lib/seo"

export const metadata: Metadata = {
  title: "3D printing voor modelbouwers | X3DPrints",
  description:
    "Print schaalmodellen, scenery en custom onderdelen met PLA Wood, Marble, Silk en Translucent blends. Lokale ondersteuning vanuit Herzele.",
  alternates: { canonical: "https://www.x3dprints.be/segments/3d-printing-modelbouwers" },
  openGraph: {
    title: "3D printing voor modelbouwers",
    description: "Wood, Marble, Silk, Translucent en detail prints voor maquettes en diorama’s met tips voor nabewerking.",
    url: "https://www.x3dprints.be/segments/3d-printing-modelbouwers",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630 }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: { card: "summary_large_image" },
}

const materials = [
  { title: "PLA Wood", copy: "Echte houtdeeltjes voor warme maquettes. Goed te schuren, beitsen en lakken." },
  { title: "PLA Marble / Sparkle", copy: "Steen- of glittereffect voor unieke scenery, statues en props." },
  { title: "PLA Translucent", copy: "Voor lichtobjecten, ramen en displaystukken met zachte gloed." },
]

const faqItems = [
  {
    q: "Welke layerhoogte raden jullie aan voor maquettes?",
    a: "Voor zichtwerk printen we meestal op <strong>0,16 mm</strong> in PLA Wood of Matte. Voor terrein of grote volumes kan 0,2 mm om het budget scherp te houden.",
  },
  {
    q: "Kunnen grote modellen in modules geleverd worden?",
    a: "Ja. We splitsen maquettes en scenery in pin-fit modules zodat transport veilig blijft en je ze snel kunt assembleren.",
  },
  {
    q: "Welke afwerking is inbegrepen?",
    a: "Standaard verwijderen we supports en ontbramen we licht. Optioneel schuren en primeren kan, vermeld het in je aanvraag zodat we de planning afstemmen.",
  },
]

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a.replace(/<[^>]*>/g, "") },
  })),
}

const pageUrl = String(
  metadata.alternates?.canonical ?? `${SITE.url}/segments/3d-printing-modelbouwers`,
)
const pageDescription = metadata.description ?? SITE.description

const serviceOffers: SchemaOfferInput[] = [
  {
    serviceName: "Modelbouwers 3D printing",
    price: "EUR 5",
    description: "PLA Wood, Marble en Translucent voor maquettes en scenery met nabewerkingstips.",
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

const serviceJsonLd = buildServiceSchema("3D printing voor modelbouwers", serviceOffers, pageUrl)

export default function ModelbouwSegmentPage() {
  return (
    <main className="relative overflow-hidden px-4 pb-24 pt-12 sm:px-6 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-rose-50" />
      </div>

      <header className="mx-auto max-w-4xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Segment</p>
        <h1 className="mt-3 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          3D printing voor modelbouwers
        </h1>
        <p className="mt-4 text-base text-slate-600">
          Maak schaalmodellen, scenery en diorama&rsquo;s die indruk maken. We printen met speciale PLA blends en adviseren over nabewerking.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
          <ShimmerButton href="/contact?material=pla-wood">Project bespreken</ShimmerButton>
          <Link href="/portfolio" className="rounded-full border border-slate-300/70 bg-white/80 px-4 py-2 font-semibold text-slate-900 shadow-sm">
            Bekijk portfolio
          </Link>
          <Link
            href="/materials#material-suggestion-tool"
            className="rounded-full border border-slate-300/70 bg-white/80 px-4 py-2 font-semibold text-slate-900 shadow-sm"
          >
            Material Suggestion Tool
          </Link>
        </div>
      </header>

      <section className="mx-auto mt-10 max-w-5xl grid gap-6 lg:grid-cols-2">
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
        </GlassCard>

        <GlassCard className="p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Best practices</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li>Houd wanddiktes minimaal 1.2 mm voor PLA Wood en 1.6 mm voor PETG details.</li>
            <li>Geef gewenste afwerking door (raw, geschuurd, geprimed). We stemmen planning daarop af.</li>
            <li>Combineer prints met resin-onderdelen? Laat de contactvlakken exact meten.</li>
          </ul>
          <p className="mt-4 text-xs text-slate-500">
            Tip: gebruik de{" "}
            <Link href="/materials#material-suggestion-tool" className="font-semibold text-slate-900 underline decoration-slate-300 hover:decoration-slate-600">
              Material Suggestion Tool
            </Link>{" "}
            om snel een eerste richtlijn te krijgen.
          </p>
        </GlassCard>
      </section>

      <section className="mx-auto mt-10 max-w-5xl">
        <GlassCard className="p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Handige links</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li>
              <Link href="/blog/3d-printen-voor-beginners" className="font-semibold text-indigo-600 hover:text-indigo-500">
                3D printen voor beginners
              </Link>{" "}
              – ideaal voor modelbouwclubs en scholen.
            </li>
            <li>
              <Link href="/blog/3d-printen-op-bestelling" className="font-semibold text-indigo-600 hover:text-indigo-500">
                3D printen op bestelling
              </Link>{" "}
              – leer hoe we batches plannen en leveren.
            </li>
            <li>
              <Link href="/viewer" className="font-semibold text-indigo-600 hover:text-indigo-500">
                3D viewer
              </Link>{" "}
              – check preview voordat je details aanpast.
            </li>
          </ul>
        </GlassCard>
      </section>

      <section className="mx-auto mt-12 max-w-4xl">
        <Faq title="FAQ voor modelbouwers" items={faqItems} />
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
