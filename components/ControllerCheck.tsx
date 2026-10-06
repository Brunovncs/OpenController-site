"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { glyphsFor, shapeFor, type Glyphs, type Shape } from "@/lib/drawings";
import { FAMILIES, HINTS, SHORT, type Family } from "@/lib/families";
import { gamepadName, lookup, parseGamepadId } from "@/lib/models";
import { PadDrawing } from "./PadDrawing";
import { useHtmlData } from "./lang";
import { T } from "./T";

type Snap = { index: number; id: string; mapping: string; buttons: number[]; axes: number[] };

const EXAMPLES = [
  { id: "054c:0ce6", label: "DualSense" },
  { id: "054c:0df2", label: "DualSense Edge" },
  { id: "054c:09cc", label: "DualShock 4" },
  { id: "054c:0268", label: "DualShock 3" },
  { id: "045e:0b12", label: "Xbox Series" },
  { id: "057e:2009", label: "Switch Pro" },
  { id: "057e:2008", label: "Joy-Con" },
  { id: "2dc8:6012", label: "8BitDo Ultimate 2" },
  { id: "2dc8:6003", label: "8BitDo Pro 2" },
  { id: "2dc8:2862", label: "8BitDo SN30" },
];

const PHYSICAL: Record<Glyphs, string[]> = {
  xbox: ["A", "B", "X", "Y", "LB", "RB", "LT", "RT", "View", "Menu", "LS", "RS", "↑", "↓", "←", "→", "Home"],
  ps: ["Cross", "Circle", "Square", "Triangle", "L1", "R1", "L2", "R2", "Share", "Options", "L3", "R3", "↑", "↓", "←", "→", "PS", "Touchpad"],
  nintendo: ["B", "A", "Y", "X", "L", "R", "ZL", "ZR", "−", "+", "L stick", "R stick", "↑", "↓", "←", "→", "Home", "Capture"],
};

function q(n: number) {
  return Math.round(n * 50) / 50;
}

function snapshot(g: Gamepad): Snap {
  return {
    index: g.index,
    id: g.id,
    mapping: g.mapping,
    buttons: g.buttons.map((b) => q(b.pressed && b.value < 0.1 ? 1 : b.value)),
    axes: Array.from(g.axes, (a) => (Math.abs(a) < 0.08 ? 0 : q(a))),
  };
}

function noop() {
  return () => {};
}

function physicalName(glyphs: Glyphs, shape: Shape, i: number, family: string | null) {
  if (glyphs === "ps" && i === 8 && (family === "DualSense" || family === "DualSenseEdge")) return "Create";
  if (glyphs === "xbox" && i === 16 && shape === "xbox") return "Xbox";
  return PHYSICAL[glyphs][i] ?? `#${i + 1}`;
}

function Yes({ children }: { children: React.ReactNode }) {
  return <span className="text-fg">{children}</span>;
}
function No({ children }: { children: React.ReactNode }) {
  return <span className="text-faint">{children}</span>;
}

function Verdict({ family, os, hint }: { family: Family; os: string; hint: string | null }) {
  if (hint === "EightBitDoDInput" && os !== "mac")
    return (
      <T
        en="It works in games as it is right now, in its Xbox mode. To use its extra buttons and motion aiming, switch it to D-input mode, as explained below."
        pt="Ele já funciona nos jogos assim, no modo Xbox. Para usar os botões extras e a mira com movimento, mude para o modo D-input, como explicado abaixo."
      />
    );
  if (family.unsupported)
    return <T en="Switch 2 controllers do not work in this version yet." pt="Os controles do Switch 2 ainda não funcionam nesta versão." />;
  if (family.id === "Handheld")
    return (
      <T
        en="Games already work with the built-in controller. On Windows, OpenController can also give its extra buttons something to do."
        pt="Os jogos já funcionam com o controle embutido. No Windows, o OpenController também dá função aos botões extras dele."
      />
    );
  if (family.passthrough)
    return (
      <T
        en="Games already support it, so OpenController leaves it as it is and lists it with the others."
        pt="Os jogos já aceitam esse controle, então o OpenController deixa ele como está e o mostra junto com os outros."
      />
    );
  if (os === "mac")
    return (
      <T
        en="On a Mac, games already work with it. OpenController adds the extra buttons, the light and the battery level."
        pt="No Mac, os jogos já funcionam com esse controle. O OpenController acrescenta os botões extras, a luz e o nível de bateria."
      />
    );
  return (
    <T
      en="Works in your games, as its own player, and keeps that player number if it reconnects."
      pt="Funciona nos seus jogos, como um jogador próprio, e mantém o número do jogador se reconectar."
    />
  );
}

