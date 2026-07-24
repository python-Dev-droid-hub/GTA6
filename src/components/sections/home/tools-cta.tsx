import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { ScrollReveal } from "@/components/animations/scroll/scroll-reveal";
import { toolsCatalog } from "@/constants/tools";
import { spacing } from "@/constants/design";
import { cn } from "@/utils/cn";

export function ToolsCTA({ className }: { className?: string }) {
  const live = toolsCatalog.filter((t) => t.status === "live").slice(0, 3);

  return (
    <section
      id="tools"
      className={cn("relative bg-ink-900/30", spacing.sectionYTight, className)}
      aria-labelledby="tools-cta-heading"
    >
      <Container size="wide">
        <ScrollReveal className="flex flex-col gap-8">
          <div
            data-reveal
            className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <SectionHeading
              headingId="tools-cta-heading"
              eyebrow="Interactive"
              title="Fan tools"
              description="Map, launch converter, FPS math, and PC heuristics — labeled as unofficial."
            />
            <ButtonLink href="/tools" variant="outline" size="md">
              Open tools hub
            </ButtonLink>
          </div>
          <ul className="grid gap-4 md:grid-cols-3">
            {live.map((tool) => (
              <li key={tool.id} data-reveal>
                <Link
                  href={tool.href}
                  className="flex h-full flex-col gap-2 rounded-lg border border-border bg-surface px-5 py-4 transition-cinema hover:border-vice-pink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                >
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-neon-cyan">
                    {tool.eyebrow}
                  </span>
                  <span className="font-display text-lg uppercase tracking-[0.08em] text-paper">
                    {tool.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </Container>
    </section>
  );
}
