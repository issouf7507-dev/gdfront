"use client";
import type { ActionState } from "@/lib/validation/admin";
import { ImageField } from "./ImageField";
import { RichTextEditor } from "./RichTextEditor";
import { Field, FormMessage, SubmitButton, inputClass, useAdminForm } from "./ui";

export type ArticleFormValues = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  seoTitle: string;
  seoDescription: string;
  status: "BROUILLON" | "PUBLIE";
  cover: { id: string; url: string } | null;
};

export function ArticleForm({ action, values }: {
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>;
  values: ArticleFormValues;
}) {
  const { state, onSubmit, pending } = useAdminForm(action);
  const err = state.fieldErrors ?? {};

  return (
    <form onSubmit={onSubmit} className="grid gap-6 xl:grid-cols-3">
      <div className="space-y-6 xl:col-span-2">
        <section className="space-y-4 rounded-3xl border border-neutral-200/70 bg-white p-6">
          <Field label="Titre *" name="title" error={err.title}>
            <input id="title" name="title" defaultValue={values.title} required maxLength={200} className={`${inputClass} text-base`} />
          </Field>
          <Field label="Résumé" name="excerpt" error={err.excerpt} hint="2 ou 3 phrases affichées dans la liste des articles.">
            <textarea id="excerpt" name="excerpt" defaultValue={values.excerpt} rows={3} maxLength={500} className={inputClass} />
          </Field>
          <Field label="Contenu" error={err.content}>
            <RichTextEditor name="content" initialHtml={values.content} />
          </Field>
        </section>
      </div>

      <aside className="space-y-6">
        <section className="space-y-4 rounded-3xl border border-neutral-200/70 bg-white p-6">
          <Field label="Statut" name="status" error={err.status}>
            <select id="status" name="status" defaultValue={values.status} className={inputClass}>
              <option value="BROUILLON">Brouillon</option>
              <option value="PUBLIE">Publié</option>
            </select>
          </Field>
          <FormMessage state={state} />
          <SubmitButton className="w-full" pending={pending}>Enregistrer</SubmitButton>
        </section>

        <section className="space-y-4 rounded-3xl border border-neutral-200/70 bg-white p-6">
          <Field label="Image de couverture">
            <ImageField name="coverId" initial={values.cover} />
          </Field>
          <Field label="Catégorie" name="category" error={err.category}>
            <input id="category" name="category" defaultValue={values.category} maxLength={100} className={inputClass} placeholder="Conseils, Chantiers…" />
          </Field>
        </section>

        <section className="space-y-4 rounded-3xl border border-neutral-200/70 bg-white p-6">
          <h2 className="text-lg font-medium tracking-tight text-neutral-950">Référencement (SEO)</h2>
          <Field label="Adresse (slug)" name="slug" error={err.slug} hint="Vide = générée depuis le titre.">
            <input id="slug" name="slug" defaultValue={values.slug} maxLength={160} className={inputClass} />
          </Field>
          <Field label="Titre SEO" name="seoTitle" error={err.seoTitle} hint="Vide = titre de l'article.">
            <input id="seoTitle" name="seoTitle" defaultValue={values.seoTitle} maxLength={200} className={inputClass} />
          </Field>
          <Field label="Description SEO" name="seoDescription" error={err.seoDescription} hint="Environ 150 caractères. Vide = résumé.">
            <textarea id="seoDescription" name="seoDescription" defaultValue={values.seoDescription} rows={3} maxLength={300} className={inputClass} />
          </Field>
        </section>
      </aside>
    </form>
  );
}
