"use client"

// components/Footer.tsx
import Link from "next/link"
import Image from "next/image"
import Container from "./Container"
import FooterLocationFinder from "./FooterLocationFinder"
import CookieSettingsButton from "./CookieSettingsButton"
import { useLocale } from "./LocaleProvider"
import { localizeHref } from "@/lib/i18n/paths"

const socials = [
  { href: "https://www.linkedin.com/in/michael-redant/", label: "LinkedIn", icon: "linkedin" },
  { href: "https://www.instagram.com/x3d_prints/", label: "Instagram", icon: "instagram" },
]

const googleReviewLink = "https://g.page/r/CSpxVPgHhTzZEAE/review"

const COPY = {
  nl: {
    cta: {
      title: "Klaar om te printen?",
      body: "Stuur je STL/STEP en ontvang snel een transparante offerte.",
      button: "Offerte aanvragen",
    },
    brand: {
      description:
        "3D-printstudio uit Herzele (regio Gent). Prototypes en zowel kleine als grotere series met nette afwerking. Onderdeel van Xinudesign.",
    },
    contact: {
      title: "Contact",
      location: "Herzele, Oost-Vlaanderen",
      review: "Deel je Google review",
    },
    links: {
      title: "Links",
      items: [
        { label: "Services", href: "/services" },
        { label: "3D printen", href: "/3d-printen" },
        { label: "Materialen", href: "/materials" },
        { label: "Organizers", href: "/organizers" },
        { label: "Portfolio", href: "/portfolio" },
        { label: "Segmenten", href: "/segments" },
        { label: "Cases", href: "/cases" },
        { label: "Blog & kennisbank", href: "/blog" },
        { label: "3D modelleren", href: "/3d-modelleren" },
        { label: "3D modellen vinden", href: "/3d-modellen-vinden" },
        { label: "Duurzaamheid", href: "/sustainability" },
        { label: "Over ons", href: "/about" },
        { label: "Prijzen", href: "/pricing" },
        { label: "FAQ", href: "/faq" },
        { label: "Privacybeleid", href: "/privacy" },
        { label: "Algemene voorwaarden", href: "/algemene-voorwaarden" },
        { label: "Cookiebeleid", href: "/cookies" },
        { label: "Sitemap", href: "/sitemap.xml", external: true },
      ],
    },
    local: {
      title: "Lokale pagina's",
      body: "Vind je stad zonder lange lijsten. Zoek en filter per letter.",
    },
    copyright: "Alle rechten voorbehouden.",
    pixapop: {
      title: "Pixapop-partner",
      body: "Gebrouwen door je favoriete Pixapop-partner in crime (extra koffie inbegrepen).",
    },
  },
  en: {
    cta: {
      title: "Ready to print?",
      body: "Send your STL/STEP and get a clear quote fast.",
      button: "Request a quote",
    },
    brand: {
      description:
        "3D printing studio in Herzele (Ghent region). Prototypes and small to large batches with clean finish. Part of Xinudesign.",
    },
    contact: {
      title: "Contact",
      location: "Herzele, East Flanders",
      review: "Share your Google review",
    },
    links: {
      title: "Links",
      items: [
        { label: "Services", href: "/services" },
        { label: "3D printing", href: "/3d-printen" },
        { label: "Materials", href: "/materials" },
        { label: "Organizers", href: "/organizers/modugrid" },
        { label: "Portfolio", href: "/portfolio" },
        { label: "Segments", href: "/segments" },
        { label: "Cases", href: "/cases" },
        { label: "Blog & knowledge base", href: "/blog" },
        { label: "3D modeling", href: "/3d-modelleren" },
        { label: "Find 3D models", href: "/en/3d-modellen-vinden" },
        { label: "Sustainability", href: "/sustainability" },
        { label: "About", href: "/about" },
        { label: "Pricing", href: "/pricing" },
        { label: "FAQ", href: "/faq" },
        { label: "Privacy policy", href: "/privacy" },
        { label: "Terms and conditions", href: "/algemene-voorwaarden" },
        { label: "Cookie policy", href: "/cookies" },
        { label: "Sitemap", href: "/sitemap.xml", external: true },
      ],
    },
    local: {
      title: "Local pages",
      body: "Find your city without long lists. Search and filter by letter.",
    },
    copyright: "All rights reserved.",
    pixapop: {
      title: "Pixapop partner",
      body: "Brewed by your favorite Pixapop partner in crime (extra coffee included).",
    },
  },
}

