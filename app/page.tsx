import { Compat } from "@/components/Compat";
import { ControllerCheck } from "@/components/ControllerCheck";
import { Faq } from "@/components/Faq";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Header, NAV } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { PlatformRefine } from "@/components/PlatformRefine";
import { Platforms } from "@/components/Platforms";
import { RailToc } from "@/components/RailToc";
import { SectionHead } from "@/components/SectionHead";
import { Spotlight } from "@/components/Spotlight";
import { T } from "@/components/T";
import { getLatestRelease, getStars } from "@/lib/github";
import { ISSUES_URL } from "@/lib/site";

export const revalidate = 3600;

export default async function Page() {
  const [release, stars] = await Promise.all([getLatestRelease(), getStars()]);

  return (
    <>
      <a href="#main" className="skip">
        <T en="Skip to content" pt="Pular para o conteúdo" />
      </a>
      <Header stars={stars} version={release?.version ?? null} />
      <RailToc items={NAV} />
      <Spotlight />
      <PlatformRefine />

      <main id="main">
        <Hero release={release} />

        <section id="check" aria-labelledby="check-title" className="wrap pt-24 sm:pt-32">
          <SectionHead
            n="01"
            label={<T en="Test your controller" pt="Teste seu controle" />}
            title={
              <span id="check-title">
                <T en="Test your controller here." pt="Teste seu controle aqui." />
              </span>
            }
          >
            <T
              en="Before you download anything, see if Open Controller knows your controller. Connect it and press a button. It all happens right here in your browser."
              pt="Antes de baixar, veja se o Open Controller reconhece seu controle. Conecte e aperte um botão. Tudo acontece aqui mesmo, no navegador."
            />
          </SectionHead>
          <div className="mt-12">
            <ControllerCheck />
          </div>
        </section>

        <Features />

        <section id="controllers" aria-labelledby="controllers-title" className="wrap py-20 sm:py-24">
          <SectionHead
            n="03"
            label={<T en="Controllers" pt="Controles" />}
            title={
              <span id="controllers-title">
                <T en="Find your controller." pt="Procure seu controle." />
              </span>
            }
          >
            <T
              en={
                <>
                  Search for yours to see what works with it. Most controllers work even if they are not on the list. So far it has only been tried with an 8BitDo Ultimate 2 Wireless, so please{" "}
                  <a href={ISSUES_URL} className="text-fg underline decoration-line-strong underline-offset-4 hover:decoration-fg">
                    tell us how yours does
                  </a>
                  .
                </>
              }
              pt={
                <>
                  Procure o seu para ver o que funciona com ele. A maioria dos controles funciona mesmo sem estar na lista. Até agora ele só foi testado com um 8BitDo Ultimate 2 Wireless, então{" "}
                  <a href={ISSUES_URL} className="text-fg underline decoration-line-strong underline-offset-4 hover:decoration-fg">
                    conte para a gente como foi com o seu
                  </a>
                  .
                </>
              }
            />
          </SectionHead>
          <div className="mt-12">
            <Compat />
          </div>
        </section>

        <Platforms release={release} />
        <Faq />
      </main>

      <Footer version={release?.version ?? null} />
    </>
  );
}
