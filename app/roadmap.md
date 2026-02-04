Grootste kansen zitten in structured data volledigheid, hreflang/canonical hygiene, content-differentiatie per intent en CRO-doorverwijzingen vanuit blog/segments.
Highest-impact fixes (week 1–2)

Voeg telefoon en priceRange in seo.ts + environment NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION; vult LocalBusiness schema + verifieert domein.
Zet x-default hreflang op kernpagina’s (home, services, materials, portfolio, pricing, blog) via alternates.languages zodat Google de NL/EN variant beter clustert.
Unieke OG-images per money page (services, materials, portfolio, pricing, organizers) i.p.v. gedeelde og-home.jpg; verhoogt CTR op social/LinkedIn.
Canonicals controleren op subfolders: sommige EN/NL pagina’s definiëren canonical zonder trailing slash; maak consistent (b.v. https://www.x3dprints.be/en/portfolio/).
LocalBusiness JSON-LD in layout.tsx: voeg openingHoursSpecification en hasOfferCatalog (services) toe; nu ontbreekt contact/price cues.
Sitemap-prio: verlaag legal pages naar 0.2–0.3 en verhoog /services, /materials, /portfolio, /organizers naar 0.9; dit stuurt crawl-budget.
Content & intent

Materials hub/detail: voeg mini use-cases + interlinks naar relevante blogposts per materiaal (PLA→beginners, PETG→buitengebruik, TPU→use-cases-tpu). Dit vangt mid-funnel zoekintenties “materiaal + toepassing”.
Services/segments: zorg dat elke segmentpagina 1) linkt naar 2–3 case/budget voorbeelden, 2) bevat FAQ met pricing signalen (“vanaf €X per stuk bij Y stuks”), 3) heeft CTA naar /contact?material=<slug> én /materials#material-suggestion-tool (consistent met runbook).
Blog → money pages: voeg bovenaan en na de eerste H2 een contextuele CTA (materials, pricing, organizers) met UTM tags; huidige posts converteren pas onderaan.
Duplicate angle NL/EN: check dat EN posts unieke intro & examples hebben; vermijd vertaalde kopieën zonder nieuwe waarde om thin content te voorkomen.
Technical / CWV

Check LCP op hero’s: prioriteer hero image per page via priority en zet sizes="(min-width:1024px) 50vw, 100vw" om CLS/LCP te borgen.
Defer zware widgets (MaterialSuggestionTool, Viewer) met dynamic import + loading="lazy" op iframe/video previews (VideoGallery).
Robots: voeg Disallow: /api en Crawl-delay niet nodig; maar voeg Host al aanwezig, ok.
Structured data

Add mainEntityOfPage + dateModified aan blog Article JSON-LD; koppel author en publisher (SITE).
Portfolio: per case in /app/(pages)/cases/... een ImageObject + Service schema; nu alleen hero OG.
Materials: voeg HowTo schema rond MaterialSuggestionTool (input→advice→CTA) en FAQ per detailpagina (min. 3 Q/A) conform runbook 8.2/8.3.
Breadcrumb JSON-LD is enkel NL; dupliceer voor EN en koppel @id aan itemListElement.
Internal linking

Footers/headers bevatten basics; voeg “Verder lezen” blokjes op /services, /materials en /portfolio naar blog topics + segments (zonder locaties).
Gebruik next/link anchor #material-suggestion-tool vanuit services, viewer en blog evergreen posts.
Measurement

GA ID fallback G-QPQ7LDMSRV is hardcoded; vervang door echte property en stel cookie_domain: 'auto'. Voeg event-tracking voor CTA’s (quote, contact, tool) zodat we ROAS/lead attribution kunnen meten.
Zet Search Console (site-verificatie), Bing Webmaster en schema validator checks in CI (lichtgewicht npm script).