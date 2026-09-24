import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, Boxes, CircleDollarSign, ShoppingCart, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardPreview } from "./dashboard-preview";

const highlights = [
  { icon: Boxes, label: "Stock", value: "Temps réel" },
  { icon: ShoppingCart, label: "Ventes", value: "24 aujourd’hui" },
  { icon: CircleDollarSign, label: "Crédits", value: "8 clients" },
  { icon: TrendingUp, label: "Performance", value: "+12,5%" },
];

export function LandingHero() {
  return <section className="landing-hero border-b border-ink-border">
    <div className="landing-grid" aria-hidden="true" />
    <div className="container-shell relative z-10 py-10 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-4xl text-center">
        <p className="landing-kicker"><span />Gestion pour commerces technologiques</p>
        <h1 className="display-title mt-5 text-ink-foreground">Gérez votre boutique.<br/><span className="text-primary">Développez votre activité.</span></h1>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-ink-muted sm:text-lg sm:leading-8">Bitik Tech centralise vos produits, stocks, ventes, clients, crédits et performances dans une plateforme pensée pour les boutiques de téléphonie et d’électronique.</p>
      </div>
      <div className="relative mx-auto mt-8 max-w-5xl lg:mt-10">
        <div className="landing-dashboard-frame">
          <div className="landing-dashboard-bar"><span className="size-2 rounded-full bg-primary"/><span className="size-2 rounded-full bg-warning"/><span className="size-2 rounded-full bg-ink-border"/><span className="ml-auto text-[10px] font-semibold text-ink-muted">Activité en direct</span></div>
          <DashboardPreview />
        </div>
        <div className="landing-highlight-grid">{highlights.map(({icon:Icon,label,value})=><div key={label} className="landing-highlight"><span className="grid size-8 shrink-0 place-items-center rounded-md bg-secondary text-primary"><Icon className="size-4"/></span><span className="min-w-0"><b>{label}</b><small>{value}</small></span></div>)}</div>
      </div>
      <div className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row sm:justify-center"><Button size="lg" asChild><Link to="/inscription">Commencer gratuitement <ArrowRight/></Link></Button><Button size="lg" variant="outline" className="border-ink-border bg-ink/70 text-ink-foreground hover:bg-ink-border hover:text-ink-foreground" asChild><a href="#demonstration">Découvrir Bitik Tech <ArrowDown/></a></Button></div>
      <p className="mt-5 text-center text-xs font-medium text-ink-muted">Configuration simple <span className="mx-2 text-primary">•</span> Essai gratuit <span className="mx-2 text-primary">•</span> Sans engagement</p>
    </div>
  </section>;
}