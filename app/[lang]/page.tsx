import { setLang, t } from "@/lib/i18n-server";
import { Compat } from "@/components/Compat";
import { Contact } from "@/components/Contact";
import { ContactDialog } from "@/components/ContactDialog";
import { RequestDialog } from "@/components/RequestDialog";
import { ControllerCheck } from "@/components/ControllerCheck";
import { Faq } from "@/components/Faq";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Header, NAV } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Performance } from "@/components/Performance";
import { Platforms } from "@/components/Platforms";
import { RailToc } from "@/components/RailToc";
import { SectionHead } from "@/components/SectionHead";
import { Spotlight } from "@/components/Spotlight";
import type { Metadata } from "next";
import { GuideLinks } from "@/components/GuideLinks";
import { SINCE, getLatestRelease, getStars, hasFeature } from "@/lib/github";
import { isLang, type Lang } from "@/lib/i18n";
import { homeJsonLd, jsonLdScript, pageMeta } from "@/lib/seo";
import { rich } from "@/lib/text";

export const revalidate = 3600;

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  setLang(lang);
  const { meta } = t().home;
  return pageMeta(lang, "/", meta.title, meta.description);
}

export default async function Page({ params }: PageProps<"/[lang]">) {
  const lang = (await params).lang as Lang;
  setLang(lang);
  const [release, stars] = await Promise.all([getLatestRelease(), getStars()]);
  const appReports = hasFeature(release?.version, SINCE.reports);
  const appMapping = hasFeature(release?.version, SINCE.mapping);
  const m = t().home;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(homeJsonLd(lang, release, appReports, appMapping)) }} />
      <a href="#main" className="skip">
        {t().common.skip}
      </a>
      <Header stars={stars} version={release?.version ?? null} />
      <RailToc items={NAV} />
      <Spotlight />

      <main id="main">
        <Hero release={release} />

        <section id="check" aria-labelledby="check-title" className="wrap pt-24 sm:pt-32">
          <SectionHead n="01" label={m.check.label} title={<span id="check-title">{m.check.title}</span>}>
            {m.check.body}
          </SectionHead>
          <div className="mt-12">
            <ControllerCheck />
          </div>
        </section>

        <Features />
        <Performance />

        <section id="controllers" aria-labelledby="controllers-title" className="wrap py-20 sm:py-24">
          <SectionHead n="04" label={m.controllers.label} title={<span id="controllers-title">{m.controllers.title}</span>}>
            {rich(m.controllers.body, {
              a: (c) => (
                <a href="#contact" className="text-fg underline decoration-line-strong underline-offset-4 hover:decoration-fg">
                  {c}
                </a>
              ),
            })}
          </SectionHead>
          <div className="mt-12">
            <Compat />
          </div>
          <GuideLinks />
        </section>

        <Platforms release={release} />
        <Faq appReports={appReports} appMapping={appMapping} />
        <Contact />
      </main>
      <ContactDialog version={release?.version ?? null} />
      <RequestDialog appReports={appReports} />

      <Footer version={release?.version ?? null} />
    </>
  );
}
