import type { GuideNoun, GuideSlug } from "@/messages/en/guides";
import { MESSAGES } from "@/messages";
import { FAMILIES, type Family } from "./families";
import { guideCopy } from "./guide-copy";
import { HTML_LANG, type Lang } from "./i18n";
import { MODELS, type IndexedModel } from "./models";
import { fmt } from "./text";

/** One page per controller family, at /controllers/<slug>. Names are in messages/<lang>/guides.ts. */
export type Guide = { slug: GuideSlug; family: Family };

const PAGES: { slug: GuideSlug; family: string }[] = [
  { slug: "dualsense", family: "DualSense" },
  { slug: "dualsense-edge", family: "DualSenseEdge" },
  { slug: "dualshock-4", family: "DualShock4" },
  { slug: "dualshock-3", family: "DualShock3" },
  { slug: "ps2-controller", family: "Ps2Adapter" },
  { slug: "switch-pro-controller", family: "SwitchPro" },
  { slug: "joy-con", family: "JoyCons" },
  { slug: "switch-online-controllers", family: "NintendoClassic" },
  { slug: "switch-2-controllers", family: "Switch2" },
  { slug: "gamecube-controller", family: "GameCube" },
  { slug: "wii-remote", family: "Wii" },
  { slug: "xbox-controller", family: "Xbox" },
  { slug: "xbox-elite", family: "XboxElite" },
  { slug: "8bitdo-ultimate-2", family: "EightBitDoFour" },
  { slug: "8bitdo-ultimate", family: "EightBitDoUltimate" },
  { slug: "8bitdo-ultimate-2c", family: "EightBitDoUltimate2C" },
  { slug: "8bitdo-pro-2", family: "EightBitDoPro2" },
  { slug: "8bitdo-sn30-pro", family: "EightBitDo" },
  { slug: "steam-deck", family: "SteamDeck" },
  { slug: "steam-controller", family: "SteamController" },
  { slug: "handheld-pc", family: "Handheld" },
  { slug: "flydigi-vader", family: "Flydigi" },
  { slug: "flydigi-apex", family: "FlydigiApex" },
  { slug: "stadia-controller", family: "Stadia" },
  { slug: "luna-controller", family: "Luna" },
  { slug: "shield-controller", family: "Shield" },
  { slug: "generic-controllers", family: "Other" },
];

export const GUIDES: Guide[] = PAGES.map((p) => ({ slug: p.slug, family: FAMILIES[p.family] }));

export function guideBySlug(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function guideByFamily(family: string): Guide | undefined {
  return GUIDES.find((g) => g.family.id === family);
}

export const guidePath = (g: Guide) => `/controllers/${g.slug}`;

export function guideModels(g: Guide): IndexedModel[] {
  return MODELS.filter((m) => m.family === g.family.id);
}

/** The controller's name in a language, with what its sentences need to agree with it. */
export function guideName(g: Guide, lang: Lang): GuideNoun {
  const n = MESSAGES[lang].guides.names[g.slug];
  const Name = n.name.charAt(0).toLocaleUpperCase(HTML_LANG[lang]) + n.name.slice(1);
  return { name: n.name, Name, plural: !!n.plural, gender: n.gender };
}

/** "DualSense on PC": the h1 and the link text. */
export function guideTitle(g: Guide, lang: Lang): string {
  return MESSAGES[lang].guides.title(guideName(g, lang));
}

export function guideMetaTitle(g: Guide, lang: Lang): string {
  return guideCopy(g.slug, lang)?.title ?? fmt(MESSAGES[lang].guides.metaTitle, { title: guideTitle(g, lang) });
}

/** The page's meta description, hand-written or from what the app does with the family. */
export function guideDescription(g: Guide, lang: Lang): string {
  const written = guideCopy(g.slug, lang)?.description;
  if (written) return written;
  const f = g.family;
  const d = MESSAGES[lang].guides.description;
  const n = guideName(g, lang);
  const facts = { extras: !!f.extras, gyro: f.gyro };
  if (f.unsupported) return d.unsupported(n);
  if (f.passthrough) return d.passthrough(n, facts);
  return d.xbox(n, facts);
}
