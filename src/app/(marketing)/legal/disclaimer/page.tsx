import {
  PlaceholderPage,
  makePlaceholderMetadata,
} from "@/components/layouts/placeholder-page";
import { legal } from "@/constants/legal";

export const metadata = makePlaceholderMetadata(
  "Disclaimer",
  legal.shortDisclaimer,
  "/legal/disclaimer",
);

export default function DisclaimerPage() {
  return (
    <PlaceholderPage
      title="Disclaimer"
      description={legal.shortDisclaimer}
      path="/legal/disclaimer"
    />
  );
}
