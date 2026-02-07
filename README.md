# X3DPrints · Website (Next.js + Tailwind v4)

Productiesite voor **X3DPrints**, een snelle 3D-printservice uit Herzele. Gebouwd met **Next.js (App Router, TS)**, **Tailwind CSS v4** en **Framer Motion**, volledig geoptimaliseerd voor performance, SEO en a11y.

- Live: https://www.x3dprints.be  
- Repo: `website_x3dprints`  
- Node: **v20**

---

## Inhoud

- [Features](#features)
- [Snel starten](#snel-starten)
- [Structuur](#structuur)
- [Styling (Tailwind v4)](#styling-tailwind-v4)
- [SEO & Content](#seo--content)
- [Material Suggestion Tool](#material-suggestion-tool)
- [Contact & Prefill](#contact--prefill)
- [Viewer](#viewer)
- [API Routes](#api-routes)
- [Omgeving / .env](#omgeving--env)
- [CI](#ci)
- [Deploy](#deploy)
- [Troubleshooting](#troubleshooting)

---

## Features

- **Next.js App Router** met server components, per-page metadata en route handlers.
- **Tailwind v4** via `@tailwindcss/postcss`, minimale global CSS.
- **Framer Motion** micro-animaties (`useReducedMotion` aware).
- **Material Suggestion Tool** (multi-step wizard, HowTo JSON-LD, CTA's die `/contact?material=<slug>` prefillen).
- **Segment hubs & detailpagina's** met Article/ItemList/FAQ JSON-LD, verplichte `Faq`-component en CTA's naar suggestion tool + contact-prefill.
- **Portfolio carousel & VideoGallery** laden enkel zichtbare slides/iframes voor optimale LCP/TBT.
- **Viewer** met moderne dropzone, privacycopy buiten canvas en CTA's naar services/materials.
- **On-page SEO**: Metadata API, FAQ + HowTo/Service JSON-LD, ImageObject op portfolio, breadcrumbs, interne linking.
- **Consistente hero-styling** (`text-balance text-4xl font-extrabold text-slate-900 sm:text-5xl`) in light/dark mode.

---

## Snel starten

```bash
# 1) Node 20
node -v

# 2) Dependencies
npm ci

# 3) Development
npm run dev
```

### Contactformulier lokaal testen

Het contactformulier post naar `app/api/contact/route.ts`. Geen aparte PHP nodig.

SMTP variabelen:
```
SMTP_HOST=smtp.voorbeeld.be
SMTP_PORT=587
SMTP_USER=info@voorbeeld.be
SMTP_PASS=supergeheim
MAIL_TO=info@x3dprints.be
MAIL_FROM="X3DPrints <no-reply@x3dprints.be>"
```

Optioneel: `DKIM_DOMAIN`, `DKIM_SELECTOR`, `DKIM_PRIVATE_KEY`.

### Productiebouw (lokaal testen)

```bash
npm run build && npm run start
```

### Scripts

```
npm run dev     # Next dev server
npm run clean   # Verwijder .next en out
npm run build   # Productie build
npm run start   # Serve statische export uit /out
npm run lint    # ESLint (indien geconfigureerd)
npm run check:security # Security guards (o.a. geen publieke CRM data)
npm run check:seo      # SEO regressiechecks op source + export
npm run verify         # lint + security + build + seo checks
```

---

## Structuur

```
app/
  (pages)/
    blog/
      <slug>/page.tsx          # Artikel (server component)
      page.tsx                 # Blog hub (server component)
    materials/
      page.tsx                 # Material overview + suggestion tool section
      [slug]/page.tsx          # Materiaal detail (server component)
    segments/
      page.tsx                 # Segment hub (ItemList JSON-LD)
    services|portfolio|pricing|viewer|about|contact|locaties|faq|sustainability
  segments/
    <slug>/page.tsx            # Segment detail pagina's
  api/
    contact/route.ts
  layout.tsx                   # metadata + LocalBusiness JSON-LD
  sitemap.ts                   # dynamic sitemap
  robots.ts
  globals.css

components/
  Container.tsx / GlassCard.tsx / Reveal.tsx / ShimmerButton.tsx
  ContactForm.tsx
  MaterialSuggestionTool.tsx   # multi-step wizard + CTA hooks
  ModelViewer.tsx              # drag/drop + canvas UI

lib/
  seo.ts                       # SITE-config, metadata helpers
  materials.ts                 # materiaal data + slugs
  locations.ts                 # lokale landingspagina’s

content/
  material-details.ts          # hero/faq/spec copy per materiaal
  material-gallery.ts          # hero gallery

public/
  images/...                   # og-home.jpg, portfolio shots

postcss.config.js              # gebruikt '@tailwindcss/postcss'
tailwind.config.ts             # (optioneel)
tsconfig.json                  # pad alias '@/*'
AGENTS.md
README.md
```

---

## Styling (Tailwind v4)

- PostCSS config:
  ```js
  // postcss.config.js
  module.exports = {
    plugins: { "@tailwindcss/postcss": {} },
  }
  ```
- `app/globals.css` bevat enkel:
  ```css
  @import "tailwindcss";
  ```
  of expliciet `preflight` + `utilities`.
- `@apply` werkt zoals gewoonlijk. VS Code warnings zijn cosmetisch.

---

## SEO & Content

- **Global:** `app/layout.tsx` zet LocalBusiness JSON-LD via `SITE` uit `lib/seo.ts`.
- **Per pagina:** `export const metadata`.
- **FAQ/HowTo JSON-LD:**  
  - Materials detailpagina’s renderen FAQ + FAQ JSON-LD.  
  - Material Suggestion Tool gebruikt HowTo JSON-LD.  
  - Portfolio gebruikt ImageObject entries per case.  
  - Blog posts hebben Article schema (met `datePublished`).  
  - Segments hub genereert ItemList en elke segment detailpagina heeft een `Faq`-component + FAQ JSON-LD.
- **Interne links:** elke hero koppelt naar `materials`, `materials#material-suggestion-tool`, `blog`, `segments`, `services`, `contact`.
- **Segment CTA’s:** primaire CTA → `/contact?material=<slug>` (prefill), secundaire CTA → `/materials#material-suggestion-tool` (+ relevante blog/portfolio links).
- **Tone of voice:** benadruk dat X3DPrints een éénmansstudio in bijberoep is (realistische planning, geen harde “2-5 dagen” belofte).
- **LLM/ai.txt:** `public/llms.txt` wordt geserveerd op `/llms.txt` en staat vermeld in `app/robots.ts` zodat crawlers de merk- en contactrichtlijnen vinden.
- **Locale html-signalen:** na `npm run build` zet `postbuild` de geëxporteerde `out/**/*.html` op route-correct `lang`/`data-locale` (`/en/*` => `en-BE`, anders `nl-BE`).

---

## Material Suggestion Tool

- Component: `components/MaterialSuggestionTool.tsx` (client).
- Beschikbaar op `/materials` met anchor `#material-suggestion-tool`.
- CTA’s moeten query `material=<slug>` meegeven naar `/contact` zodat de select automatisch prefilled wordt.
- Toon altijd:
  - Multi-step vragen (min. 4) met mogelijkheid om terug te gaan.
  - Resultaat met aanbeveling + redenen + disclaimers (“advies, afhankelijk van project”).
  - CTA’s: `Vraag advies`, `Plan een gesprek`, `Bekijk materiaal`.
- JSON-LD: HowTo script in component/page.
- Link anchors vanuit home, blog, services, viewer, footer.

---

## Contact & Prefill

- `components/ContactForm.tsx` leest `material` query param en kiest de juiste optie.
- Links/knoppen die een materiaal aanbevelen moeten `href="/contact?material=<slug>"` gebruiken.
- Copy moet transparant zijn over planning (“enkele werkdagen, afstemming in overleg”).
- Dark mode: inputs tonen witte tekst/caret en behouden focuscontrast; wijzigingen aan het formulier mogen dit niet regressief maken.

---

## Viewer

- `app/(pages)/viewer/page.tsx` gebruikt uniforme hero-styling, CTA’s naar suggestion tool en services.
- `components/ModelViewer.tsx`:
  - Groter canvas (min. 640×480) met orbit controls.
  - Dropzone + privacycopy buiten WebGL canvas.
  - Ondersteunt STL/OBJ/GLB, toont polycount/afmetingen indien beschikbaar.

---

## Portfolio

- `components/AutoCarousel.tsx` rendert enkel actieve + vorige slides, prelaadt de volgende en gebruikt `next/image` (geen regressie op LCP/CLS).
- `components/VideoGallery.tsx` gebruikt de `LiteVideo` preview (thumbnail + opt-in iframe) zodat TBT laag blijft; voeg geen sync YouTube iframes toe buiten deze flow.
- Portfolio-pagina bevat ImageObject, CollectionPage & ItemList JSON-LD; breid data enkel uit via `lib/seo` helpers om schema consistent te houden.
- CTA’s op portfolio verwijzen naar services/materials/pricing + segmenten voor cross-linking.
  - CTA’s naar `/contact` en `/materials`.

---

## API Routes

- Voorbeeld `app/api/contact/route.ts` (POST):
  ```ts
  import { NextResponse } from "next/server"

  export async function POST(req: Request) {
    const data = await req.json().catch(() => null)
    if (!data) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })

    // TODO: validate, send mail/webhook
    return NextResponse.json({ ok: true })
  }
  ```
- Valideer input, rate-limit indien nodig, return veilige errors.

---

## Omgeving / .env

Project draait zonder verplichte secrets voor de publieke site, maar voor mail + CRM zijn deze nodig:

```
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
MAIL_TO=
MAIL_FROM=
DKIM_DOMAIN=
DKIM_SELECTOR=
DKIM_PRIVATE_KEY=
CRM_PASSWORD_HASH=
CRM_DATA_DIR=
```

CRM is hash-only: gebruik geen plain `CRM_PASSWORD`.  
Hash genereren:
```bash
php -r "echo password_hash('jouw-sterk-wachtwoord', PASSWORD_DEFAULT), PHP_EOL;"
```

---

## CI

GitHub Actions voorbeeld (`.github/workflows/ci.yml`):

```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"
      - run: npm ci
      - run: npm run verify
```

---

## Deploy

- Geschikt voor elke Node-hosting die Next.js ondersteunt (Vercel, Render, eigen VPS).
- Build: `npm run build` → `npm run start`.
- Zorg dat Node 20 beschikbaar is en dat `PUBLIC_URL`/`SITE.url` correct staat.

---

## Troubleshooting

| Probleem | Oplossing |
|----------|-----------|
| **Tailwind v4 plugin error** | Zorg dat `postcss.config.js` `@tailwindcss/postcss` gebruikt; importeer `@import "tailwindcss";` in `app/globals.css`. |
| **metadata + "use client" error** | Metadata kan niet in client component. Houd page server-side, importeer client component als child. |
| **Contactmateriaal wordt niet geprefilled** | Check dat link `?material=<slug>` meegeeft én dat slug voorkomt in `lib/materials.ts`. |
| **Material Suggestion Tool gooit build error** | Controleer dat alle arrays/steps afgesloten zijn en dat `recommendation` altijd aanwezig is voordat JSX rendert. |
| **Viewer klaagt over ontbrekende `Link` of `ShimmerButton`** | Importeer deze expliciet in `app/(pages)/viewer/page.tsx`. |
| **Sitemap mist nieuwe pagina** | Voeg slug toe aan `app/sitemap.ts` (static arrays) of haal uit content bron (`MATERIAL_DETAILS`, blog slugs, segments). |
| **CRM auth is not configured** | Zet `CRM_PASSWORD_HASH` in je hosting environment en deploy opnieuw. |

---

## Licentie

MIT (voeg `LICENSE` toe indien nodig).  
Made by Xinudesign · Content afgestemd op X3DPrints (2025).
