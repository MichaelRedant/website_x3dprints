# SEO-First Shop Roadmap (Next.js static + PHP BFF)

## 1. Vision & Principles
- The shop is an extension of the existing site, not a replacement.
- Content and blog remain the primary acquisition channels; shop supports conversion.
- SEO-first commerce principles:
  - Zero URL changes to existing routes.
  - Additive routing only; no refactors of current paths.
  - Preserve all canonicals and internal links as-is.
  - Only high-value pages become indexable; utility pages stay noindex.
- Must NEVER do (SEO anti-patterns):
  - Renaming, redirecting, or consolidating existing URLs.
  - Replacing blog or pricing pages with product pages.
  - Indexing cart, checkout, search, or filter pages.
  - Generating duplicate product pages per filter or variant.
  - Adding Product schema to non-product pages.
  - Publishing thin or template-only product pages.
  - Creating multiple indexable URLs for the same SKU.

## 2. Non-Negotiable SEO Constraints
- URL stability: all current URLs remain unchanged and reachable.
- Canonical integrity: current canonicals remain; shop pages are self-canonical.
- Internal link preservation: no removal or rerouting of existing links.
- Crawl budget protection: keep new indexable routes minimal.
- Duplicate content prevention: one product page per canonical SKU.
- Filter/indexing strategy: parameterized filters are `noindex, follow` and use stable canonicals; also disallow in robots.
- Pagination strategy: page 2+ is `noindex, follow` with canonical to page 1 unless explicitly approved.
- Parameter handling: only whitelisted params; all others stripped in canonical URLs.
- Sitemap discipline: only indexable URLs are listed; cart/checkout/search/filter never included.
- Product vs blog intent separation: product intent stays in /shop only.

## 3. High-Level Architecture
- Runtime:
  - Next.js frontend (static export) for all shop UI.
  - PHP BFF (`/bff`) on shared hosting for catalog, carts, checkout, orders.
  - MySQL for shop data (products, carts, orders).
  - Mollie handles payments via redirect + webhook callbacks.
  - Hosting constraint: no Node runtime in production.
- BFF is isolated:
  - Not publicly crawled or indexed.
  - Accessed by the frontend only; CORS allowlist enforced.
  - Robots disallow and auth on any public utility endpoints.
- Logical flow:
  - User -> Next.js (static) -> PHP BFF -> Mollie -> PHP BFF -> Next.js.
- Separation of concerns:
  - Next.js owns routing, rendering, SEO, and content.
  - PHP BFF owns catalog, carts, orders, payment orchestration, CRM data.

## 4. Shop Scope Definition (MVP First)
Phase 1 scope (minimal footprint):
- Standard fixed-price products with simple descriptions.
- Made-to-order allowed only with a fixed lead time.
- No file upload or custom quote logic.
- No instant pricing or dynamic configurators.
- Variants only if strictly necessary (e.g., size or color).
- Simple shipping rules (one region, flat rate or single tier).
- Launch sequencing: start with 1 product later; keep /shop noindex until first SKU is live.
- Minimum content standards per product page (unique copy, specs, images).

Out of scope in Phase 1 (and why):
- Upload-to-print: high operational and SEO complexity.
- Dynamic pricing calculators: risk of thin content and crawl bloat.
- Complex variants and bundles: increases duplicate content risk.
- Subscriptions, gift cards, loyalty: not required for MVP revenue.
- Multi-currency or multi-warehouse: adds operational overhead early.

## 5. SEO-Safe URL Strategy
- Allowed routes:
  - `/shop`
  - `/shop/category/[slug]` (optional in MVP)
  - `/shop/[slug]` (product detail)
  - `/shop/cart` (noindex)
  - `/shop/checkout` (noindex)
  - EN equivalents under `/en/shop`, `/en/shop/[slug]`, `/en/shop/cart`, `/en/shop/checkout`.
- Forbidden routes:
  - `/products`, `/store`, or any rewrite of existing paths.
  - Indexable search or filter URLs (`/shop?color=...`).
  - Duplicate product URLs per variant or material.
- Coexistence with existing pages:
  - Blog, pricing, materials, and service pages remain unchanged.
  - Product pages never replace or canonicalize to content pages.
- Slug governance:
  - Stable, human-readable slugs; no changes after publish unless unavoidable.
  - If a slug changes, use a permanent redirect and update internal links.
