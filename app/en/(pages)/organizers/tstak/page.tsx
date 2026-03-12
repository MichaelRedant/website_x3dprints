// app/en/(pages)/organizers/tstak/page.tsx
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
  ...ORGANIZER_PAGES.tstak,
  seo: {
    ...ORGANIZER_PAGES.tstak.seo,
    title: "TSTAK inserts made to fit | X3DPrints",
    description:
      "Stanley/DeWALT TSTAK inserts for small parts and all-round kits: no rattle, clear label zones and optional anti-slip. Custom TSTAK insert in Belgium for field teams and vans.",
    canonical: `${SITE.url}/en/organizers/tstak/`,
    ogImage: "/images/organizers/tstak/tstak0.webp",
  },
  heroTitle: "TSTAK inserts with fixed layouts",
  heroSubtitle: "Preset sets for small parts and all-round cases, custom possible.",
  intro:
    "For Stanley / DeWALT TSTAK cases: quiet trays with label zones and optional anti-slip. Built for professional teams that need order on site.",
  summary:
    "Small parts, all-round and custom layouts. Intake with model number or photo so we match the height of your TSTAK.",
  pains: ["Small parts mixing", "Trays too deep", "No label zones", "Rattle during transport"],
  steps: [
    { title: "Pick TSTAK model", description: "Share the model number or a photo of the open case." },
    { title: "Select contents", description: "Small parts, hand tools or a mix." },
    { title: "Layout & labels", description: "We divide pockets and add label zones." },
    { title: "Print & deliver", description: "Delivered ready to use, tuned to the given height." },
  ],
  bundles: ORGANIZER_PAGES.tstak.bundles.map((bundle) => ({
    ...bundle,
    name:
      bundle.slug === "small-parts-set"
        ? "TSTAK Small Parts Set"
        : bundle.slug === "allround-set"
          ? "TSTAK Allround Set"
          : "TSTAK Pro Layout",
  })),
  priceCopy: "Quote per TSTAK case and layout.",
  upsells: ["Anti-slip", "Label in print", "Extra pocket"],
  proofPoints: ["No rattle", "Fits per case height", "Made-to-order in Belgium"],
  faq: [
    {
      q: "Will this fit every TSTAK height?",
      a: "We model per tray height. Share the model number or the inner height in millimetres and we match it.",
    },
    {
      q: "Does the layout stay in place upright?",
      a: "Yes, we add clamp edges and optional anti-slip so the layout stays put when you carry the case upright.",
    },
    {
      q: "Can I reorder modules later?",
      a: "Yes. We keep your layout on file so we can reprint or extend with the same fit.",
    },
    {
      q: "Which material do you use?",
      a: "PETG for field use and transport; PLA Matte for light-duty setups. Anti-slip and labels are optional upgrades.",
    },
    {
      q: "What about lead time?",
      a: "Usually a few working days after intake, depending on the number of pockets and the chosen material.",
    },
    {
      q: "Which TSTAK models are covered?",
      a: "We target the standard TSTAK organizers (e.g. DWST17814) and adapt to your tray height. Other TSTAK variants are possible with a photo and inner dimensions.",
    },
    {
      q: "Can you add labels or colour codes?",
      a: "Yes. We add label zones and can engrave text or use colour cues so teams find the right parts faster.",
    },
    {
      q: "What info should I send for a fast intake?",
      a: "Model number or tray height, photo of the open case, list of parts/tools with quantities, and whether the case is carried upright in a van.",
    },
  ],
}

const PAGE_URL = PAGE_EN.seo.canonical
const contactHref = buildOrganizerContactHref("tstak", undefined, "en")
const schemas = buildOrganizerSchemas(PAGE_EN, PAGE_URL)
const faqSchema = buildFaqPageSchema({
  inLanguage: "en-BE",
  mainEntityOfPage: PAGE_URL,
  items: PAGE_EN.faq,
})
const howToSchema = buildHowToSchema({
  name: "Request a custom TSTAK pocket",
  description: "Send a photo and dimensions to get a fitted TSTAK insert.",
  inLanguage: "en-BE",
  mainEntityOfPage: PAGE_URL,
  totalTime: "PT10M",
  toolNames: ["Photo of the open case", "Measuring tape or caliper"],
  url: PAGE_URL,
  steps: [
    { name: "Share model", text: "Model number of your TSTAK or a photo of the open case." },
    { name: "Add dimensions", text: "Inner length/width/height in millimetres if available." },
    { name: "List tools", text: "Small parts, hand tools or mix with quantities." },
    { name: "Upload via form", text: "Use the contact form with TSTAK prefill to send it." },
  ],
})
const tocItems = [
  { id: "tstak-overview", label: "What does a TSTAK layout solve?" },
  { id: "bundles", label: "Bundles and presets" },
  { id: "carousel", label: "TSTAK layout photos" },
  { id: "faq", label: "TSTAK FAQ" },
  { id: "tstak-sources", label: "Sources and references" },
]
const references = [
  { label: "DeWALT TSTAK product information", url: "https://www.dewalt.com/product/dwst17814/tstak%C2%AE-4-compartment-box" },
  { label: "Stanley storage overview", url: "https://www.stanleytools.com/products/storage-and-organization" },
  { label: "ISO/ASTM 52900 terminology", url: "https://www.astm.org/f2997-13r21.html" },
]
const lastUpdatedLabel = "Last updated: February 6, 2026"

