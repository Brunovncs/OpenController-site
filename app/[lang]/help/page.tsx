import type { Metadata } from "next";
import { ContactDialog } from "@/components/ContactDialog";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ArrowIcon } from "@/components/icons";
import { getLatestRelease, getStars } from "@/lib/github";
import { HELP_SLUGS, helpPath } from "@/lib/help";
import { absUrl, HTML_LANG, localePath, type Lang } from "@/lib/i18n";
import { setLang, t } from "@/lib/i18n-server";
import { jsonLdScript, pageMeta } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

export const revalidate = 3600;

export async function generateMetadata({ params }: PageProps<"/[lang]/help">): Promise<Metadata> {
  const lang = (await params).lang as Lang;
  setLang(lang);
  const m = t().help.index;
  return pageMeta(lang, "/help", m.metaTitle, m.description);
}

export default async function HelpIndex({ params }: PageProps<"/[lang]/help">) {
  const lang = (await params).lang as Lang;
  setLang(lang);
  const m = t().help;
  const [release, stars] = await Promise.all([getLatestRelease(), getStars()]);
  const home = localePath(lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": absUrl(lang, "/help"),
    url: absUrl(lang, "/help"),
    name: m.index.title,
    description: m.index.description,
    inLanguage: HTML_LANG[lang],
    isPartOf: { "@id": `${SITE_URL}/#website` },
    hasPart: HELP_SLUGS.map((s) => ({ "@type": "TechArticle", url: absUrl(lang, helpPath(s)), headline: m.articles[s].title })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />
      <a href="#main" className="skip">
        {t().common.skip}
      </a>
      <Header stars={stars} version={release?.version ?? null} path="/help" home={home} />

      <main id="main" className="wrap pb-20">
        <header className="pb-10 pt-12 sm:pb-12 sm:pt-16">
          <h1 className="display text-[34px] sm:text-[46px]">{m.index.title}</h1>
          <p className="mt-4 max-w-[40rem] text-[17px] leading-relaxed text-muted">{m.index.lead}</p>
        </header>

        <ul className="grid gap-3 sm:grid-cols-2">
          {HELP_SLUGS.map((s) => {
            const a = m.articles[s];
            return (
              <li key={s}>
                <a
                  href={localePath(lang, helpPath(s))}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-white/[0.015] p-5 transition-colors hover:border-line-strong hover:bg-white/[0.03] sm:p-6"
                >
                  <span className="flex items-start justify-between gap-4 text-[17px] font-medium leading-snug text-fg">
                    {a.title}
                    <ArrowIcon className="mt-1 shrink-0 text-faint transition-transform group-hover:translate-x-0.5 group-hover:text-fg" />
                  </span>
                  <span className="mt-2 text-[14px] leading-relaxed text-muted">{a.description}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </main>
      <ContactDialog version={release?.version ?? null} />
      <Footer version={release?.version ?? null} path="/help" home={home} />
    </>
  );
}
