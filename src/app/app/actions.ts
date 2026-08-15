"use server";

import { revalidatePath } from "next/cache";
import { currentUser } from "@/lib/auth";
import { etapeParSlug } from "@/lib/etapes";
import { jalon2Ouvert, jalonsDe, poserJalon, retirerJalon } from "@/lib/progression";

/**
 * Poser un jalon. L'apprenant déclare ; rien ne vérifie, parce que vérifier
 * voudrait dire lire son dépôt. Le seul refus que le serveur oppose est celui
 * du calendrier : le second jalon n'est pas ouvert le jour du premier.
 */
export async function declarerJalon(formData: FormData) {
  const user = await currentUser();
  if (!user) return;

  const slug = String(formData.get("slug") ?? "");
  if (!etapeParSlug(slug)) return;

  const jalon = Number(formData.get("jalon"));
  if (jalon !== 1 && jalon !== 2) return;

  const jalons = jalonsDe(user.id);
  if (jalon === 2 && !jalon2Ouvert(jalons, slug)) return;

  poserJalon(user.id, slug, jalon);
  revalidatePath("/app");
  revalidatePath(`/app/etapes/${slug}`);
}

/** Retirer un jalon, et ceux qui en dépendent. Se dédire doit rester gratuit. */
export async function retirerDeclaration(formData: FormData) {
  const user = await currentUser();
  if (!user) return;

  const slug = String(formData.get("slug") ?? "");
  if (!etapeParSlug(slug)) return;

  const jalon = Number(formData.get("jalon"));
  if (jalon !== 1 && jalon !== 2) return;

  retirerJalon(user.id, slug, jalon);
  revalidatePath("/app");
  revalidatePath(`/app/etapes/${slug}`);
}
