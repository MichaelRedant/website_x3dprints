import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import GlassCard from "@/components/GlassCard"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"

const canonical = "https://www.x3dprints.be/blog/octopus-accountancy-3d-print-goodies"
const publishedDate = "2025-12-16T08:00:00+01:00"

export const metadata: Metadata = {
  title: "Case: Octopus x X3DPrints · 3D-geprinte mascottes, badges en event-goodies",
  description:
    "Hoe X3DPrints voor Octopus (accountancy software) 3D-geprinte mascottes, badges en goodies maakte voor kantoor, beurzen en events. Slimme materiaalkeuzes, snelle iteratie en consistente kwaliteit.",
  alternates: { canonical },
  openGraph: {
    title: "Case: Octopus x X3DPrints · 3D-geprinte mascottes, badges en event-goodies",
    description:
      "Samenwerking met Octopus: 3D-geprinte mascottes, QR-goodies en badges voor beurzen en kantoor. Snelle iteratie, duidelijke workflow en materialen die passen bij dagelijks gebruik.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    authors: ["https://www.x3dprints.be"],
    tags: ["Octopus case", "3D printing marketing", "event goodies", "badges", "mascotte", "SaaS merchandising"],
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "Octopus x X3DPrints case" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Case: Octopus x X3DPrints · 3D-geprinte mascottes, badges en event-goodies",
    description:
      "Mascottes, QR-goodies en badges voor kantoor en events. Zo maakte X3DPrints tastbare Octopus-merch die effectief gebruikt wordt.",
    images: ["/images/og-home.jpg"],
  },
}

const heroStats = [
  { label: "Gebruik", value: "Kantoor + events", note: "Goede merch leeft pas als mensen het écht gebruiken." },
  { label: "Materialen", value: "PLA / PETG / TPU (optioneel)", note: "Afhankelijk van look, slijtage en toepassing." },
  { label: "Productie", value: "Lokale iteratie", note: "Snel bijsturen op basis van feedback en context." },
]

const highlights = [
  "Octopus-mascottes als desk buddy en herkenbaar merkanker op kantoor.",
  "Badges om te dragen tijdens beurzen en events, praktisch en herbruikbaar.",
  "Goodies om weg te geven (en intern te gebruiken) met een QR-code naar relevante pagina’s.",
  "Korte feedbackloops: testen, aanpassen, opnieuw printen, zonder weken vertraging.",
]

const deliverables = [
  {
    title: "Mascottes (Octopus-figuren)",
    detail:
      "3D-geprinte octopusfiguren als herkenbare desk buddy. Ideaal voor foto’s, onboarding en visuele merkconsistentie op kantoor en events.",
  },
  {
    title: "Badges voor beurzen en events",
    detail:
      "Badges om te dragen tijdens events en partnerdagen. Ontwerp afgestemd op comfort, leesbaarheid en snelle productie in kleine reeksen.",
  },
  {
    title: "QR-goodies (give-aways en kantoor)",
    detail:
      "Kleine goodies met QR-code die mensen meteen naar de juiste info leidt (landing, demo, onboarding, contact of campagnepagina). Handig als give-away én intern op kantoor.",
  },
  {
    title: "Kleine reeksen, snelle iteratie",
    detail:
      "Geen massaproductie, wel batches die je kan bijsturen. Ideaal als je iets wil testen voor je grotere aantallen uitrolt.",
  },
]

const materialChoices = [
  {
    item: "Mascottes",
    material: "PLA (meestal Matte, soms met accent)",
    reason:
      "Nette details en mooie afwerking. Ideaal voor zichtwerk, foto’s en items die vooral ‘in the spotlight’ staan.",
  },
  {
    item: "Badges",
    material: "PETG (waar extra taaiheid nodig is)",
    reason:
      "PETG is taaier dan PLA en beter bestand tegen dagelijks gebruik. Handig wanneer badges veel meegaan, vastgeklikt worden of tegen een stootje moeten kunnen.",
  },
  {
    item: "Goodies",
    material: "PLA (snel en consistent) of PETG (meer robuust)",
    reason:
      "Voor give-aways is PLA vaak efficiënt. Als het doel ‘lang gebruik’ is (bv. op kantoor), is PETG soms de betere keuze.",
  },
  {
    item: "Grip/comfort (optioneel)",
    material: "TPU (flexibel)",
    reason:
      "Voor antislip, zachte randen of onderdelen die iets moeten ‘geven’ zonder te breken.",
  },
]

