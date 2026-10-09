import { FAMILIES, type Family } from "./families";
import type { L } from "./i18n";
import { MODELS, type IndexedModel } from "./models";

/** One page per controller family, at /controllers/<slug> and /pt/controllers/<slug>. */
export type Guide = {
  slug: string;
  family: Family;
  /** What people call it when they search, like "DualSense" or "8BitDo Pro 2". */
  name: L;
  /** The name is a group ("Joy-Con" is one, "Switch 2 controllers" are many), for the articles. */
  plural: boolean;
};

const PAGES: { slug: string; family: string; name: L; plural?: boolean }[] = [
  { slug: "dualsense", family: "DualSense", name: { en: "DualSense", pt: "DualSense" } },
  { slug: "dualsense-edge", family: "DualSenseEdge", name: { en: "DualSense Edge", pt: "DualSense Edge" } },
  { slug: "dualshock-4", family: "DualShock4", name: { en: "DualShock 4", pt: "DualShock 4" } },
  { slug: "dualshock-3", family: "DualShock3", name: { en: "DualShock 3", pt: "DualShock 3" } },
  { slug: "ps2-controller", family: "Ps2Adapter", name: { en: "PS2 controller", pt: "controle de PS2" } },
  { slug: "switch-pro-controller", family: "SwitchPro", name: { en: "Switch Pro Controller", pt: "Switch Pro Controller" } },
  { slug: "joy-con", family: "JoyCons", name: { en: "Joy-Con", pt: "Joy-Con" } },
  { slug: "switch-online-controllers", family: "NintendoClassic", name: { en: "Switch Online SNES, N64 and Mega Drive controllers", pt: "controles de SNES, N64 e Mega Drive do Switch Online" }, plural: true },
  { slug: "switch-2-controllers", family: "Switch2", name: { en: "Switch 2 controllers", pt: "controles do Switch 2" }, plural: true },
  { slug: "gamecube-controller", family: "GameCube", name: { en: "GameCube controller", pt: "controle de GameCube" } },
  { slug: "wii-remote", family: "Wii", name: { en: "Wii Remote and Wii U Pro Controller", pt: "Wii Remote e Wii U Pro Controller" }, plural: true },
  { slug: "xbox-controller", family: "Xbox", name: { en: "Xbox controller", pt: "controle de Xbox" } },
  { slug: "xbox-elite", family: "XboxElite", name: { en: "Xbox Elite controller", pt: "controle Xbox Elite" } },
  { slug: "8bitdo-ultimate-2", family: "EightBitDoFour", name: { en: "8BitDo Ultimate 2, Ultimate 3 and Pro 3", pt: "8BitDo Ultimate 2, Ultimate 3 e Pro 3" }, plural: true },
  { slug: "8bitdo-ultimate", family: "EightBitDoUltimate", name: { en: "8BitDo Ultimate", pt: "8BitDo Ultimate" } },
  { slug: "8bitdo-ultimate-2c", family: "EightBitDoUltimate2C", name: { en: "8BitDo Ultimate 2C", pt: "8BitDo Ultimate 2C" } },
  { slug: "8bitdo-pro-2", family: "EightBitDoPro2", name: { en: "8BitDo Pro 2", pt: "8BitDo Pro 2" } },
  { slug: "8bitdo-sn30-pro", family: "EightBitDo", name: { en: "8BitDo SN30 Pro and retro controllers", pt: "8BitDo SN30 Pro e controles retrô" }, plural: true },
  { slug: "steam-deck", family: "SteamDeck", name: { en: "Steam Deck controls", pt: "controles do Steam Deck" }, plural: true },
  { slug: "steam-controller", family: "SteamController", name: { en: "Steam Controller", pt: "Steam Controller" } },
  { slug: "handheld-pc", family: "Handheld", name: { en: "handheld PC controls", pt: "controles de PC portátil" }, plural: true },
  { slug: "flydigi-vader", family: "Flydigi", name: { en: "Flydigi Vader", pt: "Flydigi Vader" } },
  { slug: "flydigi-apex", family: "FlydigiApex", name: { en: "Flydigi Apex", pt: "Flydigi Apex" } },
  { slug: "stadia-controller", family: "Stadia", name: { en: "Stadia controller", pt: "controle do Stadia" } },
  { slug: "luna-controller", family: "Luna", name: { en: "Amazon Luna controller", pt: "controle do Amazon Luna" } },
  { slug: "shield-controller", family: "Shield", name: { en: "NVIDIA Shield controller", pt: "controle do NVIDIA Shield" } },
  { slug: "generic-controllers", family: "Other", name: { en: "PowerA, Hori, Razer and other controllers", pt: "controles PowerA, Hori, Razer e outros" }, plural: true },
];

export const GUIDES: Guide[] = PAGES.map((p) => ({ slug: p.slug, family: FAMILIES[p.family], name: p.name, plural: !!p.plural }));

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

/** "DualSense on PC" / "DualSense no PC", with the first letter up. */
const up = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function guideTitle(g: Guide): L {
  return { en: `${up(g.name.en)} on PC`, pt: `${up(g.name.pt)} no PC` };
}

/** The page's meta description, from what the app does with the family. */
export function guideDescription(g: Guide): L {
  const f = g.family;
  const n = { en: `the ${g.name.en}`, pt: `${g.plural ? "os" : "o"} ${g.name.pt}` };
  if (f.unsupported)
    return {
      en: `${up(g.name.en)} ${g.plural ? "do" : "does"} not work in OpenController yet. See which controllers do, and how to ask for yours.`,
      pt: `${up(n.pt)} ainda não ${g.plural ? "funcionam" : "funciona"} no OpenController. Veja quais controles funcionam e como pedir o seu.`,
    };
  if (f.passthrough)
    return {
      en: `PC games already read ${n.en}. OpenController keeps ${g.plural ? "them" : "it"} on ${g.plural ? "their" : "its"} own player number next to your other controllers, free on Windows, Linux and Mac.`,
      pt: `Os jogos de PC já leem ${n.pt}. O OpenController mantém o número de jogador ${g.plural ? "deles" : "dele"} ao lado dos seus outros controles, de graça no Windows, Linux e Mac.`,
    };
  const gyro = f.gyro === "yes" ? { en: ", aim with motion", pt: ", mire com movimento" } : f.gyro === "dinput" ? { en: ", aim with motion in D-input mode", pt: ", mire com movimento no modo D-input" } : { en: "", pt: "" };
  const extras = f.extras && !f.passthrough ? { en: `, map ${g.plural ? "their" : "its"} extra buttons`, pt: ", configure os botões extras" } : { en: "", pt: "" };
  return {
    en: `Use ${n.en} in any PC game as an Xbox controller${extras.en}${gyro.en}. Free and open source for Windows, Linux and Mac.`,
    pt: `Use ${n.pt} em qualquer jogo de PC como controle de Xbox${extras.pt}${gyro.pt}. Gratuito e de código aberto para Windows, Linux e Mac.`,
  };
}
