import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"
import { buildArticleJsonLd } from "@/lib/seo"
import BlogAuthorNote from "@/components/BlogAuthorNote"
import BlogContentOverview from "@/components/BlogContentOverview"
import BlogFaq from "@/components/BlogFaq"
import { BLOG_FAQ } from "@/content/blog-faq"

const canonical = "https://www.x3dprints.be/blog/hoe-lang-duurt-3d-printen/"
const utm = "?utm_source=blog&utm_medium=cta&utm_campaign=hoe-lang-duurt-3d-printen"
const datePublished = "2024-09-15"
const dateModified = "2026-02-08"
const faq = BLOG_FAQ["hoe-lang-duurt-3d-printen"]
const contactHref = `/contact${utm}`
const toolHref = `/materials${utm}#material-suggestion-tool`
const pricingHref = `/pricing${utm}`

export const metadata: Metadata = {
  title: "Hoe lang duurt 3D printen? | X3DPrints Blog",
  description:
    "Welke factoren bepalen de doorlooptijd van 3D prints? We delen richtwaarden, planningsaanpak en tips om je project sneller op te starten.",
  alternates: { canonical },
  openGraph: {
    title: "Hoe lang duurt 3D printen?",
    description:
      "Ontdek hoe materiaal, afwerking en logistiek de levertijd beïnvloeden. Inclusief scenario's en tips om projecten te versnellen.",
    url: canonical,
    images: [{ url: "/images/portfolio/20241030_080710-1.jpg", width: 1200, height: 630, alt: "Hoe lang duurt 3D printen" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hoe lang duurt 3D printen?",
    description: "Planning guide voor 3D prints: machine-uren, nabewerking en logistiek stap voor stap uitgelegd.",
    images: ["/images/portfolio/20241030_080710-1.jpg"],
  },
}

const factors = [
  {
    title: "Machine-uren",
    description:
      "Laaghoogte, infill en onderdeelvolume sturen de pure printtijd. Een prototype draait soms binnen het uur klaar, terwijl grote behuizingen meerdere shifts in beslag nemen.",
  },
  {
    title: "Queue & voorbereiding",
    description:
      "We groeperen jobs per materiaal zodat wissels beperkt blijven. Wie complete bestanden en context aanlevert, schuift sneller door naar het productieslot.",
  },
  {
    title: "Nabewerking",
    description:
      "Schuren, montage of verpakking vragen extra kalendertijd. Geef aan of ruwe prints volstaan, dan kunnen we de planning daarop afstemmen.",
  },
  {
    title: "Logistiek",
    description:
      "Afhalen in Herzele kan zodra alles is afgekoeld. Bpost en persoonlijke leveringen plannen we flexibel: we zoeken samen de snelste optie die binnen budget past.",
  },
]

const rushTips = [
  "Stuur meerdere varianten in één batch zodat we machine-uren efficiënt clusteren.",
  "Kies standaard PLA Matte of PETG kleuren die op voorraad zijn om wachttijd over materiaalleveringen te vermijden.",
  "Laat ons weten welke stukken essentieel zijn. We kunnen kritieke onderdelen prioriteit geven en rest later nasturen.",
]

const lastUpdatedLabel = "Laatst bijgewerkt: 8 februari 2026"

const references = [
  { label: "PrusaSlicer: G-code viewer (print time estimate)", href: "https://help.prusa3d.com/article/g-code-viewer_78984" },
  { label: "Ultimaker: Design for FFF 3D printing", href: "https://ultimaker.com/learn/design-for-fff-3d-printing/" },
  { label: "Prusa: Materials overview", href: "https://help.prusa3d.com/filament-material-guide" },
]


const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "Hoe lang duurt 3D printen?",
  description:
    "Praktische gids over de doorlooptijd van 3D prints met aandacht voor machine-uren, nabewerking en logistiek.",
  datePublished,
  dateModified,
  image: "/images/portfolio/20241030_080710-1.jpg",
})

