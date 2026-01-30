// app/en/(pages)/organizers/custom/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import Faq from "@/components/Faq"
import OrganizerBundles from "@/components/OrganizerBundles"
import Reveal from "@/components/Reveal"
import { ORGANIZER_PAGES } from "@/content/organizer-details"
import { buildOrganizerContactHref, buildOrganizerSchemas, type OrganizerPageContent } from "@/lib/organizers"
import { SITE } from "@/lib/seo"

const BASE = ORGANIZER_PAGES.custom
const PAGE_EN: OrganizerPageContent = {
  ...BASE,
  seo: {
    ...BASE.seo,
    title: "Custom toolbox inserts & pegboard add-ons | X3DPrints",
    description:
      "Photo + dimensions + tool list: we model and print custom toolbox inserts in PLA/PETG with labels and anti-slip. For unique cases, pegboards, Skådis walls and parametric bins in Belgium.",
    canonical: `${SITE.url}/en/organizers/custom`,
  },
  heroTitle: "Custom toolbox inserts with photo + list",
  heroSubtitle: "Parametric design based on your case and tools.",
  intro:
    "No Packout/ModuGrid/TSTAK? We design a made-to-fit insert with your photo, measurements and tool list. For hobbyists and professionals with unique cases.",
  summary: "Upload a photo and dimensions, we send a preview and print on demand.",
}
const FAQ_EN = [
  {
    q: "What do you need to start?",
    a: "A photo of the open case or pegboard, inner length/width/height (or diameter × height), and a list of tools/parts with quantities. Remove foam before the photo.",
  },
  {
    q: "Can you add labels or colour codes?",
    a: "Yes. We can engrave labels in-print, add magnetic labels and use colour cues per tool group.",
  },
  {
    q: "Which materials are available?",
    a: "PLA Matte for desk/indoor, PETG for transport/impact. Optional anti-slip bottom and magnetic strips for pegboards.",
  },
  {
    q: "Do you make parametric organizers?",
    a: "Yes. We build a parametric model for rotating tools or stock bins, so future variants can be printed quickly with the same fit.",
  },
  {
    q: "How fast can I get a custom insert?",
    a: "Typically a few working days after intake, depending on complexity and material. You’ll receive a preview first.",
  },
  {
    q: "Do you keep my model for reprints?",
    a: "Yes. We store the parametric model so we can reprint or extend later without re-measuring.",
  },
  {
    q: "Who is this for?",
    a: "Anything non-standard: photography/AV cases, metrology kits, RC/FPV, medical kits, pegboards with magnetic labels, printed storage boxes and loose component bins.",
  },
  {
    q: "How is pricing determined?",
    a: "Quote on request based on number of pockets, material (PLA or PETG), magnetic labels, and extras like anti-slip or in-print text.",
  },
  {
    q: "Can you make custom parts for IKEA Skådis?",
    a: "Yes. Skådis is IKEA’s pegboard system. We design and print custom hooks, bins, cable clips and tool holders that fit the Skådis holes and keep your gear secure.",
  },
]

const PAGE_URL = `${SITE.url}/en/organizers/${PAGE_EN.slug}`
const contactHref = buildOrganizerContactHref("custom")
const schemas = buildOrganizerSchemas(PAGE_EN, PAGE_URL)
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_EN.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
}

export const metadata: Metadata = {
  title: PAGE_EN.seo.title,
  description: PAGE_EN.seo.description,
  alternates: {
    canonical: PAGE_URL,
    languages: {
      "nl-BE": `${SITE.url}/organizers/custom`,
      en: PAGE_URL,
    },
  },
  openGraph: {
    title: PAGE_EN.seo.title,
    description: PAGE_EN.seo.description,
    url: PAGE_URL,
    images: [{ url: PAGE_EN.seo.ogImage!, width: 1200, height: 630, alt: "Custom toolbox insert made to fit" }],
    siteName: SITE.name,
    locale: "en_BE",
  },
  twitter: { card: "summary_large_image" },
}

