import Link from "next/link";
import { EnTete } from "@/components/EnTete";
import { CarteEtape } from "@/components/CarteEtape";
import { ARRETE_LE, ETAPES } from "@/lib/etapes";
import { currentUser } from "@/lib/auth";

const REFUS = [
  "Aucune vidéo, aucun quiz, aucun certificat.",
  "Aucune commande ni option de configuration citée — ce qui périmerait en trois mois n'est pas ici.",
  "Rien de ton code n'est envoyé : on ne garde que l'étape où tu en es.",
  "Gratuit, et sans version payante derrière.",
];

export default async function PageAccueil() {
  const user = await currentUser();

  return (
    <div className="min-h-screen">
      <EnTete connecte={Boolean(user)} />

      <main id="contenu" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <section className="py-20 sm:py-28 lg:py-32">
          <p className="surtitre">Progression close · {ARRETE_LE}</p>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Reprendre la main sur un dépôt parti en vrille.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Cinq étapes, sur ton propre projet. À la fin, une règle que tu
            subissais est devenue un garde qui refuse — dans ton dépôt à toi.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/signup" className="btn-primary">
              Commencer l&apos;étape 00
            </Link>
            <Link href="#etapes" className="btn-secondary">
              Voir les cinq étapes
            </Link>
          </div>
        </section>

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

        <section
          id="etapes"
          className="scroll-mt-20 border-t border-line/60 py-16 sm:py-20 lg:py-24"
        >
          <h2 className="text-2xl font-medium tracking-tight text-ink sm:text-3xl">
            Les cinq étapes
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">
            Chacune se fait sur ton projet, pas sur un dépôt-jouet, et produit
            quelque chose qui tourne. Aucune ne se valide en cliquant.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:gap-8">
            {ETAPES.map((etape) => (
              <CarteEtape key={etape.slug} etape={etape} />
            ))}
          </div>
        </section>

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
          <p className="text-sm text-muted">
            Contenu arrêté en {ARRETE_LE} et non mis à jour. Ce qui est enseigné
            ici ne dépend d&apos;aucune version d&apos;outil.
          </p>
        </div>
      </footer>
    </div>
  );
}
