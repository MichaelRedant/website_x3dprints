# Shop UI/UX Blueprint (SEO-first, modern, conversion-safe)

This document is the UI/UX plan for the shop. It is design-first, no code.
Goal: a modern, clean, fast storefront that protects existing SEO.

---

## 1) Goals and guardrails
- Preserve existing routes, canonicals, and internal links.
- Keep /shop pages minimal and high quality. No thin content.
- Cart/checkout are always noindex.
- Filters do not create indexable URLs.
- Build for speed: LCP < 2.5s, CLS < 0.1.

---

## 2) Experience pillars (what the UI must feel like)
- Consistent with the current site: same visual language, spacing, and components.
- Sales focused: clear value + next action per section.
- Trust first: delivery, support, and quality signals visible early.
- Local and premium: made in Belgium tone, not generic.
- Fast feedback: quick interactions, optimistic UI where safe.
- Mobile first: thumb-friendly, short scrolls, sticky CTA.

---

## 3) Information architecture (IA)
Primary routes:
- /shop (index + category overview if used)
- /shop/[slug] (product detail)
- /shop/cart (noindex)
- /shop/checkout (noindex)

Navigation:
- Main nav: Shop is a top-level item but does not replace Services.
- On shop pages: subtle back-links to Services/Materials, no hard redirects.
- Footer: shop links but not above core service links.

---

## 4) Page blueprints (structure + sections)

### 4.1 /shop (listing)
Above the fold:
- H1: "Shop" with a 1-line value proposition.
- 1-2 trust badges (local production, fast lead time).
- Primary CTA: "Bekijk producten".

Body:
- Product grid (2-3 columns desktop, 1-2 mobile).
- Quick highlights per card (price, lead time, availability).
- Optional: "Popular" or "Recommended" row.

Bottom:
- Short FAQ (2-3 Q/A) about ordering and delivery.
- Contextual links to Materials/Services.

Filters:
- Client-only filters (no URL params, no indexing).
- Keep filters minimal: availability, lead time, category.

### 4.2 /shop/[slug] (product detail page)
Above the fold:
- Product image (large, crisp, fast).
- H1 with short summary.
- Price, availability badge, lead time.
- Primary CTA: "In winkelmand".
- Secondary: "Vraag advies" (to contact).

Mid page:
- Product highlights (3-5 bullets).
- Specs table (material, size, finish, weight range).
- Delivery and support (short paragraph).

Lower page:
- FAQ accordion (3-5 items).
- Related products (2-4 max).
- Contextual link to a relevant blog guide.

### 4.3 /shop/cart (noindex)
- Items list with qty controls.
- Shipping method preview (selected later at checkout).
- Price breakdown.
- CTA: "Verder naar afrekenen".
- Trust / secure payment note.

### 4.4 /shop/checkout (noindex)
- Step layout: Contact -> Delivery -> Review -> Pay.
- Minimal fields only (no friction).
- Mollie redirect CTA with clear return message.
- Post-payment state in same route (success, failed, canceled).

---

## 5) Component system (modern and consistent)
Core components:
- Product card (image, title, price, lead time, CTA).
- Price block (price + availability + lead time).
- Availability badge (In stock, Preorder, Limited, Out of stock).
- CTA buttons (primary, secondary, ghost).
- Specs table (simple, 2-column).
- FAQ accordion (clean, single open).
- Trust bar (delivery, support, made local).
- Breadcrumbs (only if category exists).

Micro-interactions:
- Hover lift on cards (subtle).
- Add-to-cart feedback (toast + cart count).
- Sticky "Add to cart" on mobile.

---

## 6) Visual direction (aligned to current site)
Tone:
- Match existing brand styling and section layouts (no new look).
- Keep hero and section hierarchy consistent.
- Use the same accent color, button styles, and spacing scale.

Typography:
- Follow current heading sizes and text styles.
- Keep the existing H1 rhythm and section titles.

Imagery:
- Same treatment as current portfolio/product visuals.
- One hero image per product, 2-3 supporting images max.

---

## 7) Copy and microcopy guidelines (sales-focused)
Principles:
- Short sentences. One idea per line.
- Functional language, no hype.
- Emphasize local, made-to-order, quality.
- Always end a section with a clear next step.

Examples (NL):
- CTA primary: "In winkelmand"
- CTA secondary: "Vraag advies"
- Lead time: "Levering in 5-10 dagen"
- Availability: "Op voorraad" / "Op bestelling"
- Cross-sell section title: "Combineer met" or "Past goed bij"
- Cross-sell helper text: "Slimme aanvulling voor je bestelling"

Examples (EN):
- CTA primary: "Add to cart"
- CTA secondary: "Request advice"
- Lead time: "Ships in 5-10 days"

---

## 8) SEO-safe content structure
- One H1 per page.
- Unique product copy (no template-only pages).
- FAQ content on PDP only.
- Product schema only on PDP.
- Noindex for cart/checkout and filters.

---

## 9) Accessibility and UX quality
- Focus states visible on all inputs and buttons.
- Form labels always present, no placeholder-only fields.
- Color contrast meets WCAG AA.
- Keyboard navigation for carts and accordions.
- Reduced motion support for animations.

---

## 10) Performance and rendering rules
- Image sizes defined with correct aspect ratios.
- LCP element should be product image or H1 only.
- Avoid heavy JS on shop pages.
- Minimal blocking CSS; use existing Tailwind pipeline.

---

## 11) Error, empty, and edge states
Required states:
- Empty cart
- Out of stock (no CTA)
- Checkout failed / canceled
- Product not found (soft recovery to /shop)
- Payment success (clear next steps)

---

## 13) Sales sections (where to place cross-sell)
Listing page:
- "Populaire combinaties" below the grid (2-4 items).
- "Past goed bij" row per category (if used).

Product detail page:
- "Combineer met" section under specs (2-4 items).
- "Aanvullende keuzes" for materials/finishes (if applicable).

Cart page:
- "Maak het compleet" section with 1-3 add-ons.
- Keep it subtle; do not block checkout.

Cross-sell data:
- Uses product tags from CRM (comma-separated).
- Only show items with shared tags.

---

## 12) Release approach (UI-first, zero SEO risk)
Phase A: Wireframes + IA approval
Phase B: Component specs + copy
Phase C: Build listing + PDP skeletons (noindex)
Phase D: Cart/checkout UX
Phase E: QA (SEO + a11y + performance)
Phase F: First SKU live and indexable
