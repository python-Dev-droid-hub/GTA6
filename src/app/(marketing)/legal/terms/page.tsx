import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Legal Advisory",
  description:
    "Legal Advisory for Grand Theft Auto City — website status, affiliation, intellectual property, content accuracy, and limitation of liability.",
  path: "/legal/terms",
});

const sectionTitle =
  "font-[family-name:var(--font-family-display)] text-xl font-bold uppercase tracking-[0.04em] text-paper sm:text-2xl";
const body = "mt-3 text-[15px] leading-relaxed text-paper-muted sm:text-base";

export default function LegalAdvisoryPage() {
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
            <li className="text-paper-muted">Legal Advisory</li>
          </ol>
        </nav>

        <header className="max-w-3xl border-b border-border pb-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-vice-pink">
            Legal
          </p>
          <h1 className="mt-3 font-display text-[clamp(2rem,5vw,3.25rem)] uppercase leading-[0.95] tracking-[0.04em] text-paper">
            Legal Advisory
          </h1>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-paper-faint">
            Last Updated: September 17, 2026
          </p>
          <p className="mt-6 text-base leading-relaxed text-paper-muted sm:text-lg">
            The information published on Grand Theft Auto City is provided for
            general informational, educational, gaming, and entertainment
            purposes.
          </p>
          <p className="mt-4 text-base leading-relaxed text-paper-muted sm:text-lg">
            Although we make reasonable efforts to maintain accurate and current
            information, we do not guarantee that all content will always be
            complete, accurate, or up to date.
          </p>
        </header>

        <div className="mt-10 max-w-3xl space-y-10 sm:mt-12 sm:space-y-12">
          <section aria-labelledby="legal-status">
            <h2 id="legal-status" className={sectionTitle}>
              1. Website Status
            </h2>
            <p className={body}>
              Grand Theft Auto City is a digital platform providing information,
              news, guides, updates, features, and other content relating to
              Grand Theft Auto VI and related gaming topics.
            </p>
          </section>

          <section aria-labelledby="legal-affiliation">
            <h2 id="legal-affiliation" className={sectionTitle}>
              2. Rockstar Games Affiliation
            </h2>
            <p className={body}>
              Grand Theft Auto City is affiliated with Rockstar Games in
              accordance with the applicable authorization or agreement between
              the parties.
            </p>
            <p className={body}>
              This affiliation should be understood only within the scope of the
              applicable authorization or agreement.
            </p>
            <p className={body}>
              Nothing on this website should be interpreted as creating a broader
              partnership, endorsement, sponsorship, licensing arrangement, or
              official status beyond what has been expressly authorized.
            </p>
          </section>

          <section aria-labelledby="legal-ip">
            <h2 id="legal-ip" className={sectionTitle}>
              3. Rockstar Games and Grand Theft Auto
            </h2>
            <p className={body}>
              Grand Theft Auto, Grand Theft Auto VI, GTA, Rockstar Games,
              associated logos, characters, artwork, names, and related
              intellectual property belong to their respective rights holders.
            </p>
            <p className={body}>
              Nothing published on Grand Theft Auto City is intended to transfer
              ownership of any third-party intellectual property.
            </p>
          </section>

          <section aria-labelledby="legal-accuracy">
            <h2 id="legal-accuracy" className={sectionTitle}>
              4. Content Accuracy
            </h2>
            <p className={body}>
              Gaming information may change without notice.
            </p>
            <p className={body}>
              Release dates, platforms, features, pricing, availability,
              characters, locations, gameplay mechanics, and other information
              may be changed or updated by the relevant rights holders.
            </p>
            <p className={body}>
              Rumors, leaks, speculation, and unofficial reports may be
              identified as such where appropriate.
            </p>
          </section>

          <section aria-labelledby="legal-links">
            <h2 id="legal-links" className={sectionTitle}>
              5. External Links
            </h2>
            <p className={body}>
              Our website may contain links to third-party websites and services.
            </p>
            <p className={body}>
              We do not control external websites and are not responsible for
              their content, availability, security, privacy practices, or
              policies.
            </p>
          </section>

          <section aria-labelledby="legal-copyright">
            <h2 id="legal-copyright" className={sectionTitle}>
              6. Copyright and Intellectual Property
            </h2>
            <p className={body}>
              Original articles, graphics, website design, branding, and other
              materials created by Grand Theft Auto City are protected by
              applicable intellectual property laws.
            </p>
            <p className={body}>
              Third-party trademarks, game titles, logos, artwork, characters,
              and other materials remain the property of their respective owners.
            </p>
            <p className={body}>
              If you believe that material published on our website infringes
              your copyright or other intellectual property rights, please contact
              us at{" "}
              <a
                href="mailto:info@grandtheftautocity.com"
                className="text-neon-cyan underline-offset-2 transition-colors hover:text-paper hover:underline"
              >
                info@grandtheftautocity.com
              </a>
              .
            </p>
          </section>

          <section aria-labelledby="legal-guarantee">
            <h2 id="legal-guarantee" className={sectionTitle}>
              7. No Guarantee
            </h2>
            <p className={body}>
              We do not guarantee the completeness, reliability, availability, or
              accuracy of information published on our website.
            </p>
            <p className={body}>
              Nothing on Grand Theft Auto City should be interpreted as a
              guarantee regarding any future product, feature, announcement,
              release, update, or service.
            </p>
          </section>

          <section aria-labelledby="legal-liability">
            <h2 id="legal-liability" className={sectionTitle}>
              8. Limitation of Liability
            </h2>
            <p className={body}>
              To the extent permitted by applicable law, Grand Theft Auto City
              and its operators will not be responsible for losses or damages
              arising from reliance on information published on the website or
              from the use or inability to use the website.
            </p>
            <p className={body}>
              Nothing in this Legal Advisory is intended to exclude liability
              that cannot legally be excluded.
            </p>
          </section>

          <section aria-labelledby="legal-changes">
            <h2 id="legal-changes" className={sectionTitle}>
              9. Changes to This Advisory
            </h2>
            <p className={body}>
              We may update this Legal Advisory when necessary to reflect changes
              to our website, business relationships, services, or applicable
              legal requirements.
            </p>
          </section>

          <section aria-labelledby="legal-contact">
            <h2 id="legal-contact" className={sectionTitle}>
              10. Contact Us
            </h2>
            <p className={body}>
              For legal, copyright, trademark, or other website-related
              inquiries:
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
