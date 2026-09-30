"use client";
import { ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

const label = "text-xs font-medium uppercase tracking-[0.15em] text-neutral-500";
const input =
  "mt-2 h-14 w-full rounded-2xl border border-transparent bg-neutral-100 px-5 text-[15px] text-neutral-950 placeholder:text-neutral-400 transition-colors hover:bg-neutral-50 focus:border-neutral-950 focus:bg-white focus:outline-none";

export function LoginForm({ enterClass }: { enterClass: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setPending(true);
    setError(null);
    const { error } = await authClient.signIn.email({
      email: String(form.get("email")),
      password: String(form.get("password")),
      // Décoché : cookie de session supprimé à la fermeture du navigateur
      rememberMe: form.get("rememberMe") === "on",
    });
    if (error) {
      setError(error.status === 429 ? "Trop de tentatives, patientez une minute." : "Email ou mot de passe incorrect.");
      setPending(false);
      return;
    }
    router.replace("/admin");
    router.refresh();
  };

  return (
    <form onSubmit={onSubmit} className="mt-10 space-y-5">
      <div className={`${enterClass} delay-300`}>
        <label htmlFor="email" className={label}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          placeholder="vous@gdcouverture.ci"
          required
          className={input}
        />
      </div>

      <div className={`${enterClass} delay-[400ms]`}>
        <label htmlFor="password" className={label}>
          Mot de passe
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="••••••••••"
            required
            className={`${input} pr-14`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
            className="absolute bottom-0 right-2 flex h-14 w-10 cursor-pointer items-center justify-center text-neutral-400 transition-colors hover:text-neutral-950"
          >
            {showPassword ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
          </button>
        </div>
      </div>

      <label className={`${enterClass} delay-500 flex w-fit cursor-pointer items-center gap-3 text-sm text-neutral-600`}>
        <input type="checkbox" name="rememberMe" defaultChecked className="h-4 w-4 cursor-pointer accent-neutral-950" />
        Rester connecté
      </label>

      {error && (
        <p role="alert" className="rounded-2xl border border-red-100 bg-red-50 px-5 py-3.5 text-sm text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className={`${enterClass} delay-600 group flex h-14 w-full cursor-pointer items-center justify-between rounded-full bg-neutral-950 pl-7 pr-2 text-[15px] font-medium text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-70`}
      >
        {pending ? "Connexion…" : "Se connecter"}
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-neutral-950 transition-colors group-hover:bg-brand group-hover:text-white">
          {pending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          )}
        </span>
      </button>
    </form>
  );
}
