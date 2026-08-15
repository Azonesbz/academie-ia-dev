import { CarteEtape } from "@/components/CarteEtape";
import { PARCOURS, etapesDu, type Parcours } from "@/lib/etapes";

/** Un parcours et ses cinq étapes, sur la page publique. */
export function SectionParcours({
  parcours,
  ancre,
}: {
  parcours: Parcours;
  ancre?: string;
}) {
  const meta = PARCOURS[parcours];

  return (
    <section
      id={ancre}
      className="scroll-mt-20 border-t border-line/60 py-16 sm:py-20 lg:py-24"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h2 className="text-2xl font-medium tracking-tight text-ink sm:text-3xl">
          {meta.titre}
        </h2>
        <span className="chip">Gratuit</span>
      </div>
      <p className="mt-4 max-w-2xl leading-relaxed text-muted">
        {meta.sous_titre}
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:gap-8">
        {etapesDu(parcours).map((etape) => (
          <CarteEtape key={etape.slug} etape={etape} />
        ))}
      </div>
    </section>
  );
}
