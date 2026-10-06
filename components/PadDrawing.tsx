"use client";

import { useId, type ReactNode } from "react";
import type { Glyphs, Shape } from "@/lib/drawings";

export type { Glyphs, Shape };

/*
 * Front views of controllers, drawn by hand on a 400 by 280 grid. Bodies are symmetric: `sym`
 * takes the right half, from the top centre to the bottom centre, and mirrors it. Buttons use the
 * standard mapping's indices, so the same props light any drawing.
 */

type Seg = [number, number, number, number, number, number];

function sym(start: [number, number], segs: Seg[], cx = 200): string {
  const f = (n: number) => Math.round(n * 10) / 10;
  let d = `M${start[0]} ${start[1]}`;
  for (const s of segs) d += `C${s.map(f).join(" ")}`;
  const ends: [number, number][] = [start, ...segs.map((s) => [s[4], s[5]] as [number, number])];
  const m = (x: number) => f(2 * cx - x);
  for (let i = segs.length - 1; i >= 0; i--) {
    const s = segs[i];
    const p = ends[i];
    d += `C${m(s[2])} ${s[3]} ${m(s[0])} ${s[1]} ${m(p[0])} ${p[1]}`;
  }
  return `${d}Z`;
}

type Stick = { x: number; y: number; r: number };
type Dpad = { x: number; y: number; s: number; kind: "cross" | "split" | "buttons" };
type Face = { x: number; y: number; gap: number; r: number; tint?: boolean };
type Btn = { x: number; y: number; w: number; h?: number; rot?: number; kind: "pill" | "round" | "square" | "minus" | "plus" | "start" };
/** An ellipse that cuts a raised copy of the body into a shoulder button, on the left side. */
type Shoulder = { x: number; y: number; rx: number; ry: number; up: number };
type Ring = { x: number; y: number; r: number };

type Spec = {
  body: string[];
  /** A second tone inside the body, as the DualSense's black centre. Clipped to the body. */
  inner?: string;
  wells?: Ring[];
  /** The body's top edge near the shoulders, for the trigger fill. */
  top: number;
  lb: Shoulder;
  lt: Shoulder | null;
  ls: Stick | null;
  rs: Stick | null;
  dpad: Dpad;
  face: Face;
  select: Btn | null;
  start: Btn | null;
  home: Btn | null;
  /** Button 17: the touchpad click, or Capture on Nintendo pads. */
  touchpad?: string;
  capture?: Btn;
  /** Light rings around the sticks (8BitDo Ultimate). */
  stickRings?: boolean;
  deco?: () => ReactNode;
};

const ACCENT = "#60cdff";
const INK = "#00141f";
const LINE = "rgba(255,255,255,0.22)";
const SOFT = "rgba(255,255,255,0.1)";
const PART = "rgba(255,255,255,0.06)";
const GLYPH = "#aeb6c1";

const XBOX_TINT = ["#79dc95", "#ff8080", "#76b3ff", "#ffd36e"];
const PS_TINT = ["#8fb1ff", "#ff8a98", "#f2a2d8", "#6fe0c6"];

function Dots({ x, y, n, step, r = 1.3, fill = "rgba(255,255,255,0.28)" }: { x: number; y: number; n: number; step: number; r?: number; fill?: string }) {
  const start = x - ((n - 1) * step) / 2;
  return (
    <g fill={fill}>
      {Array.from({ length: n }, (_, i) => (
        <circle key={i} cx={start + i * step} cy={y} r={r} />
      ))}
    </g>
  );
}

function Star({ x, y, r }: { x: number; y: number; r: number }) {
  const pts = Array.from({ length: 10 }, (_, i) => {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rr = i % 2 ? r * 0.45 : r;
    return `${(x + rr * Math.cos(a)).toFixed(1)},${(y + rr * Math.sin(a)).toFixed(1)}`;
  });
  return <polygon points={pts.join(" ")} fill={PART} stroke={LINE} strokeWidth={1} strokeLinejoin="round" />;
}

