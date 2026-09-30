"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { revalidatePublicContent } from "@/lib/revalidate";
import { requireAdmin } from "@/lib/session";
import { uniqueSlug } from "@/lib/slug";
import { parseForm, realisationSchema, validationState, type ActionState } from "@/lib/validation/admin";

export async function saveRealisation(id: string | null, _prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const parsed = parseForm(realisationSchema, formData);
  if (!parsed.success) return validationState(parsed.error);
  const { images, slug: wantedSlug, ...fields } = parsed.data;

  // Les images référencées doivent exister (évite une erreur de clé étrangère)
  const mediaIds = [...new Set([...images.map((i) => i.mediaId), ...(fields.coverId ? [fields.coverId] : [])])];
  const found = await prisma.media.count({ where: { id: { in: mediaIds } } });
  if (found !== mediaIds.length) return { error: "Une des images n'existe plus. Rechargez la page." };

  const slug = await uniqueSlug(wantedSlug ?? fields.title, async (s) =>
    Boolean(await prisma.realisation.findFirst({ where: { slug: s, NOT: id ? { id } : undefined }, select: { id: true } })),
  );
  const imageRows = images.map((img, position) => ({ mediaId: img.mediaId, kind: img.kind, position }));

  let savedId = id;
  if (id) {
    const exists = await prisma.realisation.findUnique({ where: { id }, select: { id: true } });
    if (!exists) return { error: "Réalisation introuvable." };
    await prisma.$transaction([
      prisma.realisationImage.deleteMany({ where: { realisationId: id } }),
      prisma.realisation.update({ where: { id }, data: { ...fields, slug, images: { create: imageRows } } }),
    ]);
  } else {
    const created = await prisma.realisation.create({ data: { ...fields, slug, images: { create: imageRows } } });
    savedId = created.id;
  }

  revalidatePublicContent();
  revalidatePath("/admin/realisations");
  if (!id) redirect(`/admin/realisations/${savedId}?created=1`);
  return { success: "Réalisation enregistrée." };
}

export async function deleteRealisation(id: string) {
  await requireAdmin();
  await prisma.realisation.deleteMany({ where: { id } });
  revalidatePublicContent();
  revalidatePath("/admin/realisations");
  redirect("/admin/realisations");
}
