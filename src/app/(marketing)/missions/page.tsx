import { MissionsExperience } from "@/components/sections/missions/missions-experience";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";

export const metadata = buildMetadata({
  title: "Missions",
  description:
    "From high-stakes heists to underground deals — fan mission teasers across Vice City and Leonida.",
  path: "/missions",
  image: "/images/missions/banner.jpg",
  imageAlt: "Neon Vice City waterfront at night",
});

export default function MissionsPage() {
  return (
    <main className="relative isolate min-h-dvh overflow-hidden bg-[#07060f]">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Missions", path: "/missions" },
        ])}
      />
      <MissionsExperience />
    </main>
  );
}
