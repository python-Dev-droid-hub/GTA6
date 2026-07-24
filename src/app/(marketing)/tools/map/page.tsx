import { ToolShell } from "@/components/tools/tool-shell";
import { InteractiveMap } from "@/components/tools/interactive-map";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Interactive map",
  description: "Explore stylized fan-mapped Vice City districts.",
  path: "/tools/map",
});

export default function MapToolPage() {
  return (
    <ToolShell
      eyebrow="World"
      title="Interactive map"
      description="Click a district to inspect it. Stylized fan layout — not geographic accuracy."
    >
      <InteractiveMap />
    </ToolShell>
  );
}
