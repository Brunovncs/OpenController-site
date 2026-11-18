"use client";

import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { SearchField } from "@/components/arc/search-field/search-field";
import SegmentedControl from "@/components/arc/segmented-control/segmented-control";
import { SortableDataTable, type DataColumn, type SortDirection } from "@/components/arc/sortable-data-table/sortable-data-table";
import { glyphsFor, shapeFor } from "@/lib/drawings";
import { FAMILIES, FAMILY_ORDER, GROUPS, familyText, hintText, type Family, type GroupId } from "@/lib/families";
import { MODELS, search, type Rating } from "@/lib/models";
import { fmt, plural, rich } from "@/lib/text";
import { useTrackSearch } from "@/lib/track";
import { CheckIcon, DashIcon } from "./icons";
import { useHtmlData, useT } from "./lang";
import { PadDrawing } from "./PadDrawing";
import { openRequest } from "./RequestDialog";

/** The grades, as the app shows them next to a controller (`rating.rs`). Their text is in compat.ratings. */
const RATINGS: Record<Rating, { tone: string; mark: string }> = {
  Verified: { tone: "border-ok/40 bg-ok/10 text-ok", mark: "✓✓" },
  Compatible: { tone: "border-accent/40 bg-accent/10 text-accent", mark: "✓" },
  Caveats: { tone: "border-warn/40 bg-warn/10 text-warn", mark: "!" },
  Unsupported: { tone: "border-line-strong bg-white/[0.03] text-faint", mark: "✕" },
};
const RATING_ORDER: Rating[] = ["Verified", "Compatible", "Caveats", "Unsupported"];

