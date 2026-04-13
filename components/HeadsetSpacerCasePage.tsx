import Image from "next/image"
import Link from "next/link"

import BlogAuthorNote from "@/components/BlogAuthorNote"
import BlogContentOverview from "@/components/BlogContentOverview"
import BlogFaq from "@/components/BlogFaq"
import BlogReadMore from "@/components/BlogReadMore"
import ContentTableOfContents from "@/components/ContentTableOfContents"
import GlassCard from "@/components/GlassCard"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import { BLOG_FAQ } from "@/content/blog-faq"
import { BLOG_FAQ_EN } from "@/content/blog-faq-en"
import { buildArticleJsonLd, buildHowToSchema } from "@/lib/seo"

export const HEADSET_SPACER_CASE_SLUG = "use-case-dinsdag-headset-spacer-racefiets"
export const HEADSET_SPACER_PUBLISHED_DATE = "2026-04-12T08:00:00+02:00"
export const HEADSET_SPACER_DATE_MODIFIED = "2026-04-12"

const IMAGES = {
  overview: {
    src: "/images/blog/headset-spacer/custom-bike-headset-spacer-overview.webp",
    width: 1200,
    height: 1600,
  },
  detail: {
    src: "/images/blog/headset-spacer/custom-bike-headset-spacer-detail.webp",
    width: 1200,
    height: 1600,
  },
  side: {
    src: "/images/blog/headset-spacer/custom-bike-headset-spacer-side.webp",
    width: 1200,
    height: 1600,
  },
  render: {
    src: "/images/blog/headset-spacer/custom-bike-headset-spacer-fusion-render.webp",
    width: 786,
    height: 623,
  },
} as const

const sources = [
  {
    label: "Autodesk Fusion 360 Overview",
    href: "https://www.autodesk.com/products/fusion-360/overview",
    description: "Fusion 360 is the CAD environment used to model the custom headset spacer and validate contour decisions before prototyping.",
  },
  {
    label: "NIST Additive Manufacturing",
    href: "https://www.nist.gov/additive-manufacturing",
    description: "NIST documents additive-manufacturing process control, validation and design workflows that support case-based custom part development.",
  },
]

type CaseLocale = "nl" | "en"

type CaseCopy = {
  canonical: string
  inLanguage: string
  lastUpdatedLabel: string
  breadcrumbBlog: string
  breadcrumbSeries: string
  breadcrumbCurrent: string
  trustChips: string[]
  eyebrow: string
  title: string
  intro: string
  ctaPrimary: string
  ctaSecondary: string
  ctaTertiary: string
  heroNote: string
  tocTitle: string
  tocItems: { id: string; label: string }[]
  heroStats: { label: string; value: string; detail: string }[]
  imageAlt: Record<keyof typeof IMAGES, string>
  imageCaption: Record<keyof typeof IMAGES, string>
  problemTitle: string
  problemBody: string
  problemPoints: string[]
  problemLinkLabel: string
  solutionTitle: string
  solutionBody: string
  solutionPoints: string[]
  solutionSalesTitle: string
  solutionSalesBody: string
  solutionSalesCta: string
  processTitle: string
  processBody: string
  processSteps: { title: string; body: string }[]
  processLinkLabel: string
  comparisonTitle: string
  comparisonBody: string
  comparisonRows: { aspect: string; standard: string; custom: string }[]
  comparisonLinkLead: string
  comparisonLinkLabel: string
  comparisonLinkTail: string
  fitTitle: string
  fitBody: string
  fitPoints: string[]
  audienceTitle: string
  audiencePoints: string[]
  audienceLinkLabel: string
  boundaryTitle: string
  boundaryPoints: string[]
  boundaryBody: string
  sourcesTitle: string
  sourcesIntro: string
  sources: { label: string; href: string; description: string }[]
  nextStepEyebrow: string
  nextStepTitle: string
  nextStepBody: string
  nextStepPrimary: string
  nextStepSecondary: string
  howToName: string
  howToDescription: string
  howToSteps: { name: string; text: string; anchor: string }[]
}

