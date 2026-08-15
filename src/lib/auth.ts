import "server-only";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { SESSION_COOKIE } from "./config";
import { getDb, newId, nowIso } from "./db";
import type { User } from "./types";

const SESSION_DAYS = 30;

export async function createUser(email: string, password: string): Promise<User> {
  const normalized = email.trim().toLowerCase();
  const existing = getDb()
    .prepare("SELECT id FROM users WHERE email = ?")
    .get(normalized);
  if (existing) throw new Error("Un compte existe déjà avec cette adresse.");

  const user: User = {
    id: newId("usr"),
    email: normalized,
    password_hash: await bcrypt.hash(password, 12),
    created_at: nowIso(),
  };
  getDb().prepare(
    "INSERT INTO users (id, email, password_hash, created_at) VALUES (?, ?, ?, ?)",
  ).run(user.id, user.email, user.password_hash, user.created_at);
  return user;
}

export async function verifyCredentials(
  email: string,
  password: string,
): Promise<User | null> {
  const user = getDb()
    .prepare("SELECT * FROM users WHERE email = ?")
    .get(email.trim().toLowerCase()) as User | undefined;
  if (!user) {
    // Coût constant : évite de révéler l'existence d'un compte par le timing.
    await bcrypt.compare(
      password,
      "$2b$12$invalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidi",
    );
    return null;
  }
  return (await bcrypt.compare(password, user.password_hash)) ? user : null;
}

export async function startSession(userId: string): Promise<void> {
  const token = crypto.randomUUID() + crypto.randomUUID().replace(/-/g, "");
  const expires = new Date(Date.now() + SESSION_DAYS * 864e5);
  getDb().prepare(
    "INSERT INTO sessions (token, user_id, created_at, expires_at) VALUES (?, ?, ?, ?)",
  ).run(token, userId, nowIso(), expires.toISOString());

  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires,
  });
}

export async function endSession(): Promise<void> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (token) getDb().prepare("DELETE FROM sessions WHERE token = ?").run(token);
  jar.delete(SESSION_COOKIE);
}

export async function currentUser(): Promise<User | null> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const row = getDb()
    .prepare(
      `SELECT u.* FROM sessions s
       JOIN users u ON u.id = s.user_id
       WHERE s.token = ? AND s.expires_at > ?`,
    )
    .get(token, nowIso()) as User | undefined;
  return row ?? null;
}

/** Variante pour les routes API : renvoie l'utilisateur ou lève une 401. */
export async function requireUser(): Promise<User> {
  const user = await currentUser();
  if (!user) throw new UnauthorizedError();
  return user;
}

export class UnauthorizedError extends Error {
  constructor() {
    super("Non authentifié");
    this.name = "UnauthorizedError";
  }
}
