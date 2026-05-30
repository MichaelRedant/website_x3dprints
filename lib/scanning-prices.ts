export type ScanPrice = {
  key: string
  labelNl: string
  labelEn: string
  descriptionNl: string
  descriptionEn: string
  price: number
}

export const SCAN_PRICES: ScanPrice[] = [
  {
    key: "small-object",
    labelNl: "3D scan klein object",
    labelEn: "3D scan small object",
    descriptionNl: "Kleine objecten, clips, onderdelen of decorstukken met eenvoudige vorm.",
    descriptionEn: "Small objects, clips, parts or decor pieces with a simple shape.",
    price: 45,
  },
  {
    key: "medium-object",
    labelNl: "3D scan medium object",
    labelEn: "3D scan medium object",
    descriptionNl: "Middelgrote objecten met meer oppervlak, detail of scanposities.",
    descriptionEn: "Medium objects with more surface, detail or scan positions.",
    price: 75,
  },
  {
    key: "large-object",
    labelNl: "3D scan groot object",
    labelEn: "3D scan large object",
    descriptionNl: "Grotere objecten die meer setup, scanpasses en cleanup vragen.",
    descriptionEn: "Larger objects that require more setup, scan passes and cleanup.",
    price: 125,
  },
  {
    key: "technical-object",
    labelNl: "3D scan technisch object",
    labelEn: "3D scan technical object",
    descriptionNl: "Technische stukken waarbij passing, referentievlakken of reverse engineering belangrijk zijn.",
    descriptionEn: "Technical parts where fit, reference faces or reverse engineering matter.",
    price: 95,
  },
  {
    key: "event-scan",
    labelNl: "3D scannen op beurs of event",
    labelEn: "3D scanning at fair or event",
    descriptionNl: "Mobiele scansessie voor activaties, demo's of meerdere korte scans op locatie.",
    descriptionEn: "Mobile scanning session for activations, demos or multiple short scans on location.",
    price: 225,
  },
  {
    key: "person-bust",
    labelNl: "3D scan buste persoon",
    labelEn: "3D scan person bust",
    descriptionNl: "Persoonsscan voor buste, miniatuur of figuur met basis cleanup.",
    descriptionEn: "Person scan for bust, miniature or figure with basic cleanup.",
    price: 95,
  },
  {
    key: "full-body",
    labelNl: "3D scan full body",
    labelEn: "3D scan full body",
    descriptionNl: "Volledige persoonsscan voor figuur, eventtoepassing of digitaal bestand.",
    descriptionEn: "Full person scan for figure, event use or digital file.",
    price: 250,
  },
]

export function formatScanPrice(price: number) {
  return `EUR ${price.toFixed(2)}`
}
