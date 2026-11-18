import type { Lang } from "@/lib/i18n";
import en from "./en";
import es from "./es";
import fr from "./fr";
import ja from "./ja";
import pt from "./pt";
import zh from "./zh";

/** Every text of the site, by language. English is the source; the others have the same shape. */
export type Messages = typeof en;
/** What client components can read: all but the guide and help pages' text, which only the server renders. */
export type ClientMessages = Omit<Messages, "guides" | "help">;

export const MESSAGES: Record<Lang, Messages> = { en, pt, es, fr, ja, zh };

export function clientMessages(lang: Lang): ClientMessages {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { guides, help, ...rest } = MESSAGES[lang];
  return rest;
}
