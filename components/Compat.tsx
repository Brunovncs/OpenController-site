"use client";

import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { SearchField } from "@/components/arc/search-field/search-field";
import SegmentedControl from "@/components/arc/segmented-control/segmented-control";
import { SortableDataTable, type DataColumn, type SortDirection } from "@/components/arc/sortable-data-table/sortable-data-table";
import { FAMILIES, FAMILY_ORDER, GROUPS, HINTS, SHORT, type Family, type GroupId } from "@/lib/families";
import type { Lang } from "@/lib/i18n";
import { MODELS, search, type Rating } from "@/lib/models";
import { CheckIcon, DashIcon } from "./icons";
import { useHtmlData, useLang } from "./lang";
import { openRequest } from "./RequestDialog";
import { T } from "./T";

/** The grades, as the app shows them next to a controller (`rating.rs`). */
const RATINGS: Record<Rating, { en: string; pt: string; hintEn: string; hintPt: string; tone: string; mark: string }> = {
  Verified: {
    en: "Verified",
    pt: "Verificado",
    hintEn: "Tested with OpenController on the controller itself. Everything it has works.",
    hintPt: "Testado com o OpenController no próprio controle. Tudo o que ele tem funciona.",
    tone: "border-ok/40 bg-ok/10 text-ok",
    mark: "✓✓",
  },
  Compatible: {
    en: "Compatible",
    pt: "Compatível",
    hintEn: "A known model. It should work in full, but it has not been tested here yet.",
    hintPt: "Um modelo conhecido. Deve funcionar por completo, mas ainda não foi testado aqui.",
    tone: "border-accent/40 bg-accent/10 text-accent",
    mark: "✓",
  },
  Caveats: {
    en: "With a note",
    pt: "Com ressalva",
    hintEn: "It works, with one thing to know first: a mode to switch to, or buttons the system keeps to itself.",
    hintPt: "Funciona, com um detalhe para saber antes: um modo para trocar, ou botões que o sistema guarda para si.",
    tone: "border-warn/40 bg-warn/10 text-warn",
    mark: "!",
  },
  Unsupported: {
    en: "Not yet",
    pt: "Ainda não",
    hintEn: "Recognised, but OpenController cannot read it yet.",
    hintPt: "Reconhecido, mas o OpenController ainda não consegue lê-lo.",
    tone: "border-line-strong bg-white/[0.03] text-faint",
    mark: "✕",
  },
};
const RATING_ORDER: Rating[] = ["Verified", "Compatible", "Caveats", "Unsupported"];

export function RatingBadge({ rating }: { rating: Rating }) {
  const r = RATINGS[rating];
  return (
    <span className={`inline-flex h-5 shrink-0 items-center gap-1 rounded border px-1.5 font-mono text-[10.5px] ${r.tone}`}>
      <span aria-hidden>{r.mark}</span>
      <T en={r.en} pt={r.pt} />
    </span>
  );
}

const PAGE = 40;

/** What a controller off the list most often reports itself as, by copying its chip and ids. */
const LOOKALIKES = ["Xbox 360 Controller", "DualShock 4", "Switch Pro Controller"];

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

