import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { ScrollReveal } from "@/components/animations/scroll/scroll-reveal";
import { CharacterCard } from "@/components/sections/characters/character-card";
import { getAllCharacters } from "@/lib/mdx/characters";
import type { CharacterPreview } from "@/data/characters";
import { spacing } from "@/constants/design";
import { cn } from "@/utils/cn";

export type CharactersPreviewProps = {
  characters?: CharacterPreview[];
  className?: string;
};

export function CharactersPreview({
  characters,
  className,
}: CharactersPreviewProps) {
  const items = characters ?? getAllCharacters().slice(0, 3);

  return (
    <section
      id="characters"
      className={cn("relative bg-ink-950", spacing.sectionY, className)}
      aria-labelledby="characters-heading"
    >
      <Container size="wide">
        <ScrollReveal className="flex flex-col gap-10 md:gap-12">
          <div
            data-reveal
            className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <SectionHeading
              headingId="characters-heading"
              eyebrow="Roster"
              title="Meet the cast"
              description="Three faces of the neon coast — full dossiers land in the character hub."
            />
            <ButtonLink
              href="/characters"
              variant="outline"
              size="md"
              className="shrink-0"
            >
              Full roster
            </ButtonLink>
          </div>

          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((character) => (
              <li key={character.slug} data-reveal>
                <CharacterCard character={character} />
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </Container>
    </section>
  );
}
