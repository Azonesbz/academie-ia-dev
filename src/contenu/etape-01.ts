import type { Lecon } from "./types";

export const etape01: Lecon = {
  slug: "decouper-une-demande",
  chapeau:
    "C'est le geste qui sépare le plus nettement celui qui va vite de celui qui plafonne — et c'est celui qu'on ne trouve écrit nulle part, y compris dans la méthode que cette académie enseigne.",
  blocs: [
    {
      type: "para",
      texte:
        "Une demande trop grosse ne casse pas bruyamment. Elle produit du code qui compile, qui a l'air juste, et dont tu ne peux plus dire quelle partie répond à quoi. Le coût n'arrive pas pendant, il arrive après : au moment où il faut revenir en arrière sur une moitié seulement.",
    },
    { type: "titre", texte: "Une tranche, un critère" },
    {
      type: "para",
      texte:
        "Une tranche est bonne quand tu peux nommer sa preuve avant de la lancer. Pas « ça marchera » : quelle observation, précisément, te dira que c'est fait. Si tu n'arrives pas à la nommer, ce n'est pas que tu manques de rigueur — c'est que la tranche contient plusieurs intentions et qu'aucune preuve unique ne peut les couvrir.",
    },
    {
      type: "liste",
      items: [
        "Une intention par tranche. Pas « ajouter la connexion Google et refactorer le module d'auth ».",
        "Une preuve par tranche : un test ciblé, ou une vérification manuelle que tu écris d'avance.",
        "Trois fichiers métier au maximum. Au-delà, tu ne relis plus, tu survoles.",
        "L'ordre : contrat et données d'abord, logique ensuite, présentation en dernier. L'inverse te fait redessiner deux fois.",
      ],
    },
    { type: "titre", texte: "Un découpage travaillé" },
    {
      type: "para",
      texte:
        "Demande de départ : « ajoute la connexion par Google ». C'est une phrase, et c'est au moins quatre intentions.",
    },
    {
      type: "code",
      langage: "text",
      texte: `1. Contrat — la table et le type
   preuve : la migration tourne deux fois de suite sans erreur
   fichiers : db.ts, types.ts

2. Logique — échanger le code OAuth contre un profil
   preuve : un test qui, sur une réponse simulée, produit un utilisateur
   fichiers : auth-google.ts, auth-google.test.ts

3. Logique — rattacher ce profil à un compte existant ou en créer un
   preuve : un test pour chacun des deux cas, plus le cas de l'e-mail déjà pris
   fichiers : auth.ts, auth.test.ts

4. Présentation — le bouton et le retour d'erreur
   preuve : cliquer, revenir connecté ; couper le réseau, voir un message
   fichiers : AuthForm.tsx`,
    },
    {
      type: "encadre",
      titre: "Le signe que tu t'y prends mal",
      texte:
        "Si la tranche 3 avait été fondue dans la 2, la preuve serait devenue « la connexion Google marche ». C'est une phrase, pas une preuve : elle ne dit pas ce qui se passe quand l'adresse existe déjà sous un autre compte — et c'est précisément là que ça casse.",
    },
    { type: "titre", texte: "Ce que ça change avec un agent" },
    {
      type: "para",
      texte:
        "Un agent exécute une tranche mal découpée avec le même enthousiasme qu'une bonne. Il ne te dira pas qu'elle est trop grosse : il produira les quatre intentions d'un coup, dans un seul jet, et tu te retrouveras à relire cent lignes que tu n'as pas pensées. Le découpage est le seul endroit où ton jugement n'est pas remplaçable.",
    },
  ],
  exercice:
    "Prends une demande réelle de ton projet — une que tu allais lancer d'un bloc. Découpe-la selon les quatre critères ci-dessus, en écrivant pour chaque tranche son intention unique, sa preuve, et ses fichiers. Si une tranche dépasse trois fichiers métier, scinde-la encore.",
};
