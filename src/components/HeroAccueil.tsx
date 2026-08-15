import Link from "next/link";
import { ARRETE_LE } from "@/lib/etapes";

const SPECIMEN = `test("remise de 20 % au-dela de 100 e", () => {
  const panier = panierDe({ total: 150 });

  const r = appliquerRemise(panier);

  expect(r).toBeDefined();
  expect(r.total).toBeGreaterThan(0);
});`;

const REFUS_COURTS = [
  "Pas de certificat",
  "Pas de quiz",
  "Rien de ton code n'est envoyé",
];

/**
 * Le hero montre le mécanisme au lieu de l'annoncer : à droite, un vrai cas
 * truqué. Le visiteur se prend la confrontation avant d'avoir lu une promesse
 * — c'est exactement ce que les cinq étapes lui feront.
 */
export function HeroAccueil() {
  return (
    <section className="py-20 sm:py-28 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:items-center lg:gap-16">
        <div>
          <p className="surtitre">Contenu clos · {ARRETE_LE}</p>

          <h1 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Reprendre la main sur un dépôt parti en vrille.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Cinq étapes, sur ton propre projet. Chacune finit par un cas truqué :
            tu écris ton diagnostic, <em className="not-italic text-ink-soft">puis</em>{" "}
            tu lis le nôtre. C&apos;est le seul moment où tu sauras si tu sais.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/signup" className="btn-primary">
              Commencer l&apos;étape 00
            </Link>
            <Link href="#etapes" className="btn-secondary">
              Voir les cinq étapes
            </Link>
          </div>

          <ul className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2">
            {REFUS_COURTS.map((r) => (
              <li key={r} className="text-sm text-muted">
                <span aria-hidden className="mr-2 text-line-strong">
                  ✕
                </span>
                {r}
              </li>
            ))}
          </ul>
        </div>

        <figure className="card overflow-hidden">
          <figcaption className="flex items-center justify-between border-b border-line/60 px-5 py-3">
            <span className="surtitre">Un cas truqué</span>
            <span className="font-mono text-xs tabular-nums text-muted">
              ✓ 1 test passé
            </span>
          </figcaption>

          <div className="overflow-x-auto bg-paper px-5 py-4">
            <pre className="font-mono text-xs leading-relaxed text-ink-soft">
              <code>{SPECIMEN}</code>
            </pre>
          </div>

          <div className="border-t border-line/60 px-5 py-4">
            <p className="text-base font-medium leading-snug text-ink">
              Ce test est vert. Il ne teste rien.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Supprime le corps de la fonction testée : il reste vert. Si tu
              l&apos;avais vu tout seul, l&apos;étape 02 te prendra dix minutes.
              Sinon, c&apos;est qu&apos;elle est pour toi.
            </p>
          </div>
        </figure>
      </div>
    </section>
  );
}
