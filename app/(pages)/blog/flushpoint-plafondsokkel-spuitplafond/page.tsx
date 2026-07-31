import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import BlogAuthorNote from "@/components/BlogAuthorNote"
import BlogReadMore from "@/components/BlogReadMore"
import ContentTableOfContents from "@/components/ContentTableOfContents"
import Faq from "@/components/Faq"
import GlassCard from "@/components/GlassCard"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import {
  buildArticleJsonLd,
  buildBreadcrumbSchema,
  buildFaqPageSchema,
  buildHowToSchema,
} from "@/lib/seo"

const slug = "flushpoint-plafondsokkel-spuitplafond"
const canonical = "https://www.x3dprints.be/blog/" + slug + "/"
const publishedDate = "2026-07-31"
const dateModified = "2026-07-31"
const heroImage = "/images/blog/flushpoint/01-akoestisch-spuitplafond-hanglamp-lichtpunt.webp"
const ogImage = "/images/blog/flushpoint/flushpoint-og.webp"
const contactHref =
  "/contact?material=petg&quote=FlushPoint%20-%20modulaire%20plafondsokkel%20voor%20een%20spuitplafond"

export const metadata: Metadata = {
  title: "Plafondsokkel voor akoestisch spuitplafond | FlushPoint",
  description:
    "Bekijk hoe FlushPoint 60 modulaire plafondsokkels voor hanglampen en inbouwspots oploste vóór een akoestisch spuitplafond werd aangebracht. Lees de case.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": canonical,
      "en-BE": "https://www.x3dprints.be/en/blog/flushpoint-plafondsokkel-spuitplafond/",
      "x-default": canonical,
    },
  },
  openGraph: {
    type: "article",
    title: "FlushPoint: plafondsokkels voor een spuitplafond",
    description:
      "Van SketchUp-concept tot 60 modulaire PETG-sokkels voor hanglampen, inbouwspots en reservepunten in een akoestisch spuitplafond.",
    url: canonical,
    publishedTime: publishedDate,
    modifiedTime: dateModified,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "FlushPoint hanglamp gemonteerd in een akoestisch spuitplafond",
      },
    ],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "FlushPoint: plafondsokkel voor een spuitplafond",
    description:
      "Een praktijkcase over 60 modulaire plafondsokkels voor verlichting in een akoestisch spuitplafond.",
    images: [ogImage],
  },
}

const tocItems = [
  { id: "probleem", label: "Waarom vraagt een spuitplafond om voorbereiding?" },
  { id: "concept", label: "Hoe werkt het modulaire FlushPoint-concept?" },
  { id: "iteratie", label: "Waarom werd het ontwerp halfweg aangepast?" },
  { id: "halve-draai", label: "Hoe werkt de verbinding met een halve draai?" },
  { id: "klemprobleem", label: "Hoe werd het klemprobleem van de spot opgelost?" },
  { id: "materiaal", label: "Waarom werd PETG gekozen?" },
  { id: "productie", label: "Hoe verliepen serieproductie en werffasering?" },
  { id: "resultaat", label: "Wat is het resultaat?" },
  { id: "toepassingen", label: "Wanneer is deze aanpak ook interessant?" },
  { id: "faq", label: "Veelgestelde vragen over FlushPoint" },
  { id: "bronnen", label: "Bronnen en projectreferenties" },
] as const

const systemRows = [
  {
    moment: "Tijdens het spuiten",
    module: "Tijdelijke beschermkap",
    function: "Houdt de opening en schroefdraad vrij van spuitpleister.",
  },
  {
    moment: "Na afwerking: hanglamp",
    module: "Hoge cilinder met trekontlasting",
    function: "Werkt het lichtpunt af en voorkomt dat het gewicht aan de koperdraadjes hangt.",
  },
  {
    moment: "Na afwerking: inbouwspot",
    module: "Spot rechtstreeks in de verlengde sokkel",
    function: "Laat de veerklemmen grijpen zonder de vervangbaarheid van de spot te verliezen.",
  },
  {
    moment: "Nog niet ingevuld lichtpunt",
    module: "Laag reservedeksel",
    function: "Sluit het punt af en houdt een latere keuze mogelijk zonder opnieuw te boren.",
  },
]

