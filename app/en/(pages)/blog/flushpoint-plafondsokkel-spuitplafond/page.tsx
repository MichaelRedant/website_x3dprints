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
const nlCanonical = "https://www.x3dprints.be/blog/" + slug + "/"
const canonical = "https://www.x3dprints.be/en/blog/" + slug + "/"
const publishedDate = "2026-07-31"
const dateModified = "2026-07-31"
const heroImage = "/images/blog/flushpoint/01-akoestisch-spuitplafond-hanglamp-lichtpunt.webp"
const ogImage = "/images/blog/flushpoint/flushpoint-og.webp"
const contactHref =
  "/en/contact?material=petg&quote=FlushPoint%20-%20modular%20ceiling%20mount%20for%20an%20acoustic%20spray%20ceiling"

export const metadata: Metadata = {
  title: "Ceiling mount for acoustic spray ceiling | FlushPoint",
  description:
    "See how FlushPoint solved 60 modular ceiling mounts for pendant lights and recessed spots before an acoustic spray ceiling was applied. Read the case.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": nlCanonical,
      "en-BE": canonical,
      "x-default": nlCanonical,
    },
  },
  openGraph: {
    type: "article",
    title: "FlushPoint: modular mounts for an acoustic spray ceiling",
    description:
      "From a SketchUp concept to 60 modular PETG mounts for pendant lights, recessed spots and spare light points.",
    url: canonical,
    publishedTime: publishedDate,
    modifiedTime: dateModified,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "FlushPoint pendant light mounted in an acoustic spray ceiling",
      },
    ],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "FlushPoint: ceiling mount for an acoustic spray ceiling",
    description: "A real project with 60 modular ceiling mounts for pendant lights and recessed spots.",
    images: [ogImage],
  },
}

const tocItems = [
  { id: "problem", label: "Why did the spray ceiling require advance planning?" },
  { id: "concept", label: "How does the modular FlushPoint concept work?" },
  { id: "iteration", label: "Why was the design changed halfway through?" },
  { id: "half-turn", label: "How does the half-turn connection work?" },
  { id: "spring-clamp", label: "How was the spot spring-clamp issue solved?" },
  { id: "material", label: "Why was PETG selected?" },
  { id: "production", label: "How were production and site phases planned?" },
  { id: "result", label: "What was the final result?" },
  { id: "faq", label: "Frequently asked questions about FlushPoint" },
  { id: "sources", label: "Sources and project references" },
] as const

const systemRows = [
  {
    stage: "During spraying",
    module: "Temporary protective cap",
    purpose: "Keeps the opening and thread clear of spray plaster.",
  },
  {
    stage: "After finishing: pendant light",
    module: "Tall sleeve with cable strain relief",
    purpose: "Finishes the light point without hanging the lamp from the copper conductors.",
  },
  {
    stage: "After finishing: recessed spot",
    module: "Spot inside the extended base",
    purpose: "Lets the spring clamps grip while keeping the spot removable.",
  },
  {
    stage: "Unused light point",
    module: "Low reserve cover",
    purpose: "Closes the point while preserving the option to add a light later.",
  },
]

const processSteps = [
  {
    title: "1. Define the light points and constraints",
    body: "Position, opening, spray-layer thickness, luminaire type and installation space were fixed before the ceiling finish.",
  },
  {
    title: "2. Design one base with interchangeable modules",
    body: "The SketchUp concept became a printable system with a fixed flange, multi-start thread and application-specific tops.",
  },
  {
    title: "3. Test with the real luminaires",
    body: "Physical test prints revealed the required inner diameter, tolerance and base height for installation and maintenance.",
  },
  {
    title: "4. Produce the site-critical parts first",
    body: "All 60 bases and protective caps were delivered first so the spray contractor could start on schedule.",
  },
  {
    title: "5. Deliver the final modules after finishing",
    body: "Pendant-light sleeves and reserve covers followed once the final light distribution was known.",
  },
]

