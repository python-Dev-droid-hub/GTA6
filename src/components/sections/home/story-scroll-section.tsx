import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { ScrollReveal } from "@/components/animations/scroll/scroll-reveal";
import { StoryBeatStrip } from "@/components/animations/scroll/story-beat-strip";
import { WorldPeekScene } from "@/components/animations/three/world-peek-scene";
import { storyBeats } from "@/data/story-beats";
import { spacing } from "@/constants/design";
import { cn } from "@/utils/cn";

/**
 * Server section — WebGL stays behind WorldPeekScene (client + dynamic ssr:false).
 */
export function StoryScrollSection({ className }: { className?: string }) {
  return (
    <section
      id="story"
      className={cn(
        "relative overflow-hidden bg-ink-950",
        spacing.sectionY,
        className,
      )}
      aria-labelledby="story-heading"
    >
      <Container size="wide">
        <ScrollReveal className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div data-reveal className="flex flex-col gap-6">
            <SectionHeading
              headingId="story-heading"
              eyebrow="Storytelling"
              title="Scroll the heat"
              description="A spoiler-safe beat strip — narrative temperature without dumping plot."
            />
            <ButtonLink href="/characters" variant="outline" size="md" className="w-fit">
              Full story page
            </ButtonLink>
            <div className="max-w-sm">
              <WorldPeekScene />
              <p className="mt-3 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-paper-faint">
                WebGL island · mounts in view
              </p>
            </div>
          </div>
          <div data-reveal>
            <StoryBeatStrip beats={storyBeats} />
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
