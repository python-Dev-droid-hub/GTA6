import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { DistrictPreview } from "@/data/districts";
import { cn } from "@/utils/cn";

const accentBadge = {
  pink: "pink",
  cyan: "cyan",
  gold: "gold",
} as const;

export type DistrictCardProps = {
  district: DistrictPreview;
  className?: string;
};

export function DistrictCard({ district, className }: DistrictCardProps) {
  return (
    <article className={cn("h-full min-w-0", className)}>
      <Link
        href={`/world#${district.slug}`}
        className={cn(
          "group relative block aspect-[16/11] overflow-hidden rounded-lg border border-border",
          "transition-cinema hover:border-vice-pink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
        )}
      >
        <Image
          src={district.imageSrc}
          alt={district.imageAlt}
          fill
          loading="lazy"
          sizes="(max-width: 768px) 85vw, 30vw"
          className="object-cover transition-cinema group-hover:scale-[1.04]"
        />
        <span className="absolute inset-0 bg-gradient-ink" />
        <span className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-5">
          <Badge variant={accentBadge[district.accent]} className="w-fit">
            District
          </Badge>
          <h3 className="font-display text-xl uppercase tracking-[0.1em] text-paper sm:text-2xl">
            {district.name}
          </h3>
          <p className="text-sm text-paper-muted">{district.blurb}</p>
        </span>
      </Link>
    </article>
  );
}
