import path from "node:path"
import { mkdir, writeFile } from "node:fs/promises"
import sharp from "sharp"

const root = process.cwd()
const outputDir = path.join(root, "artifacts", "pinterest", "batch-2026-08-24")
const logoPath = path.join(root, "public", "Logo.webp")

const escapeXml = (value) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")

const pins = [
  {
    file: "3d-scannen-belgie-vanaf-45-euro.jpg",
    image: "public/images/CR-Scan_Otter_3.webp",
    eyebrow: "3D SCANNEN IN BELGIË",
    title: ["Van object naar", "3D-bestand", "vanaf € 45"],
    subtitle: "Scanbestand inbegrepen",
    accent: "#22d3ee",
    titleText: "3D scannen in België vanaf €45",
    board: "3D scannen & scan-to-print",
    description:
      "Heb je een bestaand onderdeel, kunstobject of prototype, maar geen 3D-model? X3DPrints scant kleine en middelgrote objecten in Herzele. Je ontvangt altijd het afgesproken 3D-scanbestand. Bekijk de mogelijkheden, voorbereiding en richtprijzen.",
    altText: "Creality CR-Scan Otter 3D-scanner met informatie over 3D scannen vanaf 45 euro.",
    link: "https://www.x3dprints.be/3d-scannen/?utm_source=pinterest&utm_medium=organic_social&utm_campaign=project_pins_augustus&utm_content=scan_prijs",
  },
  {
    file: "persoonsscan-buste-3d-bestand.jpg",
    image: "public/images/portfolio/white-hand-sculpture-set.webp",
    eyebrow: "SCAN-TO-PRINT",
    title: ["Persoonsscan", "of buste", "laten maken"],
    subtitle: "Van scan naar digitaal model",
    accent: "#38bdf8",
    titleText: "Persoonsscan of buste laten maken",
    board: "3D scannen & scan-to-print",
    description:
      "Van persoon naar digitaal 3D-model en optionele buste of figuur. X3DPrints verzorgt de scan, mesh-cleanup en printvoorbereiding in Herzele. Je ontvangt het afgesproken scanbestand voor hergebruik of archivering.",
    altText: "Witte 3D-geprinte handscans als voorbeeld van persoonsscanning en scan-to-print.",
    link: "https://www.x3dprints.be/3d-scannen/?utm_source=pinterest&utm_medium=organic_social&utm_campaign=project_pins_augustus&utm_content=persoonsscan_buste",
  },
  {
    file: "gepersonaliseerde-wielertrofee-3d-geprint.jpg",
    image: "public/images/portfolio/gold-bicycle-race-trophy-zilveren-helmen.webp",
    eyebrow: "AWARDS & EVENTS",
    title: ["Wielertrofee", "volledig", "op maat"],
    subtitle: "Naam, resultaat en event verwerkt",
    accent: "#fbbf24",
    titleText: "Gepersonaliseerde wielertrofee 3D geprint",
    board: "3D printen voor bedrijven & events",
    description:
      "Een unieke prijs voor koers, club of evenement: deze goudkleurige fietstrofee werd gepersonaliseerd met wedstrijdnaam en resultaat. X3DPrints ontwerpt en print awards, relatiegeschenken en kleine reeksen op maat vanuit Herzele.",
    altText: "Goudkleurige 3D-geprinte fietstrofee met gepersonaliseerde sokkel.",
    link: "https://www.x3dprints.be/portfolio/?utm_source=pinterest&utm_medium=organic_social&utm_campaign=project_pins_augustus&utm_content=wielertrofee",
  },
  {
    file: "grote-plantenpot-op-maat-3d-geprint.jpg",
    image: "public/images/portfolio/pink-smiley-planter-pot-with-arms.webp",
    eyebrow: "INTERIEUR OP MAAT",
    title: ["Grote plantenpot", "met karakter", "3D geprint"],
    subtitle: "Formaat, vorm en kleur aanpasbaar",
    accent: "#fb7185",
    titleText: "Grote plantenpot op maat 3D geprint",
    board: "3D printen voor bouw & interieur",
    description:
      "Een speelse plantenpot met karakter, groot formaat en volledig 3D geprint. Een voorbeeld van decoratief maatwerk voor interieur, etalage of event. Formaat, kleur en vorm kunnen op het project worden afgestemd.",
    altText: "Grote roze 3D-geprinte plantenpot met glimlach, armen en benen.",
    link: "https://www.x3dprints.be/blog/use-case-dinsdag-interieur/?utm_source=pinterest&utm_medium=organic_social&utm_campaign=project_pins_augustus&utm_content=smiley_plantenpot",
  },
  {
    file: "bureau-organizer-school-op-maat.jpg",
    image: "public/images/portfolio/back2school (2).webp",
    eyebrow: "BACK TO SCHOOL",
    title: ["Bureau-organizer", "voor school", "op maat"],
    subtitle: "Overzichtelijk en personaliseerbaar",
    accent: "#a3e635",
    titleText: "Bureau-organizer op maat voor school",
    board: "3D-geprinte organizers & werkplek",
    description:
      "Pennen, labels en kleine spullen overzichtelijk op één plek. X3DPrints maakt bureau-organizers en schoolaccessoires op maat, met kleur, naam of vakindeling afgestemd op dagelijks gebruik. Ontdek ideeën voor school en werkplek.",
    altText: "Gepersonaliseerde 3D-geprinte bureau-organizer voor schoolspullen.",
    link: "https://www.x3dprints.be/blog/3d-printen-back-to-school/?utm_source=pinterest&utm_medium=organic_social&utm_campaign=project_pins_augustus&utm_content=bureau_organizer_school",
  },
  {
    file: "berenfeesten-vlierzele-eventbeeldjes.jpg",
    image: "public/images/blog/berenfeesten-vlierzele/berenfeesten-vlierzele-geprinte-beeldjes.webp",
    eyebrow: "LOKALE EVENTCASE",
    title: ["Van vier foto's", "naar een reeks", "eventbeeldjes"],
    subtitle: "AI-model, printvoorbereiding en productie",
    accent: "#f59e0b",
    titleText: "Van foto's naar 3D-eventbeeldjes voor de Berenfeesten",
    board: "3D printen voor bedrijven & events",
    description:
      "Voor de Berenfeesten in Vlierzele werd een lokaal standbeeld op basis van vier foto's omgezet naar een digitaal 3D-model, printklaar gemaakt en als reeks geproduceerd in bronskleurig filament. Bekijk de volledige workflow van bronbeeld naar tastbaar eventbeeldje.",
    altText: "Bronskleurige 3D-geprinte beeldjes voor de Berenfeesten in Vlierzele.",
    link: "https://www.x3dprints.be/blog/vliezelse-beer-3d-beeldjes-berenfeesten/?utm_source=pinterest&utm_medium=organic_social&utm_campaign=project_pins_augustus&utm_content=berenfeesten_eventbeeldjes",
  },
  {
    file: "selectieve-hoornaarval-functioneel-prototype.jpg",
    image: "public/images/portfolio/hornaarval.webp",
    eyebrow: "FUNCTIONEEL PROTOTYPE",
    title: ["Selectieve val", "voor Aziatische", "hoornaar"],
    subtitle: "Van praktijkprobleem naar hulpmiddel",
    accent: "#facc15",
    titleText: "Selectieve hoornaarval als functioneel prototype",
    board: "3D print onderdelen & prototypes",
    description:
      "Van praktijkprobleem naar inzetbaar 3D-geprint hulpmiddel. Deze selectieve val voor de Aziatische hoornaar werd ontwikkeld en getest als functioneel maatwerkproject. Bekijk ontwerpkeuzes, materiaal en praktijktoepassing.",
    altText: "3D-geprinte selectieve val voor de Aziatische hoornaar.",
    link: "https://www.x3dprints.be/cases/selectieve-val-aziatische-hoornaar-sint-lievens-houtem/?utm_source=pinterest&utm_medium=organic_social&utm_campaign=project_pins_augustus&utm_content=selectieve_hoornaarval",
  },
  {
    file: "gepersonaliseerde-portretfiguren-op-foto.jpg",
    image: "public/images/portfolio/custom-family-portrait-busts-and-figures.webp",
    eyebrow: "PERSOONLIJK MAATWERK",
    title: ["Van foto naar", "persoonlijk", "3D-figuur"],
    subtitle: "Uniek cadeau of herinneringsstuk",
    accent: "#2dd4bf",
    titleText: "Gepersonaliseerde 3D-figuren op basis van foto",
    board: "3D print projecten & inspiratie",
    description:
      "Van referentiefoto naar een tastbaar portretfiguur of buste. X3DPrints helpt met 3D-modellering, kleurkeuze en printvoorbereiding voor een persoonlijk cadeau, herinnering of uniek displayobject.",
    altText: "Set gepersonaliseerde 3D-geprinte portretbustes en figuren op basis van foto's.",
    link: "https://www.x3dprints.be/blog/3d-printen-mini-figuren/?utm_source=pinterest&utm_medium=organic_social&utm_campaign=project_pins_augustus&utm_content=portretfiguren_foto",
  },
]

