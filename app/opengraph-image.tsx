import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Open Controller: any controller, as an Xbox controller";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const [icon, shot] = await Promise.all([
    readFile(join(process.cwd(), "public/brand/icon-256.png"), "base64"),
    readFile(join(process.cwd(), "public/window.png"), "base64"),
  ]);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#000", color: "#f2f2ef", position: "relative" }}>
        <div style={{ display: "flex", flexDirection: "column", padding: "72px 0 72px 72px", width: 560 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`data:image/png;base64,${icon}`} width={112} height={112} alt="" />
          <div style={{ marginTop: 44, fontSize: 64, lineHeight: 1.04, letterSpacing: -1.5, fontWeight: 600 }}>
            Any controller, as an Xbox controller.
          </div>
          <div style={{ marginTop: "auto", display: "flex", fontSize: 24, color: "#a3a9b2" }}>
            Windows, Linux, macOS · MIT
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            left: 640,
            top: 92,
            width: 760,
            display: "flex",
            borderRadius: 18,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.16)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`data:image/png;base64,${shot}`} width={760} height={542} alt="" />
        </div>
      </div>
    ),
    size,
  );
}
