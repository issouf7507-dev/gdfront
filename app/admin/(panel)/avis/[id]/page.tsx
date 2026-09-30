import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin/PageHeader";
import { TestimonialForm } from "@/components/admin/TestimonialForm";
import { DeleteButton } from "@/components/admin/ui";
import { prisma } from "@/lib/prisma";
import { deleteTestimonial, saveTestimonial } from "../actions";

export const metadata: Metadata = { title: "Modifier l'avis" };

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const t = await prisma.testimonial.findUnique({ where: { id } });
  if (!t) notFound();

  return (
    <>
      <PageHeader
        back={{ href: "/admin/avis", label: "Tous les avis" }}
        title={`Avis de ${t.name}`}
        actions={<DeleteButton action={deleteTestimonial.bind(null, t.id)} confirmText="Supprimer cet avis ?" />}
      />
      <TestimonialForm
        action={saveTestimonial.bind(null, t.id)}
        values={{ name: t.name, role: t.role ?? "", content: t.content, rating: t.rating, position: t.position, published: t.published }}
      />
    </>
  );
}
