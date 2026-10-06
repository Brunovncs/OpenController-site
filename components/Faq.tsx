import type { ReactNode } from "react";
import { ISSUES_URL } from "@/lib/site";
import { PlusIcon } from "./icons";
import { SectionHead } from "./SectionHead";
import { T } from "./T";

const A = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} className="text-fg underline decoration-line-strong underline-offset-4 hover:decoration-fg">
    {children}
  </a>
);

const QA: { q: { en: string; pt: string }; a: { en: ReactNode; pt: ReactNode } }[] = [
  {
    q: { en: "Is it free?", pt: "É gratuito?" },
    a: {
      en: "Yes. It is open source under the MIT license, and the drivers it uses on Windows are free too.",
      pt: "Sim. É código aberto sob a licença MIT, e os drivers que ele usa no Windows também são gratuitos.",
    },
  },
  {
    q: { en: "Does it send anything anywhere?", pt: "Ele envia algo para algum lugar?" },
    a: {
      en: "No. It checks for no updates and keeps the name of the program in front to itself. The only connection it makes is the one you start on Windows to download a driver from its GitHub release, which runs only if its SHA-256 matches the one recorded in that version.",
      pt: "Não. Ele não procura atualizações e guarda para si o nome do programa em foco. A única conexão que faz é a que você inicia no Windows para baixar um driver da página de versões dele no GitHub, que só roda se o SHA-256 bater com o registrado naquela versão.",
    },
  },
  {
    q: { en: "How is it different from DS4Windows or Steam Input?", pt: "Qual a diferença para o DS4Windows ou o Steam Input?" },
    a: {
      en: "It does what DS4Windows does for PlayStation controllers, for the several hundred controllers SDL knows. It is not a mapper: the standard buttons stay where they are, and only the buttons an Xbox controller lacks can be assigned. If Steam Input is on for PlayStation or Switch controllers, turn it off for those in Steam's settings, or Steam reads them too.",
      pt: "Ele faz o que o DS4Windows faz pelos controles de PlayStation, para as centenas de controles que o SDL conhece. Não é um remapeador: os botões padrão ficam onde estão, e só os botões que o controle de Xbox não tem podem ser atribuídos. Se o Steam Input estiver ligado para controles de PlayStation ou Switch, desligue para eles nas configurações da Steam, senão a Steam também os lê.",
    },
  },
  {
    q: { en: "Will games show PlayStation button prompts?", pt: "Os jogos vão mostrar os ícones do PlayStation?" },
    a: {
      en: "No. Everything becomes an Xbox 360 controller, so games show Xbox prompts, and the DualSense's adaptive triggers, touchpad and motion are not passed on to them.",
      pt: "Não. Tudo vira um controle de Xbox 360, então os jogos mostram os ícones do Xbox, e os gatilhos adaptáveis, o touchpad e o movimento do DualSense não são repassados a eles.",
    },
  },
  {
    q: { en: "My 8BitDo's back buttons do nothing.", pt: "Os botões traseiros do meu 8BitDo não fazem nada." },
    a: {
      en: "In XInput mode a pad's extra buttons send nothing any program can read. Turn an Ultimate 2 Wireless on while holding B for D-input mode, and set a Pro 2's switch to D. The window says which applies to yours.",
      pt: "No modo XInput os botões extras não enviam nada que um programa consiga ler. Ligue um Ultimate 2 Wireless segurando B para o modo D-input, e coloque a chave do Pro 2 em D. A janela diz qual vale para o seu.",
    },
  },
  {
    q: { en: "Can more than four people play?", pt: "Dá para jogar com mais de quatro pessoas?" },
    a: {
      en: "XInput games see at most four controllers. A fifth one gets a virtual controller that only DirectInput, Windows.Gaming.Input and GameInput games see, and the window says so.",
      pt: "Jogos XInput veem no máximo quatro controles. Um quinto ganha um controle virtual que só jogos DirectInput, Windows.Gaming.Input e GameInput veem, e a janela avisa.",
    },
  },
  {
    q: { en: "Why don't my keys and macros reach a game?", pt: "Por que minhas teclas e macros não chegam ao jogo?" },
    a: {
      en: "Windows keeps a normal program's input out of programs running as administrator, and games with anti-cheat may ignore typed keys.",
      pt: "O Windows não deixa a entrada de um programa comum chegar a programas rodando como administrador, e jogos com anti-cheat podem ignorar teclas digitadas.",
    },
  },
  {
    q: { en: "Is it finished?", pt: "Está pronto?" },
    a: {
      en: (
        <>
          It is in development. The engine is tested end to end with a simulated controller, and on hardware with an 8BitDo Ultimate 2 Wireless. Every other controller listed is SDL&apos;s support, not yet a test of Open Controller with it. Treat it as a beta, and please <A href={ISSUES_URL}>report what you plug in</A>.
        </>
      ),
      pt: (
        <>
          Está em desenvolvimento. O motor é testado de ponta a ponta com um controle simulado, e no hardware com um 8BitDo Ultimate 2 Wireless. Todos os outros controles listados são suporte do SDL, ainda não um teste do Open Controller com eles. Trate como beta, e por favor <A href={ISSUES_URL}>conte o que você conectou</A>.
        </>
      ),
    },
  },
];

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="wrap py-20 sm:py-24">
      <SectionHead n="05" label={<T en="Questions" pt="Dúvidas" />} title={<span id="faq-title"><T en="Questions people ask." pt="Perguntas que fazem." /></span>} />
      <div className="faq mt-12 grid gap-x-10 lg:grid-cols-12">
        <p className="mb-8 text-[14px] leading-relaxed text-muted lg:col-span-3 lg:mb-0 lg:pt-5">
          <T
            en={<>Something else, or a controller that misbehaves? <A href={ISSUES_URL}>Open an issue on GitHub</A>.</>}
            pt={<>Outra dúvida, ou um controle que não se comporta? <A href={ISSUES_URL}>Abra uma issue no GitHub</A>.</>}
          />
        </p>
        <div className="border-t border-line lg:col-span-9">
          {QA.map((item) => (
            <details key={item.q.en} className="group border-b border-line">
              <summary className="flex items-center justify-between gap-6 py-5 text-[16.5px] text-fg transition-colors hover:text-white">
                <T en={item.q.en} pt={item.q.pt} />
                <PlusIcon className="chev shrink-0 text-faint group-hover:text-fg" width={18} height={18} />
              </summary>
              <div className="max-w-[46rem] pb-6 text-[15px] leading-relaxed text-muted">
                <T en={item.a.en} pt={item.a.pt} />
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
