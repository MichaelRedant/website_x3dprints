import type { Metadata } from "next"
import Link from "next/link"
import Faq from "@/components/Faq"
import GlassCard from "@/components/GlassCard"
import ReadMoreLinks from "@/components/ReadMoreLinks"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import { buildArticleJsonLd, buildFaqPageSchema, buildHowToSchema } from "@/lib/seo"
import BlogAuthorNote from "@/components/BlogAuthorNote"
import BlogContentOverview from "@/components/BlogContentOverview"

const canonical = "https://www.x3dprints.be/blog/3d-print-ontwerp-gids/"
const datePublished = "2026-02-09"
const dateModified = "2026-02-09"
const viewerHref = "/viewer?utm_source=blog&utm_medium=cta&utm_campaign=ontwerp-gids"
const materialsHref = "/materials?utm_source=blog&utm_medium=cta&utm_campaign=ontwerp-gids#material-suggestion-tool"
const contactHref = "/contact?material=pla-matte&quote=Ontwerpcheck%20voor%20mijn%203D%20print"

export const metadata: Metadata = {
  title: "3D print ontwerp gids 2026: van CAD naar print | X3DPrints",
  description:
    "Complete 3D print ontwerp gids met ontwerpregels, toleranties en workflow. Inclusief checklist, tabel en links naar de viewer en materiaaltool.",
  alternates: { canonical },
  openGraph: {
    title: "3D print ontwerp gids 2026",
    description:
      "Ontwerpregels, toleranties en workflow om CAD-modellen printbaar te maken.",
    url: canonical,
    images: [{ url: "/Logo.webp", width: 1200, height: 630, alt: "3D print ontwerp gids" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D print ontwerp gids 2026",
    description: "Ontwerpregels, toleranties en workflow voor printbare CAD.",
    images: ["/Logo.webp"],
  },
}

const designRules = [
  {
    title: "Wanddiktes & ribs",
    description:
      "Bouw sterkte in met voldoende wanddiktes en ribbing. Vermijd te dunne wanden voor functionele onderdelen.",
    link: { href: "/blog/maker-monday-wanddiktes-ribs", label: "Lees wanddiktes gids" },
  },
  {
    title: "Toleranties & passing",
    description:
      "Voor bewegende onderdelen heb je speling nodig. Houd rekening met nozzlebreedte en elephant’s foot.",
    link: { href: "/blog/maker-monday-toleranties-3d-printen", label: "Lees toleranties gids" },
  },
  {
    title: "Oriëntatie & supports",
    description:
      "Oriënteer zo dat zichtvlakken schoon blijven en supports minimaal zijn. Dit bespaart tijd en kost.",
    link: { href: "/viewer", label: "Check in viewer" },
  },
  {
    title: "Assemblages",
    description:
      "Ontwerp onderdelen die makkelijk te splitsen en assembleren zijn, zeker bij grote prints.",
    link: { href: "/blog/3d-print-assemblage-gids", label: "Lees assemblage gids" },
  },
]

const toleranceRows = [
  {
    situation: "Schuivende passing (PLA/PETG)",
    clearance: "0.2-0.3 mm",
    tip: "Gebruik chamfers om elephant’s foot te compenseren.",
  },
  {
    situation: "Snap-fit of clip",
    clearance: "0.3-0.5 mm",
    tip: "Rond hoeken af en test met proefprint.",
  },
  {
    situation: "Scharnier/pin",
    clearance: "0.25-0.35 mm",
    tip: "Oriënteer de pin horizontaal voor betere lagen.",
  },
  {
    situation: "Heat-set insert",
    clearance: "-0.2 mm t.o.v. insert",
    tip: "Gebruik chamfer en druk de insert warm in.",
  },
]

const workflowSteps = [
  "Start met de juiste functie-eisen (sterkte, hitte, flexibiliteit).",
  "Modelleer met printoriëntatie in het achterhoofd: vermijd grote overhangs.",
  "Exporteer STEP voor iteraties en STL voor finale slicing.",
  "Controleer je bestand in de viewer en plan een testprint voor kritische pasvormen.",
]

const checklistLinks = [
  { label: "3D print ontwerp checklist", href: "/blog/3d-print-ontwerp-checklist" },
  { label: "Ontwerp een 3D-printbaar model", href: "/blog/ontwerp-3d-printbaar-model" },
  { label: "3D print assemblage gids", href: "/blog/3d-print-assemblage-gids" },
]

const faqItems = [
  {
    q: "Welke bestandsformaten werken het best?",
    a: "STL is standaard voor slicing, maar STEP is ideaal wanneer er nog wijzigingen nodig zijn.",
  },
  {
    q: "Hoe groot moet een testprint zijn?",
    a: "Focus op kritieke zones: clips, scharnieren of montages. Een klein teststuk bespaart kosten.",
  },
  {
    q: "Kan X3DPrints mijn ontwerp nakijken?",
    a: "Ja. We doen een snelle design review en sturen advies over wanddiktes, orientatie en materiaal.",
  },
  {
    q: "Wat is de grootste oorzaak van mislukte prints?",
    a: "Te dunne wanden en te veel overhang zonder support. Een snelle check in de viewer voorkomt dit.",
  },
]

const references = [
  {
    label: "Ultimaker: Design for FFF 3D printing",
    href: "https://ultimaker.com/learn/design-for-fff-3d-printing/",
  },
  {
    label: "Prusa: Print settings in PrusaSlicer",
    href: "https://help.prusa3d.com/category/print-settings_204",
  },
  {
    label: "Bambu Lab wiki: model preparation",
    href: "https://wiki.bambulab.com/en/software/studio",
  },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "3D print ontwerp gids 2026",
  description:
    "Design rules, tolerantie-tabel en workflow om CAD-modellen printbaar te maken.",
  datePublished,
  dateModified,
  image: "/Logo.webp",
  inLanguage: "nl-BE",
})

const faqJsonLd = buildFaqPageSchema({
  inLanguage: "nl-BE",
  mainEntityOfPage: canonical,
  items: faqItems.map((item) => ({ q: item.q, a: item.a })),
})

const howToJsonLd = buildHowToSchema({
  name: "Maak een 3D printbaar ontwerp in 4 stappen",
  description: "Van CAD naar print: de kernstappen om fouten en herprints te vermijden.",
  inLanguage: "nl-BE",
  mainEntityOfPage: canonical,
  totalTime: "PT6M",
  steps: [
    {
      name: "Definieer functie en materiaal",
      text: "Bepaal sterkte, hitte en look zodat je de juiste ontwerpregels kiest.",
    },
    {
      name: "Modelleer met printoriëntatie",
      text: "Plaats kritieke oppervlakken zo dat supports minimaal blijven.",
    },
    {
      name: "Controleer in de viewer",
      url: viewerHref,
    },
    {
      name: "Vraag een design review",
      url: contactHref,
    },
  ],
  toolNames: ["3D viewer", "Material Suggestion Tool"],
  supplyNames: ["STL of STEP bestand"],
})

export default function BlogDesignGuidePage() {
  return (
    <main className="relative overflow-hidden px-6 pb-24 pt-16 sm:px-8 lg:px-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_60%_at_50%_0%,rgba(99,102,241,.18),transparent_70%)]"
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
              <li className="font-medium text-slate-700">3D print ontwerp gids</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600">Design pillar</p>
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            3D print ontwerp gids: van CAD naar printbaar model
          </h1>
          <p className="max-w-3xl text-lg text-slate-700">
            Printbaar ontwerpen draait om wanddiktes, orientatie en tolerantie. Met deze gids krijg je ontwerpregels,
            tabellen en een workflow om herprints te vermijden en sneller te produceren.
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
            Laatst bijgewerkt: 9 februari 2026
          </p>
          <div className="flex flex-wrap gap-3">
            <ShimmerButton
              href={viewerHref}
              event={{ action: "cta_click", category: "blog_ontwerp_gids_top", label: "viewer" }}
            >
              Check je model
            </ShimmerButton>
            <ShimmerButton
              href={materialsHref}
              className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
              event={{ action: "cta_click", category: "blog_ontwerp_gids_top", label: "materials_tool" }}
            >
              Kies materiaal
            </ShimmerButton>
            <Link
              href={contactHref}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:border-slate-300 hover:bg-slate-50"
            >
              Vraag design review
            </Link>
          </div>
        </header>

        <BlogContentOverview locale="nl" />

        <section id="ontwerp-regels" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Ontwerpregels die het verschil maken</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {designRules.map((rule) => (
                <GlassCard key={rule.title} className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{rule.title}</h3>
                  <p className="mt-2 text-sm text-slate-700">{rule.description}</p>
                  <Link
                    href={rule.link.href}
                    className="mt-3 inline-flex text-sm font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    {rule.link.label}
                  </Link>
                </GlassCard>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="ontwerp-toleranties" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Toleranties en fits in één tabel</h2>
              <p className="mt-2 text-sm text-slate-600">
                Start met deze waarden en verfijn op basis van testprints en materiaal.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-[760px] text-left text-sm text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-200/70 text-slate-500">
                      <th className="py-2 pr-4 font-semibold">Situatie</th>
                      <th className="py-2 pr-4 font-semibold">Aanbevolen speling</th>
                      <th className="py-2 pr-4 font-semibold">Tip</th>
                    </tr>
                  </thead>
                  <tbody>
                    {toleranceRows.map((row) => (
                      <tr key={row.situation} className="border-b border-slate-200/70 last:border-0">
                        <td className="py-2 pr-4 font-medium text-slate-900">{row.situation}</td>
                        <td className="py-2 pr-4">{row.clearance}</td>
                        <td className="py-2 pr-4">{row.tip}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Meer detail? Bekijk de{" "}
                <Link href="/blog/maker-monday-toleranties-3d-printen" className="font-semibold text-emerald-600 hover:text-emerald-700">
                  Maker Monday toleranties gids
                </Link>{" "}
                voor uitgebreide tabellen.
              </p>
            </GlassCard>
          </Reveal>
        </section>

        <section id="ontwerp-workflow" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Workflow: van CAD naar print</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {workflowSteps.map((step) => (
                  <li key={step} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" aria-hidden />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <ShimmerButton
                  href={viewerHref}
                  event={{ action: "cta_click", category: "blog_ontwerp_gids_mid", label: "viewer" }}
                >
                  Upload je bestand
                </ShimmerButton>
                <ShimmerButton
                  href={contactHref}
                  className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
                  event={{ action: "cta_click", category: "blog_ontwerp_gids_mid", label: "contact_prefill" }}
                >
                  Vraag design review
                </ShimmerButton>
              </div>
            </GlassCard>
          </Reveal>
        </section>

        <section id="ontwerp-checklist" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Verdiep je ontwerp met deze gidsen</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                {checklistLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="font-semibold text-indigo-600 hover:text-indigo-500">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                Heb je liever dat we het ontwerp mee finetunen? Gebruik het contactformulier voor een snelle review.
              </p>
            </GlassCard>
          </Reveal>
        </section>

        <section id="ontwerp-faq" className="scroll-mt-28">
          <Faq title="FAQ over 3D print ontwerp" items={faqItems} />
        </section>

        <section id="ontwerp-sources" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 id="sources" className="text-2xl font-semibold text-slate-900">Bronnen en referenties</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {references.map((reference) => (
                  <li key={reference.href} className="rounded-xl border border-slate-200/70 bg-white/80 px-4 py-3">
                    <cite className="not-italic">
                      <a
                        href={reference.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        {reference.label}
                      </a>
                    </cite>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </section>

        <section>
          <Reveal>
            <GlassCard className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Volgende stap</p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900">Klaar voor een printbare versie?</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Deel je model en toepassing, dan sturen we feedback op wanddiktes, orientatie en materiaalkeuze.
                </p>
              </div>
              <ShimmerButton
                href={contactHref}
                event={{ action: "cta_click", category: "blog_ontwerp_gids_bottom", label: "contact_prefill" }}
              >
                Start design review
              </ShimmerButton>
            </GlassCard>
          </Reveal>
        </section>
      </article>

      <ReadMoreLinks pageType="services" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <BlogAuthorNote locale="nl" />
    </main>
  )
}
