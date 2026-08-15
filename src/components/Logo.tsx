import { APP } from "@/lib/config";

/**
 * Le nom du produit, en Pacifico — le seul endroit où la police d'affichage du
 * portfolio est employée. La pastille carrée reprend le motif de la DA
 * d'origine : un accent blanc, jamais une couleur.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline gap-2.5 ${className}`}>
      <span
        aria-hidden
        className="inline-block size-2 translate-y-[-2px] rounded-full bg-accent"
      />
      <span className="font-display text-[1.35rem] leading-none text-ink">
        {APP.name}
      </span>
    </span>
  );
}
