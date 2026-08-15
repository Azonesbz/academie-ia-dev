import "server-only";

/**
 * Limitation de débit en mémoire, appliquée aux routes d'authentification.
 *
 * Suffisant pour un déploiement mono-processus, qui est le mode d'exécution
 * prévu (SQLite + fichiers locaux). Derrière plusieurs instances, il faudrait
 * un compteur partagé.
 */
interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 10;

export function rateLimit(key: string): { allowed: boolean; retryAfterSec: number } {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    sweep(now);
    return { allowed: true, retryAfterSec: 0 };
  }

  bucket.count += 1;
  if (bucket.count > MAX_ATTEMPTS) {
    return {
      allowed: false,
      retryAfterSec: Math.ceil((bucket.resetAt - now) / 1000),
    };
  }
  return { allowed: true, retryAfterSec: 0 };
}

/** Remet le compteur à zéro après une authentification réussie. */
export function clearLimit(key: string): void {
  buckets.delete(key);
}

/**
 * Identifiant du client. `x-forwarded-for` n'est digne de confiance que
 * derrière un reverse proxy maîtrisé ; à défaut, tout le trafic partage un
 * même seau, ce qui reste protecteur.
 */
export function clientKey(request: Request, scope: string): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0].trim() || "local";
  return `${scope}:${ip}`;
}

function sweep(now: number): void {
  if (buckets.size < 1000) return;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}
