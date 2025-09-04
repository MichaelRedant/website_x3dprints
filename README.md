# X3DPrints — Website (Next.js + Tailwind v4)

Productiesite voor **X3DPrints**: snelle, consistente 3D-printservice. Gebouwd met **Next.js (App Router, TS)**, **Tailwind CSS v4**, **Framer Motion** en gericht op **performance, SEO en toegankelijkheid**.

- Live: https://www.x3dprints.be
- Repo: `website_x3dprints`
- Node: **v20**

---

## Inhoud
- [X3DPrints — Website (Next.js + Tailwind v4)](#x3dprints--website-nextjs--tailwind-v4)
  - [Inhoud](#inhoud)
  - [Features](#features)
  - [Snel starten](#snel-starten)
- [1) Node 20](#1-node-20)
- [2) Dependencies](#2-dependencies)
- [3) Development](#3-development)
- [4) Productiebouw (lokaal testen)](#4-productiebouw-lokaal-testen)
  - [Scripts](#scripts)
  - [Structuur](#structuur)
  - [Styling (Tailwind v4)](#styling-tailwind-v4)
  - [SEO](#seo)
  - [API Routes](#api-routes)
  - [Omgeving / .env](#omgeving--env)
- [.env.example](#envexample)
  - [CI](#ci)
- [.github/workflows/ci.yml](#githubworkflowsciyml)
  - [Deploy](#deploy)
  - [Troubleshooting](#troubleshooting)
  - [Licentie](#licentie)

---

## Features
- **Next.js App Router** met server components, per-page metadata en route handlers.
- **Tailwind v4** met PostCSS plugin `@tailwindcss/postcss` en minimal CSS.
- **Framer Motion** micro-animaties met `prefers-reduced-motion`.
- **On-page SEO**: Metadata API, OG/Twitter, interne linking, JSON-LD (LocalBusiness, FAQ).
- **Snelle basis**: next/image, responsive layout, nette a11y defaults.
- **Eenvoudige structuur** en duidelijke alias `@/*`.

---

## Snel starten
```bash
# 1) Node 20
node -v

# 2) Dependencies
npm ci

# 3) Development
npm run dev

### Contactformulier lokaal testen
Het contactformulier post naar een PHP-endpoint.
Voor lokale ontwikkeling:

```bash
php -S 127.0.0.1:8000 -t public
```

De component gebruikt standaard `http://127.0.0.1:8000/contact.php` in development (IPv4 om `localhost`/IPv6 issues te vermijden).
Wijzig met `NEXT_PUBLIC_CONTACT_ENDPOINT` indien gewenst.

#### SMTP configureren

Voor productie gebruikt `public/contact.php` **PHPMailer**. Stel de volgende environment-variabelen of serverinstellingen in zodat de host via SMTP kan mailen:

```
SMTP_HOST=mail.voorbeeld.nl
SMTP_PORT=587
SMTP_USER=info@voorbeeld.nl
SMTP_PASS=supergeheim
SMTP_SECURE=tls # of 'ssl'
```

Zonder deze variabelen valt het script terug op `mail()`, wat op sommige hosts geblokkeerd kan zijn.


Optioneel kun je `APP_DEBUG=1` zetten om foutmeldingen te loggen en terug te geven. Het script werkt op PHP 7+ dankzij een kleine polyfill voor `str_ends_with`.

# 4) Productiebouw (lokaal testen)
npm run build && npm run start

## Scripts
npm run dev     # Next dev server
npm run build   # Productie build
npm run start   # Serve .next/standalone
npm run lint    # (indien geconfigureerd)

## Structuur
app/
  (pages)/
    materials/page.tsx
    portfolio/page.tsx
    pricing/page.tsx
    services/page.tsx
    contact/page.tsx        # server component
    contact/ContactForm.tsx # client component
  api/
    contact/route.ts
  globals.css
  layout.tsx
  page.tsx                  # homepage (server component)

components/
  Reveal.tsx
  ShimmerButton.tsx
  Header.tsx
  Footer.tsx

lib/
  seo.ts     # SITE-config voor metadata/JSON-LD
  utils.ts   # cn() helper

public/
  images/... # og-home.jpg, hero/portfolio assets

postcss.config.js
tsconfig.json
AGENTS.md
README.md

## Styling (Tailwind v4)

PostCSS plugin verplicht:

// postcss.config.js
module.exports = {
  plugins: { '@tailwindcss/postcss': {} },



Globals: kies één van beide

/* app/globals.css — korte variant */
@import "tailwindcss";


of

/* expliciet */
@import "tailwindcss/preflight";
@import "tailwindcss/utilities";


@apply werkt. Eventuele VS Code warnings komen van de CSS-language server.

## SEO

Globaal: app/layout.tsx zet basis metadata en LocalBusiness JSON-LD (via SITE uit lib/seo.ts).

Per pagina: export const metadata in server pages.

FAQ: homepage rendert FAQPage JSON-LD voor rich results.

Interne links: home ↔ materialen/portfolio/prijzen/contact.

Animaties

Framer Motion via kleine client components (bv. Reveal.tsx, ShimmerButton.tsx).

Houd server pages server-side; importeer client-only UI als child component.

Respecteer useReducedMotion.

## API Routes

Voorbeeld: app/api/contact/route.ts (POST).

Valideer input, stuur mail/webhook of logica naar keuze.

Antwoorden met NextResponse.json.

## Omgeving / .env

Project draait zonder secrets. Voor e-mail/webhooks voeg later toe:

# .env.example
MAIL_API_KEY=
WEBHOOK_URL=

## CI

Optionele GitHub Actions (build/lint). Zie voorbeeld:

# .github/workflows/ci.yml
name: CI
on:
  push: { branches: [ main ] }
  pull_request:
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: "20", cache: "npm" }
      - run: npm ci
      - run: npm run lint --if-present
      - run: npm run build

## Deploy

Geschikt voor elke Node-hosting die Next ondersteunt.

Build: npm run build → npm run start.

Zorg dat Node 20 beschikbaar is.

## Troubleshooting

Tailwind v4 plugin error
you're trying to use tailwindcss directly as a PostCSS plugin.
Gebruik @tailwindcss/postcss in postcss.config.js.

CSS laadt niet
Verzeker app/globals.css is geïmporteerd in app/layout.tsx. Herstart dev server en wis .next.

metadata + "use client" error
export const metadata mag niet in client components. Houd page.tsx server-side en stop interactieve UI in een child met "use client".

Alias @/lib/... niet gevonden
tsconfig.json:

{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["*"] }
  }
}


Bestanden moeten dan in /lib op repo-root bestaan.

## Licentie

MIT. Zie LICENSE (toevoegen indien nodig).

Credits

Next.js App Router, Tailwind v4, Framer Motion.

Content en structuur afgestemd op X3DPrints (2025).

Gemaakt door Xinudesign