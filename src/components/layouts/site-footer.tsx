import Link from "next/link";
import Image from "next/image";
import { BrandMark, BRAND_LOGO_SRC } from "@/components/layouts/brand-mark";
import { siteConfig } from "@/constants/site";
import { legal } from "@/constants/legal";
import { cn } from "@/utils/cn";

export type SiteFooterProps = {
  className?: string;
};

type SocialItem = {
  label: string;
  href: string;
  circled?: boolean;
  path: string;
};

/** Inline brand glyphs — Lucide no longer ships social trademarks. */
const socialLinks: SocialItem[] = [
  {
    label: "X",
    href: "https://x.com",
    circled: true,
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.99 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z",
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    path: "M12 2.16c3.2 0 3.58.01 4.85.07 3.12.14 4.58 1.62 4.72 4.72.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.14 3.09-1.6 4.58-4.72 4.72-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.13-.14-4.58-1.63-4.72-4.72-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85C2.57 3.85 4.03 2.37 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95C23.73 2.7 21.31.27 16.95.07 15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z",
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    path: "M23.5 6.2a3 3 0 0 0-2.12-2.12C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.58A3 3 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3 3 0 0 0 2.12 2.12C4.5 20.5 12 20.5 12 20.5s7.5 0 9.38-.58a3 3 0 0 0 2.12-2.12A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8zM9.75 15.5v-7l6.5 3.5-6.5 3.5z",
  },
  {
    label: "TikTok",
    href: "https://tiktok.com",
    path: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.3a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.7a8.27 8.27 0 0 0 4.84 1.55V6.84a4.85 4.85 0 0 1-1.08-.15Z",
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    path: "M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z",
  },
  {
    label: "Twitch",
    href: "https://twitch.tv",
    path: "M11.64 5.64h1.45v4.37h-1.45zm4 0h1.45v4.37h-1.45zM6.18 2 2 6.18v11.64h3.64V22l4.18-4.18h3.28L22 10.91V2zm14.55 8.36-3.28 3.28h-3.27l-2.91 2.91v-2.91H7.27V3.45h13.46z",
  },
  {
    label: "Discord",
    href: "https://discord.com",
    path: "M20.32 4.37A19.8 19.8 0 0 0 15.89 3l-.2.36c1.86.5 2.8 1.17 2.8 1.17A13.1 13.1 0 0 0 12 3.8a13.1 13.1 0 0 0-6.49.73s.99-.72 2.97-1.22L8.2 3A19.5 19.5 0 0 0 3.68 4.37C.96 8.66.22 12.84.5 16.97c1.94 1.44 3.82 2.32 5.64 2.9l1.15-1.9a9.6 9.6 0 0 1-1.74-.9l.42-.33c3.34 1.53 6.96 1.53 10.26 0l.42.33c-.56.36-1.14.66-1.74.9l1.15 1.9c1.82-.58 3.7-1.46 5.64-2.9.35-4.7-.57-8.84-3.38-12.6ZM8.7 14.5c-1.05 0-1.9-.98-1.9-2.18s.83-2.18 1.9-2.18 1.92.98 1.9 2.18c0 1.2-.83 2.18-1.9 2.18Zm6.6 0c-1.05 0-1.9-.98-1.9-2.18s.83-2.18 1.9-2.18 1.92.98 1.9 2.18c0 1.2-.85 2.18-1.9 2.18Z",
  },
];

const legalLinks = [
  { label: "Corporate", href: "/legal/disclaimer" },
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Cookie Settings", href: "/legal/privacy#cookies" },
  { label: "Cookie Policy", href: "/legal/privacy" },
  { label: "Legal", href: "/legal/terms" },
  {
    label: "Do Not Sell or Share My Personal Information",
    href: "/legal/privacy",
  },
] as const;

/**
 * Centered launch-style footer — logo, dispatch pill, socials, legal row.
 */
export function SiteFooter({ className }: SiteFooterProps) {
  const year = new Date().getFullYear();

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
            "group grid w-full max-w-[960px] items-center gap-4 rounded-full border border-white/20",
            "bg-gradient-to-r from-white/[0.06] via-white/[0.03] to-white/[0.06]",
            "px-5 py-4 transition-cinema",
            "hover:border-white/40 hover:from-white/[0.09] hover:to-white/[0.09]",
            "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
            "sm:grid-cols-[auto_minmax(0,1fr)_minmax(0,1.05fr)] sm:gap-6 sm:px-7 sm:py-5",
            "md:gap-8 md:px-9 md:py-5",
          )}
        >
          <span className="flex shrink-0 items-center justify-center sm:justify-start">
            <Image
              src={BRAND_LOGO_SRC}
              alt=""
              width={1024}
              height={576}
              className="h-11 w-auto object-contain sm:h-12"
              aria-hidden
            />
          </span>

          <span className="flex min-w-0 flex-col gap-1 text-center sm:border-r sm:border-white/15 sm:pr-6 sm:text-left md:pr-8">
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-white/55">
              Official fan channel
            </span>
            <span className="font-[family-name:var(--font-family-display)] text-[1.05rem] font-bold uppercase leading-tight tracking-[0.06em] text-white sm:text-lg md:text-[1.35rem]">
              Stay in the loop
            </span>
          </span>

          <span className="min-w-0 text-center text-[0.85rem] leading-relaxed text-white/75 sm:text-left sm:text-[0.9rem] md:text-[0.95rem]">
            Trailers, launch window notes, and exclusive archive drops —
            delivered as they land.
          </span>
        </Link>

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-5 sm:mt-12 sm:gap-7 md:gap-8">
          {socialLinks.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className={cn(
                  "inline-flex items-center justify-center text-white transition-cinema hover:text-[#f7b6c8]",
                  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
                  item.circled
                    ? "size-10 rounded-full bg-white/10 hover:bg-white/16"
                    : "size-8",
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

        <p className="mt-8 max-w-2xl text-center text-[0.7rem] leading-relaxed text-white/40">
          {legal.shortDisclaimer} © {year} {siteConfig.shortName}.
        </p>
      </div>
    </footer>
  );
}
