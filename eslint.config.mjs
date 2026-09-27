import { defineConfig, globalIgnores } from "eslint/config"
import nextVitals from "eslint-config-next/core-web-vitals"
import nextTypescript from "eslint-config-next/typescript"

export default defineConfig([
  ...nextVitals,
  ...nextTypescript,
  {
    rules: {
      // Preserve the existing React 19 patterns; these compiler-oriented rules were not part of the Next 15 baseline.
      "react-hooks/immutability": "off",
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/static-components": "off",
    },
  },
  globalIgnores([
    "node_modules/**",
    ".next/**",
    ".next-dev/**",
    ".next-build/**",
    "out/**",
    "build/**",
    "tmp/**",
    "next-env.d.ts",
  ]),
])
