import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogSearch from "@/components/BlogSearch"
import ContentTableOfContents from "@/components/ContentTableOfContents"
import { normalizeLocale } from "@/lib/i18n/locales"
import { localizeHref } from "@/lib/i18n/paths"
import OrganizerCta from "@/components/OrganizerCta"

type TopicCategory = "filament-friday" | "maker-monday" | "use-case-dinsdag" | "materials-pricing" | "segments-cases" | "how-to"

type Topic = {
  id: string
  title: string
  summary: string
  highlights: string[]
  links: { label: string; href: string }[]
  date?: string // ISO date; used for sorting (newest first)
  intent: "informational" | "transactional" | "how-to"
  category: TopicCategory
}

type CategorySection = {
  id: Exclude<TopicCategory, "filament-friday" | "maker-monday" | "use-case-dinsdag">
  title: string
  description: string
  anchor: string
}

const CATEGORY_SECTIONS_NL: CategorySection[] = [
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
    description: "Handleidingen over ontwerp, Bambu instellingen, bestanden en finishing.",
    anchor: "how-to",
  },
]

const CATEGORY_SECTIONS_EN: CategorySection[] = [
  {
    id: "materials-pricing",
    title: "Materials & pricing",
    description: "Articles on cost, material choice and quote examples.",
    anchor: "materials-pricing",
  },
  {
    id: "segments-cases",
    title: "Segments & cases",
    description: "Use cases per sector: retail, events, seasonal campaigns, local cases.",
    anchor: "segments-cases",
  },
  {
    id: "how-to",
    title: "How-to & workflows",
    description: "Guides on design, Bambu settings, files and finishing.",
    anchor: "how-to",
  },
]