export function RatingBadge({ rating }: { rating: Rating }) {
  const m = useT();
  const r = RATINGS[rating];
  return (
    <span className={`inline-flex h-5 shrink-0 items-center gap-1 rounded border px-1.5 font-mono text-[10.5px] ${r.tone}`}>
      <span aria-hidden>{r.mark}</span>
      {m.compat.ratings[rating].label}
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

/** The model's drawing, small, at rest: the same one the app and the test show. */
function Miniature({ model }: { model: (typeof MODELS)[number] }) {
  const shape = shapeFor(model, model.vendor);
  return (
    <div aria-hidden className="w-[160px] max-w-full rounded-xl border border-line bg-white/[0.015] px-2 py-1.5 sm:mt-1">
      <PadDrawing shape={shape} glyphs={glyphsFor(model, model.vendor, shape)} buttons={[]} axes={[0, 0, 0, 0]} />
    </div>
  );
}

const faint = { k: (c: React.ReactNode) => <span className="text-faint">{c}</span> };

export function FamilyDetail({ family, hint }: { family: Family; hint: string | null }) {
  const m = useT();
  const d = m.compat.detail;
  const text = familyText(m.compat.families, family.id);
  const hintLine = hintText(m.compat.hints, hint);
  const yesNo = (on: boolean) => (on ? d.yes : d.no);
  return (
    <div className="grid gap-x-8 gap-y-2 text-[13.5px] sm:grid-cols-2">
      <p>{rich(d.extras, faint, { v: family.extras ? text.extras : family.passthrough ? d.passthrough : d.none })}</p>
      <p>{rich(d.motion, faint, { v: family.gyro === "yes" ? d.yes : family.gyro === "dinput" ? d.dinput : d.no })}</p>
      <p>
        {rich(d.light, faint, { v: yesNo(family.lightBar) })}
        <span className="text-faint">{" · "}</span>
        {rich(d.touchpad, faint, { v: yesNo(family.touchpad) })}
      </p>
      {family.unsupported ? <p className="text-warn">{d.unsupported}</p> : null}
      {hintLine ? <p className="border-l-2 border-warn/70 pl-3 text-muted sm:col-span-2">{hintLine}</p> : null}
      {text.note ? <p className="text-muted sm:col-span-2">{text.note}</p> : null}
    </div>
  );
}

type FamilyRow = { id: string; name: string; group: number; extras: string; motion: number; light: number; touchpad: number; models: number };

const GYRO_RANK = { yes: 2, dinput: 1, no: 0 } as const;

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
  const m = useT();
  const tx = m.compat.table;
  const rows = useMemo<FamilyRow[]>(
    () =>
      FAMILY_ORDER.map((id) => {
        const f = FAMILIES[id];
        const text = familyText(m.compat.families, id);
        return {
          id,
          name: text.label,
          group: GROUPS.findIndex((g) => g.id === f.group),
          extras: f.extras ? text.extras : "",
          motion: GYRO_RANK[f.gyro],
          light: f.lightBar ? 1 : 0,
          touchpad: f.touchpad ? 1 : 0,
          models: counts[id] ?? 0,
        };
      }),
    [counts, m],
  );
  const sortMessages = useMemo(
    () => ({
      sortBy: (label: string, current?: SortDirection) =>
        fmt(current === "asc" ? tx.sortByAsc : current === "desc" ? tx.sortByDesc : tx.sortBy, { label }),
      sorted: (label: string, direction: SortDirection) => fmt(direction === "asc" ? tx.sortedAsc : tx.sortedDesc, { label }),
    }),
    [tx],
  );
  const columns: DataColumn<FamilyRow>[] = [
    {
      key: "name",
      label: tx.family,
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
    {
      key: "group",
      label: tx.group,
      numeric: false,
      width: 140,
      render: (_, r) => {
        const g = GROUPS[r.group];
        return <span className="text-muted">{g ? m.compat.groups[g.id] : null}</span>;
      },
    },
    {
      key: "extras",
      label: tx.extras,
      sortable: false,
      render: (_, r) => {
        const f = FAMILIES[r.id];
        if (f.unsupported) return <span className="text-warn">{tx.unsupported}</span>;
        if (f.passthrough && !f.extras) return <span className="text-muted">{tx.passthrough}</span>;
        if (f.extras) return <span className="text-muted">{r.extras}</span>;
        return <span className="text-faint">{tx.none}</span>;
      },
    },
    {
      key: "motion",
      label: tx.motion,
      numeric: false,
      render: (_, r) =>
        r.motion === GYRO_RANK.dinput ? (
          <Flag on label={tx.motionShort}>
            <span className="text-muted">D-input</span>
          </Flag>
        ) : (
          <Flag on={r.motion === GYRO_RANK.yes} label={tx.motionShort} />
        ),
    },
    { key: "light", label: tx.light, numeric: false, render: (_, r) => <Flag on={r.light === 1} label={tx.lightShort} /> },
    { key: "touchpad", label: tx.touchpad, numeric: false, render: (_, r) => <Flag on={r.touchpad === 1} label={tx.touchpadShort} /> },
    { key: "models", label: tx.models, numeric: true },
  ];
  return (
    <SortableDataTable
      rows={rows}
      columns={columns}
      rowKey="id"
      caption={tx.caption}
      defaultSort={{ key: "group", direction: "asc" }}
      messages={sortMessages}
    />
  );
}

export function Compat() {
  const c = useT().compat;
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

  useTrackSearch("controllers", deferred, results.length);

  const shown = results.slice(0, limit);
  const famLabel = family ? familyText(c.families, family).label : null;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <SegmentedControl
          label={c.view}
          value={tab}
          onValueChange={(v) => setTab(v as "models" | "families")}
          options={[
            { value: "models", label: c.models, accessory: <span className="ml-1.5 text-faint">{MODELS.length}</span> },
            { value: "families", label: c.familiesTab, accessory: <span className="ml-1.5 text-faint">{FAMILY_ORDER.length}</span> },
          ]}
        />
      </div>

      {tab === "models" ? (
        <div className="mt-4">
          <div className="relative">
            <SearchField
              ref={inputRef}
              label={c.search}
              clearLabel={c.clearSearch}
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
              placeholder={c.searchPlaceholder}
              autoComplete="off"
              spellCheck={false}
            />
            <span className="absolute right-0 top-0 hidden items-center gap-1 sm:flex" aria-hidden>
              <kbd className="kbd">{os === "mac" ? "⌘" : "Ctrl"}</kbd>
              <kbd className="kbd">K</kbd>
            </span>
          </div>
          <div className="scrollbar-none mt-3 flex gap-1.5 overflow-x-auto" role="group" aria-label={c.filterGroup}>
            {[{ id: "all" as const }, ...GROUPS].map((g) => (
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
                {g.id === "all" ? c.all : c.groups[g.id]}
              </button>
            ))}
            {famLabel ? (
              <button
                type="button"
                onClick={() => setFamily(null)}
                className="btn shrink-0 rounded-full border border-accent/50 bg-accent/10 px-3 py-1 text-[12.5px] text-fg"
                aria-label={c.clearFamily}
              >
                {famLabel} <span aria-hidden>×</span>
              </button>
            ) : null}
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4" role="group" aria-label={c.filterRating}>
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
                <span className="text-[12.5px] leading-snug text-muted">{c.ratings[r].hint}</span>
              </button>
            ))}
          </div>

          <p className="mt-4 mb-2 font-mono text-[12px] text-faint" aria-live="polite">
            {plural(results.length, c.count.one, c.count.other)}
          </p>

          <div className="min-h-[min(70vh,640px)]">
          {results.length ? (
            <ul className="divide-y divide-line border-y border-line">
              {shown.map((m) => {
                const f = FAMILIES[m.family] ?? FAMILIES.Other;
                const short = familyText(c.families, f.id).short;
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
                          {short}
                        </span>
                      </span>
                      <span className="hidden min-w-0 truncate text-[13px] text-muted md:block">
                        {m.brand ? <span className="text-fg/80">{m.brand} · </span> : null}
                        {short}
                      </span>
                      <span className="hidden items-center md:flex">
                        <RatingBadge rating={m.rating} />
                      </span>
                      <span className="hidden gap-1 lg:flex">
                        {f.passthrough ? (
                          <span className="inline-flex h-5 items-center rounded bg-white/[0.06] px-1.5 font-mono text-[10.5px] text-muted">
                            {c.worksAsIs}
                          </span>
                        ) : f.unsupported ? (
                          <span className="inline-flex h-5 items-center rounded bg-warn/10 px-1.5 font-mono text-[10.5px] text-warn">
                            {c.notYet}
                          </span>
                        ) : (
                          <>
                            <Dot on={f.extras} label={c.dots.extras} />
                            <Dot on={f.gyro !== "no"} label={c.dots.motion} />
                            <Dot on={f.lightBar} label={c.dots.light} />
                          </>
                        )}
                      </span>
                      <span className="font-mono text-[12px] text-muted">{m.id}</span>
                    </button>
                    {isOpen ? (
                      <div className="grid gap-x-6 gap-y-3 px-1 pb-5 pt-1 sm:grid-cols-[160px_minmax(0,1fr)] sm:px-3">
                        <Miniature model={m} />
                        <div className="min-w-0">
                        <p className="mb-3 flex flex-wrap items-center gap-2 text-[13px] text-muted">
                          <RatingBadge rating={m.rating} />
                          {c.ratings[m.rating].hint}
                        </p>
                        {m.alias_of ? (
                          <p className="mb-3 text-[13px] text-muted">
                            {fmt(c.alias, { alias: m.alias_of, name: m.name })}
                          </p>
                        ) : null}
                        <FamilyDetail family={f} hint={m.hint} />
                        </div>
                      </div>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="border-y border-line px-2 py-12 text-center">
              <div className="mx-auto max-w-lg">
                <p className="text-balance text-[19px] font-medium leading-snug text-fg">{c.empty.title}</p>
                <p className="mt-3 text-[14.5px] leading-relaxed text-muted">{c.empty.body}</p>
                <p className="mt-5 text-[12.5px] text-faint">{c.empty.showsUpAs}</p>
                <ul className="mt-2 flex flex-wrap justify-center gap-1.5">
                  {LOOKALIKES.map((name) => (
                    <li key={name} className="rounded-full border border-line px-2.5 py-1 text-[12.5px] text-muted">
                      {name}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-wrap justify-center gap-2">
                  <a href="#check" className="btn btn-primary h-10 px-5 text-[13.5px]">
                    {c.empty.test}
                  </a>
                  <button
                    type="button"
                    onClick={() => openRequest({ model: query.trim(), query: query.trim() })}
                    className="btn btn-ghost h-10 px-5 text-[13.5px]"
                  >
                    {c.empty.ask}
                  </button>
                </div>
                <p className="mt-4 text-[12.5px] leading-relaxed text-faint">{c.empty.note}</p>
              </div>
            </div>
          )}

          </div>

          {results.length ? (
            <p className="mt-4 text-center text-[13px] text-faint">
              {rich(c.missing, {
                a: (chunk) => (
                  <button
                    type="button"
                    onClick={() => openRequest({ model: query.trim(), query: query.trim() })}
                    className="text-muted underline decoration-line-strong underline-offset-4 hover:text-fg"
                  >
                    {chunk}
                  </button>
                ),
              })}
            </p>
          ) : null}

          {results.length > limit ? (
            <div className="mt-4 flex justify-center">
              <button type="button" onClick={() => setLimit((l) => l + PAGE * 2)} className="btn btn-ghost h-10 px-4 text-[13px]">
                {fmt(c.showMore, { n: results.length - limit })}
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
