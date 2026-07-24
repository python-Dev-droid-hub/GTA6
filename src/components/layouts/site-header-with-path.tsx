"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/layouts/site-header";

/** Client bridge so sticky header can mark the active route. */
export function SiteHeaderWithPath() {
  const pathname = usePathname();
  return <SiteHeader pathname={pathname} />;
}
