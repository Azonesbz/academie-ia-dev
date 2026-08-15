import type { Lecon } from "./types";

export const base04: Lecon = {
  slug: "le-plugin-qui-sactive-sans-rien-charger",
  chapeau:
    "Les pannes les plus coûteuses de l'écosystème ne produisent aucune erreur. Le plugin s'installe, s'active, n'affiche rien — et ne charge rien.",
  blocs: [
    {
      type: "para",
      texte:
        "Un plugin est un colis : un manifeste qui le nomme, et des composants — compétences, sous-agents, commandes, hooks — rangés selon une convention. Par défaut, le manifeste ne liste pas le contenu : il identifie le paquet. Le contenu est découvert par son emplacement.",
    },
    {
      type: "encadre",
      titre: "Pourquoi c'est silencieux",
      texte:
        "Un composant rangé au mauvais endroit n'est pas une erreur : c'est un fichier que personne ne cherche là. Rien à signaler, donc rien de signalé. C'est la différence entre « ça a échoué » et « ça n'a pas eu lieu », et seule la première produit un message.",
    },
    { type: "titre", texte: "Les quatre façons d'échouer sans un mot" },
    {
      type: "liste",
      items: [
        "Ranger les composants dans le dossier réservé au manifeste. Le manifeste est trouvé, le reste ne l'est pas.",
        "Donner au paquet un nom qui n'est pas un identifiant — espaces, majuscules. Il sert à le référencer ailleurs ; s'il ne correspond pas, la référence tombe dans le vide.",
        "Faire pointer un chemin vers un fichier là où la convention attend le répertoire qui le contient, ou l'inverse.",
        "Écrire un chemin de hook relatif au répertoire de travail. Il marchera chez toi, depuis la racine, et nulle part ailleurs.",
      ],
    },
    { type: "titre", texte: "L'observation qui tranche" },
    {
      type: "para",
      texte:
        "Ne demande pas à ta configuration ce qu'elle déclare : c'est l'étape 00 de la méthode, et elle s'applique ici mot pour mot. Vérifie que le composant apparaît dans la liste de ce qui est effectivement chargé pour ta session, puis provoque son déclenchement et regarde s'il répond. Un plugin listé comme actif n'est pas un plugin qui fonctionne.",
    },
  ],
  exercice:
    "Prends un plugin que tu utilises — le tien ou celui d'un autre. Pour chacun de ses composants annoncés, va vérifier qu'il est réellement chargé chez toi. Note ceux que tu croyais installés et qui ne répondent pas.",
  casTruque: {
    titre: "Un plugin valide, installé, actif, et vide",
    mise_en_scene:
      "Le manifeste est du JSON valide, le plugin s'installe sans broncher et apparaît comme actif. Personne ne voit passer le moindre avertissement. Pourtant aucune de ses règles ne s'applique jamais.",
    langage: "text",
    artefact: `mon-plugin/
└── .claude-plugin/
    ├── plugin.json
    ├── skills/
    │   └── revue/SKILL.md
    └── agents/
        └── verificateur.md

plugin.json :
{
  "name": "Mon Plugin",
  "skills": "./skills/revue/SKILL.md",
  "hooks": { "command": "./hooks/garde.sh" }
}`,
    question:
      "Quatre défauts, aucun message d'erreur. Trouves-en au moins deux, et dis pour chacun pourquoi il ne produit aucun bruit.",
    revelation:
      "Un : les composants sont rangés à l'intérieur du dossier réservé au manifeste. C'est le dossier d'identité du colis, pas son contenu ; les compétences et sous-agents sont attendus à côté, pas dedans. Personne ne va les chercher là, donc personne ne se plaint. Deux : le nom contient une espace et des majuscules alors qu'il sert d'identifiant pour référencer le plugin ailleurs — la référence ne correspondra à rien, et une référence qui ne correspond à rien ne lève pas d'erreur, elle ne trouve rien. Trois : le chemin des compétences pointe un fichier là où la convention attend le répertoire qui le contient. Quatre : le chemin du hook est relatif au répertoire de travail de la session, pas à la racine du plugin — il fonctionnera chez toi tant que tu lances depuis la racine, et échouera silencieusement partout ailleurs, y compris chez toi le jour où tu démarres depuis un sous-dossier. Aucun de ces quatre n'est une erreur : ce sont quatre choses qui n'ont pas lieu.",
  },
};
