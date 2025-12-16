import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogSearch from "@/components/BlogSearch"

export const metadata: Metadata = {
  title: "3D print blog & kennisbank | X3DPrints",
  description:
    "Strategische 3D print artikels over kostprijs, materiaalkeuze, Bambu X1C instellingen en ontwerpbest practices. Inclusief links naar calculator en materiaaloverzicht.",
  alternates: { canonical: "https://www.x3dprints.be/blog" },
  openGraph: {
    title: "3D print blog & kennisbank | X3DPrints",
    description:
      "Leer hoe je 3D print projecten plant: kostenraming, PLA vs PETG, Bambu X1C instellingen en designrichtlijnen. Rechtstreekse links naar prijscalculator en materialen.",
    url: "https://www.x3dprints.be/blog",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "3D print blog X3DPrints" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D print blog & kennisbank | X3DPrints",
    description: "Strategische content over 3D print kosten, materiaalkeuze, Bambu X1C instellingen en ontwerpaanpak.",
    images: ["/images/og-home.jpg"],
  },
}

type TopicCategory = "filament-friday" | "maker-monday" | "use-case-dinsdag" | "materials-pricing" | "segments-cases" | "how-to"

type Topic = {
  id: string
  title: string
  summary: string
  highlights: string[]
  links: { label: string; href: string }[]
  intent: "informational" | "transactional" | "how-to"
  category: TopicCategory
}

const categorySections: Array<{
  id: Exclude<TopicCategory, "filament-friday" | "maker-monday" | "use-case-dinsdag">
  title: string
  description: string
  anchor: string
}> = [
  {
    id: "materials-pricing",
    title: "Materialen & pricing",
    description: "Artikels over kostprijs, materiaalkeuze en offertevoorbeelden.",
    anchor: "materials-pricing",
  },
  {
    id: "segments-cases",
    title: "Segmenten & cases",
    description: "Use cases per sector: retail, events, seasonal campagnes, lokale cases.",
    anchor: "segments-cases",
  },
  {
    id: "how-to",
    title: "How-to & workflows",
    description: "Handleidingen over ontwerp, Bambu-instellingen, bestanden en finishing.",
    anchor: "how-to",
  },
]

