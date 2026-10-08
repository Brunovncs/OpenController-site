import raw from "@/data/models.json";
import { FAMILIES, FAMILY_ORDER, GROUPS, type GroupId } from "./families";

export type Art = "Offset" | "Symmetric" | "PlayStation" | "Retro" | "JoyCons" | "Handheld";

/** How sure OpenController is that a model works (`rating.rs` in the app). */
export type Rating = "Verified" | "Compatible" | "Caveats" | "Unsupported";

export type Model = {
  vendor: string;
  product: string;
  name: string;
  family: string;
  art: Art;
  hint: string | null;
  rating: Rating;
  /** A drawing of its own in `data/pads.json`, traced from this model's pictures. */
  drawing: string | null;
  /** Set on a model that copies another's ids: its maker, where the vendor id names another. */
  brand?: string;
  /** The model whose ids it copies, which is what the app sees until its owner picks it. */
  alias_of?: string;
};

export type IndexedModel = Omit<Model, "brand"> & {
  id: string;
  /** Unique per row: two models can share an id. */
  key: string;
  brand: string | null;
  group: GroupId;
  haystack: string;
  order: number;
};

const BRANDS: Record<string, string> = {
  "054c": "Sony",
  "057e": "Nintendo",
  "045e": "Microsoft",
  "2dc8": "8BitDo",
  "28de": "Valve",
  "0e6f": "PDP",
  "0f0d": "HORI",
  "0738": "Mad Catz",
  "07ff": "Mad Catz",
  "24c6": "PowerA",
  "20d6": "PowerA",
  "1532": "Razer",
  "1689": "Razer",
  "146b": "Nacon",
  "3285": "Nacon",
  "11c9": "Nacon",
  "1bad": "Harmonix",
  "0c12": "Zeroplus",
  "0079": "DragonRise",
  "046d": "Logitech",
  "0b05": "ASUS",
  "2c22": "Qanba",
  "0f30": "Qanba",
  "33dd": "ZUIKI",
  "31e3": "Wooting",
  "03f0": "HyperX",
  "17ef": "Lenovo",
  "1a86": "Lenovo",
  "3651": "CRKD",
  "0351": "CRKD",
  "044f": "Thrustmaster",
  "10f5": "Turtle Beach",
  "1430": "RedOctane",
  "3537": "GameSir",
  "37d7": "Flydigi",
  "04b4": "Flydigi",
  "0db0": "MSI",
  "1949": "Amazon",
  "0171": "Amazon",
  "18d1": "Google",
  "0955": "NVIDIA",
  "1038": "SteelSeries",
  "358a": "Backbone",
  "2e95": "SCUF",
  "294b": "Snakebyte",
  "1ee9": "ZOTAC",
  "2993": "TECNO",
  "2e24": "Hyperkin",
  "06a3": "Saitek",
  "056e": "Elecom",
  "2345": "Machenike",
  "3507": "ZENAIM",
  "366c": "ByoWave",
  "413d": "Black Shark",
  "0502": "Acer",
  "9886": "Astro",
  "38d2": "Void Gaming",
  "20bc": "BETOP",
  "2563": "ShanWan",
  "1b1c": "Corsair",
  "3250": "Atari",
  "0ca3": "Sega",
  "0d22": "MSI",
  "2f24": "EasySMX",
  "11c1": "EasySMX",
  "1dd8": "Buffalo",
  "0411": "Buffalo",
  "0428": "Gravis",
  "047d": "Gravis",
  "1c59": "Retro Games",
  "1c5a": "Capcom",
  "1c5b": "Capcom",
  "0ae4": "Taito",
  "289b": "raphnet",
  "2836": "OUYA",
  "07b5": "Thrustmaster",
  "0e6a": "Atari",
  "1d79": "Mayflash",
  "0e8f": "GreenAsia",
};

const groupRank = new Map(GROUPS.map((g, i) => [g.id, i]));
const familyRank = new Map(FAMILY_ORDER.map((f, i) => [f, i]));

