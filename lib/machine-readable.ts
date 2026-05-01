import { getCaseStudies } from "@/content/case-studies"
import { SHOP_INDEXABLE } from "@/content/shop-products"
import { MATERIAL_ORDER, MATERIAL_SLUGS, materialsByLocale } from "@/lib/materials"
import { SITE } from "@/lib/seo"
import { getShopProducts } from "@/lib/shop-data"

type FeedLocale = "nl" | "en"
type ConversionValue = "low" | "medium" | "high"
type PrimaryIntent = "commercial" | "informational" | "comparison" | "local_discovery"

type RelatedPage = {
  title: string
  url: string
  xref: string
}

type ContentMapItem = {
  aliases: string[]
  avoid_when: string[]
  cluster: string
  cluster_role: string
  conversion_value: ConversionValue
  description: string
  keywords: string[]
  namespace: string
  page_type: string
  primary_intent: PrimaryIntent
  primary_topic: string
  priority_score: number
  recommended_when: string[]
  rel_url: string
  related_pages: RelatedPage[]
  secondary_topics: string[]
  title: string
  url: string
  xref: string
}

type FeedLinkMap = {
  business: string
  services: string
  materials: string
  shop?: string
  cases: string
  content_map: string
}

type ServiceFeedItem = {
  id: string
  title: string
  summary: string
  url: string
  page_type: string
  primary_intent: PrimaryIntent
  conversion_value: ConversionValue
  keywords: string[]
}

type ManifestFeed = {
  feeds: FeedLinkMap
  generated_at: string
  language: FeedLocale
  notes: string[]
  schema_version: string
}

const BASE_URL = SITE.url.replace(/\/+$/, "")
const SCHEMA_VERSION = "2026-04-21"
const CORE_REGIONS_NL = ["Herzele", "Gent", "Aalst", "Oudenaarde", "Geraardsbergen", "Oost-Vlaanderen", "Belgie"]
const CORE_REGIONS_EN = ["Herzele", "Ghent", "Aalst", "Oudenaarde", "Geraardsbergen", "East Flanders", "Belgium"]

const CURATED_SERVICES: Record<FeedLocale, ServiceFeedItem[]> = {
  nl: [
    {
      id: "fdm-printing",
      title: "FDM 3D-printen",
      summary: "3D print service voor onderdelen, prototypes en kleine reeksen in PLA, PETG en TPU.",
      url: `${BASE_URL}/services/`,
      page_type: "service_hub",
      primary_intent: "commercial",
      conversion_value: "high",
      keywords: ["3d print service", "3d printen op maat", "onderdelen printen", "prototypes printen"],
    },
    {
      id: "3d-modeling",
      title: "3D modelleren op maat",
      summary: "Laat een nieuw onderdeel of idee uitwerken tot een printklaar 3D model.",
      url: `${BASE_URL}/3d-modelleren/`,
      page_type: "service_detail",
      primary_intent: "commercial",
      conversion_value: "high",
      keywords: ["3d modelleren", "3d model laten maken", "cad voor 3d printen"],
    },
    {
      id: "material-advice",
      title: "Materiaaladvies",
      summary: "Gebruik de Material Suggestion Tool of vraag persoonlijk advies over PLA, PETG, TPU en specials.",
      url: `${BASE_URL}/materials/#material-suggestion-tool`,
      page_type: "decision_tool",
      primary_intent: "comparison",
      conversion_value: "medium",
      keywords: ["welk 3d print materiaal", "pla of petg", "tpu advies"],
    },
    {
      id: "tool-organizers",
      title: "Tool organizers op maat",
      summary: "Gridfinity, Packout, TSTAK en custom organizers met vaste layouts en duidelijke intake.",
      url: `${BASE_URL}/organizers/`,
      page_type: "service_hub",
      primary_intent: "commercial",
      conversion_value: "high",
      keywords: ["tool organizers", "gridfinity op maat", "packout organizer", "tstak insert"],
    },
    ...(SHOP_INDEXABLE
      ? [
          {
            id: "shop-products",
            title: "Shopproducten op aanvraag",
            summary: "Quote-first shop met kleine voorraaditems en eigen ontwerpen zonder zware checkoutlaag.",
            url: `${BASE_URL}/shop/`,
            page_type: "shop_hub",
            primary_intent: "commercial" as const,
            conversion_value: "high" as const,
            keywords: ["3d print shop", "3d print producten", "3d print accessoires"],
          },
        ]
      : []),
  ],
  en: [
    {
      id: "fdm-printing",
      title: "FDM 3D printing",
      summary: "3D printing service for parts, prototypes and short runs in PLA, PETG and TPU.",
      url: `${BASE_URL}/en/services/`,
      page_type: "service_hub",
      primary_intent: "commercial",
      conversion_value: "high",
      keywords: ["3d printing service", "custom 3d printing", "replacement parts", "prototype printing"],
    },
    {
      id: "3d-modeling",
      title: "Custom 3D modeling",
      summary: "Turn a new part or idea into a printable 3D model.",
      url: `${BASE_URL}/en/3d-modelleren/`,
      page_type: "service_detail",
      primary_intent: "commercial",
      conversion_value: "high",
      keywords: ["3d modeling service", "custom cad", "3d model for printing"],
    },
    {
      id: "material-advice",
      title: "Material guidance",
      summary: "Use the Material Suggestion Tool or request direct guidance on PLA, PETG, TPU and specials.",
      url: `${BASE_URL}/en/materials/#material-suggestion-tool`,
      page_type: "decision_tool",
      primary_intent: "comparison",
      conversion_value: "medium",
      keywords: ["best 3d printing material", "pla vs petg", "tpu guidance"],
    },
    {
      id: "tool-organizers",
      title: "Custom tool organizers",
      summary: "Gridfinity, Packout, TSTAK and custom organizers with fixed layouts and clear intake steps.",
      url: `${BASE_URL}/en/organizers/`,
      page_type: "service_hub",
      primary_intent: "commercial",
      conversion_value: "high",
      keywords: ["tool organizers", "gridfinity custom", "packout insert", "tstak organizer"],
    },
    ...(SHOP_INDEXABLE
      ? [
          {
            id: "shop-products",
            title: "Quote-first shop products",
            summary: "Low-friction shop for stocked items and in-house designs without a heavy checkout flow.",
            url: `${BASE_URL}/en/shop/`,
            page_type: "shop_hub",
            primary_intent: "commercial" as const,
            conversion_value: "high" as const,
            keywords: ["3d print shop", "3d printed products", "3d print accessories"],
          },
        ]
      : []),
  ],
}

