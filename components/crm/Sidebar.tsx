"use client"

import Link from "next/link"
import type { CrmTab } from "@/lib/crm/types"

type CrmSidebarProps = {
  ordersOnly: boolean
  activeTab: CrmTab
  onTabChange: (tab: CrmTab) => void
  onExportContactCsv: () => void
  onLogout: () => void
  dataEndpoint: string
}

const NAV_ITEMS: Array<{ key: CrmTab; label: string }> = [
  { key: "contact", label: "Contact" },
  { key: "orders", label: "Orders" },
  { key: "products", label: "Producten" },
  { key: "stock", label: "Filament" },
]

export default function CrmSidebar({
  ordersOnly,
  activeTab,
  onTabChange,
  onExportContactCsv,
  onLogout,
  dataEndpoint,
}: CrmSidebarProps) {
  return (
    <aside className="h-max rounded-2xl border border-white/10 bg-white/5 p-6 lg:sticky lg:top-10">
      {ordersOnly ? (
        <div className="space-y-4">
          <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-5 py-3 text-base font-semibold text-white">
            Orders hub
          </span>
          <Link
            href="/crm"
            className="inline-flex w-full items-center justify-center rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Naar CRM overzicht
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Navigatie</p>
          <div className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => onTabChange(item.key)}
                className={`w-full rounded-2xl px-5 py-3 text-left text-base font-semibold transition ${
                  activeTab === item.key
                    ? "bg-white text-slate-900 shadow"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 space-y-2 border-t border-white/10 pt-5">
        {activeTab === "contact" ? (
          <>
            <button
              type="button"
              onClick={onExportContactCsv}
              className="w-full rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Exporteer CSV
            </button>
            <a
              href={`${dataEndpoint}?type=logs&download=1`}
              className="inline-flex w-full items-center justify-center rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
              target="_blank"
              rel="noreferrer"
            >
              Download log
            </a>
          </>
        ) : null}

        {activeTab === "orders" ? (
          <a
            href={`${dataEndpoint}?type=orders&download=1`}
            className="inline-flex w-full items-center justify-center rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            target="_blank"
            rel="noreferrer"
          >
            Download orders
          </a>
        ) : null}

        <button
          type="button"
          onClick={onLogout}
          className="w-full rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Afmelden
        </button>
      </div>
    </aside>
  )
}
