// app/(pages)/3d-printen/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import ContentTableOfContents from "@/components/ContentTableOfContents"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import {
  buildFaqPageSchema,
  buildHowToSchema,
  buildLocalBusinessSchema,
  buildOfferCatalog,
  buildServiceSchema,
  SchemaOfferInput,
} from "@/lib/seo"

export const metadata: Metadata = {
  title: "3D printen voor bedrijven in Belgie | Prototypes & tooling | X3DPrints",
  description:
    "Lokale 3D print service in Belgie vanuit Herzele voor KMO's en productteams: prototypes, jigs, fixtures, onderdelen op maat en kleine series. Ook advies voor particulieren.",
  alternates: { canonical: "https://www.x3dprints.be/3d-printen/", languages: { "nl-BE": "https://www.x3dprints.be/3d-printen/", "en-BE": "https://www.x3dprints.be/en/3d-printen/", "x-default": "https://www.x3dprints.be/3d-printen/", }, },
  openGraph: {
    title: "3D print service voor bedrijven in Belgie | X3DPrints",
    description:
      "Van STL/STEP naar bruikbare onderdelen: prototypes, tooling, displays en functionele parts. 3D printen in Belgie met snelle intake en duidelijke planning.",
    url: "https://www.x3dprints.be/3d-printen/",
    images: [{ url: "/images/og-home.svg", width: 1200, height: 630, alt: "3D printen landing" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D printen voor bedrijven in Belgie | X3DPrints",
    description: "B2B 3D print service voor prototypes, jigs, fixtures en onderdelen op maat.",
    images: ["/images/og-home.svg"],
  },
}

const useCases = [
  {
    title: "Prototypes voor productontwikkeling",
    body:
      "Valideer vorm, passing en functie zonder lange productieruns. We adviseren over orientatie, wanddikte en toleranties voor voorspelbare iteraties.",
    link: "/segments/3d-printing-prototypes",
  },
  {
    title: "Jigs & fixtures voor productie",
    body:
      "Functionele hulpstukken in PETG of sterker materiaal, afgestemd op repetitieve taken, montage en kwaliteitscontrole op de werkvloer.",
    link: "/services",
  },
  {
    title: "Onderdelen en behuizingen op maat",
    body:
      "Custom behuizingen, brackets en vervangonderdelen met nette afwerking. Inclusief advies rond inserts, passing en montage.",
    link: "/materials",
  },
  {
    title: "Retail displays en event props",
    body:
      "Kleine runs van props, displays en awards in opvallende materialen. Klaar voor etalage, beursstand, fotoshoot of activatie.",
    link: "/segments/3d-printing-marketing",
  },
]

const focusSegments = [
  {
    title: "Retail, events en etalages",
    description:
      "3D printen voor marketingmateriaal dat opvalt in rek, etalage of event. We printen display-elementen, signage en POS props die matchen met je campagne.",
    highlights: [
      "Kleine runs van logo-detail, letters en visuele cues in PLA Silk/Marble",
      "Sterkere PETG-onderdelen voor buitengebruik of exposities",
      "Kleef- en montagevriendelijke designs, klaar voor opstelling",
    ],
    cta: "/segments/3d-printing-marketing",
    ctaText: "Marketing cases",
  },
  {
    title: "Makers, tabletop en hobby",
    description:
      "Gedetailleerde 3D prints voor miniatures, terrain, organizers en custom onderdelen. Handig voor clubs, creators en pre-order batches.",
    highlights: [
      "Miniatures en terrain in hoog detail (0,12 mm layers) met PLA Matte of Silk",
      "Dice towers, organizers en upgrades voor hobby-kasten",
      "Kleine runs, pre-order batches of prototypes met snelle opvolging",
    ],
    cta: "/segments/3d-printing-makers",
    ctaText: "Voor makers",
  },
  {
    title: "Particulieren",
    description:
      "Functionele onderdelen en decoratieve prints op maat. Denk aan vervangstukken, gadgets, naamplaatjes en persoonlijke gifts.",
    highlights: [
      "Functioneel: connectors, houdertjes, gereedschap, prototypes van eigen ontwerpen",
      "Recreatie: speelstukken, gifts, gadgets en fandom art",
      "Decoratief: lichtobjecten, sculpturen en statement pieces in kleur of transparant",
    ],
    cta: "/contact?material=pla-matte",
    ctaText: "Vraag advies",
  },
]

const consultationOffers: SchemaOfferInput[] = [
  {
    serviceName: "B2B prototype intake",
    price: "EUR 0",
    description: "Intake voor prototypes, passing checks en iteratieruns voor productteams.",
  },
  {
    serviceName: "Tooling & fixture intake",
    price: "EUR 0",
    description: "Advies over materiaalkeuze en ontwerp voor jigs, fixtures en werkvloertoepassingen.",
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
  { size: "Small (ca. 5x5x5 cm)", price: "Vanaf ~EUR 5 in PLA Matte", useCase: "Naamplaatjes, clips, kleine adapters" },
  { size: "Medium (ca. 10x10x10 cm)", price: "Vanaf ~EUR 20 in PLA Matte", useCase: "Houders, brackets, mock-ups" },
  { size: "Large (ca. 20x20x20 cm)", price: "Vanaf ~EUR 49 in PLA Matte", useCase: "Displays, behuizingen, tools" },
]

const differentiators = [
  {
    title: "Lokale expertise in 3D printen",
    copy:
      "3D print service vanuit Herzele met directe lijn naar de maker. Snelle feedback en transparante planning zonder anonieme portals.",
  },
  {
    title: "Materiaaladvies op maat",
    copy:
      "PLA, PETG en TPU op voorraad, specials op aanvraag. We koppelen materiaalkeuze aan functie, omgeving en gewenste afwerking.",
  },
  {
    title: "Focus op efficient 3D printen",
    copy:
      "We optimaliseren je model voor minder support, kortere printtijd en sterkere onderdelen. Dat maakt 3D printen sneller en kostenefficiënter.",
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
      "Stuur je STL- of STEP-bestand met toepassing, kritieke maten en gewenste afwerking. Hoe beter de briefing, hoe gerichter de oplossing.",
  },
  {
    title: "2) Materiaal + prijs",
    detail:
      "We matchen PLA/PETG/TPU met jouw case en delen een voorstel met richtprijs, planning en eventuele ontwerpoptimalisaties.",
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

const knowledgeLinks = [
  {
    title: "B2B dienstenoverzicht",
    description: "Alle 3D print diensten voor bedrijven: prototypes, tooling, displays en kleine series.",
    href: "/services",
  },
  {
    title: "Portfolio en cases",
    description: "Concrete voorbeelden van onderdelen, props en functionele toepassingen voor bedrijven.",
    href: "/portfolio",
  },
  {
    title: "Prijzen & calculator",
    description: "Transparante uitleg over kostenstructuur, calculator en voorbeelden voor 3D printen.",
    href: "/pricing",
  },
  {
    title: "Materialenbibliotheek",
    description: "Overzicht van filamenten, kleuren, eigenschappen en materiaaladvies per toepassing.",
    href: "/materials",
  },
]

const fileChecklist = [
  "STL of STEP-bestand zonder niet-manifold vlakken of losse shells",
  "Orientatievoorkeur en kritieke maatvoering (schroefgaten, passing, pennen)",
  "Info over omgeving: binnen/buiten, chemie, UV of hitte (helpt bij materiaalkeuze)",
  "Gewenste afwerking (mat, silk, translucent) en eventuele nabewerking",
  "Deadline of eventdatum zodat we planning voor 3D printen correct opzetten",
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
      "Meestal binnen enkele werkdagen na akkoord, afhankelijk van oplage, materiaal en afwerking. Spoed blijft mogelijk in overleg.",
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
      "Tot ca. 35 x 32 x 35 cm in een stuk. Grotere projecten kunnen we slim opsplitsen en functioneel assembleren.",
  },
  {
    q: "Bieden jullie 3D printen aan in mijn regio?",
    a:
      "Ja. We leveren 3D print service in heel België, met focus op Vlaanderen (onder andere Gent en Aalst). Afhalen in Herzele is mogelijk op afspraak.",
  },
  {
    q: "Kan ik een 3D model laten printen zonder eigen ontwerp?",
    a:
      "Ja. Stuur een link naar een bestaand model of je idee. We helpen met schaal, printbaarheid en materiaalkeuze zodat je 3D model veilig geprint kan worden.",
  },
  {
    q: "Hoe snel krijg ik een offerte na mijn aanvraag?",
    a:
      "Meestal binnen 24 uur op werkdagen. Deel je STL/STEP, gewenste materiaalkeuze en deadline, dan kunnen we sneller een concrete prijs en planning geven.",
  },
]

const tocItems = [
  { id: "printen-definitie", label: "Wat bedoelen we met 3D printen?" },
  { id: "printen-pluspunten", label: "Waarom kiezen klanten voor X3DPrints?" },
  { id: "printen-toepassingen", label: "Welke toepassingen zijn typisch?" },
  { id: "printen-segmenten", label: "Voor wie printen we het meest?" },
  { id: "printen-materialen", label: "Welke materialen en richtprijzen zijn mogelijk?" },
  { id: "printen-workflow", label: "Hoe loopt de workflow van bestand tot levering?" },
  { id: "printen-faq", label: "FAQ over 3D printen" },
  { id: "printen-bronnen", label: "Bronnen en referenties" },
]

const references = [
  { label: "ISO/ASTM terminologie voor additive manufacturing", url: "https://www.astm.org/f2997-13r21.html" },
  { label: "Prusa materiaalgids (PLA, PETG, TPU)", url: "https://help.prusa3d.com/filament-material-guide" },
  { label: "All3DP uitleg van FDM 3D printen", url: "https://all3dp.com/2/fdm-3d-printing-explained/" },
]

const lastUpdatedLabel = "Laatst bijgewerkt: 16 februari 2026"

const pageUrl = String(
  metadata.openGraph?.url ?? metadata.alternates?.canonical ?? "https://www.x3dprints.be/3d-printen",
)

const faqJsonLd = buildFaqPageSchema({
  inLanguage: "nl-BE",
  mainEntityOfPage: pageUrl,
  items: faq.map((item) => ({ q: item.q, a: item.a })),
})

const howToJsonLd = buildHowToSchema({
  inLanguage: "nl-BE",
  mainEntityOfPage: pageUrl,
  name: "3D printen aanvragen bij X3DPrints",
  description: "Upload STL/STEP, ontvang materiaaladvies en prijs, wij 3D printen en leveren of jij haalt af.",
  steps: workflow.map((w) => ({ name: w.title, text: w.detail })),
  toolNames: ["FDM 3D-printer met PLA, PETG of TPU"],
  supplyNames: ["STL- of STEP-bestand voor 3D printen"],
})

const catalogJsonLd = buildOfferCatalog("3D print advies & projecten", consultationOffers)

const descriptionText = metadata.description ?? ""
const localBusinessJsonLd = buildLocalBusinessSchema({
  pageUrl,
  description: descriptionText,
  image: "/images/og-home.svg",
  priceRange: "EUR 0 - EUR 49",
  areaServed: "Gent, Aalst, Herzele & Vlaanderen",
})

const serviceJsonLd = buildServiceSchema("3D printen & advies", consultationOffers, pageUrl, {
  description: descriptionText,
  inLanguage: "nl-BE",
  mainEntityOfPage: pageUrl,
})

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
              3D printen op maat in Belgie voor bedrijven en particulieren.
            </h1>
            <p className="mt-3 max-w-3xl text-lg text-slate-700">
              3D print service Belgie vanuit Herzele voor prototypes, tooling, displays en onderdelen op maat. Heb je een STL/STEP-bestand
              of wil je hulp bij materiaalkeuze? We adviseren pragmatisch zodat je 3D prints snel inzetbaar zijn.
            </p>
            <p className="mt-2 max-w-3xl text-sm text-slate-600">
              Actief in Vlaanderen met focus op regio Gent, Aalst en Oudenaarde. Bekijk ook de{" "}
              <Link href="/locaties" className="font-semibold text-indigo-600 underline underline-offset-4">
                locatiepagina&apos;s
              </Link>{" "}
              voor lokale vindbaarheid per gemeente.
            </p>
            <p className="mt-2 text-xs font-medium uppercase tracking-[0.15em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ShimmerButton
                href="/contact?material=pla-matte"
                event={{ action: "cta_click", category: "3d-printen_hero", label: "quote" }}
              >
                Offerte voor 3D printen aanvragen
              </ShimmerButton>
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
            <ContentTableOfContents title="Inhoud" items={tocItems} className="mt-6 max-w-2xl" />
          </Reveal>
        </div>
      </section>

      {/* DEFINITION & KNOWLEDGE */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <GlassCard className="h-full p-6 sm:p-8">
              <h2 id="printen-definitie" className="scroll-mt-28 text-2xl font-semibold text-slate-900 sm:text-3xl">Wat bedoelen we met 3D printen?</h2>
              <p className="mt-3 text-sm text-slate-600">
                X3DPrints is een FDM 3D printservice in Vlaanderen. We printen met PLA, PETG, TPU en specials, allemaal op
                pro-printers in een gesloten omgeving. Dat betekent: strakke toleranties (+/-0,2 mm), controle over support en
                oriëntatie en eerlijk advies wanneer een ontwerp beter herwerkt wordt alvorens te 3D printen.
              </p>
              <p className="mt-3 text-sm text-slate-600">
                Zoek je een &quot;3D print bureau&quot; voor bedrijven of particulieren? Deze pagina koppelt je direct aan de juiste
                resources: diensten, materialen, prijzen, upload en segmenten. Zo vind je sneller de juiste route per use-case.
              </p>
              <p className="mt-3 text-sm text-slate-600">
                Wil je dieper duiken? Gebruik de onderstaande kennisbanklinks of start meteen in de{" "}
                <Link href="/blog" className="text-indigo-600 underline underline-offset-4">
                  blog & kennisbank
                </Link>{" "}
                waar we Filament Vrijdag, Maker Monday en sectorcases bundelen.
              </p>
            </GlassCard>

            <GlassCard className="h-full p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-slate-900">Kennisbank en checklist</h2>
              <p className="mt-2 text-sm text-slate-600">
                Elk 3D printproject start met goede input. Deze links sturen je naar de belangrijkste conversion-pagina&apos;s en de checklist
                toont wat we graag ontvangen bij een aanvraag.
              </p>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                {knowledgeLinks.map((item) => (
                  <li key={item.href} className="rounded-2xl border border-slate-200/70 bg-white/80 p-3">
                    <Link href={item.href} className="font-semibold text-emerald-600 hover:text-emerald-700">
                      {item.title}
                    </Link>
                    <p className="text-sm text-slate-600">{item.description}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Bestandschecklist</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {fileChecklist.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* DIFFERENTIATORS */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-6 max-w-3xl">
            <h2 id="printen-pluspunten" className="scroll-mt-28 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
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
            <h2 id="printen-toepassingen" className="scroll-mt-28 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Typische 3D print-toepassingen</h2>
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
            <h2 id="printen-segmenten" className="scroll-mt-28 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              3D printen voor marketing, makers en particulieren
            </h2>
            <p className="mt-2 text-slate-600">
              Deze segmenten vragen extra aandacht: van etalage-elementen en makers-projecten tot functionele en decoratieve 3D prints.
              We stemmen materiaal, afwerking en timing af op je doel.
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
              href="/segments/3d-printing-makers"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-800 transition hover:bg-white"
            >
              3D printen voor makers & hobby
            </Link>
            <Link
              href="/contact?material=pla-matte"
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
              <h2 id="printen-materialen" className="scroll-mt-28 text-2xl font-semibold text-slate-900 sm:text-3xl">Materialen voor 3D printen</h2>
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
                <ShimmerButton
                  href="/materials#material-suggestion-tool"
                  event={{ action: "cta_click", category: "3d-printen_materials", label: "tool" }}
                >
                  Material Suggestion Tool
                </ShimmerButton>
                <Link href="/materials" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600">
                  Naar materialen <span aria-hidden>-&gt;</span>
                </Link>
              </div>
            </GlassCard>

            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-slate-900">Prijsvoorbeelden voor 3D printen</h2>
              <p className="mt-2 text-sm text-slate-600">
                Richtprijzen in PLA Matte (standaard) als snelle benchmark. Specials en engineeringmaterialen kunnen hoger uitvallen.
                Je krijgt altijd een concrete offerte per 3D print-project.
              </p>
              <div className="mt-4 overflow-hidden rounded-xl border border-slate-200/70 bg-white/80">
                <table className="w-full text-left text-sm text-slate-700">
                  <caption className="sr-only">Richtprijzen voor 3D printen in PLA Matte</caption>
                  <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th scope="col" className="px-3 py-2 font-semibold">Formaat</th>
                      <th scope="col" className="px-3 py-2 font-semibold">Richtprijs</th>
                      <th scope="col" className="px-3 py-2 font-semibold">Typische toepassing</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricing.map((p) => (
                      <tr key={p.size} className="border-t border-slate-200/70">
                        <th scope="row" className="px-3 py-2 font-semibold text-slate-900">{p.size}</th>
                        <td className="px-3 py-2">{p.price}</td>
                        <td className="px-3 py-2">{p.useCase}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
            <h2 id="printen-workflow" className="scroll-mt-28 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Hoe 3D printen werkt bij X3DPrints</h2>
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
                  <ShimmerButton
                    href="/contact?material=pla-matte"
                    event={{ action: "cta_click", category: "3d-printen_cta", label: "gesprek" }}
                  >
                    Plan een gesprek
                  </ShimmerButton>
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
      <section id="printen-faq" className="scroll-mt-28 px-6 pb-20 sm:px-8 lg:px-12">
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

      <section id="printen-bronnen" className="scroll-mt-28 px-6 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Bronnen en referenties</h2>
              <p className="mt-2 text-sm text-slate-600">
                Deze bronnen gebruiken we voor terminologie, procesuitleg en materiaalgedrag binnen FDM 3D printen.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {references.map((reference) => (
                  <li key={reference.url} className="rounded-xl border border-slate-200/70 bg-white/80 px-4 py-3">
                    <cite className="not-italic">
                      <Link href={reference.url} target="_blank" rel="noreferrer" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        {reference.label}
                      </Link>
                    </cite>
                  </li>
                ))}
              </ul>
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
