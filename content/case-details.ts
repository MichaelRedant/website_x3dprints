export type CaseLocale = "nl" | "en"

export type CaseFaqItem = {
  question: string
  answer: string
}

export type CaseLink = {
  label: string
  href: string
}

export type CaseDetailLocaleContent = {
  metaTitle: string
  metaDescription: string
  ogTitle: string
  ogDescription: string
  breadcrumbLabel: string
  eyebrow: string
  heroTitle: string
  heroIntro: string
  challengeTitle: string
  challengeBody: string
  approachTitle: string
  approachBody: string
  impactTitle: string
  impactBullets: string[]
  links: CaseLink[]
  faqTitle: string
  faqItems: CaseFaqItem[]
  ctaPrimaryLabel: string
  ctaSecondaryLabel: string
}

export type CaseDetailEntry = {
  slug: string
  publishAt: string
  contactTopic: string
  contactMaterial: string
  serviceName: { nl: string; en: string }
  serviceDescription: { nl: string; en: string }
  locale: Record<CaseLocale, CaseDetailLocaleContent>
}

const CASE_DETAILS: CaseDetailEntry[] = [
  {
    slug: "octopus-accountancy-3d-print-goodies",
    publishAt: "2026-03-10T08:00:00+01:00",
    contactTopic: "case-octopus-event-goodies",
    contactMaterial: "PLA Matte",
    serviceName: {
      nl: "B2B event-goodies op maat",
      en: "Custom B2B event goodies",
    },
    serviceDescription: {
      nl: "Herhaalbare batchflow voor branded eventmateriaal.",
      en: "Repeatable batch workflow for branded event assets.",
    },
    locale: {
      nl: {
        metaTitle: "Case: Octopus event-goodies met 3D printen | X3DPrints",
        metaDescription:
          "Case over branded 3D-geprinte event-goodies voor Octopus met consistente kwaliteit en snelle levercadans.",
        ogTitle: "Case: Octopus x X3DPrints event-goodies",
        ogDescription: "Van briefing naar batch: 3D-geprinte eventmaterialen met vaste kwaliteit.",
        breadcrumbLabel: "Octopus event-goodies",
        eyebrow: "B2B marketing case",
        heroTitle: "Octopus event-goodies met voorspelbare 3D-print kwaliteit",
        heroIntro:
          "Voor terugkerende events is een vaste batchflow cruciaal. Deze case toont hoe consistentie en snelheid gecombineerd werden.",
        challengeTitle: "Uitdaging",
        challengeBody:
          "Eventmateriaal moet snel leverbaar zijn zonder variatie in afwerking, kleurimpact of maatvastheid.",
        approachTitle: "Aanpak",
        approachBody:
          "Vaste productieprofielen, duidelijke QC-checkpoints en een sample-run per nieuwe variant.",
        impactTitle: "Resultaat",
        impactBullets: [
          "Kortere doorlooptijd tussen briefing en leverbaar materiaal.",
          "Consistente branding over meerdere events.",
          "Minder herwerk bij re-orders.",
        ],
        links: [
          { label: "Services", href: "/services" },
          { label: "Pricing", href: "/pricing" },
          { label: "Blog context", href: "/blog/octopus-accountancy-3d-print-goodies" },
        ],
        faqTitle: "FAQ",
        faqItems: [
          {
            question: "Werkt dit ook voor kleine eventreeksen?",
            answer: "Ja, de flow is net ontworpen voor korte runs met voorspelbaar resultaat.",
          },
          {
            question: "Kan je latere re-orders identiek maken?",
            answer: "Ja, met vaste productie-instellingen blijft de output consistent.",
          },
          {
            question: "Welke materialen werken het best voor branding-items?",
            answer: "Vaak PLA Matte en PLA Silk+, afhankelijk van look en gebruik.",
          },
        ],
        ctaPrimaryLabel: "Start B2B intake",
        ctaSecondaryLabel: "Bekijk materiaaladvies",
      },
      en: {
        metaTitle: "Case: Octopus event goodies with 3D printing | X3DPrints",
        metaDescription:
          "Case on branded 3D printed event goodies for Octopus with consistent quality and fast delivery cadence.",
        ogTitle: "Case: Octopus x X3DPrints event goodies",
        ogDescription: "From briefing to batch: repeatable 3D printed event assets.",
        breadcrumbLabel: "Octopus event goodies",
        eyebrow: "B2B marketing case",
        heroTitle: "Octopus event goodies with predictable 3D print quality",
        heroIntro:
          "Recurring events need a stable batch flow. This case shows how speed and consistency were combined.",
        challengeTitle: "Challenge",
        challengeBody:
          "Event assets must be delivered quickly without quality drift in finish, color impact or dimensional fit.",
        approachTitle: "Approach",
        approachBody:
          "Fixed production profiles, clear QC checkpoints and sample runs for each new variant.",
        impactTitle: "Outcome",
        impactBullets: [
          "Shorter lead time from briefing to deliverable assets.",
          "Consistent branding across multiple events.",
          "Less rework in repeat orders.",
        ],
        links: [
          { label: "Services", href: "/en/services" },
          { label: "Pricing", href: "/en/pricing" },
          { label: "Blog context", href: "/en/blog/octopus-accountancy-3d-print-goodies" },
        ],
        faqTitle: "FAQ",
        faqItems: [
          {
            question: "Does this work for small event series?",
            answer: "Yes, the flow is designed for short runs with predictable output.",
          },
          {
            question: "Can repeat orders stay identical?",
            answer: "Yes, fixed production settings keep results consistent.",
          },
          {
            question: "Which materials work best for branding items?",
            answer: "Often PLA Matte and PLA Silk+, depending on look and use.",
          },
        ],
        ctaPrimaryLabel: "Start B2B intake",
        ctaSecondaryLabel: "Open material advice",
      },
    },
  },
  {
    slug: "3d-geprinte-platen-nasiam",
    publishAt: "2026-03-17T08:00:00+01:00",
    contactTopic: "case-nasiam-signage",
    contactMaterial: "PETG",
    serviceName: {
      nl: "3D-geprinte retailsignage op maat",
      en: "Custom 3D printed retail signage",
    },
    serviceDescription: {
      nl: "Herbruikbare QR-signage voor winkel- en salonomgevingen.",
      en: "Reusable QR signage for store and salon environments.",
    },
    locale: {
      nl: {
        metaTitle: "Case: 3D-geprinte platen voor NaSiam | X3DPrints",
        metaDescription:
          "Case over herbruikbare 3D-geprinte QR-platen voor NaSiam met duidelijke scanflow en professionele uitstraling.",
        ogTitle: "Case: 3D-geprinte platen voor NaSiam",
        ogDescription: "Retailsignage met QR-flow, herbruikbaar ontwerp en snelle plaatsing.",
        breadcrumbLabel: "NaSiam platen",
        eyebrow: "Retail service case",
        heroTitle: "NaSiam QR-platen: lokaal zichtbaar met herbruikbare 3D-signage",
        heroIntro:
          "Deze case focust op scanbare, nette en duurzame signage voor een zaak waar visuele helderheid belangrijk is.",
        challengeTitle: "Uitdaging",
        challengeBody:
          "Signage moet leesbaar, stevig en snel inzetbaar zijn in een drukke winkel- of salonomgeving.",
        approachTitle: "Aanpak",
        approachBody:
          "Iteratieve vormvalidatie op scanbaarheid, materiaalkeuze per gebruikscontext en nette zichtafwerking.",
        impactTitle: "Resultaat",
        impactBullets: [
          "Duidelijke QR-flow in de zaak.",
          "Professionele look met herbruikbare assets.",
          "Snelle implementatie zonder complexe montage.",
        ],
        links: [
          { label: "Portfolio", href: "/portfolio" },
          { label: "Services", href: "/services" },
          { label: "Blog context", href: "/blog/3d-geprinte-platen-nasiam" },
        ],
        faqTitle: "FAQ",
        faqItems: [
          {
            question: "Zijn deze platen geschikt voor dagelijks gebruik?",
            answer: "Ja, materiaal en afwerking zijn gekozen voor regelmatig gebruik.",
          },
          {
            question: "Kunnen QR-platen later aangepast worden?",
            answer: "Ja, de opzet is modulair zodat updates snel mogelijk zijn.",
          },
          {
            question: "Is dit ook geschikt voor kleine zaken?",
            answer: "Ja, je kan met kleine reeksen starten en later opschalen.",
          },
        ],
        ctaPrimaryLabel: "Start retail intake",
        ctaSecondaryLabel: "Bekijk prijzen",
      },
      en: {
        metaTitle: "Case: 3D printed signs for NaSiam | X3DPrints",
        metaDescription:
          "Case on reusable 3D printed QR signs for NaSiam with clear scan flow and professional in-store visibility.",
        ogTitle: "Case: 3D printed signs for NaSiam",
        ogDescription: "Retail signage with QR flow, reusable design and fast implementation.",
        breadcrumbLabel: "NaSiam signs",
        eyebrow: "Retail service case",
        heroTitle: "NaSiam QR signs: local visibility with reusable 3D signage",
        heroIntro:
          "This case focuses on scannable, durable and clean signage for a business where visual clarity matters.",
        challengeTitle: "Challenge",
        challengeBody:
          "Signage must be readable, durable and fast to deploy in a busy store or salon context.",
        approachTitle: "Approach",
        approachBody:
          "Iterative form validation for scanability, context-based material selection and clean visible finish.",
        impactTitle: "Outcome",
        impactBullets: [
          "Clear in-store QR flow.",
          "Professional look with reusable assets.",
          "Fast implementation without complex mounting.",
        ],
        links: [
          { label: "Portfolio", href: "/en/portfolio" },
          { label: "Services", href: "/en/services" },
          { label: "Blog context", href: "/en/blog/3d-geprinte-platen-nasiam" },
        ],
        faqTitle: "FAQ",
        faqItems: [
          {
            question: "Are these signs suitable for daily use?",
            answer: "Yes, materials and finish are chosen for frequent handling.",
          },
          {
            question: "Can QR signs be updated later?",
            answer: "Yes, the setup is modular so updates are quick.",
          },
          {
            question: "Is this only for large stores?",
            answer: "No, small businesses can start with short runs and scale later.",
          },
        ],
        ctaPrimaryLabel: "Start retail intake",
        ctaSecondaryLabel: "View pricing",
      },
    },
  },
  {
    slug: "prototyping-kleine-reeksen-3d-printen",
    publishAt: "2026-03-24T08:00:00+01:00",
    contactTopic: "case-b2b-prototyping",
    contactMaterial: "PETG",
    serviceName: {
      nl: "B2B prototyping en kleine reeksen",
      en: "B2B prototyping and short runs",
    },
    serviceDescription: {
      nl: "Van mock-up naar pilotbatch met gecontroleerde faseovergangen.",
      en: "From mock-up to pilot batch with controlled phase transitions.",
    },
    locale: {
      nl: {
        metaTitle: "Case: prototyping en kleine reeksen | X3DPrints",
        metaDescription:
          "B2B caseflow van eerste prototype naar kleine reeks met betere materiaalkeuze, snellere iteratie en duidelijke go/no-go punten.",
        ogTitle: "Case: B2B prototyping en kleine reeksen",
        ogDescription: "Van mock-up naar pilotrun met heldere fasegrenzen en minder herwerk.",
        breadcrumbLabel: "Prototyping flow",
        eyebrow: "Productontwikkeling case",
        heroTitle: "Prototype naar kleine reeks met minder herwerk",
        heroIntro:
          "Deze case laat zien hoe teams sneller valideren door design-, materiaal- en pilotbeslissingen in één flow te verbinden.",
        challengeTitle: "Uitdaging",
        challengeBody:
          "Zonder strakke fasegrenzen ontstaan vertragingen tussen concept, test en eerste pilotbatch.",
        approachTitle: "Aanpak",
        approachBody:
          "Eerst vormvalidatie, daarna functionele test, dan pas kleine reeks met vaste kwaliteitscriteria.",
        impactTitle: "Resultaat",
        impactBullets: [
          "Kortere iteratielussen.",
          "Betere materiaalfit per fase.",
          "Snellere pilotbeslissingen.",
        ],
        links: [
          { label: "Pricing", href: "/pricing" },
          { label: "Materialen", href: "/materials#material-suggestion-tool" },
          { label: "Blog context", href: "/blog/prototyping-kleine-reeksen-3d-printen" },
        ],
        faqTitle: "FAQ",
        faqItems: [
          {
            question: "Wanneer ga je van prototype naar kleine reeks?",
            answer: "Als vorm, functie en toleranties stabiel genoeg zijn voor herhaalbare output.",
          },
          {
            question: "Met welk materiaal start je?",
            answer: "Vaak PLA voor snelheid, daarna PETG of TPU voor functionele eisen.",
          },
          {
            question: "Werkt dit ook voor kleine teams?",
            answer: "Ja, net daar is een strakke flow vaak het meest winstgevend.",
          },
        ],
        ctaPrimaryLabel: "Start prototype intake",
        ctaSecondaryLabel: "Open materiaaltool",
      },
      en: {
        metaTitle: "Case: prototyping and short runs | X3DPrints",
        metaDescription:
          "B2B case flow from first prototype to short run with better material decisions, faster iteration and clear go/no-go points.",
        ogTitle: "Case: B2B prototyping and short runs",
        ogDescription: "From mock-up to pilot run with clear phase gates and less rework.",
        breadcrumbLabel: "Prototyping flow",
        eyebrow: "Product development case",
        heroTitle: "Prototype to short run with less rework",
        heroIntro:
          "This case shows how teams validate faster by linking design, material and pilot decisions in one flow.",
        challengeTitle: "Challenge",
        challengeBody:
          "Without clear phase boundaries, delays appear between concept, testing and pilot production.",
        approachTitle: "Approach",
        approachBody:
          "First form validation, then functional test, then short run with fixed quality criteria.",
        impactTitle: "Outcome",
        impactBullets: [
          "Shorter iteration loops.",
          "Better material fit per phase.",
          "Faster pilot decisions.",
        ],
        links: [
          { label: "Pricing", href: "/en/pricing" },
          { label: "Materials", href: "/en/materials#material-suggestion-tool" },
          { label: "Blog context", href: "/en/blog/prototyping-kleine-reeksen-3d-printen" },
        ],
        faqTitle: "FAQ",
        faqItems: [
          {
            question: "When do you move from prototype to short run?",
            answer: "When form, function and tolerances are stable for repeatable output.",
          },
          {
            question: "Which material should phase one use?",
            answer: "Often PLA for speed, then PETG or TPU for functional requirements.",
          },
          {
            question: "Does this work for small teams too?",
            answer: "Yes, small teams often gain the most from a strict flow.",
          },
        ],
        ctaPrimaryLabel: "Start prototype intake",
        ctaSecondaryLabel: "Open material tool",
      },
    },
  },
  {
    slug: "retail-pos-3d-printen",
    publishAt: "2026-04-07T08:00:00+01:00",
    contactTopic: "case-retail-pos",
    contactMaterial: "PLA Matte",
    serviceName: {
      nl: "Retail POS displays met 3D-printen",
      en: "Retail POS displays with 3D printing",
    },
    serviceDescription: {
      nl: "Van displayconcept naar pilot in meerdere winkels.",
      en: "From display concept to pilot in multiple stores.",
    },
    locale: {
      nl: {
        metaTitle: "Case: retail POS displays 3D printen | X3DPrints",
        metaDescription:
          "Case over retail POS: sneller testen in één winkel en gecontroleerd uitrollen naar meerdere locaties met modulaire 3D-displays.",
        ogTitle: "Case: retail POS displays met 3D-printen",
        ogDescription: "Retail case van concept naar pilot met modulaire displayonderdelen.",
        breadcrumbLabel: "Retail POS",
        eyebrow: "Retail POS case",
        heroTitle: "Retail POS sneller valideren met modulaire 3D-displays",
        heroIntro:
          "Deze case toont hoe je displayconcepten eerst op de vloer test en pas daarna opschaalt naar meerdere locaties.",
        challengeTitle: "Uitdaging",
        challengeBody:
          "Concepten die online sterk lijken, botsen in winkels vaak op ruimte, zichtlijnen en montagepraktijk.",
        approachTitle: "Aanpak",
        approachBody:
          "Modulaire onderdelen voor snelle winkeltest, gevolgd door pilotbatch en iteratieve finetuning.",
        impactTitle: "Resultaat",
        impactBullets: [
          "Snellere feedback in echte winkelcontext.",
          "Minder risico op dure correcties bij uitrol.",
          "Beter onderbouwde rollout-beslissingen.",
        ],
        links: [
          { label: "Services", href: "/services" },
          { label: "Portfolio", href: "/portfolio" },
          { label: "Blog context", href: "/blog/retail-pos-3d-printen" },
        ],
        faqTitle: "FAQ",
        faqItems: [
          {
            question: "Kan ik met één testlocatie starten?",
            answer: "Ja, dat is meestal de snelste manier om frictie te ontdekken.",
          },
          {
            question: "Zijn POS onderdelen herbruikbaar?",
            answer: "Ja, veel onderdelen kunnen opnieuw ingezet of aangepast worden.",
          },
          {
            question: "Werkt dit voor korte campagnes?",
            answer: "Ja, 3D-printen is sterk voor korte retail- en activatiecycli.",
          },
        ],
        ctaPrimaryLabel: "Start retail intake",
        ctaSecondaryLabel: "Bekijk services",
      },
      en: {
        metaTitle: "Case: retail POS displays with 3D printing | X3DPrints",
        metaDescription:
          "Case on retail POS: test faster in one store and scale to multiple locations with modular 3D printed displays.",
        ogTitle: "Case: retail POS displays with 3D printing",
        ogDescription: "Retail case from concept to pilot with modular display components.",
        breadcrumbLabel: "Retail POS",
        eyebrow: "Retail POS case",
        heroTitle: "Validate retail POS faster with modular 3D displays",
        heroIntro:
          "This case shows how display concepts are tested in-store first, then scaled to multiple locations.",
        challengeTitle: "Challenge",
        challengeBody:
          "Concepts that look strong online often fail under real store constraints and sight lines.",
        approachTitle: "Approach",
        approachBody:
          "Modular parts for fast store testing, followed by pilot batches and iterative tuning.",
        impactTitle: "Outcome",
        impactBullets: [
          "Faster feedback in real store context.",
          "Lower risk of costly rollout corrections.",
          "Better evidence for rollout decisions.",
        ],
        links: [
          { label: "Services", href: "/en/services" },
          { label: "Portfolio", href: "/en/portfolio" },
          { label: "Blog context", href: "/en/blog/retail-pos-3d-printen" },
        ],
        faqTitle: "FAQ",
        faqItems: [
          {
            question: "Can I start with one test location?",
            answer: "Yes, it is usually the fastest way to uncover friction.",
          },
          {
            question: "Are POS parts reusable?",
            answer: "Yes, many parts can be reused or adapted.",
          },
          {
            question: "Is this suitable for short campaigns?",
            answer: "Yes, 3D printing works well for short retail cycles.",
          },
        ],
        ctaPrimaryLabel: "Start retail intake",
        ctaSecondaryLabel: "View services",
      },
    },
  },
  {
    slug: "kapot-onderdeel-laten-printen",
    publishAt: "2026-04-21T08:00:00+01:00",
    contactTopic: "case-repair-flow",
    contactMaterial: "PETG",
    serviceName: {
      nl: "Repair flow voor vervangonderdelen",
      en: "Repair flow for replacement parts",
    },
    serviceDescription: {
      nl: "Van defectanalyse naar testfit en kleine reeks.",
      en: "From defect analysis to fit test and short run.",
    },
    locale: {
      nl: {
        metaTitle: "Case: kapot onderdeel laten printen | X3DPrints",
        metaDescription:
          "Repair caseflow voor vervangonderdelen: intake, fit-check en materiaalkeuze om downtime te verkorten.",
        ogTitle: "Case: kapot onderdeel laten printen",
        ogDescription: "Praktische repair-case met snelle validatie en kleine reservebatch.",
        breadcrumbLabel: "Repair flow",
        eyebrow: "Repair case",
        heroTitle: "Kapot onderdeel? Van defect naar vervanging met korte repair-flow",
        heroIntro:
          "Deze case toont hoe je met een gestructureerde intake en testfit downtime beperkt bij moeilijk vindbare onderdelen.",
        challengeTitle: "Uitdaging",
        challengeBody:
          "Originele onderdelen zijn niet altijd beschikbaar, waardoor apparatuur onnodig lang stilstaat.",
        approachTitle: "Aanpak",
        approachBody:
          "Defectanalyse, geometrieherstel, testfit en daarna pas kleine reeks of reservebatch.",
        impactTitle: "Resultaat",
        impactBullets: [
          "Snellere beschikbaarheid van functionele vervangstukken.",
          "Minder trial-and-error dankzij fit-checks.",
          "Reserveonderdelen meteen meeplanbaar.",
        ],
        links: [
          { label: "3D-printen", href: "/3d-printen" },
          { label: "Materialen", href: "/materials" },
          { label: "Blog context", href: "/blog/kapot-onderdeel-laten-printen" },
        ],
        faqTitle: "FAQ",
        faqItems: [
          {
            question: "Moet ik een 3D-bestand hebben om te starten?",
            answer: "Nee, een foto of voorbeelddeel is vaak al voldoende voor intake.",
          },
          {
            question: "Is een geprint vervangstuk sterk genoeg?",
            answer: "Dat hangt af van belasting en materiaal, daarom starten we met een testfit.",
          },
          {
            question: "Kan ik direct meerdere stuks laten maken?",
            answer: "Ja, na validatie kan een kleine reeks of reservebatch meteen.",
          },
        ],
        ctaPrimaryLabel: "Start repair intake",
        ctaSecondaryLabel: "Bekijk materialen",
      },
      en: {
        metaTitle: "Case: print a broken part | X3DPrints",
        metaDescription:
          "Repair case workflow for replacement parts: intake, fit checks and material selection to reduce downtime.",
        ogTitle: "Case: print a broken part",
        ogDescription: "Practical repair case with fast validation and short spare batches.",
        breadcrumbLabel: "Repair flow",
        eyebrow: "Repair case",
        heroTitle: "Broken part? From defect to replacement in a short repair flow",
        heroIntro:
          "This case shows how structured intake and fit checks reduce downtime for hard-to-source parts.",
        challengeTitle: "Challenge",
        challengeBody:
          "Original parts are often unavailable, causing avoidable downtime.",
        approachTitle: "Approach",
        approachBody:
          "Defect analysis, geometry rebuild, fit check, then short run or spare batch.",
        impactTitle: "Outcome",
        impactBullets: [
          "Faster availability of functional replacement parts.",
          "Less trial-and-error through fit checks.",
          "Spare parts can be planned in the same run.",
        ],
        links: [
          { label: "3D printing", href: "/en/3d-printen" },
          { label: "Materials", href: "/en/materials" },
          { label: "Blog context", href: "/en/blog/kapot-onderdeel-laten-printen" },
        ],
        faqTitle: "FAQ",
        faqItems: [
          {
            question: "Do I need a 3D file to start?",
            answer: "No, a photo or sample part is often enough for intake.",
          },
          {
            question: "Will a printed replacement part be strong enough?",
            answer: "It depends on load and material, so we start with fit validation.",
          },
          {
            question: "Can I order multiple pieces immediately?",
            answer: "Yes, after validation a short run or spare batch is straightforward.",
          },
        ],
        ctaPrimaryLabel: "Start repair intake",
        ctaSecondaryLabel: "View materials",
      },
    },
  },
]

export function getCaseDetailSlugs() {
  return CASE_DETAILS.map((entry) => entry.slug)
}

export function getCaseDetailBySlug(slug: string) {
  return CASE_DETAILS.find((entry) => entry.slug === slug) ?? null
}
