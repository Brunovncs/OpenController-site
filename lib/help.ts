import type { HelpSlug } from "@/messages/en/help";
import { localePath, type Lang } from "./i18n";

export type { HelpSlug };

/** The help pages, in the order the index lists them. Their text is in messages/<lang>/help.ts. */
export const HELP_SLUGS: HelpSlug[] = [
  "ps5-controller-on-pc",
  "ps4-controller-on-pc",
  "switch-controller-on-pc",
  "controller-works-in-menu-not-in-game",
  "controller-not-detected",
  "ds4windows-alternative",
  "gyro-aiming-on-pc",
  "stick-drift-fix",
];

export const helpPath = (slug: HelpSlug) => `/help/${slug}`;

export function isHelpSlug(s: string): s is HelpSlug {
  return (HELP_SLUGS as string[]).includes(s);
}

/** Where each link tag in a help text leads, in a language. */
export function helpLinks(lang: Lang): Record<string, string> {
  const home = localePath(lang);
  return {
    test: `${home}#check`,
    download: `${home}#platforms`,
    list: `${home}#controllers`,
    contact: `${home}#contact`,
    ds4windows: localePath(lang, helpPath("ds4windows-alternative")),
  };
}
