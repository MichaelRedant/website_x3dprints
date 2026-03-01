import type { Metadata } from "next"
import Link from "next/link"
import Faq from "@/components/Faq"
import GlassCard from "@/components/GlassCard"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import BlogAuthorNote from "@/components/BlogAuthorNote"
import BlogContentOverview from "@/components/BlogContentOverview"
import { buildArticleJsonLd, buildFaqPageSchema, buildHowToSchema } from "@/lib/seo"

const canonical = "https://www.x3dprints.be/en/blog/kabelmanagement-3d-printen/"
const nlCanonical = "https://www.x3dprints.be/blog/kabelmanagement-3d-printen/"
const datePublished = "2026-03-01"
const dateModified = "2026-03-01"
const lastUpdatedLabel = "Last updated: March 1, 2026"

const contactHref =
  "/en/contact?material=TPU&quote=3D%20printed%20cable%20management%20-%20I%20need%20a%20practical%20setup"
const pricingHref = "/en/pricing?utm_source=blog&utm_medium=cta&utm_campaign=cable-management-3d-printing"
const materialsHref = "/en/materials#material-suggestion-tool"
const servicesHref = "/en/services?utm_source=blog&utm_medium=internal&utm_campaign=cable-management-3d-printing"
const viewerHref = "/en/viewer?utm_source=blog&utm_medium=internal&utm_campaign=cable-management-3d-printing"

export const metadata: Metadata = {
  title: "3D printed cable management: practical guide | X3DPrints",
  description:
    "Need cleaner cable routing? This guide covers material selection, design rules, pricing ranges and intake for custom clips, guides and sleeves.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": nlCanonical,
      "en-BE": canonical,
      "x-default": nlCanonical,
    },
  },
  openGraph: {
    title: "3D printed cable management",
    description:
      "Practical workflow for custom cable clips, sleeves and holders with clear intake and quote path.",
    url: canonical,
    images: [{ url: "/images/og-blog-en.svg", width: 1200, height: 630, alt: "3D printed cable management" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D printed cable management",
    description: "Practical guide with tables, FAQ and direct CTA flow.",
    images: ["/images/og-blog-en.svg"],
  },
}

const useCards = [
  {
    title: "Workshop and desk setups",
    body:
      "Cable clips, channel mounts and routing plates keep your setup cleaner and easier to maintain.",
    href: "/en/blog/tool-organizers-3d-printing",
    label: "Read tool organizers guide",
  },
  {
    title: "Events and retail installs",
    body:
      "For temporary setups, modular clips and cable guides are ideal, especially with quick iteration cycles.",
    href: "/en/blog/use-case-dinsdag-events",
    label: "Read events use-case",
  },
  {
    title: "Technical projects",
    body:
      "For sensor mounts and cable strain relief, PETG plus TPU is often the most practical combination.",
    href: "/en/blog/juiste-3d-print-materiaal",
    label: "Read material guide",
  },
]

const designRules = [
  {
    part: "Cable clip (rigid)",
    material: "PETG",
    rule: "Add rounded inside radius and slight fit tolerance",
    note: "Best for fixed routing",
  },
  {
    part: "Cable clip (flex)",
    material: "TPU",
    rule: "Use wider clamp zone and lower pressure points",
    note: "Better for repeated open/close cycles",
  },
  {
    part: "Sleeve / passthrough",
    material: "TPU",
    rule: "Add gentle taper for easier insertion",
    note: "Improves vibration and abrasion behavior",
  },
  {
    part: "Mounting bracket",
    material: "PETG",
    rule: "Add ribs and enough wall around screw holes",
    note: "More stable under pull force",
  },
]

const pricingRows = [
  { type: "Small cable clip", size: "~5x5x5 cm", price: "from EUR 5", leadTime: "2-4 working days" },
  { type: "Cable holder / guide", size: "~10x10x10 cm", price: "from EUR 20", leadTime: "2-5 working days" },
  { type: "Custom mounting bracket", size: "~20x20x20 cm", price: "from EUR 49", leadTime: "3-6 working days" },
]

const intakeChecklist = [
  "Cable diameter and cable count per route",
  "Mounting context: wall, frame, panel or furniture",
  "Load profile: vibration, pull force, heat and moisture",
  "Preference for fixed mount or removable clip",
]

const relatedLinks = [
  { label: "TPU use-cases", href: "/en/blog/use-cases-tpu" },
  { label: "Maker Monday snapfit parts", href: "/en/blog/maker-monday-snapfit-parts" },
  { label: "How to request a quote", href: "/en/blog/3d-print-offerte-aanvragen" },
  { label: "3D print price per part", href: "/en/blog/3d-print-prijs-per-stuk" },
]

const faqItems = [
  {
    q: "When should I choose TPU for cable management?",
    a: "Use TPU when you need flexible clips, damping or repeated snap-on behavior.",
  },
  {
    q: "Is PLA usable for cable clips?",
    a: "Yes for light indoor use. Under higher load or heat, PETG is usually safer.",
  },
  {
    q: "Can I start without STL or STEP?",
    a: "Yes. Cable diameter, photo and mounting context are enough for an initial proposal.",
  },
  {
    q: "How quickly can I get pricing and lead time?",
    a: "Usually within 24 hours when intake context is complete.",
  },
]

const references = [
  { label: "Prusa filament material guide", href: "https://help.prusa3d.com/filament-material-guide" },
  { label: "Ultimaker design for FFF", href: "https://ultimaker.com/learn/design-for-fff-3d-printing/" },
  { label: "Cable management basics (IEC)", href: "https://www.iec.ch/homepage" },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "3D printed cable management: practical guide",
  description:
    "Practical guide for custom 3D printed cable management with material choices, design rules, price ranges and intake.",
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
  name: "Order 3D printed cable management",
  description: "Move from cable clutter to a maintainable setup in four clear steps.",
  inLanguage: "en-BE",
  mainEntityOfPage: canonical,
  totalTime: "PT4M",
  steps: [
    { name: "Map cable routes", text: "List cable diameters, lengths and mounting context." },
    { name: "Pick clip type and material", url: materialsHref },
    { name: "Validate model or reference", url: viewerHref },
    { name: "Submit prefilled request", url: contactHref },
  ],
  toolNames: ["X3DPrints viewer", "Material Suggestion Tool", "X3DPrints pricing"],
  supplyNames: ["Photo or STL/STEP", "Cable diameter", "Mounting context"],
})

