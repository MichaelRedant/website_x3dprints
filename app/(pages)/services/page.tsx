// app/(pages)/services/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import {
  Brush,
  Palette,
  Printer,
  Wrench,
  Layers,
  Package,
  Ruler,
  Box,
  Sparkles,
  Puzzle,
} from "lucide-react"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import CtaBlock from "@/components/CtaBlock"
import Faq from "@/components/Faq"
import ShimmerButton from "@/components/ShimmerButton"
import { buildLocalBusinessSchema, buildOfferCatalog, buildServiceSchema } from "@/lib/seo"
import { servicesFaq } from "@/content/services-faq"

export const metadata: Metadata = {
  title: "3D Print Service Herzele | X3DPrints bijberoep",
  description:
    "Lokale FDM 3D-printservice uit Herzele (bijberoep). Prototypes en kleine reeksen in PLA, PETG of TPU met eerlijk advies en korte lijnen.",
  alternates: { canonical: "https://www.x3dprints.be/services" },
  openGraph: {
    title: "3D Print Service Herzele",
    description:
      "Kleine oplages, snelle opvolging en realistisch advies over materiaal en ontwerp. Bijberoep vanuit Herzele/Gent.",
    url: "https://www.x3dprints.be/services",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630 }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: { card: "summary_large_image" },
}

const services = [
  {
    icon: Printer,
    title: "FDM 3D-printen",
    description: "Functionele onderdelen en prototypes in PLA, PETG of TPU. Tot ~25 x 25 x 25 cm per stuk, opsplitsen mogelijk.",
  },
  {
    icon: Palette,
    title: "Materiaal- en kleuradvies",
    description: "We helpen kiezen tussen sterkte, flexibiliteit en look zodat je een haalbare oplossing krijgt voor je budget.",
  },
  {
    icon: Layers,
    title: "Bestandscheck en slicing",
    description: "We controleren manifold issues, supports en orientatie en bereiden je model voor in de slicer.",
  },
  {
    icon: Ruler,
    title: "DFM-review",
    description: "Pragmatisch advies over wanddikte, infill en toleranties zodat prints vlot en betrouwbaar blijven.",
  },
  {
    icon: Package,
    title: "Prototypes en kleine reeksen",
    description: "Ideaal voor een stuk tot korte runs. Heldere planning en transparante prijs per batch.",
  },
  {
    icon: Wrench,
    title: "Kwaliteitscontrole",
    description: "We meten kritieke maten steekproefsgewijs na en bezorgen feedback voor eventuele iteraties.",
  },
  {
    icon: Sparkles,
    title: "Basis nabewerking",
    description: "Supportverwijdering en licht ontbramen waar nodig. Geen schuren, primer, lak of lijmwerk.",
  },
  {
    icon: Box,
    title: "Afhalen of verzending",
  description: "Afhalen in Herzele of verzending binnen België. Verpakking afgestemd op kleine oplages.",
  },
] as const

const useCases = [
  {
    icon: Sparkles,
    title: "Prototyping",
    description: "Snel valideren met strakke prototypes. Itereer zonder wachttijden en pas geometrie of materiaal aan per run.",
  },
  {
    icon: Puzzle,
    title: "Jigs en fixtures",
    description: "Hulpgereedschap, klemmen en malletjes op maat voor assemblage of testopstellingen.",
  },
  {
    icon: Package,
    title: "Behuizingen en brackets",
    description: "Op maat gemaakte kastjes, houders en scharnierende onderdelen met nette passing.",
  },
  {
    icon: Brush,
    title: "Displays en retail",
    description: "POS-materiaal, producthouders en etalageonderdelen die opvallen en exact passen.",
  },
  {
    icon: Ruler,
    title: "Vervangstukken",
    description: "Niet-meer-leverbaar onderdeel? We printen een pasvorm-equivalent en testen de montage.",
  },
  {
    icon: Palette,
    title: "Gepersonaliseerd",
    description: "Naamplaatjes, gifts en premium decor met PLA Wood/Marble, Silk of Translucent varianten.",
  },
] as const

