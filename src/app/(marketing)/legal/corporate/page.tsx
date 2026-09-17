import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Corporate",
  description:
    "About Grand Theft Auto City — our mission, editorial approach, Rockstar Games affiliation, intellectual property, and business contacts.",
  path: "/legal/corporate",
});

const sectionTitle =
  "font-[family-name:var(--font-family-display)] text-xl font-bold uppercase tracking-[0.04em] text-paper sm:text-2xl";
const body = "mt-3 text-[15px] leading-relaxed text-paper-muted sm:text-base";

export default function CorporatePage() {
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
            <li className="text-paper-muted">Corporate</li>
          </ol>
        </nav>

        <header className="max-w-3xl border-b border-border pb-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-vice-pink">
            About
          </p>
          <h1 className="mt-3 font-display text-[clamp(2rem,5vw,3.25rem)] uppercase leading-[0.95] tracking-[0.04em] text-paper">
            Corporate
          </h1>
          <p className="mt-6 text-base leading-relaxed text-paper-muted sm:text-lg">
            Grand Theft Auto City is a digital platform dedicated to providing
            information, news, guides, updates, features, and other content
            related to Grand Theft Auto VI and the wider gaming community.
          </p>
        </header>

        <div className="mt-10 max-w-3xl space-y-10 sm:mt-12 sm:space-y-12">
          <section aria-labelledby="corporate-mission">
            <h2 id="corporate-mission" className={sectionTitle}>
              Our Mission
            </h2>
            <p className={body}>
              Our goal is to make gaming information easier to discover,
              understand, and follow.
            </p>
            <p className={body}>
              We focus on creating accessible content covering gaming news,
              updates, guides, features, and other relevant information for our
              readers.
            </p>
          </section>

          <section aria-labelledby="corporate-editorial">
            <h2 id="corporate-editorial" className={sectionTitle}>
              Our Editorial Approach
            </h2>
            <p className={body}>
              We aim to distinguish confirmed information from rumors,
              speculation, leaks, and community reports.
            </p>
            <p className={body}>
              When information comes from external sources, we may provide
              appropriate attribution or links to the original source.
            </p>
            <p className={body}>
              Because gaming information can change as developers and publishers
              release announcements and updates, readers should consider the
              date and source of information when reviewing content.
            </p>
          </section>

          <section aria-labelledby="corporate-affiliation">
            <h2 id="corporate-affiliation" className={sectionTitle}>
              Our Affiliation With Rockstar Games
            </h2>
            <p className={body}>
              Grand Theft Auto City is affiliated with Rockstar Games in
              accordance with the applicable authorization or agreement between
              the parties.
            </p>
            <p className={body}>
              Our affiliation is represented only within the scope permitted by
              the applicable authorization or agreement.
            </p>
            <p className={body}>
              Rockstar Games, Grand Theft Auto, Grand Theft Auto VI, and related
              intellectual property remain the property of their respective
              rights holders.
            </p>
          </section>

          <section aria-labelledby="corporate-ip">
            <h2 id="corporate-ip" className={sectionTitle}>
              Intellectual Property
            </h2>
            <p className={body}>
              We respect the intellectual property rights of Rockstar Games,
              Take-Two Interactive Software, Inc., and other rights holders.
            </p>
            <p className={body}>
              Original editorial content, website design, branding, and
              independently created materials published by Grand Theft Auto City
              belong to their respective owners.
            </p>
            <p className={body}>
              Third-party trademarks, logos, game names, artwork, and other
              intellectual property remain the property of their respective
              rights holders.
            </p>
          </section>

          <section aria-labelledby="corporate-business">
            <h2 id="corporate-business" className={sectionTitle}>
              Business Inquiries
            </h2>
            <p className={body}>
              For corporate, partnership, media, advertising, or other business
              inquiries, please contact:
            </p>
            <ul className={`${body} list-none space-y-1.5 pl-0`}>
              <li>
                <span className="text-paper-faint">Website Name:</span>{" "}
                Grand Theft Auto City
              </li>
              <li>
                <span className="text-paper-faint">Email:</span>{" "}
                <a
                  href="mailto:info@grandtheftautocity.com"
                  className="text-neon-cyan underline-offset-2 hover:underline"
                >
                  info@grandtheftautocity.com
                </a>
              </li>
            </ul>
          </section>

          <section aria-labelledby="corporate-legal">
            <h2 id="corporate-legal" className={sectionTitle}>
              Legal Inquiries
            </h2>
            <p className={body}>
              For copyright, trademark, privacy, or other legal matters, contact:
            </p>
            <p className={body}>
              <a
                href="mailto:info@grandtheftautocity.com"
                className="text-neon-cyan underline-offset-2 hover:underline"
              >
                info@grandtheftautocity.com
              </a>
            </p>
          </section>
        </div>
      </Container>
    </main>
  );
}
