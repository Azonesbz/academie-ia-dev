/**
 * Le contenu d'une leçon, en blocs typés plutôt qu'en Markdown : il n'y a que
 * cinq leçons, elles ne bougeront plus, et un rendu explicite coûte moins
 * qu'une chaîne de transformation à maintenir pour une progression close.
 */

export type Bloc =
  | { type: "para"; texte: string }
  | { type: "titre"; texte: string }
  | { type: "liste"; items: string[] }
  | { type: "code"; langage: string; texte: string }
  | { type: "encadre"; titre: string; texte: string };

/**
 * Le cas truqué qui ferme la leçon. Un artefact plausible, contenant un défaut
 * précis. L'apprenant écrit son diagnostic AVANT de pouvoir lire le nôtre :
 * sans ce référent, une auto-évaluation n'est pas inexacte, elle est
 * inexistante — on ne peut se comparer à rien.
 */
export type CasTruque = {
  titre: string;
  /** L'énoncé : ce qu'on prétend de cet artefact. */
  mise_en_scene: string;
  langage: string;
  artefact: string;
  question: string;
  /** Ce que l'apprenant lit après avoir écrit le sien. Chirurgical. */
  revelation: string;
};

export type Lecon = {
  slug: string;
  /** L'accroche, affichée avant le corps. */
  chapeau: string;
  blocs: Bloc[];
  /** Ce que l'apprenant doit avoir produit sur son propre dépôt. */
  exercice: string;
  casTruque: CasTruque;
};
