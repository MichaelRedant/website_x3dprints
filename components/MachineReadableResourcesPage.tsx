import Link from "next/link"
import { Database, ExternalLink, FileJson, Map, MessageSquareCode } from "lucide-react"
import type { Metadata } from "next"
import { SHOP_INDEXABLE } from "@/content/shop-products"
import { buildMachineReadableManifest, getMachineReadableResourceLinks } from "@/lib/machine-readable"
import { SITE } from "@/lib/seo"

type PageLocale = "nl" | "en"

const COPY = {
  nl: {
    eyebrow: "Machine-readable resources",
    title: "Machine-readable bronnen voor agents en developers",
    intro:
      "Deze pagina bundelt de publieke machine-readable bronnen van X3DPrints voor AI-agents, developer tools en andere systemen die de site correct willen interpreteren.",
    primaryLinksTitle: "Belangrijkste ingang",
    feedsTitle: "Beschikbare feeds",
    whyTitle: "Waarom dit bestaat",
    whyBody:
      "Dit is een additieve laag. De gewone website, canonicals, interne links, schema en sitemap blijven leidend voor SEO. Deze resources maken het alleen makkelijker om de juiste pagina sneller te vinden.",
    notesTitle: "Opmerkingen",
    notes: [
      "Deze feeds worden opgebouwd uit stabiele sitegegevens en bedoeld als machine-readable hulpbron.",
      ...(SHOP_INDEXABLE ? ["De shop werkt quote-first: productpagina's sturen naar offerte of aanvraag, niet naar een zware checkoutflow."] : []),
      "De resources zelf zijn geen vervanging van gewone contentpagina's, maar een extra routinglaag voor agents en tools.",
      "De feeds worden bewust niet als aparte datafeeds in de sitemap opgenomen.",
    ],
    llms: "LLMs.txt",
    manifest: "Manifest-feed",
    descriptions: {
      business: "Kerngegevens van studio, regio, materials-flow en quote-first aanpak.",
      services: "Compact overzicht van kernservices, modeling, organizers en offerteflow.",
      materials: "Materialenbibliotheek met slugs, eigenschappen en stock-signalen per materiaalpagina.",
      shop: "Live shopproducten, prijs, beschikbaarheid en quote-first bestelwijze.",
      cases: "Live cases met sector, materiaalcontext en publicatiedatum.",
      content_map: "Routinglaag met page roles, intent, prioriteit en aanbevolen vervolgpagina's.",
    },
  },
  en: {
    eyebrow: "Machine-readable resources",
    title: "Machine-readable resources for agents and developers",
    intro:
      "This page bundles the public machine-readable resources of X3DPrints for AI agents, developer tools and other systems that need to interpret the site correctly.",
    primaryLinksTitle: "Primary entry points",
    feedsTitle: "Available feeds",
    whyTitle: "Why this exists",
    whyBody:
      "This is an additive layer. The regular website, canonicals, internal links, schema and sitemap remain the primary SEO signals. These resources simply make it easier to find the right page faster.",
    notesTitle: "Notes",
    notes: [
      "These feeds are generated from stable site data and meant as a machine-readable helper layer.",
      ...(SHOP_INDEXABLE ? ["The shop is quote-first: product pages route to quote or inquiry flows instead of a heavy checkout."] : []),
      "These resources do not replace the normal content pages, but act as an extra routing layer for agents and tools.",
      "The feeds are intentionally not listed as separate data feeds in the sitemap.",
    ],
    llms: "LLMs.txt",
    manifest: "Manifest feed",
    descriptions: {
      business: "Core studio details, service region, materials flow and quote-first model.",
      services: "Compact overview of core services, modeling, organizers and quote flow.",
      materials: "Material library with slugs, properties and stock signals per material page.",
      shop: "Live shop products, price, availability and quote-first ordering mode.",
      cases: "Live case pages with sector, material context and publish date.",
      content_map: "Routing layer with page roles, intent, priority and recommended next pages.",
    },
  },
} as const

