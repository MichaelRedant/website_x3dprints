import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import BlogAuthorNote from "@/components/BlogAuthorNote"
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
  buildImageGallerySchema,
  buildImageObjectSchema,
} from "@/lib/seo"

const slug = "vliezelse-beer-3d-beeldjes-berenfeesten"
const canonical = `https://www.x3dprints.be/blog/${slug}/`
const datePublished = "2026-07-31"
const dateModified = "2026-07-31"
const imageBase = "/images/blog/berenfeesten-vlierzele"
const originalImage = `${imageBase}/berenfeesten-vlierzele-origineel-standbeeld.webp`
const modelImage = `${imageBase}/berenfeesten-vlierzele-3d-model-printvoorbereiding.webp`
const resultImage = `${imageBase}/berenfeesten-vlierzele-geprinte-beeldjes.webp`
const ogImage = `${imageBase}/berenfeesten-vlierzele-og.webp`
const contactHref =
  "/contact?material=PLA%20Silk%2B&quote=Beeld%20of%20mascotte%20omzetten%20naar%203D-beeldje"

export const metadata: Metadata = {
  title: "Standbeeld naar 3D-beeldje | Berenfeesten Vlierzele",
  description:
    "Bekijk hoe de Vliezelse beer via ChatGPT, Hitem3D en technische printvoorbereiding veranderde in 3D-geprinte beeldjes voor de Berenfeesten.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": canonical,
      "en-BE": `https://www.x3dprints.be/en/blog/${slug}/`,
      "x-default": canonical,
    },
  },
  openGraph: {
    type: "article",
    title: "De Vliezelse beer: van foto naar 3D-beeldje",
    description:
      "Projectcase over AI-ondersteunde modelopbouw, printvoorbereiding en een reeks bronskleurige beeldjes voor de Berenfeesten in Vlierzele.",
    url: canonical,
    publishedTime: datePublished,
    modifiedTime: dateModified,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Bronskleurige 3D-beeldjes van de Vliezelse beer voor de Berenfeesten",
      },
    ],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "De Vliezelse beer: van foto naar 3D-beeldje",
    description:
      "Hoe vier foto's, ChatGPT, Hitem3D en gerichte printvoorbereiding leidden tot een reeks beeldjes zonder lijmnaden.",
    images: [ogImage],
  },
}

const tocItems = [
  { id: "opdracht", label: "Waarom werd het standbeeld verkleind?" },
  { id: "workflow", label: "Hoe ging het van foto's naar een 3D-model?" },
  { id: "printklaar", label: "Waarom was het AI-model niet meteen printklaar?" },
  { id: "een-geheel", label: "Hoe werd het beeldje als een geheel geprint?" },
  { id: "materiaal", label: "Waarom PLA Silk+ in bronskleur?" },
  { id: "resultaat", label: "Wat werd er voor de Berenfeesten gemaakt?" },
  { id: "geschikt", label: "Voor welke projecten werkt deze aanpak?" },
  { id: "faq", label: "Veelgestelde vragen" },
  { id: "bronnen", label: "Bronnen en projectreferenties" },
] as const

const workflowRows = [
  {
    phase: "Bronmateriaal",
    input: "Vier foto's van het originele standbeeld",
    output: "Visuele referenties van houding, verhoudingen en details",
  },
  {
    phase: "Beeldoptimalisatie",
    input: "ChatGPT Images",
    output: "Een duidelijke, 3D-vriendelijke referentieafbeelding",
  },
  {
    phase: "Image-to-3D",
    input: "Hitem3D",
    output: "Een eerste digitale mesh als technisch startmodel",
  },
  {
    phase: "Printvoorbereiding",
    input: "Modelcontrole, schaalkeuze, support en slicer",
    output: "Printbare versies van 15 cm en 30 cm",
  },
  {
    phase: "Productie",
    input: "PLA Silk+ brons en twee sokkelafwerkingen",
    output: "Een gecontroleerde reeks beeldjes uit een geheel",
  },
] as const

