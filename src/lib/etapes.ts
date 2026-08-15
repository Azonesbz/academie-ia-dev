import { ETAPES_BASE } from "./etapes-base";
import { ETAPES_METHODE } from "./etapes-methode";

/**
 * Deux parcours gratuits, tous deux clos et datés.
 *
 * « La base » donne le vocabulaire de l'écosystème : ce qu'est un agent, une
 * skill, un sous-agent, un hook, un plugin — et surtout ce qui les distingue.
 * « La méthode » enseigne les gestes qui ne dépendent d'aucune interface.
 *
 * Ce qui est payant n'est pas ici : c'est le banc de diagnostic et le kit
 * d'audit, qui se vendent une fois. Voir /offre.
 */

export type Parcours = "base" | "methode";

export type Etape = {
  parcours: Parcours;
  /** Rang au sein de son parcours. */
  rang: number;
  slug: string;
  titre: string;
  /** La compétence visée, à la première personne. Une cible, pas un constat. */
  jeSais: string;
  /** L'erreur répandue que cette étape corrige. */
  confusion: string;
  /** Ce que l'apprenant produit sur son dépôt. Le parcours « base » enseigne
   *  des notions et n'en réclame pas toujours un. */
  preuve?: string;
  duree: string;
  criteresJalon1: readonly string[];
  critereJalon2: string;
  signeDeNonMaitrise: string;
};

export const PARCOURS: Record<
  Parcours,
  { titre: string; sous_titre: string }
> = {
  base: {
    titre: "La base",
    sous_titre:
      "Les objets de l'écosystème, et ce qui les distingue. Cinq notions, deux heures.",
  },
  methode: {
    titre: "La méthode",
    sous_titre:
      "Les gestes qui ne dépendent d'aucune version d'outil. Cinq étapes, sur ton dépôt.",
  },
};

export const ETAPES: readonly Etape[] = [...ETAPES_BASE, ...ETAPES_METHODE];

/** Le contenu est daté : il ne sera pas mis à jour, et ça se dit. */
export const ARRETE_LE = "août 2026";

export function etapeParSlug(slug: string): Etape | undefined {
  return ETAPES.find((e) => e.slug === slug);
}

export function etapesDu(parcours: Parcours): readonly Etape[] {
  return ETAPES.filter((e) => e.parcours === parcours);
}
