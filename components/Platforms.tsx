import type { ReactNode } from "react";
import { formatSize, type Platform, type Release } from "@/lib/github";
import { LATEST_URL } from "@/lib/site";
import { MissingBuild, PLATFORM_LABEL } from "./Download";
import { CheckIcon, DashIcon, DownloadIcon } from "./icons";
import { SectionHead } from "./SectionHead";
import { T } from "./T";

type Cell = true | false | { en: string; pt: string };

const ROWS: { k: { en: string; pt: string }; w: Cell; l: Cell; m: Cell }[] = [
  { k: { en: "Your controller works in games", pt: "Seu controle funciona nos jogos" }, w: true, l: true, m: { en: "By macOS", pt: "Pelo macOS" } },
  { k: { en: "Each controller keeps its player", pt: "Cada controle mantém seu jogador" }, w: true, l: true, m: false },
  { k: { en: "Games don't see a controller twice", pt: "Os jogos não veem o controle duas vezes" }, w: true, l: true, m: false },
  { k: { en: "Extra buttons as other buttons", pt: "Botões extras como outros botões" }, w: true, l: true, m: false },
  { k: { en: "Extra buttons as keys and macros", pt: "Botões extras como teclas e macros" }, w: true, l: true, m: true },
  { k: { en: "Aim by moving, fix for drifting sticks", pt: "Mira com movimento, correção de drift" }, w: true, l: true, m: false },
  { k: { en: "Light bar, low battery blink", pt: "Barra de luz, aviso de bateria" }, w: true, l: true, m: true },
  { k: { en: "Profiles for each game", pt: "Perfis para cada jogo" }, w: true, l: true, m: true },
  { k: { en: "Buttons of handheld PCs", pt: "Botões de PCs portáteis" }, w: true, l: false, m: false },
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
          en="The same app on all three. What it can do depends on what each system lets an app do with a controller."
          pt="O mesmo app nos três. O que ele consegue fazer depende do que cada sistema deixa um app fazer com um controle."
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
              en="64-bit. It needs two free drivers by Nefarius, the same ones DS4Windows uses: ViGEmBus, so games can see your controller, and HidHide, so they don't see it twice. The app installs them for you from Settings, Requirements, with one click."
              pt="64 bits. Precisa de dois drivers gratuitos da Nefarius, os mesmos que o DS4Windows usa: ViGEmBus, para os jogos verem seu controle, e HidHide, para não o verem duas vezes. O app instala os dois para você em Configurações, Requisitos, com um clique."
            />
          </p>
          <p>
            <T
              en="It does not need administrator rights. It is not signed yet, so Windows warns the first time you open it: click More info, then Run anyway."
              pt="Não precisa de administrador. Ele ainda não é assinado, então o Windows avisa na primeira vez que você abre: clique em Mais informações, depois em Executar assim mesmo."
            />
          </p>
        </Req>
        <Req title="Linux" foot={<PlatformDownload platform="linux-x64" release={release} />}>
          <p>
            <T
              en="64-bit, on any distribution as recent as Ubuntu 22.04. The same app and features as on Windows, except the buttons of handheld PCs. It works with native games and with games under Wine and Proton."
              pt="64 bits, em qualquer distribuição tão recente quanto o Ubuntu 22.04. O mesmo app e os mesmos recursos do Windows, menos os botões de PCs portáteis. Funciona com jogos nativos e com jogos no Wine e no Proton."
            />
          </p>
          <p>
            <T
              en="The installer adds a permission rule once and asks for your password. Profiles switch by themselves for X11 programs, which includes games under Wine and Proton."
              pt="O instalador adiciona uma regra de permissão uma vez e pede sua senha. Os perfis trocam sozinhos para programas X11, o que inclui jogos no Wine e no Proton."
            />
          </p>
        </Req>
        <Req title="macOS 13+" foot={<div className="space-y-2"><PlatformDownload platform="macos-arm64" release={release} /><PlatformDownload platform="macos-x64" release={release} /></div>}>
          <p>
            <T
              en="Apple silicon and Intel. Games on a Mac already support PlayStation, Xbox and Switch Pro controllers, and macOS does not let apps add controllers of their own."
              pt="Apple silicon e Intel. Os jogos no Mac já aceitam controles de PlayStation, Xbox e Switch Pro, e o macOS não deixa apps criarem controles próprios."
            />
          </p>
          <p>
            <T
              en="So on a Mac, Open Controller adds what is missing: extra buttons as keys and macros, the light bar, battery and profiles. It asks for the Accessibility permission to type keys. The first time, open it with a right-click and Open."
              pt="Então no Mac o Open Controller acrescenta o que falta: botões extras como teclas e macros, a barra de luz, a bateria e os perfis. Ele pede a permissão de Acessibilidade para digitar teclas. Na primeira vez, abra com o botão direito e Abrir."
            />
          </p>
        </Req>
      </div>
    </section>
  );
}
