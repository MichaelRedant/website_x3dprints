import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Selectie van 3D-printprojecten en cases.",
};

export default function Page() {
  return (
    <section className="container mx-auto max-w-3xl py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Portfolio</h1>
      <p className="mt-4 text-muted-foreground">
        Placeholder. Cases, foto’s en korte toelichtingen komen hier.
      </p>
    </section>
  );
}
