import "server-only";
import { revalidatePath } from "next/cache";

// Pages publiques à régénérer après une modification dans l'admin
export function revalidatePublicContent() {
  revalidatePath("/");
  revalidatePath("/realisations");
  revalidatePath("/realisations/[slug]", "page");
  revalidatePath("/blog");
  revalidatePath("/blog/[slug]", "page");
  revalidatePath("/sitemap.xml");
}