const CURATED_KNOWLEDGE_PAGES: Record<FeedLocale, Omit<ContentMapItem, "aliases" | "related_pages">[]> = {
  nl: [
    {
      avoid_when: ["book_now_only"],
      cluster: "materials",
      cluster_role: "supporting",
      conversion_value: "medium",
      description: "Vergelijk PLA en PETG op slagvastheid, hitte, look en typische toepassingen.",
      keywords: ["pla vs petg", "verschil pla petg", "welk materiaal kiezen"],
      namespace: "blog",
      page_type: "comparison_guide",
      primary_intent: "comparison",
      primary_topic: "PLA vs PETG",
      priority_score: 80,
      recommended_when: ["material_comparison", "outdoor_material_choice"],
      rel_url: "/blog/pla-vs-petg/",
      secondary_topics: ["hittebestendigheid", "slagvastheid", "afwerking"],
      title: "PLA vs PETG",
      url: `${BASE_URL}/blog/pla-vs-petg/`,
      xref: "blog.pla-vs-petg",
    },
    {
      avoid_when: ["exact_pricing_only"],
      cluster: "pricing",
      cluster_role: "supporting",
      conversion_value: "medium",
      description: "Leg uit welke factoren de prijs van 3D printen sturen en wanneer een offerte nodig is.",
      keywords: ["hoeveel kost 3d printen", "3d print prijs", "offerte 3d printen"],
      namespace: "blog",
      page_type: "pricing_guide",
      primary_intent: "informational",
      primary_topic: "Hoeveel kost 3D printen",
      priority_score: 78,
      recommended_when: ["pricing_question", "budget_orientation"],
      rel_url: "/blog/hoeveel-kost-3d-printen/",
      secondary_topics: ["materiaalprijs", "seriekost", "offerteflow"],
      title: "Hoeveel kost 3D printen?",
      url: `${BASE_URL}/blog/hoeveel-kost-3d-printen/`,
      xref: "blog.hoeveel-kost-3d-printen",
    },
    {
      avoid_when: ["exact_product_lookup_only"],
      cluster: "repair",
      cluster_role: "supporting",
      conversion_value: "high",
      description: "Transactionele gids voor mensen die een kapot onderdeel willen laten namaken of vervangen.",
      keywords: ["kapot onderdeel laten printen", "vervangstuk 3d printen", "onderdeel namaken"],
      namespace: "blog",
      page_type: "repair_guide",
      primary_intent: "commercial",
      primary_topic: "Kapot onderdeel laten printen",
      priority_score: 84,
      recommended_when: ["replacement_part_query", "repair_intent"],
      rel_url: "/blog/kapot-onderdeel-laten-printen/",
      secondary_topics: ["fit check", "materiaalkeuze", "reverse engineering intake"],
      title: "Kapot onderdeel laten printen",
      url: `${BASE_URL}/blog/kapot-onderdeel-laten-printen/`,
      xref: "blog.kapot-onderdeel-laten-printen",
    },
    {
      avoid_when: ["non_organizer_query"],
      cluster: "organizers",
      cluster_role: "supporting",
      conversion_value: "medium",
      description: "Gids voor Gridfinity, Packout, TSTAK en custom organizers met intake en materiaalkeuze.",
      keywords: ["tool organizers 3d printen", "gridfinity", "packout insert", "tstak"],
      namespace: "blog",
      page_type: "buyer_guide",
      primary_intent: "comparison",
      primary_topic: "Tool organizers 3D printen",
      priority_score: 76,
      recommended_when: ["organizer_system_choice", "tool_storage_query"],
      rel_url: "/blog/tool-organizers-3d-printen/",
      secondary_topics: ["labelzones", "antislip", "kofferindeling"],
      title: "Tool organizers 3D printen",
      url: `${BASE_URL}/blog/tool-organizers-3d-printen/`,
      xref: "blog.tool-organizers-3d-printen",
    },
  ],
  en: [
    {
      avoid_when: ["book_now_only"],
      cluster: "materials",
      cluster_role: "supporting",
      conversion_value: "medium",
      description: "Compare PLA and PETG on impact, heat, look and common use cases.",
      keywords: ["pla vs petg", "difference between pla and petg", "which material to choose"],
      namespace: "blog",
      page_type: "comparison_guide",
      primary_intent: "comparison",
      primary_topic: "PLA vs PETG",
      priority_score: 80,
      recommended_when: ["material_comparison", "outdoor_material_choice"],
      rel_url: "/en/blog/pla-vs-petg/",
      secondary_topics: ["heat resistance", "impact strength", "surface finish"],
      title: "PLA vs PETG",
      url: `${BASE_URL}/en/blog/pla-vs-petg/`,
      xref: "blog.pla-vs-petg",
    },
    {
      avoid_when: ["exact_pricing_only"],
      cluster: "pricing",
      cluster_role: "supporting",
      conversion_value: "medium",
      description: "Explains which factors drive 3D printing prices and when a quote is required.",
      keywords: ["how much does 3d printing cost", "3d print pricing", "quote for 3d printing"],
      namespace: "blog",
      page_type: "pricing_guide",
      primary_intent: "informational",
      primary_topic: "How much does 3D printing cost",
      priority_score: 78,
      recommended_when: ["pricing_question", "budget_orientation"],
      rel_url: "/en/blog/hoeveel-kost-3d-printen/",
      secondary_topics: ["material cost", "batch pricing", "quote flow"],
      title: "How much does 3D printing cost?",
      url: `${BASE_URL}/en/blog/hoeveel-kost-3d-printen/`,
      xref: "blog.hoeveel-kost-3d-printen",
    },
    {
      avoid_when: ["exact_product_lookup_only"],
      cluster: "repair",
      cluster_role: "supporting",
      conversion_value: "high",
      description: "Transactional guide for visitors who need a broken part reprinted or recreated.",
      keywords: ["print a broken part", "3d print replacement part", "recreate a part"],
      namespace: "blog",
      page_type: "repair_guide",
      primary_intent: "commercial",
      primary_topic: "Print a broken part",
      priority_score: 84,
      recommended_when: ["replacement_part_query", "repair_intent"],
      rel_url: "/en/blog/kapot-onderdeel-laten-printen/",
      secondary_topics: ["fit checks", "material choice", "reverse engineering intake"],
      title: "Print a broken part",
      url: `${BASE_URL}/en/blog/kapot-onderdeel-laten-printen/`,
      xref: "blog.kapot-onderdeel-laten-printen",
    },
    {
      avoid_when: ["non_organizer_query"],
      cluster: "organizers",
      cluster_role: "supporting",
      conversion_value: "medium",
      description: "Guide for Gridfinity, Packout, TSTAK and custom organizers with intake and material choices.",
      keywords: ["3d printed tool organizers", "gridfinity", "packout insert", "tstak organizer"],
      namespace: "blog",
      page_type: "buyer_guide",
      primary_intent: "comparison",
      primary_topic: "3D printed tool organizers",
      priority_score: 76,
      recommended_when: ["organizer_system_choice", "tool_storage_query"],
      rel_url: "/en/blog/tool-organizers-3d-printing/",
      secondary_topics: ["labels", "anti-slip", "case layout"],
      title: "3D printing tool organizers",
      url: `${BASE_URL}/en/blog/tool-organizers-3d-printing/`,
      xref: "blog.tool-organizers-3d-printing",
    },
  ],
}

