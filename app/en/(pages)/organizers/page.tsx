import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import Faq from "@/components/Faq"
import { ORGANIZER_PAGES } from "@/content/organizer-details"
import { buildOrganizerContactHref } from "@/lib/organizers"
import { SITE } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Tool organizers made to fit | X3DPrints",
  description:
    "Gridfinity-style ModuGrid, Packout inserts, TSTAK inserts and fully custom toolbox layouts from Belgium. No STL hassle—fixed, labelable, anti-slip layouts for vans and workbenches.",
  alternates: {
    canonical: "https://www.x3dprints.be/en/organizers",
    languages: {
      "nl-BE": "https://www.x3dprints.be/organizers",
      en: "https://www.x3dprints.be/en/organizers",
    },
  },
  openGraph: {
    title: "Tool organizers made to fit | X3DPrints",
    description:
      "Choose your system: ModuGrid (gridfinity alternative), Packout, TSTAK or custom inserts. Quiet, labelable layouts that stay put in vans and workshops.",
    url: "https://www.x3dprints.be/en/organizers",
    images: [
      { url: `${SITE.url}/images/organizers/modugrid/ModuGrid2.jpg`, width: 1200, height: 630, alt: "Tool organizers, made to fit" },
    ],
    locale: "en_BE",
    siteName: SITE.name,
  },
  twitter: { card: "summary_large_image" },
}

const ORDER = ["modugrid", "packout", "tstak", "custom"] as const

const CARD_COPY_EN = {
  modugrid: {
    systemName: "ModuGrid (gridfinity-style)",
    heroTitle: "ModuGrid organizers made to fit",
    heroSubtitle: "Gridfinity-style layouts for drawers, desks and cases.",
    intro:
      "Fixed layouts with label zones and optional anti-slip for hobbyists and pros. Custom pocket per tool with photo + dimensions.",
    pains: ["Screws mixing", "Empty wasted space", "Time lost searching", "No overview in drawers"],
  },
  packout: {
    systemName: "Milwaukee Packout",
    heroTitle: "Packout organizers that stay quiet",
    heroSubtitle: "Layouts for bits, batteries and chargers without rattle.",
    intro:
      "Snug inserts for genuine Milwaukee Packout cases. Labelable, anti-slip options, made for technicians and installers.",
    pains: ["Bits flying around", "Batteries without a spot", "Deep trays without structure", "No labels"],
  },
  tstak: {
    systemName: "Stanley / DeWALT TSTAK",
    heroTitle: "TSTAK inserts with fixed layouts",
    heroSubtitle: "Preset sets for small parts and all-round kits.",
    intro:
      "Quiet, label-ready trays matched to your TSTAK model height. Anti-slip optional, built for field teams.",
    pains: ["Small parts mixing", "Too-deep trays", "No label zones", "Rattle in transport"],
  },
  custom: {
    systemName: "Custom toolbox inserts",
    heroTitle: "Custom inserts with photo + list",
    heroSubtitle: "Parametric design for any case or toolkit.",
    intro:
      "Send a photo, inner dimensions and tool list; we model and print a made-to-fit insert in PLA/PETG with labels and anti-slip options.",
    pains: ["Odd-shaped tools", "No fitting grid", "Measuring without guidance", "Time lost searching"],
  },
} as const

const FAQ_ITEMS = [
  {
    q: "How does the intake work?",
    a: "Pick your system (ModuGrid/Packout/TSTAK/Custom), add photos and a tool list. We design the layout, send a preview and print on demand.",
  },
  {
    q: "Do I need to supply STL files?",
    a: "No. We model the insert for your case or drawer. You provide dimensions or photos; we deliver the fitting trays.",
  },
  {
    q: "Which materials do you use?",
    a: "PLA Matte for clean looks; PETG when impact resistance is key. Optional anti-slip bottom and labels in-print.",
  },
  {
    q: "Do you support Milwaukee Packout and TSTAK?",
    a: "Yes. We model specifically for Milwaukee Packout and Stanley/DeWALT TSTAK cases and test the fit per model.",
  },
]

