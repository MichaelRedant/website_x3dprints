// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Node runtime nodig voor API-routes (contactformulier)
  output: "standalone",
  // Maak paden voorspelbaar: elke route krijgt een map met index.html
  trailingSlash: true,
  // Gebruik <Image> zonder server-side optimizer
  images: { unoptimized: true },
  async redirects() {
    return [
      { source: "/category/:slug*", destination: "/portfolio", permanent: true },
      { source: "/tag/:slug*", destination: "/portfolio", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