function nowIso() {
  return new Date().toISOString()
}

function prefix(locale: FeedLocale) {
  return locale === "en" ? "/en" : ""
}

function abs(path: string) {
  return `${BASE_URL}${path}`
}

function text(locale: FeedLocale, value: { nl: string; en: string }) {
  return locale === "en" ? value.en : value.nl
}

function describeShopAvailability(locale: FeedLocale, value?: string, stockCount?: number) {
  if (value === "InStock" && typeof stockCount === "number") {
    return locale === "en" ? `${stockCount} in stock` : `${stockCount} op voorraad`
  }
  if (value === "PreOrder") return locale === "en" ? "Quote or request first" : "Eerst aanvragen of offerte"
  if (value === "LimitedAvailability") return locale === "en" ? "Limited availability" : "Beperkte beschikbaarheid"
  if (value === "OutOfStock") return locale === "en" ? "Out of stock" : "Niet op voorraad"
  return locale === "en" ? "Check availability via quote" : "Beschikbaarheid via offerte"
}

function buildFeedLinks(locale: FeedLocale): FeedLinkMap {
  const base = locale === "en" ? `${BASE_URL}/en/data` : `${BASE_URL}/data`
  return {
    business: `${base}/business.json`,
    services: `${base}/services.json`,
    materials: `${base}/materials.json`,
    ...(SHOP_INDEXABLE ? { shop: `${base}/shop.json` } : {}),
    cases: `${base}/cases.json`,
    content_map: `${base}/content-map.json`,
  }
}