const XBOX: Spec = {
  body: [
    sym(
      [200, 70],
      [
        [236, 70, 262, 58, 300, 58],
        [334, 58, 356, 74, 366, 100],
        [378, 132, 386, 190, 380, 226],
        [376, 252, 352, 266, 330, 258],
        [310, 250, 296, 226, 282, 210],
        [266, 194, 236, 190, 200, 190],
      ],
    ),
  ],
  top: 58,
  lb: { x: 100, y: 62, rx: 74, ry: 32, up: 7 },
  lt: { x: 116, y: 56, rx: 50, ry: 30, up: 17 },
  ls: { x: 118, y: 112, r: 23 },
  rs: { x: 240, y: 170, r: 23 },
  dpad: { x: 160, y: 170, s: 17, kind: "cross" },
  face: { x: 282, y: 112, gap: 20, r: 10.5, tint: true },
  select: { x: 172, y: 118, w: 11, kind: "round" },
  start: { x: 228, y: 118, w: 11, kind: "round" },
  home: { x: 200, y: 86, w: 21, kind: "round" },
  wells: [{ x: 160, y: 170, r: 22 }],
  deco: () => (
    <>
      <rect x={194} y={137} width={12} height={6} rx={3} fill={PART} stroke={LINE} />
      <circle cx={200} cy={86} r={6} fill="none" stroke="rgba(255,255,255,0.18)" />
    </>
  ),
};

const DUALSENSE_BODY = sym(
  [200, 54],
  [
    [244, 54, 292, 50, 320, 52],
    [352, 54, 372, 74, 378, 106],
    [386, 148, 392, 208, 382, 240],
    [374, 266, 336, 272, 318, 254],
    [306, 242, 298, 222, 286, 210],
    [268, 196, 236, 207, 200, 207],
  ],
);
const DUALSENSE_INNER = sym(
  [200, 70],
  [
    [250, 70, 300, 64, 328, 70],
    [360, 78, 366, 126, 342, 148],
    [324, 164, 302, 178, 292, 198],
    [282, 218, 250, 228, 200, 228],
  ],
);
const DUALSENSE_PAD = "M146 54H254C257 54 258 56 258 59L250 112C249 116 246 118 242 118H158C154 118 151 116 150 112L142 59C142 56 143 54 146 54Z";

function dualSense(edge: boolean): Spec {
  return {
    body: [DUALSENSE_BODY],
    inner: DUALSENSE_INNER,
    top: 52,
  lb: { x: 104, y: 56, rx: 74, ry: 32, up: 7 },
  lt: { x: 110, y: 50, rx: 50, ry: 30, up: 16 },
    ls: { x: 150, y: 172, r: 21 },
    rs: { x: 250, y: 172, r: 21 },
    dpad: { x: 98, y: 114, s: 19, kind: "split" },
    face: { x: 302, y: 114, gap: 21, r: 10.5 },
    select: { x: 130, y: 70, w: 5.5, h: 13, rot: -12, kind: "pill" },
    start: { x: 270, y: 70, w: 5.5, h: 13, rot: 12, kind: "pill" },
    home: { x: 200, y: 150, w: 14, kind: "round" },
    touchpad: DUALSENSE_PAD,
    deco: () => (
      <>
        <path d="M139 62L147 114M261 62L253 114" stroke="rgba(130,180,255,0.6)" strokeWidth={2.2} strokeLinecap="round" fill="none" />
        <Dots x={200} y={128} n={5} step={6} r={1.2} />
        <rect x={193} y={166} width={14} height={5} rx={2.5} fill={PART} stroke={LINE} />
        {edge ? (
          <>
            <rect x={144} y={199} width={12} height={4.5} rx={2.25} fill={PART} stroke={LINE} />
            <rect x={244} y={199} width={12} height={4.5} rx={2.25} fill={PART} stroke={LINE} />
          </>
        ) : null}
      </>
    ),
  };
}