const faqItems = [
  {
    q: "What is FlushPoint by X3DPrints?",
    a: "FlushPoint is the project name for a modular 3D printed ceiling-mount system installed before an acoustic spray ceiling. The same prepared light point can later become a pendant light, recessed spot or spare point.",
  },
  {
    q: "Why should light points be prepared before an acoustic spray ceiling?",
    a: "Drilling, cutting or repairing after the seamless finish can remain visible. In this project, every position, opening and protective cap was therefore planned before spraying.",
  },
  {
    q: "Why was PETG used for the ceiling mounts?",
    a: "The real spot remained cool in the project test, while toughness, dimensional stability and long-term fit mattered most. PETG suited those tested conditions better than PLA. Every luminaire still requires its own validation.",
  },
  {
    q: "Can FlushPoint be used for every ceiling or luminaire?",
    a: "Not without adaptation. Diameter, layer thickness, temperature, clamp geometry, load path and electrical constraints vary. The modular principle transfers, but the dimensions must be checked per project.",
  },
  {
    q: "Can a spot or pendant light still be replaced later?",
    a: "Yes, that was a core requirement. The half-turn connection keeps the tops interchangeable, while the extended spot base prevents the spring clamps from locking behind the flange.",
  },
]

const references = [
  {
    label: "SketchUp Help — precise modelling with measurements",
    href: "https://help.sketchup.com/en/sketchup/measuring-angles-and-distances-model-precisely",
  },
  {
    label: "Prusa Knowledge Base — PETG",
    href: "https://help.prusa3d.com/article/petg_2059",
  },
  {
    label: "Acomo — Acoustic Spray System product sheet",
    href: "https://acomo-acoustics.com/wp-content/uploads/2025/09/Acomo_Acoustic-Spray-System-Productsheet.pdf",
  },
  {
    label: "Belgian FPS Economy — General Regulations on Electrical Installations",
    href: "https://economie.fgov.be/nl/publicaties/algemeen-reglement-op-de",
  },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "FlushPoint by X3DPrints: modular ceiling mounts for an acoustic spray ceiling",
  description:
    "Project case about 60 modular PETG ceiling mounts for pendant lights, recessed spots and spare points in an acoustic spray ceiling.",
  datePublished: publishedDate,
  dateModified,
  image: heroImage,
  inLanguage: "en-BE",
})

const faqJsonLd = buildFaqPageSchema({
  inLanguage: "en-BE",
  mainEntityOfPage: canonical,
  items: faqItems,
})

const howToJsonLd = buildHowToSchema({
  name: "Develop modular ceiling mounts for an acoustic spray ceiling",
  description:
    "From lighting plan and SketchUp concept to tested, phased ceiling-mount production for a seamless acoustic spray ceiling.",
  inLanguage: "en-BE",
  mainEntityOfPage: canonical,
  steps: processSteps.map((step, index) => ({
    name: step.title.replace(/^\d+\.\s*/, ""),
    text: step.body,
    url: canonical + "#" + (index < 3 ? "concept" : "production"),
  })),
  toolNames: ["SketchUp", "FDM 3D printer", "Test luminaire"],
  supplyNames: ["PETG filament", "Mounting screws", "Temporary protective caps"],
})

const breadcrumbJsonLd = buildBreadcrumbSchema({
  id: canonical + "#breadcrumb",
  inLanguage: "en-BE",
  items: [
    { name: "X3DPrints", url: "https://www.x3dprints.be/en/" },
    { name: "Knowledge base", url: "https://www.x3dprints.be/en/blog/" },
    { name: "FlushPoint ceiling mount", url: canonical },
  ],
})

type FigureProps = {
  src: string
  alt: string
  caption: string
  width: number
  height: number
  sizes?: string
  priority?: boolean
}

