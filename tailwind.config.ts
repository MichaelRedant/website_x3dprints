// tailwind.config.ts
import type { Config } from "tailwindcss"
import typography from "@tailwindcss/typography"
import plugin from "tailwindcss/plugin"

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}", // zorg dat .md ook gescand wordt
  ],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#111827", accent: "#00E0B8" },
      },
      boxShadow: {
        soft: "0 10px 25px rgba(0,0,0,0.08)",
        glass: "0 10px 40px rgba(0,0,0,0.08)",
      },
      borderRadius: { xl: "1rem", "2xl": "1.25rem" },
      // tailwind.config.ts (uittreksel)
typography: ({ theme }) => ({
  x3d: {
    css: {
      color: theme("colors.slate.700"),
      maxWidth: "65ch",

      /* Headings */
      "h1,h2,h3,h4": {
        fontWeight: "700",
        lineHeight: "1.15",
        backgroundImage: "linear-gradient(90deg,#0f172a,#334155,#0f172a)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
      },
      h1: { fontSize: theme("fontSize.3xl")[0], marginBottom: theme("spacing.3") },
      h2: { fontSize: theme("fontSize.2xl")[0], marginTop: theme("spacing.8"), marginBottom: theme("spacing.3") },
      h3: { fontSize: theme("fontSize.xl")[0],  marginTop: theme("spacing.6"), marginBottom: theme("spacing.2") },

      /* Spacing / readability */
      p:  {
        color: theme("colors.slate.700"),
        lineHeight: "1.75",
        marginTop: "1.1em",
        marginBottom: "1.1em",
      },
      "ul,ol": {
        marginTop: "1.1em",
        marginBottom: "1.1em",
      },
      li: {
        marginTop: "0.35em",
        marginBottom: "0.35em",
      },
      table: {
        width: "100%",
        borderCollapse: "separate",
        borderSpacing: 0,
        fontSize: theme("fontSize.sm")[0],
        backgroundColor: "rgba(255,255,255,0.45)",
        backdropFilter: "blur(10px)",
        borderRadius: "1rem",
        overflow: "hidden",
        marginTop: "1.5em",
        marginBottom: "1.5em",
      },
      thead: {
        backgroundColor: "rgba(255,255,255,0.6)",
        color: theme("colors.slate.800"),   // ✅ fixed
      },
      "th,td": {
        padding: ".75rem 1rem",
        borderBottom: "1px solid rgba(148,163,184,0.25)",
      },
      "tbody tr:last-child td": { borderBottom: "none" },

      blockquote: {
        backgroundColor: "rgba(255,255,255,0.5)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.35)",
        borderRadius: "1rem",
        padding: theme("spacing.5"),
        fontStyle: "normal",
        color: theme("colors.slate.800"),    // ✅ fixed
        marginTop: "1.4em",
        marginBottom: "1.4em",
      },

      hr: { display: "none" },

      /* Links / code / images */
      strong: { color: theme("colors.slate.900") },
      a: {
        color: theme("colors.cyan.700"),
        textDecoration: "underline",
        textUnderlineOffset: "4px",
        transition: "opacity .2s ease",
      },
      "a:hover": { opacity: ".85" },
      code: {
        backgroundColor: "rgba(15,23,42,0.05)",
        padding: "0.15rem 0.4rem",
        borderRadius: "0.5rem",
        fontWeight: "600",
        color: theme("colors.slate.900"),
      },
      pre: {
        backgroundColor: "rgba(15,23,42,0.9)",
        color: "white",
        borderRadius: "1rem",
        padding: theme("spacing.5"),
        boxShadow: "0 24px 70px rgba(2,6,23,0.35)",
      },
      img: {
        borderRadius: "1rem",
        boxShadow: "0 10px 40px rgba(0,0,0,0.06)",
        margin: "1.25rem auto",
      },
    },
  },
}),

    },
  },
  plugins: [
    typography,

    // Extra polish: checklists & tabel-scroll
    plugin(({ addComponents, theme }) => {
      addComponents({
        /* Scrollbare wrapper voor brede tabellen */
        ".table-wrap": {
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
        },
        ".table-wrap table": {
          minWidth: "560px",
        },

        /* GFM task list checkboxes */
        '.prose :where(input[type="checkbox"])': {
          appearance: "none",
          width: "1.05em",
          height: "1.05em",
          marginRight: ".55rem",
          borderRadius: ".35rem",
          border: "1px solid rgba(148,163,184,.6)",
          background: "rgba(255,255,255,.6)",
          verticalAlign: "middle",
          position: "relative",
          top: "-1px",
        },
        '.prose :where(input[type="checkbox"]:checked)': {
          background: "linear-gradient(180deg,#22d3ee,#06b6d4)",
          borderColor: "transparent",
        },
        '.prose :where(input[type="checkbox"]:checked)::after': {
          content: '""',
          position: "absolute",
          inset: "0",
          WebkitMask:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><path fill='white' d='M6.2 11.3 3.4 8.5l-1 1 3.8 3.8 7.4-7.4-1-1z'/></svg>\") center / 12px 12px no-repeat",
          mask:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><path fill='white' d='M6.2 11.3 3.4 8.5l-1 1 3.8 3.8 7.4-7.4-1-1z'/></svg>\") center / 12px 12px no-repeat",
          background: "white",
        },

        /* Subtielere markers */
        ".prose :where(ul>li)::marker": {
          color: theme("colors.slate.400"),
        },
      })
    }),
  ],
}

export default config
