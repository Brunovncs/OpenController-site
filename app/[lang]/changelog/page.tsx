import type { Metadata } from "next";
import { ChangelogFeed, type ChangelogLabels } from "@/components/arc/blocks/changelog-feed/changelog-feed";
import { ContactDialog } from "@/components/ContactDialog";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { changelog, longDate } from "@/lib/changelog";
import { getLatestRelease, getReleases, getStars } from "@/lib/github";
import { localePath, type L, type Lang } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";
import { RELEASES_URL } from "@/lib/site";

export const revalidate = 3600;

const COPY: { title: L; description: L; h1: L; intro: L; feed: L; rss: L } = {
  title: { en: "What's new in OpenController | Release notes", pt: "Novidades do OpenController | Notas de versão" },
  description: {
    en: "Every OpenController version, newest first: what changed for people who play with it, and whether settings carry over.",
    pt: "Todas as versões do OpenController, da mais nova para a mais antiga: o que mudou para quem joga com ele, e se as configurações continuam.",
  },
  h1: { en: "What's new", pt: "Novidades" },
  intro: {
    en: "Every version, newest first, with what changed for someone who plays with OpenController. The app checks for a new version when its window opens and updates without reinstalling.",
    pt: "Todas as versões, da mais nova para a mais antiga, com o que mudou para quem joga com o OpenController. O app procura uma versão nova quando a janela abre e se atualiza sem reinstalar.",
  },
  feed: { en: "All versions", pt: "Todas as versões" },
  rss: { en: "Follow by RSS", pt: "Acompanhar por RSS" },
};

const LABELS: Record<Lang, ChangelogLabels> = {
  en: {
    count: { one: "version", other: "versions" },
    monthNav: "Jump to month",
    jumpTo: "Jump to",
    scroller: "Release notes",
    source: "On GitHub",
  },
  pt: {
    count: { one: "versão", other: "versões" },
    monthNav: "Ir para o mês",
    jumpTo: "Ir para",
    scroller: "Notas de versão",
    source: "No GitHub",
  },
};

export async function generateMetadata({ params }: PageProps<"/[lang]/changelog">): Promise<Metadata> {
  const lang = (await params).lang as Lang;
  return pageMeta(lang, "/changelog", COPY.title[lang], COPY.description[lang]);
}

export default async function ChangelogPage({ params }: PageProps<"/[lang]/changelog">) {
  const lang = (await params).lang as Lang;
  const t = (l: L) => l[lang];
  const [releases, release, stars] = await Promise.all([getReleases(), getLatestRelease(), getStars()]);
  const home = localePath(lang);
  const { entries, months } = changelog(lang, releases ?? []);
  const latest = releases?.[0];
  const first = releases?.[releases.length - 1];

  return (
    <>
      <a href="#main" className="skip">
        {lang === "pt" ? "Pular para o conteúdo" : "Skip to content"}
      </a>
      <Header stars={stars} version={release?.version ?? null} path="/changelog" home={home} />
      <main id="main" className="wrap pb-20">
        <header className="pb-10 pt-10 sm:pb-12 sm:pt-14">
          <h1 className="display text-balance text-[34px] sm:text-[46px]">{t(COPY.h1)}</h1>
          <p className="mt-5 max-w-[44rem] text-pretty text-[17px] leading-relaxed text-muted">{t(COPY.intro)}</p>
          {lang === "pt" ? <p className="mt-3 text-[14px] text-faint">As notas de cada versão são escritas em inglês.</p> : null}
        </header>
        {entries.length && latest && first ? (
          <ChangelogFeed
            className="mx-0!"
            entries={entries}
            months={months}
            labels={LABELS[lang]}
            title={t(COPY.feed)}
            subtitle={
              lang === "pt"
                ? `A ${latest.version} saiu em ${longDate(lang, latest.publishedAt)}.`
                : `${latest.version} came out on ${longDate(lang, latest.publishedAt)}.`
            }
            action={
              <a href={`${RELEASES_URL}.atom`} className="btn btn-ghost h-10 shrink-0 px-4 text-[13.5px]">
                {t(COPY.rss)}
              </a>
            }
            endNote={
              lang === "pt"
                ? `Essas são todas as versões desde a primeira, a ${first.version}, de ${longDate(lang, first.publishedAt)}.`
                : `That is every version since the first one, ${first.version}, on ${longDate(lang, first.publishedAt)}.`
            }
          />
        ) : (
          <div className="card max-w-[44rem] p-6 sm:p-8">
            <p className="text-[17px] text-fg">
              {lang === "pt" ? "O GitHub não respondeu agora." : "GitHub did not answer just now."}
            </p>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">
              {lang === "pt" ? "As notas de cada versão também estão na " : "The notes of every version are also on the "}
              <a href={RELEASES_URL} target="_blank" rel="noopener noreferrer" className="text-fg underline decoration-line-strong underline-offset-4 hover:decoration-fg">
                {lang === "pt" ? "página de versões" : "releases page"}
              </a>
              .
            </p>
          </div>
        )}
      </main>
      <ContactDialog version={release?.version ?? null} />
      <Footer version={release?.version ?? null} path="/changelog" home={home} />
    </>
  );
}
