import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Materialen",
  description: "Overzicht van beschikbare 3D-print materialen en richtlijnen.",
};

export default function Page() {
  return (
    <section className="container mx-auto max-w-3xl py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Materialen</h1>
      <p className="mt-4 text-muted-foreground">
        Placeholder. Hier komt later jouw materiaaloverzicht met eigenschappen en toepassingen.
      </p>
    </section>
  );
}
