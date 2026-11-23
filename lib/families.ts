/**
 * What OpenController does with each controller family. Mirrors `Family`, `printed_name`, `kind`
 * and `Hint` in crates/open-controller-core/src/extras.rs and the README's compatibility table.
 */

export type GroupId = "playstation" | "nintendo" | "xbox" | "eightbitdo" | "steam" | "handheld" | "more";

export const GROUPS: { id: GroupId }[] = [
  { id: "playstation" },
  { id: "nintendo" },
  { id: "xbox" },
  { id: "eightbitdo" },
  { id: "steam" },
  { id: "handheld" },
  { id: "more" },
];

/** "yes": aims with it. "dinput": only in D-input mode. "no": not listed by the README. */
export type Gyro = "yes" | "dinput" | "no";

/**
 * Its names, extra buttons and note are text, in messages/<lang>/compat under `families`.
 */
export type Family = {
  id: string;
  group: GroupId;
  /** Has buttons beyond the usual ones; they are named in the family's `extras` text. */
  extras: boolean;
  gyro: Gyro;
  lightBar: boolean;
  /** Touchpad halves and two-finger touch as buttons of their own. */
  touchpad: boolean;
  /** Games read it directly; OpenController lists it and leaves it alone. */
  passthrough?: boolean;
  /** Not read by this build. */
  unsupported?: boolean;
};

export const FAMILIES: Record<string, Family> = {
  DualShock4: {
    id: "DualShock4",
    group: "playstation",
    extras: true,
    gyro: "yes",
    lightBar: true,
    touchpad: true,
  },
  DualSense: {
    id: "DualSense",
    group: "playstation",
    extras: true,
    gyro: "yes",
    lightBar: true,
    touchpad: true,
  },
  DualSenseEdge: {
    id: "DualSenseEdge",
    group: "playstation",
    extras: true,
    gyro: "yes",
    lightBar: true,
    touchpad: true,
  },
  DualShock3: {
    id: "DualShock3",
    group: "playstation",
    extras: false,
    gyro: "yes",
    lightBar: false,
    touchpad: false,
  },
  Ps2Adapter: {
    id: "Ps2Adapter",
    group: "playstation",
    extras: false,
    gyro: "no",
    lightBar: false,
    touchpad: false,
  },
  SwitchPro: {
    id: "SwitchPro",
    group: "nintendo",
    extras: true,
    gyro: "yes",
    lightBar: false,
    touchpad: false,
  },
  JoyCons: {
    id: "JoyCons",
    group: "nintendo",
    extras: true,
    gyro: "yes",
    lightBar: false,
    touchpad: false,
  },
  NintendoClassic: {
    id: "NintendoClassic",
    group: "nintendo",
    extras: true,
    gyro: "no",
    lightBar: false,
    touchpad: false,
  },
  Switch2: {
    id: "Switch2",
    group: "nintendo",
    extras: false,
    gyro: "no",
    lightBar: false,
    touchpad: false,
    unsupported: true,
  },
  GameCube: {
    id: "GameCube",
    group: "nintendo",
    extras: true,
    gyro: "no",
    lightBar: false,
    touchpad: false,
  },
  Wii: {
    id: "Wii",
    group: "nintendo",
    extras: false,
    gyro: "no",
    lightBar: false,
    touchpad: false,
  },
  Xbox: {
    id: "Xbox",
    group: "xbox",
    extras: false,
    gyro: "no",
    lightBar: false,
    touchpad: false,
    passthrough: true,
  },
  XboxElite: {
    id: "XboxElite",
    group: "xbox",
    extras: false,
    gyro: "no",
    lightBar: false,
    touchpad: false,
    passthrough: true,
  },
  SteamDeck: {
    id: "SteamDeck",
    group: "steam",
    extras: true,
    gyro: "yes",
    lightBar: false,
    touchpad: false,
  },
  SteamController: {
    id: "SteamController",
    group: "steam",
    extras: true,
    gyro: "no",
    lightBar: false,
    touchpad: false,
  },
  EightBitDoFour: {
    id: "EightBitDoFour",
    group: "eightbitdo",
    extras: true,
    gyro: "dinput",
    lightBar: false,
    touchpad: false,
  },
  EightBitDoPro2: {
    id: "EightBitDoPro2",
    group: "eightbitdo",
    extras: true,
    gyro: "no",
    lightBar: false,
    touchpad: false,
  },
  EightBitDoUltimate: {
    id: "EightBitDoUltimate",
    group: "eightbitdo",
    extras: true,
    gyro: "no",
    lightBar: false,
    touchpad: false,
  },
  EightBitDoUltimate2C: {
    id: "EightBitDoUltimate2C",
    group: "eightbitdo",
    extras: true,
    gyro: "no",
    lightBar: false,
    touchpad: false,
  },
  EightBitDo: {
    id: "EightBitDo",
    group: "eightbitdo",
    extras: false,
    gyro: "no",
    lightBar: false,
    touchpad: false,
  },
  Flydigi: {
    id: "Flydigi",
    group: "more",
    extras: true,
    gyro: "no",
    lightBar: false,
    touchpad: false,
  },
  FlydigiApex: {
    id: "FlydigiApex",
    group: "more",
    extras: true,
    gyro: "no",
    lightBar: false,
    touchpad: false,
  },
  FlydigiApex2: {
    id: "FlydigiApex2",
    group: "more",
    extras: true,
    gyro: "yes",
    lightBar: false,
    touchpad: false,
  },
  Stadia: {
    id: "Stadia",
    group: "more",
    extras: true,
    gyro: "no",
    lightBar: false,
    touchpad: false,
  },
  Luna: {
    id: "Luna",
    group: "more",
    extras: true,
    gyro: "no",
    lightBar: false,
    touchpad: false,
  },
  Shield: {
    id: "Shield",
    group: "more",
    extras: true,
    gyro: "no",
    lightBar: false,
    touchpad: false,
  },
  Handheld: {
    id: "Handheld",
    group: "handheld",
    extras: true,
    gyro: "no",
    lightBar: false,
    touchpad: false,
    passthrough: true,
  },
  Other: {
    id: "Other",
    group: "more",
    extras: true,
    gyro: "no",
    lightBar: false,
    touchpad: false,
  },
};

export const FAMILY_ORDER = [
  "DualSenseEdge",
  "DualSense",
  "DualShock4",
  "DualShock3",
  "Ps2Adapter",
  "SwitchPro",
  "JoyCons",
  "NintendoClassic",
  "GameCube",
  "Wii",
  "Switch2",
  "Xbox",
  "XboxElite",
  "EightBitDoFour",
  "EightBitDoUltimate",
  "EightBitDoUltimate2C",
  "EightBitDoPro2",
  "EightBitDo",
  "SteamDeck",
  "SteamController",
  "Handheld",
  "Flydigi",
  "FlydigiApex",
  "FlydigiApex2",
  "Stadia",
  "Luna",
  "Shield",
  "Other",
];

/** A family's text in messages/<lang>/compat `families`, or Other's for an unknown id. */
export function familyText<T>(families: Record<string, T>, id: string): T {
  return families[id] ?? families.Other;
}

/** The text of a hint id from models.json (`Hint` in extras.rs), in messages/<lang>/compat `hints`. */
export function hintText(hints: Record<string, string>, id: string | null | undefined): string | null {
  return (id && hints[id]) || null;
}