const specs = [
  { k: "Formaat", v: "Tot ~25 x 25 x 25 cm per stuk (opdelen in segmenten kan)" },
  { k: "Layerhoogte", v: "0,12-0,28 mm afhankelijk van detail en sterkte" },
  { k: "Tolerantie", v: "Typisch +/-0,2 mm voor FDM (bespreek kritieke maten)" },
  { k: "Materialen", v: "PLA (mat/wood/marble/silk/etc.), PETG, TPU; andere in overleg" },
  { k: "Nabewerking", v: "Support verwijderen en licht ontbramen. Geen schuren, primer of lak." },
  { k: "Planning", v: "Meestal enkele werkdagen. Productie in bijberoep, spoed enkel indien haalbaar." },
] as const

const pricingOffers = [
  { serviceName: "Small (ca. 5x5x5 cm)", price: "EUR 5", description: "PLA Matte (standaard) voor functionele prototypes" },
  { serviceName: "Medium (ca. 10x10x10 cm)", price: "EUR 20", description: "PLA Matte met optionele kleur/Tough upgrade" },
  { serviceName: "Large (ca. 20x20x20 cm)", price: "EUR 49", description: "PLA Matte prototypes of decorstukken, splitsen mogelijk" },
]

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: servicesFaq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
}

const catalogJsonLd = buildOfferCatalog("X3DPrints 3D-printservices", pricingOffers)
const descriptionText = metadata.description ?? ""
const safeUrl = "https://www.x3dprints.be/services"

const localBusinessJsonLd = buildLocalBusinessSchema({
  pageUrl: safeUrl,
  description: descriptionText,
  image: "/images/og-home.jpg",
  priceRange: "EUR 5 - EUR 49",
  areaServed: "Gent & Oost-Vlaanderen",
})

const serviceJsonLd = buildServiceSchema("FDM 3D-print service", pricingOffers, safeUrl)