function fold(s: string): string {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

export const MODELS: IndexedModel[] = (raw as Model[])
  .map((m) => {
    const family = FAMILIES[m.family] ?? FAMILIES.Other;
    const brand = m.brand ?? BRANDS[m.vendor] ?? null;
    const id = `${m.vendor}:${m.product}`;
    return {
      ...m,
      id,
      key: m.alias_of ? `${id}:${m.name}` : id,
      brand,
      group: family.group,
      order: 0,
      haystack: fold(
        [m.name, brand ?? "", family.label.en, family.label.pt, family.id, id, `${m.vendor} ${m.product}`, `${m.vendor}${m.product}`].join(
          " | ",
        ),
      ),
    };
  })
  .sort(
    (a, b) =>
      (groupRank.get(a.group) ?? 99) - (groupRank.get(b.group) ?? 99) ||
      (familyRank.get(a.family) ?? 99) - (familyRank.get(b.family) ?? 99) ||
      a.name.localeCompare(b.name),
  )
  .map((m, i) => ({ ...m, order: i }));

// What a browser reports is the copied model, so the ids find that one.
const byId = new Map(MODELS.filter((m) => !m.alias_of).map((m) => [m.id, m]));

export function lookup(vendor: string, product: string): IndexedModel | null {
  return byId.get(`${vendor.toLowerCase()}:${product.toLowerCase()}`) ?? null;
}

const ID_PAIR = /^([0-9a-f]{4})[\s:._/-]*([0-9a-f]{4})$/;
const ID_ONE = /^[0-9a-f]{4}$/;

/** Filters and ranks models for a query: names, brands, families, or USB ids in any common form. */
export function search(models: IndexedModel[], query: string, group: GroupId | "all"): IndexedModel[] {
  const pool = group === "all" ? models : models.filter((m) => m.group === group);
  const q = fold(query.trim());
  if (!q) return pool;

  const pair = q.replace(/^0x/, "").match(ID_PAIR);
  if (pair) {
    const id = `${pair[1]}:${pair[2]}`;
    const exact = pool.filter((m) => m.id === id);
    if (exact.length) return exact;
  }

  const tokens = q.split(/\s+/).filter(Boolean);
  const scored: { m: IndexedModel; score: number }[] = [];
  for (const m of pool) {
    if (!tokens.every((t) => m.haystack.includes(t))) continue;
    let score = 0;
    const name = fold(m.name);
    if (ID_ONE.test(q) && (m.product === q || m.vendor === q)) score -= m.product === q ? 200 : 100;
    if (name.startsWith(q)) score -= 50;
    else if (name.includes(q)) score -= 20;
    if (m.brand && fold(m.brand) === tokens[0]) score -= 5;
    scored.push({ m, score });
  }
  scored.sort((a, b) => a.score - b.score || a.m.order - b.m.order);
  return scored.map((s) => s.m);
}

export type ParsedId = { vendor: string; product: string } | null;

/** Reads the USB vendor and product out of a Gamepad API id. Chromium and Firefox write them differently. */
export function parseGamepadId(id: string): ParsedId {
  const chromium = id.match(/Vendor:\s*([0-9a-f]{1,4})\s+Product:\s*([0-9a-f]{1,4})/i);
  const firefox = id.match(/^([0-9a-f]{1,4})-([0-9a-f]{1,4})-/i);
  const m = chromium ?? firefox;
  if (!m) return null;
  return { vendor: m[1].toLowerCase().padStart(4, "0"), product: m[2].toLowerCase().padStart(4, "0") };
}

/** The readable part of a Gamepad API id, without the ids and mapping notes. */
export function gamepadName(id: string): string {
  const firefox = id.match(/^[0-9a-f]{1,4}-[0-9a-f]{1,4}-(.*)$/i);
  if (firefox) return firefox[1].trim();
  return id.replace(/\s*\((?:[^()]*?)(?:STANDARD GAMEPAD|Vendor:)[^()]*\)\s*$/i, "").trim() || id;
}
