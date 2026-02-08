import type { Metadata } from "next"
import Link from "next/link"
import ContentTableOfContents from "@/components/ContentTableOfContents"
import Faq from "@/components/Faq"
import GlassCard from "@/components/GlassCard"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import {
  SITE,
  buildFaqPageSchema,
  buildHowToSchema,
  buildLocalBusinessSchema,
  buildServiceSchema,
  SchemaOfferInput,
} from "@/lib/seo"

export const metadata: Metadata = {
  title: "Back to School 3D printing | X3DPrints",
  description:
    "Back-to-school prints voor scholen en ouders: naamplaatjes, organizers en educatieve modellen met snelle lokale opvolging.",
  alternates: {
    canonical: "https://www.x3dprints.be/segments/3d-printing-back-to-school/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/segments/3d-printing-back-to-school/",
      "en-BE": "https://www.x3dprints.be/en/segments/3d-printing-back-to-school/",
      "x-default": "https://www.x3dprints.be/segments/3d-printing-back-to-school/",
    },
  },
  openGraph: {
    title: "Back to School 3D printing",
    description:
      "Naamplaatjes, pennenhouders en klasprojecten met materiaaladvies en duidelijke planning.",
    url: "https://www.x3dprints.be/segments/3d-printing-back-to-school/",
    images: [{ url: "/Logo.webp", width: 1200, height: 630, alt: "Back to School 3D printing" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Back to School 3D printing",
    description:
      "Back-to-school prints met snelle lokale productie en heldere communicatie.",
    images: ["/Logo.webp"],
  },
}

const pageUrl = String(
  metadata.alternates?.canonical ?? `${SITE.url}/segments/3d-printing-back-to-school/`,
)
const pageDescription = metadata.description ?? SITE.description
const lastUpdatedLabel = "Laatst bijgewerkt: 7 februari 2026"

const tocItems = [
  { id: "segment-overview", label: "Wat levert deze schoolroute op?" },
  { id: "segment-workflow", label: "Hoe loopt een back-to-school aanvraag?" },
  { id: "segment-use-cases", label: "Welke schoolprints zijn populair?" },
  { id: "segment-links", label: "Welke links helpen je verder?" },
  { id: "segment-faq", label: "FAQ Back to School" },
  { id: "segment-sources", label: "Bronnen en referenties" },
]

const workflowSteps = [
  {
    title: "1. Projectlijst bundelen",
    copy: "Verzamel STL of STEP bestanden met aantallen, namen en gewenste deadline.",
  },
  {
    title: "2. Materiaal en kleur kiezen",
    copy: "Samen kiezen we PLA Matte, PETG of TPU op basis van gebruik, grip en duurzaamheid.",
  },
  {
    title: "3. Productie en levering",
    copy: "Je krijgt duidelijke timing, statusupdates en levering op maat van schoolplanning.",
  },
]

const useCaseRows = [
  {
    useCase: "Naamplaatjes en labels",
    material: "PLA Matte",
    note: "Leesbare details en nette afwerking voor dagelijks gebruik.",
  },
  {
    useCase: "Bureau organizers",
    material: "PETG of PLA Tough",
    note: "Sterker voor intensief gebruik in klaslokalen.",
  },
  {
    useCase: "Antislip onderdelen",
    material: "TPU",
    note: "Grip onder houders, trays en kleine klasaccessoires.",
  },
]

const faqItems = [
  {
    q: "Kunnen we gepersonaliseerde klassets laten printen?",
    a: "Ja. Je kan namen, klassen of codes meegeven zodat we sets duidelijk kunnen labelen en bundelen.",
  },
  {
    q: "Welke materialen zijn geschikt voor leerlingen?",
    a: "Vaak starten we met PLA Matte voor visuals en PETG voor stevigere onderdelen. TPU gebruiken we vooral voor gripdelen.",
  },
  {
    q: "Hoe vroeg plannen we best voor september?",
    a: "Idealiter enkele weken op voorhand, zodat materiaalkeuze en eventuele herprints zonder stress kunnen gebeuren.",
  },
]

const references = [
  {
    label: "Prusa material guide (PLA, PETG, TPU)",
    href: "https://help.prusa3d.com/filament-material-guide",
  },
  {
    label: "Google Search docs: crawlable links",
    href: "https://developers.google.com/search/docs/crawling-indexing/links-crawlable",
  },
  {
    label: "All3DP FDM process explainer",
    href: "https://all3dp.com/2/fdm-3d-printing-explained/",
  },
]

const faqJsonLd = buildFaqPageSchema({
  inLanguage: "nl-BE",
  mainEntityOfPage: pageUrl,
  items: faqItems.map((item) => ({ q: item.q, a: item.a })),
})

const serviceOffers: SchemaOfferInput[] = [
  {
    serviceName: "Back to School 3D printing",
    price: "EUR 5",
    description: "Naamplaatjes, organizers en educatieve schoolprints met materiaaladvies.",
    url: pageUrl,
  },
]

const localBusinessJsonLd = buildLocalBusinessSchema({
  pageUrl,
  description: pageDescription,
  image: "/Logo.webp",
  areaServed: "Gent en Vlaanderen",
  priceRange: "EUR 5 - EUR 49",
})

const serviceJsonLd = buildServiceSchema(
  "Back to School 3D printing",
  serviceOffers,
  pageUrl,
  {
    description: pageDescription,
    inLanguage: "nl-BE",
    mainEntityOfPage: pageUrl,
  },
)

const howToJsonLd = buildHowToSchema({
  name: "Back-to-school aanvraag in 4 stappen",
  description:
    "Vraag schoolprints aan met duidelijke materiaalkeuze, planning en een prefill contactroute.",
  inLanguage: "nl-BE",
  mainEntityOfPage: pageUrl,
  totalTime: "PT3M",
  steps: [
    {
      name: "Bestanden en aantallen delen",
      text: "Stuur STL of STEP bestanden met aantallen per klas of projectgroep.",
    },
    {
      name: "Materiaalroute bepalen",
      text: "Kies PLA Matte, PETG of TPU voor het juiste gebruik in de klas.",
    },
    {
      name: "Prijs en timing bekijken",
      url: "/pricing?utm_source=segment-back-to-school&utm_medium=howto&utm_campaign=school-flow",
    },
    {
      name: "Aanvraag met prefill versturen",
      url: "/contact?material=pla-matte&quote=Back-to-school%20prints%20voor%20klasprojecten",
    },
  ],
  toolNames: ["Material Suggestion Tool"],
  supplyNames: ["STL of STEP bestanden"],
})

export default function BackToSchoolSegmentPage() {
  return (
    <main className="relative overflow-hidden px-4 pb-24 pt-12 sm:px-6 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-lime-50" />
        <div className="absolute left-6 top-[-18%] h-[22rem] w-[22rem] rounded-full bg-lime-200/35 blur-[120px]" />
      </div>

      <section id="segment-overview" className="mx-auto max-w-5xl scroll-mt-28">
        <Reveal>
          <header className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Segment</p>
            <h1 className="mt-3 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Back to School 3D printing
            </h1>
            <p className="mt-4 text-base text-slate-600">
              Voor naamplaatjes, pennenhouders en klasprojecten met snelle productie en duidelijke communicatie.
            </p>
            <p className="mt-2 text-xs font-medium uppercase tracking-[0.15em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <ShimmerButton
                href="/contact?material=pla-matte&quote=Back-to-school%20prints%20voor%20klasprojecten"
                event={{ action: "cta_click", category: "segments_back_to_school", label: "contact_prefill" }}
              >
                Start schoolaanvraag
              </ShimmerButton>
              <ShimmerButton
                href="/materials#material-suggestion-tool"
                className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
                event={{ action: "cta_click", category: "segments_back_to_school", label: "material_tool" }}
              >
                Material Suggestion Tool
              </ShimmerButton>
              <Link
                href="/services"
                className="rounded-xl border border-slate-300/70 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm"
              >
                Bekijk services
              </Link>
            </div>
          </header>
          <ContentTableOfContents title="Inhoud" items={tocItems} className="mx-auto mt-6 max-w-2xl" />
        </Reveal>
      </section>

      <section id="segment-workflow" className="mx-auto mt-10 grid max-w-5xl gap-6 scroll-mt-28 lg:grid-cols-2">
        <Reveal>
          <GlassCard className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-slate-900">Hoe loopt een back-to-school aanvraag?</h2>
            <div className="mt-4 space-y-3">
              {workflowSteps.map((step) => (
                <div key={step.title} className="rounded-2xl border border-slate-200/70 bg-white/80 p-4 text-sm text-slate-700">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{step.title}</p>
                  <p className="mt-2">{step.copy}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </Reveal>

        <Reveal delay={0.06}>
          <GlassCard className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-slate-900">Materiaalkeuze per schooltoepassing</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-[420px] text-left text-sm text-slate-700">
                <thead>
                  <tr className="border-b border-slate-200/70 text-slate-500">
                    <th className="py-2 pr-4 font-semibold">Toepassing</th>
                    <th className="py-2 pr-4 font-semibold">Startmateriaal</th>
                    <th className="py-2 pr-4 font-semibold">Richtlijn</th>
                  </tr>
                </thead>
                <tbody>
                  {useCaseRows.map((row) => (
                    <tr key={row.useCase} className="border-b border-slate-200/70 last:border-0">
                      <td className="py-2 pr-4 font-medium text-slate-900">{row.useCase}</td>
                      <td className="py-2 pr-4">{row.material}</td>
                      <td className="py-2 pr-4">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </Reveal>
      </section>

      <section id="segment-use-cases" className="mx-auto mt-10 max-w-5xl scroll-mt-28">
        <Reveal>
          <GlassCard className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-slate-900">Populaire schoolprints</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                <span>Naamplaatjes en labels per leerling of klasgroep.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                <span>Organizers en desk-accessoires voor klaslokalen.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                <span>STEM-modellen voor uitleg, demo en workshops.</span>
              </li>
            </ul>
          </GlassCard>
        </Reveal>
      </section>

      <section id="segment-links" className="mx-auto mt-10 max-w-5xl scroll-mt-28">
        <Reveal>
          <GlassCard className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-slate-900">Handige vervolgstappen</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              <li>
                <Link href="/blog/3d-printen-back-to-school" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Back to School blog
                </Link>{" "}
                met inspiratie en timingtips.
              </li>
              <li>
                <Link href="/blog/use-case-dinsdag-scholen" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Scholen use-case blog
                </Link>{" "}
                voor praktijktoepassingen.
              </li>
              <li>
                <Link href="/pricing" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Prijzen
                </Link>{" "}
                om budget en aantallen direct te plannen.
              </li>
              <li>
                <Link href="/locaties" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Locaties
                </Link>{" "}
                voor afhaling en levering in de regio.
              </li>
            </ul>
          </GlassCard>
        </Reveal>
      </section>

      <section id="segment-faq" className="mx-auto mt-12 max-w-4xl scroll-mt-28">
        <Faq title="FAQ Back to School" items={faqItems} />
      </section>

      <section id="segment-sources" className="mx-auto mt-12 max-w-5xl scroll-mt-28">
        <Reveal>
          <GlassCard className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-slate-900">Bronnen en referenties</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {references.map((reference) => (
                <li key={reference.href} className="rounded-xl border border-slate-200/70 bg-white/80 px-4 py-3">
                  <cite className="not-italic">
                    <a
                      href={reference.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      {reference.label}
                    </a>
                  </cite>
                </li>
              ))}
            </ul>
          </GlassCard>
        </Reveal>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
    </main>
  )
}
