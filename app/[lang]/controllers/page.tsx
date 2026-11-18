import { setLang, t } from "@/lib/i18n-server";
import type { Metadata } from "next";
import { ContactDialog } from "@/components/ContactDialog";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { GROUPS } from "@/lib/families";
import { getLatestRelease, getStars } from "@/lib/github";
import { GUIDES, guideDescription, guideModels, guidePath, guideTitle } from "@/lib/guides";
import { localePath, type Lang } from "@/lib/i18n";
import { MODELS } from "@/lib/models";
import { pageMeta } from "@/lib/seo";
import { plural, rich } from "@/lib/text";

export const revalidate = 3600;

export async function generateMetadata({ params }: PageProps<"/[lang]/controllers">): Promise<Metadata> {
  const lang = (await params).lang as Lang;
  setLang(lang);
  const m = t().guides.index;
  return pageMeta(lang, "/controllers", m.metaTitle, m.description);
}

export default async function ControllersPage({ params }: PageProps<"/[lang]/controllers">) {
  const lang = (await params).lang as Lang;
  setLang(lang);
  const m = t();
  const [release, stars] = await Promise.all([getLatestRelease(), getStars()]);
  const home = localePath(lang);

  return (
    <>
      <a href="#main" className="skip">
        {m.common.skip}
      </a>
      <Header stars={stars} version={release?.version ?? null} path="/controllers" home={home} />
      <main id="main" className="wrap pb-16">
        <header className="pb-12 pt-10 sm:pb-14 sm:pt-14">
          <h1 className="display text-balance text-[34px] sm:text-[46px]">{m.guides.index.title}</h1>
          <p className="mt-5 max-w-[44rem] text-pretty text-[17px] leading-relaxed text-muted">
            {rich(
              m.guides.index.intro,
              {
                a: (c) => (
                  <a href={`${home}#controllers`} className="text-fg underline decoration-line-strong underline-offset-4 hover:decoration-fg">
                    {c}
                  </a>
                ),
              },
              { n: MODELS.length },
            )}
          </p>
        </header>
        {GROUPS.map(({ id }) => {
          const guides = GUIDES.filter((g) => g.family.group === id);
          if (!guides.length) return null;
          return (
            <section key={id} aria-labelledby={`g-${id}`} className="border-t border-line py-10">
              <h2 id={`g-${id}`} className="text-[22px] font-semibold tracking-tight">
                {m.compat.groups[id]}
              </h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {guides.map((g) => (
                  <li key={g.slug}>
                    <a href={localePath(lang, guidePath(g))} className="card block h-full p-5 transition-colors hover:border-line-strong">
                      <span className="block text-[16px] font-semibold tracking-tight text-fg">{guideTitle(g, lang)}</span>
                      <span className="mt-2 block text-[13.5px] leading-relaxed text-muted">{guideDescription(g, lang)}</span>
                      <span className="mt-3 block font-mono text-[11.5px] text-faint">
                        {plural(guideModels(g).length, m.guides.index.models.one, m.guides.index.models.other)}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </main>
      <ContactDialog version={release?.version ?? null} />
      <Footer version={release?.version ?? null} path="/controllers" home={home} />
    </>
  );
}
