import { compileMDX } from "next-mdx-remote/rsc";
import readingTime from "reading-time";
import { listMdxSlugs, readMdxFile } from "@/lib/mdx/fs";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { isContentPublished } from "@/lib/content/publish";
import type { ArticleFrontmatter, ArticleHeading } from "@/types/content";
import type { NewsArticlePreview } from "@/data/news";
import { slugify } from "@/utils/slugify";

function assertArticle(data: Record<string, unknown>): ArticleFrontmatter {
  const keywords = Array.isArray(data.keywords)
    ? data.keywords.map((k) => String(k))
    : undefined;

  return {
    title: String(data.title ?? "Untitled"),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    tag: String(data.tag ?? "News"),
    cover: String(data.cover ?? "/images/hero-poster.png"),
    coverAlt: String(data.coverAlt ?? ""),
    seoTitle: data.seoTitle ? String(data.seoTitle) : undefined,
    category: data.category ? String(data.category) : undefined,
    keywords,
    draft: Boolean(data.draft),
    publishAt: data.publishAt ? String(data.publishAt) : undefined,
  };
}

/** Pull ## / ### headings for TOC — skips fenced code blocks. */
export function extractArticleHeadings(content: string): ArticleHeading[] {
  const headings: ArticleHeading[] = [];
  let inCode = false;

  for (const line of content.split("\n")) {
    if (line.trimStart().startsWith("```")) {
      inCode = !inCode;
      continue;
    }
    if (inCode) continue;

    const match = /^(#{2,3})\s+(.+)$/.exec(line);
    if (!match) continue;

    const level = match[1].length as 2 | 3;
    const text = match[2].replace(/\s+#+\s*$/, "").trim();
    if (!text) continue;

    headings.push({ id: slugify(text), text, level });
  }

  return headings;
}

export function getArticleSlugs(): string[] {
  return listMdxSlugs("articles");
}

export function getAllArticles(now: Date = new Date()): NewsArticlePreview[] {
  return getArticleSlugs()
    .map((slug) => {
      const file = readMdxFile("articles", slug);
      if (!file) return null;
      const meta = assertArticle(file.frontmatter as Record<string, unknown>);
      if (!isContentPublished(meta, now)) return null;
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

export function getLatestArticles(limit = 3, now: Date = new Date()) {
  return getAllArticles(now).slice(0, limit);
}

export async function getArticleBySlug(slug: string, now: Date = new Date()) {
  const file = readMdxFile("articles", slug);
  if (!file) return null;
  const meta = assertArticle(file.frontmatter as Record<string, unknown>);
  if (!isContentPublished(meta, now)) return null;

  const headings = extractArticleHeadings(file.content);

  const { content: body } = await compileMDX({
    source: file.content,
    components: mdxComponents,
  });

  return {
    slug,
    meta,
    body,
    headings,
    readingMinutes: Math.max(1, Math.ceil(readingTime(file.content).minutes)),
  };
}
