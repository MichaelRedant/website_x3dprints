import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"

const canonical = "https://www.x3dprints.be/blog/use-cases-tpu"
const publishedDate = "2025-10-03T08:00:00+02:00"

export const metadata: Metadata = {
  title: "TPU Use Cases: hoe klanten flexibele prints inzetten | X3DPrints",
  description:
    "Praktijkvoorbeelden van TPU 3D prints: bumpers, grips, sleeves en dempers voor retail, IoT en tooling. Leer hoe we ontwerpen, plannen en nabewerken.",
  alternates: { canonical },
  openGraph: {
    title: "Hoe klanten TPU 3D prints inzetten",
    description:
      "Casestudies voor flexibele TPU onderdelen: beschermhoezen, zachte grips en dempers. Ontdek instellingen, planning en integraties.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    authors: ["https://www.x3dprints.be"],
    tags: ["TPU 3D printen", "Use cases", "Filament Vrijdag"],
    images: [
      {
        url: "/images/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "TPU use cases door X3DPrints",
      },
    ],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Use cases: hoe klanten TPU in de praktijk inzetten",
    description:
      "Concrete TPU projecten: van sensorhoezen tot retailgrips. Zie hoe we flexibele prints ontwerpen, testen en leveren.",
    images: ["/images/og-home.jpg"],
  },
}

const heroStats = [
  { label: "Sectoren live", value: "5+", detail: "Retail, IoT, tooling, marketing & onderwijs" },
  { label: "Gem. lead time", value: "5-7 dagen", detail: "Incl. ontwerp review en drogen" },
  { label: "Retourredutie", value: "-32%", detail: "Minder schade door TPU bumpers" },
]

const caseStudies = [
  {
    title: "Sensorhoezen voor een IoT scale-up",
    sector: "Industrieel IoT",
    challenge:
      "PC-ABS covers braken tijdens installatie in HVAC-units. De klant zocht een flexibele sleeve die kabels beschermt en toch herkenbaar blijft.",
    approach: [
      "TPU 95A gekozen met matte afwerking zodat logo-debossing leesbaar blijft.",
      "Variabele wanddiktes: 2.2 mm rondom connector, 1.4 mm op de body voor flex.",
      "Inserts voor kabelties meeverprint, waardoor assemblage 40% sneller verloopt.",
    ],
    link: { label: "Bekijk TPU materiaalfiche", href: "/materials/tpu" },
  },
  {
    title: "Soft-touch grips voor field service tools",
    sector: "Machine-onderhoud",
    challenge:
      "Metaalgrips gaven geen houvast en veroorzaakten krassen op afwerklagen. TPU moest slipvast zijn en bestand tegen olie.",
    approach: [
      "TPU Soft (92A) met ribbels die elke 8 mm herhalen voor consistente compressie.",
      "Open uiteinde zodat grip over bestaande handvatten geschoven kan worden, vastgezet met twee klik tabs.",
      "Accelerated aging test (48u bij 60 °C) om olie absorptie te controleren.",
    ],
    link: { label: "Vraag TPU prototype aan", href: "/contact?material=TPU" },
  },
  {
    title: "Retail props met TPU dempers",
    sector: "Retail & events",
    challenge:
      "Fragiele displays vielen tijdens transport. Gezocht: dempers die harde PLA shells beschermen zonder het design te verstoren.",
    approach: [
      "Hybride print: PLA Matte cover + TPU demper insert die klikvast vergrendelt.",
      "Dempers enkel op impactzones geplaatst om materiaal te besparen.",
      "AMS-batchplanning zodat alle TPU onderdelen in één run gedroogd en geprint worden.",
    ],
    link: { label: "Bekijk marketing segment", href: "/segments/3d-printing-marketing" },
  },
]