const howToSteps = [
  {
    name: "Verzamel bruikbaar fotomateriaal",
    text: "Fotografeer het onderwerp scherp en vanuit verschillende hoeken. Voor deze case waren vier foto's beschikbaar; bij andere vormen kunnen extra beelden nodig zijn.",
    url: `${canonical}#workflow`,
  },
  {
    name: "Maak een heldere referentieafbeelding",
    text: "Gebruik de bronbeelden om vorm, houding en zichtbare details in een rustige referentie samen te brengen. ChatGPT Images werd hier gebruikt als beeldstap, niet als 3D-modelgenerator.",
    url: `${canonical}#workflow`,
  },
  {
    name: "Genereer een eerste 3D-model",
    text: "Hitem3D zette de geoptimaliseerde referentie om naar een eerste mesh. Dat model was een vertrekpunt en moest nog technisch worden gecontroleerd.",
    url: `${canonical}#printklaar`,
  },
  {
    name: "Maak de geometrie printbaar",
    text: "Controleer gesloten geometrie, dunne details, schaal, stabiliteit, supportzones en de aansluiting op de sokkel.",
    url: `${canonical}#printklaar`,
  },
  {
    name: "Valideer met een testprint",
    text: "Print eerst een teststuk en beoordeel herkenbaarheid, ondersteuning, zichtvlakken en materiaalglans voordat de reeks start.",
    url: `${canonical}#een-geheel`,
  },
] as const

const faqItems = [
  {
    q: "Kun je van foto's een 3D-beeldje laten maken?",
    a: "Dat kan wanneer de vorm voldoende zichtbaar is en de gewenste nauwkeurigheid realistisch blijft. Foto-naar-3D levert doorgaans een startmodel op. Technische controle en nabewerking blijven nodig voordat het bestand betrouwbaar kan worden geprint.",
  },
  {
    q: "Werd de Vliezelse beer 3D gescand?",
    a: "Nee. Deze case vertrok van vier foto's. ChatGPT werd gebruikt voor een 3D-vriendelijke referentieafbeelding en Hitem3D voor het eerste 3D-model. Er was geen laserscan of fysieke scan van het standbeeld.",
  },
  {
    q: "Waarom kun je een AI-gegenereerd 3D-model niet direct printen?",
    a: "AI kan details verkeerd interpreteren en levert niet automatisch gesloten, sterke of stabiele geometrie. Wanddiktes, losse vlakken, schaal, support, contact met de sokkel en kwetsbare details moeten eerst worden nagekeken.",
  },
  {
    q: "Waarom werden beer, kind en sokkel niet apart geprint?",
    a: "Een print uit een geheel vermijdt zichtbare lijmnaden en loskomende verbindingen. Daarvoor moesten orientatie en support wel zorgvuldig worden getest, vooral rond het opgeheven armpje en het kind op de schouders.",
  },
  {
    q: "Kan X3DPrints ook een mascotte of aandenken als kleine reeks maken?",
    a: "Ja, na een haalbaarheidscontrole van het bronmateriaal, de rechten, het gewenste formaat en de details. Eerst volgt een digitaal model en testprint; pas na goedkeuring start de reeks.",
  },
] as const

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "De Vliezelse beer in het klein: van foto's naar 3D-beeldjes voor de Berenfeesten",
  description:
    "Projectcase over ChatGPT, Hitem3D, technische printvoorbereiding en de productie van bronskleurige 3D-beeldjes voor de Berenfeesten in Vlierzele.",
  datePublished,
  dateModified,
  image: [ogImage, resultImage, modelImage, originalImage],
  inLanguage: "nl-BE",
})

const faqJsonLd = buildFaqPageSchema({
  inLanguage: "nl-BE",
  mainEntityOfPage: canonical,
  items: [...faqItems],
})

