import type { ReactNode } from "react";
import { formatSize, type Platform, type Release } from "@/lib/github";
import { LATEST_URL } from "@/lib/site";
import { MissingBuild, PLATFORM_LABEL } from "./Download";
import { CheckIcon, DashIcon, DownloadIcon } from "./icons";
import { SectionHead } from "./SectionHead";
import { T } from "./T";

type Cell = true | false | { en: string; pt: string };

const ROWS: { k: { en: string; pt: string }; w: Cell; l: Cell; m: Cell }[] = [
  { k: { en: "Games see an Xbox controller", pt: "Jogos veem um controle de Xbox" }, w: { en: "ViGEmBus", pt: "ViGEmBus" }, l: { en: "uinput", pt: "uinput" }, m: false },
  { k: { en: "Fixed player numbers", pt: "Números de jogador fixos" }, w: true, l: true, m: false },
  { k: { en: "Original hidden from games", pt: "Original oculto dos jogos" }, w: { en: "HidHide", pt: "HidHide" }, l: { en: "evdev grab", pt: "evdev grab" }, m: false },
  { k: { en: "Extra buttons as Xbox buttons", pt: "Botões extras como botões de Xbox" }, w: true, l: true, m: false },
  { k: { en: "Extra buttons as keys and macros", pt: "Botões extras como teclas e macros" }, w: true, l: true, m: true },
  { k: { en: "Gyro aim and stick deadzones", pt: "Mira por giroscópio e zona morta" }, w: true, l: true, m: false },
  { k: { en: "Light bar, low battery blink", pt: "Barra de luz, aviso de bateria" }, w: true, l: true, m: true },
  { k: { en: "Profiles per controller", pt: "Perfis por controle" }, w: true, l: true, m: true },
  { k: { en: "Handheld PC buttons", pt: "Botões de PCs portáteis" }, w: true, l: false, m: false },
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
    <span className="font-mono text-[11px] text-fg sm:text-[12px]">
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
            <T en="Windows, Linux and macOS, each as far as it allows." pt="Windows, Linux e macOS, cada um até onde permite." />
          </span>
        }
      >
        <T
          en="Each system lets a program do different things with a controller. Same window, same profiles, same table of models."
          pt="Cada sistema deixa um programa fazer coisas diferentes com um controle. A mesma janela, os mesmos perfis, a mesma tabela de modelos."
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
              en="x64. Two free drivers by Nefarius, the same ones DS4Windows uses: ViGEmBus, which creates the virtual Xbox controllers, and HidHide, which hides the originals so a game does not see a controller twice. Settings, Requirements in the window installs them when you click."
              pt="x64. Dois drivers gratuitos da Nefarius, os mesmos que o DS4Windows usa: ViGEmBus, que cria os controles de Xbox virtuais, e HidHide, que esconde os originais para o jogo não ver o controle duas vezes. Em Configurações, Requisitos, a janela instala os dois quando você clica."
            />
          </p>
          <p>
            <T
              en="No administrator rights for the app. It is not code-signed yet, so SmartScreen warns on the first start: More info, then Run anyway."
              pt="O app não precisa de administrador. Ele ainda não tem assinatura de código, então o SmartScreen avisa na primeira vez: Mais informações, depois Executar assim mesmo."
            />
          </p>
        </Req>
        <Req title="Linux" foot={<PlatformDownload platform="linux-x64" release={release} />}>
          <p>
            <T
              en="x64. Virtual Xbox 360 controllers through the kernel's uinput, with the physical controller hidden from games by an exclusive evdev grab. Same window and features, without handheld buttons."
              pt="x64. Controles de Xbox 360 virtuais pelo uinput do kernel, com o controle físico escondido dos jogos por um evdev grab exclusivo. A mesma janela e os mesmos recursos, sem os botões de portáteis."
            />
          </p>
          <p>
            <T
              en="It needs a udev rule once, which the app installs, asking for your password through pkexec. Profiles switch with the program in front on X11."
              pt="Precisa de uma regra udev uma vez, que o app instala pedindo sua senha pelo pkexec. Os perfis trocam com o programa em foco no X11."
            />
          </p>
        </Req>
        <Req title="macOS 13+" foot={<div className="space-y-2"><PlatformDownload platform="macos-arm64" release={release} /><PlatformDownload platform="macos-x64" release={release} /></div>}>
          <p>
            <T
              en="Apple silicon and Intel. macOS does not let apps create game controllers without a special entitlement from Apple, and games there already read DualSense, DualShock 4, Xbox and Switch Pro controllers."
              pt="Apple silicon e Intel. O macOS não deixa apps criarem controles de jogo sem uma permissão especial da Apple, e os jogos lá já leem DualSense, DualShock 4, Xbox e Switch Pro."
            />
          </p>
          <p>
            <T
              en="So here Open Controller is a companion: extra buttons as keys and macros, light bar, battery and profiles, without virtual controllers or player numbers. It needs the Accessibility permission to type keys."
              pt="Então aqui o Open Controller é um complemento: botões extras como teclas e macros, barra de luz, bateria e perfis, sem controles virtuais nem números de jogador. Precisa da permissão de Acessibilidade para digitar teclas."
            />
          </p>
        </Req>
      </div>
    </section>
  );
}
