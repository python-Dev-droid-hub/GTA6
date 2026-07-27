import Image from "next/image";
import type { WallpaperRecord } from "@/types/content";
import { cn } from "@/utils/cn";

export type WallpaperGalleryProps = {
  items: WallpaperRecord[];
};

const aspectClass = {
  "16:9": "aspect-video",
  "9:16": "aspect-[9/16]",
  "1:1": "aspect-square",
} as const;

export function WallpaperGallery({ items }: WallpaperGalleryProps) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={item.id} className="flex flex-col gap-3">
          <a
            href={item.src}
            download
            className={cn(
              "group relative block overflow-hidden rounded-lg border border-border bg-ink-900",
              aspectClass[item.aspect],
              "transition-cinema hover:border-vice-pink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
            )}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-cinema group-hover:scale-[1.03]"
            />
          </a>
          <div className="flex items-center justify-between gap-3">
            <p className="font-display text-sm uppercase tracking-[0.1em] text-paper">
              {item.title}
            </p>
            <a
              href={item.src}
              download
              className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-neon-cyan hover:text-paper"
            >
              Download
            </a>
          </div>
        </li>
      ))}
    </ul>
  );
}
