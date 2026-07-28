import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { cinemaById } from "@/data/cinema-clips";
import { spacing } from "@/constants/design";
import { cn } from "@/utils/cn";

export type HomeMediaBentoProps = {
  className?: string;
};

/**
 * Media callout grid — trailer + story + archive (fan framing).
 */
export function HomeMediaBento({ className }: HomeMediaBentoProps) {
  const t2 = cinemaById["trailer2-teaser"];
  const pulse = cinemaById["vice-pulse"];
  const chase = cinemaById["chase-cut"];

  if (!t2 || !pulse || !chase) return null;

  return (
    <section
      className={cn("relative bg-ink-950", spacing.sectionY, className)}
      aria-labelledby="media-bento-heading"
    >
      <Container size="wide" className="flex flex-col gap-8">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-neon-cyan">
            Media
          </p>
          <h2
            id="media-bento-heading"
            className="mt-2 font-display text-2xl uppercase tracking-[0.08em] text-paper sm:text-3xl md:text-4xl"
          >
            Watch · Explore · Archive
          </h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Link
            href="#trailer"
            className="group relative min-h-[16rem] overflow-hidden rounded-2xl border border-white/10 md:min-h-[22rem] lg:col-span-2"
          >
            <Image
              src={t2.posterSrc}
              alt=""
              fill
              sizes="100vw"
              loading="lazy"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink-950/85 via-ink-950/40 to-transparent" />
            <div className="relative z-10 flex h-full flex-col justify-end gap-4 p-6 md:p-10">
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-paper-muted">
                Featured cut
              </p>
              <h3 className="font-display text-2xl uppercase tracking-[0.06em] text-paper sm:text-3xl md:text-4xl">
                Trailer 2 plate
              </h3>
              <span className="inline-flex w-fit rounded-full bg-[#f7b6c8] px-6 py-2.5 font-display text-sm uppercase tracking-[0.14em] text-ink-950">
                Watch
              </span>
            </div>
          </Link>

          <article className="relative min-h-[16rem] overflow-hidden rounded-2xl border border-white/10">
            <Image
              src={pulse.posterSrc}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="lazy"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-ink-950/55" />
            <div className="relative z-10 flex h-full flex-col justify-end gap-3 p-6">
              <h3 className="font-display text-2xl uppercase tracking-[0.08em] text-paper">
                Only on the coast
              </h3>
              <ButtonLink href="/characters" variant="outline" size="sm" className="w-fit rounded-full">
                Read more
              </ButtonLink>
            </div>
          </article>

          <article className="relative min-h-[16rem] overflow-hidden rounded-2xl border border-white/10">
            <Image
              src={chase.posterSrc}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="lazy"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-ink-950/55" />
            <div className="relative z-10 flex h-full flex-col justify-end gap-3 p-6">
              <h3 className="font-display text-2xl uppercase tracking-[0.08em] text-paper">
                Media & artwork
              </h3>
              <ButtonLink href="/media" variant="outline" size="sm" className="w-fit rounded-full">
                See all
              </ButtonLink>
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}
