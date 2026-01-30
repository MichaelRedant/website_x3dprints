"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import ShimmerButton from "./ShimmerButton"
import type { OrganizerBundle, OrganizerSlug } from "@/lib/organizers"
import { buildOrganizerContactHref, organizerSlug } from "@/lib/organizers"

type OrganizerBundlesProps = {
  systemSlug: OrganizerSlug
  systemName: string
  bundles: OrganizerBundle[]
}

export default function OrganizerBundles({ systemSlug, systemName, bundles }: OrganizerBundlesProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="mx-auto max-w-6xl space-y-8">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">Productvormen</p>
          <h2 className="text-balance text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Kies een bundel of ga custom
          </h2>
          <p className="mt-2 max-w-2xl text-slate-700">
            {systemName} zonder keuzestress: vooraf samengestelde indelingen die al getest zijn, plus een custom optie
            wanneer je iets speciaals wil fixen.
          </p>
        </div>
        <Link
          href={`/materials#material-suggestion-tool`}
          className="text-sm font-semibold text-cyan-700 underline-offset-4 hover:text-cyan-900 hover:underline"
        >
          Naar de Material Suggestion Tool
        </Link>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {bundles.map((bundle, index) => {
          const contactHref = buildOrganizerContactHref(systemSlug, organizerSlug(bundle.slug))
          const delay = prefersReducedMotion ? 0 : Math.min(index * 0.08, 0.32)

          return (
            <motion.article
              key={bundle.slug}
              className="group relative flex h-full flex-col justify-between rounded-2xl border border-slate-100 bg-white/80 p-5 shadow-lg shadow-slate-900/5 ring-1 ring-white/70 backdrop-blur transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-[#0B0F1A]/80 dark:ring-0"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, ease: "easeOut", delay }}
            >
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{bundle.name}</h3>
                <p className="text-sm text-slate-700 dark:text-slate-300">{bundle.description}</p>

                {bundle.perks && (
                  <ul className="grid gap-2 text-sm text-slate-700 dark:text-slate-200">
                    {bundle.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2">
                        <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-cyan-500" aria-hidden="true" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {bundle.idealFor.length > 0 && (
                  <div className="rounded-xl bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 ring-1 ring-slate-100 dark:bg-[#0f162c] dark:text-slate-200 dark:ring-0">
                    Ideaal voor: {bundle.idealFor.join(" · ")}
                  </div>
                )}
              </div>

              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <ShimmerButton href={contactHref} className="w-full sm:w-auto justify-center">
                  Stel samen
                </ShimmerButton>
                <Link
                  href={buildOrganizerContactHref(systemSlug)}
                  className="text-sm font-semibold text-cyan-700 underline-offset-4 hover:text-cyan-900 hover:underline dark:text-cyan-200 dark:hover:text-cyan-100"
                >
                  Vraag andere indeling
                </Link>
              </div>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}
