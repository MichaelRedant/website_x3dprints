import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import ReadMoreLinks from "@/components/ReadMoreLinks"
import ShopProductGrid from "@/components/ShopProductGrid"
import type { ShopProduct } from "@/content/shop-products"
import { SITE, buildBreadcrumbSchema, buildFaqPageSchema, buildItemListSchema } from "@/lib/seo"
import { getShopProducts } from "@/lib/shop-data"

export const metadata: Metadata = {
  title: "3D print shop with practical products | X3DPrints",
  description:
    "Browse practical 3D print products, accessories, organizers, outdoor parts, and leftover stock at X3DPrints. Check availability and request your shop quote.",
  alternates: {
    canonical: `${SITE.url}/en/shop/`,
    languages: {
      "en-BE": `${SITE.url}/en/shop/`,
      "nl-BE": `${SITE.url}/shop/`,
      "x-default": `${SITE.url}/shop/`,
    },
  },
  openGraph: {
    title: "3D print shop with practical products",
    description: "Practical 3D print products, accessories, organizers, outdoor parts, and leftover stock with clear availability and quote follow-up.",
    url: `${SITE.url}/en/shop/`,
    images: [{ url: "/images/og-shop-en.svg", width: 1200, height: 630 }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D print shop with practical products | X3DPrints",
    description: "Practical 3D print products, outdoor parts, and accessories with clear availability through X3DPrints.",
    images: ["/images/og-shop-en.svg"],
  },
}

const HIGHLIGHTS = [
  {
    title: "Current availability",
    description: "You immediately see which 3D print products are available and which requests we can follow up quickly.",
  },
  {
    title: "Practical shop products",
    description: "The shop grows with accessories, organizers, outdoor parts, leftover stock, and functional products that fit X3DPrints naturally.",
  },
  {
    title: "Quote-first by default",
    description: "For limited stock, shipping, or pickup, we start with a quote request so quantity and delivery can be confirmed first.",
  },
]

type ShopStep = { title: string; description: string; href?: string; label?: string }
type ShopResource = { title: string; description: string; href: string; label: string }
type ShopOverviewRow = {
  item: string
  useCase: string
  availability: string
  fulfilment: string
}
type ShopFaqItem = { q: string; a: string }

const MODEL_RESOURCES: ShopResource[] = [
  {
    title: "Find my 3D model",
    description:
      "Do you not have a file or model yet? Use our guide to find a suitable design you can then have printed.",
    href: "/en/3d-modellen-vinden",
    label: "Find a model to get printed",
  },
  {
    title: "Custom 3D modeling",
    description:
      "Does the part or idea not exist yet? We can create a custom model based on sketches, photos, or your practical brief.",
    href: "/en/3d-modelleren",
    label: "Request a custom model",
  },
]

const ORDER_STEPS: ShopStep[] = [
  {
    title: "Choose your product",
    description: "Open the product page, review the details, and share the quantity or question you have.",
  },
  {
    title: "Send your shop quote request",
    description: "From the product page or contact page, send a request with any extra questions about shipping or pickup.",
  },
  {
    title: "Receive confirmation",
    description: "You get a reply with availability, price confirmation, shipping or pickup details, and the next practical step.",
  },
]

const SHOP_USE_CASES: Record<string, string> = {
  "bambu-reusable-spool": "Extra spool for Bambu refills, spare stock, or reuse in an existing filament workflow",
  "selectieve-hoornaarval-deksel":
    "3D printed lid for a selective hornet trap aimed at the Asian hornet, suitable for glass jars, monitoring, and local initiatives",
}

const SHOP_FAQ: ShopFaqItem[] = [
  {
    q: "What can I find in the X3DPrints 3D print shop?",
    a: "The shop contains selected 3D print products we can actually follow up properly: accessories, organizers, leftover stock, replacement parts, and other practical items that fit our print service.",
  },
  {
    q: "Can I request niche or seasonal products through this shop as well?",
    a: "Yes. In addition to general accessories and organizers, we also publish niche products that fit X3DPrints well, such as outdoor parts, monitoring items, or small runs for specific use cases.",
  },
  {
    q: "Why do many shop orders start with a quote request?",
    a: "For limited stock, pickup, shipping, or small variations, we deliberately use a quote-first flow. That lets us confirm quantity, delivery method, and practical details before scheduling the order.",
  },
  {
    q: "Can I still order something if I do not have my own 3D model?",
    a: "Yes. Use the 'Find my 3D model' page if you want to source an existing design, or go to 'Custom 3D modeling' if you need a part or idea designed from scratch.",
  },
  {
    q: "How do I know whether a product is in stock?",
    a: "Each product shows its current status, such as in stock, limited availability, or made to order. When you send a request, we also confirm quantity, shipping, and any pickup options.",
  },
]

function getAvailabilityLabel(product: ShopProduct) {
  if (product.availability === "OutOfStock") return "Currently unavailable"
  if (product.availability === "PreOrder") return "Made to order"
  if (product.availability === "LimitedAvailability") return "Limited availability"
  if (product.availability === "InStock") return "In stock"
  return "Availability on request"
}

function getFulfilmentLabel(product: ShopProduct) {
  if (product.purchaseMode === "inquiry") {
    return "Through the quote form, with quantity, shipping, or pickup confirmed first"
  }
  return "Direct ordering"
}

export default async function ShopPageEn() {
  const liveProducts = (await getShopProducts("en")).filter((product) => product.isLive)
  const shopOverview: ShopOverviewRow[] = liveProducts.map((product) => ({
    item: product.name.en,
    useCase: SHOP_USE_CASES[product.slug] ?? product.summary.en,
    availability: getAvailabilityLabel(product),
    fulfilment: getFulfilmentLabel(product),
  }))

  const itemListJsonLd =
    liveProducts.length > 0
      ? buildItemListSchema({
          name: "3D print shop products",
          inLanguage: "en-BE",
          items: liveProducts.map((product) => ({
            name: product.name.en,
            url: `${SITE.url}/en/shop/${product.slug}/`,
          })),
        })
      : null

  const faqJsonLd = buildFaqPageSchema({
    items: SHOP_FAQ,
    inLanguage: "en-BE",
    mainEntityOfPage: `${SITE.url}/en/shop/`,
  })

  const breadcrumbJsonLd = buildBreadcrumbSchema({
    id: `${SITE.url}/en/shop/#breadcrumb`,
    inLanguage: "en-BE",
    items: [
      { name: "Home", url: `${SITE.url}/en/` },
      { name: "Shop", url: `${SITE.url}/en/shop/` },
    ],
  })

  return (
    <main className="flex-1">
      <section className="px-6 pb-14 pt-20 sm:px-8 lg:px-12 xl:pb-16">
        <div className="mx-auto max-w-[96rem] 2xl:max-w-[108rem]">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 p-6 sm:p-8 xl:p-10">
              <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-indigo-200/45 blur-3xl" />
              <div aria-hidden className="pointer-events-none absolute -bottom-24 left-10 h-56 w-56 rounded-full bg-cyan-200/40 blur-3xl" />
              <div className="relative min-w-0 md:text-center lg:text-left">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Shop</p>
                <h1 className="mt-4 break-words text-balance text-4xl font-extrabold text-slate-900 sm:text-5xl">
                  3D print shop with practical products, accessories, and stocked items
                </h1>
                <p className="mt-4 max-w-3xl break-words text-lg text-slate-600 md:mx-auto lg:mx-0">
                  In this 3D print shop, we bundle practical 3D print products: from accessories and leftover stock
                  to organizers, outdoor parts, replacement parts, and other functional items you can request from X3DPrints.
                </p>
                <p className="mt-3 max-w-3xl break-words text-sm text-slate-600 md:mx-auto lg:mx-0">
                  The standard flow still starts with a quote request. That lets us confirm quantity, price, shipping,
                  or pickup first, especially for limited stock or practical delivery arrangements.
                </p>
                <p className="mt-3 max-w-3xl break-words text-sm text-slate-600 md:mx-auto lg:mx-0">
                  For standard consumer-facing shop products, we generally start from the ordinary withdrawal framework
                  for online sales. Read the full{" "}
                  <Link href="/en/retour-herroepingsrecht" className="font-semibold text-indigo-600 underline-offset-2 hover:underline">
                    returns &amp; withdrawal policy
                  </Link>
                  .
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:justify-center lg:justify-start">
                  <ShimmerButton
                    href="#shop-collection"
                    wrapperClassName="w-full sm:w-auto"
                    className="w-full justify-center sm:w-auto"
                  >
                    Browse shop collection
                  </ShimmerButton>
                  <Link
                    href="/en/contact?quote=Shop%20quote%20request"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 sm:w-auto"
                  >
                    Request a shop quote
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-16 sm:px-8 lg:px-12 xl:pb-20">
        <div className="mx-auto max-w-[96rem] 2xl:max-w-[108rem]">
          <Reveal>
            <GlassCard className="min-w-0 md:text-center lg:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                No 3D model yet?
              </p>
              <h2 className="mt-3 break-words text-balance text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Find an existing model or let us model it for you
              </h2>
              <p className="mt-4 max-w-3xl break-words text-sm text-slate-600 md:mx-auto lg:mx-0">
                Do you not have a model or file yet? No problem. You can search for an existing design yourself or
                ask us to create a custom one so you move from idea to print faster.
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {MODEL_RESOURCES.map((item) => (
                  <div
                    key={item.title}
                    className="min-w-0 rounded-2xl border border-slate-100 bg-white/70 p-5 md:text-center lg:text-left"
                  >
                    <h3 className="break-words text-lg font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-2 break-words text-sm text-slate-600">{item.description}</p>
                    <Link
                      href={item.href}
                      className="mt-4 inline-flex items-center gap-2 break-words text-sm font-semibold text-indigo-600 transition hover:text-indigo-500 md:justify-center lg:justify-start"
                    >
                      {item.label}
                      <span className="i-lucide-arrow-right" aria-hidden />
                    </Link>
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <ShopProductGrid products={liveProducts} locale="en" />

      <section className="px-6 pb-16 sm:px-8 lg:px-12 xl:pb-20">
        <div className="mx-auto max-w-[96rem] 2xl:max-w-[108rem]">
          <Reveal>
            <GlassCard className="min-w-0 md:text-center lg:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                Shop overview
              </p>
              <h2 className="mt-3 break-words text-balance text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Available products, use cases, and order method
              </h2>
              <p className="mt-4 max-w-3xl break-words text-sm text-slate-600 md:mx-auto lg:mx-0">
                We only put products online that we can actually follow up properly. That way you quickly see what is
                available and how each product is best requested or ordered.
              </p>
              <div className="mt-6 space-y-3 md:hidden">
                {shopOverview.map((row) => (
                  <div key={row.item} className="min-w-0 rounded-2xl border border-slate-100 bg-white/70 p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Product</p>
                    <p className="mt-1 break-words text-base font-semibold text-slate-900">{row.item}</p>
                    <div className="mt-4 grid gap-3">
                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Use case</p>
                        <p className="mt-1 break-words text-sm text-slate-700">{row.useCase}</p>
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Availability</p>
                        <p className="mt-1 break-words text-sm text-slate-700">{row.availability}</p>
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Order method</p>
                        <p className="mt-1 break-words text-sm text-slate-700">{row.fulfilment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 hidden overflow-x-auto rounded-2xl border border-slate-100 bg-white/70 md:block">
                <table className="min-w-[720px] w-full text-left text-sm text-slate-700">
                  <thead className="border-b border-slate-200 bg-slate-50/80">
                    <tr>
                      <th className="px-4 py-3 font-semibold text-slate-900">Product</th>
                      <th className="px-4 py-3 font-semibold text-slate-900">Use case</th>
                      <th className="px-4 py-3 font-semibold text-slate-900">Availability</th>
                      <th className="px-4 py-3 font-semibold text-slate-900">Order method</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shopOverview.map((row) => (
                      <tr key={row.item} className="border-b border-slate-100 last:border-b-0">
                        <td className="px-4 py-3 font-semibold text-slate-900 break-words">{row.item}</td>
                        <td className="px-4 py-3 break-words">{row.useCase}</td>
                        <td className="px-4 py-3 break-words">{row.availability}</td>
                        <td className="px-4 py-3 break-words">{row.fulfilment}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-16 sm:px-8 lg:px-12 xl:pb-20">
        <div className="mx-auto grid max-w-[96rem] gap-4 md:grid-cols-3 xl:gap-5 2xl:max-w-[108rem]">
          {HIGHLIGHTS.map((item) => (
            <Reveal key={item.title} delay={0.05}>
              <GlassCard className="min-w-0 h-full md:text-center lg:text-left">
                <h2 className="break-words text-lg font-semibold text-slate-900">{item.title}</h2>
                <p className="mt-2 break-words text-sm text-slate-600">{item.description}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 pb-20 sm:px-8 lg:px-12 xl:pb-24">
        <div className="mx-auto max-w-[96rem] 2xl:max-w-[108rem]">
          <GlassCard className="min-w-0 md:text-center lg:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              Standard flow
            </p>
            <p className="mt-3 max-w-3xl break-words text-sm text-slate-600 md:mx-auto lg:mx-0">
              For most shop products, we first confirm quantity, delivery, and any special details through a short quote flow.
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {ORDER_STEPS.map((item) => (
                <div key={item.title} className="min-w-0 rounded-2xl border border-slate-100 bg-white/70 p-4 md:text-center lg:text-left">
                  <h3 className="break-words text-base font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 break-words text-sm text-slate-600">{item.description}</p>
                  {item.href && item.label ? (
                    <Link
                      href={item.href}
                      className="mt-3 inline-flex items-center gap-2 break-words text-sm font-semibold text-indigo-600 transition hover:text-indigo-500 md:justify-center lg:justify-start"
                    >
                      {item.label}
                      <span className="i-lucide-arrow-right" aria-hidden />
                    </Link>
                  ) : null}
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      <section className="px-6 pb-20 sm:px-8 lg:px-12 xl:pb-24">
        <div className="mx-auto max-w-[96rem] 2xl:max-w-[108rem]">
          <GlassCard className="min-w-0 md:text-center lg:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              Shop FAQ
            </p>
            <h2 className="mt-3 break-words text-balance text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Frequently asked questions about the 3D print shop
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {SHOP_FAQ.map((item) => (
                <div key={item.q} className="min-w-0 rounded-2xl border border-slate-100 bg-white/70 p-5 md:text-center lg:text-left">
                  <h3 className="break-words text-base font-semibold text-slate-900">{item.q}</h3>
                  <p className="mt-2 break-words text-sm text-slate-600">{item.a}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      <ReadMoreLinks pageType="shop" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {itemListJsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      ) : null}
    </main>
  )
}
