# AGENTS.md

Project: **X3DPrints Website**  
Stack: **Next.js (App Router, TS)** · **Tailwind CSS v4** · **Framer Motion** · **Node 20** · **GitHub Actions**

Deze gids definieert rollen, eigenaarschap, kwaliteitsafspraken, checklists en runbooks. Doel: snel shippen met consistente UX, SEO en performance.

---

## 1) Rollen (Agents)

### A. Lead Engineer
**Doel:** Architectuur, security, velocity.  
**Taken:**
- Richtlijnen voor folderstructuur, data-lagen en tooling.
- Code reviews met focus op veiligheid, performance en DX.
- Roadmap, refactors, experimenten (bv. viewer, suggestion tool).

### B. UI Engineer
**Doel:** Pixel-perfect UI met soepele animaties.  
**Taken:**
- Componentbibliotheek (`/components`, `/app/(pages)/**`) a11y-first.
- Framer Motion interacties met `prefers-reduced-motion`.
- Responsive gedrag (sm/md/lg/ultrawide), consistente hero-stijlen.

### C. Content & SEO Specialist
**Doel:** Vindbare en converterende content.  
**Taken:**
- Metadata API, headings, interne links, CTA-copy.
- JSON-LD (LocalBusiness, FAQ, HowTo, ItemList, Article, ImageObject).
- Blog & segment landingspagina’s, tone of voice (1-persoonsstudio Herzele).

### D. QA Engineer
**Doel:** Correct, toegankelijk en snel.  
**Taken:**
- Testplan per feature (happy path + edge cases).
- A11y-check (keyboard, labels, contrast, focus management).
- Performance budget (Lighthouse >= 90, LCP < 2.5s, CLS < 0.1).

### E. DevOps
**Doel:** Betrouwbare builds en releases.  
**Taken:**
- GitHub Actions (build, lint) en environment secrets.
- Release tagging, changelog, rollbackpad.
- Monitoring hooks (optioneel Sentry).

### F. Analytics (optioneel)
**Doel:** Meten = weten.  
**Taken:**
- Privacy-vriendelijke tracking (pageviews/events).
- Rapportering over KPI’s (conversie, drop-offs, segment engagement).

### G. Project Manager
**Doel:** Scope en prioriteiten bewaken.  
**Taken:**
- Planning, releases, stakeholdersync.
- Zorgt dat blog/segments/material tool linken naar elkaar.

---

## 2) Eigenaarschap per directory

| Pad                                   | Owner               | Notes |
|--------------------------------------|---------------------|-------|
| `/app/layout.tsx`                    | Lead Engineer       | Global metadata, LocalBusiness JSON-LD. |
| `/app/page.tsx`                      | UI + SEO            | Home, hero, CTA’s. |
| `/app/(pages)/materials/**`          | UI + SEO            | Material hub + detail slugs + suggestion anchor. |
| `/components/MaterialSuggestionTool.tsx` | UI + Lead Engineer | Multi-step wizard, CTA’s prefill contact. |
| `/app/(pages)/blog/**`               | Content & SEO       | Blog hub en artikels met Article JSON-LD. |
| `/app/(pages)/segments/**`           | Content & SEO       | Segment hub + detail pagina’s. |
| `/app/(pages)/services|portfolio|pricing|viewer|about|contact` | UI + SEO | Consistente hero’s, CTA’s, JSON-LD. |
| `/app/api/**/route.ts`               | Lead Engineer       | Inputvalidatie, mail/webhooks. |
| `/components/**`                     | UI Engineer         | Reusable, a11y-first. |
| `/lib/seo.ts`, `/lib/utils.ts`       | Lead Engineer       | SITE-config, helpers. |
| `/lib/materials.ts`, `/content/material-details.ts` | UI + SEO | Data voor materialen + FAQ. |
| `/public/**`                         | UI + SEO            | Beelden (WebP/AVIF), og-images. |
| `.github/workflows/**`               | DevOps              | CI pipelines. |

---

## 3) Code standaarden

