/**
 * /admin passkey ceremonies and sign-out. Every call must come from the admin page's own origin,
 * and registering needs either a signed-in session or, before any passkey exists, the setup token.
 */

import {
  generateAuthenticationOptions,
  generateRegistrationOptions,
  verifyAuthenticationResponse,
  verifyRegistrationResponse,
  type AuthenticationResponseJSON,
  type AuthenticatorTransport,
  type RegistrationResponseJSON,
} from "@simplewebauthn/server";
import { isoBase64URL } from "@simplewebauthn/server/helpers";
import {
  credentials,
  endSession,
  hasSession,
  relyingParty,
  sameOrigin,
  saveChallenge,
  setupTokenOk,
  startSession,
  takeChallenge,
  tooManyAttempts,
} from "@/lib/admin";
import { dbReady, insert, q, update } from "@/lib/db";

const no = (error: string, status = 400) => Response.json({ error }, { status, headers: { "Cache-Control": "no-store" } });
const ok = (data: object = { ok: true }) => Response.json(data, { headers: { "Cache-Control": "no-store" } });

async function body(request: Request): Promise<Record<string, unknown>> {
  try {
    const json: unknown = await request.json();
    return json && typeof json === "object" ? (json as Record<string, unknown>) : {};
  } catch {
    return {};
  }
}

/** Registering is open to a signed-in admin, or to the setup token while no passkey exists. */
async function mayRegister(token: unknown) {
  if (await hasSession()) return true;
  return setupTokenOk(token) && (await credentials()).length === 0;
}

export async function POST(request: Request, ctx: RouteContext<"/api/admin/[action]">) {
  if (!dbReady()) return no("unavailable", 503);
  if (!sameOrigin(request)) return no("origin", 403);
  const { action } = await ctx.params;
  const rp = relyingParty();
  const data = await body(request);

  try {
    switch (action) {
      case "register-options": {
        if (await tooManyAttempts(request)) return no("rate", 429);
        if (!(await mayRegister(data.setupToken))) return no("forbidden", 403);
        const existing = await credentials();
        const options = await generateRegistrationOptions({
          rpName: rp.name,
          rpID: rp.id,
          userName: "admin",
          userDisplayName: "OpenController admin",
          userID: new TextEncoder().encode("opencontroller-admin"),
          attestationType: "none",
          excludeCredentials: existing.map((c) => ({ id: c.id, transports: c.transports as AuthenticatorTransport[] })),
          authenticatorSelection: { residentKey: "required", userVerification: "required" },
        });
        return ok({ options, challengeId: await saveChallenge("register", options.challenge) });
      }

      case "register": {
        if (!(await mayRegister(data.setupToken))) return no("forbidden", 403);
        const challenge = await takeChallenge("register", data.challengeId);
        if (!challenge) return no("expired");
        const result = await verifyRegistrationResponse({
          response: data.response as RegistrationResponseJSON,
          expectedChallenge: challenge,
          expectedOrigin: rp.origin,
          expectedRPID: rp.id,
          requireUserVerification: true,
        });
        if (!result.verified) return no("unverified", 401);
        const { credential } = result.registrationInfo;
        await insert("admin_credentials", {
          id: credential.id,
          public_key: isoBase64URL.fromBuffer(credential.publicKey),
          counter: credential.counter,
          transports: credential.transports ?? [],
          name: typeof data.name === "string" ? data.name.slice(0, 60) : null,
        });
        if (!(await hasSession())) await startSession();
        return ok();
      }

      case "login-options": {
        if (await tooManyAttempts(request)) return no("rate", 429);
        const existing = await credentials();
        if (!existing.length) return no("setup", 409);
        const options = await generateAuthenticationOptions({
          rpID: rp.id,
          userVerification: "required",
          allowCredentials: existing.map((c) => ({ id: c.id, transports: c.transports as AuthenticatorTransport[] })),
        });
        return ok({ options, challengeId: await saveChallenge("login", options.challenge) });
      }

      case "login": {
        const challenge = await takeChallenge("login", data.challengeId);
        if (!challenge) return no("expired");
        const response = data.response as AuthenticationResponseJSON;
        const stored = (await credentials()).find((c) => c.id === response?.id);
        if (!stored) return no("unknown", 401);
        const result = await verifyAuthenticationResponse({
          response,
          expectedChallenge: challenge,
          expectedOrigin: rp.origin,
          expectedRPID: rp.id,
          requireUserVerification: true,
          credential: {
            id: stored.id,
            publicKey: isoBase64URL.toBuffer(stored.public_key),
            counter: Number(stored.counter),
            transports: stored.transports as AuthenticatorTransport[],
          },
        });
        if (!result.verified) return no("unverified", 401);
        await update("admin_credentials", `id=eq.${q(stored.id)}`, { counter: result.authenticationInfo.newCounter, last_used_at: new Date().toISOString() });
        await startSession();
        return ok();
      }

      case "logout": {
        await endSession();
        return ok();
      }

      default:
        return no("not found", 404);
    }
  } catch (error) {
    console.error(`admin ${action}:`, (error as Error).message);
    return no("failed", 400);
  }
}
