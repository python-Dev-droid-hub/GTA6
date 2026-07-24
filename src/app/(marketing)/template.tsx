"use client";

import { PageTransition } from "@/components/animations/providers/page-transition";

/** Remounts on navigation so PageTransition can run enter animations. */
export default function MarketingTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageTransition>{children}</PageTransition>;
}
