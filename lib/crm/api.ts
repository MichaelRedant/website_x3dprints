import type {
  CrmDashboardMetrics,
  CrmStockItem,
  LogEntry,
  OrderEntry,
  OrderProductOption,
  OrderShippingMethod,
  ProductEntry,
  ProductDraft,
  ReplyEntry,
} from "@/lib/crm/types"
import { toProductDraft } from "@/lib/crm/types"

const AUTH_ENDPOINT = "/crm-auth.php"
const CRM_DATA_ENDPOINT = "/crm-data.php"
const CRM_ORDERS_ENDPOINT = "/crm-orders.php"
const CRM_PRODUCTS_ENDPOINT = "/crm-products.php"

const JSON_HEADERS = { "Content-Type": "application/json" }

export class CrmUnauthorizedError extends Error {
  constructor() {
    super("Unauthorized")
    this.name = "CrmUnauthorizedError"
  }
}

async function readJson<T>(res: Response): Promise<T | null> {
  return (await res.json().catch(() => null)) as T | null
}

function ensureAuthorized(res: Response) {
  if (res.status === 401) {
    throw new CrmUnauthorizedError()
  }
}

async function ensureOk(res: Response, fallbackMessage: string): Promise<void> {
  ensureAuthorized(res)
  if (res.ok) return
  const json = await readJson<{ error?: string }>(res)
  throw new Error(json?.error || fallbackMessage)
}

export async function crmCheckAuth(): Promise<boolean> {
  const res = await fetch(AUTH_ENDPOINT, { cache: "no-store", credentials: "same-origin" })
  const json = await readJson<{ authed?: boolean }>(res)
  return Boolean(json?.authed && res.ok)
}

export async function crmLogin(password: string): Promise<void> {
  const res = await fetch(AUTH_ENDPOINT, {
    method: "POST",
    credentials: "same-origin",
    headers: JSON_HEADERS,
    body: JSON.stringify({ password }),
  })
  await ensureOk(res, "Wachtwoord klopt niet.")
}

export async function crmLogout(): Promise<void> {
  await fetch(AUTH_ENDPOINT, { method: "DELETE", credentials: "same-origin" })
}

export async function crmFetchLogs(): Promise<LogEntry[]> {
  const res = await fetch(`${CRM_DATA_ENDPOINT}?type=logs`, { cache: "no-store", credentials: "same-origin" })
  await ensureOk(res, "Kon logbestand niet laden.")
  const json = await readJson<LogEntry[]>(res)
  return Array.isArray(json) ? json : []
}

export async function crmFetchOrders(): Promise<OrderEntry[]> {
  const res = await fetch(`${CRM_DATA_ENDPOINT}?type=orders`, { cache: "no-store", credentials: "same-origin" })
  await ensureOk(res, "Kon orders niet laden.")
  const json = await readJson<OrderEntry[]>(res)
  return Array.isArray(json) ? json : []
}

export async function crmFetchShippingMethods(): Promise<OrderShippingMethod[]> {
  const res = await fetch(`${CRM_DATA_ENDPOINT}?type=shipping-methods`, { cache: "no-store", credentials: "same-origin" })
  await ensureOk(res, "Kon verzendmethodes niet laden.")
  const json = await readJson<OrderShippingMethod[]>(res)
  return Array.isArray(json) ? json : []
}

export async function crmFetchOrderProducts(): Promise<OrderProductOption[]> {
  const res = await fetch(`${CRM_DATA_ENDPOINT}?type=products`, { cache: "no-store", credentials: "same-origin" })
  await ensureOk(res, "Kon producten voor orders niet laden.")
  const json = await readJson<OrderProductOption[]>(res)
  return Array.isArray(json) ? json : []
}

export async function crmFetchMaterialStockOverrides(): Promise<Record<string, Record<string, boolean>>> {
  const res = await fetch(`${CRM_DATA_ENDPOINT}?type=material-stock`, { cache: "no-store", credentials: "same-origin" })
  await ensureOk(res, "Kon materiaal-stock niet laden.")
  const json = await readJson<Record<string, Record<string, boolean>>>(res)
  return json ?? {}
}

