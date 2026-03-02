export type CaseStudyEntry = {
  id: string
  href: string
  enHref: string
  title: { nl: string; en: string }
  summary: { nl: string; en: string }
  sector: { nl: string; en: string }
  materials: string[]
  publishedOn: string
  kpi: { nl: string; en: string }
  status?: "draft" | "scheduled" | "published"
  publishAt?: string
}

export type LocalizedCaseStudy = {
  id: string
  href: string
  title: string
  summary: string
  sector: string
  materials: string[]
  publishedOn: string
  kpi: string
}

export type CasePipelineEntry = {
  id: string
  title: { nl: string; en: string }
  targetMonth: string
  focusKeyword: { nl: string; en: string }
  angle: { nl: string; en: string }
}

export type LocalizedCasePipelineEntry = {
  id: string
  title: string
  targetMonth: string
  focusKeyword: string
  angle: string
}

export type LiveCaseDetailRoute = {
  id: string
  slug: string
  href: string
  enHref: string
  publishedOn: string
}

export const CASE_STUDIES: CaseStudyEntry[] = [
  {
    id: "selectieve-val-aziatische-hoornaar-sint-lievens-houtem",
    href: "/cases/selectieve-val-aziatische-hoornaar-sint-lievens-houtem",
    enHref: "/en/cases/selectieve-val-aziatische-hoornaar-sint-lievens-houtem",
    title: {
      nl: "Case: selectieve val tegen Aziatische hoornaar",
      en: "Case: selective trap against the Asian hornet",
    },
    summary: {
      nl: "Lokale case met #9520KLIMAAT: betaalbare en schaalbare PETG onderdelen voor een burgeractie in Sint-Lievens-Houtem.",
      en: "Local impact case with #9520KLIMAAT: scalable PETG parts for a citizen action in Sint-Lievens-Houtem.",
    },
    sector: { nl: "Lokale impact", en: "Local impact" },
    materials: ["PETG Matte"],
    publishedOn: "2026-02-01",
    kpi: { nl: "Lage instapkost, snelle batch-opvolging", en: "Low entry price, fast batch cadence" },
    status: "published",
    publishAt: "2026-02-01T08:00:00+01:00",
  },
  {
    id: "octopus-accountancy-3d-print-goodies",
    href: "/cases/octopus-accountancy-3d-print-goodies",
    enHref: "/en/cases/octopus-accountancy-3d-print-goodies",
    title: {
      nl: "Case: Octopus x X3DPrints event-goodies",
      en: "Case: Octopus x X3DPrints event goodies",
    },
    summary: {
      nl: "B2B branding case met mascottes, badges en activatiemateriaal voor events.",
      en: "B2B branding case with mascots, badges and event activation props.",
    },
    sector: { nl: "B2B marketing", en: "B2B marketing" },
    materials: ["PLA Matte", "PLA Silk+"],
    publishedOn: "2026-03-10",
    kpi: { nl: "Snelle event doorlooptijd met consistente branding", en: "Fast event lead time with consistent branding" },
    status: "scheduled",
    publishAt: "2026-03-10T08:00:00+01:00",
  },
  {
    id: "3d-geprinte-platen-nasiam",
    href: "/cases/3d-geprinte-platen-nasiam",
    enHref: "/en/cases/3d-geprinte-platen-nasiam",
    title: {
      nl: "Case: 3D-geprinte platen voor NaSiam",
      en: "Case: 3D printed signs for NaSiam",
    },
    summary: {
      nl: "Herbruikbare brandingplaten met QR-flow, ontworpen voor salongebruik en lokale zichtbaarheid.",
      en: "Reusable branding signs with QR flow, built for salon usage and local visibility.",
    },
    sector: { nl: "Retail service", en: "Retail service" },
    materials: ["PLA Matte", "PETG"],
    publishedOn: "2026-03-17",
    kpi: { nl: "Herbruikbare assets voor online -> offline traffic", en: "Reusable assets for online to offline traffic" },
    status: "scheduled",
    publishAt: "2026-03-17T08:00:00+01:00",
  },
  {
    id: "prototyping-kleine-reeksen-3d-printen",
    href: "/cases/prototyping-kleine-reeksen-3d-printen",
    enHref: "/en/cases/prototyping-kleine-reeksen-3d-printen",
    title: {
      nl: "B2B flow: prototyping en kleine reeksen",
      en: "B2B flow: prototyping and short runs",
    },
    summary: {
      nl: "Praktische caseflow van eerste mock-up naar functionele validatie en pilot-run.",
      en: "Practical workflow from first mock-up to functional validation and pilot run.",
    },
    sector: { nl: "Productontwikkeling", en: "Product development" },
    materials: ["PLA Matte", "PETG", "TPU"],
    publishedOn: "2026-03-24",
    kpi: { nl: "Kortere iteratielus tussen ontwerp en test", en: "Shorter loop between design and validation" },
    status: "scheduled",
    publishAt: "2026-03-24T08:00:00+01:00",
  },
  {
    id: "retail-pos-3d-printen",
    href: "/cases/retail-pos-3d-printen",
    enHref: "/en/cases/retail-pos-3d-printen",
    title: {
      nl: "Retail POS: displays en winkelmateriaal",
      en: "Retail POS: displays and store assets",
    },
    summary: {
      nl: "Casegerichte gids voor snelle validatie in schap- en toonbankcontext.",
      en: "Case-focused guide for fast validation in shelf and counter context.",
    },
    sector: { nl: "Retail POS", en: "Retail POS" },
    materials: ["PLA Matte", "PETG"],
    publishedOn: "2026-04-07",
    kpi: { nl: "Snelle pilot-runs voor meerdere locaties", en: "Fast pilot runs across multiple locations" },
    status: "scheduled",
    publishAt: "2026-04-07T08:00:00+01:00",
  },
  {
    id: "kapot-onderdeel-laten-printen",
    href: "/cases/kapot-onderdeel-laten-printen",
    enHref: "/en/cases/kapot-onderdeel-laten-printen",
    title: {
      nl: "Repair caseflow: kapot onderdeel laten printen",
      en: "Repair workflow: print a broken part",
    },
    summary: {
      nl: "Transactionele repair-intent caseflow met intake, fit-check en materiaalkeuze.",
      en: "Transactional repair-intent flow with intake, fit checks and material selection.",
    },
    sector: { nl: "Repair", en: "Repair" },
    materials: ["PETG", "TPU", "PLA Matte"],
    publishedOn: "2026-04-21",
    kpi: { nl: "Minder downtime met snelle vervangonderdelen", en: "Lower downtime with fast replacement parts" },
    status: "scheduled",
    publishAt: "2026-04-21T08:00:00+01:00",
  },
]

