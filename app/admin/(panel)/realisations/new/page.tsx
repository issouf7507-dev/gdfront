import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/PageHeader";
import { RealisationForm } from "@/components/admin/RealisationForm";
import { saveRealisation } from "../actions";

export const metadata: Metadata = { title: "Nouvelle réalisation" };

export default function NewRealisationPage() {
  return (
    <>
      <PageHeader back={{ href: "/admin/realisations", label: "Toutes les réalisations" }} title="Nouvelle réalisation" />
      <RealisationForm
        action={saveRealisation.bind(null, null)}
        values={{ title: "", slug: "", location: "", service: "couverture", description: "", completedAt: "", published: false, cover: null, images: [] }}
      />
    </>
  );
}
