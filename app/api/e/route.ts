/**
 * Page events from components/Analytics.tsx, sent with sendBeacon. Answers 204 whatever happens,
 * so a page never waits on statistics; what was dropped and why is only in the server log.
 */

import { after } from "next/server";
import { BOT_UA, context, refHost, skipped, source, visitorId } from "@/lib/analytics";
import { dbReady, insert } from "@/lib/db";
import { clientIp, tooMany } from "@/lib/mail";

const TYPES = new Set(["view", "leave", "click", "search", "test", "funnel"]);
const done = () => new Response(null, { status: 204 });

type Incoming = { t?: unknown; n?: unknown; l?: unknown; v?: unknown; s?: unknown };

const str = (v: unknown, max: number) => (typeof v === "string" && v.trim() ? v.trim().slice(0, max) : null);
const num = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? Math.round(v * 100) / 100 : null);

export async function POST(request: Request) {
  if (!dbReady()) return done();
  const ua = request.headers.get("user-agent") ?? "";
  if (BOT_UA.test(ua) || skipped(request)) return done();

  // Only this site's own pages send events.
  const site = request.headers.get("sec-fetch-site");
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if ((site && site !== "same-origin") || (origin && host && new URL(origin).host !== host)) return new Response(null, { status: 403 });

  if (tooMany("events", clientIp(request), 900)) return done();

  const raw = await request.text();
  if (raw.length > 12_000) return done();
  let body: { path?: unknown; lang?: unknown; ref?: unknown; utm?: unknown; ev?: unknown };
  try {
    body = JSON.parse(raw);
  } catch {
    return done();
  }
  if (!Array.isArray(body.ev) || !body.ev.length) return done();

  const path = str(body.path, 200) ?? "/";
  const lang = str(body.lang, 5);
  const utm = (body.utm && typeof body.utm === "object" ? body.utm : {}) as Record<string, unknown>;
  const ref = refHost(str(body.ref, 500), host);
  const internal = !ref && typeof body.ref === "string" && body.ref !== "";
  const utmSource = str(utm.source, 100);
  const ctx = context(request);

  const events = (body.ev as Incoming[]).slice(0, 30).filter((e) => typeof e?.t === "string" && TYPES.has(e.t));
  if (!events.length) return done();

  let visitor: string;
  try {
    visitor = await visitorId(request);
  } catch (error) {
    console.error("analytics:", (error as Error).message);
    return done();
  }

  after(async () => {
    try {
      await insert(
        "events",
        events.map((e) => {
          const view = e.t === "view";
          return {
            visitor,
            type: e.t,
            name: str(e.n, 80),
            label: str(e.l, 160),
            value: num(e.v),
            props: e.t === "leave" && num(e.s) !== null ? { scroll: num(e.s) } : null,
            path,
            lang,
            source: view ? source(utmSource, ref, internal) : null,
            ref_host: view ? ref : null,
            utm_source: view ? utmSource : null,
            utm_medium: view ? str(utm.medium, 100) : null,
            utm_campaign: view ? str(utm.campaign, 100) : null,
            utm_term: view ? str(utm.term, 100) : null,
            utm_content: view ? str(utm.content, 100) : null,
            ...ctx,
          };
        }),
      );
    } catch (error) {
      console.error("analytics:", (error as Error).message);
    }
  });
  return done();
}
