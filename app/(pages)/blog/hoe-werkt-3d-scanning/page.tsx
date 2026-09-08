import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import BlogAuthorNote from "@/components/BlogAuthorNote"
import BlogFaq from "@/components/BlogFaq"
import ContentTableOfContents from "@/components/ContentTableOfContents"
import GlassCard from "@/components/GlassCard"
import ReadMoreLinks from "@/components/ReadMoreLinks"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import { buildArticleJsonLd, buildBreadcrumbSchema, buildHowToSchema } from "@/lib/seo"

const canonical = "https://www.x3dprints.be/blog/hoe-werkt-3d-scanning/"
const englishCanonical = "https://www.x3dprints.be/en/blog/hoe-werkt-3d-scanning/"
const publishedDate = "2026-09-08T14:00:00+02:00"
const dateModified = "2026-09-08"
const scannerImage = "/images/CR-Scan_Otter_3.webp"

export const metadata: Metadata = {
  title: "Hoe werkt 3D scanning? Complete gids | X3DPrints",
  description:
    "Hoe wordt een object een bruikbaar 3D-model? Complete gids over 3D scanning, scan-to-print, reverse engineering, STL, STEP, nauwkeurigheid en voorbereiding.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": canonical,
      "en-BE": englishCanonical,
      "x-default": canonical,
    },
  },
  openGraph: {
    title: "Hoe werkt 3D scanning? Van object naar 3D-model",
    description:
      "Praktische gids over 3D scans, meshbestanden, CAD-heropbouw, moeilijke oppervlakken, persoonsscans en scan-to-print.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    modifiedTime: publishedDate,
    authors: ["https://www.x3dprints.be/about/"],
    tags: [
      "3D scanning Belgie",
      "object 3D laten scannen",
      "scan naar STL",
      "scan naar STEP",
      "reverse engineering",
      "scan-to-print",
    ],
    images: [
      {
        url: scannerImage,
        width: 1600,
        height: 1600,
        alt: "CR-Scan Otter scanner voor 3D scanning en scan-to-print bij X3DPrints",
      },
    ],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hoe werkt 3D scanning? Complete gids",
    description: "Van fysiek object naar mesh, CAD-model of 3D print, met realistische mogelijkheden en beperkingen.",
    images: [scannerImage],
  },
}

const tocItems = [
  { id: "wat-is-3d-scanning", label: "Wat is 3D scanning?" },
  { id: "scanmethodes", label: "Scanmethodes en toepassingen" },
  { id: "workflow", label: "Van object naar 3D-bestand" },
  { id: "bestandsformaten", label: "STL, OBJ, PLY of STEP" },
  { id: "reverse-engineering", label: "Scanning versus reverse engineering" },
  { id: "scanbaarheid", label: "Wat is moeilijk te scannen?" },
  { id: "nauwkeurigheid", label: "Nauwkeurigheid en verwachtingen" },
  { id: "voorbereiding", label: "Je scan voorbereiden" },
  { id: "scan-to-print", label: "Van scan naar 3D print" },
  { id: "regio", label: "3D scanning in Belgie" },
  { id: "bronnen", label: "Bronnen" },
  { id: "faq", label: "Veelgestelde vragen" },
]

const scanRoutes = [
  {
    situation: "Organisch object, kunstwerk of beeld",
    method: "Oppervlaktescan in meerdere passes",
    output: "Opgeschoonde STL, OBJ of PLY mesh",
    note: "Sterk voor vorm en eventueel textuur; exacte symmetrie is niet altijd het doel.",
  },
  {
    situation: "Kapot of niet meer leverbaar onderdeel",
    method: "Scan + controlemetingen + CAD-heropbouw",
    output: "Nieuw STEP- en/of STL-bestand",
    note: "Passing, gaten en schroefdraad worden niet blind uit de scan overgenomen.",
  },
  {
    situation: "Behuizing, houder of montagehulp",
    method: "Scan als contourreferentie + nieuw ontwerp",
    output: "Printbaar CAD-model",
    note: "Onzichtbare binnenzijde en functionele details vragen aanvullende maten.",
  },
  {
    situation: "Persoon, buste of eventfiguur",
    method: "Snelle capture + visuele mesh-cleanup",
    output: "Mesh voor visualisatie of schaalprint",
    note: "Pose, beweging, haar, kleding en gewenste schaal bepalen het resultaat.",
  },
  {
    situation: "Archivering of digitale presentatie",
    method: "Geometrie- en eventueel kleurregistratie",
    output: "Mastermesh en lichtere gebruiksversie",
    note: "Bewaarcontext, metadata en gebruiksrechten horen bij het archiefplan.",
  },
]

