import pads from "@/data/pads.json";
import type { IndexedModel } from "./models";

/** Which drawing a controller gets. */
export type Shape =
  | "dualsense"
  | "dualsenseEdge"
  | "ds4"
  | "ds3"
  | "xbox"
  | "switchPro"
  | "joycons"
  | "ultimate2"
  | "ultimate2c"
  | "ultimate"
  | "sn30pro"
  | "retro"
  | "handheld"
  | "generic"
  // A model's own drawing, by its key in pads.json (`models::DRAWINGS` in the app).
  | (string & {});

/** How the face buttons are labelled. */
export type Glyphs = "xbox" | "ps" | "nintendo" | "numbers";

const ULTIMATE = /\bUltimate\b/i;

export function shapeFor(model: Pick<IndexedModel, "family" | "art" | "name" | "drawing"> | null, vendor: string | null): Shape {
  if (model?.drawing && model.drawing in pads) return model.drawing;
  if (!model) {
    if (vendor === "054c") return "dualsense";
    if (vendor === "045e") return "xbox";
    if (vendor === "057e") return "switchPro";
    return "generic";
  }
  const { family, art, name } = model;
  switch (family) {
    case "DualSenseEdge":
      return "dualsenseEdge";
    case "DualSense":
      return "dualsense";
    case "DualShock4":
      return "ds4";
    case "DualShock3":
    case "Ps2Adapter":
      return "ds3";
    case "Xbox":
    case "XboxElite":
      return "xbox";
    case "SwitchPro":
      return "switchPro";
    case "JoyCons":
      return "joycons";
    case "Switch2":
      if (/Joy-Con/i.test(name)) return "joycons";
      if (/Pro Controller/i.test(name)) return "switchPro";
      return "generic";
    case "EightBitDoUltimate":
      return "ultimate";
    case "EightBitDoUltimate2C":
      return "ultimate2c";
    case "EightBitDoFour":
    case "EightBitDoPro2":
      return art === "Offset" || /^8BitDo Ultimate/i.test(name) ? "ultimate2" : "sn30pro";
    case "EightBitDo":
      if (art === "Retro") return "retro";
      if (art === "Symmetric") return "sn30pro";
      if (/Ultimate 2C/i.test(name)) return "ultimate2c";
      return ULTIMATE.test(name) ? "ultimate" : "generic";
  }
  if (art === "Retro") return "retro";
  if (art === "Handheld") return "handheld";
  if (art === "JoyCons") return "joycons";
  if (art === "PlayStation") return "dualsense";
  if (art === "Symmetric") return "ds3";
  return "generic";
}

const PS_FAMILIES = new Set(["DualShock3", "DualShock4", "DualSense", "DualSenseEdge", "Ps2Adapter"]);
const NINTENDO_FAMILIES = new Set(["SwitchPro", "JoyCons", "NintendoClassic", "Switch2"]);

export function glyphsFor(model: Pick<IndexedModel, "family" | "name" | "drawing"> | null, vendor: string | null, shape: Shape): Glyphs {
  // A model's own drawing says what is printed on it.
  const own = model?.drawing ? (pads as Record<string, { glyphs?: string }>)[model.drawing]?.glyphs : undefined;
  if (own === "xbox" || own === "ps" || own === "nintendo" || own === "numbers") return own;
  if (model) {
    if (PS_FAMILIES.has(model.family)) return "ps";
    if (NINTENDO_FAMILIES.has(model.family)) return "nintendo";
    // 8BitDo's SNES-shaped pads print Nintendo's layout, except the ones made for Xbox.
    if ((shape === "sn30pro" || shape === "retro") && !/for Xbox/i.test(model.name)) return "nintendo";
    return "xbox";
  }
  if (vendor === "054c") return "ps";
  if (vendor === "057e") return "nintendo";
  return "xbox";
}
