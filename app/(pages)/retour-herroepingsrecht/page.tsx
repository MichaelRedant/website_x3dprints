import ReturnPolicyPage, { getReturnPolicyMetadata } from "@/components/ReturnPolicyPage"

export const metadata = getReturnPolicyMetadata("nl")

export default function ReturnPolicyPageNl() {
  return <ReturnPolicyPage locale="nl" />
}
