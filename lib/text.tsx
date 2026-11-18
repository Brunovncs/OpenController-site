import { Fragment, type ReactNode } from "react";

type Vars = Record<string, string | number>;

/** Fills {name} placeholders: fmt("{n} models", { n: 3 }). */
export function fmt(text: string, vars: Vars): string {
  return text.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m));
}

/** One of two texts by count, for the many languages that have one form for 1 and one for the rest. */
export function plural(n: number, one: string, other: string): string {
  return fmt(n === 1 ? one : other, { n });
}

/**
 * Turns <tag>...</tag> in a message into elements, so a link or a bold word can sit inside a
 * sentence in any language: rich("Say <a>hello</a>.", { a: (c) => <a href="#">{c}</a> }).
 * Tags do not nest. {placeholders} are filled from `vars` first.
 */
export function rich(text: string, tags: Record<string, (chunk: ReactNode) => ReactNode>, vars?: Vars): ReactNode {
  const src = vars ? fmt(text, vars) : text;
  const out: ReactNode[] = [];
  const re = /<(\w+)>(.*?)<\/\1>/g;
  let last = 0;
  let k = 0;
  for (const m of src.matchAll(re)) {
    if (m.index > last) out.push(src.slice(last, m.index));
    const make = tags[m[1]];
    out.push(<Fragment key={k++}>{make ? make(m[2]) : m[2]}</Fragment>);
    last = m.index + m[0].length;
  }
  if (last < src.length) out.push(src.slice(last));
  return out;
}

/** A message with its tags removed, for places that take plain text (titles, JSON-LD). */
export function strip(text: string): string {
  return text.replace(/<\/?\w+>/g, "");
}
