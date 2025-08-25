/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/category/:slug*", destination: "/portfolio", permanent: true },
      { source: "/tag/:slug*", destination: "/portfolio", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      // voeg hier je WP-slugs toe -> nieuwe paden
    ]
  },
}
export default nextConfig
