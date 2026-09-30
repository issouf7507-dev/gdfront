"use client";
import { useEffect, useRef, useState } from "react";
import { Eye, EyeOff, KeyRound, Wand2 } from "lucide-react";
import { ROLES, type Role } from "@/lib/roles";
import type { ActionState } from "@/lib/validation/admin";
import { buttonSecondaryClass } from "./styles";
import { Field, FormMessage, SubmitButton, inputClass, useAdminForm } from "./ui";

type FormAction = (prev: ActionState, formData: FormData) => Promise<ActionState>;

// Vide le formulaire après un succès (mots de passe, nouveau compte)
function useResetOnSuccess(state: ActionState) {
  const ref = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (state.success) ref.current?.reset();
  }, [state]);
  return ref;
}

// Mot de passe aléatoire lisible (sans caractères ambigus), 16 caractères
function generatePassword() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
  const values = crypto.getRandomValues(new Uint32Array(16));
  return Array.from(values, (v) => chars[v % chars.length]).join("");
}

function PasswordInput({ id, name, autoComplete, withGenerator = false }: {
  id: string;
  name: string;
  autoComplete: string;
  withGenerator?: boolean;
}) {
  const [visible, setVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const generate = () => {
    if (!inputRef.current) return;
    inputRef.current.value = generatePassword();
    setVisible(true); // l'admin doit pouvoir le lire pour le transmettre
  };

  return (
    <div className="flex gap-2">
      <div className="relative flex-1">
        <input
          ref={inputRef}
          id={id}
          name={name}
          type={visible ? "text" : "password"}
          autoComplete={autoComplete}
          minLength={10}
          required
          className={`${inputClass} pr-12 font-mono`}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Masquer le mot de passe" : "Afficher le mot de passe"}
          className="absolute inset-y-0 right-1 flex w-10 cursor-pointer items-center justify-center text-neutral-400 hover:text-neutral-950"
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
      {withGenerator && (
        <button type="button" onClick={generate} className={`${buttonSecondaryClass} h-auto shrink-0`} title="Générer un mot de passe">
          <Wand2 className="h-4 w-4" /> <span className="hidden sm:inline">Générer</span>
        </button>
      )}
    </div>
  );
}

export function ProfileForm({ action, values }: { action: FormAction; values: { name: string; email: string } }) {
  const { state, onSubmit, pending } = useAdminForm(action);
  const err = state.fieldErrors ?? {};
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nom affiché" name="name" error={err.name}>
          <input id="name" name="name" defaultValue={values.name} required maxLength={100} autoComplete="name" className={inputClass} />
        </Field>
        <Field label="Email de connexion" name="email" error={err.email}>
          <input id="email" name="email" type="email" defaultValue={values.email} required maxLength={200} autoComplete="email" className={inputClass} />
        </Field>
      </div>
      <FormMessage state={state} />
      <SubmitButton pending={pending}>Enregistrer</SubmitButton>
    </form>
  );
}

export function PasswordForm({ action }: { action: FormAction }) {
  const { state, onSubmit, pending } = useAdminForm(action);
  const ref = useResetOnSuccess(state);
  const err = state.fieldErrors ?? {};
  return (
    <form ref={ref} onSubmit={onSubmit} className="space-y-5">
      <Field label="Mot de passe actuel" name="currentPassword" error={err.currentPassword}>
        <PasswordInput id="currentPassword" name="currentPassword" autoComplete="current-password" />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nouveau mot de passe" name="newPassword" error={err.newPassword} hint="10 caractères minimum.">
          <PasswordInput id="newPassword" name="newPassword" autoComplete="new-password" />
        </Field>
        <Field label="Confirmer" name="confirm" error={err.confirm}>
          <PasswordInput id="confirm" name="confirm" autoComplete="new-password" />
        </Field>
      </div>
      <FormMessage state={state} />
      <SubmitButton pending={pending}>Changer le mot de passe</SubmitButton>
    </form>
  );
}

