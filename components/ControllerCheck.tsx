"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import SegmentedControl from "@/components/arc/segmented-control/segmented-control";
import { glyphsFor, shapeFor, type Glyphs, type Shape } from "@/lib/drawings";
import { FAMILIES, familyText, hintText, type Family } from "@/lib/families";
import { HTML_LANG } from "@/lib/i18n";
import { MODELS, gamepadName, lookup, parseGamepadId } from "@/lib/models";
import { fmt, rich } from "@/lib/text";
import { track } from "@/lib/track";
import type { CheckMessages } from "@/messages/en/check";
import { PadDrawing } from "./PadDrawing";
import { openRequest } from "./RequestDialog";
import { useHtmlData, useLang, useT } from "./lang";

type Snap = { index: number; id: string; mapping: string; buttons: number[]; axes: number[] };

const EXAMPLES = [
  { id: "054c:0ce6", label: "DualSense" },
  { id: "054c:0df2", label: "DualSense Edge" },
  { id: "054c:09cc", label: "DualShock 4" },
  { id: "054c:0268", label: "DualShock 3" },
  { id: "045e:0b12", label: "Xbox Series" },
  { id: "057e:2009", label: "Switch Pro" },
  { id: "057e:2008", label: "Joy-Con" },
  { id: "2dc8:6012", label: "8BitDo Ultimate 2" },
  { id: "2dc8:6003", label: "8BitDo Pro 2" },
  { id: "2dc8:2862", label: "8BitDo SN30" },
];

/** Ids that other controllers copy along with the chip: Xbox 360, DualShock 4 and Switch Pro. */
const COPIED = new Set(["045e:028e", "054c:05c4", "054c:09cc", "057e:2009"]);

const PHYSICAL: Record<Glyphs, string[]> = {
  xbox: ["A", "B", "X", "Y", "LB", "RB", "LT", "RT", "View", "Menu", "LS", "RS", "↑", "↓", "←", "→", "Home"],
  ps: ["Cross", "Circle", "Square", "Triangle", "L1", "R1", "L2", "R2", "Share", "Options", "L3", "R3", "↑", "↓", "←", "→", "PS", "Touchpad"],
  nintendo: ["B", "A", "Y", "X", "L", "R", "ZL", "ZR", "−", "+", "L stick", "R stick", "↑", "↓", "←", "→", "Home", "Capture"],
  numbers: ["3", "2", "4", "1", "L1", "R1", "L2", "R2", "Select", "Start", "L3", "R3", "↑", "↓", "←", "→", "Home"],
};

function q(n: number) {
  return Math.round(n * 50) / 50;
}

function snapshot(g: Gamepad): Snap {
  return {
    index: g.index,
    id: g.id,
    mapping: g.mapping,
    buttons: g.buttons.map((b) => q(b.pressed && b.value < 0.1 ? 1 : b.value)),
    axes: Array.from(g.axes, (a) => (Math.abs(a) < 0.08 ? 0 : q(a))),
  };
}

function noop() {
  return () => {};
}

function physicalName(glyphs: Glyphs, shape: Shape, i: number, family: string | null) {
  if (glyphs === "ps" && i === 8 && (family === "DualSense" || family === "DualSenseEdge")) return "Create";
  if (glyphs === "xbox" && i === 16 && shape === "xbox") return "Xbox";
  return PHYSICAL[glyphs][i] ?? `#${i + 1}`;
}

function Yes({ children }: { children: React.ReactNode }) {
  return <span className="text-fg">{children}</span>;
}
function No({ children }: { children: React.ReactNode }) {
  return <span className="text-faint">{children}</span>;
}

function verdict(v: CheckMessages["verdict"], family: Family, os: string, hint: string | null): string {
  if (hint === "EightBitDoDInput" && os !== "mac") return v.dinput;
  if (family.unsupported) return v.unsupported;
  if (family.id === "Handheld") return v.handheld;
  if (family.passthrough) return v.passthrough;
  if (os === "mac") return v.mac;
  return v.works;
}