const playbooks = [
  {
    sector: "Electronics & IoT",
    summary:
      "Sleeves, strain reliefs en kabeldoorvoeren die bestand zijn tegen montage in krappe kasten.",
    bulletPoints: [
      "Gebruik 95A voor houder + 90A inserts als compressie belangrijk is.",
      "Integreer serie/QR-codes in de print om serviceflow te versnellen.",
      "Test passing op de echte connector: print dummy shells in PLA voor repetitieve fit checks.",
    ],
  },
  {
    sector: "Tooling & productie",
    summary: "Grips, bumpers en nest inserts die impact absorberen rond stalen tools.",
    bulletPoints: [
      "Layerhoogte 0.2 mm voor gripdelen, 0.16 mm voor zichtwerk met labels.",
      "Voeg sleuven toe voor zip-ties of bouten zodat TPU vervangbaar blijft.",
      "Coat contactvlakken licht met IPA zodat montage vlotter gebeurt.",
    ],
  },
  {
    sector: "Retail & marketing",
    summary: "Pop-up props, draagbare displays en give-aways met soft-touch feeling.",
    bulletPoints: [
      "Combineer TPU voor dragers met PLA/PETG covers voor branding.",
      "Integreer magneten of NFC-tags tijdens de print met pauzes (M601).",
      "Gebruik Translucent TPU + leds om impact te visualiseren tijdens demo’s.",
    ],
  },
]

const resourceLinks = [
  { label: "TPU materiaalfiche", href: "/materials/tpu", description: "Voorraad, kleuren en FAQ over flexibele prints." },
  {
    label: "Material Suggestion Tool",
    href: "/materials#material-suggestion-tool",
    description: "Wizard die PLA, PETG en TPU vergelijkt op basis van jouw context.",
  },
  { label: "Prijzen & calculator", href: "/pricing", description: "Zie impact van trage prints en extra machine-uren." },
  { label: "Viewer upload", href: "/viewer", description: "Upload STL/STEP, voeg foto’s toe en vraag feedback." },
]

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Use cases: hoe klanten TPU in de praktijk inzetten",
  description:
    "Casestudies en playbooks voor TPU 3D prints. Leer hoe bedrijven sleeves, grips en dempers inzetten en hoe X3DPrints het aanpakt.",
  datePublished: publishedDate,
  dateModified: publishedDate,
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
      url: "https://www.x3dprints.be/og-x3dprints.jpg",
    },
  },
  mainEntityOfPage: canonical,
  url: canonical,
  image: "https://www.x3dprints.be/images/og-home.jpg",
}

function SectionDivider() {
  return (
    <div className="mx-auto my-10 flex w-full max-w-4xl items-center gap-3 text-xs uppercase tracking-[0.3em] text-slate-500">
      <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-indigo-300/0 via-indigo-300/60 to-indigo-300/0" />
      <span>TPU use cases</span>
      <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-indigo-300/0 via-indigo-300/60 to-indigo-300/0" />
    </div>
  )
}

