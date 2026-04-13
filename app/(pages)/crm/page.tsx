// app/(pages)/crm/page.tsx
"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import CrmSidebar from "@/components/crm/Sidebar"
import HeroMetrics from "@/components/crm/HeroMetrics"
import ToastStack, { type CrmToast } from "@/components/crm/ToastStack"
import ProductModal from "@/components/crm/products/ProductModal"
import {
  CrmUnauthorizedError,
  crmCheckAuth,
  crmFetchLogs,
  crmFetchDashboardMetrics,
  crmFetchMaterialStockOverrides,
  crmFetchOrderProducts,
  crmFetchOrders,
  crmFetchProcessedMap,
  crmFetchProducts,
  crmFetchReplies,
  crmFetchShippingMethods,
  crmFetchStockItems,
  crmLogin,
  crmLogout,
  crmSaveProcessedMap,
  crmSaveStockItems,
  crmSubmitOrderAction,
  crmSubmitProductAction,
} from "@/lib/crm/api"
import {
  EMPTY_PRODUCT_DRAFT,
  PRODUCT_AVAILABILITY_OPTIONS,
  PRODUCT_PURCHASE_MODE_OPTIONS,
  hasRequiredProductFields,
  toProductPayload,
  type CrmDashboardMetrics,
  type CrmStockItem,
  type CrmTab,
  type LogEntry,
  type OrderEntry,
  type OrderProductOption,
  type OrderShippingMethod,
  type OrderTimelineEntry,
  type ProductDraft,
  type ReplyEntry,
} from "@/lib/crm/types"
import { MATERIALS, MATERIAL_ORDER, type MaterialKey } from "@/lib/materials"

type ProcessedMap = Record<string, boolean>

type OrderEditDraft = {
  id: string
  status: string
  originalStatus: string
  email: string
  shippingMethodId: string
  originalShippingMethodId: string
  notes: string
  archived: boolean
  items: ManualOrderLine[]
  itemsDirty: boolean
  timelineNote: string
  timeline: OrderTimelineEntry[]
}

type ManualOrderLine = {
  id: string
  productSlug: string
  quantity: number
}

const CRM_DATA_ENDPOINT = "/crm-data.php"
const LEGACY_PROCESSED_KEY = "x3dprints-crm-processed"
const LEGACY_STOCK_KEY = "x3dprints-crm-filament-stock"

const EUR_FORMATTER = new Intl.NumberFormat("nl-BE", { style: "currency", currency: "EUR" })
const formatEur = (value: number) => EUR_FORMATTER.format(value)

function parseLegacyProcessedMap(raw: unknown): ProcessedMap {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {}
  const next: ProcessedMap = {}
  for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
    const ts = key.trim()
    if (!ts || ts.length > 180) continue
    next[ts] = Boolean(value)
  }
  return next
}

function parseLegacyStockItems(raw: unknown): CrmStockItem[] {
  if (!Array.isArray(raw)) return []
  const nowIso = new Date().toISOString()
  const usedIds = new Set<string>()
  const items: CrmStockItem[] = []
  for (const entry of raw) {
    if (!entry || typeof entry !== "object") continue
    const row = entry as Record<string, unknown>
    const material = String(row.material ?? "").trim()
    const color = String(row.color ?? "").trim()
    if (!material || !color) continue
    const incomingId = String(row.id ?? "").trim()
    const id = incomingId && !usedIds.has(incomingId) ? incomingId : crypto.randomUUID()
    usedIds.add(id)
    const rawGrams = Number(row.availableGrams)
    const availableGrams = Number.isFinite(rawGrams) ? Math.max(0, Math.round(rawGrams)) : 0
    const diameter = String(row.diameter ?? "1.75mm").trim() || "1.75mm"
    const supplier = String(row.supplier ?? "").trim()
    const notes = String(row.notes ?? "").trim()
    const updatedAt = String(row.updatedAt ?? "").trim() || nowIso
    items.push({ id, material, color, diameter, availableGrams, supplier, notes, updatedAt })
  }
  return items
}

function formatTrend(current: number, previous: number): { text: string; toneClass: string } {
  if (previous <= 0) {
    if (current <= 0) return { text: "0% vs vorige periode", toneClass: "text-slate-400" }
    return { text: "+100% vs vorige periode", toneClass: "text-emerald-300" }
  }
  const pct = ((current - previous) / previous) * 100
  const rounded = Math.round(pct * 10) / 10
  if (rounded > 0) return { text: `+${rounded}% vs vorige periode`, toneClass: "text-emerald-300" }
  if (rounded < 0) return { text: `${rounded}% vs vorige periode`, toneClass: "text-rose-300" }
  return { text: "0% vs vorige periode", toneClass: "text-slate-400" }
}

const ORDER_STATUS_LABELS: Record<string, string> = {
  open: "Open",
  pending: "In afwachting",
  paid: "Betaald",
  authorized: "Geautoriseerd",
  fulfilled: "Afgewerkt",
  manual: "Handmatig",
  failed: "Mislukt",
  canceled: "Geannuleerd",
  expired: "Verlopen",
  paidout: "Uitbetaald",
  refund: "Terugbetaald",
  refunded: "Terugbetaald",
  charged_back: "Chargeback",
}

const ORDER_STATUS_STYLES: Record<string, string> = {
  paid: "border-emerald-400/60 bg-emerald-400/15 text-emerald-100",
  paidout: "border-emerald-400/60 bg-emerald-400/15 text-emerald-100",
  fulfilled: "border-emerald-400/60 bg-emerald-400/15 text-emerald-100",
  pending: "border-amber-400/60 bg-amber-400/15 text-amber-100",
  open: "border-sky-400/60 bg-sky-400/15 text-sky-100",
  authorized: "border-indigo-400/60 bg-indigo-400/15 text-indigo-100",
  manual: "border-indigo-400/60 bg-indigo-400/15 text-indigo-100",
  failed: "border-rose-400/60 bg-rose-400/15 text-rose-100",
  canceled: "border-rose-400/60 bg-rose-400/15 text-rose-100",
  expired: "border-slate-400/50 bg-slate-400/10 text-slate-200",
  refund: "border-fuchsia-400/60 bg-fuchsia-400/15 text-fuchsia-100",
  refunded: "border-fuchsia-400/60 bg-fuchsia-400/15 text-fuchsia-100",
  charged_back: "border-fuchsia-400/60 bg-fuchsia-400/15 text-fuchsia-100",
}

const ORDER_STATUS_OPTIONS = [
  "open",
  "pending",
  "paid",
  "authorized",
  "fulfilled",
  "manual",
  "canceled",
  "expired",
  "failed",
  "refunded",
  "charged_back",
]

const ORDER_SOURCE_LABELS: Record<string, string> = {
  mollie: "Website",
  manual: "Handmatig",
}

