import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Over X3DPrints | 3D Printstudio in Herzele",
  description:
    "Maak kennis met X3DPrints, de 3D-printstudio uit Herzele voor prototypes en kleine series in PLA, PETG of TPU. Persoonlijk advies en snelle levering.",
};

export default function Page() {
  return (
    <section className="container mx-auto max-w-3xl py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Over X3DPrints</h1>
      <p className="mt-4 text-muted-foreground">
        X3DPrints is een lokale 3D-printstudio in Herzele. Als onderdeel van Xinudesign maken we 3D-printen
        betaalbaar en toegankelijk. We werken met professionele Bambu Lab FDM-printers en bieden een ruime
        keuze aan materialen zoals PLA, PETG en flexibel TPU.
      </p>
      <h2 className="mt-8 text-xl font-semibold tracking-tight">Waarom kiezen voor ons?</h2>
      <ul className="mt-4 list-disc pl-6 text-muted-foreground">
        <li>Snelle feedback op je STL of STEP-bestanden</li>
        <li>Consistente kwaliteit dankzij gekalibreerde Bambu Lab-printers</li>
        <li>Nabewerking en montage op aanvraag</li>
        <li>Persoonlijk materiaal- en ontwerpadvies</li>
      </ul>
      <p className="mt-6 text-muted-foreground">
        Van een enkel prototype tot een kleine serie: we denken mee vanaf ontwerp tot afgewerkt onderdeel en
        leveren snel in heel België.
      </p>
    </section>
  );
}