export function buildMachineReadableMetadata(locale: PageLocale): Metadata {
  const isEn = locale === "en"
  const path = isEn ? "/en/machine-readable-resources/" : "/machine-readable-resources/"
  const canonical = `${SITE.url}${path}`

  return {
    title: isEn
      ? "Machine-readable resources for AI tools | X3DPrints"
      : "Machine-readable bronnen voor AI-tools | X3DPrints",
    description: isEn
      ? `Public machine-readable resources for X3DPrints: llms.txt, manifest, business, services, materials${SHOP_INDEXABLE ? ", shop" : ""}, cases and content-map feeds.`
      : SHOP_INDEXABLE
          ? "Publieke machine-readable bronnen voor X3DPrints: llms.txt, manifest, business-, services-, materials-, shop-, cases- en content-map-feeds."
          : "Publieke machine-readable bronnen voor X3DPrints: llms.txt, manifest, business-, services-, materials-, cases- en content-map-feeds.",
    alternates: {
      canonical,
      languages: {
        "nl-BE": `${SITE.url}/machine-readable-resources/`,
        "en-BE": `${SITE.url}/en/machine-readable-resources/`,
        "x-default": `${SITE.url}/machine-readable-resources/`,
      },
    },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      url: canonical,
      title: isEn
        ? "Machine-readable resources for AI tools | X3DPrints"
        : "Machine-readable bronnen voor AI-tools | X3DPrints",
      description: isEn
        ? "Public machine-readable resources for X3DPrints and AI agents."
        : "Publieke machine-readable bronnen voor X3DPrints en AI-agents.",
      images: [{ url: "/images/og-default.svg", width: 1200, height: 630, alt: "X3DPrints machine-readable resources" }],
    },
  }
}

export default function MachineReadableResourcesPage({ locale }: { locale: PageLocale }) {
  const copy = COPY[locale]
  const manifest = buildMachineReadableManifest(locale)
  const links = getMachineReadableResourceLinks(locale)
  const feedEntries = Object.entries(manifest.feeds) as Array<
    ["business" | "services" | "materials" | "shop" | "cases" | "content_map", string]
  >

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.18),_transparent_45%),linear-gradient(180deg,#f8fbff_0%,#eef5ff_100%)] px-6 py-16 text-slate-900 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl space-y-10">
        <section className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-sky-700/80">{copy.eyebrow}</p>
          <div className="max-w-4xl space-y-4">
            <h1 className="text-balance text-4xl font-extrabold text-slate-900 sm:text-5xl">{copy.title}</h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-700">{copy.intro}</p>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)]">
          <div className="rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.25)] backdrop-blur">
            <div className="flex items-center gap-3">
              <MessageSquareCode className="h-5 w-5 text-sky-700" />
              <h2 className="text-lg font-semibold text-slate-900">{copy.primaryLinksTitle}</h2>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Link href={links.llms} className="rounded-2xl border border-sky-100 bg-sky-50/70 p-4 transition hover:border-sky-300 hover:bg-sky-50">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-semibold text-slate-900">{copy.llms}</span>
                  <ExternalLink className="h-4 w-4 text-sky-700" />
                </div>
                <p className="mt-2 text-sm text-slate-600">Root-level LLM guidance for X3DPrints.</p>
              </Link>
              <Link href={links.manifest} className="rounded-2xl border border-sky-100 bg-sky-50/70 p-4 transition hover:border-sky-300 hover:bg-sky-50">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-semibold text-slate-900">{copy.manifest}</span>
                  <ExternalLink className="h-4 w-4 text-sky-700" />
                </div>
                <p className="mt-2 text-sm text-slate-600">Single entry point that links to every structured feed.</p>
              </Link>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.25)] backdrop-blur">
            <div className="flex items-center gap-3">
              <Map className="h-5 w-5 text-sky-700" />
              <h2 className="text-lg font-semibold text-slate-900">{copy.whyTitle}</h2>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-700">{copy.whyBody}</p>
          </aside>
        </section>

        <section className="rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.25)] backdrop-blur">
          <div className="flex items-center gap-3">
            <Database className="h-5 w-5 text-sky-700" />
            <h2 className="text-lg font-semibold text-slate-900">{copy.feedsTitle}</h2>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {feedEntries.map(([key, href]) => (
              <Link key={key} href={href} className="group rounded-2xl border border-slate-200 bg-white/80 p-5 transition hover:border-sky-300 hover:shadow-[0_18px_40px_-28px_rgba(2,132,199,0.45)]">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <FileJson className="h-4 w-4 text-sky-700" />
                    <span className="font-semibold text-slate-900">{key}.json</span>
                  </div>
                  <ExternalLink className="h-4 w-4 text-slate-400 transition group-hover:text-sky-700" />
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{copy.descriptions[key]}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.25)] backdrop-blur">
          <h2 className="text-lg font-semibold text-slate-900">{copy.notesTitle}</h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
            {copy.notes.map((note) => (
              <li key={note} className="rounded-2xl border border-slate-200 bg-white/70 px-4 py-3">
                {note}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  )
}
