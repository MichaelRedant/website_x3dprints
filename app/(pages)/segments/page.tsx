import type { Metadata } from "next"
import Link from "next/link"
import GlassCard from "@/components/GlassCard"
import ReadMoreLinks from "@/components/ReadMoreLinks"
import { normalizeLocale } from "@/lib/i18n/locales"
import { localizeHref } from "@/lib/i18n/paths"
import OrganizerCta from "@/components/OrganizerCta"

type SegmentCard = {
  slug: string
  title: string
  description: string
  highlights: string[]
}

type SegmentLink = {
  label: string
  href: string
}

type RelatedGroup = {
  title: string
  items: SegmentLink[]
}

type SegmentCopy = {
  hero: {
    eyebrow: string
    title: string
    body: string
    quickLinks: SegmentLink[]
    chips: SegmentLink[]
  }
  sections: {
    core: { title: string; subtitle: string }
    seasonal: { title: string; subtitle: string }
  }
  cards: {
    coreLabel: string
    seasonalLabel: string
    cta: string
  }
  coreSegments: SegmentCard[]
  seasonalSegments: SegmentCard[]
  relatedBySlug: Record<string, SegmentLink[]>
  interlinks: {
    title: string
    body: string
    groups: RelatedGroup[]
  }
  faq: {
    title: string
    items: { q: string; a: string }[]
  }
  readMore: {
    title: string
    intro: string
    primaryLinks: SegmentLink[]
    secondaryLinks: SegmentLink[]
  }
  schema: {
    itemListName: string
    language: string
  }
}

