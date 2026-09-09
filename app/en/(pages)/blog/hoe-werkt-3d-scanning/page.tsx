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

const canonical = "https://www.x3dprints.be/en/blog/hoe-werkt-3d-scanning/"
const dutchCanonical = "https://www.x3dprints.be/blog/hoe-werkt-3d-scanning/"
const publishedDate = "2026-09-08T14:00:00+02:00"
const dateModified = "2026-09-08"
const scannerImage = "/images/CR-Scan_Otter_3.webp"

export const metadata: Metadata = {
  title: "How does 3D scanning work? Complete guide | X3DPrints",
  description:
    "How does a physical object become a useful 3D model? Learn about 3D scanning, scan-to-print, reverse engineering, STL, STEP, accuracy and preparation.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": dutchCanonical,
      "en-BE": canonical,
      "x-default": dutchCanonical,
    },
  },
  openGraph: {
    title: "How does 3D scanning work? From object to 3D model",
    description:
      "A practical guide to 3D scans, mesh files, CAD reconstruction, difficult surfaces, person scans and scan-to-print.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    modifiedTime: publishedDate,
    authors: ["https://www.x3dprints.be/en/about/"],
    tags: [
      "3D scanning Belgium",
      "scan physical object",
      "scan to STL",
      "scan to STEP",
      "reverse engineering",
      "scan-to-print",
    ],
    images: [
      {
        url: scannerImage,
        width: 1600,
        height: 1600,
        alt: "CR-Scan Otter scanner for 3D scanning and scan-to-print at X3DPrints",
      },
    ],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "How does 3D scanning work? Complete guide",
    description: "From physical object to mesh, CAD model or 3D print, with realistic capabilities and limitations.",
    images: [scannerImage],
  },
}

const tocItems = [
  { id: "what-is-3d-scanning", label: "What is 3D scanning?" },
  { id: "capture-methods", label: "Capture methods and applications" },
  { id: "workflow", label: "From object to 3D file" },
  { id: "file-formats", label: "STL, OBJ, PLY or STEP" },
  { id: "reverse-engineering", label: "Scanning versus reverse engineering" },
  { id: "scannability", label: "What is difficult to scan?" },
  { id: "accuracy", label: "Accuracy and expectations" },
  { id: "preparation", label: "Preparing your scan" },
  { id: "scan-to-print", label: "From scan to 3D print" },
  { id: "service-area", label: "3D scanning in Belgium" },
  { id: "sources", label: "Sources" },
  { id: "faq", label: "Frequently asked questions" },
]

const scanRoutes = [
  {
    situation: "Organic object, artwork or sculpture",
    method: "Surface scanning in multiple passes",
    output: "Cleaned STL, OBJ or PLY mesh",
    note: "Strong for shape and optional texture; exact symmetry is not always the goal.",
  },
  {
    situation: "Broken or unavailable spare part",
    method: "Scan + reference measurements + CAD reconstruction",
    output: "New STEP and/or STL file",
    note: "Fits, holes and threads are not copied blindly from scan data.",
  },
  {
    situation: "Enclosure, holder or assembly aid",
    method: "Scan as contour reference + new design",
    output: "Printable CAD model",
    note: "Hidden interior geometry and functional details require additional dimensions.",
  },
  {
    situation: "Person, bust or event figurine",
    method: "Fast capture + visual mesh cleanup",
    output: "Mesh for visualisation or a scaled print",
    note: "Pose, movement, hair, clothing and target scale affect the result.",
  },
  {
    situation: "Archiving or digital presentation",
    method: "Geometry and optional colour registration",
    output: "Master mesh and lighter delivery copy",
    note: "Preservation context, metadata and usage rights belong in the archive plan.",
  },
]

