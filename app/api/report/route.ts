/**
 * Controller reports and requests, emailed to the maintainer through Resend (`lib/mail.ts`):
 *
 * - `source: "app"`: the app's "Report a problem" dialog. The user saw the whole report before
 *   sending it: what SDL and the system say about the controller, and what it sent while the
 *   dialog was open. Enough to add or fix a controller without having it in hand.
 * - `source: "site"`: "Ask for it" on this site, for a controller the list does not have, with the
 *   ids the browser read when it was connected to the controller test.
 */

import { EMAIL, body as readBody, clientIp, mailReady, sendMail, text, tooMany } from "@/lib/mail";

const LIMITS = { version: 30, system: 80, lang: 5, controller: 160, model: 120, message: 3000, email: 200, report: 24_000, ids: 9, browserId: 200, query: 120 };

const IDS = /^[0-9a-f]{4}:[0-9a-f]{4}$/;

export async function POST(request: Request) {
  if (!mailReady()) return Response.json({ error: "unavailable" }, { status: 503 });

  const body = await readBody(request);
  if (!body) return Response.json({ error: "invalid" }, { status: 400 });

  const email = text(body.email, LIMITS.email);
  if (email && !EMAIL.test(email)) return Response.json({ error: "email" }, { status: 400 });

  if (body.source === "app") {
    const report = text(body.report, LIMITS.report);
    if (report.length < 40 || !(request.headers.get("user-agent") ?? "").startsWith("open-controller/")) {
      return Response.json({ error: "invalid" }, { status: 400 });
    }
    if (tooMany("report", clientIp(request), 6)) return Response.json({ error: "rate" }, { status: 429 });

    const controller = text(body.controller, LIMITS.controller) || "unknown controller";
    const model = text(body.model, LIMITS.model);
    const message = text(body.message, LIMITS.message);
    const fields: [string, string][] = [
      ["Controller", controller],
      ["The user says it is", model],
      ["OpenController", text(body.version, LIMITS.version)],
      ["System", text(body.system, LIMITS.system)],
      ["App language", text(body.lang, LIMITS.lang)],
      ["Reply to", email],
    ];
    const summary = fields.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n");
    const sent = await sendMail({
      tag: "report",
      subject: `[OpenController] Controller report: ${model || controller}`.slice(0, 140),
      text: `${summary}\n\n${message ? `What goes wrong:\n${message}\n\n` : ""}${report}\n`,
      replyTo: email || undefined,
    });
    return sent ? Response.json({ ok: true }) : Response.json({ error: "send" }, { status: 502 });
  }

  // A field people never see, and a form filled faster than anyone types: both are scripts.
  if (text(body.website, 200) || typeof body.elapsed !== "number" || body.elapsed < 2500) {
    return Response.json({ ok: true });
  }
  const model = text(body.model, LIMITS.model);
  if (model.length < 2) return Response.json({ error: "model" }, { status: 400 });
  if (tooMany("request", clientIp(request), 6)) return Response.json({ error: "rate" }, { status: 429 });

  const ids = text(body.ids, LIMITS.ids).toLowerCase();
  const fields: [string, string][] = [
    ["Controller asked for", model],
    ["USB id read by the browser", IDS.test(ids) ? ids : ""],
    ["Browser's name for it", text(body.browserId, LIMITS.browserId)],
    ["Searched for", text(body.query, LIMITS.query)],
    ["Reply to", email],
    ["Site language", text(body.lang, LIMITS.lang)],
  ];
  const summary = fields.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n");
  const notes = text(body.message, LIMITS.message);
  const sent = await sendMail({
    tag: "request",
    subject: `[OpenController] Controller request: ${model}`.slice(0, 140),
    text: `${summary}\n${notes ? `\n${notes}\n` : ""}`,
    replyTo: email || undefined,
  });
  return sent ? Response.json({ ok: true }) : Response.json({ error: "send" }, { status: 502 });
}
