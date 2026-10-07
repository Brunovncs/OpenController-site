"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { T } from "./T";

const OPEN = 35;
const BACKGROUND = 4;
const DELAY = 300;
const DURATION = 1600;

/**
 * One bar that starts at the open window's memory and shrinks to what stays in the background
 * while its number counts down, both on one clock (--p), and turns accent once it gets there. The
 * page renders the end state, so without script or with reduced motion the true figure shows; the
 * start state is set only when the bar is still below the screen, and plays once it comes into
 * view.
 */
export function MemoryBars() {
  const root = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = root.current;
    const out = num.current;
    if (!el || !out) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.dataset.run = "idle";
    el.style.setProperty("--p", "0");
    out.textContent = String(OPEN);
    let frame = 0;

    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        el.dataset.run = "play";
        const start = performance.now() + DELAY;
        const tick = (now: number) => {
          const t = Math.min(Math.max((now - start) / DURATION, 0), 1);
          const eased = 1 - Math.pow(1 - t, 5);
          el.style.setProperty("--p", String(eased));
          out.textContent = String(Math.round(OPEN - (OPEN - BACKGROUND) * eased));
          if (t < 1) frame = requestAnimationFrame(tick);
          else el.dataset.run = "done";
        };
        frame = requestAnimationFrame(tick);
      },
      { rootMargin: "0px 0px -35% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={root} className="mem">
      <p className="sr-only">
        <T
          en={`Up to ${BACKGROUND} MB with the window closed, down from about ${OPEN} MB with it open.`}
          pt={`Até ${BACKGROUND} MB com a janela fechada, contra cerca de ${OPEN} MB com ela aberta.`}
        />
      </p>

      <div aria-hidden>
        <p className="display text-[56px] tabular-nums sm:text-[72px]">
          <span ref={num} className="mem-num text-accent">
            {BACKGROUND}
          </span>
          <span className="ml-1.5 text-[0.4em] tracking-normal text-faint">MB</span>
        </p>
        <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-white/[0.06]">
          <div className="mem-shrink h-full rounded-full bg-accent" style={{ "--w": BACKGROUND / OPEN } as CSSProperties} />
        </div>
        <p className="mt-3 text-right text-[13px] text-faint">
          <T en={`Window open: ${OPEN} MB`} pt={`Janela aberta: ${OPEN} MB`} />
        </p>
      </div>

      <p className="mem-punch display mt-8 text-[26px] sm:text-[32px]">
        <T
          en={
            <>
              <span className="text-accent">Up to {BACKGROUND} MB</span> once the window is closed.
            </>
          }
          pt={
            <>
              <span className="text-accent">Até {BACKGROUND} MB</span> com a janela fechada.
            </>
          }
        />
      </p>
    </div>
  );
}
