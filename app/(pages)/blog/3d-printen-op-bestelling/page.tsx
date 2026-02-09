import type { Metadata } from "next"
import Link from "next/link"
import BlogReadMore from "@/components/BlogReadMore"
import Faq from "@/components/Faq"
import GlassCard from "@/components/GlassCard"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import { buildArticleJsonLd, buildFaqPageSchema, buildHowToSchema } from "@/lib/seo"
import BlogAuthorNote from "@/components/BlogAuthorNote"
import BlogContentOverview from "@/components/BlogContentOverview"

const canonical = "https://www.x3dprints.be/blog/3d-printen-op-bestelling/"
const enCanonical = "https://www.x3dprints.be/en/blog/3d-printen-op-bestelling/"
const datePublished = "2024-05-20"
const dateModified = "2026-02-08"
const pricingHref = "/pricing?utm_source=blog&utm_medium=cta&utm_campaign=op-bestelling"
const materialsHref = "/materials#material-suggestion-tool"
const viewerHref = "/viewer?utm_source=blog&utm_medium=cta&utm_campaign=op-bestelling"
const contactHref = "/contact?material=pla-matte&quote=3D%20printen%20op%20bestelling%20aanvraag"

export const metadata: Metadata = {
  title: "3D printen op bestelling in België | X3DPrints",
  description:
    "Praktische gids voor 3d printen op bestelling in België: intake, 3d model printen, levering en herhaalorders met een duidelijke 3d print service belgie workflow.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": canonical,
      "en-BE": enCanonical,
      "x-default": canonical,
    },
  },
  openGraph: {
    title: "3D printen op bestelling in België: van intake tot levering",
    description:
      "Lees hoe je snel bestelt, welke info nodig is en hoe herhaalorders efficiënter worden.",
    url: canonical,
    images: [{ url: "/Logo.webp", width: 1200, height: 630, alt: "3D printen op bestelling" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D printen op bestelling in België",
    description: "Gids met intake, productieflow, levering en repeat-order tips voor snelle offertes.",
    images: ["/Logo.webp"],
  },
}

const steps = [
  {
    title: "1. Intake met bestanden en context",
    body: "Stuur STL of STEP, gewenste aantallen, deadline en gebruikscontext voor snelle beoordeling.",
    link: { label: "Open de 3D viewer", href: viewerHref },
  },
  {
    title: "2. Materiaalroute en planning",
    body: "We adviseren materiaal, printstrategie en timing op basis van detail, sterkte en budget.",
    link: { label: "Kies materiaal", href: materialsHref },
  },
  {
    title: "3. Productie en levering",
    body: "Na akkoord plannen we productie en spreken we levering of afhaling af met duidelijke updates.",
    link: { label: "Bekijk prijzen", href: pricingHref },
  },
]

const briefingChecklist = [
  "STL of STEP bestand met duidelijke bestandsnaam en versie",
  "Gewenst materiaal en kleur (of vraag advies via de material tool)",
  "Aantal stuks en targetdatum",
  "Leverkeuze: afhalen, verzending of levering op maat",
]

const repeatTips = [
  "Werk met vaste projectnamen en versiebeheer zodat feedbackrondes kort blijven.",
  "Bundel kleine onderdelen in 1 batch om setup-kosten te beperken.",
  "Hou kritieke maten en toleranties bij per herhaalproject.",
  "Gebruik hetzelfde materiaalprofiel wanneer consistentie primeert.",
]

const faqItems = [
  {
    q: "Hoe snel krijg ik een offerte voor een bestelling?",
    a: "Meestal binnen 1 werkdag als STL of STEP plus context volledig zijn aangeleverd.",
  },
  {
    q: "Kan ik eerst 1 teststuk laten maken voor ik een batch plaats?",
    a: "Ja, een testprint is vaak de snelste manier om pasvorm en afwerking te valideren.",
  },
  {
    q: "Hoe werken herhaalorders bij hetzelfde model?",
    a: "Met projectnaam en versie kunnen we sneller herplannen en consistente kwaliteit aanhouden.",
  },
]

const references = [
  {
    label: "Autodesk: STL file format",
    href: "https://help.autodesk.com/cloudhelp/2014/ENU/Alias/files/GUID-8ABFA3B8-204B-44E0-A50B-BA4C1C3F9BE8.htm",
  },
  {
    label: "Autodesk: What is a STEP file?",
    href: "https://www.autodesk.com/solutions/what-is-a-step-file",
  },
  {
    label: "ISO/ASTM 52900: Additive manufacturing terminology",
    href: "https://www.astm.org/standards/isoastm52900",
  },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "3D printen op bestelling in België",
  description:
    "Praktische gids voor 3d printen op bestelling met intake, 3d model printen, materiaaladvies, levering en repeat-order aanpak.",
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
  name: "3D printen op bestelling in 4 stappen",
  description:
    "Start een bestelling met de juiste intake, materiaalkeuze en planning voor snelle productie.",
  inLanguage: "nl-BE",
  mainEntityOfPage: canonical,
  totalTime: "PT3M",
  steps: [
    {
      name: "Bestand en context delen",
      text: "Stuur STL of STEP met aantallen, deadline en toepassing.",
    },
    {
      name: "Materiaal en timing bepalen",
      url: materialsHref,
    },
    {
      name: "Prijscheck doen",
      url: pricingHref,
    },
    {
      name: "Bestelling met prefill versturen",
      url: contactHref,
    },
  ],
  toolNames: ["Material Suggestion Tool", "X3DPrints 3D viewer"],
  supplyNames: ["STL of STEP bestand"],
})

