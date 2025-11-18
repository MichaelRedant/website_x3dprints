// components/Faq.tsx
import React from "react"

interface FaqItem {
  q: string
  /** Mag HTML bevatten (links naar /materials, /pricing, …) */
  a: string
}

interface Props {
  city: string
  items: FaqItem[]
  className?: string
}

/** Simpele slugifier voor anchor-id’s */
function toId(s: string) {
  return s.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/(^-|-$)/g, "")
}

/** Mini helper om HTML te strippen voor microdata fallback */
function stripTags(html: string) {
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim()
}

export default function Faq({ city, items, className = "" }: Props) {
  return (
    <section
      aria-labelledby="faq-title"
      className={["relative mx-auto max-w-3xl", className].join(" ")}
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      <div
        className="
          rounded-3xl bg-white/55 p-6 sm:p-8 ring-1 ring-white/30 backdrop-blur-xl shadow-glass
          animate-[fadeInUp_.6s_ease_out_0s_both]
        "
      >
        <h2 id="faq-title" className="text-xl font-extrabold tracking-tight text-slate-900">
          Veelgestelde vragen over 3D printen in {city}
        </h2>

        <ul className="mt-6 space-y-3">
          {items.map(({ q, a }, i) => {
            const id = toId(q)
            return (
              <li
                key={id}
                className="
                  rounded-2xl border border-white/30 bg-white/65 p-0 backdrop-blur
                  transition-[transform,box-shadow] duration-300
                  hover:-translate-y-0.5 hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)]
                  animate-[fadeInUp_.6s_ease_out_0s_both]
                "
                style={{ animationDelay: `${Math.min(i * 60, 360)}ms` }}
              >
                <details
                  className="group rounded-2xl"
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <summary
                    id={id}
                    className="
                      flex cursor-pointer select-none items-center justify-between gap-3 rounded-2xl px-4 py-3 text-left
                      font-semibold text-slate-900 outline-none
                      transition-colors hover:bg-white/70
                      focus-visible:ring-2 focus-visible:ring-cyan-400/60
                    "
                    aria-controls={`${id}-panel`}
                  >
                    <span itemProp="name" className="text-[15px] leading-6">
                      {q}
                    </span>
                    <svg
                      className="size-5 shrink-0 text-slate-500 transition-transform duration-300 group-open:rotate-180"
                      viewBox="0 0 20 20"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M6 8l4 4 4-4"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </summary>

                  {/* Smooth content reveal zonder JS: grid-rows trick */}
                  <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-open:grid-rows-[1fr]">
                    <div
                      id={`${id}-panel`}
                      className="overflow-hidden px-4 pb-4 pt-1 text-sm text-slate-700"
                      itemScope
                      itemProp="acceptedAnswer"
                      itemType="https://schema.org/Answer"
                    >
                      <div
                        className="
                          prose prose-slate max-w-none text-[15px] leading-7
                          prose-a:underline prose-a:decoration-cyan-500 prose-a:underline-offset-4 hover:prose-a:text-slate-900
                        "
                        // HTML toelaten voor interne links en opmaak
                        dangerouslySetInnerHTML={{ __html: a }}
                      />
                      {/* Tekstversie voor microdata parsers die innerHTML negeren */}
                      <meta itemProp="text" content={stripTags(a)} />
                    </div>
                  </div>
                </details>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Soft glow hairline */}
      <div className="pointer-events-none absolute inset-x-0 -top-1 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />

      {/* Keyframes + reduced motion */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes fadeInUp {
            from { opacity: .0; transform: translateY(8px) }
            to   { opacity: 1;  transform: translateY(0) }
          }
          @media (prefers-reduced-motion: reduce) {
            * { transition: none !important; animation: none !important }
          }
        `,
        }}
      />
    </section>
  )
}
