import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import { APP } from "./config";

// turbopackIgnore : le répertoire de données est résolu à l'exécution et ne
// doit pas entraîner le traçage de tout le projet dans le bundle serveur.
export const DATA_DIR = path.resolve(
  /*turbopackIgnore: true*/ process.env.DATA_DIR || "./data",
);

// Next.js recharge les modules à chaud en dev : on garde une seule connexion
// sur le globalThis pour éviter d'ouvrir un handle SQLite par rechargement.
const globalForDb = globalThis as unknown as { __db?: Database.Database };

function open(): Database.Database {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const db = new Database(path.join(DATA_DIR, `${APP.slug}.db`));
  // `next build` analyse les pages dans plusieurs processus : sans délai
  // d'attente, deux ouvertures simultanées se soldent par un SQLITE_BUSY.
  db.pragma("busy_timeout = 5000");
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");
  migrate(db);
  return db;
}

/**
 * Connexion paresseuse : ouverte à la première requête, jamais à l'import.
 *
 * Importer ce module ne doit avoir aucun effet de bord — sans quoi le simple
 * fait qu'une page importe `currentUser` ouvre la base pendant `next build`,
 * là où aucune requête n'est jouée.
 */
export function getDb(): Database.Database {
  const existing = globalForDb.__db;
  if (existing) return existing;
  const db = open();
  globalForDb.__db = db;
  return db;
}

/**
 * Migrations idempotentes, jouées à la première ouverture.
 *
 * Les deux tables ci-dessous sont le minimum du starter : des comptes et des
 * sessions. Ajoutez les tables du domaine à la suite, en `CREATE TABLE IF NOT
 * EXISTS` ; pour faire évoluer une table existante, ajoutez un `ALTER TABLE`
 * gardé par une vérification de `PRAGMA table_info`.
 */
function migrate(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id            TEXT PRIMARY KEY,
      email         TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at    TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS sessions (
      token      TEXT PRIMARY KEY,
      user_id    TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      created_at TEXT NOT NULL,
      expires_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);

    -- Progression : une ligne par étape achevée. On ne stocke QUE le fait
    -- qu'une étape est faite et sa date. Jamais l'artefact rendu, jamais le
    -- code, jamais une transcription de session : un cours gratuit qui
    -- collecte le code de ses apprenants est un collecteur de propriété
    -- intellectuelle sans contrepartie.
    CREATE TABLE IF NOT EXISTS etapes_faites (
      user_id    TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      etape_slug TEXT NOT NULL,
      faite_le   TEXT NOT NULL,
      PRIMARY KEY (user_id, etape_slug)
    );
  `);
}

export function newId(prefix: string): string {
  return `${prefix}_${crypto.randomUUID().replace(/-/g, "").slice(0, 22)}`;
}

export function nowIso(): string {
  return new Date().toISOString();
}
