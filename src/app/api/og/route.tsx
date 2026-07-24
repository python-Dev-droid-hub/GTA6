import { ImageResponse } from "next/og";

export const runtime = "edge";

/**
 * Dynamic OG cards — used as secondary share image via buildMetadata.
 * Why edge: low latency social scrapers.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "Grand Theft Auto 6";
  const subtitle =
    searchParams.get("subtitle") ?? "Unofficial cinematic fan archive";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "linear-gradient(145deg, #03040a 0%, #161925 55%, #0e1018 100%)",
          color: "#f3eee6",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#00e5ef",
          }}
        >
          UNOFFICIAL FAN EXPERIENCE
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: title.length > 32 ? 52 : 68,
              lineHeight: 1.05,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 2,
              maxWidth: 980,
              background: "linear-gradient(90deg, #ff2d6f, #00e5ef)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.35,
              color: "#b8b0a4",
              maxWidth: 900,
            }}
          >
            {subtitle}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 20,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "#7a746c",
          }}
        >
          <span>GRAND THEFT AUTO 6</span>
          <span>NOT AFFILIATED WITH ROCKSTAR</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