function SocialIcon({ type, className }: { type: string; className?: string }) {
  if (type === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className={className}>
        <path
          fill="currentColor"
          d="M4.98 3.5A2.49 2.49 0 1 1 5 8.48 2.49 2.49 0 0 1 4.98 3.5zM3.5 9h3v11h-3zM9 9h2.87v1.5h.04c.4-.75 1.39-1.54 2.86-1.54 3.06 0 3.63 2 3.63 4.63V20H15v-4.7c0-1.12-.02-2.56-1.56-2.56-1.56 0-1.8 1.22-1.8 2.48V20H9z"
        />
      </svg>
    )
  }
  if (type === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className={className}>
        <path
          fill="currentColor"
          d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.3 2.3.5.6.2 1 .5 1.5 1s.7.9 1 1.5c.2.4.4 1.1.5 2.3.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.9-.5 2.3-.2.6-.5 1-1 1.5s-.9.7-1.5 1c-.4.2-1.1.4-2.3.5-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.3-2.3-.5-.6-.2-1-.5-1.5-1s-.7-.9-1-1.5c-.2-.4-.4-1.1-.5-2.3C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.9.5-2.3.2-.6.5-1 1-1.5s.9-.7 1.5-1c.4-.2 1.1-.4 2.3-.5C8.4 2.2 8.8 2.2 12 2.2m0 1.8c-3.2 0-3.5 0-4.7.1-1.1.1-1.7.3-2 .4-.5.2-.8.4-1.2.8-.4.4-.6.7-.8 1.2-.1.3-.3.9-.4 2-.1 1.2-.1 1.5-.1 4.7s0 3.5.1 4.7c.1 1.1.3 1.7.4 2 .2.5.4.8.8 1.2.4.4.7.6 1.2.8.3.1.9.3 2 .4 1.2.1 1.5.1 4.7.1s3.5 0 4.7-.1c1.1-.1 1.7-.3 2-.4.5-.2.8-.4 1.2-.8.4-.4.6-.7.8-1.2.1-.3.3-.9.4-2 .1-1.2.1-1.5.1-4.7s0-3.5-.1-4.7c-.1-1.1-.3-1.7-.4-2-.2-.5-.4-.8-.8-1.2-.4-.4-.7-.6-1.2-.8-.3-.1-.9-.3-2-.4-1.2-.1-1.5-.1-4.7-.1m0 3.3A6.7 6.7 0 1 1 5.3 14 6.7 6.7 0 0 1 12 7.3m0 11.1a4.4 4.4 0 1 0 0-8.9 4.4 4.4 0 0 0 0 8.9M17.9 6.2a1.6 1.6 0 1 0 0-3.3 1.6 1.6 0 0 0 0 3.3Z"
        />
      </svg>
    )
  }
  return null
}

