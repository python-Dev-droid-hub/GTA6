import Link from "next/link";
import Image from "next/image";
import { BrandMark } from "@/components/layouts/brand-mark";
import { BRAND_LOGO_SRC } from "@/constants/brand";
import { socialLinks } from "@/constants/site";
import { cn } from "@/utils/cn";

export type SiteFooterProps = {
  className?: string;
};

const legalLinks = [
  { label: "Corporate", href: "/legal/corporate" },
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Cookie Settings", href: "/legal/cookie-settings" },
  { label: "Cookie Policy", href: "/legal/cookies" },
  { label: "Legal Advisory", href: "/legal/terms" },
] as const;

/**
 * Centered launch-style footer — logo, dispatch pill, socials, legal row.
 */
export function SiteFooter({ className }: SiteFooterProps) {
  return (
    <footer
      className={cn(
        "relative overflow-hidden bg-[#07080f] text-white",
        className,
      )}
      role="contentinfo"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_0%,rgba(180,40,140,0.18),transparent_60%)]"
        aria-hidden
      />

      <div className="relative mx-auto flex w-full max-w-[1100px] flex-col items-center px-5 pb-10 pt-14 sm:px-8 sm:pb-12 sm:pt-16 md:pt-20">
        <div className="mb-10 flex flex-col items-center sm:mb-12">
          <BrandMark variant="logo" size="xl" />
        </div>

        <Link
          href="/news"
          className={cn(
            "group grid w-full max-w-[960px] grid-cols-[auto_minmax(0,1fr)_minmax(0,1.05fr)] items-center",
            "gap-2.5 rounded-full border border-white/20",
            "bg-gradient-to-r from-white/[0.06] via-white/[0.03] to-white/[0.06]",
            "px-3.5 py-3 transition-cinema",
            "hover:border-white/40 hover:from-white/[0.09] hover:to-white/[0.09]",
            "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
            "sm:gap-6 sm:px-7 sm:py-5",
            "md:gap-8 md:px-9 md:py-5",
          )}
        >
          <span className="flex shrink-0 items-center justify-start">
            <Image
              src={BRAND_LOGO_SRC}
              alt=""
              width={1024}
              height={576}
              loading="lazy"
              className="h-9 w-auto object-contain sm:h-12"
              aria-hidden
            />
          </span>

          <span className="flex min-w-0 flex-col gap-0.5 border-r border-white/15 pr-2.5 text-left sm:gap-1 sm:pr-6 md:pr-8">
            <span className="font-mono text-[0.5rem] uppercase tracking-[0.2em] text-white/55 sm:text-[0.62rem] sm:tracking-[0.28em]">
              Official fan channel
            </span>
            <span className="font-[family-name:var(--font-family-display)] text-[0.82rem] font-bold uppercase leading-tight tracking-[0.04em] text-white sm:text-lg sm:tracking-[0.06em] md:text-[1.35rem]">
              Stay in the loop
            </span>
          </span>

          <span className="min-w-0 text-left text-[0.68rem] leading-snug text-white/75 sm:text-[0.9rem] sm:leading-relaxed md:text-[0.95rem]">
            Trailers, launch window notes, and exclusive archive drops —
            delivered as they land.
          </span>
        </Link>

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:mt-12 sm:gap-5 md:gap-6">
          {socialLinks.map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                title={item.label}
                className={cn(
                  "inline-flex size-10 items-center justify-center rounded-full",
                  "bg-white/10 text-white transition-cinema",
                  "hover:bg-white/16 hover:text-[#f7b6c8]",
                  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
                )}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-5"
                  aria-hidden
                >
                  <path d={item.path} />
                </svg>
              </a>
            </li>
          ))}
        </ul>

        <nav aria-label="Legal" className="mt-10 w-full sm:mt-12">
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[0.8rem] text-white/90 sm:gap-x-7 sm:text-[0.85rem]">
            {legalLinks.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="transition-cinema hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
