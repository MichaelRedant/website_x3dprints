import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"

import { buildArticleJsonLd } from "@/lib/seo"
import BlogAuthorNote from "@/components/BlogAuthorNote"
import BlogContentOverview from "@/components/BlogContentOverview"
import BlogFaq from "@/components/BlogFaq"
import { BLOG_FAQ } from "@/content/blog-faq"

const canonical = "https://www.x3dprints.be/blog/finishing-friday-schuren-primen-lakken/"
const publishedDate = "2025-10-03T08:00:00+02:00"
const dateModified = "2026-02-08"
const faq = BLOG_FAQ["finishing-friday-schuren-primen-lakken"]

export const metadata: Metadata = {
  title: "Finishing Friday: 3D prints schuren, primen en lakken (en waarom we dat meestal niet doen) | X3DPrints",
  description:
    "Finishing Friday. Schuren, primen en lakken van 3D prints uitgelegd: wat kan, welke stappen horen erbij en waarom X3DPrints focust op nette FDM-prints in plaats van volledige afwerking.",
  alternates: { canonical },
  openGraph: {
    title: "Finishing Friday: schuren, primen en lakken van 3D prints",
    description:
      "Overzicht van finishing technieken zoals schuren, primen en lakken. Inclusief nuance: resin/SLA vraagt vaak méér nabewerking dan nette FDM-prints, dus focust X3DPrints op FDM zonder lakwerk.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    authors: ["https://www.x3dprints.be"],
    tags: ["3D print afwerking", "schuren van 3D prints", "primen en lakken", "Finishing Friday"],
    images: [
      {
        url: "/images/og-home-nl.svg",
        width: 1200,
        height: 630,
        alt: "3D print finishing advies door X3DPrints",
      },
    ],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Finishing Friday: schuren, primen en lakken",
    description:
      "Schuren, primen en lakken van 3D prints uitgelegd. Wanneer zinvol, wanneer overkill, en waarom X3DPrints zich focust op nette FDM-prints.",
    images: ["/images/og-home-nl.svg"],
  },
}

const heroStats = [
  { label: "Typische FDM laaghoogte", value: "0.16-0.28 mm", detail: "Compromis tussen detail en printtijd" },
  { label: "Aantal finishing stappen", value: "3-7+", detail: "Schuren, vullen, primen, lakken, tussenschuren" },
  { label: "Use case finishing", value: "Showpieces & props", detail: "Niet nodig voor elke bracket of cover" },
]

const fdmVsSlaRows = [
  {
    property: "Oppervlaktekwaliteit uit de printer",
    fdm: "Zichtbare layerlijnen, maar droog en direct bruikbaar zonder chemische baden.",
    sla: "Lijkt glad maar voelt vaak plakkerig; moet gewassen en UV-gecurd voor het inzetbaar is.",
  },
  {
    property: "Nabewerking voor 'showroom finish'",
    fdm: "Optioneel: licht schuren of primer als het echt een showpiece wordt.",
    sla: "Standaard: wassen + uitharden + support scars wegwerken voordat je zelfs maar kunt beginnen lakken.",
  },
  {
    property: "Robuustheid",
    fdm: "Sterker in impact en functionele toepassingen (PLA, PETG, TPU).",
    sla: "Brosser, gevoelig voor UV en temperatuur, vooral decoratief.",
  },
  {
    property: "Kost finishing",
    fdm: "Beperkt tot wat handwerk als je het wil; meeste onderdelen gaan rechtstreeks in gebruik.",
    sla: "Altijd extra tijd, IPA/verbruiksmateriaal en beschermingsmiddelen nodig -> finishing kost snel meer dan de print.",
  },
  {
    property: "Typische toepassingen",
    fdm: "Functionele delen, beugels, covers, prototypes, marketingprops.",
    sla: "Miniaturen en display pieces waarbij je finishing-stappen incalculeert.",
  },
]

