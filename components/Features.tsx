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
        <div className="mt-2.5 max-w-[38rem] text-pretty text-[15px] leading-relaxed text-muted">{children}</div>
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
    [
      "R4",
      <T key="a" en="Back, right" pt="Traseiro, direito" />,
      <span key="b" className="flex items-center gap-1.5 text-muted">
        <T en="Button" pt="Botão" /> <Key>A</Key>
      </span>,
    ],
    [
      "PR",
      <T key="a" en="Back, right 2" pt="Traseiro, direito 2" />,
      <span key="b" className="flex gap-1">
        <Key>Ctrl</Key>
        <Key>Shift</Key>
        <Key>M</Key>
      </span>,
    ],
    [
      "L4",
      <T key="a" en="Back, left" pt="Traseiro, esquerdo" />,
      <span key="b" className="text-muted">
        <T en="Macro, 2 steps" pt="Macro, 2 passos" />
      </span>,
    ],
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
      <ul className="space-y-1.5 text-[13px] text-muted">
        <li className="flex items-center gap-2">
          <span className="size-1.5 shrink-0 rounded-full bg-accent" />
          <T en="Always" pt="Sempre" />
        </li>
        <li className="flex items-center gap-2">
          <span className="size-1.5 shrink-0 rounded-full bg-line-strong" />
          <T en="Only while aiming" pt="Só enquanto mira" />
        </li>
        <li className="flex items-center gap-2">
          <span className="size-1.5 shrink-0 rounded-full bg-line-strong" />
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
    { k: { en: "Low battery", pt: "Bateria fraca" }, bar: "#ff4d5e", blink: true },
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
            <span className="text-[11.5px] text-accent">
              <T en="in use" pt="em uso" />
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
      <dl className="space-y-2 text-[13px]">
        <div>
          <dt className="text-[12px] text-faint">
            <T en="Dead zone" pt="Zona morta" />
          </dt>
          <dd className="text-muted">
            <T en="Ignores the small movements of a worn stick" pt="Ignora os movimentos pequenos de um analógico gasto" />
          </dd>
        </div>
        <div>
          <dt className="text-[12px] text-faint">
            <T en="Anti dead zone" pt="Antizona morta" />
          </dt>
          <dd className="text-muted">
            <T en="The game reacts as soon as you move" pt="O jogo reage assim que você mexe" />
          </dd>
        </div>
      </dl>
    </div>
  );
}

