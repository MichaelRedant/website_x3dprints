import { promises as fs } from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const APP_DIR = path.join(ROOT, "app")

const INTERNAL_SLOT_RE = /["'`](\/(?:en\/)?(?:materials|services|blog|segments|portfolio|pricing|contact|viewer|locaties)[^"'`\s)]*)["'`]/g

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map((entry) => {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) return walk(fullPath)
      return [fullPath]
    }),
  )
  return files.flat()
}

function relative(filePath) {
  return path.relative(ROOT, filePath).replaceAll("\\", "/")
}

function hasMetadataContract(content) {
  return /export\s+const\s+metadata\s*:|export\s+async\s+function\s+generateMetadata\s*\(/.test(content)
}

function uniqueInternalSlots(content) {
  const matches = [...content.matchAll(INTERNAL_SLOT_RE)].map((m) => m[1])
  return [...new Set(matches)]
}

function isSegmentDetailFile(relPath) {
  if (relPath.startsWith("app/segments/") && relPath.endsWith("/page.tsx")) {
    return !relPath.endsWith("app/segments/page.tsx")
  }

  return relPath === "app/en/(pages)/segments/[slug]/page.tsx"
}

function isBlogDetailFile(relPath) {
  const isNlBlog = relPath.startsWith("app/(pages)/blog/") && relPath.endsWith("/page.tsx")
  const isEnBlog = relPath.startsWith("app/en/(pages)/blog/") && relPath.endsWith("/page.tsx")

  if (!isNlBlog && !isEnBlog) return false
  return !relPath.endsWith("/blog/page.tsx") && !relPath.endsWith("/blog/layout.tsx")
}

function isEnglishBlogWrapper(content) {
  return /from\s+["']@\/app\/\(pages\)\/blog\//.test(content) && /EN_METADATA/.test(content)
}

function runSegmentChecks(fileRef, content, failures, warnings) {
  if (!hasMetadataContract(content)) {
    failures.push(`${fileRef}: missing metadata contract (metadata or generateMetadata)`)
  }

  const hasFaqComponent = /<Faq\b/.test(content)
  const hasFaqSchema = /FAQPage/.test(content) || /\bbuildFaqPageSchema\s*\(/.test(content)
  if (!hasFaqComponent || !hasFaqSchema) {
    failures.push(`${fileRef}: segment template requires both <Faq /> and FAQPage JSON-LD`)
  }

  const faqQuestionCount = (content.match(/\bq\s*:/g) ?? []).length
  if (faqQuestionCount < 3) {
    failures.push(`${fileRef}: requires at least 3 FAQ items (found ${faqQuestionCount})`)
  }

  if (!/materials#material-suggestion-tool/.test(content)) {
    failures.push(`${fileRef}: missing CTA/link to /materials#material-suggestion-tool`)
  }

  if (!/contact\?material=/.test(content)) {
    failures.push(`${fileRef}: missing CTA/link to /contact?material=<slug>`)
  }

  const slots = uniqueInternalSlots(content)
  if (slots.length < 3) {
    failures.push(`${fileRef}: requires at least 3 internal link slots (found ${slots.length})`)
  }

  if (!slots.some((slot) => /\/(?:en\/)?blog\b/.test(slot) || /\/(?:en\/)?services\b/.test(slot))) {
    warnings.push(`${fileRef}: recommended to include at least one blog/services internal link slot`)
  }

  const geoCheckOptIn = fileRef === "app/en/(pages)/segments/[slug]/page.tsx" || /ContentTableOfContents/.test(content)
  if (geoCheckOptIn) {
    const hasToc = /ContentTableOfContents/.test(content)
    const hasLastUpdatedSignal = /lastUpdatedLabel|Laatst bijgewerkt|Last updated/.test(content)
    const hasSourcesSection = /<cite\b/.test(content) || /Bronnen en referenties|Sources and references/.test(content)

    if (!hasToc) {
      warnings.push(`${fileRef}: recommended GEO structure missing ContentTableOfContents with deep-link anchors`)
    }

    if (!hasLastUpdatedSignal) {
      warnings.push(`${fileRef}: recommended GEO structure missing visible last-updated signal`)
    }

    if (!hasSourcesSection) {
      warnings.push(`${fileRef}: recommended GEO structure missing sources section with cite links`)
    }
  }
}

function runBlogChecks(fileRef, content, failures, warnings) {
  if (!hasMetadataContract(content)) {
    failures.push(`${fileRef}: missing metadata contract (metadata or generateMetadata)`)
    return
  }

  if (isEnglishBlogWrapper(content)) {
    return
  }

  const slots = uniqueInternalSlots(content)
  if (slots.length === 0) {
    failures.push(`${fileRef}: missing internal link slots to key pages`)
    return
  }

  const hasCoreJourneyLink = slots.some((slot) =>
    /\/(?:en\/)?(materials|services|segments|contact|viewer|pricing)\b/.test(slot),
  )
  if (!hasCoreJourneyLink) {
    failures.push(`${fileRef}: requires at least one core-journey link (materials/services/segments/contact/viewer/pricing)`)
  }

  if (slots.length < 3) {
    warnings.push(`${fileRef}: has ${slots.length} internal link slot(s), recommended >= 3`)
  }
}

async function main() {
  const allTsxFiles = (await walk(APP_DIR)).filter((file) => file.endsWith(".tsx"))

  const failures = []
  const warnings = []
  let segmentsChecked = 0
  let blogsChecked = 0

  for (const file of allTsxFiles) {
    const fileRef = relative(file)
    const content = await fs.readFile(file, "utf8")

    if (isSegmentDetailFile(fileRef)) {
      segmentsChecked += 1
      runSegmentChecks(fileRef, content, failures, warnings)
      continue
    }

    if (isBlogDetailFile(fileRef)) {
      blogsChecked += 1
      runBlogChecks(fileRef, content, failures, warnings)
      continue
    }
  }

  if (failures.length > 0) {
    console.error("[seo:templates] FAILED - template contract violations:")
    for (const failure of failures) {
      console.error(`  - ${failure}`)
    }
    process.exit(1)
  }

  if (warnings.length > 0) {
    console.log(
      `[seo:templates] WARN - checked ${segmentsChecked} segment and ${blogsChecked} blog files (${warnings.length} recommendation warning(s))`,
    )
    for (const warning of warnings.slice(0, 20)) {
      console.log(`  - ${warning}`)
    }
    return
  }

  console.log(
    `[seo:templates] OK - checked ${segmentsChecked} segment and ${blogsChecked} blog files`,
  )
}

main().catch((error) => {
  console.error("[seo:templates] FAILED with unexpected error")
  console.error(error)
  process.exit(1)
})
