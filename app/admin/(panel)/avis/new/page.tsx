import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/PageHeader";
import { TestimonialForm } from "@/components/admin/TestimonialForm";
import { saveTestimonial } from "../actions";

export const metadata: Metadata = { title: "Nouvel avis" };

export default function NewTestimonialPage() {
  return (
    <>
      <PageHeader back={{ href: "/admin/avis", label: "Tous les avis" }} title="Nouvel avis" />
      <TestimonialForm
        action={saveTestimonial.bind(null, null)}
        values={{ name: "", role: "", content: "", rating: 5, position: 0, published: true }}
      />
    </>
  );
}
