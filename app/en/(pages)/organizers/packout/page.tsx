// app/en/(pages)/organizers/packout/page.tsx
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import ContentTableOfContents from "@/components/ContentTableOfContents"
import AutoCarousel from "@/components/AutoCarousel"
import Faq from "@/components/Faq"
import OrganizerBundles from "@/components/OrganizerBundles"
import Reveal from "@/components/Reveal"
import { ORGANIZER_PAGES } from "@/content/organizer-details"
import { buildOrganizerContactHref, buildOrganizerSchemas, type OrganizerPageContent } from "@/lib/organizers"
import { SITE, buildFaqPageSchema, buildHowToSchema } from "@/lib/seo"

const PAGE_EN: OrganizerPageContent = {
  ...ORGANIZER_PAGES.packout,
  seo: {
    ...ORGANIZER_PAGES.packout.seo,
    title: "Packout organizer inserts made in Belgium | X3DPrints",
    description:
      "Milwaukee Packout inlay made to fit: snug pockets for batteries, chargers and bits. Labelable, anti-slip, no rattle. Custom toolbox organizer in Belgium.",
    canonical: `${SITE.url}/en/organizers/packout/`,
    ogImage: `${SITE.url}/images/organizers/milwaukee/milwaukee1.webp`,
  },
  heroTitle: "Packout organizers that stay quiet",
  heroSubtitle: "Tailored layouts for bits, batteries, chargers and mixed kits.",
  intro:
    "Built for Milwaukee Packout cases: snug trays that survive transport, even upright. Made for field technicians, installers and service teams.",
  summary: "Compact organizers, battery/charger inlays and combo sets. Intake with a photo plus the model number of your Packout.",
  pains: ["Bits flying around", "Batteries without a fixed spot", "Time lost digging for pliers", "No overview in deep trays"],
  steps: [
    { title: "Pick your Packout model", description: "Share the model number or a photo of the open case." },
    { title: "List what goes inside", description: "Batteries, chargers, bits, hand tools or measuring gear." },
    { title: "We model the trays", description: "Snug per tray height with grip cuts and label zones." },
    { title: "Print & deliver", description: "We ship plug-and-play inserts matched to your model." },
  ],
  bundles: ORGANIZER_PAGES.packout.bundles.map((bundle) => ({
    ...bundle,
    name:
      bundle.slug === "compact-organizer-48-22-8435"
        ? "Compact Organizer (48-22-8435)"
        : bundle.slug === "low-profile-48-22-8431"
          ? "Low-Profile Organizer (48-22-8431)"
          : bundle.slug === "low-profile-compact-48-22-8436"
            ? "Low-Profile Compact (48-22-8436)"
            : "Custom Packout Layout",
  })),
  priceCopy: "Quote per Packout model and layout; made-to-order in Belgium.",
  upsells: ["Anti-slip base", "Label in the print", "Color caps for fast ID"],
  proofPoints: [
    "Designed for genuine Milwaukee Packout cases",
    "No rattle, no play",
    "Made-to-order in Belgium",
  ],
  faq: [
    {
      q: "Do I need OEM inlays or STL files?",
      a: "No. We model on the empty Packout tray. You only provide the model number or a clear photo of the open case, plus what needs to fit.",
    },
    {
      q: "Can I mix battery formats (M12/M18)?",
      a: "Yes. Each battery gets a snug pocket with an optional anti-slip base. Mixed formats are supported as long as we have their dimensions.",
    },
    {
      q: "Are the inserts removable?",
      a: "Standard is friction-fit. If you want to swap layouts, we add pull tabs and a tiny tolerance so you can lift them out easily.",
    },
    {
      q: "Which material should I pick?",
      a: "PETG is the default for Packout because it handles impact and heat better. PLA Matte is possible for light-duty trays. Anti-slip and in-print labels are optional upgrades.",
    },
    {
      q: "What is the lead time?",
      a: "After intake (photo + model number + tool list) we usually ship within a few working days, depending on tray count and material choice.",
    },
    {
      q: "Which Packout models do you support?",
      a: "We cover the Packout Organizer (48-22-8435), Low-Profile Organizer (48-22-8431) and Low-Profile Compact (48-22-8436) by default. Other trays are possible with photo + inner dimensions.",
    },
    {
      q: "What intake info speeds things up?",
      a: "Model number or photo of the open Packout, list of tools/batteries/chargers with quantities, and whether the case is carried upright in a van. That lets us design rattle-free, transport-ready trays quickly.",
    },
  ],
}