const howToJsonLd = buildHowToSchema({
  name: "Van foto's naar een printbaar 3D-beeldje",
  description:
    "De gebruikte workflow voor de Vliezelse beer: bronfoto's, beeldoptimalisatie, image-to-3D, technische modelcontrole en testprint.",
  steps: [...howToSteps],
  inLanguage: "nl-BE",
  mainEntityOfPage: canonical,
  toolNames: ["ChatGPT Images", "Hitem3D", "3D-slicer"],
  supplyNames: ["PLA Silk+ brons", "Filament voor de sokkel"],
  url: `${canonical}#workflow`,
})

const breadcrumbJsonLd = buildBreadcrumbSchema({
  id: `${canonical}#breadcrumb`,
  inLanguage: "nl-BE",
  items: [
    { name: "Home", url: "https://www.x3dprints.be/" },
    { name: "Blog en kennisbank", url: "https://www.x3dprints.be/blog/" },
    { name: "Vliezelse beer als 3D-beeldje", url: canonical },
  ],
})

const galleryImages = [
  buildImageObjectSchema({
    url: resultImage,
    caption: "Bronskleurige 3D-geprinte beeldjes voor de Berenfeesten in Vlierzele",
    description: "Afgewerkte beeldjes van de Vliezelse beer in PLA Silk+ brons.",
    inLanguage: "nl-BE",
    creditText: "X3DPrints",
    representativeOfPage: true,
  }),
  buildImageObjectSchema({
    url: modelImage,
    caption: "Printvoorbereiding van de Vliezelse beer in twee formaten",
    description: "De digitale modellen van 15 cm en 30 cm in de slicer.",
    inLanguage: "nl-BE",
    creditText: "X3DPrints",
  }),
  buildImageObjectSchema({
    url: originalImage,
    caption: "Het originele standbeeld 't VlieZLs Beerke in Vlierzele",
    description: "Referentiefoto van de rechtopstaande beer met een kind op de schouders.",
    inLanguage: "nl-BE",
    creditText: "Projectreferentie Berenfeesten",
  }),
]

const galleryJsonLd = buildImageGallerySchema({
  name: "Van Vliezels standbeeld naar 3D-geprinte beeldjes",
  description: "Projectbeelden van het origineel, de digitale printvoorbereiding en het afgewerkte resultaat.",
  url: `${canonical}#resultaat`,
  images: galleryImages,
  inLanguage: "nl-BE",
})

