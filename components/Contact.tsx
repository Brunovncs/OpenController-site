import type { ReactNode } from "react";
import { ISSUES_URL, OFFICIAL_DOMAIN } from "@/lib/site";
import { ContactButton } from "./ContactDialog";
import { GitHubIcon } from "./icons";
import { SectionHead } from "./SectionHead";
import { T } from "./T";

const INCLUDE: { en: string; pt: string }[] = [
  { en: "Your system and its version, like Windows 11 or Ubuntu 24.04", pt: "Seu sistema e a versão dele, como Windows 11 ou Ubuntu 24.04" },
  { en: "The exact controller model, and if it is on a cable, Bluetooth or its receiver", pt: "O modelo exato do controle, e se ele está no cabo, no Bluetooth ou no receptor" },
  { en: "The OpenController version, shown at the top of its window", pt: "A versão do OpenController, que aparece no topo da janela" },
  { en: "What you did and what happened, with a screenshot if you can", pt: "O que você fez e o que aconteceu, com um print se puder" },
];

function Card({ title, children, foot }: { title: ReactNode; children: ReactNode; foot?: ReactNode }) {
  return (
    <article className="card reveal flex flex-col p-6 sm:p-7" data-spotlight>
      <span className="rim" aria-hidden />
      <h3 className="text-[19px] font-semibold tracking-tight">{title}</h3>
      <div className="mt-3 space-y-3 text-[14.5px] leading-relaxed text-muted">{children}</div>
      {foot ? <div className="mt-auto flex flex-wrap gap-2.5 pt-6">{foot}</div> : null}
    </article>
  );
}

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="wrap py-20 sm:py-24">
      <SectionHead
        n="06"
        label={<T en="Contact" pt="Contato" />}
        title={
          <span id="contact-title">
            <T en="Something not working? Tell us." pt="Algo não funcionou? Fale com a gente." />
          </span>
        }
      >
        <T
          en="OpenController is in beta, and every report helps fix it for everyone. Use the form or open an issue on GitHub, whichever is easier for you."
          pt="O OpenController está em beta, e cada relato ajuda a corrigir para todo mundo. Use o formulário ou abra uma issue no GitHub, o que for mais fácil para você."
        />
      </SectionHead>

      <div className="mt-12 grid gap-3 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Card
            title={<T en="Report a problem" pt="Reportar um problema" />}
            foot={
              <>
                <ContactButton className="btn btn-primary h-11 px-5 text-[14px]">
                  <T en="Contact us" pt="Fale conosco" />
                </ContactButton>
                <a className="btn btn-ghost h-11 px-5 text-[14px]" href={ISSUES_URL}>
                  <GitHubIcon />
                  <T en="Open an issue" pt="Abrir uma issue" />
                </a>
              </>
            }
          >
            <p>
              <T en="The form asks for what helps find a problem fast:" pt="O formulário pede o que ajuda a achar o problema rápido:" />
            </p>
            <ul className="space-y-2">
              {INCLUDE.map((i) => (
                <li key={i.en} className="flex gap-3">
                  <span className="mt-[9px] size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  <span>
                    <T en={i.en} pt={i.pt} />
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
        <div className="grid gap-3 lg:col-span-5">
          <Card
            title={<T en="Suggestions and questions" pt="Sugestões e dúvidas" />}
            foot={
              <ContactButton kind="idea" className="btn btn-ghost h-11 px-5 text-[14px]">
                <T en="Send a suggestion" pt="Mandar uma sugestão" />
              </ContactButton>
            }
          >
            <p>
              <T
                en="An idea for a feature, a controller you would like supported, or any question: send it through the same form."
                pt="Uma ideia de recurso, um controle que você queria ver funcionando ou qualquer dúvida: mande pelo mesmo formulário."
              />
            </p>
          </Card>
          <Card title={<T en="Official site" pt="Site oficial" />}>
            <p>
              <T
                en={
                  <>
                    <span className="text-fg">{OFFICIAL_DOMAIN}</span> is the only official OpenController website. Download it only from here or from its GitHub page; any other site offering it is not ours.
                  </>
                }
                pt={
                  <>
                    O <span className="text-fg">{OFFICIAL_DOMAIN}</span> é o único site oficial do OpenController. Baixe só por aqui ou pela página dele no GitHub; qualquer outro site que ofereça o programa não é nosso.
                  </>
                }
              />
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
