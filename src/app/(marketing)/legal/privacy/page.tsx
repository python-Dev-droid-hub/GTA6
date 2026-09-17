import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "Privacy Policy for Grand Theft Auto City — how we collect, use, store, and protect information when you visit or interact with our website.",
  path: "/legal/privacy",
});

const bullet = "list-disc space-y-1.5 pl-5 marker:text-vice-pink";
const sectionTitle =
  "font-[family-name:var(--font-family-display)] text-xl font-bold uppercase tracking-[0.04em] text-paper sm:text-2xl";
const body = "mt-3 text-[15px] leading-relaxed text-paper-muted sm:text-base";

export default function PrivacyPage() {
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
            <li className="text-paper-muted">Privacy Policy</li>
          </ol>
        </nav>

        <header className="max-w-3xl border-b border-border pb-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-vice-pink">
            Legal
          </p>
          <h1 className="mt-3 font-display text-[clamp(2rem,5vw,3.25rem)] uppercase leading-[0.95] tracking-[0.04em] text-paper">
            Privacy Policy
          </h1>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-paper-faint">
            Last Updated: September 17, 2026
          </p>
          <p className="mt-6 text-base leading-relaxed text-paper-muted sm:text-lg">
            Welcome to Grand Theft Auto City (“we,” “our,” or “us”). This Privacy
            Policy explains how we collect, use, store, and protect information
            when you visit or interact with our website.
          </p>
          <p className="mt-4 text-base leading-relaxed text-paper-muted sm:text-lg">
            Grand Theft Auto City is affiliated with Rockstar Games in accordance
            with the applicable authorization or agreement between the parties.
            This affiliation does not change the privacy practices described in
            this Privacy Policy.
          </p>
        </header>

        <div className="mt-10 max-w-3xl space-y-10 sm:mt-12 sm:space-y-12">
          <section aria-labelledby="privacy-collect">
            <h2 id="privacy-collect" className={sectionTitle}>
              1. Information We Collect
            </h2>
            <p className={body}>
              We may collect information that you voluntarily provide when using
              our website, including:
            </p>
            <ul className={`${bullet} ${body}`}>
              <li>Name</li>
              <li>Email address</li>
              <li>Contact information</li>
              <li>Information submitted through contact forms</li>
              <li>Newsletter or subscription information</li>
              <li>
                Comments, messages, or other information you voluntarily provide
              </li>
            </ul>
            <p className={body}>
              We may also automatically collect certain technical and usage
              information, including:
            </p>
            <ul className={`${bullet} ${body}`}>
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Device type</li>
              <li>Operating system</li>
              <li>Pages visited</li>
              <li>Referring website</li>
              <li>Approximate geographic information</li>
              <li>Date and time of visits</li>
              <li>Website interaction and usage information</li>
            </ul>
          </section>

          <section aria-labelledby="privacy-use">
            <h2 id="privacy-use" className={sectionTitle}>
              2. How We Use Information
            </h2>
            <p className={body}>We may use collected information to:</p>
            <ul className={`${bullet} ${body}`}>
              <li>Operate and maintain our website</li>
              <li>Respond to inquiries and requests</li>
              <li>Provide requested content or services</li>
              <li>Improve website functionality and user experience</li>
              <li>Analyze website traffic and usage</li>
              <li>Detect and prevent fraud, abuse, or security problems</li>
              <li>Send communications when you have requested them</li>
              <li>Comply with applicable legal obligations</li>
            </ul>
          </section>

          <section id="cookies" aria-labelledby="privacy-cookies">
            <h2 id="privacy-cookies" className={sectionTitle}>
              3. Cookies and Similar Technologies
            </h2>
            <p className={body}>
              We may use cookies, pixels, local storage, tags, web beacons, and
              similar technologies to operate our website, remember preferences,
              understand website traffic, and improve our services.
            </p>
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
              For more information, please review our{" "}
              <Link
                href="/legal/cookies"
                className="text-neon-cyan underline-offset-2 transition-colors hover:text-paper hover:underline"
              >
                Cookie Policy
              </Link>
              .
            </p>
          </section>

          <section aria-labelledby="privacy-analytics">
            <h2 id="privacy-analytics" className={sectionTitle}>
              4. Analytics and Third-Party Services
            </h2>
            <p className={body}>
              We may use third-party services for analytics, advertising,
              hosting, security, website functionality, or other business
              purposes.
            </p>
            <p className={body}>
              These providers may process certain technical or usage information
              in accordance with their own privacy policies.
            </p>
          </section>

          <section aria-labelledby="privacy-advertising">
            <h2 id="privacy-advertising" className={sectionTitle}>
              5. Advertising
            </h2>
            <p className={body}>
              Where advertising is displayed on our website, advertising
              providers may use cookies, pixels, or similar technologies to
              deliver, measure, or personalize advertisements.
            </p>
            <p className={body}>
              Where required by applicable law, we will request appropriate
              consent before using non-essential advertising or tracking
              technologies.
            </p>
          </section>

          <section aria-labelledby="privacy-links">
            <h2 id="privacy-links" className={sectionTitle}>
              6. Third-Party Links
            </h2>
            <p className={body}>
              Our website may contain links to third-party websites, gaming
              services, social media platforms, retailers, or other external
              services.
            </p>
            <p className={body}>
              We do not control these third-party websites and are not
              responsible for their privacy practices, security, content, or
              policies.
            </p>
          </section>

          <section aria-labelledby="privacy-affiliation">
            <h2 id="privacy-affiliation" className={sectionTitle}>
              7. Rockstar Games Affiliation
            </h2>
            <p className={body}>
              Grand Theft Auto City is affiliated with Rockstar Games in
              accordance with the applicable authorization or agreement between
              the parties.
            </p>
            <p className={body}>
              Rockstar Games, Grand Theft Auto, Grand Theft Auto VI, associated
              logos, characters, artwork, and related intellectual property
              remain the property of their respective rights holders.
            </p>
            <p className={body}>
              Our affiliation does not mean that all content or services
              available on Grand Theft Auto City are owned or operated by
              Rockstar Games unless expressly stated.
            </p>
          </section>

          <section aria-labelledby="privacy-security">
            <h2 id="privacy-security" className={sectionTitle}>
              8. Data Security
            </h2>
            <p className={body}>
              We use reasonable administrative, technical, and organizational
              measures designed to protect personal information from unauthorized
              access, alteration, disclosure, or destruction.
            </p>
            <p className={body}>
              However, no method of internet transmission or electronic storage
              can be guaranteed to be completely secure.
            </p>
          </section>

          <section aria-labelledby="privacy-retention">
            <h2 id="privacy-retention" className={sectionTitle}>
              9. Data Retention
            </h2>
            <p className={body}>
              We retain personal information only for as long as reasonably
              necessary for the purposes described in this Privacy Policy, unless
              a longer retention period is required or permitted by applicable
              law.
            </p>
          </section>

          <section aria-labelledby="privacy-rights">
            <h2 id="privacy-rights" className={sectionTitle}>
              10. Your Privacy Rights
            </h2>
            <p className={body}>
              Depending on your location and applicable law, you may have rights
              concerning your personal information, including the right to:
            </p>
            <ul className={`${bullet} ${body}`}>
              <li>Request access to personal information</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of certain information</li>
              <li>Object to or restrict certain processing</li>
              <li>Withdraw consent where applicable</li>
              <li>Request a copy of certain information</li>
              <li>Submit a privacy-related complaint</li>
            </ul>
            <p className={body}>
              To make a privacy-related request, contact us at{" "}
              <a
                href="mailto:info@grandtheftautocity.com"
                className="text-neon-cyan underline-offset-2 transition-colors hover:text-paper hover:underline"
              >
                info@grandtheftautocity.com
              </a>
              .
            </p>
          </section>

          <section aria-labelledby="privacy-children">
            <h2 id="privacy-children" className={sectionTitle}>
              11. Children&apos;s Privacy
            </h2>
            <p className={body}>
              Our website does not knowingly seek to collect personal information
              from children in violation of applicable laws.
            </p>
            <p className={body}>
              If you believe that a child has provided personal information to us
              without appropriate authorization, please contact us.
            </p>
          </section>

          <section aria-labelledby="privacy-changes">
            <h2 id="privacy-changes" className={sectionTitle}>
              12. Changes to This Privacy Policy
            </h2>
            <p className={body}>
              We may update this Privacy Policy from time to time to reflect
              changes to our website, services, technologies, or applicable legal
              requirements.
            </p>
            <p className={body}>
              Any updated version will be posted on this page with a revised
              “Last Updated” date.
            </p>
          </section>

          <section aria-labelledby="privacy-contact">
            <h2 id="privacy-contact" className={sectionTitle}>
              13. Contact Us
            </h2>
            <p className={body}>
              For questions about this Privacy Policy or our privacy practices,
              contact:
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
