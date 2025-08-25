import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prijzen",
  description: "Transparante prijsopbouw voor 3D-printen en nabewerking.",
};

export default function Page() {
  return (
    <section className="container mx-auto max-w-3xl py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Prijzen</h1>
      <p className="mt-4 text-muted-foreground">
        Placeholder. Hier komt later jouw calculator / prijsblokken / veelgestelde vragen.
      </p>
    </section>
  );
}
