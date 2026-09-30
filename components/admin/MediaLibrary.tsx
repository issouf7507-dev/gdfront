"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import type { MediaDto } from "@/lib/media-url";
import { UploadButton } from "./MediaPicker";
import { inputClass } from "./ui";

type Item = MediaDto & { size: number; usage: number };

export function MediaLibrary({ items }: { items: Item[] }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const saveAlt = async (id: string, alt: string) => {
    const res = await fetch(`/api/admin/media/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ alt }),
    });
    if (!res.ok) setError("Impossible d'enregistrer le texte alternatif.");
  };

  const remove = async (item: Item) => {
    const warning = item.usage > 0 ? `\nElle est utilisée ${item.usage} fois : elle disparaîtra de ces contenus.` : "";
    if (!window.confirm(`Supprimer définitivement cette image ?${warning}`)) return;
    const res = await fetch(`/api/admin/media/${item.id}`, { method: "DELETE" });
    if (!res.ok) {
      setError("Suppression impossible.");
      return;
    }
    router.refresh();
  };

  return (
    <div className="space-y-4">
      <UploadButton onUploaded={() => router.refresh()} />
      {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
      {items.length === 0 ? (
        <p className="rounded-3xl border border-dashed border-neutral-300 px-6 py-16 text-center text-neutral-500">Aucune image.</p>
      ) : (
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
          {items.map((m) => (
            <li key={m.id} className="overflow-hidden rounded-3xl border border-neutral-200/70 bg-white p-1.5">
              {/* eslint-disable-next-line @next/next/no-img-element -- vignette admin */}
              <img src={m.url} alt={m.alt ?? ""} loading="lazy" className="aspect-square w-full rounded-[20px] object-cover" />
              <div className="space-y-2 px-1.5 pb-2 pt-3">
                <p className="truncate text-xs text-neutral-500" title={m.originalName}>
                  {m.width}×{m.height} · {Math.round(m.size / 1024)} Ko · {m.usage > 0 ? `utilisée ${m.usage}×` : "non utilisée"}
                </p>
                <input
                  defaultValue={m.alt ?? ""}
                  placeholder="Description (SEO)"
                  aria-label="Texte alternatif"
                  maxLength={255}
                  onBlur={(e) => e.target.value !== (m.alt ?? "") && saveAlt(m.id, e.target.value)}
                  className={`${inputClass} rounded-xl px-3 py-2 text-xs`}
                />
                <button type="button" onClick={() => remove(m)} className="inline-flex cursor-pointer items-center gap-1 text-xs text-red-600 hover:underline">
                  <Trash2 className="h-3 w-3" /> Supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
