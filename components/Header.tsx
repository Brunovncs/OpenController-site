import Image from "next/image";
import { REPO_URL } from "@/lib/site";
import { GitHubIcon, StarIcon } from "./icons";
import { LangToggle } from "./lang";
import { T } from "./T";

export const NAV = [
  { id: "check", en: "Test", pt: "Testar" },
  { id: "features", en: "Features", pt: "Recursos" },
  { id: "performance", en: "Performance", pt: "Desempenho" },
  { id: "controllers", en: "Controllers", pt: "Controles" },
  { id: "platforms", en: "Download", pt: "Baixar" },
  { id: "faq", en: "FAQ", pt: "Dúvidas" },
  { id: "contact", en: "Contact", pt: "Contato" },
];

export function GitHubButton({ stars }: { stars: number | null }) {
  return (
    <a
      href={REPO_URL} target="_blank" rel="noopener noreferrer"
      className="btn btn-ghost h-9 gap-2 rounded-[10px] px-3 text-[13px]"
      aria-label={stars ? `GitHub, ${stars} stars` : "GitHub"}
    >
      <GitHubIcon />
      <span className="hidden sm:inline">GitHub</span>
      {stars ? (
        <span className="flex items-center gap-1 border-l border-line-strong pl-2 font-mono text-[12px] text-muted">
          <StarIcon width={12} height={12} />
          {stars.toLocaleString("en-US")}
        </span>
      ) : null}
    </a>
  );
}

/**
 * `path` is the page's English path, for the language switch. `home` is set on pages other than
 * the home page: the home page's URL in this language, so the section links lead back to it.
 */
export function Header({ stars, version, path = "/", home = "" }: { stars: number | null; version: string | null; path?: string; home?: string }) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/75 backdrop-blur-xl backdrop-saturate-150">
      <div className="wrap flex h-14 items-center gap-4">
        <a href={home || "#top"} className="flex items-center gap-2.5 rounded-md">
          <Image src="/brand/icon-small.svg" alt="" width={26} height={26} priority />
          <span className="text-[15px] font-semibold tracking-tight">OpenController</span>
          {version ? <span className="hidden font-mono text-[11px] text-faint sm:inline">{version}</span> : null}
        </a>
        <nav aria-label="Main" className="ml-6 hidden min-[1100px]:block">
          <ul className="flex items-center gap-1 text-[13.5px] text-muted">
            {NAV.map((n) => (
              <li key={n.id}>
                <a href={`${home}#${n.id}`} className="rounded-md px-2.5 py-1.5 transition-colors hover:bg-white/[0.05] hover:text-fg">
                  <T en={n.en} pt={n.pt} />
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <LangToggle path={path} />
          <GitHubButton stars={stars} />
        </div>
      </div>
      <div className="progress" aria-hidden />
    </header>
  );
}