const workflow = [
  {
    title: "1) Doel en context",
    detail:
      "Waarvoor dient het item? Kantoor, event, give-away, partnerkit… Dat bepaalt afwerking, sterkte en materiaal.",
  },
  {
    title: "2) Modelcheck en printbaarheid",
    detail:
      "We checken details, wanddiktes, overhang en montagepunten. Zeker bij badges en QR-goodies is leesbaarheid cruciaal.",
  },
  {
    title: "3) Testprint en bijsturen",
    detail:
      "Eerst een kleine testbatch om schaal, feel en zichtbaarheid te checken. Daarna pas opschalen.",
  },
  {
    title: "4) Batchproductie",
    detail:
      "Reeksen worden gebundeld per materiaal/kleur waar mogelijk, zodat het consistent blijft en efficiënt geproduceerd kan worden.",
  },
]

const results = [
  "Meer merkpresence op kantoor: mascottes werken als visuele ‘anchor’ zonder dat het schreeuwerig wordt.",
  "Badges worden effectief gedragen tijdens events (en verdwijnen niet in een lade na één beurs).",
  "QR-goodies zijn laagdrempelig: één scan en je zit meteen op de juiste info.",
  "Het format leent zich perfect voor SaaS: snel testen, bijsturen en opnieuw inzetten bij volgende events.",
]

const faq = [
  {
    q: "Kunnen jullie ook kleine reeksen maken (bv. 10–30 stuks)?",
    a: "Ja. Dat is net één van de sterkste voordelen van 3D-printing. Je kan klein starten, feedback verzamelen en daarna opschalen.",
  },
  {
    q: "Wat heb je nodig om badges of goodies te kunnen maken?",
    a: "Idealiter een logo/icoon (SVG/AI/PNG), gewenste tekst en een idee van formaat. Als er een QR-code op moet, ook de bestemming (URL) en de gewenste grootte/leesbaarheid.",
  },
  {
    q: "Welke materialen zijn het meest geschikt voor events?",
    a: "Voor zichtwerk en give-aways is PLA vaak perfect. Voor items die veel gebruikt worden of steviger moeten zijn, is PETG een goede keuze. We adviseren per toepassing.",
  },
]

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Case: Octopus x X3DPrints · 3D-geprinte mascottes, badges en event-goodies",
  description:
    "Hoe X3DPrints voor Octopus mascottes, badges en QR-goodies maakte voor kantoor, beurzen en events. Focus op snelle iteratie, materiaalkeuze en herbruikbare kleine reeksen.",
  author: { "@type": "Organization", name: "X3DPrints" },
  publisher: {
    "@type": "Organization",
    name: "X3DPrints",
    logo: { "@type": "ImageObject", url: "https://www.x3dprints.be/images/brand-logo.png" },
  },
  mainEntityOfPage: canonical,
  datePublished: publishedDate,
  dateModified: publishedDate,
  image: ["https://www.x3dprints.be/images/og-home.jpg"],
}

