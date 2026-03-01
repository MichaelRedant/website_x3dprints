import type { Metadata } from "next"
import Link from "next/link"
import Faq from "@/components/Faq"
import GlassCard from "@/components/GlassCard"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import BlogAuthorNote from "@/components/BlogAuthorNote"
import BlogContentOverview from "@/components/BlogContentOverview"
import { buildArticleJsonLd, buildFaqPageSchema, buildHowToSchema } from "@/lib/seo"

const canonical = "https://www.x3dprints.be/en/blog/retail-pos-3d-printen/"
const nlCanonical = "https://www.x3dprints.be/blog/retail-pos-3d-printen/"
const datePublished = "2026-03-01"
const dateModified = "2026-03-01"
const lastUpdatedLabel = "Last updated: March 1, 2026"

const contactHref =
  "/en/contact?material=PETG&quote=Retail%20POS%203D%20printing%20-%20I%20need%20a%20pilot%20setup"
const pricingHref = "/en/pricing?utm_source=blog&utm_medium=cta&utm_campaign=retail-pos-3d-printing"
const materialsHref = "/en/materials#material-suggestion-tool"
const servicesHref = "/en/services?utm_source=blog&utm_medium=internal&utm_campaign=retail-pos-3d-printing"
const portfolioHref = "/en/portfolio?utm_source=blog&utm_medium=internal&utm_campaign=retail-pos-3d-printing"

export const metadata: Metadata = {
  title: "Retail POS 3D printing: displays and store assets | X3DPrints",
  description:
    "Retail displays and POS assets with 3D printing: practical guide for prototyping, pilot runs, material selection, pricing and lead times.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": nlCanonical,
      "en-BE": canonical,
      "x-default": nlCanonical,
    },
  },
  openGraph: {
    title: "Retail POS 3D printing",
    description:
      "Workflow for retail displays and POS assets: from concept and prototype to small pilot runs.",
    url: canonical,
    images: [{ url: "/images/og-blog-en.svg", width: 1200, height: 630, alt: "Retail POS 3D printing" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Retail POS 3D printing",
    description: "Practical guide for displays, shelf communication and fast pilot runs.",
    images: ["/images/og-blog-en.svg"],
  },
}

const valueCards = [
  {
    title: "Fast validation in real retail context",
    body:
      "Test display concepts directly in shelf or counter environments without long production lead times.",
    href: "/en/blog/use-case-dinsdag-retail-displays",
    label: "Read retail display use-case",
  },
  {
    title: "Phase-based path from concept to pilot",
    body:
      "Start with visual validation, then functional updates, then a controlled pilot run for stores or events.",
    href: "/en/blog/prototyping-kleine-reeksen-3d-printen",
    label: "Read prototyping flow",
  },
  {
    title: "Material aligned with look and use",
    body:
      "POS success is a balance of visual impact, strength, transport and on-site handling.",
    href: "/en/blog/3d-print-materiaal-voor-zichtwerk",
    label: "Read display material guide",
  },
]

const phaseRows = [
  {
    phase: "Concept mock-up",
    goal: "Validate shape and visibility",
    material: "PLA Matte / PLA specials",
    output: "1-3 units",
  },
  {
    phase: "Functional validation",
    goal: "Test mounting, stability and handling",
    material: "PETG / hybrid",
    output: "Small validation batch",
  },
  {
    phase: "Pilot run",
    goal: "Deploy to multiple stores or events",
    material: "Use-case based",
    output: "Small production run",
  },
]

const posTypeRows = [
  {
    type: "Shelf displays",
    need: "Stability + fast mounting",
    material: "PETG or sturdy PLA",
    note: "Great for promo and product highlighting",
  },
  {
    type: "Counter props",
    need: "Visual impact + durability",
    material: "PLA specials or PETG",
    note: "Strong fit for campaigns and activations",
  },
  {
    type: "Signage holders",
    need: "Custom sizing + reuse",
    material: "PETG",
    note: "Useful for frequent messaging updates",
  },
]

const pricingRows = [
  { type: "Prototype POS component", qty: "1-3 units", range: "from EUR 5/unit", leadTime: "2-4 working days" },
  { type: "Validation batch", qty: "5-20 units", range: "geometry-dependent", leadTime: "3-6 working days" },
  { type: "Pilot run", qty: "20+ units", range: "volume-dependent", leadTime: "planned slot" },
]

const intakeChecklist = [
  "Store context or placement photo (shelf, counter, wall, event stand)",
  "POS goal (attention, guidance, product highlight)",
  "Dimensions, mounting method and preferred visual finish",
  "Location count, timeline and desired pilot size",
]

const relatedLinks = [
  { label: "Use Case Tuesday retail displays", href: "/en/blog/use-case-dinsdag-retail-displays" },
  { label: "3D printing marketing events", href: "/en/blog/3d-printing-marketing-events" },
  { label: "3D printing pricing guide", href: "/en/blog/3d-print-prijzen-gids" },
  { label: "3D print portfolio", href: "/en/portfolio" },
]

const faqItems = [
  {
    q: "Is 3D printing suitable for retail displays across multiple locations?",
    a: "Yes, especially for pilot runs and short series before wider rollout decisions.",
  },
  {
    q: "Which materials work best for POS assets?",
    a: "PLA variants are great for visual prototypes; PETG is often better for higher durability.",
  },
  {
    q: "Can we start with a test display first?",
    a: "Yes. This is usually the fastest way to validate shape, look and mounting.",
  },
  {
    q: "How quickly can we get a proposal?",
    a: "Usually within 24 hours with a clear brief and context.",
  },
]

const references = [
  { label: "Prusa filament material guide", href: "https://help.prusa3d.com/filament-material-guide" },
  { label: "Ultimaker design for FFF", href: "https://ultimaker.com/learn/design-for-fff-3d-printing/" },
  { label: "Shopper marketing (POPAI resources)", href: "https://www.popai.com/" },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "Retail POS 3D printing: displays and store assets",
  description:
    "Practical guide for retail POS and display workflows via 3D printing, from concept validation to pilot runs.",
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
  name: "Order retail POS via 3D printing",
  description: "Use a phased workflow from mock-up to pilot run for retail POS assets.",
  inLanguage: "en-BE",
  mainEntityOfPage: canonical,
  totalTime: "PT5M",
  steps: [
    { name: "Define POS objective and location", text: "Map placement, size and campaign context." },
    { name: "Choose material and visual finish", url: materialsHref },
    { name: "Plan prototype and validation batch", url: pricingHref },
    { name: "Start prefilled intake", url: contactHref },
  ],
  toolNames: ["X3DPrints pricing", "Material Suggestion Tool"],
  supplyNames: ["Briefing", "Dimensions", "Reference photos"],
})