export default function LeadTimeArticle() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(150%_85%_at_50%_-15%,rgba(99,102,241,0.2),transparent_70%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.07]" />

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
                <li className="font-medium text-slate-700">Hoe lang duurt 3D printen?</li>
              </ol>
            </nav>
            <h1 className="mt-6 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Hoe lang duurt 3D printen?
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Doorlooptijden lopen uiteen van express (ruwe prints binnen 24 uur) tot enkele weken (grote batches met finishing). Hieronder lees je welke factoren meespelen en hoe jij je project sneller in de queue krijgt.
            </p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="stacked-actions mt-6 flex flex-wrap gap-3 justify-center sm:justify-start">
              <ShimmerButton href={pricingHref}>Bekijk richtprijzen & timing</ShimmerButton>
              <Link
                href={contactHref}
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Plan levering
              </Link>
              <Link
                href={toolHref}
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-100/70 bg-emerald-50/80 px-5 py-3 text-sm font-semibold text-emerald-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
              >
                Kies materiaaladvies
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section id="leadtime-factors" className="scroll-mt-28 px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          {factors.map((factor) => (
            <Reveal key={factor.title}>
              <GlassCard className="h-full border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur">
                <h2 className="text-xl font-semibold text-slate-900">{factor.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{factor.description}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section id="leadtime-overview" className="scroll-mt-28 px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="overflow-x-auto border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Overzichtstabel: wat schuift je timing?</h2>
              <table className="mt-5 min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
                <thead>
                  <tr className="text-xs uppercase tracking-wide text-slate-500">
                    <th className="py-2 pr-4">Factor</th>
                    <th className="py-2 pr-4">Impact op doorlooptijd</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {factors.map((factor) => (
                    <tr key={factor.title}>
                      <td className="py-3 pr-4 font-medium text-slate-900">{factor.title}</td>
                      <td className="py-3 pr-4">{factor.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section id="leadtime-planning" className="scroll-mt-28 px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Ruwe planning (indicatief)</h2>
              <p className="mt-3 text-sm text-slate-600">
                Bestandscontrole gebeurt meestal dezelfde werkdag. Daarna wordt het project ingepland. Kleinere prints zijn vaak binnen enkele dagen klaar;
                grote batches of speciale materialen vragen meer marge. We overlopen samen je deadline en reserveren machine-uren in functie van complexiteit.
              </p>
              <p className="mt-3 text-xs text-slate-500">
                Tip: stuur STL/STEP + context in één keer door, dan hoeven we geen extra feedbackronde te plannen en kan het project sneller naar productie.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section id="leadtime-rush" className="scroll-mt-28 px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-xl font-semibold text-slate-900">Sneller leveren? Doe dit.</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {rushTips.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section id="leadtime-faq" className="scroll-mt-28 px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-xl font-semibold text-slate-900">Veelgestelde vragen</h2>
              <div className="mt-4 space-y-4 text-sm text-slate-600">
                {faq.items.map((item) => (
                  <div key={item.q}>
                    <h3 className="text-base font-semibold text-slate-900">{item.q}</h3>
                    <p className="mt-1">{item.a}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section id="leadtime-sources" className="scroll-mt-28 px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 id="sources" className="text-xl font-semibold text-slate-900">Bronnen en referenties</h2>
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
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section className="px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <GlassCard className="flex flex-col gap-6 border border-white/40 bg-white/85 p-6 shadow-xl backdrop-blur sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Volgende stap</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Inplannen of rushen?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Deel je deadline en we blokkeren meteen machine-uren of rush-slot. Je krijgt een duidelijk plan en prijs.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href={contactHref}>Plan mijn project</ShimmerButton>
                <Link href={pricingHref} className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                  Bekijk doorlooptijden
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <BlogFaq title={faq.title} items={faq.items} />


      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <BlogAuthorNote locale="nl" />

      <BlogReadMore />

    </main>
  )
}