export default function Footer() {
  const { locale } = useLocale()
  const localize = (href: string) => localizeHref(href, locale)
  const copy = locale === "en" ? COPY.en : COPY.nl

  return (
    <footer className="relative mt-24">
      {/* top gradient hairline */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-300/60 to-transparent" />

      {/* CTA strip */}
      <div className="px-6 sm:px-8 lg:px-12">
        <div className="mx-auto -mt-10 max-w-6xl">
          <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-6 text-center shadow-sm backdrop-blur sm:flex sm:items-center sm:justify-between sm:text-left sm:p-8">
            <div className="space-y-1">
              <p className="text-sm font-semibold tracking-tight text-slate-900">{copy.cta.title}</p>
              <p className="text-sm text-slate-600">{copy.cta.body}</p>
            </div>
            <div className="mt-4 flex justify-center sm:mt-0 sm:justify-end">
              <Link
                href={localize("/contact")}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200/70 bg-[linear-gradient(90deg,#6366f1,45%,#22d3ee)] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(99,102,241,.35)] transition hover:brightness-110"
              >
                {copy.cta.button}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* main footer */}
      <div className="mt-10 border-t bg-white/60 backdrop-blur">
        <Container className="grid gap-10 py-12 text-center text-sm text-slate-600 md:grid-cols-5 md:text-left">
          {/* brand */}
          <div className="md:col-span-2">
            <Link href={localize("/")} className="inline-flex items-center gap-3">
              <Image src="/Logo.webp" alt="X3DPrints logo" width={44} height={44} className="h-11 w-11 object-contain" />
              <span className="text-base font-semibold tracking-tight text-slate-900">X3DPrints</span>
            </Link>
            <p className="mt-3 mx-auto max-w-prose md:mx-0">{copy.brand.description}</p>

            <div className="mt-4 flex items-center justify-center gap-3 md:justify-start">
              {socials.map(({ href, label, icon }) => (
                <Link
                  key={href}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/70 bg-white/70 text-slate-700 transition hover:text-slate-900"
                >
                  <SocialIcon type={icon} className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* contact */}
          <div className="space-y-1">
            <div className="font-semibold text-slate-900">{copy.contact.title}</div>
            <ul className="mt-3 space-y-1">
              <li>{copy.contact.location}</li>
              <li>
                <a href="mailto:michael@xinudesign.be" className="underline-offset-2 hover:underline">
                  michael@xinudesign.be
                </a>
              </li>
            </ul>
            <a
              href={googleReviewLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-amber-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
            >
              <span aria-hidden className="text-base">⭐</span>
              {copy.contact.review}
            </a>
          </div>

          {/* statische links */}
          <div>
            <div className="font-semibold text-slate-900">{copy.links.title}</div>
            <ul className="mt-3 grid grid-cols-2 gap-2 text-left text-sm text-slate-700 sm:grid-cols-2">
              {copy.links.items.map((item) => (
                <li key={item.href}>
                  {item.external ? (
                    <a href={item.href} className="inline-flex items-center gap-1 hover:text-slate-900">
                      {item.label}
                    </a>
                  ) : (
                    <Link href={localize(item.href)} className="inline-flex items-center gap-1 hover:text-slate-900">
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* lokale zoek */}
          <div>
            <div className="font-semibold text-slate-900">{copy.local.title}</div>
            <p className="mt-2 text-xs text-slate-600">{copy.local.body}</p>
            <div className="mt-3">
              <FooterLocationFinder />
            </div>
          </div>
        </Container>

        {/* bottom bar */}
        <div className="border-t">
          <Container className="flex flex-col items-center justify-center gap-4 py-6 text-center text-xs text-slate-500">
            <p>
              (c) {new Date().getFullYear()} X3DPrints. {copy.copyright}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <CookieSettingsButton className="text-slate-500 hover:text-slate-900" />
              <Link
                href="https://www.pixapop.be"
                className="group flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/80 px-3 py-2 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/Pixapop_black-e1687083855421-1024x299.webp"
                  alt="Pixapop partner"
                  width={120}
                  height={32}
                  className="h-6 w-auto opacity-90 transition group-hover:opacity-100"
                />
                <div className="flex flex-col">
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-700">
                    {copy.pixapop.title}
                  </span>
                  <span className="max-w-[240px] text-slate-500 sm:max-w-none">
                    {copy.pixapop.body}
                  </span>
                </div>
              </Link>
            </div>
          </Container>
        </div>
      </div>
    </footer>
  )
}
