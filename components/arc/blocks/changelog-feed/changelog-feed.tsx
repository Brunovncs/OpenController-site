"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion, type Transition, type Variants } from "motion/react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { motionTokens } from "../../lib/motion-tokens";
import styles from "./changelog-feed.module.css";

/** One release. `details` are the paragraphs shown when it opens; closed, they stay in the page, hidden. */
export type ChangelogEntry = { id: string; month: string; date: string; iso: string; version: string; title: string; summary: string; details: string[]; href?: string };
/** A month of the month bar, as "October" and "2026" so both languages can word it. */
export type ChangelogMonth = { key: string; label: string; year: string; short: string };
type Entry = ChangelogEntry;

/** Plain strings, so a server component can pass them. */
export type ChangelogLabels = {
  /** The noun of the month count, as in "4 updates". */
  count: { one: string; other: string };
  monthNav: string;
  /** Before a month's name, as in "Jump to October 2026". */
  jumpTo: string;
  scroller: string;
  /** Link to the release's own page. */
  source: string;
};

const englishLabels: ChangelogLabels = {
  count: { one: "update", other: "updates" },
  monthNav: "Jump to month",
  jumpTo: "Jump to",
  scroller: "Release notes",
  source: "Release page",
};

const blurSoft = `blur(${motionTokens.blur.soft}px)`;
const blurSubtle = `blur(${motionTokens.blur.subtle}px)`;
const none = "blur(0px)";
const instant: Transition = { duration: 0 };
const exitSpring: Transition = { type: "spring", visualDuration: 0.28, bounce: 0 };

/** Values rise when they grow and fall when they shrink; the outgoing value leaves the opposite way. */
const roll: Variants = {
  enter: (direction: number) => ({ opacity: 0, y: `${direction * 55}%`, filter: blurSubtle }),
  center: { opacity: 1, y: "0%", filter: none },
  exit: (direction: number) => ({ opacity: 0, y: `${direction * -55}%`, filter: blurSubtle }),
};
const rise: Variants = {
  enter: (direction: number) => ({ opacity: 0, y: direction * 14, filter: blurSoft }),
  center: { opacity: 1, y: 0, filter: none },
  exit: (direction: number) => ({ opacity: 0, y: direction * -14, filter: blurSoft, transition: { duration: motionTokens.duration.exit, ease: [...motionTokens.ease.standard] } }),
};

function RollingText({ value, direction, reduce }: { value: string; direction: number; reduce: boolean }) {
  return <span className={styles.roll}>
    <AnimatePresence mode="popLayout" initial={false} custom={direction}>
      <motion.span key={value} custom={direction} variants={roll} initial="enter" animate="center" exit="exit" transition={reduce ? instant : motionTokens.spring.snappy}>{value}</motion.span>
    </AnimatePresence>
  </span>;
}

function EntryDetails({ entry, source }: { entry: Entry; source: string }) {
  return <>
    <div className={styles.details}>{entry.details.map((detail) => <p key={detail}>{detail}</p>)}</div>
    {entry.href && <a className={styles.source} href={entry.href} target="_blank" rel="noopener noreferrer">{source} <ArrowUpRight size={14} aria-hidden="true" /></a>}
  </>;
}

