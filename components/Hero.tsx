import Image from "next/image";
import type { Release } from "@/lib/github";
import { Download } from "./Download";
import { ArrowIcon } from "./icons";
import { T } from "./T";

const FACTS = [
  {
    k: { en: "Runs on", pt: "Roda em" },
    v: { en: "Windows, Linux and Mac", pt: "Windows, Linux e Mac" },
  },
  {
    k: { en: "Works with", pt: "Funciona com" },
    v: { en: "Hundreds of controllers", pt: "Centenas de controles" },
  },
  {
    k: { en: "Costs", pt: "Custa" },
    v: { en: "Nothing. Free and open source", pt: "Nada. Gratuito e de código aberto" },
  },
  {
    k: { en: "Sends", pt: "Envia" },
    v: { en: "Fully private.", pt: "Totalmente privado." },
  },
];

export function Hero({ release }: { release: Release | null }) {
  return (
    <section id="top" aria-labelledby="hero-title" className="overflow-x-clip">
      <div className="wrap pt-10 sm:pt-14 lg:pt-16">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="flex items-start gap-4 sm:gap-6">
            <Image src="/brand/icon.svg" alt="" width={88} height={88} priority className="size-16 shrink-0 sm:size-[88px]" />
            <div className="min-w-0 pt-1">
              <h1 id="hero-title" className="text-[32px] font-semibold leading-none tracking-[-0.035em] sm:text-[44px]">
                OpenController
              </h1>
              <p className="mt-3 text-[18px] leading-snug text-fg sm:text-[21px]">
                <T en="Your controller in every PC game." pt="Seu controle em qualquer jogo de PC." />
              </p>
              <p className="mt-2 max-w-[38rem] text-pretty text-[15px] leading-relaxed text-muted sm:text-[16px]">
                <T
                  en="Use PlayStation, Switch, 8BitDo and hundreds of other controllers in your PC games, alone or with friends."
                  pt="Use controles de PlayStation, Switch, 8BitDo e centenas de outros nos seus jogos de PC, sozinho ou com amigos."
                />
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start gap-3 sm:flex-row lg:shrink-0">
            <Download release={release} quiet />
            <a href="#check" className="btn btn-ghost h-12 justify-center px-5 text-[15px]">
              <T en="Test your controller" pt="Teste seu controle" />
              <ArrowIcon />
            </a>
          </div>
        </div>

        <figure className="relative mt-12 sm:mt-14">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-10 -top-16 bottom-0 -z-10 opacity-80 [background:radial-gradient(55%_60%_at_50%_30%,rgba(96,205,255,0.12),transparent_70%)]"
          />
          <div className="relative aspect-[1468/700] overflow-hidden rounded-[14px] border border-line-strong bg-panel shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9),0_0_0_1px_rgba(0,0,0,1)]">
            <Image
              src="/window.png"
              alt="The OpenController app with eight connected controllers, each drawn in its own shape."
              width={1468}
              height={1047}
              priority
              sizes="(min-width: 1240px) 1160px, 100vw"
              className="h-auto w-full"
            />
            <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-black/85" />
          </div>
          <figcaption className="mt-3 text-[13px] text-faint">
            <T
              en="The app, showing every controller you connect."
              pt="O app mostrando cada controle conectado."
            />
          </figcaption>
        </figure>

        <dl className="mt-12 grid grid-cols-1 border-y border-line sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {FACTS.map((s, i) => (
            <div
              key={i}
              className={`py-5 sm:px-5 ${i > 0 ? "border-t border-line sm:border-t-0" : ""} ${i % 2 === 1 ? "sm:border-l sm:border-line" : ""} ${i >= 2 ? "sm:border-t lg:border-t-0" : ""} ${i === 2 ? "lg:border-l lg:border-line" : ""} sm:first:pl-0`}
            >
              <dt className="label">
                <T en={s.k.en} pt={s.k.pt} />
              </dt>
              <dd className="mt-2 text-[15px] leading-snug text-fg">
                <T en={s.v.en} pt={s.v.pt} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
