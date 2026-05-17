import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  AlertTriangle,
  BadgeCheck,
  Camera,
  CheckCircle2,
  Clock3,
  Cuboid,
  FileCheck2,
  Layers3,
  Move3D,
  ScanLine,
  ShieldCheck,
  Wrench,
} from "lucide-react"

import ContentTableOfContents from "@/components/ContentTableOfContents"
import Faq from "@/components/Faq"
import GlassCard from "@/components/GlassCard"
import HeroTrustBar, { type HeroTrustItem } from "@/components/HeroTrustBar"
import LeadTimeStatus from "@/components/LeadTimeStatus"
import Parallax from "@/components/Parallax"
import QuickContactActions from "@/components/QuickContactActions"
import ReadMoreLinks from "@/components/ReadMoreLinks"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import {
  SITE,
  buildBreadcrumbSchema,
  buildFaqPageSchema,
  buildHowToSchema,
  buildImageObjectSchema,
  buildLocalBusinessSchema,
  buildOfferCatalog,
  buildServiceSchema,
} from "@/lib/seo"
import { SCAN_PRICES, formatScanPrice } from "@/lib/scanning-prices"
import { localizeHref } from "@/lib/i18n/paths"
import type { Locale } from "@/lib/i18n/locales"

const datePublished = "2026-05-18"
const dateModified = "2026-05-18"
const scannerImage = "/images/CR-Scan_Otter_3.webp"

const NL_METADATA: Metadata = {
  title: "3D scannen in Belgie | Scan-to-print vanaf EUR 45",
  description:
    "Lokale 3D scanservice voor onderdelen, prototypes, decor en persoonsscans. Intake gratis, scan + mesh vanaf EUR 45, vanuit Herzele.",
  alternates: {
    canonical: "https://www.x3dprints.be/3d-scannen/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/3d-scannen/",
      "en-BE": "https://www.x3dprints.be/en/3d-scannen/",
      "x-default": "https://www.x3dprints.be/3d-scannen/",
    },
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
  },
  openGraph: {
    title: "3D scannen in Belgie | X3DPrints",
    description:
      "Van object naar 3D-bestand zonder gedoe. Scan-to-print voor onderdelen, prototypes, decor, persoonsscans en reverse engineering.",
    url: "https://www.x3dprints.be/3d-scannen/",
    images: [
      {
        url: scannerImage,
        width: 1600,
        height: 1600,
        alt: "CR-Scan Otter 3D scanner voor 3D scanning bij X3DPrints",
      },
    ],
    locale: "nl_BE",
    siteName: "X3DPrints",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D scannen in Belgie",
    description:
      "Lokale scan-to-print service voor onderdelen, prototypes, decor en persoonsscans. Intake gratis, scan vanaf EUR 45.",
    images: [scannerImage],
  },
  keywords: [
    "3D scanning Belgie",
    "3D scan service Herzele",
    "3D scannen voor 3D printen",
    "3D scannen Belgie",
    "scan-to-print Belgie",
    "reverse engineering 3D scan",
    "object laten 3D scannen",
    "persoonsscan 3D",
    "3D scan buste",
    "scan naar CAD",
  ],
}

export const metadata: Metadata = NL_METADATA

type RouteCopy = typeof SCANNING_COPY_NL