const DS4: Spec = {
  body: [
    sym(
      [200, 60],
      [
        [250, 60, 300, 56, 326, 58],
        [352, 60, 366, 74, 370, 96],
        [378, 138, 382, 196, 374, 234],
        [368, 262, 334, 270, 322, 246],
        [314, 226, 302, 202, 284, 190],
        [262, 178, 230, 182, 200, 184],
      ],
    ),
  ],
  wells: [
    { x: 104, y: 110, r: 34 },
    { x: 296, y: 110, r: 34 },
  ],
  top: 58,
  lb: { x: 104, y: 58, rx: 72, ry: 32, up: 7 },
  lt: { x: 110, y: 52, rx: 48, ry: 30, up: 16 },
  ls: { x: 154, y: 158, r: 21 },
  rs: { x: 246, y: 158, r: 21 },
  dpad: { x: 104, y: 110, s: 18, kind: "split" },
  face: { x: 296, y: 110, gap: 20, r: 10, tint: true },
  select: { x: 138, y: 72, w: 5, h: 12, kind: "pill" },
  start: { x: 262, y: 72, w: 5, h: 12, kind: "pill" },
  home: { x: 200, y: 152, w: 13, kind: "round" },
  touchpad: "M157 60H243Q250 60 250 67V107Q250 114 243 114H157Q150 114 150 107V67Q150 60 157 60Z",
  deco: () => (
    <>
      <path d="M158 63.5H242" stroke="rgba(130,180,255,0.6)" strokeWidth={2} strokeLinecap="round" />
      <Dots x={200} y={128} n={5} step={5} r={1.1} />
    </>
  ),
};

const DS3: Spec = {
  body: [
    sym(
      [200, 70],
      [
        [252, 70, 302, 64, 330, 66],
        [358, 68, 374, 86, 374, 110],
        [376, 146, 376, 196, 366, 232],
        [358, 260, 326, 262, 320, 238],
        [312, 212, 298, 190, 278, 180],
        [254, 170, 228, 176, 200, 176],
      ],
    ),
  ],
  wells: [
    { x: 100, y: 112, r: 32 },
    { x: 300, y: 112, r: 32 },
  ],
  top: 66,
  lb: { x: 98, y: 66, rx: 72, ry: 32, up: 7 },
  lt: { x: 108, y: 60, rx: 48, ry: 30, up: 16 },
  ls: { x: 156, y: 148, r: 20 },
  rs: { x: 244, y: 148, r: 20 },
  dpad: { x: 100, y: 112, s: 18, kind: "split" },
  face: { x: 300, y: 112, gap: 20, r: 10, tint: true },
  select: { x: 182, y: 108, w: 12, h: 6, kind: "square" },
  start: { x: 218, y: 108, w: 11, h: 8, kind: "start" },
  home: { x: 200, y: 128, w: 14, kind: "round" },
  deco: () => <Dots x={200} y={78} n={4} step={8} r={1.4} />,
};

const SWITCH_PRO: Spec = {
  body: [
    sym(
      [200, 62],
      [
        [254, 62, 304, 57, 334, 60],
        [364, 64, 382, 88, 386, 120],
        [392, 162, 384, 208, 364, 232],
        [346, 254, 312, 250, 302, 230],
        [294, 214, 284, 202, 262, 200],
        [242, 198, 222, 198, 200, 198],
      ],
    ),
  ],
  top: 58,
  lb: { x: 100, y: 58, rx: 76, ry: 32, up: 7 },
  lt: { x: 112, y: 52, rx: 50, ry: 30, up: 16 },
  ls: { x: 126, y: 108, r: 23 },
  rs: { x: 246, y: 162, r: 23 },
  dpad: { x: 164, y: 162, s: 17, kind: "cross" },
  face: { x: 282, y: 108, gap: 20, r: 10.5 },
  select: { x: 170, y: 82, w: 12, h: 4, kind: "minus" },
  start: { x: 230, y: 82, w: 12, kind: "plus" },
  home: { x: 220, y: 106, w: 14, kind: "round" },
  capture: { x: 180, y: 106, w: 10, kind: "square" },
  wells: [{ x: 164, y: 162, r: 22 }],
  deco: () => <Dots x={200} y={67} n={4} step={6} r={1.2} />,
};