const CAROUSEL_ITEMS = [
  { src: "/images/organizers/milwaukee/milwaukee2.webp", alt: "Milwaukee Packout organizer with divided bins", width: 1600, height: 900 },
  { src: "/images/organizers/milwaukee/milwaukee3.webp", alt: "Packout inlay for bits and screws, snug fit", width: 1600, height: 900 },
  { src: "/images/organizers/milwaukee/milwaukee4.webp", alt: "Packout battery and charger inlay without rattle", width: 1600, height: 900 },
  { src: "/images/organizers/milwaukee/milwaukee5.webp", alt: "Packout low-profile organizer with label zones", width: 1600, height: 900 },
  { src: "/images/organizers/milwaukee/milwaukee6.webp", alt: "Packout compact organizer with anti-slip option", width: 1600, height: 900 },
  { src: "/images/organizers/milwaukee/milwaukee7.webp", alt: "Packout layout for service van, no loose parts", width: 1600, height: 900 },
  { src: "/images/organizers/milwaukee/milwaukee8.jpg", alt: "Packout inlay with color coding and label rows", width: 1600, height: 900 },
  { src: "/images/organizers/milwaukee/milwaukee9.jfif", alt: "Packout organizer mixing batteries and hand tools", width: 1600, height: 900 },
  { src: "/images/organizers/milwaukee/milwaukee10.jpeg", alt: "Packout low-profile compact for small consumables", width: 1600, height: 900 },
]

const PAGE_URL = PAGE_EN.seo.canonical
const contactHref = buildOrganizerContactHref("packout", undefined, "en")
const schemas = buildOrganizerSchemas(PAGE_EN, PAGE_URL)
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
const faqSchema = buildFaqPageSchema({
  inLanguage: "en-BE",
  mainEntityOfPage: PAGE_URL,
  items: PAGE_EN.faq,
})
const howToSchema = buildHowToSchema({
  name: "Request a custom Packout pocket",
  description: "Send a photo, model number and dimensions to get a fitted Packout insert.",
  inLanguage: "en-BE",
  mainEntityOfPage: PAGE_URL,
  totalTime: "PT10M",
  toolNames: ["Photo of the open case", "Measuring tape or caliper"],
  url: PAGE_URL,
  steps: [
    { name: "Share model", text: "Model number of your Packout or a photo of the open case." },
    { name: "Add dimensions", text: "Inner length/width/height in millimetres if available." },
    { name: "List tools", text: "Batteries, chargers, bits, hand tools with quantities." },
    { name: "Upload via form", text: "Use the contact form with Packout prefill to send it." },
  ],
})
const tocItems = [
  { id: "packout-overview", label: "What does a Packout layout solve?" },
  { id: "bundles", label: "Bundles and presets" },
  { id: "faq", label: "Packout FAQ" },
  { id: "carousel", label: "Packout layout photos" },
  { id: "packout-sources", label: "Sources and references" },
]
const references = [
  { label: "Milwaukee PACKOUT overview", url: "https://www.milwaukeetool.eu/en-eu/milwaukee/packout/" },
  { label: "Milwaukee Packout organizers", url: "https://www.milwaukeetool.eu/en-eu/storage/packout/packout-organisers/" },
  { label: "ISO/ASTM 52900 terminology", url: "https://www.astm.org/f2997-13r21.html" },
]
const lastUpdatedLabel = "Last updated: February 6, 2026"

export const metadata: Metadata = {
  title: PAGE_EN.seo.title,
  description: PAGE_EN.seo.description,
  alternates: {
    canonical: PAGE_URL,
    languages: {
      "nl-BE": `${SITE.url}/organizers/packout/`,
      "en-BE": PAGE_URL,
      "x-default": `${SITE.url}/organizers/packout/`,
    },
  },
  openGraph: {
    title: PAGE_EN.seo.title,
    description: PAGE_EN.seo.description,
    url: PAGE_URL,
    images: [{ url: PAGE_EN.seo.ogImage!, width: 1200, height: 630, alt: "Packout organizer insert made to fit" }],
    siteName: SITE.name,
    locale: "en_BE",
  },
  twitter: { card: "summary_large_image" },
}

