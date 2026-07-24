import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { toolsCatalog } from "@/constants/tools";
import { buildMetadata } from "@/lib/seo/metadata";
import { spacing } from "@/constants/design";

export const metadata = buildMetadata({
  title: "Tools",
  description:
    "Interactive fan tools — map, release converter, FPS math, PC checker, and search.",
  path: "/tools",
});

export default function ToolsHubPage() {
  return (
    <main>
      <Container size="wide" className={spacing.sectionY}>
        <SectionHeading
          headingId="tools-heading"
          eyebrow="Interactive"
          title="Tools hub"
          description="Utilities for launch planning and coast exploration. Heuristics labeled — never sold as official specs."
        />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {toolsCatalog.map((tool) => (
            <li key={tool.id}>
              <Link
                href={tool.href}
                className="flex h-full flex-col gap-4 rounded-lg border border-border bg-surface p-6 transition-cinema hover:border-vice-pink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              >
                <div className="flex items-center justify-between gap-3">
                  <Badge variant="cyan">{tool.eyebrow}</Badge>
                  <Badge variant={tool.status === "live" ? "pink" : "outline"}>
                    {tool.status}
                  </Badge>
                </div>
                <h2 className="font-display text-2xl uppercase tracking-[0.08em] text-paper">
                  {tool.title}
                </h2>
                <p className="text-sm leading-relaxed text-paper-muted">
                  {tool.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </main>
  );
}