function Capabilities({ family }: { family: Family }) {
  const rows: [React.ReactNode, React.ReactNode][] = [
    [
      <T key="e" en="Extra buttons" pt="Botões extras" />,
      family.extras ? <Yes><T en={family.extras.en} pt={family.extras.pt} /></Yes> : <No><T en="None beyond the usual ones" pt="Nenhum além dos de sempre" /></No>,
    ],
    [
      <T key="g" en="Aim by moving it" pt="Mira com movimento" />,
      family.gyro === "yes" ? (
        <Yes><T en="Yes" pt="Sim" /></Yes>
      ) : family.gyro === "dinput" ? (
        <Yes><T en="Yes, in D-input mode" pt="Sim, no modo D-input" /></Yes>
      ) : (
        <No><T en="No" pt="Não" /></No>
      ),
    ],
    [
      <T key="l" en="Light bar" pt="Barra de luz" />,
      family.lightBar ? <Yes><T en="Player colour, your colour or battery" pt="Cor do jogador, a sua cor ou a bateria" /></Yes> : <No><T en="No" pt="Não" /></No>,
    ],
    [
      <T key="t" en="Touchpad as buttons" pt="Touchpad como botões" />,
      family.touchpad ? <Yes><T en="Yes, as extra buttons" pt="Sim, como botões extras" /></Yes> : <No><T en="No" pt="Não" /></No>,
    ],
  ];
  return (
    <dl className="mt-6 divide-y divide-line border-y border-line text-[14.5px]">
      {rows.map(([k, val], i) => (
        <div key={i} className="grid grid-cols-[9rem_1fr] gap-3 py-3 sm:grid-cols-[11rem_1fr]">
          <dt className="text-muted">{k}</dt>
          <dd>{val}</dd>
        </div>
      ))}
    </dl>
  );
}

const HELP: { en: string; pt: string }[] = [
  {
    en: "Click anywhere on this page, then press a button on the controller. Browsers only show a controller after a press, and only to the page in front.",
    pt: "Clique em qualquer lugar desta página e aperte um botão no controle. O navegador só mostra o controle depois de um toque, e só para a página em primeiro plano.",
  },
  {
    en: "Some browsers and ad blockers keep controllers from websites. Brave does. Open this page in Chrome or Edge, or turn the blocker off for this page.",
    pt: "Alguns navegadores e bloqueadores de anúncio escondem os controles dos sites. O Brave faz isso. Abra esta página no Chrome ou no Edge, ou desligue o bloqueador nesta página.",
  },
  {
    en: "A Bluetooth controller has to be paired with the computer first, in your system's Bluetooth settings.",
    pt: "Um controle Bluetooth precisa estar pareado com o computador antes, nas configurações de Bluetooth do sistema.",
  },
  {
    en: "Safari shows the controller but never says which one it is.",
    pt: "O Safari mostra o controle, mas nunca diz qual é.",
  },
  {
    en: "If OpenController is running with hiding on, the browser sees the Xbox controller it shows to games instead of yours. Quit it to test the controller itself.",
    pt: "Se o OpenController estiver aberto com a ocultação ligada, o navegador vê o controle de Xbox que ele mostra aos jogos, e não o seu. Feche-o para testar o próprio controle.",
  },
];

type State = "idle" | "known" | "unknown" | "xinput" | "anon";

function StatusPill({ state, example }: { state: State; example: boolean }) {
  const tone = example
    ? "border-accent/40 bg-accent/10 text-accent"
    : state === "idle"
      ? "border-line-strong bg-white/[0.03] text-muted"
      : state === "known"
        ? "border-ok/40 bg-ok/10 text-ok"
        : "border-warn/40 bg-warn/10 text-warn";
  return (
    <span className={`inline-flex h-8 items-center gap-2.5 rounded-full border px-3.5 text-[14px] font-medium ${tone}`}>
      <span className="pulse inline-block size-2 rounded-full bg-current" aria-hidden />
      {example ? (
        <T en="Example" pt="Exemplo" />
      ) : state === "idle" ? (
        <T en="Waiting for a controller" pt="Esperando um controle" />
      ) : state === "known" ? (
        <T en="Recognised" pt="Reconhecido" />
      ) : state === "unknown" ? (
        <T en="Connected, not in the list" pt="Conectado, fora da lista" />
      ) : state === "xinput" ? (
        <T en="Connected as an Xbox controller" pt="Conectado como controle de Xbox" />
      ) : (
        <T en="Connected, model not shown" pt="Conectado, modelo não informado" />
      )}
    </span>
  );
}

