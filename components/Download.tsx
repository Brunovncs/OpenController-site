import type { ReactNode } from "react";
import { formatSize, platformsFor, type Os, type Platform, type Release } from "@/lib/github";
import { BUILD_URL, LATEST_URL, RELEASES_URL } from "@/lib/site";
import { ArrowIcon, DownloadIcon } from "./icons";
import { LocalLink } from "./LocalLink";
import { T } from "./T";

/** `ask` is the question next to the main button that offers this build instead. */
export const PLATFORM_LABEL: Record<Platform, { en: string; pt: string; short: string; ask: { en: string; pt: string } }> = {
  "windows-x64": { en: "Windows", pt: "Windows", short: "Windows x64", ask: { en: "Intel or AMD PC?", pt: "PC com Intel ou AMD?" } },
  "windows-arm64": { en: "Windows on ARM", pt: "Windows no ARM", short: "Windows ARM", ask: { en: "ARM PC?", pt: "PC com ARM?" } },
  "linux-x64": { en: "Linux", pt: "Linux", short: "Linux x64", ask: { en: "Intel or AMD computer?", pt: "Computador com Intel ou AMD?" } },
  "linux-arm64": { en: "Linux on ARM", pt: "Linux no ARM", short: "Linux ARM", ask: { en: "ARM computer?", pt: "Computador com ARM?" } },
  "macos-universal": { en: "Mac", pt: "Mac", short: "macOS", ask: { en: "Mac?", pt: "Mac?" } },
  "macos-arm64": { en: "Mac, Apple silicon", pt: "Mac, Apple silicon", short: "macOS Apple silicon", ask: { en: "Apple silicon Mac?", pt: "Mac com Apple silicon?" } },
  "macos-x64": { en: "Mac, Intel", pt: "Mac, Intel", short: "macOS Intel", ask: { en: "Intel Mac?", pt: "Mac com Intel?" } },
};

function fileKind(name: string) {
  if (name.endsWith("-setup.exe")) return "installer";
  return name.endsWith(".tar.gz") ? "tar.gz" : name.split(".").pop() ?? "";
}

/** What to say when a platform has no build in the latest release. */
export function MissingBuild({ platform, release }: { platform: Platform; release: Release }) {
  const os = PLATFORM_LABEL[platform];
  return <T en={`No ${os.en} build in ${release.version}`} pt={`Sem versão para ${os.pt} na ${release.version}`} />;
}

