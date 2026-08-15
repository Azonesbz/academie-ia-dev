# Passer de SQLite à Postgres

SQLite convient tant que l'application tourne dans un seul processus, sur un
disque persistant. Elle ne convient plus dès que l'hébergement est sans état
(Vercel, Cloud Run) ou qu'il faut plusieurs instances.

**Signes qu'il faut migrer** : déploiement serverless, plus d'une instance,
sauvegardes gérées attendues, ou plus de quelques dizaines d'écritures
concurrentes par seconde.

## Clés

| Variable | Où l'obtenir |
| --- | --- |
| `DATABASE_URL` | https://supabase.com/dashboard (Connection string, mode *pooler*) ou https://neon.tech |

En serverless, prenez toujours l'URL du **pooler** : une connexion directe par
invocation épuise la limite de connexions du serveur.

## Installation

```bash
npm install postgres        # ou @supabase/supabase-js si l'on veut aussi l'auth et le stockage
npm uninstall better-sqlite3 @types/better-sqlite3
```

Retirer `serverExternalPackages: ["better-sqlite3"]` de `next.config.ts`.

## Ce qu'il faut réécrire

`src/lib/db.ts` uniquement, si le reste du code passe par lui. Les différences
qui mordent :

- `better-sqlite3` est **synchrone**, `postgres` est **asynchrone** : toutes les
  fonctions qui appellent la base deviennent `async`.
- Les paramètres s'écrivent `$1, $2` au lieu de `?`.
- `TEXT PRIMARY KEY` reste valable ; `AUTOINCREMENT` n'existe pas.
- Les migrations ne peuvent plus être un simple `CREATE TABLE IF NOT EXISTS`
  rejoué à chaque démarrage sous plusieurs instances — les mettre dans des
  fichiers numérotés joués par une commande explicite, avec une table
  `schema_migrations`.

## Ce qu'il faut déplacer aussi

- **La limitation de débit** (`src/lib/throttle.ts`) est en mémoire : sous
  plusieurs instances, chacune a son compteur. La déplacer en base ou sur Redis.
- **Les fichiers téléversés** dans `DATA_DIR` : passer à un stockage objet
  (S3, R2, Supabase Storage).