export default function PackoutPageEn() {
  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16 lg:py-20">
        <Reveal className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-800 ring-1 ring-amber-100 dark:bg-[#0f162c] dark:text-amber-200">
            Milwaukee Packout
          </div>
          <div className="space-y-4">
            <h1 className="text-balance text-4xl font-extrabold text-slate-900 sm:text-5xl">{PAGE_EN.heroTitle}</h1>
            <p className="max-w-3xl text-lg text-slate-700 dark:text-slate-200">{PAGE_EN.heroSubtitle}</p>
            <p className="max-w-3xl text-slate-700 dark:text-slate-200">{PAGE_EN.intro}</p>
            <p className="max-w-3xl text-sm font-semibold text-slate-600 dark:text-slate-300">
              Built for professionals: service crews, installers, technicians, and van setups.
            </p>
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">{lastUpdatedLabel}</p>
            <ContentTableOfContents title="Contents" items={tocItems} className="max-w-xl" />
            <div className="overflow-hidden rounded-2xl border border-white/60 shadow-lg ring-1 ring-white/60 dark:border-slate-800 dark:ring-0">
              <Image
                src="/images/organizers/milwaukee/milwaukee1.webp"
                alt="Milwaukee Packout organizer in use in a service van"
                width={1600}
                height={900}
                priority
                className="h-auto w-full object-cover"
              />
            </div>
            <div className="flex flex-wrap gap-3 text-sm">
              <a href="#bundles" className="underline decoration-amber-400 hover:decoration-amber-700">
                Bundles & presets
              </a>
              <a href="#carousel" className="underline decoration-amber-400 hover:decoration-amber-700">
                Photos
              </a>
              <a href="#faq" className="underline decoration-amber-400 hover:decoration-amber-700">
                FAQ
              </a>
              <Link href="/en/blog/tool-organizers-3d-printing" className="underline decoration-amber-400 hover:decoration-amber-700">
                Organizers blog
              </Link>
              <a href="#packout-sources" className="underline decoration-amber-400 hover:decoration-amber-700">
                Sources
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <div className="flex flex-wrap gap-3">
              <Link href={contactHref} className="no-underline">
                <div className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:brightness-110 dark:bg-amber-500">
                  Plan a Packout layout
                  <span className="i-lucide-arrow-right" aria-hidden />
                </div>
              </Link>
              <Link
                href="#bundles"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-amber-400 hover:text-amber-900 dark:border-slate-700 dark:text-slate-100"
              >
                Jump to bundles
                <span className="i-lucide-sparkles" aria-hidden />
              </Link>
              <Link
                href="/en/materials#material-suggestion-tool"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-amber-400 hover:text-amber-900 dark:border-slate-700 dark:text-slate-100"
              >
                See material options
              </Link>
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Quiet Packout: snug, labelable, ready for transport.
            </p>
          </div>

          <ul className="grid gap-2 sm:grid-cols-2">
            {PAGE_EN.proofPoints.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 rounded-xl bg-white/70 px-4 py-3 text-sm font-semibold text-slate-800 ring-1 ring-white/60 backdrop-blur dark:bg-[#0B0F1A]/70 dark:text-slate-100 dark:ring-0"
              >
                <span className="i-lucide-check-circle-2 text-amber-600" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
          <Link
            href="https://www.milwaukeetool.eu/en-eu/storage/packout/packout-organisers/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 underline underline-offset-4 hover:text-indigo-900"
          >
            View Milwaukee Packout organizers
            <span className="i-lucide-external-link" aria-hidden />
          </Link>
        </Reveal>
      </div>

      <section className="bg-gradient-to-b from-white to-slate-50 px-4 py-12 sm:py-16 dark:from-[#050815] dark:to-[#0B0F1A]">
        <div className="mx-auto max-w-6xl space-y-10">
          <Reveal className="grid gap-6 rounded-3xl bg-white/70 p-6 ring-1 ring-white/60 backdrop-blur dark:bg-[#0B0F1A]/70 dark:ring-0 md:grid-cols-[1fr_1fr] md:gap-10">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">What you solve</p>
              <h2 id="packout-overview" className="scroll-mt-28 text-2xl font-bold text-slate-900 dark:text-white">Calm Packout, faster jobs</h2>
              <p className="text-slate-700 dark:text-slate-200">
                No loose bins or foam that degrades. You get a fixed layout that survives transport.
              </p>
            </div>
            <ul className="grid gap-3">
              {PAGE_EN.pains.map((pain) => (
                <li
                  key={pain}
                  className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white/70 px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm shadow-slate-900/5 dark:border-slate-800 dark:bg-[#0f162c] dark:text-slate-100"
                >
                  <span className="i-lucide-minus-circle text-amber-600" aria-hidden />
                  {pain}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="rounded-3xl border border-slate-100 bg-white/80 p-6 shadow-lg shadow-slate-900/5 ring-1 ring-white/70 backdrop-blur dark:border-slate-800 dark:bg-[#0B0F1A]/80 dark:ring-0">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">How it works</p>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">No foam cutting, just a fitted layout</h2>
                <p className="mt-2 max-w-2xl text-slate-700 dark:text-slate-200">{PAGE_EN.summary}</p>
              </div>
              <Link
                href={contactHref}
                className="text-sm font-semibold text-amber-700 underline-offset-4 hover:text-amber-900 hover:underline dark:text-amber-200 dark:hover:text-amber-100"
              >
                Start with your Packout model number
              </Link>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-4">
              {PAGE_EN.steps.map((step, index) => (
                <div
                  key={step.title}
                  className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 text-slate-800 ring-1 ring-white/60 dark:border-slate-800 dark:bg-[#0f162c] dark:text-slate-100"
                >
                  <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-amber-600 text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <h3 className="text-base font-semibold">{step.title}</h3>
                  <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">{step.description}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <section id="bundles" className="scroll-mt-28">
          <Reveal>
            <OrganizerBundles systemSlug={PAGE_EN.slug} systemName={PAGE_EN.systemName} bundles={PAGE_EN.bundles} />
          </Reveal>
          </section>

          <section id="faq" className="scroll-mt-28">
          <Reveal className="rounded-3xl border border-slate-100 bg-white/80 p-6 ring-1 ring-white/70 backdrop-blur dark:border-slate-800 dark:bg-[#0B0F1A]/80 dark:ring-0">
            <Faq items={PAGE_EN.faq} title="Packout organizer FAQ" className="mt-0" />
          </Reveal>
          </section>

          <section id="carousel" className="scroll-mt-28">
          <Reveal className="rounded-3xl border border-slate-100 bg-white/80 p-6 ring-1 ring-white/70 backdrop-blur dark:border-slate-800 dark:bg-[#0B0F1A]/80 dark:ring-0">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">Gallery</p>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Packout layouts (photos coming)</h2>
                <p className="text-sm text-slate-600 dark:text-slate-300">Carousel ready; real Packout shots will be added.</p>
              </div>
              <Link
                href={contactHref}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-amber-400 hover:text-amber-900 dark:border-slate-700 dark:text-slate-100"
              >
                Plan your Packout
                <span className="i-lucide-arrow-right" aria-hidden />
              </Link>
            </div>
            <AutoCarousel visibleCount={3} speed={4} itemClass="aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/3]" items={CAROUSEL_ITEMS} />
          </Reveal>
          </section>

          <section id="howto" className="scroll-mt-28">
          <Reveal className="rounded-3xl border border-slate-100 bg-white/80 p-6 ring-1 ring-white/70 backdrop-blur dark:border-slate-800 dark:bg-[#0B0F1A]/80 dark:ring-0">
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Peace of mind, faster service calls</h2>
              <p className="text-slate-700 dark:text-slate-200">
                A Packout that stays silent keeps your focus on the job and on the road: less searching in the van, fewer mistakes on site.
              </p>
              <p className="text-slate-700 dark:text-slate-200">
                Order brings calm. One fixed place per tool speeds up load-in and load-out for every intervention.
              </p>
            </div>
            <div className="mt-4 rounded-2xl border border-amber-100/70 bg-amber-50/70 px-5 py-4 text-sm font-semibold text-amber-900 shadow-sm ring-1 ring-white/60 dark:border-slate-700 dark:bg-[#0f162c] dark:text-amber-100 dark:ring-0">
              <div className="flex items-center gap-2">
                <span className="i-lucide-brain text-amber-600 dark:text-amber-300" aria-hidden />
                <span>Quick intake checklist</span>
              </div>
              <ul className="mt-3 space-y-2 text-slate-800 dark:text-slate-100">
                <li className="flex items-center gap-2">
                  <span className="i-lucide-check text-emerald-600" aria-hidden />
                  Model number or photo of your Packout
                </li>
                <li className="flex items-center gap-2">
                  <span className="i-lucide-check text-emerald-600" aria-hidden />
                  Tool list with quantities (batteries, bits, chargers)
                </li>
                <li className="flex items-center gap-2">
                  <span className="i-lucide-check text-emerald-600" aria-hidden />
                  Preference for anti-slip and labels
                </li>
              </ul>
            </div>
          </Reveal>
          </section>

          <section id="packout-sources" className="scroll-mt-28">
            <Reveal className="rounded-3xl border border-slate-100 bg-white/80 p-6 ring-1 ring-white/70 backdrop-blur dark:border-slate-800 dark:bg-[#0B0F1A]/80 dark:ring-0">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Sources and references</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-200">
                These references support system naming, compatibility and terminology on this Packout page.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-100">
                {references.map((reference) => (
                  <li key={reference.url} className="rounded-xl border border-slate-200/70 bg-white/80 px-4 py-3 dark:border-slate-700 dark:bg-[#0f162c]">
                    <cite className="not-italic">
                      <Link href={reference.url} target="_blank" rel="noreferrer" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        {reference.label}
                      </Link>
                    </cite>
                  </li>
                ))}
              </ul>
            </Reveal>
          </section>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            schemas.service,
            schemas.offerCatalog,
            faqSchema,
            ...imageObjects,
            howToSchema,
          ]),
        }}
      />
    </>
  )
}
