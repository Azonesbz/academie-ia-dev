import type { Etape } from "./etapes";

/** « La base » — le vocabulaire de l'écosystème, et ce qui distingue ses objets. */
export const ETAPES_BASE: readonly Etape[] = [
  {
    parcours: "base",
    rang: 0,
    slug: "la-boucle-et-le-contexte",
    titre: "L'agent, c'est la boucle — et le contexte est un budget",
    jeSais:
      "Je sais dire ce que l'agent a réellement sous les yeux à un tour donné, donc pourquoi une règle écrite quelque part n'agit pas, et pourquoi tout ce qui est chargé se paie à chaque tour.",
    confusion:
      "Croire qu'un fichier de règles agit parce qu'il est dans le dépôt. Il n'agit que s'il est chargé par quelque chose — et ce qui est chargé n'est pas rangé une fois pour toutes : il est relu à chaque tour.",
    duree: "20 minutes",
    criteresJalon1: [
      "J'ai écrit mon diagnostic du cas truqué avant d'ouvrir la révélation, et j'avais nommé le vrai coût : un index qui devient le contenu est relu à chaque tour, et il annule le découpage qui le justifiait.",
      "Je peux dire, pour ma propre configuration, ce qui entre dans le contexte au démarrage d'une session et ce qui n'y entre qu'à la demande.",
      "Je sais distinguer un problème de modèle d'un problème de contexte, et dire à quoi je fais la différence.",
    ],
    critereJalon2:
      "Je l'ai refait un autre jour, sur une configuration que je n'avais pas écrite moi-même, sans rouvrir cette page.",
    signeDeNonMaitrise:
      "Quand une règle n'est pas suivie, ton premier réflexe est de la réécrire plus fermement, plutôt que de vérifier si elle était dans le contexte.",
  },
  {
    parcours: "base",
    rang: 1,
    slug: "qui-peut-invoquer",
    titre: "Une règle que le modèle ne voit pas n'existe pas",
    jeSais:
      "Je sais dire, pour chaque compétence que j'écris, qui peut la déclencher — moi, le modèle, ou les deux — et ce que ce choix coûte en contexte permanent.",
    confusion:
      "Croire que la distinction se joue au dossier : commande égale action, skill égale savoir. Elle ne s'y joue plus. Ce qui décide, c'est qui a le droit d'invoquer.",
    duree: "25 minutes",
    criteresJalon1: [
      "J'ai écrit mon diagnostic du cas truqué avant d'ouvrir la révélation, et j'avais vu que la compétence était rendue invisible au modèle par son propre frontmatter.",
      "Je sais dire lequel de mes fichiers est payé en permanence dans le contexte et lequel n'est payé qu'à l'invocation.",
      "J'ai réécrit au moins une description en y mettant des situations déclenchantes, et je peux dire laquelle et pourquoi l'ancienne ne matchait jamais.",
    ],
    critereJalon2:
      "Je l'ai refait un autre jour, sur une compétence que quelqu'un d'autre avait écrite, sans rouvrir cette page.",
    signeDeNonMaitrise:
      "Tes descriptions sont écrites pour un collègue qui lirait la liste, pas pour un routeur qui doit décider s'il charge.",
  },
  {
    parcours: "base",
    rang: 2,
    slug: "le-sous-agent-demarre-nu",
    titre: "Le sous-agent démarre nu",
    jeSais:
      "Je sais ce qu'un sous-agent ne reçoit pas, et donc ce qui doit voyager dans son frontmatter ou dans le message de délégation pour qu'il l'ait vraiment.",
    confusion:
      "Lui écrire en prose des rappels et des interdictions — « reprends la skill chargée plus tôt », « tu ne modifies aucun fichier » — et croire que ça l'engage. Le corps décrit, le frontmatter décide.",
    duree: "25 minutes",
    criteresJalon1: [
      "J'ai écrit mon diagnostic du cas truqué avant d'ouvrir la révélation, et j'avais nommé l'écart entre ce que le corps interdit et ce que le frontmatter autorise.",
      "Je peux lister ce qu'un sous-agent reçoit au démarrage, et ce qu'il ne reçoit pas.",
      "Je sais dire pourquoi déléguer coûte cher, et nommer un cas où il vaut mieux ne pas déléguer.",
    ],
    critereJalon2:
      "Je l'ai refait un autre jour, sur un sous-agent que je n'avais pas écrit, sans rouvrir cette page.",
    signeDeNonMaitrise:
      "Tu écris tes contraintes à un sous-agent comme tu les dirais à un humain — en confiance, en prose, dans le corps.",
  },
  {
    parcours: "base",
    rang: 3,
    slug: "le-garde-qui-na-jamais-rien-refuse",
    titre: "Le garde qui n'a jamais rien refusé",
    jeSais:
      "Je sais quand une règle doit être une permission déclarative, quand elle doit être du code exécuté, et comment prouver qu'elle refuse au lieu d'espérer qu'elle refuse.",
    confusion:
      "Croire qu'un hook garde une ressource, alors qu'il garde un appel d'outil. Et croire qu'écrire un message d'erreur suffit à bloquer — le message part, la commande passe.",
    duree: "30 minutes",
    criteresJalon1: [
      "J'ai écrit mon diagnostic du cas truqué avant d'ouvrir la révélation, et j'avais vu que le garde parlait sans bloquer.",
      "J'ai fait la preuve, sur mon propre poste, qu'un de mes gardes refuse réellement : j'ai tenté le geste interdit et j'ai vu le refus.",
      "Je sais nommer un cas où une règle de permission est le bon outil, et un cas où seul du code exécuté peut trancher.",
    ],
    critereJalon2:
      "Un autre jour, j'ai trouvé une porte dans un de mes propres gardes — un geste équivalent qu'il laisse passer — et je peux la nommer.",
    signeDeNonMaitrise:
      "Tu n'as jamais tenté le geste que ton garde interdit : tu as lu le script et tu l'as cru.",
  },
  {
    parcours: "base",
    rang: 4,
    slug: "le-plugin-qui-sactive-sans-rien-charger",
    titre: "Le plugin qui s'active sans rien charger",
    jeSais:
      "Je sais pourquoi un plugin peut s'activer, n'afficher aucune erreur, et ne rien charger du tout — et par quelle observation je le prouve avant qu'une règle ne manque à l'appel.",
    confusion:
      "Traiter le manifeste comme une déclaration de contenu, alors qu'il nomme le colis. Les pièges les plus coûteux ne produisent aucune erreur : rien ne casse, rien ne s'affiche, la règle n'est simplement pas là.",
    duree: "25 minutes",
    criteresJalon1: [
      "J'ai écrit mon diagnostic du cas truqué avant d'ouvrir la révélation, et j'avais trouvé au moins deux des quatre défauts silencieux.",
      "J'ai vérifié sur ma propre machine qu'un composant que je crois installé est réellement chargé, et je peux dire par quelle observation.",
      "Je sais nommer trois façons dont un plugin échoue sans rien dire.",
    ],
    critereJalon2:
      "Je l'ai refait un autre jour, sur un plugin publié par quelqu'un d'autre, sans rouvrir cette page.",
    signeDeNonMaitrise:
      "Tu considères qu'un plugin listé comme actif est un plugin qui fonctionne.",
  },
] as const;
