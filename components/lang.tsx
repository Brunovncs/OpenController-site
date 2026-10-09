"use client";

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";
import { LANG_COOKIE, localePath, type Lang } from "@/lib/i18n";

export type { Lang };

const LangContext = createContext<Lang>("en");

/** The language comes from the URL (app/[lang]); everything below reads it from here. */
export function LangProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}

export function useLang(): Lang {
  return useContext(LangContext);
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

/** Links to this page in each language. `path` is the page's English path, like "/" or "/controllers/dualsense". */
export function LangToggle({ path = "/", className = "" }: { path?: string; className?: string }) {
  const lang = useLang();
  return (
    <div role="group" aria-label={lang === "pt" ? "Idioma" : "Language"} className={`seg ${className}`}>
      {(["en", "pt"] as const).map((l) => (
        <a
          key={l}
          href={localePath(l, path)}
          hrefLang={l === "pt" ? "pt-BR" : "en"}
          lang={l === "pt" ? "pt-BR" : "en"}
          aria-current={lang === l ? "true" : undefined}
          onClick={(e) => {
            remember(l);
            if (lang === l) e.preventDefault();
            else e.currentTarget.href = localePath(l, path) + window.location.hash;
          }}
          title={l === "en" ? "English" : "Português (Brasil)"}
        >
          {l === "en" ? "EN" : "PT"}
        </a>
      ))}
    </div>
  );
}