const workflowSteps = [
  {
    name: "Haalbaarheid beoordelen met foto's",
    text: "Je stuurt overzichtsfoto's, afmetingen, materiaal en het gewenste einddoel. Foto's dienen alleen voor de voorcontrole; ze vervangen het fysieke object niet.",
  },
  {
    name: "Object fysiek aanleveren",
    text: "Voor de echte scan komt het object op afspraak naar Herzele. We controleren bereikbaarheid, stabiliteit, kwetsbaarheid en mogelijke oppervlaktevoorbereiding.",
  },
  {
    name: "Voorbereiden en kalibreren",
    text: "Het object wordt stabiel gepositioneerd. Indien nodig worden referentiemarkers of een omkeerbare matte voorbereiding besproken.",
  },
  {
    name: "Scannen in meerdere richtingen",
    text: "De zichtbare buitengeometrie wordt in overlappende passes geregistreerd. Onderkanten en diepe zones vragen vaak een afzonderlijke opstelling.",
  },
  {
    name: "Uitlijnen, samenvoegen en opschonen",
    text: "De passes worden geregistreerd, ruis wordt verwijderd en gaten worden alleen verantwoord hersteld. Daarna controleren we schaal en bruikbaarheid.",
  },
  {
    name: "Mesh, CAD of print opleveren",
    text: "Je krijgt het afgesproken scanbestand. Voor functionele onderdelen kan een afzonderlijke CAD-heropbouw en testprint volgen.",
  },
]

const fileRows = [
  {
    format: "STL",
    contains: "Driehoeksmesh zonder kleurtextuur",
    usefulFor: "3D printen, eenvoudige uitwisseling en geometrische referentie",
    caveat: "Geen parametrische CAD-features en eenheden zijn niet altijd ingebed.",
  },
  {
    format: "OBJ",
    contains: "Mesh met ondersteuning voor materiaal- en textuurkoppelingen",
    usefulFor: "Kunst, decor, visualisatie en persoonsscans",
    caveat: "Bestaat vaak uit meerdere gekoppelde bestanden; niet automatisch CAD-bewerkbaar.",
  },
  {
    format: "PLY",
    contains: "Punten of polygonen, eventueel met kleurinformatie",
    usefulFor: "Scanarchief, verwerking en technische referentie",
    caveat: "Ondersteuning verschilt per softwarepakket.",
  },
  {
    format: "STEP",
    contains: "CAD-oppervlakken en solids",
    usefulFor: "Maatvast herontwerp, productie, aanpassingen en engineering",
    caveat: "Komt meestal uit reverse engineering, niet rechtstreeks uit de scanner.",
  },
]

const difficultObjects = [
  {
    title: "Glanzend, spiegelend of transparant",
    body: "Het geprojecteerde licht wordt onvoorspelbaar gereflecteerd of gaat door het materiaal. Een matte voorbereiding kan helpen, maar wordt nooit zonder toestemming op een kwetsbaar object aangebracht.",
  },
  {
    title: "Zeer donker of zonder herkenbare details",
    body: "Donkere oppervlakken leveren minder bruikbare respons; grote egale vlakken geven de software weinig houvast. Belichting, markers of een andere opstelling kunnen nodig zijn.",
  },
  {
    title: "Flexibel, harig of bewegend",
    body: "Een scanner combineert opeenvolgende waarnemingen. Elke vormverandering veroorzaakt verschillen. Haar, zachte stof, planten en losse kabels vragen daarom realistische verwachtingen.",
  },
  {
    title: "Diepe holtes en verborgen binnenkanten",
    body: "Een oppervlaktescanner ziet alleen wat optisch bereikbaar is. Dichte kamers, diepe boringen en afgedekte zones moeten apart gemeten, ontworpen of met een andere techniek onderzocht worden.",
  },
]

const useCases = [
  "Een kap, knop, houder of clip reconstrueren wanneer het originele CAD-bestand ontbreekt.",
  "Een kunstwerk, mascotte of decorstuk digitaliseren voor reproductie, schaalvarianten of archivering.",
  "Een bestaande behuizing als contour gebruiken voor een nieuwe steun, mal of aansluiting.",
  "Een persoon vastleggen als basis voor een buste, miniatuur of eventtoepassing.",
  "Een prototype of handgemaakt sample sneller vergelijken met een nieuw CAD-ontwerp.",
  "Een productvorm registreren als basis voor retail displays, verpakkingsmallen of presentatiemodellen.",
]

