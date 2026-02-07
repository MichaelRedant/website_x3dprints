import type { Metadata } from "next"
import Link from "next/link"
import ContentTableOfContents from "@/components/ContentTableOfContents"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import {
  buildFaqPageSchema,
  buildHowToSchema,
  buildLocalBusinessSchema,
  buildOfferCatalog,
  buildServiceSchema,
  SchemaOfferInput,
} from "@/lib/seo"

export const metadata: Metadata = {
  title: "3D printing in Belgium | Local 3D print service from Herzele",
  description:
    "3D printing for marketing props, tabletop batches and consumer projects. Local FDM studio near Ghent with guidance on design, materials, pricing and workflow.",
  alternates: {
    canonical: "https://www.x3dprints.be/en/3d-printen/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/3d-printen/",
      "en-BE": "https://www.x3dprints.be/en/3d-printen/",
      "x-default": "https://www.x3dprints.be/3d-printen/",
    },
  },
  openGraph: {
    title: "3D printing in Belgium | X3DPrints",
    description:
      "3D printing for marketing materials, tabletop runs and consumers. Local 3D printing from Herzele (between Ghent and Aalst) with a clear workflow and material advice.",
    url: "https://www.x3dprints.be/en/3d-printen/",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "3D printing landing" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: { card: "summary_large_image" },
}

const useCases = [
  {
    title: "Prototypes",
    body:
      "Quick iterations in PLA Matte or PLA Silk. 3D printing with feedback on orientation, wall thickness and tolerances for predictable fit.",
    link: "/en/portfolio",
  },
  {
    title: "Jigs & fixtures",
    body:
      "Functional helpers in PETG for heat and chemical resistance. Typically +/-0.2 mm tolerance and tuned infill on printed tools.",
    link: "/en/services",
  },
  {
    title: "Enclosures",
    body:
      "Custom housings and brackets with a clean finish. 3D prints in matte or silk looks; inserts and fitment on request.",
    link: "/en/materials",
  },
  {
    title: "Marketing props",
    body:
      "Small runs of props, displays and awards in Silk/Marble/Translucent PLA. Prints ready for photo shoots and events.",
    link: "/en/segments/3d-printing-marketing",
  },
]

const focusSegments = [
  {
    title: "Retail & displays",
    description:
      "3D printing for marketing pieces that stand out on shelves, in windows or at events. We print accents, display elements, signage and POS props tailored to your brand and campaign.",
    highlights: [
      "Short runs of logo details, letters and visual cues in PLA Silk/Marble",
      "Stronger PETG parts for outdoor use or exhibitions",
      "Adhesive- and mounting-friendly designs, ready to install",
    ],
    cta: "/en/segments/3d-printing-marketing",
    ctaText: "Marketing cases",
  },
  {
    title: "Tabletop games",
    description:
      "Rich, detailed 3D prints for a niche community. From miniatures and dioramas to tokens, terrain and accessories for your club or Kickstarter.",
    highlights: [
      "Miniatures and terrain in high detail (0.12 mm layers) with PLA Matte or Silk",
      "Dice towers, organisers and upgrades for hobby storage",
      "Short runs, pre-order batches or prototypes with fast follow-up",
    ],
    cta: "/en/segments/3d-printing-tabletop",
    ctaText: "For tabletop",
  },
  {
    title: "Consumers",
    description:
      "Functional parts, recreational gadgets and decorative statements. 3D printing of practical tools, replacement parts, lamps, plant hangers and cosplay props.",
    highlights: [
      "Functional: connectors, holders, tools, prototypes of your own designs",
      "Recreational: game pieces, gifts, gadgets and fandom art",
      "Decorative: light objects, sculptures and statement pieces in colour or translucent",
    ],
    cta: "/en/contact",
    ctaText: "Request advice",
  },
]