- **TypeScript strict.** Geen `any` tenzij gedocumenteerd typedef.
- **Next App Router.** Pagina’s als server component; client-only UI met `"use client"`.
- **Tailwind v4.** `app/globals.css` importeert enkel `tailwindcss` of `preflight/utilities`.
- **Hero’s.** Gebruik `text-balance text-4xl font-extrabold text-slate-900 sm:text-5xl` voor hoofdheadings.
- **Material Suggestion Tool.** Houd multi-step logica in component, synchroniseer CTA’s naar `/contact?material=<slug>`.
- **Contactformulier.** Query `material` moet select prefillen; houd fallback-copy voor 1-persoons planning (geen harde 2-5 dagen belofte) en zorg dat tekst/caret in dark mode altijd leesbaar blijft.
- **Segment detailpagina's.** Gebruik het `Faq`-component (min. 3 Q/A) + FAQ JSON-LD, toon CTA’s naar `/materials#material-suggestion-tool` en `/contact?material=<slug>`, en herhaal interne links naar relevante blogposts/diensten.
- **Schema consistency (verplicht).** Gebruik JSON-LD helper-fabrieken uit `lib/seo.ts` i.p.v. inline objecten: `buildFaqPageSchema`, `buildHowToSchema`, `buildServiceSchema`, `buildOfferCatalog`, `buildLocalBusinessSchema`.
- **Interne link architectuur.** Gebruik `ReadMoreLinks` met `pageType` en beheer centrale mappings in `lib/seo-related-links.ts`; vermijd losse hardcoded "Verder lezen"-sets per pagina.
- **Animaties.** Framer Motion met `useReducedMotion`, geen blocking JS.
- **Images.** `next/image`, juiste `alt`, vermijd CLS.
- **Security.** Escape output, valideer API input, geen secrets client-side.
- **Media componenten.** `AutoCarousel` mag enkel actieve/vorige slides renderen en `VideoGallery` gebruikt de lichte preview-embed. Regressies die LCP/TBT verzwaren moeten vermeden worden.

---

## 4) Git & PR flow

- **Branching.** `main` = productie. Feature branches `feat/...`, fixes `fix/...`.
- **Commits.** Conventional commits (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `style:`, `test:`).
- **PR checklist** (verplicht in description):
  - [ ] Build OK (`npm run build`)
  - [ ] ESLint OK (`npm run lint`)
  - [ ] Lighthouse >= 90 (Perf/SEO/A11y/Best practices)
  - [ ] A11y (keyboard, labels, contrast)
  - [ ] Metadata/OG/JSON-LD up-to-date
  - [ ] Responsive getest (sm/md/lg + ultrawide)
  - [ ] Geen dode links/console errors

**PR Template** (`.github/pull_request_template.md`)
```md
## Wat
-

## Waarom
-

## Testplan
- [ ] Build OK
- [ ] Lint OK
- [ ] Lighthouse >= 90
- [ ] A11y (keyboard/labels/contrast)
- [ ] Responsive (sm/md/lg)
- [ ] Geen console errors

## Screenshots/Video
```

---

## 5) SEO richtlijnen

- Metadata API per pagina (`export const metadata`).
- Headings: 1× H1, daarna logische H2/H3.
- Interne links: home ↔ services/materials/portfolio/pricing/contact/blog/segments/suggestion tool. Lokale `[slug]`-pagina’s moeten bovendien `/locaties` linken in de “Verder lezen”-nav.
- JSON-LD:
  - Layout: LocalBusiness/Organization met adres/telefoon.
  - Home: FAQPage zichtbaar in content.
  - Materials: FAQ per detailpagina + HowTo (suggestion tool) waar relevant.
  - Portfolio: ImageObject entries voor hero cases.
  - Blog: Article schema per post (inclusief `datePublished`).
  - Segments: ItemList + detailpages met relevante schema (FAQ/HowTo/Service).