function EntryRow({ entry, open, onToggle, reduce, source }: { entry: Entry; open: boolean; onToggle: () => void; reduce: boolean; source: string }) {
  const panelId = useId();
  return <li id={entry.id} className={styles.entry} data-open={open || undefined}>
    <button type="button" className={styles.row} aria-expanded={open} aria-controls={panelId} onClick={onToggle}>
      <span className={styles.meta}>
        <time dateTime={entry.iso}>{entry.date}</time>
        <span className={styles.version}>v{entry.version}</span>
      </span>
      <span className={styles.body}>
        <span className={styles.title}>{entry.title}</span>
        {entry.summary && <span className={styles.summary}>{entry.summary}</span>}
      </span>
      <motion.span className={styles.chevron} aria-hidden="true" initial={false} animate={{ rotate: open ? 180 : 0 }} transition={reduce ? instant : motionTokens.spring.snappy}><ChevronDown size={16} /></motion.span>
    </button>
    <AnimatePresence initial={false}>
      {open && <motion.div key="panel" id={panelId} className={styles.panel} initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0, transition: reduce ? instant : exitSpring }} transition={reduce ? instant : motionTokens.spring.smooth}>
        <motion.div
          className={styles.panelInner}
          initial={{ opacity: 0, y: 8, filter: blurSoft }}
          animate={{ opacity: 1, y: 0, filter: none }}
          exit={{ opacity: 0, transition: { duration: motionTokens.duration.instant } }}
          transition={reduce ? { duration: 0, opacity: { duration: motionTokens.duration.instant } } : { y: { ...motionTokens.spring.smooth, delay: 0.06 }, opacity: { duration: motionTokens.duration.standard, delay: 0.06 }, filter: { duration: motionTokens.duration.standard, delay: 0.06 } }}
        >
          <EntryDetails entry={entry} source={source} />
        </motion.div>
      </motion.div>}
    </AnimatePresence>
    {/* Closed, the notes stay in the document (for search engines and find in page), only hidden. */}
    {!open && <div hidden><EntryDetails entry={entry} source={source} /></div>}
  </li>;
}

export interface ChangelogFeedProps {
  /** Release notes, newest first. Each entry belongs to one of `months` by key. */
  entries: ChangelogEntry[];
  /** Months shown in the month bar, newest first. */
  months: ChangelogMonth[];
  title: string;
  /** One line under the title, such as the latest release. */
  subtitle?: string;
  /** A link or button beside the title, such as a feed of new releases. */
  action?: ReactNode;
  /** Closing line at the end of the list. */
  endNote?: string;
  /** Entry ids open on first render. Defaults to the newest entry. */
  defaultOpen?: string[];
  labels?: ChangelogLabels;
  className?: string;
}

