import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { CharacterPreview } from "@/data/characters";
import { cn } from "@/utils/cn";

export type CharacterCardProps = {
  character: CharacterPreview;
  className?: string;
};

export function CharacterCard({ character, className }: CharacterCardProps) {
  return (
    <article className={cn("h-full", className)}>
      <Link
        href={`/characters/${character.slug}`}
        className={cn(
          "group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-ink-900",
          "transition-cinema hover:border-neon-cyan focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
        )}
      >
        <span className="relative aspect-[3/4] w-full overflow-hidden">
          <Image
            src={character.portraitSrc}
            alt={character.portraitAlt}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-cinema group-hover:scale-[1.05]"
          />
          <span className="pointer-events-none absolute inset-0 bg-gradient-ink" />
        </span>
        <span className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-5">
          <Badge variant="pink" className="w-fit">
            {character.role}
          </Badge>
          <h3 className="font-display text-2xl uppercase tracking-[0.1em] text-paper">
            {character.name}
          </h3>
          <p className="text-sm text-paper-muted">{character.blurb}</p>
        </span>
      </Link>
    </article>
  );
}
