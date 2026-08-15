import type { Lecon } from "./types";

export const etape03: Lecon = {
  slug: "le-plan-rempli",
  chapeau:
    "Le format du plan est spécifié en sept champs dans la méthode d'origine, et n'y est jamais montré rempli. Le voici rempli.",
  blocs: [
    {
      type: "para",
      texte:
        "Un plan n'est pas une liste de choses à faire. C'est le document qui te permet d'interrompre un agent au milieu, de partir déjeuner, et de reprendre sans avoir à reconstruire ce que tu voulais. Sa valeur se mesure au moment de la reprise, pas au moment de l'écriture.",
    },
    { type: "titre", texte: "Les sept champs" },
    {
      type: "liste",
      items: [
        "directive — le quoi, fidèle à la demande. Une phrase, dans tes mots, pas les siens.",
        "scope — le domaine métier ou technique : auth, api, ui. C'est ce qui ira dans le message de commit.",
        "perimeter.areas — les zones du dépôt touchées : app, lib, components. À ne pas confondre avec scope : l'un dit de quoi ça parle, l'autre où ça écrit.",
        "description — par tâche : l'intention unique de la tranche.",
        "files — par tâche : les fichiers attendus. C'est le garde-fou du « trois fichiers métier ».",
        "commit — par tâche : le message, écrit d'avance, en anglais, prêt à copier.",
        "status — par tâche : à faire, en cours, fait.",
      ],
    },
    {
      type: "encadre",
      titre: "Le plan ne se versionne jamais",
      texte:
        "Il vit dans le fil de conversation, pas dans le dépôt. Un plan committé devient un document mort que personne ne met à jour, et qui contredit le code au bout de trois jours. C'est l'une des rares règles de la méthode d'origine à être portée par un garde qui refuse.",
    },
    { type: "titre", texte: "Un plan rempli" },
    {
      type: "code",
      langage: "yaml",
      texte: `directive: permettre la connexion par Google en plus du mot de passe
scope: auth
perimeter.areas: [lib, components]

tâches:
  - description: table et type du compte externe
    files: [src/lib/db.ts, src/lib/types.ts]
    commit: "feat(auth): add external account table"
    status: fait

  - description: échanger le code OAuth contre un profil
    files: [src/lib/auth-google.ts, src/lib/auth-google.test.ts]
    commit: "feat(auth): exchange oauth code for a profile"
    status: en cours

  - description: rattacher le profil, ou créer le compte
    files: [src/lib/auth.ts, src/lib/auth.test.ts]
    commit: "feat(auth): link external profile to an account"
    status: à faire

  - description: bouton et retour d'erreur
    files: [src/components/AuthForm.tsx]
    commit: "feat(auth): add the google sign-in button"
    status: à faire`,
    },
    { type: "titre", texte: "Écrire le commit avant le code" },
    {
      type: "para",
      texte:
        "C'est le champ qui surprend, et c'est le plus utile. Un message de commit qu'on n'arrive pas à écrire avant la tâche décrit une tâche qui n'a pas d'intention unique. Si tu écris « feat(auth): add google sign-in and refactor sessions », tu viens de découvrir que tu as deux tâches — sans avoir écrit une ligne.",
    },
  ],
  exercice:
    "Reprends le découpage de l'étape 01 et remplis les sept champs pour de bon, y compris les messages de commit en anglais. Une tâche dont tu n'arrives pas à écrire le commit d'avance est une tâche à scinder : refais-la passer par l'étape 01.",
  casTruque: {
    titre: "Un plan complet, et une tâche de trop",
    mise_en_scene:
      "Les sept champs sont remplis, les fichiers sont listés, les messages sont en anglais et à l'impératif. Le plan passerait n'importe quelle relecture de forme.",
    langage: "yaml",
    artefact: `directive: permettre l'export des factures en PDF
scope: billing
perimeter.areas: [lib, components]

tâches:
  - description: gabarit et types de la facture
    files: [src/lib/facture-modele.ts, src/lib/types.ts]
    commit: "feat(billing): add the invoice template"
    status: fait

  - description: génération du PDF et nettoyage du module de facturation
    files: [src/lib/export-pdf.ts, src/lib/facture.ts]
    commit: "feat(billing): generate invoice pdf and refactor the billing module"
    status: en cours

  - description: bouton d'export
    files: [src/components/BoutonExport.tsx]
    commit: "feat(billing): add the export button"
    status: à faire`,
    question:
      "Une tâche est à scinder, et le plan te le dit lui-même. Où, exactement ?",
    revelation:
      "La deuxième, et le signe est dans son message de commit : « generate invoice pdf and refactor the billing module ». Le « and » n'est pas une maladresse de rédaction, c'est un diagnostic — un message qui a besoin d'une conjonction annonce deux intentions, donc deux tâches. Remarque ce qui rend le piège efficace : cette tâche respecte la limite de trois fichiers, elle a ses champs, elle a son statut. Aucun critère de forme ne l'attrape. C'est pour ça que le champ `commit` est le plus utile des sept, et qu'on l'écrit AVANT la tâche et non après : il est le seul à révéler qu'une tâche a deux intentions alors qu'elle a l'air d'en avoir une. Conséquence concrète : le jour où le refactor casse quelque chose, tu ne peux pas annuler le refactor sans annuler la génération du PDF.",
  },
};
