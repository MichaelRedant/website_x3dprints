import type { Metadata } from "next"
import Link from "next/link"
import ContentTableOfContents from "@/components/ContentTableOfContents"
import Faq from "@/components/Faq"
import GlassCard from "@/components/GlassCard"
import ReadMoreLinks from "@/components/ReadMoreLinks"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import { buildArticleJsonLd, buildFaqPageSchema, buildHowToSchema } from "@/lib/seo"

const canonical = "https://www.x3dprints.be/blog/3d-print-ontwerp-checklist/"
const datePublished = "2026-02-08"
const dateModified = "2026-02-08"
const materialsHref =
  "/materials?utm_source=blog&utm_medium=cta&utm_campaign=ontwerp-checklist#material-suggestion-tool"
const pricingHref = "/pricing?utm_source=blog&utm_medium=cta&utm_campaign=ontwerp-checklist"
const viewerHref = "/viewer?utm_source=blog&utm_medium=cta&utm_campaign=ontwerp-checklist"
const contactHref = "/contact?material=pla-tough&quote=Ontwerpcheck%20voor%203D%20print"

export const metadata: Metadata = {
  title: "3D print ontwerp checklist: model printklaar | X3DPrints",
  description:
    "Design checklist voor printklare 3D modellen: wanddikte, overhang, toleranties en assemblage. Inclusief tabel met richtwaarden en snelle CTA's.",
  alternates: { canonical },
  openGraph: {
    title: "3D print ontwerp checklist: model printklaar",
    description:
      "Checklist met richtwaarden voor wanddikte, overhang, tolerantie en assemblage zodat je model direct printbaar is.",
    url: canonical,
    images: [{ url: "/Logo.webp", width: 1200, height: 630, alt: "3D print ontwerp checklist" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D print ontwerp checklist: model printklaar",
    description: "Maak je model printklaar met deze ontwerp-checklist.",
    images: ["/Logo.webp"],
  },
}

const tocItems = [
  { id: "ontwerp-checklist", label: "De 6 checks voor printklare modellen" },
  { id: "ontwerp-tabel", label: "Richtwaarden in één tabel" },
  { id: "ontwerp-assemblage", label: "Assemblage en herhaalbaarheid" },
  { id: "ontwerp-faq", label: "FAQ over ontwerp" },
  { id: "ontwerp-sources", label: "Bronnen en referenties" },
]

const checklistItems = [
  {
    title: "Wanddikte & ribbing",
    description:
      "Gebruik consistente wanden en voeg ribs toe waar belasting toeneemt. Zo voorkom je delaminatie.",
  },
  {
    title: "Overhangs & support",
    description:
      "Beperk overhangs tot ±55 graden zodat de print sneller en strakker blijft.",
  },
  {
    title: "Toleranties & pasvorm",
    description:
      "Voor bewegende delen reken je extra speling in, anders smelten onderdelen aan elkaar.",
  },
  {
    title: "Gaten & bevestiging",
    description:
      "Vergroot gaten licht en plan inserts of schroeven waar het onderdeel echt moet werken.",
  },
  {
    title: "Oriëntatie & zichtvlak",
    description:
      "Leg het zichtvlak naar boven en plaats naden op verborgen zones voor een premium look.",
  },
  {
    title: "Assemblage & batching",
    description:
      "Split grote modellen, voeg paspennen toe en plan onderdelen die samen moeten aankomen in één batch.",
  },
]

const guidelineRows = [
  {
    label: "Minimale wanddikte",
    plaPetg: "≥ 1,2 mm",
    tpu: "≥ 2,0 mm",
    reason: "Houdt wanden stabiel en voorkomt breuklijnen.",
  },
  {
    label: "Overhang zonder support",
    plaPetg: "≤ 55°",
    tpu: "≤ 45°",
    reason: "Beperkt doorhang en nabewerking.",
  },
  {
    label: "Speling bewegende delen",
    plaPetg: "0,2–0,4 mm",
    tpu: "0,4–0,6 mm",
    reason: "Voorkomt vastgebrande scharnieren of clips.",
  },
  {
    label: "Gatcompensatie",
    plaPetg: "+0,2–0,3 mm",
    tpu: "+0,4–0,5 mm",
    reason: "Zorgt dat bouten en pennen soepel passen.",
  },
  {
    label: "Rib dikte",
    plaPetg: "0,6–1,0 mm",
    tpu: "1,0–1,4 mm",
    reason: "Extra stijfheid zonder overmatig gewicht.",
  },
]

const assemblyTips = [
  "Split grote onderdelen en voeg paspennen toe voor snelle alignering.",
  "Gebruik heat-set inserts of captive nuts voor herhaald montagewerk.",
  "Plan testprints van kritieke interfaces om pasvorm te checken.",
  "Bundel onderdelen die samen moeten aankomen in één offerte.",
]

const faqItems = [
  {
    q: "Wat is de snelste manier om printproblemen te voorkomen?",
    a: "Gebruik de checklist: juiste wanddikte, beperkte overhangs, voldoende speling en duidelijke orientatie.",
  },
  {
    q: "Wanneer kies ik PLA Tough+ in plaats van PETG?",
    a: "PLA Tough+ is ideaal voor indoor prototypes en stijve klemmen. PETG is sterker bij UV, vocht en warmte.",
  },
  {
    q: "Hoeveel speling heb ik nodig voor bewegende onderdelen?",
    a: "Voor PLA/PETG rekenen we 0,2–0,4 mm, voor TPU 0,4–0,6 mm afhankelijk van de schaal.",
  },
  {
    q: "Kunnen jullie mijn ontwerp reviewen?",
    a: "Ja. Stuur je STL/STEP via de viewer en vermeld je toepassing; we geven gericht advies.",
  },
]

const references = [
  {
    label: "Ultimaker: Design for FFF 3D printing",
    href: "https://ultimaker.com/learn/design-for-fff-3d-printing/",
  },
  {
    label: "Prusa material guide (PLA, PETG, TPU)",
    href: "https://help.prusa3d.com/filament-material-guide",
  },
  {
    label: "Bambu Studio documentation",
    href: "https://wiki.bambulab.com/en/software/bambu-studio",
  },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "3D print ontwerp checklist: model printklaar",
  description:
    "Checklist voor printklare 3D modellen met richtwaarden voor wanddikte, overhang en toleranties.",
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
  name: "3D print ontwerp check in 4 stappen",
  description: "Controleer wanddikte, overhang, tolerantie en assemblage voor een printklaar model.",
  inLanguage: "nl-BE",
  mainEntityOfPage: canonical,
  totalTime: "PT4M",
  steps: [
    {
      name: "Check wanddikte en ribbing",
      text: "Zorg dat wanden dik genoeg zijn en versterk waar nodig.",
    },
    {
      name: "Controleer overhangs en supports",
      text: "Beperk overhangs of voeg supports toe waar nodig.",
    },
    {
      name: "Stel tolerantie en pasvorm in",
      text: "Voor bewegende onderdelen reken je voldoende speling.",
    },
    {
      name: "Plan assemblage en offerte",
      url: contactHref,
    },
  ],
  toolNames: ["X3DPrints 3D viewer", "Material Suggestion Tool"],
  supplyNames: ["STL of STEP bestand"],
})

export default function BlogDesignChecklistPage() {
  return (
    <main className="relative overflow-hidden px-6 pb-24 pt-16 sm:px-8 lg:px-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_60%_at_50%_0%,rgba(16,185,129,.18),transparent_70%)]"
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
              <li className="font-medium text-slate-700">Ontwerp checklist</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">Design checklist</p>
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            3D print ontwerp checklist: model printklaar
          </h1>
          <p className="max-w-3xl text-lg text-slate-700">
            Het korte antwoord: een printklaar model heeft consistente wanden, beperkte overhangs, correcte toleranties
            en een duidelijke assemblagestrategie. Gebruik deze checklist om herprints te vermijden en sneller te plannen.
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
            Laatst bijgewerkt: 8 februari 2026
          </p>
          <div className="flex flex-wrap gap-3">
            <ShimmerButton
              href={viewerHref}
              event={{ action: "cta_click", category: "blog_design_checklist_top", label: "viewer" }}
            >
              Upload je model
            </ShimmerButton>
            <ShimmerButton
              href={materialsHref}
              className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
              event={{ action: "cta_click", category: "blog_design_checklist_top", label: "materials_tool" }}
            >
              Kies materiaal
            </ShimmerButton>
            <Link
              href={pricingHref}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:border-slate-300 hover:bg-slate-50"
            >
              Check pricing
            </Link>
          </div>
          <ContentTableOfContents title="Inhoud" items={tocItems} className="max-w-2xl" />
        </header>

        <section id="ontwerp-checklist" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">De 6 checks voor printklare modellen</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {checklistItems.map((item) => (
                <GlassCard key={item.title} className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-700">{item.description}</p>
                </GlassCard>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="ontwerp-tabel" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Richtwaarden in één tabel</h2>
              <p className="mt-2 text-sm text-slate-600">
                Dit zijn startwaarden voor FDM prints. We verfijnen ze naargelang schaal, nozzle en toepassing.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-[720px] text-left text-sm text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-200/70 text-slate-500">
                      <th className="py-2 pr-4 font-semibold">Check</th>
                      <th className="py-2 pr-4 font-semibold">PLA/PETG</th>
                      <th className="py-2 pr-4 font-semibold">TPU</th>
                      <th className="py-2 pr-4 font-semibold">Waarom</th>
                    </tr>
                  </thead>
                  <tbody>
                    {guidelineRows.map((row) => (
                      <tr key={row.label} className="border-b border-slate-200/70 last:border-0">
                        <td className="py-2 pr-4 font-medium text-slate-900">{row.label}</td>
                        <td className="py-2 pr-4">{row.plaPetg}</td>
                        <td className="py-2 pr-4">{row.tpu}</td>
                        <td className="py-2 pr-4">{row.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Twijfel je? Gebruik de{" "}
                <Link href={materialsHref} className="font-semibold text-emerald-600 hover:text-emerald-700">
                  Material Suggestion Tool
                </Link>{" "}
                of vraag een ontwerpcheck.
              </p>
            </GlassCard>
          </Reveal>
        </section>

        <section id="ontwerp-assemblage" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Assemblage en herhaalbaarheid</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {assemblyTips.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <ShimmerButton
                  href={contactHref}
                  event={{ action: "cta_click", category: "blog_design_checklist_mid", label: "contact_prefill" }}
                >
                  Vraag ontwerpcheck
                </ShimmerButton>
                <ShimmerButton
                  href={viewerHref}
                  className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
                  event={{ action: "cta_click", category: "blog_design_checklist_mid", label: "viewer" }}
                >
                  Upload bestand
                </ShimmerButton>
              </div>
            </GlassCard>
          </Reveal>
        </section>

        <section id="ontwerp-faq" className="scroll-mt-28">
          <Faq title="FAQ over 3D print ontwerp" items={faqItems} />
        </section>

        <section id="ontwerp-sources" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Bronnen en referenties</h2>
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
                <h2 className="mt-2 text-xl font-semibold text-slate-900">Klaar om je ontwerp te laten checken?</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Stuur je bestand door en we geven gerichte feedback op wanddikte, support en materiaalkeuze.
                </p>
              </div>
              <ShimmerButton
                href={contactHref}
                event={{ action: "cta_click", category: "blog_design_checklist_bottom", label: "contact_prefill" }}
              >
                Start ontwerpcheck
              </ShimmerButton>
            </GlassCard>
          </Reveal>
        </section>
      </article>

      <ReadMoreLinks pageType="services" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
    </main>
  )
}
