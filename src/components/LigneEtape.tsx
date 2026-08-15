import Link from "next/link";
import type { Etape } from "@/lib/etapes";

/**
 * Une étape dans la liste. En lecture seule : aucun bouton de déclaration ici.
 * Un critère posé à côté du clic n'a jamais rien empêché — on ne déclare que
 * derrière le cas truqué, dans le chemin de la confrontation.
 */
export function LigneEtape({
  etape,
  jalon1,
  jalon2,
}: {
  etape: Etape;
  jalon1: string | null;
  jalon2: string | null;
}) {
  const etat = jalon2 ? "deux" : jalon1 ? "un" : "aucun";

  return (
    <li className="card p-5 transition-colors duration-200 hover:border-accent/40">
      <div className="flex items-start gap-4">
        <span
          aria-hidden
          className={`mt-1 grid size-6 shrink-0 place-items-center rounded-full border font-mono text-xs tabular-nums ${
            etat === "deux"
              ? "border-accent bg-accent text-paper"
              : etat === "un"
                ? "border-accent/60 text-ink"
                : "border-line text-muted"
          }`}
        >
          {etape.rang}
        </span>

        <div className="min-w-0 flex-1">
          <h3 className="text-base font-medium leading-snug">
            <Link
              href={`/app/etapes/${etape.slug}`}
              className="rounded-md text-ink transition-colors hover:text-muted"
            >
              {etape.titre}
            </Link>
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">
            {etape.jeSais}
          </p>

          <p className="mt-3 font-mono text-xs tabular-nums text-muted">
            {etat === "aucun" && "aucun jalon déclaré"}
            {etat === "un" && `fait le ${jalon1?.slice(0, 10)} · refait : non`}
            {etat === "deux" &&
              `fait le ${jalon1?.slice(0, 10)} · refait le ${jalon2?.slice(0, 10)}`}
          </p>
        </div>
      </div>
    </li>
  );
}
