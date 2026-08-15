import type { Bloc } from "@/contenu";

/**
 * Rendu d'un bloc de leçon. Largeur de lecture bridée à 42rem — au-delà,
 * l'œil perd la ligne suivante ; c'est la largeur des articles du portfolio.
 */
export function BlocLecon({ bloc }: { bloc: Bloc }) {
  switch (bloc.type) {
    case "titre":
      return (
        <h2 className="mt-12 max-w-2xl text-xl font-medium tracking-tight text-ink">
          {bloc.texte}
        </h2>
      );

    case "para":
      return (
        <p className="mt-5 max-w-2xl leading-relaxed text-ink-soft">
          {bloc.texte}
        </p>
      );

    case "liste":
      return (
        <ul className="mt-5 max-w-2xl space-y-3">
          {bloc.items.map((item) => (
            <li
              key={item}
              className="border-l border-line pl-4 leading-relaxed text-ink-soft"
            >
              {item}
            </li>
          ))}
        </ul>
      );

    case "code":
      return (
        <div className="mt-6 max-w-3xl overflow-x-auto rounded-xl border border-line bg-surface p-4">
          <pre className="font-mono text-sm leading-relaxed text-ink-soft">
            <code>{bloc.texte}</code>
          </pre>
        </div>
      );

    case "encadre":
      return (
        <aside className="mt-8 max-w-2xl rounded-2xl border border-line bg-surface-muted p-6">
          <p className="surtitre">{bloc.titre}</p>
          <p className="mt-3 leading-relaxed text-ink-soft">{bloc.texte}</p>
        </aside>
      );
  }
}
