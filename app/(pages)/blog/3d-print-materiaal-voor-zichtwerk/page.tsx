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

const canonical = "https://www.x3dprints.be/blog/3d-print-materiaal-voor-zichtwerk/"
const datePublished = "2026-02-08"
const dateModified = "2026-02-08"
const materialsHref =
  "/materials?utm_source=blog&utm_medium=cta&utm_campaign=materiaal-voor-zichtwerk#material-suggestion-tool"
const pricingHref = "/pricing?utm_source=blog&utm_medium=cta&utm_campaign=materiaal-voor-zichtwerk"
const viewerHref = "/viewer?utm_source=blog&utm_medium=cta&utm_campaign=materiaal-voor-zichtwerk"
const contactHref =
  "/contact?material=pla-matte&quote=Materiaaladvies%20voor%20zichtwerk%203D%20prints"

export const metadata: Metadata = {
  title: "3D print materiaal voor zichtwerk: PLA Matte vs Silk | X3DPrints",
  description:
    "Welke 3D print materialen geven de mooiste afwerking? Vergelijk PLA Matte, Silk+, Marble, Metal en PETG met een matrix, scenario's en snelle CTA's.",
  alternates: { canonical },
  openGraph: {
    title: "3D print materiaal voor zichtwerk: PLA Matte vs Silk",
    description:
      "Vergelijk zichtwerk-materialen met een matrix, scenario's en gerichte CTA's naar materialen en pricing.",
    url: canonical,
    images: [{ url: "/Logo.webp", width: 1200, height: 630, alt: "3D print materiaal voor zichtwerk" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D print materiaal voor zichtwerk: PLA Matte vs Silk",
    description: "Materiaalgids voor zichtwerk en designprints.",
    images: ["/Logo.webp"],
  },
}

const criteriaCards = [
  {
    title: "Afwerking & glans",
    description:
      "Matte materialen verbergen layerlijnen, terwijl Silk of Metal extra glans en premium uitstraling geven.",
  },
  {
    title: "Kleurconsistentie",
    description:
      "Voor branding is kleurvastheid cruciaal. PLA Matte en PETG blijven het meest stabiel.",
  },
  {
    title: "Detailniveau",
    description:
      "Kleine typografie of logo's vragen strak detail en een consistente printstrategie.",
  },
  {
    title: "Gebruik & handling",
    description:
      "Moet het object tegen een stootje kunnen? Combineer zichtwerk met PETG of PLA Tough+.",
  },
]

const matrixRows = [
  {
    material: "PLA Matte",
    look: "Zacht mat, premium",
    bestFor: "Productmock-ups, interieur, branding props",
    durability: "Indoor, licht gebruik",
    href: "/materials/pla-matte",
  },
  {
    material: "PLA Silk+",
    look: "Glans, showpiece",
    bestFor: "Awards, trophies, marketing displays",
    durability: "Indoor, visueel",
    href: "/materials/pla-silk",
  },
  {
    material: "PLA Marble",
    look: "Steenlook, textuur",
    bestFor: "Interieur, sculpturen, premium props",
    durability: "Indoor, decor",
    href: "/materials/pla-marble",
  },
  {
    material: "PLA Metal",
    look: "Metallic sheen",
    bestFor: "Industrial props, premium prototypes",
    durability: "Indoor, semi-robust",
    href: "/materials/pla-metal",
  },
  {
    material: "PETG",
    look: "Licht glanzend",
    bestFor: "Zichtwerk dat ook duurzaam moet zijn",
    durability: "Outdoor / functioneel",
    href: "/materials/petg",
  },
]

const scenarios = [
  {
    title: "Awards & trophies",
    description:
      "Kies PLA Silk+ of PLA Metal voor glans en een luxueuze uitstraling. Voeg matte accenten toe voor contrast.",
  },
  {
    title: "Retail displays",
    description:
      "PLA Matte werkt goed voor grote volumes en branding. PETG is beter als de display intensief gebruikt wordt.",
  },
  {
    title: "Interieur en decor",
    description:
      "PLA Marble en PLA Matte geven een zachte, premium look zonder veel nabewerking.",
  },
]

const faqItems = [
  {
    q: "Wat is het beste materiaal voor zichtwerk?",
    a: "PLA Matte is het veiligste startpunt dankzij de zachte finish. Silk of Metal geeft extra glans voor premium objecten.",
  },
  {
    q: "Kan ik zichtwerk combineren met duurzaamheid?",
    a: "Ja. PETG biedt een duurzame basis met een nette finish, ideaal voor displays die veel aangeraakt worden.",
  },
  {
    q: "Hoe vermijd ik zichtbare layerlijnen?",
    a: "Kies een matte finish, gebruik fijne laaghoogte en plan het zichtvlak bovenaan.",
  },
  {
    q: "Welke materialen zijn geschikt voor lichtdoorlaat?",
    a: "PLA Translucent of PETG Translucent geven een zachte glow zonder hotspots.",
  },
]

const references = [
  {
    label: "Prusa material guide (PLA, PETG, TPU)",
    href: "https://help.prusa3d.com/filament-material-guide",
  },
  {
    label: "Ultimaker: Design for FFF 3D printing",
    href: "https://ultimaker.com/learn/design-for-fff-3d-printing/",
  },
  {
    label: "Bambu Studio documentation",
    href: "https://wiki.bambulab.com/en/software/bambu-studio",
  },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "3D print materiaal voor zichtwerk: PLA Matte vs Silk",
  description:
    "Vergelijk zichtwerk-materialen met een matrix, scenario's en beslisregels voor designprints.",
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
  name: "Materiaal kiezen voor zichtwerk in 4 stappen",
  description: "Bepaal look, gebruik en duurzaamheid om het juiste zichtwerk-materiaal te kiezen.",
  inLanguage: "nl-BE",
  mainEntityOfPage: canonical,
  totalTime: "PT4M",
  steps: [
    {
      name: "Bepaal de gewenste look",
      text: "Matte, glanzend of metal look? Dat bepaalt de basiskeuze.",
    },
    {
      name: "Check gebruik en handling",
      text: "Wordt het object veel aangeraakt? Dan is PETG of PLA Tough+ beter.",
    },
    {
      name: "Vergelijk in de matrix",
      url: materialsHref,
    },
    {
      name: "Vraag een testprint of offerte",
      url: contactHref,
    },
  ],
  toolNames: ["Material Suggestion Tool", "Pricing calculator"],
  supplyNames: ["STL of STEP bestand"],
})

export default function BlogMaterialZichtwerkPage() {
  return (
    <main className="relative overflow-hidden px-6 pb-24 pt-16 sm:px-8 lg:px-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_60%_at_50%_0%,rgba(236,72,153,.18),transparent_70%)]"
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
              <li className="font-medium text-slate-700">Materiaal voor zichtwerk</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-500">Materials guide</p>
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            3D print materiaal voor zichtwerk: PLA Matte vs Silk
          </h1>
          <p className="max-w-3xl text-lg text-slate-700">
            Het korte antwoord: PLA Matte is de veiligste basis voor strak zichtwerk, PLA Silk+ zorgt voor glans en
            showpieces, en PETG gebruik je wanneer het object ook duurzaam moet zijn. Met deze matrix kies je sneller.
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
            Laatst bijgewerkt: 8 februari 2026
          </p>
          <div className="flex flex-wrap gap-3">
            <ShimmerButton
              href={materialsHref}
              event={{ action: "cta_click", category: "blog_zichtwerk_top", label: "materials_tool" }}
            >
              Kies materiaal
            </ShimmerButton>
            <ShimmerButton
              href={pricingHref}
              className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
              event={{ action: "cta_click", category: "blog_zichtwerk_top", label: "pricing" }}
            >
              Check pricing
            </ShimmerButton>
            <Link
              href={viewerHref}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:border-slate-300 hover:bg-slate-50"
            >
              Upload je model
            </Link>
          </div>
        </header>

      <BlogContentOverview locale="nl" />

        <section id="zichtwerk-criteria" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Welke criteria bepalen zichtwerk?</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {criteriaCards.map((card) => (
                <GlassCard key={card.title} className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
                  <p className="mt-2 text-sm text-slate-700">{card.description}</p>
                </GlassCard>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="zichtwerk-matrix" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Materiaalvergelijking in één tabel</h2>
              <p className="mt-2 text-sm text-slate-600">
                Kies op basis van look, duurzaamheid en het beoogde gebruik.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-[720px] text-left text-sm text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-200/70 text-slate-500">
                      <th className="py-2 pr-4 font-semibold">Materiaal</th>
                      <th className="py-2 pr-4 font-semibold">Look</th>
                      <th className="py-2 pr-4 font-semibold">Beste voor</th>
                      <th className="py-2 pr-4 font-semibold">Duurzaamheid</th>
                      <th className="py-2 pr-4 font-semibold">Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {matrixRows.map((row) => (
                      <tr key={row.material} className="border-b border-slate-200/70 last:border-0">
                        <td className="py-2 pr-4 font-medium text-slate-900">{row.material}</td>
                        <td className="py-2 pr-4">{row.look}</td>
                        <td className="py-2 pr-4">{row.bestFor}</td>
                        <td className="py-2 pr-4">{row.durability}</td>
                        <td className="py-2 pr-4">
                          <Link href={row.href} className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Bekijk
                          </Link>
                        </td>
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
                voor gericht advies.
              </p>
            </GlassCard>
          </Reveal>
        </section>

        <section id="zichtwerk-scenarios" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Scenario&apos;s voor designprints</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                {scenarios.map((scenario) => (
                  <div key={scenario.title} className="rounded-2xl border border-slate-200/70 bg-white/80 p-4">
                    <h3 className="text-lg font-semibold text-slate-900">{scenario.title}</h3>
                    <p className="mt-2 text-sm text-slate-700">{scenario.description}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <ShimmerButton
                  href={contactHref}
                  event={{ action: "cta_click", category: "blog_zichtwerk_mid", label: "contact_prefill" }}
                >
                  Vraag materiaaladvies
                </ShimmerButton>
                <ShimmerButton
                  href={viewerHref}
                  className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
                  event={{ action: "cta_click", category: "blog_zichtwerk_mid", label: "viewer" }}
                >
                  Upload bestand
                </ShimmerButton>
              </div>
            </GlassCard>
          </Reveal>
        </section>

        <section id="zichtwerk-faq" className="scroll-mt-28">
          <Faq title="FAQ over zichtwerk 3D prints" items={faqItems} />
        </section>

        <section id="zichtwerk-sources" className="scroll-mt-28">
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
                <h2 className="mt-2 text-xl font-semibold text-slate-900">Klaar om je zichtwerk te plannen?</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Deel je ontwerp en ontvang advies over de juiste finish, materiaal en planning.
                </p>
              </div>
              <ShimmerButton
                href={contactHref}
                event={{ action: "cta_click", category: "blog_zichtwerk_bottom", label: "contact_prefill" }}
              >
                Start advies
              </ShimmerButton>
            </GlassCard>
          </Reveal>
        </section>
      </article>

      <ReadMoreLinks pageType="materials" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <BlogAuthorNote locale="nl" />
    </main>
  )
}
