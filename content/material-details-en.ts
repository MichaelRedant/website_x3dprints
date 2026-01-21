import { MATERIAL_SLUGS, type MaterialKey } from "@/lib/materials"
import type { FaqItem, MaterialDetailContent } from "./material-details"

const materialFaqEn: Record<MaterialKey, FaqItem[]> = {
  PLA_TOUGH_PLUS: [
    {
      question: "Is PLA Tough+ suitable for functional 3D prints?",
      answer:
        "PLA Tough+ combines PLA-level detail with higher impact resistance, so clamps, assembly aids and protective covers handle daily use.",
    },
    {
      question: "What temperature can PLA Tough+ withstand?",
      answer:
        "Prints stay dimensionally stable up to about 60 C; for hotter applications we switch to PETG or Nylon.",
    },
  ],
  PLA_MATTE: [
    {
      question: "Why choose PLA Matte filament for design models?",
      answer:
        "The micro-rough finish diffuses light so layer lines disappear and prototypes look camera-ready without post-processing.",
    },
    {
      question: "How do you care for PLA Matte prints?",
      answer:
        "Dust with a soft cloth and lightly sand with 400 grit before paint or primer so the matte skin stays even.",
    },
  ],
  PLA_GLOW: [
    {
      question: "How long does PLA Glow shine after charging?",
      answer:
        "After about 10 minutes of bright light or UV, it glows for 3-6 hours, ideal for safety markers and decor pieces.",
    },
    {
      question: "Is PLA Glow safe for indoor use?",
      answer:
        "Yes, the phosphorescent pigments are encapsulated in PLA and do not emit odor or loose particles.",
    },
  ],
  PLA_MARBLE: [
    {
      question: "Does PLA Marble create a realistic marble look?",
      answer:
        "The subtle speckles and soft sheen mimic natural stone, so busts and interior pieces look premium without paint.",
    },
    {
      question: "Can you post-process PLA Marble?",
      answer:
        "Use fine grit to remove seams; polishing keeps the grain visible and adds depth.",
    },
  ],
  PLA_SPARKLE: [
    {
      question: "What makes PLA Sparkle stand out?",
      answer:
        "Reflective flakes shimmer under spotlights, perfect for awards, retail displays and eye-catchers.",
    },
    {
      question: "Do you need special hardware for PLA Sparkle?",
      answer:
        "We print with a hardened nozzle so the glitter does not wear the orifice; standard PLA settings work otherwise.",
    },
  ],
  PLA_METAL: [
    {
      question: "Does PLA Metal really look like brushed metal?",
      answer:
        "Mica additives give a metallic sheen so prototypes and enclosures can look like anodized aluminum.",
    },
    {
      question: "How heavy does PLA Metal feel?",
      answer:
        "It weighs like PLA but looks solid; we add weight with infill or brass inserts.",
    },
  ],
  PLA_GALAXY: [
    {
      question: "What do you use PLA Galaxy filament for?",
      answer:
        "The mix of purple, blue and sparkle gives a cosmic effect that stands out for events, merchandising and gaming props.",
    },
    {
      question: "Can PLA Galaxy handle fine details?",
      answer:
        "Yes, despite the glitter we print reliably at 0.2 mm layers without stringing or nozzle buildup.",
    },
  ],
  PLA_AERO: [
    {
      question: "Why choose PLA Aero for lightweight parts?",
      answer:
        "The foamed structure makes it up to 40% lighter than classic PLA, ideal for drones, RC wings and volume studies.",
    },
    {
      question: "What does the finish of PLA Aero look like?",
      answer:
        "The surface is satin-soft with micro-bubbles; after light sanding you can paint or varnish it.",
    },
  ],
  PLA_SILK_PLUS: [
    {
      question: "When should you choose PLA Silk+ filament?",
      answer:
        "When you want showpieces with mirror gloss; Silk+ highlights curves and makes awards or branding objects instantly photogenic.",
    },
    {
      question: "Does PLA Silk+ keep sharp details?",
      answer:
        "The self-leveling polymers fill micro-steps so logos and typography stay crisp even at 0.2 mm layers.",
    },
  ],
  PLA_BASIC_GRADIENT: [
    {
      question: "How do you control the gradient with PLA Gradient?",
      answer:
        "We set the spool start position and can print multiple objects so the transition flows across the visible face.",
    },
    {
      question: "Are PLA Gradient colors repeatable?",
      answer:
        "Each spool has a unique pattern; we document the used tint, but slight variations are part of the gradient effect.",
    },
  ],
  PLA_BASIC: [
    {
      question: "When is PLA Basic the best choice?",
      answer:
        "For fast prototypes, educational models and displays: it is affordable, durable and available in many colors.",
    },
    {
      question: "Can PLA Basic be used outdoors?",
      answer:
        "Short-term, yes, but prolonged sun or heat can deform it; for outdoor projects we recommend PETG or ASA.",
    },
  ],
  PETG: [
    {
      question: "Why PETG for functional 3D prints?",
      answer:
        "PETG is impact resistant, slightly flexible and more heat resistant than PLA, ideal for enclosures, clamps and outdoor parts.",
    },
    {
      question: "How do you minimize stringing with PETG?",
      answer:
        "We dry each spool, tune retraction and use PEI or glue stick so parts stay smooth.",
    },
  ],
  PC: [
    {
      question: "When do you choose PC instead of PETG?",
      answer:
        "Polycarbonate stays dimensionally stable above 110 C, is UV resistant and can live outdoors. We use it for machine covers, brackets near motors and parts that face constant sun or chemicals.",
    },
    {
      question: "How do you avoid cracking or warping with PC?",
      answer:
        "We dry each spool at least eight hours, then print in an enclosed machine with high bed temperature and glue stick. Perimeter settings and controlled cooling reduce stress.",
    },
  ],

  PC_FR: [
    {
      question: "What makes PC FR flame retardant?",
      answer:
        "It is UL94 V-0 certified and self-extinguishes within seconds. Ideal for electronics and machine housings that require flame retardancy.",
    },
    {
      question: "When pick PC FR over standard PC?",
      answer:
        "For applications with higher fire risk or compliance needs (panels, DIN-rail enclosures, automotive). You get similar strength and heat resistance plus certified flame retardancy.",
    },
  ],

  PLA_TRANSLUCENT: [
    {
      question: "How much light does PLA Translucent transmit?",
      answer:
        "With 0.8 mm walls you get a soft glow; we tune wall thickness or vase mode for even lighting.",
    },
    {
      question: "Does PLA Translucent discolor under UV?",
      answer:
        "Indoors the tint stays stable; for long outdoor use we switch to PETG Translucent.",
    },
  ],
  PLA_SILK_MULTI_COLOR: [
    {
      question: "Can you control where the colors fall with PLA Silk Multi-Color?",
      answer:
        "We position the spool and sometimes print multiple parts to spread the gradient, but each print stays unique.",
    },
    {
      question: "Is PLA Silk Multi-Color prone to scratches?",
      answer:
        "The mirror gloss shows scratches faster; a thin varnish protects merch and awards during transport.",
    },
  ],
  PLA_CF: [
    {
      question: "What do you use PLA-CF filament for?",
      answer:
        "The carbon fibers increase stiffness and dimensional stability, perfect for jigs, drone frames and technical brackets.",
    },
    {
      question: "Do you need special nozzles for PLA-CF?",
      answer:
        "Yes, we print with hardened steel nozzles so the fibers do not cause wear and tolerances stay accurate.",
    },
  ],
  PLA_WOOD: [
    {
      question: "Does PLA Wood really look like wood?",
      answer:
        "The material contains real wood particles, so prints look and smell warm and organic without paint.",
    },
    {
      question: "Can you finish PLA Wood like wood?",
      answer:
        "Sanding, staining and varnishing work like soft wood; a higher print temperature gives a darker tone.",
    },
  ],
  TPU: [
    {
      question: "What is the Shore hardness of your TPU prints?",
      answer:
        "We use Shore 95A TPU, firm enough for protection but flexible for grips, bumpers and vibration dampers.",
    },
    {
      question: "Is TPU resistant to oil and grease?",
      answer:
        "Yes, the filament resists most oils and lubricants; for aggressive chemicals we test together first.",
    },
  ],
}

