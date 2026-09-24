# Bitik Tech V1 — Plan d’implémentation

## Objectif
Construire une démo frontend complète, cohérente et commercialisable de Bitik Tech, en français, avec des données réalistes en FCFA et des interactions locales. Aucun service distant ni compte réel ne sera connecté dans cette V1.

## Direction visuelle
- Identité propre à Bitik Tech : monogramme BT simple, vert `#16A34A`, noir, blanc et gris neutres.
- Inter comme police principale, hiérarchie typographique forte et espaces généreux.
- Landing page éditoriale et orientée produit : montrer le logiciel en action, puis raconter problème → solution → démonstration → valeur → confiance → inscription.
- Interfaces métier plus denses et lisibles : chiffres, alertes et actions immédiatement compréhensibles.
- Animations discrètes uniquement : entrée progressive, graphique animé, transitions et retours tactiles légers.

## Pages publiques
- `/` : landing page complète avec navigation, Hero exceptionnel, vraie maquette Dashboard, problèmes, piliers produit, gestion électronique/IMEI, démo de vente, crédits, performance, multi-boutiques, étapes, sécurité, aperçu tarifs, FAQ, CTA final et footer.
- `/tarifs` : offres Starter, Standard, Pro et Enterprise, bascule mensuel/annuel sans inventer de prix définitifs.
- `/faq` : accordéon complet des questions demandées.
- `/connexion` et `/inscription` : formulaires soignés avec validation frontend et passage vers l’onboarding.

## Onboarding
- Parcours partagé avec progression : Entreprise → Logo → Boutique → Configuration → Terminé.
- Routes dédiées pour chaque étape, données conservées en mémoire locale pendant la démo.
- Téléversement et aperçu du logo, choix des paiements, crédits activés et seuil de stock.
- Écran final récapitulatif menant au Dashboard.

## Application métier
- Shell applicatif commun : sidebar desktop, en-tête avec recherche/notifications/boutique/profil, navigation tactile mobile.
- `/app` : Dashboard très travaillé avec CA, ventes, bénéfice, crédits, graphique temporel, stock faible, crédits à surveiller, meilleures ventes et activité récente.
- `/app/produits` : recherche, filtres, ajout/modification/désactivation/suppression et fiche produit détaillée.
- `/app/stock` : indicateurs, entrée de stock et historique des mouvements.
- `/app/ventes` : POS tactile avec catalogue, panier, quantités, client, paiement, montant payé, reste, échéance et validation.
- `/app/clients` : liste, ajout et profil détaillé avec ventes, crédits et remboursements.
- `/app/credits` : indicateurs, table/liste responsive, détail et remboursement dynamique.
- `/app/historique` : journal filtrable par type, date, utilisateur et recherche.
- `/app/parametres` : entreprise, boutique, utilisateurs, paiements, notifications, abonnement et sécurité.

## Données et interactions
- Créer un magasin de données frontend partagé avec les produits, clients et opérations fournis dans le brief.
- Synchroniser les interactions : ajout produit, entrée stock, vente, baisse de stock, mise à jour du CA, activité et crédit.
- Calculer dynamiquement `reste = total - montant payé` et les remboursements.
- Ajouter confirmations, états vides, chargement, erreurs simulées et notifications de succès.
- Préparer les types métier pour une future structure utilisateur → entreprise → boutiques → produits → stock → ventes → paiements → crédits.

## Responsive
- Desktop : navigation latérale et vues riches.
- Tablette : colonnes réorganisées et densité réduite.
- Mobile : listes/cartes plutôt que tableaux, menu tiroir, navigation basse et POS optimisé tactile.

## Architecture technique
- Conserver TanStack Start et créer une route réelle pour chaque URL demandée.
- Centraliser les données de démonstration, types, formatage FCFA et calculs métier.
- Réutiliser des composants ciblés : marque, navigation publique, shell application, indicateurs, graphiques, listes d’alertes, formulaires et dialogues.
- Utiliser uniquement les jetons sémantiques du design system pour les couleurs, ombres et surfaces.
- Ajouter des métadonnées uniques à chaque page de contenu.

## Validation
- Vérifier la compilation et les erreurs d’exécution.
- Parcourir les flux principaux : inscription → onboarding → Dashboard, ajout produit, entrée stock, vente et remboursement.
- Contrôler visuellement la landing, le Dashboard et le POS en desktop et mobile.
- Vérifier la cohérence des montants, stocks, statuts et activités après chaque interaction.
