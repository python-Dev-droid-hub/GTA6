import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { Badge } from "@/components/ui/badge";
import { TrailerFacade } from "@/components/ui/trailer-facade";
import { ScrollReveal } from "@/components/animations/scroll/scroll-reveal";
import { featuredTrailer } from "@/data/trailers";
import type { TrailerSource } from "@/data/trailers";
import { spacing } from "@/constants/design";
import { cn } from "@/utils/cn";

export type TrailerTeaserProps = {
  trailer?: TrailerSource;
  className?: string;
};

/**
 * Why server shell + client facade: section copy/SEO stay RSC;
 * iframe/video only mounts after play intent (Lighthouse + privacy).
 */
export function TrailerTeaser({
  trailer = featuredTrailer,
  className,
}: TrailerTeaserProps) {
  return (
    <section
      id="trailer"
      className={cn("relative bg-ink-950", spacing.sectionY, className)}
      aria-labelledby="trailer-heading"
    >
      <Container size="wide">
        <ScrollReveal className="flex flex-col gap-10 md:gap-12">
          <div data-reveal className="flex flex-col gap-4">
            <Badge variant="pink" className="w-fit">
              Featured
            </Badge>
            <SectionHeading
              headingId="trailer-heading"
              eyebrow="Media"
              title={trailer.title}
              description={trailer.caption}
            />
          </div>

          <div data-reveal>
            <TrailerFacade
              title={trailer.title}
              posterSrc={trailer.posterSrc}
              posterAlt={trailer.posterAlt}
              durationLabel={trailer.durationLabel}
              youtubeId={trailer.youtubeId}
              videoSrc={trailer.videoSrc}
            />
          </div>

          <div data-reveal>
            <ButtonLink href={trailer.hrefAllMedia} variant="outline" size="md">
              View all media
            </ButtonLink>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