const preparationItems = [
  "Maak foto's van alle zijden en voeg een liniaal of maat toe voor schaalcontext.",
  "Vermeld de grootste afmetingen, het materiaal en of het object breekbaar of waardevol is.",
  "Leg uit wat je nodig hebt: archiefmesh, visueel model, STEP, vervangstuk of afgewerkte print.",
  "Duid kritieke maten, passing, schroefpunten en contactvlakken expliciet aan.",
  "Verwijder losse delen alleen wanneer dat veilig kan en breng geen coating of markers aan zonder overleg.",
  "Plan dat het fysieke object op afspraak naar Herzele komt; foto's zijn uitsluitend voor haalbaarheid en offertevoorbereiding.",
]

const faqItems = [
  {
    q: "Kan elk object 3D gescand worden?",
    a: "Nee. Matte, stabiele objecten met zichtbare details zijn het eenvoudigst. Transparante, spiegelende, zeer donkere, zachte of bewegende objecten kunnen voorbereiding, een andere methode of een beperktere output vragen. Daarom start elk project met een haalbaarheidscheck.",
  },
  {
    q: "Kan X3DPrints een object scannen op basis van foto's?",
    a: "Foto's worden gebruikt om de haalbaarheid en aanpak vooraf te beoordelen. Voor de effectieve 3D scan moet het fysieke object op afspraak langskomen. Een afzonderlijk fotogrammetrietraject is een andere methode en wordt alleen voorgesteld wanneer dat technisch passend is.",
  },
  {
    q: "Krijg ik mijn 3D scanbestand mee?",
    a: "Ja. Je krijgt altijd het vooraf afgesproken digitale scanbestand, doorgaans als STL, OBJ of PLY. Zo kun je het archiveren, opnieuw laten printen of later verder laten verwerken. Een STEP-bestand vraagt meestal afzonderlijke CAD-heropbouw.",
  },
  {
    q: "Is een 3D scan hetzelfde als een STEP- of CAD-bestand?",
    a: "Nee. Een scanner registreert zichtbare oppervlakken als punten of polygonen. STEP beschrijft bewerkbare CAD-oppervlakken en solids. Voor functionele onderdelen wordt de scan daarom vaak als referentie gebruikt om een nieuw CAD-model met correcte gaten, vlakken en toleranties te bouwen.",
  },
  {
    q: "Hoe nauwkeurig is 3D scanning?",
    a: "Er bestaat geen eerlijk universeel cijfer. Resultaat en meetonzekerheid hangen af van scanner, kalibratie, objectgrootte, oppervlak, kijkhoek, omgeving en nabewerking. X3DPrints is een praktische scan-to-print partner en claimt geen gecertificeerde industriële metrologie.",
  },
  {
    q: "Kan een scan meteen 3D geprint worden?",
    a: "Bij organische vormen soms wel na mesh-cleanup. Een functioneel onderdeel vraagt vaak extra werk voor wanddikte, vlakke montagezones, passing, gaten en printbaarheid. Eerst wordt bepaald of meshherstel volstaat of CAD-heropbouw nodig is.",
  },
  {
    q: "Doet X3DPrints ook persoonsscans en bustes?",
    a: "Ja, voor bustes, figuren en eventtoepassingen. Stabiel blijven staan is belangrijk. Pose, haar, kleding, gewenste schaal, texture cleanup en privacy worden vooraf besproken.",
  },
  {
    q: "Wat kost een object 3D laten scannen?",
    a: "De prijs hangt af van objectgrootte, oppervlak, aantal opstellingen, gewenste cleanup en eindbestand. Op de 3D-scanningpagina staan transparante richtprijzen. CAD-heropbouw, modellering en 3D printen worden als afzonderlijke, eenmalige posten afgesproken wanneer ze nodig zijn.",
  },
]

