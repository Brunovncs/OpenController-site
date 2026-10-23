import { faqItems } from "@/lib/faq";
import { A, FaqList } from "./FaqList";
import { SectionHead } from "./SectionHead";
import { T } from "./T";

export function Faq({ appReports, appMapping }: { appReports: boolean; appMapping: boolean }) {
  const items = faqItems(appReports, appMapping);
  return (
    <section id="faq" aria-labelledby="faq-title" className="wrap py-20 sm:py-24">
      <SectionHead n="06" label={<T en="Questions" pt="Dúvidas" />} title={<span id="faq-title"><T en="Common questions." pt="Perguntas frequentes." /></span>} />
      <div className="faq mt-12 grid gap-x-10 lg:grid-cols-12">
        <p className="mb-8 text-[14px] leading-relaxed text-muted lg:col-span-3 lg:mb-0 lg:pt-8">
          <T
            en={<>Another question, or a controller that isn’t working right? <A href="#contact">Get in touch</A>.</>}
            pt={<>Ficou com outra dúvida, ou algum controle não funcionou direito? <A href="#contact">Fale com a gente</A>.</>}
          />
        </p>
        <div className="lg:col-span-9">
          <FaqList items={items} />
        </div>
      </div>
    </section>
  );
}
