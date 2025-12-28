import type { MaterialKey } from "@/lib/materials"

export type PriceLevel = "budget" | "medium" | "premium"

export type MaterialSuggestionRecord = {
  id: string
  materialKey: MaterialKey
  name: string
  category: string
  descriptionShort: string
  descriptionLong: string
  finish: string
  bestFor: string[]
  highlightTags: string[]
  environment: {
    suitability: {
      indoor: number
      outdoorSeasonal: number
      outdoorPermanent: number
    }
    uvResistance: number
    tempResistance: number
  }
  mechanical: {
    strength: number
    flexibility: number
    impactResistance: number
  }
  printProfile: {
    difficulty: number
    needsDryer: boolean
    notes: string
  }
  economics: {
    priceLevel: PriceLevel
    costFactor: number
  }
  flags: {
    isFlexible: boolean
    specialLook: "mat" | "silk" | "wood" | "marble" | "sparkle" | "metallic" | "galaxy" | "gradient" | "translucent" | "glow" | "silk_gradient" | "mat_technical" | null
  }
  colors: string[]
}

export const MATERIAL_SUGGESTION_DATA: MaterialSuggestionRecord[] = [
  {
    id: "pla_tough_plus",
    materialKey: "PLA_TOUGH_PLUS",
    name: "PLA Tough+",
    category: "PLA",
    descriptionShort: "Taaier dan standaard PLA, beter bestand tegen impact.",
    descriptionLong:
      "PLA Tough+ combineert het printgemak van PLA met extra slagvastheid. Perfect voor onderdelen die getest worden of af en toe een stoot krijgen zonder meteen naar PETG over te schakelen.",
    finish: "Mat tot licht satijn, strakke details.",
    bestFor: ["Functionele prototypes", "Clips en klemmen", "Kleine behuizingen", "Speelgoedonderdelen"],
    highlightTags: ["Tougher dan PLA", "Minder broos", "Printvriendelijk"],
    environment: {
      suitability: { indoor: 5, outdoorSeasonal: 2, outdoorPermanent: 1 },
      uvResistance: 2,
      tempResistance: 3,
    },
    mechanical: { strength: 4, flexibility: 2, impactResistance: 4 },
    printProfile: {
      difficulty: 2,
      needsDryer: false,
      notes: "Print vergelijkbaar met standaard PLA, soms iets hogere nozzle temperatuur.",
    },
    economics: { priceLevel: "medium", costFactor: 2 },
    flags: { isFlexible: false, specialLook: "mat" },
    colors: ["Yellow", "White", "Red", "Light Grey", "Blue Grey", "Light Blue", "Black"],
  },
  {
    id: "pla_matte",
    materialKey: "PLA_MATTE",
    name: "PLA Matte",
    category: "PLA",
    descriptionShort: "Matte PLA met premium uitstraling.",
    descriptionLong:
      "PLA Matte verdoezelt laaglijnen en oogt alsof het geïnjecteerd is. Ideaal voor designobjecten, awards en behuizingen waar look & feel belangrijk zijn.",
    finish: "Diep mat oppervlak met strakke details.",
    bestFor: ["Designobjecten", "Gifts en awards", "Behuizingen", "Architectuurmodellen"],
    highlightTags: ["Mat oppervlak", "Strakke details", "Premium look"],
    environment: {
      suitability: { indoor: 5, outdoorSeasonal: 2, outdoorPermanent: 1 },
      uvResistance: 2,
      tempResistance: 2,
    },
    mechanical: { strength: 3, flexibility: 1, impactResistance: 2 },
    printProfile: {
      difficulty: 2,
      needsDryer: false,
      notes: "Zeer vergevingsgezind; print zoals standaard PLA.",
    },
    economics: { priceLevel: "medium", costFactor: 2 },
    flags: { isFlexible: false, specialLook: "mat" },
    colors: [
      "White",
      "Grey",
      "Black",
      "Sand",
      "Clay",
      "Terracotta",
      "Blush",
      "Burgundy",
      "Navy",
      "Blue",
      "Teal",
      "Pine",
      "Olive",
      "Lime",
      "Yellow",
      "Orange",
      "Red",
    ],
  },
  {
    id: "pla_glow",
    materialKey: "PLA_GLOW",
    name: "PLA Glow",
    category: "PLA Specialty",
    descriptionShort: "Glow-in-the-dark PLA met sterk lichtgevend effect.",
    descriptionLong:
      "PLA Glow laadt op met licht en gloeit urenlang in het donker. Ideaal voor gadgets, events, escape rooms en signalisatie in low-light omgevingen.",
    finish: "Glad oppervlak met licht textuur; gloeit in het donker.",
    bestFor: ["Gadgets en speelgoed", "Events en carnaval", "Signalisatie", "Escape rooms"],
    highlightTags: ["Glow-in-the-dark", "Decoratief", "Fun factor"],
    environment: {
      suitability: { indoor: 5, outdoorSeasonal: 2, outdoorPermanent: 1 },
      uvResistance: 2,
      tempResistance: 2,
    },
    mechanical: { strength: 3, flexibility: 1, impactResistance: 2 },
    printProfile: {
      difficulty: 3,
      needsDryer: false,
      notes: "Glow pigment kan iets meer slijtage geven aan messing nozzles.",
    },
    economics: { priceLevel: "premium", costFactor: 3 },
    flags: { isFlexible: false, specialLook: "glow" },
    colors: ["Glow Green", "Glow Yellow", "Glow Blue", "Glow Aqua", "Glow Orange"],
  },
  {
    id: "pla_marble",
    materialKey: "PLA_MARBLE",
    name: "PLA Marble",
    category: "PLA Specialty",
    descriptionShort: "Marmerlook met subtiele spikkels.",
    descriptionLong:
      "PLA Marble combineert een matte textuur met een realistische marmerstructuur. Perfect voor awards, interieuraccenten en kunstobjecten.",
    finish: "Matte steentextuur met spikkels.",
    bestFor: ["Interieurdecoratie", "Awards en trofeeën", "Kunstobjecten", "Sokkels en bustes"],
    highlightTags: ["Marmerlook", "Stijlvol", "Mat"],
    environment: {
      suitability: { indoor: 5, outdoorSeasonal: 2, outdoorPermanent: 1 },
      uvResistance: 2,
      tempResistance: 2,
    },
    mechanical: { strength: 3, flexibility: 1, impactResistance: 2 },
    printProfile: {
      difficulty: 3,
      needsDryer: false,
      notes: "Pigment kan voor iets meer oozing zorgen.",
    },
    economics: { priceLevel: "premium", costFactor: 3 },
    flags: { isFlexible: false, specialLook: "marble" },
    colors: ["Terracotta Marble", "Marble Grey", "Marble White"],
  },
  {
    id: "pla_sparkle",
    materialKey: "PLA_SPARKLE",
    name: "PLA Sparkle",
    category: "PLA Specialty",
    descriptionShort: "Glitter-effect voor opvallende prints.",
    descriptionLong:
      "PLA Sparkle bevat glitterdeeltjes die onder licht sprankelen. Van subtiele shimmer tot opvallende showstopper, perfect voor cosplay en decoratieve prints.",
    finish: "Glitterend oppervlak, variërend van subtiel tot uitgesproken.",
    bestFor: ["Showpieces", "Cosplay", "Decoratieve prints", "Awards"],
    highlightTags: ["Glitter-effect", "Diepte in oppervlak"],
    environment: {
      suitability: { indoor: 5, outdoorSeasonal: 2, outdoorPermanent: 1 },
      uvResistance: 2,
      tempResistance: 2,
    },
    mechanical: { strength: 3, flexibility: 1, impactResistance: 2 },
    printProfile: {
      difficulty: 3,
      needsDryer: false,
      notes: "Glitter kan nozzle iets sneller slijten; hardend nozzle aanbevolen.",
    },
    economics: { priceLevel: "premium", costFactor: 3 },
    flags: { isFlexible: false, specialLook: "sparkle" },
    colors: ["Graphite", "Pine", "Wine", "Plum", "Mustard"],
  },
  {
    id: "pla_metal",
    materialKey: "PLA_METAL",
    name: "PLA Metal",
    category: "PLA Specialty",
    descriptionShort: "Metaalachtige glans zonder gewicht van metaal.",
    descriptionLong:
      "PLA Metal levert een egale metallic glans. Ideaal voor props, industriële esthetiek en designprints die 'metal' mogen lijken zonder lakwerk.",
    finish: "Metallic glans, egale lijnen.",
    bestFor: ["Props en rekwisieten", "Industriële look", "Cosplay armor", "Display onderdelen"],
    highlightTags: ["Metallic glans", "Egale afwerking"],
    environment: {
      suitability: { indoor: 5, outdoorSeasonal: 2, outdoorPermanent: 1 },
      uvResistance: 2,
      tempResistance: 2,
    },
    mechanical: { strength: 3, flexibility: 1, impactResistance: 2 },
    printProfile: {
      difficulty: 3,
      needsDryer: false,
      notes: "Metaalpigment kan overhangs iets beïnvloeden.",
    },
    economics: { priceLevel: "premium", costFactor: 3 },
    flags: { isFlexible: false, specialLook: "metallic" },
    colors: ["Steel", "Copper", "Bronze", "Gunmetal", "Graphite"],
  },
  {
    id: "pla_galaxy",
    materialKey: "PLA_GALAXY",
    name: "PLA Galaxy",
    category: "PLA Specialty",
    descriptionShort: "Diepe kleuren met micro-glitter voor een 'deep space' effect.",
    descriptionLong:
      "PLA Galaxy combineert rijke basiskleuren met subtiele micro-glitter. Perfect voor sierobjecten, sci-fi props en unieke behuizingen.",
    finish: "Diepe tinten met subtiele glitter.",
    bestFor: ["Decoratieve objecten", "Sci-fi props", "Kunstwerken", "Eye-catching behuizingen"],
    highlightTags: ["Diepe kleuren", "Subtiele glitter"],
    environment: {
      suitability: { indoor: 5, outdoorSeasonal: 2, outdoorPermanent: 1 },
      uvResistance: 2,
      tempResistance: 2,
    },
    mechanical: { strength: 3, flexibility: 1, impactResistance: 2 },
    printProfile: {
      difficulty: 3,
      needsDryer: false,
      notes: "Vergelijkbaar met andere glitter-mixen.",
    },
    economics: { priceLevel: "premium", costFactor: 3 },
    flags: { isFlexible: false, specialLook: "galaxy" },
    colors: ["Plum Nebula", "Indigo Nebula", "Teal Nebula", "Cosmos Brown"],
  },
  {
    id: "pla_aero",
    materialKey: "PLA_AERO",
    name: "PLA Aero",
    category: "PLA Specialty",
    descriptionShort: "Lichtgewicht PLA voor grote prints.",
    descriptionLong:
      "PLA Aero heeft een lagere dichtheid waardoor grote modellen lichter en sneller te printen zijn. Ideaal voor cosplay armor, architectuur en volumestudies.",
    finish: "Mat tot licht satijn, licht poreus.",
    bestFor: ["Grote cosplay-onderdelen", "Architectuurmodellen", "Lichtgewicht prototypes"],
    highlightTags: ["Lichtgewicht", "Sneller volume", "Goed voor grote prints"],
    environment: {
      suitability: { indoor: 5, outdoorSeasonal: 2, outdoorPermanent: 1 },
      uvResistance: 2,
      tempResistance: 2,
    },
    mechanical: { strength: 2, flexibility: 2, impactResistance: 2 },
    printProfile: {
      difficulty: 3,
      needsDryer: false,
      notes: "Structuur is poreuzer; eerder voor low-load toepassingen.",
    },
    economics: { priceLevel: "medium", costFactor: 2 },
    flags: { isFlexible: false, specialLook: null },
    colors: ["Aero White", "Aero Grey"],
  },
  {
    id: "pla_silk_plus",
    materialKey: "PLA_SILK_PLUS",
    name: "PLA Silk+",
    category: "PLA Specialty",
    descriptionShort: "Ultra-glanzend filament met spiegelachtige reflectie.",
    descriptionLong:
      "PLA Silk+ levert een uitzonderlijke glans, ideaal voor trophies, merchandising en luxe displays. De blend is steviger dan klassieke silk varianten.",
    finish: "Zeer hoge zijdeglans.",
    bestFor: ["Awards en trofeeën", "Showpieces", "Displays", "Luxe decoratie"],
    highlightTags: ["Zijdeglans", "Diepe kleuren", "Showpiece"],
    environment: {
      suitability: { indoor: 5, outdoorSeasonal: 2, outdoorPermanent: 1 },
      uvResistance: 2,
      tempResistance: 2,
    },
    mechanical: { strength: 3, flexibility: 1, impactResistance: 2 },
    printProfile: {
      difficulty: 3,
      needsDryer: false,
      notes: "Meer stringing mogelijk; vraagt wat tuning.",
    },
    economics: { priceLevel: "premium", costFactor: 3 },
    flags: { isFlexible: false, specialLook: "silk" },
    colors: [
      "Black",
      "Graphite",
      "Silver",
      "White",
      "Champagne",
      "Copper",
      "Gold",
      "Red",
      "Green",
      "Blue",
      "Cyan",
      "Magenta",
      "Rose",
      "Sand",
      "Stone",
    ],
  },
  {
    id: "pla_basic_gradient",
    materialKey: "PLA_BASIC_GRADIENT",
    name: "PLA Basic Gradient",
    category: "PLA Specialty",
    descriptionShort: "Spoelen met zachte kleurverlopen.",
    descriptionLong:
      "PLA Basic Gradient bevat vloeiende kleurverlopen die prints spontaan een dynamische look geven. Ideaal voor vazen en decoratieve items.",
    finish: "Gladde PLA-finish met organische kleurverlopen.",
    bestFor: ["Vazen", "Decoratieve items", "Showpieces"],
    highlightTags: ["Kleurverloop", "Decoratief"],
    environment: {
      suitability: { indoor: 5, outdoorSeasonal: 2, outdoorPermanent: 1 },
      uvResistance: 2,
      tempResistance: 2,
    },
    mechanical: { strength: 3, flexibility: 1, impactResistance: 2 },
    printProfile: {
      difficulty: 2,
      needsDryer: false,
      notes: "Print zoals standaard PLA.",
    },
    economics: { priceLevel: "medium", costFactor: 2 },
    flags: { isFlexible: false, specialLook: "gradient" },
    colors: ["Sunset", "Ocean", "Lemonade", "Aurora"],
  },
  {
    id: "pla_basic",
    materialKey: "PLA_BASIC",
    name: "PLA Basic",
    category: "PLA",
    descriptionShort: "Standaard PLA met grote kleurenrange.",
    descriptionLong:
      "PLA Basic is de allrounder voor prototypes, maquettes en educatieve modellen. Betaalbaar, betrouwbaar en snel te printen.",
    finish: "Halfmat tot licht glanzend.",
    bestFor: ["Prototypes", "Maquettes", "Algemene prints", "Educatie"],
    highlightTags: ["Veel kleuren", "Betaalbaar", "Universeel inzetbaar"],
    environment: {
      suitability: { indoor: 5, outdoorSeasonal: 2, outdoorPermanent: 1 },
      uvResistance: 2,
      tempResistance: 2,
    },
    mechanical: { strength: 3, flexibility: 1, impactResistance: 2 },
    printProfile: {
      difficulty: 1,
      needsDryer: false,
      notes: "Meest vergevingsgezinde keuze.",
    },
    economics: { priceLevel: "budget", costFactor: 1 },
    flags: { isFlexible: false, specialLook: null },
    colors: [
      "White",
      "Ivory",
      "Light Grey",
      "Grey",
      "Black",
      "Brown",
      "Beige",
      "Tan",
      "Yellow",
      "Orange",
      "Coral",
      "Pink",
      "Magenta",
      "Red",
      "Maroon",
      "Purple",
      "Violet",
      "Indigo",
      "Blue",
      "Sky",
      "Teal",
      "Turquoise",
      "Cyan",
      "Mint",
      "Green",
      "Olive",
      "Lime",
    ],
  },
  {
    id: "petg",
    materialKey: "PETG",
    name: "PETG",
    category: "PETG",
    descriptionShort: "Weerbestendig en taaier dan PLA.",
    descriptionLong:
      "PETG is een sterke, licht flexibele kunststof die beter presteert dan PLA in buitenomgevingen, bij hogere temperaturen en bij mechanische belasting.",
    finish: "Licht glanzend, strak oppervlak.",
    bestFor: ["Buitenonderdelen", "Technische onderdelen", "Klemmen en houders", "Vochtige omgevingen"],
    highlightTags: ["Functioneel", "Chemisch resistenter", "Vormvast buiten"],
    environment: {
      suitability: { indoor: 5, outdoorSeasonal: 4, outdoorPermanent: 4 },
      uvResistance: 4,
      tempResistance: 4,
    },
    mechanical: { strength: 4, flexibility: 2, impactResistance: 4 },
    printProfile: {
      difficulty: 3,
      needsDryer: true,
      notes: "Iets stringy, drogen en cooling-instellingen zijn belangrijk.",
    },
    economics: { priceLevel: "medium", costFactor: 2 },
    flags: { isFlexible: false, specialLook: null },
    colors: ["Black", "White", "Transparent", "Blue", "Red"],
  },
  {
    id: "pc",
    materialKey: "PC",
    name: "PC",
    category: "Engineering",
    descriptionShort: "Polycarbonaat voor hittebestendige onderdelen.",
    descriptionLong:
      "PC combineert hoge slagvastheid met uitstekende hitte- en UV-bestendigheid. Perfect voor behuizingen en brackets die in de zon of naast motorblokken belanden.",
    finish: "Semi-glans, optioneel licht transparant.",
    bestFor: ["Technische behuizingen", "Machine covers", "Outdoor brackets", "LED diffusers"],
    highlightTags: ["Hittebestendig", "UV-bestendig", "Functioneel"],
    environment: {
      suitability: { indoor: 5, outdoorSeasonal: 4, outdoorPermanent: 4 },
      uvResistance: 4,
      tempResistance: 5,
    },
    mechanical: { strength: 5, flexibility: 2, impactResistance: 4 },
    printProfile: {
      difficulty: 4,
      needsDryer: true,
      notes: "Droog minstens 8 uur en print in een gesloten behuizing voor beste resultaten.",
    },
    economics: { priceLevel: "premium", costFactor: 4 },
    flags: { isFlexible: false, specialLook: null },
    colors: ["Transparant", "Helder Zwart", "Zwart"],
  },
  {
    id: "pla_translucent",
    materialKey: "PLA_TRANSLUCENT",
    name: "PLA Translucent",
    category: "PLA Specialty",
    descriptionShort: "Halfdoorzichtig PLA voor lichtdoorlatende toepassingen.",
    descriptionLong:
      "PLA Translucent laat licht door en creëert een zachte gloed. Perfect voor lampenkappen, signage en decoratieve covers.",
    finish: "Translucent, lichtdoorlatend.",
    bestFor: ["Lampen", "Light diffusers", "Signage", "Decoratie"],
    highlightTags: ["Lichtdoorlatend", "Sfeervol"],
    environment: {
      suitability: { indoor: 5, outdoorSeasonal: 2, outdoorPermanent: 1 },
      uvResistance: 2,
      tempResistance: 2,
    },
    mechanical: { strength: 3, flexibility: 1, impactResistance: 2 },
    printProfile: {
      difficulty: 2,
      needsDryer: false,
      notes: "Wanddikte bepaalt lichtdoorlaat; thin walls voor meer gloed.",
    },
    economics: { priceLevel: "medium", costFactor: 2 },
    flags: { isFlexible: false, specialLook: "translucent" },
    colors: ["Aqua", "Cyan", "Blue", "Teal", "Green", "Red", "Magenta", "Violet", "Opal", "Smoke"],
  },
  {
    id: "pla_silk_multicolor",
    materialKey: "PLA_SILK_MULTI_COLOR",
    name: "PLA Silk Multi-Color",
    category: "PLA Specialty",
    descriptionShort: "Zijdeglans met ingebouwd kleurverloop.",
    descriptionLong:
      "PLA Silk Multi-Color combineert een zijdeglans finish met een dynamisch kleurverloop. Dé keuze voor showpieces en awards.",
    finish: "Hoge glans, vloeiende kleurverloop.",
    bestFor: ["Showpieces", "Awards", "Eyecatchers"],
    highlightTags: ["Kleurverloop", "Zijdeglans", "Spectaculair"],
    environment: {
      suitability: { indoor: 5, outdoorSeasonal: 2, outdoorPermanent: 1 },
      uvResistance: 2,
      tempResistance: 2,
    },
    mechanical: { strength: 3, flexibility: 1, impactResistance: 2 },
    printProfile: {
      difficulty: 3,
      needsDryer: false,
      notes: "Vergelijkbaar met andere silk filamenten.",
    },
    economics: { priceLevel: "premium", costFactor: 3 },
    flags: { isFlexible: false, specialLook: "silk_gradient" },
    colors: ["Rainbow"],
  },
  {
    id: "pla_cf",
    materialKey: "PLA_CF",
    name: "PLA-CF",
    category: "PLA Engineering",
    descriptionShort: "Carbon-gevuld PLA, stijf en mat.",
    descriptionLong:
      "PLA-CF bevat koolstofvezel en is daardoor stijver en minder flexibel dan standaard PLA. De matte finish oogt technisch en professioneel.",
    finish: "Mat, licht ruw, technisch.",
    bestFor: ["Jigs en fixtures", "Technische panelen", "Behuizingen", "Functionele onderdelen"],
    highlightTags: ["Stijf & licht", "Matte look", "Technisch"],
    environment: {
      suitability: { indoor: 5, outdoorSeasonal: 3, outdoorPermanent: 2 },
      uvResistance: 3,
      tempResistance: 3,
    },
    mechanical: { strength: 4, flexibility: 1, impactResistance: 3 },
    printProfile: {
      difficulty: 4,
      needsDryer: true,
      notes: "Abrasive: gebruik geharde nozzle en droger.",
    },
    economics: { priceLevel: "premium", costFactor: 4 },
    flags: { isFlexible: false, specialLook: "mat_technical" },
    colors: ["Forest Green", "Brick Red", "Royal Blue", "Grey", "Black", "Navy", "Purple"],
  },
  {
    id: "pla_wood",
    materialKey: "PLA_WOOD",
    name: "PLA Wood",
    category: "PLA Specialty",
    descriptionShort: "PLA met houtdeeltjes voor natuurlijke look.",
    descriptionLong:
      "PLA Wood bevat echte houtdeeltjes en geeft prints een warme, houtachtige uitstraling. Goed schuurbaar en geschikt om te beitsen of te lakken.",
    finish: "Houttextuur, licht poreus.",
    bestFor: ["Maquettes", "Interieurdecoratie", "Props", "Natuurlijke look"],
    highlightTags: ["Natuurlijke look", "Schuurbaar", "Licht geurend"],
    environment: {
      suitability: { indoor: 5, outdoorSeasonal: 2, outdoorPermanent: 1 },
      uvResistance: 2,
      tempResistance: 2,
    },
    mechanical: { strength: 2, flexibility: 1, impactResistance: 2 },
    printProfile: {
      difficulty: 3,
      needsDryer: true,
      notes: "Gebruik grotere nozzle en lagere snelheid om verstoppen te vermijden.",
    },
    economics: { priceLevel: "premium", costFactor: 3 },
    flags: { isFlexible: false, specialLook: "wood" },
    colors: ["Walnut", "Mahogany", "Teak", "Oak", "Desert"],
  },
  {
    id: "tpu",
    materialKey: "TPU",
    name: "TPU",
    category: "Flexible",
    descriptionShort: "Flexibel en schokabsorberend.",
    descriptionLong:
      "TPU is een rubberachtig filament dat buigt en terugveert. Perfect voor grips, bumpers, afdichtingen en dempingstoepassingen.",
    finish: "Licht glanzend, rubberachtig.",
    bestFor: ["Telefoonhoesjes", "Bumpers", "Shock absorbers", "Antislip onderdelen"],
    highlightTags: ["Flexibel", "Schokabsorberend", "Slijtvast"],
    environment: {
      suitability: { indoor: 5, outdoorSeasonal: 4, outdoorPermanent: 3 },
      uvResistance: 3,
      tempResistance: 3,
    },
    mechanical: { strength: 3, flexibility: 5, impactResistance: 5 },
    printProfile: {
      difficulty: 4,
      needsDryer: true,
      notes: "Langzamer printen en beperkte retract voor consistente flow.",
    },
    economics: { priceLevel: "premium", costFactor: 3 },
    flags: { isFlexible: true, specialLook: null },
    colors: ["Black", "Grey", "White", "Red", "Yellow", "Neon Green", "Blue"],
  },
]