function Capabilities({ family }: { family: Family }) {
  const m = useT();
  const c = m.check.caps;
  const rows: [string, React.ReactNode][] = [
    [c.extras, family.extras ? <Yes>{familyText(m.compat.families, family.id).extras}</Yes> : <No>{c.none}</No>],
    [c.motion, family.gyro === "yes" ? <Yes>{c.yes}</Yes> : family.gyro === "dinput" ? <Yes>{c.dinput}</Yes> : <No>{c.no}</No>],
    [c.light, family.lightBar ? <Yes>{c.lightYes}</Yes> : <No>{c.no}</No>],
    [c.touchpad, family.touchpad ? <Yes>{c.touchpadYes}</Yes> : <No>{c.no}</No>],
  ];
  return (
    <dl className="mt-6 divide-y divide-line border-y border-line text-[14.5px]">
      {rows.map(([k, val], i) => (
        <div key={i} className="grid grid-cols-[9rem_1fr] gap-3 py-3 sm:grid-cols-[11rem_1fr]">
          <dt className="text-muted">{k}</dt>
          <dd>{val}</dd>
        </div>
      ))}
    </dl>
  );
}

type State = "idle" | "known" | "unknown" | "xinput" | "anon";

function StatusPill({ state, example }: { state: State; example: boolean }) {
  const status = useT().check.status;
  const tone = example
    ? "border-accent/40 bg-accent/10 text-accent"
    : state === "idle"
      ? "border-line-strong bg-white/[0.03] text-muted"
      : state === "known"
        ? "border-ok/40 bg-ok/10 text-ok"
        : "border-warn/40 bg-warn/10 text-warn";
  return (
    <span className={`inline-flex h-8 items-center gap-2.5 rounded-full border px-3.5 text-[14px] font-medium ${tone}`}>
      <span className="pulse inline-block size-2 rounded-full bg-current" aria-hidden />
      {example ? status.example : status[state]}
    </span>
  );
}

/** check.idle.help: the reason about Brave and ad blockers, left out when the Brave warning already shows. */
const BLOCKER_REASON = 1;

