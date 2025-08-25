import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description: "FDM-printen, materiaaladvies, nabewerking en montage.",
};

export default function Page() {
  return (
    <section className="container mx-auto max-w-3xl py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Services</h1>
      <p className="mt-4 text-muted-foreground">
        Placeholder. Overzicht van diensten en workflow komt hier.
      </p>
    </section>
  );
}
