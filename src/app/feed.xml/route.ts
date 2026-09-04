import { buildRssXml } from "@/lib/seo/rss";
import { CONTENT_REVALIDATE_SECONDS } from "@/lib/content/publish";

export const revalidate = CONTENT_REVALIDATE_SECONDS;

export function GET() {
  const xml = buildRssXml();
  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": `public, s-maxage=${CONTENT_REVALIDATE_SECONDS}, stale-while-revalidate=86400`,
    },
  });
}
