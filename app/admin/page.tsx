import { AdminActions } from "@/components/admin/Passkey";
import { requireAdmin } from "@/lib/admin";
import { AI_SOURCES } from "@/lib/analytics";
import { dbReady, rpc } from "@/lib/db";
import { getLatestRelease, getStars } from "@/lib/github";

type Row = Record<string, string | number | null>;
type Bucket = { t: string; visitors: number; views: number; downloads: number };
type Stats = {
  totals: { visitors: number; views: number; downloads: number; downloaders: number; testers: number; searches: number; appReports: number };
  unit: "hour" | "day";
  timeline: Bucket[];
  hours: { h: number; visitors: number; views: number }[];
  recent: { at: string; path: string; source: string; ref_host: string | null; campaign: string | null; country: string | null; device: string | null }[];
  sources: { source: string; visitors: number; downloaders: number; testers: number }[];
  referrers: Row[];
  campaigns: Row[];
  landing: Row[];
  pages: Row[];
  clicks: { name: string; label: string | null; n: number; visitors: number }[];
  searches: { name: string; query: string; n: number; empty: number }[];
  tests: { name: string; label: string | null; visitors: number }[];
  funnels: { name: string; label: string | null; n: number; visitors: number }[];
  appReports: Row[];
  countries: { key: string; visitors: number }[];
  systems: { key: string; visitors: number }[];
  devices: { key: string; visitors: number }[];
  browsers: { key: string; visitors: number }[];
  langs: { key: string; visitors: number }[];
  bots: Row[];
  botPages: Row[];
};

const RANGES = [
  { days: 1, label: "24 h" },
  { days: 7, label: "7 dias" },
  { days: 30, label: "30 dias" },
  { days: 90, label: "90 dias" },
  { days: 365, label: "1 ano" },
];

const BAR = "#1f8fc8";
const fmt = new Intl.NumberFormat("pt-BR");
const pct = (part: number, whole: number) => (whole ? `${Math.round((part / whole) * 100)}%` : "–");
const regions = new Intl.DisplayNames(["pt-BR"], { type: "region" });
const country = (code: string) => {
  try {
    return code.length === 2 ? regions.of(code) ?? code : code;
  } catch {
    return code;
  }
};

function Section({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-8">
      <h2 className="text-[18px] font-semibold tracking-tight">{title}</h2>
      {note ? <p className="mt-1 max-w-3xl text-[13px] text-faint">{note}</p> : null}
      <div className="mt-4">{children}</div>
    </section>
  );
}

type Col<T> = { label: string; value: (r: T) => React.ReactNode; num?: boolean };

