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

const canonical = "https://www.x3dprints.be/en/blog/3d-print-offerte-aanvragen/"
const datePublished = "2026-02-08"
const dateModified = "2026-02-09"
const pricingHref = "/en/pricing?utm_source=blog&utm_medium=cta&utm_campaign=quote-checklist"
const materialsHref = "/en/materials?utm_source=blog&utm_medium=cta&utm_campaign=quote-checklist#material-suggestion-tool"
const viewerHref = "/en/viewer?utm_source=blog&utm_medium=cta&utm_campaign=quote-checklist"
const contactHref = "/en/contact?material=pla-matte&quote=Quote%20request%20for%20my%203D%20print"
const pricingGuideHref =
  "/en/blog/3d-print-prijzen-gids?utm_source=blog&utm_medium=internal&utm_campaign=quote-checklist"

export const metadata: Metadata = {
  title: "3D print quote request: fast checklist | X3DPrints",
  description:
    "Request a 3D print quote faster with this checklist: file, dimensions, material, quantities and deadline, plus a pricing example and planning tips.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/3d-print-offerte-aanvragen/",
      "en-BE": canonical,
      "x-default": "https://www.x3dprints.be/blog/3d-print-offerte-aanvragen/",
    },
  },
  openGraph: {
    title: "3D print quote request: fast checklist",
    description:
      "Checklist for a fast 3D print quote with the right input, pricing breakdown and planning tips.",
    url: canonical,
    images: [{ url: "/images/og-blog-en.svg", width: 1200, height: 630, alt: "3D print quote request" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D print quote request: fast checklist",
    description: "Input checklist, pricing breakdown and planning tips for quick quotes.",
    images: ["/images/og-blog-en.svg"],
  },
}

const intakeCards = [
  {
    title: "File + version",
    description:
      "STL or STEP with a clear filename. This lets us estimate volume, supports and print time immediately.",
    link: { label: "Upload in the 3D viewer", href: viewerHref },
  },
  {
    title: "Dimensions + quantities",
    description:
      "Sizes in mm and the amount you need drive batch planning, scale benefits and lead time.",
    link: { label: "View pricing calculator", href: pricingHref },
  },
  {
    title: "Material + use case",
    description:
      "PLA Matte for display, PETG for outdoor use and TPU for flexibility. Not sure? We advise.",
    link: { label: "Material Suggestion Tool", href: materialsHref },
  },
  {
    title: "Deadline + delivery",
    description:
      "Tell us when it must be ready and whether you pick up in Herzele or need shipping.",
    link: { label: "Request planning advice", href: contactHref },
  },
]

const checklistRows = [
  {
    label: "File type",
    reason: "Determines whether we can slice immediately or need optimization first.",
    example: "STL/STEP + version (v2.1)",
  },
  {
    label: "Dimensions",
    reason: "Helps estimate volume, print time and bed configuration.",
    example: "120 x 80 x 40 mm",
  },
  {
    label: "Quantity",
    reason: "Enables batch planning, cost per part and material usage.",
    example: "1 prototype + 10 pieces",
  },
  {
    label: "Material & colour",
    reason: "Material determines cost, strength and post-processing.",
    example: "PLA Matte black or PETG Solid",
  },
  {
    label: "Deadline & delivery",
    reason: "Sets priority, planning and logistics.",
    example: "Deadline March 15, pickup Herzele",
  },
]

const pricingRows = [
  {
    label: "Model analysis",
    detail: "Slicer setup, support strategy and batch planning.",
    range: "EUR 0-25",
  },
  {
    label: "Print time",
    detail: "Machine hours based on layer height, infill and supports.",
    range: "EUR 5-45",
  },
  {
    label: "Material",
    detail: "PLA, PETG or TPU with corresponding spool cost.",
    range: "EUR 3-20",
  },
  {
    label: "Post-processing",
    detail: "Support removal, light cleanup and quality checks.",
    range: "EUR 0-15",
  },
  {
    label: "Delivery",
    detail: "Pickup, shipping or custom delivery.",
    range: "EUR 0-12",
  },
]

const speedTips = [
  "Share STEP if you still expect changes; STL is fine for final production.",
  "State the deadline explicitly so we can schedule faster.",
  "Use the Material Suggestion Tool if you are unsure about PLA, PETG or TPU.",
  "Bundle parts that must arrive together into one request.",
]

const faqItems = [
  {
    q: "Can I get a quote without a final material choice?",
    a: "Yes. Share your application and we propose a baseline material plus an alternative for outdoor, heat or flexibility.",
  },
  {
    q: "How fast do I get a reply?",
    a: "Usually within 1 business day after receiving an STL/STEP file and the core checklist info.",
  },
  {
    q: "What if my file contains errors?",
    a: "We flag issues such as non-manifold edges or thin walls and propose a fix.",
  },
  {
    q: "Can repeat orders be priced faster?",
    a: "Yes. Once we have a reference profile, follow-up orders are easier to budget and schedule.",
  },
]

const references = [
  {
    label: "PrusaSlicer G-code viewer: print time analysis",
    href: "https://help.prusa3d.com/article/g-code-viewer_78984",
  },
  {
    label: "Ultimaker: Design for FFF 3D printing",
    href: "https://ultimaker.com/learn/design-for-fff-3d-printing/",
  },
  {
    label: "Bambu Studio documentation",
    href: "https://wiki.bambulab.com/en/software/bambu-studio",
  },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "3D print quote request: fast checklist",
  description:
    "Checklist with intake input, pricing breakdown and planning tips so you receive a 3D print quote faster.",
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
  name: "Requesting a 3D print quote in 4 steps",
  description:
    "Get a fast 3D print quote by sharing your file, dimensions, material and deadline.",
  inLanguage: "en-BE",
  mainEntityOfPage: canonical,
  totalTime: "PT4M",
  steps: [
    {
      name: "Upload your file",
      text: "Send STL or STEP with a clear filename and version.",
      url: viewerHref,
    },
    {
      name: "Describe dimensions and quantities",
      text: "Provide the size in mm and the number of parts you need.",
    },
    {
      name: "Pick material or ask for advice",
      url: materialsHref,
    },
    {
      name: "Confirm deadline and delivery",
      url: contactHref,
    },
  ],
  toolNames: ["X3DPrints 3D viewer", "Pricing calculator", "Material Suggestion Tool"],
  supplyNames: ["STL or STEP file", "Dimensions and quantities"],
})

