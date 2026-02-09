type BlogFaqBlock = {
  title: string
  items: { q: string; a: string }[]
}

export const BLOG_FAQ: Record<string, BlogFaqBlock> = {
  "3d-printen-voor-beginners": {
    title: "FAQ voor starters",
    items: [
      {
        q: "Wat heb ik nodig om te starten?",
        a: "Een STL of STEP bestand, het doel van het onderdeel en een gewenste deadline. Daarmee kunnen we direct adviseren.",
      },
      {
        q: "Welk materiaal kies ik als veilige start?",
        a: "PLA Matte is een sterk startpunt voor looks en prototypes. PETG is beter als het onderdeel meer belast wordt.",
      },
      {
        q: "Hoe krijg ik snel een prijsinschatting?",
        a: "Gebruik de pricing calculator of stuur je bestand door voor een concrete offerte.",
      },
    ],
  },
  "beste-instellingen-bambu-printer": {
    title: "FAQ over Bambu printerinstellingen",
    items: [
      {
        q: "Moet ik altijd presets gebruiken?",
        a: "Start met de presets en pas daarna per filament of detailniveau aan. Dat geeft de meest stabiele basis.",
      },
      {
        q: "Wanneer kalibreer ik opnieuw?",
        a: "Bij een nieuwe spool, nozzle wissel of na een langere pauze is een korte kalibratie slim.",
      },
      {
        q: "Wat zijn de grootste oorzaken van misprints?",
        a: "Vocht in filament, slechte bedhechting en te hoge snelheid zijn de meest voorkomende oorzaken.",
      },
    ],
  },
  "hoe-lang-duurt-3d-printen": {
    title: "FAQ over printtijd",
    items: [
      {
        q: "Wat bepaalt de printtijd?",
        a: "Volume, laaghoogte, infill, supports en snelheid hebben de grootste impact op de totale printtijd.",
      },
      {
        q: "Kan het sneller zonder kwaliteitsverlies?",
        a: "Vaak wel. Grovere lagen, minder infill of het opsplitsen van het model helpt zonder zichtbare problemen.",
      },
      {
        q: "Hoe krijg ik een realistische planning?",
        a: "Stuur het bestand door en we geven een concrete timing op basis van printduur en nabewerking.",
      },
    ],
  },
  "hoe-3d-print-je-onderdelen-voor-buitengebruik": {
    title: "FAQ over 3D prints voor buiten",
    items: [
      {
        q: "Welk materiaal is het beste voor buiten?",
        a: "Meestal PETG of PC. PLA is vooral geschikt voor indoor of beschut gebruik.",
      },
      {
        q: "Moet ik buitenprints nabehandelen?",
        a: "Een coating kan helpen tegen UV en vocht. We adviseren per onderdeel en gebruiksduur.",
      },
      {
        q: "Welke ontwerpkeuzes helpen buiten?",
        a: "Dikkere wanden, afgeronde hoeken en drainagegaten waar nodig maken onderdelen duurzamer.",
      },
    ],
  },
  "tool-organizers-3d-printen": {
    title: "FAQ over tool organizers",
    items: [
      {
        q: "Hoe bepaal ik de maat van een insert?",
        a: "Meet je tools en voeg een kleine marge toe. Geef ook de case of lade door voor perfecte passing.",
      },
      {
        q: "Welk materiaal werkt het best?",
        a: "PLA werkt goed in droge omgevingen. PETG is beter voor garage of werkplaats waar het warmer is.",
      },
      {
        q: "Welke bestanden leveren jullie aan?",
        a: "STL of STEP. Met STEP kunnen we sneller aanpassen als er nog optimalisaties nodig zijn.",
      },
    ],
  },
  "use-cases-tpu": {
    title: "FAQ over TPU use cases",
    items: [
      {
        q: "Wanneer kies ik TPU?",
        a: "Voor flex, grip, schokdemping of onderdelen die moeten meebuigen.",
      },
      {
        q: "Is TPU duurder dan PLA of PETG?",
        a: "TPU print trager en vraagt meer machine-uren. Dat zie je meestal terug in de prijs.",
      },
      {
        q: "Kan TPU gecombineerd worden met andere materialen?",
        a: "Ja, vaak combineren we TPU met PLA of PETG in een set of assembly.",
      },
    ],
  },
  "3d-printen-mini-figuren": {
    title: "FAQ over mini figuren",
    items: [
      {
        q: "Hoe krijgen jullie fijne details?",
        a: "We kiezen een fijne laaghoogte en optimaliseren orientatie voor scherpe details.",
      },
      {
        q: "Welke materialen zijn geschikt?",
        a: "PLA Matte voor detail, PLA Silk voor glans accenten. We adviseren per model.",
      },
      {
        q: "Zijn supports altijd nodig?",
        a: "Vaak wel bij armen of accessoires. We beperken supports om nabewerking te verminderen.",
      },
    ],
  },
  "finishing-friday-schuren-primen-lakken": {
    title: "FAQ over schuren, primen en lakken",
    items: [
      {
        q: "Moet ik altijd schuren?",
        a: "Niet altijd. Voor functionele onderdelen kan een ruwe finish al volstaan.",
      },
      {
        q: "Wat is de juiste volgorde?",
        a: "Eerst schuren, dan primer, daarna lak in dunne lagen. Zo krijg je het strakste resultaat.",
      },
      {
        q: "Doen jullie ook nabewerking?",
        a: "We focussen op printwerk, maar geven advies of verwijzen door als afwerking cruciaal is.",
      },
    ],
  },
  "filament-vrijdag-pla": {
    title: "FAQ over PLA filament",
    items: [
      {
        q: "Wanneer kies ik PLA?",
        a: "Voor prototypes, displays en snelle iteraties met een strakke afwerking.",
      },
      {
        q: "Is PLA geschikt voor buiten?",
        a: "Meestal niet. Voor zon en vocht kies je sneller PETG of PC.",
      },
      {
        q: "Hoe voorkom je misprints met PLA?",
        a: "Hou filament droog, zorg voor goede bedhechting en test eerst een klein stuk.",
      },
    ],
  },
  "filament-vrijdag-petg": {
    title: "FAQ over PETG filament",
    items: [
      {
        q: "Wanneer kies ik PETG?",
        a: "Voor functionele onderdelen, buitengebruik en extra taaiheid.",
      },
      {
        q: "Is PETG moeilijker te printen dan PLA?",
        a: "Het vraagt wat meer aandacht voor bedhechting en stringing, maar is goed beheersbaar.",
      },
      {
        q: "Hoe bewaar ik PETG?",
        a: "Droog opslaan en bij twijfel eerst drogen voor je start.",
      },
    ],
  },
  "filament-vrijdag-tpu": {
    title: "FAQ over TPU filament",
    items: [
      {
        q: "Wanneer kies ik TPU?",
        a: "Voor flex, grip, demping of onderdelen die moeten meebuigen.",
      },
      {
        q: "Is TPU geschikt voor buiten?",
        a: "Vaak wel, maar we checken altijd UV en belasting per toepassing.",
      },
      {
        q: "Waarom duurt TPU langer om te printen?",
        a: "Flexibele filamenten vragen lagere snelheid voor stabiele lagen en minder fouten.",
      },
    ],
  },
  "filament-vrijdag-pc": {
    title: "FAQ over PC filament",
    items: [
      {
        q: "Wanneer kies ik PC?",
        a: "Voor hoge hittebestendigheid, taaiheid en onderdelen met mechanische belasting.",
      },
      {
        q: "Is PC geschikt voor buiten?",
        a: "Ja, maar we bekijken per use case of PETG volstaat.",
      },
      {
        q: "Wat is belangrijk bij PC prints?",
        a: "Droog filament, stabiele temperatuur en een gesloten printeromgeving geven het beste resultaat.",
      },
    ],
  },
  "filament-vrijdag-pc-fr": {
    title: "FAQ over PC FR filament",
    items: [
      {
        q: "Wanneer kies ik PC FR?",
        a: "Als vlamvertragende eigenschappen nodig zijn en veiligheid de hoogste prioriteit heeft.",
      },
      {
        q: "Is PC FR altijd nodig?",
        a: "Nee, vaak volstaat PC of PETG. We adviseren op basis van risico en toepassing.",
      },
      {
        q: "Wat is belangrijk bij PC FR prints?",
        a: "Droog filament, stabiele temperatuur en duidelijke eisen rond compliance.",
      },
    ],
  },
  "filament-vrijdag-pla-marble": {
    title: "FAQ over PLA Marble filament",
    items: [
      {
        q: "Wanneer kies ik PLA Marble?",
        a: "Voor decor, interieur en props waar de steenlook het verschil maakt.",
      },
      {
        q: "Is PLA Marble geschikt voor buiten?",
        a: "Nee, het is vooral bedoeld voor indoor zichtwerk.",
      },
      {
        q: "Waar let ik op bij PLA Marble?",
        a: "Het filament vraagt een stabiele flow. We testen eerst op kleine details.",
      },
    ],
  },
  "filament-vrijdag-pla-glow": {
    title: "FAQ over PLA Glow filament",
    items: [
      {
        q: "Wanneer kies ik PLA Glow?",
        a: "Voor signalisatie, glow accenten en speelse props die moeten opvallen in het donker.",
      },
      {
        q: "Is PLA Glow sterk genoeg?",
        a: "Het blijft PLA, dus vooral voor indoor en licht gebruik.",
      },
      {
        q: "Waar moet ik op letten?",
        a: "Glow filament kan de nozzle sneller belasten. We kiezen de juiste setup per batch.",
      },
    ],
  },
  "filament-vrijdag-pla-metal": {
    title: "FAQ over PLA Metal filament",
    items: [
      {
        q: "Wanneer kies ik PLA Metal?",
        a: "Voor een metallic look zonder echte metaalbewerking.",
      },
      {
        q: "Is PLA Metal zwaar of sterk?",
        a: "Het voelt premium maar blijft PLA, dus vooral voor zichtwerk.",
      },
      {
        q: "Kan ik PLA Metal nabewerken?",
        a: "Licht schuren en primeren kan. We adviseren per model wat het beste werkt.",
      },
    ],
  },
  "filament-vrijdag-pla-silk-plus": {
    title: "FAQ over PLA Silk+ filament",
    items: [
      {
        q: "Wanneer kies ik PLA Silk+?",
        a: "Voor glanzende awards, decor en showpieces met premium look.",
      },
      {
        q: "Is PLA Silk+ geschikt voor functionele parts?",
        a: "Meestal niet. Voor kracht kies je PETG of PLA Tough+.",
      },
      {
        q: "Hoe haal je de beste glans?",
        a: "Orientatie en zichtvlakken zijn bepalend. We tunen instellingen per model.",
      },
    ],
  },
  "filament-vrijdag-pla-wood": {
    title: "FAQ over PLA Wood filament",
    items: [
      {
        q: "Wanneer kies ik PLA Wood?",
        a: "Voor een houtlook bij interieur, decor en lichte props.",
      },
      {
        q: "Is PLA Wood geschikt voor buiten?",
        a: "Nee, het is vooral bedoeld voor indoor zichtwerk.",
      },
      {
        q: "Waar let ik op bij PLA Wood?",
        a: "Het filament is gevoeliger voor verstopping. We kiezen nozzle en flow per batch.",
      },
    ],
  },
  "maker-monday-fdm-scharnieren": {
    title: "FAQ over FDM scharnieren",
    items: [
      {
        q: "Wat is de grootste fout bij scharnieren?",
        a: "Een slechte laagorientatie zorgt voor breuk. Lagen moeten de kracht ondersteunen.",
      },
      {
        q: "Welke speling is een goed startpunt?",
        a: "We starten met kleine speling en testen per materiaal en printer voor een soepele beweging.",
      },
      {
        q: "Welk materiaal werkt het best?",
        a: "PETG is taai, PLA is goed voor lichte duty, TPU werkt voor flex hinges.",
      },
    ],
  },
  "maker-monday-wanddiktes-ribs": {
    title: "FAQ over wanddiktes en ribs",
    items: [
      {
        q: "Wanneer voeg ik ribs toe?",
        a: "Bij grote vlakken of lange armen om doorbuigen te voorkomen.",
      },
      {
        q: "Hoe kies ik een wanddikte?",
        a: "Stem af op belasting en nozzlebreedte. We adviseren per model.",
      },
      {
        q: "Wat is beter: dikke wand of ribs?",
        a: "Ribs geven stijfheid zonder veel extra materiaal en houden het onderdeel lichter.",
      },
    ],
  },
  "maker-monday-toleranties-3d-printen": {
    title: "FAQ over toleranties",
    items: [
      {
        q: "Hoeveel speling heb ik nodig?",
        a: "Dat hangt af van printer en materiaal. We testen kritische passing met coupons.",
      },
      {
        q: "Wat is het verschil tussen persfit en speling?",
        a: "Persfit klemt, speling geeft beweging. We stemmen dit af op de functie.",
      },
      {
        q: "Hoe voorkom ik nabewerking?",
        a: "Voorzie marge en plan teststukken in. Dat bespaart veel tijd achteraf.",
      },
    ],
  },
  "maker-monday-schroefdraad-bevestigingen": {
    title: "FAQ over schroefdraad bevestigingen",
    items: [
      {
        q: "Geprint draad of insert?",
        a: "Geprint draad is ok voor lage belasting, inserts voor herhaald gebruik.",
      },
      {
        q: "Welke richting printen?",
        a: "Print zo dat lagen de kracht niet uit elkaar trekken. Dat verlengt de levensduur.",
      },
      {
        q: "Hoe voorkom ik slijtage?",
        a: "Gebruik grotere draad, voldoende wanddikte en vermijd overbelasting.",
      },
    ],
  },
  "maker-monday-schroefdraad-inserts": {
    title: "FAQ over schroefdraad inserts",
    items: [
      {
        q: "Wanneer gebruik je inserts?",
        a: "Bij herhaald schroeven of hogere belasting. Dat voorkomt slijtage van plastic.",
      },
      {
        q: "Welke materialen werken het best?",
        a: "PETG is taai en vergevingsgezind. PLA kan voor lichte toepassingen.",
      },
      {
        q: "Moet ik de insert verhitten?",
        a: "Vaak wel. We plaatsen ze of geven duidelijke instructies mee.",
      },
    ],
  },
  "maker-monday-snapfits": {
    title: "FAQ over snapfits",
    items: [
      {
        q: "Welke materiaalkeuze werkt het best?",
        a: "PETG of TPU voor flex. PLA alleen voor lichte belasting.",
      },
      {
        q: "Hoe voorkom ik breuk?",
        a: "Rond hoeken af, verleng de flexzone en voorkom scherpe stresspunten.",
      },
      {
        q: "Hoeveel speling is nodig?",
        a: "We testen per printer. Te strak geeft stress, te los klikt niet goed.",
      },
    ],
  },
  "maker-monday-snapfit-parts": {
    title: "FAQ over snapfit parts",
    items: [
      {
        q: "Hoe zorg ik dat een snapfit goed klikt?",
        a: "Zorg voor een duidelijke flexzone en voldoende ruimte voor beweging.",
      },
      {
        q: "Welke materialen zijn geschikt?",
        a: "PETG of TPU voor herhaald klikken. PLA alleen bij lichte belasting.",
      },
      {
        q: "Moet ik teststukken voorzien?",
        a: "Ja, een kleine test bespaart tijd en voorkomt breuk in de finale versie.",
      },
    ],
  },
  "maker-monday-warping-layer-cracks": {
    title: "FAQ over warping en layer cracks",
    items: [
      {
        q: "Hoe voorkom ik warping?",
        a: "Gebruik goede bedhechting, brims en een stabiele printomgeving.",
      },
      {
        q: "Waarom scheuren lagen?",
        a: "Te snelle koeling of te lage temperatuur kan delaminatie veroorzaken.",
      },
      {
        q: "Helpt een enclosure?",
        a: "Voor ABS en PC zeker. Voor PLA is het minder nodig, maar het kan nog helpen.",
      },
    ],
  },
  "use-case-dinsdag-auto-fiets": {
    title: "FAQ over 3D printen voor auto en fiets",
    items: [
      {
        q: "Welke materialen gebruiken jullie hier?",
        a: "Vaak PETG of PC voor hitte en belastingen. We kiezen per onderdeel.",
      },
      {
        q: "Wat hebben jullie nodig om te starten?",
        a: "STL of STEP, de toepassing, montageplek en gewenste aantallen.",
      },
      {
        q: "Wat is een haalbare doorlooptijd?",
        a: "Afhankelijk van batch en detail. Na intake geven we een concrete timing.",
      },
    ],
  },
  "use-case-dinsdag-events": {
    title: "FAQ over 3D printen voor events",
    items: [
      {
        q: "Welke materialen werken het best?",
        a: "PLA voor looks, PETG voor meer duurzaamheid. We adviseren per item.",
      },
      {
        q: "Wat is een haalbare doorlooptijd?",
        a: "Dat hangt af van aantallen en afwerking. We geven planning na intake.",
      },
      {
        q: "Wat hebben jullie nodig om te starten?",
        a: "STL of STEP, aantallen, kleurkeuze en deadline.",
      },
    ],
  },
  "use-case-dinsdag-interieur": {
    title: "FAQ over 3D printen voor interieur",
    items: [
      {
        q: "Welke materialen gebruiken jullie hier?",
        a: "PLA Matte voor look, PETG als het item meer belast wordt.",
      },
      {
        q: "Kunnen jullie kleur en finish matchen?",
        a: "We adviseren op basis van kleurstalen en beschikbare filamenten.",
      },
      {
        q: "Wat hebben jullie nodig om te starten?",
        a: "STL of STEP, gewenste afmetingen en waar het object komt.",
      },
    ],
  },
  "use-case-dinsdag-productontwikkeling": {
    title: "FAQ over 3D printen voor productontwikkeling",
    items: [
      {
        q: "Welke materialen zijn geschikt voor prototypes?",
        a: "PLA voor snelle iteraties, PETG of TPU voor functionele tests.",
      },
      {
        q: "Hoe snel kunnen jullie itereren?",
        a: "We plannen snel en sturen bij per feedbackronde. Timing hangt af van batch en detail.",
      },
      {
        q: "Wat hebben jullie nodig om te starten?",
        a: "STL of STEP, gebruikscontext en gewenste testdoelen.",
      },
    ],
  },
  "use-case-dinsdag-retail-displays": {
    title: "FAQ over 3D printen voor retail displays",
    items: [
      {
        q: "Welke materialen werken het best voor displays?",
        a: "PLA Matte voor look en vorm. PETG als het display intensief gebruikt wordt.",
      },
      {
        q: "Kunnen jullie branding details verwerken?",
        a: "Ja, we integreren logo, typografie en vormtaal in het model.",
      },
      {
        q: "Wat hebben jullie nodig om te starten?",
        a: "STL of STEP, afmetingen, gewenste kleuren en deadline.",
      },
    ],
  },
  "use-case-dinsdag-scholen": {
    title: "FAQ over 3D printen voor scholen",
    items: [
      {
        q: "Welke materialen zijn veilig en betaalbaar?",
        a: "PLA is het meest toegankelijk. PETG gebruiken we als extra duurzaamheid nodig is.",
      },
      {
        q: "Kunnen jullie batches leveren?",
        a: "Ja, we plannen reeksen met consistente kwaliteit en duidelijke timing.",
      },
      {
        q: "Wat hebben jullie nodig om te starten?",
        a: "STL of STEP, aantallen, kleurvoorkeur en deadline.",
      },
    ],
  },
  "use-case-dinsdag-stem": {
    title: "FAQ over 3D printen voor STEM",
    items: [
      {
        q: "Welke materialen raden jullie aan?",
        a: "PLA voor onderwijsprojecten, PETG als de onderdelen intensief gebruikt worden.",
      },
      {
        q: "Kunnen jullie lesmateriaal ondersteunen?",
        a: "We leveren prints en geven advies over bestandsformaten en duurzaamheid.",
      },
      {
        q: "Wat hebben jullie nodig om te starten?",
        a: "STL of STEP, aantallen, doel van de demo en timing.",
      },
    ],
  },
  "use-case-dinsdag-tabletop": {
    title: "FAQ over 3D printen voor tabletop",
    items: [
      {
        q: "Welke materialen werken voor miniatures?",
        a: "PLA Matte voor detail en een mooie finish. We adviseren per model.",
      },
      {
        q: "Kunnen jullie ook terrain of tokens maken?",
        a: "Ja, we printen zowel kleine pieces als grotere terrain sets.",
      },
      {
        q: "Wat hebben jullie nodig om te starten?",
        a: "STL of STEP, gewenste schaal en aantallen.",
      },
    ],
  },
}