export default function RetailPosGuideEnPage() {
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
              <li className="font-medium text-slate-700">Retail POS 3D printing</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">B2B use-cases</p>
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Retail POS 3D printing: displays and store assets
          </h1>
          <p className="max-w-3xl text-lg text-slate-700">
            Short answer: 3D printing is excellent for POS mock-ups, validation displays and pilot runs. You can validate faster in real store context and iterate quickly.
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">{lastUpdatedLabel}</p>
          <div className="flex flex-wrap gap-3">
            <ShimmerButton
              href={contactHref}
              event={{ action: "cta_click", category: "blog_retail_pos_en_top", label: "contact_prefill" }}
            >
              Start POS intake
            </ShimmerButton>
            <ShimmerButton
              href={materialsHref}
              className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
              event={{ action: "cta_click", category: "blog_retail_pos_en_top", label: "materials_tool" }}
            >
              Choose material
            </ShimmerButton>
            <Link
              href={portfolioHref}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:border-slate-300 hover:bg-slate-50"
            >
              View portfolio
            </Link>
          </div>
        </header>

        <BlogContentOverview locale="en" />

        <section id="why-retail-pos-printing" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Why this works for retail POS</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {valueCards.map((card) => (
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

        <section id="retail-pos-phases" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Phased path: mock-up to pilot run</h2>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200/70 bg-white/80">
              <table className="min-w-full text-left text-sm text-slate-700">
                <caption className="sr-only">Phases for retail POS via 3D printing</caption>
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Phase</th>
                    <th className="px-4 py-3">Goal</th>
                    <th className="px-4 py-3">Material</th>
                    <th className="px-4 py-3">Output</th>
                  </tr>
                </thead>
                <tbody>
                  {phaseRows.map((row) => (
                    <tr key={row.phase} className="border-t border-slate-200/60">
                      <td className="px-4 py-3 font-semibold text-slate-900">{row.phase}</td>
                      <td className="px-4 py-3">{row.goal}</td>
                      <td className="px-4 py-3">{row.material}</td>
                      <td className="px-4 py-3">{row.output}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </section>

        <section id="retail-pos-types" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Which POS asset types fit best?</h2>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200/70 bg-white/80">
              <table className="min-w-full text-left text-sm text-slate-700">
                <caption className="sr-only">POS asset types and material recommendations</caption>
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Need</th>
                    <th className="px-4 py-3">Material</th>
                    <th className="px-4 py-3">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {posTypeRows.map((row) => (
                    <tr key={row.type} className="border-t border-slate-200/60">
                      <td className="px-4 py-3 font-semibold text-slate-900">{row.type}</td>
                      <td className="px-4 py-3">{row.need}</td>
                      <td className="px-4 py-3">{row.material}</td>
                      <td className="px-4 py-3">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </section>

        <section id="retail-pos-intake" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">What intake data should you send?</h2>
            <GlassCard className="mt-4 p-6">
              <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
                {intakeChecklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </section>

        <section id="retail-pos-cost" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Cost and planning</h2>
            <p className="mt-2 text-slate-700">
              Planning ranges only. Final pricing depends on geometry, finish and variant count.
            </p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200/70 bg-white/80">
              <table className="min-w-full text-left text-sm text-slate-700">
                <caption className="sr-only">Pricing ranges for retail POS runs</caption>
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Quantity</th>
                    <th className="px-4 py-3">Price range</th>
                    <th className="px-4 py-3">Lead time</th>
                  </tr>
                </thead>
                <tbody>
                  {pricingRows.map((row) => (
                    <tr key={row.type} className="border-t border-slate-200/60">
                      <td className="px-4 py-3 font-semibold text-slate-900">{row.type}</td>
                      <td className="px-4 py-3">{row.qty}</td>
                      <td className="px-4 py-3">{row.range}</td>
                      <td className="px-4 py-3">{row.leadTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </section>

        <section id="faq-retail-pos" className="scroll-mt-28">
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
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Ready to launch a retail POS pilot?</h2>
              <p className="mt-2 text-slate-700">
                Share your brief, target audience and placement context. You get a focused proposal on materials, planning and pilot size.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <ShimmerButton
                  href={contactHref}
                  event={{ action: "cta_click", category: "blog_retail_pos_en_bottom", label: "contact_prefill" }}
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
