import "server-only";
import { getDb, nowIso } from "./db";
import { ETAPES } from "./etapes";

/**
 * Suivi de progression. La seule donnée d'apprenant que le produit conserve :
 * quelles étapes sont faites, et quand. Rien de ce qu'il a écrit.
 */

export function etapesFaites(userId: string): Set<string> {
  const lignes = getDb()
    .prepare("SELECT etape_slug FROM etapes_faites WHERE user_id = ?")
    .all(userId) as { etape_slug: string }[];
  return new Set(lignes.map((l) => l.etape_slug));
}

export function marquerFaite(userId: string, etapeSlug: string): void {
  getDb()
    .prepare(
      `INSERT INTO etapes_faites (user_id, etape_slug, faite_le)
       VALUES (?, ?, ?)
       ON CONFLICT (user_id, etape_slug) DO NOTHING`,
    )
    .run(userId, etapeSlug, nowIso());
}

export function annulerFaite(userId: string, etapeSlug: string): void {
  getDb()
    .prepare("DELETE FROM etapes_faites WHERE user_id = ? AND etape_slug = ?")
    .run(userId, etapeSlug);
}

/** Rang de la première étape non faite, ou `null` si la progression est close. */
export function prochaineEtape(faites: Set<string>) {
  return ETAPES.find((e) => !faites.has(e.slug)) ?? null;
}

export function pourcentage(faites: Set<string>): number {
  return Math.round((faites.size / ETAPES.length) * 100);
}
