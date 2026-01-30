// app/en/(pages)/organizers/modugrid/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import Faq from "@/components/Faq"
import OrganizerBundles from "@/components/OrganizerBundles"
import AutoCarousel from "@/components/AutoCarousel"
import Reveal from "@/components/Reveal"
import { ORGANIZER_PAGES } from "@/content/organizer-details"
import { buildOrganizerSchemas } from "@/lib/organizers"
import { SITE } from "@/lib/seo"

const PAGE = ORGANIZER_PAGES.modugrid
const PAGE_URL = `${SITE.url}/en/organizers/${PAGE.slug}`
const CAROUSEL_ITEMS = [
  { src: "/images/organizers/modugrid/ModuGrid1.jpg", alt: "Gridfinity drawer overview (gridfinity alternative)", width: 1200, height: 900 },
  { src: "/images/organizers/modugrid/ModuGrid2.jpg", alt: "Gridfinity drawer with screws and bits, made-to-fit", width: 1200, height: 900 },
  { src: "/images/organizers/modugrid/ModuGrid3.webp", alt: "Gridfinity tray with bits and screws, label-ready", width: 1200, height: 900 },
  { src: "/images/organizers/modugrid/ModuGrid4.webp", alt: "Gridfinity bins for desk tools and EDC", width: 1200, height: 900 },
  { src: "/images/organizers/modugrid/ModuGrid5.webp", alt: "Gridfinity detail with labels and anti-slip", width: 1200, height: 900 },
  { src: "/images/organizers/modugrid/ModuGrid6.webp", alt: "Gridfinity insert with anti-slip, ready for transport", width: 1200, height: 900 },
  { src: "/images/organizers/modugrid/ModuGrid7.webp", alt: "Gridfinity drawer in use, fast access", width: 1200, height: 900 },
  { src: "/images/organizers/modugrid/ModuGrid8.webp", alt: "Gridfinity custom pocket for multimeter and probes", width: 1200, height: 900 },
  { src: "/images/organizers/modugrid/ModuGrid9.webp", alt: "Gridfinity baseplate with mixed bins (toolbox inlay)", width: 1200, height: 900 },
  { src: "/images/organizers/modugrid/ModuGrid10.webp", alt: "Gridfinity hobby setup for paint and minis", width: 1200, height: 900 },
  { src: "/images/organizers/modugrid/ModuGrid11.webp", alt: "Gridfinity drawer with tools and labels, gridfinity-compatible", width: 1200, height: 900 },
]

const BUNDLES_EN = PAGE.bundles.map((bundle) => {
  if (bundle.slug === "starter-set")
    return {
      ...bundle,
      name: "Starter Set",
      description: "Base grid with flexible compartments for screws, bits and small hand tools.",
      idealFor: ["First drawer or case setup", "Quick win without measuring everything"],
      perks: ["Label zones", "Anti-slip optional", "Fits common 42/63 mm heights"],
    }
  if (bundle.slug === "schroeven-set")
    return {
      ...bundle,
      name: "Screw Set",
      description: "Deeper compartments per size, colour caps and stackable cups for refills.",
      idealFor: ["Keeping screws and plugs separated", "Replacing assorted boxes"],
      perks: ["Stackable inserts", "Colour code caps", "Lid-friendly layout"],
    }
  if (bundle.slug === "elektricien-set")
    return {
      ...bundle,
      name: "Electrician Set",
      description: "Layout for Wagos, strippers, voltage tester and bits. Everything snug.",
      idealFor: ["Service vans and on-site work", "No rattle in upright cases"],
      perks: ["Grip zones for pliers", "Cut-out for tester", "Label-ready rows"],
    }
  return {
    ...bundle,
    name: "Custom Set",
    description: "Parametric insert from your photo + tool list. You pick depth, we send a preview.",
    idealFor: ["Irregular tools", "Mix of electric + hand tools"],
    perks: ["Preview for approval", "Name or label in-print", "Extra pocket for later"],
  }
})

export const metadata: Metadata = {
  title: "Gridfinity organizers | X3DPrints",
  description:
    "Gridfinity-compatible Gridfinity organizers for drawers, desks and cases. Prefab sets plus custom per-tool pockets, labelable and anti-slip. Toolbox inlay made in Belgium.",
  alternates: {
    canonical: PAGE_URL,
    languages: {
      "nl-BE": `${SITE.url}/organizers/${PAGE.slug}`,
      en: PAGE_URL,
    },
  },
  openGraph: {
    title: "Gridfinity organizers | X3DPrints",
    description:
      "Gridfinity inserts with label zones and anti-slip. Custom pockets per tool, made in Belgium.",
    url: PAGE_URL,
    images: [{ url: `${SITE.url}/images/organizers/modugrid/ModuGrid3.webp`, width: 1200, height: 630 }],
    siteName: SITE.name,
    locale: "en_BE",
  },
  twitter: { card: "summary_large_image" },
}

const FAQ_EN = [
  {
    q: "Do I need to supply STL files?",
    a: "No. Send the tools you want to store and the inner dimensions of your drawer or case; we model the layout and deliver plug-and-play trays.",
  },
  {
    q: "Is this only for workshops?",
    a: "No. Gridfinity fits office drawers, maker desks, ESD benches, hobby paint/miniatures, sewing and craft kits, and education/STEM sets.",
  },
  {
    q: "How do I request a custom pocket for one tool?",
    a: "Send a top-down photo, length/width/height (or diameter x height), how it should sit (flat/upright), and how many pieces. We model and confirm before printing.",
  },
  {
    q: "Which material should I choose?",
    a: "PLA Matte for clean drawers; PETG for transport cases. Optional anti-slip bottom and in-print labels.",
  },
  {
    q: "How fast can you deliver?",
    a: "Typically a few working days after intake, depending on number of pockets and material. Share photos + dimensions for the fastest turnaround.",
  },
]

