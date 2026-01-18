const fs = require("fs")
const path = require("path")
const ts = require("typescript")

const root = path.join(__dirname, "..")
const locationsPath = path.join(root, "lib", "locations.ts")
const enDir = path.join(root, "content", "en", "locations")
const nlDir = path.join(root, "content", "locations")

const START = "<!-- LOCAL_ENRICH_START -->"
const END = "<!-- LOCAL_ENRICH_END -->"

function loadLocations() {
  const source = fs.readFileSync(locationsPath, "utf8")
  const transpiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2019 },
  }).outputText

  const mod = { exports: {} }
  // eslint-disable-next-line no-new-func
  const runtime = new Function("require", "module", "exports", transpiled)
  runtime(require, mod, mod.exports)

  const { locations, EN_LOCATION_SLUGS } = mod.exports
  if (!locations || !Array.isArray(locations)) throw new Error("locations array missing")
  const enSet = EN_LOCATION_SLUGS ? new Set(Array.from(EN_LOCATION_SLUGS)) : null
  const locs = enSet ? locations.filter((loc) => enSet.has(loc.slug)) : locations
  return { locations: locs, slugSet: new Set(locs.map((l) => l.slug)) }
}

function unique(list) {
  const seen = new Set()
  const out = []
  for (const item of list) {
    if (!item) continue
    if (!seen.has(item)) {
      seen.add(item)
      out.push(item)
    }
  }
  return out
}

function coverageList(loc) {
  const city = loc.city || ""
  const areas = Array.isArray(loc.servicedAreas) ? loc.servicedAreas : []
  return unique([city, ...areas].map((v) => `${v}`.trim()).filter(Boolean))
}

function neighbourSlugs(list, slugSet) {
  const slugs = []
  for (const name of list) {
    const slug = `3d-printen-in-${name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")}`
    if (slugSet.has(slug)) slugs.push({ name, slug })
  }
  return unique(slugs).slice(0, 3)
}

function pickPhrases(loc) {
  const rp = Array.isArray(loc.relatedPhrases) ? loc.relatedPhrases : []
  return unique(rp.map((p) => `${p}`.trim()).filter(Boolean)).slice(0, 3)
}

function mapSectorsEn(sectors, city) {
  if (!Array.isArray(sectors) || sectors.length === 0) {
    return [
      `SMEs and makers in ${city}: fixtures and enclosures.`,
      `Retail/events near ${city}: displays and props.`,
      `Education/labs around ${city}: lesson-ready prints.`,
    ]
  }
  const mapped = []
  for (const sRaw of sectors) {
    const s = `${sRaw}`.toLowerCase()
    if (s.includes("kmo") || s.includes("industrie") || s.includes("maak")) {
      mapped.push(`SMEs/industry near ${city}: prototypes, fixtures, housings.`)
    } else if (s.includes("marketing") || s.includes("retail") || s.includes("event") || s.includes("evenement")) {
      mapped.push(`Retail/marketing/events in ${city}: displays, signage, props.`)
    } else if (s.includes("school") || s.includes("onderwijs") || s.includes("lab") || s.includes("stem")) {
      mapped.push(`Education/labs around ${city}: reliable PLA/PETG parts.`)
    } else if (s.includes("landbouw") || s.includes("agro")) {
      mapped.push(`Agri/landscape projects near ${city}: PETG guards and brackets.`)
    } else {
      mapped.push(`Local focus: ${sRaw}`)
    }
  }
  return unique(mapped).slice(0, 4)
}

function mapSectorsNl(sectors, city) {
  if (!Array.isArray(sectors) || sectors.length === 0) {
    return [
      `KMO's en makers in ${city}: pasmallen en behuizingen.`,
      `Retail/events rond ${city}: displays en props.`,
      `Onderwijs/labs in ${city}: lesklare prints.`,
    ]
  }
  return unique(
    sectors
      .map((s) => `${s}`.trim())
      .filter(Boolean)
      .map((s) => (s.includes(city) ? s : `${s} (${city})`))
  ).slice(0, 4)
}

function getLandmarksEn(loc, city) {
  const list = Array.isArray(loc.landmarks) ? loc.landmarks : []
  const mapped = unique(list.map((l) => `${l}`.trim()).filter(Boolean))
  if (mapped.length > 0) return mapped.slice(0, 4)
  return [`${city} town center`, `local business park in ${city}`, `sports hall in ${city}`]
}

function getLandmarksNl(loc, city) {
  const list = Array.isArray(loc.landmarks) ? loc.landmarks : []
  const mapped = unique(list.map((l) => `${l}`.trim()).filter(Boolean))
  if (mapped.length > 0) return mapped.slice(0, 4)
  return [`Centrum van ${city}`, `Lokale bedrijvenzone in ${city}`, `Sporthal in ${city}`]
}

