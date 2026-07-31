"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { BrandMark } from "@/components/layouts/brand-mark";
import { MenuPeoplePanel } from "@/components/layouts/menu-people-panel";
import { BannerGameCounter } from "@/components/sections/home/banner-game-counter";
import { ButtonLink } from "@/components/ui/button-link";
import { Icon } from "@/components/ui/icon";
import { homeCollage } from "@/data/home-collage";
import { RELEASE_MENU } from "@/constants/release";
import { siteConfig } from "@/constants/site";
import { cn } from "@/utils/cn";

type MenuLink = {
  label: string;
  href: string;
  chevron?: boolean;
  /** Opens in-menu panel instead of navigating */
  panel?: "people";
};

const menuLinks: MenuLink[] = [
  { label: "Home", href: "/" },
  { label: "Characters", href: "/characters", chevron: true, panel: "people" },
  { label: "Missions", href: "/missions", chevron: true },
  { label: "FAQs", href: "/faq", chevron: true },
  { label: "Blogs", href: "/news", chevron: true },
];

/** Stable id — useId() mismatched across SSR/client under the experience provider tree. */
const PANEL_ID = "site-mobile-nav-panel";

function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex size-11 shrink-0 items-center justify-center rounded-full",
        "bg-white/12 text-white transition-cinema hover:bg-white/20",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
      )}
      aria-label="Close menu"
      onClick={onClick}
    >
      <span className="relative block size-[14px]" aria-hidden>
        <span className="absolute left-0 top-1/2 block h-[1.5px] w-full -translate-y-1/2 rotate-45 bg-current" />
        <span className="absolute left-0 top-1/2 block h-[1.5px] w-full -translate-y-1/2 -rotate-45 bg-current" />
      </span>
    </button>
  );
}