export default function BlogQuoteRequestPage() {
  return (
    <main className="relative overflow-hidden px-6 pb-24 pt-16 sm:px-8 lg:px-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_60%_at_50%_0%,rgba(14,165,233,.18),transparent_70%)]"
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
              <li className="font-medium text-slate-700">Quote request</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-600">Pricing guide</p>
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            3D print quote request: fast checklist
          </h1>
          <p className="max-w-3xl text-lg text-slate-700">
            Short answer: quotes move faster when you share your file, dimensions, material, quantity and deadline right away.
            This checklist shows what we need, how pricing is built and how you can schedule quickly.
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
            Last updated: 9 February 2026
          </p>
          <div className="flex flex-wrap gap-3">
            <ShimmerButton
              href={pricingHref}
              event={{ action: "cta_click", category: "blog_offerte_top", label: "pricing" }}
            >
              Open pricing calculator
            </ShimmerButton>
            <ShimmerButton
              href={materialsHref}
              className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
              event={{ action: "cta_click", category: "blog_offerte_top", label: "materials_tool" }}
            >
              Pick material
            </ShimmerButton>
            <Link
              href={contactHref}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:border-slate-300 hover:bg-slate-50"
            >
              Start quote
            </Link>
          </div>
        </header>

        <BlogContentOverview locale="en" />

        <section id="offerte-input" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Which info speeds up your quote?</h2>
            <p className="mt-2 text-sm text-slate-600">
              The more complete your intake, the faster we can deliver an accurate estimate.
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {intakeCards.map((card) => (
                <GlassCard key={card.title} className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
                  <p className="mt-2 text-sm text-slate-700">{card.description}</p>
                  <Link
                    href={card.link.href}
                    className="mt-3 inline-flex text-sm font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    {card.link.label}
                  </Link>
                </GlassCard>
              ))}
            </div>
            <GlassCard className="mt-6 p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-slate-900">Checklist: input vs impact</h3>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-[640px] text-left text-sm text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-200/70 text-slate-500">
                      <th className="py-2 pr-4 font-semibold">Input</th>
                      <th className="py-2 pr-4 font-semibold">Why we need it</th>
                      <th className="py-2 pr-4 font-semibold">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    {checklistRows.map((row) => (
                      <tr key={row.label} className="border-b border-slate-200/70 last:border-0">
                        <td className="py-2 pr-4 font-medium text-slate-900">{row.label}</td>
                        <td className="py-2 pr-4">{row.reason}</td>
                        <td className="py-2 pr-4">{row.example}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Tip: include a reference photo or sketch if this is a functional part.
              </p>
            </GlassCard>
          </Reveal>
        </section>

        <section id="offerte-voorbeeld" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Pricing breakdown with realistic cost blocks</h2>
              <p className="mt-2 text-sm text-slate-600">
                Reference pricing helps you budget, but the exact price comes after slicer analysis of your file.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-[640px] text-left text-sm text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-200/70 text-slate-500">
                      <th className="py-2 pr-4 font-semibold">Cost block</th>
                      <th className="py-2 pr-4 font-semibold">What you get</th>
                      <th className="py-2 pr-4 font-semibold">Price range</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricingRows.map((row) => (
                      <tr key={row.label} className="border-b border-slate-200/70 last:border-0">
                        <td className="py-2 pr-4 font-medium text-slate-900">{row.label}</td>
                        <td className="py-2 pr-4">{row.detail}</td>
                        <td className="py-2 pr-4 font-semibold text-slate-900">{row.range}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                For live simulations, you can always use the{" "}
                <Link href="/en/pricing" className="font-semibold text-emerald-600 hover:text-emerald-700">
                  pricing calculator
                </Link>
                .
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Need the full breakdown? Read the{" "}
                <Link href={pricingGuideHref} className="font-semibold text-emerald-600 hover:text-emerald-700">
                  3D print pricing guide
                </Link>
                .
              </p>
            </GlassCard>
          </Reveal>
        </section>

        <section id="offerte-snelheid" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Tips to plan faster</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {speedTips.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <ShimmerButton
                  href={viewerHref}
                  event={{ action: "cta_click", category: "blog_offerte_mid", label: "viewer" }}
                >
                  Upload file
                </ShimmerButton>
                <ShimmerButton
                  href={contactHref}
                  className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
                  event={{ action: "cta_click", category: "blog_offerte_mid", label: "contact_prefill" }}
                >
                  Request quote
                </ShimmerButton>
              </div>
            </GlassCard>
          </Reveal>
        </section>

        <section id="offerte-faq" className="scroll-mt-28">
          <Faq title="FAQ about requesting a 3D print quote" items={faqItems} />
        </section>

        <section id="offerte-sources" className="scroll-mt-28">
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
                <h2 className="mt-2 text-xl font-semibold text-slate-900">Ready for a fast quote?</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Share your file and planning, and we will send a clear price with material advice.
                </p>
              </div>
              <ShimmerButton
                href={contactHref}
                event={{ action: "cta_click", category: "blog_offerte_bottom", label: "contact_prefill" }}
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
