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

const canonical = "https://www.x3dprints.be/en/blog/hittebestendig-3d-print-materiaal/"
const datePublished = "2026-02-08"
const dateModified = "2026-02-09"
const materialsHref =
  "/en/materials?utm_source=blog&utm_medium=cta&utm_campaign=heat-resistant-materials#material-suggestion-tool"
const pricingHref = "/en/pricing?utm_source=blog&utm_medium=cta&utm_campaign=heat-resistant-materials"
const viewerHref = "/en/viewer?utm_source=blog&utm_medium=cta&utm_campaign=heat-resistant-materials"
const contactHref =
  "/en/contact?material=pc&quote=Heat%20resistant%20material%20for%203D%20print"
const materialsGuideHref =
  "/en/blog/3d-print-materialen-gids?utm_source=blog&utm_medium=internal&utm_campaign=heat-resistant-materials"

export const metadata: Metadata = {
  title: "Heat-resistant 3D print material: PETG vs PC | X3DPrints",
  description:
    "Which 3D print materials handle heat? Compare PLA Tough+, PETG, PC and PC FR with a matrix, scenarios and fast CTAs.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/hittebestendig-3d-print-materiaal/",
      "en-BE": canonical,
      "x-default": "https://www.x3dprints.be/blog/hittebestendig-3d-print-materiaal/",
    },
  },
  openGraph: {
    title: "Heat-resistant 3D print material: PETG vs PC",
    description:
      "Compare heat-resistant 3D print materials with a matrix, scenarios and clear CTAs.",
    url: canonical,
    images: [{ url: "/Logo.webp", width: 1200, height: 630, alt: "Heat-resistant 3D print material" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Heat-resistant 3D print material: PETG vs PC",
    description: "Matrix and scenarios for heat-resistant 3D prints.",
    images: ["/Logo.webp"],
  },
}

const criteriaCards = [
  {
    title: "Ambient temperature",
    description:
      "Think sun exposure, engine heat or electronics. Higher temperatures push you toward PETG or PC.",
  },
  {
    title: "UV and outdoor exposure",
    description:
      "UV and moisture speed up deformation. PETG and PC stay the most dimensionally stable outdoors.",
  },
  {
    title: "Mechanical load",
    description:
      "Strong parts with heat need stiffness. PC delivers the highest margin for heat + impact.",
  },
  {
    title: "Cost and printability",
    description:
      "PLA Tough+ is the cheapest, PETG is still affordable. PC needs more setup but pays off for high demands.",
  },
]

const matrixRows = [
  {
    material: "PLA Tough+",
    heat: "± 60°C (indoor)",
    uv: "Limited",
    bestFor: "Prototypes, indoor clamps",
    href: "/en/materials/pla-tough",
  },
  {
    material: "PETG",
    heat: "± 80°C (outdoor)",
    uv: "Good",
    bestFor: "Enclosures, outdoor fixtures",
    href: "/en/materials/petg",
  },
  {
    material: "PC",
    heat: "± 110°C",
    uv: "Strong",
    bestFor: "Machine covers, brackets, hot zones",
    href: "/en/materials/pc",
  },
  {
    material: "PC FR",
    heat: "± 110°C + flame retardant",
    uv: "Strong",
    bestFor: "Electronics, safety-critical parts",
    href: "/en/materials/pc-fr",
  },
]

const scenarios = [
  {
    title: "Electronics housings",
    description:
      "PETG is often enough for standard electronics. For higher heat, choose PC for extra margin.",
  },
  {
    title: "Outdoor brackets in the sun",
    description:
      "Pick PETG or PC so UV and heat do not deform the part.",
  },
  {
    title: "Safety-critical parts",
    description:
      "PC FR is the option when flame retardancy or compliance matters.",
  },
]

const faqItems = [
  {
    q: "At what temperature does PLA become unsuitable?",
    a: "PLA and PLA Tough+ deform around 60°C. For warmer applications move to PETG or PC.",
  },
  {
    q: "Is PETG heat-resistant enough for outdoor use?",
    a: "Yes, PETG stays stable under sun and light heat. For extreme heat or engine zones, PC is better.",
  },
  {
    q: "Why choose PC over PETG?",
    a: "PC handles higher temperatures and stays stiff under load, ideal for technical parts.",
  },
  {
    q: "When should I choose PC FR?",
    a: "For parts that require extra safety or flame retardancy, such as electronics or control panels.",
  },
]

const references = [
  {
    label: "Prusa material guide (PLA, PETG, TPU)",
    href: "https://help.prusa3d.com/filament-material-guide",
  },
  {
    label: "Bambu Lab PC profile guide",
    href: "https://wiki.bambulab.com/en/filament-acc/filament/pc",
  },
  {
    label: "UL94 flame rating overview",
    href: "https://www.ul.com/resources/ul-94-standard-tests-flammability-plastic-materials",
  },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "Heat-resistant 3D print material: PETG vs PC",
  description:
    "Heat-resistant material guide comparing PLA Tough+, PETG, PC and PC FR with a practical matrix.",
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
  name: "Choose heat-resistant material in 4 steps",
  description: "Pick the right material based on heat, UV exposure and load.",
  inLanguage: "en-BE",
  mainEntityOfPage: canonical,
  totalTime: "PT4M",
  steps: [
    {
      name: "Define operating temperature",
      text: "Map the heat exposure in your environment or machine.",
    },
    {
      name: "Check UV and outdoor exposure",
      text: "Outdoor use pushes the choice toward PETG or PC.",
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

export default function BlogHeatResistantEnPage() {
  return (
    <main className="relative overflow-hidden px-6 pb-24 pt-16 sm:px-8 lg:px-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_60%_at_50%_0%,rgba(251,146,60,.18),transparent_70%)]"
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
              <li className="font-medium text-slate-700">Heat-resistant material</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-500">Materials guide</p>
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Heat-resistant 3D print material: PETG vs PC
          </h1>
          <p className="max-w-3xl text-lg text-slate-700">
            Short answer: PLA Tough+ is safe up to about 60°C, PETG is the reliable choice for outdoor use, and PC is
            the best option for high heat or technical applications. Use this matrix to decide faster.
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
            Last updated: 9 February 2026
          </p>
          <div className="flex flex-wrap gap-3">
            <ShimmerButton
              href={materialsHref}
              event={{ action: "cta_click", category: "blog_hitte_top", label: "materials_tool" }}
            >
              Pick material
            </ShimmerButton>
            <ShimmerButton
              href={pricingHref}
              className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
              event={{ action: "cta_click", category: "blog_hitte_top", label: "pricing" }}
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

        <section id="hitte-criteria" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Which criteria define heat resistance?</h2>
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

        <section id="hitte-matrix" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Material comparison in one table</h2>
              <p className="mt-2 text-sm text-slate-600">
                Indicative temperatures. We refine these values based on the model and environment.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-[720px] text-left text-sm text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-200/70 text-slate-500">
                      <th className="py-2 pr-4 font-semibold">Material</th>
                      <th className="py-2 pr-4 font-semibold">Heat</th>
                      <th className="py-2 pr-4 font-semibold">UV</th>
                      <th className="py-2 pr-4 font-semibold">Best for</th>
                      <th className="py-2 pr-4 font-semibold">Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {matrixRows.map((row) => (
                      <tr key={row.material} className="border-b border-slate-200/70 last:border-0">
                        <td className="py-2 pr-4 font-medium text-slate-900">{row.material}</td>
                        <td className="py-2 pr-4">{row.heat}</td>
                        <td className="py-2 pr-4">{row.uv}</td>
                        <td className="py-2 pr-4">{row.bestFor}</td>
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

        <section id="hitte-scenarios" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Heat and UV scenarios</h2>
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
                  event={{ action: "cta_click", category: "blog_hitte_mid", label: "contact_prefill" }}
                >
                  Request material advice
                </ShimmerButton>
                <ShimmerButton
                  href={viewerHref}
                  className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
                  event={{ action: "cta_click", category: "blog_hitte_mid", label: "viewer" }}
                >
                  Upload file
                </ShimmerButton>
              </div>
            </GlassCard>
          </Reveal>
        </section>

        <section id="hitte-faq" className="scroll-mt-28">
          <Faq title="FAQ about heat-resistant 3D prints" items={faqItems} />
        </section>

        <section id="hitte-sources" className="scroll-mt-28">
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
                <h2 className="mt-2 text-xl font-semibold text-slate-900">Ready to print heat-resistant parts?</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Share your application and receive advice on material and planning.
                </p>
              </div>
              <ShimmerButton
                href={contactHref}
                event={{ action: "cta_click", category: "blog_hitte_bottom", label: "contact_prefill" }}
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
