import type { Metadata } from "next"
import Link from "next/link"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import Faq from "@/components/Faq"
import { SITE, buildLocalBusinessSchema, buildServiceSchema, SchemaOfferInput } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Back to School 3D printing | pennenhouders, naamplaatjes, STEM | X3DPrints",
  description:
    "Gepersonaliseerde schoolmaterialen: pennenhouders, naamplaatjes, bureau organizers en educatieve modellen. Back-to-school productie in Silk, Matte en PETG. Ontwerpbestand niet inbegrepen.",
  alternates: { canonical: "https://www.x3dprints.be/segments/3d-printing-back-to-school" },
  openGraph: {
    title: "Back to School 3D printing",
    description:
      "Educatief 3D printen: pennenhouders, naamplaatjes, STEM-modellen en organizers. Materiaaladvies voor scholen en studenten.",
    url: "https://www.x3dprints.be/segments/3d-printing-back-to-school",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630 }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: { card: "summary_large_image" },
}

const faqItems = [
  {
    q: "Kunnen we gepersonaliseerde pennenhouders of naamplaatjes laten printen?",
    a: "Ja. Lever STL/STEP met naam of logo, of kies ontwerpservice aan EUR 45/uur. We printen in Silk/Matte PLA voor een nette look of PETG voor robuustheid.",
  },
  {
    q: "Welke materialen zijn geschikt voor klasgebruik?",
    a: "PLA Matte voor cleane details en veilige randjes, PETG voor sterkere onderdelen. TPU kan voor antislipvoetjes onder organizers.",
  },
  {
    q: "Hoe snel kunnen we geleverd krijgen in augustus-september?",
    a: "Meestal binnen enkele werkdagen, afhankelijk van oplage. Meld de eerste schoolweek of evenementdatum; we plannen realistisch zonder overpromise.",
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
  metadata.alternates?.canonical ?? `${SITE.url}/segments/3d-printing-back-to-school`,
)
const pageDescription = metadata.description ?? SITE.description

const serviceOffers: SchemaOfferInput[] = [
  {
    serviceName: "Back to School 3D printing",
    price: "EUR 5",
    description: "Pennenhouders, naamplaatjes, bureau organizers en educatieve modellen.",
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

const serviceJsonLd = buildServiceSchema("Back to School 3D printing", serviceOffers, pageUrl)

export default function BackToSchoolSegmentPage() {
  return (
    <main className="relative overflow-hidden px-4 pb-24 pt-12 sm:px-6 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-lime-50" />
        <div className="absolute left-4 top-[-15%] h-[20rem] w-[20rem] rounded-full bg-lime-200/40 blur-[120px]" />
        <div className="absolute right-0 bottom-[-20%] h-[26rem] w-[26rem] rounded-full bg-amber-200/35 blur-[140px]" />
      </div>

      <header className="mx-auto max-w-4xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Segment</p>
        <h1 className="mt-3 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Back to School 3D printing
        </h1>
        <p className="mt-4 text-base text-slate-600">
          Pennenhouders, naamplaatjes, bureau organizers en STEM-modellen. Ontwerp van het 3D model is niet inbegrepen; lever STL/STEP of kies ontwerpservice aan EUR 45/uur. Materiaaladvies voor scholen, studenten en bureaus.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
          <ShimmerButton href="/contact?material=pla-matte">Plan je schoolprint</ShimmerButton>
          <Link
            href="/blog/3d-printen-back-to-school"
            className="rounded-full border border-slate-300/70 bg-white/80 px-4 py-2 font-semibold text-slate-900 shadow-sm"
          >
            Lees de Back to School blog
          </Link>
          <Link
            href="/materials#material-suggestion-tool"
            className="rounded-full border border-slate-300/70 bg-white/80 px-4 py-2 font-semibold text-slate-900 shadow-sm"
          >
            Material Suggestion Tool
          </Link>
          <Link
            href="/pricing"
            className="rounded-full border border-slate-300/70 bg-white/80 px-4 py-2 font-semibold text-slate-900 shadow-sm"
          >
            Prijzen & leverzones
          </Link>
        </div>
      </header>

      <section className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-2">
        <GlassCard className="p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Use cases</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
              Gepersonaliseerde pennenhouders en naamplaatjes met klas/groep-opschrift.
            </li>
            <li className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
              Bureau organizers met compartimenten, antislipvoetjes in TPU.
            </li>
            <li className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
              Educatieve modellen voor STEM (bruggen, tandwielen, topografie) in PLA Matte of PETG.
            </li>
            <li className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
              Klasse-sets met nummering of QR-codes voor inventarisatie.
            </li>
          </ul>
          <p className="mt-4 text-xs text-slate-500">
            Voeg logo, klas, naam of QR toe; wij houden rekening met leesbaarheid (min. 0,6 mm diepte) en afgeronde hoeken voor veilig gebruik.
          </p>
        </GlassCard>

        <GlassCard className="p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Workflow</h2>
          <ol className="mt-4 space-y-2 text-sm text-slate-600">
            <li>1. Lever STL/STEP of kies ontwerpservice (EUR 45/uur) voor naam/klas varianten.</li>
            <li>2. Kies materiaal: Matte PLA voor cleane look, PETG voor sterkere onderdelen, TPU voor grip.</li>
            <li>3. Geef aantallen en deadline (augustus-september) door; we plannen realistisch zonder overpromise.</li>
            <li>4. We controleren wanddiktes, afrondingen en oriënteer voor stevige prints.</li>
            <li>5. Levering via EV-zones of pakketdienst; afhalen in Herzele is gratis.</li>
          </ol>
          <p className="mt-4 text-xs text-slate-500">
            Tip: stem kleur af op klas- of huisstijl; we hebben meerdere matte kleuren op stock en kunnen specials bijbestellen.
          </p>
        </GlassCard>
      </section>

      <section className="mx-auto mt-10 max-w-5xl">
        <GlassCard className="p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Materialen & afwerking</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li>PLA Matte voor zachte touch en duidelijke tekst.</li>
            <li>PETG voor stevige organizers die tegen een stoot kunnen.</li>
            <li>TPU pads voor antislip voeten of clips.</li>
            <li>Optioneel primer/schuren zodat leerlingen zelf kunnen schilderen.</li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <Link href="/materials#material-suggestion-tool" className="rounded-full border border-slate-300/70 bg-white/80 px-4 py-2 font-semibold text-slate-900 shadow-sm">
              Vraag materiaaladvies
            </Link>
            <Link href="/contact?material=pla-matte" className="rounded-full border border-slate-300/70 bg-white/80 px-4 py-2 font-semibold text-slate-900 shadow-sm">
              Start je aanvraag
            </Link>
          </div>
        </GlassCard>
      </section>

      <section className="mx-auto mt-12 max-w-4xl">
        <Faq title="FAQ Back to School 3D printing" items={faqItems} />
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
