import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import Parallax from "@/components/Parallax"
import TiltCard from "@/components/TiltCard"
import Counter from "@/components/Counter"
import GlassOrb from "@/components/GlassOrb"
import GlassCard from "@/components/GlassCard"
import FaqPromo from "@/components/FaqPromo"
import ContentTableOfContents from "@/components/ContentTableOfContents"
import { normalizeLocale } from "@/lib/i18n/locales"
import { localizeHref } from "@/lib/i18n/paths"

const NL_METADATA: Metadata = {
  title: "Over X3DPrints | 3D-printstudio in Herzele",
  description:
    "Maak kennis met X3DPrints: compacte 3D-printstudio in Herzele voor prototypes en zowel kleine als grotere series. Rechtstreeks contact, eerlijk materiaaladvies en nette afwerking.",
  alternates: {
    canonical: "https://www.x3dprints.be/about/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/about/",
      "en-BE": "https://www.x3dprints.be/en/about/",
      "x-default": "https://www.x3dprints.be/about/",
    },
  },
  openGraph: {
    title: "Over X3DPrints",
    description:
      "Compacte 3D-printstudio in Herzele. PLA als standaard, met PETG, ABS/ASA, Nylon en PA-CF wanneer het project dat vraagt.",
    url: "https://www.x3dprints.be/about",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630 }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: { card: "summary_large_image" },
}

const EN_METADATA: Metadata = {
  title: "About X3DPrints | 3D print studio in Herzele",
  description:
    "Meet X3DPrints: a compact 3D printing studio in Herzele for prototypes and small to large batches. Direct contact, honest material advice and clean finishing.",
  alternates: {
    canonical: "https://www.x3dprints.be/en/about/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/about",
      "en-BE": "https://www.x3dprints.be/en/about",
      "x-default": "https://www.x3dprints.be/about",
    },
  },
  openGraph: {
    title: "About X3DPrints",
    description:
      "Compact 3D printing studio in Herzele. PLA as standard, with PETG, ABS/ASA, Nylon and PA-CF when the project demands it.",
    url: "https://www.x3dprints.be/en/about",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630 }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: { card: "summary_large_image" },
}

void EN_METADATA

export const metadata: Metadata = NL_METADATA

