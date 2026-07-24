import { ToolShell } from "@/components/tools/tool-shell";
import { PcCompatibilityChecker } from "@/components/tools/pc-compatibility";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "PC compatibility checker",
  description: "Heuristic PC readiness until official GTA VI specs exist.",
  path: "/tools/pc-checker",
});

export default function PcCheckerPage() {
  return (
    <ToolShell
      eyebrow="PC"
      title="PC compatibility checker"
      description="Rough tier scoring only. Replace with official requirements when Rockstar publishes them."
    >
      <PcCompatibilityChecker />
    </ToolShell>
  );
}
