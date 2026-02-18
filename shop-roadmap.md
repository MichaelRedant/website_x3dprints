# SEO-First Shop Roadmap

Date: 2026-02-16  
Scope: Incremental commerce rollout on the existing Next.js website with zero SEO regression tolerance.

## Baseline Audit & Feasibility Verdict

Current-state audit (repository + scripts):
- The website already has a large indexed footprint: `out/sitemap.xml` contains 1038 URLs.
- Existing SEO controls are mature and automated (`npm run check:seo:sitemap` and `npm run check:seo:robots` pass).
- Current shop routes already exist under `/shop` and `/en/shop`, with `SHOP_INDEXABLE` gating and noindex on cart/checkout.
- The current commerce backend is a separate PHP BFF with MySQL + Mollie.
- Repository is currently single-app (no `apps/web`, no `apps/commerce`, no `docker/` directory).
- `npm run build` currently fails in baseline due static-export constraints on `/shop/[slug]`; this must be resolved before any migration starts.

Feasibility verdict:
- Feasible: Yes, with a staged, SEO-first migration.
- Risk level: Medium, mostly due to build/runtime mode alignment and crawl/indexation guardrails.
- Critical prerequisite: Stabilize build/export behavior before introducing Vendure.

---

## 1. Vision & Principles

The shop is an extension of the existing site, not a replacement.
- The current website remains the canonical acquisition engine.
- Blog, materials, service, location, and segment pages remain primary discovery channels.
- Commerce is introduced as an additive conversion layer for qualified visitors.

SEO-first commerce principles:
- Zero URL changes for existing indexed pages.
- Additive routing only for new shop functionality.
- No removal, rename, or restructuring of existing content hubs.
- Canonical ownership remains in the current Next.js web app.
- Commerce data must support, not override, existing informational intent.

What must never be done (SEO anti-patterns):
- Never mass-redirect existing informational pages to shop pages.
- Never change canonical URLs of already indexed pages to new shop URLs.
- Never move blog content into product pages.
- Never index cart, checkout, account, search-parameter, or faceted parameter pages.
- Never allow Vendure admin/api endpoints to be crawlable.
- Never generate near-duplicate product pages per filter/sort/query state.

---

## 2. Non-Negotiable SEO Constraints

- URL stability:
  - All existing paths remain byte-for-byte stable.
  - Existing trailing slash behavior remains unchanged.
- Canonical integrity:
  - Exactly one canonical per indexable URL.
  - Existing canonical map remains unchanged for legacy pages.
- Internal link preservation:
  - Existing internal links between blog/materials/services/segments remain intact.
  - No automated replacement of current links with shop links.
- Crawl budget protection:
  - Noindex + robots disallow for cart, checkout, account, search/filter params.
  - Avoid infinite crawl surfaces from parameterized navigation.
- Duplicate content prevention:
  - One indexable product URL per product slug and locale.
  - Filter/sort states are non-indexable and canonicalized away.
- Filter/indexing strategy:
  - Facets remain user UX features, not indexable pages, unless explicitly promoted with unique content.
- Product vs blog intent separation:
  - Blog answers informational intent.
  - Product pages answer transactional intent.
  - No intent cannibalization by cloning blog copy into product descriptions.

---

## 3. High-Level Architecture

Runtime architecture:
- `apps/web`: Existing Next.js frontend remains the only public crawl surface.
- `apps/commerce`: Vendure headless backend, private API surface for commerce operations.
- `docker/`: Local MySQL and optional admin tooling (for development only).
- Mollie: payment redirect + webhook handled by Vendure payment flow.

Why Vendure is isolated and not publicly crawled:
- Vendure endpoints are operational APIs, not SEO landing pages.
- Crawling API/admin endpoints wastes crawl budget and creates noise.
- Isolate via subdomain/network controls + robots/header hardening + no public linking.

How MySQL is used:
- Single source of truth for products, variants, inventory, orders, shipping, and payment states.
- Separate commerce schema from content/marketing data to reduce coupling.

How Mollie integrates:
- Checkout starts in `apps/web` via commerce action.
- Vendure creates payment and returns Mollie redirect URL.
- User pays at Mollie.
- Mollie webhook updates payment/order state in Vendure.
- Web app shows confirmation from trusted order state.

Logical flow:
- User -> Next.js (`apps/web`) -> Vendure (`apps/commerce`) -> Mollie -> Vendure webhook -> Next.js confirmation UI

Separation of concerns:
- Next.js web:
  - SEO, metadata, canonical policy, internal linking, content marketing, UX shell.
- Vendure:
  - Catalog, cart, checkout, pricing, stock logic, order state machine, Mollie integration.
- MySQL:
  - Durable transactional storage.

Local dev vs production (safe differences):
- Local:
  - `docker` MySQL, seeded test catalog, Mollie test mode.
