import type { Metadata } from "next"
import Link from "next/link"
import Faq from "@/components/Faq"
import GlassCard from "@/components/GlassCard"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import BlogAuthorNote from "@/components/BlogAuthorNote"
import BlogContentOverview from "@/components/BlogContentOverview"
import { buildArticleJsonLd, buildFaqPageSchema, buildHowToSchema } from "@/lib/seo"

const canonical = "https://www.x3dprints.be/blog/kapot-onderdeel-laten-printen/"
const enCanonical = "https://www.x3dprints.be/en/blog/kapot-onderdeel-laten-printen/"
const datePublished = "2026-03-01"
const dateModified = "2026-03-01"
const lastUpdatedLabel = "Laatst bijgewerkt: 1 maart 2026"

const contactHref =
  "/contact?material=PETG&quote=Kapot%20onderdeel%20laten%203D%20printen%20-%20ik%20wil%20een%20vervangstuk"
const pricingHref = "/pricing?utm_source=blog&utm_medium=cta&utm_campaign=kapot-onderdeel-laten-printen"
const materialsHref = "/materials#material-suggestion-tool"
const servicesHref = "/services?utm_source=blog&utm_medium=internal&utm_campaign=kapot-onderdeel-laten-printen"
const viewerHref = "/viewer?utm_source=blog&utm_medium=internal&utm_campaign=kapot-onderdeel-laten-printen"

