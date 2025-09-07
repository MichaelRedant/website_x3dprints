// next.config.ts
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Pure statische export (FTP/Apache)
  output: "export",

  // /pad/ -> /pad/index.html mappen (apache/vimexx vriendelijk)
  trailingSlash: true,

  // <Image> zonder server optimizer (geen Node runtime)
  images: { unoptimized: true },

  // Redirects doe je via .htaccess op de server
  async redirects() {
    return []
  },
}

export default nextConfig