export const CASE_PIPELINE: CasePipelineEntry[] = [
  {
    id: "b2b-fixture-assembly-line",
    title: {
      nl: "Case: montagefixture voor kleine productielijn",
      en: "Case: assembly fixture for a small production line",
    },
    targetMonth: "2026-03",
    focusKeyword: {
      nl: "3d print fixture laten maken",
      en: "3d printed fixture service",
    },
    angle: {
      nl: "Uitdaging -> materiaalkeuze -> toleranties -> tijdswinst op lijn",
      en: "Challenge -> material choice -> tolerances -> throughput gain",
    },
  },
  {
    id: "retail-window-activation",
    title: {
      nl: "Case: etalage activatie met modulaire displayset",
      en: "Case: window activation with modular display kit",
    },
    targetMonth: "2026-03",
    focusKeyword: {
      nl: "retail display 3d printen",
      en: "retail display 3d printing",
    },
    angle: {
      nl: "Concept -> test in 1 winkel -> pilot naar meerdere locaties",
      en: "Concept -> single-store test -> multi-location pilot",
    },
  },
  {
    id: "school-stem-batch",
    title: {
      nl: "Case: STEM batch voor secundaire school",
      en: "Case: STEM batch for secondary school",
    },
    targetMonth: "2026-04",
    focusKeyword: {
      nl: "3d printen voor scholen",
      en: "3d printing for schools",
    },
    angle: {
      nl: "Lesdoel -> veilige materiaalkeuze -> klasbatch -> feedbackcyclus",
      en: "Learning objective -> safe material choice -> class batch -> feedback loop",
    },
  },
  {
    id: "event-wayfinding-kit",
    title: {
      nl: "Case: event wayfinding kit voor beursstand",
      en: "Case: event wayfinding kit for trade show stand",
    },
    targetMonth: "2026-04",
    focusKeyword: {
      nl: "3d printen voor events",
      en: "3d printing for events",
    },
    angle: {
      nl: "Briefing -> signage onderdelen -> onsite montage -> hergebruik",
      en: "Briefing -> signage assets -> onsite mounting -> reuse",
    },
  },
  {
    id: "home-repair-series",
    title: {
      nl: "Case: reeks huishoud-repairs met vervangstukken",
      en: "Case: household repair series with replacement parts",
    },
    targetMonth: "2026-05",
    focusKeyword: {
      nl: "vervangstuk 3d printen",
      en: "3d printed replacement part",
    },
    angle: {
      nl: "Defectanalyse -> geometrieherstel -> testfit -> kleine reeks",
      en: "Defect analysis -> geometry rebuild -> test fit -> short run",
    },
  },
  {
    id: "tabletop-club-season-pack",
    title: {
      nl: "Case: tabletop club season pack",
      en: "Case: tabletop club season pack",
    },
    targetMonth: "2026-05",
    focusKeyword: {
      nl: "tabletop 3d printen op maat",
      en: "custom tabletop 3d printing",
    },
    angle: {
      nl: "Thema -> terrain set -> batchplanning -> community feedback",
      en: "Theme -> terrain set -> batch planning -> community feedback",
    },
  },
]