const workflowSteps = [
  {
    name: "Assess feasibility from photos",
    text: "Send overview photos, dimensions, material and the required end result. Photos are only for pre-assessment; they do not replace the physical object.",
  },
  {
    name: "Bring in the physical object",
    text: "The actual scan takes place by appointment in Herzele. Accessibility, stability, fragility and any surface preparation are reviewed first.",
  },
  {
    name: "Prepare and calibrate",
    text: "The object is positioned securely. Reference markers or a reversible matte treatment are discussed when required.",
  },
  {
    name: "Capture from multiple directions",
    text: "Visible exterior geometry is recorded in overlapping passes. Undersides and deep areas usually need a separate setup.",
  },
  {
    name: "Align, merge and clean",
    text: "Passes are registered, noise is removed and holes are repaired only when this is technically justified. Scale and usability are then checked.",
  },
  {
    name: "Deliver mesh, CAD or print",
    text: "You receive the agreed scan file. Functional parts can continue into a separate CAD reconstruction and test-print stage.",
  },
]

const fileRows = [
  {
    format: "STL",
    contains: "Triangle mesh without colour texture",
    usefulFor: "3D printing, simple exchange and geometric reference",
    caveat: "No parametric CAD features; units are not always embedded.",
  },
  {
    format: "OBJ",
    contains: "Mesh with support for linked materials and textures",
    usefulFor: "Art, decor, visualisation and person scans",
    caveat: "Often consists of multiple linked files and is not automatically CAD-editable.",
  },
  {
    format: "PLY",
    contains: "Points or polygons, optionally with colour data",
    usefulFor: "Scan archives, processing and technical reference",
    caveat: "Software support varies between applications.",
  },
  {
    format: "STEP",
    contains: "CAD surfaces and solids",
    usefulFor: "Dimensioned redesign, production, modification and engineering",
    caveat: "Usually created through reverse engineering, not directly by the scanner.",
  },
]

const difficultObjects = [
  {
    title: "Glossy, mirrored or transparent",
    body: "Projected light reflects unpredictably or passes through the material. A matte preparation may help, but it is never applied to a fragile object without explicit approval.",
  },
  {
    title: "Very dark or lacking distinct detail",
    body: "Dark surfaces return less usable information; large plain areas give alignment software few features to track. Lighting, markers or another setup may be required.",
  },
  {
    title: "Flexible, hairy or moving",
    body: "A scanner combines successive observations. Every shape change creates differences. Hair, soft fabric, plants and loose cables therefore require realistic expectations.",
  },
  {
    title: "Deep cavities and hidden interiors",
    body: "A surface scanner only sees optically accessible geometry. Closed chambers, deep bores and covered areas need separate measurements, redesign or another imaging technique.",
  },
]

const useCases = [
  "Reconstruct a cover, knob, holder or clip when the original CAD file is missing.",
  "Digitise artwork, a mascot or decor object for reproduction, scaled variants or archiving.",
  "Use an existing enclosure as a contour reference for a new bracket, jig or connection.",
  "Capture a person as the basis for a bust, miniature or event application.",
  "Compare a prototype or hand-made sample more quickly with a new CAD design.",
  "Record a product shape as the basis for retail displays, packaging forms or presentation models.",
]

const preparationItems = [
  "Take photos from every side and include a ruler or dimension for scale context.",
  "State the maximum dimensions, material and whether the object is fragile or valuable.",
  "Explain the desired output: archive mesh, visual model, STEP file, spare part or finished print.",
  "Mark critical dimensions, mating surfaces, screw positions and contact areas clearly.",
  "Only remove loose parts when safe, and do not apply coatings or markers before discussing them.",
  "Plan to bring the physical object to Herzele by appointment; photos are only for feasibility and quote preparation.",
]

