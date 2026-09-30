"use client";
import { useState } from "react";
import { ImagePlus } from "lucide-react";
import type { MediaDto } from "@/lib/media-url";
import { MediaPicker } from "./MediaPicker";

// Champ « image unique » : stocke l'id du média dans un input caché
export function ImageField({ name, initial }: { name: string; initial: Pick<MediaDto, "id" | "url"> | null }) {
  const [media, setMedia] = useState(initial);
  const [open, setOpen] = useState(false);

  return (
    <div>
      <input type="hidden" name={name} value={media?.id ?? ""} />
      {media ? (
        <div className="flex items-start gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element -- aperçu admin */}
          <img src={media.url} alt="" className="h-32 w-48 rounded-2xl border border-neutral-200 object-cover" />
          <div className="flex flex-col gap-2">
            <button type="button" onClick={() => setOpen(true)} className="cursor-pointer text-left text-sm text-neutral-950 underline-offset-4 hover:underline">
              Changer
            </button>
            <button type="button" onClick={() => setMedia(null)} className="cursor-pointer text-left text-sm text-red-600 underline-offset-4 hover:underline">
              Retirer
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex h-32 w-48 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-neutral-300 text-sm text-neutral-500 hover:border-neutral-950 hover:text-neutral-950"
        >
          <ImagePlus className="h-6 w-6" />
          Choisir une image
        </button>
      )}
      <MediaPicker open={open} onClose={() => setOpen(false)} onSelect={([m]) => setMedia(m)} />
    </div>
  );
}
