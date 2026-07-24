import { compileMDX } from "next-mdx-remote/rsc";
import { listMdxSlugs, readMdxFile } from "@/lib/mdx/fs";
import { mdxComponents } from "@/components/mdx/mdx-components";
import type { CharacterFrontmatter } from "@/types/content";
import type { CharacterPreview } from "@/data/characters";

type CharacterListItem = CharacterPreview & { order: number };

function assertCharacter(data: Record<string, unknown>): CharacterFrontmatter {
  return {
    name: String(data.name ?? "Unknown"),
    role: String(data.role ?? "Character"),
    blurb: String(data.blurb ?? ""),
    portrait: String(data.portrait ?? "/images/characters/lucia.jpg"),
    portraitAlt: String(data.portraitAlt ?? ""),
    order: typeof data.order === "number" ? data.order : 99,
    status: data.status ? String(data.status) : undefined,
    affiliations: Array.isArray(data.affiliations)
      ? data.affiliations.map(String)
      : undefined,
    draft: Boolean(data.draft),
  };
}

export function getCharacterSlugs(): string[] {
  return listMdxSlugs("characters");
}

export function getAllCharacters(): CharacterPreview[] {
  return getCharacterSlugs()
    .map((slug) => {
      const file = readMdxFile("characters", slug);
      if (!file) return null;
      const meta = assertCharacter(file.frontmatter as Record<string, unknown>);
      if (meta.draft) return null;
      return {
        slug,
        name: meta.name,
        role: meta.role,
        blurb: meta.blurb,
        portraitSrc: meta.portrait,
        portraitAlt: meta.portraitAlt,
        order: meta.order ?? 99,
      } satisfies CharacterListItem;
    })
    .filter((c): c is CharacterListItem => c !== null)
    .sort((a, b) => a.order - b.order)
    .map(({ order: _o, ...rest }) => rest);
}

export async function getCharacterBySlug(slug: string) {
  const file = readMdxFile("characters", slug);
  if (!file) return null;
  const meta = assertCharacter(file.frontmatter as Record<string, unknown>);
  if (meta.draft) return null;

  const { content: body } = await compileMDX({
    source: file.content,
    components: mdxComponents,
  });

  return { slug, meta, body };
}
