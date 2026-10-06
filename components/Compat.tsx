"use client";

import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { FAMILIES, FAMILY_ORDER, GROUPS, HINTS, SHORT, type Family, type GroupId } from "@/lib/families";
import { MODELS, search } from "@/lib/models";
import { CheckIcon, DashIcon, SearchIcon } from "./icons";
import { useHtmlData, useLang } from "./lang";
import { T } from "./T";

const PAGE = 40;

function Dot({ on, label }: { on: boolean; label: string }) {
  return (
    <span
      title={label}
      className={`inline-flex h-5 items-center rounded px-1.5 font-mono text-[10.5px] ${on ? "bg-white/[0.06] text-fg" : "text-faint/50 line-through decoration-faint/40"}`}
    >
      {label}
    </span>
  );
}

function Mark({ on, children }: { on: boolean; children?: React.ReactNode }) {
  return on ? (
    <span className="inline-flex items-center gap-1.5 text-fg">
      <CheckIcon className="text-accent" />
      {children}
    </span>
  ) : (
    <span className="text-faint">
      <DashIcon />
    </span>
  );
}

function FamilyDetail({ family, hint }: { family: Family; hint: string | null }) {
  return (
    <div className="grid gap-x-8 gap-y-2 text-[13.5px] sm:grid-cols-2">
      <p>
        <span className="text-faint">
          <T en="Extra buttons: " pt="Botões extras: " />
        </span>
        {family.passthrough && !family.extras ? (
          <T en="none, games read it directly" pt="nenhum, os jogos o leem diretamente" />
        ) : family.extras ? (
          <T en={family.extras.en} pt={family.extras.pt} />
        ) : (
          <T en="none" pt="nenhum" />
        )}
      </p>
      <p>
        <span className="text-faint">
          <T en="Gyro aim: " pt="Mira por giroscópio: " />
        </span>
        {family.gyro === "yes" ? <T en="yes" pt="sim" /> : family.gyro === "dinput" ? <T en="in D-input mode" pt="no modo D-input" /> : <T en="not listed" pt="não listado" />}
      </p>
      <p>
        <span className="text-faint">
          <T en="Light bar: " pt="Barra de luz: " />
        </span>
        {family.lightBar ? <T en="yes" pt="sim" /> : <T en="no" pt="não" />}
        <span className="text-faint">
          {" · "}
          <T en="Touchpad buttons: " pt="Botões no touchpad: " />
        </span>
        {family.touchpad ? <T en="yes" pt="sim" /> : <T en="no" pt="não" />}
      </p>
      {family.unsupported ? (
        <p className="text-warn">
          <T en="Not read by this version." pt="Não é lido nesta versão." />
        </p>
      ) : null}
      {hint && HINTS[hint] ? (
        <p className="border-l-2 border-warn/70 pl-3 text-muted sm:col-span-2">
          <T en={HINTS[hint].en} pt={HINTS[hint].pt} />
        </p>
      ) : null}
      {family.note ? (
        <p className="text-muted sm:col-span-2">
          <T en={family.note.en} pt={family.note.pt} />
        </p>
      ) : null}
    </div>
  );
}