export function FamilyDetail({ family, hint }: { family: Family; hint: string | null }) {
  return (
    <div className="grid gap-x-8 gap-y-2 text-[13.5px] sm:grid-cols-2">
      <p>
        <span className="text-faint">
          <T en="Extra buttons: " pt="Botões extras: " />
        </span>
        {family.passthrough && !family.extras ? (
          <T en="none, games already support it" pt="nenhum, os jogos já aceitam esse controle" />
        ) : family.extras ? (
          <T en={family.extras.en} pt={family.extras.pt} />
        ) : (
          <T en="none" pt="nenhum" />
        )}
      </p>
      <p>
        <span className="text-faint">
          <T en="Aim by moving it: " pt="Mira com movimento: " />
        </span>
        {family.gyro === "yes" ? <T en="yes" pt="sim" /> : family.gyro === "dinput" ? <T en="in D-input mode" pt="no modo D-input" /> : <T en="no" pt="não" />}
      </p>
      <p>
        <span className="text-faint">
          <T en="Light bar: " pt="Barra de luz: " />
        </span>
        {family.lightBar ? <T en="yes" pt="sim" /> : <T en="no" pt="não" />}
        <span className="text-faint">
          {" · "}
          <T en="Touchpad as buttons: " pt="Touchpad como botões: " />
        </span>
        {family.touchpad ? <T en="yes" pt="sim" /> : <T en="no" pt="não" />}
      </p>
      {family.unsupported ? (
        <p className="text-warn">
          <T en="Not supported yet." pt="Ainda não é suportado." />
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

type FamilyRow = { id: string; name: string; group: number; extras: string; motion: number; light: number; touchpad: number; models: number };

const GYRO_RANK = { yes: 2, dinput: 1, no: 0 } as const;

const SORT_MESSAGES: Record<Lang, { sortBy: (label: string, current?: SortDirection) => string; sorted: (label: string, direction: SortDirection) => string }> = {
  en: {
    sortBy: (label, current) => `Sort by ${label}${current ? `, now ${current === "asc" ? "ascending" : "descending"}` : ""}`,
    sorted: (label, direction) => `Sorted by ${label}, ${direction === "asc" ? "ascending" : "descending"}`,
  },
  pt: {
    sortBy: (label, current) => `Ordenar por ${label}${current ? `, agora ${current === "asc" ? "crescente" : "decrescente"}` : ""}`,
    sorted: (label, direction) => `Ordenado por ${label}, ${direction === "asc" ? "crescente" : "decrescente"}`,
  },
};

/** A mark in the family table. On a phone the table folds into lines, so the column's name goes beside it. */
function Flag({ on, label, children }: { on: boolean; label: string; children?: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <Mark on={on}>{children}</Mark>
      <span className={`text-[12.5px] min-[621px]:hidden ${on ? "text-muted" : "text-faint"}`}>{label}</span>
    </span>
  );
}

function FamilyTable({ counts }: { counts: Record<string, number> }) {
  const lang = useLang();
  const rows = useMemo<FamilyRow[]>(
    () =>
      FAMILY_ORDER.map((id) => {
        const f = FAMILIES[id];
        return {
          id,
          name: f.label[lang],
          group: GROUPS.findIndex((g) => g.id === f.group),
          extras: f.extras?.[lang] ?? "",
          motion: GYRO_RANK[f.gyro],
          light: f.lightBar ? 1 : 0,
          touchpad: f.touchpad ? 1 : 0,
          models: counts[id] ?? 0,
        };
      }),
    [counts, lang],
  );
  const pt = lang === "pt";
  const columns: DataColumn<FamilyRow>[] = [
    {
      key: "name",
      label: pt ? "Família" : "Family",
      render: (_, r) => (
        <button
          type="button"
          onClick={() => window.dispatchEvent(new CustomEvent("oc-family", { detail: r.id }))}
          className="text-left text-fg underline decoration-transparent underline-offset-4 hover:decoration-line-strong"
        >
          {r.name}
        </button>
      ),
    },
    { key: "group", label: pt ? "Grupo" : "Group", numeric: false, width: 140, render: (_, r) => <span className="text-muted">{GROUPS[r.group]?.label[lang]}</span> },
    {
      key: "extras",
      label: pt ? "Botões extras" : "Extra buttons",
      sortable: false,
      render: (_, r) => {
        const f = FAMILIES[r.id];
        if (f.unsupported)
          return (
            <span className="text-warn">
              <T en="Not supported yet" pt="Ainda não é suportado" />
            </span>
          );
        if (f.passthrough && !f.extras) return <span className="text-muted"><T en="Games already support it" pt="Os jogos já aceitam" /></span>;
        if (f.extras) return <span className="text-muted">{r.extras}</span>;
        return (
          <span className="text-faint">
            <T en="None" pt="Nenhum" />
          </span>
        );
      },
    },
    {
      key: "motion",
      label: pt ? "Mira com movimento" : "Motion aim",
      numeric: false,
      render: (_, r) =>
        r.motion === GYRO_RANK.dinput ? (
          <Flag on label={pt ? "movimento" : "motion"}>
            <span className="text-muted">D-input</span>
          </Flag>
        ) : (
          <Flag on={r.motion === GYRO_RANK.yes} label={pt ? "movimento" : "motion"} />
        ),
    },
    { key: "light", label: pt ? "Luz" : "Light bar", numeric: false, render: (_, r) => <Flag on={r.light === 1} label={pt ? "luz" : "light"} /> },
    { key: "touchpad", label: "Touchpad", numeric: false, render: (_, r) => <Flag on={r.touchpad === 1} label="touchpad" /> },
    { key: "models", label: pt ? "Modelos" : "Models", numeric: true },
  ];
  return (
    <SortableDataTable
      rows={rows}
      columns={columns}
      rowKey="id"
      caption={pt ? "O que cada família de controles faz" : "What each controller family does"}
      defaultSort={{ key: "group", direction: "asc" }}
      messages={SORT_MESSAGES[lang]}
    />
  );
}

export function Compat() {
  const lang = useLang();
  const os = useHtmlData("os", "other");
  const [tab, setTab] = useState<"models" | "families">("models");
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<GroupId | "all">("all");
  const [family, setFamily] = useState<string | null>(null);
  const [rating, setRating] = useState<Rating | null>(null);
  const [limit, setLimit] = useState(PAGE);
  const [open, setOpen] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const deferred = useDeferredValue(query);

  const results = useMemo(() => {
    const r = search(MODELS, deferred, group).filter((m) => !rating || m.rating === rating);
    return family ? r.filter((m) => m.family === family) : r;
  }, [deferred, group, family, rating]);

  const ratingCounts = useMemo(() => {
    const c: Partial<Record<Rating, number>> = {};
    for (const m of MODELS) c[m.rating] = (c[m.rating] ?? 0) + 1;
    return c;
  }, []);

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
        <SegmentedControl
          label={lang === "pt" ? "Visão" : "View"}
          value={tab}
          onValueChange={(v) => setTab(v as "models" | "families")}
          options={[
            { value: "models", label: lang === "pt" ? "Modelos" : "Models", accessory: <span className="ml-1.5 text-faint">{MODELS.length}</span> },
            { value: "families", label: lang === "pt" ? "Famílias" : "Families", accessory: <span className="ml-1.5 text-faint">{FAMILY_ORDER.length}</span> },
          ]}
        />
        <p className="text-[12.5px] text-faint">
          <T en="Many controllers that are not on this list work too." pt="Muitos controles que não estão nesta lista também funcionam." />
        </p>
      </div>

      {tab === "models" ? (
        <div className="mt-4">
          <div className="relative">
            <SearchField
              ref={inputRef}
              label={lang === "pt" ? "Buscar por nome, marca, família ou id USB" : "Search by name, brand, family or USB id"}
              clearLabel={lang === "pt" ? "Limpar busca" : "Clear search"}
              value={query}
              onValueChange={(v) => {
                setQuery(v);
                setLimit(PAGE);
                setOpen(null);
              }}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setQuery("");
                  setFamily(null);
                }
              }}
              placeholder={lang === "pt" ? "Tente DualSense ou 8BitDo" : "Try DualSense or 8BitDo"}
              autoComplete="off"
              spellCheck={false}
            />
            <span className="absolute right-0 top-0 hidden items-center gap-1 sm:flex" aria-hidden>
              <kbd className="kbd">{os === "mac" ? "⌘" : "Ctrl"}</kbd>
              <kbd className="kbd">K</kbd>
            </span>
          </div>
          <div className="scrollbar-none mt-3 flex gap-1.5 overflow-x-auto" role="group" aria-label={lang === "pt" ? "Filtrar por grupo" : "Filter by group"}>
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

          <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4" role="group" aria-label={lang === "pt" ? "Filtrar por compatibilidade" : "Filter by compatibility"}>
            {RATING_ORDER.filter((r) => ratingCounts[r]).map((r) => (
              <button
                key={r}
                type="button"
                aria-pressed={rating === r}
                onClick={() => {
                  setRating(rating === r ? null : r);
                  setLimit(PAGE);
                  setOpen(null);
                }}
                className="btn flex flex-col items-start gap-1.5 rounded-xl border border-line px-3 py-2.5 text-left transition-colors hover:bg-white/[0.03] aria-pressed:border-accent/60 aria-pressed:bg-accent/[0.06]"
              >
                <span className="flex w-full items-center justify-between gap-2">
                  <RatingBadge rating={r} />
                  <span className="font-mono text-[11.5px] text-faint">{ratingCounts[r]}</span>
                </span>
                <span className="text-[12.5px] leading-snug text-muted">
                  <T en={RATINGS[r].hintEn} pt={RATINGS[r].hintPt} />
                </span>
              </button>
            ))}
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
                const isOpen = open === m.key;
                return (
                  <li key={m.key}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpen(isOpen ? null : m.key)}
                      className="grid w-full grid-cols-[1fr_auto] items-center gap-x-4 gap-y-0.5 px-1 py-3 text-left transition-colors hover:bg-white/[0.025] sm:px-3 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_auto_auto] lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_auto_auto_auto]"
                    >
                      <span className="min-w-0">
                        <span className="flex min-w-0 items-center gap-2">
                          <span className="truncate text-[14.5px] text-fg">{m.name}</span>
                          <span className="md:hidden">
                            <RatingBadge rating={m.rating} />
                          </span>
                        </span>
                        <span className="block truncate text-[12.5px] text-faint md:hidden">
                          {m.brand ? `${m.brand} · ` : ""}
                          <T en={short.en} pt={short.pt} />
                        </span>
                      </span>
                      <span className="hidden min-w-0 truncate text-[13px] text-muted md:block">
                        {m.brand ? <span className="text-fg/80">{m.brand} · </span> : null}
                        <T en={short.en} pt={short.pt} />
                      </span>
                      <span className="hidden items-center md:flex">
                        <RatingBadge rating={m.rating} />
                      </span>
                      <span className="hidden gap-1 lg:flex">
                        {f.passthrough ? (
                          <span className="inline-flex h-5 items-center rounded bg-white/[0.06] px-1.5 font-mono text-[10.5px] text-muted">
                            <T en="works as is" pt="funciona direto" />
                          </span>
                        ) : f.unsupported ? (
                          <span className="inline-flex h-5 items-center rounded bg-warn/10 px-1.5 font-mono text-[10.5px] text-warn">
                            <T en="not yet" pt="ainda não" />
                          </span>
                        ) : (
                          <>
                            <Dot on={!!f.extras} label={lang === "pt" ? "extras" : "extras"} />
                            <Dot on={f.gyro !== "no"} label={lang === "pt" ? "movimento" : "motion"} />
                            <Dot on={f.lightBar} label={lang === "pt" ? "luz" : "light"} />
                          </>
                        )}
                      </span>
                      <span className="font-mono text-[12px] text-muted">{m.id}</span>
                    </button>
                    {isOpen ? (
                      <div className="px-1 pb-4 pt-1 sm:px-3">
                        <p className="mb-3 flex flex-wrap items-center gap-2 text-[13px] text-muted">
                          <RatingBadge rating={m.rating} />
                          <T en={RATINGS[m.rating].hintEn} pt={RATINGS[m.rating].hintPt} />
                        </p>
                        {m.alias_of ? (
                          <p className="mb-3 text-[13px] text-muted">
                            <T
                              en={`It reports itself as a ${m.alias_of}, so the app shows it as one at first. Pick ${m.name} under Model, on its Information page, to see it by name.`}
                              pt={`Ele se apresenta como ${m.alias_of}, então o app mostra esse nome no começo. Escolha ${m.name} em Modelo, na página Informações dele, para vê-lo com o nome certo.`}
                            />
                          </p>
                        ) : null}
                        <FamilyDetail family={f} hint={m.hint} />
                      </div>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="border-y border-line px-2 py-12 text-center">
              <div className="mx-auto max-w-lg">
                <p className="text-balance text-[19px] font-medium leading-snug text-fg">
                  <T en="Not on the list yet, but it will probably work." pt="Ainda não está na lista, mas provavelmente funciona." />
                </p>
                <p className="mt-3 text-[14.5px] leading-relaxed text-muted">
                  <T
                    en="Many controllers are built on the same chip as an Xbox, PlayStation or Switch controller and tell the computer they are one. OpenController then knows yours as that controller, and it works like one."
                    pt="Muitos controles usam o mesmo chip de um controle de Xbox, PlayStation ou Switch e se apresentam ao computador como um deles. Aí o OpenController reconhece o seu como esse controle, e ele funciona igual."
                  />
                </p>
                <p className="mt-5 text-[12.5px] text-faint">
                  <T en="Yours may show up as" pt="O seu pode aparecer como" />
                </p>
                <ul className="mt-2 flex flex-wrap justify-center gap-1.5">
                  {LOOKALIKES.map((name) => (
                    <li key={name} className="rounded-full border border-line px-2.5 py-1 text-[12.5px] text-muted">
                      {name}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-wrap justify-center gap-2">
                  <a href="#check" className="btn btn-primary h-10 px-5 text-[13.5px]">
                    <T en="Test my controller" pt="Testar meu controle" />
                  </a>
                  <button
                    type="button"
                    onClick={() => openRequest({ model: query.trim(), query: query.trim() })}
                    className="btn btn-ghost h-10 px-5 text-[13.5px]"
                  >
                    <T en="Ask for it to be added" pt="Pedir para incluir" />
                  </button>
                </div>
                <p className="mt-4 text-[12.5px] leading-relaxed text-faint">
                  <T
                    en="The test shows in seconds what your controller says it is. If it is not recognised there, ask from the test itself and its ids go with the request."
                    pt="O teste mostra em segundos como o seu controle se apresenta. Se ele não for reconhecido lá, peça pelo próprio teste e os IDs dele vão junto com o pedido."
                  />
                </p>
              </div>
            </div>
          )}

          </div>

          {results.length ? (
            <p className="mt-4 text-center text-[13px] text-faint">
              <T en="Missing yours? It probably works anyway. " pt="Não achou o seu? Ele provavelmente funciona mesmo assim. " />
              <button
                type="button"
                onClick={() => openRequest({ model: query.trim(), query: query.trim() })}
                className="text-muted underline decoration-line-strong underline-offset-4 hover:text-fg"
              >
                <T en="Ask for it" pt="Peça para incluirmos" />
              </button>
            </p>
          ) : null}

          {results.length > limit ? (
            <div className="mt-4 flex justify-center">
              <button type="button" onClick={() => setLimit((l) => l + PAGE * 2)} className="btn btn-ghost h-10 px-4 text-[13px]">
                <T en={`Show more (${results.length - limit} left)`} pt={`Mostrar mais (faltam ${results.length - limit})`} />
              </button>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="mt-4">
          <FamilyTable counts={counts} />
        </div>
      )}
    </div>
  );
}
