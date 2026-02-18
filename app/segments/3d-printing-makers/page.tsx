import type { Metadata } from "next"
import Link from "next/link"
import ContentTableOfContents from "@/components/ContentTableOfContents"
import Faq from "@/components/Faq"
import GlassCard from "@/components/GlassCard"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import ReadMoreLinks from "@/components/ReadMoreLinks"
import {
  SITE,
  buildFaqPageSchema,
  buildHowToSchema,
  buildLocalBusinessSchema,
  buildServiceSchema,
  SchemaOfferInput,
} from "@/lib/seo"

export const metadata: Metadata = {
  title: "3D printen voor particulieren en makers | X3DPrints",
  description:
    "3D print service voor particulieren in Belgie: custom onderdelen, cosplay props, repair parts, modelbouw en hobbyprojecten met materiaaladvies vanuit Herzele.",
  alternates: {
    canonical: "https://www.x3dprints.be/segments/3d-printing-makers/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/segments/3d-printing-makers/",
      "en-BE": "https://www.x3dprints.be/en/segments/3d-printing-makers/",
      "x-default": "https://www.x3dprints.be/segments/3d-printing-makers/",
    },
  },
  openGraph: {
    title: "3D printen voor particulieren, makers en hobbyisten",
    description:
      "Laat je 3D model printen voor hobby, cosplay of repair met duidelijke materiaalkeuze, prijsindicatie en planning in Vlaanderen.",
    url: "https://www.x3dprints.be/segments/3d-printing-makers/",
    images: [{ url: "/Logo.webp", width: 1200, height: 630, alt: "3D printing voor makers en hobbyisten" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D printen voor particulieren en makers",
    description:
      "Van cosplay tot repair parts: lokale 3D print service voor particulieren met direct overleg.",
    images: ["/Logo.webp"],
  },
}

const pageUrl = String(
  metadata.alternates?.canonical ?? `${SITE.url}/segments/3d-printing-makers/`,
)
const pageDescription = metadata.description ?? SITE.description
const lastUpdatedLabel = "Laatst bijgewerkt: 16 februari 2026"

const tocItems = [
  { id: "segment-overview", label: "Wat krijg je als particulier bij X3DPrints?" },
  { id: "segment-fit", label: "Voor welke projecten is deze route geschikt?" },
  { id: "segment-workflow", label: "Hoe loopt je aanvraag van idee tot print?" },
  { id: "segment-model-finder", label: "Geen eigen model? Zo start je toch" },
  { id: "segment-use-cases", label: "Welke projecten printen we vaak?" },
  { id: "segment-pricing", label: "Wat kost een particuliere 3D print?" },
  { id: "segment-links", label: "Welke links helpen je sneller vooruit?" },
  { id: "segment-faq", label: "FAQ voor particulieren en makers" },
  { id: "segment-sources", label: "Bronnen en referenties" },
]

const workflowSteps = [
  {
    title: "1. Project en gebruik delen",
    copy: "Stuur STL of STEP, foto of schets en leg uit waarvoor je onderdeel dient (decor, repair, cosplay, modelbouw).",
  },
  {
    title: "2. Materiaal en printstrategie kiezen",
    copy: "Samen bepalen we PLA Matte, PLA Tough, PETG of TPU op basis van detail, sterkte, temperatuur en afwerking.",
  },
  {
    title: "3. Prijs en planning bevestigen",
    copy: "Je krijgt een heldere offerte met realistische timing, zodat je vooraf weet waar je budget en deadline landen.",
  },
  {
    title: "4. Printen, check en levering",
    copy: "We produceren je onderdelen, doen een kwaliteitscheck en leveren via afhaling of veilige verzending in Vlaanderen.",
  },
]

const useCaseRows = [
  {
    project: "Cosplay props, helmdelen en accessoires",
    material: "PLA Matte of PLA Tough",
    note: "Veel detail, nette afwerking en betaalbare iteraties voor pasvorm en look.",
  },
  {
    project: "Repair parts, clips en functionele houders",
    material: "PETG",
    note: "Sterker voor dagelijks gebruik, betere hittebestendigheid en langere levensduur.",
  },
  {
    project: "Modelbouw onderdelen en testprints",
    material: "PLA Matte",
    note: "Scherpe details en snelle testcycli voor schaalmodellen of eigen ontwerpen.",
  },
  {
    project: "Gripdelen, dempers en flexibele verbindingen",
    material: "TPU",
    note: "Flexibel materiaal voor comfort en schokdemping.",
  },
  {
    project: "Interieurstukken, gifts en personalisaties",
    material: "PLA Matte of PLA Silk",
    note: "Goede visuele afwerking met kleurkeuze en personalisatie via naam of tekst.",
  },
]

const pricingRows = [
  {
    project: "Klein onderdeel (clip, adapter, naamplaatje)",
    material: "PLA Matte",
    price: "vanaf EUR 5",
    timing: "meestal enkele werkdagen",
  },
  {
    project: "Middelgroot stuk (houder, cosplay part, modeldeel)",
    material: "PLA Tough of PETG",
    price: "vanaf EUR 20",
    timing: "in overleg volgens complexiteit",
  },
  {
    project: "Groter stuk (behuizing, display, set)",
    material: "PETG of PLA",
    price: "vanaf EUR 49",
    timing: "afhankelijk van volume en afwerking",
  },
]

const quickWins = [
  "Direct contact met dezelfde maker die print en opvolgt",
  "Snelle iteraties zonder overbodige complexiteit of ticketsystemen",
  "Praktisch materiaaladvies in klare taal voor particulieren",
  "Duidelijke offerte met planning voor je project start",
  "Lokale opvolging vanuit Herzele met levering in Vlaanderen",
]

const faqItems = [
  {
    q: "Welke bestanden moet ik aanleveren?",
    a: "Een STL of STEP is meestal voldoende. Voeg afmetingen, gebruikscontext en referentiefoto toe voor sneller advies.",
  },
  {
    q: "Kunnen jullie 3D printen voor particulieren zonder eigen ontwerp?",
    a: "Ja. Je kan starten met een bestaand model of een idee. We helpen je met schaal, printbaarheid en materiaalkeuze.",
  },
  {
    q: "Ik heb geen eigen 3D model. Hoe kan ik toch starten?",
    a: "Gebruik onze gids /3d-modellen-vinden om betrouwbare modelplatformen te kiezen. Stuur daarna de link door, dan checken we printbaarheid, schaal en materiaal.",
  },
  {
    q: "Kunnen jullie ook kleine ontwerpaanpassingen doen?",
    a: "Ja, kleine tweaks zijn mogelijk. Grotere CAD-aanpassingen gebeuren als aparte ontwerpservice.",
  },
  {
    q: "Wat kost 3D printen voor een particulier project?",
    a: "Dat hangt af van volume, materiaal en afwerking. Kleine prints starten vaak vanaf EUR 5, maar je krijgt altijd een concrete offerte vooraf.",
  },
  {
    q: "Hoe snel kan mijn print klaar zijn?",
    a: "Dat hangt af van volume, materiaal en planning. Je krijgt altijd een realistische timing voordat productie start.",
  },
  {
    q: "Welke materialen zijn het meest geschikt voor hobbyprojecten?",
    a: "PLA Matte is vaak de beste start voor detail en prijs. PETG gebruiken we voor sterkere onderdelen, TPU voor flexibele of schokdempende delen.",
  },
  {
    q: "Leveren jullie ook buiten Gent of Herzele?",
    a: "Ja. Je kan afhalen in Herzele of kiezen voor levering in Vlaanderen. Dat bespreken we meteen bij je aanvraag.",
  },
]

const references = [
  {
    label: "Prusa material guide (PLA, PETG, TPU)",
    href: "https://help.prusa3d.com/filament-material-guide",
  },
  {
    label: "All3DP FDM process explainer",
    href: "https://all3dp.com/2/fdm-3d-printing-explained/",
  },
  {
    label: "Google Search docs: crawlable links",
    href: "https://developers.google.com/search/docs/crawling-indexing/links-crawlable",
  },
  {
    label: "Autodesk: wat is additive manufacturing?",
    href: "https://www.autodesk.com/solutions/additive-manufacturing/what-is-additive-manufacturing",
  },
]

const faqJsonLd = buildFaqPageSchema({
  inLanguage: "nl-BE",
  mainEntityOfPage: pageUrl,
  items: faqItems.map((item) => ({ q: item.q, a: item.a })),
})

const serviceOffers: SchemaOfferInput[] = [
  {
    serviceName: "3D printen voor particulieren en makers",
    price: "EUR 5",
    description: "Custom onderdelen, cosplay props, modelbouw en repair prints met materiaaladvies.",
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
  "3D printen voor particulieren en makers",
  serviceOffers,
  pageUrl,
  {
    description: pageDescription,
    inLanguage: "nl-BE",
    mainEntityOfPage: pageUrl,
  },
)

const howToJsonLd = buildHowToSchema({
  name: "Particuliere 3D printaanvraag in 4 stappen",
  description:
    "Vraag snel een custom 3D print aan voor hobby- en particuliere projecten met duidelijke materiaalroute en planning.",
  inLanguage: "nl-BE",
  mainEntityOfPage: pageUrl,
  totalTime: "PT3M",
  steps: [
    {
      name: "Project en bestand delen",
      text: "Stuur STL of STEP met korte beschrijving van je project en gewenste look.",
    },
    {
      name: "Materiaal bepalen",
      text: "Kies PLA Matte, PLA Tough, PETG of TPU volgens gebruik en afwerking.",
    },
    {
      name: "Prijs en timing bekijken",
      url: "/pricing?utm_source=segment-makers&utm_medium=howto&utm_campaign=makers-flow",
    },
    {
      name: "Aanvraag met prefill versturen",
      url: "/contact?material=pla-matte&quote=Particuliere%20aanvraag%20voor%20custom%20onderdeel",
    },
  ],
  toolNames: ["Material Suggestion Tool"],
  supplyNames: ["STL of STEP bestand"],
})

export default function MakersSegmentPage() {
  return (
    <main className="relative overflow-hidden px-4 pb-24 pt-12 sm:px-6 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-cyan-50" />
        <div className="absolute right-[-8%] top-[-18%] h-[22rem] w-[22rem] rounded-full bg-emerald-200/35 blur-[120px]" />
      </div>

      <section id="segment-overview" className="mx-auto max-w-5xl scroll-mt-28">
        <Reveal>
          <header className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Segment</p>
            <h1 className="mt-3 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              3D printen voor particulieren, makers en hobbyisten
            </h1>
            <p className="mt-4 text-base text-slate-600">
              3D printen voor particulieren: van cosplay en modelbouw tot repair parts, custom houders en persoonlijke projecten.
              Je krijgt persoonlijk advies, snelle opvolging en een heldere materiaalkeuze.
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Zoek je een lokale partner om een 3D model te laten printen in Belgie? Vanuit Herzele begeleiden we je van idee
              naar functioneel onderdeel met transparante prijs en realistische planning.
            </p>
            <p className="mt-2 text-xs font-medium uppercase tracking-[0.15em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <ShimmerButton
                href="/contact?material=pla-matte&quote=Particuliere%20aanvraag%20voor%20custom%20onderdeel"
                event={{ action: "cta_click", category: "segments_makers", label: "contact_prefill" }}
              >
                Start je aanvraag
              </ShimmerButton>
              <ShimmerButton
                href="/materials#material-suggestion-tool"
                className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
                event={{ action: "cta_click", category: "segments_makers", label: "material_tool" }}
              >
                Material Suggestion Tool
              </ShimmerButton>
              <Link
                href="/pricing"
                className="rounded-xl border border-slate-300/70 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm"
              >
                Bekijk prijzen
              </Link>
            </div>
          </header>
          <ContentTableOfContents title="Inhoud" items={tocItems} className="mx-auto mt-6 max-w-2xl" />
        </Reveal>
      </section>

      <section id="segment-fit" className="mx-auto mt-10 max-w-5xl scroll-mt-28">
        <Reveal>
          <GlassCard className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-slate-900">Voor welke particuliere projecten is deze route ideaal?</h2>
            <p className="mt-2 text-sm text-slate-600">
              Deze segmentpagina is gemaakt voor particulieren die snel een betrouwbare 3D printpartner zoeken voor hobby,
              herstel of personalisatie. Denk aan unieke onderdelen die je niet meer in de winkel vindt, kleine verbeteringen
              aan bestaande producten of creatieve projecten met een functionele toets.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                "Cosplay props, helmdelen en accessoires op maat",
                "Modelbouw onderdelen met scherpe details",
                "Repair parts en vervangstukken voor dagelijks gebruik",
                "Custom houders, clips en organizers voor thuis",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200/70 bg-white/85 p-4 text-sm text-slate-700">
                  {item}
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-slate-600">
              Werk je als maker met iteraties of prototypes voor een side-project? Dan combineren we snelheid met consistentie,
              zodat je meerdere versies kunt testen zonder tijdverlies.
            </p>
          </GlassCard>
        </Reveal>
      </section>

      <section id="segment-workflow" className="mx-auto mt-10 grid max-w-5xl gap-6 scroll-mt-28 lg:grid-cols-2">
        <Reveal>
          <GlassCard className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-slate-900">Hoe loopt je aanvraag van idee tot print?</h2>
            <p className="mt-2 text-sm text-slate-600">
              Met dit stappenplan weet je meteen wat we nodig hebben en wanneer je een voorstel mag verwachten.
            </p>
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
            <h2 className="text-xl font-semibold text-slate-900">Waarom particulieren en makers voor deze route kiezen</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {quickWins.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-slate-600">
              Resultaat: minder trial-and-error, snellere beslissingen en onderdelen die beter aansluiten op je echte gebruik.
            </p>
          </GlassCard>
        </Reveal>
      </section>

      <section id="segment-model-finder" className="mx-auto mt-10 max-w-5xl scroll-mt-28">
        <Reveal>
          <GlassCard className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-slate-900">Geen eigen 3D model? Zo vind je snel een goed startbestand</h2>
            <p className="mt-2 text-sm text-slate-600">
              Wil je wel een onderdeel laten printen, maar niet zelf modelleren? Dan start je best met bestaande modellen die
              we samen beoordelen op printbaarheid, schaal en gebruik.
            </p>
            <div className="mt-4 space-y-3 text-sm text-slate-700">
              <p>
                1. Gebruik onze pagina{" "}
                <Link href="/3d-modellen-vinden" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  3D modellen vinden
                </Link>{" "}
                voor betrouwbare bronnen en een snelle selectie.
              </p>
              <p>2. Stuur de model-link en gewenste afmetingen door, plus waar het onderdeel voor dient.</p>
              <p>3. Wij adviseren materiaal, orientatie en eventuele kleine tweaks voor een beter eindresultaat.</p>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/3d-modellen-vinden"
                className="rounded-xl border border-slate-300/70 bg-white/85 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm"
              >
                Bekijk modelbronnen
              </Link>
              <Link
                href="/contact?material=pla-matte&quote=Ik%20heb%20een%20model%20gevonden%20en%20wil%20printadvies"
                className="rounded-xl border border-slate-300/70 bg-white/85 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm"
              >
                Stuur model voor check
              </Link>
            </div>
            <p className="mt-4 text-sm text-slate-600">
              Vind je geen geschikt model of wil je iets volledig op maat? Dan schakelen we over naar{" "}
              <Link href="/3d-modelleren" className="font-semibold text-indigo-600 hover:text-indigo-500">
                3D modelleren
              </Link>{" "}
              als aparte stap.
            </p>
          </GlassCard>
        </Reveal>
      </section>

      <section id="segment-use-cases" className="mx-auto mt-10 max-w-5xl scroll-mt-28">
        <Reveal>
          <GlassCard className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-slate-900">Populaire projecttypes en materiaalkeuze voor particulieren</h2>
            <p className="mt-2 text-sm text-slate-600">
              Deze tabel helpt je snel starten. Daarna verfijnen we per onderdeel op detailniveau, sterkte en afwerking.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-[440px] text-left text-sm text-slate-700">
                <thead>
                  <tr className="border-b border-slate-200/70 text-slate-500">
                    <th className="py-2 pr-4 font-semibold">Projecttype</th>
                    <th className="py-2 pr-4 font-semibold">Startmateriaal</th>
                    <th className="py-2 pr-4 font-semibold">Waarom</th>
                  </tr>
                </thead>
                <tbody>
                  {useCaseRows.map((row) => (
                    <tr key={row.project} className="border-b border-slate-200/70 last:border-0">
                      <td className="py-2 pr-4 font-medium text-slate-900">{row.project}</td>
                      <td className="py-2 pr-4">{row.material}</td>
                      <td className="py-2 pr-4">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-slate-600">
              Twijfel je tussen meerdere filamenten? Gebruik de{" "}
              <Link href="/materials#material-suggestion-tool" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Material Suggestion Tool
              </Link>{" "}
              of bekijk ons{" "}
              <Link href="/materials" className="font-semibold text-indigo-600 hover:text-indigo-500">
                materialenoverzicht
              </Link>
              .
            </p>
          </GlassCard>
        </Reveal>
      </section>

      <section id="segment-pricing" className="mx-auto mt-10 max-w-5xl scroll-mt-28">
        <Reveal>
          <GlassCard className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-slate-900">Wat kost een particuliere 3D print?</h2>
            <p className="mt-2 text-sm text-slate-600">
              Onderstaande indicaties helpen je budgetteren. Exacte prijs en timing hangen af van volume, support, materiaal
              en eventuele nabewerking.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-[560px] text-left text-sm text-slate-700">
                <thead>
                  <tr className="border-b border-slate-200/70 text-slate-500">
                    <th className="py-2 pr-4 font-semibold">Project</th>
                    <th className="py-2 pr-4 font-semibold">Startmateriaal</th>
                    <th className="py-2 pr-4 font-semibold">Richtprijs</th>
                    <th className="py-2 pr-4 font-semibold">Timing</th>
                  </tr>
                </thead>
                <tbody>
                  {pricingRows.map((row) => (
                    <tr key={row.project} className="border-b border-slate-200/70 last:border-0">
                      <td className="py-2 pr-4 font-medium text-slate-900">{row.project}</td>
                      <td className="py-2 pr-4">{row.material}</td>
                      <td className="py-2 pr-4">{row.price}</td>
                      <td className="py-2 pr-4">{row.timing}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-slate-600">
              Voor een volledige uitsplitsing per volume en afwerking:{" "}
              <Link href="/pricing" className="font-semibold text-indigo-600 hover:text-indigo-500">
                bekijk de pricingpagina
              </Link>
              .
            </p>
          </GlassCard>
        </Reveal>
      </section>

      <section id="segment-links" className="mx-auto mt-10 max-w-5xl scroll-mt-28">
        <Reveal>
          <GlassCard className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-slate-900">Handige vervolgstappen voor je project</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              <li>
                <Link href="/3d-modellen-vinden" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  3D modellen vinden
                </Link>{" "}
                als je niet zelf wil modelleren en meteen met bestaande modellen wil starten.
              </li>
              <li>
                <Link href="/viewer" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  3D viewer
                </Link>{" "}
                om schaal en orientatie vooraf te checken.
              </li>
              <li>
                <Link href="/blog/ontwerp-3d-printbaar-model" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Ontwerpblog
                </Link>{" "}
                met praktische tips voor printbare modellen en minder printfouten.
              </li>
              <li>
                <Link href="/blog/3d-printen-voor-beginners" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Beginnersgids
                </Link>{" "}
                voor een snellere start als je voor het eerst laat printen.
              </li>
              <li>
                <Link href="/materials" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Materialenoverzicht
                </Link>{" "}
                om alternatieven naast PLA te vergelijken.
              </li>
              <li>
                <Link href="/services" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Dienstenpagina
                </Link>{" "}
                voor extra mogelijkheden zoals CAD-ondersteuning en afwerking.
              </li>
              <li>
                <Link href="/blog/hoeveel-kost-3d-printen" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Kostengids
                </Link>{" "}
                voor meer context rond prijsopbouw per projecttype.
              </li>
              <li>
                <Link href="/locaties" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Locaties
                </Link>{" "}
                voor afhaling en leveropties in de regio.
              </li>
            </ul>
          </GlassCard>
        </Reveal>
      </section>

      <section id="segment-faq" className="mx-auto mt-12 max-w-4xl scroll-mt-28">
        <Faq title="FAQ voor particulieren en makers" items={faqItems} />
      </section>

      <ReadMoreLinks pageType="segments" />

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