export default function OrganizersHubPageEn() {
  const cards = ORDER.map((slug) => ({ ...ORGANIZER_PAGES[slug], ...CARD_COPY_EN[slug] }))

  return (
    <main className="relative overflow-hidden px-6 pb-24 pt-24 sm:px-8 lg:px-12">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_20%_15%,rgba(34,211,238,0.28),transparent),radial-gradient(70%_60%_at_80%_10%,rgba(255,0,168,0.18),transparent),radial-gradient(40%_40%_at_50%_75%,rgba(15,23,42,0.18),transparent)]" />
      <div className="mx-auto max-w-6xl space-y-12">
        <Reveal className="relative overflow-hidden rounded-3xl border border-white/40 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 shadow-2xl ring-1 ring-white/10 dark:border-[#0F203C] dark:ring-0">
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_140%_at_10%_20%,rgba(0,230,255,0.12),transparent),radial-gradient(120%_140%_at_80%_10%,rgba(215,38,61,0.12),transparent)]" />
          <div className="relative space-y-5 text-white">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200 ring-1 ring-white/20">
              <span className="i-lucide-wrench" aria-hidden /> Tool organizers
            </div>
            <div className="flex flex-wrap items-baseline gap-3">
              <h1 className="text-balance text-4xl font-extrabold sm:text-5xl">
                Perfectly organized tool cases, tailored to your system.
              </h1>
              <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200 ring-1 ring-emerald-300/30">
                Jobsite-ready
              </span>
            </div>
            <p className="max-w-3xl text-lg text-slate-100/90">
              ModuGrid (gridfinity), Packout, TSTAK and custom cases. Quiet, labelable layouts that fit your setup. Pick your system or send photos + tool list.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="#systems"
                className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-900 shadow-[0_10px_30px_rgba(34,211,238,0.35)] transition hover:-translate-y-0.5 hover:brightness-110"
              >
                See the systems
                <span className="i-lucide-arrow-right" aria-hidden />
              </Link>
              <Link
                href={buildOrganizerContactHref("organizers" as never)}
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/5 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                Request your layout
              </Link>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                { icon: "i-lucide-sparkle", label: "No rattle", text: "Snug trays that stay quiet in transit." },
                { icon: "i-lucide-stamp", label: "Label & color code", text: "Zones for bits, screws, batteries." },
                { icon: "i-lucide-cpu", label: "Parametric fit", text: "Based on your photo and tool list." },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-3 rounded-2xl bg-white/5 px-4 py-3 text-sm text-slate-100 ring-1 ring-white/10 backdrop-blur"
                >
                  <span className={`${item.icon} text-cyan-300`} aria-hidden />
                  <div>
                    <p className="font-semibold text-white">{item.label}</p>
                    <p className="text-slate-200/90">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <section id="systems">
        <Reveal className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-slate-600">Choose your system</p>
          <div className="grid gap-6 lg:grid-cols-2">
            {cards.map((card, index) => {
              const ctaHref = `/en/organizers/${card.slug}`
              const ctaLabel = "View sets"
              const externalLink =
                card.slug === "packout"
                  ? { href: "https://www.milwaukeetool.eu/en-eu/milwaukee/packout", label: "Milwaukee Packout" }
                  : card.slug === "tstak"
                    ? { href: "https://www.dewalt.com/product/dwst17814/tstak%C2%AE-4-compartment-box", label: "DeWALT/Stanley TSTAK" }
                    : null
              return (
                <Reveal key={card.slug} delay={0.05 * index}>
                  <GlassCard className="group h-full border-white/40 bg-gradient-to-br from-white/90 to-white/70 p-6 shadow-lg ring-1 ring-white/60 transition-transform hover:-translate-y-1 dark:border-[#0F203C] dark:bg-[radial-gradient(140%_140%_at_20%_10%,rgba(0,230,255,0.08),transparent),radial-gradient(120%_120%_at_80%_0%,rgba(215,38,61,0.07),transparent),#0B0F1A] dark:ring-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-2">
                        <p className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white ring-1 ring-white/20 dark:bg-[#0f162c]">
                          <span className="i-lucide-wrench" aria-hidden /> {card.systemName}
                        </p>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">{card.heroTitle}</h2>
                        <p className="text-sm text-slate-700 dark:text-slate-200">{card.heroSubtitle}</p>
                      </div>
                      <span className="rounded-xl bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-800 ring-1 ring-cyan-100 dark:bg-[#0f162c] dark:text-cyan-200">
                        In progress
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-slate-700 dark:text-slate-200">{card.intro}</p>
                    {externalLink && (
                      <Link
                        href={externalLink.href}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-flex items-center gap-2 text-xs font-semibold text-indigo-700 underline underline-offset-4 hover:text-indigo-900"
                      >
                        View {externalLink.label}
                        <span className="i-lucide-external-link" aria-hidden />
                      </Link>
                    )}
                    <ul className="mt-4 grid gap-2 text-sm text-slate-800 dark:text-slate-200">
                      {card.pains.slice(0, 4).map((pain) => (
                        <li key={pain} className="flex items-center gap-2">
                          <span className="i-lucide-hammer text-slate-500" aria-hidden />
                          {pain}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <Link
                        href={ctaHref}
                        className="inline-flex items-center gap-2 rounded-xl border border-indigo-100/70 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                      >
                        {ctaLabel}
                      </Link>
                      <Link
                        href="/materials#material-suggestion-tool"
                        className="inline-flex items-center gap-2 rounded-xl border border-indigo-100/70 bg-white/40 px-4 py-2 text-sm font-semibold text-indigo-800 transition hover:-translate-y-0.5 hover:bg-white"
                      >
                        Ask material advice
                      </Link>
                    </div>
                  </GlassCard>
                </Reveal>
              )
            })}
          </div>
        </Reveal>
        </section>

        <Reveal className="rounded-3xl border border-white/40 bg-white/80 p-6 shadow-lg ring-1 ring-white/60 backdrop-blur dark:border-[#0F203C] dark:bg-[#0B0F1A]/80 dark:ring-0">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">Frequently asked questions</h2>
          <Faq items={FAQ_ITEMS} className="mt-4" />
        </Reveal>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "ItemList",
                name: "Tool organizer systems",
                itemListElement: ORDER.map((slug, i) => ({
                  "@type": "ListItem",
                  position: i + 1,
                  name: ORGANIZER_PAGES[slug].systemName,
                  url: `${SITE.url}/organizers${slug === "modugrid" ? "/modugrid" : ""}`,
                })),
              },
              {
                "@type": "FAQPage",
                mainEntity: FAQ_ITEMS.map((item) => ({
                  "@type": "Question",
                  name: item.q,
                  acceptedAnswer: { "@type": "Answer", text: item.a },
                })),
              },
            ],
          }),
        }}
      />
    </main>
  )
}
