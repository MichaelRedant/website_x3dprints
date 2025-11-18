import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"

const canonical = "https://www.x3dprints.be/blog/hoe-lang-duurt-3d-printen"

export const metadata: Metadata = {
  title: "Hoe lang duurt 3D printen? | X3DPrints Blog",
  description:
    "Welke factoren bepalen de doorlooptijd van 3D prints? We delen richtwaarden, planningsaanpak en tips om je project sneller op te starten.",
  alternates: { canonical },
  openGraph: {
    title: "Hoe lang duurt 3D printen?",
    description:
      "Ontdek hoe materiaal, afwerking en logistiek de levertijd beïnvloeden. Inclusief scenario’s en tips om projecten te versnellen.",
    url: canonical,
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "Hoe lang duurt 3D printen" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hoe lang duurt 3D printen?",
    description: "Planning guide voor 3D prints: machine-uren, nabewerking en logistiek stap voor stap uitgelegd.",
    images: ["/images/og-home.jpg"],
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

const faq = [
  {
    q: "Kunnen jullie binnen 24 uur leveren?",
    a: "Ja, voor kleine onderdelen in standaard PLA. We plannen een rush-slot en je haalt af in Herzele of we rijden uit tegen meerprijs.",
  },
  {
    q: "Wat vertraagt een project het meest?",
    a: "Gebrek aan info (geen tolerantie/afwerking), speciale materialen die besteld moeten worden, of uitgebreide finishing (primer, lak).",
  },
  {
    q: "Kan ik de printtijd zelf inschatten?",
    a: "Gebruik de Small/Medium/Large richtprijzen op de pricing pagina. Voor exacte tijd hebben we je STL nodig om slicer-data te genereren.",
  },
]

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Hoe lang duurt 3D printen?",
  description:
    "Praktische gids over de doorlooptijd van 3D prints met aandacht voor machine-uren, nabewerking en logistiek.",
  author: {
    "@type": "Organization",
    name: "X3DPrints",
    url: "https://www.x3dprints.be",
  },
  publisher: {
    "@type": "Organization",
    name: "X3DPrints",
    url: "https://www.x3dprints.be",
    logo: {
      "@type": "ImageObject",
      url: "https://www.x3dprints.be/Logo.webp",
    },
  },
  mainEntityOfPage: canonical,
  url: canonical,
}

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
                    className="font-medium text-indigo-600 transition hover:text-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
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
            <div className="stacked-actions mt-6 flex flex-wrap gap-3 justify-center sm:justify-start">
              <ShimmerButton href="/pricing">Bekijk richtprijzen & timing</ShimmerButton>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Plan levering
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
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

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
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

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
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

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-xl font-semibold text-slate-900">Veelgestelde vragen</h2>
              <div className="mt-4 space-y-4 text-sm text-slate-600">
                {faq.map((item) => (
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
                <ShimmerButton href="/contact">Plan mijn project</ShimmerButton>
                <Link href="/pricing" className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                  Bekijk doorlooptijden
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
    </main>
  )
}