function buildCoreContentMap(locale: FeedLocale): ContentMapItem[] {
  const p = prefix(locale)
  const quoteUrl = `${BASE_URL}${p}/contact/`
  const materialsUrl = `${BASE_URL}${p}/materials/`
  const servicesUrl = `${BASE_URL}${p}/services/`
  const returnPolicyUrl = `${BASE_URL}${p}/retour-herroepingsrecht/`
  const organizersUrl = `${BASE_URL}${p}/organizers/`
  return [
    {
      aliases: [],
      avoid_when: ["pricing_lookup_only"],
      cluster: "service_entry",
      cluster_role: "primary",
      conversion_value: "high",
      description:
        locale === "en"
          ? "Main landing page for local 3D printing, quote flow, materials, organizers and examples."
          : "Hoofdpagina voor lokale 3D print service, offerteflow, materialen, organizers en voorbeelden.",
      keywords:
        locale === "en"
          ? ["3d printing belgium", "custom 3d printing", "3d print service herzele"]
          : ["3d print service belgie", "3d printen op maat", "3d print service herzele"],
      namespace: "pages",
      page_type: "home",
      primary_intent: "commercial",
      primary_topic: locale === "en" ? "3D printing service Belgium" : "3D print service Belgie",
      priority_score: 95,
      recommended_when: ["broad_service_query", "local_3d_print_query"],
      rel_url: `${p}/`,
      related_pages: [
        { title: locale === "en" ? "Services" : "Services", url: servicesUrl, xref: "pages.services" },
        { title: locale === "en" ? "Materials" : "Materialen", url: materialsUrl, xref: "pages.materials" },
        { title: locale === "en" ? "Contact" : "Contact", url: quoteUrl, xref: "pages.contact" },
      ],
      secondary_topics: locale === "en" ? ["parts", "prototypes", "organizers"] : ["onderdelen", "prototypes", "organizers"],
      title: locale === "en" ? "X3DPrints home" : "X3DPrints home",
      url: `${BASE_URL}${p}/`,
      xref: "pages.home",
    },
    {
      aliases: [],
      avoid_when: ["exact_price_only"],
      cluster: "service_catalog",
      cluster_role: "primary",
      conversion_value: "high",
      description:
        locale === "en"
          ? "Service hub for quote-based 3D printing, prototypes, parts, quality checks and delivery."
          : "Servicehub voor offerte-gebaseerd 3D printen, prototypes, onderdelen, kwaliteitscontrole en levering.",
      keywords:
        locale === "en"
          ? ["3d printing services", "prototype printing", "custom parts"]
          : ["3d print services", "prototypes printen", "onderdelen op maat"],
      namespace: "pages",
      page_type: "service_hub",
      primary_intent: "commercial",
      primary_topic: locale === "en" ? "3D printing services" : "3D print services",
      priority_score: 94,
      recommended_when: ["service_scope", "quote_intent", "prototype_query"],
      rel_url: `${p}/services/`,
      related_pages: [
        { title: locale === "en" ? "Materials" : "Materialen", url: materialsUrl, xref: "pages.materials" },
        { title: locale === "en" ? "Pricing" : "Pricing", url: `${BASE_URL}${p}/pricing/`, xref: "pages.pricing" },
        { title: locale === "en" ? "Contact" : "Contact", url: quoteUrl, xref: "pages.contact" },
      ],
      secondary_topics: locale === "en" ? ["quotes", "short runs", "material advice"] : ["offertes", "kleine reeksen", "materiaaladvies"],
      title: locale === "en" ? "3D printing services" : "3D print services",
      url: servicesUrl,
      xref: "pages.services",
    },
    {
      aliases: [],
      avoid_when: ["book_now_only"],
      cluster: "materials",
      cluster_role: "primary",
      conversion_value: "high",
      description:
        locale === "en"
          ? "Materials hub with PLA, PETG, TPU and a suggestion tool for faster material selection."
          : "Materialenhub met PLA, PETG, TPU en een suggestion tool voor snellere materiaalkeuze.",
      keywords:
        locale === "en"
          ? ["3d printing materials", "pla petg tpu", "material suggestion tool"]
          : ["3d print materialen", "pla petg tpu", "material suggestion tool"],
      namespace: "pages",
      page_type: "materials_hub",
      primary_intent: "comparison",
      primary_topic: locale === "en" ? "3D printing materials" : "3D print materialen",
      priority_score: 92,
      recommended_when: ["material_choice", "pla_petg_tpu_query"],
      rel_url: `${p}/materials/`,
      related_pages: [
        { title: locale === "en" ? "Services" : "Services", url: servicesUrl, xref: "pages.services" },
        { title: locale === "en" ? "3D printing guide" : "3D printen gids", url: `${BASE_URL}${p}/3d-printen/`, xref: "pages.3d-printen" },
        { title: locale === "en" ? "Contact" : "Contact", url: quoteUrl, xref: "pages.contact" },
      ],
      secondary_topics: ["PLA", "PETG", "TPU"],
      title: locale === "en" ? "Materials" : "Materialen",
      url: materialsUrl,
      xref: "pages.materials",
    },
    ...(SHOP_INDEXABLE
      ? [
          {
            aliases: [],
            avoid_when: ["custom_modeling_only"],
            cluster: "shop",
            cluster_role: "primary",
            conversion_value: "high" as const,
            description:
              locale === "en"
                ? "Quote-first shop for small stocked products, reusable spools and in-house designs."
                : "Quote-first shop voor kleine voorraadproducten, reusable spools en eigen ontwerpen.",
            keywords:
              locale === "en"
                ? ["3d print shop", "3d printed products", "shop accessories"]
                : ["3d print shop", "3d print producten", "shop accessoires"],
            namespace: "pages",
            page_type: "shop_hub",
            primary_intent: "commercial" as const,
            primary_topic: locale === "en" ? "3D print shop" : "3D print shop",
            priority_score: 88,
            recommended_when: ["product_query", "small_stock_item_query"],
            rel_url: `${p}/shop/`,
            related_pages: [
              { title: locale === "en" ? "Find my 3D model" : "Vind mijn 3D model", url: `${BASE_URL}${p}/3d-modellen-vinden/`, xref: "pages.find-model" },
              { title: locale === "en" ? "3D modeling" : "3D modelleren", url: `${BASE_URL}${p}/3d-modelleren/`, xref: "pages.modeling" },
              { title: locale === "en" ? "Contact" : "Contact", url: quoteUrl, xref: "pages.contact" },
            ],
            secondary_topics: locale === "en" ? ["quote flow", "stock items", "pickup or shipping"] : ["offerteflow", "voorraaditems", "afhalen of verzending"],
            title: locale === "en" ? "Shop" : "Shop",
            url: `${BASE_URL}${p}/shop/`,
            xref: "pages.shop",
          },
        ]
      : []),
    {
      aliases: [],
      avoid_when: ["non_organizer_query"],
      cluster: "organizers",
      cluster_role: "primary",
      conversion_value: "high",
      description:
        locale === "en"
          ? "Organizer hub for Gridfinity, Packout, TSTAK and custom inserts."
          : "Organizerhub voor Gridfinity, Packout, TSTAK en custom inserts.",
      keywords:
        locale === "en"
          ? ["tool organizers", "gridfinity", "packout inserts", "tstak organizers"]
          : ["tool organizers", "gridfinity", "packout inserts", "tstak organizers"],
      namespace: "pages",
      page_type: "organizer_hub",
      primary_intent: "commercial",
      primary_topic: locale === "en" ? "Tool organizers" : "Tool organizers",
      priority_score: 90,
      recommended_when: ["organizer_query", "gridfinity_packout_tstak_compare"],
      rel_url: `${p}/organizers/`,
      related_pages: [
        { title: locale === "en" ? "Gridfinity" : "Gridfinity", url: `${BASE_URL}${p}/organizers/modugrid/`, xref: "organizers.modugrid" },
        { title: locale === "en" ? "Packout" : "Packout", url: `${BASE_URL}${p}/organizers/packout/`, xref: "organizers.packout" },
        { title: locale === "en" ? "TSTAK" : "TSTAK", url: `${BASE_URL}${p}/organizers/tstak/`, xref: "organizers.tstak" },
      ],
      secondary_topics: locale === "en" ? ["custom inserts", "labels", "anti-slip"] : ["custom inserts", "labels", "antislip"],
      title: locale === "en" ? "Organizers" : "Organizers",
      url: organizersUrl,
      xref: "pages.organizers",
    },
    {
      aliases:
        locale === "en"
          ? ["returns policy", "withdrawal policy", "refund policy", "returns and withdrawal"]
          : ["retourbeleid", "herroepingsrecht", "retour en herroeping", "refund policy"],
      avoid_when: ["custom_modeling_only"],
      cluster: "merchant_policy",
      cluster_role: "supporting",
      conversion_value: "medium",
      description:
        locale === "en"
          ? "Merchant policy page for returns, withdrawal, custom-order exceptions, and faulty shop products."
          : "Merchant beleidspagina voor retour, herroeping, maatwerkuitzonderingen en defecte shopproducten.",
      keywords:
        locale === "en"
          ? ["returns policy", "withdrawal policy", "faulty product rights", "custom order exception"]
          : ["retourbeleid", "herroepingsrecht", "defect product", "maatwerk uitzondering"],
      namespace: "pages",
      page_type: "merchant_policy",
      primary_intent: "informational",
      primary_topic: locale === "en" ? "Returns and withdrawal policy" : "Retour en herroepingsrecht",
      priority_score: 72,
      recommended_when: ["return_policy_query", "withdrawal_question", "refund_or_fault_issue"],
      rel_url: `${p}/retour-herroepingsrecht/`,
      related_pages: [
        { title: locale === "en" ? "Contact" : "Contact", url: quoteUrl, xref: "pages.contact" },
      ],
      secondary_topics:
        locale === "en"
          ? ["consumer orders", "custom-made exception", "faulty delivery"]
          : ["consumentenbestellingen", "maatwerk uitzondering", "fout geleverde producten"],
      title: locale === "en" ? "Returns & withdrawal policy" : "Retour & herroepingsrecht",
      url: returnPolicyUrl,
      xref: "pages.returns-policy",
    },
    {
      aliases: [],
      avoid_when: ["low_intent_general_query"],
      cluster: "quote_flow",
      cluster_role: "primary",
      conversion_value: "high",
      description:
        locale === "en"
          ? "Contact and quote page for custom 3D printing, shop inquiries and material-prefilled requests."
          : "Contact- en offertepagina voor maatwerk, shopaanvragen en materiaal-prefilled requests.",
      keywords:
        locale === "en"
          ? ["request a 3d printing quote", "contact 3d printer", "custom part quote"]
          : ["offerte 3d printen", "contact 3d printer", "onderdeel offerte"],
      namespace: "pages",
      page_type: "contact_quote",
      primary_intent: "commercial",
      primary_topic: locale === "en" ? "3D printing quote" : "3D print offerte",
      priority_score: 96,
      recommended_when: ["quote_intent", "send_model", "shop_inquiry"],
      rel_url: `${p}/contact/`,
      related_pages: [
        { title: locale === "en" ? "Services" : "Services", url: servicesUrl, xref: "pages.services" },
        { title: locale === "en" ? "Materials" : "Materialen", url: materialsUrl, xref: "pages.materials" },
        ...(SHOP_INDEXABLE ? [{ title: locale === "en" ? "Shop" : "Shop", url: `${BASE_URL}${p}/shop/`, xref: "pages.shop" }] : []),
      ],
      secondary_topics: locale === "en" ? ["context upload", "material choice", "lead time"] : ["context upload", "materiaalkeuze", "lead time"],
      title: locale === "en" ? "Contact" : "Contact",
      url: quoteUrl,
      xref: "pages.contact",
    },
  ]
}

