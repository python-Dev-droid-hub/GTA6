import {
  PlaceholderPage,
  makePlaceholderMetadata,
} from "@/components/layouts/placeholder-page";

export const metadata = makePlaceholderMetadata(
  "Privacy",
  "Privacy policy placeholder — expand in Phase 3 legal pass.",
  "/legal/privacy",
);

export default function PrivacyPage() {
  return (
    <PlaceholderPage
      title="Privacy"
      description="Privacy policy placeholder — expand in Phase 3 legal pass."
      path="/legal/privacy"
    />
  );
}
