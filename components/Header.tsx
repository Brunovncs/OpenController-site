import Image from "next/image";
import { COFFEE_URL, REPO_URL } from "@/lib/site";
import { BmcIcon, GitHubIcon, StarIcon } from "./icons";
import { localePath } from "@/lib/i18n";
import { getLang, t } from "@/lib/i18n-server";
import { fmt } from "@/lib/text";
import { LangMenu } from "./lang";

/** The home page's sections, in order; their names are in messages common.nav. */
export const NAV = ["check", "features", "performance", "controllers", "platforms", "faq", "contact"] as const;

export function GitHubButton({ stars }: { stars: number | null }) {
  return (
    <a
      href={REPO_URL} target="_blank" rel="noopener noreferrer"
      className="btn btn-ghost h-9 gap-2 rounded-[10px] px-3 text-[13px]"
      aria-label={stars ? fmt(t().common.stars, { n: stars }) : "GitHub"}
    >
      <GitHubIcon />
      <span className="hidden sm:max-[1099px]:inline">GitHub</span>
      {stars ? (
        <span className="flex items-center gap-1 border-l border-line-strong pl-2 font-mono text-[12px] text-muted">
          <StarIcon width={12} height={12} />
          {stars.toLocaleString("en-US")}
        </span>
      ) : null}
    </a>
  );
}

function CoffeeButton() {
  return (
    <a
      href={COFFEE_URL} target="_blank" rel="noopener noreferrer"
      className="btn btn-ghost btn-split h-9 rounded-[10px] text-[13px] max-sm:hidden"
    >
      <span className="btn-split-icon">
        <BmcIcon />
      </span>
      <span className="sr-only md:max-[1099px]:not-sr-only min-[1240px]:not-sr-only">
        <span className="whitespace-nowrap px-3">
          {t().common.coffee}
        </span>
      </span>
    </a>
  );
}

/**
 * `path` is the page's English path, for the language switch. `home` is set on pages other than
 * the home page: the home page's URL in this language, so the section links lead back to it.
 */
export function Header({ stars, version, path = "/", home = "" }: { stars: number | null; version: string | null; path?: string; home?: string }) {
  const c = t().common;
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/75 backdrop-blur-xl backdrop-saturate-150">
      <div className="wrap flex h-14 items-center gap-4">
        <a href={home || "#top"} className="flex items-center gap-2.5 rounded-md">
          <Image src="/brand/icon-small.svg" alt="" width={26} height={26} priority />
          <span className="text-[15px] font-semibold tracking-tight">OpenController</span>
          {version ? <span className="hidden font-mono text-[11px] text-faint sm:inline">{version}</span> : null}
        </a>
        <nav aria-label={c.mainNav} className="ml-6 hidden min-[1100px]:block">
          <ul className="flex items-center gap-1 text-[13.5px] text-muted">
            {NAV.map((id) => (
              <li key={id}>
                <a href={`${home}#${id}`} className="rounded-md px-2.5 py-1.5 transition-colors hover:bg-white/[0.05] hover:text-fg">
                  {c.nav[id]}
                </a>
              </li>
            ))}
            <li>
              <a href={localePath(getLang(), "/help")} className="rounded-md px-2.5 py-1.5 transition-colors hover:bg-white/[0.05] hover:text-fg">
                {c.help}
              </a>
            </li>
          </ul>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <LangMenu path={path} label={c.language} />
          <CoffeeButton />
          <GitHubButton stars={stars} />
        </div>
      </div>
      <div className="progress" aria-hidden />
    </header>
  );
}