const ABOUT_COPY_NL = {
  hero: {
    title: "Over X3DPrints",
    introOne:
      "X3DPrints is een eenpersoons 3D-printstudio in bijberoep, gevestigd in Herzele en onderdeel van Xinudesign. Je spreekt rechtstreeks met de maker die ook produceert, test en afwerkt. Geen tickets, wel korte lijnen en onderdelen die gewoon passen.",
    introTwo:
      "Ideaal voor prototypes en zowel kleine als grotere series. PLA is onze standaard voor strak detail, en waar nodig schakelen we over naar PETG, ABS/ASA, Nylon (PA) of PA-CF. We leveren vooral in de regio Gent, Aalst, Geraardsbergen en Oudenaarde.",
    ctas: {
      materials: "Materialen",
      services: "Diensten",
      contact: "Contact",
    },
  },
  stats: {
    buildVolumeLabel: "Bouwvolume",
    buildVolumeNote: "langste zijde (een geheel)",
    leadTimeLabel: "Doorlooptijd",
    leadTimeNote: "afhankelijk van project",
    toleranceLabel: "Tolerantie",
    toleranceNote: "typisch voor FDM",
  },
  usp: [
    { title: "Korte lijnen", description: "Snelle feedback op STL/STEP en duidelijke afspraken." },
    { title: "Consistente kwaliteit", description: "Gekalibreerde FDM-setup en kwaliteitscheck voor levering." },
    { title: "Afwerking op maat", description: "Ruw, geschuurd, geprimed of gelakt; inserts en montage mogelijk." },
  ],
  work: {
    whatTitle: "Wat we doen",
    whatItems: [
      "Prototyping en zowel kleine als grotere series",
      "Winkelmateriaal: displays, houders en POS-oplossingen",
      "Gepersonaliseerde items en cadeaus",
      "Herstel en maatwerkonderdelen",
    ],
    howTitle: "Hoe we werken",
    howItems: [
      "Upload je STL/STEP met toepassing en gewenste afwerking",
      "Eerlijk materiaaladvies en transparante offerte",
      "Productie, kwaliteitscheck en eventuele nabewerking",
      "Verzending in BE of afhalen in regio Herzele/Gent",
    ],
    howNote: "Levertijd meestal enkele werkdagen; spoed in overleg.",
  },
  materials: {
    title: "Materialen & specificaties",
    materialsLabel: "Materialen",
    materialsItems: [
      "PLA (standaard, veel kleuren en varianten)",
      "PETG (sterker, vocht- en chemie-resistenter)",
      "ABS / ASA (hitte- en UV-bestendig)",
      "Nylon (PA) en PA-CF (stijf/sterk; jigs/fixtures)",
      "TPU (flexibel) op aanvraag",
    ],
    specsLabel: "Specs",
    specsItems: [
      "Bouwvolume tot 35 x 32 x 35 cm per stuk",
      "Layerhoogte 0,12-0,28 mm",
      "Afwerking: ruw, geschuurd, geprimed of gelakt; inserts en montage mogelijk",
    ],
    ctas: {
      materials: "Alle materialen",
      pricing: "Prijzen & levering",
    },
  },
  cta: {
    title: "Samen iets moois maken?",
    body:
      "Stuur je model door en ontvang snel een heldere prijs met het beste materiaaladvies voor jouw toepassing.",
    primary: "Offerte aanvragen",
    secondary: "Portfolio",
  },
  faqPromo: {
    title: "Vragen over 3D printen?",
    intro: "Antwoorden over materialen, levertijden, prijzen en onze werkwijze.",
    ctaLabel: "Bekijk de FAQ",
    qaItems: [
      { q: "Welke materialen printen jullie?", a: "Standaard PLA Matte, plus PETG en TPU. Op aanvraag ABS/ASA, Nylon, PA-CF." },
      { q: "Wat is de gebruikelijke doorlooptijd?", a: "Doorgaans enkele werkdagen, afhankelijk van complexiteit en oplage." },
      { q: "Hoe vraag ik een offerte aan?", a: "Bezorg je STL/STEP en korte context via het formulier. Je krijgt snel prijs en timing." },
    ],
  },
}

const ABOUT_COPY_EN = {
  hero: {
    title: "About X3DPrints",
    introOne:
      "X3DPrints is a one-person 3D printing studio, run part-time in Herzele and part of Xinudesign. You speak directly with the maker who also prints, tests and finishes each part. No ticketing, just direct communication and parts that fit.",
    introTwo:
      "Ideal for prototypes and small to large batches. PLA is our standard for crisp detail; when needed we switch to PETG, ABS/ASA, Nylon (PA) or PA-CF. We mainly serve the Ghent, Aalst, Geraardsbergen and Oudenaarde region.",
    ctas: {
      materials: "Materials",
      services: "Services",
      contact: "Contact",
    },
  },
  stats: {
    buildVolumeLabel: "Build volume",
    buildVolumeNote: "longest side (single piece)",
    leadTimeLabel: "Lead time",
    leadTimeNote: "depends on scope",
    toleranceLabel: "Tolerance",
    toleranceNote: "typical for FDM",
  },
  usp: [
    { title: "Short lines", description: "Fast feedback on STL/STEP and clear agreements." },
    { title: "Consistent quality", description: "Calibrated FDM setup and quality checks before delivery." },
    { title: "Finishing to match", description: "Raw, sanded, primed or painted; inserts and assembly possible." },
  ],
  work: {
    whatTitle: "What we do",
    whatItems: [
      "Prototyping and small to large batches",
      "Retail materials: displays, holders and POS solutions",
      "Personalized items and gifts",
      "Repairs and custom parts",
    ],
    howTitle: "How we work",
    howItems: [
      "Upload your STL/STEP with use case and desired finish",
      "Honest material advice and a transparent quote",
      "Production, quality checks and any post-processing",
      "Shipping in Belgium or pickup around Herzele/Ghent",
    ],
    howNote: "Lead time is usually a few business days; rush by arrangement.",
  },
  materials: {
    title: "Materials and specs",
    materialsLabel: "Materials",
    materialsItems: [
      "PLA (standard, many colors and variants)",
      "PETG (stronger, more moisture and chemical resistant)",
      "ABS / ASA (heat and UV resistant)",
      "Nylon (PA) and PA-CF (stiff/strong; jigs/fixtures)",
      "TPU (flexible) on request",
    ],
    specsLabel: "Specs",
    specsItems: [
      "Build volume up to 35 x 32 x 35 cm per part",
      "Layer height 0.12-0.28 mm",
      "Finishing: raw, sanded, primed or painted; inserts and assembly possible",
    ],
    ctas: {
      materials: "All materials",
      pricing: "Pricing and delivery",
    },
  },
  cta: {
    title: "Ready to make something great?",
    body:
      "Send your model and get a clear price plus the best material advice for your use case.",
    primary: "Request a quote",
    secondary: "Portfolio",
  },
  faqPromo: {
    title: "Questions about 3D printing?",
    intro: "Answers about materials, lead times, pricing and how we work.",
    ctaLabel: "View the FAQ",
    qaItems: [
      { q: "Which materials do you print?", a: "Standard PLA Matte, plus PETG and TPU. ABS/ASA, Nylon, PA-CF on request." },
      { q: "What is the usual lead time?", a: "Typically a few business days, depending on complexity and quantity." },
      { q: "How do I request a quote?", a: "Send your STL/STEP and a short brief via the form. You get pricing and timing quickly." },
    ],
  },
}