const SCANNING_COPY_NL = {
  localeName: "nl-BE",
  pageUrl: "https://www.x3dprints.be/3d-scannen/",
  breadcrumb: {
    home: "Home",
    services: "Diensten",
    current: "3D scannen",
  },
  hero: {
    eyebrow: "Nieuwe service",
    title: "3D scannen in Belgie: van object naar 3D-bestand of print",
    intro:
      "Heb je het object nog, maar niet het 3D-model? X3DPrints is je lokale scan-to-print partner voor onderdelen, prototypes, decor en persoonsscans, met transparante vanafprijzen en snelle levering in Belgie.",
    detail:
      "Van object naar 3D-bestand, zonder gedoe. Bij elke scan krijg je het afgesproken digitale scanbestand mee, zodat je later opnieuw kan printen, laten aanpassen of archiveren. Foto's dienen eerst om te beoordelen of je object scanbaar is en welke route het meest logisch is. Voor de effectieve scan moet het fysieke object op afspraak langskomen.",
    quoteHref:
      "/contact?topic=3d-scanning&quote=Ik%20wil%20een%20object%20laten%203D%20scannen",
    primaryCta: "Vraag gratis scan-intake aan",
    secondaryCta: "Bekijk 3D modelleren",
    tertiaryCta: "Portfolio bekijken",
    lastUpdated: "Laatst bijgewerkt: 18 mei 2026",
    imageAlt: "CR-Scan Otter 3D scanner als parallax beeld op de 3D scanning servicepagina",
  },
  heroFacts: [
    { icon: ScanLine, label: "Input", value: "Fysiek object of onderdeel" },
    { icon: Clock3, label: "Vanafprijs", value: "Intake gratis, scan vanaf EUR 45" },
    { icon: Cuboid, label: "Output", value: "Mesh, CAD-route of printklaar advies" },
  ] satisfies HeroTrustItem[],
  toc: [
    { id: "scan-fit", label: "Wanneer 3D scanning past" },
    { id: "scan-workflow", label: "Workflow van object naar bestand" },
    { id: "scan-output", label: "Welke output krijg je?" },
    { id: "scan-examples", label: "Realistische voorbeelden" },
    { id: "scan-limits", label: "Grenzen, prijzen en voorbereiding" },
    { id: "scan-faq", label: "Veelgestelde vragen" },
    { id: "scan-sources", label: "Bronnen en referenties" },
  ],
  fit: {
    eyebrow: "Scan-to-print",
    title: "Lokale 3D scanservice voor onderdelen, decor en persoonsscans",
    intro:
      "3D scanning is vooral nuttig wanneer de vorm lastig te meten is, het onderdeel niet meer leverbaar is of je een bestaand object wil gebruiken als basis voor reverse engineering, archivering, personalisatie of 3D printen.",
    cards: [
      {
        icon: Wrench,
        title: "Reserveonderdelen en herstel",
        body:
          "Onderdeel stuk of niet meer leverbaar? We scannen het bestaande stuk en leveren een bruikbaar 3D-model of basis voor reverse engineering en 3D-print.",
      },
      {
        icon: Cuboid,
        title: "Kunst, decor en objecten",
        body:
          "Een bestaand object digitaliseren voor reproductie, archivering of personalisatie. Geschikt voor kleine en middelgrote objecten in studio of op afspraak.",
      },
      {
        icon: Camera,
        title: "Persoonsscans en bustes",
        body:
          "Voor bustes, figuren en eventtoepassingen leveren we nette digitale bestanden met optionele visuele cleanup en koppeling naar 3D print.",
      },
      {
        icon: Layers3,
        title: "Prototypes en scan-to-print",
        body:
          "Bestaande behuizingen, tools of samples vastleggen om sneller naar CAD, testprint of kleine serie te gaan.",
      },
    ],
  },
  routeMatrix: {
    title: "Kies de juiste scanroute",
    intro:
      "Niet elk object moet hetzelfde traject volgen. Deze matrix helpt om meteen de juiste verwachting te zetten voor prijs, timing en eindbestand.",
    headers: {
      situation: "Situatie",
      route: "Beste route",
      output: "Output",
      attention: "Aandachtspunt",
    },
    rows: [
      {
        situation: "Je hebt een kapot kunststof onderdeel",
        route: "Scan + CAD-heropbouw",
        output: "STEP/STL voor testprint",
        attention: "Kritieke passing wordt nagemeten en niet enkel uit de scan gehaald.",
      },
      {
        situation: "Je wil een organische vorm kopieren",
        route: "Scan + mesh cleanup",
        output: "STL/OBJ/PLY mesh",
        attention: "Perfect glad of transparant oppervlak kan voorbereiding vragen.",
      },
      {
        situation: "Je wil een persoonsscan of buste",
        route: "Scan + visuele cleanup + printadvies",
        output: "Clean mesh voor buste, figuur of eventtoepassing",
        attention: "Stabiele pose, kleding, haar en gewenste afwerking bepalen het resultaat.",
      },
      {
        situation: "Je hebt een behuizing of kap nodig",
        route: "Scan als referentie + nieuw CAD-model",
        output: "Printbaar ontwerp met wanddikte en toleranties",
        attention: "Binnengeometrie die niet zichtbaar is, moet apart gemeten of ontworpen worden.",
      },
      {
        situation: "Je wil weten of scannen haalbaar is",
        route: "Foto's + haalbaarheidscheck",
        output: "Eerlijk scanadvies voor offerte",
        attention: "Foto's zijn enkel voor beoordeling; voor de echte scan moet het object fysiek langskomen.",
      },
    ],
  },
  workflow: {
    eyebrow: "Werkwijze",
    title: "Van fysiek object naar bruikbaar digitaal bestand",
    intro:
      "De workflow combineert scanning, mesh cleanup en CAD-ervaring. Zo blijft het eindresultaat afgestemd op de toepassing: visualisatie, reverse engineering of 3D printen.",
    steps: [
      {
        icon: Camera,
        title: "1. Foto's voor haalbaarheidscheck",
        body:
          "Stuur foto's, afmetingen, materiaal, gewenste output en wat het onderdeel moet doen. Op basis daarvan bepalen we of scannen zinvol is; de echte scan gebeurt pas wanneer je met het object langskomt.",
      },
      {
        icon: ScanLine,
        title: "2. Scanvoorbereiding en capture",
        body:
          "Het object wordt gepositioneerd en in meerdere passes gescand. Matte, stabiele oppervlakken geven doorgaans de beste basis.",
      },
      {
        icon: FileCheck2,
        title: "3. Mesh cleanup en controle",
        body:
          "De scan wordt opgeschoond, uitgelijnd en gecontroleerd op gaten, ruis en bruikbaarheid voor de volgende stap.",
      },
      {
        icon: Move3D,
        title: "4. CAD of print-route",
        body:
          "Afhankelijk van het doel leveren we een mesh, bouwen we CAD opnieuw op of plannen we een testprint met materiaaladvies.",
      },
    ],
  },
  output: {
    title: "Welke output kan je verwachten?",
    intro:
      "Een scan is geen automatisch perfect CAD-bestand. Daarom spreken we vooraf af welke output echt nodig is voor je doel.",
    items: [
      {
        title: "Meshbestand",
        body:
          "STL, OBJ of PLY als scanresultaat voor visualisatie, referentie of organische vormen. Dit digitale scanbestand krijg je mee, zodat je het later opnieuw kan gebruiken.",
      },
      {
        title: "CAD-heropbouw",
        body:
          "Een nieuw model op basis van de scan, foto's en metingen. Beste keuze voor schroefpunten, klikpassingen, behuizingen en functionele onderdelen.",
      },
      {
        title: "Printklaar traject",
        body:
          "Scan, CAD waar nodig, materiaaladvies en testprint. Ideaal als je het onderdeel uiteindelijk opnieuw wil laten maken.",
      },
      {
        title: "Texture en visuele cleanup",
        body:
          "Voor decor, kunstobjecten en persoonsscans kunnen zichtbare zones netjes opgeschoond worden zodat het bestand beter bruikbaar is voor presentatie of print.",
      },
      {
        title: "Scanrapport in gewone taal",
        body:
          "Heldere feedback over wat bruikbaar is, welke zones twijfelachtig zijn en welke vervolgstap technisch en budgettair het meest logisch is.",
      },
    ],
  },
  examples: {
    eyebrow: "Voorbeelden",
    title: "Realistische projecten die goed verkopen",
    intro:
      "3D scanning wordt commercieel interessant wanneer je tijd wint, downtime beperkt, een object kan personaliseren of een bestaand product sneller naar CAD en testprint brengt zonder meteen matrijzen of grote toolingkosten.",
    items: [
      {
        title: "Reserveonderdeel dat niet meer leverbaar is",
        body:
          "Scan een kap, knop, clip of houder, herbouw kritieke passing in CAD en maak een testprint om stilstand of wegwerp te vermijden.",
      },
      {
        title: "Kunstobject, beeld of decorstuk",
        body:
          "Digitaliseer een object voor reproductie, archivering, schaalverkleining, personalisatie of een decoratieve 3D print.",
      },
      {
        title: "Persoonsscan voor buste of figuur",
        body:
          "Maak een digitale basis voor een buste, miniatuur of eventfiguur met optionele cleanup en advies over printformaat.",
      },
      {
        title: "Prototype of cover zonder CAD",
        body:
          "Gebruik de scan als contourreferentie en bouw een nieuw CAD-model met bevestigingen, wanddikte en service-openingen.",
      },
      {
        title: "Retail display of productdummy",
        body:
          "Leg productvormen vast als referentie voor displays, pasmallen of dummy's die verkoop, events of fotografie ondersteunen.",
      },
      {
        title: "Montagemal rond bestaand object",
        body:
          "Scan de buitencontour en ontwerp een fixture, houder of controlemal die sneller en consistenter assembleren mogelijk maakt.",
      },
      {
        title: "Productonderdeel voor kleine serie",
        body:
          "Scan een bestaand sample, zet het om naar een reproduceerbaar model en test een kleine reeks zonder dure startkosten.",
      },
    ],
  },
  limits: {
    eyebrow: "Eerlijk advies",
    title: "Wat 3D scanning wel en niet oplost",
    intro:
      "De sterkste scanprojecten starten met goede verwachtingen. Een scanner ziet oppervlakken, geen verborgen binnenkant, en een mesh is niet hetzelfde als een maatvast CAD-model.",
    items: [
      "Transparante, glanzende, zeer donkere of spiegelende oppervlakken kunnen voorbereiding of een alternatieve aanpak vragen.",
      "Verborgen binnengeometrie, schroefdraad en snapfits moeten vaak apart gemeten of in CAD hertekend worden.",
      "Een scanmesh is bruikbaar als referentie, maar voor functionele onderdelen is CAD-heropbouw vaak betrouwbaarder.",
      "Kritieke maten, passing en belasting worden altijd besproken voor we een printtraject voorstellen.",
    ],
    ctaTitle: "Heb je het object nog, maar niet het 3D-model?",
    ctaBody:
      "Stuur enkele foto's, de grootste afmeting en wat je met het bestand wil doen. Die foto's zijn alleen voor de haalbaarheidscheck; voor de effectieve scan kom je met het object langs op afspraak.",
  },
  pricing: {
    title: "Transparante vanafprijzen voor 3D scanning",
    body:
      "De intake is gratis. Onderstaande scanprijzen zijn richtprijzen voor geschikte objecten met basis cleanup. CAD-heropbouw, texture cleanup, 3D printen en complexe voorbereiding worden vooraf apart afgestemd.",
    cards: [
      { title: "Foto-check gratis", body: "Foto's, afmetingen en doel checken om scanbaarheid te beoordelen. Voor de scan zelf moet het object fysiek langskomen." },
      { title: "Scanprijzen vanaf EUR 45", body: "Heldere prijs per objecttype: klein, medium, groot, technisch, buste, full body of eventscan. Het afgesproken digitale scanbestand is inbegrepen en scan/CAD staat als eenmalige post op de offerte." },
      { title: "CAD/print apart", body: "CAD-heropbouw, texture cleanup en 3D printen worden apart begroot wanneer het nodig is." },
    ],
  },
  faqTitle: "Veelgestelde vragen over 3D scanning",
  faq: [
    {
      q: "Kan ik elk object 3D laten scannen?",
      a: "Niet elk object is even geschikt. Matte, stabiele objecten met zichtbare details werken het best. Transparante, spiegelende of zeer donkere oppervlakken kunnen voorbereiding of een andere aanpak vragen.",
    },
    {
      q: "Krijg ik na een scan automatisch een STEP-bestand?",
      a: "Nee. Een scan levert in de basis een mesh op. Voor een STEP-bestand of maatvast CAD-model is meestal CAD-heropbouw nodig op basis van scan, foto's en metingen.",
    },
    {
      q: "Krijg ik mijn 3D scanbestand mee?",
      a: "Ja. Bij elke scan krijg je het afgesproken digitale scanbestand mee, meestal als STL, OBJ of PLY. Zo kan je het later opnieuw laten printen, laten aanpassen of archiveren. Een STEP-bestand vraagt meestal extra CAD-heropbouw.",
    },
    {
      q: "Is 3D scanning nauwkeurig genoeg voor vervangstukken?",
      a: "Voor veel vervangstukken is scanning nuttig als referentie, maar kritieke maten worden apart gecontroleerd. Klikpassingen, schroefdraad en montagevlakken modelleren we meestal opnieuw in CAD.",
    },
    {
      q: "Kan ik de scan meteen laten 3D printen?",
      a: "Soms wel, vooral bij organische of decoratieve vormen. Functionele onderdelen worden meestal eerst opgeschoond of opnieuw opgebouwd zodat wanddikte, toleranties en printorientatie kloppen.",
    },
    {
      q: "Doen jullie ook persoonsscans of bustes?",
      a: "Ja, voor bustes, figuren en eventtoepassingen. We bespreken vooraf houding, kleding, gewenste schaal, visuele cleanup en of het einddoel een digitaal bestand, buste of printbaar figuurtje is.",
    },
    {
      q: "Wat kost 3D scannen ongeveer?",
      a: "De intake is gratis. Scanprijzen starten vanaf EUR 45 en het afgesproken digitale scanbestand is inbegrepen. Scannen, CAD-heropbouw en texture cleanup staan als eenmalige posten op de offerte en worden niet per geprint stuk vermenigvuldigd.",
    },
    {
      q: "Wat moet ik meesturen voor een offerte?",
      a: "Stuur foto's rondom, de grootste afmeting, het materiaal of oppervlak, wat er kritisch moet passen en welk eindbestand je verwacht: mesh, CAD of print. Foto's dienen enkel voor de haalbaarheidscheck; voor de scan zelf moet je met het object langskomen.",
    },
    {
      q: "Doen jullie ook reverse engineering voor bedrijven?",
      a: "Ja, vooral voor prototypes, hulpmiddelen, covers, jigs, fixtures en kleine technische onderdelen. Voor veiligheidskritische of gecertificeerde onderdelen spreken we de scope expliciet af.",
    },
  ],
  readMore: {
    title: "Plan je scan-naar-print traject",
    intro:
      "Gebruik deze links om te beslissen of je moet scannen, modelleren, materiaal kiezen of meteen een offerte starten.",
  },
  referencesIntro:
    "Deze bronnen gebruiken we voor scannercontext, terminologie en CAD/3D-print workflow. Concrete projectresultaten hangen altijd af van object, oppervlak en doel.",
  references: [
    { label: "Creality CR-Scan Otter productinformatie", url: "https://store.creality.com/products/cr-scan-otter-3d-scanner" },
    { label: "ISO/ASTM 52900 terminologie voor additive manufacturing", url: "https://www.astm.org/f2997-13r21.html" },
    { label: "Autodesk Fusion 360 productpagina voor CAD-workflows", url: "https://www.autodesk.com/products/fusion-360/overview" },
  ],
  schema: {
    serviceName: "3D scanning service",
    catalogName: "X3DPrints 3D scanning diensten",
    description:
      "Lokale 3D scanning vanuit Herzele voor onderdelen, prototypes, decor, persoonsscans, mesh cleanup, CAD-heropbouw en scan-to-print projecten.",
    areaServed: "Belgie en Oost-Vlaanderen",
    offersName: "3D scanning en scan-to-print diensten",
    howToName: "Hoe verloopt een 3D scan traject bij X3DPrints?",
    howToDescription:
      "Van intake en scanvoorbereiding naar mesh cleanup, CAD-heropbouw en eventueel 3D printen.",
  },
  offers: [
    {
      serviceName: "3D scan intake",
      price: "EUR 0",
      description: "Foto's, afmetingen en doel checken voor scanbaarheid en beste vervolgstap. Object langskomen voor effectieve scan.",
    },
    {
      serviceName: "3D scan en mesh cleanup vanafprijs",
      price: "EUR 45",
      description: "Vanaf EUR 45 voor scanning en opschonen van een meshbestand, afhankelijk van object en gewenste output.",
    },
    {
      serviceName: "Scan-to-print of CAD-heropbouw",
      price: "EUR 45",
      description: "Vanaf EUR 45/uur voor CAD-heropbouw, DFM-review, texture cleanup of testprinttraject na de scan.",
    },
  ],
}

