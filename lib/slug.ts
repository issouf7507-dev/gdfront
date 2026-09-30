export function slugify(input: string) {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " et ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 160);
}

// Ajoute -2, -3… tant que le slug est pris par un autre enregistrement
export async function uniqueSlug(
  base: string,
  exists: (slug: string) => Promise<boolean>,
) {
  const root = slugify(base) || "sans-titre";
  let slug = root;
  for (let i = 2; await exists(slug); i++) slug = `${root}-${i}`;
  return slug;
}
