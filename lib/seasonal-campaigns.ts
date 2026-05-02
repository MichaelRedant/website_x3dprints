export type Locale = "nl" | "en"

export type CarouselPhoto = {
  src: string
  alt: string
}

export type SeasonalCampaignKey =
  | "valentine"
  | "parents"
  | "back-to-school"
  | "winter"
  | "spring"
  | "summer"
  | "autumn"

type LocalizedText = {
  nl: string
  en: string
}

type SeasonalPhotoSource = {
  src: string
  alt: LocalizedText
}

type SeasonalCampaign = {
  key: SeasonalCampaignKey
  type: "season" | "holiday" | "commercial_moment"
  priority: number
  href: string
  label: LocalizedText
  keywords: string[]
  photos: SeasonalPhotoSource[]
  minimumHomeSeasonalSlots: number
  minimumLocationSeasonalSlots: number
  isActive: (date: Date) => boolean
}

export type ActiveSeasonalCampaign = {
  key: SeasonalCampaignKey
  type: SeasonalCampaign["type"]
  priority: number
  href: string
  label: string
  photos: CarouselPhoto[]
  minimumHomeSeasonalSlots: number
  minimumLocationSeasonalSlots: number
}

const DAY_MS = 86_400_000

const getNthWeekdayUtc = (year: number, month: number, weekday: number, n: number) => {
  const first = new Date(Date.UTC(year, month - 1, 1))
  const firstWeekday = first.getUTCDay()
  const offset = (weekday - firstWeekday + 7) % 7
  const day = 1 + offset + 7 * (n - 1)
  return new Date(Date.UTC(year, month - 1, day))
}

const isWithinWindow = (date: Date, target: Date, daysBefore: number, daysAfter: number) => {
  const diff = target.getTime() - date.getTime()
  return diff <= daysAfter * DAY_MS && diff >= -daysBefore * DAY_MS
}

const getMonth = (date: Date) => date.getUTCMonth() + 1
const getDay = (date: Date) => date.getUTCDate()
const after = (date: Date, month: number, day: number) => getMonth(date) > month || (getMonth(date) === month && getDay(date) >= day)
const before = (date: Date, month: number, day: number) => getMonth(date) < month || (getMonth(date) === month && getDay(date) <= day)

