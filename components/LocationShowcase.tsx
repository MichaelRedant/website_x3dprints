import Link from "next/link"
import { existsSync, readdirSync, statSync } from "node:fs"
import path from "node:path"

import AutoCarousel from "@/components/AutoCarousel"
import Reveal from "@/components/Reveal"

type Locale = "nl" | "en"

type CarouselPhoto = {
  src: string
  alt: string
}

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

const SEASONAL_CAROUSEL_PHOTOS: Record<string, CarouselPhoto[]> = {
  "/valentijn-3d-printen": [
    {
      src: "/images/portfolio/big%20valentijn%20boy%20articulated.webp",
      alt: "3D geprinte articulated Valentijn figuur",
    },
  ],
  "/blog/3d-printen-vaderdag-moederdag": [
    { src: "/images/portfolio/vaderdag.webp", alt: "3D geprinte Vaderdag sleutelhangers" },
    { src: "/images/portfolio/vaderdag2.webp", alt: "3D geprinte Vaderdag desk items" },
    { src: "/images/portfolio/vaderdag3.webp", alt: "3D geprint gepersonaliseerd Vaderdag cadeau" },
    { src: "/images/portfolio/moederdag.webp", alt: "3D geprint Moederdag cadeau in Silk PLA" },
    { src: "/images/portfolio/moederdag2.webp", alt: "3D geprinte Moederdag organizer set" },
    { src: "/images/portfolio/moederdag3.webp", alt: "3D geprint Moederdag naamcadeau" },
  ],
  "/blog/3d-printen-back-to-school": [
    { src: "/images/portfolio/back2school%20(1).webp", alt: "Back to School set met pennenhouder en naamplaat" },
    { src: "/images/portfolio/back2school%20(2).webp", alt: "Gepersonaliseerde bureau organizer voor school" },
    { src: "/images/portfolio/back2school%20(3).webp", alt: "Back to School kit met labels en houder" },
  ],
  "/blog/3d-printen-winter-kerst-nieuwjaar": [
    { src: "/images/portfolio/XmasBalls.webp", alt: "3D geprinte kerstdecor set 1" },
    { src: "/images/portfolio/XmasBalls2.webp", alt: "3D geprinte kerstdecor set 2" },
    { src: "/images/portfolio/XmasDoorTrim.webp", alt: "3D geprinte kerstdecor set 3" },
    { src: "/images/portfolio/XmasScene.webp", alt: "3D geprinte kerstdecor set 4" },
    { src: "/images/portfolio/xmasTree.webp", alt: "3D geprinte kerstdecor set 5" },
    { src: "/images/portfolio/IMG-20241106-WA0000.webp", alt: "3D geprinte kerstdecor set 6" },
  ],
  "/blog/3d-printen-lente-pasen": [
    { src: "/images/portfolio/easter1.webp", alt: "3D geprinte paasdecor set met eieren en hangers" },
    { src: "/images/portfolio/Easter2.webp", alt: "3D geprinte paashangers in pastelkleuren" },
    { src: "/images/portfolio/Easter3.webp", alt: "3D geprinte paasornamenten voor tafeldecoratie" },
    { src: "/images/portfolio/Easter4.webp", alt: "3D geprinte translucent paaslantaarn" },
    { src: "/images/portfolio/Easter5.webp", alt: "3D geprinte combinatie van paasdecor en seizoensdisplay" },
  ],
  "/blog/3d-printen-zomer": [
    { src: "/images/portfolio/summer1.webp", alt: "3D geprinte zomerdecor set 1" },
    { src: "/images/portfolio/Summer2.webp", alt: "3D geprinte zomerdecor set 2" },
    { src: "/images/portfolio/Summer3.webp", alt: "3D geprinte zomerdecor set 3" },
    { src: "/images/portfolio/Summer4.webp", alt: "3D geprinte zomerdecor set 4" },
    { src: "/images/portfolio/Summer5.webp", alt: "3D geprinte zomerdecor set 5" },
    { src: "/images/portfolio/Summer6.webp", alt: "3D geprinte zomerdecor set 6" },
    { src: "/images/portfolio/Summer7.webp", alt: "3D geprinte zomerdecor set 7" },
  ],
  "/blog/3d-printen-herfst-halloween": [
    { src: "/images/portfolio/halloween1.webp", alt: "3D geprinte Halloween decor set 1" },
    { src: "/images/portfolio/Halloween2.webp", alt: "3D geprinte Halloween decor set 2" },
    { src: "/images/portfolio/Halloween3.webp", alt: "3D geprinte Halloween decor set 3" },
    { src: "/images/portfolio/Halloween4.webp", alt: "3D geprinte Halloween decor set 4" },
    { src: "/images/portfolio/Halloween5.webp", alt: "3D geprinte Halloween decor set 5" },
    { src: "/images/portfolio/Halloween6.webp", alt: "3D geprinte Halloween decor set 6" },
  ],
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

const getOutOfSeasonPhotoSources = (activeSeasonHref: string) => {
  const outOfSeasonSources = new Set<string>()
  for (const [seasonHref, seasonPhotos] of Object.entries(SEASONAL_CAROUSEL_PHOTOS)) {
    if (seasonHref === activeSeasonHref) continue
    for (const photo of seasonPhotos) {
      outOfSeasonSources.add(photo.src.toLowerCase())
    }
  }
  return outOfSeasonSources
}

const getSeasonKeyFromHref = (seasonHref: string) => {
  if (seasonHref === "/valentijn-3d-printen") return "valentine"
  if (seasonHref === "/blog/3d-printen-vaderdag-moederdag") return "parents"
  if (seasonHref === "/blog/3d-printen-back-to-school") return "back-to-school"
  if (seasonHref === "/blog/3d-printen-winter-kerst-nieuwjaar") return "winter"
  if (seasonHref === "/blog/3d-printen-lente-pasen") return "spring"
  if (seasonHref === "/blog/3d-printen-zomer") return "summer"
  return "autumn"
}

const SEASON_KEYWORDS: Record<string, string[]> = {
  valentine: ["valentijn", "valentine"],
  parents: ["vaderdag", "moederdag", "father", "mother"],
  "back-to-school": ["back2school", "back-to-school"],
  winter: ["xmas", "kerst", "winter", "christmas", "newyear", "nieuwjaar", "holiday"],
  spring: ["easter", "pasen", "lente", "spring"],
  summer: ["summer", "zomer"],
  autumn: ["halloween", "herfst", "autumn", "fall"],
}

const isOutOfSeasonByKeyword = (photoSrc: string, activeSeasonHref: string) => {
  const normalizedSrc = decodeURIComponent(photoSrc).toLowerCase()
  const activeSeasonKey = getSeasonKeyFromHref(activeSeasonHref)
  const matchedSeasons = Object.entries(SEASON_KEYWORDS)
    .filter(([, keywords]) => keywords.some((keyword) => normalizedSrc.includes(keyword)))
    .map(([seasonKey]) => seasonKey)

  if (matchedSeasons.length === 0) {
    return false
  }
  return !matchedSeasons.includes(activeSeasonKey)
}

function getSeasonCta(date: Date, isEn: boolean) {
  const MS_IN_DAY = 86_400_000
  const isWithinWindow = (target: Date, daysBefore: number, daysAfter: number) => {
    const diff = target.getTime() - date.getTime()
    return diff <= daysAfter * MS_IN_DAY && diff >= -daysBefore * MS_IN_DAY
  }
  const getNthWeekday = (month: number, weekday: number, n: number) => {
    const first = new Date(Date.UTC(date.getUTCFullYear(), month - 1, 1))
    const firstWeekday = first.getUTCDay()
    const offset = (weekday - firstWeekday + 7) % 7
    const day = 1 + offset + 7 * (n - 1)
    return new Date(Date.UTC(date.getUTCFullYear(), month - 1, day))
  }

  const month = date.getUTCMonth() + 1
  const day = date.getUTCDate()
  const after = (m: number, d: number) => month > m || (month === m && day >= d)
  const before = (m: number, d: number) => month < m || (month === m && day <= d)
  const mothersDay = getNthWeekday(5, 0, 2)
  const fathersDay = getNthWeekday(6, 0, 2)

  const isValentijnWindow = (month === 1 && day >= 15) || (month === 2 && day <= 16)
  const isParentsWindow =
    isWithinWindow(mothersDay, 21, 1) || isWithinWindow(fathersDay, 21, 1)
  const isBackToSchoolWindow = month === 8 || month === 9
  if (isValentijnWindow) {
    return { label: isEn ? "Valentine gifts" : "Valentijn cadeaus", href: "/valentijn-3d-printen" }
  }
  if (isParentsWindow) {
    return { label: isEn ? "Mother's Day & Father's Day" : "Vaderdag & Moederdag", href: "/blog/3d-printen-vaderdag-moederdag" }
  }
  if (isBackToSchoolWindow) {
    return { label: "Back to School", href: "/blog/3d-printen-back-to-school" }
  }
  if (after(11, 11) || before(2, 10)) {
    return { label: isEn ? "Winter & holidays" : "Winter, Kerst & Nieuwjaar", href: "/blog/3d-printen-winter-kerst-nieuwjaar" }
  }
  if (after(2, 11) && before(5, 10)) {
    return { label: isEn ? "Spring & Easter" : "Lente & Pasen", href: "/blog/3d-printen-lente-pasen" }
  }
  if (after(5, 11) && before(9, 10)) {
    return { label: isEn ? "Summer decor" : "Zomer decor", href: "/blog/3d-printen-zomer" }
  }
  return { label: isEn ? "Autumn & Halloween" : "Herfst & Halloween", href: "/blog/3d-printen-herfst-halloween" }
}

export default function LocationShowcase({ locale, city }: { locale: Locale; city: string }) {
  const isEn = locale === "en"
  const localize = (href: string) => (isEn ? `/en${href}` : href)
  const seasonCta = getSeasonCta(new Date(), isEn)
  const outOfSeasonPhotoSources = getOutOfSeasonPhotoSources(seasonCta.href)
  const nonSeasonalPortfolioPhotos = latestPortfolioPhotos.filter(
    (photo) =>
      !outOfSeasonPhotoSources.has(photo.src.toLowerCase()) &&
      !isOutOfSeasonByKeyword(photo.src, seasonCta.href),
  )
  const seasonCarouselPhotos = SEASONAL_CAROUSEL_PHOTOS[seasonCta.href] ?? []
  const fixedPriorityPortfolioPhotos = getFixedPriorityPortfolioPhotos(isEn)
  const homeCarouselPhotos = mergePhotosWithoutDuplicates([
    ...seasonCarouselPhotos,
    ...fixedPriorityPortfolioPhotos,
    ...nonSeasonalPortfolioPhotos,
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
            newCount={Math.min(seasonCarouselPhotos.length, homeCarouselPhotos.length)}
            premium
            itemClass="aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/3]"
          />
        </Reveal>
      </div>
    </section>
  )
}
