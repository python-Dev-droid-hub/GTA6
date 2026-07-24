import type { HTMLAttributes } from "react";

export type JsonLdProps = HTMLAttributes<HTMLScriptElement> & {
  data: Record<string, unknown> | Record<string, unknown>[];
};

/** Server-safe JSON-LD script. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
