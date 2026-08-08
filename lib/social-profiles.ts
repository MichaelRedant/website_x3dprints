export const SOCIAL_PROFILES = [
  { href: "https://www.pinterest.com/X3DPrints/", label: "Pinterest", icon: "pinterest", organization: true },
  { href: "https://www.youtube.com/@MichaelRedant", label: "YouTube", icon: "youtube", organization: false },
  { href: "https://www.facebook.com/X3DPrints", label: "Facebook", icon: "facebook", organization: true },
  { href: "https://www.instagram.com/x3d_prints/", label: "Instagram", icon: "instagram", organization: true },
  { href: "https://www.linkedin.com/in/michael-redant/", label: "LinkedIn", icon: "linkedin", organization: false },
] as const

export const ORGANIZATION_SOCIAL_URLS = SOCIAL_PROFILES.filter((profile) => profile.organization).map(
  (profile) => profile.href,
)
