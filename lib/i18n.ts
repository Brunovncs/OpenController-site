import { SITE_URL } from "./site";

export const LANGS = ["en", "pt"] as const;
export type Lang = (typeof LANGS)[number];
export type L = { en: string; pt: string };

export const HTML_LANG: Record<Lang, string> = { en: "en", pt: "pt-BR" };
export const OG_LOCALE: Record<Lang, string> = { en: "en_US", pt: "pt_BR" };

/** Cookie the language switch writes; next.config.ts redirects by it, then by Accept-Language. */
export const LANG_COOKIE = "oc-lang";

export function isLang(v: string): v is Lang {
  return (LANGS as readonly string[]).includes(v);
}

/**
 * The public path of a page in a language. English has no prefix: "/" and "/controllers/x" are
 * rewritten to /en/... in next.config.ts, and /en/... redirects back to them.
 */
export function localePath(lang: Lang, path = "/"): string {
  if (lang === "en") return path;
  return path === "/" ? "/pt" : `/pt${path}`;
}

export function absUrl(lang: Lang, path = "/"): string {
  return `${SITE_URL}${localePath(lang, path)}`;
}

/** canonical plus hreflang alternates, for generateMetadata. */
export function alternates(lang: Lang, path = "/") {
  return {
    canonical: localePath(lang, path),
    languages: {
      en: localePath("en", path),
      "pt-BR": localePath("pt", path),
      "x-default": localePath("en", path),
    },
  };
}