export default function CableManagementGuideEnPage() {
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
              <li className="font-medium text-slate-700">3D printed cable management</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">Home practicals</p>
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            3D printed cable management: practical guide
          </h1>
          <p className="max-w-3xl text-lg text-slate-700">
            Short answer: yes, 3D printing is excellent for custom cable clips, guides and holders. With the right material choice and intake context, reliability improves fast.
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">{lastUpdatedLabel}</p>
          <div className="flex flex-wrap gap-3">
            <ShimmerButton
              href={contactHref}
              event={{ action: "cta_click", category: "blog_cable_en_top", label: "contact_prefill" }}
            >
              Start cable intake
            </ShimmerButton>
            <ShimmerButton
              href={materialsHref}
              className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
              event={{ action: "cta_click", category: "blog_cable_en_top", label: "materials_tool" }}
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

        <section id="why-cable-management-printing" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">When does 3D printed cable management make sense?</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {useCards.map((card) => (
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

        <section id="design-rules-cable-management" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Design rules by part type</h2>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200/70 bg-white/80">
              <table className="min-w-full text-left text-sm text-slate-700">
                <caption className="sr-only">Design rules for 3D printed cable management</caption>
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Part</th>
                    <th className="px-4 py-3">Material</th>
                    <th className="px-4 py-3">Rule</th>
                    <th className="px-4 py-3">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {designRules.map((row) => (
                    <tr key={row.part} className="border-t border-slate-200/60">
                      <td className="px-4 py-3 font-semibold text-slate-900">{row.part}</td>
                      <td className="px-4 py-3">{row.material}</td>
                      <td className="px-4 py-3">{row.rule}</td>
                      <td className="px-4 py-3">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </section>

        <section id="intake-cable-management" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">What intake data do you need?</h2>
            <GlassCard className="mt-4 p-6">
              <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
                {intakeChecklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                Already have files? Validate them first in the{" "}
                <Link href={viewerHref} className="font-semibold text-indigo-600 hover:text-indigo-500">
                  viewer
                </Link>{" "}
                for faster intake.
              </p>
            </GlassCard>
          </Reveal>
        </section>

        <section id="cost-cable-management" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Cost and timing</h2>
            <p className="mt-2 text-slate-700">
              Planning ranges only. Final pricing depends on quantity, material and mounting context.
            </p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200/70 bg-white/80">
              <table className="min-w-full text-left text-sm text-slate-700">
                <caption className="sr-only">Price range for 3D printed cable management</caption>
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

        <section id="faq-cable-management" className="scroll-mt-28">
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
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Want a cable management review for your setup?</h2>
              <p className="mt-2 text-slate-700">
                Share cable diameters, mounting context and your goal. You get a quick proposal on material, pricing and lead time.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <ShimmerButton
                  href={contactHref}
                  event={{ action: "cta_click", category: "blog_cable_en_bottom", label: "contact_prefill" }}
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
