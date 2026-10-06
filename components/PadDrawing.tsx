"use client";

import type { Art } from "@/lib/models";

export type Glyphs = "xbox" | "ps" | "nintendo";

type Pt = [number, number];
type Layout = {
  ls: Pt | null;
  rs: Pt | null;
  dpad: Pt;
  face: Pt;
  select: Pt;
  start: Pt;
  home: Pt | null;
  touchpad: [number, number, number, number] | null;
};

const LAYOUTS: Record<"offset" | "symmetric" | "playstation" | "retro", Layout> = {
  offset: { ls: [120, 108], rs: [240, 160], dpad: [160, 160], face: [282, 108], select: [180, 110], start: [220, 110], home: [200, 84], touchpad: null },
  symmetric: { ls: [158, 164], rs: [242, 164], dpad: [116, 108], face: [284, 108], select: [180, 102], start: [220, 102], home: [200, 132], touchpad: null },
  playstation: { ls: [156, 168], rs: [244, 168], dpad: [108, 112], face: [292, 112], select: [146, 78], start: [254, 78], home: [200, 152], touchpad: [160, 66, 80, 52] },
  retro: { ls: null, rs: null, dpad: [124, 126], face: [276, 126], select: [184, 138], start: [216, 138], home: null, touchpad: null },
};

function layoutFor(art: Art): Layout {
  if (art === "PlayStation") return LAYOUTS.playstation;
  if (art === "Symmetric") return LAYOUTS.symmetric;
  if (art === "Retro") return LAYOUTS.retro;
  return LAYOUTS.offset;
}

const BODY =
  "M122 60C152 54 248 54 278 60C328 68 350 92 364 140C377 188 383 226 354 238C332 246 314 228 298 208C287 194 275 188 258 188H142C125 188 113 194 102 208C86 228 68 246 46 238C17 226 23 188 36 140C50 92 72 68 122 60Z";

const FACE_LABELS: Record<Glyphs, [string, string, string, string]> = {
  // bottom, right, left, top: the order of the standard mapping's buttons 0 to 3.
  xbox: ["A", "B", "X", "Y"],
  nintendo: ["B", "A", "Y", "X"],
  ps: ["", "", "", ""],
};

const ACCENT = "#60cdff";
const PART = "#0d0f12";
const PART_STROKE = "rgba(255,255,255,0.13)";
const GLYPH = "#8d97a5";
const INK = "#00141f";

type Props = {
  art: Art;
  glyphs: Glyphs;
  /** Button values, standard mapping order, 0 to 1. */
  buttons: number[];
  /** Left x, left y, right x, right y, -1 to 1. */
  axes: number[];
  dim?: boolean;
  /** Pointer presses on the drawing, for the example mode. */
  onPress?: (index: number, down: boolean) => void;
};

