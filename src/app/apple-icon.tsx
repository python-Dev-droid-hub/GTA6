import { ImageResponse } from "next/og";
import { brandLogoDataUri } from "@/constants/brand";

export const runtime = "nodejs";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
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
          width={156}
          height={156}
          style={{ objectFit: "contain" }}
        />
      </div>
    ),
    { ...size },
  );
}
