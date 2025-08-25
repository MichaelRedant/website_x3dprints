# AGENTS.md

Project: **X3DPrints Website**
Stack: **Next.js (App Router, TS)** · **Tailwind CSS v4** · **Framer Motion** · **Node 20** · **GitHub Actions**

Deze gids definieert agent-rollen, eigenaarschap, werkafspraken, checklists en runbooks. Doel: sneller shippen met consistente kwaliteit.

---

## 1) Rollen (Agents)

### A. Lead Engineer
**Doel:** Architectuur, codekwaliteit, velocity.
**Taken:**
- Richtlijnen voor folderstructuur en code.
- Review van PR’s met focus op veiligheid, performance en DX.
- Technische roadmap en refactor-beslissingen.

### B. UI Engineer
**Doel:** Pixel-perfect UI met soepele animaties.
**Taken:**
- Componentbibliotheek (reusable, a11y-first).
- Animaties (Framer Motion) met `prefers-reduced-motion`.
- Responsive & LCP/CLS optimalisaties (Next/Image).

### C. Content & SEO Specialist
**Doel:** Vindbare en converterende content.
**Taken:**
- On-page SEO (Metadata API, headings, interne links).
- JSON-LD (Home: FAQ, Org/LocalBusiness in layout).
- Copy die scanbaar en taakgericht is.

### D. QA Engineer
**Doel:** Functioneel correct, toegankelijk en snel.
**Taken:**
- Testplan per feature (happy path + edge cases).
- A11y-check (keyboard, labels, contrast).
- Performance budget (Lighthouse ≥ 90, LCP < 2.5s).

### E. DevOps
**Doel:** Betrouwbare builds en releases.
**Taken:**
- CI (build, lint) en release tagging.
- Environment secrets beheer.
- Monitoring hooks (optioneel: Sentry).

### F. Analytics (optioneel)
**Doel:** Meten = weten.
**Taken:**
- Pageview/event tracking (privacy-vriendelijk).
- Berichtgeving over KPIs (conversie, drop-offs).

### G. Project Manager
**Doel:** Scope bewaken en prioriteren.
**Taken:**
- Planning, releases, changelog.
- Stakeholder sync.

---

## 2) Eigenaarschap per directory

| Pad                        | Owner          | Notes |
|---------------------------|----------------|-------|
| `/app/layout.tsx`         | Lead Engineer  | Global metadata, JSON-LD. |
| `/app/page.tsx`           | UI + SEO       | Home. Server component. |
| `/app/(pages)/**/page.tsx`| UI + SEO       | Subpages, server components. |
| `/components/**`          | UI Engineer    | Reusable, a11y-first. |
| `/lib/seo.ts`             | SEO Specialist | SITE-config en helpers. |
| `/lib/utils.ts`           | Lead Engineer  | `cn` helper, utils. |
| `/public/**`              | UI + SEO       | Beelden (WebP/AVIF), og-images. |
| `/app/api/**/route.ts`    | Lead Engineer  | API endpoints. |
| `.github/workflows/**`    | DevOps         | CI pipelines. |

---

## 3) Code standaarden

- **TypeScript strict**. Geen `any` tenzij echt nodig, dan typedefs.
- **Next App Router**. Pagina’s als server component; client-only UI in child components met `"use client"`.
- **Tailwind v4**: in `app/globals.css` enkel `@import "tailwindcss";` of `preflight/utilities`.
- **Animaties**: Framer Motion; respecteer `useReducedMotion`.
- **Images**: `next/image`, juiste `alt`, vermijd layout shifts.
- **A11y**: Focus states, labels, roles waar nodig.
- **Security**: Escape output, valideer input in API routes, geen secrets client-side.

---

## 4) Git & PR flow

- **Branching**: `main` = productie, feature branches: `feat/…`, fixes: `fix/…`.
- **Commits**: Conventional commits
  - `feat: …`, `fix: …`, `chore: …`, `docs: …`, `refactor: …`, `style: …`, `test: …`.
- **PR checklist** (verplicht in description):
  - [ ] Build OK (`npm run build`)
  - [ ] ESLint OK (`npm run lint`)
  - [ ] Lighthouse ≥ 90 (Perf/SEO/A11y/Best practices)
  - [ ] A11y (keyboard, labels, contrast)
  - [ ] Metadata/OG/JSON-LD up-to-date
  - [ ] Responsive getest (sm/md/lg)
  - [ ] Geen dode links/console errors

