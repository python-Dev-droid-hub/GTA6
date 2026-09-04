import type { ReactNode } from "react";

/** Flatten MDX children to plain text for ids / TOC. */
export function flattenMdxText(children: ReactNode): string {
  if (children == null || typeof children === "boolean") return "";
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }
  if (Array.isArray(children)) {
    return children.map(flattenMdxText).join("");
  }
  if (typeof children === "object" && "props" in children) {
    const props = children.props as { children?: ReactNode };
    return flattenMdxText(props.children);
  }
  return "";
}
