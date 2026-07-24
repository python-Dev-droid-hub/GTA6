import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/constants/site";
import { cn } from "@/utils/cn";

export const BRAND_LOGO_SRC = "/images/brand/gta6-logo-clear.png";

export type BrandMarkProps = {
  href?: string;
  className?: string;
  compact?: boolean;
  /**
   * logo = full GTA 6 mark (header/footer)
   * crest = compact logo tile
   * wordmark = text-only fallback
   */
  variant?: "wordmark" | "crest" | "logo";
  /** Extra size classes for the image frame */
  size?: "sm" | "md" | "lg" | "xl";
};

const SIZE: Record<NonNullable<BrandMarkProps["size"]>, string> = {
  sm: "h-9 w-auto sm:h-10",
  md: "h-11 w-auto md:h-12",
  lg: "h-16 w-auto sm:h-20 md:h-24",
  xl: "h-24 w-auto sm:h-32 md:h-40",
};

/**
 * Site brand mark — logo asset for header/footer.
 */
export function BrandMark({
  href = "/",
  className,
  compact = false,
  variant = "logo",
  size,
}: BrandMarkProps) {
  if (variant === "wordmark") {
    return (
      <Link
        href={href}
        className={cn(
          "font-display uppercase tracking-[0.18em] text-paper transition-cinema hover:text-vice-pink",
          "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
          compact ? "text-lg" : "text-xl md:text-2xl",
          className,
        )}
      >
        {siteConfig.name}
      </Link>
    );
  }

  const frame =
    size != null
      ? SIZE[size]
      : variant === "crest"
        ? SIZE.sm
        : SIZE.md;

  return (
    <Link
      href={href}
      className={cn(
        "relative inline-flex items-center transition-cinema hover:opacity-90",
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
        className,
      )}
      aria-label={siteConfig.name}
    >
      <Image
        src={BRAND_LOGO_SRC}
        alt="Grand Theft Auto 6"
        width={1024}
        height={576}
        priority={variant === "crest" || variant === "logo"}
        className={cn(frame, "object-contain")}
      />
    </Link>
  );
}