**PR Template (kopieer naar `.github/pull_request_template.md`)**
```md
## Wat
- 

## Waarom
- 

## Testplan
- [ ] Build OK
- [ ] Lint OK
- [ ] Lighthouse ≥ 90
- [ ] A11y (keyboard/labels/contrast)
- [ ] Responsive (sm/md/lg)
- [ ] Geen console errors

## Screenshots/Video

## 5) SEO richtlijnen

Metadata API per pagina (export const metadata).

Headings: 1× H1, logische H2/H3.

Interne links: Home → services/materials/portfolio/pricing/contact.

Images: Beschrijvende alt, og-image per belangrijke pagina.

JSON-LD:

Layout: LocalBusiness/Organization met adres/telefoon.

Home: FAQPage (zorg dat Q/A zichtbaar zijn).

Robots/Sitemap:

/app/robots.txt/route.ts

/app/sitemap.xml/route.ts

## 6) Performance budget

LCP < 2.5s, CLS < 0.1, TBT laag.

Hero: minimal JS in viewport, prioriteer hero image.

Images: geoptimaliseerd (WebP/AVIF), correcte dimensions.

Code split: dynamic import voor zware UI.

Fonts: next/font gebruiken om FOIT/FOUT/CLS te vermijden.

## 7) A11y checklist

 Focus zichtbaar en logisch.

 Labels voor inputs, beschrijvende alt.

 Contrast ratio conform WCAG AA.

 Toetsenbord-navigatie zonder vallen.

 Motion respecteert prefers-reduced-motion.

## 8) Runbooks
### 8.1 Nieuwe pagina toevoegen

Maak app/(pages)/<slug>/page.tsx (server component).

Voeg export const metadata toe (title, description, og).

Link intern vanuit relevante pagina’s.

Test Lighthouse, a11y en responsive.

Template

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Titel",
  description: "Korte, taakgerichte beschrijving.",
};

export default function Page() {
  return (
    <section className="container mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Titel</h1>
      <p className="mt-3 text-slate-600">Inhoud…</p>
    </section>
  );
}

### 8.2 Client-side animatie toevoegen

Maak client component in /components met "use client".

Gebruik Framer Motion en useReducedMotion.

Importeer in server page/component.

Template

"use client"
import { motion, useReducedMotion } from "framer-motion"

export function FadeIn({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? undefined : { opacity: 0, y: 12 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}

### 8.3 API endpoint (POST)

app/api/<name>/route.ts

import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const data = await req.json().catch(() => null)
  if (!data) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })

  // TODO: validate, process, send mail/webhook
  return NextResponse.json({ ok: true })
}

### 8.4 SEO: FAQ JSON-LD op pagina
const faq = [
  { q: "Vraag 1?", a: "Antwoord 1." },
  { q: "Vraag 2?", a: "Antwoord 2." },
]

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map(i => ({
    "@type": "Question",
    name: i.q,
    acceptedAnswer: { "@type": "Answer", text: i.a }
  })),
}

// In server page render:
script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
---

## 9) Scripts & Commands
npm run dev     # lokale ontwikkeling
npm run build   # productie build
npm run start   # serve build (lokale test)
npm run lint    # eslint (als geconfigureerd)


Node 20 aanhouden in CI en hosting.

## 10) Prompt-templates (voor AI-assistentie)

UI Component

Rol: UI Engineer. Bouw een toegankelijke React server component voor Next App Router.
Vereisten: Tailwind v4 classes, geen inline styles, responsive, a11y (labels/alt/focus).
Lever: component + korte uitleg van props en states. Geen lorem ipsum, korte NL copy.


Animatie

Rol: UI Engineer. Voeg subtiele in-view animatie toe met Framer Motion.
Vereisten: respecteer prefers-reduced-motion, geen blocking JS, kleine delays per kaart.
Lever: client component + voorbeeldgebruik in server page.


SEO

Rol: SEO Specialist. Schrijf metadata (title, description, og) voor pagina <slug>.
Vereisten: NL, 50-60 chars title, 140-160 chars description, duidelijke value proposition.
Lever: export const metadata voor Next App Router.


API Validatie

Rol: Lead Engineer. Schrijf POST route validator voor { name, email, message }.
Vereisten: e-mail validatie, rate limiting hook (pseudocode), veilige responses.
Lever: route.ts + korte testcases.

## 11) Releases

Tagging: vX.Y.Z (SemVer).

Changelog: samenvatten per feature/fix.

Checklist:

 Build OK

 Lighthouse ≥ 90

 404/500 pagina’s aanwezig

 Sitemap/robots correct

 Og-images aanwezig

## 12) Contactpunten

Issues & roadmap: GitHub Issues / Projects

Reviews: minimaal 1 reviewer, bij core files 2 reviewers

Incidenten: rollback = vorige tag redeployen