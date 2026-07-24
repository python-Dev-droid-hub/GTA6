import { CinematicLoop } from "@/components/animations/hero/cinematic-loop";
import { cinemaById } from "@/data/cinema-clips";
import { cn } from "@/utils/cn";

export type HomeCinemaStoryProps = {
  className?: string;
};

/**
 * Full-bleed atmosphere chapters — Leonida-style scroll storytelling (fan copy).
 */
export function HomeCinemaStory({ className }: HomeCinemaStoryProps) {
  const coast = cinemaById["coast-loop"];
  const neon = cinemaById["neon-loop"];
  const heat = cinemaById["heat-loop"];

  if (!coast || !neon || !heat) return null;

  return (
    <div className={cn("flex flex-col", className)}>
      <CinematicLoop
        videoSrc={coast.videoSrc}
        posterSrc={coast.posterSrc}
        posterAlt="Coastline heat haze cinematic plate"
      >
        <div className="max-w-xl">
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-neon-cyan">
            Chapter 01
          </p>
          <h2 className="mt-3 font-display text-3xl uppercase tracking-[0.06em] text-paper sm:text-4xl md:text-5xl lg:text-6xl">
            Neon coast
          </h2>
          <p className="mt-4 text-base leading-relaxed text-paper/85 md:text-lg">
            When the sun drops, the city wakes up hungry. Fan-cut atmosphere
            from public trailer footage — unofficial archive only.
          </p>
        </div>
      </CinematicLoop>

      <CinematicLoop
        videoSrc={neon.videoSrc}
        posterSrc={neon.posterSrc}
        posterAlt="Night neon skyline cinematic plate"
      >
        <div className="ml-auto max-w-xl text-right">
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-vice-pink">
            Chapter 02
          </p>
          <h2 className="mt-3 font-display text-3xl uppercase tracking-[0.06em] text-paper sm:text-4xl md:text-5xl lg:text-6xl">
            After dark
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#ff8a6a] md:text-lg">
            Everyone has something to gain — and more to lose. Scroll the heat;
            the archive keeps moving with you.
          </p>
        </div>
      </CinematicLoop>

      <CinematicLoop
        videoSrc={heat.videoSrc}
        posterSrc={heat.posterSrc}
        posterAlt="Motion and heat cinematic plate"
        aspectClassName="min-h-[60dvh] md:min-h-[75dvh]"
      />
    </div>
  );
}