- Internal linking:
  - Blog -> shop links are contextual and optional.
  - Shop -> blog links only when editorially relevant.
  - No forced redirects from content to shop.

## 6. Structured Data & Indexation Strategy
- Product schema only on product detail pages.
- Category and listing pages use generic ItemList or none.
- Include Offer fields only when price and availability are stable.
- Avoid schema conflicts:
  - One primary schema type per page.
  - Article schema remains exclusive to blog pages.
- Use site JSON-LD helpers for consistency and QA.
- BreadcrumbList for product pages when categories exist.
- Reviews/ratings schema only if real, verified reviews exist.
- Indexation rules:
  - Product pages indexable with self-canonical.
  - Cart, checkout, account pages noindex and disallow in robots.

## 7. Phased Roadmap
### Phase 0 - Pre-flight & Safety Checks
- Baseline current sitemap, index counts, and top landing pages.
- Freeze existing routes and canonicals in a documented registry.
- Define allowed shop routes and robots rules before any merge.
- Stand up staging with separate crawler rules for the BFF.
- Validate that build and dev do not depend on live commerce APIs.
- Define rollout gates: max index delta, 404 rate, LCP budget, and rollback triggers.
- Define product content standards and metadata templates.
- Set up parameter handling rules and sitemap partitioning.
- Confirm bilingual shop routing (nl + en) and hreflang strategy.

### Phase 1 - Minimal Shop MVP
- Features:
  - Basic catalog, product detail pages, cart, checkout.
  - Single currency (EUR), BE-only shipping.
  - Shipping: EUR 7.50 up to 3kg, pickup by appointment (EUR 0).
  - Internal finance note: VAT exemption (kleine onderneming). Do not display this on the storefront UI.
  - Mollie redirect + webhook order confirmation + order emails.
- SEO guarantees:
  - Zero changes to existing URLs and canonicals.
  - New routes limited to `/shop` and product detail pages.
  - Cart/checkout remain noindex.
- Technical deliverables:
  - PHP BFF (`/bff`) with MySQL schema and Mollie integration.
  - Next.js shop pages (NL/EN) with static export + BFF fetch.
  - Product seed/import pipeline (SQL or simple seed).
  - Order confirmation emails (admin + customer) via SMTP.
  - CRM login for contact logs, replies, stock toggles, orders view.
  - Monitoring for 404s, canonicals, and index bloat.
  - Product lifecycle rules: out-of-stock, discontinued, and merged SKU handling.
  - Sitemap generation for shop URLs only, with strict inclusion rules.
  - Metadata, OpenGraph, and canonical QA checks for new pages.

### Phase 2 - Variants & Logistics
- Add limited variants (material, color, finish).
- Lead time logic for made-to-order items.
- Stock vs made-to-order rules with clear availability messaging.
- Shipping zones if needed, still minimal and SEO-safe.
- If category pages become indexable, require unique editorial content and breadcrumbs.

### Phase 3 - Conversion Optimization
- PDP UX improvements: better images, FAQs, trust signals.
- Cross-linking strategy from high-performing blog posts.
- Measurement: conversion funnel events without page duplication.
- A/B testing only on non-indexed or canonicalized pages.
- Reviews or UGC only if fully moderated and schema-safe.

### Phase 4 - Advanced Commerce (Future)
- Upload-to-print, automated pricing, and B2B logic.
- Deferred due to high complexity and SEO risk.
- Requires a separate discovery phase and dedicated QA for crawl impact.

## 8. Local Development & Build Safety
- `npm run dev` runs Next.js locally; PHP BFF must be served separately for CRM/login.
- `npm run build` must not call live Mollie endpoints.
- Use environment variables for API endpoints and secrets; fail fast if missing.
- All payment calls occur at runtime only (BFF routes).
- Build-time data uses stubs or cached fixtures where required.
- CI must block builds that point to production commerce endpoints.
- Production stays static-exported; no Next API/server actions in production runtime.

## 8.1 Go-live checklist (BFF + Mollie)
- [ ] Update BFF `.env` for production:
  - `SHOP_SITE_URL=https://x3dprints.be`
  - `BFF_BASE_URL=https://api.x3dprints.be`
  - `MOLLIE_API_KEY=<live key when ready>`
  - `APP_DEBUG=false`
  - Local dev: set `SHOP_SITE_URL=auto` (or leave empty) to use current host.
