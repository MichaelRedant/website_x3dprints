import MachineReadableResourcesPage, { buildMachineReadableMetadata } from "@/components/MachineReadableResourcesPage"

export const metadata = buildMachineReadableMetadata("en")

export default function MachineReadableResourcesPageEn() {
  return <MachineReadableResourcesPage locale="en" />
}
