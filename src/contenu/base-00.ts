import type { Lecon } from "./types";

export const base00: Lecon = {
  slug: "la-boucle-et-le-contexte",
  chapeau:
    "« Claude », c'est le modèle. L'agent, c'est ce qui l'entoure : un contexte, des outils, et une boucle. Presque tous les « il n'écoute pas » sont un problème de contexte, et ça ne se règle pas en payant un modèle plus cher.",
  blocs: [
    {
      type: "para",
      texte:
        "Un agent est un modèle plus un contexte plus un jeu d'outils, le tout dans une boucle. À chaque tour : le modèle relit tout son contexte, choisit un outil, l'outil s'exécute, le résultat retombe dans le contexte, et on recommence.",
    },
    { type: "titre", texte: "Trois conséquences, et elles expliquent tout" },
    {
      type: "liste",
      items: [
        "Le contexte est un budget, pas une mémoire. Tout ce qui y entre est relu à chaque tour — ce n'est pas rangé une fois pour toutes dans un tiroir.",
        "L'agent ne sait que ce qui est dans son contexte. Une règle écrite dans un fichier que rien ne charge n'existe pas, quelle que soit sa qualité.",
        "Rien dans la boucle n'est déterministe : c'est le modèle qui décide. Ce qui doit être garanti doit sortir de la boucle.",
      ],
    },
    {
      type: "encadre",
      titre: "Modèle ou contexte ?",
      texte:
        "Changer de modèle change la qualité des décisions. Changer le contexte et les outils change ce qui est décidable. Si ta règle n'est pas appliquée, un modèle plus puissant ne la verra pas davantage — elle n'est pas là.",
    },
    { type: "titre", texte: "Ce qui met une règle dans le contexte" },
    {
      type: "para",
      texte:
        "Quelque chose doit l'y mettre, explicitement. Dans un plugin réel que tu peux ouvrir, c'est un hook de démarrage de session qui affiche un index de trente-quatre lignes : chaque règle y est nommée en une phrase, avec la compétence à charger le moment venu. Retire ce hook et les règles existent toujours sur le disque — elles ne sont simplement dans aucun contexte, et l'agent les ignore.",
    },
    {
      type: "para",
      texte:
        "C'est le principe du chargement progressif : on paie en permanence un index court, et on paie le détail seulement quand il sert. L'index n'est pas le contenu — c'est une table des matières qui dit où aller.",
    },
  ],
  exercice:
    "Ouvre ta propre configuration et réponds à deux questions par écrit : qu'est-ce qui entre dans le contexte au démarrage de chaque session, et qu'est-ce qui n'y entre qu'à la demande ? Si tu ne sais pas répondre pour un fichier donné, c'est probablement qu'il n'entre jamais.",
  casTruque: {
    titre: "L'index qui est devenu le contenu",
    mise_en_scene:
      "Une équipe veut que ses règles soient toujours respectées. Elle écrit un index de 900 lignes qui recopie intégralement ses sept doctrines, et l'injecte au démarrage de chaque session. La configuration est valide, ça se charge, tout le monde est rassuré de voir les règles dans le contexte.",
    langage: "text",
    artefact: `# Index méthodologique — chargé à chaque session

## 1. Tests d'abord
[... 140 lignes : le cycle complet, les motifs, les exemples ...]

## 2. Organisation du code
[... 120 lignes ...]

## 3. Code propre
[... 165 lignes ...]

## 4. Frontières et échelle
[... 130 lignes ...]

[... 3 doctrines de plus ...]

Total : 900 lignes, injectées au démarrage de chaque session.`,
    question:
      "La configuration est correcte et les règles sont bien dans le contexte. Qu'est-ce que cette équipe a acheté sans s'en apercevoir, et qu'a-t-elle perdu ?",
    revelation:
      "Elle a acheté un contexte déjà plein au premier tour, payé à chaque démarrage — y compris les jours où l'on ne touche pas une ligne de code — et relu à chaque tour ensuite, puisque le contexte n'est pas une mémoire. Elle a perdu exactement ce qui justifiait de découper ses règles en compétences séparées : le chargement à la demande. Il y a pire que le coût : sept doctrines complètes déversées en vrac se diluent les unes dans les autres, et aucune ne ressort au moment où elle servirait. L'index réel du plugin dont s'inspire ce cas fait trente-quatre lignes — il nomme chaque règle en une phrase et pointe la compétence à charger. Un index est un index ; le jour où le tien devient le contenu, tu as payé le plein tarif pour perdre le bénéfice.",
  },
};
