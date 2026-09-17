import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Cookie Policy",
  description:
    "Cookie Policy for Grand Theft Auto City — how we use cookies and similar technologies on our website.",
  path: "/legal/cookies",
});

const sectionTitle =
  "font-[family-name:var(--font-family-display)] text-xl font-bold uppercase tracking-[0.04em] text-paper sm:text-2xl";
const body = "mt-3 text-[15px] leading-relaxed text-paper-muted sm:text-base";
const subhead =
  "mt-5 font-mono text-[11px] uppercase tracking-[0.22em] text-neon-cyan";

export default function CookiePolicyPage() {
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
            <li className="text-paper-muted">Cookie Policy</li>
          </ol>
        </nav>

        <header className="max-w-3xl border-b border-border pb-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-vice-pink">
            Legal
          </p>
          <h1 className="mt-3 font-display text-[clamp(2rem,5vw,3.25rem)] uppercase leading-[0.95] tracking-[0.04em] text-paper">
            Cookie Policy
          </h1>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-paper-faint">
            Last Updated: September 17, 2026
          </p>
          <p className="mt-6 text-base leading-relaxed text-paper-muted sm:text-lg">
            This Cookie Policy explains how Grand Theft Auto City uses cookies
            and similar technologies when you visit our website.
          </p>
          <p className="mt-4 text-base leading-relaxed text-paper-muted sm:text-lg">
            Grand Theft Auto City is affiliated with Rockstar Games in accordance
            with the applicable authorization or agreement between the parties.
          </p>
        </header>

        <div className="mt-10 max-w-3xl space-y-10 sm:mt-12 sm:space-y-12">
          <section aria-labelledby="cookies-what">
            <h2 id="cookies-what" className={sectionTitle}>
              1. What Are Cookies?
            </h2>
            <p className={body}>
              Cookies are small text files stored on your device when you visit a
              website. They help websites remember information about your visit,
              recognize returning visitors, provide certain functionality, and
              understand how visitors use a website.
            </p>
            <p className={body}>
              We may also use similar technologies, including pixels, tags, local
              storage, and web beacons.
            </p>
          </section>

          <section aria-labelledby="cookies-why">
            <h2 id="cookies-why" className={sectionTitle}>
              2. Why We Use Cookies
            </h2>
            <p className={body}>
              We may use cookies for the following purposes:
            </p>

            <h3 className={subhead}>Essential Cookies</h3>
            <p className={body}>
              Essential cookies may be necessary for website functionality,
              security, navigation, session management, and other basic services.
            </p>

            <h3 className={subhead}>Preference Cookies</h3>
            <p className={body}>
              Preference cookies may remember choices you make while using our
              website, such as language, region, or other website settings.
            </p>

            <h3 className={subhead}>Analytics Cookies</h3>
            <p className={body}>
              Analytics cookies help us understand how visitors interact with our
              website.
            </p>
            <p className={body}>
              They may collect information about page views, traffic sources,
              device types, approximate location, and website interactions.
            </p>

            <h3 className={subhead}>Advertising Cookies</h3>
            <p className={body}>
              Where applicable, advertising cookies may be used to deliver,
              measure, or personalize advertisements.
            </p>
            <p className={body}>
              The use of advertising and tracking cookies may require consent
              depending on your location and applicable law.
            </p>
          </section>

          <section aria-labelledby="cookies-third-party">
            <h2 id="cookies-third-party" className={sectionTitle}>
              3. Third-Party Cookies
            </h2>
            <p className={body}>
              Some cookies may be placed by third-party services that operate on
              or support our website.
            </p>
            <p className={body}>
              These services may include analytics providers, advertising
              partners, embedded media providers, social media services, security
              providers, and other technology providers.
            </p>
            <p className={body}>
              Third-party providers may process information according to their
              own privacy policies.
            </p>
          </section>

          <section aria-labelledby="cookies-affiliation">
            <h2 id="cookies-affiliation" className={sectionTitle}>
              4. Rockstar Games Affiliation
            </h2>
            <p className={body}>
              Grand Theft Auto City is affiliated with Rockstar Games in
              accordance with the applicable authorization or agreement between
              the parties.
            </p>
            <p className={body}>
              Rockstar Games, Grand Theft Auto, Grand Theft Auto VI, and related
              trademarks and intellectual property belong to their respective
              rights holders.
            </p>
            <p className={body}>
              This Cookie Policy concerns the cookies and technologies used on
              Grand Theft Auto City and does not replace or modify the privacy or
              cookie policies of Rockstar Games or other third-party services.
            </p>
          </section>

          <section id="settings" aria-labelledby="cookies-managing">
            <h2 id="cookies-managing" className={sectionTitle}>
              5. Managing Cookies
            </h2>
            <p className={body}>
              You can manage available cookie preferences through our{" "}
              <Link
                href="/legal/cookies#settings"
                className="text-neon-cyan underline-offset-2 transition-colors hover:text-paper hover:underline"
              >
                Cookie Settings
              </Link>{" "}
              page.
            </p>
            <p className={body}>
              You may also control or delete cookies through your browser
              settings. Disabling certain cookies may affect the functionality or
              performance of parts of our website.
            </p>
          </section>

          <section aria-labelledby="cookies-changes">
            <h2 id="cookies-changes" className={sectionTitle}>
              6. Changes to This Cookie Policy
            </h2>
            <p className={body}>
              We may update this Cookie Policy from time to time to reflect
              changes in our website, technologies, services, or applicable legal
              requirements.
            </p>
            <p className={body}>
              Any changes will be posted on this page with an updated “Last
              Updated” date.
            </p>
          </section>

          <section aria-labelledby="cookies-contact">
            <h2 id="cookies-contact" className={sectionTitle}>
              7. Contact Us
            </h2>
            <p className={body}>
              If you have questions about our use of cookies, contact:
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
