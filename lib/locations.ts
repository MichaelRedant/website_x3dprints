// /lib/locations.ts
export type Location = {
  slug: string
  city: string
  relatedPhrases?: string[]
  metaDescription?: string
  servicedAreas?: string[]
  sectors?: string[]
}


export const locations: Location[] = [
  {
    slug: "3d-printen-in-aalst",
    city: "Aalst",
    relatedPhrases: [
      "3D print service Aalst",
      "rapid prototyping Aalst",
      "3D printing bedrijf Aalst",
      "3D printen nabij Aalst",
      "3D model laten printen Aalst",
    ],
    metaDescription: "Laat je 3D-idee werkelijkheid worden in Aalst van prototypes tot kleine series, PLA, PETG en TPU beschikbaar. Vraag een offerte bij X3DPrints.",
    servicedAreas: ["Aalst centrum", "Erembodegem", "Hofstade", "Ninove", "Denderleeuw", "Afhalen Herzele"],
    sectors: ["Prototyping voor maakbedrijven in Aalst", "Marketing/events in Denderstreek", "Onderwijs en labs in Aalst-Ninove"],
  },
  {
    slug: "3d-printen-in-antwerpen",
    city: "Antwerpen",
    relatedPhrases: [
      "3D print service Antwerpen",
      "rapid prototyping Antwerpen",
      "3D printing bedrijf Antwerpen",
      "3D printen haven Antwerpen",
      "3D model laten printen Antwerpen",
    ],
    metaDescription:
      "Professionele 3D prints in Antwerpen voor havenbedrijven, creatieve bureaus en onderwijs. PLA, PETG en TPU met snelle levering.",
    servicedAreas: ["Antwerpen centrum", "Linkeroever", "Berchem", "Borgerhout", "Haven", "Afhalen Herzele"],
    sectors: ["Haven/logistiek tools", "Marketing/props voor events Antwerpen", "Onderwijs en labs in Antwerpen"],
  },
  {
    slug: "3d-printen-in-berchem",
    city: "Berchem",
    relatedPhrases: [
      "3D print service Berchem",
      "rapid prototyping Berchem",
      "3D printing bedrijf Berchem",
      "3D printen nabij Berchem",
      "3D model laten printen Berchem",
    ],
    metaDescription:
      "3D printen in Berchem met snelle levering richting Zurenborg en het station. PLA, PETG en TPU op maat van jouw prototype of serie.",
    servicedAreas: ["Berchem centrum", "Zurenborg", "Groen Kwartier", "Antwerpen-Zuid", "Afhalen Herzele"],
    sectors: ["Interieur/props voor Zurenborg boutiques", "Prototyping voor creatieve bureaus", "Onderwijs/kunstacademies Berchem"],
  },
  {
    slug: "3d-printen-in-berendrecht-zandvliet-lillo",
    city: "Berendrecht-Zandvliet-Lillo",
    relatedPhrases: [
      "3D print service Berendrecht",
      "3D printen Zandvliet",
      "3D printing bedrijf Lillo",
      "rapid prototyping BZL",
      "3D model laten printen Berendrecht-Zandvliet-Lillo",
    ],
    metaDescription:
      "Stevige 3D prints voor Berendrecht, Zandvliet en Lillo met focus op havenprojecten. Kies PLA, PETG of TPU en ontvang snel een offerte.",
    servicedAreas: ["Berendrecht", "Zandvliet", "Lillo", "Ekeren", "Havengebied", "Afhalen Herzele"],
    sectors: ["Havenprojecten en tooling", "Industrieel maatwerk nabij PSA/DP World", "Onderwijs en labs in de regio"],
  },
  {
    slug: "3d-printen-in-borgerhout",
    city: "Borgerhout",
    relatedPhrases: [
      "3D print service Borgerhout",
      "rapid prototyping Borgerhout",
      "3D printing bedrijf Borgerhout",
      "3D printen nabij Borgerhout",
      "3D model laten printen Borgerhout",
    ],
    metaDescription:
      "3D printen in Borgerhout met snelle levering voor Turnhoutsebaan, De Roma en Spoor Oost. Materialen PLA, PETG en TPU beschikbaar.",
    servicedAreas: ["Turnhoutsebaan", "Spoor Oost", "De Roma", "Borgerhout centrum", "Afhalen Herzele"],
    sectors: ["Culturele events en props", "Prototypes voor creatieve bureaus", "Retail/interieur in Borgerhout"],
  },
  {
    slug: "3d-printen-in-borsbeek",
    city: "Borsbeek",
    relatedPhrases: [
      "3D print service Borsbeek",
      "rapid prototyping Borsbeek",
      "3D printing bedrijf Borsbeek",
      "3D printen nabij Borsbeek",
      "3D model laten printen Borsbeek",
    ],
    metaDescription:
      "Scherpe 3D prints in Borsbeek met snelle verzending richting Fort 3 en luchthaven. PLA Matte, PETG en TPU voor prototypes en onderdelen.",
    servicedAreas: ["Borsbeek centrum", "Fort 3", "Luchthavenzone", "Deurne", "Afhalen Herzele"],
    sectors: ["Luchtvaart/lucht-hubs", "KMO's in Borsbeek/Deurne", "Props/retail voor buurtwinkels"],
  },
  {
    slug: "3d-printen-in-deurne",
    city: "Deurne",
    relatedPhrases: [
      "3D print service Deurne",
      "rapid prototyping Deurne",
      "3D printing bedrijf Deurne",
      "3D printen nabij Deurne",
      "3D model laten printen Deurne",
    ],
    metaDescription:
      "3D printen in Deurne voor projecten rond Rivierenhof en Sportpaleis. Snelle offertes en levering in PLA, PETG of TPU.",
    servicedAreas: ["Deurne centrum", "Rivierenhof", "Sportpaleis omgeving", "Haven-Zuid", "Borgerhout/Antwerpen oost", "Afhalen Herzele"],
    sectors: ["Events/props rond Sportpaleis", "Tooling voor maakbedrijven Deurne/Antwerpen", "Onderwijs/techniek Deurne"],
  },
  {
    slug: "3d-printen-in-ekeren",
    city: "Ekeren",
    relatedPhrases: [
      "3D print service Ekeren",
      "rapid prototyping Ekeren",
      "3D printing bedrijf Ekeren",
      "3D printen nabij Ekeren",
      "3D model laten printen Ekeren",
    ],
    metaDescription:
      "3D print service in Ekeren met focus op industrie en haven. Kies PLA, PETG of TPU en ontvang snel een voorstel.",
    servicedAreas: ["Ekeren centrum", "Rozemaai", "Leugenberg", "Ekeren-Donk", "Kapellen grens", "Afhalen Herzele"],
    sectors: ["Haven/industrie tooling Ekeren", "Retail/props Bredabaan", "Prototyping voor KMO's Ekeren/Kapellen"],
  },
  {
    slug: "3d-printen-in-hoboken",
    city: "Hoboken",
    relatedPhrases: [
      "3D print service Hoboken",
      "rapid prototyping Hoboken",
      "3D printing bedrijf Hoboken",
      "3D printen nabij Hoboken",
      "3D model laten printen Hoboken",
    ],
    metaDescription:
      "Professionele 3D prints in Hoboken voor Blue Gate en Scheldeprojecten. PLA, PETG en TPU met snelle levering.",
    servicedAreas: ["Hoboken centrum", "Blue Gate", "Kiel/Hoboken grens", "A12-corridor", "Afhalen Herzele"],
    sectors: ["Schelde/industrie projecten", "Tooling voor Blue Gate bedrijven", "Props/retail voor Kiel/Hoboken"],
  },
  {
    slug: "3d-printen-in-merksem",
    city: "Merksem",
    relatedPhrases: [
      "3D print service Merksem",
      "rapid prototyping Merksem",
      "3D printing bedrijf Merksem",
      "3D printen nabij Merksem",
      "3D model laten printen Merksem",
    ],
    metaDescription:
      "3D prints in Merksem met snelle doorlooptijd voor Bredabaan en Sportpaleis. PLA, PETG en TPU beschikbaar.",
    servicedAreas: ["Merksem centrum", "Bredabaan", "Sportpaleis omgeving", "Ekeren/Merksem grens", "Afhalen Herzele"],
    sectors: ["Retail/props Bredabaan", "Events/Sportpaleis omgeving", "KMO tooling in Merksem/Ekeren"],
  },
  {
    slug: "3d-printen-in-wilrijk",
    city: "Wilrijk",
    relatedPhrases: [
      "3D print service Wilrijk",
      "rapid prototyping Wilrijk",
      "3D printing bedrijf Wilrijk",
      "3D printen nabij Wilrijk",
      "3D model laten printen Wilrijk",
    ],
    metaDescription:
      "Snelle 3D print service in Wilrijk voor campus Drie Eiken en bedrijven langs de A12. Materialen PLA, PETG en TPU.",
    servicedAreas: ["Wilrijk centrum", "Campus Drie Eiken", "A12-corridor", "Hoboken/Wilrijk grens", "Afhalen Herzele"],
    sectors: ["Onderwijs/UAntwerpen Drie Eiken", "KMO's langs A12", "Props/events voor lokale organisaties"],
  },
  {
    slug: "3d-printen-in-kortrijk",
    city: "Kortrijk",
    relatedPhrases: [
      "3D print service Kortrijk",
      "rapid prototyping Kortrijk",
      "3D printing bedrijf Kortrijk",
      "3D printen nabij Kortrijk",
      "3D model laten printen Kortrijk",
    ],
    metaDescription:
      "3D printen in Kortrijk voor prototypes, tools en props. Snelle levering richting Kortrijk Weide, Overleie en R8. PLA, PETG of TPU met persoonlijk advies.",
    servicedAreas: [
      "Kortrijk centrum",
      "Kortrijk Weide",
      "Overleie",
      "Heule",
      "Marke",
      "Bissegem",
      "Kuurne",
      "Harelbeke",
      "Afhalen Provincieweg 34a, 9552 Herzele",
    ],
    sectors: [
      "Prototyping voor maakbedrijven in Kortrijk/Kuurne",
      "Fixtures/tooling voor industrie langs R8 en E17",
      "Props en displays voor events op Kortrijk Xpo",
      "Onderwijs/Howest en Kulak studentenprojecten",
    ],
  },
  {
    slug: "3d-printen-in-mechelen",
    city: "Mechelen",
    relatedPhrases: [
      "3D print service Mechelen",
      "rapid prototyping Mechelen",
      "3D printing bedrijf Mechelen",
      "3D printen nabij Mechelen",
      "3D model laten printen Mechelen",
    ],
    metaDescription:
      "3D printen in Mechelen voor prototypes, tooling en props. Snelle levering richting Mechelen-Zuid, Nekkerhal en KMO-zones. PLA, PETG of TPU met persoonlijk advies.",
    servicedAreas: [
      "Mechelen centrum",
      "Mechelen-Zuid",
      "Nekkerhal",
      "Battel",
      "Muizen",
      "Walem",
      "Leest",
      "Hombeek",
      "Afhalen Provincieweg 34a, 9552 Herzele",
    ],
    sectors: [
      "Prototyping voor KMO's in Mechelen",
      "Fixtures/tooling voor bedrijven langs E19/R6",
      "Props en displays voor events in Nekkerhal",
      "Onderwijs en labs (Thomas More, KU Leuven campus Mechelen)",
    ],
  },
  {
    slug: "3d-printen-in-mortsel",
    city: "Mortsel",
    relatedPhrases: [
      "3D print service Mortsel",
      "rapid prototyping Mortsel",
      "3D printing bedrijf Mortsel",
      "3D printen nabij Mortsel",
      "3D model laten printen Mortsel",
    ],
    metaDescription:
      "Snelle 3D prints in Mortsel voor projecten rond Fort 4, de Krijgsbaan en tramverbindingen richting Antwerpen. Kies uit PLA, PETG of TPU.",
  },
  {
    slug: "3d-printen-in-edegem",
    city: "Edegem",
    relatedPhrases: [
      "3D print service Edegem",
      "rapid prototyping Edegem",
      "3D printing bedrijf Edegem",
      "3D printen nabij Edegem",
      "3D model laten printen Edegem",
    ],
    metaDescription:
      "Professionele 3D prints in Edegem voor campus UZA, bedrijventerreinen en makers rond Hof Ter Linden. Offerte op maat met PLA, PETG of TPU.",
  },
  {
    slug: "3d-printen-in-kontich",
    city: "Kontich",
    relatedPhrases: [
      "3D print service Kontich",
      "rapid prototyping Kontich",
      "3D printing bedrijf Kontich",
      "3D printen nabij Kontich",
      "3D model laten printen Kontich",
    ],
    metaDescription:
      "3D printen in Kontich met focus op KMO-zones Prins Boudewijnlaan en Satenrozen. Snelle levering in PLA, PETG of TPU.",
  },
  {
    slug: "3d-printen-in-schoten",
    city: "Schoten",
    relatedPhrases: [
      "3D print service Schoten",
      "rapid prototyping Schoten",
      "3D printing bedrijf Schoten",
      "3D printen nabij Schoten",
      "3D model laten printen Schoten",
    ],
    metaDescription:
      "3D prints voor Schoten met oog op industriezone Borgeind en creatieve projecten langs het kanaal. Kies PLA, PETG of TPU.",
  },
  {
    slug: "3d-printen-in-brasschaat",
    city: "Brasschaat",
    relatedPhrases: [
      "3D print service Brasschaat",
      "rapid prototyping Brasschaat",
      "3D printing bedrijf Brasschaat",
      "3D printen nabij Brasschaat",
      "3D model laten printen Brasschaat",
    ],
    metaDescription:
      "Nauwkeurige 3D prints in Brasschaat voor bedrijven rond de Bredabaan en projecten in de groene omgeving. PLA, PETG en TPU beschikbaar.",
  },
  {
    slug: "3d-printen-in-kapellen",
    city: "Kapellen",
    relatedPhrases: [
      "3D print service Kapellen",
      "rapid prototyping Kapellen",
      "3D printing bedrijf Kapellen",
      "3D printen nabij Kapellen",
      "3D model laten printen Kapellen",
    ],
    metaDescription:
      "3D printing in Kapellen met snelle offertes voor ondernemers rond de Essenhoutstraat en KMO-zone Bosduin. Materialen PLA, PETG en TPU.",
  },
  {
    slug: "3d-printen-in-heffen",
    city: "Heffen",
    relatedPhrases: [
      "3D print service Heffen",
      "rapid prototyping Heffen",
      "3D printing bedrijf Heffen",
      "3D printen nabij Heffen",
      "3D model laten printen Heffen",
    ],
    metaDescription:
      "Professionele 3D prints in Heffen, dicht bij het Zennegat en jachthaven. Prototypes en onderdelen in PLA, PETG of TPU.",
  },
  {
    slug: "3d-printen-in-hombeek",
    city: "Hombeek",
    relatedPhrases: [
      "3D print service Hombeek",
      "rapid prototyping Hombeek",
      "3D printing bedrijf Hombeek",
      "3D printen nabij Hombeek",
      "3D model laten printen Hombeek",
    ],
    metaDescription:
      "3D printing in Hombeek vlak bij Leuven-Dijle kanaal en Mechelen-Noord. Snelle prototypes en kleine series in PLA, PETG of TPU.",
  },
  {
    slug: "3d-printen-in-leest",
    city: "Leest",
    relatedPhrases: [
      "3D print service Leest",
      "rapid prototyping Leest",
      "3D printing bedrijf Leest",
      "3D printen nabij Leest",
      "3D model laten printen Leest",
    ],
    metaDescription:
      "3D printen in Leest tussen Zenne en kleiputten. Snelle levering van prototypes en onderdelen op maat.",
  },
  {
    slug: "3d-printen-in-muizen",
    city: "Muizen",
    relatedPhrases: [
      "3D print service Muizen",
      "rapid prototyping Muizen",
      "3D printing bedrijf Muizen",
      "3D printen nabij Muizen",
      "3D model laten printen Muizen",
    ],
    metaDescription:
      "3D prints in Muizen, vlak bij Planckendael en Dijlevallei. Nette PLA, PETG of TPU onderdelen met snelle doorlooptijd.",
  },
  {
    slug: "3d-printen-in-walem",
    city: "Walem",
    relatedPhrases: [
      "3D print service Walem",
      "rapid prototyping Walem",
      "3D printing bedrijf Walem",
      "3D printen nabij Walem",
      "3D model laten printen Walem",
    ],
    metaDescription:
      "3D print service in Walem nabij Fort van Walem en E19. Prototypes en kleine series op maat in PLA, PETG of TPU.",
  },
  {
    slug: "3d-printen-in-brecht",
    city: "Brecht",
    relatedPhrases: [
      "3D print service Brecht",
      "rapid prototyping Brecht",
      "3D printing bedrijf Brecht",
      "3D printen nabij Brecht",
      "3D model laten printen Brecht",
    ],
    metaDescription:
      "3D print service in Brecht nabij E19 en station Noorderkempen. Prototypes en kleine series in PLA, PETG of TPU, snel geleverd in de Kempen.",
  },
  {
    slug: "3d-printen-in-schilde",
    city: "Schilde",
    relatedPhrases: [
      "3D print service Schilde",
      "rapid prototyping Schilde",
      "3D printing bedrijf Schilde",
      "3D printen nabij Schilde",
      "3D model laten printen Schilde",
    ],
    metaDescription:
      "3D printservice in Schilde voor creatieve bureaus en KMO's langs de Turnhoutsebaan. Kies PLA, PETG of TPU met snelle levering.",
  },
  {
    slug: "3d-printen-in-aartselaar",
    city: "Aartselaar",
    relatedPhrases: [
      "3D print service Aartselaar",
      "rapid prototyping Aartselaar",
      "3D printing bedrijf Aartselaar",
      "3D printen nabij Aartselaar",
      "3D model laten printen Aartselaar",
    ],
    metaDescription:
      "3D prints in Aartselaar voor bedrijven langs de A12 en industriezone Cleydael. Beschikbaar in PLA, PETG en TPU.",
  },
  {
    slug: "3d-printen-in-wommelgem",
    city: "Wommelgem",
    relatedPhrases: [
      "3D print service Wommelgem",
      "rapid prototyping Wommelgem",
      "3D printing bedrijf Wommelgem",
      "3D printen nabij Wommelgem",
      "3D model laten printen Wommelgem",
    ],
    metaDescription:
      "3D printen in Wommelgem met snelle verzending richting R11, Autolei en logistieke hubs. Materialen PLA, PETG en TPU.",
  },
  {
    slug: "3d-printen-in-wijnegem",
    city: "Wijnegem",
    relatedPhrases: [
      "3D print service Wijnegem",
      "rapid prototyping Wijnegem",
      "3D printing bedrijf Wijnegem",
      "3D printen nabij Wijnegem",
      "3D model laten printen Wijnegem",
    ],
    metaDescription:
      "3D print service in Wijnegem voor retailprojecten rond Wijnegem Shop Eat Enjoy en KMO's aan het Albertkanaal. PLA, PETG, TPU.",
  },
  {
    slug: "3d-printen-in-hove",
    city: "Hove",
    relatedPhrases: [
      "3D print service Hove",
      "rapid prototyping Hove",
      "3D printing bedrijf Hove",
      "3D printen nabij Hove",
      "3D model laten printen Hove",
    ],
    metaDescription:
      "3D prints in Hove met focus op lokale makers en ondernemers tussen Groenstraat en Lintsesteenweg. Kies PLA, PETG of TPU.",
  },
  {
    slug: "3d-printen-in-lint",
    city: "Lint",
    relatedPhrases: [
      "3D print service Lint",
      "rapid prototyping Lint",
      "3D printing bedrijf Lint",
      "3D printen nabij Lint",
      "3D model laten printen Lint",
    ],
    metaDescription:
      "3D printen in Lint met snelle levering richting industriezone Lerenveld en de spoorverbinding Antwerpen-Mechelen. PLA, PETG en TPU beschikbaar.",
  },
  {
    slug: "3d-printen-in-boechout",
    city: "Boechout",
    relatedPhrases: [
      "3D print service Boechout",
      "rapid prototyping Boechout",
      "3D printing bedrijf Boechout",
      "3D printen nabij Boechout",
      "3D model laten printen Boechout",
    ],
    metaDescription:
      "3D printservice in Boechout voor projecten rond Spoor Oost, Vremde en Hove. Kies PLA, PETG of TPU met heldere offertes.",
  },
  {
    slug: "3d-printen-in-boom",
    city: "Boom",
    relatedPhrases: [
      "3D print service Boom",
      "rapid prototyping Boom",
      "3D printing bedrijf Boom",
      "3D printen nabij Boom",
      "3D model laten printen Boom",
    ],
    metaDescription:
      "3D prints in Boom voor creatieve projecten rond De Schorre en industrie langs de A12. Materialen PLA, PETG en TPU met snelle verzending.",
  },
  {
    slug: "3d-printen-in-rumst",
    city: "Rumst",
    relatedPhrases: [
      "3D print service Rumst",
      "rapid prototyping Rumst",
      "3D printing bedrijf Rumst",
      "3D printen nabij Rumst",
      "3D model laten printen Rumst",
    ],
    metaDescription:
      "3D printen in Rumst met aandacht voor bouw- en infrastructuurprojecten tussen Rupel en Nete. Snelle offerte voor PLA, PETG of TPU.",
  },
  {
    slug: "3d-printen-in-herzele",
    city: "Herzele",
    relatedPhrases: [
      "3D print service Herzele",
      "rapid prototyping Herzele",
      "3D printing bedrijf Herzele",
      "3D printen nabij Herzele",
      "3D model laten printen Herzele",
    ],
    metaDescription: "X3DPrints verzorgt 3D prints voor Herzele en omgeving van prototypes tot kleine series, PLA, PETG en TPU beschikbaar. Upload je model bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-borsbeke",
    city: "Borsbeke",
    relatedPhrases: [
      "3D print service Borsbeke",
      "rapid prototyping Borsbeke",
      "3D printing bedrijf Borsbeke",
      "3D printen nabij Borsbeke",
      "3D model laten printen Borsbeke",
    ],
    metaDescription: "3D printservice in Borsbeke met focus op precisie van prototypes tot kleine series, PLA, PETG en TPU beschikbaar. X3DPrints helpt je project vooruit.",
  },
  {
    slug: "3d-printen-in-hillegem",
    city: "Hillegem",
    relatedPhrases: [
      "3D print service Hillegem",
      "rapid prototyping Hillegem",
      "3D printing bedrijf Hillegem",
      "3D printen nabij Hillegem",
      "3D model laten printen Hillegem",
    ],
    metaDescription: "Nauwkeurige 3D printing voor bedrijven en makers in Hillegem van prototypes tot kleine series, PLA, PETG en TPU beschikbaar. Ontvang je prijs bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-ressegem",
    city: "Ressegem",
    relatedPhrases: [
      "3D print service Ressegem",
      "rapid prototyping Ressegem",
      "3D printing bedrijf Ressegem",
      "3D printen nabij Ressegem",
      "3D model laten printen Ressegem",
    ],
    metaDescription: "Professionele 3D prints in Ressegem, snel geleverd van prototypes tot kleine series, PLA, PETG en TPU beschikbaar. X3DPrints print jouw ontwerp met zorg.",
  },
  {
    slug: "3d-printen-in-sint-antelinks",
    city: "Sint-Antelinks",
    relatedPhrases: [
      "3D print service Sint-Antelinks",
      "rapid prototyping Sint-Antelinks",
      "3D printing bedrijf Sint-Antelinks",
      "3D printen nabij Sint-Antelinks",
      "3D model laten printen Sint-Antelinks",
    ],
    metaDescription: "Laat je 3D-idee werkelijkheid worden in Sint-Antelinks voor prototypes, mallen en functionele onderdelen. Vraag een offerte bij X3DPrints. PLA, PETG.",
  },
  {
    slug: "3d-printen-in-sint-lievens-esse",
    city: "Sint-Lievens-Esse",
    relatedPhrases: [
      "3D print service Sint-Lievens-Esse",
      "rapid prototyping Sint-Lievens-Esse",
      "3D printing bedrijf Sint-Lievens-Esse",
      "3D printen nabij Sint-Lievens-Esse",
      "3D model laten printen Sint-Lievens-Esse",
    ],
    metaDescription: "X3DPrints verzorgt 3D prints voor Sint-Lievens-Esse en omgeving voor prototypes, mallen en functionele onderdelen. Upload je model bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-steenhuize-wijnhuize",
    city: "Steenhuize-Wijnhuize",
    relatedPhrases: [
      "3D print service Steenhuize-Wijnhuize",
      "rapid prototyping Steenhuize-Wijnhuize",
      "3D printing bedrijf Steenhuize-Wijnhuize",
      "3D printen nabij Steenhuize-Wijnhuize",
      "3D model laten printen Steenhuize-Wijnhuize",
    ],
    metaDescription: "3D printservice in Steenhuize-Wijnhuize met focus op precisie voor prototypes, mallen en functionele onderdelen. X3DPrints helpt je project vooruit.",
  },
  {
    slug: "3d-printen-in-woubrechtegem",
    city: "Woubrechtegem",
    relatedPhrases: [
      "3D print service Woubrechtegem",
      "rapid prototyping Woubrechtegem",
      "3D printing bedrijf Woubrechtegem",
      "3D printen nabij Woubrechtegem",
      "3D model laten printen Woubrechtegem",
    ],
    metaDescription: "Nauwkeurige 3D printing voor bedrijven en makers in Woubrechtegem voor prototypes, mallen en functionele onderdelen. Ontvang je prijs bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-geraardsbergen",
    city: "Geraardsbergen",
    relatedPhrases: [
      "3D print service Geraardsbergen",
      "rapid prototyping Geraardsbergen",
      "3D printing bedrijf Geraardsbergen",
      "3D printen nabij Geraardsbergen",
      "3D model laten printen Geraardsbergen",
    ],
    metaDescription: "Professionele 3D prints in Geraardsbergen voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-oosterzele",
    city: "Oosterzele",
    relatedPhrases: [
      "3D print service Oosterzele",
      "rapid prototyping Oosterzele",
      "3D printing bedrijf Oosterzele",
      "3D printen nabij Oosterzele",
      "3D model laten printen Oosterzele",
    ],
    metaDescription:
      "3D printen in Oosterzele en deelgemeenten. Snelle levering van PLA, PETG en TPU prototypes voor projecten rond Gondebeekvallei en Markt Oosterzele.",
  },
  {
    slug: "3d-printen-in-balegem",
    city: "Balegem",
    relatedPhrases: [
      "3D print service Balegem",
      "rapid prototyping Balegem",
      "3D printing bedrijf Balegem",
      "3D printen nabij Balegem",
      "3D model laten printen Balegem",
    ],
    metaDescription:
      "3D print service in Balegem voor projecten rond de Balegemse molens en steenwegen. Prototypes en onderdelen in PLA, PETG of TPU.",
  },
  {
    slug: "3d-printen-in-gijzenzele",
    city: "Gijzenzele",
    relatedPhrases: [
      "3D print service Gijzenzele",
      "rapid prototyping Gijzenzele",
      "3D printing bedrijf Gijzenzele",
      "3D printen nabij Gijzenzele",
      "3D model laten printen Gijzenzele",
    ],
    metaDescription:
      "3D prints in Gijzenzele nabij oorlogsmuseum en landelijke as Wetteren-Zottegem. Snelle levering van PLA, PETG of TPU onderdelen.",
  },
  {
    slug: "3d-printen-in-landskouter",
    city: "Landskouter",
    relatedPhrases: [
      "3D print service Landskouter",
      "rapid prototyping Landskouter",
      "3D printing bedrijf Landskouter",
      "3D printen nabij Landskouter",
      "3D model laten printen Landskouter",
    ],
    metaDescription:
      "3D printen in Landskouter tussen Lemberge en Moortsele. Prototypes en kleine series in PLA, PETG of TPU met snelle doorlooptijd.",
  },
  {
    slug: "3d-printen-in-moortsele",
    city: "Moortsele",
    relatedPhrases: [
      "3D print service Moortsele",
      "rapid prototyping Moortsele",
      "3D printing bedrijf Moortsele",
      "3D printen nabij Moortsele",
      "3D model laten printen Moortsele",
    ],
    metaDescription:
      "3D print service in Moortsele met focus op projecten rond Gondebeekvallei en spoorlijn. Snelle PLA, PETG en TPU leveringen.",
  },
  {
    slug: "3d-printen-in-scheldewindeke",
    city: "Scheldewindeke",
    relatedPhrases: [
      "3D print service Scheldewindeke",
      "rapid prototyping Scheldewindeke",
      "3D printing bedrijf Scheldewindeke",
      "3D printen nabij Scheldewindeke",
      "3D model laten printen Scheldewindeke",
    ],
    metaDescription:
      "3D printen in Scheldewindeke richting station, Driesplein en Molenhoek. Prototypes en onderdelen in PLA, PETG of TPU.",
  },
  {
    slug: "3d-printen-in-onkerzele",
    city: "Onkerzele",
    relatedPhrases: [
      "3D print service Onkerzele",
      "rapid prototyping Onkerzele",
      "3D printing bedrijf Onkerzele",
      "3D printen nabij Onkerzele",
      "3D model laten printen Onkerzele",
    ],
    metaDescription:
      "3D prints in Onkerzele nabij de Bosberg en Provinciaal Domein De Gavers. Snelle prototypes en kleine series in PLA, PETG of TPU.",
  },
  {
    slug: "3d-printen-in-overboelare",
    city: "Overboelare",
    relatedPhrases: [
      "3D print service Overboelare",
      "rapid prototyping Overboelare",
      "3D printing bedrijf Overboelare",
      "3D printen nabij Overboelare",
      "3D model laten printen Overboelare",
    ],
    metaDescription:
      "3D printen in Overboelare langs de Dender en Boelarebos. Nette PLA, PETG en TPU onderdelen met snelle levering.",
  },
  {
    slug: "3d-printen-in-nederboelare",
    city: "Nederboelare",
    relatedPhrases: [
      "3D print service Nederboelare",
      "rapid prototyping Nederboelare",
      "3D printing bedrijf Nederboelare",
      "3D printen nabij Nederboelare",
      "3D model laten printen Nederboelare",
    ],
    metaDescription:
      "3D prints in Nederboelare dichtbij de Muur en Abdijpark. Prototypes en functionele onderdelen op maat in PLA, PETG of TPU.",
  },
  {
    slug: "3d-printen-in-ophasselt",
    city: "Ophasselt",
    relatedPhrases: [
      "3D print service Ophasselt",
      "rapid prototyping Ophasselt",
      "3D printing bedrijf Ophasselt",
      "3D printen nabij Ophasselt",
      "3D model laten printen Ophasselt",
    ],
    metaDescription:
      "3D printen in Ophasselt rond Ophasseltbos en N42. Snelle levering van sterke PLA, PETG of TPU onderdelen.",
  },
  {
    slug: "3d-printen-in-schendelbeke",
    city: "Schendelbeke",
    relatedPhrases: [
      "3D print service Schendelbeke",
      "rapid prototyping Schendelbeke",
      "3D printing bedrijf Schendelbeke",
      "3D printen nabij Schendelbeke",
      "3D model laten printen Schendelbeke",
    ],
    metaDescription:
      "3D prints in Schendelbeke vlak bij station en Dendervallei. Prototypes en kleine series in PLA, PETG of TPU.",
  },
  {
    slug: "3d-printen-in-zandbergen",
    city: "Zandbergen",
    relatedPhrases: [
      "3D print service Zandbergen",
      "rapid prototyping Zandbergen",
      "3D printing bedrijf Zandbergen",
      "3D printen nabij Zandbergen",
      "3D model laten printen Zandbergen",
    ],
    metaDescription:
      "3D print service in Zandbergen langs de Dender en station Zandbergen. Snelle levering in PLA, PETG of TPU.",
  },
  {
    slug: "3d-printen-in-idegem",
    city: "Idegem",
    relatedPhrases: [
      "3D print service Idegem",
      "rapid prototyping Idegem",
      "3D printing bedrijf Idegem",
      "3D printen nabij Idegem",
      "3D model laten printen Idegem",
    ],
    metaDescription:
      "3D prints in Idegem dichtbij Dendermeersen en sluizen. Functionele onderdelen en maquettes in PLA, PETG of TPU.",
  },
  {
    slug: "3d-printen-in-goeferdinge",
    city: "Goeferdinge",
    relatedPhrases: [
      "3D print service Goeferdinge",
      "rapid prototyping Goeferdinge",
      "3D printing bedrijf Goeferdinge",
      "3D printen nabij Goeferdinge",
      "3D model laten printen Goeferdinge",
    ],
    metaDescription:
      "3D printen in Goeferdinge met zicht op Raspaillebos en Dender. Snelle prototypes en series in PLA, PETG of TPU.",
  },
  {
    slug: "3d-printen-in-grimminge",
    city: "Grimminge",
    relatedPhrases: [
      "3D print service Grimminge",
      "rapid prototyping Grimminge",
      "3D printing bedrijf Grimminge",
      "3D printen nabij Grimminge",
      "3D model laten printen Grimminge",
    ],
    metaDescription:
      "3D print service in Grimminge langs de Dender. Prototypes en hulpstukken in PLA, PETG of TPU met snelle doorlooptijd.",
  },
  {
    slug: "3d-printen-in-waarbeke",
    city: "Waarbeke",
    relatedPhrases: [
      "3D print service Waarbeke",
      "rapid prototyping Waarbeke",
      "3D printing bedrijf Waarbeke",
      "3D printen nabij Waarbeke",
      "3D model laten printen Waarbeke",
    ],
    metaDescription:
      "3D prints in Waarbeke dichtbij Waarbekeveld en trage wegen. Nette PLA, PETG en TPU onderdelen voor lokale projecten.",
  },
  {
    slug: "3d-printen-in-viane",
    city: "Viane",
    relatedPhrases: [
      "3D print service Viane",
      "rapid prototyping Viane",
      "3D printing bedrijf Viane",
      "3D printen nabij Viane",
      "3D model laten printen Viane",
    ],
    metaDescription:
      "3D printen in Viane rond kasteeldomein en Pajotse grens. Prototypes en kleine series in PLA, PETG of TPU.",
  },
  {
    slug: "3d-printen-in-moerbeke-geraardsbergen",
    city: "Moerbeke (Geraardsbergen)",
    relatedPhrases: [
      "3D print service Moerbeke",
      "rapid prototyping Moerbeke",
      "3D printing bedrijf Moerbeke",
      "3D printen nabij Moerbeke Geraardsbergen",
      "3D model laten printen Moerbeke",
    ],
    metaDescription:
      "3D prints in Moerbeke-Geraardsbergen langs de Dender. Snelle levering van PLA, PETG of TPU onderdelen op maat.",
  },
  {
    slug: "3d-printen-in-smeerebbe-vloerzegem",
    city: "Smeerebbe-Vloerzegem",
    relatedPhrases: [
      "3D print service Smeerebbe-Vloerzegem",
      "rapid prototyping Smeerebbe-Vloerzegem",
      "3D printing bedrijf Smeerebbe-Vloerzegem",
      "3D printen nabij Smeerebbe-Vloerzegem",
      "3D model laten printen Smeerebbe-Vloerzegem",
    ],
    metaDescription:
      "3D printen in Smeerebbe-Vloerzegem aan de rand van Raspaillebos. Prototypes en functionele onderdelen in PLA, PETG of TPU.",
  },
  {
    slug: "3d-printen-in-erpe-mere",
    city: "Erpe-mere",
    relatedPhrases: [
      "3D print service erpe-mere",
      "rapid prototyping erpe-mere",
      "3D printing bedrijf erpe-mere",
      "3D printen nabij erpe-mere",
      "3D model laten printen erpe-mere",
    ],
    metaDescription: "Professionele 3D prints in Erpe-mere voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-zottegem",
    city: "Zottegem",
    relatedPhrases: [
      "3D print service zottegem",
      "rapid prototyping zottegem",
      "3D printing bedrijf zottegem",
      "3D printen nabij zottegem",
      "3D model laten printen zottegem",
    ],
    metaDescription: "Professionele 3D prints in Zottegem voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-oudenaarde",
    city: "Oudenaarde",
    relatedPhrases: [
      "3D print service Oudenaarde",
      "rapid prototyping Oudenaarde",
      "3D printing bedrijf Oudenaarde",
      "3D printen nabij Oudenaarde",
      "3D model laten printen Oudenaarde",
    ],
    metaDescription: "Professionele 3D prints in Oudenaarde voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-bevere",
    city: "Bevere (Oudenaarde)",
    relatedPhrases: [
      "3D print service Bevere",
      "rapid prototyping Bevere",
      "3D printing bedrijf Bevere",
      "3D printen nabij Bevere",
      "3D model laten printen Bevere",
    ],
    metaDescription:
      "3D prints in Bevere nabij Koppenberg en Ronde van Vlaanderen Centrum. Snelle levering van PLA, PETG en TPU prototypes.",
  },
  {
    slug: "3d-printen-in-eine",
    city: "Eine (Oudenaarde)",
    relatedPhrases: [
      "3D print service Eine",
      "rapid prototyping Eine",
      "3D printing bedrijf Eine",
      "3D printen nabij Eine",
      "3D model laten printen Eine",
    ],
    metaDescription:
      "3D printservice in Eine bij de Schelde en NMBS-station. Prototypes en onderdelen in PLA, PETG en TPU met snelle doorlooptijd.",
  },
  {
    slug: "3d-printen-in-ename",
    city: "Ename (Oudenaarde)",
    relatedPhrases: [
      "3D print service Ename",
      "rapid prototyping Ename",
      "3D printing bedrijf Ename",
      "3D printen nabij Ename",
      "3D model laten printen Ename",
    ],
    metaDescription:
      "3D prints in Ename met verwijzing naar de abdijsite en Scheldevallei. Kies PLA, PETG of TPU voor maquettes en functionele onderdelen.",
  },
  {
    slug: "3d-printen-in-leupegem",
    city: "Leupegem (Oudenaarde)",
    relatedPhrases: [
      "3D print service Leupegem",
      "rapid prototyping Leupegem",
      "3D printing bedrijf Leupegem",
      "3D printen nabij Leupegem",
      "3D model laten printen Leupegem",
    ],
    metaDescription:
      "3D printing in Leupegem aan de Schelde en Koppenberg-route. Prototypes en kleine series in PLA, PETG en TPU.",
  },
  {
    slug: "3d-printen-in-mater",
    city: "Mater (Oudenaarde)",
    relatedPhrases: [
      "3D print service Mater",
      "rapid prototyping Mater",
      "3D printing bedrijf Mater",
      "3D printen nabij Mater",
      "3D model laten printen Mater",
    ],
    metaDescription:
      "3D prints in Mater met focus op landelijke projecten en Ronde-hellingen. Snelle offertes voor PLA, PETG en TPU.",
  },
  {
    slug: "3d-printen-in-mullem",
    city: "Mullem (Oudenaarde)",
    relatedPhrases: [
      "3D print service Mullem",
      "rapid prototyping Mullem",
      "3D printing bedrijf Mullem",
      "3D printen nabij Mullem",
      "3D model laten printen Mullem",
    ],
    metaDescription:
      "3D printen in Mullem nabij kasteel en Scheldeboorden. Prototypes en onderdelen in PLA, PETG en TPU.",
  },
  {
    slug: "3d-printen-in-nederename",
    city: "Nederename (Oudenaarde)",
    relatedPhrases: [
      "3D print service Nederename",
      "rapid prototyping Nederename",
      "3D printing bedrijf Nederename",
      "3D printen nabij Nederename",
      "3D model laten printen Nederename",
    ],
    metaDescription:
      "3D prints in Nederename met vlotte levering richting Schelde en N60. Snelle productie in PLA, PETG of TPU.",
  },
  {
    slug: "3d-printen-in-volkegem",
    city: "Volkegem (Oudenaarde)",
    relatedPhrases: [
      "3D print service Volkegem",
      "rapid prototyping Volkegem",
      "3D printing bedrijf Volkegem",
      "3D printen nabij Volkegem",
      "3D model laten printen Volkegem",
    ],
    metaDescription:
      "3D printing in Volkegem nabij Koppenberg en Vlaamse Ardennen. Prototypes en kleine series met snelle doorlooptijd.",
  },
  {
    slug: "3d-printen-in-welden",
    city: "Welden (Oudenaarde)",
    relatedPhrases: [
      "3D print service Welden",
      "rapid prototyping Welden",
      "3D printing bedrijf Welden",
      "3D printen nabij Welden",
      "3D model laten printen Welden",
    ],
    metaDescription:
      "3D prints in Welden aan de Schelde voor kmo's en makers. PLA, PETG en TPU met levering vanuit Herzele.",
  },
  {
    slug: "3d-printen-in-gentbrugge",
    city: "Gentbrugge",
    relatedPhrases: [
      "3D print service gentbrugge",
      "rapid prototyping gentbrugge",
      "3D printing bedrijf gentbrugge",
      "3D printen nabij gentbrugge",
      "3D model laten printen gentbrugge",
    ],
    metaDescription: "Professionele 3D prints in Gentbrugge voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
    servicedAreas: ["Gentbrugge centrum", "Ledeberg", "Oostakker/Gentbrugge grens", "Scheldekaai", "Afhalen Herzele"],
    sectors: ["Prototyping voor KMO's in Gentbrugge/Ledeberg", "Retail/props voor Gentbrugse wijken", "Tooling voor bedrijven langs R4/Schelde"],
  },
  {
    slug: "3d-printen-in-affligem",
    city: "Affligem",
    relatedPhrases: [
      "3D print service affligem",
      "rapid prototyping affligem",
      "3D printing bedrijf affligem",
      "3D printen nabij affligem",
      "3D model laten printen affligem",
    ],
    metaDescription: "Professionele 3D prints in Affligem voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-essene",
    city: "Essene",
    relatedPhrases: [
      "3D print service Essene",
      "rapid prototyping Essene",
      "3D printing bedrijf Essene",
      "3D printen nabij Essene",
      "3D model laten printen Essene",
    ],
    metaDescription:
      "3D prints in Essene voor projecten rond dorpskern en hoptraditie. Snelle levering in PLA, PETG of TPU.",
  },
  {
    slug: "3d-printen-in-hekelgem",
    city: "Hekelgem",
    relatedPhrases: [
      "3D print service Hekelgem",
      "rapid prototyping Hekelgem",
      "3D printing bedrijf Hekelgem",
      "3D printen nabij Hekelgem",
      "3D model laten printen Hekelgem",
    ],
    metaDescription:
      "3D printservice in Hekelgem met focus op lokale kmo's en projecten rond Molenbeekvallei. PLA, PETG en TPU met duidelijke offertes.",
  },
  {
    slug: "3d-printen-in-teralfene",
    city: "Teralfene",
    relatedPhrases: [
      "3D print service Teralfene",
      "rapid prototyping Teralfene",
      "3D printing bedrijf Teralfene",
      "3D printen nabij Teralfene",
      "3D model laten printen Teralfene",
    ],
    metaDescription:
      "3D printen in Teralfene voor dorpskern en kermis-projecten. Snelle levering van prototypes en onderdelen in PLA, PETG of TPU.",
  },
  {
    slug: "3d-printen-in-dendermonde",
    city: "Dendermonde",
    relatedPhrases: [
      "3D print service dendermonde",
      "rapid prototyping dendermonde",
      "3D printing bedrijf dendermonde",
      "3D printen nabij dendermonde",
      "3D model laten printen dendermonde",
    ],
    metaDescription: "Professionele 3D prints in Dendermonde voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
    servicedAreas: ["Dendermonde centrum", "Sint-Gillis-bij-Dendermonde", "Grembergen", "Baasrode", "Hamme", "Afhalen Herzele"],
    sectors: ["Prototyping voor KMO's in Dendermonde/Hamme", "Fixtures/tooling voor industrie rond Schelde/Dender", "Props/events voor culturele sites in Dendermonde"],
  },
  {
    slug: "3d-printen-in-haaltert",
    city: "Haaltert",
    relatedPhrases: [
      "3D print service haaltert",
      "rapid prototyping haaltert",
      "3D printing bedrijf haaltert",
      "3D printen nabij haaltert",
      "3D model laten printen haaltert",
    ],
    metaDescription: "Professionele 3D prints in Haaltert voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-lede",
    city: "Lede",
    relatedPhrases: [
      "3D print service lede",
      "rapid prototyping lede",
      "3D printing bedrijf lede",
      "3D printen nabij lede",
      "3D model laten printen lede",
    ],
    metaDescription: "Professionele 3D prints in Lede voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-lierde",
    city: "Lierde",
    relatedPhrases: [
      "3D print service lierde",
      "rapid prototyping lierde",
      "3D printing bedrijf lierde",
      "3D printen nabij lierde",
      "3D model laten printen lierde",
    ],
    metaDescription: "Professionele 3D prints in Lierde voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-merelbeke",
    city: "Merelbeke",
    relatedPhrases: [
      "3D print service merelbeke",
      "rapid prototyping merelbeke",
      "3D printing bedrijf merelbeke",
      "3D printen nabij merelbeke",
      "3D model laten printen merelbeke",
    ],
    metaDescription: "Professionele 3D prints in Merelbeke voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-sint-lievens-houtem",
    city: "Sint-Lievens-Houtem",
    relatedPhrases: [
      "3D print service sint-lievens-houtem",
      "rapid prototyping sint-lievens-houtem",
      "3D printing bedrijf sint-lievens-houtem",
      "3D printen nabij sint-lievens-houtem",
      "3D model laten printen sint-lievens-houtem",
    ],
    metaDescription: "Professionele 3D prints in Sint-Lievens-Houtem voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-wetteren",
    city: "Wetteren",
    relatedPhrases: [
      "3D print service wetteren",
      "rapid prototyping wetteren",
      "3D printing bedrijf wetteren",
      "3D printen nabij wetteren",
      "3D model laten printen wetteren",
    ],
    metaDescription: "Professionele 3D prints in Wetteren voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
    servicedAreas: ["Wetteren centrum", "Massemen", "Serskamp", "Overbeke", "Destelbergen/Wetteren grens", "Afhalen Herzele"],
    sectors: ["Chemie/lab tooling in Wetteren", "Retail/props voor Dampoort/Wetteren", "Prototyping voor KMO's in Wetteren"],
  },
  {
    slug: "3d-printen-in-brakel",
    city: "Brakel",
    relatedPhrases: [
      "3D print service brakel",
      "rapid prototyping brakel",
      "3D printing bedrijf brakel",
      "3D printen nabij brakel",
      "3D model laten printen brakel",
    ],
    metaDescription: "Professionele 3D prints in Brakel voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-michelbeke",
    city: "Michelbeke",
    relatedPhrases: [
      "3D print service Michelbeke",
      "rapid prototyping Michelbeke",
      "3D printing bedrijf Michelbeke",
      "3D printen nabij Michelbeke",
      "3D model laten printen Michelbeke",
    ],
    metaDescription:
      "3D printen in Michelbeke met focus op Valkenberg en omliggende ateliers. Snelle levering in PLA, PETG of TPU.",
  },
  {
    slug: "3d-printen-in-parike",
    city: "Parike",
    relatedPhrases: [
      "3D print service Parike",
      "rapid prototyping Parike",
      "3D printing bedrijf Parike",
      "3D printen nabij Parike",
      "3D model laten printen Parike",
    ],
    metaDescription:
      "3D prints in Parike met oog op Parikevijver en molen. Prototypes en onderdelen in PLA, PETG of TPU.",
  },
  {
    slug: "3d-printen-in-opbrakel",
    city: "Opbrakel",
    relatedPhrases: [
      "3D print service Opbrakel",
      "rapid prototyping Opbrakel",
      "3D printing bedrijf Opbrakel",
      "3D printen nabij Opbrakel",
      "3D model laten printen Opbrakel",
    ],
    metaDescription:
      "3D printen in Opbrakel voor projecten rond Brakelbos en Valkenberg. Stevige PLA, PETG en TPU leveringen.",
  },
  {
    slug: "3d-printen-in-zegelsem",
    city: "Zegelsem",
    relatedPhrases: [
      "3D print service Zegelsem",
      "rapid prototyping Zegelsem",
      "3D printing bedrijf Zegelsem",
      "3D printen nabij Zegelsem",
      "3D model laten printen Zegelsem",
    ],
    metaDescription:
      "3D print service in Zegelsem, bekend als stilste dorp. Snelle prototypes en kleine series in PLA, PETG of TPU.",
  },
  {
    slug: "3d-printen-in-elst",
    city: "Elst",
    relatedPhrases: [
      "3D print service Elst",
      "rapid prototyping Elst",
      "3D printing bedrijf Elst",
      "3D printen nabij Elst",
      "3D model laten printen Elst",
    ],
    metaDescription:
      "3D printing in Elst bij Geuzenhoek en Zwalmvallei. Prototypes en functionele onderdelen in PLA, PETG of TPU.",
  },
  {
    slug: "3d-printen-in-everbeek",
    city: "Everbeek",
    relatedPhrases: [
      "3D print service Everbeek",
      "rapid prototyping Everbeek",
      "3D printing bedrijf Everbeek",
      "3D printen nabij Everbeek",
      "3D model laten printen Everbeek",
    ],
    metaDescription:
      "3D prints in Everbeek-Beneden en Everbeek-Boven met focus op Brakelbos. Stevige onderdelen in PLA, PETG of TPU.",
  },
  {
    slug: "3d-printen-in-nederbrakel",
    city: "Nederbrakel",
    relatedPhrases: [
      "3D print service Nederbrakel",
      "rapid prototyping Nederbrakel",
      "3D printing bedrijf Nederbrakel",
      "3D printen nabij Nederbrakel",
      "3D model laten printen Nederbrakel",
    ],
    metaDescription:
      "3D printen in Nederbrakel met centrale ligging voor Brakel centrum en omliggende deelgemeenten. Snelle levering in PLA, PETG of TPU.",
  },
  {
    slug: "3d-printen-in-gent",
    city: "Gent",
    relatedPhrases: [
      "3D print service gent",
      "rapid prototyping gent",
      "3D printing bedrijf gent",
      "3D printen nabij gent",
      "3D model laten printen gent",
    ],
    metaDescription: "Professionele 3D prints in Gent voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
    servicedAreas: ["Gent centrum", "Zwijnaarde", "Destelbergen", "Merelbeke", "Drongen", "Gent Zeehaven", "Afhalen Herzele"],
    sectors: [
      "Prototyping voor start-ups (Tech Lane Zwijnaarde)",
      "Tooling/fixtures voor maakbedrijven in Gent Zeehaven",
      "Props en displays voor musea/cultuurhuizen in Gent",
      "Onderwijs en labs (UGent, hogescholen) in Gent",
    ],
  },
  {
    slug: "3d-printen-in-deinze",
    city: "Deinze",
    relatedPhrases: [
      "3D print service Deinze",
      "rapid prototyping Deinze",
      "3D printing bedrijf Deinze",
      "3D printen nabij Deinze",
      "3D model laten printen Deinze",
    ],
    metaDescription:
      "Professionele 3D prints in Deinze langs de Leie en De Prijkels. Snelle levering van prototypes en kleine series in PLA, PETG of TPU.",
  },
  {
    slug: "3d-printen-in-erwetegem",
    city: "Erwetegem",
    relatedPhrases: [
      "3D print service erwetegem",
      "rapid prototyping erwetegem",
      "3D printing bedrijf erwetegem",
      "3D printen nabij erwetegem",
      "3D model laten printen erwetegem",
    ],
    metaDescription: "Professionele 3D prints in Erwetegem voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-elene",
    city: "Elene",
    relatedPhrases: [
      "3D print service elene",
      "rapid prototyping elene",
      "3D printing bedrijf elene",
      "3D printen nabij elene",
      "3D model laten printen elene",
    ],
    metaDescription: "Professionele 3D prints in Elene voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-godveerdegem",
    city: "Godveerdegem",
    relatedPhrases: [
      "3D print service godveerdegem",
      "rapid prototyping godveerdegem",
      "3D printing bedrijf godveerdegem",
      "3D printen nabij godveerdegem",
      "3D model laten printen godveerdegem",
    ],
    metaDescription: "Professionele 3D prints in Godveerdegem voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-grotenberge",
    city: "Grotenberge",
    relatedPhrases: [
      "3D print service grotenberge",
      "rapid prototyping grotenberge",
      "3D printing bedrijf grotenberge",
      "3D printen nabij grotenberge",
      "3D model laten printen grotenberge",
    ],
    metaDescription: "Professionele 3D prints in Grotenberge voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-leeuwergem",
    city: "Leeuwergem",
    relatedPhrases: [
      "3D print service leeuwergem",
      "rapid prototyping leeuwergem",
      "3D printing bedrijf leeuwergem",
      "3D printen nabij leeuwergem",
      "3D model laten printen leeuwergem",
    ],
    metaDescription: "Professionele 3D prints in Leeuwergem voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-oombergen",
    city: "Oombergen",
    relatedPhrases: [
      "3D print service oombergen",
      "rapid prototyping oombergen",
      "3D printing bedrijf oombergen",
      "3D printen nabij oombergen",
      "3D model laten printen oombergen",
    ],
    metaDescription: "Professionele 3D prints in Oombergen voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-sint-goriks-oudenhove",
    city: "Sint-Goriks-Oudenhove",
    relatedPhrases: [
      "3D print service sint-goriks-oudenhove",
      "rapid prototyping sint-goriks-oudenhove",
      "3D printing bedrijf sint-goriks-oudenhove",
      "3D printen nabij sint-goriks-oudenhove",
      "3D model laten printen sint-goriks-oudenhove",
    ],
    metaDescription: "Professionele 3D prints in Sint-Goriks-Oudenhove voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-sint-maria-oudenhove",
    city: "Sint-Maria-Oudenhove",
    relatedPhrases: [
      "3D print service sint-maria-oudenhove",
      "rapid prototyping sint-maria-oudenhove",
      "3D printing bedrijf sint-maria-oudenhove",
      "3D printen nabij sint-maria-oudenhove",
      "3D model laten printen sint-maria-oudenhove",
    ],
    metaDescription: "Professionele 3D prints in Sint-Maria-Oudenhove voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-strijpen",
    city: "Strijpen",
    relatedPhrases: [
      "3D print service strijpen",
      "rapid prototyping strijpen",
      "3D printing bedrijf strijpen",
      "3D printen nabij strijpen",
      "3D model laten printen strijpen",
    ],
    metaDescription: "Professionele 3D prints in Strijpen voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-velzeke-ruddershove",
    city: "Velzeke-Ruddershove",
    relatedPhrases: [
      "3D print service velzeke-ruddershove",
      "rapid prototyping velzeke-ruddershove",
      "3D printing bedrijf velzeke-ruddershove",
      "3D printen nabij velzeke-ruddershove",
      "3D model laten printen velzeke-ruddershove",
    ],
    metaDescription: "Professionele 3D prints in Velzeke-Ruddershove voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-baardegem",
    city: "Baardegem",
    relatedPhrases: [
      "3D print service baardegem",
      "rapid prototyping baardegem",
      "3D printing bedrijf baardegem",
      "3D printen nabij baardegem",
      "3D model laten printen baardegem",
    ],
    metaDescription: "Professionele 3D prints in Baardegem voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-erembodegem",
    city: "Erembodegem",
    relatedPhrases: [
      "3D print service erembodegem",
      "rapid prototyping erembodegem",
      "3D printing bedrijf erembodegem",
      "3D printen nabij erembodegem",
      "3D model laten printen erembodegem",
    ],
    metaDescription: "Professionele 3D prints in Erembodegem voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-gijzegem",
    city: "Gijzegem",
    relatedPhrases: [
      "3D print service gijzegem",
      "rapid prototyping gijzegem",
      "3D printing bedrijf gijzegem",
      "3D printen nabij gijzegem",
      "3D model laten printen gijzegem",
    ],
    metaDescription: "Professionele 3D prints in Gijzegem voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-herdersem",
    city: "Herdersem",
    relatedPhrases: [
      "3D print service herdersem",
      "rapid prototyping herdersem",
      "3D printing bedrijf herdersem",
      "3D printen nabij herdersem",
      "3D model laten printen herdersem",
    ],
    metaDescription: "Professionele 3D prints in Herdersem voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-hofstade",
    city: "Hofstade",
    relatedPhrases: [
      "3D print service hofstade",
      "rapid prototyping hofstade",
      "3D printing bedrijf hofstade",
      "3D printen nabij hofstade",
      "3D model laten printen hofstade",
    ],
    metaDescription: "Professionele 3D prints in Hofstade voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-meldert",
    city: "Meldert",
    relatedPhrases: [
      "3D print service meldert",
      "rapid prototyping meldert",
      "3D printing bedrijf meldert",
      "3D printen nabij meldert",
      "3D model laten printen meldert",
    ],
    metaDescription: "Professionele 3D prints in Meldert voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-moorsel",
    city: "Moorsel",
    relatedPhrases: [
      "3D print service moorsel",
      "rapid prototyping moorsel",
      "3D printing bedrijf moorsel",
      "3D printen nabij moorsel",
      "3D model laten printen moorsel",
    ],
    metaDescription: "Professionele 3D prints in Moorsel voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-nieuwerkerken",
    city: "Nieuwerkerken",
    relatedPhrases: [
      "3D print service nieuwerkerken",
      "rapid prototyping nieuwerkerken",
      "3D printing bedrijf nieuwerkerken",
      "3D printen nabij nieuwerkerken",
      "3D model laten printen nieuwerkerken",
    ],
    metaDescription: "Professionele 3D prints in Nieuwerkerken voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-ninove",
    city: "Ninove",
    relatedPhrases: [
      "3D print service Ninove",
      "rapid prototyping Ninove",
      "3D printing bedrijf Ninove",
      "3D printen nabij Ninove",
      "3D model laten printen Ninove",
    ],
    metaDescription: "Professionele 3D prints in Ninove voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-appelterre-eichem",
    city: "Appelterre-Eichem",
    relatedPhrases: [
      "3D print service Appelterre-Eichem",
      "rapid prototyping Appelterre-Eichem",
      "3D printing bedrijf Appelterre-Eichem",
      "3D printen nabij Appelterre-Eichem",
      "3D model laten printen Appelterre-Eichem",
    ],
    metaDescription: "Professionele 3D prints in Appelterre-Eichem voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-aspelare",
    city: "Aspelare",
    relatedPhrases: [
      "3D print service Aspelare",
      "rapid prototyping Aspelare",
      "3D printing bedrijf Aspelare",
      "3D printen nabij Aspelare",
      "3D model laten printen Aspelare",
    ],
    metaDescription: "Professionele 3D prints in Aspelare voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-denderwindeke",
    city: "Denderwindeke",
    relatedPhrases: [
      "3D print service Denderwindeke",
      "rapid prototyping Denderwindeke",
      "3D printing bedrijf Denderwindeke",
      "3D printen nabij Denderwindeke",
      "3D model laten printen Denderwindeke",
    ],
    metaDescription: "Professionele 3D prints in Denderwindeke voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-lieferinge",
    city: "Lieferinge",
    relatedPhrases: [
      "3D print service Lieferinge",
      "rapid prototyping Lieferinge",
      "3D printing bedrijf Lieferinge",
      "3D printen nabij Lieferinge",
      "3D model laten printen Lieferinge",
    ],
    metaDescription: "Professionele 3D prints in Lieferinge voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-meerbeke",
    city: "Meerbeke",
    relatedPhrases: [
      "3D print service Meerbeke",
      "rapid prototyping Meerbeke",
      "3D printing bedrijf Meerbeke",
      "3D printen nabij Meerbeke",
      "3D model laten printen Meerbeke",
    ],
    metaDescription: "Professionele 3D prints in Meerbeke voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-nederhasselt",
    city: "Nederhasselt",
    relatedPhrases: [
      "3D print service Nederhasselt",
      "rapid prototyping Nederhasselt",
      "3D printing bedrijf Nederhasselt",
      "3D printen nabij Nederhasselt",
      "3D model laten printen Nederhasselt",
    ],
    metaDescription: "Professionele 3D prints in Nederhasselt voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-neigem",
    city: "Neigem",
    relatedPhrases: [
      "3D print service Neigem",
      "rapid prototyping Neigem",
      "3D printing bedrijf Neigem",
      "3D printen nabij Neigem",
      "3D model laten printen Neigem",
    ],
    metaDescription: "Professionele 3D prints in Neigem voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-okegem",
    city: "Okegem",
    relatedPhrases: [
      "3D print service Okegem",
      "rapid prototyping Okegem",
      "3D printing bedrijf Okegem",
      "3D printen nabij Okegem",
      "3D model laten printen Okegem",
    ],
    metaDescription: "Professionele 3D prints in Okegem voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-outer",
    city: "Outer",
    relatedPhrases: [
      "3D print service Outer",
      "rapid prototyping Outer",
      "3D printing bedrijf Outer",
      "3D printen nabij Outer",
      "3D model laten printen Outer",
    ],
    metaDescription: "Professionele 3D prints in Outer voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-pollare",
    city: "Pollare",
    relatedPhrases: [
      "3D print service Pollare",
      "rapid prototyping Pollare",
      "3D printing bedrijf Pollare",
      "3D printen nabij Pollare",
      "3D model laten printen Pollare",
    ],
    metaDescription: "Professionele 3D prints in Pollare voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-voorde",
    city: "Voorde",
    relatedPhrases: [
      "3D print service Voorde",
      "rapid prototyping Voorde",
      "3D printing bedrijf Voorde",
      "3D printen nabij Voorde",
      "3D model laten printen Voorde",
    ],
    metaDescription: "Professionele 3D prints in Voorde voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-appels",
    city: "Appels",
    relatedPhrases: [
      "3D print service appels",
      "rapid prototyping appels",
      "3D printing bedrijf appels",
      "3D printen nabij appels",
      "3D model laten printen appels",
    ],
    metaDescription: "Professionele 3D prints in Appels voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-baasrode",
    city: "Baasrode",
    relatedPhrases: [
      "3D print service baasrode",
      "rapid prototyping baasrode",
      "3D printing bedrijf baasrode",
      "3D printen nabij baasrode",
      "3D model laten printen baasrode",
    ],
    metaDescription: "Professionele 3D prints in Baasrode voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-grembergen",
    city: "Grembergen",
    relatedPhrases: [
      "3D print service grembergen",
      "rapid prototyping grembergen",
      "3D printing bedrijf grembergen",
      "3D printen nabij grembergen",
      "3D model laten printen grembergen",
    ],
    metaDescription: "Professionele 3D prints in Grembergen voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-mespelare",
    city: "Mespelare",
    relatedPhrases: [
      "3D print service mespelare",
      "rapid prototyping mespelare",
      "3D printing bedrijf mespelare",
      "3D printen nabij mespelare",
      "3D model laten printen mespelare",
    ],
    metaDescription: "Professionele 3D prints in Mespelare voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-oudegem",
    city: "Oudegem",
    relatedPhrases: [
      "3D print service oudegem",
      "rapid prototyping oudegem",
      "3D printing bedrijf oudegem",
      "3D printen nabij oudegem",
      "3D model laten printen oudegem",
    ],
    metaDescription: "Professionele 3D prints in Oudegem voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-schoonaarde",
    city: "Schoonaarde",
    relatedPhrases: [
      "3D print service schoonaarde",
      "rapid prototyping schoonaarde",
      "3D printing bedrijf schoonaarde",
      "3D printen nabij schoonaarde",
      "3D model laten printen schoonaarde",
    ],
    metaDescription: "Professionele 3D prints in Schoonaarde voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-sint-gillis-dendermonde",
    city: "Sint-Gillis-Dendermonde",
    relatedPhrases: [
      "3D print service sint-gillis-dendermonde",
      "rapid prototyping sint-gillis-dendermonde",
      "3D printing bedrijf sint-gillis-dendermonde",
      "3D printen nabij sint-gillis-dendermonde",
      "3D model laten printen sint-gillis-dendermonde",
    ],
    metaDescription: "Professionele 3D prints in Sint-Gillis-Dendermonde voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-desteldonk",
    city: "Desteldonk",
    relatedPhrases: [
      "3D print service desteldonk",
      "rapid prototyping desteldonk",
      "3D printing bedrijf desteldonk",
      "3D printen nabij desteldonk",
      "3D model laten printen desteldonk",
    ],
    metaDescription: "Professionele 3D prints in Desteldonk voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-drongen",
    city: "Drongen",
    relatedPhrases: [
      "3D print service drongen",
      "rapid prototyping drongen",
      "3D printing bedrijf drongen",
      "3D printen nabij drongen",
      "3D model laten printen drongen",
    ],
    metaDescription: "Professionele 3D prints in Drongen voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-ledeberg",
    city: "Ledeberg",
    relatedPhrases: [
      "3D print service ledeberg",
      "rapid prototyping ledeberg",
      "3D printing bedrijf ledeberg",
      "3D printen nabij ledeberg",
      "3D model laten printen ledeberg",
    ],
    metaDescription: "Professionele 3D prints in Ledeberg voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-mariakerke",
    city: "Mariakerke",
    relatedPhrases: [
      "3D print service mariakerke",
      "rapid prototyping mariakerke",
      "3D printing bedrijf mariakerke",
      "3D printen nabij mariakerke",
      "3D model laten printen mariakerke",
    ],
    metaDescription: "Professionele 3D prints in Mariakerke voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-mendonk",
    city: "Mendonk",
    relatedPhrases: [
      "3D print service mendonk",
      "rapid prototyping mendonk",
      "3D printing bedrijf mendonk",
      "3D printen nabij mendonk",
      "3D model laten printen mendonk",
    ],
    metaDescription: "Professionele 3D prints in Mendonk voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-oostakker",
    city: "Oostakker",
    relatedPhrases: [
      "3D print service oostakker",
      "rapid prototyping oostakker",
      "3D printing bedrijf oostakker",
      "3D printen nabij oostakker",
      "3D model laten printen oostakker",
    ],
    metaDescription: "Professionele 3D prints in Oostakker voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-sint-amandsberg",
    city: "Sint-Amandsberg",
    relatedPhrases: [
      "3D print service sint-amandsberg",
      "rapid prototyping sint-amandsberg",
      "3D printing bedrijf sint-amandsberg",
      "3D printen nabij sint-amandsberg",
      "3D model laten printen sint-amandsberg",
    ],
    metaDescription: "Professionele 3D prints in Sint-Amandsberg voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-sint-kruis-winkel",
    city: "Sint-Kruis-Winkel",
    relatedPhrases: [
      "3D print service sint-kruis-winkel",
      "rapid prototyping sint-kruis-winkel",
      "3D printing bedrijf sint-kruis-winkel",
      "3D printen nabij sint-kruis-winkel",
      "3D model laten printen sint-kruis-winkel",
    ],
    metaDescription: "Professionele 3D prints in Sint-Kruis-Winkel voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-sint-denijs-westrem",
    city: "Sint-Denijs-Westrem",
    relatedPhrases: [
      "3D print service sint-denijs-westrem",
      "rapid prototyping sint-denijs-westrem",
      "3D printing bedrijf sint-denijs-westrem",
      "3D printen nabij sint-denijs-westrem",
      "3D model laten printen sint-denijs-westrem",
    ],
    metaDescription: "Professionele 3D prints in Sint-Denijs-Westrem voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-wondelgem",
    city: "Wondelgem",
    relatedPhrases: [
      "3D print service wondelgem",
      "rapid prototyping wondelgem",
      "3D printing bedrijf wondelgem",
      "3D printen nabij wondelgem",
      "3D model laten printen wondelgem",
    ],
    metaDescription: "Professionele 3D prints in Wondelgem voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-zwijnaarde",
    city: "Zwijnaarde",
    relatedPhrases: [
      "3D print service zwijnaarde",
      "rapid prototyping zwijnaarde",
      "3D printing bedrijf zwijnaarde",
      "3D printen nabij zwijnaarde",
      "3D model laten printen zwijnaarde",
    ],
    metaDescription: "Professionele 3D prints in Zwijnaarde voor prototypes, mallen en functionele onderdelen. Upload je model en ontvang snel een offerte bij X3DPrints.",
  },
  {
    slug: "3d-printen-in-asse",
    city: "Asse",
    relatedPhrases: [
      "3D print service Asse",
      "rapid prototyping Asse",
      "3D printing bedrijf Asse",
      "3D printen nabij Asse",
      "3D model laten printen Asse",
    ],
    metaDescription:
      "3D printen in Asse voor bedrijven rond de Markt, industriezone Mollem en stationsomgeving. Snelle levering van PLA, PETG en TPU.",
  },
  {
    slug: "3d-printen-in-zellik",
    city: "Zellik",
    relatedPhrases: [
      "3D print service Zellik",
      "rapid prototyping Zellik",
      "3D printing bedrijf Zellik",
      "3D printen nabij Zellik",
      "3D model laten printen Zellik",
    ],
    metaDescription:
      "3D prints in Zellik voor bedrijven langs E40/R0 en bedrijventerrein Researchpark. PLA, PETG en TPU met snelle offerte.",
  },
  {
    slug: "3d-printen-in-mollem",
    city: "Mollem",
    relatedPhrases: [
      "3D print service Mollem",
      "rapid prototyping Mollem",
      "3D printing bedrijf Mollem",
      "3D printen nabij Mollem",
      "3D model laten printen Mollem",
    ],
    metaDescription:
      "3D printservice in Mollem met focus op KMO-zones en projecten rond Warandepark. Snelle levering in PLA, PETG of TPU.",
  },
  {
    slug: "3d-printen-in-kobbegem",
    city: "Kobbegem",
    relatedPhrases: [
      "3D print service Kobbegem",
      "rapid prototyping Kobbegem",
      "3D printing bedrijf Kobbegem",
      "3D printen nabij Kobbegem",
      "3D model laten printen Kobbegem",
    ],
    metaDescription:
      "3D prints in Kobbegem, bekend van de brouwerijsite. PLA, PETG en TPU voor prototypes, vervangstukken en displays.",
  },
  {
    slug: "3d-printen-in-relegem",
    city: "Relegem",
    relatedPhrases: [
      "3D print service Relegem",
      "rapid prototyping Relegem",
      "3D printing bedrijf Relegem",
      "3D printen nabij Relegem",
      "3D model laten printen Relegem",
    ],
    metaDescription:
      "3D printing in Relegem met leveringen richting R0 en landbouwbedrijven. PLA, PETG of TPU met duidelijke prijzen.",
  },
  {
    slug: "3d-printen-in-bekkerzeel",
    city: "Bekkerzeel",
    relatedPhrases: [
      "3D print service Bekkerzeel",
      "rapid prototyping Bekkerzeel",
      "3D printing bedrijf Bekkerzeel",
      "3D printen nabij Bekkerzeel",
      "3D model laten printen Bekkerzeel",
    ],
    metaDescription:
      "3D prints in Bekkerzeel voor projecten langs de R0 en lokale KMO zones. PLA, PETG en TPU met korte doorlooptijd.",
  },
  {
    slug: "3d-printen-in-ternat",
    city: "Ternat",
    relatedPhrases: [
      "3D print service Ternat",
      "rapid prototyping Ternat",
      "3D printing bedrijf Ternat",
      "3D printen nabij Ternat",
      "3D model laten printen Ternat",
    ],
    metaDescription:
      "3D printen in Ternat voor projecten rond station, industriezone en Kasteel Kruikenburg. Snelle levering van PLA, PETG en TPU.",
  },
  {
    slug: "3d-printen-in-sint-katherina-lombeek",
    city: "Sint-Katherina-Lombeek",
    relatedPhrases: [
      "3D print service Sint-Katherina-Lombeek",
      "rapid prototyping Sint-Katherina-Lombeek",
      "3D printing bedrijf Sint-Katherina-Lombeek",
      "3D printen nabij Sint-Katherina-Lombeek",
      "3D model laten printen Sint-Katherina-Lombeek",
    ],
    metaDescription:
      "3D prints in Sint-Katherina-Lombeek voor lokale bedrijven en makers. Levering in PLA, PETG of TPU met duidelijke prijzen.",
  },
  {
    slug: "3d-printen-in-wambeek",
    city: "Wambeek",
    relatedPhrases: [
      "3D print service Wambeek",
      "rapid prototyping Wambeek",
      "3D printing bedrijf Wambeek",
      "3D printen nabij Wambeek",
      "3D model laten printen Wambeek",
    ],
    metaDescription:
      "3D printservice in Wambeek nabij landelijke assen en lokale kmos. Snelle levering in PLA, PETG en TPU.",
  },
  {
    slug: "3d-printen-in-maldegem",
    city: "Maldegem",
    relatedPhrases: [
      "3D print service Maldegem",
      "rapid prototyping Maldegem",
      "3D printing bedrijf Maldegem",
      "3D printen nabij Maldegem",
      "3D model laten printen Maldegem",
    ],
    metaDescription:
      "3D printen in Maldegem met levering richting Stoomcentrum en Drongengoed. PLA, PETG en TPU voor prototypes, displays en onderdelen.",
  },
  {
    slug: "3d-printen-in-adegem",
    city: "Adegem",
    relatedPhrases: [
      "3D print service Adegem",
      "rapid prototyping Adegem",
      "3D printing bedrijf Adegem",
      "3D printen nabij Adegem",
      "3D model laten printen Adegem",
    ],
    metaDescription:
      "Professionele 3D prints in Adegem nabij het Canada War Cemetery en N49. Snelle offertes voor PLA, PETG en TPU.",
  },
  {
    slug: "3d-printen-in-kleit",
    city: "Kleit",
    relatedPhrases: [
      "3D print service Kleit",
      "rapid prototyping Kleit",
      "3D printing bedrijf Kleit",
      "3D printen nabij Kleit",
      "3D model laten printen Kleit",
    ],
    metaDescription:
      "3D printen in Kleit met focus op polderprojecten en landbouwmachines. PLA, PETG en TPU met levering vanuit Herzele.",
  },
  {
    slug: "3d-printen-in-kruisem",
    city: "Kruisem",
    relatedPhrases: [
      "3D print service Kruisem",
      "rapid prototyping Kruisem",
      "3D printing bedrijf Kruisem",
      "3D printen nabij Kruisem",
      "3D model laten printen Kruisem",
    ],
    metaDescription:
      "3D printen in Kruisem met levering langs E17 en Vlaamse Ardennen. Snelle prototypes en onderdelen in PLA, PETG en TPU.",
  },
  {
    slug: "3d-printen-in-kruishoutem",
    city: "Kruishoutem",
    relatedPhrases: [
      "3D print service Kruishoutem",
      "rapid prototyping Kruishoutem",
      "3D printing bedrijf Kruishoutem",
      "3D printen nabij Kruishoutem",
      "3D model laten printen Kruishoutem",
    ],
    metaDescription:
      "3D prints in Kruishoutem richting Lozerkasteel en E17. Prototypes en kleine series in PLA, PETG of TPU met snelle offertes.",
  },
  {
    slug: "3d-printen-in-nokere",
    city: "Nokere",
    relatedPhrases: [
      "3D print service Nokere",
      "rapid prototyping Nokere",
      "3D printing bedrijf Nokere",
      "3D printen nabij Nokereberg",
      "3D model laten printen Nokere",
    ],
    metaDescription:
      "3D printing in Nokere met knipoog naar Nokereberg en koersprojecten. Sterke PLA, PETG en TPU onderdelen snel geleverd.",
  },
  {
    slug: "3d-printen-in-wannegem-lede",
    city: "Wannegem-Lede",
    relatedPhrases: [
      "3D print service Wannegem-Lede",
      "rapid prototyping Wannegem-Lede",
      "3D printing bedrijf Wannegem-Lede",
      "3D printen nabij Wannegem-Lede",
      "3D model laten printen Wannegem-Lede",
    ],
    metaDescription:
      "3D prints in Wannegem-Lede voor landelijke projecten en KMO's. Snelle levering in PLA, PETG en TPU.",
  },
  {
    slug: "3d-printen-in-zingem",
    city: "Zingem",
    relatedPhrases: [
      "3D print service Zingem",
      "rapid prototyping Zingem",
      "3D printing bedrijf Zingem",
      "3D printen nabij Zingem",
      "3D model laten printen Zingem",
    ],
    metaDescription:
      "3D printservice in Zingem langs de Schelde en RAVeL. Prototypes, fixtures en displays in PLA, PETG of TPU.",
  },
  {
    slug: "3d-printen-in-ouwegem",
    city: "Ouwegem",
    relatedPhrases: [
      "3D print service Ouwegem",
      "rapid prototyping Ouwegem",
      "3D printing bedrijf Ouwegem",
      "3D printen nabij Ouwegem",
      "3D model laten printen Ouwegem",
    ],
    metaDescription:
      "3D printing in Ouwegem met levering richting kerk en Scheldevallei. PLA, PETG en TPU voor prototypes en vervangstukken.",
  },
  {
    slug: "3d-printen-in-huise",
    city: "Huise",
    relatedPhrases: [
      "3D print service Huise",
      "rapid prototyping Huise",
      "3D printing bedrijf Huise",
      "3D printen nabij Huise",
      "3D model laten printen Huise",
    ],
    metaDescription:
      "3D prints in Huise met focus op landelijke projecten en ambacht. Prototypes en kleine series in PLA, PETG en TPU.",
  },
  {
    slug: "3d-printen-in-lozer",
    city: "Lozer",
    relatedPhrases: [
      "3D print service Lozer",
      "rapid prototyping Lozer",
      "3D printing bedrijf Lozer",
      "3D printen nabij Lozer",
      "3D model laten printen Lozer",
    ],
    metaDescription:
      "3D printen in Lozer nabij kasteeldomein en dreven. Snelle levering van PLA, PETG en TPU onderdelen.",
  },
  {
    slug: "3d-printen-in-sint-martens-latem",
    city: "Sint-Martens-Latem",
    relatedPhrases: [
      "3D print service Sint-Martens-Latem",
      "rapid prototyping Sint-Martens-Latem",
      "3D printing bedrijf Sint-Martens-Latem",
      "3D printen nabij Latemse Meersen",
      "3D model laten printen Sint-Martens-Latem",
    ],
    metaDescription:
      "3D printen in Sint-Martens-Latem voor kunst, design en kmo's langs de Leie. PLA, PETG en TPU met snelle levering.",
  },
  {
    slug: "3d-printen-in-deurle",
    city: "Deurle (Sint-Martens-Latem)",
    relatedPhrases: [
      "3D print service Deurle",
      "rapid prototyping Deurle",
      "3D printing bedrijf Deurle",
      "3D printen nabij Deurle",
      "3D model laten printen Deurle",
    ],
    metaDescription:
      "3D prints in Deurle nabij de Leie en museum Dhondt-Dhaenens. Ideaal voor maquettes, designprops en functionele onderdelen.",
  },
  {
    slug: "3d-printen-in-middelburg-maldegem",
    city: "Middelburg (Maldegem)",
    relatedPhrases: [
      "3D print service Middelburg",
      "rapid prototyping Middelburg Maldegem",
      "3D printing bedrijf Middelburg",
      "3D printen nabij Middelburg Maldegem",
      "3D model laten printen Middelburg Maldegem",
    ],
    metaDescription:
      "3D prints in Middelburg (Maldegem) vlak bij Krommewege en industriezone. Prototypes en kleine series in PLA, PETG en TPU.",
  },
  {
    slug: "3d-printen-in-avekapelle",
    city: "Avekapelle",
    relatedPhrases: [
      "3D print service Avekapelle",
      "rapid prototyping Avekapelle",
      "3D printing bedrijf Avekapelle",
      "3D printen nabij Avekapelle",
      "3D model laten printen Avekapelle",
    ],
    metaDescription:
      "3D print service voor Avekapelle en de Viconia Kleiputten: PLA, PETG en TPU voor natuur, landbouw en retail met snelle levering.",
    servicedAreas: [
      "Avekapelle dorpskern",
      "Viconia Kleiputten",
      "Lovaart en omliggende hoeves",
      "Rand Veurne en Koksijde",
      "Afhalen Provincieweg 34a, 9552 Herzele",
    ],
    sectors: [
      "Natuur- en educatieprojecten rond Viconia",
      "Landbouw en hoeveverkoop tussen Veurne en Koksijde",
      "Creatieve zelfstandigen en retail in Avekapelle",
    ],
  },
  {
    slug: "3d-printen-in-booitshoeke",
    city: "Booitshoeke",
    relatedPhrases: [
      "3D print service Booitshoeke",
      "rapid prototyping Booitshoeke",
      "3D printing bedrijf Booitshoeke",
      "3D printen nabij Booitshoeke",
      "3D model laten printen Booitshoeke",
    ],
    metaDescription:
      "3D prints voor Booitshoeke en de polderbedrijven langs de Lovaart. Functionele onderdelen en zichtwerk in PLA, PETG of TPU.",
    servicedAreas: [
      "Booitshoeke dorpskern",
      "Lovaart en polderbedrijven",
      "Fintele en De Moeren route",
      "Veurne en Alveringem rand",
      "Afhalen Provincieweg 34a, 9552 Herzele",
    ],
    sectors: [
      "Landbouwmechanisatie en irrigatie",
      "Streekproducten en hoevewinkels",
      "Toerisme en wandelroutes rond Booitshoeke",
    ],
  },
  {
    slug: "3d-printen-in-bulskamp",
    city: "Bulskamp",
    relatedPhrases: [
      "3D print service Bulskamp",
      "rapid prototyping Bulskamp",
      "3D printing bedrijf Bulskamp",
      "3D printen nabij Bulskamp",
      "3D model laten printen Bulskamp",
    ],
    metaDescription:
      "3D print service voor Bulskamp, tussen Veurne en Lo-Reninge. Kies PLA, PETG of TPU voor landbouw, toerisme en techniek.",
    servicedAreas: [
      "Bulskamp dorpskern",
      "Kanaal Nieuwpoort-Duinkerke",
      "Lo-Reninge en Veurne rand",
      "Polderbedrijven richting Houtem",
      "Afhalen Provincieweg 34a, 9552 Herzele",
    ],
    sectors: [
      "Landbouw en irrigatieprojecten in de polders",
      "Toerisme en erfgoed rond Lo en kanaalzone",
      "Techniek en onderhoud voor lokale KMO's",
    ],
  },
  {
    slug: "3d-printen-in-de-moeren",
    city: "De Moeren",
    relatedPhrases: [
      "3D print service De Moeren",
      "rapid prototyping De Moeren",
      "3D printing bedrijf De Moeren",
      "3D printen nabij De Moeren",
      "3D model laten printen De Moeren",
    ],
    metaDescription:
      "3D prints voor De Moeren met focus op outdoor onderdelen en sensorkasten. PETG en TPU die bestand zijn tegen wind en vocht.",
    servicedAreas: [
      "De Moeren laagte",
      "Grens Frankrijk",
      "Adinkerke en De Panne rand",
      "Landbouwbedrijven langs de plassen",
      "Afhalen Provincieweg 34a, 9552 Herzele",
    ],
    sectors: [
      "Waterbeheer en sensing in de polders",
      "Landbouw en tuinbouw in De Moeren",
      "Outdoor en toeristische projecten richting kust",
    ],
  },
  {
    slug: "3d-printen-in-eggewaartskapelle",
    city: "Eggewaartskapelle",
    relatedPhrases: [
      "3D print service Eggewaartskapelle",
      "rapid prototyping Eggewaartskapelle",
      "3D printing bedrijf Eggewaartskapelle",
      "3D printen nabij Eggewaartskapelle",
      "3D model laten printen Eggewaartskapelle",
    ],
    metaDescription:
      "3D printen in Eggewaartskapelle voor erfgoed, landbouw en verenigingen. Snelle levering van PLA, PETG en TPU onderdelen.",
    servicedAreas: [
      "Eggewaartskapelle dorpskom",
      "Vaubanrand Veurne",
      "Lampernisse en polders",
      "Avekapelle en Steenkerke",
      "Afhalen Provincieweg 34a, 9552 Herzele",
    ],
    sectors: [
      "Erfgoed- en kerkprojecten rond de dorpskern",
      "Landbouw en maatwerk voor hoeves",
      "Lokale verenigingen en evenementen",
    ],
  },
  {
    slug: "3d-printen-in-houtem",
    city: "Houtem (Veurne)",
    relatedPhrases: [
      "3D print service Houtem Veurne",
      "rapid prototyping Houtem Veurne",
      "3D printing bedrijf Houtem Veurne",
      "3D printen nabij Houtem",
      "3D model laten printen Houtem",
    ],
    metaDescription:
      "3D prints voor Houtem bij Veurne: tooling voor defensie, installateurs en landbouw. PLA, PETG en TPU met korte doorlooptijd.",
    servicedAreas: [
      "Houtem dorpskern",
      "Militaire site en logistiek kwartier",
      "Veurne I en II bedrijventerreinen",
      "N355 richting De Moeren",
      "Afhalen Provincieweg 34a, 9552 Herzele",
    ],
    sectors: [
      "Defensie en logistieke ondersteuning",
      "Installateurs en KMO's langs Veurne I-II",
      "Landbouw en outdoor toepassingen",
    ],
  },
  {
    slug: "3d-printen-in-steenkerke",
    city: "Steenkerke",
    relatedPhrases: [
      "3D print service Steenkerke",
      "rapid prototyping Steenkerke",
      "3D printing bedrijf Steenkerke",
      "3D printen nabij Steenkerke",
      "3D model laten printen Steenkerke",
    ],
    metaDescription:
      "3D print service Steenkerke voor erfgoed, landbouw en toerisme rond de Lovaart. Kies PLA, PETG of TPU met persoonlijke begeleiding.",
    servicedAreas: [
      "Steenkerke dorpskern",
      "Lovaart en Fintele",
      "IJzervlakte",
      "Veurne en Lo-Reninge",
      "Afhalen Provincieweg 34a, 9552 Herzele",
    ],
    sectors: [
      "Erfgoed- en WOI-projecten",
      "Landbouw en mechanisatie",
      "Toerisme en wandelroutes rond Steenkerke",
    ],
  },
  {
    slug: "3d-printen-in-veurne",
    city: "Veurne",
    relatedPhrases: [
      "3D print service Veurne",
      "rapid prototyping Veurne",
      "3D printing bedrijf Veurne",
      "3D printen kustregio Veurne",
      "3D model laten printen Veurne",
    ],
    metaDescription:
      "3D print service voor Veurne: prototypes, zichtwerk en functionele onderdelen voor toerisme, industrie en landbouw. Snelle levering vanuit Herzele.",
    servicedAreas: [
      "Grote Markt en Vaubanvesten",
      "Veurne I en II bedrijventerreinen",
      "Koksijde en De Panne corridor",
      "De Moeren en polders",
      "Afhalen Provincieweg 34a, 9552 Herzele",
    ],
    sectors: [
      "Toerisme en musea rond Grote Markt en Vauban",
      "Landbouw en foodbedrijven in Veurne-Ambacht",
      "Retail en events langs de E40 en kust",
    ],
  },
  {
    slug: "3d-printen-in-vinkem",
    city: "Vinkem",
    relatedPhrases: [
      "3D print service Vinkem",
      "rapid prototyping Vinkem",
      "3D printing bedrijf Vinkem",
      "3D printen nabij Vinkem",
      "3D model laten printen Vinkem",
    ],
    metaDescription:
      "3D prints in Vinkem en Cabourduinen: PLA, PETG en TPU voor landbouw, toerisme en grenslogistiek.",
    servicedAreas: [
      "Vinkem dorpskern",
      "Cabourduinen en grenszone",
      "Beauvoorde omgeving",
      "De Moeren en Adinkerke",
      "Afhalen Provincieweg 34a, 9552 Herzele",
    ],
    sectors: [
      "Landbouw in de grenspolders",
      "Toerisme en B&B's rond Beauvoorde",
      "Mobiliteit en fietsen richting Frankrijk",
    ],
  },
  {
    slug: "3d-printen-in-wulveringem",
    city: "Wulveringem",
    relatedPhrases: [
      "3D print service Wulveringem",
      "rapid prototyping Wulveringem",
      "3D printing bedrijf Wulveringem",
      "3D printen nabij Wulveringem",
      "3D model laten printen Wulveringem",
    ],
    metaDescription:
      "3D print service Wulveringem met focus op Kasteel Beauvoorde, landbouw en hospitality. Snelle levering van PLA, PETG en TPU.",
    servicedAreas: [
      "Wulveringem dorpskern",
      "Kasteel Beauvoorde",
      "Alveringem en Veurne corridor",
      "Polderbedrijven richting Vinkem",
      "Afhalen Provincieweg 34a, 9552 Herzele",
    ],
    sectors: [
      "Cultureel erfgoed en musea rond Beauvoorde",
      "Landbouw en mechanisatie",
      "Gastvrijheid en B&B's in Wulveringem",
    ],
  },
  {
    slug: "3d-printen-in-zoutenaaie",
    city: "Zoutenaaie",
    relatedPhrases: [
      "3D print service Zoutenaaie",
      "rapid prototyping Zoutenaaie",
      "3D printing bedrijf Zoutenaaie",
      "3D printen nabij Zoutenaaie",
      "3D model laten printen Zoutenaaie",
    ],
    metaDescription:
      "3D prints in Zoutenaaie tussen Veurne en Diksmuide. Outdoor onderdelen en zichtwerk in PLA, PETG of TPU met levering in de Westhoek.",
    servicedAreas: [
      "Zoutenaaie dorpskern",
      "Handzamevaart en N8",
      "Veurne-Diksmuide corridor",
      "Steenkerke en Alveringem rand",
      "Afhalen Provincieweg 34a, 9552 Herzele",
    ],
    sectors: [
      "Landbouw en agro-tech langs de Handzamevaart",
      "Toeristische routes naar IJzertoren en Veurne",
      "Installateurs en aannemers op de N8",
    ],
  },
];
// --- HELPERS -------------------------------------------------
function normSlug(s: string): string {
  return s.trim().toLowerCase().replace(/^\/|\/$/g, "")
}