const faqItems = [
  {
    q: "Can every object be 3D scanned?",
    a: "No. Matte, stable objects with visible features are the easiest. Transparent, mirrored, very dark, soft or moving objects may require preparation, a different method or a more limited output. Every project therefore starts with a feasibility review.",
  },
  {
    q: "Can X3DPrints scan an object from photos?",
    a: "Photos are used to assess feasibility and plan the workflow. The physical object must be brought in by appointment for the actual 3D scan. A separate photogrammetry workflow is a different method and is only proposed when technically appropriate.",
  },
  {
    q: "Do I receive my 3D scan file?",
    a: "Yes. You always receive the digital scan file agreed in advance, usually as STL, OBJ or PLY. This lets you archive it, order another print or process it later. A STEP file normally requires separate CAD reconstruction.",
  },
  {
    q: "Is a 3D scan the same as a STEP or CAD file?",
    a: "No. A scanner records visible surfaces as points or polygons. STEP represents editable CAD surfaces and solids. For functional parts, the scan is often used as a reference for a new CAD model with intentional holes, faces and tolerances.",
  },
  {
    q: "How accurate is 3D scanning?",
    a: "There is no honest universal figure. Results and measurement uncertainty depend on scanner, calibration, object size, surface, viewing angle, environment and processing. X3DPrints is a practical scan-to-print partner and does not claim certified industrial metrology.",
  },
  {
    q: "Can a scan be 3D printed immediately?",
    a: "Organic forms can sometimes be printed after mesh cleanup. Functional parts often need additional work for wall thickness, flat mounting areas, fits, holes and printability. The first decision is whether mesh repair is enough or CAD reconstruction is required.",
  },
  {
    q: "Does X3DPrints offer person scans and busts?",
    a: "Yes, for busts, figurines and event applications. Remaining still is important. Pose, hair, clothing, target scale, texture cleanup and privacy are discussed before capture.",
  },
  {
    q: "How much does it cost to have an object 3D scanned?",
    a: "Price depends on object size, surface, number of setups, required cleanup and output. The 3D scanning service page lists transparent guide prices. CAD reconstruction, modelling and 3D printing are quoted as separate one-off project items when required.",
  },
]

const sources = [
  {
    label: "Smithsonian 3D Digitization Program",
    href: "https://3d.si.edu/about",
    text: "Non-commercial practice context for 3D digitisation, collections management, research and reuse of digital objects.",
  },
  {
    label: "NIST: performance of 3D imaging systems",
    href: "https://www.nist.gov/publications/characterization-range-performance-3d-imaging-system-nist-tn-1695",
    text: "Research into distance, angle of incidence, reflectivity and target shape as factors affecting 3D imaging range error.",
  },
  {
    label: "Europeana: documentation of 3D digital assets",
    href: "https://pro.europeana.eu/project/advanced-documentation-of-3d-digital-assets",
    text: "European guidance on shape, appearance, context and documentation in the 3D digitisation of cultural heritage.",
  },
  {
    label: "Library of Congress: Recommended Formats Statement",
    href: "https://www.loc.gov/preservation/resources/rfs/RFS%202025-2026.pdf",
    text: "Public reference on sustainable formats, including scanned 3D objects and CAD data.",
  },
  {
    label: "Artevelde University of Applied Sciences: handheld 3D scanning",
    href: "https://www.arteveldehogeschool.be/nl/blog/de-kunst-van-het-3d-scannen-met-een-handscanner",
    text: "A local educational source from Ghent on overlapping capture, processing and difficult transparent surfaces.",
  },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "How does 3D scanning work? Complete guide from object to 3D model",
  description: metadata.description ?? "",
  datePublished: publishedDate,
  dateModified,
  image: `https://www.x3dprints.be${scannerImage}`,
  inLanguage: "en-BE",
})

const howToJsonLd = buildHowToSchema({
  name: "From physical object to useful 3D scan file",
  description: "The practical scan workflow from feasibility review and physical capture to mesh, CAD reconstruction or 3D print.",
  inLanguage: "en-BE",
  mainEntityOfPage: canonical,
  url: `${canonical}#workflow`,
  toolNames: ["3D scanner", "scan processing software", "measuring tools", "CAD software"],
  supplyNames: ["physical reference object", "overview photos", "critical dimensions", "description of the required result"],
  steps: workflowSteps.map((step, index) => ({ position: index + 1, name: step.name, text: step.text, url: `${canonical}#workflow-step-${index + 1}` })),
})

const breadcrumbJsonLd = buildBreadcrumbSchema({
  id: `${canonical}#breadcrumb`,
  inLanguage: "en-BE",
  items: [
    { name: "Home", url: "https://www.x3dprints.be/en/" },
    { name: "Knowledge base", url: "https://www.x3dprints.be/en/blog/" },
    { name: "How does 3D scanning work?", url: canonical },
  ],
})