const TOPICS_NL: Topic[] = [
  {
    id: "tool-organizers-3d-printen",
    title: "Tool organizers 3D printen: van Gridfinity tot Packout",
    date: "2026-01-29",
    summary:
      "Alles wat je moet weten om organizers te laten printen: intake, materiaalkeuze, labelzones, anti-slip en wanneer je kiest voor Gridfinity, Packout, TSTAK of een custom insert.",
    highlights: [
      "Bevat interne links naar de organizers hub, materialen en pricing zodat je meteen kunt plannen.",
      "Uitleg per systeem (Gridfinity, Packout, TSTAK, custom/Skådis) met intakechecklist.",
      "Externe context over pegboards en Packout ecosystemen om EEAT te versterken.",
    ],
    links: [
      { label: "Lees de organizers gids", href: "/blog/tool-organizers-3d-printen" },
      { label: "Organizers hub", href: "/organizers" },
      { label: "Plan een indeling", href: "/contact?material=organizers" },
    ],
    intent: "informational",
    category: "segments-cases",
  },
  {
    id: "gridfinity-modulair-opslagsysteem",
    title: "Gridfinity: modulair opslagsysteem met maatwerk door X3DPrints",
    date: "2026-01-30",
    summary:
      "Uitleg van het 42×42×7 mm raster, magneten, labels, Packout-integraties en waarom X3DPrints de partner is voor custom bins en starterkits.",
    highlights: [
      "Technische kern: raster, magneten, labels, materialen en generators.",
      "Toepassingen van werkplaats tot keuken en Packout-koffers.",
      "Call-to-actions naar Gridfinity pagina en contact met prefill.",
    ],
    links: [
      { label: "Lees Gridfinity gids", href: "/blog/gridfinity-modulair-opslagsysteem" },
      { label: "Gridfinity organizers", href: "/organizers/modugrid" },
      { label: "Vraag een custom bin", href: "/contact?material=modugrid" },
    ],
    intent: "informational",
    category: "segments-cases",
  },
  {
    id: "selectieve-val-aziatische-hoornaar-sint-lievens-houtem",
    title: "Case: selectieve val tegen Aziatische hoornaar (Sint-Lievens-Houtem)",
    date: "2026-02-01",
    summary:
      "Samen met #9520KLIMAAT produceerden we een selectief 3D-geprint deksel voor glazen potten. Lage kost, weinig bijvangst en klaar om snel op te schalen tijdens het vroege voorjaar.",
    highlights: [
      "Selectief design: trechter + ontsnappingsopeningen beperken bijvangst.",
      "PETG Matte voor buitengebruik, batches op maat van lokale acties.",
      "Interne links naar PETG fiche, pricing en contact met prefill.",
    ],
    links: [
      { label: "Lees de case", href: "/cases/selectieve-val-aziatische-hoornaar-sint-lievens-houtem" },
      { label: "PETG materiaalfiche", href: "/materials/petg" },
      { label: "Plan lokale actie", href: "/contact?topic=case-selectieve-val" },
    ],
    intent: "transactional",
    category: "segments-cases",
  },
  {
    id: "filament-vrijdag-pla",
    title: "Filament Vrijdag #1: PLA 3D printen",
    summary:
      "Nieuwe vrijdagreeks over filamenten. Aflevering een legt PLA haarfijn uit: eigenschappen, printinstellingen, varianten en wanneer je beter PETG/TPU kiest.",
    highlights: [
      "Publicatieritme: elke vrijdag een nieuw filament zodat de materialencluster vers blijft in Google.",
      "Interne links naar 3D printen, materialen, pricing en contact met prefill voor PLA aanvragen.",
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
      "Belicht typische use cases (sleeves, soft-touch grips, dempers) plus planningstips rond lagere printsnelheden en droge opslag.",
      "Verweven interne CTAs naar TPU fiche, Material Suggestion Tool en contactformulier met `material=TPU` prefill.",
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
      "Checklist wanneer je wood filament wel/niet inzet en hoe je nozzle clogs vermijdt.",
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
    id: "filament-vrijdag-pc",
    title: "Filament Vrijdag #5: polycarbonaat (PC) 3D printen",
    summary:
      "PC filament staat voor hittebestendigheid en UV-stabiliteit, maar eist droge spoelen, een enclosure en strikte planning. Deze aflevering bundelt settings, droogtijd en realistische use cases.",
    highlights: [
      "SEO focus op zoekwoorden als 'polycarbonaat 3D printen', 'PC filament settings' en 'PC filament drogen' met concrete studio-data.",
      "Benadrukt droogprotocol (8 uur) en planning zodat lezers begrijpen waarom PC duurdere lead times heeft.",
      "Interne links naar de PC materiaalfiche, Material Suggestion Tool en PETG/PLA edities om de cluster sterk te houden.",
    ],
    links: [
      { label: "Lees Filament Vrijdag #5", href: "/blog/filament-vrijdag-pc" },
      { label: "PC materiaalprofiel", href: "/materials/pc" },
      { label: "Plan een PC run", href: "/contact?material=PC" },
    ],
    intent: "informational",
    category: "filament-friday",
  },
  {
    id: "filament-vrijdag-pc-fr",
    title: "Filament Vrijdag #9: PC FR (UL94 V-0) 3D printen",
    summary:
      "Vlamvertragend polycarbonaat voor rail-kasten, PSU covers en elektronica met brandnormen. Instellingen, droogtijd en beslisboom: wanneer PC FR loont en wanneer standaard PC of PETG volstaat.",
    highlights: [
      "Publicatie 23 januari 2026 (vrijdag) om de Filament Vrijdag reeks actueel te houden met safety-materialen.",
      "Interne links naar PC FR en PC materiaalprofielen, pricing en de PC blog voor duidelijk onderscheid.",
      "Bevat externe bronnen (Bambu PC FR guide, UL94 uitleg) voor EEAT en compliance context.",
    ],
    links: [
      { label: "Lees Filament Vrijdag: PC FR", href: "/blog/filament-vrijdag-pc-fr" },
      { label: "PC FR materiaalprofiel", href: "/materials/pc-fr" },
      { label: "Vergelijk met PC blog", href: "/blog/filament-vrijdag-pc" },
    ],
    intent: "informational",
    category: "filament-friday",
  },
  {
    id: "finishing-friday-schuren-primen-lakken",
    title: "Finishing Friday: schuren, primen & lakken",
    summary:
      "Uitleg over schuren, primen en lakken van 3D prints met de nodige nuance: nette FDM prints volstaan vaak, X3DPrints levert daarom basisprints in plaats van volledige lakjobs.",
    highlights: [
      "Doorloopt alle stappen (support removal, droog/nat schuren, primer, lak) zodat je weet wat er echt bij komt kijken.",
      "Legt uit waarom finishing arbeidsintensief is en beter past bij resin workflows of gespecialiseerde lakkerijen.",
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
      "Eerste Maker Monday focust op scharnieren die niet bij de eerste rotatie breken. Materiaalkeuze, orientatie, wanddiktes, pin-toleranties en verstevigingen stap voor stap uitgelegd.",
    highlights: [
      "Legt uit waarom 90% van de scharnieren in PETG hoort en wanneer PLA of TPU enkel cosmetisch of gespecialiseerd inzetbaar is.",
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
      "FDM onderdelen zijn sterk zodra je wanddiktes, ribs en orientatie op FDM afstemt. Deze gids bevat tabellen per materiaal en verstevigingsmethodes die we dagelijks toepassen.",
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
      "Tabellen voor glijdende fits, pen-gat, snapfits en scharnieren, afgestemd op PLA, PETG en TPU.",
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
      "Clips schieten los of breken zodra de buigkracht verkeerd gericht is. Deze gids toont hoe je PLA, PETG en TPU snapfits ontwerpt met de juiste wanddikte, orientatie en tolerantie.",
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
      "Tabellen voor CAD-diameters van M2-M5, plus minimum wanddiktes en fillets rond schroefzones.",
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
      "Layer adhesion tips (orientatie, perimeter count, ribbing) en bridging best practices met duidelijke limieten.",
      "Checklist waarmee je elk onderdeel screent voor productie, plus links naar Maker Monday #2-4 voor verdieping.",
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
      "Checklist voor bosses, tolerantie en orientatie zodat schroeven niet langer de bottleneck zijn.",
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
    id: "maker-monday-snapfit-parts",
    title: "Maker Monday #8: Snap-fit parts die blijven klikken",
    summary:
      "Gids voor snap-fit parts in PLA, PETG en TPU. Types (cantilever, torsie, annular), starttoleranties, arm-diktes, fillets en testplan zodat je clips niet na twee cycli breken.",
    highlights: [
      "Bouwt verder op Maker Monday #2 (wanddiktes) en #3 (toleranties) met concrete waarden voor snap-fit arms en groeven.",
      "Bevat faalmodi-checklist en 5-stappen testprotocol met elephant's foot compensatie en orientatie tips.",
      "Interne links naar materialen, segments en contact plus een externe Hubs referentie voor extra EEAT-signaal.",
    ],
    links: [
      { label: "Lees Maker Monday #8", href: "/blog/maker-monday-snapfit-parts" },
      { label: "Materialenoverzicht", href: "/materials" },
      { label: "Vraag snap-fit review", href: "/contact?topic=maker-monday-snapfits" },
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
      "Voorbeelden van auto- en fietsaccessoires plus duidelijke 'niet printen' scenarios.",
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
      "Painting workflow en scenarios voor DMs, cosplayers en bordspelontwerpers met links naar segments en Finishing Friday.",
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
      "Detailsecties over custom decor, organische vormen en lichtgewicht props in kleine en grotere oplage.",
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
      "STEM-scholen en makerspaces krijgen een kant-en-klaar recept voor PLA, PETG en TPU workflows, inclusief instellingen, planning en projectideeen.",
    highlights: [
      "Standaardsettings voor PLA/PETG/TPU plus lesplanning (ontwerp > slice > print) zodat printers blijven draaien.",
      "Materiaalstrategie (PLA Matte default, PETG voor robotica, TPU voor flex) met links naar materiaalblogs.",
      "Veelvoorkomende projecten, fouten om te vermijden en tips voor duurzame opstelling en budgeting.",
    ],
    links: [
      { label: "Lees Use Case Dinsdag #8", href: "/blog/use-case-dinsdag-stem" },
      { label: "Segment scholen & STEM", href: "/segments/3d-printing-scholen" },
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
      "Concrete mapping: PLA Matte voor marketing en interieur, PETG voor functioneel warm/outdoor, TPU voor grip en demping.",
      "Scenarios (auto-onderdelen, retail display, flexibele kabelhouder) met directe links naar materialen en contact.",
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
      { label: "PLA materialenoverzicht", href: "/materials" },
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
      "Metallic PLA blends voor props, industriele esthetiek en designprints. Hoe krijg je een egale glans zonder finishing?",
    highlights: [
      "Adviseert geharde nozzles en kalmere snelheid om abrasie en artefacten te beperken.",
      "Vergelijkt PLA, PLA Metal en PETG op printgemak, look en feel en hardware-eisen.",
      "Linkt naar pricing, materialen en de volledige Filament Vrijdag esthetische cluster.",
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
      { label: "PLA Silk+ materiaalfiche", href: "/materials/pla-silk" },
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
      "CTAs naar TPU fiche, viewer upload en contact met `material=TPU` prefill voor intake.",
    ],
    links: [
      { label: "Lees TPU use cases", href: "/blog/use-cases-tpu" },
      { label: "Material Suggestion Tool", href: "/materials#material-suggestion-tool" },
      { label: "Vraag TPU advies", href: "/contact?material=TPU" },
    ],
    intent: "informational",
    category: "how-to",
  },
  {
    id: "hoeveel-kost-3d-printen",
    title: "Hoeveel kost 3D printen?",
    summary:
      "Kosten worden bepaald door printtijd, materiaalprijs per kilogram, gewenste afwerking en eventuele ontwerpuren. In het uitgebreide blogartikel lichten we elk kostblok toe inclusief formules en voorbeelden.",
    highlights: [
      "Basistarieven starten vanaf het PLA Matte referentieprofiel; specials zoals Silk, Marble of TPU hebben een opslag van 20-30%.",
      "Printtijd hangt af van laaghoogte en vulling. Fijne lagen (0.12 mm) zien er top uit, maar hebben 15-25% meer machine-uren.",
      "Logistiek (Bpost, afhalen of persoonlijke levering) telt mee in de eindfactuur. Binnen regio Herzele/Gent is afhalen gratis.",
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
    id: "3d-print-prijs-per-stuk",
    title: "3D print prijs per stuk: single vs serie",
    summary:
      "Uitleg van setupkosten, printtijd en schaal met een tabel voor prijs per stuk en optimalisatietips.",
    highlights: [
      "Kostblokken uitgelegd met focus op schaalvoordeel.",
      "Tabel met indicatieve ranges per stuk voor 1, 10 en 50 stuks.",
      "CTA's naar pricing calculator, materiaaltool en offerte.",
    ],
    links: [
      { label: "Lees het prijs per stuk artikel", href: "/blog/3d-print-prijs-per-stuk" },
      { label: "Open pricing calculator", href: "/pricing" },
      { label: "Vraag offerte", href: "/contact?material=pla-matte&quote=Prijs%20per%20stuk%20inschatting" },
    ],
    intent: "transactional",
    category: "materials-pricing",
  },
  {
    id: "3d-print-kosten-besparen",
    title: "3D print kosten besparen: 7 slimme optimalisaties",
    summary:
      "Bespaartips voor 3D prints met impacttabel en concrete optimalisaties voor printtijd en materiaal.",
    highlights: [
      "Impacttabel met support, laaghoogte, infill en batching.",
      "Snelle wins voor lagere kosten per stuk.",
      "CTA's naar pricing calculator, materialen en offerte.",
    ],
    links: [
      { label: "Lees de bespaar tips", href: "/blog/3d-print-kosten-besparen" },
      { label: "Open pricing calculator", href: "/pricing" },
      { label: "Vraag offerte", href: "/contact?material=pla-matte&quote=Kostenoptimalisatie%20voor%203D%20print" },
    ],
    intent: "informational",
    category: "materials-pricing",
  },
  {
    id: "3d-print-materiaal-voor-zichtwerk",
    title: "3D print materiaal voor zichtwerk: PLA Matte vs Silk",
    summary:
      "Vergelijk zichtwerk-materialen met een matrix, scenario's en beslisregels voor designprints.",
    highlights: [
      "Matrix met look, duurzaamheid en beste use-case per materiaal.",
      "Scenario's voor awards, retail displays en interieur.",
      "CTA's naar materiaaltool, pricing en viewer.",
    ],
    links: [
      { label: "Lees de zichtwerk gids", href: "/blog/3d-print-materiaal-voor-zichtwerk" },
      { label: "Material Suggestion Tool", href: "/materials#material-suggestion-tool" },
      { label: "Vraag materiaaladvies", href: "/contact?material=pla-matte&quote=Materiaaladvies%20voor%20zichtwerk" },
    ],
    intent: "informational",
    category: "materials-pricing",
  },
  {
    id: "hittebestendig-3d-print-materiaal",
    title: "Hittebestendig 3D print materiaal: PETG vs PC",
    summary:
      "Vergelijk PLA Tough+, PETG, PC en PC FR voor hittebestendige 3D prints met een matrix en scenario's.",
    highlights: [
      "Matrix met hitte, UV en beste use-case per materiaal.",
      "Scenario's voor elektronica, outdoor brackets en safety parts.",
      "CTA's naar materiaaltool, pricing en viewer.",
    ],
    links: [
      { label: "Lees de hittebestendige gids", href: "/blog/hittebestendig-3d-print-materiaal" },
      { label: "Material Suggestion Tool", href: "/materials#material-suggestion-tool" },
      { label: "Vraag materiaaladvies", href: "/contact?material=pc&quote=Hittebestendig%20materiaal%20advies" },
    ],
    intent: "informational",
    category: "materials-pricing",
  },
  {
    id: "sterke-3d-print-materialen",
    title: "Sterke 3D prints: materiaalkeuze voor functionele onderdelen",
    summary:
      "Vergelijk PLA Tough+, PETG, TPU en PC voor functionele onderdelen met een matrix, scenario's en snelle beslisregels.",
    highlights: [
      "Matrix met sterkte, flexibiliteit en hitte/UV zodat je sneller het juiste materiaal kiest.",
      "Scenario's voor klemmen, behuizingen en dempers met concrete materiaaladviezen.",
      "CTA's naar materiaaltool, pricing en contact met advies-prefill.",
    ],
    links: [
      { label: "Lees de materiaalvergelijking", href: "/blog/sterke-3d-print-materialen" },
      { label: "Material Suggestion Tool", href: "/materials#material-suggestion-tool" },
      { label: "Vraag materiaaladvies", href: "/contact?material=pla-tough&quote=Materiaaladvies%20functionele%20onderdelen" },
    ],
    intent: "informational",
    category: "materials-pricing",
  },
  {
    id: "3d-print-offerte-aanvragen",
    title: "3D print offerte aanvragen: snelle checklist",
    summary:
      "Snelle offerte? Deze checklist toont welke input je nodig hebt, hoe de prijs is opgebouwd en hoe je deadlines en materiaalkeuze duidelijk maakt.",
    highlights: [
      "Checklist met bestanden, afmetingen, aantallen en deadline zodat intake direct klopt.",
      "Prijsopbouw met kostblokken (printtijd, materiaal, nabewerking, levering) plus link naar pricing.",
      "CTA's naar viewer upload, material tool en contact met offerte-prefill.",
    ],
    links: [
      { label: "Lees de offerte checklist", href: "/blog/3d-print-offerte-aanvragen" },
      { label: "Open pricing calculator", href: "/pricing" },
      { label: "Vraag offerte met prefill", href: "/contact?material=pla-matte&quote=Offerte%20aanvraag" },
    ],
    intent: "transactional",
    category: "materials-pricing",
  },
  {
    id: "pla-vs-petg",
    title: "PLA vs PETG: welke moet je kiezen?",
    summary:
      "PLA is ideaal voor designmodellen en snelle prototyping, terwijl PETG beter tegen warmte, UV en impact kan. Vergelijk de materiaalkaarten en kies de blend die past bij jouw toepassing.",
    highlights: [
      "PLA Matte en PLA Tough+ leveren een premium look zonder veel nabewerking. Perfect voor interieur, branding en gebruik binnenshuis.",
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
      "Detail: 0.12-0.16 mm layers en orientatie met gezicht naar boven voor supportvrije features.",
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
      "Silk/Marble voor luxe glans, Translucent voor lichtgloed.",
      "Layer 0.16-0.2 mm; wand > 1.2 mm voor stevige decor.",
      "Ontwerpbestand niet inbegrepen; lever STL/STEP of ontwerpservice.",
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
      "Pastel Silk/Matte PLA, Translucent voor lichtobjecten.",
      "Oogjes/pin-holes integreren, wand > 1.2 mm.",
      "Ontwerp niet inbegrepen; ontwerpservice 45/uur.",
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
      "PETG voor zon/vocht, TPU voor antislip feet.",
      "Layer 0.2 mm voor grote stukken, 0.16 mm voor detail.",
      "Ontwerp niet inbegrepen; ontwerpservice 45/uur.",
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
      "Silk/Marble voor glans, Translucent voor lichtobjecten.",
      "Oogjes integreren, wand 1.6-2 mm voor diffuse gloed.",
      "Ontwerp niet inbegrepen; ontwerpservice 45/uur.",
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
    id: "3d-printen-back-to-school",
    title: "Back to School 3D printen",
    summary:
      "Pennenhouders, naamplaatjes, organizers en educatieve STEM-modellen. Materiaaladvies voor scholen en studenten met levering in aug-sep.",
    highlights: [
      "PLA Matte/PETG voor klasgebruik, TPU voor antislip.",
      "Batchen van namen/klassen voor consistente kleur.",
      "Ontwerp niet inbegrepen; ontwerpservice 45/uur.",
    ],
    links: [
      { label: "Lees volledig artikel", href: "/blog/3d-printen-back-to-school" },
      { label: "Back to School segment", href: "/segments/3d-printing-back-to-school" },
      { label: "Plan schoolprints", href: "/contact?material=pla-matte" },
    ],
    intent: "informational",
    category: "segments-cases",
  },
  {
    id: "3d-printen-valentijn",
    title: "3D printen voor Valentijn cadeaus",
    summary:
      "Hartdecor, naamplaatjes en lichtobjecten in Silk, Matte en Translucent PLA. Inclusief checklist voor leds, magneten en leveropties.",
    highlights: [
      "Silk/Marble voor luxe look, Matte voor zachte pastels, Translucent voor led-gloed.",
      "Uitsparingen voor leds/magneten en antislip feet in TPU.",
      "Ontwerp niet inbegrepen; ontwerpservice 45/uur, leveropties EV of pakketdienst.",
    ],
    links: [
      { label: "Lees volledig artikel", href: "/blog/3d-printen-valentijn" },
      { label: "Valentijn segment", href: "/segments/3d-printing-valentijn" },
      { label: "Plan Valentijnprints", href: "/contact?material=pla-silk" },
    ],
    intent: "informational",
    category: "segments-cases",
  },
  {
    id: "3d-printen-vaderdag-moederdag",
    title: "3D printen voor Vaderdag & Moederdag",
    summary:
      "Gepersonaliseerde sleutelhangers, desk items en naamcadeaus in Silk/Matte/PETG. Tips voor leesbaarheid, afrondingen en leveropties.",
    highlights: [
      "Silk/Matte PLA voor look, PETG voor sterkere items.",
      "Tekstdiepte > 0.6 mm en afgeronde randen voor dagelijks gebruik.",
      "Ontwerpservice 45/uur, levering via EV of pakketdienst.",
    ],
    links: [
      { label: "Lees volledig artikel", href: "/blog/3d-printen-vaderdag-moederdag" },
      { label: "Vaderdag/Moederdag segment", href: "/segments/3d-printing-vaderdag-moederdag" },
      { label: "Plan je gifts", href: "/contact?material=pla-silk" },
    ],
    intent: "informational",
    category: "segments-cases",
  },
  {
    id: "relatiegeschenken-3d-printen",
    title: "Relatiegeschenken 3D printen (B2B gifts)",
    summary:
      "Relatiegeschenken en team gifts: sleutelhangers, desk organizers en awards in Silk/Matte/PETG. Batchen van namen, antislipvoetjes en realistische lead times.",
    highlights: [
      "Silk/Matte voor look, PETG voor sterkte, TPU voor grip.",
      "Tekstdiepte > 0.6 mm en afgeronde randen voor dagelijks gebruik.",
      "Ontwerpservice 45/uur; levering via EV of pakketdienst.",
    ],
    links: [
      { label: "Lees volledig artikel", href: "/blog/relatiegeschenken-3d-printen" },
      { label: "Marketing & events segment", href: "/segments/3d-printing-marketing" },
      { label: "Plan relatiegeschenken", href: "/contact?material=pla-silk" },
    ],
    intent: "transactional",
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
      "Samenwerking met Octopus.be: merk-eigen octopussen, magnetische badges en give-aways met meetbare QR/UTM links. Ideaal voor demos, partnerdagen en onboarding.",
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
      "Interne links naar marketing en events segment plus Antwerpse landingspagina.",
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
      "Een printbaar ontwerp combineert consistente wanddiktes, correcte tolerantie en slimme orientatie. In het lange artikel tonen we exact hoe we STL/STEP voorbereiden voor productie in PLA, PETG en TPU.",
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
    id: "3d-print-ontwerp-checklist",
    title: "3D print ontwerp checklist: model printklaar",
    summary:
      "Checklist voor printklare modellen met richtwaarden voor wanddikte, overhang, tolerantie en assemblage.",
    highlights: [
      "Zes praktische checks om reprints te vermijden en sneller te plannen.",
      "Tabel met richtwaarden voor PLA/PETG versus TPU.",
      "CTA's naar viewer upload, materiaaltool en ontwerpcheck.",
    ],
    links: [
      { label: "Lees de ontwerp checklist", href: "/blog/3d-print-ontwerp-checklist" },
      { label: "Upload je model", href: "/viewer" },
      { label: "Vraag ontwerpcheck", href: "/contact?material=pla-tough&quote=Ontwerpcheck%20voor%203D%20print" },
    ],
    intent: "how-to",
    category: "how-to",
  },
  {
    id: "3d-print-assemblage-gids",
    title: "3D print assemblage gids: paspennen en inserts",
    summary:
      "Assemblage gids met paspennen, speling en bevestiging voor 3D prints inclusief richtwaarden.",
    highlights: [
      "Checklist met deling, paspennen en speling voor betrouwbare montage.",
      "Tabel met richtwaarden voor PLA/PETG en TPU.",
      "CTA's naar viewer, materiaaltool en assemblageadvies.",
    ],
    links: [
      { label: "Lees de assemblage gids", href: "/blog/3d-print-assemblage-gids" },
      { label: "Upload je model", href: "/viewer" },
      { label: "Vraag assemblageadvies", href: "/contact?material=pla-tough&quote=Assemblageadvies%20voor%203D%20print" },
    ],
    intent: "how-to",
    category: "how-to",
  },
  {
    id: "hoe-lang-duurt-3d-printen",
    title: "Hoe lang duurt 3D printen?",
    summary:
      "Doorlooptijd hangt af van de complexiteit, materiaal en finishing. In het artikel leggen we uit hoe we jobs inplannen en hoe jij sneller in de queue komt zonder harde garanties.",
    highlights: [
      "Machine-uren varieren van minder dan een uur tot meer dan een dag per onderdeel. We adviseren hoe je geometrie optimaliseert.",
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
      "Persoonlijke levering in Dendermonde, Aalst of Gent bespreekbaar; anders verzenden via Bpost met track en trace.",
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
      "Gebruik de viewer om STL/STEP te uploaden en laat ons meekijken naar wanddiktes en orientatie.",
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
      "Stap 1: stuur STL/STEP en context, ontvang binnen 1 werkdag feedback en prijsinschatting.",
      "Stap 2: productie en kwaliteitscheck; we delen foto's of korte videos als je updates wil.",
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

const TOPICS_EN: Topic[] = [
  {
    id: "tool-organizers-3d-printing",
    title: "3D printing tool organizers: Gridfinity, Packout and custom",
    date: "2026-01-29",
    summary:
      "Complete guide to printed organizers: intake checklist, materials, label zones, anti-slip and when to choose Gridfinity, Packout, TSTAK or fully custom inserts.",
    highlights: [
      "Internal links to the organizers hub, materials and pricing so you can plan fast.",
      "System-by-system guidance (Gridfinity/gridfinity-style, Packout, TSTAK, custom/Skådis) plus what to send during intake.",
      "External context on pegboards and Packout ecosystems to strengthen EEAT.",
    ],
    links: [
      { label: "Read the organizers guide", href: "/blog/tool-organizers-3d-printing" },
      { label: "Organizers hub", href: "/organizers" },
      { label: "Plan a layout", href: "/contact?material=organizers" },
    ],
    intent: "informational",
    category: "segments-cases",
  },
  {
    id: "gridfinity-modular-storage-system",
    title: "Gridfinity: modular storage system, custom-fit by X3DPrints",
    date: "2026-01-30",
    summary:
      "Explains the 42×42×7 mm grid, magnets, labels, Packout integrations and why X3DPrints is the partner for custom bins and starter kits.",
    highlights: [
      "Technical core: grid, magnets, labels, materials and generators.",
      "Use cases from workshops to kitchens and Packout cases.",
      "Calls-to-action to the Gridfinity page and contact prefill.",
    ],
    links: [
      { label: "Read the Gridfinity guide", href: "/en/blog/gridfinity-modular-storage-system" },
      { label: "Gridfinity organizers", href: "/en/organizers/modugrid" },
      { label: "Request a custom bin", href: "/en/contact?material=modugrid" },
    ],
    intent: "informational",
    category: "segments-cases",
  },
  {
    id: "selectieve-val-aziatische-hoornaar-sint-lievens-houtem",
    title: "Case: selective trap for the Asian hornet (Sint-Lievens-Houtem)",
    date: "2026-02-01",
    summary:
      "With #9520KLIMAAT we produce a selective 3D printed lid for wide-mouth jars. Low cost, low bycatch and ready to scale during early spring.",
    highlights: [
      "Selective design: funnel plus escape openings to reduce bycatch.",
      "PETG Matte for outdoor use, batches tailored to community actions.",
      "Internal links to PETG sheet, pricing and contact with prefill.",
    ],
    links: [
      { label: "Read the case", href: "/en/cases/selectieve-val-aziatische-hoornaar-sint-lievens-houtem" },
      { label: "PETG material sheet", href: "/en/materials/petg" },
      { label: "Plan a local action", href: "/en/contact?topic=case-selective-trap" },
    ],
    intent: "transactional",
    category: "segments-cases",
  },
  {
    id: "filament-vrijdag-pla",
    title: "Filament Friday #1: PLA 3D printing",
    summary:
      "New Friday series on filaments. Episode one breaks down PLA: properties, print settings, variants, and when PETG/TPU makes more sense.",
    highlights: [
      "Publishing cadence: a new filament every Friday so the materials cluster stays fresh in Google.",
      "Internal links to 3D printing, materials, pricing and contact with PLA prefill.",
      "The article links to external sources (Prusa, Ultimaker, MatterHackers) to strengthen topical authority.",
    ],
    links: [
      { label: "Read Filament Friday #1", href: "/blog/filament-vrijdag-pla" },
      { label: "3D printing pillar", href: "/3d-printen" },
      { label: "Materials library", href: "/materials" },
      { label: "Pricing and calculator", href: "/pricing" },
    ],
    intent: "informational",
    category: "filament-friday",
  },
  {
    id: "filament-vrijdag-petg",
    title: "Filament Friday #2: PETG 3D printing",
    summary:
      "PETG is the workhorse for functional prints. In episode two you get settings, moisture management tips, variants (solid/matte/translucent/CF) and decision criteria versus PLA and TPU.",
    highlights: [
      "Publish date 12 September 2025 to build weekly momentum toward autumn campaigns.",
      "Focus on outdoor, machine environments and combinations (PLA cover + PETG core), including pricing insights.",
      "Includes external sources (Prusa, Ultimaker, MatterHackers) for extra EEAT signal.",
    ],
    links: [
      { label: "Read Filament Friday #2", href: "/blog/filament-vrijdag-petg" },
      { label: "Compare PLA vs PETG", href: "/blog/pla-vs-petg" },
      { label: "Plan a PETG run", href: "/contact?material=PETG%20Solid" },
    ],
    intent: "informational",
    category: "filament-friday",
  },
  {
    id: "filament-vrijdag-tpu",
    title: "Filament Friday #3: TPU 3D printing",
    summary:
      "Episode three focuses on TPU: flexible filament for bumpers, grips and dampers. We share studio settings, variants (95A, soft blends) and decision criteria versus PLA/PETG.",
    highlights: [
      "Publish 19 September 2025 so the Filament Friday series keeps weekly momentum toward Q4.",
      "Highlights typical use cases (sleeves, soft-touch grips, dampers) plus planning tips around slower print speeds and dry storage.",
      "Weave internal CTAs to the TPU sheet, Material Suggestion Tool and contact form with `material=TPU` prefill.",
    ],
    links: [
      { label: "Read Filament Friday #3", href: "/blog/filament-vrijdag-tpu" },
      { label: "TPU material sheet", href: "/materials/tpu" },
      { label: "Request TPU advice", href: "/contact?material=TPU" },
    ],
    intent: "informational",
    category: "filament-friday",
  },
  {
    id: "filament-vrijdag-pla-wood",
    title: "Filament Friday #4: PLA Wood and specials",
    summary:
      "Wood filament, marble and silk blends for premium props and interior pieces. Settings, post-processing and combinations with standard PLA.",
    highlights: [
      "Based on the Bambu PLA Wood TDS (190-240 degC, 35-45 degC bed) and studio experience with marble and silk.",
      "Checklist for when to use wood filament and how to avoid nozzle clogs.",
      "Links to PLA/PETG/TPU editions so the material cluster forms an internal mesh.",
    ],
    links: [
      { label: "Read Filament Friday #4", href: "/blog/filament-vrijdag-pla-wood" },
      { label: "PLA Wood material sheet", href: "/materials/pla-wood" },
      { label: "Plan a PLA Wood print", href: "/contact?material=PLA%20Wood" },
    ],
    intent: "informational",
    category: "filament-friday",
  },
  {
    id: "filament-vrijdag-pc",
    title: "Filament Friday #5: polycarbonate (PC) 3D printing",
    summary:
      "PC filament stands for heat resistance and UV stability, but demands dry spools, an enclosure and strict planning. This episode bundles settings, drying time and realistic use cases.",
    highlights: [
      "SEO focus on keywords like 'polycarbonate 3D printing', 'PC filament settings' and 'PC filament drying' with concrete studio data.",
      "Emphasizes drying protocol (8 hours) and planning so readers understand why PC has longer lead times.",
      "Internal links to the PC material sheet, Material Suggestion Tool and PETG/PLA editions to keep the cluster strong.",
    ],
    links: [
      { label: "Read Filament Friday #5", href: "/blog/filament-vrijdag-pc" },
      { label: "PC material profile", href: "/materials/pc" },
      { label: "Plan a PC run", href: "/contact?material=PC" },
    ],
    intent: "informational",
    category: "filament-friday",
  },
  {
    id: "filament-vrijdag-pc-fr",
    title: "Filament Friday #9: PC FR (UL94 V-0) 3D printing",
    summary:
      "Flame-retardant polycarbonate for enclosures with safety requirements. Settings, drying and a decision path vs standard PC and PETG.",
    highlights: [
      "Published January 23, 2026 (Friday) to keep the Filament Friday series fresh with safety materials.",
      "Internal links to PC FR and PC material profiles, pricing, and the PC article for clear differentiation.",
      "Includes external refs (Bambu PC FR guide, UL94 overview) to strengthen EEAT and compliance context.",
    ],
    links: [
      { label: "Read Filament Friday: PC FR", href: "/en/blog/filament-vrijdag-pc-fr" },
      { label: "PC FR material profile", href: "/en/materials/pc-fr" },
      { label: "Compare to PC article", href: "/en/blog/filament-vrijdag-pc" },
    ],
    intent: "informational",
    category: "filament-friday",
  },
  {
    id: "filament-vrijdag-pc-fr",
    title: "Filament Friday #9: PC FR (UL94 V-0) 3D printing",
    summary:
      "Flame-retardant polycarbonate for enclosures with safety requirements. Settings, drying and a decision path vs. standard PC and PETG.",
    highlights: [
      "Published January 23, 2026 (Friday) to keep the Filament Friday series fresh with safety materials.",
      "Internal links to PC FR and PC material profiles, pricing, and the PC article for clear differentiation.",
      "Includes external refs (Bambu PC FR guide, UL94 overview) to strengthen EEAT and compliance context.",
    ],
    links: [
      { label: "Read Filament Friday: PC FR", href: "/blog/filament-vrijdag-pc-fr" },
      { label: "PC FR material profile", href: "/materials/pc-fr" },
      { label: "Compare to PC article", href: "/blog/filament-vrijdag-pc" },
    ],
    intent: "informational",
    category: "filament-friday",
  },
  {
    id: "finishing-friday-schuren-primen-lakken",
    title: "Finishing Friday: sanding, priming and painting",
    summary:
      "Guide to sanding, priming and painting 3D prints with the right nuance: clean FDM prints are often enough, so X3DPrints delivers clean base prints instead of full paint jobs.",
    highlights: [
      "Walks through all steps (support removal, dry/wet sanding, primer, paint) so you know what is involved.",
      "Explains why finishing is labor intensive and better suited to resin workflows or specialized paint shops.",
      "Tips to prep your design, layer height and material choice for DIY finishing.",
    ],
    links: [
      { label: "Read Finishing Friday", href: "/blog/finishing-friday-schuren-primen-lakken" },
      { label: "3D printing overview", href: "/3d-printen" },
      { label: "Pricing and calculator", href: "/pricing" },
    ],
    intent: "informational",
    category: "maker-monday",
  },
  {
    id: "maker-monday-fdm-scharnieren",
    title: "Maker Monday #1: Designing FDM hinges",
    summary:
      "First Maker Monday focuses on hinges that do not break on first rotation. Material choice, orientation, wall thickness, pin tolerances and reinforcements explained step by step.",
    highlights: [
      "Explains why 90% of hinges belong in PETG and when PLA or TPU is only cosmetic or specialized.",
      "Tables for minimum wall thickness, pin diameters and clearances so your design works right away.",
      "Points to upcoming Maker Monday topics on tolerances and warping to structure the knowledge hub.",
    ],
    links: [
      { label: "Read Maker Monday #1", href: "/blog/maker-monday-fdm-scharnieren" },
      { label: "Materials overview", href: "/materials" },
      { label: "Request hinge review", href: "/contact?topic=maker-monday-hinges" },
    ],
    intent: "how-to",
    category: "maker-monday",
  },
  {
    id: "maker-monday-wanddiktes-ribs",
    title: "Maker Monday #2: Wall thickness and ribs",
    summary:
      "FDM parts are strong when wall thickness, ribs and orientation match FDM constraints. This guide includes tables per material and reinforcement methods we use daily.",
    highlights: [
      "Wall thickness table for PLA, PETG and TPU plus why infill should never be the hero.",
      "Rib and gusset guidelines (thickness, height, fillets) and sandwich constructions for torsional stiffness.",
      "Links to future Maker Mondays on tolerances and warping so you can plan the full design process.",
    ],
    links: [
      { label: "Read Maker Monday #2", href: "/blog/maker-monday-wanddiktes-ribs" },
      { label: "Materials overview", href: "/materials" },
      { label: "Request wall thickness review", href: "/contact?topic=maker-monday-walls" },
    ],
    intent: "how-to",
    category: "maker-monday",
  },
  {
    id: "maker-monday-toleranties-3d-printen",
    title: "Maker Monday #3: Tolerances for 3D printing",
    summary:
      "How much clearance do you need for pin-and-hole, snap fits and hinges? This guide bundles studio tolerances for PLA, PETG and TPU plus slicer tips.",
    highlights: [
      "Tables for sliding fits, pin-and-hole, snap fits and hinges, tuned for PLA, PETG and TPU.",
      "Explains clearance per use case (sliding, rotation) and how line width, elephant's foot and hole compensation affect it.",
      "Links to Maker Monday #1 (hinges) and #2 (wall thickness) for a full engineering workflow.",
    ],
    links: [
      { label: "Read Maker Monday #3", href: "/blog/maker-monday-toleranties-3d-printen" },
      { label: "Materials overview", href: "/materials" },
      { label: "Request tolerance review", href: "/contact?topic=maker-monday-tolerances" },
    ],
    intent: "how-to",
    category: "maker-monday",
  },
  {
    id: "maker-monday-snapfits",
    title: "Maker Monday #4: Designing snap fits and clips",
    summary:
      "Clips pop loose or break when the bending force is wrong. This guide shows how to design PLA, PETG and TPU snap fits with correct wall thickness, orientation and tolerance.",
    highlights: [
      "Tables for arm thickness per material plus recommended arm lengths to spread stress.",
      "Tolerance and rib guidelines so the snap fit actually clicks without breaking, with internal links to Maker Monday #2 and #3.",
      "Material choice tradeoffs (PLA for cosmetic, PETG for flex, TPU for dampers) plus test methods for quick iterations.",
    ],
    links: [
      { label: "Read Maker Monday #4", href: "/blog/maker-monday-snapfits" },
      { label: "Materials overview", href: "/materials" },
      { label: "Request clip review", href: "/contact?topic=maker-monday-snapfits" },
    ],
    intent: "how-to",
    category: "maker-monday",
  },
  {
    id: "maker-monday-schroefdraad-inserts",
    title: "Maker Monday #5: Threads and inserts",
    summary:
      "Fasteners are often the Achilles heel of FDM prints. This guide bundles design rules for screw holes, heat-set inserts, bosses and printed threads in PLA, PETG and TPU.",
    highlights: [
      "Tables for CAD diameters from M2-M5, plus minimum wall thickness and fillets around screw zones.",
      "Heat-set insert checklist with chamfers, pocket sizing and material choice (PLA versus PETG).",
      "Tips for self-tapping screws, captive nuts and when printed threads actually work.",
    ],
    links: [
      { label: "Read Maker Monday #5", href: "/blog/maker-monday-schroefdraad-inserts" },
      { label: "Materials overview", href: "/materials" },
      { label: "Request fastener advice", href: "/contact?topic=maker-monday-fasteners" },
    ],
    intent: "how-to",
    category: "maker-monday",
  },
  {
    id: "maker-monday-warping-layer-cracks",
    title: "Maker Monday #6: Warping, layer cracks and bridging",
    summary:
      "Print problems often start in CAD. This guide shows how to design corners, walls and bridges so PLA, PETG and TPU do not warp, crack or sag.",
    highlights: [
      "Rules of thumb for chamfers, ribbing and splitting large parts to reduce warping.",
      "Layer adhesion tips (orientation, perimeter count, ribbing) and bridging best practices with clear limits.",
      "Checklist to screen every part before production, plus links to Maker Monday #2-4 for depth.",
    ],
    links: [
      { label: "Read Maker Monday #6", href: "/blog/maker-monday-warping-layer-cracks" },
      { label: "Materials overview", href: "/materials" },
      { label: "Request design review", href: "/contact?topic=maker-monday-warping" },
    ],
    intent: "how-to",
    category: "maker-monday",
  },
  {
    id: "maker-monday-schroefdraad-bevestigingen",
    title: "Maker Monday #7: Threads and fasteners",
    summary:
      "New deep dive on printed threads, self-tapping screws and heat-set inserts. With table values for pilot holes, insert pockets and material choices for PLA, PETG and TPU.",
    highlights: [
      "Concrete tables for printed threads (M10-M30), self-tappers (M2.5-M4) and heat-set pockets.",
      "Checklist for bosses, tolerances and orientation so screws are no longer the bottleneck.",
      "Call-to-action to flag high-temp (ABS/ASA/nylon) needs during intake for partner solutions.",
    ],
    links: [
      { label: "Read Maker Monday #7", href: "/blog/maker-monday-schroefdraad-bevestigingen" },
      { label: "Materials overview", href: "/materials" },
      { label: "Request fastener advice", href: "/contact?topic=maker-monday-fasteners" },
    ],
    intent: "how-to",
    category: "maker-monday",
  },
  {
    id: "maker-monday-snapfit-parts",
    title: "Maker Monday #8: Snap-fit parts that keep clicking",
    summary:
      "Guide for snap-fit parts in PLA, PETG and TPU. Types (cantilever, torsion, annular), starting tolerances, arm thickness, fillets and test plan so your clips survive more than two cycles.",
    highlights: [
      "Builds on Maker Monday #2 (wall thickness) and #3 (tolerances) with concrete values for snap-fit arms and grooves.",
      "Failure mode checklist and 5-step test protocol with elephant's foot compensation and orientation tips.",
      "Internal links to materials, segments and contact plus an external Hubs reference for extra EEAT signal.",
    ],
    links: [
      { label: "Read Maker Monday #8", href: "/blog/maker-monday-snapfit-parts" },
      { label: "Materials overview", href: "/materials" },
      { label: "Request snap-fit review", href: "/contact?topic=maker-monday-snapfits" },
    ],
    intent: "how-to",
    category: "maker-monday",
  },
  {
    id: "use-case-dinsdag-auto-fiets",
    title: "Use Case Tuesday #1: Car and bike accessories",
    summary:
      "Application-based guide to 3D printed mounts, clamps and anti-rattle parts for vehicles. Focus on PETG and TPU, with design rules against heat, UV and vibration.",
    highlights: [
      "Material comparison PLA vs PETG vs TPU for dashboards, bikes and outdoor use.",
      "Design checklist (tolerances, ribbing, inserts) with references to Maker Monday #2, #3, #5 and #6.",
      "Examples of car and bike accessories plus clear 'do not print' scenarios.",
    ],
    links: [
      { label: "Read Use Case Tuesday #1", href: "/blog/use-case-dinsdag-auto-fiets" },
      { label: "Materials overview", href: "/materials" },
      { label: "Request project advice", href: "/contact?topic=use-case-auto-fiets" },
    ],
    intent: "how-to",
    category: "use-case-dinsdag",
  },
  {
    id: "use-case-dinsdag-retail-displays",
    title: "Use Case Tuesday #2: Retail displays and shop windows",
    summary:
      "Retail needs aesthetics and reliability under spotlights. This guide shows which PLA, PETG or TPU blends work for signage, merchandising props and lighted displays.",
    highlights: [
      "Material comparison (PLA Matte, PETG Solid/Matte/Translucent, PLA Silk/Marble/Wood, TPU) with concrete use cases.",
      "Design checklist for wall thickness, tolerance, mounting and color consistency with links to Maker Monday articles.",
      "Cost optimization tips such as shell-only prints, choosing color in filament, and combining materials for a premium look.",
    ],
    links: [
      { label: "Read Use Case Tuesday #2", href: "/blog/use-case-dinsdag-retail-displays" },
      { label: "Materials overview", href: "/materials" },
      { label: "Request retail advice", href: "/contact?topic=use-case-retail" },
    ],
    intent: "how-to",
    category: "use-case-dinsdag",
  },
  {
    id: "use-case-dinsdag-scholen",
    title: "Use Case Tuesday #3: 3D printing for schools",
    summary:
      "Education needs predictable workflows, safe materials and low failure rate. This guide bundles material advice, lesson structure and collaboration with X3DPrints.",
    highlights: [
      "Material matrix (PLA Matte vs PETG vs TPU) with clear warnings around ventilation and difficulty.",
      "Workflow plan: centralized slicing, Maker Monday checklists, low-failure preset and remix projects.",
      "Troubleshooting bed adhesion, warping and class duration, plus how schools outsource larger prints.",
    ],
    links: [
      { label: "Read Use Case Tuesday #3", href: "/blog/use-case-dinsdag-scholen" },
      { label: "Materials overview", href: "/materials" },
      { label: "Request school advice", href: "/contact?topic=use-case-scholen" },
    ],
    intent: "how-to",
    category: "use-case-dinsdag",
  },
  {
    id: "use-case-dinsdag-tabletop",
    title: "Use Case Tuesday #4: Tabletop and props",
    summary:
      "Guide for minis, terrain and cosplay props with PLA Matte, Marble, Silk and PETG. Includes FDM vs SLA comparison, finishing workflow and segment links.",
    highlights: [
      "Material matrix for minis, terrain and props with clear reasons to choose PLA Matte, Marble, Silk, PETG or TPU.",
      "Design and slicing checklist (detail scaling, layer heights, seam control, tree supports, splitting with inserts).",
      "Painting workflow and scenarios for DMs, cosplayers and board game designers with links to segments and Finishing Friday.",
    ],
    links: [
      { label: "Read Use Case Tuesday #4", href: "/blog/use-case-dinsdag-tabletop" },
      { label: "Tabletop segment", href: "/segments/3d-printing-tabletop" },
      { label: "Request props advice", href: "/contact?topic=use-case-tabletop" },
    ],
    intent: "how-to",
    category: "use-case-dinsdag",
  },
  {
    id: "use-case-dinsdag-productontwikkeling",
    title: "Use Case Tuesday #5: Product development",
    summary:
      "Prototype journey from form-study models to high-fidelity showpieces with PLA, PETG, TPU and aesthetic blends. Includes hybrid builds and a test checklist.",
    highlights: [
      "Three prototype phases with concrete material choices (PLA Matte, PETG, Silk/Marble/Wood) and examples.",
      "Hybrid constructions (PLA shell + PETG core, PETG frame + TPU) plus Material Suggestion Tool integration.",
      "Design rules with links to Maker Monday #2/#3/#5, test checklist and cost optimization for R&D teams.",
    ],
    links: [
      { label: "Read Use Case Tuesday #5", href: "/blog/use-case-dinsdag-productontwikkeling" },
      { label: "Prototype segment", href: "/segments/3d-printing-prototypes" },
      { label: "Request product advice", href: "/contact?topic=use-case-productontwikkeling" },
    ],
    intent: "how-to",
    category: "use-case-dinsdag",
  },
  {
    id: "use-case-dinsdag-events",
    title: "Use Case Tuesday #6: Events and trade shows",
    summary:
      "Everything about 3D prints for branding, props and booth parts. Includes material choice, spotlight reality and modular design principles.",
    highlights: [
      "Material matrices for PLA Matte, Marble, Silk+, PETG and TPU with concrete event use cases.",
      "Checklist for heat management, transport-proof designs and common requests (logos, stands, sensor mounts).",
      "When to choose 3D printing versus CNC/foam plus cost and deadline realities for event projects.",
    ],
    links: [
      { label: "Read Use Case Tuesday #6", href: "/blog/use-case-dinsdag-events" },
      { label: "Marketing and events segment", href: "/segments/3d-printing-marketing" },
      { label: "Request event advice", href: "/contact?topic=use-case-events" },
    ],
    intent: "how-to",
    category: "use-case-dinsdag",
  },
  {
    id: "use-case-dinsdag-interieur",
    title: "Use Case Tuesday #7: Interior and decor",
    summary:
      "Interior architects and makers use PLA Matte, Marble, Wood and Metal for sculptures, wall panels and retail props. This guide shows material choices, heat behavior and workflow.",
    highlights: [
      "Detail sections on custom decor, organic shapes and lightweight props in small runs.",
      "Material overview (PLA Matte/Marble/Wood/Metal, PETG) plus heat advice with links to material blogs.",
      "Design workflow, project examples, cost drivers and when 3D printing beats wood/CNC.",
    ],
    links: [
      { label: "Read Use Case Tuesday #7", href: "/blog/use-case-dinsdag-interieur" },
      { label: "Marketing and decor segment", href: "/segments/3d-printing-marketing" },
      { label: "Request interior advice", href: "/contact?topic=use-case-interieur" },
    ],
    intent: "how-to",
    category: "use-case-dinsdag",
  },
  {
    id: "use-case-dinsdag-stem",
    title: "Use Case Tuesday #8: Makerspaces and STEM",
    summary:
      "STEM schools and makerspaces get a ready-to-run recipe for PLA, PETG and TPU workflows, including settings, planning and project ideas.",
    highlights: [
      "Standard settings for PLA/PETG/TPU plus lesson planning (design > slice > print) so printers keep running.",
      "Material strategy (PLA Matte default, PETG for robotics, TPU for flex) with links to material blogs.",
      "Common projects, mistakes to avoid and tips for sustainable setup and budgeting.",
    ],
    links: [
      { label: "Read Use Case Tuesday #8", href: "/blog/use-case-dinsdag-stem" },
      { label: "Schools and STEM segment", href: "/segments/3d-printing-scholen" },
      { label: "Request STEM advice", href: "/contact?topic=use-case-stem" },
    ],
    intent: "how-to",
    category: "use-case-dinsdag",
  },
  {
    id: "juiste-3d-print-materiaal",
    title: "How-to: choose the right 3D printing material",
    summary:
      "Decision guide that walks you through environment, temperature and functionality. Compare PLA Matte, PETG and TPU, and link through to materials and pricing.",
    highlights: [
      "Flowchart: indoor/outdoor, hot/cold, decorative/functional, rigid/flexible so you can shortlist faster.",
      "Concrete mapping: PLA Matte for marketing and interior, PETG for functional warm/outdoor, TPU for grip and damping.",
      "Scenarios (car parts, retail display, flexible cable holder) with direct links to materials and contact.",
    ],
    links: [
      { label: "Read the how-to", href: "/blog/juiste-3d-print-materiaal" },
      { label: "View materials", href: "/materials" },
      { label: "See pricing impact", href: "/pricing" },
    ],
    intent: "how-to",
    category: "how-to",
  },
  {
    id: "filament-vrijdag-pla-marble",
    title: "Filament Friday #5: PLA Marble",
    summary:
      "Stone look without the weight: PLA Marble blends for interior, retail and cosplay. Includes settings, troubleshooting and when finishing is unnecessary.",
    highlights: [
      "Starts from the PLA profile and Bambu guide, but focuses on texture and 0.6 mm nozzle tips.",
      "Compares Marble with PLA Matte and PETG so you know where the aesthetic value sits.",
      "Links to Finishing Friday to explain why we keep FDM clean without paint.",
    ],
    links: [
      { label: "Read Filament Friday #5", href: "/blog/filament-vrijdag-pla-marble" },
      { label: "PLA materials overview", href: "/materials" },
      { label: "Request PLA Marble advice", href: "/contact?material=PLA%20Marble" },
    ],
    intent: "informational",
    category: "filament-friday",
  },
  {
    id: "filament-vrijdag-pla-glow",
    title: "Filament Friday #6: PLA Glow",
    summary:
      "Glow-in-the-dark PLA for cosplay, signage and playful design. Settings, hardware tips and when glow really adds value.",
    highlights: [
      "Recommends hardened nozzles and slower speeds to limit abrasion.",
      "Shares settings and wall thickness tips to maximize glow intensity.",
      "Links to pricing, materials and Finishing Friday so the materials cluster stays consistent.",
    ],
    links: [
      { label: "Read Filament Friday #6", href: "/blog/filament-vrijdag-pla-glow" },
      { label: "Materials library", href: "/materials" },
      { label: "Request PLA Glow advice", href: "/contact?material=PLA%20Glow" },
    ],
    intent: "informational",
    category: "filament-friday",
  },
  {
    id: "filament-vrijdag-pla-metal",
    title: "Filament Friday #7: PLA Metal",
    summary:
      "Metallic PLA blends for props, industrial aesthetics and design prints. How do you get an even sheen without finishing?",
    highlights: [
      "Recommends hardened nozzles and slower speeds to reduce abrasion and artifacts.",
      "Compares PLA, PLA Metal and PETG on printability, look and hardware requirements.",
      "Links to pricing, materials and the full Filament Friday aesthetic cluster.",
    ],
    links: [
      { label: "Read Filament Friday #7", href: "/blog/filament-vrijdag-pla-metal" },
      { label: "Materials library", href: "/materials" },
      { label: "Request PLA Metal advice", href: "/contact?material=PLA%20Metal" },
    ],
    intent: "informational",
    category: "filament-friday",
  },
  {
    id: "filament-vrijdag-pla-silk-plus",
    title: "Filament Friday #8: PLA Silk+",
    summary:
      "High-gloss PLA Silk+ for branding props, awards and content production. You get the sheen of silk, but with a tougher blend so parts survive multiple events.",
    highlights: [
      "Studio settings for shine without stringing, plus variants (solid, metallic, gradient) and when to choose each.",
      "Clear decision tree between Silk+, Matte, Marble and PETG so visuals and mechanical needs stay balanced.",
      "Links to materials, pricing and contact with `material=PLA Silk+` prefill to speed intake.",
    ],
    links: [
      { label: "Read Filament Friday #8", href: "/blog/filament-vrijdag-pla-silk-plus" },
      { label: "PLA Silk+ material sheet", href: "/materials/pla-silk" },
      { label: "Request Silk+ advice", href: "/contact?material=PLA%20Silk%2B" },
    ],
    intent: "informational",
    category: "filament-friday",
  },
  {
    id: "use-cases-tpu",
    title: "Use cases: how customers use TPU in practice",
    summary:
      "Bonus episode with concrete TPU projects: sleeves for IoT, soft-touch grips in production and retail props with dampers. Includes playbooks and planning tips.",
    highlights: [
      "Case studies describe settings (wall thickness, shore hardness) and how we build hybrid TPU/PLA parts.",
      "Sector playbooks for electronics, tooling and retail so you see where TPU pays off.",
      "CTAs to the TPU sheet, viewer upload and contact with `material=TPU` prefill for intake.",
    ],
    links: [
      { label: "Read TPU use cases", href: "/blog/use-cases-tpu" },
      { label: "Material Suggestion Tool", href: "/materials#material-suggestion-tool" },
      { label: "Request TPU advice", href: "/contact?material=TPU" },
    ],
    intent: "informational",
    category: "segments-cases",
  },
  {
    id: "hoeveel-kost-3d-printen",
    title: "How much does 3D printing cost?",
    summary:
      "Costs are driven by print time, material price per kilogram, desired finish and any design hours. The long article breaks down each cost block with formulas and examples.",
    highlights: [
      "Base rates start from the PLA Matte reference profile; specials like Silk, Marble or TPU add 20-30%.",
      "Print time depends on layer height and infill. Fine layers (0.12 mm) look great but add 15-25% more machine hours.",
      "Logistics (Bpost, pickup or personal delivery) factor into the final invoice. Pickup in the Herzele/Ghent region can be free.",
    ],
    links: [
      { label: "Read full article", href: "/blog/hoeveel-kost-3d-printen" },
      { label: "View pricing and calculator", href: "/pricing" },
      { label: "Request a quote", href: "/contact" },
    ],
    intent: "transactional",
    category: "materials-pricing",
  },
  {
    id: "pla-vs-petg",
    title: "PLA vs PETG: which should you choose?",
    summary:
      "PLA is ideal for design models and fast prototyping, while PETG handles heat, UV and impact better. Compare the material cards and choose the blend that fits your use case.",
    highlights: [
      "PLA Matte and PLA Tough+ deliver a premium look without much post-processing. Perfect for interior, branding and indoor use.",
      "PETG stays dimensionally stable up to about 80 C and is more chemical resistant. Choose this for outdoor use, mechanical parts and liquid contact.",
      "Need flexibility? TPU (shore 95A) provides shock absorption for bumpers or grips. Combine with a PLA shell for hybrid parts.",
    ],
    links: [
      { label: "Read full article", href: "/blog/pla-vs-petg" },
      { label: "Compare materials", href: "/materials" },
      { label: "See PETG example project", href: "/materials/petg" },
    ],
    intent: "informational",
    category: "materials-pricing",
  },
  {
    id: "3d-printen-mini-figuren",
    title: "3D printing miniatures for tabletop gaming",
    summary:
      "D&D and Warhammer minis with crisp details, sturdy bases and safe delivery. Tips for layer height, supports, material choice and dice towers with grip.",
    highlights: [
      "Detail: 0.12-0.16 mm layers and orientation with the face up for support-free features.",
      "Materials: PLA Matte for clean visuals, PETG for sturdy props/terrain, TPU for rubber feet under dice towers.",
      "Delivery: personal EV delivery by zone or parcel service; fragile minis packed separately.",
    ],
    links: [
      { label: "Read full article", href: "/blog/3d-printen-mini-figuren" },
      { label: "See DnD mini", href: "/portfolio" },
      { label: "Dice tower example", href: "/portfolio" },
    ],
    intent: "informational",
    category: "segments-cases",
  },
  {
    id: "3d-printen-herfst-halloween",
    title: "3D printing for autumn and Halloween",
    summary:
      "Pumpkins, haunted props and lanterns in Silk/Marble/Translucent PLA. Includes tips for LEDs, wall thickness and delivery zones.",
    highlights: [
      "Silk/Marble for premium shine, Translucent for light glow.",
      "Layer 0.16-0.2 mm; wall > 1.2 mm for sturdy decor.",
      "Design file not included; supply STL/STEP or use design service.",
    ],
    links: [
      { label: "Read full article", href: "/blog/3d-printen-herfst-halloween" },
      { label: "Seasonal segment", href: "/segments/3d-printing-seasonal" },
      { label: "Plan your Halloween print", href: "/contact" },
    ],
    intent: "informational",
    category: "segments-cases",
  },
  {
    id: "3d-printen-lente-pasen",
    title: "3D printing for spring and Easter",
    summary:
      "Pastel ornaments, eggs and floral decor in Silk/Matte/Translucent PLA. Checklist for material and hanging.",
    highlights: [
      "Pastel Silk/Matte PLA, Translucent for light objects.",
      "Integrate eyelets/pin holes, wall > 1.2 mm.",
      "Design not included; design service 45/hour.",
    ],
    links: [
      { label: "Read full article", href: "/blog/3d-printen-lente-pasen" },
      { label: "Seasonal segment", href: "/segments/3d-printing-seasonal" },
      { label: "Plan Easter prints", href: "/contact" },
    ],
    intent: "informational",
    category: "segments-cases",
  },
  {
    id: "3d-printen-zomer",
    title: "3D printing for summer",
    summary:
      "Outdoor decor, nautical props and patio accessories in PETG/TPU. Tips for heat resistance and anti-slip.",
    highlights: [
      "PETG for sun/moisture, TPU for anti-slip feet.",
      "Layer 0.2 mm for large pieces, 0.16 mm for detail.",
      "Design not included; design service 45/hour.",
    ],
    links: [
      { label: "Read full article", href: "/blog/3d-printen-zomer" },
      { label: "Seasonal segment", href: "/segments/3d-printing-seasonal" },
      { label: "Plan summer prints", href: "/contact" },
    ],
    intent: "informational",
    category: "segments-cases",
  },
  {
    id: "3d-printen-winter-kerst-nieuwjaar",
    title: "3D printing for winter, Christmas and New Year",
    summary:
      "Ornaments, snowflakes and party props in Silk/Marble/Translucent PLA. Delivery via EV zones or parcel service.",
    highlights: [
      "Silk/Marble for shine, Translucent for light objects.",
      "Integrate eyelets, wall 1.6-2 mm for diffuse glow.",
      "Design not included; design service 45/hour.",
    ],
    links: [
      { label: "Read full article", href: "/blog/3d-printen-winter-kerst-nieuwjaar" },
      { label: "Seasonal segment", href: "/segments/3d-printing-seasonal" },
      { label: "Plan Christmas prints", href: "/contact" },
    ],
    intent: "informational",
    category: "segments-cases",
  },
  {
    id: "3d-printen-back-to-school",
    title: "Back-to-school 3D printing",
    summary:
      "Pen holders, name plates, organizers and educational STEM models. Material advice for schools and students with delivery in Aug-Sep.",
    highlights: [
      "PLA Matte/PETG for classroom use, TPU for anti-slip.",
      "Batch names/classes for consistent color.",
      "Design not included; design service 45/hour.",
    ],
    links: [
      { label: "Read full article", href: "/blog/3d-printen-back-to-school" },
      { label: "Back-to-school segment", href: "/segments/3d-printing-back-to-school" },
      { label: "Plan school prints", href: "/contact?material=pla-matte" },
    ],
    intent: "informational",
    category: "segments-cases",
  },
  {
    id: "3d-printen-valentijn",
    title: "3D printing for Valentine gifts",
    summary:
      "Heart decor, nameplates and light objects in Silk, Matte and Translucent PLA. Includes checklist for LEDs, magnets and delivery options.",
    highlights: [
      "Silk/Marble for premium look, Matte for soft pastels, Translucent for LED glow.",
      "Cutouts for LEDs/magnets and anti-slip feet in TPU.",
      "Design not included; design service 45/hour, delivery via EV or parcel.",
    ],
    links: [
      { label: "Read full article", href: "/blog/3d-printen-valentijn" },
      { label: "Valentine segment", href: "/segments/3d-printing-valentijn" },
      { label: "Plan Valentine prints", href: "/contact?material=pla-silk" },
    ],
    intent: "informational",
    category: "segments-cases",
  },
  {
    id: "3d-printen-vaderdag-moederdag",
    title: "3D printing for Fathers Day and Mothers Day",
    summary:
      "Personalized keychains, desk items and name gifts in Silk/Matte/PETG. Tips for readability, rounded edges and delivery options.",
    highlights: [
      "Silk/Matte PLA for looks, PETG for stronger items.",
      "Text depth > 0.6 mm and rounded edges for daily use.",
      "Design service 45/hour, delivery via EV or parcel.",
    ],
    links: [
      { label: "Read full article", href: "/blog/3d-printen-vaderdag-moederdag" },
      { label: "Fathers Day/Mothers Day segment", href: "/segments/3d-printing-vaderdag-moederdag" },
      { label: "Plan your gifts", href: "/contact?material=pla-silk" },
    ],
    intent: "informational",
    category: "segments-cases",
  },
  {
    id: "relatiegeschenken-3d-printen",
    title: "3D printed corporate gifts (B2B gifts)",
    summary:
      "Corporate gifts and team thank-yous: keychains, desk organizers and awards in Silk/Matte/PETG. Batch names, anti-slip feet and realistic lead times.",
    highlights: [
      "Silk/Matte for looks, PETG for strength, TPU for grip.",
      "Text depth > 0.6 mm and rounded edges for daily use.",
      "Design service 45/hour; delivery via EV or parcel.",
    ],
    links: [
      { label: "Read full article", href: "/blog/relatiegeschenken-3d-printen" },
      { label: "Marketing and events segment", href: "/segments/3d-printing-marketing" },
      { label: "Plan corporate gifts", href: "/contact?material=pla-silk" },
    ],
    intent: "transactional",
    category: "segments-cases",
  },
  {
    id: "bambu-printer-instellingen",
    title: "Best settings for your Bambu printer",
    summary:
      "Bambu printers deliver fast, consistent results, but still need material-specific tuning. In the long article we share our studio presets for PLA, PETG and TPU plus tips for flow and calibration.",
    highlights: [
      "PLA presets: 215 C nozzle, 60 C bed, 0.16-0.24 mm layer height with fans at 70-100% for sharp edges and minimal stringing.",
      "PETG presets: 240 C nozzle, 80 C bed, fan up to 40% and slightly lower retract so layers bond without blobs.",
      "TPU presets: 235 C nozzle, 45 C bed, 30 mm/s max speed, limited retract and drier filament for reliable AMS runs.",
    ],
    links: [
      { label: "Read full article", href: "/blog/beste-instellingen-bambu-printer" },
      { label: "More about our production approach", href: "/services" },
      { label: "Request tips for your print", href: "/contact" },
    ],
    intent: "how-to",
    category: "how-to",
  },
  {
    id: "hoe-3d-print-je-onderdelen-voor-buitengebruik",
    title: "How to 3D print parts for outdoor use?",
    summary:
      "New how-to in the knowledge hub. Learn why PLA fails outdoors, when to use PETG or TPU, and how to handle mounting and drainage for sensors, bikes and facades.",
    highlights: [
      "PLA outdoors? Only as a decorative cover around a PETG core, otherwise it fades and deforms within months.",
      "PETG and TPU scenario overview: sensors, bikes, car interiors and vibrating parts with hybrid builds.",
      "Mounting checklist: inserts, bosses, drainage and redundant screw points so the print does not become a service call.",
    ],
    links: [
      { label: "Read the how-to", href: "/blog/hoe-3d-print-je-onderdelen-voor-buitengebruik" },
      { label: "PETG material overview", href: "/materials/petg" },
      { label: "Pricing and calculator", href: "/pricing" },
    ],
    intent: "how-to",
    category: "how-to",
  },
  {
    id: "3d-printing-marketing-events",
    title: "3D printing for marketing and events",
    summary:
      "Props, awards and merchandising aligned to your campaign calendar. Learn how to build a brief, choose materials and connect KPIs to tangible activations.",
    highlights: [
      "Silk, Marble and Translucent PLA deliver premium looks ready for photoshoots.",
      "Short feedback loops because you work directly with the printer in Herzele.",
      "Integrate QR/NFC in props to measure leads or engagement during events.",
    ],
    links: [
      { label: "Read full article", href: "/blog/3d-printing-marketing-events" },
      { label: "Marketing and events segment", href: "/segments/3d-printing-marketing" },
      { label: "Request props or giveaways", href: "/contact?material=PLA%20Silk%2B" },
    ],
    intent: "transactional",
    category: "segments-cases",
  },
  {
    id: "octopus-accountancy-3d-print-goodies",
    title: "Case: Octopus.be 3D printed goodies",
    summary:
      "Collab with Octopus.be: brand-matched octopus mascots, magnetic badges and giveaways with trackable QR/UTM links. Ideal for demos, partner days and onboarding.",
    highlights: [
      "PLA Matte/Silk mascots that look sharp on photos and demo setups.",
      "PETG Matte badges with recessed magnets so they survive daily use.",
      "Kits per event or partner, linked to Octopus landing pages for tracking.",
    ],
    links: [
      { label: "Read the Octopus case", href: "/blog/octopus-accountancy-3d-print-goodies" },
      { label: "Marketing and events segment", href: "/segments/3d-printing-marketing" },
      { label: "Plan a merch run", href: "/contact?topic=octopus-case" },
    ],
    intent: "transactional",
    category: "segments-cases",
  },
  {
    id: "3d-geprinte-platen-nasiam",
    title: "NaSiam: 3D printed plaques with QR",
    summary:
      "Case study: two reusable plaques with logo and QR code for NaSiam massage salon in Sint-Job. Includes material choices, mounting options and links to marketing articles.",
    highlights: [
      "Matte base with contrasting inlay for scannable QR codes.",
      "Reusable at events and in the salon, with flat zones for tape or Velcro.",
      "Internal links to the marketing and events segment plus Antwerp location page.",
    ],
    links: [
      { label: "Read full article", href: "/blog/3d-geprinte-platen-nasiam" },
      { label: "Marketing and events article", href: "/blog/3d-printing-marketing-events" },
      { label: "Marketing and events segment", href: "/segments/3d-printing-marketing" },
    ],
    intent: "transactional",
    category: "segments-cases",
  },
  {
    id: "ontwerp-3d-printbaar-model",
    title: "How to design a 3D printable model",
    summary:
      "A printable design combines consistent wall thickness, correct tolerances and smart orientation. In the long article we show exactly how we prep STL/STEP for production in PLA, PETG and TPU.",
    highlights: [
      "Minimum wall thickness: 1.2 mm for PLA/PETG, 2 mm for TPU. Add ribs or fillets to spread loads.",
      "Limit overhangs > 55 degrees or add support surfaces. Make cavities accessible so support comes off easily.",
      "Send STEP or native CAD if you expect changes; STL is fine for final production. Add dimensions or tolerance notes in your message.",
    ],
    links: [
      { label: "Read full article", href: "/blog/ontwerp-3d-printbaar-model" },
      { label: "Upload files via viewer", href: "/viewer" },
      { label: "Request design service", href: "/contact" },
    ],
    intent: "informational",
    category: "how-to",
  },
  {
    id: "hoe-lang-duurt-3d-printen",
    title: "How long does 3D printing take?",
    summary:
      "Lead time depends on complexity, material and finishing. The article explains how we schedule jobs and how you can move faster in the queue without hard promises.",
    highlights: [
      "Machine hours range from less than an hour to more than a day per part. We advise on geometry to optimize time.",
      "Grouping parts per material shortens the queue and reduces spool swaps.",
      "Pickup, Bpost or personal delivery: we align logistics to your deadline so the whole project stays on track.",
    ],
    links: [
      { label: "Read full article", href: "/blog/hoe-lang-duurt-3d-printen" },
      { label: "Plan delivery", href: "/contact" },
      { label: "View pricing and lead times", href: "/pricing" },
    ],
    intent: "informational",
    category: "materials-pricing",
  },
  {
    id: "bestanden-voor-3d-printen",
    title: "Which files do you need for 3D printing?",
    summary:
      "STL, STEP and native CAD each have a role. We explain which format to use when, what resolution you need and how to add metadata for fast quotes.",
    highlights: [
      "For production: STL with 0.01-0.05 mm resolution. For revisions: STEP or native CAD so we can adjust dimensions.",
      "Add measurement references, tolerance notes and photos in the same folder or viewer upload.",
      "Check meshes for non-manifold edges and duplicate faces before uploading.",
    ],
    links: [
      { label: "Read full article", href: "/blog/bestanden-voor-3d-printen" },
      { label: "Upload via viewer", href: "/viewer" },
      { label: "Request design review", href: "/contact" },
    ],
    intent: "how-to",
    category: "how-to",
  },
  {
    id: "tool-organizers-3d-printen",
    title: "Tool organizers 3D printen: van Gridfinity tot Packout",
    date: "2026-12-31",
    summary:
      "Alles wat je moet weten om organizers te laten printen: intake, materiaalkeuze, labelzones, anti-slip en wanneer je kiest voor Gridfinity, Packout, TSTAK of een custom insert.",
    highlights: [
      "Bevat interne links naar de organizers hub, materialen en pricing zodat je meteen kunt plannen.",
      "Uitleg per systeem (Gridfinity/gridfinity-stijl, Packout, TSTAK, custom/Skådis) met intakechecklist.",
      "Externe context over pegboards en Packout ecosystemen om EEAT te versterken.",
    ],
    links: [
      { label: "Lees de organizers gids", href: "/blog/tool-organizers-3d-printen" },
      { label: "Organizers hub", href: "/organizers" },
      { label: "Plan een indeling", href: "/contact?material=organizers" },
    ],
    intent: "informational",
    category: "how-to",
  },
  {
    id: "gridfinity-modular-storage-system",
    title: "Gridfinity: modular storage system, custom-fit by X3DPrints",
    date: "2026-01-30",
    summary:
      "Explains the 42×42×7 mm grid, magnets, labels, Packout integrations and why X3DPrints is the partner for custom bins and starter kits.",
    highlights: [
      "Technical core: grid, magnets, labels, materials and generators.",
      "Use cases from workshops to kitchens and Packout cases.",
      "Calls-to-action to the Gridfinity page and contact prefill.",
    ],
    links: [
      { label: "Read the Gridfinity guide", href: "/en/blog/gridfinity-modular-storage-system" },
      { label: "Gridfinity organizers", href: "/en/organizers/modugrid" },
      { label: "Request a custom bin", href: "/en/contact?material=modugrid" },
    ],
    intent: "informational",
    category: "segments-cases",
  },
  {
    id: "gridfinity-modulair-opslagsysteem",
    title: "Gridfinity: modulair opslagsysteem met maatwerk door X3DPrints",
    date: "2026-12-30",
    summary:
      "Uitleg van het 42×42×7 mm raster, magneten, labels, Packout-integraties en waarom X3DPrints de partner is voor custom bins en starterkits.",
    highlights: [
      "Technische kern: raster, magneten, labels, materialen en generators.",
      "Toepassingen van werkplaats tot keuken en Packout-koffers.",
      "Call-to-actions naar Gridfinity pagina en contact met prefill.",
    ],
    links: [
      { label: "Lees Gridfinity gids", href: "/blog/gridfinity-modulair-opslagsysteem" },
      { label: "Gridfinity organizers", href: "/organizers/modugrid" },
      { label: "Vraag een custom bin", href: "/contact?material=modugrid" },
    ],
    intent: "informational",
    category: "segments-cases",
  },
  {
    id: "3d-printen-in-de-buurt",
    title: "3D printing near you (Ghent, Aalst, Dendermonde)",
    summary:
      "X3DPrints delivers from Herzele for Ghent, Aalst and Dendermonde. Learn how we handle local projects, what logistics options exist and examples we have delivered.",
    highlights: [
      "Short lines: direct contact with the maker and pickup by appointment in Herzele (between Ghent and Aalst).",
      "Personal delivery in Dendermonde, Aalst or Ghent possible; otherwise ship via Bpost with track and trace.",
      "Examples: retail materials, prototypes and event personalization; see the portfolio for inspiration.",
    ],
    links: [
      { label: "Read full article", href: "/blog/3d-printen-in-de-buurt" },
      { label: "View portfolio", href: "/portfolio" },
      { label: "Plan pickup or delivery", href: "/contact" },
    ],
    intent: "informational",
    category: "segments-cases",
  },
  {
    id: "3d-printen-voor-beginners",
    title: "3D printing for beginners",
    summary:
      "New user? This guide explains which materials to choose, how to prepare files and what a training or workshop can include.",
    highlights: [
      "PLA Matte is the starting point: easy to print, available in many colors and ideal for proof of concepts.",
      "Use the viewer to upload STL/STEP and let us review wall thickness and orientation.",
      "Looking for training? We share quick knowledge transfer during your project: settings, tips and pitfalls.",
    ],
    links: [
      { label: "Read full article", href: "/blog/3d-printen-voor-beginners" },
      { label: "Upload your first model", href: "/viewer" },
      { label: "Request guidance", href: "/contact" },
    ],
    intent: "how-to",
    category: "how-to",
  },
  {
    id: "3d-printen-op-bestelling",
    title: "3D printing to order: how it works",
    summary:
      "From request to delivery: this article describes the order process at X3DPrints, including price estimate, examples and follow-up.",
    highlights: [
      "Step 1: send STL/STEP and context, receive feedback and a price estimate within 1 business day.",
      "Step 2: production and quality check; we share photos or short videos if you want updates.",
      "Step 3: shipping or pickup with invoice and repeat options for future orders.",
    ],
    links: [
      { label: "Read full article", href: "/blog/3d-printen-op-bestelling" },
      { label: "Check pricing and calculator", href: "/pricing" },
      { label: "Start an order", href: "/contact" },
    ],
    intent: "transactional",
    category: "materials-pricing",
  },
]

const EXTRA_RESOURCES_NL = [
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

const EXTRA_RESOURCES_EN = [
  {
    title: "Materials library",
    description: "Deep dives per filament including stock status, FAQ and JSON-LD schema.",
    href: "/materials",
  },
  {
    title: "Pricing and calculator",
    description: "Indicative rates with price estimates and notes on layer heights, infill and logistics.",
    href: "/pricing",
  },
  {
    title: "FAQ and support",
    description: "Answers about lead time, file formats, post-processing and shipping.",
    href: "/faq",
  },
  {
    title: "3D printing",
    description: "Pillar on 3D printing: materials, pricing, workflow and FAQ in one place.",
    href: "/3d-printen",
  },
]

const QUICK_LINKS_NL = [
  { label: "Filament Vrijdag", href: "#filament-vrijdag" },
  { label: "Maker Monday", href: "#maker-monday" },
  { label: "Use Case Dinsdag", href: "#use-case-dinsdag" },
  { label: "Materialen & pricing", href: "#materials-pricing" },
  { label: "Segmenten & cases", href: "#segments-cases" },
  { label: "How-to & workflows", href: "#how-to" },
  { label: "Organizers gids", href: "/blog/tool-organizers-3d-printen" },
]

const QUICK_LINKS_EN = [
  { label: "Filament Friday", href: "#filament-vrijdag" },
  { label: "Maker Monday", href: "#maker-monday" },
  { label: "Use Case Tuesday", href: "#use-case-dinsdag" },
  { label: "Materials & pricing", href: "#materials-pricing" },
  { label: "Segments & cases", href: "#segments-cases" },
  { label: "How-to & workflows", href: "#how-to" },
  { label: "Organizers guide", href: "/en/blog/tool-organizers-3d-printing" },
]

const BLOG_COPY_NL = {
  hero: {
    eyebrow: "Blog & kennisbank",
    title: "Snelle antwoorden op materiaal-, prijs- en workflowvragen.",
    body: "We bundelen alles wat klanten dagelijks vragen: van Filament Vrijdag tot concrete cases en how-tos. Start met de zoekfunctie of spring meteen naar een categorie.",
    ctas: {
      pricing: "Naar pricing & calculator",
      materials: "Materialenbibliotheek",
      finishing: "Finishing Friday",
    },
  },
  quickLinks: {
    label: "Snel naar",
    hint: (count: number) => `Gebruik de zoekfunctie om alle ${count}+ artikels te doorzoeken.`,
  },
  sections: {
    filamentFriday: {
      eyebrow: "Filament Vrijdag",
      title: "Materiaalreeks voor PLA, PETG, TPU en specials",
      body: "Elke vrijdag een nieuw filament, telkens met settings, use cases en interne links naar pricing en contact.",
      cta: "Start bij aflevering #1",
    },
    makerMonday: {
      eyebrow: "Maker Monday",
      title: "Engineering guides voor ontwerp en tolerantie",
      body: "Elke Maker Monday duikt in een ontwerpvraag: scharnieren, toleranties, warping en meer. Praktische tips rechtstreeks uit de studio.",
      cta: "Lees Maker Monday",
    },
    useCase: {
      eyebrow: "Use Case Dinsdag",
      title: "Toepassing-gebaseerde gidsen",
      body: "Realistische scenarios rond voertuigen, retail, scholen en tabletop. Zo bouw je je eigen roadmap op basis van echte problemen.",
      cta: "Lees Use Case Dinsdag",
    },
  },
  groupedSection: {
    cta: "Zoek binnen deze categorie",
  },
  extraResources: {
    ctaPrefix: "Naar",
  },
  finalCta: {
    eyebrow: "Volgende stap",
    title: "Klaar voor een intake?",
    body: "Upload je modellen, vermeld materiaalvoorkeur en laat de calculator een eerste indicatie geven. We sturen binnen 1 werkdag feedback - inclusief suggesties als een ander filament logischer is.",
    primary: "Plan een gesprek",
    secondary: "STL/STEP uploaden",
  },
  showMore: (count: number) => `Toon ${count} extra artikels`,
  intentLabels: {
    informational: "Gids",
    transactional: "Pricing",
    "how-to": "How-to",
  },
  seoIntentLabel: "SEO intent",
  schema: {
    articleListName: "X3DPrints blog onderwerpen",
    blogName: "X3DPrints blog en kennisbank",
    language: "nl-BE",
  },
}

const BLOG_COPY_EN = {
  hero: {
    eyebrow: "Blog & knowledge base",
    title: "Fast answers to material, pricing and workflow questions.",
    body: "We collect what customers ask every day: from Filament Friday to real cases and how-tos. Start with search or jump to a category.",
    ctas: {
      pricing: "Go to pricing and calculator",
      materials: "Materials library",
      finishing: "Finishing Friday",
    },
  },
  quickLinks: {
    label: "Jump to",
    hint: (count: number) => `Use the search to explore ${count}+ articles.`,
  },
  sections: {
    filamentFriday: {
      eyebrow: "Filament Friday",
      title: "Material series for PLA, PETG, TPU and specials",
      body: "Every Friday a new filament, with settings, use cases and internal links to pricing and contact.",
      cta: "Start with episode #1",
    },
    makerMonday: {
      eyebrow: "Maker Monday",
      title: "Engineering guides for design and tolerances",
      body: "Every Maker Monday dives into a design question: hinges, tolerances, warping and more. Practical tips straight from the studio.",
      cta: "Read Maker Monday",
    },
    useCase: {
      eyebrow: "Use Case Tuesday",
      title: "Application-based guides",
      body: "Realistic scenarios around vehicles, retail, schools and tabletop. Build your own roadmap based on real problems.",
      cta: "Read Use Case Tuesday",
    },
  },
  groupedSection: {
    cta: "Search within this category",
  },
  extraResources: {
    ctaPrefix: "Go to",
  },
  finalCta: {
    eyebrow: "Next step",
    title: "Ready for an intake?",
    body: "Upload your models, note your material preference and let the calculator give a first estimate. We send feedback within 1 business day, including suggestions if another filament makes more sense.",
    primary: "Plan a call",
    secondary: "Upload STL/STEP",
  },
  showMore: (count: number) => `Show ${count} more articles`,
  intentLabels: {
    informational: "Guide",
    transactional: "Pricing",
    "how-to": "How-to",
  },
  seoIntentLabel: "SEO intent",
  schema: {
    articleListName: "X3DPrints blog topics",
    blogName: "X3DPrints blog and knowledge base",
    language: "en-BE",
  },
}

type TopicCardProps = {
  topic: Topic
  intentLabels: Record<Topic["intent"], string>
  seoIntentLabel: string
  localize: (href: string) => string
}

function TopicCard({ topic, intentLabels, seoIntentLabel, localize }: TopicCardProps) {
  return (
    <GlassCard className="h-full border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur">
      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
        <span>{intentLabels[topic.intent]}</span>
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
        <span>
          {seoIntentLabel}: {topic.intent}
        </span>
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
            href={localize(link.href)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </GlassCard>
  )
}

type BlogPageProps = { locale: string }

export default function BlogPage({ locale }: BlogPageProps) {
  const normalizedLocale = normalizeLocale(locale)
  const isEn = normalizedLocale === "en"
  const copy = isEn ? BLOG_COPY_EN : BLOG_COPY_NL
  const topics = isEn ? TOPICS_EN : TOPICS_NL
  const categorySections = isEn ? CATEGORY_SECTIONS_EN : CATEGORY_SECTIONS_NL
  const extraResources = isEn ? EXTRA_RESOURCES_EN : EXTRA_RESOURCES_NL
  const quickLinks = isEn ? QUICK_LINKS_EN : QUICK_LINKS_NL
  const localize = (href: string) => localizeHref(href, normalizedLocale)
  const toAbsolute = (href: string) => `https://www.x3dprints.be${localize(href)}`
  const tocItems = isEn
    ? [
        { id: "blog-search", label: "Find the right article quickly" },
        { id: "filament-vrijdag", label: "Filament Friday series" },
        { id: "maker-monday", label: "Maker Monday series" },
        { id: "use-case-dinsdag", label: "Use Case Tuesday series" },
        { id: "materials-pricing", label: "Materials and pricing topics" },
        { id: "segments-cases", label: "Segments and case studies" },
        { id: "how-to", label: "How-to workflows" },
        { id: "blog-extra-resources", label: "Extra resources" },
        { id: "blog-sources", label: "Sources and references" },
      ]
    : [
        { id: "blog-search", label: "Vind snel het juiste artikel" },
        { id: "filament-vrijdag", label: "Filament Vrijdag reeks" },
        { id: "maker-monday", label: "Maker Monday reeks" },
        { id: "use-case-dinsdag", label: "Use Case Dinsdag reeks" },
        { id: "materials-pricing", label: "Materialen en pricing topics" },
        { id: "segments-cases", label: "Segmenten en case studies" },
        { id: "how-to", label: "How-to workflows" },
        { id: "blog-extra-resources", label: "Extra resources" },
        { id: "blog-sources", label: "Bronnen en referenties" },
      ]
  const references = isEn
    ? [
        { label: "Google Search Central blog guidance", url: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content" },
        { label: "Schema.org BlogPosting", url: "https://schema.org/BlogPosting" },
        { label: "Google structured data docs", url: "https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data" },
      ]
    : [
        { label: "Google Search Central richtlijnen voor content", url: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content" },
        { label: "Schema.org BlogPosting", url: "https://schema.org/BlogPosting" },
        { label: "Google docs over structured data", url: "https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data" },
      ]
  const lastUpdatedLabel = isEn ? "Last updated: February 6, 2026" : "Laatst bijgewerkt: 6 februari 2026"
  const topicsWithDate = topics.filter((topic): topic is Topic & { date: string } => Boolean(topic.date))

  const SORT_PREFERENCE: Record<TopicCategory, "featured" | "az"> = {
    "filament-friday": "featured",
    "maker-monday": "featured",
    "use-case-dinsdag": "featured",
    "materials-pricing": "az",
    "segments-cases": "az",
    "how-to": "az",
  }

  const sortTopics = (list: Topic[], category: TopicCategory) => {
    const hasDates = list.some((t) => t.date)
    const mode = SORT_PREFERENCE[category] ?? "featured"
    if (hasDates) {
      return [...list].sort((a, b) => {
        if (a.date && b.date) return b.date.localeCompare(a.date)
        if (a.date && !b.date) return -1
        if (!a.date && b.date) return 1
        return 0
      })
    }
    if (mode === "az") {
      return [...list].sort((a, b) => a.title.localeCompare(b.title))
    }
    return list
  }

  const filamentTopics = sortTopics(topics.filter((topic) => topic.category === "filament-friday"), "filament-friday")
  const makerMondayTopics = sortTopics(topics.filter((topic) => topic.category === "maker-monday"), "maker-monday")
  const useCaseTopics = sortTopics(topics.filter((topic) => topic.category === "use-case-dinsdag"), "use-case-dinsdag")
  const groupedSections = categorySections.map((section) => ({
    ...section,
    topics: sortTopics(
      topics.filter((topic) => topic.category === section.id),
      section.id,
    ),
  }))

  const articleListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: copy.schema.articleListName,
    itemListElement: topicsWithDate.map((topic, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Article",

        inLanguage: copy.schema.language,
        headline: topic.title,
        description: topic.summary,
        url: toAbsolute(`/blog/${topic.id}`),
        datePublished: topic.date,
        dateModified: topic.date,
      },
    })),
  }

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: copy.schema.blogName,
    url: toAbsolute("/blog"),
    inLanguage: copy.schema.language,
    blogPost: topicsWithDate.map((topic) => ({
      "@type": "BlogPosting",
      headline: topic.title,
      description: topic.summary,
      url: toAbsolute(`/blog/${topic.id}`),
      datePublished: topic.date,
      dateModified: topic.date,
    })),
  }

  const topicCardProps = {
    intentLabels: copy.intentLabels,
    seoIntentLabel: copy.seoIntentLabel,
    localize,
  }

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
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{copy.hero.eyebrow}</p>
            <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              {copy.hero.title}
            </h1>
            <p className="text-lg text-slate-700">{copy.hero.body}</p>
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="flex flex-wrap gap-3">
              <ShimmerButton href={localize("/pricing")}>{copy.hero.ctas.pricing}</ShimmerButton>
              <Link
                href={localize("/materials")}
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                {copy.hero.ctas.materials}
              </Link>
              <Link
                href={localize("/blog/finishing-friday-schuren-primen-lakken")}
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                {copy.hero.ctas.finishing}
              </Link>
            </div>
            <ContentTableOfContents
              title={isEn ? "Contents" : "Inhoud"}
              items={tocItems}
              className="max-w-2xl"
            />
          </Reveal>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(240px,1fr)]">
            <div id="blog-search">
              <BlogSearch topics={topics} />
            </div>
            <GlassCard className="h-full border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{copy.quickLinks.label}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={localize(link.href)}
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-100 bg-white/80 px-3 py-2 font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-white"
                    >
                      {link.label}
                      <span aria-hidden>-&gt;</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-slate-500">{copy.quickLinks.hint(topics.length)}</p>
            </GlassCard>
          </div>
        </div>
      </section>

      <section id="filament-vrijdag" className="px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                  {copy.sections.filamentFriday.eyebrow}
                </p>
                <h2 className="mt-2 text-3xl font-semibold text-slate-900">{copy.sections.filamentFriday.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{copy.sections.filamentFriday.body}</p>
              </div>
              <Link
                href={localize(filamentTopics[0]?.links[0]?.href ?? "/blog")}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
              >
                {copy.sections.filamentFriday.cta}
                <span aria-hidden>-&gt;</span>
              </Link>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {filamentTopics.slice(0, 4).map((topic) => (
                <TopicCard key={topic.id} topic={topic} {...topicCardProps} />
              ))}
            </div>
            {filamentTopics.length > 4 ? (
              <details className="mt-6 rounded-3xl border border-white/50 bg-white/80 p-4 shadow-inner backdrop-blur">
                <summary className="cursor-pointer text-sm font-semibold text-indigo-600">
                  {copy.showMore(filamentTopics.length - 4)}
                </summary>
                <div className="mt-4 grid gap-6 md:grid-cols-2">
                  {filamentTopics.slice(4).map((topic) => (
                    <TopicCard key={topic.id} topic={topic} {...topicCardProps} />
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
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                    {copy.sections.makerMonday.eyebrow}
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold text-slate-900">{copy.sections.makerMonday.title}</h2>
                  <p className="mt-2 text-sm text-slate-600">{copy.sections.makerMonday.body}</p>
                </div>
                <Link
                  href={localize(makerMondayTopics[0]?.links[0]?.href ?? "/blog")}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                >
                  {copy.sections.makerMonday.cta}
                  <span aria-hidden>-&gt;</span>
                </Link>
              </div>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {makerMondayTopics.slice(0, 4).map((topic) => (
                  <TopicCard key={topic.id} topic={topic} {...topicCardProps} />
                ))}
              </div>
              {makerMondayTopics.length > 4 ? (
                <details className="mt-6 rounded-3xl border border-white/50 bg-white/80 p-4 shadow-inner backdrop-blur">
                  <summary className="cursor-pointer text-sm font-semibold text-indigo-600">
                    {copy.showMore(makerMondayTopics.length - 4)}
                  </summary>
                  <div className="mt-4 grid gap-6 md:grid-cols-2">
                    {makerMondayTopics.slice(4).map((topic) => (
                      <TopicCard key={topic.id} topic={topic} {...topicCardProps} />
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
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                    {copy.sections.useCase.eyebrow}
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold text-slate-900">{copy.sections.useCase.title}</h2>
                  <p className="mt-2 text-sm text-slate-600">{copy.sections.useCase.body}</p>
                </div>
                <Link
                  href={localize(useCaseTopics[0]?.links[0]?.href ?? "/blog")}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                >
                  {copy.sections.useCase.cta}
                  <span aria-hidden>-&gt;</span>
                </Link>
              </div>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {useCaseTopics.slice(0, 4).map((topic) => (
                  <TopicCard key={topic.id} topic={topic} {...topicCardProps} />
                ))}
              </div>
              {useCaseTopics.length > 4 ? (
                <details className="mt-6 rounded-3xl border border-white/50 bg-white/80 p-4 shadow-inner backdrop-blur">
                  <summary className="cursor-pointer text-sm font-semibold text-indigo-600">
                    {copy.showMore(useCaseTopics.length - 4)}
                  </summary>
                  <div className="mt-4 grid gap-6 md:grid-cols-2">
                    {useCaseTopics.slice(4).map((topic) => (
                      <TopicCard key={topic.id} topic={topic} {...topicCardProps} />
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
                    {copy.groupedSection.cta}
                    <span aria-hidden>-&gt;</span>
                  </Link>
                </div>
                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  {visibleTopics.map((topic) => (
                    <TopicCard key={topic.id} topic={topic} {...topicCardProps} />
                  ))}
                </div>
                {extraTopics.length > 0 && (
                  <details className="mt-6 rounded-3xl border border-white/50 bg-white/80 p-4 shadow-inner backdrop-blur">
                    <summary className="cursor-pointer text-sm font-semibold text-indigo-600">
                      {copy.showMore(extraTopics.length)}
                    </summary>
                    <div className="mt-4 grid gap-6 md:grid-cols-2">
                      {extraTopics.map((topic) => (
                        <TopicCard key={topic.id} topic={topic} {...topicCardProps} />
                      ))}
                    </div>
                  </details>
                )}
              </Reveal>
            </div>
          </section>
        )
      })}

      <section id="blog-extra-resources" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="grid gap-6 md:grid-cols-3">
              {extraResources.map((resource) => (
                <GlassCard key={resource.href} className="h-full border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur">
                  <h3 className="text-lg font-semibold text-slate-900">{resource.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{resource.description}</p>
                  <Link
                    href={localize(resource.href)}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
                  >
                    {copy.extraResources.ctaPrefix} {resource.title}
                    <span aria-hidden>-&gt;</span>
                  </Link>
                </GlassCard>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <OrganizerCta locale={normalizedLocale === "en" ? "en" : "nl"} />
        </div>
      </section>

      <section id="blog-final-cta" className="scroll-mt-28 px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="flex flex-col gap-6 border border-white/40 bg-white/80 p-8 text-center shadow-xl backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:text-left">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">{copy.finalCta.eyebrow}</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900 sm:text-3xl">{copy.finalCta.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{copy.finalCta.body}</p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href={localize("/contact")}>{copy.finalCta.primary}</ShimmerButton>
                <Link href={localize("/viewer")} className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                  {copy.finalCta.secondary}
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section id="blog-sources" className="scroll-mt-28 px-6 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/80 p-8 shadow-xl backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">{isEn ? "Sources and references" : "Bronnen en referenties"}</h2>
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

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleListJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }} />
    </main>
  )
}


