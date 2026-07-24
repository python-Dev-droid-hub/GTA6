import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Glass } from "@/components/ui/glass";
import { ScrollReveal } from "@/components/animations/scroll/scroll-reveal";
import { NewsletterForm } from "@/components/sections/home/newsletter-form";
import { spacing } from "@/constants/design";
import { cn } from "@/utils/cn";

export type NewsletterSectionProps = {
  className?: string;
};

export function NewsletterSection({ className }: NewsletterSectionProps) {
  return (
    <section
      id="newsletter"
      className={cn("relative bg-ink-950", spacing.sectionY, className)}
      aria-labelledby="newsletter-heading"
    >
      <Container size="content">
        <ScrollReveal>
          <div data-reveal>
            <Glass className="flex flex-col gap-8 p-6 sm:p-8 md:p-10" radius="xl">
              <SectionHeading
                headingId="newsletter-heading"
                eyebrow="Signal"
                title="Stay on the frequency"
                description="Launch window shifts, trailer drops, and tool releases — straight to your inbox."
              />
              <NewsletterForm />
            </Glass>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
