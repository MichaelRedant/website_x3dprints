import type { Metadata } from "next"
import Link from "next/link"
import BlogAuthorNote from "@/components/BlogAuthorNote"
import BlogFaq from "@/components/BlogFaq"
import ContentTableOfContents from "@/components/ContentTableOfContents"
import GlassCard from "@/components/GlassCard"
import ReadMoreLinks from "@/components/ReadMoreLinks"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import { buildArticleJsonLd, buildBreadcrumbSchema } from "@/lib/seo"

const canonical = "https://www.x3dprints.be/blog/asa-3d-printen/"
const englishCanonical = "https://www.x3dprints.be/en/blog/asa-3d-printen/"
const publishedDate = "2026-09-08T09:00:00+02:00"
const dateModified = "2026-09-08"

export const metadata: Metadata = {
  title: "ASA 3D printen voor buitengebruik en UV | X3DPrints",
  description:
    "Alles over ASA 3D printen: UV- en weerbestendigheid, toepassingen, ontwerpregels, ventilatie en vergelijking met PETG, ABS en PC.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": canonical,
      "en-BE": englishCanonical,
      "x-default": canonical,
    },
  },
  openGraph: {
    title: "ASA 3D printen: sterk materiaal voor buitengebruik",
    description:
      "Praktische ASA-gids over UV, regen, warmte, warping, ventilatie en de keuze tegenover PETG, ABS en polycarbonaat.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    modifiedTime: publishedDate,
    authors: ["https://www.x3dprints.be/about/"],
    tags: ["ASA 3D printen", "ASA filament", "3D print buitengebruik", "UV-bestendig 3D printen"],
    images: [
      {
        url: "/images/og-blog-nl.svg",
        width: 1200,
        height: 630,
        alt: "ASA 3D printen voor buitengebruik bij X3DPrints",
      },
    ],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "ASA 3D printen voor buitengebruik",
    description: "Wanneer ASA beter past dan PETG, ABS of PC, inclusief ontwerp- en productievoorwaarden.",
    images: ["/images/og-blog-nl.svg"],
  },
}

const tocItems = [
  { id: "wat-is-asa", label: "Wat is ASA?" },
  { id: "eigenschappen", label: "Eigenschappen en grenzen" },
  { id: "toepassingen", label: "Geschikte toepassingen" },
  { id: "vergelijking", label: "ASA tegenover PETG, ABS en PC" },
  { id: "ontwerp-productie", label: "Ontwerp en productie" },
  { id: "veiligheid", label: "Ventilatie en veilig printen" },
  { id: "offerte", label: "Prijs en offerte aanvragen" },
  { id: "regio", label: "ASA laten printen in Belgie" },
  { id: "bronnen", label: "Primaire bronnen" },
  { id: "faq", label: "Veelgestelde vragen" },
]

const applications = [
  {
    title: "Buitenbehuizingen",
    text: "Beschermkappen voor sensoren, camera-accessoires, meetapparatuur en elektronica die zon en regen zien. Afdichting en IP-bescherming moeten wel in het ontwerp worden opgelost.",
  },
  {
    title: "Gevel, tuin en signalisatie",
    text: "Montageblokken, afstandhouders, naamborden, houders en decoratieve elementen waarbij langdurige kleur- en vormstabiliteit belangrijker is dan een lage instapprijs.",
  },
  {
    title: "Mobiliteit en machinebouw",
    text: "Niet-veiligheidskritische afdekkappen, kabelgeleiders, dashboardsupports en hulpstukken die warmte, UV of geregeld gebruik combineren.",
  },
  {
    title: "Prototypes en kleine reeksen",
    text: "Functionele validatiemodellen en eindonderdelen in beperkte aantallen, zonder meteen een matrijs of grote voorraad te financieren.",
  },
]

