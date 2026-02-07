import { type Locale } from "@/lib/i18n/locales"

export const servicesFaqNl = [
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
    a: "Meestal enkele werkdagen, afhankelijk van volume, materiaal en eventuele afwerking. Spoed of een strakke deadline? Laat het weten, dan plannen we mee.",
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
    q: "Kan ik ook voor een stuk terecht?",
    a: "Ja, we printen vanaf een stuk en maken batches voor kleine reeksen.",
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
    a: 'Productie gebeurt vanuit Herzele/Gent; we verzenden binnen Belgie of je haalt af in overleg. Zie lokale pagina\'s onder <a href="/locaties">/locaties</a>.',
  },
]

export const servicesFaqEn = [
  {
    q: "Which files work best?",
    a: "STEP and STL are ideal. Add details about critical dimensions, desired finish and the environment the part must handle.",
  },
  {
    q: "What tolerances can I expect?",
    a: "For FDM we typically aim for +/-0.2 mm on normal geometry. Tight fits? Let us know so we can align print orientation and post-processing.",
  },
  {
    q: "How fast do you deliver?",
    a: "Usually within a few business days, depending on volume, material and any finishing. Tight deadline? Tell us and we will plan with you.",
  },
  {
    q: "Do you help with material selection?",
    a: "Yes. We match your use case with PLA, PETG or TPU. UV, heat or chemical exposure? We advise what holds up best.",
  },
  {
    q: "How much does 3D printing cost?",
    a: 'Price = material + print time + basic post-processing + quantity. Use the guidelines on <a href="/en/pricing">/pricing</a>; we confirm after a model check.',
  },
  {
    q: "Do you offer post-processing and assembly?",
    a: "We remove supports and deburr lightly. Sanding/primer/paint or inserts and simple assembly can be discussed and depend on scope.",
  },
  {
    q: "Can I order a single piece?",
    a: "Yes, we print from a single piece and also run small-batch series.",
  },
  {
    q: "How should I submit my 3D model?",
    a: 'Preferably STL or STEP with notes on strength, finish and quantities. Check your file upfront in the <a href="/en/viewer">viewer</a>.',
  },
  {
    q: "What about privacy and NDAs?",
    a: "Files stay internal and are not shared with third parties. An NDA is possible on request.",
  },
  {
    q: "Which region do you serve?",
    a: 'Production happens in Herzele/Ghent; we ship within Belgium or you can pick up by arrangement. See local pages under <a href="/en/locaties">/locaties</a>.',
  },
]

export const servicesFaq = servicesFaqNl

export type ServiceFaqItem = (typeof servicesFaqNl)[number]

export function servicesFaqByLocale(locale: Locale) {
  return locale === "en" ? servicesFaqEn : servicesFaqNl
}
