import Link from "next/link"
import type { Metadata } from "next"

import Reveal from "@/components/Reveal"
import Faq from "@/components/Faq"
import GlassOrb from "@/components/GlassOrb"
import ShimmerButton from "@/components/ShimmerButton"
import GlassCard from "@/components/GlassCard"
import ContentTableOfContents from "@/components/ContentTableOfContents"
import { servicesFaqEn } from "@/content/services-faq"
import { buildFaqPageSchema } from "@/lib/seo"

export const revalidate = 86_400 // 24h cache
export const metadata: Metadata = {
  title: "3D printing FAQ | X3DPrints",
  description: "FAQ on 3D printing, lead times, materials (PLA, PETG, TPU), finishing and workflow. With local info for Herzele, Ghent, Antwerp and East Flanders.",
  alternates: {
    canonical: "https://www.x3dprints.be/en/faq/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/faq/",
      "en-BE": "https://www.x3dprints.be/en/faq/",
      "x-default": "https://www.x3dprints.be/faq/",
    },
  },
  robots: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  openGraph: {
    title: "3D printing FAQ | X3DPrints",
    description: "All about 3D printing: materials, lead times, pricing, finishing and workflow.",
    url: "https://www.x3dprints.be/en/faq/",
    siteName: "X3DPrints",
    type: "website",
    locale: "en_BE",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "FAQ 3D printing" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "3D printing FAQ | X3DPrints",
    description: "Answers on 3D printing, materials and shipping. Clear and concise.",
    images: ["/images/og-home.jpg"],
  },
  keywords: [
    "3D printing FAQ",
    "3D print service Belgium",
    "PLA PETG TPU lead time",
    "rapid prototyping Ghent",
    "3D printing Antwerp",
  ],
}

