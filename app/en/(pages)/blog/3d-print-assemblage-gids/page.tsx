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

const canonical = "https://www.x3dprints.be/en/blog/3d-print-assemblage-gids/"
const datePublished = "2026-02-08"
const dateModified = "2026-02-09"
const materialsHref =
  "/en/materials?utm_source=blog&utm_medium=cta&utm_campaign=assembly-guide#material-suggestion-tool"
const viewerHref = "/en/viewer?utm_source=blog&utm_medium=cta&utm_campaign=assembly-guide"
const pricingHref = "/en/pricing?utm_source=blog&utm_medium=cta&utm_campaign=assembly-guide"
const contactHref =
  "/en/contact?material=pla-tough&quote=Assembly%20advice%20for%20my%203D%20print"
const designGuideHref =
  "/en/blog/3d-print-ontwerp-gids?utm_source=blog&utm_medium=internal&utm_campaign=assembly-guide"

export const metadata: Metadata = {
  title: "3D print assembly guide: alignment pins & inserts | X3DPrints",
  description:
    "Assembly guide for 3D prints: alignment pins, screw joints and inserts with reference values and a clearance table per material.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/3d-print-assemblage-gids/",
      "en-BE": canonical,
      "x-default": "https://www.x3dprints.be/blog/3d-print-assemblage-gids/",
    },
  },
  openGraph: {
    title: "3D print assembly guide: alignment pins & inserts",
    description:
      "Practical assembly guide with alignment pins, inserts, tolerances and a material clearance table.",
    url: canonical,
    images: [{ url: "/Logo.webp", width: 1200, height: 630, alt: "3D print assembly guide" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D print assembly guide: alignment pins & inserts",
    description: "Assembly tips and reference values for printable parts.",
    images: ["/Logo.webp"],
  },
}

const checklistItems = [
  {
    title: "Split on logical planes",
    description:
      "Choose a split that stays hidden and avoid visible seams on showcase surfaces.",
  },
  {
    title: "Use alignment pins or slots",
    description:
      "Pins give repeatable alignment, especially for series or multi-part assemblies.",
  },
  {
    title: "Add clearance",
    description:
      "Leave room for material expansion and print variance so parts don’t bind.",
  },
  {
    title: "Plan fastening upfront",
    description:
      "Screws and inserts need extra space. Glue only works for low loads.",
  },
]

const guidelineRows = [
  {
    label: "Alignment pin diameter",
    plaPetg: "4-6 mm",
    tpu: "6-8 mm",
    reason: "Stiffer pins stay aligned; TPU needs more mass.",
  },
  {
    label: "Pin-to-hole clearance",
    plaPetg: "0.2-0.3 mm",
    tpu: "0.4-0.6 mm",
    reason: "Prevents binding and keeps assembly smooth.",
  },
  {
    label: "Screw hole compensation",
    plaPetg: "+0.2-0.3 mm",
    tpu: "+0.4-0.6 mm",
    reason: "Ensures bolts and inserts fit smoothly.",
  },
  {
    label: "Insert pocket depth",
    plaPetg: "1-1.5 mm extra",
    tpu: "1.5-2 mm extra",
    reason: "Extra room avoids bulging during heat-set.",
  },
]

const fastenerCards = [
  {
    title: "Screws & inserts",
    description:
      "Use heat-set inserts for repeatable assembly. Pick PETG or PLA Tough+ for strong screw zones.",
  },
  {
    title: "Snap fits",
    description:
      "Snap fits work well in PLA Tough+ or PETG. Add TPU inlays for flexible zones.",
  },
  {
    title: "Glue or tape",
    description:
      "Only suitable for light loads or temporary fixtures. Always test a sample.",
  },
]

const faqItems = [
  {
    q: "What is the safest way to align parts?",
    a: "Alignment pins or slots give the most consistent alignment, especially for series.",
  },
  {
    q: "When should I choose heat-set inserts?",
    a: "For parts that need repeat assembly or higher torque.",
  },
  {
    q: "Can I use PLA for assemblies?",
    a: "Yes, but pick PLA Tough+ for extra impact resistance. For outdoor use, PETG is safer.",
  },
  {
    q: "How much clearance is needed for pin-and-hole?",
    a: "For PLA/PETG 0.2-0.3 mm, for TPU 0.4-0.6 mm depending on scale.",
  },
]

const references = [
  {
    label: "Ultimaker: Design for FFF 3D printing",
    href: "https://ultimaker.com/learn/design-for-fff-3d-printing/",
  },
  {
    label: "Prusa material guide (PLA, PETG, TPU)",
    href: "https://help.prusa3d.com/filament-material-guide",
  },
  {
    label: "Bambu Studio documentation",
    href: "https://wiki.bambulab.com/en/software/bambu-studio",
  },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "3D print assembly guide: alignment pins & inserts",
  description:
    "Assembly guide with alignment pins, clearance and fastening for 3D prints including reference values.",
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
  name: "Plan assembly in 4 steps",
  description: "Plan alignment pins, clearance and fastening to assemble 3D printed parts neatly.",
  inLanguage: "en-BE",
  mainEntityOfPage: canonical,
  totalTime: "PT4M",
  steps: [
    {
      name: "Define the split",
      text: "Split the model on logical planes and plan where the seam sits.",
    },
    {
      name: "Add pins and clearance",
      text: "Use alignment pins or slots and add the right clearance per material.",
    },
    {
      name: "Choose fastening",
      text: "Decide between inserts, screws or glue based on load.",
    },
    {
      name: "Request a design review",
      url: contactHref,
    },
  ],
  toolNames: ["X3DPrints 3D viewer", "Material Suggestion Tool"],
  supplyNames: ["STL or STEP file"],
})

