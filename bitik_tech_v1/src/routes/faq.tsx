import { createFileRoute } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PublicLayout } from "@/components/bitik/public-layout";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Questions fréquentes — Bitik Tech" },
      { name: "description", content: "Retrouvez les réponses aux questions fréquentes sur Bitik Tech, la gestion des boutiques, des stocks, des ventes et des crédits." },
      { property: "og:title", content: "Questions fréquentes — Bitik Tech" },
      { property: "og:description", content: "Tout ce qu’il faut savoir avant de commencer avec Bitik Tech." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FaqPage,
});

const questions = [
  ["Qu’est-ce que Bitik Tech ?", "Une plateforme de gestion tout-en-un pour les boutiques et entreprises de téléphonie, électronique et informatique."],
  ["Puis-je gérer plusieurs boutiques ?", "Oui. L’interface est conçue pour donner une vue par boutique et une vision consolidée de l’entreprise."],
  ["Puis-je gérer les crédits clients ?", "Oui. Vous suivez le total, les paiements, le restant, les échéances et les remboursements."],
  ["Puis-je gérer les IMEI et numéros de série ?", "Oui. Chaque produit électronique peut conserver ses références spécifiques, sa garantie et son historique."],
  ["Quels moyens de paiement sont disponibles ?", "Vous pouvez suivre les règlements en espèces, par Wave, Orange Money et par carte."],
  ["Mes données sont-elles séparées de celles des autres entreprises ?", "Oui. Chaque entreprise dispose de son propre espace, avec des rôles, des permissions et un historique des opérations."],
];

function FaqPage() {
  return <PublicLayout>
    <section className="section-space bg-app">
      <div className="container-shell grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <p className="eyebrow">Questions fréquentes</p>
          <h1 className="section-title mt-4">Tout ce qu’il faut savoir avant de commencer.</h1>
          <p className="mt-5 max-w-lg leading-7 text-muted-foreground">Des réponses claires sur la gestion de votre boutique avec Bitik Tech.</p>
        </div>
        <div className="panel bg-card px-5 sm:px-7">
          <Accordion type="single" collapsible>
            {questions.map(([question, answer], index) => <AccordionItem key={question} value={`question-${index}`}>
              <AccordionTrigger className="text-left text-base">{question}</AccordionTrigger>
              <AccordionContent className="leading-7 text-muted-foreground">{answer}</AccordionContent>
            </AccordionItem>)}
          </Accordion>
        </div>
      </div>
    </section>
  </PublicLayout>;
}