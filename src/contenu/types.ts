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

export type Lecon = {
  slug: string;
  /** L'accroche, affichée avant le corps. */
  chapeau: string;
  blocs: Bloc[];
  /** Ce que l'apprenant doit avoir produit avant de cocher l'étape. */
  exercice: string;
};
