// URL publique d'une image uploadée (servie par app/uploads/[...path]/route.ts)
export function mediaUrl(media: { path: string } | null | undefined) {
  return media ? `/uploads/${media.path}` : null;
}

export type MediaDto = {
  id: string;
  url: string;
  alt: string | null;
  width: number;
  height: number;
  originalName: string;
};
