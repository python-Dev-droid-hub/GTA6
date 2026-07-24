import type { MetadataRoute } from "next";
import { getSiteOrigin, absoluteUrl } from "@/lib/seo/metadata";
import { getAllArticles } from "@/lib/mdx/articles";
import { getCharacterSlugs } from "@/lib/mdx/characters";
import { getLeonidaSlugs } from "@/data/leonida-characters";
import { getGuideSlugs } from "@/lib/mdx/guides";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getSiteOrigin();

  const staticRoutes: MetadataRoute.Sitemap = [
    "/",
    "/characters",
    "/world",
    "/media",
    "/news",
    "/guides",
    "/vehicles",
    "/weapons",
    "/wallpapers",
    "/faq",
    "/tools",
    "/story",
    "/ultimate",
    "/vintage",
    "/search",
    "/tools/map",
    "/tools/release-converter",
    "/tools/fps-calculator",
    "/tools/pc-checker",
    "/legal/disclaimer",
    "/legal/privacy",
    "/legal/terms",
  ].map((path) => ({
    url: `${origin}${path === "/" ? "" : path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" || path === "/news" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.split("/").length <= 2 ? 0.8 : 0.6,
  }));

  const articles: MetadataRoute.Sitemap = getAllArticles().map((article) => ({
    url: absoluteUrl(`/news/${article.slug}`),
    lastModified: new Date(article.date),
    changeFrequency: "monthly",
    priority: 0.7,
    images: [absoluteUrl(article.coverSrc)],
  }));

  const characters: MetadataRoute.Sitemap = [
    ...new Set([...getCharacterSlugs(), ...getLeonidaSlugs()]),
  ].map((slug) => ({
    url: absoluteUrl(`/characters/${slug}`),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  const guides: MetadataRoute.Sitemap = getGuideSlugs().map((slug) => ({
    url: absoluteUrl(`/guides/${slug}`),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  return [...staticRoutes, ...articles, ...characters, ...guides];
}
