import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SiteSearch } from "@/components/tools/site-search";
import { buildMetadata } from "@/lib/seo/metadata";
import { spacing } from "@/constants/design";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export const metadata = buildMetadata({
  title: "Search",
  description: "Search news, characters, guides, tools, vehicles, and weapons.",
  path: "/search",
});

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;

  return (
    <main>
      <Container size="content" className={spacing.sectionY}>
        <SectionHeading
          headingId="search-heading"
          eyebrow="Discover"
          title="Site search"
          description="Filter by type. Index builds from MDX + databases at request time."
        />
        <div className="mt-10">
          <SiteSearch initialQuery={q ?? ""} />
        </div>
      </Container>
    </main>
  );
}
