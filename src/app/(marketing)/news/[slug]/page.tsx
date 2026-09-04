import { notFound } from "next/navigation";
import { ArticleDetail } from "@/components/sections/news/article-detail";
import { JsonLd } from "@/components/seo/json-ld";
import { CONTENT_REVALIDATE_SECONDS } from "@/lib/content/publish";
import {
  getAllArticles,
  getArticleBySlug,
} from "@/lib/mdx/articles";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";

type Props = { params: Promise<{ slug: string }> };

/** ISR so scheduled posts unlock without a full redeploy. */
export const revalidate = CONTENT_REVALIDATE_SECONDS;

/** Only currently live posts at build; scheduled ones generate on first request after publishAt. */
export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { robots: { index: false, follow: false } };
  const seoTags = [
    ...(article.meta.keywords ?? []),
    article.meta.tag,
    article.meta.category,
  ].filter((t): t is string => Boolean(t));

  return buildMetadata({
    title: article.meta.seoTitle ?? article.meta.title,
    description: article.meta.description,
    path: `/news/${slug}`,
    image: article.meta.cover,
    imageAlt: article.meta.coverAlt,
    type: "article",
    publishedTime: article.meta.date,
    tags: [...new Set(seoTags)],
  });
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <main>
      <JsonLd data={articleJsonLd({ slug, meta: article.meta })} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "News", path: "/news" },
          { name: article.meta.title, path: `/news/${slug}` },
        ])}
      />
      <ArticleDetail
        slug={article.slug}
        meta={article.meta}
        body={article.body}
        headings={article.headings}
        readingMinutes={article.readingMinutes}
      />
    </main>
  );
}
