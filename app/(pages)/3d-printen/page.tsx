// app/(pages)/3d-printen/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import { buildLocalBusinessSchema, buildOfferCatalog, buildServiceSchema, SchemaOfferInput } from "@/lib/seo"

export const metadata: Metadata = {
  title: "3D printen in België · Lokaal 3D printen vanuit Herzele | X3DPrints",
  description:
    "3D printen voor marketing, tabletop en particulieren. Lokale 3D printservice (FDM) vanuit Herzele met advies over ontwerp, materiaal, prijs en workflow.",
  alternates: { canonical: "https://www.x3dprints.be/3d-printen" },
  openGraph: {
    title: "3D printen in België | X3DPrints",
    description:
      "3D printen voor marketingmateriaal, tabletop en consumenten. Lokaal 3D printen vanuit Herzele (tussen Gent en Aalst) met duidelijke workflow en materiaaladvies.",
    url: "https://www.x3dprints.be/3d-printen",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "3D printen landing" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: { card: "summary_large_image" },
}

const useCases = [
  {
    title: "Prototypes",
    body:
      "Snel itereren met PLA Matte of PLA Silk. 3D printen met feedback op oriëntatie, wanddikte en toleranties voor een voorspelbare passing.",
    link: "/portfolio",
  },
  {
    title: "Jigs & fixtures",
    body:
      "Functionele hulpstukken in PETG voor hitte- en chemiebestendigheid. Meestal +/-0,2 mm tolerantie en afgestemde infill bij 3D geprinte tools.",
    link: "/services",
  },
  {
    title: "Behuizingen",
    body:
      "Custom behuizingen en brackets met nette afwerking. 3D printen in matte of silk looks; inserts en passtukken in overleg.",
    link: "/materials",
  },
  {
    title: "Marketing props",
    body:
      "Kleine runs van props, displays en awards in Silk/Marble/Translucent PLA. 3D-prints klaar voor fotoshoots en events.",
    link: "/segments/3d-printing-marketing",
  },
]

const focusSegments = [
  {
    title: "Winkels & etalages",
    description:
      "3D printen voor marketingmateriaal dat opvalt in het rek, de etalage of op events. We printen accenten, display-elementen, signage en POS props die passen bij je merk en campagne.",
    highlights: [
      "Kleine runs van logo-detail, letters en visuele cues in PLA Silk/Marble",
      "Sterkere PETG-onderdelen voor buitengebruik of exposities",
      "Kleef- en montagevriendelijke designs, klaar voor opstelling",
    ],
    cta: "/segments/3d-printing-marketing",
    ctaText: "Marketing cases",
  },
  {
    title: "Tabletop games",
    description:
      "Rijke, gedetailleerde 3D prints in een niche community. Van miniatures en diorama’s tot tokens, terrain en accessoires voor je club of Kickstarter.",
    highlights: [
      "Miniatures en terrain in hoog detail (0,12 mm layers) met PLA Matte of Silk",
      "Dice towers, organizers en upgrades voor hobby-kasten",
      "Kleine runs, pre-order batches of prototypes met snelle opvolging",
    ],
    cta: "/segments/3d-printing-tabletop",
    ctaText: "Voor tabletop",
  },
  {
    title: "Particulieren",
    description:
      "Functionele onderdelen, recreatieve gadgets en decoratieve statements. 3D printen van praktische tools, vervangstukken, lampen, plantenhangers en cosplay props.",
    highlights: [
      "Functioneel: connectors, houdertjes, gereedschap, prototypes van eigen ontwerpen",
      "Recreatie: speelstukken, gifts, gadgets en fandom art",
      "Decoratief: lichtobjecten, sculpturen en statement pieces in kleur of transparant",
    ],
    cta: "/contact",
    ctaText: "Vraag advies",
  },
]

const consultationOffers: SchemaOfferInput[] = [
  {
    serviceName: "Marketing & retail advies",
    price: "EUR 0",
    description: "Gratis adviesgesprek over 3D printen voor winkelmateriaal of etalages.",
  },
  {
    serviceName: "Tabletop / hobby batch",
    price: "EUR 35",
    description: "Kleine 3D print-runs voor tabletop games, inclusief finishing tips.",
  },
  {
    serviceName: "Particulier 3D print advies",
    price: "EUR 0",
    description: "3D printen voor particulieren, functioneel of decoratief, met materiaaladvies en planning.",
  },
]

const materials = [
  { k: "PLA", v: "Strak en detailrijk. Ideaal voor 3D geprinte prototypes, decor en branding." },
  { k: "PETG", v: "Sterker, hittebestendiger en beter voor buitengebruik bij 3D-geprinte onderdelen." },
  { k: "TPU", v: "Flexibel en schokabsorberend voor bumpers, grips en pads." },
]

const pricing = [
  { k: "Small (ca. 5x5x5 cm)", v: "Vanaf ~EUR 5 in PLA Matte" },
  { k: "Medium (ca. 10x10x10 cm)", v: "Vanaf ~EUR 20 in PLA Matte" },
  { k: "Large (ca. 20x20x20 cm)", v: "Vanaf ~EUR 49 in PLA Matte" },
]

const differentiators = [
  {
    title: "Lokale expertise in 3D printen",
    copy:
      "3D printen vanuit Herzele met een directe lijn naar de maker. Snelle feedback en transparante planning zonder ticketsystemen of anonieme portals.",
  },
  {
    title: "Materiaaladvies op maat",
    copy:
      "PLA, PETG en TPU op voorraad, specials zoals Silk of Marble op aanvraag. We helpen kiezen welk filament het best bij jouw 3D print past.",
  },
  {
    title: "Focus op efficiënt 3D printen",
    copy:
      "We helpen je model optimaliseren zodat je minder support, kortere printtijd en sterkere onderdelen krijgt. Dat maakt 3D printen sneller én goedkoper.",
  },
  {
    title: "Bewuste aanpak",
    copy:
      "3D printen met oog voor duurzaamheid: bundelen van jobs, lokale levering en reststroombeleid. Lees meer hierover op de FuturePrint Lab pagina.",
  },
]

const workflow = [
  {
    title: "1) Upload & context",
    detail:
      "Stuur je STL- of STEP-bestand met info over toepassing, kritieke maten en gewenste afwerking. Hoe beter de context, hoe gerichter we kunnen 3D printen.",
  },
  {
    title: "2) Materiaal + prijs",
    detail:
      "We matchen PLA/PETG/TPU met jouw case en delen een voorstel voor 3D printen binnen een werkdag, inclusief richtprijs en planning.",
  },
  {
    title: "3) Productie & check",
    detail:
      "We 3D printen je onderdelen, verwijderen supportmateriaal en doen een steekproef op kritieke maten of passing waar relevant.",
  },
  {
    title: "4) Levering of afhalen",
    detail:
      "Afhalen in Herzele of levering in Vlaanderen. Pakketten worden compact en veilig verpakt zodat je 3D prints intact aankomen.",
  },
]

const faq = [
  {
    q: "Welke bestanden werken het best voor 3D printen?",
    a:
      "Voor 3D printen werken STL en STEP het best. Voeg notities toe over tolerantie, toepassing en gewenste afwerking voor een gericht voorstel.",
  },
  {
    q: "Hoe snel kan ik mijn 3D-prints krijgen?",
    a:
      "Typisch 2-5 werkdagen na akkoord, afhankelijk van oplage en materiaal. Spoed in overleg, zeker voor kleinere 3D print-projecten.",
  },
  {
    q: "Wat kost 3D printen?",
    a:
      "Small ~EUR 5, medium ~EUR 20, large ~EUR 49 in PLA Matte. Dat zijn richtprijzen; de exacte kost voor 3D printen hangt af van model, materiaal en printtijd. Zie ook /pricing.",
  },
  {
    q: "Welke materialen kan ik kiezen voor 3D printen?",
    a:
      "PLA (mat/silk/marble/wood), PETG en TPU zijn standaard beschikbaar. Andere materialen op aanvraag. We adviseren welk materiaal het beste past bij jouw 3D print.",
  },
  {
    q: "Hoe groot kan een 3D-geprint onderdeel zijn?",
    a:
      "Tot ca. 25 x 25 x 25 cm in één stuk. Grotere projecten kunnen door slim te splitsen en nadien te monteren toch 3D geprint worden.",
  },
  {
    q: "Bieden jullie 3D printen aan in mijn regio?",
    a:
      "X3DPrints print vanuit Herzele, tussen Gent en Aalst. We leveren in heel Vlaanderen via pakketdienst of persoonlijke levering, en afhalen is mogelijk op afspraak.",
  },
]

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
}

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "3D printen aanvragen bij X3DPrints",
  description: "Upload STL/STEP, ontvang materiaaladvies en prijs, wij 3D printen en leveren of jij haalt af.",
  supply: [{ "@type": "HowToSupply", name: "STL- of STEP-bestand voor 3D printen" }],
  tool: [{ "@type": "HowToTool", name: "FDM 3D-printer met PLA, PETG of TPU" }],
  step: workflow.map((w) => ({ "@type": "HowToStep", name: w.title, text: w.detail })),
}

