import type { Metadata } from "next"
import Link from "next/link"
import Faq from "@/components/Faq"
import GlassCard from "@/components/GlassCard"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import BlogAuthorNote from "@/components/BlogAuthorNote"
import BlogContentOverview from "@/components/BlogContentOverview"
import { buildArticleJsonLd, buildFaqPageSchema, buildHowToSchema } from "@/lib/seo"

const canonical = "https://www.x3dprints.be/en/blog/vervangstuk-huishoudtoestel-3d-printen/"
const nlCanonical = "https://www.x3dprints.be/blog/vervangstuk-huishoudtoestel-3d-printen/"
const datePublished = "2026-03-01"
const dateModified = "2026-03-01"
const lastUpdatedLabel = "Last updated: March 1, 2026"

const contactHref =
  "/en/contact?material=PETG&quote=Appliance%20spare%20part%20replacement%20-%20I%20need%20a%20fit%20check"
const pricingHref =
  "/en/pricing?utm_source=blog&utm_medium=cta&utm_campaign=appliance-spare-part-3d-printing"
const materialsHref = "/en/materials#material-suggestion-tool"
const viewerHref =
  "/en/viewer?utm_source=blog&utm_medium=internal&utm_campaign=appliance-spare-part-3d-printing"
const servicesHref =
  "/en/services?utm_source=blog&utm_medium=internal&utm_campaign=appliance-spare-part-3d-printing"

export const metadata: Metadata = {
  title: "Appliance spare part with 3D printing | X3DPrints",
  description:
    "Broken appliance part? This guide explains when 3D printed replacements work, what intake info matters, and how pricing and lead time are estimated.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": nlCanonical,
      "en-BE": canonical,
      "x-default": nlCanonical,
    },
  },
  openGraph: {
    title: "Appliance spare part replacement with 3D printing",
    description:
      "Practical workflow for broken clips, brackets and covers: intake, material choice and quote path.",
    url: canonical,
    images: [{ url: "/images/og-blog-en.svg", width: 1200, height: 630, alt: "Appliance spare part replacement with 3D printing" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Appliance spare part replacement with 3D printing",
    description: "From broken part to working replacement with a clear intake process.",
    images: ["/images/og-blog-en.svg"],
  },
}

const fitCards = [
  {
    title: "Great for clips, holders and covers",
    body:
      "Functional helper parts in appliances are often ideal for FDM: compact, practical and easy to iterate.",
    href: "/en/blog/kapot-onderdeel-laten-printen",
    label: "Read the base broken-part guide",
  },
  {
    title: "Less suited for food-contact and extreme heat",
    body:
      "Parts under constant high heat or strict certification need extra validation and sometimes another route.",
    href: "/en/blog/hittebestendig-3d-print-materiaal",
    label: "Read heat-resistant material guide",
  },
  {
    title: "Faster than waiting for legacy stock",
    body:
      "For older appliances, original parts are often discontinued. A custom print can reduce downtime fast.",
    href: "/en/blog/3d-printen-op-bestelling",
    label: "View order workflow",
  },
]

const infoChecklist = [
  "Photo of the broken part and mounting context",
  "Critical dimensions: holes, clips, thread zones, locking points",
  "Appliance context: moisture, vibration, cleaning and heat",
  "Target quantity and timeline",
]

const materialRows = [
  {
    zone: "Dry indoor zone",
    material: "PLA Matte",
    why: "Fast and cost-efficient",
    note: "Works for covers and low-load parts",
  },
  {
    zone: "Moist or warmer zone",
    material: "PETG",
    why: "Better moisture and heat behavior",
    note: "Common baseline for functional replacements",
  },
  {
    zone: "Flex or damping required",
    material: "TPU",
    why: "Flexible and shock-absorbing",
    note: "For soft contact points, bumpers or flexible latches",
  },
]

const pricingRows = [
  { type: "Clip or button", size: "~5x5x5 cm", price: "from EUR 5", leadTime: "2-4 working days" },
  { type: "Bracket or adapter", size: "~10x10x10 cm", price: "from EUR 20", leadTime: "2-5 working days" },
  { type: "Larger cover", size: "~20x20x20 cm", price: "from EUR 49", leadTime: "3-6 working days" },
]

const errorList = [
  "Sending only a close-up photo without load or mounting context.",
  "Ignoring nearby heat sources around the part.",
  "Copying geometry 1:1 without tolerance correction for FDM.",
  "Comparing prices without accounting for material, layer height and planning.",
]

const relatedGuides = [
  { label: "How to choose the right 3D print material", href: "/en/blog/juiste-3d-print-materiaal" },
  { label: "3D print price per part", href: "/en/blog/3d-print-prijs-per-stuk" },
  { label: "How long does 3D printing take?", href: "/en/blog/hoe-lang-duurt-3d-printen" },
  { label: "How to request a 3D print quote", href: "/en/blog/3d-print-offerte-aanvragen" },
]

const faqItems = [
  {
    q: "Can you start from just a photo?",
    a: "Often yes for initial feasibility. Critical dimensions are still required for a reliable final fit.",
  },
  {
    q: "Is PETG always better than PLA for appliances?",
    a: "Not always. PLA can be fine in dry low-heat zones. PETG becomes more valuable when moisture or heat rises.",
  },
  {
    q: "How quickly can I get pricing and lead time?",
    a: "Usually within 24 hours when context is complete or STL/STEP is available.",
  },
  {
    q: "Can you scale to multiple units after fit check?",
    a: "Yes. Once fit is confirmed we can run repeatable settings for a small batch.",
  },
]

const references = [
  { label: "Prusa filament material guide", href: "https://help.prusa3d.com/filament-material-guide" },
  { label: "iFixit repair guides", href: "https://www.ifixit.com/Guide" },
  { label: "Ultimaker design for FFF", href: "https://ultimaker.com/learn/design-for-fff-3d-printing/" },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "Appliance spare part replacement with 3D printing",
  description:
    "Practical guide for appliance spare part replacement with intake, material selection, price ranges and lead times.",
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
  name: "Get an appliance spare part 3D printed",
  description: "Move from broken part to a working replacement in four clear intake steps.",
  inLanguage: "en-BE",
  mainEntityOfPage: canonical,
  totalTime: "PT4M",
  steps: [
    { name: "Share photo and dimensions", text: "Send a photo, key dimensions and appliance context." },
    { name: "Validate model or reference", url: viewerHref },
    { name: "Pick material and pricing path", url: pricingHref },
    { name: "Submit prefilled request", url: contactHref },
  ],
  toolNames: ["X3DPrints viewer", "Material Suggestion Tool", "X3DPrints pricing"],
  supplyNames: ["Photo or STL/STEP", "Dimensions", "Use context"],
})

