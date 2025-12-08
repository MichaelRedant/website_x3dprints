<<<<<<< ours
// app/(pages)/services/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import {
  Brush, Palette, Printer, Wrench, Layers, Package, Ruler, Box, Sparkles, Puzzle
} from "lucide-react"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import CtaBlock from "@/components/CtaBlock"
import Faq from "@/components/Faq"
=======
import type { Metadata } from "next"
import Link from "next/link"

import Reveal from "@/components/Reveal"
>>>>>>> theirs
import ShimmerButton from "@/components/ShimmerButton"
import { servicesFaq } from "@/content/services-faq"

export const metadata: Metadata = {
<<<<<<< ours
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

export default function Page() {
  const services = [
    {
      icon: Printer,
      title: "FDM 3D-printen",
      description:
        "Functionele onderdelen en prototypes in PLA, PETG of TPU. Tot ~25×25×25 cm per stuk, opsplitsen mogelijk.",
    },
    {
      icon: Palette,
      title: "Materiaal- & kleuradvies",
      description:
        "We helpen kiezen tussen sterkte, flexibiliteit en look zodat je een haalbare oplossing krijgt voor je budget.",
    },
    {
      icon: Layers,
      title: "Bestandscheck & slicing",
      description:
        "We controleren manifold issues, supports en oriëntatie en bereiden je model voor in de slicer.",
    },
    {
      icon: Ruler,
      title: "DFM-review",
      description:
        "Pragmatisch advies over wanddikte, infill en toleranties zodat prints vlot en betrouwbaar blijven.",
    },
    {
      icon: Package,
      title: "Prototypes & kleine reeksen",
      description:
        "Ideaal voor één stuk tot korte runs. Heldere planning en transparante prijs per batch.",
    },
    {
      icon: Wrench,
      title: "Kwaliteitscontrole",
      description:
        "We meten kritieke maten steekproefsgewijs na en bezorgen feedback voor eventuele iteraties.",
    },
    {
      icon: Sparkles,
      title: "Basis nabewerking",
      description:
        "Supportverwijdering en licht ontbramen waar nodig. Geen schuren, primen, lakken of lijmwerk.",
    },
    {
      icon: Box,
      title: "Afhalen of verzending",
      description:
        "Afhalen in Herzele of verzending binnen België. Verpakking afgestemd op kleine oplages.",
    },
  ]

  const useCases = [
    {
      icon: Sparkles,
      title: "Prototyping",
      description:
        "Snel valideren met strakke prototypes. Itereer zonder wachttijden en pas geometrie of materiaal aan per run.",
    },
    {
      icon: Puzzle,
      title: "Jigs & fixtures",
      description:
        "Hulpgereedschap, klemmen en malletjes op maat voor assemblage of test-opstellingen.",
    },
    {
      icon: Package,
      title: "Behuizingen & brackets",
      description:
        "Op maat gemaakte kastjes, houders en scharnierende onderdelen met nette passing.",
    },
    {
      icon: Brush,
      title: "Displays & retail",
      description:
        "POS-materiaal, producthouders en etalageonderdelen die opvallen en exact passen.",
    },
    {
      icon: Ruler,
      title: "Vervangstukken",
      description:
        "Niet-meer-leverbaar onderdeel? We printen een pasvorm-equivalent en testen de montage.",
    },
    {
      icon: Palette,
      title: "Gepersonaliseerd",
      description:
        "Naamplaatjes, gifts en premium decor met PLA Wood/Marble, Silk of Translucent varianten.",
    },
  ]

  const specs = [
    { k: "Formaat", v: "Tot ~25 × 25 × 25 cm per stuk (opdelen in segmenten kan)" },
    { k: "Layerhoogte", v: "0,12–0,28 mm afhankelijk van detail en sterkte" },
    { k: "Tolerantie", v: "Typisch ±0,2 mm voor FDM (bespreek kritische maten)" },
    { k: "Materialen", v: "PLA (mat/wood/marble/silk/…), PETG, TPU; andere in overleg" },
    { k: "Nabewerking", v: "Support verwijderen en licht ontbramen. Geen schuren, primer of lak." },
    { k: "Planning", v: "Meestal enkele werkdagen. Productie in bijberoep, spoed enkel indien haalbaar." },
  ]

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: servicesFaq.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  }

  // OfferCatalog voor services (SEO)
  const catalogJsonLd = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "X3DPrints 3D-printservices",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.title,
        description: s.description,
        areaServed: "BE",
        provider: { "@type": "LocalBusiness", name: "X3DPrints" },
      },
