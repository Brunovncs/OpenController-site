import Image from "next/image";
import type { Release } from "@/lib/github";
import { AllBuilds, Download, ReleaseDate } from "./Download";
import { T } from "./T";

const SPECS = [
  {
    k: { en: "Runs on", pt: "Roda em" },
    v: { en: "Windows 10 and 11, Linux, macOS 13 and later", pt: "Windows 10 e 11, Linux, macOS 13 ou mais novo" },
  },
  {
    k: { en: "Knows", pt: "Conhece" },
    v: { en: "602 controller models by USB id, plus SDL's community database", pt: "602 modelos de controle pelo id USB, mais o banco de dados da comunidade do SDL" },
  },
  {
    k: { en: "Adds", pt: "Acrescenta" },
    v: { en: "About 0.6 ms between controller and game, median, measured on Windows 11", pt: "Cerca de 0,6 ms entre o controle e o jogo, mediana, medida no Windows 11" },
  },
  {
    k: { en: "Sends", pt: "Envia" },
    v: { en: "Nothing. No telemetry, no update checks", pt: "Nada. Sem telemetria, sem checar atualizações" },
  },
];

export function Hero({ release }: { release: Release | null }) {
  return (
    <section id="top" aria-labelledby="hero-title" className="overflow-x-clip">
      <div className="wrap pt-10 sm:pt-14 lg:pt-20">
        <div className="grid items-start gap-x-12 gap-y-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5 lg:pt-4">
            <Image src="/brand/icon.svg" alt="" width={84} height={84} priority className="-ml-2" />
            <h1 id="hero-title" className="display mt-7 text-balance text-[46px] sm:text-[62px] lg:text-[70px]">
              <T en="Any controller, as an Xbox controller." pt="Qualquer controle, como um controle de Xbox." />
            </h1>
            <p className="mt-6 max-w-[34rem] text-pretty text-[17px] leading-relaxed text-muted">
              <T
                en="DualSense, Switch Pro, Joy-Cons, 8BitDo, Steam Deck and hundreds more show up in games as an Xbox controller, each with a player number that survives reconnects. The buttons an Xbox controller lacks can press one of its buttons, hold a key or type a macro."
                pt="DualSense, Switch Pro, Joy-Cons, 8BitDo, Steam Deck e centenas de outros aparecem nos jogos como um controle de Xbox, cada um com um número de jogador que sobrevive a reconexões. Os botões que o controle de Xbox não tem podem apertar um dos botões dele, segurar uma tecla ou digitar uma macro."
              />
            </p>
            <div className="mt-9">
              <Download release={release} />
            </div>
            <div className="mt-8 border-t border-line pt-4">
              <p className="label mb-2.5 flex flex-wrap gap-x-2">
                <span>
                  <T en="Every build" pt="Todas as versões" />
                </span>
                {release ? (
                  <span className="normal-case tracking-normal">
                    · {release.version} · <ReleaseDate release={release} />
                  </span>
                ) : null}
              </p>
              <AllBuilds release={release} />
              <p className="mt-3 text-[13px] text-faint">
                <T en="Free and open source, MIT license." pt="Gratuito e de código aberto, licença MIT." />
              </p>
            </div>
          </div>

          <figure className="relative lg:col-span-7 min-[1400px]:-mr-24">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-10 -top-10 bottom-0 -z-10 opacity-70 [background:radial-gradient(60%_50%_at_45%_45%,rgba(96,205,255,0.13),transparent_70%)]"
            />
            <div className="overflow-hidden rounded-[14px] border border-line-strong bg-panel shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9),0_0_0_1px_rgba(0,0,0,1)]">
              <Image
                src="/window.png"
                alt="The Open Controller window with eight controllers as tiles, each drawn with its live input: an 8BitDo Ultimate 2, a DualSense Edge, a Switch Pro Controller, Joy-Cons, a DualShock 3, an Xbox controller, a DualShock 4 reconnecting and an 8BitDo in XInput mode."
                width={1468}
                height={1047}
                priority
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="h-auto w-full"
              />
            </div>
            <figcaption className="mt-3 font-mono text-[11.5px] text-faint">
              <T
                en="The window: every controller drawn in its own shape, lit as it is used, with its player, connection and battery."
                pt="A janela: cada controle desenhado no próprio formato, aceso conforme é usado, com jogador, conexão e bateria."
              />
            </figcaption>
          </figure>
        </div>

        <dl className="mt-16 grid grid-cols-1 border-y border-line sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {SPECS.map((s, i) => (
            <div
              key={i}
              className={`py-5 sm:px-5 ${i > 0 ? "border-t border-line sm:border-t-0" : ""} ${i % 2 === 1 ? "sm:border-l sm:border-line" : ""} ${i >= 2 ? "sm:border-t lg:border-t-0" : ""} ${i === 2 ? "lg:border-l lg:border-line" : ""} sm:first:pl-0`}
            >
              <dt className="label">
                <T en={s.k.en} pt={s.k.pt} />
              </dt>
              <dd className="mt-2 text-[14.5px] leading-snug text-fg">
                <T en={s.v.en} pt={s.v.pt} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
