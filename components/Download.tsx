import type { ReactNode } from "react";
import { formatSize, platformsFor, type Os, type Platform, type Release } from "@/lib/github";
import { BUILD_URL, LATEST_URL, RELEASES_URL } from "@/lib/site";
import { ArrowIcon, DownloadIcon } from "./icons";
import { t } from "@/lib/i18n-server";
import { fmt } from "@/lib/text";
import { LocalLink } from "./LocalLink";

/**
 * Each build's button label in the downloads list. Its name and the question that offers it next
 * to the main button are in home.download.platforms.
 */
export const PLATFORM_SHORT: Record<Platform, string> = {
  "windows-x64": "Windows x64",
  "windows-arm64": "Windows ARM",
  "linux-x64": "Linux x64",
  "linux-arm64": "Linux ARM",
  "macos-universal": "macOS",
  "macos-arm64": "macOS Apple silicon",
  "macos-x64": "macOS Intel",
};

function fileKind(name: string) {
  if (name.endsWith("-setup.exe")) return "installer";
  return name.endsWith(".tar.gz") ? "tar.gz" : name.split(".").pop() ?? "";
}

/** What to say when a platform has no build in the latest release. */
export function MissingBuild({ platform, release }: { platform: Platform; release: Release }) {
  const m = t().home.download;
  return <>{fmt(m.missing, { os: m.platforms[platform].name, version: release.version })}</>;
}

function Primary({ platform, release, quiet, children }: { platform: Platform; release: Release | null; quiet?: boolean; children?: ReactNode }) {
  const m = t().home.download;

  if (!release) {
    return (
      <div>
        <a href={LATEST_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary h-12 px-5 text-[15px]">
          <DownloadIcon width={18} height={18} />
          {m.github}
        </a>
        <p className="mt-3 text-[13px] text-faint">
          {m.githubDown}
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
            {m.build}
          </a>
          <a href={RELEASES_URL} target="_blank" rel="noopener noreferrer" className="underline decoration-line-strong underline-offset-4 hover:text-fg hover:decoration-fg">
            {m.releases}
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
        {fmt(m.for, { os: m.platforms[platform].name })}
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
          {m.whatsNew}
        </LocalLink>
      </p>
      {children}
    </div>
  );
}

function OtherArch({ platform, release }: { platform: Platform; release: Release | null }) {
  const asset = release?.assets[platform];
  const m = t().home.download;
  return (
    <p className="mt-2 text-[13px] text-muted">
      {m.platforms[platform].ask}{" "}
      {asset ? (
        <a href={asset.url} className="text-fg underline decoration-line-strong underline-offset-4 hover:decoration-fg">
          {fmt(m.for, { os: m.platforms[platform].name })}
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
  const m = t().home.download;
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
          {m.any}
          <ArrowIcon />
        </a>
        <p className="mt-3 text-[13px] text-faint">
          {m.phone}
        </p>
      </div>
    </div>
  );
}