const topics: Topic[] = [
  {
    id: "filament-vrijdag-pla",
    title: "Filament Vrijdag #1: PLA 3D printen",
    summary:
      "Nieuwe vrijdagreeks over filamenten. Aflevering één legt PLA haarfijn uit: eigenschappen, printinstellingen, varianten en wanneer je beter PETG/TPU kiest.",
    highlights: [
      "Publicatieritme: elke vrijdag een nieuw filament zodat de materialencluster vers blijft in Google.",
      "Interne links naar 3D printen, materialen, pricing én contact met prefill voor PLA aanvragen.",
      "In het artikel vind je externe bronnen (Prusa, Ultimaker, MatterHackers) om topical authority te versterken.",
    ],
    links: [
      { label: "Lees Filament Vrijdag #1", href: "/blog/filament-vrijdag-pla" },
      { label: "3D printen pillar", href: "/3d-printen" },
      { label: "Materialenbibliotheek", href: "/materials" },
      { label: "Prijzen & calculator", href: "/pricing" },
    ],
    intent: "informational",
    category: "filament-friday",
  },
  {
    id: "filament-vrijdag-petg",
    title: "Filament Vrijdag #2: PETG 3D printen",
    summary:
      "PETG is het werkpaard voor functionele prints. In de tweede aflevering krijg je settings, vochtbeheer tips, varianten (solid/matte/translucent/CF) en besliscriteria tegenover PLA en TPU.",
    highlights: [
      "Publicatiedatum 12 september 2025 zodat de reeks wekelijks momentum opbouwt richting herfstcampagnes.",
      "Focus op outdoor, machineomgevingen en combinaties (PLA cover + PETG kern) inclusief pricing-insights.",
      "Bevat externe bronnen (Prusa, Ultimaker, MatterHackers) voor extra EEAT-signaal.",
    ],
    links: [
      { label: "Lees Filament Vrijdag #2", href: "/blog/filament-vrijdag-petg" },
      { label: "Vergelijk PLA vs PETG", href: "/blog/pla-vs-petg" },
      { label: "Plan een PETG run", href: "/contact?material=PETG%20Solid" },
    ],
    intent: "informational",
    category: "filament-friday",
  },
  {
    id: "filament-vrijdag-tpu",
    title: "Filament Vrijdag #3: TPU 3D printen",
    summary:
      "Derde aflevering focust op TPU: flexibel filament voor bumpers, grips en dempers. We delen studio-instellingen, varianten (95A, soft blends) en besliscriteria tegenover PLA/PETG.",
    highlights: [
      "Publicatie 19 september 2025 zodat de Filament Vrijdag reeks wekelijks momentum blijft maken richting Q4.",
      "Belicht typische use-cases (sleeves, soft-touch grips, dempers) plus planningstips rond lagere printsnelheden en droge opslag.",
      "Verweven interne CTA’s naar TPU fiche, Material Suggestion Tool en contactformulier met `material=TPU` prefill.",
    ],
    links: [
      { label: "Lees Filament Vrijdag #3", href: "/blog/filament-vrijdag-tpu" },
      { label: "TPU materiaalfiche", href: "/materials/tpu" },
      { label: "Vraag TPU advies", href: "/contact?material=TPU" },
    ],
    intent: "informational",
    category: "filament-friday",
  },
  {
    id: "filament-vrijdag-pla-wood",
    title: "Filament Vrijdag #4: PLA Wood & specials",
    summary:
      "Wood filament, marble en silk blends voor premium props en interieurstukken. Instellingen, nabewerking en combinaties met standaard PLA.",
    highlights: [
      "Baseert zich op de Bambu PLA Wood TDS (190-240 degC, 35-45 degC bed) en studio ervaring met marble en silk.",
      "Checklist wanneer je wood filament wel/niet inzet en hoe je nozzleclogs vermijdt.",
      "Linkt naar PLA/PETG/TPU edities zodat de hele materiaalcluster een interne mesh vormt.",
    ],
    links: [
      { label: "Lees Filament Vrijdag #4", href: "/blog/filament-vrijdag-pla-wood" },
      { label: "PLA Wood materiaalfiche", href: "/materials/pla-wood" },
      { label: "Plan PLA Wood print", href: "/contact?material=PLA%20Wood" },
    ],
    intent: "informational",
    category: "filament-friday",
  },
  {
    id: "finishing-friday-schuren-primen-lakken",
    title: "Finishing Friday: schuren, primen & lakken",
    summary:
      "Uitleg over schuren, primen en lakken van 3D prints met de nodige nuance: nette FDM-prints volstaan vaak, X3DPrints levert daarom basisprints in plaats van volledige lakjobs.",
    highlights: [
      "Doorloopt alle stappen (support removal, droog/nat schuren, primer, lak) zodat je weet wat er echt bij komt kijken.",
      "Legt uit waarom finishing arbeidsintensief is en beter past bij resin-workflows of gespecialiseerde lakkerijen.",
      "Geeft tips om je ontwerp, laaghoogte en materiaalkeuze klaar te maken voor doe-het-zelf finishing.",
    ],
    links: [
      { label: "Lees Finishing Friday", href: "/blog/finishing-friday-schuren-primen-lakken" },
      { label: "3D printen overzicht", href: "/3d-printen" },
      { label: "Prijzen & calculator", href: "/pricing" },
    ],
    intent: "informational",
    category: "maker-monday",
  },
  {
    id: "maker-monday-fdm-scharnieren",
    title: "Maker Monday #1: FDM scharnieren ontwerpen",
    summary:
      "Eerste Maker Monday focust op scharnieren die niet bij de eerste rotatie breken. Materiaalkeuze, oriëntatie, wanddiktes, pin-toleranties en verstevigingen stap voor stap uitgelegd.",
    highlights: [
      "Legt uit waarom 90% van de scharnieren in PETG hoort en wanneer PLA of TPU enkel cosmetisch of specialized inzetbaar is.",
      "Bevat tabellen voor minimale wanddiktes, pin-diameters en spelingen zodat je ontwerp meteen klopt.",
      "Verwijst naar aanstaande Maker Monday topics over toleranties en warping om de knowledge hub te structureren.",
    ],
    links: [
      { label: "Lees Maker Monday #1", href: "/blog/maker-monday-fdm-scharnieren" },
      { label: "Materialenoverzicht", href: "/materials" },
      { label: "Vraag scharnierreview", href: "/contact?topic=maker-monday-hinges" },
    ],
    intent: "how-to",
    category: "maker-monday",
  },
  {
    id: "maker-monday-wanddiktes-ribs",
    title: "Maker Monday #2: Wanddiktes & ribs",
    summary:
      "FDM onderdelen zijn sterk zodra je wanddiktes, ribs en oriëntatie op FDM afstemt. Deze gids bevat tabellen per materiaal en verstevigingsmethodes die we dagelijks toepassen.",
    highlights: [
      "Wanddikte tabel voor PLA, PETG en TPU plus uitleg waarom infill nooit de hoofdrol mag spelen.",
      "Rib- en gussetrichtlijnen (dikte, hoogte, fillets) en sandwich-constructies voor torsiestijfheid.",
      "Linkt naar toekomstige Maker Mondays over toleranties en warping zodat je het complete ontwerpproces plant.",
    ],
    links: [
      { label: "Lees Maker Monday #2", href: "/blog/maker-monday-wanddiktes-ribs" },
      { label: "Materialenoverzicht", href: "/materials" },
      { label: "Vraag wanddikte review", href: "/contact?topic=maker-monday-walls" },
    ],
    intent: "how-to",
    category: "maker-monday",
  },
  {
    id: "maker-monday-toleranties-3d-printen",
    title: "Maker Monday #3: Toleranties voor 3D printen",
    summary:
      "Hoeveel speling moet je voorzien voor pen-gat, klikverbindingen en scharnieren? Deze gids bundelt studio-toleranties voor PLA, PETG en TPU plus slicer tips.",
    highlights: [
      "Tabellen voor glijdende fits, pen-gat, snapfits en hinges, afgestemd op PLA, PETG en TPU.",
      "Uitleg over clearance per toepassing (schuiven, rotaties) en hoe line width, elephant's foot en hole compensation meespelen.",
      "Bundelt links naar Maker Monday #1 (scharnieren) en #2 (wanddiktes) voor een volledige engineering workflow.",
    ],
    links: [
      { label: "Lees Maker Monday #3", href: "/blog/maker-monday-toleranties-3d-printen" },
      { label: "Materialenoverzicht", href: "/materials" },
      { label: "Vraag tolerantie-review", href: "/contact?topic=maker-monday-tolerances" },
    ],
    intent: "how-to",
    category: "maker-monday",
  },
  {
    id: "maker-monday-snapfits",
    title: "Maker Monday #4: Snapfits & clips ontwerpen",
    summary:
      "Clips schieten los of breken zodra de buigkracht verkeerd gericht is. Deze gids toont hoe je PLA, PETG en TPU snapfits ontwerpt met de juiste wanddikte, oriëntatie en tolerantie.",
    highlights: [
      "Tabellen voor arm-diktes per materiaal plus aanbevolen arm-lengtes om stress te spreiden.",
      "Tolerantie- en ribrichtlijnen zodat je snapfit echt klikt zonder te breken, inclusief interne links naar Maker Monday #2 en #3.",
      "Materiaalkeuze-afwegingen (PLA voor cosmetisch, PETG voor flex, TPU voor dempers) plus testmethodes voor snelle iteraties.",
    ],
    links: [
      { label: "Lees Maker Monday #4", href: "/blog/maker-monday-snapfits" },
      { label: "Materialenoverzicht", href: "/materials" },
      { label: "Vraag clip-review", href: "/contact?topic=maker-monday-snapfits" },
    ],
    intent: "how-to",
    category: "maker-monday",
  },
  {
    id: "maker-monday-schroefdraad-inserts",
    title: "Maker Monday #5: Schroefdraad & inserts",
    summary:
      "Bevestigingen zijn vaak de achilleshiel van FDM prints. Deze gids bundelt ontwerpregels voor schroefgaten, heat-set inserts, bosses en geprinte draad in PLA, PETG en TPU.",
    highlights: [
      "Tabellen voor CAD-diameters van M2–M5, plus minimum wanddiktes en fillets rond schroefzones.",
      "Heat-set insert checklist met chamfers, pocketmaatvoering en materiaalkeuze (PLA versus PETG).",
      "Tips voor self-tapping screws, ingesloten moeren en wanneer geprinte schroefdraad toch werkt.",
    ],
    links: [
      { label: "Lees Maker Monday #5", href: "/blog/maker-monday-schroefdraad-inserts" },
      { label: "Materialenoverzicht", href: "/materials" },
      { label: "Vraag bevestigingsadvies", href: "/contact?topic=maker-monday-fasteners" },
    ],
    intent: "how-to",
    category: "maker-monday",
  },
  {
    id: "maker-monday-warping-layer-cracks",
    title: "Maker Monday #6: Warping, layer cracks & bridging",
    summary:
      "Printproblemen ontstaan vaak in CAD. Deze gids toont hoe je hoeken, wanden en overspanningen ontwerpt zodat PLA, PETG en TPU niet warpen, scheuren of doorzakken.",
    highlights: [
      "Rules of thumb voor chamfers, ribbing en het opsplitsen van grote onderdelen om warping te beperken.",
      "Layer adhesion tips (oriëntatie, perimeter count, ribbing) en bridging-best practices met duidelijke limieten.",
      "Checklist waarmee je elk onderdeel screent vóór productie, plus links naar Maker Monday #2-4 voor verdieping.",
    ],
    links: [
      { label: "Lees Maker Monday #6", href: "/blog/maker-monday-warping-layer-cracks" },
      { label: "Materialenoverzicht", href: "/materials" },
      { label: "Vraag ontwerp-review", href: "/contact?topic=maker-monday-warping" },
    ],
    intent: "how-to",
    category: "maker-monday",
  },
  {
    id: "maker-monday-schroefdraad-bevestigingen",
    title: "Maker Monday #7: Schroefdraad & bevestigingen",
    summary:
      "Nieuwe deep-dive over geprinte schroefdraad, zelftappende schroeven en heat set inserts. Met tabelwaarden voor pilot holes, insert pockets en materiaalkeuze voor PLA, PETG en TPU.",
    highlights: [
      "Concrete tabellen voor geprinte draad (M10-M30), zelftappers (M2.5-M4) en heat-set pockets.",
      "Checklist voor bosses, tolerantie en oriëntatie zodat schroeven niet langer de bottleneck zijn.",
      "Call-to-action om high-temp (ABS/ASA/nylon) vragen tijdens de intake aan te kaarten voor partneroplossingen.",
    ],
    links: [
      { label: "Lees Maker Monday #7", href: "/blog/maker-monday-schroefdraad-bevestigingen" },
      { label: "Materialenoverzicht", href: "/materials" },
      { label: "Vraag bevestigingsadvies", href: "/contact?topic=maker-monday-fasteners" },
    ],
    intent: "how-to",
    category: "maker-monday",
  },
  {
    id: "use-case-dinsdag-auto-fiets",
    title: "Use Case Dinsdag #1: Auto & fietsaccessoires",
    summary:
      "Toepassing-gebaseerde gids over 3D print mounts, klemmen en anti-ratel onderdelen voor voertuigen. Focus op PETG en TPU, met ontwerpregels tegen warmte, UV en vibraties.",
    highlights: [
      "Materiaalvergelijking PLA vs PETG vs TPU voor dashboards, fietsen en outdoor gebruik.",
      "Ontwerp-checklist (toleranties, ribbing, inserts) met verwijzingen naar Maker Monday #2, #3, #5 en #6.",
      "Voorbeelden van auto- en fietsaccessoires plus duidelijke ‘niet printen’-scenario’s.",
    ],
    links: [
      { label: "Lees Use Case Dinsdag #1", href: "/blog/use-case-dinsdag-auto-fiets" },
      { label: "Materialenoverzicht", href: "/materials" },
      { label: "Vraag projectadvies", href: "/contact?topic=use-case-auto-fiets" },
    ],
    intent: "how-to",
    category: "use-case-dinsdag",
  },
  {
    id: "use-case-dinsdag-retail-displays",
    title: "Use Case Dinsdag #2: Retail displays en etalages",
    summary:
      "Retail vraagt esthetiek en betrouwbaarheid onder spotlights. Deze gids toont welke PLA, PETG of TPU blends werken voor signage, merchandising props en lichtgevende displays.",
    highlights: [
      "Materiaalvergelijking (PLA Matte, PETG Solid/Matte/Translucent, PLA Silk/Marble/Wood, TPU) met concrete use cases.",
      "Ontwerpchecklist voor wanddiktes, tolerantie, bevestiging en kleurconsistentie met links naar Maker Monday artikelen.",
      "Kostoptimalisatie tips zoals shell-only prints, kleur in filament kiezen en materialen combineren voor premium look.",
    ],
    links: [
      { label: "Lees Use Case Dinsdag #2", href: "/blog/use-case-dinsdag-retail-displays" },
      { label: "Materialenoverzicht", href: "/materials" },
      { label: "Vraag retail-advies", href: "/contact?topic=use-case-retail" },
    ],
    intent: "how-to",
    category: "use-case-dinsdag",
  },
  {
    id: "use-case-dinsdag-scholen",
    title: "Use Case Dinsdag #3: 3D printen voor scholen",
    summary:
      "Onderwijs vraagt voorspelbare workflows, veilige materialen en lage faalratio. Deze gids bundelt materiaaladvies, lesopbouw en samenwerking met X3DPrints.",
    highlights: [
      "Materiaalmatrix (PLA Matte vs PETG vs TPU) met duidelijke waarschuwingen rond ventilatie en moeilijkheidsgraad.",
      "Workflow stappenplan: centraal slicen, Maker Monday checklists, low-failure preset en remix-projecten.",
      "Troubleshooting voor bedhechting, warping en lesduur plus uitleg hoe scholen grotere prints outsourcen.",
    ],
    links: [
      { label: "Lees Use Case Dinsdag #3", href: "/blog/use-case-dinsdag-scholen" },
      { label: "Materialenoverzicht", href: "/materials" },
      { label: "Vraag schooladvies", href: "/contact?topic=use-case-scholen" },
    ],
    intent: "how-to",
    category: "use-case-dinsdag",
  },
  {
    id: "use-case-dinsdag-tabletop",
    title: "Use Case Dinsdag #4: Tabletop & props",
    summary:
      "Gids voor minis, terrain en cosplay props met PLA Matte, Marble, Silk en PETG. Inclusief vergelijking FDM vs SLA, finishing workflow en segmentlinks.",
    highlights: [
      "Materiaalmatrix voor minis, terrain en props met duidelijke redenen om PLA Matte, Marble, Silk, PETG of TPU te kiezen.",
      "Ontwerp- en slicingchecklist (detail scaling, layer heights, seam control, tree supports, splitting met inserts).",
      "Painting workflow en scenario's voor DMs, cosplayers en bordspelontwerpers met links naar segments en Finishing Friday.",
    ],
    links: [
      { label: "Lees Use Case Dinsdag #4", href: "/blog/use-case-dinsdag-tabletop" },
      { label: "Segment tabletop", href: "/segments/3d-printing-tabletop" },
      { label: "Vraag props-advies", href: "/contact?topic=use-case-tabletop" },
    ],
    intent: "how-to",
    category: "use-case-dinsdag",
  },
  {
    id: "use-case-dinsdag-productontwikkeling",
    title: "Use Case Dinsdag #5: Productontwikkeling",
    summary:
      "Prototypetraject van form study modellen tot high-fidelity showpieces met PLA, PETG, TPU en esthetische blends. Inclusief hybride aanpak en testchecklist.",
    highlights: [
      "Drie prototypefasen met concrete materiaalkeuzes (PLA Matte, PETG, Silk/Marble/Wood) en voorbeelden.",
      "Hybride constructies (PLA shell + PETG kern, PETG frame + TPU) plus Material Suggestion Tool integratie.",
      "Ontwerpregels met links naar Maker Monday #2/#3/#5, testchecklist en kostenoptimalisatie voor R&D teams.",
    ],
    links: [
      { label: "Lees Use Case Dinsdag #5", href: "/blog/use-case-dinsdag-productontwikkeling" },
      { label: "Segment prototypes", href: "/segments/3d-printing-prototypes" },
      { label: "Vraag productadvies", href: "/contact?topic=use-case-productontwikkeling" },
    ],
    intent: "how-to",
    category: "use-case-dinsdag",
  },
  {
    id: "use-case-dinsdag-events",
    title: "Use Case Dinsdag #6: Events & beurzen",
    summary:
      "Alles over 3D prints voor branding, props en booth-onderdelen. Inclusief materiaalkeuze, spotlight realiteit en modulaire designprincipes.",
    highlights: [
      "Materiaalmatrices voor PLA Matte, Marble, Silk+, PETG en TPU met concrete event use cases.",
      "Checklist voor warmtebeheer, transportproof designs en veelgevraagde prints (logo's, stands, sensorhouders).",
      "Wanneer 3D printen tegen CNC/foam kiezen plus kosten- en deadline realiteit voor eventprojecten.",
    ],
    links: [
      { label: "Lees Use Case Dinsdag #6", href: "/blog/use-case-dinsdag-events" },
      { label: "Segment marketing & events", href: "/segments/3d-printing-marketing" },
      { label: "Vraag event-advies", href: "/contact?topic=use-case-events" },
    ],
    intent: "how-to",
    category: "use-case-dinsdag",
  },
  {
    id: "use-case-dinsdag-interieur",
    title: "Use Case Dinsdag #7: Interieur & decor",
    summary:
      "Interieurarchitecten en makers gebruiken PLA Matte, Marble, Wood en Metal voor sculpturen, wandpanelen en retailprops. Deze gids toont materiaalkeuzes, warmtegedrag en workflow.",
    highlights: [
      "Detailsecties over custom decor, organische vormen en lichtgewicht props in kleine oplage.",
      "Materiaaloverzicht (PLA Matte/Marble/Wood/Metal, PETG) plus warmteadvies met links naar materiaalblogs.",
      "Designworkflow, projectvoorbeelden, kostdrivers en wanneer 3D printen beter is dan hout/CNC.",
    ],
    links: [
      { label: "Lees Use Case Dinsdag #7", href: "/blog/use-case-dinsdag-interieur" },
      { label: "Segment marketing & decor", href: "/segments/3d-printing-marketing" },
      { label: "Vraag interieur-advies", href: "/contact?topic=use-case-interieur" },
    ],
    intent: "how-to",
    category: "use-case-dinsdag",
  },
  {
    id: "use-case-dinsdag-stem",
    title: "Use Case Dinsdag #8: Makerspaces & STEM",
    summary:
      "STEM-scholen en makerspaces krijgen een kant-en-klaar recept voor PLA, PETG en TPU workflows, inclusief instellingen, planning en projectideeën.",
    highlights: [
      "Standaardsettings voor PLA/PETG/TPU plus lesplanning (ontwerp > slice > print) zodat printers blijven draaien.",
      "Materiaalstrategie (PLA Matte default, PETG voor robotica, TPU voor flex) met links naar materiaalblogs.",
      "Veelvoorkomende projecten, fouten om te vermijden en tips voor duurzame opstelling en budgeting.",
    ],
    links: [
      { label: "Lees Use Case Dinsdag #8", href: "/blog/use-case-dinsdag-stem" },
      { label: "Segment scholen & STEM", href: "/segments/3d-printing-schools" },
      { label: "Vraag STEM-advies", href: "/contact?topic=use-case-stem" },
    ],
    intent: "how-to",
    category: "use-case-dinsdag",
  },
  {
    id: "juiste-3d-print-materiaal",
    title: "How-to: kies het juiste 3D print materiaal",
    summary:
      "Beslissingsgids die je door omgeving, temperatuur en functionaliteit loodst. Vergelijk PLA Matte, PETG en TPU, en link door naar materialen en pricing.",
    highlights: [
      "Flowchart: binnen/buiten, warm/koud, decoratief/functioneel, stijf/flexibel zodat je sneller shortlist.",
      "Concrete mapping: PLA Matte voor marketing & interieur, PETG voor functioneel warm/outdoor, TPU voor grip en demping.",
      "Scenario's (auto-onderdelen, retail display, flexibele kabelhouder) met directe links naar materialen en contact.",
    ],
    links: [
      { label: "Lees de how-to", href: "/blog/juiste-3d-print-materiaal" },
      { label: "Bekijk materialen", href: "/materials" },
      { label: "Zie prijsimpact", href: "/pricing" },
    ],
    intent: "how-to",
    category: "how-to",
  },
  {
    id: "filament-vrijdag-pla-marble",
    title: "Filament Vrijdag #5: PLA Marble",
    summary:
      "Steenlook zonder gewicht: PLA Marble blends voor interieur, retail en cosplay. Incl. instellingen, troubleshooting en wanneer finishing overbodig is.",
    highlights: [
      "Vertrekt van het PLA-profiel en de Bambu handleiding, maar focust op textuur en 0.6 mm nozzle tips.",
      "Vergelijkt Marble met PLA Matte en PETG zodat je weet waar de esthetische meerwaarde zit.",
      "Linkt naar Finishing Friday om uit te leggen waarom we FDM netjes houden zonder lakwerk.",
    ],
    links: [
      { label: "Lees Filament Vrijdag #5", href: "/blog/filament-vrijdag-pla-marble" },
      { label: "PLA materialenoverzicht", href: "/materials/pla" },
      { label: "Vraag PLA Marble advies", href: "/contact?material=PLA%20Marble" },
    ],
    intent: "informational",
    category: "filament-friday",
  },
  {
    id: "filament-vrijdag-pla-glow",
    title: "Filament Vrijdag #6: PLA Glow",
    summary:
      "Glow-in-the-dark PLA voor cosplay, signage en playful design. Instellingen, hardwaretips en wanneer glow echt meerwaarde biedt.",
    highlights: [
      "Adviseert geharde nozzles en kalmere snelheden om abrasie te beperken.",
      "Deelt instellingen en wall thickness tips om de glow-intensiteit te maximaliseren.",
      "Linkt naar pricing, materialen en Finishing Friday zodat de hele materialencluster consistent blijft.",
    ],
    links: [
      { label: "Lees Filament Vrijdag #6", href: "/blog/filament-vrijdag-pla-glow" },
      { label: "Materialenbibliotheek", href: "/materials" },
      { label: "Vraag PLA Glow advies", href: "/contact?material=PLA%20Glow" },
    ],
    intent: "informational",
    category: "filament-friday",
  },
  {
    id: "filament-vrijdag-pla-metal",
    title: "Filament Vrijdag #7: PLA Metal",
    summary:
      "Metallic PLA blends voor props, industriële esthetiek en designprints. Hoe krijg je een egale glans zonder finishing?",
    highlights: [
      "Adviseert geharde nozzles en kalmere snelheid om abrasie en artefacten te beperken.",
      "Vergelijkt PLA, PLA Metal en PETG op printgemak, look & feel en hardware-eisen.",
      "Linkt naar pricing, materialen en de volledige Filament Vrijdag esthetic-cluster.",
    ],
    links: [
      { label: "Lees Filament Vrijdag #7", href: "/blog/filament-vrijdag-pla-metal" },
      { label: "Materialenbibliotheek", href: "/materials" },
      { label: "Vraag PLA Metal advies", href: "/contact?material=PLA%20Metal" },
    ],
    intent: "informational",
    category: "filament-friday",
  },
  {
    id: "filament-vrijdag-pla-silk-plus",
    title: "Filament Vrijdag #8: PLA Silk+",
    summary:
      "High-gloss PLA Silk+ voor brandingprops, awards en contentproductie. Je krijgt de glans van silk, maar met een stevigere blend zodat onderdelen meerdere events overleven.",
    highlights: [
      "Studio-instellingen voor glans zonder stringing, plus varianten (solid, metallic, gradient) en wanneer je welke kiest.",
      "Duidelijke beslisboom tussen Silk+, Matte, Marble en PETG zodat zichtwerk en mechanische eisen in balans blijven.",
      "Linkt naar materialen, pricing en contact met `material=PLA Silk+` prefill om intake te versnellen.",
    ],
    links: [
      { label: "Lees Filament Vrijdag #8", href: "/blog/filament-vrijdag-pla-silk-plus" },
      { label: "PLA Silk+ materiaalfiche", href: "/materials/pla-silk-plus" },
      { label: "Vraag Silk+ advies", href: "/contact?material=PLA%20Silk%2B" },
    ],
    intent: "informational",
    category: "filament-friday",
  },
  {
    id: "use-cases-tpu",
    title: "Use cases: hoe klanten TPU in de praktijk inzetten",
    summary:
      "Bonusaflevering met concrete TPU projecten: sleeves voor IoT, soft-touch grips in productie en retail props met dempers. Inclusief playbooks en planningstips.",
    highlights: [
      "Casestudies beschrijven settings (wanddiktes, shore-hardheid) en hoe we hybride TPU/PLA onderdelen opbouwen.",
      "Sectorplaybooks voor electronics, tooling en retail zodat je sneller weet waar TPU rendeert.",
      "CTA’s naar TPU fiche, viewer upload en contact met `material=TPU` prefill voor intake.",
    ],
    links: [
      { label: "Lees TPU use cases", href: "/blog/use-cases-tpu" },
      { label: "Material Suggestion Tool", href: "/materials#material-suggestion-tool" },
      { label: "Vraag TPU advies", href: "/contact?material=TPU" },
    ],
    intent: "informational",
    category: "segments-cases",
  },
  {
    id: "hoeveel-kost-3d-printen",
    title: "Hoeveel kost 3D printen?",
    summary:
      "Kosten worden bepaald door printtijd, materiaalprijs per kilogram, gewenste afwerking en eventuele ontwerpuren. In het uitgebreide blogartikel lichten we elk kostblok toe inclusief formules en voorbeelden.",
    highlights: [
      "Basistarieven starten vanaf het PLA Matte referentieprofiel; specials zoals Silk, Marble of TPU hebben een opslag van 20-30%.",
      "Printtijd hangt af van laaghoogte en vulling. Fijne lagen (0.12 mm) zien er top uit, maar hebben 15-25% meer machine-uren.",
      "Logistiek (Bpost, afhalen of persoonlijke levering) telt mee in de eindfactuur. Binnen regio Herzele/Gent kan afhalen gratis.",
    ],
    links: [
      { label: "Lees volledig artikel", href: "/blog/hoeveel-kost-3d-printen" },
      { label: "Bekijk prijzen & calculator", href: "/pricing" },
      { label: "Vraag een offerte", href: "/contact" },
    ],
    intent: "transactional",
    category: "materials-pricing",
  },
  {
    id: "pla-vs-petg",
    title: "PLA vs PETG: welke moet je kiezen?",
    summary:
      "PLA is ideaal voor designmodellen en snelle prototyping, terwijl PETG beter tegen warmte, uv en impact kan. Vergelijk de materiaalkaarten en kies de blend die past bij jouw toepassing.",
    highlights: [
      "PLA Matte en PLA Tough+ leveren een premium look zonder veel nabewerking. Perfect voor interieur, branding en gingebruik binnenshuis.",
      "PETG blijft dimensioneel stabiel tot ongeveer 80 C en is chemisch resistenter. Kies dit voor buitengebruik, mechanische onderdelen en vloeistofcontact.",
      "Moet het flexibel zijn? TPU (shore 95A) biedt schokabsorptie voor bumpers of grips. Combineer evt. met PLA behuizing voor hybride onderdelen.",
    ],
    links: [
      { label: "Lees volledig artikel", href: "/blog/pla-vs-petg" },
      { label: "Materialen vergelijken", href: "/materials" },
      { label: "Bekijk PETG voorbeeldproject", href: "/materials/petg" },
    ],
    intent: "informational",
    category: "materials-pricing",
  },
  {
    id: "3d-printen-mini-figuren",
    title: "3D printen van miniaturen voor tabletop gaming",
    summary:
      "D&D en Warhammer minis met scherpe details, stevige bases en veilige levering. Tips voor laaghoogte, supports, materiaalkeuze en dice towers met grip.",
    highlights: [
      "Detail: 0,12-0,16 mm layers en orintatie met gezicht naar boven voor supportvrije features.",
      "Materialen: PLA Matte voor strak zichtwerk, PETG voor robuuste props/terrain, TPU voor rubber feet onder dice towers.",
      "Levering: persoonlijke EV-levering in zones of pakketdienst; breekbare minis afzonderlijk verpakt.",
    ],
    links: [
      { label: "Lees volledig artikel", href: "/blog/3d-printen-mini-figuren" },
      { label: "Bekijk DnD mini", href: "/portfolio" },
      { label: "Dice tower voorbeeld", href: "/portfolio" },
    ],
    intent: "informational",
    category: "segments-cases",
  },
  {
    id: "3d-printen-herfst-halloween",
    title: "3D printen voor herfst & Halloween",
    summary:
      "Pumpkins, haunted props en lantaarns in Silk/Marble/Translucent PLA. Incl. tips voor leds, wanddiktes en leverzones.",
    highlights: [
      "Silk/Marble voor luxe glans, Translucent voor lichtgloed",
      "Layer 0,16-0,2 mm; wand >1,2 mm voor stevige decor",
      "Ontwerpbestand niet inbegrepen; lever STL/STEP of ontwerpservice",
    ],
    links: [
      { label: "Lees volledig artikel", href: "/blog/3d-printen-herfst-halloween" },
      { label: "Seasonal segment", href: "/segments/3d-printing-seasonal" },
      { label: "Plan je Halloween print", href: "/contact" },
    ],
    intent: "informational",
    category: "segments-cases",
  },
  {
    id: "3d-printen-lente-pasen",
    title: "3D printen voor lente & Pasen",
    summary:
      "Pastel ornamenten, eieren en bloemdecor in Silk/Matte/Translucent PLA. Checklist voor materiaal en ophang.",
    highlights: [
      "Pastel Silk/Matte PLA, Translucent voor lichtobjecten",
      "Oogjes/pin-holes integreren, wand >1,2 mm",
      "Ontwerp niet inbegrepen; ontwerpservice 45/uur",
    ],
    links: [
      { label: "Lees volledig artikel", href: "/blog/3d-printen-lente-pasen" },
      { label: "Seasonal segment", href: "/segments/3d-printing-seasonal" },
      { label: "Plan paasprints", href: "/contact" },
    ],
    intent: "informational",
    category: "segments-cases",
  },
  {
    id: "3d-printen-zomer",
    title: "3D printen voor de zomer",
    summary:
      "Outdoor decor, nautische props en terrasaccessoires in PETG/TPU. Tips voor hittebestendigheid en antislip.",
    highlights: [
      "PETG voor zon/vocht, TPU voor antislip feet",
      "Layer 0,2 mm voor grote stukken, 0,16 mm voor detail",
      "Ontwerp niet inbegrepen; ontwerpservice 45/uur",
    ],
    links: [
      { label: "Lees volledig artikel", href: "/blog/3d-printen-zomer" },
      { label: "Seasonal segment", href: "/segments/3d-printing-seasonal" },
      { label: "Plan zomerprints", href: "/contact" },
    ],
    intent: "informational",
    category: "segments-cases",
  },
  {
    id: "3d-printen-winter-kerst-nieuwjaar",
    title: "3D printen voor winter, Kerst & Nieuwjaar",
    summary:
      "Ornamenten, sneeuwvlokken en party props in Silk/Marble/Translucent PLA. Levering via EV-zones of pakketdienst.",
    highlights: [
      "Silk/Marble voor glans, Translucent voor lichtobjecten",
      "Oogjes integreren, wand 1,6-2 mm voor diffuse gloed",
      "Ontwerp niet inbegrepen; ontwerpservice 45/uur",
    ],
    links: [
      { label: "Lees volledig artikel", href: "/blog/3d-printen-winter-kerst-nieuwjaar" },
      { label: "Seasonal segment", href: "/segments/3d-printing-seasonal" },
      { label: "Plan kerstprints", href: "/contact" },
    ],
    intent: "informational",
    category: "segments-cases",
  },
  {
    id: "bambu-printer-instellingen",
    title: "Beste instellingen voor jouw Bambu printer",
    summary:
      "Bambu printers leveren snel en consistent resultaat, maar vragen nog steeds materiaal-specifieke tuning. In het uitgebreide artikel delen we onze studio presets voor PLA, PETG en TPU plus tips voor flow en kalibratie.",
    highlights: [
      "PLA presets: 215 C nozzle, 60 C bed, 0.16-0.24 mm layerhoogte met fans op 70-100% voor scherpe randen en minimale stringing.",
      "PETG presets: 240 C nozzle, 80 C bed, ventilator tot 40% en iets lagere retract zodat lagen stevig hechten zonder blobs.",
      "TPU presets: 235 C nozzle, 45 C bed, 30 mm/s max snelheid, beperkte retract en droger filament voor betrouwbare AMS-run.",
    ],
    links: [
      { label: "Lees volledig artikel", href: "/blog/beste-instellingen-bambu-printer" },
      { label: "Meer over productieaanpak", href: "/services" },
      { label: "Vraag tips voor jouw print", href: "/contact" },
    ],
    intent: "how-to",
    category: "how-to",
  },
  {
    id: "hoe-3d-print-je-onderdelen-voor-buitengebruik",
    title: "Hoe 3D print je onderdelen voor buitengebruik?",
    summary:
      "Nieuwe how-to in de knowledge hub. Leer waarom PLA buiten faalt, wanneer je PETG of TPU inzet en hoe je bevestiging en drainage aanpakt voor sensoren, fietsen en gevels.",
    highlights: [
      "PLA buiten? Enkel als decoratieve cover rond een PETG kern, anders verkleurt en vervormt het binnen maanden.",
      "PETG en TPU scenario-overzicht: sensoren, fietsen, auto-interieur en trillende onderdelen met hybride constructies.",
      "Checklist voor montage: inserts, nokken, drainage en redundante schroefpunten zodat de print geen servicecall wordt.",
    ],
    links: [
      { label: "Lees de how-to", href: "/blog/hoe-3d-print-je-onderdelen-voor-buitengebruik" },
      { label: "PETG materiaaloverzicht", href: "/materials/petg" },
      { label: "Pricing & calculator", href: "/pricing" },
    ],
    intent: "how-to",
    category: "how-to",
  },
  {
    id: "3d-printing-marketing-events",
    title: "3D printing voor marketing & events",
    summary:
      "Props, awards en merchandising die aansluiten bij je campagnekalender. Leer hoe je een briefing opzet, materialen kiest en KPIs koppelt aan tastbare activaties.",
    highlights: [
      "Silk, Marble en Translucent PLA zorgen voor premium looks die klaar zijn voor fotoshoots.",
      "Korte feedbackloops omdat je rechtstreeks met de printer in Herzele schakelt.",
      "Integreer QR/NFC in props om leads of engagement te meten tijdens events.",
    ],
    links: [
      { label: "Lees volledig artikel", href: "/blog/3d-printing-marketing-events" },
      { label: "Segment marketing & events", href: "/segments/3d-printing-marketing" },
      { label: "Vraag props of giveaways aan", href: "/contact?material=PLA%20Silk%2B" },
    ],
    intent: "transactional",
    category: "segments-cases",
  },
  {
    id: "octopus-accountancy-3d-print-goodies",
    title: "Case: Octopus.be 3D-geprinte goodies",
    summary:
      "Samenwerking met Octopus.be: merk-eigen octopussen, magnetische badges en give-aways met meetbare QR/UTM links. Ideaal voor demo's, partnerdagen en onboarding.",
    highlights: [
      "PLA Matte/Silk mascottes die scherp ogen op foto's en in demo-opstellingen.",
      "PETG Matte badges met verzonken magneten zodat ze daily use aankunnen.",
      "Kits per event of partner, gelinkt aan Octopus landingpages voor tracking.",
    ],
    links: [
      { label: "Lees de Octopus case", href: "/blog/octopus-accountancy-3d-print-goodies" },
      { label: "Segment marketing & events", href: "/segments/3d-printing-marketing" },
      { label: "Plan een merch run", href: "/contact?topic=octopus-case" },
    ],
    intent: "transactional",
    category: "segments-cases",
  },
  {
    id: "3d-geprinte-platen-nasiam",
    title: "NaSiam: 3D-geprinte platen met QR",
    summary:
      "Case study: twee herbruikbare platen met logo en QR-code voor massagesalon NaSiam in Sint-Job. Inclusief materiaalkeuzes, montage-opties en links naar marketingartikelen.",
    highlights: [
      "Matte basis met contrasterende inleg voor scanbare QR-codes.",
      "Herbruikbaar op events en in het salon, met vlakke zones voor tape of klittenband.",
      "Interne links naar marketing & events segment plus Antwerpse landingspagina.",
    ],
    links: [
      { label: "Lees volledig artikel", href: "/blog/3d-geprinte-platen-nasiam" },
      { label: "Marketing & events artikel", href: "/blog/3d-printing-marketing-events" },
      { label: "Segment marketing & events", href: "/segments/3d-printing-marketing" },
    ],
    intent: "transactional",
    category: "segments-cases",
  },
  {
    id: "ontwerp-3d-printbaar-model",
    title: "Hoe ontwerp je een 3D printbaar model?",
    summary:
      "Een printbaar ontwerp combineert consistente wanddiktes, correcte tolerantie en slimme orintatie. In het lange artikel tonen we exact hoe we STL/STEP voorbereiden voor productie in PLA, PETG en TPU.",
    highlights: [
      "Minimale wanddikte: 1.2 mm voor PLA/PETG, 2 mm voor TPU. Voeg ribs of fillets toe om krachten te spreiden.",
      "Beperk overhang > 55 graden of voorzie ondersteuningsvlakken. Maak holtes toegankelijk zodat support makkelijk loskomt.",
      "Lever STEP of native CAD wanneer je nog wijzigingen verwacht; STL is prima voor finale productie. Voeg maatvoering of tolerantie-notes toe in het bericht.",
    ],
    links: [
      { label: "Lees volledig artikel", href: "/blog/ontwerp-3d-printbaar-model" },
      { label: "Upload bestanden via viewer", href: "/viewer" },
      { label: "Ontwerpservice aanvragen", href: "/contact" },
    ],
    intent: "informational",
    category: "how-to",
  },
  {
    id: "hoe-lang-duurt-3d-printen",
    title: "Hoe lang duurt 3D printen?",
    summary:
      "Doorlooptijd hangt af van de complexiteit, materiaal en finishing. In het artikel leggen we uit hoe we jobs inplannen en hoe jij sneller in de queue komt zonder harde garanties.",
    highlights: [
      "Machine-uren variren van minder dan een uur tot meer dan een dag per onderdeel. We adviseren hoe je geometrie optimaliseert.",
      "Door onderdelen te groeperen per materiaal verkort je de wachtrij en hoef je minder vaak van spool te wisselen.",
      "Afhalen, Bpost of persoonlijke levering: we stemmen logistiek af op jouw deadline zodat het geheel blijft kloppen.",
    ],
    links: [
      { label: "Lees volledig artikel", href: "/blog/hoe-lang-duurt-3d-printen" },
      { label: "Plan levering", href: "/contact" },
      { label: "Bekijk prijzen & doorlooptijden", href: "/pricing" },
    ],
    intent: "informational",
    category: "materials-pricing",
  },
  {
    id: "bestanden-voor-3d-printen",
    title: "Welke bestanden heb je nodig voor 3D printen?",
    summary:
      "STL, STEP en native CAD spelen elk een rol. We leggen uit welk formaat je wanneer gebruikt, welke resolutie nodig is en hoe je metadata toevoegt voor snelle offertes.",
    highlights: [
      "Voor productie: STL met 0.01-0.05 mm resolutie. Voor revisies: STEP of native CAD zodat we maten kunnen aanpassen.",
      "Voeg meetreferenties, tolerantie-notes en foto's toe in dezelfde map of viewer upload.",
      "Controleer meshes op non-manifold edges en gedupliceerde vlakken voordat je uploadt.",
    ],
    links: [
      { label: "Lees volledig artikel", href: "/blog/bestanden-voor-3d-printen" },
      { label: "Upload via viewer", href: "/viewer" },
      { label: "Vraag ontwerpreview", href: "/contact" },
    ],
    intent: "how-to",
    category: "how-to",
  },
  {
    id: "3d-printen-in-de-buurt",
    title: "3D printen in de buurt (Gent, Aalst, Dendermonde)",
    summary:
      "X3DPrints levert vanuit Herzele voor Gent, Aalst en Dendermonde. Lees hoe we lokale projecten aanpakken, wat de logistieke opties zijn en welke voorbeelden we al maakten.",
    highlights: [
      "Korte lijnen: rechtstreeks contact met de maker en afhalen op afspraak in Herzele (tussen Gent en Aalst).",
      "Persoonlijke levering in Dendermonde, Aalst of Gent bespreekbaar; anders verzenden via Bpost met track & trace.",
      "Voorbeelden: winkelmateriaal, prototypes en personalisatie voor events; bekijk de portfolio voor inspiratie.",
    ],
    links: [
      { label: "Lees volledig artikel", href: "/blog/3d-printen-in-de-buurt" },
      { label: "Bekijk portfolio", href: "/portfolio" },
      { label: "Plan afhaling of levering", href: "/contact" },
    ],
    intent: "informational",
    category: "segments-cases",
  },
  {
    id: "3d-printen-voor-beginners",
    title: "3D printen voor beginners",
    summary:
      "Nieuwe gebruiker? Deze gids legt uit welke materialen je kiest, hoe je bestanden voorbereidt en wat een opleiding of workshop kan omvatten.",
    highlights: [
      "PLA Matte is het startpunt: makkelijk te printen, beschikbaar in veel kleuren en ideaal voor proof-of-concepts.",
      "Gebruik de viewer om STL/STEP te uploaden en laat ons meekijken naar wanddiktes en orintatie.",
      "Zoek je opleiding? We bieden korte kennisoverdracht tijdens je project: instellingen, tips en valkuilen.",
    ],
    links: [
      { label: "Lees volledig artikel", href: "/blog/3d-printen-voor-beginners" },
      { label: "Upload je eerste model", href: "/viewer" },
      { label: "Vraag begeleiding", href: "/contact" },
    ],
    intent: "how-to",
    category: "how-to",
  },
  {
    id: "3d-printen-op-bestelling",
    title: "3D printen op bestelling: zo werkt het",
    summary:
      "Van aanvraag tot levering: dit artikel beschrijft het bestelproces bij X3DPrints, inclusief prijsinschatting, voorbeelden en follow-up.",
    highlights: [
      "Stap 1: stuur STL/STEP + context, ontvang binnen n werkdag feedback en prijsinschatting.",
      "Stap 2: productie en kwaliteitscheck; we delen fotos of korte videos als je updates wil.",
      "Stap 3: verzending of afhaling met factuur en herhaalopties voor toekomstige bestellingen.",
    ],
    links: [
      { label: "Lees volledig artikel", href: "/blog/3d-printen-op-bestelling" },
      { label: "Check pricing & calculator", href: "/pricing" },
      { label: "Bestelling starten", href: "/contact" },
    ],
    intent: "transactional",
    category: "materials-pricing",
  },
]

