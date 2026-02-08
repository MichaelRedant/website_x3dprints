// next.config.ts
import type { NextConfig } from "next"

const configuredDistDir = process.env.NEXT_DIST_DIR?.trim()

const nextConfig: NextConfig = {
  // Splits dev/build caches om chunk-conflicts te vermijden tijdens lokaal werken
  ...(configuredDistDir ? { distDir: configuredDistDir } : {}),

  // Pure statische export (FTP/Apache)
  output: "export",

  // Sommige dynamische pagina's (locaties/blog) hebben wat langere build-tijd nodig
  staticPageGenerationTimeout: 240,

  // /pad/ -> /pad/index.html mappen (apache/vimexx vriendelijk)
  trailingSlash: true,

  // <Image> zonder server optimizer (geen Node runtime)
  images: { unoptimized: true },

}

export default nextConfig
