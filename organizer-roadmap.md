# Roadmap: Toolbox Organizers

Checklists voor nieuwe landing funnels rond maatwerk organizers. Richtlijnen volgen AGENTS (Next App Router, Tailwind v4, JSON-LD, a11y, performance budget).

## Positionering & Copy
- [ ] Hero titel: "Organizers op maat voor jouw Gridfinity-stijl / Packout / TSTAK / Eigen toolbox"
- [ ] Hero subtitel: "Geen gerammel. Geen tijdverlies. Alles perfect op zijn plaats."
- [ ] CTA primary: `Stel jouw organizer samen`; secondary naar `/materials#material-suggestion-tool`
- [ ] Vermijd termen "3D-geprint" of "STL" in hero; focus op orde, tijdswinst, professionaliteit
- [ ] Verwerk bewijsregels: "✔ Getest in echte koffers", "✔ Geen rammel, geen speling", "✔ Print-on-demand in België", "✔ Aanpasbaar op aanvraag"

## Informatie-architectuur
- [ ] Home voegt 4 tegels toe (zonder submenu):
  - Modulaire lade/werkbank inserts (Gridfinity-stijl) met als naam ipv Gridinfinty: Gebruik dubbele naamgeving:

Publiek:

ModuGrid System

Klein, subtiel eronder:

Gebaseerd op het Gridfinity-principe
  - Milwaukee Packout organizers
  - Stanley / DeWALT TSTAK organizers
  - Custom parametrische toolbox inserts (SCAD)
- [ ] Elke tegel linkt naar dedicated landing onder `app/(pages)/organizers/<slug>/page.tsx`
- [ ] Breadcrumbs + interne links terug naar `/materials#material-suggestion-tool`, `/services`, `/contact?material=<slug>`
- [ ] Update sitemap & navigation footer links

## Pagina-opbouw per systeem (server component)
- [ ] H1 conform hero standaard: `text-balance text-4xl font-extrabold text-slate-900 sm:text-5xl`
- [ ] Sectie "Wat los je op" met bullets: schroeven door elkaar, lege ruimte, tijdverlies, slecht overzicht
- [ ] Sectie "Zo werkt het" 4 stappen met pictogrammen/illustraties; geen STL/jargon
- [ ] Sectie "Productvormen" met 3-4 vooraf samengestelde sets + één custom set
- [ ] Sectie "Prijsrange" met copy: "Vanaf €XX per set, afhankelijk van indeling en materiaal (PLA/PETG), made-to-order, past perfect"
- [ ] Sectie "Upsells" (PETG upgrade, antislip bodem, naam/label, extra vakje)
- [ ] CTA-blokken herhalen na elk hoofdsegment

## Productbundels per systeem
- [ ] Gridfinity-stijl: Starter Set, Schroeven Set, Elektricien Set, Custom Set
- [ ] Milwaukee Packout: Compact Organizer Set, Bit & Drill Set, Battery & Charger Set, Custom Packout Layout
- [ ] TSTAK: Small Parts Set, Allround Set, Pro Layout
- [ ] Custom SCAD: Intake formulier met keuze systeem + foto upload (client component) → webhook/mail

## Componenten & UX
- [ ] Nieuwe section component `OrganizerBundles` met cards (Framer Motion + `prefers-reduced-motion`)
- [ ] Gebruik bestaand `Faq` component met min. 3 Q/A per pagina; FAQ JSON-LD toevoegen
- [ ] Contactformulier vult `material` query automatisch (Packout/TSTAK/Gridfinity/custom)
- [ ] Voeg foto-carrousel met echte koffers toe (`next/image`, antislip/close-ups), geen renders-only
- [ ] A11y: focus states, labels, toetsenbord door galerij en CTA’s

## SEO & Metadata
- [ ] `export const metadata` per landing (title 50-60, description 140-160, canonical)
- [ ] JSON-LD: Service/FAQ schema + HowTo voor maatwerk flow; LocalBusiness blijft in layout
- [ ] Interne links naar blog/portfolio cases over organisatie; anchor `#material-suggestion-tool`
- [ ] OG-image per landing met echte kofferfoto

## Performance & Build
- [ ] Hero beelden met `priority` en `sizes` afgestemd op breakpoints; geen CLS
- [ ] Lazy-load zware galleries via dynamic import (no blocking JS in viewport)
- [ ] Houd TBT laag: geen onnodige client components boven de vouw
- [ ] Lighthouse streefwaarden: Perf/A11y/SEO/Best Practices ≥ 90; LCP < 2.5s; CLS < 0.1

## Contentproductie
- [ ] Fotolijst: 3 close-ups + 2 context shots per systeem; 1 video test in echte koffer
- [ ] Copy review in NL (1-persoonsstudio Herzele tone); geen harde leverbelofte
- [ ] Bewijsblok met klantquotes/mini-cases (optioneel)

## Go-to-Market & Conversie
- [ ] Tracking events (privacyvriendelijk) voor tegel klik, CTA click, bundel selectie, offerte aanvraag
- [ ] Intake: stuur naar `/contact?material=<slug>&bundle=<bundle>`
- [ ] Bedankpagina of inline bevestiging met vervolgstap (foto’s doorsturen, gewenste tools lijst)

## Launch Checklist
- [ ] Build `npm run build` en lint OK
- [ ] Sitemap/robots geüpdatet
- [ ] Geen dode links of console errors
- [ ] Responsive getest sm/md/lg/ultrawide
- [ ] Fallback copy voor dark mode leesbaarheid gecontroleerd
- [ ] Contact prefill en suggestion tool koppelingen gevalideerd
