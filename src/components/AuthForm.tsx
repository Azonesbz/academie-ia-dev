"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const isSignup = mode === "signup";

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setPending(true);
    try {
      const res = await fetch(`/api/auth/${isSignup ? "signup" : "login"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Une erreur est survenue.");
        return;
      }
      router.replace("/app");
      router.refresh();
    } catch {
      setError("Impossible de joindre le serveur.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div>
        <label className="label" htmlFor="email">
          Adresse e-mail
        </label>
        <input
          id="email"
          type="email"
          className="field"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="label" htmlFor="password">
          Mot de passe
        </label>
        <input
          id="password"
          type="password"
          className="field"
          autoComplete={isSignup ? "new-password" : "current-password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {isSignup && (
          <p className="mt-1.5 text-xs text-muted">10 caractères minimum.</p>
        )}
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-lg bg-danger-wash px-3.5 py-2.5 text-sm text-danger"
        >
          {error}
        </p>
      )}

      <button type="submit" className="btn-primary w-full py-3" disabled={pending}>
        {pending
          ? "Un instant…"
          : isSignup
            ? "Créer mon compte"
            : "Se connecter"}
      </button>

      <p className="pt-2 text-center text-sm text-muted">
        {isSignup ? (
          <>
            Déjà inscrit ?{" "}
            <Link href="/login" className="text-accent hover:underline">
              Se connecter
            </Link>
          </>
        ) : (
          <>
            Pas encore de compte ?{" "}
            <Link href="/signup" className="text-accent hover:underline">
              En créer un
            </Link>
          </>
        )}
      </p>
    </form>
  );
}