const detailsEn: MaterialDetailContent[] = [
  {
    key: "PLA_TOUGH_PLUS",
    slug: MATERIAL_SLUGS["PLA_TOUGH_PLUS"],
    heroTagline: "Tough PLA without the hassle",
    heroDescription:
      "PLA Tough+ combines the ease of PLA with extra toughness. Perfect for parts that need to absorb impact while staying clean and precise.",
    summary:
      "Built for prototypes, clamps and covers that take a knock. It prints as easily as standard PLA but deforms less on impact.",
    highlights: [
      {
        title: "Impact resistant",
        description:
          "The PLA+ blend adds elasticity so parts do not crack immediately when loaded.",
      },
      {
        title: "Accurate details",
        description:
          "Low shrink keeps dimensions reliable for tight fits and assemblies.",
      },
      {
        title: "Low odor",
        description:
          "Like classic PLA, Tough+ does not emit a strong smell during printing.",
      },
    ],
    idealFor: [
      "Functional prototypes that need real-world testing",
      "Assembly aids and light clamps",
      "Protective covers for electronics",
      "Cosplay parts with a longer lifespan",
    ],
    specs: [
      { label: "Glass transition", value: "~60 C" },
      { label: "Tensile strength", value: "65 MPa" },
      { label: "Recommended layer height", value: "0.16-0.28 mm" },
    ],
    printTips: [
      "Print around 215-225 C for the best balance between adhesion and detail.",
      "An enclosure is not required, but avoid drafts for a uniform finish.",
      "Let parts cool on the bed after printing to reduce warping.",
    ],
    seo: {
      title: "PLA Tough+ filament for durable 3D prints",
      description:
        "Discover PLA Tough+ at X3DPrints: extra impact-resistant PLA for functional 3D prints, assembly aids and sturdy prototypes.",
    },
    leadTime: "Typical lead time 2-3 business days",
    priceIndicator: "Price indicator: Medium",
    faq: materialFaqEn["PLA_TOUGH_PLUS"],
  },
  {
    key: "PLA_MATTE",
    slug: MATERIAL_SLUGS["PLA_MATTE"],
    heroTagline: "Matte prints with a design finish",
    heroDescription:
      "PLA Matte delivers a smooth, soft finish so your 3D prints look cast or injection molded.",
    summary:
      "This material hides layer lines, ideal for design mockups, interior pieces and marketing models.",
    highlights: [
      {
        title: "Premium look",
        description:
          "The diffuse finish catches light nicely without glare. Perfect for product photography and presentation.",
      },
      {
        title: "Color stable spools",
        description:
          "PLA Matte pigments stay stable even during longer prints or higher temperatures.",
      },
      {
        title: "Crisp edges",
        description:
          "Low shrink keeps sharp lines and logos readable.",
      },
    ],
    idealFor: [
      "Architectural models",
      "Product mockups and branding props",
      "Interior decor",
      "Visible electronics housings",
    ],
    specs: [
      { label: "Gloss", value: "< 10 GU" },
      { label: "Recommended temperature", value: "205-215 C" },
      { label: "Bed temperature", value: "50-60 C" },
    ],
    printTips: [
      "Use a lower print speed (max 80 mm/s) for an even matte skin.",
      "Cool aggressively (70-100%) to keep detail in sharp corners.",
      "For an ultra-matte finish, lightly sand with 400 grit or higher.",
    ],
    seo: {
      title: "Matte PLA filament for design-grade prints",
      description:
        "PLA Matte at X3DPrints delivers a premium, low-gloss finish for models, prototypes and interior accessories.",
    },
    leadTime: "Typical lead time 2 business days",
    priceIndicator: "Price indicator: Low",
    faq: materialFaqEn["PLA_MATTE"],
  },
  {
    key: "PLA_GLOW",
    slug: MATERIAL_SLUGS["PLA_GLOW"],
    heroTagline: "Glow-in-the-dark statement",
    heroDescription:
      "PLA Glow gives your designs a striking glow once the lights go out. Ideal for playful accessories or safety markers.",
    summary:
      "With fast-charging phosphorescent pigments, you can create prints that shine brightly for hours.",
    highlights: [
      {
        title: "Strong afterglow",
        description:
          "High-quality pigments store light efficiently, keeping the glow visible for hours.",
      },
      {
        title: "Safety markers",
        description:
          "Perfect for emergency icons or stair edges where extra visibility helps.",
      },
      {
        title: "Multiple colors",
        description:
          "Available in several glow shades, from classic green to aqua and orange.",
      },
    ],
    idealFor: [
      "Decorative home accessories",
      "Educational models and STEM projects",
      "Safety labels or markers",
      "Kids gadgets and cosplay props",
    ],
    specs: [
      { label: "Charge time", value: "~10 min bright light" },
      { label: "Glow duration", value: "up to 6 hours" },
      { label: "Recommended nozzle", value: "0.4-0.6 mm" },
    ],
    printTips: [
      "Print a bit slower (max 60 mm/s) so pigments stay evenly distributed.",
      "Use a hardened nozzle if you run glow spools often.",
      "Charge finished prints with direct light for the strongest effect at handoff.",
    ],
    seo: {
      title: "Glow-in-the-dark PLA filament printing",
      description:
        "Bring your glow-in-the-dark idea to life with PLA Glow from X3DPrints. Ideal for safety markers and standout gadgets.",
    },
    leadTime: "Typical lead time 3 business days",
    priceIndicator: "Price indicator: Medium",
    faq: materialFaqEn["PLA_GLOW"],
  },
  {
    key: "PLA_MARBLE",
    slug: MATERIAL_SLUGS["PLA_MARBLE"],
    heroTagline: "Marble look without the weight",
    heroDescription:
      "PLA Marble contains fine speckles that mimic a natural stone texture. Every print gets a luxurious look.",
    summary:
      "Use it for awards, interior accents or art objects where real stone would be too heavy or expensive.",
    highlights: [
      {
        title: "Realistic texture",
        description:
          "The mix of light and dark pigments creates a veined look, even on small models.",
      },
      {
        title: "Lightweight",
        description:
          "You keep the low weight of PLA, ideal for hanging decor or large volumes.",
      },
      {
        title: "Post-processing",
        description:
          "Sanding and polishing can enhance or soften the marble effect.",
      },
    ],
    idealFor: [
      "Interior decor",
      "Awards and trophies",
      "Lifestyle product photography",
      "Educational sculpture models",
    ],
    specs: [
      { label: "Finish", value: "Satin matte with speckle" },
      { label: "Recommended temperature", value: "205-215 C" },
      { label: "Bed temperature", value: "50-60 C" },
    ],
    printTips: [
      "Use a slightly higher layer height (0.2-0.24 mm) to show the marble texture.",
      "Avoid very high speeds so the speckles do not stretch.",
      "Use a light dry-brush technique for extra contrast in the veins.",
    ],
    seo: {
      title: "PLA Marble: marble-look 3D prints",
      description:
        "PLA Marble from X3DPrints gives each 3D print a luxury stone effect. Ideal for awards, decor and art objects.",
    },
    leadTime: "Typical lead time 3 business days",
    priceIndicator: "Price indicator: Medium",
    faq: materialFaqEn["PLA_MARBLE"],
  },
  {
    key: "PLA_SPARKLE",
    slug: MATERIAL_SLUGS["PLA_SPARKLE"],
    heroTagline: "Glitter with depth",
    heroDescription:
      "PLA Sparkle blends microscopic glitter into a dark base. Under light it creates a subtle shimmer.",
    summary:
      "Ideal for eye-catching gadgets, cosplay props and premium displays that catch the light without looking kitschy.",
    highlights: [
      {
        title: "Deep colors",
        description:
          "The dark base colors keep the glitter effect subtle until light hits the surface.",
      },
      {
        title: "Smooth surface",
        description:
          "The particles are fine enough to avoid clogs and keep the surface smooth.",
      },
      {
        title: "Premium look",
        description:
          "Perfect for premium merchandising or limited edition collector items.",
      },
    ],
    idealFor: [
      "Cosplay accessories",
      "Retail displays",
      "Interior accents",
      "Personalized gifts",
    ],
    specs: [
      { label: "Recommended nozzle", value: ">= 0.4 mm (hardened steel recommended)" },
      { label: "Print temperature", value: "210-220 C" },
      { label: "Glitter size", value: "< 60 um" },
    ],
    printTips: [
      "Use a hardened nozzle if you print Sparkle often; the particles can wear brass over time.",
      "Keep cooling around 80% for sharp details without stringing.",
      "Apply a gloss clear coat to make the glitter pop.",
    ],
    seo: {
      title: "PLA Sparkle glitter filament printing",
      description:
        "With PLA Sparkle from X3DPrints you get a subtle glitter look. Ideal for cosplay, merchandising and gifts.",
    },
    leadTime: "Typical lead time 4 business days",
    priceIndicator: "Price indicator: Medium",
    faq: materialFaqEn["PLA_SPARKLE"],
  },
  {
    key: "PLA_METAL",
    slug: MATERIAL_SLUGS["PLA_METAL"],
    heroTagline: "Metal look without rust",
    heroDescription:
      "PLA Metal combines a metallic sheen with the easy print process of PLA. Choose steel, copper or bronze tones.",
    summary:
      "Use this filament for prototypes or decorative parts that need an industrial look without extra weight.",
    highlights: [
      {
        title: "High gloss",
        description:
          "The surface reflects light like anodized metal, ideal for tech products.",
      },
      {
        title: "No oxidation",
        description:
          "Unlike metal-filled filaments, PLA Metal does not rust and needs no special maintenance.",
      },
      {
        title: "Crisp details",
        description:
          "Low shrink keeps fine ribs and ridges sharp.",
      },
    ],
    idealFor: [
      "Product enclosures",
      "Trade show models",
      "Decorative panels",
      "Props with a metallic look",
    ],
    specs: [
      { label: "Finish", value: "Silky metallic sheen" },
      { label: "Recommended temperature", value: "205-215 C" },
      { label: "Bed temperature", value: "50-60 C" },
    ],
    printTips: [
      "Orient visible faces in one direction so the metallic sheen flows consistently.",
      "Use a gloss clear coat for a mirror-like finish.",
      "Sand in one direction with fine grit to create a brushed metal look.",
    ],
    seo: {
      title: "PLA Metal: metallic 3D prints on demand",
      description:
        "Choose PLA Metal at X3DPrints for an industrial sheen without the weight of real metal. Perfect for prototypes and decor.",
    },
    leadTime: "Typical lead time 3 business days",
    priceIndicator: "Price indicator: Medium",
    faq: materialFaqEn["PLA_METAL"],
  },
  {
    key: "PLA_GALAXY",
    slug: MATERIAL_SLUGS["PLA_GALAXY"],
    heroTagline: "Depth and stardust",
    heroDescription:
      "PLA Galaxy blends deep colors with shimmering micro glitter for a space-like look.",
    summary:
      "Perfect for decorative prints, art objects and gadgets that need to stand out in daylight and artificial light.",
    highlights: [
      {
        title: "Space-like look",
        description:
          "The glitter particles are unevenly distributed, giving depth like a star field.",
      },
      {
        title: "Low stringing",
        description:
          "The base PLA is optimized for clean bridges and sharp details.",
      },
      {
        title: "Show quality",
        description:
          "Ideal for limited edition prints and premium merchandising.",
      },
    ],
    idealFor: [
      "Cosplay and fan art",
      "Premium gifts",
      "Decorative lamp shades",
      "Jewelry displays",
    ],
    specs: [
      { label: "Glitter type", value: "Micro sparkle" },
      { label: "Print temperature", value: "210-220 C" },
      { label: "Recommended layer height", value: "0.16-0.24 mm" },
    ],
    printTips: [
      "Use a nozzle of 0.4 mm or larger for smooth flow.",
      "Let prints cool slowly to avoid cracks in thinner sections.",
      "Polish with a soft cloth to enhance shine without scratches.",
    ],
    seo: {
      title: "PLA Galaxy glitter filament on demand",
      description:
        "Create shimmering 3D prints with PLA Galaxy from X3DPrints. Perfect for eye-catching merch and decorative projects.",
    },
    leadTime: "Typical lead time 4 business days",
    priceIndicator: "Price indicator: High",
    faq: materialFaqEn["PLA_GALAXY"],
  },
  {
    key: "PLA_AERO",
    slug: MATERIAL_SLUGS["PLA_AERO"],
    heroTagline: "Super light, super strong",
    heroDescription:
      "PLA Aero is a foamed filament that is up to 40% lighter than standard PLA without sacrificing stiffness.",
    summary:
      "Ideal for large volumes, RC parts and concepts where weight is critical.",
    highlights: [
      {
        title: "Lightweight",
        description:
          "Micro-bubbles in the filament make prints up to 40% lighter than classic PLA.",
      },
      {
        title: "Faster printing",
        description:
          "Lower density lets you print thicker layers without sagging.",
      },
      {
        title: "Good damping",
        description:
          "The foamed structure absorbs vibration, ideal for drone and RC projects.",
      },
    ],
    idealFor: [
      "RC aircraft and drones",
      "Architectural volume studies",
      "Large decor pieces",
      "Product concepts where weight is critical",
    ],
    specs: [
      { label: "Density", value: "0.8 g/cm3" },
      { label: "Print temperature", value: "210-225 C" },
      { label: "Recommended nozzle", value: "0.4-0.6 mm" },
    ],
    printTips: [
      "Increase flow to 105-110% to compensate for lower density.",
      "Print in a closed space to avoid drafts; the foamed structure is sensitive.",
      "Use higher-density supports for shapes with large overhangs.",
    ],
    seo: {
      title: "PLA Aero lightweight 3D prints",
      description:
        "Produce ultra-light parts with PLA Aero at X3DPrints. Ideal for RC, drones and large prototypes.",
    },
    leadTime: "Typical lead time 5 business days",
    priceIndicator: "Price indicator: High",
    faq: materialFaqEn["PLA_AERO"],
  },
  {
    key: "PLA_SILK_PLUS",
    slug: MATERIAL_SLUGS["PLA_SILK_PLUS"],
    heroTagline: "Showcase shine",
    heroDescription:
      "PLA Silk+ has an intense gloss that accents every curve. Ideal for showpieces, awards and decor items.",
    summary:
      "The silky finish catches light and makes prints photogenic without extra post-processing.",
    highlights: [
      {
        title: "Mirror-like finish",
        description:
          "The polymers spread light to create a metallic sheen without visible layer lines.",
      },
      {
        title: "Smooth transitions",
        description:
          "Even at lower resolution, curves stay smooth thanks to the self-leveling effect.",
      },
      {
        title: "Many colors",
        description:
          "From classic gold to bold cyan or magenta, each color stays glossy.",
      },
    ],
    idealFor: [
      "Awards and trophies",
      "Merchandise and branding items",
      "Cosplay armor",
      "Interior accents",
    ],
    specs: [
      { label: "Finish", value: "Silky gloss" },
      { label: "Print temperature", value: "205-215 C" },
      { label: "Cooling", value: "60-80%" },
    ],
    printTips: [
      "Reduce the fan slightly to maximize gloss, but keep fine details in check.",
      "Use side lighting for presentations to emphasize the shine.",
      "Light sanding with 2000 grit followed by polishing gives a mirror effect.",
    ],
    seo: {
      title: "PLA Silk+ glossy 3D prints",
      description:
        "Looking for ultra glossy 3D prints? Choose PLA Silk+ at X3DPrints for show models, awards and premium merchandising.",
    },
    leadTime: "Typical lead time 3 business days",
    priceIndicator: "Price indicator: Medium",
    faq: materialFaqEn["PLA_SILK_PLUS"],
  },
  {
    key: "PLA_BASIC_GRADIENT",
    slug: MATERIAL_SLUGS["PLA_BASIC_GRADIENT"],
    heroTagline: "Soft color gradients",
    heroDescription:
      "PLA Basic Gradient includes smooth color transitions that give your print a dynamic look automatically.",
    summary:
      "Each spool is unique, ideal for lifestyle accessories and art objects where color flow takes center stage.",
    highlights: [
      {
        title: "No extra finishing",
        description:
          "The gradient effect sits in the spool. No painting needed for a standout result.",
      },
      {
        title: "Smooth transitions",
        description:
          "Colors shift slowly so you do not see hard lines on large surfaces.",
      },
      {
        title: "Social ready",
        description:
          "Perfect for social content and product photography thanks to the natural color flow.",
      },
    ],
    idealFor: [
      "Lifestyle accessories",
      "Decorative vases",
      "Educational models",
      "Merchandise with standout color",
    ],
    specs: [
      { label: "Gradient length", value: "~8-12 m" },
      { label: "Print temperature", value: "205-215 C" },
      { label: "Recommended layer height", value: "0.16-0.24 mm" },
    ],
    printTips: [
      "Plan the height of your object so color changes land at a good spot.",
      "Print multiple small objects at once to spread the gradient more evenly.",
      "Keep filament dry for consistent tones.",
    ],
    seo: {
      title: "PLA Gradient 3D prints with color fade",
      description:
        "Print unique color gradients with PLA Gradient at X3DPrints. Ideal for decor, gifts and standout prototypes.",
    },
    leadTime: "Typical lead time 3 business days",
    priceIndicator: "Price indicator: Medium",
    faq: materialFaqEn["PLA_BASIC_GRADIENT"],
  },
  {
    key: "PLA_BASIC",
    slug: MATERIAL_SLUGS["PLA_BASIC"],
    heroTagline: "Reliable all-rounder",
    heroDescription:
      "PLA Basic is the workhorse for prototypes, scale models and promotional items. Affordable, fast and available in dozens of colors.",
    summary:
      "Use PLA Basic when you need a clean print quickly without special properties.",
    highlights: [
      {
        title: "Wide color palette",
        description:
          "From neutral shades to bold colors. Ideal for matching brand palettes.",
      },
      {
        title: "Stable print behavior",
        description:
          "We know this filament inside out, which means predictable results.",
      },
      {
        title: "Affordable",
        description:
          "The most budget-friendly material in our lineup for fast iterations.",
      },
    ],
    idealFor: [
      "Proof-of-concept models",
      "Marketing giveaways",
      "Educational aids",
      "Scale models",
    ],
    specs: [
      { label: "Print temperature", value: "200-210 C" },
      { label: "Bed temperature", value: "50-60 C" },
      { label: "Glass transition", value: "~60 C" },
    ],
    printTips: [
      "Use 100% cooling for sharp details and bridges.",
      "For mechanical prototypes, reinforce walls or choose PLA Tough+.",
      "Keep spools dry to avoid brittleness.",
    ],
    seo: {
      title: "PLA Basic: standard 3D printing material",
      description:
        "PLA Basic from X3DPrints is ideal for prototypes, mockups and promotional items. Choose from a wide color range.",
    },
    leadTime: "Typical lead time 2 business days",
    priceIndicator: "Price indicator: Low",
    faq: materialFaqEn["PLA_BASIC"],
  },
  {
    key: "PETG",
    slug: MATERIAL_SLUGS["PETG"],
    heroTagline: "Functional and durable",
    heroDescription:
      "PETG combines the ease of PLA with extra heat and chemical resistance. The go-to choice for functional parts.",
    summary:
      "Use PETG for parts that go outdoors, can flex a bit or come into contact with water and chemicals.",
    highlights: [
      {
        title: "High impact resistance",
        description:
          "PETG is tough and resists cracking, even with repeated use or screws.",
      },
      {
        title: "Weather resistant",
        description:
          "More UV and moisture resistant than PLA and keeps its shape around 80 C.",
      },
      {
        title: "Translucent options",
        description:
          "Choose translucent PETG when light transmission is important.",
      },
    ],
    idealFor: [
      "Electronics housings",
      "Outdoor components",
      "Mechanical prototypes",
      "Fluid reservoirs (non-food grade)",
    ],
    specs: [
      { label: "Print temperature", value: "235-250 C" },
      { label: "Bed temperature", value: "70-85 C" },
      { label: "Glass transition", value: "80-85 C" },
    ],
    printTips: [
      "Lower cooling to 30-50% for better layer adhesion.",
      "Use a glue stick or PEI bed for reliable adhesion without warping.",
      "Dry the filament before printing to reduce stringing.",
    ],
    seo: {
      title: "PETG 3D printing for functional parts",
      description:
        "Order strong, weather-resistant PETG prints from X3DPrints. Ideal for outdoor use and mechanical applications.",
    },
    leadTime: "Typical lead time 3 business days",
    priceIndicator: "Price indicator: Medium",
    faq: materialFaqEn["PETG"],
  },
  {
    key: "PC",
    slug: MATERIAL_SLUGS["PC"],
    heroTagline: "Polycarbonate for extreme conditions",
    heroDescription:
      "We use PC when heat, UV and mechanical load all matter. It delivers crisp parts with a technical look.",
    summary:
      "Polycarbonate stays dimensionally stable above 100 C, resists oil and UV, and is ideal for machine covers, outdoor brackets and display parts that need more than PETG.",
    highlights: [
      {
        title: "Heat and UV resistant",
        description:
          "With a glass transition around 110 C, PC does not warp in sun or near motors and barely discolors.",
      },
      {
        title: "Strong and tough",
        description:
          "The material absorbs impact but stays stiff enough for screw-mounted housings and machine components.",
      },
      {
        title: "Clear or smoky",
        description:
          "From fully transparent to clear black for diffusers and windows that pass light without visual clutter.",
      },
    ],
    idealFor: [
      "Outdoor brackets and technical clamps",
      "Machine covers and guards",
      "LED diffusers and prototypes that show light",
      "Housings near heat sources",
    ],
    specs: [
      { label: "Glass transition", value: "~110 C" },
      { label: "Print temperature", value: "260-280 C" },
      { label: "Bed temperature", value: "100-110 C" },
    ],
    printTips: [
      "Dry each spool at least 8 hours around 80 C for perfect layer adhesion.",
      "Print in an enclosed chamber with limited cooling to avoid cracking.",
      "Use glue stick or textured PEI plus a brim for reliable bed adhesion.",
    ],
    seo: {
      title: "PC polycarbonate 3D prints on demand",
      description:
        "Print heat-resistant polycarbonate (PC) parts at X3DPrints in Herzele. Ideal for machine covers, outdoor brackets and UV-resistant display parts.",
    },
    leadTime: "Typical lead time 4-6 business days",
    priceIndicator: "Price indicator: High",
    faq: materialFaqEn["PC"],
  },
  {
    key: "PC_FR",
    slug: MATERIAL_SLUGS["PC_FR"],
    heroTagline: "Flame-retardant polycarbonate (UL94 V-0)",
    heroDescription:
      "PC FR pairs polycarbonate strength with UL94 V-0 flame retardancy. Ideal for critical enclosures, rail cabinets and parts near heat sources.",
    summary:
      "Choose PC FR for technical parts that face heat, UV and fire risk. It stays dimensionally stable, self-extinguishes and delivers a clean, semi-transparent look in black, gray or white.",
    highlights: [
      {
        title: "UL94 V-0 certified",
        description:
          "Self-extinguishes within seconds and slows flame spread, fit for electronics, automotive and machinery.",
      },
      {
        title: "High heat and impact strength",
        description:
          "Glass transition around 110 C with PC-like mechanical strength; stays stiff under load.",
      },
      {
        title: "Finish options",
        description:
          "Available in white, gray and black for closed housings or semi-transparent windows with a professional look.",
      },
    ],
    idealFor: [
      "Electronics and IoT housings with flame requirements",
      "DIN-rail cabinets and control panels",
      "Machine guards near motors or PSUs",
      "Automotive and industrial brackets where heat and safety matter",
    ],
    specs: [
      { label: "Glass transition", value: "~110 C" },
      { label: "Print temperature", value: "260-280 C" },
      { label: "Bed temperature", value: "90-110 C with glue stick or PEI" },
    ],
    printTips: [
      "Dry each spool 8 hours around 80 C and print in an enclosed chamber to avoid cracking.",
      "Use glue stick or textured PEI plus a brim for reliable adhesion.",
      "Keep cooling low (0-20%) and slow down for strong layer bonding.",
    ],
    seo: {
      title: "PC FR flame-retardant 3D prints (UL94 V-0)",
      description:
        "Order flame-retardant PC FR parts from X3DPrints. UL94 V-0, heat resistant and strong for housings and industrial brackets.",
    },
    filamentFriday: {
      title: "Filament Friday: PC FR (UL94 V-0)",
      description: "Flame-rated polycarbonate with settings, drying routine and comparison vs PC and PETG.",
      href: "/blog/filament-vrijdag-pc-fr",
    },
    leadTime: "Typical lead time 5-7 business days",
    priceIndicator: "Price indicator: High",
    faq: materialFaqEn["PC_FR"],
  },

  {
    key: "PLA_TRANSLUCENT",
    slug: MATERIAL_SLUGS["PLA_TRANSLUCENT"],
    heroTagline: "Light-transmitting magic",
    heroDescription:
      "PLA Translucent filters light softly, giving lamp shades, signage and design objects a unique glow.",
    summary:
      "Ideal for ambient light, branding or applications where color and light meet.",
    highlights: [
      {
        title: "Consistent light transmission",
        description:
          "The semi-transparent base creates an even glow without hot spots.",
      },
      {
        title: "Many colors",
        description:
          "From cool aqua to warm red. Combine multiple shades for gradient lighting.",
      },
      {
        title: "Thin-wall capable",
        description:
          "Even at 0.6 mm wall thickness the material stays strong thanks to good layer adhesion.",
      },
    ],
    idealFor: [
      "Lamp shades and ambient lighting",
      "Backlit signage",
      "Display stands",
      "Architectural light studies",
    ],
    specs: [
      { label: "Light transmission", value: "45-65% depending on color" },
      { label: "Print temperature", value: "205-215 C" },
      { label: "Recommended wall thickness", value: "0.8-1.6 mm" },
    ],
    printTips: [
      "Print with thinner walls (0.8-1.2 mm) for uniform light transmission.",
      "Disable supports where possible to avoid matte spots.",
      "Use vase mode for seamless tube-shaped objects.",
    ],
    seo: {
      title: "Translucent PLA for light-transmitting 3D prints",
      description:
        "Create light-transmitting parts with PLA Translucent at X3DPrints. Perfect for lamp shades, signage and design objects.",
    },
    leadTime: "Typical lead time 3 business days",
    priceIndicator: "Price indicator: Medium",
    faq: materialFaqEn["PLA_TRANSLUCENT"],
  },
  {
    key: "PLA_SILK_MULTI_COLOR",
    slug: MATERIAL_SLUGS["PLA_SILK_MULTI_COLOR"],
    heroTagline: "Color gradients with mirror gloss",
    heroDescription:
      "PLA Silk Multi-Color combines a silky finish with bold rainbow gradients.",
    summary:
      "Ideal for showpieces, festival gadgets or merch where color and shine take center stage.",
    highlights: [
      {
        title: "Spectacular colors",
        description:
          "Each rotation of the spool delivers a new color segment so prints never feel repetitive.",
      },
      {
        title: "Smooth finish",
        description:
          "The silk base creates mirror-like walls without post-processing.",
      },
      {
        title: "Social media ready",
        description:
          "Perfect for eye-catching photos and video thanks to the dynamic color shift.",
      },
    ],
    idealFor: [
      "Festival merch",
      "Awards and trophies",
      "Cosplay props",
      "Limited edition gifts",
    ],
    specs: [
      { label: "Gradient length", value: "~5-8 m" },
      { label: "Print temperature", value: "205-215 C" },
      { label: "Finish", value: "Silky gloss" },
    ],
    printTips: [
      "Print multiple objects at once to make the gradient more gradual.",
      "Avoid extreme cooling so the gloss stays intact.",
      "Use a buffing cloth for extra shine after printing.",
    ],
    seo: {
      title: "Silk rainbow PLA 3D prints",
      description:
        "Get glossy rainbow prints with PLA Silk Multi-Color at X3DPrints. Ideal for festival merch, awards and gifts.",
    },
    leadTime: "Typical lead time 4 business days",
    priceIndicator: "Price indicator: High",
    faq: materialFaqEn["PLA_SILK_MULTI_COLOR"],
  },
  {
    key: "PLA_CF",
    slug: MATERIAL_SLUGS["PLA_CF"],
    heroTagline: "Carbon reinforced",
    heroDescription:
      "PLA-CF is filled with carbon fibers for extra stiffness and a matte, technical look.",
    summary:
      "Ideal for functional parts, jigs and applications where you need higher dimensional stability.",
    highlights: [
      {
        title: "Dimensionally stable",
        description:
          "Carbon fibers reduce shrink and deliver stiff, shape-stable prints.",
      },
      {
        title: "Matte finish",
        description:
          "The fibers create a premium, carbon-like texture with little post-processing.",
      },
      {
        title: "Higher heat resistance",
        description:
          "Higher temperature range than standard PLA thanks to fiber reinforcement.",
      },
    ],
    idealFor: [
      "Mounting plates and brackets",
      "Jigs and tools",
      "FPV and drone parts",
      "Automotive prototypes",
    ],
    specs: [
      { label: "Print temperature", value: "215-230 C" },
      { label: "Bed temperature", value: "60-70 C" },
      { label: "Nozzle requirement", value: "Hardened steel required" },
    ],
    printTips: [
      "Use a hardened nozzle to prevent wear.",
      "Increase flow slightly (102-105%) for dense walls.",
      "Print in a dry environment; fibers absorb moisture.",
    ],
    seo: {
      title: "PLA carbon fiber 3D prints",
      description:
        "Print stiff and light parts with PLA-CF at X3DPrints. Ideal for jigs, drones and technical prototypes.",
    },
    leadTime: "Typical lead time 4 business days",
    priceIndicator: "Price indicator: High",
    faq: materialFaqEn["PLA_CF"],
  },
  {
    key: "PLA_WOOD",
    slug: MATERIAL_SLUGS["PLA_WOOD"],
    heroTagline: "Warm and natural",
    heroDescription:
      "PLA Wood contains real wood particles for a warm, natural look and a subtle wood scent during printing.",
    summary:
      "Perfect for interior decor, mockups and product models where you want an organic feel.",
    highlights: [
      {
        title: "Easy to work",
        description:
          "Sanding, drilling and varnishing work like soft wood. The wood particles help paint and stain adhere.",
      },
      {
        title: "Light wood scent",
        description:
          "During printing you get a soft wood aroma without harsh fumes.",
      },
      {
        title: "Variable tone",
        description:
          "Wood particles give each print subtle color variation, which boosts realism.",
      },
    ],
    idealFor: [
      "Interior accessories",
      "Architectural models",
      "Product mockups",
      "Gift items",
    ],
    specs: [
      { label: "Print temperature", value: "200-215 C" },
      { label: "Nozzle", value: ">= 0.4 mm (hardened recommended)" },
      { label: "Post-processing", value: "Sanding and staining possible" },
    ],
    printTips: [
      "Use a larger nozzle (0.6 mm) for visible wood texture.",
      "Print slower (40-50 mm/s) to avoid clogs.",
      "Increase temperature slightly for darker tones.",
    ],
    seo: {
      title: "PLA Wood: wood-look 3D prints",
      description:
        "Give your 3D prints a warm wood look with PLA Wood from X3DPrints. Ideal for interior projects and models.",
    },
    leadTime: "Typical lead time 3 business days",
    priceIndicator: "Price indicator: Medium",
    faq: materialFaqEn["PLA_WOOD"],
  },
  {
    key: "TPU",
    slug: MATERIAL_SLUGS["TPU"],
    heroTagline: "Flexible protection",
    heroDescription:
      "TPU is a rubber-like filament that bends and springs back. Perfect for grips, bumpers and damping.",
    summary:
      "Use TPU when you want impact absorption or slip resistance in your design.",
    highlights: [
      {
        title: "Elastic",
        description:
          "TPU can stretch up to 600% and returns to shape without permanent deformation.",
      },
      {
        title: "Wear resistant",
        description:
          "The material withstands repeated use, ideal for machine feet or protective cases.",
      },
      {
        title: "Grip and damping",
        description:
          "The rubbery feel adds grip and shock absorption.",
      },
    ],
    idealFor: [
      "Phone and tool covers",
      "Vibration dampers",
      "Gaskets and seals",
      "Wearables and sports accessories",
    ],
    specs: [
      { label: "Hardness", value: "Shore 95A" },
      { label: "Print temperature", value: "225-235 C" },
      { label: "Bed temperature", value: "40-60 C" },
    ],
    printTips: [
      "Print slowly (20-35 mm/s) and use minimal retraction to avoid jams.",
      "Disable coasting and pressure advance for consistent flow.",
      "Use glue stick or a textured sheet for extra adhesion.",
    ],
    seo: {
      title: "TPU flexible 3D prints on demand",
      description:
        "Order flexible TPU 3D prints from X3DPrints. Ideal for grips, bumpers and vibration dampers with a clean finish.",
    },
    leadTime: "Typical lead time 5 business days",
    priceIndicator: "Price indicator: High",
    faq: materialFaqEn["TPU"],
  },
]

export const MATERIAL_DETAILS_EN = detailsEn.reduce(
  (acc, item) => {
    acc[item.key] = item
    return acc
  },
  {} as Record<MaterialKey, MaterialDetailContent>,
)

export const MATERIAL_DETAILS_BY_SLUG_EN = detailsEn.reduce(
  (acc, item) => {
    acc[item.slug] = item
    return acc
  },
  {} as Record<string, MaterialDetailContent>,
)
