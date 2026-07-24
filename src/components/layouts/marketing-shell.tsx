import type { ReactNode } from "react";
import { SiteHeaderWithPath } from "@/components/layouts/site-header-with-path";
import { SiteFooter } from "@/components/layouts/site-footer";
import { SkipToContent } from "@/components/layouts/skip-to-content";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo/json-ld";

export type MarketingShellProps = {
  children: ReactNode;
  skipTargetId?: string;
};

/**
 * Why shell: shared chrome + JSON-LD once for marketing routes.
 * Header path highlighting is a thin client leaf; footer stays server.
 */
export function MarketingShell({
  children,
  skipTargetId = "main-content",
}: MarketingShellProps) {
  return (
    <>
      <JsonLd data={websiteJsonLd()} />
      <JsonLd data={organizationJsonLd()} />
      <SkipToContent targetId={skipTargetId} />
      <SiteHeaderWithPath />
      <div id={skipTargetId} tabIndex={-1} className="outline-none">
        {children}
      </div>
      <SiteFooter />
    </>
  );
}
