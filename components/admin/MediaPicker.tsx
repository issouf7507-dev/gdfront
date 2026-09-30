"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Loader2, Upload, X } from "lucide-react";
import type { MediaDto } from "@/lib/media-url";
import { cn } from "@/lib/utils";
import { buttonPrimaryClass, iconButtonClass } from "./styles";

async function apiError(res: Response) {
  const body = await res.json().catch(() => null);
  return body?.error?.message ?? "Erreur inattendue";
}

export async function uploadImages(files: FileList | File[]): Promise<MediaDto[]> {
  const form = new FormData();
  for (const file of Array.from(files)) form.append("files", file);
  const res = await fetch("/api/admin/media", { method: "POST", body: form });
  if (!res.ok) throw new Error(await apiError(res));
  return (await res.json()).data;
}

// Bouton d'envoi réutilisable (médiathèque, picker)
export function UploadButton({ onUploaded, label = "Envoyer des images" }: {
  onUploaded: (items: MediaDto[]) => void;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    setBusy(true);
    setError(null);
    try {
      onUploaded(await uploadImages(files));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Échec de l'envoi");
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={busy}
        className={buttonPrimaryClass}
      >
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
        {busy ? "Envoi en cours…" : label}
      </button>
      <input ref={inputRef} type="file" accept="image/*" multiple hidden onChange={onChange} />
      {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
    </div>
  );
}

export function MediaPicker({ open, multiple = false, onClose, onSelect }: {
  open: boolean;
  multiple?: boolean;
  onClose: () => void;
  onSelect: (items: MediaDto[]) => void;
}) {
  const [items, setItems] = useState<MediaDto[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<MediaDto[]>([]);

  const load = useCallback(async (p: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/media?page=${p}`);
      if (res.ok) {
        const { data } = await res.json();
        setItems((prev) => (p === 1 ? data.items : [...prev, ...data.items]));
        setTotal(data.total);
        setPage(p);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    setSelected([]);
    load(1);
  }, [open, load]);

  if (!open) return null;

  const toggle = (m: MediaDto) => {
    if (!multiple) {
      onSelect([m]);
      onClose();
      return;
    }
    setSelected((prev) => (prev.some((s) => s.id === m.id) ? prev.filter((s) => s.id !== m.id) : [...prev, m]));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Choisir une image">
      <div className="absolute inset-0 bg-neutral-950/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative flex max-h-[90vh] w-full max-w-4xl flex-col rounded-[28px] bg-white shadow-2xl">
        <div className="flex items-center justify-between gap-4 border-b border-neutral-100 px-6 py-4">
          <h2 className="text-lg font-medium tracking-tight text-neutral-950">Médiathèque</h2>
          <div className="flex items-center gap-3">
            <UploadButton
              label="Envoyer"
              onUploaded={(created) => {
                setItems((prev) => [...created, ...prev]);
                setTotal((t) => t + created.length);
                if (multiple) setSelected((prev) => [...prev, ...created]);
              }}
            />
            <button type="button" onClick={onClose} aria-label="Fermer" className={iconButtonClass}>
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 && (
            <p className="py-12 text-center text-sm text-neutral-500">
              {loading ? "Chargement…" : "Aucune image. Envoyez-en une pour commencer."}
            </p>
          )}
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
            {items.map((m) => {
              const isSelected = selected.some((s) => s.id === m.id);
              return (
                <button
                  type="button"
                  key={m.id}
                  onClick={() => toggle(m)}
                  title={m.originalName}
                  className={cn(
                    "relative aspect-square cursor-pointer overflow-hidden rounded-2xl ring-2 ring-offset-2 transition",
                    isSelected ? "ring-brand" : "ring-transparent hover:ring-neutral-300",
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- vignettes admin */}
                  <img src={m.url} alt={m.alt ?? ""} loading="lazy" className="h-full w-full object-cover" />
                  {isSelected && (
                    <span className="absolute right-1 top-1 rounded-full bg-brand p-0.5 text-white">
                      <Check className="h-3 w-3" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          {items.length < total && (
            <div className="mt-4 text-center">
              <button type="button" onClick={() => load(page + 1)} disabled={loading} className="cursor-pointer text-sm text-neutral-950 underline-offset-4 hover:underline">
                {loading ? "Chargement…" : "Charger plus"}
              </button>
            </div>
          )}
        </div>

        {multiple && (
          <div className="flex items-center justify-end gap-3 border-t border-neutral-100 px-6 py-4">
            <span className="text-sm text-neutral-500">{selected.length} sélectionnée(s)</span>
            <button
              type="button"
              disabled={selected.length === 0}
              onClick={() => {
                onSelect(selected);
                onClose();
              }}
              className={buttonPrimaryClass}
            >
              Ajouter
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