- Production:
  - Managed MySQL, strict env separation, live Mollie key only in commerce runtime.
- Shared rule:
  - No secret commerce credentials in frontend public env.

---

## 4. Shop Scope Definition (MVP First)

Phase 1 scope (minimal footprint):
- Product types:
  - Standard fixed-price products.
  - Made-to-order products with explicit lead time ranges.
- Product detail:
  - Core gallery, summary, specs, availability, lead time.
- Variants:
  - Only where mandatory (for example one material or one size axis).
- Shipping:
  - Simple flat-rate shipping + pickup option.
- Checkout:
  - Basic cart, checkout, Mollie redirect, success/failure handling.

Explicitly out of scope in Phase 1 (and why):
- File upload:
  - Deferred to avoid security/storage complexity and UX debt at launch.
- Instant pricing calculator:
  - Deferred because geometry-based pricing is high-risk and easy to misprice.
- Complex variant matrix:
  - Deferred to avoid index bloat and inventory complexity.
- B2B workflows (quotes, net terms, company approval chains):
  - Deferred until baseline D2C funnel and operations are stable.
- Advanced promotions and bundling engine:
  - Deferred to keep MVP predictable and testable.

---

## 5. SEO-Safe URL Strategy

Allowed shop routes (indexable where relevant):
- `/shop/`
- `/shop/[slug]/`
- `/en/shop/`
- `/en/shop/[slug]/`

Allowed non-indexable transactional routes:
- `/shop/cart/`
- `/shop/checkout/`
- `/en/shop/cart/`
- `/en/shop/checkout/`

Forbidden route patterns:
- New top-level commerce namespaces that duplicate intent (for example `/products/`, `/store/`, `/catalog/`) during MVP.
- Indexable query-state URLs such as `?sort=`, `?filter=`, `?page=` unless explicitly approved as landing pages.
- Any route rename of existing content URLs.

Coexistence with current content architecture:
- Blog/materials/pricing/segments/services remain unchanged.
- Product pages target purchase intent only.
- Existing educational pages keep priority in navigation and linking hierarchy.

Internal linking policy:
- Recommended: blog -> relevant shop PDP/listing when transactional intent is clear.
- Do not force global shop backlinks from every existing page.
- Shop pages may include selective context links, but avoid aggressive template-wide reciprocal linking that distorts intent.

---

## 6. Structured Data & Indexation Strategy

Product schema policy:
- Add `Product` schema only on indexable product detail pages.
- Add `ItemList` on `/shop/` listing pages.
- Keep cart/checkout schema-free (non-indexable transactional pages).

Offers, availability, and price:
- `offers.price`, `priceCurrency`, and `availability` must match the commerce source of truth.
- If price or availability cannot be trusted at render time, do not emit stale offer data.
- Use explicit in-stock/preorder/out-of-stock signals aligned with UI.

When schema is added vs skipped:
- Add schema when the page has stable, user-visible data.
- Skip schema on placeholder/prelaunch products, test SKUs, and pages behind temporary toggles.

Conflict prevention with existing schemas:
- Keep `Article` schema only on blog pages.
- Keep FAQ/HowTo schemas tied to the pages that visibly contain that content.
- Do not combine unrelated `Article` and `Product` entities on a single URL unless the page truly serves both intents.

Indexation control:
- Maintain noindex on cart/checkout and any utility pages.
- Ensure sitemap only includes intended indexable shop URLs.
- Keep canonical self-referential for each final product URL.

---

## 7. Phased Roadmap

### Phase 0 - Pre-flight & Safety Checks

Preconditions before any shop migration merge:
- Freeze SEO baseline:
  - Export full route inventory, canonical map, robots policy, sitemap snapshot, and internal linking baseline.
- Resolve baseline build safety:
  - Fix current `npm run build` static-export failure on `/shop/[slug]`.
- Introduce migration safety rails:
  - Feature flags for catalog visibility and indexability.
  - Contract tests for canonical tags, robots directives, and sitemap inclusion.
- Define monorepo transition plan:
  - Introduce `apps/web`, `apps/commerce`, and `docker/` without route behavior change.
- Add observability prerequisites:
  - Track crawl/index errors, 404/5xx, structured-data errors, and checkout failures.

Technical deliverables:
- Approved architecture decision record.
- Baseline SEO snapshot artifacts committed to repository.
- CI gates that fail on route/canonical/sitemap regressions.

### Phase 1 - Minimal Shop MVP

Features:
- Vendure catalog with minimal product model.
- Shop listing and product detail pages under existing `/shop` namespace.
- Cart and checkout with Mollie redirect and webhook confirmation.
- No file upload, no instant quote engine.

SEO guarantees:
- Existing non-shop routes untouched.
- Product schema only on live, indexable PDPs.
- Cart/checkout always non-indexable.
- Sitemap inclusion only for approved live product slugs.

