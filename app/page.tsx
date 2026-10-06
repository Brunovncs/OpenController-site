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
              en="Before you download anything, see if Open Controller knows your controller and what you can do with it. Your browser reads it live, right on this page."
              pt="Antes de baixar qualquer coisa, veja se o Open Controller conhece seu controle e o que dá para fazer com ele. O navegador lê o controle ao vivo, aqui mesmo nesta página."
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
                  Open Controller knows 602 models by name, and reads many more without one. Search for yours to see what works with it. So far it has been tested on real hardware with an 8BitDo Ultimate 2 Wireless; the rest is expected to work through SDL, the library it reads controllers with, so please{" "}
                  <a href={ISSUES_URL} className="text-fg underline decoration-line-strong underline-offset-4 hover:decoration-fg">
                    tell us how yours does
                  </a>
                  .
                </>
              }
              pt={
                <>
                  O Open Controller conhece 602 modelos pelo nome, e lê muitos outros sem nome. Procure o seu para ver o que funciona com ele. Até agora foi testado em hardware de verdade com um 8BitDo Ultimate 2 Wireless; o resto deve funcionar pelo SDL, a biblioteca que ele usa para ler os controles, então por favor{" "}
                  <a href={ISSUES_URL} className="text-fg underline decoration-line-strong underline-offset-4 hover:decoration-fg">
                    conte como foi com o seu
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
