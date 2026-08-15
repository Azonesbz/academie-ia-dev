import { EnTete } from "@/components/EnTete";
import { HeroAccueil } from "@/components/HeroAccueil";
import { SectionOffre } from "@/components/SectionOffre";
import { SectionParcours } from "@/components/SectionParcours";
import { SectionSocle } from "@/components/SectionSocle";
import { ARRETE_LE } from "@/lib/etapes";
import { currentUser } from "@/lib/auth";

const REFUS = [
  "Aucune vidéo, aucun quiz, aucun certificat — l'édition payante n'en délivre pas davantage.",
  "Aucun abonnement, aucune reconduction, aucun bulletin périodique promis : ce qu'on ne peut pas tenir, on ne le vend pas.",
  "Rien de ton code n'est envoyé, gratuit ou payant. Le kit d'audit tourne chez toi et ne parle qu'à toi.",
  "Les deux parcours gratuits ne sont pas une démo : ils ne se referment jamais et ne sont pas amputés.",
];

export default async function PageAccueil() {
  const user = await currentUser();

  return (
    <div className="min-h-screen">
      <EnTete connecte={Boolean(user)} />

      <main id="contenu" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <HeroAccueil />

        <section className="border-t border-line/60 py-16 sm:py-20 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
            <div>
              <h2 className="text-2xl font-medium tracking-tight text-ink sm:text-3xl">
                Tu as généré la quasi-totalité de ton code, et tu n&apos;en as
                relu qu&apos;une partie.
              </h2>
              <p className="mt-5 max-w-xl leading-relaxed text-muted">
                Ton historique est une file de <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-sm text-ink-soft">wip</code>{" "}
                et de <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-sm text-ink-soft">fix</code>.
                Pas de branche d&apos;intégration, pas de tests. Et tu viens de
                perdre une soirée à chercher quel changement a cassé ce qui
                marchait la semaine dernière — sans pouvoir revenir en arrière,
                parce qu&apos;aucun commit ne s&apos;annule seul.
              </p>
              <p className="mt-5 max-w-xl leading-relaxed text-muted">
                Ce n&apos;est pas un problème d&apos;outil : tu l&apos;as déjà.
                C&apos;est qu&apos;une règle qu&apos;on écrit et une règle qui
                refuse ne sont pas le même objet.
              </p>
            </div>

            <aside className="card bg-surface-muted p-6">
              <p className="surtitre">Le compte honnête</p>
              <p className="mt-4 font-mono text-5xl tabular-nums text-ink">
                3<span className="text-muted">/46</span>
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Dans la méthodologie que cette académie enseigne, trois règles
                sur quarante-six refusent réellement quelque chose. Les
                quarante-trois autres sont des vœux bien écrits. Savoir
                distinguer les deux, c&apos;est l&apos;étape 04.
              </p>
            </aside>
          </div>
        </section>

        <SectionSocle />

        <SectionParcours parcours="base" ancre="etapes" />
        <SectionParcours parcours="methode" />
        <SectionOffre />

        <section className="border-t border-line/60 py-16 sm:py-20 lg:py-24">
          <h2 className="text-2xl font-medium tracking-tight text-ink sm:text-3xl">
            Ce que ce n&apos;est pas
          </h2>
          <ul className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
            {REFUS.map((refus) => (
              <li key={refus} className="bg-surface p-6 leading-relaxed text-muted">
                {refus}
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="border-t border-line/80 bg-surface-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <p className="max-w-3xl text-sm leading-relaxed text-muted">
            Contenu arrêté en {ARRETE_LE} et non mis à jour. « La méthode » ne
            dépend d&apos;aucune version d&apos;outil ; « La base » décrit un
            écosystème qui bouge, et vieillira — c&apos;est écrit dessus plutôt
            que promis entretenu.
          </p>
        </div>
      </footer>
    </div>
  );
}