const buildOverlay = ({ eyebrow, title, subtitle, accent }) => {
  const lines = title
    .map((line, index) => `<tspan x="70" dy="${index === 0 ? 0 : 82}">${escapeXml(line)}</tspan>`)
    .join("")

  return Buffer.from(`
    <svg width="1000" height="1500" viewBox="0 0 1000 1500" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#06101d" stop-opacity="0.20"/>
          <stop offset="0.42" stop-color="#06101d" stop-opacity="0.05"/>
          <stop offset="0.67" stop-color="#06101d" stop-opacity="0.70"/>
          <stop offset="1" stop-color="#06101d" stop-opacity="0.98"/>
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="5" stdDeviation="8" flood-color="#000000" flood-opacity="0.55"/>
        </filter>
      </defs>
      <rect width="1000" height="1500" fill="url(#shade)"/>
      <rect x="70" y="835" width="150" height="8" rx="4" fill="${accent}"/>
      <text x="70" y="905" fill="${accent}" font-family="Bahnschrift, Arial, sans-serif" font-size="31" font-weight="700" letter-spacing="4">${escapeXml(eyebrow)}</text>
      <text x="70" y="1010" fill="#ffffff" font-family="Bahnschrift, Arial, sans-serif" font-size="70" font-weight="800" letter-spacing="0" filter="url(#shadow)">${lines}</text>
      <text x="70" y="1305" fill="#dbeafe" font-family="Bahnschrift, Arial, sans-serif" font-size="31" font-weight="500">${escapeXml(subtitle)}</text>
      <rect x="70" y="1360" width="860" height="1" fill="#ffffff" opacity="0.32"/>
      <text x="70" y="1430" fill="#ffffff" font-family="Bahnschrift, Arial, sans-serif" font-size="32" font-weight="700" letter-spacing="3">X3DPRINTS.BE</text>
    </svg>
  `)
}