export function buildMachineReadableManifest(locale: FeedLocale): ManifestFeed {
  return {
    feeds: buildFeedLinks(locale),
    generated_at: nowIso(),
    language: locale,
    notes:
      locale === "en"
        ? [
            "These feeds are generated from stable site data and should be treated as a routing layer for agents and developer tools.",
            "Prefer content-map.json to choose the best page for a user intent before reading deeper page content.",
            ...(SHOP_INDEXABLE ? ["Shop pages are quote-first: use contact or product inquiry flows instead of assuming instant checkout."] : []),
            "These feeds are additive resources and are intentionally not included as separate URLs in the sitemap.",
          ]
        : [
            "Deze feeds worden opgebouwd uit stabiele sitegegevens en dienen als routinglaag voor agents en developer tools.",
            "Gebruik content-map.json om eerst de beste pagina voor een intent te kiezen voor je dieper leest.",
            ...(SHOP_INDEXABLE ? ["Shoppagina's werken quote-first: ga uit van contact- of productaanvragen, niet van instant checkout."] : []),
            "Deze feeds zijn additieve resources en worden bewust niet als aparte URLs in de sitemap gezet.",
          ],
    schema_version: SCHEMA_VERSION,
  }
}

export function buildMachineReadableBusiness(locale: FeedLocale) {
  return {
    schema_version: SCHEMA_VERSION,
    generated_at: nowIso(),
    language: locale,
    business: {
      name: SITE.name,
      website: BASE_URL,
      description:
        locale === "en"
          ? "Local quote-first 3D printing studio in Herzele, East Flanders, focused on parts, organizers, prototypes and small runs."
          : "Lokale quote-first 3D printstudio in Herzele, Oost-Vlaanderen, gericht op onderdelen, organizers, prototypes en kleine reeksen.",
      studio_model:
        locale === "en"
          ? "One-person studio with direct maker contact and realistic planning."
          : "Eenmansstudio met rechtstreeks contact met de maker en realistische planning.",
      address: SITE.address,
      regions: locale === "en" ? CORE_REGIONS_EN : CORE_REGIONS_NL,
      same_as: SITE.sameAs,
      primary_quote_url: `${BASE_URL}${prefix(locale)}/contact/`,
      materials_url: `${BASE_URL}${prefix(locale)}/materials/`,
      ...(SHOP_INDEXABLE ? { shop_url: `${BASE_URL}${prefix(locale)}/shop/` } : {}),
      return_policy_url: `${BASE_URL}${prefix(locale)}/retour-herroepingsrecht/`,
      languages: ["nl-BE", "en-BE"],
      ...(SHOP_INDEXABLE ? { quote_first_shop: true } : {}),
    },
  }
}

