import "server-only";

/**
 * Inventaire des clés attendues par l'application.
 *
 * Chaque module branché sur le starter (paiement, e-mails, IA, analytics)
 * déclare ici ses variables. Le tableau de bord lit cet inventaire pour dire
 * précisément ce qui manque, plutôt que de laisser une requête échouer en
 * production avec un message opaque.
 */
export interface EnvKey {
  /** Nom de la variable d'environnement. */
  name: string;
  /** Ce à quoi elle sert, en une ligne. */
  purpose: string;
  /** Où l'obtenir. */
  url: string;
  /** Une clé optionnelle n'empêche pas l'application de tourner. */
  optional?: boolean;
}

export const ENV_KEYS: EnvKey[] = [
  // Le starter nu n'exige aucune clé : SQLite et les sessions fonctionnent
  // sans secret. Ajoutez les vôtres au fur et à mesure des modules activés.
  //
  // Exemples, à décommenter quand le module correspondant est branché :
  //
  // { name: "ANTHROPIC_API_KEY", purpose: "appels au modèle", url: "https://console.anthropic.com" },
  // { name: "STRIPE_SECRET_KEY", purpose: "paiements et abonnements", url: "https://dashboard.stripe.com/apikeys" },
  // { name: "STRIPE_WEBHOOK_SECRET", purpose: "vérification des webhooks Stripe", url: "https://dashboard.stripe.com/webhooks" },
  // { name: "RESEND_API_KEY", purpose: "e-mails transactionnels", url: "https://resend.com/api-keys" },
];

export interface EnvStatus {
  key: EnvKey;
  present: boolean;
}

/** État de chaque clé déclarée. Ne renvoie jamais la valeur elle-même. */
export function envStatus(): EnvStatus[] {
  return ENV_KEYS.map((key) => ({
    key,
    present: Boolean(process.env[key.name]?.trim()),
  }));
}

/** Clés obligatoires absentes — ce qui empêche l'application de fonctionner. */
export function missingRequired(): EnvKey[] {
  return envStatus()
    .filter((s) => !s.present && !s.key.optional)
    .map((s) => s.key);
}
