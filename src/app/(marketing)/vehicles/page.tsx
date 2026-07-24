import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { VehicleDatabase } from "@/components/sections/vehicles/vehicle-database";
import { vehicleClasses, vehicles } from "@/data/vehicles";
import { buildMetadata } from "@/lib/seo/metadata";
import { spacing } from "@/constants/design";

export const metadata = buildMetadata({
  title: "Vehicles",
  description: "Fan vehicle browser with relative placeholder stats.",
  path: "/vehicles",
});

export default function VehiclesPage() {
  return (
    <main>
      <Container size="wide" className={spacing.sectionY}>
        <SectionHeading
          headingId="vehicles-heading"
          eyebrow="Database"
          title="Vehicles"
          description="Browse classes and relative scores. Nothing here is official balance data."
        />
        <div className="mt-12">
          <VehicleDatabase vehicles={vehicles} classes={vehicleClasses} />
        </div>
      </Container>
    </main>
  );
}
