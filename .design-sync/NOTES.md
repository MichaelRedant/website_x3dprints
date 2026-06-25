# Design-sync notes — X3DPrints website components

## Repo-specific setup

- **No dist/**: Next.js website (`noEmit: true`). Converter runs in synth-entry mode via `.design-sync/ds-entry.tsx` barrel. Pass `--entry ./.design-sync/ds-entry.tsx` on every build.
- **Tailwind CSS v4**: CSS is built via `.design-sync/build-css.mjs` (PostCSS/`@tailwindcss/postcss`) before running the converter. `cfg.cssEntry` points at `.design-sync/styles-built.css`.
- **`process` shim**: `lib/seo.ts` and `lib/lead-time.ts` use `process.env.NEXT_PUBLIC_*` at module init. Fork at `.design-sync/overrides/bundle.mjs` injects `window.process=window.process||{env:{}};` as a banner. Per-rebuild: symlink `.design-sync/node_modules -> ../.ds-sync/node_modules` must exist.
- **Inter font not shipped**: Used in body font-family but loaded from system/OS (no `@font-face`, no `next/font` import for Inter). Suppressed via `cfg.runtimeFontPrefixes`. Designs render with system-ui fallback.

## CTA

`components/CTA.tsx` is an empty file — the converter silently drops it (no exports). Set to `null` in `componentSrcMap`. If the component is filled in later, change it back to `"components/CTA.tsx"` and re-sync.

## Excluded components (Next.js or complex deps)

Components excluded from the bundle because they directly or transitively import from Next.js (`next/link`, `next/navigation`, etc.) or have complex data/state dependencies:
- **Direct Next.js deps**: AnalyticsConsent, AutoCarousel, BlogAuthorNote, BlogInlineCta, BlogSearch, BlogShareFooter, ContactForm, ContactThankYouPanel, ContentTableOfContents, CookieBanner, CtaBlock, FaqPromo, Footer, FooterLocationFinder, GoogleReviewHighlights, Header, HeadsetSpacerCasePage, LanguageSwitcher, LocationShowcase, MachineReadableResourcesPage, MaterialCard, MaterialDecisionAssistant, MaterialSuggestionTool, MiniToc, ModuGridCarousel, OrganizerBundles, OrganizerCta, PortfolioGallery, PriceEstimator, ReadMoreLinks, ReturnPolicyPage, ShimmerButton, ShopCartStickySummary, ShopCartView, ShopInquiryModal, ShopOrderSuccessNotice, ShopProductGrid, TiltImage, VideoGallery
- **Transitive Next.js**: QuickContactActions (→ ShimmerButton → next/link), MaterialGrid (→ MaterialCard → next/link)
- **Complex data/state**: CookieSettingsButton, FilamentHeroVisual, LocaleProvider, MaterialSuggestionToolLoader, ModelViewer, ModelViewerClient, ShopAddToCartButton, ShopAddToCartPanel, ShopCartState, ShopProductActionButton

## Known render warns

- **GlassOrb `[RENDER_THIN]`**: Pure CSS decorative glow orb — no text by design. The 24.9KB PNG shows the blue/purple gradient sphere correctly. Thin warn expected; not a real issue.

## Build commands (re-sync)

```bash
# 1. Rebuild Tailwind CSS (if globals.css changed)
node .design-sync/build-css.mjs

# 2. Run converter
node .ds-sync/package-build.mjs --config .design-sync/config.json --node-modules ./node_modules --entry ./.design-sync/ds-entry.tsx --out ./ds-bundle

# 3. Validate
node .ds-sync/package-validate.mjs ./ds-bundle
```

## Re-sync risks

- **`lib/seo.ts` and `lib/lead-time.ts`**: Use `process.env.NEXT_PUBLIC_*`. These are shimmed to empty strings in previews. If these components start displaying dynamic content (phone numbers, lead time values), the previews will show blanks/defaults — not a render failure but misleading content. Re-verify if those lib files change significantly.
- **Tailwind CSS build**: `build-css.mjs` uses `@tailwindcss/postcss` directly. If the Tailwind version bumps, re-run this first. The built CSS at `.design-sync/styles-built.css` is NOT committed — regenerate on every re-sync.
- **ThemeProvider as provider**: `cfg.provider.component` is set to ThemeProvider. If ThemeProvider's API changes, all previews may break silently. Re-verify after ThemeProvider changes.
- **Excluded components worth adding later**: Once Next.js dependencies are factored out (e.g. a version of ShimmerButton that accepts `href` as props without `next/link`), those components can be added to the barrel and config.
