/**
 * Supabase through its REST API, from the server only. The secret key bypasses RLS, so it must
 * never reach a page: nothing under components/ imports this file.
 */

type Init = { method?: string; body?: unknown; prefer?: string };

export function dbReady() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SECRET_KEY);
}

async function call(path: string, { method = "GET", body, prefer }: Init = {}) {
  const res = await fetch(`${process.env.SUPABASE_URL}/rest/v1/${path}`, {
    method,
    headers: {
      apikey: process.env.SUPABASE_SECRET_KEY ?? "",
      "Content-Type": "application/json",
      ...(prefer ? { Prefer: prefer } : {}),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`db ${method} ${path.split("?")[0]}: ${res.status} ${await res.text().catch(() => "")}`);
  return res;
}

export async function insert(table: string, rows: object | object[]) {
  await call(table, { method: "POST", body: rows, prefer: "return=minimal" });
}

export async function select<T>(table: string, query: string): Promise<T[]> {
  return (await call(`${table}?${query}`)).json() as Promise<T[]>;
}

export async function update(table: string, query: string, patch: object) {
  await call(`${table}?${query}`, { method: "PATCH", body: patch, prefer: "return=minimal" });
}

export async function remove(table: string, query: string) {
  await call(`${table}?${query}`, { method: "DELETE", prefer: "return=minimal" });
}

export async function rpc<T>(fn: string, args: object = {}): Promise<T> {
  return (await call(`rpc/${fn}`, { method: "POST", body: args })).json() as Promise<T>;
}

/** A value inside a PostgREST filter, quoted so commas and parentheses stay literal. */
export const q = (v: string) => encodeURIComponent(`"${v.replace(/"/g, '\\"')}"`);
