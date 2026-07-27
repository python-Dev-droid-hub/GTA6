import path from "node:path";

/** Slugs from URLs / params — lowercase alphanumeric + hyphens only. */
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isValidContentSlug(slug: string): boolean {
  return SLUG_RE.test(slug);
}

/** Ensure resolved MDX path stays inside the content collection directory. */
export function resolveMdxPath(collectionDir: string, slug: string): string | null {
  if (!isValidContentSlug(slug)) return null;

  const base = path.resolve(collectionDir);
  const filePath = path.resolve(base, `${slug}.mdx`);
  const relative = path.relative(base, filePath);

  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    return null;
  }

  return filePath;
}
