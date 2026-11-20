import { faqItems } from "@/lib/faq";
import { getLang, t } from "@/lib/i18n-server";
import { FaqList } from "./FaqList";
import { SectionHead } from "./SectionHead";

export function Faq({ appReports, appMapping }: { appReports: boolean; appMapping: boolean }) {
  const m = t().home.faq;
  const items = faqItems(getLang(), appReports, appMapping);
  return (
    <section id="faq" aria-labelledby="faq-title" className="wrap py-20 sm:py-24">
      <SectionHead id="faq-title" title={m.title} />
      <div className="faq mx-auto mt-12 max-w-[50rem]">
        <FaqList items={items} />
      </div>
    </section>
  );
}