const comparisonRows = [
  {
    material: "ASA",
    outdoor: "Zeer sterk bij UV en weer",
    heat: "Hoger temperatuurbereik dan standaard PLA en doorgaans PETG",
    printability: "Veeleisend: enclosure, hechting en krimpcontrole",
    choose: "Langdurig buitengebruik en technische zichtdelen",
  },
  {
    material: "PETG",
    outdoor: "Goed voor veel buitenprojecten",
    heat: "Middelmatig tot goed, afhankelijk van de kwaliteit",
    printability: "Betrouwbaarder en economischer",
    choose: "Functionele onderdelen zonder extreme UV- of warmtevraag",
  },
  {
    material: "ABS",
    outdoor: "Minder UV-stabiel dan ASA",
    heat: "Goed",
    printability: "Vergelijkbare krimp- en enclosure-eisen",
    choose: "Technische binnentoepassingen of nabewerking met aceton",
  },
  {
    material: "PC",
    outdoor: "Afhankelijk van de specifieke blend",
    heat: "Vaak het sterkst bij hogere temperaturen",
    printability: "Zeer veeleisend en vochtgevoelig",
    choose: "Hoge hitte of mechanische eisen na technische controle",
  },
]

const intakeItems = [
  "STL, STEP of een duidelijke schets met alle kritieke maten",
  "de plaats van gebruik: binnen, buiten, voertuig, machine of gevel",
  "zonbelasting, verwachte temperatuur, vocht en contact met chemicalien",
  "belasting, bevestigingspunten, gewenste kleur en aantal stuks",
  "of maatnauwkeurigheid, uitstraling of maximale sterkte het belangrijkst is",
]

const faqItems = [
  {
    q: "Is ASA het beste filament voor buitengebruik?",
    a: "ASA is een sterke keuze bij langdurige UV- en weersbelasting, maar niet automatisch de beste of goedkoopste keuze. Voor veel houders en vervangstukken volstaat PETG. De geometrie, temperatuur, belasting en gewenste levensduur bepalen de materiaalkeuze.",
  },
  {
    q: "Wat is het verschil tussen ASA en ABS?",
    a: "ASA en ABS zitten in een vergelijkbare technische materiaalklasse. ASA behoudt doorgaans beter zijn kleur en eigenschappen onder UV en buitenweer. Beide materialen krimpen tijdens het printen en vragen een gecontroleerde, warme printomgeving.",
  },
  {
    q: "Is een ASA 3D print waterdicht?",
    a: "Het basismateriaal is weerbestendig, maar een FDM-print is niet vanzelf waterdicht. Wanddikte, laaghechting, naden, schroefgaten en afdichtingen bepalen of een behuizing werkelijk water tegenhoudt. Een IP-classificatie vereist afzonderlijke validatie.",
  },
  {
    q: "Kan ASA voor onderdelen in een auto worden gebruikt?",
    a: "Voor niet-veiligheidskritische covers, houders en interieur- of exterieurdetails kan ASA geschikt zijn. Onderdelen rond remmen, besturing, gordels, airbags of andere veiligheidsfuncties worden niet zonder engineering en testvalidatie geadviseerd.",
  },
  {
    q: "Print X3DPrints ASA standaard uit voorraad?",
    a: "ASA wordt op aanvraag aangeboden. Eerst worden toepassing, kleur, afmetingen, aantallen en productierisico beoordeeld. Zo betaal je niet voor een technisch materiaal wanneer PETG of een andere oplossing voldoende is.",
  },
  {
    q: "Kan ik ASA laten printen en laten leveren in Belgie?",
    a: "Ja. X3DPrints produceert vanuit Herzele en levert in heel Belgie. Afhalen is gratis, 24 op 7, in de afhaalbox in Herzele. Aanvragen uit Gent, Antwerpen, Hasselt, Genk en andere regio's worden op dezelfde manier technisch beoordeeld.",
  },
]

