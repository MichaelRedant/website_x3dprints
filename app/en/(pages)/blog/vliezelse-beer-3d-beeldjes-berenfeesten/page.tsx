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
const nlCanonical = `https://www.x3dprints.be/blog/${slug}/`
const canonical = `https://www.x3dprints.be/en/blog/${slug}/`
const datePublished = "2026-07-31"
const dateModified = "2026-07-31"
const imageBase = "/images/blog/berenfeesten-vlierzele"
const originalImage = `${imageBase}/berenfeesten-vlierzele-origineel-standbeeld.webp`
const modelImage = `${imageBase}/berenfeesten-vlierzele-3d-model-printvoorbereiding.webp`
const resultImage = `${imageBase}/berenfeesten-vlierzele-geprinte-beeldjes.webp`
const ogImage = `${imageBase}/vliezelse-bear-3d-figurines-og.webp`
const contactHref =
  "/en/contact?material=PLA%20Silk%2B&quote=Turn%20a%20statue%20or%20mascot%20into%20a%203D%20figurine"

export const metadata: Metadata = {
  title: "Statue to 3D figurine | Berenfeesten Vlierzele",
  description:
    "See how the Vliezelse bear became 3D printed event figurines through ChatGPT, Hitem3D, model cleanup and one-piece production.",
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
    title: "The Vliezelse bear: from photographs to 3D figurines",
    description:
      "A project case about AI-assisted model creation, print preparation and bronze-look figurines for the Berenfeesten in Vlierzele.",
    url: canonical,
    publishedTime: datePublished,
    modifiedTime: dateModified,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Bronze-look 3D printed Vliezelse bear figurines for the Berenfeesten",
      },
    ],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Vliezelse bear: from photographs to 3D figurines",
    description:
      "How four photographs, ChatGPT, Hitem3D and technical print preparation produced a small series without glued joints.",
    images: [ogImage],
  },
}

const tocItems = [
  { id: "brief", label: "Why was the local statue miniaturised?" },
  { id: "workflow", label: "How did four photographs become a 3D model?" },
  { id: "print-ready", label: "Why was the AI model not immediately printable?" },
  { id: "one-piece", label: "How was the figurine printed in one piece?" },
  { id: "material", label: "Why use bronze-look PLA Silk+?" },
  { id: "result", label: "What was produced for the Berenfeesten?" },
  { id: "suitable", label: "Which projects suit this approach?" },
  { id: "faq", label: "Frequently asked questions" },
  { id: "sources", label: "Sources and project references" },
] as const

const workflowRows = [
  {
    phase: "Source material",
    input: "Four photographs of the original statue",
    output: "Visual references for pose, proportions and visible details",
  },
  {
    phase: "Image preparation",
    input: "ChatGPT Images",
    output: "One clear, 3D-friendly reference image",
  },
  {
    phase: "Image to 3D",
    input: "Hitem3D",
    output: "An initial digital mesh used as a technical starting point",
  },
  {
    phase: "Print preparation",
    input: "Model checks, scaling, supports and slicing",
    output: "Printable 15 cm and 30 cm versions",
  },
  {
    phase: "Production",
    input: "Bronze-look PLA Silk+ and two plinth finishes",
    output: "A controlled small series printed in one piece",
  },
] as const

const howToSteps = [
  {
    name: "Collect useful photographs",
    text: "Photograph the subject sharply from several angles. Four photographs were available for this project; other shapes may require additional views.",
    url: `${canonical}#workflow`,
  },
  {
    name: "Prepare a clear reference image",
    text: "Combine the visible form, pose and details into a clean reference. ChatGPT Images was used for image preparation, not to generate the 3D model itself.",
    url: `${canonical}#workflow`,
  },
  {
    name: "Generate an initial 3D model",
    text: "Hitem3D converted the prepared reference into a first mesh. This was a starting point and still required technical validation.",
    url: `${canonical}#print-ready`,
  },
  {
    name: "Make the geometry printable",
    text: "Check watertight geometry, thin details, scale, stability, support zones and the connection to the plinth.",
    url: `${canonical}#print-ready`,
  },
  {
    name: "Validate with a test print",
    text: "Print a test piece and inspect recognisability, supports, visible surfaces and material sheen before starting the series.",
    url: `${canonical}#one-piece`,
  },
] as const