const SCANNING_COPY_EN: RouteCopy = {
  localeName: "en-BE",
  pageUrl: "https://www.x3dprints.be/en/3d-scannen/",
  breadcrumb: {
    home: "Home",
    services: "Services",
    current: "3D scanning",
  },
  hero: {
    eyebrow: "New service",
    title: "3D scanning in Belgium: from object to 3D file or print",
    intro:
      "Still have the object, but not the 3D model? X3DPrints is your local scan-to-print partner for parts, prototypes, decor and person scans, with transparent starting prices and fast delivery in Belgium.",
    detail:
      "From object to 3D file, without the hassle. Every scan includes the agreed digital scan file, so you can print, revise or archive it later. Photos are used first to assess whether your object is scannable and which route makes sense. For the actual scan, the physical object must be brought in by appointment.",
    quoteHref:
      "/contact?topic=3d-scanning&quote=I%20want%20to%20have%20an%20object%203D%20scanned",
    primaryCta: "Request free scan intake",
    secondaryCta: "View 3D modelling",
    tertiaryCta: "View portfolio",
    lastUpdated: "Last updated: May 18, 2026",
    imageAlt: "CR-Scan Otter 3D scanner as parallax image on the 3D scanning service page",
  },
  heroFacts: [
    { icon: ScanLine, label: "Input", value: "Physical object or part" },
    { icon: Clock3, label: "Starting price", value: "Free intake, scan from EUR 45" },
    { icon: Cuboid, label: "Output", value: "Mesh, CAD route or print advice" },
  ],
  toc: [
    { id: "scan-fit", label: "When 3D scanning fits" },
    { id: "scan-workflow", label: "Workflow from object to file" },
    { id: "scan-output", label: "What output do you get?" },
    { id: "scan-examples", label: "Realistic examples" },
    { id: "scan-limits", label: "Limits, pricing and preparation" },
    { id: "scan-faq", label: "FAQ" },
    { id: "scan-sources", label: "Sources and references" },
  ],
  fit: {
    eyebrow: "Scan-to-print",
    title: "Local 3D scanning service for parts, decor and person scans",
    intro:
      "3D scanning is useful when a shape is hard to measure, the part is no longer available or you want to use an existing object for reverse engineering, archiving, personalisation or 3D printing.",
    cards: [
      {
        icon: Wrench,
        title: "Replacement parts and repair",
        body:
          "Broken part or no longer available? We scan the existing piece and deliver a usable 3D model or base for reverse engineering and 3D printing.",
      },
      {
        icon: Cuboid,
        title: "Art, decor and objects",
        body:
          "Digitise an existing object for reproduction, archiving or personalisation. Useful for small and medium objects in studio or by appointment.",
      },
      {
        icon: Camera,
        title: "Person scans and busts",
        body:
          "For busts, figures and event use, we deliver clean digital files with optional visual cleanup and a route to 3D printing.",
      },
      {
        icon: Layers3,
        title: "Prototypes and scan-to-print",
        body:
          "Capture existing enclosures, tools or samples to move faster toward CAD, a test print or a short run.",
      },
    ],
  },
  routeMatrix: {
    title: "Choose the right scan route",
    intro:
      "Not every object needs the same path. This matrix sets the right expectation for price, timing and final file.",
    headers: {
      situation: "Situation",
      route: "Best route",
      output: "Output",
      attention: "Attention point",
    },
    rows: [
      {
        situation: "You have a broken plastic part",
        route: "Scan + CAD rebuild",
        output: "STEP/STL for test print",
        attention: "Critical fit is measured separately and not taken from the scan alone.",
      },
      {
        situation: "You want to copy an organic shape",
        route: "Scan + mesh cleanup",
        output: "STL/OBJ/PLY mesh",
        attention: "Very smooth or transparent surfaces may require preparation.",
      },
      {
        situation: "You want a person scan or bust",
        route: "Scan + visual cleanup + print advice",
        output: "Clean mesh for a bust, figure or event use",
        attention: "Stable pose, clothing, hair and desired finish influence the result.",
      },
      {
        situation: "You need an enclosure or cover",
        route: "Scan as reference + new CAD model",
        output: "Printable design with wall thickness and tolerances",
        attention: "Interior geometry that is not visible must be measured or designed separately.",
      },
      {
        situation: "You want to know if scanning is feasible",
        route: "Photos + feasibility check",
        output: "Honest scan advice for quote",
        attention: "Photos are only for assessment; the real scan requires the physical object to be brought in.",
      },
    ],
  },
  workflow: {
    eyebrow: "Workflow",
    title: "From physical object to useful digital file",
    intro:
      "The workflow combines scanning, mesh cleanup and CAD experience. The final result stays aligned with the use case: visualisation, reverse engineering or 3D printing.",
    steps: [
      {
        icon: Camera,
        title: "1. Photos for feasibility check",
        body:
          "Send photos, dimensions, material, desired output and what the part needs to do. We use that to decide if scanning is worthwhile; the actual scan only happens when the object is brought in.",
      },
      {
        icon: ScanLine,
        title: "2. Scan prep and capture",
        body:
          "The object is positioned and scanned in multiple passes. Matte, stable surfaces usually provide the best base.",
      },
      {
        icon: FileCheck2,
        title: "3. Mesh cleanup and check",
        body:
          "The scan is cleaned, aligned and checked for holes, noise and usefulness for the next step.",
      },
      {
        icon: Move3D,
        title: "4. CAD or print route",
        body:
          "Depending on the goal we deliver a mesh, rebuild CAD or plan a test print with material advice.",
      },
    ],
  },
  output: {
    title: "What output can you expect?",
    intro:
      "A scan is not automatically a perfect CAD file. That is why we agree upfront which output is actually needed for your goal.",
    items: [
      {
        title: "Mesh file",
        body:
          "STL, OBJ or PLY scan result for visualisation, reference or organic shapes. You receive this digital scan file, so it can be reused later.",
      },
      {
        title: "CAD rebuild",
        body:
          "A new model based on the scan, photos and measurements. Best for screw points, snap fits, enclosures and functional parts.",
      },
      {
        title: "Print-ready route",
        body:
          "Scan, CAD where needed, material advice and test print. Ideal when you want the part recreated physically.",
      },
      {
        title: "Texture and visual cleanup",
        body:
          "For decor, art objects and person scans, visible zones can be cleaned up so the file is more useful for presentation or printing.",
      },
      {
        title: "Plain-language scan report",
        body:
          "Clear feedback on what is usable, which zones are uncertain and which next step makes the most technical and budget sense.",
      },
    ],
  },
  examples: {
    eyebrow: "Examples",
    title: "Realistic projects that sell well",
    intro:
      "3D scanning becomes commercially useful when it saves time, limits downtime, personalises an object or moves an existing product into CAD and test printing without immediate tooling or mould costs.",
    items: [
      {
        title: "Replacement part no longer available",
        body:
          "Scan a cover, knob, clip or holder, rebuild critical fit in CAD and make a test print to reduce downtime or avoid throwing the full product away.",
      },
      {
        title: "Art object, sculpture or decor piece",
        body:
          "Digitise an object for reproduction, archiving, scaling, personalisation or a decorative 3D print.",
      },
      {
        title: "Person scan for bust or figure",
        body:
          "Create a digital base for a bust, miniature or event figure with optional cleanup and advice on print size.",
      },
      {
        title: "Prototype or cover without CAD",
        body:
          "Use the scan as contour reference and build a new CAD model with fasteners, wall thickness and service openings.",
      },
      {
        title: "Retail display or product dummy",
        body:
          "Capture product shapes as reference for displays, fit dummies or sales props for retail, events and photography.",
      },
      {
        title: "Assembly fixture around an existing object",
        body:
          "Scan the outside contour and design a fixture, holder or check gauge that supports faster and more consistent assembly.",
      },
      {
        title: "Small-batch product part",
        body:
          "Scan an existing sample, convert it into a repeatable model and test a short run without heavy startup cost.",
      },
    ],
  },
  limits: {
    eyebrow: "Honest advice",
    title: "What 3D scanning does and does not solve",
    intro:
      "The best scan projects start with clear expectations. A scanner sees surfaces, not hidden interiors, and a mesh is not the same as a dimensionally controlled CAD model.",
    items: [
      "Transparent, glossy, very dark or mirror-like surfaces can require preparation or an alternative approach.",
      "Hidden interior geometry, threads and snap fits often need separate measuring or CAD redesign.",
      "A scan mesh is useful as reference, but CAD rebuild is often more reliable for functional parts.",
      "Critical dimensions, fit and load are always discussed before we propose a print route.",
    ],
    ctaTitle: "Still have the object, but not the 3D model?",
    ctaBody:
      "Send a few photos, the largest dimension and what you want to do with the file. Those photos are only for the feasibility check; for the actual scan you bring the object in by appointment.",
  },
  pricing: {
    title: "Transparent starting prices for 3D scanning",
    body:
      "Intake is free. The scan prices below are guideline prices for suitable objects with basic cleanup. CAD rebuild, texture cleanup, 3D printing and complex preparation are scoped separately upfront.",
    cards: [
      { title: "Photo check is free", body: "Photos, dimensions and goal are checked to assess scannability. The physical object must be brought in for the scan itself." },
      { title: "Scan prices from EUR 45", body: "Clear price per object type: small, medium, large, technical, bust, full body or event scan. The agreed digital scan file is included and scan/CAD work is a one-time quote item." },
      { title: "CAD/print separate", body: "CAD rebuild, texture cleanup and 3D printing are quoted separately when needed." },
    ],
  },
  faqTitle: "Frequently asked questions about 3D scanning",
  faq: [
    {
      q: "Can every object be 3D scanned?",
      a: "Not every object is equally suitable. Matte, stable objects with visible detail work best. Transparent, mirror-like or very dark surfaces can require preparation or another approach.",
    },
    {
      q: "Do I automatically get a STEP file after scanning?",
      a: "No. A scan primarily creates a mesh. For a STEP file or dimensionally controlled CAD model, CAD rebuild is usually needed based on scan, photos and measurements.",
    },
    {
      q: "Do I receive my 3D scan file?",
      a: "Yes. Every scan includes the agreed digital scan file, usually as STL, OBJ or PLY. You can reuse it later for printing, revisions or archiving. A STEP file usually requires extra CAD rebuild.",
    },
    {
      q: "Is 3D scanning accurate enough for replacement parts?",
      a: "For many replacement parts scanning is useful as reference, but critical dimensions are checked separately. Snap fits, threads and mounting surfaces are usually rebuilt in CAD.",
    },
    {
      q: "Can I have the scan 3D printed immediately?",
      a: "Sometimes, especially for organic or decorative shapes. Functional parts are usually cleaned up or rebuilt first so wall thickness, tolerances and print orientation make sense.",
    },
    {
      q: "Do you scan people or make busts?",
      a: "Yes, for busts, figures and event use. We discuss pose, clothing, desired scale, visual cleanup and whether the end goal is a digital file, bust or printable figure.",
    },
    {
      q: "What does 3D scanning cost?",
      a: "The intake is free. Scan prices start from EUR 45 and the agreed digital scan file is included. Scanning, CAD rebuild and texture cleanup are one-time quote items and are not multiplied by printed quantity.",
    },
    {
      q: "What should I send for a quote?",
      a: "Send photos from all sides, the largest dimension, material or surface, what needs to fit and which final output you expect: mesh, CAD or print. Photos are only for the feasibility check; the object must be brought in for the scan itself.",
    },
    {
      q: "Do you offer reverse engineering for businesses?",
      a: "Yes, mainly for prototypes, aids, covers, jigs, fixtures and small technical parts. For safety-critical or certified parts we define the scope explicitly.",
    },
  ],
  readMore: {
    title: "Plan your scan-to-print route",
    intro:
      "Use these links to decide whether you should scan, model, choose a material or start a quote directly.",
  },
  referencesIntro:
    "These sources guide scanner context, terminology and CAD/3D printing workflow. Concrete project results always depend on object, surface and goal.",
  references: [
    { label: "Creality CR-Scan Otter product information", url: "https://store.creality.com/products/cr-scan-otter-3d-scanner" },
    { label: "ISO/ASTM 52900 terminology for additive manufacturing", url: "https://www.astm.org/f2997-13r21.html" },
    { label: "Autodesk Fusion 360 product page for CAD workflows", url: "https://www.autodesk.com/products/fusion-360/overview" },
  ],
  schema: {
    serviceName: "3D scanning service",
    catalogName: "X3DPrints 3D scanning services",
    description:
      "Local 3D scanning from Herzele for parts, prototypes, decor, person scans, mesh cleanup, CAD rebuild and scan-to-print projects.",
    areaServed: "Belgium and East Flanders",
    offersName: "3D scanning and scan-to-print services",
    howToName: "How does a 3D scan project work at X3DPrints?",
    howToDescription:
      "From intake and scan preparation to mesh cleanup, CAD rebuild and optional 3D printing.",
  },
  offers: [
    {
      serviceName: "3D scan intake",
      price: "EUR 0",
      description: "Photos, dimensions and goal checked for scannability and best next step. Physical object required for actual scan.",
    },
    {
      serviceName: "3D scan and mesh cleanup starting price",
      price: "EUR 45",
      description: "From EUR 45 for scanning and cleaning a mesh file, depending on object and desired output.",
    },
    {
      serviceName: "Scan-to-print or CAD rebuild",
      price: "EUR 45",
      description: "From EUR 45/hour for CAD rebuild, DFM review, texture cleanup or test print route after scanning.",
    },
  ],
}

