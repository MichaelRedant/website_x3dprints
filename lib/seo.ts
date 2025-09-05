// /lib/seo.ts
export const SITE = {
  name: "X3DPrints",
  url: "https://www.x3dprints.be",
  title: "X3DPrints — 3D Print Service",
  description:
    "Professionele 3D print service in België. Snel, nauwkeurig en betaalbaar. Upload je model en ontvang een offerte.",
  ogImage: "/og-x3dprints.jpg",
  locale: "nl_BE",
  phone: "+32 496 90 85 03",
  address: {
    street: "Provincieweg 34a",
    locality: "Borsbeke",
    region: "Oost-Vlaanderen",
    postalCode: "9552",
    country: "BE"
  },
  sameAs: [
    "https://www.linkedin.com/company/x3dprints",
    "https://www.instagram.com/x3dprints"
  ]
}

// /lib/seo.ts
export function clampToWords(input: string, max = 155): string {
  const s = input.replace(/\s+/g, " ").trim()
  if (s.length <= max) return s
  const cut = s.slice(0, max)
  const lastSpace = cut.lastIndexOf(" ")
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut).replace(/[.,;:–-]+$/,"")
}

export function buildCityMetaDescription(city: string): string {
  // Kort, uniek, niet afgekapt (±150–160 chars)
  const msg = `3D printen in ${city} door X3DPrints: prototypes en kleine series, strakke afwerking. Levertijd 2–5 werkdagen. Materialen: PLA, PETG, TPU. Vraag je offerte.`
  return clampToWords(msg, 158)
}

// Optioneel: haal eerste paragraaf uit markdown content en maak die snippet-waardig
export function makeDescriptionFromMarkdown(md: string, city: string): string {
  const firstPara = md.split(/\n{2,}/).find(p => p.trim().length > 0) || ""
  // simpele Markdown/HTML strip
  const txt = firstPara
    .replace(/`{1,3}[^`]*`{1,3}/g, "")       // inline code
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")    // images
    .replace(/\[[^\]]*\]\([^)]+\)/g, "")     // links
    .replace(/[*_>#~`]/g, "")                // md marks
    .replace(/<[^>]+>/g, "")                 // html
    .replace(/\s+/g, " ")
    .trim()

  // Fallback op city-bouwer als paragraaf te kort is
  const candidate = txt.length > 60 ? txt : buildCityMetaDescription(city)
  return clampToWords(candidate, 158)
}