const processSteps = [
  {
    title: "1. Lichtpunten en randvoorwaarden vastleggen",
    body: "Voor de plafondafwerking werden plaats, boorgat, laagdikte, armatuurtype en montageruimte per lichtpunt bepaald.",
  },
  {
    title: "2. Eén basis met verwisselbare modules ontwerpen",
    body: "Het SketchUp-concept werd vertaald naar een printbaar systeem met een vaste flens, een meergangige draad en verschillende opzetstukken.",
  },
  {
    title: "3. Testen met de echte armaturen",
    body: "Testprints maakten duidelijk welke binnendiameter, tolerantie en sokkelhoogte nodig waren voor montage én later onderhoud.",
  },
  {
    title: "4. Eerst de werfkritieke delen produceren",
    body: "De zestig sokkels en beschermkappen kregen voorrang, zodat de spuiter volgens planning kon starten.",
  },
  {
    title: "5. Finale opzetstukken na de plafondafwerking leveren",
    body: "Hanglampmodules en reservedeksels volgden pas toen de definitieve verdeling van de armaturen bekend was.",
  },
]

const faqItems = [
  {
    q: "Wat is FlushPoint by X3DPrints?",
    a: "FlushPoint is de projectnaam voor een modulair, 3D geprint plafondsokkelsysteem dat vóór een akoestisch spuitplafond werd gemonteerd. Na de afwerking kan hetzelfde lichtpunt als hanglamp, inbouwspot of reservepunt worden gebruikt.",
  },
  {
    q: "Waarom moeten lichtpunten vóór een akoestisch spuitplafond worden voorbereid?",
    a: "Omdat boren, zagen of herstellen na de naadloze afwerking zichtbare schade kan veroorzaken. In dit project werden positie, opening en bescherming daarom vóór de spuitfase vastgelegd.",
  },
  {
    q: "Waarom werd PETG gebruikt voor de plafondsokkels?",
    a: "De echte spot bleef in de praktijktest koud en de onderdelen moesten vooral taai, maatvast en duurzaam zijn. PETG bood voor deze projectvoorwaarden een betere functionele marge dan PLA. De keuze moet bij elk armatuur opnieuw worden gevalideerd.",
  },
  {
    q: "Kan FlushPoint voor elk plafond of armatuur worden gebruikt?",
    a: "Niet zonder aanpassing. Diameter, laagdikte, temperatuur, klemgeometrie, draagfunctie en elektrische randvoorwaarden verschillen per project. De modulaire aanpak is herbruikbaar, maar de maatvoering vraagt altijd een projectcheck.",
  },
  {
    q: "Kan een spot of hanglamp later nog worden vervangen?",
    a: "Dat was een kernvoorwaarde van dit ontwerp. De halve-draaiverbinding maakt opzetstukken wisselbaar en de verlengde spotvariant voorkomt dat de veerklemmen onbereikbaar achter de flens blokkeren.",
  },
]

const references = [
  {
    label: "SketchUp Help — nauwkeurig modelleren met afmetingen",
    href: "https://help.sketchup.com/en/sketchup/measuring-angles-and-distances-model-precisely",
    note: "Primaire productdocumentatie bij de maatvaste concepttekening van de klant.",
  },
  {
    label: "Prusa Knowledge Base — PETG",
    href: "https://help.prusa3d.com/article/petg_2059",
    note: "Technische materiaalreferentie voor taaiheid, laaghechting en temperatuurgedrag van PETG.",
  },
  {
    label: "Acomo — Acoustic Spray System productsheet",
    href: "https://acomo-acoustics.com/wp-content/uploads/2025/09/Acomo_Acoustic-Spray-System-Productsheet.pdf",
    note: "Algemene primaire referentie over cellulosegebaseerd akoestisch spuitwerk; niet de productspecificatie van deze werf.",
  },
  {
    label: "FOD Economie — Algemeen Reglement op de Elektrische Installaties",
    href: "https://economie.fgov.be/nl/publicaties/algemeen-reglement-op-de",
    note: "Officiële Belgische bron voor de veiligheidsvereisten van elektrische installaties.",
  },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "FlushPoint by X3DPrints: modulaire plafondsokkels voor een akoestisch spuitplafond",
  description:
    "Projectcase over 60 modulaire PETG-plafondsokkels voor hanglampen, inbouwspots en reservepunten in een akoestisch spuitplafond.",
  datePublished: publishedDate,
  dateModified,
  image: heroImage,
  inLanguage: "nl-BE",
})

const faqJsonLd = buildFaqPageSchema({
  inLanguage: "nl-BE",
  mainEntityOfPage: canonical,
  items: faqItems,
})