const consultationOffers: SchemaOfferInput[] = [
  {
    serviceName: "Marketing & retail advisory call",
    price: "EUR 0",
    description: "Free consult on 3D printing for retail materials or window displays.",
  },
  {
    serviceName: "Tabletop / hobby batch",
    price: "EUR 35",
    description: "Small 3D print runs for tabletop games, including finishing tips.",
  },
  {
    serviceName: "Consumer 3D print advice",
    price: "EUR 0",
    description: "3D printing for consumers, functional or decorative, with material guidance and planning.",
  },
]

const materials = [
  { k: "PLA", v: "Clean and detailed. Ideal for 3D printed prototypes, decor and branding." },
  { k: "PETG", v: "Stronger, more heat resistant and better for outdoor use on printed parts." },
  { k: "TPU", v: "Flexible and shock-absorbing for bumpers, grips and pads." },
]

const pricing = [
  { k: "Small (approx. 5x5x5 cm)", v: "From ~EUR 5 in PLA Matte" },
  { k: "Medium (approx. 10x10x10 cm)", v: "From ~EUR 20 in PLA Matte" },
  { k: "Large (approx. 20x20x20 cm)", v: "From ~EUR 49 in PLA Matte" },
]

const differentiators = [
  {
    title: "Local 3D printing expertise",
    copy:
      "3D printing from Herzele with a direct line to the maker. Fast feedback and transparent planning without ticket systems or anonymous portals.",
  },
  {
    title: "Material advice tailored to you",
    copy:
      "PLA, PETG and TPU in stock; specials like Silk or Marble on request. We help you pick the filament that fits your 3D print.",
  },
  {
    title: "Focus on efficient 3D printing",
    copy:
      "We help optimise your model so you need less support, shorten print time and keep parts stronger. That makes 3D printing faster and cheaper.",
  },
  {
    title: "Conscious approach",
    copy:
      "3D printing with a sustainability mindset: batching jobs, local delivery and waste stream policies. Read more on the FuturePrint Lab page.",
  },
]

const workflow = [
  {
    title: "1) Upload & context",
    detail:
      "Send your STL or STEP file with details on use case, critical dimensions and desired finish. The better the context, the better the print.",
  },
  {
    title: "2) Material + price",
    detail:
      "We match PLA/PETG/TPU to your case and share a proposal within one business day, including rough price and planning.",
  },
  {
    title: "3) Production & checks",
    detail:
      "We print your parts, remove supports and sample-check critical dimensions or fitment where relevant.",
  },
  {
    title: "4) Delivery or pickup",
    detail:
      "Pickup in Herzele or delivery across Flanders. Parcels are packed compactly and safely so your prints arrive intact.",
  },
]

const knowledgeLinks = [
  {
    title: "Filament Friday",
    description: "Weekly deep dives on PLA, PETG, TPU, PC and other 3D printing materials.",
    href: "/en/blog/filament-vrijdag-pla",
  },
  {
    title: "Maker Monday",
    description: "Design and engineering tips on hinges, tolerance and wall thicknesses for FDM printing.",
    href: "/en/blog/maker-monday-fdm-scharnieren",
  },
  {
    title: "Pricing & calculator",
    description: "Transparent breakdown of cost, calculator and examples for 3D printing.",
    href: "/en/pricing",
  },
  {
    title: "Materials library",
    description: "All filaments, colours and FAQs including PC, PETG and PLA Wood cases.",
    href: "/en/materials",
  },
]

const fileChecklist = [
  "STL or STEP file without non-manifold faces or loose shells",
  "Orientation preference and critical dimensions (screw holes, hinge pins)",
  "Info on environment: indoor/outdoor, chemicals, heat (helps pick materials)",
  "Desired finish (matte, silk, translucent) and any post-processing",
  "Deadline or event date so we plan the 3D printing correctly",
]

