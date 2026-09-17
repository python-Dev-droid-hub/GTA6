import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Cookie Settings",
  description:
    "Cookie Settings for Grand Theft Auto City — review cookie categories and manage your preferences.",
  path: "/legal/cookie-settings",
});

const sectionTitle =
  "font-[family-name:var(--font-family-display)] text-xl font-bold uppercase tracking-[0.04em] text-paper sm:text-2xl";
const body = "mt-3 text-[15px] leading-relaxed text-paper-muted sm:text-base";
const statusAlways =
  "mt-2 inline-flex font-mono text-[10px] uppercase tracking-[0.2em] text-vice-pink";
const statusOptional =
  "mt-2 inline-flex font-mono text-[10px] uppercase tracking-[0.2em] text-neon-cyan";
const bullet = "mt-4 list-disc space-y-1.5 pl-5 marker:text-vice-pink";

export default function CookieSettingsPage() {
  return (
    <main className="relative isolate bg-ink-950 pb-20 pt-10 sm:pb-28 sm:pt-14">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[22rem] bg-[radial-gradient(ellipse_at_top,rgba(255,45,111,0.1),transparent_55%)]"
        aria-hidden
      />

      <Container size="content" className="relative">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-paper-faint">
            <li>
              <Link href="/" className="transition-colors hover:text-neon-cyan">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link
                href="/legal/terms"
                className="transition-colors hover:text-neon-cyan"
              >
                Legal
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-paper-muted">Cookie Settings</li>
          </ol>
        </nav>

        <header className="max-w-3xl border-b border-border pb-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-vice-pink">
            Legal
          </p>
          <h1 className="mt-3 font-display text-[clamp(2rem,5vw,3.25rem)] uppercase leading-[0.95] tracking-[0.04em] text-paper">
            Cookie Settings
          </h1>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-paper-faint">
            Last Updated: September 17, 2026
          </p>
          <p className="mt-6 text-base leading-relaxed text-paper-muted sm:text-lg">
            Grand Theft Auto City uses cookies and similar technologies to help
            operate our website, remember preferences, understand website usage,
            and, where applicable, support advertising and other third-party
            services.
          </p>
          <p className="mt-4 text-base leading-relaxed text-paper-muted sm:text-lg">
            Grand Theft Auto City is affiliated with Rockstar Games in accordance
            with the applicable authorization or agreement between the parties.
          </p>
        </header>

        <div className="mt-10 max-w-3xl space-y-10 sm:mt-12 sm:space-y-12">
          <section aria-labelledby="settings-essential">
            <h2 id="settings-essential" className={sectionTitle}>
              Essential Cookies
            </h2>
            <p className={statusAlways}>Status: Always Active</p>
            <p className={body}>
              Essential cookies may be required for website functionality,
              security, navigation, session management, and other services
              requested by visitors.
            </p>
            <p className={body}>
              Because these cookies may be necessary for the website to function,
              they may not be disabled through our cookie preference tool.
            </p>
          </section>

          <section aria-labelledby="settings-preference">
            <h2 id="settings-preference" className={sectionTitle}>
              Preference Cookies
            </h2>
            <p className={statusOptional}>Status: Optional</p>
            <p className={body}>
              Preference cookies help us remember choices you make while using
              our website.
            </p>
            <p className={body}>
              You can choose whether to allow these cookies where our consent
              system provides this option.
            </p>
          </section>

          <section aria-labelledby="settings-analytics">
            <h2 id="settings-analytics" className={sectionTitle}>
              Analytics Cookies
            </h2>
            <p className={statusOptional}>Status: Optional</p>
            <p className={body}>
              Analytics cookies help us understand website traffic and visitor
              interactions.
            </p>
            <p className={body}>
              The information collected may help us improve website performance,
              content, navigation, and user experience.
            </p>
          </section>

          <section aria-labelledby="settings-advertising">
            <h2 id="settings-advertising" className={sectionTitle}>
              Advertising Cookies
            </h2>
            <p className={statusOptional}>Status: Optional</p>
            <p className={body}>
              Where advertising technologies are used, advertising cookies may
              help measure advertisements, understand advertising performance, or
              personalize advertising where permitted.
            </p>
            <p className={body}>
              These technologies may involve third-party providers.
            </p>
          </section>

          <section aria-labelledby="settings-affiliation">
            <h2 id="settings-affiliation" className={sectionTitle}>
              Rockstar Games Affiliation
            </h2>
            <p className={body}>
              Our affiliation with Rockstar Games does not mean that cookies or
              tracking technologies used on Grand Theft Auto City are
              automatically operated by Rockstar Games.
            </p>
            <p className={body}>
              Any third-party services used on our website may have their own
              privacy and cookie policies.
            </p>
          </section>

          <section aria-labelledby="settings-choices">
            <h2 id="settings-choices" className={sectionTitle}>
              Your Cookie Choices
            </h2>
            <p className={body}>
              Depending on your location and applicable law, you may be able to:
            </p>
            <ul className={`${body} ${bullet}`}>
              <li>Accept all available cookies</li>
              <li>Reject optional cookies</li>
              <li>Customize your cookie preferences</li>
              <li>Change your preferences later</li>
              <li>Delete cookies through your browser settings</li>
            </ul>
            <p className={body}>
              Available options may vary depending on your location, device,
              browser, and applicable privacy requirements.
            </p>
          </section>

          <section aria-labelledby="settings-change">
            <h2 id="settings-change" className={sectionTitle}>
              Change Your Preferences
            </h2>
            <p className={body}>
              If Grand Theft Auto City uses a consent-management platform, the
              button below should open the website&apos;s active cookie
              preference center.
            </p>
            <p className="mt-5">
              <button
                type="button"
                id="open-cookie-preferences"
                className="inline-flex items-center justify-center rounded-sm border border-white/25 bg-white/5 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-paper transition-colors hover:border-neon-cyan/50 hover:bg-white/10 hover:text-neon-cyan focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              >
                Open Cookie Preferences
              </button>
            </p>
          </section>

          <section aria-labelledby="settings-more">
            <h2 id="settings-more" className={sectionTitle}>
              More Information
            </h2>
            <p className={body}>
              For additional information about our use of cookies, please read
              our{" "}
              <Link
                href="/legal/cookies"
                className="text-neon-cyan underline-offset-2 transition-colors hover:text-paper hover:underline"
              >
                Cookie Policy
              </Link>
              .
            </p>
            <p className={body}>
              For information about how we collect and process personal
              information, please read our{" "}
              <Link
                href="/legal/privacy"
                className="text-neon-cyan underline-offset-2 transition-colors hover:text-paper hover:underline"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </section>

          <section aria-labelledby="settings-contact">
            <h2 id="settings-contact" className={sectionTitle}>
              Contact Us
            </h2>
            <p className={body}>
              For questions regarding cookies or privacy, contact:
            </p>
            <ul className={`${body} mt-4 space-y-2`}>
              <li>
                <span className="text-paper-faint">Website Name:</span>{" "}
                <span className="text-paper">Grand Theft Auto City</span>
              </li>
              <li>
                <span className="text-paper-faint">Email:</span>{" "}
                <a
                  href="mailto:info@grandtheftautocity.com"
                  className="text-neon-cyan underline-offset-2 transition-colors hover:text-paper hover:underline"
                >
                  info@grandtheftautocity.com
                </a>
              </li>
            </ul>
          </section>
        </div>
      </Container>
    </main>
  );
}
