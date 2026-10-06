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
    q: { en: "How does it work?", pt: "Como ele funciona?" },
    a: {
      en: "Most PC games are made for the Xbox controller. While Open Controller runs, each of your controllers shows up to games as an Xbox 360 controller with its own player number, and the original is hidden so the game does not see it twice. On Windows this uses two free drivers, ViGEmBus and HidHide; on Linux, the system's own uinput. Your controller itself is not changed.",
      pt: "A maioria dos jogos de PC é feita para o controle de Xbox. Enquanto o Open Controller roda, cada controle seu aparece para os jogos como um controle de Xbox 360 com o próprio número de jogador, e o original fica escondido para o jogo não ver o controle duas vezes. No Windows isso usa dois drivers gratuitos, ViGEmBus e HidHide; no Linux, o uinput do próprio sistema. O seu controle em si não é alterado.",
    },
  },
  {
    q: { en: "Does it send anything anywhere?", pt: "Ele envia algo para algum lugar?" },
    a: {
      en: "No. No account, no tracking, no update checks. The only time it goes online is when you click to install a driver on Windows: it downloads it from the driver's own GitHub page and only runs it if the file matches the one it expects.",
      pt: "Não. Sem conta, sem rastreio, sem checar atualizações. A única vez que ele acessa a internet é quando você clica para instalar um driver no Windows: ele baixa da página do próprio driver no GitHub e só executa se o arquivo for o esperado.",
    },
  },
  {
    q: { en: "How is it different from DS4Windows or Steam Input?", pt: "Qual a diferença para o DS4Windows ou o Steam Input?" },
    a: {
      en: "It does for hundreds of controllers what DS4Windows does for PlayStation ones. It does not move your normal buttons around: they stay where they are, and only the extra ones can be assigned. If you use Steam, turn off Steam Input for PlayStation and Switch controllers in Steam's settings, or Steam reads them too.",
      pt: "Ele faz por centenas de controles o que o DS4Windows faz pelos de PlayStation. Ele não troca seus botões normais de lugar: eles ficam onde estão, e só os extras podem ser atribuídos. Se você usa a Steam, desligue o Steam Input para controles de PlayStation e Switch nas configurações da Steam, senão a Steam também os lê.",
    },
  },
  {
    q: { en: "Will games show PlayStation button icons?", pt: "Os jogos vão mostrar os ícones do PlayStation?" },
    a: {
      en: "No. Games show Xbox button icons, since that is the controller they see. The DualSense's adaptive triggers, touchpad and motion are not passed on to games, though the touchpad and motion can still be used through Open Controller.",
      pt: "Não. Os jogos mostram os ícones do Xbox, já que é esse o controle que eles veem. Os gatilhos adaptáveis, o touchpad e o movimento do DualSense não são repassados aos jogos, mas o touchpad e o movimento ainda podem ser usados pelo Open Controller.",
    },
  },
  {
    q: { en: "My 8BitDo's back buttons do nothing.", pt: "Os botões traseiros do meu 8BitDo não fazem nada." },
    a: {
      en: "8BitDo controllers have two modes. In the default Xbox mode (XInput), the extra buttons send nothing any program can read. Turn an Ultimate 2 Wireless on while holding B to switch it to D-input mode, or set a Pro 2's switch to D. The app tells you which one applies to yours.",
      pt: "Os controles 8BitDo têm dois modos. No modo Xbox padrão (XInput), os botões extras não enviam nada que um programa consiga ler. Ligue um Ultimate 2 Wireless segurando B para mudar para o modo D-input, ou coloque a chave do Pro 2 em D. O app diz qual vale para o seu.",
    },
  },
  {
    q: { en: "Can more than four people play?", pt: "Dá para jogar com mais de quatro pessoas?" },
    a: {
      en: "Most PC games see at most four controllers. A fifth one still works in games that read controllers in newer ways, and the app tells you when that is the case.",
      pt: "A maioria dos jogos de PC vê no máximo quatro controles. Um quinto ainda funciona em jogos que leem controles de formas mais novas, e o app avisa quando é o caso.",
    },
  },
  {
    q: { en: "Why don't my keys and macros reach a game?", pt: "Por que minhas teclas e macros não chegam ao jogo?" },
    a: {
      en: "Windows keeps keys typed by a normal program away from programs running as administrator, and games with anti-cheat may ignore typed keys.",
      pt: "O Windows não deixa teclas digitadas por um programa comum chegarem a programas rodando como administrador, e jogos com anti-cheat podem ignorar teclas digitadas.",
    },
  },
  {
    q: { en: "Is it finished?", pt: "Está pronto?" },
    a: {
      en: (
        <>
          Not yet, it is in development. It is tested end to end with a simulated controller, and on real hardware with an 8BitDo Ultimate 2 Wireless on Windows so far. The other controllers listed should work because the library it uses supports them, but they have not been tried with Open Controller yet, and neither have the Linux and Mac versions. Treat it as a beta, and please <A href={ISSUES_URL}>tell us what you plug in</A>.
        </>
      ),
      pt: (
        <>
          Ainda não, está em desenvolvimento. Ele é testado de ponta a ponta com um controle simulado, e em hardware de verdade com um 8BitDo Ultimate 2 Wireless no Windows, por enquanto. Os outros controles listados devem funcionar porque a biblioteca que ele usa dá suporte a eles, mas ainda não foram testados com o Open Controller, nem as versões para Linux e Mac. Trate como beta, e por favor <A href={ISSUES_URL}>conte o que você conectou</A>.
        </>
      ),
    },
  },
];

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="wrap py-20 sm:py-24">
      <SectionHead n="05" label={<T en="Questions" pt="Dúvidas" />} title={<span id="faq-title"><T en="Common questions." pt="Perguntas frequentes." /></span>} />
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
