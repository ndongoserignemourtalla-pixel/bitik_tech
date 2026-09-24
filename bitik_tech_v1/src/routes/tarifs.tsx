import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/bitik/public-layout";
export const Route = createFileRoute("/tarifs")({
  head: () => ({ meta: [
    { title: "Tarifs — Bitik Tech" },
    { name: "description", content: "Tarifs sur Bitik Tech, la plateforme de gestion pour boutiques de téléphonie et d'électronique." },
    { property: "og:title", content: "Tarifs — Bitik Tech" },
    { property: "og:description", content: "Tarifs sur Bitik Tech." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Page,
});
function Page() {
  return (
    <PublicLayout>
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="text-3xl font-semibold tracking-tight">Tarifs</h1>
        <p className="mt-3 text-muted-foreground">Cette section arrive très bientôt.</p>
      </section>
    </PublicLayout>
  );
}
