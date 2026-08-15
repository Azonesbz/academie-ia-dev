# Appels au modèle — Claude

## Clés

| Variable | Où l'obtenir |
| --- | --- |
| `ANTHROPIC_API_KEY` | https://console.anthropic.com/settings/keys |

## Installation

```bash
npm install @anthropic-ai/sdk
```

## Ce qu'il faut écrire

`src/lib/model.ts` : un client unique, le nom du modèle dans une constante, et
les appels enveloppés dans une fonction qui traduit les erreurs de l'API en
messages exploitables.

Pour une sortie exploitée par le code, forcer la structure par un outil (`tools`
+ `tool_choice`) plutôt que d'espérer du JSON dans du texte libre : le schéma
garantit la présence de chaque champ.

## Pièges

- **La clé ne doit jamais atteindre le navigateur.** Tout appel passe par une
  route serveur ; aucune variable `NEXT_PUBLIC_*` ne contient de clé.
- **Facturation à l'usage.** Sur un produit public, plafonner par compte avant
  l'ouverture, sinon un seul utilisateur peut vider le budget.
- **Traitements longs.** Au-delà de quelques secondes, écrire un statut en base
  et traiter en tâche de fond, plutôt que de tenir la requête HTTP ouverte.
- **Mise en cache du prompt** pour les contextes longs réutilisés d'un appel à
  l'autre : le coût baisse fortement.

Le détail à jour des modèles, tarifs et paramètres est dans la compétence
`claude-api` — la charger avant d'écrire le premier appel.
