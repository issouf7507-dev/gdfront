"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";
import { parseForm, quoteUpdateSchema, validationState, type ActionState } from "@/lib/validation/admin";

export async function updateQuote(id: string, _prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin("quotes");
  const parsed = parseForm(quoteUpdateSchema, formData);
  if (!parsed.success) return validationState(parsed.error);

  const updated = await prisma.quoteRequest.updateMany({ where: { id }, data: parsed.data });
  if (updated.count === 0) return { error: "Demande introuvable." };

  revalidatePath("/admin/devis");
  revalidatePath(`/admin/devis/${id}`);
  revalidatePath("/admin");
  return { success: "Modifications enregistrées." };
}

export async function deleteQuote(id: string) {
  await requireAdmin("quotes");
  await prisma.quoteRequest.deleteMany({ where: { id } });
  revalidatePath("/admin/devis");
  revalidatePath("/admin");
  redirect("/admin/devis");
}
