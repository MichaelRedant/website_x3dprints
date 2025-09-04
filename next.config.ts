// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Static Export (vervangt `next export`):
   * `npm run build` zal nu een `/out` map genereren.
   */
  output: "export",

  /**
   * Aan voor Apache/DirectAdmin:
   * Zorgt dat paden eindigen op een trailing slash
   * en dat `dir/index.html` netjes werkt.
   */
  trailingSlash: true,

  /**
   * Omdat er geen Next Image optimizer draait op shared hosting.
   * Next plaatst dan gewone <img>-tags / ge-optimaliseerde assets statisch.
   */
  images: {
    unoptimized: true,
  },

  async redirects() {
    return [
      { source: "/category/:slug*", destination: "/portfolio", permanent: true },
      { source: "/tag/:slug*", destination: "/portfolio", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      // voeg hier je WP-slugs toe -> nieuwe paden
    ];
  },
};

export default nextConfig;
