import Link from "next/link";
import { LigneEtape } from "@/components/LigneEtape";
import { RelevePersonnel } from "@/components/RelevePersonnel";
import { currentUser } from "@/lib/auth";
import { ARRETE_LE, ETAPES } from "@/lib/etapes";
import { jalonsDe, prochaineEtape, toutDeclare } from "@/lib/progression";

export default async function PageParcours() {
  const user = await currentUser();
  const jalons = user ? jalonsDe(user.id) : [];
  const suivante = prochaineEtape(jalons);
  const fini = toutDeclare(jalons);

  const dateDe = (slug: string, rang: 1 | 2) =>
    jalons.find((j) => j.etapeSlug === slug && j.jalon === rang)?.poseLe ?? null;

  return (
    <div>
      <p className="mb-10 max-w-3xl rounded-xl border border-line bg-surface-muted p-5 text-sm leading-relaxed text-muted">
        Ce site ne vérifie rien et ne peut rien vérifier. Il ne lit pas ton
        dépôt, ne le lira jamais, et n&apos;a aucun moyen de savoir si ce que tu
        déclares est vrai. Ce qu&apos;il fait : te poser cinq questions
        auxquelles tu ne peux pas répondre sans t&apos;apercevoir que tu ne sais
        pas.
      </p>

      <section className="max-w-3xl">
        <p className="surtitre">
          {suivante
            ? `Étape ${String(suivante.rang).padStart(2, "0")}`
            : "Les cinq cas sont passés"}
        </p>
        <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-ink">
          {suivante ? suivante.titre : "Il n'y a plus de page à lire."}
        </h1>
        <p className="mt-5 leading-relaxed text-muted">
          {suivante
            ? suivante.jeSais
            : "Ce qui reste à faire ne se fait pas ici : c'est de refaire les gestes sur ton dépôt, les jours où personne ne regarde."}
        </p>
        {suivante && (
          <Link
            href={`/app/etapes/${suivante.slug}`}
            className="btn-primary mt-8"
          >
            Ouvrir l&apos;étape {String(suivante.rang).padStart(2, "0")}
          </Link>
        )}
      </section>

      <section className="mt-14">
        <h2 className="surtitre">Les cinq étapes, arrêtées en {ARRETE_LE}</h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
          Il n&apos;y a ni pourcentage ni score : un chiffre unique cacherait
          laquelle des cinq compétences te manque. Ce que ce site sait de toi
          tient dans les dates ci-dessous, et il ne sait rien d&apos;autre.
        </p>
        <ul className="mt-6 space-y-3">
          {ETAPES.map((etape) => (
            <LigneEtape
              key={etape.slug}
              etape={etape}
              jalon1={dateDe(etape.slug, 1)}
              jalon2={dateDe(etape.slug, 2)}
            />
          ))}
        </ul>
      </section>

      {fini && <RelevePersonnel />}
    </div>
  );
}