const howToJsonLd = buildHowToSchema({
  name: "Modulaire plafondsokkels voor een spuitplafond ontwikkelen",
  description:
    "Van lichtplan en SketchUp-concept naar geteste, gefaseerd geproduceerde plafondsokkels voor een naadloos akoestisch spuitplafond.",
  inLanguage: "nl-BE",
  mainEntityOfPage: canonical,
  steps: processSteps.map((step, index) => ({
    name: step.title.replace(/^\d+\.\s*/, ""),
    text: step.body,
    url: canonical + "#" + (index < 3 ? "concept" : "productie"),
  })),
  toolNames: ["SketchUp", "FDM 3D printer", "Testarmatuur"],
  supplyNames: ["PETG filament", "Montageschroeven", "Tijdelijke beschermkappen"],
})

const breadcrumbJsonLd = buildBreadcrumbSchema({
  id: canonical + "#breadcrumb",
  inLanguage: "nl-BE",
  items: [
    { name: "X3DPrints", url: "https://www.x3dprints.be/" },
    { name: "Kennisbank", url: "https://www.x3dprints.be/blog/" },
    { name: "FlushPoint plafondsokkel", url: canonical },
  ],
})

type ProjectImageProps = {
  src: string
  alt: string
  caption: string
  width: number
  height: number
  sizes?: string
  priority?: boolean
  className?: string
}

function ProjectImage({
  src,
  alt,
  caption,
  width,
  height,
  sizes = "(min-width: 1024px) 896px, calc(100vw - 48px)",
  priority = false,
  className = "",
}: ProjectImageProps) {
  return (
    <figure className={"overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 shadow-sm dark:border-slate-700/70 dark:bg-slate-950/75 " + className}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        className="h-auto w-full"
      />
      <figcaption className="border-t border-slate-200/70 px-5 py-3 text-sm leading-relaxed text-slate-600 dark:border-slate-700/70 dark:text-slate-300">
        {caption}
      </figcaption>
    </figure>
  )
}

