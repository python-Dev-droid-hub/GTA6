import { Container } from "@/components/ui/container";
import { HeroAtmosphere } from "@/components/sections/home/hero-atmosphere";
import { HeroCopy } from "@/components/sections/home/hero-copy";
import { HeroScrollIndicator } from "@/components/sections/home/hero-scroll-indicator";
import { HeroIntroTimeline } from "@/components/animations/hero/hero-intro-timeline";
import { HeroScrollCinema } from "@/components/animations/hero/hero-scroll-cinema";
import { HeroVideoBackdrop } from "@/components/animations/hero/hero-video-backdrop";
import { homeHero } from "@/data/home-hero";
import type { HomeHeroContent } from "@/types/hero";
import { cn } from "@/utils/cn";

export type HeroCinematicProps = {
  content?: HomeHeroContent;
  className?: string;
};

function HeroForeground({
  content,
}: {
  content: HomeHeroContent;
}) {
  return (
    <>
      <HeroAtmosphere />
      <HeroIntroTimeline className="z-10 min-h-dvh w-full justify-end">
        <Container size="wide" className="relative flex flex-1 flex-col">
          <HeroCopy content={content} />
        </Container>
        <HeroScrollIndicator
          targetId={content.scrollTargetId}
          label={content.scrollLabel}
        />
      </HeroIntroTimeline>
    </>
  );
}

/**
 * Hero: scroll-scrub cinema when videoSrc is set; poster-only fallback otherwise.
 * No R3F in this pass.
 */
export function HeroCinematic({
  content = homeHero,
  className,
}: HeroCinematicProps) {
  const { posterSrc, posterAlt, videoSrc, videoWebmSrc, scrubVh } = content;

  if (videoSrc) {
    return (
      <HeroScrollCinema
        className={className}
        posterSrc={posterSrc}
        posterAlt={posterAlt}
        videoSrc={videoSrc}
        videoWebmSrc={videoWebmSrc}
        scrubVh={scrubVh}
      >
        <HeroForeground content={content} />
      </HeroScrollCinema>
    );
  }

  return (
    <section
      className={cn(
        "relative isolate flex min-h-dvh w-full flex-col overflow-hidden bg-ink-950",
        className,
      )}
      aria-labelledby="hero-heading"
    >
      <HeroVideoBackdrop
        posterSrc={posterSrc}
        posterAlt={posterAlt}
      />
      <HeroForeground content={content} />
    </section>
  );
}