const faqItems = [
  {
    q: "Can a 3D figurine be made from photographs?",
    a: "Yes, when the form is visible enough and the expected accuracy is realistic. Image-to-3D generally creates a starting model. Technical checks and cleanup remain necessary before the file can be printed reliably.",
  },
  {
    q: "Was the Vliezelse bear physically 3D scanned?",
    a: "No. This case started from four photographs. ChatGPT was used to prepare a 3D-friendly reference image and Hitem3D created the initial 3D model. No laser scan or physical scan of the statue was made.",
  },
  {
    q: "Why can an AI-generated 3D model not be printed immediately?",
    a: "AI may misinterpret hidden details and does not automatically produce closed, strong or stable geometry. Wall thicknesses, loose surfaces, scale, supports, contact with the plinth and fragile features must be checked first.",
  },
  {
    q: "Why were the bear, child and plinth not printed separately?",
    a: "Printing the complete object in one piece avoids visible glue lines and joints that may come loose. Orientation and supports therefore needed careful testing, especially around the raised arm and the child on the shoulders.",
  },
  {
    q: "Can X3DPrints also produce a mascot or keepsake as a small series?",
    a: "Yes, after checking the source material, reproduction rights, intended size and level of detail. The process starts with a digital model and test print; production begins after approval.",
  },
] as const

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "The Vliezelse bear in miniature: from photographs to 3D figurines for the Berenfeesten",
  description:
    "Project case about ChatGPT, Hitem3D, technical print preparation and bronze-look 3D figurines for the Berenfeesten in Vlierzele.",
  datePublished,
  dateModified,
  image: [ogImage, resultImage, modelImage, originalImage],
  inLanguage: "en-BE",
})

const faqJsonLd = buildFaqPageSchema({
  inLanguage: "en-BE",
  mainEntityOfPage: canonical,
  items: [...faqItems],
})

const howToJsonLd = buildHowToSchema({
  name: "How to turn photographs into a printable 3D figurine",
  description:
    "The workflow used for the Vliezelse bear: source photographs, image preparation, image-to-3D, technical model checks and a test print.",
  steps: [...howToSteps],
  inLanguage: "en-BE",
  mainEntityOfPage: canonical,
  toolNames: ["ChatGPT Images", "Hitem3D", "3D slicer"],
  supplyNames: ["Bronze-look PLA Silk+", "Filament for the plinth"],
  url: `${canonical}#workflow`,
})

const breadcrumbJsonLd = buildBreadcrumbSchema({
  id: `${canonical}#breadcrumb`,
  inLanguage: "en-BE",
  items: [
    { name: "Home", url: "https://www.x3dprints.be/en/" },
    { name: "Blog and knowledge base", url: "https://www.x3dprints.be/en/blog/" },
    { name: "Vliezelse bear 3D figurines", url: canonical },
  ],
})

const galleryImages = [
  buildImageObjectSchema({
    url: resultImage,
    caption: "Bronze-look 3D printed figurines for the Berenfeesten in Vlierzele",
    description: "Finished Vliezelse bear figurines in bronze-look PLA Silk+.",
    inLanguage: "en-BE",
    creditText: "X3DPrints",
    representativeOfPage: true,
  }),
  buildImageObjectSchema({
    url: modelImage,
    caption: "Print preparation of the Vliezelse bear in two sizes",
    description: "The 15 cm and 30 cm digital models in the slicer.",
    inLanguage: "en-BE",
    creditText: "X3DPrints",
  }),
  buildImageObjectSchema({
    url: originalImage,
    caption: "The original 't VlieZLs Beerke statue in Vlierzele",
    description: "Reference photograph of the standing bear with a child on its shoulders.",
    inLanguage: "en-BE",
    creditText: "Berenfeesten project reference",
  }),
]

const galleryJsonLd = buildImageGallerySchema({
  name: "From the Vliezelse statue to 3D printed figurines",
  description: "Project images of the original statue, digital print preparation and finished result.",
  url: `${canonical}#result`,
  images: galleryImages,
  inLanguage: "en-BE",
})

