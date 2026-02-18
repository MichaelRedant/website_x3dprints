export type GoogleReviewEntry = {
  id: string
  author: string
  authorMeta: string
  relativeDate: {
    nl: string
    en: string
  }
  quote: {
    nl: string
    en: string
  }
}

export const GOOGLE_REVIEW_SUMMARY = {
  ratingValue: 5,
  reviewCount: 4,
  viewUrl: "https://www.google.com/maps/search/?api=1&query=X3DPrints+Herzele",
  leaveUrl: "https://g.page/r/CSpxVPgHhTzZEAE/review",
} as const

export const GOOGLE_REVIEW_ENTRIES: GoogleReviewEntry[] = [
  {
    id: "david-opstaele",
    author: "David Opstaele",
    authorMeta: "Local Guide · 31 reviews · 16 photos",
    relativeDate: {
      nl: "3 weken geleden",
      en: "3 weeks ago",
    },
    quote: {
      nl: "Vlot overleg en goeie kwaliteit. We zaten direct op hetzelfde spoor waardoor de print perfect afgewerkt is. Heel tevreden van de communicatie en productie. Een aanrader.",
      en: "Smooth communication and strong quality. We aligned quickly, which led to a perfectly finished print. Very happy with both communication and production.",
    },
  },
  {
    id: "octopus-accountancy",
    author: "Octopus Accountancy Software",
    authorMeta: "1 review",
    relativeDate: {
      nl: "10 weken geleden",
      en: "10 weeks ago",
    },
    quote: {
      nl: "We hebben met Octopus een staande bestelling lopen van gadgets. Zeer tevreden, denkt mee met wat we kunnen doen en wat beste is prijs en kwaliteit.",
      en: "We run an ongoing gadget order with Octopus. Very satisfied, and he actively thinks along about the best balance between price and quality.",
    },
  },
  {
    id: "pieter-jan-casteels",
    author: "Pieter-Jan Casteels",
    authorMeta: "Local Guide · 22 reviews · 25 photos",
    relativeDate: {
      nl: "12 weken geleden",
      en: "12 weeks ago",
    },
    quote: {
      nl: "X3DPrints maakte voor ons een QR-plaat op maat voor NaSiam. Uitstekende materiaalkwaliteit, professioneel ontwerp, snelle levering en sterke communicatie. Ze dachten actief mee over de beste uitvoering voor onze toepassing.",
      en: "X3DPrints produced a custom QR plate for NaSiam. Excellent material quality, professional design, fast delivery and clear communication. They actively advised on the best execution for our use case.",
    },
  },
  {
    id: "peter-ponnet",
    author: "Peter Ponnet",
    authorMeta: "1 review",
    relativeDate: {
      nl: "13 weken geleden",
      en: "13 weeks ago",
    },
    quote: {
      nl: "Meerdere kleine items laten printen en super tevreden.",
      en: "Had several small items printed and I am very satisfied.",
    },
  },
]

export function getReviewIndexFromSeed(seed: string, total: number) {
  if (total <= 0) return 0
  const normalized = seed.trim().toLowerCase()
  if (!normalized) return 0
  let hash = 0
  for (let i = 0; i < normalized.length; i += 1) {
    hash = (hash * 31 + normalized.charCodeAt(i)) >>> 0
  }
  return hash % total
}

