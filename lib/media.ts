import "server-only";
import { randomUUID } from "node:crypto";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp, { type Metadata } from "sharp";
import { AppError } from "@/lib/app-error";
import { prisma } from "@/lib/prisma";

export const UPLOAD_DIR = path.resolve(process.env.UPLOAD_DIR ?? "./storage/uploads");

export const MAX_UPLOAD_BYTES = 15 * 1024 * 1024;
const MAX_DIMENSION = 2000;
const ALLOWED_FORMATS = new Set(["jpeg", "png", "webp", "avif", "gif", "tiff", "heif"]);

// Chemin disque sûr : refuse tout ce qui sortirait de UPLOAD_DIR
export function resolveUploadPath(relative: string) {
  const full = path.resolve(UPLOAD_DIR, relative);
  if (!full.startsWith(UPLOAD_DIR + path.sep)) throw new AppError("Chemin invalide", 400, "INVALID_PATH");
  return full;
}

// Convertit en WebP (max 2000 px, orientation EXIF appliquée, métadonnées retirées)
export async function storeImage(buffer: Buffer, originalName: string) {
  if (buffer.byteLength > MAX_UPLOAD_BYTES) {
    throw new AppError("Image trop lourde (15 Mo maximum)", 413, "FILE_TOO_LARGE");
  }

  let meta: Metadata;
  try {
    meta = await sharp(buffer).metadata();
  } catch {
    throw new AppError("Fichier image illisible", 400, "INVALID_IMAGE");
  }
  if (!meta.format || !ALLOWED_FORMATS.has(meta.format)) {
    throw new AppError("Format non supporté (JPEG, PNG, WebP, AVIF)", 400, "INVALID_IMAGE");
  }

  const { data, info } = await sharp(buffer)
    .rotate()
    .resize({ width: MAX_DIMENSION, height: MAX_DIMENSION, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer({ resolveWithObject: true });

  const now = new Date();
  const dir = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, "0")}`;
  const relative = `${dir}/${randomUUID()}.webp`;
  const full = resolveUploadPath(relative);
  await mkdir(path.dirname(full), { recursive: true });
  await writeFile(full, data);

  return prisma.media.create({
    data: {
      path: relative,
      originalName: originalName.slice(0, 255),
      width: info.width,
      height: info.height,
      size: info.size,
    },
  });
}

export async function deleteMedia(id: string) {
  const media = await prisma.media.delete({ where: { id } });
  await unlink(resolveUploadPath(media.path)).catch(() => {});
  return media;
}
