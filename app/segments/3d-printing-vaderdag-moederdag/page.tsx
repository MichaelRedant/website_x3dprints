import type { Metadata } from "next"
import Link from "next/link"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import Faq from "@/components/Faq"
import Image from "next/image"
import { SITE, buildLocalBusinessSchema, buildServiceSchema, SchemaOfferInput } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Vaderdag & Moederdag 3D printing | Gepersonaliseerde gifts | X3DPrints",
  description:
    "Gepersonaliseerde Vaderdag en Moederdag gifts: desk items, sleutelhangers en naamplaatjes in Silk/Matte/Translucent PLA. Ontwerpbestand niet inbegrepen; aanleveren of ontwerpservice.",
  alternates: { canonical: "https://www.x3dprints.be/segments/3d-printing-vaderdag-moederdag/", languages: { "nl-BE": "https://www.x3dprints.be/segments/3d-printing-vaderdag-moederdag/", en: "https://www.x3dprints.be/en/segments/3d-printing-vaderdag-moederdag/", "x-default": "https://www.x3dprints.be/segments/3d-printing-vaderdag-moederdag/", }, },
  openGraph: {
    title: "Vaderdag & Moederdag 3D printing",
    description:
      "Maatwerk cadeaus voor Vaderdag/Moederdag: sleutelhangers, desk organizers, naamplaatjes. Snelle runs, Silk/Matte PLA en PETG.",
    url: "https://www.x3dprints.be/segments/3d-printing-vaderdag-moederdag/",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630 }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: { card: "summary_large_image" },
}

const highlights = [
  "Gepersonaliseerde sleutelhangers, desk organizers en naamplaatjes",
  "Silk/Matte PLA voor luxe of zachte look; PETG voor sterkere items",
  "Batchen met namen/initialen; afgeronde randen voor prettig gebruik",
]

const faqItems = [
  {
    q: "Kunnen jullie elke naam/initialen toevoegen?",
    a: "Ja. Lever STL/STEP met naam/initialen of laat ons ontwerpen aan EUR 45/uur. We zorgen voor leesbaarheid (min. 0,6 mm diepte) en afgeronde randen.",
  },
  {
    q: "Welke materialen zijn geschikt voor gifts?",
    a: "Silk PLA voor glansrijke afwerking, Matte PLA voor zachte look, PETG voor robuustere sleutelhangers of desk items. TPU kan voor antislipvoetjes.",
  },
  {
    q: "Wat is de levertijd rond Vaderdag/Moederdag?",
    a: "Meestal binnen enkele werkdagen afhankelijk van oplage. Meld je datum; we plannen realistisch zonder vaste beloften.",
  },
]

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",

  inLanguage: ["nl-BE", "en-BE"],
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a.replace(/<[^>]*>/g, "") },
  })),
}

const gallery = [
  { src: "/images/portfolio/vaderdag.webp", alt: "3D geprinte Vaderdag sleutelhangers" },
  { src: "/images/portfolio/vaderdag2.webp", alt: "Gepersonaliseerde desk items Vaderdag" },
  { src: "/images/portfolio/vaderdag3.webp", alt: "Naamplaatje en cadeau voor Vaderdag" },
  { src: "/images/portfolio/moederdag.webp", alt: "Moederdag cadeau in Silk PLA" },
  { src: "/images/portfolio/moederdag2.webp", alt: "Moederdag organizer en sleutelhangers" },
  { src: "/images/portfolio/moederdag3.webp", alt: "Gepersonaliseerde Moederdag print" },
]

const pageUrl = String(metadata.alternates?.canonical ?? `${SITE.url}/segments/3d-printing-vaderdag-moederdag`)
const pageDescription = metadata.description ?? SITE.description

const serviceOffers: SchemaOfferInput[] = [
  {
    serviceName: "Vaderdag & Moederdag 3D printing",
    price: "EUR 5",
    description: "Gepersonaliseerde gifts: sleutelhangers, desk items, naamplaatjes.",
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

const serviceJsonLd = buildServiceSchema("Vaderdag & Moederdag 3D printing", serviceOffers, pageUrl)

export default function ParentsDaySegmentPage() {
  return (
    <main className="relative overflow-hidden px-4 pb-24 pt-12 sm:px-6 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-white to-amber-50" />
        <div className="absolute left-4 top-[-15%] h-[20rem] w-[20rem] rounded-full bg-rose-200/40 blur-[120px]" />
        <div className="absolute right-0 bottom-[-20%] h-[26rem] w-[26rem] rounded-full bg-amber-200/35 blur-[140px]" />
      </div>

      <header className="mx-auto max-w-4xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Seasonal</p>
        <h1 className="mt-3 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Vaderdag & Moederdag 3D printing
        </h1>
        <p className="mt-4 text-base text-slate-600">
          Sleutelhangers, desk items en gepersonaliseerde naamcadeaus in Silk, Matte of PETG. Ontwerp van het 3D model is
          niet inbegrepen; lever STL/STEP of kies ontwerpservice aan EUR 45/uur.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
          <ShimmerButton href="/contact?material=pla-silk-plus" event={ { action: "cta_click", category: "segments_parentsday", label: "plan-run" } }> Plan je Vader-/Moederdag run</ShimmerButton>
          <Link
            href="/blog/3d-printen-vaderdag-moederdag"
            className="rounded-full border border-slate-300/70 bg-white/80 px-4 py-2 font-semibold text-slate-900 shadow-sm"
          >
            Lees het blog
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
          <h2 className="text-xl font-semibold text-slate-900">Use cases</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            {highlights.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-rose-500" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-slate-500">
            Voeg logo, initialen of korte boodschap toe. We houden rekening met leesbaarheid en afgeronde hoeken voor dagelijkse gebruiksitems.
          </p>
        </GlassCard>

        <GlassCard className="p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Workflow</h2>
          <ol className="mt-4 space-y-2 text-sm text-slate-600">
            <li>1. Lever STL/STEP of kies ontwerpservice (EUR 45/uur) met namen/initialen.</li>
            <li>2. Kies materiaal: Silk/Matte PLA voor look, PETG voor sterkere dragers, TPU voor antislipvoetjes.</li>
            <li>3. Geef deadline (mei/juni) door; we plannen realistisch zonder overpromise.</li>
            <li>4. We controleren wanddiktes, tekstdiepte en afrondingen.</li>
            <li>5. Levering via EV-zones of pakketdienst; afhalen in Herzele kan.</li>
          </ol>
          <p className="mt-4 text-xs text-slate-500">
            Tip: vraag een mix van Silk (glans) en Matte (zachte look) voor setjes; we batchen kleuren voor consistente afwerking.
          </p>
        </GlassCard>
      </section>

      <section className="mx-auto mt-10 max-w-5xl">
        <GlassCard className="p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Voorbeelden</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {gallery.map((item, idx) => (
              <div
                key={item.src}
                className={`overflow-hidden rounded-xl border border-slate-200/70 bg-white/80 shadow ${idx === 0 ? "sm:col-span-2" : ""}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={idx === 0 ? 960 : 640}
                  height={idx === 0 ? 540 : 480}
                  className="h-full w-full object-cover"
                  sizes="(min-width: 1024px) 320px, 100vw"
                  priority={idx === 0}
                />
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-slate-600">
            Foto&apos;s met Silk/Matte PLA gifts; lever eigen STL/STEP of kies ontwerpservice.
          </p>
        </GlassCard>
      </section>

      <section className="mx-auto mt-12 max-w-4xl">
        <Faq title="FAQ Vaderdag & Moederdag" items={faqItems} />
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
