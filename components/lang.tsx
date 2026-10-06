"use client";

import { useSyncExternalStore } from "react";

export type Lang = "en" | "pt";

const EVENT = "oc-lang";

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  return () => window.removeEventListener(EVENT, cb);
}

function read(): Lang {
  return document.documentElement.getAttribute("data-lang") === "pt" ? "pt" : "en";
}

export function useLang(): Lang {
  return useSyncExternalStore(subscribe, read, () => "en");
}

function noop() {
  return () => {};
}

/** A value from <html data-*> written by the boot script; stable once the page has loaded. */
export function useHtmlData(name: string, fallback: string): string {
  return useSyncExternalStore(
    noop,
    () => document.documentElement.getAttribute(`data-${name}`) ?? fallback,
    () => fallback,
  );
}

export function setLang(lang: Lang) {
  const apply = () => {
    const d = document.documentElement;
    d.setAttribute("data-lang", lang);
    d.lang = lang === "pt" ? "pt-BR" : "en";
    window.dispatchEvent(new Event(EVENT));
  };
  try {
    localStorage.setItem("oc-lang", lang);
  } catch {}
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  type VT = { ready: Promise<void>; finished: Promise<void>; updateCallbackDone: Promise<void> };
  const doc = document as Document & { startViewTransition?: (cb: () => void) => VT };
  if (!doc.startViewTransition || reduce || document.hidden) {
    apply();
    return;
  }
  const t = doc.startViewTransition(apply);
  t.ready.catch(() => {});
  t.finished.catch(() => {});
  t.updateCallbackDone.catch(() => {});
}

export function LangToggle({ className = "" }: { className?: string }) {
  const lang = useLang();
  return (
    <div role="group" aria-label={lang === "pt" ? "Idioma" : "Language"} className={`seg ${className}`}>
      {(["en", "pt"] as const).map((l) => (
        <button
          key={l}
          type="button"
          aria-pressed={lang === l}
          lang={l === "pt" ? "pt-BR" : "en"}
          onClick={() => setLang(l)}
          title={l === "en" ? "English" : "Português (Brasil)"}
        >
          {l === "en" ? "EN" : "PT"}
        </button>
      ))}
    </div>
  );
}