function hashSlug(slug) {
  let h = 0
  for (let i = 0; i < slug.length; i += 1) {
    h = (h * 31 + slug.charCodeAt(i)) >>> 0
  }
  return h
}

function buildSpotlightEn(loc, areas) {
  const city = loc.city
  const area = areas[1] || areas[0] || city
  const sector = Array.isArray(loc.sectors) && loc.sectors.length > 0 ? loc.sectors[0] : `Local teams in ${city}`
  const phrase = Array.isArray(loc.relatedPhrases) && loc.relatedPhrases.length > 0 ? loc.relatedPhrases[0] : `3D printing in ${city}`
  const variant = hashSlug(loc.slug) % 3
  const lines = [
    `- ${sector}: PLA/PETG parts tuned for projects near ${area}.`,
    `- Common request: ${phrase}; we pick material and finish for the use case.`,
    `- Delivery focus: ${areas.slice(0, 3).join(", ") || city}.`,
  ]
  if (variant === 1) {
    lines[0] = `- ${sector}: fixtures and housings for teams around ${area}.`
    lines[1] = `- Frequent order: ${phrase}; we keep settings for reorders.`
  } else if (variant === 2) {
    lines[0] = `- ${sector}: small batches with consistent settings near ${area}.`
    lines[2] = `- Pickup in Herzele; shipping to ${areas[0] || city} and ${areas[1] || city}.`
  }
  return lines
}