export const metadata: Metadata = {
  title: "Kapot onderdeel laten 3D printen: praktische gids | X3DPrints",
  description:
    "Kapot onderdeel vervangen met 3D printen? Deze gids toont intake, materiaalkeuze, kostinschatting en interne checks voor een betrouwbaar vervangstuk.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": canonical,
      "en-BE": enCanonical,
      "x-default": canonical,
    },
  },
  openGraph: {
    title: "Kapot onderdeel laten 3D printen",
    description:
      "Van intake tot materiaalkeuze: zo vervang je een kapot onderdeel met een betrouwbare 3D print.",
    url: canonical,
    images: [{ url: "/images/og-blog-nl.svg", width: 1200, height: 630, alt: "Kapot onderdeel laten 3D printen" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kapot onderdeel laten 3D printen",
    description: "Praktische gids met stappenplan, materiaalkeuze en kostindicatie.",
    images: ["/images/og-blog-nl.svg"],
  },
}

const decisionCards = [
  {
    title: "Niet meer leverbaar onderdeel",
    body:
      "Als OEM-onderdelen niet meer beschikbaar zijn, kan een functioneel equivalent vaak sneller via FDM worden gemaakt.",
    link: { href: "/services", label: "Bekijk 3D print service" },
  },
  {
    title: "Sneller dan klassieke sourcing",
    body:
      "Voor enkelstuks of kleine reeksen is printen meestal sneller dan wachten op internationale stock.",
    link: { href: "/blog/3d-printen-op-bestelling", label: "Lees: 3D printen op bestelling" },
  },
  {
    title: "Iteratief verbeteren",
    body:
      "Je kan versie 1 testen, kleine maatcorrecties doen en daarna pas de definitieve print laten draaien.",
    link: { href: "/blog/3d-print-offerte-aanvragen", label: "Lees: offerte slim aanvragen" },
  },
]

const processSteps = [
  {
    title: "1. Intake met context",
    body:
      "Deel foto, afmetingen, belastingen (temperatuur, trillingen, vocht) en hoe het stuk gemonteerd zit.",
  },
  {
    title: "2. Filecheck of reverse basis",
    body:
      "Heb je STL/STEP? Dan valideren we direct. Zonder file starten we met een eenvoudige maatopname en modelvoorstel.",
  },
  {
    title: "3. Materiaalkeuze en printstrategie",
    body:
      "We kiezen PLA, PETG of TPU op functie. Daarna bepalen we orientatie, wanddikte en tolerantie voor montage.",
  },
  {
    title: "4. Testfit en finale run",
    body:
      "Bij kritische stukken starten we met een testdeel. Na fitcheck plannen we de definitieve print of kleine reeks.",
  },
]

const materialRows = [
  {
    material: "PLA Matte",
    bestFor: "Snelle prototype-fitchecks en indoor onderdelen",
    strength: "Stijf, lage hittebestendigheid",
    when: "Wanneer snelheid en lage kost belangrijker zijn dan hitte/UV",
  },
  {
    material: "PETG",
    bestFor: "Functionele onderdelen en licht outdoor gebruik",
    strength: "Sterker in warmte/vocht dan PLA",
    when: "Standaard keuze voor duurzame vervangstukken",
  },
  {
    material: "TPU",
    bestFor: "Dempers, zachte clips, flexibele passen",
    strength: "Flexibel en schokabsorberend",
    when: "Wanneer buiging of grip belangrijk is",
  },
]

const priceTable = [
  { type: "Kleine clip of houder", size: "~5x5x5 cm", baseline: "vanaf EUR 5", leadTime: "meestal 2-4 werkdagen" },
  { type: "Beugel of cover", size: "~10x10x10 cm", baseline: "vanaf EUR 20", leadTime: "meestal 2-5 werkdagen" },
  { type: "Groter montageonderdeel", size: "~20x20x20 cm", baseline: "vanaf EUR 49", leadTime: "meestal 3-6 werkdagen" },
]

const intakeChecklist = [
  "Foto van het kapotte onderdeel en omgeving waar het gemonteerd zit",
  "Ruwe afmetingen en kritische passing (gaten, clips, schroefdraad)",
  "Belasting: binnen/buiten, hitte, vocht, trillingen",
  "Gewenste timing en aantal stuks",
]

const relatedLinks = [
  { label: "Hoeveel kost 3D printen?", href: "/blog/hoeveel-kost-3d-printen" },
  { label: "Juiste 3D print materiaal kiezen", href: "/blog/juiste-3d-print-materiaal" },
  { label: "Hoe lang duurt 3D printen?", href: "/blog/hoe-lang-duurt-3d-printen" },
  { label: "3D print ontwerp checklist", href: "/blog/3d-print-ontwerp-checklist" },
]

const faqItems = [
  {
    q: "Kan ik ook zonder 3D-bestand starten?",
    a: "Ja. Met foto's, basisafmetingen en context kunnen we al een haalbare intake doen en bepalen of een modelopzet zinvol is.",
  },
  {
    q: "Welk materiaal gebruiken jullie meestal voor vervangonderdelen?",
    a: "PETG is vaak de veilige standaard voor functioneel gebruik. PLA is sneller voor testfits, TPU voor flexibele zones.",
  },
  {
    q: "Hoe snel weet ik een richtprijs?",
    a: "Meestal binnen 24 uur met voldoende context. Met STL/STEP gaat dit doorgaans nog sneller.",
  },
  {
    q: "Doen jullie ook kleine reeksen als de testfit goed is?",
    a: "Ja, na bevestigde passing schalen we op naar kleine reeksen met dezelfde parameters.",
  },
]

const references = [
  {
    label: "Prusa: filament material guide",
    href: "https://help.prusa3d.com/filament-material-guide",
  },
  {
    label: "Ultimaker: design for FFF",
    href: "https://ultimaker.com/learn/design-for-fff-3d-printing/",
  },
  {
    label: "iFixit repair guides",
    href: "https://www.ifixit.com/Guide",
  },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "Kapot onderdeel laten 3D printen: praktische gids",
  description:
    "Praktische gids om kapotte onderdelen te vervangen via 3D printen met intake, materiaalkeuze, kostinschatting en testfit.",
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
  name: "Kapot onderdeel vervangen met 3D printen",
  description:
    "Werk van intake naar testfit in vier stappen om snel een bruikbaar vervangstuk te krijgen.",
  inLanguage: "nl-BE",
  mainEntityOfPage: canonical,
  totalTime: "PT5M",
  steps: [
    { name: "Deel context en afmetingen", text: "Stuur foto, afmetingen en toepassing van het onderdeel." },
    { name: "Check file of modelbasis", url: viewerHref },
    { name: "Kies materiaal en prijsroute", url: pricingHref },
    { name: "Vraag prefilled offerte", url: contactHref },
  ],
  toolNames: ["X3DPrints viewer", "Material Suggestion Tool", "X3DPrints pricing"],
  supplyNames: ["Foto of STL/STEP", "Afmetingen en gebruikscontext"],
})