const COPY: Record<CaseLocale, CaseCopy> = {
  nl: {
    canonical: `https://www.x3dprints.be/blog/${HEADSET_SPACER_CASE_SLUG}/`,
    inLanguage: "nl-BE",
    lastUpdatedLabel: "Laatst bijgewerkt: 12 april 2026",
    breadcrumbBlog: "Blog",
    breadcrumbSeries: "Use Case Dinsdag",
    breadcrumbCurrent: "Custom headset spacer",
    trustChips: ["Custom ontworpen voor klant", "Geprint in Herzele", "Gratis eerste inschatting"],
    eyebrow: "Use Case Dinsdag #9",
    title: "Custom fietsonderdeel met 3D printing: geintegreerde headset spacer voor een racefiets",
    intro:
      "Ja: een standaard stack van losse headset spacers kan vervangen worden door een custom 3D geprint fietsonderdeel dat strakker aansluit op frame en cockpit. In deze case tonen we hoe een geintegreerde headset spacer het verschil maakt tussen een correcte fiets en een visueel afgewerkte build.",
    ctaPrimary: "Vraag gratis eerste inschatting",
    ctaSecondary: "Bekijk portfolio",
    ctaTertiary: "Geen model? Wij modelleren mee",
    heroNote:
      "Stuur gerust een foto van je cockpit, frame of probleemzone mee. Dat verlaagt de drempel en versnelt de haalbaarheidscheck voor custom bike parts.",
    tocTitle: "Inhoud",
    tocItems: [
      { id: "probleem", label: "Welk probleem lost deze custom headset spacer op?" },
      { id: "oplossing", label: "Hoe ziet de custom oplossing eruit?" },
      { id: "proces", label: "Hoe verloopt analyse, CAD en prototyping?" },
      { id: "vergelijking", label: "Wanneer wint 3D printen van standaard onderdelen?" },
      { id: "voor-wie", label: "Voor wie is dit relevant en waar ligt de grens?" },
      { id: "bronnen", label: "Bronnen en referenties" },
    ],
    heroStats: [
      { label: "Case type", value: "Custom fietsonderdeel", detail: "Headset spacer op maat van frame en cockpit" },
      { label: "Workflow", value: "Analyse -> CAD -> prototype", detail: "Fusion 360 + iteratieve passtest" },
      { label: "Gemaakt in", value: "Herzele, Belgie", detail: "Ontwerp en productie in-house" },
    ],
    imageAlt: {
      overview: "Racefiets met custom 3D geprinte headset spacer tussen frame en cockpit",
      detail: "Close-up van de custom headset spacer die de overgang tussen cockpit en frame integreert",
      side: "Zijaanzicht van een racefiets met een custom headset spacer op maat",
      render: "Fusion 360 render van de custom headset spacer voor de racefiets",
    },
    imageCaption: {
      overview: "Overzichtsfoto van de racefiets met de custom headset spacer gemonteerd.",
      detail: "Detailbeeld van de strakke passing en de visuele integratie rond het balhoofd.",
      side: "Zijaanzicht waarop de vloeiende lijn van cockpit naar frame duidelijk leesbaar is.",
      render: "Fusion 360 render die gebruikt werd om passing, vorm en contouren te valideren.",
    },
    problemTitle: "Een standaard fietsonderdeel dat net niet goed genoeg is",
    problemBody:
      "Bij een high-end racefiets draait alles rond detail. Net daarom vallen standaard headset spacers extra op: ze functioneren, maar ze laten vaak een stapeling van losse ringen zien die niet echt samengaat met de lijnen van frame en cockpit.",
    problemPoints: [
      "Losse headset spacers geven snel een technisch correcte, maar visueel onderbroken cockpitlijn.",
      "Standaard ringen bieden weinig speelruimte als frame, stuurpen en stack visueel moeten samenvallen.",
      "Bij high-end racefietsen valt net die overgang extra op, waardoor een custom fietsonderdeel sneller meerwaarde heeft.",
    ],
    problemLinkLabel: "hoe we ontwerpen 3D-printbaar maken",
    solutionTitle: "De oplossing: een custom headset spacer met 3D printing",
    solutionBody:
      "Voor deze klant ontwikkelden we geen generisch onderdeel, maar een headset spacer op maat van deze build. Het doel was helder: een nette, geintegreerde overgang maken tussen frame en cockpit, zonder zichtbare stapeling van losse ringen.",
    solutionPoints: [
      "Een volledig custom headset spacer die op maat van deze fiets werd ontworpen.",
      "Een strakkere en meer geintegreerde overgang tussen balhoofd, spacerzone en cockpit.",
      "Snelle iteraties zonder eerst tooling of een dure matrijs te moeten voorzien.",
      "Een oplossing die niet als standaard fietsonderdeel van het rek hoeft te komen.",
    ],
    solutionSalesTitle: "Waarom dit salesmatig telt",
    solutionSalesBody:
      "Voor wie investeert in een high-end bike build, telt afwerking even hard als functionaliteit. Een custom bike part dat exact past, trekt de fiets visueel op een hoger niveau en lost tegelijk een concreet probleem op dat niet standaard in de markt verkrijgbaar is.",
    solutionSalesCta: "Vraag een eerste inschatting",
    processTitle: "Hoe we van idee naar finale spacer gingen",
    processBody:
      "Dit traject combineert analyse, CAD en prototyping. Daardoor kunnen we sneller schakelen dan met klassieke tooling en toch gecontroleerd werken op passing en uitstraling.",
    processSteps: [
      {
        title: "1. Analyse en opmeting",
        body: "We starten met foto's, referentiematen, framegeometrie en de huidige cockpitopbouw. Zo bepalen we waar passing kritisch is.",
      },
      {
        title: "2. CAD ontwerp in Fusion 360",
        body: "Op basis van die input modelleren we een custom onderdeel dat niet alleen moet passen, maar ook logisch moet aansluiten op stuur, frame en stackhoogte.",
      },
      {
        title: "3. Prototype met 3D printing",
        body: "Een eerste print maakt micro-aanpassingen mogelijk. Dat is precies waar 3D print fietsonderdelen sterk in zijn: snel valideren, bijsturen en opnieuw passen.",
      },
      {
        title: "4. Finale versie",
        body: "Na validatie produceren we de finale spacer in het gekozen materiaal en stemmen we af op gebruik, look en haalbaarheid van het project.",
      },
    ],
    processLinkLabel: "3D modelleren",
    comparisonTitle: "Wanneer wint 3D printing van standaard fietsonderdelen?",
    comparisonBody:
      "Zodra passing, vormtaal en kleine oplage belangrijker worden dan massaproductie, is 3D printing vaak de meest logische route. Zeker voor custom bike parts, niche onderdelen en iteratieve projecten.",
    comparisonRows: [
      { aspect: "Pasvorm", standard: "Beperkt tot bestaande diameters en hoogtes.", custom: "Afgestemd op cockpit, frameovergang en gewenste lijn." },
      { aspect: "Visuele integratie", standard: "Zichtbare stapeling van losse ringen.", custom: "Een vloeiende overgang met premium uitstraling." },
      { aspect: "Maatwerk", standard: "Je kiest uit wat de markt aanbiedt.", custom: "Vorm, hoogte en contouren zijn aanpasbaar per project." },
      { aspect: "Iteratiesnelheid", standard: "Geen ontwerpvrijheid, dus ook weinig optimalisatie.", custom: "CAD en prototypes maken snelle verbeteringen haalbaar." },
      { aspect: "Kleine oplage", standard: "Niet logisch voor een eenmalig niche-onderdeel.", custom: "Perfect voor one-off projecten of kleine reeksen." },
    ],
    comparisonLinkLead: "Wil je zien hoe die iteratieve aanpak ook in andere producttrajecten werkt? Lees dan",
    comparisonLinkLabel: "onze gids over prototyping en kleine reeksen",
    comparisonLinkTail: "of bekijk welk materiaal bij jouw toepassing past via het materialenoverzicht.",
    fitTitle: "Het resultaat: een onderdeel op maat dat de build afmaakt",
    fitBody:
      "Voor deze klant betekende dat een duidelijk verschil in look en beleving. Niet omdat de fiets voordien niet werkte, maar omdat de cockpit nu als een geheel leest.",
    fitPoints: [
      "De spacer volgt de lijnen van frame en cockpit veel beter dan een standaard stack van ringen.",
      "De fiets oogt rustiger, strakker en meer afgewerkt zonder generische tussenstukken.",
      "De klant krijgt een oplossing op maat in plaats van een compromis met standaard onderdelen.",
      "Dit is geen los accessoire, maar een gerichte upgrade in look, fit en beleving.",
    ],
    audienceTitle: "Voor wie is dit relevant?",
    audiencePoints: [
      "Wielrenners die hun fiets visueel sterker en persoonlijker willen afwerken.",
      "Fietsbouwers en mechanics die een oplossing nodig hebben die niet standaard verkrijgbaar is.",
      "Designers en engineers die bike parts made to fit willen uitwerken zonder tooling.",
      "Projecten waar custom bike parts sneller en zinvoller zijn dan wachten op een aftermarket alternatief.",
    ],
    audienceLinkLabel: "makers en particulieren",
    boundaryTitle: "Waar ligt de grens?",
    boundaryPoints: [
      "Niet elk fietsonderdeel is geschikt voor blind 3D printen. Safety-critical stuur-, rem- of structurele delen vragen aparte validatie.",
      "Voor onderdelen in de directe belastingslijn bekijken we altijd passing, wanddikte, materiaal en gebruiksscenario voor we iets aanraden.",
      "Als een ander productieproces logischer of veiliger is, benoemen we dat expliciet in plaats van er marketing rond te bouwen.",
    ],
    boundaryBody:
      "Dat is precies waarom we per case eerlijk adviseren. Het doel is niet elk onderdeel blind te printen, maar de juiste oplossing te bouwen voor het juiste probleem.",
    sourcesTitle: "Bronnen en referenties",
    sourcesIntro: "Referentiebronnen die de CAD-, ontwerp- en additive-manufacturing aanpak in deze case ondersteunen.",
    sources,
    nextStepEyebrow: "Volgende stap",
    nextStepTitle: "Heb jij een fietsonderdeel dat beter kan, netter moet passen of gewoon niet bestaat?",
    nextStepBody:
      "Stuur een foto van je probleem of je huidige setup mee. We bekijken de haalbaarheid, denken mee over CAD en geven een eerste inschatting zonder nodeloze omweg.",
    nextStepPrimary: "Contacteer ons over jouw fietsonderdeel",
    nextStepSecondary: "Bekijk meer maatwerk in de portfolio",
    howToName: "Custom headset spacer voor een racefiets uitwerken",
    howToDescription:
      "Van analyse en opmeting naar CAD, prototype en finale productie van een custom headset spacer op maat van frame en cockpit.",
    howToSteps: [
      { name: "Analyseer frame en cockpit", text: "Verzamel foto's, referentiematen, stackhoogte en informatie over de huidige headsetopbouw.", anchor: "probleem" },
      { name: "Modelleer de custom spacer in CAD", text: "Werk de vorm uit in Fusion 360 zodat passing, contour en visuele lijn samen kloppen.", anchor: "proces" },
      { name: "Print en test een prototype", text: "Gebruik een eerste 3D print om fit, hoogte en detailzones te controleren en bij te sturen.", anchor: "proces" },
      { name: "Finaliseer de productie", text: "Na validatie wordt de finale versie geprint en afgestemd op het beoogde gebruik.", anchor: "oplossing" },
    ],
  },
  en: {
    canonical: `https://www.x3dprints.be/en/blog/${HEADSET_SPACER_CASE_SLUG}/`,
    inLanguage: "en-BE",
    lastUpdatedLabel: "Last updated: April 12, 2026",
    breadcrumbBlog: "Blog",
    breadcrumbSeries: "Use Case Tuesday",
    breadcrumbCurrent: "Custom headset spacer",
    trustChips: ["Designed for a client", "Printed in Herzele", "Free first assessment"],
    eyebrow: "Use Case Tuesday #9",
    title: "Custom bike part with 3D printing: integrated headset spacer for a race bike",
    intro:
      "Yes: a standard stack of loose headset spacers can be replaced by a custom 3D printed bike part that fits the frame and cockpit more cleanly. This case shows how an integrated headset spacer can change a bike from technically correct to visually complete.",
    ctaPrimary: "Request a free first assessment",
    ctaSecondary: "View portfolio",
    ctaTertiary: "No model yet? We can design it",
    heroNote:
      "Feel free to send a photo of the cockpit, frame or problem area. That reduces friction and speeds up the feasibility check for custom bike parts.",
    tocTitle: "Contents",
    tocItems: [
      { id: "probleem", label: "What problem does this custom headset spacer solve?" },
      { id: "oplossing", label: "What does the custom solution look like?" },
      { id: "proces", label: "How do analysis, CAD and prototyping work?" },
      { id: "vergelijking", label: "When does 3D printing beat standard parts?" },
      { id: "voor-wie", label: "Who is this relevant for and where is the limit?" },
      { id: "bronnen", label: "Sources and references" },
    ],
    heroStats: [
      { label: "Case type", value: "Custom bike part", detail: "Headset spacer matched to frame and cockpit" },
      { label: "Workflow", value: "Analysis -> CAD -> prototype", detail: "Fusion 360 plus iterative fit testing" },
      { label: "Made in", value: "Herzele, Belgium", detail: "Design and production handled in-house" },
    ],
    imageAlt: {
      overview: "Race bike with a custom 3D printed headset spacer between the frame and cockpit",
      detail: "Close-up of the custom headset spacer integrating the cockpit-to-frame transition",
      side: "Side view of a race bike with a made-to-fit custom headset spacer",
      render: "Fusion 360 render of the custom race bike headset spacer",
    },
    imageCaption: {
      overview: "Overview image of the race bike with the custom headset spacer installed.",
      detail: "Close-up showing the fit and the cleaner visual transition around the head tube.",
      side: "Side view where the cockpit and frame lines read as one visual flow.",
      render: "Fusion 360 render used to validate fit, shape and contour before the physical prototype.",
    },
    problemTitle: "A standard bike part that is just not good enough",
    problemBody:
      "On a high-end race bike every detail matters. That is exactly why standard headset spacers stand out: they function, but they often leave a visible stack of loose rings that does not really align with the frame and cockpit lines.",
    problemPoints: [
      "Loose headset spacers often create a technically correct but visually broken cockpit line.",
      "Standard rings offer limited freedom when frame, stem and stack should read as one integrated shape.",
      "On a high-end race bike that transition stands out fast, which is why a custom bike part can add real value.",
    ],
    problemLinkLabel: "how we make designs printable",
    solutionTitle: "The solution: a custom headset spacer with 3D printing",
    solutionBody:
      "For this client we did not develop a generic part, but a made-to-fit headset spacer for this specific build. The goal was straightforward: create a cleaner, integrated transition between frame and cockpit without a visible stack of loose rings.",
    solutionPoints: [
      "A fully custom headset spacer designed around this specific bike.",
      "A cleaner and more integrated transition between the head tube, spacer zone and cockpit.",
      "Fast iterations without committing to tooling or expensive molds first.",
      "A solution that does not have to exist as an off-the-shelf bike part.",
    ],
    solutionSalesTitle: "Why this matters commercially",
    solutionSalesBody:
      "For riders investing in a high-end build, finish matters as much as function. A custom bike part that fits exactly takes the bike to a higher visual level while also solving a real problem that does not exist as a standard market product.",
    solutionSalesCta: "Request a first assessment",
    processTitle: "How we moved from idea to final spacer",
    processBody:
      "This workflow combines analysis, CAD and prototyping. That lets us move faster than traditional tooling while still staying controlled on fit and visual quality.",
    processSteps: [
      { title: "1. Analysis and measurement", body: "We start with photos, reference dimensions, frame geometry and the current cockpit setup. That tells us where fit is critical." },
      { title: "2. CAD design in Fusion 360", body: "Using that input we model a custom part that must not only fit, but also align logically with the stem, frame and stack height." },
      { title: "3. Prototype with 3D printing", body: "A first print makes micro-adjustments possible. That is exactly where 3D printed bike parts are strong: fast validation and another fit check." },
      { title: "4. Final version", body: "After validation we produce the final spacer in the chosen material and align the part with the intended use, look and project scope." },
    ],
    processLinkLabel: "3D modeling",
    comparisonTitle: "When does 3D printing beat standard bike parts?",
    comparisonBody:
      "As soon as fit, shape language and short-run production matter more than mass-market availability, 3D printing is often the smarter path.",
    comparisonRows: [
      { aspect: "Fit", standard: "Limited to existing diameters and heights.", custom: "Matched to the cockpit, frame transition and target line." },
      { aspect: "Visual integration", standard: "Visible stack of separate rings.", custom: "One smoother transition with a premium finish." },
      { aspect: "Customization", standard: "You choose from whatever the market offers.", custom: "Shape, height and contour can be tuned to the project." },
      { aspect: "Iteration speed", standard: "Almost no design freedom, so almost no optimization.", custom: "CAD plus prototypes make small improvements fast and realistic." },
      { aspect: "Small quantity viability", standard: "Not logical for a niche one-off part.", custom: "Ideal for one-off builds and short runs." },
    ],
    comparisonLinkLead: "Want to see how this iterative workflow also supports broader product work? Read",
    comparisonLinkLabel: "our guide on prototyping and short runs",
    comparisonLinkTail: "or review the best material route through the materials overview.",
    fitTitle: "The result: a made-to-fit part that completes the build",
    fitBody:
      "For this client the difference was clear in both look and experience. Not because the bike did not work before, but because the cockpit now reads as one resolved whole.",
    fitPoints: [
      "The spacer follows the frame and cockpit lines far better than a standard ring stack.",
      "The bike looks calmer, cleaner and more complete without generic filler parts.",
      "The rider gets a made-to-fit solution instead of compromising with standard parts.",
      "This is not a generic accessory, but a focused upgrade in look, fit and experience.",
    ],
    audienceTitle: "Who is this relevant for?",
    audiencePoints: [
      "Riders who want a bike that looks more resolved and more personal.",
      "Bike builders and mechanics who need a solution that does not exist on the market.",
      "Designers and engineers who want bike parts made to fit without investing in tooling first.",
      "Projects where custom bike parts are faster and more realistic than waiting for an aftermarket option.",
    ],
    audienceLinkLabel: "makers and individual clients",
    boundaryTitle: "Where is the limit?",
    boundaryPoints: [
      "Not every bike part should be 3D printed blindly. Safety-critical steering, braking or structural parts need separate validation.",
      "For parts in the direct load path we always review fit, wall thickness, material and use case before recommending anything.",
      "If another production route is safer or more logical, we say so instead of forcing a 3D printing story around it.",
    ],
    boundaryBody:
      "That is exactly why we advise case by case. The goal is not to force 3D printing onto every part, but to build the right solution for the right problem.",
    sourcesTitle: "Sources and references",
    sourcesIntro: "Reference sources that support the CAD, design and additive-manufacturing workflow described in this case.",
    sources,
    nextStepEyebrow: "Next step",
    nextStepTitle: "Do you have a bike part that should fit better, look cleaner or simply does not exist yet?",
    nextStepBody:
      "Send a photo of the issue or your current setup. We review feasibility, think along on CAD and give a first assessment without unnecessary back and forth.",
    nextStepPrimary: "Talk to us about your bike part",
    nextStepSecondary: "View more custom work in the portfolio",
    howToName: "Develop a custom headset spacer for a race bike",
    howToDescription:
      "Go from analysis and measurement to CAD, prototype and final production of a custom headset spacer matched to a frame and cockpit.",
    howToSteps: [
      { name: "Analyze the frame and cockpit", text: "Collect photos, reference dimensions, stack height and details about the current headset setup.", anchor: "probleem" },
      { name: "Model the custom spacer in CAD", text: "Build the part in Fusion 360 so fit, contour and visual flow align in one design.", anchor: "proces" },
      { name: "Print and test a prototype", text: "Use the first print to verify fit, height and detail zones, then adjust where needed.", anchor: "proces" },
      { name: "Finalize production", text: "Once validated, print the final version and align the part with the intended use case.", anchor: "oplossing" },
    ],
  },
}

