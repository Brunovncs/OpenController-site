"use client";

import { useEffect, useState } from "react";
import { T } from "./T";

export type RailItem = { id: string; en: string; pt: string };

/** A rail of section marks on wide screens (after rareui's Rail TOC), the current one lit. */
export function RailToc({ items }: { items: RailItem[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const seen = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) seen.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0);
        let best: string | null = null;
        let ratio = 0;
        for (const it of items) {
          const r = seen.get(it.id) ?? 0;
          if (r > ratio) {
            ratio = r;
            best = it.id;
          }
        }
        setActive(best);
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0, 0.01, 0.2, 0.5, 1] },
    );
    for (const it of items) {
      const el = document.getElementById(it.id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label="Sections" className="fixed left-5 top-1/2 z-30 hidden -translate-y-1/2 min-[1400px]:block">
      <ol className="flex flex-col gap-1">
        {items.map((it, i) => {
          const on = active === it.id;
          return (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                aria-current={on ? "true" : undefined}
                className="group flex h-6 items-center gap-3 text-faint transition-colors hover:text-fg aria-[current]:text-fg"
              >
                <span
                  className={`block h-px transition-all duration-300 ${on ? "w-8 bg-accent" : "w-4 bg-faint/60 group-hover:w-6 group-hover:bg-fg"}`}
                />
                <span
                  className="rounded bg-bg/90 px-1 font-mono text-[11px] tracking-wide opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  {String(i + 1).padStart(2, "0")} <T en={it.en} pt={it.pt} />
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
