import type { Lecon } from "./types";

export const base02: Lecon = {
  slug: "le-sous-agent-demarre-nu",
  chapeau:
    "Un sous-agent ne se souvient de rien, parce qu'il n'a rien vu. Ni ta conversation, ni les compétences déjà chargées, ni les décisions que vous venez de prendre ensemble.",
  blocs: [
    {
      type: "para",
      texte:
        "Déléguer, c'est lancer un agent depuis un agent : fenêtre de contexte neuve, ses propres instructions, ses propres outils, ses propres permissions. Il travaille seul et ne rend qu'un résumé final. Tout le bruit — les fichiers lus, les sorties de tests, les impasses — reste chez lui.",
    },
    { type: "titre", texte: "Ce qu'il ne reçoit pas" },
    {
      type: "liste",
      items: [
        "L'historique de ta conversation. Il n'a aucune idée de ce dont vous venez de parler.",
        "Les compétences chargées plus tôt dans ta session. Elles ne voyagent pas.",
        "Les fichiers déjà lus, et les décisions déjà prises.",
      ],
    },
    {
      type: "para",
      texte:
        "Ce qu'il reçoit : ses propres instructions, ton message de délégation, les fichiers de règles du projet, et les compétences explicitement nommées dans son en-tête. Rien d'autre. Ce qui doit voyager doit donc être écrit là — dans l'en-tête ou dans le message —, jamais supposé.",
    },
    {
      type: "encadre",
      titre: "Le corps décrit, l'en-tête décide",
      texte:
        "Écrire « tu ne modifies aucun fichier » dans le corps est une intention. Ce qui l'empêche vraiment de modifier un fichier, c'est de ne pas lui donner l'outil. Une contrainte qui n'existe qu'en prose est une contrainte qu'on espère.",
    },
    { type: "titre", texte: "Ce que déléguer coûte" },
    {
      type: "para",
      texte:
        "Un contexte neuf se paie : tout ce dont il a besoin doit être relu par lui. Déléguer vaut le coup quand le travail est volumineux et que seul son résumé t'intéresse — explorer, chercher, vérifier. Ça ne vaut pas le coup pour une tâche courte qui s'appuie sur ce que vous venez d'établir : tu paierais un rechargement complet pour économiser trois lignes.",
    },
  ],
  exercice:
    "Prends un sous-agent que tu as écrit. Liste ce que son corps suppose qu'il sait — une compétence, une convention, une décision de la session — et vérifie ligne par ligne si ça lui arrive vraiment. Déplace dans son en-tête ou dans ton message de délégation tout ce qui n'y arrivait pas.",
  casTruque: {
    titre: "Le sous-agent qui se souvient de tout, sauf que non",
    mise_en_scene:
      "Un développeur veut une revue de sécurité qui ne touche à rien. Il écrit un sous-agent dédié. Ça se charge, ça se délègue, et le rapport rendu est parfaitement crédible.",
    langage: "yaml",
    artefact: `---
name: revue-secu
description: Relit le code et signale les problèmes de sécurité.
---

Tu es l'agent revue-secu.

Reprends la compétence code-review-and-quality chargée plus tôt dans
la session, ainsi que les décisions d'architecture qu'on a prises
ensemble.

Tu ne modifies aucun fichier : tu rapportes, c'est tout.`,
    question:
      "Le rapport rendu est crédible, et c'est bien le problème. Nomme les deux choses que ce sous-agent croit avoir et qu'il n'a pas.",
    revelation:
      "Premièrement, la compétence « chargée plus tôt dans la session » ne l'a jamais atteint : les compétences ne voyagent pas d'un agent à l'autre, il faut les nommer dans son en-tête. Il relit donc du code sans la grille qu'on croit lui avoir donnée — et il produira quand même un rapport, plausible, fondé sur ses connaissances générales. C'est ce qui rend la panne coûteuse : elle ne se manifeste pas par une erreur, mais par un rapport d'une qualité qu'on ne peut pas distinguer. Idem pour « les décisions qu'on a prises ensemble » : il n'était pas là. Deuxièmement, « tu ne modifies aucun fichier » est une phrase dans un corps de texte, pas une permission. Faute de restreindre ses outils dans l'en-tête, il hérite de ceux qui permettent d'écrire — et rien ne l'empêchera d'en profiter s'il juge un correctif évident.",
  },
};
