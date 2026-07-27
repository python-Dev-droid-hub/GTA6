import Image from "next/image";
import Link from "next/link";
import { cn } from "@/utils/cn";

export type CinemaPosterCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  /** Link target — ignored when `onCtaClick` is set */
  ctaHref?: string;
  /** Button action (e.g. open trailer modal) */
  onCtaClick?: () => void;
  imageSrc: string;
  imageAlt: string;
  figureSrc?: string;
  figureAlt?: string;
  ctaTone?: "pink" | "lime" | "cyan" | "peach";
  eyebrowTone?: "white" | "cyan";
  /** Color treatment for the card chrome / overlays */
  palette?: "default" | "sunset";
  align?: "left" | "right";
  /** Text alignment inside the copy block (defaults to `align`) */
  textAlign?: "left" | "right";
  /** Larger, brighter treatment when overlapping video */
  prominent?: boolean;
  /** Image object-position / scale classes (cover frames only) */
  imageClassName?: string;
  /**
   * cinema = 2.35:1 crop · wide = 16:9 crop ·
   * intrinsic = box height follows image aspect (no crop)
   */
  frame?: "cinema" | "wide" | "intrinsic";
  /** Required for intrinsic frame — natural pixel size */
  imageWidth?: number;
  imageHeight?: number;
  className?: string;
};

/**
 * Rockstar-style wide poster with soft radius + pill CTA.
 */
