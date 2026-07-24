import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { getAllGuides } from "@/lib/mdx/guides";
import { buildMetadata } from "@/lib/seo/metadata";
import { formatDate } from "@/utils/format-date";
import { spacing } from "@/constants/design";

export const metadata = buildMetadata({
  title: "Guides",
  description: "Fan-safe gameplay and PC orientation guides.",
  path: "/guides",
});

export default function GuidesIndexPage() {
  const guides = getAllGuides();

  return (
    <main>
      <Container size="wide" className={spacing.sectionY}>
        <SectionHeading
          headingId="guides-heading"
          eyebrow="Playbooks"
          title="Gameplay guides"
          description="Orientation first. Systems deep-dives only when details are real."
        />
        <ul className="mt-12 flex flex-col gap-4">
          {guides.map((guide) => (
            <li key={guide.slug}>
              <Link
                href={`/guides/${guide.slug}`}
                className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-6 transition-cinema hover:border-vice-pink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring md:flex-row md:items-center md:justify-between"
              >
                <div className="flex flex-col gap-2">
                  <Badge variant="gold" className="w-fit">
                    {guide.category}
                  </Badge>
                  <h2 className="font-display text-2xl uppercase tracking-[0.08em] text-paper">
                    {guide.title}
                  </h2>
                  <p className="max-w-2xl text-sm text-paper-muted">
                    {guide.description}
                  </p>
                </div>
                <time
                  dateTime={guide.date}
                  className="shrink-0 font-mono text-xs uppercase tracking-[0.2em] text-paper-faint"
                >
                  {formatDate(guide.date)}
                </time>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </main>
  );
}
