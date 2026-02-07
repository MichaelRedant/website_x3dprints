import Link from "next/link"
import { cn } from "@/lib/utils"

type ContentTableOfContentsItem = {
  id: string
  label: string
}

type ContentTableOfContentsProps = {
  items: ContentTableOfContentsItem[]
  title: string
  className?: string
}

export default function ContentTableOfContents({
  items,
  title,
  className,
}: ContentTableOfContentsProps) {
  if (items.length < 2) return null

  return (
    <aside
      className={cn(
        "rounded-2xl border border-slate-200/80 bg-white/80 p-5 text-sm shadow-sm backdrop-blur",
        className,
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{title}</p>
      <nav aria-label={title} className="mt-3">
        <ol className="space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <Link
                href={`#${item.id}`}
                className="text-slate-700 underline decoration-slate-300 underline-offset-4 transition hover:text-slate-900 hover:decoration-indigo-500"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ol>
      </nav>
    </aside>
  )
}
