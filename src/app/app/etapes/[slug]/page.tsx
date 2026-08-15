import Link from "next/link";
import { notFound } from "next/navigation";
import { BlocLecon } from "@/components/BlocLecon";
import { Confrontation } from "@/components/Confrontation";
import { leconParSlug } from "@/contenu";
import { currentUser } from "@/lib/auth";
import { etapeParSlug } from "@/lib/etapes";
import { aJalon, jalon2Ouvert, jalonsDe } from "@/lib/progression";

export default async function PageLecon({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const etape = etapeParSlug(slug);
  const lecon = leconParSlug(slug);
  if (!etape || !lecon) notFound();

  const user = await currentUser();
  const jalons = user ? jalonsDe(user.id) : [];

  return (
    <article>
      <Link href="/app" className="btn-ghost -ml-4 min-h-11 px-4 text-sm">
        ← Les cinq étapes
      </Link>

      <header className="mt-6 border-b border-line/60 pb-10">
        <p className="surtitre">
          Étape {String(etape.rang).padStart(2, "0")} · {etape.duree}
        </p>
        <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
          {etape.titre}
        </h1>
        <p className="mt-6 max-w-2xl rounded-xl border border-line bg-surface p-4 leading-relaxed text-ink-soft">
          <span className="surtitre">La cible</span>
          <span className="mt-2 block">{etape.jeSais}</span>
        </p>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          {lecon.chapeau}
        </p>
      </header>

      <div className="pb-4">
        {lecon.blocs.map((bloc, i) => (
          <BlocLecon key={i} bloc={bloc} />
        ))}
      </div>

      <section className="mt-12 max-w-2xl rounded-2xl border border-line bg-surface-muted p-6">
        <p className="surtitre">À faire sur ton dépôt</p>
        <p className="mt-3 leading-relaxed text-ink-soft">{lecon.exercice}</p>
      </section>

      <Confrontation
        etape={etape}
        cas={lecon.casTruque}
        jalon1Pose={aJalon(jalons, slug, 1)}
        jalon2Pose={aJalon(jalons, slug, 2)}
        jalon2Ouvert={jalon2Ouvert(jalons, slug)}
      />
    </article>
  );
}
