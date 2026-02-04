import type { Metadata } from "next"
import Link from "next/link"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import Faq from "@/components/Faq"
import { SITE, buildLocalBusinessSchema, buildServiceSchema, SchemaOfferInput } from "@/lib/seo"

export const metadata: Metadata = {
  title: "3D printing voor makers & hobbyisten | X3DPrints",
  description:
    "Lokale 3D print service voor makers, cosplayers en hobbyprojecten. Flexibele planning, duidelijk advies en support vanuit Herzele.",
  alternates: { canonical: "https://www.x3dprints.be/segments/3d-printing-makers/", languages: { "nl-BE": "https://www.x3dprints.be/segments/3d-printing-makers/", en: "https://www.x3dprints.be/en/segments/3d-printing-makers/", "x-default": "https://www.x3dprints.be/segments/3d-printing-makers/", }, },
  openGraph: {
    title: "3D printing voor makers & hobbyisten",
    description:
      "Laat custom onderdelen, cosplay props of repair parts printen in PLA, PLA Tough+ of PETG. Persoonlijk advies inbegrepen.",
    url: "https://www.x3dprints.be/segments/3d-printing-makers/",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630 }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: { card: "summary_large_image" },
}

const reasons = [
  "Persoonlijk overleg via mail of chat om je idee te verfijnen",
  "Advies over schroefdraad-inserts, lijmen en montage",
  "Afhalen in Herzele of verzending binnen België",
  "Flexibele planning in combinatie met een bijberoep",
]

const steps = [
  {
    title: "1. Beschrijf je project",
    copy: "Vertel waarvoor het onderdeel dient (cosplay, reparatie, maquette, smart home, ...). Voeg STL/STEP toe via de viewer of mail.",
  },
  {
    title: "2. Kies materiaal & afwerking",
    copy: "Met de Material Suggestion Tool of persoonlijk advies beslissen we tussen PLA Matte, PLA Tough+, PETG of specials zoals Wood.",
  },
  {
    title: "3. Print & check",
    copy: "Je krijgt foto’s zodra het onderdeel klaar is. Ophalen kan op afspraak, verzending gebeurt veilig verpakt.",
  },
]

const faqItems = [
  {
    q: "Welke bestanden hebben jullie nodig?",
    a: "Een <strong>STL</strong> of <strong>STEP</strong> volstaat. Voeg foto's of referenties toe zodat we meteen het juiste materiaal en de gewenste afwerking adviseren.",
  },
  {
    q: "Kan ik mijn ontwerp laten tweaken?",
    a: "Kleine aanpassingen zoals gaten, splitsingen of tekst kunnen we uitvoeren. Voor grotere wijzigingen rekenen we <strong>€45/uur</strong> CAD-ondersteuning.",
  },
  {
    q: "Hoe snel kan ik mijn print krijgen?",
    a: "Meestal binnen enkele werkdagen. Vermeld deadline, materiaalkeuze en of verzending of afhalen gewenst is; dan plannen we meteen in.",
  },
]

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",

  inLanguage: ["nl-BE", "en-BE"],
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a.replace(/<[^>]*>/g, ""),
    },
  })),
}

const pageUrl = String(
  metadata.alternates?.canonical ?? `${SITE.url}/segments/3d-printing-makers`,
)
const pageDescription = metadata.description ?? SITE.description

const serviceOffers: SchemaOfferInput[] = [
  {
    serviceName: "Makers & hobbyisten 3D printing",
    price: "EUR 5",
    description: "Custom onderdelen, cosplay props en repair-jobs in PLA, PLA Tough+ of PETG.",
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

const serviceJsonLd = buildServiceSchema("3D printing voor makers & hobbyisten", serviceOffers, pageUrl)

export default function MakersSegmentPage() {
  return (
    <main className="relative overflow-hidden px-4 pb-24 pt-12 sm:px-6 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-slate-50" />
        <div className="absolute left-8 top-[-20%] h-[22rem] w-[22rem] rounded-full bg-emerald-200/40 blur-[130px]" />
        <div className="absolute right-[-5%] bottom-[-25%] h-[26rem] w-[26rem] rounded-full bg-cyan-200/40 blur-[150px]" />
      </div>

      <header className="mx-auto max-w-4xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Segment</p>
        <h1 className="mt-3 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          3D printing voor makers & hobbyisten
        </h1>
        <p className="mt-4 text-base text-slate-600">
          Of je nu cosplay armor, modelbouwdetails of een custom mount voor sensoren nodig hebt: je krijgt eerlijke timings, materiaaladvies en directe communicatie met de printer zelf.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
          <ShimmerButton href="/contact?material=pla-matte" event={ { action: "cta_click", category: "segments_makers", label: "plan-gesprek" } }> Plan een gesprek</ShimmerButton>
          <Link
            href="/materials#material-suggestion-tool"
            className="rounded-full border border-slate-300/70 bg-white/80 px-4 py-2 font-semibold text-slate-900 shadow-sm"
          >
            Krijg materiaaladvies
          </Link>
        </div>
      </header>

      <section className="mx-auto mt-10 max-w-5xl grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Waarom makers bij X3DPrints aankloppen</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            {reasons.map((reason) => (
              <li key={reason} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-slate-500">
            Kleine oplages en iteraties zijn perfect haalbaar. Geef gerust door of je een reserveonderdeel wil voor tijdens het testen.
          </p>
        </GlassCard>

        <GlassCard className="p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Zo gaan we te werk</h2>
          <div className="mt-4 space-y-3">
            {steps.map((step) => (
              <div
                key={step.title}
                className="rounded-3xl border border-slate-200/70 bg-white/70 p-4 text-sm text-slate-600"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{step.title}</p>
                <p className="mt-1 text-slate-700">{step.copy}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </section>

      <section className="mx-auto mt-10 max-w-5xl grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Populaire toepassingen</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li>Cosplay props, badges en armor onderdelen</li>
            <li>Modelbouw accessoires in PLA Wood, Marble of Translucent</li>
            <li>Smart home mounts voor sensoren, camera’s of switches</li>
            <li>Repair-jobs voor vintage toestellen of hobbyprojecten</li>
          </ul>
        </GlassCard>

        <GlassCard className="p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Handige links</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li>
              <Link href="/viewer" className="font-semibold text-indigo-600 hover:text-indigo-500">
                3D viewer
              </Link>{" "}
              – controleer schaal en oriëntatie voor je print
            </li>
            <li>
              <Link href="/blog/beste-instellingen-bambu-printer" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Beste instellingen voor jouw Bambu printer
              </Link>{" "}
              – tips om zelf te printen en bestanden te optimaliseren
            </li>
            <li>
              <Link href="/blog/ontwerp-3d-printbaar-model" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Hoe ontwerp je een 3D printbaar model?
              </Link>{" "}
              – handleiding voor beginners
            </li>
          </ul>
        </GlassCard>
      </section>

      <section className="mx-auto mt-12 max-w-4xl">
        <Faq title="FAQ voor makers & hobbyisten" items={faqItems} />
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
