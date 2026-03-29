import { ImageResponse } from "next/og";

export const alt = "FCBMINSK — рекламное агентство полного цикла";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 72,
          background: "#0a0a0a",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            fontSize: 88,
            fontWeight: 800,
            letterSpacing: -3,
          }}
        >
          <span style={{ color: "#00a8e8" }}>FCB</span>
          <span style={{ color: "#ffffff" }}>MINSK</span>
        </div>
        <div
          style={{
            marginTop: 24,
            width: 96,
            height: 4,
            borderRadius: 999,
            backgroundColor: "#ff6b35",
          }}
        />
        <div
          style={{
            marginTop: 32,
            fontSize: 34,
            fontWeight: 600,
            color: "rgba(255,255,255,0.78)",
            maxWidth: 900,
            lineHeight: 1.35,
          }}
        >
          Стратегия, креатив, медиа, digital и продакшн
        </div>
      </div>
    ),
    { ...size },
  );
}
