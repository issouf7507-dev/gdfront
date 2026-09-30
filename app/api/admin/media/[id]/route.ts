import { z } from "zod";
import { readJson, withErrorHandling } from "@/lib/api-handler";
import { NotFoundError, ValidationError } from "@/lib/app-error";
import { deleteMedia } from "@/lib/media";
import { prisma } from "@/lib/prisma";
import { revalidatePublicContent } from "@/lib/revalidate";
import { requireAdmin } from "@/lib/session";

const patchSchema = z.object({ alt: z.string().trim().max(255) });

export const PATCH = withErrorHandling<{ id: string }>(async (req, { params }) => {
  await requireAdmin();
  const { id } = await params;
  const parsed = patchSchema.safeParse(await readJson(req));
  if (!parsed.success) throw new ValidationError(z.flattenError(parsed.error));
  const exists = await prisma.media.findUnique({ where: { id }, select: { id: true } });
  if (!exists) throw new NotFoundError("Image");
  await prisma.media.update({ where: { id }, data: { alt: parsed.data.alt || null } });
  revalidatePublicContent();
  return Response.json({ data: { id } });
});

export const DELETE = withErrorHandling<{ id: string }>(async (_req, { params }) => {
  await requireAdmin();
  const { id } = await params;
  const exists = await prisma.media.findUnique({ where: { id }, select: { id: true } });
  if (!exists) throw new NotFoundError("Image");
  await deleteMedia(id);
  revalidatePublicContent();
  return Response.json({ data: { id } });
});
