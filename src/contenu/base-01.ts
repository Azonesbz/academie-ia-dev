import type { Lecon } from "./types";

export const base01: Lecon = {
  slug: "qui-peut-invoquer",
  chapeau:
    "Tout le monde a appris la même règle : commande égale action, skill égale savoir. Elle ne se joue plus au dossier. Ce qui décide, c'est qui a le droit d'invoquer — et ce choix se paie en contexte permanent.",
  blocs: [
    {
      type: "para",
      texte:
        "La distinction que la plupart des gens croient connaître n'existe plus au niveau du fichier : un fichier de commande et une compétence produisent le même déclencheur et se comportent de la même façon. Tu peux le vérifier sur ton propre disque — un fichier rangé dans le dossier des commandes apparaît dans la liste des compétences de ta session.",
    },
    { type: "titre", texte: "Le vrai axe : qui invoque" },
    {
      type: "liste",
      items: [
        "Par défaut, toi et le modèle. La description reste en permanence dans le contexte ; le corps ne se charge qu'à l'invocation.",
        "Réservée à toi seul : la description sort du contexte, et le modèle ne sait même plus que la compétence existe. À garder pour ce qui a un effet de bord — déployer, envoyer, publier.",
        "Réservée au modèle seul : pour du savoir de fond qui n'est pas une action, et qu'on ne veut pas voir traîner dans une liste de commandes.",
      ],
    },
    {
      type: "encadre",
      titre: "La description est un texte de routage",
      texte:
        "Elle est payée en permanence, à chaque tour, pour tout ce que le modèle peut invoquer. Le corps, lui, n'est payé qu'à l'usage. Donc on écrit la description pour le routeur, pas pour un collègue qui lirait la liste : des situations déclenchantes, avec les mots que quelqu'un prononcerait vraiment.",
    },
    { type: "titre", texte: "Ce que ça donne quand c'est bien fait" },
    {
      type: "para",
      texte:
        "Dans un plugin réel, le déclencheur et la doctrine sont deux fichiers distincts qui travaillent en paire. Le premier porte l'entrée côté humain et dit « charge la doctrine maintenant ». Le second porte la doctrine, avec une description qui énumère les situations : « à charger dès qu'il s'agit de rédiger un message de commit, découper des tâches, choisir une branche ou ouvrir une pull request ». Un déclencheur, une doctrine.",
    },
    {
      type: "para",
      texte:
        "Compare avec une description du genre « nos règles internes de qualité ». Personne ne prononce jamais cette phrase. Rien ne matchera jamais, et l'équipe conclura que l'outil ignore ses règles.",
    },
  ],
  exercice:
    "Prends une compétence que tu as écrite et qui ne se déclenche jamais. Réécris sa description en y mettant les situations où elle devrait s'appliquer, avec les mots que tu emploies réellement quand le cas se présente. Puis vérifie qu'elle se charge au bon moment.",
  casTruque: {
    titre: "La compétence que le modèle ne verra jamais",
    mise_en_scene:
      "Une équipe trouve que ses règles de qualité ne sont pas appliquées. Elle en fait une compétence dédiée. Le fichier est valide, il se charge, le déclencheur manuel fonctionne, et la compétence apparaît bien dans la liste.",
    langage: "yaml",
    artefact: `---
name: qualite
description: Nos règles internes de qualité.
disable-model-invocation: true
---

Appliquer les standards de l'équipe sur tout le code produit :
nommage, taille des fonctions, gestion des erreurs, tests.`,
    question:
      "Le fichier est correct et il se charge. Pourquoi les règles ne seront-elles pourtant jamais appliquées spontanément — et lequel des deux défauts est le plus grave ?",
    revelation:
      "Deux défauts, et le second est mortel. Le premier : la description ne contient aucune situation déclenchante — pas un verbe, pas un contexte, pas un mot que quelqu'un prononcerait. Même invocable, elle ne matcherait rien. Le second, bien plus grave : le drapeau qui la réserve à l'humain sort sa description du contexte. Le modèle ne sait pas seulement qu'il ne peut pas l'invoquer — il ignore qu'elle existe. L'équipe a coupé le fil elle-même, puis conclu que l'outil n'écoutait pas. Et ce drapeau n'avait rien à faire là : il sert à empêcher le modèle de décider tout seul de déployer ou d'envoyer, c'est-à-dire à protéger d'un effet de bord. Appliquer des règles de qualité n'en est pas un. Si une compétence se déclenchait trop souvent, le remède est une description plus précise — jamais la mise sous cloche.",
  },
};
