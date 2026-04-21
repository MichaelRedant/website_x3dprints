import {
  buildMachineReadableBusiness,
  buildMachineReadableCases,
  buildMachineReadableContentMap,
  buildMachineReadableManifest,
  buildMachineReadableMaterials,
  buildMachineReadableServices,
  buildMachineReadableShop,
} from "@/lib/machine-readable"

export const dynamic = "force-static"

const FEEDS = {
  "business.json": () => buildMachineReadableBusiness("nl"),
  "cases.json": () => buildMachineReadableCases("nl"),
  "content-map.json": () => buildMachineReadableContentMap("nl"),
  "manifest.json": () => buildMachineReadableManifest("nl"),
  "materials.json": () => buildMachineReadableMaterials("nl"),
  "services.json": () => buildMachineReadableServices("nl"),
  "shop.json": () => buildMachineReadableShop("nl"),
} as const satisfies Record<string, () => unknown | Promise<unknown>>

export function generateStaticParams() {
  return Object.keys(FEEDS).map((feed) => ({ feed }))
}

export async function GET(_: Request, { params }: { params: Promise<{ feed: string }> }) {
  const { feed } = await params
  const builder = FEEDS[feed as keyof typeof FEEDS]

  if (!builder) {
    return new Response(JSON.stringify({ error: "Not found" }, null, 2), {
      status: 404,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    })
  }

  const payload = await builder()

  return new Response(JSON.stringify(payload, null, 2), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  })
}
