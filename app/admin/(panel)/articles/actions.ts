"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { revalidatePublicContent } from "@/lib/revalidate";
import { sanitizeArticleHtml } from "@/lib/sanitize";
import { requireAdmin } from "@/lib/session";
import { uniqueSlug } from "@/lib/slug";
import { articleSchema, parseForm, validationState, type ActionState } from "@/lib/validation/admin";

export async function saveArticle(id: string | null, _prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const parsed = parseForm(articleSchema, formData);
  if (!parsed.success) return validationState(parsed.error);
  const { slug: wantedSlug, content, ...fields } = parsed.data;

  const html = sanitizeArticleHtml(content);
  if (fields.status === "PUBLIE" && !html.replace(/<[^>]*>/g, "").trim()) {
    return { error: "Impossible de publier un article vide.", fieldErrors: { content: ["Contenu requis"] } };
  }
  if (fields.coverId && !(await prisma.media.findUnique({ where: { id: fields.coverId }, select: { id: true } }))) {
    return { error: "L'image de couverture n'existe plus. Rechargez la page." };
  }

  const slug = await uniqueSlug(wantedSlug ?? fields.title, async (s) =>
    Boolean(await prisma.article.findFirst({ where: { slug: s, NOT: id ? { id } : undefined }, select: { id: true } })),
  );

  const existing = id
    ? await prisma.article.findUnique({ where: { id }, select: { id: true, publishedAt: true } })
    : null;
  if (id && !existing) return { error: "Article introuvable." };

  // Date de publication fixée au premier passage en « publié »
  const publishedAt =
    fields.status === "PUBLIE" ? (existing?.publishedAt ?? new Date()) : (existing?.publishedAt ?? null);
  const data = { ...fields, slug, content: html, publishedAt };

  const saved = id
    ? await prisma.article.update({ where: { id }, data })
    : await prisma.article.create({ data });

  revalidatePublicContent();
  revalidatePath("/admin/articles");
  if (!id) redirect(`/admin/articles/${saved.id}?created=1`);
  return { success: "Article enregistré." };
}

export async function deleteArticle(id: string) {
  await requireAdmin();
  await prisma.article.deleteMany({ where: { id } });
  revalidatePublicContent();
  revalidatePath("/admin/articles");
  redirect("/admin/articles");
}
