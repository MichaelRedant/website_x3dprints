export const SHOP_INDEXABLE = true

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

export type ShopProductFaqItem = {
  question: LocalizedText
  answer: LocalizedText
}

export type ShopProductResourceLink = {
  eyebrow?: LocalizedText
  title: LocalizedText
  description: LocalizedText
  href: LocalizedText
  cta: LocalizedText
}

export type ShopProductImage = {
  url: string
  alt: LocalizedText
}

export type ShopCategoryKey = "clips" | "organizers" | "spools" | "outdoor"

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
  image: ShopProductImage
  imageFit?: "cover" | "contain"
  gallery?: ShopProductImage[]
  ogImage?: LocalizedText
  categories?: ShopCategoryKey[]
  availability?: "InStock" | "PreOrder" | "OutOfStock" | "LimitedAvailability"
  stockCount?: number
  leadTimeDays?: LeadTimeDays
  highlights?: ShopProductHighlight[]
  specs?: ShopProductSpec[]
  faq?: ShopProductFaqItem[]
  resourceLinks?: ShopProductResourceLink[]
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
    faq: [
      {
        question: {
          nl: "Kan ik deze demo echt bestellen?",
          en: "Can I actually order this demo item?",
        },
        answer: {
          nl: "Nee. Dit demo-item is vooral bedoeld om de shopflow, productcopy en layout te testen voordat er echte producten live gaan.",
          en: "No. This demo item mainly exists to test the shop flow, product copy, and layout before real products go live.",
        },
      },
      {
        question: {
          nl: "Waarom staat een demo-product in de shopdata?",
          en: "Why is a demo product present in the shop data?",
        },
        answer: {
          nl: "Zo kunnen we nieuwe shopfuncties en templates veilig voorbereiden zonder meteen live commerciële producten te moeten toevoegen.",
          en: "This lets us prepare new shop features and templates safely without having to add live commercial products immediately.",
        },
      },
      {
        question: {
          nl: "Wordt deze pagina mee geïndexeerd?",
          en: "Will this page be indexed?",
        },
        answer: {
          nl: "Nee. Alleen producten met <code>isLive: true</code> komen in de live shoproutes en sitemap terecht.",
          en: "No. Only products with <code>isLive: true</code> are included in live shop routes and the sitemap.",
        },
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
    faq: [
      {
        question: {
          nl: "Is dit een echte organizer die live te koop staat?",
          en: "Is this a real organizer that is already for sale?",
        },
        answer: {
          nl: "Nee. Dit is een demo-item om de structuur van de shop, productkaarten en detailpagina's te testen.",
          en: "No. This is a demo item used to test the structure of the shop, product cards, and detail pages.",
        },
      },
      {
        question: {
          nl: "Waarom gebruiken jullie demo-organizers?",
          en: "Why do you use demo organizers?",
        },
        answer: {
          nl: "Omdat we zo categorieën, beeldverhoudingen en productblokken kunnen verfijnen voordat echte organizerproducten live verschijnen.",
          en: "Because this lets us refine categories, image ratios, and product blocks before real organizer products go live.",
        },
      },
      {
        question: {
          nl: "Kan dit later vervangen worden door echte shopcontent?",
          en: "Can this later be replaced by real shop content?",
        },
        answer: {
          nl: "Ja. De demo-content is enkel een technische tussenstap en kan later vervangen worden door echte organizerproducten met eigen SEO-copy.",
          en: "Yes. The demo content is only a technical interim step and can later be replaced by real organizer products with their own SEO copy.",
        },
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
      nl: "Originele Bambu reusable spool uit reststock, gecontroleerd en direct klaar voor een refill. Per stuk of in kleine reeks aan te vragen, met afhalen of verzending na bevestiging.",
      en: "Original Bambu reusable spool from leftover stock, checked and ready for a refill. Available per piece or in small quantities, with pickup or shipping confirmed afterwards.",
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
    gallery: [
      {
        url: "/images/webshop/reusable_spool-detail.webp",
        alt: {
          nl: "Detailbeeld van de kern en perforaties van een Bambu reusable spool",
          en: "Detail view of the hub and perforated surface of a Bambu reusable spool",
        },
      },
    ],
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
        label: { nl: "Voorraad", en: "Stock" },
        value: { nl: "Actuele stock zichtbaar op de productpagina", en: "Current stock shown on the product page" },
      },
      {
        label: { nl: "Afhandeling", en: "Fulfilment" },
        value: { nl: "Via offerteaanvraag, afhalen of verzending", en: "Via quote request, pickup or shipping" },
      },
    ],
    faq: [
      {
        question: {
          nl: "Is dit een originele Bambu reusable spool?",
          en: "Is this an original Bambu reusable spool?",
        },
        answer: {
          nl: "Ja. Dit is een originele Bambu reusable spool uit reststock, geen generieke clone. Elke spool wordt nagekeken op bruikbaarheid voordat hij opnieuw aangeboden wordt.",
          en: "Yes. This is an original Bambu reusable spool from leftover stock, not a generic clone. Each spool is checked for usability before it is offered again.",
        },
      },
      {
        question: {
          nl: "Zijn deze spools nieuw of gebruikt?",
          en: "Are these spools new or used?",
        },
        answer: {
          nl: "Deze spools zijn gebruikt, maar gecontroleerd en opnieuw inzetbaar. Ze zijn bedoeld voor klanten die extra Bambu spools zoeken voor refills of reservegebruik.",
          en: "These spools are used, but checked and ready to reuse. They are intended for customers who want extra Bambu spools for refills or spare use.",
        },
      },
      {
        question: {
          nl: "Hoe verloopt bestellen of aanvragen van deze spool?",
          en: "How does ordering or requesting this spool work?",
        },
        answer: {
          nl: "Voorlopig verloopt dit product via een offerteaanvraag. Zo bevestigen we eerst het gewenste aantal, de actuele stock, de verzendkost of een afhaalmoment in Herzele.",
          en: "For now, this product runs through a quote request. That lets us confirm the desired quantity, current stock, shipping cost, or a pickup moment in Herzele first.",
        },
      },
      {
        question: {
          nl: "Kan ik meerdere stuks tegelijk aanvragen?",
          en: "Can I request multiple spools at once?",
        },
        answer: {
          nl: "Ja. Geef in het shopformulier aan hoeveel spools je wil. We bevestigen daarna of het gevraagde aantal meteen beschikbaar is en hoe levering of afhalen best verloopt.",
          en: "Yes. Enter the quantity you want in the shop form. We then confirm whether that quantity is immediately available and how shipping or pickup is best handled.",
        },
      },
    ],
    resourceLinks: [
      {
        eyebrow: {
          nl: "Gids",
          en: "Guide",
        },
        title: {
          nl: "Bambu printerinstellingen en refill-workflow",
          en: "Bambu printer settings and refill workflow",
        },
        description: {
          nl: "Lees onze gids met praktische Bambu instellingen, AMS aandachtspunten en wanneer extra reusable spools handig zijn in een refill-setup.",
          en: "Read our guide with practical Bambu settings, AMS notes, and when extra reusable spools make sense in a refill workflow.",
        },
        href: {
          nl: "/blog/beste-instellingen-bambu-printer",
          en: "/en/blog/beste-instellingen-bambu-printer",
        },
        cta: {
          nl: "Lees de Bambu gids",
          en: "Read the Bambu guide",
        },
      },
    ],
    isLive: true,
  },
  {
    slug: "selectieve-hoornaarval-deksel",
    name: {
      nl: "Hoornaarval deksel voor selectieve hoornaarvallen",
      en: "Selective hornet trap lid for wide-mouth jars",
    },
    summary: {
      nl: "Hoornaarval deksel voor selectieve hoornaarvallen tegen de Aziatische hoornaar. 3D geprint in PETG, passend op standaard glazen potten en per stuk of in kleine reeks aan te vragen.",
      en: "Selective hornet trap lid for Asian hornet monitoring. 3D printed in PETG, designed for standard wide-mouth glass jars, and available per piece or in small batches.",
    },
    description: {
      nl: "Zoek je een hoornaarval of meerdere hoornaarvallen voor monitoring van de Aziatische hoornaar? Dit 3D geprinte hoornaarval deksel is bedoeld voor selectieve hoornaarvallen op basis van een standaard glazen pot. Je koopt alleen het deksel, niet de pot zelf. Daardoor blijft de instap laag en kan je snel een betaalbare, herbruikbare hoornaarval opzetten voor tuin, imker, vereniging, gemeente of lokaal initiatief. Het onderdeel wordt in PETG geprint voor buitengebruik, vochtbestendigheid en een betrouwbare pasvorm op potten met brede opening.",
      en: "Looking for one or more hornet traps for Asian hornet monitoring? This 3D printed hornet trap lid is made for selective trap setups built around a standard glass jar. You buy the lid only, not the jar itself. That keeps the setup affordable and reusable for gardens, beekeepers, local initiatives, associations, and councils. The part is printed in PETG for outdoor use, moisture resistance, and a reliable fit on wide-mouth jars.",
    },
    tags: [
      "hoornaarval",
      "hoornaarvallen",
      "aziatische hoornaar",
      "selectieve hoornaarval",
      "selectieve hoornaarvallen",
      "hoornaarval deksel",
      "petg",
      "outdoor",
      "monitoring",
    ],
    priceEur: 4,
    image: {
      url: "/images/webshop/hoornaarvallen.jpg",
      alt: {
        nl: "Selectieve hoornaarvallen met 3D geprint deksel voor glazen potten",
        en: "Selective hornet traps with a 3D printed lid for glass jars",
      },
    },
    imageFit: "contain",
    gallery: [
      {
        url: "/images/webshop/selectieve-hoornaarval-deksel.webp",
        alt: {
          nl: "Detailbeeld van het 3D geprinte hoornaarval deksel",
          en: "Detail view of the 3D printed hornet trap lid",
        },
      },
      {
        url: "/images/portfolio/hoornaarval2.webp",
        alt: {
          nl: "Selectieve hoornaarval in context met glazen pot en buitenopstelling",
          en: "Selective hornet trap in context with glass jar and outdoor setup",
        },
      },
    ],
    ogImage: {
      nl: "/images/og-selectieve-hoornaarval-deksel-nl.svg",
      en: "/images/og-selectieve-hoornaarval-deksel-en.svg",
    },
    categories: ["outdoor"],
    availability: "PreOrder",
    leadTimeDays: { min: 2, max: 5 },
    purchaseMode: "inquiry",
    highlights: [
      {
        title: { nl: "Betaalbare basis voor meerdere hoornaarvallen", en: "Affordable base for multiple hornet traps" },
        description: {
          nl: "Je koopt alleen het 3D geprinte deksel. Zo kan je een standaard glazen pot hergebruiken en voordelig een of meerdere hoornaarvallen opzetten.",
          en: "You buy the 3D printed lid only. That lets you reuse a standard glass jar and build one or multiple hornet traps at a low entry cost.",
        },
      },
      {
        title: { nl: "Selectieve hoornaarval tegen de Aziatische hoornaar", en: "Selective trap geometry for the Asian hornet" },
        description: {
          nl: "De trechter en openingen zijn ontworpen voor een selectieve hoornaarval waarbij kleinere insecten meer ontsnappingskans krijgen dan in een klassieke val.",
          en: "The funnel and openings are designed for a selective hornet trap where smaller insects have a better chance to escape than in a generic trap.",
        },
      },
      {
        title: { nl: "PETG voor buitengebruik", en: "PETG for outdoor use" },
        description: {
          nl: "Deze hoornaarval wordt in PETG geprint zodat het deksel beter omgaat met vocht, buitengebruik en wisselende temperaturen.",
          en: "This hornet trap lid is printed in PETG so it handles moisture, outdoor exposure, and changing temperatures more reliably.",
        },
      },
    ],
    specs: [
      {
        label: { nl: "Type", en: "Type" },
        value: { nl: "Hoornaarval deksel voor selectieve hoornaarvallen", en: "Selective hornet trap lid" },
      },
      {
        label: { nl: "Inbegrepen", en: "Included" },
        value: { nl: "Alleen het deksel, glazen pot niet inbegrepen", en: "Lid only, glass jar not included" },
      },
      {
        label: { nl: "Materiaal", en: "Material" },
        value: { nl: "PETG voor buitengebruik en vochtbestendigheid", en: "PETG for outdoor use and moisture resistance" },
      },
      {
        label: { nl: "Pasvorm", en: "Fit" },
        value: { nl: "Voor standaard glazen potten met brede opening", en: "For standard wide-mouth glass jars" },
      },
      {
        label: { nl: "Gebruik", en: "Use" },
        value: { nl: "Selectieve hoornaarvallen voor monitoring en voorjaarstoepassingen volgens lokale richtlijnen", en: "Selective hornet traps for monitoring and early-season use in line with local guidance" },
      },
      {
        label: { nl: "Doelgroep", en: "Intended users" },
        value: {
          nl: "Particulieren, imkers, verenigingen, gemeenten en lokale acties",
          en: "Private customers, beekeepers, associations, councils, and local actions",
        },
      },
    ],
    faq: [
      {
        question: {
          nl: "Koop ik hier een volledige hoornaarval of alleen het deksel?",
          en: "Am I buying a full hornet trap or only the lid?",
        },
        answer: {
          nl: "Je koopt alleen het 3D geprinte deksel. De glazen pot is niet inbegrepen. Zo kan je zelf een geschikte pot hergebruiken en blijft de prijs laag.",
          en: "You are buying the 3D printed lid only. The glass jar is not included. That lets you reuse a suitable jar yourself and keeps the price low.",
        },
      },
      {
        question: {
          nl: "Past dit deksel op standaard potten voor hoornaarvallen?",
          en: "Does this lid fit standard jars used for hornet traps?",
        },
        answer: {
          nl: "Het deksel is bedoeld voor standaard glazen potten met brede opening. Twijfel je over de maat, stuur dan gerust een foto of afmetingen mee in je aanvraag zodat we de pasvorm kunnen nakijken.",
          en: "The lid is intended for standard wide-mouth glass jars. If you are unsure about the size, include a photo or dimensions in your request so we can verify the fit.",
        },
      },
      {
        question: {
          nl: "Is dit deksel bedoeld voor de Aziatische hoornaar?",
          en: "Is this lid intended for the Asian hornet?",
        },
        answer: {
          nl: "Ja. Dit ontwerp is bedoeld voor een selectieve valopstelling tegen de Aziatische hoornaar. Gebruik het altijd in combinatie met de lokale richtlijnen voor plaatsing, opvolging en identificatie.",
          en: "Yes. This design is intended for a selective trap setup aimed at the Asian hornet. Always use it in combination with local guidance for placement, follow-up, and identification.",
        },
      },
      {
        question: {
          nl: "Wat is het verschil tussen een gewone en een selectieve hoornaarval?",
          en: "What is the difference between a generic and a selective hornet trap?",
        },
        answer: {
          nl: "Een selectieve hoornaarval probeert de Aziatische hoornaar te vangen terwijl kleinere insecten meer kans krijgen om te ontsnappen. Dat maakt de opstelling gerichter dan een klassieke val zonder selectieve openingen.",
          en: "A selective hornet trap is designed to target the Asian hornet while giving smaller insects a better chance to escape. That makes the setup more selective than a generic trap without escape openings.",
        },
      },
      {
        question: {
          nl: "Kan ik meerdere hoornaarvallen aanvragen voor tuin, vereniging of gemeente?",
          en: "Can I request multiple hornet trap lids for a garden, association, or council?",
        },
        answer: {
          nl: "Ja. Dit product kan per stuk of in kleine batches aangevraagd worden. Vermeld in je shopaanvraag hoeveel hoornaarval deksels je nodig hebt en of het om afhalen of verzending gaat.",
          en: "Yes. This product can be requested per piece or in small batches. Mention how many hornet trap lids you need and whether you prefer pickup or shipping.",
        },
      },
      {
        question: {
          nl: "Waarom kiezen klanten voor een los hoornaarval deksel in plaats van een volledige set?",
          en: "Why do customers choose a separate hornet trap lid instead of a full kit?",
        },
        answer: {
          nl: "Omdat je met een los hoornaarval deksel snel en betaalbaar meerdere selectieve hoornaarvallen kan opzetten met potten die je al hebt. Dat maakt lokale acties, tests of kleine reeksen veel haalbaarder.",
          en: "Because a separate hornet trap lid lets you build one or several selective traps quickly and affordably with jars you already have. That makes local actions, testing, or small batches much easier to organise.",
        },
      },
    ],
    resourceLinks: [
      {
        eyebrow: {
          nl: "Case",
          en: "Case",
        },
        title: {
          nl: "Case: selectieve hoornaarval in Sint-Lievens-Houtem",
          en: "Case: selective hornet trap in Sint-Lievens-Houtem",
        },
        description: {
          nl: "Lees hoe deze selectieve hoornaarval werd uitgewerkt, getest en lokaal ingezet tegen de Aziatische hoornaar.",
          en: "Read how this selective hornet trap was designed, tested, and deployed locally against the Asian hornet.",
        },
        href: {
          nl: "/cases/selectieve-val-aziatische-hoornaar-sint-lievens-houtem",
          en: "/en/cases/selectieve-val-aziatische-hoornaar-sint-lievens-houtem",
        },
        cta: {
          nl: "Bekijk de hoornaarval case",
          en: "View the hornet trap case",
        },
      },
      {
        eyebrow: {
          nl: "Gids",
          en: "Guide",
        },
        title: {
          nl: "Waarom PETG werkt voor hoornaarvallen buiten",
          en: "Why PETG works for outdoor hornet traps",
        },
        description: {
          nl: "Onze outdoor gids legt uit waarom PETG beter past dan PLA voor hoornaarvallen in regen, UV en wisselende temperaturen.",
          en: "Our outdoor guide explains why PETG is a better fit than PLA for hornet traps exposed to rain, UV, and changing temperatures.",
        },
        href: {
          nl: "/blog/hoe-3d-print-je-onderdelen-voor-buitengebruik",
          en: "/en/blog/hoe-3d-print-je-onderdelen-voor-buitengebruik",
        },
        cta: {
          nl: "Lees waarom PETG werkt",
          en: "Read why PETG works",
        },
      },
    ],
    isLive: true,
  },
]

export const SHOP_PRODUCT_SLUGS = SHOP_PRODUCTS.filter((product) => product.isLive).map((product) => product.slug)
