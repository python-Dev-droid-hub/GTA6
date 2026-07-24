import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import {
  ArticleMeta,
  BackLink,
  ContentHero,
} from "@/components/layouts/content-hero";
import { getGuideBySlug, getGuideSlugs } from "@/lib/mdx/guides";
import { buildMetadata } from "@/lib/seo/metadata";
import { spacing } from "@/constants/design";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);
  if (!guide) return {};
  return buildMetadata({
    title: guide.meta.title,
    description: guide.meta.description,
    path: `/guides/${slug}`,
    image: guide.meta.cover,
  });
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);
  if (!guide) notFound();

  return (
    <main>
      <ContentHero
        eyebrow="Guide"
        title={guide.meta.title}
        description={guide.meta.description}
        coverSrc={guide.meta.cover}
        meta={
          <ArticleMeta date={guide.meta.date} tag={guide.meta.category} />
        }
      />
      <Container size="narrow" className={spacing.sectionYTight}>
        <BackLink href="/guides" label="All guides" />
        <article className="prose-vice mt-8">{guide.body}</article>
      </Container>
    </main>
  );
}
