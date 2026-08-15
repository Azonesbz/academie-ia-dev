import Link from "next/link";
import { EnTete } from "@/components/EnTete";
import { currentUser } from "@/lib/auth";
import { APP } from "@/lib/config";
import { ARRETE_LE } from "@/lib/etapes";

export const metadata = { title: `L'édition — ${APP.name}` };

const CE_QUON_NE_VEND_PAS = [
  ["Pas d'abonnement", "Rien ne se reconduit, il n'y a rien à résilier."],
  [
    "Pas de veille vendue",
    "Un bulletin périodique sur un outil livré vingt-six fois par mois est une astreinte qu'une personne seule ne tient pas. On ne vend pas ce qu'on ne peut pas tenir.",
  ],
  [
    "Pas de certificat",
    "Aucun papier, aucun badge, rien à mettre sur un profil. Ce que tu emportes, c'est un rapport sur ta machine et ce que tu sais en faire.",
  ],
  [
    "Pas de catalogue d'artefacts",
    "Des centaines de plugins et d'agents sont déjà distribués gratuitement sous licence libre. On ne prétend pas rivaliser en volume avec ce qui est gratuit.",
  ],
];

export default async function PageOffre() {
  const user = await currentUser();

  return (
    <div className="min-h-screen">
      <EnTete connecte={Boolean(user)} />

      <main id="contenu" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <section className="py-20 sm:py-24">
          <p className="surtitre">Édition {ARRETE_LE} · achat unique</p>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl">
            La documentation ne connaît pas ta machine.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Tout ce qui explique est gratuit sur ce site, et le restera. Ce qui
            se paie est la seule chose qu&apos;aucun manuel ne peut faire :
            regarder ta configuration à toi, et nommer ce qui y est déclaré sans
            tourner.
          </p>
        </section>

        <section className="grid gap-12 border-t border-line/60 py-16 lg:grid-cols-[1.5fr_1fr] lg:gap-16 lg:py-20">
          <div className="space-y-10">
            <article>
              <p className="surtitre">Inclus · 1</p>
              <h2 className="mt-3 text-xl font-medium leading-tight text-ink">
                Le banc — vingt-quatre cas truqués, classés par symptôme
              </h2>
              <p className="mt-4 max-w-xl leading-relaxed text-muted">
                Même format que les leçons gratuites : une mise en scène, un
                artefact plausible et faux, tu écris ton diagnostic, puis tu lis
                le nôtre. Le classement compte autant que les cas — on y entre
                par ce qu&apos;on observe chez soi (« ma règle n&apos;est pas
                appliquée », « mon garde ne bloque rien »), pas par un sommaire.
              </p>
            </article>

            <article>
              <p className="surtitre">Inclus · 2</p>
              <h2 className="mt-3 text-xl font-medium leading-tight text-ink">
                Le kit d&apos;audit — il tourne chez toi, hors ligne
              </h2>
              <p className="mt-4 max-w-xl leading-relaxed text-muted">
                Un plugin qui lit ta configuration, tes plugins et le dossier de
                ton projet, puis rend un rapport nominatif sur ta machine : cet
                agent nomme une compétence sans la déclarer, ce hook ne bloque
                pas ce qu&apos;il annonce, ce composant est rangé là où personne
                ne le cherche, ce chemin ne vaut que depuis ta racine.
              </p>
              <p className="mt-4 max-w-xl leading-relaxed text-muted">
                Rien n&apos;est envoyé nulle part. Le rapport ne quitte pas ton
                poste, et nous n&apos;en voyons jamais une ligne — c&apos;est la
                même règle que pour le reste du site.
              </p>
            </article>
          </div>

          <aside className="card self-start p-6">
            <p className="surtitre">Une fois, pas par mois</p>
            <p className="mt-4 font-mono text-5xl tabular-nums text-ink">49 €</p>
            <p className="mt-5 text-sm leading-relaxed text-muted">
              L&apos;édition est datée et ne prétend pas être entretenue. Ce qui
              est vendu est terminé le jour où il est encaissé — c&apos;est la
              seule promesse qu&apos;une personne seule peut tenir.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Une édition suivante paraîtra quand trois ruptures vérifiées
              auront touché le contenu livré. Jamais à une date annoncée.
            </p>

            <p className="mt-6 rounded-md border border-line bg-surface-muted px-4 py-3 text-sm leading-relaxed text-ink-soft">
              L&apos;encaissement n&apos;est pas encore ouvert : le banc et le
              kit sont en cours d&apos;écriture. Cette page dit ce qui sera
              vendu, et à quel prix, avant qu&apos;on puisse te le vendre.
            </p>
          </aside>
        </section>

        <section className="border-t border-line/60 py-16 sm:py-20">
          <h2 className="text-2xl font-medium tracking-tight text-ink sm:text-3xl">
            Ce qu&apos;on ne te vend pas
          </h2>
          <ul className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
            {CE_QUON_NE_VEND_PAS.map(([titre, detail]) => (
              <li key={titre} className="bg-surface p-6">
                <p className="font-medium text-ink">{titre}</p>
                <p className="mt-2 leading-relaxed text-muted">{detail}</p>
              </li>
            ))}
          </ul>

          <p className="mt-10 max-w-2xl leading-relaxed text-muted">
            Si tu cherches à comprendre l&apos;écosystème, les deux parcours
            gratuits suffisent et sont complets.{" "}
            <Link href="/#etapes" className="text-ink underline underline-offset-4">
              Ils commencent ici
            </Link>
            , sans compte pour les lire.
          </p>
        </section>
      </main>
    </div>
  );
}