export function buildDefaultRelatedPhrases(city: string): string[] {
  const c = city.trim()
  return [
    `3D printen in ${c}`,
    `3D print service ${c}`,
    `prototypes 3D print ${c}`,
    `FDM 3D print ${c}`,
    `PLA PETG TPU ${c}`,
  ]
}

function buildDefaultServicedAreas(city: string): string[] {
  const c = city.trim()
  return [
    `${c} centrum`,
    `${c} industriezone`,
    `${c} en deelgemeenten`,
    "Afhalen Provincieweg 34a, 9552 Herzele",
    "Levering in Vlaanderen",
  ]
}

function buildDefaultSectors(city: string): string[] {
  const c = city.trim()
  return [
    `Prototyping voor productteams in ${c}`,
    `Fixtures/tooling voor maakbedrijven rond ${c}`,
    `Displays/props voor marketing en events in ${c}`,
    `Onderwijs en makers in ${c}`,
  ]
}

export function getAllLocationSlugs(): string[] {
  return locations.map((l) => l.slug)
}

export function getLocationBySlug(slug: string): Location | undefined {
  const s = normSlug(slug)
  const loc = locations.find((l) => normSlug(l.slug) === s)
  if (!loc) return undefined
  return {
    ...loc,
    servicedAreas: loc.servicedAreas ?? buildDefaultServicedAreas(loc.city),
    sectors: loc.sectors ?? buildDefaultSectors(loc.city),
  }
}

export function listLocations(): Location[] {
  return locations.map((loc) => ({
    ...loc,
    servicedAreas: loc.servicedAreas ?? buildDefaultServicedAreas(loc.city),
    sectors: loc.sectors ?? buildDefaultSectors(loc.city),
  }))
}
