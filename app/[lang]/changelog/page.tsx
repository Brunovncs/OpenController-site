import { setLang, t } from "@/lib/i18n-server";
import type { Metadata } from "next";
import { ChangelogFeed } from "@/components/arc/blocks/changelog-feed/changelog-feed";
import { ContactDialog } from "@/components/ContactDialog";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { changelog, longDate } from "@/lib/changelog";
import { getLatestRelease, getReleases, getStars } from "@/lib/github";
import { localePath, type Lang } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";
import { RELEASES_URL } from "@/lib/site";
import { fmt, rich } from "@/lib/text";

export const revalidate = 3600;

export async function generateMetadata({ params }: PageProps<"/[lang]/changelog">): Promise<Metadata> {
  const lang = (await params).lang as Lang;
  setLang(lang);
  const c = t().guides.changelog;
  return pageMeta(lang, "/changelog", c.metaTitle, c.description);
}

export default async function ChangelogPage({ params }: PageProps<"/[lang]/changelog">) {
  const lang = (await params).lang as Lang;
  setLang(lang);
  const m = t();
  const c = m.guides.changelog;
  const [releases, release, stars] = await Promise.all([getReleases(), getLatestRelease(), getStars()]);
  const home = localePath(lang);
  const { entries, months } = changelog(lang, releases ?? []);
  const latest = releases?.[0];
  const first = releases?.[releases.length - 1];

  return (
    <>
      <a href="#main" className="skip">
        {m.common.skip}
      </a>
      <Header stars={stars} version={release?.version ?? null} path="/changelog" home={home} />
      <main id="main" className="wrap pb-20">
        <header className="mx-auto max-w-[920px] pb-10 pt-10 sm:pb-12 sm:pt-14">
          <h1 className="display text-balance text-[34px] sm:text-[46px]">{c.title}</h1>
          <p className="mt-5 max-w-[44rem] text-pretty text-[17px] leading-relaxed text-muted">{c.intro}</p>
          {c.notesInEnglish ? <p className="mt-3 text-[14px] text-faint">{c.notesInEnglish}</p> : null}
        </header>
        {entries.length && latest && first ? (
          <ChangelogFeed
            entries={entries}
            months={months}
            labels={c.labels}
            title={c.feed}
            subtitle={fmt(c.latest, { version: latest.version, date: longDate(lang, latest.publishedAt) })}
            action={
              <a href={`${RELEASES_URL}.atom`} className="btn btn-ghost h-10 shrink-0 px-4 text-[13.5px]">
                {c.rss}
              </a>
            }
            endNote={fmt(c.first, { version: first.version, date: longDate(lang, first.publishedAt) })}
          />
        ) : (
          <div className="card mx-auto max-w-[44rem] p-6 sm:p-8">
            <p className="text-[17px] text-fg">{c.offline}</p>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">
              {rich(c.offlineLink, {
                a: (chunk) => (
                  <a href={RELEASES_URL} target="_blank" rel="noopener noreferrer" className="text-fg underline decoration-line-strong underline-offset-4 hover:decoration-fg">
                    {chunk}
                  </a>
                ),
              })}
            </p>
          </div>
        )}
      </main>
      <ContactDialog version={release?.version ?? null} />
      <Footer version={release?.version ?? null} path="/changelog" home={home} />
    </>
  );
}