- [ ] Set CRM + mail in BFF `.env`:
  - `CRM_PASSWORD=<strong password>`
  - `SMTP_HOST/PORT/USER/PASS`, `MAIL_FROM`, `MAIL_TO`
- [ ] Ensure DB schema imported (`bff/schema.sql`) and demo products exist.
- [ ] Verify BFF health: `https://api.x3dprints.be/index.php?path=/health&debug=1`.
- [ ] Build/export on main machine (`npm run build`) and upload `out/`.
- [ ] Upload `public/crm-*.php`, `public/material-stock.php`, `public/contact-reply.php`, `public/storage/.htaccess`.
- [ ] Confirm `/shop/checkout/` exists on the live site.
- [ ] End-to-end test: add item -> checkout -> Mollie redirect -> back to `/shop/checkout/?order=...`.

## 9. Risk Register
| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| Accidental URL changes to existing pages | Low | Critical | Route freeze registry and CI checks |
| Index bloat from filters/search | Medium | High | Noindex + robots disallow for filters |
| Canonical mistakes on product pages | Medium | High | Canonical tests + sitemap validation |
| Duplicate product pages per variant | Medium | High | Single canonical SKU policy |
| Crawl budget dilution | Medium | High | Minimal new routes and clean sitemap |
| Thin product content | Medium | Medium | Minimum content standards per PDP |
| Performance regression on shop pages | Medium | High | LCP budgets and image optimization |
| BFF publicly crawled | Low | High | Isolate backend and restrict routes |
| Mollie webhook failures | Medium | High | Retries, logging, and manual reconciliation |
| Inventory mismatch | Medium | Medium | Periodic sync jobs and alerts |
| Robots or sitemap misconfig | Medium | High | Pre-merge checks and staging validation |
| Parameter explosion in URLs | Medium | High | Whitelisted params and canonical stripping |
| Duplicate titles/meta descriptions | Medium | Medium | Metadata QA and content templates |

## 10. Success Metrics
- SEO safety:
  - No ranking loss for top 50 existing landing pages.
  - Index count increases only by approved shop URLs.
  - Zero new 404s on existing pages.
  - Crawl stats stable (no sudden spikes).
  - Canonical mismatch rate < 1%.
  - Coverage errors in Search Console do not increase.
- Conversion:
  - Checkout completion rate.
  - Add-to-cart rate from product pages.
  - Revenue per visit from shop entry pages.
- Engagement:
  - CTR from blog to shop pages.
  - Time on product pages and scroll depth.
- Technical:
  - LCP < 2.5s on shop pages.
  - Error rate < 1% on checkout.
  - Webhook success rate > 99%.

## 11. Feasibility Check
- Feasible with current stack and constraints if routes remain additive.
- Primary dependencies: clean product data, stable slugs, and webhook reliability.
- Highest risk area is SEO integrity; mitigated by strict routing and robots rules.
- MVP can be delivered incrementally without touching existing pages.

## 12. Repo Scan Summary (current repo)
- `next.config.ts` uses `output: "export"`, `trailingSlash: true`, and unoptimized images.
- `app/robots.ts` currently only allows `/` and `/en` and disallows `/api` + `/crm`.
- `app/sitemap.ts` is explicit and does not include any `/shop` routes yet.
- JSON-LD helper factories are centralized in `lib/seo.ts`.
- Related-links mappings are centralized in `lib/seo-related-links.ts`.
- `app/api/contact/route.ts` exists but requires Node runtime (not compatible with static-only production).
- SEO checks already exist in `package.json` (`npm run check:seo`).
- PHP BFF lives in `/bff` with MySQL schema + Mollie integration.
- CRM endpoints are PHP scripts in `/public` and require `CRM_PASSWORD` in `bff/.env`.

## 13. Backlog (static export, BE, EN, VAT exempt)
### Phase 0 - Guardrails & Decisions
- [ ] Add shop route registry + indexation rules; update robots for `/shop/cart`, `/shop/checkout`, filters/params.
- [ ] Extend sitemap generation for indexable shop URLs only (exclude cart/checkout).
- [ ] Add Product JSON-LD helper in `lib/seo.ts` and wire schema tests.
- [x] Define BFF endpoints + env vars; ensure build-time uses stubs/fixtures.
- [x] Confirm bilingual `/shop` + `/en/shop` routing and hreflang mapping.