export default function HeadsetSpacerCasePage({ locale }: { locale: CaseLocale }) {
  const copy = COPY[locale]
  const prefix = locale === "en" ? "/en" : ""
  const faq = locale === "en" ? BLOG_FAQ_EN[HEADSET_SPACER_CASE_SLUG] : BLOG_FAQ[HEADSET_SPACER_CASE_SLUG]
  const comparisonHeaders =
    locale === "en"
      ? { aspect: "Aspect", standard: "Standard", custom: "Custom" }
      : { aspect: "Aspect", standard: "Standaard", custom: "Maatwerk" }
  const articleJsonLd = buildArticleJsonLd({
    canonical: copy.canonical,
    headline: copy.title,
    description: copy.intro,
    datePublished: HEADSET_SPACER_PUBLISHED_DATE,
    dateModified: HEADSET_SPACER_DATE_MODIFIED,
    image: [IMAGES.overview.src, IMAGES.detail.src, IMAGES.render.src],
    inLanguage: copy.inLanguage,
  })
  const howToJsonLd = buildHowToSchema({
    name: copy.howToName,
    description: copy.howToDescription,
    inLanguage: copy.inLanguage,
    mainEntityOfPage: copy.canonical,
    url: copy.canonical,
    steps: copy.howToSteps.map((step) => ({ name: step.name, text: step.text, url: `${copy.canonical}#${step.anchor}` })),
    toolNames: ["Fusion 360", "X3DPrints"],
    supplyNames: locale === "en" ? ["Cockpit photos", "Reference dimensions", "Fit feedback"] : ["Cockpitfoto's", "Referentiematen", "Feedback op pasvorm"],
  })

  return (
    <main className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(135%_80%_at_50%_-10%,rgba(59,130,246,0.18),transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.08]" />
      <article className="mx-auto max-w-6xl px-6 pb-24 pt-16 sm:px-8 lg:px-12">
        <header className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,.9fr)]">
          <Reveal className="space-y-5">
            <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
              <ol className="flex flex-wrap gap-2">
                <li><Link href={`${prefix}/blog`} className="font-medium text-indigo-600 transition hover:text-indigo-500">{copy.breadcrumbBlog}</Link></li>
                <li aria-hidden>/</li>
                <li className="font-medium text-slate-700">{copy.breadcrumbSeries}</li>
                <li aria-hidden>/</li>
                <li className="font-medium text-slate-900">{copy.breadcrumbCurrent}</li>
              </ol>
            </nav>
            <div className="flex flex-wrap gap-2">
              {copy.trustChips.map((chip) => <span key={chip} className="inline-flex items-center rounded-full border border-white/40 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700 backdrop-blur">{chip}</span>)}
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">{copy.eyebrow}</p>
            <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">{copy.title}</h1>
            <p className="max-w-3xl text-lg text-slate-700">{copy.intro}</p>
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">{copy.lastUpdatedLabel}</p>
            <div className="flex flex-wrap gap-3">
              <ShimmerButton href={`${prefix}/contact?topic=use-case-headset-spacer-racefiets`}>{copy.ctaPrimary}</ShimmerButton>
              <Link href={`${prefix}/portfolio`} className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/75 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white">{copy.ctaSecondary}</Link>
              <Link href={`${prefix}/3d-modelleren`} className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white">{copy.ctaTertiary}</Link>
            </div>
            <p className="max-w-2xl text-sm text-slate-600">{copy.heroNote}</p>
            <ContentTableOfContents title={copy.tocTitle} items={copy.tocItems} className="max-w-2xl" />
          </Reveal>
          <Reveal delay={0.1} className="space-y-4">
            <GlassCard className="overflow-hidden border border-white/50 bg-white/80 p-3 shadow-xl backdrop-blur">
              <div className="overflow-hidden rounded-2xl"><Image src={IMAGES.overview.src} alt={copy.imageAlt.overview} width={IMAGES.overview.width} height={IMAGES.overview.height} priority sizes="(min-width: 1024px) 38vw, 100vw" className="h-auto w-full object-cover" /></div>
              <p className="mt-3 text-sm text-slate-600">{copy.imageCaption.overview}</p>
            </GlassCard>
            <div className="grid gap-4 sm:grid-cols-3">
              {copy.heroStats.map((stat) => <GlassCard key={stat.label} className="border border-white/50 bg-white/75 p-4 shadow-md backdrop-blur"><p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">{stat.label}</p><p className="mt-2 text-lg font-semibold text-slate-900">{stat.value}</p><p className="mt-1 text-sm text-slate-600">{stat.detail}</p></GlassCard>)}
            </div>
          </Reveal>
        </header>
        <div className="mt-10"><BlogContentOverview locale={locale} /></div>
        <section id="probleem" className="scroll-mt-28 pt-12">
          <Reveal className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(300px,.95fr)]">
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">{copy.problemTitle}</h2>
              <p className="mt-3 text-sm text-slate-700">{copy.problemBody}</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">{copy.problemPoints.map((point) => <li key={point} className="rounded-2xl border border-slate-100 bg-white/70 p-4">{point}</li>)}</ul>
              <p className="mt-4 text-sm text-slate-700"><Link href={`${prefix}/blog/ontwerp-3d-printbaar-model`} className="font-semibold text-indigo-600 transition hover:text-indigo-500">{copy.problemLinkLabel}</Link></p>
            </GlassCard>
            <GlassCard className="border border-white/40 bg-white/85 p-4 shadow-lg backdrop-blur"><div className="overflow-hidden rounded-2xl"><Image src={IMAGES.detail.src} alt={copy.imageAlt.detail} width={IMAGES.detail.width} height={IMAGES.detail.height} sizes="(min-width: 1024px) 32vw, 100vw" className="h-auto w-full object-cover" /></div><p className="mt-3 text-sm text-slate-600">{copy.imageCaption.detail}</p></GlassCard>
          </Reveal>
        </section>
        <section id="oplossing" className="scroll-mt-28 pt-12">
          <Reveal className="grid gap-6 lg:grid-cols-2">
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur"><h2 className="text-2xl font-semibold text-slate-900">{copy.solutionTitle}</h2><p className="mt-3 text-sm text-slate-700">{copy.solutionBody}</p><ul className="mt-4 space-y-2 text-sm text-slate-700">{copy.solutionPoints.map((point) => <li key={point} className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden /><span>{point}</span></li>)}</ul></GlassCard>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur"><h3 className="text-lg font-semibold text-slate-900">{copy.solutionSalesTitle}</h3><p className="mt-3 text-sm text-slate-700">{copy.solutionSalesBody}</p><div className="mt-4 rounded-2xl border border-slate-200/70 bg-white/80 p-4 text-sm text-slate-700"><Link href={`${prefix}/contact?topic=use-case-headset-spacer-racefiets`} className="font-semibold text-indigo-600 transition hover:text-indigo-500">{copy.solutionSalesCta}</Link></div></GlassCard>
          </Reveal>
        </section>
        <section id="proces" className="scroll-mt-28 pt-12">
          <Reveal className="grid gap-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(300px,.92fr)]">
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur"><h2 className="text-2xl font-semibold text-slate-900">{copy.processTitle}</h2><p className="mt-3 text-sm text-slate-700">{copy.processBody}</p><div className="mt-5 grid gap-4">{copy.processSteps.map((step) => <div key={step.title} className="rounded-2xl border border-slate-100 bg-white/70 p-4"><h3 className="text-base font-semibold text-slate-900">{step.title}</h3><p className="mt-2 text-sm text-slate-700">{step.body}</p></div>)}</div><p className="mt-4 text-sm text-slate-700"><Link href={`${prefix}/3d-modelleren`} className="font-semibold text-indigo-600 transition hover:text-indigo-500">{copy.processLinkLabel}</Link></p></GlassCard>
            <GlassCard className="border border-white/40 bg-white/85 p-4 shadow-lg backdrop-blur"><div className="overflow-hidden rounded-2xl"><Image src={IMAGES.render.src} alt={copy.imageAlt.render} width={IMAGES.render.width} height={IMAGES.render.height} sizes="(min-width: 1024px) 30vw, 100vw" className="h-auto w-full object-cover" /></div><p className="mt-3 text-sm text-slate-600">{copy.imageCaption.render}</p></GlassCard>
          </Reveal>
        </section>
        <section id="vergelijking" className="scroll-mt-28 pt-12">
          <Reveal><GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur"><h2 className="text-2xl font-semibold text-slate-900">{copy.comparisonTitle}</h2><p className="mt-3 text-sm text-slate-700">{copy.comparisonBody}</p><div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200/70 bg-white/80"><table className="min-w-full text-left text-sm text-slate-700"><thead className="bg-slate-50 text-xs uppercase tracking-[0.18em] text-slate-500"><tr><th className="px-4 py-3">{comparisonHeaders.aspect}</th><th className="px-4 py-3">{comparisonHeaders.standard}</th><th className="px-4 py-3">{comparisonHeaders.custom}</th></tr></thead><tbody className="divide-y divide-slate-100">{copy.comparisonRows.map((row) => <tr key={row.aspect}><th className="px-4 py-4 font-semibold text-slate-900">{row.aspect}</th><td className="px-4 py-4">{row.standard}</td><td className="px-4 py-4">{row.custom}</td></tr>)}</tbody></table></div><p className="mt-4 text-sm text-slate-700">{copy.comparisonLinkLead} <Link href={`${prefix}/blog/prototyping-kleine-reeksen-3d-printen`} className="font-semibold text-indigo-600 transition hover:text-indigo-500">{copy.comparisonLinkLabel}</Link> {copy.comparisonLinkTail}</p></GlassCard></Reveal>
        </section>
        <section id="voor-wie" className="scroll-mt-28 pt-12"><Reveal className="grid gap-6 lg:grid-cols-2"><GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur"><h2 className="text-2xl font-semibold text-slate-900">{copy.audienceTitle}</h2><ul className="mt-4 space-y-3 text-sm text-slate-700">{copy.audiencePoints.map((item) => <li key={item} className="rounded-2xl border border-slate-100 bg-white/70 p-4">{item}</li>)}</ul><p className="mt-4 text-sm text-slate-700"><Link href={`${prefix}/segments/3d-printing-makers`} className="font-semibold text-indigo-600 transition hover:text-indigo-500">{copy.audienceLinkLabel}</Link></p></GlassCard><GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur"><h2 className="text-2xl font-semibold text-slate-900">{copy.boundaryTitle}</h2><ul className="mt-4 space-y-3 text-sm text-slate-700">{copy.boundaryPoints.map((item) => <li key={item} className="rounded-2xl border border-slate-100 bg-white/70 p-4">{item}</li>)}</ul><p className="mt-4 text-sm text-slate-700">{copy.boundaryBody}</p></GlassCard></Reveal></section>
        <section className="pt-12"><Reveal className="grid gap-6 lg:grid-cols-[minmax(0,.95fr)_minmax(0,1.05fr)]"><GlassCard className="border border-white/40 bg-white/85 p-4 shadow-lg backdrop-blur"><div className="overflow-hidden rounded-2xl"><Image src={IMAGES.side.src} alt={copy.imageAlt.side} width={IMAGES.side.width} height={IMAGES.side.height} sizes="(min-width: 1024px) 30vw, 100vw" className="h-auto w-full object-cover" /></div><p className="mt-3 text-sm text-slate-600">{copy.imageCaption.side}</p></GlassCard><GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur"><h2 className="text-2xl font-semibold text-slate-900">{copy.fitTitle}</h2><p className="mt-3 text-sm text-slate-700">{copy.fitBody}</p><ul className="mt-4 space-y-2 text-sm text-slate-700">{copy.fitPoints.map((item) => <li key={item} className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden /><span>{item}</span></li>)}</ul></GlassCard></Reveal></section>
        <section id="bronnen" className="scroll-mt-28 pt-12"><Reveal><GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur"><h2 className="text-2xl font-semibold text-slate-900">{copy.sourcesTitle}</h2><p className="mt-3 text-sm text-slate-700">{copy.sourcesIntro}</p><ul className="mt-4 space-y-3 text-sm text-slate-700">{copy.sources.map((reference) => <li key={reference.href} className="rounded-2xl border border-slate-100 bg-white/70 p-4"><cite className="not-italic"><a href={reference.href} target="_blank" rel="noreferrer" className="text-base font-semibold text-indigo-600 transition hover:text-indigo-500">{reference.label}</a></cite><p className="mt-1 text-sm text-slate-600">{reference.description}</p></li>)}</ul></GlassCard></Reveal></section>
        <section className="pt-12"><Reveal><GlassCard className="flex flex-col gap-6 border border-white/40 bg-white/85 p-6 shadow-xl backdrop-blur sm:flex-row sm:items-center sm:justify-between"><div className="max-w-2xl"><p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">{copy.nextStepEyebrow}</p><h2 className="mt-3 text-2xl font-semibold text-slate-900">{copy.nextStepTitle}</h2><p className="mt-2 text-sm text-slate-700">{copy.nextStepBody}</p></div><div className="flex flex-col gap-3 sm:items-end"><ShimmerButton href={`${prefix}/contact?topic=use-case-headset-spacer-racefiets`}>{copy.nextStepPrimary}</ShimmerButton><Link href={`${prefix}/portfolio`} className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">{copy.nextStepSecondary}</Link></div></GlassCard></Reveal></section>
        <div className="pt-12"><BlogReadMore /></div>
        <div className="pt-12"><BlogFaq title={faq.title} items={faq.items} inLanguage={copy.inLanguage} mainEntityOfPage={copy.canonical} /></div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
        <BlogAuthorNote locale={locale} />
      </article>
    </main>
  )
}
