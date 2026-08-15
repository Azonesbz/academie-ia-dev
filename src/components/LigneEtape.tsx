import { basculerEtape } from "@/app/app/actions";
import type { Etape } from "@/lib/etapes";

/**
 * Une étape dans l'espace connecté. La pastille de gauche porte l'état ; le
 * survol ne fait monter que la bordure, comme partout ailleurs.
 */
export function LigneEtape({
  etape,
  faite,
  courante,
}: {
  etape: Etape;
  faite: boolean;
  courante: boolean;
}) {
  return (
    <li
      className={`card p-5 transition-colors duration-200 hover:border-accent/40 ${
        courante ? "border-accent/40" : ""
      }`}
    >
      <div className="flex items-start gap-4">
        <span
          aria-hidden
          className={`mt-1 grid size-6 shrink-0 place-items-center rounded-full border text-xs ${
            faite
              ? "border-accent bg-accent text-paper"
              : "border-line text-muted"
          }`}
        >
          {faite ? "✓" : etape.rang}
        </span>

        <div className="min-w-0 flex-1">
          <h3
            className={`text-base font-medium leading-snug ${
              faite ? "text-muted line-through decoration-line" : "text-ink"
            }`}
          >
            {etape.titre}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">
            {etape.preuve}
          </p>
        </div>

        <form action={basculerEtape} className="shrink-0">
          <input type="hidden" name="slug" value={etape.slug} />
          <input type="hidden" name="faite" value={faite ? "1" : "0"} />
          <button
            type="submit"
            className="btn-ghost min-h-11 px-4 text-sm"
            aria-label={
              faite
                ? `Marquer « ${etape.titre} » comme non faite`
                : `Marquer « ${etape.titre} » comme faite`
            }
          >
            {faite ? "Annuler" : "C'est fait"}
          </button>
        </form>
      </div>
    </li>
  );
}