export async function crmFetchReplies(): Promise<ReplyEntry[]> {
  const res = await fetch(`${CRM_DATA_ENDPOINT}?type=replies`, { cache: "no-store", credentials: "same-origin" })
  await ensureOk(res, "Kon replies niet laden.")
  const json = await readJson<ReplyEntry[]>(res)
  return Array.isArray(json) ? json : []
}

export async function crmFetchProcessedMap(): Promise<Record<string, boolean>> {
  const res = await fetch(`${CRM_DATA_ENDPOINT}?type=contact-processed`, {
    cache: "no-store",
    credentials: "same-origin",
  })
  await ensureOk(res, "Kon contactstatus niet laden.")
  const json = await readJson<Record<string, boolean>>(res)
  return json ?? {}
}

export async function crmSaveProcessedMap(processed: Record<string, boolean>): Promise<Record<string, boolean>> {
  const res = await fetch(`${CRM_DATA_ENDPOINT}?type=contact-processed`, {
    method: "POST",
    credentials: "same-origin",
    headers: JSON_HEADERS,
    body: JSON.stringify({ processed }),
  })
  await ensureOk(res, "Kon contactstatus niet opslaan.")
  const json = await readJson<{ ok?: boolean; processed?: Record<string, boolean> }>(res)
  return json?.processed ?? {}
}

export async function crmFetchStockItems(): Promise<CrmStockItem[]> {
  const res = await fetch(`${CRM_DATA_ENDPOINT}?type=stock-items`, { cache: "no-store", credentials: "same-origin" })
  await ensureOk(res, "Kon voorraaditems niet laden.")
  const json = await readJson<CrmStockItem[]>(res)
  return Array.isArray(json) ? json : []
}

export async function crmSaveStockItems(stock: CrmStockItem[]): Promise<CrmStockItem[]> {
  const res = await fetch(`${CRM_DATA_ENDPOINT}?type=stock-items`, {
    method: "POST",
    credentials: "same-origin",
    headers: JSON_HEADERS,
    body: JSON.stringify({ stock }),
  })
  await ensureOk(res, "Kon voorraaditems niet opslaan.")
  const json = await readJson<{ ok?: boolean; stock?: CrmStockItem[] }>(res)
  return Array.isArray(json?.stock) ? json.stock : []
}

export async function crmFetchDashboardMetrics(): Promise<CrmDashboardMetrics> {
  const res = await fetch(`${CRM_DATA_ENDPOINT}?type=dashboard-metrics`, {
    cache: "no-store",
    credentials: "same-origin",
  })
  await ensureOk(res, "Kon dashboardmetrics niet laden.")
  const json = await readJson<CrmDashboardMetrics>(res)
  return (
    json ?? {
      revenue7dEur: 0,
      revenuePrev7dEur: 0,
      revenue30dEur: 0,
      revenuePrev30dEur: 0,
      orders7d: 0,
      ordersPrev7d: 0,
      openOrders: 0,
      lowStockCount: 0,
      processedContacts: 0,
      totalContacts: 0,
    }
  )
}

export async function crmFetchProducts(): Promise<ProductDraft[]> {
  const res = await fetch(CRM_PRODUCTS_ENDPOINT, { cache: "no-store", credentials: "same-origin" })
  await ensureOk(res, "Kon producten niet laden.")
  const json = await readJson<ProductEntry[]>(res)
  return Array.isArray(json) ? json.map((item) => toProductDraft(item)) : []
}

export async function crmSubmitProductAction(payload: Record<string, unknown>): Promise<void> {
  const res = await fetch(CRM_PRODUCTS_ENDPOINT, {
    method: "POST",
    headers: JSON_HEADERS,
    credentials: "same-origin",
    body: JSON.stringify(payload),
  })
  await ensureOk(res, "Productbewerking mislukt.")
}

export async function crmSubmitOrderAction(payload: Record<string, unknown>): Promise<OrderEntry> {
  const res = await fetch(CRM_ORDERS_ENDPOINT, {
    method: "POST",
    credentials: "same-origin",
    headers: JSON_HEADERS,
    body: JSON.stringify(payload),
  })
  ensureAuthorized(res)
  const json = await readJson<{ ok?: boolean; order?: OrderEntry; error?: string }>(res)
  if (!res.ok || !json?.ok || !json.order) {
    throw new Error(json?.error || `Status ${res.status}`)
  }
  return json.order
}
