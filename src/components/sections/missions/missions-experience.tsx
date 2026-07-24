"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Play, Star } from "lucide-react";
import {
  getMissionsByCategory,
  missionCategories,
  type MissionCategory,
} from "@/data/missions";
import { TrailerModal } from "@/components/ui/trailer-facade";
import { featuredTrailer } from "@/data/trailers";
import { cn } from "@/utils/cn";

function MissionCard({
  mission,
}: {
  mission: ReturnType<typeof getMissionsByCategory>[number];
}) {
  return (
    <article
      className={cn(
        "group relative grid gap-4 overflow-hidden border border-[#ff4fc3]/45 bg-[#0a0812]/90 p-3 sm:grid-cols-[minmax(10rem,14rem)_1fr] sm:gap-5 sm:p-4 lg:grid-cols-[minmax(12rem,16rem)_minmax(0,1fr)_auto_auto] lg:items-center",
        "shadow-[0_0_18px_rgba(255,45,111,0.12)]",
        "transition-[border-color,box-shadow] duration-200 hover:border-[#ff7ad9] hover:shadow-[0_0_24px_rgba(255,79,195,0.28)]",
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[4/3] lg:aspect-[16/11]">
        <Image
          src={mission.imageSrc}
          alt={mission.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, 16rem"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          unoptimized
        />
        <span className="absolute left-0 top-0 bg-[#ff2d6f] px-2.5 py-1 font-[family-name:var(--font-family-orbitron)] text-[10px] font-bold tracking-[0.12em] text-white">
          {mission.number}
        </span>
        <div
          className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[#ff4fc3]/35"
          aria-hidden
        />
      </div>

      <div className="flex min-w-0 flex-col gap-2.5 py-0.5">
        <h3 className="break-words font-[family-name:var(--font-family-bebas)] text-[1.25rem] uppercase leading-none tracking-[0.04em] text-white sm:text-[1.45rem] md:text-[1.7rem]">
          {mission.title}
        </h3>
        <p className="inline-flex items-center gap-1.5 font-[family-name:var(--font-family-orbitron)] text-[10px] uppercase tracking-[0.18em] text-[#ff7ad9]">
          <MapPin className="size-3.5 shrink-0" aria-hidden />
          {mission.location}
        </p>
        <p className="max-w-xl text-[13px] leading-relaxed text-white/70 sm:text-[14px]">
          {mission.summary}
        </p>
        <ul className="mt-1 flex flex-wrap gap-2">
          {mission.tags.map((tag) => (
            <li
              key={tag}
              className="border border-[#ff4fc3]/70 px-2 py-0.5 font-[family-name:var(--font-family-orbitron)] text-[9px] uppercase tracking-[0.16em] text-[#ffb3de]"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-[#ff4fc3]/20 pt-3 sm:col-span-2 lg:col-span-1 lg:border-l lg:border-t-0 lg:px-5 lg:pt-0">
        <p className="font-[family-name:var(--font-family-orbitron)] text-[9px] uppercase tracking-[0.22em] text-[#ff7ad9]">
          Potential Rewards
        </p>
        <ul className="mt-2.5 flex flex-col gap-1.5 font-[family-name:var(--font-family-orbitron)] text-[11px] tracking-[0.06em] text-[#9dffb0] sm:text-[12px]">
          <li>{mission.rewards.cash}</li>
          <li>RP {mission.rewards.rp}</li>
          <li className="inline-flex items-center gap-1.5 text-[#ff7ad9]">
            <Star className="size-3 fill-[#ff7ad9]" aria-hidden />
            {mission.rewards.stars}
          </li>
        </ul>
      </div>

      <div className="flex items-center justify-end sm:col-span-2 lg:col-span-1 lg:pl-2">
        <button
          type="button"
          aria-label={`Preview ${mission.title}`}
          className={cn(
            "inline-flex size-12 items-center justify-center rounded-full border border-[#ff4fc3] text-[#ff7ad9]",
            "shadow-[0_0_14px_rgba(255,79,195,0.35)] transition-[background-color,color,box-shadow] duration-200",
            "hover:bg-[#ff4fc3] hover:text-white hover:shadow-[0_0_20px_rgba(255,79,195,0.55)]",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff4fc3]",
          )}
        >
          <Play className="size-5 fill-current" aria-hidden />
        </button>
      </div>
    </article>
  );
}

export function MissionsExperience() {
  const [active, setActive] = useState<MissionCategory>("all");
  const [trailerOpen, setTrailerOpen] = useState(false);
  const items = useMemo(() => getMissionsByCategory(active), [active]);

  return (
    <div className="relative z-10 flex flex-col gap-10 pb-16 sm:gap-12 sm:pb-20">
      <section className="relative isolate min-h-[min(72vh,34rem)] overflow-hidden sm:min-h-[min(78vh,38rem)]">
        <Image
          src="/images/missions/banner.jpg"
          alt="Neon Vice City waterfront at night"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_40%]"
          unoptimized
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/25"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#07060f] via-transparent to-black/40"
          aria-hidden
        />

        <div className="relative z-10 flex min-h-[min(72vh,34rem)] max-w-2xl flex-col justify-end px-5 pb-12 pt-28 sm:min-h-[min(78vh,38rem)] sm:px-8 sm:pb-16 md:px-12 lg:px-16">
          <p className="font-[family-name:var(--font-family-orbitron)] text-[10px] uppercase tracking-[0.28em] text-[#ff4fc3] sm:tracking-[0.4em] sm:text-[11px]">
            Choose Your Path
          </p>
          <h1
            id="missions-heading"
            className="mt-3 font-[family-name:var(--font-family-bebas)] text-[clamp(2.75rem,12vw,7.5rem)] uppercase leading-[0.88] tracking-[0.02em] text-white"
          >
            Missions
          </h1>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/80 sm:text-base">
            From high-stakes heists to underground deals, every mission shapes
            your legend in Vice City.
          </p>
          <button
            type="button"
            onClick={() => setTrailerOpen(true)}
            className={cn(
              "mt-7 inline-flex w-fit items-center gap-2 border border-[#ff4fc3] px-5 py-3",
              "font-[family-name:var(--font-family-orbitron)] text-[11px] uppercase tracking-[0.2em] text-[#ff9ad0]",
              "shadow-[0_0_16px_rgba(255,79,195,0.35)] transition-[background-color,color] duration-200",
              "hover:bg-[#ff4fc3]/15 hover:text-white",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff4fc3]",
            )}
          >
            <Play className="size-3.5 fill-current" aria-hidden />
            Watch Trailer
          </button>
        </div>
      </section>

      <div className="px-5 sm:px-8 md:px-12 lg:px-16">
        <div
          role="tablist"
          aria-label="Mission categories"
          className={cn(
            "flex gap-0 overflow-x-auto border border-[#ff4fc3]/55 bg-[#08060f]/80",
            "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          )}
        >
          {missionCategories.map((tab, i) => {
            const selected = active === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(tab.id)}
                className={cn(
                  "relative shrink-0 px-4 py-3.5 font-[family-name:var(--font-family-orbitron)] text-[10px] uppercase tracking-[0.16em] sm:px-5 sm:text-[11px]",
                  "transition-[background-color,color] duration-200",
                  "focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#ff4fc3]",
                  i > 0 && "border-l border-[#ff4fc3]/35",
                  selected
                    ? "bg-[#ff2d6f] text-white shadow-[inset_0_0_20px_rgba(255,255,255,0.12)]"
                    : "text-white/75 hover:bg-[#ff4fc3]/10 hover:text-white",
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          className="mt-6 flex flex-col gap-4 sm:mt-8 sm:gap-5"
        >
          {items.length ? (
            items.map((mission) => (
              <MissionCard key={mission.id} mission={mission} />
            ))
          ) : (
            <p className="border border-[#ff4fc3]/30 bg-[#0a0812] px-5 py-8 text-sm text-white/60">
              No missions in this category yet — check back soon.
            </p>
          )}
        </div>

        <aside
          className={cn(
            "mt-12 flex flex-col items-start gap-5 border border-[#ff4fc3]/60 bg-[#0a0812]/90 p-5 sm:mt-14 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:p-6",
            "shadow-[0_0_22px_rgba(255,45,111,0.2)]",
          )}
        >
          <div className="flex items-center gap-4 sm:gap-5">
            <div
              className="relative flex size-16 shrink-0 items-center justify-center sm:size-20"
              aria-hidden
            >
              <span className="absolute inset-0 rounded-full bg-[#ff4fc3]/15 blur-md" />
              <svg
                viewBox="0 0 64 64"
                className="relative size-14 text-[#ff4fc3] sm:size-16"
                fill="none"
              >
                <path
                  d="M32 6c-6 8-14 10-18 18-2 4-2 10 1 14 4 6 12 10 17 20 5-10 13-14 17-20 3-4 3-10 1-14C46 16 38 14 32 6Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="rgba(255,79,195,0.12)"
                />
                <path
                  d="M22 28h6M36 28h6M24 38c3 4 7 5 8 5s5-1 8-5"
                  stroke="#5ad7ff"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M12 44c4-6 8-8 12-8M52 44c-4-6-8-8-12-8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div>
              <p className="font-[family-name:var(--font-family-bebas)] text-[1.6rem] uppercase leading-none tracking-[0.04em] text-[#ff7ad9] sm:text-[1.85rem]">
                More Chaos Awaits
              </p>
              <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-white/70 sm:text-[14px]">
                Explore hundreds of missions, random events, and hidden
                opportunities across Leonida.
              </p>
            </div>
          </div>
          <Link
            href="/world"
            className={cn(
              "inline-flex shrink-0 items-center gap-2 border border-[#ff4fc3] px-5 py-3",
              "font-[family-name:var(--font-family-orbitron)] text-[11px] uppercase tracking-[0.18em] text-[#ff9ad0]",
              "transition-[background-color,color] duration-200 hover:bg-[#ff4fc3]/15 hover:text-white",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff4fc3]",
            )}
          >
            Explore the World
            <span aria-hidden>→</span>
          </Link>
        </aside>
      </div>

      <TrailerModal
        open={trailerOpen}
        onClose={() => setTrailerOpen(false)}
        title={featuredTrailer.title}
        youtubeId={featuredTrailer.youtubeId}
        videoSrc={featuredTrailer.videoSrc}
      />
    </div>
  );
}
