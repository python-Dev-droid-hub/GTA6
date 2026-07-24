import { BrandMark } from "@/components/layouts/brand-mark";
import { MobileNav } from "@/components/layouts/mobile-nav";
import { ButtonLink } from "@/components/ui/button-link";
import { homeCollage } from "@/data/home-collage";
import { cn } from "@/utils/cn";

export type SiteHeaderProps = {
  className?: string;
  /** Kept for SiteHeaderWithPath — nav active state lives in the menu drawer */
  pathname?: string;
};

/**
 * Cinema chrome: transparent overlay — crest left, Pre-Order + menu right.
 * Full nav lives in the drawer (all breakpoints).
 */
export function SiteHeader({ className }: SiteHeaderProps) {
  return (
    <header
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-[50]",
        className,
      )}
    >
      <div className="pointer-events-auto flex h-16 items-center justify-between px-4 sm:px-6 md:h-[4.5rem] md:px-8 lg:px-10">
        <BrandMark variant="logo" size="sm" />

        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <ButtonLink
            href={homeCollage.ctaHref}
            variant="primary"
            size="md"
            className="site-header-cta rounded-full bg-[#f7b6c8] px-3 text-[10px] text-ink-950 shadow-none hover:bg-[#ffc9d8] hover:brightness-100 sm:px-5 sm:text-xs md:px-7 md:text-sm"
            {...(homeCollage.ctaExternal
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {homeCollage.ctaLabel}
          </ButtonLink>

          <MobileNav />
        </div>
      </div>
    </header>
  );
}