const MEASURES = [
  {
    k: { en: "Delay it adds", pt: "Atraso que ele acrescenta" },
    v: { en: "About 0.6 milliseconds", pt: "Cerca de 0,6 milissegundo" },
  },
  {
    k: { en: "Memory in the background", pt: "Memória em segundo plano" },
    v: { en: "3.2 MB", pt: "3,2 MB" },
  },
  {
    k: { en: "Processor, with no controller connected", pt: "Processador, sem controle conectado" },
    v: { en: "0 %", pt: "0 %" },
  },
  {
    k: { en: "The app window", pt: "A janela do app" },
    v: { en: "Uses nothing once you close it", pt: "Não usa nada depois de fechada" },
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
            <T en="Plug it in and play." pt="Conecte e jogue." />
          </span>
        }
      >
        <T
          en="Open Controller runs quietly in the background. Connect a controller and it works in your games, with every button where you expect it, the sticks and triggers as they are, and vibration. There are no buttons to set up first. Xbox controllers already work in games, so it leaves those alone."
          pt="O Open Controller fica quieto em segundo plano. Conecte um controle e ele funciona nos seus jogos, com cada botão onde você espera, os analógicos e gatilhos como são, e vibração. Não há botões para configurar antes. Controles de Xbox já funcionam nos jogos, então ele não mexe neles."
        />
      </SectionHead>

      <div className="mt-14 grid gap-3 lg:grid-cols-6">
        <Card
          className="lg:col-span-4"
          title={<T en="Support for extra buttons" pt="Suporte a botões extras" />}
          visual={
            <div className="grid gap-5 px-6 pb-7 sm:px-7 md:grid-cols-[1fr_1.15fr] md:items-end">
              <Assignments />
              <div className="overflow-hidden rounded-xl border border-line">
                <Image
                  src="/controller.png"
                  alt="A controller's page in Open Controller: the 8BitDo drawn with its live input and its four extra buttons, one set to button A, one to Ctrl+Shift+M and one to a macro."
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
            en="Back paddles, L4 and R4, the Capture and mic buttons and the touchpad usually do nothing in PC games. Here each one can work as another button, hold a key or shortcut, or type a macro. To pick one in the app, just press it on the controller."
            pt="Paletas traseiras, L4 e R4, os botões Capture e de microfone e o touchpad normalmente não fazem nada nos jogos de PC. Aqui cada um pode funcionar como outro botão, segurar uma tecla ou atalho, ou digitar uma macro. Para escolher um no app, é só apertar no controle."
          />
        </Card>

        <Card
          className="lg:col-span-2"
          title={<T en="Several players at once" pt="Vários jogadores ao mesmo tempo" />}
          visual={
            <div className="px-6 pb-7 sm:px-7">
              <SwapDemo />
              <p className="mt-3 text-[12.5px] text-faint">
                <T en="Try it: drag one onto another, or tap two." pt="Experimente: arraste um sobre o outro, ou toque em dois." />
              </p>
            </div>
          }
        >
          <T
            en="Each friend's controller is its own player. If one disconnects for a moment, or you switch it from Bluetooth to a cable, it comes back as the same player. Drag one onto another to change who is player 1."
            pt="O controle de cada amigo é um jogador. Se um desconectar por um instante, ou você trocar do Bluetooth para o cabo, ele volta como o mesmo jogador. Arraste um sobre o outro para mudar quem é o jogador 1."
          />
        </Card>

        <Card className="lg:col-span-2" title={<T en="Aim by moving the controller" pt="Mire movendo o controle" />} visual={<GyroVisual />}>
          <T
            en="On controllers with motion sensors, like the DualSense, DualShock 4 and Switch Pro, turning the controller moves your aim. Each friend aims with their own."
            pt="Em controles com sensor de movimento, como DualSense, DualShock 4 e Switch Pro, girar o controle move a mira. Cada amigo mira com o seu."
          />
        </Card>

        <Card className="lg:col-span-4" title={<T en="A light bar that tells you something" pt="Uma barra de luz que informa algo" />} visual={<LightVisual />}>
          <T
            en="On a DualShock 4 or DualSense, the light can show your player's colour, a colour you pick, or how much battery is left, at the brightness you choose. When the battery runs low, it blinks."
            pt="Num DualShock 4 ou DualSense, a luz pode mostrar a cor do seu jogador, uma cor que você escolhe ou quanto resta de bateria, no brilho que você quiser. Quando a bateria fica fraca, ela pisca."
          />
        </Card>

        <Card className="lg:col-span-3" title={<T en="Profiles for each game" pt="Perfis para cada jogo" />} visual={<ProfilesVisual />}>
          <T
            en="Keep a different setup for each game, up to eight per controller. A profile can switch on by itself while its game is open, and off again when you leave it."
            pt="Tenha uma configuração para cada jogo, até oito por controle. Um perfil pode entrar sozinho enquanto o jogo dele está aberto, e sair quando você sai do jogo."
          />
        </Card>

        <Card className="lg:col-span-3" title={<T en="A fix for drifting sticks" pt="Um jeito de corrigir drift" />} visual={<SticksVisual />}>
          <T
            en="Sticks reach the game exactly as you move them, and the game handles the rest. If an old stick moves on its own, you can give it a dead zone."
            pt="Os analógicos chegam ao jogo exatamente como você mexe, e o jogo cuida do resto. Se um analógico velho anda sozinho, dá para colocar uma zona morta nele."
          />
        </Card>
      </div>

      <div className="reveal mt-16 grid gap-x-10 gap-y-6 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <h3 className="text-[19px] font-semibold tracking-tight">
            <T en="Light in the background" pt="Leve em segundo plano" />
          </h3>
          <p className="mt-2 text-[14px] leading-relaxed text-muted">
            <T en="Measured on Windows 11. How each number was measured is in the README." pt="Medido no Windows 11. Como cada número foi medido está no README." />
          </p>
        </div>
        <dl className="grid border-t border-line sm:grid-cols-2 lg:col-span-9">
          {MEASURES.map((m) => (
            <div key={m.k.en} className="border-b border-line py-4 sm:odd:pr-6 sm:even:border-l sm:even:pl-6">
              <dt className="text-[13px] text-faint">
                <T en={m.k.en} pt={m.k.pt} />
              </dt>
              <dd className="mt-1 text-[15px] text-fg">
                <T en={m.v.en} pt={m.v.pt} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
