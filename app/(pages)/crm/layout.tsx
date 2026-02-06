import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "CRM | X3DPrints",
  description: "Afgeschermde CRM omgeving voor intern gebruik.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function CrmLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
