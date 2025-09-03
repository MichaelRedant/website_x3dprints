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
{
  slug: "3d-printen-in-gentbrugge",
  city: "Gentbrugge",
  relatedPhrases: [
    "3D print service gentbrugge",
    "rapid prototyping gentbrugge",
    "3D printing bedrijf gentbrugge",
    "3D printen nabij gentbrugge",
    "3D model laten printen gentbrugge",
  ],
},
{
  slug: "3d-printen-in-erpe-mere",
  city: "Erpe-mere",
  relatedPhrases: [
    "3D print service erpe-mere",
    "rapid prototyping erpe-mere",
    "3D printing bedrijf erpe-mere",
    "3D printen nabij erpe-mere",
    "3D model laten printen erpe-mere",
  ],
},
{
  slug: "3d-printen-in-affligem",
  city: "Affligem",
  relatedPhrases: [
    "3D print service affligem",
    "rapid prototyping affligem",
    "3D printing bedrijf affligem",
    "3D printen nabij affligem",
    "3D model laten printen affligem",
  ],
},
{
  slug: "3d-printen-in-dendermonde",
  city: "Dendermonde",
  relatedPhrases: [
    "3D print service dendermonde",
    "rapid prototyping dendermonde",
    "3D printing bedrijf dendermonde",
    "3D printen nabij dendermonde",
    "3D model laten printen dendermonde",
  ],
},
{
  slug: "3d-printen-in-haaltert",
  city: "Haaltert",
  relatedPhrases: [
    "3D print service haaltert",
    "rapid prototyping haaltert",
    "3D printing bedrijf haaltert",
    "3D printen nabij haaltert",
    "3D model laten printen haaltert",
  ],
},
{
  slug: "3d-printen-in-lede",
  city: "Lede",
  relatedPhrases: [
    "3D print service lede",
    "rapid prototyping lede",
    "3D printing bedrijf lede",
    "3D printen nabij lede",
    "3D model laten printen lede",
  ],
},
{
  slug: "3d-printen-in-lierde",
  city: "Lierde",
  relatedPhrases: [
    "3D print service lierde",
    "rapid prototyping lierde",
    "3D printing bedrijf lierde",
    "3D printen nabij lierde",
    "3D model laten printen lierde",
  ],
},
{
  slug: "3d-printen-in-merelbeke",
  city: "Merelbeke",
  relatedPhrases: [
    "3D print service merelbeke",
    "rapid prototyping merelbeke",
    "3D printing bedrijf merelbeke",
    "3D printen nabij merelbeke",
    "3D model laten printen merelbeke",
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
