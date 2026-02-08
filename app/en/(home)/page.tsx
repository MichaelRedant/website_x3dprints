import type { Metadata } from "next"
import HomePage from "@/app/(home)/page"
import { EN_METADATA } from "@/app/(home)/metadata.en"

export const metadata: Metadata = EN_METADATA

type PageProps = { searchParams?: Promise<{ lang?: string } | undefined> }

export default async function HomePageEn({ searchParams }: PageProps) {
  const params = (await searchParams) ?? {}
  return <HomePage searchParams={Promise.resolve({ ...params, lang: "en" })} />
}
