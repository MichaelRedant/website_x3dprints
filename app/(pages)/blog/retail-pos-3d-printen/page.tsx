import type { Metadata } from "next"
import Link from "next/link"
import Faq from "@/components/Faq"
import GlassCard from "@/components/GlassCard"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import BlogAuthorNote from "@/components/BlogAuthorNote"
import BlogContentOverview from "@/components/BlogContentOverview"
import { buildArticleJsonLd, buildFaqPageSchema, buildHowToSchema } from "@/lib/seo"

const canonical = "https://www.x3dprints.be/blog/retail-pos-3d-printen/"
const enCanonical = "https://www.x3dprints.be/en/blog/retail-pos-3d-printen/"
const datePublished = "2026-03-01"
const dateModified = "2026-03-01"
const lastUpdatedLabel = "Laatst bijgewerkt: 1 maart 2026"

const contactHref =
  "/contact?material=PETG&quote=Retail%20POS%203D%20printen%20-%20ik%20wil%20een%20pilot%20opstelling"
const pricingHref = "/pricing?utm_source=blog&utm_medium=cta&utm_campaign=retail-pos-3d-printen"
const materialsHref = "/materials#material-suggestion-tool"
const servicesHref = "/services?utm_source=blog&utm_medium=internal&utm_campaign=retail-pos-3d-printen"
const portfolioHref = "/portfolio?utm_source=blog&utm_medium=internal&utm_campaign=retail-pos-3d-printen"

export const metadata: Metadata = {
  title: "Retail POS 3D printen: displays en winkelmateriaal | X3DPrints",
  description:
    "Retail displays en POS materiaal met 3D printen: praktische gids voor prototyping, pilot runs, materiaalkeuze, kosten en doorlooptijd.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": canonical,
      "en-BE": enCanonical,
      "x-default": canonical,
    },
  },
  openGraph: {
    title: "Retail POS 3D printen",
    description:
      "Workflow voor retail displays en POS: van concept en prototype naar kleine pilot reeks.",
    url: canonical,
    images: [{ url: "/images/og-blog-nl.svg", width: 1200, height: 630, alt: "Retail POS 3D printen" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Retail POS 3D printen",
    description: "Praktische gids voor displays, schapcommunicatie en snelle pilot-runs.",
    images: ["/images/og-blog-nl.svg"],
  },
}

const valueCards = [
  {
    title: "Snelle visualisatie in echte omgeving",
    body:
      "Je test displays direct in schap of toonbankcontext zonder lange productietrajecten.",
    href: "/blog/use-case-dinsdag-retail-displays",
    label: "Lees retail display use-case",
  },
  {
    title: "Van concept naar pilot in fases",
    body:
      "Eerst visuele validatie, daarna functionele aanpassing, vervolgens kleine pilot run voor stores of events.",
    href: "/blog/prototyping-kleine-reeksen-3d-printen",
    label: "Lees prototyping flow",
  },
  {
    title: "Materialen afgestemd op look en gebruik",
    body:
      "Voor POS gaat het om balans tussen uitstraling, stevigheid, transport en montage op locatie.",
    href: "/blog/3d-print-materiaal-voor-zichtwerk",
    label: "Lees materiaal voor zichtwerk",
  },
]

const phaseRows = [
  {
    phase: "Concept mock-up",
    goal: "Vorm en zichtbaarheid valideren",
    material: "PLA Matte / PLA specials",
    output: "1-3 stuks",
  },
  {
    phase: "Functionele test",
    goal: "Montage, stabiliteit en handling testen",
    material: "PETG / hybride",
    output: "Kleine testbatch",
  },
  {
    phase: "Pilot run",
    goal: "Uitrol naar meerdere locaties of events",
    material: "Materiaal per gebruik",
    output: "Kleine reeks",
  },
]

const posTypeRows = [
  {
    type: "Schapdisplays",
    need: "Stabiliteit + snelle montage",
    material: "PETG of stevige PLA",
    note: "Ideaal voor promo en producthighlight",
  },
  {
    type: "Balie- en toonbankprops",
    need: "Visuele impact + degelijkheid",
    material: "PLA specials of PETG",
    note: "Sterk voor korte campagnes en events",
  },
  {
    type: "Signage houders",
    need: "Maatwerk en herbruikbaarheid",
    material: "PETG",
    note: "Goed voor frequente wissel van communicatie",
  },
]

const pricingRows = [
  { type: "Prototype POS component", qty: "1-3 stuks", range: "vanaf EUR 5/stuk", leadTime: "2-4 werkdagen" },
  { type: "Validatiebatch", qty: "5-20 stuks", range: "geometrie-afhankelijk", leadTime: "3-6 werkdagen" },
  { type: "Pilot run", qty: "20+ stuks", range: "volume-afhankelijk", leadTime: "op planning" },
]

const intakeChecklist = [
  "Store-context of plaatsingsfoto (schap, toonbank, wand, eventstand)",
  "Doel van het POS stuk (aandacht, guiding, producthighlight)",
  "Afmetingen, montagewijze en gewenste materiaal-look",
  "Aantal locaties, timing en gewenste pilotgrootte",
]

const relatedLinks = [
  { label: "Use Case Dinsdag retail displays", href: "/blog/use-case-dinsdag-retail-displays" },
  { label: "3D printing marketing events", href: "/blog/3d-printing-marketing-events" },
  { label: "3D print prijzen gids", href: "/blog/3d-print-prijzen-gids" },
  { label: "Portfolio 3D print projecten", href: "/portfolio" },
]

const faqItems = [
  {
    q: "Is 3D printen geschikt voor retail displays op meerdere locaties?",
    a: "Ja, zeker voor pilot-runs en kleine reeksen. Zo kan je concepten valideren voor je breder uitrolt.",
  },
  {
    q: "Welke materialen werken het best voor POS?",
    a: "Voor visuele prototypes vaak PLA varianten; voor robuustere toepassing vaak PETG.",
  },
  {
    q: "Kunnen jullie eerst een testdisplay maken?",
    a: "Ja. Dat is meestal de snelste manier om vorm, look en montage te valideren.",
  },
  {
    q: "Hoe snel krijgen we een voorstel?",
    a: "Meestal binnen 24 uur met duidelijke briefing en context.",
  },
]

const references = [
  { label: "Prusa filament material guide", href: "https://help.prusa3d.com/filament-material-guide" },
  { label: "Ultimaker design for FFF", href: "https://ultimaker.com/learn/design-for-fff-3d-printing/" },
  { label: "Shopper marketing (POPAI resources)", href: "https://www.popai.com/" },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "Retail POS 3D printen: displays en winkelmateriaal",
  description:
    "Praktische gids voor retail POS en displays via 3D printen, van conceptvalidatie naar pilot-runs.",
  datePublished,
  dateModified,
  image: "/images/og-blog-nl.svg",
  inLanguage: "nl-BE",
})

