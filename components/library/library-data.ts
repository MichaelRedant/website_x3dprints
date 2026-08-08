export type ProjectStatus = "Te sorteren" | "Idee" | "In ontwerp" | "Printklaar" | "Geprint" | "Geleverd"

export type LibraryProject = {
  id: string
  title: string
  fileName: string
  extension: "3MF" | "STL" | "STEP" | "F3D"
  status: ProjectStatus
  client: string
  material: string
  printer: string
  tags: string[]
  sizeMb: number
  weightGram: number | null
  printTime: string | null
  dimensions: string | null
  updatedAt: string
  favorite: boolean
  origin: string
  color: string
}

export const PROJECTS: LibraryProject[] = [
  { id: "tool-organizer", title: "Wera gereedschapsorganizer", fileName: "wera-organizer-v4.3mf", extension: "3MF", status: "Printklaar", client: "Eigen project", material: "PETG HF", printer: "X1C", tags: ["organizer", "werkplaats"], sizeMb: 38.4, weightGram: 284, printTime: "9 u 18", dimensions: "248 × 174 × 62 mm", updatedAt: "Vandaag, 21:14", favorite: true, origin: "Eigen ontwerp", color: "from-cyan-500/45 via-sky-500/20 to-slate-950" },
  { id: "berenfeesten", title: "Vliezelse beer — beeldje", fileName: "beer-definitief.3mf", extension: "3MF", status: "Geprint", client: "Berenfeesten Vlierzele", material: "PLA Matte", printer: "H2S", tags: ["event", "beeldje"], sizeMb: 74.2, weightGram: 116, printTime: "4 u 42", dimensions: "92 × 78 × 143 mm", updatedAt: "Gisteren, 23:08", favorite: true, origin: "Klantopdracht", color: "from-amber-500/50 via-orange-500/20 to-slate-950" },
  { id: "headset-spacer", title: "Headset spacer case", fileName: "headset-case-v7.stl", extension: "STL", status: "Geleverd", client: "Particulier", material: "PLA Basic", printer: "X1C", tags: ["case", "vervangstuk"], sizeMb: 12.8, weightGram: null, printTime: null, dimensions: "128 × 86 × 31 mm", updatedAt: "5 aug, 19:32", favorite: false, origin: "Eigen ontwerp", color: "from-violet-500/45 via-fuchsia-500/15 to-slate-950" },
  { id: "machine-bracket", title: "Machinebeugel prototype", fileName: "bracket-rev-c.step", extension: "STEP", status: "In ontwerp", client: "Metaalbouw De Smet", material: "Onbekend", printer: "—", tags: ["prototype", "b2b"], sizeMb: 6.1, weightGram: null, printTime: null, dimensions: null, updatedAt: "4 aug, 22:11", favorite: false, origin: "Klantbestand", color: "from-emerald-500/40 via-teal-500/15 to-slate-950" },
  { id: "cable-guide", title: "Kabelgeleider bureau", fileName: "cable-guide-final.stl", extension: "STL", status: "Te sorteren", client: "Niet gekoppeld", material: "Onbekend", printer: "—", tags: ["inbox"], sizeMb: 3.7, weightGram: null, printTime: null, dimensions: "64 × 28 × 18 mm", updatedAt: "3 aug, 20:04", favorite: false, origin: "Onbekend", color: "from-rose-500/40 via-pink-500/15 to-slate-950" },
  { id: "plant-pot", title: "Geribbelde plantenpot", fileName: "planter-remix-v2.3mf", extension: "3MF", status: "Idee", client: "Eigen project", material: "PLA Wood", printer: "X1C", tags: ["remix", "decoratie"], sizeMb: 21.5, weightGram: 196, printTime: "7 u 06", dimensions: "160 × 160 × 148 mm", updatedAt: "1 aug, 18:49", favorite: false, origin: "Remix", color: "from-lime-500/35 via-emerald-500/15 to-slate-950" },
]

export const STATUSES: ProjectStatus[] = ["Te sorteren", "Idee", "In ontwerp", "Printklaar", "Geprint", "Geleverd"]
