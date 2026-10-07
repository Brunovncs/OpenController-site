"use client";

import { useId } from "react";
import type { Glyphs, Shape } from "@/lib/drawings";
import PADS from "@/data/pads.json";

export type { Glyphs, Shape };

/*
 * Front views of controllers on a 400 by 280 grid, traced from each maker's own drawing (the
 * figure in its manual, or a straight product shot). The shapes come from the app's
 * assets/pads.json, so the site and the app draw every controller the same. Buttons use the
 * standard mapping's indices, so the same props light any drawing.
 */

type Btn = { input: string; circle?: [number, number, number]; d?: string; icon?: string; label?: string };
type Stick = { circle: [number, number, number]; well?: number; ring?: [number, number] };
type Pad = {
  body: string;
  bumpers?: [string, string];
  triggers?: [string, string];
  panels?: { style: string; d: string }[];
  touchpad?: string;
  dots?: [number, number, number][];
  sticks?: Stick[];
  buttons: Btn[];
  tint?: boolean;
};

const ALL = PADS as unknown as Record<string, Pad>;

/** The standard mapping's index for each input the geometry names. */
const INDEX: Record<string, number> = {
  south: 0,
  east: 1,
  west: 2,
  north: 3,
  lb: 4,
  rb: 5,
  lt: 6,
  rt: 7,
  back: 8,
  start: 9,
  lstick: 10,
  rstick: 11,
  up: 12,
  down: 13,
  left: 14,
  right: 15,
  guide: 16,
  misc1: 17,
  touchpad: 17,
};
const FACES = ["south", "east", "west", "north"];

const ACCENT = "#60cdff";
const INK = "#00141f";
const LINE = "rgba(255,255,255,0.22)";
const SOFT = "rgba(255,255,255,0.12)";
const PART = "rgba(255,255,255,0.06)";
const GLYPH = "#aeb6c1";

const XBOX_TINT = ["#79dc95", "#ff8080", "#76b3ff", "#ffd36e"];
const PS_TINT = ["#8fb1ff", "#ff8a98", "#f2a2d8", "#6fe0c6"];

const FACE_LABELS: Record<Glyphs, [string, string, string, string]> = {
  xbox: ["A", "B", "X", "Y"],
  nintendo: ["B", "A", "Y", "X"],
  ps: ["", "", "", ""],
  numbers: ["3", "2", "4", "1"],
};

/** The top and bottom of a path, for filling a trigger from the bottom up. */
function ySpan(d: string): [number, number] {
  const n = d.match(/-?\d*\.?\d+/g)?.map(Number) ?? [0, 0];
  const ys = n.filter((_, i) => i % 2 === 1);
  return [Math.min(...ys), Math.max(...ys)];
}

