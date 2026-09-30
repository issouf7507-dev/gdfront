"use client";
import { Field, FormMessage, SubmitButton, inputClass, useAdminForm } from "@/components/admin/ui";
import type { QuoteStatus } from "@/lib/generated/prisma/enums";
import { QUOTE_STATUSES } from "@/lib/quote-status";
import type { ActionState } from "@/lib/validation/admin";

export function QuoteStatusForm({ action, status, notes }: {
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>;
  status: QuoteStatus;
  notes: string;
}) {
  const { state, onSubmit, pending } = useAdminForm(action);

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Field label="Statut" name="status" error={state.fieldErrors?.status}>
        <select id="status" name="status" defaultValue={status} className={inputClass}>
          {QUOTE_STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
      </Field>
      <Field label="Notes internes" name="notes" error={state.fieldErrors?.notes} hint="Visibles uniquement dans l'admin.">
        <textarea id="notes" name="notes" defaultValue={notes} rows={6} className={inputClass} />
      </Field>
      <FormMessage state={state} />
      <SubmitButton className="w-full" pending={pending}>Enregistrer</SubmitButton>
    </form>
  );
}
