"use server";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { APIError } from "better-auth/api";
import { auth } from "@/lib/auth";
import { createAdminUser, setAdminPassword } from "@/lib/admin-users";
import { prisma } from "@/lib/prisma";
import { ROLES } from "@/lib/roles";
import { requireAdmin } from "@/lib/session";
import {
  newUserSchema, parseForm, passwordChangeSchema, passwordResetSchema, profileSchema, roleSchema, validationState, type ActionState,
} from "@/lib/validation/admin";

async function emailTaken(email: string, exceptId?: string) {
  const user = await prisma.user.findUnique({ where: { email }, select: { id: true } });
  return Boolean(user && user.id !== exceptId);
}

export async function updateProfile(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const session = await requireAdmin();
  const parsed = parseForm(profileSchema, formData);
  if (!parsed.success) return validationState(parsed.error);

  if (await emailTaken(parsed.data.email, session.user.id)) {
    return { error: "Certains champs sont invalides.", fieldErrors: { email: ["Cet email est déjà utilisé par un autre compte"] } };
  }
  await prisma.user.update({ where: { id: session.user.id }, data: parsed.data });
  revalidatePath("/admin", "layout");
  return { success: "Profil mis à jour." };
}

export async function changePassword(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const parsed = parseForm(passwordChangeSchema, formData);
  if (!parsed.success) return validationState(parsed.error);

  try {
    // Better Auth vérifie le mot de passe actuel et garde la session en cours
    await auth.api.changePassword({
      headers: await headers(),
      body: { currentPassword: parsed.data.currentPassword, newPassword: parsed.data.newPassword, revokeOtherSessions: true },
    });
  } catch (e) {
    if (e instanceof APIError) {
      return { error: "Certains champs sont invalides.", fieldErrors: { currentPassword: ["Mot de passe actuel incorrect"] } };
    }
    throw e;
  }
  return { success: "Mot de passe modifié. Vos autres appareils ont été déconnectés." };
}

export async function createUser(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin("users");
  const parsed = parseForm(newUserSchema, formData);
  if (!parsed.success) return validationState(parsed.error);

  if (await emailTaken(parsed.data.email)) {
    return { error: "Certains champs sont invalides.", fieldErrors: { email: ["Un compte existe déjà avec cet email"] } };
  }
  await createAdminUser(parsed.data.email, parsed.data.password, parsed.data.name, parsed.data.role);
  revalidatePath("/admin/parametres/utilisateurs");
  return {
    success: `Compte ${ROLES[parsed.data.role].label.toLowerCase()} créé pour ${parsed.data.email}. Transmettez-lui son mot de passe de façon sécurisée.`,
  };
}

export async function changeUserRole(userId: string, _prev: ActionState, formData: FormData): Promise<ActionState> {
  const session = await requireAdmin("users");
  // On ne change pas son propre rôle : il reste toujours au moins un administrateur
  if (userId === session.user.id) return { error: "Vous ne pouvez pas modifier votre propre rôle." };
  const parsed = parseForm(roleSchema, formData);
  if (!parsed.success) return validationState(parsed.error);

  const updated = await prisma.user.updateMany({ where: { id: userId }, data: { role: parsed.data.role } });
  if (updated.count === 0) return { error: "Compte introuvable." };
  // Déconnexion : la session suivante portera le nouveau rôle
  await prisma.session.deleteMany({ where: { userId } });
  revalidatePath("/admin/parametres/utilisateurs");
  return { success: `Rôle changé : ${ROLES[parsed.data.role].label}.` };
}

export async function resetUserPassword(userId: string, _prev: ActionState, formData: FormData): Promise<ActionState> {
  const session = await requireAdmin("users");
  if (userId === session.user.id) return { error: "Utilisez « Mon profil » pour changer votre propre mot de passe." };
  const parsed = parseForm(passwordResetSchema, formData);
  if (!parsed.success) return validationState(parsed.error);

  const user = await prisma.user.findUnique({ where: { id: userId }, select: { id: true } });
  if (!user) return { error: "Compte introuvable." };
  await setAdminPassword(userId, parsed.data.password);
  revalidatePath("/admin/parametres/utilisateurs");
  return { success: "Mot de passe réinitialisé. Le compte a été déconnecté." };
}

export async function deleteUser(userId: string) {
  const session = await requireAdmin("users");
  // Ni soi-même, ni le dernier compte : on ne doit jamais perdre l'accès au back-office
  if (userId === session.user.id) return;
  if ((await prisma.user.count()) <= 1) return;
  await prisma.user.deleteMany({ where: { id: userId } }); // sessions et comptes supprimés en cascade
  revalidatePath("/admin/parametres/utilisateurs");
}