export default function VliezelseBearArticlePage() {
  return (
    <article className="relative overflow-hidden px-4 pb-24 pt-10 sm:px-6 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(145deg,#fffaf0_0%,#ffffff_40%,#f5eee5_100%)] dark:bg-[linear-gradient(145deg,#111827_0%,#0f172a_48%,#1c1917_100%)]" />
        <div className="absolute -left-24 top-24 h-96 w-96 rounded-full bg-amber-300/20 blur-[130px] dark:bg-amber-500/10" />
        <div className="absolute -right-24 top-[32rem] h-[28rem] w-[28rem] rounded-full bg-orange-300/20 blur-[150px] dark:bg-orange-500/10" />
      </div>

      <div className="mx-auto max-w-6xl">
        <nav aria-label="Breadcrumb" className="text-sm text-slate-600 dark:text-slate-300">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/en" className="underline underline-offset-4">Home</Link></li>
            <li aria-hidden>/</li>
            <li><Link href="/en/blog" className="underline underline-offset-4">Blog</Link></li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="font-medium text-slate-900 dark:text-slate-100">Berenfeesten case</li>
          </ol>
        </nav>

        <header className="mt-7 grid gap-8 lg:grid-cols-[0.94fr_1.06fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-700 dark:text-amber-300">
              Project case | Vlierzele, Belgium
            </p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl dark:text-white">
              The Vliezelse bear in miniature: from photograph to 3D figurine
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700 dark:text-slate-300">
              For the Berenfeesten, the local &lsquo;t VlieZLs Beerke statue became a series of bronze-look figurines.
              Four photographs provided the basis for an AI-assisted 3D model. X3DPrints made that model printable and
              produced the bear, child and plinth without glued joints.
            </p>
            <p className="mt-4 text-sm font-medium text-slate-500 dark:text-slate-400">
              Published and last updated on 31 July 2026 | Reading time: about 8 minutes
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ShimmerButton href={contactHref}>Discuss a figurine project</ShimmerButton>
              <Link
                href="/en/3d-modelleren"
                className="inline-flex items-center rounded-full border border-amber-300/70 bg-white/85 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white dark:border-amber-300/30 dark:bg-slate-900/80 dark:text-slate-100"
              >
                Explore 3D modelling
              </Link>
            </div>
          </div>

          <figure className="overflow-hidden rounded-[2rem] border border-white/60 bg-white/70 shadow-[0_24px_80px_rgba(120,53,15,0.18)] dark:border-slate-700/70 dark:bg-slate-900/70">
            <Image
              src={resultImage}
              alt="A series of bronze-look 3D printed Vliezelse bear figurines"
              width={1434}
              height={1793}
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="aspect-[4/5] h-auto w-full object-cover"
              priority
            />
            <figcaption className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">
              Finished figurines in bronze-look PLA Silk+, ready for the Berenfeesten.
            </figcaption>
          </figure>
        </header>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            ["4", "source photographs of the statue"],
            ["2", "sizes: 15 cm and 30 cm"],
            ["1", "piece without glued joints"],
          ].map(([value, label]) => (
            <GlassCard key={label} className="p-5 text-center">
              <p className="text-3xl font-black text-amber-700 dark:text-amber-300">{value}</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{label}</p>
            </GlassCard>
          ))}
        </div>

        <ContentTableOfContents items={tocItems} title="In this article" className="mx-auto mt-10 max-w-4xl" />

        <div className="mx-auto mt-12 max-w-5xl space-y-8">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <section id="brief" className="scroll-mt-28">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700 dark:text-amber-300">The brief</p>
                <h2 className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">
                  Why was the local statue miniaturised for the Berenfeesten?
                </h2>
                <div className="mt-5 grid gap-6 md:grid-cols-[1fr_239px] md:items-center">
                  <div className="space-y-4 text-base leading-7 text-slate-700 dark:text-slate-300">
                    <p>
                      The statue near the church in Vlierzele shows a standing bear with a child on its shoulders. The
                      organisers wanted that recognisable local figure as a physical keepsake, but no CAD file or usable
                      3D model existed.
                    </p>
                    <p>
                      Traditional <Link href="/en/3d-modelleren" className="font-semibold text-amber-700 underline underline-offset-4 dark:text-amber-300">3D modelling</Link> from
                      scratch was possible, but the available photographs offered a faster route to the first organic
                      shape. AI supplied the model basis; X3DPrints remained responsible for checking, correcting,
                      scaling, supporting and testing it.
                    </p>
                  </div>
                  <figure className="mx-auto max-w-[239px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md dark:border-slate-700 dark:bg-slate-900">
                    <Image
                      src={originalImage}
                      alt="Original 't VlieZLs Beerke statue in Vlierzele"
                      width={239}
                      height={402}
                      sizes="239px"
                      className="h-auto w-full"
                    />
                    <figcaption className="p-3 text-xs text-slate-500 dark:text-slate-400">The original statue.</figcaption>
                  </figure>
                </div>
              </section>
            </GlassCard>
          </Reveal>

          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <section id="workflow" className="scroll-mt-28">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700 dark:text-amber-300">From 2D to 3D</p>
                <h2 className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">
                  How did four photographs become a 3D model?
                </h2>
                <p className="mt-4 text-base leading-7 text-slate-700 dark:text-slate-300">
                  ChatGPT Images was used to turn the source material into a clean, 3D-friendly reference. Hitem3D then
                  converted that prepared image into an initial mesh. The tools had different roles: ChatGPT prepared
                  the visual input, while Hitem3D generated the starting geometry.
                </p>
                <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
                  <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                    <caption className="sr-only">Workflow from source photograph to finished 3D figurine</caption>
                    <thead className="bg-amber-50 text-slate-900 dark:bg-amber-400/10 dark:text-slate-100">
                      <tr>
                        <th className="px-4 py-3 font-semibold">Stage</th>
                        <th className="px-4 py-3 font-semibold">Input or tool</th>
                        <th className="px-4 py-3 font-semibold">Result</th>
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
                  This route suited this project. A dimensionally critical replacement part usually calls for CAD
                  reconstruction or a physical <Link href="/en/3d-scannen" className="font-semibold text-amber-700 underline underline-offset-4 dark:text-amber-300">3D scan</Link>.
                </p>
              </section>
            </GlassCard>
          </Reveal>

          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <section id="print-ready" className="scroll-mt-28">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700 dark:text-amber-300">Technical validation</p>
                <h2 className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">
                  Why was the AI-generated model not immediately printable?
                </h2>
                <p className="mt-4 text-base leading-7 text-slate-700 dark:text-slate-300">
                  Image-to-3D can produce a recognisable shape, but it has to interpret hidden areas. A model that looks
                  convincing on screen may still contain holes, thin details or an unstable base. The raised arm, scarf,
                  legs and transition to the plinth therefore received extra attention.
                </p>
                <div className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                  <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md dark:border-slate-700 dark:bg-slate-900">
                    <Image
                      src={modelImage}
                      alt="Digital Vliezelse bear models at 15 and 30 centimetres in the slicer"
                      width={1132}
                      height={1432}
                      sizes="(max-width: 1024px) 100vw, 54vw"
                      className="h-auto w-full"
                    />
                    <figcaption className="p-4 text-sm text-slate-500 dark:text-slate-400">
                      The two scale versions during print preparation.
                    </figcaption>
                  </figure>
                  <ol className="space-y-3">
                    {howToSteps.map((step, index) => (
                      <li key={step.name} className="rounded-2xl border border-amber-200/70 bg-amber-50/70 p-4 dark:border-amber-300/20 dark:bg-amber-400/5">
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700 dark:text-amber-300">Step {index + 1}</p>
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
                <section id="one-piece" className="scroll-mt-28">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700 dark:text-amber-300">No glue lines</p>
                  <h2 className="mt-3 text-2xl font-bold text-slate-950 dark:text-white">
                    How was the figurine printed in one piece?
                  </h2>
                  <p className="mt-4 leading-7 text-slate-700 dark:text-slate-300">
                    The bear, child and plinth had to remain connected. This removes seams and loose joints, but makes
                    support planning more demanding. A test print was inspected before the small series started.
                  </p>
                  <Link href="/en/blog/3d-print-ontwerp-checklist" className="mt-4 inline-flex font-semibold text-amber-700 underline underline-offset-4 dark:text-amber-300">
                    Read the design-for-3D-printing checklist
                  </Link>
                </section>
              </GlassCard>
            </Reveal>

            <Reveal>
              <GlassCard className="h-full p-6 sm:p-8">
                <section id="material" className="scroll-mt-28">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700 dark:text-amber-300">Material choice</p>
                  <h2 className="mt-3 text-2xl font-bold text-slate-950 dark:text-white">
                    Why use bronze-look PLA Silk+?
                  </h2>
                  <p className="mt-4 leading-7 text-slate-700 dark:text-slate-300">
                    The silk sheen gives the bear a warm bronze appearance without paint. That same sheen makes layer
                    lines and support marks more visible, so orientation and cleanup matter more than with matte PLA.
                    The plinth was made in both a marble-look and a darker grey finish.
                  </p>
                  <Link href="/en/materials/pla-silk" className="mt-4 inline-flex font-semibold text-amber-700 underline underline-offset-4 dark:text-amber-300">
                    Read the PLA Silk+ material guide
                  </Link>
                </section>
              </GlassCard>
            </Reveal>
          </div>

          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <section id="result" className="scroll-mt-28">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700 dark:text-amber-300">The result</p>
                <h2 className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">
                  What was produced for the Berenfeesten?
                </h2>
                <div className="mt-5 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                  <div className="space-y-4 text-base leading-7 text-slate-700 dark:text-slate-300">
                    <p>
                      The Vliezelse bear was produced at 15 cm and 30 cm. The first round used a marble-look plinth;
                      later figurines received a darker grey plinth. The bear remained bronze-look in both versions.
                    </p>
                    <p>
                      The exact quantity is deliberately not published. The useful lesson is the production route:
                      an initial digital model, technical corrections and a test print, followed by a repeatable small
                      series after approval.
                    </p>
                    <div className="flex flex-wrap gap-3 pt-2">
                      <Link href="/en/portfolio" className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">View the portfolio</Link>
                      <Link href="/en/pricing" className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">Pricing and calculator</Link>
                    </div>
                  </div>
                  <Image
                    src={resultImage}
                    alt="Finished series of Vliezelse bear 3D figurines for the Berenfeesten"
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
              <section id="suitable" className="scroll-mt-28">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700 dark:text-amber-300">Other applications</p>
                <h2 className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">
                  When does image-to-3D work for a statue, mascot or keepsake?
                </h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {[
                    "No usable 3D file exists for the subject.",
                    "Visual recognition matters more than dimensional metrology.",
                    "You want one test figurine followed by a limited series.",
                    "Size, colour or plinth finish may change between orders.",
                  ].map((item) => (
                    <div key={item} className="rounded-2xl border border-amber-200/70 bg-white/75 p-4 text-sm leading-6 text-slate-700 dark:border-amber-300/20 dark:bg-slate-950/50 dark:text-slate-300">
                      {item}
                    </div>
                  ))}
                </div>
                <p className="mt-5 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  For artworks, brands and existing designs, the client must be able to confirm the necessary use and
                  reproduction rights. X3DPrints assesses technical feasibility, not legal ownership of the source work.
                </p>
              </section>
            </GlassCard>
          </Reveal>

          <section id="faq" className="scroll-mt-28">
            <Faq items={[...faqItems]} title="Frequently asked questions about making figurines from photographs" />
          </section>

          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <section id="sources" className="scroll-mt-28">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700 dark:text-amber-300">Sources</p>
                <h2 className="mt-3 text-2xl font-bold text-slate-950 dark:text-white">Sources and project references</h2>
                <ul className="mt-5 space-y-3 text-sm text-slate-700 dark:text-slate-300">
                  {[
                    ["OpenAI Help: Images in ChatGPT", "https://help.openai.com/en/articles/11084440-images-in-chatgpt"],
                    ["Hi3D: creating a 3D model from a single image", "https://www.hi3d.ai/ai-faq/does-hitem3d-support-generating-3d-models-from-a-single-image"],
                    ["Bambu Lab: PLA Silk+", "https://eu.store.bambulab.com/products/pla-silk-upgrade"],
                    ["Belgian FPS Economy: copyright", "https://economie.fgov.be/sites/default/files/Files/Publications/files/Auteursrecht.pdf"],
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
                  Project images, sizes, material choices and production details come from X3DPrints&apos; own project records.
                </p>
              </section>
            </GlassCard>
          </Reveal>

          <Reveal>
            <section aria-labelledby="berenfeesten-cta-title-en" className="rounded-[2rem] bg-slate-950 px-6 py-10 text-white shadow-2xl sm:px-10">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-300">From photograph to physical object</p>
              <h2 id="berenfeesten-cta-title-en" className="mt-3 text-3xl font-bold">
                Do you have a statue, mascot or keepsake without a 3D file?
              </h2>
              <p className="mt-4 max-w-3xl leading-7 text-slate-300">
                Send clear photographs, the intended size and expected quantity. You first receive an honest feasibility
                check, followed by a quote for model work, a test print and any subsequent series.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ShimmerButton href={contactHref}>Request a project assessment</ShimmerButton>
                <Link href="/en/blog/3d-printing-marketing-events" className="rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15">
                  More about events and custom work
                </Link>
              </div>
            </section>
          </Reveal>
        </div>
      </div>

      <BlogAuthorNote locale="en" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(galleryJsonLd) }} />
    </article>
  )
}