const faqJsonLd = buildFaqPageSchema({
  inLanguage: "nl-BE",
  mainEntityOfPage: canonical,
  items: faqItems.map((item) => ({ q: item.q, a: item.a })),
})

const howToJsonLd = buildHowToSchema({
  name: "Retail POS laten 3D printen",
  description: "Gebruik een gefaseerde aanpak van mock-up naar pilot run voor retail POS materiaal.",
  inLanguage: "nl-BE",
  mainEntityOfPage: canonical,
  totalTime: "PT5M",
  steps: [
    { name: "Definieer POS doel en locatie", text: "Breng plaatsing, formaat en campagnecontext in kaart." },
    { name: "Kies materiaal en look", url: materialsHref },
    { name: "Plan prototype en validatiebatch", url: pricingHref },
    { name: "Start prefilled intake", url: contactHref },
  ],
  toolNames: ["X3DPrints pricing", "Material Suggestion Tool"],
  supplyNames: ["Briefing", "Afmetingen", "Referentiefoto's"],
})

export default function RetailPosGuidePage() {
  return (
    <main className="relative overflow-hidden px-6 pb-24 pt-16 sm:px-8 lg:px-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(130%_60%_at_50%_0%,rgba(16,185,129,.16),transparent_72%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.08]" />

      <article className="mx-auto max-w-5xl space-y-10">
        <header className="space-y-4">
          <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
            <ol className="flex flex-wrap gap-2">
              <li>
                <Link href="/blog" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Blog
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="font-medium text-slate-700">Retail POS 3D printen</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">B2B use-cases</p>
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Retail POS 3D printen: displays en winkelmateriaal
          </h1>
          <p className="max-w-3xl text-lg text-slate-700">
            Kort antwoord: 3D printen werkt uitstekend voor POS mock-ups, testdisplays en pilot-runs. Je valideert sneller in echte winkelcontext en stuurt sneller bij.
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">{lastUpdatedLabel}</p>
          <div className="flex flex-wrap gap-3">
            <ShimmerButton
              href={contactHref}
              event={{ action: "cta_click", category: "blog_retail_pos_top", label: "contact_prefill" }}
            >
              Start POS intake
            </ShimmerButton>
            <ShimmerButton
              href={materialsHref}
              className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
              event={{ action: "cta_click", category: "blog_retail_pos_top", label: "materials_tool" }}
            >
              Kies materiaal
            </ShimmerButton>
            <Link
              href={portfolioHref}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:border-slate-300 hover:bg-slate-50"
            >
              Bekijk portfolio
            </Link>
          </div>
        </header>

        <BlogContentOverview locale="nl" />

        <section id="waarom-retail-pos-printen" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Waarom deze aanpak werkt voor retail POS</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {valueCards.map((card) => (
                <GlassCard key={card.title} className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
                  <p className="mt-2 text-sm text-slate-700">{card.body}</p>
                  <Link href={card.href} className="mt-3 inline-flex text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                    {card.label}
                  </Link>
                </GlassCard>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="fases-retail-pos" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Fase-aanpak: van mock-up naar pilot run</h2>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200/70 bg-white/80">
              <table className="min-w-full text-left text-sm text-slate-700">
                <caption className="sr-only">Fases voor retail POS met 3D printen</caption>
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Fase</th>
                    <th className="px-4 py-3">Doel</th>
                    <th className="px-4 py-3">Materiaal</th>
                    <th className="px-4 py-3">Output</th>
                  </tr>
                </thead>
                <tbody>
                  {phaseRows.map((row) => (
                    <tr key={row.phase} className="border-t border-slate-200/60">
                      <td className="px-4 py-3 font-semibold text-slate-900">{row.phase}</td>
                      <td className="px-4 py-3">{row.goal}</td>
                      <td className="px-4 py-3">{row.material}</td>
                      <td className="px-4 py-3">{row.output}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </section>

        <section id="types-retail-pos" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Welke POS types passen goed bij 3D printen?</h2>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200/70 bg-white/80">
              <table className="min-w-full text-left text-sm text-slate-700">
                <caption className="sr-only">POS types en materiaaladvies</caption>
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Nood</th>
                    <th className="px-4 py-3">Materiaal</th>
                    <th className="px-4 py-3">Opmerking</th>
                  </tr>
                </thead>
                <tbody>
                  {posTypeRows.map((row) => (
                    <tr key={row.type} className="border-t border-slate-200/60">
                      <td className="px-4 py-3 font-semibold text-slate-900">{row.type}</td>
                      <td className="px-4 py-3">{row.need}</td>
                      <td className="px-4 py-3">{row.material}</td>
                      <td className="px-4 py-3">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </section>

        <section id="intake-retail-pos" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Welke intake-info heb je nodig?</h2>
            <GlassCard className="mt-4 p-6">
              <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
                {intakeChecklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </section>

        <section id="kosten-retail-pos" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Kosten en planning</h2>
            <p className="mt-2 text-slate-700">
              Richtwaarden voor planning. Exacte prijs hangt af van geometrie, afwerking en aantal varianten.
            </p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200/70 bg-white/80">
              <table className="min-w-full text-left text-sm text-slate-700">
                <caption className="sr-only">Richtprijzen voor retail POS runs</caption>
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Aantal</th>
                    <th className="px-4 py-3">Prijsrange</th>
                    <th className="px-4 py-3">Doorlooptijd</th>
                  </tr>
                </thead>
                <tbody>
                  {pricingRows.map((row) => (
                    <tr key={row.type} className="border-t border-slate-200/60">
                      <td className="px-4 py-3 font-semibold text-slate-900">{row.type}</td>
                      <td className="px-4 py-3">{row.qty}</td>
                      <td className="px-4 py-3">{row.range}</td>
                      <td className="px-4 py-3">{row.leadTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </section>

        <section id="faq-retail-pos" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">FAQ</h2>
            <div className="mt-4">
              <Faq items={faqItems} />
            </div>
          </Reveal>
        </section>

        <section id="sources" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Bronnen en referenties</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {references.map((reference) => (
                <li key={reference.href} className="rounded-xl border border-slate-200/70 bg-white/80 px-4 py-3">
                  <cite className="not-italic">
                    <Link href={reference.href} target="_blank" rel="noreferrer" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      {reference.label}
                    </Link>
                  </cite>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        <section className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">Volgende stap</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Wil je een POS pilot opstarten?</h2>
              <p className="mt-2 text-slate-700">
                Deel je briefing, doelgroep en locatiecontext. Je krijgt snel een voorstel voor materiaal, planning en pilotgrootte.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <ShimmerButton
                  href={contactHref}
                  event={{ action: "cta_click", category: "blog_retail_pos_bottom", label: "contact_prefill" }}
                >
                  Start intake
                </ShimmerButton>
                <Link
                  href={servicesHref}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:border-slate-300 hover:bg-slate-50"
                >
                  Bekijk serviceflow
                </Link>
              </div>
              <div className="mt-4 text-sm text-slate-600">
                Verder lezen:{" "}
                {relatedLinks.map((item, index) => (
                  <span key={item.href}>
                    <Link href={item.href} className="font-semibold text-indigo-600 hover:text-indigo-500">
                      {item.label}
                    </Link>
                    {index < relatedLinks.length - 1 ? ", " : "."}
                  </span>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        </section>
      </article>

      <BlogAuthorNote locale="nl" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
    </main>
  )
}
