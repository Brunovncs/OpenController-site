import type { ReactNode } from "react";
import { formatSize, type Platform, type Release } from "@/lib/github";
import { BUILD_URL, LATEST_URL, RELEASES_URL } from "@/lib/site";
import { ArrowIcon, DownloadIcon } from "./icons";
import { T } from "./T";

export const PLATFORM_LABEL: Record<Platform, { en: string; pt: string; short: string }> = {
  "windows-x64": { en: "Windows", pt: "Windows", short: "Windows x64" },
  "linux-x64": { en: "Linux", pt: "Linux", short: "Linux x64" },
  "macos-arm64": { en: "Mac, Apple silicon", pt: "Mac, Apple silicon", short: "macOS Apple silicon" },
  "macos-x64": { en: "Mac, Intel", pt: "Mac, Intel", short: "macOS Intel" },
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
        <a href={LATEST_URL} className="btn btn-primary h-12 px-5 text-[15px]">
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
          <a href={BUILD_URL} className="underline decoration-line-strong underline-offset-4 hover:text-fg hover:decoration-fg">
            <T en="Build it yourself" pt="Compile você mesmo" />
          </a>
          <a href={RELEASES_URL} className="underline decoration-line-strong underline-offset-4 hover:text-fg hover:decoration-fg">
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
        <a href={release.url} className="underline decoration-line-strong underline-offset-4 hover:text-fg">
          <T en="What's new" pt="Novidades" />
        </a>
      </p>
      {children}
    </div>
  );
}

function OtherArch({ platform, release }: { platform: Platform; release: Release | null }) {
  const asset = release?.assets[platform];
  const label = platform === "macos-x64" ? { en: "Intel Mac?", pt: "Mac com Intel?" } : { en: "Apple silicon Mac?", pt: "Mac com Apple silicon?" };
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
        <a href={LATEST_URL} className="text-fg underline decoration-line-strong underline-offset-4">
          GitHub
        </a>
      )}
    </p>
  );
}

/** The download that already knows the visitor's system, from <html data-os/data-arch>. */
export function Download({ release, quiet }: { release: Release | null; quiet?: boolean }) {
  return (
    <div>
      <div className="os-variant" data-for="windows">
        <Primary platform="windows-x64" release={release} quiet={quiet} />
      </div>
      <div className="os-variant" data-for="linux">
        <Primary platform="linux-x64" release={release} quiet={quiet} />
      </div>
      <div className="os-variant" data-for="mac">
        <div className="arch-variant" data-for="arm64">
          <Primary platform="macos-arm64" release={release} quiet={quiet}>
            <OtherArch platform="macos-x64" release={release} />
          </Primary>
        </div>
        <div className="arch-variant" data-for="x64">
          <Primary platform="macos-x64" release={release} quiet={quiet}>
            <OtherArch platform="macos-arm64" release={release} />
          </Primary>
        </div>
      </div>
      <div className="os-variant" data-for="other">
        <a href="#platforms" className="btn btn-primary h-12 px-5 text-[15px]">
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
