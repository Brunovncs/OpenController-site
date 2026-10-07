import { MemoryBars } from "./MemoryBars";
import { SectionHead } from "./SectionHead";
import { T } from "./T";

const MEASURES = [
  {
    k: { en: "Delay it adds to your controller", pt: "Atraso que ele adiciona ao controle" },
    v: { en: "Usually under a millisecond", pt: "Normalmente menos de um milésimo de segundo" },
  },
  {
    k: { en: "Processor, with no controller connected", pt: "Processador, sem nenhum controle conectado" },
    v: { en: "0 %", pt: "0 %" },
  },
];

export function Performance() {
  return (
    <section id="performance" aria-labelledby="performance-title" className="wrap py-20 sm:py-24">
      <SectionHead
        n="03"
        label={<T en="Performance" pt="Desempenho" />}
        title={
          <span id="performance-title">
            <T en="Almost nothing in the background." pt="Quase nada em segundo plano." />
          </span>
        }
      >
        <T
          en="OpenController is made of two programs. The window, where you change settings, only runs while it is open. Close it and all that stays is the part that keeps your controllers working, with up to 4 MB of RAM."
          pt="O OpenController é feito de dois programas. A janela, onde você muda as configurações, só roda enquanto está aberta. Fechou, fica só a parte que faz seus controles funcionarem, com até 4 MB de RAM."
        />
      </SectionHead>

      <div className="mt-14 grid gap-x-10 gap-y-10 lg:grid-cols-12">
        <article className="card reveal p-6 sm:p-9 lg:col-span-8" data-spotlight>
          <span className="rim" aria-hidden />
          <p className="label mb-8 flex items-center gap-2.5">
            <span className="h-px w-4 bg-accent" aria-hidden />
            <span className="text-accent">
              <T en="Memory in use" pt="Memória em uso" />
            </span>
          </p>
          <MemoryBars />
          <p className="mt-8 font-mono text-[11.5px] leading-relaxed text-faint">
            <T
              en="Measured on version 0.8.0, Windows 11, as Task Manager shows it, with no controller connected. With the window open it ranged from 30 to 35 MB. On macOS the window exits when closed starting with the version after 0.8.0."
              pt="Medido na versão 0.8.0, no Windows 11, como aparece no Gerenciador de Tarefas, sem controle conectado. Com a janela aberta ficou entre 30 e 35 MB. No macOS a janela sai ao fechar a partir da versão seguinte à 0.8.0."
            />
          </p>
        </article>

        <div className="reveal lg:col-span-4">
          <h3 className="text-[19px] font-semibold tracking-tight">
            <T en="In your games" pt="Nos seus jogos" />
          </h3>
          <p className="mt-2 text-[14px] leading-relaxed text-muted">
            <T en="It runs in the background without getting in the way of your games." pt="Roda em segundo plano, sem atrapalhar seus jogos." />
          </p>
          <dl className="mt-6 border-t border-line">
            {MEASURES.map((m) => (
              <div key={m.k.en} className="border-b border-line py-4">
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
      </div>
    </section>
  );
}
