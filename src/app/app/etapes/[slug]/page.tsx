import Link from "next/link";
import { notFound } from "next/navigation";
import { BlocLecon } from "@/components/BlocLecon";
import { basculerEtape } from "@/app/app/actions";
import { leconParSlug } from "@/contenu";
import { currentUser } from "@/lib/auth";
import { etapeParSlug } from "@/lib/etapes";
import { etapesFaites } from "@/lib/progression";

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
  const faite = user ? etapesFaites(user.id).has(slug) : false;

  return (
    <article>
      <Link href="/app" className="btn-ghost -ml-4 min-h-11 px-4 text-sm">
        ← La progression
      </Link>

      <header className="mt-6 border-b border-line/60 pb-10">
        <p className="surtitre">
          Étape {String(etape.rang).padStart(2, "0")} · {etape.duree}
        </p>
        <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
          {etape.titre}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          {lecon.chapeau}
        </p>
      </header>

      <div className="pb-4">
        {lecon.blocs.map((bloc, i) => (
          <BlocLecon key={i} bloc={bloc} />
        ))}
      </div>

      <section className="mt-12 max-w-2xl rounded-2xl border border-accent/40 bg-surface p-6">
        <p className="surtitre">L&apos;exercice</p>
        <p className="mt-3 leading-relaxed text-ink">{lecon.exercice}</p>

        <form action={basculerEtape} className="mt-6">
          <input type="hidden" name="slug" value={slug} />
          <input type="hidden" name="faite" value={faite ? "1" : "0"} />
          <button
            type="submit"
            className={faite ? "btn-secondary" : "btn-primary"}
          >
            {faite ? "Marquer comme non faite" : "C'est fait"}
          </button>
        </form>
      </section>
    </article>
  );
}
