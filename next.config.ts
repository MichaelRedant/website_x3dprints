// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // We bouwen een pure statische site (FTP deploy)
  output: "export",

  // Zorgt voor /pad/ -> /pad/index.html mappen (handig op Apache)
  trailingSlash: true,

  // Gebruik <Image> zonder optimizer (geen Node runtime)
  images: { unoptimized: true },

  // Redirects verhuizen we naar .htaccess (Next export voert ze niet server-side uit)
  async redirects() {
    return [];
  },
};

export default nextConfig;