export function Compat() {
  const lang = useLang();
  const os = useHtmlData("os", "other");
  const [tab, setTab] = useState<"models" | "families">("models");
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<GroupId | "all">("all");
  const [family, setFamily] = useState<string | null>(null);
  const [limit, setLimit] = useState(PAGE);
  const [open, setOpen] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const deferred = useDeferredValue(query);

  const results = useMemo(() => {
    const r = search(MODELS, deferred, group);
    return family ? r.filter((m) => m.family === family) : r;
  }, [deferred, group, family]);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const m of MODELS) c[m.family] = (c[m.family] ?? 0) + 1;
    return c;
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      const typing = t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable);
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        setTab("models");
        if (inputRef.current) inputRef.current.focus({ preventScroll: true });
        else requestAnimationFrame(() => inputRef.current?.focus({ preventScroll: true }));
        document.getElementById("controllers")?.scrollIntoView({ block: "start" });
      }
    };
    const onFamily = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      setTab("models");
      setQuery("");
      setGroup("all");
      setFamily(id);
      setLimit(PAGE);
      setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("oc-family", onFamily);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("oc-family", onFamily);
    };
  }, []);

  const shown = results.slice(0, limit);
  const fam = family ? FAMILIES[family] : null;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div role="tablist" aria-label={lang === "pt" ? "Visão" : "View"} className="seg">
          <button type="button" role="tab" aria-selected={tab === "models"} onClick={() => setTab("models")}>
            <T en="Models" pt="Modelos" /> <span className="text-faint">{MODELS.length}</span>
          </button>
          <button type="button" role="tab" aria-selected={tab === "families"} onClick={() => setTab("families")}>
            <T en="Families" pt="Famílias" /> <span className="text-faint">{FAMILY_ORDER.length}</span>
          </button>
        </div>
        <p className="text-[12.5px] text-faint">
          <T en="Plus the 869 Windows entries of SDL's community database for generic pads." pt="Mais as 869 entradas para Windows do banco de dados da comunidade do SDL para controles genéricos." />
        </p>
      </div>

      {tab === "models" ? (
        <div className="mt-4">
          <div className="card searchbox !rounded-2xl transition-[border-color,box-shadow]" data-spotlight>
            <span className="rim" aria-hidden />
            <label className="flex h-14 items-center gap-3 px-4 sm:px-5">
              <SearchIcon width={18} height={18} className="shrink-0 text-faint" />
              <span className="sr-only">{lang === "pt" ? "Buscar por nome, marca, família ou id USB" : "Search by name, brand, family or USB id"}</span>
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setLimit(PAGE);
                  setOpen(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setQuery("");
                    setFamily(null);
                  }
                }}
                placeholder={lang === "pt" ? "Tente DualSense, 8BitDo ou 054c:0ce6" : "Try DualSense, 8BitDo or 054c:0ce6"}
                autoComplete="off"
                spellCheck={false}
                className="h-full min-w-0 flex-1 bg-transparent text-[15px] text-fg outline-none placeholder:text-faint [&::-webkit-search-cancel-button]:hidden"
              />
              <span className="hidden items-center gap-1 sm:flex" aria-hidden>
                <kbd className="kbd">{os === "mac" ? "⌘" : "Ctrl"}</kbd>
                <kbd className="kbd">K</kbd>
              </span>
            </label>
            <div className="scrollbar-none flex gap-1.5 overflow-x-auto border-t border-line px-3 py-2.5 sm:px-4">
              {[{ id: "all" as const, label: { en: "All", pt: "Todos" } }, ...GROUPS].map((g) => (
                <button
                  key={g.id}
                  type="button"
                  aria-pressed={group === g.id && !family}
                  onClick={() => {
                    setGroup(g.id);
                    setFamily(null);
                    setLimit(PAGE);
                    setOpen(null);
                  }}
                  className="btn shrink-0 rounded-full px-3 py-1 text-[12.5px] text-muted hover:bg-white/[0.05] hover:text-fg aria-pressed:bg-white/[0.08] aria-pressed:text-fg"
                >
                  <T en={g.label.en} pt={g.label.pt} />
                </button>
              ))}
              {fam ? (
                <button
                  type="button"
                  onClick={() => setFamily(null)}
                  className="btn shrink-0 rounded-full border border-accent/50 bg-accent/10 px-3 py-1 text-[12.5px] text-fg"
                  aria-label={lang === "pt" ? "Remover filtro de família" : "Clear family filter"}
                >
                  <T en={fam.label.en} pt={fam.label.pt} /> <span aria-hidden>×</span>
                </button>
              ) : null}
            </div>
          </div>

          <p className="mt-4 mb-2 font-mono text-[12px] text-faint" aria-live="polite">
            {results.length === 1 ? (
              <T en="1 model" pt="1 modelo" />
            ) : (
              <T en={`${results.length} models`} pt={`${results.length} modelos`} />
            )}
          </p>

          <div className="min-h-[min(70vh,640px)]">
          {results.length ? (
            <ul className="divide-y divide-line border-y border-line">
              {shown.map((m) => {
                const f = FAMILIES[m.family] ?? FAMILIES.Other;
                const short = SHORT[m.family] ?? SHORT.Other;
                const isOpen = open === m.id;
                return (
                  <li key={m.id}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpen(isOpen ? null : m.id)}
                      className="grid w-full grid-cols-[1fr_auto] items-center gap-x-4 gap-y-0.5 px-1 py-3 text-left transition-colors hover:bg-white/[0.025] sm:px-3 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_auto_auto]"
                    >
                      <span className="min-w-0">
                        <span className="block truncate text-[14.5px] text-fg">{m.name}</span>
                        <span className="block truncate text-[12.5px] text-faint md:hidden">
                          {m.brand ? `${m.brand} · ` : ""}
                          <T en={short.en} pt={short.pt} />
                        </span>
                      </span>
                      <span className="hidden min-w-0 truncate text-[13px] text-muted md:block">
                        {m.brand ? <span className="text-fg/80">{m.brand} · </span> : null}
                        <T en={short.en} pt={short.pt} />
                      </span>
                      <span className="hidden gap-1 lg:flex">
                        {f.passthrough ? (
                          <span className="inline-flex h-5 items-center rounded bg-white/[0.06] px-1.5 font-mono text-[10.5px] text-muted">
                            <T en="read directly" pt="lido direto" />
                          </span>
                        ) : f.unsupported ? (
                          <span className="inline-flex h-5 items-center rounded bg-warn/10 px-1.5 font-mono text-[10.5px] text-warn">
                            <T en="not yet" pt="ainda não" />
                          </span>
                        ) : (
                          <>
                            <Dot on={!!f.extras} label={lang === "pt" ? "extras" : "extras"} />
                            <Dot on={f.gyro !== "no"} label="gyro" />
                            <Dot on={f.lightBar} label={lang === "pt" ? "luz" : "light"} />
                          </>
                        )}
                      </span>
                      <span className="font-mono text-[12px] text-muted">{m.id}</span>
                    </button>
                    {isOpen ? (
                      <div className="px-1 pb-4 pt-1 sm:px-3">
                        <FamilyDetail family={f} hint={m.hint} />
                      </div>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="border-y border-line py-10 text-center text-[14px] text-muted">
              <p>
                <T en="Not in the table of 602 known models." pt="Não está na tabela de 602 modelos conhecidos." />
              </p>
              <p className="mx-auto mt-2 max-w-md text-[13px] text-faint">
                <T
                  en="SDL may still read it with its own drivers or through the community database of generic pads. Plug it in above to see what your browser reports."
                  pt="O SDL ainda pode lê-lo com os próprios drivers ou pelo banco de dados da comunidade para controles genéricos. Conecte-o acima para ver o que o navegador informa."
                />
              </p>
            </div>
          )}

          </div>

          {results.length > limit ? (
            <div className="mt-4 flex justify-center">
              <button type="button" onClick={() => setLimit((l) => l + PAGE * 2)} className="btn btn-ghost h-10 px-4 text-[13px]">
                <T en={`Show more (${results.length - limit} left)`} pt={`Mostrar mais (faltam ${results.length - limit})`} />
              </button>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-[13.5px]">
            <caption className="sr-only">{lang === "pt" ? "O que cada família de controles faz" : "What each controller family does"}</caption>
            <thead>
              <tr className="border-b border-line-strong text-faint">
                <th scope="col" className="py-2.5 pr-4 font-normal">
                  <T en="Family" pt="Família" />
                </th>
                <th scope="col" className="py-2.5 pr-4 font-normal">
                  <T en="Extra buttons" pt="Botões extras" />
                </th>
                <th scope="col" className="py-2.5 pr-4 font-normal">
                  <T en="Gyro aim" pt="Giroscópio" />
                </th>
                <th scope="col" className="py-2.5 pr-4 font-normal">
                  <T en="Light bar" pt="Luz" />
                </th>
                <th scope="col" className="py-2.5 pr-4 font-normal">
                  Touchpad
                </th>
                <th scope="col" className="py-2.5 text-right font-normal">
                  <T en="Models" pt="Modelos" />
                </th>
              </tr>
            </thead>
            <tbody>
              {GROUPS.map((g) => {
                const fams = FAMILY_ORDER.filter((id) => FAMILIES[id].group === g.id);
                return [
                  <tr key={`g-${g.id}`}>
                    <th colSpan={6} scope="colgroup" className="pt-6 pb-2 text-left font-mono text-[11px] font-normal uppercase tracking-[0.08em] text-faint">
                      <T en={g.label.en} pt={g.label.pt} />
                    </th>
                  </tr>,
                  ...fams.map((id) => {
                    const f = FAMILIES[id];
                    return (
                      <tr key={id} className="border-t border-line align-top">
                        <th scope="row" className="py-3 pr-4 font-normal">
                          <button
                            type="button"
                            onClick={() => window.dispatchEvent(new CustomEvent("oc-family", { detail: id }))}
                            className="text-left text-fg underline decoration-transparent underline-offset-4 hover:decoration-line-strong"
                          >
                            <T en={f.label.en} pt={f.label.pt} />
                          </button>
                        </th>
                        <td className="py-3 pr-4 text-muted">
                          {f.unsupported ? (
                            <span className="text-warn">
                              <T en="Not read by this version" pt="Não é lido nesta versão" />
                            </span>
                          ) : f.passthrough && !f.extras ? (
                            <T en="Read by games directly" pt="Lido pelos jogos diretamente" />
                          ) : f.extras ? (
                            <T en={f.extras.en} pt={f.extras.pt} />
                          ) : (
                            <span className="text-faint">
                              <T en="None" pt="Nenhum" />
                            </span>
                          )}
                        </td>
                        <td className="py-3 pr-4">
                          {f.gyro === "dinput" ? (
                            <Mark on>
                              <span className="text-muted">D-input</span>
                            </Mark>
                          ) : (
                            <Mark on={f.gyro === "yes"} />
                          )}
                        </td>
                        <td className="py-3 pr-4">
                          <Mark on={f.lightBar} />
                        </td>
                        <td className="py-3 pr-4">
                          <Mark on={f.touchpad} />
                        </td>
                        <td className="py-3 text-right font-mono text-[12px] text-faint">{counts[id] ?? 0}</td>
                      </tr>
                    );
                  }),
                ];
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