const campaigns: SeasonalCampaign[] = [
  {
    key: "valentine",
    type: "holiday",
    priority: 100,
    href: "/valentijn-3d-printen",
    label: { nl: "Valentijn cadeaus", en: "Valentine gifts" },
    keywords: ["valentijn", "valentine"],
    minimumHomeSeasonalSlots: 2,
    minimumLocationSeasonalSlots: 2,
    photos: [
      {
        src: "/images/portfolio/big%20valentijn%20boy%20articulated.webp",
        alt: {
          nl: "3D geprinte articulated Valentijn figuur",
          en: "3D printed articulated Valentine figure",
        },
      },
      {
        src: "/images/portfolio/valentijn2.webp",
        alt: {
          nl: "3D geprint Valentijn duo decor",
          en: "3D printed Valentine duo decor",
        },
      },
      {
        src: "/images/portfolio/valentijn3.webp",
        alt: {
          nl: "3D geprinte Valentijn hart decoratie",
          en: "3D printed Valentine heart decoration",
        },
      },
    ],
    isActive: (date) => (getMonth(date) === 1 && getDay(date) >= 15) || (getMonth(date) === 2 && getDay(date) <= 16),
  },
  {
    key: "parents",
    type: "holiday",
    priority: 90,
    href: "/blog/3d-printen-vaderdag-moederdag",
    label: { nl: "Vaderdag & Moederdag", en: "Mother's Day & Father's Day" },
    keywords: ["vaderdag", "moederdag", "father", "mother"],
    minimumHomeSeasonalSlots: 2,
    minimumLocationSeasonalSlots: 2,
    photos: [
      {
        src: "/images/portfolio/vaderdag.webp",
        alt: {
          nl: "3D geprinte Vaderdag sleutelhangers",
          en: "3D printed Father's Day keychains",
        },
      },
      {
        src: "/images/portfolio/vaderdag2.webp",
        alt: {
          nl: "3D geprinte Vaderdag desk items",
          en: "3D printed Father's Day desk items",
        },
      },
      {
        src: "/images/portfolio/vaderdag3.webp",
        alt: {
          nl: "3D geprint gepersonaliseerd Vaderdag cadeau",
          en: "3D printed personalized Father's Day gift",
        },
      },
      {
        src: "/images/portfolio/moederdag.webp",
        alt: {
          nl: "3D geprint Moederdag cadeau in Silk PLA",
          en: "3D printed Mother's Day gift in Silk PLA",
        },
      },
      {
        src: "/images/portfolio/moederdag2.webp",
        alt: {
          nl: "3D geprinte Moederdag organizer set",
          en: "3D printed Mother's Day organizer set",
        },
      },
      {
        src: "/images/portfolio/moederdag3.webp",
        alt: {
          nl: "3D geprint Moederdag naamcadeau",
          en: "3D printed Mother's Day name gift",
        },
      },
    ],
    isActive: (date) => {
      const year = date.getUTCFullYear()
      const mothersDay = getNthWeekdayUtc(year, 5, 0, 2)
      const fathersDay = getNthWeekdayUtc(year, 6, 0, 2)
      return isWithinWindow(date, mothersDay, 21, 1) || isWithinWindow(date, fathersDay, 21, 1)
    },
  },
  {
    key: "back-to-school",
    type: "commercial_moment",
    priority: 80,
    href: "/blog/3d-printen-back-to-school",
    label: { nl: "Back to School", en: "Back to School" },
    keywords: ["back2school", "back-to-school"],
    minimumHomeSeasonalSlots: 2,
    minimumLocationSeasonalSlots: 2,
    photos: [
      {
        src: "/images/portfolio/back2school%20(1).webp",
        alt: {
          nl: "Back to School set met pennenhouder en naamplaat",
          en: "Back to School set with pen holder and nameplate",
        },
      },
      {
        src: "/images/portfolio/back2school%20(2).webp",
        alt: {
          nl: "Gepersonaliseerde bureau organizer voor school",
          en: "Personalized desk organizer for school",
        },
      },
      {
        src: "/images/portfolio/back2school%20(3).webp",
        alt: {
          nl: "Back to School kit met labels en houder",
          en: "Back to School kit with labels and holder",
        },
      },
    ],
    isActive: (date) => getMonth(date) === 8 || getMonth(date) === 9,
  },
  {
    key: "winter",
    type: "season",
    priority: 60,
    href: "/blog/3d-printen-winter-kerst-nieuwjaar",
    label: { nl: "Winter, Kerst & Nieuwjaar", en: "Winter & holidays" },
    keywords: ["xmas", "kerst", "winter", "christmas", "newyear", "nieuwjaar", "holiday"],
    minimumHomeSeasonalSlots: 2,
    minimumLocationSeasonalSlots: 2,
    photos: [
      { src: "/images/portfolio/XmasBalls.webp", alt: { nl: "3D geprinte kerstdecor set 1", en: "3D printed Christmas decor set 1" } },
      { src: "/images/portfolio/XmasBalls2.webp", alt: { nl: "3D geprinte kerstdecor set 2", en: "3D printed Christmas decor set 2" } },
      { src: "/images/portfolio/XmasDoorTrim.webp", alt: { nl: "3D geprinte kerstdecor set 3", en: "3D printed Christmas decor set 3" } },
      { src: "/images/portfolio/XmasScene.webp", alt: { nl: "3D geprinte kerstdecor set 4", en: "3D printed Christmas decor set 4" } },
      { src: "/images/portfolio/xmasTree.webp", alt: { nl: "3D geprinte kerstdecor set 5", en: "3D printed Christmas decor set 5" } },
      { src: "/images/portfolio/IMG-20241106-WA0000.webp", alt: { nl: "3D geprinte kerstdecor set 6", en: "3D printed Christmas decor set 6" } },
    ],
    isActive: (date) => after(date, 11, 11) || before(date, 2, 10),
  },
  {
    key: "spring",
    type: "season",
    priority: 50,
    href: "/blog/3d-printen-lente-pasen",
    label: { nl: "Lente & Pasen", en: "Spring & Easter" },
    keywords: ["easter", "pasen", "lente", "spring"],
    minimumHomeSeasonalSlots: 2,
    minimumLocationSeasonalSlots: 2,
    photos: [
      { src: "/images/portfolio/easter1.webp", alt: { nl: "3D geprinte paasdecor set met eieren en hangers", en: "3D printed Easter decor set with eggs and ornaments" } },
      { src: "/images/portfolio/Easter2.webp", alt: { nl: "3D geprinte paashangers in pastelkleuren", en: "3D printed pastel Easter ornaments" } },
      { src: "/images/portfolio/Easter3.webp", alt: { nl: "3D geprinte paasornamenten voor tafeldecoratie", en: "3D printed Easter table decor ornaments" } },
      { src: "/images/portfolio/Easter4.webp", alt: { nl: "3D geprinte translucent paaslantaarn", en: "3D printed translucent Easter lantern" } },
      { src: "/images/portfolio/Easter5.webp", alt: { nl: "3D geprinte combinatie van paasdecor en seizoensdisplay", en: "3D printed Easter decor and seasonal display combination" } },
    ],
    isActive: (date) => after(date, 2, 11) && before(date, 5, 10),
  },
  {
    key: "summer",
    type: "season",
    priority: 40,
    href: "/blog/3d-printen-zomer",
    label: { nl: "Zomer decor", en: "Summer decor" },
    keywords: ["summer", "zomer"],
    minimumHomeSeasonalSlots: 2,
    minimumLocationSeasonalSlots: 2,
    photos: [
      { src: "/images/portfolio/summer1.webp", alt: { nl: "3D geprinte zomerdecor set 1", en: "3D printed summer decor set 1" } },
      { src: "/images/portfolio/Summer2.webp", alt: { nl: "3D geprinte zomerdecor set 2", en: "3D printed summer decor set 2" } },
      { src: "/images/portfolio/Summer3.webp", alt: { nl: "3D geprinte zomerdecor set 3", en: "3D printed summer decor set 3" } },
      { src: "/images/portfolio/Summer4.webp", alt: { nl: "3D geprinte zomerdecor set 4", en: "3D printed summer decor set 4" } },
      { src: "/images/portfolio/Summer5.webp", alt: { nl: "3D geprinte zomerdecor set 5", en: "3D printed summer decor set 5" } },
      { src: "/images/portfolio/Summer6.webp", alt: { nl: "3D geprinte zomerdecor set 6", en: "3D printed summer decor set 6" } },
      { src: "/images/portfolio/Summer7.webp", alt: { nl: "3D geprinte zomerdecor set 7", en: "3D printed summer decor set 7" } },
    ],
    isActive: (date) => after(date, 5, 11) && before(date, 9, 10),
  },
  {
    key: "autumn",
    type: "season",
    priority: 30,
    href: "/blog/3d-printen-herfst-halloween",
    label: { nl: "Herfst & Halloween", en: "Autumn & Halloween" },
    keywords: ["halloween", "herfst", "autumn", "fall"],
    minimumHomeSeasonalSlots: 2,
    minimumLocationSeasonalSlots: 2,
    photos: [
      { src: "/images/portfolio/halloween1.webp", alt: { nl: "3D geprinte Halloween decor set 1", en: "3D printed Halloween decor set 1" } },
      { src: "/images/portfolio/Halloween2.webp", alt: { nl: "3D geprinte Halloween decor set 2", en: "3D printed Halloween decor set 2" } },
      { src: "/images/portfolio/Halloween3.webp", alt: { nl: "3D geprinte Halloween decor set 3", en: "3D printed Halloween decor set 3" } },
      { src: "/images/portfolio/Halloween4.webp", alt: { nl: "3D geprinte Halloween decor set 4", en: "3D printed Halloween decor set 4" } },
      { src: "/images/portfolio/Halloween5.webp", alt: { nl: "3D geprinte Halloween decor set 5", en: "3D printed Halloween decor set 5" } },
      { src: "/images/portfolio/Halloween6.webp", alt: { nl: "3D geprinte Halloween decor set 6", en: "3D printed Halloween decor set 6" } },
    ],
    isActive: (date) => after(date, 9, 11) && before(date, 11, 10),
  },
]