function buildSpotlightNl(loc, areas) {
  const city = loc.city
  const area = areas[1] || areas[0] || city
  const sector = Array.isArray(loc.sectors) && loc.sectors.length > 0 ? loc.sectors[0] : `Lokale teams in ${city}`
  const phrase = Array.isArray(loc.relatedPhrases) && loc.relatedPhrases.length > 0 ? loc.relatedPhrases[0] : `3D printen in ${city}`
  const variant = hashSlug(loc.slug) % 3
  const lines = [
    `- ${sector}: PLA/PETG onderdelen afgestemd op projecten rond ${area}.`,
    `- Vaak gevraagd: ${phrase}; we adviseren materiaal en afwerking.`,
    `- Leverfocus: ${areas.slice(0, 3).join(", ") || city}.`,
  ]
  if (variant === 1) {
    lines[0] = `- ${sector}: behuizingen en pasmallen voor teams in ${area}.`
    lines[1] = `- Terugkerende order: ${phrase}; we bewaren je instellingen.`
  } else if (variant === 2) {
    lines[0] = `- ${sector}: kleine reeksen met vaste settings rond ${area}.`
    lines[2] = `- Afhalen in Herzele; verzending naar ${areas[0] || city} en ${areas[1] || city}.`
  }
  return lines
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

function insertBlock(filePath, block) {
  let content = fs.readFileSync(filePath, "utf8")
  if (content.includes(START) && content.includes(END)) {
    const regex = new RegExp(`${START}[\\s\\S]*?${END}`)
    content = content.replace(regex, `${START}\n${block}\n${END}`)
  } else {
    content = `${content.trimEnd()}\n\n${START}\n${block}\n${END}\n`
  }
  fs.writeFileSync(filePath, content, "utf8")
}

function buildEnBlock(loc, slugSet) {
  const city = loc.city
  const areas = coverageList(loc)
  const variant = hashSlug(loc.slug) % 3
  const areaText = areas.slice(0, 6).join(", ")
  const neighbours = neighbourSlugs(areas.slice(1), slugSet)
  const neighbourLinks =
    neighbours.length > 0
      ? neighbours.map((n) => `- [3D printing in ${n.name}](/en/${n.slug})`).join("\n")
      : "- [3D printing in Ghent](/en/3d-printen-in-gent)"
  const phrases = pickPhrases(loc)
  const phraseLines =
    phrases.length > 0
      ? phrases.map((p) => `- ${p}`).join("\n")
      : `- 3D printing in ${city} for prototypes and fixtures\n- PLA/PETG functional parts near ${city}`
  const sectors = mapSectorsEn(loc.sectors, city)
  const landmarks = getLandmarksEn(loc, city)
  const spotlight = buildSpotlightEn(loc, areas)

  const highlightsHeading = [
    `Local highlights for ${city}`,
    `What matters locally in ${city}`,
    `Delivery details around ${city}`,
  ][variant]
  const neighboursHeading = [
    `Neighbouring pages`,
    `Nearby locations`,
    `Related nearby pages`,
  ][variant]
  const spotlightHeading = [
    `Local spotlight`,
    `Spotlight near ${city}`,
    `Customer spotlight`,
  ][variant]
  const landmarksHeading = [
    `Places we often deliver near ${city}`,
    `Landmarks around ${city}`,
    `Where we drop off near ${city}`,
  ][variant]
  const sectorsHeading = [
    `Industries we serve near ${city}`,
    `Teams we support around ${city}`,
    `Sectors we back near ${city}`,
  ][variant]
  const phrasesHeading = [
    `Popular searches from ${city}`,
    `Frequently asked in ${city}`,
    `Common requests around ${city}`,
  ][variant]

  return `## ${highlightsHeading}

- Coverage: ${areaText || city}; delivery from Herzele, pickup available.
- Frequent jobs: prototypes, housings and brackets tailored for teams in ${city}.
- File prep: STL/STEP with fit, finish and quantity info helps us quote faster.
- Turnaround: usually a few working days; rush possible on request.

## ${neighboursHeading}
${neighbourLinks}

## ${spotlightHeading}
${spotlight.join("\n")}

## ${landmarksHeading}
${landmarks.map((l) => `- ${l}`).join("\n")}

## ${sectorsHeading}
${sectors.map((s) => `- ${s}`).join("\n")}

## ${phrasesHeading}
${phraseLines}`
}

function buildNlBlock(loc, slugSet) {
  const city = loc.city
  const areas = coverageList(loc)
  const variant = hashSlug(loc.slug) % 3
  const areaText = areas.slice(0, 6).join(", ")
  const neighbours = neighbourSlugs(areas.slice(1), slugSet)
  const neighbourLinks =
    neighbours.length > 0
      ? neighbours.map((n) => `- [3D printen in ${n.name}](/${n.slug})`).join("\n")
      : "- [3D printen in Gent](/3d-printen-in-gent)"
  const phrases = pickPhrases(loc)
  const phraseLines =
    phrases.length > 0
      ? phrases.map((p) => `- ${p}`).join("\n")
      : `- 3D printen in ${city} voor prototypes en pasmallen\n- Functionele onderdelen in PLA/PETG rond ${city}`
  const sectors = mapSectorsNl(loc.sectors, city)
  const landmarks = getLandmarksNl(loc, city)
  const spotlight = buildSpotlightNl(loc, areas)

  const highlightsHeading = [
    `Lokale accenten voor ${city}`,
    `Wat je moet weten in ${city}`,
    `Leverdetails rond ${city}`,
  ][variant]
  const neighboursHeading = [
    `Nabijgelegen pagina's`,
    `Dichtbij gelegen locaties`,
    `Gerelateerde buurtpagina's`,
  ][variant]
  const spotlightHeading = [
    `Lokale spotlight`,
    `Spotlight rond ${city}`,
    `Klantenspotlight`,
  ][variant]
  const landmarksHeading = [
    `Plaatsen waar we vaak leveren rond ${city}`,
    `Landmarks in de buurt van ${city}`,
    `Locaties die we bedienen nabij ${city}`,
  ][variant]
  const sectorsHeading = [
    `Sectoren die we vaak helpen in ${city}`,
    `Teams die we ondersteunen rond ${city}`,
    `Sectorfocus nabij ${city}`,
  ][variant]
  const phrasesHeading = [
    `Veelgevraagde zoekopdrachten in ${city}`,
    `Wat vaak wordt gevraagd in ${city}`,
    `Typische aanvragen rond ${city}`,
  ][variant]

  return `## ${highlightsHeading}

- Dekking: ${areaText || city}; levering vanuit Herzele, afhalen kan.
- Typische opdrachten: prototypes, behuizingen en beugels voor teams in ${city}.
- Bestanden: STL/STEP met info over passing, afwerking en aantallen versnellen de offerte.
- Doorlooptijd: meestal enkele werkdagen; spoed mogelijk in overleg.

## ${neighboursHeading}
${neighbourLinks}

## ${spotlightHeading}
${spotlight.join("\n")}

## ${landmarksHeading}
${landmarks.map((l) => `- ${l}`).join("\n")}

## ${sectorsHeading}
${sectors.map((s) => `- ${s}`).join("\n")}

## ${phrasesHeading}
${phraseLines}`
}

function enrichAll() {
  const { locations, slugSet } = loadLocations()
  ensureDir(enDir)
  ensureDir(nlDir)

  for (const loc of locations) {
    const enPath = path.join(enDir, `${loc.slug}.md`)
    const nlPath = path.join(nlDir, `${loc.slug}.md`)
    if (fs.existsSync(enPath)) insertBlock(enPath, buildEnBlock(loc, slugSet))
    if (fs.existsSync(nlPath)) insertBlock(nlPath, buildNlBlock(loc, slugSet))
  }
  // eslint-disable-next-line no-console
  console.log(`Enriched ${locations.length} EN/NL location pages with local highlights.`)
}

enrichAll()
