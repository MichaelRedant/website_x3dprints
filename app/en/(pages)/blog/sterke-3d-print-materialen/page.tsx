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

const canonical = "https://www.x3dprints.be/en/blog/sterke-3d-print-materialen/"
const datePublished = "2026-02-08"
const dateModified = "2026-02-09"
const materialsHref =
  "/en/materials?utm_source=blog&utm_medium=cta&utm_campaign=strong-materials#material-suggestion-tool"
const pricingHref = "/en/pricing?utm_source=blog&utm_medium=cta&utm_campaign=strong-materials"
const viewerHref = "/en/viewer?utm_source=blog&utm_medium=cta&utm_campaign=strong-materials"
const contactHref =
  "/en/contact?material=pla-tough&quote=Material%20advice%20for%20functional%203D%20prints"
const materialsGuideHref =
  "/en/blog/3d-print-materialen-gids?utm_source=blog&utm_medium=internal&utm_campaign=strong-materials"

export const metadata: Metadata = {
  title: "Strong 3D prints: material choice for use | X3DPrints",
  description:
    "Functional 3D print? Compare PLA Tough+, PETG, TPU and PC on strength, heat and flexibility. Includes decision rules, a table and fast CTAs.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/sterke-3d-print-materialen/",
      "en-BE": canonical,
      "x-default": "https://www.x3dprints.be/blog/sterke-3d-print-materialen/",
    },
  },
  openGraph: {
    title: "Strong 3D prints: material choice for use",
    description:
      "Compare PLA Tough+, PETG, TPU and PC for functional parts with decision rules and fast CTAs.",
    url: canonical,
    images: [{ url: "/Logo.webp", width: 1200, height: 630, alt: "Strong 3D print materials" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Strong 3D prints: material choice for use",
    description: "Material choice for functional 3D parts in one overview.",
    images: ["/Logo.webp"],
  },
}

const criteriaCards = [
  {
    title: "Load & impact",
    description:
      "Clamps and brackets need stiffness, while bumpers and grips must absorb impact.",
  },
  {
    title: "Temperature & environment",
    description:
      "Indoor vs outdoor makes a difference. Heat, UV and moisture push you toward PETG or PC.",
  },
  {
    title: "Flexibility",
    description:
      "Does the part need to flex? Then TPU or a hybrid design (PLA + TPU) makes sense.",
  },
  {
    title: "Finish & dimensional stability",
    description:
      "Functional doesn’t have to look rough: PLA Tough+ and PETG keep crisp details without post-processing.",
  },
]

const matrixRows = [
  {
    material: "PLA Tough+",
    strength: "High (stiff)",
    flex: "Medium (impact resistant)",
    heat: "Low–medium (indoor)",
    bestFor: "Clamps, covers, technical prototypes",
    href: "/en/materials/pla-tough",
  },
  {
    material: "PETG",
    strength: "High",
    flex: "Medium (slightly flexible)",
    heat: "Medium (outdoor)",
    bestFor: "Enclosures, outdoor parts, fixtures",
    href: "/en/materials/petg",
  },
  {
    material: "TPU",
    strength: "Low (flexible)",
    flex: "High (damping)",
    heat: "Medium",
    bestFor: "Grips, bumpers, dampers",
    href: "/en/materials/tpu",
  },
  {
    material: "PC",
    strength: "Very high",
    flex: "Medium",
    heat: "High (heat/UV)",
    bestFor: "Machine covers, brackets, high-temp use",
    href: "/en/materials/pc",
  },
]

const scenarios = [
  {
    title: "Mechanical clamp or bracket",
    description:
      "Start with PLA Tough+ for stiffness. For outdoor use switch to PETG or PC.",
  },
  {
    title: "Electronics enclosure",
    description:
      "PETG is the safe choice for impact and heat. For high temperatures or UV: PC.",
  },
  {
    title: "Flexible damper or grip",
    description:
      "TPU is ideal for shock absorption. Combine with a PLA cover for rigidity.",
  },
]

const faqItems = [
  {
    q: "Is PLA Tough+ strong enough for functional parts?",
    a: "For indoor clamps, covers and prototypes PLA Tough+ is usually enough. For outdoor use or heat, choose PETG or PC.",
  },
  {
    q: "When do you choose PETG over PLA Tough+?",
    a: "PETG performs better with UV, moisture or when the part can flex slightly. It stays dimensionally stable in warmer environments.",
  },
  {
    q: "Is TPU suitable for load-bearing parts?",
    a: "TPU is best for damping, grips and protection. For load-bearing parts, combine TPU with a stiffer material.",
  },
  {
    q: "What is the advantage of PC?",
    a: "PC handles higher temperatures and stays stiff under load, ideal for machine covers or parts near heat sources.",
  },
]

const references = [
  {
    label: "Prusa material guide (PLA, PETG, TPU)",
    href: "https://help.prusa3d.com/filament-material-guide",
  },
  {
    label: "Ultimaker: Design for FFF 3D printing",
    href: "https://ultimaker.com/learn/design-for-fff-3d-printing/",
  },
  {
    label: "Bambu Lab PC profile guide",
    href: "https://wiki.bambulab.com/en/filament-acc/filament/pc",
  },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "Strong 3D prints: material choice for functional parts",
  description:
    "Functional material guide comparing PLA Tough+, PETG, TPU and PC with decision rules and a table.",
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
  name: "Choose strong materials in 4 steps",
  description: "Decide on strength, flexibility and heat resistance for functional parts.",
  inLanguage: "en-BE",
  mainEntityOfPage: canonical,
  totalTime: "PT4M",
  steps: [
    {
      name: "Define load and impact",
      text: "Determine whether the part needs stiffness or impact absorption.",
    },
    {
      name: "Check temperature and environment",
      text: "Outdoor, heat or UV requirements push you toward PETG or PC.",
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

export default function BlogStrongMaterialsEnPage() {
  return (
    <main className="relative overflow-hidden px-6 pb-24 pt-16 sm:px-8 lg:px-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_60%_at_50%_0%,rgba(34,197,94,.18),transparent_70%)]"
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
              <li className="font-medium text-slate-700">Strong materials</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">Materials guide</p>
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Strong 3D prints: material choice for functional parts
          </h1>
          <p className="max-w-3xl text-lg text-slate-700">
            Short answer: PLA Tough+ is the starting point for stiff functional parts, PETG is the safe choice for outdoor
            use and TPU is ideal for damping. For extreme heat or UV, choose PC. Use this matrix to decide fast and plan
            your quote without hassle.
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
            Last updated: 9 February 2026
          </p>
          <div className="flex flex-wrap gap-3">
            <ShimmerButton
              href={materialsHref}
              event={{ action: "cta_click", category: "blog_strong_materials_top", label: "materials_tool" }}
            >
              Pick material
            </ShimmerButton>
            <ShimmerButton
              href={pricingHref}
              className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
              event={{ action: "cta_click", category: "blog_strong_materials_top", label: "pricing" }}
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

        <section id="materiaal-criteria" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Which criteria define strength?</h2>
            <p className="mt-2 text-sm text-slate-600">
              Use these four checks to decide which material you need for functional 3D prints.
            </p>
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

        <section id="materiaal-matrix" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Comparison table for strong prints</h2>
              <p className="mt-2 text-sm text-slate-600">
                Focus on strength, flexibility and environment. Use the material pages for details.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-[720px] text-left text-sm text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-200/70 text-slate-500">
                      <th className="py-2 pr-4 font-semibold">Material</th>
                      <th className="py-2 pr-4 font-semibold">Strength</th>
                      <th className="py-2 pr-4 font-semibold">Flex</th>
                      <th className="py-2 pr-4 font-semibold">Heat/UV</th>
                      <th className="py-2 pr-4 font-semibold">Best for</th>
                      <th className="py-2 pr-4 font-semibold">Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {matrixRows.map((row) => (
                      <tr key={row.material} className="border-b border-slate-200/70 last:border-0">
                        <td className="py-2 pr-4 font-medium text-slate-900">{row.material}</td>
                        <td className="py-2 pr-4">{row.strength}</td>
                        <td className="py-2 pr-4">{row.flex}</td>
                        <td className="py-2 pr-4">{row.heat}</td>
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

        <section id="materiaal-scenarios" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Scenarios for functional parts</h2>
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
                  href={viewerHref}
                  event={{ action: "cta_click", category: "blog_strong_materials_mid", label: "viewer" }}
                >
                  Upload file
                </ShimmerButton>
                <ShimmerButton
                  href={contactHref}
                  className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
                  event={{ action: "cta_click", category: "blog_strong_materials_mid", label: "contact_prefill" }}
                >
                  Request material advice
                </ShimmerButton>
              </div>
            </GlassCard>
          </Reveal>
        </section>

        <section id="materiaal-faq" className="scroll-mt-28">
          <Faq title="FAQ about strong 3D prints" items={faqItems} />
        </section>

        <section id="materiaal-sources" className="scroll-mt-28">
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
                <h2 className="mt-2 text-xl font-semibold text-slate-900">Ready to choose your material?</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Share your use case and receive a clear material recommendation with price indication.
                </p>
              </div>
              <ShimmerButton
                href={contactHref}
                event={{ action: "cta_click", category: "blog_strong_materials_bottom", label: "contact_prefill" }}
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
