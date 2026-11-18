import { SITE_URL } from "./site";

/** English first: it has no prefix and is the fallback for crawlers and unknown languages. */
export const LANGS = ["en", "pt", "es", "fr", "ja", "zh"] as const;
export type Lang = (typeof LANGS)[number];

export const HTML_LANG: Record<Lang, string> = { en: "en", pt: "pt-BR", es: "es", fr: "fr", ja: "ja", zh: "zh-CN" };
export const OG_LOCALE: Record<Lang, string> = { en: "en_US", pt: "pt_BR", es: "es_ES", fr: "fr_FR", ja: "ja_JP", zh: "zh_CN" };
/** Each language in its own words, for the language menu. */
export const LANG_NAMES: Record<Lang, string> = { en: "English", pt: "Português", es: "Español", fr: "Français", ja: "日本語", zh: "简体中文" };

/** Cookie the language menu writes; next.config.ts redirects by it, then by Accept-Language. */
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
  return path === "/" ? `/${lang}` : `/${lang}${path}`;
}

export function absUrl(lang: Lang, path = "/"): string {
  return `${SITE_URL}${localePath(lang, path)}`;
}

/** hreflang alternates of a page: every language, plus English as the default. */
export function languages(path = "/", abs = false): Record<string, string> {
  const url = abs ? absUrl : localePath;
  return {
    ...Object.fromEntries(LANGS.map((l) => [HTML_LANG[l], url(l, path)])),
    "x-default": url("en", path),
  };
}

/** canonical plus hreflang alternates, for generateMetadata. */
export function alternates(lang: Lang, path = "/") {
  return { canonical: localePath(lang, path), languages: languages(path) };
}
