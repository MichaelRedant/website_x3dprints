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

const canonical = "https://www.x3dprints.be/en/blog/3d-print-materiaal-voor-zichtwerk/"
const datePublished = "2026-02-08"
const dateModified = "2026-02-09"
const materialsHref =
  "/en/materials?utm_source=blog&utm_medium=cta&utm_campaign=display-materials#material-suggestion-tool"
const pricingHref = "/en/pricing?utm_source=blog&utm_medium=cta&utm_campaign=display-materials"
const viewerHref = "/en/viewer?utm_source=blog&utm_medium=cta&utm_campaign=display-materials"
const contactHref =
  "/en/contact?material=pla-matte&quote=Material%20advice%20for%20display%203D%20prints"
const materialsGuideHref =
  "/en/blog/3d-print-materialen-gids?utm_source=blog&utm_medium=internal&utm_campaign=display-materials"

export const metadata: Metadata = {
  title: "3D print material for display: PLA Matte vs Silk | X3DPrints",
  description:
    "Which 3D print materials deliver the best finish? Compare PLA Matte, Silk+, Marble, Metal and PETG with a matrix, scenarios and fast CTAs.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/3d-print-materiaal-voor-zichtwerk/",
      "en-BE": canonical,
      "x-default": "https://www.x3dprints.be/blog/3d-print-materiaal-voor-zichtwerk/",
    },
  },
  openGraph: {
    title: "3D print material for display: PLA Matte vs Silk",
    description:
      "Compare display materials with a matrix, scenarios and targeted CTAs to materials and pricing.",
    url: canonical,
    images: [{ url: "/Logo.webp", width: 1200, height: 630, alt: "3D print material for display" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D print material for display: PLA Matte vs Silk",
    description: "Material guide for display and design prints.",
    images: ["/Logo.webp"],
  },
}

const criteriaCards = [
  {
    title: "Finish & gloss",
    description:
      "Matte materials hide layer lines, while Silk or Metal add gloss and a premium feel.",
  },
  {
    title: "Colour consistency",
    description:
      "Branding needs colour stability. PLA Matte and PETG stay the most consistent.",
  },
  {
    title: "Detail level",
    description:
      "Small typography or logos need crisp detail and a consistent print strategy.",
  },
  {
    title: "Use & handling",
    description:
      "Does the object need impact resistance? Combine display finishes with PETG or PLA Tough+.",
  },
]

const matrixRows = [
  {
    material: "PLA Matte",
    look: "Soft matte, premium",
    bestFor: "Product mock-ups, interior, branding props",
    durability: "Indoor, light use",
    href: "/en/materials/pla-matte",
  },
  {
    material: "PLA Silk+",
    look: "Gloss, showpiece",
    bestFor: "Awards, trophies, marketing displays",
    durability: "Indoor, visual",
    href: "/en/materials/pla-silk",
  },
  {
    material: "PLA Marble",
    look: "Stone look, texture",
    bestFor: "Interior, sculptures, premium props",
    durability: "Indoor, decor",
    href: "/en/materials/pla-marble",
  },
  {
    material: "PLA Metal",
    look: "Metallic sheen",
    bestFor: "Industrial props, premium prototypes",
    durability: "Indoor, semi-robust",
    href: "/en/materials/pla-metal",
  },
  {
    material: "PETG",
    look: "Light gloss",
    bestFor: "Display parts that also need durability",
    durability: "Outdoor / functional",
    href: "/en/materials/petg",
  },
]

const scenarios = [
  {
    title: "Awards & trophies",
    description:
      "Choose PLA Silk+ or PLA Metal for gloss and a luxurious finish. Add matte accents for contrast.",
  },
  {
    title: "Retail displays",
    description:
      "PLA Matte works well for volume branding. PETG is better when the display gets heavy use.",
  },
  {
    title: "Interior & decor",
    description:
      "PLA Marble and PLA Matte deliver a soft, premium look without heavy post-processing.",
  },
]

const faqItems = [
  {
    q: "What is the best material for display prints?",
    a: "PLA Matte is the safest starting point thanks to its soft finish. Silk or Metal add extra gloss for premium objects.",
  },
  {
    q: "Can I combine display quality with durability?",
    a: "Yes. PETG offers a durable base with a clean finish, ideal for displays that are touched often.",
  },
  {
    q: "How do I avoid visible layer lines?",
    a: "Pick a matte finish, use a finer layer height and orient the show surface upward.",
  },
  {
    q: "Which materials work for translucent effects?",
    a: "PLA Translucent or PETG Translucent deliver a soft glow without hotspots.",
  },
]

const references = [
  {
    label: "Prusa: Material guide (PLA, PETG, TPU)",
    href: "https://help.prusa3d.com/filament-material-guide",
  },
  {
    label: "UltiMaker PLA material properties",
    href: "https://ultimaker.com/materials/pla/",
  },
  {
    label: "UltiMaker PETG material properties",
    href: "https://ultimaker.com/materials/s-series-petg/",
  },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "3D print material for display: PLA Matte vs Silk",
  description:
    "Display material guide comparing PLA Matte, Silk, Marble, Metal and PETG with a practical matrix.",
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
  name: "Choose display material in 4 steps",
  description: "Pick the right finish by comparing gloss, durability and use case.",
  inLanguage: "en-BE",
  mainEntityOfPage: canonical,
  totalTime: "PT4M",
  steps: [
    {
      name: "Define the desired finish",
      text: "Matte hides layer lines, Silk adds gloss and Metal delivers a premium look.",
    },
    {
      name: "Check durability needs",
      text: "Use PETG or PLA Tough+ when the part is handled often.",
    },
    {
      name: "Compare materials in the matrix",
      url: materialsHref,
    },
    {
      name: "Request material advice",
      url: contactHref,
    },
  ],
  toolNames: ["Material Suggestion Tool", "Pricing calculator"],
  supplyNames: ["STL or STEP file"],
})

