"use client";

import { startAuthentication, startRegistration } from "@simplewebauthn/browser";
import { useState } from "react";

const MESSAGES: Record<string, string> = {
  rate: "Muitas tentativas. Espere 15 minutos.",
  forbidden: "Token de configuração errado, ou já existe uma passkey.",
  expired: "O pedido expirou. Tente de novo.",
  unverified: "A passkey não foi aceita.",
  unknown: "Essa passkey não está cadastrada.",
  setup: "Nenhuma passkey cadastrada ainda.",
  origin: "Origem não permitida.",
  unavailable: "Banco de dados não configurado.",
};

async function call(action: string, data: object = {}) {
  const res = await fetch(`/api/admin/${action}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
  const json = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  if (!res.ok) throw new Error(MESSAGES[String(json.error)] ?? `Falhou (${res.status}).`);
  return json;
}

const errorText = (e: unknown) => (e instanceof Error && e.name === "NotAllowedError" ? "Cancelado." : e instanceof Error ? e.message : "Falhou.");

export function PasskeyLogin({ setup }: { setup: boolean }) {
  const [token, setToken] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function signIn() {
    setBusy(true);
    setError("");
    try {
      const { options, challengeId } = await call("login-options");
      const response = await startAuthentication({ optionsJSON: options as Parameters<typeof startAuthentication>[0]["optionsJSON"] });
      await call("login", { challengeId, response });
      location.replace("/admin");
    } catch (e) {
      setError(errorText(e));
      setBusy(false);
    }
  }

  async function register(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const { options, challengeId } = await call("register-options", { setupToken: token });
      const response = await startRegistration({ optionsJSON: options as Parameters<typeof startRegistration>[0]["optionsJSON"] });
      await call("register", { challengeId, response, setupToken: token, name: "Primeira passkey" });
      location.replace("/admin");
    } catch (e) {
      setError(errorText(e));
      setBusy(false);
    }
  }

  return (
    <div className="card w-full max-w-sm p-6">
      <h1 className="text-[20px] font-semibold tracking-tight">OpenController admin</h1>
      {setup ? (
        <form onSubmit={register} className="mt-5 space-y-3">
          <p className="text-[14px] text-muted">Nenhuma passkey cadastrada. Cole o ADMIN_SETUP_TOKEN para criar a primeira.</p>
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            autoComplete="off"
            aria-label="Token de configuração"
            className="h-11 w-full rounded-lg border border-line-strong bg-transparent px-3 font-mono text-[13px] outline-none focus:border-fg"
          />
          <button type="submit" disabled={busy || token.length < 20} className="btn btn-primary h-11 w-full justify-center disabled:opacity-50">
            Criar passkey
          </button>
        </form>
      ) : (
        <button type="button" onClick={signIn} disabled={busy} className="btn btn-primary mt-5 h-11 w-full justify-center disabled:opacity-50">
          Entrar com passkey
        </button>
      )}
      {error ? (
        <p role="alert" className="mt-3 text-[13px] text-warn">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function AdminActions() {
  const [note, setNote] = useState("");

  async function addPasskey() {
    setNote("");
    try {
      const { options, challengeId } = await call("register-options");
      const response = await startRegistration({ optionsJSON: options as Parameters<typeof startRegistration>[0]["optionsJSON"] });
      await call("register", { challengeId, response, name: "Passkey extra" });
      setNote("Passkey adicionada.");
    } catch (e) {
      setNote(errorText(e));
    }
  }

  async function logout() {
    await call("logout").catch(() => {});
    location.replace("/admin/login");
  }

  return (
    <div className="flex items-center gap-2">
      {note ? <span className="text-[12.5px] text-muted">{note}</span> : null}
      <button type="button" onClick={addPasskey} className="btn btn-ghost h-9 px-3 text-[13px]">
        Adicionar passkey
      </button>
      <button type="button" onClick={logout} className="btn btn-ghost h-9 px-3 text-[13px]">
        Sair
      </button>
    </div>
  );
}