function Primary({ platform, release, quiet, children }: { platform: Platform; release: Release | null; quiet?: boolean; children?: ReactNode }) {
  const os = PLATFORM_LABEL[platform];

  if (!release) {
    return (
      <div>
        <a href={LATEST_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary h-12 px-5 text-[15px]">
          <DownloadIcon width={18} height={18} />
          <T en="Download from GitHub" pt="Baixar no GitHub" />
        </a>
        <p className="mt-3 text-[13px] text-faint">
          <T en="GitHub did not answer just now. The releases page has every build." pt="O GitHub não respondeu agora. A página de versões tem todos os arquivos." />
        </p>
      </div>
    );
  }

  const asset = release.assets[platform];
  if (!asset) {
    return (
      <div>
        <div className="flex h-12 items-center gap-3 rounded-xl border border-dashed border-line-strong px-5 text-[15px] text-muted">
          <span className="size-1.5 rounded-full bg-warn" aria-hidden />
          <MissingBuild platform={platform} release={release} />
        </div>
        <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-muted">
          <a href={BUILD_URL} target="_blank" rel="noopener noreferrer" className="underline decoration-line-strong underline-offset-4 hover:text-fg hover:decoration-fg">
            <T en="Build it yourself" pt="Compile você mesmo" />
          </a>
          <a href={RELEASES_URL} target="_blank" rel="noopener noreferrer" className="underline decoration-line-strong underline-offset-4 hover:text-fg hover:decoration-fg">
            <T en="All releases" pt="Todas as versões" />
          </a>
        </p>
        {children}
      </div>
    );
  }

  return (
    <div>
      <a href={asset.url} className="btn btn-primary h-12 px-5 text-[15px]">
        <DownloadIcon width={18} height={18} />
        <T en={`Download for ${os.en}`} pt={`Baixar para ${os.pt}`} />
      </a>
      <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[12px] text-faint">
        <span>
          {release.version} · {fileKind(asset.name)} · {formatSize(asset.size)}
        </span>
        {asset.shaUrl && !quiet ? (
          <>
            <span aria-hidden>·</span>
            <a href={asset.shaUrl} className="underline decoration-line-strong underline-offset-4 hover:text-fg">
              SHA-256
            </a>
          </>
        ) : null}
        <span aria-hidden>·</span>
        <LocalLink path={`/changelog#v${release.version}`} className="underline decoration-line-strong underline-offset-4 hover:text-fg">
          <T en="What's new" pt="Novidades" />
        </LocalLink>
      </p>
      {children}
    </div>
  );
}

function OtherArch({ platform, release }: { platform: Platform; release: Release | null }) {
  const asset = release?.assets[platform];
  const label = PLATFORM_LABEL[platform].ask;
  return (
    <p className="mt-2 text-[13px] text-muted">
      <T en={label.en} pt={label.pt} />{" "}
      {asset ? (
        <a href={asset.url} className="text-fg underline decoration-line-strong underline-offset-4 hover:decoration-fg">
          <T en={`Download for ${PLATFORM_LABEL[platform].en}`} pt={`Baixar para ${PLATFORM_LABEL[platform].pt}`} />
        </a>
      ) : release ? (
        <MissingBuild platform={platform} release={release} />
      ) : (
        <a href={LATEST_URL} target="_blank" rel="noopener noreferrer" className="text-fg underline decoration-line-strong underline-offset-4">
          GitHub
        </a>
      )}
    </p>
  );
}

/**
 * One system's download. With two builds (ARM and x64), <html data-arch> picks the main one and the
 * other is offered under it.
 */
function OsDownload({ os, release, quiet }: { os: Os; release: Release | null; quiet?: boolean }) {
  const builds = platformsFor(os, release);
  if (builds.length === 1) return <Primary platform={builds[0]} release={release} quiet={quiet} />;
  const arm = builds.find((p) => p.endsWith("-arm64")) ?? builds[0];
  const x64 = builds.find((p) => p !== arm) ?? builds[1];
  return (
    <>
      <div className="arch-variant" data-for="arm64">
        <Primary platform={arm} release={release} quiet={quiet}>
          <OtherArch platform={x64} release={release} />
        </Primary>
      </div>
      <div className="arch-variant" data-for="x64">
        <Primary platform={x64} release={release} quiet={quiet}>
          <OtherArch platform={arm} release={release} />
        </Primary>
      </div>
    </>
  );
}

/** The download that already knows the visitor's system, from <html data-os/data-arch>. */
export function Download({ release, quiet, platformsHref = "#platforms" }: { release: Release | null; quiet?: boolean; platformsHref?: string }) {
  return (
    <div>
      <div className="os-variant" data-for="windows">
        <OsDownload os="windows" release={release} quiet={quiet} />
      </div>
      <div className="os-variant" data-for="linux">
        <OsDownload os="linux" release={release} quiet={quiet} />
      </div>
      <div className="os-variant" data-for="mac">
        <OsDownload os="mac" release={release} quiet={quiet} />
      </div>
      <div className="os-variant" data-for="other">
        <a href={platformsHref} className="btn btn-primary h-12 px-5 text-[15px]">
          <T en="Download for Windows, Linux or Mac" pt="Baixar para Windows, Linux ou Mac" />
          <ArrowIcon />
        </a>
        <p className="mt-3 text-[13px] text-faint">
          <T en="OpenController runs on a computer. Open this page there to get the right download." pt="O OpenController roda no computador. Abra esta página nele para baixar a versão certa." />
        </p>
      </div>
    </div>
  );
}
