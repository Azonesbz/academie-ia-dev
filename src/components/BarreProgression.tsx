/**
 * Piste en `surface-muted`, remplissage blanc, et la seule transition longue
 * de toute la DA : 500 ms sur la largeur. Reprise telle quelle du portfolio.
 */
export function BarreProgression({
  pourcentage,
  faites,
  total,
}: {
  pourcentage: number;
  faites: number;
  total: number;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <p className="surtitre">Progression</p>
        <p className="font-mono text-sm tabular-nums text-muted">
          <span className="text-ink">{faites}</span> / {total}
        </p>
      </div>
      <div
        className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-muted"
        role="progressbar"
        aria-valuenow={pourcentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Étapes achevées"
      >
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-500"
          style={{ width: `${pourcentage}%` }}
        />
      </div>
    </div>
  );
}