export default function CrmGate() {
  const searchParams = useSearchParams()
  const viewParam = searchParams?.get("view") ?? ""
  const tabParam = searchParams?.get("tab") ?? ""
  const ordersOnly = viewParam === "orders"
  const [tab, setTab] = useState<CrmTab>("contact")
  const [input, setInput] = useState("")
  const [isAuthed, setIsAuthed] = useState(false)
  const [authLoading, setAuthLoading] = useState(true)
  const [error, setError] = useState("")
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [loadingLogs, setLoadingLogs] = useState(false)
  const [logError, setLogError] = useState("")
  const [orders, setOrders] = useState<OrderEntry[]>([])
  const [loadingOrders, setLoadingOrders] = useState(false)
  const [ordersError, setOrdersError] = useState("")
  const [orderSearch, setOrderSearch] = useState("")
  const [orderStatusFilter, setOrderStatusFilter] = useState("all")
  const [orderSourceFilter, setOrderSourceFilter] = useState("all")
  const [showArchivedOrders, setShowArchivedOrders] = useState(false)
  const [shippingMethods, setShippingMethods] = useState<OrderShippingMethod[]>([])
  const [products, setProducts] = useState<OrderProductOption[]>([])
  const [productList, setProductList] = useState<ProductDraft[]>([])
  const [productLoading, setProductLoading] = useState(false)
  const [productError, setProductError] = useState("")
  const [productSuccess, setProductSuccess] = useState("")
  const [productSaving, setProductSaving] = useState(false)
  const [productSearch, setProductSearch] = useState("")
  const [showDeletedProducts, setShowDeletedProducts] = useState(false)
  const [productModal, setProductModal] = useState<{ mode: "create" | "edit"; slug?: string } | null>(null)
  const [productModalDraft, setProductModalDraft] = useState<ProductDraft>(EMPTY_PRODUCT_DRAFT)
  const [orderEdit, setOrderEdit] = useState<OrderEditDraft | null>(null)
  const [orderSaving, setOrderSaving] = useState(false)
  const [orderSaveError, setOrderSaveError] = useState("")
  const [orderSaveOk, setOrderSaveOk] = useState("")
  const [orderSupportError, setOrderSupportError] = useState("")
  const [newOrder, setNewOrder] = useState({
    email: "",
    locale: "nl",
    shippingMethodId: "",
    status: "manual",
    items: [{ id: crypto.randomUUID(), productSlug: "", quantity: 1 }],
  })
  const [showNewOrder, setShowNewOrder] = useState(false)
  const [newOrderSaving, setNewOrderSaving] = useState(false)
  const [newOrderError, setNewOrderError] = useState("")
  const [search, setSearch] = useState("")
  const [onlyIssues, setOnlyIssues] = useState(false)
  const [processed, setProcessed] = useState<ProcessedMap>({})
  const [processedHydrated, setProcessedHydrated] = useState(false)
  const [processedDirty, setProcessedDirty] = useState(false)
  const [processedLegacyCleanupPending, setProcessedLegacyCleanupPending] = useState(false)
  const [stock, setStock] = useState<CrmStockItem[]>([])
  const [stockHydrated, setStockHydrated] = useState(false)
  const [stockDirty, setStockDirty] = useState(false)
  const [stockLegacyCleanupPending, setStockLegacyCleanupPending] = useState(false)
  const [stockForm, setStockForm] = useState({
    material: "",
    color: "",
    diameter: "1.75mm",
    availableGrams: "",
    supplier: "",
    notes: "",
  })
  const [stockSearch, setStockSearch] = useState("")
  const [lowOnly, setLowOnly] = useState(false)
  const [selectedStockIds, setSelectedStockIds] = useState<string[]>([])
  const [materialOverrides, setMaterialOverrides] = useState<Record<string, Record<string, boolean>>>({})
  const [materialLoading, setMaterialLoading] = useState(false)
  const [materialError, setMaterialError] = useState("")
  const [dashboardMetrics, setDashboardMetrics] = useState<CrmDashboardMetrics | null>(null)
  const [dashboardLoading, setDashboardLoading] = useState(false)
  const [dashboardError, setDashboardError] = useState("")
  const [replies, setReplies] = useState<ReplyEntry[]>([])
  const [loadingReplies, setLoadingReplies] = useState(false)
  const [repliesError, setRepliesError] = useState("")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replySubject, setReplySubject] = useState("")
  const [replyHtml, setReplyHtml] = useState("")
  const [replyToEmail, setReplyToEmail] = useState("")
  const [replyStatus, setReplyStatus] = useState<"idle" | "sending" | "ok" | "error">("idle")
  const [replyError, setReplyError] = useState("")
  const [toasts, setToasts] = useState<CrmToast[]>([])

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const pushToast = useCallback((message: string, tone: CrmToast["tone"] = "info") => {
    const id = crypto.randomUUID()
    setToasts((prev) => [...prev, { id, message, tone }])
    window.setTimeout(() => {
      dismissToast(id)
    }, 4200)
  }, [dismissToast])

  useEffect(() => {
    let cancelled = false
    async function checkAuth() {
      try {
        setAuthLoading(true)
        const authed = await crmCheckAuth()
        if (!cancelled) {
          setIsAuthed(authed)
        }
      } catch {
        if (!cancelled) setIsAuthed(false)
      } finally {
        if (!cancelled) setAuthLoading(false)
      }
    }
    checkAuth()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (ordersOnly) {
      setTab("orders")
      setOrderSourceFilter((prev) => (prev === "all" ? "mollie" : prev))
      return
    }
    if (tabParam === "orders" || tabParam === "stock" || tabParam === "contact" || tabParam === "products") {
      setTab(tabParam as CrmTab)
    }
  }, [ordersOnly, tabParam])

  useEffect(() => {
    if (!isAuthed) return
    let cancelled = false
    async function loadPersistentCrmState() {
      let legacyProcessed: ProcessedMap = {}
      let legacyStock: CrmStockItem[] = []
      if (typeof window !== "undefined") {
        try {
          legacyProcessed = parseLegacyProcessedMap(JSON.parse(window.localStorage.getItem(LEGACY_PROCESSED_KEY) || "{}"))
        } catch {
          legacyProcessed = {}
        }
        try {
          legacyStock = parseLegacyStockItems(JSON.parse(window.localStorage.getItem(LEGACY_STOCK_KEY) || "[]"))
        } catch {
          legacyStock = []
        }
      }
      const [processedResult, stockResult] = await Promise.allSettled([crmFetchProcessedMap(), crmFetchStockItems()])
      if (cancelled) return

      if (processedResult.status === "fulfilled") {
        const fromServer = processedResult.value || {}
        const shouldMigrate = Object.keys(fromServer).length === 0 && Object.keys(legacyProcessed).length > 0
        setProcessed(shouldMigrate ? legacyProcessed : fromServer)
        setProcessedHydrated(true)
        setProcessedDirty(shouldMigrate)
        setProcessedLegacyCleanupPending(shouldMigrate)
        if (shouldMigrate) {
          pushToast("Lokale contactstatus gemigreerd", "info")
        }
      } else if (processedResult.reason instanceof CrmUnauthorizedError) {
        setIsAuthed(false)
        return
      } else {
        setProcessedHydrated(true)
        setProcessedLegacyCleanupPending(false)
        pushToast("Kon afgewerkte contactstatus niet laden", "error")
      }

      if (stockResult.status === "fulfilled") {
        const fromServer = Array.isArray(stockResult.value) ? stockResult.value : []
        const shouldMigrate = fromServer.length === 0 && legacyStock.length > 0
        setStock(shouldMigrate ? legacyStock : fromServer)
        setStockHydrated(true)
        setStockDirty(shouldMigrate)
        setStockLegacyCleanupPending(shouldMigrate)
        if (shouldMigrate) {
          pushToast("Lokale filamentvoorraad gemigreerd", "info")
        }
      } else if (stockResult.reason instanceof CrmUnauthorizedError) {
        setIsAuthed(false)
        return
      } else {
        setStockHydrated(true)
        setStockLegacyCleanupPending(false)
        pushToast("Kon voorraaditems niet laden", "error")
      }
    }
    loadPersistentCrmState()
    return () => {
      cancelled = true
    }
  }, [isAuthed, pushToast])

  useEffect(() => {
    if (!isAuthed) return
    async function load() {
      try {
        setLoadingLogs(true)
        setLogError("")
        const json = await crmFetchLogs()
        setLogs(Array.isArray(json) ? json : [])
      } catch (error) {
        if (error instanceof CrmUnauthorizedError) {
          setIsAuthed(false)
          return
        }
        setLogError("Kon logbestand niet laden.")
      } finally {
        setLoadingLogs(false)
      }
    }
    load()
  }, [isAuthed])

  useEffect(() => {
    if (!isAuthed) return
    async function loadOrders() {
      try {
        setLoadingOrders(true)
        setOrdersError("")
        const json = await crmFetchOrders()
        setOrders(Array.isArray(json) ? json : [])
      } catch (error) {
        if (error instanceof CrmUnauthorizedError) {
          setIsAuthed(false)
          return
        }
        setOrdersError("Kon orders niet laden.")
      } finally {
        setLoadingOrders(false)
      }
    }
    loadOrders()
  }, [isAuthed])

  useEffect(() => {
    if (!isAuthed) return
    let cancelled = false
    async function loadSupportData() {
      try {
        setOrderSupportError("")
        const [methodsJson, productsJson] = await Promise.all([crmFetchShippingMethods(), crmFetchOrderProducts()])
        if (!cancelled) {
          setShippingMethods(Array.isArray(methodsJson) ? methodsJson : [])
          setProducts(Array.isArray(productsJson) ? productsJson : [])
        }
      } catch (error) {
        if (error instanceof CrmUnauthorizedError) {
          setIsAuthed(false)
          return
        }
        if (!cancelled) setOrderSupportError("Kon orderdata (producten/verzending) niet laden.")
      }
    }
    loadSupportData()
    return () => {
      cancelled = true
    }
  }, [isAuthed])

  useEffect(() => {
    if (!isAuthed || tab !== "products") return
    let cancelled = false
    async function loadProducts() {
      try {
        setProductLoading(true)
        setProductError("")
        setProductSuccess("")
        const json = await crmFetchProducts()
        if (!cancelled) {
          setProductList(json)
        }
      } catch (error) {
        if (error instanceof CrmUnauthorizedError) {
          setIsAuthed(false)
          return
        }
        if (!cancelled) setProductError("Kon producten niet laden.")
      } finally {
        if (!cancelled) setProductLoading(false)
      }
    }
    loadProducts()
    return () => {
      cancelled = true
    }
  }, [isAuthed, tab])

  useEffect(() => {
    if (!shippingMethods.length) return
    setNewOrder((prev) => {
      if (prev.shippingMethodId) return prev
      const firstActive = shippingMethods.find((method) => method.active) ?? shippingMethods[0]
      return { ...prev, shippingMethodId: firstActive?.id ?? "" }
    })
  }, [shippingMethods])

  useEffect(() => {
    if (!isAuthed || !processedHydrated || !processedDirty) return
    const timer = window.setTimeout(async () => {
      try {
        const saved = await crmSaveProcessedMap(processed)
        setProcessed(saved)
        setProcessedDirty(false)
        if (processedLegacyCleanupPending && typeof window !== "undefined") {
          window.localStorage.removeItem(LEGACY_PROCESSED_KEY)
          setProcessedLegacyCleanupPending(false)
        }
      } catch (error) {
        if (error instanceof CrmUnauthorizedError) {
          setIsAuthed(false)
          return
        }
        pushToast("Afgewerkte contactstatus opslaan mislukt", "error")
      }
    }, 300)
    return () => window.clearTimeout(timer)
  }, [isAuthed, processed, processedHydrated, processedDirty, processedLegacyCleanupPending, pushToast])

  useEffect(() => {
    if (!isAuthed || !stockHydrated || !stockDirty) return
    const timer = window.setTimeout(async () => {
      try {
        const saved = await crmSaveStockItems(stock)
        setStock(Array.isArray(saved) ? saved : [])
        setStockDirty(false)
        if (stockLegacyCleanupPending && typeof window !== "undefined") {
          window.localStorage.removeItem(LEGACY_STOCK_KEY)
          setStockLegacyCleanupPending(false)
        }
      } catch (error) {
        if (error instanceof CrmUnauthorizedError) {
          setIsAuthed(false)
          return
        }
        pushToast("Voorraaditems opslaan mislukt", "error")
      }
    }, 320)
    return () => window.clearTimeout(timer)
  }, [isAuthed, stock, stockHydrated, stockDirty, stockLegacyCleanupPending, pushToast])

  useEffect(() => {
    if (!isAuthed) return
    let cancelled = false
    async function loadDashboardMetrics() {
      try {
        setDashboardLoading(true)
        setDashboardError("")
        const metrics = await crmFetchDashboardMetrics()
        if (!cancelled) {
          setDashboardMetrics(metrics)
        }
      } catch (error) {
        if (error instanceof CrmUnauthorizedError) {
          setIsAuthed(false)
          return
        }
        if (!cancelled) {
          setDashboardError("Kon dashboardmetrics niet laden.")
        }
      } finally {
        if (!cancelled) {
          setDashboardLoading(false)
        }
      }
    }
    loadDashboardMetrics()
    const interval = window.setInterval(loadDashboardMetrics, 60000)
    return () => {
      cancelled = true
      window.clearInterval(interval)
    }
  }, [isAuthed])

  useEffect(() => {
    if (!isAuthed) return
    async function load() {
      try {
        setMaterialLoading(true)
        setMaterialError("")
        const json = await crmFetchMaterialStockOverrides()
        setMaterialOverrides(json || {})
      } catch (error) {
        if (error instanceof CrmUnauthorizedError) {
          setIsAuthed(false)
          return
        }
        setMaterialError("Kon materiaal-stock niet laden.")
      } finally {
        setMaterialLoading(false)
      }
    }
    load()
  }, [isAuthed])

  useEffect(() => {
    if (!isAuthed) return
    async function loadReplies() {
      try {
        setLoadingReplies(true)
        setRepliesError("")
        const json = await crmFetchReplies()
        setReplies(Array.isArray(json) ? json : [])
      } catch (error) {
        if (error instanceof CrmUnauthorizedError) {
          setIsAuthed(false)
          return
        }
        setRepliesError("Kon replies niet laden.")
      } finally {
        setLoadingReplies(false)
      }
    }
    loadReplies()
  }, [isAuthed])

  const visibleLogs = logs.filter((entry) => {
    const term = search.trim().toLowerCase()
    const hasIssue = entry.adminSent === false || entry.confirmSent === false
    if (onlyIssues && !hasIssue) return false
    if (!term) return true
    return (
      entry.name.toLowerCase().includes(term) ||
      entry.email.toLowerCase().includes(term) ||
      (entry.material || "").toLowerCase().includes(term)
    )
  })

  const visibleOrders = orders.filter((order) => {
    const term = orderSearch.trim().toLowerCase()
    const statusKey = (order.status || "").toLowerCase()
    const statusMatch = orderStatusFilter === "all" ? true : statusKey === orderStatusFilter
    const archiveMatch = showArchivedOrders ? true : !order.archived
    const sourceMatch = orderSourceFilter === "all" ? true : (order.source || "manual") === orderSourceFilter
    if (!statusMatch || !archiveMatch || !sourceMatch) return false
    if (!term) return true
    return (
      order.orderCode.toLowerCase().includes(term) ||
      order.email.toLowerCase().includes(term) ||
      (order.itemsSummary || "").toLowerCase().includes(term) ||
      (order.notes || "").toLowerCase().includes(term)
    )
  })

  const totals = {
    all: logs.length,
    issues: logs.filter((l) => l.adminSent === false || l.confirmSent === false).length,
    processed: Object.values(processed).filter(Boolean).length,
  }

  const orderTotals = {
    all: orders.length,
    paid: orders.filter((o) => (o.status || "").toLowerCase() === "paid").length,
    pending: orders.filter((o) => (o.status || "").toLowerCase() === "pending").length,
    archived: orders.filter((o) => o.archived).length,
  }

  const manualSubtotal = newOrder.items.reduce((sum, item) => {
    const product = products.find((p) => p.slug === item.productSlug)
    if (!product) return sum
    const qty = Number.isFinite(item.quantity) ? Number(item.quantity) : 0
    return sum + product.priceEur * Math.max(0, qty)
  }, 0)
  const manualShipping =
    shippingMethods.find((method) => method.id === newOrder.shippingMethodId)?.priceEur ?? 0
  const manualTotal = manualSubtotal + manualShipping
  const canCreateOrder =
    newOrder.email.trim() !== "" &&
    newOrder.shippingMethodId.trim() !== "" &&
    newOrder.items.every((item) => item.productSlug.trim() !== "" && item.quantity > 0)

  const editSubtotal = orderEdit
    ? orderEdit.items.reduce((sum, item) => {
        const product = products.find((p) => p.slug === item.productSlug)
        if (!product) return sum
        const qty = Number.isFinite(item.quantity) ? Number(item.quantity) : 0
        return sum + product.priceEur * Math.max(0, qty)
      }, 0)
    : 0
  const editShipping = orderEdit
    ? shippingMethods.find((method) => method.id === orderEdit.shippingMethodId)?.priceEur ?? 0
    : 0
  const editTotal = editSubtotal + editShipping

  function toggleProcessed(ts: string) {
    setProcessed((prev) => ({ ...prev, [ts]: !prev[ts] }))
    setProcessedDirty(true)
  }

  function exportCsv() {
    if (!visibleLogs.length) return
    const headers = ["ts", "name", "email", "message", "quantity", "material", "quote", "adminSent", "confirmSent"]
    const rows = visibleLogs.map((e) =>
      headers
        .map((h) => {
          const v = (e as Record<string, unknown>)[h]
          const str =
            typeof v === "string"
              ? v
              : typeof v === "boolean"
              ? v
                ? "true"
                : "false"
              : v ?? ""
          return `"${String(str).replace(/"/g, '""')}"`
        })
        .join(","),
    )
    const csv = [headers.join(","), ...rows].join("\n")
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "contact-log.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  function getShippingLabel(order: OrderEntry) {
    const method = shippingMethods.find((m) => m.id === order.shippingMethodId)
    if (!method) return order.shippingMethodId || "-"
    return order.locale === "en" ? method.labelEn : method.labelNl
  }

  async function submitOrderAction(payload: Record<string, unknown>) {
    try {
      const updated = await crmSubmitOrderAction(payload)
      setOrders((prev) => prev.map((order) => (order.id === updated.id ? { ...order, ...updated } : order)))
      return updated
    } catch (error) {
      if (error instanceof CrmUnauthorizedError) {
        setIsAuthed(false)
      }
      throw error
    }
  }

  function openOrderEditor(order: OrderEntry) {
    const draftItems: ManualOrderLine[] = order.items.length
      ? order.items.map((item) => ({
          id: crypto.randomUUID(),
          productSlug: item.productSlug || "",
          quantity: item.quantity,
        }))
      : [{ id: crypto.randomUUID(), productSlug: "", quantity: 1 }]
    setOrderEdit({
      id: order.id,
      status: order.status || "pending",
      originalStatus: order.status || "pending",
      email: order.email,
      shippingMethodId: order.shippingMethodId || "",
      originalShippingMethodId: order.shippingMethodId || "",
      notes: order.notes || "",
      archived: Boolean(order.archived),
      items: draftItems,
      itemsDirty: false,
      timelineNote: "",
      timeline: order.timeline || [],
    })
    setOrderSaveError("")
    setOrderSaveOk("")
  }

  async function saveOrderEdit() {
    if (!orderEdit) return
    try {
      setOrderSaving(true)
      setOrderSaveError("")
      setOrderSaveOk("")
      const recalculate =
        orderEdit.itemsDirty || orderEdit.shippingMethodId !== orderEdit.originalShippingMethodId
      const updated = await submitOrderAction({
        action: "update",
        id: orderEdit.id,
        status: orderEdit.status,
        previousStatus: orderEdit.originalStatus,
        email: orderEdit.email,
        shippingMethodId: orderEdit.shippingMethodId,
        notes: orderEdit.notes,
        archived: orderEdit.archived,
        recalculate,
        statusNote: orderEdit.timelineNote,
        items: orderEdit.itemsDirty ? orderEdit.items.map((item) => ({ productSlug: item.productSlug, quantity: item.quantity })) : undefined,
      })
      setOrderEdit({
        id: updated.id,
        status: updated.status || orderEdit.status,
        originalStatus: updated.status || orderEdit.status,
        email: updated.email,
        shippingMethodId: updated.shippingMethodId || orderEdit.shippingMethodId,
        originalShippingMethodId: updated.shippingMethodId || orderEdit.shippingMethodId,
        notes: updated.notes || "",
        archived: Boolean(updated.archived),
        items: updated.items.length
          ? updated.items.map((item) => ({
              id: crypto.randomUUID(),
              productSlug: item.productSlug || "",
              quantity: item.quantity,
            }))
          : orderEdit.items,
        itemsDirty: false,
        timelineNote: "",
        timeline: updated.timeline || orderEdit.timeline,
      })
      setOrderSaveOk("Opgeslagen.")
      pushToast("Orderstatus bijgewerkt", "success")
    } catch (err) {
      setOrderSaveError(err instanceof Error ? err.message : "Opslaan mislukt.")
      pushToast("Orderupdate mislukt", "error")
    } finally {
      setOrderSaving(false)
    }
  }

  async function toggleOrderArchive(order: OrderEntry, archived: boolean) {
    try {
      setOrderSaving(true)
      setOrderSaveError("")
      setOrderSaveOk("")
      const updated = await submitOrderAction({
        action: "archive",
        id: order.id,
        archived,
      })
      if (orderEdit?.id === order.id) {
        setOrderEdit({
          id: updated.id,
          status: updated.status,
          originalStatus: updated.status,
          email: updated.email,
          shippingMethodId: updated.shippingMethodId || "",
          originalShippingMethodId: updated.shippingMethodId || "",
          notes: updated.notes || "",
          archived: Boolean(updated.archived),
          items: updated.items.length
            ? updated.items.map((item) => ({
                id: crypto.randomUUID(),
                productSlug: item.productSlug || "",
                quantity: item.quantity,
              }))
            : orderEdit.items,
          itemsDirty: false,
          timelineNote: "",
          timeline: updated.timeline || orderEdit.timeline,
        })
      }
      pushToast(archived ? "Order gearchiveerd" : "Order hersteld", "success")
    } catch (err) {
      setOrderSaveError(err instanceof Error ? err.message : "Archiveren mislukt.")
      pushToast("Orderactie mislukt", "error")
    } finally {
      setOrderSaving(false)
    }
  }

  function updateManualOrderLine(id: string, key: "productSlug" | "quantity", value: string | number) {
    setNewOrder((prev) => ({
      ...prev,
      items: prev.items.map((item) => (item.id === id ? { ...item, [key]: value } : item)),
    }))
  }

  function updateEditOrderLine(id: string, key: "productSlug" | "quantity", value: string | number) {
    setOrderEdit((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        itemsDirty: true,
        items: prev.items.map((item) => (item.id === id ? { ...item, [key]: value } : item)),
      }
    })
  }

  function addEditOrderLine() {
    setOrderEdit((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        itemsDirty: true,
        items: [...prev.items, { id: crypto.randomUUID(), productSlug: "", quantity: 1 }],
      }
    })
  }

  function removeEditOrderLine(id: string) {
    setOrderEdit((prev) => {
      if (!prev) return prev
      const nextItems = prev.items.filter((item) => item.id !== id)
      if (nextItems.length === 0) return prev
      return {
        ...prev,
        itemsDirty: true,
        items: nextItems,
      }
    })
  }

  function addManualOrderLine() {
    setNewOrder((prev) => ({
      ...prev,
      items: [...prev.items, { id: crypto.randomUUID(), productSlug: "", quantity: 1 }],
    }))
  }

  function removeManualOrderLine(id: string) {
    setNewOrder((prev) => ({
      ...prev,
      items: prev.items.length > 1 ? prev.items.filter((item) => item.id !== id) : prev.items,
    }))
  }

  async function createManualOrder() {
    try {
      setNewOrderSaving(true)
      setNewOrderError("")
      const payload = {
        action: "create",
        email: newOrder.email,
        locale: newOrder.locale,
        shippingMethodId: newOrder.shippingMethodId,
        status: newOrder.status,
        items: newOrder.items.map((item) => ({
          productSlug: item.productSlug,
          quantity: item.quantity,
        })),
        statusNote: "Handmatige order aangemaakt",
      }
      const created = await submitOrderAction(payload)
      setOrders((prev) => [created, ...prev])
      setNewOrder({
        email: "",
        locale: "nl",
        shippingMethodId: newOrder.shippingMethodId,
        status: "manual",
        items: [{ id: crypto.randomUUID(), productSlug: "", quantity: 1 }],
      })
      setShowNewOrder(false)
      pushToast("Order aangemaakt", "success")
    } catch (err) {
      setNewOrderError(err instanceof Error ? err.message : "Order aanmaken mislukt.")
      pushToast("Order aanmaken mislukt", "error")
    } finally {
      setNewOrderSaving(false)
    }
  }

  async function resendOrderEmails(orderId: string) {
    try {
      setOrderSaving(true)
      setOrderSaveError("")
      setOrderSaveOk("")
      const updated = await submitOrderAction({
        action: "resend-email",
        id: orderId,
      })
      if (orderEdit?.id === orderId) {
        setOrderEdit({
          id: updated.id,
          status: updated.status,
          originalStatus: updated.status,
          email: updated.email,
          shippingMethodId: updated.shippingMethodId || "",
          originalShippingMethodId: updated.shippingMethodId || "",
          notes: updated.notes || "",
          archived: Boolean(updated.archived),
          items: updated.items.length
            ? updated.items.map((item) => ({
                id: crypto.randomUUID(),
                productSlug: item.productSlug || "",
                quantity: item.quantity,
              }))
            : orderEdit.items,
          itemsDirty: false,
          timelineNote: "",
          timeline: updated.timeline || orderEdit.timeline,
        })
      }
      setOrderSaveOk("Ordermails opnieuw verstuurd.")
      pushToast("Ordermails opnieuw verstuurd", "success")
    } catch (err) {
      setOrderSaveError(err instanceof Error ? err.message : "Emails opnieuw versturen mislukt.")
      pushToast("Opnieuw versturen mislukt", "error")
    } finally {
      setOrderSaving(false)
    }
  }

  async function reloadProducts() {
    try {
      setProductLoading(true)
      setProductError("")
      const products = await crmFetchProducts()
      setProductList(products)
    } catch (error) {
      if (error instanceof CrmUnauthorizedError) {
        setIsAuthed(false)
        return
      }
      setProductError("Kon producten niet laden.")
    } finally {
      setProductLoading(false)
    }
  }

  async function submitProductAction(payload: Record<string, unknown>) {
    try {
      await crmSubmitProductAction(payload)
    } catch (error) {
      if (error instanceof CrmUnauthorizedError) {
        setIsAuthed(false)
      }
      throw error
    }
  }

  function updateProductField(slug: string, key: keyof ProductDraft, value: ProductDraft[keyof ProductDraft]) {
    setProductList((prev) =>
      prev.map((product) => (product.slug === slug ? { ...product, [key]: value } : product)),
    )
  }

  async function toggleProductVisibility(slug: string, isLive: boolean) {
    try {
      setProductSaving(true)
      setProductError("")
      setProductSuccess("")
      await submitProductAction({ action: "visibility", slug, isLive })
      setProductSuccess(isLive ? "Product gepubliceerd." : "Product verborgen.")
      await reloadProducts()
      pushToast(isLive ? "Product gepubliceerd" : "Product verborgen", "success")
    } catch (err) {
      setProductError(err instanceof Error ? err.message : "Product aanpassen mislukt.")
      pushToast("Product aanpassen mislukt", "error")
    } finally {
      setProductSaving(false)
    }
  }

  async function deleteProduct(slug: string) {
    if (!confirm(`Verwijder product ${slug}?`)) return
    try {
      setProductSaving(true)
      setProductError("")
      setProductSuccess("")
      await submitProductAction({ action: "delete", slug })
      setProductSuccess("Product verwijderd.")
      await reloadProducts()
      pushToast("Product permanent verwijderd", "success")
    } catch (err) {
      setProductError(err instanceof Error ? err.message : "Product verwijderen mislukt.")
      pushToast("Product verwijderen mislukt", "error")
    } finally {
      setProductSaving(false)
    }
  }

  function suggestDuplicateSlug(sourceSlug: string) {
    const existing = new Set(productList.map((item) => item.slug))
    const candidate = `${sourceSlug}-copy`
    if (!existing.has(candidate)) return candidate
    let index = 2
    while (existing.has(`${sourceSlug}-copy-${index}`)) {
      index += 1
    }
    return `${sourceSlug}-copy-${index}`
  }

  async function softDeleteProduct(slug: string) {
    if (!confirm(`Product ${slug} verbergen en verwijderen uit de shop?`)) return
    try {
      setProductSaving(true)
      setProductError("")
      setProductSuccess("")
      await submitProductAction({ action: "soft-delete", slug })
      setProductSuccess("Product verwijderd (soft).")
      await reloadProducts()
      pushToast("Product gearchiveerd", "success")
    } catch (err) {
      setProductError(err instanceof Error ? err.message : "Product verwijderen mislukt.")
      pushToast("Product archiveren mislukt", "error")
    } finally {
      setProductSaving(false)
    }
  }

  async function restoreProduct(slug: string) {
    if (!confirm(`Herstel product ${slug}?`)) return
    try {
      setProductSaving(true)
      setProductError("")
      setProductSuccess("")
      await submitProductAction({ action: "restore", slug })
      setProductSuccess("Product hersteld.")
      await reloadProducts()
      pushToast("Product hersteld", "success")
    } catch (err) {
      setProductError(err instanceof Error ? err.message : "Product herstellen mislukt.")
      pushToast("Product herstellen mislukt", "error")
    } finally {
      setProductSaving(false)
    }
  }

  async function duplicateProduct(sourceSlug: string) {
    const suggested = suggestDuplicateSlug(sourceSlug)
    const input = prompt("Nieuwe slug voor duplicaat:", suggested)
    if (!input) return
    const slug = input.trim().toLowerCase()
    if (slug === "") return
    if (!/^[a-z0-9-]{2,120}$/.test(slug)) {
      setProductError("Ongeldige slug. Gebruik a-z, 0-9 en -.")
      pushToast("Ongeldige slug voor duplicaat", "error")
      return
    }
    if (productList.some((item) => item.slug === slug)) {
      setProductError("Slug bestaat al.")
      pushToast("Slug bestaat al", "error")
      return
    }
    if (slug === sourceSlug) {
      setProductError("Duplicaat slug moet verschillen van het origineel.")
      pushToast("Duplicaat slug moet verschillen", "error")
      return
    }
    try {
      setProductSaving(true)
      setProductError("")
      setProductSuccess("")
      await submitProductAction({ action: "duplicate", sourceSlug, slug })
      setProductSuccess("Product gedupliceerd.")
      await reloadProducts()
      pushToast("Product gedupliceerd", "success")
    } catch (err) {
      setProductError(err instanceof Error ? err.message : "Product dupliceren mislukt.")
      pushToast("Product dupliceren mislukt", "error")
    } finally {
      setProductSaving(false)
    }
  }

  async function saveInlineProduct(slug: string) {
    const draft = productList.find((item) => item.slug === slug)
    if (!draft) return
    const priceEur = Number(draft.priceEur)
    if (!Number.isFinite(priceEur) || priceEur < 0) {
      setProductError("Ongeldige prijs voor inline update.")
      pushToast("Ongeldige prijs", "error")
      return
    }
    try {
      setProductSaving(true)
      setProductError("")
      setProductSuccess("")
      await submitProductAction({
        action: "inline-update",
        slug,
        priceEur,
        availability: draft.availability || null,
        stockCount: draft.stockCount === "" ? null : Number(draft.stockCount),
        purchaseMode: draft.purchaseMode,
      })
      setProductSuccess("Prijs, stock en koopmodus bijgewerkt.")
      await reloadProducts()
      pushToast("Product bijgewerkt", "success")
    } catch (err) {
      setProductError(err instanceof Error ? err.message : "Inline update mislukt.")
      pushToast("Inline update mislukt", "error")
    } finally {
      setProductSaving(false)
    }
  }

  async function syncStarterCatalog() {
    if (!confirm("Startercatalogus syncen naar de backend? Bestaande operationele stock- en koopmodusvelden blijven behouden.")) {
      return
    }
    try {
      setProductSaving(true)
      setProductError("")
      setProductSuccess("")
      await submitProductAction({ action: "sync-starter-catalog" })
      await reloadProducts()
      setProductSuccess("Startercatalogus gesynchroniseerd.")
      pushToast("Startercatalogus gesynchroniseerd", "success")
    } catch (err) {
      setProductError(err instanceof Error ? err.message : "Startercatalogus sync mislukt.")
      pushToast("Startercatalogus sync mislukt", "error")
    } finally {
      setProductSaving(false)
    }
  }

  function openCreateProductModal() {
    setProductModal({ mode: "create" })
    setProductModalDraft(EMPTY_PRODUCT_DRAFT)
  }

  function openEditProductModal(slug: string) {
    const draft = productList.find((item) => item.slug === slug)
    if (!draft) return
    setProductModal({ mode: "edit", slug })
    setProductModalDraft({ ...draft })
  }

  function closeProductModal() {
    setProductModal(null)
    setProductModalDraft(EMPTY_PRODUCT_DRAFT)
  }

  function updateProductModalField<K extends keyof ProductDraft>(key: K, value: ProductDraft[K]) {
    setProductModalDraft((prev) => ({ ...prev, [key]: value }))
  }

  async function submitProductModal(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!productModal) return
    const requireSlug = productModal.mode === "create"
    if (!hasRequiredProductFields(productModalDraft, requireSlug)) return
    try {
      setProductSaving(true)
      setProductError("")
      setProductSuccess("")
      const payload = toProductPayload({
        ...productModalDraft,
        slug: productModal.mode === "create" ? productModalDraft.slug.toLowerCase() : productModalDraft.slug,
      })
      if (productModal.mode === "create") {
        await submitProductAction({ action: "create", product: payload })
        setProductSuccess("Product toegevoegd.")
        pushToast("Product succesvol opgeslagen", "success")
      } else {
        await submitProductAction({ action: "update", product: payload })
        setProductSuccess("Product opgeslagen.")
        pushToast("Product succesvol opgeslagen", "success")
      }
      await reloadProducts()
      closeProductModal()
    } catch (err) {
      setProductError(err instanceof Error ? err.message : "Product opslaan mislukt.")
      pushToast("Product opslaan mislukt", "error")
    } finally {
      setProductSaving(false)
    }
  }

  const filteredProducts = productList.filter((product) => {
    const term = productSearch.trim().toLowerCase()
    if (!showDeletedProducts && product.isDeleted) return false
    if (!term) return true
    return (
      product.slug.toLowerCase().includes(term) ||
      product.nameNl.toLowerCase().includes(term) ||
      product.nameEn.toLowerCase().includes(term)
    )
  })

  const productTotals = {
    total: productList.length,
    live: productList.filter((product) => product.isLive && !product.isDeleted).length,
    hidden: productList.filter((product) => !product.isLive && !product.isDeleted).length,
    deleted: productList.filter((product) => product.isDeleted).length,
  }

  const filteredStock = useMemo(
    () =>
      stock.filter((item) => {
        const term = stockSearch.trim().toLowerCase()
        const isLow = item.availableGrams <= 250
        if (lowOnly && !isLow) return false
        if (!term) return true
        return (
          item.material.toLowerCase().includes(term) ||
          item.color.toLowerCase().includes(term) ||
          item.diameter.toLowerCase().includes(term) ||
          (item.supplier || "").toLowerCase().includes(term) ||
          (item.notes || "").toLowerCase().includes(term)
        )
      }),
    [stock, stockSearch, lowOnly],
  )
  const sortedStock = useMemo(() => [...filteredStock].sort((a, b) => a.availableGrams - b.availableGrams), [filteredStock])
  const visibleStockIdSet = useMemo(() => new Set(sortedStock.map((item) => item.id)), [sortedStock])
  const selectedVisibleCount = selectedStockIds.filter((id) => visibleStockIdSet.has(id)).length
  const allVisibleStockSelected = sortedStock.length > 0 && selectedVisibleCount === sortedStock.length

  const stockTotals = {
    items: stock.length,
    low: stock.filter((s) => s.availableGrams <= 250).length,
    grams: stock.reduce((acc, s) => acc + (Number.isFinite(s.availableGrams) ? s.availableGrams : 0), 0),
  }

  const dashboardFallbackOpenOrders = orders.filter((order) => {
    const status = (order.status || "").toLowerCase()
    return ["open", "pending", "authorized", "manual"].includes(status)
  }).length
  const dashboardRevenue7 = dashboardMetrics?.revenue7dEur ?? 0
  const dashboardRevenuePrev7 = dashboardMetrics?.revenuePrev7dEur ?? 0
  const dashboardRevenue30 = dashboardMetrics?.revenue30dEur ?? 0
  const dashboardRevenuePrev30 = dashboardMetrics?.revenuePrev30dEur ?? 0
  const dashboardOrders7 = dashboardMetrics?.orders7d ?? 0
  const dashboardOrdersPrev7 = dashboardMetrics?.ordersPrev7d ?? 0
  const dashboardOpenOrders = dashboardMetrics?.openOrders ?? dashboardFallbackOpenOrders
  const dashboardLowStock = dashboardMetrics?.lowStockCount ?? stockTotals.low
  const dashboardProcessedContacts = dashboardMetrics?.processedContacts ?? totals.processed
  const dashboardTotalContacts = dashboardMetrics?.totalContacts ?? totals.all
  const dashboardContactRate =
    dashboardTotalContacts > 0 ? Math.round((dashboardProcessedContacts / dashboardTotalContacts) * 100) : 0
  const dashboardRevenue7Trend = formatTrend(dashboardRevenue7, dashboardRevenuePrev7)
  const dashboardRevenue30Trend = formatTrend(dashboardRevenue30, dashboardRevenuePrev30)
  const dashboardOrders7Trend = formatTrend(dashboardOrders7, dashboardOrdersPrev7)

  function handleStockInput<K extends keyof typeof stockForm>(key: K, value: (typeof stockForm)[K]) {
    setStockForm((prev) => ({ ...prev, [key]: value }))
  }

  function addStockItem(e: React.FormEvent) {
    e.preventDefault()
    const gramsNum = Number(stockForm.availableGrams)
    if (!stockForm.material.trim() || !stockForm.color.trim() || Number.isNaN(gramsNum)) return
    const entry: CrmStockItem = {
      id: crypto.randomUUID(),
      material: stockForm.material.trim(),
      color: stockForm.color.trim(),
      diameter: stockForm.diameter || "1.75mm",
      availableGrams: gramsNum,
      supplier: stockForm.supplier.trim(),
      notes: stockForm.notes.trim(),
      updatedAt: new Date().toISOString(),
    }
    setStock((prev) => [entry, ...prev])
    setStockDirty(true)
    setStockForm({ material: "", color: "", diameter: stockForm.diameter, availableGrams: "", supplier: "", notes: "" })
    pushToast("Voorraaditem toegevoegd", "success")
  }

  useEffect(() => {
    setSelectedStockIds((prev) => {
      const next = prev.filter((id) => visibleStockIdSet.has(id))
      if (next.length === prev.length && next.every((id, idx) => id === prev[idx])) {
        return prev
      }
      return next
    })
  }, [stock, stockSearch, lowOnly, visibleStockIdSet])

  function updateStockAmount(id: string, delta: number) {
    setStock((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, availableGrams: Math.max(0, item.availableGrams + delta), updatedAt: new Date().toISOString() }
          : item,
      ),
    )
    setStockDirty(true)
  }

  function setStockAmount(id: string, value: number) {
    setStock((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, availableGrams: Math.max(0, value), updatedAt: new Date().toISOString() } : item,
      ),
    )
    setStockDirty(true)
  }

  function removeStock(id: string) {
    setStock((prev) => prev.filter((item) => item.id !== id))
    setSelectedStockIds((prev) => prev.filter((selectedId) => selectedId !== id))
    setStockDirty(true)
    pushToast("Voorraaditem verwijderd", "info")
  }

  function toggleStockSelection(id: string) {
    setSelectedStockIds((prev) =>
      prev.includes(id) ? prev.filter((selectedId) => selectedId !== id) : [...prev, id],
    )
  }

  function toggleSelectAllVisibleStock() {
    setSelectedStockIds((prev) => {
      if (allVisibleStockSelected) {
        return prev.filter((id) => !visibleStockIdSet.has(id))
      }
      return Array.from(new Set([...prev, ...sortedStock.map((item) => item.id)]))
    })
  }

  function clearSelectedStock() {
    setSelectedStockIds([])
  }

  function applyBulkStockDelta(delta: number) {
    if (selectedStockIds.length === 0) return
    const selectedSet = new Set(selectedStockIds)
    setStock((prev) =>
      prev.map((item) =>
        selectedSet.has(item.id)
          ? { ...item, availableGrams: Math.max(0, item.availableGrams + delta), updatedAt: new Date().toISOString() }
          : item,
      ),
    )
    setStockDirty(true)
    pushToast(
      `${selectedStockIds.length} item${selectedStockIds.length === 1 ? "" : "s"} ${delta > 0 ? "aangevuld" : "verminderd"}`,
      "success",
    )
  }

  function removeSelectedStock() {
    if (selectedStockIds.length === 0) return
    const selectedSet = new Set(selectedStockIds)
    const removedCount = selectedStockIds.length
    setStock((prev) => prev.filter((item) => !selectedSet.has(item.id)))
    setSelectedStockIds([])
    setStockDirty(true)
    pushToast(`${removedCount} voorraaditem${removedCount === 1 ? "" : "s"} verwijderd`, "info")
  }

  async function toggleMaterialStock(key: MaterialKey, label: string, value: boolean) {
    try {
      setMaterialError("")
      setMaterialOverrides((prev) => ({
        ...prev,
        [key]: { ...(prev[key] || {}), [label]: value },
      }))
      const res = await fetch("/material-stock.php", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, label, inStock: value }),
      })
      if (!res.ok) {
        throw new Error("Write failed")
      }
    } catch {
      setMaterialOverrides((prev) => {
        const next = { ...prev }
        if (next[key]) {
          const copy = { ...next[key] }
          delete copy[label]
          if (Object.keys(copy).length === 0) delete next[key]
          else next[key] = copy
        }
        return next
      })
      setMaterialError("Kon update niet opslaan (mogelijk schrijfrechten op server controleren).")
    }
  }

  async function resetMaterialStock(key: MaterialKey, label: string) {
    try {
      setMaterialError("")
      setMaterialOverrides((prev) => {
        const next = { ...prev }
        if (next[key]) {
          const copy = { ...next[key] }
          delete copy[label]
          if (Object.keys(copy).length === 0) delete next[key]
          else next[key] = copy
        }
        return next
      })
      const res = await fetch("/material-stock.php", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, label, reset: true }),
      })
      if (!res.ok) {
        throw new Error("Reset failed")
      }
    } catch {
      setMaterialError("Kon reset niet opslaan (schrijfrechten?).")
    }
  }

  function startReply(entry: LogEntry) {
    setReplyingTo(entry.ts)
    setReplyToEmail(entry.email)
    setReplySubject(`Re: jouw aanvraag via x3dprints.be`)
    setReplyHtml(
      `<p>Hey ${entry.name || ""},</p><p>Bedankt voor je bericht. Hieronder vind je mijn antwoord.</p><p><br></p><p>-- jouw reactie hier --</p><p><br></p><p>Origineel bericht:</p><blockquote style="border-left:4px solid #e2e8f0;padding-left:12px;color:#475569;">${entry.message}</blockquote>`,
    )
    setReplyStatus("idle")
    setReplyError("")
  }

  async function sendReply() {
    if (!replyingTo || !replyToEmail || !replySubject || !replyHtml) return
    try {
      setReplyStatus("sending")
      setReplyError("")
      const textVersion = replyHtml.replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]+>/g, " ")
      const res = await fetch("/contact-reply.php", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: replyToEmail,
          subject: replySubject,
          html: replyHtml,
          text: textVersion,
        }),
      })
      const json = await res.json().catch(() => null)
      if (!res.ok || !json?.ok) {
        throw new Error(json?.error || `Status ${res.status}`)
      }
      setReplyStatus("ok")
    } catch {
      setReplyStatus("error")
      setReplyError("Versturen mislukt. Controleer login of server.")
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      setError("")
      await crmLogin(input)
      setIsAuthed(true)
      setInput("")
    } catch (err) {
      setIsAuthed(false)
      setError(err instanceof Error ? err.message : "Wachtwoord klopt niet.")
    }
  }

  async function handleLogout() {
    try {
      await crmLogout()
    } catch {
      // Ignore network errors and force local logout state.
    } finally {
      setIsAuthed(false)
      setInput("")
      setProcessedHydrated(false)
      setProcessedDirty(false)
      setProcessedLegacyCleanupPending(false)
      setStockHydrated(false)
      setStockDirty(false)
      setStockLegacyCleanupPending(false)
      setDashboardMetrics(null)
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_80%_at_50%_0%,rgba(99,102,241,0.25),rgba(15,23,42,1))]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-800/10" />
      <ToastStack toasts={toasts} onDismiss={dismissToast} />

      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-12 sm:px-10 lg:px-16">
        <header className="mb-10 text-center sm:text-left">
          <h1 className="text-balance text-4xl font-extrabold text-white sm:text-5xl">CRM toegang</h1>
          <p className="mt-3 text-lg text-slate-300">
            Beveiligde zone. Vul het wachtwoord in om verder te gaan.
          </p>
        </header>

        {authLoading ? (
          <div className="flex flex-1 items-center justify-center">
            <p className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">Authenticatie controleren...</p>
          </div>
        ) : !isAuthed ? (
          <div className="flex flex-1 items-center justify-center">
            <section className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-indigo-900/60 p-[1px] shadow-2xl shadow-indigo-900/40">
              <div className="relative h-full rounded-2xl bg-slate-950/80 p-6 sm:p-8 backdrop-blur">
                <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-indigo-500/25 blur-3xl" aria-hidden />
                <div className="absolute -left-14 -bottom-16 h-44 w-44 rounded-full bg-cyan-400/20 blur-3xl" aria-hidden />
                <div className="absolute inset-0 flex items-center justify-center opacity-30" aria-hidden>
                  <div className="relative h-44 w-44 animate-spin-slow">
                    <div className="absolute inset-4 rounded-full border border-indigo-300/40" />
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-300/50" style={{ animation: "spin 12s linear infinite" }} />
                    <div className="absolute left-1/2 top-0 h-2 w-6 -translate-x-1/2 rounded-full bg-amber-300 shadow-lg shadow-amber-300/30" />
                  </div>
                </div>
                <div className="space-y-3 relative">
                  <p className="text-xs uppercase tracking-[0.35em] text-indigo-300">CRM</p>
                  <h2 className="text-2xl font-bold text-white sm:text-3xl">Welkom terug</h2>
                  <p className="text-sm text-slate-300">
                    Beveiligde zone voor contactlogs en filamentvoorraad. Vul het wachtwoord in om verder te gaan.
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="mt-6 space-y-5 relative">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-200" htmlFor="password">
                      Wachtwoord
                    </label>
                    <input
                      id="password"
                      type="password"
                      autoComplete="current-password"
                      className="w-full rounded-lg border border-white/15 bg-white/10 px-3 py-3 text-sm text-white placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      required
                    />
                  </div>
                  {error ? (
                    <p className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm font-medium text-rose-100">
                      {error}
                    </p>
                  ) : null}
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:-translate-y-0.5 hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-300"
                  >
                  Ontgrendel
                  <span aria-hidden className="text-indigo-100">-&gt;</span>
                  </button>
                </form>
              </div>
            </section>
          </div>
        ) : (
          <section className="w-full rounded-2xl border border-white/10 bg-white/5 p-10 shadow-xl backdrop-blur">
            <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
              <CrmSidebar
                ordersOnly={ordersOnly}
                activeTab={tab}
                onTabChange={setTab}
                onExportContactCsv={exportCsv}
                onLogout={handleLogout}
                dataEndpoint={CRM_DATA_ENDPOINT}
              />

              <div className="space-y-6">
                {tab === "contact" ? (
              <>
                <HeroMetrics
                  items={[
                    { label: "Totaal", value: totals.all },
                    { label: "Mail issues", value: totals.issues },
                    { label: "Afgewerkt", value: totals.processed },
                  ]}
                />

                <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Omzet 7 dagen</p>
                    <p className="mt-1 text-2xl font-bold text-white">{formatEur(dashboardRevenue7)}</p>
                    <p className={`mt-1 text-xs ${dashboardRevenue7Trend.toneClass}`}>{dashboardRevenue7Trend.text}</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Omzet 30 dagen</p>
                    <p className="mt-1 text-2xl font-bold text-white">{formatEur(dashboardRevenue30)}</p>
                    <p className={`mt-1 text-xs ${dashboardRevenue30Trend.toneClass}`}>{dashboardRevenue30Trend.text}</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Open orders</p>
                    <p className="mt-1 text-2xl font-bold text-white">{dashboardOpenOrders}</p>
                    <p className={`mt-1 text-xs ${dashboardOrders7Trend.toneClass}`}>
                      {dashboardOrders7} orders in 7 dagen ({dashboardOrders7Trend.text})
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Low stock alerts</p>
                    <p className="mt-1 text-2xl font-bold text-white">{dashboardLowStock}</p>
                    <p className="mt-1 text-xs text-slate-300">
                      Contact afgewerkt: {dashboardProcessedContacts}/{dashboardTotalContacts} ({dashboardContactRate}%)
                    </p>
                  </div>
                </div>
                {dashboardLoading ? <p className="text-xs text-slate-400">Dashboardmetrics laden...</p> : null}
                {dashboardError ? <p className="text-xs text-rose-300">{dashboardError}</p> : null}

                <div className="mt-6 space-y-4">
                  <div className="sticky top-6 z-20 rounded-xl border border-white/10 bg-slate-950/90 p-4 backdrop-blur">
                    <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                      <input
                        type="search"
                        placeholder="Zoek op naam, e-mail of materiaal..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 xl:max-w-md"
                      />
                      <div className="flex flex-wrap items-center gap-3">
                        <label className="flex items-center gap-2 text-xs font-semibold text-white">
                          <input
                            type="checkbox"
                            checked={onlyIssues}
                            onChange={(e) => setOnlyIssues(e.target.checked)}
                            className="h-4 w-4 rounded border-white/30 bg-transparent text-indigo-400 focus:ring-indigo-400"
                          />
                          Enkel mail issues
                        </label>
                      </div>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                      <span>{visibleLogs.length} zichtbare contactaanvragen.</span>
                      <span>{totals.processed} gemarkeerd als afgewerkt.</span>
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-xl border border-white/10 bg-black/20">
                    {loadingLogs ? (
                      <div className="p-4 text-sm text-slate-300">Laden...</div>
                    ) : logError ? (
                      <div className="p-4 text-sm text-rose-300">{logError}</div>
                    ) : visibleLogs.length === 0 ? (
                      <div className="p-4 text-sm text-slate-300">Geen inzendingen gevonden.</div>
                    ) : (
                      <div className="max-h-[70vh] overflow-auto">
                        <table className="min-w-full text-left text-sm">
                          <thead className="sticky top-0 z-10 bg-slate-950/95">
                            <tr className="border-b border-white/10 text-[11px] uppercase tracking-[0.16em] text-slate-400">
                              <th className="px-4 py-3">Tijdstip</th>
                              <th className="px-4 py-3">Klant</th>
                              <th className="px-4 py-3">Aanvraag</th>
                              <th className="px-4 py-3">Mailstatus</th>
                              <th className="px-4 py-3">Bericht</th>
                              <th className="px-4 py-3">Acties</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/10">
                            {visibleLogs.map((entry, idx) => {
                              const hasIssue = entry.adminSent === false || entry.confirmSent === false
                              const isProcessed = Boolean(processed[entry.ts])
                              const compactMessage = (entry.message || "").replace(/\s+/g, " ").trim()
                              const compactQuote = (entry.quote || "").replace(/\s+/g, " ").trim()

                              return (
                                <tr key={`${entry.ts}-${idx}`} className={isProcessed ? "bg-emerald-950/10" : ""}>
                                  <td className="px-4 py-3 align-top">
                                    <p className="text-xs uppercase tracking-[0.12em] text-indigo-300">{entry.ts}</p>
                                    <p className="mt-1 text-xs text-slate-400">{isProcessed ? "Afgewerkt" : "Open"}</p>
                                  </td>
                                  <td className="px-4 py-3 align-top">
                                    <p className="font-semibold text-white">{entry.name || "Onbekend"}</p>
                                    <p className="text-xs text-slate-300">{entry.email || "-"}</p>
                                  </td>
                                  <td className="px-4 py-3 align-top">
                                    <p className="text-xs text-slate-300">Aantal: {entry.quantity || "-"}</p>
                                    <p className="mt-1 text-xs text-slate-300">Materiaal: {entry.material || "-"}</p>
                                  </td>
                                  <td className="px-4 py-3 align-top">
                                    <div className="flex flex-col items-start gap-1">
                                      <span
                                        className={`rounded-full border px-2 py-1 text-[11px] font-semibold ${
                                          entry.adminSent ? "border-emerald-400/50 bg-emerald-500/10 text-emerald-100" : "border-rose-400/50 bg-rose-500/10 text-rose-100"
                                        }`}
                                      >
                                        Admin: {entry.adminSent ? "OK" : "mislukt"}
                                      </span>
                                      <span
                                        className={`rounded-full border px-2 py-1 text-[11px] font-semibold ${
                                          entry.confirmSent ? "border-emerald-400/50 bg-emerald-500/10 text-emerald-100" : "border-rose-400/50 bg-rose-500/10 text-rose-100"
                                        }`}
                                      >
                                        Bevestiging: {entry.confirmSent ? "OK" : "mislukt"}
                                      </span>
                                      {hasIssue ? (
                                        <span className="rounded-full border border-amber-400/40 bg-amber-500/10 px-2 py-1 text-[11px] font-semibold text-amber-100">
                                          Opvolging nodig
                                        </span>
                                      ) : null}
                                    </div>
                                  </td>
                                  <td className="px-4 py-3 align-top">
                                    {compactQuote ? (
                                      <p className="mb-1 text-xs text-slate-400">
                                        Quote: {compactQuote.length > 100 ? `${compactQuote.slice(0, 100)}...` : compactQuote}
                                      </p>
                                    ) : null}
                                    <p className="text-xs leading-relaxed text-slate-100">
                                      {compactMessage.length > 180 ? `${compactMessage.slice(0, 180)}...` : compactMessage || "-"}
                                    </p>
                                  </td>
                                  <td className="px-4 py-3 align-top">
                                    <div className="flex flex-wrap gap-1.5">
                                      <button
                                        type="button"
                                        onClick={() => toggleProcessed(entry.ts)}
                                        className={`rounded-md border px-2 py-1 text-[11px] font-semibold transition ${
                                          isProcessed
                                            ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-200"
                                            : "border-white/20 bg-white/5 text-white hover:bg-white/10"
                                        }`}
                                      >
                                        {isProcessed ? "Afgewerkt" : "Markeer afgewerkt"}
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => startReply(entry)}
                                        className="rounded-md border border-indigo-400/40 bg-indigo-500/15 px-2 py-1 text-[11px] font-semibold text-indigo-100 transition hover:bg-indigo-500/25"
                                      >
                                        Antwoord via mail
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>

                {replyingTo ? (
                  <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-indigo-300">Antwoord</p>
                        <p className="text-sm text-slate-200">Aan: {replyToEmail}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setReplyingTo(null)
                          setReplySubject("")
                          setReplyHtml("")
                          setReplyStatus("idle")
                          setReplyError("")
                        }}
                        className="rounded-md border border-white/20 px-2 py-1 text-[11px] font-semibold text-white transition hover:bg-white/10"
                      >
                        Sluiten
                      </button>
                    </div>
                    <div className="mt-4 grid gap-3">
                      <div className="grid gap-2">
                        <label className="text-xs font-semibold text-slate-200" htmlFor="reply-subject">
                          Onderwerp
                        </label>
                        <input
                          id="reply-subject"
                          className="w-full rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
                          value={replySubject}
                          onChange={(e) => setReplySubject(e.target.value)}
                        />
                      </div>
                      <div className="grid gap-2">
                        <label className="text-xs font-semibold text-slate-200">Bericht</label>
                        <div className="flex flex-wrap gap-2">
                          {["B", "I", "*", "Link", "Clear"].map((label) => (
                            <button
                              key={label}
                              type="button"
                              onClick={() => {
                                const cmdMap: Record<string, string> = {
                                  B: "bold",
                                  I: "italic",
                                  "*": "insertUnorderedList",
                                  Link: "createLink",
                                  Clear: "removeFormat",
                                }
                                const cmd = cmdMap[label] || "removeFormat"
                                let value: string | undefined
                                if (cmd === "createLink") {
                                  const url = window.prompt("URL invoegen:")
                                  if (!url) return
                                  value = url
                                }
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                document.execCommand(cmd, false, value)
                              }}
                              className="rounded-md border border-white/15 bg-white/10 px-2 py-1 text-[11px] font-semibold text-white hover:bg-white/15"
                            >
                              {label}
                            </button>
                          ))}
                        </div>
                        <div
                          className="min-h-[140px] rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none"
                          contentEditable
                          suppressContentEditableWarning
                          onInput={(e) => setReplyHtml((e.target as HTMLDivElement).innerHTML)}
                          dangerouslySetInnerHTML={{ __html: replyHtml }}
                        />
                      </div>
                      {replyError ? (
                        <p className="text-sm font-medium text-rose-300">{replyError}</p>
                      ) : replyStatus === "ok" ? (
                        <p className="text-sm font-medium text-emerald-300">Antwoord verzonden.</p>
                      ) : null}
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={sendReply}
                          disabled={replyStatus === "sending"}
                          className="inline-flex items-center justify-center rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5 hover:bg-indigo-400 disabled:opacity-60"
                        >
                          {replyStatus === "sending" ? "Versturen..." : "Verstuur antwoord"}
                        </button>
                        <p className="text-xs text-slate-400">
                          Versturen via beveiligde server-sessie.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null}

                <div className="mt-6 rounded-xl border border-white/10 bg-black/20 p-5 shadow-lg backdrop-blur">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-indigo-300">Historiek antwoorden</p>
                      <p className="text-sm text-slate-200">Laatst verstuurde replies vanuit de CRM.</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={`${CRM_DATA_ENDPOINT}?type=replies&download=1`}
                        className="rounded-md border border-white/20 px-2 py-1 text-[11px] font-semibold text-white transition hover:bg-white/10"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Download replies
                      </a>
                    </div>
                  </div>
                  <div className="mt-4">
                    {loadingReplies ? (
                      <p className="text-sm text-slate-300">Laden...</p>
                    ) : repliesError ? (
                      <p className="text-sm text-rose-300">{repliesError}</p>
                    ) : replies.length === 0 ? (
                      <p className="text-sm text-slate-300">Nog geen antwoorden verzonden.</p>
                    ) : (
                      <div className="max-h-[45vh] overflow-auto rounded-lg border border-white/10">
                        <table className="min-w-full text-left text-sm">
                          <thead className="sticky top-0 z-10 bg-slate-950/95">
                            <tr className="border-b border-white/10 text-[11px] uppercase tracking-[0.16em] text-slate-400">
                              <th className="px-4 py-3">Datum</th>
                              <th className="px-4 py-3">Onderwerp</th>
                              <th className="px-4 py-3">Aan</th>
                              <th className="px-4 py-3">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/10">
                            {replies.slice(0, 50).map((reply, idx) => (
                              <tr key={`${reply.ts}-${idx}`}>
                                <td className="px-4 py-3 text-xs text-indigo-300">{reply.ts}</td>
                                <td className="px-4 py-3 text-sm font-semibold text-white">{reply.subject || "-"}</td>
                                <td className="px-4 py-3 text-xs text-slate-300">{reply.to || "-"}</td>
                                <td className="px-4 py-3">
                                  <span
                                    className={`rounded-full border px-2 py-1 text-[11px] font-semibold ${
                                      reply.sent
                                        ? "border-emerald-400/50 bg-emerald-500/10 text-emerald-100"
                                        : "border-rose-400/50 bg-rose-500/10 text-rose-100"
                                    }`}
                                  >
                                    {reply.sent ? "Verzonden" : "Mislukt"}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : tab === "orders" ? (
              <>
                <HeroMetrics
                  columns={4}
                  items={[
                    { label: "Totaal orders", value: orderTotals.all },
                    { label: "Betaald", value: orderTotals.paid },
                    { label: "In afwachting", value: orderTotals.pending },
                    { label: "Archief", value: orderTotals.archived },
                  ]}
                />

                {orderSupportError ? (
                  <p className="mt-3 text-sm text-rose-300">{orderSupportError}</p>
                ) : null}

                <div className="mt-6 space-y-4">
                  <div className="sticky top-6 z-20 rounded-xl border border-white/10 bg-slate-950/90 p-4 backdrop-blur">
                    <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                      <input
                        type="search"
                        placeholder="Zoek op ordercode, e-mail of item..."
                        value={orderSearch}
                        onChange={(e) => setOrderSearch(e.target.value)}
                        className="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 xl:max-w-md"
                      />
                      <div className="flex flex-wrap items-center gap-3">
                        <select
                          value={orderStatusFilter}
                          onChange={(e) => setOrderStatusFilter(e.target.value)}
                          className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-xs font-semibold text-white focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
                        >
                          <option value="all">Alle statussen</option>
                          {ORDER_STATUS_OPTIONS.map((status) => (
                            <option key={status} value={status}>
                              {ORDER_STATUS_LABELS[status] ?? status}
                            </option>
                          ))}
                        </select>
                        <select
                          value={orderSourceFilter}
                          onChange={(e) => setOrderSourceFilter(e.target.value)}
                          className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-xs font-semibold text-white focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
                        >
                          <option value="all">Alle bronnen</option>
                          <option value="mollie">Website (Mollie)</option>
                          <option value="manual">Handmatig</option>
                        </select>
                        <label className="flex items-center gap-2 text-xs font-semibold text-white">
                          <input
                            type="checkbox"
                            checked={showArchivedOrders}
                            onChange={(e) => setShowArchivedOrders(e.target.checked)}
                            className="h-4 w-4 rounded border-white/30 bg-transparent text-indigo-400 focus:ring-indigo-400"
                          />
                          Toon archief
                        </label>
                        {!ordersOnly ? (
                          <button
                            type="button"
                            onClick={() => setShowNewOrder((prev) => !prev)}
                            className="rounded-lg border border-white/20 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
                          >
                            {showNewOrder ? "Sluit nieuwe order" : "Nieuwe order"}
                          </button>
                        ) : null}
                      </div>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                      <span>Laatste 200 orders (live uit database).</span>
                      {orderSaveOk ? <span className="text-emerald-300">{orderSaveOk}</span> : null}
                      {orderSaveError ? <span className="text-rose-300">{orderSaveError}</span> : null}
                    </div>
                  </div>

                {showNewOrder ? (
                  <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-indigo-300">Nieuwe order</p>
                        <p className="text-sm text-slate-300">Handmatige order aanmaken zonder Mollie.</p>
                      </div>
                      <div className="text-sm text-slate-200">
                        Totaal: <span className="font-semibold text-white">{formatEur(manualTotal)}</span>
                      </div>
                    </div>
                    <form
                      className="mt-4 grid gap-4"
                      onSubmit={(e) => {
                        e.preventDefault()
                        if (canCreateOrder) createManualOrder()
                      }}
                    >
                      <div className="grid gap-3 sm:grid-cols-2">
                        <label className="grid gap-1 text-sm font-semibold text-white">
                          Klant e-mail
                          <input
                            type="email"
                            value={newOrder.email}
                            onChange={(e) => setNewOrder((prev) => ({ ...prev, email: e.target.value }))}
                            className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
                            placeholder="klant@email.be"
                            required
                          />
                        </label>
                        <label className="grid gap-1 text-sm font-semibold text-white">
                          Status
                          <select
                            value={newOrder.status}
                            onChange={(e) => setNewOrder((prev) => ({ ...prev, status: e.target.value }))}
                            className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
                          >
                            {ORDER_STATUS_OPTIONS.map((status) => (
                              <option key={status} value={status}>
                                {ORDER_STATUS_LABELS[status] ?? status}
                              </option>
                            ))}
                          </select>
                        </label>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <label className="grid gap-1 text-sm font-semibold text-white">
                          Taal
                          <select
                            value={newOrder.locale}
                            onChange={(e) => setNewOrder((prev) => ({ ...prev, locale: e.target.value }))}
                            className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
                          >
                            <option value="nl">NL</option>
                            <option value="en">EN</option>
                          </select>
                        </label>
                        <label className="grid gap-1 text-sm font-semibold text-white">
                          Verzending
                          <select
                            value={newOrder.shippingMethodId}
                            onChange={(e) => setNewOrder((prev) => ({ ...prev, shippingMethodId: e.target.value }))}
                            className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
                          >
                            {shippingMethods.map((method) => (
                              <option key={method.id} value={method.id}>
                                {method.labelNl} ({formatEur(method.priceEur)})
                              </option>
                            ))}
                          </select>
                        </label>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Items</p>
                          <button
                            type="button"
                            onClick={addManualOrderLine}
                            className="rounded-md border border-white/15 bg-white/5 px-2 py-1 text-[11px] font-semibold text-white hover:bg-white/10"
                          >
                            Item toevoegen
                          </button>
                        </div>
                        {newOrder.items.map((item) => (
                          <div key={item.id} className="grid gap-2 sm:grid-cols-[1fr_120px_auto] sm:items-center">
                            <select
                              value={item.productSlug}
                              onChange={(e) => updateManualOrderLine(item.id, "productSlug", e.target.value)}
                              className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
                            >
                              <option value="">Kies product</option>
                              {products.map((product) => (
                                <option key={product.slug} value={product.slug}>
                                  {product.nameNl} ({formatEur(product.priceEur)})
                                </option>
                              ))}
                            </select>
                            <input
                              type="number"
                              min={1}
                              max={100}
                              value={item.quantity}
                              onChange={(e) => updateManualOrderLine(item.id, "quantity", Number(e.target.value))}
                              className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
                            />
                            <button
                              type="button"
                              onClick={() => removeManualOrderLine(item.id)}
                              className="rounded-md border border-white/15 bg-white/5 px-2 py-1 text-[11px] font-semibold text-white hover:bg-white/10"
                            >
                              Verwijder
                            </button>
                          </div>
                        ))}
                      </div>
                      {newOrderError ? <p className="text-sm text-rose-300">{newOrderError}</p> : null}
                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          type="submit"
                          disabled={!canCreateOrder || newOrderSaving}
                          className="inline-flex items-center justify-center rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5 hover:bg-indigo-400 disabled:opacity-60"
                        >
                          {newOrderSaving ? "Aanmaken..." : "Order aanmaken"}
                        </button>
                        <p className="text-xs text-slate-400">
                          Subtotaal {formatEur(manualSubtotal)} + verzending {formatEur(manualShipping)}
                        </p>
                      </div>
                    </form>
                  </div>
                ) : null}

                  <div className="overflow-hidden rounded-xl border border-white/10 bg-black/20">
                    {loadingOrders ? (
                      <div className="p-4 text-sm text-slate-300">Laden...</div>
                    ) : ordersError ? (
                      <div className="p-4 text-sm text-rose-300">{ordersError}</div>
                    ) : visibleOrders.length === 0 ? (
                      <div className="p-4 text-sm text-slate-300">Geen orders gevonden.</div>
                    ) : (
                      <div className="max-h-[70vh] overflow-auto">
                        <table className="min-w-full text-left text-sm">
                          <thead className="sticky top-0 z-10 bg-slate-950/95">
                            <tr className="border-b border-white/10 text-[11px] uppercase tracking-[0.16em] text-slate-400">
                              <th className="px-4 py-3">Order</th>
                              <th className="px-4 py-3">Klant</th>
                              <th className="px-4 py-3">Items</th>
                              <th className="px-4 py-3">Bedrag</th>
                              <th className="px-4 py-3">Status</th>
                              <th className="px-4 py-3">Bron</th>
                              <th className="px-4 py-3">Aangemaakt</th>
                              <th className="px-4 py-3">Acties</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/10">
                            {visibleOrders.map((order) => {
                              const statusKey = (order.status || "").toLowerCase()
                              const statusLabel = ORDER_STATUS_LABELS[statusKey] ?? order.status ?? "Onbekend"
                              const statusClass = ORDER_STATUS_STYLES[statusKey] ?? "border-white/20 bg-white/5 text-white"
                              const createdAt = order.createdAt ? new Date(order.createdAt).toLocaleString() : "-"
                              const isEditing = orderEdit?.id === order.id
                              const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0)

                              return [
                                <tr key={`${order.id}-row`} className={order.archived ? "bg-white/5" : ""}>
                                  <td className="px-4 py-3 align-top">
                                    <p className="font-semibold text-white">{order.orderCode || order.id}</p>
                                    <p className="text-xs text-slate-500">{order.id}</p>
                                    {order.locale ? (
                                      <p className="mt-1 text-xs uppercase tracking-[0.08em] text-slate-400">
                                        {order.locale.toUpperCase()}
                                      </p>
                                    ) : null}
                                  </td>
                                  <td className="px-4 py-3 align-top">
                                    <p className="font-semibold text-white">{order.email}</p>
                                    {order.notes ? (
                                      <p className="mt-1 text-xs text-slate-300">Notitie: {order.notes}</p>
                                    ) : (
                                      <p className="mt-1 text-xs text-slate-500">Geen interne notities</p>
                                    )}
                                  </td>
                                  <td className="px-4 py-3 align-top">
                                    {order.items.length === 0 ? (
                                      <p className="text-xs text-slate-400">Geen items</p>
                                    ) : (
                                      <div className="space-y-1">
                                        <p className="text-xs text-slate-400">{itemCount} stuks</p>
                                        {order.items.slice(0, 2).map((item, idx) => (
                                          <p key={`${order.id}-item-${idx}`} className="text-xs text-slate-200">
                                            {item.name} x{item.quantity}
                                          </p>
                                        ))}
                                        {order.items.length > 2 ? (
                                          <p className="text-xs text-slate-500">+{order.items.length - 2} extra</p>
                                        ) : null}
                                      </div>
                                    )}
                                  </td>
                                  <td className="px-4 py-3 align-top">
                                    <p className="font-semibold text-white">{formatEur(order.totalEur)}</p>
                                    <p className="mt-1 text-xs text-slate-400">{getShippingLabel(order)}</p>
                                  </td>
                                  <td className="px-4 py-3 align-top">
                                    <span className={`rounded-full border px-2 py-1 text-[11px] font-semibold ${statusClass}`}>
                                      {statusLabel}
                                    </span>
                                  </td>
                                  <td className="px-4 py-3 align-top">
                                    <div className="flex flex-col items-start gap-1">
                                      <span className="rounded-full border border-white/15 bg-white/5 px-2 py-1 text-[11px] font-semibold text-white">
                                        {ORDER_SOURCE_LABELS[order.source || "manual"] ?? "Onbekend"}
                                      </span>
                                      {order.archived ? (
                                        <span className="rounded-full border border-white/15 bg-white/5 px-2 py-1 text-[11px] font-semibold text-white">
                                          Archief
                                        </span>
                                      ) : null}
                                    </div>
                                  </td>
                                  <td className="px-4 py-3 align-top text-xs text-slate-300">{createdAt}</td>
                                  <td className="px-4 py-3 align-top">
                                    <div className="flex flex-wrap gap-1.5">
                                      <button
                                        type="button"
                                        onClick={() => (isEditing ? setOrderEdit(null) : openOrderEditor(order))}
                                        className="rounded-md border border-white/20 px-2 py-1 text-[11px] font-semibold text-white transition hover:bg-white/10"
                                      >
                                        {isEditing ? "Sluit bewerken" : "Bewerk order"}
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => toggleOrderArchive(order, !order.archived)}
                                        className="rounded-md border border-white/20 px-2 py-1 text-[11px] font-semibold text-white transition hover:bg-white/10"
                                      >
                                        {order.archived ? "Herstel" : "Archiveer"}
                                      </button>
                                    </div>
                                  </td>
                                </tr>,
                                isEditing && orderEdit ? (
                                  <tr key={`${order.id}-edit`} className="bg-slate-950/40">
                                    <td colSpan={8} className="px-4 py-4">
                                      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                                <div className="grid gap-3 sm:grid-cols-3">
                                  <label className="grid gap-1 text-xs font-semibold text-slate-200">
                                    Status
                                    <select
                                      value={orderEdit.status}
                                      onChange={(e) =>
                                        setOrderEdit((prev) => (prev ? { ...prev, status: e.target.value } : prev))
                                      }
                                      className="rounded-lg border border-white/10 bg-white/10 px-2 py-2 text-sm text-white focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
                                    >
                                      {ORDER_STATUS_OPTIONS.map((status) => (
                                        <option key={status} value={status}>
                                          {ORDER_STATUS_LABELS[status] ?? status}
                                        </option>
                                      ))}
                                    </select>
                                  </label>
                                  <label className="grid gap-1 text-xs font-semibold text-slate-200">
                                    E-mail
                                    <input
                                      type="email"
                                      value={orderEdit.email}
                                      onChange={(e) =>
                                        setOrderEdit((prev) => (prev ? { ...prev, email: e.target.value } : prev))
                                      }
                                      className="rounded-lg border border-white/10 bg-white/10 px-2 py-2 text-sm text-white focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
                                    />
                                  </label>
                                  <label className="grid gap-1 text-xs font-semibold text-slate-200">
                                    Verzending
                                    <select
                                      value={orderEdit.shippingMethodId}
                                      onChange={(e) =>
                                        setOrderEdit((prev) =>
                                          prev ? { ...prev, shippingMethodId: e.target.value } : prev,
                                        )
                                      }
                                      className="rounded-lg border border-white/10 bg-white/10 px-2 py-2 text-sm text-white focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
                                    >
                                      {shippingMethods.map((method) => (
                                        <option key={method.id} value={method.id}>
                                          {method.labelNl} ({formatEur(method.priceEur)})
                                        </option>
                                      ))}
                                    </select>
                                  </label>
                                </div>
                                <div className="mt-4 rounded-lg border border-white/10 bg-black/30 p-3">
                                  <div className="flex flex-wrap items-center justify-between gap-2">
                                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Order items</p>
                                    <button
                                      type="button"
                                      onClick={addEditOrderLine}
                                      className="rounded-md border border-white/15 bg-white/5 px-2 py-1 text-[11px] font-semibold text-white hover:bg-white/10"
                                    >
                                      Item toevoegen
                                    </button>
                                  </div>
                                  <div className="mt-3 space-y-2">
                                    {orderEdit.items.map((item) => (
                                      <div key={item.id} className="grid gap-2 sm:grid-cols-[1fr_120px_auto] sm:items-center">
                                        <select
                                          value={item.productSlug}
                                          onChange={(e) => updateEditOrderLine(item.id, "productSlug", e.target.value)}
                                          className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
                                        >
                                          <option value="">Kies product</option>
                                          {products.map((product) => (
                                            <option key={product.slug} value={product.slug}>
                                              {product.nameNl} ({formatEur(product.priceEur)})
                                            </option>
                                          ))}
                                        </select>
                                        <input
                                          type="number"
                                          min={1}
                                          max={100}
                                          value={item.quantity}
                                          onChange={(e) => updateEditOrderLine(item.id, "quantity", Number(e.target.value))}
                                          className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
                                        />
                                        <button
                                          type="button"
                                          onClick={() => removeEditOrderLine(item.id)}
                                          className="rounded-md border border-white/15 bg-white/5 px-2 py-1 text-[11px] font-semibold text-white hover:bg-white/10"
                                        >
                                          Verwijder
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                  <p className="mt-3 text-xs text-slate-400">
                                    Herberekent prijzen op basis van huidige productlijst.
                                  </p>
                                  <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-300">
                                    <span>Subtotaal: {formatEur(editSubtotal)}</span>
                                    <span>Verzending: {formatEur(editShipping)}</span>
                                    <span className="font-semibold text-white">Totaal: {formatEur(editTotal)}</span>
                                  </div>
                                </div>
                                <label className="mt-3 grid gap-1 text-xs font-semibold text-slate-200">
                                  Notities
                                  <textarea
                                    value={orderEdit.notes}
                                    onChange={(e) =>
                                      setOrderEdit((prev) => (prev ? { ...prev, notes: e.target.value } : prev))
                                    }
                                    rows={3}
                                    className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
                                    placeholder="Interne notitie"
                                  />
                                </label>
                                <label className="mt-3 grid gap-1 text-xs font-semibold text-slate-200">
                                  Status note (optioneel)
                                  <textarea
                                    value={orderEdit.timelineNote}
                                    onChange={(e) =>
                                      setOrderEdit((prev) => (prev ? { ...prev, timelineNote: e.target.value } : prev))
                                    }
                                    rows={2}
                                    className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
                                    placeholder="Note over status of opvolging"
                                  />
                                </label>
                                <div className="mt-4 rounded-lg border border-white/10 bg-black/30 p-3">
                                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Timeline</p>
                                  {orderEdit.timeline.length === 0 ? (
                                    <p className="mt-2 text-sm text-slate-300">Nog geen statusnotities.</p>
                                  ) : (
                                    <div className="mt-2 space-y-2">
                                      {orderEdit.timeline
                                        .slice()
                                        .reverse()
                                        .slice(0, 8)
                                        .map((entry, idx) => (
                                          <div
                                            key={`${entry.ts}-${idx}`}
                                            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200"
                                          >
                                            <div className="flex flex-wrap items-center gap-2">
                                              <span className="text-[11px] uppercase tracking-[0.2em] text-indigo-300">
                                                {entry.ts}
                                              </span>
                                              <span className="rounded-full border border-white/20 px-2 py-0.5 text-[10px] font-semibold text-white">
                                                {ORDER_STATUS_LABELS[entry.status] ?? entry.status}
                                              </span>
                                            </div>
                                            {entry.note ? (
                                              <p className="mt-1 text-xs text-slate-300">{entry.note}</p>
                                            ) : null}
                                          </div>
                                        ))}
                                    </div>
                                  )}
                                </div>
                                <div className="mt-3 flex flex-wrap items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={saveOrderEdit}
                                    disabled={orderSaving || orderEdit.items.some((item) => item.productSlug.trim() === "")}
                                    className="inline-flex items-center justify-center rounded-xl bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5 hover:bg-indigo-400 disabled:opacity-60"
                                  >
                                    {orderSaving ? "Opslaan..." : "Opslaan"}
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => resendOrderEmails(orderEdit.id)}
                                    disabled={orderSaving}
                                    className="rounded-md border border-white/20 px-2 py-1 text-[11px] font-semibold text-white transition hover:bg-white/10"
                                  >
                                    Resend emails
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setOrderEdit(null)}
                                    className="rounded-md border border-white/20 px-2 py-1 text-[11px] font-semibold text-white transition hover:bg-white/10"
                                  >
                                    Sluiten
                                  </button>
                                </div>
                                      </div>
                                    </td>
                                  </tr>
                                ) : null,
                              ]
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : tab === "products" ? (
              <>
                <HeroMetrics
                  columns={4}
                  items={[
                    { label: "Totaal", value: productTotals.total },
                    { label: "Live", value: productTotals.live },
                    { label: "Verborgen", value: productTotals.hidden },
                    { label: "Verwijderd", value: productTotals.deleted },
                  ]}
                />

                {productError ? <p className="mt-3 text-sm text-rose-300">{productError}</p> : null}
                {productSuccess ? <p className="mt-2 text-sm text-emerald-300">{productSuccess}</p> : null}

                <div className="mt-6 space-y-4">
                  <div className="sticky top-6 z-20 rounded-xl border border-white/10 bg-slate-950/90 p-4 backdrop-blur">
                    <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                      <input
                        type="search"
                        placeholder="Filter op slug of naam"
                        value={productSearch}
                        onChange={(e) => setProductSearch(e.target.value)}
                        className="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 xl:max-w-md"
                      />
                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={openCreateProductModal}
                          className="rounded-lg border border-indigo-300/30 bg-indigo-500/20 px-3 py-2 text-xs font-semibold text-indigo-100 transition hover:bg-indigo-500/30"
                        >
                          Nieuw product
                        </button>
                        <label className="flex items-center gap-2 text-xs font-semibold text-white">
                          <input
                            type="checkbox"
                            checked={showDeletedProducts}
                            onChange={(e) => setShowDeletedProducts(e.target.checked)}
                            className="h-4 w-4 rounded border-white/30 bg-transparent text-indigo-400 focus:ring-indigo-400"
                          />
                          Toon verwijderd
                        </label>
                        <button
                          type="button"
                          onClick={reloadProducts}
                          className="rounded-lg border border-white/20 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
                        >
                          Refresh
                        </button>
                        <button
                          type="button"
                          onClick={syncStarterCatalog}
                          disabled={productSaving}
                          className="rounded-lg border border-emerald-300/30 bg-emerald-500/15 px-3 py-2 text-xs font-semibold text-emerald-100 transition hover:bg-emerald-500/25 disabled:opacity-60"
                        >
                          Sync startercatalogus
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-xl border border-white/10 bg-black/20">
                    {productLoading ? (
                      <div className="p-4 text-sm text-slate-300">Laden...</div>
                    ) : filteredProducts.length === 0 ? (
                      <div className="p-4 text-sm text-slate-300">Geen producten gevonden.</div>
                    ) : (
                      <div className="max-h-[70vh] overflow-auto">
                        <table className="min-w-full text-left text-sm">
                          <thead className="sticky top-0 z-10 bg-slate-950/95">
                            <tr className="border-b border-white/10 text-[11px] uppercase tracking-[0.16em] text-slate-400">
                              <th className="px-4 py-3">Product</th>
                              <th className="px-4 py-3">Prijs</th>
                              <th className="px-4 py-3">Voorraadstatus</th>
                              <th className="px-4 py-3">Stock</th>
                              <th className="px-4 py-3">Koopmodus</th>
                              <th className="px-4 py-3">Lead time</th>
                              <th className="px-4 py-3">Status</th>
                              <th className="px-4 py-3">Acties</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/10">
                            {filteredProducts.map((product) => {
                              const isDeleted = product.isDeleted
                              const fieldDisabled = productSaving || isDeleted
                              const statusClass = product.isLive
                                ? "border-emerald-400/60 bg-emerald-400/10 text-emerald-100"
                                : "border-white/20 bg-white/5 text-white/70"

                              return (
                                <tr key={product.slug} className={isDeleted ? "bg-rose-950/10" : ""}>
                                  <td className="px-4 py-3 align-top">
                                    <p className="font-semibold text-white">{product.nameNl || product.slug}</p>
                                    <p className="text-xs text-slate-400">{product.slug}</p>
                                    <p className="mt-1 text-xs text-slate-500">{product.nameEn}</p>
                                  </td>
                                  <td className="px-4 py-3 align-top">
                                    <input
                                      type="number"
                                      min={0}
                                      step="0.01"
                                      value={product.priceEur}
                                      onChange={(e) => updateProductField(product.slug, "priceEur", e.target.value)}
                                      disabled={fieldDisabled}
                                      className="w-28 rounded-lg border border-white/10 bg-white/10 px-2 py-1.5 text-sm text-white focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                    />
                                  </td>
                                  <td className="px-4 py-3 align-top">
                                    <select
                                      value={product.availability}
                                      onChange={(e) => updateProductField(product.slug, "availability", e.target.value)}
                                      disabled={fieldDisabled}
                                      className="w-44 rounded-lg border border-white/10 bg-white/10 px-2 py-1.5 text-sm text-white focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                    >
                                      {PRODUCT_AVAILABILITY_OPTIONS.map((option) => (
                                        <option key={option.value} value={option.value}>
                                          {option.label}
                                        </option>
                                      ))}
                                    </select>
                                  </td>
                                  <td className="px-4 py-3 align-top">
                                    <input
                                      type="number"
                                      min={0}
                                      step="1"
                                      value={product.stockCount}
                                      onChange={(e) => updateProductField(product.slug, "stockCount", e.target.value)}
                                      disabled={fieldDisabled}
                                      className="w-24 rounded-lg border border-white/10 bg-white/10 px-2 py-1.5 text-sm text-white focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                      placeholder="-"
                                    />
                                  </td>
                                  <td className="px-4 py-3 align-top">
                                    <select
                                      value={product.purchaseMode}
                                      onChange={(e) => updateProductField(product.slug, "purchaseMode", e.target.value as ProductDraft["purchaseMode"])}
                                      disabled={fieldDisabled}
                                      className="w-44 rounded-lg border border-white/10 bg-white/10 px-2 py-1.5 text-sm text-white focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                    >
                                      {PRODUCT_PURCHASE_MODE_OPTIONS.map((option) => (
                                        <option key={option.value} value={option.value}>
                                          {option.label}
                                        </option>
                                      ))}
                                    </select>
                                  </td>
                                  <td className="px-4 py-3 align-top text-xs text-slate-300">
                                    {product.leadTimeMin || product.leadTimeMax
                                      ? `${product.leadTimeMin || 0}-${product.leadTimeMax || product.leadTimeMin || 0} dagen`
                                      : "-"}
                                  </td>
                                  <td className="px-4 py-3 align-top">
                                    {isDeleted ? (
                                      <span className="rounded-full border border-rose-400/60 bg-rose-500/10 px-2 py-0.5 text-[11px] font-semibold text-rose-100">
                                        Verwijderd
                                      </span>
                                    ) : (
                                      <span className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${statusClass}`}>
                                        {product.isLive ? "Live" : "Verborgen"}
                                      </span>
                                    )}
                                  </td>
                                  <td className="px-4 py-3 align-top">
                                    <div className="flex flex-wrap gap-1.5">
                                      {!isDeleted ? (
                                        <>
                                          <button
                                            type="button"
                                            onClick={() => saveInlineProduct(product.slug)}
                                            disabled={productSaving}
                                            className="rounded-md border border-indigo-400/40 px-2 py-1 text-[11px] font-semibold text-indigo-100 transition hover:bg-indigo-500/20 disabled:opacity-60"
                                          >
                                            Inline opslaan
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() => toggleProductVisibility(product.slug, !product.isLive)}
                                            disabled={productSaving}
                                            className="rounded-md border border-white/20 px-2 py-1 text-[11px] font-semibold text-white transition hover:bg-white/10 disabled:opacity-60"
                                          >
                                            {product.isLive ? "Verberg" : "Publiceer"}
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() => softDeleteProduct(product.slug)}
                                            disabled={productSaving}
                                            className="rounded-md border border-amber-400/40 px-2 py-1 text-[11px] font-semibold text-amber-100 transition hover:bg-amber-500/20 disabled:opacity-60"
                                          >
                                            Archiveer
                                          </button>
                                        </>
                                      ) : (
                                        <button
                                          type="button"
                                          onClick={() => restoreProduct(product.slug)}
                                          disabled={productSaving}
                                          className="rounded-md border border-emerald-400/40 px-2 py-1 text-[11px] font-semibold text-emerald-100 transition hover:bg-emerald-500/20 disabled:opacity-60"
                                        >
                                          Herstel
                                        </button>
                                      )}
                                      <button
                                        type="button"
                                        onClick={() => openEditProductModal(product.slug)}
                                        disabled={productSaving || isDeleted}
                                        className="rounded-md border border-indigo-300/30 px-2 py-1 text-[11px] font-semibold text-indigo-100 transition hover:bg-indigo-500/20 disabled:opacity-50"
                                      >
                                        Bewerk
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => duplicateProduct(product.slug)}
                                        disabled={productSaving}
                                        className="rounded-md border border-white/20 px-2 py-1 text-[11px] font-semibold text-white transition hover:bg-white/10 disabled:opacity-60"
                                      >
                                        Dupliceer
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => deleteProduct(product.slug)}
                                        disabled={productSaving}
                                        className="rounded-md border border-rose-400/40 px-2 py-1 text-[11px] font-semibold text-rose-200 transition hover:bg-rose-500/20 disabled:opacity-60"
                                      >
                                        Permanent
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <HeroMetrics
                  items={[
                    { label: "Spoelen", value: stockTotals.items },
                    { label: "Laag (<250g)", value: stockTotals.low },
                    { label: "Totaal gram", value: stockTotals.grams },
                  ]}
                />

                <div className="mt-6 rounded-xl border border-white/10 bg-black/20 p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Website voorraad</p>
                      <p className="text-sm text-slate-200">
                        Toggle inStock voor lib/materials.ts (bewaard in beveiligde CRM-data via PHP).
                      </p>
                    </div>
                    {materialError ? <p className="text-xs font-semibold text-rose-300">{materialError}</p> : null}
                  </div>
                  {materialLoading ? (
                    <p className="mt-3 text-sm text-slate-300">Laden...</p>
                  ) : (
                    <div className="mt-4 max-h-[42vh] overflow-auto rounded-lg border border-white/10">
                      <table className="min-w-full text-left text-sm">
                        <thead className="sticky top-0 z-10 bg-slate-950/95">
                          <tr className="border-b border-white/10 text-[11px] uppercase tracking-[0.16em] text-slate-400">
                            <th className="px-4 py-3">Materiaal</th>
                            <th className="px-4 py-3">Kleuren</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                          {MATERIAL_ORDER.map((key) => {
                            const mat = MATERIALS[key]
                            const overrides = materialOverrides[key] || {}

                            return (
                              <tr key={key}>
                                <td className="px-4 py-3 align-top">
                                  <p className="font-semibold text-white">{mat.name}</p>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <div className="flex flex-wrap gap-2">
                                    {mat.swatches.map((swatch) => {
                                      const active =
                                        typeof overrides[swatch.label] === "boolean" ? overrides[swatch.label] : swatch.inStock
                                      return (
                                        <div key={swatch.label} className="flex items-center gap-2">
                                          <button
                                            type="button"
                                            onClick={() => toggleMaterialStock(key, swatch.label, !active)}
                                            className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                                              active
                                                ? "border-emerald-400/60 bg-emerald-400/10 text-emerald-100"
                                                : "border-white/15 bg-white/5 text-white hover:bg-white/10"
                                            }`}
                                            title={swatch.label}
                                          >
                                            {swatch.label} {active ? "OK" : "*"}
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() => resetMaterialStock(key, swatch.label)}
                                            className="rounded-full border border-white/15 bg-white/5 px-2 py-1 text-[11px] text-white transition hover:bg-white/10"
                                            title="Reset naar default"
                                          >
                                            Reset
                                          </button>
                                        </div>
                                      )
                                    })}
                                  </div>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                <div className="mt-6 grid gap-4 lg:grid-cols-[.9fr_1.1fr]">
                  <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                    <form className="grid gap-3" onSubmit={addStockItem}>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <label className="grid gap-1 text-sm font-semibold text-white">
                          Materiaal
                          <input
                            value={stockForm.material}
                            onChange={(e) => handleStockInput("material", e.target.value)}
                            required
                            className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
                            placeholder="PLA Matte, PETG..."
                          />
                        </label>
                        <label className="grid gap-1 text-sm font-semibold text-white">
                          Kleur
                          <input
                            value={stockForm.color}
                            onChange={(e) => handleStockInput("color", e.target.value)}
                            required
                            className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
                            placeholder="Zwart, Wit, Neon..."
                          />
                        </label>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-3">
                        <label className="grid gap-1 text-sm font-semibold text-white">
                          Diameter
                          <select
                            value={stockForm.diameter}
                            onChange={(e) => handleStockInput("diameter", e.target.value)}
                            className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
                          >
                            <option value="1.75mm">1.75mm</option>
                            <option value="2.85mm">2.85mm</option>
                          </select>
                        </label>
                        <label className="grid gap-1 text-sm font-semibold text-white">
                          Voorraad (g)
                          <input
                            type="number"
                            min={0}
                            value={stockForm.availableGrams}
                            onChange={(e) => handleStockInput("availableGrams", e.target.value)}
                            required
                            className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
                            placeholder="750"
                          />
                        </label>
                        <label className="grid gap-1 text-sm font-semibold text-white">
                          Leverancier
                          <input
                            value={stockForm.supplier}
                            onChange={(e) => handleStockInput("supplier", e.target.value)}
                            className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
                            placeholder="Prusament, Colorfabb..."
                          />
                        </label>
                      </div>
                      <label className="grid gap-1 text-sm font-semibold text-white">
                        Notities
                        <textarea
                          value={stockForm.notes}
                          onChange={(e) => handleStockInput("notes", e.target.value)}
                          rows={3}
                          className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
                          placeholder="Gebruik alleen voor functionele prints, matte finish, etc."
                        />
                      </label>
                      <div className="flex items-center gap-2">
                        <button
                          type="submit"
                          className="inline-flex items-center justify-center rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5 hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-300"
                        >
                          Voeg toe
                        </button>
                        <p className="text-xs text-slate-400">Opslag: lokaal in je browser.</p>
                      </div>
                    </form>
                  </div>

                  <div className="space-y-4">
                    <div className="sticky top-6 z-20 rounded-xl border border-white/10 bg-slate-950/90 p-4 backdrop-blur">
                      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                        <input
                          type="search"
                          placeholder="Filter op materiaal, kleur, leverancier of notities"
                          value={stockSearch}
                          onChange={(e) => setStockSearch(e.target.value)}
                          className="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 xl:max-w-md"
                        />
                        <div className="flex flex-wrap items-center gap-3">
                          <label className="flex items-center gap-2 text-xs font-semibold text-white">
                            <input
                              type="checkbox"
                              checked={lowOnly}
                              onChange={(e) => setLowOnly(e.target.checked)}
                              className="h-4 w-4 rounded border-white/30 bg-transparent text-indigo-400 focus:ring-indigo-400"
                            />
                            Enkel laag op voorraad
                          </label>
                          <button
                            type="button"
                            onClick={() => applyBulkStockDelta(50)}
                            disabled={selectedStockIds.length === 0}
                            className="rounded-md border border-white/20 px-2 py-1 text-[11px] font-semibold text-white transition hover:bg-white/10 disabled:opacity-50"
                          >
                            +50g selectie
                          </button>
                          <button
                            type="button"
                            onClick={() => applyBulkStockDelta(-50)}
                            disabled={selectedStockIds.length === 0}
                            className="rounded-md border border-white/20 px-2 py-1 text-[11px] font-semibold text-white transition hover:bg-white/10 disabled:opacity-50"
                          >
                            -50g selectie
                          </button>
                          <button
                            type="button"
                            onClick={removeSelectedStock}
                            disabled={selectedStockIds.length === 0}
                            className="rounded-md border border-rose-400/40 px-2 py-1 text-[11px] font-semibold text-rose-200 transition hover:bg-rose-500/20 disabled:opacity-50"
                          >
                            Verwijder selectie
                          </button>
                          <button
                            type="button"
                            onClick={clearSelectedStock}
                            disabled={selectedStockIds.length === 0}
                            className="rounded-md border border-white/20 px-2 py-1 text-[11px] font-semibold text-white transition hover:bg-white/10 disabled:opacity-50"
                          >
                            Wis selectie
                          </button>
                        </div>
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                        <span>{sortedStock.length} zichtbare voorraaditems.</span>
                        <span>{stockTotals.low} onder 250 g.</span>
                        <span>{selectedStockIds.length} geselecteerd.</span>
                      </div>
                    </div>

                    <div className="overflow-hidden rounded-xl border border-white/10 bg-black/20">
                      {sortedStock.length === 0 ? (
                        <p className="p-4 text-sm text-slate-300">Geen items.</p>
                      ) : (
                        <div className="max-h-[70vh] overflow-auto">
                          <table className="min-w-full text-left text-sm">
                            <thead className="sticky top-0 z-10 bg-slate-950/95">
                              <tr className="border-b border-white/10 text-[11px] uppercase tracking-[0.16em] text-slate-400">
                                <th className="px-4 py-3">
                                  <input
                                    type="checkbox"
                                    checked={allVisibleStockSelected}
                                    onChange={toggleSelectAllVisibleStock}
                                    className="h-4 w-4 rounded border-white/30 bg-transparent text-indigo-400 focus:ring-indigo-400"
                                    aria-label="Selecteer alle zichtbare voorraaditems"
                                  />
                                </th>
                                <th className="px-4 py-3">Materiaal</th>
                                <th className="px-4 py-3">Kleur</th>
                                <th className="px-4 py-3">Diameter</th>
                                <th className="px-4 py-3">Leverancier</th>
                                <th className="px-4 py-3">Voorraad</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Laatste update</th>
                                <th className="px-4 py-3">Notities</th>
                                <th className="px-4 py-3">Acties</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                              {sortedStock.map((item) => {
                                const isLow = item.availableGrams <= 250
                                const isSelected = selectedStockIds.includes(item.id)
                                return (
                                  <tr key={item.id} className={isSelected ? "bg-indigo-950/25" : isLow ? "bg-amber-950/10" : ""}>
                                    <td className="px-4 py-3 align-top">
                                      <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={() => toggleStockSelection(item.id)}
                                        className="h-4 w-4 rounded border-white/30 bg-transparent text-indigo-400 focus:ring-indigo-400"
                                        aria-label={`Selecteer ${item.material} ${item.color}`}
                                      />
                                    </td>
                                    <td className="px-4 py-3 align-top font-semibold text-white">{item.material}</td>
                                    <td className="px-4 py-3 align-top text-slate-100">{item.color}</td>
                                    <td className="px-4 py-3 align-top text-xs text-slate-300">{item.diameter}</td>
                                    <td className="px-4 py-3 align-top text-xs text-slate-300">{item.supplier || "Onbekend"}</td>
                                    <td className="px-4 py-3 align-top">
                                      <div className="flex flex-wrap items-center gap-2">
                                        <input
                                          type="number"
                                          min={0}
                                          value={item.availableGrams}
                                          onChange={(e) => setStockAmount(item.id, Number(e.target.value))}
                                          className="w-24 rounded-lg border border-white/10 bg-white/10 px-2 py-1 text-sm text-white focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                        />
                                        <button
                                          type="button"
                                          onClick={() => updateStockAmount(item.id, 50)}
                                          className="rounded-md border border-white/15 px-2 py-1 text-[11px] text-white hover:bg-white/10"
                                        >
                                          +50
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => updateStockAmount(item.id, -50)}
                                          className="rounded-md border border-white/15 px-2 py-1 text-[11px] text-white hover:bg-white/10"
                                        >
                                          -50
                                        </button>
                                      </div>
                                    </td>
                                    <td className="px-4 py-3 align-top">
                                      <span
                                        className={`rounded-full border px-2 py-1 text-[11px] font-semibold ${
                                          isLow
                                            ? "border-amber-400/50 bg-amber-500/10 text-amber-100"
                                            : "border-emerald-400/50 bg-emerald-500/10 text-emerald-100"
                                        }`}
                                      >
                                        {isLow ? "Laag" : "OK"}
                                      </span>
                                    </td>
                                    <td className="px-4 py-3 align-top text-xs text-slate-300">
                                      {new Date(item.updatedAt).toLocaleString()}
                                    </td>
                                    <td className="px-4 py-3 align-top text-xs text-slate-300">
                                      {item.notes ? (item.notes.length > 100 ? `${item.notes.slice(0, 100)}...` : item.notes) : "-"}
                                    </td>
                                    <td className="px-4 py-3 align-top">
                                      <button
                                        type="button"
                                        onClick={() => removeStock(item.id)}
                                        className="rounded-md border border-white/20 px-2 py-1 text-[11px] font-semibold text-white transition hover:bg-white/10"
                                      >
                                        Verwijder
                                      </button>
                                    </td>
                                  </tr>
                                )
                              })}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
              </div>
            </div>
            <ProductModal
              open={Boolean(productModal)}
              mode={productModal?.mode ?? "create"}
              draft={productModalDraft}
              saving={productSaving}
              canSubmit={hasRequiredProductFields(productModalDraft, productModal?.mode === "create")}
              onClose={closeProductModal}
              onSubmit={submitProductModal}
              onChange={updateProductModalField}
            />
          </section>
        )}
      </div>
    </main>
  )
}
