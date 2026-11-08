import type { Metadata } from "next";
import { ContactDialog } from "@/components/ContactDialog";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { GROUPS } from "@/lib/families";
import { getLatestRelease, getStars } from "@/lib/github";
import { GUIDES, guideDescription, guideModels, guidePath, guideTitle } from "@/lib/guides";
import { localePath, type L, type Lang } from "@/lib/i18n";
import { MODELS } from "@/lib/models";
import { pageMeta } from "@/lib/seo";

export const revalidate = 3600;

const COPY: { title: L; metaTitle: L; description: L } = {
  title: { en: "Controllers that work on PC with OpenController", pt: "Controles que funcionam no PC com o OpenController" },
  metaTitle: {
    en: "Any controller on PC: PlayStation, Switch, Stadia and more | OpenController",
    pt: "Qualquer controle no PC: PlayStation, Switch, Stadia e mais | OpenController",
  },
  description: {
    en: "Use PlayStation, Switch, Stadia, Luna, Flydigi, 8BitDo and handheld PC controllers in any PC game as an Xbox controller. See what works with yours. Free.",
    pt: "Use controles de PlayStation, Switch, Stadia, Luna, Flydigi, 8BitDo e PCs portáteis em qualquer jogo de PC como controle de Xbox. Grátis.",
  },
};

export async function generateMetadata({ params }: PageProps<"/[lang]/controllers">): Promise<Metadata> {
  const lang = (await params).lang as Lang;
  return pageMeta(lang, "/controllers", COPY.metaTitle[lang], COPY.description[lang]);
}

export default async function ControllersPage({ params }: PageProps<"/[lang]/controllers">) {
  const lang = (await params).lang as Lang;
  const t = (l: L) => l[lang];
  const [release, stars] = await Promise.all([getLatestRelease(), getStars()]);
  const home = localePath(lang);

  return (
    <>
      <a href="#main" className="skip">
        {lang === "pt" ? "Pular para o conteúdo" : "Skip to content"}
      </a>
      <Header stars={stars} version={release?.version ?? null} path="/controllers" home={home} />
      <main id="main" className="wrap pb-16">
        <header className="pb-12 pt-10 sm:pb-14 sm:pt-14">
          <h1 className="display text-balance text-[34px] sm:text-[46px]">{t(COPY.title)}</h1>
          <p className="mt-5 max-w-[44rem] text-pretty text-[17px] leading-relaxed text-muted">
            {lang === "pt"
              ? `O OpenController conhece ${MODELS.length} modelos de controle, e a maioria dos outros funciona mesmo fora da lista. Escolha o seu para ver o que funciona com ele, ou `
              : `OpenController knows ${MODELS.length} controller models, and most others work even off the list. Pick yours to see what works with it, or `}
            <a href={`${home}#controllers`} className="text-fg underline decoration-line-strong underline-offset-4 hover:decoration-fg">
              {lang === "pt" ? "procure pelo nome" : "search by name"}
            </a>
            .
          </p>
        </header>
        {GROUPS.map((group) => {
          const guides = GUIDES.filter((g) => g.family.group === group.id);
          if (!guides.length) return null;
          return (
            <section key={group.id} aria-labelledby={`g-${group.id}`} className="border-t border-line py-10">
              <h2 id={`g-${group.id}`} className="text-[22px] font-semibold tracking-tight">
                {t(group.label)}
              </h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {guides.map((g) => (
                  <li key={g.slug}>
                    <a href={localePath(lang, guidePath(g))} className="card block h-full p-5 transition-colors hover:border-line-strong">
                      <span className="block text-[16px] font-semibold tracking-tight text-fg">{t(guideTitle(g))}</span>
                      <span className="mt-2 block text-[13.5px] leading-relaxed text-muted">{t(guideDescription(g))}</span>
                      <span className="mt-3 block font-mono text-[11.5px] text-faint">
                        {guideModels(g).length} {lang === "pt" ? "modelos" : "models"}
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
