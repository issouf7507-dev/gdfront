"use client";
import type { ActionState } from "@/lib/validation/admin";
import { Field, FormMessage, SubmitButton, inputClass, useAdminForm } from "./ui";

export type TestimonialFormValues = {
  name: string;
  role: string;
  content: string;
  rating: number;
  position: number;
  published: boolean;
};

export function TestimonialForm({ action, values }: {
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>;
  values: TestimonialFormValues;
}) {
  const { state, onSubmit, pending } = useAdminForm(action);
  const err = state.fieldErrors ?? {};

  return (
    <form onSubmit={onSubmit} className="max-w-2xl space-y-4 rounded-3xl border border-neutral-200/70 bg-white p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nom du client *" name="name" error={err.name}>
          <input id="name" name="name" defaultValue={values.name} required maxLength={100} className={inputClass} />
        </Field>
        <Field label="Fonction / lieu" name="role" error={err.role}>
          <input id="role" name="role" defaultValue={values.role} maxLength={150} className={inputClass} placeholder="Syndic de copropriété, Cocody" />
        </Field>
      </div>
      <Field label="Avis *" name="content" error={err.content}>
        <textarea id="content" name="content" defaultValue={values.content} required rows={5} maxLength={2000} className={inputClass} />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Note" name="rating" error={err.rating}>
          <select id="rating" name="rating" defaultValue={values.rating} className={inputClass}>
            {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{"★".repeat(n)} ({n}/5)</option>)}
          </select>
        </Field>
        <Field label="Ordre d'affichage" name="position" error={err.position} hint="Les plus petits nombres s'affichent en premier.">
          <input id="position" name="position" type="number" min={0} defaultValue={values.position} className={inputClass} />
        </Field>
      </div>
      <label className="flex cursor-pointer items-center gap-2 text-sm">
        <input type="checkbox" name="published" defaultChecked={values.published} className="h-4 w-4 accent-neutral-950" />
        Afficher sur le site
      </label>
      <FormMessage state={state} />
      <SubmitButton pending={pending}>Enregistrer</SubmitButton>
    </form>
  );
}
