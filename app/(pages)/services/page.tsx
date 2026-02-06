// app/(pages)/services/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import {
  Brush,
  Palette,
  Printer,
  Wrench,
  Layers,
  Package,
  Ruler,
  Box,
  Sparkles,
  Puzzle,
} from "lucide-react"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import CtaBlock from "@/components/CtaBlock"
import OrganizerCta from "@/components/OrganizerCta"
import Faq from "@/components/Faq"
import ShimmerButton from "@/components/ShimmerButton"
import ReadMoreLinks from "@/components/ReadMoreLinks"
import { buildLocalBusinessSchema, buildOfferCatalog, buildServiceSchema } from "@/lib/seo"
import { normalizeLocale } from "@/lib/i18n/locales"
import { localizeHref } from "@/lib/i18n/paths"
import { servicesFaqByLocale } from "@/content/services-faq"

const NL_METADATA: Metadata = {
  title: "3D Print Service Herzele | X3DPrints bijberoep",
  description:
    "Lokale FDM 3D-printservice uit Herzele (bijberoep). Prototypes en kleine reeksen in PLA, PETG of TPU met eerlijk advies en korte lijnen.",
  alternates: {
    canonical: "https://www.x3dprints.be/services/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/services/",
      en: "https://www.x3dprints.be/en/services/",
      "x-default": "https://www.x3dprints.be/services/",
    },
  },
  openGraph: {
    title: "3D print service Herzele",
    description:
      "Kleine oplages, snelle opvolging en realistisch advies over materiaal en ontwerp. Bijberoep vanuit Herzele/Gent.",
    url: "https://www.x3dprints.be/services/",
    images: [{ url: "/images/portfolio/20241030_080710-1.jpg", width: 1200, height: 630, alt: "3D print service in Herzele" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D print service Herzele",
    description:
      "Kleine oplages, snelle opvolging en realistisch advies over materiaal en ontwerp. Bijberoep vanuit Herzele/Gent.",
    images: ["/images/portfolio/20241030_080710-1.jpg"],
  },
}

export const EN_METADATA: Metadata = {
  title: "3D Print Service in Belgium | X3DPrints",
  description:
    "Local FDM 3D printing from Herzele (part-time studio). Prototypes and small batches in PLA, PETG or TPU with honest advice and direct communication.",
  alternates: {
    canonical: "https://www.x3dprints.be/en/services/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/services/",
      en: "https://www.x3dprints.be/en/services/",
      "x-default": "https://www.x3dprints.be/services/",
    },
  },
  openGraph: {
    title: "3D print service in Belgium",
    description:
      "Small batches, fast follow-up and pragmatic advice on material and design. Part-time studio in Herzele/Ghent.",
    url: "https://www.x3dprints.be/en/services/",
    images: [{ url: "/images/portfolio/20241030_080710-1.jpg", width: 1200, height: 630, alt: "3D printing service in Belgium" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D print service in Belgium",
    description:
      "Small batches, fast follow-up and pragmatic advice on material and design. Part-time studio in Herzele/Ghent.",
    images: ["/images/portfolio/20241030_080710-1.jpg"],
  },
}

export const metadata: Metadata = NL_METADATA

const SERVICES_COPY_NL = {
  meta: {
    description:
      "Lokale FDM 3D-printservice uit Herzele (bijberoep). Prototypes en kleine reeksen in PLA, PETG of TPU met eerlijk advies en korte lijnen.",
  },
  hero: {
    title: "3D print service uit Herzele (bijberoep)",
    intro:
      "X3DPrints is een eenmansstudio in bijberoep. Je spreekt rechtstreeks met de maker, krijgt eerlijke planning (meestal enkele werkdagen) en materiaaladvies dat past bij jouw project en budget.",
    ctas: {
      quote: "Offerte aanvragen",
      tool: "Material Suggestion Tool",
      blog: "Lees de blog",
    },
  },
  solo: {
    kicker: "Waarom X3DPrints",
    title: "Bijberoep met focus en korte lijnen",
    body:
      "Productie gebeurt vanuit Herzele en elke job wordt persoonlijk ingepland. Geen ticket-systeem, wel rechtstreeks overleg, transparante communicatie en flexibiliteit voor lokale afhalingen.",
    bullets: [
      "Afhalen mogelijk voor Gent/Aalst, verzending voor heel Belgie.",
      "Planning in overleg: typisch enkele werkdagen, spoed enkel wanneer haalbaar.",
      "Feedback op design en materiaal voor we printen.",
    ],
    resourcesTitle: "Handige resources",
    resources: [
      {
        title: "Material Suggestion Tool",
        body: "Gebruik de interactieve wizard om een startpunt te krijgen voor PLA, PETG, TPU en specials.",
        cta: "Ga naar de tool",
      },
      {
        title: "Kennisbank en blog",
        body: "Lees artikels over PLA vs PETG, kostprijsberekening en 3D printen in de buurt.",
        cta: "Bekijk alle topics",
      },
      {
        title: "3D modellen vinden",
        body: "Gids met de beste platformen om STL/3MF te vinden en meteen te laten printen.",
        cta: "Bekijk gids",
      },
    ],
    footer:
      "Niet zeker welk filament je nodig hebt? Gebruik de Material Suggestion Tool of stuur je vraag door; we bekijken het persoonlijk.",
  },
  services: [
    {
      icon: Printer,
      title: "FDM 3D-printen",
      description: "Functionele onderdelen en prototypes in PLA, PETG of TPU. Tot ~35 x 32 x 35 cm per stuk, opsplitsen mogelijk.",
    },
    {
      icon: Palette,
      title: "Materiaal- en kleuradvies",
      description: "We helpen kiezen tussen sterkte, flexibiliteit en look zodat je een haalbare oplossing krijgt voor je budget.",
    },
    {
      icon: Layers,
      title: "Bestandscheck en slicing",
      description: "We controleren manifold issues, supports en orientatie en bereiden je model voor in de slicer.",
    },
    {
      icon: Ruler,
      title: "DFM-review",
      description: "Pragmatisch advies over wanddikte, infill en toleranties zodat prints vlot en betrouwbaar blijven.",
    },
    {
      icon: Package,
      title: "Prototypes en kleine reeksen",
      description: "Ideaal voor een stuk tot korte runs. Heldere planning en transparante prijs per batch.",
    },
    {
      icon: Wrench,
      title: "Kwaliteitscontrole",
      description: "We meten kritieke maten steekproefsgewijs na en bezorgen feedback voor eventuele iteraties.",
    },
    {
      icon: Sparkles,
      title: "Basis nabewerking",
      description: "Supportverwijdering en licht ontbramen waar nodig. Geen schuren, primer, lak of lijmwerk.",
    },
    {
      icon: Box,
      title: "Afhalen of verzending",
      description: "Afhalen in Herzele of verzending binnen Belgie. Verpakking afgestemd op kleine oplages.",
    },
  ],
  knowledge: {
    label: "Kennis",
    items: [
      {
        title: "PLA vs PETG",
        body: "Vergelijk slagvastheid, hittebestendigheid en afwerking. Handig om materiaalkeuze te sturen.",
        href: "/blog/pla-vs-petg",
        cta: "Lees artikel",
      },
      {
        title: "Hoeveel kost 3D printen?",
        body: "Welke factoren beinvloeden de kost en hoe stellen we offertes op voor kleine reeksen.",
        href: "/blog/hoeveel-kost-3d-printen",
        cta: "Lees artikel",
      },
      {
        title: "3D printen in de buurt",
        body: "Afhalen in Herzele en leveringen richting Gent, Aalst en Antwerpen.",
        href: "/blog/3d-printen-in-de-buurt",
        cta: "Lees artikel",
      },
      {
        title: "3D printen: materialen, prijzen, workflow",
        body: "Overzichtspagina met use-cases, richtprijzen en FAQ. Goed startpunt voor nieuwe klanten.",
        href: "/3d-printen",
        cta: "Lees artikel",
      },
      {
        title: "3D modellen vinden",
        body: "Gids met de beste platformen om STL/3MF te vinden en meteen te laten printen.",
        href: "/3d-modellen-vinden",
        cta: "Bekijk gids",
      },
    ],
  },
  useCases: {
    title: "Waarvoor je 3D-printen inzet",
    intro:
      "Van engineering tot retail: 3D-printen versnelt ontwikkeling, verlaagt kosten en geeft vrijheid in vorm en kleur, ook voor kleine oplages.",
    items: [
      {
        icon: Sparkles,
        title: "Prototyping",
        description: "Snel valideren met strakke prototypes. Itereer zonder wachttijden en pas geometrie of materiaal aan per run.",
      },
      {
        icon: Puzzle,
        title: "Jigs en fixtures",
        description: "Hulpgereedschap, klemmen en malletjes op maat voor assemblage of testopstellingen.",
      },
      {
        icon: Package,
        title: "Behuizingen en brackets",
        description: "Op maat gemaakte kastjes, houders en scharnierende onderdelen met nette passing.",
      },
      {
        icon: Brush,
        title: "Displays en retail",
        description: "POS-materiaal, producthouders en etalageonderdelen die opvallen en exact passen.",
      },
      {
        icon: Ruler,
        title: "Vervangstukken",
        description: "Niet-meer-leverbaar onderdeel? We printen een pasvorm-equivalent en testen de montage.",
      },
      {
        icon: Palette,
        title: "Gepersonaliseerd",
        description: "Naamplaatjes, gifts en premium decor met PLA Wood/Marble, Silk of Translucent varianten.",
      },
    ],
  },
  sideJob: {
    title: "Lokale service in bijberoep",
    body:
      "X3DPrints draait naast een voltijdse job. Verwacht directe communicatie met de maker, een realistische planning en duidelijkheid over wat wel en niet mogelijk is.",
    cards: [
      {
        title: "Beschikbaarheid",
        body:
          "Productie gebeurt vooral in de avonduren en in het weekend. We stemmen de planning meteen bij je aanvraag af.",
      },
      {
        title: "Transparantie",
        body:
          "Je krijgt updates per mail over status en levering. Past iets niet in onze scope, dan zeggen we dat meteen.",
      },
    ],
  },
  segmentSpotlight: {
    title: "Segment spotlight",
    body:
      "Retail display-projecten, tabletop series en particulieren vragen elk hun eigen aanpak. Hier lees je hoe wij die segmenten ondersteunen.",
    links: [
      { label: "Retail & marketing props", href: "/segments/3d-printing-marketing" },
      { label: "Tabletop & hobby runs", href: "/segments/3d-printing-tabletop" },
      { label: "Particulieren prints", href: "/segments/3d-printing-makers" },
    ],
    notePrefix: "Gebruik ",
    noteTool: "Material Suggestion Tool",
    noteMiddle: " en stuur ",
    noteContact: "contact met materiaal",
    noteSuffix: " voor focus per cluster.",
  },
  specs: {
    title: "Specificaties",
    items: [
      { label: "Formaat", value: "Tot ~35 x 32 x 35 cm per stuk (opdelen in segmenten kan)" },
      { label: "Layerhoogte", value: "0,12-0,28 mm afhankelijk van detail en sterkte" },
      { label: "Tolerantie", value: "Typisch +/-0,2 mm voor FDM (bespreek kritieke maten)" },
      { label: "Materialen", value: "PLA (mat/wood/marble/silk/etc.), PETG, TPU; andere in overleg" },
      { label: "Nabewerking", value: "Support verwijderen en licht ontbramen. Geen schuren, primer of lak." },
      { label: "Planning", value: "Meestal enkele werkdagen. Productie in bijberoep, spoed enkel indien haalbaar." },
    ],
    note: "Grotere onderdelen worden eventueel opgesplitst en samengevoegd. Vraag gerust naar de beste aanpak.",
  },
  included: {
    title: "Wat inbegrepen is",
    items: [
      "Supportverwijdering en licht ontbramen na de print",
      "Persoonlijk advies over materiaal, orientatie en toleranties",
      "Updates over planning, levering en eventuele iteraties",
    ],
    body:
      "We focussen op wat FDM sterk maakt: snelle, functionele prints. Schuren, primer, lak, inserts, lijmverbindingen of montage behoren niet tot onze service.",
    note: "Toch nood aan die afwerking? We denken graag mee over partners of DIY-aanpak.",
  },
  workflow: {
    title: "Workflow",
    steps: [
      "Upload STL/STEP en vermeld toepassing, kleur en gewenste afwerking",
      "Materiaaladvies en offerte, doorgaans binnen 24 uur",
      "Productie, kwaliteitscheck en basis nabewerking (support verwijderen)",
      "Verzending of afhalen in Herzele; factuur digitaal",
    ],
  },
  readMore: {
    title: "Plan je 3D print project",
    intro: "Kies materiaal, check pricing en start meteen met een duidelijke offerte-aanvraag.",
    primaryLinks: [
      { label: "Materialen & richtlijnen", href: "/materials" },
      { label: "Prijzen & calculator", href: "/pricing" },
      { label: "Offerte aanvragen", href: "/contact" },
    ],
    secondaryLinks: [
      { label: "Portfolio", href: "/portfolio" },
      { label: "Segmenten & cases", href: "/segments" },
      { label: "Material Suggestion Tool", href: "/materials#material-suggestion-tool" },
    ],
  },
  cta: {
    city: "Belgie",
  },
  faq: {
    title: "Veelgestelde vragen over 3D printen in Belgie",
  },
  catalogName: "X3DPrints 3D-printservices",
  serviceName: "FDM 3D-print service",
  areaServed: "Gent & Oost-Vlaanderen",
  pricingOffers: [
    { serviceName: "Small (ca. 5x5x5 cm)", price: "EUR 5", description: "PLA Matte (standaard) voor functionele prototypes" },
    { serviceName: "Medium (ca. 10x10x10 cm)", price: "EUR 20", description: "PLA Matte met optionele kleur/Tough upgrade" },
    { serviceName: "Large (ca. 20x20x20 cm)", price: "EUR 49", description: "PLA Matte prototypes of decorstukken, splitsen mogelijk" },
  ],
}

const SERVICES_COPY_EN = {
  meta: {
    description:
      "Local FDM 3D printing from Herzele (part-time studio). Prototypes and small batches in PLA, PETG or TPU with honest advice and direct communication.",
  },
  hero: {
    title: "3D print service from Herzele (part-time studio)",
    intro:
      "X3DPrints is a one-person studio running part-time. You speak directly with the maker, get honest planning (usually a few business days) and material advice that fits your project and budget.",
    ctas: {
      quote: "Request a quote",
      tool: "Material Suggestion Tool",
      blog: "Read the blog",
    },
  },
  solo: {
    kicker: "Why X3DPrints",
    title: "Part-time studio with focus and direct communication",
    body:
      "Production runs from Herzele and every job is scheduled personally. No ticket system, just direct contact, transparent updates and flexibility for local pickup.",
    bullets: [
      "Pickup for Ghent/Aalst, shipping across Belgium.",
      "Planning by agreement: typically a few business days, rush only if feasible.",
      "Feedback on design and material before we print.",
    ],
    resourcesTitle: "Helpful resources",
    resources: [
      {
        title: "Material Suggestion Tool",
        body: "Use the interactive wizard to get a starting point for PLA, PETG, TPU and specials.",
        cta: "Go to the tool",
      },
      {
        title: "Knowledge base and blog",
        body: "Read articles about PLA vs PETG, cost calculation and local 3D printing.",
        cta: "View all topics",
      },
      {
        title: "Find 3D models",
        body: "Guide to the best places to source STL/3MF and have them printed immediately.",
        cta: "View guide",
      },
    ],
    footer:
      "Not sure which filament you need? Use the Material Suggestion Tool or send your question; we review it personally.",
  },
  services: [
    {
      icon: Printer,
      title: "FDM 3D printing",
      description: "Functional parts and prototypes in PLA, PETG or TPU. Up to ~35 x 32 x 35 cm per part, splitting possible.",
    },
    {
      icon: Palette,
      title: "Material and color advice",
      description: "We help balance strength, flexibility and look so you get a feasible solution within budget.",
    },
    {
      icon: Layers,
      title: "File check and slicing",
      description: "We check manifold issues, supports and orientation and prep your model in the slicer.",
    },
    {
      icon: Ruler,
      title: "DFM review",
      description: "Pragmatic advice on wall thickness, infill and tolerances so prints stay reliable.",
    },
    {
      icon: Package,
      title: "Prototypes and small batches",
      description: "Ideal for one-offs to short runs. Clear planning and transparent batch pricing.",
    },
    {
      icon: Wrench,
      title: "Quality control",
      description: "We sample-check critical dimensions and share feedback for iterations.",
    },
    {
      icon: Sparkles,
      title: "Basic post-processing",
      description: "Support removal and light deburring when needed. No sanding, primer, paint or bonding.",
    },
    {
      icon: Box,
      title: "Pickup or shipping",
      description: "Pickup in Herzele or shipping within Belgium. Packaging tuned for small batches.",
    },
  ],
  knowledge: {
    label: "Knowledge",
    items: [
      {
        title: "PLA vs PETG",
        body: "Compare impact resistance, heat resistance and finish. Useful for material selection.",
        href: "/blog/pla-vs-petg",
        cta: "Read article",
      },
      {
        title: "How much does 3D printing cost?",
        body: "Which factors affect cost and how we quote small-batch runs.",
        href: "/blog/hoeveel-kost-3d-printen",
        cta: "Read article",
      },
      {
        title: "3D printing nearby",
        body: "Pickup in Herzele and deliveries toward Ghent, Aalst and Antwerp.",
        href: "/blog/3d-printen-in-de-buurt",
        cta: "Read article",
      },
      {
        title: "3D printing: materials, pricing, workflow",
        body: "Overview page with use cases, price ranges and FAQ. A strong starting point for new clients.",
        href: "/3d-printen",
        cta: "Read article",
      },
    ],
  },
  useCases: {
    title: "Where 3D printing helps",
    intro:
      "From engineering to retail: 3D printing speeds development, reduces cost and gives freedom in form and color, even for small batches.",
    items: [
      {
        icon: Sparkles,
        title: "Prototyping",
        description: "Validate quickly with crisp prototypes. Iterate without delays and adjust geometry or material per run.",
      },
      {
        icon: Puzzle,
        title: "Jigs and fixtures",
        description: "Custom tooling, clamps and templates for assembly or test setups.",
      },
      {
        icon: Package,
        title: "Enclosures and brackets",
        description: "Custom housings, holders and hinged parts with clean fit.",
      },
      {
        icon: Brush,
        title: "Displays and retail",
        description: "POS materials, product holders and window pieces that stand out and fit precisely.",
      },
      {
        icon: Ruler,
        title: "Replacement parts",
        description: "No longer available part? We print a fit-equivalent and test the assembly.",
      },
      {
        icon: Palette,
        title: "Personalized",
        description: "Nameplates, gifts and premium decor with PLA Wood/Marble, Silk or Translucent variants.",
      },
    ],
  },
  sideJob: {
    title: "Local service, part-time studio",
    body:
      "X3DPrints runs alongside a full-time job. Expect direct communication with the maker, realistic planning and clarity on what is and is not possible.",
    cards: [
      {
        title: "Availability",
        body:
          "Production mainly happens in the evenings and on weekends. We align the schedule when you submit your request.",
      },
      {
        title: "Transparency",
        body:
          "You get email updates about status and delivery. If something is out of scope, we say so upfront.",
      },
    ],
  },
  segmentSpotlight: {
    title: "Segment spotlight",
    body:
      "Retail display projects, tabletop series and consumer requests each need a tailored approach. Here is how we support those segments.",
    links: [
      { label: "Retail & marketing props", href: "/segments/3d-printing-marketing" },
      { label: "Tabletop & hobby runs", href: "/segments/3d-printing-tabletop" },
      { label: "Consumer prints", href: "/segments/3d-printing-makers" },
    ],
    notePrefix: "Use ",
    noteTool: "Material Suggestion Tool",
    noteMiddle: " and send ",
    noteContact: "a material-based contact",
    noteSuffix: " to focus on each cluster.",
  },
  specs: {
    title: "Specifications",
    items: [
      { label: "Size", value: "Up to ~35 x 32 x 35 cm per part (segmentation possible)" },
      { label: "Layer height", value: "0.12-0.28 mm depending on detail and strength" },
      { label: "Tolerance", value: "Typically +/-0.2 mm for FDM (discuss critical dimensions)" },
      { label: "Materials", value: "PLA (matte/wood/marble/silk/etc.), PETG, TPU; others on request" },
      { label: "Post-processing", value: "Support removal and light deburring. No sanding, primer or paint." },
      { label: "Planning", value: "Usually a few business days. Part-time production; rush only if feasible." },
    ],
    note: "Larger parts can be split and assembled. Ask about the best approach.",
  },
  included: {
    title: "What is included",
    items: [
      "Support removal and light deburring after printing",
      "Personal advice on material, orientation and tolerances",
      "Updates on planning, delivery and iterations",
    ],
    body:
      "We focus on what FDM does best: fast, functional prints. Sanding, primer, paint, inserts, bonding or assembly are not part of the service.",
    note: "Need that finishing? We can suggest partners or a DIY approach.",
  },
  workflow: {
    title: "Workflow",
    steps: [
      "Upload STL/STEP and specify use case, color and desired finish",
      "Material advice and quote, usually within 24 hours",
      "Production, quality check and basic post-processing (support removal)",
      "Shipping or pickup in Herzele; invoice digitally",
    ],
  },
  readMore: {
    title: "Plan your 3D print project",
    intro: "Choose material, check pricing and start a clear quote request right away.",
    primaryLinks: [
      { label: "Materials & guidelines", href: "/materials" },
      { label: "Pricing & calculator", href: "/pricing" },
      { label: "Request a quote", href: "/contact" },
    ],
    secondaryLinks: [
      { label: "Portfolio", href: "/portfolio" },
      { label: "Segments & cases", href: "/segments" },
      { label: "Material Suggestion Tool", href: "/materials#material-suggestion-tool" },
    ],
  },
  cta: {
    city: "Belgium",
  },
  faq: {
    title: "Frequently asked questions about 3D printing in Belgium",
  },
  catalogName: "X3DPrints 3D printing services",
  serviceName: "FDM 3D printing service",
  areaServed: "Ghent & East Flanders",
  pricingOffers: [
    { serviceName: "Small (approx. 5x5x5 cm)", price: "EUR 5", description: "PLA Matte (standard) for functional prototypes" },
    { serviceName: "Medium (approx. 10x10x10 cm)", price: "EUR 20", description: "PLA Matte with optional color/Tough upgrade" },
    { serviceName: "Large (approx. 20x20x20 cm)", price: "EUR 49", description: "PLA Matte prototypes or decor pieces, splitting possible" },
  ],
}

type PageProps = { searchParams?: Promise<{ lang?: string } | undefined>; locale?: string }

export default function Page({ locale }: PageProps) {
  const normalizedLocale = normalizeLocale(locale)
  const isEn = normalizedLocale === "en"
  const copy = isEn ? SERVICES_COPY_EN : SERVICES_COPY_NL
  const localize = (href: string) => localizeHref(href, normalizedLocale)
  const faqItems = servicesFaqByLocale(normalizedLocale)

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",

    inLanguage: ["nl-BE", "en-BE"],
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  }

  const safeUrl = isEn ? "https://www.x3dprints.be/en/services" : "https://www.x3dprints.be/services"
  const catalogJsonLd = buildOfferCatalog(copy.catalogName, copy.pricingOffers)
  const localBusinessJsonLd = buildLocalBusinessSchema({
    pageUrl: safeUrl,
    description: copy.meta.description,
    image: "/images/portfolio/20241030_080710-1.jpg",
    priceRange: "EUR 5 - EUR 49",
    areaServed: copy.areaServed,
    offersName: copy.catalogName,
    offers: copy.pricingOffers,
  })
  const serviceJsonLd = buildServiceSchema(copy.serviceName, copy.pricingOffers, safeUrl)
  const readMorePrimaryLinks = copy.readMore.primaryLinks.map((link) => ({
    ...link,
    href: localize(link.href),
  }))
  const readMoreSecondaryLinks = copy.readMore.secondaryLinks.map((link) => ({
    ...link,
    href: localize(link.href),
  }))

  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(99,102,241,.14),transparent_70%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.06]" />

      {/* HERO */}
      <section className="px-6 pt-14 pb-10 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="stacked-content">
            <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              {copy.hero.title}
            </h1>
            <p className="mt-3 max-w-3xl text-pretty text-slate-600">
              {copy.hero.intro}
            </p>
            <div className="stacked-actions mt-6 flex flex-wrap gap-3 justify-center sm:justify-start">
              <ShimmerButton
                href={localize("/contact")}
                event={{ action: "cta_click", category: "services_hero", label: "quote" }}
              >
                {copy.hero.ctas.quote}
              </ShimmerButton>
              <Link
                href={localize("/materials#material-suggestion-tool")}
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
              >
                {copy.hero.ctas.tool}
              </Link>
              <Link
                href={localize("/blog")}
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
              >
                {copy.hero.ctas.blog}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SOLO APPROACH */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{copy.solo.kicker}</p>
                  <h2 className="text-2xl font-semibold text-slate-900">{copy.solo.title}</h2>
                  <p className="text-sm text-slate-600">{copy.solo.body}</p>
                  <ul className="space-y-2 text-sm text-slate-600">
                    {copy.solo.bullets.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{copy.solo.resourcesTitle}</p>
                  {copy.solo.resources.map((resource) => (
                    <div key={resource.title} className="rounded-2xl border border-slate-200/70 bg-white/70 p-4 text-sm text-slate-600">
                      <p className="font-semibold text-slate-900">{resource.title}</p>
                      <p className="mt-1">{resource.body}</p>
                      <Link
                        href={localize(
                          resource.title === "Material Suggestion Tool"
                            ? "/materials#material-suggestion-tool"
                            : "/blog"
                        )}
                        className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600"
                      >
                        {resource.cta} <span aria-hidden>-&gt;</span>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
              <p className="mt-6 text-xs text-slate-500">{copy.solo.footer}</p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {copy.services.map((service, index) => (
              <Reveal key={service.title} delay={index * 0.06}>
                <GlassCard className="h-full p-6 transition-transform hover:-translate-y-1">
                  <service.icon className="h-8 w-8 text-indigo-600" aria-hidden />
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">{service.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{service.description}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* KNOWLEDGE + SEO */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <div className="grid gap-6 md:grid-cols-3">
                {copy.knowledge.items.map((item) => (
                  <div key={item.title}>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{copy.knowledge.label}</p>
                    <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{item.body}</p>
                    <Link
                      href={localize(item.href)}
                      className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600"
                    >
                      {item.cta} <span aria-hidden>-&gt;</span>
                    </Link>
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* USE CASES */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-6">
            <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">{copy.useCases.title}</h2>
            <p className="mt-2 max-w-3xl text-slate-600">{copy.useCases.intro}</p>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {copy.useCases.items.map((useCase, index) => (
              <Reveal key={useCase.title} delay={index * 0.05}>
                <GlassCard className="h-full p-6">
                  <useCase.icon className="h-7 w-7 text-indigo-600" aria-hidden />
                  <h3 className="mt-3 text-base font-semibold text-slate-900">{useCase.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{useCase.description}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BIJBEROEP INFO */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <GlassCard className="p-6 lg:p-8">
              <h2 className="text-xl font-semibold tracking-tight text-slate-900">{copy.sideJob.title}</h2>
              <p className="mt-3 text-slate-600">{copy.sideJob.body}</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {copy.sideJob.cards.map((card) => (
                  <div key={card.title} className="rounded-lg border border-slate-200/70 bg-white/70 p-4">
                    <h3 className="text-sm font-semibold text-slate-900">{card.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{card.body}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-slate-900">{copy.segmentSpotlight.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{copy.segmentSpotlight.body}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {copy.segmentSpotlight.links.map((link) => (
                  <Link
                    key={link.href}
                    href={localize(link.href)}
                    className="rounded-2xl border border-slate-200/70 bg-white/70 px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <p className="mt-4 text-xs uppercase tracking-wide text-slate-500">
                {copy.segmentSpotlight.notePrefix}
                <Link href={localize("/materials#material-suggestion-tool")} className="font-semibold text-slate-900 underline">
                  {copy.segmentSpotlight.noteTool}
                </Link>
                {copy.segmentSpotlight.noteMiddle}
                <Link href={localize("/contact?material=PLA_MATTE")} className="font-semibold text-slate-900 underline">
                  {copy.segmentSpotlight.noteContact}
                </Link>
                {copy.segmentSpotlight.noteSuffix}
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* SPECS + AFWERKING */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
            <Reveal>
              <GlassCard className="p-6">
                <h2 className="text-xl font-semibold tracking-tight text-slate-900">{copy.specs.title}</h2>
                <dl className="mt-3 grid gap-3 sm:grid-cols-2">
                  {copy.specs.items.map((spec) => (
                    <div key={spec.label} className="rounded-lg border border-slate-200/70 bg-white/70 p-3">
                      <dt className="text-xs uppercase tracking-wide text-slate-500">{spec.label}</dt>
                      <dd className="mt-1 text-sm text-slate-700">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 text-xs text-slate-500">
                  {copy.specs.note}
                </p>
              </GlassCard>
            </Reveal>

            <Reveal delay={0.06}>
              <GlassCard className="p-6">
                <h2 className="text-xl font-semibold tracking-tight text-slate-900">{copy.included.title}</h2>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
                  {copy.included.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-slate-600">
                  {copy.included.body}
                </p>
                <p className="mt-3 text-xs uppercase tracking-wide text-slate-500">
                  {copy.included.note}
                </p>
              </GlassCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-xl font-semibold tracking-tight text-slate-900">{copy.workflow.title}</h2>
              <ol className="mt-3 list-decimal space-y-1 pl-5 text-slate-600">
                {copy.workflow.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <ReadMoreLinks
        title={copy.readMore.title}
        intro={copy.readMore.intro}
        primaryLinks={readMorePrimaryLinks}
        secondaryLinks={readMoreSecondaryLinks}
      />

      {/* CTA */}
      <div className="px-6 pb-12 sm:px-8 lg:px-12">
        <CtaBlock city={copy.cta.city} locale={normalizedLocale} />
      </div>

      <div className="px-6 pb-12 sm:px-8 lg:px-12">
        <OrganizerCta locale={normalizedLocale === "en" ? "en" : "nl"} />
      </div>

      {/* FAQ */}
      <section className="px-6 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Faq title={copy.faq.title} items={faqItems} />
          </Reveal>
        </div>
      </section>

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogJsonLd) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
    </main>
  )
}