const faq = [
  {
    q: "Which files work best for 3D printing?",
    a:
      "STL and STEP work best. Add notes on tolerance, application and desired finish for a focused proposal.",
  },
  {
    q: "How fast can I get my 3D prints?",
    a:
      "Typically 2-5 business days after approval, depending on quantity and material. Rush is possible by arrangement, especially for smaller projects.",
  },
  {
    q: "How much does 3D printing cost?",
    a:
      "Small ~EUR 5, medium ~EUR 20, large ~EUR 49 in PLA Matte. These are guidelines; exact cost depends on model, material and print time. See /pricing.",
  },
  {
    q: "Which materials can I choose for 3D printing?",
    a:
      "PLA (matte/silk/marble/wood), PETG and TPU are standard. Other materials on request. We advise which material fits your print best.",
  },
  {
    q: "How large can a printed part be?",
    a:
      "Up to ~35 x 32 x 35 cm in one piece. Larger projects can be split smartly and assembled after printing.",
  },
  {
    q: "Do you serve my region?",
    a:
      "X3DPrints prints from Herzele, between Ghent and Aalst. We ship across Flanders via parcel services or personal delivery, and pickup is possible by appointment.",
  },
  {
    q: "How fast do I get a quote after sending a request?",
    a:
      "Usually within 24 hours on business days. Share STL/STEP, preferred material and deadline so we can return a clear quote and planning faster.",
  },
]

const tocItems = [
  { id: "print-definition", label: "Where can you learn and prepare files?" },
  { id: "print-use-cases", label: "Which use cases are most common?" },
  { id: "print-segments", label: "Who do we print for most?" },
  { id: "print-materials", label: "Which materials and price ranges are available?" },
  { id: "print-differentiators", label: "Why do teams work with X3DPrints?" },
  { id: "print-workflow", label: "How does the workflow run end-to-end?" },
  { id: "print-faq", label: "FAQ on 3D printing" },
  { id: "print-sources", label: "Sources and references" },
]

const references = [
  { label: "ISO/ASTM terminology for additive manufacturing", url: "https://www.astm.org/f2997-13r21.html" },
  { label: "Prusa material guide (PLA, PETG, TPU)", url: "https://help.prusa3d.com/article/material-guide_220" },
  { label: "All3DP FDM process explainer", url: "https://all3dp.com/2/fdm-3d-printing-explained/" },
]

const lastUpdatedLabel = "Last updated: February 6, 2026"

const pageUrl = "https://www.x3dprints.be/en/3d-printen/"

const faqJsonLd = buildFaqPageSchema({
  inLanguage: "en-BE",
  mainEntityOfPage: pageUrl,
  items: faq.map((item) => ({ q: item.q, a: item.a })),
})

const howToJsonLd = buildHowToSchema({
  inLanguage: "en-BE",
  mainEntityOfPage: pageUrl,
  name: "Request 3D printing from X3DPrints",
  description: "Upload STL/STEP, choose material and receive a clear quote with planning.",
  steps: [
    { name: "Share your 3D file", text: "Send STL/STEP with context and critical dimensions." },
    { name: "Get material advice", text: "We propose PLA, PETG or TPU with price impact." },
    { name: "Approve and plan", text: "We align timing, batch size and delivery method." },
    { name: "Production & delivery", text: "We print, check and ship or schedule pickup." },
  ],
  supplyNames: ["STL or STEP file", "Use case, critical dimensions, preferred finish"],
})

const catalogJsonLd = buildOfferCatalog("3D printing packages", consultationOffers)
const localBusinessJsonLd = buildLocalBusinessSchema({
  pageUrl,
  description: metadata.description ?? "",
  areaServed: "BE",
})

const serviceJsonLd = buildServiceSchema(
  "3D printing services",
  consultationOffers,
  pageUrl,
  {
    description: metadata.description ?? "",
    inLanguage: "en-BE",
    mainEntityOfPage: pageUrl,
  },
)

