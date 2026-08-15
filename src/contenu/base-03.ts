import type { Lecon } from "./types";

export const base03: Lecon = {
  slug: "le-garde-qui-na-jamais-rien-refuse",
  chapeau:
    "Un garde qui écrit un message d'erreur et laisse passer la commande est pire qu'un garde absent : il fabrique la certitude d'être protégé.",
  blocs: [
    {
      type: "para",
      texte:
        "Deux mécanismes différents sont constamment confondus. Les permissions sont déclaratives : elles disent quels appels d'outils sont autorisés, refusés, ou demandent confirmation. Les hooks sont du code exécuté à un moment donné du cycle, qui peut inspecter l'appel et le refuser.",
    },
    { type: "titre", texte: "Un hook garde un appel, pas une ressource" },
    {
      type: "para",
      texte:
        "C'est la confusion la plus coûteuse. Un garde branché sur l'exécution de commandes ne verra jamais passer une lecture directe du même fichier par un autre outil : ce n'est pas le même appel. Protéger une ressource, c'est le travail d'une règle de permission, qui s'applique quel que soit le chemin.",
    },
    {
      type: "encadre",
      titre: "Parler n'est pas bloquer",
      texte:
        "Écrire un message sur la sortie d'erreur produit du rouge dans le terminal et rien d'autre. Bloquer un appel demande de rendre une décision de refus explicite, dans la forme que l'outil attend. Le message rassure ; seule la décision arrête.",
    },
    { type: "titre", texte: "Comment prouver qu'un garde refuse" },
    {
      type: "liste",
      items: [
        "Tente le geste interdit, pour de vrai. Lire le script ne prouve rien : on relit ce qu'on croyait avoir écrit.",
        "Puis tente les gestes équivalents. Un garde ne protège que ce que son auteur a pensé à écrire, et il ne te dira jamais ce qu'il a laissé passer.",
        "Puis vérifie qu'un geste légitime passe encore. Un garde qui refuse tout est retiré dans la semaine.",
      ],
    },
    {
      type: "para",
      texte:
        "Cette épreuve prend deux minutes et elle est la seule qui vaille. Un garde non éprouvé n'est pas un garde : c'est une intention avec un fichier autour.",
    },
  ],
  exercice:
    "Prends un de tes gardes. Tente le geste qu'il interdit et regarde ce qui se passe vraiment. Puis cherche deux façons d'obtenir le même effet qu'il laisserait passer. Note ce que tu as trouvé — c'est la liste de ce que tu croyais protégé.",
  casTruque: {
    titre: "Six lignes qui protègent les secrets, sauf qu'elles ne protègent rien",
    mise_en_scene:
      "Une équipe veut interdire l'accès à ses fichiers de secrets. Elle écrit ce garde, branché sur l'exécution de commandes. Il se déclenche, le message apparaît en rouge dans le terminal, la case « secrets protégés » est cochée en réunion.",
    langage: "bash",
    artefact: `#!/usr/bin/env bash
commande="$(cat | jq -r '.tool_input.command')"

if printf '%s' "$commande" | grep -q '\\.env'; then
  echo "Acces aux secrets interdit." >&2
  exit 1
fi
exit 0`,
    question:
      "Le message s'affiche bel et bien. Nomme les deux raisons pour lesquelles le fichier de secrets est malgré tout lisible.",
    revelation:
      "Premièrement, le code de sortie choisi n'est pas celui qui bloque : le message part sur la sortie d'erreur, puis la commande s'exécute juste après. Refuser demande de rendre une décision explicite dans la forme attendue — et non de sortir en erreur. C'est le piège classique : on voit du rouge, donc on croit que ça a marché. Deuxièmement, et même si le refus fonctionnait, ce garde est branché sur l'exécution de commandes : il ne voit passer que ça. Une lecture directe du fichier par l'outil de lecture n'est pas une commande — elle ne traverse jamais ce garde. Protéger une ressource contre tous les chemins d'accès est le travail d'une règle de permission, pas d'un hook. Ce script confond garder un appel et garder un fichier, et il ne fait correctement ni l'un ni l'autre.",
  },
};