- JSON-LD helpers: nieuwe of aangepaste FAQ/HowTo/Service schema's moeten via `lib/seo.ts` helper-fabrieken lopen voor consistente `inLanguage`, `mainEntityOfPage` en structuur.
- GEO content-structuur (verplicht voor lange gidsen/blogs):
  - Eerste alinea volgt "inverted pyramid": kernantwoord binnen ~150-200 tekens.
  - Gebruik een inhoudsopgave met ankers (`id` op hoofd-`<h2>`), zodat deep links mogelijk zijn.
  - Voeg minimaal 1 gestructureerde `<table>` toe waar vergelijkingen of keuzes uitgelegd worden.
  - Sluit af met een bronsectie met `<cite>` links naar primaire bronnen.
  - Toon "laatst bijgewerkt" zichtbaar op de pagina én houd sitemap `lastModified` up-to-date.
- Robots & sitemap aanwezig (`app/robots.ts`, `app/sitemap.ts`).
- Robots moeten AI-crawlers expliciet toelaten: `GPTBot` en `Google-Extended` mogen content crawlen (behalve expliciet private routes).
- Keyword governance: houd de actuele keyword export in `lib/Keyword Stats *.csv` en laat `npm run check:seo:keywords` meedraaien om regressies op money pages vroeg te detecteren.
- Local keyword governance: laat `npm run check:seo:location-keywords` meedraaien zodat elke locatiepagina minimaal lokale intent (`3d printen in <stad>`/`3d printing in <city>`) behoudt en CSV-city keywords bewaakt worden.
- Auto-fix bij regressie: gebruik `npm run fix:seo:location-keywords` om ontbrekende lokale keywordsignalen op locatiepagina's veilig terug te plaatsen, daarna altijd `npm run check:seo:location-keywords`.

---

## 6) Performance budget

- LCP < 2.5s, CLS < 0.1, TBT laag.
- Hero: minimal JS in viewport, prioriteer hero image (priority props).
- Lazy load zware assets (viewer, suggestion tool steps) via dynamic imports indien nodig.
- Optimaliseer afbeeldingen (WebP/AVIF) en gebruik `sizes`.
- Fonts via `next/font`.

---

## 7) A11y checklist

- Focus zichtbaar en logisch.
- Labels voor inputs, beschrijvende alt teksten.
- Contrasten conform WCAG AA.
- Toetsenbord-navigatie zonder valkuilen (viewer dropzone, suggestion tool).
- Motion respecteert `prefers-reduced-motion`.

---

## 8) Runbooks

### 8.1 Nieuwe pagina (subpage/segment/blog)
1. Maak `app/(pages)/<slug>/page.tsx` (server component).
2. Voeg `export const metadata` toe (title 50-60 chars, description 140-160 chars, canonical).
3. Houd hero-styling consistent + CTA’s naar materials, blog, segments, contact.
4. Voeg JSON-LD (FAQ/Article/HowTo) via `lib/seo.ts` helpers toe indien van toepassing.
5. Link vanuit relevante pagina’s (home, footer, blog hub).
6. Lokale `[slug]`-pagina’s moeten in de “Verder lezen”-nav naar `/locaties` linken (naast services/materials/pricing/contact).
7. Test Lighthouse, a11y, responsive.

### 8.2 Nieuwe materiaal detailpagina
1. Voeg content toe in `content/material-details.ts` + `lib/materials.ts` indien nieuw materiaal.
2. FAQ invullen (min. 2 Q/A) voor SEO + JSON-LD.
3. Verwijs vanuit `MaterialSuggestionTool` en `ContactForm` (prefill query).
4. Update sitemap (material slug).

### 8.3 Material Suggestion Tool (component)
1. Component: `components/MaterialSuggestionTool.tsx` blijft client component met multi-step wizard.
2. Houd telkens mogelijkheid om terug te keren en antwoorden te wijzigen.
3. Toon advies + lijst redenen; CTA’s:
   - `Plan een gesprek` (contact)
   - `Vraag advies` (contact?material=<slug>)
4. Link anchor `#material-suggestion-tool` op `/materials` en elders (`/services`, `/viewer`, `/blog`).
5. Respecteer `prefers-reduced-motion`, houd inputs accessible.

