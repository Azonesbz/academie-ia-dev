import { NextResponse } from "next/server";
import { createUser, startSession } from "@/lib/auth";
import { clientKey, rateLimit } from "@/lib/throttle";

export async function POST(request: Request) {
  const limit = rateLimit(clientKey(request, "signup"));
  if (!limit.allowed) {
    return NextResponse.json(
      {
        error: `Trop de tentatives. Réessayez dans ${Math.ceil(limit.retryAfterSec / 60)} minutes.`,
      },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSec) } },
    );
  }

  const { email, password } = (await request.json()) as {
    email?: string;
    password?: string;
  };

  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "Adresse e-mail invalide." }, { status: 400 });
  }
  if (!password || password.length < 10) {
    return NextResponse.json(
      { error: "Le mot de passe doit faire au moins 10 caractères." },
      { status: 400 },
    );
  }

  try {
    const user = await createUser(email, password);
    await startSession(user.id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Inscription impossible." },
      { status: 400 },
    );
  }
}