### Phase 1 - MVP (no product live)
- [x] Stand up PHP BFF + MySQL + Mollie; restrict public access.
- [x] Configure BE-only shipping: EUR 7.50 up to 3kg; pickup by appointment EUR 0.
- [x] Configure VAT exempt: no tax; internal note only (do not display on storefront).
- [x] Implement static shop pages (NL/EN): `/shop`, `/shop/[slug]`, `/shop/cart`, `/shop/checkout`.
- [ ] Keep `/shop` and product pages `noindex` until first SKU is live; always `noindex` cart/checkout.
- [x] Add product seed/import pipeline (SQL seed) + content template (unique copy/specs/images).
- [x] Add order confirmation email (admin + customer) via SMTP.
- [x] Add CRM login + orders view.
- [ ] Add monitoring for canonicals, 404s, and webhook failures.

### Phase 2 - First product live
- [ ] Add product content + assets; lock slug.
- [ ] Remove `noindex` from `/shop` + product page; add to sitemap.
- [ ] Run SEO checks + build; verify index delta and canonical integrity.

## 14. BFF API Contract (draft)
Base URL: separate backend service (no browser access). CORS allowlist = x3dprints.be only.

### Endpoints (public to Next)
- `GET /health` -> `{ ok: true, version }`
- `GET /shop/products?locale=nl|en` -> `{ products: [{ slug, name, summary, price: { amount: number, currency: "EUR", vatApplicable: false }, availability, image }] }`
- `GET /shop/products/{slug}?locale=nl|en` -> `{ product }` (same shape as list)
- `POST /shop/cart` -> `{ cartId, currency: "EUR", lines: [], totals, shippingMethods }`
- `POST /shop/cart/{cartId}/lines` -> `{ lineId, productSlug, quantity, totals }`
- `PATCH /shop/cart/{cartId}/lines/{lineId}` -> `{ lineId, quantity, totals }`
- `DELETE /shop/cart/{cartId}/lines/{lineId}` -> `{ cartId, totals }`
- `POST /shop/checkout` -> `{ checkoutUrl, orderCode }`

### Shipping methods
- `be_flat` -> `EUR 7.50` (<= 3 kg), `area: "BE"`
- `pickup` -> `EUR 0.00`, `label: "Afhalen op afspraak"`

### Webhooks (Mollie -> BFF)
- `POST /shop/webhooks/mollie` -> `{ ok: true }` (verify signature + idempotency key)

### Common rules
- All prices in EUR. Internal VAT exemption applies; keep storefront copy VAT-neutral.
- Product slugs are stable; no duplicate URLs per variant.

## 15. Product Seed Template (content-first)
- Single source of truth: `content/shop-products.ts` (NL + EN fields).
- `SHOP_INDEXABLE` stays `false` until first SKU is live.
- `SHOP_PRODUCT_SLUGS` only includes `isLive: true` products.

## 16. Shop SEO Audit (2026-02-11)
Scope: `/shop`, `/shop/[slug]`, `/shop/cart`, `/shop/checkout` and EN equivalents. Noindex ignored for assessment.

### Key positives
- Metadata, canonical, and hreflang are present on `/shop` and `/shop/[slug]`.
- Product pages include Product + BreadcrumbList JSON-LD via helpers.
- ReadMoreLinks + CTAs keep internal linking consistent.
- Product images have localized alt text from data.

### Gaps & improvements
- Shop listing has no ItemList schema; add a helper and emit ItemList with product URLs.
- `/shop` routes are not in `app/sitemap.ts` when indexable; add them when live.
- `app/en/(pages)/shop/layout.tsx` hard-codes noindex; should mirror `SHOP_INDEXABLE`.
- Product metadata depends on `summary`; empty summaries can cause duplicate descriptions.
- Product schema lacks shipping rate and price-valid-until fields (optional, but helpful).
- No shop FAQ on `/shop` or PDPs; add a small FAQ + `buildFaqPageSchema`.
- Product copy is thin (demo placeholders); add unique descriptions/specs before indexing.

### Priority actions
P0
- Add ItemList schema on `/shop` (NL+EN).
- Add `/shop` + product slugs to sitemap when indexable.
- Mirror `SHOP_INDEXABLE` in EN shop layout.
- Enforce non-empty product summaries in `content/shop-products.ts` or BFF.

P1
- Add FAQ section on `/shop` with schema helpers.
- Add shipping/pickup policy content on shop index or PDPs.

P2
- Expand product content depth (specs, use-case, materials, images).
- Add contextual links from relevant blog/organizers pages to top shop SKUs.
