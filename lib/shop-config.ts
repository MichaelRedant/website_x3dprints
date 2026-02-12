const rawBffFlag = (process.env.NEXT_PUBLIC_SHOP_BFF_ENABLED ?? "").trim().toLowerCase()
const rawBffUrl = (process.env.NEXT_PUBLIC_SHOP_BFF_URL ?? "").trim()

export const SHOP_BFF_URL = rawBffUrl
export const SHOP_BFF_ENABLED = rawBffFlag === "false" ? false : rawBffUrl !== ""
