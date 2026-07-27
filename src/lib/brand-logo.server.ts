import { readFile } from "node:fs/promises";
import { join } from "node:path";

const BRAND_LOGO_FILE = join(
  process.cwd(),
  "public/images/brand/gta6-logo-clear.png",
);

export async function brandLogoDataUri(): Promise<string> {
  const file = await readFile(BRAND_LOGO_FILE);
  return `data:image/png;base64,${file.toString("base64")}`;
}