export default function OctopusCasePage() {
  return (
    <article className="relative overflow-hidden px-4 pb-24 pt-12 sm:px-6 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-indigo-50" />
        <div className="absolute -left-12 top-[-12%] h-[22rem] w-[22rem] rounded-full bg-sky-200/50 blur-[140px]" />
        <div className="absolute -right-16 bottom-[-18%] h-[26rem] w-[26rem] rounded-full bg-indigo-200/40 blur-[160px]" />
      </div>

      {/* HEADER */}
      <header className="mx-auto max-w-5xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Case study</p>
        <h1 className="mt-3 text-balance text-4xl font-extrabold text-slate-900 sm:text-5xl">
          Octopus x X3DPrints: mascottes, badges en QR-goodies via 3D-print
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Voor Octopus (accountancy software) maakten we 3D-geprinte items die effectief gebruikt worden: mascottes op kantoor,
          badges voor events en goodies met QR-codes om snel naar de juiste info te gaan.
        </p>

        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <ShimmerButton href="/contact?topic=octopus-case">Bespreek een gelijkaardige set</ShimmerButton>
          <Link href="/segments/3d-printing-marketing" className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
            3D printing voor marketing & events
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {heroStats.map((item) => (
            <GlassCard key={item.label} className="border border-white/40 bg-white/85 px-4 py-3 text-left shadow-sm backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{item.label}</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">{item.value}</p>
              <p className="mt-1 text-xs text-slate-600">{item.note}</p>
            </GlassCard>
          ))}
        </div>
      </header>

      {/* HIGHLIGHTS */}
      <section className="mx-auto mt-12 max-w-5xl">
        <Reveal>
          <GlassCard className="border border-white/50 bg-white/85 p-6 shadow-lg backdrop-blur">
            <h2 className="text-2xl font-semibold text-slate-900">Highlights</h2>
            <ul className="mt-4 grid gap-3 md:grid-cols-2">
              {highlights.map((h) => (
                <li key={h} className="rounded-2xl border border-slate-100 bg-white/80 p-3 text-sm text-slate-700">
                  <span className="font-semibold text-slate-900">•</span> {h}
                </li>
              ))}
            </ul>
          </GlassCard>
        </Reveal>
      </section>

      {/* MEDIA + DELIVERABLES */}
      <section className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <Reveal>
          <GlassCard className="h-full border border-white/50 bg-white/85 p-6 shadow-lg backdrop-blur">
            <h2 className="text-2xl font-semibold text-slate-900">Wat we leverden</h2>
            <p className="mt-2 text-sm text-slate-600">
              We focusten op tastbare items die je team écht gebruikt: iets dat op kantoor blijft staan, iets dat je draagt op events,
              en iets dat je kan meegeven als give-away.
            </p>
            <ul className="mt-4 space-y-3">
              {deliverables.map((item) => (
                <li key={item.title} className="rounded-2xl border border-slate-100 bg-white/80 p-3">
                  <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{item.detail}</p>
                </li>
              ))}
            </ul>
          </GlassCard>
        </Reveal>

        <Reveal delay={0.1}>
          <GlassCard className="h-full border border-white/50 bg-white/85 p-4 shadow-lg backdrop-blur">
            <div className="grid gap-3">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/30 bg-slate-100">
                <Image
                  src="/images/portfolio/Octopus0925-19.webp"
                  alt="Octopus x X3DPrints: 3D-geprinte mascottes en items voor kantoor en events"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 420px"
                  priority
                />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/30 bg-slate-100">
                <Image
                  src="/images/portfolio/Octopus25-50.webp"
                  alt="Octopus x X3DPrints: detailfoto van 3D-geprinte goodies en branding-items"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 420px"
                />
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              Deze beelden tonen voorbeelden van de 3D-geprinte items binnen de Octopus-samenwerking. (Kleur en afwerking kunnen per batch verschillen.)
            </p>
          </GlassCard>
        </Reveal>
      </section>

      {/* TIMELAPSE */}
      <section className="mx-auto mt-12 max-w-5xl">
        <Reveal>
          <GlassCard className="border border-white/50 bg-white/85 p-6 shadow-lg backdrop-blur">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">Timelapse van een Octopus-print</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Voor wie graag ziet hoe zo’n mascot tot leven komt: een korte timelapse van een print.
                </p>
              </div>
              <a
                href="https://youtu.be/pEVjhj8Esmo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-500"
              >
                Open op YouTube ↗
              </a>
            </div>

            <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-black">
              <div className="relative aspect-video">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src="https://www.youtube-nocookie.com/embed/pEVjhj8Esmo"
                  title="Octopus print timelapse"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              Tip: voor promo-content werkt een timelapse vaak beter dan een “statische” foto. Het toont maakbaarheid en vakmanschap in 10 seconden.
            </p>
          </GlassCard>
        </Reveal>
      </section>

      {/* MATERIALS */}
      <section className="mx-auto mt-12 max-w-5xl">
        <Reveal>
          <GlassCard className="border border-white/50 bg-white/85 p-6 shadow-lg backdrop-blur">
            <h2 className="text-2xl font-semibold text-slate-900">Materiaalkeuzes</h2>
            <p className="mt-2 text-sm text-slate-600">
              We kiezen materiaal op basis van gebruik: zichtwerk (mooie afwerking), dagelijks gebruik (taaiheid) en comfort (flex).
              Dit is geen “one filament fits all” verhaal. Helaas.
            </p>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {materialChoices.map((choice) => (
                <div key={choice.item} className="rounded-2xl border border-slate-100 bg-white/80 p-3">
                  <p className="text-sm font-semibold text-slate-900">{choice.item}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{choice.material}</p>
                  <p className="mt-1 text-sm text-slate-600">{choice.reason}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/materials" className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-500">
                Materialen & kleuren
              </Link>
              <Link
                href="/materials#material-suggestion-tool"
                className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
              >
                Material Suggestion Tool
              </Link>
            </div>
          </GlassCard>
        </Reveal>
      </section>

      {/* WORKFLOW + RESULTS */}
      <section className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-2">
        <Reveal>
          <GlassCard className="h-full border border-white/50 bg-white/85 p-6 shadow-lg backdrop-blur">
            <h2 className="text-2xl font-semibold text-slate-900">Workflow</h2>
            <p className="mt-2 text-sm text-slate-600">
              Dit werkt goed voor SaaS en events omdat je snel kan testen en bijsturen, zonder tooling of lange doorlooptijden.
            </p>
            <ul className="mt-4 space-y-3">
              {workflow.map((step) => (
                <li key={step.title} className="rounded-2xl border border-slate-100 bg-white/80 p-3">
                  <p className="text-sm font-semibold text-slate-900">{step.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{step.detail}</p>
                </li>
              ))}
            </ul>
          </GlassCard>
        </Reveal>

        <Reveal delay={0.1}>
          <GlassCard className="h-full border border-white/50 bg-white/85 p-6 shadow-lg backdrop-blur">
            <h2 className="text-2xl font-semibold text-slate-900">Resultaat</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
              {results.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className="mt-4 rounded-2xl border border-indigo-100 bg-indigo-50/70 p-4 text-sm text-slate-700">
              <p className="font-semibold text-indigo-900">QR-codes: praktisch, niet “gimmicky”</p>
              <p className="mt-1">
                Een QR-code is pas nuttig als hij in de praktijk snel werkt: groot genoeg, goed contrast en op een plek die logisch is.
                Daarom testen we leesbaarheid op een paar verschillende smartphones vóór we een batch maken.
              </p>
            </div>
          </GlassCard>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="mx-auto mt-12 max-w-5xl">
        <Reveal>
          <GlassCard className="border border-white/50 bg-white/85 p-6 shadow-lg backdrop-blur">
            <h2 className="text-2xl font-semibold text-slate-900">FAQ</h2>
            <div className="mt-4 space-y-3">
              {faq.map((item) => (
                <div key={item.q} className="rounded-2xl border border-slate-100 bg-white/80 p-3">
                  <p className="text-sm font-semibold text-slate-900">{item.q}</p>
                  <p className="mt-1 text-sm text-slate-600">{item.a}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="mx-auto mt-14 max-w-5xl">
        <Reveal>
          <GlassCard className="flex flex-col gap-6 border border-white/50 bg-white/85 p-6 shadow-xl backdrop-blur sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Ook zoiets nodig?</p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-900">Merch of event-kits die mensen écht gebruiken</h2>
              <p className="mt-2 text-sm text-slate-600">
                Stuur je logo/asset, idee en aantallen door. Ik geef eerlijk advies over materiaal, afwerking en wat haalbaar is binnen je timing.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:items-end">
              <ShimmerButton href="/contact?topic=octopus-case">Contacteer me</ShimmerButton>
              <Link
                href="/segments/3d-printing-marketing"
                className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
              >
                Bekijk marketing & events segment
              </Link>
            </div>
          </GlassCard>
        </Reveal>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
    </article>
  )
}
