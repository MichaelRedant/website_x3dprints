import type { Metadata } from "next"
import Link from "next/link"
import Faq from "@/components/Faq"
import GlassCard from "@/components/GlassCard"
import ReadMoreLinks from "@/components/ReadMoreLinks"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import { buildArticleJsonLd, buildFaqPageSchema, buildHowToSchema } from "@/lib/seo"
import BlogAuthorNote from "@/components/BlogAuthorNote"
import BlogContentOverview from "@/components/BlogContentOverview"

const canonical = "https://www.x3dprints.be/en/blog/3d-print-prijzen-gids/"
const datePublished = "2026-02-09"
const dateModified = "2026-02-09"
const pricingHref = "/en/pricing?utm_source=blog&utm_medium=cta&utm_campaign=pricing-guide"
const materialsHref =
  "/en/materials?utm_source=blog&utm_medium=cta&utm_campaign=pricing-guide#material-suggestion-tool"
const viewerHref = "/en/viewer?utm_source=blog&utm_medium=cta&utm_campaign=pricing-guide"
const contactHref =
  "/en/contact?material=pla-matte&quote=Price%20indication%20for%20my%203D%20print"

export const metadata: Metadata = {
  title: "3D print pricing guide 2026: costs & examples | X3DPrints",
  description:
    "Complete 3D print pricing guide for 2026: cost blocks, price ranges per project type and practical tips to lower your price per part.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/3d-print-prijzen-gids/",
      "en-BE": canonical,
      "x-default": "https://www.x3dprints.be/blog/3d-print-prijzen-gids/",
    },
  },
  openGraph: {
    title: "3D print pricing guide 2026",
    description:
      "Cost blocks, price anchors and optimisation tips to keep your 3D print budget on track.",
    url: canonical,
    images: [{ url: "/Logo.webp", width: 1200, height: 630, alt: "3D print pricing guide" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D print pricing guide 2026",
    description: "Price anchors, cost factors and tips to manage your budget.",
    images: ["/Logo.webp"],
  },
}

const costBlocks = [
  {
    title: "Material",
    description:
      "PLA Matte is the baseline for visual parts. PETG, TPU and specials increase cost because of higher spool prices and planning.",
    link: { href: "/en/materials", label: "Explore materials" },
  },
  {
    title: "Print time",
    description:
      "Layer height, infill and supports define machine hours. Higher detail means longer prints and higher cost.",
    link: { href: "/en/pricing", label: "Simulate print time" },
  },
  {
    title: "Setup & preparation",
    description:
      "File checks, slicer settings and support strategy take time, especially for new geometry or prototypes.",
    link: { href: "/en/viewer", label: "Check your model" },
  },
  {
    title: "Post-processing",
    description:
      "Support removal, light finishing and QA are priced per batch. Extra finishing raises the total.",
    link: { href: "/en/contact", label: "Ask about finishing" },
  },
  {
    title: "Logistics & planning",
    description:
      "Pickup in Herzele is the most cost-efficient. Shipping or rush timing shifts the final range.",
    link: { href: "/en/contact", label: "Plan delivery" },
  },
]

const priceAnchors = [
  {
    label: "Prototype",
    size: "1-2 parts, <10 cm",
    material: "PLA Matte",
    printTime: "2-4 hours",
    price: "EUR 10-25",
  },
  {
    label: "Small batch",
    size: "10-25 parts",
    material: "PLA Matte / PETG",
    printTime: "6-12 hours",
    price: "EUR 8-18 per part",
  },
  {
    label: "Branding prop",
    size: "20-30 cm",
    material: "PLA Silk / Marble",
    printTime: "8-14 hours",
    price: "EUR 45-120",
  },
  {
    label: "Functional part",
    size: "10-20 cm",
    material: "PETG / TPU",
    printTime: "5-10 hours",
    price: "EUR 25-60",
  },
]

const optimizationTips = [
  "Batch parts together to share setup cost.",
  "Use high resolution only on visible surfaces that need it.",
  "Reduce supports with smart orientation and gentle chamfers.",
  "Start with PLA Matte and upgrade to PETG/TPU only when required.",
  "Share your deadline early so planning stays efficient.",
]

const segmentHighlights = [
  {
    title: "Prototypes & R&D",
    description:
      "Fast iterations with clear price anchors for product teams and engineers.",
    href: "/en/segments/3d-printing-prototypes",
    label: "View prototype segment",
  },
  {
    title: "Marketing & events",
    description:
      "Branding props and displays with visual materials and tight timelines.",
    href: "/en/segments/3d-printing-marketing",
    label: "View marketing segment",
  },
  {
    title: "Tabletop & hobby",
    description:
      "Miniatures and terrain with detail level and batch pricing aligned to campaigns.",
    href: "/en/segments/3d-printing-tabletop",
    label: "View tabletop segment",
  },
]

const faqItems = [
  {
    q: "Can I get a price without a final file?",
    a: "Yes. Share dimensions, use case and preferred material for a reliable price range.",
  },
  {
    q: "What lowers the price the most?",
    a: "Reducing supports, smart orientation and batching usually have the biggest impact.",
  },
  {
    q: "When do I really need PETG or TPU?",
    a: "When you need outdoor durability, impact resistance or flexible parts.",
  },
  {
    q: "Is there a minimum order value?",
    a: "No. Small prints are possible, but setup costs weigh heavier on single parts.",
  },
]

const references = [
  {
    label: "Ultimaker: Design for FFF 3D printing",
    href: "https://ultimaker.com/learn/design-for-fff-3d-printing/",
  },
  {
    label: "PrusaSlicer G-code viewer (print time)",
    href: "https://help.prusa3d.com/article/g-code-viewer_78984",
  },
  {
    label: "Prusa material guide (PLA, PETG, TPU)",
    href: "https://help.prusa3d.com/filament-material-guide",
  },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "3D print pricing guide 2026",
  description:
    "Overview of cost blocks, price anchors per project type and optimisation tips for 3D printing.",
  datePublished,
  dateModified,
  image: "/Logo.webp",
  inLanguage: "en-BE",
})