export default function Page() {
  const extraFaq = [
    {
      q: "Do you work with consumers?",
      a: "Yes. Consumers, associations, schools and businesses can order single parts or small to large batches. Start via <a href=\"/en/contact\">/contact</a>.",
    },
    {
      q: "Why do I need to fill the request form?",
      a: "It captures material, quantities, finish and use case in one go so we can quote quickly without back-and-forth.",
    },
    {
      q: "How does a project run from request to delivery?",
      a: "We check your STL/STEP, send a proposal, do a test print if needed and schedule production. You get updates until delivery or pickup in Herzele.",
    },
    {
      q: "Can you create or adjust a 3D model?",
      a: "Yes. From sketches/photos/reference parts we create a print-ready 3D model. Ask via <a href=\"/en/contact\">/contact</a>.",
    },
    {
      q: "Where can I find 3D models to print?",
      a: "See the guide <a href=\"/en/3d-modellen-vinden\">Find 3D models</a> with links to Printables, MakerWorld, Thingiverse, MyMiniFactory, Cults and Thangs plus tips on scale and printability.",
    },
    {
      q: "Do you offer 3D scanning?",
      a: "No, but with clear photos, measurements or a sample we can model and prep for print.",
    },
    { q: "Typical response time?", a: "Usually within one business day. If urgent, mention your deadline and we’ll explore rush options." },
    { q: "What does AM mean?", a: "Additive Manufacturing: building parts layer by layer from a 3D model." },
    { q: "What is FDM?", a: "FDM extrudes molten filament layer by layer. Strong and cost-effective for prototypes and functional parts." },
    { q: "What is SLA?", a: "SLA cures liquid resin with a UV laser. Very high accuracy and smooth surfaces." },
    {
      q: "Which shipping options?",
      a: "Pickup by appointment, local delivery or Bpost. Rush by arrangement. Add your city/district at <a href=\"/en/contact\">/contact</a>.",
    },
    { q: "Where to see examples?", a: "See <a href=\"/en/portfolio\">/portfolio</a> for prototypes, minis and functional parts." },
    { q: "Do you deliver in Ghent, Aalst or Antwerp?", a: "Yes. From Herzele we deliver across East Flanders, Dender and Antwerp. See <a href=\"/en/segments\">/segments</a> and <a href=\"/en/locaties\">/locaties</a>." },
    { q: "Can I view materials?", a: "Check <a href=\"/en/materials\">/materials</a> for colours/guides. On request we share recent samples in PLA Matte, PETG or TPU." },
    { q: "How do you optimise strength?", a: "We set layer height, infill, orientation and wall thickness for the loads. PETG or TPU for functional parts; PLA Matte for aesthetics." },
    { q: "Do you have an STL/STEP viewer?", a: "Yes, <a href=\"/en/viewer\">/viewer</a> lets you check orientation/scale. Note your preference in the request." },
    { q: "How do you handle AI-generated models?", a: "We check manifold, wall thickness and overhangs. We repair files when needed so they print cleanly." },
    { q: "Do you deliver on site?", a: "Yes. Provide your city/district and we plan EV delivery, courier or Bpost. Pickup in Herzele/Ghent is possible." },
    { q: "What exactly is 3D printing?", a: "Digital manufacturing building objects layer by layer from STL/STEP. We explain the process in the <a href=\"/en/blog\">blog</a>." },
    {
      q: "Which materials do you offer?",
      a: "PLA, PETG and TPU are standard. PLA for detail, PETG for strength/heat, TPU for flexibility. Details on <a href=\"/en/materials\">/materials</a>.",
    },
    { q: "Can I supply my own file?", a: "Yes. Upload STL/STEP via <a href=\"/en/contact\">/contact</a> or double-check with the <a href=\"/en/viewer\">viewer</a>." },
    { q: "How fast can you deliver?", a: "Typically 2-5 business days depending on complexity and volume. Rush possible on request via <a href=\"/en/contact\">/contact</a>." },
    {
      q: "What does a 3D print cost?",
      a: "Price = material + print time + finishing. Use the calculator on <a href=\"/en/pricing\">/pricing</a> for an estimate; final after model check.",
    },
    {
      q: "Can I print multiple pieces?",
      a: "Yes, from single parts to short runs. Larger volumes get tiered pricing; ask via <a href=\"/en/pricing\">/pricing</a> or <a href=\"/en/contact\">/contact</a>.",
    },
    { q: "Is 3D printing suitable for functional parts?", a: "Yes. PETG and TPU for load-bearing or flexible parts. We align orientation/infill with forces." },
    {
      q: "Do you offer post-processing?",
      a: "We remove supports and deburr lightly. For sanding, paint or assembly we work with partners; mention it in your request.",
    },
    { q: "Which sectors use your prints?", a: "SMEs, education, makers, automotive, marketing, architecture. See <a href=\"/en/segments\">/segments</a>." },
    { q: "What if my model has errors?", a: "We detect and repair minor issues. For larger problems we advise best options or CAD fixes." },
    { q: "Max print size?", a: "Up to ~35 x 32 x 35 cm in one piece. Larger by splitting and assembling; we align this upfront." },
    {
      q: "Can you recreate/replace parts?",
      a: "Yes, with measurements or a reference part. We model in Fusion 360/Tinkercad and deliver a printable file plus a plan.",
    },
  ]
  const combinedFaq = [...servicesFaqEn, ...extraFaq]
  const tocItems = [
    { id: "faq-core", label: "Core 3D printing FAQ" },
    { id: "faq-more", label: "Extra questions and answers" },
    { id: "faq-cta", label: "How to start your request" },
    { id: "faq-sources", label: "Sources and references" },
  ]
  const references = [
    { label: "ISO/ASTM 52900 additive manufacturing terminology", url: "https://www.astm.org/f2997-13r21.html" },
    { label: "Prusa material guide (PLA, PETG, TPU)", url: "https://help.prusa3d.com/filament-material-guide" },
    { label: "Autodesk additive manufacturing overview", url: "https://www.autodesk.com/solutions/additive-manufacturing/what-is-additive-manufacturing" },
  ]
  const lastUpdatedLabel = "Last updated: February 6, 2026"
  const faqJsonLd = buildFaqPageSchema({
    inLanguage: "en-BE",
    mainEntityOfPage: "https://www.x3dprints.be/en/faq/",
    items: combinedFaq,
  })

  return (
    <main className="relative overflow-hidden px-6 py-14 sm:px-8 lg:px-12">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_120%_at_20%_20%,rgba(79,70,229,0.08),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.08]" />

      <section className="mx-auto max-w-6xl">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600">FAQ</p>
            <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Frequently asked questions on 3D printing.
            </h1>
            <p className="text-lg text-slate-700">
              Answers on materials, pricing, lead times, finishing and how we handle your STL/STEP. Based in Herzele (Ghent region) with delivery across Flanders.
            </p>
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="flex flex-wrap gap-3">
              <ShimmerButton href="/en/contact">Request a quote</ShimmerButton>
              <Link
                href="/en/pricing"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm"
              >
                Pricing & calculator
              </Link>
            </div>
            <ContentTableOfContents title="Contents" items={tocItems} className="max-w-xl" />
          </div>
          <div className="flex justify-end">
            <GlassOrb className="h-40 w-40 opacity-70" />
          </div>
        </div>
      </section>

      <section id="faq-core" className="scroll-mt-28 mx-auto mt-10 max-w-6xl">
        <Reveal>
          <GlassCard className="p-6 sm:p-8">
            <Faq title="Core FAQ" items={servicesFaqEn} />
          </GlassCard>
        </Reveal>
      </section>

      <section id="faq-more" className="scroll-mt-28 mx-auto mt-10 max-w-6xl">
        <Reveal>
          <GlassCard className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-slate-900">More questions</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-700">
              {extraFaq.map((item) => (
                <div key={item.q} className="rounded-xl border border-slate-200/70 bg-white/80 p-4">
                  <p className="text-base font-semibold text-slate-900">{item.q}</p>
                  <p className="mt-1 text-slate-700" dangerouslySetInnerHTML={{ __html: item.a }} />
                </div>
              ))}
            </div>
          </GlassCard>
        </Reveal>
      </section>

      <section id="faq-cta" className="scroll-mt-28 mx-auto mt-12 max-w-6xl">
        <Reveal>
          <GlassCard className="overflow-hidden border-white/40 bg-gradient-to-br from-white/80 to-white/50 p-8 shadow-xl ring-1 ring-white/60">
            <div className="grid gap-6 sm:grid-cols-[1.1fr_.9fr] sm:items-center">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Ready to start?</h2>
                <p className="mt-2 text-sm text-slate-700">
                  Share your STL/STEP, desired material and timing. We’ll send a clear proposal with planning and any optimisations.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <ShimmerButton href="/en/contact">Request a quote</ShimmerButton>
                  <Link
                    href="/en/materials"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20"
                  >
                    Materials library
                  </Link>
                </div>
              </div>
              <div className="justify-self-end">
                <GlassOrb className="h-32 w-32 opacity-90" />
              </div>
            </div>
          </GlassCard>
        </Reveal>
      </section>

      <section id="faq-sources" className="scroll-mt-28 mx-auto mt-10 max-w-6xl">
        <Reveal>
          <GlassCard className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-slate-900">Sources and references</h2>
            <p className="mt-2 text-sm text-slate-600">
              These references guide terminology and material recommendations across this FAQ page.
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
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </main>
  )
}