export default function BrokenPartGuidePage() {
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
              <li className="font-medium text-slate-700">Kapot onderdeel laten printen</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">Praktische problemen</p>
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Kapot onderdeel laten 3D printen: zo pak je het slim aan
          </h1>
          <p className="max-w-3xl text-lg text-slate-700">
            Kort antwoord: ja, vaak kan dat. Als je snel context deelt over passing en belasting, kan een 3D geprint vervangstuk in veel gevallen sneller klaar zijn dan klassieke sourcing.
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">{lastUpdatedLabel}</p>
          <div className="flex flex-wrap gap-3">
            <ShimmerButton
              href={contactHref}
              event={{ action: "cta_click", category: "blog_broken_part_top", label: "contact_prefill" }}
            >
              Start met vervangstuk
            </ShimmerButton>
            <ShimmerButton
              href={materialsHref}
              className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
              event={{ action: "cta_click", category: "blog_broken_part_top", label: "materials_tool" }}
            >
              Kies materiaal
            </ShimmerButton>
            <Link
              href={pricingHref}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:border-slate-300 hover:bg-slate-50"
            >
              Bekijk prijsindicatie
            </Link>
          </div>
        </header>

        <BlogContentOverview locale="nl" />

        <section id="wanneer-loont-3d-printen" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Wanneer loont 3D printen voor een kapot onderdeel?</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {decisionCards.map((card) => (
                <GlassCard key={card.title} className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
                  <p className="mt-2 text-sm text-slate-700">{card.body}</p>
                  <Link href={card.link.href} className="mt-3 inline-flex text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                    {card.link.label}
                  </Link>
                </GlassCard>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="stappenplan-vervangstuk" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Stappenplan: van kapot naar bruikbaar vervangstuk</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {processSteps.map((step) => (
                <GlassCard key={step.title} className="p-6">
                  <h3 className="text-base font-semibold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-sm text-slate-700">{step.body}</p>
                </GlassCard>
              ))}
            </div>
            <p className="mt-4 text-sm text-slate-600">
              Tip: gebruik ook de <Link href={viewerHref} className="font-semibold text-indigo-600 hover:text-indigo-500">viewer</Link> en de{" "}
              <Link href="/blog/3d-print-ontwerp-checklist" className="font-semibold text-indigo-600 hover:text-indigo-500">
                ontwerp checklist
              </Link>{" "}
              om veelvoorkomende fitproblemen vooraf te reduceren.
            </p>
          </Reveal>
        </section>

        <section id="materiaal-voor-vervangonderdelen" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Materiaalkeuze voor vervangonderdelen</h2>
            <p className="mt-2 text-slate-700">
              Start met de use-case, niet met de kleur. Voor functionele vervangstukken is PETG vaak de baseline, zoals we ook toelichten in{" "}
              <Link href="/blog/juiste-3d-print-materiaal" className="font-semibold text-indigo-600 hover:text-indigo-500">
                deze materiaalgids
              </Link>
              .
            </p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200/70 bg-white/80">
              <table className="min-w-full text-left text-sm text-slate-700">
                <caption className="sr-only">Materiaalkeuze voor kapotte onderdelen vervangen via 3D printen</caption>
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Materiaal</th>
                    <th className="px-4 py-3">Best voor</th>
                    <th className="px-4 py-3">Eigenschap</th>
                    <th className="px-4 py-3">Wanneer kiezen</th>
                  </tr>
                </thead>
                <tbody>
                  {materialRows.map((row) => (
                    <tr key={row.material} className="border-t border-slate-200/60">
                      <td className="px-4 py-3 font-semibold text-slate-900">{row.material}</td>
                      <td className="px-4 py-3">{row.bestFor}</td>
                      <td className="px-4 py-3">{row.strength}</td>
                      <td className="px-4 py-3">{row.when}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </section>

        <section id="prijs-en-doorlooptijd" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Prijs snapshot en doorlooptijd</h2>
            <p className="mt-2 text-slate-700">
              Deze ranges zijn indicatief en sluiten aan op de actuele{" "}
              <Link href="/pricing" className="font-semibold text-indigo-600 hover:text-indigo-500">
                pricing-structuur
              </Link>
              . Exacte prijs volgt na filecheck en context.
            </p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200/70 bg-white/80">
              <table className="min-w-full text-left text-sm text-slate-700">
                <caption className="sr-only">Indicatieve prijsrange voor vervangonderdelen</caption>
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Type onderdeel</th>
                    <th className="px-4 py-3">Formaat</th>
                    <th className="px-4 py-3">Richtprijs</th>
                    <th className="px-4 py-3">Typische doorlooptijd</th>
                  </tr>
                </thead>
                <tbody>
                  {priceTable.map((row) => (
                    <tr key={row.type} className="border-t border-slate-200/60">
                      <td className="px-4 py-3 font-semibold text-slate-900">{row.type}</td>
                      <td className="px-4 py-3">{row.size}</td>
                      <td className="px-4 py-3">{row.baseline}</td>
                      <td className="px-4 py-3">{row.leadTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </section>

        <section id="wat-aanleveren" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Wat moet je aanleveren voor een snelle intake?</h2>
            <GlassCard className="mt-4 p-6">
              <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
                {intakeChecklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                Wil je de intake scherper maken? Gebruik ook deze oudere gidsen:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                {relatedLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="font-semibold text-indigo-600 hover:text-indigo-500">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </section>

        <section id="faq-kapot-onderdeel" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">FAQ over kapotte onderdelen vervangen</h2>
            <div className="mt-4">
              <Faq items={faqItems} />
            </div>
          </Reveal>
        </section>

        <section id="bronnen" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Bronnen</h2>
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
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Wil je je vervangonderdeel direct laten bekijken?</h2>
              <p className="mt-2 text-slate-700">
                Deel foto of STL/STEP en context. Je krijgt een duidelijk advies over haalbaarheid, materiaal en prijsroute.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <ShimmerButton
                  href={contactHref}
                  event={{ action: "cta_click", category: "blog_broken_part_bottom", label: "contact_prefill" }}
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