export function ControllerCheck() {
  const lang = useLang();
  const m = useT();
  const t = m.check;
  const rootRef = useRef<HTMLDivElement>(null);
  const [pads, setPads] = useState<Snap[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const [example, setExample] = useState<string | null>(null);
  const [exampleDown, setExampleDown] = useState<number[]>([]);
  const os = useHtmlData("os", "other");
  const supported = useSyncExternalStore(
    noop,
    () => typeof navigator.getGamepads === "function",
    () => true,
  );
  // Brave has the Gamepad API but hands websites no controllers.
  const brave = useSyncExternalStore(
    noop,
    () => "brave" in navigator,
    () => false,
  );

  useEffect(() => {
    if (typeof navigator.getGamepads !== "function" || !rootRef.current) return;
    let raf = 0;
    let visible = false;
    let sig = "";
    const prev = new Map<number, string>();

    const read = () => {
      const list = Array.from(navigator.getGamepads()).filter((g): g is Gamepad => !!g && g.connected);
      const snaps = list.map(snapshot);
      const s = JSON.stringify(snaps);
      if (s === sig) return;
      sig = s;
      for (const p of snaps) {
        const ps = JSON.stringify(p);
        if (prev.get(p.index) !== ps) {
          prev.set(p.index, ps);
          if (p.buttons.some((b) => b > 0.1) || p.axes.some((a) => Math.abs(a) > 0.3)) {
            setActive(p.index);
            setExample(null);
          }
        }
      }
      setPads(snaps);
    };
    const loop = () => {
      read();
      raf = visible && !document.hidden ? requestAnimationFrame(loop) : 0;
    };
    const start = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) start();
    });
    io.observe(rootRef.current);
    const onConnect = (e: GamepadEvent) => {
      setActive(e.gamepad.index);
      setExample(null);
      start();
    };
    const onDisconnect = () => requestAnimationFrame(read);
    const onVisibility = () => {
      if (visible && !document.hidden) start();
    };
    window.addEventListener("gamepadconnected", onConnect);
    window.addEventListener("gamepaddisconnected", onDisconnect);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("gamepadconnected", onConnect);
      window.removeEventListener("gamepaddisconnected", onDisconnect);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const pad = example ? null : (pads.find((p) => p.index === active) ?? pads[0] ?? null);
  const parsed = pad ? parseGamepadId(pad.id) : null;
  const model = useMemo(() => {
    if (example) {
      const [v, p] = example.split(":");
      return lookup(v, p);
    }
    return parsed ? lookup(parsed.vendor, parsed.product) : null;
  }, [example, parsed]);
  const family = model ? (FAMILIES[model.family] ?? FAMILIES.Other) : null;
  const lookalikes = model ? MODELS.filter((x) => x.id === model.id && x.alias_of).map((x) => x.name) : [];
  const hint = model ? hintText(m.compat.hints, model.hint) : null;
  const note = family ? familyText(m.compat.families, family.id).note : "";
  // A pad Windows hands over as XInput has no ids ("Xbox 360 Controller (XInput STANDARD GAMEPAD)",
  // or the device's own name in the system's language), and is an Xbox controller as far as anyone
  // can tell.
  const xboxOnly = !model && !parsed && !!pad && /xinput|xbox/i.test(pad.id);
  // With no controller yet, the Xbox one: the shape most people know, and what games expect.
  const shape: Shape = (!pad && !example) || xboxOnly ? "xbox" : shapeFor(model, parsed?.vendor ?? null);
  const glyphs = glyphsFor(model, parsed?.vendor ?? null, shape);
  const buttons = example ? Array.from({ length: 18 }, (_, i) => (exampleDown.includes(i) ? 1 : 0)) : (pad?.buttons ?? []);
  const axes = pad?.axes ?? [0, 0, 0, 0];
  const pressed = buttons.map((b, i) => [b, i] as const).filter(([b]) => b > 0.1).map(([, i]) => i);

  const state: State = example
    ? "known"
    : !pad
      ? "idle"
      : model
        ? "known"
        : parsed
          ? "unknown"
          : xboxOnly
            ? "xinput"
            : "anon";

  // Which controllers people test, once per controller and page: the model when it is known,
  // and the browser's name for it when it is not, since that is the one to add.
  const tested = useRef(new Set<string>());
  const testedId = !example && pad && state !== "idle" ? pad.id : null;
  const testedName = state === "known" ? model?.name : state;
  useEffect(() => {
    if (!testedId || !testedName || tested.current.has(testedId)) return;
    tested.current.add(testedId);
    track("test", testedName, testedId.slice(0, 150));
  }, [testedId, testedName]);

  const showFamily = (id: string) => {
    window.dispatchEvent(new CustomEvent("oc-family", { detail: id }));
    document.getElementById("controllers")?.scrollIntoView({ block: "start" });
  };

  const link = "text-fg underline decoration-line-strong underline-offset-4 hover:decoration-fg";
  const askForIt = () =>
    openRequest({
      model: pad ? gamepadName(pad.id) : "",
      ids: parsed ? `${parsed.vendor}:${parsed.product}` : "",
      browserId: pad?.id ?? "",
    });

  return (
    <div ref={rootRef}>
      <div className="card">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3 border-b border-line px-5 py-4 sm:px-8">
          <p role="status" aria-live="polite" className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2">
            <StatusPill state={state} example={!!example} />
            {pad ? <span className="min-w-0 truncate text-[14px] text-muted">{gamepadName(pad.id)}</span> : null}
          </p>
          {pads.length > 1 && !example ? (
            <SegmentedControl
              className="ml-auto"
              label={t.controllers}
              value={String(pad?.index ?? -1)}
              onValueChange={(v) => setActive(Number(v))}
              options={pads.map((p) => ({ value: String(p.index), label: String(p.index + 1) }))}
            />
          ) : null}
        </div>

        <div className="grid lg:grid-cols-[1.1fr_1fr]">
          <div className="relative flex flex-col justify-center border-b border-line px-5 py-8 sm:px-10 sm:py-10 lg:border-b-0 lg:border-r">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]"
            />
            <div className="relative mx-auto w-full max-w-[560px]">
              <PadDrawing
                shape={shape}
                glyphs={glyphs}
                buttons={buttons}
                axes={axes}
                dim={state === "idle" && !example}
                onPress={
                  example
                    ? (i, down) => setExampleDown((d) => (down ? [...d.filter((x) => x !== i), i] : d.filter((x) => x !== i)))
                    : undefined
                }
              />
            </div>

            <div className="relative mt-6 min-h-[60px]">
              {state === "idle" && !example ? null : (
                <>
                  <p className="label mb-2.5">{t.pressed}</p>
                  {pressed.length ? (
                    <ul className="flex flex-wrap gap-1.5">
                      {pressed.map((i) => (
                        <li key={i} className="flex items-center gap-1.5 rounded-md border border-accent/40 bg-accent/10 px-2.5 py-1 font-mono text-[13px] text-fg">
                          {physicalName(glyphs, shape, i, model?.family ?? null)}
                          {i > 16 ? <span className="text-accent">{t.extra}</span> : null}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-[14px] text-faint">{example ? t.pressExample : t.pressAny}</p>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-8 px-5 py-8 sm:px-8 sm:py-10">
            <div aria-live="polite">
              {state === "idle" ? (
                <div>
                  <h3 className="text-balance text-[26px] font-semibold leading-[1.15] tracking-[-0.025em] sm:text-[30px]">{t.idle.title}</h3>
                  <p className="mt-3 text-[16px] leading-relaxed text-muted">{t.idle.body}</p>
                  {!supported || brave ? (
                    <p className="mt-5 rounded-lg border border-warn/30 bg-warn/5 p-3 text-[15px] leading-relaxed text-warn">
                      {brave ? t.idle.brave : t.idle.unsupported}
                    </p>
                  ) : null}
                  <div className="mt-7 rounded-xl border border-line bg-white/[0.02] p-4 sm:p-5">
                    <p className="text-[15px] font-medium text-fg">{t.idle.helpTitle}</p>
                    <ul className="mt-3 space-y-2.5 text-[14px] leading-relaxed text-muted">
                      {t.idle.help.filter((_, i) => !(brave && i === BLOCKER_REASON)).map((h) => (
                        <li key={h} className="grid grid-cols-[0.875rem_1fr] gap-2">
                          <span aria-hidden className="mt-[0.6rem] size-1 rounded-full bg-faint" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : state === "known" && model && family ? (
                <div>
                  <h3 className="text-[26px] font-semibold leading-tight tracking-[-0.025em] sm:text-[30px]">{model.name}</h3>
                  <p className="mt-2 flex flex-wrap items-baseline gap-x-2 text-[13px] text-faint">
                    {model.brand ? (
                      <>
                        <span>{model.brand}</span>
                        <span aria-hidden>·</span>
                      </>
                    ) : null}
                    <span>{familyText(m.compat.families, family.id).short}</span>
                    <span aria-hidden>·</span>
                    <span className="font-mono">{model.id}</span>
                  </p>
                  <p className="mt-5 text-[17px] leading-snug text-fg">{verdict(t.verdict, family, os, model.hint)}</p>
                  {!example && COPIED.has(model.id) ? (
                    <p className="mt-3 text-[13.5px] leading-relaxed text-muted">
                      {fmt(t.copied, { name: model.name })}
                      {lookalikes.length
                        ? ` ${fmt(t.lookalike, { names: new Intl.ListFormat(HTML_LANG[lang], { type: "disjunction" }).format(lookalikes) })}`
                        : null}
                    </p>
                  ) : null}
                  <Capabilities family={family} />
                  {hint ? <p className="mt-4 border-l-2 border-warn/70 pl-3 text-[14px] leading-relaxed text-muted">{hint}</p> : null}
                  {note ? <p className="mt-3 text-[13.5px] leading-relaxed text-faint">{note}</p> : null}
                  {pad && pad.mapping !== "standard" ? (
                    <p className="mt-3 text-[13.5px] leading-relaxed text-faint">{t.mapping}</p>
                  ) : null}
                  <button type="button" onClick={() => showFamily(family.id)} className="mt-5 text-[14px] text-muted underline decoration-line-strong underline-offset-4 hover:text-fg">
                    {t.seeFamily}
                  </button>
                </div>
              ) : (
                <div>
                  <h3 className="text-[26px] font-semibold leading-tight tracking-[-0.025em] sm:text-[30px]">{pad ? gamepadName(pad.id) : ""}</h3>
                  {parsed ? <p className="mt-2 font-mono text-[13px] text-faint">{`${parsed.vendor}:${parsed.product}`}</p> : null}
                  <p className="mt-5 text-[16px] leading-relaxed">
                    {state === "unknown"
                      ? rich(t.unknown, {
                          a: (c) => (
                            <button type="button" onClick={askForIt} className={link}>
                              {c}
                            </button>
                          ),
                        })
                      : state === "xinput"
                        ? t.xinput
                        : t.anon}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-auto border-t border-line pt-5">
              <p className="text-[14px] text-muted">{t.tryOne}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {EXAMPLES.map((e) => (
                  <button
                    key={e.id}
                    type="button"
                    aria-pressed={example === e.id}
                    onClick={() => {
                      setExampleDown([]);
                      setExample((cur) => (cur === e.id ? null : e.id));
                    }}
                    className="btn rounded-full border border-line px-3 py-1.5 text-[13px] text-muted hover:border-line-strong hover:text-fg aria-pressed:border-accent/60 aria-pressed:bg-accent/10 aria-pressed:text-fg"
                  >
                    {e.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
