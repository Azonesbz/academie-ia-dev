"use client";

import { useState } from "react";
import { declarerJalon, retirerDeclaration } from "@/app/app/actions";
import type { CasTruque } from "@/contenu";
import type { Etape } from "@/lib/etapes";

const SEUIL = 40;

/**
 * Le cas truqué et sa porte. L'apprenant écrit son diagnostic AVANT de pouvoir
 * lire le nôtre : sans ce référent, il n'y a pas d'auto-évaluation inexacte,
 * il n'y a pas d'auto-évaluation du tout.
 *
 * Le champ est hors de tout <form>, sans `name`, et son contenu ne part
 * jamais — pas même « pour vérifier qu'il a écrit quelque chose ». Le seuil se
 * compte ici, dans le navigateur.
 */
export function Confrontation({
  etape,
  cas,
  jalon1Pose,
  jalon2Pose,
  jalon2Ouvert,
}: {
  etape: Etape;
  cas: CasTruque;
  jalon1Pose: boolean;
  jalon2Pose: boolean;
  jalon2Ouvert: boolean;
}) {
  const [diagnostic, setDiagnostic] = useState("");
  const [revele, setRevele] = useState(jalon1Pose);
  const [esquive, setEsquive] = useState(false);
  const assezEcrit = diagnostic.trim().length >= SEUIL;

  return (
    <section className="mt-16 border-t border-line/60 pt-12">
      <p className="surtitre">Le cas truqué</p>
      <h2 className="mt-4 max-w-2xl text-2xl font-medium tracking-tight text-ink">
        {cas.titre}
      </h2>
      <p className="mt-5 max-w-2xl leading-relaxed text-muted">
        {cas.mise_en_scene}
      </p>

      <div className="mt-6 max-w-3xl overflow-x-auto rounded-xl border border-line bg-surface p-4">
        <pre className="font-mono text-sm leading-relaxed text-ink-soft">
          <code>{cas.artefact}</code>
        </pre>
      </div>

      <p className="mt-6 max-w-2xl leading-relaxed text-ink">{cas.question}</p>

      {!revele && (
        <div className="mt-6 max-w-2xl">
          <label className="label" htmlFor="diagnostic">
            Ton diagnostic, avant de lire le nôtre
          </label>
          <textarea
            id="diagnostic"
            rows={5}
            className="field font-sans"
            placeholder="Ce que tu vois qui cloche, et pourquoi."
            value={diagnostic}
            onChange={(e) => setDiagnostic(e.target.value)}
          />
          <p className="mt-2 text-sm text-muted">
            Rien n&apos;est envoyé : ce texte ne quitte pas cet onglet et
            disparaît si tu fermes la page. Le seul but est que tu aies écrit ta
            réponse avant de connaître la nôtre — sinon tu la reconnaîtras au
            lieu de la produire.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <button
              type="button"
              className="btn-secondary"
              disabled={!assezEcrit}
              onClick={() => setRevele(true)}
            >
              {assezEcrit
                ? "Voir le défaut"
                : `Écris ton diagnostic d'abord (${diagnostic.trim().length}/${SEUIL})`}
            </button>
            <button
              type="button"
              className="rounded-md text-sm text-muted underline underline-offset-4 hover:text-ink"
              onClick={() => {
                setEsquive(true);
                setRevele(true);
              }}
            >
              Montrer sans écrire
            </button>
          </div>
        </div>
      )}

      {revele && (
        <>
          {esquive && (
            <p className="mt-8 max-w-2xl rounded-md border border-line bg-surface-muted px-4 py-3 text-sm leading-relaxed text-muted">
              Tu as lu la réponse avant de chercher la tienne. Personne ne le
              saura, et c&apos;est bien le problème.
            </p>
          )}

          <div className="mt-8 max-w-2xl rounded-2xl border border-line bg-surface-muted p-6">
            <p className="surtitre">Ce qui cloche</p>
            <p className="mt-3 leading-relaxed text-ink-soft">
              {cas.revelation}
            </p>
          </div>

          <div className="mt-6 max-w-2xl rounded-2xl border border-line bg-surface p-6">
            <p className="surtitre">Le signe que tu ne maîtrises pas encore</p>
            <p className="mt-3 leading-relaxed text-muted">
              {etape.signeDeNonMaitrise}
            </p>
          </div>

          <Declaration
            etape={etape}
            jalon1Pose={jalon1Pose}
            jalon2Pose={jalon2Pose}
            jalon2Ouvert={jalon2Ouvert}
          />
        </>
      )}
    </section>
  );
}

function Declaration({
  etape,
  jalon1Pose,
  jalon2Pose,
  jalon2Ouvert,
}: {
  etape: Etape;
  jalon1Pose: boolean;
  jalon2Pose: boolean;
  jalon2Ouvert: boolean;
}) {
  const jalon = jalon1Pose ? 2 : 1;
  const criteres = jalon1Pose ? [etape.critereJalon2] : etape.criteresJalon1;

  if (jalon2Pose) {
    return (
      <div className="mt-10 max-w-2xl rounded-2xl border border-accent/40 bg-surface p-6">
        <p className="surtitre">Déclaré</p>
        <p className="mt-3 leading-relaxed text-ink">
          Tu as posé les deux jalons de cette étape. Ce site n&apos;en sait pas
          plus : il a deux dates, et rien d&apos;autre.
        </p>
        <FormulaireRetrait slug={etape.slug} jalon={1} libelle="Tout retirer" />
      </div>
    );
  }

  return (
    <div className="mt-10 max-w-2xl rounded-2xl border border-accent/40 bg-surface p-6">
      <p className="surtitre">Ce que ce bouton déclare</p>
      <ul className="mt-4 space-y-3">
        {criteres.map((c) => (
          <li key={c} className="border-l border-line pl-4 leading-relaxed text-ink-soft">
            {c}
          </li>
        ))}
      </ul>

      {jalon === 2 && !jalon2Ouvert ? (
        <p className="mt-6 rounded-md border border-line bg-surface-muted px-4 py-3 text-sm leading-relaxed text-muted">
          Tu as déclaré ça aujourd&apos;hui. « Refait un autre jour » veut dire
          un autre jour. Reviens. Ce n&apos;est pas une vérification — le site
          ne peut rien vérifier ; c&apos;est un fait de calendrier, qui coûte
          une journée à qui refait le travail, et une journée à qui ment.
        </p>
      ) : (
        <form action={declarerJalon} className="mt-6">
          <input type="hidden" name="slug" value={etape.slug} />
          <input type="hidden" name="jalon" value={jalon} />
          <button type="submit" className="btn-primary">
            {jalon === 1
              ? "Je l'ai fait sur mon dépôt"
              : "Je l'ai refait un autre jour, sans la page"}
          </button>
        </form>
      )}

      {jalon1Pose && (
        <FormulaireRetrait
          slug={etape.slug}
          jalon={1}
          libelle="Retirer ma déclaration"
        />
      )}
    </div>
  );
}

function FormulaireRetrait({
  slug,
  jalon,
  libelle,
}: {
  slug: string;
  jalon: 1 | 2;
  libelle: string;
}) {
  return (
    <form action={retirerDeclaration} className="mt-4">
      <input type="hidden" name="slug" value={slug} />
      <input type="hidden" name="jalon" value={jalon} />
      <button type="submit" className="btn-ghost -ml-6 min-h-11 text-sm">
        {libelle}
      </button>
    </form>
  );
}
