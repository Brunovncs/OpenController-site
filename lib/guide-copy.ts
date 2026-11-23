import type { GuideCopy, GuideSlug } from "@/messages/en/guides";
import { MESSAGES } from "@/messages";
import type { Lang } from "./i18n";

/**
 * Hand-written text for the controller pages people already search for, on top of what
 * guides.ts generates for every family. The text is in messages/<lang>/guides.ts (copy); facts
 * there must match the app's README and CHANGELOG.
 */
export type GuideSection = { id: string; title: string; body: string[]; drawing?: Drawing };

/** A controller drawn beside a section's text: a model in models.json with a drawing of its own. */
type Drawing = { name: string; vendor: string };

const DRAWINGS: Partial<Record<GuideSlug, Record<string, Drawing>>> = {
  "flydigi-apex": { "apex-2": { name: "Flydigi Apex 2", vendor: "04b4" } },
};

export function guideCopy(slug: GuideSlug, lang: Lang): { title: string; description: string; sections: GuideSection[] } | undefined {
  const c = (MESSAGES[lang].guides.copy as Partial<Record<GuideSlug, GuideCopy>>)[slug];
  if (!c) return undefined;
  return {
    title: c.title,
    description: c.description,
    sections: Object.entries(c.sections).map(([id, s]) => ({ id, ...s, drawing: DRAWINGS[slug]?.[id] })),
  };
}
