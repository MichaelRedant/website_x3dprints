# SEO-First Shop Roadmap (Next.js + Vendure)

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
  - Next.js frontend in `apps/web`.
  - Vendure headless backend in `apps/commerce`.
  - MySQL for commerce data only.
  - Mollie handles payments via redirect and webhook callbacks.
- Vendure is isolated:
  - Not publicly crawled or indexed.
  - Accessed by Next.js server routes or server actions only.
  - Network-level restriction (private service or allowlist).
  - Robots disallow and auth on any public endpoints.
- Logical flow:
  - User -> Next.js -> Vendure -> Mollie -> Vendure -> Next.js.
- Separation of concerns:
  - Next.js owns routing, rendering, SEO, and content.
  - Vendure owns catalog, carts, orders, and payment orchestration.
  - No direct browser access to Vendure APIs.

## 4. Shop Scope Definition (MVP First)
Phase 1 scope (minimal footprint):
- Standard fixed-price products with simple descriptions.
- Made-to-order allowed only with a fixed lead time.
- No file upload or custom quote logic.
- No instant pricing or dynamic configurators.
- Variants only if strictly necessary (e.g., size or color).
- Simple shipping rules (one region, flat rate or single tier).
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
- Stand up staging with separate crawler rules for Vendure.
- Validate that build and dev do not depend on live commerce APIs.
- Define rollout gates: max index delta, 404 rate, LCP budget, and rollback triggers.
- Define product content standards and metadata templates.
- Set up parameter handling rules and sitemap partitioning.

### Phase 1 - Minimal Shop MVP
- Features:
  - Basic catalog, product detail pages, cart, checkout.
  - Single currency, simple tax, and flat shipping.
  - Mollie redirect + webhook order confirmation.
- SEO guarantees:
  - Zero changes to existing URLs and canonicals.
  - New routes limited to `/shop` and product detail pages.
  - Cart/checkout remain noindex.
- Technical deliverables:
  - Vendure setup with MySQL in `apps/commerce`.
  - Next.js shop pages in `apps/web` with server-side fetching.
  - Product import pipeline (CSV or simple seed).
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
- `npm run dev` runs Next.js and Vendure locally with MySQL in docker.
- `npm run build` must not call live Vendure or Mollie endpoints.
- Use environment variables for API endpoints and secrets; fail fast if missing.
- All payment calls occur at runtime only (server action or API route).
- Build-time data uses stubs or cached fixtures where required.
- CI must block builds that point to production commerce endpoints.

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
| Vendure publicly crawled | Low | High | Isolate backend and restrict routes |
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
