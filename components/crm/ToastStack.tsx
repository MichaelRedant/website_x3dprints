"use client"

export type CrmToast = {
  id: string
  message: string
  tone: "success" | "error" | "info"
}

type ToastStackProps = {
  toasts: CrmToast[]
  onDismiss: (id: string) => void
}

const TOAST_STYLES: Record<CrmToast["tone"], string> = {
  success: "border-emerald-400/40 bg-emerald-500/10 text-emerald-100",
  error: "border-rose-400/40 bg-rose-500/10 text-rose-100",
  info: "border-indigo-400/40 bg-indigo-500/10 text-indigo-100",
}

export default function ToastStack({ toasts, onDismiss }: ToastStackProps) {
  if (!toasts.length) return null

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-50 flex w-full max-w-sm flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto rounded-xl border px-3 py-2 text-sm font-medium shadow-xl ${TOAST_STYLES[toast.tone]}`}
          role="status"
          aria-live="polite"
        >
          <div className="flex items-start justify-between gap-3">
            <p>{toast.message}</p>
            <button
              type="button"
              onClick={() => onDismiss(toast.id)}
              className="rounded border border-white/20 px-1.5 py-0.5 text-xs text-white/90 transition hover:bg-white/10"
              aria-label="Sluit melding"
            >
              Sluit
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
