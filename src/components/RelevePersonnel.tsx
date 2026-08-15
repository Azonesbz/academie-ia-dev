"use client";

import { useState } from "react";
import { ETAPES } from "@/lib/etapes";

/**
 * L'écran de fin. Le site ne proclame aucune maîtrise : il n'a pas vu
 * travailler l'apprenant, et un système qui affirme sur la foi d'un clic ce
 * qu'il s'interdit d'observer refabrique le diplôme sans le papier.
 *
 * Ce qu'il fait à la place : lui rendre ses dates, et lui laisser écrire
 * lui-même ce qu'il sait faire. Ce texte reste dans l'onglet.
 */
export function RelevePersonnel() {
  const [phrases, setPhrases] = useState<Record<string, string>>({});

  return (
    <section className="mt-12 border-t border-line/60 pt-12">
      <h2 className="max-w-3xl text-2xl font-medium tracking-tight text-ink sm:text-3xl">
        Ce que tu as déclaré, et ce que ça vaut
      </h2>

      <div className="mt-6 max-w-2xl space-y-5 leading-relaxed text-muted">
        <p>
          Ce site ne t&apos;a pas vu travailler. Il n&apos;a lu ni ton dépôt, ni
          ton code, ni tes sessions, et il ne le fera jamais. Il ne peut donc
          pas t&apos;annoncer que tu maîtrises quoi que ce soit, et il ne le
          fera pas non plus. Aucune de ces lignes n&apos;est une attestation :
          ce sont tes déclarations, avec leur date.
        </p>
        <p>
          Ce qu&apos;on peut dire, en revanche, et qui n&apos;est pas rien :
          cinq fois, tu as écrit ton diagnostic avant de lire le nôtre, et tu as
          vu l&apos;écart. Deux fois par étape, à des jours différents, tu as
          refait le geste sur ton propre dépôt sans cette page sous les yeux.
          C&apos;est ce qui reste quand on retire tout ce qui ne se vérifie pas.
        </p>
        <p className="text-ink-soft">
          Le reste, personne ne peut te le donner : écris-le toi-même. Une
          phrase par étape, comme tu la dirais à un dev qui n&apos;a pas lu ces
          pages — pas « j&apos;ai compris le TDD », mais ce que tu sais faire et
          à quoi tu le vois.
        </p>
      </div>

      <ul className="mt-10 space-y-6">
        {ETAPES.map((etape) => (
          <li key={etape.slug} className="card p-6">
            <p className="surtitre">
              Étape {String(etape.rang).padStart(2, "0")}
            </p>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted">
              La cible était : {etape.jeSais}
            </p>
            <label className="label mt-5" htmlFor={`phrase-${etape.slug}`}>
              La tienne
            </label>
            <textarea
              id={`phrase-${etape.slug}`}
              rows={2}
              className="field font-sans"
              placeholder="Ce que tu sais faire, et à quoi tu le vois."
              value={phrases[etape.slug] ?? ""}
              onChange={(e) =>
                setPhrases((p) => ({ ...p, [etape.slug]: e.target.value }))
              }
            />
          </li>
        ))}
      </ul>

      <p className="mt-8 max-w-2xl leading-relaxed text-muted">
        Ce que tu écris ici reste dans cet onglet : rien n&apos;est envoyé, rien
        n&apos;est enregistré, fermer la page l&apos;efface. Relis-les demain.
        Si l&apos;une te paraît fausse, c&apos;est l&apos;étape à refaire — et
        c&apos;est le seul verdict que ce site puisse honnêtement produire.
      </p>
    </section>
  );
}
