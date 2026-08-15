import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/AuthForm";
import { Logo } from "@/components/Logo";
import { currentUser } from "@/lib/auth";
import { APP } from "@/lib/config";

export const metadata = { title: `Connexion — ${APP.name}` };

export default async function PageConnexion() {
  if (await currentUser()) redirect("/app");

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-16">
      <Link href="/" className="mb-10 self-start rounded-md">
        <Logo />
      </Link>
      <h1 className="text-3xl font-semibold tracking-tight text-ink">
        Reprendre où tu en étais
      </h1>
      <p className="mt-3 mb-8 leading-relaxed text-muted">
        On ne garde que l&apos;étape où tu en es. Rien de ton code, jamais.
      </p>
      <AuthForm mode="login" />
    </main>
  );
}