export function NewUserForm({ action }: { action: FormAction }) {
  const { state, onSubmit, pending } = useAdminForm(action);
  const ref = useResetOnSuccess(state);
  const err = state.fieldErrors ?? {};
  return (
    <form ref={ref} onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nom" name="new-name" error={err.name}>
          <input id="new-name" name="name" required maxLength={100} autoComplete="off" className={inputClass} placeholder="Prénom Nom" />
        </Field>
        <Field label="Email" name="new-email" error={err.email}>
          <input id="new-email" name="email" type="email" required maxLength={200} autoComplete="off" className={inputClass} placeholder="prenom@gdcouverture.ci" />
        </Field>
      </div>
      <fieldset>
        <legend className="mb-2 text-sm font-medium text-neutral-700">Rôle</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {(Object.keys(ROLES) as Role[]).map((r) => (
            <label
              key={r}
              className="flex cursor-pointer gap-3 rounded-2xl border border-neutral-200 p-4 transition-colors hover:border-neutral-400 has-checked:border-neutral-950 has-checked:bg-neutral-50"
            >
              <input type="radio" name="role" value={r} defaultChecked={r === "EDITEUR"} className="mt-0.5 h-4 w-4 accent-neutral-950" />
              <span>
                <span className="block text-sm font-medium text-neutral-950">{ROLES[r].label}</span>
                <span className="mt-0.5 block text-xs leading-relaxed text-neutral-500">{ROLES[r].description}</span>
              </span>
            </label>
          ))}
        </div>
        {err.role?.map((e) => <p key={e} className="mt-1.5 text-xs text-red-600">{e}</p>)}
      </fieldset>
      <Field label="Mot de passe provisoire" name="new-password" error={err.password} hint="10 caractères minimum. La personne pourra le changer depuis son profil.">
        <PasswordInput id="new-password" name="password" autoComplete="new-password" withGenerator />
      </Field>
      <FormMessage state={state} />
      <SubmitButton pending={pending}>Créer le compte</SubmitButton>
    </form>
  );
}

// Réinitialisation du mot de passe d'un autre compte (formulaire replié)
export function ResetPasswordForm({ action, userId, userName }: { action: FormAction; userId: string; userName: string }) {
  const { state, onSubmit, pending } = useAdminForm(action);
  const ref = useResetOnSuccess(state);
  const err = state.fieldErrors ?? {};
  return (
    <details className="group/reset">
      <summary className={`${buttonSecondaryClass} h-9 list-none px-4 text-xs [&::-webkit-details-marker]:hidden`}>
        <KeyRound className="h-3.5 w-3.5" /> Mot de passe
      </summary>
      <form ref={ref} onSubmit={onSubmit} className="mt-3 space-y-3 rounded-2xl bg-neutral-50 p-4 ring-1 ring-neutral-950/5">
        <Field label={`Nouveau mot de passe pour ${userName}`} name={`reset-${userId}`} error={err.password}>
          <PasswordInput id={`reset-${userId}`} name="password" autoComplete="new-password" withGenerator />
        </Field>
        <FormMessage state={state} />
        <SubmitButton pending={pending} className="h-9 text-xs">Réinitialiser</SubmitButton>
      </form>
    </details>
  );
}

// Changement de rôle d'un autre compte : enregistré dès la sélection
export function RoleForm({ action, role }: { action: FormAction; role: Role }) {
  const { state, onSubmit, pending } = useAdminForm(action);
  const ref = useRef<HTMLFormElement>(null);
  return (
    <form ref={ref} onSubmit={onSubmit} className="flex flex-col items-start gap-1">
      <select
        name="role"
        defaultValue={role}
        aria-label="Rôle"
        disabled={pending}
        onChange={() => ref.current?.requestSubmit()}
        className={`${inputClass} h-9 w-auto cursor-pointer rounded-full py-0 pl-4 pr-9 text-xs`}
      >
        {(Object.keys(ROLES) as Role[]).map((r) => (
          <option key={r} value={r}>{ROLES[r].label}</option>
        ))}
      </select>
      {state.error && <p role="alert" className="text-xs text-red-600">{state.error}</p>}
    </form>
  );
}
