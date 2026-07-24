import { compileMDX } from "next-mdx-remote/rsc";
import { listMdxSlugs, readMdxFile } from "@/lib/mdx/fs";
import { mdxComponents } from "@/components/mdx/mdx-components";
import type { GuideFrontmatter } from "@/types/content";

export type GuidePreview = {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  cover?: string;
};

function assertGuide(data: Record<string, unknown>): GuideFrontmatter {
  return {
    title: String(data.title ?? "Guide"),
    description: String(data.description ?? ""),
    category: String(data.category ?? "General"),
    date: String(data.date ?? ""),
    cover: data.cover ? String(data.cover) : undefined,
    draft: Boolean(data.draft),
  };
}

export function getGuideSlugs(): string[] {
  return listMdxSlugs("guides");
}

export function getAllGuides(): GuidePreview[] {
  return getGuideSlugs()
    .map((slug) => {
      const file = readMdxFile("guides", slug);
      if (!file) return null;
      const meta = assertGuide(file.frontmatter as Record<string, unknown>);
      if (meta.draft) return null;
      return {
        slug,
        title: meta.title,
        description: meta.description,
        category: meta.category,
        date: meta.date,
        cover: meta.cover,
      };
    })
    .filter((g): g is GuidePreview => g !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getGuideBySlug(slug: string) {
  const file = readMdxFile("guides", slug);
  if (!file) return null;
  const meta = assertGuide(file.frontmatter as Record<string, unknown>);
  if (meta.draft) return null;

  const { content: body } = await compileMDX({
    source: file.content,
    components: mdxComponents,
  });

  return { slug, meta, body };
}