const finishingSteps = [
  {
    title: "Stap 1: Voorbereiding en supportverwijdering",
    points: [
      "Supports netjes verwijderen zonder het oppervlak te beschadigen.",
      "Brims en rafts afsnijden en vlak maken met een mes of vijl.",
      "Stringing of artefacten licht wegschrapen voor je begint te schuren.",
    ],
  },
  {
    title: "Stap 2: Droog schuren (grove naar fijne korrel)",
    points: [
      "Start rond korrel 120-180 om layerlijnen te breken.",
      "Werk op naar korrel 240-320 voor een zichtbare verbetering.",
      "Gebruik voor randen en logo's fijnere korrels met weinig druk.",
    ],
  },
  {
    title: "Stap 3: Nat schuren en vullen",
    points: [
      "Nat schuren met korrel 400-600 beperkt stof en geeft egaler oppervlak.",
      "Putjes of naden opvullen met filler of 2K plamuur.",
      "Na het vullen opnieuw schuren tot overgangen verdwijnen.",
    ],
  },
  {
    title: "Stap 4: Primerlagen",
    points: [
      "Primer zorgt voor hechting en toont imperfecties.",
      "Meerdere dunne lagen werken beter dan een dikke laag.",
      "Tussendoor licht opschuren met fijne korrel voor strak resultaat.",
    ],
  },
  {
    title: "Stap 5: Lakken en aflakken",
    points: [
      "Werk met dunne spraylagen of airbrush, geen dikke penseelstreken.",
      "Respecteer droogtijden en hou stof uit de omgeving.",
      "Clear coat toevoegen voor extra bescherming of glans indien nodig.",
    ],
  },
]

const whyWeDoNotOfferFullFinishing = [
  {
    title: "Finishing is arbeidsintensief",
    insight:
      "Een nette FDM-print is relatief snel klaar. Het volledig schuren, primen en lakken kan meer uren kosten dan de hele printjob.",
  },
  {
    title: "Focus op functionaliteit en helder prijsmodel",
    insight:
      "X3DPrints focust op solide prints met voorspelbare kost. Finishing introduceert kleur- en glansvariabelen die het traject minder schaalbaar maken.",
  },
  {
    title: "SLA workflows vragen standaard finishing",
    insight:
      "Resin prints vereisen wassen, uitharden en extra schuren voor ze toonbaar zijn. Daardoor schuift de verhouding productie/finishing nog schever, wat niet past bij onze focus.",
  },
  {
    title: "Samenwerking boven zelf lakken",
    insight:
      "Wie toch een automotive-achtige finish wil, combineert beter onze prints met een gespecialiseerde lakkerij of doet het zelf.",
  },
]

const resourceLinks = [
  { label: "3D printen pillar", href: "/3d-printen", description: "Technologie, materialen en workflow bij X3DPrints." },
  { label: "Filament Vrijdag reeks", href: "/blog", description: "PLA, PETG, TPU en special materials uitgelicht." },
  { label: "Prijzen en calculator", href: "/pricing", description: "Zie hoe ontwerp, materiaal en printtijd in de offerte komen." },
  { label: "Material Suggestion Tool", href: "/materials#material-suggestion-tool", description: "Laat de wizard een materiaalvoorstel doen." },
]

const references = [
  {
    label: "Prusa - How to sand & paint 3D prints",
    href: "https://blog.prusa3d.com/how-to-smooth-and-paint-3d-prints_12547/",
    description: "Stapsgewijze uitleg rond schuren, primen en lakken van FDM prints.",
  },
  {
    label: "MatterHackers - Post processing FDM prints",
    href: "https://www.matterhackers.com/articles/post-processing-techniques-for-fdm-3d-printing",
    description: "Overzicht van technieken zoals schuren, vullen, primen en verven.",
  },
  {
    label: "Formlabs - Finishing SLA prints",
    href: "https://formlabs.com/blog/how-to-finish-sla-3d-prints/",
    description: "Laat zien hoeveel stappen resin prints standaard doorlopen (wash, cure, schuren) voor ze klaar zijn.",
  },
  {
    label: "Bambu Lab - Post-processing basics",
    href: "https://wiki.bambulab.com/en/knowledge-sharing/3d-printing-guide/post-processing",
    description: "Korte gids voor nabewerking van Bambu prints.",
  },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "Finishing Friday: 3D prints schuren, primen, lakken",
  description: "Finishing Friday van X3DPrints. Uitleg over schuren, primen en lakken van 3D prints plus nuance: netjes FDM printen volstaat vaak, finishing doen we niet standaard in-house.",
  datePublished: publishedDate,
  dateModified,
  image: "https://www.x3dprints.be/images/og-home-nl.svg",
})



const lastUpdatedLabel = "Laatst bijgewerkt: 8 februari 2026"

function SectionDivider() {
  return (
    <div className="mx-auto my-10 flex w-full max-w-4xl items-center gap-3 text-xs uppercase tracking-[0.3em] text-slate-500">
      <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-slate-300/0 via-slate-300/60 to-slate-300/0" />
      <span>Finishing Friday</span>
      <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-slate-300/0 via-slate-300/60 to-slate-300/0" />
    </div>
  )
}