export default function ApplianceSparePartEnPage() {
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
              <li className="font-medium text-slate-700">Appliance spare part replacement</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">Practical problems</p>
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            3D printed appliance spare part replacement
          </h1>
          <p className="max-w-3xl text-lg text-slate-700">
            Short answer: this often works well for broken clips, brackets and covers. With correct intake details you can usually move quickly toward a working fit test.
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">{lastUpdatedLabel}</p>
          <div className="flex flex-wrap gap-3">
            <ShimmerButton
              href={contactHref}
              event={{ action: "cta_click", category: "blog_appliance_spare_en_top", label: "contact_prefill" }}
            >
              Start spare-part intake
            </ShimmerButton>
            <ShimmerButton
              href={materialsHref}
              className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
              event={{ action: "cta_click", category: "blog_appliance_spare_en_top", label: "materials_tool" }}
            >
              Choose material
            </ShimmerButton>
            <Link
              href={pricingHref}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:border-slate-300 hover:bg-slate-50"
            >
              View price range
            </Link>
          </div>
        </header>

        <BlogContentOverview locale="en" />

        <section id="when-this-works" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">When is this a good approach?</h2>
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

        <section id="intake-checklist" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">What intake data gives the best result?</h2>
            <GlassCard className="mt-4 p-6">
              <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
                {infoChecklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                Need extra context first? Read{" "}
                <Link href="/en/blog/kapot-onderdeel-laten-printen" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  the broken-part base guide
                </Link>{" "}
                and{" "}
                <Link href="/en/blog/3d-print-offerte-aanvragen" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  the quote workflow guide
                </Link>
                .
              </p>
            </GlassCard>
          </Reveal>
        </section>

        <section id="material-selection" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Material choice by appliance zone</h2>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200/70 bg-white/80">
              <table className="min-w-full text-left text-sm text-slate-700">
                <caption className="sr-only">Material selection for appliance spare part replacement</caption>
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Zone</th>
                    <th className="px-4 py-3">Material</th>
                    <th className="px-4 py-3">Why</th>
                    <th className="px-4 py-3">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {materialRows.map((row) => (
                    <tr key={row.zone} className="border-t border-slate-200/60">
                      <td className="px-4 py-3 font-semibold text-slate-900">{row.zone}</td>
                      <td className="px-4 py-3">{row.material}</td>
                      <td className="px-4 py-3">{row.why}</td>
                      <td className="px-4 py-3">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              For deeper material logic per use case, read{" "}
              <Link href="/en/blog/juiste-3d-print-materiaal" className="font-semibold text-indigo-600 hover:text-indigo-500">
                the material selection guide
              </Link>
              .
            </p>
          </Reveal>
        </section>

        <section id="price-and-lead-time" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Price and lead-time snapshot</h2>
            <p className="mt-2 text-slate-700">
              Planning ranges only. Final quote follows after file and context review, similar to{" "}
              <Link href="/en/blog/3d-print-prijs-per-stuk" className="font-semibold text-indigo-600 hover:text-indigo-500">
                this pricing guide
              </Link>
              .
            </p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200/70 bg-white/80">
              <table className="min-w-full text-left text-sm text-slate-700">
                <caption className="sr-only">Price range for appliance spare part replacement</caption>
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Size</th>
                    <th className="px-4 py-3">Baseline price</th>
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

        <section id="costly-mistakes" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Mistakes that delay projects</h2>
            <GlassCard className="mt-4 p-6">
              <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
                {errorList.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                For realistic scheduling, also read{" "}
                <Link href="/en/blog/hoe-lang-duurt-3d-printen" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  how long 3D printing takes
                </Link>
                .
              </p>
            </GlassCard>
          </Reveal>
        </section>

        <section id="faq-appliance" className="scroll-mt-28">
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
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                Want us to assess your appliance spare part?
              </h2>
              <p className="mt-2 text-slate-700">
                Share photo or file, context and timing. You get fast feedback on feasibility, material path and pricing baseline.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <ShimmerButton
                  href={contactHref}
                  event={{ action: "cta_click", category: "blog_appliance_spare_en_bottom", label: "contact_prefill" }}
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
                {relatedGuides.map((guide, index) => (
                  <span key={guide.href}>
                    <Link href={guide.href} className="font-semibold text-indigo-600 hover:text-indigo-500">
                      {guide.label}
                    </Link>
                    {index < relatedGuides.length - 1 ? ", " : "."}
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
