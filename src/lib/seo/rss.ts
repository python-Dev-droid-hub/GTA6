import { getAllArticles } from "@/lib/mdx/articles";
import { absoluteUrl, getSiteOrigin } from "@/lib/seo/metadata";
import { siteConfig } from "@/constants/site";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

/** Build RSS 2.0 XML for news articles. */
export function buildRssXml(): string {
  const origin = getSiteOrigin();
  const articles = getAllArticles();
  const items = articles
    .map((article) => {
      const link = absoluteUrl(`/news/${article.slug}`);
      return `
    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${new Date(article.date).toUTCString()}</pubDate>
      <description>${escapeXml(article.description)}</description>
      <category>${escapeXml(article.tag)}</category>
    </item>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.name)} News</title>
    <link>${origin}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${absoluteUrl("/feed.xml")}" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;
}