function resolveLocaleOverride(props: unknown): Locale {
  if (typeof props !== "object" || props === null) {
    return "nl"
  }
  const localeOverride = (props as { localeOverride?: unknown }).localeOverride
  return localeOverride === "en" ? "en" : "nl"
}

function stripHtml(input: string) {
  return input.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim()
}

export default function Page(props: unknown) {
  const locale = resolveLocaleOverride(props)
  const isEn = locale === "en"
  const copy = isEn ? SCANNING_COPY_EN : SCANNING_COPY_NL
  const localize = (href: string) => localizeHref(href, locale)
  const inLanguage = isEn ? "en-BE" : "nl-BE"
  const pageUrl = copy.pageUrl
  const quoteHref = localize(copy.hero.quoteHref)
  const localizedServiceUrl = localize("/services")
  const scanPriceRows = SCAN_PRICES.map((item) => ({
    ...item,
    label: isEn ? item.labelEn : item.labelNl,
    description: isEn ? item.descriptionEn : item.descriptionNl,
    priceLabel: formatScanPrice(item.price),
  }))
  const structuredOffers = [
    ...copy.offers.slice(0, 1),
    ...scanPriceRows.map((item) => ({
      serviceName: item.label,
      price: formatScanPrice(item.price),
      description: item.description,
    })),
    ...copy.offers.slice(2, 3),
  ]

  const faqJsonLd = buildFaqPageSchema({
    inLanguage,
    mainEntityOfPage: pageUrl,
    items: copy.faq.map((item) => ({ q: item.q, a: stripHtml(item.a) })),
  })
  const catalogJsonLd = buildOfferCatalog(copy.schema.catalogName, structuredOffers.map((offer) => ({ ...offer, url: pageUrl })))
  const localBusinessJsonLd = buildLocalBusinessSchema({
    pageUrl,
    description: copy.schema.description,
    image: scannerImage,
    inLanguage,
    areaServed: copy.schema.areaServed,
    offersName: copy.schema.offersName,
    offers: structuredOffers.map((offer) => ({ ...offer, url: pageUrl })),
    priceRange: "EUR 0 - EUR 250+",
  })
  const serviceJsonLd = buildServiceSchema(
    copy.schema.serviceName,
    structuredOffers.map((offer) => ({ ...offer, url: pageUrl })),
    pageUrl,
    {
      description: copy.schema.description,
      inLanguage,
      mainEntityOfPage: pageUrl,
    },
  )
  const howToJsonLd = buildHowToSchema({
    name: copy.schema.howToName,
    description: copy.schema.howToDescription,
    inLanguage,
    mainEntityOfPage: pageUrl,
    url: pageUrl,
    toolNames: ["CR-Scan Otter 3D scanner", "CAD software", "3D printer"],
    supplyNames: ["Physical reference object", "Photos and dimensions", "Desired output brief"],
    steps: copy.workflow.steps.map((step, index) => ({
      position: index + 1,
      name: step.title.replace(/^\d+\.\s*/, ""),
      text: step.body,
    })),
  })
  const breadcrumbJsonLd = buildBreadcrumbSchema({
    id: `${pageUrl}#breadcrumb`,
    inLanguage,
    items: [
      { name: copy.breadcrumb.home, url: isEn ? `${SITE.url}/en/` : `${SITE.url}/` },
      { name: copy.breadcrumb.services, url: isEn ? `${SITE.url}/en/services/` : `${SITE.url}/services/` },
      { name: copy.breadcrumb.current, url: pageUrl },
    ],
  })
  const imageJsonLd = {
    "@context": "https://schema.org",
    ...buildImageObjectSchema({
      id: `${pageUrl}#scanner-image`,
      url: scannerImage,
      caption: copy.hero.imageAlt,
      description: copy.schema.description,
      inLanguage,
      representativeOfPage: true,
      creator: { "@type": "Organization", name: SITE.name, url: SITE.url },
      copyrightHolder: { "@type": "Organization", name: SITE.name, url: SITE.url },
    }),
  }
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: copy.hero.title,
    description: copy.schema.description,
    inLanguage,
    datePublished,
    dateModified,
    isPartOf: { "@id": `${SITE.url}#website` },
    primaryImageOfPage: { "@id": `${pageUrl}#scanner-image` },
    breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
  }

  return (
    <main className="relative overflow-clip bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,250,252,0.96),rgba(236,254,255,0.68)_35%,rgba(255,255,255,0.92)_72%)] dark:bg-[linear-gradient(180deg,rgba(2,6,23,0.98),rgba(15,23,42,0.88)_42%,rgba(2,6,23,0.98))]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(15,23,42,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.8)_1px,transparent_1px)] [background-size:44px_44px] dark:opacity-[0.12]" />
        <div className="absolute inset-x-0 top-0 h-[42rem] bg-[radial-gradient(70%_55%_at_72%_10%,rgba(34,211,238,0.22),transparent_70%)] dark:bg-[radial-gradient(70%_55%_at_72%_10%,rgba(14,165,233,0.18),transparent_70%)]" />
      </div>

      <section className="relative isolate px-6 pb-8 pt-20 sm:px-8 sm:pb-10 lg:px-12 lg:pb-10 lg:pt-24">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-y-0 right-0 w-full bg-[linear-gradient(90deg,rgba(248,250,252,0.98)_0%,rgba(248,250,252,0.94)_38%,rgba(248,250,252,0.38)_70%,rgba(248,250,252,0.08)_100%)] dark:bg-[linear-gradient(90deg,rgba(2,6,23,0.98)_0%,rgba(2,6,23,0.92)_42%,rgba(2,6,23,0.42)_72%,rgba(2,6,23,0.16)_100%)]" />
          <div className="scan-grid-motion absolute inset-y-4 right-[-18rem] w-[58rem] opacity-45 dark:opacity-30" />
          <div className="scan-sweep absolute inset-y-0 right-[-12rem] w-[22rem] opacity-60 dark:opacity-45" />
          <Parallax mode="page" range={760} offset={-80} className="scan-layer-slow absolute -right-32 top-6 h-[28rem] w-[48rem] opacity-40 sm:h-[34rem] lg:right-0 lg:h-[42rem]">
            <div className="absolute inset-0 bg-[conic-gradient(from_110deg_at_58%_44%,transparent_0deg,rgba(34,211,238,0.16)_54deg,transparent_92deg,rgba(99,102,241,0.12)_170deg,transparent_230deg)] [mask-image:radial-gradient(ellipse_at_center,black_0%,black_46%,transparent_72%)]" />
          </Parallax>
          <Parallax mode="page" range={820} offset={170} className="scan-layer-fast absolute -right-28 top-8 h-[30rem] w-[30rem] opacity-50 sm:h-[38rem] sm:w-[38rem] lg:right-8 lg:h-[46rem] lg:w-[46rem]">
            <div className="absolute inset-0 rounded-full border border-cyan-300/45 shadow-[inset_0_0_80px_rgba(34,211,238,0.14)] [background:repeating-radial-gradient(circle_at_center,rgba(34,211,238,0.18)_0_1px,transparent_1px_54px)] dark:border-cyan-300/20 dark:shadow-[inset_0_0_80px_rgba(56,189,248,0.08)]" />
          </Parallax>
          <Parallax mode="page" range={780} offset={120} className="absolute -right-36 top-20 h-[38rem] w-[38rem] opacity-30 sm:-right-28 sm:h-[44rem] sm:w-[44rem] lg:-right-10 lg:top-10 lg:h-[54rem] lg:w-[54rem] lg:opacity-75">
            <Image
              id="scanner-image"
              src={scannerImage}
              alt={copy.hero.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 54rem, 90vw"
              className="scanner-parallax-image object-contain drop-shadow-[0_32px_80px_rgba(15,23,42,0.24)] dark:drop-shadow-[0_34px_90px_rgba(56,189,248,0.14)]"
            />
          </Parallax>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent dark:from-slate-950" />
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.08fr_.92fr] lg:items-center">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-200/80 bg-cyan-50/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-800 shadow-sm backdrop-blur dark:border-cyan-300/20 dark:bg-cyan-400/10 dark:text-cyan-200">
              <ScanLine className="h-3.5 w-3.5" aria-hidden />
              {copy.hero.eyebrow}
            </p>
            <h1 className="mt-5 text-balance text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl lg:text-6xl">
              {copy.hero.title}
            </h1>
            <p className="mt-5 max-w-3xl text-pretty text-lg leading-8 text-slate-700 dark:text-slate-300">
              {copy.hero.intro}
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400">
              {copy.hero.detail}
            </p>
            <p className="mt-3 text-xs font-medium uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
              {copy.hero.lastUpdated}
            </p>
            <LeadTimeStatus locale={locale} className="mt-5 max-w-2xl" />
            <div className="mt-6 flex flex-wrap gap-3">
              <ShimmerButton
                href={quoteHref}
                event={{ action: "contact_start", category: "3d_scanning_hero", label: "scan_intake", value: 1 }}
              >
                {copy.hero.primaryCta}
              </ShimmerButton>
              <Link
                href={localize("/3d-modelleren")}
                className="inline-flex items-center justify-center rounded-xl border border-slate-200/80 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100 dark:hover:bg-slate-900"
              >
                {copy.hero.secondaryCta}
              </Link>
              <Link
                href={localize("/portfolio")}
                className="inline-flex items-center justify-center text-sm font-semibold text-indigo-700 transition hover:text-indigo-600 dark:text-indigo-300 dark:hover:text-indigo-200"
              >
                {copy.hero.tertiaryCta} <span aria-hidden className="ml-1">-&gt;</span>
              </Link>
            </div>
            <QuickContactActions
              locale={locale}
              trackingCategory="3d_scanning_hero"
              quoteHref={quoteHref}
              quoteLabelOverride={copy.hero.primaryCta}
              showQuote={false}
              className="mt-4"
            />
            <ContentTableOfContents title={isEn ? "Contents" : "Inhoud"} items={copy.toc} className="mt-6 max-w-2xl" />
          </Reveal>

          <Reveal delay={0.06}>
            <GlassCard className="border-slate-200/70 bg-white/78 p-5 shadow-[0_22px_70px_rgba(15,23,42,0.12)] dark:border-slate-700/70 dark:bg-slate-950/80">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
                {isEn ? "Scan route" : "Scanroute"}
              </p>
              <HeroTrustBar items={copy.heroFacts} className="mt-4" />
              <div className="mt-5 rounded-2xl border border-slate-200/80 bg-slate-50/90 p-4 text-sm text-slate-700 dark:border-slate-700/70 dark:bg-slate-900/80 dark:text-slate-300">
                <p className="font-semibold text-slate-900 dark:text-slate-50">
                  {isEn ? "Best first step" : "Beste eerste stap"}
                </p>
                <p className="mt-1">
                  {isEn
                    ? "Send photos from all sides plus the largest dimension to assess scannability first. For the real scan, the object still has to be brought in by appointment."
                    : "Stuur foto's rondom plus de grootste afmeting om eerst de scanbaarheid te beoordelen. Voor de echte scan moet het object nog op afspraak langskomen."}
                </p>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section id="scan-fit" className="scroll-mt-28 px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-700 dark:text-cyan-300">{copy.fit.eyebrow}</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl">
              {copy.fit.title}
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">{copy.fit.intro}</p>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {copy.fit.cards.map((card, index) => (
              <Reveal key={card.title} delay={index * 0.04}>
                <GlassCard className="h-full border-slate-200/70 bg-white/82 p-6 shadow-sm transition hover:-translate-y-1 dark:border-slate-700/70 dark:bg-slate-950/76">
                  <card.icon className="h-7 w-7 text-cyan-700 dark:text-cyan-300" aria-hidden />
                  <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-slate-50">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{card.body}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <GlassCard className="border-slate-200/70 bg-white/82 p-6 shadow-sm dark:border-slate-700/70 dark:bg-slate-950/76 sm:p-8">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">{copy.routeMatrix.title}</h2>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">{copy.routeMatrix.intro}</p>
              <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200/70 bg-white/90 dark:border-slate-700/70 dark:bg-slate-900/80">
                <table className="min-w-full text-left text-sm text-slate-700 dark:text-slate-300">
                  <caption className="sr-only">{copy.routeMatrix.title}</caption>
                  <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-900 dark:text-slate-400">
                    <tr>
                      <th className="px-4 py-3">{copy.routeMatrix.headers.situation}</th>
                      <th className="px-4 py-3">{copy.routeMatrix.headers.route}</th>
                      <th className="px-4 py-3">{copy.routeMatrix.headers.output}</th>
                      <th className="px-4 py-3">{copy.routeMatrix.headers.attention}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {copy.routeMatrix.rows.map((row) => (
                      <tr key={row.situation} className="border-t border-slate-200/70 dark:border-slate-700/70">
                        <td className="px-4 py-4 font-semibold text-slate-900 dark:text-slate-50">{row.situation}</td>
                        <td className="px-4 py-4">{row.route}</td>
                        <td className="px-4 py-4">{row.output}</td>
                        <td className="px-4 py-4">{row.attention}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section id="scan-workflow" className="scroll-mt-28 px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-700 dark:text-cyan-300">{copy.workflow.eyebrow}</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl">
              {copy.workflow.title}
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">{copy.workflow.intro}</p>
          </Reveal>
          <div className="grid gap-4 lg:grid-cols-4">
            {copy.workflow.steps.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.05}>
                <GlassCard className="h-full border-slate-200/70 bg-white/82 p-6 dark:border-slate-700/70 dark:bg-slate-950/76">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-200/80 bg-cyan-50 text-cyan-800 dark:border-cyan-300/20 dark:bg-cyan-400/10 dark:text-cyan-200">
                    <step.icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-slate-50">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{step.body}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="scan-output" className="scroll-mt-28 px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal>
            <div className="sticky top-24 rounded-3xl border border-slate-200/70 bg-slate-900 p-6 text-white shadow-[0_22px_70px_rgba(15,23,42,0.22)] dark:border-slate-700 sm:p-8">
              <ShieldCheck className="h-8 w-8 text-cyan-300" aria-hidden />
              <h2 className="mt-4 text-2xl font-semibold tracking-tight">{copy.output.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">{copy.output.intro}</p>
              <ShimmerButton href={quoteHref} className="mt-6" event={{ action: "contact_start", category: "3d_scanning_output", label: "quote", value: 1 }}>
                {copy.hero.primaryCta}
              </ShimmerButton>
            </div>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {copy.output.items.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.04}>
                <GlassCard className="h-full border-slate-200/70 bg-white/82 p-6 dark:border-slate-700/70 dark:bg-slate-950/76">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-300" aria-hidden />
                  <h3 className="mt-3 text-base font-semibold text-slate-900 dark:text-slate-50">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.body}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="scan-examples" className="scroll-mt-28 px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-700 dark:text-cyan-300">{copy.examples.eyebrow}</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl">
              {copy.examples.title}
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">{copy.examples.intro}</p>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {copy.examples.items.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.04}>
                <div className="h-full rounded-3xl border border-slate-200/70 bg-white/82 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-700/70 dark:bg-slate-950/76">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 text-base font-semibold text-slate-900 dark:text-slate-50">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="scan-limits" className="scroll-mt-28 px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.1fr_.9fr]">
          <Reveal>
            <GlassCard className="h-full border-amber-200/80 bg-amber-50/80 p-6 dark:border-amber-300/20 dark:bg-amber-400/10 sm:p-8">
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-800 dark:text-amber-200">
                <AlertTriangle className="h-4 w-4" aria-hidden />
                {copy.limits.eyebrow}
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl">{copy.limits.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">{copy.limits.intro}</p>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
                {copy.limits.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-700 dark:text-amber-200" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.06}>
            <GlassCard className="h-full border-slate-200/70 bg-white/82 p-6 dark:border-slate-700/70 dark:bg-slate-950/76 sm:p-8">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">{copy.pricing.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{copy.pricing.body}</p>
              <div className="mt-5 grid gap-3">
                {copy.pricing.cards.map((card) => (
                  <div key={card.title} className="rounded-2xl border border-slate-200/70 bg-white/75 p-4 dark:border-slate-700/70 dark:bg-slate-900/78">
                    <p className="font-semibold text-slate-900 dark:text-slate-50">{card.title}</p>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{card.body}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200/70 bg-white/85 dark:border-slate-700/70 dark:bg-slate-900/80">
                <div className="border-b border-slate-200/70 bg-slate-50/80 px-4 py-3 dark:border-slate-700/70 dark:bg-slate-900">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                    {isEn ? "3D scan price list" : "Prijslijst 3D scanning"}
                  </p>
                </div>
                <dl className="divide-y divide-slate-200/70 dark:divide-slate-700/70">
                  {scanPriceRows.map((item) => (
                    <div key={item.key} className="grid gap-2 px-4 py-3 sm:grid-cols-[1fr_auto] sm:items-center">
                      <div>
                        <dt className="font-semibold text-slate-900 dark:text-slate-50">{item.label}</dt>
                        <dd className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-300">{item.description}</dd>
                      </div>
                      <dd className="text-lg font-bold text-cyan-800 dark:text-cyan-200">{item.priceLabel}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="mt-6 rounded-2xl border border-cyan-200/80 bg-cyan-50/80 p-4 text-sm text-cyan-950 dark:border-cyan-300/20 dark:bg-cyan-400/10 dark:text-cyan-100">
                <p className="font-semibold">{copy.limits.ctaTitle}</p>
                <p className="mt-1">{copy.limits.ctaBody}</p>
                <Link href={quoteHref} className="mt-3 inline-flex font-semibold text-cyan-800 underline underline-offset-4 dark:text-cyan-200">
                  {copy.hero.primaryCta}
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <ReadMoreLinks pageType="scanning" title={copy.readMore.title} intro={copy.readMore.intro} />

      <section id="scan-faq" className="scroll-mt-28 px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Faq title={copy.faqTitle} items={copy.faq} className="max-w-4xl" />
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <GlassCard className="border-slate-200/70 bg-white/82 p-6 dark:border-slate-700/70 dark:bg-slate-950/76 sm:p-8">
              <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-700 dark:text-cyan-300">
                    {isEn ? "Next step" : "Volgende stap"}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
                    {copy.limits.ctaTitle}
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{copy.limits.ctaBody}</p>
                </div>
                <div className="flex flex-wrap justify-start gap-3 lg:justify-end">
                  <ShimmerButton href={quoteHref} event={{ action: "contact_start", category: "3d_scanning_bottom", label: "quote", value: 1 }}>
                    {copy.hero.primaryCta}
                  </ShimmerButton>
                  <Link
                    href={localizedServiceUrl}
                    className="inline-flex items-center justify-center rounded-xl border border-slate-200/80 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100"
                  >
                    {isEn ? "All services" : "Alle services"}
                  </Link>
                </div>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section id="scan-sources" className="scroll-mt-28 px-6 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <GlassCard className="border-slate-200/70 bg-white/82 p-6 dark:border-slate-700/70 dark:bg-slate-950/76 sm:p-8">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
                {isEn ? "Sources and references" : "Bronnen en referenties"}
              </h2>
              <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{copy.referencesIntro}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                {copy.references.map((reference) => (
                  <li key={reference.url} className="rounded-xl border border-slate-200/70 bg-white/80 px-4 py-3 dark:border-slate-700/70 dark:bg-slate-900/80">
                    <cite className="not-italic">
                      <Link href={reference.url} target="_blank" rel="noreferrer" className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-300 dark:hover:text-indigo-200">
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

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes scanGridDrift {
              from { background-position: 0 0, 0 0; }
              to { background-position: 72px 42px, -36px 84px; }
            }

            @keyframes scanSweep {
              0% { transform: translateX(38rem) skewX(-12deg); opacity: 0; }
              12% { opacity: .78; }
              48% { opacity: .55; }
              72% { transform: translateX(-54rem) skewX(-12deg); opacity: 0; }
              100% { transform: translateX(-54rem) skewX(-12deg); opacity: 0; }
            }

            @keyframes scanFieldDrift {
              from { transform: translate3d(-2%, -1%, 0) rotate(-4deg) scale(1); filter: saturate(1); }
              to { transform: translate3d(4%, 3%, 0) rotate(5deg) scale(1.06); filter: saturate(1.28); }
            }

            @keyframes scanRingPulse {
              0%, 100% { transform: scale(.94); opacity: .42; }
              45% { transform: scale(1.05); opacity: .72; }
            }

            @keyframes scannerFloat {
              0%, 100% { transform: translate3d(0, 0, 0) rotate(-1deg); }
              50% { transform: translate3d(-1.2rem, .8rem, 0) rotate(1.4deg); }
            }

            .scan-grid-motion {
              background-image:
                linear-gradient(rgba(6,182,212,.24) 1px, transparent 1px),
                linear-gradient(90deg, rgba(99,102,241,.18) 1px, transparent 1px);
              background-size: 28px 28px, 56px 56px;
              mask-image: linear-gradient(90deg, transparent 0%, black 22%, black 78%, transparent 100%);
              animation: scanGridDrift 18s linear infinite;
            }

            .scan-sweep {
              background: linear-gradient(90deg, transparent, rgba(34,211,238,.34), rgba(99,102,241,.22), transparent);
              filter: blur(.5px);
              mix-blend-mode: multiply;
              animation: scanSweep 7.5s cubic-bezier(.45, 0, .2, 1) infinite;
            }

            .scan-layer-slow > div {
              animation: scanFieldDrift 12s ease-in-out infinite alternate;
            }

            .scan-layer-fast > div {
              animation: scanRingPulse 8.5s ease-in-out infinite;
            }

            .scanner-parallax-image {
              animation: scannerFloat 9s ease-in-out infinite;
            }

            @media (prefers-reduced-motion: reduce) {
              .scan-grid-motion,
              .scan-sweep,
              .scan-layer-slow > div,
              .scan-layer-fast > div,
              .scanner-parallax-image {
                animation: none !important;
              }
            }
          `,
        }}
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(imageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />
    </main>
  )
}
