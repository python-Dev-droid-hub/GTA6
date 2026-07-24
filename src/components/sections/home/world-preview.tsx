import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { ScrollReveal } from "@/components/animations/scroll/scroll-reveal";
import { DistrictCard } from "@/components/sections/world/district-card";
import { featuredDistricts } from "@/data/districts";
import type { DistrictPreview } from "@/data/districts";
import { spacing } from "@/constants/design";
import { cn } from "@/utils/cn";

export type WorldPreviewProps = {
  districts?: DistrictPreview[];
  className?: string;
};

/**
 * Atmosphere over WebGL on home — stills + rail. Map tool is Phase 4.
 */
export function WorldPreview({
  districts = featuredDistricts,
  className,
}: WorldPreviewProps) {
  return (
    <section
      id="world"
      className={cn("relative overflow-hidden bg-ink-950", spacing.sectionY, className)}
      aria-labelledby="world-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-sunset opacity-[0.07]"
        aria-hidden="true"
      />

      <Container size="wide" className="relative">
        <ScrollReveal className="flex flex-col gap-10 md:gap-12">
          <div
            data-reveal
            className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <SectionHeading
              headingId="world-heading"
              eyebrow="Vice City"
              title="A city that never cools down"
              description="Beaches, downtown glow, and the keys beyond — peek the districts before the full world tour."
            />
            <ButtonLink href="/world" variant="gradient" size="md" className="shrink-0">
              Explore world
            </ButtonLink>
          </div>

          <ul className="grid gap-6 md:grid-cols-3">
            {districts.map((district) => (
              <li key={district.slug} data-reveal>
                <DistrictCard district={district} />
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </Container>
    </section>
  );
}
