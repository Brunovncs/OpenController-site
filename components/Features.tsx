import type { ReactNode } from "react";
import { t } from "@/lib/i18n-server";
import { SectionHead } from "./SectionHead";
import { SwapDemo } from "./SwapDemo";

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

function StepsVisual({ steps }: { steps: string[] }) {
  return (
    <ol className="space-y-2 px-6 pb-7 sm:px-7">
      {steps.map((s, i) => (
        <li
          key={i}
          className={`flex items-center gap-3 rounded-xl border px-3 py-2 text-[13px] ${i === steps.length - 1 ? "border-accent/50 bg-accent/[0.07]" : "border-line bg-panel-2"}`}
        >
          <span className="grid size-6 shrink-0 place-items-center rounded-md bg-white/[0.06] font-mono text-[11.5px] text-muted">{i + 1}</span>
          <span className="text-fg">{s}</span>
        </li>
      ))}
    </ol>
  );
}

function SetupsVisual() {
  const m = t().home.features.custom;
  const rows = [
    { name: m.setups.default, on: false },
    { name: m.setups.racing, on: true },
    { name: m.setups.shooter, on: false },
  ];
  return (
    <ul className="flex flex-wrap gap-2 px-6 pb-7 sm:px-7">
      {rows.map((r, i) => (
        <li
          key={i}
          className={`flex min-w-[10rem] flex-1 items-center gap-3 rounded-xl border px-3 py-2.5 text-[13px] ${r.on ? "border-accent/50 bg-accent/[0.07]" : "border-line bg-panel-2"}`}
        >
          <span className={`size-1.5 rounded-full ${r.on ? "bg-accent" : "bg-line-strong"}`} aria-hidden />
          <span className="text-fg">{r.name}</span>
          {r.on ? <span className="ml-auto text-[11.5px] text-accent">{m.inUse}</span> : null}
        </li>
      ))}
    </ul>
  );
}

function UpdateVisual() {
  const m = t().home.features.updates;
  return (
    <div className="px-6 pb-7 sm:px-7">
      <div className="flex items-center gap-3 rounded-xl border border-line bg-panel-2 px-3 py-2.5 text-[13px]">
        <span className="size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
        <span className="text-fg">{m.notice}</span>
        <span className="ml-auto shrink-0 rounded-md bg-accent/90 px-2.5 py-1 text-[12px] font-medium text-accent-ink">{m.button}</span>
      </div>
    </div>
  );
}

export function Features() {
  const m = t().home.features;
  return (
    <section id="features" aria-labelledby="features-title" className="wrap py-20 sm:py-24">
      <SectionHead id="features-title" title={m.title} />

      <div className="mt-12 grid gap-3 lg:grid-cols-6">
        <Card className="lg:col-span-2" title={m.games.title} visual={<StepsVisual steps={m.games.steps} />}>
          {m.games.body}
        </Card>

        <Card
          className="lg:col-span-4"
          title={m.friends.title}
          visual={
            <div className="px-6 pb-7 sm:px-7">
              <SwapDemo />
              <p className="mt-3 text-[12.5px] text-faint">{m.friends.hint}</p>
            </div>
          }
        >
          {m.friends.body}
        </Card>

        <Card className="lg:col-span-4" title={m.custom.title} visual={<SetupsVisual />}>
          {m.custom.body}
        </Card>

        <Card className="lg:col-span-2" title={m.updates.title} visual={<UpdateVisual />}>
          {m.updates.body}
        </Card>
      </div>
    </section>
  );
}
