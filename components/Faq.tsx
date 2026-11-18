import { faqItems } from "@/lib/faq";
import { getLang, t } from "@/lib/i18n-server";
import { rich } from "@/lib/text";
import { A, FaqList } from "./FaqList";
import { SectionHead } from "./SectionHead";

export function Faq({ appReports, appMapping }: { appReports: boolean; appMapping: boolean }) {
  const m = t().home.faq;
  const items = faqItems(getLang(), appReports, appMapping);
  return (
    <section id="faq" aria-labelledby="faq-title" className="wrap py-20 sm:py-24">
      <SectionHead n="06" label={m.label} title={<span id="faq-title">{m.title}</span>} />
      <div className="faq mt-12 grid gap-x-10 lg:grid-cols-12">
        <p className="mb-8 text-[14px] leading-relaxed text-muted lg:col-span-3 lg:mb-0 lg:pt-8">
          {rich(m.side, { a: (c) => <A href="#contact">{c}</A> })}
        </p>
        <div className="lg:col-span-9">
          <FaqList items={items} />
        </div>
      </div>
    </section>
  );
}