export default function ThreeDPrintingPage() {
  return (
    <main className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[-30%] h-[480px] bg-[radial-gradient(circle_at_top,#0ea5e944,transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute left-[-40%] top-0 h-[360px] w-[520px] rounded-full bg-[radial-gradient(circle,#6366f133,transparent_70%)] blur-3xl" />

      {/* Hero */}
      <section className="px-6 pb-12 pt-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">3D printing in Belgium</p>
            <h1 className="mt-3 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Local 3D printing from Herzele, ready for marketing, tabletop and prototypes.
            </h1>
            <p className="mt-4 max-w-3xl text-lg text-slate-700">
              FDM 3D printing with direct communication. We check your STL/STEP, suggest PLA/PETG/TPU, give realistic timelines and deliver small batches without fuss. Based in Herzele near Ghent/Aalst.
            </p>
            <p className="mt-2 text-xs font-medium uppercase tracking-[0.15em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ShimmerButton
                href="/en/contact?material=pla-matte"
                event={{ action: "cta_click", category: "3d-printing_hero", label: "quote" }}
              >
                Request a quote
              </ShimmerButton>
              <Link
                href="/en/materials#material-suggestion-tool"
                className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
              >
                Material Suggestion Tool
              </Link>
              <Link
                href="/en/portfolio"
                className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
              >
                View portfolio
              </Link>
            </div>
            <ContentTableOfContents title="Contents" items={tocItems} className="mt-6 max-w-2xl" />
          </Reveal>
        </div>
      </section>

      {/* Use cases */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-6 max-w-3xl">
            <h2 id="print-use-cases" className="scroll-mt-28 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">What we 3D print most</h2>
            <p className="mt-2 text-slate-600">
              From prototypes to showpieces. Each case gets the right material mix and a realistic turnaround.
            </p>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2">
            {useCases.map((item) => (
              <Reveal key={item.title}>
                <GlassCard className="h-full p-5">
                  <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{item.body}</p>
                  <Link
                    href={item.link}
                    className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    View examples <span aria-hidden>-&gt;</span>
                  </Link>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Segments */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-6 max-w-3xl">
            <h2 id="print-segments" className="scroll-mt-28 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Who we print for</h2>
            <p className="mt-2 text-slate-600">
              Different needs, different materials. We keep batches small, feedback loops short and planning realistic.
            </p>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {focusSegments.map((segment) => (
              <Reveal key={segment.title}>
                <GlassCard className="h-full p-5">
                  <h3 className="text-lg font-semibold text-slate-900">{segment.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{segment.description}</p>
                  <ul className="mt-3 space-y-1 text-sm text-slate-600">
                    {segment.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2">
                        <span aria-hidden className="mt-1 h-2 w-2 rounded-full bg-indigo-500" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={segment.cta}
                    className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    {segment.ctaText} <span aria-hidden>-&gt;</span>
                  </Link>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Materials & pricing */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-4 lg:grid-cols-2">
            <Reveal>
              <GlassCard className="h-full p-5">
                <h2 id="print-materials" className="scroll-mt-28 text-sm font-semibold text-slate-900">Materials on hand</h2>
                <p className="mt-2 text-sm text-slate-600">
                  We keep core filaments stocked and order specials per project.
                </p>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {materials.map((m) => (
                    <li key={m.k} className="flex items-start gap-2">
                      <span aria-hidden className="mt-1 inline-block h-2 w-2 rounded-full bg-emerald-400" />
                      <span>
                        <strong className="font-semibold text-slate-900">{m.k}.</strong> {m.v}
                      </span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>

            <Reveal delay={0.05}>
              <GlassCard className="h-full p-5">
                <div className="text-sm font-semibold text-slate-900">Indicative pricing</div>
                <p className="mt-2 text-sm text-slate-600">Guidelines for PLA Matte; PETG/TPU priced on request.</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {pricing.map((row) => (
                    <li key={row.k} className="flex items-start gap-2">
                      <span aria-hidden className="mt-1 inline-block h-2 w-2 rounded-full bg-indigo-400" />
                      <span>
                        <strong className="font-semibold text-slate-900">{row.k}.</strong> {row.v}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-3">
                  <ShimmerButton href="/en/pricing">Full pricing & calculator</ShimmerButton>
                  <Link
                    href="/en/materials"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                  >
                    Materials library
                  </Link>
                </div>
              </GlassCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-6 max-w-3xl">
            <h2 id="print-differentiators" className="scroll-mt-28 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Why teams work with us</h2>
            <p className="mt-2 text-slate-600">
              Direct maker contact, honest planning and support that matches the project instead of a script.
            </p>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2">
            {differentiators.map((item) => (
              <Reveal key={item.title}>
                <GlassCard className="h-full p-5">
                  <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{item.copy}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-6 max-w-3xl">
            <h2 id="print-workflow" className="scroll-mt-28 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">How 3D printing works here</h2>
            <p className="mt-2 text-slate-600">Clear steps and communication. You always know where your prints are in the process.</p>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2">
            {workflow.map((step) => (
              <Reveal key={step.title}>
                <GlassCard className="h-full p-5">
                  <h3 className="text-base font-semibold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{step.detail}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Knowledge & checklist */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
            <Reveal>
              <GlassCard className="h-full p-6">
                <h2 id="print-definition" className="scroll-mt-28 text-xl font-semibold text-slate-900">Knowledge base & inspiration</h2>
                <p className="mt-2 text-sm text-slate-600">Articles that help you prep models, budgets and materials.</p>
                <div className="mt-4 grid gap-3">
                  {knowledgeLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="group rounded-xl border border-slate-200/70 bg-white/80 p-4 text-left transition hover:-translate-y-0.5 hover:border-indigo-200/80 hover:shadow-md"
                    >
                      <div className="text-sm font-semibold text-slate-900">{link.title}</div>
                      <p className="mt-1 text-sm text-slate-600">{link.description}</p>
                      <span className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 group-hover:text-indigo-500">
                        Open <span aria-hidden>-&gt;</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </GlassCard>
            </Reveal>

            <Reveal delay={0.08}>
              <GlassCard className="h-full p-6">
                <h2 className="text-xl font-semibold text-slate-900">Checklist for your 3D file</h2>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {fileChecklist.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="relative overflow-hidden rounded-3xl border border-white/30 bg-white/80 px-8 py-10 text-center shadow-xl backdrop-blur sm:text-left">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 via-cyan-400/10 to-sky-400/10" aria-hidden />
              <div className="relative">
                <h2 className="text-balance text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Ready to start 3D printing?
                </h2>
                <p className="mt-3 max-w-3xl text-base text-slate-600">
                  Share your STL/STEP, preferred material and timing. You&apos;ll receive a proposal with planning, pricing and any optimisations for your prints.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <ShimmerButton
                    href="/en/contact?material=pla-matte"
                    event={{ action: "cta_click", category: "3d-printing_cta", label: "call" }}
                  >
                    Book a call
                  </ShimmerButton>
                  <Link
                    href="/en/viewer"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:-translate-y-0.5 hover:bg-white"
                  >
                    Upload STL/STEP
                  </Link>
                </div>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="print-faq" className="scroll-mt-28 px-6 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">FAQ on 3D printing</h2>
              <div className="mt-4 space-y-3 text-sm text-slate-700">
                {faq.map((item) => (
                  <div key={item.q} className="rounded-xl border border-slate-200/70 bg-white/80 p-4">
                    <p className="text-base font-semibold text-slate-900">{item.q}</p>
                    <p className="mt-1 text-slate-700">{item.a}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section id="print-sources" className="scroll-mt-28 px-6 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Sources and references</h2>
              <p className="mt-2 text-sm text-slate-600">
                We use these sources for baseline terminology, FDM process context and material behavior guidance.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {references.map((reference) => (
                  <li key={reference.url} className="rounded-xl border border-slate-200/70 bg-white/80 px-4 py-3">
                    <cite className="not-italic">
                      <Link href={reference.url} target="_blank" rel="noreferrer" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        {reference.label}
                      </Link>
                    </cite>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
    </main>
  )
}

