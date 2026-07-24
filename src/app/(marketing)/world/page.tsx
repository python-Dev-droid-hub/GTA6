import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { DistrictCard } from "@/components/sections/world/district-card";
import { featuredDistricts } from "@/data/districts";
import { buildMetadata } from "@/lib/seo/metadata";
import { spacing } from "@/constants/design";

export const metadata = buildMetadata({
  title: "World",
  description: "Vice City districts and atmosphere — unofficial fan tour.",
  path: "/world",
});

export default function WorldPage() {
  return (
    <main>
      <Container size="wide" className={spacing.sectionY}>
        <SectionHeading
          headingId="world-page-heading"
          eyebrow="Vice City"
          title="World tour"
          description="District teasers for now. Interactive map arrives in Phase 4."
        />
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {featuredDistricts.map((district) => (
            <li key={district.slug} id={district.slug}>
              <DistrictCard district={district} />
            </li>
          ))}
        </ul>
      </Container>
    </main>
  );
}