const JOYCONS: Spec = {
  body: ["M186 40H144C122 40 106 58 106 80V216C106 238 122 256 144 256H186Z", "M214 40H256C278 40 294 58 294 80V216C294 238 278 256 256 256H214Z"],
  top: 40,
  lb: { x: 132, y: 44, rx: 40, ry: 40, up: 8 },
  lt: { x: 140, y: 40, rx: 38, ry: 30, up: 17 },
  ls: { x: 146, y: 96, r: 20 },
  rs: { x: 254, y: 162, r: 20 },
  dpad: { x: 146, y: 162, s: 17, kind: "buttons" },
  face: { x: 254, y: 96, gap: 17, r: 8.5 },
  select: { x: 170, y: 57, w: 10, h: 4, kind: "minus" },
  start: { x: 230, y: 57, w: 10, kind: "plus" },
  home: { x: 236, y: 220, w: 13, kind: "round" },
  capture: { x: 164, y: 220, w: 9, kind: "square" },
  deco: () => (
    <path d="M183 46V250M217 46V250" stroke="rgba(255,255,255,0.08)" strokeWidth={4} strokeLinecap="round" />
  ),
};

const ULTIMATE: Spec = {
  body: [
    sym(
      [200, 64],
      [
        [244, 64, 284, 52, 318, 56],
        [352, 60, 372, 82, 378, 114],
        [386, 158, 384, 212, 366, 238],
        [348, 260, 314, 258, 302, 236],
        [292, 218, 280, 200, 260, 196],
        [240, 192, 222, 192, 200, 192],
      ],
    ),
  ],
  top: 56,
  lb: { x: 102, y: 58, rx: 74, ry: 32, up: 7 },
  lt: { x: 114, y: 52, rx: 50, ry: 30, up: 17 },
  ls: { x: 124, y: 110, r: 22 },
  rs: { x: 238, y: 164, r: 22 },
  dpad: { x: 162, y: 164, s: 16, kind: "cross" },
  face: { x: 280, y: 110, gap: 19, r: 10 },
  select: { x: 176, y: 112, w: 11, h: 5, kind: "pill" },
  start: { x: 224, y: 112, w: 11, h: 5, kind: "pill" },
  home: { x: 200, y: 90, w: 17, kind: "round" },
  stickRings: true,
  wells: [{ x: 162, y: 164, r: 21 }],
  deco: () => (
    <>
      <circle cx={200} cy={90} r={12.5} fill="none" stroke="rgba(255,255,255,0.14)" />
      <Star x={200} y={132} r={5.5} />
    </>
  ),
};

const SN30PRO: Spec = {
  body: [
    sym(
      [200, 70],
      [
        [256, 70, 296, 64, 316, 64],
        [352, 64, 378, 92, 378, 126],
        [378, 164, 372, 208, 356, 234],
        [342, 256, 312, 256, 304, 234],
        [298, 216, 292, 208, 276, 206],
        [254, 204, 228, 210, 200, 210],
      ],
    ),
  ],
  wells: [
    { x: 90, y: 122, r: 34 },
    { x: 310, y: 122, r: 38 },
  ],
  top: 64,
  lb: { x: 88, y: 64, rx: 74, ry: 32, up: 7 },
  lt: { x: 100, y: 58, rx: 48, ry: 30, up: 16 },
  ls: { x: 160, y: 174, r: 19 },
  rs: { x: 240, y: 174, r: 19 },
  dpad: { x: 90, y: 122, s: 18, kind: "cross" },
  face: { x: 310, y: 122, gap: 19, r: 10 },
  select: { x: 181, y: 120, w: 13, h: 5, rot: -28, kind: "pill" },
  start: { x: 219, y: 120, w: 13, h: 5, rot: -28, kind: "pill" },
  home: { x: 200, y: 142, w: 11, kind: "round" },
  deco: () => <Star x={200} y={98} r={5} />,
};

const RETRO: Spec = {
  body: ["M96 78H304C341 78 370 107 370 144C370 181 341 210 304 210H96C59 210 30 181 30 144C30 107 59 78 96 78Z"],
  wells: [{ x: 96, y: 144, r: 38 }],
  top: 80,
  lb: { x: 84, y: 82, rx: 62, ry: 36, up: 7 },
  lt: null,
  ls: null,
  rs: null,
  dpad: { x: 96, y: 144, s: 20, kind: "cross" },
  face: { x: 304, y: 144, gap: 21, r: 11 },
  select: { x: 183, y: 152, w: 16, h: 6, rot: -30, kind: "pill" },
  start: { x: 217, y: 152, w: 16, h: 6, rot: -30, kind: "pill" },
  home: null,
  deco: () => (
    <>
      <ellipse cx={304} cy={144} rx={52} ry={40} transform="rotate(-24 304 144)" fill="rgba(0,0,0,0.28)" stroke={SOFT} />
      <rect x={168} y={140} width={64} height={24} rx={12} transform="rotate(-30 200 152)" fill="rgba(0,0,0,0.22)" stroke={SOFT} />
    </>
  ),
};