export default function HowDoes3dScanningWorkPage() {
  return (
    <main className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(85%_45%_at_80%_2%,rgba(6,182,212,0.2),transparent_72%),radial-gradient(65%_38%_at_5%_30%,rgba(59,130,246,0.15),transparent_74%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.1]" />

      <section className="px-6 pb-14 pt-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.12fr_.88fr]">
          <Reveal>
            <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
              <Link href="/en/blog" className="font-semibold text-indigo-600 hover:text-indigo-500">Knowledge base</Link>{" "}<span aria-hidden>/</span> 3D scanning
            </nav>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.34em] text-cyan-700">How-to and scan-to-print</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              How does 3D scanning work? From physical object to useful 3D model
            </h1>
            <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-700">
              3D scanning captures the visible shape of a real object digitally. The result is normally a point cloud or
              polygon mesh that is cleaned, optionally reconstructed in CAD and prepared for archiving, visualisation or 3D
              printing. A scan is therefore a strong reference, but not an automatically finished STEP file.
            </p>
            <p className="mt-4 text-sm font-medium text-slate-500">Published and last updated on 8 September 2026 by X3DPrints in Herzele, Belgium.</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ShimmerButton href="/en/contact?topic=3d-scanning">Request a free scan intake</ShimmerButton>
              <Link href="/en/3d-scannen" className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white/85 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white">View the 3D scanning service</Link>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-[2.25rem] border border-cyan-100 bg-slate-950 shadow-2xl">
              <Image src={scannerImage} alt="CR-Scan Otter 3D scanner used for object scanning at X3DPrints" fill priority sizes="(max-width: 1024px) 90vw, 420px" className="object-contain p-6" />
              <div aria-hidden className="absolute inset-0 bg-[linear-gradient(135deg,rgba(6,182,212,0.18),transparent_42%,rgba(59,130,246,0.18))]" />
              <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/15 bg-slate-950/75 p-4 text-white backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">Important</p>
                <p className="mt-2 text-sm leading-6 text-slate-200">Photos show whether scanning is promising. The physical object is still required for the actual scan.</p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl gap-4 sm:grid-cols-3">
          {[["Input", "A physical object with a defined use"], ["Base output", "STL, OBJ or PLY mesh"], ["Next step", "CAD reconstruction, test print or archive"]].map(([label, value]) => (
            <GlassCard key={label} className="border border-white/50 bg-white/85 p-5 shadow-lg backdrop-blur"><p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">{label}</p><p className="mt-2 text-lg font-bold text-slate-900">{value}</p></GlassCard>
          ))}
        </div>
        <div className="mx-auto max-w-6xl"><ContentTableOfContents items={tocItems} title="In this complete guide" className="mt-8" /></div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.03fr_.97fr]">
          <Reveal>
            <GlassCard className="h-full border border-white/50 bg-white/88 p-6 shadow-lg backdrop-blur sm:p-8">
              <h2 id="what-is-3d-scanning" className="scroll-mt-28 text-3xl font-bold text-slate-900">What does a 3D scanner actually measure?</h2>
              <p className="mt-4 leading-7 text-slate-700">A surface scanner records where visible points on an object sit in space. Software aligns successive frames or passes into a point cloud and then a polygon skin. Colour cameras can also capture texture, but geometry quality and colour quality are separate questions.</p>
              <p className="mt-4 leading-7 text-slate-700">The scanner only sees accessible surfaces. Material thickness, internal chambers, hidden clips and original design intent are not known automatically. That is why reference measurements and <Link href="/en/3d-modelleren" className="font-semibold text-indigo-600 underline underline-offset-4">3D modelling</Link> are often part of reliable reverse engineering.</p>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.08}>
            <GlassCard className="h-full border border-cyan-200/70 bg-cyan-50/80 p-6 shadow-lg backdrop-blur sm:p-8">
              <h2 id="capture-methods" className="scroll-mt-28 text-2xl font-bold text-slate-900">Scanner, photogrammetry or manual CAD?</h2>
              <dl className="mt-5 space-y-5 text-slate-700">
                <div><dt className="font-bold text-slate-900">Optical surface scanning</dt><dd className="mt-1 leading-7">Fast and useful for organic forms, contours and objects with enough visible detail.</dd></div>
                <div><dt className="font-bold text-slate-900">Photogrammetry</dt><dd className="mt-1 leading-7">Reconstruction from many overlapping photographs. Useful for certain large, coloured or difficult-to-move subjects, but not the same as sending a few intake photos.</dd></div>
                <div><dt className="font-bold text-slate-900">Manual CAD</dt><dd className="mt-1 leading-7">Often faster and cleaner for simple prismatic forms, hole patterns, threads and parts where design intent matters.</dd></div>
              </dl>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <GlassCard className="border border-white/50 bg-white/90 p-6 shadow-lg backdrop-blur sm:p-8">
              <h2 className="text-3xl font-bold text-slate-900">Which scanning route fits your goal?</h2>
              <p className="mt-3 max-w-4xl leading-7 text-slate-700">The required deliverable determines the workflow. Asking only for “a scan” can otherwise produce a technically valid file that is unsuitable for the next step.</p>
              <div className="mt-6 overflow-x-auto">
                <table className="min-w-[920px] divide-y divide-slate-200 text-left text-sm">
                  <thead><tr className="text-slate-600"><th className="py-3 pr-5">Situation</th><th className="py-3 pr-5">Route</th><th className="py-3 pr-5">Output</th><th className="py-3">Important point</th></tr></thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">{scanRoutes.map((row) => <tr key={row.situation}><th className="py-4 pr-5 font-bold text-slate-900">{row.situation}</th><td className="py-4 pr-5">{row.method}</td><td className="py-4 pr-5">{row.output}</td><td className="py-4">{row.note}</td></tr>)}</tbody>
                </table>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section id="workflow" className="scroll-mt-28 px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal><p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-700">The workflow</p><h2 className="mt-3 text-3xl font-bold text-slate-900">From object to useful 3D file in six steps</h2></Reveal>
          <ol className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {workflowSteps.map((step, index) => (
              <li key={step.name} id={`workflow-step-${index + 1}`} className="scroll-mt-28">
                <Reveal delay={index * 0.04}><GlassCard className="h-full border border-white/50 bg-white/88 p-6 shadow-lg backdrop-blur"><span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-cyan-300">{index + 1}</span><h3 className="mt-4 text-lg font-bold text-slate-900">{step.name}</h3><p className="mt-2 text-sm leading-6 text-slate-700">{step.text}</p></GlassCard></Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <GlassCard className="border border-white/50 bg-white/90 p-6 shadow-lg backdrop-blur sm:p-8">
              <h2 id="file-formats" className="scroll-mt-28 text-3xl font-bold text-slate-900">STL, OBJ, PLY or STEP: which file do you receive?</h2>
              <p className="mt-3 max-w-4xl leading-7 text-slate-700">At X3DPrints you receive the agreed digital scan file. The right format follows from the goal; a large file containing millions of polygons is not automatically better or more useful.</p>
              <div className="mt-6 overflow-x-auto">
                <table className="min-w-[900px] divide-y divide-slate-200 text-left text-sm">
                  <thead><tr className="text-slate-600"><th className="py-3 pr-5">Format</th><th className="py-3 pr-5">Contains</th><th className="py-3 pr-5">Useful for</th><th className="py-3">Key limitation</th></tr></thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">{fileRows.map((row) => <tr key={row.format}><th className="py-4 pr-5 text-lg font-bold text-slate-900">.{row.format.toLowerCase()}</th><td className="py-4 pr-5">{row.contains}</td><td className="py-4 pr-5">{row.usefulFor}</td><td className="py-4">{row.caveat}</td></tr>)}</tbody>
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
              <h2 id="reverse-engineering" className="scroll-mt-28 text-3xl font-bold text-slate-900">Why a scan is not yet reverse engineering</h2>
              <p className="mt-4 leading-7 text-slate-700">A scan describes the existing surface, including wear, distortion and damage. Reverse engineering attempts to recover the intended shape. Planes become planar, cylinders receive a logical diameter and symmetry, holes and tolerances are determined again.</p>
              <p className="mt-4 leading-7 text-slate-700">Mesh cleanup can be enough for a decorative replica. A spare part, snap fit or enclosure generally benefits from a new CAD model. Read how a <Link href="/en/blog/kapot-onderdeel-laten-printen" className="font-semibold text-indigo-600 underline underline-offset-4">broken part can be reconstructed</Link> and when <Link href="/en/3d-modelleren" className="font-semibold text-indigo-600 underline underline-offset-4">3D modelling</Link> is required.</p>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.08}>
            <GlassCard className="h-full border border-blue-200/70 bg-blue-50/80 p-6 shadow-lg backdrop-blur sm:p-8">
              <h3 className="text-xl font-bold text-slate-900">When scanning saves time</h3>
              <ul className="mt-4 space-y-3 text-slate-700">{useCases.map((item) => <li key={item} className="flex gap-3"><span aria-hidden className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-500" /><span>{item}</span></li>)}</ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal><h2 id="scannability" className="scroll-mt-28 text-3xl font-bold text-slate-900">Which objects are difficult to 3D scan?</h2><p className="mt-3 max-w-4xl leading-7 text-slate-700">Scannability is not only about size. Surface, movement, lines of sight and distinct features determine whether a scanner can capture and align reliable data.</p></Reveal>
          <div className="mt-6 grid gap-5 md:grid-cols-2">{difficultObjects.map((item, index) => <Reveal key={item.title} delay={index * 0.05}><GlassCard className="h-full border border-white/50 bg-white/88 p-6 shadow-lg backdrop-blur"><h3 className="text-xl font-bold text-slate-900">{item.title}</h3><p className="mt-3 leading-7 text-slate-700">{item.body}</p></GlassCard></Reveal>)}</div>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="h-full border border-amber-200/70 bg-amber-50/82 p-6 shadow-lg backdrop-blur sm:p-8">
              <h2 id="accuracy" className="scroll-mt-28 text-2xl font-bold text-slate-900">Accuracy without marketing numbers</h2>
              <p className="mt-4 leading-7 text-slate-700">Accuracy is not a single number printed on a scanner box. NIST identifies distance, angle of incidence, reflectivity and target form among the factors that affect range error. Calibration, object movement, registration and processing matter too.</p>
              <p className="mt-4 leading-7 text-slate-700">X3DPrints therefore operates as a practical scan-to-print partner, not a certified metrology laboratory. Critical dimensions are checked separately and a test print is used when appropriate.</p>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.08}>
            <GlassCard className="h-full border border-white/50 bg-white/88 p-6 shadow-lg backdrop-blur sm:p-8">
              <h2 id="preparation" className="scroll-mt-28 text-2xl font-bold text-slate-900">How to prepare a scanning request</h2>
              <ul className="mt-4 space-y-3 text-slate-700">{preparationItems.map((item) => <li key={item} className="flex gap-3"><span aria-hidden className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-500" /><span>{item}</span></li>)}</ul>
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
                  <h2 id="scan-to-print" className="mt-3 scroll-mt-28 text-3xl font-bold">When can a 3D scan be printed?</h2>
                  <p className="mt-4 leading-7 text-slate-300">A closed organic mesh can often be scaled and printed after inspection and repair. Functional parts usually need CAD work for wall thickness, flat mounting areas, holes, fit and print orientation. Material is then selected for the use environment, not for the scanner.</p>
                  <p className="mt-4 leading-7 text-slate-300">PLA or PETG can suit indoor parts; sustained UV and weather may make <Link href="/en/blog/asa-3d-printen" className="font-semibold text-cyan-300 underline underline-offset-4">ASA 3D printing</Link> more appropriate. See the <Link href="/en/materials" className="font-semibold text-cyan-300 underline underline-offset-4">materials library</Link> for alternatives.</p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/5 p-5">
                  <p className="font-bold">Your project can contain four separate items:</p>
                  <ol className="mt-4 space-y-3 text-sm text-slate-300"><li>1. 3D scan and agreed digital scan file</li><li>2. Mesh cleanup or CAD reconstruction</li><li>3. Test print and fit check</li><li>4. Final print or small batch</li></ol>
                  <p className="mt-4 text-sm text-slate-400">Scanning and modelling are one-off project costs in the quote.</p>
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
              <h2 id="service-area" className="scroll-mt-28 text-2xl font-bold text-slate-900">3D scanning in Belgium from Herzele</h2>
              <p className="mt-4 leading-7 text-slate-700">The studio and scanner are located in Herzele. Photos can be sent digitally for the free feasibility review, but the physical object comes to Herzele for the actual scan. Afterwards, the object can be collected and files or prints delivered digitally or by parcel.</p>
              <p className="mt-4 leading-7 text-slate-700">Read regional service information for <Link href="/en/3d-printen-in-herzele" className="font-semibold text-indigo-600 underline underline-offset-4">Herzele</Link>, <Link href="/en/3d-printen-in-gent" className="font-semibold text-indigo-600 underline underline-offset-4">Ghent</Link> and <Link href="/en/3d-printen-in-antwerpen" className="font-semibold text-indigo-600 underline underline-offset-4">Antwerp</Link>, or browse all <Link href="/en/locaties" className="font-semibold text-indigo-600 underline underline-offset-4">delivery regions</Link>.</p>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.08}>
            <GlassCard className="h-full border border-cyan-200/70 bg-cyan-50/82 p-6 shadow-lg backdrop-blur sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Quote and privacy</h2>
              <p className="mt-4 leading-7 text-slate-700">The <Link href="/en/3d-scannen" className="font-semibold text-indigo-600 underline underline-offset-4">3D scanning service page</Link> contains current guide prices and explains what is included. You retain the agreed scan file. Person scans and images of identifiable people are only processed for the agreed project and are not used as portfolio or marketing material without consent.</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row"><ShimmerButton href="/en/contact?topic=3d-scanning">Start with photos and dimensions</ShimmerButton><Link href="/en/pricing" className="inline-flex items-center justify-center rounded-xl border border-cyan-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900">View pricing</Link></div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <GlassCard className="border border-white/50 bg-white/90 p-6 shadow-lg backdrop-blur sm:p-8">
              <h2 id="sources" className="scroll-mt-28 text-2xl font-bold text-slate-900">Sources and further reading</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">These external sources are educational, heritage or research institutions. They do not sell a competing scanning service and do not link to commercial price lists.</p>
              <ul className="mt-5 grid gap-4 md:grid-cols-2">{sources.map((source) => <li key={source.href} className="rounded-2xl border border-slate-200 bg-white/70 p-4"><cite className="not-italic"><Link href={source.href} target="_blank" rel="noopener noreferrer" className="font-bold text-indigo-700 underline underline-offset-4">{source.label}</Link></cite><p className="mt-2 text-sm leading-6 text-slate-600">{source.text}</p></li>)}</ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogFaq title="Frequently asked questions about 3D scanning" items={faqItems} inLanguage="en-BE" sectionId="faq" mainEntityOfPage={canonical} />
      <BlogAuthorNote locale="en" />
      <ReadMoreLinks
        pageType="blog"
        title="Turn an object into a useful result"
        intro="Review the scanning service, compare CAD reconstruction with mesh cleanup and start with a feasibility check."
        primaryLinks={[
          { label: "3D scanning service and guide prices", href: "/3d-scannen" },
          { label: "3D modelling and reverse engineering", href: "/3d-modelleren" },
          { label: "Request a free scan intake", href: "/contact?topic=3d-scanning" },
        ]}
        secondaryLinks={[
          { label: "Reconstruct a broken part", href: "/blog/kapot-onderdeel-laten-printen" },
          { label: "From photos to a 3D figurine", href: "/blog/vliezelse-beer-3d-beeldjes-berenfeesten" },
          { label: "View scan-to-print examples", href: "/portfolio" },
        ]}
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </main>
  )
}