export default function FlushPointArticlePage() {
  return (
    <>
      <main className="relative overflow-hidden px-6 pb-20 pt-16 sm:px-8 lg:px-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(130%_60%_at_50%_0%,rgba(14,165,233,.16),transparent_72%)]"
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.08]" />

        <article className="mx-auto max-w-5xl">
          <header className="space-y-6">
            <nav aria-label="Breadcrumb" className="text-sm text-slate-600 dark:text-slate-300">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-300">
                    Home
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link href="/blog" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-300">
                    Kennisbank
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li aria-current="page" className="font-medium text-slate-700 dark:text-slate-200">
                  FlushPoint
                </li>
              </ol>
            </nav>

            <div className="max-w-4xl space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-700 dark:text-sky-300">
                Uitgelicht project · Munte (Merelbeke)
              </p>
              <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                FlushPoint by X3DPrints: modulaire plafondsokkels voor een akoestisch spuitplafond
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                FlushPoint maakt verlichting in een akoestisch spuitplafond vooraf planbaar én achteraf verwisselbaar, met één 3D geprinte basis voor hanglamp, inbouwspot of reservepunt.
              </p>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Voor deze nieuwbouwwoning werden 60 plafondsokkels ontworpen, getest en in twee werffasen geproduceerd. Het concept kwam van de klant; X3DPrints vertaalde het naar een printbaar en monteerbaar systeem.
              </p>
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
                Gepubliceerd en laatst bijgewerkt: 31 juli 2026 · Leestijd: ongeveer 10 minuten
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { value: "60", label: "plafondsokkels" },
                { value: "3", label: "finale afwerkingen" },
                { value: "½ draai", label: "om een module te wisselen" },
              ].map((stat) => (
                <GlassCard key={stat.label} className="p-5">
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-50">{stat.value}</p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{stat.label}</p>
                </GlassCard>
              ))}
            </div>

            <ProjectImage
              src={heroImage}
              alt="Afgewerkte hanglamp gemonteerd met FlushPoint in een akoestisch spuitplafond"
              caption="Het eindresultaat: een hanglamp op een vooraf geplaatst lichtpunt, zonder zichtbare afdekring of nieuwe boring in het afgewerkte spuitplafond."
              width={2000}
              height={1170}
              sizes="(min-width: 1024px) 1024px, calc(100vw - 48px)"
              priority
            />

            <div className="flex flex-wrap gap-3">
              <ShimmerButton
                href={contactHref}
                event={{ action: "cta_click", category: "flushpoint_case_top", label: "project_intake" }}
              >
                Bespreek een gelijkaardig project
              </ShimmerButton>
              <Link
                href="/3d-modelleren"
                className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
              >
                Bekijk 3D modelleren
              </Link>
            </div>
          </header>

          <ContentTableOfContents items={tocItems} title="In dit artikel" className="mt-10" />

          <div className="mt-12 space-y-16">
            <section id="probleem" className="scroll-mt-28">
              <Reveal>
                <div className="max-w-3xl space-y-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-700 dark:text-sky-300">De uitdaging</p>
                  <h2 className="text-balance text-3xl font-bold text-slate-900 dark:text-slate-50">
                    Waarom vraagt verlichting in een akoestisch spuitplafond om voorbereiding?
                  </h2>
                  <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                    Pascal koos voor een akoestische spuitpleister als plafondafwerking: in dit project een laag cellulosevezels van ongeveer 35 millimeter, rechtstreeks op het OSB-plafond. Het resultaat is naadloos en meteen de zichtbare eindafwerking.
                  </p>
                  <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                    Net daardoor wordt elk lichtpunt een planningsvraag. Achteraf boren of zagen kan een blijvend litteken maken in het oppervlak. Alle openingen moesten dus vóór de spuiters kwamen op hun definitieve plaats zitten én tijdens het spuiten vrij blijven.
                  </p>
                  <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                    De klant had de basisoplossing al in SketchUp getekend. De opdracht voor X3DPrints was concreet: maak van dat concept onderdelen die betrouwbaar passen, vlot boven het hoofd monteren en in een reeks van zestig stuks produceren.
                  </p>
                </div>
              </Reveal>
            </section>

            <section id="concept" className="scroll-mt-28 space-y-8">
              <Reveal>
                <div className="max-w-3xl space-y-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-700 dark:text-sky-300">Het concept</p>
                  <h2 className="text-balance text-3xl font-bold text-slate-900 dark:text-slate-50">
                    Hoe werkt het modulaire FlushPoint-plafondsysteem?
                  </h2>
                  <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                    Het uitgangspunt was niet drie aparte armaturen ontwerpen, maar één vaste plafondsokkel met verwisselbare opzetstukken. Zo blijven boorgat, flens en bevestiging overal gelijk, terwijl de finale keuze pas na het spuiten hoeft te vallen.
                  </p>
                </div>
              </Reveal>

              <ProjectImage
                src="/images/blog/flushpoint/02-concept-plafondsokkel-sketchup-maten.webp"
                alt="SketchUp-concept van FlushPoint met maatvoering voor sokkel, deksel en hanglampmodule"
                caption="De SketchUp-tekening van de klant met de herziene basismaat: een flens van 100 mm en een binnendiameter van 46 mm."
                width={1279}
                height={355}
              />

              <Reveal>
                <div className="overflow-x-auto rounded-3xl border border-slate-200/80 bg-white/85 shadow-sm dark:border-slate-700/70 dark:bg-slate-950/75">
                  <table className="min-w-full text-left text-sm text-slate-700 dark:text-slate-300">
                    <caption className="sr-only">Vergelijking van de FlushPoint-modules per fase en toepassing</caption>
                    <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-900 dark:text-slate-400">
                      <tr>
                        <th scope="col" className="px-5 py-4">Moment</th>
                        <th scope="col" className="px-5 py-4">Module</th>
                        <th scope="col" className="px-5 py-4">Functie</th>
                      </tr>
                    </thead>
                    <tbody>
                      {systemRows.map((row) => (
                        <tr key={row.moment} className="border-t border-slate-200/70 dark:border-slate-700/70">
                          <th scope="row" className="px-5 py-4 font-semibold text-slate-900 dark:text-slate-100">{row.moment}</th>
                          <td className="px-5 py-4">{row.module}</td>
                          <td className="px-5 py-4">{row.function}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Reveal>

              <div className="grid gap-6 md:grid-cols-3">
                <ProjectImage
                  src="/images/blog/flushpoint/04-plafondsokkel-verlengde-variant-inbouwspot.webp"
                  alt="Verlengde witte FlushPoint-plafondsokkel voor een inbouwspot"
                  caption="De verlengde sokkelvariant voor inbouwspots."
                  width={1400}
                  height={1050}
                  sizes="(min-width: 768px) 30vw, calc(100vw - 48px)"
                />
                <ProjectImage
                  src="/images/blog/flushpoint/07-opzetstuk-hanglamp-met-trekontlasting.webp"
                  alt="Zwart FlushPoint-opzetstuk voor een hanglamp met geïntegreerde trekontlasting"
                  caption="De hanglampmodule met geprinte trekontlasting."
                  width={1400}
                  height={933}
                  sizes="(min-width: 768px) 30vw, calc(100vw - 48px)"
                />
                <ProjectImage
                  src="/images/blog/flushpoint/08-spuitkap-tijdelijke-afdekking.webp"
                  alt="Rode tijdelijke beschermkap voor een FlushPoint-plafondsokkel"
                  caption="Een tijdelijke kap die de sokkel tijdens het spuiten beschermt."
                  width={1400}
                  height={1050}
                  sizes="(min-width: 768px) 30vw, calc(100vw - 48px)"
                />
              </div>
            </section>

            <section id="iteratie" className="scroll-mt-28">
              <Reveal>
                <GlassCard className="p-7 sm:p-9">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-700 dark:text-amber-300">Itereren vóór serieproductie</p>
                  <h2 className="mt-3 text-balance text-3xl font-bold text-slate-900 dark:text-slate-50">
                    Waarom werd het ontwerp halfweg volledig aangepast?
                  </h2>
                  <div className="mt-5 space-y-4 leading-relaxed text-slate-700 dark:text-slate-300">
                    <p>
                      Na het eerste testmodel bestelde Pascal een echte inbouwspot. De oorspronkelijke binnendiameter van 76 millimeter bleek visueel te zwaar voor een woonkamerplafond. Een compacter armatuur paste in een boorgat van 44 millimeter, waarna de sokkel opnieuw werd opgebouwd rond 46 millimeter binnendiameter.
                    </p>
                    <p>
                      Voor klassieke tooling zou zo’n wijziging laat en duur zijn. In dit 3D printtraject betekende ze een avond hertekenen en één nieuwe testprint. Precies daar verdiende additive manufacturing zijn plaats: de maatvoering kon nog veranderen zolang de serieproductie niet gestart was.
                    </p>
                    <p>
                      Meer over die aanpak lees je in de gids over{" "}
                      <Link href="/blog/prototyping-kleine-reeksen-3d-printen" className="font-semibold text-indigo-600 underline underline-offset-4 dark:text-indigo-300">
                        prototyping en kleine reeksen
                      </Link>
                      .
                    </p>
                  </div>
                </GlassCard>
              </Reveal>
            </section>

            <section id="halve-draai" className="scroll-mt-28 space-y-8">
              <Reveal>
                <div className="max-w-3xl space-y-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-700 dark:text-sky-300">Montagelogica</p>
                  <h2 className="text-balance text-3xl font-bold text-slate-900 dark:text-slate-50">
                    Hoe maakt een meergangige schroefdraad een halve draai voldoende?
                  </h2>
                  <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                    De koppeling tussen sokkel en opzetstuk gebruikt een grove meergangige draad, vergelijkbaar met het principe van een bokaaldeksel. Verschillende draadgangen grijpen tegelijk, waardoor het opzetstuk na ongeveer een halve draai vastzit.
                  </p>
                  <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                    Dat verkort niet alleen de montage van zestig onderdelen boven het hoofd. Bij een hanglamp loopt het snoer door het midden en kan het niet eindeloos meedraaien. De korte beweging maakt wisselen met één hand praktisch.
                  </p>
                  <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                    De kritieke parameter zat in de speling op de draadflanken: ruim genoeg voor een vezel of restje spuitpleister, nauw genoeg om rammelen en scheefzakken te vermijden. Enkele testprints leverden de werkbare tussenmaat op.
                  </p>
                </div>
              </Reveal>

              <ProjectImage
                src="/images/blog/flushpoint/03-plafondsokkel-basis-meergangige-schroefdraad.webp"
                alt="Close-up van een witte 3D geprinte plafondsokkel met meergangige schroefdraad"
                caption="De basis met zichtbare meergangige schroefdraad. De flens ligt tijdens het printen vlak op het bed, zodat de draad zonder support wordt opgebouwd."
                width={1400}
                height={1050}
              />
            </section>

            <section id="klemprobleem" className="scroll-mt-28 space-y-8">
              <Reveal>
                <div className="max-w-3xl space-y-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-700 dark:text-sky-300">Testen met echte hardware</p>
                  <h2 className="text-balance text-3xl font-bold text-slate-900 dark:text-slate-50">
                    Hoe werd het klemprobleem van de inbouwspot opgelost?
                  </h2>
                  <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                    Op de tekening zag de spotpassing er correct uit. In de fysieke test bleken de zwarte veerklemmen echter zo krachtig dat ze achter de flens haakten. De spot zat vast, maar kon langs onder niet meer worden verwijderd zonder schade.
                  </p>
                  <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                    De oplossing was eenvoudig en projectbepalend: de sokkel boven de flens ongeveer drie centimeter verlengen. De veren duwen daardoor tegen een gladde cilindrische wand in plaats van achter een rand te blokkeren. De spot blijft geklemd, maar blijft ook bereikbaar voor vervanging.
                  </p>
                  <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                    Sinds die test bestaan er twee basisvarianten: een korte sokkel voor hanglampen en een verlengde sokkel voor inbouwspots. Dit is precies het soort detail dat pas zichtbaar wordt met een prototype in de hand.
                  </p>
                </div>
              </Reveal>

              <div className="grid items-start gap-6 lg:grid-cols-2">
                <ProjectImage
                  src="/images/blog/flushpoint/05-vergelijking-korte-en-verlengde-sokkel.webp"
                  alt="Vergelijking tussen de korte en verlengde FlushPoint-plafondsokkel"
                  caption="Links de korte basis voor hanglampen; rechts de verlengde variant die de spotveren langs een gladde wand begeleidt."
                  width={1092}
                  height={263}
                  sizes="(min-width: 1024px) 480px, calc(100vw - 48px)"
                />
                <ProjectImage
                  src="/images/blog/flushpoint/06-testopstelling-inbouwspot-veerklemmen.webp"
                  alt="Testopstelling van een inbouwspot in een witte plafondsokkel met zwarte veerklemmen"
                  caption="De echte testopstelling maakte zichtbaar waar de zwarte veerklemmen achter de flens konden blokkeren."
                  width={1600}
                  height={1150}
                  sizes="(min-width: 1024px) 480px, calc(100vw - 48px)"
                />
              </div>
            </section>

            <section id="materiaal" className="scroll-mt-28">
              <Reveal>
                <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
                  <div className="space-y-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-700 dark:text-sky-300">Materiaal en kleur</p>
                    <h2 className="text-balance text-3xl font-bold text-slate-900 dark:text-slate-50">
                      Waarom werd PETG gekozen voor de plafondsokkels?
                    </h2>
                    <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                      Pascal liet de gekozen spot eerst enkele uren branden in een testexemplaar. De opstelling bleef koud, waardoor taaiheid en maatvastheid in deze toepassing zwaarder wogen dan extreme hittebestendigheid. PETG werd daarom de projectkeuze.
                    </p>
                    <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                      De witte kleur werd niet op een scherm gekozen, maar door een plafondstaal naast een testprint te leggen. Voor de zichtbare hanglampmodules zijn zowel witte als zwarte onderdelen geproduceerd, zodat de finale keuze op de werf kon gebeuren.
                    </p>
                    <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                      De tijdelijke kappen mochten wél opvallen. Restfilament in rood, oranje, zwart en paars maakte elk lichtpunt op het OSB-plafond snel herkenbaar en gaf materiaal dat anders ongebruikt bleef een tijdelijke functie.
                    </p>
                  </div>
                  <GlassCard className="h-fit border-amber-200/80 bg-amber-50/80 p-6 dark:border-amber-300/20 dark:bg-amber-400/10">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-800 dark:text-amber-200">Belangrijke projectgrens</p>
                    <p className="mt-3 text-sm leading-relaxed text-amber-950 dark:text-amber-100">
                      Deze case is geen universele materiaalgoedkeuring voor armaturen. Temperatuur, brandgedrag, draagfunctie en elektrische aansluiting moeten per project en armatuur worden beoordeeld. Laat de elektrische installatie uitvoeren en controleren volgens de geldende voorschriften.
                    </p>
                    <Link href="/materials/petg" className="mt-4 inline-flex text-sm font-semibold text-amber-900 underline underline-offset-4 dark:text-amber-100">
                      Bekijk PETG als functioneel materiaal
                    </Link>
                  </GlassCard>
                </div>
              </Reveal>
            </section>

            <section id="productie" className="scroll-mt-28 space-y-8">
              <Reveal>
                <div className="max-w-3xl space-y-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-700 dark:text-sky-300">Serieproductie</p>
                  <h2 className="text-balance text-3xl font-bold text-slate-900 dark:text-slate-50">
                    Hoe werden 60 plafondsokkels zonder supports geproduceerd?
                  </h2>
                  <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                    Elk onderdeel werd met de draadas verticaal en de flens vlak op het printbed georiënteerd. De draad ontstaat zo als concentrische lagen en heeft geen supportmateriaal nodig. Dat spaart printtijd én nabewerking in een zone die schoon moet blijven passen.
                  </p>
                </div>
              </Reveal>

              <ProjectImage
                src="/images/blog/flushpoint/09-printbed-serie-plafondsokkels.webp"
                alt="Slicerweergave van FlushPoint-sokkels, deksels en hanglampmodules op een 3D printbed"
                caption="De productieset in de slicer: basisvarianten, reservedeksels en de hoge module met trekontlasting op één printbed."
                width={1045}
                height={792}
              />

              <Reveal>
                <div className="max-w-3xl space-y-5">
                  <h2 className="text-balance text-3xl font-bold text-slate-900 dark:text-slate-50">
                    Waarom werd de opdracht in twee werffasen gesplitst?
                  </h2>
                  <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                    De planning van de spuiter bepaalde de eerste deadline. Eerst moesten alle zestig basissokkels en tijdelijke beschermkappen klaar zijn. Zonder die delen kon het akoestische plafond niet worden aangebracht.
                  </p>
                  <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                    De dertig hanglampmodules en reservedeksels volgden een maand of twee later. Die fasering spreidde de productie en stelde tegelijk een beslissing uit die de klant pas na de plafondafwerking goed kon nemen: welk lichtpunt krijgt welke lamp?
                  </p>
                </div>
              </Reveal>

              <ProjectImage
                src="/images/blog/flushpoint/10-plafondsokkels-osb-plafond-voor-spuiten.webp"
                alt="OSB-plafond met gemonteerde FlushPoint-sokkels en gekleurde beschermkappen vóór het spuitwerk"
                caption="Fase één op de werf: de sokkels zijn gemonteerd en de gekleurde tijdelijke kappen maken alle lichtpunten zichtbaar vóór het akoestische spuitwerk."
                width={2000}
                height={1125}
              />

              <Reveal>
                <GlassCard className="p-7 sm:p-9">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-700 dark:text-sky-300">Proces in vijf stappen</p>
                  <ol className="mt-6 grid gap-4 md:grid-cols-2">
                    {processSteps.map((step) => (
                      <li key={step.title} className="rounded-2xl border border-slate-200/70 bg-white/70 p-5 dark:border-slate-700/70 dark:bg-slate-900/70">
                        <h3 className="font-semibold text-slate-900 dark:text-slate-100">{step.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{step.body}</p>
                      </li>
                    ))}
                  </ol>
                </GlassCard>
              </Reveal>
            </section>

            <section id="resultaat" className="scroll-mt-28">
              <Reveal>
                <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
                  <div className="space-y-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-700 dark:text-emerald-300">Het resultaat</p>
                    <h2 className="text-balance text-3xl font-bold text-slate-900 dark:text-slate-50">
                      Een lichtpunt dat al vóór de pleister klaarzat
                    </h2>
                    <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                      Na het spuiten gingen de tijdelijke kappen eraf en konden de finale modules worden geplaatst. De hanglamp op de openingsfoto sluit rechtstreeks aan op het akoestische plafond: zonder brede afdekring, zonder zichtbare herstelling en zonder nieuw boorgat.
                    </p>
                    <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                      De waarde van FlushPoint zit niet in een complexe vorm, maar in de combinatie van tolerantie, printoriëntatie, wisselbaarheid en werfvolgorde. Het systeem liet ontwerpkeuzes open tot het moment waarop de informatie wél beschikbaar was.
                    </p>
                  </div>
                  <GlassCard className="h-fit p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Projectbewijs</p>
                    <dl className="mt-4 space-y-4 text-sm">
                      <div>
                        <dt className="font-semibold text-slate-900 dark:text-slate-100">Locatie</dt>
                        <dd className="mt-1 text-slate-600 dark:text-slate-300">Nieuwbouwwoning in Munte (Merelbeke)</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-slate-900 dark:text-slate-100">Scope</dt>
                        <dd className="mt-1 text-slate-600 dark:text-slate-300">60 basissokkels, tijdelijke kappen en finale opzetstukken</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-slate-900 dark:text-slate-100">Workflow</dt>
                        <dd className="mt-1 text-slate-600 dark:text-slate-300">Concept → hertekenen → testprints → werffase 1 → afwerking</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-slate-900 dark:text-slate-100">Productie</dt>
                        <dd className="mt-1 text-slate-600 dark:text-slate-300">Ontworpen en 3D geprint bij X3DPrints in Herzele</dd>
                      </div>
                    </dl>
                  </GlassCard>
                </div>
              </Reveal>
            </section>

            <section id="toepassingen" className="scroll-mt-28">
              <Reveal>
                <GlassCard className="p-7 sm:p-9">
                  <h2 className="text-balance text-3xl font-bold text-slate-900 dark:text-slate-50">
                    Wanneer is deze modulaire aanpak ook voor andere projecten interessant?
                  </h2>
                  <p className="mt-5 leading-relaxed text-slate-700 dark:text-slate-300">
                    De achterliggende vraag komt vaker voor: techniek moet vroeg in de bouw aanwezig zijn, terwijl de zichtbare afwerking pas later komt en daarna liefst intact blijft. Denk aan akoestische spuitplafonds, leemstuc, spanplafonds of andere naadloze oppervlakken waar een latere boring moeilijk te herstellen is.
                  </p>
                  <ul className="mt-5 grid gap-3 text-sm text-slate-700 dark:text-slate-300 sm:grid-cols-2">
                    {[
                      "De finale invulling van een aansluitpunt ligt nog niet vast.",
                      "Een standaardonderdeel past niet bij laagdikte of armatuur.",
                      "Montage moet snel en met één hand kunnen gebeuren.",
                      "Onderhoud of vervanging moet mogelijk blijven na de afwerking.",
                      "Een kleine of middelgrote reeks maakt klassieke tooling onlogisch.",
                      "De oplossing moet eerst met echte hardware worden gevalideerd.",
                    ].map((item) => (
                      <li key={item} className="rounded-2xl border border-slate-200/70 bg-white/70 px-4 py-3 dark:border-slate-700/70 dark:bg-slate-900/70">
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    Heb je nog geen printbaar bestand? Bekijk hoe X3DPrints helpt met{" "}
                    <Link href="/3d-modelleren" className="font-semibold text-indigo-600 underline underline-offset-4 dark:text-indigo-300">
                      3D modelleren
                    </Link>{" "}
                    of lees de{" "}
                    <Link href="/blog/3d-print-ontwerp-checklist" className="font-semibold text-indigo-600 underline underline-offset-4 dark:text-indigo-300">
                      ontwerpchecklist voor 3D printen
                    </Link>
                    .
                  </p>
                </GlassCard>
              </Reveal>
            </section>

            <section id="faq" className="scroll-mt-28">
              <Reveal>
                <h2 className="text-balance text-3xl font-bold text-slate-900 dark:text-slate-50">
                  Veelgestelde vragen over FlushPoint en plafondsokkels voor spuitplafonds
                </h2>
                <div className="mt-6">
                  <Faq items={faqItems} />
                </div>
              </Reveal>
            </section>

            <section id="bronnen" className="scroll-mt-28">
              <Reveal>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Bronnen en projectreferenties</h2>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  De projectdetails, maten en testresultaten komen uit het klanttraject en de productiegegevens van X3DPrints. Onderstaande primaire bronnen geven aanvullende context bij ontwerp, materiaal, spuitwerk en elektrische veiligheid.
                </p>
                <ul className="mt-5 grid gap-3">
                  {references.map((reference) => (
                    <li key={reference.href} className="rounded-2xl border border-slate-200/70 bg-white/80 px-5 py-4 dark:border-slate-700/70 dark:bg-slate-950/75">
                      <cite className="not-italic">
                        <Link
                          href={reference.href}
                          target="_blank"
                          rel="noreferrer"
                          className="font-semibold text-indigo-600 underline underline-offset-4 dark:text-indigo-300"
                        >
                          {reference.label}
                        </Link>
                      </cite>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{reference.note}</p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </section>

            <section aria-labelledby="flushpoint-cta-title">
              <Reveal>
                <GlassCard className="border-sky-200/80 bg-sky-50/80 p-8 dark:border-sky-300/20 dark:bg-sky-400/10 sm:p-10">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-700 dark:text-sky-300">Van bouwdetail naar werkend onderdeel</p>
                  <h2 id="flushpoint-cta-title" className="mt-3 text-balance text-3xl font-bold text-slate-900 dark:text-slate-50">
                    Heb je een vergelijkbaar lichtpunt, plafond of montagedetail?
                  </h2>
                  <p className="mt-4 max-w-3xl leading-relaxed text-slate-700 dark:text-slate-300">
                    Stuur een schets, foto, maatvoering en informatie over de echte armatuur. Je krijgt een eerlijke eerste inschatting van ontwerp, testwerk, materiaal en produceerbaarheid.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <ShimmerButton
                      href={contactHref}
                      event={{ action: "cta_click", category: "flushpoint_case_bottom", label: "project_intake" }}
                    >
                      Vraag een eerste projectinschatting
                    </ShimmerButton>
                    <Link
                      href="/portfolio"
                      className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                    >
                      Bekijk meer maatwerk
                    </Link>
                  </div>
                </GlassCard>
              </Reveal>
            </section>

            <BlogReadMore />
          </div>
        </article>
      </main>

      <BlogAuthorNote locale="nl" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </>
  )
}