const HANDHELD: Spec = {
  body: ["M62 74H338C362 74 380 92 380 116V184C380 208 362 226 338 226H62C38 226 20 208 20 184V116C20 92 38 74 62 74Z"],
  top: 74,
  lb: { x: 70, y: 74, rx: 56, ry: 30, up: 6 },
  lt: { x: 80, y: 70, rx: 44, ry: 30, up: 14 },
  ls: { x: 62, y: 112, r: 17 },
  rs: { x: 338, y: 182, r: 17 },
  dpad: { x: 62, y: 180, s: 15, kind: "cross" },
  face: { x: 338, y: 114, gap: 15, r: 7.5 },
  select: { x: 92, y: 86, w: 8, h: 4, kind: "pill" },
  start: { x: 308, y: 86, w: 8, h: 4, kind: "pill" },
  home: null,
  deco: () => <rect x={106} y={86} width={188} height={128} rx={8} fill="rgba(0,0,0,0.45)" stroke={SOFT} />,
};

const GENERIC: Spec = {
  body: [
    sym(
      [200, 64],
      [
        [250, 64, 290, 60, 312, 62],
        [346, 66, 362, 86, 370, 118],
        [380, 160, 384, 214, 368, 236],
        [352, 256, 322, 254, 308, 234],
        [296, 214, 284, 200, 262, 198],
        [240, 196, 220, 196, 200, 196],
      ],
    ),
  ],
  top: 62,
  lb: { x: 100, y: 62, rx: 72, ry: 32, up: 7 },
  lt: { x: 114, y: 56, rx: 50, ry: 30, up: 16 },
  ls: { x: 122, y: 112, r: 22 },
  rs: { x: 240, y: 166, r: 22 },
  dpad: { x: 160, y: 166, s: 16, kind: "cross" },
  face: { x: 280, y: 112, gap: 19, r: 10 },
  select: { x: 178, y: 112, w: 12, h: 6, kind: "pill" },
  start: { x: 222, y: 112, w: 12, h: 6, kind: "pill" },
  home: { x: 200, y: 90, w: 15, kind: "round" },
};

const SPECS: Record<Shape, Spec> = {
  dualsense: dualSense(false),
  dualsenseEdge: dualSense(true),
  ds4: DS4,
  ds3: DS3,
  xbox: XBOX,
  switchPro: SWITCH_PRO,
  joycons: JOYCONS,
  ultimate: ULTIMATE,
  sn30pro: SN30PRO,
  retro: RETRO,
  handheld: HANDHELD,
  generic: GENERIC,
};

const FACE_LABELS: Record<Glyphs, [string, string, string, string]> = {
  // Bottom, right, left, top: the standard mapping's buttons 0 to 3.
  xbox: ["A", "B", "X", "Y"],
  nintendo: ["B", "A", "Y", "X"],
  ps: ["", "", "", ""],
};

