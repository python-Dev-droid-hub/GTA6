import { buildRssXml } from "@/lib/seo/rss";
import { CONTENT_REVALIDATE_SECONDS } from "@/lib/content/publish";

/** Literal required by Next segment config — keep in sync with CONTENT_REVALIDATE_SECONDS. */
export const revalidate = 60;

export function GET() {
  const xml = buildRssXml();
  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": `public, s-maxage=${CONTENT_REVALIDATE_SECONDS}, stale-while-revalidate=86400`,
    },
  });
}
