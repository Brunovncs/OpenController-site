import type { ReactNode } from "react";
import { formatSize, platformsFor, type Os, type Platform, type Release } from "@/lib/github";
import { LATEST_URL } from "@/lib/site";
import { t } from "@/lib/i18n-server";
import type { HomeMessages } from "@/messages/en/home";
import { MissingBuild, PLATFORM_SHORT } from "./Download";
import { CheckIcon, DashIcon, DownloadIcon } from "./icons";
import { SectionHead } from "./SectionHead";

/** "note" shows the row's text for macOS from home.platforms.rows. */
type Cell = boolean | "note";
type RowId = keyof HomeMessages["platforms"]["rows"];

const ROWS: { id: RowId; w: Cell; l: Cell; m: Cell }[] = [
  { id: "games", w: true, l: true, m: "note" },
  { id: "players", w: true, l: true, m: false },
  { id: "remap", w: true, l: true, m: "note" },
  { id: "light", w: true, l: true, m: true },
];

function CellView({ c, note }: { c: Cell; note: string }) {
  const m = t().home.platforms;
  if (c === true)
    return (
      <span className="inline-flex text-accent">
        <CheckIcon />
        <span className="sr-only">{m.yes}</span>
      </span>
    );
  if (c === false)
    return (
      <span className="inline-flex text-faint">
        <DashIcon />
        <span className="sr-only">{m.no}</span>
      </span>
    );
  return <span className="text-[12.5px] text-muted sm:text-[13px]">{note}</span>;
}

function PlatformDownload({ platform, release }: { platform: Platform; release: Release | null }) {
  const asset = release?.assets[platform];
  if (!release)
    return (
      <a href={LATEST_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost h-10 px-4 text-[13.5px]">
        <DownloadIcon /> GitHub
      </a>
    );
  if (!asset)
    return (
      <p className="flex h-10 items-center gap-2 text-[13.5px] text-muted">
        <span className="size-1.5 rounded-full bg-warn" aria-hidden />
        <MissingBuild platform={platform} release={release} />
      </p>
    );
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      <a href={asset.url} className="btn btn-ghost h-10 px-4 text-[13.5px]">
        <DownloadIcon />
        {PLATFORM_SHORT[platform]}
      </a>
      <span className="font-mono text-[11.5px] text-faint">
        {formatSize(asset.size)}
        {asset.shaUrl ? (
          <>
            {" · "}
            <a href={asset.shaUrl} className="underline decoration-line-strong underline-offset-4 hover:text-fg">
              SHA-256
            </a>
          </>
        ) : null}
      </span>
    </div>
  );
}

function OsDownloads({ os, release }: { os: Os; release: Release | null }) {
  return (
    <div className="space-y-2">
      {platformsFor(os, release).map((p) => (
        <PlatformDownload key={p} platform={p} release={release} />
      ))}
    </div>
  );
}

function Req({ title, children, foot }: { title: ReactNode; children: ReactNode; foot: ReactNode }) {
  return (
    <article className="card reveal flex flex-col p-6 sm:p-7" data-spotlight>
      <span className="rim" aria-hidden />
      <h3 className="text-[19px] font-semibold tracking-tight">{title}</h3>
      <div className="mt-3 space-y-3 text-[14px] leading-relaxed text-muted">{children}</div>
      <div className="mt-auto pt-6">{foot}</div>
    </article>
  );
}

export function Platforms({ release }: { release: Release | null }) {
  const m = t().home.platforms;
  return (
    <section id="platforms" aria-labelledby="platforms-title" className="wrap py-20 sm:py-24">
      <SectionHead n="05" label={m.label} title={<span id="platforms-title">{m.title}</span>}>
        {m.body}
      </SectionHead>

      <div className="reveal mt-14">
        <table className="w-full border-collapse text-left text-[13px] sm:text-[14px]">
          <caption className="sr-only">{m.caption}</caption>
          <thead>
            <tr className="border-b border-line-strong">
              <th scope="col" className="w-[44%] py-3 pr-3 font-normal text-faint sm:pr-4">
                <span className="sr-only">{m.feature}</span>
              </th>
              <th scope="col" className="py-3 pr-2 font-medium sm:pr-4">
                Windows
              </th>
              <th scope="col" className="py-3 pr-2 font-medium sm:pr-4">
                Linux
              </th>
              <th scope="col" className="py-3 font-medium">
                macOS
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => {
              const row = m.rows[r.id];
              return (
                <tr key={r.id} className="border-b border-line">
                  <th scope="row" className="py-3 pr-3 font-normal text-muted sm:pr-4">
                    {row.label}
                  </th>
                  <td className="py-3 pr-2 sm:pr-4">
                    <CellView c={r.w} note={row.mac} />
                  </td>
                  <td className="py-3 pr-2 sm:pr-4">
                    <CellView c={r.l} note={row.mac} />
                  </td>
                  <td className="py-3">
                    <CellView c={r.m} note={row.mac} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-10 grid gap-3 lg:grid-cols-3">
        <Req title={m.windows.title} foot={<OsDownloads os="windows" release={release} />}>
          {m.windows.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Req>
        <Req title={m.linux.title} foot={<OsDownloads os="linux" release={release} />}>
          {m.linux.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Req>
        <Req title={m.mac.title} foot={<OsDownloads os="mac" release={release} />}>
          {m.mac.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Req>
      </div>
    </section>
  );
}
