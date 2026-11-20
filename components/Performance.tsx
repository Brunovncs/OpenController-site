import { t } from "@/lib/i18n-server";
import { MemoryBars } from "./MemoryBars";
import { SectionHead } from "./SectionHead";

export function Performance() {
  const m = t().home.performance;
  return (
    <section id="performance" aria-labelledby="performance-title" className="wrap py-20 sm:py-24">
      <SectionHead id="performance-title" title={m.title} />

      <div className="mt-12 grid items-center gap-x-10 gap-y-10 lg:grid-cols-12">
        <article className="card reveal p-6 sm:p-9 lg:col-span-8" data-spotlight>
          <span className="rim" aria-hidden />
          <p className="label mb-8 flex items-center gap-2.5">
            <span className="h-px w-4 bg-accent" aria-hidden />
            <span className="text-accent">{m.memory}</span>
          </p>
          <MemoryBars />
        </article>

        <div className="reveal lg:col-span-4">
          <h3 className="text-[19px] font-semibold tracking-tight">{m.games}</h3>
          <dl className="mt-6 border-t border-line">
            {m.measures.map((x, i) => (
              <div key={i} className="border-b border-line py-4">
                <dt className="text-[13px] text-faint">{x.k}</dt>
                <dd className="mt-1 text-[15px] text-fg">{x.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
