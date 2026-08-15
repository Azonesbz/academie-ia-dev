import { BarreProgression } from "@/components/BarreProgression";
import { LigneEtape } from "@/components/LigneEtape";
import { currentUser } from "@/lib/auth";
import { ARRETE_LE, ETAPES } from "@/lib/etapes";
import { etapesFaites, pourcentage, prochaineEtape } from "@/lib/progression";

export default async function PageProgression() {
  const user = await currentUser();
  const faites = user ? etapesFaites(user.id) : new Set<string>();
  const suivante = prochaineEtape(faites);
  const pct = pourcentage(faites);

  return (
    <div className="space-y-10">
      <section className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
        <div>
          <p className="surtitre">
            {suivante ? `Étape ${String(suivante.rang).padStart(2, "0")}` : "Terminé"}
          </p>
          <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-ink">
            {suivante ? suivante.titre : "Les cinq étapes sont faites."}
          </h1>
          <p className="mt-4 max-w-xl leading-relaxed text-muted">
            {suivante
              ? suivante.acquis
              : "Il ne reste rien à cocher ici. Ce que tu as écrit vit dans ton dépôt, pas dans le nôtre — et c'était le but."}
          </p>
        </div>

        <aside className="card self-start bg-surface-muted p-6">
          <BarreProgression
            pourcentage={pct}
            faites={faites.size}
            total={ETAPES.length}
          />
          {suivante && (
            <p className="mt-6 border-t border-line/50 pt-4 text-sm leading-relaxed text-muted">
              Tu déclares toi-même ce que tu as fait. Rien ne vérifie : vérifier
              voudrait dire lire ton dépôt.
            </p>
          )}
        </aside>
      </section>

      <section>
        <h2 className="surtitre">La progression, arrêtée en {ARRETE_LE}</h2>
        <ul className="mt-5 space-y-3">
          {ETAPES.map((etape) => (
            <LigneEtape
              key={etape.slug}
              etape={etape}
              faite={faites.has(etape.slug)}
              courante={suivante?.slug === etape.slug}
            />
          ))}
        </ul>
      </section>
    </div>
  );
}