export default function CustomOrganizersPageEn() {
  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16 lg:py-20">
        <Reveal className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-800 ring-1 ring-indigo-100 dark:bg-[#0f162c] dark:text-indigo-200">
            Custom toolbox inserts
          </div>
          <div className="space-y-4">
            <h1 className="text-balance text-4xl font-extrabold text-slate-900 sm:text-5xl">{PAGE_EN.heroTitle}</h1>
            <p className="max-w-3xl text-lg text-slate-700 dark:text-slate-200">{PAGE_EN.heroSubtitle}</p>
            <p className="max-w-3xl text-slate-700 dark:text-slate-200">{PAGE_EN.intro}</p>
            <p className="max-w-3xl text-sm font-semibold text-slate-600 dark:text-slate-300">
              For unique cases: photography, measurement gear, makers, RC/FPV, medical kits and more.
            </p>
            <div className="grid gap-2 rounded-2xl border border-white/70 bg-white/70 p-4 text-sm text-slate-800 ring-1 ring-white/60 backdrop-blur dark:border-slate-800 dark:bg-[#0B0F1A]/70 dark:text-slate-100 dark:ring-0">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700">Common custom setups</div>
              <div className="grid gap-2 sm:grid-cols-2">
                <span className="flex items-center gap-2">
                  <span className="i-lucide-cube" aria-hidden /> Pegboards with magnetic labels
                </span>
                <span className="flex items-center gap-2">
                  <span className="i-lucide-package" aria-hidden /> Printed storage boxes and bins
                </span>
                <span className="flex items-center gap-2">
                  <span className="i-lucide-wrench" aria-hidden /> Parametric organizers for rotating tools
                </span>
                <span className="flex items-center gap-2">
                  <span className="i-lucide-cpu" aria-hidden /> Electronics/FPV/metrology kits
                </span>
                <span className="flex items-center gap-2">
                  <span className="i-lucide-sparkles" aria-hidden /> IKEA Skådis add-ons (hooks, bins, cable clips)
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 text-sm">
              <Link
                href={contactHref}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:brightness-110 dark:bg-indigo-500"
              >
                Request your custom insert
                <span className="i-lucide-arrow-right" aria-hidden />
              </Link>
              <Link
                href="#bundles"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-indigo-400 hover:text-indigo-900 dark:border-slate-700 dark:text-slate-100"
              >
                Jump to options
                <span className="i-lucide-list-checks" aria-hidden />
              </Link>
              <Link
                href="#howto"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-indigo-400 hover:text-indigo-900 dark:border-slate-700 dark:text-slate-100"
              >
                Intake steps
                <span className="i-lucide-sticky-note" aria-hidden />
              </Link>
              <Link
                href="/en/materials#material-suggestion-tool"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-indigo-400 hover:text-indigo-900 dark:border-slate-700 dark:text-slate-100"
              >
                See materials
              </Link>
              <a href="#faq" className="underline decoration-indigo-400 hover:decoration-indigo-700">
                FAQ
              </a>
            </div>
          </div>

          <ul className="grid gap-2 sm:grid-cols-2">
            {PAGE_EN.proofPoints.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 rounded-xl bg-white/70 px-4 py-3 text-sm font-semibold text-slate-800 ring-1 ring-white/60 backdrop-blur dark:bg-[#0B0F1A]/70 dark:text-slate-100 dark:ring-0"
              >
                <span className="i-lucide-check-circle-2 text-indigo-600" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <section className="bg-gradient-to-b from-white to-slate-50 px-4 py-12 sm:py-16 dark:from-[#050815] dark:to-[#0B0F1A]">
        <div className="mx-auto max-w-6xl space-y-10">
          <Reveal className="grid gap-6 rounded-3xl bg-white/70 p-6 ring-1 ring-white/60 backdrop-blur dark:bg-[#0B0F1A]/70 dark:ring-0 md:grid-cols-[1fr_1fr] md:gap-10">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-700">What you solve</p>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">A calm case for unique tools</h2>
              <p className="text-slate-700 dark:text-slate-200">
                No generic bins. One fixed layout that fits your exact tools, with labels and optional anti-slip.
              </p>
            </div>
            <ul className="grid gap-3">
              {PAGE_EN.pains.map((pain) => (
                <li
                  key={pain}
                  className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white/70 px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm shadow-slate-900/5 dark:border-slate-800 dark:bg-[#0f162c] dark:text-slate-100"
                >
                  <span className="i-lucide-minus-circle text-indigo-600" aria-hidden />
                  {pain}
                </li>
              ))}
            </ul>
          </Reveal>

          <section id="howto">
          <Reveal
            className="rounded-3xl border border-slate-100 bg-white/80 p-6 shadow-lg shadow-slate-900/5 ring-1 ring-white/70 backdrop-blur dark:border-slate-800 dark:bg-[#0B0F1A]/80 dark:ring-0"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-700">How it works</p>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Photo in, calm toolbox out</h2>
                <p className="mt-2 max-w-2xl text-slate-700 dark:text-slate-200">{PAGE_EN.summary}</p>
              </div>
              <Link
                href={contactHref}
                className="text-sm font-semibold text-indigo-700 underline-offset-4 hover:text-indigo-900 hover:underline dark:text-indigo-200 dark:hover:text-indigo-100"
              >
                Start with a photo + dimensions
              </Link>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-4">
              {PAGE_EN.steps.map((step, index) => (
                <div
                  key={step.title}
                  className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 text-slate-800 ring-1 ring-white/60 dark:border-slate-800 dark:bg-[#0f162c] dark:text-slate-100"
                >
                  <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <h3 className="text-base font-semibold">{step.title}</h3>
                  <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">{step.description}</p>
                </div>
              ))}
            </div>
          </Reveal>
          </section>

          <section id="bundles">
          <Reveal>
            <OrganizerBundles systemSlug={PAGE_EN.slug} systemName={PAGE_EN.systemName} bundles={PAGE_EN.bundles} />
          </Reveal>
          </section>

          <section id="faq">
          <Reveal className="rounded-3xl border border-slate-100 bg-white/80 p-6 ring-1 ring-white/70 backdrop-blur dark:border-slate-800 dark:bg-[#0B0F1A]/80 dark:ring-0">
            <Faq items={FAQ_EN} title="Custom insert FAQ" className="mt-0" />
          </Reveal>
          </section>

          <Reveal className="rounded-3xl border border-slate-100 bg-white/80 p-6 ring-1 ring-white/70 backdrop-blur dark:border-slate-800 dark:bg-[#0B0F1A]/80 dark:ring-0">
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Order brings calm for unique kits</h2>
              <p className="text-slate-700 dark:text-slate-200">
                One fixed place per tool means faster setups and less risk of leaving gear behind.
              </p>
              <p className="text-slate-700 dark:text-slate-200">
                Ideal for makers, creatives, engineers and technicians who want their custom kit to feel premium and ready.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            schemas.service,
            schemas.offerCatalog,
            faqSchema,
            {
              "@context": "https://schema.org",
              "@type": "ImageObject",
              name: "Custom toolbox insert",
              contentUrl: PAGE_EN.seo.ogImage,
              thumbnail: PAGE_EN.seo.ogImage,
              caption: "Custom toolbox insert with labels and anti-slip, made in Belgium",
            },
            {
              "@context": "https://schema.org",
              "@type": "HowTo",
              name: "Request a custom toolbox insert",
              description: "Send a photo, dimensions and tool list to receive a fitted insert.",
              step: [
                { "@type": "HowToStep", position: 1, name: "Take a photo", text: "Photo of the open case, foam removed if present." },
                { "@type": "HowToStep", position: 2, name: "Measure the inside", text: "Inner length/width/height or diameter x height in millimetres." },
                { "@type": "HowToStep", position: 3, name: "List tools", text: "Name + quantity per tool and how they should lie (flat/upright)." },
                { "@type": "HowToStep", position: 4, name: "Send via contact form", text: "Use the contact form with custom prefill to upload everything." },
              ],
              tool: ["Photo", "Measuring tape or caliper"],
              totalTime: "PT12M",
            },
          ]),
        }}
      />
    </>
  )
}
