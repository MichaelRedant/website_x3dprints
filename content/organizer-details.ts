// content/organizer-details.ts
import type { OrganizerPageContent, OrganizerSlug } from "@/lib/organizers"

export const ORGANIZER_SLUGS: OrganizerSlug[] = ["modugrid", "packout", "tstak", "custom"]

export const ORGANIZER_PAGES: Record<OrganizerSlug, OrganizerPageContent> = {
  modugrid: {
    slug: "modugrid",
    systemName: "Gridfinity",
    heroTitle: "Organizers op maat voor jouw Gridfinity setup",
    heroSubtitle: "Open-source grid, geen gerammel. Eén vaste plek per tool.",
    intro:
      "Voor lades, bureaus, werkbanken en koffers die volgens het gridfinity-principe werken. Jij kiest de tools, wij leveren een rustige, vaste indeling op maat. Voor hobbyisten én professionals.",
    summary:
      "Prefab sets voor bits, schroeven en elektriciensmateriaal. Elke pocket kan ook custom per tool: foto + maten doorgeven en we modelleren een eigen vak met label en antislip-optie.",
    pains: ["Schroeven door elkaar", "Lege ruimte in koffers", "Tijdverlies bij zoeken", "Slecht overzicht"],
    steps: [
      { title: "Kies je systeem", description: "Gridfinity raster met jouw lade- of kofferafmetingen als startpunt." },
      { title: "Selecteer wat je wil opbergen", description: "Schroeven, bits, Wago-klemmen, accu's, drivers of meettools." },
      { title: "Wij modelleren & printen op maat", description: "Pasvorm afgestemd op jouw vakhoogte, met antislip-optie." },
      { title: "Klaar voor gebruik", description: "Vastzittende trays, labelzones en geen rammel onderweg." },
    ],
    bundles: [
      {
        slug: "starter-set",
        name: "Starter Set",
        description: "Basisraster met variabele vakken voor schroeven, bitjes en klein handgereedschap.",
        idealFor: ["Eerste lade of koffer indelen", "Snelle winst zonder nameten"],
        perks: ["Labelzones", "Antislip optioneel", "Past in standaard 42/63 mm hoogte"],
      },
      {
        slug: "schroeven-set",
        name: "Schroeven Set",
        description: "Diepere compartimenten per maat, kleurcodes en stackbare cups voor navulling.",
        idealFor: ["Schroeven en pluggen gescheiden houden", "Assortimentsdozen vervangen"],
        perks: ["Stapelbare inserts", "Kleurcode-plugs", "Dekselvriendelijk"],
      },
      {
        slug: "elektricien-set",
        name: "Elektricien Set",
        description: "Lay-out voor Wagos, striptangen, spanningszoeker en bits. Alles klemvast.",
        idealFor: ["Servicewagens en interventies", "Geen rammel in verticale koffers"],
        perks: ["Gripzones voor tang", "Uitsparing voor tester", "Labelbare rijen"],
      },
      {
        slug: "custom-set",
        name: "Custom Set",
        description: "Parametrische insert op basis van foto + lijst tools. Jij kiest diepte, wij sturen preview.",
        idealFor: ["Onregelmatige tools", "Combi van elektrisch + handgereedschap"],
        perks: ["Preview ter goedkeuring", "Naam of label in print", "Extra vakje voor later"],
      },
    ],
    priceCopy:
      "Transparant maatwerk: prijs op aanvraag, afhankelijk van indeling en materiaal (PLA of PETG). Made-to-order, past perfect in jouw Gridfinity raster.",
    upsells: ["PETG upgrade voor impact", "Antislip bodem", "Naam of label in print", "Extra vakje voor later"],
    proofPoints: [
      " Ontworpen op basis van jouw koffer- of ladematen",
      " Geen rammel, geen speling",
      " Print-on-demand in België",
      " Aanpasbaar op aanvraag",
    ],
    faq: [
      {
        q: "Moet ik zelf STL-bestanden aanleveren voor Gridfinity inserts",
        a: "Nee. Jij geeft door welke tools of schroeven erin moeten en de binnenmaten van je lade of koffer. Wij modelleren de indeling en leveren plug-and-play trays.",
      },
      {
        q: "Blijven de inserts zitten als de koffer kantelt",
        a: "Ja. We voorzien klemranden en optionele antislip-bodem. Voor verticale koffers kiezen we kleinere compartimenten zodat er niets uitschuift.",
      },
      {
        q: "Kan ik later extra vakjes of labels toevoegen",
        a: "Zeker. Kies bij bestelling voor een extra vakje of naam/label in de print. Heb je al een set We kunnen aanvullende modules bijprinten met dezelfde pasvorm.",
      },
      {
        q: "Is Gridfinity alleen voor werkmannen",
        a: "Nee. Het past net zo goed in bureaulades, hobby- en makersruimtes, ESD-stations voor elektronica, verf/miniaturen-opslag, naai- en craft-koffers, of educatieve STEM-sets.",
      },
      {
        q: "Hoe vraag ik een custom vak voor een specifieke tool aan",
        a: "Stuur een foto van de tool van bovenaf, vermeld lengte/breedte/hoogte (of diameter), hoe de tool moet liggen (plat/rechtop) en hoeveel stuks in dezelfde lade. Wij modelleren het vak, sturen een preview en passen aan tot het klopt.",
      },
      {
        q: "Welk materiaal raden jullie aan voor Gridfinity bakjes",
        a: "PLA Matte voor een strakke look in bureaulades, PETG voor koffers en transport. Antislip-bodem en ingegoten labels zijn optionele upgrades.",
      },
      {
        q: "Hoe snel kan ik mijn Gridfinity set krijgen",
        a: "Na je intake (foto + maten) plannen we de batch in. Meestal enkele werkdagen afhankelijk van het aantal vakken en materiaal. We communiceren upfront over timing.",
      },
    ],
    seo: {
    title: "Gridfinity organizers op maat | X3DPrints",
    description:
      "Gridfinity organizers voor bureaulades, werkbanken en koffers. Prefab sets + custom vak per tool, labelzones en antislip. Toolbox inlay op maat in België (Gent/Aalst).",
      canonical: "https://www.x3dprints.be/organizers/modugrid/",
      ogImage: "/images/organizers/modugrid/ModuGrid3.webp",
    },
  },
  packout: {
    slug: "packout",
    systemName: "Milwaukee Packout",
    heroTitle: "Packout organizers die niet rammelen",
    heroSubtitle: "Layouts voor bits, accu's en chargers, plus custom combinaties.",
    intro:
      "Voor Milwaukee Packout organizers: klemvaste trays die tegen transport kunnen, ook rechtop. Gericht op professionele techniekers en serviceploegen.",
    summary: "Compact organizer inserts, accu/charger inlays en combinatiesets. Intake met foto + modelnummer van je koffer.",
    pains: ["Bits die rondvliegen", "Accu's zonder vaste plek", "Zoeken naar tangen in diepe vakken", "Slecht overzicht"],
    steps: [
      { title: "Kies Packout model", description: "Geef het modelnummer of foto van je Packout koffer." },
      { title: "Selecteer tools", description: "Accus, opladers, bits, sleutels of meettools." },
      { title: "Wij modelleren de trays", description: "Klemvast per vakhoogte, met uitsparingen voor grips/labels." },
      { title: "Print & levering", description: "We leveren plug-and-play inserts afgestemd op jouw model." },
    ],
    bundles: [
      {
        slug: "compact-organizer-48-22-8435",
        name: "Compact Organizer (48-22-8435)",
        description: "Inlay op maat voor de compacte Packout organizer. 5 bakken, klemvast en labelbaar.",
        idealFor: ["Servicebussen met beperkte ruimte", "Bits en schroeven per taak bundelen"],
        perks: ["No-travel bins benutten", "Labelzones per bak", "Antislip optioneel"],
      },
      {
        slug: "low-profile-48-22-8431",
        name: "Low-Profile Organizer (48-22-8431)",
        description: "Volle breedte, lage hoogte. Layout voor lange bits, boren en kleine onderdelen.",
        idealFor: ["Diepe lade in de camionette", "Lange bits/blades gescheiden houden"],
        perks: ["Grip sleuven voor lange bits", "IP65 dichtingen behouden", "Kleurcodes per rij"],
      },
      {
        slug: "low-profile-compact-48-22-8436",
        name: "Low-Profile Compact (48-22-8436)",
        description: "Smalle, lage organizer. Fijne vakken voor boren, bitjes, pluggen of EDC.",
        idealFor: ["Compacte service cases", "Kleinverbruik per ploeg"],
        perks: ["5 vakken met dividers", "Labelzones", "Antislip optie"],
      },
      {
        slug: "custom-packout-layout",
        name: "Custom Packout Layout",
        description: "Op basis van jouw tools + foto. Wij sturen preview ter goedkeuring.",
        idealFor: ["Gemengde tools", "Specifieke uitsparingen"],
        perks: ["Preview", "Label in print", "Extra vakje mogelijk"],
      },
    ],
    priceCopy: "Prijs op aanvraag per Packout model en indeling.",
    upsells: ["Antislip bodem", "Label in de print", "Kleurcode plugs"],
    proofPoints: [
      " Ontworpen voor Milwaukee Packout cases (Organizer, Low-Profile, Compact)",
      " Geen rammel, geen speling  ook rechtop in de camionette",
      " Print-on-demand in België",
    ],
    faq: [
      {
        q: "Werken de trays met de originele Packout inlays",
        a: "We modelleren op het lege vak; je hebt geen OEM inlay nodig. Geef het modelnummer of een foto van de open koffer.",
      },
      {
        q: "Kan ik verschillende accu-formaten combineren",
        a: "Ja, we maken per accu een vorm met klemrand en optionele antislip. Mixen van M12/M18 is mogelijk.",
      },
      {
        q: "Zijn de inserts uitneembaar",
        a: "Standaard zijn ze klemvast. Wil je ze kunnen wisselen, dan voorzien we pull-tabs en licht spelingsmarge.",
      },
      {
        q: "Welke Packout modellen ondersteunen jullie",
        a: "De Packout Organizer (48-22-8435), Low-Profile Organizer (48-22-8431) en Low-Profile Compact (48-22-8436) dekken we standaard. Andere trays kunnen we modelleren op basis van foto + maten.",
      },
      {
        q: "Wat is de levertijd voor een Packout inlay op maat",
        a: "Na intake (foto + modelnummer + inhoud) plannen we de batch. Meestal enkele werkdagen, afhankelijk van aantal vakken en gekozen materiaal (PLA/PETG).",
      },
      {
        q: "Wat hebben jullie nodig voor een goede intake",
        a: "Modelnummer of foto van de open Packout, lijst met tools/accu's/chargers, aantallen en of de koffer rechtop vervoerd wordt. Dat versnelt de modellering en voorkomt rammel.",
      },
    ],
    seo: {
      title: "Packout organizers op maat | X3DPrints",
      description:
        "Milwaukee Packout inlay op maat: accu’s, chargers en handtools zonder rammel. Professioneel, labelbaar en antislip. Packout insert op maat in België voor serviceploegen en camionettes.",
      canonical: "https://www.x3dprints.be/organizers/packout/",
      ogImage: "/images/organizers/milwaukee/milwaukee1.webp",
    },
  },
  tstak: {
    slug: "tstak",
    systemName: "Stanley / DeWALT TSTAK",
    heroTitle: "TSTAK inserts met vaste layout",
    heroSubtitle: "Preset sets voor small parts en allround koffers, custom mogelijk.",
    intro:
      "Voor TSTAK koffers: stille trays met labelzones en optionele antislip. Gericht op professionele teams die efficiënt willen werken.",
    summary: "Binnenkort beschikbaar. Meld je aan en we prioriteren jouw layout.",
    pains: ["Kleine onderdelen door elkaar", "Te diepe vakken", "Geen labelzones", "Rammel tijdens transport"],
    steps: [
      { title: "Kies TSTAK model", description: "Modelnummer of foto van de open koffer." },
      { title: "Selecteer inhoud", description: "Small parts, handtools of mix." },
      { title: "Layout & labels", description: "We verdelen vakken en voorzien labelzones." },
      { title: "Print & levering", description: "We leveren klaar voor gebruik, afgestemd op de opgegeven hoogte." },
    ],
    bundles: [
      {
        slug: "small-parts-set",
        name: "TSTAK Small Parts Set",
        description: "Fijn verdeelde vakken voor schroeven, pluggen en clips.",
        idealFor: ["Elektro & HVAC", "Montage op locatie"],
        perks: ["Klemranden", "Labelzones", "Optionele kleurcaps"],
      },
      {
        slug: "allround-set",
        name: "TSTAK Allround Set",
        description: "Combi van diepe en ondiepe vakken voor handtools + verbruiksmateriaal.",
        idealFor: ["Dagelijkse service", "Gemengde tools"],
        perks: ["Griplijnen", "Antislip optie", "Snelle toegang"],
      },
      {
        slug: "pro-layout",
        name: "TSTAK Pro Layout",
        description: "Op basis van jouw tool lijst, met custom uitsparingen.",
        idealFor: ["Specifiek vakmanschap", "Vaste toolkit per ploeg"],
        perks: ["Preview", "Label in print", "Extra vakje mogelijk"],
      },
    ],
    priceCopy: "Prijs op aanvraag per kofferindeling.",
    upsells: ["Antislip", "Label in print", "Extra vakje"],
    proofPoints: [" Geen rammel", " Past per kofferhoogte", " Print-on-demand in België"],
    faq: [
      {
        q: "Past dit in elke TSTAK hoogte",
        a: "We modelleren per bakhoogte; geef het modelnummer of hoogte in mm door.",
      },
      {
        q: "Blijven de inserts zitten rechtop",
        a: "Ja, we voorzien klem en optioneel antislip zodat de indeling niet valt wanneer je de koffer rechtop zet.",
      },
      {
        q: "Kan ik later modules bijbestellen",
        a: "Zeker, we bewaren de indeling zodat we dezelfde pasvorm opnieuw kunnen printen.",
      },
      {
        q: "Welke TSTAK types dekken jullie",
        a: "We richten ons op de standaard TSTAK organizers (zoals DWST17814) en passen de hoogte aan jouw model aan. Andere TSTAK varianten kunnen op aanvraag met foto + binnenmaten.",
      },
      {
        q: "Welke materialen raden jullie aan voor TSTAK inserts",
        a: "PETG voor dagelijks transport en temperatuurschommelingen; PLA Matte kan voor lichte toepassingen. Antislip-bodem en in-print labels zijn optioneel.",
      },
      {
        q: "Hoe snel kan ik mijn TSTAK layout krijgen",
        a: "Meestal binnen enkele werkdagen na intake, afhankelijk van het aantal vakken en materiaalkeuze. Deel modelnummer, foto en tool-lijst voor de snelste doorlooptijd.",
      },
      {
        q: "Kan ik labels of kleurcodes toevoegen",
        a: "Ja. We voorzien labelzones en kunnen kleurcaps of in-print tekst toevoegen zodat teams sneller de juiste vakken vinden.",
      },
    ],
    seo: {
      title: "TSTAK organizers op maat | X3DPrints",
      description:
        "Stanley/DeWALT TSTAK insert op maat: small parts en allround layouts zonder rammel, met labelzones en antislip. TSTAK organizer op maat in België voor field teams, servicewagens en camionettes.",
      canonical: "https://www.x3dprints.be/organizers/tstak/",
      ogImage: "/images/organizers/tstak/tstak0.jpg",
    },
  },
  custom: {
    slug: "custom",
    systemName: "Custom toolbox inserts",
    heroTitle: "Custom toolbox inserts met foto + lijst",
    heroSubtitle: "Parametrisch ontwerp op basis van jouw koffer en tools.",
    intro:
      "Geen Packout/Gridfinity/TSTAK We modelleren een insert op maat met jouw foto, maten en tool-lijst. Geschikt voor hobbyisten en professionals met unieke koffers.",
    summary: "Upload foto en afmetingen, wij sturen een preview en printen on-demand.",
    pains: ["Onregelmatige tools", "Geen passend raster", "Meetwerk zonder guidance", "Tijdverlies door zoeken"],
    steps: [
      { title: "Foto & maten", description: "Stuur een foto van de open koffer + binnenmaten." },
      { title: "Tool lijst", description: "Welke tools en hoeveel We groeperen logisch." },
      { title: "Preview & feedback", description: "Je krijgt een layout-preview voordat we printen." },
      { title: "Print & levering", description: "We printen in PLA/PETG en leveren passend op basis van jouw maten." },
    ],
    bundles: [
      {
        slug: "custom-base",
        name: "Custom Base",
        description: "Baseline insert met vakken op maat van jouw toolset.",
        idealFor: ["Unieke koffers", "Gemengde tools"],
        perks: ["Preview", "Labeloptie", "Antislip mogelijk"],
      },
      {
        slug: "custom-pro",
        name: "Custom Pro",
        description: "Extra versteviging + kleurcodes per toolgroep.",
        idealFor: ["Dagelijks professioneel gebruik", "Teamkits"],
        perks: ["Kleurcodes", "Gripranden", "Opslaan van je model voor reprints"],
      },
    ],
    priceCopy: "Prijs op aanvraag na intake.",
    upsells: ["Antislip", "Label in print", "Extra vakje"],
    proofPoints: [" Intake met foto", " Preview ter goedkeuring", " Made-to-order in België"],
    faq: [
      {
        q: "Wat hebben jullie nodig om te starten",
        a: "Een foto van de open koffer of pegboard, de binnenmaten (LBH of diameter  hoogte) en een lijst met tools/onderdelen en aantallen. Verwijder schuim voor de foto.",
      },
      {
        q: "Kunnen jullie labels of kleurcodes toevoegen",
        a: "Ja. We kunnen labels in-print zetten, magnetische labels voorzien en kleurcodes toepassen per toolgroep of onderdeeltype.",
      },
      {
        q: "Welke materialen zijn mogelijk",
        a: "PLA Matte voor bureau/indoor, PETG voor transport/impact. Optioneel antislip bodem en magnetische strips voor pegboards.",
      },
      {
        q: "Maken jullie ook parametrische organizers",
        a: "Ja. We bouwen een parametrisch model voor wisselende tools of voorraadbakken. Daarna kunnen we varianten snel bijprinten met dezelfde pasvorm.",
      },
      {
        q: "Hoe snel kan ik een custom insert krijgen",
        a: "Meestal enkele werkdagen na intake, afhankelijk van complexiteit en materiaalkeuze. Je krijgt eerst een preview ter goedkeuring.",
      },
      {
        q: "Bewaren jullie mijn model voor reprints",
        a: "Ja. We bewaren het parametrische model zodat we later modules kunnen bijprinten of aanpassen zonder opnieuw te meten.",
      },
      {
        q: "Voor welke toepassingen is dit bedoeld",
        a: "Alles wat niet standaard past: photography/AV cases, meetkoffers, RC/FPV, medische kits, pegboards met magnetische labels, geprinte storage boxen en losse componentenbakken.",
      },
      {
        q: "Kunnen jullie custom onderdelen maken voor IKEA Skådis",
        a: "Ja. Skådis is het pegboard-systeem van IKEA. We ontwerpen en printen custom haken, bakjes, kabelclips en toolholders die passen in de Skådis gaten en jouw tools exact vastzetten.",
      },
      {
        q: "Hoe wordt de prijs bepaald",
        a: "Prijs is op aanvraag en hangt af van het aantal vakken, materiaal (PLA of PETG), eventuele magnetische labels en extras zoals antislip of in-print tekst.",
      },
    ],
    seo: {
      title: "Custom toolbox inserts | X3DPrints",
      description:
        "Custom toolbox insert op maat in België: foto + maten + tool lijst, wij modelleren en printen in PLA/PETG met label en antislip. Ideaal voor unieke koffers, pegboards, Skådis wanden en parametric bins.",
      canonical: "https://www.x3dprints.be/organizers/custom/",
      ogImage: "/images/organizers/modugrid/ModuGrid10.webp",
    },
  },
}