const sources = [
  {
    label: "Smithsonian 3D Digitization Program",
    href: "https://3d.si.edu/about",
    text: "Niet-commerciële praktijkinformatie over 3D-digitalisering, collectiebeheer, onderzoek en hergebruik van digitale objecten.",
  },
  {
    label: "NIST: performance van 3D imaging systems",
    href: "https://www.nist.gov/publications/characterization-range-performance-3d-imaging-system-nist-tn-1695",
    text: "Onderzoek naar factoren zoals afstand, invalshoek, reflectiviteit en doelvorm die de meetfout van 3D-imaging beïnvloeden.",
  },
  {
    label: "Europeana: documentatie van 3D digital assets",
    href: "https://pro.europeana.eu/project/advanced-documentation-of-3d-digital-assets",
    text: "Europese richtlijnen rond vorm, uiterlijk, context en documentatie bij 3D-digitalisering van erfgoedobjecten.",
  },
  {
    label: "Library of Congress: Recommended Formats Statement",
    href: "https://www.loc.gov/preservation/resources/rfs/RFS%202025-2026.pdf",
    text: "Publieke referentie voor duurzame bestandsformaten, waaronder gescande 3D-objecten en CAD-data.",
  },
  {
    label: "Arteveldehogeschool: 3D-scannen met een handscanner",
    href: "https://www.arteveldehogeschool.be/nl/blog/de-kunst-van-het-3d-scannen-met-een-handscanner",
    text: "Lokale onderwijsbron uit Gent over overlappende scanbewegingen, nabewerking en moeilijke transparante oppervlakken.",
  },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "Hoe werkt 3D scanning? Complete gids van object naar 3D-model",
  description: metadata.description ?? "",
  datePublished: publishedDate,
  dateModified,
  image: `https://www.x3dprints.be${scannerImage}`,
  inLanguage: "nl-BE",
})

const howToJsonLd = buildHowToSchema({
  name: "Van fysiek object naar bruikbaar 3D-scanbestand",
  description:
    "De praktische scanworkflow van haalbaarheidscheck en fysieke capture tot mesh, CAD-heropbouw of 3D print.",
  inLanguage: "nl-BE",
  mainEntityOfPage: canonical,
  url: `${canonical}#workflow`,
  toolNames: ["3D scanner", "scanverwerkingssoftware", "meetgereedschap", "CAD-software"],
  supplyNames: ["fysiek referentieobject", "overzichtsfoto's", "kritieke afmetingen", "omschrijving van het einddoel"],
  steps: workflowSteps.map((step, index) => ({
    position: index + 1,
    name: step.name,
    text: step.text,
    url: `${canonical}#workflow-stap-${index + 1}`,
  })),
})

const breadcrumbJsonLd = buildBreadcrumbSchema({
  id: `${canonical}#breadcrumb`,
  inLanguage: "nl-BE",
  items: [
    { name: "Home", url: "https://www.x3dprints.be/" },
    { name: "Kennisbank", url: "https://www.x3dprints.be/blog/" },
    { name: "Hoe werkt 3D scanning?", url: canonical },
  ],
})

