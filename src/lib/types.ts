export interface User {
  id: string;
  email: string;
  password_hash: string;
  created_at: string;
}

/** Forme envoyée au navigateur : jamais le hachage du mot de passe. */
export interface PublicUser {
  id: string;
  email: string;
  createdAt: string;
}

export function toPublicUser(user: User): PublicUser {
  return { id: user.id, email: user.email, createdAt: user.created_at };
}