const campaignMap = new Map(campaigns.map((campaign) => [campaign.key, campaign]))

const localizePhotos = (photos: SeasonalPhotoSource[], locale: Locale): CarouselPhoto[] =>
  photos.map((photo) => ({
    src: photo.src,
    alt: photo.alt[locale],
  }))

const normalizeOverride = (value?: string | null): SeasonalCampaignKey | null => {
  if (!value) return null
  const normalized = value.trim().toLowerCase()
  if (!normalized || normalized === "auto") return null
  if (!campaignMap.has(normalized as SeasonalCampaignKey)) return null
  return normalized as SeasonalCampaignKey
}

export const SEASONAL_CAMPAIGN_KEYS = campaigns.map((campaign) => campaign.key)

export const getSeasonalOverride = (value = process.env.SEASONAL_OVERRIDE) => normalizeOverride(value)

export function getActiveSeasonalCampaign({
  locale,
  date = new Date(),
  override = process.env.SEASONAL_OVERRIDE,
}: {
  locale: Locale
  date?: Date
  override?: string | null
}): ActiveSeasonalCampaign {
  const overrideKey = normalizeOverride(override)
  const overrideCampaign = overrideKey ? campaignMap.get(overrideKey) : null

  const resolvedCampaign =
    overrideCampaign ??
    [...campaigns]
      .filter((campaign) => campaign.isActive(date))
      .sort((left, right) => right.priority - left.priority)[0] ??
    campaignMap.get("autumn")

  if (!resolvedCampaign) {
    throw new Error("No seasonal campaign could be resolved.")
  }

  return {
    key: resolvedCampaign.key,
    type: resolvedCampaign.type,
    priority: resolvedCampaign.priority,
    href: resolvedCampaign.href,
    label: resolvedCampaign.label[locale],
    photos: localizePhotos(resolvedCampaign.photos, locale),
    minimumHomeSeasonalSlots: resolvedCampaign.minimumHomeSeasonalSlots,
    minimumLocationSeasonalSlots: resolvedCampaign.minimumLocationSeasonalSlots,
  }
}

export const getOutOfSeasonPhotoSources = (activeCampaignKey: SeasonalCampaignKey) => {
  const outOfSeasonSources = new Set<string>()
  for (const campaign of campaigns) {
    if (campaign.key === activeCampaignKey) continue
    for (const photo of campaign.photos) {
      outOfSeasonSources.add(photo.src.toLowerCase())
    }
  }
  return outOfSeasonSources
}

export const isOutOfSeasonByKeyword = (photoSrc: string, activeCampaignKey: SeasonalCampaignKey) => {
  const normalizedSrc = decodeURIComponent(photoSrc).toLowerCase()
  const matchedCampaigns = campaigns
    .filter((campaign) => campaign.keywords.some((keyword) => normalizedSrc.includes(keyword)))
    .map((campaign) => campaign.key)

  if (matchedCampaigns.length === 0) {
    return false
  }

  return !matchedCampaigns.includes(activeCampaignKey)
}