const sources = [
  {
    label: "Prusa Knowledge Base: ASA",
    href: "https://help.prusa3d.com/article/asa_1809",
    text: "Officiele materiaalrichtlijnen over UV- en temperatuurbestendigheid, warping, enclosure en ventilatie.",
  },
  {
    label: "Bambu Lab: ASA filament",
    href: "https://au.store.bambulab.com/products/asa-filament",
    text: "Productspecificaties en productievoorwaarden voor Bambu ASA, inclusief outdoor gebruik en enclosure-advies.",
  },
  {
    label: "UltiMaker / MakerBot Precision ASA data sheet",
    href: "https://ultimaker.com/wp-content/uploads/2023/12/MakerBot-Precision-ASA-3-092020.pdf",
    text: "Technische fiche die ASA positioneert als weerbestendig alternatief voor ABS met betere UV-stabiliteit.",
  },
  {
    label: "NIOSH: veilig werken met 3D-printers",
    href: "https://www.cdc.gov/niosh/docs/2024-103/pdfs/2024-103.pdf",
    text: "Praktische bron over emissies, ventilatie en beheersmaatregelen bij additive manufacturing.",
  },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "ASA 3D printen: complete gids voor buitengebruik, UV en warmte",
  description: metadata.description ?? "",
  datePublished: publishedDate,
  dateModified,
  image: "https://www.x3dprints.be/images/og-blog-nl.svg",
  inLanguage: "nl-BE",
})

const breadcrumbJsonLd = buildBreadcrumbSchema({
  id: `${canonical}#breadcrumb`,
  inLanguage: "nl-BE",
  items: [
    { name: "Home", url: "https://www.x3dprints.be/" },
    { name: "Kennisbank", url: "https://www.x3dprints.be/blog/" },
    { name: "ASA 3D printen", url: canonical },
  ],
})