=======
  title: "Services",
  description: "Van FDM-printing tot nabewerking en montage. Snelle doorlooptijd, materiaaladvies en nette afwerking.",
}

const serviceBlocks = [
  {
    title: "FDM-printproductie",
    body:
      "Functionele prototypes en kleine series met consistente kwaliteit. We optimaliseren printoriëntatie voor sterkte en oppervlakte.",
    bullets: ["PLA, PETG, ABS/ASA, Nylon (PA) en PA-CF", "Tolerantie typisch ±0,2 mm", "Controle op maatvoering en hechting"],
  },
  {
    title: "Materiaal- en ontwerpadvies",
    body:
      "We denken mee over materiaalselectie, wanddikte, infill en inserts. Doel: onderdelen die passen, presteren en langer meegaan.",
    bullets: ["Advies op basis van toepassing en omgeving", "Aanpassingen voor betere printbaarheid", "Check op sterkte, UV en hitte"],
  },
  {
    title: "Nabewerking & finishing",
    body:
      "Strakkere look nodig? We schuren, primen en lakken voor een representatieve afwerking van behuizingen of zichtdelen.",
    bullets: ["Schuren en primer", "Spuitlak in huisstijlkleuren", "Eenvoudige label- of logo-toepassingen"],
  },
  {
    title: "Assemblage & functioneel testen",
    body:
      "Klaar voor gebruik afleveren. Denk aan metalen inserts, simpele montage en controle of bewegende delen vrij lopen.",
    bullets: ["Heat-set inserts en schroefdraad", "Klik- of boutmontage", "Basisfunctionele check voor passing"],
  },
]

const workflow = [
  {
    title: "Bestanden & context",
    detail: "Upload STL/STEP en vermeld toepassing, kritieke maten en gewenste afwerking.",
  },
  {
    title: "Materiaal & offerte",
    detail: "We matchen materiaal, printstrategie en nabehandeling en sturen een duidelijke prijsindicatie.",
  },
  {
    title: "Productie & kwaliteitscheck",
    detail: "Printen, visuele inspectie en maatcontrole op kritieke punten. Waar nodig lichte nabewerking.",
  },
  {
    title: "Levering of afhalen",
    detail: "Verzending in beschermde verpakking of ophalen in Gent. Factuur digitaal aangeleverd.",
  },
]

export default function Page() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: servicesFaq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
>>>>>>> theirs
    })),
  }

  return (
<<<<<<< ours
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
              X3DPrints is een éénmansstudio in bijberoep. Je spreekt rechtstreeks met de maker, krijgt eerlijke timings (meestal enkele werkdagen) en materiaaladvies dat past bij jouw project en budget.
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
                    Ik produceer vanuit Herzele en plan elke job persoonlijk. Geen ticket-systeem, wel rechtstreeks overleg met de maker, transparante communicatie en flexibiliteit voor lokale afhalingen.
                  </p>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" aria-hidden />Afhalen mogelijk voor Gent/Aalst, verzending voor heel België.</li>
                    <li className="flex gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" aria-hidden />Planning in overleg: typisch enkele werkdagen, spoed enkel wanneer haalbaar.</li>
                    <li className="flex gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" aria-hidden />Je krijgt feedback op design en materiaal voor we printen.</li>
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
                    <p className="font-semibold text-slate-900">Kennisbank & blog</p>
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
=======
    <main className="relative bg-slate-50">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(99,102,241,0.15),transparent_70%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.07]" />

      <section className="px-6 pb-12 pt-14 sm:px-10 lg:px-12 lg:pb-16">
        <div className="mx-auto max-w-5xl">
          <Reveal className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-3 py-1 text-xs font-medium text-slate-700 backdrop-blur">
              Services
            </p>
            <h1 className="mt-5 text-balance text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              Van model naar functioneel onderdeel, zonder ruis.
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-7 text-slate-600">
              Wij combineren FDM-printing met pragmatisch advies en nette afwerking. Gericht op B2B-teams die snel, herhaalbaar
              en zonder verrassingen willen leveren.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ShimmerButton href="/contact">Project bespreken</ShimmerButton>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300/70 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-800 backdrop-blur hover:bg-white"
              >
                Bekijk portfolio
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { label: "Doorlooptijd", value: "2–5 werkdagen" },
              { label: "Tolerantie", value: "Typisch ±0,2 mm" },
              { label: "Afwerking", value: "Schuren, primer, lak" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-slate-200/70 bg-white/80 p-5 text-slate-800 backdrop-blur">
                <div className="text-sm text-slate-500">{item.label}</div>
                <div className="mt-1 text-xl font-semibold">{item.value}</div>
              </div>
            ))}
