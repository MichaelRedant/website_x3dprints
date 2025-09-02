// lib/locations.ts
export type Location = {
  slug: string;
  city: string;
  relatedPhrases?: string[];
};

export const locations: Location[] = [
  {
    slug: "3d-printen-in-aalst",
    city: "Aalst",
    relatedPhrases: [
      "3D print service Aalst",
      "rapid prototyping Aalst",
      "3D printing bedrijf Aalst",
      "3D printen nabij Aalst",
      "3D model laten printen Aalst",
    ],
  },
  {
    slug: "3d-printen-in-herzele",
    city: "Herzele",
    relatedPhrases: [
      "3D print service Herzele",
      "rapid prototyping Herzele",
      "3D printing bedrijf Herzele",
      "3D printen nabij Herzele",
      "3D model laten printen Herzele",
    ],
  },
  {
  slug: "3d-printen-in-ninove",
  city: "Ninove",
  relatedPhrases: [
    "3D print service Ninove",
    "rapid prototyping Ninove",
    "3D printing bedrijf Ninove",
    "3D printen nabij Ninove",
    "3D model laten printen Ninove",
  ],
},
{
  slug: "3d-printen-in-geraardsbergen",
  city: "Geraardsbergen",
  relatedPhrases: [
    "3D print service Geraardsbergen",
    "rapid prototyping Geraardsbergen",
    "3D printing bedrijf Geraardsbergen",
    "3D printen nabij Geraardsbergen",
    "3D model laten printen Geraardsbergen",
  ],
},
{
  slug: "3d-printen-in-zottegem",
  city: "Zottegem",
  relatedPhrases: [
    "3D print service Zottegem",
    "rapid prototyping Zottegem",
    "3D printing bedrijf Zottegem",
    "3D printen nabij Zottegem",
    "3D model laten printen Zottegem",
  ],
},
{
  slug: "3d-printen-in-oudenaarde",
  city: "Oudenaarde",
  relatedPhrases: [
    "3D print service Oudenaarde",
    "rapid prototyping Oudenaarde",
    "3D printing bedrijf Oudenaarde",
    "3D printen nabij Oudenaarde",
    "3D model laten printen Oudenaarde",
  ],
},
];

export function getLocationBySlug(slug: string): Location | undefined {
  return locations.find((loc) => loc.slug === slug);
}

export function getAllLocationSlugs(): string[] {
  return locations.map((loc) => loc.slug);
}

// fallback generator als je relatedPhrases niet invult
export function buildDefaultRelatedPhrases(city: string): string[] {
  return [
    `3D print service ${city}`,
    `3D printing ${city}`,
    `rapid prototyping ${city}`,
    `3D printing bedrijf ${city}`,
    `3D printen nabij ${city}`,
    `3D model laten printen ${city}`,
  ];
}
