"use server";

import { revalidatePath } from "next/cache";
import { currentUser } from "@/lib/auth";
import { etapeParSlug } from "@/lib/etapes";
import { annulerFaite, marquerFaite } from "@/lib/progression";

/**
 * Bascule l'état d'une étape. L'apprenant déclare lui-même ce qu'il a fait :
 * rien ne vérifie, parce que vérifier voudrait dire lire son dépôt.
 */
export async function basculerEtape(formData: FormData) {
  const user = await currentUser();
  if (!user) return;

  const slug = String(formData.get("slug") ?? "");
  if (!etapeParSlug(slug)) return;

  const etaitFaite = formData.get("faite") === "1";
  if (etaitFaite) {
    annulerFaite(user.id, slug);
  } else {
    marquerFaite(user.id, slug);
  }

  revalidatePath("/app");
  revalidatePath(`/app/etapes/${slug}`);
}
