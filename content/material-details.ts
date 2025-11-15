// content/material-details.ts
import { MATERIAL_SLUGS, type MaterialKey } from "@/lib/materials"

type Highlight = {
  title: string
  description: string
}

type Spec = {
  label: string
  value: string
}

type FaqItem = {
  question: string
  answer: string
}

export type MaterialDetailContent = {
  key: MaterialKey
  slug: string
  heroTagline: string
  heroDescription: string
  summary: string
  highlights: Highlight[]
  idealFor: string[]
  specs: Spec[]
  printTips: string[]
  seo: {
    title: string
    description: string
  }
  faq?: FaqItem[]
  leadTime?: string
  priceIndicator?: string
}

const details: MaterialDetailContent[] = [
  {
    key: "PLA_TOUGH_PLUS",
    slug: MATERIAL_SLUGS["PLA_TOUGH_PLUS"],
    heroTagline: "Sterk PLA zonder gedoe",
    heroDescription:
      "PLA Tough+ combineert het gebruiksgemak van PLA met extra taaiheid. Perfect voor onderdelen die klappen moeten opvangen, maar die je toch strak wil afwerken.",
    summary:
      "Dit materiaal is ontwikkeld voor prototypes, klemmen en covers die tegen een stootje kunnen. Het print even vlot als standaard PLA maar vervormt minder snel bij impact.",
    highlights: [
      {
        title: "Impactbestendig",
        description:
          "De PLA+ blend geeft extra elasticiteit waardoor onderdelen niet onmiddellijk afbreken wanneer ze belast worden.",
      },
      {
        title: "Nauwkeurige details",
        description:
          "Door de lage krimp blijven maten betrouwbaar en passen onderdelen perfect in elkaar of op bestaande onderdelen.",
      },
      {
        title: "Geen geurtjes",
        description:
          "Zoals klassieke PLA verspreidt Tough+ geen uitgesproken geur, ideaal voor gebruik in kantoor- of thuissituaties.",
      },
    ],
    idealFor: [
      "Functionele prototypes die getest moeten worden",
      "Montagehulpstukken en lichte klemmen",
      "Beschermkappen en covers voor elektronica",
      "Cosplay onderdelen met een langere levensduur",
    ],
    specs: [
      { label: "Glasovergang", value: "± 60 °C" },
      { label: "Treksterkte", value: "65 MPa" },
      { label: "Aanbevolen laaghoogte", value: "0,16 – 0,28 mm" },
    ],
    printTips: [
      "Print rond 215–225 °C voor de beste balans tussen hechting en detail.",
      "Gebruik een gesloten behuizing niet noodzakelijk, maar vermijd tocht voor een egale afwerking.",
      "Laat onderdelen na het printen afkoelen op het bed om kromtrekken te vermijden.",
    ],
    seo: {
      title: "PLA Tough+ filament voor duurzame 3D prints",
      description:
        "Ontdek PLA Tough+ bij X3DPrints: extra slagvast PLA voor functionele 3D prints, montagehulpstukken en stevige prototypes.",
    },
    leadTime: "Standaard levertijd 2-3 werkdagen",
    priceIndicator: "Prijsindicatie: €€",
    faq: [
      {
        question: "Hoe verschilt PLA Tough+ van gewoon PLA?",
        answer:
          "Tough+ heeft een aangepaste polymerenmix waardoor het minder bros is. Het behoudt de printgemak van PLA, maar vangt klappen beter op en breekt minder snel.",
      },
      {
        question: "Is nabewerking mogelijk?",
        answer:
          "Ja. Schuren en verven kan zoals bij standaard PLA. Dankzij de taaiheid kun je schroefdraad tappen of inserts plaatsen zonder dat de wand scheurt.",
      },
    ],
  },
  {
    key: "PLA_MATTE",
    slug: MATERIAL_SLUGS["PLA_MATTE"],
    heroTagline: "Matte prints met designlook",
    heroDescription:
      "PLA Matte levert een egale, zachte finish waardoor je 3D prints er uitzien alsof ze gegoten of geïnjecteerd zijn.",
    summary:
      "Het materiaal maskeert laaglijnen, ideaal voor designmaquettes, interieurstukken en marketingmock-ups.",
    highlights: [
      {
        title: "Premium uitstraling",
        description:
          "De diffuse afwerking vangt licht mooi op en voorkomt glans. Perfect voor productfotografie en presentatie.",
      },
      {
        title: "Kleurvaste spoelen",
        description:
          "De pigmenten in PLA Matte blijven stabiel, zelfs bij langere prints of hogere temperaturen.",
      },
      {
        title: "Strakke randen",
        description:
          "Door de beperkte krimp blijven scherpe lijnen en logo’s mooi leesbaar.",
      },
    ],
    idealFor: [
      "Architecturale maquettes",
      "Productmock-ups en brandingmateriaal",
      "Interieurdecoraties",
      "Behuizingen voor elektronica die zichtbaar blijven",
    ],
    specs: [
      { label: "Glans", value: "< 10 GU" },
      { label: "Aanbevolen temperatuur", value: "205–215 °C" },
      { label: "Bedtemperatuur", value: "50–60 °C" },
    ],
    printTips: [
      "Gebruik een lagere printsnelheid (max. 80 mm/s) voor een egale matte huid.",
      "Koel stevig (70–100%) om detail in scherpe hoeken te behouden.",
      "Voor een ultra-matte finish kun je licht schuren met korrel 400 en hoger.",
    ],
    seo: {
      title: "Mat PLA filament voor designwaardige prints",
      description:
        "PLA Matte bij X3DPrints: haal een premium, reflectievrije afwerking voor maquettes, prototypes en interieuraccessoires.",
    },
    leadTime: "Levertijd 2 werkdagen",
    priceIndicator: "Prijsindicatie: €",
    faq: [
      {
        question: "Laat PLA Matte laaglijnen zien?",
        answer:
          "Veel minder dan glanzende PLA. De matte pigmenten vullen micro-poriën waardoor licht diffuus weerkaatst en lijntjes optisch verdwijnen.",
      },
      {
        question: "Kan ik matte prints verven?",
        answer:
          "Zeker. Reinig het oppervlak, schuur licht op en gebruik een primer. De matte structuur zorgt dat verf goed hecht.",
      },
    ],
  },
  {
    key: "PLA_GLOW",
    slug: MATERIAL_SLUGS["PLA_GLOW"],
    heroTagline: "Glow-in-the-dark statement",
    heroDescription:
      "PLA Glow geeft je ontwerpen een opvallende gloed zodra het licht uitgaat. Ideaal voor speelse accessoires of veiligheidsmarkeringen.",
    summary:
      "Met fosforescerende pigmenten die snel opladen, creëer je prints die minutenlang helder blijven oplichten.",
    highlights: [
      {
        title: "Heldere naschijn",
        description:
          "De hoogwaardige pigmenten slaan licht efficiënt op, zodat de gloed ook na jaren intens blijft.",
      },
      {
        title: "Veiligheidsmarkeringen",
        description:
          "Perfect voor noodpictogrammen of traptredes waar extra zichtbaarheid gewenst is.",
      },
      {
        title: "Veel kleuren",
        description:
          "Beschikbaar in verschillende glow-tinten: van klassiek groen tot aqua en oranje.",
      },
    ],
    idealFor: [
      "Decoratieve woonaccessoires",
      "Educatieve modellen en STEM-projecten",
      "Veiligheidslabels of aanduidingen",
      "Kids gadgets en cosplay props",
    ],
    specs: [
      { label: "Laadtijd", value: "± 10 min fel licht" },
      { label: "Nagloeiduur", value: "tot 6 uur" },
      { label: "Aanbevolen nozzle", value: "0,4–0,6 mm" },
    ],
    printTips: [
      "Print iets trager (max. 60 mm/s) zodat pigmenten egaal verdeeld blijven.",
      "Gebruik een nozzle van gehard staal indien je veel glow-spoelen verwerkt.",
      "Laad afgewerkte prints op met direct licht voor het beste effect tijdens oplevering.",
    ],
    seo: {
      title: "Glow-in-the-dark PLA filament laten printen",
      description:
        "Laat je glow-in-the-dark idee tot leven komen met PLA Glow van X3DPrints. Ideaal voor veiligheidsmarkering en opvallende gadgets.",
    },
    leadTime: "Levertijd 3 werkdagen",
    priceIndicator: "Prijsindicatie: €€",
    faq: [
      {
        question: "Moet ik speciale instellingen gebruiken?",
        answer:
          "Gebruik een iets hogere temperatuur (220 °C) en trager tempo zodat het pigment homogeen smelt. Zo voorkom je spikkels.",
      },
      {
        question: "Is PLA Glow voedselveilig?",
        answer:
          "Nee. De fosforescerende additieven zijn niet gecertificeerd voor voedingstoepassingen. Gebruik het vooral decoratief of functioneel.",
      },
    ],
  },
  {
    key: "PLA_MARBLE",
    slug: MATERIAL_SLUGS["PLA_MARBLE"],
    heroTagline: "Marmerlook zonder gewicht",
    heroDescription:
      "PLA Marble bevat fijne spikkels die een natuurlijke steenstructuur nabootsen. Elke print krijgt een luxueuze uitstraling.",
    summary:
      "Gebruik het voor awards, interieuraccenten of kunstobjecten waar echte steen te zwaar of duur zou zijn.",
    highlights: [
      {
        title: "Realistische textuur",
        description:
          "De mix van lichte en donkere pigmenten bootst aderpatronen na, zelfs bij kleine modellen.",
      },
      {
        title: "Lichtgewicht",
        description:
          "Je behoudt het lage gewicht van PLA, ideaal voor hangende decoratie of grote volumes.",
      },
      {
        title: "Nabewerking",
        description:
          "Schuren en polijsten kan om de marmerlook te versterken of te verzachten.",
      },
    ],
    idealFor: [
      "Interieurdecoratie",
      "Awards en trofeeën",
      "Lifestyle productfotografie",
      "Educatieve modellen van sculpturen",
    ],
    specs: [
      { label: "Afwerking", value: "Satijn-mat met spikkel" },
      { label: "Aanbevolen temperatuur", value: "205–215 °C" },
      { label: "Bedtemperatuur", value: "50–60 °C" },
    ],
    printTips: [
      "Kies een iets hogere laaghoogte (0,2–0,24 mm) om de marmertextuur zichtbaar te maken.",
      "Vermijd extreem hoge snelheden zodat de spikkels niet uitrekken.",
      "Gebruik een lichte dry-brush techniek voor extra contrast in de aders.",
    ],
    seo: {
      title: "PLA Marble: marmerlook 3D prints",
      description:
        "PLA Marble van X3DPrints geeft elke 3D print een luxueus steen-effect. Ideaal voor awards, decoratie en kunstobjecten.",
    },
    leadTime: "Levertijd 3 werkdagen",
    priceIndicator: "Prijsindicatie: €€",
    faq: [
      {
        question: "Lijken laaglijnen niet raar met spikkels?",
        answer:
          "De spikkels verdoezelen laaglijnen. Met een lichte nabehandeling oogt het als echt marmer, zelfs bij 0,2 mm lagen.",
      },
      {
        question: "Kan PLA Marble buiten staan?",
        answer:
          "PLA blijft gevoelig voor langdurige UV en hitte. Gebruik het buiten enkel op beschutte plekken of kies PETG voor permanente outdoor toepassingen.",
      },
    ],
  },
  {
    key: "PLA_SPARKLE",
    slug: MATERIAL_SLUGS["PLA_SPARKLE"],
    heroTagline: "Glitters met diepte",
    heroDescription:
      "PLA Sparkle mengt microscopische glitters in een donkere basis. Onder licht ontstaat een subtiele fonkeling.",
    summary:
      "Ideaal voor eye-catching gadgets, cosplay props en luxe displays die licht vangen zonder kitscherig te worden.",
    highlights: [
      {
        title: "Diepe kleuren",
        description:
          "De donkere basiskleuren zorgen dat het glittereffect alleen zichtbaar is wanneer het licht erop valt.",
      },
      {
        title: "Egaal oppervlak",
        description:
          "De deeltjes zijn fijn waardoor de nozzle niet verstopt en het oppervlak glad blijft.",
      },
      {
        title: "Luxe uitstraling",
        description:
          "Perfect voor premium merchandising of limited edition collectors-items.",
      },
    ],
    idealFor: [
      "Cosplay accessoires",
      "Retail displays",
      "Interieuraccenten",
      "Gepersonaliseerde geschenken",
    ],
    specs: [
      { label: "Aanbevolen nozzle", value: "≥ 0,4 mm (gehard staal aanbevolen)" },
      { label: "Printtemperatuur", value: "210–220 °C" },
      { label: "Glittergrootte", value: "< 60 µm" },
    ],
    printTips: [
      "Gebruik een geharde nozzle als je vaak Sparkle print; de deeltjes kunnen messing langzaam uitslijten.",
      "Houd ventilatie op 80% voor scherpe details zonder stringing.",
      "Lak het object met een glansvernis om de glitters extra te laten schitteren.",
    ],
    seo: {
      title: "PLA Sparkle glitter filament laten printen",
      description:
        "Met PLA Sparkle van X3DPrints geef je producten een subtiele glitterlook. Ideaal voor cosplay, merchandising en gifts.",
    },
    leadTime: "Levertijd 4 werkdagen",
    priceIndicator: "Prijsindicatie: €€",
    faq: [
      {
        question: "Kan PLA Sparkle mijn nozzle verstoppen?",
        answer:
          "Nee, de deeltjes zijn erg fijn. We adviseren wel regelmatig een cold pull uit te voeren om residu te verwijderen.",
      },
      {
        question: "Werkt het glittereffect op foto?",
        answer:
          "Ja. Plaats een lichtbron schuin voor het object en je ziet de schittering duidelijk verschijnen op camera.",
      },
    ],
  },
  {
    key: "PLA_METAL",
    slug: MATERIAL_SLUGS["PLA_METAL"],
    heroTagline: "Metaallook zonder roest",
    heroDescription:
      "PLA Metal combineert een metallic glans met het eenvoudige printproces van PLA. Kies uit staal-, koper- of bronskleuren.",
    summary:
      "Gebruik dit filament voor prototypes of decoratieve onderdelen die een industriële uitstraling nodig hebben zonder zwaar te worden.",
    highlights: [
      {
        title: "Hoogglans",
        description:
          "Het oppervlak reflecteert licht zoals geanodiseerd metaal, ideaal voor tech-producties.",
      },
      {
        title: "Geen oxidatie",
        description:
          "In tegenstelling tot metaalpoeder-filamenten roest PLA Metal niet en heeft het geen speciaal onderhoud nodig.",
      },
      {
        title: "Detaillering",
        description:
          "Door minimale krimp blijven fijne ribbels en ribben haarscherp.",
      },
    ],
    idealFor: [
      "Productbehuizingen",
      "Showmodellen voor beurzen",
      "Decoratieve panelen",
      "Props met metallic look",
    ],
    specs: [
      { label: "Afwerking", value: "Zijdeglans metallic" },
      { label: "Aanbevolen temperatuur", value: "205–215 °C" },
      { label: "Bedtemperatuur", value: "50–60 °C" },
    ],
    printTips: [
      "Oriënteer zichtvlakken in één richting zodat de metallic glans consistent loopt.",
      "Gebruik glanzende lak als toplaag voor een spiegelend resultaat.",
      "Schuur in één richting met fijne korrel om geborstelde metaal-look te krijgen.",
    ],
    seo: {
      title: "PLA Metal: metallic 3D prints op maat",
      description:
        "Kies PLA Metal bij X3DPrints voor een industriële glans zonder het gewicht van echte metalen. Perfect voor prototypes en decoratie.",
    },
    leadTime: "Levertijd 3 werkdagen",
    priceIndicator: "Prijsindicatie: €€",
    faq: [
      {
        question: "Is PLA Metal elektrisch geleidend?",
        answer:
          "Nee. Het betreft een PLA-basis met kleurpigment. Gebruik het enkel voor look & feel, niet voor functionele geleidende onderdelen.",
      },
      {
        question: "Kan ik PLA Metal polijsten?",
        answer:
          "Ja. Met nat schuren en een polijstpasta krijg je een hoogglans resultaat. Werk in stappen van korrel 400 tot 2000.",
      },
    ],
  },
  {
    key: "PLA_GALAXY",
    slug: MATERIAL_SLUGS["PLA_GALAXY"],
    heroTagline: "Diepte en sterrenstof",
    heroDescription:
      "PLA Galaxy combineert diepe kleuren met fonkelende microglitters voor een ruimtelijke uitstraling.",
    summary:
      "Perfect voor decoratieve prints, kunstobjecten en gadgets die moeten opvallen in zowel dag- als kunstlicht.",
    highlights: [
      {
        title: "Ruimtelijke look",
        description:
          "De glitterdeeltjes zijn ongelijk verdeeld waardoor je diepte ziet alsof je in een sterrenhemel kijkt.",
      },
      {
        title: "Weinig stringing",
        description:
          "De basis-PLA is geoptimaliseerd voor schone overbruggingen en scherpe details.",
      },
      {
        title: "Showkwaliteit",
        description:
          "Ideaal voor limited edition prints en luxe merchandising.",
      },
    ],
    idealFor: [
      "Cosplay en fan-art",
      "Premium geschenkartikelen",
      "Decoratieve lampenkappen",
      "Sieraaddisplay's",
    ],
    specs: [
      { label: "Glittertype", value: "Micro sparkle" },
      { label: "Printtemperatuur", value: "210–220 °C" },
      { label: "Aanbevolen laaghoogte", value: "0,16–0,24 mm" },
    ],
    printTips: [
      "Gebruik een nozzle van 0,4 mm of groter voor een vrije doorstroming.",
      "Laat prints langzaam afkoelen om barsten te vermijden in dunnere secties.",
      "Polijst met een zachte doek om glans te versterken zonder krassen.",
    ],
    seo: {
      title: "PLA Galaxy glitter filament op maat",
      description:
        "Maak fonkelende 3D prints met PLA Galaxy van X3DPrints. Perfect voor eye-catching merchandising en decoratieve projecten.",
    },
    leadTime: "Levertijd 4 werkdagen",
    priceIndicator: "Prijsindicatie: €€€",
    faq: [
      {
        question: "Is PLA Galaxy hetzelfde als Sparkle?",
        answer:
          "Galaxy gebruikt een donkere basiskleur met fijne glitters die diepte creëren. Sparkle heeft grotere glitters en meer contrast.",
      },
      {
        question: "Kan ik transparante lak gebruiken?",
        answer:
          "Ja, een heldere vernislaag versterkt het diepte-effect en beschermt tegen krassen.",
      },
    ],
  },
  {
    key: "PLA_AERO",
    slug: MATERIAL_SLUGS["PLA_AERO"],
    heroTagline: "Superlicht, supersterk",
    heroDescription:
      "PLA Aero is een gefoamed filament dat tot 40% lichter is dan standaard PLA zonder in te boeten aan stijfheid.",
    summary:
      "Ideaal voor grote volumes, RC-onderdelen en concepten waarbij gewicht cruciaal is.",
    highlights: [
      {
        title: "Lichtgewicht",
        description:
          "Door microbelletjes in het filament weegt je print tot 40% minder dan klassiek PLA.",
      },
      {
        title: "Sneller printen",
        description:
          "De lagere dichtheid laat toe om dikkere lagen te printen zonder doorzakken.",
      },
      {
        title: "Goede demping",
        description:
          "De schuimstructuur absorbeert vibraties, ideaal voor drone- en RC-projecten.",
      },
    ],
    idealFor: [
      "RC-vliegtuigen en drones",
      "Architecturale volumestudies",
      "Grote decorstukken",
      "Productconcepten waar gewicht kritiek is",
    ],
    specs: [
      { label: "Dichtheid", value: "0,8 g/cm³" },
      { label: "Printtemperatuur", value: "210–225 °C" },
      { label: "Aanbevolen nozzle", value: "0,4–0,6 mm" },
    ],
    printTips: [
      "Verhoog de flow naar 105–110% om de lagere dichtheid te compenseren.",
      "Print in een gesloten ruimte om tocht te vermijden; de schuimstructuur is gevoelig.",
      "Gebruik support met hogere dichtheid voor vormen met grote overhangen.",
    ],
    seo: {
      title: "PLA Aero lichtgewicht 3D prints",
      description:
        "Laat superlichte onderdelen produceren met PLA Aero bij X3DPrints. Ideaal voor RC, drones en grote prototypes.",
    },
    leadTime: "Levertijd 5 werkdagen",
    priceIndicator: "Prijsindicatie: €€€",
    faq: [
      {
        question: "Is PLA Aero even sterk?",
        answer:
          "Het materiaal is iets minder stijf dan klassiek PLA, maar dankzij het foamgedrag vangt het schokken beter op.",
      },
      {
        question: "Welke afwerking krijg ik?",
        answer:
          "De huid oogt licht satijn en voelt fluweelachtig door het schuim. Je kunt het alsnog schuren of schilderen.",
      },
    ],
  },
  {
    key: "PLA_SILK_PLUS",
    slug: MATERIAL_SLUGS["PLA_SILK_PLUS"],
    heroTagline: "Showcase glans",
    heroDescription:
      "PLA Silk+ heeft een intense glans die elke bocht accentueert. Ideaal voor showpieces, awards en sierobjecten.",
    summary:
      "De zijdeglans finish vangt licht en maakt prints fotogeniek zonder extra nabewerking.",
    highlights: [
      {
        title: "Spiegelende afwerking",
        description:
          "De polymeren verspreiden het licht zodat er een metallic glans ontstaat zonder zichtbare laaglijnen.",
      },
      {
        title: "Vloeiende overgangen",
        description:
          "Zelfs bij lage resolutie blijven rondingen vloeiend dankzij het zelfnivellerend effect.",
      },
      {
        title: "Veel kleuren",
        description:
          "Van klassiek goud tot opvallend cyan of magenta: elke kleur blijft glanzen.",
      },
    ],
    idealFor: [
      "Awards en trofeeën",
      "Merchandise en branding items",
      "Cosplay armor",
      "Interieuraccenten",
    ],
    specs: [
      { label: "Afwerking", value: "Zijdeglans" },
      { label: "Printtemperatuur", value: "205–215 °C" },
      { label: "Cooling", value: "60–80%" },
    ],
    printTips: [
      "Verlaag de ventilator iets om glans te maximaliseren, maar bewaak fijne details.",
      "Gebruik zijdelingse belichting bij presentatie om de glans te benadrukken.",
      "Licht schuren met korrel 2000 en vervolgens polijsten geeft een spiegel-effect.",
    ],
    seo: {
      title: "PLA Silk+ glanzende 3D prints",
      description:
        "Op zoek naar ultra glanzende 3D prints? Kies PLA Silk+ bij X3DPrints voor showmodellen, awards en luxe merchandising.",
    },
    leadTime: "Levertijd 3 werkdagen",
    priceIndicator: "Prijsindicatie: €€",
    faq: [
      {
        question: "Zijn laaglijnen zichtbaar?",
        answer:
          "De glans maakt laaglijnen minder zichtbaar. Voor een echt spiegelend resultaat raden we fijn schuren en polijsten aan.",
      },
      {
        question: "Is PLA Silk+ kwetsbaar?",
        answer:
          "Het is iets brosser dan standaard PLA. Voor functionele onderdelen kies je beter PLA Tough+ of PETG.",
      },
    ],
  },
  {
    key: "PLA_BASIC_GRADIENT",
    slug: MATERIAL_SLUGS["PLA_BASIC_GRADIENT"],
    heroTagline: "Zachte kleurverlopen",
    heroDescription:
      "PLA Basic Gradient bevat vloeiende kleurtransities die je print automatisch een dynamische look geven.",
    summary:
      "Elke spoel is uniek: ideaal voor lifestyle accessoires en kunstobjecten waar kleurverloop centraal staat.",
    highlights: [
      {
        title: "Geen extra nabewerking",
        description:
          "Het gradient-effect zit in de spoel. Je hoeft niet te schilderen voor een opvallend resultaat.",
      },
      {
        title: "Zachte overgangen",
        description:
          "De kleur wisselt langzaam zodat er geen harde lijnen zichtbaar zijn op grote oppervlakken.",
      },
      {
        title: "Instagram-waardig",
        description:
          "Perfect voor social content en productfotografie dankzij de natuurlijke kleurflow.",
      },
    ],
    idealFor: [
      "Lifestyle accessoires",
      "Decoratieve vazen",
      "Educatieve modellen",
      "Merchandising met opvallende kleur",
    ],
    specs: [
      { label: "Verlooplengte", value: "± 8–12 m" },
      { label: "Printtemperatuur", value: "205–215 °C" },
      { label: "Aanbevolen laaghoogte", value: "0,16–0,24 mm" },
    ],
    printTips: [
      "Plan de hoogte van je object zodat kleurwissels op een mooi punt vallen.",
      "Print meerdere kleine objecten tegelijk om het verloop evenwichtiger te spreiden.",
      "Houd filament droog voor consistente tinten.",
    ],
    seo: {
      title: "PLA Gradient 3D prints met kleurverloop",
      description:
        "Laat unieke kleurverlopen printen met PLA Gradient bij X3DPrints. Ideaal voor decoratie, gifts en opvallende prototypes.",
    },
    leadTime: "Levertijd 3 werkdagen",
    priceIndicator: "Prijsindicatie: €€",
    faq: [
      {
        question: "Kan ik het verloop sturen?",
        answer:
          "Het verloop hangt af van de spoellengte. We helpen je object oriënteren zodat de mooiste kleuren zichtbaar zijn.",
      },
      {
        question: "Zijn de kleuren reproduceerbaar?",
        answer:
          "Elke spoel heeft een eigen patroon. We kiezen de juiste spoel voor je bestelling, maar kleine verschillen horen erbij.",
      },
    ],
  },
  {
    key: "PLA_BASIC",
    slug: MATERIAL_SLUGS["PLA_BASIC"],
    heroTagline: "Betrouwbare allrounder",
    heroDescription:
      "PLA Basic is het werkpaard voor prototypes, maquettes en promotionele items. Betaalbaar, snel leverbaar en in tientallen kleuren.",
    summary:
      "Gebruik PLA Basic wanneer je snel een nette print nodig hebt zonder speciale eigenschappen.",
    highlights: [
      {
        title: "Breed kleurenpalet",
        description:
          "Van neutrale tinten tot felle RAL-achtige kleuren. Ideaal om bij je huisstijl te matchen.",
      },
      {
        title: "Stabiel printgedrag",
        description:
          "We kennen dit filament door en door, wat zorgt voor voorspelbare resultaten.",
      },
      {
        title: "Betaalbaar",
        description:
          "Het meest budgetvriendelijke materiaal in ons gamma voor snelle iteraties.",
      },
    ],
    idealFor: [
      "Proof-of-concept modellen",
      "Marketing giveaways",
      "Educatieve hulpmiddelen",
      "Maquettes en schaalmodellen",
    ],
    specs: [
      { label: "Printtemperatuur", value: "200–210 °C" },
      { label: "Bedtemperatuur", value: "50–60 °C" },
      { label: "Glasovergang", value: "± 60 °C" },
    ],
    printTips: [
      "Gebruik 100% koeling voor scherpe details en overbruggingen.",
      "Voor mechanische prototypes versterk wanden of kies PLA Tough+.",
      "Bewaar spoelen droog om brosheid te vermijden.",
    ],
    seo: {
      title: "PLA Basic: standaard 3D printmateriaal",
      description:
        "PLA Basic van X3DPrints is ideaal voor prototypes, maquettes en promotionele items. Kies uit een groot kleurenaanbod.",
    },
    leadTime: "Levertijd 2 werkdagen",
    priceIndicator: "Prijsindicatie: €",
    faq: [
      {
        question: "Is PLA Basic voedselveilig?",
        answer:
          "Het filament is niet gecertificeerd voor voedselcontact. Voor decoratieve toepassingen is het perfect geschikt.",
      },
      {
        question: "Kan PLA Basic buiten gebruikt worden?",
        answer:
          "Kortstondig kan dat, maar langdurige zon en warmte kunnen vervorming veroorzaken. Kies PETG voor outdoor projecten.",
      },
    ],
  },
  {
    key: "PETG",
    slug: MATERIAL_SLUGS["PETG"],
    heroTagline: "Functioneel en duurzaam",
    heroDescription:
      "PETG combineert de verwerkbaarheid van PLA met extra hitte- en chemische bestendigheid. Dé keuze voor functionele onderdelen.",
    summary:
      "Gebruik PETG voor onderdelen die buiten komen, licht flexibel mogen zijn of in contact komen met water en chemicaliën.",
    highlights: [
      {
        title: "Hoge slagvastheid",
        description:
          "PETG is taai en barst niet snel, zelfs bij herhaald gebruik of schroeven.",
      },
      {
        title: "Weerbestendig",
        description:
          "Dit materiaal is beter bestand tegen UV en vocht dan PLA en behoudt zijn vorm bij 80 °C.",
      },
      {
        title: "Haltransparante opties",
        description:
          "Kies voor translucent PETG wanneer lichtdoorlaatbaarheid belangrijk is.",
      },
    ],
    idealFor: [
      "Behuizingen voor elektronica",
      "Buitencomponenten",
      "Mechanische prototypes",
      "Vloeistof reservoirs (niet-voedingsklasse)",
    ],
    specs: [
      { label: "Printtemperatuur", value: "235–250 °C" },
      { label: "Bedtemperatuur", value: "70–85 °C" },
      { label: "Glasovergang", value: "80–85 °C" },
    ],
    printTips: [
      "Verlaag koeling naar 30–50% om lagen beter te laten hechten.",
      "Gebruik een lijmstift of PEI-bed voor optimale hechting zonder warping.",
      "Dry het filament voor printen om stringing te beperken.",
    ],
    seo: {
      title: "PETG 3D printen voor functionele onderdelen",
      description:
        "Bestel sterke, weerbestendige 3D prints in PETG bij X3DPrints. Ideaal voor buitengebruik en mechanische toepassingen.",
    },
    leadTime: "Levertijd 3 werkdagen",
    priceIndicator: "Prijsindicatie: €€",
    faq: [
      {
        question: "Is PETG food-safe?",
        answer:
          "De grondstof kan food-safe zijn, maar 3D prints hebben microgroeven. Voor kritieke toepassingen raden we het niet aan.",
      },
      {
        question: "Welke toleranties haal je?",
        answer:
          "We halen standaard ±0,2 mm. Voor kritieke passing stemmen we ontwerp en printinstellingen af.",
      },
    ],
  },
  {
    key: "PLA_TRANSLUCENT",
    slug: MATERIAL_SLUGS["PLA_TRANSLUCENT"],
    heroTagline: "Lichtdoorlatende magie",
    heroDescription:
      "PLA Translucent filtert licht zacht waardoor lampenkappen, signalisatie en designobjecten een unieke glow krijgen.",
    summary:
      "Ideaal voor sfeerlicht, branding of toepassingen waarbij kleur en licht samenkomen.",
    highlights: [
      {
        title: "Consistente lichtdoorlaat",
        description:
          "De semi-transparante basis zorgt voor een homogene gloed zonder hotspots.",
      },
      {
        title: "Veel kleuren",
        description:
          "Van koel aqua tot warm rood. Combineer meerdere tinten voor gradient verlichting.",
      },
      {
        title: "Dun printbaar",
        description:
          "Zelfs bij 0,6 mm wanddikte blijft het materiaal sterk genoeg dankzij goede laaghechting.",
      },
    ],
    idealFor: [
      "Lampenkappen en sfeerlicht",
      "Backlit signage",
      "Display stands",
      "Architecturale lichtstudies",
    ],
    specs: [
      { label: "Lichtdoorlaat", value: "45–65% afhankelijk van kleur" },
      { label: "Printtemperatuur", value: "205–215 °C" },
      { label: "Aanbevolen wanddikte", value: "0,8–1,6 mm" },
    ],
    printTips: [
      "Print met dunnere wanden (0,8–1,2 mm) om uniform licht door te laten.",
      "Schakel supports uit waar mogelijk om matte plekken te vermijden.",
      "Gebruik vase-mode voor naadloze buisvormige objecten.",
    ],
    seo: {
      title: "Translucent PLA voor lichtdoorlatende 3D prints",
      description:
        "Creëer lichtdoorlatende onderdelen met PLA Translucent bij X3DPrints. Perfect voor lampenkappen, signage en designobjecten.",
    },
    leadTime: "Levertijd 3 werkdagen",
    priceIndicator: "Prijsindicatie: €€",
    faq: [
      {
        question: "Hoe homogeen is het licht?",
        answer:
          "We stemmen de wanddikte af op jouw toepassing. Met vase-mode prints krijg je een perfect gelijkmatige gloed.",
      },
      {
        question: "Verkleurt het materiaal?",
        answer:
          "Langdurige UV kan lichte verkleuring geven. Voor outdoor lichtobjecten adviseren we PETG Translucent.",
      },
    ],
  },
  {
    key: "PLA_SILK_MULTI_COLOR",
    slug: MATERIAL_SLUGS["PLA_SILK_MULTI_COLOR"],
    heroTagline: "Kleurverloop met spiegelglans",
    heroDescription:
      "PLA Silk Multi-Color combineert een zijdeglans finish met opvallende regenboogverlopen.",
    summary:
      "Ideaal voor showpieces, festivalgadgets of merchandising waar kleur en glans centraal staan.",
    highlights: [
      {
        title: "Spectaculaire kleuren",
        description:
          "Elke rotatie van de spoel levert een nieuw kleursegment waardoor prints nooit vervelen.",
      },
      {
        title: "Gladde finish",
        description:
          "De silk-basis zorgt voor spiegelende wanden zonder nabewerking.",
      },
      {
        title: "Social media ready",
        description:
          "Perfect voor eye-catching foto’s en video’s dankzij de dynamische kleurshift.",
      },
    ],
    idealFor: [
      "Festival merch",
      "Awards en trofeeën",
      "Cosplay props",
      "Limited edition geschenken",
    ],
    specs: [
      { label: "Verlooplengte", value: "± 5–8 m" },
      { label: "Printtemperatuur", value: "205–215 °C" },
      { label: "Afwerking", value: "Zijdeglans" },
    ],
    printTips: [
      "Print meerdere objecten tegelijk om het kleurverloop geleidelijker te maken.",
      "Vermijd extreme koeling zodat de glans behouden blijft.",
      "Gebruik een buffing doek voor extra glans na het printen.",
    ],
    seo: {
      title: "Silk rainbow PLA 3D prints",
      description:
        "Laat glanzende regenboogprints maken met PLA Silk Multi-Color bij X3DPrints. Ideaal voor festivalmerch, awards en gifts.",
    },
    leadTime: "Levertijd 4 werkdagen",
    priceIndicator: "Prijsindicatie: €€€",
    faq: [
      {
        question: "Kan ik bepalen welke kleur waar komt?",
        answer:
          "We stemmen de startpositie van de spoel af, maar exacte kleurposities blijven uniek per print.",
      },
      {
        question: "Is het materiaal krasgevoelig?",
        answer:
          "De glanslaag kan fijne krasjes vertonen bij intensief gebruik. Beschermende vernis helpt dit te beperken.",
      },
    ],
  },
  {
    key: "PLA_CF",
    slug: MATERIAL_SLUGS["PLA_CF"],
    heroTagline: "Carbon versterkt",
    heroDescription:
      "PLA-CF is gevuld met koolstofvezels voor extra stijfheid en een matte, technische look.",
    summary:
      "Ideaal voor functionele onderdelen, jigs en toepassingen waar je hogere maatvastheid zoekt.",
    highlights: [
      {
        title: "Structuurvast",
        description:
          "De koolstofvezels verminderen krimp en zorgen voor een stijve, vormvaste print.",
      },
      {
        title: "Matte afwerking",
        description:
          "De vezels geven een premium, carbon-achtige textuur die weinig nabewerking vraagt.",
      },
      {
        title: "Warmtebestendiger",
        description:
          "Hoger temperatuurbereik dan standaard PLA dankzij de vezelversterking.",
      },
    ],
    idealFor: [
      "Bevestigingsplaten en brackets",
      "Jigs en tools",
      "FPV en drone-onderdelen",
      "Automotive prototypes",
    ],
    specs: [
      { label: "Printtemperatuur", value: "215–230 °C" },
      { label: "Bedtemperatuur", value: "60–70 °C" },
      { label: "Nozzlevereiste", value: "Gehard staal verplicht" },
    ],
    printTips: [
      "Gebruik een geharde nozzle om slijtage te voorkomen.",
      "Verhoog de flow licht (102–105%) voor dichte wanden.",
      "Print in een droge omgeving; vezels nemen vocht op.",
    ],
    seo: {
      title: "PLA Carbon fiber 3D prints",
      description:
        "Laat stijve en lichte onderdelen printen met PLA-CF bij X3DPrints. Ideaal voor jigs, drones en technische prototypes.",
    },
    leadTime: "Levertijd 4 werkdagen",
    priceIndicator: "Prijsindicatie: €€€",
    faq: [
      {
        question: "Hoe sterk is PLA-CF?",
        answer:
          "Het is stijver dan PLA maar iets brosser bij impact. Voor maximale taaiheid raden we PETG-CF aan.",
      },
      {
        question: "Laat het vezels achter op het printbed?",
        answer:
          "Nee, maar we gebruiken PEI of glas met lijm voor betrouwbare hechting en eenvoudige verwijdering.",
      },
    ],
  },
  {
    key: "PLA_WOOD",
    slug: MATERIAL_SLUGS["PLA_WOOD"],
    heroTagline: "Warm en natuurlijk",
    heroDescription:
      "PLA Wood bevat echte houtdeeltjes voor een warme, natuurlijke look en subtiele houtgeur tijdens het printen.",
    summary:
      "Perfect voor interieurdecoratie, maquettes en productmock-ups waarbij je een organische uitstraling zoekt.",
    highlights: [
      {
        title: "Eenvoudig te bewerken",
        description:
          "Schuren, boren en lakken kan net als bij zacht hout. De houtdeeltjes geven grip aan verf en beits.",
      },
      {
        title: "Lichte houtgeur",
        description:
          "Tijdens het printen ruik je een zachte houtaroma, zonder storende dampen.",
      },
      {
        title: "Variabele tint",
        description:
          "Door de houtdeeltjes heeft elke print subtiele kleurvariaties, wat het realisme verhoogt.",
      },
    ],
    idealFor: [
      "Interieur accessoires",
      "Architecturale modellen",
      "Productmock-ups",
      "Geschenkartikelen",
    ],
    specs: [
      { label: "Printtemperatuur", value: "200–215 °C" },
      { label: "Nozzle", value: "≥ 0,4 mm (gehard aanbevolen)" },
      { label: "Nabewerking", value: "Schuren en beitsen mogelijk" },
    ],
    printTips: [
      "Gebruik een grotere nozzle (0,6 mm) voor zichtbare houtstructuur.",
      "Print trager (40–50 mm/s) om verstoppingen te vermijden.",
      "Verhoog temperatuur licht voor donkerdere tinten.",
    ],
    seo: {
      title: "PLA Wood: 3D prints met houtlook",
      description:
        "Geef je 3D prints een warme houtlook met PLA Wood van X3DPrints. Ideaal voor interieurprojecten en maquettes.",
    },
    leadTime: "Levertijd 3 werkdagen",
    priceIndicator: "Prijsindicatie: €€",
    faq: [
      {
        question: "Ruiken prints naar hout?",
        answer:
          "Ja, er blijft een subtiele houtgeur aanwezig. Je kunt het object vernissen om de geur te verzegelen indien gewenst.",
      },
      {
        question: "Kan PLA Wood verbranden in de nozzle?",
        answer:
          "Houd de temperatuur onder 215 °C en print niet te langzaam. We reinigen de nozzle regelmatig om aanslag te voorkomen.",
      },
    ],
  },
  {
    key: "TPU",
    slug: MATERIAL_SLUGS["TPU"],
    heroTagline: "Flexibele beschermers",
    heroDescription:
      "TPU is een rubberachtig filament dat buigt en terugveert. Perfect voor grips, bumpers en demping.",
    summary:
      "Gebruik TPU wanneer je impact absorptie of slipvastheid zoekt in je ontwerp.",
    highlights: [
      {
        title: "Elastisch",
        description:
          "TPU kan tot 600% rekken en keert terug naar vorm zonder blijvende vervorming.",
      },
      {
        title: "Slijtvast",
        description:
          "Het materiaal is bestand tegen herhaald gebruik, ideaal voor machinevoeten of beschermhoesjes.",
      },
      {
        title: "Grip en demping",
        description:
          "De rubbertouch zorgt voor extra grip en schokabsorptie.",
      },
    ],
    idealFor: [
      "Telefoon- en toolcovers",
      "Trillingsdempers",
      "Pakking en afdichtingen",
      "Wearables en sportaccessoires",
    ],
    specs: [
      { label: "Hardheid", value: "Shore 95A" },
      { label: "Printtemperatuur", value: "225–235 °C" },
      { label: "Bedtemperatuur", value: "40–60 °C" },
    ],
    printTips: [
      "Print traag (20–35 mm/s) en gebruik weinig retracties om verstoppingen te vermijden.",
      "Schakel coasting en pressure advance af voor consistente flow.",
      "Gebruik lijmstick of textielfolie voor extra hechting.",
    ],
    seo: {
      title: "TPU flexibele 3D prints op maat",
      description:
        "Bestel flexibele 3D prints in TPU bij X3DPrints. Ideaal voor grips, bumpers en trillingsdempers met professionele afwerking.",
    },
    leadTime: "Levertijd 5 werkdagen",
    priceIndicator: "Prijsindicatie: €€€",
    faq: [
      {
        question: "Is TPU olie- of chemicaliënbestendig?",
        answer:
          "TPU is bestand tegen de meeste oliën en vetten. Voor zware chemicaliën testen we graag samen op compatibiliteit.",
      },
      {
        question: "Hoe flexibel is het eindproduct?",
        answer:
          "We gebruiken Shore 95A TPU. Het voelt als een stevige rubber: buigzaam maar vormvast. Dikkere wanden maken het stijver, dunne wanden buigen makkelijk.",
      },
    ],
  },
]

export const MATERIAL_DETAILS = details.reduce(
  (acc, item) => {
    acc[item.key] = item
    return acc
  },
  {} as Record<MaterialKey, MaterialDetailContent>,
)

export const MATERIAL_DETAILS_BY_SLUG = details.reduce(
  (acc, item) => {
    acc[item.slug] = item
    return acc
  },
  {} as Record<string, MaterialDetailContent>,
)

export const MATERIAL_DETAIL_SLUGS = details.map((item) => item.slug)
