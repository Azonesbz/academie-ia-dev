/**
 * Les cinq étapes de la progression. Contenu figé et daté : l'académie est
 * close, elle ne se nourrit pas. Chaque étape repose sur une surface dont le
 * churn mesuré est nul ou quasi nul — aucune ne cite de commande, de nom de
 * hook ni de champ de configuration.
 */

export type Etape = {
  /** Rang dans la progression, à partir de 0 pour la vérification d'install. */
  rang: number;
  /** Identifiant d'URL. */
  slug: string;
  titre: string;
  /** Ce que l'apprenant sait faire à la fin, en une phrase. */
  acquis: string;
  /** Ce qu'il produit, et qui prouve qu'il l'a fait. */
  preuve: string;
  /** Durée annoncée, honnête. */
  duree: string;
};

export const ETAPES: readonly Etape[] = [
  {
    rang: 0,
    slug: "verifier-ce-qui-tourne",
    titre: "Vérifier que ce qui est déclaré est ce qui tourne",
    acquis:
      "Distinguer un dispositif déclaré actif d'un dispositif réellement chargé.",
    preuve:
      "La liste de ce qui s'exécute vraiment dans tes sessions, confrontée à ce que ta configuration prétend.",
    duree: "15 minutes",
  },
  {
    rang: 1,
    slug: "decouper-une-demande",
    titre: "Découper une demande en tâches qu'un agent exécute sans déraper",
    acquis:
      "Reconnaître la tranche trop grosse avant de la lancer, pas après l'avoir subie.",
    preuve:
      "Une demande réelle de ton projet, découpée, avec pour chaque tranche son objectif unique et sa preuve.",
    duree: "45 minutes",
  },
  {
    rang: 2,
    slug: "le-test-qui-echoue-dabord",
    titre: "Le test qui échoue d'abord",
    acquis:
      "Faire produire la preuve avant le code, et savoir pourquoi l'ordre inverse ne prouve rien.",
    preuve:
      "Un test rouge, puis vert, sur un comportement de ton propre projet — en Arrange, Act, Assert.",
    duree: "1 heure",
  },
  {
    rang: 3,
    slug: "le-plan-rempli",
    titre: "Le plan rempli",
    acquis:
      "Écrire le plan qu'un agent peut suivre seul, au lieu de la consigne qu'il interprète.",
    preuve: "Un plan complet sur une tâche réelle, ses sept champs renseignés.",
    duree: "30 minutes",
  },
  {
    rang: 4,
    slug: "la-regle-qui-refuse",
    titre: "La règle qui refuse",
    acquis:
      "Choisir, parmi tout ce que tu t'es promis de faire proprement, ce qui mérite de te refuser réellement.",
    preuve:
      "Un garde qui bloque, son test, et surtout : la justification écrite du choix de cette règle plutôt que d'une autre.",
    duree: "1 heure",
  },
] as const;

/** Le contenu est daté : il ne sera pas mis à jour, et ça se dit. */
export const ARRETE_LE = "août 2026";

export function etapeParSlug(slug: string): Etape | undefined {
  return ETAPES.find((e) => e.slug === slug);
}
