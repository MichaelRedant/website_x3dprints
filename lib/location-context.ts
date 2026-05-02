import { getLocationBySlug } from "@/lib/locations"

export type LocalReferenceCard = {
  title: {
    nl: string
    en: string
  }
  description: {
    nl: string
    en: string
  }
}

type LocationCluster = {
  municipalitySlug: string
  districtSlugs: string[]
}

type LocationContextEntry = {
  references?: LocalReferenceCard[]
}

const LOCATION_CLUSTERS: LocationCluster[] = [
  {
    municipalitySlug: "3d-printen-in-herzele",
    districtSlugs: [
      "3d-printen-in-borsbeke",
      "3d-printen-in-hillegem",
      "3d-printen-in-ressegem",
      "3d-printen-in-sint-antelinks",
      "3d-printen-in-sint-lievens-esse",
      "3d-printen-in-steenhuize-wijnhuize",
      "3d-printen-in-woubrechtegem",
    ],
  },
] as const

const LOCATION_CONTEXT: Record<string, LocationContextEntry> = {
  "3d-printen-in-herzele": {
    references: [
      {
        title: {
          nl: "Burcht van Herzele",
          en: "Herzele Castle Ruins",
        },
        description: {
          nl: "De Burcht van Herzele is een herkenbaar lokaal referentiepunt. Voor projecten uit Herzele helpt zo'n plaatsgebonden context om maquettes, displays of visuele prototypes concreet te bespreken.",
          en: "The Herzele castle ruins are a clear local landmark. For projects in Herzele, that kind of place-based reference helps when discussing models, displays or visual prototypes.",
        },
      },
      {
        title: {
          nl: "Werkgroep Ondernemend Herzele",
          en: "Ondernemend Herzele business network",
        },
        description: {
          nl: "Herzele draait op een sterke lokale ondernemerscontext. Dat sluit goed aan bij snelle prototypes, vervangonderdelen en kleinschalig maatwerk voor zelfstandigen en KMO's in de gemeente.",
          en: "Herzele has a strong local business context. That fits fast prototypes, replacement parts and small-scale custom work for independents and SMEs in the municipality.",
        },
      },
    ],
  },
}

export function getLocationCluster(slug: string) {
  return LOCATION_CLUSTERS.find(
    (cluster) => cluster.municipalitySlug === slug || cluster.districtSlugs.includes(slug),
  ) ?? null
}

export function getLocationContext(slug: string) {
  const cluster = getLocationCluster(slug)
  const isMunicipalityPage = cluster?.municipalitySlug === slug
  const municipalityLocation =
    cluster && !isMunicipalityPage ? getLocationBySlug(cluster.municipalitySlug) : null

  const districtLocations =
    cluster?.districtSlugs
      .map((districtSlug) => getLocationBySlug(districtSlug))
      .filter((value): value is NonNullable<typeof value> => Boolean(value)) ?? []

  const siblingLocations =
    cluster && !isMunicipalityPage
      ? districtLocations.filter((location) => location.slug !== slug)
      : []

  const references = LOCATION_CONTEXT[slug]?.references ?? []

  return {
    cluster,
    isMunicipalityPage: Boolean(isMunicipalityPage),
    municipalityLocation,
    districtLocations,
    siblingLocations,
    references,
  }
}
