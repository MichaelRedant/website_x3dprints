import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import Reveal from "@/components/Reveal"
import Parallax from "@/components/Parallax"
import FilamentHeroVisual from "@/components/FilamentHeroVisual"
import ShimmerButton from "@/components/ShimmerButton"
import Catchphrase from "@/components/Catchphrase"
import GlassOrb from "@/components/GlassOrb"
import GlassCard from "@/components/GlassCard"
import MaterialSwatches, { Swatch } from "@/components/MaterialSwatches"


export const metadata: Metadata = {
  title: "3D printen in België | X3DPrints Herzele",
  description:
    "Precisie 3D printen in België en Vlaanderen. Snelle oplevering vanuit Herzele met advies over PLA, PETG, ABS/ASA, Nylon en PA-CF voor prototypes, displays en functionele onderdelen.",
  alternates: { canonical: "https://www.x3dprints.be/" },
  openGraph: {
    title: "X3DPrints  3D print service in België",
    description:
      "Van STL/STEP naar strakke 3D prints in België. Lokale begeleiding, kortere doorlooptijd en duurzame afwerking voor projecten in Gent, Aalst en de rest van Vlaanderen.",
    url: "https://www.x3dprints.be/",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630 }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: { card: "summary_large_image" },
}

function getSeasonCta(date: Date) {
  const MS_IN_DAY = 86_400_000
  const isWithinWindow = (target: Date, daysBefore: number, daysAfter: number) => {
    const diff = target.getTime() - date.getTime()
    return diff <= daysAfter * MS_IN_DAY && diff >= -daysBefore * MS_IN_DAY
  }
  const getNthWeekday = (month: number, weekday: number, n: number) => {
    // month is 1-12, weekday 0=Sun..6=Sat
    const first = new Date(Date.UTC(date.getUTCFullYear(), month - 1, 1))
    const firstWeekday = first.getUTCDay()
    const offset = (weekday - firstWeekday + 7) % 7
    const day = 1 + offset + 7 * (n - 1)
    return new Date(Date.UTC(date.getUTCFullYear(), month - 1, day))
  }

  const month = date.getUTCMonth() + 1 // 1-12
  const day = date.getUTCDate()
  const after = (m: number, d: number) => month > m || (month === m && day >= d)
  const before = (m: number, d: number) => month < m || (month === m && day <= d)

  // België: Moederdag = 2e zondag mei, Vaderdag = 2e zondag juni (uitgezonderd Antwerpen)
  const mothersDay = getNthWeekday(5, 0, 2)
  const fathersDay = getNthWeekday(6, 0, 2)

  const isValentijnWindow = (month === 1 && day >= 15) || (month === 2 && day <= 16)
  const isParentsWindow =
    isWithinWindow(mothersDay, 21, 1) || isWithinWindow(fathersDay, 21, 1) // 3 weken ervoor t/m dag zelf
  const isBackToSchoolWindow = month === 8 || month === 9
  if (isValentijnWindow) {
    return { label: "Valentijn cadeaus", href: "/valentijn-3d-printen" }
  }
  if (isParentsWindow) {
    return { label: "Vaderdag & Moederdag", href: "/blog/3d-printen-vaderdag-moederdag" }
  }
  if (isBackToSchoolWindow) {
    return { label: "Back to School", href: "/blog/3d-printen-back-to-school" }
  }
  if (after(11, 11) || before(2, 10)) {
    return { label: "Winter, Kerst & Nieuwjaar", href: "/blog/3d-printen-winter-kerst-nieuwjaar" }
  }
  if (after(2, 11) && before(5, 10)) {
    return { label: "Lente & Pasen", href: "/blog/3d-printen-lente-pasen" }
  }
  if (after(5, 11) && before(9, 10)) {
    return { label: "Zomer decor", href: "/blog/3d-printen-zomer" }
  }
  return { label: "Herfst & Halloween", href: "/blog/3d-printen-herfst-halloween" }
}

