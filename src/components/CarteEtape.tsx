import type { Etape } from "@/lib/etapes";

/**
 * Une étape de la progression. Le survol ne fait qu'une seule chose : monter
 * la bordure de 12 % à 40 % de blanc. Rien ne se déplace, rien ne s'agrandit —
 * c'est la discipline de mouvement de la DA d'origine.
 */
export function CarteEtape({
  etape,
  faite = false,
}: {
  etape: Etape;
  faite?: boolean;
}) {
  return (
    <article className="card p-6 transition-colors duration-200 hover:border-accent/40">
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-mono text-sm text-muted tabular-nums">
          {String(etape.rang).padStart(2, "0")}
        </span>
        <span className="chip">{faite ? "Fait" : etape.duree}</span>
      </div>

      <h3 className="mt-4 text-xl font-medium leading-tight text-ink">
        {etape.titre}
      </h3>
      <p className="mt-3 leading-relaxed text-muted">{etape.jeSais}</p>

      <div className="mt-5 border-t border-line/50 pt-4">
        <p className="surtitre">Ce que tu produis</p>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          {etape.preuve}
        </p>
      </div>
    </article>
  );
}
