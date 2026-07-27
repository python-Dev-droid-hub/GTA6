"use client";

import Image from "next/image";
import Link from "next/link";
import { ScrollBeatVideo } from "@/components/animations/hero/scroll-beat-video";
import { StillToScrubReveal } from "@/components/animations/hero/still-to-scrub-reveal";
import {
  getLeonidaStill,
  type LeonidaCharacter,
} from "@/data/leonida-characters";

export type LeonidaCharacterDetailProps = {
  character: LeonidaCharacter;
};

const DEFAULT_CLIP_OFFSET = 0.5;

/**
 * Shared Only-in-Leonida character page template.
 * Feed any `LeonidaCharacter` from `src/data/leonida-characters.ts`.
 *
 * Flow: clip1 (+ name) → intro collage → still→clip2 (+ quote) → closing collage → nav
 */
export function LeonidaCharacterDetail({
  character,
}: LeonidaCharacterDetailProps) {
  const {
    name,
    eyebrow,
    tagline,
    lead,
    bio,
    quotes,
    closing,
    clips,
    next,
    prev,
    heroSrc,
    heroAlt,
  } = character;

  const bike = getLeonidaStill(character, "bike") ?? {
    id: "bike",
    src: heroSrc,
    alt: heroAlt,
  };
  const car = getLeonidaStill(character, "car") ?? bike;
  const bar = getLeonidaStill(character, "bar");
  const boat = getLeonidaStill(character, "boat");
  const rifle = getLeonidaStill(character, "rifle");
  const night = getLeonidaStill(character, "night");
  const clip1 = clips[0];
  const clip2 = clips[1];
  const clip3 = clips[2];

  return (
    <article className="bg-[#07060f] text-white">
      {clip1 ? (
        <ScrollBeatVideo
          id={`${character.slug}-clip-1`}
          videoSrc={clip1.videoSrc}
          posterSrc={clip1.posterSrc}
          posterAlt={clip1.caption ?? `${name} clip`}
          sectionHeight="200vh"
          startOffset={clip1.startOffset ?? DEFAULT_CLIP_OFFSET}
          endEyebrow={eyebrow}
          endTitle={name}
          endTitleFrom={0.58}
          vivid
        />
      ) : null}

      <section
        id={`${character.slug}-intro`}
        className="character-collage relative z-10 isolate bg-[#07060f] px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-14 md:px-10 md:pb-24 md:pt-16 lg:px-16 lg:pb-28 lg:pt-20"
        aria-label={`${name} introduction`}
      >
        <h2 className="sr-only">{name}</h2>

        <div className="character-collage__grid mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 md:col-span-5 lg:col-span-4">
            <div className="grid gap-4 bg-[#0c0b14] px-4 py-5 sm:gap-5 sm:px-5 sm:py-5 lg:px-6 lg:py-6">
              <div>
                <p className="font-[family-name:var(--font-family-orbitron)] text-[9px] uppercase tracking-[0.35em] text-white/30">
                  {eyebrow}
                </p>
                <p className="mt-3 font-[family-name:var(--font-family-display)] text-[clamp(1rem,4.5vw,1.4rem)] font-bold leading-snug text-[#ff7aab] md:text-[clamp(1.05rem,2vw,1.4rem)]">
                  {tagline}
                </p>
              </div>
              <p className="text-[14px] leading-relaxed text-white/80 sm:text-[15px]">
                {lead}
              </p>
            </div>

            <figure className="character-collage__cell character-collage__cell--portrait">
              <Image
                src={bike.src}
                alt={bike.alt}
                width={900}
                height={1200}
                sizes="(max-width: 767px) 100vw, (max-width: 1023px) 42vw, 34vw"
                className="h-auto w-full"
                loading="lazy"
                unoptimized
              />
            </figure>
          </div>

          <figure className="character-collage__cell character-collage__cell--wide md:col-span-7 lg:col-span-8">
            {car.videoSrc ? (
              <video
                className="h-auto w-full"
                src={car.videoSrc}
                poster={car.src}
                muted
                playsInline
                autoPlay
                loop
                preload="none"
                aria-label={car.alt}
              />
            ) : (
              <Image
                src={car.src}
                alt={car.alt}
                width={1600}
                height={900}
                sizes="(max-width: 767px) 100vw, (max-width: 1023px) 58vw, 66vw"
                className="h-auto w-full"
                loading="lazy"
                unoptimized
              />
            )}
          </figure>

          {bar || boat ? (
            <div className="character-collage__pair">
              {bar ? (
                <figure className="character-collage__cell character-collage__cell--bar character-collage__cell--wide">
                  <Image
                    src={bar.src}
                    alt={bar.alt}
                    width={1200}
                    height={900}
                    sizes="(max-width: 767px) 100vw, (max-width: 1023px) 58vw, 58vw"
                    className="h-auto w-full"
                    loading="lazy"
                    unoptimized
                  />
                </figure>
              ) : null}
              {boat ? (
                <figure className="character-collage__cell character-collage__cell--boat character-collage__cell--portrait">
                  <Image
                    src={boat.src}
                    alt={boat.alt}
                    width={900}
                    height={1200}
                    sizes="(max-width: 767px) 100vw, (max-width: 1023px) 42vw, 42vw"
                    className="h-auto w-full"
                    loading="lazy"
                    unoptimized
                  />
                </figure>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>

      {clip2 ? (
        <StillToScrubReveal
          id={`${character.slug}-clip-2`}
          stillSrc={clip2.posterSrc}
          stillAlt={clip2.caption ?? `${name} clip 2`}
          videoSrc={clip2.videoSrc}
          posterSrc={clip2.posterSrc}
          posterAlt={clip2.caption ?? `${name} clip 2`}
          sectionHeight="200vh"
          startOffset={clip2.startOffset ?? 0}
          endEyebrow="Leonida"
          endTitle={quotes[0]}
          endTitleFrom={0.55}
          vivid
        />
      ) : null}

      <section
        id={`${character.slug}-closing`}
        className="character-collage relative z-10 bg-[#07060f] px-4 pb-8 pt-12 sm:px-6 sm:pb-10 sm:pt-16 md:px-10 md:pt-20 lg:px-16 lg:pt-24"
        aria-label={`${name} closing`}
      >
        <div className="character-collage__grid mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 md:col-span-5 lg:col-span-4">
            <div className="grid gap-4 bg-[#0c0b14] px-4 py-5 sm:px-5 sm:py-6 lg:px-6">
              {quotes[1] ? (
                <p className="font-[family-name:var(--font-family-display)] text-[clamp(1rem,4.5vw,1.4rem)] font-bold leading-snug text-[#ff7aab] md:text-[clamp(1.05rem,2vw,1.4rem)]">
                  {quotes[1]}
                </p>
              ) : null}
              {bio.map((p) => (
                <p
                  key={p.slice(0, 28)}
                  className="text-[14px] leading-relaxed text-white/80 sm:text-[15px]"
                >
                  {p}
                </p>
              ))}
            </div>

            {night ? (
              <figure className="character-collage__cell character-collage__cell--portrait">
                <Image
                  src={night.src}
                  alt={night.alt}
                  width={900}
                  height={1200}
                  sizes="(max-width: 767px) 100vw, (max-width: 1023px) 42vw, 34vw"
                  className="h-auto w-full"
                  loading="lazy"
                  unoptimized
                />
              </figure>
            ) : null}
          </div>

          <div className="flex flex-col gap-4 md:col-span-7 lg:col-span-8">
            {rifle ? (
              <figure className="character-collage__cell character-collage__cell--wide">
                <Image
                  src={rifle.src}
                  alt={rifle.alt}
                  width={1600}
                  height={900}
                  sizes="(max-width: 767px) 100vw, (max-width: 1023px) 58vw, 66vw"
                  className="h-auto w-full"
                  loading="lazy"
                  unoptimized
                />
              </figure>
            ) : null}
            {closing ? (
              <p className="max-w-lg px-1 text-[14px] leading-relaxed text-white/65 sm:text-[15px]">
                {closing}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      {/* Optional closing scrub (e.g. Lucia clip 3) */}
      {clip3 ? (
        <ScrollBeatVideo
          id={`${character.slug}-clip-3`}
          videoSrc={clip3.videoSrc}
          posterSrc={clip3.posterSrc}
          posterAlt={clip3.caption ?? `${name} closing clip`}
          sectionHeight="200vh"
          startOffset={clip3.startOffset ?? DEFAULT_CLIP_OFFSET}
        />
      ) : null}

      <nav
        aria-label="Character navigation"
        className="relative z-10 mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-5 py-14 sm:px-8 md:px-12 lg:px-16"
      >
        {prev ? (
          <Link
            href={`/characters/${prev.slug}`}
            className="font-[family-name:var(--font-family-orbitron)] text-[11px] uppercase tracking-[0.28em] text-white/65 transition-colors hover:text-white"
          >
            ← {prev.name}
          </Link>
        ) : (
          <Link
            href="/characters"
            className="font-[family-name:var(--font-family-orbitron)] text-[11px] uppercase tracking-[0.28em] text-white/65 transition-colors hover:text-white"
          >
            ← Characters
          </Link>
        )}
        {next ? (
          <Link
            href={`/characters/${next.slug}`}
            className="font-[family-name:var(--font-family-orbitron)] text-[11px] uppercase tracking-[0.28em] text-white/65 transition-colors hover:text-white"
          >
            {next.name} →
          </Link>
        ) : null}
      </nav>
    </article>
  );
}
