import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import {
  ArticleMeta,
  BackLink,
  ContentHero,
} from "@/components/layouts/content-hero";
import { JsonLd } from "@/components/seo/json-ld";
import {
  getArticleBySlug,
  getArticleSlugs,
} from "@/lib/mdx/articles";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { spacing } from "@/constants/design";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  return buildMetadata({
    title: article.meta.title,
    description: article.meta.description,
    path: `/news/${slug}`,
    image: article.meta.cover,
    imageAlt: article.meta.coverAlt,
    type: "article",
    publishedTime: article.meta.date,
    tags: [article.meta.tag],
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
      <ContentHero
        eyebrow="Article"
        title={article.meta.title}
        description={article.meta.description}
        coverSrc={article.meta.cover}
        coverAlt={article.meta.coverAlt}
        meta={
          <ArticleMeta
            date={article.meta.date}
            tag={article.meta.tag}
            readingMinutes={article.readingMinutes}
          />
        }
      />
      <Container size="narrow" className={spacing.sectionYTight}>
        <BackLink href="/news" label="All news" />
        <article className="prose-vice mt-8">{article.body}</article>
      </Container>
    </main>
  );
}
