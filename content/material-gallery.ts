import type { MaterialKey } from "@/lib/materials"
import type { Locale } from "@/lib/i18n/locales"

export type MaterialGalleryItem = {
  src: string
  alt: string
  caption?: string
}

const MATERIAL_GALLERY_NL: Partial<Record<MaterialKey, MaterialGalleryItem[]>> = {
  PLA_TOUGH_PLUS: [
    {
      src: "pla_toughPlus_clothes_(1).webp",
      alt: "Blauwe kledingclip geprint in PLA Tough+ die spanning opvangt",
      caption: "PLA Tough+ houdt clips en brackets stevig onder belasting.",
    },
    {
      src: "pla_toughplus_new_bracket_(1).webp",
      alt: "Rode verstevigingsbeugel geprint in PLA Tough+",
      caption: "Functionele beugels blijven maatvast dankzij PLA Tough+.",
    },
  ],
  PLA_MATTE: [
    {
      src: "pla_matteClock_PC.webp",
      alt: "Minimalistische wandklok geprint in mat PLA",
      caption: "Mat PLA geeft prototypes een gegoten, designwaardige uitstraling.",
    },
    {
      src: "pla_matte_Car_PC.webp",
      alt: "Dashboardpaneel in diepblauw PLA Matte",
      caption: "Complexe vormen ogen strak door de lage glans van PLA Matte.",
    },
  ],
  PLA_GALAXY: [
    {
      src: "pla_galaxy_prints_7.webp",
      alt: "Diepblauwe projectbehuizing met kosmische glans in PLA Galaxy",
      caption: "PLA Galaxy creert een deep-space effect met microglitter en nevelachtige accenten.",
    },
    {
      src: "pla_galaxy_prints_8.webp",
      alt: "Decoratieve vaas met sterrenhemel-finish in PLA Galaxy",
      caption: "Ideaal voor statement decor waarbij donkere tinten subtiel fonkelen.",
    },
  ],
  TPU: [
    {
      src: "tpu1.webp",
      alt: "Flexibele gripbeugel met golvende structuur in TPU",
      caption: "TPU vangt schokken op en biedt slipvaste grip voor beschermende onderdelen.",
    },
    {
      src: "tpu2.webp",
      alt: "TPU bumpercover met elastische contouren",
      caption: "Perfect voor impactbescherming en dempende toepassingen.",
    },
  ],
  PLA_GLOW: [
    {
      src: "pla_glow_model_3.webp",
      alt: "Glow-in-the-dark decorobject geprint in PLA Glow",
      caption: "PLA Glow laadt snel op voor zichtbare veiligheid en fun.",
    },
    {
      src: "pla_glow_model_6.webp",
      alt: "Oplichtende PLA Glow accessoires in het donker",
      caption: "De fosforescerende pigmenten blijven minutenlang nageven.",
    },
  ],
  PLA_MARBLE: [
    {
      src: "marble_cookie.webp",
      alt: "Organische schaal geprint in PLA Marble",
      caption: "Marmerpigmenten creeren luxe woonaccessoires met textuur.",
    },
    {
      src: "marble_david.webp",
      alt: "Buste met realistische marmerlook in PLA Marble",
      caption: "Perfect voor kunstreproducties en premium decor.",
    },
  ],
  PLA_SPARKLE: [
    {
      src: "Bambu_PLA_Sparkle_filament_3.webp",
      alt: "Close-up van glitterende PLA Sparkle spoel",
      caption: "PLA Sparkle vangt het licht met fijne glitters.",
    },
    {
      src: "Bambu_PLA_Sparkle_filament_7.webp",
      alt: "Fonkelende geprinte onderdelen in PLA Sparkle",
      caption: "Ideaal voor showpieces en opvallende merchandising.",
    },
  ],
  PLA_METAL: [
    {
      src: "Metal_model_2.webp",
      alt: "Metaalachtig prototype geprint in PLA Metal",
      caption: "PLA Metal combineert industriele look met lage massa.",
    },
    {
      src: "Metal_model_3.webp",
      alt: "Detail van technische plaat in PLA Metal",
      caption: "De metallic glans versterkt scherpe lijnen en logo's.",
    },
  ],
  PLA_AERO: [
    {
      src: "Aero_birdhouse_pc_3.webp",
      alt: "Lichtgewicht vogelhuis geprint in PLA Aero",
      caption: "PLA Aero houdt grote objecten licht en toch stijf.",
    },
    {
      src: "aero_sunglass_clip.webp",
      alt: "Dunne zonnebrilclip uit PLA Aero op tafel",
      caption: "Foamed PLA is ideaal voor clips en draagbare accessoires.",
    },
  ],
  PLA_SILK_PLUS: [
    {
      src: "PLA_SilkPlus_model_1.webp",
      alt: "Zijdeglanzende sculptuur geprint in PLA Silk+",
      caption: "PLA Silk+ levert spiegelende highlight voor premium showpieces.",
    },
    {
      src: "PLA_SilkPlus_model_3.webp",
      alt: "PLA Silk+ vaas met glanzende contouren",
      caption: "Gekleurde Silk+ prints vallen meteen op in display's.",
    },
  ],
  PLA_BASIC_GRADIENT: [
    {
      src: "PLA_Gradient_prints_2.webp",
      alt: "Set vazen met zachte kleurverlopen in PLA Basic Gradient",
      caption: "Voorverlopen spoelen creeren unieke kleurovergangen.",
    },
    {
      src: "PLA_Gradient_prints_8.webp",
      alt: "Close-up van PLA Gradient prints met meerdere tinten",
      caption: "Elke print heeft een eigen verloop door de spoelopbouw.",
    },
  ],
  PLA_BASIC: [
    {
      src: "pla_basic_Mecha-tuya.webp",
      alt: "Mechanische behuizing geprint in PLA Basic",
      caption: "PLA Basic is de allrounder voor prototypes en maquettes.",
    },
    {
      src: "pla_basic_domino-tuya.webp",
      alt: "Domino's in verschillende kleuren PLA Basic",
      caption: "Veel kleurkeuze maakt PLA Basic ideaal voor educatieve sets.",
    },
  ],
  PETG: [
    {
      src: "petg_1.webp",
      alt: "PETG montagebeugel met stevige infill",
      caption: "PETG combineert impactbestendigheid met hittebestendigheid.",
    },
    {
      src: "petg_2.webp",
      alt: "Technisch onderdeel geprint in PETG",
      caption: "Perfect voor functionele toepassingen die tegen een stootje kunnen.",
    },
  ],
  PC: [
    {
      src: "PC_img1.webp",
      alt: "Polycarbonaat behuizing met semi-transparante wand",
      caption: "PC blijft glashelder en maatvast voor technische covers.",
    },
    {
      src: "PC_img2.webp",
      alt: "Donker getinte PC bracket met metalen inserts",
      caption: "Helder Zwart PC combineert rookglaslook met hoge weerstand.",
    },
  ],
  PLA_TRANSLUCENT: [
    {
      src: "Translucent_K2_Butterfly.webp",
      alt: "Lichtdoorlatende vlinderlamp geprint in PLA Translucent",
      caption: "Translucent PLA laat licht diffuus door voor sfeermakers.",
    },
    {
      src: "Translucent_K2_glass.webp",
      alt: "Decorobject dat licht vangt in PLA Translucent",
      caption: "Perfect voor lampenkappen en signage met gloed.",
    },
  ],
  PLA_SILK_MULTI_COLOR: [
    {
      src: "pla_silk_gradient_model_1.webp",
      alt: "Multicolor PLA Silk print met regenboogverloop",
      caption: "PLA Silk Multi-Color levert vloeiende regenboogverlopen.",
    },
    {
      src: "pla_silk_gradient_model_2.webp",
      alt: "Detail van PLA Silk Multi-Color vaas met glans",
      caption: "De zijdeglans accentueert elke tint in het verloop.",
    },
  ],
  PLA_CF: [
    {
      src: "PLA_CF_Shelf_2.webp",
      alt: "Robuuste plankdrager geprint in PLA-CF",
      caption: "Carbon gevuld PLA houdt functionele onderdelen stijf.",
    },
    {
      src: "PLA_CF_Vise.webp",
      alt: "Bankschroefklem geprint in PLA-CF",
      caption: "Ideaal voor tooling en klemmen die niet mogen doorbuigen.",
    },
  ],
  PLA_WOOD: [
    {
      src: "PLA_Wood_Feature_1_-4.webp",
      alt: "Vaas met warme houtnerf geprint in PLA Wood",
      caption: "PLA Wood geeft prints een authentieke houtstructuur.",
    },
    {
      src: "PLA_Wood_Feature_1_-5.webp",
      alt: "Close-up van PLA Wood print met natuurlijke tint",
      caption: "Perfect voor interieuraccenten en maquettes.",
    },
  ],
}