const faqJsonLd = buildFaqPageSchema({
  inLanguage: "en-BE",
  mainEntityOfPage: canonical,
  items: faqItems.map((item) => ({ q: item.q, a: item.a })),
})

const howToJsonLd = buildHowToSchema({
  name: "Estimate 3D print pricing in 4 steps",
  description: "Calculate your budget based on material, print time, batch and delivery.",
  inLanguage: "en-BE",
  mainEntityOfPage: canonical,
  totalTime: "PT4M",
  steps: [
    {
      name: "Define use case and size",
      text: "Share the application (prototype, marketing, functional) and the dimensions or volume.",
    },
    {
      name: "Pick the baseline material",
      url: materialsHref,
    },
    {
      name: "Check print time and supports",
      url: viewerHref,
    },
    {
      name: "Request a targeted quote",
      url: contactHref,
    },
  ],
  toolNames: ["X3DPrints pricing calculator", "Material Suggestion Tool"],
  supplyNames: ["STL or STEP file"],
})

export default function BlogPricingGuideEnPage() {
  return (
    <main className="relative overflow-hidden px-6 pb-24 pt-16 sm:px-8 lg:px-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_60%_at_50%_0%,rgba(16,185,129,.18),transparent_70%)]"
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
              <li className="font-medium text-slate-700">3D print pricing guide</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">Pricing pillar</p>
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            3D print pricing guide: what does a print cost in 2026?
          </h1>
          <p className="max-w-3xl text-lg text-slate-700">
            3D print prices start around EUR 10, but the real cost depends on material, print time, batch size and planning.
            This guide gives price anchors, optimisation tips and the fastest route to a quote.
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
            Last updated: 9 February 2026
          </p>
          <div className="flex flex-wrap gap-3">
            <ShimmerButton
              href={pricingHref}
              event={{ action: "cta_click", category: "blog_pricing_guide_top", label: "pricing" }}
            >
              Open pricing calculator
            </ShimmerButton>
            <ShimmerButton
              href={materialsHref}
              className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
              event={{ action: "cta_click", category: "blog_pricing_guide_top", label: "materials_tool" }}
            >
              Pick material
            </ShimmerButton>
            <Link
              href={contactHref}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:border-slate-300 hover:bg-slate-50"
            >
              Request price range
            </Link>
          </div>
        </header>

        <BlogContentOverview locale="en" />

        <section id="price-blocks" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Which cost blocks shape your price?</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {costBlocks.map((block) => (
                <GlassCard key={block.title} className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{block.title}</h3>
                  <p className="mt-2 text-sm text-slate-700">{block.description}</p>
                  <Link
                    href={block.link.href}
                    className="mt-3 inline-flex text-sm font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    {block.link.label}
                  </Link>
                </GlassCard>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="price-anchors" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Price anchors per project type</h2>
              <p className="mt-2 text-sm text-slate-600">
                Indicative ranges based on studio data. Final pricing follows after slicer analysis.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-[720px] text-left text-sm text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-200/70 text-slate-500">
                      <th className="py-2 pr-4 font-semibold">Type</th>
                      <th className="py-2 pr-4 font-semibold">Size</th>
                      <th className="py-2 pr-4 font-semibold">Material</th>
                      <th className="py-2 pr-4 font-semibold">Print time</th>
                      <th className="py-2 pr-4 font-semibold">Price range</th>
                    </tr>
                  </thead>
                  <tbody>
                    {priceAnchors.map((row) => (
                      <tr key={row.label} className="border-b border-slate-200/70 last:border-0">
                        <td className="py-2 pr-4 font-medium text-slate-900">{row.label}</td>
                        <td className="py-2 pr-4">{row.size}</td>
                        <td className="py-2 pr-4">{row.material}</td>
                        <td className="py-2 pr-4">{row.printTime}</td>
                        <td className="py-2 pr-4 font-semibold text-slate-900">{row.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Tip: start with the{" "}
                <Link href={pricingHref} className="font-semibold text-emerald-600 hover:text-emerald-700">
                  pricing calculator
                </Link>{" "}
                for a fast simulation.
              </p>
            </GlassCard>
          </Reveal>
        </section>

        <section id="price-optimisation" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">How do you lower the price per part?</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {optimizationTips.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <ShimmerButton
                  href={pricingHref}
                  event={{ action: "cta_click", category: "blog_pricing_guide_mid", label: "pricing" }}
                >
                  Simulate your cost
                </ShimmerButton>
                <ShimmerButton
                  href={contactHref}
                  className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
                  event={{ action: "cta_click", category: "blog_pricing_guide_mid", label: "contact_prefill" }}
                >
                  Request exact quote
                </ShimmerButton>
              </div>
            </GlassCard>
          </Reveal>
        </section>

        <section id="price-segments" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Where this pricing guide helps most</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {segmentHighlights.map((segment) => (
                <GlassCard key={segment.title} className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{segment.title}</h3>
                  <p className="mt-2 text-sm text-slate-700">{segment.description}</p>
                  <Link
                    href={segment.href}
                    className="mt-3 inline-flex text-sm font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    {segment.label}
                  </Link>
                </GlassCard>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="price-faq" className="scroll-mt-28">
          <Faq title="FAQ about 3D print pricing" items={faqItems} />
        </section>

        <section id="price-sources" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 id="sources" className="text-2xl font-semibold text-slate-900">Sources and references</h2>
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

        <section>
          <Reveal>
            <GlassCard className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Next step</p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900">Ready to refine your price?</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Share your file and use case to receive a price with material advice and planning.
                </p>
              </div>
              <ShimmerButton
                href={contactHref}
                event={{ action: "cta_click", category: "blog_pricing_guide_bottom", label: "contact_prefill" }}
              >
                Start quote
              </ShimmerButton>
            </GlassCard>
          </Reveal>
        </section>
      </article>

      <ReadMoreLinks pageType="pricing" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <BlogAuthorNote locale="en" />
    </main>
  )
}
