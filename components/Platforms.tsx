import type { ReactNode } from "react";
import { formatSize, type Platform, type Release } from "@/lib/github";
import { LATEST_URL } from "@/lib/site";
import { MissingBuild, PLATFORM_LABEL } from "./Download";
import { CheckIcon, DashIcon, DownloadIcon } from "./icons";
import { SectionHead } from "./SectionHead";
import { T } from "./T";

type Cell = true | false | { en: string; pt: string };

const ROWS: { k: { en: string; pt: string }; w: Cell; l: Cell; m: Cell }[] = [
  { k: { en: "Works in your games", pt: "Funciona nos seus jogos" }, w: true, l: true, m: { en: "Built into macOS", pt: "Já vem no macOS" } },
  { k: { en: "Each friend stays the same player", pt: "Cada amigo continua sendo o mesmo jogador" }, w: true, l: true, m: false },
  { k: { en: "Extra buttons and a setup per game", pt: "Botões extras e configuração por jogo" }, w: true, l: true, m: { en: "As keys", pt: "Como teclas" } },
  { k: { en: "Controller light and battery", pt: "Luz do controle e bateria" }, w: true, l: true, m: true },
];

function CellView({ c }: { c: Cell }) {
  if (c === true)
    return (
      <span className="inline-flex text-accent">
        <CheckIcon />
        <span className="sr-only">
          <T en="Yes" pt="Sim" />
        </span>
      </span>
    );
  if (c === false)
    return (
      <span className="inline-flex text-faint">
        <DashIcon />
        <span className="sr-only">
          <T en="No" pt="Não" />
        </span>
      </span>
    );
  return (
    <span className="text-[12.5px] text-muted sm:text-[13px]">
      <T en={c.en} pt={c.pt} />
    </span>
  );
}

function PlatformDownload({ platform, release }: { platform: Platform; release: Release | null }) {
  const asset = release?.assets[platform];
  if (!release)
    return (
      <a href={LATEST_URL} className="btn btn-ghost h-10 px-4 text-[13.5px]">
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
        {PLATFORM_LABEL[platform].short}
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
  return (
    <section id="platforms" aria-labelledby="platforms-title" className="wrap py-20 sm:py-24">
      <SectionHead
        n="04"
        label={<T en="Platforms" pt="Sistemas" />}
        title={
          <span id="platforms-title">
            <T en="Download for Windows, Linux or Mac." pt="Baixe para Windows, Linux ou Mac." />
          </span>
        }
      >
        <T
          en="The same app on all three. A Mac already handles controllers on its own, so there it does a little less."
          pt="O mesmo app nos três. O Mac já cuida dos controles sozinho, então lá ele faz um pouco menos."
        />
      </SectionHead>

      <div className="reveal mt-14">
        <table className="w-full border-collapse text-left text-[13px] sm:text-[14px]">
          <caption className="sr-only">
            <T en="What works on each system" pt="O que funciona em cada sistema" />
          </caption>
          <thead>
            <tr className="border-b border-line-strong">
              <th scope="col" className="w-[44%] py-3 pr-3 font-normal text-faint sm:pr-4">
                <span className="sr-only">
                  <T en="Feature" pt="Recurso" />
                </span>
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
            {ROWS.map((r) => (
              <tr key={r.k.en} className="border-b border-line">
                <th scope="row" className="py-3 pr-3 font-normal text-muted sm:pr-4">
                  <T en={r.k.en} pt={r.k.pt} />
                </th>
                <td className="py-3 pr-2 sm:pr-4">
                  <CellView c={r.w} />
                </td>
                <td className="py-3 pr-2 sm:pr-4">
                  <CellView c={r.l} />
                </td>
                <td className="py-3">
                  <CellView c={r.m} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10 grid gap-3 lg:grid-cols-3">
        <Req title="Windows 10, 11" foot={<PlatformDownload platform="windows-x64" release={release} />}>
          <p>
            <T
              en="64-bit. It installs without administrator rights and updates without reinstalling. It needs two free drivers and installs them for you with one click."
              pt="64 bits. Instala sem precisar de administrador e se atualiza sem reinstalar. Precisa de dois drivers gratuitos e instala os dois para você com um clique."
            />
          </p>
          <p>
            <T
              en="The installer is not signed yet, so the first time Windows may show a blue “Windows protected your PC” warning. Click More info, then Run anyway."
              pt="Como o instalador ainda não é assinado, na primeira vez o Windows pode mostrar um aviso azul, “O Windows protegeu o computador”. Clique em Mais informações e depois em Executar assim mesmo."
            />
          </p>
        </Req>
        <Req title="Linux" foot={<PlatformDownload platform="linux-x64" release={release} />}>
          <p>
            <T
              en="64-bit, Ubuntu 22.04 or newer, or any other distribution as recent. The same app as on Windows. It works with native games and with games running through Proton or Wine."
              pt="64 bits, Ubuntu 22.04 ou mais novo, ou outra distribuição tão recente quanto. O mesmo app do Windows. Funciona com jogos nativos e com os que rodam pelo Proton ou pelo Wine."
            />
          </p>
          <p>
            <T
              en="The installer asks for your password once, to let the app use your controllers."
              pt="O instalador pede sua senha uma vez, para o app poder usar seus controles."
            />
          </p>
        </Req>
        <Req title="macOS 13+" foot={<div className="space-y-2"><PlatformDownload platform="macos-arm64" release={release} /><PlatformDownload platform="macos-x64" release={release} /></div>}>
          <p>
            <T
              en="For Macs with an Apple or Intel chip. On a Mac, games already work with PlayStation, Xbox and Switch Pro controllers, and the system doesn't let apps add controllers of their own."
              pt="Para Mac com chip da Apple ou Intel. No Mac, os jogos já aceitam controles de PlayStation, Xbox e Switch Pro, e o sistema não deixa outros apps criarem controles."
            />
          </p>
          <p>
            <T
              en="So on a Mac it adds what is missing: extra buttons as keys, the controller light, the battery and a setup for each game. The first time, right-click the app and choose Open."
              pt="Por isso, no Mac ele completa o que falta: botões extras como teclas, a luz do controle, a bateria e uma configuração para cada jogo. Na primeira vez, clique no app com o botão direito e escolha Abrir."
            />
          </p>
        </Req>
      </div>
    </section>
  );
}
