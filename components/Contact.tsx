import { t } from "@/lib/i18n-server";
import { ISSUES_URL } from "@/lib/site";
import { ContactButton } from "./ContactDialog";
import { GitHubIcon } from "./icons";
import { SectionHead } from "./SectionHead";

export function Contact() {
  const m = t().home.contact;
  return (
    <section id="contact" aria-labelledby="contact-title" className="wrap py-20 sm:py-24">
      <SectionHead id="contact-title" title={m.title} />
      <div className="reveal mt-10 flex flex-wrap justify-center gap-2.5">
        <ContactButton className="btn btn-primary h-11 px-5 text-[14px]">{m.report}</ContactButton>
        <a className="btn btn-ghost h-11 px-5 text-[14px]" href={ISSUES_URL} target="_blank" rel="noopener noreferrer">
          <GitHubIcon />
          {m.issue}
        </a>
        <ContactButton kind="idea" className="btn btn-ghost h-11 px-5 text-[14px]">
          {m.idea}
        </ContactButton>
      </div>
    </section>
  );
}