function PsGlyph({ i, x, y, lit }: { i: number; x: number; y: number; lit: boolean }) {
  const c = lit ? INK : GLYPH;
  const common = { fill: "none", stroke: c, strokeWidth: 1.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (i === 0) return <path d={`M${x - 3.2} ${y - 3.2}l6.4 6.4M${x + 3.2} ${y - 3.2}l-6.4 6.4`} {...common} />;
  if (i === 1) return <circle cx={x} cy={y} r={3.6} {...common} />;
  if (i === 2) return <rect x={x - 3.3} y={y - 3.3} width={6.6} height={6.6} rx={0.6} {...common} />;
  return <path d={`M${x} ${y - 4}L${x + 4} ${y + 2.8}H${x - 4}Z`} {...common} />;
}

export function PadDrawing({ art, glyphs, buttons, axes, dim, onPress }: Props) {
  const L = layoutFor(art);
  const v = (i: number) => buttons[i] ?? 0;
  const on = (i: number) => v(i) > 0.08;
  const fill = (i: number) => (on(i) ? ACCENT : PART);
  const stroke = (i: number) => (on(i) ? ACCENT : PART_STROKE);
  const glow = (i: number) => (on(i) ? "url(#oc-glow)" : undefined);

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

  const [fx, fy] = L.face;
  const faces: [number, Pt][] = [
    [0, [fx, fy + 18]],
    [1, [fx + 18, fy]],
    [2, [fx - 18, fy]],
    [3, [fx, fy - 18]],
  ];

  const [dx, dy] = L.dpad;
  const dpad: [number, number, number, number, number][] = [
    [12, dx - 5, dy - 16, 10, 11],
    [13, dx - 5, dy + 5, 10, 11],
    [14, dx - 16, dy - 5, 11, 10],
    [15, dx + 5, dy - 5, 11, 10],
  ];

  const stick = (c: Pt, ax: number, ay: number, click: number) => {
    const mx = Math.max(-1, Math.min(1, ax || 0));
    const my = Math.max(-1, Math.min(1, ay || 0));
    const moved = Math.hypot(mx, my) > 0.2;
    const lit = on(click);
    return (
      <g {...press(click)}>
        <circle cx={c[0]} cy={c[1]} r={22} fill="#07080a" stroke={moved || lit ? "rgba(96,205,255,0.55)" : PART_STROKE} className="pad-part" />
        <circle
          cx={c[0] + mx * 8}
          cy={c[1] + my * 8}
          r={14.5}
          fill={lit ? ACCENT : "#1a1d22"}
          stroke={moved || lit ? ACCENT : "rgba(255,255,255,0.16)"}
          strokeWidth={1.5}
          filter={lit ? "url(#oc-glow)" : undefined}
        />
        <circle cx={c[0] + mx * 8} cy={c[1] + my * 8} r={9} fill="none" stroke={lit ? "rgba(0,20,31,0.35)" : "rgba(255,255,255,0.06)"} />
      </g>
    );
  };

  const trigger = (i: number, x: number) => {
    const val = Math.max(0, Math.min(1, v(i)));
    return (
      <g {...press(i)}>
        <rect x={x} y={22} width={52} height={10} rx={5} fill={PART} stroke={val > 0.05 ? ACCENT : PART_STROKE} className="pad-part" />
        {val > 0.02 ? <rect x={x} y={22} width={Math.max(10, 52 * val)} height={10} rx={5} fill={ACCENT} filter="url(#oc-glow)" /> : null}
      </g>
    );
  };

  return (
    <svg viewBox="0 0 400 252" className="h-auto w-full select-none" style={{ opacity: dim ? 0.55 : 1, touchAction: onPress ? "none" : undefined }} aria-hidden>
      <defs>
        <linearGradient id="oc-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#24282f" />
          <stop offset="1" stopColor="#14161a" />
        </linearGradient>
        <filter id="oc-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feColorMatrix in="b" values="0 0 0 0 0.376  0 0 0 0 0.804  0 0 0 0 1  0 0 0 0.9 0" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {trigger(6, 92)}
      {trigger(7, 256)}
      <rect x={84} y={40} width={68} height={10} rx={5} fill={fill(4)} stroke={stroke(4)} filter={glow(4)} className="pad-part" {...press(4)} />
      <rect x={248} y={40} width={68} height={10} rx={5} fill={fill(5)} stroke={stroke(5)} filter={glow(5)} className="pad-part" {...press(5)} />

      <path d={BODY} fill="url(#oc-body)" stroke="rgba(255,255,255,0.1)" strokeWidth={1.2} />

      {L.touchpad ? (
        <rect
          x={L.touchpad[0]}
          y={L.touchpad[1]}
          width={L.touchpad[2]}
          height={L.touchpad[3]}
          rx={8}
          fill={on(17) ? "rgba(96,205,255,0.85)" : "#101216"}
          stroke={on(17) ? ACCENT : PART_STROKE}
          filter={glow(17)}
          className="pad-part"
          {...press(17)}
        />
      ) : null}

      {L.ls ? stick(L.ls, axes[0], axes[1], 10) : null}
      {L.rs ? stick(L.rs, axes[2], axes[3], 11) : null}

      <g>
        <rect x={dx - 5} y={dy - 5} width={10} height={10} fill={PART} />
        {dpad.map(([i, x, y, w, h]) => (
          <rect key={i} x={x} y={y} width={w} height={h} rx={2.2} fill={fill(i)} stroke={stroke(i)} filter={glow(i)} className="pad-part" {...press(i)} />
        ))}
      </g>

      {faces.map(([i, [x, y]]) => (
        <g key={i} {...press(i)}>
          <circle cx={x} cy={y} r={9.5} fill={fill(i)} stroke={stroke(i)} filter={glow(i)} className="pad-part" />
          {glyphs === "ps" ? (
            <PsGlyph i={i} x={x} y={y} lit={on(i)} />
          ) : (
            <text
              x={x}
              y={y + 3.4}
              textAnchor="middle"
              fontSize={9.5}
              fontWeight={600}
              fontFamily="var(--font-geist), system-ui, sans-serif"
              fill={on(i) ? INK : GLYPH}
            >
              {FACE_LABELS[glyphs][i]}
            </text>
          )}
        </g>
      ))}

      <rect x={L.select[0] - 8} y={L.select[1] - 3.5} width={16} height={7} rx={3.5} fill={fill(8)} stroke={stroke(8)} filter={glow(8)} className="pad-part" {...press(8)} />
      <rect x={L.start[0] - 8} y={L.start[1] - 3.5} width={16} height={7} rx={3.5} fill={fill(9)} stroke={stroke(9)} filter={glow(9)} className="pad-part" {...press(9)} />
      {L.home ? (
        <circle cx={L.home[0]} cy={L.home[1]} r={7.5} fill={fill(16)} stroke={stroke(16)} filter={glow(16)} className="pad-part" {...press(16)} />
      ) : null}
    </svg>
  );
}
