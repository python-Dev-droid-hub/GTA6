import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { ScrollReveal } from "@/components/animations/scroll/scroll-reveal";
import { ArticleCard } from "@/components/sections/news/article-card";
import { getLatestArticles } from "@/lib/mdx/articles";
import type { NewsArticlePreview } from "@/data/news";
import { spacing } from "@/constants/design";
import { cn } from "@/utils/cn";

export type NewsPreviewProps = {
  articles?: NewsArticlePreview[];
  className?: string;
};

export function NewsPreview({ articles, className }: NewsPreviewProps) {
  const items = articles ?? getLatestArticles(3);

  return (
    <section
      id="news"
      className={cn("relative bg-ink-900/40", spacing.sectionY, className)}
      aria-labelledby="news-heading"
    >
      <Container size="wide">
        <ScrollReveal className="flex flex-col gap-10 md:gap-12">
          <div
            data-reveal
            className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <SectionHeading
              headingId="news-heading"
              eyebrow="Dispatch"
              title="Featured news"
              description="Fresh reads from the coast — trailers, world notes, and cast chatter."
            />
            <ButtonLink href="/news" variant="outline" size="md" className="shrink-0">
              All articles
            </ButtonLink>
          </div>

          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((article) => (
              <li key={article.slug} data-reveal>
                <ArticleCard article={article} />
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </Container>
    </section>
  );
}
