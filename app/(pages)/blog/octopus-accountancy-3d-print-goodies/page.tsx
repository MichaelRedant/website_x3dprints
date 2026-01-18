import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import GlassCard from "@/components/GlassCard"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import VideoGallery from "@/components/VideoGallery"
import BlogReadMore from "@/components/BlogReadMore"
import { normalizeLocale } from "@/lib/i18n/locales"
import { localizeHref } from "@/lib/i18n/paths"

const NL_CANONICAL = "https://www.x3dprints.be/blog/octopus-accountancy-3d-print-goodies"
const EN_CANONICAL = "https://www.x3dprints.be/en/blog/octopus-accountancy-3d-print-goodies"
const PUBLISHED_DATE = "2025-12-16T08:00:00+01:00"

const OG_IMAGE = {
  url: "/images/og-home.jpg",
  width: 1200,
  height: 630,
  alt: "Octopus x X3DPrints case",
}

type MetaInput = {
  title: string
  description: string
  ogTitle: string
  ogDescription: string
  twitterTitle: string
  twitterDescription: string
  tags: string[]
}

const COPY = {
  nl: {
    meta: {
      title: "Case: Octopus x X3DPrints - 3D-geprinte mascottes, badges en event-goodies",
      description:
        "Hoe X3DPrints voor Octopus (accountancy software) 3D-geprinte mascottes, badges en goodies maakte voor kantoor, beurzen en events. Slimme materiaalkeuzes, snelle iteratie en consistente kwaliteit.",
      ogTitle: "Case: Octopus x X3DPrints - 3D-geprinte mascottes en event-goodies",
      ogDescription:
        "Samenwerking met Octopus: 3D-geprinte mascottes, QR-goodies en badges voor beurzen en kantoor. Snelle iteratie, duidelijke workflow en materialen die passen bij dagelijks gebruik.",
      twitterTitle: "Case: Octopus x X3DPrints - 3D-geprinte mascottes en event-goodies",
      twitterDescription:
        "Mascottes, QR-goodies en badges voor kantoor en events. Zo maakte X3DPrints tastbare Octopus-merch die effectief gebruikt wordt.",
      tags: ["Octopus case", "3D printing marketing", "event goodies", "badges", "mascotte", "SaaS merchandising"],
      jsonLdHeadline: "Case: Octopus x X3DPrints - 3D-geprinte mascottes, badges en event-goodies",
      jsonLdDescription:
        "Hoe X3DPrints voor Octopus mascottes, badges en QR-goodies maakte voor kantoor, beurzen en events. Focus op snelle iteratie, materiaalkeuze en herbruikbare kleine reeksen.",
    },
    hero: {
      kicker: "Case study",
      title: "Octopus x X3DPrints: mascottes, badges en QR-goodies via 3D-print",
      intro:
        "Voor Octopus (accountancy software) maakten we 3D-geprinte items die effectief gebruikt worden: mascottes op kantoor, badges voor events en goodies met QR-codes om snel naar de juiste info te gaan.",
      primaryCta: "Bespreek een gelijkaardige set",
      segmentCta: "3D printing voor marketing & events",
      visitCta: "Bezoek Octopus.be",
    },
    heroStats: [
      { label: "Gebruik", value: "Kantoor + events", note: "Goede merch leeft pas als mensen het echt gebruiken." },
      { label: "Materialen", value: "PLA / PETG / TPU (optioneel)", note: "Afhankelijk van look, slijtage en toepassing." },
      { label: "Productie", value: "Lokale iteratie", note: "Snel bijsturen op basis van feedback en context." },
    ],
    highlightsTitle: "Highlights",
    highlights: [
      "Octopus-mascottes als desk buddy en herkenbaar merkanker op kantoor.",
      "Badges om te dragen tijdens beurzen en events, praktisch en herbruikbaar.",
      "Goodies om weg te geven (en intern te gebruiken) met een QR-code naar relevante pagina's.",
      "Korte feedbackloops: testen, aanpassen, opnieuw printen, zonder weken vertraging.",
    ],
    deliverablesTitle: "Wat we leverden",
    deliverablesIntro:
      "We focusten op tastbare items die je team echt gebruikt: iets dat op kantoor blijft staan, iets dat je draagt op events, en iets dat je kan meegeven als give-away.",
    deliverables: [
      {
        title: "Mascottes (Octopus-figuren)",
        detail:
          "3D-geprinte octopusfiguren als herkenbare desk buddy. Ideaal voor foto's, onboarding en visuele merkconsistentie op kantoor en events.",
      },
      {
        title: "Badges voor beurzen en events",
        detail:
          "Badges om te dragen tijdens events en partnerdagen. Ontwerp afgestemd op comfort, leesbaarheid en snelle productie in kleine reeksen.",
      },
      {
        title: "QR-goodies (give-aways en kantoor)",
        detail:
          "Kleine goodies met QR-code die mensen meteen naar de juiste info leidt (landing, demo, onboarding, contact of campagnepagina). Handig als give-away en intern op kantoor.",
      },
      {
        title: "Kleine reeksen, snelle iteratie",
        detail:
          "Geen massaproductie, wel batches die je kan bijsturen. Ideaal als je iets wil testen voor je grotere aantallen uitrolt.",
      },
    ],
    media: {
      altPrimary: "Octopus x X3DPrints: 3D-geprinte mascottes en items voor kantoor en events",
      altSecondary: "Octopus x X3DPrints: detailfoto van 3D-geprinte goodies en branding-items",
      caption:
        "Deze beelden tonen voorbeelden van de 3D-geprinte items binnen de Octopus-samenwerking. (Kleur en afwerking kunnen per batch verschillen.)",
    },
    timelapse: {
      title: "Timelapse van een Octopus-print",
      intro: "Voor wie graag ziet hoe zo'n mascotte tot leven komt: een korte timelapse van een print.",
      linkLabel: "Open op YouTube ->",
      tip:
        "Tip: voor promo-content werkt een timelapse vaak beter dan een statische foto. Het toont maakbaarheid en vakmanschap in 10 seconden, met een lite embed die snel laadt.",
      videos: [
        {
          id: "EomHXEwzXMY",
          title: "Timelapse: Octopus mascotte print (2025)",
          description: "Versnelde opname van een PLA Matte/Silk Octopus print met AMS kleurwissel.",
        },
        {
          id: "pEVjhj8Esmo",
          title: "Timelapse: eerste Octopus batch",
          description: "Eerdere run met focus op laaghoogte en stringing-controle voor de mascotte.",
        },
      ],
    },
    materials: {
      title: "Materiaalkeuzes",
      intro:
        "We kiezen materiaal op basis van gebruik: zichtwerk (mooie afwerking), dagelijks gebruik (taaiheid) en comfort (flex).",
      note: "Dit is geen one-filament-fits-all verhaal. Helaas.",
      choices: [
        {
          item: "Mascottes",
          material: "PLA (meestal Matte, soms met accent)",
          reason:
            "Nette details en mooie afwerking. Ideaal voor zichtwerk, foto's en items die vooral in the spotlight staan.",
        },
        {
          item: "Badges",
          material: "PETG (waar extra taaiheid nodig is)",
          reason:
            "PETG is taaier dan PLA en beter bestand tegen dagelijks gebruik. Handig wanneer badges veel meegaan, vastgeklikt worden of tegen een stootje moeten kunnen.",
        },
        {
          item: "Goodies",
          material: "PLA (snel en consistent) of PETG (meer robuust)",
          reason:
            "Voor give-aways is PLA vaak efficient. Als het doel lang gebruik is (bv. op kantoor), is PETG soms de betere keuze.",
        },
        {
          item: "Grip/comfort (optioneel)",
          material: "TPU (flexibel)",
          reason: "Voor antislip, zachte randen of onderdelen die iets moeten geven zonder te breken.",
        },
      ],
      links: {
        materials: "Materialen & kleuren",
        tool: "Material Suggestion Tool",
      },
    },
    workflow: {
      title: "Workflow",
      intro:
        "Dit werkt goed voor SaaS en events omdat je snel kan testen en bijsturen, zonder tooling of lange doorlooptijden.",
      steps: [
        {
          title: "1) Doel en context",
          detail:
            "Waarvoor dient het item? Kantoor, event, give-away, partnerkit? Dat bepaalt afwerking, sterkte en materiaal.",
        },
        {
          title: "2) Modelcheck en printbaarheid",
          detail:
            "We checken details, wanddiktes, overhang en montagepunten. Zeker bij badges en QR-goodies is leesbaarheid cruciaal.",
        },
        {
          title: "3) Testprint en bijsturen",
          detail:
            "Eerst een kleine testbatch om schaal, feel en zichtbaarheid te checken. Daarna pas opschalen.",
        },
        {
          title: "4) Batchproductie",
          detail:
            "Reeksen worden gebundeld per materiaal/kleur waar mogelijk, zodat het consistent blijft en efficient geproduceerd kan worden.",
        },
      ],
    },
    results: {
      title: "Resultaat",
      items: [
        "Meer merkpresence op kantoor: mascottes werken als visuele anchor zonder dat het schreeuwerig wordt.",
        "Badges worden effectief gedragen tijdens events (en verdwijnen niet in een lade na een beurs).",
        "QR-goodies zijn laagdrempelig: een scan en je zit meteen op de juiste info.",
        "Het format leent zich perfect voor SaaS: snel testen, bijsturen en opnieuw inzetten bij volgende events.",
      ],
      qrTitle: "QR-codes: praktisch, niet gimmicky",
      qrBody:
        "Een QR-code is pas nuttig als hij in de praktijk snel werkt: groot genoeg, goed contrast en op een plek die logisch is. Daarom testen we leesbaarheid op een paar verschillende smartphones voor we een batch maken.",
    },
    faq: {
      title: "FAQ",
      items: [
        {
          q: "Kunnen jullie ook kleine reeksen maken (bv. 10-30 stuks)?",
          a: "Ja. Dat is net een van de sterkste voordelen van 3D-printing. Je kan klein starten, feedback verzamelen en daarna opschalen.",
        },
        {
          q: "Wat heb je nodig om badges of goodies te kunnen maken?",
          a: "Idealiter een logo/icoon (SVG/AI/PNG), gewenste tekst en een idee van formaat. Als er een QR-code op moet, ook de bestemming (URL) en de gewenste grootte/leesbaarheid.",
        },
        {
          q: "Welke materialen zijn het meest geschikt voor events?",
          a: "Voor zichtwerk en give-aways is PLA vaak perfect. Voor items die veel gebruikt worden of steviger moeten zijn, is PETG een goede keuze. We adviseren per toepassing.",
        },
      ],
    },
    cta: {
      kicker: "Ook zoiets nodig?",
      title: "Merch of event-kits die mensen echt gebruiken",
      body:
        "Stuur je logo/asset, idee en aantallen door. Ik geef eerlijk advies over materiaal, afwerking en wat haalbaar is binnen je timing.",
      primary: "Contacteer me",
      secondary: "Bekijk marketing & events segment",
    },
  },
  en: {
    meta: {
      title: "Case: Octopus x X3DPrints - 3D-printed mascots, badges and event goodies",
      description:
        "How X3DPrints produced 3D-printed mascots, badges and goodies for Octopus (accountancy software) across office, trade shows and events. Smart material choices, fast iteration and consistent quality.",
      ogTitle: "Case: Octopus x X3DPrints - 3D-printed mascots and event goodies",
      ogDescription:
        "Collaboration with Octopus: 3D-printed mascots, QR goodies and badges for office and events. Fast iteration, clear workflow and materials that hold up to daily use.",
      twitterTitle: "Case: Octopus x X3DPrints - 3D-printed mascots and event goodies",
      twitterDescription:
        "Mascots, QR goodies and badges for office and events. X3DPrints made Octopus merch people actually use.",
      tags: ["Octopus case", "3D printing marketing", "event goodies", "badges", "mascot", "SaaS merchandising"],
      jsonLdHeadline: "Case: Octopus x X3DPrints - 3D-printed mascots, badges and event goodies",
      jsonLdDescription:
        "How X3DPrints produced mascots, badges and QR goodies for office, trade shows and events, with a focus on fast iteration, material choice and reusable small batches.",
    },
    hero: {
      kicker: "Case study",
      title: "Octopus x X3DPrints: mascots, badges and QR goodies via 3D printing",
      intro:
        "For Octopus (accountancy software) we produced 3D-printed items that get real use: office mascots, event badges and QR-code goodies that send people to the right info fast.",
      primaryCta: "Discuss a similar set",
      segmentCta: "3D printing for marketing & events",
      visitCta: "Visit Octopus.be",
    },
    heroStats: [
      { label: "Use", value: "Office + events", note: "Merch only works when people actually use it." },
      { label: "Materials", value: "PLA / PETG / TPU (optional)", note: "Depends on look, wear and use case." },
      { label: "Production", value: "Local iteration", note: "Fast feedback loops based on context." },
    ],
    highlightsTitle: "Highlights",
    highlights: [
      "Octopus mascots as desk buddies and a recognizable brand anchor in the office.",
      "Badges to wear at trade shows and events: practical and reusable.",
      "Goodies to hand out (and use internally) with a QR code to relevant pages.",
      "Short feedback loops: test, adjust, reprint - without weeks of delay.",
    ],
    deliverablesTitle: "What we delivered",
    deliverablesIntro:
      "We focused on tangible items your team actually uses: something that stays on the desk, something you wear at events, and something you can hand out as a giveaway.",
    deliverables: [
      {
        title: "Mascots (Octopus figures)",
        detail:
          "3D-printed Octopus figures as recognizable desk buddies. Great for photos, onboarding and visual brand consistency in the office and at events.",
      },
      {
        title: "Badges for trade shows and events",
        detail: "Wearable badges tuned for comfort, legibility and fast small-batch production.",
      },
      {
        title: "QR goodies (giveaways + office)",
        detail:
          "Small goodies with a QR code that takes people straight to the right info (landing page, demo, onboarding, contact or campaign). Handy as a giveaway and for internal use.",
      },
      {
        title: "Small batches, fast iteration",
        detail: "Not mass production, but batches you can tweak. Ideal for testing before you roll out larger quantities.",
      },
    ],
    media: {
      altPrimary: "Octopus x X3DPrints: 3D-printed mascots and items for office and events",
      altSecondary: "Octopus x X3DPrints: detail shot of 3D-printed goodies and branding items",
      caption:
        "These images show examples of the 3D-printed items in the Octopus collaboration. (Color and finish can vary by batch.)",
    },
    timelapse: {
      title: "Timelapse of an Octopus print",
      intro: "If you like seeing a mascot come to life: a short timelapse of a print.",
      linkLabel: "Open on YouTube ->",
      tip:
        "Tip: for promo content, a timelapse often beats a static photo. It shows manufacturability and craftsmanship in 10 seconds, with a light embed that loads fast.",
      videos: [
        {
          id: "EomHXEwzXMY",
          title: "Timelapse: Octopus mascot print (2025)",
          description: "Accelerated footage of a PLA Matte/Silk Octopus print with AMS color changes.",
        },
        {
          id: "pEVjhj8Esmo",
          title: "Timelapse: first Octopus batch",
          description: "Earlier run focusing on layer height and stringing control for the mascot.",
        },
      ],
    },
    materials: {
      title: "Material choices",
      intro:
        "We choose material based on use: display pieces (finish), daily handling (toughness) and comfort (flex).",
      note: "There is no one-filament-fits-all story. Sorry.",
      choices: [
        {
          item: "Mascots",
          material: "PLA (mostly Matte, sometimes accent colors)",
          reason:
            "Clean details and a polished finish. Ideal for display pieces, photos and items in the spotlight.",
        },
        {
          item: "Badges",
          material: "PETG (when extra toughness is needed)",
          reason:
            "PETG is tougher than PLA and handles daily use better. Useful when badges clip on and take a hit.",
        },
        {
          item: "Goodies",
          material: "PLA (fast and consistent) or PETG (more robust)",
          reason:
            "PLA is efficient for giveaways. If the goal is long-term use (e.g., in the office), PETG is often better.",
        },
        {
          item: "Grip/comfort (optional)",
          material: "TPU (flexible)",
          reason: "For anti-slip, soft edges or parts that need to flex without cracking.",
        },
      ],
      links: {
        materials: "Materials & colors",
        tool: "Material Suggestion Tool",
      },
    },
    workflow: {
      title: "Workflow",
      intro:
        "This works well for SaaS and events because you can test and adjust fast, without tooling or long lead times.",
      steps: [
        {
          title: "1) Goal and context",
          detail:
            "What is the item for? Office, event, giveaway, partner kit? That drives finish, durability and material.",
        },
        {
          title: "2) Model check and printability",
          detail:
            "We check details, wall thickness, overhangs and mounting points. Legibility matters for badges and QR goodies.",
        },
        {
          title: "3) Test print and iterate",
          detail: "A small test batch to validate scale, feel and visibility. Then we scale.",
        },
        {
          title: "4) Batch production",
          detail:
            "Where possible, batches are grouped by material/color so output stays consistent and efficient.",
        },
      ],
    },
    results: {
      title: "Results",
      items: [
        "More brand presence in the office: mascots act as a visual anchor without being loud.",
        "Badges are actually worn at events (not left in a drawer after one show).",
        "QR goodies are low friction: one scan and you are at the right info.",
        "The format is perfect for SaaS: test fast, iterate and reuse at future events.",
      ],
      qrTitle: "QR codes: practical, not gimmicky",
      qrBody:
        "A QR code is only useful if it scans fast in real life: large enough, high contrast and placed where it makes sense. We test readability on a few different phones before running a batch.",
    },
    faq: {
      title: "FAQ",
      items: [
        {
          q: "Can you produce small batches (e.g., 10-30 units)?",
          a: "Yes. That is one of the biggest advantages of 3D printing. You can start small, collect feedback and scale later.",
        },
        {
          q: "What do you need to make badges or goodies?",
          a: "Ideally a logo/icon (SVG/AI/PNG), the text you want and a target size. If a QR code is required, we also need the destination URL and the desired size/readability.",
        },
        {
          q: "Which materials are best for events?",
          a: "For display pieces and giveaways, PLA is often perfect. For items that see heavy use or need more toughness, PETG is a good pick. We advise per use case.",
        },
      ],
    },
    cta: {
      kicker: "Need something similar?",
      title: "Merch or event kits people actually use",
      body:
        "Send your logo/asset, idea and quantities. I will give honest advice on material, finish and what is realistic within your timeline.",
      primary: "Contact me",
      secondary: "See marketing & events segment",
    },
  },
}