/**
 * Split cinema menu — main links, or People submenu (portrait + roster).
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"main" | "people">("main");
  const pathname = usePathname();

  const closeMenu = () => {
    setOpen(false);
    setView("main");
  };

  useEffect(() => {
    setOpen(false);
    setView("main");
  }, [pathname]);

  useEffect(() => {
    if (!open) {
      setView("main");
      return;
    }
    const html = document.documentElement;
    const prevBody = document.body.style.overflow;
    const prevHtml = html.style.overflow;
    document.body.style.overflow = "hidden";
    html.style.overflow = "hidden";
    html.classList.add("site-menu-open");
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (view === "people") setView("main");
      else closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevBody;
      html.style.overflow = prevHtml;
      html.classList.remove("site-menu-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [open, view]);

  return (
    <div>
      <button
        type="button"
        className={cn(
          "inline-flex h-11 w-11 flex-col items-center justify-center gap-[7px]",
          "rounded-md text-paper transition-cinema hover:text-vice-pink",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        )}
        aria-expanded={open}
        aria-controls={PANEL_ID}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => (open ? closeMenu() : setOpen(true))}
      >
        <span className="block h-[2px] w-6 bg-current" aria-hidden />
        <span className="block h-[2px] w-6 bg-current" aria-hidden />
      </button>

      {open ? (
        <div
          id={PANEL_ID}
          className="site-menu fixed inset-0 z-[60] grid lg:grid-cols-[minmax(0,1.35fr)_minmax(22rem,0.95fr)]"
          role="dialog"
          aria-modal="true"
          aria-label={view === "people" ? "Characters" : "Site menu"}
        >
          {view === "people" ? (
            <MenuPeoplePanel
              onBack={() => setView("main")}
              closeButton={<CloseButton onClick={closeMenu} />}
            />
          ) : (
            <>
              {/* —— Left: single centered launch lockup —— */}
              <aside className="site-menu-showcase relative hidden h-dvh flex-col overflow-hidden lg:flex">
                <div
                  className="pointer-events-none absolute inset-0 site-menu-showcase-glow"
                  aria-hidden
                />

                <div className="relative z-10 flex h-full items-center justify-center px-10 py-12 xl:px-14">
                  <div className="flex w-full max-w-[22rem] flex-col items-center text-center xl:max-w-[24rem]">
                    <BrandMark
                      variant="logo"
                      size="lg"
                      className="mx-auto [&_img]:!h-[clamp(7.5rem,18vh,11rem)] [&_img]:!w-auto"
                    />

                    <p className="mt-4 font-mono text-[0.65rem] uppercase tracking-[0.46em] text-white/70">
                      {siteConfig.name}
                    </p>

                    <span
                      className="mt-7 mb-7 h-px w-16 bg-gradient-to-r from-transparent via-[#ff6fb3]/70 to-transparent"
                      aria-hidden
                    />

                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.4em] text-white/60">
                      {RELEASE_MENU.comingLabel}
                    </p>
                    <p className="mt-2 font-display text-[1.55rem] uppercase tracking-[0.12em] text-white xl:text-[1.7rem]">
                      {RELEASE_MENU.dateLabel}
                    </p>

                    <ButtonLink
                      href={homeCollage.ctaHref}
                      variant="primary"
                      size="lg"
                      className="mt-7 rounded-full bg-[#f7b6c8] px-10 text-ink-950 shadow-none hover:bg-[#ffc9d8] hover:brightness-100"
                      {...(homeCollage.ctaExternal
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {homeCollage.ctaLabel}
                    </ButtonLink>
                    <p className="mt-3 font-mono text-[0.58rem] uppercase tracking-[0.32em] text-white/55">
                      {homeCollage.platformsLabel}
                    </p>

                    <BannerGameCounter
                      showHeader={false}
                      className="mt-9 w-full"
                    />
                  </div>
                </div>
              </aside>

              {/* —— Right: nav rail —— */}
              <div className="relative flex h-dvh flex-col bg-[#080a14] lg:border-l lg:border-white/5">
                <div className="flex items-center justify-between gap-4 px-5 py-5 sm:px-8">
                  <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                    <BrandMark variant="logo" size="sm" />
                    <span
                      className="hidden h-6 w-px shrink-0 bg-white/35 sm:block sm:h-7"
                      aria-hidden
                    />
                    <p className="truncate text-[0.95rem] font-medium tracking-wide text-white sm:text-lg">
                      Grand Theft Auto VI
                    </p>
                  </div>
                  <CloseButton onClick={closeMenu} />
                </div>

                <nav
                  aria-label="Primary"
                  className="flex flex-1 flex-col justify-center overflow-y-auto px-5 py-6 sm:px-8"
                >
                  <ul className="flex flex-col gap-1 sm:gap-2">
                    {menuLinks.map((item) => {
                      const pathOnly = item.href.split("#")[0] || "/";
                      const active =
                        pathOnly === "/"
                          ? pathname === "/"
                          : pathname === pathOnly ||
                            pathname.startsWith(`${pathOnly}/`);

                      if (item.panel === "people") {
                        return (
                          <li key={item.href}>
                            <button
                              type="button"
                              onClick={() => setView("people")}
                              className={cn(
                                "site-menu-link group flex w-full items-center justify-between gap-4",
                                "py-2 sm:py-2.5",
                                "font-[family-name:var(--font-family-display)] font-bold uppercase",
                                "text-[clamp(1.85rem,4.2vw,3.35rem)] leading-[0.92] tracking-[0.02em]",
                                "transition-cinema focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
                                active
                                  ? "site-menu-link--active"
                                  : "site-menu-link--idle",
                              )}
                            >
                              <span>{item.label}</span>
                              <Icon
                                icon={ChevronRight}
                                size={24}
                                strokeWidth={1.5}
                                className="mt-1 shrink-0 text-white/90 opacity-80 transition-cinema group-hover:translate-x-1 group-hover:opacity-100"
                              />
                            </button>
                          </li>
                        );
                      }

                      return (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className={cn(
                              "site-menu-link group flex w-full items-center justify-between gap-4",
                              "py-2 sm:py-2.5",
                              "font-[family-name:var(--font-family-display)] font-bold uppercase",
                              "text-[clamp(1.85rem,4.2vw,3.35rem)] leading-[0.92] tracking-[0.02em]",
                              "transition-cinema focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
                              active
                                ? "site-menu-link--active"
                                : "site-menu-link--idle",
                            )}
                            aria-current={active ? "page" : undefined}
                          >
                            <span>{item.label}</span>
                            {item.chevron ? (
                              <Icon
                                icon={ChevronRight}
                                size={24}
                                strokeWidth={1.5}
                                className="mt-1 shrink-0 text-white/90 opacity-80 transition-cinema group-hover:translate-x-1 group-hover:opacity-100"
                              />
                            ) : null}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                <div className="flex flex-col gap-4 border-t border-white/10 bg-black/20 px-5 py-5 lg:hidden sm:px-8">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <BrandMark variant="logo" size="sm" />
                      <div className="min-w-0">
                        <p className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-white/70">
                          {RELEASE_MENU.comingLabel}
                        </p>
                        <p className="truncate font-display text-base uppercase tracking-[0.08em] text-white sm:text-lg">
                          {RELEASE_MENU.dateLabel}
                        </p>
                      </div>
                    </div>
                    <ButtonLink
                      href={homeCollage.ctaHref}
                      variant="primary"
                      size="md"
                      className="shrink-0 rounded-full bg-[#f7b6c8] px-5 text-ink-950 shadow-none hover:bg-[#ffc9d8] sm:px-7"
                      {...(homeCollage.ctaExternal
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {homeCollage.ctaLabel}
                    </ButtonLink>
                  </div>
                  <BannerGameCounter className="w-full origin-left scale-[0.92]" />
                </div>
              </div>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}
