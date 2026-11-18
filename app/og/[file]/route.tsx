import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { isLang, LANGS, type Lang } from "@/lib/i18n";

const size = { width: 1200, height: 630 };

const COPY: Record<Lang, { title: string; foot: string }> = {
  en: { title: "Your controller in every PC game.", foot: "Free for Windows, Linux and Mac" },
  pt: { title: "Seu controle em qualquer jogo de PC.", foot: "Grátis para Windows, Linux e Mac" },
  es: { title: "Tu mando en cualquier juego de PC.", foot: "Gratis para Windows, Linux y Mac" },
  fr: { title: "Ta manette dans tous les jeux PC.", foot: "Gratuit pour Windows, Linux et Mac" },
  ja: { title: "あなたのコントローラーを、どのPCゲームでも。", foot: "Windows、Linux、Mac で無料" },
  zh: { title: "你的手柄，畅玩所有 PC 游戏。", foot: "免费支持 Windows、Linux 和 Mac" },
};

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.map((l) => ({ file: `${l}.png` }));
}

/** The link preview image of each language, at /og/en.png, /og/pt.png and so on. */
export async function GET(_req: Request, { params }: RouteContext<"/og/[file]">) {
  const { file } = await params;
  const lang = file.replace(/\.png$/, "");
  const c = isLang(lang) ? COPY[lang] : COPY.en;
  const [icon, shot] = await Promise.all([
    readFile(join(process.cwd(), "public/brand/icon-256.png"), "base64"),
    lang === "pt"
      ? readFile(join(process.cwd(), "public/window-pt.png"), "base64")
      : readFile(join(process.cwd(), "public/window.png"), "base64"),
  ]);

  // The default font has no Japanese or Chinese: those get Noto Sans, cut down to the characters used.
  const cjk = lang === "ja" ? "Noto+Sans+JP" : lang === "zh" ? "Noto+Sans+SC" : null;
  const fonts = cjk ? await googleFont(cjk, c.title + c.foot) : null;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#000", color: "#f2f2ef", position: "relative" }}>
        <div style={{ display: "flex", flexDirection: "column", padding: "72px 0 72px 72px", width: 560 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`data:image/png;base64,${icon}`} width={112} height={112} alt="" />
          <div style={{ marginTop: 44, fontSize: 64, lineHeight: 1.04, letterSpacing: -1.5, fontWeight: 600 }}>
            {c.title}
          </div>
          <div style={{ marginTop: "auto", display: "flex", fontSize: 24, color: "#a3a9b2" }}>
            {c.foot}
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
          <img src={`data:image/png;base64,${shot}`} width={760} height={686} alt="" />
        </div>
      </div>
    ),
    { ...size, ...(fonts ? { fonts } : {}) },
  );
}

async function googleFont(family: string, text: string) {
  try {
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${family}:wght@400;600&text=${encodeURIComponent(text)}`)).text();
    const urls = [...css.matchAll(/font-weight: (\d+);[^}]*?src: url\(([^)]+)\)/g)];
    return await Promise.all(
      urls.map(async ([, weight, url]) => ({
        name: "cjk",
        data: await (await fetch(url)).arrayBuffer(),
        weight: Number(weight) as 400 | 600,
        style: "normal" as const,
      })),
    );
  } catch {
    return null;
  }
}