export default function Page() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(99,102,241,.14),transparent_70%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.06]" />

      {/* HERO */}
      <section className="px-6 pt-14 pb-10 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="stacked-content">
            <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              3D print service uit Herzele (bijberoep)
            </h1>
            <p className="mt-3 max-w-3xl text-pretty text-slate-600">
              X3DPrints is een eenmansstudio in bijberoep. Je spreekt rechtstreeks met de maker, krijgt eerlijke timings
              (meestal enkele werkdagen) en materiaaladvies dat past bij jouw project en budget.
            </p>
            <div className="stacked-actions mt-6 flex flex-wrap gap-3 justify-center sm:justify-start">
              <ShimmerButton href="/contact">Offerte aanvragen</ShimmerButton>
              <Link
                href="/materials#material-suggestion-tool"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
              >
                Material Suggestion Tool
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
              >
                Lees de blog
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SOLO APPROACH */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Waarom X3DPrints</p>
                  <h2 className="text-2xl font-semibold text-slate-900">Bijberoep met focus en korte lijnen</h2>
                  <p className="text-sm text-slate-600">
                    Productie gebeurt vanuit Herzele en elke job wordt persoonlijk ingepland. Geen ticket-systeem, wel
                    rechtstreeks overleg, transparante communicatie en flexibiliteit voor lokale afhalingen.
                  </p>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" aria-hidden />
                      Afhalen mogelijk voor Gent/Aalst, verzending voor heel België.
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" aria-hidden />
                      Planning in overleg: typisch enkele werkdagen, spoed enkel wanneer haalbaar.
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" aria-hidden />
                      Feedback op design en materiaal voor we printen.
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Handige resources</p>
                  <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-4 text-sm text-slate-600">
                    <p className="font-semibold text-slate-900">Material Suggestion Tool</p>
                    <p className="mt-1">Gebruik de interactieve wizard om een startpunt te krijgen voor PLA, PETG, TPU en specials.</p>
                    <Link href="/materials#material-suggestion-tool" className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600">
                      Ga naar de tool <span aria-hidden>-&gt;</span>
                    </Link>
                  </div>
                  <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-4 text-sm text-slate-600">
                    <p className="font-semibold text-slate-900">Kennisbank en blog</p>
                    <p className="mt-1">Lees artikels over PLA vs PETG, kostprijsberekening en 3D printen in de buurt.</p>
                    <Link href="/blog" className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600">
                      Bekijk alle topics <span aria-hidden>-&gt;</span>
                    </Link>
                  </div>
                </div>
              </div>
              <p className="mt-6 text-xs text-slate-500">
                Niet zeker welk filament je nodig hebt? Gebruik de{" "}
                <Link href="/materials#material-suggestion-tool" className="font-semibold text-slate-900 underline decoration-slate-300 hover:decoration-slate-600">
                  Material Suggestion Tool
                </Link>{" "}
                of stuur je vraag door; we bekijken het persoonlijk.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <Reveal key={service.title} delay={index * 0.06}>
                <GlassCard className="h-full p-6 transition-transform hover:-translate-y-1">
                  <service.icon className="h-8 w-8 text-indigo-600" aria-hidden />
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">{service.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{service.description}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* KNOWLEDGE + SEO */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <div className="grid gap-6 md:grid-cols-3">
                {[
                  {
                    title: "PLA vs PETG",
                    body: "Vergelijk slagvastheid, hittebestendigheid en afwerking. Handig om materiaalkeuze te sturen.",
                    href: "/blog/pla-vs-petg",
                  },
                  {
                    title: "Hoeveel kost 3D printen?",
                    body: "Welke factoren beinvloeden de kost en hoe stellen we offertes op voor kleine reeksen.",
                    href: "/blog/hoeveel-kost-3d-printen",
                  },
                  {
                    title: "3D printen in de buurt",
                    body: "Afhalen in Herzele en leveringen richting Gent, Aalst en Antwerpen.",
                    href: "/blog/3d-printen-in-de-buurt",
                  },
                  {
                    title: "3D printen: materialen, prijzen, workflow",
                    body: "Overzichtspagina met use-cases, richtprijzen en FAQ. Goed startpunt voor nieuwe klanten.",
                    href: "/3d-printen",
                  },
                ].map((item) => (
                  <div key={item.title}>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Kennis</p>
                    <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{item.body}</p>
                    <Link
                      href={item.href}
                      className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600"
                    >
                      Lees artikel <span aria-hidden>-&gt;</span>
                    </Link>
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* USE CASES */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-6">
            <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">Waarvoor je 3D-printen inzet</h2>
            <p className="mt-2 max-w-3xl text-slate-600">
              Van engineering tot retail: 3D-printen versnelt ontwikkeling, verlaagt kosten en geeft vrijheid in vorm en
              kleur, ook voor kleine oplages.
            </p>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((useCase, index) => (
              <Reveal key={useCase.title} delay={index * 0.05}>
                <GlassCard className="h-full p-6">
                  <useCase.icon className="h-7 w-7 text-indigo-600" aria-hidden />
                  <h3 className="mt-3 text-base font-semibold text-slate-900">{useCase.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{useCase.description}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BIJBEROEP INFO */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <GlassCard className="p-6 lg:p-8">
              <h2 className="text-xl font-semibold tracking-tight text-slate-900">Lokale service in bijberoep</h2>
              <p className="mt-3 text-slate-600">
                X3DPrints draait naast een voltijdse job. Verwacht directe communicatie met de maker, een realistische
                planning en duidelijkheid over wat wel en niet mogelijk is.
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-slate-200/70 bg-white/70 p-4">
                  <h3 className="text-sm font-semibold text-slate-900">Beschikbaarheid</h3>
                  <p className="mt-1 text-sm text-slate-600">
                    Productie gebeurt vooral in de avonduren en in het weekend. We stemmen de planning meteen bij je aanvraag af.
                  </p>
                </div>
                <div className="rounded-lg border border-slate-200/70 bg-white/70 p-4">
                  <h3 className="text-sm font-semibold text-slate-900">Transparantie</h3>
                  <p className="mt-1 text-sm text-slate-600">
                    Je krijgt updates per mail over status en levering. Past iets niet in onze scope, dan zeggen we dat meteen.
                  </p>
                </div>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-slate-900">Segment spotlight</h2>
              <p className="mt-2 text-sm text-slate-600">
                Retail display-projecten, tabletop series en particulieren vragen elk hun eigen aanpak. Hier lees je hoe wij die segmenten ondersteunen.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <Link
                  href="/segments/3d-printing-marketing"
                  className="rounded-2xl border border-slate-200/70 bg-white/70 px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Retail & marketing props
                </Link>
                <Link
                  href="/segments/3d-printing-tabletop"
                  className="rounded-2xl border border-slate-200/70 bg-white/70 px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Tabletop & hobby runs
                </Link>
                <Link
                  href="/segments/3d-printing-makers"
                  className="rounded-2xl border border-slate-200/70 bg-white/70 px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Particulieren prints
                </Link>
              </div>
              <p className="mt-4 text-xs uppercase tracking-wide text-slate-500">
                Gebruik <Link href="/materials#material-suggestion-tool" className="font-semibold text-slate-900 underline">Material Suggestion Tool</Link> en stuur <Link href="/contact?material=PLA_MATTE" className="font-semibold text-slate-900 underline">contact met materiaal</Link> voor focus per cluster.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* SPECS + AFWERKING */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
            <Reveal>
              <GlassCard className="p-6">
                <h2 className="text-xl font-semibold tracking-tight text-slate-900">Specificaties</h2>
                <dl className="mt-3 grid gap-3 sm:grid-cols-2">
                  {specs.map((spec) => (
                    <div key={spec.k} className="rounded-lg border border-slate-200/70 bg-white/70 p-3">
                      <dt className="text-xs uppercase tracking-wide text-slate-500">{spec.k}</dt>
                      <dd className="mt-1 text-sm text-slate-700">{spec.v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 text-xs text-slate-500">
                  Grotere onderdelen worden eventueel opgesplitst en samengevoegd. Vraag gerust naar de beste aanpak.
                </p>
              </GlassCard>
            </Reveal>

            <Reveal delay={0.06}>
              <GlassCard className="p-6">
                <h2 className="text-xl font-semibold tracking-tight text-slate-900">Wat inbegrepen is</h2>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
                  <li>Supportverwijdering en licht ontbramen na de print</li>
                  <li>Persoonlijk advies over materiaal, orientatie en toleranties</li>
                  <li>Updates over planning, levering en eventuele iteraties</li>
                </ul>
                <p className="mt-4 text-sm text-slate-600">
                  We focussen op wat FDM sterk maakt: snelle, functionele prints. Schuren, primer, lak, inserts,
                  lijmverbindingen of montage behoren niet tot onze service.
                </p>
                <p className="mt-3 text-xs uppercase tracking-wide text-slate-500">
                  Toch nood aan die afwerking? We denken graag mee over partners of DIY-aanpak.
                </p>
              </GlassCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-xl font-semibold tracking-tight text-slate-900">Workflow</h2>
              <ol className="mt-3 list-decimal space-y-1 pl-5 text-slate-600">
                <li>Upload STL/STEP en vermeld toepassing, kleur en gewenste afwerking</li>
                <li>Materiaaladvies en offerte, doorgaans binnen 24 uur</li>
                <li>Productie, kwaliteitscheck en basis nabewerking (support verwijderen)</li>
                <li>Verzending of afhalen in Herzele; factuur digitaal</li>
              </ol>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <div className="px-6 pb-12 sm:px-8 lg:px-12">
        <CtaBlock city="België" />
      </div>

      {/* FAQ */}
      <section className="px-6 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Faq city="België" items={servicesFaq} />
          </Reveal>
        </div>
      </section>

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogJsonLd) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
    </main>
  )
}