export function ChangelogFeed({ entries, months, title, subtitle, action, endNote, defaultOpen, labels = englishLabels, className }: ChangelogFeedProps) {
  const uid = useId();
  const monthOrder = useCallback((key: string) => months.findIndex((month) => month.key === key), [months]);
  const reduce = useReducedMotion() ?? false;
  const [open, setOpen] = useState<string[]>(() => defaultOpen ?? (entries[0] ? [entries[0].id] : []));
  const [active, setActive] = useState({ key: months[0]?.key ?? "", direction: 1 });
  const scrollRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const groupRefs = useRef(new Map<string, HTMLElement>());
  const frame = useRef(0);

  const groups = useMemo(() => months.map((month) => ({ ...month, items: entries.filter((entry) => entry.month === month.key) })).filter((group) => group.items.length > 0), [months, entries]);
  const current = groups.find((group) => group.key === active.key) ?? groups[0];

  const sync = useCallback(() => {
    const scroller = scrollRef.current;
    if (!scroller || groups.length === 0) return;
    const line = scroller.getBoundingClientRect().top + 28;
    let key = groups[0]!.key;
    for (const group of groups) {
      const element = groupRefs.current.get(group.key);
      if (element && element.getBoundingClientRect().top <= line) key = group.key;
    }
    if (scroller.scrollTop > 0 && scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 2) key = groups[groups.length - 1]!.key;
    setActive((previous) => previous.key === key ? previous : { key, direction: monthOrder(key) > monthOrder(previous.key) ? 1 : -1 });
  }, [groups, monthOrder]);

  const onScroll = useCallback(() => {
    if (frame.current) return;
    frame.current = requestAnimationFrame(() => { frame.current = 0; sync(); });
  }, [sync]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const observer = new ResizeObserver(() => onScroll());
    observer.observe(list);
    return () => observer.disconnect();
  }, [onScroll]);
  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  // A link to one release (#v0.8.11) opens it and brings it into view inside the list.
  useEffect(() => {
    const reveal = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id || !entries.some((entry) => entry.id === id)) return;
      setOpen((previous) => previous.includes(id) ? previous : [...previous, id]);
      const scroller = scrollRef.current, element = document.getElementById(id);
      if (scroller && element) scroller.scrollTo({ top: scroller.scrollTop + element.getBoundingClientRect().top - scroller.getBoundingClientRect().top });
    };
    const first = requestAnimationFrame(reveal);
    window.addEventListener("hashchange", reveal);
    return () => { cancelAnimationFrame(first); window.removeEventListener("hashchange", reveal); };
  }, [entries]);

  function toggleEntry(id: string) { setOpen((previous) => previous.includes(id) ? previous.filter((item) => item !== id) : [...previous, id]); }
  function jumpTo(key: string) {
    const scroller = scrollRef.current;
    const element = groupRefs.current.get(key);
    if (!scroller || !element) return;
    const top = scroller.scrollTop + element.getBoundingClientRect().top - scroller.getBoundingClientRect().top;
    scroller.scrollTo({ top: Math.max(0, top - 1), behavior: reduce ? "auto" : "smooth" });
  }

  const layout: Transition = reduce ? instant : motionTokens.spring.smooth;

  return <section className={[styles.feed, className].filter(Boolean).join(" ")} aria-labelledby={`${uid}-title`}>
    <header className={styles.header}>
      <div className={styles.heading}>
        <h2 id={`${uid}-title`}>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {action}
    </header>

    <div className={styles.monthBar}>
      <div className={styles.monthLabel} aria-hidden="true">
        <span className={styles.monthText}>
          <AnimatePresence mode="popLayout" initial={false} custom={active.direction}>
            <motion.span key={current?.key ?? "none"} custom={active.direction} variants={rise} initial="enter" animate="center" exit="exit" transition={reduce ? instant : motionTokens.spring.morph}>{current ? <>{current.label}<span className={styles.monthYear}> {current.year}</span></> : null}</motion.span>
          </AnimatePresence>
        </span>
        <motion.span className={styles.monthCount} layout="position" transition={layout}><RollingText value={`${current?.items.length ?? 0} ${current?.items.length === 1 ? labels.count.one : labels.count.other}`} direction={active.direction} reduce={reduce} /></motion.span>
      </div>
      {groups.length > 1 && <nav className={styles.monthNav} aria-label={labels.monthNav}>
        {groups.map((group) => {
          const selected = group.key === current?.key;
          return <button key={group.key} type="button" aria-label={`${labels.jumpTo} ${group.label} ${group.year}`} aria-current={selected ? "true" : undefined} onClick={() => jumpTo(group.key)}>
            {selected && <motion.span layoutId={`${uid}-month`} className={styles.monthPill} transition={reduce ? instant : motionTokens.spring.morph} />}
            <span className={styles.monthShort}>{group.short}</span>
          </button>;
        })}
      </nav>}
    </div>

    <motion.div layoutScroll ref={scrollRef} className={styles.scroller} onScroll={onScroll} tabIndex={0} aria-label={labels.scroller}>
      <div ref={listRef} className={styles.list}>
        {groups.map((group, index) => <section
          key={group.key}
          className={styles.group}
          aria-labelledby={`${uid}-${group.key}`}
          ref={(element: HTMLElement | null) => { if (element) groupRefs.current.set(group.key, element); else groupRefs.current.delete(group.key); }}
        >
          <h3 id={`${uid}-${group.key}`} className={index === 0 ? styles.srOnly : styles.groupTitle}>{group.label} {group.year}</h3>
          <ul className={styles.entries}>
            {group.items.map((entry) => <EntryRow key={entry.id} entry={entry} open={open.includes(entry.id)} onToggle={() => toggleEntry(entry.id)} reduce={reduce} source={labels.source} />)}
          </ul>
        </section>)}
        {endNote && <p className={styles.endCap}>{endNote}</p>}
      </div>
    </motion.div>
  </section>;
}

export default ChangelogFeed;
