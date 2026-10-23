import type { ChangelogEntry, ChangelogMonth } from "@/components/arc/blocks/changelog-feed/changelog-feed";
import type { ReleaseNotes } from "./github";
import type { Lang } from "./i18n";

const LOCALE: Record<Lang, string> = { en: "en-US", pt: "pt-BR" };
/** Dates are read in UTC, so a page built anywhere says the same day. */
const TZ = "UTC";

const capital = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** The notes are hard-wrapped markdown paragraphs; each becomes one line of text. */
export function paragraphs(notes: string): string[] {
  return notes
    .replace(/\r\n?/g, "\n")
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\s*\n\s*/g, " ").trim())
    .filter(Boolean);
}

/** The first sentence of a paragraph, and what follows it. A period inside "0.8.9" is not an end. */
function splitSentence(p: string): [string, string] {
  const m = /^([\s\S]+?[.!?])\s+([\s\S]*)$/.exec(p);
  return m ? [m[1], m[2]] : [p, ""];
}

function monthOf(lang: Lang, d: Date): ChangelogMonth {
  const part = (o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat(LOCALE[lang], { timeZone: TZ, ...o }).format(d);
  return {
    key: d.toISOString().slice(0, 7),
    label: capital(part({ month: "long" })),
    year: part({ year: "numeric" }),
    short: capital(part({ month: "short" }).replace(/\.$/, "")),
  };
}

export function longDate(lang: Lang, iso: string): string {
  return new Intl.DateTimeFormat(LOCALE[lang], { timeZone: TZ, day: "numeric", month: "long", year: "numeric" }).format(new Date(iso));
}

/** The releases as the changelog feed shows them: the first sentence is the title, the rest of that paragraph the summary. */
export function changelog(lang: Lang, releases: ReleaseNotes[]): { entries: ChangelogEntry[]; months: ChangelogMonth[] } {
  const months = new Map<string, ChangelogMonth>();
  const entries = releases.map((r): ChangelogEntry => {
    const d = new Date(r.publishedAt);
    const month = monthOf(lang, d);
    if (!months.has(month.key)) months.set(month.key, month);
    const day = new Intl.DateTimeFormat(LOCALE[lang], { timeZone: TZ, day: "numeric" }).format(d);
    const [first = "", ...rest] = paragraphs(r.notes);
    const [title, summary] = splitSentence(first);
    return {
      id: `v${r.version}`,
      month: month.key,
      date: lang === "pt" ? `${day} ${month.short.toLowerCase()}` : `${month.short} ${day}`,
      iso: r.publishedAt.slice(0, 10),
      version: r.version,
      title: title || r.version,
      summary,
      details: rest,
      href: r.url,
    };
  });
  return { entries, months: [...months.values()] };
}
