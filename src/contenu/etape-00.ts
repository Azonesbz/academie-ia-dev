import type { Lecon } from "./types";

export const etape00: Lecon = {
  slug: "verifier-ce-qui-tourne",
  chapeau:
    "Tout ce qui suit suppose que ta configuration s'exécute. Cette étape existe parce que cette supposition a été fausse pendant un mois chez l'auteur de la méthode, sans qu'aucun signal ne le dise.",
  blocs: [
    {
      type: "para",
      texte:
        "Un dispositif peut être déclaré actif et ne pas être chargé. Ce n'est pas une hypothèse : c'est un cas vécu, daté et mesuré. Un plugin inscrit dans la configuration, sa charge utile disparue du disque, et un mois entier de sessions sans qu'une seule règle ne s'applique.",
    },
    {
      type: "para",
      texte:
        "Le chiffre qui l'a révélé : sur les transcriptions de sessions, une seule sur 976 mentionnait le plugin avant la découverte du trou. Après réparation, 51 sur 81. L'écart est si net qu'il ne laisse aucune place au doute — et personne ne l'avait vu, parce que rien ne le signalait.",
    },
    {
      type: "encadre",
      titre: "Le pire détail",
      texte:
        "L'outil de diagnostic officiel répondait « aucun problème d'installation détecté ». Il ne mentait pas : il vérifiait ce qu'il vérifie, et le chargement effectif n'en fait pas partie. Un contrôle qui répond « tout va bien » ne parle que de son propre périmètre.",
    },
    { type: "titre", texte: "Le geste" },
    {
      type: "para",
      texte:
        "Ne demande pas à ta configuration ce qu'elle déclare. Demande à tes traces ce qui s'est réellement produit. La déclaration est une intention ; l'exécution laisse des marques.",
    },
    {
      type: "liste",
      items: [
        "Une règle chargée se voit : elle est citée, appliquée, ou elle refuse quelque chose.",
        "Une règle déclarée mais absente ne laisse aucune trace — et l'absence de trace ressemble exactement à « je n'en ai pas eu besoin ».",
        "C'est cette confusion qui rend la panne invisible : tu ne peux pas distinguer « inutilisée » de « inexistante » sans aller regarder.",
      ],
    },
    { type: "titre", texte: "Pourquoi commencer par là" },
    {
      type: "para",
      texte:
        "Les quatre étapes suivantes t'apprennent à faire porter tes règles par des dispositifs plutôt que par ta vigilance. Si le dispositif ne se charge pas, tu apprendras la leçon inverse de celle qu'on vise : que ces mécanismes ne servent à rien. Or ils servaient — ils n'étaient simplement pas là.",
    },
  ],
  exercice:
    "Cherche dans l'historique de tes propres sessions une preuve d'exécution de ce que ta configuration déclare : une règle citée, un refus, un comportement qui ne s'expliquerait pas autrement. Si tu n'en trouves aucune, tu viens de découvrir la même panne. Note ce que tu as cherché et ce que tu as trouvé.",
  casTruque: {
    titre: "Un rapport qui ne ment pas, et qui ne dit rien",
    mise_en_scene:
      "Un développeur s'inquiète : ses règles ne semblent plus s'appliquer. Il lance le diagnostic de son outil et obtient ceci. Il en conclut que tout va bien et cherche ailleurs.",
    langage: "text",
    artefact: `Diagnostic de l'installation

  ✓ Version à jour (2.1.233)
  ✓ Configuration lisible, syntaxe valide
  ✓ 1 extension déclarée : methodo-equipe
  ✓ Source de l'extension joignable
  ✓ Aucun conflit de configuration détecté

Aucun problème d'installation détecté.`,
    question:
      "Ce rapport est exact — aucune de ces cinq lignes n'est fausse. Qu'est-ce qu'il ne dit pas, et pourquoi le développeur va chercher au mauvais endroit ?",
    revelation:
      "Les cinq coches portent sur la DÉCLARATION : le fichier est lisible, l'extension y est inscrite, sa source répond. Aucune ne porte sur le CHARGEMENT — aucune ne dit qu'une seule règle est arrivée dans une seule session. Un contrôle ne parle que de son propre périmètre, et « aucun problème détecté » signifie « aucun problème parmi ceux que je regarde ». L'observation qui manque est de l'autre côté : dans les traces d'exécution, pas dans la configuration. Une règle chargée laisse une marque — elle est citée, elle refuse, elle change un comportement. Le piège est que l'absence de marque ressemble exactement à « je n'en ai pas eu besoin », et c'est cette ambiguïté qui rend la panne invisible. C'est ce rapport-là, mot pour mot, qui a laissé un plugin déclaré et absent tourner dans le vide pendant un mois.",
  },
};
