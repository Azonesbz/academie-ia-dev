# Mesure d'audience et acquisition

## Audience — Plausible

Sans cookie, sans bandeau de consentement à afficher, donnée hébergée en
Europe. Suffisant pour savoir d'où viennent les visiteurs et ce qui convertit.

| Variable | Où l'obtenir |
| --- | --- |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | https://plausible.io/sites — le domaine déclaré, ex. `monapp.fr` |

Ajouter le script dans `src/app/layout.tsx`, conditionné à la présence de la
variable pour ne rien charger en développement :

```tsx
{process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
  <script
    defer
    data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
    src="https://plausible.io/js/script.js"
  />
)}
```

## Ce qui compte vraiment sur un micro-SaaS

Trois chiffres, pas trente : visiteurs de la page publique, inscriptions,
comptes qui reviennent la semaine suivante. Le reste est du bruit tant qu'il
n'y a pas de volume.

Une requête SQL sur `users` et sur les tables du domaine donne les deux
derniers sans aucun outil externe — le faire avant d'installer quoi que ce soit.

## Liste d'attente avant lancement

Une table `waitlist (email, created_at, source)` et un formulaire sur la page
publique valent mieux qu'un outil tiers : la donnée reste chez soi et l'export
est une requête.

## Envoi en masse

Hors périmètre du starter. Quand le besoin arrive : Resend Broadcasts ou
Listmonk auto-hébergé. Vérifier les obligations de consentement et le lien de
désinscription avant le premier envoi.
