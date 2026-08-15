import Link from "next/link";
import { ARRETE_LE } from "@/lib/etapes";

const INCLUS = [
  {
    titre: "Le banc — 24 cas truqués, classés par symptôme",
    detail:
      "Au format exact du gratuit : une mise en scène, un artefact plausible et faux, tu écris ton diagnostic, puis tu lis le nôtre. Le classement est l'objet vendu autant que les cas — on entre par ce qu'on observe chez soi, pas par le chapitre.",
  },
  {
    titre: "Le kit d'audit — il tourne chez toi, hors ligne",
    detail:
      "Un plugin qui lit ta configuration et tes plugins, et rend un rapport nominatif sur ta machine : cet agent nomme une compétence sans la déclarer, ce hook ne bloque pas ce qu'il annonce, ce composant est rangé là où personne ne le cherche. Rien n'est envoyé nulle part.",
  },
];

/**
 * L'offre payante. Achat unique et daté : aucune obligation de calendrier
 * n'est vendue, parce qu'aucune ne serait tenue.
 */
export function SectionOffre() {
  return (
    <section
      id="offre"
      className="scroll-mt-20 border-t border-line/60 py-16 sm:py-20 lg:py-24"
    >
      <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
        <div>
          <div className="flex flex-wrap items-baseline gap-4">
            <h2 className="text-2xl font-medium tracking-tight text-ink sm:text-3xl">
              Ce qui est payant
            </h2>
            <span className="chip">Édition {ARRETE_LE}</span>
          </div>

          <p className="mt-5 max-w-2xl leading-relaxed text-muted">
            Tout ce qui explique est gratuit, et le restera : les deux parcours
            ci-dessus ne sont pas une démo. Ce qui se paie est la seule chose
            qu&apos;aucune documentation ne peut faire à ta place — te dire ce
            qui, sur <em className="not-italic text-ink-soft">ta</em> machine,
            est déclaré et ne tourne pas.
          </p>

          <ul className="mt-10 space-y-6">
            {INCLUS.map((i) => (
              <li key={i.titre} className="border-l border-line pl-5">
                <h3 className="text-lg font-medium leading-snug text-ink">
                  {i.titre}
                </h3>
                <p className="mt-2 max-w-xl leading-relaxed text-muted">
                  {i.detail}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <aside className="card self-start p-6">
          <p className="surtitre">Une fois, pas par mois</p>
          <p className="mt-4 font-mono text-4xl tabular-nums text-ink">49 €</p>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Pas d&apos;abonnement, pas de reconduction, pas de bulletin
            périodique. L&apos;édition est datée et ne prétend pas être
            entretenue : ce qui est vendu est terminé le jour où il est
            encaissé.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Une édition suivante paraîtra quand trois ruptures vérifiées auront
            touché le contenu livré — jamais à une date promise.
          </p>
          <Link href="/offre" className="btn-primary mt-6 w-full">
            Ce que contient l&apos;édition
          </Link>
        </aside>
      </div>
    </section>
  );
}