export function ControllerCheck() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [pads, setPads] = useState<Snap[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const [example, setExample] = useState<string | null>(null);
  const [exampleDown, setExampleDown] = useState<number[]>([]);
  const os = useHtmlData("os", "other");
  const supported = useSyncExternalStore(
    noop,
    () => typeof navigator.getGamepads === "function",
    () => true,
  );
  // Brave has the Gamepad API but hands websites no controllers.
  const brave = useSyncExternalStore(
    noop,
    () => "brave" in navigator,
    () => false,
  );

  useEffect(() => {
    if (typeof navigator.getGamepads !== "function" || !rootRef.current) return;
    let raf = 0;
    let visible = false;
    let sig = "";
    const prev = new Map<number, string>();

    const read = () => {
      const list = Array.from(navigator.getGamepads()).filter((g): g is Gamepad => !!g && g.connected);
      const snaps = list.map(snapshot);
      const s = JSON.stringify(snaps);
      if (s === sig) return;
      sig = s;
      for (const p of snaps) {
        const ps = JSON.stringify(p);
        if (prev.get(p.index) !== ps) {
          prev.set(p.index, ps);
          if (p.buttons.some((b) => b > 0.1) || p.axes.some((a) => Math.abs(a) > 0.3)) {
            setActive(p.index);
            setExample(null);
          }
        }
      }
      setPads(snaps);
    };
    const loop = () => {
      read();
      raf = visible && !document.hidden ? requestAnimationFrame(loop) : 0;
    };
    const start = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) start();
    });
    io.observe(rootRef.current);
    const onConnect = (e: GamepadEvent) => {
      setActive(e.gamepad.index);
      setExample(null);
      start();
    };
    const onDisconnect = () => requestAnimationFrame(read);
    const onVisibility = () => {
      if (visible && !document.hidden) start();
    };
    window.addEventListener("gamepadconnected", onConnect);
    window.addEventListener("gamepaddisconnected", onDisconnect);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("gamepadconnected", onConnect);
      window.removeEventListener("gamepaddisconnected", onDisconnect);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const pad = example ? null : (pads.find((p) => p.index === active) ?? pads[0] ?? null);
  const parsed = pad ? parseGamepadId(pad.id) : null;
  const model = useMemo(() => {
    if (example) {
      const [v, p] = example.split(":");
      return lookup(v, p);
    }
    return parsed ? lookup(parsed.vendor, parsed.product) : null;
  }, [example, parsed]);
  const family = model ? (FAMILIES[model.family] ?? FAMILIES.Other) : null;
  // A pad Windows hands over as XInput has no ids ("Xbox 360 Controller (XInput STANDARD GAMEPAD)",
  // or the device's own name in the system's language), and is an Xbox controller as far as anyone
  // can tell.
  const xboxOnly = !model && !parsed && !!pad && /xinput|xbox/i.test(pad.id);
  const shape: Shape = xboxOnly ? "xbox" : shapeFor(model, parsed?.vendor ?? null);
  const glyphs = glyphsFor(model, parsed?.vendor ?? null, shape);
  const buttons = example ? Array.from({ length: 18 }, (_, i) => (exampleDown.includes(i) ? 1 : 0)) : (pad?.buttons ?? []);
  const axes = pad?.axes ?? [0, 0, 0, 0];
  const pressed = buttons.map((b, i) => [b, i] as const).filter(([b]) => b > 0.1).map(([, i]) => i);

  const state: "idle" | "known" | "unknown" | "xinput" | "anon" = example
    ? "known"
    : !pad
      ? "idle"
      : model
        ? "known"
        : parsed
          ? "unknown"
          : xboxOnly
            ? "xinput"
            : "anon";

  const showFamily = (id: string) => {
    window.dispatchEvent(new CustomEvent("oc-family", { detail: id }));
    document.getElementById("controllers")?.scrollIntoView({ block: "start" });
  };

  const link = "text-fg underline decoration-line-strong underline-offset-4 hover:decoration-fg";

  return (
    <div ref={rootRef}>
      <div className="card">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3 border-b border-line px-5 py-4 sm:px-8">
          <p role="status" aria-live="polite" className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2">
            <StatusPill state={state} example={!!example} />
            {pad ? <span className="min-w-0 truncate text-[14px] text-muted">{gamepadName(pad.id)}</span> : null}
          </p>
          {pads.length > 1 && !example ? (
            <div role="tablist" aria-label="Controllers" className="seg ml-auto">
              {pads.map((p) => (
                <button key={p.index} role="tab" aria-selected={p.index === (pad?.index ?? -1)} onClick={() => setActive(p.index)} type="button">
                  {p.index + 1}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="grid lg:grid-cols-[1.1fr_1fr]">
          <div className="relative flex flex-col justify-center border-b border-line px-5 py-8 sm:px-10 sm:py-10 lg:border-b-0 lg:border-r">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]"
            />
            <div className="relative mx-auto w-full max-w-[560px]">
              <PadDrawing
                shape={shape}
                glyphs={glyphs}
                buttons={buttons}
                axes={axes}
                dim={state === "idle" && !example}
                onPress={
                  example
                    ? (i, down) => setExampleDown((d) => (down ? [...d.filter((x) => x !== i), i] : d.filter((x) => x !== i)))
                    : undefined
                }
              />
            </div>

            <div className="relative mt-6 min-h-[60px]">
              <p className="label mb-2.5">
                <T en="Pressed" pt="Apertado" />
              </p>
              {pressed.length ? (
                <ul className="flex flex-wrap gap-1.5">
                  {pressed.map((i) => (
                    <li key={i} className="flex items-center gap-1.5 rounded-md border border-accent/40 bg-accent/10 px-2.5 py-1 font-mono text-[13px] text-fg">
                      {physicalName(glyphs, shape, i, model?.family ?? null)}
                      {i > 16 ? (
                        <span className="text-accent">
                          <T en="· extra" pt="· extra" />
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[14px] text-faint">
                  {example ? (
                    <T en="Click or tap the buttons on the drawing." pt="Clique ou toque nos botões do desenho." />
                  ) : state === "idle" ? (
                    <T en="Buttons light up on the drawing as you press them." pt="Os botões acendem no desenho conforme você aperta." />
                  ) : (
                    <T en="Press any button, move the sticks, pull the triggers." pt="Aperte qualquer botão, mexa os analógicos, puxe os gatilhos." />
                  )}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-8 px-5 py-8 sm:px-8 sm:py-10">
            <div aria-live="polite">
              {state === "idle" ? (
                <div>
                  <h3 className="text-balance text-[26px] font-semibold leading-[1.15] tracking-[-0.025em] sm:text-[30px]">
                    <T en="Connect your controller and press any button." pt="Conecte seu controle e aperte qualquer botão." />
                  </h3>
                  <p className="mt-3 text-[16px] leading-relaxed text-muted">
                    <T
                      en="By cable or Bluetooth. It shows up here with its name and what OpenController can do with it. Nothing leaves this page."
                      pt="Por cabo ou Bluetooth. Ele aparece aqui com o nome e o que o OpenController consegue fazer com ele. Nada sai desta página."
                    />
                  </p>
                  {!supported || brave ? (
                    <p className="mt-5 rounded-lg border border-warn/30 bg-warn/5 p-3 text-[15px] leading-relaxed text-warn">
                      {brave ? (
                        <T
                          en="You are using Brave, which keeps controllers from websites. Open this page in Chrome or Edge to test yours, or try the examples below."
                          pt="Você está usando o Brave, que esconde os controles dos sites. Abra esta página no Chrome ou no Edge para testar o seu, ou experimente os exemplos abaixo."
                        />
                      ) : (
                        <T en="This browser cannot read controllers. Open this page in Chrome or Edge, or try the examples below." pt="Este navegador não lê controles. Abra esta página no Chrome ou no Edge, ou experimente os exemplos abaixo." />
                      )}
                    </p>
                  ) : null}
                  <div className="mt-7 rounded-xl border border-line bg-white/[0.02] p-4 sm:p-5">
                    <p className="text-[15px] font-medium text-fg">
                      <T en="Not detected? It is usually one of these." pt="Não detecta? Geralmente é um destes motivos." />
                    </p>
                    <ul className="mt-3 space-y-2.5 text-[14px] leading-relaxed text-muted">
                      {HELP.map((h) => (
                        <li key={h.en} className="grid grid-cols-[0.875rem_1fr] gap-2">
                          <span aria-hidden className="mt-[0.6rem] size-1 rounded-full bg-faint" />
                          <T en={h.en} pt={h.pt} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : state === "known" && model && family ? (
                <div>
                  <h3 className="text-[26px] font-semibold leading-tight tracking-[-0.025em] sm:text-[30px]">{model.name}</h3>
                  <p className="mt-2 flex flex-wrap items-baseline gap-x-2 text-[13px] text-faint">
                    {model.brand ? (
                      <>
                        <span>{model.brand}</span>
                        <span aria-hidden>·</span>
                      </>
                    ) : null}
                    <span>
                      <T en={(SHORT[family.id] ?? family.label).en} pt={(SHORT[family.id] ?? family.label).pt} />
                    </span>
                    <span aria-hidden>·</span>
                    <span className="font-mono">{model.id}</span>
                  </p>
                  <p className="mt-5 text-[17px] leading-snug text-fg">
                    <Verdict family={family} os={os} hint={model.hint} />
                  </p>
                  <Capabilities family={family} />
                  {model.hint && HINTS[model.hint] ? (
                    <p className="mt-4 border-l-2 border-warn/70 pl-3 text-[14px] leading-relaxed text-muted">
                      <T en={HINTS[model.hint].en} pt={HINTS[model.hint].pt} />
                    </p>
                  ) : null}
                  {family.note ? (
                    <p className="mt-3 text-[13.5px] leading-relaxed text-faint">
                      <T en={family.note.en} pt={family.note.pt} />
                    </p>
                  ) : null}
                  {pad && pad.mapping !== "standard" ? (
                    <p className="mt-3 text-[13.5px] leading-relaxed text-faint">
                      <T
                        en="Your browser does not know this controller's layout, so the lights may not match its buttons. OpenController reads it its own way, not through the browser."
                        pt="O navegador não conhece o layout deste controle, então as luzes podem não bater com os botões. O OpenController lê de outro jeito, não pelo navegador."
                      />
                    </p>
                  ) : null}
                  <button type="button" onClick={() => showFamily(family.id)} className="mt-5 text-[14px] text-muted underline decoration-line-strong underline-offset-4 hover:text-fg">
                    <T en="See every controller like this one" pt="Ver todos os controles parecidos" />
                  </button>
                </div>
              ) : (
                <div>
                  <h3 className="text-[26px] font-semibold leading-tight tracking-[-0.025em] sm:text-[30px]">{pad ? gamepadName(pad.id) : ""}</h3>
                  {parsed ? <p className="mt-2 font-mono text-[13px] text-faint">{`${parsed.vendor}:${parsed.product}`}</p> : null}
                  <p className="mt-5 text-[16px] leading-relaxed">
                    {state === "unknown" ? (
                      <T
                        en={
                          <>
                            It is not on our list yet, but it will probably work: most controllers do. If you try it,{" "}
                            <a href="#contact" className={link}>
                              tell us how it went
                            </a>
                            .
                          </>
                        }
                        pt={
                          <>
                            Ele ainda não está na nossa lista, mas provavelmente funciona: a maioria dos controles funciona. Se você testar,{" "}
                            <a href="#contact" className={link}>
                              conte como foi
                            </a>
                            .
                          </>
                        }
                      />
                    ) : state === "xinput" ? (
                      <T
                        en="It works, and games see it as an Xbox controller. Windows presents it that way, so the browser cannot tell the exact model. If it is an 8BitDo or another controller in its Xbox mode, its extra buttons stay hidden in that mode: switch it to D-input (for 8BitDo, turn it on holding B) or connect it by Bluetooth to use them. If OpenController is running, this may also be the Xbox controller it shows to games."
                        pt="Funciona, e os jogos o veem como controle de Xbox. O Windows o apresenta assim, então o navegador não sabe o modelo exato. Se for um 8BitDo ou outro controle no modo Xbox, os botões extras ficam escondidos nesse modo: mude para D-input (no 8BitDo, ligue segurando B) ou conecte por Bluetooth para usá-los. Se o OpenController estiver aberto, este também pode ser o controle de Xbox que ele mostra aos jogos."
                      />
                    ) : (
                      <T
                        en="Your browser did not say which controller this is. Safari never does. Open this page in Chrome or Edge to see the details."
                        pt="Seu navegador não informou qual controle é este. O Safari nunca informa. Abra esta página no Chrome ou no Edge para ver os detalhes."
                      />
                    )}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-auto border-t border-line pt-5">
              <p className="text-[14px] text-muted">
                <T en="No controller at hand? Try one:" pt="Sem controle por perto? Experimente um:" />
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {EXAMPLES.map((e) => (
                  <button
                    key={e.id}
                    type="button"
                    aria-pressed={example === e.id}
                    onClick={() => {
                      setExampleDown([]);
                      setExample((cur) => (cur === e.id ? null : e.id));
                    }}
                    className="btn rounded-full border border-line px-3 py-1.5 text-[13px] text-muted hover:border-line-strong hover:text-fg aria-pressed:border-accent/60 aria-pressed:bg-accent/10 aria-pressed:text-fg"
                  >
                    {e.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
