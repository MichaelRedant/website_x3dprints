// next.config.ts
import type { NextConfig } from "next";

const isExport = process.env.NEXT_OUTPUT === "export" || process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // ← noodzakelijk voor Netlify/Vimexx/Apache statische hosting
  output: "export",
  // Maak paden voorspelbaar: elke route krijgt een map met index.html
  trailingSlash: true,
  // Gebruik <Image> zonder server-side optimizer
  images: { unoptimized: true },

  // Redirects worden genegeerd bij export (Next waarschuwing is normaal).
  // Laat ze gerust staan voor lokale/vercel dev; bij statische export worden ze genegeerd.
  async redirects() {
    return [
      { source: "/category/:slug*", destination: "/portfolio", permanent: true },
      { source: "/tag/:slug*", destination: "/portfolio", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
