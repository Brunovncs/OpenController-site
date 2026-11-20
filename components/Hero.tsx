import Image from "next/image";
import type { Release } from "@/lib/github";
import { t } from "@/lib/i18n-server";
import { Download } from "./Download";
import { HeroVideo } from "./HeroVideo";
import { ArrowIcon } from "./icons";

export function Hero({ release }: { release: Release | null }) {
  const m = t().home.hero;
  return (
    <section id="top" aria-labelledby="hero-title" className="overflow-x-clip">
      <div className="wrap pt-12 sm:pt-16 lg:pt-20">
        <div className="flex flex-col items-center text-center">
          <Image src="/brand/icon.svg" alt="" width={88} height={88} priority className="size-16 sm:size-[76px]" />
          <h1 id="hero-title" className="mt-5 text-[34px] font-semibold leading-none tracking-[-0.035em] sm:text-[48px]">
            OpenController
          </h1>
          <p className="mt-4 text-balance text-[19px] leading-snug text-fg sm:text-[22px]">{m.tagline}</p>
          <p className="mt-2 max-w-[34rem] text-balance text-[15px] leading-relaxed text-muted sm:text-[16px]">{m.lead}</p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:items-start [&_p]:justify-center">
            <Download release={release} quiet />
            <a href="#check" className="btn btn-ghost h-12 justify-center px-5 text-[15px]">
              {m.test}
              <ArrowIcon />
            </a>
          </div>
        </div>

        <figure className="relative mt-12 sm:mt-14">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-10 -top-16 bottom-0 -z-10 opacity-80 [background:radial-gradient(55%_60%_at_50%_30%,rgba(96,205,255,0.12),transparent_70%)]"
          />
          <div className="relative mx-auto aspect-[1800/1125] max-w-[900px] overflow-hidden rounded-[14px] border border-line-strong bg-panel shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9),0_0_0_1px_rgba(0,0,0,1)]">
            <HeroVideo label={m.video} />
          </div>
        </figure>

        <dl className="mt-12 grid grid-cols-2 border-y border-line lg:mt-14 lg:grid-cols-4">
          {m.facts.map((s, i) => (
            <div
              key={i}
              className={`py-5 ${i % 2 ? "border-l border-line pl-4 sm:pl-5" : "pr-4"} ${i >= 2 ? "border-t border-line lg:border-t-0" : ""} ${i === 2 ? "lg:border-l lg:pl-5" : ""}`}
            >
              <dt className="label">{s.k}</dt>
              <dd className="mt-2 text-[15px] leading-snug text-fg">{s.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
