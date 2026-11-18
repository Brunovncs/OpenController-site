"use client";

import { createContext, useContext, useEffect, useRef, useSyncExternalStore, type ReactNode } from "react";
import { HTML_LANG, LANG_COOKIE, LANG_NAMES, LANGS, localePath, type Lang } from "@/lib/i18n";
import type { ClientMessages } from "@/messages";

export type { Lang };

const LangContext = createContext<{ lang: Lang; messages: ClientMessages } | null>(null);

/** The language comes from the URL (app/[lang]); everything below reads it, and its text, from here. */
export function LangProvider({ lang, messages, children }: { lang: Lang; messages: ClientMessages; children: ReactNode }) {
  return <LangContext.Provider value={{ lang, messages }}>{children}</LangContext.Provider>;
}

export function useLang(): Lang {
  return useContext(LangContext)?.lang ?? "en";
}

/** The page's text, for client components. Server components use t() from lib/i18n-server. */
export function useT(): ClientMessages {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useT outside LangProvider");
  return ctx.messages;
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

function remember(lang: Lang) {
  document.cookie = `${LANG_COOKIE}=${lang}; path=/; max-age=31536000; samesite=lax`;
  try {
    localStorage.setItem(LANG_COOKIE, lang);
  } catch {}
}

/**
 * Links to this page in each language, in a small menu. `path` is the page's English path, like
 * "/" or "/controllers/dualsense". Plain links, so it works before scripts load.
 */
/** `up` opens the menu above, for the foot of the page. */
export function LangMenu({ path = "/", label, up = false, className = "" }: { path?: string; label: string; up?: boolean; className?: string }) {
  const lang = useLang();
  const ref = useRef<HTMLDetailsElement>(null);

  // Closes on a click outside or Escape, as a menu should.
  useEffect(() => {
    const close = (e: Event) => {
      const d = ref.current;
      if (!d?.open) return;
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !d.contains(e.target as Node)) {
        d.open = false;
        if (e instanceof KeyboardEvent) d.querySelector("summary")?.focus();
      }
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", close);
    };
  }, []);

  return (
    <details ref={ref} className={`group relative ${className}`}>
      <summary
        aria-label={`${label}: ${LANG_NAMES[lang]}`}
        className="btn btn-ghost h-9 cursor-pointer list-none gap-1.5 rounded-[10px] px-2.5 font-mono text-[12px] uppercase [&::-webkit-details-marker]:hidden"
      >
        {lang}
        <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden className="text-faint transition-transform group-open:rotate-180">
          <path d="M2 3.5 5 6.5 8 3.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </summary>
      <ul className={`absolute ${up ? "bottom-[calc(100%+6px)] left-0" : "right-0 top-[calc(100%+6px)]"} z-50 min-w-[168px] rounded-xl border border-line-strong bg-panel-2 p-1 shadow-[0_18px_50px_-12px_rgba(0,0,0,0.8)]`}>
        {LANGS.map((l) => (
          <li key={l}>
            <a
              href={localePath(l, path)}
              hrefLang={HTML_LANG[l]}
              lang={HTML_LANG[l]}
              aria-current={lang === l ? "true" : undefined}
              onClick={(e) => {
                remember(l);
                if (lang === l) {
                  e.preventDefault();
                  if (ref.current) ref.current.open = false;
                } else e.currentTarget.href = localePath(l, path) + window.location.hash;
              }}
              className="flex items-center justify-between gap-4 rounded-lg px-3 py-2 text-[13.5px] text-muted transition-colors hover:bg-white/[0.05] hover:text-fg aria-[current]:text-fg"
            >
              {LANG_NAMES[l]}
              <span className="font-mono text-[11px] uppercase text-faint">{l}</span>
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}
