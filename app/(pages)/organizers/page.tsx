import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import Faq from "@/components/Faq"
import { ORGANIZER_PAGES } from "@/content/organizer-details"
import { buildOrganizerContactHref } from "@/lib/organizers"
import { SITE } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Tool organizers op maat | X3DPrints",
  description:
    "Tool organizers op maat: ModuGrid (gridfinity alternatief), Packout inlays, TSTAK inserts en custom toolbox op maat. Klemvast, labelbaar, antislip opties. Vraag je indeling aan vanuit Vlaanderen/België.",
  alternates: {
    canonical: "https://www.x3dprints.be/organizers",
    languages: {
      "nl-BE": "https://www.x3dprints.be/organizers",
      en: "https://www.x3dprints.be/en/organizers",
    },
  },
  openGraph: {
    title: "Tool organizers op maat | X3DPrints",
    description:
      "Kies je systeem: ModuGrid (gridfinity-stijl), Packout, TSTAK of custom inserts. Geen losse bakjes, wel rust in je koffer.",
    url: "https://www.x3dprints.be/organizers",
    images: [
      { url: `${SITE.url}/images/organizers/modugrid/ModuGrid2.jpg`, width: 1200, height: 630, alt: "Tool organizers op maat" },
    ],
    locale: SITE.locale,
    siteName: SITE.name,
  },
  twitter: { card: "summary_large_image" },
}

const ORDER = ["modugrid", "packout", "tstak", "custom"] as const

const FAQ_ITEMS = [
  {
    q: "Hoe werkt de intake voor een organizer?",
    a: "Kies je systeem (ModuGrid/Packout/TSTAK/Custom), voeg foto’s en een lijst tools toe. We tekenen een indeling, sturen een preview en printen on-demand.",
  },
  {
    q: "Moet ik STL-bestanden aanleveren?",
    a: "Nee. We modelleren de indeling voor je koffer of lade. Jij levert enkel maten of foto’s; wij zorgen voor de passende trays.",
  },
  {
    q: "Welke materialen gebruiken jullie?",
    a: "Standaard PLA Matte voor strakke looks. PETG bij voorkeur voor impact/transport, met optionele antislip bodem en labels in de print.",
  },
  {
    q: "Leveren jullie ook voor Milwaukee Packout en TSTAK?",
    a: "Ja. We modelleren specifiek voor de originele Milwaukee Packout cases en Stanley/DeWALT TSTAK koffers en houden rekening met het opgegeven modelnummer.",
  },
  {
    q: "Kan ik later modules bijbestellen of herprinten?",
    a: "Ja. We bewaren je indeling zodat we extra trays of updates kunnen printen met dezelfde pasvorm, ook bij slijtage.",
  },
  {
    q: "Hoe snel kan ik leveren?",
    a: "Afhankelijk van complexiteit meestal binnen enkele werkdagen. Deel je modelnummer, foto en tool lijst voor de snelste doorlooptijd.",
  },
  {
    q: "Welke systemen dekken jullie exact af?",
    a: "ModuGrid (gridfinity-stijl) voor lades/bureaus/koffers (hobby én pro), Milwaukee Packout voor serviceploegen, Stanley/DeWALT TSTAK voor field teams, en custom inserts voor unieke koffers of cases.",
  },
  {
    q: "Wat maakt jullie organizers verkoopgericht?",
    a: "We leveren één vaste indeling zonder losse bakjes, met labelzones en optionele kleurcodes. Dat geeft rust, versnelt interventies en vermindert zoek- en faalkosten.",
  },
  {
    q: "Welke info helpt bij de intake?",
    a: "Foto van de open koffer/lade, binnenmaten, modelnummer (Packout/TSTAK), lijst van tools (aantallen + gewenste ligging) en of je antislip/labels wil. Hoe concreter, hoe sneller we kunnen leveren.",
  },
]

