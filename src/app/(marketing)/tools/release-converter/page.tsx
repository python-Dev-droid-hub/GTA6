import { ToolShell } from "@/components/tools/tool-shell";
import { ReleaseConverter } from "@/components/tools/release-converter";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Release time converter",
  description: "Convert the launch window into your timezone.",
  path: "/tools/release-converter",
});

export default function ReleaseConverterPage() {
  return (
    <ToolShell
      eyebrow="Release"
      title="Release time converter"
      description="Reads RELEASE_DATE_ISO and formats it for common zones plus your local clock."
    >
      <ReleaseConverter />
    </ToolShell>
  );
}
