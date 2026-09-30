"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { revalidatePublicContent } from "@/lib/revalidate";
import { requireAdmin } from "@/lib/session";
import { parseForm, testimonialSchema, validationState, type ActionState } from "@/lib/validation/admin";

export async function saveTestimonial(id: string | null, _prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const parsed = parseForm(testimonialSchema, formData);
  if (!parsed.success) return validationState(parsed.error);

  if (id) {
    const updated = await prisma.testimonial.updateMany({ where: { id }, data: parsed.data });
    if (updated.count === 0) return { error: "Avis introuvable." };
  } else {
    await prisma.testimonial.create({ data: parsed.data });
  }

  revalidatePublicContent();
  revalidatePath("/admin/avis");
  redirect("/admin/avis");
}

export async function deleteTestimonial(id: string) {
  await requireAdmin();
  await prisma.testimonial.deleteMany({ where: { id } });
  revalidatePublicContent();
  revalidatePath("/admin/avis");
  redirect("/admin/avis");
}