const NL_METADATA: Metadata = {
  title: "3D printing per segment | X3DPrints",
  description: "Landingpaginas voor veelgevraagde 3D print segmenten: prototypes, scholen, modelbouwers en engineers.",
  alternates: {
    canonical: "https://www.x3dprints.be/segments/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/segments/",
      en: "https://www.x3dprints.be/en/segments/",
      "x-default": "https://www.x3dprints.be/segments/",
    },
  },
  openGraph: {
    title: "3D printing per segment",
    description: "Vind de juiste 3D print informatie voor prototypes, onderwijs, modelbouwers en engineers.",
    url: "https://www.x3dprints.be/segments/",
    images: [{ url: "/Logo.webp", width: 1200, height: 630, alt: "X3DPrints logo" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: { card: "summary_large_image" },
}

export const EN_METADATA: Metadata = {
  title: "3D printing by segment | X3DPrints",
  description: "Landing pages for common 3D printing segments: prototypes, schools, model builders and engineers.",
  alternates: {
    canonical: "https://www.x3dprints.be/en/segments/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/segments/",
      en: "https://www.x3dprints.be/en/segments/",
      "x-default": "https://www.x3dprints.be/segments/",
    },
  },
  openGraph: {
    title: "3D printing by segment",
    description: "Find the right 3D printing guidance for prototypes, education, model builders and engineers.",
    url: "https://www.x3dprints.be/en/segments/",
    images: [{ url: "/Logo.webp", width: 1200, height: 630, alt: "X3DPrints logo" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: { card: "summary_large_image" },
}

export const metadata: Metadata = NL_METADATA

const SEGMENTS_COPY_NL: SegmentCopy = {
  hero: {
    eyebrow: "Segmenten",
    title: "3D printing per doelgroep",
    body: "Van prototypes en onderwijs tot modelbouwers, marketingteams en engineers: kies je segment en ontdek hoe X3DPrints het verschil maakt.",
    quickLinks: [
      { label: "Prototypes & engineers", href: "/segments/3d-printing-prototypes" },
      { label: "Scholen & Back to School", href: "/segments/3d-printing-back-to-school" },
      { label: "Marketing & seasonal", href: "/segments/3d-printing-marketing" },
      { label: "Makers & tabletop", href: "/segments/3d-printing-makers" },
      { label: "Valentijn (jan-feb)", href: "/segments/3d-printing-valentijn" },
    ],
    chips: [
      { label: "Material Suggestion Tool", href: "/materials#material-suggestion-tool" },
      { label: "Lees de blog", href: "/blog" },
    ],
  },
  sections: {
    core: { title: "Kernsegmenten", subtitle: "Prototypes, onderwijs, marketing" },
    seasonal: { title: "Seasonal & campagnes", subtitle: "Tijdelijke periodes" },
  },
  cards: {
    coreLabel: "Segment",
    seasonalLabel: "Seasonal",
    cta: "Naar segment",
  },
  coreSegments: [
    {
      slug: "segments/3d-printing-prototypes",
      title: "3D printing voor prototypes",
      description: "Snelle iteraties met PLA Matte of PLA Tough+ voor functionele tests. Perfect voor designteams en agencies.",
      highlights: [
        "Snelle turnaround en iteraties",
        "Feedback op DFM en materialen",
        "Offerte + planning afgestemd op jouw sprint",
      ],
    },
    {
      slug: "segments/3d-printing-scholen",
      title: "3D printing voor scholen",
      description: "Ondersteuning voor STEM- en ontwerptrajecten. Leerlingen sturen STL/STEP in en wij printen met begeleidende tips.",
      highlights: [
        "Educatieve pakketten en bulkprijzen",
        "Material Suggestion Tool voor studenten",
        "Plaats voor coaching en workshops",
      ],
    },
    {
      slug: "segments/3d-printing-modelbouwers",
      title: "3D printing voor modelbouwers",
      description: "PLA Wood, Marble en Translucent voor maquettes en scenery. We denken mee over detailniveau en nabewerking.",
      highlights: [
        "Speciale PLA blends (wood, silk, marble)",
        "Tips voor lijm, verf en assemblage",
        "Lokale afhaling voor fragiele stukken",
      ],
    },
    {
      slug: "segments/3d-printing-engineers",
      title: "3D printing voor engineers",
      description: "Precisieprints in PLA Tough+ of PETG voor jigs, fixtures en pre-production prototypes. Inclusief meetrapporten.",
      highlights: [
        "Typische tolerantie +/-0,2 mm",
        "Functionaliteit gericht op sterkte en hittebestendigheid",
        "Makkelijk combineren met metaal/elektronica",
      ],
    },
    {
      slug: "segments/3d-printing-marketing",
      title: "3D printing voor marketing & events",
      description: "Eye-catching props, awards en merchandising in PLA Silk+, Marble en Translucent voor campagnes en activaties.",
      highlights: [
        "Showpieces klaar voor fotoshoots",
        "Snelle runs voor events en pop-ups",
        "Afhalen in Herzele of verzending in Belgie",
      ],
    },
    {
      slug: "segments/3d-printing-makers",
      title: "3D printing voor makers & hobbyisten",
      description: "Lokale ondersteuning voor hobbyprojecten, custom onderdelen en repair-jobs. Flexibele planning en materiaaladvies.",
      highlights: [
        "Combineer prints met elektronica of hout",
        "Kies tussen snelle PLA of duurzame PETG",
        "Afhalen in Herzele of verzending in Belgie",
      ],
    },
    {
      slug: "segments/3d-printing-tabletop",
      title: "3D printing voor tabletop minis",
      description: "D&D en Warhammer miniaturen, bases en dice towers met haarscherpe details. Ontwerp van het 3D model niet inbegrepen; aanleveren of ontwerpservice mogelijk.",
      highlights: [
        "0,12-0,16 mm layers voor premium detail",
        "PLA Matte/PETG voor minis en scenery, TPU voor rubber feet",
        "Persoonlijke levering of pakketdienst voor breekbare prints",
      ],
    },
  ],
  seasonalSegments: [
    {
      slug: "segments/3d-printing-back-to-school",
      title: "Back to School 3D printing",
      description: "Pennenhouders, naamplaatjes, bureau organizers en educatieve STEM-modellen. Ontwerpbestand niet inbegrepen; aanleveren of ontwerpservice.",
      highlights: [
        "PLA Matte/PETG voor klasmateriaal, TPU antislipvoetjes",
        "Batchen van namen/klassen voor consistente kleur",
        "Planning augustus-september zonder overpromise",
      ],
    },
    {
      slug: "segments/3d-printing-vaderdag-moederdag",
      title: "Vaderdag & Moederdag 3D printing",
      description: "Gepersonaliseerde sleutelhangers, desk items en naamcadeaus. Ontwerpbestand niet inbegrepen; aanleveren of ontwerpservice.",
      highlights: [
        "Silk/Matte PLA voor luxe of zachte look; PETG voor sterkere items",
        "Tekstdiepte en afgeronde randen voor dagelijks gebruik",
        "Batchen van namen/initialen voor consistente afwerking",
      ],
    },
    {
      slug: "segments/3d-printing-valentijn",
      title: "3D printing voor Valentijn",
      description: "Hartdecor, naamplaatjes en gifts in Silk, Matte en Translucent PLA. Ontwerpbestand niet inbegrepen; aanleveren of ontwerpservice.",
      highlights: [
        "Silk/Marble voor glansrijke cadeaus, Matte voor zachte pastels",
        "Uitsparingen voor leds/magneten en antislip feet in TPU",
        "Planning richting 14 februari zonder overpromise",
      ],
    },
    {
      slug: "segments/3d-printing-seasonal",
      title: "Seasonal 3D designs",
      description: "Herfst/Halloween, lente/Pasen, zomer, winter/kerst decor. Ontwerpbestand niet inbegrepen; aanleveren of ontwerpservice.",
      highlights: [
        "Silk/Marble/Translucent PLA voor feestelijke looks",
        "Outdoor props in PETG, antislip in TPU",
        "Lokale levering of pakketdienst",
      ],
    },
  ],
  relatedBySlug: {
    "segments/3d-printing-prototypes": [
      { label: "Engineers segment", href: "/segments/3d-printing-engineers" },
      { label: "Services", href: "/services" },
      { label: "Pricing", href: "/pricing" },
    ],
    "segments/3d-printing-scholen": [
      { label: "Back to School", href: "/segments/3d-printing-back-to-school" },
      { label: "Materials", href: "/materials" },
      { label: "Viewer", href: "/viewer" },
    ],
    "segments/3d-printing-back-to-school": [
      { label: "Scholen segment", href: "/segments/3d-printing-scholen" },
      { label: "Back to School blog", href: "/blog/3d-printen-back-to-school" },
      { label: "Material Suggestion Tool", href: "/materials#material-suggestion-tool" },
    ],
    "segments/3d-printing-modelbouwers": [
      { label: "Seasonal decor", href: "/segments/3d-printing-seasonal" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Materials", href: "/materials" },
    ],
    "segments/3d-printing-engineers": [
      { label: "Prototypes", href: "/segments/3d-printing-prototypes" },
      { label: "Pricing", href: "/pricing" },
      { label: "3D modelleren", href: "/3d-modelleren" },
    ],
    "segments/3d-printing-marketing": [
      { label: "Seasonal segment", href: "/segments/3d-printing-seasonal" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Services", href: "/services" },
    ],
    "segments/3d-printing-makers": [
      { label: "Tabletop minis", href: "/segments/3d-printing-tabletop" },
      { label: "Materials", href: "/materials" },
      { label: "Viewer", href: "/viewer" },
    ],
    "segments/3d-printing-tabletop": [
      { label: "Makers & hobby", href: "/segments/3d-printing-makers" },
      { label: "Materials", href: "/materials" },
      { label: "Contact", href: "/contact" },
    ],
    "segments/3d-printing-vaderdag-moederdag": [
      { label: "Seasonal segment", href: "/segments/3d-printing-seasonal" },
      { label: "Vaderdag/Moederdag blog", href: "/blog/3d-printen-vaderdag-moederdag" },
      { label: "Contact", href: "/contact?material=pla-silk-plus" },
    ],
    "segments/3d-printing-valentijn": [
      { label: "Seasonal segment", href: "/segments/3d-printing-seasonal" },
      { label: "Valentijn landing", href: "/valentijn-3d-printen" },
      { label: "Contact", href: "/contact?material=pla-silk-plus" },
    ],
    "segments/3d-printing-seasonal": [
      { label: "Marketing & events", href: "/segments/3d-printing-marketing" },
      { label: "Back to School", href: "/segments/3d-printing-back-to-school" },
      { label: "Seasonal blogs", href: "/blog" },
    ],
  },
  interlinks: {
    title: "Interne links tussen segmenten",
    body: "Combineer trajecten: back-to-school draait in augustus-september, seasonal campagnes koppelen we aan marketing, en makers vinden vaak ook tabletop of materiaaladvies interessant.",
    groups: [
      {
        title: "Onderwijs & Back to School",
        items: [
          { label: "Back to School segment", href: "/segments/3d-printing-back-to-school" },
          { label: "Scholen segment", href: "/segments/3d-printing-scholen" },
          { label: "Back to School blog", href: "/blog/3d-printen-back-to-school" },
        ],
      },
      {
        title: "Marketing & seasonal campagnes",
        items: [
          { label: "Marketing & events", href: "/segments/3d-printing-marketing" },
          { label: "Seasonal segment", href: "/segments/3d-printing-seasonal" },
          { label: "Seasonal blogs", href: "/blog" },
        ],
      },
      {
        title: "Makers, tabletop & hobby",
        items: [
          { label: "Makers & hobbyisten", href: "/segments/3d-printing-makers" },
          { label: "Tabletop minis", href: "/segments/3d-printing-tabletop" },
          { label: "Material Suggestion Tool", href: "/materials#material-suggestion-tool" },
        ],
      },
    ],
  },
  faq: {
    title: "FAQ over segmenten",
    items: [
      {
        q: "Welke segmenten bedient X3DPrints?",
        a: "We werken vaak voor prototypes, scholen, modelbouwers, marketing/events en engineers. Elk segment krijgt eigen materiaal- en workflowtips.",
      },
      {
        q: "Kan ik maatwerk vragen buiten deze segmenten?",
        a: "Ja, de segmenten zijn richtinggevend. Deel je toepassing; we kijken naar materiaal, toleranties en planning.",
      },
      {
        q: "Hoe snel krijg ik een voorstel?",
        a: "Meestal binnen 24 uur na STL/STEP en context. Planning stemmen we af op complexiteit en oplage.",
      },
    ],
  },
  readMore: {
    title: "Verder met je segment",
    intro: "Kies een segment en koppel het aan materialen, pricing en een concrete aanvraag.",
    primaryLinks: [
      { label: "3D print service", href: "/services" },
      { label: "Materialen & richtlijnen", href: "/materials" },
      { label: "Prijzen & calculator", href: "/pricing" },
    ],
    secondaryLinks: [
      { label: "Portfolio", href: "/portfolio" },
      { label: "Material Suggestion Tool", href: "/materials#material-suggestion-tool" },
      { label: "Offerte aanvragen", href: "/contact" },
    ],
  },
  schema: {
    itemListName: "X3DPrints segmenten",
    language: "nl-BE",
  },
}

const SEGMENTS_COPY_EN: SegmentCopy = {
  hero: {
    eyebrow: "Segments",
    title: "3D printing by segment",
    body: "From prototypes and education to model builders, marketing teams and engineers: pick your segment and see how X3DPrints can help.",
    quickLinks: [
      { label: "Prototypes & engineers", href: "/segments/3d-printing-prototypes" },
      { label: "Schools & Back to School", href: "/segments/3d-printing-back-to-school" },
      { label: "Marketing & seasonal", href: "/segments/3d-printing-marketing" },
      { label: "Makers & tabletop", href: "/segments/3d-printing-makers" },
      { label: "Valentine (Jan-Feb)", href: "/segments/3d-printing-valentijn" },
    ],
    chips: [
      { label: "Material Suggestion Tool", href: "/materials#material-suggestion-tool" },
      { label: "Read the blog", href: "/blog" },
    ],
  },
  sections: {
    core: { title: "Core segments", subtitle: "Prototypes, education, marketing" },
    seasonal: { title: "Seasonal & campaigns", subtitle: "Time-bound peaks" },
  },
  cards: {
    coreLabel: "Segment",
    seasonalLabel: "Seasonal",
    cta: "View segment",
  },
  coreSegments: [
    {
      slug: "segments/3d-printing-prototypes",
      title: "3D printing for prototypes",
      description: "Fast iterations with PLA Matte or PLA Tough+ for functional testing. Ideal for design teams and agencies.",
      highlights: [
        "Fast turnaround and iterations",
        "Feedback on DFM and materials",
        "Quote and planning aligned to your sprint",
      ],
    },
    {
      slug: "segments/3d-printing-scholen",
      title: "3D printing for schools",
      description: "Support for STEM and design tracks. Students send STL/STEP and we print with guiding tips.",
      highlights: [
        "Education bundles and bulk pricing",
        "Material Suggestion Tool for students",
        "Room for coaching and workshops",
      ],
    },
    {
      slug: "segments/3d-printing-modelbouwers",
      title: "3D printing for model builders",
      description: "PLA Wood, Marble and Translucent for scale models and scenery. We advise on detail level and finishing.",
      highlights: [
        "Special PLA blends (wood, silk, marble)",
        "Tips for glue, paint and assembly",
        "Local pickup for fragile parts",
      ],
    },
    {
      slug: "segments/3d-printing-engineers",
      title: "3D printing for engineers",
      description: "Precision prints in PLA Tough+ or PETG for jigs, fixtures and pre-production prototypes. Includes measurement reports.",
      highlights: [
        "Typical tolerance +/-0.2 mm",
        "Focused on strength and heat resistance",
        "Easy to combine with metal/electronics",
      ],
    },
    {
      slug: "segments/3d-printing-marketing",
      title: "3D printing for marketing & events",
      description: "Eye-catching props, awards and merchandising in PLA Silk+, Marble and Translucent for campaigns and activations.",
      highlights: [
        "Showpieces ready for photo shoots",
        "Fast runs for events and pop-ups",
        "Pickup in Herzele or shipping in Belgium",
      ],
    },
    {
      slug: "segments/3d-printing-makers",
      title: "3D printing for makers & hobbyists",
      description: "Local support for hobby projects, custom parts and repair jobs. Flexible planning and material advice.",
      highlights: [
        "Combine prints with electronics or wood",
        "Choose fast PLA or durable PETG",
        "Pickup in Herzele or shipping in Belgium",
      ],
    },
    {
      slug: "segments/3d-printing-tabletop",
      title: "3D printing for tabletop minis",
      description: "D&D and Warhammer miniatures, bases and dice towers with crisp detail. 3D model design not included; supply files or request design support.",
      highlights: [
        "0.12-0.16 mm layers for premium detail",
        "PLA Matte/PETG for minis and scenery, TPU for rubber feet",
        "Personal delivery or parcel service for fragile prints",
      ],
    },
  ],
  seasonalSegments: [
    {
      slug: "segments/3d-printing-back-to-school",
      title: "Back to School 3D printing",
      description: "Pen holders, nameplates, desk organizers and educational STEM models. Design file not included; supply files or design service.",
      highlights: [
        "PLA Matte/PETG for classroom items, TPU anti-slip feet",
        "Batching names/classes for consistent color",
        "Planning August-September without overpromising",
      ],
    },
    {
      slug: "segments/3d-printing-vaderdag-moederdag",
      title: "Father's Day & Mother's Day 3D printing",
      description: "Personalized keychains, desk items and name gifts. Design file not included; supply files or design service.",
      highlights: [
        "Silk/Matte PLA for a luxe or soft look; PETG for stronger items",
        "Text depth and rounded edges for daily use",
        "Batching names/initials for consistent finishing",
      ],
    },
    {
      slug: "segments/3d-printing-valentijn",
      title: "Valentine 3D printing",
      description: "Heart decor, name plaques and gifts in Silk, Matte and Translucent PLA. Design file not included; supply files or design service.",
      highlights: [
        "Silk/Marble for glossy gifts, Matte for soft pastels",
        "Cutouts for LEDs/magnets and anti-slip feet in TPU",
        "Planning toward Feb 14 without overpromising",
      ],
    },
    {
      slug: "segments/3d-printing-seasonal",
      title: "Seasonal 3D designs",
      description: "Autumn/Halloween, spring/Easter, summer, winter/Christmas decor. Design file not included; supply files or design service.",
      highlights: [
        "Silk/Marble/Translucent PLA for festive looks",
        "Outdoor props in PETG, anti-slip in TPU",
        "Local delivery or parcel service",
      ],
    },
  ],
  relatedBySlug: {
    "segments/3d-printing-prototypes": [
      { label: "Engineering segment", href: "/segments/3d-printing-engineers" },
      { label: "Services", href: "/services" },
      { label: "Pricing", href: "/pricing" },
    ],
    "segments/3d-printing-scholen": [
      { label: "Back to School", href: "/segments/3d-printing-back-to-school" },
      { label: "Materials", href: "/materials" },
      { label: "Viewer", href: "/viewer" },
    ],
    "segments/3d-printing-back-to-school": [
      { label: "Schools segment", href: "/segments/3d-printing-scholen" },
      { label: "Back to School blog", href: "/blog/3d-printen-back-to-school" },
      { label: "Material Suggestion Tool", href: "/materials#material-suggestion-tool" },
    ],
    "segments/3d-printing-modelbouwers": [
      { label: "Seasonal decor", href: "/segments/3d-printing-seasonal" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Materials", href: "/materials" },
    ],
    "segments/3d-printing-engineers": [
      { label: "Prototypes", href: "/segments/3d-printing-prototypes" },
      { label: "Pricing", href: "/pricing" },
      { label: "3D modeling", href: "/3d-modelleren" },
    ],
    "segments/3d-printing-marketing": [
      { label: "Seasonal segment", href: "/segments/3d-printing-seasonal" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Services", href: "/services" },
    ],
    "segments/3d-printing-makers": [
      { label: "Tabletop minis", href: "/segments/3d-printing-tabletop" },
      { label: "Materials", href: "/materials" },
      { label: "Viewer", href: "/viewer" },
    ],
    "segments/3d-printing-tabletop": [
      { label: "Makers & hobby", href: "/segments/3d-printing-makers" },
      { label: "Materials", href: "/materials" },
      { label: "Contact", href: "/contact" },
    ],
    "segments/3d-printing-vaderdag-moederdag": [
      { label: "Seasonal segment", href: "/segments/3d-printing-seasonal" },
      { label: "Father's/Mother's Day blog", href: "/blog/3d-printen-vaderdag-moederdag" },
      { label: "Contact", href: "/contact?material=pla-silk-plus" },
    ],
    "segments/3d-printing-valentijn": [
      { label: "Seasonal segment", href: "/segments/3d-printing-seasonal" },
      { label: "Valentine landing", href: "/valentijn-3d-printen" },
      { label: "Contact", href: "/contact?material=pla-silk-plus" },
    ],
    "segments/3d-printing-seasonal": [
      { label: "Marketing & events", href: "/segments/3d-printing-marketing" },
      { label: "Back to School", href: "/segments/3d-printing-back-to-school" },
      { label: "Seasonal blogs", href: "/blog" },
    ],
  },
  interlinks: {
    title: "Internal links between segments",
    body: "Combine tracks: back-to-school peaks in August-September, seasonal campaigns connect to marketing, and makers often care about tabletop or material advice too.",
    groups: [
      {
        title: "Education & Back to School",
        items: [
          { label: "Back to School segment", href: "/segments/3d-printing-back-to-school" },
          { label: "Schools segment", href: "/segments/3d-printing-scholen" },
          { label: "Back to School blog", href: "/blog/3d-printen-back-to-school" },
        ],
      },
      {
        title: "Marketing & seasonal campaigns",
        items: [
          { label: "Marketing & events", href: "/segments/3d-printing-marketing" },
          { label: "Seasonal segment", href: "/segments/3d-printing-seasonal" },
          { label: "Seasonal blogs", href: "/blog" },
        ],
      },
      {
        title: "Makers, tabletop & hobby",
        items: [
          { label: "Makers & hobbyists", href: "/segments/3d-printing-makers" },
          { label: "Tabletop minis", href: "/segments/3d-printing-tabletop" },
          { label: "Material Suggestion Tool", href: "/materials#material-suggestion-tool" },
        ],
      },
    ],
  },
  faq: {
    title: "Segment FAQ",
    items: [
      {
        q: "Which segments does X3DPrints serve?",
        a: "We often work for prototypes, schools, model builders, marketing/events and engineers. Each segment gets its own material and workflow tips.",
      },
      {
        q: "Can I request custom work outside these segments?",
        a: "Yes, the segments are directional. Share your use case; we look at material, tolerances and planning.",
      },
      {
        q: "How fast do I receive a proposal?",
        a: "Usually within 24 hours after STL/STEP and context. We align planning with complexity and volume.",
      },
    ],
  },
  readMore: {
    title: "Continue with your segment",
    intro: "Pick a segment and connect it to materials, pricing and a concrete request.",
    primaryLinks: [
      { label: "3D print service", href: "/services" },
      { label: "Materials and guidelines", href: "/materials" },
      { label: "Pricing and calculator", href: "/pricing" },
    ],
    secondaryLinks: [
      { label: "Portfolio", href: "/portfolio" },
      { label: "Material Suggestion Tool", href: "/materials#material-suggestion-tool" },
      { label: "Request a quote", href: "/contact" },
    ],
  },
  schema: {
    itemListName: "X3DPrints segments",
    language: "en-BE",
  },
}

type PageProps = { searchParams?: Promise<{ lang?: string } | undefined>; locale?: string }

export default function SegmentsPage({ locale }: PageProps) {
  const normalizedLocale = normalizeLocale(locale)
  const copy = normalizedLocale === "en" ? SEGMENTS_COPY_EN : SEGMENTS_COPY_NL
  const localize = (href: string) => localizeHref(href, normalizedLocale)
  const toAbsolute = (href: string) => `https://www.x3dprints.be${localize(href)}`

  const coreSegments = copy.coreSegments
  const seasonalSegments = copy.seasonalSegments
  const allSegments = [...coreSegments, ...seasonalSegments]

  const itemList = allSegments.map((segment, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: toAbsolute(`/${segment.slug}`),
    name: segment.title,
  }))

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: copy.schema.itemListName,
    itemListElement: itemList,
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",

    inLanguage: ["nl-BE", "en-BE"],
    mainEntity: copy.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  }

  return (
    <main className="relative overflow-clip px-4 pb-24 pt-12 sm:px-6 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-slate-50" />
        <div className="absolute -top-32 left-16 h-[24rem] w-[24rem] rounded-full bg-indigo-200/30 blur-[120px]" />
        <div className="absolute -bottom-32 right-10 h-[26rem] w-[26rem] rounded-full bg-sky-200/30 blur-[140px]" />
      </div>

      <header className="mx-auto max-w-4xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{copy.hero.eyebrow}</p>
        <h1 className="mt-3 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          {copy.hero.title}
        </h1>
        <p className="mt-4 text-base text-slate-600">{copy.hero.body}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-600">
          {copy.hero.quickLinks.map((link) => (
            <Link
              key={link.href}
              href={localize(link.href)}
              className="rounded-full border border-slate-300/70 bg-white/80 px-4 py-2 text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm text-slate-700">
          {copy.hero.chips.map((chip) => (
            <Link
              key={chip.href}
              href={localize(chip.href)}
              className="rounded-full border border-slate-300/70 bg-white/80 px-4 py-2 font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
            >
              {chip.label}
            </Link>
          ))}
        </div>
      </header>

      <section className="mx-auto mt-12 max-w-5xl space-y-6">
        <div className="flex items-baseline justify-between px-1">
          <h2 className="text-xl font-semibold text-slate-900">{copy.sections.core.title}</h2>
          <span className="text-xs uppercase tracking-[0.2em] text-slate-500">{copy.sections.core.subtitle}</span>
        </div>
        {coreSegments.map((segment) => (
          <GlassCard key={segment.slug} className="p-6 sm:p-8">
            <div className="sm:flex sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{copy.cards.coreLabel}</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">{segment.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{segment.description}</p>
              </div>
              <Link
                href={localize(`/${segment.slug}`)}
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white sm:mt-0"
              >
                {copy.cards.cta} <span aria-hidden>-&gt;</span>
              </Link>
            </div>
            <ul className="mt-4 grid gap-2 text-sm text-slate-600 md:grid-cols-2">
              {segment.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" aria-hidden />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        ))}
      </section>

      <section className="mx-auto mt-12 max-w-5xl space-y-6">
        <div className="flex items-baseline justify-between px-1">
          <h2 className="text-xl font-semibold text-slate-900">{copy.sections.seasonal.title}</h2>
          <span className="text-xs uppercase tracking-[0.2em] text-slate-500">{copy.sections.seasonal.subtitle}</span>
        </div>
        {seasonalSegments.map((segment) => (
          <GlassCard key={segment.slug} className="p-6 sm:p-8">
            <div className="sm:flex sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{copy.cards.seasonalLabel}</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">{segment.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{segment.description}</p>
              </div>
              <Link
                href={localize(`/${segment.slug}`)}
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white sm:mt-0"
              >
                {copy.cards.cta} <span aria-hidden>-&gt;</span>
              </Link>
            </div>
            <ul className="mt-4 grid gap-2 text-sm text-slate-600 md:grid-cols-2">
              {segment.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
            {copy.relatedBySlug[segment.slug]?.length ? (
              <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                {copy.relatedBySlug[segment.slug].map((link) => (
                  <Link
                    key={link.href}
                    href={localize(link.href)}
                    className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 transition hover:-translate-y-0.5 hover:bg-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </GlassCard>
        ))}
      </section>

      <section className="mx-auto mt-10 max-w-5xl space-y-4 px-2">
        <GlassCard className="p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-slate-900">{copy.interlinks.title}</h2>
          <p className="mt-2 text-sm text-slate-700">{copy.interlinks.body}</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {copy.interlinks.groups.map((group) => (
              <div key={group.title} className="rounded-2xl border border-slate-200/70 bg-white/80 p-4">
                <p className="text-sm font-semibold text-slate-900">{group.title}</p>
                <ul className="mt-2 space-y-2 text-sm text-slate-700">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link href={localize(item.href)} className="underline decoration-slate-300 hover:decoration-slate-500">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </GlassCard>
      </section>

      <section className="mx-auto mt-10 max-w-5xl px-2">
        <OrganizerCta locale={normalizedLocale === "en" ? "en" : "nl"} />
      </section>

      <section className="mx-auto mt-12 max-w-4xl px-2">
        <GlassCard className="p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-slate-900">{copy.faq.title}</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-700">
            {copy.faq.items.map((item) => (
              <div key={item.q} className="rounded-xl border border-slate-200/70 bg-white/80 p-4">
                <p className="text-base font-semibold text-slate-900">{item.q}</p>
                <p className="mt-1 text-slate-700">{item.a}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </section>

      <ReadMoreLinks
        title={copy.readMore.title}
        intro={copy.readMore.intro}
        primaryLinks={copy.readMore.primaryLinks}
        secondaryLinks={copy.readMore.secondaryLinks}
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </main>
  )
}
