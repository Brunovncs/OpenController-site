import Image from "next/image";
import type { ReactNode } from "react";
import { SectionHead } from "./SectionHead";
import { SwapDemo } from "./SwapDemo";
import { T } from "./T";

function Card({ className = "", title, children, visual }: { className?: string; title: ReactNode; children: ReactNode; visual?: ReactNode }) {
  return (
    <article className={`card reveal flex flex-col ${className}`} data-spotlight>
      <span className="rim" aria-hidden />
      <div className="p-6 sm:p-7">
        <h3 className="text-[19px] font-semibold tracking-tight">{title}</h3>
        <div className="mt-2.5 max-w-[38rem] text-pretty text-[14.5px] leading-relaxed text-muted">{children}</div>
      </div>
      {visual ? <div className="mt-auto">{visual}</div> : null}
    </article>
  );
}

function Key({ children }: { children: ReactNode }) {
  return <kbd className="kbd !h-6 !text-[11.5px] !text-fg">{children}</kbd>;
}

function Assignments() {
  const rows: [string, ReactNode, ReactNode][] = [
    ["R4", <T key="a" en="Back, right" pt="Traseiro, direito" />, <span key="b" className="flex items-center gap-1.5 text-muted">Xbox <Key>A</Key></span>],
    ["PR", <T key="a" en="Back, right 2" pt="Traseiro, direito 2" />, <span key="b" className="flex gap-1"><Key>Ctrl</Key><Key>Shift</Key><Key>M</Key></span>],
    ["L4", <T key="a" en="Back, left" pt="Traseiro, esquerdo" />, <span key="b" className="text-muted"><T en="Macro, 2 steps" pt="Macro, 2 passos" /></span>],
  ];
  return (
    <ul className="space-y-2">
      {rows.map(([name, where, what]) => (
        <li key={name} className="flex items-center gap-3 rounded-xl border border-line bg-panel-2 px-3 py-2.5">
          <span className="grid h-7 w-10 place-items-center rounded-md bg-accent/90 font-mono text-[12px] font-semibold text-accent-ink">{name}</span>
          <span className="hidden text-[13px] text-muted min-[400px]:inline">{where}</span>
          <span className="ml-auto text-[13px]">{what}</span>
        </li>
      ))}
    </ul>
  );
}

function GyroVisual() {
  return (
    <div className="flex items-center gap-6 px-6 pb-7 sm:px-7">
      <svg viewBox="0 0 120 120" className="size-28 shrink-0" aria-hidden>
        <circle cx="60" cy="60" r="52" fill="#07080a" stroke="rgba(255,255,255,0.12)" />
        <circle cx="60" cy="60" r="34" fill="none" stroke="rgba(255,255,255,0.06)" />
        <path d="M60 8v104M8 60h104" stroke="rgba(255,255,255,0.05)" />
        <g className="gyro-dot">
          <circle cx="60" cy="60" r="15" fill="#1a1d22" stroke="#60cdff" strokeWidth="1.5" />
        </g>
      </svg>
      <ul className="space-y-1.5 font-mono text-[12px] text-muted">
        <li className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-accent" />
          <T en="Always" pt="Sempre" />
        </li>
        <li className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-line-strong" />
          <T en="While LT is pulled" pt="Com LT puxado" />
        </li>
        <li className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-line-strong" />
          <T en="While a button is held" pt="Com um botão segurado" />
        </li>
      </ul>
    </div>
  );
}

function LightVisual() {
  const items = [
    { k: { en: "Player", pt: "Jogador" }, bar: "#3d7bff" },
    { k: { en: "Your colour", pt: "Sua cor" }, bar: "#b18cff" },
    { k: { en: "Battery", pt: "Bateria" }, bar: "#3ddc84" },
    { k: { en: "Below 15 %", pt: "Abaixo de 15 %" }, bar: "#ff4d5e", blink: true },
  ];
  return (
    <ul className="grid grid-cols-2 gap-2 px-6 pb-7 sm:grid-cols-4 sm:px-7">
      {items.map((it) => (
        <li key={it.k.en} className="rounded-xl border border-line bg-panel-2 p-3">
          <span
            aria-hidden
            className={`block h-1.5 w-full rounded-full ${it.blink ? "blink" : ""}`}
            style={{ backgroundColor: it.bar, boxShadow: `0 0 14px ${it.bar}` }}
          />
          <span className="mt-3 block text-[12.5px] text-muted">
            <T en={it.k.en} pt={it.k.pt} />
          </span>
        </li>
      ))}
    </ul>
  );
}

