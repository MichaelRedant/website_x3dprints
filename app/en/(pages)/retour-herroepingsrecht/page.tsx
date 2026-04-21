import ReturnPolicyPage, { getReturnPolicyMetadata } from "@/components/ReturnPolicyPage"

export const metadata = getReturnPolicyMetadata("en")

export default function ReturnPolicyPageEn() {
  return <ReturnPolicyPage locale="en" />
}
