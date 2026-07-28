import type { MetadataRoute } from "next";
import { absoluteUrl, getSiteOrigin } from "@/lib/seo/metadata";
import { getAllArticles } from "@/lib/mdx/articles";
import { getLeonidaSlugs } from "@/data/leonida-characters";
import { blogPosts } from "@/data/blog";

type StaticRoute = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

const STATIC_ROUTES: StaticRoute[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/characters", changeFrequency: "weekly", priority: 0.9 },
  { path: "/missions", changeFrequency: "weekly", priority: 0.85 },
  { path: "/media", changeFrequency: "weekly", priority: 0.8 },
  { path: "/news", changeFrequency: "weekly", priority: 0.85 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.75 },
  { path: "/ultimate", changeFrequency: "monthly", priority: 0.7 },
  { path: "/vintage", changeFrequency: "monthly", priority: 0.7 },
  { path: "/legal/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/legal/terms", changeFrequency: "yearly", priority: 0.3 },
];

/**
 * /sitemap.xml — only live public routes.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getSiteOrigin();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: route.path === "/" ? origin : `${origin}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const articleBySlug = new Map(
    getAllArticles().map((article) => [article.slug, article]),
  );
  for (const post of blogPosts) {
    if (!articleBySlug.has(post.slug)) {
      articleBySlug.set(post.slug, {
        slug: post.slug,
        title: post.title,
        description: post.excerpt,
        date: post.date,
        tag: post.category,
        coverSrc: post.coverSrc,
        coverAlt: post.coverAlt,
      });
    }
  }

  const articles: MetadataRoute.Sitemap = [...articleBySlug.values()].map(
    (article) => ({
      url: absoluteUrl(`/news/${article.slug}`),
      lastModified: article.date ? new Date(article.date) : now,
      changeFrequency: "monthly",
      priority: 0.7,
      images: [absoluteUrl(article.coverSrc)],
    }),
  );

  const characters: MetadataRoute.Sitemap = getLeonidaSlugs().map((slug) => ({
    url: absoluteUrl(`/characters/${slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...characters, ...articles];
}
