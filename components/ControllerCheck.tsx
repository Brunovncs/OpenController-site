"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { FAMILIES, HINTS, SHORT, type Family } from "@/lib/families";
import { gamepadName, lookup, parseGamepadId, type Art, type IndexedModel } from "@/lib/models";
import { PadDrawing, type Glyphs } from "./PadDrawing";
import { useHtmlData } from "./lang";
import { T } from "./T";

type Snap = { index: number; id: string; mapping: string; buttons: number[]; axes: number[] };

const EXAMPLES = [
  { id: "054c:0df2", label: "DualSense Edge" },
  { id: "057e:2009", label: "Switch Pro" },
  { id: "2dc8:6012", label: "8BitDo Ultimate 2" },
  { id: "045e:0b12", label: "Xbox Series" },
];

const PHYSICAL: Record<Glyphs, string[]> = {
  xbox: ["A", "B", "X", "Y", "LB", "RB", "LT", "RT", "View", "Menu", "LS", "RS", "↑", "↓", "←", "→", "Guide"],
  ps: ["Cross", "Circle", "Square", "Triangle", "L1", "R1", "L2", "R2", "Share", "Options", "L3", "R3", "↑", "↓", "←", "→", "PS", "Touchpad"],
  nintendo: ["B", "A", "Y", "X", "L", "R", "ZL", "ZR", "−", "+", "L stick", "R stick", "↑", "↓", "←", "→", "Home", "Capture"],
};
const XBOX_OUT = ["A", "B", "X", "Y", "LB", "RB", "LT", "RT", "Back", "Start", "LS", "RS", "D-pad ↑", "D-pad ↓", "D-pad ←", "D-pad →", "Guide"];

const PS_FAMILIES = new Set(["DualShock3", "DualShock4", "DualSense", "DualSenseEdge", "Ps2Adapter"]);
const NINTENDO_FAMILIES = new Set(["SwitchPro", "JoyCons", "NintendoClassic", "Switch2"]);

function glyphsFor(model: IndexedModel | null, vendor: string | null): Glyphs {
  if (model) {
    if (PS_FAMILIES.has(model.family)) return "ps";
    if (NINTENDO_FAMILIES.has(model.family)) return "nintendo";
    return "xbox";
  }
  if (vendor === "054c") return "ps";
  if (vendor === "057e") return "nintendo";
  return "xbox";
}

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

function physicalName(glyphs: Glyphs, i: number, family: string | null) {
  if (glyphs === "ps" && i === 8 && (family === "DualSense" || family === "DualSenseEdge")) return "Create";
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
        en="In this mode it is an XInput controller: games read it directly and Open Controller leaves it alone. Its extra buttons need D-input mode."
        pt="Neste modo ele é um controle XInput: os jogos o leem diretamente e o Open Controller não mexe nele. Os botões extras precisam do modo D-input."
      />
    );
  if (family.unsupported)
    return <T en="Not read by this version. Switch 2 controllers need libusb, which this build of SDL leaves out." pt="Não é lido nesta versão. Controles do Switch 2 precisam de libusb, que esta versão do SDL não inclui." />;
  if (family.id === "Handheld")
    return (
      <T
        en="Games read the built-in pad directly. On Windows its back and menu buttons can become keys and macros."
        pt="Os jogos leem o controle embutido diretamente. No Windows, os botões traseiros e de menu podem virar teclas e macros."
      />
    );
  if (family.passthrough)
    return (
      <T
        en="Left as it is. Games already read Xbox controllers, so it keeps its own slot and adds no latency."
        pt="Fica como está. Os jogos já leem controles de Xbox, então ele mantém o próprio slot e não ganha latência."
      />
    );
  if (os === "mac")
    return (
      <T
        en="On macOS games read it as it is. Open Controller adds its extra buttons as keys and macros, and its light bar and battery where it has them."
        pt="No macOS os jogos o leem como ele é. O Open Controller adiciona os botões extras como teclas e macros, e a barra de luz e a bateria quando ele tem."
      />
    );
  return (
    <T
      en="Games see an Xbox 360 controller, with a player number that stays through reconnects."
      pt="Os jogos veem um controle de Xbox 360, com um número de jogador que continua o mesmo ao reconectar."
    />
  );
}