export const metadata: Metadata = {
  title: PAGE_EN.seo.title,
  description: PAGE_EN.seo.description,
  alternates: {
    canonical: PAGE_URL,
    languages: {
      "nl-BE": `${SITE.url}/organizers/tstak/`,
      "en-BE": PAGE_URL,
      "x-default": `${SITE.url}/organizers/tstak/`,
    },
  },
  openGraph: {
    title: PAGE_EN.seo.title,
    description: PAGE_EN.seo.description,
    url: PAGE_URL,
    images: [{ url: PAGE_EN.seo.ogImage!, width: 1200, height: 630, alt: "TSTAK organizer insert made to fit" }],
    siteName: SITE.name,
    locale: "en_BE",
  },
  twitter: { card: "summary_large_image" },
}

export default function TstakPageEn() {
  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16 lg:py-20">
        <Reveal className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-800 ring-1 ring-amber-100 dark:bg-[#0f162c] dark:text-amber-200">
            Stanley / DeWALT TSTAK
          </div>
          <div className="space-y-4">
            <h1 className="text-balance text-4xl font-extrabold text-slate-900 sm:text-5xl">{PAGE_EN.heroTitle}</h1>
            <p className="max-w-3xl text-lg text-slate-700 dark:text-slate-200">{PAGE_EN.heroSubtitle}</p>
            <p className="max-w-3xl text-slate-700 dark:text-slate-200">{PAGE_EN.intro}</p>
            <p className="max-w-3xl text-sm font-semibold text-slate-600 dark:text-slate-300">
              Built with field teams in mind: electricians, HVAC, installers, van setups.
            </p>
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">{lastUpdatedLabel}</p>
            <ContentTableOfContents title="Contents" items={tocItems} className="max-w-xl" />
            <div className="overflow-hidden rounded-2xl border border-white/60 shadow-lg ring-1 ring-white/60 dark:border-slate-800 dark:ring-0">
              <Image
                src="/images/organizers/tstak/tstak0.webp"
                alt="TSTAK organizer overview in the case"
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
              <a href="#tstak-sources" className="underline decoration-amber-400 hover:decoration-amber-700">
                Sources
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <div className="flex flex-wrap gap-3">
              <Link href={contactHref} className="no-underline">
                <div className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:brightness-110 dark:bg-amber-500">
                  Plan a TSTAK layout
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
                href="https://www.dewalt.com/product/dwst17814/tstak%C2%AE-4-compartment-box"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-amber-400 hover:text-amber-900 dark:border-slate-700 dark:text-slate-100"
              >
                View TSTAK cases
                <span className="i-lucide-external-link" aria-hidden />
              </Link>
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Quiet, labeled TSTAK layouts for pro teams.
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
        </Reveal>
      </div>

      <section className="bg-gradient-to-b from-white to-slate-50 px-4 py-12 sm:py-16 dark:from-[#050815] dark:to-[#0B0F1A]">
        <div className="mx-auto max-w-6xl space-y-10">
          <Reveal className="grid gap-6 rounded-3xl bg-white/70 p-6 ring-1 ring-white/60 backdrop-blur dark:bg-[#0B0F1A]/70 dark:ring-0 md:grid-cols-[1fr_1fr] md:gap-10">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">What you solve</p>
              <h2 id="tstak-overview" className="scroll-mt-28 text-2xl font-bold text-slate-900 dark:text-white">Order in every tray</h2>
              <p className="text-slate-700 dark:text-slate-200">Fixed pockets that keep parts apart and stay put upright.</p>
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
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">No foam, just fitted inserts</h2>
                <p className="mt-2 max-w-2xl text-slate-700 dark:text-slate-200">{PAGE_EN.summary}</p>
              </div>
              <Link
                href={contactHref}
                className="text-sm font-semibold text-amber-700 underline-offset-4 hover:text-amber-900 hover:underline dark:text-amber-200 dark:hover:text-amber-100"
              >
                Start with your TSTAK model
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

          <section id="carousel" className="scroll-mt-28">
          <Reveal className="rounded-3xl border border-slate-100 bg-white/80 p-6 ring-1 ring-white/70 backdrop-blur dark:border-slate-800 dark:bg-[#0B0F1A]/80 dark:ring-0">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">Gallery</p>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">TSTAK layouts</h2>
              </div>
              <Link
                href={contactHref}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-amber-400 hover:text-amber-900 dark:border-slate-700 dark:text-slate-100"
              >
                Plan your TSTAK
                <span className="i-lucide-arrow-right" aria-hidden />
              </Link>
            </div>
            <AutoCarousel
              visibleCount={3}
              speed={4}
              itemClass="aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/3]"
              items={[
                { src: "/images/organizers/tstak/tstak1.webp", alt: "TSTAK organizer with divided bins", width: 1600, height: 900 },
                { src: "/images/organizers/tstak/tstak2.webp", alt: "TSTAK insert for small parts and bits", width: 1600, height: 900 },
                { src: "/images/organizers/tstak/tstak3.webp", alt: "TSTAK low-profile layout with label zones", width: 1600, height: 900 },
                { src: "/images/organizers/tstak/tstak4.webp", alt: "TSTAK insert with anti-slip option", width: 1600, height: 900 },
                { src: "/images/organizers/tstak/tstak5.webp", alt: "TSTAK organizer detail with color coding", width: 1600, height: 900 },
                { src: "/images/organizers/tstak/tstak6.webp", alt: "TSTAK layout for hand tools and consumables", width: 1600, height: 900 },
                { src: "/images/organizers/tstak/tstak7.webp", alt: "TSTAK trays snug to avoid rattle", width: 1600, height: 900 },
                { src: "/images/organizers/tstak/tstak8.webp", alt: "TSTAK organizer for service kits", width: 1600, height: 900 },
                { src: "/images/organizers/tstak/tstak9.webp", alt: "TSTAK insert with labelable rows", width: 1600, height: 900 },
                { src: "/images/organizers/tstak/tstak10.webp", alt: "TSTAK low-profile compact layout", width: 1600, height: 900 },
              ]}
            />
          </Reveal>
          </section>

          <section id="faq" className="scroll-mt-28">
          <Reveal className="rounded-3xl border border-slate-100 bg-white/80 p-6 ring-1 ring-white/70 backdrop-blur dark:border-slate-800 dark:bg-[#0B0F1A]/80 dark:ring-0">
            <Faq items={PAGE_EN.faq} title="TSTAK organizer FAQ" className="mt-0" />
          </Reveal>
          </section>

          <section id="howto" className="scroll-mt-28">
          <Reveal className="rounded-3xl border border-slate-100 bg-white/80 p-6 ring-1 ring-white/70 backdrop-blur dark:border-slate-800 dark:bg-[#0B0F1A]/80 dark:ring-0">
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Order that travels well</h2>
              <p className="text-slate-700 dark:text-slate-200">
                A silent TSTAK keeps focus on the task: less searching, fewer errors, happier customers.
              </p>
              <p className="text-slate-700 dark:text-slate-200">
                One fixed place per tool gives calm before every job and after every service call.
              </p>
            </div>
          </Reveal>
          </section>

          <section id="tstak-sources" className="scroll-mt-28">
            <Reveal className="rounded-3xl border border-slate-100 bg-white/80 p-6 ring-1 ring-white/70 backdrop-blur dark:border-slate-800 dark:bg-[#0B0F1A]/80 dark:ring-0">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Sources and references</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-200">
                These references support system naming, compatibility and terminology on this TSTAK page.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-100">
                {references.map((reference) => (
                  <li key={reference.url} className="rounded-xl border border-slate-200/70 bg-white/80 px-4 py-3 dark:border-slate-700 dark:bg-[#0f162c]">
                    <cite className="not-italic">
                      <Link href={reference.url} target="_blank" rel="noreferrer" className="font-semibold text-amber-600 hover:text-amber-500">
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
            {
              "@context": "https://schema.org",
              "@type": "ImageObject",
              name: "TSTAK organizer insert",
              contentUrl: PAGE_EN.seo.ogImage,
              thumbnail: PAGE_EN.seo.ogImage,
              caption: "Custom TSTAK organizer insert with label zones and anti-slip options",
            },
            howToSchema,
          ]),
        }}
      />
    </>
  )
}