function ProjectFigure({
  src,
  alt,
  caption,
  width,
  height,
  sizes = "(min-width: 1024px) 896px, calc(100vw - 48px)",
  priority = false,
}: FigureProps) {
  return (
    <figure className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 shadow-sm dark:border-slate-700/70 dark:bg-slate-950/75">
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

export default function FlushPointEnglishArticlePage() {
  return (
    <>
      <main className="relative overflow-hidden px-6 pb-20 pt-16 sm:px-8 lg:px-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(130%_60%_at_50%_0%,rgba(14,165,233,.16),transparent_72%)]"
        />
        <article className="mx-auto max-w-5xl">
          <header className="space-y-6">
            <nav aria-label="Breadcrumb" className="text-sm text-slate-600 dark:text-slate-300">
              <ol className="flex flex-wrap items-center gap-2">
                <li><Link href="/en" className="font-medium text-indigo-600 dark:text-indigo-300">Home</Link></li>
                <li aria-hidden>/</li>
                <li><Link href="/en/blog" className="font-medium text-indigo-600 dark:text-indigo-300">Knowledge base</Link></li>
                <li aria-hidden>/</li>
                <li aria-current="page" className="font-medium text-slate-700 dark:text-slate-200">FlushPoint</li>
              </ol>
            </nav>

            <div className="max-w-4xl space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-700 dark:text-sky-300">
                Featured project · Munte (Merelbeke), Belgium
              </p>
              <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                FlushPoint by X3DPrints: modular ceiling mounts for an acoustic spray ceiling
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                FlushPoint makes lighting in an acoustic spray ceiling predictable before finishing and interchangeable afterwards, using one 3D printed base for three outcomes.
              </p>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                For this new-build home, 60 ceiling mounts were designed, tested and produced in two site phases. The client supplied the concept; X3DPrints turned it into a printable, installable system.
              </p>
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
                Published and last updated: July 31, 2026 · Reading time: about 9 minutes
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { value: "60", label: "ceiling mounts" },
                { value: "3", label: "final configurations" },
                { value: "½ turn", label: "to change a module" },
              ].map((stat) => (
                <GlassCard key={stat.label} className="p-5">
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-50">{stat.value}</p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{stat.label}</p>
                </GlassCard>
              ))}
            </div>

            <ProjectFigure
              src={heroImage}
              alt="Finished pendant light mounted with FlushPoint in an acoustic spray ceiling"
              caption="The finished result: a pendant light on a pre-installed point, without a wide cover plate or a new hole in the finished spray ceiling."
              width={2000}
              height={1170}
              sizes="(min-width: 1024px) 1024px, calc(100vw - 48px)"
              priority
            />

            <div className="flex flex-wrap gap-3">
              <ShimmerButton
                href={contactHref}
                event={{ action: "cta_click", category: "flushpoint_case_en_top", label: "project_intake" }}
              >
                Discuss a similar project
              </ShimmerButton>
              <Link
                href="/en/3d-modelleren"
                className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              >
                Explore 3D modelling
              </Link>
            </div>
          </header>

          <ContentTableOfContents items={tocItems} title="In this article" className="mt-10" />

          <div className="mt-12 space-y-16">
            <section id="problem" className="scroll-mt-28">
              <Reveal>
                <div className="max-w-3xl space-y-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-700 dark:text-sky-300">The challenge</p>
                  <h2 className="text-balance text-3xl font-bold text-slate-900 dark:text-slate-50">
                    Why did lighting in an acoustic spray ceiling require advance planning?
                  </h2>
                  <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                    The home uses acoustic spray plaster as its visible ceiling finish: in this project, roughly 35 millimetres of cellulose fibre applied directly to OSB. The seamless surface improves the room acoustics but makes later drilling, cutting and invisible repair difficult.
                  </p>
                  <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                    Every light point therefore had to be positioned before the spray contractor arrived and protected throughout the application. The client had already drawn a basic answer in SketchUp. X3DPrints had to make it fit, assemble quickly above head height and scale to 60 pieces.
                  </p>
                </div>
              </Reveal>
            </section>

            <section id="concept" className="scroll-mt-28 space-y-8">
              <Reveal>
                <div className="max-w-3xl space-y-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-700 dark:text-sky-300">The concept</p>
                  <h2 className="text-balance text-3xl font-bold text-slate-900 dark:text-slate-50">
                    How does the modular FlushPoint ceiling system work?
                  </h2>
                  <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                    Instead of designing three separate fittings, the system uses one fixed ceiling base with interchangeable tops. The hole, flange and fastening stay identical, while the final choice can wait until after spraying.
                  </p>
                </div>
              </Reveal>

              <ProjectFigure
                src="/images/blog/flushpoint/02-concept-plafondsokkel-sketchup-maten.webp"
                alt="SketchUp concept for FlushPoint with dimensions for the base, cover and pendant module"
                caption="The client's revised SketchUp concept: a 100 mm flange and 46 mm internal diameter."
                width={1279}
                height={355}
              />

              <Reveal>
                <div className="overflow-x-auto rounded-3xl border border-slate-200/80 bg-white/85 shadow-sm dark:border-slate-700/70 dark:bg-slate-950/75">
                  <table className="min-w-full text-left text-sm text-slate-700 dark:text-slate-300">
                    <caption className="sr-only">FlushPoint modules by project stage and application</caption>
                    <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-900 dark:text-slate-400">
                      <tr>
                        <th scope="col" className="px-5 py-4">Stage</th>
                        <th scope="col" className="px-5 py-4">Module</th>
                        <th scope="col" className="px-5 py-4">Purpose</th>
                      </tr>
                    </thead>
                    <tbody>
                      {systemRows.map((row) => (
                        <tr key={row.stage} className="border-t border-slate-200/70 dark:border-slate-700/70">
                          <th scope="row" className="px-5 py-4 font-semibold text-slate-900 dark:text-slate-100">{row.stage}</th>
                          <td className="px-5 py-4">{row.module}</td>
                          <td className="px-5 py-4">{row.purpose}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Reveal>

              <div className="grid gap-6 md:grid-cols-3">
                <ProjectFigure
                  src="/images/blog/flushpoint/04-plafondsokkel-verlengde-variant-inbouwspot.webp"
                  alt="Extended white FlushPoint base for a recessed spot"
                  caption="Extended base for recessed spots."
                  width={1400}
                  height={1050}
                  sizes="(min-width: 768px) 30vw, calc(100vw - 48px)"
                />
                <ProjectFigure
                  src="/images/blog/flushpoint/07-opzetstuk-hanglamp-met-trekontlasting.webp"
                  alt="Black FlushPoint pendant-light sleeve with printed strain relief"
                  caption="Pendant module with printed strain relief."
                  width={1400}
                  height={933}
                  sizes="(min-width: 768px) 30vw, calc(100vw - 48px)"
                />
                <ProjectFigure
                  src="/images/blog/flushpoint/08-spuitkap-tijdelijke-afdekking.webp"
                  alt="Red temporary protective cap for a FlushPoint ceiling mount"
                  caption="Temporary cap used during spraying."
                  width={1400}
                  height={1050}
                  sizes="(min-width: 768px) 30vw, calc(100vw - 48px)"
                />
              </div>
            </section>

            <section id="iteration" className="scroll-mt-28">
              <Reveal>
                <GlassCard className="p-7 sm:p-9">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-700 dark:text-amber-300">Iterate before production</p>
                  <h2 className="mt-3 text-balance text-3xl font-bold text-slate-900 dark:text-slate-50">
                    Why was the design changed halfway through?
                  </h2>
                  <div className="mt-5 space-y-4 leading-relaxed text-slate-700 dark:text-slate-300">
                    <p>
                      The first 76 mm internal diameter looked too bulky once the client tested a real downlight. A smaller spot needed a 44 mm cut-out, so the complete base was rebuilt around a 46 mm internal diameter.
                    </p>
                    <p>
                      In moulded production that change could have invalidated expensive tooling. Here it required one evening of redesign and one new test print. The geometry stayed flexible until series production began.
                    </p>
                  </div>
                </GlassCard>
              </Reveal>
            </section>

            <section id="half-turn" className="scroll-mt-28 space-y-8">
              <Reveal>
                <div className="max-w-3xl space-y-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-700 dark:text-sky-300">Installation logic</p>
                  <h2 className="text-balance text-3xl font-bold text-slate-900 dark:text-slate-50">
                    How does a multi-start thread make half a turn enough?
                  </h2>
                  <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                    A coarse multi-start thread lets several thread paths engage at once. The module is fully seated after roughly half a turn: faster across 60 overhead installations and safer for a pendant cable that cannot keep twisting.
                  </p>
                  <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                    Test prints balanced the thread clearance. It had to tolerate a fibre or trace of spray plaster without becoming loose, tilted or noisy.
                  </p>
                </div>
              </Reveal>
              <ProjectFigure
                src="/images/blog/flushpoint/03-plafondsokkel-basis-meergangige-schroefdraad.webp"
                alt="Close-up of a white 3D printed ceiling mount with multi-start thread"
                caption="The visible multi-start thread. Printing the flange flat and thread axis vertical removed the need for supports."
                width={1400}
                height={1050}
              />
            </section>

            <section id="spring-clamp" className="scroll-mt-28 space-y-8">
              <Reveal>
                <div className="max-w-3xl space-y-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-700 dark:text-sky-300">Testing real hardware</p>
                  <h2 className="text-balance text-3xl font-bold text-slate-900 dark:text-slate-50">
                    How was the recessed-spot spring-clamp issue solved?
                  </h2>
                  <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                    The fit looked correct in CAD, but the physical spot&apos;s black spring clamps hooked behind the flange. The spot stayed in place, yet could no longer be removed from below without damage.
                  </p>
                  <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                    Extending the base about three centimetres above the flange gave the springs a smooth cylindrical wall to press against. The spot still clamps securely but remains removable. This produced two base variants: short for pendant lights and extended for spots.
                  </p>
                </div>
              </Reveal>
              <div className="grid items-start gap-6 lg:grid-cols-2">
                <ProjectFigure
                  src="/images/blog/flushpoint/05-vergelijking-korte-en-verlengde-sokkel.webp"
                  alt="Comparison of the short and extended FlushPoint ceiling-mount bases"
                  caption="Short pendant-light base on the left; extended spot base on the right."
                  width={1092}
                  height={263}
                  sizes="(min-width: 1024px) 480px, calc(100vw - 48px)"
                />
                <ProjectFigure
                  src="/images/blog/flushpoint/06-testopstelling-inbouwspot-veerklemmen.webp"
                  alt="Recessed-spot test setup in a white mount with black spring clamps"
                  caption="The real test setup exposed where the spring clamps could lock behind the flange."
                  width={1600}
                  height={1150}
                  sizes="(min-width: 1024px) 480px, calc(100vw - 48px)"
                />
              </div>
            </section>

            <section id="material" className="scroll-mt-28">
              <Reveal>
                <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
                  <div className="space-y-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-700 dark:text-sky-300">Material and colour</p>
                    <h2 className="text-balance text-3xl font-bold text-slate-900 dark:text-slate-50">
                      Why was PETG selected for the ceiling mounts?
                    </h2>
                    <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                      The client ran the chosen spot for several hours in a test piece. It stayed cool, so toughness and dimensional stability mattered more here than extreme heat resistance. PETG matched those project conditions.
                    </p>
                    <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                      A ceiling sample was compared with a white test print instead of choosing colour from a screen. The visible pendant sleeves were produced in both black and white so the final choice could be made on site.
                    </p>
                  </div>
                  <GlassCard className="h-fit border-amber-200/80 bg-amber-50/80 p-6 dark:border-amber-300/20 dark:bg-amber-400/10">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-800 dark:text-amber-200">Project boundary</p>
                    <p className="mt-3 text-sm leading-relaxed text-amber-950 dark:text-amber-100">
                      This case is not universal material approval for luminaires. Temperature, fire behaviour, load path and electrical work must be assessed per project. Electrical installation and inspection must follow the applicable rules.
                    </p>
                    <Link href="/en/materials/petg" className="mt-4 inline-flex text-sm font-semibold text-amber-900 underline underline-offset-4 dark:text-amber-100">
                      Explore PETG for functional parts
                    </Link>
                  </GlassCard>
                </div>
              </Reveal>
            </section>

            <section id="production" className="scroll-mt-28 space-y-8">
              <Reveal>
                <div className="max-w-3xl space-y-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-700 dark:text-sky-300">Series production</p>
                  <h2 className="text-balance text-3xl font-bold text-slate-900 dark:text-slate-50">
                    How were 60 ceiling mounts produced without supports?
                  </h2>
                  <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                    Every base was oriented with the flange flat and thread axis vertical. The thread grows as concentric layers and needs no support material, saving print time and avoiding difficult cleanup inside a functional thread.
                  </p>
                </div>
              </Reveal>
              <ProjectFigure
                src="/images/blog/flushpoint/09-printbed-serie-plafondsokkels.webp"
                alt="Slicer view of FlushPoint bases, covers and pendant modules on a 3D printer bed"
                caption="The production set in the slicer: base variants, reserve covers and tall pendant module with strain relief."
                width={1045}
                height={792}
              />
              <Reveal>
                <div className="max-w-3xl space-y-5">
                  <h2 className="text-balance text-3xl font-bold text-slate-900 dark:text-slate-50">
                    Why was the order split into two site phases?
                  </h2>
                  <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                    All 60 bases and temporary caps were needed first because the spray contractor could not start without them. The 30 pendant modules and reserve covers followed one or two months later, after the final distribution of luminaires was known.
                  </p>
                </div>
              </Reveal>
              <ProjectFigure
                src="/images/blog/flushpoint/10-plafondsokkels-osb-plafond-voor-spuiten.webp"
                alt="OSB ceiling with installed FlushPoint mounts and coloured protective caps before spraying"
                caption="Site phase one: coloured temporary caps make every light point easy to find before the acoustic spray finish."
                width={2000}
                height={1125}
              />
              <Reveal>
                <GlassCard className="p-7 sm:p-9">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-700 dark:text-sky-300">Five-step workflow</p>
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

            <section id="result" className="scroll-mt-28">
              <Reveal>
                <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
                  <div className="space-y-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-700 dark:text-emerald-300">The result</p>
                    <h2 className="text-balance text-3xl font-bold text-slate-900 dark:text-slate-50">
                      A light point that was ready before the plaster
                    </h2>
                    <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                      After spraying, the temporary caps came off and the final modules went on. The pendant light in the opening image meets the acoustic ceiling without a broad cover ring, visible repair or new drilling.
                    </p>
                    <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                      FlushPoint&apos;s value sits in tolerance, print orientation, interchangeability and site sequence rather than a complicated shape. Decisions stayed open until the information needed to make them was available.
                    </p>
                  </div>
                  <GlassCard className="h-fit p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Project proof</p>
                    <dl className="mt-4 space-y-4 text-sm">
                      <div><dt className="font-semibold text-slate-900 dark:text-slate-100">Location</dt><dd className="mt-1 text-slate-600 dark:text-slate-300">New-build home in Munte, Merelbeke</dd></div>
                      <div><dt className="font-semibold text-slate-900 dark:text-slate-100">Scope</dt><dd className="mt-1 text-slate-600 dark:text-slate-300">60 bases, protective caps and final modules</dd></div>
                      <div><dt className="font-semibold text-slate-900 dark:text-slate-100">Workflow</dt><dd className="mt-1 text-slate-600 dark:text-slate-300">Concept → redesign → test prints → site phase → finish</dd></div>
                      <div><dt className="font-semibold text-slate-900 dark:text-slate-100">Production</dt><dd className="mt-1 text-slate-600 dark:text-slate-300">Designed and 3D printed by X3DPrints in Herzele</dd></div>
                    </dl>
                  </GlassCard>
                </div>
              </Reveal>
            </section>

            <section id="faq" className="scroll-mt-28">
              <Reveal>
                <h2 className="text-balance text-3xl font-bold text-slate-900 dark:text-slate-50">
                  Frequently asked questions about FlushPoint and spray-ceiling mounts
                </h2>
                <div className="mt-6"><Faq items={faqItems} /></div>
              </Reveal>
            </section>

            <section id="sources" className="scroll-mt-28">
              <Reveal>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Sources and project references</h2>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  Project dimensions and test results come from the client workflow and X3DPrints production records. These primary sources add context for modelling, material, acoustic spraying and electrical safety.
                </p>
                <ul className="mt-5 grid gap-3">
                  {references.map((reference) => (
                    <li key={reference.href} className="rounded-2xl border border-slate-200/70 bg-white/80 px-5 py-4 dark:border-slate-700/70 dark:bg-slate-950/75">
                      <cite className="not-italic">
                        <Link href={reference.href} target="_blank" rel="noreferrer" className="font-semibold text-indigo-600 underline underline-offset-4 dark:text-indigo-300">
                          {reference.label}
                        </Link>
                      </cite>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </section>

            <section aria-labelledby="flushpoint-en-cta-title">
              <Reveal>
                <GlassCard className="border-sky-200/80 bg-sky-50/80 p-8 dark:border-sky-300/20 dark:bg-sky-400/10 sm:p-10">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-700 dark:text-sky-300">From construction detail to working part</p>
                  <h2 id="flushpoint-en-cta-title" className="mt-3 text-balance text-3xl font-bold text-slate-900 dark:text-slate-50">
                    Have a similar light point, ceiling or mounting detail?
                  </h2>
                  <p className="mt-4 max-w-3xl leading-relaxed text-slate-700 dark:text-slate-300">
                    Send a sketch, photo, key dimensions and information about the actual luminaire. You will receive an honest first assessment of design, testing, material and production.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <ShimmerButton
                      href={contactHref}
                      event={{ action: "cta_click", category: "flushpoint_case_en_bottom", label: "project_intake" }}
                    >
                      Request a first project assessment
                    </ShimmerButton>
                    <Link
                      href="/en/portfolio"
                      className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    >
                      View more custom work
                    </Link>
                  </div>
                </GlassCard>
              </Reveal>
            </section>

            <BlogReadMore />
          </div>
        </article>
      </main>

      <BlogAuthorNote locale="en" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </>
  )
}
