const NIVEAUX = [
  {
    niveau: "Global",
    ou: "ton workflow, celui que tu emportes d'un projet à l'autre",
    exemple:
      "Comment tu découpes, ce que tu exiges avant un commit, ce que tu refuses de laisser passer.",
  },
  {
    niveau: "Projet",
    ou: "ce dépôt-ci, sa pile technique, ses conventions",
    exemple:
      "Les commandes de build, les frontières entre modules, ce qui est propre à ce produit et à personne d'autre.",
  },
];

/**
 * L'argument de la landing : les recettes périment, la base non — d'où un
 * écosystème de règles qu'on fait évoluer plutôt qu'un savoir qu'on accumule.
 */
export function SectionSocle() {
  return (
    <section className="border-t border-line/60 py-16 sm:py-20 lg:py-24">
      <p className="surtitre">Pourquoi ces cinq étapes-là</p>
      <h2 className="mt-6 max-w-3xl text-2xl font-medium leading-tight tracking-tight text-ink sm:text-3xl">
        L&apos;outil a été livré 79 fois en 90 jours. Apprendre des recettes,
        c&apos;est courir après quelque chose qui va plus vite que toi.
      </h2>
      <p className="mt-6 max-w-2xl leading-relaxed text-muted">
        Environ vingt-six versions par mois. Une astuce apprise en août est
        périmée en novembre, et la moitié de ce que tu trouveras en vidéo décrit
        déjà un outil qui n&apos;existe plus. C&apos;est pour ça que le contenu
        de cette académie ne cite aucune commande, aucun nom de fichier, aucune
        option de configuration.
      </p>

      <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
        <article className="card p-6">
          <p className="surtitre">La veille, autrement</p>
          <h3 className="mt-4 text-xl font-medium leading-tight text-ink">
            Tout suivre est impossible. Trier ne l&apos;est pas.
          </h3>
          <p className="mt-4 leading-relaxed text-muted">
            Rester en alerte ne veut pas dire tout lire. Ça veut dire savoir
            reconnaître, dans une nouveauté, ce qui touche ta façon de
            travailler — et ce qui n&apos;est que du bruit. Ce tri demande une
            base : sans elle, chaque annonce a l&apos;air également importante,
            et tu passes tes soirées à courir.
          </p>
          <p className="mt-4 leading-relaxed text-muted">
            C&apos;est la base qui rend la veille tenable, pas l&apos;inverse.
          </p>
        </article>

        <article className="card p-6">
          <p className="surtitre">Ce qui ne bouge pas</p>
          <h3 className="mt-4 text-xl font-medium leading-tight text-ink">
            Le découpage, la preuve avant le code, le commit qui s&apos;annule
            seul.
          </h3>
          <p className="mt-4 leading-relaxed text-muted">
            Ces gestes-là n&apos;ont pas changé d&apos;une version à l&apos;autre,
            et ne changeront pas : ils ne dépendent d&apos;aucune interface. Ce
            sont eux qui te permettent de juger un outil neuf en dix minutes au
            lieu de l&apos;adopter par défaut.
          </p>
          <p className="mt-4 leading-relaxed text-muted">
            Les cinq étapes ne portent que sur ça. C&apos;est un choix, et il
            coûte : tu n&apos;apprendras ici aucune astuce impressionnante.
          </p>
        </article>
      </div>

      <div className="mt-12 lg:mt-16">
        <h3 className="max-w-2xl text-xl font-medium leading-tight text-ink">
          Une base ne vit pas dans ta tête. Elle vit dans un écosystème de règles
          que tu fais évoluer.
        </h3>
        <p className="mt-5 max-w-2xl leading-relaxed text-muted">
          Une règle que tu gardes en mémoire se dégrade avec ton attention, et
          disparaît le jour où tu es fatigué — c&apos;est-à-dire le jour où elle
          servait. Écrite, elle tient. Exécutée par un dispositif qui refuse,
          elle tient même quand tu ne regardes pas. À deux niveaux :
        </p>

        <ul className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-2">
          {NIVEAUX.map((n) => (
            <li key={n.niveau} className="bg-surface p-6">
              <p className="surtitre">{n.niveau}</p>
              <p className="mt-3 leading-relaxed text-ink-soft">{n.ou}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {n.exemple}
              </p>
            </li>
          ))}
        </ul>

        <p className="mt-6 max-w-2xl leading-relaxed text-muted">
          Le niveau projet étend le niveau global et prime sur lui : priorité au
          plus spécifique. Et l&apos;ensemble <strong className="text-ink-soft">évolue</strong> —
          une règle se promeut de simple consigne à garde qui refuse, se
          rétrograde quand elle gêne plus qu&apos;elle ne protège, et se supprime
          purement et simplement le jour où l&apos;outil la fournit lui-même.
          C&apos;est déjà arrivé pendant l&apos;écriture de cette académie : une
          étape entière a disparu du programme parce que l&apos;éditeur avait
          livré la fonctionnalité entre-temps.
        </p>
      </div>
    </section>
  );
}