const extraResources = [
  {
    title: "Materialenbibliotheek",
    description: "Deep-dive per filament inclusief voorraadstatus, FAQ en JSON-LD schema's.",
    href: "/materials",
  },
  {
    title: "Prijzen & calculator",
    description: "Indicatieve tarieven met prijsinschatting en uitleg over layerhoogtes, infill en logistiek.",
    href: "/pricing",
  },
  {
    title: "FAQ & support",
    description: "Antwoorden over levertijd, bestandsformaten, nabewerking en verzending.",
    href: "/faq",
  },
  {
    title: "3D printen",
    description: "Pillar over 3D printen: materialen, prijzen, workflow en FAQ op een rij.",
    href: "/3d-printen",
  },
]

const quickLinks = [
  { label: "Filament Vrijdag", href: "#filament-vrijdag" },
  { label: "Maker Monday", href: "#maker-monday" },
  { label: "Use Case Dinsdag", href: "#use-case-dinsdag" },
  { label: "Materialen & pricing", href: "#materials-pricing" },
  { label: "Segmenten & cases", href: "#segments-cases" },
  { label: "How-to & workflows", href: "#how-to" },
]

const articleListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "X3DPrints blog onderwerpen",
  itemListElement: topics.map((topic, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Article",
      headline: topic.title,
      description: topic.summary,
      url: `https://www.x3dprints.be/blog/${topic.id}`,
    },
  })),
}

const blogJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "X3DPrints blog en kennisbank",
  url: "https://www.x3dprints.be/blog",
  inLanguage: "nl-BE",
  blogPost: topics.map((topic) => ({
    "@type": "BlogPosting",
    headline: topic.title,
    description: topic.summary,
    url: `https://www.x3dprints.be/blog/${topic.id}`,
  })),
}

function TopicCard({ topic }: { topic: Topic }) {
  return (
    <GlassCard className="h-full border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur">
      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
        <span>{topic.intent === "transactional" ? "Pricing" : topic.intent === "how-to" ? "How-to" : "Guide"}</span>
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
        <span>SEO intent: {topic.intent}</span>
      </div>
      <h3 className="mt-3 text-xl font-semibold text-slate-900">{topic.title}</h3>
      <p className="mt-2 text-sm text-slate-700">{topic.summary}</p>
      <ul className="mt-4 space-y-2 text-sm text-slate-600">
        {topic.highlights.slice(0, 2).map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap gap-3">
        {topic.links.slice(0, 2).map((link) => (
          <Link
            key={`${topic.id}-${link.href}`}
            href={link.href}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </GlassCard>
  )
}

export default function BlogPage() {
  const filamentTopics = topics.filter((topic) => topic.category === "filament-friday")
  const makerMondayTopics = topics.filter((topic) => topic.category === "maker-monday")
  const useCaseTopics = topics.filter((topic) => topic.category === "use-case-dinsdag")
  const groupedSections = categorySections.map((section) => ({
    ...section,
    topics: topics.filter((topic) => topic.category === section.id),
  }))

  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(140%_80%_at_50%_-10%,rgba(59,130,246,0.18),transparent_65%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.08]" />

      <section className="px-6 pb-12 pt-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl space-y-8">
          <Reveal className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Blog & kennisbank</p>
            <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Snelle antwoorden op materiaal-, prijs- en workflowvragen.
            </h1>
            <p className="text-lg text-slate-700">
              We bundelen alles wat klanten dagelijks vragen: van Filament Vrijdag tot concrete cases en how-to&apos;s. Start met de zoekfunctie of spring meteen naar een categorie.
            </p>
            <div className="flex flex-wrap gap-3">
              <ShimmerButton href="/pricing">Naar pricing & calculator</ShimmerButton>
              <Link
                href="/materials"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Materialenbibliotheek
              </Link>
              <Link
                href="/blog/finishing-friday-schuren-primen-lakken"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Finishing Friday
              </Link>
            </div>
          </Reveal>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(240px,1fr)]">
            <div id="blog-search">
              <BlogSearch topics={topics} />
            </div>
            <GlassCard className="h-full border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Snel naar</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-100 bg-white/80 px-3 py-2 font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-white"
                    >
                      {link.label}
                      <span aria-hidden>-&gt;</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-slate-500">Gebruik de zoekfunctie om alle {topics.length}+ artikels te doorzoeken.</p>
            </GlassCard>
          </div>
        </div>
      </section>

      <section id="filament-vrijdag" className="px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Filament Vrijdag</p>
                <h2 className="mt-2 text-3xl font-semibold text-slate-900">Materiaalreeks voor PLA, PETG, TPU & specials</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Elke vrijdag een nieuw filament, telkens met settings, use cases en interne links naar pricing en contact.
                </p>
              </div>
              <Link
                href="/blog/filament-vrijdag-pla"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
              >
                Start bij aflevering #1
                <span aria-hidden>-&gt;</span>
              </Link>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {filamentTopics.slice(0, 4).map((topic) => (
                <TopicCard key={topic.id} topic={topic} />
              ))}
            </div>
            {filamentTopics.length > 4 ? (
              <details className="mt-6 rounded-3xl border border-white/50 bg-white/80 p-4 shadow-inner backdrop-blur">
                <summary className="cursor-pointer text-sm font-semibold text-indigo-600">
                  Toon {filamentTopics.length - 4} extra artikels
                </summary>
                <div className="mt-4 grid gap-6 md:grid-cols-2">
                  {filamentTopics.slice(4).map((topic) => (
                    <TopicCard key={topic.id} topic={topic} />
                  ))}
                </div>
              </details>
            ) : null}
          </Reveal>
        </div>
      </section>

      {makerMondayTopics.length ? (
        <section id="maker-monday" className="px-6 pb-16 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Maker Monday</p>
                  <h2 className="mt-2 text-3xl font-semibold text-slate-900">Engineering guides voor ontwerp & tolerantie</h2>
                  <p className="mt-2 text-sm text-slate-600">
                    Elke Maker Monday duikt in een ontwerpvraag: scharnieren, toleranties, warping en meer. Praktische tips
                    rechtstreeks uit de studio.
                  </p>
                </div>
                <Link
                  href={makerMondayTopics[0].links[0]?.href ?? "/blog"}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Lees Maker Monday
                  <span aria-hidden>-&gt;</span>
                </Link>
              </div>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {makerMondayTopics.slice(0, 4).map((topic) => (
                  <TopicCard key={topic.id} topic={topic} />
                ))}
              </div>
              {makerMondayTopics.length > 4 ? (
                <details className="mt-6 rounded-3xl border border-white/50 bg-white/80 p-4 shadow-inner backdrop-blur">
                  <summary className="cursor-pointer text-sm font-semibold text-indigo-600">
                    Toon {makerMondayTopics.length - 4} extra artikels
                  </summary>
                  <div className="mt-4 grid gap-6 md:grid-cols-2">
                    {makerMondayTopics.slice(4).map((topic) => (
                      <TopicCard key={topic.id} topic={topic} />
                    ))}
                  </div>
                </details>
              ) : null}
            </Reveal>
          </div>
        </section>
      ) : null}

      {useCaseTopics.length ? (
        <section id="use-case-dinsdag" className="px-6 pb-16 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Use Case Dinsdag</p>
                  <h2 className="mt-2 text-3xl font-semibold text-slate-900">Toepassing-gebaseerde gidsen</h2>
                  <p className="mt-2 text-sm text-slate-600">
                    Realistische scenario’s rond voertuigen, retail, scholen en tabletop. Zo bouw je je eigen roadmap op basis van
                    echte problemen.
                  </p>
                </div>
                <Link
                  href={useCaseTopics[0].links[0]?.href ?? "/blog"}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Lees Use Case Dinsdag
                  <span aria-hidden>-&gt;</span>
                </Link>
              </div>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {useCaseTopics.slice(0, 4).map((topic) => (
                  <TopicCard key={topic.id} topic={topic} />
                ))}
              </div>
              {useCaseTopics.length > 4 ? (
                <details className="mt-6 rounded-3xl border border-white/50 bg-white/80 p-4 shadow-inner backdrop-blur">
                  <summary className="cursor-pointer text-sm font-semibold text-indigo-600">
                    Toon {useCaseTopics.length - 4} extra artikels
                  </summary>
                  <div className="mt-4 grid gap-6 md:grid-cols-2">
                    {useCaseTopics.slice(4).map((topic) => (
                      <TopicCard key={topic.id} topic={topic} />
                    ))}
                  </div>
                </details>
              ) : null}
            </Reveal>
          </div>
        </section>
      ) : null}

      {groupedSections.map((section) => {
        if (!section.topics.length) return null
        const visibleTopics = section.topics.slice(0, 4)
        const extraTopics = section.topics.slice(4)
        return (
          <section key={section.id} id={section.anchor} className="px-6 pb-16 sm:px-8 lg:px-12">
            <div className="mx-auto max-w-6xl">
              <Reveal>
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{section.title}</p>
                    <h2 className="mt-2 text-3xl font-semibold text-slate-900">{section.description}</h2>
                  </div>
                  <Link
                    href="#blog-search"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                  >
                    Zoek binnen deze categorie
                    <span aria-hidden>-&gt;</span>
                  </Link>
                </div>
                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  {visibleTopics.map((topic) => (
                    <TopicCard key={topic.id} topic={topic} />
                  ))}
                </div>
                {extraTopics.length > 0 && (
                  <details className="mt-6 rounded-3xl border border-white/50 bg-white/80 p-4 shadow-inner backdrop-blur">
                    <summary className="cursor-pointer text-sm font-semibold text-indigo-600">
                      Toon {extraTopics.length} extra artikels
                    </summary>
                    <div className="mt-4 grid gap-6 md:grid-cols-2">
                      {extraTopics.map((topic) => (
                        <TopicCard key={topic.id} topic={topic} />
                      ))}
                    </div>
                  </details>
                )}
              </Reveal>
            </div>
          </section>
        )
      })}

      <section className="px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="grid gap-6 md:grid-cols-3">
              {extraResources.map((resource) => (
                <GlassCard key={resource.href} className="h-full border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur">
                  <h3 className="text-lg font-semibold text-slate-900">{resource.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{resource.description}</p>
                  <Link
                    href={resource.href}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
                  >
                    Naar {resource.title}
                    <span aria-hidden>-&gt;</span>
                  </Link>
                </GlassCard>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="flex flex-col gap-6 border border-white/40 bg-white/80 p-8 text-center shadow-xl backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:text-left">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Volgende stap</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900 sm:text-3xl">Klaar voor een intake?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Upload je modellen, vermeld materiaalvoorkeur en laat de calculator een eerste indicatie geven. We sturen binnen 1 werkdag feedback — inclusief suggesties als een ander filament logischer is.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/contact">Plan een gesprek</ShimmerButton>
                <Link href="/viewer" className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                  STL/STEP uploaden
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleListJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }} />
    </main>
  )
}
