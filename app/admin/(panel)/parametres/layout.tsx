import { PageHeader } from "@/components/admin/PageHeader";
import { SettingsTabs } from "@/components/admin/SettingsTabs";
import { can } from "@/lib/roles";
import { requireAdminPage } from "@/lib/session";

export default async function SettingsLayout({ children }: { children: React.ReactNode }) {
  const { user } = await requireAdminPage();
  const canManageUsers = can(user.role, "users");
  return (
    <>
      <PageHeader eyebrow="Compte" title="Paramètres" description={canManageUsers ? "Votre profil et les personnes qui ont accès au back-office." : "Vos informations de connexion."} />
      <SettingsTabs canManageUsers={canManageUsers} />
      {children}
    </>
  );
}
