import { faqItems } from "@/lib/faq";
import { getLang, t } from "@/lib/i18n-server";
import { FaqList } from "./FaqList";
import { SectionHead } from "./SectionHead";

export function Faq({ appReports, appMapping }: { appReports: boolean; appMapping: boolean }) {
  const m = t().home.faq;
  const items = faqItems(getLang(), appReports, appMapping);
  return (
    <section id="faq" aria-labelledby="faq-title" className="wrap py-20 sm:py-24">
      <SectionHead n="06" label={m.label} title={<span id="faq-title">{m.title}</span>} />
      <div className="faq mt-12 grid gap-x-10 lg:grid-cols-12">
        <div className="lg:col-span-9 lg:col-start-4">
          <FaqList items={items} />
        </div>
      </div>
    </section>
  );
}
