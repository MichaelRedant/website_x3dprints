import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { readFile } from "fs/promises"
import { join } from "path"
import { remark } from "remark"
import html from "remark-html"
import { getAllLocationSlugs, getLocationBySlug } from "@/lib/locations"
import { keywordSvgDataUri } from "@/lib/svg"

interface PageProps {
  params: { slug: string }
}

export const dynamicParams = false

export function generateStaticParams() {
  return getAllLocationSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const location = getLocationBySlug(params.slug)
  if (!location) return {}
  const keyphrase = `3D printen in ${location.city}`
  const description = `${keyphrase} door X3DPrints. Snel en precies 3D printen voor prototypes en kleine series in ${location.city}.`
  const url = `https://www.x3dprints.be/${location.slug}`
  return {
    title: `${keyphrase} | X3DPrints`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: keyphrase,
      description,
      url,
      images: [{ url: "/images/og-home.jpg", width: 1200, height: 630 }],
      locale: "nl_BE",
      siteName: "X3DPrints",
    },
    twitter: { card: "summary_large_image" },
  }
}

export default async function Page({ params }: PageProps) {
  const location = getLocationBySlug(params.slug)
  if (!location) notFound()

  const keyphrase = `3D printen in ${location.city}`
  const svgSrc = keywordSvgDataUri(keyphrase)

  let contentHtml = ""
  try {
    const file = await readFile(
      join(process.cwd(), "content", "locations", `${location.slug}.md`),
      "utf8",
    )
    contentHtml = (await remark().use(html).process(file)).toString()
  } catch {
    notFound()
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: keyphrase,
    areaServed: location.city,
    provider: { "@type": "Organization", name: "X3DPrints" },
    url: `https://www.x3dprints.be/${location.slug}`,
  }

  return (
    <main className="px-6 pb-20 pt-14 sm:px-8 lg:px-12">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {keyphrase}
      </h1>
      <div
        className="mt-4 max-w-prose text-slate-600"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
      <Image
        src={svgSrc}
        alt={keyphrase}
        width={1200}
        height={630}
        className="mt-6 h-auto w-full max-w-2xl"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  )
}