export default function BlogDisplayMaterialsEnPage() {
  return (
    <main className="relative overflow-hidden px-6 pb-24 pt-16 sm:px-8 lg:px-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_60%_at_50%_0%,rgba(236,72,153,.18),transparent_70%)]"
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
              <li className="font-medium text-slate-700">Display materials</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-500">Materials guide</p>
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            3D print material for display: PLA Matte vs Silk
          </h1>
          <p className="max-w-3xl text-lg text-slate-700">
            Short answer: PLA Matte is the safest baseline for clean display work, PLA Silk+ delivers gloss and showpieces,
            and PETG is best when the object also needs durability. Use this matrix to decide faster.
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
            Last updated: 9 February 2026
          </p>
          <div className="flex flex-wrap gap-3">
            <ShimmerButton
              href={materialsHref}
              event={{ action: "cta_click", category: "blog_zichtwerk_top", label: "materials_tool" }}
            >
              Pick material
            </ShimmerButton>
            <ShimmerButton
              href={pricingHref}
              className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
              event={{ action: "cta_click", category: "blog_zichtwerk_top", label: "pricing" }}
            >
              Check pricing
            </ShimmerButton>
            <Link
              href={viewerHref}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:border-slate-300 hover:bg-slate-50"
            >
              Upload your model
            </Link>
          </div>
        </header>

        <BlogContentOverview locale="en" />

        <section id="zichtwerk-criteria" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Which criteria matter for display prints?</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {criteriaCards.map((card) => (
                <GlassCard key={card.title} className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
                  <p className="mt-2 text-sm text-slate-700">{card.description}</p>
                </GlassCard>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="zichtwerk-matrix" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Material comparison in one table</h2>
              <p className="mt-2 text-sm text-slate-600">
                Choose based on look, durability and intended use.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-[720px] text-left text-sm text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-200/70 text-slate-500">
                      <th className="py-2 pr-4 font-semibold">Material</th>
                      <th className="py-2 pr-4 font-semibold">Look</th>
                      <th className="py-2 pr-4 font-semibold">Best for</th>
                      <th className="py-2 pr-4 font-semibold">Durability</th>
                      <th className="py-2 pr-4 font-semibold">Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {matrixRows.map((row) => (
                      <tr key={row.material} className="border-b border-slate-200/70 last:border-0">
                        <td className="py-2 pr-4 font-medium text-slate-900">{row.material}</td>
                        <td className="py-2 pr-4">{row.look}</td>
                        <td className="py-2 pr-4">{row.bestFor}</td>
                        <td className="py-2 pr-4">{row.durability}</td>
                        <td className="py-2 pr-4">
                          <Link href={row.href} className="font-semibold text-indigo-600 hover:text-indigo-500">
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Unsure? Use the{" "}
                <Link href={materialsHref} className="font-semibold text-emerald-600 hover:text-emerald-700">
                  Material Suggestion Tool
                </Link>{" "}
                for targeted advice.
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Need more context? Read the{" "}
                <Link href={materialsGuideHref} className="font-semibold text-emerald-600 hover:text-emerald-700">
                  3D print materials guide
                </Link>
                .
              </p>
            </GlassCard>
          </Reveal>
        </section>

        <section id="zichtwerk-scenarios" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Scenarios for design prints</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                {scenarios.map((scenario) => (
                  <div key={scenario.title} className="rounded-2xl border border-slate-200/70 bg-white/80 p-4">
                    <h3 className="text-lg font-semibold text-slate-900">{scenario.title}</h3>
                    <p className="mt-2 text-sm text-slate-700">{scenario.description}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <ShimmerButton
                  href={contactHref}
                  event={{ action: "cta_click", category: "blog_zichtwerk_mid", label: "contact_prefill" }}
                >
                  Request material advice
                </ShimmerButton>
                <ShimmerButton
                  href={viewerHref}
                  className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
                  event={{ action: "cta_click", category: "blog_zichtwerk_mid", label: "viewer" }}
                >
                  Upload file
                </ShimmerButton>
              </div>
            </GlassCard>
          </Reveal>
        </section>

        <section id="zichtwerk-faq" className="scroll-mt-28">
          <Faq title="FAQ about display 3D prints" items={faqItems} />
        </section>

        <section id="zichtwerk-sources" className="scroll-mt-28">
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
                <h2 className="mt-2 text-xl font-semibold text-slate-900">Ready to plan your display prints?</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Share your design and receive advice on the right finish, material and planning.
                </p>
              </div>
              <ShimmerButton
                href={contactHref}
                event={{ action: "cta_click", category: "blog_zichtwerk_bottom", label: "contact_prefill" }}
              >
                Start advice
              </ShimmerButton>
            </GlassCard>
          </Reveal>
        </section>
      </article>

      <ReadMoreLinks pageType="materials" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <BlogAuthorNote locale="en" />
    </main>
  )
}