function Capabilities({ family }: { family: Family }) {
  const rows: [React.ReactNode, React.ReactNode][] = [
    [
      <T key="e" en="Extra buttons" pt="Botões extras" />,
      family.extras ? <Yes><T en={family.extras.en} pt={family.extras.pt} /></Yes> : <No><T en="None beyond the Xbox set" pt="Nenhum além dos do Xbox" /></No>,
    ],
    [
      <T key="g" en="Gyro aim" pt="Mira por giroscópio" />,
      family.gyro === "yes" ? (
        <Yes><T en="Yes, added to the right stick" pt="Sim, somado ao analógico direito" /></Yes>
      ) : family.gyro === "dinput" ? (
        <Yes><T en="Yes, in D-input mode" pt="Sim, no modo D-input" /></Yes>
      ) : (
        <No><T en="Not listed" pt="Não listado" /></No>
      ),
    ],
    [
      <T key="l" en="Light bar" pt="Barra de luz" />,
      family.lightBar ? <Yes><T en="Player colour, your colour or battery" pt="Cor do jogador, a sua cor ou bateria" /></Yes> : <No><T en="No" pt="Não" /></No>,
    ],
    [
      <T key="t" en="Touchpad buttons" pt="Botões no touchpad" />,
      family.touchpad ? <Yes><T en="Left half, right half, two fingers" pt="Metade esquerda, metade direita, dois dedos" /></Yes> : <No><T en="No" pt="Não" /></No>,
    ],
  ];
  return (
    <dl className="mt-6 divide-y divide-line border-y border-line text-[14px]">
      {rows.map(([k, val], i) => (
        <div key={i} className="grid grid-cols-[8.5rem_1fr] gap-3 py-2.5 sm:grid-cols-[10rem_1fr]">
          <dt className="text-muted">{k}</dt>
          <dd>{val}</dd>
        </div>
      ))}
    </dl>
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
  const glyphs = glyphsFor(model, parsed?.vendor ?? null);
  const art: Art = model?.art ?? (parsed?.vendor === "054c" ? "PlayStation" : "Offset");
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
          : /xinput/i.test(pad.id)
            ? "xinput"
            : "anon";

  const showFamily = (id: string) => {
    window.dispatchEvent(new CustomEvent("oc-family", { detail: id }));
    document.getElementById("controllers")?.scrollIntoView({ block: "start" });
  };

  const live = state !== "idle" && !example;

  return (
    <div ref={rootRef}>
      <div className="card grid lg:grid-cols-[1.12fr_1fr]">
        <div className="relative border-b border-line p-5 sm:p-8 lg:border-b-0 lg:border-r">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.09)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]"
          />
          <div className="relative flex min-h-8 flex-wrap items-center gap-x-3 gap-y-2">
            <span className={`pulse inline-block size-2 rounded-full ${live ? "bg-ok text-ok" : example ? "bg-accent text-accent" : "bg-faint text-faint"}`} aria-hidden />
            <p className="text-[13px] text-muted" role="status" aria-live="polite">
              {example ? (
                <T en="Example. Click the buttons on the drawing." pt="Exemplo. Clique nos botões do desenho." />
              ) : pad ? (
                <>
                  <T en="Connected:" pt="Conectado:" /> <span className="text-fg">{gamepadName(pad.id)}</span>
                </>
              ) : (
                <T en="Waiting for a controller" pt="Esperando um controle" />
              )}
            </p>
            {pads.length > 1 && !example ? (
              <div role="tablist" aria-label="Controllers" className="seg ml-auto">
                {pads.map((p) => (
                  <button
                    key={p.index}
                    role="tab"
                    aria-selected={p.index === (pad?.index ?? -1)}
                    onClick={() => setActive(p.index)}
                    type="button"
                  >
                    {p.index + 1}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div className="relative mx-auto mt-6 max-w-[520px]">
            <PadDrawing
              art={art}
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

          <div className="relative mt-6 min-h-[64px]">
            <p className="label mb-2">
              <T en="What games see" pt="O que os jogos veem" />
            </p>
            {pressed.length ? (
              <ul className="flex flex-wrap gap-1.5">
                {pressed.map((i) => {
                  const phys = physicalName(glyphs, i, model?.family ?? null);
                  const out = XBOX_OUT[i];
                  const passthrough = family?.passthrough;
                  return (
                    <li key={i} className="flex items-center gap-1.5 rounded-md border border-accent/40 bg-accent/10 px-2 py-1 font-mono text-[12px] text-fg">
                      <span>{phys}</span>
                      <span className="text-accent" aria-hidden>
                        →
                      </span>
                      {out && !passthrough ? (
                        <span>{out}</span>
                      ) : out ? (
                        <span>{out}</span>
                      ) : (
                        <span className="text-accent">
                          <T en="yours to assign" pt="livre para atribuir" />
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-[13px] text-faint">
                {state === "idle" && !example ? (
                  <T en="Press a button and it lights up here, with the Xbox button it becomes." pt="Aperte um botão e ele acende aqui, com o botão de Xbox em que ele vira." />
                ) : (
                  <T en="Press something." pt="Aperte algum botão." />
                )}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-8 p-5 sm:p-8">
          <div aria-live="polite">
          {state === "idle" ? (
            <div>
              <p className="label">
                <T en="How it works" pt="Como funciona" />
              </p>
              <ol className="mt-5 space-y-5 text-[15px] leading-relaxed">
                <li className="grid grid-cols-[2rem_1fr]">
                  <span className="font-mono text-[13px] text-faint">01</span>
                  <span>
                    <T en="Connect a controller by USB or Bluetooth." pt="Conecte um controle por USB ou Bluetooth." />
                  </span>
                </li>
                <li className="grid grid-cols-[2rem_1fr]">
                  <span className="font-mono text-[13px] text-faint">02</span>
                  <span>
                    <T
                      en="Press any button. Browsers only show a controller to a page after a press."
                      pt="Aperte qualquer botão. O navegador só mostra o controle para a página depois de um toque."
                    />
                  </span>
                </li>
                <li className="grid grid-cols-[2rem_1fr]">
                  <span className="font-mono text-[13px] text-faint">03</span>
                  <span>
                    <T
                      en="The page reads its USB id, finds it in the same table of 602 models the app uses, and says what Open Controller does with it."
                      pt="A página lê o id USB, procura na mesma tabela de 602 modelos que o app usa e diz o que o Open Controller faz com ele."
                    />
                  </span>
                </li>
              </ol>
              {!supported ? (
                <p className="mt-6 rounded-lg border border-warn/30 bg-warn/5 p-3 text-[13px] text-warn">
                  <T en="This browser has no Gamepad API. Try the examples below." pt="Este navegador não tem a Gamepad API. Veja os exemplos abaixo." />
                </p>
              ) : null}
              <p className="mt-6 text-[13px] text-faint">
                <T en="Nothing leaves this page." pt="Nada sai desta página." />
              </p>
            </div>
          ) : state === "known" && model && family ? (
            <div>
              <p className="label">{example ? <T en="Example" pt="Exemplo" /> : <T en="Found in the table" pt="Encontrado na tabela" />}</p>
              <h3 className="mt-3 text-[22px] font-semibold leading-tight tracking-tight sm:text-[26px]">{model.name}</h3>
              <p className="mt-1.5 flex flex-wrap gap-x-2 font-mono text-[12px] text-faint">
                <span className="text-muted">{model.id}</span>
                {model.brand ? <span>· {model.brand}</span> : null}
                <span>
                  · <T en={(SHORT[family.id] ?? family.label).en} pt={(SHORT[family.id] ?? family.label).pt} />
                </span>
              </p>
              <p className="mt-5 text-[17px] leading-snug text-fg">
                <Verdict family={family} os={os} hint={model.hint} />
              </p>
              <Capabilities family={family} />
              {model.hint && HINTS[model.hint] ? (
                <p className="mt-4 border-l-2 border-warn/70 pl-3 text-[13.5px] leading-relaxed text-muted">
                  <T en={HINTS[model.hint].en} pt={HINTS[model.hint].pt} />
                </p>
              ) : null}
              {family.note ? (
                <p className="mt-3 text-[13px] leading-relaxed text-faint">
                  <T en={family.note.en} pt={family.note.pt} />
                </p>
              ) : null}
              {pad && pad.mapping !== "standard" ? (
                <p className="mt-3 text-[13px] leading-relaxed text-faint">
                  <T
                    en="Your browser has no standard layout for it, so the lights may not match its buttons. Open Controller reads it through SDL, not the browser."
                    pt="O navegador não tem um layout padrão para ele, então as luzes podem não bater com os botões. O Open Controller lê pelo SDL, não pelo navegador."
                  />
                </p>
              ) : null}
              <button type="button" onClick={() => showFamily(family.id)} className="mt-5 text-[13px] text-muted underline decoration-line-strong underline-offset-4 hover:text-fg">
                <T en="See every model in this family" pt="Ver todos os modelos desta família" />
              </button>
            </div>
          ) : (
            <div>
              <p className="label">
                <T en="Connected" pt="Conectado" />
              </p>
              <h3 className="mt-3 text-[22px] font-semibold leading-tight tracking-tight sm:text-[26px]">{pad ? gamepadName(pad.id) : ""}</h3>
              {parsed ? <p className="mt-1.5 font-mono text-[12px] text-muted">{`${parsed.vendor}:${parsed.product}`}</p> : null}
              <p className="mt-5 text-[16px] leading-relaxed">
                {state === "unknown" ? (
                  <T
                    en="Not in the table of 602 known models. SDL may still read it with its own drivers or the community database of generic pads, and the window says what it found."
                    pt="Não está na tabela de 602 modelos conhecidos. O SDL ainda pode lê-lo com os próprios drivers ou o banco de dados da comunidade para controles genéricos, e a janela diz o que encontrou."
                  />
                ) : state === "xinput" ? (
                  <T
                    en="Windows shows this one as an XInput controller, which hides its USB id. If it is an Xbox controller, games already read it and Open Controller leaves it alone. If it is an 8BitDo or another pad in XInput mode, its extra buttons are hidden: switch it to D-input to use them."
                    pt="O Windows mostra este como um controle XInput, que esconde o id USB. Se for um controle de Xbox, os jogos já o leem e o Open Controller não mexe nele. Se for um 8BitDo ou outro controle no modo XInput, os botões extras ficam ocultos: mude para D-input para usá-los."
                  />
                ) : (
                  <T
                    en="Your browser does not say which controller this is. Chrome, Edge, Brave and Firefox do."
                    pt="Seu navegador não informa que controle é este. Chrome, Edge, Brave e Firefox informam."
                  />
                )}
              </p>
            </div>
          )}
          </div>
        <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-line pt-5">
          <span className="mr-1 w-full text-[13px] text-faint">
            <T en="No controller at hand? Try one:" pt="Sem controle por perto? Experimente:" />
          </span>
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
  );
}
