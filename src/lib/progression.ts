import "server-only";
import { getDb, nowIso } from "./db";
import { ETAPES } from "./etapes";

/**
 * Les jalons déclarés par l'apprenant. Aucun pourcentage, aucun agrégat : un
 * chiffre unique cacherait laquelle des cinq compétences manque, ce qui est le
 * défaut du diplôme en plus petit.
 */

export type Jalon = { etapeSlug: string; jalon: 1 | 2; poseLe: string };

export function jalonsDe(userId: string): Jalon[] {
  return getDb()
    .prepare(
      "SELECT etape_slug AS etapeSlug, jalon, pose_le AS poseLe FROM jalons WHERE user_id = ?",
    )
    .all(userId) as Jalon[];
}

/** Le jour calendaire d'un instant ISO, en UTC — la granularité du verrou. */
function jour(iso: string): string {
  return iso.slice(0, 10);
}

/**
 * Le second jalon exige un jour strictement postérieur au premier. Ce n'est
 * pas une preuve — c'est ce que ça coûte : à l'honnête, refaire le travail ;
 * au menteur, attendre vingt-quatre heures.
 */
export function jalon2Ouvert(jalons: Jalon[], etapeSlug: string): boolean {
  const premier = jalons.find((j) => j.etapeSlug === etapeSlug && j.jalon === 1);
  if (!premier) return false;
  return jour(premier.poseLe) < jour(nowIso());
}

export function aJalon(
  jalons: Jalon[],
  etapeSlug: string,
  jalon: 1 | 2,
): boolean {
  return jalons.some((j) => j.etapeSlug === etapeSlug && j.jalon === jalon);
}

export function poserJalon(
  userId: string,
  etapeSlug: string,
  jalon: 1 | 2,
): void {
  getDb()
    .prepare(
      `INSERT INTO jalons (user_id, etape_slug, jalon, pose_le)
       VALUES (?, ?, ?, ?)
       ON CONFLICT (user_id, etape_slug, jalon) DO NOTHING`,
    )
    .run(userId, etapeSlug, jalon, nowIso());
}

export function retirerJalon(
  userId: string,
  etapeSlug: string,
  jalon: 1 | 2,
): void {
  getDb()
    .prepare(
      "DELETE FROM jalons WHERE user_id = ? AND etape_slug = ? AND jalon >= ?",
    )
    .run(userId, etapeSlug, jalon);
}

/** La première étape dont le premier jalon manque. */
export function prochaineEtape(jalons: Jalon[]) {
  return ETAPES.find((e) => !aJalon(jalons, e.slug, 1)) ?? null;
}

/** Vrai quand les dix jalons sont posés — l'écran de fin. */
export function toutDeclare(jalons: Jalon[]): boolean {
  return ETAPES.every(
    (e) => aJalon(jalons, e.slug, 1) && aJalon(jalons, e.slug, 2),
  );
}