export function CinemaPosterCard({
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaHref = "#",
  onCtaClick,
  imageSrc,
  imageAlt,
  figureSrc,
  figureAlt = "",
  ctaTone = "pink",
  eyebrowTone = "white",
  palette = "default",
  align = "left",
  textAlign,
  prominent = false,
  imageClassName,
  frame = "cinema",
  imageWidth,
  imageHeight,
  className,
}: CinemaPosterCardProps) {
  const intrinsic =
    frame === "intrinsic" && imageWidth && imageHeight;
  const copyAlign = textAlign ?? align;
  const sunset = palette === "sunset";
  const ctaClassName = cn(
    "pointer-events-auto mt-3 inline-flex items-center gap-2 rounded-full px-4 py-2 sm:mt-4 sm:px-5 sm:py-2.5 md:mt-5 md:px-6 md:py-3",
    "font-display text-[0.7rem] uppercase tracking-[0.12em] text-ink-950 sm:text-xs md:text-sm",
    "transition-cinema hover:brightness-110",
    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
    ctaTone === "pink" && "bg-[#f7b6c8]",
    ctaTone === "lime" && "bg-[#d9ff73]",
    ctaTone === "cyan" && "bg-[#7ef9ff]",
    ctaTone === "peach" && "bg-[#fce1b6]",
    (prominent || sunset) &&
      "shadow-[0_8px_28px_rgba(255,120,100,0.35)]",
  );
  const ctaInner = (
    <>
      {ctaLabel.toLowerCase().includes("watch") ? (
        <span
          className="inline-block border-y-[0.35em] border-l-[0.6em] border-y-transparent border-l-ink-950"
          aria-hidden
        />
      ) : null}
      {ctaLabel}
      {!ctaLabel.toLowerCase().includes("watch") ? (
        <span aria-hidden>→</span>
      ) : null}
    </>
  );

  return (
    <div
      className={cn(
        "mx-auto flex w-full items-center justify-center px-[4vw] md:px-[5vw] lg:px-[6vw]",
        className,
      )}
    >
      <article
        className={cn(
          "relative w-full max-w-[1600px] overflow-hidden",
          sunset ? "bg-[#1a1028]" : "bg-ink-950",
          !intrinsic &&
            (frame === "wide"
              ? "aspect-[2.1/1] min-h-0"
              : "aspect-[2.35/1] min-h-0"),
          "rounded-[1.5rem] sm:rounded-[1.75rem] md:rounded-[2rem] lg:rounded-[2.25rem]",
          sunset
            ? "border border-[#ffb4c8]/35 shadow-[0_28px_90px_rgba(255,100,120,0.22),0_0_0_1px_rgba(255,180,120,0.12)_inset]"
            : prominent
              ? "border border-white/20 shadow-[0_28px_90px_rgba(0,0,0,0.5)]"
              : "border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.55)]",
        )}
      >
        {intrinsic ? (
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={imageWidth}
            height={imageHeight}
            sizes="(max-width: 1024px) 92vw, 1600px"
            quality={100}
            unoptimized
            className={cn(
              "block h-auto w-full",
              (prominent || sunset) &&
                "brightness-[1.08] contrast-[1.06] saturate-[1.28]",
              imageClassName,
            )}
            priority={prominent}
            loading={prominent ? undefined : "lazy"}
          />
        ) : (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 1024px) 92vw, 1600px"
            quality={100}
            unoptimized
            loading="lazy"
            className={cn(
              "object-cover object-[28%_center]",
              (prominent || sunset) &&
                "brightness-[1.08] contrast-[1.06] saturate-[1.28]",
              imageClassName,
            )}
          />
        )}

        {figureSrc ? (
          <div className="pointer-events-none absolute inset-y-[-2%] right-[-1%] z-[1] w-[38%] md:w-[34%]">
            <Image
              src={figureSrc}
              alt={figureAlt}
              fill
              loading="lazy"
              sizes="35vw"
              className={cn(
                "object-cover object-top drop-shadow-[0_18px_40px_rgba(0,0,0,0.5)]",
                prominent && "brightness-110 saturate-120",
              )}
            />
          </div>
        ) : null}

        <div
          className={cn(
            "pointer-events-none absolute inset-0",
            sunset
              ? "bg-gradient-to-t from-[#ff7a5c]/25 via-transparent to-[#2a1450]/20"
              : "bg-gradient-to-t from-ink-950/40 via-transparent to-ink-950/10",
          )}
          aria-hidden
        />
        <div
          className={cn(
            "pointer-events-none absolute inset-0",
            sunset
              ? align === "left"
                ? "bg-gradient-to-r from-[#1a1028]/55 via-[#ff6b8a]/10 to-transparent"
                : "bg-gradient-to-l from-[#ff8c69]/35 via-[#2a1450]/15 to-transparent"
              : align === "left"
                ? "bg-gradient-to-r from-ink-950/70 via-ink-950/25 to-transparent"
                : "bg-gradient-to-l from-ink-950/75 via-ink-950/35 to-transparent",
          )}
          aria-hidden
        />

        <div
          className={cn(
            "absolute inset-0 z-10 flex flex-col",
            "justify-end p-4 sm:p-5",
            "md:justify-center md:p-8 lg:p-10 xl:p-12",
            align === "right" ? "md:items-end" : "md:items-start",
            copyAlign === "right" ? "text-right" : "text-left",
          )}
        >
          <div
            className={cn(
              "flex w-full flex-col",
              sunset
                ? "rounded-xl bg-[#1a1028]/55 p-4 backdrop-blur-sm md:rounded-none md:bg-transparent md:p-0 md:backdrop-blur-none"
                : "rounded-xl bg-ink-950/70 p-4 backdrop-blur-sm md:rounded-none md:bg-transparent md:p-0 md:backdrop-blur-none",
              align === "right"
                ? "md:w-[min(42%,22rem)] lg:w-[min(40%,26rem)] xl:w-[min(38%,28rem)]"
                : "md:w-[min(48%,26rem)] lg:w-[min(42%,30rem)]",
              copyAlign === "left" && "items-start",
              copyAlign === "right" && "items-end",
            )}
          >
            <p
              className={cn(
                "font-mono text-[0.58rem] uppercase tracking-[0.26em] sm:text-[0.62rem] md:text-xs md:tracking-[0.32em]",
                eyebrowTone === "cyan"
                  ? "text-[#7ef9ff]"
                  : sunset
                    ? "text-[#ffd6e0]"
                    : "text-white",
              )}
            >
              {eyebrow}
            </p>
            <h3
              className={cn(
                "mt-1 font-display text-[clamp(1.35rem,4.2vw,2.85rem)] uppercase leading-[0.92] tracking-[0.04em] md:mt-2",
                sunset ? "text-[#fff4d2]" : "text-[#f5efe0]",
              )}
            >
              {title}
            </h3>
            <p
              className={cn(
                "mt-2 max-w-prose text-[0.8rem] leading-relaxed sm:text-sm md:mt-2.5 md:text-[0.95rem]",
                sunset ? "text-white" : "text-white/95",
              )}
            >
              {description}
            </p>
            {onCtaClick ? (
              <button
                type="button"
                onClick={onCtaClick}
                className={ctaClassName}
              >
                {ctaInner}
              </button>
            ) : (
              <Link href={ctaHref} className={ctaClassName}>
                {ctaInner}
              </Link>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}