export default function OrganizersHubPage() {
  const cards = ORDER.map((slug) => ORGANIZER_PAGES[slug])

  return (
    <main className="relative overflow-hidden px-6 pb-24 pt-24 sm:px-8 lg:px-12">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_20%_15%,rgba(34,211,238,0.28),transparent),radial-gradient(70%_60%_at_80%_10%,rgba(255,0,168,0.18),transparent),radial-gradient(40%_40%_at_50%_75%,rgba(15,23,42,0.18),transparent)]" />
      <div className="mx-auto max-w-6xl space-y-12">
        {/* Hero / workshop vibe */}
        <Reveal className="relative overflow-hidden rounded-3xl border border-white/40 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 shadow-2xl ring-1 ring-white/10 dark:border-[#0F203C] dark:ring-0">
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_140%_at_10%_20%,rgba(0,230,255,0.12),transparent),radial-gradient(120%_140%_at_80%_10%,rgba(215,38,61,0.12),transparent)]" />
          <div className="relative space-y-5 text-white">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200 ring-1 ring-white/20">
              <span className="i-lucide-wrench" aria-hidden /> Tool organizers
            </div>
            <div className="flex flex-wrap items-baseline gap-3">
              <h1 className="text-balance text-4xl font-extrabold sm:text-5xl">
                Perfect georganiseerde gereedschapskoffers, op maat van jouw systeem.
              </h1>
              <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200 ring-1 ring-emerald-300/30">
                Werkplaats-proof
              </span>
            </div>
            <p className="max-w-3xl text-lg text-slate-100/90">
              ModuGrid (gridfinity), Packout, TSTAK en custom koffers. Vaste layouts die stil liggen, labelbaar zijn en
              passen bij jouw set-up. Kies je systeem of stuur foto + tool lijst.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="#systems"
                className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-900 shadow-[0_10px_30px_rgba(34,211,238,0.35)] transition hover:-translate-y-0.5 hover:brightness-110"
              >
                Bekijk de systemen
                <span className="i-lucide-arrow-right" aria-hidden />
              </Link>
              <Link
                href={buildOrganizerContactHref("organizers" as never)}
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/5 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                Vraag je indeling aan
              </Link>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                { icon: "i-lucide-sparkle", label: "Rust in je koffer", text: "Klemvast, geen rammel onderweg." },
                { icon: "i-lucide-stamp", label: "Labelbaar & kleurcode", text: "Zones voor bits, schroeven, accu's." },
                { icon: "i-lucide-cpu", label: "Hobby & pro", text: "ModuGrid voor hobby én pro; Packout/TSTAK voor teams; Custom voor iedereen." },
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

        {/* Systems grid */}
        <section id="systems">
        <Reveal className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-slate-600">Kies je systeem</p>
          <div className="grid gap-6 lg:grid-cols-2">
            {cards.map((card, index) => {
              const ctaHref = `/organizers/${card.slug}`
              const ctaLabel = "Bekijk sets"
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
                        Klaarzetten
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
                        Bekijk {externalLink.label}
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
                        Vraag materiaaladvies
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
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">Veelgestelde vragen</h2>
          <Faq items={FAQ_ITEMS} className="mt-4" />
        </Reveal>

        <Reveal className="rounded-3xl border border-white/40 bg-white/85 p-6 shadow-xl ring-1 ring-white/60 backdrop-blur dark:border-[#0F203C] dark:bg-[#0B0F1A]/85 dark:ring-0">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-indigo-700">Orde geeft rust</p>
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">Rust in je hoofd, sneller werken</h2>
              <p className="text-slate-700 dark:text-slate-200">
                Een koffer die stil blijft en logisch ingedeeld is, haalt de ruis uit je werkdag. Minder zoeken, minder dubbel
                kopen, minder frustratie onderweg naar de volgende werf.
              </p>
              <p className="text-slate-700 dark:text-slate-200">
                Orde = tijdwinst en foutreductie. Een rustige koffer geeft een rustig hoofd, waardoor je meer aandacht hebt
                voor de klus en de klant.
              </p>
            </div>
            <div className="rounded-2xl border border-indigo-100/70 bg-indigo-50/70 px-5 py-4 text-sm font-semibold text-indigo-900 shadow-sm ring-1 ring-white/60 dark:border-slate-700 dark:bg-[#0f162c] dark:text-cyan-100 dark:ring-0">
              <div className="flex items-center gap-2">
                <span className="i-lucide-brain text-indigo-600 dark:text-cyan-300" aria-hidden />
                <span>Micro-checklist voor rust</span>
              </div>
              <ul className="mt-3 space-y-2 text-slate-800 dark:text-slate-100">
                <li className="flex items-center gap-2">
                  <span className="i-lucide-check text-emerald-600" aria-hidden />
                  Eén plek per tool, geen dubbels
                </li>
                <li className="flex items-center gap-2">
                  <span className="i-lucide-check text-emerald-600" aria-hidden />
                  Labelzones en kleurcodes per taak
                </li>
                <li className="flex items-center gap-2">
                  <span className="i-lucide-check text-emerald-600" aria-hidden />
                  Antislip waar nodig, geen rammel
                </li>
                <li className="flex items-center gap-2">
                  <span className="i-lucide-check text-emerald-600" aria-hidden />
                  Prefill contact met foto + lijst = snelle start
                </li>
              </ul>
            </div>
          </div>
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
                name: "Tool organizer systemen",
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
