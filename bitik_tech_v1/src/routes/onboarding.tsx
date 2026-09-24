import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Check, ImageUp, Store } from "lucide-react";
import { useState, type ChangeEvent } from "react";
import { toast } from "sonner";
import { OnboardingShell, Field } from "@/components/bitik/onboarding-shell";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Configurer votre entreprise — Bitik Tech" },
      { name: "description", content: "Configurez votre entreprise, votre boutique et vos préférences de gestion dans Bitik Tech." },
      { property: "og:title", content: "Configurer votre entreprise — Bitik Tech" },
      { property: "og:description", content: "Préparez votre espace Bitik Tech en quelques étapes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OnboardingPage,
});

const paymentMethods = ["Espèces", "Wave", "Orange Money", "Carte"];

function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [company, setCompany] = useState("");
  const [shop, setShop] = useState("");
  const [city, setCity] = useState("");
  const [logoName, setLogoName] = useState("");
  const [payments, setPayments] = useState(paymentMethods);
  const [creditsEnabled, setCreditsEnabled] = useState(true);

  const handleLogo = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Le logo ne doit pas dépasser 5 Mo.");
      event.target.value = "";
      return;
    }
    setLogoName(file.name);
    toast.success("Logo ajouté.");
  };

  const next = () => {
    if (step === 0 && !company.trim()) return toast.error("Indiquez le nom de votre entreprise.");
    if (step === 2 && (!shop.trim() || !city.trim())) return toast.error("Complétez les informations de la boutique.");
    setStep((current) => Math.min(current + 1, 4));
  };

  const togglePayment = (method: string) => setPayments((current) => current.includes(method) ? current.filter((item) => item !== method) : [...current, method]);

  return <OnboardingShell step={step}>
    <section className="panel p-6 sm:p-8">
      {step === 0 && <>
        <p className="eyebrow">Étape 1 sur 5</p>
        <h1 className="mt-3 text-2xl font-bold">Votre entreprise</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">Commençons par les informations principales.</p>
        <div className="mt-7"><Field label="Nom de l’entreprise" value={company} onChange={(event) => setCompany(event.target.value)} placeholder="Ex. Tech Sénégal" autoFocus /></div>
      </>}
      {step === 1 && <>
        <p className="eyebrow">Étape 2 sur 5</p>
        <h1 className="mt-3 text-2xl font-bold">Ajoutez votre logo</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">Formats PNG, JPG ou WEBP. Taille maximale : 5 Mo.</p>
        <label className="mt-7 grid min-h-52 cursor-pointer place-items-center rounded-lg border border-dashed border-input bg-app p-6 text-center transition hover:border-primary">
          <input className="sr-only" type="file" accept="image/png,image/jpeg,image/webp" onChange={handleLogo} />
          <span><ImageUp className="mx-auto size-9 text-primary"/><b className="mt-4 block">{logoName || "Choisir un logo"}</b><small className="mt-2 block text-muted-foreground">Appuyez ici pour sélectionner votre fichier</small></span>
        </label>
      </>}
      {step === 2 && <>
        <p className="eyebrow">Étape 3 sur 5</p>
        <h1 className="mt-3 text-2xl font-bold">Votre première boutique</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">Vous pourrez ajouter d’autres boutiques plus tard.</p>
        <div className="mt-7 grid gap-5 sm:grid-cols-2"><Field label="Nom de la boutique" value={shop} onChange={(event) => setShop(event.target.value)} placeholder="Ex. Boutique Dakar"/><Field label="Ville" value={city} onChange={(event) => setCity(event.target.value)} placeholder="Ex. Dakar"/></div>
      </>}
      {step === 3 && <>
        <p className="eyebrow">Étape 4 sur 5</p>
        <h1 className="mt-3 text-2xl font-bold">Configuration</h1>
        <div className="mt-7 grid gap-7">
          <Field label="Devise" value="FCFA" readOnly />
          <div><p className="text-sm font-semibold">Moyens de paiement</p><div className="mt-3 grid gap-3 sm:grid-cols-2">{paymentMethods.map((method) => <label key={method} className="flex items-center gap-3 rounded-md border border-border p-3 text-sm font-medium"><Checkbox checked={payments.includes(method)} onCheckedChange={() => togglePayment(method)}/>{method}</label>)}</div></div>
          <label className="flex items-center justify-between gap-4 rounded-md border border-border p-4"><span><b className="text-sm">Crédits clients</b><small className="mt-1 block text-muted-foreground">Activés par défaut</small></span><Checkbox checked={creditsEnabled} onCheckedChange={(checked) => setCreditsEnabled(checked === true)} aria-label="Activer les crédits clients"/></label>
          <Field label="Seuil d’alerte du stock" type="number" min="0" defaultValue="5" />
        </div>
      </>}
      {step === 4 && <div className="py-5 text-center">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-success-soft text-primary"><Check className="size-8"/></span>
        <h1 className="mt-6 text-2xl font-bold">Votre espace est prêt.</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">{company} et {shop} sont configurés. Vous pouvez maintenant commencer à gérer votre activité.</p>
        <Button className="mt-7" size="lg" onClick={() => navigate({ to: "/app" })}><Store/>Accéder au tableau de bord</Button>
      </div>}
      {step < 4 && <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
        <Button variant="ghost" disabled={step === 0} onClick={() => setStep((current) => Math.max(current - 1, 0))}>Retour</Button>
        <Button onClick={next}>{step === 3 ? "Terminer" : "Continuer"}</Button>
      </div>}
    </section>
  </OnboardingShell>;
}