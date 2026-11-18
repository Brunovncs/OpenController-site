import { MESSAGES } from "@/messages";
import type { Lang } from "./i18n";
import { strip } from "./text";

/**
 * One question. The text lives in messages/<lang>/home.ts (home.faq.items); an answer may hold
 * <a>words</a>, a link to the contact section, drawn by components/FaqList.tsx.
 */
export type FaqItem = { id: string; q: string; a: string };

/** Entries that only show for some app versions: the rest always show. */
function hidden(appReports: boolean, appMapping: boolean): Set<string> {
  if (!appReports) return new Set(["dataReports", "offList", "offListMapping"]);
  return new Set(["data", appMapping ? "offList" : "offListMapping"]);
}

/** The questions as the page shows them for the latest release. */
export function faqItems(lang: Lang, appReports: boolean, appMapping = false): FaqItem[] {
  const skip = hidden(appReports, appMapping);
  return MESSAGES[lang].home.faq.items.filter((item) => !skip.has(item.id));
}

/** An answer with its link tags removed, for JSON-LD and llms.txt. */
export function plain(text: string): string {
  return strip(text);
}