const BUILD_VOLUME_CM = 35
const LEAD_TIME_DAYS = 5
const TOLERANCE_MM = 0.2

type PageProps = { searchParams?: Promise<{ lang?: string } | undefined>; locale?: string }

export default function Page({ locale }: PageProps) {
  const normalizedLocale = normalizeLocale(locale)
  const isEn = normalizedLocale === "en"
  const copy = isEn ? ABOUT_COPY_EN : ABOUT_COPY_NL
  const localize = (href: string) => localizeHref(href, normalizedLocale)
  const pageUrl = isEn ? "https://www.x3dprints.be/en/about" : "https://www.x3dprints.be/about"
  const numberLocale = isEn ? "en-GB" : "nl-BE"
  const tocItems = isEn
    ? [
        { id: "about-usp", label: "Why work with X3DPrints?" },
        { id: "about-work", label: "What do we do and how do we work?" },
        { id: "about-materials", label: "Which materials and specs do we support?" },
        { id: "about-faq", label: "FAQ and support" },
        { id: "about-sources", label: "Sources and references" },
      ]
    : [
        { id: "about-usp", label: "Waarom kiezen klanten voor X3DPrints?" },
        { id: "about-work", label: "Wat doen we en hoe werken we?" },
        { id: "about-materials", label: "Welke materialen en specs ondersteunen we?" },
        { id: "about-faq", label: "FAQ en ondersteuning" },
        { id: "about-sources", label: "Bronnen en referenties" },
      ]
  const references = isEn
    ? [
        { label: "ISO/ASTM terminology for additive manufacturing", url: "https://www.astm.org/f2997-13r21.html" },
        { label: "Prusa material guide (PLA, PETG, TPU)", url: "https://help.prusa3d.com/filament-material-guide" },
        { label: "All3DP FDM process explainer", url: "https://all3dp.com/2/fdm-3d-printing-explained/" },
      ]
    : [
        { label: "ISO/ASTM terminologie voor additive manufacturing", url: "https://www.astm.org/f2997-13r21.html" },
        { label: "Prusa materiaalgids (PLA, PETG, TPU)", url: "https://help.prusa3d.com/filament-material-guide" },
        { label: "All3DP uitleg over het FDM-proces", url: "https://all3dp.com/2/fdm-3d-printing-explained/" },
      ]
  const lastUpdatedLabel = isEn ? "Last updated: February 6, 2026" : "Laatst bijgewerkt: 6 februari 2026"

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: copy.hero.title,
    url: pageUrl,
    mainEntityOfPage: pageUrl,
    breadcrumb: isEn ? "Home > About" : "Home > Over",
  }

  return (
    <main className="relative">
      {/* Decorative bg */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(99,102,241,.14),transparent_70%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.06]" />

      {/* HERO / INTRO */}
      <section id="author" className="relative px-6 pt-14 pb-10 sm:px-8 lg:px-12">
        <div className="absolute right-0 top-0 -z-10 hidden sm:block">
          <GlassOrb className="h-64 w-64 opacity-40" />
        </div>
        <div className="mx-auto max-w-6xl">
          <Reveal className="grid items-center gap-8 sm:grid-cols-[1.3fr_.7fr]">
            <div className="max-w-3xl">
              <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">{copy.hero.title}</h1>
              <p className="mt-3 text-slate-600">{copy.hero.introOne}</p>
              <p className="mt-3 text-slate-600">{copy.hero.introTwo}</p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.15em] text-slate-500">{lastUpdatedLabel}</p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={localize("/materials")}
                  className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
                >
                  {copy.hero.ctas.materials}
                </Link>
                <Link
                  href={localize("/services")}
                  className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
                >
                  {copy.hero.ctas.services}
                </Link>
                <Link
                  href={localize("/contact")}
                  className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
                >
                  {copy.hero.ctas.contact}
                </Link>
              </div>
              <ContentTableOfContents
                title={isEn ? "Contents" : "Inhoud"}
                items={tocItems}
                className="mt-6 max-w-2xl"
              />
            </div>

            {/* Parallax hero visual */}
            <Parallax offset={28} className="justify-self-end">
              <Image
                src="/Logo.webp"
                alt="X3DPrints logo"
                width={260}
                height={260}
                className="h-32 w-auto opacity-95 sm:h-40 md:h-48"
                priority
                sizes="(min-width:1024px) 260px, 45vw"
              />
            </Parallax>
          </Reveal>
        </div>
      </section>

      {/* STATS / COUNTERS */}
      <section className="px-6 pb-10 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="grid gap-4 sm:grid-cols-3">
            {/* Bouwvolume */}
            <GlassCard className="p-5 text-center">
              <div className="text-xs uppercase tracking-wide text-slate-500">{copy.stats.buildVolumeLabel}</div>
              <div className="mt-1 text-2xl font-semibold text-slate-900">
                <Counter to={BUILD_VOLUME_CM} suffix=" cm" />
              </div>
              <div className="text-xs text-slate-500">{copy.stats.buildVolumeNote}</div>
            </GlassCard>

            {/* Doorlooptijd */}
            <GlassCard className="p-5 text-center">
              <div className="text-xs uppercase tracking-wide text-slate-500">{copy.stats.leadTimeLabel}</div>
              <div className="mt-1 text-2xl font-semibold text-slate-900">
                <Counter to={LEAD_TIME_DAYS} prefix="~" suffix={isEn ? " business days" : " werkdagen"} />
              </div>
              <div className="text-xs text-slate-500">{copy.stats.leadTimeNote}</div>
            </GlassCard>

            {/* Tolerantie */}
            <GlassCard className="p-5 text-center">
              <div className="text-xs uppercase tracking-wide text-slate-500">{copy.stats.toleranceLabel}</div>
              <div className="mt-1 text-2xl font-semibold text-slate-900">
                <Counter to={TOLERANCE_MM} prefix="+/-" suffix=" mm" decimals={1} locale={numberLocale} />
              </div>
              <div className="text-xs text-slate-500">{copy.stats.toleranceNote}</div>
            </GlassCard>
          </Reveal>
        </div>
      </section>


      {/* USP CARDS met 3D tilt */}
      <section id="about-usp" className="scroll-mt-28 px-6 pb-10 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-6 max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {isEn ? "Why teams choose X3DPrints" : "Waarom teams kiezen voor X3DPrints"}
            </h2>
            <p className="mt-2 text-slate-600">
              {isEn
                ? "Short communication lines, predictable quality and clear finishing options."
                : "Korte communicatielijnen, voorspelbare kwaliteit en duidelijke afwerkingsopties."}
            </p>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {copy.usp.map((u, i) => (
              <Reveal key={u.title} delay={0.05 * (i + 1)}>
                <TiltCard>
                  <GlassCard className="p-6">
                    <h3 className="text-lg font-semibold text-slate-900">{u.title}</h3>
                    <p className="mt-1 text-slate-600">{u.description}</p>
                  </GlassCard>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WAT EN HOE (tilt + reveal) */}
      <section id="about-work" className="scroll-mt-28 px-6 pb-10 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="grid gap-8 sm:grid-cols-2">
            <TiltCard>
              <GlassCard className="p-6">
                <h2 className="text-xl font-semibold tracking-tight text-slate-900">{copy.work.whatTitle}</h2>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-600">
                  {copy.work.whatItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </GlassCard>
            </TiltCard>

            <TiltCard>
              <GlassCard className="p-6">
                <h2 className="text-xl font-semibold tracking-tight text-slate-900">{copy.work.howTitle}</h2>
                <ol className="mt-3 list-decimal space-y-1 pl-5 text-slate-600">
                  {copy.work.howItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
                <p className="mt-3 text-sm text-slate-500">{copy.work.howNote}</p>
              </GlassCard>
            </TiltCard>
          </Reveal>
        </div>
      </section>

      {/* MATERIALEN & SPECIFICS */}
      <section id="about-materials" className="scroll-mt-28 px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-xl font-semibold tracking-tight text-slate-900">{copy.materials.title}</h2>
              <div className="mt-3 grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">{copy.materials.materialsLabel}</h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
                    {copy.materials.materialsItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">{copy.materials.specsLabel}</h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
                    {copy.materials.specsItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href={localize("/materials")}
                  className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
                >
                  {copy.materials.ctas.materials}
                </Link>
                <Link
                  href={localize("/pricing")}
                  className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
                >
                  {copy.materials.ctas.pricing}
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section id="about-faq" className="scroll-mt-28 px-6 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <GlassCard className="overflow-hidden p-8 sm:p-10">
              <div className="grid gap-6 sm:grid-cols-[1.2fr_.8fr] sm:items-center">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{copy.cta.title}</h2>
                  <p className="mt-2 max-w-prose text-slate-600">{copy.cta.body}</p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      href={localize("/contact")}
                      className="rounded-xl border border-white/20 bg-black px-5 py-3 text-sm font-semibold text-white hover:brightness-110"
                    >
                      {copy.cta.primary}
                    </Link>
                    <Link
                      href={localize("/portfolio")}
                      className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
                    >
                      {copy.cta.secondary}
                    </Link>
                  </div>
                </div>
                <Parallax offset={18} className="justify-self-end">
                  <div className="justify-self-end">
                    <GlassOrb className="h-40 w-40 opacity-90" />
                  </div>
                </Parallax>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

       {/* FAQ */}
      <section className="px-6 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <GlassCard className="overflow-hidden p-8 sm:p-10">
              <FaqPromo
                className="mt-10"
                title={copy.faqPromo.title}
                intro={copy.faqPromo.intro}
                ctaLabel={copy.faqPromo.ctaLabel}
                qaItems={copy.faqPromo.qaItems}
                href={localize("/faq")}
              />
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section id="about-sources" className="scroll-mt-28 px-6 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {isEn ? "Sources and references" : "Bronnen en referenties"}
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                {isEn
                  ? "Reference links used for terminology and baseline FDM material behavior."
                  : "Referentielinks die we gebruiken voor terminologie en basisgedrag van FDM-materialen."}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {references.map((reference) => (
                  <li key={reference.url} className="rounded-xl border border-slate-200/70 bg-white/80 px-4 py-3">
                    <cite className="not-italic">
                      <Link href={reference.url} target="_blank" rel="noreferrer" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        {reference.label}
                      </Link>
                    </cite>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  )
}

