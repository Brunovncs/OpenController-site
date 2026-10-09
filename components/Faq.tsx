import type { ReactNode } from "react";
import { faqItems } from "@/lib/faq";
import { PlusIcon } from "./icons";
import { SectionHead } from "./SectionHead";
import { T } from "./T";

const A = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} className="text-fg underline decoration-line-strong underline-offset-4 hover:decoration-fg">
    {children}
  </a>
);

/** Draws "[words](#anchor)" in an answer as a link; `base` points the anchor at another page. */
function Rich({ text, base }: { text: string; base: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/);
  return (
    <>
      {parts.map((p, i) => {
        const m = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(p);
        return m ? (
          <A key={i} href={m[2].startsWith("#") ? base + m[2] : m[2]}>
            {m[1]}
          </A>
        ) : (
          p
        );
      })}
    </>
  );
}

export function Faq({ appReports }: { appReports: boolean }) {
  const items = faqItems(appReports);
  return (
    <section id="faq" aria-labelledby="faq-title" className="wrap py-20 sm:py-24">
      <SectionHead n="06" label={<T en="Questions" pt="Dúvidas" />} title={<span id="faq-title"><T en="Common questions." pt="Perguntas frequentes." /></span>} />
      <div className="faq mt-12 grid gap-x-10 lg:grid-cols-12">
        <p className="mb-8 text-[14px] leading-relaxed text-muted lg:col-span-3 lg:mb-0 lg:pt-5">
          <T
            en={<>Another question, or a controller that isn’t working right? <A href="#contact">Get in touch</A>.</>}
            pt={<>Ficou com outra dúvida, ou algum controle não funcionou direito? <A href="#contact">Fale com a gente</A>.</>}
          />
        </p>
        <div className="border-t border-line lg:col-span-9">
          {items.map((item) => (
            <details key={item.q.en} className="group border-b border-line">
              <summary className="flex items-center justify-between gap-6 py-5 text-[16.5px] text-fg transition-colors hover:text-white">
                <T en={item.q.en} pt={item.q.pt} />
                <PlusIcon className="chev shrink-0 text-faint group-hover:text-fg" width={18} height={18} />
              </summary>
              <div className="max-w-[46rem] pb-6 text-[15px] leading-relaxed text-muted">
                <T en={<Rich text={item.a.en} base="" />} pt={<Rich text={item.a.pt} base="" />} />
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