/** A table whose first number column also gets a thin bar, so the long ones read at a glance. */
function Table<T>({ rows, cols, bar, empty = "Nada ainda.", max = 15 }: { rows: T[]; cols: Col<T>[]; bar?: (r: T) => number; empty?: string; max?: number }) {
  if (!rows.length) return <p className="text-[13px] text-faint">{empty}</p>;
  const top = bar ? Math.max(...rows.map(bar), 1) : 1;
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[22rem] text-[13px]">
        <thead>
          <tr className="text-left text-faint">
            {cols.map((c) => (
              <th key={c.label} className={`border-b border-line pb-2 pr-4 font-normal ${c.num ? "text-right" : ""}`}>
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.slice(0, max).map((r, i) => (
            <tr key={i} className="border-b border-line/60">
              {cols.map((c, j) => (
                <td key={c.label} className={`py-1.5 pr-4 align-top ${c.num ? "text-right font-mono tabular-nums" : "text-fg/90"}`}>
                  {j === 0 && bar ? (
                    <div className="relative">
                      <span className="relative z-10 break-all">{c.value(r)}</span>
                      <span className="absolute inset-y-[-3px] left-0 rounded-r-[3px] opacity-25" style={{ width: `${(bar(r) / top) * 100}%`, background: BAR }} aria-hidden />
                    </div>
                  ) : (
                    c.value(r)
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length > max ? <p className="mt-2 text-[12px] text-faint">+{rows.length - max} linhas</p> : null}
    </div>
  );
}

function Tile({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="card p-4">
      <p className="text-[12.5px] text-faint">{label}</p>
      <p className="mt-1 font-mono text-[26px] tabular-nums leading-none">{value}</p>
      {sub ? <p className="mt-1.5 text-[12px] text-muted">{sub}</p> : null}
    </div>
  );
}

/** "2026-11-08T14:00" (already in Brasília time) as "08/11 14:00", or "08/11" for whole days. */
const when = (t: string, hour = true) => `${t.slice(8, 10)}/${t.slice(5, 7)}${hour ? ` ${t.slice(11, 16)}` : ""}`;
const weekday = (t: string) => new Date(`${t.slice(0, 10)}T12:00:00Z`).toLocaleDateString("pt-BR", { weekday: "short", timeZone: "UTC" });

function Bars<T>({ rows, label, value, tip, ariaLabel }: { rows: T[]; label: (r: T) => string; value: (r: T) => number; tip: (r: T) => React.ReactNode; ariaLabel: string }) {
  const top = Math.max(...rows.map(value), 1);
  return (
    <div className="flex h-40 items-end gap-[2px]" role="img" aria-label={ariaLabel}>
      {rows.map((r) => (
        <div key={label(r)} className="group relative flex h-full min-w-[2px] flex-1 items-end">
          <div className="w-full rounded-t-[4px]" style={{ height: `${Math.max((value(r) / top) * 100, value(r) ? 2 : 0.5)}%`, background: BAR }} />
          <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-md border border-line-strong bg-bg px-2.5 py-1.5 text-[12px] group-hover:block">
            {tip(r)}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Visitors per hour (up to a week) or per day. One series, so no legend; hovering a bar shows its numbers. */
function Timeline({ rows, hourly }: { rows: Bucket[]; hourly: boolean }) {
  if (!rows.some((r) => r.views)) return <p className="text-[13px] text-faint">Sem visitas no período.</p>;
  const top = Math.max(...rows.map((r) => r.visitors), 1);
  const name = (r: Bucket) => `${weekday(r.t)} ${when(r.t, hourly)}`;
  return (
    <div>
      <Bars
        rows={rows}
        ariaLabel={hourly ? "Visitantes por hora" : "Visitantes por dia"}
        label={(r) => r.t}
        value={(r) => r.visitors}
        tip={(r) => (
          <>
            <p className="text-faint">{hourly ? `${name(r)}–${String((Number(r.t.slice(11, 13)) + 1) % 24).padStart(2, "0")}:00` : name(r)}</p>
            <p>
              {fmt.format(r.visitors)} visitantes · {fmt.format(r.views)} páginas · {fmt.format(r.downloads)} downloads
            </p>
          </>
        )}
      />
      <div className="mt-1.5 flex justify-between font-mono text-[11px] text-faint">
        <span>{when(rows[0].t, hourly)}</span>
        <span>
          máx. {fmt.format(top)}/{hourly ? "hora" : "dia"}
        </span>
        <span>{when(rows[rows.length - 1].t, hourly)}</span>
      </div>
      <details className="mt-3 text-[13px]">
        <summary className="cursor-pointer text-faint hover:text-fg">Ver como tabela</summary>
        <div className="mt-2">
          <Table
            rows={rows.filter((r) => r.views).reverse()}
            max={400}
            cols={[
              { label: hourly ? "Hora" : "Dia", value: name },
              { label: "Visitantes", value: (r) => fmt.format(r.visitors), num: true },
              { label: "Páginas", value: (r) => fmt.format(r.views), num: true },
              { label: "Downloads", value: (r) => fmt.format(r.downloads), num: true },
            ]}
          />
        </div>
      </details>
    </div>
  );
}

/** Which hours of the day people come, summed over the period. */
function Hours({ rows }: { rows: Stats["hours"] }) {
  if (!rows.some((r) => r.views)) return <p className="text-[13px] text-faint">Sem visitas no período.</p>;
  return (
    <div>
      <Bars
        rows={rows}
        ariaLabel="Visitas por hora do dia"
        label={(r) => String(r.h)}
        value={(r) => r.views}
        tip={(r) => (
          <>
            <p className="text-faint">
              {String(r.h).padStart(2, "0")}:00–{String((r.h + 1) % 24).padStart(2, "0")}:00
            </p>
            <p>
              {fmt.format(r.views)} páginas · {fmt.format(r.visitors)} visitantes
            </p>
          </>
        )}
      />
      <div className="mt-1.5 flex justify-between font-mono text-[11px] text-faint">
        <span>00h</span>
        <span>06h</span>
        <span>12h</span>
        <span>18h</span>
        <span>23h</span>
      </div>
    </div>
  );
}

function Funnel({ title, steps, errors }: { title: string; steps: [string, number][]; errors: [string, number][] }) {
  const first = steps[0][1];
  return (
    <div className="card p-4">
      <p className="text-[14px] font-medium">{title}</p>
      <ol className="mt-3 space-y-2">
        {steps.map(([label, n], i) => (
          <li key={label} className="text-[13px]">
            <div className="flex justify-between">
              <span className="text-muted">{label}</span>
              <span className="font-mono tabular-nums">
                {fmt.format(n)} {i > 0 ? <span className="text-faint">({pct(n, first)})</span> : null}
              </span>
            </div>
            <div className="mt-1 h-1.5 rounded-full bg-white/[0.06]">
              <div className="h-full rounded-full" style={{ width: first ? `${(n / first) * 100}%` : "0%", background: BAR }} />
            </div>
          </li>
        ))}
      </ol>
      {errors.length ? <p className="mt-3 text-[12px] text-warn">Erros: {errors.map(([k, n]) => `${k} (${n})`).join(", ")}</p> : null}
    </div>
  );
}

const sourceLabel = (s: string) => (AI_SOURCES.has(s) ? `${s} · IA` : s);

export default async function AdminPage({ searchParams }: PageProps<"/admin">) {
  await requireAdmin();
  if (!dbReady()) return <p className="p-8">Banco de dados não configurado.</p>;
  const sp = await searchParams;
  const days = RANGES.some((r) => String(r.days) === sp.d) ? Number(sp.d) : 30;
  const to = new Date();
  const from = new Date(to.getTime() - days * 86_400_000);
  const [stats, release, stars] = await Promise.all([
    rpc<Stats>("admin_stats", { p_from: from.toISOString(), p_to: to.toISOString() }),
    getLatestRelease(),
    getStars(),
  ]);
  const t = stats.totals;

  const funnelCount = (name: string, field: "n" | "visitors" = "visitors") => stats.funnels.filter((f) => f.name === name).reduce((s, f) => s + f[field], 0);
  const funnelErrors = (prefix: string) =>
    stats.funnels.filter((f) => f.name === `${prefix}:error` || f.name === `${prefix}:failed`).map((f) => [`${f.name.split(":")[1]} ${f.label ?? ""}`.trim(), f.n] as [string, number]);
  const clicksOf = (name: string) => stats.clicks.filter((c) => c.name === name);
  const aiVisitors = stats.sources.filter((s) => AI_SOURCES.has(s.source)).reduce((n, s) => n + s.visitors, 0);
  const unknownTests = stats.tests.filter((x) => x.name === "unknown");

  return (
    <main className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
      <header className="flex flex-wrap items-center justify-between gap-3 py-6">
        <div>
          <h1 className="text-[22px] font-semibold tracking-tight">OpenController admin</h1>
          <p className="text-[12.5px] text-faint">
            {release ? `v${release.version}` : ""} {stars !== null ? `· ${stars} estrelas` : ""} · horários de Brasília
          </p>
        </div>
        <AdminActions />
      </header>

      <nav className="flex flex-wrap gap-1.5 pb-6" aria-label="Período">
        {RANGES.map((r) => (
          <a
            key={r.days}
            href={`/admin?d=${r.days}`}
            aria-current={r.days === days ? "page" : undefined}
            className={`rounded-full border px-3 py-1 text-[13px] ${r.days === days ? "border-fg text-fg" : "border-line-strong text-muted hover:text-fg"}`}
          >
            {r.label}
          </a>
        ))}
      </nav>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        <Tile label="Visitantes" value={fmt.format(t.visitors)} sub={`${fmt.format(t.views)} páginas vistas`} />
        <Tile label="Clicaram em baixar" value={fmt.format(t.downloaders)} sub={`${pct(t.downloaders, t.visitors)} dos visitantes`} />
        <Tile label="Testaram um controle" value={fmt.format(t.testers)} sub={`${pct(t.testers, t.visitors)} dos visitantes`} />
        <Tile label="Vieram de IA" value={fmt.format(aiVisitors)} sub={`${pct(aiVisitors, t.visitors)} dos visitantes`} />
        <Tile label="Buscas" value={fmt.format(t.searches)} sub={`${stats.searches.filter((s) => s.empty > 0).length} sem resultado`} />
        <Tile label="Reports do app" value={fmt.format(t.appReports)} />
      </div>

      <Section
        title={stats.unit === "hour" ? "Visitantes por hora" : "Visitantes por dia"}
        note="Visitante é contado por dia: a mesma pessoa em dois dias conta duas vezes. Não há cookie nem IP guardado."
      >
        <Timeline rows={stats.timeline} hourly={stats.unit === "hour"} />
      </Section>

      <Section title="Horário das visitas" note="Páginas vistas em cada hora do dia, somando o período todo.">
        <Hours rows={stats.hours} />
      </Section>

      <Section title="Últimos acessos" note="Cada página aberta, sem nada que ligue um acesso ao outro.">
        <Table
          rows={stats.recent}
          max={60}
          empty="Sem visitas no período."
          cols={[
            { label: "Quando", value: (r) => when(r.at) },
            { label: "Página", value: (r) => r.path },
            { label: "Origem", value: (r) => [sourceLabel(r.source), r.campaign].filter(Boolean).join(" · ") },
            { label: "País", value: (r) => (r.country ? country(r.country) : "–") },
            { label: "Aparelho", value: (r) => r.device ?? "–" },
          ]}
        />
      </Section>

      <Section title="De onde vêm" note="Pela primeira página de cada visitante no dia. UTM vence o referrer; o ChatGPT costuma mandar utm_source=chatgpt.com.">
        <div className="grid gap-8 lg:grid-cols-2">
          <Table
            rows={stats.sources}
            bar={(r) => r.visitors}
            cols={[
              { label: "Origem", value: (r) => sourceLabel(r.source) },
              { label: "Visitantes", value: (r) => fmt.format(r.visitors), num: true },
              { label: "Baixaram", value: (r) => `${fmt.format(r.downloaders)} · ${pct(r.downloaders, r.visitors)}`, num: true },
              { label: "Testaram", value: (r) => pct(r.testers, r.visitors), num: true },
            ]}
          />
          <Table
            rows={stats.referrers}
            bar={(r) => Number(r.visitors)}
            cols={[
              { label: "Site de onde veio", value: (r) => r.host },
              { label: "Visitantes", value: (r) => fmt.format(Number(r.visitors)), num: true },
              { label: "Baixaram", value: (r) => pct(Number(r.downloaders), Number(r.visitors)), num: true },
            ]}
          />
        </div>
        <div className="mt-8">
          <Table
            rows={stats.campaigns}
            empty="Nenhuma visita com UTM ainda. Use links como opencontroller.com.br/?utm_source=reddit&utm_campaign=lancamento."
            cols={[
              { label: "utm_source", value: (r) => r.source },
              { label: "utm_medium", value: (r) => r.medium ?? "–" },
              { label: "utm_campaign", value: (r) => r.campaign ?? "–" },
              { label: "Visitantes", value: (r) => fmt.format(Number(r.visitors)), num: true },
              { label: "Baixaram", value: (r) => pct(Number(r.downloaders), Number(r.visitors)), num: true },
            ]}
          />
        </div>
      </Section>

      <Section title="Páginas" note="Entrada é a primeira página do visitante. Tempo e rolagem são médias de quem saiu da página.">
        <div className="grid gap-8 lg:grid-cols-2">
          <Table
            rows={stats.landing}
            bar={(r) => Number(r.visitors)}
            cols={[
              { label: "Página de entrada", value: (r) => r.path },
              { label: "Visitantes", value: (r) => fmt.format(Number(r.visitors)), num: true },
              { label: "Baixaram", value: (r) => pct(Number(r.downloaders), Number(r.visitors)), num: true },
            ]}
          />
          <Table
            rows={stats.pages}
            bar={(r) => Number(r.views)}
            cols={[
              { label: "Página", value: (r) => r.path },
              { label: "Vistas", value: (r) => fmt.format(Number(r.views)), num: true },
              { label: "Tempo", value: (r) => (r.secs === null ? "–" : `${r.secs}s`), num: true },
              { label: "Rolagem", value: (r) => (r.scroll === null ? "–" : `${r.scroll}%`), num: true },
            ]}
          />
        </div>
      </Section>

      <Section title="Cliques">
        <div className="grid gap-8 lg:grid-cols-2">
          <Table
            rows={clicksOf("download")}
            bar={(r) => r.n}
            empty="Nenhum download ainda."
            cols={[
              { label: "Arquivo baixado", value: (r) => r.label },
              { label: "Cliques", value: (r) => fmt.format(r.n), num: true },
            ]}
          />
          <Table
            rows={clicksOf("button")}
            bar={(r) => r.n}
            cols={[
              { label: "Botão", value: (r) => r.label },
              { label: "Cliques", value: (r) => fmt.format(r.n), num: true },
              { label: "Visitantes", value: (r) => fmt.format(r.visitors), num: true },
            ]}
          />
          <Table
            rows={clicksOf("expand")}
            bar={(r) => r.n}
            empty="Ninguém abriu uma pergunta ainda."
            cols={[
              { label: "Pergunta aberta", value: (r) => r.label },
              { label: "Aberturas", value: (r) => fmt.format(r.n), num: true },
            ]}
          />
          <Table
            rows={[...clicksOf("outbound"), ...clicksOf("link"), ...clicksOf("checksum")].sort((a, b) => b.n - a.n)}
            bar={(r) => r.n}
            cols={[
              { label: "Link", value: (r) => `${r.name === "outbound" ? "↗ " : ""}${r.label}` },
              { label: "Cliques", value: (r) => fmt.format(r.n), num: true },
            ]}
          />
        </div>
      </Section>

      <Section title="Buscas" note="O que as pessoas digitaram. Sem resultado é o que o site ainda não responde.">
        <div className="grid gap-8 lg:grid-cols-2">
          {(["controllers", "faq"] as const).map((name) => (
            <Table
              key={name}
              rows={stats.searches.filter((s) => s.name === name)}
              bar={(r) => r.n}
              cols={[
                { label: name === "controllers" ? "Busca na lista de controles" : "Busca nas perguntas", value: (r) => r.query },
                { label: "Vezes", value: (r) => fmt.format(r.n), num: true },
                { label: "Sem resultado", value: (r) => (r.empty ? <span className="text-warn">{r.empty}</span> : "–"), num: true },
              ]}
            />
          ))}
        </div>
      </Section>

      <Section title="Controles testados no site" note="Desconhecido é um controle com id USB que a lista não tem: candidato a entrar no app.">
        <div className="grid gap-8 lg:grid-cols-2">
          <Table
            rows={stats.tests.filter((x) => x.name !== "unknown")}
            bar={(r) => r.visitors}
            cols={[
              { label: "Controle", value: (r) => (r.name === "xinput" ? "Xbox (XInput)" : r.name === "anon" ? "Sem modelo" : r.name) },
              { label: "Visitantes", value: (r) => fmt.format(r.visitors), num: true },
            ]}
          />
          <Table
            rows={unknownTests}
            bar={(r) => r.visitors}
            empty="Nenhum controle desconhecido."
            cols={[
              { label: "Desconhecido (nome do navegador)", value: (r) => r.label },
              { label: "Visitantes", value: (r) => fmt.format(r.visitors), num: true },
            ]}
          />
        </div>
      </Section>

      <Section title="Formulários" note="Quantas pessoas abriram, tentaram enviar e conseguiram. A queda entre abrir e enviar é quem desistiu.">
        <div className="grid gap-3 md:grid-cols-2">
          <Funnel
            title="Pedir um controle"
            steps={[
              ["Abriram", funnelCount("request:open")],
              ["Enviaram", funnelCount("request:submit")],
              ["Chegou", funnelCount("request:sent")],
            ]}
            errors={funnelErrors("request")}
          />
          <Funnel
            title="Contato"
            steps={[
              ["Abriram", funnelCount("contact:open")],
              ["Enviaram", funnelCount("contact:submit")],
              ["Chegou", funnelCount("contact:sent")],
            ]}
            errors={funnelErrors("contact")}
          />
        </div>
        <div className="mt-6">
          <Table
            rows={stats.funnels.filter((f) => f.name === "request:open" || f.name === "contact:open")}
            cols={[
              { label: "Aberto a partir de", value: (r) => `${r.name.split(":")[0] === "request" ? "Pedido" : "Contato"}: ${r.label ?? "–"}` },
              { label: "Vezes", value: (r) => fmt.format(r.n), num: true },
            ]}
          />
        </div>
      </Section>

      <Section title="Reports do app" note="Problemas enviados pelo próprio OpenController, por versão e sistema. O conteúdo vai só para o email.">
        <Table
          rows={stats.appReports}
          bar={(r) => Number(r.n)}
          empty="Nenhum report no período."
          cols={[
            { label: "Versão", value: (r) => r.version },
            { label: "Sistema", value: (r) => r.system },
            { label: "Reports", value: (r) => fmt.format(Number(r.n)), num: true },
          ]}
        />
      </Section>

      <Section title="Quem visita">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Table rows={stats.countries} bar={(r) => r.visitors} cols={[{ label: "País", value: (r) => country(r.key) }, { label: "Visitantes", value: (r) => fmt.format(r.visitors), num: true }]} />
          <Table rows={stats.systems} bar={(r) => r.visitors} cols={[{ label: "Sistema", value: (r) => r.key }, { label: "Visitantes", value: (r) => fmt.format(r.visitors), num: true }]} />
          <Table rows={stats.devices} bar={(r) => r.visitors} cols={[{ label: "Aparelho", value: (r) => r.key }, { label: "Visitantes", value: (r) => fmt.format(r.visitors), num: true }]} />
          <Table rows={stats.browsers} bar={(r) => r.visitors} cols={[{ label: "Navegador", value: (r) => r.key }, { label: "Visitantes", value: (r) => fmt.format(r.visitors), num: true }]} />
          <Table rows={stats.langs} bar={(r) => r.visitors} cols={[{ label: "Idioma do site", value: (r) => r.key }, { label: "Visitantes", value: (r) => fmt.format(r.visitors), num: true }]} />
        </div>
      </Section>

      <Section title="Robôs de busca e de IA" note="ChatGPT-User, Claude-User e Perplexity-User são o assistente abrindo uma página porque alguém perguntou algo a ele.">
        <div className="grid gap-8 lg:grid-cols-2">
          <Table
            rows={stats.bots}
            bar={(r) => Number(r.hits)}
            empty="Nenhum robô registrado no período."
            cols={[
              { label: "Robô", value: (r) => r.bot },
              { label: "Acessos", value: (r) => fmt.format(Number(r.hits)), num: true },
              { label: "Páginas", value: (r) => fmt.format(Number(r.pages)), num: true },
              { label: "Último", value: (r) => when(String(r.last)), num: true },
            ]}
          />
          <Table
            rows={stats.botPages}
            bar={(r) => Number(r.hits)}
            cols={[
              { label: "Página lida", value: (r) => `${r.path} · ${r.bot}` },
              { label: "Acessos", value: (r) => fmt.format(Number(r.hits)), num: true },
            ]}
          />
        </div>
      </Section>
    </main>
  );
}