export function buildMachineReadableServices(locale: FeedLocale) {
  return {
    schema_version: SCHEMA_VERSION,
    generated_at: nowIso(),
    language: locale,
    items: CURATED_SERVICES[locale],
  }
}

export function buildMachineReadableMaterials(locale: FeedLocale) {
  const materialMap = materialsByLocale(locale)
  return {
    schema_version: SCHEMA_VERSION,
    generated_at: nowIso(),
    language: locale,
    items: MATERIAL_ORDER.map((key) => {
      const material = materialMap[key]
      const slug = MATERIAL_SLUGS[key]
      const rel = `${prefix(locale)}/materials/${slug}/`
      return {
        key,
        slug,
        name: material.name,
        description: material.description ?? "",
        features: material.features ?? [],
        url: abs(rel),
        rel_url: rel,
        in_stock_swatches: material.swatches.filter((swatch) => swatch.inStock).length,
      }
    }),
  }
}

async function getMachineReadableShopItems(locale: FeedLocale) {
  if (!SHOP_INDEXABLE) return []

  const products = (await getShopProducts(locale, { cacheMode: "force-cache" })).filter(
    (product) => product.isLive,
  )

  return products.map((product) => {
    const rel = `${prefix(locale)}/shop/${product.slug}/`

    return {
      slug: product.slug,
      name: text(locale, product.name),
      summary: text(locale, product.summary),
      description: product.description ? text(locale, product.description) : undefined,
      price_eur: product.priceEur,
      price_currency: "EUR" as const,
      availability: describeShopAvailability(locale, product.availability, product.stockCount),
      availability_code: product.availability,
      stock_count: product.stockCount,
      lead_time_days: product.leadTimeDays,
      purchase_mode: product.purchaseMode ?? "inquiry",
      categories: product.categories ?? [],
      tags: product.tags ?? [],
      url: abs(rel),
      rel_url: rel,
      image_url: abs(product.image.url),
    }
  })
}