export default function FinishingFridaySchurenPrimenLakkenPage() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(160%_90%_at_50%_-20%,rgba(148,163,184,0.25),transparent_75%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.08]" />

      <section className="px-6 pb-12 pt-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal className="stacked-content">
            <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
              <ol className="flex flex-wrap gap-2">
                <li>
                  <Link
                    href="/blog"
                    className="font-medium text-indigo-600 transition hover:text-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Blog
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="font-medium text-slate-700">Finishing Friday</li>
                <li aria-hidden>/</li>
                <li className="font-medium text-slate-900">Schuren, primen, lakken
                </li>
              </ol>
            </nav>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Finishing Friday</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Schuren, primen en lakken: wanneer zinvol en wanneer overkill.
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Niet elke 3D print hoeft spiegelglad te eindigen. Het merendeel van onze PLA- en PETG-projecten gaat rechtstreeks in gebruik met nette, zichtbare
              layerlijnen. In deze Finishing Friday delen we hoe een volledig afwerkingstraject eruit ziet, maar vooral waarom X3DPrints focust op strak
              geprinte basisonderdelen in plaats van lakwerk.
            </p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="stacked-actions mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
              <ShimmerButton href="/contact">Bespreek een finishing case</ShimmerButton>
              <Link
                href="/3d-printen"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Naar 3D printen overview
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-500">Gepubliceerd op 3 oktober 2025 - Aanvulling op de Filament Vrijdag reeks.</p>
          </Reveal>
          <div className="mt-10 grid gap-4 rounded-3xl border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur sm:grid-cols-3">
            {heroStats.map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{stat.label}</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{stat.value}</p>
                <p className="text-sm text-slate-600">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <SectionDivider />

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl space-y-6">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">FDM vs SLA: welke basis kies je?</h2>
              <p className="mt-2 text-sm text-slate-600">
                Op foto’s zie je vaak resin miniaturen met een spiegelgladde finish, maar achter de schermen komt daar een hele
                was- en uithardingscyclus bij kijken. FDM toont duidelijker waar de lagen lopen, maar de onderdelen zijn droog,
                stevig en meteen bruikbaar. Hieronder zie je welke techniek echt de meeste finishing vraagt.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
                  <thead>
                    <tr className="text-xs uppercase tracking-wide text-slate-500">
                      <th className="py-2 pr-4">Aspect</th>
                      <th className="py-2 pr-4">FDM (PLA / PETG / TPU)</th>
                      <th className="py-2 pr-4">SLA / resin</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {fdmVsSlaRows.map((row) => (
                      <tr key={row.property}>
                        <td className="py-3 pr-4 font-semibold text-slate-900">{row.property}</td>
                        <td className="py-3 pr-4">{row.fdm}</td>
                        <td className="py-3 pr-4">{row.sla}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-sm text-slate-600">
                Voor brute functionaliteit volstaat FDM meestal en hoef je niet te schuren. SLA is pas toonbaar nadat je chemisch
                gereinigd, uitgehard en opnieuw geschuurd hebt—precies waarom wij inzetten op nette FDM-basisprints.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl space-y-6">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Hoe ziet een finishing traject eruit?
              </h2>
              <p className="mt-2 text-sm text-slate-600">Een strak resultaat vraagt een reeks stappen. Dit is de verkorte versie van wat je in guides van Prusa en MatterHackers terugvindt.</p>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {finishingSteps.map((step) => (
                  <div key={step.title} className="rounded-2xl border border-slate-100 bg-white/60 p-4">
                    <h3 className="text-base font-semibold text-slate-900">{step.title}</h3>
                    <ul className="mt-2 space-y-1 text-sm text-slate-600">
                      {step.points.map((point) => (
                        <li key={point} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-500" aria-hidden />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-slate-500">Draag beschermingsmiddelen en zorg voor ventilatie bij schuren, primen en lakken.</p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl space-y-6">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Waarom X3DPrints finishing niet standaard aanbiedt
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Finishing is een ambacht, geen bijzaak. We drukken liever heldere, functionele onderdelen en laten lakwerk over aan wie daarin uitblinkt.
              </p>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {whyWeDoNotOfferFullFinishing.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-slate-100 bg-white/60 p-4">
                    <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{item.insight}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-slate-600">We leveren dus nette FDM-prints met verwijderde supports en afgewerkte randen, maar geen volledige auto-body lakjob.</p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl space-y-6">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Hoe we toch rekening houden met finishing
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Geef aan dat je zelf gaat schuren of lakken en we optimaliseren het ontwerp en de printinstellingen voor jou.
              </p>
              <ul className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                <li className="rounded-2xl border border-slate-100 bg-white/60 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Design voor finishing</p>
                  <p className="mt-2">Minder scherpe hoeken, extra vlees op zichtvlakken en naden op logische plekken besparen schuurwerk.</p>
                </li>
                <li className="rounded-2xl border border-slate-100 bg-white/60 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Laaghoogte en ori?ntatie</p>
                  <p className="mt-2">Lagere laaghoogte op zichtvlakken en slimme ori?ntatie beperken het aantal lijnen dat je achteraf voelt.</p>
                </li>
                <li className="rounded-2xl border border-slate-100 bg-white/60 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Materiaalkeuze</p>
                  <p className="mt-2">PLA, PETG en TPU reageren anders op schuren en verven. We selecteren mee wat voor jou het beste werkt.</p>
                </li>
                <li className="rounded-2xl border border-slate-100 bg-white/60 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Samenwerking extern</p>
                  <p className="mt-2">Werk je met een lakkerij? Dan stemmen we formaat, bevestiging en materiaal op hun proces af.</p>
                </li>
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Verder lezen binnen X3DPrints
              </h2>
              <p className="mt-2 text-sm text-slate-600">Kies eerst je materiaal en toepassing. De Filament Vrijdag reeks helpt je daarbij.</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-500" aria-hidden />
                  <Link href="/blog/filament-vrijdag-pla" className="font-semibold text-indigo-600 transition hover:text-indigo-500">
                    Filament Vrijdag #1: PLA 3D printen
                  </Link>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-500" aria-hidden />
                  <Link href="/blog/filament-vrijdag-petg" className="font-semibold text-indigo-600 transition hover:text-indigo-500">
                    Filament Vrijdag #2: PETG 3D printen
                  </Link>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-500" aria-hidden />
                  <Link href="/blog/filament-vrijdag-tpu" className="font-semibold text-indigo-600 transition hover:text-indigo-500">
                    Filament Vrijdag #3: TPU 3D printen
                  </Link>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-500" aria-hidden />
                  <Link href="/blog/filament-vrijdag-pla-wood" className="font-semibold text-indigo-600 transition hover:text-indigo-500">
                    Filament Vrijdag #4: PLA Wood en specials
                  </Link>
                </li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <ShimmerButton href="/3d-printen">Bekijk de 3D printen overview</ShimmerButton>
              </div>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.1}>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Interne resources
              </h2>
              <div className="mt-4 grid gap-4">
                {resourceLinks.map((resource) => (
                  <div key={resource.href} className="rounded-2xl border border-slate-100 bg-white/60 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{resource.label}</p>
                    <p className="mt-2 text-sm text-slate-600">{resource.description}</p>
                    <Link
                      href={resource.href}
                      className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
                    >
                      Naar {resource.label}
                      <span aria-hidden>-&gt;</span>
                    </Link>
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section className="px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Bronnen en referenties
              </h2>
              <p className="mt-2 text-sm text-slate-600">Dit zijn degelijke guides als je zelf wil experimenteren met finishing.</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {references.map((ref) => (
                  <li key={ref.href} className="rounded-2xl border border-slate-100 bg-white/60 p-4">
                    <cite className="not-italic">
                      <Link
                        href={ref.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base font-semibold text-indigo-600 transition hover:text-indigo-500"
                      >
                        {ref.label}
                      </Link>
                    </cite>
                    <p className="mt-1">{ref.description}</p>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section className="px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <GlassCard className="flex flex-col gap-6 border border-white/40 bg-white/85 p-6 shadow-xl backdrop-blur sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Volgende stap</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Wij leveren solide prints, jij bepaalt de finish.
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Functionaliteit, prototypes, props: met nette FDM-prints raak je ver. Wil je toch lakwerk, dan denken we mee over materiaal en partners zonder het zelf te verkopen.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/contact">Plan een 3D print intake</ShimmerButton>
                <Link href="/pricing" className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                  Bekijk tarieven & opties
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <BlogFaq title={faq.title} items={faq.items} mainEntityOfPage={canonical} />


      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <BlogAuthorNote locale="nl" />
    </main>
  )
}