export default function UseCasesTpuPage() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(150%_90%_at_50%_-20%,rgba(79,70,229,0.2),transparent_70%)]"
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
                <li className="font-medium text-slate-700">Filament Vrijdag</li>
                <li aria-hidden>/</li>
                <li className="font-medium text-slate-900">TPU use cases</li>
              </ol>
            </nav>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Filament Vrijdag bonus</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Use cases: hoe klanten TPU in de praktijk inzetten.
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              TPU klinkt abstract tot je ziet wat het oplost. In deze bonus-aflevering bundelen we projecten waar flexibele prints
              schade beperken, ergonomie verbeteren of marketingacties laten opvallen. Je krijgt concrete instellingen, planningstips
              en CTA’s zodat je meteen je eigen use case kan aftoetsen.
            </p>
            <div className="stacked-actions mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
              <ShimmerButton href="/contact?material=TPU">Plan TPU workshop</ShimmerButton>
              <Link
                href="/materials/tpu"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Bekijk TPU fiche
              </Link>
              <Link
                href="/materials#material-suggestion-tool"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Material Suggestion Tool
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-500">
              Gepubliceerd op 3 oktober 2025 – sluit aan op Filament Vrijdag #3 over TPU.
            </p>
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

      <SectionDivider />

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Waarom TPU casework rendeert</h2>
              <p className="mt-3 text-sm text-slate-600">
                Flexibele prints absorberen impact, houden kabels in toom en geven grip op plaatsen waar metaal of PLA tekort schieten.
                Ze komen vooral tot hun recht wanneer een onderdeel vaak aangeraakt wordt of schokken moet opvangen.
              </p>
              <p className="mt-3 text-sm text-slate-600">
                In tegenstelling tot siliconemallen of rubber spuitgieten heb je geen dure tooling nodig. Je past TPU zelfs iteratief aan
                tijdens een campagne of productlancering.
              </p>
              <p className="mt-3 text-sm text-slate-600">
                Combineer TPU gerust met andere filamenten: een PLA of PETG shell voor de looks, een TPU binnenstuk voor functionaliteit.
                Dat is precies hoe we de meeste retail en IoT projecten opbouwen.
              </p>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Checklist voordat je start</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                  <span>Voorzie 0.6-1 mm tolerantie voor onderdelen die in PLA/PETG shells klikken.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                  <span>Noteer waar grip of demping belangrijker is dan esthetiek. Dat bepaalt de shore-hardheid.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                  <span>Lever foto’s van het eindproduct. We positioneren ribbels of relief precies op de impactzones.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                  <span>Plan batches: bundel TPU onderdelen zodat we één droogcyclus en AMS-profiel kunnen gebruiken.</span>
                </li>
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl space-y-6">
          {caseStudies.map((study) => (
            <Reveal key={study.title}>
              <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{study.sector}</p>
                    <h2 className="mt-2 text-2xl font-semibold text-slate-900">{study.title}</h2>
                  </div>
                  <Link
                    href={study.link.href}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                  >
                    {study.link.label}
                    <span aria-hidden>-&gt;</span>
                  </Link>
                </div>
                <p className="mt-3 text-sm text-slate-600">{study.challenge}</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  {study.approach.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">Playbooks per sector</h2>
                  <p className="mt-2 text-sm text-slate-600">
                    Onderstaande playbooks zijn shortcuts. Gebruik ze als template en vul ze aan met jouw eigen toleranties of branding.
                  </p>
                </div>
                <Link
                  href="/viewer"
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-indigo-700"
                >
                  Upload STL/STEP
                </Link>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {playbooks.map((playbook) => (
                  <div key={playbook.sector} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{playbook.sector}</p>
                    <p className="mt-2 text-sm text-slate-600">{playbook.summary}</p>
                    <ul className="mt-3 space-y-2 text-sm text-slate-600">
                      {playbook.bulletPoints.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Van idee tot ingebruikname</h2>
              <ol className="mt-4 space-y-3 text-sm text-slate-600">
                <li>
                  <span className="font-semibold text-slate-900">1. Intake & suggestie</span> – Gebruik de{" "}
                  <Link href="/materials#material-suggestion-tool" className="text-indigo-600 underline underline-offset-4">
                    Material Suggestion Tool
                  </Link>{" "}
                  en voeg extra context toe in het formulier. We checken meteen of TPU de juiste keuze is.
                </li>
                <li>
                  <span className="font-semibold text-slate-900">2. Mini-prototype</span> – We print een beperkte batch (1-3 stuks)
                  zodat je passing en ergonomie kan testen. Feedback volgt binnen 48 uur.
                </li>
                <li>
                  <span className="font-semibold text-slate-900">3. Batch productie</span> – We groeperen jobs per kleur/shore. Droogtijd,
                  print en QA zitten in hetzelfde slot zodat lead time voorspelbaar blijft.
                </li>
                <li>
                  <span className="font-semibold text-slate-900">4. Implementatie & naservice</span> – We delen montage-notes
                  (bijv. ideale spanning voor zip-ties) en houden reserveonderdelen klaar in case je moet opschalen.
                </li>
              </ol>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Interne resources</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
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

      <section className="px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <GlassCard className="flex flex-col gap-6 border border-white/40 bg-white/85 p-6 shadow-xl backdrop-blur sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Volgende stap</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Test je TPU idee zonder risico.</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Deel bestanden, foto’s of zelfs een voice memo. We geven eerlijk advies of TPU de juiste call is en welke blend het
                  best past.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/contact?material=TPU">Start TPU intake</ShimmerButton>
                <Link href="/blog/filament-vrijdag-tpu" className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                  Lees Filament Vrijdag #3
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <BlogReadMore />

    </main>
  )
}





