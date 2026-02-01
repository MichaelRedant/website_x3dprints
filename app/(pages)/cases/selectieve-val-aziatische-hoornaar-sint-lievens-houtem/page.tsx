import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import GlassCard from "@/components/GlassCard"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"

const slug = "selectieve-val-aziatische-hoornaar-sint-lievens-houtem"
const canonical = `https://www.x3dprints.be/cases/${slug}`
const enCanonical = `https://www.x3dprints.be/en/cases/${slug}`
const publishedDate = "2026-02-01T08:00:00+01:00"

export const metadata: Metadata = {
  title: "Case Study: Selectieve Val tegen Aziatische Hoornaar | X3DPrints",
  description:
    "Hoe Kerngroep #9520KLIMAAT en X3DPrints selectieve 3D-geprinte vallen inzetten om de opmars van de Aziatische hoornaar in Sint-Lievens-Houtem af te remmen.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": canonical,
      en: enCanonical,
    },
  },
  openGraph: {
    title: "Case Study: Selectieve Val tegen Aziatische Hoornaar",
    description:
      "Lokale impact met 3D-printen: selectieve vallen, duidelijke instructies, opvolging en schaalbare productie voor Sint-Lievens-Houtem.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    modifiedTime: publishedDate,
    authors: ["https://www.x3dprints.be"],
    tags: ["case study", "selectieve val", "Aziatische hoornaar", "3D printen", "Sint-Lievens-Houtem"],
    locale: "nl_BE",
    siteName: "X3DPrints",
    images: [
      {
        url: "/images/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Case Study - Selectieve val tegen Aziatische hoornaar door X3DPrints",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Study: Selectieve Val tegen Aziatische Hoornaar",
    description: "Lokale impact met 3D-printen: van ontwerp tot schaalbare productie en communicatie.",
    images: ["/images/og-home.jpg"],
  },
}

const heroStats = [
  { label: "Doelgroep", value: "Inwoners 9520", detail: "Toegankelijke actie aan EUR 4 per val" },
  { label: "Focusperiode", value: "Vroeg voorjaar", detail: "Koninginnen vangen = minder nesten" },
  { label: "Aanpak", value: "Selectief ontwerp", detail: "Doelsoort binnen, bijvangst kan ontsnappen" },
]

const externalLinks = [
  { label: "Kerngroep #9520KLIMAAT (Facebook)", href: "https://www.facebook.com/9520KLIMAAT" },
  { label: "Gemeente Sint-Lievens-Houtem (site)", href: "https://www.sint-lievens-houtem.be/" },
  {
    label: "Actiepagina selectieve val (gemeente)",
    href: "https://www.sint-lievens-houtem.be/nieuws/koop-een-selectieve-val-voor-de-aziatische-hoornaar",
  },
  {
    label: "Info wespen/bijen/hoornaars (gemeente)",
    href: "https://www.sint-lievens-houtem.be/wespen-bijen-hommels-en-hoornaars",
  },
]

const internalLinks = [
  {
    label: "3D printen (pillar)",
    href: "/3d-printen",
    desc: "Workflow, kwaliteitsaanpak en hoe we outdoor onderdelen plannen.",
  },
  {
    label: "Materialenoverzicht",
    href: "/materials/petg",
    desc: "Waarom PETG en PC de juiste keuze zijn voor buitengebruik.",
  },
  { label: "Pricing & calculator", href: "/pricing", desc: "Kost per stuk, batches en levertijd realistisch inschatten." },
  { label: "Viewer upload", href: "/viewer", desc: "Stuur STL/STEP voor gelijkaardige lokale projecten." },
  { label: "Contact", href: "/contact?topic=case-selectieve-val", desc: "Voor verenigingen, gemeenten en lokale initiatieven." },
]

const faqItems = [
  {
    question: "Wat is het verschil tussen een gewone en een selectieve hoornaarval?",
    answer:
      "Een selectieve val is ontworpen om Aziatische hoornaars te vangen, terwijl kleinere insecten zoals bijen en andere bestuivers via ontsnappingsopeningen kunnen wegvliegen. Zo beperk je bijvangst en focus je op de doelsoort.",
  },
  {
    question: "Wanneer plaats je best een selectieve val?",
    answer:
      "In het vroege voorjaar, wanneer vooral de koninginnen actief zijn. Een gevangen koningin betekent doorgaans één nest minder later in het seizoen.",
  },
  {
    question: "Is de Aziatische hoornaar gevaarlijk voor mensen?",
    answer:
      "Het grootste risico ontstaat wanneer een nest wordt benaderd of verstoord. De soort is vooral schadelijk voor bijen en andere bestuivers. Volg altijd de richtlijnen van de gemeente en meld nesten via de juiste kanalen.",
  },
  {
    question: "Hoe controleer ik of ik de juiste soort gevangen heb?",
    answer:
      "Maak een duidelijke foto en gebruik een herkenningsapp zoals ObsIdentify (via waarnemingen.be) of laat je vangst verifiëren via de contactkanalen van de actie (zoals aangegeven door de organisatoren/gemeente).",
  },
  {
    question: "Hoe kan ik gevangen hoornaars humaan doden?",
    answer:
      "Volgens de richtlijnen die bij de actie worden gedeeld kan je de pot enkele minuten volledig onder water dompelen of de pot in de diepvriezer plaatsen. Controleer altijd de meest recente instructies op de gemeentepagina.",
  },
  {
    question: "Welke lokstof gebruik ik en hoeveel?",
    answer:
      "Een vaak gebruikte mix is 1/3 bier, 1/3 wijn en 1/3 suikerstroop of grenadine. Vul de pot tot ongeveer 2 à 3 cm hoogte en ververs regelmatig, afhankelijk van vervuiling en verdunning.",
  },
  {
    question: "Waarom wordt de glazen pot niet meegeleverd?",
    answer:
      "De oplossing is ontworpen voor hergebruik van standaard glazen potten met brede opening (bijvoorbeeld een chocopot). Dat maakt het goedkoper, duurzamer en makkelijker te vervangen.",
  },
  {
    question: "Helpt één val echt?",
    answer:
      "Ja, zeker als veel inwoners meedoen. Het effect wordt groter naarmate de actie breder gedragen wordt: meer vallen in het vroege seizoen betekent minder kans op nieuwe nesten later.",
  },
]

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
}

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Case Study: Selectieve Val tegen Aziatische Hoornaar in Sint-Lievens-Houtem",
  description:
    "Hoe Kerngroep #9520KLIMAAT en X3DPrints selectieve 3D-geprinte vallen inzetten om de opmars van de Aziatische hoornaar af te remmen.",
  datePublished: publishedDate,
  dateModified: publishedDate,
  author: {
    "@type": "Organization",
    name: "X3DPrints",
    url: "https://www.x3dprints.be",
  },
  publisher: {
    "@type": "Organization",
    name: "X3DPrints",
    url: "https://www.x3dprints.be",
    logo: {
      "@type": "ImageObject",
      url: "https://www.x3dprints.be/og-x3dprints.jpg",
    },
  },
  mainEntityOfPage: canonical,
  url: canonical,
  image: "https://www.x3dprints.be/images/og-home.jpg",
  inLanguage: ["nl-BE", "en-BE"],
}

