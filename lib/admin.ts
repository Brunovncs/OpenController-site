/**
 * /admin sign-in with passkeys (WebAuthn): no password exists to leak or guess. The first passkey
 * is registered with ADMIN_SETUP_TOKEN while none exists; after that, only a signed-in session can
 * add another. Sessions are a random token in an HttpOnly, SameSite=Strict, __Host- cookie whose
 * SHA-256 is in admin_sessions, so a database read alone can't sign anyone in.
 */

import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SKIP_COOKIE } from "./analytics";
import { insert, q, remove, select } from "./db";
import { clientIp } from "./mail";
import { SITE_URL } from "./site";

export const SESSION_COOKIE = "__Host-oc-admin";
const SESSION_HOURS = 12;

const sha256 = (s: string) => createHash("sha256").update(s).digest("hex");

/** The origin passkeys are bound to. ADMIN_ORIGIN only for local testing (http://localhost:3311). */
export function relyingParty() {
  const origin = process.env.ADMIN_ORIGIN ?? SITE_URL;
  return { origin, id: new URL(origin).hostname, name: "OpenController admin" };
}

/** Admin API calls must come from the admin page itself. */
export function sameOrigin(request: Request) {
  return request.headers.get("origin") === relyingParty().origin;
}

export function setupTokenOk(token: unknown) {
  const expected = process.env.ADMIN_SETUP_TOKEN;
  if (!expected || typeof token !== "string") return false;
  const a = Buffer.from(sha256(token));
  const b = Buffer.from(sha256(expected));
  return timingSafeEqual(a, b);
}

export type Credential = { id: string; public_key: string; counter: number; transports: string[] };

export async function credentials() {
  return select<Credential>("admin_credentials", "select=id,public_key,counter,transports");
}

export async function hasSession() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token || token.length > 100) return false;
  const rows = await select<{ token_hash: string }>("admin_sessions", `select=token_hash&token_hash=eq.${q(sha256(token))}&expires_at=gt.${q(new Date().toISOString())}`);
  return rows.length > 0;
}

export async function requireAdmin() {
  if (!(await hasSession())) redirect("/admin/login");
}

export async function startSession() {
  const token = randomBytes(32).toString("base64url");
  await insert("admin_sessions", { token_hash: sha256(token), expires_at: new Date(Date.now() + SESSION_HOURS * 3_600_000).toISOString() });
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, { httpOnly: true, secure: true, sameSite: "strict", path: "/", maxAge: SESSION_HOURS * 3600 });
  // The maintainer's own browsing stays out of the statistics.
  jar.set(SKIP_COOKIE, "1", { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 400 * 86400 });
}

export async function endSession() {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (token) await remove("admin_sessions", `token_hash=eq.${q(sha256(token))}`);
  jar.delete(SESSION_COOKIE);
}

/** Challenges live five minutes and are used once. */
export async function saveChallenge(kind: "register" | "login", challenge: string) {
  const id = randomBytes(16).toString("base64url");
  await insert("admin_challenges", { id, challenge, kind, expires_at: new Date(Date.now() + 5 * 60_000).toISOString() });
  return id;
}

export async function takeChallenge(kind: "register" | "login", id: unknown) {
  if (typeof id !== "string" || id.length > 40) return null;
  const rows = await select<{ challenge: string }>("admin_challenges", `select=challenge&id=eq.${q(id)}&kind=eq.${kind}&expires_at=gt.${q(new Date().toISOString())}`);
  await remove("admin_challenges", `id=eq.${q(id)}`);
  return rows[0]?.challenge ?? null;
}

/** At most 20 sign-in or setup tries per network in 15 minutes, counted in the database. */
export async function tooManyAttempts(request: Request) {
  const key = sha256(`admin|${clientIp(request)}`);
  const since = new Date(Date.now() - 15 * 60_000).toISOString();
  const rows = await select<{ id: number }>("admin_attempts", `select=id&key=eq.${q(key)}&at=gt.${q(since)}&limit=21`);
  await insert("admin_attempts", { key });
  return rows.length >= 20;
}
