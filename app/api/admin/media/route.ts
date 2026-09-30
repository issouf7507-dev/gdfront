import { AppError } from "@/lib/app-error";
import { withErrorHandling } from "@/lib/api-handler";
import { storeImage } from "@/lib/media";
import { mediaUrl } from "@/lib/media-url";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";

const PAGE_SIZE = 48;

function toDto(m: { id: string; path: string; alt: string | null; width: number; height: number; originalName: string }) {
  return { id: m.id, url: mediaUrl(m)!, alt: m.alt, width: m.width, height: m.height, originalName: m.originalName };
}

export const GET = withErrorHandling(async (req) => {
  await requireAdmin();
  const page = Math.max(1, Number(new URL(req.url).searchParams.get("page")) || 1);
  const [items, total] = await Promise.all([
    prisma.media.findMany({ orderBy: { createdAt: "desc" }, skip: (page - 1) * PAGE_SIZE, take: PAGE_SIZE }),
    prisma.media.count(),
  ]);
  return Response.json({ data: { items: items.map(toDto), total, page, pageSize: PAGE_SIZE } });
});

export const POST = withErrorHandling(async (req) => {
  await requireAdmin();
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    throw new AppError("Envoi de fichiers invalide", 400, "INVALID_FORM");
  }
  const files = form.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);
  if (files.length === 0) throw new AppError("Aucun fichier reçu", 400, "NO_FILE");
  if (files.length > 20) throw new AppError("20 fichiers maximum par envoi", 400, "TOO_MANY_FILES");

  const created = [];
  for (const file of files) {
    created.push(await storeImage(Buffer.from(await file.arrayBuffer()), file.name));
  }
  return Response.json({ data: created.map(toDto) }, { status: 201 });
});
