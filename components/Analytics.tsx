"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { flush, track } from "@/lib/track";

const clean = (s: string | null | undefined, max: number) => (s ?? "").replace(/\s+/g, " ").trim().slice(0, max);

/** What a click was on: a download, a link out, a page link, a button or an opened question. */
function describe(target: Element): [string, string] | null {
  const tagged = target.closest<HTMLElement>("[data-ev]");
  if (tagged) return [tagged.dataset.ev!, clean(tagged.dataset.evLabel ?? tagged.textContent, 120)];
  const el = target.closest<HTMLElement>("a[href], button, summary");
  if (!el) return null;
  if (el instanceof HTMLAnchorElement) {
    let url: URL;
    try {
      url = new URL(el.href);
    } catch {
      return null;
    }
    if (url.hostname === "github.com" && url.pathname.includes("/releases/download/")) {
      const file = url.pathname.split("/").pop() ?? "";
      return [file.endsWith(".sha256") ? "checksum" : "download", file];
    }
    if (url.host !== location.host) return ["outbound", clean(url.hostname.replace(/^www\./, "") + url.pathname, 120)];
    return ["link", clean(url.pathname + url.hash, 120)];
  }
  if (el.tagName === "SUMMARY") return ["expand", clean(el.textContent, 120)];
  return ["button", clean(el.getAttribute("aria-label") || el.textContent, 80)];
}

/**
 * Counts page views, clicks, how long a page was read and how far down. Mounted once in the
 * layout; components add searches, controller tests and form steps through lib/track.ts.
 */
export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    track("view");
    let visible = document.visibilityState === "visible" ? Date.now() : 0;
    let seconds = 0;
    let depth = 0;
    let sent = false;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      depth = Math.max(depth, max > 0 ? Math.min(100, Math.round((scrollY / max) * 100)) : 100);
    };
    const leave = () => {
      if (visible) seconds += (Date.now() - visible) / 1000;
      visible = 0;
      if (sent || seconds < 1) return;
      sent = true;
      track("leave", undefined, undefined, Math.min(Math.round(seconds), 3600), depth);
    };
    const onVisibility = () => {
      if (document.visibilityState === "hidden") leave();
      else if (!sent) visible = Date.now();
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    addEventListener("pagehide", leave);
    return () => {
      leave();
      removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      removeEventListener("pagehide", leave);
    };
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const hit = e.target instanceof Element ? describe(e.target) : null;
      if (!hit) return;
      track("click", hit[0], hit[1]);
      // A link that leaves the page takes the queue with it.
      if (hit[0] !== "button" && hit[0] !== "expand") flush();
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
