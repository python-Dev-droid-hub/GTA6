import type { HTMLAttributes } from "react";

export type JsonLdProps = HTMLAttributes<HTMLScriptElement> & {
  data: Record<string, unknown> | Record<string, unknown>[];
};

/** Server-safe JSON-LD script — escapes `<` to prevent script injection from metadata. */
export function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
