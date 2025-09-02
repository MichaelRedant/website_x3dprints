export type Location = {
  slug: string;
  city: string;
  relatedPhrases: string[];
};

export const locations: Location[] = [
  {
    slug: "3d-printen-in-aalst",
    city: "Aalst",
    relatedPhrases: [
      "3D print service Aalst",
      "rapid prototyping Aalst",
      "3D printing bedrijf Aalst",
    ],
  },
];

export function getLocationBySlug(slug: string): Location | undefined {
  return locations.find((loc) => loc.slug === slug);
}

export function getAllLocationSlugs(): string[] {
  return locations.map((loc) => loc.slug);
}
