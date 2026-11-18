import { cache } from "react";
import { MESSAGES, type Messages } from "@/messages";
import type { Lang } from "./i18n";

// The language of the request being rendered. Each page and layout sets it first thing, so the
// server components below them can read their text without passing the language down.
const current = cache(() => ({ lang: "en" as Lang }));

export function setLang(lang: Lang) {
  current().lang = lang;
}

export function getLang(): Lang {
  return current().lang;
}

/** The text of the current language, for server components. Client components use useT(). */
export function t(): Messages {
  return MESSAGES[current().lang];
}
