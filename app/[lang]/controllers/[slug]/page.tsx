import { setLang, t } from "@/lib/i18n-server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FamilyDetail, RatingBadge } from "@/components/Compat";
import { ContactDialog } from "@/components/ContactDialog";
import { Download } from "@/components/Download";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ArrowIcon } from "@/components/icons";
import { PadDrawing } from "@/components/PadDrawing";
import { glyphsFor, shapeFor } from "@/lib/drawings";
import { getLatestRelease, getStars } from "@/lib/github";
import { guideCopy } from "@/lib/guide-copy";
import { GUIDES, guideBySlug, guideDescription, guideMetaTitle, guideModels, guideName, guidePath, guideTitle, type Guide } from "@/lib/guides";
import { LANGS, localePath, type Lang } from "@/lib/i18n";
import { MODELS } from "@/lib/models";
import { guideJsonLd, jsonLdScript, pageMeta } from "@/lib/seo";
import { fmt, rich } from "@/lib/text";

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
  setLang(l);
  return pageMeta(l, guidePath(g), guideMetaTitle(g, l), guideDescription(g, l));
}

const LINK = "text-fg underline decoration-line-strong underline-offset-4 hover:decoration-fg";

/** A link for rich(): the <a> of a message. */
function link(href: string) {
  return function Link(c: React.ReactNode) {
    return (
      <a className={LINK} href={href}>
        {c}
      </a>
    );
  };
}

function intro(g: Guide, lang: Lang): string {
  const f = g.family;
  const m = t().guides.intro;
  const n = guideName(g, lang);
  if (f.unsupported) return m.unsupported(n);
  if (f.passthrough) return m.passthrough(n, { extras: f.extras, gyro: f.gyro });
  return m.xbox(n);
}

function steps(g: Guide): string[] {
  const f = g.family;
  const s = t().guides.steps;
  if (f.passthrough) return [s.download, s.connect, f.extras ? s.passthroughExtras : s.passthrough];
  const out = [s.download, s.connect];
  if (f.extras) out.push(s.extras);
  if (f.gyro !== "no") out.push(s.gyro);
  out.push(s.play);
  return out;
}

/** A model's own drawing, at rest, as the app and the controller list show it. */
function Drawing({ name, vendor }: { name: string; vendor: string }) {
  const model = MODELS.find((x) => x.name === name && x.vendor === vendor);
  if (!model?.drawing) return null;
  const shape = shapeFor(model, vendor);
  return (
    <figure className="mt-8 w-full max-w-[420px] rounded-xl border border-line bg-white/[0.015] px-4 py-3">
      <PadDrawing shape={shape} glyphs={glyphsFor(model, vendor, shape)} buttons={[]} axes={[0, 0, 0, 0]} />
      <figcaption className="sr-only">{model.name}</figcaption>
    </figure>
  );
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
  setLang(lang);
  const g = guideBySlug(slug);
  if (!g) notFound();
  const m = t();
  const p = m.guides.page;
  const [release, stars] = await Promise.all([getLatestRelease(), getStars()]);
  const models = guideModels(g);
  const hintText: Record<string, string> = m.compat.hints;
  const hints = [...new Set(models.map((x) => x.hint).filter((h): h is string => !!h && !!hintText[h]))];
  const home = localePath(lang);
  const path = guidePath(g);
  const description = guideDescription(g, lang);
  const siblings = GUIDES.filter((x) => x.family.group === g.family.group && x.slug !== g.slug);
  const steamTip = g.family.group === "playstation" || g.family.group === "nintendo";

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(guideJsonLd(lang, g, description, models.map((x) => x.name))) }} />
      <a href="#main" className="skip">
        {m.common.skip}
      </a>
      <Header stars={stars} version={release?.version ?? null} path={path} home={home} />

      <main id="main" className="wrap pb-16">
        <nav aria-label={p.breadcrumb} className="pt-10 text-[13px] text-faint sm:pt-14">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <li>
              <a href={home} className="hover:text-fg">
                OpenController
              </a>
            </li>
            <li aria-hidden>/</li>
            <li>
              <a href={localePath(lang, "/controllers")} className="hover:text-fg">
                {p.controllers}
              </a>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-muted">
              {m.compat.groups[g.family.group]}
            </li>
          </ol>
        </nav>

        <header className="pb-12 pt-6 sm:pb-14">
          <h1 className="display text-balance text-[34px] sm:text-[46px]">{guideTitle(g, lang)}</h1>
          <p className="mt-5 max-w-[44rem] text-pretty text-[17px] leading-relaxed text-muted">{intro(g, lang)}</p>
          {!g.family.unsupported ? (
            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
              <Download release={release} quiet platformsHref={`${home}#platforms`} />
              <a href={`${home}#check`} className="btn btn-ghost h-12 justify-center px-5 text-[15px]">
                {p.test}
                <ArrowIcon />
              </a>
            </div>
          ) : null}
        </header>

        <Section id="works" title={p.works}>
          <FamilyDetail family={g.family} hint={null} />
          {hints.map((h) => (
            <p key={h} className="mt-4 border-l-2 border-warn/70 pl-3 text-[13.5px]">
              {hintText[h]}
            </p>
          ))}
        </Section>

        {guideCopy(g.slug, lang)?.sections.map((s) => (
          <Section key={s.id} id={s.id} title={s.title}>
            {s.body.map((text, i) => (
              <p key={i} className={i ? "mt-4" : undefined}>
                {text}
              </p>
            ))}
            {s.drawing ? <Drawing {...s.drawing} /> : null}
          </Section>
        ))}

        {!g.family.unsupported ? (
          <Section id="setup" title={p.setup}>
            <ol className="space-y-3">
              {steps(g).map((s, i) => (
                <li key={i} className="flex gap-3">
                  <span className="grid size-6 shrink-0 place-items-center rounded-md bg-white/[0.06] font-mono text-[11.5px] text-muted">{i + 1}</span>
                  <span className="text-fg/90">{s}</span>
                </li>
              ))}
            </ol>
            {steamTip ? <p className="mt-6">{p.steamTip}</p> : null}
            <p className="mt-4">{rich(p.faq, { a: link(`${home}#faq`) })}</p>
          </Section>
        ) : null}

        <Section id="models" title={fmt(p.models, { n: models.length })}>
          <p>{p.modelsIntro}</p>
          <ul className="mt-6 grid gap-x-8 gap-y-2 text-[14px] sm:grid-cols-2">
            {models.map((x) => (
              <li key={x.key} className="flex items-center justify-between gap-3 border-b border-line/60 py-1.5">
                <span className="min-w-0 text-fg/90">
                  {x.brand && !x.name.toLowerCase().includes(x.brand.toLowerCase()) ? <span className="text-faint">{x.brand} </span> : null}
                  {x.name}
                </span>
                <RatingBadge rating={x.rating} />
              </li>
            ))}
          </ul>
          <p className="mt-6">{rich(p.missing, { a: link(`${home}#contact`) })}</p>
        </Section>

        {siblings.length ? (
          <Section id="more" title={p.more}>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {siblings.map((s) => (
                <li key={s.slug}>
                  <a className={LINK} href={localePath(lang, guidePath(s))}>
                    {guideTitle(s, lang)}
                  </a>
                </li>
              ))}
              <li>
                <a className={LINK} href={localePath(lang, "/controllers")}>
                  {p.all}
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