const createPin = async (pin) => {
  const source = path.join(root, pin.image)
  const background = await sharp(source)
    .resize(1000, 1500, { fit: "cover", position: "attention" })
    .jpeg({ quality: 92, chromaSubsampling: "4:4:4" })
    .toBuffer()
  const logo = await sharp(logoPath).resize(130, 130, { fit: "contain" }).png().toBuffer()

  await sharp(background)
    .composite([
      { input: buildOverlay(pin), left: 0, top: 0 },
      { input: logo, left: 70, top: 65 },
    ])
    .jpeg({ quality: 92, chromaSubsampling: "4:4:4" })
    .toFile(path.join(outputDir, pin.file))
}

const csvCell = (value) => `"${String(value).replaceAll('"', '""')}"`

await mkdir(outputDir, { recursive: true })
await Promise.all(pins.map(createPin))

const manifest = pins.map(({ image, eyebrow, title, subtitle, accent, ...pin }) => ({
  ...pin,
  file: path.join(outputDir, pin.file),
}))
await writeFile(path.join(outputDir, "pins.json"), `${JSON.stringify(manifest, null, 2)}\n`, "utf8")

const csvHeader = ["Title", "File", "Board", "Description", "Alt text", "Link"]
const csvRows = manifest.map((pin) =>
  [pin.titleText, pin.file, pin.board, pin.description, pin.altText, pin.link].map(csvCell).join(","),
)
await writeFile(path.join(outputDir, "pins.csv"), `${csvHeader.map(csvCell).join(",")}\n${csvRows.join("\n")}\n`, "utf8")

console.log(`Generated ${pins.length} Pinterest pins in ${outputDir}`)
