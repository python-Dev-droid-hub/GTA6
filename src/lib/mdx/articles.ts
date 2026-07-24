import { compileMDX } from "next-mdx-remote/rsc";
import readingTime from "reading-time";
import { listMdxSlugs, readMdxFile } from "@/lib/mdx/fs";
import { mdxComponents } from "@/components/mdx/mdx-components";
import type { ArticleFrontmatter } from "@/types/content";
import type { NewsArticlePreview } from "@/data/news";

function assertArticle(data: Record<string, unknown>): ArticleFrontmatter {
  return {
    title: String(data.title ?? "Untitled"),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    tag: String(data.tag ?? "News"),
    cover: String(data.cover ?? "/images/hero-poster.png"),
    coverAlt: String(data.coverAlt ?? ""),
    draft: Boolean(data.draft),
  };
}

export function getArticleSlugs(): string[] {
  return listMdxSlugs("articles");
}

export function getAllArticles(): NewsArticlePreview[] {
  return getArticleSlugs()
    .map((slug) => {
      const file = readMdxFile("articles", slug);
      if (!file) return null;
      const meta = assertArticle(file.frontmatter as Record<string, unknown>);
      if (meta.draft) return null;
      return {
        slug,
        title: meta.title,
        description: meta.description,
        date: meta.date,
        tag: meta.tag,
        coverSrc: meta.cover,
        coverAlt: meta.coverAlt,
      } satisfies NewsArticlePreview;
    })
    .filter((a): a is NewsArticlePreview => a !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getLatestArticles(limit = 3): NewsArticlePreview[] {
  return getAllArticles().slice(0, limit);
}

export async function getArticleBySlug(slug: string) {
  const file = readMdxFile("articles", slug);
  if (!file) return null;
  const meta = assertArticle(file.frontmatter as Record<string, unknown>);
  if (meta.draft) return null;

  const { content: body } = await compileMDX({
    source: file.content,
    components: mdxComponents,
  });

  return {
    slug,
    meta,
    body,
    readingMinutes: Math.max(1, Math.ceil(readingTime(file.content).minutes)),
  };
}
