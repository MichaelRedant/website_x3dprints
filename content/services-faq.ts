export const servicesFaq = [
  {
    q: "Wat is 3D printen precies?",
    a: "3D printen is een digitale productietechniek waarbij een object laag per laag wordt opgebouwd op basis van een 3D-bestand, meestal in STL- of STEP-formaat.",
  },
  {
    q: "Welke materialen gebruiken jullie voor 3D printen?",
    a: `X3DPrints print standaard in PLA, PETG en TPU. PLA is detailrijk, PETG is sterker en hittebestendig, TPU is flexibel. Zie <a href="/materials">/materials</a> voor kleuren en richtlijnen.`,
  },
  {
    q: "Kan ik een bestand aanleveren voor 3D printen?",
    a: "Ja, je kan je .STL- of .STEP-bestand uploaden of mailen. Wij zorgen voor de voorbereiding en productie.",
  },
  {
    q: "Moet ik ervaring hebben met 3D design om iets te laten printen?",
    a: "Nee, wij kunnen je ondersteunen bij het optimaliseren van je ontwerp en adviseren over materiaalkeuze.",
  },
  {
    q: "Hoe snel kan ik mijn 3D print ontvangen?",
    a: `Onze standaard levertijd bij X3DPrints is 2-5 werkdagen vanuit Herzele (Oost-Vlaanderen), afhankelijk van complexiteit en oplage. Spoed is mogelijk op aanvraag via <a href="/contact">/contact</a>.`,
  },
  {
    q: "Wat kost 3D printen?",
    a: `Prijs = materiaal + printtijd + basis nabewerking + oplage. Gebruik de prijscalculator en price estimator op <a href="/pricing">/pricing</a> voor een richtprijs; X3DPrints bevestigt na modelcontrole.`,
  },
  {
    q: "Kan ik meerdere stuks tegelijk laten printen?",
    a: "Ja, we bieden zowel prototypes als kleine series aan. Voor grotere aantallen maken we een offerte op maat.",
  },
  {
    q: "Kunnen jullie ook prototypes printen?",
    a: "Ja, onze service richt zich sterk op rapid prototyping, zodat je ontwerp snel getest kan worden.",
  },
  {
    q: "Is 3D printen geschikt voor functionele onderdelen?",
    a: "Ja, met materialen zoals PETG en TPU produceren we functionele onderdelen die gebruikt kunnen worden in dagelijkse toepassingen.",
  },
  {
    q: "Bieden jullie nabewerking aan voor 3D prints?",
    a: "We halen supportmateriaal weg en ontbramen licht. Voor schuren, lakken of montage verwijzen we graag door.",
  },
  {
    q: "Voor welke sectoren is 3D printen interessant?",
    a: "3D printen is nuttig voor ondernemers, kmo's, onderwijs, architectuur, productontwikkeling, hobbyisten en verenigingen.",
  },
  {
    q: "Hoe lever ik mijn 3D model het best aan?",
    a: `Gebruik bij voorkeur .STL of .STEP, voeg notities toe over sterkte, afwerking en aantallen. Check je bestand vooraf in de <a href="/viewer">viewer</a> van X3DPrints.`,
  },
  {
    q: "Wat als mijn bestand niet correct is?",
    a: "X3DPrints controleert je bestand en geeft advies of voert kleine correcties door zodat het printbaar is.",
  },
  {
    q: "Kan ik een 3D print laten maken zonder ontwerp?",
    a: "Ja, wij kunnen je helpen bij het opmaken van een eenvoudig 3D ontwerp op basis van jouw idee of schets.",
  },
  {
    q: "Worden mijn bestanden vertrouwelijk behandeld?",
    a: "Ja, alle aangeleverde bestanden worden strikt vertrouwelijk behandeld en enkel gebruikt voor jouw bestelling.",
  },
  {
    q: "Hoe groot kunnen jullie 3D prints zijn?",
    a: "Onze printcapaciteit hangt af van het materiaal en de printer, maar we kunnen zowel kleine details als grotere objecten produceren.",
  },
  {
    q: "Welke afwerkingen zijn mogelijk?",
    a: "Standaard leveren we prints met verwijderde supports en licht ontbraamd. Voor schuren, primer of lak werk je zelf verder of schakelen we een partner in.",
  },
  {
    q: "Kunnen jullie ook onderdelen namaken of vervangen?",
    a: "Ja, mits een goed 3D model of fysiek voorbeeld kunnen we reserveonderdelen of custom componenten printen.",
  },
  {
    q: "Is 3D printen duurzaam?",
    a: "Ja, 3D printen produceert minder afval dan klassieke productiemethoden. PLA is bovendien een biogebaseerd materiaal.",
  },
  {
    q: "Hoe vraag ik een offerte aan voor 3D printen?",
    a: `Upload je bestand via de <a href="/contact">contactpagina</a> van X3DPrints. Je ontvangt binnen 24 uur een duidelijke prijsindicatie.`,
  },
  {
    q: "Welke regio leveren jullie?",
    a: `X3DPrints levert vanuit Herzele/Gent; we verzenden binnen Belgie of je haalt af in overleg. Zie lokale pagina's onder <a href="/locaties">/locaties</a>.`,
  },
  {
    q: "Hoe snel krijg ik een offerte?",
    a: "Meestal binnen 24 uur na je aanvraag met model en korte beschrijving.",
  },
  {
    q: "Kan ik één enkel stuk laten printen?",
    a: "Ja, we printen vanaf één stuk en kunnen ook kleine series leveren.",
  },
  {
    q: "Hoe sterk zijn 3D-geprinte onderdelen?",
    a: "FDM-prints zijn stevig, maar afhankelijk van oriëntatie en materiaal. Ontwerp bepaalt de uiteindelijke sterkte.",
  },
  {
    q: "Kunnen jullie mijn model verbeteren?",
    a: "We voeren basis modelreparaties uit. Voor uitgebreid CAD-werk schakelen we partners in.",
  },
]

export type ServiceFaqItem = (typeof servicesFaq)[number]
