import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FamilyDetail, RatingBadge } from "@/components/Compat";
import { ContactDialog } from "@/components/ContactDialog";
import { Download } from "@/components/Download";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ArrowIcon } from "@/components/icons";
import { GROUPS, HINTS } from "@/lib/families";
import { getLatestRelease, getStars } from "@/lib/github";
import { GUIDES, guideBySlug, guideDescription, guideModels, guidePath, guideTitle, type Guide } from "@/lib/guides";
import { LANGS, localePath, type L, type Lang } from "@/lib/i18n";
import { guideJsonLd, jsonLdScript, pageMeta } from "@/lib/seo";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.flatMap((lang) => GUIDES.map((g) => ({ lang, slug: g.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/controllers/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const g = guideBySlug(slug);
  if (!g) return {};
  const l = lang as Lang;
  const title = `${guideTitle(g)[l]} | OpenController`;
  return pageMeta(l, guidePath(g), title, guideDescription(g)[l]);
}

const LINK = "text-fg underline decoration-line-strong underline-offset-4 hover:decoration-fg";

function intro(g: Guide): L {
  const f = g.family;
  const n = { en: `the ${g.name.en}`, pt: `${g.plural ? "os" : "o"} ${g.name.pt}` };
  if (f.unsupported)
    return {
      en: `OpenController recognises ${n.en}, but cannot read ${g.plural ? "them" : "it"} yet. Until then, the list below shows the models it knows, and the contact form is the way to ask for support.`,
      pt: `O OpenController reconhece ${n.pt}, mas ainda não consegue ${g.plural ? "lê-los" : "lê-lo"}. Enquanto isso, a lista abaixo mostra os modelos que ele conhece, e o formulário de contato é o jeito de pedir suporte.`,
    };
  if (f.passthrough)
    return {
      en: `PC games already read ${n.en} on ${g.plural ? "their" : "its"} own. OpenController lists ${g.plural ? "them" : "it"} and leaves ${g.plural ? "them" : "it"} alone, so ${g.plural ? "they keep" : "it keeps"} a player number of ${g.plural ? "their" : "its"} own when friends join with other controllers.`,
      pt: `Os jogos de PC já leem ${n.pt} sozinhos. O OpenController ${g.plural ? "os lista e os deixa" : "o lista e o deixa"} como ${g.plural ? "estão" : "está"}, então ${g.plural ? "eles mantêm" : "ele mantém"} o próprio número de jogador quando os amigos entram com outros controles.`,
    };
  return {
    en: `Many PC games only understand the Xbox controller. With OpenController open, ${n.en} ${g.plural ? "show" : "shows"} up in your games as an Xbox 360 controller with ${g.plural ? "their" : "its"} own player number, and the original is hidden so the game doesn't see the same controller twice.`,
    pt: `Muitos jogos de PC só entendem o controle de Xbox. Com o OpenController aberto, ${n.pt} ${g.plural ? "aparecem" : "aparece"} nos seus jogos como um controle de Xbox 360, com o próprio número de jogador, e o original fica escondido para o jogo não ver o mesmo controle duas vezes.`,
  };
}

function steps(g: Guide): L[] {
  const f = g.family;
  const connect: L = { en: "Connect the controller by cable, Bluetooth or its receiver. It shows up in OpenController's window, drawn in its own shape.", pt: "Conecte o controle pelo cabo, Bluetooth ou receptor. Ele aparece na janela do OpenController, desenhado no próprio formato." };
  const download: L = {
    en: "Download OpenController and open it. On Windows, its Requirements page installs the free drivers it needs, when you click.",
    pt: "Baixe o OpenController e abra. No Windows, a página Requisitos instala com um clique os drivers gratuitos de que ele precisa.",
  };
  if (f.passthrough)
    return [
      download,
      connect,
      f.extras
        ? { en: "Open it in the app to set its extra buttons as keys or macros. Games keep reading it as they already did.", pt: "Abra-o no app para configurar os botões extras como teclas ou macros. Os jogos continuam lendo o controle como já faziam." }
        : { en: "Open your game. It keeps reading the controller as it already did, now with a steady player number.", pt: "Abra o jogo. Ele continua lendo o controle como já fazia, agora com o número de jogador fixo." },
    ];
  const out: L[] = [download, connect];
  if (f.extras) out.push({ en: "Click it to set what each extra button does: an Xbox button, a key or a recorded macro, with a profile per game if you want.", pt: "Clique nele para escolher o que cada botão extra faz: um botão de Xbox, uma tecla ou uma macro gravada, com um perfil por jogo se quiser." });
  if (f.gyro !== "no") out.push({ en: "To aim by moving the controller, turn it on under Motion: always, while aiming, or while holding a button.", pt: "Para mirar movendo o controle, ligue em Movimento: sempre, ao mirar ou segurando um botão." });
  out.push({ en: "Open your game and play. It sees an Xbox 360 controller.", pt: "Abra o jogo e jogue. Ele vê um controle de Xbox 360." });
  return out;
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="border-t border-line py-12 sm:py-14">
      <div className="grid gap-x-10 gap-y-6 lg:grid-cols-12">
        <h2 id={id} className="text-[22px] font-semibold tracking-tight lg:col-span-3">
          {title}
        </h2>
        <div className="max-w-[46rem] text-[15px] leading-relaxed text-muted lg:col-span-9">{children}</div>
      </div>
    </section>
  );
}

export default async function GuidePage({ params }: PageProps<"/[lang]/controllers/[slug]">) {
  const { lang: raw, slug } = await params;
  const lang = raw as Lang;
  const g = guideBySlug(slug);
  if (!g) notFound();
  const t = (l: L) => l[lang];
  const [release, stars] = await Promise.all([getLatestRelease(), getStars()]);
  const models = guideModels(g);
  const hints = [...new Set(models.map((m) => m.hint).filter((h): h is string => !!h && !!HINTS[h]))];
  const home = localePath(lang);
  const path = guidePath(g);
  const title = guideTitle(g);
  const description = guideDescription(g);
  const group = GROUPS.find((x) => x.id === g.family.group);
  const siblings = GUIDES.filter((x) => x.family.group === g.family.group && x.slug !== g.slug);
  const steamTip = g.family.group === "playstation" || g.family.group === "nintendo";

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(guideJsonLd(lang, g, t(description), models.map((m) => m.name))) }} />
      <a href="#main" className="skip">
        {lang === "pt" ? "Pular para o conteúdo" : "Skip to content"}
      </a>
      <Header stars={stars} version={release?.version ?? null} path={path} home={home} />

      <main id="main" className="wrap pb-16">
        <nav aria-label={lang === "pt" ? "Caminho" : "Breadcrumb"} className="pt-10 text-[13px] text-faint sm:pt-14">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <li>
              <a href={home} className="hover:text-fg">
                OpenController
              </a>
            </li>
            <li aria-hidden>/</li>
            <li>
              <a href={localePath(lang, "/controllers")} className="hover:text-fg">
                {lang === "pt" ? "Controles" : "Controllers"}
              </a>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-muted">
              {group ? t(group.label) : null}
            </li>
          </ol>
        </nav>

        <header className="pb-12 pt-6 sm:pb-14">
          <h1 className="display text-balance text-[34px] sm:text-[46px]">{t(title)}</h1>
          <p className="mt-5 max-w-[44rem] text-pretty text-[17px] leading-relaxed text-muted">{t(intro(g))}</p>
          {!g.family.unsupported ? (
            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
              <Download release={release} quiet platformsHref={`${home}#platforms`} />
              <a href={`${home}#check`} className="btn btn-ghost h-12 justify-center px-5 text-[15px]">
                {lang === "pt" ? "Teste seu controle" : "Test your controller"}
                <ArrowIcon />
              </a>
            </div>
          ) : null}
        </header>

        <Section id="works" title={lang === "pt" ? "O que funciona" : "What works"}>
          <FamilyDetail family={g.family} hint={null} />
          {hints.map((h) => (
            <p key={h} className="mt-4 border-l-2 border-warn/70 pl-3 text-[13.5px]">
              {t(HINTS[h])}
            </p>
          ))}
        </Section>

        {!g.family.unsupported ? (
          <Section id="setup" title={lang === "pt" ? "Como configurar" : "How to set it up"}>
            <ol className="space-y-3">
              {steps(g).map((s, i) => (
                <li key={i} className="flex gap-3">
                  <span className="grid size-6 shrink-0 place-items-center rounded-md bg-white/[0.06] font-mono text-[11.5px] text-muted">{i + 1}</span>
                  <span className="text-fg/90">{t(s)}</span>
                </li>
              ))}
            </ol>
            {steamTip ? (
              <p className="mt-6">
                {lang === "pt"
                  ? "Usa a Steam? Desligue o Steam Input para controles de PlayStation e Switch nas configurações dela, senão a Steam também lê o controle e o jogo pode ver o mesmo botão duas vezes."
                  : "Using Steam? Turn off Steam Input for PlayStation and Switch controllers in its settings, or Steam reads the controller too and the game may see the same button twice."}
              </p>
            ) : null}
            <p className="mt-4">
              {lang === "pt" ? "Mais dúvidas estão nas " : "More answers are in the "}
              <a className={LINK} href={`${home}#faq`}>
                {lang === "pt" ? "perguntas frequentes" : "common questions"}
              </a>
              .
            </p>
          </Section>
        ) : null}

        <Section id="models" title={lang === "pt" ? `Modelos (${models.length})` : `Models (${models.length})`}>
          <p>
            {lang === "pt"
              ? "Os modelos que o OpenController conhece nesta família. A maioria dos controles funciona mesmo fora da lista."
              : "The models OpenController knows in this family. Most controllers work even when they are not on the list."}
          </p>
          <ul className="mt-6 grid gap-x-8 gap-y-2 text-[14px] sm:grid-cols-2">
            {models.map((m) => (
              <li key={m.key} className="flex items-center justify-between gap-3 border-b border-line/60 py-1.5">
                <span className="min-w-0 text-fg/90">
                  {m.brand && !m.name.toLowerCase().includes(m.brand.toLowerCase()) ? <span className="text-faint">{m.brand} </span> : null}
                  {m.name}
                </span>
                <RatingBadge rating={m.rating} />
              </li>
            ))}
          </ul>
          <p className="mt-6">
            {lang === "pt" ? "Seu controle não está aqui ou funciona errado? " : "Yours is missing or misbehaves? "}
            <a className={LINK} href={`${home}#contact`}>
              {lang === "pt" ? "Avise a gente" : "Let us know"}
            </a>
            .
          </p>
        </Section>

        {siblings.length ? (
          <Section id="more" title={lang === "pt" ? "Outros controles" : "Other controllers"}>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {siblings.map((s) => (
                <li key={s.slug}>
                  <a className={LINK} href={localePath(lang, guidePath(s))}>
                    {t(guideTitle(s))}
                  </a>
                </li>
              ))}
              <li>
                <a className={LINK} href={localePath(lang, "/controllers")}>
                  {lang === "pt" ? "Todos os controles" : "All controllers"}
                </a>
              </li>
            </ul>
          </Section>
        ) : null}
      </main>
      <ContactDialog version={release?.version ?? null} />
      <Footer version={release?.version ?? null} path={path} home={home} />
    </>
  );
}
