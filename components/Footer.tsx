import Image from "next/image";
import type { ReactNode } from "react";
import { COFFEE_URL, LICENSE_URL, OFFICIAL_DOMAIN, REPO, REPO_URL, TWITTER_URL } from "@/lib/site";
import { ContactButton } from "./ContactDialog";
import { t } from "@/lib/i18n-server";
import { LangMenu } from "./lang";
import { LocalLink } from "./LocalLink";
import { rich } from "@/lib/text";

const LINK = "text-muted transition-colors hover:text-fg";
const INLINE = "underline underline-offset-2 transition-colors hover:text-fg";

function out(href: string) {
  return function OutLink(c: ReactNode) {
    return (
      <a className={INLINE} href={href} target="_blank" rel="noopener noreferrer">
        {c}
      </a>
    );
  };
}

export function Footer({ version, path = "/", home = "" }: { version: string | null; path?: string; home?: string }) {
  const m = t().home.footer;
  return (
    <footer className="border-t border-line">
      <div className="wrap grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3">
            <Image src="/brand/icon.svg" alt="" width={40} height={40} />
            <div>
              <p className="text-[15px] font-semibold">OpenController</p>
              {version ? <p className="font-mono text-[11.5px] text-faint">v{version}</p> : null}
            </div>
          </div>
        </div>
        <nav aria-label={m.nav} className="text-[14px] lg:col-span-4">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5">
            <li>
              <a className={LINK} href={REPO_URL} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <LocalLink className={LINK} path="/controllers">
                {m.controllers}
              </LocalLink>
            </li>
            <li>
              <LocalLink className={LINK} path="/help">
                {t().common.help}
              </LocalLink>
            </li>
            <li>
              <LocalLink className={LINK} path="/changelog">
                {m.whatsNew}
              </LocalLink>
            </li>
            <li>
              <a className={LINK} href={`${home}#contact`}>
                {m.report}
              </a>
            </li>
            <li>
              <ContactButton kind="other" className={LINK}>
                {m.contact}
              </ContactButton>
            </li>
            <li>
              <a className={LINK} href={COFFEE_URL} target="_blank" rel="noopener noreferrer">
                {t().common.coffee}
              </a>
            </li>
            <li>
              <a className={LINK} href={LICENSE_URL} target="_blank" rel="noopener noreferrer">
                {m.license}
              </a>
            </li>
            <li>
              <a className={LINK} href={`${REPO_URL}/blob/main/THIRD_PARTY_NOTICES.md`} target="_blank" rel="noopener noreferrer">
                {m.notices}
              </a>
            </li>
          </ul>
        </nav>
        <div className="flex items-start sm:col-span-2 lg:col-span-3 lg:justify-end">
          <LangMenu path={path} label={t().common.language} up />
        </div>
      </div>
      <div className="wrap">
        <div className="space-y-3 border-t border-line py-6">
          <p className="max-w-4xl text-[12.5px] leading-relaxed text-muted">
            {rich(m.official, { a: out(REPO_URL) }, { repo: `github.com/${REPO}`, domain: OFFICIAL_DOMAIN })}
          </p>
          <p className="max-w-4xl text-[12px] leading-relaxed text-faint">{m.disclaimer}</p>
          <p className="max-w-4xl text-[12px] leading-relaxed text-faint">{m.analytics}</p>
          <p className="text-[12.5px] text-muted">{rich(m.madeBy, { a: out(TWITTER_URL) }, { name: "Bruno Vinicius (@zenorev)" })}</p>
        </div>
      </div>
    </footer>
  );
}