export async function buildMachineReadableShop(locale: FeedLocale) {
  return {
    schema_version: SCHEMA_VERSION,
    generated_at: nowIso(),
    language: locale,
    items: await getMachineReadableShopItems(locale),
  }
}

export function buildMachineReadableCases(locale: FeedLocale) {
  return {
    schema_version: SCHEMA_VERSION,
    generated_at: nowIso(),
    language: locale,
    items: getCaseStudies().map((entry) => {
      const rel = locale === "en" ? entry.enHref : entry.href
      return {
        id: entry.id,
        title: text(locale, entry.title),
        summary: text(locale, entry.summary),
        sector: text(locale, entry.sector),
        materials: entry.materials,
        published_on: entry.publishedOn,
        kpi: text(locale, entry.kpi),
        url: abs(`${rel}/`),
        rel_url: `${rel}/`,
      }
    }),
  }
}

export async function buildMachineReadableContentMap(locale: FeedLocale) {
  const p = prefix(locale)
  const materials = buildMachineReadableMaterials(locale).items.map((item) => ({
    aliases: [],
    avoid_when: ["broad_service_query"],
    cluster: "materials",
    cluster_role: "detail",
    conversion_value: "medium" as const,
    description: item.description,
    keywords:
      locale === "en"
        ? [item.name.toLowerCase(), `3d printing ${item.name.toLowerCase()}`, `material ${item.name.toLowerCase()}`]
        : [item.name.toLowerCase(), `3d print ${item.name.toLowerCase()}`, `materiaal ${item.name.toLowerCase()}`],
    namespace: "materials",
    page_type: "material_detail",
    primary_intent: "comparison" as const,
    primary_topic: item.name,
    priority_score: 72,
    recommended_when: ["specific_material_query", "material_comparison"],
    rel_url: item.rel_url,
    related_pages: [
      { title: locale === "en" ? "Materials" : "Materialen", url: abs(`${p}/materials/`), xref: "pages.materials" },
      { title: locale === "en" ? "Contact" : "Contact", url: abs(`${p}/contact/`), xref: "pages.contact" },
    ],
    secondary_topics: item.features.slice(0, 3),
    title: item.name,
    url: item.url,
    xref: `materials.${item.slug}`,
  }))

  const shopItems = await getMachineReadableShopItems(locale)
  const shop = shopItems.map((item) => ({
    aliases: [],
    avoid_when: ["custom_modeling_only"],
    cluster: "shop",
    cluster_role: "detail",
    conversion_value: "high" as const,
    description: item.summary,
    keywords: [...item.tags.slice(0, 6), item.name.toLowerCase()],
    namespace: "shop",
    page_type: "product_detail",
    primary_intent: "commercial" as const,
    primary_topic: item.name,
    priority_score: 82,
    recommended_when: ["specific_product_query", "small_stock_item_query"],
    rel_url: item.rel_url,
    related_pages: [
      { title: locale === "en" ? "Contact" : "Contact", url: abs(`${p}/contact/`), xref: "pages.contact" },
      ...(SHOP_INDEXABLE ? [{ title: locale === "en" ? "Shop" : "Shop", url: abs(`${p}/shop/`), xref: "pages.shop" }] : []),
    ],
    secondary_topics: [item.availability ?? "", item.purchase_mode ?? "inquiry"].filter(Boolean),
    title: item.name,
    url: item.url,
    xref: `shop.${item.slug}`,
  }))

  const cases = buildMachineReadableCases(locale).items.map((item) => ({
    aliases: [],
    avoid_when: ["direct_checkout_only"],
    cluster: "cases",
    cluster_role: "detail",
    conversion_value: "medium" as const,
    description: item.summary,
    keywords: [item.title.toLowerCase(), ...item.materials.map((material) => material.toLowerCase())],
    namespace: "cases",
    page_type: "case_detail",
    primary_intent: "informational" as const,
    primary_topic: item.title,
    priority_score: 68,
    recommended_when: ["proof_query", "example_query", "use_case_query"],
    rel_url: item.rel_url,
    related_pages: [
      { title: locale === "en" ? "Cases" : "Cases", url: abs(`${p}/cases/`), xref: "pages.cases" },
      { title: locale === "en" ? "Services" : "Services", url: abs(`${p}/services/`), xref: "pages.services" },
    ],
    secondary_topics: [item.sector, item.kpi],
    title: item.title,
    url: item.url,
    xref: `cases.${item.id}`,
  }))

  const core = buildCoreContentMap(locale)
  const knowledge = CURATED_KNOWLEDGE_PAGES[locale].map((item) => ({
    ...item,
    aliases: [],
    related_pages: [
      { title: locale === "en" ? "Blog" : "Blog", url: abs(`${p}/blog/`), xref: "pages.blog" },
      { title: locale === "en" ? "Services" : "Services", url: abs(`${p}/services/`), xref: "pages.services" },
      { title: locale === "en" ? "Materials" : "Materialen", url: abs(`${p}/materials/`), xref: "pages.materials" },
    ],
  }))

  const items = [...core, ...knowledge, ...materials, ...shop, ...cases]

  return {
    counts: {
      core_pages: core.length + knowledge.length,
      material_pages: materials.length,
      shop_products: shop.length,
      case_pages: cases.length,
      total_items: items.length,
    },
    generated_at: nowIso(),
    items,
    language: locale,
    purpose:
      locale === "en"
        ? "Routing layer for AI tools and developer workflows: choose the best X3DPrints page for a user intent before reading deeper page content."
        : "Routinglaag voor AI-tools en developer workflows: kies eerst de beste X3DPrints-pagina voor een intent voor je dieper in content duikt.",
    routing_rules:
      locale === "en"
        ? [
            "Prefer items whose primary_intent matches the user request.",
            "If multiple items fit, prefer higher priority_score values.",
            SHOP_INDEXABLE
              ? "Use conversion_value high items for quote-first or shop-adjacent requests."
              : "Use conversion_value high items for quote-first or direct buying intent.",
            SHOP_INDEXABLE
              ? "Use materials pages for material questions, cases for proof/example requests and shop product pages for specific stocked items."
              : "Use materials pages for material questions, cases for proof/example requests and contact for direct buying intent.",
          ]
        : [
            "Kies eerst items waarvan primary_intent overeenkomt met de vraag van de gebruiker.",
            "Als meerdere items passen, geef voorrang aan hogere priority_score waarden.",
            SHOP_INDEXABLE
              ? "Gebruik conversion_value high items voor quote-first of shopgerichte vragen."
              : "Gebruik conversion_value high items voor offerte- of koopgerichte vragen.",
            SHOP_INDEXABLE
              ? "Gebruik materiaalpagina's voor materiaalvragen, cases voor bewijs/voorbeelden en shopproducten voor specifieke voorraaditems."
              : "Gebruik materiaalpagina's voor materiaalvragen, cases voor bewijs/voorbeelden en contact voor directe koopintentie.",
          ],
    schema_version: SCHEMA_VERSION,
  }
}

export function getMachineReadableResourceLinks(locale: FeedLocale) {
  const feeds = buildFeedLinks(locale)
  return {
    llms: `${BASE_URL}/llms.txt`,
    resourcePage: `${BASE_URL}${prefix(locale)}/machine-readable-resources/`,
    manifest: locale === "en" ? `${BASE_URL}/en/data/manifest.json` : `${BASE_URL}/data/manifest.json`,
    feeds,
  }
}