const pageUrl = String(
  metadata.openGraph?.url ?? metadata.alternates?.canonical ?? "https://www.x3dprints.be/3d-printen",
)

const catalogJsonLd = buildOfferCatalog("3D print advies & projecten", consultationOffers)

const descriptionText = metadata.description ?? ""
const localBusinessJsonLd = buildLocalBusinessSchema({
  pageUrl,
  description: descriptionText,
  image: "/images/og-home.jpg",
  priceRange: "EUR 0 - EUR 49",
  areaServed: "Gent, Aalst, Herzele & Vlaanderen",
})

const serviceJsonLd = buildServiceSchema("3D printen & advies", consultationOffers, pageUrl)

export default function Page() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(59,130,246,0.18),transparent_65%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.08]" />

      {/* HERO */}
      <section className="px-6 pb-14 pt-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="stacked-content">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">3D printen</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              3D printen voor marketing, tabletop en persoonlijke projecten.
            </h1>
            <p className="mt-3 max-w-3xl text-lg text-slate-700">
              Lokale 3D printservice vanuit Herzele (tussen Gent en Aalst). Winkels, tabletop gamers en particulieren krijgen advies
              over ontwerp, materiaal en planning zodat 3D prints voor etalages, props en hobbyprojecten meteen inzetbaar zijn.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ShimmerButton href="/contact">Offerte voor 3D printen aanvragen</ShimmerButton>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200/80 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
              >
                Bekijk prijzen voor 3D printen
              </Link>
              <Link
                href="/materials"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200/80 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
              >
                Materialen voor 3D printen
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* DIFFERENTIATORS */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-6 max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Waarom 3D printen bij X3DPrints?
            </h2>
            <p className="mt-2 text-slate-600">
              Geen anonieme uploadportal, wel concrete samenwerking rond 3D printen. Deze pijlers maken het verschil wanneer je lokaal wil laten printen.
            </p>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2">
            {differentiators.map((item) => (
              <Reveal key={item.title}>
                <GlassCard className="h-full p-5">
                  <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{item.copy}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/sustainability"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-800 transition hover:-translate-y-0.5 hover:bg-white"
            >
              FuturePrint Lab over duurzaam 3D printen
            </Link>
            <Link
              href="/materials#material-suggestion-tool"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-emerald-700 transition hover:-translate-y-0.5 hover:bg-white"
            >
              Materialen kiezen voor je 3D print
            </Link>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-6 max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Typische 3D print-toepassingen</h2>
            <p className="mt-2 text-slate-600">
              Enkele concrete cases waarvoor klanten 3D printen inzetten. Kies je toepassing en we helpen met materiaal, oriëntatie en planning.
            </p>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {useCases.map((item) => (
              <Reveal key={item.title}>
                <GlassCard className="h-full p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{item.body}</p>
                  <Link
                    href={item.link}
                    className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
                  >
                    Meer over {item.title.toLowerCase()} <span aria-hidden>-&gt;</span>
                  </Link>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FOCUS SEGMENTS */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-6 max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              3D printen voor marketing, tabletop en particulieren
            </h2>
            <p className="mt-2 text-slate-600">
              Deze segmenten vragen extra aandacht: van opvallende etalage-elementen over gritty tabletop miniatures tot
              functionele en decoratieve 3D prints voor thuis. We stemmen materiaal, afwerking en timing af op jouw doeleinden.
            </p>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {focusSegments.map((segment) => (
              <Reveal key={segment.title}>
                <GlassCard className="h-full p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{segment.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{segment.description}</p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-700">
                    {segment.highlights.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={segment.cta}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
                  >
                    {segment.ctaText} <span aria-hidden>-&gt;</span>
                  </Link>
                </GlassCard>
              </Reveal>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/segments/3d-printing-marketing"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-emerald-700 transition hover:bg-white"
            >
              3D printen voor retail & marketing
            </Link>
            <Link
              href="/segments/3d-printing-tabletop"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-800 transition hover:bg-white"
            >
              3D printen voor tabletop & hobby
            </Link>
            <Link
              href="/contact?material=PLA_MATTE"
              className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 transition hover:bg-white"
            >
              3D printen voor particulieren
            </Link>
          </div>
        </div>
      </section>

      {/* MATERIALS */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Materialen voor 3D printen</h2>
              <p className="mt-2 text-sm text-slate-600">
                Kies het filament dat past bij sterkte, look en omgeving. We adviseren bij elke aanvraag en linken door naar de
                Material Suggestion Tool voor je 3D print.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {materials.map((m) => (
                  <li key={m.k} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" aria-hidden />
                    <span>
                      <strong>{m.k}:</strong> {m.v}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <ShimmerButton href="/materials#material-suggestion-tool">Material Suggestion Tool</ShimmerButton>
                <Link href="/materials" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600">
                  Naar materialen <span aria-hidden>-&gt;</span>
                </Link>
              </div>
            </GlassCard>

            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-slate-900">Prijsvoorbeelden voor 3D printen</h2>
              <p className="mt-2 text-sm text-slate-600">
                Richtprijzen in PLA Matte (standaard). Opslagen voor specials (Silk/Marble/Translucent) en PETG/TPU zijn typisch
                20-30 %. Je krijgt altijd een concrete offerte per 3D print-project.
              </p>
              <dl className="mt-4 space-y-2 text-sm text-slate-700">
                {pricing.map((p) => (
                  <div
                    key={p.k}
                    className="flex items-start justify-between rounded-xl border border-slate-200/70 bg-white/80 px-3 py-2"
                  >
                    <dt className="pr-4 font-semibold text-slate-900">{p.k}</dt>
                    <dd className="text-slate-700">{p.v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Naar pricing
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
                >
                  Offerte voor 3D printen op maat <span aria-hidden>-&gt;</span>
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-6 max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Hoe 3D printen werkt bij X3DPrints</h2>
            <p className="mt-2 text-slate-600">Duidelijke stappen en communicatie. Jij weet op elk moment waar je 3D prints zitten in de workflow.</p>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2">
            {workflow.map((step) => (
              <Reveal key={step.title}>
                <GlassCard className="h-full p-5">
                  <h3 className="text-base font-semibold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{step.detail}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="relative overflow-hidden rounded-3xl border border-white/30 bg-white/80 px-8 py-10 text-center shadow-xl backdrop-blur sm:text-left">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 via-cyan-400/10 to-sky-400/10" aria-hidden />
              <div className="relative">
                <h2 className="text-balance text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Klaar om te starten met 3D printen?
                </h2>
                <p className="mt-3 max-w-3xl text-base text-slate-600">
                  Deel je STL/STEP, gewenste materiaal en timing. Je ontvangt een voorstel met planning, prijs en eventuele optimalisaties voor je 3D prints.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <ShimmerButton href="/contact">Plan een gesprek</ShimmerButton>
                  <Link
                    href="/viewer"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:-translate-y-0.5 hover:bg-white"
                  >
                    STL/STEP uploaden
                  </Link>
                </div>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">FAQ over 3D printen</h2>
              <div className="mt-4 space-y-3 text-sm text-slate-700">
                {faq.map((item) => (
                  <div key={item.q} className="rounded-xl border border-slate-200/70 bg-white/80 p-4">
                    <p className="text-base font-semibold text-slate-900">{item.q}</p>
                    <p className="mt-1 text-slate-700">{item.a}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
    </main>
  )
}