export default function OrderArticlePage() {
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
              <li className="font-medium text-slate-700">3D printen op bestelling</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">Ordering guide</p>
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            3D printen op bestelling in België: van intake tot levering
          </h1>
          <p className="max-w-3xl text-lg text-slate-700">
            Het korte antwoord: een goede intake versnelt alles. Met de juiste bestanden en context krijg je snel een duidelijke route voor 3d printen op bestelling, 3d model printen en een betrouwbare 3d print service belgie.
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
            Laatst bijgewerkt: 8 februari 2026
          </p>
          <div className="flex flex-wrap gap-3">
            <ShimmerButton
              href={contactHref}
              event={{ action: "cta_click", category: "blog_order_top", label: "contact_prefill" }}
            >
              Start bestelling
            </ShimmerButton>
            <ShimmerButton
              href={materialsHref}
              className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
              event={{ action: "cta_click", category: "blog_order_top", label: "materials" }}
            >
              Material Suggestion Tool
            </ShimmerButton>
            <Link
              href={viewerHref}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:border-slate-300 hover:bg-slate-50"
            >
              Check je model in viewer
            </Link>
          </div>
        </header>

      <BlogContentOverview locale="nl" />

        <section id="order-process" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Hoe verloopt een bestelling?</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {steps.map((step) => (
                <GlassCard key={step.title} className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-sm text-slate-700">{step.body}</p>
                  <Link href={step.link.href} className="mt-3 inline-flex text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                    {step.link.label}
                  </Link>
                </GlassCard>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="order-briefing" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Welke info versnelt je offerte?</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {briefingChecklist.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <ShimmerButton
                  href={pricingHref}
                  event={{ action: "cta_click", category: "blog_order_mid", label: "pricing" }}
                >
                  Bekijk prijsankers
                </ShimmerButton>
                <ShimmerButton
                  href={contactHref}
                  className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
                  event={{ action: "cta_click", category: "blog_order_mid", label: "contact_prefill" }}
                >
                  Vraag offerte
                </ShimmerButton>
              </div>
            </GlassCard>
          </Reveal>
        </section>

        <section id="order-repeat" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Hoe maak je herhaalorders efficient?</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {repeatTips.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                Zie ook de{" "}
                <Link href="/services" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  servicepagina
                </Link>{" "}
                en{" "}
                <Link href="/locaties" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  locaties
                </Link>{" "}
                voor levering en workflow.
              </p>
            </GlassCard>
          </Reveal>
        </section>

        <section id="order-faq" className="scroll-mt-28">
          <Faq title="FAQ over 3D printen op bestelling" items={faqItems} />
        </section>

        <section id="order-sources" className="scroll-mt-28">
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
      </article>

      <BlogAuthorNote locale="nl" />


      <BlogReadMore />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
    </main>
  )
}
