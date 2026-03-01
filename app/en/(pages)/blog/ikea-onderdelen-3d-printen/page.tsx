import type { Metadata } from "next"
import Link from "next/link"
import Faq from "@/components/Faq"
import GlassCard from "@/components/GlassCard"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import BlogAuthorNote from "@/components/BlogAuthorNote"
import BlogContentOverview from "@/components/BlogContentOverview"
import { buildArticleJsonLd, buildFaqPageSchema, buildHowToSchema } from "@/lib/seo"

const canonical = "https://www.x3dprints.be/en/blog/ikea-onderdelen-3d-printen/"
const nlCanonical = "https://www.x3dprints.be/blog/ikea-onderdelen-3d-printen/"
const datePublished = "2026-03-01"
const dateModified = "2026-03-01"
const lastUpdatedLabel = "Last updated: March 1, 2026"

const contactHref =
  "/en/contact?material=PETG&quote=IKEA%20part%20replacement%20-%20I%20need%20a%20fit%20check"
const pricingHref = "/en/pricing?utm_source=blog&utm_medium=cta&utm_campaign=ikea-parts-3d-printing"
const materialsHref = "/en/materials#material-suggestion-tool"
const viewerHref = "/en/viewer?utm_source=blog&utm_medium=internal&utm_campaign=ikea-parts-3d-printing"
const servicesHref = "/en/services?utm_source=blog&utm_medium=internal&utm_campaign=ikea-parts-3d-printing"

export const metadata: Metadata = {
  title: "3D printed IKEA parts: practical guide | X3DPrints",
  description:
    "Need an IKEA part replacement? This guide explains when 3D printing works, which intake data matters, and how material, pricing and lead time are decided.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": nlCanonical,
      "en-BE": canonical,
      "x-default": nlCanonical,
    },
  },
  openGraph: {
    title: "3D printed IKEA part replacement",
    description:
      "Practical workflow for broken or missing IKEA parts with intake checklist, material path and quote flow.",
    url: canonical,
    images: [{ url: "/images/og-blog-en.svg", width: 1200, height: 630, alt: "3D printed IKEA parts guide" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D printed IKEA part replacement",
    description: "Practical guide with checklist, material matrix and fast quote path.",
    images: ["/images/og-blog-en.svg"],
  },
}

const fitCards = [
  {
    title: "Clips, connectors and small holders",
    body:
      "Small functional furniture parts are often a good FDM use case, especially when originals are hard to source.",
    href: "/en/blog/kapot-onderdeel-laten-printen",
    label: "Read broken-part base guide",
  },
  {
    title: "Iterate to improve fit",
    body:
      "You can print a fast fit-test first, then tune tolerances before final production.",
    href: "/en/blog/3d-print-ontwerp-checklist",
    label: "Read design checklist",
  },
  {
    title: "Best for one-offs and small runs",
    body:
      "For limited quantities, printing is often more efficient than alternative sourcing routes.",
    href: "/en/blog/3d-printen-op-bestelling",
    label: "View order workflow",
  },
]

const intakeChecklist = [
  "Photo of the part and mounting position in the furniture",
  "Dimensions of critical areas (holes, clips, length, thickness)",
  "Load profile: static load, pull force, vibration or repeated disassembly",
  "Preferred color, quantity and timing",
]

const materialRows = [
  {
    useCase: "Basic indoor fastening",
    material: "PLA Matte",
    reason: "Fast and cost-efficient",
    note: "Good for low-load use and quick fit tests",
  },
  {
    useCase: "Higher load or warmer area",
    material: "PETG",
    reason: "Better heat and mechanical behavior",
    note: "Often the safest default for functional IKEA parts",
  },
  {
    useCase: "Flexible clip or damping",
    material: "TPU",
    reason: "Flexible and impact-absorbing",
    note: "For specific soft-fit scenarios",
  },
]

const pricingRows = [
  { type: "Clip / connector", size: "~5x5x5 cm", price: "from EUR 5", leadTime: "2-4 working days" },
  { type: "Bracket / holder", size: "~10x10x10 cm", price: "from EUR 20", leadTime: "2-5 working days" },
  { type: "Larger custom part", size: "~20x20x20 cm", price: "from EUR 49", leadTime: "3-6 working days" },
]

const relatedLinks = [
  { label: "Appliance spare part with 3D printing", href: "/en/blog/vervangstuk-huishoudtoestel-3d-printen" },
  { label: "How to choose the right material", href: "/en/blog/juiste-3d-print-materiaal" },
  { label: "3D print price per part", href: "/en/blog/3d-print-prijs-per-stuk" },
  { label: "3D printed tool organizers", href: "/en/blog/tool-organizers-3d-printing" },
]

const faqItems = [
  {
    q: "Can you print an IKEA part without an original file?",
    a: "Often yes. With photos and basic dimensions we can usually start a fit-check workflow.",
  },
  {
    q: "Is PETG always better than PLA for IKEA parts?",
    a: "Not always. PLA is fine for lighter indoor applications. PETG is better for higher load or warmer conditions.",
  },
  {
    q: "How fast can I get pricing?",
    a: "Usually within 24 hours when context is complete. STL/STEP speeds things up.",
  },
  {
    q: "Can we run a fit test before ordering multiple parts?",
    a: "Yes. That is usually the most reliable path for repeatable fit quality.",
  },
]

const references = [
  { label: "IKEA spare parts service", href: "https://www.ikea.com/be/en/customer-service/spare-parts/" },
  { label: "Prusa filament material guide", href: "https://help.prusa3d.com/filament-material-guide" },
  { label: "Ultimaker design for FFF", href: "https://ultimaker.com/learn/design-for-fff-3d-printing/" },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "3D printed IKEA parts: practical guide",
  description:
    "Practical guide for IKEA replacement parts with intake workflow, material choices, price ranges and fit-check path.",
  datePublished,
  dateModified,
  image: "/images/og-blog-en.svg",
  inLanguage: "en-BE",
})

