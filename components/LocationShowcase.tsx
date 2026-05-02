import Link from "next/link"
import { existsSync, readdirSync, statSync } from "node:fs"
import path from "node:path"

import AutoCarousel from "@/components/AutoCarousel"
import Reveal from "@/components/Reveal"
import {
  getActiveSeasonalCampaign,
  getOutOfSeasonPhotoSources,
  isOutOfSeasonByKeyword,
  type CarouselPhoto,
  type Locale,
} from "@/lib/seasonal-campaigns"

const hashString = (value: string) => {
  let hash = 0
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0
  }
  return hash
}

const deterministicOrderPhotos = (photos: CarouselPhoto[], seed: string) =>
  [...photos].sort((left, right) => {
    const leftRank = hashString(`${seed}:${left.src}`)
    const rightRank = hashString(`${seed}:${right.src}`)
    if (leftRank === rightRank) {
      return left.src.localeCompare(right.src)
    }
    return leftRank - rightRank
  })

const portfolioDir = path.join(process.cwd(), "public/images/portfolio")
const organizerSpotlightPhoto: CarouselPhoto = {
  src: "/images/organizers/modugrid/ModuGrid10.webp",
  alt: "Tool organizer op maat",
}
const FIXED_PRIORITY_PORTFOLIO_FILE_NAMES = new Set(["hoornaarval2.webp", "hornaarval.webp", "funko_image.webp"])
const FIXED_PRIORITY_CAROUSEL_SLOTS = [
  {
    files: ["hoornaarval2.webp", "hornaarval.webp"],
    altNl: "Selectieve hoornaarval in 3D print voor monitoring en bescherming",
    altEn: "Selective 3D printed hornet trap for monitoring and protection",
  },
  {
    files: ["funko_image.webp"],
    altNl: "3D geprinte Funko-style figuur op maat",
    altEn: "Custom 3D printed Funko-style figurine",
  },
] as const

const toPortfolioTitle = (value: string) =>
  value
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")

const latestPortfolioPhotos = (() => {
  try {
    const portfolioEntries = readdirSync(portfolioDir)
      .filter((file) => /\.webp$/i.test(file))
      .map((file) => ({ file, mtime: statSync(path.join(portfolioDir, file)).mtimeMs }))
      .sort((a, b) => b.mtime - a.mtime)

    const sanitizedPortfolioEntries = portfolioEntries.filter(({ file }) => {
      const normalizedFileName = file.toLowerCase()
      if (FIXED_PRIORITY_PORTFOLIO_FILE_NAMES.has(normalizedFileName)) return false
      if (normalizedFileName === "back2school (1).webp") return false
      return true
    })

    const portfolioPhotos = sanitizedPortfolioEntries
      .slice(0, 19)
      .map(({ file }, index) => {
        const baseLabel = file
          .replace(/\.[^.]+$/, "")
          .replace(/[-_]+/g, " ")
          .replace(/\s+/g, " ")
          .trim()
        const cleaned = baseLabel
          .replace(/^(afbeelding|image|img|foto)\s*/i, "")
          .replace(/^\d+$/, "")
          .trim()
        return {
          src: `/images/portfolio/${encodeURIComponent(file)}`,
          alt: cleaned ? toPortfolioTitle(cleaned) : `Portfolio ontwerp ${index + 1}`,
        }
      })

    return [organizerSpotlightPhoto, ...portfolioPhotos].slice(0, 20)
  } catch {
    return []
  }
})()

const getFixedPriorityPortfolioPhotos = (isEn: boolean) => {
  const photos: CarouselPhoto[] = []
  for (const slot of FIXED_PRIORITY_CAROUSEL_SLOTS) {
    const matchedFile = slot.files.find((fileName) => existsSync(path.join(portfolioDir, fileName)))
    if (!matchedFile) {
      continue
    }
    photos.push({
      src: `/images/portfolio/${encodeURIComponent(matchedFile)}`,
      alt: isEn ? slot.altEn : slot.altNl,
    })
  }
  return photos
}

