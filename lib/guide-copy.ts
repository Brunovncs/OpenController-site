import type { GuideCopy, GuideSlug } from "@/messages/en/guides";
import { MESSAGES } from "@/messages";
import type { Lang } from "./i18n";

/**
 * Hand-written text for the controller pages people already search for, on top of what
 * guides.ts generates for every family. The text is in messages/<lang>/guides.ts (copy); facts
 * there must match the app's README and CHANGELOG.
 */
export type GuideSection = { id: string; title: string; body: string[] };

export function guideCopy(slug: GuideSlug, lang: Lang): { title: string; description: string; sections: GuideSection[] } | undefined {
  const c = (MESSAGES[lang].guides.copy as Partial<Record<GuideSlug, GuideCopy>>)[slug];
  if (!c) return undefined;
  return {
    title: c.title,
    description: c.description,
    sections: Object.entries(c.sections).map(([id, s]) => ({ id, ...s })),
  };
}
