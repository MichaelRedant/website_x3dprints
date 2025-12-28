// content/material-gallery.ts
import type { MaterialKey } from "@/lib/materials"

export type MaterialGalleryItem = {
  src: string
  alt: string
  caption?: string
}

export const MATERIAL_GALLERY: Partial<Record<MaterialKey, MaterialGalleryItem[]>> = {
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
      caption: "PLA Galaxy creëert een deep-space effect met microglitter en nevelachtige accenten.",
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
      caption: "Marmerpigmenten creëren luxe woonaccessoires met textuur.",
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
      caption: "PLA Metal combineert industriële look met lage massa.",
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
      caption: "Voorverlopen spoelen creëren unieke kleurovergangen.",
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