export default function HoeWerkt3dScanningPage() {
  return (
    <main className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(85%_45%_at_80%_2%,rgba(6,182,212,0.2),transparent_72%),radial-gradient(65%_38%_at_5%_30%,rgba(59,130,246,0.15),transparent_74%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.1]" />

      <section className="px-6 pb-14 pt-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.12fr_.88fr]">
          <Reveal>
            <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
              <Link href="/blog" className="font-semibold text-indigo-600 hover:text-indigo-500">Kennisbank</Link>{" "}
              <span aria-hidden>/</span> 3D scanning
            </nav>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.34em] text-cyan-700">How-to en scan-to-print</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Hoe werkt 3D scanning? Van fysiek object naar bruikbaar 3D-model
            </h1>
            <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-700">
              3D scanning legt de zichtbare vorm van een echt object digitaal vast. Het resultaat is meestal een puntenwolk of
              polygonale mesh, die daarna wordt opgeschoond, eventueel in CAD herbouwd en geschikt gemaakt voor archivering,
              visualisatie of 3D printen. Een scan is dus een sterke basis, maar niet automatisch een afgewerkt STEP-bestand.
            </p>
            <p className="mt-4 text-sm font-medium text-slate-500">
              Gepubliceerd en laatst bijgewerkt op 8 september 2026 door X3DPrints in Herzele.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ShimmerButton href="/contact?topic=3d-scanning">Vraag een gratis scan-intake</ShimmerButton>
              <Link
                href="/3d-scannen"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white/85 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
              >
                Bekijk de 3D scanservice
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-[2.25rem] border border-cyan-100 bg-slate-950 shadow-2xl">
              <Image
                src={scannerImage}
                alt="CR-Scan Otter 3D scanner gebruikt voor objectscans bij X3DPrints"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 420px"
                className="object-contain p-6"
              />
              <div aria-hidden className="absolute inset-0 bg-[linear-gradient(135deg,rgba(6,182,212,0.18),transparent_42%,rgba(59,130,246,0.18))]" />
              <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/15 bg-slate-950/75 p-4 text-white backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">Belangrijk</p>
                <p className="mt-2 text-sm leading-6 text-slate-200">
                  Foto&apos;s tonen of scanning kansrijk is. Voor de echte scan moet het fysieke object langskomen.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl gap-4 sm:grid-cols-3">
          {[
            ["Input", "Een fysiek object met gekende toepassing"],
            ["Basisoutput", "STL, OBJ of PLY mesh"],
            ["Vervolg", "CAD-heropbouw, testprint of archief"],
          ].map(([label, value]) => (
            <GlassCard key={label} className="border border-white/50 bg-white/85 p-5 shadow-lg backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">{label}</p>
              <p className="mt-2 text-lg font-bold text-slate-900">{value}</p>
            </GlassCard>
          ))}
        </div>

        <div className="mx-auto max-w-6xl">
          <ContentTableOfContents items={tocItems} title="In deze complete gids" className="mt-8" />
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.03fr_.97fr]">
          <Reveal>
            <GlassCard className="h-full border border-white/50 bg-white/88 p-6 shadow-lg backdrop-blur sm:p-8">
              <h2 id="wat-is-3d-scanning" className="scroll-mt-28 text-3xl font-bold text-slate-900">Wat meet een 3D scanner werkelijk?</h2>
              <p className="mt-4 leading-7 text-slate-700">
                Een oppervlaktescanner registreert waar zichtbare punten op een object zich in de ruimte bevinden. Software
                brengt opeenvolgende beelden of passes samen tot een puntenwolk en vervolgens een polygonale huid. Kleurcamera&apos;s
                kunnen daarnaast textuur vastleggen, maar geometrie en kleurkwaliteit zijn twee afzonderlijke kwaliteitsvragen.
              </p>
              <p className="mt-4 leading-7 text-slate-700">
                De scanner ziet alleen bereikbare oppervlakken. Materiaaldikte, interne kamers, verborgen clips en de bedoeling
                achter een ontwerp worden niet automatisch gekend. Dat is precies waarom controlemetingen en
                <Link href="/3d-modelleren" className="mx-1 font-semibold text-indigo-600 underline underline-offset-4">3D modelleren</Link>
                vaak deel uitmaken van een betrouwbaar reverse-engineeringtraject.
              </p>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.08}>
            <GlassCard className="h-full border border-cyan-200/70 bg-cyan-50/80 p-6 shadow-lg backdrop-blur sm:p-8">
              <h2 id="scanmethodes" className="scroll-mt-28 text-2xl font-bold text-slate-900">Scanner, fotogrammetrie of handmatig CAD?</h2>
              <dl className="mt-5 space-y-5 text-slate-700">
                <div><dt className="font-bold text-slate-900">Optische oppervlaktescan</dt><dd className="mt-1 leading-7">Snel en bruikbaar voor organische vormen, contouren en objecten met voldoende zichtbare details.</dd></div>
                <div><dt className="font-bold text-slate-900">Fotogrammetrie</dt><dd className="mt-1 leading-7">Reconstructie uit veel overlappende foto&apos;s. Interessant voor bepaalde grotere, gekleurde of moeilijk verplaatsbare onderwerpen, maar niet hetzelfde als enkele intakefoto&apos;s.</dd></div>
                <div><dt className="font-bold text-slate-900">Handmatig CAD</dt><dd className="mt-1 leading-7">Vaak sneller en zuiverder voor eenvoudige blokvormen, gatenpatronen, schroefdraad en onderdelen waarvan de design intent belangrijk is.</dd></div>
              </dl>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <GlassCard className="border border-white/50 bg-white/90 p-6 shadow-lg backdrop-blur sm:p-8">
              <h2 className="text-3xl font-bold text-slate-900">Welke scanroute past bij je doel?</h2>
              <p className="mt-3 max-w-4xl leading-7 text-slate-700">
                Het gevraagde eindbestand bepaalt de workflow. Wie alleen “een scan” vraagt, krijgt anders mogelijk een technisch
                correct bestand dat niet past bij wat er daarna mee moet gebeuren.
              </p>
              <div className="mt-6 overflow-x-auto">
                <table className="min-w-[920px] divide-y divide-slate-200 text-left text-sm">
                  <thead><tr className="text-slate-600"><th className="py-3 pr-5">Situatie</th><th className="py-3 pr-5">Route</th><th className="py-3 pr-5">Output</th><th className="py-3">Aandachtspunt</th></tr></thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {scanRoutes.map((row) => (
                      <tr key={row.situation}>
                        <th className="py-4 pr-5 font-bold text-slate-900">{row.situation}</th>
                        <td className="py-4 pr-5">{row.method}</td><td className="py-4 pr-5">{row.output}</td><td className="py-4">{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section id="workflow" className="scroll-mt-28 px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-700">De workflow</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">Van object naar bruikbaar 3D-bestand in zes stappen</h2>
          </Reveal>
          <ol className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {workflowSteps.map((step, index) => (
              <li key={step.name} id={`workflow-stap-${index + 1}`} className="scroll-mt-28">
                <Reveal delay={index * 0.04}>
                  <GlassCard className="h-full border border-white/50 bg-white/88 p-6 shadow-lg backdrop-blur">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-cyan-300">{index + 1}</span>
                    <h3 className="mt-4 text-lg font-bold text-slate-900">{step.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-700">{step.text}</p>
                  </GlassCard>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <GlassCard className="border border-white/50 bg-white/90 p-6 shadow-lg backdrop-blur sm:p-8">
              <h2 id="bestandsformaten" className="scroll-mt-28 text-3xl font-bold text-slate-900">STL, OBJ, PLY of STEP: welk bestand krijg je?</h2>
              <p className="mt-3 max-w-4xl leading-7 text-slate-700">
                Bij X3DPrints krijg je het afgesproken digitale scanbestand mee. Het juiste formaat volgt uit het doel; een groot
                bestand met veel polygonen is niet automatisch beter of nuttiger.
              </p>
              <div className="mt-6 overflow-x-auto">
                <table className="min-w-[900px] divide-y divide-slate-200 text-left text-sm">
                  <thead><tr className="text-slate-600"><th className="py-3 pr-5">Formaat</th><th className="py-3 pr-5">Bevat</th><th className="py-3 pr-5">Geschikt voor</th><th className="py-3">Belangrijke beperking</th></tr></thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {fileRows.map((row) => (
                      <tr key={row.format}>
                        <th className="py-4 pr-5 text-lg font-bold text-slate-900">.{row.format.toLowerCase()}</th>
                        <td className="py-4 pr-5">{row.contains}</td><td className="py-4 pr-5">{row.usefulFor}</td><td className="py-4">{row.caveat}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.05fr_.95fr]">
          <Reveal>
            <GlassCard className="h-full border border-white/50 bg-white/88 p-6 shadow-lg backdrop-blur sm:p-8">
              <h2 id="reverse-engineering" className="scroll-mt-28 text-3xl font-bold text-slate-900">Waarom een scan nog geen reverse engineering is</h2>
              <p className="mt-4 leading-7 text-slate-700">
                Een scan beschrijft het bestaande oppervlak, inclusief slijtage, vervorming en beschadiging. Reverse engineering
                probeert daaruit de bedoelde vorm opnieuw op te bouwen. Vlakken worden vlak gemaakt, cilinders krijgen een
                logische diameter en symmetrie, gaten en toleranties worden opnieuw bepaald.
              </p>
              <p className="mt-4 leading-7 text-slate-700">
                Voor een decoratieve replica kan mesh-cleanup volstaan. Voor een vervangstuk, klikpassing of behuizing is een
                nieuw CAD-model meestal robuuster. Lees ook hoe een
                <Link href="/blog/kapot-onderdeel-laten-printen" className="mx-1 font-semibold text-indigo-600 underline underline-offset-4">kapot onderdeel opnieuw gemaakt wordt</Link>
                en wanneer <Link href="/3d-modelleren" className="font-semibold text-indigo-600 underline underline-offset-4">3D modellering</Link> nodig is.
              </p>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.08}>
            <GlassCard className="h-full border border-blue-200/70 bg-blue-50/80 p-6 shadow-lg backdrop-blur sm:p-8">
              <h3 className="text-xl font-bold text-slate-900">Wanneer scannen tijd bespaart</h3>
              <ul className="mt-4 space-y-3 text-slate-700">
                {useCases.map((item) => <li key={item} className="flex gap-3"><span aria-hidden className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-500" /><span>{item}</span></li>)}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 id="scanbaarheid" className="scroll-mt-28 text-3xl font-bold text-slate-900">Welke objecten zijn moeilijk 3D te scannen?</h2>
            <p className="mt-3 max-w-4xl leading-7 text-slate-700">
              Scanbaarheid hangt niet alleen van formaat af. Oppervlak, beweging, zichtlijnen en herkenbare details bepalen of
              de scanner betrouwbare data kan registreren en uitlijnen.
            </p>
          </Reveal>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {difficultObjects.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <GlassCard className="h-full border border-white/50 bg-white/88 p-6 shadow-lg backdrop-blur">
                  <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-3 leading-7 text-slate-700">{item.body}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="h-full border border-amber-200/70 bg-amber-50/82 p-6 shadow-lg backdrop-blur sm:p-8">
              <h2 id="nauwkeurigheid" className="scroll-mt-28 text-2xl font-bold text-slate-900">Nauwkeurigheid zonder marketingcijfers</h2>
              <p className="mt-4 leading-7 text-slate-700">
                Nauwkeurigheid is geen los cijfer van de scannerdoos. Volgens NIST beïnvloeden onder meer afstand, invalshoek,
                reflectiviteit en doelvorm de meetfout. Ook kalibratie, objectbeweging, uitlijning en nabewerking tellen mee.
              </p>
              <p className="mt-4 leading-7 text-slate-700">
                X3DPrints positioneert zich daarom als praktische scan-to-print partner, niet als gecertificeerd metrologisch
                laboratorium. Voor kritieke passing controleren we relevante maten apart en valideren we waar mogelijk met een
                testprint.
              </p>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.08}>
            <GlassCard className="h-full border border-white/50 bg-white/88 p-6 shadow-lg backdrop-blur sm:p-8">
              <h2 id="voorbereiding" className="scroll-mt-28 text-2xl font-bold text-slate-900">Zo bereid je een scanvraag goed voor</h2>
              <ul className="mt-4 space-y-3 text-slate-700">
                {preparationItems.map((item) => <li key={item} className="flex gap-3"><span aria-hidden className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-500" /><span>{item}</span></li>)}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <GlassCard className="border border-slate-800 bg-slate-950 p-6 text-white shadow-2xl sm:p-8">
              <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">Scan-to-print</p>
                  <h2 id="scan-to-print" className="mt-3 scroll-mt-28 text-3xl font-bold">Wanneer kan een 3D scan geprint worden?</h2>
                  <p className="mt-4 leading-7 text-slate-300">
                    Een gesloten organische mesh kan vaak na controle en herstel geschaald en geprint worden. Functionele delen
                    vragen meestal extra CAD-werk voor wanddikte, vlakke montagezones, gaten, passing en productieorientatie.
                    Daarna volgt materiaalkeuze op basis van gebruik, niet op basis van de scanner.
                  </p>
                  <p className="mt-4 leading-7 text-slate-300">
                    Voor binnen kan PLA of PETG passen; voor langdurige UV- en weersbelasting kan
                    <Link href="/blog/asa-3d-printen" className="mx-1 font-semibold text-cyan-300 underline underline-offset-4">ASA 3D printen</Link>
                    interessanter zijn. Bekijk ook de <Link href="/materials" className="font-semibold text-cyan-300 underline underline-offset-4">materialenbibliotheek</Link>.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/5 p-5">
                  <p className="font-bold">Je traject kan uit vier afzonderlijke posten bestaan:</p>
                  <ol className="mt-4 space-y-3 text-sm text-slate-300">
                    <li>1. 3D scan en afgesproken digitaal scanbestand</li>
                    <li>2. Mesh-cleanup of CAD-heropbouw</li>
                    <li>3. Testprint en passingcontrole</li>
                    <li>4. Definitieve print of kleine reeks</li>
                  </ol>
                  <p className="mt-4 text-sm text-slate-400">Scannen en modelleren zijn eenmalige projectkosten binnen de offerte.</p>
                </div>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.05fr_.95fr]">
          <Reveal>
            <GlassCard className="h-full border border-white/50 bg-white/90 p-6 shadow-lg backdrop-blur sm:p-8">
              <h2 id="regio" className="scroll-mt-28 text-2xl font-bold text-slate-900">3D scanning in Belgie vanuit Herzele</h2>
              <p className="mt-4 leading-7 text-slate-700">
                De studio en scanner bevinden zich in Herzele. Foto&apos;s kunnen digitaal worden doorgestuurd voor de gratis
                haalbaarheidscheck, maar het fysieke object komt voor de effectieve scan naar Herzele. Na oplevering kan het
                object worden opgehaald en kunnen bestanden of prints digitaal of per pakket worden geleverd.
              </p>
              <p className="mt-4 leading-7 text-slate-700">
                Lees de regionale service-informatie voor <Link href="/3d-printen-in-herzele" className="font-semibold text-indigo-600 underline underline-offset-4">Herzele</Link>,
                <Link href="/3d-printen-in-gent" className="mx-1 font-semibold text-indigo-600 underline underline-offset-4">Gent</Link>,
                <Link href="/3d-printen-in-antwerpen" className="font-semibold text-indigo-600 underline underline-offset-4">Antwerpen</Link>,
                <Link href="/3d-printen-in-hasselt" className="mx-1 font-semibold text-indigo-600 underline underline-offset-4">Hasselt</Link> en
                <Link href="/3d-printen-in-genk" className="mx-1 font-semibold text-indigo-600 underline underline-offset-4">Genk</Link>, of bekijk alle
                <Link href="/locaties" className="ml-1 font-semibold text-indigo-600 underline underline-offset-4">leveringsregio&apos;s</Link>.
              </p>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.08}>
            <GlassCard className="h-full border border-cyan-200/70 bg-cyan-50/82 p-6 shadow-lg backdrop-blur sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Offerte en privacy</h2>
              <p className="mt-4 leading-7 text-slate-700">
                De <Link href="/3d-scannen" className="font-semibold text-indigo-600 underline underline-offset-4">3D-scanningpagina</Link> bevat
                actuele richtprijzen en legt uit wat inbegrepen is. Je behoudt het afgesproken scanbestand. Persoonsscans en
                beelden van herkenbare personen worden alleen voor het afgesproken project verwerkt en niet zonder toestemming
                als portfolio- of marketingmateriaal gebruikt.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <ShimmerButton href="/contact?topic=3d-scanning">Start met foto&apos;s en afmetingen</ShimmerButton>
                <Link href="/pricing" className="inline-flex items-center justify-center rounded-xl border border-cyan-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900">Bekijk prijzen</Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <GlassCard className="border border-white/50 bg-white/90 p-6 shadow-lg backdrop-blur sm:p-8">
              <h2 id="bronnen" className="scroll-mt-28 text-2xl font-bold text-slate-900">Bronnen en verdere verdieping</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Onderstaande externe bronnen zijn onderwijs-, erfgoed- en onderzoeksinstellingen. Ze verkopen geen concurrerende
                scanservice en bevatten geen commerciële prijslijsten.
              </p>
              <ul className="mt-5 grid gap-4 md:grid-cols-2">
                {sources.map((source) => (
                  <li key={source.href} className="rounded-2xl border border-slate-200 bg-white/70 p-4">
                    <cite className="not-italic">
                      <Link href={source.href} target="_blank" rel="noopener noreferrer" className="font-bold text-indigo-700 underline underline-offset-4">{source.label}</Link>
                    </cite>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{source.text}</p>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogFaq title="Veelgestelde vragen over 3D scanning" items={faqItems} inLanguage="nl-BE" sectionId="faq" mainEntityOfPage={canonical} />
      <BlogAuthorNote locale="nl" />
      <ReadMoreLinks
        pageType="blog"
        title="Ga van object naar een bruikbaar resultaat"
        intro="Bekijk de scanservice, vergelijk CAD-heropbouw met mesh-cleanup en start met een haalbaarheidscheck."
        primaryLinks={[
          { label: "3D scanning service en richtprijzen", href: "/3d-scannen" },
          { label: "3D modelleren en reverse engineering", href: "/3d-modelleren" },
          { label: "Vraag een gratis scan-intake", href: "/contact?topic=3d-scanning" },
        ]}
        secondaryLinks={[
          { label: "Kapot onderdeel laten reconstrueren", href: "/blog/kapot-onderdeel-laten-printen" },
          { label: "Van foto's naar een 3D-beeldje", href: "/blog/vliezelse-beer-3d-beeldjes-berenfeesten" },
          { label: "Bekijk scan-to-print voorbeelden", href: "/portfolio" },
        ]}
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </main>
  )
}
