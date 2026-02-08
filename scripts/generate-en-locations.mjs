import fs from "fs"
import path from "path"
import ts from "typescript"
import { createRequire } from "module"
import { fileURLToPath } from "url"

const require = createRequire(import.meta.url)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const root = path.join(__dirname, "..")
const locationsPath = path.join(root, "lib", "locations.ts")
const outputDir = path.join(root, "content", "en", "locations")

function loadLocations() {
  const source = fs.readFileSync(locationsPath, "utf8")
  const transpiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2019 },
  }).outputText

  const mod = { exports: {} }
  const runtime = new Function("require", "module", "exports", transpiled)
  runtime(require, mod, mod.exports)

  const { locations, EN_LOCATION_SLUGS } = mod.exports
  if (!locations || !Array.isArray(locations)) {
    throw new Error("locations could not be loaded from lib/locations.ts")
  }
  const englishSlugs = EN_LOCATION_SLUGS ? new Set(Array.from(EN_LOCATION_SLUGS)) : new Set()

  const slugMap = new Map(locations.map((loc) => [loc.slug, loc]))
  const resolved = []

  // Ensure every EN slug has a location entry; fall back to slug-derived city if missing in locations array.
  for (const slug of englishSlugs.size > 0 ? Array.from(englishSlugs) : locations.map((l) => l.slug)) {
    const loc = slugMap.get(slug)
    if (loc) {
      resolved.push(loc)
    } else {
      resolved.push({
        slug,
        city: deriveCityFromSlug(slug),
        relatedPhrases: [],
        metaDescription: `3D printing in ${deriveCityFromSlug(slug)} with fast delivery from Herzele.`,
        servicedAreas: [deriveCityFromSlug(slug)],
        sectors: [],
      })
    }
  }

  return { locations: resolved, slugSet: new Set(resolved.map((loc) => loc.slug)) }
}

