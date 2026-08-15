# L'académie IA du dev

Reprendre la main sur un dépôt parti en vrille. Cinq étapes, sur ton propre
projet — à la fin, une règle que tu subissais est devenue un garde qui refuse.

Contenu **clos et daté d'août 2026** : la progression se termine et ne se
nourrit plus. Aucune étape ne cite de commande, de nom de hook ni de champ de
configuration — ce qui périmerait n'est pas ici.

## Mise en route

```bash
npm install
cp env.example .env.local
npm run dev
```

http://localhost:3000. **Aucune clé d'API n'est nécessaire** : l'académie
n'appelle aucun modèle et aucun service facturé.

L'identité du produit vit dans `src/lib/config.ts` ; `.env.local` la surcharge
si besoin.

## Ce que le produit stocke

Une seule table métier, `etapes_faites`, avec trois colonnes : l'utilisateur,
le slug de l'étape, la date. **Jamais l'artefact rendu, jamais le code, jamais
une transcription de session.** Un cours gratuit qui collecte le code de ses
apprenants est un collecteur de propriété intellectuelle sans contrepartie —
la contrainte est portée par le schéma, pas seulement par l'intention.

L'apprenant déclare lui-même ce qu'il a fait. Rien ne vérifie : vérifier
voudrait dire lire son dépôt.

## Direction artistique

Reprise du portfolio `vincentavz`. Trois principes, et tout en découle :

1. **Trois noirs**, séparés d'un ou deux pourcents de luminance — `#0a0a0a` le
   fond, `#111111` toute surface élevée, `#151515` les bandes discrètes. Un
   aplat unique tuerait la profondeur.
2. **Aucune ombre.** Le relief vient d'un filet de 1 px en blanc à 12 %, qui se
   pose en surimpression et ne rend donc pas pareil selon la surface dessous.
3. **Le blanc est l'accent.** Il n'y a pas de couleur de marque, et le rayon
   croît strictement avec la surface : 6 px un contrôle, 8 px un bouton, 16 px
   une carte.

Le mouvement tient en une ligne : 150 ms sur les couleurs seules, 200 ms quand
c'est une surface entière qui répond, 500 ms pour la barre de progression.
Rien ne se déplace jamais.

Quatre écarts du portfolio ont été corrigés plutôt que recopiés : le filet des
champs passe à 35 % (le 12 % ne rend que ~1,9:1, sous le seuil WCAG 1.4.11), le
focus n'est jamais annulé, le bouton blanc porte du texte noir, et les
compteurs sont en chiffres à chasse fixe.

## Ce que ce n'est pas

- Pas de paiement, pas de version payante : le gratuit est une décision.
- Pas de vidéo, pas de quiz, pas de certificat.
- Pas d'e-mail d'accompagnement ni de relance.
- Pas de mesure d'audience.

## Structure

```
src/
  app/
    page.tsx              page publique
    login/  signup/       authentification
    app/                  espace connecté (layout protégé, progression, actions)
    globals.css           la direction artistique entière
  components/             EnTete, Logo, CarteEtape, LigneEtape, BarreProgression, AuthForm
  lib/
    etapes.ts             le contenu des cinq étapes
    progression.ts        suivi : marquer, annuler, pourcentage
    config.ts  db.ts  auth.ts  throttle.ts  env.ts
```