function PsGlyph({ i, x, y, r, color }: { i: number; x: number; y: number; r: number; color: string }) {
  const k = r / 10.5;
  const common = { fill: "none", stroke: color, strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (i === 0) return <path d={`M${x - 3.6 * k} ${y - 3.6 * k}l${7.2 * k} ${7.2 * k}M${x + 3.6 * k} ${y - 3.6 * k}l${-7.2 * k} ${7.2 * k}`} {...common} />;
  if (i === 1) return <circle cx={x} cy={y} r={4 * k} {...common} />;
  if (i === 2) return <rect x={x - 3.6 * k} y={y - 3.6 * k} width={7.2 * k} height={7.2 * k} rx={0.6} {...common} />;
  return <path d={`M${x} ${y - 4.4 * k}L${x + 4.4 * k} ${y + 3 * k}H${x - 4.4 * k}Z`} {...common} />;
}

type Props = {
  shape: Shape;
  glyphs: Glyphs;
  /** Button values, standard mapping order, 0 to 1. */
  buttons: number[];
  /** Left x, left y, right x, right y, -1 to 1. */
  axes: number[];
  dim?: boolean;
  className?: string;
  /** Pointer presses on the drawing, for the example mode. */
  onPress?: (index: number, down: boolean) => void;
};


export function PadDrawing({ shape, glyphs, buttons, axes, dim, className = "", onPress }: Props) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const id = (s: string) => `oc-${s}-${uid}`;
  const url = (s: string) => `url(#${id(s)})`;
  const S = SPECS[shape] ?? GENERIC;

  const v = (i: number) => buttons[i] ?? 0;
  const on = (i: number) => v(i) > 0.08;
  const fill = (i: number) => (on(i) ? ACCENT : PART);
  const stroke = (i: number) => (on(i) ? ACCENT : LINE);
  const glow = (i: number) => (on(i) ? url("glow") : undefined);

  const press = (i: number) =>
    onPress
      ? {
          onPointerDown: (e: React.PointerEvent) => {
            (e.currentTarget as Element).setPointerCapture?.(e.pointerId);
            onPress(i, true);
          },
          onPointerUp: () => onPress(i, false),
          onPointerCancel: () => onPress(i, false),
          style: { cursor: "pointer" },
        }
      : {};

  const small = (b: Btn, i: number) => {
    const h = b.h ?? b.w;
    const t = b.rot ? `rotate(${b.rot} ${b.x} ${b.y})` : undefined;
    const common = { fill: fill(i), stroke: stroke(i), filter: glow(i), className: "pad-part", transform: t, ...press(i) };
    if (b.kind === "round") return <circle cx={b.x} cy={b.y} r={b.w / 2} {...common} />;
    if (b.kind === "square") return <rect x={b.x - b.w / 2} y={b.y - h / 2} width={b.w} height={h} rx={2} {...common} />;
    if (b.kind === "start") return <path d={`M${b.x - b.w / 2} ${b.y - h / 2}L${b.x + b.w / 2} ${b.y}L${b.x - b.w / 2} ${b.y + h / 2}Z`} strokeLinejoin="round" {...common} />;
    if (b.kind === "plus") {
      const a = b.w / 2;
      const w = b.w * 0.17;
      return (
        <path
          d={`M${b.x - w} ${b.y - a}H${b.x + w}V${b.y - w}H${b.x + a}V${b.y + w}H${b.x + w}V${b.y + a}H${b.x - w}V${b.y + w}H${b.x - a}V${b.y - w}H${b.x - w}Z`}
          strokeLinejoin="round"
          {...common}
        />
      );
    }
    return <rect x={b.x - b.w / 2} y={b.y - h / 2} width={b.w} height={h} rx={Math.min(b.w, h) / 2} {...common} />;
  };

  const stick = (c: Stick, ax: number, ay: number, click: number) => {
    const mx = Math.max(-1, Math.min(1, ax || 0));
    const my = Math.max(-1, Math.min(1, ay || 0));
    const moved = Math.hypot(mx, my) > 0.2;
    const lit = on(click);
    const cap = c.r * 0.7;
    const cx = c.x + mx * c.r * 0.34;
    const cy = c.y + my * c.r * 0.34;
    return (
      <g {...press(click)}>
        {S.stickRings ? <circle cx={c.x} cy={c.y} r={c.r + 4} fill="none" stroke={moved || lit ? "rgba(96,205,255,0.7)" : "rgba(255,255,255,0.16)"} strokeWidth={1.6} /> : null}
        <circle cx={c.x} cy={c.y} r={c.r} fill="rgba(0,0,0,0.55)" stroke={moved || lit ? "rgba(96,205,255,0.55)" : "rgba(255,255,255,0.14)"} className="pad-part" />
        <circle cx={cx} cy={cy} r={cap} fill={lit ? ACCENT : url("cap")} stroke={moved || lit ? ACCENT : "rgba(255,255,255,0.26)"} strokeWidth={1.4} filter={lit ? url("glow") : undefined} />
        <circle cx={cx} cy={cy} r={cap * 0.62} fill="none" stroke={lit ? "rgba(0,20,31,0.35)" : "rgba(255,255,255,0.08)"} />
      </g>
    );
  };

  /** A shoulder button: the body raised by `up`, cut by an ellipse, peeking out behind the body. */
  const shoulder = (sh: Shoulder, i: number, mirror: boolean, isTrigger: boolean) => {
    const val = Math.max(0, Math.min(1, v(i)));
    const lit = val > 0.05;
    const cx = mirror ? 400 - sh.x : sh.x;
    const raised = `translate(0 ${-sh.up})`;
    const cut = id(`cut${i}`);
    const up = id(`up${i}`);
    const bandTop = S.top - sh.up;
    const bandBottom = S.top - (S.lb.up - 2);
    const h = (bandBottom - bandTop) * val;
    const solid = !isTrigger && lit;
    return (
      <g {...press(i)}>
        <clipPath id={cut}>
          <ellipse cx={cx} cy={sh.y} rx={sh.rx} ry={sh.ry} />
        </clipPath>
        <clipPath id={up}>
          {S.body.map((d, k) => (
            <path key={k} d={d} transform={raised} />
          ))}
        </clipPath>
        <g clipPath={`url(#${cut})`} filter={solid ? url("glow") : undefined}>
          {S.body.map((d, k) => (
            <path
              key={k}
              d={d}
              transform={raised}
              fill={solid ? ACCENT : isTrigger ? "#0d0e11" : "#121418"}
              stroke={lit ? ACCENT : "rgba(255,255,255,0.2)"}
              className="pad-part"
            />
          ))}
        </g>
        <g clipPath={`url(#${up})`}>
          <ellipse cx={cx} cy={sh.y} rx={sh.rx} ry={sh.ry} fill="none" stroke={lit ? ACCENT : "rgba(255,255,255,0.2)"} />
          {isTrigger && val > 0.02 ? (
            <g clipPath={`url(#${cut})`}>
              <rect x={0} y={bandBottom - h} width={400} height={h + 40} fill={ACCENT} opacity={0.9} />
            </g>
          ) : null}
        </g>
      </g>
    );
  };

  const D = S.dpad;
  const dpad = () => {
    const { x, y, s } = D;
    if (D.kind === "buttons") {
      const r = s * 0.5;
      const at: [number, number, number][] = [
        [12, x, y - s],
        [13, x, y + s],
        [14, x - s, y],
        [15, x + s, y],
      ];
      return at.map(([i, bx, by]) => <circle key={i} cx={bx} cy={by} r={r} fill={fill(i)} stroke={stroke(i)} filter={glow(i)} className="pad-part" {...press(i)} />);
    }
    if (D.kind === "split") {
      const w = s * 0.62;
      const g = s * 0.22;
      // An arrow key pointing up, rotated for each direction.
      const d = `M${x - w / 2} ${y - s}H${x + w / 2}V${y - g - w * 0.42}L${x} ${y - g}L${x - w / 2} ${y - g - w * 0.42}Z`;
      const rot: [number, number][] = [
        [12, 0],
        [13, 180],
        [14, 270],
        [15, 90],
      ];
      return rot.map(([i, a]) => (
        <path key={i} d={d} transform={a ? `rotate(${a} ${x} ${y})` : undefined} fill={fill(i)} stroke={stroke(i)} strokeLinejoin="round" filter={glow(i)} className="pad-part" {...press(i)} />
      ));
    }
    const w = s * 0.68;
    const h = w / 2;
    const plus = `M${x - h} ${y - s}H${x + h}V${y - h}H${x + s}V${y + h}H${x + h}V${y + s}H${x - h}V${y + h}H${x - s}V${y - h}H${x - h}Z`;
    const arms: [number, number, number, number, number][] = [
      [12, x - h, y - s, w, s - 1],
      [13, x - h, y + 1, w, s - 1],
      [14, x - s, y - h, s - 1, w],
      [15, x + 1, y - h, s - 1, w],
    ];
    return (
      <>
        <path d={plus} fill={PART} stroke={LINE} strokeLinejoin="round" />
        {arms.map(([i, ax, ay, aw, ah]) => (
          <rect key={i} x={ax} y={ay} width={aw} height={ah} rx={1.5} fill={on(i) ? ACCENT : "transparent"} filter={glow(i)} className="pad-part" {...press(i)} />
        ))}
      </>
    );
  };

  const F = S.face;
  const faces: [number, number, number][] = [
    [0, F.x, F.y + F.gap],
    [1, F.x + F.gap, F.y],
    [2, F.x - F.gap, F.y],
    [3, F.x, F.y - F.gap],
  ];
  const tint = (i: number) => (F.tint ? (glyphs === "ps" ? PS_TINT[i] : glyphs === "xbox" ? XBOX_TINT[i] : GLYPH) : GLYPH);

  return (
    <svg
      viewBox="0 0 400 280"
      className={`h-auto w-full select-none ${className}`}
      style={{ opacity: dim ? 0.5 : 1, touchAction: onPress ? "none" : undefined, transition: "opacity 300ms" }}
      aria-hidden
    >
      <defs>
        <linearGradient id={id("sheen")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity={0.11} />
          <stop offset="0.55" stopColor="#fff" stopOpacity={0.05} />
          <stop offset="1" stopColor="#fff" stopOpacity={0.025} />
        </linearGradient>
        <radialGradient id={id("cap")} cx="0.4" cy="0.35" r="0.75">
          <stop offset="0" stopColor="#2a2f37" />
          <stop offset="1" stopColor="#14171c" />
        </radialGradient>
        <clipPath id={id("body")}>
          {S.body.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </clipPath>
        <filter id={id("glow")} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feColorMatrix in="b" values="0 0 0 0 0.376  0 0 0 0 0.804  0 0 0 0 1  0 0 0 0.9 0" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {S.lt ? shoulder(S.lt, 6, false, true) : null}
      {S.lt ? shoulder(S.lt, 7, true, true) : null}
      {shoulder(S.lb, 4, false, false)}
      {shoulder(S.lb, 5, true, false)}

      {S.body.map((d, i) => (
        <g key={i}>
          <path d={d} fill="#0b0c0f" />
          <path d={d} fill={url("sheen")} stroke="rgba(255,255,255,0.2)" strokeWidth={1.2} />
        </g>
      ))}
      {S.inner ? <path d={S.inner} clipPath={url("body")} fill="rgba(0,0,0,0.42)" stroke="rgba(255,255,255,0.1)" /> : null}
      {S.wells?.map((w, i) => (
        <circle key={i} cx={w.x} cy={w.y} r={w.r} fill="rgba(0,0,0,0.3)" stroke={SOFT} />
      ))}
      {S.deco?.()}

      {S.touchpad ? (
        <path
          d={S.touchpad}
          fill={on(17) ? "rgba(96,205,255,0.85)" : shape === "dualsenseEdge" ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.07)"}
          stroke={on(17) ? ACCENT : LINE}
          filter={glow(17)}
          className="pad-part"
          {...press(17)}
        />
      ) : null}

      {S.ls ? stick(S.ls, axes[0], axes[1], 10) : null}
      {S.rs ? stick(S.rs, axes[2], axes[3], 11) : null}

      {dpad()}

      {faces.map(([i, x, y]) => (
        <g key={i} {...press(i)}>
          <circle cx={x} cy={y} r={F.r} fill={fill(i)} stroke={stroke(i)} filter={glow(i)} className="pad-part" />
          {glyphs === "ps" ? (
            <PsGlyph i={i} x={x} y={y} r={F.r} color={on(i) ? INK : tint(i)} />
          ) : (
            <text
              x={x}
              y={y + F.r * 0.36}
              textAnchor="middle"
              fontSize={F.r * 0.98}
              fontWeight={650}
              fontFamily="var(--font-geist), system-ui, sans-serif"
              fill={on(i) ? INK : tint(i)}
            >
              {FACE_LABELS[glyphs][i]}
            </text>
          )}
        </g>
      ))}

      {S.select ? small(S.select, 8) : null}
      {S.start ? small(S.start, 9) : null}
      {S.home ? small(S.home, 16) : null}
      {S.capture ? small(S.capture, 17) : null}
    </svg>
  );
}