function ProfilesVisual() {
  const rows = [
    { name: { en: "Default", pt: "Padrão" }, prog: null, on: false },
    { name: { en: "Shooter", pt: "Tiro" }, prog: "shooter.exe", on: true },
    { name: { en: "Desktop", pt: "Área de trabalho" }, prog: "explorer.exe", on: false },
  ];
  return (
    <ul className="space-y-2 px-6 pb-7 sm:px-7">
      {rows.map((r) => (
        <li
          key={r.name.en}
          className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 text-[13px] ${r.on ? "border-accent/50 bg-accent/[0.07]" : "border-line bg-panel-2"}`}
        >
          <span className={`size-1.5 rounded-full ${r.on ? "bg-accent" : "bg-line-strong"}`} aria-hidden />
          <span className="text-fg">
            <T en={r.name.en} pt={r.name.pt} />
          </span>
          {r.prog ? <span className="ml-auto font-mono text-[11.5px] text-faint">{r.prog}</span> : null}
          {r.on ? (
            <span className="font-mono text-[11px] text-accent">
              <T en="in front" pt="em foco" />
            </span>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

function SticksVisual() {
  return (
    <div className="flex items-center gap-6 px-6 pb-7 sm:px-7">
      <svg viewBox="0 0 120 120" className="size-28 shrink-0" aria-hidden>
        <circle cx="60" cy="60" r="52" fill="#07080a" stroke="rgba(255,255,255,0.12)" />
        <circle cx="60" cy="60" r="14" fill="rgba(96,205,255,0.08)" stroke="rgba(96,205,255,0.6)" strokeDasharray="3 3" />
        <circle cx="60" cy="60" r="20" fill="none" stroke="rgba(255,255,255,0.12)" />
        <circle cx="66" cy="57" r="2.5" fill="#60cdff" />
      </svg>
      <dl className="space-y-2 text-[12.5px]">
        <div>
          <dt className="font-mono text-[11px] text-faint">
            <T en="Deadzone" pt="Zona morta" />
          </dt>
          <dd className="text-muted">
            <T en="Radial, so diagonals are not cut short" pt="Radial, sem cortar as diagonais" />
          </dd>
        </div>
        <div>
          <dt className="font-mono text-[11px] text-faint">
            <T en="Anti-deadzone" pt="Antizona morta" />
          </dt>
          <dd className="text-muted">
            <T en="Games react to the first movement" pt="O jogo reage ao primeiro movimento" />
          </dd>
        </div>
      </dl>
    </div>
  );
}

const MEASURES = [
  {
    k: { en: "Controller to what a game reads", pt: "Do controle ao que o jogo lê" },
    v: { en: "median 0.55 to 0.62 ms, p99 1.2 to 1.6 ms", pt: "mediana de 0,55 a 0,62 ms, p99 de 1,2 a 1,6 ms" },
  },
  {
    k: { en: "Poll loop", pt: "Ciclo de leitura" },
    v: { en: "1000 per second, median period 1.006 ms", pt: "1000 por segundo, período mediano de 1,006 ms" },
  },
  {
    k: { en: "Resident process", pt: "Processo residente" },
    v: { en: "3.2 MB private memory, 0.00 % CPU with nothing connected", pt: "3,2 MB de memória privada, 0,00 % de CPU sem nada conectado" },
  },
  {
    k: { en: "The window", pt: "A janela" },
    v: { en: "A separate program, nothing once closed", pt: "Um programa separado, nada depois de fechada" },
  },
];

export function Features() {
  return (
    <section id="features" aria-labelledby="features-title" className="wrap py-20 sm:py-24">
      <SectionHead
        n="02"
        label={<T en="What it does" pt="O que ele faz" />}
        title={
          <span id="features-title">
            <T en="One Xbox controller per player. The rest is yours." pt="Um controle de Xbox por jogador. O resto é seu." />
          </span>
        }
      >
        <T
          en="Buttons follow their position, so the bottom face button is A whether it says Cross, B or A. Sticks, triggers and rumble pass through untouched. Xbox controllers are left alone, since games already read them."
          pt="Os botões seguem a posição, então o botão de baixo é A esteja escrito Cross, B ou A. Analógicos, gatilhos e vibração passam intactos. Controles de Xbox ficam como estão, já que os jogos os leem."
        />
      </SectionHead>

      <div className="mt-14 grid gap-3 lg:grid-cols-6">
        <Card
          className="lg:col-span-4"
          title={<T en="Extra buttons that do something" pt="Botões extras que fazem algo" />}
          visual={
            <div className="grid gap-5 px-6 pb-7 sm:px-7 md:grid-cols-[1fr_1.15fr] md:items-end">
              <Assignments />
              <div className="overflow-hidden rounded-xl border border-line">
                <Image
                  src="/controller.png"
                  alt="A controller's page in Open Controller: the 8BitDo drawn with its live input and its four extra buttons, one assigned to Xbox A, one to Ctrl+Shift+M and one to a macro."
                  width={1468}
                  height={1047}
                  sizes="(min-width: 1024px) 30vw, 90vw"
                  className="h-auto w-full"
                />
              </div>
            </div>
          }
        >
          <T
            en="Back paddles, L4 and R4, Capture, the mic button and the touchpad's halves never reach games through an Xbox controller. So each one can press an Xbox button, hold a key or shortcut, or type a macro recorded with the gaps you left. Press it on the controller to pick it in the window."
            pt="Paletas traseiras, L4 e R4, Capture, o botão do microfone e as metades do touchpad nunca chegam aos jogos por um controle de Xbox. Então cada um pode apertar um botão do Xbox, segurar uma tecla ou atalho, ou digitar uma macro gravada com as pausas que você fez. Aperte no controle para escolher na janela."
          />
        </Card>

        <Card
          className="lg:col-span-2"
          title={<T en="Players that stay put" pt="Jogadores que não mudam" />}
          visual={
            <div className="px-6 pb-7 sm:px-7">
              <SwapDemo />
              <p className="mt-3 font-mono text-[11px] text-faint">
                <T en="Drag one onto another, or pick two." pt="Arraste um sobre outro, ou escolha dois." />
              </p>
            </div>
          }
        >
          <T
            en="A slot belongs to the controller, not the cable. Plug a cable into a DualSense on Bluetooth and the game does not notice; a controller that drops keeps its slot for 15 seconds."
            pt="O slot pertence ao controle, não ao cabo. Ligue um cabo num DualSense no Bluetooth e o jogo nem percebe; um controle que cai mantém o slot por 15 segundos."
          />
        </Card>

        <Card className="lg:col-span-2" title={<T en="Aim by turning it" pt="Mire girando o controle" />} visual={<GyroVisual />}>
          <T
            en="On a controller with a gyro, its rotation is added to the right stick. Each friend aims with their own controller, which a gyro mapped to the mouse would not allow."
            pt="Num controle com giroscópio, a rotação é somada ao analógico direito. Cada amigo mira com o próprio controle, o que um giroscópio ligado ao mouse não permitiria."
          />
        </Card>

        <Card className="lg:col-span-4" title={<T en="The light bar says something useful" pt="A barra de luz diz algo útil" />} visual={<LightVisual />}>
          <T
            en="On a DualShock 4 or DualSense: the player's colour as a PlayStation shows it, a colour you pick, the battery from green to red, or nothing, in four steps of brightness. Below 15 % on battery it blinks once a second."
            pt="Num DualShock 4 ou DualSense: a cor do jogador como o PlayStation mostra, uma cor que você escolhe, a bateria do verde ao vermelho, ou nada, em quatro níveis de brilho. Abaixo de 15 % de bateria ela pisca uma vez por segundo."
          />
        </Card>

        <Card className="lg:col-span-3" title={<T en="Profiles that follow the game" pt="Perfis que seguem o jogo" />} visual={<ProfilesVisual />}>
          <T
            en="Up to eight per controller, each with its own buttons, light, gyro and sticks. A profile can name programs and takes over while one of them is in front. Players never change behind your back."
            pt="Até oito por controle, cada um com seus botões, luz, giroscópio e analógicos. Um perfil pode citar programas e assume enquanto um deles está em primeiro plano. Os jogadores nunca mudam sem você saber."
          />
        </Card>

        <Card className="lg:col-span-3" title={<T en="Sticks, untouched unless asked" pt="Analógicos intactos, a menos que você peça" />} visual={<SticksVisual />}>
          <T
            en="Sticks pass through with no deadzone, as a real Xbox controller's do; the game applies its own. A worn stick that drifts can get one here."
            pt="Os analógicos passam sem zona morta, como num controle de Xbox de verdade; o jogo aplica a dele. Um analógico gasto que deriva pode ganhar uma aqui."
          />
        </Card>
      </div>

      <div className="reveal mt-16 grid gap-x-10 gap-y-6 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <h3 className="text-[19px] font-semibold tracking-tight">
            <T en="Quiet in the background" pt="Discreto em segundo plano" />
          </h3>
          <p className="mt-2 text-[14px] leading-relaxed text-muted">
            <T
              en="Measured on Windows 11 with ViGEmBus 1.22.0. The method for each number is in the README."
              pt="Medido no Windows 11 com ViGEmBus 1.22.0. O método de cada número está no README."
            />
          </p>
        </div>
        <dl className="grid border-t border-line sm:grid-cols-2 lg:col-span-9">
          {MEASURES.map((m) => (
            <div key={m.k.en} className="border-b border-line py-4 sm:odd:pr-6 sm:even:border-l sm:even:pl-6">
              <dt className="text-[13px] text-faint">
                <T en={m.k.en} pt={m.k.pt} />
              </dt>
              <dd className="mt-1 font-mono text-[13.5px] text-fg">
                <T en={m.v.en} pt={m.v.pt} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
