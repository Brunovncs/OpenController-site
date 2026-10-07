/**
 * The contact form: checks the message and emails it through Resend (`lib/mail.ts`).
 */

import { EMAIL, body as readBody, clientIp, mailReady, sendMail, text, tooMany } from "@/lib/mail";

const KINDS = { problem: "Problem", idea: "Suggestion", other: "Other" } as const;
type Kind = keyof typeof KINDS;

const LIMITS = { system: 80, version: 30, controller: 120, connection: 40, email: 200, message: 5000 };

export async function POST(request: Request) {
  if (!mailReady()) return Response.json({ error: "unavailable" }, { status: 503 });

  const body = await readBody(request);
  if (!body) return Response.json({ error: "invalid" }, { status: 400 });

  // A field people never see, and a form filled faster than anyone types: both are scripts.
  if (text(body.website, 200) || typeof body.elapsed !== "number" || body.elapsed < 3000) {
    return Response.json({ ok: true });
  }

  const kind: Kind = typeof body.kind === "string" && body.kind in KINDS ? (body.kind as Kind) : "other";
  const message = text(body.message, LIMITS.message);
  const email = text(body.email, LIMITS.email);
  if (message.length < 10) return Response.json({ error: "message" }, { status: 400 });
  if (email && !EMAIL.test(email)) return Response.json({ error: "email" }, { status: 400 });

  if (tooMany("contact", clientIp(request), 5)) return Response.json({ error: "rate" }, { status: 429 });

  const fields: [string, string][] = [
    ["Type", KINDS[kind]],
    ["System", text(body.system, LIMITS.system)],
    ["OpenController", text(body.version, LIMITS.version)],
    ["Controller", text(body.controller, LIMITS.controller)],
    ["Connection", text(body.connection, LIMITS.connection)],
    ["Reply to", email],
    ["Site language", text(body.lang, 5)],
  ];
  const summary = fields.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n");
  const subject = `[OpenController] ${KINDS[kind]}: ${message.replace(/\s+/g, " ").slice(0, 60)}`;

  const sent = await sendMail({ tag: "contact", subject, text: `${summary}\n\n${message}\n`, replyTo: email || undefined });
  return sent ? Response.json({ ok: true }) : Response.json({ error: "send" }, { status: 502 });
}
