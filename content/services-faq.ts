export const servicesFaq = [
  {
    q: "Welke bestanden werken het beste?",
    a: "STEP en STL zijn ideaal. Voeg info toe over kritieke maten, gewenste afwerking en de omgeving waarin het onderdeel moet presteren.",
  },
  {
    q: "Welke toleranties kan ik verwachten?",
    a: "Voor FDM hanteren we typisch +/-0,2 mm bij normale geometrie. Kritieke passing? Vermeld dit zodat we printorientatie en nabewerking hierop afstemmen.",
  },
  {
    q: "Hoe snel leveren jullie?",
    a: "Standaard 2-5 werkdagen afhankelijk van volume, materiaal en eventuele afwerking. Spoed of een strakke deadline? Laat het weten, dan plannen we mee.",
  },
  {
    q: "Helpen jullie mee met materiaalkeuze?",
    a: "Ja. We matchen jouw toepassing met PLA, PETG of TPU. UV, hitte of chemische belasting? We adviseren wat het best standhoudt.",
  },
  {
    q: "Wat kost 3D printen?",
    a: 'Prijs = materiaal + printtijd + basis nabewerking + oplage. Gebruik de richtprijzen op <a href="/pricing">/pricing</a>; we bevestigen na modelcontrole.',
  },
  {
    q: "Bieden jullie nabewerking en montage aan?",
    a: "We verwijderen support en ontbramen licht. Schuren/primer/lak of inserts en simpele montage kan in overleg en hangt af van de scope.",
  },
  {
    q: "Kan ik ook voor Ã©Ã©n stuk terecht?",
    a: "Ja, we printen vanaf Ã©Ã©n stuk en maken batches voor kleine reeksen.",
  },
  {
    q: "Hoe lever ik mijn 3D model het best aan?",
    a: 'Gebruik bij voorkeur STL of STEP en voeg notities toe over sterkte, afwerking en aantallen. Check je bestand vooraf in de <a href="/viewer">viewer</a>.',
  },
  {
    q: "Hoe zit het met privacy en NDA's?",
    a: "Bestanden blijven intern en we delen niets met derden. Een NDA kan op aanvraag.",
  },
  {
    q: "Welke regio leveren jullie?",
    a: 'Productie gebeurt vanuit Herzele/Gent; we verzenden binnen België of je haalt af in overleg. Zie lokale pagina\'s onder <a href="/locaties">/locaties</a>.',
  },
]

export type ServiceFaqItem = (typeof servicesFaq)[number]

