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

function StepsVisual() {
  const steps = [
    { en: "Connect your controller", pt: "Conecte o controle" },
    { en: "Open a game", pt: "Abra o jogo" },
    { en: "Play", pt: "Jogue" },
  ];
  return (
    <ol className="space-y-2 px-6 pb-7 sm:px-7">
      {steps.map((s, i) => (
        <li
          key={s.en}
          className={`flex items-center gap-3 rounded-xl border px-3 py-2 text-[13px] ${i === steps.length - 1 ? "border-accent/50 bg-accent/[0.07]" : "border-line bg-panel-2"}`}
        >
          <span className="grid size-6 shrink-0 place-items-center rounded-md bg-white/[0.06] font-mono text-[11.5px] text-muted">{i + 1}</span>
          <span className="text-fg">
            <T en={s.en} pt={s.pt} />
          </span>
        </li>
      ))}
    </ol>
  );
}

function SetupsVisual() {
  const rows = [
    { name: { en: "Default", pt: "Padrão" }, on: false },
    { name: { en: "Racing game", pt: "Jogo de corrida" }, on: true },
    { name: { en: "Shooter", pt: "Jogo de tiro" }, on: false },
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
          {r.on ? (
            <span className="ml-auto text-[11.5px] text-accent">
              <T en="in use" pt="em uso" />
            </span>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

function UpdateVisual() {
  return (
    <div className="px-6 pb-7 sm:px-7">
      <div className="flex items-center gap-3 rounded-xl border border-line bg-panel-2 px-3 py-2.5 text-[13px]">
        <span className="size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
        <span className="text-fg">
          <T en="A new version is out." pt="Saiu uma versão nova." />
        </span>
        <span className="ml-auto shrink-0 rounded-md bg-accent/90 px-2.5 py-1 text-[12px] font-medium text-accent-ink">
          <T en="Update now" pt="Atualizar agora" />
        </span>
      </div>
    </div>
  );
}

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
          en="Most PC games are made for the Xbox controller. OpenController makes yours work in them too, with nothing to set up."
          pt="A maioria dos jogos de PC foi feita pensando no controle de Xbox. O OpenController faz o seu funcionar neles também, sem precisar configurar nada."
        />
      </SectionHead>

      <div className="mt-14 grid gap-3 lg:grid-cols-6">
        <Card className="lg:col-span-3" title={<T en="Works in your games" pt="Funciona nos seus jogos" />} visual={<StepsVisual />}>
          <T
            en="Connect your controller and open a game. Buttons, sticks, triggers and vibration work the way you expect. Xbox controllers already work in games, so it leaves those alone."
            pt="Conecte o controle e abra o jogo. Botões, analógicos, gatilhos e vibração funcionam do jeito que você espera. Controle de Xbox já funciona nos jogos, então ele nem mexe nesses."
          />
        </Card>

        <Card
          className="lg:col-span-3"
          title={<T en="Play with friends" pt="Jogue com os amigos" />}
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
            en="Each controller is its own player. If one disconnects for a moment, it comes back as the same player. To change who is player 1, drag one onto another."
            pt="Cada controle é um jogador. Se um desconectar por um instante, ele volta como o mesmo jogador. Para mudar quem é o jogador 1, é só arrastar um sobre o outro."
          />
        </Card>

        <Card className="lg:col-span-3" title={<T en="Your way" pt="Do seu jeito" />} visual={<SetupsVisual />}>
          <T
            en="If you want, give your controller's extra buttons something to do, aim with the gyro, and save a setup for each game that switches on by itself when the game opens. It's all optional: your controller works without any of it."
            pt="Se quiser, dê uma função aos botões extras, mire com o giroscópio e salve uma configuração para cada jogo, que entra sozinha quando o jogo abre. É tudo opcional: o controle já funciona sem mexer em nada."
          />
        </Card>

        <Card className="lg:col-span-3" title={<T en="Always up to date" pt="Sempre atualizado" />} visual={<UpdateVisual />}>
          <T
            en="When a new version is out, the app lets you know. On Windows, one click installs it and keeps your settings."
            pt="Quando sai uma versão nova, o app avisa. No Windows, um clique instala tudo e mantém suas configurações."
          />
        </Card>
      </div>
    </section>
  );
}
