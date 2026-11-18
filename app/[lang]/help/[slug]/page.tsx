import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ContactDialog } from "@/components/ContactDialog";
import { Download } from "@/components/Download";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ArrowIcon } from "@/components/icons";
import { getLatestRelease, getStars } from "@/lib/github";
import { HELP_SLUGS, helpLinks, helpPath, isHelpSlug } from "@/lib/help";
import { absUrl, HTML_LANG, LANGS, localePath, type Lang } from "@/lib/i18n";
import { setLang, t } from "@/lib/i18n-server";
import { jsonLdScript, pageMeta } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { rich, strip } from "@/lib/text";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.flatMap((lang) => HELP_SLUGS.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/help/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isHelpSlug(slug)) return {};
  setLang(lang as Lang);
  const a = t().help.articles[slug];
  return pageMeta(lang as Lang, helpPath(slug), a.metaTitle, a.description);
}

const LINK = "text-fg underline decoration-line-strong underline-offset-4 hover:decoration-fg";

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="border-t border-line py-10 sm:py-12">
      <div className="grid gap-x-10 gap-y-5 lg:grid-cols-12">
        <h2 id={id} className="text-[20px] font-semibold tracking-tight lg:col-span-3">
          {title}
        </h2>
        <div className="max-w-[44rem] text-[15.5px] leading-relaxed text-muted lg:col-span-9">{children}</div>
      </div>
    </section>
  );
}

export default async function HelpPage({ params }: PageProps<"/[lang]/help/[slug]">) {
  const { lang: raw, slug } = await params;
  const lang = raw as Lang;
  if (!isHelpSlug(slug)) notFound();
  setLang(lang);
  const m = t().help;
  const a = m.articles[slug];
  const [release, stars] = await Promise.all([getLatestRelease(), getStars()]);
  const home = localePath(lang);
  const path = helpPath(slug);
  const hrefs = helpLinks(lang);
  const tags = Object.fromEntries(
    Object.entries(hrefs).map(([tag, href]) => [tag, (c: ReactNode) => <a className={LINK} href={href}>{c}</a>]),
  );
  const steps = "steps" in a ? a.steps : null;

  const url = absUrl(lang, path);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": url,
        url,
        headline: a.title,
        description: a.description,
        inLanguage: HTML_LANG[lang],
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#app` },
        ...(release?.publishedAt ? { dateModified: release.publishedAt } : {}),
        author: { "@id": `${SITE_URL}/#author` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "OpenController", item: absUrl(lang) },
          { "@type": "ListItem", position: 2, name: m.ui.help, item: absUrl(lang, "/help") },
          { "@type": "ListItem", position: 3, name: a.title, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [{ "@type": "Question", name: a.title, acceptedAnswer: { "@type": "Answer", text: strip(a.answer) } }],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />
      <a href="#main" className="skip">
        {t().common.skip}
      </a>
      <Header stars={stars} version={release?.version ?? null} path={path} home={home} />

      <main id="main" className="wrap pb-16">
        <nav aria-label="Breadcrumb" className="pt-10 text-[13px] text-faint sm:pt-14">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <li>
              <a href={home} className="hover:text-fg">
                OpenController
              </a>
            </li>
            <li aria-hidden>/</li>
            <li>
              <a href={localePath(lang, "/help")} className="hover:text-fg">
                {m.ui.help}
              </a>
            </li>
          </ol>
        </nav>

        <header className="pb-10 pt-6 sm:pb-12">
          <h1 className="display max-w-[48rem] text-balance text-[32px] sm:text-[44px]">{a.title}</h1>
          <p className="mt-5 max-w-[44rem] text-pretty text-[17px] leading-relaxed text-fg/85">{rich(a.answer, tags)}</p>
          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
            <Download release={release} quiet platformsHref={hrefs.download} />
            <a href={hrefs.test} className="btn btn-ghost h-12 justify-center px-5 text-[15px]">
              {m.ui.test}
              <ArrowIcon />
            </a>
          </div>
        </header>

        {steps ? (
          <Section id="steps" title={m.ui.steps}>
            <ol className="space-y-3">
              {steps.map((s, i) => (
                <li key={i} className="flex gap-3">
                  <span className="grid size-6 shrink-0 place-items-center rounded-md bg-white/[0.06] font-mono text-[11.5px] text-muted">{i + 1}</span>
                  <span className="text-fg/90">{rich(s, tags)}</span>
                </li>
              ))}
            </ol>
          </Section>
        ) : null}

        {a.sections.map((s, i) => (
          <Section key={i} id={`s${i}`} title={s.h}>
            {s.p.map((p, k) => (
              <p key={k} className={k ? "mt-4" : undefined}>
                {rich(p, tags)}
              </p>
            ))}
          </Section>
        ))}

        <Section id="related" title={m.ui.related}>
          <ul className="space-y-2.5">
            {a.related.filter(isHelpSlug).map((r) => (
              <li key={r}>
                <a className={LINK} href={localePath(lang, helpPath(r))}>
                  {m.articles[r].title}
                </a>
              </li>
            ))}
          </ul>
        </Section>
      </main>
      <ContactDialog version={release?.version ?? null} />
      <Footer version={release?.version ?? null} path={path} home={home} />
    </>
  );
}
