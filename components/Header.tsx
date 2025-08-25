"use client"
import Link from "next/link"
import Container from "./Container"
import { useState } from "react"

const NAV = [
  { href: "/services", label: "Services" },
  { href: "/materials", label: "Materialen" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/pricing", label: "Prijzen" },
  { href: "/contact", label: "Contact" },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <Container className="flex items-center justify-between h-16">
        <Link href="/" className="font-semibold tracking-tight">X3DPrints</Link>
        <button className="md:hidden" aria-label="menu" onClick={() => setOpen(v => !v)}>☰</button>
        <nav className={`md:flex gap-6 ${open ? "block mt-4" : "hidden"} md:mt-0`}>
          {NAV.map(i => (
            <Link key={i.href} href={i.href} className="text-sm font-medium hover:text-brand-accent">
              {i.label}
            </Link>
          ))}
          <Link href="/contact" className="text-sm font-semibold px-4 py-2 rounded-xl bg-brand-accent text-black shadow-soft">
            Offerte aanvragen
          </Link>
        </nav>
      </Container>
    </header>
  )
}
