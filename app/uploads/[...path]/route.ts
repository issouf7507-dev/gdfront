import { readFile } from "node:fs/promises";
import { resolveUploadPath } from "@/lib/media";

// Sert les images uploadées depuis UPLOAD_DIR (les fichiers ajoutés dans
// public/ après le build ne sont pas servis par `next start`).
export async function GET(_req: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const valid =
    path.length > 0 &&
    path.every((segment) => /^[\w-]+(\.webp)?$/.test(segment)) &&
    path.at(-1)!.endsWith(".webp");
  if (!valid) return new Response("Not found", { status: 404 });

  try {
    const file = await readFile(resolveUploadPath(path.join("/")));
    return new Response(new Uint8Array(file), {
      headers: {
        "Content-Type": "image/webp",
        // Nom de fichier unique (UUID) : le contenu ne change jamais
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
