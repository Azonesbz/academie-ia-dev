import type { Lecon } from "./types";

export const etape02: Lecon = {
  slug: "le-test-qui-echoue-dabord",
  chapeau:
    "Écrire le test après le code n'est pas une version tiède du même geste : c'est un geste différent, qui ne prouve pas la même chose.",
  blocs: [
    {
      type: "para",
      texte:
        "Un test écrit après coup teste le code que tu viens d'écrire. Il en épouse la forme, il en hérite les oublis, et il passe au vert du premier coup — ce qui devrait t'inquiéter plutôt que te rassurer. Un test qui n'a jamais échoué n'a jamais démontré qu'il testait quoi que ce soit.",
    },
    {
      type: "encadre",
      titre: "Le motif Prove-It",
      texte:
        "Le rouge est la preuve. Pas une formalité du cycle : la seule observation qui établit que ton test est branché sur le comportement visé. Tant que tu ne l'as pas vu échouer pour la bonne raison, tu ne sais pas ce qu'il mesure.",
    },
    { type: "titre", texte: "Ce que ça change avec un agent" },
    {
      type: "para",
      texte:
        "C'est là que l'ordre devient décisif. Demande le code d'abord, puis les tests, et l'agent écrira des tests qui décrivent ce qu'il a produit — y compris ses erreurs, promues au rang de spécification. Demande le test d'abord, et tu lui donnes une cible qu'il n'a pas choisie.",
    },
    {
      type: "para",
      texte:
        "C'est aussi ton seul moyen de vérifier un travail que tu n'as pas écrit. Tu ne reliras pas trois cents lignes générées. Tu peux relire cinq assertions.",
    },
    { type: "titre", texte: "Arrange, Act, Assert" },
    {
      type: "para",
      texte:
        "Trois temps, et les commentaires restent visibles dans le source. Ce n'est pas de la décoration : c'est ce qui rend l'absence d'un temps évidente. Un test sans Arrange ne dit pas dans quel état il part ; un test avec deux Act teste deux choses et t'annoncera laquelle a cassé une fois sur deux.",
    },
    {
      type: "code",
      langage: "ts",
      texte: `test("refuse un mot de passe de moins de dix caractères", async () => {
  // Arrange
  const email = "nouveau@exemple.fr";
  const motDePasse = "court";

  // Act
  const resultat = await creerCompte(email, motDePasse);

  // Assert
  expect(resultat.ok).toBe(false);
  expect(resultat.erreur).toBe("mot-de-passe-trop-court");
});`,
    },
    {
      type: "para",
      texte:
        "Remarque l'assertion sur le code d'erreur, pas sur le message. Le message changera le jour où tu le reformuleras, et le test cassera sans qu'aucun comportement n'ait bougé. Assertion sur ce qui est stable, jamais sur ce qui est cosmétique.",
    },
    { type: "titre", texte: "Le cycle en entier" },
    {
      type: "liste",
      items: [
        "Rouge — écris le test, lance-le, vois-le échouer, et lis la raison de l'échec. Si elle n'est pas celle que tu attendais, le test est faux avant le code.",
        "Vert — écris le minimum qui le fait passer. Pas la version élégante : la version qui passe.",
        "Refactor — maintenant seulement, avec un filet qui te dira si tu casses quelque chose.",
      ],
    },
  ],
  exercice:
    "Sur un comportement réel de ton projet — un que tu as déjà écrit sans test —, écris le test d'abord. Casse volontairement l'implémentation pour le voir rouge, lis la raison, répare. Le test doit être en Arrange, Act, Assert, avec les trois commentaires visibles.",
  casTruque: {
    titre: "Un test vert qui ne teste rien",
    mise_en_scene:
      "Ce test est passé au vert du premier coup. Il est en Arrange, Act, Assert, ses commentaires sont visibles, il porte sur un comportement métier réel, et son nom décrit précisément ce qu'il prétend vérifier.",
    langage: "ts",
    artefact: `test("applique la remise de 20 % au-dela de 100 euros", () => {
  // Arrange
  const panier = construirePanier({ total: 150 });
  const calculateur = new Calculateur(panier);

  // Act
  const resultat = calculateur.appliquerRemise();

  // Assert
  expect(resultat).toBeDefined();
  expect(resultat.total).toBeGreaterThan(0);
  expect(calculateur.appliquerRemise).toHaveBeenCalled();
});`,
    question:
      "Ce test ne peut pas échouer. Quelle épreuve, en une phrase, le démontre — et laquelle des trois assertions est la plus trompeuse ?",
    revelation:
      "L'épreuve : supprime le corps de `appliquerRemise` et fais-lui retourner un objet quelconque. Le test reste vert. C'est le seul test qui vaille — si l'implémentation peut disparaître sans que le test bronche, il ne mesure rien. Les trois assertions échouent pour trois raisons distinctes. `toBeDefined` est vrai de presque tout. `toBeGreaterThan(0)` était déjà vrai avant la remise, donc il ne peut pas distinguer une remise appliquée d'une remise oubliée. Mais la plus trompeuse est la troisième : elle vérifie que la fonction a été appelée — or c'est le test lui-même qui vient de l'appeler, deux lignes plus haut. Elle a l'air d'être la plus technique et elle est purement circulaire. Ce qui manque n'est nulle part dans le fichier : la seule assertion utile aurait porté sur la valeur attendue, 120, et elle aurait échoué avant que le code n'existe.",
  },
};
