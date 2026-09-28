import type { MaterialKey } from "@/lib/materials"

export type MaterialTechnicalSource = {
  manufacturer: "Bambu Lab"
  productName: string
  tdsUrl: string
  checkedAt: "2026-09-09"
}

export const MATERIAL_TECHNICAL_SOURCES: Record<MaterialKey, MaterialTechnicalSource> = {
  PLA_TOUGH_PLUS: {
    manufacturer: "Bambu Lab",
    productName: "PLA Tough+",
    tdsUrl:
      "https://store.bblcdn.com/s1/default/7130c176eac54e928d650e48d8b12d72/new_Bambu_PLA_Tough_Technical_Data_Sheet.pdf",
    checkedAt: "2026-09-09",
  },
  PLA_MATTE: {
    manufacturer: "Bambu Lab",
    productName: "PLA Matte",
    tdsUrl:
      "https://store.bblcdn.com/s7/default/5b061f2feeac4ba88f355a33248bbda7/Bambu_PLA_Matte_Technical_Data_Sheet.pdf",
    checkedAt: "2026-09-09",
  },
  PLA_GLOW: {
    manufacturer: "Bambu Lab",
    productName: "PLA Glow",
    tdsUrl: "https://store.bblcdn.com/cd34cf072d14484bbf027290d16abe9b.pdf",
    checkedAt: "2026-09-09",
  },
  PLA_MARBLE: {
    manufacturer: "Bambu Lab",
    productName: "PLA Marble",
    tdsUrl: "https://store.bblcdn.com/b81e083c7d1f4e2182ef749d48f9ec86.pdf",
    checkedAt: "2026-09-09",
  },
  PLA_SPARKLE: {
    manufacturer: "Bambu Lab",
    productName: "PLA Sparkle",
    tdsUrl:
      "https://store.bblcdn.eu/s8/default/2189282a6a0e4843b61b596ec25e72ae/Bambu_PLA_Sparkle-Technical_Data_Sheet.pdf",
    checkedAt: "2026-09-09",
  },
  PLA_METAL: {
    manufacturer: "Bambu Lab",
    productName: "PLA Metal",
    tdsUrl:
      "https://store.bblcdn.eu/s8/default/5f4a92a8e8df4512830af91f30a8e330/Bambu_PLA_Metal_Technical_Data_Sheet.pdf",
    checkedAt: "2026-09-09",
  },
  PLA_GALAXY: {
    manufacturer: "Bambu Lab",
    productName: "PLA Galaxy",
    tdsUrl:
      "https://store.bblcdn.eu/s8/default/47fc7695cd8643a8a190f6d783f64284/Bambu_PLA_Galaxy_Technical_Data_Sheet.pdf",
    checkedAt: "2026-09-09",
  },
  PLA_AERO: {
    manufacturer: "Bambu Lab",
    productName: "PLA Aero",
    tdsUrl:
      "https://store.bblcdn.eu/s8/default/b9e184aa63964114843f52684f2b3471/Bambu_PLA_Aero_Technical_Data_Sheet.pdf",
    checkedAt: "2026-09-09",
  },
  PLA_SILK_PLUS: {
    manufacturer: "Bambu Lab",
    productName: "PLA Silk+",
    tdsUrl:
      "https://store.bblcdn.eu/s8/default/d0de0f57694b406dbf3e9b2345b7dbb9/Bambu_PLA_Silk__Technical_Data_Sheet.pdf",
    checkedAt: "2026-09-09",
  },
  PLA_BASIC_GRADIENT: {
    manufacturer: "Bambu Lab",
    productName: "PLA Basic Gradient",
    tdsUrl:
      "https://store.bblcdn.eu/s8/default/10ab80170b764fc89da4c143cfdfb8a6/Bambu_PLA_Basic_Gradient_Technical_Data_Sheet.pdf",
    checkedAt: "2026-09-09",
  },
  PLA_BASIC: {
    manufacturer: "Bambu Lab",
    productName: "PLA Basic",
    tdsUrl:
      "https://store.bblcdn.eu/s8/default/073e722a4aa44f7cbfdc419d597475cc/Bambu_PLA_Basic_Technical_Data_Sheet.pdf",
    checkedAt: "2026-09-09",
  },
  PLA_TRANSLUCENT: {
    manufacturer: "Bambu Lab",
    productName: "PLA Translucent",
    tdsUrl:
      "https://store.bblcdn.com/s7/default/729a8bf233e9474db25c8d5be1e64a00/Bambu_PLA_Translucent_Technical_Data_Sheet.pdf",
    checkedAt: "2026-09-09",
  },
  PLA_SILK_MULTI_COLOR: {
    manufacturer: "Bambu Lab",
    productName: "PLA Silk Multi-Color",
    tdsUrl:
      "https://store.bblcdn.com/s6/default/df1aa6ebbea44095a5bb936f1264be17/Bambu_PLA_Silk_Dual_Color_Technical_Data_Sheet.pdf",
    checkedAt: "2026-09-09",
  },
  PLA_CF: {
    manufacturer: "Bambu Lab",
    productName: "PLA-CF",
    tdsUrl:
      "https://store.bblcdn.eu/s8/default/aefa8303ad8d40248b0d86dfdad46518/Bambu_PLA-CF_Technical_Data_Sheet_V3.pdf",
    checkedAt: "2026-09-09",
  },
  PLA_WOOD: {
    manufacturer: "Bambu Lab",
    productName: "PLA Wood",
    tdsUrl:
      "https://store.bblcdn.com/s4/default/6fda0ae88e5a4e66bb5d58f2968eee42/Bambus_PLA_Wood_Technical_Data_Sheet.pdf",
    checkedAt: "2026-09-09",
  },
  PETG: {
    manufacturer: "Bambu Lab",
    productName: "PETG HF",
    tdsUrl:
      "https://store.bblcdn.com/s6/default/20423d7f839c4a66b9712508549c68b4/Bambu_PETG_HF_TDS.pdf",
    checkedAt: "2026-09-09",
  },
  PC: {
    manufacturer: "Bambu Lab",
    productName: "PC",
    tdsUrl:
      "https://store.bblcdn.eu/s8/default/ab03007d58814bc28a08145719b552de/Bambu_PC_Technical_Data_Sheet.pdf",
    checkedAt: "2026-09-09",
  },
  PC_FR: {
    manufacturer: "Bambu Lab",
    productName: "PC FR",
    tdsUrl:
      "https://store.bblcdn.com/s6/default/280fecd3890948588fb95ac91013b7ba/Bambu_PC_FR_Technical_Data_Sheet.pdf",
    checkedAt: "2026-09-09",
  },
  TPU: {
    manufacturer: "Bambu Lab",
    productName: "TPU 95A HF",
    tdsUrl:
      "https://store.bblcdn.eu/s8/default/16df21baf482453999b3dbb61cc110e7/Bambu_TPU_95A_HF_Technical_Data_Sheet.pdf",
    checkedAt: "2026-09-09",
  },
}