Technical deliverables:
- `apps/commerce` Vendure service with MySQL.
- `apps/web` commerce adapters and shop pages wired to Vendure read model.
- Feature-flagged release toggle for indexability.

### Phase 2 - Variants & Logistics

Features:
- Controlled variant support (for example material/color where justified).
- Lead-time logic by variant.
- Stock-managed vs made-to-order product mode.
- Basic shipping zone/rule refinements.

SEO guarantees:
- Variant states do not create new indexable URLs by default.
- Canonical remains at parent PDP unless a variant URL has unique value and approved SEO intent.

Technical deliverables:
- Extended product model in Vendure.
- Inventory + lead-time service rules.
- Updated schema mapping for availability signals.

### Phase 3 - Conversion Optimization

Features:
- Product page UX improvements (trust blocks, clearer CTAs, friction reduction).
- Lightweight recommendation blocks based on intent.
- Controlled cross-linking from high-intent content to shop pages.

SEO guarantees:
- No auto-generated thin pages.
- No broad template-level link flooding.
- Controlled experimentation with rollback-ready flags.

Technical deliverables:
- Event tracking for funnel steps.
- A/B testing framework constrained to UX components, not URL architecture.
- Reporting dashboard for SEO + conversion joint health.

### Phase 4 - Advanced Commerce (Future)

Deferred capabilities:
- Upload-to-print workflows.
- Automated geometry/material pricing.
- B2B account logic, quote approvals, and contract pricing.

Why deferred:
- High complexity and operational risk.
- Higher probability of SEO side effects if rushed.
- Requires proven baseline checkout stability and data governance first.

---

## 8. Local Development & Build Safety

How `npm run dev` should work:
- Start `apps/web` (Next.js) and `apps/commerce` (Vendure) concurrently.
- MySQL runs via `docker` compose.
- If commerce is unavailable, web dev mode should degrade safely with fixture catalog data for non-transactional rendering.

How `npm run build` stays safe:
- Build must not depend on live Vendure or Mollie connectivity.
- Build uses deterministic catalog inputs (fixtures, snapshots, or pre-fetched artifacts).
- Any checkout/payment call remains runtime-only.

Environment variable discipline:
- Public frontend env only for non-secret values.
- Vendure secrets (`MOLLIE_API_KEY`, DB credentials, webhook secrets) only in `apps/commerce` runtime env.
- Separate local/staging/production env files with strict naming and validation.

Payment/build safety rule:
- No payment API call is executed during static generation or CI build.
- Payment integration is exercised only in runtime/integration test paths.

---

## 9. Risk Register

| Risk | Likelihood | Impact | Mitigation Strategy |
| --- | --- | --- | --- |
| Existing URL changes during monorepo move | Medium | Critical | Route snapshot tests + hard rule: no path changes, additive only |
| Canonical drift on legacy pages | Medium | Critical | Canonical regression tests in CI; block merge on diffs |
| Index bloat from filter/query URLs | High | High | noindex + robots disallow + canonical-to-base + no sitemap inclusion |
| Duplicate product pages across locale/variants | Medium | High | One canonical per slug/locale; controlled variant URL policy |
| Vendure endpoints crawled/indexed | Medium | Medium | Isolated subdomain/network, no public links, robots and auth hardening |
| Build instability from live commerce dependency | High | High | Build-time fixture/snapshot strategy; no live API required for build |
| Payment state desync (Mollie redirect/webhook/order state) | Medium | High | Idempotent webhook handling + retry + order-state reconciliation job |
| Data mismatch between schema and UI price/availability | Medium | High | Schema generated from the same read model as UI; freshness checks |
| Internal linking over-optimization harming intent focus | Medium | Medium | Editorial link governance with intent-based linking rules |
| Operational load spikes during rollout | Medium | Medium | Feature flags, phased release, canary monitoring, rollback playbook |

---

## 10. Success Metrics

SEO safety KPIs:
- 0 net loss in organic sessions on existing non-shop landing pages (rolling 8 weeks).
- 0 unexpected changes in indexed URL count for non-shop namespaces.
- 0 critical canonical/coverage errors introduced in Search Console post-release.
- Shop indexation confined to approved `/shop` listing + PDP URLs only.

Conversion KPIs:
- Product page to cart rate.
- Cart to checkout start rate.
- Checkout completion rate.
- Revenue per organic shop session.

Engagement KPIs:
- Blog-to-shop assisted session rate.
- Product detail engagement depth (specs, shipping info, CTA interactions).
- Return visitor conversion uplift for commerce pages.

Technical KPIs:
- `npm run build` pass rate in CI: 100% on main.
- Commerce API availability target (for example >= 99.9%).
- Webhook processing success rate and retry resolution SLA.
- Structured data validity rate on shop PDP templates.

---

Execution rule:
- Do not start Phase 1 until Phase 0 gates pass and baseline SEO regression checks are green.
