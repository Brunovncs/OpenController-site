/**
 * What the contact form and the controller reports share: reading the request, a brake on
 * scripts, and sending the email through Resend. The address mail goes to is only in the
 * environment (CONTACT_TO), never in the page.
 */

/** Sends per network per hour, per server instance and per kind: a brake on scripts, not an exact count. */
const buckets = new Map<string, Map<string, number[]>>();

export function tooMany(bucket: string, ip: string, hourly: number) {
  const recent = buckets.get(bucket) ?? new Map<string, number[]>();
  buckets.set(bucket, recent);
  const now = Date.now();
  // Networks that have not written for an hour are forgotten, so the map stays small.
  for (const [k, v] of recent) if (now - v[v.length - 1] >= 3_600_000) recent.delete(k);
  const times = (recent.get(ip) ?? []).filter((t) => now - t < 3_600_000);
  if (times.length >= hourly) return true;
  recent.set(ip, [...times, now]);
  return false;
}

export function clientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

export function text(v: unknown, max: number) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** The request's JSON object, or null when it is not one. */
export async function body(request: Request): Promise<Record<string, unknown> | null> {
  try {
    const json: unknown = await request.json();
    return json && typeof json === "object" && !Array.isArray(json) ? (json as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

export function mailReady() {
  return Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO);
}

/** Emails the maintainer. False when Resend refused it; the reason goes to the server log. */
export async function sendMail({ tag, subject, text: content, replyTo }: { tag: string; subject: string; text: string; replyTo?: string }) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? "OpenController <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO],
      subject,
      text: content,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });
  if (!res.ok) console.error(`${tag}: Resend answered`, res.status, await res.text().catch(() => ""));
  return res.ok;
}
