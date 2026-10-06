/**
 * The contact form: checks the message and emails it through Resend. The address it goes to is
 * only in the environment (CONTACT_TO), never in the page.
 */

const KINDS = { problem: "Problem", idea: "Suggestion", other: "Other" } as const;
type Kind = keyof typeof KINDS;

const LIMITS = { system: 80, version: 30, controller: 120, connection: 40, email: 200, message: 5000 };

/** Sends per network per hour, per server instance: a brake on scripts, not an exact count. */
const HOURLY = 5;
const recent = new Map<string, number[]>();

function tooMany(ip: string) {
  const now = Date.now();
  const times = (recent.get(ip) ?? []).filter((t) => now - t < 3_600_000);
  if (times.length >= HOURLY) return true;
  recent.set(ip, [...times, now]);
  return false;
}

function text(v: unknown, max: number) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  if (!key || !to) return Response.json({ error: "unavailable" }, { status: 503 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid" }, { status: 400 });
  }

  // A field people never see, and a form filled faster than anyone types: both are scripts.
  if (text(body.website, 200) || typeof body.elapsed !== "number" || body.elapsed < 3000) {
    return Response.json({ ok: true });
  }

  const kind: Kind = typeof body.kind === "string" && body.kind in KINDS ? (body.kind as Kind) : "other";
  const message = text(body.message, LIMITS.message);
  const email = text(body.email, LIMITS.email);
  if (message.length < 10) return Response.json({ error: "message" }, { status: 400 });
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return Response.json({ error: "email" }, { status: 400 });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (tooMany(ip)) return Response.json({ error: "rate" }, { status: 429 });

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

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? "OpenController <onboarding@resend.dev>",
      to: [to],
      subject,
      text: `${summary}\n\n${message}\n`,
      ...(email ? { reply_to: email } : {}),
    }),
  });
  if (!res.ok) {
    console.error("contact: Resend answered", res.status, await res.text().catch(() => ""));
    return Response.json({ error: "send" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