const mergePhotosWithoutDuplicates = (photos: CarouselPhoto[]) => {
  const seen = new Set<string>()
  return photos.filter((photo) => {
    if (seen.has(photo.src)) {
      return false
    }
    seen.add(photo.src)
    return true
  })
}

export default function LocationShowcase({ locale, city }: { locale: Locale; city: string }) {
  const isEn = locale === "en"
  const localize = (href: string) => (locale === "en" ? `/en${href}` : href)
  const activeSeasonalCampaign = getActiveSeasonalCampaign({ date: new Date(), locale })
  const carouselSeed = `${locale}:${city.trim().toLowerCase()}:${activeSeasonalCampaign.href}`
  const outOfSeasonPhotoSources = getOutOfSeasonPhotoSources(activeSeasonalCampaign.key)
  const nonSeasonalPortfolioPhotos = latestPortfolioPhotos.filter(
    (photo) =>
      !outOfSeasonPhotoSources.has(photo.src.toLowerCase()) &&
      !isOutOfSeasonByKeyword(photo.src, activeSeasonalCampaign.key),
  )
  const seasonCarouselPhotos = deterministicOrderPhotos(
    activeSeasonalCampaign.photos,
    `${carouselSeed}:season`,
  )
  const featuredSeasonalPhotos = seasonCarouselPhotos.slice(0, activeSeasonalCampaign.minimumLocationSeasonalSlots)
  const remainingSeasonalPhotos = seasonCarouselPhotos.slice(activeSeasonalCampaign.minimumLocationSeasonalSlots)
  const fixedPriorityPortfolioPhotos = deterministicOrderPhotos(
    getFixedPriorityPortfolioPhotos(locale === "en"),
    `${carouselSeed}:priority`,
  )
  const diversifiedPortfolioPhotos = deterministicOrderPhotos(
    nonSeasonalPortfolioPhotos,
    `${carouselSeed}:portfolio`,
  )
  const homeCarouselPhotos = mergePhotosWithoutDuplicates([
    ...featuredSeasonalPhotos,
    ...fixedPriorityPortfolioPhotos,
    ...remainingSeasonalPhotos,
    ...diversifiedPortfolioPhotos,
  ]).slice(0, 20)

  const copy = isEn
    ? {
        kicker: "Recent 3D printing projects",
        title: `Showcase designs for 3D printing in ${city}`,
        body: `A representative mix of custom work, seasonal prints and functional parts for teams and makers in ${city}.`,
        cta: "View all 3D printing projects",
      }
    : {
        kicker: "Recente 3D print projecten",
        title: `Voorbeeldontwerpen voor 3D printen in ${city}`,
        body: `Een representatieve mix van maatwerk, seizoensprints en functionele onderdelen voor bedrijven en particulieren in ${city}.`,
        cta: "Bekijk alle 3D print projecten",
      }

  if (homeCarouselPhotos.length === 0) {
    return null
  }

  return (
    <section className="px-6 pb-14 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-indigo-600">{copy.kicker}</p>
            <h2 className="mt-2 text-balance text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {copy.title}
            </h2>
            <p className="mt-2 text-sm text-slate-600 sm:text-base">{copy.body}</p>
          </div>
          <Link
            href={localize("/portfolio")}
            className="inline-flex items-center justify-center rounded-xl border border-indigo-100/70 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
          >
            {copy.cta}
          </Link>
        </Reveal>
        <Reveal delay={0.08} className="mt-8">
          <AutoCarousel
            items={homeCarouselPhotos}
            speed={10}
            visibleCount={4}
            newCount={Math.min(featuredSeasonalPhotos.length, homeCarouselPhotos.length)}
            premium
            itemClass="aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/3]"
          />
        </Reveal>
      </div>
    </section>
  )
}
