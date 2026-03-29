import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #00b4ff 0%, #ff6b35 52%, #e91e8c 100%)",
          borderRadius: 40,
        }}
      >
        <span
          style={{
            fontSize: 96,
            fontWeight: 800,
            color: "white",
            fontFamily:
              "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
            letterSpacing: "-0.04em",
            marginTop: -8,
          }}
        >
          F
        </span>
      </div>
    ),
    { ...size },
  );
}
