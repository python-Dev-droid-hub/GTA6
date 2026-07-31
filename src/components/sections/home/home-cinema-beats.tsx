"use client";

import { CinemaPosterSection } from "@/components/sections/home/cinema-poster-section";
import { CinemaVideoPosterBeat } from "@/components/sections/home/cinema-video-poster-beat";
import { cinemaBeatById } from "@/data/cinema-beats";
import { cinemaPosters } from "@/data/cinema-posters";
import { cn } from "@/utils/cn";

export type HomeCinemaBeatsProps = {
  className?: string;
};

/**
 * Continues after HeroVideoReveal through blog scrub — then footer.
 */
export function HomeCinemaBeats({ className }: HomeCinemaBeatsProps) {
  const b2 = cinemaBeatById["beat-02"];
  const blogScrub = cinemaBeatById["beat-blog-scrub"];
  const { people, trailer2, blog } = cinemaPosters;

  if (!b2 || !blogScrub) return null;

  return (
    <div className={cn("relative z-10 bg-ink-950", className)}>
      <CinemaVideoPosterBeat
        id="beat-vintage"
        videoHeight="200vh"
        videoFit="cover"
        videoSrc={b2.videoSrc}
        videoPosterSrc={b2.posterSrc}
        videoPosterAlt={b2.posterAlt}
        poster={{
          eyebrow: people.eyebrow,
          title: people.title,
          description: people.description,
          ctaLabel: people.ctaLabel,
          ctaHref: people.ctaHref,
          imageSrc: people.imageSrc,
          imageAlt: people.imageAlt,
          ctaTone: people.ctaTone,
          align: people.align,
          textAlign: people.textAlign,
          eyebrowTone: people.eyebrowTone,
          frame: people.frame,
          imageClassName: people.imageClassName,
        }}
      />

      <CinemaPosterSection
        id="beat-trailer-2"
        className="min-h-0 py-4 md:min-h-0 md:py-6"
        eyebrow={trailer2.eyebrow}
        title={trailer2.title}
        description={trailer2.description}
        ctaLabel={trailer2.ctaLabel}
        imageSrc={trailer2.imageSrc}
        imageAlt={trailer2.imageAlt}
        ctaTone={trailer2.ctaTone}
        align={trailer2.align}
        textAlign={trailer2.textAlign}
        frame={trailer2.frame}
        imageWidth={trailer2.imageWidth}
        imageHeight={trailer2.imageHeight}
        imageClassName={trailer2.imageClassName}
        playClip={trailer2.playClip}
      />

      <CinemaPosterSection
        id="beat-blog"
        className="min-h-0 py-4 md:min-h-0 md:py-6"
        eyebrow={blog.eyebrow}
        title={blog.title}
        description={blog.description}
        ctaLabel={blog.ctaLabel}
        ctaHref={blog.ctaHref}
        imageSrc={blog.imageSrc}
        imageAlt={blog.imageAlt}
        ctaTone={blog.ctaTone}
        align={blog.align}
        textAlign={blog.textAlign}
        frame={blog.frame}
        imageWidth={blog.imageWidth}
        imageHeight={blog.imageHeight}
        imageClassName={blog.imageClassName}
      />

      <CinemaVideoPosterBeat
        id="beat-blog-scrub"
        videoHeight="180vh"
        videoFit="cover"
        scrubEase={0.32}
        videoSrc={blogScrub.videoSrc}
        videoPosterSrc={blogScrub.posterSrc}
        videoPosterAlt={blogScrub.posterAlt}
      />
    </div>
  );
}
