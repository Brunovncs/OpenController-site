"use client";

import { type ReactNode, useDeferredValue, useState } from "react";
import { SearchField } from "@/components/arc/search-field/search-field";
import { plain, type FaqItem } from "@/lib/faq";
import { PlusIcon } from "./icons";
import { useLang } from "./lang";
import { T } from "./T";

export const A = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} className="text-fg underline decoration-line-strong underline-offset-4 hover:decoration-fg">
    {children}
  </a>
);

/** Draws "[words](#anchor)" in an answer as a link; `base` points the anchor at another page. */
function Rich({ text, base }: { text: string; base: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/);
  return (
    <>
      {parts.map((p, i) => {
        const m = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(p);
        return m ? (
          <A key={i} href={m[2].startsWith("#") ? base + m[2] : m[2]}>
            {m[1]}
          </A>
        ) : (
          p
        );
      })}
    </>
  );
}

const normalize = (text: string) => text.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

/**
 * The questions with a search above them. Every answer stays in the page's HTML, closed in its
 * <details>; a search only hides the questions that don't mention it.
 */
export function FaqList({ items }: { items: FaqItem[] }) {
  const lang = useLang();
  const [query, setQuery] = useState("");
  const needle = normalize(useDeferredValue(query).trim());
  const shown = items.map((item) => !needle || normalize(`${item.q[lang]} ${plain(item.a[lang])}`).includes(needle));
  const count = shown.filter(Boolean).length;

  return (
    <>
      <SearchField
        label={lang === "pt" ? "Buscar nas perguntas" : "Search the questions"}
        clearLabel={lang === "pt" ? "Limpar busca" : "Clear search"}
        placeholder={lang === "pt" ? "Tente Linux, macro ou atualizar" : "Try Linux, macro or update"}
        value={query}
        onValueChange={setQuery}
        autoComplete="off"
      />
      <p className="mt-3 font-mono text-[12px] text-faint" aria-live="polite">
        {needle ? (
          count === 1 ? (
            <T en="1 question" pt="1 pergunta" />
          ) : (
            <T en={`${count} questions`} pt={`${count} perguntas`} />
          )
        ) : (
          <T en={`${items.length} questions`} pt={`${items.length} perguntas`} />
        )}
      </p>
      <div className="mt-3 border-t border-line">
        {items.map((item, i) => (
          <details key={item.q.en} hidden={!shown[i]} className="group border-b border-line">
            <summary className="flex items-center justify-between gap-6 py-5 text-[16.5px] text-fg transition-colors hover:text-white">
              <T en={item.q.en} pt={item.q.pt} />
              <PlusIcon className="chev shrink-0 text-faint group-hover:text-fg" width={18} height={18} />
            </summary>
            <div className="max-w-[46rem] pb-6 text-[15px] leading-relaxed text-muted">
              <T en={<Rich text={item.a.en} base="" />} pt={<Rich text={item.a.pt} base="" />} />
            </div>
          </details>
        ))}
        {count === 0 ? (
          <div className="border-b border-line py-8 text-[15px] leading-relaxed text-muted">
            <p>
              <T en={`No question mentions “${query.trim()}”.`} pt={`Nenhuma pergunta fala de “${query.trim()}”.`} />
            </p>
            <p className="mt-2">
              <T
                en={<>Ask us directly: <A href="#contact">get in touch</A>.</>}
                pt={<>Pergunte direto para a gente: <A href="#contact">fale conosco</A>.</>}
              />
            </p>
          </div>
        ) : null}
      </div>
    </>
  );
}