function parseCaseDate(value: string | undefined): Date | null {
  if (!value) return null
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return null
  return parsed
}

function getCaseLiveDate(entry: CaseStudyEntry): Date | null {
  return parseCaseDate(entry.publishAt) ?? parseCaseDate(entry.publishedOn)
}

export function isCaseStudyLive(entry: CaseStudyEntry, now: Date = new Date()) {
  if (entry.status === "draft") return false
  const liveDate = getCaseLiveDate(entry)
  if (!liveDate) return entry.status !== "scheduled"
  return liveDate.getTime() <= now.getTime()
}

type CaseStudySelectionOptions = {
  includeFuture?: boolean
  now?: Date
}

function sortCasesByDateDesc(a: CaseStudyEntry, b: CaseStudyEntry) {
  const aTime = getCaseLiveDate(a)?.getTime() ?? 0
  const bTime = getCaseLiveDate(b)?.getTime() ?? 0
  return bTime - aTime
}

export function getCaseStudies(options: CaseStudySelectionOptions = {}): CaseStudyEntry[] {
  const { includeFuture = false, now = new Date() } = options
  const scoped = includeFuture
    ? CASE_STUDIES.filter((entry) => entry.status !== "draft")
    : CASE_STUDIES.filter((entry) => isCaseStudyLive(entry, now))
  return [...scoped].sort(sortCasesByDateDesc)
}

export function getLocalizedCaseStudies(
  locale: "nl" | "en",
  options: CaseStudySelectionOptions = {},
): LocalizedCaseStudy[] {
  return getCaseStudies(options).map((entry) => ({
    id: entry.id,
    href: locale === "en" ? entry.enHref : entry.href,
    title: entry.title[locale],
    summary: entry.summary[locale],
    sector: entry.sector[locale],
    materials: entry.materials,
    publishedOn: entry.publishedOn,
    kpi: entry.kpi[locale],
  }))
}

export function getLiveCaseDetailRoutes(now: Date = new Date()): LiveCaseDetailRoute[] {
  return getCaseStudies({ now })
    .filter((entry) => entry.href.startsWith("/cases/") && entry.enHref.startsWith("/en/cases/"))
    .map((entry) => ({
      id: entry.id,
      slug: entry.href.replace(/^\/cases\//, ""),
      href: entry.href,
      enHref: entry.enHref,
      publishedOn: entry.publishedOn,
    }))
}

export function getCaseStudyBySlug(slug: string): CaseStudyEntry | null {
  return (
    CASE_STUDIES.find(
      (entry) => entry.href === `/cases/${slug}` || entry.enHref === `/en/cases/${slug}`,
    ) ?? null
  )
}

export function getLocalizedCasePipeline(locale: "nl" | "en"): LocalizedCasePipelineEntry[] {
  return CASE_PIPELINE.map((entry) => ({
    id: entry.id,
    title: entry.title[locale],
    targetMonth: entry.targetMonth,
    focusKeyword: entry.focusKeyword[locale],
    angle: entry.angle[locale],
  }))
}