const faqJsonLd = buildFaqPageSchema({
  inLanguage: "en-BE",
  mainEntityOfPage: canonical,
  items: faqItems.map((item) => ({ q: item.q, a: item.a })),
})

const howToJsonLd = buildHowToSchema({
  name: "Get an IKEA part 3D printed",
  description: "Move from a broken or missing part to a working replacement in four clear steps.",
  inLanguage: "en-BE",
  mainEntityOfPage: canonical,
  totalTime: "PT4M",
  steps: [
    { name: "Share photo and measurements", text: "Send photo, measurements and mounting context." },
    { name: "Validate file or reference", url: viewerHref },
    { name: "Choose material and pricing path", url: pricingHref },
    { name: "Submit prefilled request", url: contactHref },
  ],
  toolNames: ["X3DPrints viewer", "Material Suggestion Tool", "X3DPrints pricing"],
  supplyNames: ["Photo or STL/STEP", "Dimensions", "Usage context"],
})

export default function IkeaPartsGuideEnPage() {
  return (
    <main className="relative overflow-hidden px-6 pb-24 pt-16 sm:px-8 lg:px-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(130%_60%_at_50%_0%,rgba(16,185,129,.16),transparent_72%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.08]" />

      <article className="mx-auto max-w-5xl space-y-10">
        <header className="space-y-4">
          <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
            <ol className="flex flex-wrap gap-2">
              <li>
                <Link href="/en/blog" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Blog
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="font-medium text-slate-700">3D printed IKEA parts</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">Home practicals</p>
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            3D printed IKEA parts: practical workflow
          </h1>
          <p className="max-w-3xl text-lg text-slate-700">
            Short answer: often viable for clips, holders and small connectors. With good intake data you can quickly move to fit tests and final replacement parts.
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">{lastUpdatedLabel}</p>
          <div className="flex flex-wrap gap-3">
            <ShimmerButton
              href={contactHref}
              event={{ action: "cta_click", category: "blog_ikea_en_top", label: "contact_prefill" }}
            >
              Start IKEA intake
            </ShimmerButton>
            <ShimmerButton
              href={materialsHref}
              className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
              event={{ action: "cta_click", category: "blog_ikea_en_top", label: "materials_tool" }}
            >
              Choose material
            </ShimmerButton>
            <Link
              href={pricingHref}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:border-slate-300 hover:bg-slate-50"
            >
              View pricing range
            </Link>
          </div>
        </header>

        <BlogContentOverview locale="en" />

        <section id="when-ikea-parts-work" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">When does this work for IKEA parts?</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {fitCards.map((card) => (
                <GlassCard key={card.title} className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
                  <p className="mt-2 text-sm text-slate-700">{card.body}</p>
                  <Link href={card.href} className="mt-3 inline-flex text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                    {card.label}
                  </Link>
                </GlassCard>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="what-to-send" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">What should you send?</h2>
            <GlassCard className="mt-4 p-6">
              <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
                {intakeChecklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                No file yet? Start with photo + dimensions. If you already have STL/STEP, use the{" "}
                <Link href={viewerHref} className="font-semibold text-indigo-600 hover:text-indigo-500">
                  viewer
                </Link>{" "}
                to speed up intake.
              </p>
            </GlassCard>
          </Reveal>
        </section>

        <section id="material-matrix-ikea" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Material matrix for IKEA replacement parts</h2>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200/70 bg-white/80">
              <table className="min-w-full text-left text-sm text-slate-700">
                <caption className="sr-only">Material matrix for IKEA replacement parts</caption>
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Use case</th>
                    <th className="px-4 py-3">Material</th>
                    <th className="px-4 py-3">Why</th>
                    <th className="px-4 py-3">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {materialRows.map((row) => (
                    <tr key={row.useCase} className="border-t border-slate-200/60">
                      <td className="px-4 py-3 font-semibold text-slate-900">{row.useCase}</td>
                      <td className="px-4 py-3">{row.material}</td>
                      <td className="px-4 py-3">{row.reason}</td>
                      <td className="px-4 py-3">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </section>

        <section id="cost-and-timing" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Cost and timing snapshot</h2>
            <p className="mt-2 text-slate-700">
              Planning ranges only. Final pricing follows file and context review, in line with{" "}
              <Link href="/en/blog/hoeveel-kost-3d-printen" className="font-semibold text-indigo-600 hover:text-indigo-500">
                this cost guide
              </Link>
              .
            </p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200/70 bg-white/80">
              <table className="min-w-full text-left text-sm text-slate-700">
                <caption className="sr-only">Price range for IKEA replacement parts</caption>
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Size</th>
                    <th className="px-4 py-3">Price range</th>
                    <th className="px-4 py-3">Lead time</th>
                  </tr>
                </thead>
                <tbody>
                  {pricingRows.map((row) => (
                    <tr key={row.type} className="border-t border-slate-200/60">
                      <td className="px-4 py-3 font-semibold text-slate-900">{row.type}</td>
                      <td className="px-4 py-3">{row.size}</td>
                      <td className="px-4 py-3">{row.price}</td>
                      <td className="px-4 py-3">{row.leadTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </section>

        <section id="faq-ikea-parts" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">FAQ</h2>
            <div className="mt-4">
              <Faq items={faqItems} />
            </div>
          </Reveal>
        </section>

        <section id="sources" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Sources and references</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {references.map((reference) => (
                <li key={reference.href} className="rounded-xl border border-slate-200/70 bg-white/80 px-4 py-3">
                  <cite className="not-italic">
                    <Link href={reference.href} target="_blank" rel="noreferrer" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      {reference.label}
                    </Link>
                  </cite>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        <section className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">Next step</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Want us to assess your IKEA part today?</h2>
              <p className="mt-2 text-slate-700">
                Share photo or file plus context. You get fast feedback on feasibility, material and pricing path.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <ShimmerButton
                  href={contactHref}
                  event={{ action: "cta_click", category: "blog_ikea_en_bottom", label: "contact_prefill" }}
                >
                  Start intake
                </ShimmerButton>
                <Link
                  href={servicesHref}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:border-slate-300 hover:bg-slate-50"
                >
                  View service flow
                </Link>
              </div>
              <div className="mt-4 text-sm text-slate-600">
                Continue reading:{" "}
                {relatedLinks.map((item, index) => (
                  <span key={item.href}>
                    <Link href={item.href} className="font-semibold text-indigo-600 hover:text-indigo-500">
                      {item.label}
                    </Link>
                    {index < relatedLinks.length - 1 ? ", " : "."}
                  </span>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        </section>
      </article>

      <BlogAuthorNote locale="en" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
    </main>
  )
}