function slugifyName(name) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function deriveCityFromSlug(slug) {
  return slug
    .replace(/^3d-printen-in-/, "")
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

function unique(list) {
  const seen = new Set()
  const out = []
  for (const item of list) {
    if (!item) continue
    if (seen.has(item)) continue
    seen.add(item)
    out.push(item)
  }
  return out
}

function containsAny(text, patterns) {
  return patterns.some((pattern) => text.includes(pattern))
}

function normalizeAreaForEn(area) {
  const raw = `${area}`.trim()
  if (!raw) return ""
  if (/^afhalen\b/i.test(raw)) return "Pickup in Herzele"

  return raw
    .replace(/\bindustriezone\b/gi, "industrial zone")
    .replace(/\bdeelgemeenten\b/gi, "sub-municipal areas")
    .replace(/\bbuitengebied\b/gi, "outer area")
    .replace(/\bhoeves\b/gi, "farms")
    .replace(/\bbedrijventerrein\b/gi, "business park")
    .replace(/\bbedrijvenpark\b/gi, "business park")
    .replace(/\bbedrijvenzone\b/gi, "business zone")
    .replace(/\bcentrum\b/gi, "city center")
    .replace(/\bdorpskern\b/gi, "village center")
    .replace(/\bkern\b/gi, "center")
    .replace(/\s+en\s+/gi, " and ")
    .replace(/\bomliggende\b/gi, "surrounding")
    .replace(/\brand\b/gi, "area")
    .replace(/\bgrens\b/gi, "border area")
    .replace(/\brichting\b/gi, "towards")
    .replace(/\s{2,}/g, " ")
    .trim()
}

function isGenericCoverageLabel(area, city) {
  const text = `${area}`.trim().toLowerCase()
  if (!text) return true
  if (text === city.toLowerCase()) return true
  if (text === "pickup in herzele") return true
  if (text.includes("city center") || text.includes("village center")) return true
  if (text.includes("industrial zone") || text.includes("business zone")) return true
  if (text.includes("sub-municipal") || text.includes("outer area")) return true
  if (text.includes("region") || text.includes("area")) return true
  return false
}

function buildCoverageAreasEn(servicedAreas, city) {
  const translated = unique(
    [city, ...(servicedAreas || [])]
      .map((area) => normalizeAreaForEn(area))
      .filter(Boolean),
  )

  if (!translated.some((area) => area.toLowerCase() === "pickup in herzele")) {
    translated.push("Pickup in Herzele")
  }

  return translated
}

function pickNeighbours(servicedAreas, city) {
  const neighbours = (servicedAreas || [])
    .map((a) => normalizeAreaForEn(a))
    .filter(Boolean)
    .filter((a) => !isGenericCoverageLabel(a, city))
  return unique(neighbours).slice(0, 4)
}

function buildInternalLinks(neighbours, slugSet) {
  const links = []
  for (const area of neighbours) {
    const maybeSlug = `3d-printen-in-${slugifyName(area)}`
    if (slugSet.has(maybeSlug)) {
      links.push({ href: `/en/${maybeSlug}`, label: `3D printing in ${area}` })
    }
  }

  if (links.length === 0) {
    links.push({ href: "/en/locaties", label: "Local 3D printing overview" })
  }

  return links.slice(0, 4)
}

function buildCoverageText(servicedAreas, city) {
  const normalized = unique(
    [city, ...(servicedAreas || [])]
      .map((a) => normalizeAreaForEn(a))
      .filter(Boolean),
  )
  const specific = normalized.filter((a) => !isGenericCoverageLabel(a, city)).slice(0, 3)
  if (specific.length === 0) return city
  if (specific.length === 1) return `${city} and ${specific[0]}`
  return `${city}, ${specific[0]} and ${specific.slice(1).join(", ")}`
}

function buildUseCases(city, neighbours, variant) {
  const nearby = neighbours.length > 0 ? neighbours[0] : "your region"
  const secondNearby = neighbours.length > 1 ? neighbours[1] : "Flanders"

  if (variant === 1) {
    return [
      `Prototype housings and fixtures used by teams in ${city}.`,
      `Short-run batches that stay consistent for companies near ${nearby}.`,
      `Replacement brackets and guards for workshops around ${secondNearby}.`,
      `Display pieces and branded props for events near ${city}.`,
    ]
  }

  if (variant === 2) {
    return [
      `Pilot runs for SMEs around ${city}, tuned per fit/finish.`,
      `Functional PETG parts for maintenance teams near ${nearby}.`,
      `TPU dampers and grips for gear used in ${secondNearby}.`,
      `Presentation models and mockups for pitches around ${city}.`,
    ]
  }

  return [
    `Prototypes and housings supporting teams in ${city}.`,
    `Small series with consistent settings for businesses near ${nearby}.`,
    `Replacement parts and brackets for workshops around ${secondNearby}.`,
    `Promo models, signage and props for events in and around ${city}.`,
  ]
}

function mapSectorsToEn(sectors, city) {
  if (!Array.isArray(sectors) || sectors.length === 0) {
    return [
      `Manufacturing and SMEs around ${city}: prototypes, fixtures and housings.`,
      `Retail, signage and event props for teams in ${city}.`,
      `Schools and labs near ${city}: reliable PLA/PETG parts for lessons.`,
    ]
  }

  const mapped = []
  for (const raw of sectors) {
    const s = `${raw}`.toLowerCase()
    if (containsAny(s, ["kmo", "industrie", "maakbedrijf", "ondernem", "zelfstandig", "techniek", "installateur"])) {
      mapped.push(`SMEs and industry near ${city}: fixtures, enclosures and small batches.`)
    } else if (containsAny(s, ["marketing", "retail", "events", "event", "evenement", "horeca", "cultuur"])) {
      mapped.push(`Retail/marketing/events in ${city}: displays, props and branded pieces.`)
    } else if (containsAny(s, ["school", "onderwijs", "lab", "stem", "vereniging"])) {
      mapped.push(`Education and labs around ${city}: lesson-ready prints in PLA/PETG.`)
    } else if (containsAny(s, ["landbouw", "agro", "bosbeheer", "polder"])) {
      mapped.push(`Agri/landscape projects near ${city}: functional PETG parts and guards.`)
    } else if (containsAny(s, ["maker", "ontwerp", "creatief", "maatwerk", "kleine series", "hobby"])) {
      mapped.push(`Makers and product teams in ${city}: iterative prototyping and short-run production.`)
    } else if (containsAny(s, ["herstelling", "repar", "onderhoud"])) {
      mapped.push(`Maintenance and repair teams in ${city}: durable replacement parts and brackets.`)
    } else {
      mapped.push(`Local teams in ${city}: custom 3D printing for prototypes and functional parts.`)
    }
  }
  return unique(mapped).slice(0, 4)
}

function getLandmarks(loc, city) {
  const list = Array.isArray(loc.landmarks) ? loc.landmarks : []
  const mapped = unique(list.map((l) => `${l}`.trim()).filter(Boolean))
  if (mapped.length > 0) return mapped.slice(0, 4)
  // Fallback without roads: keep generic landmarks
  return [`${city} town center`, `local business park in ${city}`, `sports hall in ${city}`]
}

function hashSlug(slug) {
  let h = 0
  for (let i = 0; i < slug.length; i += 1) {
    h = (h * 31 + slug.charCodeAt(i)) >>> 0
  }
  return h
}

const FAQ_VARIANTS = [
  [
    { q: "Do you handle small batches?", a: "Yes. We reuse calibrated profiles so repeat jobs stay consistent. Tell us the quantities you need." },
    { q: "Typical tolerances?", a: "Around +/-0.2 mm for most parts. Flag press-fits or sliding fits so we can tune clearance." },
    { q: "Lead times?", a: "Usually a few working days after approval; rush is possible. Shipping or pickup in Herzele." },
    { q: "File formats?", a: "STL or STEP. Add notes about function, visible faces and strength so we slice it correctly." },
    { q: "Materials?", a: "PLA Matte for visuals, PETG for strength and temp resistance, TPU for flex. ABS/ASA/nylon on request." },
  ],
  [
    { q: "Can you split large parts?", a: "Yes. We add clean joints/dowel holes so oversized parts assemble neatly." },
    { q: "Surface finish options?", a: "Standard: clean print. Optional: sanding, priming, paint for customer-facing parts." },
    { q: "How do you price?", a: "By size (S/M/L/XL), material, finishing and quantity. You get a clear breakdown per part." },
    { q: "What about repeat orders?", a: "We keep your settings/material so reorders match the first run." },
    { q: "Which files to send?", a: "STL or STEP plus context: where it mounts, load direction, and if threads/heat inserts are needed." },
  ],
  [
    { q: "Do you print functional brackets?", a: "Yes. PETG for tough brackets; TPU for vibration-damping pads; PLA Matte for visuals." },
    { q: "What build volume?", a: "Up to ~35 x 32 x 35 cm. Larger parts get split with hidden joints." },
    { q: "How fast is shipping?", a: "Most jobs leave within a few working days. We ship or you pick up in Herzele." },
    { q: "Do you review my files?", a: "We check wall thickness and fit. If critical, mention tolerances or mating parts." },
    { q: "Can you add inserts?", a: "Yes. We can design for heat-set inserts or self-tapping screws if you note the thread size." },
  ],
]

function buildSpotlight(loc, coverageList) {
  const city = loc.city
  const sector = mapSectorsToEn(loc.sectors, city)[0] ?? `SMEs and makers in ${city}: prototypes and short runs.`
  const focused = coverageList.filter((a) => !isGenericCoverageLabel(a, city))
  const secondary = focused[1] || focused[0] || city
  return [
    `- ${sector}`,
    `- Common ask in ${city}: custom 3D printing with practical PLA/PETG/TPU advice for ${secondary}.`,
    `- Delivery focus: ${coverageList.slice(0, 3).join(", ") || city}.`,
  ]
}

function renderLocation(loc, slugSet) {
  const city = loc.city || deriveCityFromSlug(loc.slug)
  const neighbours = pickNeighbours(loc.servicedAreas, city)
  const coverageList = buildCoverageAreasEn(loc.servicedAreas, city).slice(0, 8)
  const coverage = buildCoverageText(coverageList.slice(1), city)
  const variant = hashSlug(loc.slug) % 3
  const useCases = buildUseCases(city, neighbours, variant)
  const neighbourText = neighbours.length > 0 ? ` and nearby ${neighbours[0]}` : ""
  const internalLinks = buildInternalLinks(neighbours, slugSet)

  const focusedAreas = coverageList.filter((a) => !isGenericCoverageLabel(a, city))
  const secondaryArea = focusedAreas[0] || "the surrounding area"

  const sectorLines = mapSectorsToEn(loc.sectors, city)

  const requestBase = [
    `PLA or PETG functional parts for teams in ${city}.`,
    `TPU grips and pads for bikes, tools or fixtures around ${secondaryArea}.`,
    `Paint-ready show models for presentations in ${city} and ${secondaryArea}.`,
  ]
  const requestLines =
    variant === 1
      ? [requestBase[1], requestBase[0], requestBase[2]]
      : variant === 2
        ? [requestBase[2], requestBase[0], requestBase[1]]
        : requestBase

  const landmarks = getLandmarks(loc, city)
  const spotlightLines = buildSpotlight(loc, coverageList)
  const faqVariant = FAQ_VARIANTS[variant % FAQ_VARIANTS.length]

  const meta = `Local 3D printing for ${coverage}: PLA, PETG and TPU with optional finishing and quick delivery.`

  const useCaseHeading = [
    `Where our 3D prints are used around ${city}`,
    `Projects we help deliver near ${city}`,
    `What teams near ${city} ask us to make`,
  ][variant]

  const popularHeading = [
    `Popular requests from ${city}`,
    `What clients near ${city} often ask`,
    `Recent requests around ${city}`,
  ][variant]

  const coverageHeading = [
    `Where we deliver around ${city}`,
    `Areas we serve near ${city}`,
    `Delivery focus for ${city}`,
  ][variant]

  const spotlightHeading = [
    `Spotlight: ${city} projects`,
    `Local spotlight for ${city}`,
    `What stands out in ${city}`,
  ][variant]

  const landmarksHeading = [
    `Typical drop-off points near ${city}`,
    `Landmarks we often deliver to around ${city}`,
    `Places we serve near ${city}`,
  ][variant]

  const sectorsHeading = [
    `Teams we often help near ${city}`,
    `Who we support around ${city}`,
    `Sectors we back near ${city}`,
  ][variant]

  const materialsHeading = [
    `Recommended materials for ${city}`,
    `Materials that work well near ${city}`,
    `Material picks for ${city} work`,
  ][variant]

  const howHeading = [
    `How to order`,
    `Ordering steps`,
    `Plan your order`,
  ][variant]

  const internalHeading = [
    `Quick links for ${city} teams`,
    `Related pages for ${city}`,
    `Useful links near ${city}`,
  ][variant]

  const ctaHeading = [
    `Request your quote for ${city}`,
    `Ready to print for ${city}?`,
    `Start your ${city} print request`,
  ][variant]

  return `# 3D printing in ${city}: local, fast and tailored

Need **3D printing in ${city}**? X3DPrints prints in Herzele and ships quickly to ${city}${neighbourText}. ${meta}

---

## Why ${city} teams choose us

- Local delivery to ${coverage}; pickup in Herzele.
- Fast quotes: response in one business day with clear pricing.
- Accurate fits for enclosures, jigs and assemblies used in ${city}.
- Optional finishing (sanding/priming/paint) for customer-facing parts.

---

## ${coverageHeading}

We frequently deliver to: ${coverageList.join(", ")}.

---

## ${useCaseHeading}

${useCases.map((u) => `- ${u}`).join("\n")}
- Brackets, guards and fixtures tuned for teams in ${city}.
- Demo pieces and props for events near ${coverageList[0] || city}.

---

## ${spotlightHeading}

${spotlightLines.join("\n")}

---

## ${landmarksHeading}

${landmarks.map((l) => `- ${l}`).join("\n")}

---

## ${sectorsHeading}

${sectorLines.map((s) => `- ${s}`).join("\n")}

---

## ${popularHeading}

${requestLines.map((p) => `- ${p}`).join("\n")}

---

## ${materialsHeading}

| Material       | Key trait                 | Ideal for                                             |
| :------------- | :------------------------ | :---------------------------------------------------- |
| **PLA Matte**  | Clean, detailed finish    | Models, decor, mockups for ${city} presentations       |
| **PETG**       | Tough, heat resistant     | Functional parts, brackets, light outdoor use near ${city} |
| **TPU**        | Flexible, shock absorbing | Grips, pads, bumpers for bikes or tools in ${city}     |

---

## ${howHeading}

1. Upload STL/STEP via [contact](/en/contact).
2. Note material (PLA/PETG/TPU), colour and quantity.
3. Receive quote + timing within one business day.

**Lead time:** usually a few working days; rush possible. Shipping to ${city} or pickup in Herzele.

---

## FAQ about 3D printing in ${city}

${faqVariant.map((item) => `**${item.q}** ${item.a}`).join("  \n")}

---

## ${internalHeading}

${internalLinks.map((l) => `- [${l.label}](${l.href})`).join("\n")}
- [3D printing pillar](/en/3d-printen)
- [Materials and advice](/en/materials#material-suggestion-tool)
- [Pricing examples](/en/pricing)
- [Request a quote](/en/contact)

---

## ${ctaHeading}

Send your files today and get a clear, fast proposal for **3D printing in ${city}**. Nearby production, personal support and reliable quality. 
`
}

function main() {
  const { locations, slugSet } = loadLocations()
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true })

  for (const loc of locations) {
    const md = renderLocation(loc, slugSet)
    const dest = path.join(outputDir, `${loc.slug}.md`)
    fs.writeFileSync(dest, md, "utf8")
  }

  console.log(`Generated ${locations.length} English location pages.`)
}

main()