const MATERIAL_GALLERY_EN: Partial<Record<MaterialKey, MaterialGalleryItem[]>> = {
  PLA_TOUGH_PLUS: [
    {
      src: "pla_toughPlus_clothes_(1).webp",
      alt: "Blue clothing clip printed in PLA Tough+ that absorbs stress",
      caption: "PLA Tough+ keeps clips and brackets firm under load.",
    },
    {
      src: "pla_toughplus_new_bracket_(1).webp",
      alt: "Red reinforcement bracket printed in PLA Tough+",
      caption: "Functional brackets stay dimensionally stable thanks to PLA Tough+.",
    },
  ],
  PLA_MATTE: [
    {
      src: "pla_matteClock_PC.webp",
      alt: "Minimal wall clock printed in matte PLA",
      caption: "Matte PLA gives prototypes a cast, design-grade look.",
    },
    {
      src: "pla_matte_Car_PC.webp",
      alt: "Dashboard panel in deep blue PLA Matte",
      caption: "Complex forms look crisp thanks to the low gloss of PLA Matte.",
    },
  ],
  PLA_GALAXY: [
    {
      src: "pla_galaxy_prints_7.webp",
      alt: "Deep blue project enclosure with cosmic sheen in PLA Galaxy",
      caption: "PLA Galaxy creates a deep-space effect with micro glitter and hazy accents.",
    },
    {
      src: "pla_galaxy_prints_8.webp",
      alt: "Decorative vase with starfield finish in PLA Galaxy",
      caption: "Ideal for statement decor where dark tones subtly sparkle.",
    },
  ],
  TPU: [
    {
      src: "tpu1.webp",
      alt: "Flexible grip bracket with wavy texture in TPU",
      caption: "TPU absorbs shocks and adds slip-resistant grip for protective parts.",
    },
    {
      src: "tpu2.webp",
      alt: "TPU bumper cover with elastic contours",
      caption: "Perfect for impact protection and damping applications.",
    },
  ],
  PLA_GLOW: [
    {
      src: "pla_glow_model_3.webp",
      alt: "Glow-in-the-dark decor object printed in PLA Glow",
      caption: "PLA Glow charges quickly for visible safety and fun.",
    },
    {
      src: "pla_glow_model_6.webp",
      alt: "Glowing PLA Glow accessories in the dark",
      caption: "The phosphorescent pigments keep glowing for minutes.",
    },
  ],
  PLA_MARBLE: [
    {
      src: "marble_cookie.webp",
      alt: "Organic bowl printed in PLA Marble",
      caption: "Marble pigments create luxe home accessories with texture.",
    },
    {
      src: "marble_david.webp",
      alt: "Bust with realistic marble look in PLA Marble",
      caption: "Perfect for art reproductions and premium decor.",
    },
  ],
  PLA_SPARKLE: [
    {
      src: "Bambu_PLA_Sparkle_filament_3.webp",
      alt: "Close-up of a sparkling PLA Sparkle spool",
      caption: "PLA Sparkle catches light with fine glitter.",
    },
    {
      src: "Bambu_PLA_Sparkle_filament_7.webp",
      alt: "Shimmering printed parts in PLA Sparkle",
      caption: "Ideal for showpieces and eye-catching merch.",
    },
  ],
  PLA_METAL: [
    {
      src: "Metal_model_2.webp",
      alt: "Metal-like prototype printed in PLA Metal",
      caption: "PLA Metal combines an industrial look with low mass.",
    },
    {
      src: "Metal_model_3.webp",
      alt: "Detail of a technical plate in PLA Metal",
      caption: "The metallic sheen highlights sharp lines and logos.",
    },
  ],
  PLA_AERO: [
    {
      src: "Aero_birdhouse_pc_3.webp",
      alt: "Lightweight birdhouse printed in PLA Aero",
      caption: "PLA Aero keeps large objects light yet stiff.",
    },
    {
      src: "aero_sunglass_clip.webp",
      alt: "Thin sunglasses clip from PLA Aero on a table",
      caption: "Foamed PLA is ideal for clips and wearable accessories.",
    },
  ],
  PLA_SILK_PLUS: [
    {
      src: "PLA_SilkPlus_model_1.webp",
      alt: "Silky glossy sculpture printed in PLA Silk+",
      caption: "PLA Silk+ delivers mirror-like highlights for premium showpieces.",
    },
    {
      src: "PLA_SilkPlus_model_3.webp",
      alt: "PLA Silk+ vase with glossy contours",
      caption: "Colored Silk+ prints stand out immediately in displays.",
    },
  ],
  PLA_BASIC_GRADIENT: [
    {
      src: "PLA_Gradient_prints_2.webp",
      alt: "Set of vases with soft gradients in PLA Basic Gradient",
      caption: "Pre-blended spools create unique color transitions.",
    },
    {
      src: "PLA_Gradient_prints_8.webp",
      alt: "Close-up of PLA Gradient prints with multiple tones",
      caption: "Each print has its own gradient due to the spool layout.",
    },
  ],
  PLA_BASIC: [
    {
      src: "pla_basic_Mecha-tuya.webp",
      alt: "Mechanical housing printed in PLA Basic",
      caption: "PLA Basic is the all-rounder for prototypes and mockups.",
    },
    {
      src: "pla_basic_domino-tuya.webp",
      alt: "Dominoes in different PLA Basic colors",
      caption: "Wide color choice makes PLA Basic ideal for educational sets.",
    },
  ],
  PETG: [
    {
      src: "petg_1.webp",
      alt: "PETG mounting bracket with solid infill",
      caption: "PETG combines impact resistance with heat resistance.",
    },
    {
      src: "petg_2.webp",
      alt: "Technical part printed in PETG",
      caption: "Perfect for functional applications that need to take a knock.",
    },
  ],
  PC: [
    {
      src: "PC_img1.webp",
      alt: "Polycarbonate housing with semi-transparent wall",
      caption: "PC stays clear and dimensionally stable for technical covers.",
    },
    {
      src: "PC_img2.webp",
      alt: "Dark-tinted PC bracket with metal inserts",
      caption: "Clear Black PC combines a smoked-glass look with high strength.",
    },
  ],
  PLA_TRANSLUCENT: [
    {
      src: "Translucent_K2_Butterfly.webp",
      alt: "Light-transmitting butterfly lamp printed in PLA Translucent",
      caption: "Translucent PLA diffuses light for ambient pieces.",
    },
    {
      src: "Translucent_K2_glass.webp",
      alt: "Decor object catching light in PLA Translucent",
      caption: "Perfect for lamp shades and glowing signage.",
    },
  ],
  PLA_SILK_MULTI_COLOR: [
    {
      src: "pla_silk_gradient_model_1.webp",
      alt: "Multicolor PLA Silk print with rainbow gradient",
      caption: "PLA Silk Multi-Color delivers smooth rainbow gradients.",
    },
    {
      src: "pla_silk_gradient_model_2.webp",
      alt: "Detail of a PLA Silk Multi-Color vase with gloss",
      caption: "The silky gloss highlights every shade in the gradient.",
    },
  ],
  PLA_CF: [
    {
      src: "PLA_CF_Shelf_2.webp",
      alt: "Robust shelf bracket printed in PLA-CF",
      caption: "Carbon-filled PLA keeps functional parts stiff.",
    },
    {
      src: "PLA_CF_Vise.webp",
      alt: "Bench vise clamp printed in PLA-CF",
      caption: "Ideal for tooling and clamps that must not flex.",
    },
  ],
  PLA_WOOD: [
    {
      src: "PLA_Wood_Feature_1_-4.webp",
      alt: "Vase with warm wood grain printed in PLA Wood",
      caption: "PLA Wood gives prints an authentic wood texture.",
    },
    {
      src: "PLA_Wood_Feature_1_-5.webp",
      alt: "Close-up of PLA Wood print with natural tone",
      caption: "Perfect for interior accents and scale models.",
    },
  ],
}

export const MATERIAL_GALLERY = MATERIAL_GALLERY_NL

export function materialGalleryByLocale(locale: Locale) {
  return locale === "en" ? MATERIAL_GALLERY_EN : MATERIAL_GALLERY_NL
}
