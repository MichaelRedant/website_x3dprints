import path from "node:path"
import { mkdir } from "node:fs/promises"
import sharp from "sharp"

const root = process.cwd()
const outputDir = path.join(root, "artifacts", "pinterest", "covers")
const logoPath = path.join(root, "public", "Logo.webp")

const escapeXml = (value) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")

const boardCovers = [
  {
    file: "board-bedrijven-events.webp",
    image: "public/images/blog/berenfeesten-vlierzele/berenfeesten-vlierzele-geprinte-beeldjes.webp",
    eyebrow: "X3DPRINTS BELGIË",
    title: ["3D PRINTEN VOOR", "BEDRIJVEN & EVENTS"],
    subtitle: "Merchandise · displays · kleine reeksen",
  },
  {
    file: "board-bouw-interieur.webp",
    image: "public/images/blog/flushpoint/10-plafondsokkels-osb-plafond-voor-spuiten.webp",
    eyebrow: "FUNCTIONEEL MAATWERK",
    title: ["3D PRINTEN VOOR", "BOUW & INTERIEUR"],
    subtitle: "Montagedelen · verlichting · prototypes",
  },
  {
    file: "board-onderdelen-prototypes.webp",
    image: "public/images/blog/headset-spacer/custom-bike-headset-spacer-detail.webp",
    eyebrow: "VAN IDEE NAAR ONDERDEEL",
    title: ["3D PRINT ONDERDELEN", "& PROTOTYPES"],
    subtitle: "CAD · testpassen · kleine productie",
  },
  {
    file: "board-scannen-scan-to-print.webp",
    image: "public/images/CR-Scan_Otter_3.webp",
    eyebrow: "OBJECT NAAR 3D-BESTAND",
    title: ["3D SCANNEN", "& SCAN-TO-PRINT"],
    subtitle: "Scannen · modelleren · printen",
  },
]

const boardOverlay = ({ eyebrow, title, subtitle }) => Buffer.from(`
  <svg width="1000" height="1500" viewBox="0 0 1000 1500" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="shade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#07111f" stop-opacity="0.12"/>
        <stop offset="0.45" stop-color="#07111f" stop-opacity="0.44"/>
        <stop offset="1" stop-color="#07111f" stop-opacity="0.96"/>
      </linearGradient>
      <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#22d3ee"/>
        <stop offset="1" stop-color="#34d399"/>
      </linearGradient>
    </defs>
    <rect width="1000" height="1500" fill="url(#shade)"/>
    <rect x="72" y="790" width="150" height="8" rx="4" fill="url(#accent)"/>
    <text x="72" y="870" fill="#67e8f9" font-family="Bahnschrift, sans-serif" font-size="34" font-weight="700" letter-spacing="5">${escapeXml(eyebrow)}</text>
    <text x="72" y="980" fill="#ffffff" font-family="Bahnschrift, sans-serif" font-size="69" font-weight="800" letter-spacing="1">
      <tspan x="72" dy="0">${escapeXml(title[0])}</tspan>
      <tspan x="72" dy="82">${escapeXml(title[1])}</tspan>
    </text>
    <text x="72" y="1215" fill="#dbeafe" font-family="Bahnschrift, sans-serif" font-size="33" font-weight="500">${escapeXml(subtitle)}</text>
    <rect x="72" y="1300" width="856" height="1" fill="#ffffff" opacity="0.35"/>
    <text x="72" y="1375" fill="#ffffff" font-family="Bahnschrift, sans-serif" font-size="35" font-weight="700" letter-spacing="3">X3DPRINTS.BE</text>
  </svg>
`)

const createBoardCover = async (cover) => {
  const background = await sharp(path.join(root, cover.image))
    .resize(1000, 1500, { fit: "cover", position: "attention" })
    .webp({ quality: 88 })
    .toBuffer()

  const logo = await sharp(logoPath)
    .resize(150, 150, { fit: "contain" })
    .webp({ quality: 90 })
    .toBuffer()

  await sharp(background)
    .composite([
      { input: boardOverlay(cover), left: 0, top: 0 },
      { input: logo, left: 72, top: 72 },
    ])
    .webp({ quality: 90 })
    .toFile(path.join(outputDir, cover.file))
}

const createProfileCover = async () => {
  const panelSources = [
    "public/images/blog/berenfeesten-vlierzele/berenfeesten-vlierzele-geprinte-beeldjes.webp",
    "public/images/blog/flushpoint/10-plafondsokkels-osb-plafond-voor-spuiten.webp",
    "public/images/blog/headset-spacer/custom-bike-headset-spacer-detail.webp",
    "public/images/CR-Scan_Otter_3.webp",
  ]
  const panels = await Promise.all(
    panelSources.map((source) =>
      sharp(path.join(root, source)).resize(400, 900, { fit: "cover", position: "attention" }).webp({ quality: 86 }).toBuffer(),
    ),
  )
  const logo = await sharp(logoPath).resize(185, 185, { fit: "contain" }).webp({ quality: 90 }).toBuffer()
  const overlay = Buffer.from(`
    <svg width="1600" height="900" viewBox="0 0 1600 900" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="coverShade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#06101d" stop-opacity="0.98"/>
          <stop offset="0.48" stop-color="#06101d" stop-opacity="0.90"/>
          <stop offset="0.78" stop-color="#06101d" stop-opacity="0.42"/>
          <stop offset="1" stop-color="#06101d" stop-opacity="0.18"/>
        </linearGradient>
        <linearGradient id="line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#22d3ee"/>
          <stop offset="1" stop-color="#34d399"/>
        </linearGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#coverShade)"/>
      <rect x="96" y="342" width="190" height="9" rx="4" fill="url(#line)"/>
      <text x="96" y="430" fill="#67e8f9" font-family="Bahnschrift, sans-serif" font-size="30" font-weight="700" letter-spacing="6">3D PRINTSTUDIO IN HERZELE</text>
      <text x="96" y="540" fill="#ffffff" font-family="Bahnschrift, sans-serif" font-size="76" font-weight="800">3D PRINTEN OP MAAT</text>
      <text x="96" y="625" fill="#ffffff" font-family="Bahnschrift, sans-serif" font-size="61" font-weight="700">&amp; 3D SCANNEN</text>
      <text x="96" y="705" fill="#dbeafe" font-family="Bahnschrift, sans-serif" font-size="31" font-weight="500">Onderdelen · prototypes · kleine reeksen · scan-to-print</text>
      <text x="96" y="790" fill="#ffffff" font-family="Bahnschrift, sans-serif" font-size="34" font-weight="700" letter-spacing="3">X3DPRINTS.BE</text>
    </svg>
  `)

  await sharp({ create: { width: 1600, height: 900, channels: 3, background: "#07111f" } })
    .composite([
      ...panels.map((input, index) => ({ input, left: index * 400, top: 0 })),
      { input: overlay, left: 0, top: 0 },
      { input: logo, left: 96, top: 92 },
    ])
    .webp({ quality: 90 })
    .toFile(path.join(outputDir, "profile-cover-x3dprints.webp"))
}

await mkdir(outputDir, { recursive: true })
await Promise.all(boardCovers.map(createBoardCover))
await createProfileCover()

console.log(`Generated ${boardCovers.length + 1} Pinterest covers in ${outputDir}`)