export default function HomePage() {
  const seasonCta = getSeasonCta(new Date())
  function icon(shape: ReactNode) {
    return (
      <svg
        aria-hidden
        className="mb-2 h-6 w-6 text-indigo-600"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
      >
        {shape}
      </svg>
    )
  }
  const faq = [
    {
      q: "Welke bestanden kan ik uploadenC",
      a: "STL en STEP zijn ideaal. Voeg toepassing, gewenste afwerking en eventuele toleranties toe voor het beste resultaat.",
    },
    {
      q: "Welke levertijd mag ik verwachtenC",
      a: "Vaak enkele werkdagen, afhankelijk van queue, materiaal en eventuele nabewerking. We stemmen de planning samen af.",
    },
    {
      q: "Wat is het maximale bouwvolumeC",
      a: "Tot 20  20  20 cm per stuk in n geheel. Groter kan door onderdelen te splitsen en te monteren.",
    },
    {
      q: "Is PLA geschikt voor voedselcontactC",
      a: "PLA is niet-toxisch, maar geprinte oppervlakken bevatten micro-porin. Gebruik alleen met zorg, reinig grondig en vermijd hitte. Vraag naar alternatieven als food-safe cruciaal is.",
    },
  ]

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  }

  return (
    <main className="relative">
      {/* Decorative background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(99,102,241,.18),transparent_70%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.07]" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-gradient-to-b from-white via-white/80 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-32 -z-10 hidden h-80 w-80 rounded-full bg-gradient-to-br from-indigo-300/40 via-purple-300/30 to-transparent blur-3xl sm:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 bottom-10 -z-10 hidden h-64 w-64 rounded-full bg-gradient-to-tl from-emerald-200/40 via-sky-200/30 to-transparent blur-2xl md:block"
      />

      {/* HERO */}
      <section className="relative px-6 pb-24 pt-20 sm:px-8 lg:px-12 lg:pb-32 lg:pt-28">
        <Parallax
          mode="page"
          range={520}
          offset={260}
          className="pointer-events-none absolute right-16 top-8 -z-10 hidden lg:block"
        >
          <FilamentHeroVisual className="h-[23rem] w-[23rem] opacity-70 dark:opacity-50" />
        </Parallax>
        <div className="mx-auto max-w-6xl">
          <Reveal className="max-w-3xl stacked-content">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-100/80 bg-white/70 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Lokale 3D print service in Vlaanderen
            </span>
            <Catchphrase className="mt-4 block text-base font-semibold text-indigo-600 sm:text-lg">
              3D printen voor Gent, Aalst en Vlaanderen
            </Catchphrase>
            <h1 className="mt-2 text-balance text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              Belgische 3D prints op maat vanuit Herzele.
            </h1>
            <p className="mt-3 text-balance text-lg font-semibold text-slate-700">
              Engineeringkwaliteit, transparante prijzen en korte lijnen
            </p>
            <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-slate-600 sm:text-lg">
              X3DPrints is een Belgische 3D-printstudio uit Herzele, vlak bij Gent. We begeleiden makers, engineers en
              bedrijven doorheen elke stap van hun 3D print project in Belgi: van STL/STEP controle en materiaaladvies
              tot verzending. Als eenpersoonsstudio plannen we projecten in samenspraak, meestal binnen enkele werkdagen afhankelijk van complexiteit en queue.
            </p>
            <div className="stacked-actions mt-10 flex flex-wrap items-center gap-3 justify-center sm:justify-start">
              <ShimmerButton href="/contact">Offerte aanvragen</ShimmerButton>
              <Link
                href="/contact?material=PLA_MATTE"
                className="inline-flex items-center gap-2 rounded-xl border border-indigo-100/70 bg-indigo-50/80 px-5 py-3 text-sm font-semibold text-indigo-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-indigo-50"
              >
                Particulieren advies
              </Link>
              <Link
                href="/segments"
                className="inline-flex items-center gap-2 rounded-xl border border-indigo-100/70 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-white"
              >
                Segmenten
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-xl border border-indigo-100/70 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-white"
              >
                Kennisbank
              </Link>
              <Link
                href="/3d-printen"
                className="inline-flex items-center gap-2 rounded-xl border border-indigo-100/70 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-white"
              >
                3D printen gids
              </Link>
              <Link
                href="/materials#material-suggestion-tool"
                className="inline-flex items-center gap-2 rounded-xl border border-indigo-100/70 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-white"
              >
                Material Suggestion Tool (retail & hobby)
              </Link>
              <Link
                href={seasonCta.href}
                className="inline-flex items-center gap-2 rounded-xl border border-indigo-100/70 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-white"
              >
                {seasonCta.label}
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="mt-16 grid gap-6 sm:grid-cols-3">
            {[
              {
                k: "Tolerantie",
                v: "0,2 mm",
                icon: icon(
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 12h16M4 16h16" />
                ),
              },
              {
                k: "Doorlooptijd",
                v: "Enkele werkdagen (in overleg)",
                icon: icon(
                  <>
                    <circle cx={12} cy={12} r={9} />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l2 2" />
                  </>
                ),
              },
              {
                k: "Bouwvolume",
                v: "Tot 35 x 32 x 35 cm",
                icon: icon(
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 16V8l-9-5-9 5v8l9 5 9-5ZM12 3v18M3 8l9 4 9-4"
                  />
                ),
              },
            ].map((item) => (
            <GlassCard
              key={item.k}
              className="group border-white/40 bg-gradient-to-br from-white/80 to-white/40 p-5 text-center shadow-lg ring-1 ring-white/60 transition-transform hover:-translate-y-1 dark:border-[#0F203C] dark:bg-[radial-gradient(140%_140%_at_20%_10%,rgba(0,230,255,0.08),transparent),radial-gradient(120%_120%_at_80%_0%,rgba(215,38,61,0.07),transparent),#0B0F1A] dark:ring-0 dark:shadow-[0_18px_50px_rgba(0,0,0,0.55),0_0_0_1px_rgba(0,230,255,0.15)]"
            >
              <div className="flex items-center justify-center text-indigo-600 dark:text-[#00E6FF]">
                {item.icon}
              </div>
              <div className="text-sm font-medium text-slate-500 dark:text-slate-100">{item.k}</div>
              <div className="mt-1 text-xl font-semibold text-slate-900 dark:text-white">{item.v}</div>
            </GlassCard>
            ))}
          </Reveal>
        </div>
      </section>

      {/* LOKAAL */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <GlassCard className="border-white/40 bg-gradient-to-br from-white/85 to-white/60 p-6 shadow-lg ring-1 ring-white/60">
              <div className="grid gap-4 sm:grid-cols-[1.2fr_.8fr] sm:items-center">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">Lokaal & 100% Belgisch</p>
                  <h2 className="mt-1 text-balance text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    Herzeelse handelaar, verankerd in Vlaanderen.
                  </h2>
                  <p className="mt-2 text-sm text-slate-700 sm:text-base">
                    We produceren in Herzele en leveren in Vlaanderen. Als lid van de Werkgroep Ondernemend Herzele werken we met
                    Belgische partners, transparante prijzen en korte lijnen. Betalen kan ook met de{" "}
                    <Link
                      href="https://www.herzele.be/heuro"
                      target="_blank"
                      rel="noreferrer"
                      prefetch={false}
                      className="font-semibold text-indigo-700 underline decoration-indigo-200 hover:decoration-indigo-500"
                    >
                      Herzeelse Euro (Heuro)
                    </Link>
                    .
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <ShimmerButton href="/lokaal-belgisch">Bekijk onze lokale aanpak</ShimmerButton>
                    <Link
                      href="https://www.herzele.be"
                      target="_blank"
                      rel="noreferrer"
                      prefetch={false}
                      className="inline-flex items-center gap-2 rounded-xl border border-indigo-100/70 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-white"
                    >
                      Gemeente Herzele
                    </Link>
                  </div>
                </div>
                <div className="justify-self-end">
                  <GlassOrb className="h-36 w-36 opacity-70" />
                </div>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* ABOUT */}
      <section className="px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="grid items-center gap-12 sm:grid-cols-[1.2fr_.8fr]">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Over X3DPrints</h2>
              <p className="mt-3 text-slate-600">
                Enpersoonsstudio in bijberoep. Je schakelt een Belgische 3D print service in met rechtstreeks contact
                met de maker die ook produceert, test en afwerkt. Geen tickets of callcenters, wel korte lijnen,
                duidelijke afspraken en onderdelen die passen.
              </p>
              <p className="mt-3 text-slate-600">
                Actief in regio Gent, Aalst, Geraardsbergen en Oudenaarde. Van functionele prototypes en kleine series tot
                winkelmateriaal, gepersonaliseerde cadeaus en maatwerk. Zo leveren we 3D prints voor Vlaanderen die perfect
                aansluiten bij jouw toepassing.
              </p>
              
              <div className="mt-6 flex gap-3">
                <Link
                  href="/services"
                  className="rounded-xl border border-indigo-100/70 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-white"
                >
                  Diensten
                </Link>
                <Link
                  href="/materials"
                  className="rounded-xl border border-indigo-100/70 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-white"
                >
                  Materialen
                </Link>
              </div>
            </div>
            <div className="justify-self-end">
              <Image src="/Logo.webp" alt="X3DPrints logo" width={220} height={220} className="opacity-90" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* SEGMENTEN: particulieren vs. bedrijven */}
      <section className="px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Voor wie we printen</h2>
            <p className="mt-2 max-w-2xl text-slate-600">
              Geen one-size-fits-all. We print wat jij nodig hebt en denken mee over materiaal en geometrie. Zo maak je
              gebruik van een lokale 3D print service in Belgi en Vlaanderen die mee bouwt aan jouw product.
            </p>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2">
            <GlassCard className="group border-white/40 bg-gradient-to-br from-white/80 to-white/40 p-6 shadow-lg ring-1 ring-white/60 transition-transform hover:-translate-y-1">
              {icon(<circle cx={12} cy={12} r={9} />)}
              <h3 className="text-lg font-semibold text-slate-900">Particulieren</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
                <li>Gepersonaliseerde cadeaus en naamplaatjes</li>
                <li>Decor & design: vazen, lampenkappen, interieurstukken</li>
                <li>Unieke accessoires en mini-sculpturen</li>
              </ul>
            </GlassCard>
            <GlassCard className="group border-white/40 bg-gradient-to-br from-white/80 to-white/40 p-6 shadow-lg ring-1 ring-white/60 transition-transform hover:-translate-y-1">
              {icon(<rect x={4} y={4} width={16} height={16} rx={2} />)}
              <h3 className="text-lg font-semibold text-slate-900">Bedrijven</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
                <li>Etalage- en winkelmateriaal, displays en houders</li>
                <li>Bedrijfscadeaus en promotieartikelen</li>
                <li>Prototyping, jigs, fixtures en kleine series</li>
              </ul>
            </GlassCard>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/portfolio"
              className="inline-flex items-center rounded-xl border border-indigo-100/70 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-white"
            >
              Gallerij bekijken
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-indigo-200/60 bg-indigo-50/60 px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-white"
            >
              Start je Belgisch 3D printproject
            </Link>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link
              href="/segments/3d-printing-marketing"
              className="inline-flex items-center gap-2 rounded-full border border-indigo-100/70 bg-white/60 px-3 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-white"
            >
              Retail & marketing props
            </Link>
            <Link
              href="/segments/3d-printing-tabletop"
              className="inline-flex items-center gap-2 rounded-full border border-indigo-100/70 bg-white/60 px-3 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-white"
            >
              Tabletop & hobby runs
            </Link>
            <Link
              href="/segments/3d-printing-makers"
              className="inline-flex items-center gap-2 rounded-full border border-indigo-100/70 bg-white/60 px-3 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-white"
            >
              Particulieren prints
            </Link>
          </div>
        </div>
      </section>

      {/* PERSONALISATIE */}
      <section className="px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Personalisatie</h2>
            <p className="mt-2 max-w-2xl text-slate-600">
              Maak je ontwerp persoonlijk met namen, initialen of een korte boodschap. Unieke geschenken, herkenbare
              interieurelementen en items met karakter, rechtstreeks 3D geprint in Belgi.
            </p>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                t: "Kies ontwerp",
                d: "Vertrek van een bestaand model of een eenvoudige schets.",
                icon: icon(<polygon points="12 3 21 18 3 18" />),
              },
              {
                t: "Personaliseer",
                d: "Voeg tekst, logo of specifieke maatvoering toe.",
                icon: icon(<path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16M4 12h16M4 20h16" />),
              },
              {
                t: "Wij printen",
                d: "Nette afwerking en levering binnen enkele werkdagen.",
                icon: icon(<path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16v16H4z" />),
              },
            ].map((s, i) => (
              <Reveal key={s.t} delay={0.05 * (i + 1)}>
                <GlassCard className="group border-white/40 bg-gradient-to-br from-white/80 to-white/40 p-5 shadow-lg ring-1 ring-white/60 transition-transform hover:-translate-y-1">
                  {s.icon}
                  <div className="text-base font-semibold text-slate-900">{s.t}</div>
                  <div className="mt-1 text-sm text-slate-600">{s.d}</div>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MATERIALEN (homepage spotlight in dezelfde stijl) */}
      <section className="px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Materialen, kleuren & afwerking
            </h2>
            <p className="mt-2 max-w-2xl text-slate-600">
              PLA voor strakke details en nette afwerking. Voor sterkte, UV of hitte schakelen we naar PETG, PC,
              ABS/ASA, Nylon (PA) of PA-CF. Afwerking kan rauw, geschuurd, geprimed of gelakt. Hieronder een greep uit wat we vaak printen in Belgi{" "}
              <Link href="/materials" className="underline decoration-slate-300 hover:decoration-slate-500">
                Alle varianten bekijken
              </Link>.
            </p>
          </Reveal>

          {(() => {
            const translucent = (hex: string) => `linear-gradient(180deg,${hex}C0,${hex}50)`

            const spotlight: { title: string; blurb: string; swatches: Swatch[] }[] = [
              {
                title: "PLA Matte (standaard)",
                blurb:
                  "Mat oppervlak met strakke details. Ideaal voor prototypes en nette visuele stukken die lokaal worden geprint.",
                swatches: [
                  // Jouw stock
                  { label: "Zwart", fill: "#0a0a0a", inStock: true },
                  { label: "Wit", fill: "#ffffff", inStock: true },
                  { label: "Blauw", fill: "#2563eb", inStock: true },
                  { label: "Geel", fill: "#facc15", inStock: true },
                  { label: "Groen", fill: "#16a34a", inStock: true },
                  { label: "Rood", fill: "#dc2626", inStock: true },
                  // Voorbeeld extra's op bestelling
                  { label: "Grijs", fill: "#9ca3af" },
                  { label: "Oranje", fill: "#fb923c" },
                ],
              },
              {
                title: "PLA Wood & Marble",
                blurb:
                  "Decoratieve texturen met hout- of marmerlook. Voor props, decor en premium accenten gemaakt in Belgi.",
                swatches: [
                  { label: "Wood Brown", fill: "linear-gradient(90deg,#7c5e3c,#6a4f33,#7c5e3c)", inStock: true },
                  { label: "Marble Grey", fill: "linear-gradient(135deg,#d6d3d1,#9ca3af 55%,#e7e5e4)", inStock: true },
                  { label: "Marble White", fill: "linear-gradient(135deg,#f3f4f6,#d1d5db 55%,#f9fafb)" },
                ],
              },
              {
                title: "PETG",
                blurb:
                  "Tougher dan PLA, licht flexibel en beter bestand tegen warmte/chemie. Voor functionele onderdelen die tegen een stoot kunnen.",
                swatches: [
                  { label: "Geel", fill: "#FFD00B", inStock: true },
                  { label: "Oranje", fill: "#F75403", inStock: true },
                  { label: "Groen", fill: "#00AE42", inStock: true },
                  { label: "Rood", fill: "#EB3A3A", inStock: true },
                  { label: "Blauw", fill: "#002E96", inStock: true },
                  { label: "Zwart", fill: "#000000", inStock: true },
                  { label: "Wit", fill: "#FFFFFF", inStock: true },
                  { label: "Transparant", fill: translucent("#E6FBFF"), inStock: true },
                  { label: "Cream", fill: "#F9DFB9", inStock: true },
                  { label: "Lime Green", fill: "#6EE53C", inStock: true },
                  { label: "Forest Green", fill: "#39541A", inStock: true },
                  { label: "Lake Blue", fill: "#1F79E5", inStock: true },
                  { label: "Peanut Brown", fill: "#875718", inStock: true },
                  { label: "Grijs", fill: "#ADB1B2", inStock: true },
                  { label: "Donkergrijs", fill: "#515151", inStock: true },
                ],
              },
              {
                title: "PC (Polycarbonaat)",
                blurb:
                  "Voor onderdelen die continu zon, olie of hitte zien. PC blijft strak tot ongeveer 110 graden en vraagt wel 8u drogen maar levert premium functionaliteit.",
                swatches: [
                  { label: "Transparant", fill: translucent("#E6FBFF"), inStock: true },
                  { label: "Helder Zwart", fill: "linear-gradient(180deg,#1b1b1f,#050505)", inStock: true },
                  { label: "Zwart", fill: "#000000", inStock: true },
                ],
              },
              {
                title: "TPU",
                blurb:
                  "Flexibel en slijtvast. Ideaal voor grips, bumpers en demping. Trager te printen, maar perfect voor duurzame toepassingen.",
                swatches: [{ label: "Zwart", fill: "#000000", inStock: true }],
              },
              {
                title: "Meer varianten op bestelling",
                blurb:
                  "Silk, Translucent, Galaxy, Metal, Glow, PLA-CF, Aero, Basic Gradient en meer. Vraag advies voor jouw Belgische 3D print.",
                swatches: [
                  { label: "Silk Gold", fill: "linear-gradient(90deg,#a36f00,#f3d36b,#a36f00)" },
                  { label: "Translucent Aqua", fill: translucent("#7ae5ff") },
                  { label: "Galaxy", fill: "radial-gradient(circle at 35% 40%,#6366f1,transparent 45%),#0b1020" },
                  { label: "Metal Steel", fill: "linear-gradient(90deg,#c5ccd4,#8e9aa6,#c5ccd4)" },
                  { label: "Glow Green", fill: "#00ff7b" },
                  { label: "PLA-CF", fill: "linear-gradient(135deg,#0f172a,#1f2937)" },
                ],
              },
            ]

            return (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {spotlight.map((m) => (
                  <Reveal key={m.title}>
                    <GlassCard className="group border-white/40 bg-gradient-to-br from-white/80 to-white/40 p-5 shadow-lg ring-1 ring-white/60 transition-transform hover:-translate-y-1">
                      <div className="text-base font-semibold text-slate-900">{m.title}</div>
                      <p className="mt-1 text-sm text-slate-600">{m.blurb}</p>
                      <MaterialSwatches colors={m.swatches} />
                      <Link
                        href="/materials"
                        className="mt-3 inline-block text-xs font-medium text-slate-700 underline decoration-slate-300 hover:decoration-slate-500"
                      >
                        Alle kleuren & varianten
                      </Link>
                    </GlassCard>
                  </Reveal>
                ))}
              </div>
            )
          })()}
        </div>
      </section>

      {/* PRINTABLES CALL-TO-ACTION (lager op de pagina) */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <GlassCard className="border-white/50 bg-gradient-to-br from-white/85 to-white/60 p-5 shadow-lg ring-1 ring-white/60">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-3xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600">Nog geen ontwerp</p>
                  <p className="mt-1 text-sm text-slate-700 sm:text-base">
                    Browse de Printables.com bibliotheek voor kant-en-klare modellen en stuur de link door. Wij checken
                    licentie, schaal en materiaal en printen het lokaal in Belgie.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <ShimmerButton href="/contact?source=printables">Stuur je Printables link</ShimmerButton>
                  <Link
                    href="https://www.printables.com/"
                    target="_blank"
                    rel="noreferrer"
                    prefetch={false}
                    className="inline-flex items-center gap-2 rounded-xl border border-indigo-100/70 bg-white/70 px-4 py-2.5 text-sm font-semibold text-indigo-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                  >
                    Open Printables.com
                  </Link>
                </div>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* WAAROM PLA (compact) */}
      <section className="px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Waarom we vaak voor PLA kiezen</h2>
            <p className="mt-2 max-w-2xl text-slate-600">
              PLA combineert nette afwerking met een brede kleurkeuze en prettige printbaarheid. Het is biologisch
              afbreekbaar op industrile schaal, niet-toxisch en geschikt voor veel decoratieve en functionele toepassingen.
            </p>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                t: "Duurzaamheid",
                d: "Gemaakt uit hernieuwbare grondstoffen (bv. mas, suikerriet).",
                icon: icon(<path strokeLinecap="round" strokeLinejoin="round" d="M12 2C7 2 4 6 4 10c0 6 8 12 8 12s8-6 8-12c0-4-3-8-8-8Zm0 0v10" />),
              },
              {
                t: "Veiligheid",
                d: "Niet-toxisch en zonder scherpe dampen bij normaal gebruik.",
                icon: icon(<path strokeLinecap="round" strokeLinejoin="round" d="M12 2 4 5v6c0 5 3.6 9.4 8 11 4.4-1.6 8-6 8-11V5l-8-3Z" />),
              },
              {
                t: "Afwerking",
                d: "Strakke details en levendige kleuren.",
                icon: icon(<path strokeLinecap="round" strokeLinejoin="round" d="M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5L12 3z" />),
              },
              {
                t: "Toepassing",
                d: "Geschikt voor decor, prototypes en lichte functionele onderdelen.",
                icon: icon(<path strokeLinecap="round" strokeLinejoin="round" d="M21 16V8l-9-5-9 5v8l9 5 9-5ZM12 3v18M3 8l9 4 9-4" />),
              },
              {
                t: "Klantvriendelijk",
                d: "Licht, stevig genoeg en betaalbaar.",
                icon: icon(<path strokeLinecap="round" strokeLinejoin="round" d="M8 14s2 2 4 2 4-2 4-2" />),
              },
            ].map((s, i) => (
              <Reveal key={s.t} delay={0.05 * (i + 1)}>
                <GlassCard className="group border-white/40 bg-gradient-to-br from-white/80 to-white/40 p-6 shadow-lg ring-1 ring-white/60 transition-transform hover:-translate-y-1">
                  {s.icon}
                  <div className="text-base font-semibold text-slate-900">{s.t}</div>
                  <div className="mt-1 text-sm text-slate-600">{s.d}</div>
                </GlassCard>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate-500">
            Let op bij voedselcontact: reinig grondig, vermijd hitte en overweeg gecertificeerde alternatieven indien
            food-safe essentieel is.
          </p>
        </div>
      </section>

      {/* PRIJZEN & LEVERING */}
      <section className="px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Prijzen & levering</h2>
            <p className="mt-2 max-w-2xl text-slate-600">
              Transparante tarieven op basis van complexiteit, afmetingen, materiaal en afwerking. We communiceren
              vooraf over planning en oplevering en helpen je kiezen wat het beste werkt voor jouw 3D print in Belgi.
            </p>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                t: "Prijsopbouw",
                d: "Materiaal, printtijd, afwerking en eventuele montage. We denken mee over optimalisatie voor Belgisch 3D printen.",
                icon: icon(<circle cx={12} cy={12} r={9} />),
              },
              {
                t: "Levertijd",
                d: "We mikken op oplevering binnen enkele werkdagen; spoed kan in overleg voor klanten in Belgi.",
                icon: icon(<><circle cx={12} cy={12} r={9} /><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l2 2" /></>),
              },
              {
                t: "Verzending/afhalen",
                d: "Verzending in BE of afhalen in regio Herzele/Gent.",
                icon: icon(<path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16M14 8l6 4-6 4" />),
              },
            ].map((s, i) => (
              <Reveal key={s.t} delay={0.05 * (i + 1)}>
                <GlassCard className="group border-white/40 bg-gradient-to-br from-white/80 to-white/40 p-6 shadow-lg ring-1 ring-white/60 transition-transform hover:-translate-y-1">
                  {s.icon}
                  <div className="text-base font-semibold text-slate-900">{s.t}</div>
                  <div className="mt-1 text-sm text-slate-600">{s.d}</div>
                </GlassCard>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 flex gap-3">
            <Link
              href="/pricing"
              className="rounded-xl border border-indigo-100/70 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-white"
            >
              Prijzen bekijken
            </Link>
            <ShimmerButton href="/contact">Vraag je print aan</ShimmerButton>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-32 pt-10 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <GlassCard className="overflow-hidden border-white/30 bg-gradient-to-br from-white/80 to-white/50 p-8 shadow-xl ring-1 ring-white/60 sm:p-10">
              <div className="grid gap-6 sm:grid-cols-[1.2fr_.8fr] sm:items-center">
                <div>
                  <h2 className="text-balance text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    Klaar om te 3D printen
                  </h2>
                  <p className="mt-2 max-w-prose text-slate-600">
                    Stuur je model door en je krijgt snel een heldere prijs met het beste materiaaladvies voor jouw
                    toepassing, rechtstreeks van een Belgische 3D print partner.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <ShimmerButton href="/contact">Offerte aanvragen</ShimmerButton>
                    <Link
                      href="/portfolio"
                      className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition-transform hover:-translate-y-0.5 hover:bg-white/20"
                    >
                      Gallerij bekijken
                    </Link>
                  </div>
                </div>
                <div className="justify-self-end">
                  <GlassOrb className="h-40 w-40 opacity-90" />
                </div>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* FAQ JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </main>
  )
}
