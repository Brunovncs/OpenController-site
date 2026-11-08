"use client";

/**
 * Page events for the anonymous statistics (app/api/e). Batched and sent with sendBeacon, so
 * they never delay a click or a navigation. No cookie, no id: the server makes a visitor of the
 * day from the request itself.
 */

import { useEffect, useRef } from "react";

export type EventType = "view" | "leave" | "click" | "search" | "test" | "funnel";
type Ev = { t: EventType; n?: string; l?: string; v?: number; s?: number };

const queue: Ev[] = [];
let timer: ReturnType<typeof setTimeout> | null = null;

function utm() {
  const p = new URLSearchParams(location.search);
  const out: Record<string, string> = {};
  for (const k of ["source", "medium", "campaign", "term", "content"]) {
    const v = p.get(`utm_${k}`) ?? (k === "source" ? p.get("ref") : null);
    if (v) out[k] = v;
  }
  return out;
}

export function flush() {
  if (timer) clearTimeout(timer);
  timer = null;
  if (!queue.length) return;
  const body = JSON.stringify({
    path: location.pathname,
    lang: document.documentElement.dataset.lang,
    ref: document.referrer,
    utm: utm(),
    ev: queue.splice(0),
  });
  try {
    if (navigator.sendBeacon?.("/api/e", new Blob([body], { type: "text/plain" }))) return;
  } catch {}
  fetch("/api/e", { method: "POST", body, keepalive: true }).catch(() => {});
}

export function track(t: EventType, n?: string, l?: string, v?: number, s?: number) {
  if (typeof window === "undefined") return;
  queue.push({ t, ...(n ? { n } : {}), ...(l ? { l } : {}), ...(v !== undefined ? { v } : {}), ...(s !== undefined ? { s } : {}) });
  if (t === "view" || t === "leave") return flush();
  if (!timer) timer = setTimeout(flush, 1500);
}

/** A search, once the person stops typing: what they looked for and how many results it had. */
export function useTrackSearch(name: string, query: string, results: number) {
  const last = useRef("");
  useEffect(() => {
    const q = query.trim();
    if (q.length < 2 || q.toLowerCase() === last.current) return;
    const id = setTimeout(() => {
      last.current = q.toLowerCase();
      track("search", name, q, results);
    }, 1200);
    return () => clearTimeout(id);
  }, [name, query, results]);
}
