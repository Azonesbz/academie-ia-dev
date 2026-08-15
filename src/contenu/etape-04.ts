import type { Lecon } from "./types";

export const etape04: Lecon = {
  slug: "la-regle-qui-refuse",
  chapeau:
    "La méthode que cette académie enseigne fait 1 633 lignes. 102 refusent quelque chose. Sur 46 règles, 3 bloquent. Cette étape porte sur l'écart.",
  blocs: [
    {
      type: "para",
      texte:
        "Une règle qu'on écrit et une règle qui refuse ne sont pas le même objet. La première, ton agent la lira et l'oubliera au troisième tour — non par mauvaise volonté, mais parce qu'elle est noyée dans un contexte qui grandit. La seconde l'arrête, sans discussion et sans rappel.",
    },
    { type: "titre", texte: "À quoi ressemble un refus" },
    {
      type: "code",
      langage: "json",
      texte: `{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "deny",
    "permissionDecisionReason": "Blocked by flow rules: stage only this task's files with git add <path>, never git add -A."
  }
}`,
    },
    {
      type: "para",
      texte:
        "L'appel n'a pas lieu. L'agent lit la raison et corrige de lui-même. Il n'y a ni négociation, ni rappel à l'ordre, ni « pense bien à » : le geste est simplement impossible.",
    },
    { type: "titre", texte: "Le mur a des portes" },
    {
      type: "para",
      texte:
        "Le garde qui produit ce refus tient en une expression régulière. Elle cherche « git add » suivi de -A, --all ou un point. Voici ce qu'elle attrape, et ce qu'elle laisse passer :",
    },
    {
      type: "code",
      langage: "text",
      texte: `git add -A                 → REFUSÉ
git add --all              → REFUSÉ
git add .                  → REFUSÉ
git commit -am "wip"       → passe
git add -u                 → passe
git stage -A               → passe`,
    },
    {
      type: "para",
      texte:
        "Les trois derniers ne sont pas voulus. « git commit -am » stage et committe l'arbre suivi d'un seul geste — exactement ce que la règle interdit. Le motif cherche « git add » : il ne peut structurellement pas voir un « commit -a ».",
    },
    {
      type: "encadre",
      titre: "La vraie leçon",
      texte:
        "Ce garde a tourné des mois en donnant l'illusion que la règle tenait, parce qu'un garde qui refuse trois fois par semaine ressemble à un garde qui marche. Un garde ne protège que ce que son auteur a pensé à écrire, et il ne te dit jamais ce qu'il a laissé passer.",
    },
    { type: "titre", texte: "Le geste : choisir, pas coder" },
    {
      type: "para",
      texte:
        "Écrire vingt lignes de script n'a jamais été la difficulté — et tu as tout intérêt à les faire écrire par ton agent, c'est même le comportement qu'on cherche à t'apprendre. La difficulté est de décider quelle règle mérite d'être promue.",
    },
    {
      type: "liste",
      items: [
        "Commence par ce que ta configuration sait déjà refuser nativement : une règle de permission bien écrite bat un script artisanal, et elle ne se périme pas.",
        "Ne descends au script que lorsque la règle native ne suffit pas à exprimer la condition.",
        "Choisis la règle dont l'infraction coûte le plus cher, pas celle qui est la plus facile à écrire. Ce sont rarement les mêmes.",
        "Une règle promue doit être la tienne. Une règle héritée d'un cours que tu n'as pas discutée redeviendra un vœu.",
      ],
    },
    {
      type: "para",
      texte:
        "Dans la méthode d'origine, une ligne est classée « règle absolue » : jamais de commit si un test échoue. Rien ne l'exécute. Elle est restée un vœu pendant des mois, avec trois gardes fonctionnels et leurs tests disponibles comme patron. Ce n'est pas un manque de temps : c'est que personne n'avait tranché qu'elle méritait de refuser.",
    },
  ],
  exercice:
    "Parmi tout ce que tu t'es promis de faire proprement sur ton dépôt, choisis-en une seule qui mérite de te refuser réellement — et écris pourquoi les autres peuvent rester des vœux. Puis fais-la exister : règle native si elle suffit, script sinon, avec son test. La justification écrite compte autant que le garde.",
  casTruque: {
    titre: "Un garde qui n'a jamais rien refusé",
    mise_en_scene:
      "Un développeur est fier de celui-ci : il l'a écrit, testé, documenté, et il tourne depuis six mois sans le moindre incident.",
    langage: "bash",
    artefact: `# Refuse les commandes destructrices.
readonly DESTRUCTEUR='rm[[:space:]]+-rf[[:space:]]+/($|[[:space:]])|mkfs|dd[[:space:]]+if=.*of=/dev/'

if printf '%s' "\${commande}" | grep -Eq "\${DESTRUCTEUR}"; then
  refuser "Commande destructrice bloquée."
fi

# Six mois en production. Zéro refus émis.`,
    question:
      "Le garde est correct : son motif fait ce qu'il annonce. Pourquoi ne protège-t-il pourtant de rien, et que faudrait-il regarder pour choisir la bonne règle ?",
    revelation:
      "« Zéro refus en six mois » n'est pas une réussite, c'est le diagnostic. Ce garde interdit un geste que son auteur ne fait pas : personne ne tape `rm -rf /` par mégarde, et un agent ne le propose pas non plus. Il a été choisi parce qu'il était facile à écrire et impressionnant à montrer, pas parce que son infraction coûtait cher. Pendant ce temps, ce qui casse réellement des dépôts — un commit poussé avec des tests rouges, une clé privée entrée dans l'index, l'écrasement d'un travail non poussé — passe tous les jours sans rencontrer personne. La bonne question n'est jamais « qu'est-ce que je sais bloquer ? » mais « qu'est-ce qui m'a déjà coûté une soirée ? ». Un garde utile refuse quelque chose de temps en temps, et t'agace parfois. Un garde qui ne refuse jamais rien ne se distingue pas d'un garde absent — et c'est exactement ce qu'on ne peut pas voir de l'intérieur.",
  },
};
