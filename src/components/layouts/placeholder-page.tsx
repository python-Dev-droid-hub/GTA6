import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { spacing } from "@/constants/design";
import { buildMetadata } from "@/lib/seo/metadata";

type PlaceholderProps = {
  title: string;
  description: string;
  path: string;
};

function PlaceholderPage({ title, description, path }: PlaceholderProps) {
  return (
    <main className={spacing.sectionY}>
      <Container size="wide">
        <SectionHeading
          eyebrow="Coming soon"
          title={title}
          description={description}
        />
        <p className="mt-6 font-mono text-xs uppercase tracking-[0.22em] text-paper-faint">
          Route {path} · Phase scaffolding
        </p>
      </Container>
    </main>
  );
}

export function makePlaceholderMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return buildMetadata({ title, description, path });
}

export { PlaceholderPage };