export default function ModuGridPageEn() {
  const contactHref = "/en/contact?material=modugrid"
  const schemas = buildOrganizerSchemas(PAGE, PAGE_URL)
  const imageObjects = CAROUSEL_ITEMS.slice(0, 5).map((img) => ({
    "@context": "https://schema.org",
    "@type": "ImageObject",
    name: img.alt,
    contentUrl: `${SITE.url}${img.src}`,
    thumbnail: `${SITE.url}${img.src}`,
    caption: img.alt,
    width: img.width,
    height: img.height,
  }))
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_EN.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  }

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16 lg:py-20">
        <Reveal className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-800 ring-1 ring-cyan-100 dark:bg-[#0f162c] dark:text-cyan-200">
            Gridfinity · open-source grid without loose bins
          </div>
          <div className="space-y-4">
            <h1 className="text-balance text-4xl font-extrabold text-slate-900 sm:text-5xl">
              Custom Gridfinity organizers for your system.
            </h1>
            <p className="max-w-3xl text-lg text-slate-700 dark:text-slate-200">
              Gridfinity-compatible alternative and toolbox inlay made in Belgium. Prefab sets plus custom pockets per tool.
            </p>
            <p className="max-w-3xl text-slate-700 dark:text-slate-200">
              Every bin can be customized: send a photo + dimensions and we model a per-tool pocket with label edge and optional anti-slip.
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              <a href="#bundles" className="underline decoration-cyan-400 hover:decoration-cyan-700">
                Bundles & presets
              </a>
              <a href="#carousel" className="underline decoration-cyan-400 hover:decoration-cyan-700">
                Photos
              </a>
              <a href="#faq" className="underline decoration-cyan-400 hover:decoration-cyan-700">
                FAQ
              </a>
              <Link href="/en/blog/gridfinity-modular-storage-system" className="underline decoration-cyan-400 hover:decoration-cyan-700">
                Gridfinity guide
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <div className="flex flex-wrap gap-3">
              <Link href={contactHref} className="no-underline">
                <div className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:brightness-110 dark:bg-cyan-500">
                  Plan a Gridfinity layout
                  <span className="i-lucide-arrow-right" aria-hidden />
                </div>
              </Link>
              <Link
                href="#bundles"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-cyan-400 hover:text-cyan-900 dark:border-slate-700 dark:text-slate-100"
              >
                Go to bundles
                <span className="i-lucide-layout-grid" aria-hidden />
              </Link>
              <Link
                href="#carousel"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-cyan-400 hover:text-cyan-900 dark:border-slate-700 dark:text-slate-100"
              >
                View photos
                <span className="i-lucide-image" aria-hidden />
              </Link>
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Sell order, not plastic. Save time, keep tools quiet.
            </p>
          </div>
        </Reveal>
      </div>

      <section className="bg-gradient-to-b from-white to-slate-50 px-4 py-12 sm:py-16 dark:from-[#050815] dark:to-[#0B0F1A]">
        <div className="mx-auto max-w-6xl space-y-10">
          <section id="bundles">
            <Reveal>
              <OrganizerBundles systemSlug={PAGE.slug} systemName="Gridfinity" bundles={BUNDLES_EN} />
            </Reveal>
          </section>

          <section id="carousel">
            <Reveal className="rounded-3xl border border-slate-100 bg-white/80 p-6 ring-1 ring-white/70 backdrop-blur dark:border-slate-800 dark:bg-[#0B0F1A]/80 dark:ring-0">
              <AutoCarousel
                visibleCount={3}
                speed={4}
                itemClass="aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/3]"
                items={CAROUSEL_ITEMS}
              />
            </Reveal>
          </section>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
        <section id="faq">
        <Reveal className="rounded-3xl border border-slate-100 bg-white/80 p-6 ring-1 ring-white/70 backdrop-blur dark:border-slate-800 dark:bg-[#0B0F1A]/80 dark:ring-0">
          <Faq items={FAQ_EN} title="Frequently asked questions about Gridfinity organizers" className="mt-0" />
        </Reveal>
        </section>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            schemas.service,
            schemas.offerCatalog,
            faqSchema,
            ...imageObjects,
            {
              "@context": "https://schema.org",
              "@type": "HowTo",
              name: "Request a custom Gridfinity pocket",
              description: "Ask a custom per-tool pocket with photo and dimensions.",
              step: [
                { "@type": "HowToStep", position: 1, name: "Take a photo", text: "Top-down photo of the tool in the open case or on paper." },
                { "@type": "HowToStep", position: 2, name: "Measure", text: "Length, width and height (or diameter x height) in millimetres." },
                { "@type": "HowToStep", position: 3, name: "Choose orientation", text: "Flat or upright placement." },
                { "@type": "HowToStep", position: 4, name: "Qty", text: "Tell how many identical tools go in the same drawer." },
                { "@type": "HowToStep", position: 5, name: "Send", text: "Upload via the contact form (prefill Gridfinity)." },
              ],
              tool: ["Photo", "Ruler or caliper"],
              totalTime: "PT10M",
            },
          ]),
        }}
      />
    </>
  )
}
