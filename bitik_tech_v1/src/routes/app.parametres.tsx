import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/bitik/app-shell";
export const Route = createFileRoute("/app/parametres")({
  head: () => ({ meta: [
    { title: "Paramètres — Bitik Tech" },
    { name: "description", content: "Paramètres sur Bitik Tech, la plateforme de gestion pour boutiques de téléphonie et d'électronique." },
    { property: "og:title", content: "Paramètres — Bitik Tech" },
    { property: "og:description", content: "Paramètres sur Bitik Tech." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Page,
});
function Page() {
  return (
    <AppShell>
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="text-3xl font-semibold tracking-tight">Paramètres</h1>
        <p className="mt-3 text-muted-foreground">Cette section arrive très bientôt.</p>
      </section>
    </AppShell>
  );
}