function PsGlyph({ i, x, y, r, color }: { i: number; x: number; y: number; r: number; color: string }) {
  const k = r / 10.5;
  const common = { fill: "none", stroke: color, strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (i === 0) return <path d={`M${x - 3.6 * k} ${y - 3.6 * k}l${7.2 * k} ${7.2 * k}M${x + 3.6 * k} ${y - 3.6 * k}l${-7.2 * k} ${7.2 * k}`} {...common} />;
  if (i === 1) return <circle cx={x} cy={y} r={4 * k} {...common} />;
  if (i === 2) return <rect x={x - 3.6 * k} y={y - 3.6 * k} width={7.2 * k} height={7.2 * k} rx={0.6} {...common} />;
  return <path d={`M${x} ${y - 4.4 * k}L${x + 4.4 * k} ${y + 3 * k}H${x - 4.4 * k}Z`} {...common} />;
}

/** A small button's symbol, in the button's own size. */
function Icon({ name, x, y, r, color }: { name: string; x: number; y: number; r: number; color: string }) {
  const line = { fill: "none", stroke: color, strokeWidth: Math.max(0.9, r * 0.12), strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "minus":
      return <rect x={x - r * 0.45} y={y - r * 0.11} width={r * 0.9} height={r * 0.22} rx={r * 0.05} fill={color} />;
    case "plus":
      return <path d={`M${x - r * 0.45} ${y}H${x + r * 0.45}M${x} ${y - r * 0.45}V${y + r * 0.45}`} {...line} strokeWidth={r * 0.22} strokeLinecap="butt" />;
    case "star": {
      const pts = Array.from({ length: 10 }, (_, i) => {
        const a = -Math.PI / 2 + (i * Math.PI) / 5;
        const rr = i % 2 ? r * 0.25 : r * 0.55;
        return `${(x + rr * Math.cos(a)).toFixed(2)},${(y + rr * Math.sin(a)).toFixed(2)}`;
      });
      return <polygon points={pts.join(" ")} fill={color} />;
    }
    case "square":
      return <rect x={x - r * 0.36} y={y - r * 0.36} width={r * 0.72} height={r * 0.72} rx={r * 0.14} fill={color} />;
    case "ring":
      return <circle cx={x} cy={y} r={r * 0.74} {...line} />;
    case "home":
      return (
        <path
          d={`M${x} ${y - r * 0.5}L${x + r * 0.5} ${y - r * 0.05}H${x + r * 0.32}V${y + r * 0.45}H${x - r * 0.32}V${y - r * 0.05}H${x - r * 0.5}Z`}
          fill={color}
        />
      );
    case "menu":
      return <path d={`M${x - r * 0.42} ${y - r * 0.28}h${r * 0.84}M${x - r * 0.42} ${y}h${r * 0.84}M${x - r * 0.42} ${y + r * 0.28}h${r * 0.84}`} {...line} />;
    case "view":
      return (
        <g {...line}>
          <rect x={x - r * 0.42} y={y - r * 0.12} width={r * 0.55} height={r * 0.44} rx={r * 0.08} />
          <rect x={x - r * 0.13} y={y - r * 0.32} width={r * 0.55} height={r * 0.44} rx={r * 0.08} />
        </g>
      );
    case "xbox":
      return (
        <g {...line}>
          <circle cx={x} cy={y} r={r * 0.62} />
          <path d={`M${x - r * 0.36} ${y - r * 0.36}l${r * 0.72} ${r * 0.72}M${x + r * 0.36} ${y - r * 0.36}l${-r * 0.72} ${r * 0.72}`} />
        </g>
      );
    case "ps":
      return <circle cx={x} cy={y} r={r * 0.5} {...line} />;
    default:
      return null;
  }
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
  const P = ALL[shape] ?? ALL.generic;

  const v = (i: number) => (i >= 0 ? (buttons[i] ?? 0) : 0);
  const on = (i: number) => v(i) > 0.08;
  const fill = (i: number) => (on(i) ? ACCENT : PART);
  const stroke = (i: number) => (on(i) ? ACCENT : LINE);
  const glow = (i: number) => (on(i) ? url("glow") : undefined);

  const press = (i: number) =>
    onPress && i >= 0
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

  const tint = (i: number) => (P.tint ? (glyphs === "ps" ? PS_TINT[i] : glyphs === "xbox" || glyphs === "numbers" ? XBOX_TINT[i] : GLYPH) : GLYPH);

  const trigger = (d: string, i: number, k: number) => {
    const val = Math.max(0, Math.min(1, v(i)));
    const [top, bottom] = ySpan(d);
    const h = (bottom - top) * val;
    return (
      <g key={k} {...press(i)}>
        <clipPath id={id(`tr${i}`)}>
          <path d={d} />
        </clipPath>
        <path d={d} fill="#0d0e11" stroke={val > 0.05 ? ACCENT : "rgba(255,255,255,0.2)"} className="pad-part" />
        {val > 0.02 ? <rect x={0} y={bottom - h} width={400} height={h} fill={ACCENT} opacity={0.9} clipPath={url(`tr${i}`)} /> : null}
      </g>
    );
  };

  const stick = (s: Stick, k: number) => {
    const [x, y, cap] = s.circle;
    const well = s.well ?? cap * 1.18;
    const [ax, ay, click] = k === 0 ? [axes[0], axes[1], 10] : [axes[2], axes[3], 11];
    const mx = Math.max(-1, Math.min(1, ax || 0));
    const my = Math.max(-1, Math.min(1, ay || 0));
    const moved = Math.hypot(mx, my) > 0.2;
    const lit = on(click);
    const reach = Math.max(well - cap, cap * 0.25) * 0.8;
    const cx = x + mx * reach;
    const cy = y + my * reach;
    return (
      <g key={k} {...press(click)}>
        {s.ring ? (
          <circle cx={x} cy={y} r={s.ring[0]} fill="none" stroke={moved || lit ? "rgba(96,205,255,0.7)" : "rgba(255,255,255,0.16)"} strokeWidth={s.ring[1]} />
        ) : null}
        <circle cx={x} cy={y} r={well} fill="rgba(0,0,0,0.55)" stroke={moved || lit ? "rgba(96,205,255,0.55)" : "rgba(255,255,255,0.14)"} className="pad-part" />
        <circle cx={cx} cy={cy} r={cap} fill={lit ? ACCENT : url("cap")} stroke={moved || lit ? ACCENT : "rgba(255,255,255,0.26)"} strokeWidth={1.4} filter={lit ? url("glow") : undefined} />
        <circle cx={cx} cy={cy} r={cap * 0.62} fill="none" stroke={lit ? "rgba(0,20,31,0.35)" : "rgba(255,255,255,0.08)"} />
      </g>
    );
  };

  const button = (b: Btn, k: number) => {
    const i = INDEX[b.input] ?? -1;
    const face = FACES.indexOf(b.input);
    const symbol = on(i) ? INK : face >= 0 ? tint(face) : GLYPH;
    if (!b.circle) return <path key={k} d={b.d} fill={fill(i)} stroke={stroke(i)} strokeLinejoin="round" filter={glow(i)} className="pad-part" {...press(i)} />;
    const [x, y, r] = b.circle;
    return (
      <g key={k} {...press(i)}>
        <circle cx={x} cy={y} r={r} fill={fill(i)} stroke={stroke(i)} filter={glow(i)} className="pad-part" />
        {face >= 0 && glyphs === "ps" && !b.label ? <PsGlyph i={face} x={x} y={y} r={r} color={symbol} /> : null}
        {b.label || (face >= 0 && glyphs !== "ps") ? (
          <text x={x} y={y + r * 0.36} textAnchor="middle" fontSize={r * 0.98} fontWeight={650} fontFamily="var(--font-geist), system-ui, sans-serif" fill={symbol}>
            {b.label ?? FACE_LABELS[glyphs][face]}
          </text>
        ) : null}
        {face < 0 && b.icon ? <Icon name={b.icon} x={x} y={y} r={r} color={symbol} /> : null}
      </g>
    );
  };

  const panel = (p: { style: string; d: string }, k: number) => {
    if (p.style === "line") return <path key={k} d={p.d} fill="none" stroke={SOFT} strokeWidth={1.2} />;
    if (p.style === "glow") return <path key={k} d={p.d} fill="none" stroke="rgba(96,205,255,0.55)" strokeWidth={2.2} />;
    if (p.style === "light") return <path key={k} d={p.d} fill="rgba(96,205,255,0.28)" stroke="rgba(96,205,255,0.5)" />;
    if (p.style === "part") return <path key={k} d={p.d} fill="rgba(0,0,0,0.35)" stroke={LINE} />;
    return <path key={k} d={p.d} fill="rgba(0,0,0,0.3)" stroke={SOFT} />;
  };

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
        <filter id={id("glow")} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feColorMatrix in="b" values="0 0 0 0 0.376  0 0 0 0 0.804  0 0 0 0 1  0 0 0 0.9 0" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {P.triggers?.map((d, k) => trigger(d, k === 0 ? 6 : 7, k))}
      {P.bumpers?.map((d, k) => {
        const i = k === 0 ? 4 : 5;
        return <path key={k} d={d} fill={on(i) ? ACCENT : "#121418"} stroke={on(i) ? ACCENT : "rgba(255,255,255,0.2)"} filter={glow(i)} className="pad-part" {...press(i)} />;
      })}

      <path d={P.body} fill="#0b0c0f" />
      <path d={P.body} fill={url("sheen")} stroke="rgba(255,255,255,0.2)" strokeWidth={1.2} />
      {P.panels?.map(panel)}
      {P.dots?.map(([x, y, r], k) => (
        <circle key={k} cx={x} cy={y} r={r} fill="rgba(255,255,255,0.28)" />
      ))}

      {P.touchpad ? (
        <path
          d={P.touchpad}
          fill={on(17) ? "rgba(96,205,255,0.85)" : shape === "dualsenseEdge" ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.07)"}
          stroke={on(17) ? ACCENT : LINE}
          filter={glow(17)}
          className="pad-part"
          {...press(17)}
        />
      ) : null}

      {P.sticks?.slice(0, 2).map(stick)}
      {P.buttons.map(button)}
    </svg>
  );
}