export default function Asa3dPrintenPage() {
  return (
    <main className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(90%_42%_at_75%_0%,rgba(245,158,11,0.18),transparent_72%),radial-gradient(70%_35%_at_10%_22%,rgba(14,165,233,0.13),transparent_75%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.08]" />

      <section className="px-6 pb-12 pt-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
              <Link href="/blog" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Kennisbank
              </Link>{" "}
              <span aria-hidden>/</span> ASA 3D printen
            </nav>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.34em] text-amber-700">Materiaalgids</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              ASA 3D printen: voor buiten, UV en veeleisende toepassingen
            </h1>
            <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-700">
              ASA is een technisch filament voor onderdelen die langdurig zon, regen en temperatuurschommelingen zien. Het is
              vooral interessant voor buitenbehuizingen, montageonderdelen en kleine reeksen, maar vraagt een gecontroleerde
              printomgeving, goede ventilatie en een ontwerp dat rekening houdt met krimp.
            </p>
            <p className="mt-4 text-sm font-medium text-slate-500">
              Gepubliceerd en laatst bijgewerkt op 8 september 2026 door X3DPrints in Herzele.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ShimmerButton href="/contact?material=ABS%2FASA">Vraag een ASA-offerte</ShimmerButton>
              <Link
                href="/materials#material-suggestion-tool"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
              >
                Vergelijk materialen
              </Link>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              ["Sterk punt", "UV- en weerbestendigheid"],
              ["Productie", "Op aanvraag en na toepassingscheck"],
              ["Service", "Afhalen Herzele of levering in Belgie"],
            ].map(([label, value]) => (
              <GlassCard key={label} className="border border-white/50 bg-white/80 p-5 shadow-lg backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">{label}</p>
                <p className="mt-2 text-lg font-bold text-slate-900">{value}</p>
              </GlassCard>
            ))}
          </div>

          <ContentTableOfContents items={tocItems} title="In dit artikel" className="mt-8" />
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.05fr_.95fr]">
          <Reveal>
            <GlassCard className="h-full border border-white/50 bg-white/85 p-6 shadow-lg backdrop-blur sm:p-8">
              <h2 id="wat-is-asa" className="scroll-mt-28 text-2xl font-bold text-slate-900">
                Wat is ASA filament?
              </h2>
              <p className="mt-4 leading-7 text-slate-700">
                ASA staat voor acrylonitrile styrene acrylate. Het materiaal lijkt qua verwerking en technische eigenschappen
                op ABS, maar is ontwikkeld om beter om te gaan met UV-licht en buitenweer. Daardoor blijft het doorgaans langer
                bruikbaar en visueel stabiel bij langdurige blootstelling aan zon.
              </p>
              <p className="mt-4 leading-7 text-slate-700">
                Dat maakt ASA geen automatische vervanger voor elk ander filament. Een eenvoudig onderdeel onder een afdak kan
                economischer in <Link href="/blog/filament-vrijdag-petg" className="font-semibold text-indigo-600 underline underline-offset-4">PETG</Link>.
                Bij hogere hitte of uitzonderlijke mechanische eisen kan <Link href="/blog/filament-vrijdag-pc" className="font-semibold text-indigo-600 underline underline-offset-4">polycarbonaat</Link> passender zijn.
              </p>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.08}>
            <GlassCard className="h-full border border-amber-200/70 bg-amber-50/85 p-6 shadow-lg backdrop-blur sm:p-8">
              <h2 id="eigenschappen" className="scroll-mt-28 text-2xl font-bold text-slate-900">
                Eigenschappen en grenzen
              </h2>
              <ul className="mt-4 space-y-3 text-slate-700">
                <li><strong>Wel:</strong> UV-stabiel, weerbestendig, taai en geschikt voor veel technische zichtdelen.</li>
                <li><strong>Niet vanzelf:</strong> waterdicht, voedselveilig, vlamvertragend of gecertificeerd voor een gereguleerde toepassing.</li>
                <li><strong>Afhankelijk van de grade:</strong> warmte-, slag- en chemische bestendigheid verschillen per fabrikant en kleur.</li>
                <li><strong>Belangrijk:</strong> printorientatie en laaghechting blijven bepalend voor de sterkte van het eindonderdeel.</li>
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <h2 id="toepassingen" className="scroll-mt-28 text-3xl font-bold text-slate-900">
              Wat kun je commercieel interessant in ASA laten printen?
            </h2>
            <p className="mt-3 max-w-3xl leading-7 text-slate-700">
              ASA verdient zijn meerprijs vooral wanneer het onderdeel effectief buiten blijft of UV en warmte combineert. Dit
              zijn realistische toepassingen, geen garantie zonder controle van belasting en geometrie.
            </p>
          </Reveal>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {applications.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <GlassCard className="h-full border border-white/50 bg-white/85 p-6 shadow-lg backdrop-blur">
                  <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-3 leading-7 text-slate-700">{item.text}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/50 bg-white/90 p-6 shadow-lg backdrop-blur sm:p-8">
              <h2 id="vergelijking" className="scroll-mt-28 text-3xl font-bold text-slate-900">
                ASA versus PETG, ABS en PC
              </h2>
              <p className="mt-3 leading-7 text-slate-700">
                De juiste keuze volgt uit de gebruiksomgeving, niet uit een ranglijst van filamenten. De waarden hieronder zijn
                kwalitatief: een technische datasheet van de gekozen filamentgrade blijft leidend.
              </p>
              <div className="mt-6 overflow-x-auto">
                <table className="min-w-[860px] divide-y divide-slate-200 text-left text-sm">
                  <thead>
                    <tr className="text-slate-600">
                      <th className="py-3 pr-5">Materiaal</th>
                      <th className="py-3 pr-5">Buiten en UV</th>
                      <th className="py-3 pr-5">Warmte</th>
                      <th className="py-3 pr-5">Printbaarheid</th>
                      <th className="py-3">Kies het voor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {comparisonRows.map((row) => (
                      <tr key={row.material}>
                        <th className="py-4 pr-5 font-bold text-slate-900">{row.material}</th>
                        <td className="py-4 pr-5">{row.outdoor}</td>
                        <td className="py-4 pr-5">{row.heat}</td>
                        <td className="py-4 pr-5">{row.printability}</td>
                        <td className="py-4">{row.choose}</td>
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
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="h-full border border-white/50 bg-white/85 p-6 shadow-lg backdrop-blur sm:p-8">
              <h2 id="ontwerp-productie" className="scroll-mt-28 text-2xl font-bold text-slate-900">
                Ontwerp- en productievoorwaarden
              </h2>
              <p className="mt-4 leading-7 text-slate-700">
                ASA krimpt merkbaar tijdens afkoelen. Een gesloten printer houdt de omgeving warmer en beperkt warping en
                laagscheuren. Brede, vlakke delen, scherpe binnenhoeken en ongelijkmatige wanddiktes verhogen het risico.
              </p>
              <ul className="mt-4 space-y-3 text-slate-700">
                <li>Gebruik afgeronde hoeken, consistente wanddiktes en voldoende ribben.</li>
                <li>Plan speling voor passing en thermische uitzetting.</li>
                <li>Voorzie drainage, afdichtingen en inserts waar de toepassing dat vraagt.</li>
                <li>Laat fabrikantprofielen leidend zijn; typische ASA-profielen werken rond 250-270 deg C nozzle en 90-110 deg C bed.</li>
                <li>Test eerst een kritisch segment bij grote of maatgevoelige onderdelen.</li>
              </ul>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.08}>
            <GlassCard className="h-full border border-rose-200/70 bg-rose-50/80 p-6 shadow-lg backdrop-blur sm:p-8">
              <h2 id="veiligheid" className="scroll-mt-28 text-2xl font-bold text-slate-900">
                Ventilatie is geen detail
              </h2>
              <p className="mt-4 leading-7 text-slate-700">
                Bij FDM-printen kunnen ultrafijne deeltjes en vluchtige stoffen vrijkomen. Een gewone enclosure helpt tegen
                temperatuurschommelingen, maar is niet automatisch een emissiebeheersing. NIOSH adviseert bronafzuiging,
                geschikte filtratie en voldoende ventilatie als technische maatregelen.
              </p>
              <p className="mt-4 leading-7 text-slate-700">
                Daarom hoort ASA niet onbeheerd in een leef-, slaap- of kantoorruimte te draaien. Volg altijd de veiligheidsfiche
                van het specifieke filament en de voorschriften van de printerfabrikant.
              </p>
              <Link
                href="https://www.cdc.gov/niosh/docs/2024-103/pdfs/2024-103.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex font-semibold text-indigo-700 underline underline-offset-4"
              >
                Lees de NIOSH-richtlijn voor veilig 3D printen
              </Link>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <Reveal>
            <GlassCard className="h-full border border-white/50 bg-white/85 p-6 shadow-lg backdrop-blur sm:p-8">
              <h2 id="offerte" className="scroll-mt-28 text-2xl font-bold text-slate-900">
                Wat kost ASA 3D printen?
              </h2>
              <p className="mt-4 leading-7 text-slate-700">
                De prijs hangt af van materiaalvolume, printtijd, formaat, supports, nabewerking, foutmarge en aantal. ASA kan
                duurder uitvallen dan PETG door langere voorbereiding en het hogere risico bij grote geometrieen. Gebruik de
                <Link href="/pricing" className="mx-1 font-semibold text-indigo-600 underline underline-offset-4">prijspagina</Link>
                als vertrekpunt; de definitieve prijs volgt pas na file check en slicing.
              </p>
              <div className="mt-6">
                <ShimmerButton href="/contact?material=ABS%2FASA">Laat je ASA-project beoordelen</ShimmerButton>
              </div>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.08}>
            <GlassCard className="h-full border border-sky-200/70 bg-sky-50/80 p-6 shadow-lg backdrop-blur sm:p-8">
              <h3 className="text-xl font-bold text-slate-900">Stuur dit mee voor een bruikbare offerte</h3>
              <ul className="mt-4 space-y-3 text-slate-700">
                {intakeItems.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden className="mt-2 h-2 w-2 shrink-0 rounded-full bg-sky-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-6 text-slate-600">
                Nog geen 3D-model? Bekijk de mogelijkheden voor <Link href="/3d-modelleren" className="font-semibold text-indigo-600 underline underline-offset-4">3D modelleren</Link> of
                laat een bestaand object eerst beoordelen voor <Link href="/3d-scannen" className="font-semibold text-indigo-600 underline underline-offset-4">3D scanning</Link>.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/50 bg-white/90 p-6 shadow-lg backdrop-blur sm:p-8">
              <h2 id="regio" className="scroll-mt-28 text-2xl font-bold text-slate-900">
                ASA laten 3D printen vanuit Herzele, met levering in Belgie
              </h2>
              <p className="mt-4 leading-7 text-slate-700">
                X3DPrints is een 1-persoonsstudio in Herzele. Productie gebeurt dus niet in elke vermelde stad: projecten worden
                in Herzele voorbereid en daarna verzonden of gratis afgehaald in de afhaalbox in Herzele. Bekijk de service-informatie voor
                <Link href="/3d-printen-in-herzele" className="mx-1 font-semibold text-indigo-600 underline underline-offset-4">Herzele</Link>,
                <Link href="/3d-printen-in-gent" className="mx-1 font-semibold text-indigo-600 underline underline-offset-4">Gent</Link>,
                <Link href="/3d-printen-in-antwerpen" className="mx-1 font-semibold text-indigo-600 underline underline-offset-4">Antwerpen</Link>,
                <Link href="/3d-printen-in-hasselt" className="mx-1 font-semibold text-indigo-600 underline underline-offset-4">Hasselt</Link> en
                <Link href="/3d-printen-in-genk" className="mx-1 font-semibold text-indigo-600 underline underline-offset-4">Genk</Link>, of raadpleeg het volledige
                <Link href="/locaties" className="ml-1 font-semibold text-indigo-600 underline underline-offset-4">leveringsgebied</Link>.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/50 bg-white/90 p-6 shadow-lg backdrop-blur sm:p-8">
              <h2 id="bronnen" className="scroll-mt-28 text-2xl font-bold text-slate-900">
                Primaire bronnen en technische fiches
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Materiaaleigenschappen verschillen per merk en grade. Controleer daarom naast deze gids steeds de datasheet en
                veiligheidsinformatie van het filament dat werkelijk wordt gebruikt.
              </p>
              <ul className="mt-5 grid gap-4 md:grid-cols-2">
                {sources.map((source) => (
                  <li key={source.href} className="rounded-2xl border border-slate-200 bg-white/70 p-4">
                    <cite className="not-italic">
                      <Link
                        href={source.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-indigo-700 underline underline-offset-4"
                      >
                        {source.label}
                      </Link>
                    </cite>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{source.text}</p>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogFaq
        title="Veelgestelde vragen over ASA 3D printen"
        items={faqItems}
        inLanguage="nl-BE"
        sectionId="faq"
        mainEntityOfPage={canonical}
      />

      <BlogAuthorNote locale="nl" />
      <ReadMoreLinks
        pageType="blog"
        title="Van materiaalkeuze naar een betrouwbaar onderdeel"
        intro="Vergelijk alternatieven, bekijk realistische projecten en laat je bestand controleren voor productie."
        primaryLinks={[
          { label: "3D print service", href: "/services" },
          { label: "PETG als praktisch alternatief", href: "/blog/filament-vrijdag-petg" },
          { label: "Vraag een ASA-offerte", href: "/contact?material=ABS%2FASA" },
        ]}
        secondaryLinks={[
          { label: "Hoe werkt 3D scanning?", href: "/blog/hoe-werkt-3d-scanning" },
          { label: "Onderdelen voor buitengebruik", href: "/blog/hoe-3d-print-je-onderdelen-voor-buitengebruik" },
          { label: "Sterke 3D-printmaterialen vergelijken", href: "/blog/sterke-3d-print-materialen" },
          { label: "Portfolio", href: "/portfolio" },
        ]}
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </main>
  )
}
