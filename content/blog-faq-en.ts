type BlogFaqBlock = {
  title: string
  items: { q: string; a: string }[]
}

export const BLOG_FAQ_EN: Record<string, BlogFaqBlock> = {
  "3d-printen-voor-beginners": {
    title: "FAQ for beginners",
    items: [
      {
        q: "What do I need to get started?",
        a: "An STL or STEP file, the goal of the part, and a target deadline. That is enough to advise quickly.",
      },
      {
        q: "Which material is safest for a first print?",
        a: "PLA Matte is a safe starting point for looks and prototypes. PETG is better if the part is stressed.",
      },
      {
        q: "How do I get a fast price estimate?",
        a: "Use the pricing calculator or send your file for a concrete quote.",
      },
    ],
  },
  "beste-instellingen-bambu-printer": {
    title: "FAQ about Bambu printer settings",
    items: [
      {
        q: "Should I always use presets?",
        a: "Start with presets, then adjust per filament or detail level. That gives the most stable base.",
      },
      {
        q: "When should I recalibrate?",
        a: "After a new spool, a nozzle change, or a longer pause, a quick calibration is smart.",
      },
      {
        q: "What are the main causes of failed prints?",
        a: "Moist filament, poor bed adhesion, and too high speed are the most common causes.",
      },
    ],
  },
  "hoe-lang-duurt-3d-printen": {
    title: "FAQ about print time",
    items: [
      {
        q: "What drives print time the most?",
        a: "Volume, layer height, infill, supports, and speed have the biggest impact.",
      },
      {
        q: "Can it be faster without losing quality?",
        a: "Often yes. Coarser layers, less infill, or splitting the model can help.",
      },
      {
        q: "How do I get a reliable timeline?",
        a: "Send the file and we will provide a concrete timeline based on print time and finishing.",
      },
    ],
  },
  "hoe-3d-print-je-onderdelen-voor-buitengebruik": {
    title: "FAQ about outdoor parts",
    items: [
      {
        q: "What is the best material for outdoor use?",
        a: "Usually PETG or PC. PLA is best for indoor or sheltered use.",
      },
      {
        q: "Do outdoor parts need post-processing?",
        a: "A coating can help with UV and moisture. We advise per part and usage duration.",
      },
      {
        q: "Which design choices help outdoors?",
        a: "Thicker walls, rounded corners, and drainage holes where needed improve durability.",
      },
    ],
  },
  "tool-organizers-3d-printing": {
    title: "FAQ about tool organizers",
    items: [
      {
        q: "How do I size an insert?",
        a: "Measure your tools and add a small margin. Share the case or drawer size for a perfect fit.",
      },
      {
        q: "Which material works best in a workshop?",
        a: "PLA is fine in dry rooms. PETG is better for a garage or warmer environments.",
      },
      {
        q: "Which file formats do you accept?",
        a: "STL or STEP. STEP is best if we need to adjust the design.",
      },
    ],
  },
  "use-cases-tpu": {
    title: "FAQ about TPU use cases",
    items: [
      {
        q: "When should I choose TPU?",
        a: "For flex, grip, shock absorption, or parts that need to bend.",
      },
      {
        q: "Is TPU more expensive than PLA or PETG?",
        a: "TPU prints slower and needs more machine time, which usually increases price.",
      },
      {
        q: "Can TPU be combined with other materials?",
        a: "Yes, we often combine TPU with PLA or PETG in a set or assembly.",
      },
    ],
  },
  "3d-printen-mini-figuren": {
    title: "FAQ about mini figures",
    items: [
      {
        q: "How do you get fine details?",
        a: "We use a fine layer height and optimize orientation for sharp detail.",
      },
      {
        q: "Which materials are suitable?",
        a: "PLA Matte for detail, PLA Silk for shine accents. We advise per model.",
      },
      {
        q: "Are supports always needed?",
        a: "Often yes for arms or accessories. We minimize supports to reduce cleanup.",
      },
    ],
  },
  "finishing-friday-schuren-primen-lakken": {
    title: "FAQ about sanding, priming and painting",
    items: [
      {
        q: "Do I always need sanding?",
        a: "Not always. For functional parts a raw finish can be enough.",
      },
      {
        q: "What is the correct order?",
        a: "Sand first, then prime, then paint in thin layers for the best result.",
      },
      {
        q: "Do you offer finishing?",
        a: "We focus on printing, but we advise or refer if finishing is critical.",
      },
    ],
  },
  "filament-vrijdag-pla": {
    title: "FAQ about PLA filament",
    items: [
      {
        q: "When should I choose PLA?",
        a: "For prototypes, displays, and fast iterations with a clean finish.",
      },
      {
        q: "Is PLA suitable for outdoor use?",
        a: "Usually not. For sun and moisture you want PETG or PC.",
      },
      {
        q: "How do you avoid PLA misprints?",
        a: "Keep filament dry, ensure good bed adhesion, and test a small piece first.",
      },
    ],
  },
  "filament-vrijdag-petg": {
    title: "FAQ about PETG filament",
    items: [
      {
        q: "When should I choose PETG?",
        a: "For functional parts, outdoor use, and extra toughness.",
      },
      {
        q: "Is PETG harder to print than PLA?",
        a: "It needs more attention for bed adhesion and stringing, but is manageable.",
      },
      {
        q: "How should I store PETG?",
        a: "Store it dry and dry it before printing if needed.",
      },
    ],
  },
  "filament-vrijdag-tpu": {
    title: "FAQ about TPU filament",
    items: [
      {
        q: "When should I choose TPU?",
        a: "For flex, grip, damping, or parts that need to bend.",
      },
      {
        q: "Is TPU good for outdoor use?",
        a: "Often yes, but we check UV and load per application.",
      },
      {
        q: "Why does TPU print slower?",
        a: "Flexible filament needs lower speed for stable layers and fewer errors.",
      },
    ],
  },
  "filament-vrijdag-pc": {
    title: "FAQ about PC filament",
    items: [
      {
        q: "When should I choose PC?",
        a: "For high heat resistance, toughness, and parts under mechanical load.",
      },
      {
        q: "Is PC suitable for outdoor use?",
        a: "Yes, but we check if PETG would already be sufficient.",
      },
      {
        q: "What is important for PC prints?",
        a: "Dry filament, stable temperature, and an enclosed printer work best.",
      },
    ],
  },
  "filament-vrijdag-pc-fr": {
    title: "FAQ about PC FR filament",
    items: [
      {
        q: "When should I choose PC FR?",
        a: "When flame retardant properties are required and safety is critical.",
      },
      {
        q: "Is PC FR always necessary?",
        a: "No, often PC or PETG is enough. We advise based on risk and use.",
      },
      {
        q: "What matters most for PC FR prints?",
        a: "Dry filament, stable temperature, and clear compliance needs.",
      },
    ],
  },
  "filament-vrijdag-pla-marble": {
    title: "FAQ about PLA Marble filament",
    items: [
      {
        q: "When should I choose PLA Marble?",
        a: "For decor, interiors, and props where the stone look matters.",
      },
      {
        q: "Is PLA Marble suitable for outdoor use?",
        a: "No, it is mainly for indoor visual parts.",
      },
      {
        q: "What should I watch out for?",
        a: "It needs stable flow. We test on small details first.",
      },
    ],
  },
  "filament-vrijdag-pla-glow": {
    title: "FAQ about PLA Glow filament",
    items: [
      {
        q: "When should I choose PLA Glow?",
        a: "For signage, glow accents, or playful props that need to stand out.",
      },
      {
        q: "Is PLA Glow strong enough?",
        a: "It is still PLA, so mainly for indoor and light use.",
      },
      {
        q: "Any special considerations?",
        a: "Glow filament can wear a nozzle faster. We choose the right setup per batch.",
      },
    ],
  },
  "filament-vrijdag-pla-metal": {
    title: "FAQ about PLA Metal filament",
    items: [
      {
        q: "When should I choose PLA Metal?",
        a: "For a metallic look without real metal processing.",
      },
      {
        q: "Is PLA Metal stronger or heavier?",
        a: "It looks premium but is still PLA, so best for visual parts.",
      },
      {
        q: "Can it be finished?",
        a: "Light sanding and priming can help. We advise per model.",
      },
    ],
  },
  "filament-vrijdag-pla-silk-plus": {
    title: "FAQ about PLA Silk+ filament",
    items: [
      {
        q: "When should I choose PLA Silk+?",
        a: "For shiny awards, decor, and showpieces with a premium look.",
      },
      {
        q: "Is PLA Silk+ good for functional parts?",
        a: "Usually not. For strength choose PETG or PLA Tough+.",
      },
      {
        q: "How do you get the best shine?",
        a: "Orientation and visible faces matter most. We tune settings per model.",
      },
    ],
  },
  "filament-vrijdag-pla-wood": {
    title: "FAQ about PLA Wood filament",
    items: [
      {
        q: "When should I choose PLA Wood?",
        a: "For a wood look in interior decor or light props.",
      },
      {
        q: "Is PLA Wood suitable for outdoor use?",
        a: "No, it is mainly for indoor visual parts.",
      },
      {
        q: "What should I watch out for?",
        a: "It is more prone to clogging. We choose nozzle and flow per batch.",
      },
    ],
  },
  "maker-monday-fdm-scharnieren": {
    title: "FAQ about FDM hinges",
    items: [
      {
        q: "What is the biggest hinge mistake?",
        a: "Poor layer orientation leads to breakage. Layers must support the load.",
      },
      {
        q: "What clearance is a good starting point?",
        a: "We start with small clearance and test per material and printer.",
      },
      {
        q: "Which material works best?",
        a: "PETG is tough, PLA for light duty, TPU for flex hinges.",
      },
    ],
  },
  "maker-monday-wanddiktes-ribs": {
    title: "FAQ about wall thickness and ribs",
    items: [
      {
        q: "When should I add ribs?",
        a: "On large surfaces or long arms to prevent bending.",
      },
      {
        q: "How do I choose wall thickness?",
        a: "Base it on load and nozzle width. We advise per model.",
      },
      {
        q: "Thicker walls or ribs?",
        a: "Ribs add stiffness with less material and keep parts lighter.",
      },
    ],
  },
  "maker-monday-toleranties-3d-printen": {
    title: "FAQ about tolerances",
    items: [
      {
        q: "How much clearance do I need?",
        a: "It depends on printer and material. We test critical fits with coupons.",
      },
      {
        q: "Press fit vs clearance fit?",
        a: "Press fit clamps, clearance allows motion. We set this per function.",
      },
      {
        q: "How do I avoid post-processing?",
        a: "Add margin and plan test pieces to avoid rework later.",
      },
    ],
  },
  "maker-monday-schroefdraad-bevestigingen": {
    title: "FAQ about threaded fasteners",
    items: [
      {
        q: "Printed thread or inserts?",
        a: "Printed thread is fine for low load, inserts for repeated use.",
      },
      {
        q: "Best print orientation?",
        a: "Print so layers do not split under load. That improves lifetime.",
      },
      {
        q: "How do you reduce wear?",
        a: "Use larger threads, enough wall thickness, and avoid overload.",
      },
    ],
  },
  "maker-monday-schroefdraad-inserts": {
    title: "FAQ about threaded inserts",
    items: [
      {
        q: "When should I use inserts?",
        a: "For repeated screwing or higher load. It prevents plastic wear.",
      },
      {
        q: "Which materials work best?",
        a: "PETG is tough and forgiving. PLA can work for light use.",
      },
      {
        q: "Do inserts need heat?",
        a: "Often yes. We place them or provide clear instructions.",
      },
    ],
  },
  "maker-monday-snapfits": {
    title: "FAQ about snap fits",
    items: [
      {
        q: "Which materials work best?",
        a: "PETG or TPU for flex. PLA only for light duty.",
      },
      {
        q: "How do I avoid breakage?",
        a: "Round corners, extend the flex zone, and avoid sharp stress points.",
      },
      {
        q: "How much clearance is needed?",
        a: "We test per printer. Too tight causes stress, too loose will not click.",
      },
    ],
  },
  "maker-monday-snapfit-parts": {
    title: "FAQ about snap fit parts",
    items: [
      {
        q: "How do I make a snap fit click well?",
        a: "Provide a clear flex zone and enough room for movement.",
      },
      {
        q: "Which materials are suitable?",
        a: "PETG or TPU for repeated clicks. PLA only for light duty.",
      },
      {
        q: "Should I make test pieces?",
        a: "Yes, a small test saves time and avoids breakage in the final version.",
      },
    ],
  },
  "maker-monday-warping-layer-cracks": {
    title: "FAQ about warping and layer cracks",
    items: [
      {
        q: "How do I prevent warping?",
        a: "Use good bed adhesion, brims, and a stable print environment.",
      },
      {
        q: "Why do layers crack?",
        a: "Too much cooling or low temperature can cause delamination.",
      },
      {
        q: "Does an enclosure help?",
        a: "For ABS and PC yes. For PLA less so, but it can still help.",
      },
    ],
  },
  "use-case-dinsdag-auto-fiets": {
    title: "FAQ about automotive and bike parts",
    items: [
      {
        q: "Which materials are common for this use?",
        a: "Often PETG or PC for heat and mechanical load. We choose per part.",
      },
      {
        q: "What do you need to start?",
        a: "STL or STEP, the application, mounting location, and quantities.",
      },
      {
        q: "What lead time is realistic?",
        a: "It depends on batch size and detail. We confirm after intake.",
      },
    ],
  },
  "use-case-dinsdag-events": {
    title: "FAQ about event prints",
    items: [
      {
        q: "Which materials work best?",
        a: "PLA for looks, PETG for more durability. We advise per item.",
      },
      {
        q: "What lead time should I expect?",
        a: "It depends on quantities and finishing. We provide a timeline after intake.",
      },
      {
        q: "What do you need to start?",
        a: "STL or STEP, quantities, color choice, and deadline.",
      },
    ],
  },
  "use-case-dinsdag-interieur": {
    title: "FAQ about interior prints",
    items: [
      {
        q: "Which materials do you use here?",
        a: "PLA Matte for looks, PETG if the item is handled more.",
      },
      {
        q: "Can you match color and finish?",
        a: "We advise based on filament samples and available stock.",
      },
      {
        q: "What do you need to start?",
        a: "STL or STEP, target size, and where the object will be used.",
      },
    ],
  },
  "use-case-dinsdag-productontwikkeling": {
    title: "FAQ about product development",
    items: [
      {
        q: "Which materials work for prototypes?",
        a: "PLA for fast iterations, PETG or TPU for functional tests.",
      },
      {
        q: "How fast can you iterate?",
        a: "We plan fast and adjust per feedback. Timing depends on batch and detail.",
      },
      {
        q: "What do you need to start?",
        a: "STL or STEP, usage context, and test goals.",
      },
    ],
  },
  "use-case-dinsdag-retail-displays": {
    title: "FAQ about retail displays",
    items: [
      {
        q: "Which materials work best for displays?",
        a: "PLA Matte for looks and shape. PETG if the display is handled a lot.",
      },
      {
        q: "Can you integrate branding details?",
        a: "Yes, we integrate logo, typography, and shape language in the model.",
      },
      {
        q: "What do you need to start?",
        a: "STL or STEP, dimensions, colors, and deadline.",
      },
    ],
  },
  "use-case-dinsdag-scholen": {
    title: "FAQ about schools",
    items: [
      {
        q: "Which materials are safe and affordable?",
        a: "PLA is the most accessible. PETG if extra durability is needed.",
      },
      {
        q: "Can you deliver batches?",
        a: "Yes, we plan runs with consistent quality and clear timing.",
      },
      {
        q: "What do you need to start?",
        a: "STL or STEP, quantities, color preference, and deadline.",
      },
    ],
  },
  "use-case-dinsdag-stem": {
    title: "FAQ about STEM projects",
    items: [
      {
        q: "Which materials do you recommend?",
        a: "PLA for education projects, PETG if parts are used intensively.",
      },
      {
        q: "Can you support lesson kits?",
        a: "We deliver prints and advise on file formats and durability.",
      },
      {
        q: "What do you need to start?",
        a: "STL or STEP, quantities, project goal, and timing.",
      },
    ],
  },
  "use-case-dinsdag-tabletop": {
    title: "FAQ about tabletop prints",
    items: [
      {
        q: "Which materials work for miniatures?",
        a: "PLA Matte for detail and a clean finish. We advise per model.",
      },
      {
        q: "Can you print terrain or tokens?",
        a: "Yes, we print small pieces and larger terrain sets.",
      },
      {
        q: "What do you need to start?",
        a: "STL or STEP, target scale, and quantities.",
      },
    ],
  },
  "juiste-3d-print-materiaal": {
    title: "FAQ about choosing materials",
    items: [
      {
        q: "How do you pick the right material?",
        a: "We look at strength, finish, environment, and budget to choose the best fit.",
      },
      {
        q: "What if I am not sure?",
        a: "Use the Material Suggestion Tool or share your use case and we advise.",
      },
      {
        q: "Can you compare options side by side?",
        a: "Yes, we can compare PLA, PETG, TPU and specialty options with pros and cons.",
      },
    ],
  },
  "hoeveel-kost-3d-printen": {
    title: "FAQ about 3D printing costs",
    items: [
      {
        q: "What drives the price?",
        a: "Print time, material volume, supports, and finishing are the main drivers.",
      },
      {
        q: "How can I reduce cost?",
        a: "Simplify geometry, reduce supports, and pick efficient materials.",
      },
      {
        q: "How do I get a quote?",
        a: "Use the pricing calculator or send the file for a detailed quote.",
      },
    ],
  },
  "3d-printing-marketing-events": {
    title: "FAQ about marketing and event prints",
    items: [
      {
        q: "Which materials work best for giveaways?",
        a: "PLA for visual impact, PETG for more durability. We pick based on use.",
      },
      {
        q: "What files do you need?",
        a: "STL or STEP plus brand assets if we need to add logos.",
      },
      {
        q: "How far in advance should I plan?",
        a: "Ideally 2 to 3 weeks for larger batches. Smaller runs can be faster.",
      },
    ],
  },
  "3d-geprinte-platen-nasiam": {
    title: "FAQ about the Nasiam plates case",
    items: [
      {
        q: "Which material was used for the plates?",
        a: "PLA Matte was used for the clean, ceramic-like finish.",
      },
      {
        q: "What lead time was realistic?",
        a: "We planned a fast turnaround with a short design check and production window.",
      },
      {
        q: "Can you produce similar branded batches?",
        a: "Yes, we can deliver small or medium runs with consistent finish and packaging.",
      },
    ],
  },
}