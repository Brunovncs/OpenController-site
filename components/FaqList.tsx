"use client";

import { type ReactNode, useDeferredValue, useState } from "react";
import { SearchField } from "@/components/arc/search-field/search-field";
import type { FaqItem } from "@/lib/faq";
import { fmt, plural, rich, strip } from "@/lib/text";
import { useTrackSearch } from "@/lib/track";
import { PlusIcon } from "./icons";
import { useT } from "./lang";

export const A = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} className="text-fg underline decoration-line-strong underline-offset-4 hover:decoration-fg">
    {children}
  </a>
);

const contact = (c: ReactNode) => <A href="#contact">{c}</A>;

const normalize = (text: string) => text.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

/**
 * The questions with a search above them. Every answer stays in the page's HTML, closed in its
 * <details>; a search only hides the questions that don't mention it.
 */
export function FaqList({ items }: { items: FaqItem[] }) {
  const m = useT().home.faq;
  const [query, setQuery] = useState("");
  const needle = normalize(useDeferredValue(query).trim());
  const shown = items.map((item) => !needle || normalize(`${item.q} ${strip(item.a)}`).includes(needle));
  const count = shown.filter(Boolean).length;
  useTrackSearch("faq", query, count);

  return (
    <>
      <SearchField label={m.search} clearLabel={m.clear} placeholder={m.placeholder} value={query} onValueChange={setQuery} autoComplete="off" />
      <p className="mt-3 min-h-[18px] font-mono text-[12px] text-faint" aria-live="polite">
        {needle ? plural(count, m.count.one, m.count.other) : null}
      </p>
      <div className="mt-3 border-t border-line">
        {items.map((item, i) => (
          <details key={item.id} hidden={!shown[i]} className="group border-b border-line">
            <summary className="flex items-center justify-between gap-6 py-5 text-[16.5px] text-fg transition-colors hover:text-white">
              {item.q}
              <PlusIcon className="chev shrink-0 text-faint group-hover:text-fg" width={18} height={18} />
            </summary>
            <div className="max-w-[46rem] pb-6 text-[15px] leading-relaxed text-muted">{rich(item.a, { a: contact })}</div>
          </details>
        ))}
        {count === 0 ? (
          <div className="border-b border-line py-8 text-[15px] leading-relaxed text-muted">
            <p>{fmt(m.none, { q: query.trim() })}</p>
            <p className="mt-2">{rich(m.ask, { a: contact })}</p>
          </div>
        ) : null}
      </div>
    </>
  );
}