export default function VliezelseBeerArticlePage() {
  return (
    <article className="relative overflow-hidden px-4 pb-24 pt-10 sm:px-6 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(145deg,#fffaf0_0%,#ffffff_40%,#f5eee5_100%)] dark:bg-[linear-gradient(145deg,#111827_0%,#0f172a_48%,#1c1917_100%)]" />
        <div className="absolute -left-24 top-24 h-96 w-96 rounded-full bg-amber-300/20 blur-[130px] dark:bg-amber-500/10" />
        <div className="absolute -right-24 top-[32rem] h-[28rem] w-[28rem] rounded-full bg-orange-300/20 blur-[150px] dark:bg-orange-500/10" />
      </div>

      <div className="mx-auto max-w-6xl">
        <nav aria-label="Broodkruimel" className="text-sm text-slate-600 dark:text-slate-300">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="underline underline-offset-4">Home</Link></li>
            <li aria-hidden>/</li>
            <li><Link href="/blog" className="underline underline-offset-4">Blog</Link></li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="font-medium text-slate-900 dark:text-slate-100">Berenfeesten</li>
          </ol>
        </nav>

        <header className="mt-7 grid gap-8 lg:grid-cols-[0.94fr_1.06fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-700 dark:text-amber-300">
              Projectcase | Vlierzele
            </p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl dark:text-white">
              De Vliezelse beer in het klein: van foto naar 3D-beeldje
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700 dark:text-slate-300">
              Voor de Berenfeesten werd het lokale standbeeld &lsquo;t VlieZLs Beerke&rsquo; omgezet naar een reeks
              bronskleurige beeldjes. Vier foto&apos;s vormden de basis voor een AI-ondersteund 3D-model. X3DPrints maakte
              dat model printbaar en produceerde beer, kind en sokkel zonder lijmnaden.
            </p>
            <p className="mt-4 text-sm font-medium text-slate-500 dark:text-slate-400">
              Gepubliceerd en bijgewerkt op 31 juli 2026 | Leestijd: ongeveer 8 minuten
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ShimmerButton href={contactHref}>Bespreek een beeldjesproject</ShimmerButton>
              <Link
                href="/3d-modelleren"
                className="inline-flex items-center rounded-full border border-amber-300/70 bg-white/85 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white dark:border-amber-300/30 dark:bg-slate-900/80 dark:text-slate-100"
              >
                Bekijk 3D modelleren
              </Link>
            </div>
          </div>

          <figure className="overflow-hidden rounded-[2rem] border border-white/60 bg-white/70 shadow-[0_24px_80px_rgba(120,53,15,0.18)] dark:border-slate-700/70 dark:bg-slate-900/70">
            <Image
              src={resultImage}
              alt="Reeks bronskleurige 3D-geprinte beeldjes van de Vliezelse beer"
              width={1434}
              height={1793}
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="aspect-[4/5] h-auto w-full object-cover"
              priority
            />
            <figcaption className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">
              De afgewerkte beeldjes in PLA Silk+ brons, klaar voor de Berenfeesten.
            </figcaption>
          </figure>
        </header>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            ["4", "bronfoto's van het standbeeld"],
            ["2", "formaten: 15 cm en 30 cm"],
            ["1", "geheel zonder verlijming"],
          ].map(([value, label]) => (
            <GlassCard key={label} className="p-5 text-center">
              <p className="text-3xl font-black text-amber-700 dark:text-amber-300">{value}</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{label}</p>
            </GlassCard>
          ))}
        </div>

        <ContentTableOfContents items={tocItems} title="In dit artikel" className="mx-auto mt-10 max-w-4xl" />

        <div className="mx-auto mt-12 max-w-5xl space-y-8">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <section id="opdracht" className="scroll-mt-28">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700 dark:text-amber-300">De opdracht</p>
                <h2 className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">
                  Waarom werd het standbeeld verkleind voor de Berenfeesten?
                </h2>
                <div className="mt-5 grid gap-6 md:grid-cols-[1fr_239px] md:items-center">
                  <div className="space-y-4 text-base leading-7 text-slate-700 dark:text-slate-300">
                    <p>
                      Het standbeeld aan de kerk van Vlierzele toont een rechtopstaande beer met een kind op de
                      schouders. Voor de Berenfeesten wilden de organisatoren die herkenbare vorm als tastbaar aandenken.
                      Er bestond alleen geen CAD-bestand of ander bruikbaar 3D-model.
                    </p>
                    <p>
                      Klassiek <Link href="/3d-modelleren" className="font-semibold text-amber-700 underline underline-offset-4 dark:text-amber-300">3D modelleren</Link> vanaf
                      nul was mogelijk, maar het beschikbare fotomateriaal bood een snellere route naar een eerste
                      organische vorm. Daarom werd AI gebruikt voor de modelbasis. De technische verantwoordelijkheid
                      bleef bij X3DPrints: controleren, corrigeren, verschalen, ondersteunen en testen.
                    </p>
                  </div>
                  <figure className="mx-auto max-w-[239px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md dark:border-slate-700 dark:bg-slate-900">
                    <Image
                      src={originalImage}
                      alt="Origineel standbeeld 't VlieZLs Beerke in Vlierzele"
                      width={239}
                      height={402}
                      sizes="239px"
                      className="h-auto w-full"
                    />
                    <figcaption className="p-3 text-xs text-slate-500 dark:text-slate-400">Het originele standbeeld.</figcaption>
                  </figure>
                </div>
              </section>
            </GlassCard>
          </Reveal>

          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <section id="workflow" className="scroll-mt-28">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700 dark:text-amber-300">Van 2D naar 3D</p>
                <h2 className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">
                  Hoe ging het van vier foto&apos;s naar een 3D-model?
                </h2>
                <p className="mt-4 text-base leading-7 text-slate-700 dark:text-slate-300">
                  ChatGPT Images werd gebruikt om van het bronmateriaal een rustige, 3D-vriendelijke referentie te
                  maken. Hitem3D zette die geoptimaliseerde afbeelding om naar een eerste mesh. De tools hadden dus een
                  andere taak: ChatGPT hielp de visuele input voorbereiden; Hitem3D genereerde de 3D-geometrie.
                </p>

                <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
                  <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                    <caption className="sr-only">Workflow van bronfoto naar afgewerkt 3D-beeldje</caption>
                    <thead className="bg-amber-50 text-slate-900 dark:bg-amber-400/10 dark:text-slate-100">
                      <tr>
                        <th className="px-4 py-3 font-semibold">Fase</th>
                        <th className="px-4 py-3 font-semibold">Input of tool</th>
                        <th className="px-4 py-3 font-semibold">Resultaat</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white/70 text-slate-700 dark:divide-slate-700 dark:bg-slate-950/50 dark:text-slate-300">
                      {workflowRows.map((row) => (
                        <tr key={row.phase}>
                          <th scope="row" className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100">{row.phase}</th>
                          <td className="px-4 py-3">{row.input}</td>
                          <td className="px-4 py-3">{row.output}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                  Deze route was geschikt voor dit project. Een nauwkeurig vervangstuk met kritieke maatvoering vraagt
                  meestal CAD-opbouw of een fysieke <Link href="/3d-scannen" className="font-semibold text-amber-700 underline underline-offset-4 dark:text-amber-300">3D-scan</Link>.
                </p>
              </section>
            </GlassCard>
          </Reveal>

          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <section id="printklaar" className="scroll-mt-28">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700 dark:text-amber-300">Technische controle</p>
                <h2 className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">
                  Waarom was het AI-model niet meteen printklaar?
                </h2>
                <p className="mt-4 text-base leading-7 text-slate-700 dark:text-slate-300">
                  Image-to-3D kan een herkenbare vorm opleveren, maar interpreteert delen die niet zichtbaar zijn. Een
                  mooi model op het scherm kan nog open vlakken, te dunne details of een onstabiele voet bevatten. Bij
                  deze beer kregen vooral het opgeheven handje, de sjaal, de poten en de overgang naar de sokkel extra
                  aandacht.
                </p>
                <div className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                  <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md dark:border-slate-700 dark:bg-slate-900">
                    <Image
                      src={modelImage}
                      alt="Digitale modellen van de Vliezelse beer in 15 en 30 centimeter in de slicer"
                      width={1132}
                      height={1432}
                      sizes="(max-width: 1024px) 100vw, 54vw"
                      className="h-auto w-full"
                    />
                    <figcaption className="p-4 text-sm text-slate-500 dark:text-slate-400">
                      De twee schaalversies tijdens de printvoorbereiding.
                    </figcaption>
                  </figure>
                  <ol className="space-y-3">
                    {howToSteps.map((step, index) => (
                      <li key={step.name} className="rounded-2xl border border-amber-200/70 bg-amber-50/70 p-4 dark:border-amber-300/20 dark:bg-amber-400/5">
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700 dark:text-amber-300">Stap {index + 1}</p>
                        <h3 className="mt-1 font-bold text-slate-900 dark:text-slate-100">{step.name}</h3>
                        <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{step.text}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </section>
            </GlassCard>
          </Reveal>

          <div className="grid gap-8 lg:grid-cols-2">
            <Reveal>
              <GlassCard className="h-full p-6 sm:p-8">
                <section id="een-geheel" className="scroll-mt-28">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700 dark:text-amber-300">Zonder lijmnaden</p>
                  <h2 className="mt-3 text-2xl font-bold text-slate-950 dark:text-white">
                    Hoe werd het beeldje als een geheel geprint?
                  </h2>
                  <p className="mt-4 leading-7 text-slate-700 dark:text-slate-300">
                    Beer, kind en sokkel moesten verbonden blijven. Dat vermijdt naden en losse verbindingen, maar maakt
                    de supportstrategie moeilijker. Eerst werd een testprint gemaakt. Pas na controle van de zichtvlakken,
                    het handje en de stabiliteit startte de reeks.
                  </p>
                  <Link href="/blog/3d-print-ontwerp-checklist" className="mt-4 inline-flex font-semibold text-amber-700 underline underline-offset-4 dark:text-amber-300">
                    Bekijk de ontwerpchecklist voor 3D-printen
                  </Link>
                </section>
              </GlassCard>
            </Reveal>

            <Reveal>
              <GlassCard className="h-full p-6 sm:p-8">
                <section id="materiaal" className="scroll-mt-28">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700 dark:text-amber-300">Materiaalkeuze</p>
                  <h2 className="mt-3 text-2xl font-bold text-slate-950 dark:text-white">
                    Waarom PLA Silk+ in bronskleur?
                  </h2>
                  <p className="mt-4 leading-7 text-slate-700 dark:text-slate-300">
                    De silkglans geeft de beer een warme bronslook zonder schilderwerk. Diezelfde glans toont ook sneller
                    laaglijnen en supportsporen. Printoriëntatie en nabewerking tellen daardoor zwaarder dan bij mat PLA.
                    De sokkel werd zowel in marmer-look als in donkergrijs uitgevoerd.
                  </p>
                  <Link href="/materials/pla-silk" className="mt-4 inline-flex font-semibold text-amber-700 underline underline-offset-4 dark:text-amber-300">
                    Lees de materiaalfiche van PLA Silk+
                  </Link>
                </section>
              </GlassCard>
            </Reveal>
          </div>

          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <section id="resultaat" className="scroll-mt-28">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700 dark:text-amber-300">Het resultaat</p>
                <h2 className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">
                  Wat werd er voor de Berenfeesten gemaakt?
                </h2>
                <div className="mt-5 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                  <div className="space-y-4 text-base leading-7 text-slate-700 dark:text-slate-300">
                    <p>
                      De Vliezelse beer werd geproduceerd in 15 cm en 30 cm. De eerste ronde kreeg een sokkel met
                      marmer-look; voor de latere ronde werd een donkerdere grijze sokkel gekozen. De beer bleef in beide
                      uitvoeringen bronskleurig.
                    </p>
                    <p>
                      De oplage wordt bewust niet gepubliceerd. Relevanter is de productieroute: eerst een digitaal
                      startmodel, daarna technische correcties en een testprint, en pas na goedkeuring een herhaalbare
                      kleine reeks.
                    </p>
                    <div className="flex flex-wrap gap-3 pt-2">
                      <Link href="/portfolio" className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">Bekijk portfolio</Link>
                      <Link href="/pricing" className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">Prijzen en calculator</Link>
                    </div>
                  </div>
                  <Image
                    src={resultImage}
                    alt="Afgewerkte reeks 3D-beeldjes van de Vliezelse beer voor de Berenfeesten"
                    width={1434}
                    height={1793}
                    sizes="(max-width: 1024px) 100vw, 54vw"
                    className="aspect-[4/5] h-auto w-full rounded-2xl object-cover shadow-lg"
                    loading="lazy"
                  />
                </div>
              </section>
            </GlassCard>
          </Reveal>

          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <section id="geschikt" className="scroll-mt-28">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700 dark:text-amber-300">Ook voor andere projecten</p>
                <h2 className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">
                  Wanneer werkt foto-naar-3D voor een beeld, mascotte of aandenken?
                </h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {[
                    "Er bestaat geen bruikbaar 3D-bestand van het onderwerp.",
                    "Herkenbaarheid is belangrijker dan technische maatnauwkeurigheid.",
                    "Je wilt eerst een testbeeldje en daarna een beperkte reeks.",
                    "Formaat, kleur of sokkel moeten tussen bestellingen aanpasbaar blijven.",
                  ].map((item) => (
                    <div key={item} className="rounded-2xl border border-amber-200/70 bg-white/75 p-4 text-sm leading-6 text-slate-700 dark:border-amber-300/20 dark:bg-slate-950/50 dark:text-slate-300">
                      {item}
                    </div>
                  ))}
                </div>
                <p className="mt-5 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  Voor kunstwerken, merken en bestaande ontwerpen moet de opdrachtgever de nodige gebruiks- en
                  reproductierechten kunnen bevestigen. X3DPrints beoordeelt de technische haalbaarheid, niet het
                  juridische eigendom van het bronwerk.
                </p>
              </section>
            </GlassCard>
          </Reveal>

          <section id="faq" className="scroll-mt-28">
            <Faq items={[...faqItems]} title="Veelgestelde vragen over beeldjes maken van foto's" />
          </section>

          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <section id="bronnen" className="scroll-mt-28">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700 dark:text-amber-300">Bronnen</p>
                <h2 className="mt-3 text-2xl font-bold text-slate-950 dark:text-white">Bronnen en projectreferenties</h2>
                <ul className="mt-5 space-y-3 text-sm text-slate-700 dark:text-slate-300">
                  {[
                    ["OpenAI Help: Images in ChatGPT", "https://help.openai.com/en/articles/11084440-images-in-chatgpt"],
                    ["Hi3D: een enkele afbeelding omzetten naar een 3D-model", "https://www.hi3d.ai/ai-faq/does-hitem3d-support-generating-3d-models-from-a-single-image"],
                    ["Bambu Lab: PLA Silk+", "https://eu.store.bambulab.com/products/pla-silk-upgrade"],
                    ["FOD Economie: auteursrecht", "https://economie.fgov.be/sites/default/files/Files/Publications/files/Auteursrecht.pdf"],
                  ].map(([label, href]) => (
                    <li key={href} className="rounded-2xl border border-slate-200 bg-white/75 px-4 py-3 dark:border-slate-700 dark:bg-slate-950/50">
                      <cite className="not-italic">
                        <a href={href} target="_blank" rel="noopener noreferrer" className="font-semibold text-amber-700 underline underline-offset-4 dark:text-amber-300">
                          {label}
                        </a>
                      </cite>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs leading-5 text-slate-500 dark:text-slate-400">
                  De projectbeelden, maten, materiaalkeuze en productiewijze komen uit de eigen projectregistratie van X3DPrints.
                </p>
              </section>
            </GlassCard>
          </Reveal>

          <Reveal>
            <section aria-labelledby="berenfeesten-cta-title" className="rounded-[2rem] bg-slate-950 px-6 py-10 text-white shadow-2xl sm:px-10">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-300">Van foto naar tastbaar object</p>
              <h2 id="berenfeesten-cta-title" className="mt-3 text-3xl font-bold">
                Heb je ook een beeld, mascotte of aandenken zonder 3D-bestand?
              </h2>
              <p className="mt-4 max-w-3xl leading-7 text-slate-300">
                Stuur duidelijke foto&apos;s, het gewenste formaat en het beoogde aantal. Je krijgt eerst een eerlijke
                haalbaarheidscheck en daarna een offerte voor modelwerk, testprint en eventuele reeks.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ShimmerButton href={contactHref}>Vraag een projectinschatting</ShimmerButton>
                <Link href="/blog/3d-printing-marketing-events" className="rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15">
                  Meer over events en maatwerk
                </Link>
              </div>
            </section>
          </Reveal>
        </div>
      </div>

      <BlogAuthorNote locale="nl" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(galleryJsonLd) }} />
    </article>
  )
}
