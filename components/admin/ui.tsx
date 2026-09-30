"use client";
import { startTransition, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import type { ActionState } from "@/lib/validation/admin";
import { buttonDangerClass, buttonPrimaryClass } from "./styles";

export { inputClass } from "./styles";

export function Field({
  label,
  name,
  error,
  hint,
  children,
}: {
  label: string;
  name?: string;
  error?: string[];
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-neutral-700">
        {label}
      </label>
      {children}
      {hint && !error?.length && <p className="text-xs text-neutral-400">{hint}</p>}
      {error?.map((e) => (
        <p key={e} className="text-xs text-red-600">
          {e}
        </p>
      ))}
    </div>
  );
}

type FormAction = (prev: ActionState, formData: FormData) => Promise<ActionState>;

// Soumission via onSubmit (et non `action`) : React 19 vide les champs non
// contrôlés après une action de formulaire, ce qui ferait perdre la saisie
// en cas d'erreur de validation.
export function useAdminForm(action: FormAction) {
  const [state, formAction, pending] = useActionState(action, {});
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => formAction(formData));
  };
  return { state, onSubmit, pending };
}

export function SubmitButton({ children, className, pending }: {
  children: React.ReactNode;
  className?: string;
  pending: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(buttonPrimaryClass, "disabled:cursor-wait", className)}
    >
      {pending ? "Enregistrement…" : children}
    </button>
  );
}

export function FormMessage({ state }: { state: ActionState }) {
  if (state.error) {
    return <p role="alert" className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{state.error}</p>;
  }
  if (state.success) {
    return <p role="status" className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{state.success}</p>;
  }
  return null;
}

// Bouton de suppression avec confirmation (action serveur liée à l'élément)
export function DeleteButton({ action, label = "Supprimer", confirmText }: {
  action: () => Promise<void>;
  label?: string;
  confirmText: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!window.confirm(confirmText)) e.preventDefault();
      }}
    >
      <DeleteSubmit label={label} />
    </form>
  );
}

function DeleteSubmit({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={buttonDangerClass}
    >
      {pending ? "Suppression…" : label}
    </button>
  );
}