export default function BlogAssemblyGuideEnPage() {
  return (
    <main className="relative overflow-hidden px-6 pb-24 pt-16 sm:px-8 lg:px-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_60%_at_50%_0%,rgba(45,212,191,.18),transparent_70%)]"
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
              <li className="font-medium text-slate-700">Assembly guide</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-teal-600">Assembly</p>
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            3D print assembly guide: alignment pins & inserts
          </h1>
          <p className="max-w-3xl text-lg text-slate-700">
            Short answer: solid assemblies start with smart splits, alignment pins and enough clearance. Add inserts
            where you need repeatable fastening and pick a material that handles the load.
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
            Last updated: 9 February 2026
          </p>
          <div className="flex flex-wrap gap-3">
            <ShimmerButton
              href={viewerHref}
              event={{ action: "cta_click", category: "blog_assemblage_top", label: "viewer" }}
            >
              Upload your model
            </ShimmerButton>
            <ShimmerButton
              href={materialsHref}
              className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
              event={{ action: "cta_click", category: "blog_assemblage_top", label: "materials_tool" }}
            >
              Pick material
            </ShimmerButton>
            <Link
              href={pricingHref}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:border-slate-300 hover:bg-slate-50"
            >
              Check pricing
            </Link>
          </div>
        </header>

        <BlogContentOverview locale="en" />

        <section id="assemblage-checklist" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Checklist for sturdy assemblies</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {checklistItems.map((item) => (
                <GlassCard key={item.title} className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-700">{item.description}</p>
                </GlassCard>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="assemblage-tabel" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Reference values for pins and clearance</h2>
              <p className="mt-2 text-sm text-slate-600">
                Starting values for FDM prints. We fine-tune based on scale, material and printer settings.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-[720px] text-left text-sm text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-200/70 text-slate-500">
                      <th className="py-2 pr-4 font-semibold">Check</th>
                      <th className="py-2 pr-4 font-semibold">PLA/PETG</th>
                      <th className="py-2 pr-4 font-semibold">TPU</th>
                      <th className="py-2 pr-4 font-semibold">Why</th>
                    </tr>
                  </thead>
                  <tbody>
                    {guidelineRows.map((row) => (
                      <tr key={row.label} className="border-b border-slate-200/70 last:border-0">
                        <td className="py-2 pr-4 font-medium text-slate-900">{row.label}</td>
                        <td className="py-2 pr-4">{row.plaPetg}</td>
                        <td className="py-2 pr-4">{row.tpu}</td>
                        <td className="py-2 pr-4">{row.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                For exact values we use your STL/STEP and the{" "}
                <Link href={viewerHref} className="font-semibold text-emerald-600 hover:text-emerald-700">
                  viewer
                </Link>{" "}
                to inspect critical zones.
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Need more context? Read the{" "}
                <Link href={designGuideHref} className="font-semibold text-emerald-600 hover:text-emerald-700">
                  3D print design guide
                </Link>
                .
              </p>
            </GlassCard>
          </Reveal>
        </section>

        <section id="assemblage-fasteners" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Fastening: screws, inserts or glue?</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                {fastenerCards.map((card) => (
                  <div key={card.title} className="rounded-2xl border border-slate-200/70 bg-white/80 p-4">
                    <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
                    <p className="mt-2 text-sm text-slate-700">{card.description}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <ShimmerButton
                  href={contactHref}
                  event={{ action: "cta_click", category: "blog_assemblage_mid", label: "contact_prefill" }}
                >
                  Request assembly advice
                </ShimmerButton>
                <ShimmerButton
                  href={materialsHref}
                  className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
                  event={{ action: "cta_click", category: "blog_assemblage_mid", label: "materials_tool" }}
                >
                  Pick material
                </ShimmerButton>
              </div>
            </GlassCard>
          </Reveal>
        </section>

        <section id="assemblage-faq" className="scroll-mt-28">
          <Faq title="FAQ about 3D print assembly" items={faqItems} />
        </section>

        <section id="assemblage-sources" className="scroll-mt-28">
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
                <h2 className="mt-2 text-xl font-semibold text-slate-900">Ready to test your assembly?</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Send your file and get advice on pins, clearance and fastening.
                </p>
              </div>
              <ShimmerButton
                href={contactHref}
                event={{ action: "cta_click", category: "blog_assemblage_bottom", label: "contact_prefill" }}
              >
                Start advice
              </ShimmerButton>
            </GlassCard>
          </Reveal>
        </section>
      </article>

      <ReadMoreLinks pageType="services" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <BlogAuthorNote locale="en" />
    </main>
  )
}
