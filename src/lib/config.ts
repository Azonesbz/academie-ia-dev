/**
 * Identité du produit — le seul endroit à modifier au moment de renommer le
 * starter. Tout le reste (titres de page, cookie de session, nom de la base)
 * en dérive.
 */
export const APP = {
  /** Nom affiché. */
  name: process.env.NEXT_PUBLIC_APP_NAME || "L'académie IA du dev",
  /** Phrase d'accroche de la page publique. */
  tagline:
    process.env.NEXT_PUBLIC_APP_TAGLINE ||
    "Reprendre la main sur un dépôt parti en vrille.",
  /** Identifiant technique : cookie de session, fichier SQLite. */
  slug: process.env.APP_SLUG || "academie-ia-dev",
} as const;

export const SESSION_COOKIE = `${APP.slug}_session`;
