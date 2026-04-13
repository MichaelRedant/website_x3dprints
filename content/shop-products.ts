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

export type ShopCategoryKey = "clips" | "organizers" | "spools"

export type ShopPurchaseMode = "cart" | "inquiry"

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
  ogImage?: LocalizedText
  categories?: ShopCategoryKey[]
  availability?: "InStock" | "PreOrder" | "OutOfStock" | "LimitedAvailability"
  stockCount?: number
  leadTimeDays?: LeadTimeDays
  highlights?: ShopProductHighlight[]
  specs?: ShopProductSpec[]
  purchaseMode?: ShopPurchaseMode
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
    isLive: false,
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
    isLive: false,
  },
  {
    slug: "bambu-reusable-spool",
    name: {
      nl: "Bambu reusable spool",
      en: "Bambu reusable spool",
    },
    summary: {
      nl: "Originele Bambu reusable spool uit reststock, gecontroleerd en direct klaar voor een refill. EUR 5.00 per stuk, excl. verzending.",
      en: "Original Bambu reusable spool from leftover stock, checked and ready for a refill. EUR 5.00 per item, excl. shipping.",
    },
    description: {
      nl: "Een laagdrempelige shopstarter voor makers die al met Bambu refills werken. Deze originele reusable spool is gebruikt, maar gecontroleerd op bruikbaarheid en klaar om opnieuw ingezet te worden voor je volgende filament refill.",
      en: "A low-threshold shop starter for makers already using Bambu refills. This original reusable spool is used, but checked for usability and ready to be deployed again for your next filament refill.",
    },
    tags: ["bambu", "spool", "reusable", "refill", "filament", "reststock"],
    priceEur: 5,
    image: {
      url: "/images/webshop/reusable_spool.png",
      alt: {
        nl: "Bambu reusable spool uit reststock",
        en: "Bambu reusable spool from leftover stock",
      },
    },
    ogImage: {
      nl: "/images/og-bambu-reusable-spool-nl.svg",
      en: "/images/og-bambu-reusable-spool-en.svg",
    },
    categories: ["spools"],
    availability: "InStock",
    stockCount: 13,
    leadTimeDays: { min: 1, max: 3 },
    purchaseMode: "inquiry",
    highlights: [
      {
        title: { nl: "Originele Bambu basis", en: "Original Bambu base" },
        description: {
          nl: "Geen generieke clone, maar een originele reusable spool voor Bambu refills.",
          en: "Not a generic clone, but an original reusable spool for Bambu refills.",
        },
      },
      {
        title: { nl: "Refill-ready", en: "Refill-ready" },
        description: {
          nl: "Ideaal als extra spool wanneer je losse refills gebruikt of reserve wil houden.",
          en: "Ideal as an extra spool when you use loose refills or want a spare on hand.",
        },
      },
      {
        title: { nl: "Beperkte reststock", en: "Limited leftover stock" },
        description: {
          nl: "Beschikbaarheid hangt af van de actuele reststock. Daarom loopt bestelling voorlopig via aanvraag zodat stock correct bevestigd blijft.",
          en: "Availability depends on the current leftover stock. That is why ordering still runs through a request flow so stock can be confirmed correctly.",
        },
      },
    ],
    specs: [
      {
        label: { nl: "Type", en: "Type" },
        value: { nl: "Bambu reusable spool", en: "Bambu reusable spool" },
      },
      {
        label: { nl: "Conditie", en: "Condition" },
        value: { nl: "Gebruikt, gecontroleerd en opnieuw inzetbaar", en: "Used, checked, and ready to reuse" },
      },
      {
        label: { nl: "Compatibiliteit", en: "Compatibility" },
        value: { nl: "Voor Bambu filament refills", en: "For Bambu filament refills" },
      },
      {
        label: { nl: "Prijs", en: "Price" },
        value: { nl: "EUR 5.00 per stuk excl. verzending", en: "EUR 5.00 per item excl. shipping" },
      },
      {
        label: { nl: "Voorraad", en: "Stock" },
        value: { nl: "Actuele stock zichtbaar op de productpagina", en: "Current stock shown on the product page" },
      },
      {
        label: { nl: "Afhandeling", en: "Fulfilment" },
        value: { nl: "Bestellen via aanvraag, afhalen of verzending", en: "Order via request, pickup or shipping" },
      },
    ],
    isLive: true,
  },
]

export const SHOP_PRODUCT_SLUGS = SHOP_PRODUCTS.filter((product) => product.isLive).map((product) => product.slug)
