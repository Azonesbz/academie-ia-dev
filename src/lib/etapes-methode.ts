import type { Etape } from "./etapes";

/** « La méthode » — les gestes qui ne dépendent d'aucune version d'outil. */
export const ETAPES_METHODE: readonly Etape[] = [
  {
    parcours: "methode",
    rang: 0,
    slug: "verifier-ce-qui-tourne",
    titre: "Vérifier que ce qui est déclaré est ce qui tourne",
    jeSais:
      "Je sais dire si un dispositif que ma configuration déclare s'est réellement exécuté, au lieu de croire une déclaration ou un diagnostic vert.",
    confusion:
      "Croire un rapport vert. Il atteste son propre périmètre, jamais le chargement effectif.",
    preuve:
      "La liste de ce qui s'exécute vraiment dans tes sessions, confrontée à ce que ta configuration prétend.",
    duree: "15 minutes",
    criteresJalon1: [
      "J'ai écrit mon diagnostic du cas truqué avant d'ouvrir la révélation, et le mien nommait déjà la même chose qu'elle : un rapport vert atteste son propre périmètre, jamais le chargement effectif.",
      "J'ai cherché dans l'historique de mes propres sessions, et je peux citer ce que j'y ai trouvé — une règle citée mot pour mot, un refus, un comportement qui ne s'expliquerait pas autrement — ou dire que je n'ai rien trouvé du tout.",
      "Je sais nommer l'observation qui sépare « chargé mais jamais sollicité » de « déclaré mais absent du disque », et dire où je suis allé la chercher chez moi.",
    ],
    critereJalon2:
      "Je l'ai refait un autre jour, sur un dispositif dont je n'avais pas écrit la configuration moi-même, sans rouvrir cette page.",
    signeDeNonMaitrise:
      "Devant un dispositif silencieux, ta première question est encore « est-ce qu'il est bien déclaré ? » au lieu de « où serait sa marque s'il tournait ? ».",
  },
  {
    parcours: "methode",
    rang: 1,
    slug: "decouper-une-demande",
    titre: "Découper une demande en tâches qu'un agent exécute sans déraper",
    jeSais:
      "Je sais reconnaître la tranche trop grosse avant de la lancer, à ce que je n'arrive pas à écrire sa preuve.",
    confusion:
      "Juger le résultat après coup, en le lisant, faute d'avoir écrit la preuve avant de lancer.",
    preuve:
      "Une demande réelle de ton projet, découpée, avec pour chaque tranche son objectif unique et sa preuve.",
    duree: "45 minutes",
    criteresJalon1: [
      "J'ai écrit mon diagnostic du découpage truqué avant d'ouvrir la révélation, et j'avais désigné la même tranche pour la même raison : sa preuve est une phrase, pas une observation.",
      "J'ai découpé une demande réelle de mon projet, et pour chaque tranche j'ai écrit son intention unique, sa preuve et ses fichiers avant de lancer quoi que ce soit.",
      "J'ai scindé au moins une tranche parce qu'elle dépassait trois fichiers métier, et je peux dire laquelle.",
    ],
    critereJalon2:
      "Je l'ai refait un autre jour, sur une autre demande, sans rouvrir cette page.",
    signeDeNonMaitrise:
      "Ta dernière demande lancée, tu n'avais pas écrit sa preuve avant : tu as jugé le résultat après coup, en le lisant.",
  },
  {
    parcours: "methode",
    rang: 2,
    slug: "le-test-qui-echoue-dabord",
    titre: "Le test qui échoue d'abord",
    jeSais:
      "Je sais faire produire la preuve avant le code, et dire ce qu'un test vert ne prouve pas.",
    confusion:
      "Croire un test qui passe au vert du premier coup, sans jamais l'avoir vu échouer.",
    preuve:
      "Un test rouge, puis vert, sur un comportement de ton propre projet — en Arrange, Act, Assert.",
    duree: "1 heure",
    criteresJalon1: [
      "J'ai écrit mon diagnostic du test truqué avant d'ouvrir la révélation, et j'avais nommé l'épreuve exacte : si je supprime le corps de la fonction testée, il reste vert.",
      "Sur un comportement réel de mon projet, j'ai écrit le test d'abord, je l'ai vu rouge, et j'ai lu la raison de l'échec — je peux dire si c'était celle que j'attendais.",
      "Mon test est en Arrange, Act, Assert avec les trois commentaires visibles dans le source, et il assertionne sur ce qui est stable, pas sur un message.",
    ],
    critereJalon2:
      "Je l'ai refait un autre jour, sur un comportement qui dépend d'une date, d'un aléa ou du réseau, sans rouvrir cette page.",
    signeDeNonMaitrise:
      "La dernière fois qu'un test est passé au vert du premier coup, tu l'as cru — tu ne l'as pas cassé exprès pour voir s'il savait échouer.",
  },
  {
    parcours: "methode",
    rang: 3,
    slug: "le-plan-rempli",
    titre: "Le plan rempli",
    jeSais:
      "Je sais écrire le plan qu'un agent peut suivre seul, et repérer la tâche à scinder à son message de commit.",
    confusion:
      "Donner une consigne d'une phrase et croire que c'est un plan. L'agent l'interprète, et à la reprise il faut tout reconstruire.",
    preuve: "Un plan complet sur une tâche réelle, ses sept champs renseignés.",
    duree: "30 minutes",
    criteresJalon1: [
      "J'ai écrit mon diagnostic du plan truqué avant d'ouvrir la révélation, et j'avais désigné la même tâche pour la même raison : son message de commit annonce deux intentions.",
      "Je peux citer les sept champs sans rouvrir cette page, et je les ai remplis tous les sept sur une tâche réelle de mon projet.",
      "J'ai scindé au moins une tâche parce que je n'arrivais pas à écrire son message de commit d'avance, et je peux dire laquelle.",
    ],
    critereJalon2:
      "Je l'ai refait un autre jour, sur une autre tâche, sans rouvrir cette page.",
    signeDeNonMaitrise:
      "Ton dernier plan tenait dans une consigne d'une phrase que l'agent a interprétée — et à la reprise, tu as dû reconstruire ce que tu voulais.",
  },
  {
    parcours: "methode",
    rang: 4,
    slug: "la-regle-qui-refuse",
    titre: "La règle qui refuse",
    jeSais:
      "Je sais choisir la règle qui mérite de me refuser réellement, et dire ce qu'elle laisse passer.",
    confusion:
      "Choisir la règle facile à écrire plutôt que celle dont l'infraction coûte cher.",
    preuve:
      "Un garde qui bloque, son test, et surtout : la justification écrite du choix de cette règle plutôt que d'une autre.",
    duree: "1 heure",
    criteresJalon1: [
      "J'ai écrit mon diagnostic de la règle truquée avant d'ouvrir la révélation, et j'avais nommé la même chose qu'elle : ce garde n'a jamais rien refusé à son auteur, il interdit un geste qu'il ne fait pas.",
      "Ma règle existe et elle tourne : règle native si elle suffisait, script avec son test sinon.",
      "J'ai écrit noir sur blanc ce que ma règle laisse passer, et pourquoi les autres promesses que je m'étais faites restent des vœux.",
    ],
    critereJalon2:
      "Elle m'a refusé quelque chose un autre jour, à moi, en dehors d'un cas de test fabriqué — je peux dire quand, et je ne l'ai pas désactivée pour continuer.",
    signeDeNonMaitrise:
      "Ta règle n'a encore refusé que ce que tu as toi-même tapé pour la tester.",
  },
] as const;