### 8.4 Blogartikel toevoegen
1. Map `app/(pages)/blog/<slug>/page.tsx`.
2. Metadata + Article JSON-LD (`datePublished`, `headline`, `description`).
3. Gebruik bestaande components (GlassCard, Reveal, ShimmerButton).
4. Interne links naar materialen, segments, viewer, contact.
5. Voeg topic entry toe in `app/(pages)/blog/page.tsx`.
6. Update sitemap.

### 8.5 Segment landingpage
1. Plaats onder `app/segments/<slug>/page.tsx`.
2. Hero consistent; primaire CTA linkt naar `/contact?material=<slug>` (prefill) en secundaire CTA naar `/materials#material-suggestion-tool` + relevante blog/portfolio items.
3. Voeg highlights/stappenplan en het `Faq`-component (min. 3 Q/A) toe; hergebruik copy in FAQ JSON-LD.
4. Voeg Service/FAQ schema toe via `lib/seo.ts` helpers en plak `<script>` JSON-LD onderaan de pagina.
5. Update `/app/(pages)/segments/page.tsx` ItemList en sitemap.

### 8.6 Viewer verbeteringen
1. WebGL component in `components/ModelViewer.tsx`; UI instructies (dropzone, privacy) buiten canvas.
2. Link CTA’s naar suggestion tool en services.
3. Zorg dat `Link`/`ShimmerButton` geïmporteerd zijn (build errors vermijden).

### 8.7 API endpoint (POST)
```ts
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const data = await req.json().catch(() => null)
  if (!data) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })

  // TODO: validate, process, send mail/webhook
  return NextResponse.json({ ok: true })
}
```

---

## 9) Scripts & commands

```
npm run dev     # lokale ontwikkeling
npm run build   # productie build
npm run start   # serve build (lokale test)
npm run lint    # eslint (als geconfigureerd)
npm run check:seo # volledige SEO regressiecheck (incl. keywords)
npm run check:seo:location-keywords # lokale keyworddekking op locatiepagina's
npm run fix:seo:location-keywords # herstel ontbrekende lokale keywordsignalen op locatiepagina's
```

Node 20 aanhouden in CI en hosting.

---

## 10) Prompt-templates (AI assistentie)

**UI Component**  
Rol: UI Engineer. Bouw toegankelijke React server component. Tailwind v4 classes, geen inline styles, responsive, NL copy, geen lorem ipsum.

**Animatie**  
Rol: UI Engineer. Voeg subtiele in-view animatie toe met Framer Motion. Respecteer `prefers-reduced-motion`, kleine delays per kaart.

**SEO**  
Rol: SEO Specialist. Schrijf metadata (title 50-60 chars, description 140-160 chars, OG) voor pagina `<slug>`. NL value proposition.

**SEO + Schema (AI updates)**  
Rol: SEO Specialist + Lead Engineer. Bij elke nieuwe/gewijzigde pagina: gebruik `lib/seo.ts` helper-fabrieken voor FAQ/HowTo/Service JSON-LD, gebruik `ReadMoreLinks pageType` met centrale mapping in `lib/seo-related-links.ts`, update sitemap waar nodig, en run `npm run verify`.

**API Validatie**  
Rol: Lead Engineer. Schrijf POST route validator voor `{ name, email, message }`: e-mail validatie, rate limiting hook (pseudocode), veilige responses.

---

## 11) Releases

- Tag: SemVer `vX.Y.Z`.
- Changelog: features/fixes per release.
- Checklist:
  - Build OK
  - Lighthouse >= 90
  - 404/500 pagina’s aanwezig
  - Sitemap/robots correct
  - OG-images aanwezig
  - Suggestion tool + contact prefill getest

---

## 12) Contactpunten

- Issues & roadmap: GitHub Issues / Projects.
- Reviews: min. 1 reviewer; core files (layout, suggestion tool, contact) vragen 2.
- Incidenten: rollback = vorige tag redeployen.