function buildMetadata(meta: MetaInput, canonical: string, locale: "nl_BE" | "en_BE"): Metadata {
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical,
      languages: {
        "nl-BE": NL_CANONICAL,
        en: EN_CANONICAL,
      },
    },
    openGraph: {
      title: meta.ogTitle,
      description: meta.ogDescription,
      url: canonical,
      type: "article",
      publishedTime: PUBLISHED_DATE,
      authors: ["https://www.x3dprints.be"],
      tags: meta.tags,
      images: [OG_IMAGE],
      locale,
      siteName: "X3DPrints",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.twitterTitle,
      description: meta.twitterDescription,
      images: [OG_IMAGE.url],
    },
  }
}

export const metadata: Metadata = buildMetadata(COPY.nl.meta, NL_CANONICAL, "nl_BE")
export const EN_METADATA: Metadata = buildMetadata(COPY.en.meta, EN_CANONICAL, "en_BE")

type PageProps = { searchParams?: Promise<{ lang?: string } | undefined>; locale?: string }

export default function OctopusCasePage({ locale }: PageProps) {
  const normalizedLocale = normalizeLocale(locale)
  const isEn = normalizedLocale === "en"
  const copy = isEn ? COPY.en : COPY.nl
  const localize = (href: string) => localizeHref(href, normalizedLocale)
  const canonical = isEn ? EN_CANONICAL : NL_CANONICAL

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",

    inLanguage: ["nl-BE", "en-BE"],
    headline: copy.meta.jsonLdHeadline,
    description: copy.meta.jsonLdDescription,
    author: { "@type": "Organization", name: "X3DPrints" },
    publisher: {
      "@type": "Organization",
      name: "X3DPrints",
      logo: { "@type": "ImageObject", url: "https://www.x3dprints.be/images/brand-logo.png" },
    },
    mainEntityOfPage: canonical,
    datePublished: PUBLISHED_DATE,
    dateModified: PUBLISHED_DATE,
    image: ["https://www.x3dprints.be/images/og-home.jpg"],
  }

  return (
    <article className="relative overflow-hidden px-4 pb-24 pt-12 sm:px-6 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-indigo-50" />
        <div className="absolute -left-12 top-[-12%] h-[22rem] w-[22rem] rounded-full bg-sky-200/50 blur-[140px]" />
        <div className="absolute -right-16 bottom-[-18%] h-[26rem] w-[26rem] rounded-full bg-indigo-200/40 blur-[160px]" />
      </div>

      {/* HEADER */}
      <header className="mx-auto max-w-5xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">{copy.hero.kicker}</p>
        <h1 className="mt-3 text-balance text-4xl font-extrabold text-slate-900 sm:text-5xl">{copy.hero.title}</h1>
        <p className="mt-4 text-lg text-slate-600">{copy.hero.intro}</p>

        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <ShimmerButton href={localize("/contact?topic=octopus-case")}>{copy.hero.primaryCta}</ShimmerButton>
          <Link
            href={localize("/segments/3d-printing-marketing")}
            className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
          >
            {copy.hero.segmentCta}
          </Link>
          <a
            href="https://www.octopus.be"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-500"
          >
            {copy.hero.visitCta}
          </a>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {copy.heroStats.map((item) => (
            <GlassCard
              key={item.label}
              className="border border-white/40 bg-white/85 px-4 py-3 text-left shadow-sm backdrop-blur"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{item.label}</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">{item.value}</p>
              <p className="mt-1 text-xs text-slate-600">{item.note}</p>
            </GlassCard>
          ))}
        </div>
      </header>

      {/* HIGHLIGHTS */}
      <section className="mx-auto mt-12 max-w-5xl">
        <Reveal>
          <GlassCard className="border border-white/50 bg-white/85 p-6 shadow-lg backdrop-blur">
            <h2 className="text-2xl font-semibold text-slate-900">{copy.highlightsTitle}</h2>
            <ul className="mt-4 grid gap-3 md:grid-cols-2">
              {copy.highlights.map((item) => (
                <li key={item} className="rounded-2xl border border-slate-100 bg-white/80 p-3 text-sm text-slate-700">
                  <span className="font-semibold text-slate-900">*</span> {item}
                </li>
              ))}
            </ul>
          </GlassCard>
        </Reveal>
      </section>

      {/* MEDIA + DELIVERABLES */}
      <section className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <Reveal>
          <GlassCard className="h-full border border-white/50 bg-white/85 p-6 shadow-lg backdrop-blur">
            <h2 className="text-2xl font-semibold text-slate-900">{copy.deliverablesTitle}</h2>
            <p className="mt-2 text-sm text-slate-600">{copy.deliverablesIntro}</p>
            <ul className="mt-4 space-y-3">
              {copy.deliverables.map((item) => (
                <li key={item.title} className="rounded-2xl border border-slate-100 bg-white/80 p-3">
                  <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{item.detail}</p>
                </li>
              ))}
            </ul>
          </GlassCard>
        </Reveal>

        <Reveal delay={0.1}>
          <GlassCard className="h-full border border-white/50 bg-white/85 p-4 shadow-lg backdrop-blur">
            <div className="grid gap-3">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/30 bg-slate-100">
                <Image
                  src="/images/portfolio/Octopus0925-19.webp"
                  alt={copy.media.altPrimary}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 420px"
                  priority
                />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/30 bg-slate-100">
                <Image
                  src="/images/portfolio/Octopus25-50.webp"
                  alt={copy.media.altSecondary}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 420px"
                />
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-500">{copy.media.caption}</p>
          </GlassCard>
        </Reveal>
      </section>

      {/* TIMELAPSE */}
      <section className="mx-auto mt-12 max-w-5xl">
        <Reveal>
          <GlassCard className="border border-white/50 bg-white/85 p-6 shadow-lg backdrop-blur">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">{copy.timelapse.title}</h2>
                <p className="mt-1 text-sm text-slate-600">{copy.timelapse.intro}</p>
              </div>
              <Link
                href="https://youtu.be/EomHXEwzXMY"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-500"
              >
                {copy.timelapse.linkLabel}
              </Link>
            </div>

            <div className="mt-4">
              <VideoGallery videos={copy.timelapse.videos} highlightIds={["EomHXEwzXMY"]} />
            </div>

            <p className="mt-3 text-xs text-slate-500">{copy.timelapse.tip}</p>
          </GlassCard>
        </Reveal>
      </section>

      {/* MATERIALS */}
      <section className="mx-auto mt-12 max-w-5xl">
        <Reveal>
          <GlassCard className="border border-white/50 bg-white/85 p-6 shadow-lg backdrop-blur">
            <h2 className="text-2xl font-semibold text-slate-900">{copy.materials.title}</h2>
            <p className="mt-2 text-sm text-slate-600">
              {copy.materials.intro} {copy.materials.note}
            </p>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {copy.materials.choices.map((choice) => (
                <div key={choice.item} className="rounded-2xl border border-slate-100 bg-white/80 p-3">
                  <p className="text-sm font-semibold text-slate-900">{choice.item}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    {choice.material}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">{choice.reason}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <Link href={localize("/materials")} className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-500">
                {copy.materials.links.materials}
              </Link>
              <Link
                href={localize("/materials#material-suggestion-tool")}
                className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
              >
                {copy.materials.links.tool}
              </Link>
            </div>
          </GlassCard>
        </Reveal>
      </section>

      {/* WORKFLOW + RESULTS */}
      <section className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-2">
        <Reveal>
          <GlassCard className="h-full border border-white/50 bg-white/85 p-6 shadow-lg backdrop-blur">
            <h2 className="text-2xl font-semibold text-slate-900">{copy.workflow.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{copy.workflow.intro}</p>
            <ul className="mt-4 space-y-3">
              {copy.workflow.steps.map((step) => (
                <li key={step.title} className="rounded-2xl border border-slate-100 bg-white/80 p-3">
                  <p className="text-sm font-semibold text-slate-900">{step.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{step.detail}</p>
                </li>
              ))}
            </ul>
          </GlassCard>
        </Reveal>

        <Reveal delay={0.1}>
          <GlassCard className="h-full border border-white/50 bg-white/85 p-6 shadow-lg backdrop-blur">
            <h2 className="text-2xl font-semibold text-slate-900">{copy.results.title}</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
              {copy.results.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className="mt-4 rounded-2xl border border-indigo-100 bg-indigo-50/70 p-4 text-sm text-slate-700">
              <p className="font-semibold text-indigo-900">{copy.results.qrTitle}</p>
              <p className="mt-1">{copy.results.qrBody}</p>
            </div>
          </GlassCard>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="mx-auto mt-12 max-w-5xl">
        <Reveal>
          <GlassCard className="border border-white/50 bg-white/85 p-6 shadow-lg backdrop-blur">
            <h2 className="text-2xl font-semibold text-slate-900">{copy.faq.title}</h2>
            <div className="mt-4 space-y-3">
              {copy.faq.items.map((item) => (
                <div key={item.q} className="rounded-2xl border border-slate-100 bg-white/80 p-3">
                  <p className="text-sm font-semibold text-slate-900">{item.q}</p>
                  <p className="mt-1 text-sm text-slate-600">{item.a}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="mx-auto mt-14 max-w-5xl">
        <Reveal>
          <GlassCard className="flex flex-col gap-6 border border-white/50 bg-white/85 p-6 shadow-xl backdrop-blur sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">{copy.cta.kicker}</p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-900">{copy.cta.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{copy.cta.body}</p>
            </div>
            <div className="flex flex-col gap-3 sm:items-end">
              <ShimmerButton href={localize("/contact?topic=octopus-case")}>{copy.cta.primary}</ShimmerButton>
              <Link
                href={localize("/segments/3d-printing-marketing")}
                className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
              >
                {copy.cta.secondary}
              </Link>
            </div>
          </GlassCard>
        </Reveal>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <BlogReadMore />
    </article>
  )
}
