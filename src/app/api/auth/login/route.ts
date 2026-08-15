import { NextResponse } from "next/server";
import { startSession, verifyCredentials } from "@/lib/auth";
import { clearLimit, clientKey, rateLimit } from "@/lib/throttle";

export async function POST(request: Request) {
  const key = clientKey(request, "login");
  const limit = rateLimit(key);
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

  if (!email || !password) {
    return NextResponse.json(
      { error: "Adresse e-mail et mot de passe requis." },
      { status: 400 },
    );
  }

  const user = await verifyCredentials(email, password);
  if (!user) {
    return NextResponse.json(
      { error: "Adresse e-mail ou mot de passe incorrect." },
      { status: 401 },
    );
  }

  clearLimit(key);
  await startSession(user.id);
  return NextResponse.json({ ok: true });
}
