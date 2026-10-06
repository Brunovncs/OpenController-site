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
            label={<T en="Check your controller" pt="Teste seu controle" />}
            title={
              <span id="check-title">
                <T en="Plug it in and press a button." pt="Conecte e aperte um botão." />
              </span>
            }
          >
            <T
              en="Your browser can see controllers too. This page reads the one you press, looks it up in the app's own table and tells you what Open Controller will do with it."
              pt="O navegador também enxerga controles. Esta página lê o que você apertar, procura na própria tabela do app e diz o que o Open Controller vai fazer com ele."
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
                <T en="602 known models, and what each can do." pt="602 modelos conhecidos, e o que cada um faz." />
              </span>
            }
          >
            <T
              en={
                <>
                  Controllers are read through SDL 3, which speaks each one&apos;s own protocol. The table names them, draws them and knows their extra buttons. On hardware it has been tested with an 8BitDo Ultimate 2 Wireless so far; the rest is SDL&apos;s support, so{" "}
                  <a href={ISSUES_URL} className="text-fg underline decoration-line-strong underline-offset-4 hover:decoration-fg">
                    report how yours does
                  </a>
                  .
                </>
              }
              pt={
                <>
                  Os controles são lidos pelo SDL 3, que fala o protocolo de cada um. A tabela dá nome, desenho e sabe os botões extras de cada um. No hardware, até agora foi testado com um 8BitDo Ultimate 2 Wireless; o resto é suporte do SDL, então{" "}
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