function SectionDivider() {
  return (
    <div className="mx-auto my-10 flex w-full max-w-4xl items-center gap-3 text-xs uppercase tracking-[0.3em] text-slate-500">
      <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-indigo-300/0 via-indigo-300/60 to-indigo-300/0" />
      <span>Case Study</span>
      <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-indigo-300/0 via-indigo-300/60 to-indigo-300/0" />
    </div>
  )
}

export default function CaseStudySelectiveTrapPage() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(160%_90%_at_50%_-20%,rgba(79,70,229,0.18),transparent_75%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.08]" />

      {/* HERO */}
      <section className="px-6 pb-12 pt-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal className="stacked-content">
            <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
              <ol className="flex flex-wrap gap-2">
                <li>
                  <Link
                    href="/blog#segments-cases"
                    className="font-medium text-indigo-600 transition hover:text-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Cases
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="font-medium text-slate-900">Selectieve val Aziatische hoornaar</li>
              </ol>
            </nav>

            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">
              Lokale impact met 3D-printen
            </p>

            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Selectieve vallen tegen de Aziatische hoornaar in Sint-Lievens-Houtem
            </h1>

            <p className="mt-4 text-lg text-slate-700">
              Kerngroep <span className="font-semibold">#9520KLIMAAT</span> startte een lokale verkoopactie van selectieve vallen om de
              opmars van de Aziatische hoornaar af te remmen. X3DPrints is maakpartner voor het 3D-geprinte deksel: schaalbaar,
              consistent en ontworpen om bijvangst te beperken.
            </p>

            <div className="stacked-actions mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
              <ShimmerButton href="/contact?topic=case-selectieve-val&material=PETG%20Matte">
                Praat met ons over jouw project
              </ShimmerButton>

              <Link
                href="/3d-printen"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Onze productie-aanpak
              </Link>

              <Link
                href="https://www.sint-lievens-houtem.be/nieuws/koop-een-selectieve-val-voor-de-aziatische-hoornaar"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Actiepagina gemeente
              </Link>
            </div>

            <p className="mt-6 text-sm text-slate-500">Gepubliceerd op 1 februari 2026.</p>
          </Reveal>

          <div className="mt-10 grid gap-4 rounded-3xl border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur sm:grid-cols-3">
            {heroStats.map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{stat.label}</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{stat.value}</p>
                <p className="text-sm text-slate-600">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* PROBLEEM + URGENTIE */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Het probleem</h2>
              <p className="mt-3 text-sm text-slate-600">
                De Aziatische hoornaar is een invasieve soort die druk zet op bijen en andere bestuivers. Lokale besturen voorzien
                daarom info- en meldkanalen voor nesten en waarnemingen.
              </p>
              <p className="mt-3 text-sm text-slate-600">
                Lees de achtergrond en officiële aanpak via de gemeente:{" "}
                <Link
                  href="https://www.sint-lievens-houtem.be/wespen-bijen-hommels-en-hoornaars"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 underline underline-offset-4"
                >
                  wespen, bijen, hommels en hoornaars
                </Link>
                .
              </p>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.1}>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Waarom vroeg in het seizoen?</h2>
              <p className="mt-3 text-sm text-slate-600">
                In het vroege voorjaar zijn vooral koninginnen actief. Door net dan te vangen, verklein je de kans op nieuwe
                nesten later in het seizoen. Daarom draait deze actie rond een eenvoudige, betaalbare instap voor inwoners.
              </p>
              <p className="mt-3 text-sm text-slate-600">
                De praktische instructies (lokstof, controle, afhaalpunten) staan op de{" "}
                <Link
                  href="https://www.sint-lievens-houtem.be/nieuws/koop-een-selectieve-val-voor-de-aziatische-hoornaar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 underline underline-offset-4"
                >
                  actiepagina van Sint-Lievens-Houtem
                </Link>
                .
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* VISUALS */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="relative overflow-hidden rounded-3xl border border-white/40 bg-white/80 shadow-lg">
                <Image
                  src="/images/portfolio/hornaarval.webp"
                  alt="Selectieve 3D-geprinte trechter voor de Aziatische hoornaar, gemonteerd op glazen pot"
                  width={1280}
                  height={960}
                  className="h-full w-full object-cover"
                  sizes="(min-width: 1024px) 600px, 100vw"
                  priority
                />
              </div>
              <div className="relative overflow-hidden rounded-3xl border border-white/40 bg-white/80 shadow-lg">
                <Image
                  src="/images/portfolio/hoornaarval2.webp"
                  alt="Detail van de ontsnappingsopeningen in het 3D-geprinte deksel voor selectieve hoornaarvallen"
                  width={1280}
                  height={960}
                  className="h-full w-full object-cover"
                  sizes="(min-width: 1024px) 600px, 100vw"
                />
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Foto’s: 3D-geprinte trechter in PETG Matte, klaar voor montage op hergebruikte glazen potten.
            </p>
          </Reveal>
        </div>
      </section>

      {/* OPLOSSING */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">De oplossing: een selectief 3D-geprint deksel</h2>
              <p className="mt-2 text-sm text-slate-600">
                De val bestaat uit een 3D-geprint trechterdeksel dat past op een standaard glazen pot met brede opening. De pot
                zelf wordt hergebruikt (niet inbegrepen), wat de drempel laag houdt en de actie betaalbaar maakt.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-100 bg-white/60 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Selectiviteit</p>
                  <p className="mt-2 text-sm text-slate-700">
                    Ontsnappingsopeningen voor kleinere insecten beperken bijvangst en focussen op de doelsoort.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-white/60 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Schaalbaarheid</p>
                  <p className="mt-2 text-sm text-slate-700">
                    3D-printen laat toe om snel en consistent grotere aantallen te produceren zonder toolingkost.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-white/60 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Toegankelijk</p>
                  <p className="mt-2 text-sm text-slate-700">
                    Lage instapkost, duidelijke instructies via gemeente en kerngroep, en herbruikbare potten.
                  </p>
                </div>
              </div>

              <p className="mt-4 text-xs text-slate-500">
                Opmerking: X3DPrints is maakpartner voor het 3D-geprinte onderdeel. Richtlijnen rond gebruik en opvolging volgen
                de communicatie van de actie en de gemeente.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* GEBRUIK & MATERIAAL */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Gebruik in de praktijk</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                  <span>
                    Lokstof: vul tot ongeveer 2 à 3 cm met een mix (1/3 bier, 1/3 wijn, 1/3 suikerstroop of grenadine). Ververs
                    bij vervuiling of verdunning.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                  <span>Controleer regelmatig en meld verdachte vangsten volgens de gemeentelijke richtlijnen.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                  <span>
                    Doden gebeurt via onderdompeling of diepvriezer zoals de actie voorschrijft. Identificatie kan via foto of
                    app (ObsIdentify/waarnemingen.be).
                  </span>
                </li>
              </ul>

              <p className="mt-4 text-sm text-slate-600">
                Alle instructies, afhaalpunten en opvolging vind je op de{" "}
                <Link
                  href="https://www.sint-lievens-houtem.be/nieuws/koop-een-selectieve-val-voor-de-aziatische-hoornaar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 underline underline-offset-4"
                >
                  gemeentelijke actiepagina
                </Link>
                .
              </p>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.08}>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Materiaal & productie-aanpak</h2>
              <p className="mt-2 text-sm text-slate-600">
                Voor deze val gebruiken we PETG Matte voor UV- en vochtbestendigheid. De wanddiktes en trechtergeometrie zijn
                afgestemd op FDM, zodat elke batch dezelfde pasvorm levert.
              </p>
              <div className="mt-4 grid gap-3">
                <div className="rounded-2xl border border-slate-100 bg-white/60 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Consistentie</p>
                  <p className="mt-2 text-sm text-slate-700">
                    Elke batch wordt gemeten op binnendiameter en clipsterkte zodat het deksel op standaard potten blijft passen.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-white/60 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Schaalbare levering</p>
                  <p className="mt-2 text-sm text-slate-700">
                    Kleine runs voor lokale acties of grotere batches bij bredere uitrol; we plannen de printers op basis van de
                    piekperiode in het voorjaar.
                  </p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-3 text-sm">
                <Link
                  href="/materials/petg"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-5 py-3 font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Bekijk PETG fiche
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-5 py-3 font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Bereken kost per batch
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* RESULTAAT & LEERPUNTEN */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Resultaten & learnings</h2>
              <div className="mt-3 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-100 bg-white/60 p-4 text-sm text-slate-700">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Community</p>
                  <p className="mt-2">
                    Lage instapkost (EUR 4) en duidelijke instructies verlagen de drempel. Het hergebruik van potten maakt vervanging
                    simpel voor inwoners.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-white/60 p-4 text-sm text-slate-700">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Opschaling</p>
                  <p className="mt-2">
                    Het ontwerp is klaar voor herdruk of uitbreiding naar buurgemeenten zonder toolingwijziging. Lead time wordt
                    afgestemd op de vroege voorjaarspiek.
                  </p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-3 text-sm">
                <ShimmerButton href="/contact?topic=case-selectieve-val&material=PETG%20Matte">
                  Start een gelijkaardig project
                </ShimmerButton>
                <Link
                  href="/segments"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-5 py-3 font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Bekijk segmenten & cases
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* INTERNE LINKS */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Interne links voor jouw volgende stap</h2>
              <p className="mt-2 text-sm text-slate-600">
                Gebruik deze case study als vertrekpunt voor gelijkaardige projecten: burgerinitiatieven, scholen, verenigingen of
                lokale besturen. We houden van dingen die praktisch zijn en meetbaar effect hebben.
              </p>
              <div className="mt-4 grid gap-3">
                {internalLinks.map((item) => (
                  <div key={item.href} className="rounded-2xl border border-slate-100 bg-white/60 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{item.label}</p>
                    <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
                    <Link
                      href={item.href}
                      className="mt-3 inline-flex text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
                    >
                      Naar {item.label} <span aria-hidden className="ml-1">-&gt;</span>
                    </Link>
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.08}>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Bronnen en partners</h2>
              <p className="mt-2 text-sm text-slate-600">
                Transparantie helpt. Dit zijn de officiële pagina’s en partners die bij deze actie horen.
              </p>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {externalLinks.map((ref) => (
                  <li key={ref.href} className="rounded-2xl border border-slate-100 bg-white/60 p-4">
                    <Link
                      href={ref.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-semibold text-indigo-600 transition hover:text-indigo-500"
                    >
                      {ref.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">FAQ</h2>
              <div className="mt-4 space-y-4 text-sm text-slate-600">
                {faqItems.map((item) => (
                  <div key={item.question}>
                    <p className="font-semibold text-slate-900">{item.question}</p>
                    <p className="mt-1">{item.answer}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <ShimmerButton href="/contact?topic=case-selectieve-val&material=PETG%20Matte">
                  Start een gelijkaardig project
                </ShimmerButton>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Bekijk pricing
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogReadMore />

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </main>
  )
}
