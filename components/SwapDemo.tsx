"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { useLang } from "./lang";
import { T } from "./T";

const PADS = [
  { id: "ds", name: "DualSense", conn: "Bluetooth" },
  { id: "sp", name: "Switch Pro", conn: "USB" },
  { id: "8b", name: "8BitDo Ultimate 2", conn: "Receiver" },
  { id: "d4", name: "DualShock 4", conn: "Bluetooth" },
];

/** A PlayStation's player colours: blue, red, green, pink. */
const COLOURS = ["#3d7bff", "#ff4d5e", "#3ddc84", "#ff6ad5"];

export function SwapDemo() {
  const lang = useLang();
  const [order, setOrder] = useState(PADS.map((p) => p.id));
  const [picked, setPicked] = useState<string | null>(null);
  const [announce, setAnnounce] = useState("");
  const refs = useRef(new Map<string, HTMLElement>());
  const before = useRef<Map<string, DOMRect> | null>(null);
  const drag = useRef<{ id: string; x: number; y: number; moved: boolean; el: HTMLElement } | null>(null);

  const swap = (a: string, b: string) => {
    if (a === b) return;
    const rects = new Map<string, DOMRect>();
    refs.current.forEach((el, id) => rects.set(id, el.getBoundingClientRect()));
    before.current = rects;
    const n = [...order];
    const i = n.indexOf(a);
    const j = n.indexOf(b);
    [n[i], n[j]] = [n[j], n[i]];
    const pa = PADS.find((p) => p.id === a)!.name;
    const pb = PADS.find((p) => p.id === b)!.name;
    setOrder(n);
    setAnnounce(
      lang === "pt"
        ? `${pa} agora é o jogador ${j + 1}, ${pb} é o jogador ${i + 1}.`
        : `${pa} is now player ${j + 1}, ${pb} is player ${i + 1}.`,
    );
    setPicked(null);
  };

  useLayoutEffect(() => {
    const prev = before.current;
    if (!prev) return;
    before.current = null;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    refs.current.forEach((el, id) => {
      const a = prev.get(id);
      if (!a) return;
      const b = el.getBoundingClientRect();
      const dx = a.left - b.left;
      const dy = a.top - b.top;
      if (!dx && !dy) return;
      el.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "none" }], {
        duration: 420,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      });
    });
  }, [order]);

  const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>, id: string) => {
    if (e.button !== 0) return;
    drag.current = { id, x: e.clientX, y: e.clientY, moved: false, el: e.currentTarget };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (!d.moved && Math.hypot(dx, dy) < 5) return;
    d.moved = true;
    d.el.style.transform = `translate(${dx}px, ${dy}px) scale(1.03)`;
    d.el.style.zIndex = "10";
    d.el.style.transition = "none";
  };
  const onPointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    if (!d.moved) return;
    d.el.style.pointerEvents = "none";
    const under = document.elementFromPoint(e.clientX, e.clientY)?.closest<HTMLElement>("[data-pad]");
    d.el.style.pointerEvents = "";
    const target = under?.dataset.pad;
    const rect = d.el.getBoundingClientRect();
    d.el.style.transform = "";
    d.el.style.zIndex = "";
    d.el.style.transition = "";
    if (target && target !== d.id) {
      swap(d.id, target);
    } else if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const home = d.el.getBoundingClientRect();
      d.el.animate([{ transform: `translate(${rect.left - home.left}px, ${rect.top - home.top}px)` }, { transform: "none" }], {
        duration: 300,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      });
    }
    d.el.dataset.dragged = "1";
  };
  const onClick = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    if (e.currentTarget.dataset.dragged) {
      delete e.currentTarget.dataset.dragged;
      return;
    }
    if (!picked) setPicked(id);
    else if (picked === id) setPicked(null);
    else swap(picked, id);
  };

  return (
    <div>
      <ul className="grid grid-cols-2 gap-2.5" aria-label={lang === "pt" ? "Jogadores" : "Players"}>
        {order.map((id, slot) => {
          const p = PADS.find((x) => x.id === id)!;
          const isPicked = picked === id;
          return (
            <li key={id} className="relative">
              <button
                type="button"
                data-pad={id}
                ref={(el) => {
                  if (el) refs.current.set(id, el);
                  else refs.current.delete(id);
                }}
                onPointerDown={(e) => onPointerDown(e, id)}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                onClick={(e) => onClick(e, id)}
                aria-pressed={isPicked}
                aria-label={`${p.name}, ${lang === "pt" ? "jogador" : "player"} ${slot + 1}`}
                className={`relative flex w-full touch-none flex-col items-start gap-3 rounded-xl border bg-panel-2 p-3 text-left transition-[border-color,box-shadow,transform] duration-200 select-none ${
                  isPicked ? "border-accent/70 shadow-[0_0_0_3px_rgba(96,205,255,0.15)]" : "border-line hover:border-line-strong"
                } cursor-grab active:cursor-grabbing`}
              >
                <span className="flex w-full items-center justify-between">
                  <span className="rounded-md bg-white/[0.06] px-1.5 py-0.5 font-mono text-[11px] text-muted">
                    <T en="Player" pt="Jogador" /> {slot + 1}
                  </span>
                  <span
                    aria-hidden
                    className="h-1.5 w-7 rounded-full transition-[background-color,box-shadow] duration-500"
                    style={{ backgroundColor: COLOURS[slot], boxShadow: `0 0 12px ${COLOURS[slot]}` }}
                  />
                </span>
                <span className="text-[13.5px] leading-tight text-fg">{p.name}</span>
                <span className="font-mono text-[11px] text-faint">
                  {p.conn === "Receiver" ? <T en="Receiver" pt="Receptor" /> : p.conn}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <p className="sr-only" aria-live="polite">
        {announce}
      </p>
    </div>
  );
}
