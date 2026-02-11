export const SHOP_INDEXABLE = false

export type LocalizedText = {
  nl: string
  en: string
}

export type ShopProductHighlight = {
  title: LocalizedText
  description: LocalizedText
}

export type ShopProductSpec = {
  label: LocalizedText
  value: LocalizedText
}

export type ShopCategoryKey = "clips" | "organizers"

export type LeadTimeDays = {
  min: number
  max: number
}

export type ShopProduct = {
  slug: string
  name: LocalizedText
  summary: LocalizedText
  description?: LocalizedText
  tags?: string[]
  priceEur: number
  image: { url: string; alt: LocalizedText }
  categories?: ShopCategoryKey[]
  availability?: "InStock" | "PreOrder" | "OutOfStock" | "LimitedAvailability"
  leadTimeDays?: LeadTimeDays
  highlights?: ShopProductHighlight[]
  specs?: ShopProductSpec[]
  isLive: boolean
}

export const SHOP_PRODUCTS: ShopProduct[] = [
  {
    slug: "demo-desk-clip",
    name: {
      nl: "Demo bureaublad clip",
      en: "Demo desk clip",
    },
    summary: {
      nl: "Compacte kabelclip voor je bureau. Demo-item om de shopflow te testen.",
      en: "Compact desk cable clip. Demo item for testing the shop flow.",
    },
    description: {
      nl: "Deze demo-clip toont hoe we productpagina's en contentvelden structureren.",
      en: "This demo clip shows how we structure product pages and content fields.",
    },
    tags: ["desk", "cable", "office"],
    priceEur: 12.5,
    image: {
      url: "/images/filament/pla_basic_domino-tuya.webp",
      alt: {
        nl: "Demo bureaublad clip",
        en: "Demo desk clip",
      },
    },
    categories: ["clips"],
    availability: "PreOrder",
    leadTimeDays: { min: 5, max: 10 },
    highlights: [
      {
        title: { nl: "Snel te printen", en: "Fast to print" },
        description: {
          nl: "Ideaal om de shopflow en productdetails te testen.",
          en: "Ideal for testing the shop flow and product details.",
        },
      },
      {
        title: { nl: "PLA demo", en: "PLA demo" },
        description: {
          nl: "Licht, strak en geschikt als demo voor basic items.",
          en: "Lightweight, clean and suitable for basic demo items.",
        },
      },
      {
        title: { nl: "Content proof", en: "Content proof" },
        description: {
          nl: "Gebruik dit om copy en layout te valideren.",
          en: "Use this to validate copy and layout.",
        },
      },
    ],
    specs: [
      {
        label: { nl: "Materiaal", en: "Material" },
        value: { nl: "PLA (demo)", en: "PLA (demo)" },
      },
      {
        label: { nl: "Kleur", en: "Color" },
        value: { nl: "Mat zwart", en: "Matte black" },
      },
      {
        label: { nl: "Gewicht", en: "Weight" },
        value: { nl: "ca. 12 g", en: "approx. 12 g" },
      },
    ],
    isLive: true,
  },
  {
    slug: "demo-tool-organizer",
    name: {
      nl: "Demo tool organizer",
      en: "Demo tool organizer",
    },
    summary: {
      nl: "Compact organizerbakje als tweede demo voor layout en flow.",
      en: "Compact organizer tray as a second demo for layout and flow.",
    },
    description: {
      nl: "Gebruik deze demo om variaties in specs en highlights te testen.",
      en: "Use this demo to test variations in specs and highlights.",
    },
    tags: ["organizer", "tools", "desk"],
    priceEur: 24.95,
    image: {
      url: "/images/filament/petg_1.webp",
      alt: {
        nl: "Demo tool organizer",
        en: "Demo tool organizer",
      },
    },
    categories: ["organizers"],
    availability: "PreOrder",
    leadTimeDays: { min: 7, max: 12 },
    highlights: [
      {
        title: { nl: "Strak afgewerkt", en: "Clean finish" },
        description: {
          nl: "Geschikt om afwerking en materiaalweergave te tonen.",
          en: "Great for showing finish and material representation.",
        },
      },
      {
        title: { nl: "PETG demo", en: "PETG demo" },
        description: {
          nl: "Toont een tweede materiaalvariant in de listing.",
          en: "Shows a second material variant in the listing.",
        },
      },
      {
        title: { nl: "Layout test", en: "Layout test" },
        description: {
          nl: "Ideaal om cards en beeldverhoudingen te checken.",
          en: "Ideal for checking cards and image ratios.",
        },
      },
    ],
    specs: [
      {
        label: { nl: "Materiaal", en: "Material" },
        value: { nl: "PETG (demo)", en: "PETG (demo)" },
      },
      {
        label: { nl: "Kleur", en: "Color" },
        value: { nl: "Steen grijs", en: "Stone gray" },
      },
      {
        label: { nl: "Gewicht", en: "Weight" },
        value: { nl: "ca. 35 g", en: "approx. 35 g" },
      },
    ],
    isLive: true,
  },
]

export const SHOP_PRODUCT_SLUGS = SHOP_PRODUCTS.filter((product) => product.isLive).map((product) => product.slug)
