import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { WeaponDatabase } from "@/components/sections/weapons/weapon-database";
import { weaponClasses, weapons } from "@/data/weapons";
import { buildMetadata } from "@/lib/seo/metadata";
import { spacing } from "@/constants/design";

export const metadata = buildMetadata({
  title: "Weapons",
  description: "Fan weapon browser with relative placeholder stats.",
  path: "/weapons",
});

export default function WeaponsPage() {
  return (
    <main>
      <Container size="wide" className={spacing.sectionY}>
        <SectionHeading
          headingId="weapons-heading"
          eyebrow="Database"
          title="Weapons"
          description="Filter by class. Scores are UI scaffolding until official info exists."
        />
        <div className="mt-12">
          <WeaponDatabase weapons={weapons} classes={weaponClasses} />
        </div>
      </Container>
    </main>
  );
}
