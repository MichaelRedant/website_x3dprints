import MachineReadableResourcesPage, { buildMachineReadableMetadata } from "@/components/MachineReadableResourcesPage"

export const metadata = buildMachineReadableMetadata("nl")

export default function MachineReadableResourcesPageNl() {
  return <MachineReadableResourcesPage locale="nl" />
}
