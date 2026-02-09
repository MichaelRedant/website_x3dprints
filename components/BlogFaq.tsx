import Faq from "@/components/Faq"
import { buildFaqPageSchema } from "@/lib/seo"

type BlogFaqProps = {
  title: string
  items: { q: string; a: string }[]
  inLanguage?: string
  sectionId?: string
}

export default function BlogFaq({ title, items, inLanguage = "nl-BE", sectionId = "faq" }: BlogFaqProps) {
  if (!items || items.length === 0) return null

  const faqJsonLd = buildFaqPageSchema({
    inLanguage,
    items,
  })

  return (
    <>
      <section id={sectionId} className="scroll-mt-28">
        <Faq title={title} items={items} />
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  )
}
