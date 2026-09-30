import type { Metadata } from "next";
import { PasswordForm, ProfileForm } from "@/components/admin/AccountForms";
import { Panel } from "@/components/admin/PageHeader";
import { requireAdminPage } from "@/lib/session";
import { changePassword, updateProfile } from "./actions";

export const metadata: Metadata = { title: "Mon profil" };

export default async function ProfilePage() {
  const { user } = await requireAdminPage();

  return (
    <div className="grid max-w-3xl gap-4">
      <Panel title="Informations" description="Votre nom apparaît dans le menu ; l'email sert à vous connecter.">
        <ProfileForm action={updateProfile} values={{ name: user.name, email: user.email }} />
      </Panel>
      <Panel title="Mot de passe" description="Changer le mot de passe déconnecte vos autres appareils.">
        <PasswordForm action={changePassword} />
      </Panel>
    </div>
  );
}
