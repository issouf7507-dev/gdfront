"use client";
import { useState } from "react";
import { ArrowDown, ArrowUp, ImagePlus, Trash2 } from "lucide-react";
import type { MediaDto } from "@/lib/media-url";
import { QUOTE_SERVICE_LABELS } from "@/lib/services";
import type { ActionState } from "@/lib/validation/admin";
import { ImageField } from "./ImageField";
import { MediaPicker } from "./MediaPicker";
import { buttonSecondaryClass, iconButtonClass } from "./styles";
import { Field, FormMessage, SubmitButton, inputClass, useAdminForm } from "./ui";

type Kind = "AVANT" | "APRES" | "GALERIE";
type GalleryImage = { mediaId: string; url: string; kind: Kind };

export type RealisationFormValues = {
  title: string;
  slug: string;
  location: string;
  service: string;
  description: string;
  completedAt: string;
  published: boolean;
  cover: { id: string; url: string } | null;
  images: GalleryImage[];
};

const KIND_LABELS: Record<Kind, string> = { AVANT: "Avant", APRES: "Après", GALERIE: "Galerie" };

export function RealisationForm({ action, values }: {
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>;
  values: RealisationFormValues;
}) {
  const { state, onSubmit, pending } = useAdminForm(action);
  const [images, setImages] = useState(values.images);
  const [pickerOpen, setPickerOpen] = useState(false);
  const err = state.fieldErrors ?? {};

  const move = (index: number, delta: number) =>
    setImages((prev) => {
      const next = [...prev];
      const [item] = next.splice(index, 1);
      next.splice(index + delta, 0, item);
      return next;
    });

  const addImages = (items: MediaDto[]) =>
    setImages((prev) => [
      ...prev,
      ...items.filter((m) => !prev.some((p) => p.mediaId === m.id)).map((m) => ({ mediaId: m.id, url: m.url, kind: "GALERIE" as Kind })),
    ]);

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <input type="hidden" name="images" value={JSON.stringify(images.map(({ mediaId, kind }) => ({ mediaId, kind })))} />

      <section className="grid gap-4 rounded-3xl border border-neutral-200/70 bg-white p-6 md:grid-cols-2">
        <div className="md:col-span-2">
          <Field label="Titre *" name="title" error={err.title}>
            <input id="title" name="title" defaultValue={values.title} required maxLength={150} className={inputClass} placeholder="Réfection complète d'une toiture" />
          </Field>
        </div>
        <Field label="Service *" name="service" error={err.service}>
          <select id="service" name="service" defaultValue={values.service} className={inputClass}>
            {Object.entries(QUOTE_SERVICE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </Field>
        <Field label="Lieu" name="location" error={err.location}>
          <input id="location" name="location" defaultValue={values.location} maxLength={150} className={inputClass} placeholder="Cocody, Abidjan" />
        </Field>
        <Field label="Date de fin des travaux" name="completedAt" error={err.completedAt}>
          <input id="completedAt" name="completedAt" type="date" defaultValue={values.completedAt} className={inputClass} />
        </Field>
        <Field label="Adresse de la page (slug)" name="slug" error={err.slug} hint="Laisser vide pour la générer depuis le titre.">
          <input id="slug" name="slug" defaultValue={values.slug} maxLength={160} className={inputClass} />
        </Field>
        <div className="md:col-span-2">
          <Field label="Description *" name="description" error={err.description}>
            <textarea id="description" name="description" defaultValue={values.description} required rows={6} className={inputClass} placeholder="Contexte, travaux réalisés, matériaux utilisés…" />
          </Field>
        </div>
      </section>

      <section className="rounded-3xl border border-neutral-200/70 bg-white p-6">
        <h2 className="mb-1 text-lg font-medium tracking-tight text-neutral-950">Image principale</h2>
        <p className="mb-4 text-sm text-neutral-500">Affichée dans la liste des réalisations.</p>
        <ImageField name="coverId" initial={values.cover} />
      </section>

      <section className="rounded-3xl border border-neutral-200/70 bg-white p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-medium tracking-tight text-neutral-950">Photos du chantier</h2>
            <p className="text-sm text-neutral-500">Indiquez « Avant » / « Après » pour afficher la comparaison sur le site.</p>
          </div>
          <button type="button" onClick={() => setPickerOpen(true)} className={buttonSecondaryClass}>
            <ImagePlus className="h-4 w-4" /> Ajouter des photos
          </button>
        </div>
        {images.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-neutral-300 py-10 text-center text-sm text-neutral-400">Aucune photo pour l&apos;instant.</p>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((img, i) => (
              <li key={img.mediaId} className="overflow-hidden rounded-2xl border border-neutral-200 bg-white p-1.5">
                {/* eslint-disable-next-line @next/next/no-img-element -- aperçu admin */}
                <img src={img.url} alt="" className="aspect-video w-full rounded-xl object-cover" />
                <div className="flex items-center gap-1 pt-1.5">
                  <select
                    aria-label="Type de photo"
                    value={img.kind}
                    onChange={(e) => setImages((prev) => prev.map((p, j) => (j === i ? { ...p, kind: e.target.value as Kind } : p)))}
                    className={`${inputClass} flex-1 py-2`}
                  >
                    {Object.entries(KIND_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                  </select>
                  <button type="button" aria-label="Monter" disabled={i === 0} onClick={() => move(i, -1)} className={iconButtonClass}><ArrowUp className="h-4 w-4" /></button>
                  <button type="button" aria-label="Descendre" disabled={i === images.length - 1} onClick={() => move(i, 1)} className={iconButtonClass}><ArrowDown className="h-4 w-4" /></button>
                  <button type="button" aria-label="Retirer" onClick={() => setImages((prev) => prev.filter((_, j) => j !== i))} className={`${iconButtonClass} text-red-600 hover:bg-red-50 hover:text-red-700`}><Trash2 className="h-4 w-4" /></button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <MediaPicker open={pickerOpen} multiple onClose={() => setPickerOpen(false)} onSelect={addImages} />
      </section>

      <div className="sticky bottom-4 z-10 flex flex-wrap items-center gap-4 rounded-full border border-neutral-200/70 bg-white/90 py-2 pl-6 pr-2 shadow-lg backdrop-blur">
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input type="checkbox" name="published" defaultChecked={values.published} className="h-4 w-4 accent-neutral-950" />
          Publiée sur le site
        </label>
        <div className="flex-1"><FormMessage state={state} /></div>
        <SubmitButton pending={pending}>Enregistrer</SubmitButton>
      </div>
    </form>
  );
}
