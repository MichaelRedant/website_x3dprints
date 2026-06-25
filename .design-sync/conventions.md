# X3DPrints UI — component conventions

## Design language
X3DPrints uses a dark/light-switchable design with glassmorphism accents. The visual identity is modern and technical: deep navy backgrounds, gradient glass surfaces, and subtle glow effects. All components respect the theme context provided by `ThemeProvider`.

## Component patterns

### Composable wrappers
`Container` sets the max-width and horizontal padding. Most page sections wrap their content in `Container`. `AnimatedSection` wraps sections in a scroll-triggered entrance animation.

### Motion & interaction
- `Reveal`: fade/slide entrance animation triggered on scroll. Use `direction` and `delay` props to stagger sibling elements.
- `Parallax`: wraps an element in a subtle scroll parallax. Keep `speed` values small (0.1–0.3).
- `TiltCard`: adds a mouse-tracking 3D tilt effect to a card container.
- `AnimatedSection`: entrance animation for entire sections; composes with `Container`.

### Feedback / status
- `LeadTimeStatus`: shows the current production lead time fetched from an environment variable. Displays a coloured badge; the value is shimmed to an empty string outside the Next.js runtime.
- `Counter`: animates a number from `from` to `to`. Always pass `duration={0}` in static contexts (SSR, previews). Supports `prefix`, `suffix`, `decimals`, and `locale` (`nl-BE` by default).
- `ScrollProgress`: a thin progress bar at the top of the viewport tracking page scroll. Self-contained, no props required.

### Content display
- `Markdown`: renders a markdown string to HTML. Styles match the site's typography.
- `BlogFaq`: FAQ list for blog pages; accepts an array of `{ question, answer }` objects.
- `Faq`: general-purpose FAQ accordion; same data shape as `BlogFaq`.
- `Catchphrase`: large hero-style headline with optional sub-text.
- `HeroTrustBar`: a row of trust signals (logos, stats) displayed below the hero.
- `MaterialSwatches`: colour/material swatches grid; each swatch has a `name` and `color`.
- `GlassCard`: a glassmorphism card container. Wrap arbitrary content; the glass effect is applied to the card border and background.
- `GlassOrb`: decorative glowing sphere. Purely visual; no props. Place as a background accent.

### UI chrome
- `ThemeProvider`: must wrap the component tree. Supplies the dark/light theme context. Already applied in every preview.
- `ThemeToggle`: the dark/light mode toggle button. Reads from and writes to `ThemeProvider` context.
- `BackToTop`: floating button that scrolls the page to the top. Self-contained.

## Theming
All colour values are CSS custom properties (`--color-*`, `--bg-*`). Do not hard-code hex values; use the design tokens exposed in `styles.css`. The `ThemeProvider` switches token values between dark and light mode by toggling a class on `<html>`.

## Locale
Default locale is `nl-BE` (Belgian Dutch). Number formatting uses `.` as thousands separator and `,` as decimal separator.
