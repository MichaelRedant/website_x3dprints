export type CrmTab = "contact" | "orders" | "stock" | "products"

export type LogEntry = {
  ts: string
  name: string
  email: string
  message: string
  quantity?: string
  material?: string
  quote?: string
  adminSent?: boolean
  confirmSent?: boolean
}

export type ReplyEntry = {
  ts: string
  to: string
  subject: string
  text?: string
  html?: string
  sent?: boolean
}

export type CrmStockItem = {
  id: string
  material: string
  color: string
  diameter: string
  availableGrams: number
  supplier?: string
  notes?: string
  updatedAt: string
}

export type CrmDashboardMetrics = {
  revenue7dEur: number
  revenuePrev7dEur: number
  revenue30dEur: number
  revenuePrev30dEur: number
  orders7d: number
  ordersPrev7d: number
  openOrders: number
  lowStockCount: number
  processedContacts: number
  totalContacts: number
}

export type OrderShippingMethod = {
  id: string
  labelNl: string
  labelEn: string
  priceEur: number
  active: boolean
}

export type OrderProductOption = {
  slug: string
  nameNl: string
  nameEn: string
  priceEur: number
  isLive: boolean
}

export type ProductEntry = {
  slug: string
  nameNl: string
  nameEn: string
  summaryNl: string
  summaryEn: string
  priceEur: number
  availability?: string | null
  tags?: string
  imageUrl: string
  imageAltNl: string
  imageAltEn: string
  leadTimeMin?: number | null
  leadTimeMax?: number | null
  isLive: boolean
  sortOrder: number
  isDeleted: boolean
}

export type ProductDraft = {
  slug: string
  nameNl: string
  nameEn: string
  summaryNl: string
  summaryEn: string
  priceEur: string
  availability: string
  tags: string
  imageUrl: string
  imageAltNl: string
  imageAltEn: string
  leadTimeMin: string
  leadTimeMax: string
  sortOrder: string
  isLive: boolean
  isDeleted: boolean
}

export type ProductPayload = {
  slug: string
  nameNl: string
  nameEn: string
  summaryNl: string
  summaryEn: string
  priceEur: number
  availability: string | null
  tags: string
  imageUrl: string
  imageAltNl: string
  imageAltEn: string
  leadTimeMin: number | null
  leadTimeMax: number | null
  sortOrder: number
  isLive: boolean
}

export type OrderItem = {
  productSlug?: string
  name: string
  quantity: number
  totalEur: number
}

export type OrderTimelineEntry = {
  ts: string
  status: string
  note?: string
}

export type OrderEntry = {
  id: string
  orderCode: string
  status: string
  email: string
  locale?: string
  shippingMethodId?: string
  source?: "mollie" | "manual"
  totalEur: number
  createdAt: string
  items: OrderItem[]
  itemsSummary?: string
  notes?: string
  archived?: boolean
  timeline?: OrderTimelineEntry[]
}

export const PRODUCT_AVAILABILITY_OPTIONS = [
  { value: "", label: "Geen" },
  { value: "InStock", label: "Op voorraad" },
  { value: "PreOrder", label: "Op bestelling" },
  { value: "LimitedAvailability", label: "Beperkt" },
  { value: "OutOfStock", label: "Niet beschikbaar" },
] as const

export const EMPTY_PRODUCT_DRAFT: ProductDraft = {
  slug: "",
  nameNl: "",
  nameEn: "",
  summaryNl: "",
  summaryEn: "",
  priceEur: "",
  availability: "",
  tags: "",
  imageUrl: "",
  imageAltNl: "",
  imageAltEn: "",
  leadTimeMin: "",
  leadTimeMax: "",
  sortOrder: "0",
  isLive: false,
  isDeleted: false,
}

export function toProductDraft(product: ProductEntry): ProductDraft {
  return {
    slug: product.slug,
    nameNl: product.nameNl,
    nameEn: product.nameEn,
    summaryNl: product.summaryNl,
    summaryEn: product.summaryEn,
    priceEur: Number.isFinite(product.priceEur) ? product.priceEur.toFixed(2) : "",
    availability: product.availability ?? "",
    tags: product.tags ?? "",
    imageUrl: product.imageUrl,
    imageAltNl: product.imageAltNl,
    imageAltEn: product.imageAltEn,
    leadTimeMin: product.leadTimeMin !== null && product.leadTimeMin !== undefined ? String(product.leadTimeMin) : "",
    leadTimeMax: product.leadTimeMax !== null && product.leadTimeMax !== undefined ? String(product.leadTimeMax) : "",
    sortOrder: Number.isFinite(product.sortOrder) ? String(product.sortOrder) : "0",
    isLive: product.isLive,
    isDeleted: product.isDeleted ?? false,
  }
}

export function toProductPayload(draft: ProductDraft): ProductPayload {
  return {
    slug: draft.slug.trim(),
    nameNl: draft.nameNl.trim(),
    nameEn: draft.nameEn.trim(),
    summaryNl: draft.summaryNl.trim(),
    summaryEn: draft.summaryEn.trim(),
    priceEur: Number(draft.priceEur),
    availability: draft.availability || null,
    tags: draft.tags.trim(),
    imageUrl: draft.imageUrl.trim(),
    imageAltNl: draft.imageAltNl.trim(),
    imageAltEn: draft.imageAltEn.trim(),
    leadTimeMin: draft.leadTimeMin === "" ? null : Number(draft.leadTimeMin),
    leadTimeMax: draft.leadTimeMax === "" ? null : Number(draft.leadTimeMax),
    sortOrder: draft.sortOrder === "" ? 0 : Number(draft.sortOrder),
    isLive: draft.isLive,
  }
}

export function hasRequiredProductFields(draft: ProductDraft, requireSlug: boolean): boolean {
  const slugOk = !requireSlug || draft.slug.trim().length > 1
  return (
    slugOk &&
    draft.nameNl.trim() !== "" &&
    draft.nameEn.trim() !== "" &&
    draft.summaryNl.trim() !== "" &&
    draft.summaryEn.trim() !== "" &&
    draft.imageUrl.trim() !== "" &&
    draft.imageAltNl.trim() !== "" &&
    draft.imageAltEn.trim() !== "" &&
    draft.priceEur.trim() !== ""
  )
}
