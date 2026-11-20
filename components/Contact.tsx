import type { ReactNode } from "react";
import { t } from "@/lib/i18n-server";
import { ISSUES_URL, OFFICIAL_DOMAIN } from "@/lib/site";
import { rich } from "@/lib/text";
import { ContactButton } from "./ContactDialog";
import { GitHubIcon } from "./icons";
import { SectionHead } from "./SectionHead";

function Card({ title, children, foot }: { title: ReactNode; children?: ReactNode; foot?: ReactNode }) {
  return (
    <article className="card reveal flex flex-col p-6 sm:p-7" data-spotlight>
      <span className="rim" aria-hidden />
      <h3 className="text-[19px] font-semibold tracking-tight">{title}</h3>
      {children ? <div className="mt-3 space-y-3 text-[14.5px] leading-relaxed text-muted">{children}</div> : null}
      {foot ? <div className="mt-auto flex flex-wrap gap-2.5 pt-6">{foot}</div> : null}
    </article>
  );
}

export function Contact() {
  const m = t().home.contact;
  return (
    <section id="contact" aria-labelledby="contact-title" className="wrap py-20 sm:py-24">
      <SectionHead n="07" label={m.label} title={<span id="contact-title">{m.title}</span>}>
        {m.body}
      </SectionHead>

      <div className="mt-12 grid gap-3 md:grid-cols-3">
        <Card
          title={m.report.title}
          foot={
            <>
              <ContactButton className="btn btn-primary h-11 px-5 text-[14px]">{m.report.button}</ContactButton>
              <a className="btn btn-ghost h-11 px-5 text-[14px]" href={ISSUES_URL} target="_blank" rel="noopener noreferrer">
                <GitHubIcon />
                {m.report.issue}
              </a>
            </>
          }
        />
        <Card
          title={m.ideas.title}
          foot={
            <ContactButton kind="idea" className="btn btn-ghost h-11 px-5 text-[14px]">
              {m.ideas.button}
            </ContactButton>
          }
        />
        <Card title={m.official.title}>
          <p>{rich(m.official.body, { b: (c) => <span className="text-fg">{c}</span> }, { domain: OFFICIAL_DOMAIN })}</p>
        </Card>
      </div>
    </section>
  );
}
