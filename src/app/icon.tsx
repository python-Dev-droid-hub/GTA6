import { ImageResponse } from "next/og";
import { brandLogoDataUri } from "@/lib/brand-logo.server";

export const runtime = "nodejs";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  const logo = await brandLogoDataUri();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#03040a",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logo}
          alt=""
          width={28}
          height={28}
          style={{ objectFit: "contain" }}
        />
      </div>
    ),
    { ...size },
  );
}