>>>>>>> theirs
          </Reveal>
        </div>
      </section>

<<<<<<< ours
      {/* SERVICES GRID */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06}>
                <GlassCard className="h-full p-6 transition-transform hover:-translate-y-1">
                  <s.icon className="h-8 w-8 text-indigo-600" aria-hidden />
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">{s.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{s.description}</p>
                </GlassCard>
=======
      <section className="px-6 py-12 sm:px-10 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal className="mb-6 max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Wat we voor je oplossen</h2>
            <p className="mt-2 text-slate-600">
              Geen marketingpraat, wel duidelijke output: onderdelen die passen, stevig zijn en er verzorgd uitzien.
            </p>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {serviceBlocks.map((block, index) => (
              <Reveal
                key={block.title}
                delay={0.05 * (index + 1)}
                className="h-full rounded-2xl border border-slate-200/70 bg-white/80 p-6 backdrop-blur"
              >
                <h3 className="text-lg font-semibold text-slate-900">{block.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{block.body}</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {block.bullets.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
>>>>>>> theirs
              </Reveal>
            ))}
          </div>
        </div>
      </section>

<<<<<<< ours
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
                    body: "Leer welke factoren de kost beïnvloeden en hoe we offertes opstellen voor kleine reeksen.",
                    href: "/blog/hoeveel-kost-3d-printen",
                  },
                  {
                    title: "3D printen in de buurt",
                    body: "Uitleg over afhalen in Herzele en leveringen richting Gent, Aalst en Antwerpen.",
                    href: "/blog/3d-printen-in-de-buurt",
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
            {useCases.map((u, i) => (
              <Reveal key={u.title} delay={i * 0.05}>
                <GlassCard className="h-full p-6">
                  <u.icon className="h-7 w-7 text-indigo-600" aria-hidden />
                  <h3 className="mt-3 text-base font-semibold text-slate-900">{u.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{u.description}</p>
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
                X3DPrints draait naast een voltijdse job. Verwacht dus directe communicatie met de maker, een realistische
                planning en duidelijkheid over wat wel en niet mogelijk is.
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-slate-200/70 bg-white/70 p-4">
                  <h3 className="text-sm font-semibold text-slate-900">Beschikbaarheid</h3>
                  <p className="mt-1 text-sm text-slate-600">
                    Productie gebeurt vooral ’s avonds en in het weekend. We stemmen de planning meteen bij je aanvraag af.
                  </p>
                </div>
                <div className="rounded-lg border border-slate-200/70 bg-white/70 p-4">
                  <h3 className="text-sm font-semibold text-slate-900">Transparantie</h3>
                  <p className="mt-1 text-sm text-slate-600">
                    Je krijgt updates per mail over status en levering. Past iets niet in onze scope, dan zeggen we dat
                    meteen.
                  </p>
                </div>
              </div>
            </GlassCard>
=======
      <section className="px-6 py-12 sm:px-10 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal className="mb-5 max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Wanneer past X3DPrints?</h2>
            <p className="mt-2 text-slate-600">
              Typische cases: validatieprototypes, jigs en fixtures, behuizingen met nette afwerking en kleine series voor pilots.
            </p>
          </Reveal>
          <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal className="rounded-2xl border border-slate-200/70 bg-white/80 p-6 backdrop-blur">
              <h3 className="text-base font-semibold text-slate-900">Hoe wij value leveren</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {["Sparren over ontwerp zodat passing en sterkte kloppen.", "Snelle iteraties zonder in te boeten op afwerking.", "Heldere communicatie, inclusief haalbaarheid en risico's.", "Kleine series met voorspelbare kosten en levertijden."].map((line) => (
                  <li key={line} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.08} className="rounded-2xl border border-slate-200/70 bg-white/80 p-6 backdrop-blur">
              <h3 className="text-base font-semibold text-slate-900">Praktische info</h3>
              <dl className="mt-3 space-y-3 text-sm text-slate-700">
                {[{ term: "Bestandsformaten", detail: "STL en STEP, liefst met tolerantie-info." }, { term: "Minimale oplage", detail: "Vanaf 1 stuk, prijsoptimalisatie bij batches." }, { term: "Industries", detail: "B2B, productteams, maakbedrijven, onderwijs & labs." }, { term: "Verzending", detail: "Beschermde verpakking, tracking en optioneel afhalen in Gent." }].map((row) => (
                  <div key={row.term} className="flex gap-3">
                    <dt className="min-w-[130px] text-slate-500">{row.term}</dt>
                    <dd className="font-medium text-slate-900">{row.detail}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 sm:px-10 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal className="mb-5 max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Workflow</h2>
            <p className="mt-2 text-slate-600">Een duidelijke route zodat je weet waar je staat.</p>
          </Reveal>
          <ol className="relative ms-4 space-y-6 border-s-l border-slate-200 pl-6">
            {workflow.map((step, index) => (
              <Reveal key={step.title} delay={0.05 * (index + 1)} className="relative">
                <span className="absolute -start-[29px] top-1.5 grid h-3.5 w-3.5 place-items-center rounded-full bg-indigo-500 ring-4 ring-white" />
                <h3 className="text-base font-semibold text-slate-900">{`${index + 1}. ${step.title}`}</h3>
                <p className="text-slate-600">{step.detail}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-6 pb-16 pt-4 sm:px-10 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal className="rounded-3xl border border-slate-200/70 bg-white/80 p-8 backdrop-blur sm:p-10">
            <div className="grid gap-6 sm:grid-cols-[1.1fr_0.9fr] sm:items-center">
              <div>
                <h2 className="text-balance text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Veelgestelde vragen</h2>
                <p className="mt-2 max-w-prose text-slate-600">
                  Alles wat je moet weten over bestanden, doorlooptijd en afwerking. Mis je info? Stuur ons een berichtje.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <ShimmerButton href="/contact">Vraag stellen</ShimmerButton>
                  <Link
                    href="/pricing"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300/70 bg-white px-5 py-3 text-sm font-semibold text-slate-800"
                  >
                    Bekijk prijzen
                  </Link>
                </div>
              </div>
              <div className="space-y-4">
                {servicesFaq.map((item) => (
                  <div key={item.q} className="rounded-2xl border border-slate-200/70 bg-slate-50/80 p-4">
                    <h3 className="text-sm font-semibold text-slate-900">{item.q}</h3>
                    <p className="mt-1 text-sm text-slate-600">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
>>>>>>> theirs
          </Reveal>
        </div>
      </section>

<<<<<<< ours
      {/* SPECS + AFWERKING */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
            <Reveal>
              <GlassCard className="p-6">
                <h2 className="text-xl font-semibold tracking-tight text-slate-900">Specificaties</h2>
                <dl className="mt-3 grid gap-3 sm:grid-cols-2">
                  {specs.map((s) => (
                    <div key={s.k} className="rounded-lg border border-slate-200/70 bg-white/70 p-3">
                      <dt className="text-xs uppercase tracking-wide text-slate-500">{s.k}</dt>
                      <dd className="mt-1 text-sm text-slate-700">{s.v}</dd>
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
                  <li>Persoonlijk advies over materiaal, oriëntatie en toleranties</li>
                  <li>Updates over planning, levering en eventuele iteraties</li>
                </ul>
                <p className="mt-4 text-sm text-slate-600">
                  We focussen op wat FDM sterk maakt: snelle, functionele prints. Schuren, primen, lakken, inserts,
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
=======
      <section className="px-6 pb-20 sm:px-10 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal className="overflow-hidden rounded-3xl border border-slate-200/70 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-8 text-white shadow-soft sm:p-10">
            <div className="grid gap-6 sm:grid-cols-[1.1fr_0.9fr] sm:items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-slate-300">Klaar voor de volgende iteratie</p>
                <h2 className="mt-3 text-balance text-3xl font-bold leading-tight sm:text-4xl">
                  Plan je volgende print of kleine serie. Wij regelen de rest.
                </h2>
                <p className="mt-3 max-w-prose text-slate-200">
                  Stuur je bestanden door en ontvang een duidelijk voorstel met materiaalkeuze, levertijd en eventuele afwerking.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <ShimmerButton href="/contact">Offerte aanvragen</ShimmerButton>
                  <Link
                    href="/portfolio"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
                  >
                    Portfolio
                  </Link>
                </div>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/5 p-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  {[{ title: "Industrieel", detail: "Jigs, fixtures, machineonderdelen" }, { title: "Productteams", detail: "Validatieprototypes en pilots" }, { title: "Education & labs", detail: "Kleine batches zonder eigen printers" }, { title: "Service bureaus", detail: "Overflow support met voorspelbare kwaliteit" }].map((item) => (
                    <div key={item.title} className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <div className="text-sm font-semibold text-white">{item.title}</div>
                      <div className="text-sm text-slate-200">{item.detail}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
>>>>>>> theirs
          </Reveal>
        </div>
      </section>

<<<<<<< ours
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogJsonLd) }} />
=======
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
>>>>>>> theirs
    </main>
  )
}
